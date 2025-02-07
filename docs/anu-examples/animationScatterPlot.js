
// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import * as gui from '@babylonjs/gui';
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, SineEase } from '@babylonjs/core';
import iris from './data/iris.json' assert {type: 'json'};  //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function animationScatterPlot(engine) {

  //Babylon boilerplate
  const scene = new Scene(engine);
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  camera.position = new Vector3(2, 2.5, -3);

  //Scaling functions
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create Center of Transform
  let CoT = anu.create("cot", "cot");
  let chart = anu.selectName("cot", scene);

  //Create spheres
  let spheres = chart.bind('sphere', { diameter: 0.05 }, iris)
                      .position((d) => Vector3.Zero())        //Set the position of the spheres before any transition has begun
                      .material((d) => scaleC(d.species));    //We need to use the arrow function here despite setting a uniform value, otherwise the animation will not work properly

  //Create a variable for the scatterplot axes so that we can access it easily
  let axes;

  //Create our functions which will change the scatterplot to two hardcoded states
  //Create our easing function, see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#easing-functions
  let sineEase = new SineEase();
  sineEase.setEasingMode(2);

  function changeState1() {
    //Create scales for this state
    let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice();
    let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice();
    let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice();

    spheres.transition((d,n,i) => ({        //Start the transition, arrow function allows us to customize transition properties per each Mesh in our selection
            duration: 2000,                 //Duration of the animation in milliseconds
            loopMode: 0,                    //0: no loop, 1: loop
            delay: 0,                       //Delay to apply to this Mesh's animation in milliseconds
            easingFunction: sineEase,       //Set our EasingFunction
            onAnimationEnd: () => {}        //Callback function when the animation on this Mesh ends
            }))
            .positionX((d,n,i) => scaleX(d.sepalLength))
            .positionY((d,n,i) => scaleY(d.sepalWidth))
            .positionZ((d,n,i) => scaleZ(d.petalLength));
    

    //Destroy the previous axes if it exists
    axes?.CoT.dispose();
    //Create axes
    axes = anu.createAxes('axes', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } });
  }

  //Same as above but with different data dimensions
  function changeState2() {
    let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice();
    let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice();
    let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalWidth}))).range([-1,1]).nice();

    spheres.transition((d,n,i) => ({
            duration: 2000,
            loopMode: 0,
            delay: 0,
            easingFunction: sineEase,
            onAnimationEnd: () => {}
            }))
            .positionX((d,n,i) => scaleX(d.sepalWidth))
            .positionY((d,n,i) => scaleY(d.sepalLength))
            .positionZ((d,n,i) => scaleZ(d.petalWidth));
            
    //Destroy the previous axes if it exists
    axes?.CoT.dispose();

    //Create axes
    axes = anu.createAxes('axes', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } });
  }

  //Call our function to initially change the data dimensions of the scatterplot
  changeState1();


  //Create a 2D GUI with buttons that, when clicked, will change our scatterplot between the two states
  let advancedTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  let rect1 = gui.Button.CreateSimpleButton("button1", "State 1");
  rect1.width = 0.1;
  rect1.height = "40px";
  rect1.cornerRadius = 2;
  rect1.color = "white";
  rect1.thickness = 4;
  rect1.background = "blue";
  rect1.top = "30%";
  rect1.left = "-25%";
  rect1.onPointerClickObservable.add(() => {
      changeState1();
  });

  let rect2 = gui.Button.CreateSimpleButton("button2", "State 2");
  rect2.width = 0.1;
  rect2.height = "40px";
  rect2.cornerRadius = 2;
  rect2.color = "white";
  rect2.thickness = 4;
  rect2.background = "blue";
  rect2.top = "30%";
  rect2.left = "25%";
  rect2.onPointerClickObservable.add(() => {
      changeState2();
  });

  advancedTexture.addControl(rect1);
  advancedTexture.addControl(rect2);

  return scene;
}