import { Scene, Color3, StandardMaterial, TransformNode, Color4, Nullable } from '@babylonjs/core';
import { Selection } from '../../selection';
import { Chart2D } from './Chart2D';
import { Axis } from '../Axis/OLD/AxisNew';
import * as d3 from 'd3';

export class Scatter2D extends Chart2D {
  makeScales(data: [], x: string, y: string): this {
    this.data = data;
    this.x = x;
    this.y = y;

    let xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[x] as number) as [number, number])
      .range([(-this.width + this.padding.left!) / 2, (this.width - this.padding.right!) / 2]);
    //.nice();

    let yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[y] as number) as [number, number])
      .range([(-this.width + this.padding.bottom!) / 2, (this.height - this.padding.top!) / 2]);
    //.nice();

    this.scales = { x: xScale, y: yScale };
    return this;
  }

  makeElements(color: Color3 | { key: string; scale: Function } = new Color3(0, 0, 0), alpha: number = 1): this {
    this.color = color;

    let elements = this.cot
      .bind('disc', { radius: 0.1 }, this.data)
      .positionX((d) => this.scales.x(d[this.x]))
      .positionY((d) => this.scales.y(d[this.y]))
      .positionZ(0)
      .attr('renderingGroupId', 1);

    if (color instanceof Color3) {
      elements
        .material(new StandardMaterial(this.name + 'material', this.scene))
        .attr('material.backFaceCulling', false)
        .diffuseColor(color)
        .attr('material.alpha', alpha);
    } else {
      elements
        .material((d, i) => new StandardMaterial(this.name + 'material', this.scene))
        .attr('material.backFaceCulling', false)
        .diffuseColor((d) => Color3.FromHexString(color.scale(d[color.key])))
        .attr('material.alpha', alpha);
    }

    this.elements = { points: elements };

    return this;
  }

  makeAxes(): this {
    //let xAxis: Axis = this.elements.points.pipeAxis('x', this.scales.x, {padding: {y: -(this.padding.bottom / 2)}});
    //let yAxis: Axis = this.elements.points.pipeAxis('y',this.scales.y, {padding: {x:  -(this.padding.bottom / 2)}});
    let xAxis: Axis = this.elements.points.pipeAxis('x', this.scales.x);
    let yAxis: Axis = this.elements.points.pipeAxis('y', this.scales.y);
    this.axes = { xAxis: xAxis, yAxis: yAxis };
    return this;
  }
}

export function createScatter2D(
  name: string,
  scene: Scene,
  data: [],
  x: string,
  y: string,
  options: {
    height?: number;
    width?: number;
    padding?: { top?: number; bottom?: number; left?: number; right?: number };
    backgroundColor?: Color3;
    backgroundAlpha?: number;
    elementColor?: Color3 | { key: string; scale: Function };
    elementAlpha?: number;
  } = {},
) {
  const height = options.height || 10;
  const width = options.width || 10;
  const paddingTop =  0;
  const paddingBottom =  0;
  const paddingRight =  0;
  const paddingLeft =  0;
  const padding = { top: paddingTop, bottom: paddingBottom, left: paddingLeft, right: paddingRight };
  const backgroundColor = new Color3(258, 258, 258);
  const backgroundAlpha = options.backgroundAlpha || 1;

  let scatter = new Scatter2D(name, scene);
  scatter.makeBackground(height, width, padding, backgroundColor, backgroundAlpha);
  scatter.makeScales(data, x, y);
  scatter.makeElements(options.elementColor, options.elementAlpha);
  scatter.makeAxes();

  return scatter;
}
