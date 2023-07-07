import { Scene } from '@babylonjs/core/scene';
import { Selection } from '../../selection';
import { shape, shapeAlt } from './shape';
import { label } from './label';
import { background } from './background';
import { ticks } from './ticks';
export declare class Axis {
    selection: Selection;
    name: string;
    axis: 'x' | 'y' | 'z';
    scale: any;
    scene: Scene;
    cot: Selection;
    selections: {
        String: Selection;
    } | {};
    boundingBox: any;
    constructor(selection: Selection, name: string, axis: 'x' | 'y' | 'z', scale: any);
    shape: typeof shape;
    label: typeof label;
    background: typeof background;
    ticks: typeof ticks;
}
interface AxisOptions {
    cot?: Selection;
    x?: any;
    y?: any;
    z?: any;
}
export declare class AxisAlt {
    name: string;
    options: AxisOptions;
    scene: Scene;
    CoT: Selection;
    constructor(name: string, scene: Scene, options?: AxisOptions);
    private setCoT;
    shape: typeof shapeAlt;
}
export {};
