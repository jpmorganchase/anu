import { Vector3, ExecuteCodeAction, ActionManager} from "@babylonjs/core";
import * as anu from "@jpmorganchase/anu";

export default (scene) => {

  //anu.create returns a mesh object that we can modify using Babylon functions
  let box = anu.create("box", "myBox");
  box.position = new Vector3(-1,0,0);

  let sphere = anu.create("sphere", "mySphere");
  sphere.position = new Vector3(1,0,0);

  let shapes = anu.selectName(['mySphere', 'myBox'], scene)

  shapes.action((d,n,i) => new ExecuteCodeAction( //This action takes three arguments 
    ActionManager.OnPointerOverTrigger, //The type of trigger
    () => {
      n.scaling = new Vector3(2,2,2) //The function to execute 
    },
    undefined //An optional condition to evaluate before triggering
  ))
  .action((d,n,i) => new ExecuteCodeAction( //Lets make an inverse action on point out
    ActionManager.OnPointerOutTrigger, 
    () => {
      n.scaling = new Vector3(1,1,1) 
    },
    undefined 
  ))
      
  return scene
}