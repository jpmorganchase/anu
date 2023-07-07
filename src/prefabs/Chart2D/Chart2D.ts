import { Scene, Color3, StandardMaterial, TransformNode, Color4 } from '@babylonjs/core';
import { Selection } from '../../selection';
import { Axis } from '../Axis/OLD/AxisNew';
import * as d3 from 'd3';

export abstract class Chart2D {
  name: string;
  scene: Scene;
  cot: Selection;
  background!: { [index: string]: Selection };
  elements!: { [index: string]: Selection };
  scales!: { [index: string]: Function };
  axes!: { [index: string]: Axis };
  height!: number;
  width!: number;
  padding!: { top: number; bottom: number; left: number; right: number };
  data!: [];
  x!: string;
  y!: string;
  color!: Color3 | { key: string; scale: Function };

  constructor(name: string, scene: Scene) {
    this.name = name;
    this.scene = scene;
    this.cot = new Selection([new TransformNode(name + '_cot', scene)], scene);
  }

  makeBackground(
    height: number,
    width: number,
    padding: { top: number; bottom: number; left: number; right: number },
    color: Color3,
    backgroundAlpha: number,
  ): this {
    this.height = height;
    this.width = width;
    this.padding = padding;

    let background = this.cot
      .bind('plane', { height: height, width: width })
      .material((d, i) => new StandardMaterial(this.name + '_backgroundMaterial', this.scene))
      .diffuseColor((d) => color)
      .attr('material.backFaceCulling', false)
      .attr('material.alpha', backgroundAlpha);

    this.background = { backgroundPlane: background };

    return this;
  }

  abstract makeScales(data: [], x: string, y: string): void;
  abstract makeElements(color: Color3 | { key: string; scale: Function }): void;
  abstract makeAxes(): void;
}
