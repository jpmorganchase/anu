// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import {
  Vector3,
  Color3,
  CreateGreasedLine,
  GreasedLineMeshBuilderOptions,
  GreasedLineMaterialBuilderOptions,
  GreasedLineMesh,
  VertexBuffer
} from '@babylonjs/core';
import { assign } from 'lodash-es';
import { Axes } from './Axis';
import { Selection, createSelection } from '../../selection';
import { interpolateNumberArray } from 'd3-interpolate';
import { TransitionOptions } from '../../selection/animation/transition';

export function domain(this: Axes): Selection {
  let scaleX = this.scales.x.scale;
  let rangeX = this.scales.x.range;
  let domainX = this.scales.x.domain;

  let scaleY = this.scales.y.scale;
  let rangeY = this.scales.y.range;
  let domainY = this.scales.y.domain;

  let scaleZ = this.scales.z.scale;
  let rangeZ = this.scales.z.range;
  let domainZ = this.scales.z.domain;

  let path: Vector3[] = [];

  if (this.options.scale?.y != undefined) {
    path.push(new Vector3(rangeX[0], rangeY[1], rangeZ[0]));
  }
  if (this.options.scale?.x != undefined) {
    path.push(new Vector3(rangeX[0], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[0]));
  }
  if (this.options.scale?.z != undefined) {
    path.push(new Vector3(rangeX[1], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[1]));
  }

  let scaleMultiplier = (scaleX != undefined ? Math.abs(rangeX[1] - rangeX[0]) : 0) +
                        (scaleY != undefined ? Math.abs(rangeY[1] - rangeY[0]) : 0) +
                        (scaleZ != undefined ? Math.abs(rangeZ[1] - rangeZ[0]) : 0)
  let domainSize = scaleMultiplier * 0.005;

  let default_options: GreasedLineMeshBuilderOptions = { points: path, updatable: true};

  let default_material: GreasedLineMaterialBuilderOptions = {
    createAndAssignMaterial: true,
    width: domainSize,
    sizeAttenuation: false,
    materialType: 0,
    color: Color3.White(),
    colorMode: 0,
    useColors: false,
    useDash: false,
    visibility: 1
  };

  let greasedLine = CreateGreasedLine(
    'greasedLine',
    assign({}, default_options, this.options.domainOptions),
    assign({}, default_material, this.options.domainMaterialOptions),
    this._scene,
  );

  greasedLine.parent = this.CoT.selected[0];

  greasedLine.metadata = {data: {}};


  //Performance Optimization Settings
  greasedLine.doNotSyncBoundingInfo = true;
  greasedLine.isPickable = false;

  let domain = createSelection([greasedLine], this._scene);

  domain.prop('name', this.name + '_domain');

  return domain;
}


export function updateDomain(axes: Axes, transitionOptions: TransitionOptions) {
  const rangeX = axes.scales.x.range;
  const rangeY = axes.scales.y.range;
  const rangeZ = axes.scales.z.range;

  let path: Vector3[] = [];

  if (axes.options.scale?.y != undefined) {
    path.push(new Vector3(rangeX[0], rangeY[1], rangeZ[0]));
  }
  if (axes.options.scale?.x != undefined) {
    path.push(new Vector3(rangeX[0], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[0]));
  }
  if (axes.options.scale?.z != undefined) {
    path.push(new Vector3(rangeX[1], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[1]));
  }

  let originalPositions = (axes.domain.selected[0] as GreasedLineMesh).getVerticesData(VertexBuffer.PositionKind);

  const flattenedArray: number[] = path.flatMap(vector => [vector.x, vector.y, vector.z, vector.x, vector.y, vector.z]);

  (transitionOptions) 
  ? axes.domain.transition(transitionOptions).tween((d,n) => {
    
    const interpolate = interpolateNumberArray(originalPositions, flattenedArray);

    return (t) => {

      (n as GreasedLineMesh).updateVerticesData(VertexBuffer.PositionKind, interpolate(t))
    
  }
  })
  : axes.domain.run((d,n) => {
    (n as GreasedLineMesh).updateVerticesData(VertexBuffer.PositionKind, flattenedArray)
  })



}