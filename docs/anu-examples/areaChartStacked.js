// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/us-employment.csv';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function areaChartStacked(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Get the names of all the employment categories
  let categories = Object.keys(data[0]).splice(1, data.length);
  
  //Create D3 functions to help parse and format time
  let parseTime = d3.timeParse('%Y-%m-%d');
  let dateFormat = d3.timeFormat('%Y');

  //Create a D3 stack generator
  let stack = d3.stack()
      .keys(categories)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

  //Stack the data into individual series for each employment category
  let series = stack(data);


  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleTime().domain(d3.extent(data.map((d) => parseTime(d.month)))).range([-1.25, 1.25]);
  let scaleY = d3.scaleLinear().domain([0, d3.max(series[series.length - 1].map(d => d[1]))]).range([-1, 1]).nice();  //Take the largest value from the top-most stack
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial(categories.length)).domain(categories);

  //Create a function that will map each series to Vector3 coordinates
  let seriesToPath = (series) => {
    return [
      series.map(d => new BABYLON.Vector3(scaleX(parseTime(d.data.month)), scaleY(d[0]), 0)),
      series.map(d => new BABYLON.Vector3(scaleX(parseTime(d.data.month)), scaleY(d[1]), 0))
    ]
  };

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);
  
  //Create ribbon meshes as children of our CoT for each series
  let ribbons = chart.bind('ribbon', { pathArray: (d) => seriesToPath(d), sideOrientation: BABYLON.Mesh.DOUBLESIDE }, series)
    .material((d) => scaleC(d.key))
    .positionZ(-0.002);   //Move ribbon forward to prevent z-fighting

  //Use the Axes prefab with our two D3 scales with additional customizations
  anu.createAxes('myAxes', {
    scale: { x: scaleX, y: scaleY },
    parent: CoT,                         
    background: false,
    labelProperties: { x: { 'rotation.z': Math.PI / 2 }},
    labelTicks: { x: scaleX.ticks(d3.timeYear) },
    labelFormat: { x: dateFormat, y: (text) => text }
  });
  
  //Create a CoT as a child of our chart that will hold our legend
  let legend = chart.bind('cot', {}, [undefined]);

  //Bind planes that will serve as keys in our legend
  let keys = legend.bind('plane', { size: 0.08 }, categories)
    .position((d,n,i) => new BABYLON.Vector3(0, i * 0.09, 0))
    .material((d) => scaleC(d))

  //Bind labels for the legend
  let labels = legend.bind('planeText', { size: 0.08, text: (d) => d, align: 'left' }, categories)
    .position((d,n,i) => new BABYLON.Vector3(0.09, i * 0.09, 0));

  //Adjust the legend position
  legend.position(new BABYLON.Vector3(1.5, -1, 0));

  //Shift the entire chart to the left to center it in the default camera view
  chart.positionX(-0.25)

  return scene;
}