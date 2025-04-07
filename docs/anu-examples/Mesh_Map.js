// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/airports.csv';
import geoJ from './data/gz_2010_us_040_00_5m.json';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function meshMap(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 1.25, -1);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Use the Mesh Map prefab to create 3D meshes based on GeoJSON data
  let meshMap = anu.createMeshMap('meshMap', { geoJson: geoJ,
                                               depth: 0.05,
                                               projection: d3.geoAlbers().reflectY(true), //Flip the Y so we don't have to rotate it later
                                               size: [2, 2],
                                               simplification: 0.000001 });  //Higher value = less vertices = better performance but less detail

  //The prefab contains a Selection that consists of the Meshes for each polygon in our GeoJSON (i.e., the US states)
  let states = meshMap.selection;

  //Create a D3 scale for color, using Anu helper functions map scale outputs to StandardMaterial objects based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Assign each state a Material (and therefore, their color)
  states.material((d) => scaleC(d.NAME));

  
  //We use Mesh instancing here for better performance, first we create a Mesh that serves as the root Node
  let rootSphere = anu.create('sphere', 'sphere', { diameter: 0.003 });
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer('color', 4);   //We need an InstancedBuffer to set the color of instances
  
  //Select our map object as a Selection object which will serve as our CoT
  let chart = anu.selectName('meshMap', scene);
  
  //Create instanced sphere meshes from our rootSphere as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bindInstance(rootSphere, data)
                     .positionX((d) => meshMap.projection([d.longitude, d.latitude])[0]) //The meshMap prefab object contains a projection() function that will convert
                     .positionZ((d) => meshMap.projection([d.longitude, d.latitude])[1]) //a longitude and latitude into the correct position on the meshMap
                     .setInstancedBuffer('color', new BABYLON.Color4(0,0,0,1));

  return scene;
}