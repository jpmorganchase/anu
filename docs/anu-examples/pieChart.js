// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function pieChart(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 1.25, -1);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Create some fake data
  const data = [2, 3, 5, 7, 11, 13, 17, 19];

  //Create our D3 pie generator which will calculate the required angles for our pie chart
  const pie = d3.pie();
  //Create arcs for our data
  const arcs = pie(data);

  //Create a D3 scale function that will color each pie segment
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create cylinder meshes as children of our CoT to form our pie segments based on the arcs we calculated 
  let pieSegments = chart.bind('cylinder',
    {
      arc: (d,n,i) => (d.endAngle - d.startAngle) / (Math.PI * 2),  //Babylon cylinders use percentages, so we have to convert this value
      diameter: 1,
      height: 0.1,
      enclose: true   //Only strictly necessary to set to true if the pie segments are separated from each other
    },
    arcs)
    .rotationY((d,n,i) => d.startAngle - Math.PI / 2)   //Offset the rotation so that the segments "start" at 12 o'clock and not 3 o'clock
    .material((d,n,i) => scaleC(i));

  return scene;
}