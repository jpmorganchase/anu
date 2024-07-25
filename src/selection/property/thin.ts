import { Node, Mesh} from '@babylonjs/core';
import { Selection } from '../index';

export function thinInstanceSetBuffer(this: Selection, attribute: string, value: Float32Array | ((d: any, n: Node, i: number) => Float32Array)): Selection{

    this.selected.forEach((node, i) => {
        node instanceof Mesh
        ? node.hasThinInstances 
            ? node.thinInstanceSetBuffer(attribute, value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value)
            : console.warn(node + "has no thin instances, skipping")
        : console.warn(node + "Node is not a mesh, skipping");
    })

    return this;
}

