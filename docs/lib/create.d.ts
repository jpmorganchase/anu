import { Mesh } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
/**
 * Helper function to build meshes of a specified type with options optionally set with functions and data.
 *
 * @param shape The name of the mesh type you want to create.
 * @param name The string that will be used as the inital mesh ID and name.
 * @param options An object containg the mesh parametetrs as either absolutle values or functions.
 * @param data An object containg the data that may be used to execute any functions passed in options.
 * @param scene The scene to create the mesh in.
 * @returns A mesh object created with the passed parameters.
 */
export declare function create(shape: string, name: string, scene: Scene, options?: object, data?: object): Mesh;
