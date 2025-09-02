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
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -5), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);


    // Compute the layout.
    const root = d3.treemap()
    .tile(d3.treemapBinary) // e.g., d3.treemapSquarify
    .size([10,10])
    .padding(0.02)
    .round(false)
  (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value));
  

      console.log(root.leaves())

    let leaf = anu.bind('cot', {}, root.leaves())
                  .positionX((d) => (((d.x1 - d.x0) / 2) + d.x0))
                  .positionY((d) => -(((d.y1 - d.y0) / 2) + d.y0))

    let rect = leaf.bind('plane')
                  .scalingX(d => (d.x1 - d.x0) )
                  .scalingY(d => (d.y1 - d.y0) )
                  .material(() => new BABYLON.StandardMaterial())
                  .diffuseColor(() => BABYLON.Color3.Random())
                  
    let labels = leaf.bind("planeText", {text: d => d.data.name, size: d => (d.x1 - d.x0) * 0.1})
                    .positionZ(-0.01)
                   

                  
  
  return scene;
}