// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as d3 from 'd3';
import data from './data/cars.json';

export function linkedScatterPlots(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 1.5), scene);
  camera.position = new BABYLON.Vector3(3, 0, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Define only continuous dimensions in our dataset
  const dimensions = ['Miles_per_Gallon', 'Cylinders', 'Displacement', 'Horsepower', 'Weight_in_lbs', 'Acceleration'];
  //Create a D3 scale for color, using Anu helper functions map scale outputs to Color4 objects based on the 'schemecategory10' palette from D3
  const scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

  const scatterplots = [];    //List of our scatter plots
  const offset = 2;           //Distance between scatter plots

  function createScatterPlot(id) {
    //Pick random dimensions to visualize
    let dimX = dimensions[Math.floor(Math.random() * dimensions.length)];
    let dimY = dimensions[Math.floor(Math.random() * dimensions.length)];
    //Avoid using the same X Y variables
    while (dimX === dimY)
      dimY = dimensions[Math.floor(Math.random() * dimensions.length)];
    
    //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our scatter plot
    const scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d[dimX]))).range([-1, 1]).nice();
    const scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d[dimY]))).range([-1, 1]).nice();
    
    //We use Mesh instancing here for better performance, first we create a Mesh that serves as the root Node
    const rootSphere = anu.create('sphere', `rootSphere-${id}`, { diameter: 0.04, segments: 4});
    rootSphere.isVisible = false;
    rootSphere.registerInstancedBuffer('color', 4);

    //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
    let CoT = anu.create('cot', `sp-${id}`);
    //Select our CoT so that we have it as a Selection object
    let chart = anu.selectName(`sp-${id}`, scene);

    //Create instanced sphere meshes from our rootSphere as children of our CoT for each row of our data and set their visual encodings using method chaining
    let spheres = chart.bindInstance(rootSphere, data)
                      .position((d) => new BABYLON.Vector3(scaleX(d[dimX]), scaleY(d[dimY]), 0))
                      .scalingZ(0.2)
                      .setInstancedBuffer('color', (d) => scaleC(d.Origin));

    //Create axes
    const axesOptions = new anu.AxesConfig({ x: scaleX, y: scaleY });
    axesOptions.parent = chart;
    axesOptions.grid = false,
    axesOptions.domainMaterialOptions = { width: 0.01 },
    axesOptions.labelOptions = { size : 0.1 };
    const axes = anu.createAxes(`axes-${id}`, axesOptions);

    //Position chart
    chart.positionZ(id * offset);

    //Store references to this scatter plot
    scatterplots.push({
      id: id,
      chart: chart,
      spheres: spheres,
      scaleX: scaleX,
      scaleY: scaleY,
      dimX: dimX,
      dimY: dimY,
      axes: axes
    })
  }

  function removeScatterPlot(id) {
    scatterplots[id].chart.dispose();
    scatterplots.splice(id, 1);
  }

  //Create initial scatter plots
  createScatterPlot(0);
  createScatterPlot(1);
  createScatterPlot(2);

  //Helper function to create an array of Vector3 for each datum across all of the linked scatter plots
  function getLineData(d) {
    const lineData = [];
    for (let i = 0; i < scatterplots.length; i++) {
      const sp = scatterplots[i];
      lineData.push(new BABYLON.Vector3(sp.scaleX(d[sp.dimX]), sp.scaleY(d[sp.dimY]), sp.id * offset));
    }
    return lineData;
  }

  //Create our links for the starting scatter plots
  const linksCoT = anu.create('cot', 'links');
  const lines = anu.selectName('links', scene)
                   .bind('greasedLine',
                     {
                       meshOptions: {
                         points: (d) => getLineData(d),
                         updateable: true
                       },
                       materialOptions: {
                         width: 0.003,
                         createAndAssignMaterial: true,
                         colors: (d) => [scaleC(d.Origin)],
                         colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_NONE, //Use same color throughout the entire line
                         useColors: true
                       }
                     },
                     data
                   );
  
  //Helper function to update the greasedLine and its vertices when the scatter plots change
  function updateLines() {
    lines.run((d,n,i) => {
      const lineData = getLineData(d);
      n.widths = BABYLON.CompleteGreasedLineWidthTable(lineData.length, n.widths, 1, 2, 2); //Update the widths with the new number of vertices/points per line
      n.setPoints(lineData);
    })
  }

  //Create GUI for adding and removing scatter plots
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
  let rect1 = GUI.Button.CreateSimpleButton('button1', 'Add Scatter Plot');
  rect1.width = 0.15;
  rect1.height = '40px';
  rect1.cornerRadius = 2;
  rect1.color = 'white';
  rect1.thickness = 4;
  rect1.background = 'blue';
  rect1.top = '40%';
  rect1.left = '-25%';
  rect1.onPointerClickObservable.add(() => {
      createScatterPlot(scatterplots.length);
      updateLines();
  });

  let rect2 = GUI.Button.CreateSimpleButton('button2', 'Remove Scatter Plot');
  rect2.width = 0.19;
  rect2.height = '40px';
  rect2.cornerRadius = 2;
  rect2.color = 'white';
  rect2.thickness = 4;
  rect2.background = 'blue';
  rect2.top = '40%';
  rect2.left = '25%';
  rect2.onPointerClickObservable.add(() => {
    if (scatterplots.length > 1) {
      removeScatterPlot(scatterplots.length - 1);
      updateLines();
    }
  });
  advancedTexture.addControl(rect1);
  advancedTexture.addControl(rect2);

  return scene;
}