// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Color3, Scene, Quaternion, StandardMaterial} from '@babylonjs/core';
import { interpolate } from 'd3';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.


//create and export a function that takes a babylon engine and returns a scene
export const box_tween = async function(engine){

  const scene = new Scene(engine);

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.position = new Vector3(-10, 10, -20);
  camera.attachControl(true);

  let box = anu.bind('box', {}, [...Array(10).keys()])
               .material(() => new StandardMaterial());

  //click the scene to transition
  scene.onPointerDown = (pointer) => {
    var box_transition = box.transition().tween((d,n,i) => {

      let interpolator = interpolate(n.position.x, (Math.random() - 0.5) * 10)
      let startColor = n.material.diffuseColor;
      let endColor = Color3.Random();

      return (t) => {
        n.position.x = interpolator(t);
        n.material.diffuseColor = Color3.Lerp(startColor, endColor, t);
      }
    });
  }


  return scene;

};


