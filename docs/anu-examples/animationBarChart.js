// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/cars.json' assert {type: 'json'};

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function animationBarChart(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(2, 2, -3.5);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Get the unique values for our categorical and ordinal dimensions
  const origin = [...new Set(data.map(item => item.Origin))];
  const cylinders = [...new Set(data.map(item => item.Cylinders))].sort().reverse();
  //Aggregate our data to the mean horsepower and MPG for the two above dimensions: origin and cylinders
  let carsRollup = d3.flatRollup(data, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                          Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}},
                                                          d => d.Origin,
                                                          d => d.Cylinders);
  carsRollup = carsRollup.map(([Origin, Cylinders, Data]) => ({ Origin, Cylinders, ...Data }));

  //Get extents for our linear dimensions: horsepower and MPG
  const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))]);
  const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))]).reverse();

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleBand().domain(cylinders).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,2]);
  let scaleZ = d3.scaleBand().domain(origin).range([-1,1]).paddingInner(1).paddingOuter(0.5);
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'interpolateOrRd' palette from D3
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toStandardMaterial()).domain(MPGMinMax);

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create box meshes as children of our CoT for our rolled-up data and set their visual encodings using method chaining
  let bars = chart.bind('box', { height: 1, width: 0.35, depth: 0.35 }, carsRollup)
                  .positionX((d) => scaleX(d.Cylinders))
                  .positionZ((d) => scaleZ(d.Origin))
                  .material((d, i) => scaleC(d.Miles_per_Gallon))
                  .positionY((d,n,i) => 0)        //To give the "growing bar" effect, set the starting positionY and height of the bars to before the .transition() is called
                  .scalingY((d,n,i) => 0)

  bars.transition((d,n,i) => ({                   //Start the transition, arrow function allows us to customize transition properties per each Mesh in our Selection
        duration: 1500,                           //Duration of the animation in milliseconds
        loopMode: 0,                              //0: no loop, 1: loop
        delay: i * 400,                           //Delay to apply to this Mesh's animation in milliseconds, here we stagger it based on its index i
        easingFunction: ( function() {            //See https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#easing-functions
          let sineEase = new BABYLON.SineEase();  //Here we use this syntax to modify the EasingMode in-line, otherwise you should instantiate the object separately beforehand
          sineEase.setEasingMode(2);
          return sineEase;
        }) (),
        onAnimationEnd: () => {}                  //Callback function when the animation on this Mesh ends
      }))                                         //All changes after this part of the function chain are now animated
      .scalingY((d,n,i) => scaleY(d.Horsepower))
      .positionY((d,n,i) => scaleY(d.Horsepower) / 2);

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });

  //Adjust the position of the chart slightly
  chart.positionY(-1);

  return scene;
}