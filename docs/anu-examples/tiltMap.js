// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as MATERIALS from '@babylonjs/materials';
import * as d3 from 'd3';
import vega from 'vega-datasets';
import centroids from './data/centroids.json';
import geoJ from './data/gz_2010_us_040_00_5m.json';
import { fill } from 'lodash-es';

export async function tiltMap(engine){

  const data = await vega['population_engineers_hurricanes.csv']();
  
  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.05;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  fillLight.specular = new BABYLON.Color3(0,0,0); //Minimize specular highlights
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 2.5, -2);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Merge our population data and our centroid data (of each US state) together into a single dataset
  function mergeBy(key, dataL, dataR) {
    // Convert both IDs to strings to ensure matching (vega data has numbers, centroids has strings)
    const rMap = dataR.reduce((m, o) => m.set(String(o[key]), { ...m.get(String(o[key])), ...o }), new Map);
    return dataL.filter(x => rMap.get(String(x[key]))).map(x => ({...x, ...rMap.get(String(x[key])) }));
  }
  let population = mergeBy('id', data, centroids);
  //Only show the contiguous US states
  population = population.filter((d) => d.state != 'AK' && d.state != 'HI');

  //Filter our GeoJSON such that it only includes states that we have data for
  let filteredGeoJ = {};
  filteredGeoJ.type = geoJ.type;
  filteredGeoJ.features = geoJ.features.filter(d => population.find(x => Number(x.id) == Number(d.properties.STATE)));

  
  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization  
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toStandardMaterial()).domain([0,40000000]); //Shared by all
  let scaleY = d3.scaleLinear().domain([0,40000000]).range([0, 0.5]); //Shared by prism and bar
  let scaleX = d3.scaleBand().domain([...population.sort((a, b) => a.longitude - b.longitude).map(d => d.state)]).range([-1.5,1.5]);   //Used only by bar chart, sorted only based on longitude

  //Create parent object and child visualizations (choropleth, prism, bar)
  let tiltMap = anu.create('cot', 'tiltMap');

  //Use the Mesh Map prefab to create 3D meshes based on GeoJSON data which will serve as our choropleth map
  let choroplethMap = anu.createMeshMap('choropleth', { geoJson: filteredGeoJ, depth: 0.01, projection: d3.geoAlbers().reflectY(true), size: [3,3], simplification: 0.00005 });
  choroplethMap.setParent(tiltMap);
  //Set material and color of the choropleth map
  choroplethMap.selection.material((d,n,i) => {
                            //Access the population stored in another dataset based on the data 'id' bound to each state's mesh
                            let stateData = population.find(x => Number(x.id) == Number(d.STATE));
                            return scaleC(stateData.population);
                          })
                          .specularColor(BABYLON.Color3.Black());  //Minimize reflections

  //Use the Mesh Map prefab to create 3D meshes based on GeoJSON data which will serve as our prism map
  let prismMap = anu.createMeshMap('prism', { geoJson: filteredGeoJ, depth: 1, projection: d3.geoAlbers().reflectY(true), size: [3,3], simplification: 0.00005 });
  prismMap.setParent(tiltMap);
  //Set the origin point, material, and color of the prism map
  prismMap.selection.run((d,n,i) => {
                      //The local origin for all meshes in the map is at world (0,0,0) regardless of where the vertices actually are, making transformations awkward
                      //Here we move the mesh so that the vertices are centered around world (0,0,0), bake the transform to 'reset' the local origin, then move it back to its original position
                      let centroidData = population.find(x => Number(x.id) == Number(d.STATE));
                      let pos = prismMap.projection([centroidData.longitude, centroidData.latitude]);
                      n.position = new BABYLON.Vector3(-pos[0], 0, -pos[1]);
                      n.bakeCurrentTransformIntoVertices();
                      n.computeWorldMatrix();   //Make sure transformation matrix is now up to date
                      n.position = new BABYLON.Vector3(pos[0], 0, pos[1]);
                    })
                    .material((d,n,i) => {
                      let stateData = population.find(x => Number(x.id) == Number(d.STATE));
                      return scaleC(stateData.population);
                    })
                    .scalingY((d,n,i) => {
                      let stateData = population.find(x => Number(x.id) == Number(d.STATE));
                      return -scaleY(stateData.population); //Negative as we want the mesh to be scaled 'upwards'
                    })
                    .specularColor(BABYLON.Color3.Black()); //Minimize reflections

  //Create a Center of Transform TransformNode that serves the parent node for our bar chart
  let barChart = anu.create('cot', 'barChart');
  barChart.setParent(tiltMap);
  //Create box meshes as children of the bar chart's CoT
  let bars = anu.selectName('barChart', scene)
                .bind('box', { height: 1, width: 0.05, depth: 0.01 }, population)
                .material((d,n,i) => scaleC(d.population))
                .scalingY((d,n,i) => scaleY(d.population));

  //Create labels for each state
  let labels = anu.selectName('barChart', scene)
                  .bind('planeText', { text: (d) => d.state, size: 0.0375, parent: barChart, color: BABYLON.Color3.White(), strokeWidth: 0.25 }, population)
                  .position((d,n,i) => new BABYLON.Vector3(scaleX(d.state), -0.05, 0));

  //We want to be a bit fancier with our axes, so we create our own axes instead of using the Axis prefab
  //Create a GradientMaterial that will provide a gradient on the Mesh it is applied to (imported from https://www.npmjs.com/package/@babylonjs/materials)
  let gradMat = new MATERIALS.GradientMaterial('gradMat', scene);
  gradMat.topColor = BABYLON.Color3.FromHexString('#b30000');
  gradMat.bottomColor = BABYLON.Color3.FromHexString('#fee8c8');
  gradMat.offset = 0.5;
  gradMat.smoothness = 3;
  //Create and position planes that will display these gradients, one for the left and right side of the TiltMap
  let legends = anu.selectName('tiltMap', scene) 
                   .bind('plane', { width: 0.05, height: 1, sideOrientation: 2 }, [undefined, undefined])
                   .name((d,n,i) => i == 0 ? 'leftLegend' : 'rightLegend')
                   .material(gradMat)
                   .positionX((d,n,i) => i == 0 ? -1.6 : 1.6)
                   .positionY(0.25)
                   .scalingY(0.5);
  //Create and position labels for the axes
  legends.bind('planeText', { text: (d) => d, size: 0.075 }, [ '0M', '10M', '20M', '30M', '40M'])
         .positionX((d,n,i) => n.parent.name.startsWith('left') ? -0.1 : 0.1)
         .positionY((d,n,i) => n.parent.name.startsWith('left') ? i * 0.25 - 0.5 : (i - 5) * 0.25 - 0.5);

  //Helper function
  function lerp(start, end, t) {
    return (1 - t) * start + t * end;
  }

  //Force The tiltMap to use Quaternions. This will disable eulerAngles, but ensures consistency with Babylon behaviors that also use Quaternions
  //See https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/center_origin/rotation_quaternions#warning
  tiltMap.rotationQuaternion = BABYLON.Quaternion.Identity();
  
  //React whenever the TitMap is moved
  tiltMap.onAfterWorldMatrixUpdateObservable.add(() => {

    //Get the pitch angle of the TiltMap
    var angle = tiltMap.rotationQuaternion.toEulerAngles().x;
    //Assign that angle to our axes so that it stays vertical
    legends.rotationX(-angle);
    //Convert to degrees for our convenience
    angle = angle * 180 / Math.PI;

    //Modify the TiltMap based on the angle. Thresholds are directly from the original paper
    //Note that here we do not use Anu transitions as TiltMap animations are based on tilt angle and not time, thus we manually change encodings through interpolation similar to .tween()
    //Choropleth
    if (angle <= -70) {
      choroplethMap.selection.prop('isVisible', true);
      prismMap.selection.prop('isVisible', false);
      bars.prop('isVisible', false);
    }
    //Choropleth <-> Prism
    else if (angle <= -45) {
      choroplethMap.selection.prop('isVisible', true);
      prismMap.selection.prop('isVisible', true);
      bars.prop('isVisible', false);

      //t=0: Choropleth, t=1: Prism
      let t = Math.abs((angle - -70) / (-70 - -45));
      
      prismMap.selection.scalingY((d,n,i) => {
        let stateData = population.find(x => Number(x.id) == Number(d.STATE));
        return lerp(0, -scaleY(stateData.population), t);
      });

      labels.positionY((d,n,i) => {
        return lerp(0.05, scaleY(d.population) + 0.05, t);
      });
    }
    //Prism
    else if (angle <= -15) {
      choroplethMap.selection.prop('isVisible', true);
      prismMap.selection.prop('isVisible', true);
      bars.prop('isVisible', false);

      prismMap.selection.scalingX(1)
                        .scalingZ(1);
    }
    //Prism <-> Bar chart (prisms growing/shrinking)
    else if (angle <= -7.5) {
      choroplethMap.selection.prop('isVisible', true);
      prismMap.selection.prop('isVisible', true);
      bars.prop('isVisible', true);

      //t=0: Large prisms, t=1: Shrunk prisms
      let t = Math.abs((angle - -15) / (-15 - -7.5));

      prismMap.selection.scalingX(lerp(1, 0.05, t))
                        .scalingZ(lerp(1, 0.05, t));
      
    }
    //Prism <-> Bar chart (bars moving)
    else if (angle < 0) {
      choroplethMap.selection.prop('isVisible', false);
      prismMap.selection.prop('isVisible', false);
      bars.prop('isVisible', true);

      //t=0: Bars at geographical positions, t=1: Bars in linear order
      let t = Math.abs((angle - -7.5) / (-7.5 - 0));

      bars.position((d,n,i) => {
        let proj = prismMap.projection([d.longitude, d.latitude]);
        let geoPos = new BABYLON.Vector3(proj[0], scaleY(d.population) / 2, proj[1]);
        let chartPos = new BABYLON.Vector3(scaleX(d.state), scaleY(d.population) / 2, 0);
        return BABYLON.Vector3.Lerp(geoPos, chartPos, t);
      });

      labels.position((d,n,i) => {
        let proj = prismMap.projection([d.longitude, d.latitude]);
        let geoPos = new BABYLON.Vector3(proj[0], scaleY(d.population) + 0.05, proj[1]);
        let chartPos = new BABYLON.Vector3(scaleX(d.state), -0.05, 0);
        return BABYLON.Vector3.Lerp(geoPos, chartPos, t);
      })
        .rotationX(BABYLON.Scalar.Lerp(Math.PI / 2, 0, t));
    }
    //Bar chart
    else {
      choroplethMap.selection.prop('isVisible', false);
      prismMap.selection.prop('isVisible', false);
      bars.prop('isVisible', true);

      bars.position((d,n,i) => new BABYLON.Vector3(scaleX(d.state), scaleY(d.population) / 2, 0));
      labels.position((d,n,i) => new BABYLON.Vector3(scaleX(d.state), -0.05, 0));
    }
  });

  //Add a slider to control the angle of TiltMap (mainly meant for desktop)
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
  let slider = new GUI.Slider();
  slider.minimum = 0;
  slider.maximum = Math.PI / 2;
  slider.value = 0;
  slider.height = '2.5%';
  slider.width = '30%';
  slider.top = '40%';
  slider.color = 'white';
  slider.background = 'white';
  slider.borderColor = 'black';
  slider.onValueChangedObservable.add((value) => {
    let euler = tiltMap.rotationQuaternion.toEulerAngles();
    tiltMap.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(-value, euler.y, euler.z);
  });
  advancedTexture.addControl(slider);

  //Add a behavior so that the TiltMap can be grabbed and moved (mainly meant for XR)
  const sixDofDragBehavior = new BABYLON.SixDofDragBehavior();
  tiltMap.addBehavior(sixDofDragBehavior);

  return scene;
}