import { Mesh } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
export declare function text2d(name: string, options: {
    text?: string;
    fontSize?: number;
    fontMod?: string;
    fontStyle?: string;
    fontColor?: string;
    backgroundColor?: string;
}, scene: Scene): Mesh;
