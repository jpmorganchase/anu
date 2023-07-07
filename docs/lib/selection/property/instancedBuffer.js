import { Mesh, InstancedMesh } from '@babylonjs/core';
export function registerInstancedBuffer(attr, size) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh ? node.registerInstancedBuffer(attr, size) : console.log('Node not a mesh skipping');
    });
    return this;
}
export function setInstancedBuffer(attr, value) {
    this.selected.forEach((node, i) => {
        node instanceof InstancedMesh
            ? (node.instancedBuffers[attr] = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
