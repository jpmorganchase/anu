// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node } from '@babylonjs/core';
import { Selection } from '../index';
import hasIn from 'lodash-es/hasIn';
import set from 'lodash-es/set';

/**
 * Sets the Name on all nodes in the selection.
 *
 * @param name A string or a function that returns a string
 * @returns The modified selection
 */
export function name(this: Selection, name: string | ((d: any, n: Node, i: number) => string)) {
  this.prop('name', name);
  return this;
}

/**
 * Sets the id on all nodes in the selection.
 *
 * @param id A string or a function that returns a string
 * @returns The modified selection
 */
export function id(this: Selection, id: string | ((d: any, n: Node, i: number) => string)) {
  this.prop('id', id);
  return this;
}

/**
 * Adds to the metadata on all nodes in the selection.
 *
 * @param key A string to be the key for your object inside node.metadata
 * @param value An object or a function that returns an object
 * @returns The modified selection
 */
export function metadata(this: Selection, key: string, value: {} | ((d: any, n: Node, i: number) => {})) {
  this.selected.forEach((node, i) => {
    hasIn(node, 'metadata')
      ? set(
          node,
          'metadata',
          value instanceof Function
            ? { ...node.metadata, [key]: value(node.metadata?.data, node, i) }
            : { ...node.metadata, [key]: value },
        )
      : console.error('metadata not a property of ' + node);
  });
  return this;
}
