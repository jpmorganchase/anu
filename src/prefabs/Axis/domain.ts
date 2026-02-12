// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

  import {
  Vector3,
  Color3,
  CreateGreasedLine,
  GreasedLineMeshBuilderOptions,
  GreasedLineMaterialBuilderOptions,
  GreasedLineMesh,
  GreasedLineBaseMesh,
  VertexBuffer,
  AbstractMesh
} from '@babylonjs/core';
import { assign } from 'lodash-es';
import { Axes } from './Axis';
import { Selection } from '../../selection';
import { interpolateNumberArray } from 'd3-interpolate';
import { TransitionOptions } from '../../selection/animation/transition';

export function domain(this: Axes): Selection {
  let scaleX = this.scales.x.scale;
  let rangeX = this.scales.x.range;
  let domainX = this.scales.x.domain;

  let scaleY = this.scales.y.scale;
  let rangeY = this.scales.y.range;
  let domainY = this.scales.y.domain;

  let scaleZ = this.scales.z.scale;
  let rangeZ = this.scales.z.range;
  let domainZ = this.scales.z.domain;

  let scaleMultiplier = (scaleX != undefined ? Math.abs(rangeX[1] - rangeX[0]) : 0) +
                        (scaleY != undefined ? Math.abs(rangeY[1] - rangeY[0]) : 0) +
                        (scaleZ != undefined ? Math.abs(rangeZ[1] - rangeZ[0]) : 0)
  let domainSize = scaleMultiplier * 0.0025;
  let halfWidth = domainSize / 2;
  let domainOffset = this.options.domainOffset ?? -0.001;
  
  // Determine direction of each axis (positive or negative)
  const xDir = rangeX[1] >= rangeX[0] ? 1 : -1;
  const yDir = rangeY[1] >= rangeY[0] ? 1 : -1;
  const zDir = rangeZ[1] >= rangeZ[0] ? 1 : -1;

  let default_material: GreasedLineMaterialBuilderOptions = {
    createAndAssignMaterial: true,
    width: domainSize,
    sizeAttenuation: false,
    materialType: 0,
    color: Color3.White(),
    colorMode: 0,
    useColors: false,
    useDash: false,
    visibility: 1
  };

  let greasedLines: AbstractMesh[] = [];
  let instance: GreasedLineBaseMesh | undefined;
  
  // Create Y-axis domain line (vertical line at origin)
  // Extended in the opposite direction of yDir by 2*halfWidth to overlap with X-axis width at offset position
  // Offset left by halfWidth to align to bottom of scale
  if (this.options.scale?.y != undefined) {
    // Y-axis start extends past rangeY[0] in the direction opposite to where the axis goes
    const yAxisStart = rangeY[0] - (halfWidth * 2 * yDir);
    let pathY: Vector3[] = [
      new Vector3(rangeX[0] - (halfWidth * xDir), yAxisStart, rangeZ[0] + domainOffset),
      new Vector3(rangeX[0] - (halfWidth * xDir), rangeY[1], rangeZ[0] + domainOffset)
    ];
    
    let default_options_y: GreasedLineMeshBuilderOptions = { 
      points: pathY, 
      updatable: true,
      instance,
      ribbonOptions: {
        closePath: false
      }
    };
    
    let greasedLineY = CreateGreasedLine(
      this.name + '_domain',
      assign({}, default_options_y, this.options.domainOptions),
      assign({}, default_material, this.options.domainMaterialOptions),
      this._scene,
    );
    
    if (!instance) {
      instance = greasedLineY;
      instance.parent = this.CoT.selected[0];
      instance.metadata = { data: {}, axes: ['y'] };
      instance.isPickable = false;
      instance.billboardMode = 0;
      greasedLines.push(instance);
    }
  }

  // Add X-axis domain line to the instance
  // Extended left by halfWidth to overlap with Y-axis and slightly right to overlap with Z-axis
  // Offset in opposite direction of yDir by halfWidth to align to bottom of scale
  if (this.options.scale?.x != undefined && instance) {
    const xAxisY = rangeY[0] - (halfWidth * yDir);
    let pathX: Vector3[] = [
      new Vector3(rangeX[0] - (halfWidth * xDir), xAxisY, rangeZ[0] + domainOffset),
      new Vector3(rangeX[1] - (domainOffset * xDir) + (halfWidth * 0.1 * xDir), xAxisY, rangeZ[0] + domainOffset)
    ];
    
    let default_options_x: GreasedLineMeshBuilderOptions = { 
      points: pathX, 
      updatable: true,
      instance,
      ribbonOptions: {
        closePath: false
      }
    };
    
    CreateGreasedLine(
      this.name + '_domain',
      assign({}, default_options_x, this.options.domainOptions),
      assign({}, default_material, this.options.domainMaterialOptions),
      this._scene,
    );
    
    instance.metadata.axes.push('x');
  }

  // Add Z-axis domain line to the instance
  // Extended slightly backward to overlap with X-axis
  // Offset in opposite direction of yDir by halfWidth to align to bottom of scale
  if (this.options.scale?.z != undefined && instance) {
    const zAxisY = rangeY[0] - (halfWidth * yDir);
    let pathZ: Vector3[] = [
      new Vector3(rangeX[1] - (domainOffset * xDir), zAxisY, rangeZ[0] + domainOffset + (halfWidth * 0.1 * zDir)),
      new Vector3(rangeX[1] - (domainOffset * xDir), zAxisY, rangeZ[1])
    ];
    
    let default_options_z: GreasedLineMeshBuilderOptions = { 
      points: pathZ, 
      updatable: true,
      instance,
      ribbonOptions: {
        closePath: false,
        directions: [new Vector3(0, 1, 0), new Vector3(0, 1, 0)]
      }
    };
    
    CreateGreasedLine(
      this.name + '_domain',
      assign({}, default_options_z, this.options.domainOptions),
      assign({}, default_material, this.options.domainMaterialOptions),
      this._scene,
    );
    
    instance.metadata.axes.push('z');
  }

  let domain = new Selection(greasedLines, this._scene);

  return domain;
}


