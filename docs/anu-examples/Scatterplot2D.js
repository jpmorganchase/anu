// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Color3, StandardMaterial } from '@babylonjs/core';
import iris from './data/iris.json' assert {type: 'json'};  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function scatterplot2D(engine){

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

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  //In this case, we create scale functions that correspond to the x and y positions
  //nice() adds some padding to both ends of the scale
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice();

  //We also create a scale function for the three types of flowers in our iris dataset
  //d3.schemecategory10 maps the input domain to an array of up to 10 hex colors
  let scaleC = d3.scaleOrdinal().domain(['setosa', 'versicolor', 'virginica']).range(d3.schemeCategory10);

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");

  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create disc meshes for each row of our data and set their visual encodings using method chaining
  //These discs are created as children of the CoT due to chart.bind()
  //Remember that in this case, 'CoT' is the Babylon TransformNode and 'chart' is the Anu Selection
  let spheres = chart.bind('disc', { radius: 0.02, sideOrientation:2 }, iris)
                     .positionX((d) => scaleX(d.sepalLength))
                     .positionY((d) => scaleY(d.petalLength))
                     .positionZ(-0.01)  //Adjust the z position slightly to prevent Z-fighting
                     .material((d, i) => new StandardMaterial("myMaterial", scene))  //Each disc mesh needs its own material before we can change its color
                     .diffuseColor((d) => Color3.FromHexString(scaleC(d.species)))   //Our scaleC returns a hex color string, so we need to convert it to a Color3 object

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});

  return scene;
};