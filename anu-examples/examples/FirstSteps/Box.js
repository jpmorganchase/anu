import * as anu from "anu" //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Mesh} from "@babylonjs/core";

//create and export a function that takes a babylon engine and returns a scene
export const box = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)

  let box = anu.create('box', 'ourBox', scene, {size: 2}, {count: 2})

  return scene;
}; 