// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/stocks.csv';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function linechart2D(engine){

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
  
  //Create D3 functions to parse the time and date
  let parseTime = d3.timeParse('%b %d %Y');
  let dateFormat = d3.timeFormat('%Y');

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleTime().domain(d3.extent(data.map((d) => parseTime(d.date)))).range([-1, 1]);
  let scaleY = d3.scaleLinear().domain([0, Math.max(...data.map(d => d.price))]).range([-1, 1]).nice();
  //Do the same for color, using Anu helper functions map scale outputs to Color4 objects based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

  //Create an array of arrays where each sub-array is an ordered list of Vector3 corresponding to the timeseries for each stock symbol
  let paths = Object.values(data.reduce((acc, d) => {
    let position = new BABYLON.Vector3(scaleX(parseTime(d.date)), scaleY(d.price), 0);
    (acc[d.symbol] = acc[d.symbol] || []).push(position);
    return acc;
  }, {} ));

  //For each point in our paths array of arrays, set the color based on the line it belongs to
  let colors = paths.map((path, i) => path.map(() => scaleC(i)));

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create a lineSystem mesh as a child of our CoT that will render the paths we had defined
  let lines = chart.bind('lineSystem', { lines: paths, colors: colors })
                   .positionZ(-0.01); //Move forward to prevent z-fighting

  //Use the axes prefab with our two D3 scales with additional customizations
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY },
                             parent: CoT,                         
                             domainMaterialOptions: { width: 0.025 },
                             labelTicks: { x: scaleX.ticks(d3.timeYear) },
                             labelFormat: { x: dateFormat, y: (text) => '$' + text }
  });

  return scene;
}