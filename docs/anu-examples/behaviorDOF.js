// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu'//import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, SixDofDragBehavior } from "@babylonjs/core";

//create and export a function that takes a babylon engine and returns a scene
export const behaviorDOF = async function(engine){

  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 12;
  camera.attachControl(true)

  let boxes = anu.bind('box', {size: 1}, [1,2,3]);

  boxes.position(() => Vector3.Random(-2,2))
       .behavior(() => {
          let behavior = new SixDofDragBehavior();
          behavior.allowMultiPointer = true;
          behavior.faceCameraOnDragStart = true;
          behavior.rotateDraggedObject = false;
          behavior.rotateWithMotionController = false;

          return behavior;
       })
    


  return scene;

};