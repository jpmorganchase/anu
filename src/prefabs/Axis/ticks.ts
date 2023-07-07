import { Vector3 } from '@babylonjs/core';
import { Axis } from './Axis';
import assign from 'lodash-es/assign';

// export function ticks(this: Axis) {
//   let boundingBox = this.boundingBox;
//   const domain = this.scale.domain();
//   let range = this.scale.range();
//   range = [range[0], range[1]];

//   let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];

//   let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
//   try {
//     ticks = this.scale.ticks();
//   } catch {
//     ticks = domain;
//   }

//   switch (this.axis) {
//     case 'x': {
//       tickPosition = (d) => [
//         new Vector3(this.scale(d.text), boundingBox.minimum.y, boundingBox.minimum.z),
//         new Vector3(this.scale(d.text), boundingBox.minimum.y, boundingBox.maximum.z),
//         new Vector3(this.scale(d.text), boundingBox.maximum.y, boundingBox.maximum.z),
//       ];
//       break;
//     }
//     case 'y': {
//       tickPosition = (d) => [
//         new Vector3(boundingBox.minimum.x, this.scale(d.text), boundingBox.minimum.z),
//         new Vector3(boundingBox.minimum.x, this.scale(d.text), boundingBox.maximum.z),
//         new Vector3(boundingBox.maximum.x, this.scale(d.text), boundingBox.maximum.z),
//       ];
//       break;
//     }
//     case 'z': {
//       tickPosition = (d) => [
//         new Vector3(boundingBox.maximum.x, boundingBox.minimum.y, this.scale(d.text)),
//         new Vector3(boundingBox.minimum.x, boundingBox.minimum.y, this.scale(d.text)),
//         new Vector3(boundingBox.minimum.x, boundingBox.maximum.y, this.scale(d.text)),
//       ];
//       break;
//     }
//     default: {
//       break;
//     }
//   }

//   let tickMesh = this.cot
//     .bind(
//       'lines',
//       { points: tickPosition },
//       ticks.map((x: any) => {
//         return { text: x };
//       }),
//     )
//     .attr('name', this.name + '_tick')
//     .attr('alpha', 0.3);

//   //this.selections['ticks'] = tickMesh;

//   return this;
// }


export function tickAlt(
  this: Axis, 
  labels: {x: [] | undefined, y: [] | undefined, z:[] | undefined} = {x: undefined, y: undefined, z: undefined},
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
  

  let linesArray = [];


  if (this.options.x != undefined){
   

   
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    if (labels.x === undefined){
      try {
        ticks = scaleX.ticks();
      } catch {
        ticks = domainX;
      }
    } else {
    ticks = labels.x
    }

    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];
  
    tickPosition = (d) => [
      new Vector3(scaleX(d), rangeY[0], rangeZ[0]),
      new Vector3(scaleX(d), rangeY[0], rangeZ[1]),
      new Vector3(scaleX(d), rangeY[1], rangeZ[1]),
    ];

 
    for (var tick of ticks){
      linesArray.push(tickPosition(tick));
    }
    
}
  
  if (this.options.y != undefined){
    
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    if (labels.y === undefined){
      try {
        ticks = scaleY.ticks();
      } catch {
        ticks = domainY;
      }
  } else {
  ticks = labels.y
  }

    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];
  
    tickPosition = (d) => [
      new Vector3(rangeX[0], scaleY(d), rangeZ[0]),
      new Vector3(rangeX[0], scaleY(d), rangeZ[1]),
      new Vector3(rangeX[1], scaleY(d), rangeZ[1]),
    ];

    for (var tick of ticks){
      linesArray.push(tickPosition(tick));
    }
  }

  if (this.options.z != undefined){
    
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    if (labels.z === undefined){
      try {
        ticks = scaleZ.ticks();
      } catch {
        ticks = domainZ;
      }
  } else {
    ticks = labels.z
  }

    let tickPosition: Vector3[] | ((d: any) => Vector3[]) = [new Vector3(0, 0, 0)];
  
    tickPosition = (d) => [
      new Vector3(rangeX[1], rangeY[0], scaleZ(d)),
      new Vector3(rangeX[0], rangeY[0], scaleZ(d)),
      new Vector3(rangeX[0], rangeY[1], scaleZ(d)),
    ];

    for (var tick of ticks){
      linesArray.push(tickPosition(tick));
    }
  }

  let default_options = {text: (d: any) => d.text, fontSize: 60, fontColor: 'white' };

  let default_properties = {};

  let tickMesh = this.CoT.bind('lineSystem', { lines: linesArray }).attr('name', this.name + '_tick').attr('alpha', 0.3);

  return this;
}