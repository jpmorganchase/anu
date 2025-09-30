// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/iris.json' assert {type: 'json'};  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function scatterplot2D(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -5), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalLength))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.petalLength))).range([-1,1]).nice();
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create disc meshes as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bind('disc', { radius: 0.02, sideOrientation:2 }, data)
                     .position((d) => new BABYLON.Vector3(scaleX(d.sepalLength), scaleY(d.petalLength), -0.01)) //Move z forward to prevent z-fighting
                     .material((d) => scaleC(d.species))   //We set material directly as scaleC() was configured to return a StandardMaterial

  //Use the Axes prefab with our two D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY }, parent: chart });

  return scene;
};