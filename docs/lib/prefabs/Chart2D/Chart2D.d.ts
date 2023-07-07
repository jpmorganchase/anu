import { Scene, Color3 } from '@babylonjs/core';
import { Selection } from '../../selection';
import { Axis } from '../Axis/OLD/AxisNew';
export declare abstract class Chart2D {
    name: string;
    scene: Scene;
    cot: Selection;
    background: {
        [index: string]: Selection;
    };
    elements: {
        [index: string]: Selection;
    };
    scales: {
        [index: string]: Function;
    };
    axes: {
        [index: string]: Axis;
    };
    height: number;
    width: number;
    padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    data: [];
    x: string;
    y: string;
    color: Color3 | {
        key: string;
        scale: Function;
    };
    constructor(name: string, scene: Scene);
    makeBackground(height: number, width: number, padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }, color: Color3, backgroundAlpha: number): this;
    abstract makeScales(data: [], x: string, y: string): void;
    abstract makeElements(color: Color3 | {
        key: string;
        scale: Function;
    }): void;
    abstract makeAxes(): void;
}
