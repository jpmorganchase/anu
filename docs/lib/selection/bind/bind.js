import { ActionManager, Tags } from '@babylonjs/core';
import { Selection } from '../index';
import { create } from '../../create';
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
export function bind(shape, options = {}, data = [{}]) {
    let meshes = [];
    this.selected.forEach((node) => {
        data.forEach((element, i) => {
            var mesh = create(shape, shape, this.scene, options, element);
            mesh.actionManager = new ActionManager(this.scene);
            Tags.EnableFor(mesh);
            mesh.parent = node;
            mesh.metadata = Object.assign(Object.assign({}, mesh.metadata), { data: element });
            //mesh.computeWorldMatrix(true)
            meshes.push(mesh);
        });
    });
    return new Selection(meshes, this.scene);
}
/**
 * Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
 * The data index of the mesh is also attached to the mesh node object under the metadate property.
 *
 * @param mesh The mesh to create instances from.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data.
 * @returns An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function bindInstance(mesh, data = [{}]) {
    let meshes = [];
    this.selected.forEach((node) => {
        data.forEach((element, i) => {
            var instance = mesh.createInstance(mesh.name + '_i');
            instance.actionManager = new ActionManager(this.scene);
            Tags.EnableFor(instance);
            instance.parent = node;
            instance.metadata = Object.assign(Object.assign({}, mesh.metadata), { data: element });
            meshes.push(instance);
        });
    });
    return new Selection(meshes, this.scene);
}
