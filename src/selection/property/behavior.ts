import { Behavior, Node} from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Attaches a Babylon behavior to each node in the selection
 * 
 * @param behavior A Babylon behavior 
 * @returns The chained selection
 */
export function behavior(this: Selection, behavior: Behavior<Node> | ((d: any, n: Node, i: number) => Behavior<Node> )) {
  this.selected.forEach((node, i) => {
    node instanceof Node
      ? behavior instanceof Function
        ? node?.addBehavior(behavior(node.metadata.data ??= {}, node, i))
        : node?.addBehavior(behavior)
      : console.log('Node not a mesh, skipping.');
  });
  return this;
}