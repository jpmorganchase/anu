// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, SineEase } from '@babylonjs/core';
import cars from './data/cars.json' assert {type: 'json'};  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function animationBarChart(engine) {

  //Babylon boilerplate
  const scene = new Scene(engine);
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  camera.position = new Vector3(2, 2.5, -3);
  
  //Data transformations
  const origin = [...new Set(cars.map(item => item.Origin))];
  const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort().reverse();
  let carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                          Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}},
                                                          d => d.Origin,
                                                          d => d.Cylinders);
  carsRollup = carsRollup.map(([Origin, Cylinders, Data]) => ({ Origin, Cylinders, ...Data }));

  //Data scales
  const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))]);
  const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))]).reverse();
  let scaleX = d3.scaleBand().domain(cylinders).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,2]).nice();
  let scaleZ = d3.scaleBand().domain(origin).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toStandardMaterial()).domain(MPGMinMax);

  //Create the chart's Center of Transformation
  let CoT = anu.create("cot", "cot");
  let chart = anu.selectName("cot", scene);
  
  //Create the bars
  let bars = chart.bind('box', { height: 1, width: 0.3, depth: 0.3 }, carsRollup)
                  .positionX((d,n,i) => scaleX(d.Cylinders))  //These encodings are called before the .transition() function in the chain and are therefore not animated
                  .positionZ((d,n,i) => scaleZ(d.Origin))
                  .material((d,n,i) => scaleC(d.Miles_per_Gallon))
                  .positionY((d,n,i) => 0)                    //To give the "growing bar" effect, set the starting positionY and height of the bars to before the .transition() is called
                  .scalingY((d,n,i) => 0)                     //We need to use the arrow function here despite setting a uniform value, otherwise the animation will not work properly
                  .transition((d,n,i) => ({                   //Start the transition, arrow function allows us to customize transition properties per each Mesh in our selection
                    duration: 1500,                           //Duration of the animation in milliseconds
                    loopMode: 0,                              //0: no loop, 1: loop
                    delay: i * 400,                           //Delay to apply to this Mesh's animation in milliseconds, here we stagger it based on its index i
                    easingFunction: ( function() {            //See https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#easing-functions
                        let sineEase = new SineEase();        //Here we use this syntax to modify the EasingMode in-line, otherwise you should instantiate the object separately beforehand
                        sineEase.setEasingMode(2);
                        return sineEase;
                  }) (),
                  onAnimationEnd: () => {}                    //Callback function when the animation on this Mesh ends
                  }))                                         //All encodings after this part of the function chain are now animated
                  .scalingY((d,n,i) => scaleY(d.Horsepower))
                  .positionY((d,n,i) => scaleY(d.Horsepower) / 2);


  //Create axes
  anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } });

  //Adjust chart position
  chart.positionY(-0.75);

  return scene;
}