import { TransformNode } from '@babylonjs/core';
import { Selection } from '../index';
import set from 'lodash-es/set';
import get from 'lodash-es/get';
import hasIn from 'lodash-es/hasIn';

/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", and the index "i".
 * @returns The modified selection
 */
export function attr(this: Selection, accessor: string, value: any) {
  let values: Object[] = [];
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
export function prop(this: Selection, accessor: string, value: any) {
  this.selected.forEach((node, i) => {
    hasIn(node, accessor)  
      ? set(node, accessor, value instanceof Function ? value(node.metadata.data, node, i) : value)
      : console.error(accessor + ' not a property of ' + node)
  });
  return this;
}

export function props(this: Selection, properties: {}) {
  this.selected.forEach((node, i) => {
  for (let accessor in properties) {
    hasIn(node, accessor)  
      ? set(
          node,
          accessor,
          (properties as any )[accessor] instanceof Function
            ?  (properties as any )[accessor](node.metadata.data, node, i)
            :  (properties as any )[accessor],
        )
      : console.log(accessor + ' not property of ' + node);
  }
  });

  return this;
}
