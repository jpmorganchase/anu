// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { BoundingInfo, Mesh, Vector3, Color3} from '@babylonjs/core';
import { Axes } from './Axis';
import assign from 'lodash-es/assign';
import { Selection } from '../../selection';
import { TransitionOptions } from '../../selection/animation/transition';
import { PlaneText } from '../Text/planeText';
import { interpolateObject } from 'd3-interpolate';
import { PlaneTextOptions } from '../Text/planeText';
import clone from 'lodash-es/clone';

export function labelAlt(this: Axes) {

  let selections: { x?: Selection; y?: Selection; z?: Selection } = {};
 
  //Scale label size to 1.5% of total ranges
  let scaleMultiplier = (this.scales?.x != undefined ? Math.abs(this.scales.range.x[1] - this.scales.range.x[0]) : 0) +
                        (this.scales?.y != undefined ? Math.abs(this.scales.range.y[1] - this.scales.range.y[0]) : 0) +
                        (this.scales?.z != undefined ? Math.abs(this.scales.range.z[1] - this.scales.range.z[0]) : 0)
  let textHeight = scaleMultiplier * 0.015;
  
  let ticks = buildTicks(this.scales, this.options.labelTicks);
  
  //Check what labels if any we want to render
  let createLabel = (typeof this.options.label === "object") ? this.options.label :
  this.options.label === true ? {x: true, y: true, z: true} : false;

  //If no labels, return now
  if (!createLabel) return undefined;

  if (createLabel.x && this.options.scale?.x != undefined){
    selections.x = labelBuilder(labelXDefaults(this, textHeight), ticks.x);
  }
  if (createLabel.y && this.options.scale?.y != undefined){
    selections.y = labelBuilder(labelYDefaults(this, textHeight), ticks.y)
  }
  if (createLabel.z && this.options.scale?.z != undefined){
    selections.z = labelBuilder(labelZDefaults(this, textHeight), ticks.z)
  }

  return selections;
}


type labelConfig = {
  name: string,
  cot: Selection,
  position: (d) => Vector3,
  rotation: Vector3,
  options: {},
  properties: {}
}

const labelPropertiesDefaults = {}

const labelOptionsDefaults = {};

