// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, MeshBuilder} from "@babylonjs/core";
import iris from '../data/iris.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const cotTransform = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)

  let cot = anu.bind('cot');

  let boxes = cot.bind('box', {size: 1}, iris);

  //Call the transform methods exposed by Selection
  //set random transforms for cot which will change the transform of all childern
  //these methods will be executed once for the one cot
  cot.position(() => new Vector3(Math.random(), Math.random(), Math.random()))
        .scaling(() => new Vector3(Math.random(), Math.random(), Math.random()))
        .rotation(() => new Vector3(Math.random(), Math.random(), Math.random()))
 
  return scene;
  
}; 