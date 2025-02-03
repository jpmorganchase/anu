// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, PlaneBlock, TransformNode } from '@babylonjs/core';
import fnt from '../../assets/roboto-regular.json';
import png from '../../assets/roboto-regular.png';
import { createTextMesh } from 'babylon-msdf-text';
import assign from 'lodash-es/assign';

interface planeTextOptions {
  text: string;
  size: number;
  font: any;
  atlas: any;
  opacity: number;
  align: 'left' | 'right' | 'center';
  color: Color3;
}

export class PlaneText extends TransformNode {
  name: string;
  options: planeTextOptions;
  scene: Scene;
  text: Mesh;

  constructor(name: string, options: planeTextOptions, scene: Scene) {
    super(name, scene, true);
    this.name = name;
    this.options = options;
    this.scene = scene;
    this.text = this.run();
  }

  run() {
    let plane = createTextMesh({
      text: this.options.text.toString(),
      color: this.options.color,
      opacity: this.options.opacity,
      align: this.options.align,
      font: this.options.font,
      scene: this.getScene(),
      atlas: this.options.atlas,
      lineHeight: 1,
    });

    let alignment =
      this.options.align == 'left' ? 0 : this.options.align == 'center' ? 1 : this.options.align == 'right' ? 2 : null;

    plane.scaling = new Vector3(0.015, 0.015, 1);
    plane.rotation.x = (180 * Math.PI) / 180;
    plane.bakeCurrentTransformIntoVertices();
    plane.computeWorldMatrix(true);
    let size = plane.getBoundingInfo().boundingBox;
    const translation = plane.position.subtract(new Vector3(size.center.x * alignment, size.center.y, 0));
    plane.setPivotMatrix(Matrix.Translation(translation.x, 0, 0), false);
    plane.setParent(this);
    this.scaling = new Vector3(this.options.size, this.options.size, 1);

    return plane;
  }

  public updatePlaneText(options: planeTextOptions) {
    const ops = assign({}, this.options, options);
    this.options = ops;
    this.text.dispose();
    this.text = this.run();
    this.text.position = Vector3.Zero();
  }
}

export function createPlaneText(name: string, options: planeTextOptions, scene: Scene) {
  const ops = {
    text: options.text || "undefined",
    size: options.size || 1,
    opacity: options.opacity || 1,
    align: options.align || 'center',
    color: options.color || Color3.White(),
    font: options.font || fnt,
    atlas: options.atlas || png,
  };

  let plane = new PlaneText(name, ops, scene);
  return plane;
}