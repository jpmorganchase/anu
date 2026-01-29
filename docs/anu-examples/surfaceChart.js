// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/yield-curve.csv';  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function surfaceChart(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(5, 0, -6);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Specify the columns in our dataset that should each be its own line
  let years = ['1 Yr', '2 Yr', '3 Yr', '5 Yr', '7 Yr', '10 Yr'];

  //Create D3 functions to parse the time and date
  let parseTime = d3.timeParse('%m/%d/%Y');
  let dateFormat = d3.timeFormat("'%y");

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleTime().domain(d3.extent(data.map((d) => parseTime(d.Date)))).range([-3, 3]);
  let scaleY = d3.scaleLinear().domain([0, 9]).range([-1, 1]).nice();
  let scaleZ = d3.scalePoint().domain(years).range([-2, 2]);
  //Do the same for color, using Anu helper functions map scale outputs to Color3 objects based on the 'interpolateBlues' palette from D3
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('Blues').toColor3()).domain([1, -1]);

  //For each year (i.e, column), convert its values to x, y, and z positions in 3D space using our D3 scale functions
  let paths = years.map((col) => {
    return data.map((row) => new BABYLON.Vector3(scaleX(parseTime(row.Date)),
                                                scaleY(row[col]),
                                                scaleZ(col)));
  });

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create a ribbon mesh as a child of our CoT using our calculated paths, then update the mesh's vertex data with color values
  let ribbon = chart.bind('ribbon', { pathArray: paths, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE })
                    .run((d,n,i) => {
                      //n is our one and only ribbon mesh, as our bind() function above only creates one ribbon
                      let positions = n.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                      let colors = [];
                      //Loop through our position buffer and set color values based on the y positions
                      for (let p = 0; p < positions.length; p += 3) {
                        let color = scaleC(positions[p + 1]);
                        colors.push(color.r, color.g, color.b, 1);
                      }
                      //Set our new color values to the ribbon
                      n.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
                    })
                    
  //Add some additional white lines for each line (column)
  let whiteLines = chart.bind('lineSystem', { lines: paths })
                        .attr('color', BABYLON.Color3.White());

  //Add an additional black line to the front-most line
  let blackOutline = chart.bind('lines', { points: paths[0] })
                          .attr('color', BABYLON.Color3.Black());

  //Use the Axes prefab with our three D3 scales with additional customizations
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ },
                             parent: CoT,                         
                             domainMaterialOptions: { width: 0.025 },
                             gridTicks: { x: scaleX.ticks(d3.timeYear.every(2)) },
                             labelTicks: { x: scaleX.ticks(d3.timeYear.every(2)) },
                             labelFormat: { x: dateFormat, y: (text) => text + '%' }
  });

  return scene;
}