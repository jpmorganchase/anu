// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, MeshBuilder, StandardMaterial, Material, ActionManager, ExecuteCodeAction, SixDofDragBehavior, Color4 } from '@babylonjs/core';
import { Selection } from '../../index';

interface positionUIOptions {
    name?: string;
    position?: Vector3;
    offset?: Vector3;
    width?: number;
    radius?: number;
    material?: any;
    diffuseColor?: Color3 | Color4;
    visibility?: number

}

export function positionUI(this: Selection, options: positionUIOptions = {}): Selection{
    let bounds = this.boundingBox();
    let position = options.position || new Vector3(0, -bounds.boundingBox.extendSize.y, -bounds.boundingBox.extendSize.z); 
    let width = options.width ||  bounds.boundingBox.extendSize.x * 0.5;
    let radius = options.radius || width * 0.05;
    let offset = options.offset || new Vector3(0, -radius * 2.5 ,0)
    let material: any;
    if (options.material === undefined){
        material = new StandardMaterial('PositionUIMat', this.scene);
        material.diffuseColor = options.diffuseColor || Color3.White()
    } else {
        material = options.material;
    }
    let visibility = options.visibility || 1

    // let boundingMesh = new Mesh("bounds", this.scene);
    
    // boundingMesh.setBoundingInfo(bounds);
    // boundingMesh.showBoundingBox = true;

    // console.log(bounds.boundingBox)

 

    const drag = new SixDofDragBehavior();

    drag.faceCameraOnDragStart = true;
    drag.rotateAroundYOnly = true;

    let grab = this.bind("capsule", {height: width, radius: radius})
                    .name((d,n,i) => options.name ??= n.name + "_positionUI")
                    .position(position.addInPlace(offset))
                    .rotation(new Vector3(0,0, 1.57))
                    .material(material)
                    .prop('visibility', visibility)
                    .action((d,n,i) => new ExecuteCodeAction( 
                      ActionManager.OnPickDownTrigger,
                      () => {
                        this.selected[i].addBehavior(drag);
                      }
                  ))
                  .action((d,n,i) => new ExecuteCodeAction( 
                    ActionManager.OnPickOutTrigger,
                    () => {
                      this.selected[i].removeBehavior(drag);
                    }
                ))


    return this;
}
