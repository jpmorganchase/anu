// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Scene, CreateLines} from '@babylonjs/core';
import { interpolateArray } from 'd3';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.


//create and export a function that takes a babylon engine and returns a scene
export const line_tween = async function(engine){

  const scene = new Scene(engine);

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.position = new Vector3(-10, 10, -20);
  camera.attachControl(true);


let points1 = [
    new Vector3(-2, -1, 0),
    new Vector3(0, 1, 0),
    new Vector3(2, -1, 0),
]

let points2 = [
  new Vector3(-1, -1, 0),
  new Vector3(1, 0, 0),
  new Vector3(0, 0, 0),
]

  let line = anu.bind('tube', {path: points1, updatable: true}, undefined, scene)

  //click the scene to transition
  scene.onPointerDown = (pointer) => {
    var box_transition = line.transition({duration: 1000}).tween((d,n,i) => {

      let interpolater = interpolateArray(points1, points2)


      return (t) => {
        console.log(interpolater(t))
        anu.create("tube", "tube", {path: interpolater(t), updatable: true, instance: n}, scene)
      }
    })
  }


  return scene;

};


