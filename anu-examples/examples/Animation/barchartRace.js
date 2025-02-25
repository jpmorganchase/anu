// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, StandardMaterial, Vector3, Color3 } from '@babylonjs/core';
import * as gui from '@babylonjs/gui';
import population from '../../data/world-population-race.json' assert {type: 'json'};  //Data from gapminder.org

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export const barchartRace = function(engine) {

  //Babylon boilerplate
  const scene = new Scene(engine);
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);
  const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 3, new Vector3(1.5, 1, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create the chart's Center of Transformation
  let CoT = anu.create("cot", "cot");
  let chart = anu.selectName("cot", scene);

  //Bars
  let bars = chart.bind('box', { width: 1, height: 0.125, depth: 0.05 }, population)
                  .material((d,n,i) => new StandardMaterial(d.country + 'Mat'))
                  .diffuseColor((d,n,i) => Color3.Random());  //Ideally we map this to semantically relevant colors per country

  //Value labels per each bar
  let labels = chart.bind('planeText', { text: "0", size: 0.15, align: "left", opacity: 0}, population).positionZ(-0.02);

  //Label for the current year
  let yearLabel = anu.createPlaneText('yearLabel', { text: "1800", size: 0.4, parent: chart });
  yearLabel.position = new Vector3(2.7, 0.1, 0);

  // //Store axes reference to easily update it
  let axesOptions = null;
  let axes = null;

  let year = 1800;    //Current year shown in the race, 1800 is the start of this dataset
  let interval = 400; //Time between years in milliseconds
  nextTimestep();

  function nextTimestep() {
    //End of the dataset
    if (year > 2100) {
      return;
    }

    //Transform data to give us the population of each country for this year and their rank
    const data = population.map(d => {
        return {
          country: d.country,
          population: d.populationByYear[year.toString()]
        }
      })
      .sort((a,b) => b.population - a.population)
      .map((d, index) => ({
        country: d.country,
        population: d.population,
        rank: index + 1
      }));
    
    //Create D3 scales
    const scaleRank = d3.scaleLinear().domain([10, 1]).range([0, 2]).nice();  //Use scaleLinear to allow for countries with ranks > 10, these will be made transparent
    const scalePop = d3.scaleLinear().domain([0, Math.max(...data.map(d => d.population))]).range([0, 3]);

    bars.transition((d,n,i) => ({
      duration: interval,
      onAnimationEnd: () => {         //When the animation ends, call this function again to begin the animation for the next year
        if (i == 0) {                 //This callback is run for every Mesh in the selection, so the easiest way to have this be run
            nextTimestep(year++);     //only once is to put the conditional you see here (i.e., the first Mesh in the selection)
        }
      }}))
      .tween((d,n,i) => {             //We use tween() here as it gives us finer grain control of the animation in each frame
        //Filter the data to just this country
        let countryData = data.find(y => y.country === d.country);

        //Create D3 interpolators to help tween between start and end values
        let posXTween = d3.interpolateNumber(n.position.x, scalePop(countryData.population) / 2);
        let scaleXTween = d3.interpolateNumber(n.scaling.x, scalePop(countryData.population));
        let posYTween = d3.interpolateNumber(n.position.y, scaleRank(countryData.rank));
        let alphaTween = d3.interpolateNumber(n.material.alpha, (countryData.rank) <= 10 ? 1 : 0);  //Countries not in the top 10 are made invisible

        //We have to return a function with t as an argument that will actually modify the Mesh, in this case using our D3 interpolators
        //This function will be called every frame until the animation finishes, where t starts at 0 and ends at 1
        return (t) => {
          n.position.x = posXTween(t);
          n.scaling.x = scaleXTween(t);
          n.position.y = posYTween(t);
          n.material.alpha = alphaTween(t);
        }
      });

     // console.log(labels.filter((d,n,i) => { console.log(.material.alpha); return true}).selected)

    

    //Do the same but for the labels shown on the bars
    labels.filter((d,n,i) => n.material.alpha > 0).transition((d,n,i) => ({ duration: interval }))  //We don't need onAnimationEnd again since we call it already for the bars
      .tween((d,n,i) => {
        let countryData = data.find(y => y.country === d.country);

        let popTween = d3.interpolateNumber(Number(n.options.text.slice(0, -1) * 1000000), countryData.population); //We could store the previous year's population somewhere, here we just take it from the existing text before the animation begins
        let posXTween = d3.interpolateNumber(n.position.x, scalePop(countryData.population) + 0.1);
        let posYTween = d3.interpolateNumber(n.position.y, scaleRank(countryData.rank) - 0.025);
        let alphaTween = d3.interpolateNumber(n.options.opacity, (countryData.rank) <= 10 ? 1 : 0);
        return (t) => {
          if ((countryData.rank) <= 10){
            n.updatePlaneText({ text: (popTween(t) / 1000000).toFixed(1) + "M", opacity: alphaTween(t) });
            n.position.x = posXTween(t);
            n.position.y = posYTween(t)
          }
        }
    });

    //Update the label that displays the year
    yearLabel.updatePlaneText({ text: year });

    if (!axes) {
      axesOptions = new anu.AxesConfig({ x: scalePop, y: scaleRank });
      axesOptions.parent = chart;
      axesOptions.labelFormat.x = (pop) => (pop / 1000000) + "M";
      axesOptions.background.x = false;
      axesOptions.background.y = false;
      axesOptions.grid.x = true;
      axesOptions.grid.y = false;
      axes = anu.createAxes('axes', scene, axesOptions);
    }
    else {    
      axesOptions.scale = { x: scalePop, y: scaleRank };
      axesOptions.labelFormat.y = (rank) => rank
      axes.updateAxes(axesOptions, { duration: 350 });
    }
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
    if (year > 2100) {
      year = 1800;
      nextTimestep();
    }  
    else {
      year = 1799;
    }
  });

  advancedTexture.addControl(button);

  return scene;
}