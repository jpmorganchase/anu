// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import 'manifold-3d';   //Required for Constructive Solid Geometry

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export async function donutChart(engine){   //Mark this function as async

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -5), scene);
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
      enclose: true
    },
    arcs)
    .rotationY((d,n,i) => d.startAngle - Math.PI / 2);   //Offset the rotation so that the segments "start" at 12 o'clock and not 3 o'clock


  //Initialize the CSG
  await BABYLON.InitializeCSG2Async();

  //Create an "inner" cylinder that will be used to subtractively create the hole in the center of the pie to form a donut
  const inner = anu.create('cylinder', 'cylinder', { diameter: 0.5 });
  //Create the inner cylinder's CSG representation, which is used for calculations
  const innerCSG = BABYLON.CSG2.FromMesh(inner);

  //Keep a list of all the new Meshes we are about to create
  const newMeshes = [];

  //For each pie segment...
  pieSegments.run((d,n,i) => {
    //Create this segment's CSG representation
    const segmentCSG = BABYLON.CSG2.FromMesh(n);
    //Subtract the inner cylinder from the pie segment
    const donutSegmentCSG = segmentCSG.subtract(innerCSG);
    //Create the mesh from the CSG result
    const newMesh = donutSegmentCSG.toMesh(n.name, scene, { centerMesh: false }); //Disable centerMesh to keep our original pivot point
    //Store the reference so that we can rebuild our Selection
    newMeshes.push(newMesh);

    //Cleanup, destroy the CSGs
    segmentCSG.dispose();
    donutSegmentCSG.dispose();
  })

  //Because we created new meshes, we can create a new Anu Selection in case we want to further manipulate them
  const donutSegments = new anu.Selection(newMeshes);   //Here we use the list of mesh references re created
  donutSegments.prop('parent', CoT)         //Re-set the parent
    .metadata('data', (d,n,i) => arcs[i])   //Re-set the data
    .material((d,n,i) => scaleC(i));        //Set the material to color the segments
    
  //Dispose of the original pie segments
  pieSegments.dispose();
  //Dispose of the inner cylinder and its CSG representation
  inner.dispose();
  innerCSG.dispose();

  return scene;
}