// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as d3 from 'd3';
import data from './data/cars.json' assert {type: 'json'};

export function layout(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 2.5, 0), scene);
  camera.position = new BABYLON.Vector3(0, 4, -12);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //To use layouts we need charts to begin with, generate 15 charts
  let allCharts = [];
  for (let i = 0; i < 15; i++) {
    let chart = (Math.random() > 0.5) ? make2Dchart(Math.random() * 100, scene) : make3Dchart(Math.random() * 100, scene);
    allCharts.push(chart);
  }

  //Layout variables
  let rows = 3;
  let curve = 5;
  let margin = new BABYLON.Vector2(0.5, 0.5);

  //Create the layout, specify the layout type, parent name, and layout configurations
  let layout = new anu.cylinderLayout('Layout', { selection: anu.selectTag('chart', scene), rows: rows, radius: curve, margin: margin }, scene)
                      .attr('row', rows)
                      .attr('radius', curve)
                      .attr('margin', margin);

  //Define functions to update layout properties which will be called from UI events
  const updateRows = (val) => {
    rows = Math.floor(val);
    layout.attr('row', rows)
  }

  const updateCurve = (val) => {
    curve = val;
    layout.attr('radius', curve);
  }

  const updateMarginX = (val) => {
    margin.x = val;
    layout.attr('margin', margin);
  }

  const updateMarginY = (val) => {
    margin.y = val;
    layout.attr('margin', margin);
  }

  const setLayout = (val) => {
    switch (val) {
        case 0:
          layout.planeLayout();
          break;
        case 1:
          layout.cylinderLayout();
          break;
        case 2:
          layout.sphereLayout();
          break;
    }
  }

  //Define functions to add and remove charts from the layout which will be called from UI events
  function addChart(scene) {
    let chart = (Math.random() > 0.5) ? make2Dchart(Math.random() * 100, scene) : make3Dchart(Math.random() * 100, scene);
    allCharts.push(chart);
    layout.options.selection = anu.selectTag('chart', scene);
    layout.update();
  }

  function removeChart(scene) {
    if (allCharts.length > 0) {
      allCharts[allCharts.length - 1].dispose();
      allCharts.pop();
      layout.options.selection = anu.selectTag('chart', scene);
      layout.update();
    }
  }

  //Make the Babylon UI that will allow the user to change the layout
  let layoutGroup = new GUI.RadioGroup('Layout');
  layoutGroup.addRadio('Plane', setLayout, true);
  layoutGroup.addRadio('Cylinder', setLayout, false);
  layoutGroup.addRadio('Sphere', setLayout);

  let rowsGroup = new GUI.SliderGroup('Config', 'S');
  rowsGroup.addSlider('row', updateRows, 'rows', 1, 8, rows, (val) => Math.floor(val));

  let curveGroup = new GUI.SliderGroup('Curvature', 'S');
  curveGroup.addSlider('curvature', updateCurve, 'units', 0, 10, curve, (val) => val.toFixed(1));

  let marginXgroup = new GUI.SliderGroup('MarginX', 'S');
  marginXgroup.addSlider('marginx', updateMarginX, 'unit', 0, 10, margin.x, (val) => val.toFixed(1));

  let marginYgroup = new GUI.SliderGroup('MarginY', 'S');
  marginYgroup.addSlider('marginy', updateMarginY, 'unit', 0, 10, margin.y, (val) => val.toFixed(1));

  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

  // let selectBox = new GUI.SelectionPanel('sp', [rowsGroup, curveGroup, marginXgroup, marginYgroup, layoutGroup]);
  // selectBox.width = 0.2;
  // selectBox.height = 1.5;
  // selectBox.scaleX = 0.6;
  // selectBox.scaleY = 0.6;
  // selectBox.background = '#FFFFFF';
  // selectBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  // selectBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  // selectBox.fontFamily = 'times new roman';
  // selectBox.fontSize = '14pt';

  // let rect2 = GUI.Button.CreateSimpleButton('button1', 'add chart');
  // rect2.width = 0.2; // 0.2 = 20%
  // rect2.height = '40px';
  // rect2.cornerRadius = 20;
  // rect2.color = 'white';
  // rect2.thickness = 4;
  // rect2.background = 'blue';

  // rect2.top = 200; //200 px
  // rect2.left = '10%';
  // rect2.onPointerClickObservable.add(() => {
  //     addChart(scene);
  // });

  // let rect1 = GUI.Button.CreateSimpleButton('button2', 'remove chart');
  // rect1.width = 0.2; // 0.2 = 20%
  // rect1.height = '40px';
  // rect1.cornerRadius = 20;
  // rect1.color = 'white';
  // rect1.thickness = 4;
  // rect1.background = 'blue';

  // rect1.top = 250; //200 px
  // rect1.left = '10%';
  // rect1.onPointerClickObservable.add(() => {
  //     removeChart(scene);
  // });
  // advancedTexture.addControl(rect1);
  // advancedTexture.addControl(rect2);
  // advancedTexture.addControl(selectBox);

  return scene;
}

