// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, Mesh, Vector3, Color3, StandardMaterial } from '@babylonjs/core';
import stocks from '../../data/stocks.csv';  //Our data

export function linechart2D(babylonEngine) {

  //Create an empty Scene
  const scene = new Scene(babylonEngine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(0, 0, -3.5);

  //Filter to only show a single stock
  let data = stocks.filter(d => d.symbol === "GOOG");
  
  //Create D3 functions to parse the time and date
  let parseTime = d3.timeParse("%b %d %Y");
  let dateFormat = d3.timeFormat("%Y");

  //Get all of the dates in our dataset into an array
  let dates = data.map((d) => parseTime(d.date));

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  //In this case, we create scale functions that correspond to the x and y positions
  let scaleX = d3.scaleTime().domain(d3.extent(dates)).range([-1, 1]);  //Time
  let scaleY = d3.scaleLinear().domain([0, Math.max(...data.map(d => d.price))]).range([-1, 1]).nice();

  //Create an array of Vector3 that correspond to the positions along the stock price timeseries using the scales we created
  let path = data.map((row) => new Vector3(scaleX(parseTime(row.date)), scaleY(row.price), 0));

  //Since we also want to color in the area below the line using a ribbon, we create another array of Vector at y=0 that forms a 2D mesh
  let zeroPath = path.map((value) => new Vector3(value.x, scaleY(0), 0));

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");
  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create the lineSystem that will render the paths we had created
  let lines = chart.bind("lineSystem", { lines: [path] }) //lines expects an array of arrays of Vector3, where each sub-array is its own line
                   .attr("color", Color3.Blue());

  //Create the ribbon that will render the area below the line
  let ribbon = chart.bind("ribbon",
    { pathArray: [path, zeroPath],      //pathArray expects an array of arrays of Vector3, where each subarray is the "edge" of a ribbon segment
      sideOrientation: Mesh.DOUBLESIDE  //Double side so that the ribbon can be seen behind the chart as well
    })
    .material((d,n,i) => {              //Set a material to change its color
      let mat = new StandardMaterial("ribbonMat");
      mat.diffuseColor = Color3.FromHexString("#4287f5");
      mat.alpha = 1;
      return mat;
  });

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  //Also adjust its visual properties to properly format the axes labels
  anu.createAxes("axes", scene, { parent: chart,
                                  scale: { x: scaleX, y: scaleY },
                                  domainMaterialOptions: { "color": Color3.Black(), width: 0.05 },
                                  labelTicks: { x: scaleX.ticks(d3.timeYear) },
                                  labelFormat: { x: dateFormat, y: (text) => '$' + text },
                                  background: false   //Hide background to prevent z-fighting
  });

  // const scene = new Scene(babylonEngine);
  // new HemisphericLight("light1", new Vector3(0, 10, 0), scene);
  // const camera = new ArcRotateCamera(
  //   "Camera",
  //   -(Math.PI / 4) * 3,
  //   Math.PI / 4,
  //   10,
  //   new Vector3(0, 0, 0),
  //   scene
  // );
  // camera.attachControl(true);
  // camera.position = new Vector3(3,0,-6);


  // let CoT = new TransformNode("cot");

 

  //   let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

  //   var parseTime = timeParse("%m/%d/%Y");
  //   var dateFormat = timeFormat("%y");
  //   let dates = data.map((d) => parseTime(d.Date))
  
  //   var scaleX = scaleTime().domain(extent(dates)).range([-2, 2]);
  //   var scaleY = scaleLinear().domain([0, 9]).range([-1, 1]).nice();
  //   var scaleC = scaleSequential(interpolateBlues).domain([1, -1]);

  //   let myPaths2 = years.map((r) => {
  //     return data.map((c)=> {
  //           return new Vector3(
  //           scaleX(parseTime(c.Date)),
  //           scaleY(c[r])
  //         )
  //     })
  //   })

  //   const options = {
  //     pathArray: myPaths2, 
  //     updatable: true,
  //     sideOrientation: Mesh.DOUBLESIDE,
  //   };

  //   let whiteLines = anu
  //     .select("#cot", scene)
  //     .bind("lineSystem", { lines: myPaths2 })
  //     .attr("color", new Color3(1, 1, 1))
  //     .prop("alpha", 1);

  //     anu.createAxes('test', scene, { parent: anu.select("#cot", scene),
  //     scale: {x: scaleX, y: scaleY},
  //     domainMaterialOptions: { "color": Color3.Black(), width: 0.05},
  //     gridTicks: {x: scaleX.ticks(timeYear.every(2))},
  //     labelTicks: {x: scaleX.ticks(timeYear.every(2))},
  //     labelFormat: {x: dateFormat, y: (text) => {
  //                   if (text === undefined) {
  //                     return "0%";
  //                   } else {
  //                     return text + "%";
  //                   }}
  //                 }
  //   });
      
 
  return scene;
}
