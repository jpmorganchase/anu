// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Color4 } from '@babylonjs/core';
import data from './data/airports.csv'; //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function textureMap(engine){

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 30; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(0, 3, -0.25);

  //createTextureMap() is an Anu prefab that easily allows us to create a plane with an OpenLayers map canvas as the texture
  let textureMap = anu.createTextureMap('map');

  //Get the OpenLayers map object from the prefab
  let map = textureMap.map;

  //Change the view parameters of the map to focus on the US
  map.getView().setCenter([-100, 40]);
  map.getView().setZoom(5);

  //Turn on keyboard controls on the TextureMap prefab, uses WASD and -+
  //Due to a technical quirk, this function must be called *after* setting the center and zoom of the view
  textureMap.keyboardControls(scene);

  //The prefab also generates scale functions for us
  //This allows us to convert longitude and latitude into their respective positions in the plane's local coordinate space in Babylon
  let scaleLon = textureMap.scaleLon;
  let scaleLat = textureMap.scaleLat;

  //Because our data has over 3000 points, we will use mesh instancing for better performance
  //Create a mesh to be our root instance, and register a buffer for color
  let rootSphere = anu.create('sphere', 'sphere', { diameter: 0.25 });
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer("color", 4);
  rootSphere.instancedBuffers.color = new Color4(0, 0, 0, 1);   //Placeholder color, will be overwritten later

  //Create our D3 color scale to assign colors to each data point depending on the US state they are in
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

  //Our map can be panned using WASD and -+ controls
  //Therefore, we need a helper function to determine if a data point is visible on the map or not
  let bounds = function (mesh) {
    //We use the bounding box of the plane mesh as our boundary for testing if a point is inside or outside of it
    let parentBoundingBox = textureMap.mesh.getBoundingInfo().boundingBox;

    return !(mesh.position.x > parentBoundingBox.maximum.x ||
             mesh.position.x < parentBoundingBox.minimum.x ||
             mesh.position.z > parentBoundingBox.maximum.z ||
             mesh.position.z < parentBoundingBox.minimum.z);
  }

  //Make an Anu selection of our map for it to serve as our CoT
  let CoT = anu.selectName('map', scene);

  //Create our spheres for our data
  let spheres = CoT.bindInstance(rootSphere, data)
    .setInstancedBuffer("color", new Color4(0, 0, 0, 1));

  //We want the spheres to updates whenever the map is panned and zoomed
  //Therefore we use OpenLayers' events to update our spheres after the map has finished rendering (postrender)
  map.on("postrender", () => {
    spheres.positionX((d) => scaleLon([d.longitude, d.latitude]))  //These scale functions need to be pased both the longitude and latitude in an array
           .positionZ((d) => scaleLat([d.longitude, d.latitude]))  //This is a requirement from the OpenLayers API
           .setInstancedBuffer("color", (d) => scaleC(d.state))
           .prop("isVisible", (d,n,i) => bounds(n))   //Our function from before to determine if the point should be visible or not
  });

  //Rescale the map to make it easier to see
  textureMap.scaling = new Vector3(0.05, 0.05, 0.05);

  return scene;
}