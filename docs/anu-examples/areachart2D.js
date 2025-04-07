// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/stocks.csv';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function areachart2D(engine){

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

  //Filter our data to only show a single stock
  let filteredData = data.filter(d => d.symbol === 'GOOG');

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleTime().domain(d3.extent(filteredData.map((d) => parseTime(d.date)))).range([-1, 1]);
  let scaleY = d3.scaleLinear().domain([0, Math.max(...filteredData.map(d => d.price))]).range([-1, 1]).nice();

  //Create an array of Vector3 corresponding to the timeseries for our stock symbol
  let path = filteredData.map((row) => new BABYLON.Vector3(scaleX(parseTime(row.date)), scaleY(row.price), 0));
  //Because we want to color the area below the line, we create another array at y=0
  let zeroPath = path.map((value) => new BABYLON.Vector3(value.x, scaleY(0), 0));

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create a lineSystem mesh as a child of our CoT that will render the paths we had defined
  let lines = chart.bind('lineSystem', { lines: [path] })
                   .attr('color', BABYLON.Color3.Blue())
                   .positionZ(-0.01);   //Move lineSystem forward to prevent z-fighting

  //Create a ribbon mesh as a child of our CoT that will render area below the line
  let ribbon = chart.bind('ribbon', { pathArray: [path, zeroPath], sideOrientation: BABYLON.Mesh.DOUBLESIDE })
                    .material((d,n,i) => {
                      let mat = new BABYLON.StandardMaterial('ribbonMat');
                      mat.diffuseColor = BABYLON.Color3.FromHexString('#4287f5');
                      return mat;
                  })
                    .positionZ(-0.01);   //Move ribbon forward to prevent z-fighting

  //Use the Axes prefab with our two D3 scales with additional customizations
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY },
                             parent: CoT,                         
                             domainMaterialOptions: { width: 0.025 },
                             labelTicks: { x: scaleX.ticks(d3.timeYear) },
                             labelFormat: { x: dateFormat, y: (text) => '$' + text }
  });

  return scene;
}