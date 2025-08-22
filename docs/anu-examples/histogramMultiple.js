// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/penguins.json';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function histogramMultiple(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0.5, 0), scene);
  camera.position = new BABYLON.Vector3(0, 1, -1.5)
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //We need to bin our data for each penguin species in our dataset
  //Create our D3 bin generator with a set domain that encompasses all penguins in the entire dataset
  let bin = d3.bin().domain([30, 65]).value(d => d['Beak Length (mm)']).thresholds(30);
  //Bin our data for each variable
  let binsAdel = bin(data.filter(d => d.Species === 'Adelie'));
  let binsChin = bin(data.filter(d => d.Species === 'Chinstrap'));
  let binsGent = bin(data.filter(d => d.Species === 'Gentoo'));

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain([30, 65]).range([-1, 1]);
  let scaleY = d3.scaleLinear().domain([0, 25]).range([0, 1]);
  let scaleZ = d3.scaleBand().domain(['Adelie', 'Chinstrap', 'Gentoo']).range([0, 0.35]).paddingInner(1).paddingOuter(0.5);
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());
  
  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);
  
  //Create box meshes as children of our CoT to form a histogram for Adelie penguins
  let barsAdel = chart.bind('box', { height: 1, width: 2 / binsAdel.length, depth: 0.1 }, binsAdel)
                  .positionX((d) => scaleX((d.x0 + d.x1) / 2))
                  .positionZ(scaleZ('Adelie'))
                  .scalingY((d) => scaleY(d.length))
                  .positionY((d) => scaleY(d.length) / 2)
                  .material(scaleC('Adelie'));

  //Create box meshes as children of our CoT to form a histogram for Chinstrap penguins
  let barsChin = chart.bind('box', { height: 1, width: 2 / binsChin.length, depth: 0.1 }, binsChin)
                  .positionX((d) => scaleX((d.x0 + d.x1) / 2))
                  .positionZ(scaleZ('Chinstrap'))
                  .scalingY((d) => scaleY(d.length))
                  .positionY((d) => scaleY(d.length) / 2)
                  .material(scaleC('Chinstrap'));

  //Create box meshes as children of our CoT to form a histogram for Gentoo penguins
  let barsGent = chart.bind('box', { height: 1, width: 2 / binsGent.length, depth: 0.1 }, binsGent)
                  .positionX((d) => scaleX((d.x0 + d.x1) / 2))
                  .positionZ(scaleZ('Gentoo'))
                  .scalingY((d) => scaleY(d.length))
                  .positionY((d) => scaleY(d.length) / 2)
                  .material(scaleC('Gentoo'));

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes',
    {
      scale: { x: scaleX, y: scaleY, z: scaleZ },
      labelOptions: { z: { align: 'right'}},
      labelProperties: { z: { 'rotation.z': Math.PI / 3 } },  // Rotate the z-axis labels
      parent: chart
  });

  return scene;
}