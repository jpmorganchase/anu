import { TransformNode } from '@babylonjs/core';
/**
 * Sets the XYZ scaling on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export function scaling(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.scaling = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the X scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function scalingX(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.scaling.x = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the Y scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function scalingY(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.scaling.y = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the Z scaling on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function scalingZ(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.scaling.z = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
