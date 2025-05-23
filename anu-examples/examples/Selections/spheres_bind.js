// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, MeshBuilder} from "@babylonjs/core";
import iris from '../../data/iris.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const spheresBind = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)

  //Use a top level bind to create a Selection containing 
  //a single TransformNode 'cot' aka Center of Transform.
  //By default the name and ID of a node will be the mesh type
  //In this case "cot"
  let cot = anu.bind('cot');

  //Create a sphere for each row of data in the iris data set.
  //These spheres will be the children of our cot node.
  let spheres = cot.bind('sphere', {diameter: 1}, iris);

  //We can keep nesting bind on new selections
  //For example, calling bind on the Selection "spheres" 
  //we can create a box for each sphere
  //Expand the node tree in the inspector to see structure.
  //Each sphere under cot will now be the parent of a box mesh.
  let boxes = spheres.bind('box')

  // Inspector.Show(scene, {
  //   embedMode: true,
  //   showInspector: false
  // });
 
  return scene;
  
}; 