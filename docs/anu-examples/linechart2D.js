// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Color3 } from '@babylonjs/core';
import data from './data/yield-curve.csv';  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function linechart2D(engine){

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(0, 0, -3.5);

  //Specify the columns in our dataset that should each be its own line
  let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

  //Create D3 functions to parse the time and date
  let parseTime = d3.timeParse("%m/%d/%Y");
  let dateFormat = d3.timeFormat("'%y");

  //Get all of the dates in our dataset into an array so that we can easily get its extents later
  let dates = data.map((d) => parseTime(d.Date))

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  //In this case, we create scale functions that correspond to the x and y positions
  let scaleX = d3.scaleTime().domain(d3.extent(dates)).range([-2, 2]);  //Time
  let scaleY = d3.scaleLinear().domain([0, 9]).range([-1, 1]).nice();   //Percent value between 0 and 0

  //For each column/year/line, map it to its x and y position along each timestep using the D3 scale functions
  let paths = years.map((col) => {
      return data.map((row)=> new Vector3(scaleX(parseTime(row.Date)),
                                          scaleY(row[col]),
                                          0));
  });

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");

  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create the lineSystem that will render the paths we had created
  let lines = chart.bind("lineSystem", { lines: paths })
                   .attr("color", Color3.White())
                   .prop("alpha", 1);

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  //Also adjust its visual properties to properly format the axes labels
  anu.createAxes("test", scene, { parent: chart,
                                  scale: { x: scaleX, y: scaleY },
                                  domainMaterialOptions: { "color": Color3.Black(), width: 5 },
                                  gridTicks: { x: scaleX.ticks(d3.timeYear.every(2)) },
                                  labelTicks: { x: scaleX.ticks(d3.timeYear.every(2)) },
                                  labelFormat: { x: dateFormat, y: (text) => (text === undefined) ? "0%" : text + "%" }
  });

  return scene;
}