export function updateDomain(axes: Axes, transitionOptions: TransitionOptions) {
  const rangeX = axes.scales.x.range;
  const rangeY = axes.scales.y.range;
  const rangeZ = axes.scales.z.range;
  
  const scaleMultiplier = (rangeX ? Math.abs(rangeX[1] - rangeX[0]) : 0) +
                          (rangeY ? Math.abs(rangeY[1] - rangeY[0]) : 0) +
                          (rangeZ ? Math.abs(rangeZ[1] - rangeZ[0]) : 0);
  const domainSize = scaleMultiplier * 0.0025;
  const halfWidth = domainSize / 2;
  const domainOffset = axes.options.domainOffset ?? -0.001;
  
  // Determine direction of each axis (positive or negative)
  const xDir = rangeX[1] >= rangeX[0] ? 1 : -1;
  const yDir = rangeY[1] >= rangeY[0] ? 1 : -1;
  const zDir = rangeZ[1] >= rangeZ[0] ? 1 : -1;

  // Update X-axis domain line
  if (axes.options.scale?.x != undefined) {
    const domainX = axes.domain.selected.find(mesh => mesh.metadata?.axis === 'x') as GreasedLineMesh;
    if (domainX) {
      const xAxisY = rangeY[0] - (halfWidth * yDir);
      const pathX: Vector3[] = [
        new Vector3(rangeX[0] - (halfWidth * xDir), xAxisY, rangeZ[0] + domainOffset),
        new Vector3(rangeX[1] - (domainOffset * xDir) + (halfWidth * 0.1 * xDir), xAxisY, rangeZ[0] + domainOffset)
      ];
      
      const originalPositionsX = domainX.getVerticesData(VertexBuffer.PositionKind);
      const flattenedArrayX: number[] = pathX.flatMap(vector => [vector.x, vector.y, vector.z, vector.x, vector.y, vector.z]);
      
      if (transitionOptions) {
        const interpolate = interpolateNumberArray(originalPositionsX, flattenedArrayX);
        axes.domain.filter((d, n) => n.metadata?.axis === 'x').transition(transitionOptions).tween((d, n) => {
          return (t) => {
            (n as GreasedLineMesh).updateVerticesData(VertexBuffer.PositionKind, interpolate(t));
          };
        });
      } else {
        domainX.updateVerticesData(VertexBuffer.PositionKind, flattenedArrayX);
      }
    }
  }

  // Update Y-axis domain line
  if (axes.options.scale?.y != undefined) {
    const domainY = axes.domain.selected.find(mesh => mesh.metadata?.axis === 'y') as GreasedLineMesh;
    if (domainY) {
      const yAxisStart = rangeY[0] - (halfWidth * 2 * yDir);
      const pathY: Vector3[] = [
        new Vector3(rangeX[0] - (halfWidth * xDir), yAxisStart, rangeZ[0] + domainOffset),
        new Vector3(rangeX[0] - (halfWidth * xDir), rangeY[1], rangeZ[0] + domainOffset)
      ];
      
      const originalPositionsY = domainY.getVerticesData(VertexBuffer.PositionKind);
      const flattenedArrayY: number[] = pathY.flatMap(vector => [vector.x, vector.y, vector.z, vector.x, vector.y, vector.z]);
      
      if (transitionOptions) {
        const interpolate = interpolateNumberArray(originalPositionsY, flattenedArrayY);
        axes.domain.filter((d, n) => n.metadata?.axis === 'y').transition(transitionOptions).tween((d, n) => {
          return (t) => {
            (n as GreasedLineMesh).updateVerticesData(VertexBuffer.PositionKind, interpolate(t));
          };
        });
      } else {
        domainY.updateVerticesData(VertexBuffer.PositionKind, flattenedArrayY);
      }
    }
  }

  // Update Z-axis domain line
  if (axes.options.scale?.z != undefined) {
    const domainZ = axes.domain.selected.find(mesh => mesh.metadata?.axis === 'z') as GreasedLineMesh;
    if (domainZ) {
      const zAxisY = rangeY[0] - (halfWidth * yDir);
      const pathZ: Vector3[] = [
        new Vector3(rangeX[1] - (domainOffset * xDir), zAxisY, rangeZ[0] + domainOffset + (halfWidth * 0.1 * zDir)),
        new Vector3(rangeX[1] - (domainOffset * xDir), zAxisY, rangeZ[1])
      ];
      
      const originalPositionsZ = domainZ.getVerticesData(VertexBuffer.PositionKind);
      const flattenedArrayZ: number[] = pathZ.flatMap(vector => [vector.x, vector.y, vector.z, vector.x, vector.y, vector.z]);
      
      if (transitionOptions) {
        const interpolate = interpolateNumberArray(originalPositionsZ, flattenedArrayZ);
        axes.domain.filter((d, n) => n.metadata?.axis === 'z').transition(transitionOptions).tween((d, n) => {
          return (t) => {
            (n as GreasedLineMesh).updateVerticesData(VertexBuffer.PositionKind, interpolate(t));
          };
        });
      } else {
        domainZ.updateVerticesData(VertexBuffer.PositionKind, flattenedArrayZ);
      }
    }
  }
}