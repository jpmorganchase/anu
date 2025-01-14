// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, StandardMaterial, Color3, Mesh } from '@babylonjs/core';
import { Axes } from './Axis';
import assign from 'lodash-es/assign';
import { Selection } from '../../selection';

export function backgroundAlt(this: Axes) {
  let scaleX = this.scales.x.scale;
  let rangeX = this.scales.x.range;
  let domainX = this.scales.x.domain;

  let scaleY = this.scales.y.scale;
  let rangeY = this.scales.y.range;
  let domainY = this.scales.y.domain;

  let scaleZ = this.scales.z.scale;
  let rangeZ = this.scales.z.range;
  let domainZ = this.scales.z.domain;

  let selections: { x?: Selection; y?: Selection; z?: Selection } = {};

  if (this.options.scale?.x != undefined && this.options.scale?.y != undefined) {
    let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeWidth: number = 0;
    let planeHeight: number = 0;

    planeWidth = Math.abs(rangeX[0] - rangeX[1]);
    planeHeight = Math.abs(rangeY[0] - rangeY[1]);
    planePosition = new Vector3((rangeX[0] + rangeX[1]) / 2, (rangeY[0] + rangeY[1]) / 2, rangeZ[1]);
    planeRotation = new Vector3(0, 0, 0);

    let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

    let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 0.2 };

    let backgroundMeshX = this.CoT.bind('plane', assign({}, default_options, this.options.backgroundOptions))
      .attr('name', this.name + '_backgroundX')
      .position(planePosition)
      .material(new StandardMaterial(this.name + '_backgroundX_material', this._scene))
      .props(assign({}, default_properties, this.options.backgroundProperties));

    selections.x = backgroundMeshX;
  }

  if (this.options.scale?.y != undefined && this.options.scale?.z != undefined) {
    let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeWidth: number = 0;
    let planeHeight: number = 0;

    planeWidth = Math.abs(rangeZ[0] - rangeZ[1]);
    planeHeight = Math.abs(rangeY[0] - rangeY[1]);
    planePosition = new Vector3(rangeX[0], (rangeY[0] + rangeY[1]) / 2, (rangeZ[0] + rangeZ[1]) / 2);
    planeRotation = new Vector3(0, 1.5708, 0);

    let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

    let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 0.2 };

    let backgroundMeshY = this.CoT.bind('plane', assign({}, default_options, this.options.backgroundOptions))
      .attr('name', this.name + '_backgroundY')
      .position(planePosition)
      .rotation(planeRotation)
      .material(new StandardMaterial(this.name + '_backgroundY_material', this._scene))
      .props(assign({}, default_properties, this.options.backgroundProperties));

    selections.y = backgroundMeshY;
  }

  if (this.options.scale?.z != undefined && this.options.scale?.x != undefined) {
    let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeWidth: number = 0;
    let planeHeight: number = 0;

    planePosition = new Vector3((rangeX[0] + rangeX[1]) / 2, rangeY[0], (rangeZ[0] + rangeZ[1]) / 2);
    planeRotation = new Vector3(1.5708, 0, 0);
    planeWidth = Math.abs(rangeX[0] - rangeX[1]);
    planeHeight = Math.abs(rangeZ[0] - rangeZ[1]);

    let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

    let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 0.2 };

    let backgroundMeshZ = this.CoT.bind('plane', assign({}, default_options, this.options.backgroundOptions))
      .attr('name', this.name + '_backgroundZ')
      .position(planePosition)
      .rotation(planeRotation)
      .material(new StandardMaterial(this.name + '_backgroundZ_material', this._scene))
      .props(assign({}, default_properties, this.options.backgroundProperties));

    selections.z = backgroundMeshZ;
  }

  return selections;
}
