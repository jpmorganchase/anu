// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, Vector3 } from '@babylonjs/core';
import { Axis } from './Axis';
import assign from 'lodash-es/assign';
import { selectName } from '../../select';
import { Selection } from '../../selection';

export function labelAlt(
  this: Axis
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

  let selections: {x?: Selection, y?: Selection, z?: Selection} = {};

  let scaleMultiplier = 0.02;

  if (this.options.scale?.x != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    
    if (this.options.labelTicks?.x != undefined){
      ticks = this.options.labelTicks.x;
    } else {
      try {
        ticks = scaleX.ticks();
      } catch {
        ticks = domainX;
      }
    }
    

    let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

    textPosition = (d) => new Vector3(scaleX(d.text), rangeY[0], rangeZ[0]);

    let default_options;
    if (this.options.labelFormat?.x != undefined){
      default_options = { text: (d: any) => this.options.labelFormat?.x(d.text), size: this.scales.size * scaleMultiplier};
    } else {
      default_options = { text: (d: any) => d.text, size: this.scales.size * scaleMultiplier};
    }

    let default_properties = { };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, this.options.labelOptions),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .prop('name', this.name + '_labelX')
      .position((d,m,i) => { let bounds = (m as Mesh).getBoundingInfo().boundingBox; 
        return new Vector3(scaleX(d.text) - bounds.center.x, rangeY[0] - bounds.center.y * 2, rangeZ[0])
      })
      .props(assign({}, default_properties, this.options.labelProperties));

    selections.x = labelMesh;
  }

  if (this.options.scale?.y != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
   
    if (this.options.labelTicks?.y != undefined){
      ticks = this.options.labelTicks.y;
    } else {
      try {
        ticks = scaleY.ticks();
      } catch {
        ticks = domainY;
      }
    }
    
    

    let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

    textPosition = (d) => new Vector3(rangeX[0], scaleY(d.text), rangeZ[0]);

    let default_options;
    if (this.options.labelFormat?.y != undefined){
      default_options = { text: (d: any) => this.options.labelFormat?.y(d.text), size: this.scales.size * scaleMultiplier};
    } else {
      default_options = { text: (d: any) => d.text, size: this.scales.size * scaleMultiplier};
    }

    let default_properties = { };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, this.options.labelOptions),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .prop('name', this.name + '_labelY')
      .position((d,m,i) => { let extentX = (m as Mesh).getBoundingInfo().boundingBox; 
        return new Vector3(rangeX[0] - extentX.center._x * 2, scaleY(d.text) - extentX.center._y, rangeZ[0])
      })
      .props(assign({}, default_properties, this.options.labelProperties));

      selections.y = labelMesh;

  }

  if (this.options.scale?.z != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
   
    if (this.options.labelTicks?.z != undefined){
      ticks = this.options.labelTicks.z;
    } else {
      try {
        ticks = scaleZ.ticks();
      } catch {
        ticks = domainZ;
      }
    }
 

    let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

    textPosition = (d) => new Vector3(rangeX[1], rangeY[0], scaleZ(d.text));

    let default_options;
    if (this.options.labelFormat?.z != undefined){
      default_options = { text: (d: any) => this.options.labelFormat?.z(d.text), size: this.scales.size * scaleMultiplier};
    } else {
      default_options = { text: (d: any) => d.text, size: this.scales.size * scaleMultiplier};
    }

    let default_properties = {};

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, this.options.labelOptions),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .prop('name', this.name + '_labelZ')
      .position((d,m,i) => { let bounds = (m as Mesh).getBoundingInfo().boundingBox; 
                              return new Vector3(rangeX[1], rangeY[0] - bounds.center.y * 2, scaleZ(d.text))
                            })
      .props(assign({}, default_properties, this.options.labelProperties));

      selections.z = labelMesh;

  }

  return selections;
}
