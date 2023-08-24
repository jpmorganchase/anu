// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from "anu" //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, MeshBuilder} from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
import iris from '../../data/iris.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const modValue = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)


  let cot = anu.bind('cot', scene);
  let spheres = cot.bind('sphere', {diameter: 1}, iris);

  spheres.position(new Vector3(1,1,1)) // type vector3(x,y,z)
       .scalingX(0.2) // type int
       .name("iris_sphere"); // type string


  Inspector.Show(scene, {
    embedMode: true,
    showInspector: false
  });

  return scene;
}; 
