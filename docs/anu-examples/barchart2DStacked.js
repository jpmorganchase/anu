// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export async function barchart2DStacked(engine){

  const data = await vega['us-employment.csv']();

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -5), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Get the names of all the employment categories
  let categories = Object.keys(data[0]).splice(1, data.length);

  //Aggregate our data by year
  let yearsRollup = d3.rollup(
    data,
    v => {
      let result = {};
      categories.forEach((key) => {
        result[key] = d3.sum(v, d => d[key] || 0)
      })
      return result;
    },
    d => d.month.getFullYear()
  );
  let aggregated = Array.from(yearsRollup, ([year, values]) => ({
    year: +year,
    ...values
  }));

  //Create a D3 stack generator
  let stack = d3.stack()
      .keys(categories)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

  //Stack the data into individual series for each employment category
  let series = stack(aggregated);

  //Add the key for each series as a property to each data point within said series, so we can easily color them later
  series.forEach(series => {
    series.forEach(point => {
      point.key = series.key;
    });
  });


  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleBand().domain(Array.from(d3.group(data, (d) => d.month.getFullYear()).keys())).range([-1, 1]).paddingInner(1).paddingOuter(0.5);
  let scaleY = d3.scaleLinear().domain([0, d3.max(series[series.length - 1].map(d => d[1]))]).range([0, 2]).nice();  //Take the largest value from the top-most stack
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial(categories.length)).domain(categories);


  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);
  
  //Create empty CoTs for each series in our dataset
  let groups = chart.bind('cot', { }, series);
  
  //Create plane meshes for each series CoT we just created, inheriting the bound data to create a plane for each element in each series
  let bars = groups.bind('plane', { height: 1, width: 0.15, sideOrientation: 2 }, (d) => d)
    .positionX((d) => scaleX(d.data.year))
    .positionY((d) => scaleY((d[1] + d[0]) / 2))
    .scalingY((d) => scaleY(d[1] - d[0]))
    .positionZ(-0.002); //Adjust the z position slightly to prevent Z-fighting
  
  bars.material((d, n, i) => scaleC(d.key));

  //Use the Axes prefab with our two D3 scales with additional customizations
  anu.createAxes('myAxes', {
    scale: { x: scaleX, y: scaleY },
    parent: CoT,                         
    background: false
  });
  
  //Create a CoT as a child of our chart that will hold our legend
  let legend = chart.bind('cot', {}, [undefined]);

  //Bind planes that will serve as keys in our legend
  let keys = legend.bind('plane', { size: 0.08 }, categories)
    .position((d,n,i) => new BABYLON.Vector3(0, i * 0.09, 0))
    .material((d) => scaleC(d))

  //Bind labels for the legend
  let labels = legend.bind('planeText', { size: 0.08, text: (d) => d, align: 'left' }, categories)
    .position((d,n,i) => new BABYLON.Vector3(0.09, i * 0.09, 0));

  //Adjust the legend position
  legend.positionX(1.25);

  //Shift the entire chart to center it in the default camera view
  chart.positionX(-0.25)
    .positionY(-1);

  return scene;
}