// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, MeshBuilder, StandardMaterial, Color3} from "@babylonjs/core";

//create and export a function that takes a babylon engine and returns a scene
export const select_name_tag = function(engine){

  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 12;
  camera.attachControl(true)

  let box = anu.create("box", {})
  box.name = "box-name";
  box.position = new Vector3(-1,0,0)

  let sphere = anu.create("sphere", {})
  sphere.id = "sphere-ID";
  sphere.position = new Vector3(1,0,0)

  let boxMaterial = new StandardMaterial('boxMaterial')
  boxMaterial.diffuseColor = new Color3(1,0,0);

  let sphereMaterial = new StandardMaterial('sphereMaterial')
  sphereMaterial.diffuseColor = new Color3(0,1,0);

  let box_selection = anu.selectName('box-name', scene)
                          .material(boxMaterial)


  let sphere_selection = anu.selectId('sphere-ID', scene)
                            .material(sphereMaterial)

  return scene;
};