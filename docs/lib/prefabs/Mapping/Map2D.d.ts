import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { OSM } from 'ol/source';
import { DynamicTexture, Scene, Mesh } from '@babylonjs/core';
import { Context } from 'vm';
export declare class Map2D {
    name: string;
    scene: Scene;
    layers: TileLayer<OSM>[];
    target: string;
    view: View;
    map: Map;
    container: HTMLElement;
    resolution: {
        width: number;
        height: number;
    };
    texture: DynamicTexture;
    mesh: Mesh;
    context: Context;
    size: number;
    scaleLon: any;
    scaleLat: any;
    constructor(name: string, scene: Scene, layers: TileLayer<OSM>[], view: View, resolution: {
        width: number;
        height: number;
    }, size: number);
    createContainer(): HTMLDivElement;
    createOLMap(): any;
    createTexture(): DynamicTexture;
    createMesh(): import("@babylonjs/core").GroundMesh;
    createScales(): any[];
    keyboardControls(): this;
}
export declare function createMap2D(name: string, scene: Scene): Map2D;
