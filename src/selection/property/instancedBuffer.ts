import { Mesh, InstancedMesh } from '@babylonjs/core';
import { Selection } from '../index';

export function registerInstancedBuffer(this: Selection, attr: string, size: number) {
  this.selected.forEach((node, i) => {
    node instanceof Mesh ? node.registerInstancedBuffer(attr, size) : console.log('Node not a mesh skipping');
  });
  return this;
}

export function setInstancedBuffer(this: Selection, attr: string, value: any) {
  this.selected.forEach((node, i) => {
    node instanceof InstancedMesh
      ? (node.instancedBuffers[attr] = value instanceof Function ? value(node.metadata.data, i) : value)
      : console.log('Node not a mesh, skipping.');
  });
  return this;
}
