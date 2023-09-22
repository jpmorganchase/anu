// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from 'anu' //Anu for Scene-Graph Manipulation
import iris from '../../data/iris.json' assert {type: 'json'}; //Our data
import { VertexBuffer, HemisphericLight, Vector3, Scene, ArcRotateCamera, TransformNode, ActionManager, InterpolateValueAction, StandardMaterial, Color3, MeshBuilder} from '@babylonjs/core'; 
// import {extent, scaleOrdinal, scaleLinear, schemeCategory10, map} from "d3";
import { createTextMesh } from "babylon-msdf-text";
import fnt from "../../fonts/roboto-regular.json";
import png from "../../fonts/roboto-regular.png";


//import { Mesh } from 'anu';

//create and export a function that takes a babylon engine and returns a scene
export const text = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(28,0,-30);

  let data = []
  
  const randomizeThreshold = (threshold) => Math.random() * threshold * 2 - threshold
  const randmizeVector = (threshold = 50) => new Vector3(randomizeThreshold(threshold), randomizeThreshold(threshold), randomizeThreshold(threshold))
  
  // let mesh = createTextMesh({
  //   text: `Test`,
  //   font: fnt,
  //   scene,
  //   atlas: png,
  //   engine,
  // });

 
  // let instanceMesh = mesh.createInstance('test');

  // instanceMesh.position = randmizeVector();

  for (let i = 0; i <  1; i++){
   data.push({})
  

  
    
  }
  
   anu.bind('text2d', scene, {text: 'Test'}, data)//.position(() => randmizeVector())//.scaling(new Vector3(100,100,100))


    // anu.createTextMesh({
    //     text: `Test`,
    //     font: fnt,
    //     scene,
    //     atlas: png,
    //     engine,
    //   })
    

    return scene;
  
  };
  


