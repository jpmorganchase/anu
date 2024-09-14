import cars from '../../data/cars.json' assert {type: 'json'};
import iris from '../../data/iris.json' assert {type: 'json'}; //Our data
import data1 from '../../data/yield-curve.csv'

import { HemisphericLight, 
        Vector2,
         Vector3,
         Scene,
         ArcRotateCamera, 
         StandardMaterial, 
         Color3,
         MeshBuilder,
         Mesh,
         FollowBehavior,
         Color4,
         TransformNode,
         VertexBuffer
        } from '@babylonjs/core';
// clean the import only the needed ones
import * as d3 from 'd3';
import * as anu from '@jpmorganchase/anu';
import data from 'anu/../../data/airports.csv'
import {RadioGroup, SliderGroup, AdvancedDynamicTexture, SelectionPanel, Control, Button} from '@babylonjs/gui'


export function smallMultiples(babylonEngine){
    const scene = new Scene(babylonEngine)
    new HemisphericLight('light1', new Vector3(0, 1, 0), scene)

    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(10.5,7,-10.5);

    let picked = false;
    var rot_state;
    scene.onPointerDown = function() {
        const pick = scene.pick(scene.pointerX, scene.pointerY);
        if (pick.pickedMesh.name == "menuPanel") {
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

    let globe = anu.createTextureGlobe('globe', {resolution: new Vector2(5000,2500), diameter:1})
 
    let rootSphere = anu.create('sphere', 'sphere', {diameter: 0.02})
    rootSphere.isVisible = false;
    rootSphere.registerInstancedBuffer("color", 4);
    rootSphere.instancedBuffers.color = new Color4(1,1,1,1) 
                                                                
    let spheres =  anu.selectName('globe', scene).bindInstance(rootSphere, data)
    .setInstancedBuffer("color", new Color4(0,0,0,1))
    .scaling(new Vector3(0.1,0.1,0.1))
    .position((d) => globe.lonLatToVector3([d.longitude, d.latitude]))

    anu.selectName('globe', scene).position(new Vector3(0,.5,0))

    anu.selectName('globe', scene).scaling(new Vector3(1.5, 1.5, 1.5));

    let allcharts = [];

    let chart1 = make2Dchart(scene, Math.random() * 100);
    allcharts.push(chart1);
    let chart2 = make2Dchart1(scene, Math.random() * 100);
    allcharts.push(chart2);
    let chart3 = make3Dchart1(scene, Math.random() * 100);
    allcharts.push(chart3);
    let chart4 = make2Dchart2(scene, Math.random() * 100);
    allcharts.push(chart4);
    let chart5 = make2Dchart3(scene, Math.random() * 100);
    allcharts.push(chart5);
    let chart6 = make3Dchart2(scene, Math.random() * 100);
    allcharts.push(chart6);
    let chart7 = make2Dchart4(scene, Math.random() * 100);
    allcharts.push(chart7);
    let chart8 = make3Dchart(scene, Math.random() * 100);
    allcharts.push(chart8);
    // let chart9 = makeLineChart2D(scene, Math.random() * 100);
    // allcharts.push(chart9);
    // let chart10 = makeLineChart3D(scene, Math.random() * 100);
    // allcharts.push(chart10);
    // let chart11 = makeScatterplot2D(scene, Math.random() * 100);
    // allcharts.push(chart11);
    // let chart12 = makeScatterplot2D1(scene, Math.random() * 100);
    // allcharts.push(chart12);
    let chart13 = makeScatterplot3D(scene, Math.random() * 100);
    allcharts.push(chart13);    
    let chart14 = makeScatterplot3D1(scene, Math.random() * 100);
    allcharts.push(chart14);


    let charts = anu.selectName('cot', scene);

    console.log(charts);
    charts.scalingX((d) => Math.max(Math.random() * .2, .1) * 2)
    charts.scalingY((d) => Math.max(Math.random() * .2, .1) * 2)
    charts.scalingZ((d) => Math.max(Math.random() * .2, .1) * 2)

    let chart9 = makeLineChart2D(scene, Math.random() * 100);
    chart9.scaling = new Vector3(Math.max(Math.random() * .4, .1) * 2, Math.max(Math.random() * .4, .1) * 2, 1);
    allcharts.push(chart9);
    let chart10 = makeLineChart3D(scene, Math.random() * 100);
    chart10.scaling = new Vector3(Math.max(Math.random() * .35, .1) * 2, Math.max(Math.random() * .35, .1) * 2, Math.max(Math.random() * .35, .1) * 2);
    allcharts.push(chart10);
    let chart11 = makeScatterplot2D(scene, Math.random() * 100);
    chart11.scaling = new Vector3(Math.max(Math.random() * .6, .1) * 2, Math.max(Math.random() * .6, .1) * 2, Math.max(Math.random() * .4, .1) * 2);
    allcharts.push(chart11);
    let chart12 = makeScatterplot2D1(scene, Math.random() * 100);
    chart12.scaling = new Vector3(Math.max(Math.random() * .6, .1) * 2, Math.max(Math.random() * .6, .1) * 2, Math.max(Math.random() * .4, .1) * 2);
    allcharts.push(chart12);


    charts = anu.selectName('cot', scene);

    var rows = 3;
    var margin = new Vector2(25, 2);
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

    var curvature = new SliderGroup("Radius", "S");
	curvature.addSlider("curvature", changeCurve, "units", 0, 12, 5, displayValue);

    var marginx = new SliderGroup("MarginX", "S");
	marginx.addSlider("marginx", updateMarginX, "unit", 0, 60, 25, displayValue);

    var marginy = new SliderGroup("MarginY", "S");
	marginy.addSlider("marginy", updateMarginY, "unit", 0, 20, 2, displayValue);

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
    let carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
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

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});
   
    chart.name('cot');
    return chart;
}

