import { Node, Mesh, Matrix, Vector3, Quaternion, Color4} from '@babylonjs/core';
import { Selection } from '../index';

export function thinInstanceSetBuffer(this: Selection, attribute: string, value: Float32Array | ((d: any, n: Node, i: number) => Float32Array), stride?: number, staticBuffer?: boolean): Selection{

    this.selected.forEach((node, i) => {
        node instanceof Mesh
        ? node.hasThinInstances 
            ? node.thinInstanceSetBuffer(attribute, value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value, stride, staticBuffer)
            : console.warn(node + "has no thin instances, skipping")
        : console.warn(node + "Node is not a mesh, skipping");
    })

    return this;
}

export function thinInstancePosition(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)): Selection{

    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.hasThinInstances){
            let bufferMatricies = new Float32Array(node.thinInstanceCount * 16);
            let matricies = node.thinInstanceGetWorldMatrices();
            if (value instanceof Function){
                let data = node.metadata.data ??= {};
                data.forEach((e, j) => {
                let evaluated = value(e,node,j)
                let matrix = Matrix.Translation(evaluated.x, evaluated.y, evaluated.z).multiply(matricies[j])
                matrix.copyToArray(bufferMatricies, j * 16);
                });
            } else {
                for (let k = 0; k < node.thinInstanceCount; k++){
                    let matrix = Matrix.Scaling(value.x, value.y, value.z).multiply(matricies[k])
                    matrix.copyToArray(bufferMatricies, k * 16);
                }
            }
            node.thinInstanceSetBuffer("matrix", bufferMatricies, 16)
        } else {
            console.warn(node + "Node is not a mesh or has no thin instances, skipping");
        }
    })

    return this;
}

export function thinInstanceScaling(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)): Selection{

    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.hasThinInstances){
            let bufferMatricies = new Float32Array(node.thinInstanceCount * 16);
            let matricies = node.thinInstanceGetWorldMatrices();
            if (value instanceof Function){
                let data = node.metadata.data ??= {};
                data.forEach((e, j) => {
                let evaluated = value(e,node,j)
                let matrix = Matrix.Scaling(evaluated.x, evaluated.y, evaluated.z).multiply(matricies[j])
                matrix.copyToArray(bufferMatricies, j * 16);
                });
            } else {
                for (let k = 0; k < node.thinInstanceCount; k++){
                    let matrix = Matrix.Scaling(value.x, value.y, value.z).multiply(matricies[k])
                    matrix.copyToArray(bufferMatricies, k * 16);
                }
            }
            node.thinInstanceSetBuffer("matrix", bufferMatricies, 16)
        } else {
            console.warn(node + "Node is not a mesh or has no thin instances, skipping");
        }
    })

    return this;
}

export function thinInstanceRotation(this: Selection, value: Vector3 | ((d: any, n: Node, i: number) => Vector3)): Selection{

    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.hasThinInstances){
            let bufferMatricies = new Float32Array(node.thinInstanceCount * 16);
            let matricies = node.thinInstanceGetWorldMatrices();
            if (value instanceof Function){
                let data = node.metadata.data ??= {};
                data.forEach((e, j) => {
                let evaluated = value(e,node,j)
                let matrix = Matrix.RotationX(evaluated.x).multiply(matricies[j])
                        matrix = Matrix.RotationY(evaluated.y).multiply(matrix)
                        matrix = Matrix.RotationZ(evaluated.z).multiply(matrix)
                matrix.copyToArray(bufferMatricies, j * 16);
                });
            } else {
                for (let k = 0; k < node.thinInstanceCount; k++){
                    let matrix = Matrix.RotationX(value.x).multiply(matricies[k])
                        matrix = Matrix.RotationY(value.y).multiply(matrix)
                        matrix = Matrix.RotationZ(value.z).multiply(matrix)
                    matrix.copyToArray(bufferMatricies, k * 16);
                }
            }
            node.thinInstanceSetBuffer("matrix", bufferMatricies, 16)
        } else {
            console.warn(node + "Node is not a mesh or has no thin instances, skipping");
        }
    })

    return this;
}

export function thinInstanceColor(this: Selection, value: Color4 | ((d: any, n: Node, i: number) => Color4)): Selection{

    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.hasThinInstances){
            let colorMatricies = new Float32Array(node.thinInstanceCount * 4);
            let matricies = node.thinInstanceGetWorldMatrices();
            if (value instanceof Function){
                let data = node.metadata.data ??= {};
                data.forEach((e, j) => {
                let evaluated = value(e,node,j)
                colorMatricies[j * 4 + 0] = evaluated.r
                colorMatricies[j * 4 + 1] = evaluated.g
                colorMatricies[j * 4 + 2] = evaluated.b
                colorMatricies[j * 4 + 3] = evaluated.a;
                
                });
            } else {
                for (let k = 0; k < node.thinInstanceCount; k++){
                    colorMatricies[k * 4 + 0] = value.r
                    colorMatricies[k * 4 + 1] = value.g
                    colorMatricies[k * 4 + 2] = value.b
                    colorMatricies[k * 4 + 3] = value.a;
                }
            }
            node.thinInstanceSetBuffer("color", colorMatricies, 4)
        } else {
            console.warn(node + "Node is not a mesh or has no thin instances, skipping");
        }
    })

    return this;
}

export function thinInstanceRegisterAttribute(this: Selection, attribute: string, value: any | ((d: any, n: Node, i: number) => any)): Selection{

    this.selected.forEach((node, i) => {
        node instanceof Mesh
        ? node.hasThinInstances 
            ? node.thinInstanceRegisterAttribute(attribute, value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value)
            : console.warn(node + "has no thin instances, skipping")
        : console.warn(node + "Node is not a mesh, skipping");
    })

    return this;
}

export function thinInstanceSetAttribute(this: Selection, attribute: string, value: any | ((d: any, n: Node, i: number) => any)): Selection{

    this.selected.forEach((node, i) => {
        node instanceof Mesh
        ? node.hasThinInstances 
            ? (node.metadata.data ??= {}).forEach((d,i) => {
                node.thinInstanceSetAttributeAt(attribute, i, value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value)
            })
            : console.warn(node + "has no thin instances, skipping")
        : console.warn(node + "Node is not a mesh, skipping");
    })

    return this;
}

export function thinInstanceSetAttributeAt(this: Selection, attribute: string, index: number, value: any | ((d: any, n: Node, i: number) => any)): Selection{

    this.selected.forEach((node, i) => {
        node instanceof Mesh
        ? node.hasThinInstances 
            ?  node.thinInstanceSetAttributeAt(attribute, index, value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value)
            : console.warn(node + "has no thin instances, skipping")
        : console.warn(node + "Node is not a mesh, skipping");
    })

    return this;
}

export function thinInstanceSetMatrixAt(this: Selection, index: number, value: Matrix | ((d: any, n: Node, i: number) => Matrix)): Selection{

    this.selected.forEach((node, i) => {
        node instanceof Mesh
        ? node.hasThinInstances 
            ?  node.thinInstanceSetMatrixAt(index, value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value)
            : console.warn(node + "has no thin instances, skipping")
        : console.warn(node + "Node is not a mesh, skipping");
    })

    return this;
}

