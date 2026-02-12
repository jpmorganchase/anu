// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export const brushingLinkingMultiple = async function (engine) {

  const data = await vega['cars.json']();

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0.5, -5);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Add a unique index to each car so that we can easily retrieve this later
  data.forEach((element, index) => element.index = index);

  //Create a 2D scatter plot and put it on the left
  let scaleX1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Miles_per_Gallon))).range([-1,1]).nice();
  let scaleY1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Acceleration))).range([-1,1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor3());

  let CoT1 = anu.create('cot', 'cot1');
  let chart1 = anu.selectName('cot1', scene);
  let spheres1 = chart1.bind('sphere', { diameter: 0.05 }, data)
                       .position((d) => new BABYLON.Vector3(scaleX1(d.Miles_per_Gallon), scaleY1(d.Acceleration), 0))
                       .material((d) => new BABYLON.StandardMaterial())
                       .diffuseColor((d) => scaleC(d.Origin))
                       .prop('outlineWidth', 0.0075);

  anu.createAxes('myAxes1', { scale: { x: scaleX1, y: scaleY1 }, parent: chart1 });
  chart1.position(new BABYLON.Vector3(-1.3, 0, 0));  

  //Create a 3D scatter plot and put it on the right
  let scaleX2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Cylinders))).range([-1,1]).nice();
  let scaleY2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Displacement))).range([-1,1]).nice();
  let scaleZ2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Horsepower))).range([-1,1]).nice();

  let CoT2 = anu.create('cot', 'cot2');
  let chart2 = anu.selectName('cot2', scene);
  let spheres2 = chart2.bind('sphere', { diameter: 0.075 }, data)
                       .position((d) => new BABYLON.Vector3(scaleX2(d.Cylinders), scaleY2(d.Displacement), scaleZ2(d.Horsepower)))
                       .material((d) => new BABYLON.StandardMaterial())
                       .diffuseColor((d) => scaleC(d.Origin))
                       .prop('outlineWidth', 0.0075);

  anu.createAxes('myAxes2', { scale: { x: scaleX2, y: scaleY2, z: scaleZ2 }, parent: chart2 });
  chart2.position(new BABYLON.Vector3(1.3, 0, 0));
  

  //Use the Brush prefab and add it to our 2D scatter plot
  let brush1 = anu.createBrush('brush1', 
    {
      parent: chart1,                               //The chart that the brush is bound to, must be set
      scales: { x: scaleX1, y: scaleY1 },           //The scales of this chart which are used to determine ranges that the brush can move in, at least one must be set
      padding: { x: 0.1, y: 0.1 },                  //Adds padding to the specified ranges that the brush can move in, defaults to 0
      rotateAxes: { x: false, y: false, z: false }  //Allows or disallows the brush to be rotated along the specified axes, has sensible defaults depending on the scales set
    }
  );

  //Use the Brush prefab and add it to our 3D scatter plot, here we also pass in a material to color the brush
  let mat = new BABYLON.StandardMaterial('myBrushMaterial');
  mat.diffuseColor = BABYLON.Color3.Yellow();
  mat.alpha = 0.2;
  let brush2 = anu.createBrush('brush2',
    {
      parent: chart2,
      scales: { x: scaleX2, y: scaleY2, z: scaleZ2 },
      minSize: { x: 0.5, y: 0.5, z: 0.5 },          //The minimum size of the brush along each axis, has sensible defaults depending on the scales set
      material: mat                                 //Assign our material
    }
  );

  //Make a new selection with all the spheres
  let allSpheres = anu.selectName('sphere', scene);

  //Subscribe to our 2D scatter plot brush's observable which updates whenever the brushed meshes change
  brush1.onBrushChangedObservable.add((evt) => {
    //Retrieve our manually bound indices of newly highlighted meshes via evt.added
    let addedIndices = evt.added.map(n => n.metadata.data.index);
    //Filter all our spheres to just the ones with the above indices
    allSpheres.filter((d,n,i) => addedIndices.includes(d.index))
              .prop('renderOutline', true);

    //Do the same thing but instead with the newly unhighlighted meshes via evt.removed
    let removedIndices = evt.removed.map(n => n.metadata.data.index);
    allSpheres.filter((d,n,i) => removedIndices.includes(d.index))
              .prop('renderOutline', false);
  });

  //Subscribe to our 2D scatter plot brush's observable which updates whenever the brushed meshes change
  brush2.onBrushChangedObservable.add((evt) => {
    //Retrieve our manually bound indices of newly highlighted meshes via evt.added
    let addedIndices = evt.added.map(n => n.metadata.data.index);
    //Filter all our spheres to just the ones with the above indices
    allSpheres.filter((d,n,i) => addedIndices.includes(d.index))
              .diffuseColor(BABYLON.Color3.Yellow())
              .emissiveColor(BABYLON.Color3.Yellow());

    //Do the same thing but instead with the newly unhighlighted meshes via evt.removed
    let removedIndices = evt.removed.map(n => n.metadata.data.index);
    allSpheres.filter((d,n,i) => removedIndices.includes(d.index))
              .diffuseColor((d) => scaleC(d.Origin))
              .emissiveColor(BABYLON.Color3.Black());
  });

  return scene;
};