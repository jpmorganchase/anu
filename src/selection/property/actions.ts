/**
 * TODO
 */
import { Action, AbstractMesh } from '@babylonjs/core';
import { Selection } from '../index';

export function action(this: Selection, action: Action | ((d: any) => Action)) {
  this.selected.forEach((node) => {
    node instanceof AbstractMesh
      ? action instanceof Function
        ? node.actionManager?.registerAction(action(node))
        : node.actionManager?.registerAction(action)
      : console.log('Node not a mesh, skipping.');
  });
  return this;
}
