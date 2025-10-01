// SPDX-License-Identifier: Apache-2.0
// Copyr// Test method calling on nested properties

// Test getting scaling values

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/penguins.json' assert {type: 'json'};

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function scatterplot3D(engine){

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

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d['Beak Length (mm)']))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d['Flipper Length (mm)']))).range([-1,1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d['Beak Depth (mm)']))).range([-1,1]).nice();
  let scaleSize = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d['Body Mass (g)']))).range([0.02, 0.1]);
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene)
  

  //box.scaling.scaleInPlace(20);

  //Create sphere meshes as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bind('sphere', { diameter: (d) => scaleSize(d['Body Mass (g)'] ?? 0) }, data)
                     .position((d) => new BABYLON.Vector3(scaleX(d['Beak Length (mm)']), scaleY(d['Flipper Length (mm)']), scaleZ(d['Beak Depth (mm)']),))
                     .material((d) => scaleC(d.Species)) //We set material directly as scaleC() was configured to return a StandardMaterial



const start = performance.now();

spheres.position.x(1)
.position.scaleInPlace(2)
.rotation.y(Math.PI / 4)
.scaling.set(() => Math.random() * 2, () => Math.random() * 2, () => Math.random() * 2);

const end = performance.now();
const duration = end - start; 


console.log(`Method execution time: ${duration} ms`);
                    //console.log(spheres.isVisible());
                    
                    //Only show the "Adelie Penguin" species for clarity;

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });

  return scene;
};