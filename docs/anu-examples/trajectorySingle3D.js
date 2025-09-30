// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';

export function trajectorySingle3D(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -10), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(2, 1, -4);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Create some 3D data that we can visualize, this creates a spiral
  let generateSpiralPoints = (numPoints, range, totalRotations = 4) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);
      const angle = t * totalRotations * 2 * Math.PI;
      const radius = t * range;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = -range + t * (2 * range);
      points.push({ x, y, z });
    }
    return points;
  }

  //Generate data, in this example it will be in the form { x, y, z }
  let data = generateSpiralPoints(100, 5);
  
  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain([-5, 5]).range([-1,1]).nice();
  let scaleY = d3.scaleLinear().domain([-5, 5]).range([-1,1]).nice();
  let scaleZ = d3.scaleLinear().domain([-5, 5]).range([-1,1]).nice();
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toColor3()).domain([-5, 5]);

  //In this example we only have one trajectory, therefore we can just set the points directly into the bind() function without data binding for convenience
  //Map our x, y, z data to Vector3 required for greasedLine
  let path = data.map(d => new BABYLON.Vector3(scaleX(d.x), scaleY(d.y), scaleZ(d.z)));
  //Create colors for each point
  let colors = data.map(d => scaleC(d.y));
  
  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our trajectory
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create a greasedLine as a child of our CoT using the path and colors we just calculated
  let trajectory = chart.bind('greasedLine',
    {
      meshOptions: { points: path },   //Setting points directly without data binding
      materialOptions: { useColors: true, colors: colors, width: 0.05 }
    },
    undefined   //Don't bind any data since we set the points and colors directly
  );

  //Use the Axes prefab with our three D3 scales
  anu.createAxes('myAxes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, parent: chart });

  return scene;
}