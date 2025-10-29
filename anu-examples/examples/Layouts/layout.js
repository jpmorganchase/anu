import cars from '../../data/cars.json' assert {type: 'json'};
import iris from '../../data/iris.json' assert {type: 'json'}; //Our data

import { HemisphericLight, 
        Vector2,
         Vector3,
         Scene,
         ArcRotateCamera, 
         StandardMaterial, 
         Color3,
         MeshBuilder,
         Mesh,
         FollowBehavior
        } from '@babylonjs/core';
// clean the import only the needed ones
import * as d3 from 'd3';
import * as anu from '@jpmorganchase/anu';
import {RadioGroup, SliderGroup, AdvancedDynamicTexture, SelectionPanel, Control, Button} from '@babylonjs/gui'


export function layout(babylonEngine){
    const scene = new Scene(babylonEngine)
    new HemisphericLight('light1', new Vector3(0, 1, 0), scene)

    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(10.5,7,-10.5);

    let picked = false;
    var rot_state;
    scene.onPointerDown = function() {
        const pick = scene.pick(scene.pointerX, scene.pointerY);
        if (pick.pickedMesh?.name == "menuPanel") {
            picked = true;
            rot_state = {x:camera.alpha , y:camera.beta};
        }
    }
    scene.onPointerUp = function() {
        picked = false;
    }

    scene.registerBeforeRender(function(){
        if(picked) {
            camera.alpha = rot_state.x;
            camera.beta = rot_state.y;
        }
    })

    let allcharts = [];

    for (let i = 0; i < 15; i++) {
        let n = Math.random();
        if(n > 0.5){
            let chart = make2Dchart(scene, Math.random() * 100);
            allcharts.push(chart);
        } else {
            let chart = make3Dchart(scene, Math.random() * 100);
            allcharts.push(chart);
        }
    }

    let charts = anu.selectName('cot', scene);

    console.log(charts);
    charts.scalingX((d) => Math.max(Math.random() * .2, .1) * 2)
    charts.scalingY((d) => Math.max(Math.random() * .2, .1) * 2)
    charts.scalingZ((d) => Math.max(Math.random() * .2, .1) * 2)

    var rows = 3;
    var margin = new Vector2(0, 0);
    var radius = 5;


    let layout = new anu.cylinderLayout('Layout', {selection: charts, rows: rows, margin: margin, radius: radius}, scene)

        .attr("row", 2)    

    layout.root.normalizeToUnitCube()
    camera.setTarget(layout.root)

    //Example functions to update the configurations of the layout, such as curvature, row number, margins
    var changeRow = function(rownum) {
        rows = rownum;
        layout.attr("row", rows);
    }

    var changeCurve = function(radius) {
        radius = radius;
        layout.attr("radius", radius);
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

    var addChart = function() {
        let chartnew = make3Dchart(scene, 0);
        chartnew.scalingX((d) => Math.max(Math.random() * .2, .1) * 2);
        chartnew.scalingY((d) => Math.max(Math.random() * .2, .1) * 2);
        chartnew.scalingZ((d) => Math.max(Math.random() * .2, .1) * 2);
        allcharts.push(chartnew);
        charts = anu.selectName('cot', scene);
        layout.options.selection = charts;
        layout.update();    
    }

    var removeChart = function() {
        if(allcharts.length == 0)
            return;

        allcharts[allcharts.length - 1].dispose();
        allcharts.pop();
        charts = anu.selectName('cot', scene);
        layout.options.selection = charts;
        layout.update();    
    }

    var setLayout = function(val) {   
		switch(val) {
            case 0: 
                layout.planeLayout();
            break
            case 1: 
                layout.cylinderLayout();
            break
            case 2: 
                layout.sphereLayout();
            break
            default:
            break
        }
	}

    //Code for making the UIs to change the layout
    var layoutGroup = new RadioGroup("Layout");
	layoutGroup.addRadio("Plane", setLayout);
    layoutGroup.addRadio("Cylinder", setLayout, true);
    layoutGroup.addRadio("Sphere", setLayout);

    var rotateGroup = new SliderGroup("Config", "S");
	rotateGroup.addSlider("row", changeRow, "rows", 1, 6, 3, displayValue);

    var curvature = new SliderGroup("Curvature", "S");
	curvature.addSlider("curvature", changeCurve, "units", 0, 12, 5, displayValue);

    var marginx = new SliderGroup("MarginX", "S");
	marginx.addSlider("marginx", updateMarginX, "unit", 0, 60, 0, displayValue);

    var marginy = new SliderGroup("MarginY", "S");
	marginy.addSlider("marginy", updateMarginY, "unit", 0, 20, 0, displayValue);

    var menuPanel = MeshBuilder.CreatePlane("menuPanel", {height:1, width: 1, sideOrientation: Mesh.DOUBLESIDE}, scene);

    var advancedTexture = AdvancedDynamicTexture.CreateForMesh(menuPanel, 1024, 1024);

    const followBehavior = new FollowBehavior();
    followBehavior.defaultDistance = 1.5;
    followBehavior.minimumDistance = 10;
    followBehavior.maxViewVerticalDegrees = -10;
    followBehavior.maxViewHorizontalDegrees = -10
    followBehavior.attach(menuPanel);

    var selectBox = new SelectionPanel("sp", [rotateGroup, curvature, marginx, marginy, layoutGroup]);
    selectBox.width = 0.2;
    selectBox.height = 0.6;
    selectBox.background = "#FFFFFF";
    selectBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    
    /* Change Font  */
    selectBox.fontFamily = "times new roman";
    selectBox.fontSize = "20pt";

    var rect2 = Button.CreateSimpleButton("button1", "add chart");
    rect2.width = 0.2; // 0.2 = 20%
    rect2.height = "40px";
    rect2.cornerRadius = 20;
    rect2.color = "white";
    rect2.thickness = 4;
    rect2.background = "blue";

    rect2.top = 200; //200 px
    rect2.left = "-20%";
    rect2.onPointerClickObservable.add(() => {
        addChart();
    });

    var rect1 = Button.CreateSimpleButton("button2", "remove chart");
    rect1.width = 0.2; // 0.2 = 20%
    rect1.height = "40px";
    rect1.cornerRadius = 20;
    rect1.color = "white";
    rect1.thickness = 4;
    rect1.background = "blue";

    rect1.top = 250; //200 px
    rect1.left = "-20%";
    rect1.onPointerClickObservable.add(() => {
        removeChart();
    });
    advancedTexture.addControl(rect1);
    advancedTexture.addControl(rect2);

    advancedTexture.addControl(selectBox);

    return scene;
}

function make2Dchart(scene, id){
         
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
    let scaleX = d3.scaleBand().domain(cylinders).range([-2.5,2.5]).paddingInner(1).paddingOuter(0.5);
    let scaleY = d3.scaleLinear().domain(horsepowerMinMax).range([0,5]).nice();
    let scaleC = d3.scaleSequential(d3.interpolatePuBuGn).domain(MPGMinMax);

    //Create and select a transform node to be our parent
    let CoT = anu.create('cot', 'cot' + id)
    let chart = anu.selectName('cot' + id, scene);
    
    
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

    anu.createAxes('test', { parent: chart, scale: {x: scaleX, y: scaleY} }, scene);
   
    chart.name('cot');
    return chart;
}

function make3Dchart(scene, id){
      
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
    let CoT = anu.create('cot', 'cot' + id)
    let chart = anu.selectName('cot' + id, scene);
    
    //Bind boxes to our rolled-up data, position, scale, and color with our scales
    let bars = chart.bind('box', {height: 1, width: 0.8, depth: 0.8}, carsRollup)
                    .positionX((d) => scaleX(d.Cylinders))
                    .positionZ((d) => scaleZ(d.Origin))
                    .scalingY((d) => scaleY(d.Horsepower))
                    .positionY((d) => scaleY(d.Horsepower) / 2)
                    .material((d, i) => scaleC(d.Miles_per_Gallon)) 
                    //.diffuseColor((d) => scaleC(d.Miles_per_Gallon)) 

    anu.createAxes('test', {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ } }, scene);

    chart.name('cot');

    return chart;

}
