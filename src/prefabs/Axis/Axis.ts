// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { TransformNode, Scene, Engine} from '@babylonjs/core';
import { Selection } from '../../selection';
import { labelAlt, updateLabel } from './label';
import { backgroundNew, updateBackground } from './background';
import { grid, updateGrid } from './grid';
import { domain, updateDomain } from './domain';
import { AxesOptionsInterface, AxesConfig} from './AxisOptions';
import { TransitionOptions } from '../../selection/animation/transition';
import merge from 'lodash-es/merge';

export class Axes extends TransformNode {
  options: AxesOptionsInterface;
  CoT: Selection;
  scales: any;
  domain: Selection;
  background: { x?: Selection; y?: Selection; z?: Selection };
  grid: Selection;
  label: { x?: Selection; y?: Selection; z?: Selection };
  tempScales: any;
  tempAxes: any;

  constructor(name: string, scene: Scene, options: AxesOptionsInterface) {
    super(name, scene, true);

    this.name = name;
    this.options = options;
    this.parent = (this.options.parent instanceof Selection ? (this.options.parent.selected[0]) : this.options.parent);
    this.CoT = new Selection([this], scene);
    this.scales = this.setScales();
    this.domain = this.setDomain();
    this.background =  this.setBackground()
    this.grid = this.options.grid ? this.setGrid() : undefined;
    this.label = this.options.label ? this.setLabel() : {};
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
      range: {x: rangeX, y: rangeY, z: rangeZ },
      scale: {x: scaleX, y: scaleY, z: scaleZ },
      domain: {x: domainX, y: domainY, z: domainZ },
      x: { scale: scaleX, range: rangeX, domain: domainX },
      y: { scale: scaleY, range: rangeY, domain: domainY },
      z: { scale: scaleZ, range: rangeZ, domain: domainZ },
    };
  }

  public updateAxes(axesOptions: AxesOptionsInterface | AxesConfig, transitionOptions?: TransitionOptions){
    this.tempScales = this.scales;
    this.tempAxes = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    this.options = merge({}, this.options, axesOptions);
    this.scales = this.setScales();
    updateBackground(this, transitionOptions);
    updateDomain(this, transitionOptions);
    updateGrid(this, transitionOptions);
    this.label = updateLabel(this, transitionOptions);
    this.tempScales = null;
    this.tempAxes = null;
  }

  private setDomain = domain;
  private setBackground = backgroundNew;
  private setGrid = grid;
  private setLabel = labelAlt;
}

// We are changing the order of scene for prefabs moving forward to be optional but supporting backwards compatibility in the mean time.
export function createAxes(name: string, scene: Scene, options: AxesOptionsInterface | AxesConfig): Axes;
export function createAxes(name: string, options: AxesOptionsInterface | AxesConfig, scene?: Scene): Axes;

/**
 * Creates an instance of Axes with the specified configuration.
 *
 * This function supports two argument orders for backward compatibility:
 * 1. `createAxes(name, scene, options)`
 * 2. `createAxes(name, options, scene?)`
 *
 * @param name - The name of the axes.
 * @param arg2 - Either the scene in which the axes will be created or the configuration options for the axes.
 * @param arg3 - Either the configuration options for the axes or the scene in which the axes will be created, scene can be optional.
 * 
 * @returns An instance of Axes configured with the specified options.
 *
 * @remarks
 * For more information, see the [Axes Documentation](https://jpmorganchase.github.io/anu/guide/prefabs/axes.html).
 *
 * @example
 * ```javascript
 * const options: AxesOptionsInterface = { scale: {x: scaleX, y: scaleY, z: scaleZ} };
 * const axes = createAxes('myAxes', scene, options);
 * ```
 */
export function createAxes(name: string, arg2: Scene | AxesOptionsInterface | AxesConfig, arg3?: Scene | AxesOptionsInterface | AxesConfig) {
  let scene: Scene;
  let options: AxesOptionsInterface | AxesConfig;

  // Determine the order of arguments based on their types
  if (arg2 instanceof Scene) {
    scene = arg2;
    options = arg3 as AxesOptionsInterface | AxesConfig;
    console.warn('Deprecation Warning: The order of arguments for createAxes has changed. Please use createAxes(name, options, scene) instead.');
  } else {
    options = arg2 as AxesOptionsInterface | AxesConfig;
    scene = arg3 as Scene ?? Engine.LastCreatedScene;
  }

  const keys = ['x', 'y', 'z'];

  const Options: AxesOptionsInterface = {
    scale: options.scale,
    parent: options.parent ?? undefined,
    domain: options.domain ?? true,
    domainOptions: options.domainOptions ?? {},
    domainMaterialOptions: options.domainMaterialOptions ?? {},
    background: options.background ?? true,
    backgroundOptions: keys.some(key => key in (options?.backgroundOptions ?? {})) ? {x: options.backgroundOptions?.['x'] ?? {}, y: options.backgroundOptions?.['y'] ?? {}, z: options.backgroundOptions?.['z'] ?? {}} : options.backgroundOptions ?? {},
    backgroundProperties: keys.some(key => key in (options?.backgroundProperties ?? {})) ? {x: options.backgroundProperties?.['x'] ?? {}, y: options.backgroundProperties?.['y'] ?? {}, z: options.backgroundProperties?.['z'] ?? {}} : options.backgroundProperties ?? {},
    backgroundPosition: options.backgroundPosition ?? {x: 0, y: 0, z: 0},
    grid: options.grid ?? true,
    gridOptions:  keys.some(key => key in (options?.gridOptions ?? {})) ? {x: options.gridOptions?.['x'] ?? {}, y: options.gridOptions?.['y'] ?? {}, z: options.gridOptions?.['z'] ?? {}} : options.gridOptions ?? {},
    gridProperties: keys.some(key => key in (options?.gridProperties ?? {})) ? {x: options.gridProperties?.['x'] ?? {}, y: options.gridProperties?.['y'] ?? {}, z: options.gridProperties?.['z'] ?? {}} : options.gridProperties ?? {},
    gridTicks: options.gridTicks ?? {},
    label: options.label ?? true,
    labelOptions: keys.some(key => key in (options?.labelOptions ?? {})) ? {x: options.labelOptions?.['x'] ?? {}, y: options.labelOptions?.['y'] ?? {}, z: options.labelOptions?.['z'] ?? {}} : options.labelOptions ?? {},
    labelProperties: keys.some(key => key in (options?.labelProperties ?? {})) ? {x: options.labelProperties?.['x'] ?? {}, y: options.labelProperties?.['y'] ?? {}, z: options.labelProperties?.['z'] ?? {}} : options.labelProperties ?? {},
    labelTicks: options.labelTicks ?? {},
    labelFormat: options.labelFormat ?? {},
    labelMargin: merge({}, {x: 0.15, y: 0.15, z: 0.15}, options.labelMargin),
    atlas: options.atlas ?? undefined,
  };

  let axes = new Axes(name, scene, Options);

  return axes;
}
