// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { DynamicTexture, StandardMaterial, MeshBuilder, Mesh, AbstractMesh, TransformNode, Scene, Vector3, Color3, Matrix } from '@babylonjs/core';
import fnt from "../../assets/roboto-regular.json";
import png from "../../assets/roboto-regular.png";
import { createTextMesh } from "babylon-msdf-text";
import { tree } from 'd3';



interface textOptions {
  text: string;
  size: number;
  font: any;
  atlas: any;
  //width: number;
  opacity: number;
  //lineHeight: number;
  //letterSpacing: number;
  align: "left" | "right" | "center";
  color: Color3;
  //billboardMode: number;
}

class Text2D {
  name: string;
  options: textOptions;
  scene: Scene;
  mesh: Mesh;

  constructor(name: string, options: textOptions, scene: Scene){
    this.name = name;
    this.options = options;
    this.scene = scene;
    this.mesh = this.run();
  }

  run() {

  // let font = this.options.fontMod + ' ' + this.options.fontSize + 'px ' + this.options.fontStyle;

  // //Set height for plane
  // var planeHeight = this.options.size;

  // //Set height for dynamic texture
  // var DTHeight = 1.5 * this.options.fontSize; //or set as wished

  // //Calcultae ratio
  // var ratio = planeHeight / DTHeight;

  // //Use a temporay dynamic texture to calculate the length of the text on the dynamic texture canvas
  // var temp = new DynamicTexture('DynamicTexture', 64, this.scene);
  // var tmpctx = temp.getContext();
  // tmpctx.font = font;
  // var DTWidth = tmpctx.measureText(this.options.text).width + 8;

  // //Calculate width the plane has to be
  // var planeWidth = DTWidth * ratio;

  // //Create dynamic texture and write the text
  // var dynamicTexture = new DynamicTexture('DynamicTexture', { width: DTWidth, height: DTHeight }, this.scene, false);
  // var mat = new StandardMaterial('text', this.scene);
  // mat.diffuseTexture = dynamicTexture;
  // mat.diffuseTexture.hasAlpha = true;
  // dynamicTexture.drawText(this.options.text, null, null, font, this.options.fontColor, this.options.backgroundColor, true);

  // //Create plane and set dynamic texture as material
  // var plane = MeshBuilder.CreatePlane(this.name, { width: planeWidth, height: planeHeight }, this.scene);
  // plane.material = mat;
  // // plane.preserveParentRotationForBillboard = false;
  // // plane.bakeCurrentTransformIntoVertices();

  // // plane.billboardMode =  Mesh.BILLBOARDMODE_ALL;
  // //plane.preserveParentRotationForBillboard = true;

  let plane = createTextMesh({
    text: this.options.text.toString(),
    //width: this.options.width,
    //letterSpacing: this.options.letterSpacing,
    color: this.options.color,
    //lineHeight: this.options.lineHeight,
    opacity: this.options.opacity,
    align: this.options.align,
    font: this.options.font,
    scene: this.scene,
    atlas: this.options.atlas,
    engine: this.scene.getEngine(),
  });

  plane.computeWorldMatrix(true)
  let extent = 1 / plane.getBoundingInfo().boundingBox.extendSize._y ;
  plane.scaling = new Vector3(extent,extent,extent);
  plane.bakeCurrentTransformIntoVertices();
  plane.scaling = new Vector3(this.options.size,this.options.size,this.options.size);
  let size = plane.getBoundingInfo().boundingBox
  //console.log(plane.getAbsolutePivotPoint())
  //plane.setPivotPoint(new Vector3(1000, (size.center.y / 2), 0));
  plane.bakeCurrentTransformIntoVertices();
   
  // plane.computeWorldMatrix(true);
  // plane.bakeCurrentTransformIntoVertices();
  // plane.computeWorldMatrix(true)

  

  //plane.doNotSyncBoundingInfo = true;
  // plane.freezeNormals()
  // plane.material?.freeze()
  // plane.cullingStrategy = AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY
  
  return plane;
  }


}

export function planeText(
  name: string,
  options: textOptions,
  scene: Scene,
) {
  const ops = {
    text: options.text || 'undefined',
    size: options.size || 1,
    //width: options.width || 20,
    opacity: options.opacity || 1,
    align: options.align || "center",
    //lineHeight: options.lineHeight || 1,
    //letterSpacing: options.letterSpacing || 1,
    color: options.color || Color3.White(),
    font: options.font|| fnt,
    atlas: options.atlas || png
  }
  //const billboardMode: number = options.billboardMode || 0;

  let plane = new Text2D(name, ops, scene);

  return plane.mesh;
  
}


