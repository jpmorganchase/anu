// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/jet_vector_field.json';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function vectorField(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, -0.25, 0), scene);
  camera.position = new BABYLON.Vector3(-2, 0.25, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain([0,90]).range([-1.5,1.5]).nice();
  let scaleY = d3.scaleLinear().domain([0,30]).range([-0.5,0.5]).nice();
  let scaleZ = d3.scaleLinear().domain([0,30]).range([-0.5,0.5]).nice();
  //Create a color scale that will output colors based on our specified hex values. Note that this function returns a string 'rgb(r, g, b)'
  let scaleC = d3.scaleLinear().domain([0,10,15,20]).range(["#FFFFFF", "#FFFA00", "#FF6F00", "#FF0000"]);
  //Create a scale for our opacity
  let scaleO = d3.scaleLinear().domain([0,10,15,30]).range([0,0.5,0.8,1]);

  //We use Mesh instancing here for better performance, first we create a Mesh that serves as the root Node  
  let rootCone = anu.create('cylinder', 'rootCone', { height: 0.05, diameterTop: 0, diameterBottom: 0.015});
  rootCone.isVisible = false;
  rootCone.registerInstancedBuffer('color', 4);   //We need an InstancedBuffer to set the color of instances
  rootCone.hasVertexAlpha = true;   //Required to set transparency via the color channel's alpha value

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);
  
  //Create instanced cone meshes from our rootCone as children of our CoT for each row of our data and set their visual encodings using method chaining
  let vectors = chart.bindInstance(rootCone, data)
    .position((d,n,i) => new BABYLON.Vector3(scaleX(d.Position_x), scaleY(d.Position_y), scaleZ(d.Position_z)))
    .rotation((d,n,i) => new BABYLON.Vector3(d.Rotation_x, d.Rotation_y, d.Rotation_z))
    .setInstancedBuffer('color', (d) => {
      //D3 color scales return in the format 'rgb(r, g, b)', so we need to extract its values at renormalize in the range 0..1
      let rgb = scaleC(d.Velocity_length).replace('rgb(', '').replace(')', '').split(',');
      return new BABYLON.Color4(rgb[0]/ 255, rgb[1] / 255, rgb[2] / 255, scaleO(d.Velocity_length));
    })

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes',
    {
      scale: { x: scaleX, y: scaleY, z: scaleZ },
      grid: false,
      background: false,
      parent: chart
  });

  return scene;
}