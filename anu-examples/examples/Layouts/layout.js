// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import cars from '../../data/cars.json' assert {type: 'json'};

import { HemisphericLight, 
        Mesh,
         Vector3,
         Scene,
         ArcRotateCamera, 
         TransformNode, 
         StandardMaterial, 
         Color3,
         KeyboardEventTypes,
        } from '@babylonjs/core';
import * as d3 from 'd3';
import * as anu from 'anu';

export function layout(babylonEngine){
    const scene = new Scene(babylonEngine)
    new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(10.5,7,-10.5);
   
    //Create layout given grid number
    //A parent object for overall layout, and a new parent for each selections, then scale
    let chart1 = makechart(scene);
    let chart2 = makechart(scene);
    let chart3 = makechart(scene);
    let chart4 = makechart(scene);
    let chart5 = makechart(scene);
    let chart6 = makechart(scene);
    let chart7 = makechart(scene);
    let chart8 = makechart(scene);
    let chart9 = makechart(scene);
    let chart10 = makechart(scene);

    
    
    //get all charts with the name
    let charts = anu.selectName('cot', scene);

    console.log(charts)

    //console.log(charts.boundingBox())

    makePlaneLayOut(charts, {rownum: 3})
    //makeCylinderLayOut(charts, {rownum: 2, distance: 8, padding: 1})
    //makeCockpitLayOut(charts, {distance: 13, padding: 12, verAng : 40})
    //spherial 

    //charts.positionY((d, m, i) => i + widthY * 2)
    //charts.positionY((d, m, i) => i + (charts.selectId('i').boundingBox().boundingBox.maximumWorld.z - charts.selectId('i').boundingBox().boundingBox.minimumWorld.z))
    //console.log(charts.boundingBox())

    return scene;
}

function makePlaneLayOut(charts, options){

    charts.positionX((d) => 2)

    let rownum = options.rownum || 10
    let padding = options.padding || 1
    let chartnum = charts.selected.length
    let selectionMin = new Vector3(0, 0, 0);
    let selectionMax = new Vector3(0, 0, 0);

    //Calculate bounding box replacement
    charts.selected.forEach((node, i) => {
        let meshes = node.getChildMeshes()
        meshes.forEach((mesh, j) => {
            mesh.computeWorldMatrix(true); 
            let nodeMin = mesh.getBoundingInfo().boundingBox.minimumWorld;
            let nodeMax = mesh.getBoundingInfo().boundingBox.maximumWorld;
            selectionMin = Vector3.Minimize(selectionMin, nodeMin);
            selectionMax = Vector3.Maximize(selectionMax, nodeMax);
        })
    });

    var widthX = selectionMax.x - selectionMin.x
    var widthY = selectionMax.y - selectionMin.y
    var colnum = 0

    colnum = chartnum % rownum == 0 ? chartnum / rownum : colnum = Math.floor(chartnum / rownum) + 1;

    //need to set padding, starting position, orientation etc
    //Some element has larger size but some with lower size
    //var widthY = charts.boundingBox().boundingBox.maximum.y - charts.boundingBox().boundingBox.minimum.y
    //var widthZ = charts.boundingBox().boundingBox.maximum.z - charts.boundingBox().boundingBox.minimum.z
    charts.selected.forEach((node, i) => {
        var rowid = Math.floor(i / colnum)
        var colid = i % colnum
        console.log(rowid + " " + colid )
        node.position.x = colid * (widthX + padding)
        node.position.y = rowid * (widthY + padding)
    })
}

