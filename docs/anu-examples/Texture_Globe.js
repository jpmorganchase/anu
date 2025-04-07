// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/airports.csv';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function textureGlobe(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 2, -2.5)
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Use the Texture Globe prefab to create a sphere with an OpenLayers map canvas as the texture
  let textureGlobe = anu.createTextureGlobe('globe', { resolution: new BABYLON.Vector2(5000, 2500), diameter: 2 });


  //Create a D3 scale for color, using Anu helper functions map scale outputs to Color4 objects based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4(52));

  //We use Mesh instancing here for better performance, first we create a Mesh that serves as the root Node
  let rootSphere = anu.create('sphere', 'sphere', { diameter: 0.01 });
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer('color', 4);   //We need an InstancedBuffer to set the color of instances
  
  //Select our globe object as a Selection object which will serve as our CoT
  let chart = anu.selectName('globe', scene);

  //Create instanced sphere meshes from our rootSphere as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bindInstance(rootSphere, data)
                     .position((d) => textureGlobe.lonLatToVector3([d.longitude, d.latitude]))  //Texture Globe prefab has a scale function for us to convert lon/lat to positions in Babylon's coordinate space
                     .setInstancedBuffer('color', (d) => scaleC(d.state))

  return scene;
}