// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/flare-d3.json';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function treemap(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.05;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  fillLight.specular = new BABYLON.Color3(0,0,0); //Minimize specular highlights
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0, -10);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  let width = 5;
  let height = 5;

  // Compute the layout
  const root = d3.treemap() //d3.treemap() will calculate the tree map leaf sizes and layout
    .tile(d3.treemapSquarify) //Squarify is the default but d3 also provides other tile methods like treemapBinary
    .size([width,height]) //These need to be positive values or it will not work correctly, we will account for this later
    .padding(0.01) // This value is relative to the total Width x Height
    (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value));

  //Create a overall parent for our treemap
  let tree = anu.bind('cot').name("treemap");

  //Append a parent for each leaf in our data generated from treemap()
  let leaves = tree.bind('cot', {}, root.leaves()) 
                .positionX((d) => (((d.x1 - d.x0) / 2) + d.x0)) //We need to reset our origin point to top-left from middle then add the offset
                .positionY((d) => -(((d.y1 - d.y0) / 2) + d.y0))

  //Since we have many boxes to render we use instances, create a root mesh to instance
  let rootBox = anu.create('box');
  rootBox.registerInstancedBuffer("color", 4); //Set up our color buffer to add color to each instance
  rootBox.instancedBuffers.color = new BABYLON.Color4(1,1,1,1);
  rootBox.setEnabled(false) //Disable our root box so it is invisible and skipped for rendering

  let depth = d3.scaleLinear().domain(d3.extent(root.leaves().map(d => d.value))).range([0,1.5]) //Create a depth scale to encode value of each leaf
  let color = d3.scaleOrdinal(anu.ordinalChromatic('Pastel1').toColor4()) //Create a color scale to color parent catagories

  let boxes = leaves.bindInstance(rootBox) // using our root mesh bind instances from our leafs selection, our data will be inherited by each instanced box
                .scalingX(d => (d.x1 - d.x0) ) // scale width from our treemap() generator
                .scalingY(d => (d.y1 - d.y0) ) // scale height
                .scalingZ(d => depth(d.value) ) // scale depth
                .setInstancedBuffer("color", (d) => { while (d.depth > 1) d = d.parent; return color(d.data.name); }); //set the color buffer with our scale to the parent name
                
  let labels = leaves.bind("planeText", {text: d => d.data.name, size: d => (d.x1 - d.x0) * 0.1}) // bind text to each leaf, inherit the data to get the leaf name and size
                  .positionZ(d => (-depth(d.value) / 2) - 0.01) // move up each label to be in front of each box.
  
  
  tree.positionX(-(width/2)).positionY(height/2) // re-center our treemap in the scene
  
  return scene;
}   