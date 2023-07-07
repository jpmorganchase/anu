import { TransformNode } from '@babylonjs/core';
export function translate(value, distance, space) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? node.translate(value instanceof Function ? value(node.metadata.data, i) : value, distance instanceof Function ? distance(node.metadata.data, i) : distance, space)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
