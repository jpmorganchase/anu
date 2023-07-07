import { Vector3, Space } from '@babylonjs/core';
import { Selection } from '../index';
export declare function translate(this: Selection, value: Vector3 | ((d: any, i: number) => Vector3), distance: number | ((d: any, i: number) => number), space?: Space): Selection;
