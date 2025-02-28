// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Color3, Mesh, VertexBuffer } from '@babylonjs/core';
import data from './data/yield-curve.csv';  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function linechart3D(engine) {

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(5, 0, -6);

  //Specify the columns in our dataset that should each be its own line
  let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

  //Create D3 functions to parse the time and date
  let parseTime = d3.timeParse("%m/%d/%Y");
  let dateFormat = d3.timeFormat("'%y");

  //Get all of the dates in our dataset into an array so that we can easily get its extents later
  let dates = data.map((d) => parseTime(d.Date))

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  //In this case, we create scale functions that correspond to the x, y, and z positions and color
  let scaleX = d3.scaleTime().domain(d3.extent(dates)).range([-3, 3]);
  let scaleY = d3.scaleLinear().domain([0, 9]).range([-1, 1]).nice();
  let scaleZ = d3.scalePoint().domain(years).range([-2, 2]);
  let scaleC = d3.scaleSequential(d3.interpolateBlues).domain([1, -1]);

  //For each column/year/line, map it to its x, y, and z position along each timestep using the D3 scale functions
  let paths = years.map((col) => {
    return data.map((row)=> new Vector3(scaleX(parseTime(row.Date)),
                                        scaleY(row[col]),
                                        scaleZ(col)));
  });

  //Bind a new CoT
  let CoT = anu.bind("cot");

  //Bind a new ribbon mesh to the CoT, which we will need to update manually to create our 3D line chart
  let ribbon = CoT.bind("ribbon", { pathArray: paths, updatable: true, sideOrientation: Mesh.DOUBLESIDE })
                   .selected[0];  // Get the Babylon Mesh that Anu had created for us, which had been stored in this selected property as an element of an array

  //The ribbon already has our position values, but we now need to set its color values for each vertex in its mesh (data row)
  //Retrieve the VertexBuffer of position values of the ribbon, these are stored as Numbers in a flat array [x0, y0, z0, x1, y1, z1, ...]
  let positions = ribbon.getVerticesData(VertexBuffer.PositionKind);
  let colors = [];

  //Loop through our position buffer
  for (let p = 0; p < positions.length; p += 3) {
    //Get the color that this vertex should have based on its y-axis value
    let colorString = scaleC(positions[p + 1]);
    //Our scaleC function, which is from D3, returns a string in the format 'rgb(r, g, b)', so we need to parse this
    let color = colorString.substring(4, colorString.length - 1)
                           .replace(/ /g, "")
                           .split(",");
    //Store our new color
    colors.push(color[0] / 255, color[1] / 255, color[2] / 255, 1);
  }

  //Set our new color values to the ribbon
  ribbon.setVerticesData(VertexBuffer.ColorKind, colors);
  //Turn off picking to improve performance of our complex mesh geometry
  ribbon.isPickable = false;

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  //Also adjust its visual properties to properly format the axes labels
  anu.createAxes("test", scene, { parent: CoT,
                                  scale: { x: scaleX, y: scaleY, z: scaleZ },
                                  domainMaterialOptions: { "color": Color3.Black(), width: 0.05 },
                                  gridTicks: { x: scaleX.ticks(d3.timeYear.every(2)) },
                                  labelTicks: { x: scaleX.ticks(d3.timeYear.every(2)) },
                                  labelFormat: { x: dateFormat, y: (text) => (text === undefined) ? "0%" : text + "%" }
  });

  //Add some additional white lines for each line (column)
  let whiteLines = CoT.bind("lineSystem", { lines: paths })
                      .attr("color", Color3.White())
                      .prop("alpha", 0.5);

  //Add an additional black line to the front-most line
  let blackOutline = CoT.bind("lines", { points: paths[0] })
                        .attr("color", Color3.Black());

  return scene;
}
