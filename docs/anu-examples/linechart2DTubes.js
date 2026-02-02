// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export async function linechart2DTubes(engine){

  const data = await vega['stocks.csv']();

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
  //Do the same for color, using Anu helper functions map scale outputs to Color3 objects based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor3());

  //Create an array of arrays where each sub-array is an ordered list of Vector3 corresponding to the timeseries for each stock symbol
  //These Vectors will be the actual positional values for our lines
  let paths = Object.values(data.reduce((acc, d) => {
    let position = new BABYLON.Vector3(scaleX(parseTime(d.date)), scaleY(d.price), 0);
    (acc[d.symbol] = acc[d.symbol] || []).push(position);
    return acc;
  }, {} ));

  //Smooth out the paths so that they are less jagged, which causes rendering issues with Tubes
  paths = paths.map(path => BABYLON.Curve3.CreateCatmullRomSpline(path, 20, false).getPoints());

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create tubes as children of our CoT that will render the paths we had defined, one tube for each path
  let lines = chart.bind('tube', { path: (d) => d, radius: 0.005 }, paths)
                   .material((d,n,i) => {
                    //Set a material for each tube which is what determines its color
                    const material = new BABYLON.StandardMaterial('LineMaterial' + i);
                    material.diffuseColor = scaleC(i);    //Set base color
                    material.emissiveColor = scaleC(i).multiplyByFloats(0.25, 0.25, 0.25);  //Make a bit brighter, using full values will blow out the color
                    material.specularColor = BABYLON.Color3.Black();  //Disable reflections
                    return material;
                   });

  //Use the axes prefab with our two D3 scales with additional customizations
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY },
                             parent: CoT,                         
                             domainMaterialOptions: { width: 0.01 },
                             labelTicks: { x: scaleX.ticks(d3.timeYear) },
                             labelFormat: { x: dateFormat, y: (text) => '$' + text }
  });

  return scene;
}