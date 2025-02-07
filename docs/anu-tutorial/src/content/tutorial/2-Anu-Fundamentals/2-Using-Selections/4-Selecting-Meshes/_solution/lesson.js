import { Vector3, StandardMaterial, Color3} from "@babylonjs/core";
import { scaleOrdinal } from "d3-scale";
import * as anu from "@jpmorganchase/anu";

export default (scene) => {
    
  //anu.create returns a mesh object that we can modify using Babylon functions
  let box = anu.create("box", "myBox");
  box.name = "box-name";
  box.position = new Vector3(-1,0,0);

  let sphere = anu.create("sphere", "mySphere");
  sphere.id = "sphere-ID";
  sphere.position = new Vector3(1,0,0);
      
  let boxSelection = anu.selectName('box-name', scene)

  boxSelection.positionY(2)

  let sphereSelection = anu.selectID('sphere-ID', scene)

  sphereSelection.positionY(-2)  

  return scene
}