function makeCylinderLayOut(charts, options){
    let chartnum = charts.selected.length
    let rownum = options.rownum || 2
    let distance = options.distance || 5
    let padding = options.padding || 1
    let selectionMin = new Vector3(0, 0, 0);
    let selectionMax = new Vector3(0, 0, 0);

    //Calculate bounding box replacement
    charts.selected.forEach((node, i) => {
        let meshes = node.getChildMeshes()
        meshes.forEach((mesh, j) => {
            mesh.computeWorldMatrix(true); 
            let nodeMin = mesh.getBoundingInfo().boundingBox.minimumWorld;
            let nodeMax = mesh.getBoundingInfo().boundingBox.maximumWorld;
            selectionMin = Vector3.Minimize(selectionMin, nodeMin);
            selectionMax = Vector3.Maximize(selectionMax, nodeMax);
        })
    });

    var widthX = selectionMax.x - selectionMin.x
    var widthY = selectionMax.y - selectionMin.y
    var colnum = 0
    console.log(widthX + " " + widthY)

    colnum = chartnum % rownum == 0 ? chartnum / rownum : colnum = Math.floor(chartnum / rownum) + 1;
    
    var angle = Math.atan(widthX / 2 / distance) * 2

    console.log("Angle:" + angle)

    var forward = new Vector3(0, 0, 1);
    var up = new Vector3(0, 1, 0);
    var right = new Vector3(1, 0, 0);

    charts.selected.forEach((node, i) => {
        let origin = new TransformNode('vect')
        origin.position = new Vector3(0, 0, 0)
        let rowid = Math.floor(i / colnum)
        let colid = i % colnum
        //console.log(rowid + " " + colid)
        //0.1 is the padding in radius in x axis, need to consider how to make it more friendly
        origin.rotate(node.getDirection(up), colid * (angle + .1))
        let originforward = origin.getDirection(forward).normalize()
        let pos = new Vector3(originforward.x * distance, originforward.y * distance, originforward.z * distance)
        console.log(pos)
        node.position = new Vector3(pos.x,  rowid * (widthY + padding), pos.z)
        node.rotationQuaternion = origin.rotationQuaternion
    })
    //Make sure the axis billboarding is off so it is facing the user after rotating the graph
    let chartLabels = charts.selectName(["testAxis_labelX","testAxis_labelY","testAxis_labelZ"]);
    chartLabels.prop("billboardMode", 0);

}

function makeCockpitLayOut(charts, options){
    let chartnum = charts.selected.length
    let distance = options.distance || 5
    let padding = options.padding || 1
    let verAng = options.verAng || 30
    let selectionMin = new Vector3(0, 0, 0);
    let selectionMax = new Vector3(0, 0, 0);

    //Calculate bounding box replacement
    charts.selected.forEach((node, i) => {
        let meshes = node.getChildMeshes()
        meshes.forEach((mesh, j) => {
            mesh.computeWorldMatrix(true); 
            let nodeMin = mesh.getBoundingInfo().boundingBox.minimumWorld;
            let nodeMax = mesh.getBoundingInfo().boundingBox.maximumWorld;
            selectionMin = Vector3.Minimize(selectionMin, nodeMin);
            selectionMax = Vector3.Maximize(selectionMax, nodeMax);
        })
    });

    var widthX = selectionMax.x - selectionMin.x
    var widthY = selectionMax.y - selectionMin.y
    var colnum = 0
    console.log(widthX + " " + widthY)

    colnum = chartnum;
    
    var angle = Math.atan(widthX / 2 / distance) * 2

    var forward = new Vector3(0, 0, 1);
    var up = new Vector3(0, 1, 0);
    var right = new Vector3(1, 0, 0);

    charts.selected.forEach((node, i) => {
        let origin = new TransformNode('vect')
        origin.position = new Vector3(0, 0, 0)
        let rowid = Math.floor(i / colnum)
        let colid = i % colnum
        //console.log(rowid + " " + colid)

        origin.rotate(node.getDirection(up), colid * (angle + padding * (Math.PI / 180)))
        origin.rotate(node.getDirection(right), verAng * (Math.PI / 180))
        let originforward = origin.getDirection(forward).normalize()
        let pos = new Vector3(originforward.x * distance, originforward.y * distance, originforward.z * distance)
        console.log(pos)
        node.position = new Vector3(pos.x,  rowid * widthY, pos.z)
        node.rotationQuaternion = origin.rotationQuaternion
    })

    let chartLabels = charts.selectName(["testAxis_labelX","testAxis_labelY","testAxis_labelZ"]);
    chartLabels.prop("billboardMode", 0);
}

function makechart(scene){
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
    let scaleX = d3.scaleBand().domain(cylinders).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);
    let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,5]).nice();
    let scaleC = d3.scaleSequential(d3.interpolatePuBuGn).domain(MPGMinMax);

    //Create and select a transform node to be our parent
    //let CoT = anu.create('box', 'cot', scene, {}, [{'a' : 1}])
    //let chart = anu.bind('cylinder', scene);
    
    let CoT = anu.create('cot', 'cot', scene, {}, [{'A': 1}])
    let chart = anu.selectName('cot', scene);

    //console.log(chart);
    //Bind boxes to our rolled-up data, position, scale, and color with our scales
    let bars = chart.bind('plane', {height: 1, width: 0.8, sideOrientation:2}, carsRollup)
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

    //Create our axises using the anu axis prefab
    new anu.Axis('testAxis', scene, {cot: chart, x: scaleX, y: scaleY})
    .shape()
    .background()
    .ticks()
    .grid();

    return chart
}


