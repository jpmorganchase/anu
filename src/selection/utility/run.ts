// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, Node} from '@babylonjs/core';
import { Selection } from '../index';

export function run(this: Selection, method: (d: any, node: Node, i: number) => any) {
  let values: Object[] = [];
  this.selected.forEach((node, i) => {
    method(node.metadata.data ??= {}, node, i)
  });
  return this;
}
