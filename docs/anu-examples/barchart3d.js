// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, Vector3 } from '@babylonjs/core';
import cars from './data/cars.json' assert {type: 'json'};  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function barchart3D(engine){

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(5, 5, -12);

  //Get the unique values for our categorical and ordinal dimensions
  const origin = [...new Set(cars.map(item => item.Origin))];
  const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort().reverse();

  //Aggregate our data to the mean horsepower and MPG for the two above dimensions: origin and cylinders
  let carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                          Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}},
                                                          d => d.Origin,
                                                          d => d.Cylinders);
  carsRollup = carsRollup.map(([Origin, Cylinders, Data]) => ({ Origin, Cylinders, ...Data }));

  //Get extents for our linear dimensions: horsepower and MPG
  const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))]);
  const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))]).reverse();

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  //In this case, we create scale functions that correspond to the x, y, and z positions
  let scaleX = d3.scaleBand().domain(cylinders).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);
  let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,5]).nice();
  let scaleZ = d3.scaleBand().domain(origin).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);

  //We also create a scale function to map the MPG to color
  //sequentialChromatic() is an Anu helper function to create an array of sequential hex colors, 'OrRd' specifies this to be an orange-red color scheme
  //toStandardMaterial() is an Anu helper function to convert an array of hex colors to their respective StandardMaterial from Babylon
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toStandardMaterial()).domain(MPGMinMax);

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");

  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create box meshes for our rolled-up data and set their visual encodings using method chaining
  //These boxes are created as children of the CoT due to chart.bind()
  //Remember that in this case, 'CoT' is the Babylon TransformNode and 'chart' is the Anu Selection
  let bars = chart.bind('box', { height: 1, width: 0.8, depth: 0.8 }, carsRollup)
                  .positionX((d) => scaleX(d.Cylinders))
                  .positionZ((d) => scaleZ(d.Origin))
                  .scalingY((d) => scaleY(d.Horsepower))
                  .positionY((d) => scaleY(d.Horsepower) / 2)
                  .material((d, i) => scaleC(d.Miles_per_Gallon));  //We set the material to change the boxes' color as our scaleC() was configured to return a StandardMaterial


  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } });

  //Adjust the position of the chart slightly
  chart.positionY(-0.25);

  return scene;
}