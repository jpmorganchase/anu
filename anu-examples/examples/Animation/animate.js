// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Animation, Animatable, CircleEase, BounceEase} from "@babylonjs/core";

//create and export a function that takes a babylon engine and returns a scene
export const animate = function(engine){
    
  const scene = new Scene(engine)

  console.log(scene.getEngine().constructor.LastCreatedScene)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)

  let box = anu.create('box', 'ourBox', {}, [{}]);

  let nodes = anu.bindInstance(box, [...new Array(1)])

  //let boxSelection = new anu.Selection(nodes.selected, scene, new Animatable(scene, box))

  nodes.transition((d,n,i) => ({duration: 1000, loopMode: 0, delay: 2000,  easingFunction: new CircleEase()}))
              .positionX((d,n,i) => i + 10)
              .transition()
              .positionY((d, n, i) => i + 10)
              .transition()
              .positionZ((d, n, i) => i + 10)
              .transition({sequence: false})
              .scaling((d, n, i) => new Vector3(4,4,4))
             
        

//let animate = Animation.CreateAndStartAnimation("boxscale", box, "scaling.x", 1, 1, 1.0, 1.5, 0);
//let animate2 = Animation.CreateAndStartAnimation("boxscale", box, "scaling.y", 1, 1, 1.0, 1.5, 0);

  return scene;
}; 