// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { AbstractMesh, TransformNode } from '@babylonjs/core/Meshes';
import { Selection } from '../index';
import loGet from 'lodash-es/get';

export function get(this: Selection, accessor: string) {
  let values: Object[] = [];
  this.selected.forEach((node, i) => {
      values.push(loGet(node, accessor))
  });
  return values;
}
