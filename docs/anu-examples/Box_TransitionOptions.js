// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Quaternion, Scene, CircleEase} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.


//create and export a function that takes a babylon engine and returns a scene
export const box_transitionOptions = async function(engine){

  const scene = new Scene(engine);

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.position = new Vector3(-10, 10, -20);
  camera.attachControl(true);

  let box = anu.bind('box', {}, [...Array(10).keys()]);

  let transitionOptions = {
    duration: 1000,
    delay: 200,
    easingFunction: new CircleEase(),
    onAnimationEnd: () => console.log('animation ended')
  }

  //click the scene to transition
  scene.onPointerDown = (pointer) => {
    var box_transition = box.transition(transitionOptions).position(() => Vector3.Random(-5,5))
                            .rotation(() => Quaternion.Random())
  }


  return scene;

};


