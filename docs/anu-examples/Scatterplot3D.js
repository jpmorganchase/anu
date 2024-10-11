// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector3 } from '@babylonjs/core';
import iris from './data/iris.json' assert {type: 'json'};  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function scatterplot3D(engine){

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(2, 2, -3.5);

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  //In this case, we create scale functions that correspond to the x, y, and z positions
  //nice() adds some padding to both ends of the scale
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice();

  //We also create a scale function for the three types of flowers in our iris dataset
  //ordinalChromatic() is an Anu helper function to create an array of hex colors, 'd310' specifies this to be schemecategory10 from D3
  //toStandardMaterial() is an Anu helper function to convert an array of hex colors to their respective StandardMaterial from Babylon
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");

  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create sphere meshes for each row of our data and set their visual encodings using method chaining
  //These spheres are created as children of the CoT due to chart.bind()
  //Remember that in this case, 'CoT' is the Babylon TransformNode and 'chart' is the Anu Selection
  let spheres = chart.bind('sphere', { diameter: 0.05 }, iris)
                     .positionX((d) => scaleX(d.sepalLength))
                     .positionY((d) => scaleY(d.petalLength))
                     .positionZ((d) => scaleZ(d.sepalWidth))
                     .material((d) => scaleC(d.species))   //We set the material to change the spheres' color as our scaleC() was configured to return a StandardMaterial

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } });

  return scene;
};