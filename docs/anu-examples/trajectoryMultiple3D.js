// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/example_study.csv';

export function trajectoryMultiple3D(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -10), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(4.5, 8, -5), scene);
  camera.position = new BABYLON.Vector3(-5, 10, 20);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Group our data into the separate conditions, such that we have an array of arrays where each sub-array corresponds to the points that form a single trajectory
  let groupedData = data.reduce((acc, item) => {
    (acc[item.condition] = acc[item.condition] || []).push(item);
    return acc; 
  }, {});
  groupedData = Object.values(groupedData);

  //In this example we have multiple trajectories, so we use data binding to map bound data to our required data structures using the following functions
  //Create function to map our data to Vector3
  let dataToPath = (data) => {
    return data.map(d => new BABYLON.Vector3(d['camPos-X'] / 100, d['camPos-Y'] / 100, d['camPos-Z'] / 100));
  }
  //Create function to map our data to Color3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor3());
  let dataToColors = (data) => {
    return data.map(d => scaleC(d.condition));  //Set uniform color for now, we can change this to instead use a color gradient throughout the trajectory
  }

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our trajectory
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create a greasedLine as a child of our CoT
  let trajectories = chart.bind('greasedLine',
    {
      meshOptions: { points: (d) => dataToPath(d) },   //Convert bound data to Vector3 array for each trajectory
      materialOptions: { width: 0.05, useColors: true, colors: (d) => dataToColors(d) } //Convert bound data to Color3 array for each trajectory
    }, groupedData    //Bind data
  );

  return scene;
}