// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export async function dotDensityMap(engine){

  const data = await vega['airports.csv']();

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 2, -0.05);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Use the Texture Map prefab to create a plane with an OpenLayers map canvas as the texture
  let textureMap = anu.createTextureMap('map', { meshSize: 2, mapHeight: 2000 });

  //Get the OpenLayers map object from the prefab which we will need to customize its settings
  let map = textureMap.map;
  //Change the view parameters of the map to focus on the US
  map.getView().setCenter([-100, 40]);
  map.getView().setZoom(5);

  //Turn on keyboard controls on the TextureMap prefab (uses WASD and -+)
  //Due to a technical quirk, this function must be called *after* setting the center and zoom of the view
  textureMap.keyboardControls(scene);


  //To help create our dots, the Texture Map prefab generates scale functions for us to convert lon/lat to positions in Babylon's coordinate space
  let scaleLon = textureMap.scaleLon;
  let scaleLat = textureMap.scaleLat;
  //Create a D3 scale for color, using Anu helper functions map scale outputs to Color4 objects based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4(52));

  //We use Mesh instancing here for better performance, first we create a Mesh that serves as the root Node
  let rootSphere = anu.create('sphere', 'sphere', { diameter: 0.01 });
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer('color', 4);   //We need an InstancedBuffer to set the color of instances

  //Select our map object as a Selection object which will serve as our CoT
  let chart = anu.selectName('map', scene);

  //Create instanced sphere meshes from our rootSphere as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bindInstance(rootSphere, data)
    .setInstancedBuffer('color', new BABYLON.Color4(0, 0, 0, 1));

  //We want to position our spheres whenever the map is loaded and updated (i.e., panned or zoomed), use OpenLayers' callback functions for this
  //N.B: Texture Map's scale functions are only created after the map is fully rendered, so we need to use this callback regardless
  map.on('postrender', () => {
    //Create instanced sphere meshes from our rootSphere as children of our CoT for each row of our data and set their visual encodings using method chaining
    spheres.positionX((d) => scaleLon([d.longitude, d.latitude]))  //These scale functions need as arguments both the longitude and latitude in an array
           .positionZ((d) => scaleLat([d.longitude, d.latitude]))  //This is a requirement from the OpenLayers API
           .setInstancedBuffer('color', (d) => scaleC(d.state))
           .prop('isVisible', (d,n,i) => {  //Custom function to determine if a sphere is inside or outside of the Texture Map which will show/hide the sphere as needed
             let parentBoundingBox = textureMap.mesh.getBoundingInfo().boundingBox;
             return !(n.position.x > parentBoundingBox.maximum.x ||
                      n.position.x < parentBoundingBox.minimum.x ||
                      n.position.z > parentBoundingBox.maximum.z ||
                      n.position.z < parentBoundingBox.minimum.z);
           });
  });

  return scene;
}