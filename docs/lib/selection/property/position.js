import { TransformNode } from '@babylonjs/core';
/**
 * Sets the XYZ position on all nodes in the selection.
 *
 * @param value A instance of Vector3 or a function that returns a Vector3
 * @returns The modified selection
 */
export function position(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.position = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.warn('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the X position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function positionX(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.position.x = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.warn('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the Y position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function positionY(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.position.y = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.warn('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the Z position on all nodes in the selection.
 *
 * @param value A number or a function that returns a number.
 * @returns The modified selection
 */
export function positionZ(value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? (node.position.z = value instanceof Function ? value(node.metadata.data, i) : value)
            : console.warn('Node not a mesh, skipping.');
    });
    return this;
}
