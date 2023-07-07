import { Mesh } from '@babylonjs/core';
import { Selection } from '../index';
/**
 * Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
 * The data index of the mesh is also attached to the mesh node object under the metadate property.
 *
 * @param shape A string of the type of the mesh geometry being created.
 * @param options A object contantaing the intial mesh parameters for the selected geometry, can be either values or functions.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data.
 * @returns An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export declare function bind(this: Selection, shape: string, options?: object, data?: Array<object>): Selection;
/**
 * Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
 * The data index of the mesh is also attached to the mesh node object under the metadate property.
 *
 * @param mesh The mesh to create instances from.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data.
 * @returns An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export declare function bindInstance(this: Selection, mesh: Mesh, data?: Array<object>): Selection;
