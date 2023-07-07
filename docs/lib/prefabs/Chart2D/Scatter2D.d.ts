import { Scene, Color3 } from '@babylonjs/core';
import { Chart2D } from './Chart2D';
export declare class Scatter2D extends Chart2D {
    makeScales(data: [], x: string, y: string): this;
    makeElements(color?: Color3 | {
        key: string;
        scale: Function;
    }, alpha?: number): this;
    makeAxes(): this;
}
export declare function createScatter2D(name: string, scene: Scene, data: [], x: string, y: string, options?: {
    height?: number;
    width?: number;
    padding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    backgroundColor?: Color3;
    backgroundAlpha?: number;
    elementColor?: Color3 | {
        key: string;
        scale: Function;
    };
    elementAlpha?: number;
}): Scatter2D;
