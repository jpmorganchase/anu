// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Mesh, Color3, StandardMaterial, TransformNode } from '@babylonjs/core';
import { assign } from 'lodash-es';
import { Axis } from './Axis';

export function shapeAlt(
  this: Axis,
  options: {
    radius?: number;
  } = {},
  properties: {} = {},
) {
  let scaleX = this.scales.x.scale;
  let rangeX = this.scales.x.range;
  let domainX = this.scales.x.domain;

  let scaleY = this.scales.y.scale;
  let rangeY = this.scales.y.range;
  let domainY = this.scales.y.domain;

  let scaleZ = this.scales.z.scale;
  let rangeZ = this.scales.z.range;
  let domainZ = this.scales.z.domain;

  let path = [];

  if (this.options.yScale != undefined) {
    path.push(new Vector3(rangeX[0], rangeY[1], rangeZ[0]));
  }
  if (this.options.xScale != undefined) {
    path.push(new Vector3(rangeX[0], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[0]));
  }
  if (this.options.zScale != undefined) {
    path.push(new Vector3(rangeX[1], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[1]));
  }

  let default_options = { path: path, radius: this.scales.size * 0.01, cap: 3 };

  let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

  let shapeMeshX = this.CoT.bind('tube', assign({}, default_options, options))
    .attr('name', this.name + '_shape')
    //.position(tubePositionX)
    .material(new StandardMaterial(this.name + '_shape_material', this.scene))
    .props(assign({}, default_properties, properties))
    .run((n) => n.forceSharedVertices());

  // if (this.options.x != undefined){

  //   let pathX = [
  //     new Vector3(rangeX[0], 0, 0),
  //     new Vector3(rangeX[1], 0, 0),
  //   ];
  //   let tubePositionX = new Vector3(
  //     0,
  //     rangeY[0],
  //     rangeZ[0],
  //   );

  //   let default_options = { path: pathX, radius: Math.abs(rangeX[1] - rangeX[0]) * 0.01, cap: 2, sideOrientation: Mesh.DOUBLESIDE };

  //   let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

  //   let shapeMeshX = this.CoT
  //   .bind('tube', assign({}, default_options, options))
  //   .attr('name', this.name + '_shapeX')
  //   .position(tubePositionX)
  //   .material(new StandardMaterial(this.name + '_shapeX_material', this.scene))
  //   .props(assign({}, default_properties, properties));
  // }

  // if (this.options.y != undefined){

  //   let pathY = [new Vector3(0, rangeY[0], 0), new Vector3(0, rangeY[1], 0)];
  //   let tubePositionY = new Vector3(rangeX[0], 0, rangeZ[0]);

  //   let default_options = { path: pathY, radius: Math.abs(rangeY[1] - rangeY[0]) * 0.01, cap: 2, sideOrientation: Mesh.DOUBLESIDE };

  //   let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

  //   let shapeMeshY = this.CoT
  //   .bind('tube', assign({}, default_options, options))
  //   .attr('name', this.name + '_shapeY')
  //   .position(tubePositionY)
  //   .material(new StandardMaterial(this.name + '_shapeY_material', this.scene))
  //   .props(assign({}, default_properties, properties));
  // }

  // if (this.options.z != undefined){

  //   let pathZ = [new Vector3(0, 0, rangeZ[0]), new Vector3(0, 0, rangeZ[1])];
  //   let tubePositionZ = new Vector3(rangeX[1], rangeY[0], rangeZ[0] + (Math.abs(rangeZ[1] - rangeZ[0]) / 2));

  //   let default_options = { path: pathZ, radius: Math.abs(rangeZ[1] - rangeZ[0]) * 0.01, cap: 2, sideOrientation: Mesh.DOUBLESIDE };

  //   let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

  //   let shapeMesh = this.CoT
  //   .bind('tube', assign({}, default_options, options))
  //   .attr('name', this.name + '_shapeZ')
  //   .position(tubePositionZ)
  //   .material(new StandardMaterial(this.name + '_shapeZ_material', this.scene))
  //   .props(assign({}, default_properties, properties));
  // }

  return this;
}
