// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, PlaneBlock } from '@babylonjs/core';
import fnt from "../../assets/roboto-regular.json";
import png from "../../assets/roboto-regular.png";
import { createTextMesh } from "babylon-msdf-text";

interface planeTextOptions {
  text: string;
  size: number;
  font: any;
  atlas: any;
  opacity: number;
  align: "left" | "right" | "center";
  color: Color3;
}

export class PlaneText {
  name: string;
  options: planeTextOptions;
  scene: Scene;
  mesh: Mesh;

  constructor(name: string, options: planeTextOptions, scene: Scene){
    this.name = name;
    this.options = options;
    this.scene = scene;
    this.mesh = this.run();
  }

  run() {

  let cot = new Mesh(this.name);

  let plane = createTextMesh({
    text: this.options.text.toString(),
    color: this.options.color,
    opacity: this.options.opacity,
    align: this.options.align,
    font: this.options.font,
    scene: cot.getScene(),
    atlas: this.options.atlas,
    lineHeight: 1,
  });

  let alignment = (this.options.align == "left")? 0 :
                  (this.options.align == "center")? 1 : 
                  (this.options.align == "right")? 2 : null



  plane.scaling = new Vector3(0.015, 0.015, 1);
  plane.rotation.x = 180 * Math.PI / 180;
  plane.bakeCurrentTransformIntoVertices();
  plane.computeWorldMatrix(true);
  let size = plane.getBoundingInfo().boundingBox;
  const translation = plane.position.subtract(new Vector3(size.center.x * alignment , size.center.y, 0))
  plane.setPivotMatrix(Matrix.Translation(translation.x, 0, 0), false);
  plane.setParent(cot);
  cot.scaling = new Vector3(this.options.size,this.options.size,1);

  return cot;

  }


}

export function createPlaneText(
  name: string,
  options: planeTextOptions,
  scene: Scene,
) {
  const ops = {
    text: options.text || 'undefined',
    size: options.size || 1,
    opacity: options.opacity || 1,
    align: options.align || "center",
    color: options.color || Color3.White(),
    font: options.font|| fnt,
    atlas: options.atlas || png
  }

  let plane = new PlaneText(name, ops, scene);

  return plane.mesh;
  
}


