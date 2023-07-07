import { TransformNode } from '@babylonjs/core';
/**
 * Sets the XYZ rotation in raidians on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export function rotation(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.rotation = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the X rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function rotationX(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.rotation.x = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the Y rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function rotationY(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.rotation.y = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the Z rotation in radians on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function rotationZ(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.rotation.z = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
