// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3 } from '@babylonjs/core';
import { Axis } from './Axis';
import assign from 'lodash-es/assign';
import { selectName } from '../../select';

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
      default_options = { text: (d: any) => this.options.labelFormat?.x(d.text), size: this.scales.size * 0.2, fontSize: 60, fontColor: 'white' };
    } else {
      default_options = { text: (d: any) => d.text, size: this.scales.size * 0.2, fontSize: 60, fontColor: 'white' };
    }

    let default_properties = { 'position.y': rangeY[0] - this.scales.size * 0.02 };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, this.options.labelOptions),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .prop('name', this.name + '_labelX')
      .position(textPosition)
      .props(assign({}, default_properties, this.options.labelProperties));
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
      default_options = { text: (d: any) => this.options.labelFormat?.x(d.text), size: this.scales.size * 0.2, fontSize: 60, fontColor: 'white' };
    } else {
      default_options = { text: (d: any) => d.text, size: this.scales.size * 0.2, fontSize: 60, fontColor: 'white' };
    }

    let default_properties = { 'position.z': rangeZ[0] - this.scales.size * 0.02 };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, this.options.labelOptions),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .prop('name', this.name + '_labelY')
      .position(textPosition)
      .props(assign({}, default_properties, this.options.labelProperties));
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
      default_options = { text: (d: any) => this.options.labelFormat?.x(d.text), size: this.scales.size * 0.2, fontSize: 60, fontColor: 'white' };
    } else {
      default_options = { text: (d: any) => d.text, size: this.scales.size * 0.2, fontSize: 60, fontColor: 'white' };
    }

    let default_properties = { 'position.y': rangeY[0] - this.scales.size * 0.02 };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, this.options.labelOptions),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .prop('name', this.name + '_labelZ')
      .position(textPosition)
      .props(assign({}, default_properties, this.options.labelProperties));
  }

  return selectName([this.name + '_labelZ', this.name + '_labelY', this.name + '_labelX'], this.scene);
}
