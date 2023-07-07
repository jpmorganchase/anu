import { TransformNode } from '@babylonjs/core/Meshes';
import loGet from 'lodash-es/get';
export function get(accessor) {
    let values = [];
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? values.push({ node: node, value: loGet(node, accessor) })
            : console.log('Node not a mesh, skipping.');
    });
    return values;
}
