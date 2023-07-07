import { BoundingInfo } from '@babylonjs/core';
import { Selection } from '../index';
/**
 * Calculates the cumalitive bounding box of the current selection.
 *
 * @returns instance of BoundingInfo class, an object containing all bounding box values.
 */
export declare function boundingBox(this: Selection): BoundingInfo;
