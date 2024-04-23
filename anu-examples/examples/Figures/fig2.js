import { Vector3, Scene, Color4, HemisphericLight, ArcRotateCamera, Vector2 } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import data from 'anu/../../data/obesity.json'
import pop from 'anu/../../data/population_engineers_hurricanes.csv'
import geoJ from "anu/../../data/gz_2010_us_040_00_5m.json"
import * as d3 from 'd3';
import { scale } from 'chroma-js';


export function fig2(babylonEngine){
  const scene = new Scene(babylonEngine);
  //Add some lighting
  let light = new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  light.intensity = 1.3;
  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0, 2.5, -2)

  let map = anu.createMeshMap('test', {geoJson: geoJ, depth: 0.01, projection: d3.geoAlbers().reflectY(true), size: [6,6], simplification: 0.00001});

  let states = map.selection;

  let scaleY = d3.scaleLinear().domain([0,50000000]).range([1, 50]);
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toStandardMaterial()).domain([0,0.2]);

  states.material((d,n,i) => {
    let stateData = data.find(x => parseFloat(x.id) == d["STATE"]) ?? {rate: 0}
    return scaleC(stateData.rate);
  })
  .scalingY((d,n,i) => {
    let stateData = pop.find(x => x.state == d["NAME"]) ?? {population: 0}
    console.log(stateData)
    return -scaleY(stateData.population);
  })

  let map2 = anu.createMeshMap('test', {geoJson: geoJ, depth: 0.001, projection: d3.geoAlbers().reflectY(true), size: [6,6], simplification: 0.00001});
  
  let states2 = map2.selection;

  states2.material((d,n,i) => {
    let stateData = data.find(x => parseFloat(x.id) == d["STATE"]) ?? {rate: 0}
    return scaleC(stateData.rate);
  })

    let barScaleX = d3.scaleBand().domain([...new Set(pop.map((v) => v.state))]).range([-1,1]).paddingInner(0.01).paddingOuter(0.005);
    let barScaleY = d3.scaleLinear().domain([0, 50000000]).range([0,1]).nice();

    //Create and select a transform node to be our parent
    
    let chart = anu.bind('cot');
    
    //Bind boxes to our rolled-up data, position, scale, and color with our scales
    let bars = chart.bind('plane', {height: 1, width: 0.03, sideOrientation:2}, pop)
                    .positionX((d) => barScaleX(d.state))
                    .positionZ(-0.01)
                    .scalingY((d) => barScaleY(d.population))
                    .positionY((d) => barScaleY(d.population) / 2)
                    .material((d,n,i) => {
                        let stateData = data.find(x => x.id == d["id"]) ?? {rate: 0}
                        return scaleC(stateData.rate);
                      })
                   
        
    anu.createAxes('test', scene, {parent: chart, scale: {x: barScaleX}, labelOptions: {size: 0.009} , labelFormat: {x: (d) => d.slice(0,2)}});

  //camera.setTarget(mapCot.selected[0]);

  return scene;
}