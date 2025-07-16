import { Node, Mesh, Matrix, Vector3, Quaternion, Color4 } from '@babylonjs/core';
import { Selection } from '../index';

export function thinInstanceSetBuffer(
  this: Selection,
  attribute: string,
  value: Float32Array | ((d: any, n: Node, i: number) => Float32Array),
  stride?: number,
  staticBuffer: boolean = false,
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? node.thinInstanceSetBuffer(
            attribute,
            value instanceof Function ? value((node.metadata.data ?? {}), node, i) : value,
            stride,
            staticBuffer,
          )
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstancePosition(
  this: Selection,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
  staticBuffer: boolean = false,
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (() => {
            let bufferMatrices = new Float32Array(node.thinInstanceCount * 16);
            let matrices = node.thinInstanceGetWorldMatrices();
            let data = (node.metadata.data ?? {});
            data.forEach((e, j) => {
              let evaluated = value instanceof Function ? value(e, node, j) : value;
              let matrix = matrices[j].setTranslation(evaluated);
              matrix.copyToArray(bufferMatrices, j * 16);
            });
            node.thinInstanceSetBuffer('matrix', bufferMatrices, 16, staticBuffer);
          })()
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceScaling(
  this: Selection,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
  staticBuffer: boolean = false,
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (() => {
            let bufferMatrices = new Float32Array(node.thinInstanceCount * 16);
            let matrices = node.thinInstanceGetWorldMatrices();
            let data = (node.metadata.data ?? {});
            data.forEach((e, j) => {
              let evaluated = value instanceof Function ? value(e, node, j) : value;
              let previousMatrix = matrices[j];
              let matrix = Matrix.ComposeToRef(
                evaluated,
                Quaternion.FromRotationMatrix(previousMatrix.getRotationMatrix()),
                previousMatrix.getTranslation(),
                previousMatrix,
              );
              matrix.copyToArray(bufferMatrices, j * 16);
            });
            node.thinInstanceSetBuffer('matrix', bufferMatrices, 16, staticBuffer);
          })()
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceRotation(
  this: Selection,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
  staticBuffer: boolean = false,
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (() => {
            let bufferMatrices = new Float32Array(node.thinInstanceCount * 16);
            let matrices = node.thinInstanceGetWorldMatrices();
            let data = (node.metadata.data ?? {});
            data.forEach((e, j) => {
              let evaluated = value instanceof Function ? value(e, node, j) : value;
              let previousMatrix = matrices[j];
              let previousScale = new Vector3();
              previousMatrix.decompose(previousScale);
              let matrix = Matrix.ComposeToRef(
                previousScale,
                Quaternion.FromEulerVector(evaluated),
                previousMatrix.getTranslation(),
                previousMatrix,
              );
              matrix.copyToArray(bufferMatrices, j * 16);
            });
            node.thinInstanceSetBuffer('matrix', bufferMatrices, 16, staticBuffer);
          })()
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceColor(
  this: Selection,
  value: Color4 | ((d: any, n: Node, i: number) => Color4),
  staticBuffer: boolean = false,
): Selection {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.hasThinInstances) {
      let colorMatrices = new Float32Array(node.thinInstanceCount * 4);
      if (value instanceof Function) {
        let data = (node.metadata.data ?? {});
        data.forEach((e, j) => {
          let evaluated = value(e, node, j);
          colorMatrices[j * 4 + 0] = evaluated.r;
          colorMatrices[j * 4 + 1] = evaluated.g;
          colorMatrices[j * 4 + 2] = evaluated.b;
          colorMatrices[j * 4 + 3] = evaluated.a;
        });
      } else {
        for (let k = 0; k < node.thinInstanceCount; k++) {
          colorMatrices[k * 4 + 0] = value.r;
          colorMatrices[k * 4 + 1] = value.g;
          colorMatrices[k * 4 + 2] = value.b;
          colorMatrices[k * 4 + 3] = value.a;
        }
      }
      node.thinInstanceSetBuffer('color', colorMatrices, 4, staticBuffer);
    } else {
      console.warn(node + 'Node is not a mesh or has no thin instances, skipping');
    }
  });

  return this;
}

export function thinInstanceRegisterAttribute(this: Selection, attribute: string, stride: number): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? node.thinInstanceRegisterAttribute(attribute, stride)
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceSetAttribute(
  this: Selection,
  attribute: string,
  value: any | ((d: any, n: Node, i: number) => any),
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (node.metadata.data ?? {}).forEach((d, k) => {
            node.thinInstanceSetAttributeAt(
              attribute,
              k,
              value instanceof Function ? value((node.metadata.data ?? {}), node, i) : value,
            );
          })
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceAttributeAt(
  this: Selection,
  attribute: string,
  index: number,
  value: any | ((d: any, n: Node, i: number) => any),
): Selection {
  this.selected.forEach((node, i) => {
    let evaluated = value instanceof Function ? value((node.metadata.data[index] ?? {}), node, index) : value;

    node instanceof Mesh
      ? node.hasThinInstances
        ? node.thinInstanceSetAttributeAt(
            attribute,
            index,
            value instanceof Function ? value((node.metadata.data ?? {}), node, i) : value,
          )
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceMatrixAt(
  this: Selection,
  index: number,
  value: Matrix | ((d: any, n: Node, i: number) => Matrix),
): Selection {
  this.selected.forEach((node, i) => {
    let evaluated = value instanceof Function ? value((node.metadata.data[index] ?? {}), node, index) : value;
    node instanceof Mesh
      ? node.hasThinInstances
        ? node.thinInstanceSetMatrixAt(index, evaluated)
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstancePositionAt(
  this: Selection,
  index: number,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (() => {
            let evaluated = value instanceof Function ? value((node.metadata.data[index] ?? {}), node, index) : value;
            let previousMatrix = node.thinInstanceGetWorldMatrices()[index];
            let matrix = previousMatrix.setTranslation(evaluated);
            node.thinInstanceSetMatrixAt(index, matrix);
          })()
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceScalingAt(
  this: Selection,
  index: number,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (() => {
            let evaluated = value instanceof Function ? value((node.metadata.data[index] ?? {}), node, index) : value;
            let previousMatrix = node.thinInstanceGetWorldMatrices()[index];
            let matrix = Matrix.ComposeToRef(
              evaluated,
              Quaternion.FromRotationMatrix(previousMatrix.getRotationMatrix()),
              previousMatrix.getTranslation(),
              previousMatrix,
            );
            node.thinInstanceSetMatrixAt(index, matrix);
          })()
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceRotationAt(
  this: Selection,
  index: number,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (() => {
            let evaluated = value instanceof Function ? value((node.metadata.data[index] ?? {}), node, index) : value;
            let previousMatrix = node.thinInstanceGetWorldMatrices()[index];
            let previousScale = new Vector3();
            previousMatrix.decompose(previousScale);
            let matrix = Matrix.ComposeToRef(
              previousScale,
              Quaternion.FromEulerVector(evaluated),
              previousMatrix.getTranslation(),
              previousMatrix,
            );
            node.thinInstanceSetMatrixAt(index, matrix);
          })()
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceColorAt(
  this: Selection,
  index: number,
  value: Color4 | ((d: any, n: Node, i: number) => Color4),
): Selection {
  this.selected.forEach((node, i) => {
    node instanceof Mesh
      ? node.hasThinInstances
        ? (() => {
            let evaluated = value instanceof Function ? value((node.metadata.data[index]  {}), node, index) : value;
            node.thinInstanceSetAttributeAt('color', index, [evaluated.r, evaluated.g, evaluated.b, evaluated.a]);
          })()
        : console.warn(node + 'has no thin instances, skipping')
      : console.warn(node + 'Node is not a mesh, skipping');
  });

  return this;
}

export function thinInstanceMatrixFor(
  this: Selection,
  method: (d: any, n: Node, i: number) => boolean,
  value: Matrix | ((d: any, n: Node, i: number) => Matrix),
): Selection {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.hasThinInstances) {
      let data = (node.metadata.data ?? {});
      data.forEach((d, k) => {
        if (method(d, node, k)) {
          node.thinInstanceSetMatrixAt(
            k,
            value instanceof Function ? value((node.metadata.data ?? {}), node, k) : value,
            false,
          );
        }
      });
      node.thinInstanceSetMatrixAt(0, node.thinInstanceGetWorldMatrices()[0], true);
    } else console.warn(node + 'is not a mesh or has no thin instances, skipping');
  });

  return this;
}

export function thinInstancePositionFor(
  this: Selection,
  method: (d: any, n: Node, i: number) => boolean,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
): Selection {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.hasThinInstances) {
      let bufferMatrices = new Float32Array(node.thinInstanceCount * 16);
      let matrices = node.thinInstanceGetWorldMatrices();
      let data = (node.metadata.data ?? {});
      data.forEach((e, j) => {
        if (method(e, node, j)) {
          let evaluated = value instanceof Function ? value(e, node, j) : value;
          let previousMatrix = node.thinInstanceGetWorldMatrices()[j];
          let matrix = previousMatrix.setTranslation(evaluated);
          node.thinInstanceSetMatrixAt(j, matrix, false);
        }
      });
      node.thinInstanceSetMatrixAt(0, node.thinInstanceGetWorldMatrices()[0], true);
    } else console.warn(node + 'is not a mesh or has no thin instances, skipping');
  });

  return this;
}

export function thinInstanceRotationFor(
  this: Selection,
  method: (d: any, n: Node, i: number) => boolean,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
): Selection {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.hasThinInstances) {
      let bufferMatrices = new Float32Array(node.thinInstanceCount * 16);
      let matrices = node.thinInstanceGetWorldMatrices();
      let data = (node.metadata.data ?? {});
      data.forEach((e, j) => {
        if (method(e, node, j)) {
          let evaluated = value instanceof Function ? value(e, node, j) : value;
          let previousMatrix = node.thinInstanceGetWorldMatrices()[j];
          let previousScale = new Vector3();
          previousMatrix.decompose(previousScale);
          let matrix = Matrix.ComposeToRef(
            previousScale,
            Quaternion.FromEulerVector(evaluated),
            previousMatrix.getTranslation(),
            previousMatrix,
          );
          node.thinInstanceSetMatrixAt(j, matrix, false);
        }
      });
      node.thinInstanceSetMatrixAt(0, node.thinInstanceGetWorldMatrices()[0], true);
    } else console.warn(node + 'is not a mesh or has no thin instances, skipping');
  });

  return this;
}

export function thinInstanceScalingFor(
  this: Selection,
  method: (d: any, n: Node, i: number) => boolean,
  value: Vector3 | ((d: any, n: Node, i: number) => Vector3),
): Selection {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.hasThinInstances) {
      let bufferMatrices = new Float32Array(node.thinInstanceCount * 16);
      let matrices = node.thinInstanceGetWorldMatrices();
      let data = (node.metadata.data ?? {});
      data.forEach((e, j) => {
        if (method(e, node, j)) {
          let evaluated = value instanceof Function ? value(e, node, j) : value;
          let previousMatrix = node.thinInstanceGetWorldMatrices()[j];
          let matrix = Matrix.ComposeToRef(
            evaluated,
            Quaternion.FromRotationMatrix(previousMatrix.getRotationMatrix()),
            previousMatrix.getTranslation(),
            previousMatrix,
          );
          node.thinInstanceSetMatrixAt(j, matrix, true);
        }
      });
      //node.thinInstanceSetMatrixAt(0, node.thinInstanceGetWorldMatrices()[0], true);
    } else console.warn(node + 'is not a mesh or has no thin instances, skipping');
  });

  return this;
}

export function thinInstanceColorFor(
  this: Selection,
  method: (d: any, n: Node, i: number) => boolean,
  value: Color4 | ((d: any, n: Node, i: number) => Color4),
): Selection {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.hasThinInstances) {
      let bufferMatrices = new Float32Array(node.thinInstanceCount * 16);
      let matrices = node.thinInstanceGetWorldMatrices();
      let data = (node.metadata.data ?? {});
      data.forEach((e, j) => {
        if (method(e, node, j)) {
          let evaluated = value instanceof Function ? value(e, node, j) : value;
          node.thinInstanceSetAttributeAt('color', j, [evaluated.r, evaluated.g, evaluated.b, evaluated.a]);
        }
      });
      node.thinInstanceSetMatrixAt(0, node.thinInstanceGetWorldMatrices()[0], true);
    } else console.warn(node + 'is not a mesh or has no thin instances, skipping');
  });

  return this;
}
