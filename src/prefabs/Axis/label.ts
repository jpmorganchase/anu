// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { BoundingInfo, Mesh, Vector3, Color3} from '@babylonjs/core';
import { Axes } from './Axis';
import assign from 'lodash-es/assign';
import { Selection } from '../../selection';
import { TransitionOptions } from '../../selection/animation/transition';
import { PlaneText } from '../Text/planeText';

export function labelAlt(this: Axes) {

  let selections: { x?: Selection; y?: Selection; z?: Selection } = {};

  //scale label size to 0.05% selection height + width
  let { min, max } = this.CoT.selected[0].getHierarchyBoundingVectors();
  let bounds = new BoundingInfo(min, max).boundingBox;
  let scaleMultiplier = bounds.extendSize.y + bounds.extendSize.x + bounds.extendSize.z;
  let textHeight = scaleMultiplier * 0.05;

  let ticks = buildTicks(this.scales, this.options.labelTicks);
  
    //Check what labels if any we want to render
    let createBackground = (typeof this.options.background === "object") ? this.options.background :
    this.options.background === true ? {x: true, y: true, z: true} : false;
  
    //If no labels, return now
    if (!createBackground) return undefined;
  
    if (createBackground.x && this.options.scale?.x != undefined  && this.options.scale?.y != undefined){
      selections.x = labelBuilder(labelXDefaults(this, textHeight), ticks.x);
    }
    if (createBackground.y && this.options.scale?.y != undefined && this.options.scale?.z != undefined){
      //selections.y = backgroundBuilder(backgroundYDefaults(this))
    }
    if (createBackground.z && this.options.scale?.z != undefined && this.options.scale?.x != undefined){
      //selections.z = backgroundBuilder(backgroundZDefaults(this))
    }

  return selections;
}


type labelConfig = {
  name: string,
  cot: Selection,
  position: (d) => Vector3
  rotation: Vector3,
  options: {},
  properties: {}
}

const labelPropertiesDefaults = { 'material.diffuseColor': Color3.White(), 'material.alpha': 0.2 }

const labelOptionsDefaults = {};

const labelXDefaults = (axes: Axes, textHeight: number): labelConfig => ({ 
    name: axes.name + "_background_plane_x",
    cot: axes.CoT,
    rotation: new Vector3(0, 0, 0),
    position: {
      0: (d) => new Vector3(axes.scales.scale.x(d.text), axes.scales.range.y[0] - textHeight, axes.scales.range.z[0]),
      1: (d) => new Vector3(axes.scales.scale.x(d.text), axes.scales.range.y[0] - textHeight, axes.scales.range.z[1]),
    }[axes.options.backgroundPosition.x ?? 0],
    options: assign({}, { text: (d: any) => axes.options.labelFormat?.x?.(d.text) ?? d.text, align: 'center', size: textHeight, atlas: axes.options.atlas }, axes.options.labelOptions['x'] ?? axes.options.labelOptions),
    properties: assign({}, labelPropertiesDefaults, axes.options.labelProperties['x'] ?? axes.options.labelProperties)
  })

function labelBuilder(config: labelConfig, ticks: any[]): Selection {


  let labelMesh = config.cot.bind(
    'planeText',
    // @ts-ignore
    config.options,
    ticks.map((x: any) => {
      return { text: x };
    }))
    .props({
      "name": config.name,
      "position": config.position,
      "rotation": config.rotation
    })
    .props(config.properties);

  return labelMesh
}

function buildTicks(scales, ticks?){
  let scaleX = scales.x.scale;
  let domainX = scales.x.domain;

  let scaleY = scales.y.scale;
  let domainY = scales.y.domain;

  let scaleZ = scales.z.scale;
  let domainZ = scales.z.domain;

  let builtTicks: {x?: any[], y?: any[], z?: any[]} = {};

  builtTicks.x = ticks?.x ? ticks.x : scaleX?.ticks?.() ?? domainX; 
  builtTicks.y = ticks?.y ? ticks.y : scaleY?.ticks?.() ?? domainY; 
  builtTicks.z = ticks?.z ? ticks.z : scaleZ?.ticks?.() ?? domainZ; 

  return builtTicks;
}

