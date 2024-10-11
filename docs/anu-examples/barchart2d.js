// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, Vector3 } from '@babylonjs/core';
import cars from './data/cars.json' assert {type: 'json'};  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function barchart2d(engine){

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(0, 0, -3);


  //Get the unique values for our ordinal dimension
  const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort();

  //Aggregate our data to the mean horsepower and MPG for the above ordinal dimension
  let carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                          Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}},
                                                          d => d.Cylinders)
  carsRollup = carsRollup.map(([Cylinders, Data]) => ({Cylinders, ...Data }));

  //Get extents for our linear dimensions: horsepower and MPG
  const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))])
  const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))])

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  //In this case, we create scale functions that correspond to the x and y positions
  let scaleX = d3.scaleBand().domain(cylinders).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,2]).nice();

  //We also create a scale function to map the MPG to color
  //sequentialChromatic() is an Anu helper function to create an array of sequential hex colors, 'Greens' specifies this to be a green color scheme
  //toStandardMaterial() is an Anu helper function to convert an array of hex colors to their respective StandardMaterial from Babylon
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('Greens').toStandardMaterial()).domain(MPGMinMax);

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");

  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create plane meshes for our rolled-up data and set their visual encodings using method chaining
  //These planes are created as children of the CoT due to chart.bind()
  //Remember that in this case, 'CoT' is the Babylon TransformNode and 'chart' is the Anu Selection
  let bars = chart.bind('plane', { height: 1, width: 0.3, sideOrientation:2 }, carsRollup)
                  .positionX((d) => scaleX(d.Cylinders))
                  .positionZ(-0.01) //Adjust the z position slightly to prevent Z-fighting
                  .scalingY((d) => scaleY(d.Horsepower))
                  .positionY((d) => scaleY(d.Horsepower) / 2)
                  .material((d, i) => scaleC(d.Miles_per_Gallon));  //We set the material to change the planes' color as our scaleC() was configured to return a StandardMaterial

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY } });

  //Adjust the position of the chart slightly
  chart.positionY(-1);

  return scene;
}