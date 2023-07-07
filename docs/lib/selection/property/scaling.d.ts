import { Vector3 } from '@babylonjs/core';
import { Selection } from '../index';
/**
 * Sets the XYZ scaling on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export declare function scaling(this: Selection, value: Vector3 | ((d: any, i: number) => Vector3)): Selection;
/**
 * Sets the X scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function scalingX(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
/**
 * Sets the Y scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function scalingY(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
/**
 * Sets the Z scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function scalingZ(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
