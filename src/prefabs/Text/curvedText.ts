// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, MeshBuilder } from '@babylonjs/core';
import fnt from "../../assets/roboto-regular.json";
import png from "../../assets/roboto-regular.png";
import { createTextMesh } from "babylon-msdf-text";

interface curvedTextOptions {
  text: string;
  size: number;
  font: any;
  atlas: any;
  opacity: number;
  align: "left" | "right" | "center";
  color: Color3;
  radius: number;
}

export class CurvedText {
  name: string;
  options: curvedTextOptions;
  scene: Scene;
  mesh: Mesh;

  constructor(name: string, options: curvedTextOptions, scene: Scene) {
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
      lineHeight: 1,
    });

    let alignment = (this.options.align == "left") ? 0 :
                    (this.options.align == "center") ? 1 :
                    (this.options.align == "right") ? 2 : null;

    // Create a curved surface
    let curvedPlane = MeshBuilder.CreatePlane("curvedPlane", {
      height: 1,
      width: 2 * Math.PI * this.options.radius, // Width based on radius for curve
      sideOrientation: Mesh.DOUBLESIDE // Use Mesh.DOUBLESIDE here
    }, this.scene);

    // Apply transformation to curve the surface along the x-axis
    curvedPlane.scaling = new Vector3(0.015, 0.015, 1);
    curvedPlane.rotation.x = 180 * Math.PI / 180;
    curvedPlane.bakeCurrentTransformIntoVertices();
    
    // Move text onto the curved plane
    let size = plane.getBoundingInfo().boundingBox;
    const translation = plane.position.subtract(new Vector3(size.center.x * alignment, size.center.y, 0));
    plane.setPivotMatrix(Matrix.Translation(translation.x, 0, 0), false);
    plane.setParent(curvedPlane);
    curvedPlane.scaling = new Vector3(this.options.size, this.options.size, 1);

    return cot;
  }
}

export function createCurvedText(
  name: string,
  options: curvedTextOptions,
  scene: Scene,
) {
  const ops = {
    text: options.text || 'undefined',
    size: options.size || 1,
    opacity: options.opacity || 1,
    align: options.align || "center",
    color: options.color || Color3.White(),
    font: options.font || fnt,
    atlas: options.atlas || png,
    radius: options.radius || 10,  // Default radius for curvature
  };

  let curvedText = new CurvedText(name, ops, scene);

  return curvedText.mesh;
}
