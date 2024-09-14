// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Node } from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Sets the XYZ rotation in raidians on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export function rotation(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)) {
  this.prop('rotation', value);
  return this;
}

/**
 * Sets the X rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function rotationX(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('rotation.x', value);
  return this;
}

/**
 * Sets the Y rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function rotationY(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('rotation.y', value);
  return this;
}

/**
 * Sets the Z rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function rotationZ(this: Selection, value: number | ((d: any, n: Node, i: number) => number)) {
  this.prop('rotation.z', value);
  return this;
}
