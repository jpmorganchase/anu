// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Color4, Scene} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.


//create and export a function that takes a babylon engine and returns a scene
export const box_selection = async function(engine){

  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.position = new Vector3(10, 10, 25);
  camera.wheelPrecision = 10;
  camera.attachControl(true);

  let data = [];
  for (let i = 0; i < 1000; i++) {
    data.push(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
        col: new Color4(Math.random(), Math.random(), Math.random(), 1)
      });
  };

  let rootSphere = anu.create('sphere', 'mySphere', {diameter: 0.5});
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer("color", 4);
  rootSphere.instancedBuffers.color = new Color4(1, 1, 1, 1);


  //bindInstance(mesh: Mesh, data?: {}, scene?: Scene,)
  let spheres =  anu.bindInstance(rootSphere, data)
    .positionX((d) => d.x * 10)
    .positionY((d) => d.y * 10)
    .positionZ((d) => d.z * 10)
    .setInstancedBuffer("color", (d) => d.col);
  return scene;

};


