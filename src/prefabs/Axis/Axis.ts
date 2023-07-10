// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { TransformNode } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
import { Selection } from '../../selection';
import { shapeAlt } from './shape';
import { labelAlt } from './label';
import { backgroundAlt } from './background';
import { tickAlt } from './ticks';
import { select } from '../../select';
import { size } from 'lodash-es';

interface AxisOptions {
  cot?: Selection;
  x?: any;
  y?: any;
  z?: any;
}

export class Axis {
  name: string;
  //selection: Selection;
  options: AxisOptions;
  scene: Scene;
  CoT: Selection;
  scales: any;

  // background: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
  // shape: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
  // label: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
  // majorTick: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
  // minorTick: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;

  constructor(name: string, scene: Scene, options: AxisOptions = {}) {
    this.name = name;
    //this.selection = selection;
    this.options = options;
    this.scene = scene;
    this.CoT = this.setCoT();
    this.scales = this.setScales();
  }

  private setCoT(): Selection {
    let CoT;
    if (this.options.cot === undefined) {
      new TransformNode(this.name + 'CoT', this.scene);
      CoT = select('#' + this.name + 'CoT', this.scene);
    } else {
      CoT = this.options.cot.bind('cot').prop('name', this.name + 'CoT');
    }
    return CoT;
  }

  private setScales() {
    let scaleX: any;
    let rangeX = [0, 0];
    let domainX: any;

    let scaleY: any;
    let rangeY = [0, 0];
    let domainY: any;

    let scaleZ: any;
    let rangeZ = [0, 0];
    let domainZ: any;

    if (this.options.x != undefined) {
      scaleX = this.options.x;
      domainX = scaleX.domain();
      let range = scaleX.range();
      rangeX = [range[0], range.slice(-1)[0]];
    }

    if (this.options.y != undefined) {
      scaleY = this.options.y;
      domainY = scaleY.domain();
      let range = scaleY.range();
      rangeY = [range[0], range.slice(-1)[0]];
    }

    if (this.options.z != undefined) {
      scaleZ = this.options.z;
      domainZ = scaleZ.domain();
      let range = scaleZ.range();
      rangeZ = [range[0], range.slice(-1)[0]];
    }

    let sizes = [rangeX, rangeY, rangeZ].flat().sort();

    let size = Math.abs(sizes.slice(-1)[0] - sizes[0]);

    return {
      size: size,
      x: { scale: scaleX, range: rangeX, domain: domainX },
      y: { scale: scaleY, range: rangeY, domain: domainY },
      z: { scale: scaleZ, range: rangeZ, domain: domainZ },
    };
  }

  public shape = shapeAlt;
  public background = backgroundAlt;
  public ticks = labelAlt;
  public grid = tickAlt;
}
