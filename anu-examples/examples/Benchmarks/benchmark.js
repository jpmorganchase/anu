// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import {HemisphericLight, Vector3, Scene, ArcRotateCamera, ActionManager, InterpolateValueAction } from '@babylonjs/core'; 
import {extent, scaleOrdinal, scaleLinear, map,} from "d3";

//import { Mesh } from 'anu';

//create and export a function that takes a babylon engine and returns a scene
export const benchmark = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(2,2,-3.5);

  let center = anu.create('cot', 'cot')


  // setInterval(() => {
  //   let data = Array.from({length: 1000}, () => Math.floor(Math.random() * 100));
  //   var m = cot.bind('sphere', {diameter: 0.1}, data);
  // m.position((d) => new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5))
  // }, 5000)

  let sphere = anu.create('sphere', 'sphere', {diameter: 0.1})
  
  let cot = anu.selectName('cot', scene);

  anu.bindInstance(sphere, [{}])

  let m;
  
  let n = 0;

  // setInterval(() => {
  //   let data = Array.from({length: n += 1000}, () => Math.floor(Math.random() * 100));
  //   m?.dispose();
  //   m = cot.bindInstance(sphere, data);
  //   m.position((d) => new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5))
  //   //m.run((d, n, i) => n.setPivotPoint(center.position.subtract(n.position)))
  // }, 5000)


  //  let observer = scene.onBeforeRenderObservable.add(() => {
  //   m?.rotationY((d,n,i) => n.rotation.y += Math.log(d) * 0.01)
  // });




  return scene;
  
  };
  


