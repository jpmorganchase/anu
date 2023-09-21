// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Color3, Vector3 } from '@babylonjs/core';
import { Axis } from './Axis';
import assign from 'lodash-es/assign';

export function grid(
  this: Axis,
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

  let linesArray = [];

  if (this.options.scale?.x != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    
    if (this.options.gridTicks?.x != undefined){
      ticks = this.options.gridTicks.x;
    } else {
      try {
        ticks = scaleX.ticks();
      } catch {
        ticks = domainX;
      }
    }
   
    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];

    tickPosition = (d) => [
      new Vector3(scaleX(d), rangeY[0], rangeZ[0]),
      new Vector3(scaleX(d), rangeY[0], rangeZ[1]),
      new Vector3(scaleX(d), rangeY[1], rangeZ[1]),
    ];

    for (var tick of ticks) {
      linesArray.push(tickPosition(tick));
    }
  }

  if (this.options.scale?.y != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    
    if (this.options.gridTicks?.y != undefined){
      ticks = this.options.gridTicks.y;
    } else {
      try {
        ticks = scaleY.ticks();
      } catch {
        ticks = domainY;
      }
    }

    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];

    tickPosition = (d) => [
      new Vector3(rangeX[0], scaleY(d), rangeZ[0]),
      new Vector3(rangeX[0], scaleY(d), rangeZ[1]),
      new Vector3(rangeX[1], scaleY(d), rangeZ[1]),
    ];

    for (var tick of ticks) {
      linesArray.push(tickPosition(tick));
    }
  }

  if (this.options.scale?.z != undefined) {
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    
    if (this.options.gridTicks?.z != undefined){
      ticks = this.options.gridTicks.z;
    } else {
      try {
        ticks = scaleZ.ticks();
      } catch {
        ticks = domainZ;
      }
    }
  
    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];

    tickPosition = (d) => [
      new Vector3(rangeX[1], rangeY[0], scaleZ(d)),
      new Vector3(rangeX[0], rangeY[0], scaleZ(d)),
      new Vector3(rangeX[0], rangeY[1], scaleZ(d)),
    ];

    for (var tick of ticks) {
      linesArray.push(tickPosition(tick));
    }
  }

  let default_options = { lines: linesArray};
  
  let default_properties = {  'name': this.name + "_grid",
                              'alpha': 0.3,
                              'color': Color3.White()}


  let tickMesh = this.CoT.bind('lineSystem', assign({}, default_options, this.options.gridOptions))
    .props(assign({}, default_properties, this.options.gridProperties))

  return tickMesh;
}
