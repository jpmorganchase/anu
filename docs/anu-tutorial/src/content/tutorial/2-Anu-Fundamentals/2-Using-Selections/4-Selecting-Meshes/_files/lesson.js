import { Vector3, StandardMaterial, Color3} from "@babylonjs/core";
import { scaleOrdinal } from "d3";
import * as anu from "@jpmorganchase/anu";

export default (scene) => {

  //anu.create returns a mesh object that we can modify using Babylon functions
  let box = anu.create("box", "myBox");
  box.name = "box-name";
  box.position = new Vector3(-1,0,0);

  let sphere = anu.create("sphere", "mySphere");
  sphere.id = "sphere-ID";
  sphere.position = new Vector3(1,0,0);
      
  return scene
}