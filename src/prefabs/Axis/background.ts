// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, StandardMaterial, Color3, Mesh, HeightToNormalBlock } from '@babylonjs/core';
import { Axes } from './Axis';
import assign from 'lodash-es/assign';
import { Selection } from '../../selection';
import { PlaneParams } from './AxisOptions';

type backgroundConfig = {
  name: string,
  cot: Selection,
  position: Vector3
  rotation: Vector3,
  options: PlaneParams,
  properties: {}
}

const planePropertiesDefaults = { 'material.diffuseColor': Color3.White(), 'material.alpha': 0.2 }

const planeOptionsDefaults = (h,w) => ({ height: Math.abs(h[0] - h[1]), width: Math.abs(w[0] - w[1]), sideOrientation: Mesh.DOUBLESIDE })

const backgroundXDefaults = (axes: Axes): backgroundConfig => ({ 
    name: axes.name + "_background_plane_x",
    cot: axes.CoT,
    rotation: new Vector3(0, 0, 0),
    position: {
      0: new Vector3((axes.scales.range.x[0] + axes.scales.range.x[1]) / 2, (axes.scales.range.y[0] + axes.scales.range.y[1]) / 2, axes.scales.range.z[1]),
      1: new Vector3((axes.scales.range.x[0] + axes.scales.range.x[1]) / 2, (axes.scales.range.y[0] + axes.scales.range.y[1]) / 2, axes.scales.range.z[0])
    }[axes.options.backgroundPosition.x ?? 0],
    options: assign({}, planeOptionsDefaults(axes.scales.range.y, axes.scales.range.x), axes.options.backgroundOptions['x'] ?? {}),
    properties: assign({}, planePropertiesDefaults, axes.options.backgroundProperties['x'] ?? {})
  })

  const backgroundYDefaults = (axes: Axes): backgroundConfig => ({ 
    name: axes.name + "_background_plane_y",
    cot: axes.CoT,
    rotation: new Vector3(0, 1.5708, 0),
    position: {
      0: new Vector3(axes.scales.range.x[0], (axes.scales.range.y[0] + axes.scales.range.y[1]) / 2, (axes.scales.range.z[0] + axes.scales.range.z[1]) / 2),
      1: new Vector3(axes.scales.range.x[1], (axes.scales.range.y[0] + axes.scales.range.y[1]) / 2, (axes.scales.range.z[0] + axes.scales.range.z[1]) / 2)
    }[axes.options.backgroundPosition.y ?? 0],
    options: assign({}, planeOptionsDefaults(axes.scales.range.y, axes.scales.range.z), axes.options.backgroundOptions['y'] ?? {}),
    properties: assign({}, planePropertiesDefaults, axes.options.backgroundProperties['y'] ?? {})
  })

  const backgroundZDefaults = (axes: Axes): backgroundConfig => ({ 
    name: axes.name + "_background_plane_z",
    cot: axes.CoT,
    rotation: new Vector3(1.5708, 0, 0),
    position: {
      0: new Vector3((axes.scales.range.x[0] + axes.scales.range.x[1]) / 2, axes.scales.range.y[0], (axes.scales.range.z[0] + axes.scales.range.z[1]) / 2),
      1:  new Vector3((axes.scales.range.x[0] + axes.scales.range.x[1]) / 2, axes.scales.range.y[1], (axes.scales.range.z[0] + axes.scales.range.z[1]) / 2)
    }[axes.options.backgroundPosition.z ?? 0],
    options: assign({}, planeOptionsDefaults(axes.scales.range.z, axes.scales.range.x), axes.options.backgroundOptions['z'] ?? {}),
    properties: assign({}, planePropertiesDefaults, axes.options.backgroundProperties['z'] ?? {})
  })

  

export function backgroundNew(this: Axes) {

  let selections: { x?: Selection; y?: Selection; z?: Selection } = {};
 
  //Check what backgrounds if any we want to render
  let createBackground = (typeof this.options.background === "object") ? this.options.background :
  this.options.background === true ? {x: true, y: true, z: true} : false;

  //If no backgrounds, return now
  if (!createBackground) return undefined;

  if (createBackground.x && this.options.scale?.x != undefined  && this.options.scale?.y != undefined){
    selections.x = backgroundBuilder(backgroundXDefaults(this))
  }
  if (createBackground.y && this.options.scale?.y != undefined && this.options.scale?.z != undefined){
    selections.y = backgroundBuilder(backgroundYDefaults(this))
  }
  if (createBackground.z && this.options.scale?.z != undefined && this.options.scale?.x != undefined){
    selections.z = backgroundBuilder(backgroundZDefaults(this))
  }

  return selections;
}

function backgroundBuilder(config: backgroundConfig): Selection {
  let background = config.cot.bind('plane', config.options)
                      .props({
                        "name": config.name,
                        "position": config.position,
                        "rotation": config.rotation,
                        "material": new StandardMaterial(config.name + "_background_material_x"),
                        "metadata.data": config.options
                      })
                      .props(config.properties);

  return background;
}


