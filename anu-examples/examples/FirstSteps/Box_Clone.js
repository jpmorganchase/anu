// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Scene} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.


//create and export a function that takes a babylon engine and returns a scene
export const box_clone = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.position = new Vector3(-10, 10, -20)
  camera.attachControl(true)

  let box = anu.create('box');

  let clones = anu.bindClone(box, [1,2,3,4]).bindClone(box)

  return scene;
  
};


