// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/penguins.json';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function violinPlot(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0.75, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0.75, -2.5);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  // Kernel density estimation functions (adapted from D3 gallery example)
  function kernelDensityEstimator(kernel, ticks) {
    return function (values) {
      return ticks.map(function (x) {
        return [
          x,
          d3.mean(values, function (v) {
            return kernel(x - v);
          }),
        ];
      });
    };
  }

  function kernelEpanechnikov(bandwidth) {
    return function (v) {
      return Math.abs((v /= bandwidth)) <= 1 ? (0.75 * (1 - v * v)) / bandwidth : 0;
    };
  }

  // Get unique species
  const species = Array.from(new Set(data.map((d) => d.Species)));

  // Create scales for the visualization
  // Y scale for the beak length values
  const beakLengths = data.map((d) => d['Beak Length (mm)']).filter((d) => d != null);
  const scaleY = d3.scaleLinear().domain(d3.extent(beakLengths)).range([0, 1.5]).nice();

  // X scale for positioning the violins (one for each species)
  const scaleX = d3.scaleBand().domain(species).range([-1, 1]).paddingInner(1).paddingOuter(0.5);

  // Create kernel density estimator
  const kde = kernelDensityEstimator(kernelEpanechnikov(0.7), scaleY.ticks(50));

  // Compute density for each species
  const densityData = species.map((sp) => {
    const values = data
      .filter((d) => d.Species === sp && d['Beak Length (mm)'] != null)
      .map((d) => d['Beak Length (mm)']);
    return {
      species: sp,
      density: kde(values),
    };
  });

  // Find the maximum density value across all species for scaling
  let maxDensity = 0;
  densityData.forEach((d) => {
    const max = d3.max(d.density, (v) => v[1]);
    if (max > maxDensity) maxDensity = max;
  });

  // Scale for the width of the violins based on density
  const scaleWidth = d3.scaleLinear().domain([0, maxDensity]).range([0, 0.25]); // 0.25 to leave some space between violins

  // Color scale for different species using Anu helper function
  const scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor3());

  // Create a Center of Transform TransformNode that serves as parent node for all our meshes
  let CoT = anu.create('cot', 'cot');
  let chart = anu.selectName('cot', scene);

  // Function to create the path array for a violin shape
  // All violins are created at x=0 and will be positioned later
  const createViolinPath = (speciesData) => {

    // Create the path for the violin shape (right half) - from bottom to top
    const rightPath = speciesData.density.map((d) => new BABYLON.Vector3(scaleWidth(d[1]), scaleY(d[0]), 0));

    // Create the left half (mirror of right half) - from top to bottom
    const leftPath = speciesData.density.map((d) => new BABYLON.Vector3(-scaleWidth(d[1]), scaleY(d[0]), 0)).reverse();

    // Combine both halves to create a closed shape
    const fullPath = [...rightPath, ...leftPath];

    // Smooth the path for better visual appearance
    const smoothPath = BABYLON.Curve3.CreateCatmullRomSpline(fullPath, 30, true).getPoints();

    // Create center line path at the same points for ribbon fill
    const centerPath = smoothPath.map((p) => new BABYLON.Vector3(0, p.y, 0));

    // Return the path array for ribbon creation - from center to outline
    return [centerPath, smoothPath];
  };

  // Create violin shapes using anu.bind for each species
  let violins = chart.bind('ribbon', { pathArray: (d) => createViolinPath(d), sideOrientation: BABYLON.Mesh.DOUBLESIDE }, densityData)
    .positionX((d) => scaleX(d.species))
    .positionZ(-0.01) // Slightly adjust z to prevent Z-fighting
    .material((d, n, i) => new BABYLON.StandardMaterial('violinMaterial_' + i, scene))
    .diffuseColor((d) => scaleC(d.species));

  // Create axes with custom labels
  anu.createAxes('myAxes', {
    scale: { x: scaleX, y: scaleY },
    parent: chart,
  });

  return scene;
}
