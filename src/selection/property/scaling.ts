// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Node } from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Sets the XYZ scaling on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export function scaling(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)) {
  this.prop('scaling', value);
  return this;
}

/**
 * Sets the X scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function scalingX(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('scaling.x', value);
  return this;
}

/**
 * Sets the Y scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function scalingY(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('scaling.y', value);
  return this;
}

/**
 * Sets the Z scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function scalingZ(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('scaling.z', value);
  return this;
}
