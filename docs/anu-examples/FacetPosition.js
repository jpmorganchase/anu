// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, ActionManager, InterpolateValueAction } from '@babylonjs/core';
import iris from './data/iris.json' assert {type: 'json'};  //Our data

export function facetPosition(engine) {

  //Setup basic Babylon variables
  const scene = new Scene(engine);

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  camera.position = new Vector3(2, 0, -5.5);

  //D3 scales
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  //Create CoT
  let CoT = anu.create("cot", "cot");
  let chart = anu.selectName('cot', scene);

  //Create spheres with simple mouse over animations
  let spheres = chart.bind('sphere', { diameter: 0.05 }, iris)
                     .position((d) => new Vector3(scaleX(d.sepalLength), scaleY(d.petalLength), scaleZ(d.sepalWidth)))
                     .material((d) => scaleC(d.species))
                     .action((d,n,i) => new InterpolateValueAction(
                           ActionManager.OnPointerOverTrigger,
                           n,
                           'scaling',
                           new Vector3(1.2, 1.2, 1.2),
                           100
                       ))
                       .action((d,n,i) => new InterpolateValueAction(
                         ActionManager.OnPointerOutTrigger,
                         n,
                         'scaling',
                         new Vector3(1, 1, 1),
                         100
                       ));

  //Create axes
  anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } })

  //Enable Anu's UI prefab to allow for position, rotation, and scaling
  chart.positionUI()
       .rotateUI()
       .scaleUI({ minimum: 0.5, maximum: 2 });

  return scene;
};



