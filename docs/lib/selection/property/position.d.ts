import { Vector3 } from '@babylonjs/core';
import { Selection } from '../index';
/**
 * Sets the XYZ position on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export declare function position(this: Selection, value: Vector3 | ((d: any, i: number) => Vector3)): Selection;
/**
 * Sets the X position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function positionX(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
/**
 * Sets the Y position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function positionY(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
/**
 * Sets the Z position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function positionZ(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
