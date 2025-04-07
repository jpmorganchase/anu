// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/cars.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const brushingLinkingSingle = function(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0.5, -5);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Create a scatter plot and put it on the left
  let scaleX1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Miles_per_Gallon))).range([-1,1]).nice();
  let scaleY1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Weight_in_lbs))).range([-1,1]).nice();
  let scaleZ1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Acceleration))).range([-1,1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  let CoT1 = anu.create('cot', 'cot1');
  let chart1 = anu.selectName('cot1', scene);
  let spheres1 = chart1.bind('sphere', { diameter: 0.075 }, data)
                       .position((d) => new BABYLON.Vector3(scaleX1(d.Miles_per_Gallon), scaleY1(d.Weight_in_lbs), scaleZ1(d.Acceleration)))
                       .material((d) => scaleC(d.Origin));
                       
  anu.createAxes('myAxes1', { scale: { x: scaleX1, y: scaleY1, z: scaleZ1 }, parent: chart1 });
  chart1.position(new BABYLON.Vector3(-1.25, 0, 0));
  

  //Create a scatter plot and put it on the right
  let scaleX2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Cylinders))).range([-1,1]).nice();
  let scaleY2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Displacement))).range([-1,1]).nice();
  let scaleZ2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Horsepower))).range([-1,1]).nice();

  let CoT2 = anu.create('cot', 'cot2');
  let chart2 = anu.selectName('cot2', scene);
  let spheres2 = chart2.bind('sphere', { diameter: 0.075 }, data)
                       .position((d) => new BABYLON.Vector3(scaleX2(d.Cylinders), scaleY2(d.Displacement), scaleZ2(d.Horsepower)))
                       .material((d) => scaleC(d.Origin));

  anu.createAxes('myAxes2', { scale: { x: scaleX2, y: scaleY2, z: scaleZ2 }, parent: chart2 });
  chart2.position(new BABYLON.Vector3(1.5, 0, 0));
  

  //Make a new selection with all the spheres so that we only need to call .action() once to affect both scatter plots
  let allSpheres = anu.selectName('sphere', scene)
                      .action((d,n,i) => new BABYLON.ExecuteCodeAction(                   //When the pointer over event happens, select all meshes with bound data
                        BABYLON.ActionManager.OnPointerOverTrigger,                       //that matches this mesh, then set their render outline and scaling
                        () => {
                          anu.selectData(Object.keys(d), Object.values(d), scene, true)
                             .prop('renderOutline', true)
                             .scaling(new BABYLON.Vector3(1.5, 1.5, 1.5));
                        }
                      ))
                      .action((d,n,i) => new BABYLON.ExecuteCodeAction(                   //When the pointer out event happens, select all meshes with bound data
                        BABYLON.ActionManager.OnPointerOutTrigger,                        //that matches this mesh, then reset their render outline and scaling
                        () => {
                          anu.selectData(Object.keys(d), Object.values(d), scene, true)
                             .prop('renderOutline', false)
                             .scaling(BABYLON.Vector3.One());
                        }
                      ));

  return scene;

};