//Code from 2D bar chart example
function make2Dchart(id, scene) {

  //Get the unique values for our ordinal dimension
  const cylinders = [...new Set(data.map(item => item.Cylinders))].sort();
  //Aggregate our data to the mean horsepower and MPG for the above ordinal dimension
  let carsRollup = d3.flatRollup(data, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                          Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}},
                                                          d => d.Cylinders)
  carsRollup = carsRollup.map(([Cylinders, Data]) => ({Cylinders, ...Data }));

  //Get extents for our linear dimensions: horsepower and MPG
  const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))])
  const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))])

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleBand().domain(cylinders).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,2]).nice();
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'interpolateGreens' palette from D3
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('Greens').toStandardMaterial()).domain(MPGMinMax);

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot' + id);
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot' + id, scene);

  //Create plane meshes as children of our CoT for our rolled-up data and set their visual encodings using method chaining
  let bars = chart.bind('plane', { height: 1, width: 0.3, sideOrientation:2 }, carsRollup)
                  .positionX((d) => scaleX(d.Cylinders))
                  .positionZ(-0.01) //Adjust the z position slightly to prevent Z-fighting
                  .scalingY((d) => scaleY(d.Horsepower))
                  .positionY((d) => scaleY(d.Horsepower) / 2)
                  .material((d, i) => scaleC(d.Miles_per_Gallon));  //We set material directly as scaleC() was configured to return a StandardMaterial

  //Use the Axes prefab with our two D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY }, parent: chart });
  
  chart.scaling(BABYLON.Vector3.Maximize(BABYLON.Vector3.Random(), BABYLON.Vector3.One().scale(0.5))) //Add random variation in sizing
       .addTags('chart');   //Add a tag so we can easily get all charts through selectTag()
    
  return chart;
}

//Code from 3D bar chart example
function make3Dchart(id, scene) {

  //Get the unique values for our categorical and ordinal dimensions
  const origin = [...new Set(data.map(item => item.Origin))];
  const cylinders = [...new Set(data.map(item => item.Cylinders))].sort().reverse();
  //Aggregate our data to the mean horsepower and MPG for the two above dimensions: origin and cylinders
  let carsRollup = d3.flatRollup(data, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                          Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}},
                                                          d => d.Origin,
                                                          d => d.Cylinders);
  carsRollup = carsRollup.map(([Origin, Cylinders, Data]) => ({ Origin, Cylinders, ...Data }));

  //Get extents for our linear dimensions: horsepower and MPG
  const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))]);
  const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))]).reverse();

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleBand().domain(cylinders).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,2]);
  let scaleZ = d3.scaleBand().domain(origin).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'interpolateOrRd' palette from D3
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toStandardMaterial()).domain(MPGMinMax);

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot' + id);
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot' + id, scene);

  //Create box meshes as children of our CoT for our rolled-up data and set their visual encodings using method chaining
  let bars = chart.bind('box', { height: 1, width: 0.35, depth: 0.35 }, carsRollup)
                  .positionX((d) => scaleX(d.Cylinders))
                  .positionZ((d) => scaleZ(d.Origin))
                  .scalingY((d) => scaleY(d.Horsepower))
                  .positionY((d) => scaleY(d.Horsepower) / 2)
                  .material((d, i) => scaleC(d.Miles_per_Gallon));   //We set material directly as scaleC() was configured to return a StandardMaterial

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });
  
  chart.scaling(BABYLON.Vector3.Maximize(BABYLON.Vector3.Random(), BABYLON.Vector3.One().scale(0.5)))
       .addTags('chart');   //Add a tag so we can easily get all charts through selectTag()
    
  return chart;
}