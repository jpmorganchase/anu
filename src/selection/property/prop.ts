// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { TransformNode } from '@babylonjs/core';
import { Selection } from '../index';
import { createTransition, createTransitions } from '../animation/transition';
import { evaluatePropertyPath, callOrSetPropertyPath } from '../../utils/objects';

/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returning the value for said property with scope of the binded data "d", mesh "m", and the index "i".
 * @returns The modified selection
 * @deprecated Use `prop` instead. The `attr` function will be removed in future versions.
 */
export function attr(this: Selection, accessor: string, value: PropValue) {
  this.selected.forEach((node, i) => {
    if (node instanceof TransformNode) {
      if (evaluatePropertyPath(node, accessor) !== undefined) {
        if (!callOrSetPropertyPath(node, accessor, value, i)) {
          console.error(accessor + ' not a property of ' + node);
        }
      } else {
        console.error(accessor + ' not a property of ' + node);
      }
    } else {
      console.warn('Node not a mesh, skipping.');
    }
  });
  return this;
}

/**
 * Value type for prop function - can be:
 * - A direct value to set
 * - An array of arguments (for method calls)
 * - A function returning the value or arguments
 */
export type PropValue<T = any> = 
  | T 
  | T[] 
  | ((data: any, node: any, index: number) => T)
  | ((data: any, node: any, index: number) => T[]);

/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 * Can also call methods by passing arguments as an array: prop('rotate', [axis, angle, space])
 *
 * @param accessor The name of the property or method to be set/called (e.g. "renderingGroupId", "material.alpha", "rotate").
 * @param value The value to set the property, an array of arguments for methods, or a function(d, node, i) returning the value/arguments.
 * @returns The modified selection
 */
export function prop(this: Selection, accessor: string, value: PropValue) {
  if (this.transitions.length > 0) {
    createTransition(this, accessor, value);
  } else {
    this.selected.forEach((node, i) => {
      if (!callOrSetPropertyPath(node, accessor, value, i)) {
        console.error(accessor + ' not a property of ' + node);
      }
    });
    return this;
  }
}

/**
 * Properties object type for props function - maps property names to their values
 */
export type PropsObject = {
  [accessor: string]: PropValue;
};

/**
 * Called from a selection this method allows you to set multiple properties or subproperties of nodes in the selection given that property exists.
 * Use this method to improve performance when setting or changing many properties.
 *
 * @param properties Object of key value pairs for the properties to be set or changed, e.g., \{\"renderingGroupId": 2, "material.alpha": 0.2\}.
 * @returns The modified selection
 */
export function props(this: Selection, properties: PropsObject) {
  
  if (this.transitions.length > 0) {
    createTransitions(this, properties);
  } else {
    this.selected.forEach((node, i) => {
      for (let accessor in properties) {
        if (!callOrSetPropertyPath(node, accessor, (properties as any)[accessor], i)) {
          console.warn(accessor + ' not property of ' + node);
        }
      }
    });
  }

  return this;
}
