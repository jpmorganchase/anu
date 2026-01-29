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
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 2, -2.5)
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Use the Texture Globe prefab to create a sphere with an OpenLayers map canvas as the texture
  let textureGlobe = anu.createTextureGlobe('globe', { resolution: new BABYLON.Vector2(5000, 2500), diameter: 2 });
  
  return scene;
}