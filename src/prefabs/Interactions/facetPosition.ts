// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, MeshBuilder, StandardMaterial, Material, ActionManager, ExecuteCodeAction, SixDofDragBehavior, Color4, AxisScaleGizmo, ScaleGizmo, UtilityLayerRenderer, BoundingInfo, AbstractMesh, GizmoAnchorPoint, TransformNode, Space, PointerDragBehavior, AttachToBoxBehavior } from '@babylonjs/core';
import { bind, Selection } from '../../index';


interface positionUIOptions {
    name?: string;
    position?: Vector3;
    offset?: Vector3;
    width?: number;
    radius?: number;
    material?: any;
    diffuseColor?: Color3 | Color4;
    visibility?: number;
    behavior?: SixDofDragBehavior;
   
}

export function positionUI(this: Selection, options: positionUIOptions = {}): Selection{
    let bounds = this.boundingBox("exclude");

    //this.selec

    let width = options.width ||  bounds.boundingBox.extendSize.x * 0.5;
    let radius = options.radius || width * 0.05;
    let position = options.position || new Vector3(0, -bounds.boundingBox.extendSize.y, -bounds.boundingBox.extendSize.z); 
    let offset = options.offset || new Vector3(0, -radius * 2.5 ,0)
    let material: any;
    if (options.material === undefined){
        material = new StandardMaterial('PositionUIMat', this.scene);
        material.diffuseColor = options.diffuseColor || Color3.White()
    } else {
        material = options.material;
    }
    let visibility = options.visibility || 1
    let behavior: SixDofDragBehavior;
    if (options.behavior === undefined){
      behavior = new SixDofDragBehavior();
      behavior.faceCameraOnDragStart = true;
      behavior.rotateAroundYOnly = true;
  } else {
      behavior = options.behavior;
  }




    // let boundingMesh = new Mesh("bounds", this.scene);
    
    // boundingMesh.setBoundingInfo(bounds);
    // boundingMesh.showBoundingBox = true;

    // console.log(bounds.boundingBox)

  
    let grab = this.bind("capsule", {height: width, radius: radius})
                    .name((d,n,i) => options.name ??= n.name + "_positionUI")
                    .position(position.addInPlace(offset))
                    .rotation(new Vector3(0,0, 1.57))
                    .material(material)
                    .prop('visibility', visibility)
                    .action((d,n,i) => new ExecuteCodeAction( 
                      ActionManager.OnPickDownTrigger,
                      () => {
                        this.selected[i].addBehavior(behavior);
                      }
                  ))
                  .action((d,n,i) => new ExecuteCodeAction( 
                    ActionManager.OnPickOutTrigger,
                    () => {
                    
                      this.selected[i].removeBehavior(behavior);
                    }
                ))

    grab.addTags("exclude")

    //grab.run((d, n, i) => (n as Mesh).setBoundingInfo(new BoundingInfo(bounds.boundingBox.extendSize, bounds.boundingBox.extendSize)))
            
    return this;
}

interface scaleUIOptions {
  name?: string;
  position?: Vector3;
  offset?: Vector3;
  diameter?: number;
  material?: any;
  diffuseColor?: Color3 | Color4;
  visibility?: number;
  behavior?: PointerDragBehavior;
  minimum?: number;
  maximum?: number;
}

export function scaleUI(this: Selection, options: scaleUIOptions = {}): Selection{
  let bounds = this.boundingBox("exclude");
  
  let diameter = options.diameter ||  ((bounds.boundingBox.extendSize.x * 0.5) * 0.05) * 2;
  let position = options.position || new Vector3(0, -bounds.boundingBox.extendSize.y, -bounds.boundingBox.extendSize.z); 
  let offset = options.offset || new Vector3((bounds.boundingBox.extendSize.x * 0.5) * 1.5 / 2, (-diameter / 2) * 1.5 , 0)
  let material: any;
  if (options.material === undefined){
      material = new StandardMaterial('PositionUIMat', this.scene);
      material.diffuseColor = options.diffuseColor || Color3.White()
  } else {
      material = options.material;
  }
  let visibility = options.visibility || 1

  let behavior: PointerDragBehavior;
  if (options.behavior === undefined){
    behavior = new PointerDragBehavior({dragAxis: new Vector3(0,1,0)});
    behavior.moveAttached = false;
} else {
    behavior = options.behavior;
}

let minimum = options.minimum || -Infinity;
let maximum = options.maximum || Infinity;

  let scale = this.bind("sphere", {diameter: diameter})
                  .name((d,n,i) => options.name ??= n.name + "_scaleUI")
                  .position(position.addInPlace(offset))
                  .rotation(new Vector3(0,0, 1.57))
                  .material(material)
                  .prop('visibility', visibility)
                  .addTags("exclude")
                  .action((d,n,i) => new ExecuteCodeAction( 
                    ActionManager.OnPickDownTrigger,
                    () => {
                      n.addBehavior(behavior);
                    }
                  ))
                  .action((d,n,i) => new ExecuteCodeAction( 
                    ActionManager.OnPickOutTrigger,
                    () => {
                      n.removeBehavior(behavior);
                    }
                ))
            
              behavior.onDragObservable.add((event)=>{
                  let scaleFactor = -event.dragDistance
                  this.scaling((d,n,i) => {
                    let currentScale = (n as TransformNode).scaling
                    let afterScale = currentScale.add(new Vector3(scaleFactor, scaleFactor, scaleFactor)) 
                    if (afterScale.x < minimum) {
                      return currentScale
                    } else if (afterScale.x > maximum){
                      return currentScale
                    } else {
                      return afterScale
                    }
                  })
              })
            
  return this;
}



