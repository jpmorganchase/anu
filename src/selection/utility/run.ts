// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, Node, TransformNode } from '@babylonjs/core';
import { Selection } from '../index';

export function run(this: Selection, method: (d: any, n: Node, i: number) => any) {
  let values: Object[] = [];
  this.selected.forEach((node, i) => {
    method(node.metadata.data, node, i);
  });
  return this;
}
