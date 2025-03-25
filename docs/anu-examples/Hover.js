// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Color3, ActionManager, InterpolateValueAction, ExecuteCodeAction, HighlightLayer } from '@babylonjs/core';
import penguins from './data/penguins.json' assert {type: 'json'}; //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function hover(engine) {

  //Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(2, 2, -3.5);

  //Create the D3 scale functions for the x, y, and z positions and color
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(penguins, (d) => { return d['Beak Depth (mm)'] }))).range([-1, 1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(penguins, (d) => { return d['Beak Length (mm)'] }))).range([-1, 1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(penguins, (d) => { return d['Flipper Length (mm)'] }))).range([-1, 1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");

  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create a Babylon HighlightLayer that will allow us to add a highlight stencil to meshes
  const highlighter = new HighlightLayer("highlighter", scene);

  //Create our spheres and add Actions to allow them to respond to user input
  let spheres = chart.bind('sphere', { diameter: 0.05 }, penguins)
                     .position((d) => new Vector3(scaleX(d['Beak Depth (mm)']), scaleY(d['Beak Length (mm)']), scaleZ(d['Flipper Length (mm)'])))
                     .material((d) => scaleC(d.Species))
                     //Add an action that will increase the size of the sphere when the pointer is moved over it
                     .action((d, n, i) => new InterpolateValueAction(   //Type of action, InterpolateValueAction will interpolave a given property's value over a specified period of time
                         ActionManager.OnPointerOverTrigger,            //Action Trigger
                         n,                                             //The Mesh or Node to Change, n in Anu refers to the mesh itself
                         'scaling',                                     //The property to Change
                         new Vector3(1.2, 1.2, 1.2),                    //The value that the property should be set to
                         100                                            //The duration in milliseconds that the value is interpolated for
                     ))
                     //Add an action that will return the size of the sphere to its original value when the pointer is moved out of it
                     .action((d, n, i) => new InterpolateValueAction(
                         ActionManager.OnPointerOutTrigger,
                         n,
                         'scaling',
                         new Vector3(1, 1, 1),
                         100
                     ))
                     //Add an action that will highlight the sphere mesh using the highlight stencil when the pointer is moved over it
                     .action((d,n,i) => new ExecuteCodeAction(          //ExecudeCodeAction allows us to execute a given function
                         ActionManager.OnPointerOverTrigger,
                         () => {
                             highlighter.addMesh(n, Color3.White());
                         }
                     ))
                     //Add an action that will remove the highlight on the sphere mesh when the pointer is moved out of it
                     .action((d,n,i) => new ExecuteCodeAction( //Same as above but in reverse
                         ActionManager.OnPointerOutTrigger,
                         () => {
                             highlighter.removeMesh(n);
                         }
                     ))

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } });

  return scene;

};



