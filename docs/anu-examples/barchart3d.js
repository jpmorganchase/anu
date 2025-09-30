// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/cars.json' assert {type: 'json'};

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function barchart3D(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(2, 2, -3.5);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

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
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create box meshes as children of our CoT for our rolled-up data and set their visual encodings using method chaining
  let bars = chart.bind('box', { height: 1, width: 0.35, depth: 0.35 }, carsRollup)
                  .positionX((d) => scaleX(d.Cylinders))
                  .positionZ((d) => scaleZ(d.Origin))
                  .scalingY((d) => scaleY(d.Horsepower))
                  .positionY((d) => scaleY(d.Horsepower) / 2)
                  .material((d) => scaleC(d.Miles_per_Gallon));   //We set material directly as scaleC() was configured to return a StandardMaterial

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });

  //Adjust the position of the chart slightly
  chart.positionY(-1);

  return scene;
}