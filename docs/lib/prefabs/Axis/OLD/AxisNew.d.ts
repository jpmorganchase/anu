import { Color3, Vector3 } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
import { Selection } from '../../../selection';
export declare abstract class Axis {
    selection: Selection;
    axis: string;
    scale: any;
    scene: Scene;
    cot: Selection;
    elements: {
        [index: string]: Selection;
    };
    padding: Vector3;
    constructor(selection: Selection, axis: string, scale: any);
    abstract makeAxis(options: {}): this;
    abstract makeTicks(color: Color3, alpha: number): this;
}
export declare class PipeAxis extends Axis {
    makeAxis(options: {
        radius: number;
        color: Color3;
        alpha: number;
        padding: Vector3;
    }): this;
    makeTicks(color: Color3, alpha: number): this;
}
export declare function createPipeAxis(this: Selection, axis: string, scale: any, options?: {
    radius?: number;
    meshColor?: Color3;
    meshAlpha?: number;
    padding?: Vector3;
}): PipeAxis;
