// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export async function histogram(engine) {

  const data = await vega['penguins.json']();

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0.5, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0.5, -2)
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create our D3 bin generator with a set domain that encompasses all penguins in the entire dataset
  let bin = d3.bin().domain([30, 65]).value(d => d['Beak Length (mm)']).thresholds(30);
  //Bin our data
  let bins = bin(data);

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain([30, 65]).range([-1, 1]);
  let scaleY = d3.scaleLinear().domain([0, 35]).range([0, 1]);
  
  //Create a material that will be shared by our histogram boxes
  let material = new BABYLON.StandardMaterial('histogramMaterial');
  material.diffuseColor = BABYLON.Color3.Teal();
  
  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);
  
  //Create box meshes as children of our CoT to form a histogram
  let bars = chart.bind('box', { height: 1, width: 2 / bins.length, depth: 0.01 }, bins)
                  .positionX((d) => scaleX((d.x0 + d.x1) / 2))
                  .scalingY((d) => scaleY(d.length))
                  .positionY((d) => scaleY(d.length) / 2)
                  .material(material);

  //Use the Axes prefab with our two D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY }, parent: chart });

  return scene;
}