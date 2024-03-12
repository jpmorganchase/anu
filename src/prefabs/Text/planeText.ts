// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh } from '@babylonjs/core';
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

class PlaneText {
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

  let cot = new Mesh('cot');

  let plane = createTextMesh({
    text: this.options.text.toString(),
    color: this.options.color,
    opacity: this.options.opacity,
    align: this.options.align,
    font: this.options.font,
    scene: cot.getScene(),
    atlas: this.options.atlas,
  });

  plane.computeWorldMatrix(true)
  let extent = 1 / plane.getBoundingInfo().boundingBox.extendSize._y ;
  plane.scaling = new Vector3(extent,extent,extent);
  plane.computeWorldMatrix(true);
  plane.bakeCurrentTransformIntoVertices();
  plane.scaling = new Vector3(this.options.size,this.options.size,this.options.size);
  plane.computeWorldMatrix(true);
  plane.bakeCurrentTransformIntoVertices();
  let size = plane.getBoundingInfo().boundingBox;
  cot.position = new Vector3(size.center.x, size.center.y, 0);
  plane.setParent(cot);

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


