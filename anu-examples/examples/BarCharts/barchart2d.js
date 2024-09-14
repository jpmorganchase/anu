// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import cars from '../../data/cars.json' assert {type: 'json'};
import { HemisphericLight, 
         Vector3,
         Scene,
         ArcRotateCamera, 
         TransformNode, 
         StandardMaterial, 
         Color3
        } from '@babylonjs/core';
import * as d3 from 'd3';
import * as anu from '@jpmorganchase/anu';

export function barchart2d(babylonEngine){
    const scene = new Scene(babylonEngine)
    new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(1,3,-5);
   
   
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort();

    //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let  carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                            Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}}, 
                                                            d => d.Cylinders)

    carsRollup = carsRollup.map(([Cylinders, Data]) => ({Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))])
    
    //Create our scales for positioning and coloring meshes
    let scaleX = d3.scaleBand().domain(cylinders).range([-1,1]).paddingInner(1).paddingOuter(0.5);
    let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,2]).nice();
    let scaleC = d3.scaleSequential(d3.interpolatePuBuGn).domain(MPGMinMax);

    //Create and select a transform node to be our parent
    let CoT = new TransformNode('cot')
    let chart = anu.selectName('cot', scene);
    
    //Bind boxes to our rolled-up data, position, scale, and color with our scales
    let bars = chart.bind('plane', {height: 1, width: 0.3, sideOrientation:2}, carsRollup)
                    .positionX((d) => scaleX(d.Cylinders))
                    .positionZ(-0.01)
                    .scalingY((d) => scaleY(d.Horsepower))
                    .positionY((d) => scaleY(d.Horsepower) / 2)
                    .material((d, i) => new StandardMaterial("myMaterial", scene)) 
                    .diffuseColor((d) => { let rgb = scaleC(d.Miles_per_Gallon)
                                                      .replace(/[^\d,]/g, '')
                                                      .split(',')
                                                      .map((v) => v / 255)
                                            return new Color3(...rgb)}) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});

    chart.positionY(0).positionZ(0.5)

   
    return scene;
}