function make2Dchart1(scene, id){
         
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort();


        //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let carsRollup = d3.flatRollup(cars, (v) => { return {Miles_per_Gallon: d3.mean(v, d => d.Miles_per_Gallon),
                                                                Weight_in_lbs: d3.mean(v, d => d.Weight_in_lbs)}}, 
                                                                d => d.Cylinders)

    carsRollup = carsRollup.map(([Cylinders, Data]) => ({Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Miles_per_Gallon))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Weight_in_lbs))])
    
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
                    .scalingY((d) => scaleY(d.Miles_per_Gallon))
                    .positionY((d) => scaleY(d.Miles_per_Gallon) / 2)
                    .material((d, i) => new StandardMaterial("myMaterial", scene)) 
                    .diffuseColor((d) => { let rgb = scaleC(d.Weight_in_lbs)
                                                      .replace(/[^\d,]/g, '')
                                                      .split(',')
                                                      .map((v) => v / 255)
                                            return new Color3(...rgb)}) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});
   
    chart.name('cot');
    return chart;
}

function make2Dchart2(scene, id){
         
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort();


        //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                                Displacement: d3.mean(v, d => d.Displacement)}}, 
                                                                d => d.Cylinders)

    carsRollup = carsRollup.map(([Cylinders, Data]) => ({Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Displacement))])
    
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
                    .diffuseColor((d) => { let rgb = scaleC(d.Displacement)
                                                      .replace(/[^\d,]/g, '')
                                                      .split(',')
                                                      .map((v) => v / 255)
                                            return new Color3(...rgb)}) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});
   
    chart.name('cot');
    return chart;
}

function make2Dchart3(scene, id){
         
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort();


        //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let carsRollup = d3.flatRollup(cars, (v) => { return {Acceleration: d3.mean(v, d => d.Acceleration),
                                                                Weight_in_lbs: d3.mean(v, d => d.Weight_in_lbs)}}, 
                                                                d => d.Cylinders)

    carsRollup = carsRollup.map(([Cylinders, Data]) => ({Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Acceleration))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Weight_in_lbs))])
    
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
                    .scalingY((d) => scaleY(d.Acceleration))
                    .positionY((d) => scaleY(d.Acceleration) / 2)
                    .material((d, i) => new StandardMaterial("myMaterial", scene)) 
                    .diffuseColor((d) => { let rgb = scaleC(d.Weight_in_lbs)
                                                      .replace(/[^\d,]/g, '')
                                                      .split(',')
                                                      .map((v) => v / 255)
                                            return new Color3(...rgb)}) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});
   
    chart.name('cot');
    return chart;
}

