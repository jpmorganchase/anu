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
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.05;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  fillLight.specular = new BABYLON.Color3(0,0,0); //Minimize specular highlights
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 1.25, -1);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Use the Mesh Map prefab to create 3D meshes based on GeoJSON data
  let meshMap = anu.createMeshMap('meshMap', { geoJson: geoJ,
                                               depth: 0.25,
                                               projection: d3.geoAlbers().reflectY(true), //Flip the Y so we don't have to rotate it later
                                               size: [2, 2],
                                               simplification: 0.00001 });  //Higher value = less vertices = better performance but less detail

  //The prefab contains a Selection that consists of the Meshes for each polygon in our GeoJSON (i.e., the US states)
  let states = meshMap.selection;
  
  return scene;
}