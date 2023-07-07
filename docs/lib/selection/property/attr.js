import { TransformNode } from '@babylonjs/core';
import set from 'lodash-es/set';
import get from 'lodash-es/get';
/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", and the index "i".
 * @returns The modified selection
 */
export function attr(accessor, value) {
    let values = [];
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? get(node, accessor) != undefined
                ? set(node, accessor, value instanceof Function ? value(node.metadata.data, i) : value)
                : console.error(accessor + ' not a property of ' + node)
            : console.warn('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", and the index "i".
 * @returns The modified selection
 */
export function prop(accessor, value) {
    this.selected.forEach((node, i) => {
        node instanceof TransformNode
            ? get(node, accessor) != undefined
                ? set(node, accessor, value instanceof Function ? value(node.metadata.data, i) : value)
                : console.error(accessor + ' not a property of ' + node)
            : console.warn('Node not a mesh, skipping.');
    });
    return this;
}
export function props(properties) {
    this.selected.forEach((node, i) => {
        if (node instanceof TransformNode) {
            for (let accessor in properties) {
                get(node, accessor) != undefined
                    ? set(node, accessor, properties[accessor] instanceof Function
                        ? properties[accessor](node.metadata.data, i)
                        : properties[accessor])
                    : console.log(accessor + ' not property of ' + node);
            }
        }
        else {
            console.log('Node not a mesh, skipping.');
        }
    });
    return this;
}
