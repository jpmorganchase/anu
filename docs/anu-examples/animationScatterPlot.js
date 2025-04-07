// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as d3 from 'd3';
import data from './data/iris.json' assert {type: 'json'};

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function animationScatterPlot(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(2, 2.5, -4);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create a D3 scale for color, using Anu helper functions map scale outputs to Color4 objects based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create sphere meshes as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bind('sphere', { diameter: 0.05 }, data)
                     .position((d) => BABYLON.Vector3.Zero())  //Set the position of the spheres before any transition has begun
                     .material((d) => scaleC(d.species));

  //Create a variable for the our Axes prefab so that we can easily access it from other scopes
  let axes;
  //Create an AxesConfig which will store the options for our axes between states
  let axesOptions = new anu.AxesConfig({});   //Blank object since we will be filling in the axis scales later
  axesOptions.parent = chart;

  //Transition variables
  let sineEase = new BABYLON.SineEase();
  sineEase.setEasingMode(2);
  let animDuration = 1000;

  //Updates our spheres to a predefined set of data dimensions
  function changeState1() {
    //Create D3 scales for this state
    let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalLength))).range([-1,1]).nice();
    let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalWidth))).range([-1,1]).nice();
    let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.petalLength))).range([-1,1]).nice();

    spheres.transition({ duration: animDuration, easingFunction: sineEase })
           .position((d,n,i) => new BABYLON.Vector3(scaleX(d.sepalLength), scaleY(d.sepalWidth), scaleZ(d.petalLength)));
    
    //Update our AxesConfig with our new scales
    axesOptions.scale.x = scaleX;
    axesOptions.scale.y = scaleY;
    axesOptions.scale.z = scaleZ;

    //Create or update axes
    if (!axes) {
      axes = anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });
    }
    else {
      //Update the Axes and pass in transition options to enable an animation
      axes.updateAxes(axesOptions, { duration: animDuration, easingFunction: sineEase });
    }
  }

  //Same as above but with different data dimensions
  function changeState2() {
    let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalWidth))).range([-1,1]).nice();
    let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalLength))).range([-1,1]).nice();
    let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.petalWidth))).range([-1,1]).nice();

    spheres.transition({ duration: animDuration, easingFunction: sineEase })
           .position((d,n,i) => new BABYLON.Vector3(scaleX(d.sepalWidth), scaleY(d.sepalLength), scaleZ(d.petalWidth)));
            
    axesOptions.scale.x = scaleX;
    axesOptions.scale.y = scaleY;
    axesOptions.scale.z = scaleZ;

    if (!axes) {
      axes = anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });
    }
    else {
      axes.updateAxes(axesOptions, { duration: animDuration, easingFunction: sineEase });
    }
  }

  //Call our function to initially change the data dimensions of the scatter plot
  changeState1();

  //Create a 2D GUI with buttons that, when clicked, will change our scatter plot between the two states
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

  let rect1 = GUI.Button.CreateSimpleButton('button1', 'State 1');
  rect1.width = 0.1;
  rect1.height = '40px';
  rect1.cornerRadius = 2;
  rect1.color = 'white';
  rect1.thickness = 4;
  rect1.background = 'blue';
  rect1.top = '30%';
  rect1.left = '-25%';
  rect1.onPointerClickObservable.add(() => {
      changeState1();
  });

  let rect2 = GUI.Button.CreateSimpleButton('button2', 'State 2');
  rect2.width = 0.1;
  rect2.height = '40px';
  rect2.cornerRadius = 2;
  rect2.color = 'white';
  rect2.thickness = 4;
  rect2.background = 'blue';
  rect2.top = '30%';
  rect2.left = '25%';
  rect2.onPointerClickObservable.add(() => {
      changeState2();
  });

  advancedTexture.addControl(rect1);
  advancedTexture.addControl(rect2);

  return scene;
}