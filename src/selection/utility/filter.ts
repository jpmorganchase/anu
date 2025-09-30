// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node } from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Filters a seclection based on the function provided
 *
 * @param method A function with two parameters d (the binded data) and i (the index) that returns a boolean.
 * @returns The modified selection
 */
export function filter(this: Selection, method: (d: any, n: Node, i: number) => boolean): Selection {
  let filtered: Node[] = [];
  this.selected.forEach((node, i) => {
    if (method((node.metadata?.data ?? {}), node, i)) filtered.push(node);
  });

  return new Selection(filtered, this.scene);
}
