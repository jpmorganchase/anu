// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, TransformNode, Color3 } from '@babylonjs/core';
import { Selection } from '../selection';
import { create } from '../create';

//selection of the meshes that need to be connected with a line

//make a path through all points

//update path before render

function update() {}

export class Tracer {
  selection: Selection;
  name: string;
  path: any;

  constructor(selection: Selection, name: string, path: any) {
    this.selection = selection;
    this.name = name;
    this.path = selection.selected.map((d) => {
      (d as Mesh).computeWorldMatrix(true);
      return (d as Mesh).getAbsolutePosition();
    });
  }

  init() {
    let line = new Selection([new TransformNode(this.name + '_cot', this.selection.scene)], this.selection.scene);
    line
      .bind('lines', { points: this.path, updatable: true }, [{}])
      .attr('color', new Color3(1, 1, 1))
      .attr('alpha', 0.2);
  }
}
