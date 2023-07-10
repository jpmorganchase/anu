// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Space, TransformNode } from '@babylonjs/core';
import { Selection } from '../index';

export function translate(
  this: Selection,
  value: Vector3 | ((d: any, i: number) => Vector3),
  distance: number | ((d: any, i: number) => number),
  space?: Space,
) {
  this.selected.forEach((node, i) => {
    node instanceof TransformNode
      ? node.translate(
          value instanceof Function ? value(node.metadata.data, i) : value,
          distance instanceof Function ? distance(node.metadata.data, i) : distance,
          space,
        )
      : console.log('Node not a mesh, skipping.');
  });
  return this;
}
