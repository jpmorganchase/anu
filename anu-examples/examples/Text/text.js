// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
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
  camera.position = new Vector3(25,0,-15);

  let data = []
  
  const randomizeThreshold = (threshold) => Math.random() * threshold * 2 - threshold
  const randmizeVector = (threshold = 50) => new Vector3(randomizeThreshold(threshold), randomizeThreshold(threshold), randomizeThreshold(threshold))
  
  for (let i = 0; i <  1; i++){
    data.push({});
  }
  
  let options1 = {
    text: 'USA',
    color: Color3.Red()
  }
  let text1 = anu.createPlaneText('myText1', options1, scene)


  let options2 = {
    text: 'Europe',
    color: Color3.Blue()
  }
  let text2 = anu.createPlaneText('myText2', options2, scene);
  text2.position = new Vector3(0, -2, 0);


  options2.text = "Asia";
  options2.color = Color3.Green();
  setTimeout(() => text2.updatePlaneText(options2), 1000);
  setTimeout(() => text2.updatePlaneText({ color: Color3.Black(), size: 1.5 }), 2000);


  anu.bind('planeText', { color: Color3.Yellow() }, [{ text: "hello", value: 0}, { text: "world", value: 4 }])
      .position((d,n,i) => new Vector3(d.value, -5, 0))
      .run((d,n,i) => {
        n.updatePlaneText({ text: d.text });
      })

  return scene;
};