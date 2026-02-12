// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import vega from 'vega-datasets';
import { HemisphericLight, Vector3, Scene, ArcRotateCamera } from '@babylonjs/core';

export const brush = async function (engine) {

  const cars = await vega['cars.json'](); //Our data

  const scene = new Scene(engine);

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", (Math.PI / 2) * 3, Math.PI / 3, 5, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 12;
  camera.attachControl(true);

  //Add a unique index to each car so that we can easily retrieve this later
  cars.forEach((element, index) => element.index = index);

  //3D scatterplot
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Horsepower}))).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Weight_in_lbs}))).range([-1, 1]).nice();
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Displacement}))).range([-1,1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  let CoT = anu.create("cot", "cot");
  let chart = anu.selectName("cot", scene);
  let spheres = chart.bind('sphere', { diameter: 0.075 }, cars)
                      .positionX((d) => scaleX(d.Horsepower))
                      .positionY((d) => scaleY(d.Weight_in_lbs))
                      .positionZ((d) => scaleZ(d.Displacement))
                      .material((d) => scaleC(d.Origin))
                      .prop('outlineWidth', 0.01);
  anu.createAxes('chart', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ } });

  //Create brush for the 3D scatterplot
  let brush = anu.createBrush('brush', 
    {
      parent: chart,
      scales: { x: scaleX, y: scaleY, z: scaleZ }
    }
  );

  //Create observables to respond to brush events
  brush.onBrushChangedObservable.add((evt) => {
    (new anu.Selection(evt.added)).prop('renderOutline', true);
    (new anu.Selection(evt.removed)).prop('renderOutline', false);
  });

  return scene;
};