interface rotateUIOptions {
  name?: string;
  axis?: {[key: string]: Boolean};
  position?: Vector3;
  offset?: Vector3;
  diameter?: number;
  thickness?: number;
  material?: any;
  diffuseColor?: Color3 | Color4;
  visibility?: number;
  //behavior?: {[key: string]: PointerDragBehavior};
}

export function rotateUI(this: Selection, options: rotateUIOptions = {}): Selection{
  let bounds = this.boundingBox("exclude");
  let axis = options.axis|| {x: true, y: true, z: true};
  let diameter = options.diameter ||  ((bounds.boundingBox.extendSize.x * 0.5) * 0.05) * 2;
  let thickness = options.thickness || diameter / 2;
  let position = options.position || new Vector3(0, -bounds.boundingBox.extendSize.y, -bounds.boundingBox.extendSize.z); 
  let offset = options.offset || new Vector3(0, (-diameter) * 2.5 , 0)
  let material: any;
  if (options.material === undefined){
      material = new StandardMaterial('PositionUIMat', this.scene);
      material.diffuseColor = options.diffuseColor || Color3.White()
  } else {
      material = options.material;
  }
  let visibility = options.visibility || 1

  let behaviors: {[key: string]: PointerDragBehavior};

    behaviors = {
      x: new PointerDragBehavior({dragAxis: new Vector3(1,0,0)}),
      y: new PointerDragBehavior({dragAxis: new Vector3(1,0,0)}),
      z: new PointerDragBehavior({dragAxis: new Vector3(1,0,0)}),
    }
    behaviors.x!.moveAttached = false;
    behaviors.y!.moveAttached = false;
    behaviors.z!.moveAttached = false;

   

let data: any = []
Object.keys(axis).forEach((key) => { if (axis[key] == true)  data.push({"axis": key}) });


  let scale = this.bind("torus", {diameter: diameter, thickness: thickness}, data)
                  .name((d,n,i) => options.name ??= n.name + "_scaleUI")
                  .position((d) =>
                  (d.axis == 'x') ? new Vector3(0,0,0).addInPlace(position).addInPlace(offset)  :
                  (d.axis == 'y') ?  new Vector3(diameter * 1.5,0, 0).addInPlace(position).addInPlace(offset) :
                  (d.axis == 'z') ?  new Vector3(-diameter * 1.5,0, 0).addInPlace(position).addInPlace(offset) :
                  new Vector3(0,0,0)
                )
                  .rotation((d) =>
                    (d.axis == 'x') ? new Vector3(0,0, 1.57) :
                    (d.axis == 'y') ?  new Vector3(0,0, 0) :
                    (d.axis == 'z') ?  new Vector3(1.57,0, 0) :
                    new Vector3(0,0,0)
                  )
                  .material(material)
                  .prop('visibility', visibility)
                  .addTags("exclude")
                  // .run((d,n,i) => {
                  //   var behavior = new AttachToBoxBehavior(n as Mesh);
                  //   this.selected[0].addBehavior(behavior);
                  // })
                  .action((d,n,i) => new ExecuteCodeAction( 
                    ActionManager.OnPickDownTrigger,
                    () => {
                      n.addBehavior(behaviors[d.axis]);
                    }
                  ))
                  .action((d,n,i) => new ExecuteCodeAction( 
                    ActionManager.OnPickOutTrigger,
                    () => {
                      n.removeBehavior(behaviors[d.axis]);
                    }
                ))
            
              behaviors.x.onDragObservable.add((event)=>{
                console.log("x", event.dragDistance);
                this.rotation((d,n,i) => (n as TransformNode).rotation.add(new Vector3(  event.dragDistance, 0,0)))
              })

              behaviors.y.onDragObservable.add((event)=>{
                console.log("y", event.dragDistance);
                this.rotation((d,n,i) => (n as TransformNode).rotation.add(new Vector3(0, -event.dragDistance,0)))
              })

              behaviors.z.onDragObservable.add((event)=>{
                console.log("z", event.dragDistance);
                this.rotation((d,n,i) => (n as TransformNode).rotation.add(new Vector3(0, 0,  -event.dragDistance)))
              })
            
  return this;
}

