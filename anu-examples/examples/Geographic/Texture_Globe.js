// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Scene, Color4, HemisphericLight, ArcRotateCamera, Vector2 } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import {csv} from 'd3';
import data from 'anu/../../data/airports.csv'


export function textureGlobe(babylonEngine){
  const scene = new Scene(babylonEngine);
  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0, 20, -20)



  //Use D3 to read in our csv data


    let globe = anu.createTextureGlobe('globe', {resolution: new Vector2(5000,2500), diameter:10}, scene)
 
    let rootSphere = anu.create('sphere', 'sphere', {diameter: 0.2})
    rootSphere.isVisible = false;
    rootSphere.registerInstancedBuffer("color", 4);
    rootSphere.instancedBuffers.color = new Color4(1,1,1,1) 
                                                                
    let spheres =  anu.selectName('globe', scene).bindInstance(rootSphere, data)
    .setInstancedBuffer("color", new Color4(0,0,0,1))
    .scaling(new Vector3(0.1,0.1,0.1))
    .position((d) => globe.lonLatToVector3([d.longitude, d.latitude]))


  return scene;
}