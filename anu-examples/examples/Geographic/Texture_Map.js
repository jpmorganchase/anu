// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Scene, Color4, HemisphericLight, ArcRotateCamera } from '@babylonjs/core';
import * as anu from 'anu';
import {csv} from 'd3';

export function textureMap(babylonEngine){
  const scene = new Scene(babylonEngine);
  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0, 100, -20)

  let globe = anu.createTextureGlobe('tst2', {}, scene)

  globe.mesh.scaling = new Vector3(50,50,50)

  //Use D3 to read in our csv data
  csv("../data/airports.csv", (d) => d).then((data) => {
    //Our data has over 3000 points so we will use mesh instancing for better performance
    //To do this we must first create a mesh to be our root and register a buffer for color
    let rootSphere = anu.create('sphere', 'sphere', scene, {diameter: 0.2})
    rootSphere.isVisible = false;
    rootSphere.registerInstancedBuffer("color", 4);
    rootSphere.instancedBuffers.color = new Color4(1,1,1,1) 

    //Using the texture map prefab we create a plane with a canvas OL map set as the texture 
    let textureMap = anu.createTextureMap('test', {}, scene);
    //Keyboard controls WASD and -+ can be enabled on the prefab
    textureMap.keyboardControls();

    //The prefab generated our scales for us
    //The take [Lon, Lat] as input and return a x, y pixel coordinate. 
    let scaleLon = textureMap.scaleLon;
    let scaleLat = textureMap.scaleLat;
  
    //Grab the open layer map object
    let map = textureMap.map;

    //Change the ciew params of the map 
    map.getView().setCenter([-100, 40]);
    map.getView().setZoom(5)

    //Helper function to determine if a mesh will be rendered inside the map plane or not
    let bounds = function(mesh){
      let parentBoundingBox = textureMap.mesh.getBoundingInfo().boundingBox;
      
      if (mesh.position.x > parentBoundingBox.maximum.x ||
          mesh.position.x < parentBoundingBox.minimum.x ||
          mesh.position.z > parentBoundingBox.maximum.z ||
          mesh.position.z < parentBoundingBox.minimum.z) 
      {
        return false
      } 
      else 
      {
        return true
      }
    }

    //Create a cot for our spheres
    let cot = anu.bind('cot', scene)
    //Use binInstace to create an instance of root sphere for each data point
    //set our color instance buffer Color4 to black 
    let spheres =  cot.bindInstance(rootSphere, data)
                      .setInstancedBuffer("color", new Color4(0,0,0,1))
    
    //Using a ol map listener update the sphere position based on the current map position and zoom
    //Set spheres outside the map plane area to be invisible
    map.on("postrender", function () {
        spheres.positionX((d) =>  scaleLon([d.longitude, d.latitude]))
                .positionZ((d) => scaleLat([d.longitude, d.latitude]))
                .prop("isVisible", (d,m,i) => bounds(m))
    });
  });
  return scene;
}