// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, ActionManager, ExecuteCodeAction, StandardMaterial, Color3 } from "@babylonjs/core";

//create and export a function that takes a babylon engine and returns a scene
export const select_data = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true);

  let data = [{"x":0.4,"y":0.2,"z":0.4,"color":"#00FF00"},{"x":0.9,"y":0.3,"z":0.2,"color":"#FF0000"},{"x":1.0,"y":0.8,"z":0.8,"color":"#FF0000"},{"x":0.1,"y":0.9,"z":0.0,"color":"#00FF00"},{"x":0.4,"y":0.5,"z":0.9,"color":"#0000FF"},{"x":0.6,"y":0.3,"z":0.1,"color":"#00FF00"},{"x":0.3,"y":0.7,"z":0.7,"color":"#0000FF"},{"x":0.0,"y":0.7,"z":0.0,"color":"#FF0000"},{"x":0.6,"y":0.7,"z":0.4,"color":"#00FF00"},{"x":0.0,"y":0.7,"z":0.8,"color":"#FF0000"},{"x":0.3,"y":0.6,"z":0.6,"color":"#00FF00"},{"x":0.4,"y":0.3,"z":0.5,"color":"#FF0000"},{"x":1.0,"y":0.6,"z":0.6,"color":"#0000FF"},{"x":0.8,"y":0.1,"z":0.7,"color":"#00FF00"},{"x":0.6,"y":0.0,"z":0.9,"color":"#0000FF"}];


  let cot1 = anu.bind('cot');
  let spheres1 = cot1.bind('sphere', { diameter: 0.1 }, data)
                     .position((d) => new Vector3(d.x, d.y, d.z))
                     .material((d) => new StandardMaterial())
                     .diffuseColor((d) => Color3.FromHexString(d.color))
                     .action((d,n,i) => new ExecuteCodeAction(
                      ActionManager.OnPointerOverTrigger,
                      () => {
                        //TEST: Select all other spheres with the same data as this one using OR logic
                        // let selection = anu.selectData(Object.keys(d), Object.values(d), scene, false)
                        //          .prop("renderOutline", true)
                        //          .prop("outlineColor", Color3.Yellow());

                        //TEST: Select all other spheres with the same data as this one using OR logic ONLY IN THE OTHER COT
                        let selection = cot2.selectData(Object.keys(d), Object.values(d), false)
                                 .prop("renderOutline", true)
                                 .prop("outlineColor", Color3.Yellow());
                      }
                     ))
  cot1.position(new Vector3(-2, 0, 0));


  let cot2 = anu.bind('cot');
  let spheres2 = cot2.bind('sphere', { diameter: 0.1 }, data)
                     .position((d) => new Vector3(d.x, d.y, d.z))
                     .material((d) => new StandardMaterial())
                     .diffuseColor((d) => Color3.FromHexString(d.color))
                     .action((d,n,i) => new ExecuteCodeAction(
                      ActionManager.OnPointerOverTrigger,
                      () => {
                        //TEST: Select all other spheres with the same data as this one using AND logic
                        // let selection = anu.selectData(Object.keys(d), Object.values(d), scene, true)
                        //          .prop("renderOutline", true)
                        //          .prop("outlineColor", Color3.Purple());


                        //TEST: Select all other spheres with the same data as this one using OR logic ONLY IN THE OTHER COT
                        let selection = cot1.selectData(Object.keys(d), Object.values(d), true)
                                            .prop("renderOutline", true)
                                            .prop("outlineColor", Color3.Purple());
                      }
                     ))
  cot2.position(new Vector3(2, 0, 0));

  let cot3 = anu.bind('cot');
  let spheres3 = cot3.bind('sphere', { diameter: 0.1 }, [{ "a":0.4,"b":0.2,"c":0.4,"color":"#00FF00"}, {"a":0.9,"b":0.3,"c":0.2,"color":"#FF0000"}, {"a":1.0,"b":0.8,"c":0.8,"color":"#FF0000"},{"a":0.1,"b":0.9,"c":0.0,"color":"#00FF00"},{"a":0.6,"b":0.0,"c":0.9,"color":"#0000FF"}])
                     .position((d) => new Vector3(d.a, d.b, d.c))
                     .material((d) => new StandardMaterial())
                     .diffuseColor((d) => Color3.FromHexString(d.color))
                     .action((d,n,i) => new ExecuteCodeAction(
                      ActionManager.OnPointerOverTrigger,
                      () => {
                        //TEST: Select all other spheres with the same color as this one
                        let selection = anu.selectData(Object.keys(d)[3], Object.values(d)[3], scene, true);

                        //Set an outline on the selected Meshes
                        selection.prop("renderOutline", true)
                                 .prop("outlineColor", Color3.Black());
                      }
                     ))
  cot3.position(new Vector3(0, -5, 0));


  return scene;  
}; 