// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//todo for update grid we will need to either change to greased mesh or dispose and redraw the lines systems.

import { Color3, Vector3, Mesh} from '@babylonjs/core';
import { Axes } from './Axis';
import assign from 'lodash-es/assign';
import { TransitionOptions } from '../../selection/animation/transition';
import { create } from '../../create';
import { Selection } from '../../selection';
import { interpolateNumberArray } from 'd3-interpolate';

export function grid(this: Axes) {

  let ticks = buildTicks(this.scales, this.options.gridTicks);

  let lines = buildLinesArray(this.scales, ticks);
 
  let default_options = {lines: (d) => d.vectors, updatable: true};

  let default_properties = { name: (d) => this.name + '_grid_' + d.axis, alpha: 0.3, color: Color3.White() };
  
  let girdSelections: Mesh[] = [];
  
  for (let key in lines){
    if (this.options.grid?.[key] || this.options.grid) {
      let gridOptions = this.options.gridOptions[key] ?? this.options.gridOptions;
      let gridProperties = this.options.gridProperties[key] ?? this.options.gridProperties;

      // @ts-ignore
      let tickMesh = this.CoT.bind('lineSystem',  assign({}, default_options, gridOptions), [lines[key]]).props(
        assign({}, default_properties, gridProperties),
      );
      girdSelections.push(tickMesh.selected[0] as Mesh);
    }
  }

  return new Selection(girdSelections, this._scene);
}

export function updateGrid(axes: Axes, transitionOptions: TransitionOptions){

  const ticks = buildTicks(axes.scales, axes.options.gridTicks);

  const ticksPrev = buildTicks(axes.tempScales, axes.options.gridTicks);

  const linesArrayPrev = buildLinesArray(axes.tempScales, ticks);

  const linesArray = buildLinesArray(axes.scales, ticks);

  //axes.grid.dispose();

  let previous_selection = axes.grid;

  let default_options = {lines: (d) => d.vectors, updatable: true};

  let default_properties = { name: (d) => axes.name + '_grid_' + d.axis, alpha: 0.3, color: Color3.White() };
  

  let gridSelections: Mesh[] = [];

  axes._scene.onBeforeRenderObservable.addOnce(() => {
    previous_selection.run((d,n) => n.setEnabled(false))
      let count = 0;
      if (transitionOptions ){
        for (let key in linesArray){
          if (axes.options.grid[key]){
            let gridOptions = axes.options.gridOptions[key] ?? {};
            let gridProperties = axes.options.gridProperties[key] ?? {};

            // @ts-ignore
            let tickMesh = axes.CoT.bind('lineSystem',  assign({}, default_options, gridOptions), [linesArrayPrev[key]]).props(
              assign({}, default_properties, gridProperties),
            );

          

            gridSelections.push(tickMesh.selected[0] as Mesh);
          }
        }
    
        let gridSelection = new Selection(gridSelections, axes._scene);
        
        axes.grid = gridSelection;
          
        gridSelection.transition(transitionOptions).tween((d,n,i) => {
          const flattenedArrayPrev: number[] = linesArrayPrev[d.axis].vectors.flat().flatMap(vector => [vector.x, vector.y, vector.z]);
          const flattenedArray: number[] = linesArray[d.axis].vectors.flat().flatMap(vector => [vector.x, vector.y, vector.z]);
            
          let interpolate = interpolateNumberArray(flattenedArrayPrev, flattenedArray)

          return (t) => {
            try {
              create('lineSystem', n.name,  {lines: convertToVector3List(interpolate(t)), updatable: true, instance: n})
            } catch {}
          }
        })
      } else {
        for (let key in linesArray){
          if (axes.options.grid?.[key] || axes.options.grid){
            let gridOptions = axes.options.gridOptions[key] ?? {};
            let gridProperties = axes.options.gridProperties[key] ?? {};

            // @ts-ignore
            let tickMesh = axes.CoT.bind('lineSystem',  assign({}, default_options, gridOptions), [linesArray[key]]).props(
              assign({}, default_properties, gridProperties),
            );

            gridSelections.push(tickMesh.selected[0] as Mesh);
          }
        }
    
        let gridSelection = new Selection(gridSelections, axes._scene);
        
        axes.grid = gridSelection;
          
      }

    
    
    // previous_selection.run((d,n) => {
    //   (n as Mesh).onBeforeRenderObservable.addOnce(() => n.dispose(false, true));
    // })


    axes._scene.onAfterRenderObservable.addOnce(() => {
      previous_selection.dispose();
    })
    
  
    
    //axes._scene.unregisterBeforeRender(gridUpdater);
});

  //axes._scene.registerBeforeRender(gridUpdater);

}