export function updateLabel(axes: Axes, transitionOptions: TransitionOptions){
  // let scaleX = axes.scales.x.scale;
  // let rangeX = axes.scales.x.range;
  // let domainX = axes.scales.x.domain;

  // let scaleY = axes.scales.y.scale;
  // let rangeY = axes.scales.y.range;
  // let domainY = axes.scales.y.domain;

  // let scaleZ = axes.scales.z.scale;
  // let rangeZ = axes.scales.z.range;
  // let domainZ = axes.scales.z.domain;

  // let selections: { x?: Selection; y?: Selection; z?: Selection } = {};

  // //scale label size to 2.5% selection height + width
  // let { min, max } = axes.CoT.selected[0].getHierarchyBoundingVectors();
  // let bounds = new BoundingInfo(min, max).boundingBox;
  // let scaleMultiplier = bounds.extendSize.y + bounds.extendSize.x + bounds.extendSize.z;
  // let textHeight = scaleMultiplier * 0.05;



  // if (axes.options.scale?.x != undefined) {
  //   let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain

  //   if (axes.options.labelTicks?.x != undefined) {
  //     ticks = axes.options.labelTicks.x;
  //   } else {
  //     try {
  //       ticks = scaleX.ticks();
  //     } catch {
  //       ticks = domainX;
  //     }
  //   }

  //   let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
  //   textPosition = (d) => new Vector3(scaleX(d.text), rangeY[0], rangeZ[0]);

  //   let default_options;
  //   if (axes.options.labelFormat?.x != undefined) {
  //     default_options = {
  //       text: (d: any) => axes.options.labelFormat?.x(d.text),
  //       size: textHeight,
  //       atlas: axes.options.atlas,
  //     };
  //   } else {
  //     default_options = { text: (d: any) => d.text, size: textHeight, atlas: axes.options.atlas };
  //   }

  //   let default_properties = {};

  //   axes.label.x.dispose();

  //   let labelMesh = axes.CoT.bind(
  //     'planeText',
  //     assign({}, default_options, axes.options.labelOptions),
  //     ticks.map((x: any) => {
  //       return { text: x };
  //     }),
  //   )
  //     .prop('name', axes.name + '_labelX')
  //     .position((d, n, i) => new Vector3(scaleX(d.text), rangeY[0] - textHeight, rangeZ[0]))
  //     .props(assign({}, default_properties, axes.options.labelProperties));

  //   selections.x = labelMesh;
  // }

  // if (axes.options.scale?.y != undefined) {
  //   let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain

  //   if (axes.options.labelTicks?.y != undefined) {
  //     ticks = axes.options.labelTicks.y;
  //   } else {
  //     try {
  //       ticks = scaleY.ticks();
  //     } catch {
  //       ticks = domainY;
  //     }
  //   }

  //   let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

  //   textPosition = (d) => new Vector3(rangeX[0], scaleY(d.text), rangeZ[0]);

  //   let default_options;
  //   if (axes.options.labelFormat?.y != undefined) {
  //     default_options = {
  //       text: (d: any) => axes.options.labelFormat?.y(d.text),
  //       align: 'right',
  //       size: textHeight,
  //       atlas: axes.options.atlas,
  //     };
  //   } else {
  //     default_options = { text: (d: any) => d.text, align: 'right', size: textHeight, atlas: axes.options.atlas };
  //   }

  //   let default_properties = {};

  //   axes.label.y.dispose();

  //   let labelMesh = axes.CoT.bind(
  //     'planeText',
  //     assign({}, default_options, axes.options.labelOptions),
  //     ticks.map((x: any) => {
  //       return { text: x };
  //     }),
  //   )
  //     .prop('name', axes.name + '_labelY')
  //     .position((d, n, i) => new Vector3(rangeX[0] - 0.05, scaleY(d.text), rangeZ[0]))
  //     .props(assign({}, default_properties, axes.options.labelProperties));

  //   selections.y = labelMesh;
  // }

  // if (axes.options.scale?.z != undefined) {
  //   let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain

  //   if (axes.options.labelTicks?.z != undefined) {
  //     ticks = axes.options.labelTicks.z;
  //   } else {
  //     try {
  //       ticks = scaleZ.ticks();
  //     } catch {
  //       ticks = domainZ;
  //     }
  //   }

  //   let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

  //   textPosition = (d) => new Vector3(rangeX[1], rangeY[0], scaleZ(d.text));

  //   let default_options;
  //   if (axes.options.labelFormat?.z != undefined) {
  //     default_options = {
  //       text: (d: any) => axes.options.labelFormat?.z(d.text),
  //       size: textHeight,
  //       atlas: axes.options.atlas,
  //     };
  //   } else {
  //     default_options = { text: (d: any) => d.text, size: textHeight, atlas: axes.options.atlas };
  //   }

  //   let default_properties = { 'rotation.y': -Math.PI / 2 };

  //   axes.label.z.dispose();

  //   let labelMesh = axes.CoT.bind(
  //     'planeText',
  //     assign({}, default_options, axes.options.labelOptions),
  //     ticks.map((x: any) => {
  //       return { text: x };
  //     }),
  //   )
  //     .prop('name', axes.name + '_labelZ')
  //     .position((d, n, i) => new Vector3(rangeX[1], rangeY[0] - textHeight, scaleZ(d.text)))
  //     .props(assign({}, default_properties, axes.options.labelProperties));

  //   selections.z = labelMesh;
  // }

  //return selections;
   
  return undefined
}
