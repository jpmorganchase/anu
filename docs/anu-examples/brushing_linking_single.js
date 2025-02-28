// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, ActionManager, ExecuteCodeAction } from "@babylonjs/core";
import cars from './data/cars.json' assert {type: 'json'};

//create and export a function that takes a babylon engine and returns a scene
export const brushingLinkingSingle = function(engine){

  //Babylon boilerplate
  const scene = new Scene(engine);
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 2, Math.PI / 3, 6, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  

  //Left scatterplot
  let scaleX1 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Miles_per_Gallon}))).range([-1,1]).nice();
  let scaleY1 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Weight_in_lbs}))).range([-1,1]).nice();
  let scaleZ1 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Acceleration}))).range([-1,1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  let CoT1 = anu.create("cot", "cot1");
  let chart1 = anu.selectName("cot1", scene);
  let spheres1 = chart1.bind('sphere', { diameter: 0.1 }, cars)
                     .positionX((d) => scaleX1(d.Miles_per_Gallon))
                     .positionY((d) => scaleY1(d.Weight_in_lbs))
                     .positionZ((d) => scaleZ1(d.Acceleration))
                     .material((d) => scaleC(d.Origin));
  anu.createAxes('chart1', scene, { parent: chart1, scale: { x: scaleX1, y: scaleY1, z: scaleZ1 } });
  CoT1.position = new Vector3(-1.25, 0, 0);
  

  //Right scatterplot
  let scaleX2 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Cylinders}))).range([-1,1]).nice();
  let scaleY2 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Displacement}))).range([-1,1]).nice();
  let scaleZ2 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Horsepower}))).range([-1,1]).nice();

  let CoT2 = anu.create("cot", "cot2");
  let chart2 = anu.selectName("cot2", scene);
  let spheres2 = chart2.bind('sphere', { diameter: 0.1 }, cars)
                     .positionX((d) => scaleX2(d.Cylinders))
                     .positionY((d) => scaleY2(d.Displacement))
                     .positionZ((d) => scaleZ2(d.Horsepower))
                     .material((d) => scaleC(d.Origin));
  anu.createAxes('chart2', scene, { parent: chart2, scale: { x: scaleX2, y: scaleY2, z: scaleZ2 } });
  CoT2.position = new Vector3(1.25, 0, 0);


  //Rather than adding the same action() for each sphere selection separately, we can merge the two selections first then call action() only once
  let allSpheres = new anu.Selection([...spheres1.selected, ...spheres2.selected])
                      .action((d,n,i) => new ExecuteCodeAction(
                       ActionManager.OnPointerOverTrigger,
                       () => {
                         //There are multiple ways of finding all other Meshes (glyphs) that correspond to this one
                         //Here we demonstrate the use of selectData to find all other Meshes that have the exact same data variables
                         //You could also use selectData to search for a single unique ID variable in your dataset
 
                         //Last parameter to true indicates we want ALL keys and values to match
                         //If false, it will select Meshes if ANY key and value pair matches
                         anu.selectData(Object.keys(d), Object.values(d), scene, true)
                            .prop("renderOutline", true)
                            .transition((d,n,i) => ({ duration: 100 }) )
                            .scaling(new Vector3(1.5, 1.5, 1.5));
                       }
                      ))
                      .action((d,n,i) => new ExecuteCodeAction(
                       ActionManager.OnPointerOutTrigger,
                       () => {
                         //Reverse the above operation
                         anu.selectData(Object.keys(d), Object.values(d), scene, true)
                            .prop("renderOutline", false)
                            .transition((d,n,i) => ({ duration: 100 }) )
                            .scaling(Vector3.One());
                       }
                      ))

  return scene;

};