// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, Color3} from '@babylonjs/core'; 

//create and export a function that takes a babylon engine and returns a scene
export const text = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 3) , Math.PI / 2, 7, new Vector3(0, 0, 0), scene);
  camera.attachControl(true);

    let options = {
      text: 'Hello World',
      color: Color3.Green()
    }

    let myText = anu.createPlaneText('myText', options, scene);

    options.text = "Goodbye World";
    options.color = Color3.Red();
    options.size = 1.5;
    
    scene.onPointerDown = (pointer) => myText.updatePlaneText(options);

    scene.onPointerUp = (pointer) => myText.text = "Hello Again";

    return scene;
  
  };
  


