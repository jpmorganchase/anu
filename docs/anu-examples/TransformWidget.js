// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/iris.json' assert {type: 'json'};

export function transformWidget(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, -0.25, 0), scene);
  camera.position = new BABYLON.Vector3(2, 1.5, -4);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalLength))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.petalLength))).range([-1,1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalWidth))).range([-1,1]).nice();
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create sphere meshes as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bind('sphere', { diameter: 0.05 }, data)
                     .position((d) => new BABYLON.Vector3(scaleX(d.sepalLength), scaleY(d.petalLength), scaleZ(d.sepalWidth)))
                     .material((d) => scaleC(d.species));

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });

  //Use the Transform Widget prefab to add 3D UI handles to position, rotate, and scale our chart
  chart.positionUI()
       .rotateUI()
       .scaleUI({ minimum: 0.5, maximum: 2 });

  return scene;
};



