// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as d3 from 'd3';
import data from './data/iris.json';

export function details(engine) {

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

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalLength))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.petalLength))).range([-1,1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.sepalWidth))).range([-1,1]).nice();
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a plane Mesh that will serve as our tooltip
  const hoverPlane = anu.create('plane', 'hoverPlane', { width: 1, height: 1 });
  hoverPlane.isPickable = false;    //Disable picking so it doesn't get in the way of interactions
  hoverPlane.renderingGroupId = 1;  //Set render id higher so it always renders in front of other objects
  hoverPlane.isVisible = false;     //Hide the tooltip
  hoverPlane.billboardMode = 7;     //Set the tooltip to always face the camera

  //Add an AdvancedDynamicTexture to this plane Mesh which will let us render Babylon GUI elements on it
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(hoverPlane);

  //Create and customize the rectangle for the background
  let UIBackground = new GUI.Rectangle();
  UIBackground.adaptWidthToChildren = true;
  UIBackground.adaptHeightToChildren = true;
  UIBackground.cornerRadius = 20;
  UIBackground.color = 'Black';
  UIBackground.thickness = 2;
  UIBackground.background = 'White';
  advancedTexture.addControl(UIBackground);

  //Create and customize the text for our tooltip
  let label = new GUI.TextBlock();
  label.paddingLeftInPixels = 25;
  label.paddingRightInPixels = 25;
  label.fontSizeInPixels = 50;
  label.resizeToFit = true;
  label.text = ' ';
  UIBackground.addControl(label);

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create sphere meshes as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bind('sphere', { diameter: 0.05 }, data)
                     .position((d) => new BABYLON.Vector3(scaleX(d.sepalLength), scaleY(d.petalLength), scaleZ(d.sepalWidth)))
                     .material((d) => scaleC(d.species))
                     //Add actions to respond to user inputs
                     .action((d,n,i) => new BABYLON.ExecuteCodeAction(  //When the pointer over event happens, we execute code to
                       BABYLON.ActionManager.OnPointerOverTrigger,      //update our tooltip's text based on bound data and move
                       () => {                                          //the tooltip to above the hovered sphere
                           label.text = d.species;
                           hoverPlane.position = n.position.add(new BABYLON.Vector3(0, 0.1, 0));
                           hoverPlane.isVisible = true;
                       }
                     ))
                     .action((d,n,i) => new BABYLON.ExecuteCodeAction(  //When the pointer out event happens, we execute code to
                       BABYLON.ActionManager.OnPointerOutTrigger,       //hide the tooltip from view
                       () => {
                           hoverPlane.isVisible = false;
                           label.text = ' ';
                       }
                     ));

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });

  return scene;
};