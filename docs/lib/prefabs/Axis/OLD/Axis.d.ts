import { Scene } from '@babylonjs/core/scene';
import { Selection } from '../../../selection';
declare class Axis {
    selection: Selection;
    scale: any;
    axis: string;
    padding: number;
    constructor(selection: Selection, scale: any, axis: string, padding: number);
}
export declare class PipeAxis extends Axis {
    makeAxis(scene: Scene): Selection;
}
export {};
