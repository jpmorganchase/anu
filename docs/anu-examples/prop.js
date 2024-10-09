// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, MeshBuilder} from "@babylonjs/core";
import iris from './data/iris.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const prop = function(engine){

  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(6, 3, 1), scene);
  camera.wheelPrecision = 12;
  camera.attachControl(true)
  camera.position = new Vector3(-5,-2,-1)


  let cot = anu.bind('cot');
  let spheres = cot.bind('sphere', {diameter: 1}, iris);

  spheres.prop("position", (d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth)) // type vector3(x,y,z)
         .prop('scaling.x', 0.1) // type int
         .prop('name', (d,n,i) => "iris_sphere:" + i) // type string
         .prop('renderOutline', true);

  return scene;
};
