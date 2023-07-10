// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, StandardMaterial, Color3, Mesh, Tools } from '@babylonjs/core';
import { Axis } from './Axis';
import assign from 'lodash-es/assign';


export function backgroundAlt(this: Axis, options: {} = {}, properties: {} = {}) {
  let scaleX = this.scales.x.scale;
  let rangeX = this.scales.x.range;
  let domainX = this.scales.x.domain;

  let scaleY = this.scales.y.scale;
  let rangeY = this.scales.y.range;
  let domainY = this.scales.y.domain;

  let scaleZ = this.scales.z.scale;
  let rangeZ = this.scales.z.range;
  let domainZ = this.scales.z.domain;

  if (this.options.x != undefined && this.options.y != undefined) {
    let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeWidth: number = 0;
    let planeHeight: number = 0;

    planeWidth = Math.abs(rangeX[0] - rangeX[1]);
    planeHeight = Math.abs(rangeY[0] - rangeY[1]);
    planePosition = new Vector3(0, (rangeY[0] + rangeY[1]) / 2, rangeZ[1]);
    planeRotation = new Vector3(0, 0, 0);

    let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

    let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 0.2 };

    let backgroundMeshX = this.CoT.bind('plane', assign({}, default_options, options))
      .attr('name', this.name + '_backgroundX')
      .position(planePosition)
      .material(new StandardMaterial(this.name + '_backgroundX_material', this.scene))
      .props(assign({}, default_properties, properties));
  }

  if (this.options.y != undefined && this.options.z != undefined) {
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

    let backgroundMeshY = this.CoT.bind('plane', assign({}, default_options, options))
      .attr('name', this.name + '_backgroundY')
      .position(planePosition)
      .rotation(planeRotation)
      .material(new StandardMaterial(this.name + '_backgroundY_material', this.scene))
      .props(assign({}, default_properties, properties));
  }

  if (this.options.z != undefined && this.options.x != undefined) {
    let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
    let planeWidth: number = 0;
    let planeHeight: number = 0;

    planePosition = new Vector3(0, rangeY[0], 0);
    planeRotation = new Vector3(1.5708, 0, 0);
    planeWidth = Math.abs(rangeX[0] - rangeX[1]);
    planeHeight = Math.abs(rangeZ[0] - rangeZ[1]);

    let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

    let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 0.2 };

    let backgroundMeshZ = this.CoT.bind('plane', assign({}, default_options, options))
      .attr('name', this.name + '_backgroundZ')
      .position(planePosition)
      .rotation(planeRotation)
      .material(new StandardMaterial(this.name + '_backgroundZ_material', this.scene))
      .props(assign({}, default_properties, properties));
  }

  return this;
}
