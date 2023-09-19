// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { GreasedLineMeshBuilderOptions, TransformNode, Vector3 } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
import { Selection } from '../../selection';
import { shapeAlt } from './shape';
import { labelAlt } from './label';
import { backgroundAlt } from './background';
import { grid } from './grid';
import { select } from '../../select';
import { size } from 'lodash-es';
import { domain } from './domain';

interface AxisOptions {
  parent?: Selection;
  xScale?: any;
  yScale?: any;
  zScale?: any;
  scale?: {x?: any, y?: any, z?: any},
  domain?: boolean;
  domainOptions?: any;
  domainMaterialOptions?: any;
  background?: boolean;
  backgroundOptions?: {};
  backgroundProperties?: {};
  grid?: boolean;
  gridOptions?: any;
  gridProperties?: any;
  label?: boolean;
  labelOptions?: any;
  labelProperties?: any;
  labelTicks?: {x?: any, y?: any, z?: any};
  labelFormat?: {x? : any, y?: any, z?: any};
}

export class Axis {
  name: string;
  options: AxisOptions;
  scene: Scene;
  CoT: Selection;
  scales: any;
  domain: Selection;
  background: Selection;
  grid: Selection;
  label: Selection;
  tick: Selection;

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
    this.domain = this.options.domain ? this.setDomain() : new Selection([], scene);
    this.background = this.options.background ? this.setBackground() : new Selection([], scene); 
    this.grid = this.options.grid ? this.setGrid() : new Selection([], scene); 
    this.label = this.options.label ? this.setLabel() : new Selection([], scene);
    this.tick = new Selection([], scene);
  }

  private setCoT(): Selection {
    let CoT;
    if (this.options.parent === undefined) {
      let node = new TransformNode(this.name + 'CoT', this.scene);
      CoT = new Selection([node], this.scene);
    } else {
      CoT = this.options.parent.bind('cot').prop('name', this.name + 'CoT');
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

    if (this.options.scale?.x != undefined) {
      scaleX = this.options.scale.x;
      domainX = scaleX.domain();
      let range = scaleX.range();
      rangeX = [range[0], range.slice(-1)[0]];
    
    }

    if (this.options.scale?.y != undefined) {
      scaleY = this.options.scale.y;
      domainY = scaleY.domain();
      let range = scaleY.range();
      rangeY = [range[0], range.slice(-1)[0]];
    }

    if (this.options.scale?.z != undefined) {
      scaleZ = this.options.scale.z;
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

  private setDomain = domain;
  private setBackground = backgroundAlt;
  private setGrid = grid;
  private setLabel = labelAlt;
  // public shape = shapeAlt;
  // public background = backgroundAlt;
  // public ticks = labelAlt;
  // public grid = tickAlt;
}



export function createAxes(name: string, scene: Scene, options: AxisOptions){

  const Options: AxisOptions = {
    scale: options.scale,
    parent: options.parent || undefined,
    domain: options.domain || true,
    domainOptions: options.domainOptions || {},
    domainMaterialOptions: options.domainMaterialOptions || {},
    background: options.background || true,
    backgroundOptions: options.backgroundOptions || {},
    backgroundProperties: options.backgroundProperties || {},
    grid: options.grid || true,
    gridOptions: options.gridOptions || {},
    gridProperties: options.gridProperties || {},
    label: options.label || true,
    labelOptions: options.labelOptions || {},
    labelProperties: options.labelProperties || {},
    labelTicks: options.labelTicks || {},
    labelFormat: options.labelFormat || {}
  }

  let axes = new Axis(name, scene, Options)

  return axes;
}
