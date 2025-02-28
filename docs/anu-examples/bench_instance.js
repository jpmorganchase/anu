// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Scene} from '@babylonjs/core';
import { AdvancedDynamicTexture, Control, SelectionPanel, SliderGroup} from '@babylonjs/gui';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.


//create and export a function that takes a babylon engine and returns a scene
export const instanceBench = function(engine){

  const scene = new Scene(engine);

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.position = new Vector3(-25, 10, -50);
  camera.attachControl(true);


  let n = 100

  let box = anu.create('box', 'box');

  let boxes = anu.bindInstance(box, [...Array(n).keys()], scene)
                .position(() => Vector3.Random(-20,20));

  let createBoxes = (num) => {
    boxes.dispose();
    boxes = anu.bindInstance(box, [...Array(num).keys()], scene)
    .position(() => Vector3.Random(-20,20));

  }
  
	var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("instance");

  var selectBox = new SelectionPanel("instance");
  selectBox.width = 0.25;
  selectBox.height = 0.25;

  selectBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  selectBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
   
  advancedTexture.addControl(selectBox);

  var numGroup = new SliderGroup("2",);
  numGroup.addSlider("Boxes", (value) => createBoxes(Math.round(value)), "", 100, 10000, 100, (value) => Math.round(value)) 

  
  selectBox.addGroup(numGroup);

  scene.onAfterRenderObservable.add(() => {
    numGroup.header = "FPS: " + scene.getEngine().getFps().toFixed();
  })


  return scene;

};


