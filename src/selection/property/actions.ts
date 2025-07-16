// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Action, AbstractMesh } from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Attaches a Babylon action to each node in the selection
 * 
 * @param action A Babylon action 
 * @returns The chained selection
 */
export function action(this: Selection, action: Action | ((d: any, n: AbstractMesh, i: number) => Action)) {
  this.selected.forEach((node, i) => {
    node instanceof AbstractMesh
      ? action instanceof Function
        ? node.actionManager?.registerAction(action((node.metadata.data ?? {}), node, i))
        : node.actionManager?.registerAction(action)
      : console.log('Node not a mesh, skipping.');
  });
  return this;
}
