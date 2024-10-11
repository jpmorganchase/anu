// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector2, Vector3, Color4 } from '@babylonjs/core';
import data from './data/airports.csv'; //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function textureGlobe(engine) {

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 30; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(0, 2, -2.5)

  //createTextureGlobe() is an Anu prefab that easily allows us to create a sphere with an OpenLayers map canvas as the texture
  let globe = anu.createTextureGlobe('globe', { resolution: new Vector2(5000, 2500), diameter: 2 });

  //Because our data has over 3000 points, we will use mesh instancing for better performance
  //Create a mesh to be our root instance, and register a buffer for color
  let rootSphere = anu.create('sphere', 'sphere', { diameter: 0.005 });
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer("color", 4);
  rootSphere.instancedBuffers.color = new Color4(0, 0, 0, 1);   //Placeholder color, will be overwritten later

  //Create our D3 color scale to assign colors to each data point depending on the US state they are in
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

  //Make an Anu selection of our globe for it to serve as our CoT
  let CoT = anu.selectName('globe', scene);

  //Create our spheres for our data
  let spheres = CoT.bindInstance(rootSphere, data)
                   .setInstancedBuffer("color", (d) => scaleC(d.state))
                   .position((d) => globe.lonLatToVector3([d.longitude, d.latitude]));  //Helper function to convert a longitude and latitude into a 3D point on the globe

  return scene;
}