// Function to convert a flat array into a list of arrays, each containing three Vector3 objects
function convertToVector3List(flatArray: number[]): Vector3[][] {
  const vector3List: Vector3[][] = [];

  for (let i = 0; i < flatArray.length; i += 9) {
    const vector1 = new Vector3(flatArray[i], flatArray[i + 1], flatArray[i + 2]);
    const vector2 = new Vector3(flatArray[i + 3], flatArray[i + 4], flatArray[i + 5]);
    const vector3 = new Vector3(flatArray[i + 6], flatArray[i + 7], flatArray[i + 8]);
    vector3List.push([vector1, vector2, vector3]);
  }

  return vector3List;
}

function buildTicks(scales, ticks?){
  let scaleX = scales.x.scale;
  let domainX = scales.x.domain;
  scaleX?.clamp?.(true);

  let scaleY = scales.y.scale;
  let domainY = scales.y.domain;
  scaleY?.clamp?.(true);

  let scaleZ = scales.z.scale;
  let domainZ = scales.z.domain;
  scaleZ?.clamp?.(true);

  let builtTicks: {x?: any[], y?: any[], z?: any[]} = {};

  builtTicks.x = ticks?.x ? ticks.x : scaleX?.ticks?.() ?? domainX; 
  builtTicks.y = ticks?.y ? ticks.y : scaleY?.ticks?.() ?? domainY; 
  builtTicks.z = ticks?.z ? ticks.z : scaleZ?.ticks?.() ?? domainZ; 

  

  return builtTicks;
}

function buildLinesArray(scales, ticks){

  let scaleX = scales.x.scale;
  let rangeX = scales.x.range;
  scaleX?.clamp?.(true);

  let scaleY = scales.y.scale;
  let rangeY = scales.y.range;
  scaleY?.clamp?.(true);

  let scaleZ = scales.z.scale;
  let rangeZ = scales.z.range;
  scaleZ?.clamp?.(true);

  let linesArray: {x?: {axis: 'x', vectors: Vector3[][]}, y?: {axis: 'y', vectors: Vector3[][]}, z?: {axis: 'z', vectors: Vector3[][]}} = {};

  if (scaleX != undefined) {

    linesArray.x = {axis: 'x', vectors: []}
 
    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];

    tickPosition = (d) => [
      new Vector3(scaleX(d), rangeY[0], rangeZ[0]),
      new Vector3(scaleX(d), rangeY[0], rangeZ[1]),
      new Vector3(scaleX(d), rangeY[1], rangeZ[1]),
    ];

    for (var tick of ticks.x) {
      linesArray.x.vectors.push(tickPosition(tick));
    }
  }

  if (scaleY != undefined) {

    linesArray.y = {axis: 'y', vectors: []}

    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];

    tickPosition = (d) => [
      new Vector3(rangeX[0], scaleY(d), rangeZ[0]),
      new Vector3(rangeX[0], scaleY(d), rangeZ[1]),
      new Vector3(rangeX[1], scaleY(d), rangeZ[1]),
    ];

    for (var tick of ticks.y) {
      linesArray.y.vectors.push(tickPosition(tick));
    }
  }

  if (scaleZ != undefined) {
  
    linesArray.z = {axis: 'z', vectors: []}

    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];

    tickPosition = (d) => [
      new Vector3(rangeX[1], rangeY[0], scaleZ(d)),
      new Vector3(rangeX[0], rangeY[0], scaleZ(d)),
      new Vector3(rangeX[0], rangeY[1], scaleZ(d)),
    ];

    for (var tick of ticks.z) {
      linesArray.z.vectors.push(tickPosition(tick));
    }
  }

  return linesArray;
}