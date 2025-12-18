
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
export type PlaneTextProperties = Partial<Pick<PlaneText, PropertyKeys<PlaneText>>>;
export type GreasedLineParams = Parameters<typeof CreateGreasedLine>[1];
export type GreasedLineMaterial = Parameters<typeof CreateGreasedLine>[2];
export type LineProperties = Partial<Pick<LinesMesh, PropertyKeys<LinesMesh>>>;
export type PlaneParams = Parameters<typeof CreatePlane>[1];
export type LinesParams = Parameters<typeof CreateLineSystem>[1];
export type PlaneTextParams = Parameters<typeof createPlaneText>[1];

type AxesScales = { x: any } | { y: any } | { z: any };
/**
 * Configuration class for setting up axes in a 3D scene.
 */
export class AxesConfig {
    /**
     * The scale(s) of the axes you want to render. At least one is required.
     */
    scale?: { x?: any; y?: any; z?: any };

    /**
     * Selection that defines the parent node. If not set, a parent node will be created at the root of the scene graph.
     */
    parent?: Node | Selection;

    /**
     * Render the domain or not. Can be a boolean or an object specifying each axis.
     * @default {x: true, y: true, z: true}
     */
    domain?: boolean | { x?: boolean; y?: boolean; z?: boolean } = { x: true, y: true, z: true };

    /**
     * Initial options of the GreasedLine mesh.
     * @default {}
     */
    domainOptions?: GreasedLineParams | {} = {};

    /**
     * Initial options of the GreasedLine material.
     * @default {}
     */
    domainMaterialOptions?: GreasedLineMaterial = {};

    /**
     * Properties of the GreasedLine mesh.
     * @default {}
     */
    domainProperties?: GreasedLineProperties = {};

    /**
     * Render the background or not. Can be a boolean or an object specifying each axis.
     * @default {x: true, y: true, z: true}
     */
    background?: boolean | { x?: boolean; y?: boolean; z?: boolean } = { x: true, y: true, z: true };

    /**
     * Initial options for the background planes.
     * @default {x: {}, y: {}, z: {}}
     */
    backgroundOptions?: PlaneParams | { x?: PlaneParams; y?: PlaneParams; z?: PlaneParams } | {} = { x: {}, y: {}, z: {} };

    /**
     * Properties of the background planes.
     * @default {x: {}, y: {}, z: {}}
     */
    backgroundProperties?: MeshProperties | { x?: MeshProperties; y?: MeshProperties; z?: MeshProperties } | {} = { x: {}, y: {}, z: {} };

    /**
     * Position of the background planes.
     * @default {x: 0, y: 0, z: 0}
     */
    backgroundPosition?: { x?: 0 | 1; y?: 0 | 1; z?: 0 | 1 } = { x: 0, y: 0, z: 0 };

    /**
     * Render the grid lines or not. Can be a boolean or an object specifying each axis.
     * @default {x: true, y: true, z: true}
     */
    grid?: boolean | { x?: boolean; y?: boolean; z?: boolean } = { x: true, y: true, z: true };

    /**
     * Initial options of the LineSystem mesh.
     * @default {x: {}, y: {}, z: {}}
     */
    gridOptions?: LinesParams | {} | { x?: LinesParams; y?: LinesParams; z?: LinesParams } = { x: {}, y: {}, z: {} };

    /**
     * Properties of the LineSystem mesh.
     * @default {x: {}, y: {}, z: {}}
     */
    gridProperties?: LineProperties | {} | { x?: LineProperties; y?: LineProperties; z?: LineProperties } = { x: {}, y: {}, z: {} };

    /**
     * Array of values for ticks to be drawn.
     * @default {x: undefined, y: undefined, z: undefined}
     */
    gridTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[] } = { x: undefined, y: undefined, z: undefined };

    /**
     * Render the labels or not. Can be a boolean or an object specifying each axis.
     * @default {x: true, y: true, z: true}
     */
    label?: boolean | { x?: boolean; y?: boolean; z?: boolean } = { x: true, y: true, z: true };

    /**
     * Initial options of the PlaneText mesh.
     * @default {x: {}, y: {}, z: {}}
     */
    labelOptions?: PlaneTextParams | { x?: PlaneTextParams; y?: PlaneTextParams; z?: PlaneTextParams } | {} = { x: {}, y: {}, z: {} };

    /**
     * Properties of the PlaneText mesh.
     * @default {x: {}, y: {}, z: {}}
     */
    labelProperties?: PlaneTextProperties | { x?: PlaneTextProperties; y?: PlaneTextProperties; z?: PlaneTextProperties } | {} = { x: {}, y: {}, z: {} };

    /**
     * Array of values for ticks to be drawn.
     * @default {x: undefined, y: undefined, z: undefined}
     */
    labelTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[] } = { x: undefined, y: undefined, z: undefined };

    /**
     * A function that formats the label text.
     * @default {x: undefined, y: undefined, z: undefined}
     */
    labelFormat?: { x?: (d: string) => string; y?: (d: string) => string; z?: (d: string) => string } = { x: undefined, y: undefined, z: undefined };

    /**
     * Margin for the labels.
     * @default {x: 0.15, y: 0.15, z: 0.15}
     */
    labelMargin?: { x?: number; y?: number; z?: number } = { x: 0.15, y: 0.15, z: 0.15 };

    /**
     * Texture atlas for the labels.
     */
    atlas?: Texture;

    /**
     * Constructs an AxesConfig instance with the given scales.
     * @param scales - The scales for the axes.
     */
    constructor(scales: AxesScales) {
        this.scale = scales;
    }
}