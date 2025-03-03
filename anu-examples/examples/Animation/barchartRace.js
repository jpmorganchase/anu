// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, StandardMaterial, Vector3, Color3 } from '@babylonjs/core';
import * as gui from '@babylonjs/gui';
import data from '../../data/category-brands.json' assert {type: 'json'}; //Data from https://interbrand.com/

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export const barchartRace = function(engine) {

  //Babylon boilerplate
  const scene = new Scene(engine);
  const light = new HemisphericLight('light1', new Vector3(0, 10, 0), scene);
  light.intensity = 2;
  const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 3, new Vector3(1.5, 1, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create the chart's Center of Transformation
  let CoT = anu.create("cot", "cot");
  let chart = anu.selectName("cot", scene);

  //Transform our data in the correct format
  //Based on and adapted from https://observablehq.com/@d3/bar-chart-race-explained by Mike Bostock
  let names = new Set(data.map(d => d.name));

  let datevalues = Array.from(d3.rollup(data, ([d]) => d.value, d => d.date, d => d.name))
    .map(([date, data]) => [new Date(date), data])
    .sort(([a], [b]) => d3.ascending(a, b))

  let topN = 12;  //How many companies to show at a time

  function rank(value) {
    const data = Array.from(names, name => ({name, value: value(name)}));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(topN, i);
    return data;
  }

  let keyframes = [];
  let k = 10;     //How many timesteps per year, higher number results in smoother animation
  let ka, a, kb, b;
  for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
      const t = i / k;
      keyframes.push([
        new Date(ka * (1 - t) + kb * t),
        rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
      ]);
    }
  }
  keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
  //In our case, sort the companies alphabetically so that the n-th company in the list is always the same one
  keyframes.forEach(kf => kf[1] = kf[1].sort((a, b) => d3.ascending(a.name, b.name)));

  
  //Create D3 scales
  let scaleX = d3.scaleLinear().domain([0, Math.max(...keyframes[0][1].map(d => d.value))]).range([0, 3]);
  let scaleY = d3.scaleBand().domain(d3.range(topN + 1)).paddingInner(0.3).range([2, 0]);
  let scaleC = (d) => {
    const scale = d3.scaleOrdinal(d3.schemeTableau10);
    if (data.some(d => d.category !== undefined)) {
      const categoryByName = new Map(data.map(d => [d.name, d.category]))
      scale.domain(Array.from(categoryByName.values()));
      return scale(categoryByName.get(d.name));
    }
    return scale(d.name);
  };

  //Bind our boxes and labels for the very first keyframe
  let bars = chart.bind('box', { width: 1, height: 0.15, depth: 0.01 }, keyframes[0][1])
                  .positionX((d,n,i) => scaleX(d.value) / 2)
                  .scalingX((d,n,i) => scaleX(d.value))
                  .positionY((d,n,i) => scaleY(d.rank))
                  .material((d,n,i) => new StandardMaterial(d.name + 'Mat'))
                  .prop('material.alpha', (d,n,i) => (d.rank) < topN ? 1 : 0)   //Companies not in the top N are transparent
                  .diffuseColor((d,n,i) => Color3.FromHexString(scaleC(d)));

  let labels = chart.bind('planeText', { text: "0", size: 0.1, align: "right"}, keyframes[0][1])
                    .positionX((d,n,i) => scaleX(d.value) - 0.04)   //Offsets to neatly place bar label
                    .positionY((d,n,i) => scaleY(d.rank) - 0.0285)
                    .positionZ(-0.011); //Move slightly in-front of the box

  //Customize and create our the axes
  let axesOptions = new anu.AxesConfig({ x: scaleX, y: scaleY });
  axesOptions.parent = chart;
  axesOptions.grid.y = false;
  axesOptions.domainMaterialOptions = { width: 0.01 };
  axesOptions.background.x = false;
  axesOptions.background.y = false;
  axesOptions.labelFormat.x = (v) => Number(v.toFixed(0)).toLocaleString();
  axesOptions.labelMargin.x = -0.125;
  axesOptions.label.y = false;
  let axes = anu.createAxes('axes', scene, axesOptions);

  //Label for the current year at the bottom right
  let yearLabel = anu.createPlaneText('yearLabel', { text: "0", size: 0.4, parent: chart });
  yearLabel.position = new Vector3(2.7, 0.1, 0);

  let timestep = 0;     //Incremental counter to iterate through the keyframe array
  let interval = 250;   //Time betwen keyframes in milliseconds

  nextTimestep();

  function nextTimestep() {
    //Stop at the end of the dataset
    if (timestep >= keyframes.length) {
      return;
    }

    //Recreate our scale to account for this new timestep's ranges
    scaleX = d3.scaleLinear().domain([0, Math.max(...keyframes[timestep][1].map(d => d.value))]).range([0, 3]);

    //Animate our bars
    bars.prop("metadata.data", (d,n,i) => keyframes[timestep][1][i])  //Bind new data to the Meshes
      .transition((d,n,i) => ({
        duration: interval,
        onAnimationEnd: () => {         //When the animation ends, call this function again to begin the animation for the next year
          if (i == 0)                   //This callback is run for every Mesh in the selection, so the easiest way to have this be run
              nextTimestep(timestep++); //only once is to put the conditional you see here (i.e., the first Mesh in the selection)
        }}))
      .tween((d,n,i) => {             //We use tween() here as it gives us finer grain control of the animation in each frame during the transition
        //Create D3 interpolators to help tween between start and end values
        let posXTween = d3.interpolateNumber(n.position.x, scaleX(d.value) / 2);
        let scaleXTween = d3.interpolateNumber(n.scaling.x, scaleX(d.value));
        let posYTween = d3.interpolateNumber(n.position.y, scaleY(d.rank));
        let alphaTween = d3.interpolateNumber(n.material.alpha, (d.rank) < topN ? 1 : 0);  //Companies not in the top N are transparent

        //We have to return a function with t as an argument that will actually modify the Mesh, in this case using our D3 interpolators
        //This function will be called every frame until the animation finishes, where t starts at 0 and ends at 1
        return (t) => {
          n.position.x = posXTween(t);
          n.position.y = posYTween(t);
          n.scaling.x = scaleXTween(t);
          n.material.alpha = alphaTween(t);
        }
      });
    
    //Animate the labels
    labels.prop("metadata.data", (d,n,i) => keyframes[timestep][1][i])
      .transition((d,n,i) => ({ duration: interval }))
      .tween((d,n,i) => {
        let textTween = d3.interpolateNumber(Number(n.text.split('\n').pop().replace(',', '')), d.value);
        let posXTween = d3.interpolateNumber(n.position.x, scaleX(d.value) - 0.04);   //Offsets to neatly place bar label
        let posYTween = d3.interpolateNumber(n.position.y, scaleY(d.rank) - 0.0285);
        let alphaTween = d3.interpolateNumber(n.opacity, (d.rank) < topN ? 1 : 0);

        return (t) => {
          n.position.x = posXTween(t);
          n.position.y = posYTween(t);
          //Updating text is rather expensive since text vertices need to be calculated and redrawn each update, especially if we are doing
          //this every frame, therefore we only do it for those in the top N
          if (d.rank < topN) {
            n.isVisible = true;
            n.updatePlaneText({ text: d.name + "\n" + Number(textTween(t).toFixed(0)).toLocaleString(), opacity: alphaTween(t) });
          }
          else {
            n.isVisible = false;
          }
        }
      });

    //Update the year
    yearLabel.text = keyframes[timestep][0].getFullYear();
    
    //Update our axes with our new scaleX object which has the up-to-date domain
    axesOptions.scale.x = scaleX;
    axes.updateAxes(axesOptions, { duration: interval });   //Second param is transition options, setting a duration will interpolate axis changes
  }

  //Create a button to restart the race
  let advancedTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let button = gui.Button.CreateSimpleButton("restartButton", "Restart");
  button.width = 0.1;
  button.height = "40px";
  button.cornerRadius = 2;
  button.color = "white";
  button.thickness = 4;
  button.background = "blue";
  button.top = "45%";
  button.left = "42.5%";
  button.onPointerClickObservable.add(() => {
    //If the keyframes have been exhausted, we need to call nextTimestep() again
    if (timestep >= keyframes.length) {
      timestep = 0;
      nextTimestep();
    }
    //Otherwise, we can set this and then wait for nextTime() to be called organically
    else {
      timestep = -1;
    }
  });
  advancedTexture.addControl(button);
  
  return scene;
}