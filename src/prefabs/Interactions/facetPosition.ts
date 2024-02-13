// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, MeshBuilder, StandardMaterial, Material, ActionManager, ExecuteCodeAction, SixDofDragBehavior, Color4, AxisScaleGizmo, ScaleGizmo, UtilityLayerRenderer, BoundingInfo, AbstractMesh, GizmoAnchorPoint, TransformNode, Space } from '@babylonjs/core';
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
  gizmo?: AxisScaleGizmo;
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

  let gizmo: AxisScaleGizmo;
  if (options.gizmo === undefined){
    // const utilLayer = new UtilityLayerRenderer(this.scene ??= this.selected[0]._scene);
    // utilLayer.utilityLayerScene.autoClearDepthAndStencil = false;
    gizmo = new AxisScaleGizmo(new Vector3(1,1,1))
} else {
    gizmo = options.gizmo;
}

 let boundingMesh = new Mesh("bounds", this.scene);
    

  let scale = bind("sphere", {diameter: diameter}, [{}], gizmo.gizmoLayer.utilityLayerScene)
                  .name((d,n,i) => options.name ??= n.name + "_scaleUI")
                  .position(position.addInPlace(offset))
                  .rotation(new Vector3(0,0, 1.57))
                  .material(material)
                  .prop('visibility', visibility)
                  .addTags("exclude")
                  .run((d,n,i) => {
                    gizmo.attachedNode = this.selected[i];
                    gizmo.setCustomMesh((n as Mesh));
                    gizmo.updateScale = false;
         
                  })


           

              gizmo.dragBehavior.onDragStartObservable.add((event)=>{
                (scale.selected[0] as Mesh).setParent(this.selected[0])
              })

              gizmo.dragBehavior.onDragEndObservable.add((event)=>{
                (scale.selected[0] as Mesh).setParent(gizmo._rootMesh)
              })

            

  return this;
}


