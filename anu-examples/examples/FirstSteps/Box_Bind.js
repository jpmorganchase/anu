// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Scene} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.


//create and export a function that takes a babylon engine and returns a scene
export const box_bind = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.position = new Vector3(-10, 10, -20)
  camera.attachControl(true)

  let box = anu.bind('box', 
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assits,
                        depth: (d) => d.points
                      }, 
                      [
                        {goals: 10, assits: 5, points: 2},
                        {goals: 3, assits: 15, points: 8},
                        {goals: 1, assits: 8, points: 15}
                      ]
                      )

  return scene;
  
};


