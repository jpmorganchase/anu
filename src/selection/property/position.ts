// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Node } from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Sets the XYZ position on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export function position(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)) {
  this.prop('position', value);
  return this;
}

/**
 * Sets the X position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function positionX(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('position.x', value);
  return this;
}

/**
 * Sets the Y position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function positionY(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('position.y', value);
  return this;
}

/**
 * Sets the Z position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function positionZ(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('position.z', value);
  return this;
}
