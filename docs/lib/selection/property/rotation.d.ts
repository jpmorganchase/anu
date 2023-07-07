import { Vector3 } from '@babylonjs/core';
import { Selection } from '../index';
/**
 * Sets the XYZ rotation in raidians on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export declare function rotation(this: Selection, value: Vector3 | ((d: any, i: number) => Vector3)): Selection;
/**
 * Sets the X rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function rotationX(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
/**
 * Sets the Y rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function rotationY(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
/**
 * Sets the Z rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export declare function rotationZ(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
