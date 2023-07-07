import { TransformNode } from '@babylonjs/core';
export function func(method, params = {}) {
    let values = [];
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? values.push({ node: node, value: method(node, i) })
            : console.log('Node not a mesh, skipping.');
    });
    return values;
}
