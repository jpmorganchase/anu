// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export async function hover(engine) {

  const data = await vega['penguins.json']();

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
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d['Beak Depth (mm)']))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d['Beak Length (mm)']))).range([-1,1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d['Flipper Length (mm)']))).range([-1,1]).nice();
  //Do the same for color, using Anu helper functions to map values to StandardMaterial objects with colors based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create a HighlightLayer that will allow us to add a highlight stencil to meshes
  const highlighter = new BABYLON.HighlightLayer('highlighter', scene);

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create sphere meshes as children of our CoT for each row of our data and set their visual encodings using method chaining
  let spheres = chart.bind('sphere', { diameter: 0.05 }, data)
                     .position((d) => new BABYLON.Vector3(scaleX(d['Beak Depth (mm)']), scaleY(d['Beak Length (mm)']), scaleZ(d['Flipper Length (mm)'])))
                     .material((d) => scaleC(d.Species))
                     //Add actions to respond to user inputs
                     .action((d, n, i) => new BABYLON.InterpolateValueAction(   //When the pointer over event happens, the mesh's scaling
                         BABYLON.ActionManager.OnPointerOverTrigger,            //will be updated and interpolated over the specified duration
                         n,
                         'scaling',
                         new BABYLON.Vector3(1.2, 1.2, 1.2),
                         100
                     ))
                     .action((d, n, i) => new BABYLON.InterpolateValueAction(   //When the pointer out event happens, the mesh's scaling
                         BABYLON.ActionManager.OnPointerOutTrigger,             //will be set back to 1 over the specified duration
                         n,
                         'scaling',
                         BABYLON.Vector3.One(),
                         100
                     ))
                     .action((d,n,i) => new BABYLON.ExecuteCodeAction(          //When the pointer over event happens, we execute code to
                         BABYLON.ActionManager.OnPointerOverTrigger,            //add the mesh to our HighlightLayer to highlight it
                         () => {
                             highlighter.addMesh(n, BABYLON.Color3.White());
                         }
                     ))
                     .action((d,n,i) => new BABYLON.ExecuteCodeAction(          //When the pointer out event happens, we execute code to
                         BABYLON.ActionManager.OnPointerOutTrigger,             //remove the mesh from our HighlightLayer to unhighlight it
                         () => {
                             highlighter.removeMesh(n);
                         }
                     ));

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });

  return scene;

};