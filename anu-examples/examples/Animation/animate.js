// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Animation, Animatable, CircleEase, BounceEase, StandardMaterial, Color3} from "@babylonjs/core";
import { interpolate, interpolateBrBG, color} from 'd3';

//create and export a function that takes a babylon engine and returns a scene
export const animate = function(engine){
    
  const scene = new Scene(engine)


  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)

  //let box = anu.create('box', 'ourBox', {}, [{}]);


  let nodes = anu.bind("box", {}, [...new Array(5)])

  //let boxSelection = new anu.Selection(nodes.selected, scene, new Animatable(scene, box))


  let transitions = nodes
    .material(() => new StandardMaterial())
    .transition({duration: 1000})
    .tween((d,n,i) => { 
      let inter = interpolateBrBG
      return (t) => {
        let rgb = color(inter(t)).rgb();
        n.material.diffuseColor = new Color3(rgb.r / 255, rgb.g /255, rgb.b /255);
      }
    })
    .transition()
    .tween((d,n,i) => { 
      let inter = interpolate(0,2)
      return (t) => {
        n.position.x = inter(t)  
      }
    })

    // let transitions = nodes.transition({duration: 1000, delay: 500}).props({'position.x': ()=> {
    //   console.log("position")
    //   return 2;
    // }}).transition().props({"position.x": 1, "rotation.y": 2})

    // let transitions = nodes.transition({duration: 1000}).positionX(2)
    //                        .transition((d,n,i) => ({duration: 1000 * i})).positionX(1).rotationZ(1)
    //                        .transition().positionY(1)
                            
                            
      //transitions.stopTransitions();

    // setTimeout(() => {
    //   transitions.stopTransitions()
    // }, 1500)

    //    setTimeout(() => {
    //   transitions.restartTransitions()
    // }, 1000)



  return scene;
}; 