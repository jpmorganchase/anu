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

  //Basic function
  let options1 = {
    text: 'USA',
    color: Color3.Red()
  }
  let text1 = anu.createPlaneText('myText1', options1, scene)

  //------------

  //Update
  let options2 = {
    text: 'Australia',
    color: Color3.Blue(),
    size: 1
  }
  let text2 = anu.createPlaneText('myText2', options2, scene);
  text2.position = new Vector3(0, 1, 0);

  options2.text = "Asia";
  options2.color = Color3.Green();
  options2.size = 1;
  setTimeout(() => text2.updatePlaneText(options2), 2000);
  setTimeout(() => text2.updatePlaneText({ text: "Europe", color: Color3.Black(), size: 1.5 }), 3000);

  //------------

  //Bind
  anu.bind('planeText', { color: Color3.Yellow() }, [{ text: "hello", value: -2}, { text: "world", value: -4 }, { text: "!!!", value: -6}])
      .positionY((d,n,i) => d.value)
      .transition((d,n,i) => ({
        duration: 20000
      }))
      .tween((d,n,i) =>
      {
        return (t) => {
          if ((t * 1000) % 2 == 0) {
            n.updatePlaneText({ text: Math.random(), color: Color3.Random(), size: Math.random() * 10 });
            n.rotation = Vector3.Random();
          }
        }
      })
    
  //Align
  let leftText = anu.createPlaneText("leftAlign", { text: "Left Align", align: "left" }, scene);
  let centerText = anu.createPlaneText("centerAlign", { text: "Center Align", align: "center" }, scene);
  let rightText = anu.createPlaneText("rightAlign", { text: "Right Align", align: "right" }, scene);

  leftText.position.y = 5;
  centerText.position.y = 4;
  rightText.position.y = 3;

  return scene;
};