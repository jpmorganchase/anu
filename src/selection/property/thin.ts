import { Node, Mesh, Matrix, Vector3, Quaternion} from '@babylonjs/core';
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

export function thinInstancePosition(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)): Selection{

    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.hasThinInstances){
            let bufferMatrices = new Float32Array(node.thinInstanceCount * 16 * 3);
            let matricies = node.thinInstanceGetWorldMatrices();
            if (value instanceof Function){
                let data = node.metadata.data ??= {};
                data.forEach((e, j) => {
                let evaluated = value(e,node,j)
                let matrix = Matrix.Translation(evaluated.x, evaluated.y, evaluated.z).multiply(matricies[j])
                matrix.copyToArray(bufferMatrices, j * 16);
                });
            } else {
                for (let k = 0; k < node.thinInstanceCount; k++){
                    let matrix = Matrix.Scaling(value.x, value.y, value.z).multiply(matricies[k])
                    matrix.copyToArray(bufferMatrices, k * 16);
                }
            }
            node.thinInstanceSetBuffer("matrix", bufferMatrices)
        } else {
            console.warn(node + "Node is not a mesh or has no thin instances, skipping");
        }
    })

    return this;
}

export function thinInstanceScaling(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)): Selection{

    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.hasThinInstances){
            let bufferMatrices = new Float32Array(node.thinInstanceCount * 16 * 3);
            let matricies = node.thinInstanceGetWorldMatrices();
            if (value instanceof Function){
                let data = node.metadata.data ??= {};
                data.forEach((e, j) => {
                let evaluated = value(e,node,j)
                let matrix = Matrix.Scaling(evaluated.x, evaluated.y, evaluated.z).multiply(matricies[j])
                matrix.copyToArray(bufferMatrices, j * 16);
                });
            } else {
                for (let k = 0; k < node.thinInstanceCount; k++){
                    let matrix = Matrix.Scaling(value.x, value.y, value.z).multiply(matricies[k])
                    matrix.copyToArray(bufferMatrices, k * 16);
                }
            }
            node.thinInstanceSetBuffer("matrix", bufferMatrices)
        } else {
            console.warn(node + "Node is not a mesh or has no thin instances, skipping");
        }
    })

    return this;
}

export function thinInstanceRotation(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)): Selection{

    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.hasThinInstances){
            let bufferMatrices = new Float32Array(node.thinInstanceCount * 16 * 3);
            let matricies = node.thinInstanceGetWorldMatrices();
            if (value instanceof Function){
                let data = node.metadata.data ??= {};
                data.forEach((e, j) => {
                let evaluated = value(e,node,j)
                let matrix = Matrix.RotationX(evaluated.x).multiply(matricies[j])
                        matrix = Matrix.RotationY(evaluated.y).multiply(matrix)
                        matrix = Matrix.RotationZ(evaluated.z).multiply(matrix)
                matrix.copyToArray(bufferMatrices, j * 16);
                });
            } else {
                for (let k = 0; k < node.thinInstanceCount; k++){
                    let matrix = Matrix.RotationX(value.x).multiply(matricies[k])
                        matrix = Matrix.RotationY(value.y).multiply(matrix)
                        matrix = Matrix.RotationZ(value.z).multiply(matrix)
                    matrix.copyToArray(bufferMatrices, k * 16);
                }
            }
            node.thinInstanceSetBuffer("matrix", bufferMatrices)
        } else {
            console.warn(node + "Node is not a mesh or has no thin instances, skipping");
        }
    })

    return this;
}