const labelXDefaults = (axes: Axes, textHeight: number): labelConfig => ({ 
    name: axes.name + "_label_x",
    cot: axes.CoT,
    rotation: new Vector3(0, 0, 0),
    position: {
      0: (d) => new Vector3(axes.scales.scale.x(d.text), axes.scales.range.y[0] - (textHeight / 2) - (axes.options.labelMargin['x']), axes.scales.range.z[0]),
      1: (d) => new Vector3(axes.scales.scale.x(d.text), axes.scales.range.y[0] - (textHeight / 2) - (axes.options.labelMargin['x']), axes.scales.range.z[1]),
    }[0],
    options: assign({}, { text: (d: any) => axes.options.labelFormat?.x?.(d.text) ?? d.text, align: 'center', size: textHeight, atlas: axes.options.atlas }, axes.options.labelOptions['x'] ?? axes.options.labelOptions),
    properties: assign({}, labelPropertiesDefaults, axes.options.labelProperties['x'] ?? axes.options.labelProperties)
  })

  const labelYDefaults = (axes: Axes, textHeight: number): labelConfig => ({ 
    name: axes.name + "_label_y",
    cot: axes.CoT,
    rotation: new Vector3(0, 0, 0),
    position: {
      0: (d) => new Vector3(axes.scales.range.x[0] - (axes.options.labelMargin['y']), axes.scales.scale.y(d.text), axes.scales.range.z[0]),
      1: (d) => new Vector3(axes.scales.range.x[1] + (axes.options.labelMargin['y']), axes.scales.scale.y(d.text), axes.scales.range.z[0]),
    }[0],
    options: assign({}, { text: (d: any) => axes.options.labelFormat?.y?.(d.text) ?? d.text, align: 'right', size: textHeight, atlas: axes.options.atlas }, axes.options.labelOptions['y'] ?? axes.options.labelOptions),
    properties: assign({}, labelPropertiesDefaults, axes.options.labelProperties['y'] ?? axes.options.labelProperties)
  })

  const labelZDefaults = (axes: Axes, textHeight: number): labelConfig => ({ 
    name: axes.name + "_label_z",
    cot: axes.CoT,
    rotation: new Vector3(0, -1.5708, 0),
    position: {
      0: (d) => new Vector3(axes.scales.range.x[1], axes.scales.range.y[0] - (textHeight / 2) - (axes.options.labelMargin['z']), axes.scales.scale.z(d.text)),
      1: (d) => new Vector3(axes.scales.range.x[0], axes.scales.range.y[0] - (textHeight / 2) - (axes.options.labelMargin['z']), axes.scales.scale.z(d.text)),
    }[0],
    options: assign({}, { text: (d: any) => axes.options.labelFormat?.z?.(d.text) ?? d.text, align: 'center', size: textHeight, atlas: axes.options.atlas }, axes.options.labelOptions['z'] ?? axes.options.labelOptions),
    properties: assign({}, labelPropertiesDefaults, axes.options.labelProperties['z'] ?? axes.options.labelProperties)
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
    .props(config.properties)
    .run((d, n: Mesh) => {
      n.isPickable = false;
    });

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
 
  let previous_selection = axes.label;

  let selections: { x?: Selection; y?: Selection; z?: Selection } = {};

  //Scale label size to 1.5% of total ranges
  let scaleMultiplier = (axes.scales?.x != undefined ? Math.abs(axes.scales.range.x[1] - axes.scales.range.x[0]) : 0) +
                        (axes.scales?.y != undefined ? Math.abs(axes.scales.range.y[1] - axes.scales.range.y[0]) : 0) +
                        (axes.scales?.z != undefined ? Math.abs(axes.scales.range.z[1] - axes.scales.range.z[0]) : 0)
  let textHeight = scaleMultiplier * 0.015;

  let scaleMultiplierPrev = (axes.tempScales?.x != undefined ? Math.abs(axes.tempScales.range.x[1] - axes.tempScales.range.x[0]) : 0) +
                            (axes.tempScales?.y != undefined ? Math.abs(axes.tempScales.range.y[1] - axes.tempScales.range.y[0]) : 0) +
                            (axes.tempScales?.z != undefined ? Math.abs(axes.tempScales.range.z[1] - axes.tempScales.range.z[0]) : 0)
  let textHeightPrev = scaleMultiplierPrev * 0.015;

  let ticksPrev = buildTicks(axes.tempScales, axes.options.labelTicks);
  let ticks = buildTicks(axes.scales, axes.options.labelTicks);
  
    //Check what labels if any we want to render
    let createLabel = (typeof axes.options.label === "object") ? axes.options.label :
    axes.options.label === true ? {x: true, y: true, z: true} : false;
  
    //If no labels, return now
    if (!createLabel) return undefined;
  
    if (createLabel.x && axes.options.scale?.x != undefined){
      // Only dispose and recreate if the number of ticks changed or we have a transition
      const tickCountChanged = !previous_selection.x || previous_selection.x.selected.length !== ticks.x.length;
      
      if (tickCountChanged) {
        if (transitionOptions) {
          const startConfig = labelXDefaults(axes.tempAxes, textHeightPrev)
          const endConfig = labelXDefaults(axes, textHeight)
          
          // Create new labels immediately
          selections.x = labelBuilder(startConfig, ticks.x);
          selections.x.transition(transitionOptions).tween((d,n,i) => {
            let interpolate = interpolateObject(n.position, endConfig.position(d));
            return (t) => {
               n.position = interpolate(t);
            }
          })
          
          // Wait for all new labels to be ready before disposing old ones
          if (previous_selection.x) {
            const readyPromises = selections.x.selected.map((n: PlaneText) => n.ready);
            Promise.all(readyPromises).then(() => {
              previous_selection.x.dispose();
            });
          }
        } else {
          selections.x = labelBuilder(labelXDefaults(axes, textHeight), ticks.x)
          
          // Wait for all new labels to be ready before disposing old ones
          if (previous_selection.x) {
            const readyPromises = selections.x.selected.map((n: PlaneText) => n.ready);
            Promise.all(readyPromises).then(() => {
              previous_selection.x.dispose();
            });
          }
        }
      } else {
        // Reuse existing labels, just update them
        selections.x = previous_selection.x;
        const endConfig = labelXDefaults(axes, textHeight);
        
        if (transitionOptions) {
          selections.x.transition(transitionOptions).tween((d,n,i) => {
            let interpolate = interpolateObject(n.position, endConfig.position(d));
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            return (t) => {
              n.position = interpolate(t);
              (n as PlaneText).updatePlaneText(options as PlaneTextOptions)
            }
          })
        } else {
          // No transition, just update properties
          selections.x.each((d, n, i) => {
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            (n as PlaneText).updatePlaneText(options as PlaneTextOptions);
            n.position = endConfig.position(d);
          });
        }
      }
    }
    if (createLabel.y && axes.options.scale?.y != undefined){
      // Only dispose and recreate if the number of ticks changed or we have a transition
      const tickCountChanged = !previous_selection.y || previous_selection.y.selected.length !== ticks.y.length;
      
      if (tickCountChanged) {
        if (transitionOptions) {
          const startConfig = labelYDefaults(axes.tempAxes, textHeightPrev)
          const endConfig = labelYDefaults(axes, textHeight)
          selections.y = labelBuilder(startConfig, ticks.y);
          selections.y.transition(transitionOptions).tween((d,n,i) => {
            let interpolate = interpolateObject(n.position, endConfig.position(d));
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            return (t) => {
               n.position = interpolate(t);
              (n as PlaneText).updatePlaneText(options as PlaneTextOptions)
            }
          })
        } else {
          selections.y = labelBuilder(labelYDefaults(axes, textHeight), ticks.y)
        }
        
        // Wait for all new labels to be ready before disposing old ones
        if (previous_selection.y) {
          const readyPromises = selections.y.selected.map((n: PlaneText) => n.ready);
          Promise.all(readyPromises).then(() => {
            previous_selection.y.dispose();
          });
        }
      } else {
        // Reuse existing labels, just update them
        selections.y = previous_selection.y;
        const endConfig = labelYDefaults(axes, textHeight);
        
        if (transitionOptions) {
          selections.y.transition(transitionOptions).tween((d,n,i) => {
            let interpolate = interpolateObject(n.position, endConfig.position(d));
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            return (t) => {
              n.position = interpolate(t);
              (n as PlaneText).updatePlaneText(options as PlaneTextOptions)
            }
          })
        } else {
          // No transition, just update properties
          selections.y.each((d, n, i) => {
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            (n as PlaneText).updatePlaneText(options as PlaneTextOptions);
            n.position = endConfig.position(d);
          });
        }
      }
    }
    if (createLabel.z && axes.options.scale?.z != undefined){
      // Only dispose and recreate if the number of ticks changed or we have a transition
      const tickCountChanged = !previous_selection.z || previous_selection.z.selected.length !== ticks.z.length;
      
      if (tickCountChanged) {
        if (transitionOptions) {
          const startConfig = labelZDefaults(axes.tempAxes, textHeightPrev)
          const endConfig = labelZDefaults(axes, textHeight)
          selections.z = labelBuilder(startConfig, ticks.z);
          selections.z.transition(transitionOptions).tween((d,n,i) => {
            let interpolate = interpolateObject(n.position, endConfig.position(d));
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            return (t) => {
              n.position = interpolate(t);
              (n as PlaneText).updatePlaneText(options as PlaneTextOptions)
            }
          })
        } else {
          selections.z = labelBuilder(labelZDefaults(axes, textHeight), ticks.z)
        }
        
        // Wait for all new labels to be ready before disposing old ones
        if (previous_selection.z) {
          const readyPromises = selections.z.selected.map((n: PlaneText) => n.ready);
          Promise.all(readyPromises).then(() => {
            previous_selection.z.dispose();
          });
        }
      } else {
        // Reuse existing labels, just update them
        selections.z = previous_selection.z;
        const endConfig = labelZDefaults(axes, textHeight);
        
        if (transitionOptions) {
          selections.z.transition(transitionOptions).tween((d,n,i) => {
            let interpolate = interpolateObject(n.position, endConfig.position(d));
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            return (t) => {
              n.position = interpolate(t);
              (n as PlaneText).updatePlaneText(options as PlaneTextOptions)
            }
          })
        } else {
          // No transition, just update properties
          selections.z.each((d, n, i) => {
            let options = clone(endConfig.options);
            options['text'] = endConfig.options['text'](d);
            (n as PlaneText).updatePlaneText(options as PlaneTextOptions);
            n.position = endConfig.position(d);
          });
        }
      }   
    }
      return selections

}
