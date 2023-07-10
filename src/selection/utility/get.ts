// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { TransformNode } from '@babylonjs/core/Meshes';
import { Selection } from '../index';
import loGet from 'lodash-es/get';

export function get(this: Selection, accessor: string) {
  let values: Object[] = [];
  this.selected.forEach((node, i) => {
    node instanceof TransformNode
      ? values.push({ node: node, value: loGet(node, accessor) })
      : console.log('Node not a mesh, skipping.');
  });
  return values;
}
