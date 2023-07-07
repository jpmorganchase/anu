import {Mesh, Node, TransformNode} from '@babylonjs/core';
import { Selection } from '../index';

export function run(this: Selection, method: (mesh: Mesh, d: any, i: number) => any) {
  let values: Object[] = [];
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? method(node, node.metadata.data, i)
      : console.error('not a mesh, skipping')
  });
  return this;
}
