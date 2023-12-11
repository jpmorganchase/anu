// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import cars from '../../data/cars.json' assert {type: 'json'};
import { HemisphericLight, 
         Vector3,
         Scene,
         ArcRotateCamera, 
         TransformNode, 
         StandardMaterial, 
         Color3, 
         Mesh,
         MeshBuilder,
        Node} from '@babylonjs/core';
import * as d3 from 'd3';
import * as anu from '@jpmorganchase/anu';

export function barchart3D(babylonEngine){
    const scene = new Scene(babylonEngine)
    new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(10.5,7,-10.5);
   
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort().reverse();

    //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let  carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                            Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon)}}, 
                                                            d => d.Origin,
                                                            d => d.Cylinders)

    carsRollup = carsRollup.map(([Origin, Cylinders, Data]) => ({ Origin, Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))]).reverse()
    
    //Create our scales for positioning and coloring meshes
    let scaleX = d3.scaleBand().domain(cylinders).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);
    let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,5]).nice();
    let scaleZ = d3.scaleBand().domain(origin).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);
    let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toPBRMaterialRough()).domain(MPGMinMax);

    //Create and select a transform node to be our parent
    let CoT = new TransformNode('cot')
    let chart = anu.selectName('cot', scene);
    
    //Bind boxes to our rolled-up data, position, scale, and color with our scales
    let bars = chart.bind('box', {height: 1, width: 0.8, depth: 0.8}, carsRollup)
                    .positionX((d) => scaleX(d.Cylinders))
                    .positionZ((d) => scaleZ(d.Origin))
                    .scalingY((d) => scaleY(d.Horsepower))
                    .positionY((d) => scaleY(d.Horsepower) / 2)
                    .material((d, i) => scaleC(d.Miles_per_Gallon)) 
                    //.diffuseColor((d) => scaleC(d.Miles_per_Gallon)) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});
   
    return scene;
}



