// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Color3, CreateGreasedLine, GreasedLineMeshBuilderOptions, GreasedLineMaterialBuilderOptions } from '@babylonjs/core';
import { assign } from 'lodash-es';
import { Axes } from './Axis';
import { Selection } from '../../selection';

export function domain(
  this: Axes
): Selection {
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

  let default_options: GreasedLineMeshBuilderOptions = { points: path, 
                          updatable: false 
                        };

  let default_material: GreasedLineMaterialBuilderOptions= {  createAndAssignMaterial: true,
                            width: 5,
                            sizeAttenuation: true,
                            materialType: 0,
                            color: Color3.White(),
                            colorMode: 0,
                            useColors: false,
                            useDash: false,
                            visibility: 1
                          }  

  let greasedLine = CreateGreasedLine('greasedLine', 
                                      assign({}, default_options, this.options.domainOptions),
                                      assign({}, default_material, this.options.domainMaterialOptions),
                                      this.scene);

  greasedLine.parent = this.CoT.selected[0];

  let domain = new Selection([greasedLine], this.scene)

  domain.prop("name", this.name + "_domain")

  return domain;
}
