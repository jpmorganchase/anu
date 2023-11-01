import cars from '../../data/cars.json' assert {type: 'json'};

import { HemisphericLight, 
        Mesh,
        Vector2,
         Vector3,
         Scene,
         ArcRotateCamera, 
         TransformNode, 
         StandardMaterial, 
         Color3,
         KeyboardEventTypes,
         BoundingInfo,
         Animation,
         BezierCurveEase,
         PointerDragBehavior
        } from '@babylonjs/core';
import * as d3 from 'd3';
import * as anu from '@jpmorganchase/anu';
import { assign, update } from 'lodash-es';
import * as gui from '@babylonjs/gui'


export function layoutNew(babylonEngine){
    const scene = new Scene(babylonEngine)
    new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(10.5,7,-10.5);

    let chart1 = makechart(scene, 1);
    let chart2 = makechart(scene, 2);
    let chart3 = makechart(scene, 3);
    let chart4 = make3Dchart(scene, 4);
    let chart5 = makechart(scene, 5);
    let chart6 = make3Dchart(scene, 6);
    let chart7 = makechart(scene, 7);
    let chart8 = makechart(scene, 8);
    let chart9 = make3Dchart(scene, 9);
    let chart10 = makechart(scene, 10);
    let chart11 = make3Dchart(scene, 11);
    let chart12 = makechart(scene, 12);
    let chart13 = makechart(scene, 13);
    let chart14 = make3Dchart(scene, 14);
    let chart15 = makechart(scene, 15);
    

    let charts = anu.selectName('cot', scene);

    // charts.scalingX((d) => Math.max(Math.random(), .5) * 2)
    // charts.scalingY((d) => Math.max(Math.random(), .5) * 2)
    // chart4.scalingZ((d) => Math.max(Math.random(), .4) * 2)
    // chart6.scalingZ((d) => Math.max(Math.random(), .4) * 2)
    // chart9.scalingZ((d) => Math.max(Math.random(), .4) * 2)

    var isstretch = false;
    var iszalign = false;
    var showBoundingbox = false;
    var rows = 3;
    var curve = 20;
    var margin = new Vector2(0, 0);

    // let planelayout = new anu.planeLayout('PlaneLayout1', {selection: charts, rows: rows, margin: new Vector2(1, 3)}, scene)
    //     .attr("row", 2)    
    //     .attr("margin", new Vector2(0, 2))
    //     .stretch()
    //     .zalign()

    let layout = new anu.cylinderLayout('PlaneLayout1', {selection: charts, rows: rows, margin: new Vector2(0, 0), radius: 20}, scene)
        .attr("row", 2)    
        //.attr("margin", new Vector2(5, 2))
        // .stretch()
        // .zalign()

    var toStretch = function(isChecked){
        isstretch = isChecked;
        layout.stretch();
    }

    var toAlign = function(isChecked){
        iszalign = isChecked;
        layout.zalign();
    }

    var toToggleBoundingBox = function(isChecked){
        showBoundingbox = isChecked;
        layout.attr("showBoundingBox", showBoundingbox);
    }

    var changeRow = function(rownum) {
        rows = rownum;
        layout.attr("row", rows);
    }

    var changeCurve = function(radius) {
        curve = radius;
        layout.attr("radius", curve);
    }

    var updateMarginX = function(val) {
        margin.x = val;
        layout.attr("margin", margin);
    }

    var updateMarginY = function(val) {
        margin.y = val;
        layout.attr("margin", margin);
    }

    var displayValue = function(value) {
        return Math.floor(value);
    }

    var setLayout = function(val) {   
		switch(val) {
            case 0: 
                layout.planeLayout();
            break
            case 1: 
                layout.cylinderLayout();
            break
        }
	}

    var layoutGroup = new gui.RadioGroup("Layout");
	layoutGroup.addRadio("Plane", setLayout);
    layoutGroup.addRadio("Cylinder", setLayout, true);

    var transformGroup = new gui.CheckboxGroup("Settings");
	transformGroup.addCheckbox("Stretch", toStretch);
	transformGroup.addCheckbox("Zalign", toAlign);
    transformGroup.addCheckbox("ShowBoundingBox", toToggleBoundingBox);


    var rotateGroup = new gui.SliderGroup("Config", "S");
	rotateGroup.addSlider("row", changeRow, "rows", 1, 6, 3, displayValue);

    var curvature = new gui.SliderGroup("Curvature", "S");
	curvature.addSlider("curvature", changeCurve, "units", 0, 80, 20, displayValue);

    var marginx = new gui.SliderGroup("MarginX", "S");
	marginx.addSlider("marginx", updateMarginX, "unit", 0, 60, 0, displayValue);

    var marginy = new gui.SliderGroup("MarginY", "S");
	marginy.addSlider("marginy", updateMarginY, "unit", 0, 20, 0, displayValue);

    var advancedTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var selectBox = new gui.SelectionPanel("sp", [rotateGroup, curvature, marginx, marginy, transformGroup, layoutGroup]);
    selectBox.width = 0.2;
    selectBox.height = .9;
    selectBox.background = "#FFFFFF";
    selectBox.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_BOTTOM;
    
    /* Change Font  */
    selectBox.fontFamily = "times new roman";
    selectBox.fontSize = "20pt";

    advancedTexture.addControl(selectBox);

    return scene;
}

function makechart(scene, id){
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
    
    let CoT = anu.create('cot', 'cot', scene, {});
    CoT.id = id;
    let chart = anu.selectId(id, scene);

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
    // new anu.Axis('testAxis', scene, {cot: chart, x: scaleX, y: scaleY})
    // .shape()
    // .background()
    // .ticks()
    // .grid();

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});


    return chart
}

function make3Dchart(scene, id){

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
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))])
    
    //Create our scales for positioning and coloring meshes
    let scaleX = d3.scaleBand().domain(cylinders).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);
    let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,5]).nice();
    let scaleZ = d3.scaleBand().domain(origin).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);
    let scaleC = d3.scaleSequential(d3.interpolatePuBuGn).domain(MPGMinMax);

    //Create and select a transform node to be our parent
    let CoT = anu.create('cot', 'cot', scene, {})
    CoT.id = id;
    let chart = anu.selectId(id, scene);
    
    //Bind boxes to our rolled-up data, position, scale, and color with our scales
    let bars = chart.bind('box', {height: 1, width: 0.8, depth: 0.8}, carsRollup)
                    .positionX((d) => scaleX(d.Cylinders))
                    .positionZ((d) => scaleZ(d.Origin))
                    .scalingY((d) => scaleY(d.Horsepower))
                    .positionY((d) => scaleY(d.Horsepower) / 2)
                    .material((d, i) => new StandardMaterial("myMaterial", scene)) 
                    .diffuseColor((d) => { let rgb = scaleC(d.Miles_per_Gallon)
                                                      .replace(/[^\d,]/g, '')
                                                      .split(',')
                                                      .map((v) => v / 255)
                                            return new Color3(...rgb)}) 

    //Create our axises using the anu axis prefab
    // new anu.Axis('testAxis', scene, {cot: chart, x: scaleX, y: scaleY, z: scaleZ})
    // .shape()
    // .background()
    // .ticks()
    // .grid();
   
    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    return chart;

}