export function updateBackground(axes: Axes, transitionOptions){
  let selections = axes.background;

  if (selections.x) {
    let config = backgroundXDefaults(axes)
    transitionOptions ?
    selections.x.transition(transitionOptions).props({
      scaling: (d,n) => new Vector3(config.options.width / d.width, config.options.height / d.height, 1),
      position: config.position
    })
    : selections.x.props({
      scaling: (d,n) => new Vector3(config.options.width / d.width, config.options.height / d.height, 1),
      position: config.position
    })
  }
  if (selections.y) {
    let config = backgroundYDefaults(axes)
    transitionOptions ?
    selections.y.transition(transitionOptions).props({
      scaling: (d,n) => new Vector3(config.options.width / d.width, config.options.height / d.height, 1),
      position: config.position
    })
    : selections.y.props({
      scaling: (d,n) => new Vector3(config.options.width / d.width, config.options.height / d.height, 1),
      position: config.position
    })
  }
  if (selections.z) {
    let config = backgroundZDefaults(axes)
    transitionOptions ?
    selections.z.transition(transitionOptions).props({
      scaling: (d,n) => new Vector3(config.options.width / d.width, config.options.height / d.height, 1),
      position: config.position
    })
    : selections.z.props({
      scaling: (d,n) => new Vector3(config.options.width / d.width, config.options.height / d.height, 1),
      position: config.position
    })
  }
}

//Deprecated code to be removed

// export function backgroundAlt(this: Axes) {
  
//   let createBackground = (typeof this.options.background === "object") ? this.options.background :
//   this.options.background === true ? {x: true, y: true, z: true} : false;

//   if (!createBackground) return undefined;
  
//   let scaleX = this.scales.x.scale;
//   let rangeX = this.scales.x.range;
//   let domainX = this.scales.x.domain;

//   let scaleY = this.scales.y.scale;
//   let rangeY = this.scales.y.range;
//   let domainY = this.scales.y.domain;

//   let scaleZ = this.scales.z.scale;
//   let rangeZ = this.scales.z.range;
//   let domainZ = this.scales.z.domain;


//   let selections: { x?: Selection; y?: Selection; z?: Selection } = {};

//   if (createBackground.x && this.options.scale?.x != undefined && this.options.scale?.y != undefined) {
//     let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
//     let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
//     let planeWidth: number = 0;
//     let planeHeight: number = 0;

//     planeWidth = Math.abs(rangeX[0] - rangeX[1]);
//     planeHeight = Math.abs(rangeY[0] - rangeY[1]);
//     planePosition = new Vector3((rangeX[0] + rangeX[1]) / 2, (rangeY[0] + rangeY[1]) / 2, rangeZ[1]);
//     planeRotation = new Vector3(0, 0, 0);

//     let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

//     let default_properties = { 'material.diffuseColor': Color3.White(), 'material.alpha': 0.2 };

//     let backgroundMeshX = this.CoT.bind('plane', assign({}, default_options, this.options.backgroundOptions))
//       .attr('name', this.name + '_backgroundX')
//       .position(planePosition)
//       .material(new StandardMaterial(this.name + '_backgroundX_material', this._scene))
//       .props(assign({}, default_properties, this.options.backgroundProperties));

//     selections.x = backgroundMeshX;
//   }

//   if (createBackground.y && this.options.scale?.y != undefined && this.options.scale?.z != undefined) {
//     let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
//     let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
//     let planeWidth: number = 0;
//     let planeHeight: number = 0;

//     planeWidth = Math.abs(rangeZ[0] - rangeZ[1]);
//     planeHeight = Math.abs(rangeY[0] - rangeY[1]);
//     planePosition = new Vector3(rangeX[0], (rangeY[0] + rangeY[1]) / 2, (rangeZ[0] + rangeZ[1]) / 2);
//     planeRotation = new Vector3(0, 1.5708, 0);

//     let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

//     let default_properties = { 'material.diffuseColor': Color3.White(), 'material.alpha': 0.2 };

//     let backgroundMeshY = this.CoT.bind('plane', assign({}, default_options, this.options.backgroundOptions))
//       .attr('name', this.name + '_backgroundY')
//       .position(planePosition)
//       .rotation(planeRotation)
//       .material(new StandardMaterial(this.name + '_backgroundY_material', this._scene))
//       .props(assign({}, default_properties, this.options.backgroundProperties));

//     selections.y = backgroundMeshY;
//   }

//   if (createBackground.z && this.options.scale?.z != undefined && this.options.scale?.x != undefined) {
//     let planePosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
//     let planeRotation: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);
//     let planeWidth: number = 0;
//     let planeHeight: number = 0;

//     planePosition = new Vector3((rangeX[0] + rangeX[1]) / 2, rangeY[0], (rangeZ[0] + rangeZ[1]) / 2);
//     planeRotation = new Vector3(1.5708, 0, 0);
//     planeWidth = Math.abs(rangeX[0] - rangeX[1]);
//     planeHeight = Math.abs(rangeZ[0] - rangeZ[1]);

//     let default_options = { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE };

//     let default_properties = { 'material.diffuseColor': Color3.White(), 'material.alpha': 0.2 };

//     let backgroundMeshZ = this.CoT.bind('plane', assign({}, default_options, this.options.backgroundOptions))
//       .attr('name', this.name + '_backgroundZ')
//       .position(planePosition)
//       .rotation(planeRotation)
//       .material(new StandardMaterial(this.name + '_backgroundZ_material', this._scene))
//       .props(assign({}, default_properties, this.options.backgroundProperties));

//     selections.z = backgroundMeshZ;
//   }

//   return selections;
// }