function make2Dchart4(scene, id){
         
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort();


        //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                                Weight_in_lbs: d3.mean(v, d => d.Weight_in_lbs)}}, 
                                                                d => d.Cylinders)

    carsRollup = carsRollup.map(([Cylinders, Data]) => ({Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Weight_in_lbs))])
    
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
                    .diffuseColor((d) => { let rgb = scaleC(d.Weight_in_lbs)
                                                      .replace(/[^\d,]/g, '')
                                                      .split(',')
                                                      .map((v) => v / 255)
                                            return new Color3(...rgb)}) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});
   
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

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    chart.name('cot');

    return chart;

}

function make3Dchart1(scene, id){
      
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort().reverse();

    //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let  carsRollup = d3.flatRollup(cars, (v) => { return {Weight_in_lbs: d3.mean(v, d => d.Weight_in_lbs),
                                                            Displacement: d3.mean(v, d => d.Displacement)}}, 
                                                            d => d.Origin,
                                                            d => d.Cylinders)

    carsRollup = carsRollup.map(([Origin, Cylinders, Data]) => ({ Origin, Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Weight_in_lbs))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Displacement))]).reverse()
    
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
                    .scalingY((d) => scaleY(d.Weight_in_lbs))
                    .positionY((d) => scaleY(d.Weight_in_lbs) / 2)
                    .material((d, i) => scaleC(d.Displacement)) 
                    //.diffuseColor((d) => scaleC(d.Miles_per_Gallon)) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    chart.name('cot');

    return chart;

}

function make3Dchart2(scene, id){
      
    //Get unique values for our categorical and ordinal scales
    const origin = [...new Set(cars.map(item => item.Origin))];
    const cylinders = [...new Set(cars.map(item => item.Cylinders))].sort().reverse();

    //Aggregate our data to the mean MPG and HP for two keys, origin and cylinders
    let  carsRollup = d3.flatRollup(cars, (v) => { return {Horsepower: d3.mean(v, d => d.Horsepower),
                                                            Acceleration: d3.mean(v, d => d.Acceleration)}}, 
                                                            d => d.Origin,
                                                            d => d.Cylinders)

    carsRollup = carsRollup.map(([Origin, Cylinders, Data]) => ({ Origin, Cylinders, ...Data }));

    //Get Min/Max values for our linear scales
    const horsepowerMinMax = d3.extent([...new Set(carsRollup.map(item => item.Horsepower))])
    const MPGMinMax = d3.extent([...new Set(carsRollup.map(item => item.Acceleration))])
    
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
                    .material((d, i) => scaleC(d.Acceleration)) 
                    //.diffuseColor((d) => scaleC(d.Miles_per_Gallon)) 

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    chart.name('cot');

    return chart;

}

function makeLineChart2D(scene, id){
    let CoT = new TransformNode("cot" + id);
    let chart = anu.selectName('cot' + id, scene);

 

    let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

    var parseTime = d3.timeParse("%m/%d/%Y");
    var dateFormat = d3.timeFormat("%y");
    let dates = data1.map((d) => parseTime(d.Date))
  
    var scaleX = d3.scaleTime().domain(d3.extent(dates)).range([-2, 2]);
    var scaleY = d3.scaleLinear().domain([0, 9]).range([-1, 1]).nice();
    var scaleC = d3.scaleSequential(d3.interpolateBlues).domain([1, -1]);

    let myPaths2 = years.map((r) => {
      return data1.map((c)=> {
            return new Vector3(
            scaleX(parseTime(c.Date)),
            scaleY(c[r])
          )
      })
    })

    const options = {
      pathArray: myPaths2, 
      updatable: true,
      sideOrientation: Mesh.DOUBLESIDE,
    };

    let whiteLines = anu
      .select("#cot" + id, scene)
      .bind("lineSystem", { lines: myPaths2 })
      .attr("color", new Color3(1, 1, 1))
      .prop("alpha", 1);

      anu.createAxes('test', scene, { parent: anu.select("#cot" + id, scene),
      scale: {x: scaleX, y: scaleY},
      domainMaterialOptions: { "color": Color3.Black(), width: 5},
      gridTicks: {x: scaleX.ticks(d3.timeYear.every(2))},
      labelTicks: {x: scaleX.ticks(d3.timeYear.every(2))},
      labelFormat: {x: dateFormat, y: (text) => {
                    if (text === undefined) {
                      return "0%";
                    } else {
                      return text + "%";
                    }}
                  }
    });
    chart.name('cot');
    return CoT;
}

