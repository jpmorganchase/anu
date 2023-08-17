// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, Vector3, BoundingInfo } from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Calculates the cumalitive bounding box of the current selection.
 *
 * @returns instance of BoundingInfo class, an object containing all bounding box values.
 */
export function boundingBox(this: Selection): BoundingInfo {
  let selectionMin = new Vector3(0, 0, 0);
  let selectionMax = new Vector3(0, 0, 0);
  // if (this.selected[0] instanceof Mesh) {
  //   selectionMin = this.selected[0].getBoundingInfo().boundingBox.minimumWorld;
  //   selectionMax = this.selected[0].getBoundingInfo().boundingBox.maximumWorld;
  // }

  this.selected.forEach((node, i) => {
    let meshes = node.getChildMeshes();
    meshes.forEach((mesh, j) => {
      mesh.computeWorldMatrix(true); //without this the bounding box is calulcated at the mesh creation position...TODO investigate.
      let nodeMin = mesh.getBoundingInfo().boundingBox.minimumWorld;
      let nodeMax = mesh.getBoundingInfo().boundingBox.maximumWorld;
      selectionMin = Vector3.Minimize(selectionMin, nodeMin);
      selectionMax = Vector3.Maximize(selectionMax, nodeMax);
    });
  });

  return new BoundingInfo(selectionMin, selectionMax);
}
