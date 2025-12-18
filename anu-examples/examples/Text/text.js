// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation=
import { VertexBuffer, HemisphericLight, Vector3, Scene, ArcRotateCamera, TransformNode, ActionManager, InterpolateValueAction, StandardMaterial, Color3, MeshBuilder, AbstractAudioBus} from '@babylonjs/core'; 
// import {extent, scaleOrdinal, scaleLinear, schemeCategory10, map} from "d3";


//import { Mesh } from 'anu';

//create and export a function that takes a babylon engine and returns a scene
export const text = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0,0,-15);
  
  //Basic function
  let options1 = {
    text: 'USA',
    color: Color3.Red(),
    opacity: 1,
  }
  let text1 = anu.createPlaneText('myText1', options1, scene);

  text1.setEnabled(false);

  setTimeout(() => {
    text1.setEnabled(true);
  }, 1000);

    setTimeout(() => {
    text1.dispose();
  }, 2000);





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
  setTimeout(() => text2.updatePlaneText(options2), 1000);
  setTimeout(() => text2.updatePlaneText({ text: "Europe", color: Color3.Black() }), 3000);
  setTimeout(() => {
    console.log(text2.text)
    text2.text = "Africa";
    console.log(text2.text)
    text2.color = Color3.Yellow();
    text2.size = 2;
    text2.align = 'left';
    text2.opacity = 0.1;
    console.log(text2.font)
    }, 4000);

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
  let leftText = anu.createPlaneText("leftAlign", { text: "Left Align", align: "left"}, scene);
  let centerText = anu.createPlaneText("centerAlign", { text: "Center Align", align: "center" }, scene);
  let rightText = anu.createPlaneText("rightAlign", { text: "Right Align", align: "right" }, scene);

  leftText.position.y = 5;
  centerText.position.y = 4;
  rightText.position.y = 3;

  // -------------

  // Update text as a child of a parent that is not at the origin
  let parent = anu.create('cot');
  let childText = anu.createPlaneText('movedText', { text: "I am a child!"}, scene);
  childText.parent = parent;
  childText.position = new Vector3(5, 1, 0);
  childText.rotation = new Vector3(Math.PI / 2, 0, -Math.PI / 4);
  parent.position = new Vector3(1, 2, 0);
  parent.rotation = new Vector3(0, Math.PI / 4, 0, 0);
  setTimeout(() => {
    childText.text = "I just moved!"
    childText.size = 2
  }, 1000)

  return scene;
};