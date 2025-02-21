
import { Texture, Node, CreateGreasedLine, CreatePlane, Mesh, GreasedLineMesh, CreateLineSystem, LinesMesh } from '@babylonjs/core';
import { Selection } from '../../selection';
import { PlaneText, createPlaneText } from '../Text/planeText';

export type AxesBools = {x?: boolean, y?: boolean, z?: boolean};

export type AxesOptionsInterface = {
    scale?: { x?: any; y?: any; z?: any };
    parent?: Node | Selection;
    domain?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    domainOptions?: GreasedLineParams | {};
    domainMaterialOptions?: GreasedLineMaterial;
    domainProperties?: GreasedLineProperties;
    background?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    backgroundOptions?: PlaneParams | { x?: PlaneParams; y?: PlaneParams; z?: PlaneParams} | {}; 
    backgroundProperties?: MeshProperties |  { x?: MeshProperties; y?: MeshProperties; z?: MeshProperties} | {};
    backgroundPosition?: { x?: 0 | 1; y?: 0 | 1; z?: 0 | 1 };
    grid?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    gridOptions?: LinesParams | {} | {x?: LinesParams, y?: LinesParams, z?: LinesParams};
    gridProperties?: LineProperties| {} | {x?: LineProperties, y?: LineProperties, z?: LineProperties};
    gridTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]};
    label?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    labelOptions?: PlaneTextParams | { x?: PlaneTextParams ; y?: PlaneTextParams; z?: PlaneTextParams} | {};
    labelProperties?: PlaneTextProperties | { x?: PlaneTextProperties ; y?: PlaneTextProperties; z?: PlaneTextProperties} | {};
    labelTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]};
    labelFormat?: { x?: (d: string)=> string; y?: (d: string)=> string; z?: (d: string)=> string};
    labelMargin?: {x?: number, y?: number, z?: number};
    atlas?: Texture;
  }

type PropertyKeys<T> = {
    [K in keyof T]: T[K]extends Function ? never : K;
}[keyof T];

export type MeshProperties = Partial<Pick<Mesh, PropertyKeys<Mesh>>>;
export type GreasedLineProperties = Partial<Pick<GreasedLineMesh, PropertyKeys<GreasedLineMesh>>>;
export type PlaneTextProperties = Partial<Pick<PlaneText, PropertyKeys<Mesh>>>;
export type GreasedLineParams = Parameters<typeof CreateGreasedLine>[1];
export type GreasedLineMaterial = Parameters<typeof CreateGreasedLine>[2];
export type LineProperties = Partial<Pick<LinesMesh, PropertyKeys<LinesMesh>>>;
export type PlaneParams = Parameters<typeof CreatePlane>[1];
export type LinesParams = Parameters<typeof CreateLineSystem>[1];
export type PlaneTextParams = Parameters<typeof createPlaneText>[1];

type AxesScales = { x: any } | { y: any } | { z: any };

export class AxesConfig{
    scale?: { x?: any; y?: any; z?: any };
    parent?: Node | Selection;
    domain?: boolean | { x?: boolean; y?: boolean; z?: boolean } = {x: true, y: true, z: true};
    domainOptions?: GreasedLineParams | {} = {};
    domainMaterialOptions?: GreasedLineMaterial = {};
    domainProperties?: GreasedLineProperties = {};
    background?: boolean | { x?: boolean; y?: boolean; z?: boolean } = {x: true, y: true, z: true};
    backgroundOptions?: PlaneParams | { x?: PlaneParams; y?: PlaneParams; z?: PlaneParams} | {} = {x: {}, y: {}, z: {}}; 
    backgroundProperties?: MeshProperties |  { x?: MeshProperties; y?: MeshProperties; z?: MeshProperties} | {} = {x: {}, y: {}, z: {}}; 
    backgroundPosition?: { x?: 0 | 1; y?: 0 | 1; z?: 0 | 1 } = {x: 0, y: 0, z: 0}; 
    grid?: boolean | { x?: boolean; y?: boolean; z?: boolean } = {x: true, y: true, z: true}; 
    gridOptions?: LinesParams | {} | {x?: LinesParams, y?: LinesParams, z?: LinesParams} = {x: {}, y: {}, z: {}}; 
    gridProperties?: LineProperties| {} | {x?: LineProperties, y?: LineProperties, z?: LineProperties} = {x: {}, y: {}, z: {}}; 
    gridTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]} = {x: undefined, y: undefined, z: undefined}; 
    label?: boolean | { x?: boolean; y?: boolean; z?: boolean } = {x: true, y: true, z: true}; 
    labelOptions?: PlaneTextParams | { x?: PlaneTextParams ; y?: PlaneTextParams; z?: PlaneTextParams} | {} = {x: {}, y: {}, z: {}}; 
    labelProperties?: PlaneTextProperties | { x?: PlaneTextProperties ; y?: PlaneTextProperties; z?: PlaneTextProperties} | {} = {x: {}, y: {}, z: {}}; 
    labelTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]} = {x: undefined, y: undefined, z: undefined}; 
    labelFormat?: { x?: (d: string)=> string; y?: (d: string)=> string; z?: (d: string)=> string} = {x: undefined, y: undefined, z: undefined}; 
    labelMargin?: {x?: number, y?: number, z?: number} = {x: 0.15, y: 0.15, z: 0.15};
    atlas?: Texture;

    constructor(scales: AxesScales) {
        this.scale = scales;
    }
}