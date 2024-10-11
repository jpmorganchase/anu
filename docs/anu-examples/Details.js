// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, Color3, ActionManager, ExecuteCodeAction, HighlightLayer } from '@babylonjs/core';
import { AdvancedDynamicTexture, Rectangle, TextBlock} from '@babylonjs/gui'
import cars from './data/cars.json' assert {type: 'json'}; //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function details(engine) {

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
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => { return d['Weight_in_lbs'] }))).range([-1, 1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => { return d['Horsepower'] }))).range([-1, 1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => { return d['Acceleration'] }))).range([-1, 1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create("cot", "cot");

  //We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode
  let chart = anu.selectName("cot", scene);

  //Create a Babylon HighlightLayer that will allow us to add a highlight stencil to meshes
  const highlighter = new HighlightLayer("highlighter", scene);

  //Create a plane mesh that will serve as the basis for our details on demand label
  const hoverPlane = anu.create('plane', 'hoverPlane', {width: 1, height: 1})
  hoverPlane.isPickable = false; //Disable picking so it doesn't get in the way of interactions
  hoverPlane.renderingGroupId = 1; //Set render id higher so it always renders in front

  //Use the Babylon GUI system to create an AdvancedDynamicTexture that will the updated with our label content
  let advancedTexture = AdvancedDynamicTexture.CreateForMesh(hoverPlane);

  //Create a rectangle for the background
  let UIBackground = new Rectangle();
  UIBackground.adaptWidthToChildren = true;
  UIBackground.adaptHeightToChildren = true;
  UIBackground.cornerRadius = 20;
  UIBackground.color = "Black";
  UIBackground.thickness = 2;
  UIBackground.background = "White";
  advancedTexture.addControl(UIBackground);

  //Create an empty text block
  let label = new TextBlock();
  label.paddingLeftInPixels = 25;
  label.paddingRightInPixels = 25;
  label.fontSizeInPixels = 50;
  label.resizeToFit = true;
  label.text = " "
  UIBackground.addControl(label);

  //Hide the plane until it is needed
  hoverPlane.isVisible = false;
  //Set billboard mode to always face camera
  hoverPlane.billboardMode = 7;

  //Create our spheres and add Actions to allow them to respond to user input
  let spheres = chart.bind('sphere', { diameter: 0.05 }, cars)
                     .position((d) => new Vector3(scaleX(d['Weight_in_lbs']), scaleY(d['Horsepower']), scaleZ(d['Acceleration'])))
                     .material((d) => scaleC(d['Origin']))
                     //Add an action that will highlight the sphere mesh using the highlight stencil when the pointer is moved over it,
                     //as well as show and properly position the hoverPlane above the sphere mesh
                     .action((d,n,i) => new ExecuteCodeAction(        //Type of action, ExecudeCodeAction allows us to execute a given function
                         ActionManager.OnPointerOverTrigger,          //Action Trigger
                         () => {
                           highlighter.addMesh(n, Color3.White());
                           //Show and adjust the label
                           hoverPlane.isVisible = true;
                           label.text = d['Name'];
                           hoverPlane.position = n.position.add(new Vector3(0, 0.1, 0));  //Add vertical offset
                         }
                     ))
                     //Add an action that will undo the above when the pointer is moved away from the sphere mesh
                     .action((d,n,i) => new ExecuteCodeAction(
                         ActionManager.OnPointerOutTrigger,
                         () => {
                           highlighter.removeMesh(n);
                           hoverPlane.isVisible = false;
                         }
                     ))

  //Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions
  anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ }, labelOptions: {size: 0.02} });

  return scene;

};