function makeLineChart3D(scene, id){
    let CoT = new TransformNode("cot" + id);
    let chart = anu.selectName('cot' + id, scene);

    let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

    var parseTime = d3.timeParse("%m/%d/%Y");
    var dateFormat = d3.timeFormat("%y");
    let dates = data1.map((d) => parseTime(d.Date))
  
    var scaleX = d3.scaleTime().domain(d3.extent(dates)).range([-3, 3]);
    var scaleY = d3.scaleLinear().domain([0, 9]).range([-1, 1]).nice();
    var scaleZ = d3.scalePoint().domain(years).range([-2, 2]);
    var scaleC = d3.scaleSequential(d3.interpolateBlues).domain([1, -1]);

    let myPaths2 = years.map((r) => {
      return data1.map((c)=> {
            return new Vector3(
            scaleX(parseTime(c.Date)),
            scaleY(c[r]),
            scaleZ(r)
          )
      })
    })

    const options = {
      pathArray: myPaths2, 
      updatable: true,
      sideOrientation: Mesh.DOUBLESIDE,
    };

    let ribbonSelection = anu
      .select("#cot" + id, scene)
      .bind("ribbon", options)

    let ribbon = ribbonSelection.selected[0]

    var colors = ribbon.getVerticesData(VertexBuffer.ColorKind);
    if (!colors) {
      colors = [];

    var positions = ribbon.getVerticesData(VertexBuffer.PositionKind);
      
    for (var p = 0; p < positions.length; p+=3) {
      var color = scaleC(positions[p + 1])
        .substring(4, scaleC(positions[p + 1]).length - 1)
        .replace(/ /g, "")
        .split(",");

      colors.push(color[0] / 225, color[1] / 225, color[2] / 225, 1);
      }
    }

    ribbon.setVerticesData(VertexBuffer.ColorKind, colors);
    ribbon.isPickable = false; //mesh geometry is complex turning off picking is recommended for performance. 

    anu.createAxes('test', scene, { parent: anu.select("#cot" + id, scene),
                                    scale: {x: scaleX, y: scaleY, z: scaleZ},
                                    domainMaterialOptions: { "color": Color3.Black(), width: 5},
                                    gridTicks: {x: scaleX.ticks(d3.timeYear.every(2))},
                                    labelTicks: {x: scaleX.ticks(d3.timeYear.every(2))},
                                    labelFormat: {x: dateFormat, y: (text) => {
                                                  if (text == undefined) {
                                                    return text;
                                                  } else {
                                                    return text + "%";
                                                  }}
                                                }
                                  });

    let whiteLines = anu
      .select("#cot" + id, scene)
      .bind("lineSystem", { lines: myPaths2 })
      .attr("color", new Color3(1, 1, 1))
      .prop("alpha", 0.5);
  
    let  blackOutline = anu
      .select("#cot" + id, scene)
      .bind("lines", { points: myPaths2[0]})
      .attr("color", new Color3(0, 0, 0));
   
    chart.name("cot");
    return CoT;
}

