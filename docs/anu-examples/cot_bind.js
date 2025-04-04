// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu'//import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, MeshBuilder} from "@babylonjs/core";

//create and export a function that takes a babylon engine and returns a scene

export const cotBind = function(engine){

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
  let spheres = cot.bind('sphere', { diameter: 1 }, [-2, 0, 2])
    .positionX(d => d);

  // Inspector.Show(scene, {
  //   embedMode: true,
  //   showInspector: true
  // });

  return scene;

};