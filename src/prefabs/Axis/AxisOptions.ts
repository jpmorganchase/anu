
import { Texture, TransformNode, Node, CreateGreasedLine, CreatePlane, Mesh, GreasedLineMesh, CreateLineSystem, LinesMesh, AbstractMesh} from '@babylonjs/core';
import { Selection } from '../../selection';
import { createPlaneText } from '../Text/planeText';

export type AxesBools = {x?: boolean, y?: boolean, z?: boolean};

export type AxesOptionsInterface = {
    xScale?: any;
    yScale?: any;
    zScale?: any;
    scale?: { x?: any; y?: any; z?: any };
    parent?: Node;
    domain?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    domainOptions?: GreasedLineParams | {};
    domainMaterialOptions?: GreasedLineMaterial;
    domainProperties?: GreasedLineProperties;
    background?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    backgroundOptions?: PlaneParams | { x?: PlaneParams; y?: PlaneParams; z?: PlaneParams}; 
    backgroundProperties?: MeshProperties |  { x?: MeshProperties; y?: MeshProperties; z?: MeshProperties};
    backgroundPosition?: { x?: 0 | 1; y?: 0 | 1; z?: 0 | 1 };
    grid?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    gridOptions?: LinesParams | {} | {x?: LinesParams, y?: LinesParams, z?: LinesParams};
    gridProperties?: LineProperties| {} | {x?: LineProperties, y?: LineProperties, z?: LineProperties};
    gridTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]};
    label?: boolean | { x?: boolean; y?: boolean; z?: boolean };
    labelOptions?: PlaneTextParams | { x?: PlaneTextParams ; y?: PlaneTextParams; z?: PlaneTextParams} | {};
    labelProperties?: MeshProperties;
    labelTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]};
    labelFormat?: { x?: (d: string)=> string; y?: (d: string)=> string; z?: (d: string)=> string};
    atlas?: Texture;
  }

type PropertyKeys<T> = {
    [K in keyof T]: T[K]extends Function ? never : K;
}[keyof T];

export type MeshProperties = Partial<Pick<Mesh, PropertyKeys<Mesh>>>;
export type GreasedLineProperties = Partial<Pick<GreasedLineMesh, PropertyKeys<GreasedLineMesh>>>;
export type GreasedLineParams = Parameters<typeof CreateGreasedLine>[1];
export type GreasedLineMaterial = Parameters<typeof CreateGreasedLine>[2];
export type LineProperties = Partial<Pick<LinesMesh, PropertyKeys<LinesMesh>>>;
export type PlaneParams = Parameters<typeof CreatePlane>[1];
export type LinesParams = Parameters<typeof CreateLineSystem>[1];
export type PlaneTextParams = Parameters<typeof createPlaneText>[1];


/**
 * Represents the configuration options for axes in a visualization.
 *
 * @property {Node | Selection} [parent] - The parent node or selection to which the axes will be appended.
 * It can be a DOM Node or a D3 Selection.
 *
 * @property {any} [xScale=2] - The scale for the x-axis. Default is set to 2.
 * This can be any scale object, such as a D3 scale.
 *
 * @property {any} [yScale] - The scale for the y-axis.
 * This can be any scale object, such as a D3 scale.
 *
 * @property {any} [zScale] - The scale for the z-axis.
 * This can be any scale object, such as a D3 scale.
 *
 * @property {{ x?: any; y?: any; z?: any }} [scale] - An object containing scale configurations for x, y, and z axes.
 * Each property can be any scale object.
 *
 * @property {boolean} [domain] - A boolean indicating whether to display the domain line.
 *
 * @property {any} [domainOptions] - Options for configuring the domain line.
 * This can include styling and other properties.
 *
 * @property {any} [domainMaterialOptions] - Options for configuring the material of the domain line.
 *
 * @property {boolean} [background] - A boolean indicating whether to display the background.
 *
 * @property {{}} [backgroundOptions] - Options for configuring the background.
 * This can include styling and other properties.
 *
 * @property {{}} [backgroundProperties] - Properties for configuring the background.
 *
 * @property {boolean} [grid] - A boolean indicating whether to display the grid.
 *
 * @property {any} [gridOptions] - Options for configuring the grid.
 * This can include styling and other properties.
 *
 * @property {any} [gridProperties] - Properties for configuring the grid.
 *
 * @property {{ x?: any; y?: any; z?: any }} [gridTicks] - An object specifying the number of ticks for the grid on each axis.
 *
 * @property {boolean} [label] - A boolean indicating whether to display labels on the axes.
 *
 * @property {any} [labelOptions] - Options for configuring the labels.
 * This can include styling and other properties.
 *
 * @property {any} [labelProperties] - Properties for configuring the labels.
 *
 * @property {{ x?: any; y?: any; z?: any }} [labelTicks] - An object specifying the number of ticks for the labels on each axis.
 *
 * @property {{ x?: any; y?: any; z?: any }} [labelFormat] - An object specifying the format for the labels on each axis.
 *
 * @property {Texture} [atlas] - A texture atlas used for rendering.
 */
export class AxesOptions{
    name?: string = "anu-axes"
    parent?: Node | Selection = undefined;
    domain?: boolean | { x?: boolean; y?: boolean; z?: boolean } = true;
    domainOptions?: GreasedLineParams;
    domainMaterialOptions?: GreasedLineMaterial;
    domainProperties?: GreasedLineProperties;
    background?: boolean | { x?: boolean; y?: boolean; z?: boolean } = true;
    backgroundOptions?: PlaneParams | { x?: PlaneParams; y?: PlaneParams; z?: PlaneParams}; 
    backgroundProperties?: MeshProperties |  { x?: MeshProperties; y?: MeshProperties; z?: MeshProperties};
    grid?: boolean | { x?: boolean; y?: boolean; z?: boolean } = true;
    gridOptions?: LinesParams;
    gridProperties?: LineProperties;
    gridTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]};
    label?: boolean | { x?: boolean; y?: boolean; z?: boolean } = true;
    labelOptions?: PlaneTextParams | { x?: PlaneTextParams ; y?: PlaneTextParams; z?: PlaneTextParams};
    labelProperties?: MeshProperties;
    labelTicks?: { x?: (string | number)[]; y?: (string | number)[]; z?: (string | number)[]};
    labelFormat?: { x?: (d: string)=> string; y?: (d: string)=> string; z?: (d: string)=> string};
    atlas?: Texture; // dont think this is needed?

    constructor() {

    }
}