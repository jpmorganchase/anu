// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import cars from './data/cars.json';

export function linkedScatterPlots(engine){

  //Babylon boilerplate
  const scene = new BABYLON.Scene(engine);
  const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -10), scene)
  const camera = new BABYLON.ArcRotateCamera("Camera", -(Math.PI / 4), Math.PI / 2.25, 6, new BABYLON.Vector3(0, -0.5, 2), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  const dimensions = ['Miles_per_Gallon', 'Cylinders', 'Displacement', 'Horsepower', 'Weight_in_lbs', 'Acceleration'];
  const scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());
  const scatterplots = [];    //List of our scatterplots
  const offset = 2;           //Distance between scatterplots

  function createScatterPlot(id) {
    //Pick random dimensions to visualize
    let dimX = dimensions[Math.floor(Math.random() * dimensions.length)];
    let dimY = dimensions[Math.floor(Math.random() * dimensions.length)];
    //Avoid using the same X Y variables
    while (dimX === dimY)
      dimY = dimensions[Math.floor(Math.random() * dimensions.length)];

    //Create D3 scales
    const scaleX = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => d[dimX]))).range([-1, 1]).nice();
    const scaleY = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => d[dimY]))).range([-1, 1]).nice();

    //Create root sphere that will be instanced
    const rootSphere = anu.create('sphere', `rootSphere-${id}`, { diameter: 0.04, segments: 4});
    rootSphere.material = new BABYLON.StandardMaterial('sphereMat');
    rootSphere.registerInstancedBuffer("color", 4);
    rootSphere.isVisible = false;

    //Create CoT and spheres
    const CoT = anu.create('cot', `sp-${id}`);
    const chart = anu.selectName(`sp-${id}`, scene);
    const spheres = chart.bindInstance(rootSphere, cars)
      .position((d) => new BABYLON.Vector3(scaleX(d[dimX]), scaleY(d[dimY]), 0))
      .scalingZ(0.2)
      .setInstancedBuffer('color', (d) => scaleC(d.Origin));

    //Create axes
    const axesOptions = new anu.AxesConfig({ x: scaleX, y: scaleY });
    axesOptions.parent = chart;
    axesOptions.grid = false;
    axesOptions.domain = false;
    axesOptions.labelProperties = { size : 0.15 };
    const axes = anu.createAxes(`axes-${id}`, scene, axesOptions);

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

  //Create initial scatterplots
  createScatterPlot(0);
  createScatterPlot(1);
  createScatterPlot(2);

  //Forms a line for each row in the data
  function getLineData(d) {
    const lineData = [];
    for (let i = 0; i < scatterplots.length; i++) {
      const sp = scatterplots[i];
      lineData.push(new BABYLON.Vector3(sp.scaleX(d[sp.dimX]), sp.scaleY(d[sp.dimY]), sp.id * offset));
    }
    return lineData;
  }

  //Create initial lines
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
          colorDistribution: 1,
          useColors: true
        }
      },
      cars
    );
  
  //Updates the lines and its vertices to the updated scatter plots
  function updateLines() {
    lines.run((d,n,i) => {
      const lineData = getLineData(d);
      n.widths = BABYLON.CompleteGreasedLineWidthTable(lineData.length, n.widths, 1, 2, 2);
      n.setPoints(lineData);
    })
  }

  //Create GUI
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let rect1 = GUI.Button.CreateSimpleButton("button1", "Add Scatter Plot");
  rect1.width = 0.15;
  rect1.height = "40px";
  rect1.cornerRadius = 2;
  rect1.color = "white";
  rect1.thickness = 4;
  rect1.background = "blue";
  rect1.top = "30%";
  rect1.left = "-25%";
  rect1.onPointerClickObservable.add(() => {
      createScatterPlot(scatterplots.length);
      updateLines();
  });
  let rect2 = GUI.Button.CreateSimpleButton("button2", "Remove Scatter Plot");
  rect2.width = 0.15;
  rect2.height = "40px";
  rect2.cornerRadius = 2;
  rect2.color = "white";
  rect2.thickness = 4;
  rect2.background = "blue";
  rect2.top = "30%";
  rect2.left = "25%";
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