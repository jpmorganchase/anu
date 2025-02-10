import { Vector3, ExecuteCodeAction } from "@babylonjs/core";
import * as anu from "@jpmorganchase/anu";

export default (scene) => {

  //anu.create returns a mesh object that we can modify using Babylon functions
  let box = anu.create("box", "myBox");
  box.position = new Vector3(-1,0,0);

  let sphere = anu.create("sphere", "mySphere");
  sphere.position = new Vector3(1,0,0);

  let shapes = anu.selectName(['mySphere', 'myBox'], scene)

  shapes
      
  return scene
}