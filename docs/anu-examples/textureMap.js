// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export async function textureMap(engine){

  const data = await vega['airports.csv']();

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 3, -0.05);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Use the Texture Map prefab to create a plane with an OpenLayers map canvas as the texture
  let textureMap = anu.createTextureMap('map', { meshSize: 2 });

  //Get the OpenLayers map object from the prefab which we will need to customize its settings
  let map = textureMap.map;
  //Change the view parameters of the map to focus on the US
  map.getView().setCenter([-100, 40]);
  map.getView().setZoom(5);

  //Turn on keyboard controls on the TextureMap prefab (uses WASD and -+)
  //Due to a technical quirk, this function must be called *after* setting the center and zoom of the view
  textureMap.keyboardControls(scene);

  return scene;
}