// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { DynamicTexture, StandardMaterial, MeshBuilder, Mesh, AbstractMesh, TransformNode } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';


interface textOptions {
  text: string;
  size: number;
  fontSize: number;
  fontMod: string;
  fontStyle: string;
  fontColor: string;
  backgroundColor: string;
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

  let font = this.options.fontMod + ' ' + this.options.fontSize + 'px ' + this.options.fontStyle;

  //Set height for plane
  var planeHeight = this.options.size;

  //Set height for dynamic texture
  var DTHeight = 1.5 * this.options.fontSize; //or set as wished

  //Calcultae ratio
  var ratio = planeHeight / DTHeight;

  //Use a temporay dynamic texture to calculate the length of the text on the dynamic texture canvas
  var temp = new DynamicTexture('DynamicTexture', 64, this.scene);
  var tmpctx = temp.getContext();
  tmpctx.font = font;
  var DTWidth = tmpctx.measureText(this.options.text).width + 8;

  //Calculate width the plane has to be
  var planeWidth = DTWidth * ratio;

  //Create dynamic texture and write the text
  var dynamicTexture = new DynamicTexture('DynamicTexture', { width: DTWidth, height: DTHeight }, this.scene, false);
  var mat = new StandardMaterial('text', this.scene);
  mat.diffuseTexture = dynamicTexture;
  mat.diffuseTexture.hasAlpha = true;
  dynamicTexture.drawText(this.options.text, null, null, font, this.options.fontColor, this.options.backgroundColor, true);

  //Create plane and set dynamic texture as material
  var plane = MeshBuilder.CreatePlane(this.name, { width: planeWidth, height: planeHeight }, this.scene);
  plane.material = mat;
  //plane.billboardMode =  this.options.billboardMode;
  //plane.preserveParentRotationForBillboard = true;
  
  plane.doNotSyncBoundingInfo = true;
  plane.freezeNormals()
  plane.material.freeze()
  plane.cullingStrategy = AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY
  return plane;
  }


}

export function planeText(
  name: string,
  options: textOptions,
  scene: Scene,
) {
  const text: string = options.text || 'undefined';
  const size: number = options.size || 1;
  const fontSize: number = options.fontSize || 25;
  const fontMod: string = options.fontMod || '';
  const fontStyle: string = options.fontStyle || 'Arial';
  const fontColor: string = options.fontColor || '#000000';
  const backgroundColor: string = options.backgroundColor || 'transparent';
  //const billboardMode: number = options.billboardMode || 0;

  let plane = new Text2D(name, options, scene);

  return plane.mesh;
  
}