function makeScatterplot2D(scene, id){
    //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between -10 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice(); //
  
  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. d3.schemecategory10 is an array of 10 color hexes
  var scaleC = d3.scaleOrdinal().domain(['setosa', 'versicolor', 'virginica']).range(d3.schemeCategory10)
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = anu.create("cot", "cot" + id);


  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot' + id, scene);

 
  //This series of chained methods will create our visualization 
  //Using our CoT as a parent we use bind to create sphere meshes for each row of our data
  let spheres = chart.bind('disc', {radius: 0.02, sideOrientation:2}, iris) 
    .positionX((d) => scaleX(d.sepalLength)) 
    .positionY((d) => scaleY(d.petalLength))  
    .positionZ((d) => - Math.random() * 0.01)
    .material((d, i) => new StandardMaterial("myMaterial", scene)) 
    .diffuseColor((d) => Color3.FromHexString(scaleC(d.species))) 

  anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});
    

  CoT.normalizeToUnitCube();

  chart.name("cot");
  return chart;
}

function makeScatterplot2D1(scene, id){
    //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between -10 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalWidth}))).range([-1,1]).nice(); //
  
  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. d3.schemecategory10 is an array of 10 color hexes
  var scaleC = d3.scaleOrdinal().domain(['setosa', 'versicolor', 'virginica']).range(d3.schemeCategory10)
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = anu.create("cot", "cot" + id);


  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot' + id, scene);

 
  //This series of chained methods will create our visualization 
  //Using our CoT as a parent we use bind to create sphere meshes for each row of our data
  let spheres = chart.bind('disc', {radius: 0.02, sideOrientation:2}, iris) 
    .positionX((d) => scaleX(d.sepalWidth)) 
    .positionY((d) => scaleY(d.petalWidth))  
    .positionZ((d) => - Math.random() * 0.01)
    .material((d, i) => new StandardMaterial("myMaterial", scene)) 
    .diffuseColor((d) => Color3.FromHexString(scaleC(d.species))) 

  anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY}});
    

  CoT.normalizeToUnitCube();

  chart.name("cot");
  return chart;
}

function makeScatterplot3D(scene, id){
    //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between -10 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice(); //
  var scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice(); //Same as X for our Y and Z dimensions 

  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. schemecategory10 is an array of 10 color hexes
  var scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = anu.create("cot", "cot" + id);

  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot' + id, scene);

  //This series of chained methods will create our visualization 
  //Using our CoT as a parent we use bind to create sphere meshes for each row of our data
  let spheres = chart.bind('sphere', {diameter: 0.05}, iris) 
    .positionX((d) => scaleX(d.sepalLength)) //most selection methods can either be passed a raw value, or a function that will return the correct value of the attribute
    .positionY((d) => scaleY(d.petalLength))  //When you pass a function the method will pass the data associated with the mesh as JSON and the index of the data (d,i)
    .positionZ((d) => scaleZ(d.sepalWidth)) //So we create a function that takes param d and since we know the keys of the data can pass d.<key> into our function that returns an int
    .material((d) => scaleC(d.species))
   
        
    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});
    chart.name("cot");
    return chart;
}

function makeScatterplot3D1(scene, id){
    //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between -10 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalWidth}))).range([-1,1]).nice(); //
  var scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice(); //Same as X for our Y and Z dimensions 

  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. schemecategory10 is an array of 10 color hexes
  var scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = anu.create("cot", "cot" + id);

  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot' + id, scene);

  //This series of chained methods will create our visualization 
  //Using our CoT as a parent we use bind to create sphere meshes for each row of our data
  let spheres = chart.bind('sphere', {diameter: 0.05}, iris) 
    .positionX((d) => scaleX(d.petalLength)) //most selection methods can either be passed a raw value, or a function that will return the correct value of the attribute
    .positionY((d) => scaleY(d.petalWidth))  //When you pass a function the method will pass the data associated with the mesh as JSON and the index of the data (d,i)
    .positionZ((d) => scaleZ(d.sepalWidth)) //So we create a function that takes param d and since we know the keys of the data can pass d.<key> into our function that returns an int
    .material((d) => scaleC(d.species))
   
        
    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});
    chart.name("cot");
    return chart;
}