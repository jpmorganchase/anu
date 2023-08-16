// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3 } from '@babylonjs/core';
import { Axis } from './Axis';
import assign from 'lodash-es/assign';

export function labelAlt(
  this: Axis,
  labels: { x: [] | undefined; y: [] | undefined; z: [] | undefined } = { x: undefined, y: undefined, z: undefined },
  options: { x: {} | undefined; y: {} | undefined; z: {} | undefined } = { x: undefined, y: undefined, z: undefined },
  properties: { x: {}; y: {}; z: {} } = { x: {}, y: {}, z: {} },
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

  if (this.options.x != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    if (labels.x === undefined) {
      try {
        ticks = scaleX.ticks();
      } catch {
        ticks = domainX;
      }
    } else {
      ticks = labels.x;
    }

    let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

    textPosition = (d) => new Vector3(scaleX(d.text), rangeY[0], rangeZ[0]);

    let default_options = { text: (d: any) => d.text, size: this.scales.size * 0.05, fontSize: 60, fontColor: 'white' };

    let default_properties = { 'position.y': rangeY[0] - this.scales.size * 0.05 };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, options.x),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .attr('name', this.name + '_labelX')
      .position(textPosition)
      .props(assign({}, default_properties, properties.x));
  }

  if (this.options.y != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    if (labels.y === undefined) {
      try {
        ticks = scaleY.ticks();
      } catch {
        ticks = domainY;
      }
    } else {
      ticks = labels.y;
    }

    let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

    textPosition = (d) => new Vector3(rangeX[0], scaleY(d.text), rangeZ[0]);

    let default_options = {
      text: (d: any) => {
        return d.text;
      },
      size: this.scales.size * 0.05,
      fontSize: 60,
      fontColor: 'white',
    };

    let default_properties = { 'position.z': rangeZ[0] - this.scales.size * 0.05 };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, options.y),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .attr('name', this.name + '_labelY')
      .position(textPosition)
      .props(assign({}, default_properties, properties.y));
  }

  if (this.options.z != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    if (labels.z === undefined) {
      try {
        ticks = scaleZ.ticks();
      } catch {
        ticks = domainZ;
      }
    } else {
      ticks = labels.z;
    }

    let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

    textPosition = (d) => new Vector3(rangeX[1], rangeY[0], scaleZ(d.text));

    let default_options = { text: (d: any) => d.text, size: this.scales.size * 0.05, fontSize: 60, fontColor: 'white' };

    let default_properties = { 'position.y': rangeY[0] - this.scales.size * 0.05 };

    let labelMesh = this.CoT.bind(
      'text2d',
      assign({}, default_options, options.z),
      ticks.map((x: any) => {
        return { text: x };
      }),
    )
      .attr('name', this.name + '_labelZ')
      .position(textPosition)
      .props(assign({}, default_properties, properties.z));
  }

  return this;
}
