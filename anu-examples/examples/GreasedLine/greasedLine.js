// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3 } from "@babylonjs/core";
import iris from '../../data/iris.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const greasedLine = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(-5,-2,-1)

  let size = 1;
  const points = [
    new Vector3(0, 0, -2),
    new Vector3(size, 0, -2),
    new Vector3(size, size, -2),
    new Vector3(0, size, -2),
    new Vector3(0, 0, -2),
]

  let greasedLine = anu.bind("greasedLine", {meshOptions: {points: (d) => points}}, [points], )
  

  // Inspector.Show(scene, {
  //   embedMode: true,
  //   showInspector: false
  // });

  return scene;
}; 
