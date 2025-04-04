// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, MeshBuilder} from "@babylonjs/core";
import iris from './data/iris.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const selectBoxes = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)


  const camera = new ArcRotateCamera("Camera", -(Math.PI / 2), (Math.PI / 2), 5, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)

  //Use a top level bind to create a Selection containing 
  //a single TransformNode 'cot' aka Center of Transform.
  //By default the name and ID of a node will be the mesh type
  //In this case "cot"
  let cot = anu.bind('cot');

  //Create a sphere for each datum
  //These spheres will be the children of our cot node.
  let spheres = cot.bind('sphere', { diameter : 1}, [-2, 0])
                   .positionX(d => d);
  let boxes = spheres.bind('box');

  //Create a new box at the root level of the scene-graph
  //Move it on the x axis to 2
  let rootBox = anu.bind('box')
                   .positionX(2)

  //Select the boxes who are children of the nodes in the sphere selection
  let boxesSelection = spheres.selectName('box')
  //Move these boxes down by 1
  boxesSelection.positionY(-1)

  // Inspector.Show(scene, {
  //   embedMode: true,
  //   showInspector: false
  // });
 
  return scene;
  
}; 