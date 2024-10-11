// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Color4 } from '@babylonjs/core';
import data from './data/airports.csv'; //Our data
import geoJ from "./data/gz_2010_us_040_00_5m.json";  //GeoJSON

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function meshMap(engine) {

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 100; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(0, 1.25, -1);

  //createMeshMap() is an Anu prefab that easily allows us to create a mesh map using geoJSON data
  let meshMap = anu.createMeshMap('meshMap', { geoJson: geoJ, depth: 0.05, projection: d3.geoAlbers().reflectY(true), size: [2, 2], simplification: 0.00001 });

  //Get the newly created meshes that correspond to US states as an Anu selection
  let states = meshMap.selection;

  //Create a D3 color scale to assign colors to these states
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Set their color
  states.material((d) => scaleC(d.NAME))
        .prop("isPickable", false);   //Turn off picking to improve performance of our complex mesh geometry
                                      //If picking of the mesh map is necessary, wrap it in an empty mesh that is sized to the bounding box

  //Get the CoT of the mesh map
  let CoT = anu.selectName("meshMap", scene);

  //Because our data has over 3000 points, we will use mesh instancing for better performance
  //Create a mesh to be our root instance, and register a buffer for color
  let rootSphere = anu.create('sphere', 'sphere', {diameter: 0.003})
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer("color", 4);
  rootSphere.instancedBuffers.color = new Color4(0, 0, 0, 1);

  //Create our spheres for our data
  let spheres =  CoT.bindInstance(rootSphere, data)
                    .positionX((d) => meshMap.projection([d.longitude, d.latitude])[0]) //The meshMap prefab object contains a projection() function that will convert
                    .positionZ((d) => meshMap.projection([d.longitude, d.latitude])[1]) //a longitude and latitude into the correct position on the meshMap
                    .setInstancedBuffer("color", new Color4(0,0,0,1));

  return scene;
}