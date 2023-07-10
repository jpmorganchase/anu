// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Scene, Color4, HemisphericLight, ArcRotateCamera, Vector2 } from '@babylonjs/core';
import * as anu from 'anu';
import {csv} from 'd3';

export function textureGlobe(babylonEngine){
  const scene = new Scene(babylonEngine);
  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0, 20, -20)



  //Use D3 to read in our csv data
  csv("../data/airports.csv", (d) => d).then((data) => {

    let globe = anu.createTextureGlobe('test', {resolution: new Vector2(5000,2500), diameter:10}, scene)
 
    console.log(globe.coordToVec([-83.045753, 42.331429]))
                                                                  //[-18.7792678, 46.8344597]
     anu.bind('sphere', scene).position(globe.coordToVec([-87.65005, 41.85003]))//.scaling(new Vector3(0.1,0.1,0.1));
     anu.bind('sphere', scene).position(globe.coordToVec([0,0]))//.scaling(new Vector3(0.1,0.1,0.1));
     anu.bind('sphere', scene).position(globe.coordToVec([-0.118092, 51.509865]))
    });


  return scene;
}