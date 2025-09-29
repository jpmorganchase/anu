// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node, ActionManager, Tags, Mesh, InstancedMesh, Matrix } from '@babylonjs/core';
import { Selection, createSelection, DynamicSelection } from '../index';
import { create, MeshTypes } from '../../create';

type Property<T, MeshType extends keyof T> = T[MeshType];

/**
 * Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parent.
 * The data index of the mesh is also attached to the mesh node object under the metadata property.
 *
 * @param shape A string of the type of the mesh geometry being created.
 * @param options A object containing the initial mesh parameters for the selected geometry, can be either values or functions.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. By default, the parents data will be passed to the newly created child mesh. This can be overridden with either a function (d, n, i) => [] or a static list []
 * @returns An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function bind<MeshType extends keyof MeshTypes>(
  this: Selection,
  shape: MeshType,
  options: Property<MeshTypes, MeshType> = {},
  data: Array<any> | ((d: any, n: Node, i: number) => Array<any>) = (d) => [d],
): DynamicSelection {
  let meshes: Node[] = [];
  this.selected.forEach((node, nodeIndex) => {
    const dataArray = typeof data === 'function' ? data(node?.metadata?.data ?? 0, node, nodeIndex) : data;
    dataArray.forEach((element, i) => {
      var mesh = create(shape, shape, options, element, this.scene);
      mesh.parent = node;
      meshes.push(mesh as Mesh);
    });
  });

  return createSelection(meshes, this.scene);
}


/**
 * Take a selection, a mesh, and data. For each index in the data create a new mesh for each node in the selection as the parent.
 * The data index of the mesh is also attached to the mesh node object under the metadata property.
 *
 * @param mesh The mesh to create instances from.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. By default, the parents data will be passed to the newly created child mesh. This can be overridden with either a function (d, n, i) => [] or a static list []
 * @returns An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function bindClone(this: Selection, 
    mesh: Mesh, 
    data: Array<any> | ((d: any, n: Node, i: number) => Array<any>) = (d) => [d]
  ): DynamicSelection {
  let meshes: Node[] = [];
  this.selected.forEach((node, nodeIndex) => {
    const dataArray = typeof data === 'function' ? data(node?.metadata?.data ?? 0, node, nodeIndex) : data;
    dataArray.forEach((element, i) => {
      var clone = mesh.clone(mesh.name + '_' + i);
      if (clone instanceof Mesh) clone.actionManager = new ActionManager(this.scene);
      Tags.EnableFor(clone);
      clone.parent = node;
      clone.metadata = { ...mesh.metadata, data: element };
      meshes.push(clone);
    });
  });

  return createSelection(meshes, this.scene);
}


/**
 * Take a selection, a mesh, and data. For each index in the data create a new mesh for each node in the selection as the parent.
 * The data index of the mesh is also attached to the mesh node object under the metadata property.
 *
 * @param mesh The mesh to create instances from.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. By default, the parents data will be passed to the newly created child mesh. This can be overridden with either a function (d, n, i) => [] or a static list []
 * @returns An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function bindInstance(this: Selection, 
    mesh: Mesh,
    data: Array<any> | ((d: any, n: Node, i: number) => Array<any>) = (d) => [d]
  ): DynamicSelection {
  let meshes: Node[] = [];
  this.selected.forEach((node, nodeIndex) => {
    const dataArray = typeof data === 'function' ? data(node?.metadata?.data ?? 0, node, nodeIndex) : data;
    dataArray.forEach((element, i) => {
      var instance = mesh.createInstance(mesh.name + '_' + i);
      if (mesh instanceof InstancedMesh) mesh.actionManager = new ActionManager(this.scene);
      Tags.EnableFor(instance);
      instance.parent = node;
      instance.metadata = { ...mesh.metadata, data: element };
      meshes.push(instance as InstancedMesh);
    });
  });

  return createSelection(meshes, this.scene);
}

/**
 * Take a selection, a mesh, and data. For each index in the data create a new mesh for each node in the selection as the parent.
 * The data index of the mesh is also attached to the mesh node object under the metadata property.
 *
 * @param mesh The mesh to create instances from.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. By default, the parents data will be passed to the newly created child mesh. This can be overridden with either a function (d, n, i) => [] or a static list []
 * @returns An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function bindThinInstance(this: Selection, 
    mesh: Mesh, 
    data: Array<any> | ((d: any, n: Node, i: number) => Array<any>) = (d) => [d]
  ): DynamicSelection {
  let meshes: Node[] = [];
  this.selected.forEach((node, i) => {
    const dataArray = typeof data === 'function' ? data(node?.metadata?.data ?? 0, node, i) : data;
    console.log("dataArray", dataArray)
    let instance = mesh.clone(mesh.name + '_' + i, node);
    instance.metadata = { ...instance.metadata, data: dataArray };
    let matrices = new Float32Array(16 * data.length * 3);
    dataArray.forEach((element, i) => {
      let matrix = Matrix.Identity();
      matrix.copyToArray(matrices, i * 16);
    });
    instance.thinInstanceSetBuffer('matrix', matrices, 16, false);
    meshes.push(instance);
  });
  return createSelection(meshes, this.scene);
}
