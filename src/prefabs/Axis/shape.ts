import { Vector3, Mesh, Color3, StandardMaterial, TransformNode } from '@babylonjs/core';
import { assign } from 'lodash-es';
import { Axis } from './Axis';

// export function shape(this: Axis, options: {} = {}, properties: {} = {}) {
//   const domain = this.scale.domain();
//   let range = this.scale.range();
//   range = [range[0], range[range.length - 1]];

//   let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
//   try {
//     ticks = this.scale.ticks();
//   } catch {
//     ticks = domain;
//   }

//   let boundingBox = this.boundingBox;
//   let path: [Vector3, Vector3] = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
//   let tubePosition: Vector3 = new Vector3(0, 0, 0);

//   switch (this.axis) {
//     case 'x': {
//       path = [
//         new Vector3(Math.min(range[0], boundingBox.minimum.x), 0, 0),
//         new Vector3(Math.max(range[1], boundingBox.maximum.x), 0, 0),
//       ];
//       tubePosition = new Vector3(
//         0,
//         Math.min(range[0], boundingBox.minimum.y),
//         Math.min(range[0], boundingBox.minimum.z),
//       );
//       break;
//     }
//     case 'y': {
//       path = [new Vector3(0, boundingBox.minimum.y, 0), new Vector3(0, boundingBox.maximum.y, 0)];
//       tubePosition = new Vector3(
//         Math.min(range[0], boundingBox.minimum.x),
//         0,
//         Math.min(range[0], boundingBox.minimum.z),
//       );
//       break;
//     }
//     case 'z': {
//       path = [
//         new Vector3(0, 0, Math.min(range[0], boundingBox.minimum.z)),
//         new Vector3(0, 0, Math.max(range[1], boundingBox.maximum.z)),
//       ];
//       tubePosition = new Vector3(
//         Math.max(range[1], boundingBox.maximum.x),
//         Math.min(range[0], boundingBox.minimum.y),
//         0,
//       );
//       break;
//     }
//     default: {
//       break;
//     }
//   }

//   let default_options = { path: path, radius: 0.5, cap: 2, sideOrientation: Mesh.DOUBLESIDE };

//   let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

//   let shapeMesh = this.cot
//     .bind('tube', assign({}, default_options, options))
//     .attr('name', this.name + '_shape')
//     .position(tubePosition)
//     .material(new StandardMaterial(name + '_material', this.scene))
//     .props(assign({}, default_properties, properties));

//   return this;
// }

export function shapeAlt(
  this: Axis, 
  options: {
    radius?: number;
} = {}, 
  properties: {} = {}
){

  let scaleX = this.scales.x.scale; 
  let rangeX = this.scales.x.range;
  let domainX = this.scales.x.domain;

  let scaleY = this.scales.y.scale; 
  let rangeY = this.scales.y.range;
  let domainY = this.scales.y.domain;

  let scaleZ = this.scales.z.scale; 
  let rangeZ = this.scales.z.range;
  let domainZ = this.scales.z.domain;

  let path = []

  if (this.options.y != undefined){
    path.push(new Vector3(rangeX[0], rangeY[1], rangeZ[0]))
   
  }
  if (this.options.x != undefined){
      path.push(new Vector3(rangeX[0], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[0]))
    
   }
  if (this.options.z != undefined){
      path.push( new Vector3(rangeX[1], rangeY[0], rangeZ[0]), new Vector3(rangeX[1], rangeY[0], rangeZ[1]))
  }

  let default_options = { path: path, radius: this.scales.size * 0.01, cap: 3};

  let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1};

  let shapeMeshX = this.CoT
  .bind('tube', assign({}, default_options, options))
  .attr('name', this.name + '_shape')
  //.position(tubePositionX)
  .material(new StandardMaterial(this.name + '_shape_material', this.scene))
  .props(assign({}, default_properties, properties))
  .run((n) => n.forceSharedVertices());

  // if (this.options.x != undefined){

  //   let pathX = [
  //     new Vector3(rangeX[0], 0, 0),
  //     new Vector3(rangeX[1], 0, 0),
  //   ];
  //   let tubePositionX = new Vector3(
  //     0,
  //     rangeY[0],
  //     rangeZ[0],
  //   );


  //   let default_options = { path: pathX, radius: Math.abs(rangeX[1] - rangeX[0]) * 0.01, cap: 2, sideOrientation: Mesh.DOUBLESIDE };

  //   let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

  //   let shapeMeshX = this.CoT
  //   .bind('tube', assign({}, default_options, options))
  //   .attr('name', this.name + '_shapeX')
  //   .position(tubePositionX)
  //   .material(new StandardMaterial(this.name + '_shapeX_material', this.scene))
  //   .props(assign({}, default_properties, properties));
  // }
  
  // if (this.options.y != undefined){

  //   let pathY = [new Vector3(0, rangeY[0], 0), new Vector3(0, rangeY[1], 0)];
  //   let tubePositionY = new Vector3(rangeX[0], 0, rangeZ[0]);

  //   let default_options = { path: pathY, radius: Math.abs(rangeY[1] - rangeY[0]) * 0.01, cap: 2, sideOrientation: Mesh.DOUBLESIDE };

  //   let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

  //   let shapeMeshY = this.CoT
  //   .bind('tube', assign({}, default_options, options))
  //   .attr('name', this.name + '_shapeY')
  //   .position(tubePositionY)
  //   .material(new StandardMaterial(this.name + '_shapeY_material', this.scene))
  //   .props(assign({}, default_properties, properties));
  // }

  // if (this.options.z != undefined){
  
  //   let pathZ = [new Vector3(0, 0, rangeZ[0]), new Vector3(0, 0, rangeZ[1])];
  //   let tubePositionZ = new Vector3(rangeX[1], rangeY[0], rangeZ[0] + (Math.abs(rangeZ[1] - rangeZ[0]) / 2));

  //   let default_options = { path: pathZ, radius: Math.abs(rangeZ[1] - rangeZ[0]) * 0.01, cap: 2, sideOrientation: Mesh.DOUBLESIDE };

  //   let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };

  //   let shapeMesh = this.CoT
  //   .bind('tube', assign({}, default_options, options))
  //   .attr('name', this.name + '_shapeZ')
  //   .position(tubePositionZ)
  //   .material(new StandardMaterial(this.name + '_shapeZ_material', this.scene))
  //   .props(assign({}, default_properties, properties));
  // }

  return this;
}
