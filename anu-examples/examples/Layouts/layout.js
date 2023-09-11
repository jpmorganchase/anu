// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

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
import * as anu from 'anu';
import * as gui from '@babylonjs/gui'
import { assign, update } from 'lodash-es';

export function layout(babylonEngine){
    const scene = new Scene(babylonEngine)
    new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(10.5,7,-10.5);
   
    //Create layout given grid number
    //A parent object for overall layout, and a new parent for each selections, then scale
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

    var assignment = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    
    //get all charts with the name
    let charts = anu.selectName('cot', scene);

    //randomize the scaling
    charts.scalingX((d) => Math.max(Math.random(), .5) * 2)
    charts.scalingY((d) => Math.max(Math.random(), .5) * 2)
    chart4.scalingZ((d) => Math.max(Math.random(), .4) * 2)
    chart6.scalingZ((d) => Math.max(Math.random(), .4) * 2)
    chart9.scalingZ((d) => Math.max(Math.random(), .4) * 2)

    var scalings = [];

    charts.selected.forEach((node, i) => {
        scalings.push(node.scaling);
    })

    //let test = new anu.Selection([charts.selected[0]], scene);
    
    let box = new Mesh("BGPlane", scene);

    box.setBoundingInfo(new BoundingInfo(charts.boundingBox().boundingBox.minimumWorld, charts.boundingBox().boundingBox.maximumWorld));

    //makeCylinderLayOut(charts, {rownum: 2, distance: 8, padding: 1})
    //makeCockpitLayOut(charts, {distance: 13, padding: 12, verAng : 40})
    //spherial

    //charts.positionY((d, m, i) => i + widthY * 2)
    //charts.positionY((d, m, i) => i + (charts.selectId('i').boundingBox().boundingBox.maximumWorld.z - charts.selectId('i').boundingBox().boundingBox.minimumWorld.z))
    //console.log(charts.boundingBox())

    charts.selected.forEach((node, i) => {
        let m = new Mesh("cell", scene);
        node.setParent(m);
    })

    let cells = anu.selectName('cell', scene);

    makeGrids(scene, charts, box, cells, {rownum: 3, padding: 1, stretch: 0});
    updatePlaneLayOut(scene, charts, cells, assignment, box, scalings, {stretch: 0});


    console.log(charts.selected)
    
    let parent = new Mesh("BGPlane", scene);

    scene.registerBeforeRender(() => {
        makeBGBox(scene, cells, parent, {xpadding: 1, ypadding: 1, zpadding: 1}).showBoundingBox = true;
    });

    scene.getBoundingBoxRenderer().showBackLines = false;

    var isstretch = 0;
    var iszalign = 0;

    var rows;

    var changeRow = function(rownum) {
        rows = rownum;
        makeGrids(scene, charts, box, cells, {rownum: rownum, padding: 1});
        updatePlaneLayOut(scene, charts, cells, assignment, box, scalings, {zalign: iszalign, stretch: isstretch});
    }

    var displayValue = function(value) {
        return Math.floor(value);
    }


    var toStretch = function(isChecked) {
		if (isChecked) {
            isstretch = 1;
        }
        else {
            isstretch = 0;
        }
        updatePlaneLayOut(scene, charts, cells, assignment, box, scalings, {stretch: isstretch, zalign: iszalign});
	}

    var toAlign = function(isChecked) {
		if (isChecked) {
            iszalign = 1;
        }
        else {
            iszalign = 0;
        }
        updatePlaneLayOut(scene, charts, cells, assignment, box, scalings, {rownum: rows, padding: 1, stretch: isstretch, zalign: iszalign});
	}

    var transformGroup = new gui.CheckboxGroup("Settings");
	transformGroup.addCheckbox("Stretch", toStretch);
	transformGroup.addCheckbox("Zalign", toAlign);

    var rotateGroup = new gui.SliderGroup("Config", "S");
	rotateGroup.addSlider("row", changeRow, "rows", 1, 6, 3, displayValue);

    var advancedTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var selectBox = new gui.SelectionPanel("sp", [rotateGroup, transformGroup]);
    selectBox.width = 0.25;
    selectBox.height = 0.25;
    selectBox.background = "#FFFFFF";
    selectBox.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_BOTTOM;
    
    /* Change Font  */
    selectBox.fontFamily = "times new roman";
    selectBox.fontSize = "20pt";

    advancedTexture.addControl(selectBox);

    var toHold = -2;
    var currentID;

    charts.selected.forEach((node, i) => {
        var pointerDragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0, 0, 1)});
        pointerDragBehavior.useObjectOrientationForDragging = false;
        pointerDragBehavior.onDragStartObservable.add((event)=>{
            // node.setParent(null);
            if(node.parent != null)
                node.parent = null;

            toHold = assignment[i];
            assignment[i] = -1;
            currentID = i;
            //console.log(assignment);
            console.log(currentID)

        })
        pointerDragBehavior.onDragObservable.add((event)=>{
            var newID = findClosestCell(node, cells, i);
            if(newID != currentID){
                assignment = array_move(assignment, currentID, newID)
                currentID = newID;
                console.log("moved");
                updatePlaneLayOut(scene, charts, cells, assignment, box, scalings, {rownum: rows, padding: 1, stretch: isstretch, zalign: iszalign});
            }
        })
        pointerDragBehavior.onDragEndObservable.add((event)=>{
            for(var i = 0; i < assignment.length; i ++){
                if(assignment[i] == -1){
                    assignment[i] = toHold;
                    if(node.parent == null)
                        node.setParent(cells.selected[i]);
                }
            }
            console.log(assignment);
            restoreLayout(scene, charts, cells, assignment, box, scalings, {rownum: rows, padding: 1, stretch: isstretch, zalign: iszalign});
        })
        node.addBehavior(pointerDragBehavior)
    });

    return scene;
}

function getForwardVector(_mesh) {
    _mesh.computeWorldMatrix(true);
    var forward_local = new Vector3(0, 0, 1);
    worldMatrix = _mesh.getWorldMatrix();
    return Vector3.TransformNormal(forward_local, worldMatrix);
}


function makeBGBox(scene, cells, parent, options){
    let xpadding = options.xpadding || 0
    let ypadding = options.ypadding || 0
    let zpadding = options.zpadding || 0

    let selectionMin = new Vector3(0, 0, 0);
    let selectionMax = new Vector3(0, 0, 0);

    cells.selected.forEach((node, i) => {
        let nodeMin = node.getBoundingInfo().boundingBox.minimumWorld;
        let nodeMax = node.getBoundingInfo().boundingBox.maximumWorld;
        selectionMin = Vector3.Minimize(selectionMin, nodeMin);
        selectionMax = Vector3.Maximize(selectionMax, nodeMax);
    });

    let minBound = new Vector3(selectionMin.x - xpadding, selectionMin.y - ypadding, selectionMin.z - zpadding)

    let maxBound = new Vector3(selectionMax.x + xpadding, selectionMax.y + ypadding, selectionMax.z + zpadding)

    parent.setBoundingInfo(new BoundingInfo(minBound, maxBound));

    return parent;
}

function makeGrids(scene, charts, box, cells, options){
    let rownum = options.rownum || 1
    let padding = options.padding || 1

    let chartnum = charts.selected.length

    var widthX = box.getBoundingInfo().boundingBox.maximumWorld.x - box.getBoundingInfo().boundingBox.minimumWorld.x;
    var widthY = box.getBoundingInfo().boundingBox.maximumWorld.y - box.getBoundingInfo().boundingBox.minimumWorld.y;
    var widthZ = box.getBoundingInfo().boundingBox.maximumWorld.z - box.getBoundingInfo().boundingBox.minimumWorld.z;

    var colnum = 0

    colnum = chartnum % rownum == 0 ? chartnum / rownum : Math.floor(chartnum / rownum) + 1;

    // cells.selected.forEach((node, i) => {
    //     node.getChildren().forEach(child => child.parent = null);
    // })

    for(var i = 0; i < charts.selected.length; i++) {
        cells.selected[i].id = i;
        cells.selected[i].setBoundingInfo(new BoundingInfo(box.getBoundingInfo().boundingBox.minimumWorld, box.getBoundingInfo().boundingBox.maximumWorld));
        animatePosition(scene, cells.selected[i], new Vector3(i % colnum * (widthX + padding), Math.floor(i / colnum) * (widthY + padding), 0));
        //cells.selected[i].position = new Vector3(i % colnum * (widthX + padding), Math.floor(i / colnum) * (widthY + padding), 0);
        cells.selected[i].showBoundingBox = true;
    }
}

function animatePosition(scene, obj, newPos){
    var animationBezierTorus = new Animation("animationBezierTorus", "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keysBezierTorus = [];
    keysBezierTorus.push({ frame: 0, value: obj.position });
    keysBezierTorus.push({ frame: 20, value: newPos });
    animationBezierTorus.setKeys(keysBezierTorus);
    var bezierEase = new BezierCurveEase(0.73, 0, 0.31, 1);
    animationBezierTorus.setEasingFunction(bezierEase);
    //obj.animations.length = 0;
    obj.animations.push(animationBezierTorus);
    scene.beginAnimation(obj, 0, 20, false);
}

function animateScale(scene, obj, newScale){
    var animationBezierTorus = new Animation("animationBezierTorus", "scaling", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keysBezierTorus = [];
    keysBezierTorus.push({ frame: 0, value: obj.scaling });
    keysBezierTorus.push({ frame: 10, value: newScale });
    animationBezierTorus.setKeys(keysBezierTorus);
    var bezierEase = new BezierCurveEase(0.73, 0, 0.31, 1);
    animationBezierTorus.setEasingFunction(bezierEase);
    obj.animations.length = 0;
    obj.animations.push(animationBezierTorus);
    scene.beginAnimation(obj, 0, 10, true);
}

function restoreLayout(scene, charts, cells, assignment, box, scalings, options){
    let stretch = options.stretch || 0
    let zalign = options.zalign || 0

    var widthX = box.getBoundingInfo().boundingBox.maximumWorld.x - box.getBoundingInfo().boundingBox.minimumWorld.x;
    var widthY = box.getBoundingInfo().boundingBox.maximumWorld.y - box.getBoundingInfo().boundingBox.minimumWorld.y;
    var widthZ = box.getBoundingInfo().boundingBox.maximumWorld.z - box.getBoundingInfo().boundingBox.minimumWorld.z;

    for(var i = 0; i < charts.selected.length; i++) {
        charts.selected[assignment[i]].setParent(cells.selected[i]);
            //charts.selected[assignment[i]].position = new Vector3(0, 0, 0);
            // animatePosition(scene, charts.selected[assignment[i]], new Vector3(0, 0, 0))
    }

    shiftMoves(scene, charts, assignment)
}

function updatePlaneLayOut(scene, charts, cells, assignment, box, scalings, options){

    let stretch = options.stretch || 0
    let zalign = options.zalign || 0

    var widthX = box.getBoundingInfo().boundingBox.maximumWorld.x - box.getBoundingInfo().boundingBox.minimumWorld.x;
    var widthY = box.getBoundingInfo().boundingBox.maximumWorld.y - box.getBoundingInfo().boundingBox.minimumWorld.y;
    var widthZ = box.getBoundingInfo().boundingBox.maximumWorld.z - box.getBoundingInfo().boundingBox.minimumWorld.z;

    for(var i = 0; i < charts.selected.length; i++) {
        if(assignment[i] != -1 && charts.selected[assignment[i]].parent != null){
            charts.selected[assignment[i]].setParent(cells.selected[i]);
            //charts.selected[assignment[i]].position = new Vector3(0, 0, 0);
            //animatePosition(scene, charts.selected[assignment[i]], new Vector3(0, 0, 0))
        }
    }
    //need to set padding, starting position, orientation etc
    //Some element has larger size but some with lower size

    if(stretch){
        charts.selected.forEach((node, i) => {
            var newX = widthX / 6;
            var newY = widthY / 6;
            var newZ = widthZ / 6;
            animateScale(scene, node, new Vector3(newX, newY, newZ));
        })
    } else {
        charts.selected.forEach((node, i) => {
            animateScale(scene, node, scalings[i].clone());
        })
    }
    
    if(zalign){
        charts.selected.forEach((node, i) => {
            if(node.parent != null){
                let test = new anu.Selection([node], scene);
                var zSize = test.boundingBox().boundingBox.maximumWorld.z - test.boundingBox().boundingBox.minimumWorld.z;
                //node.position.z = zSize / 2 - widthZ / 2;
                animatePosition(scene, node, new Vector3(node.position.x, node.position.y, zSize / 2 - widthZ / 2));
            }
        })
    } else {
        charts.selected.forEach((node, i) => {
            if(node.parent != null){
            // node.position.z = 0;
                animatePosition(scene, node, new Vector3(node.position.x, node.position.y, 0));
            }
        })
    }

    shiftMoves(scene, charts, assignment)
}

function shiftMoves(scene, charts, assignment){
    for(var i = 0; i < charts.selected.length; i++) {
        if(assignment[i] != -1 && charts.selected[assignment[i]].parent != null){
            //charts.selected[i].animations.length = 0;
            animatePosition(scene, charts.selected[assignment[i]], new Vector3(0, 0, 0))
        }
    }
}

//not assuming the position of the anchor
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
    new anu.Axis('testAxis', scene, {cot: chart, x: scaleX, y: scaleY})
    .shape()
    .background()
    .ticks()
    .grid();

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
    new anu.Axis('testAxis', scene, {cot: chart, x: scaleX, y: scaleY, z: scaleZ})
    .shape()
    .background()
    .ticks()
    .grid();
   
    return chart;

}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

function findClosestCell(grabbedcell, cells, grabbedindex){
    var dist = 100;
    var index;

    for(var i = 0; i < cells.selected.length; i++){
        if(i != grabbedindex){
            var distThis = Vector3.Distance(cells.selected[i].position, grabbedcell.position);
            if(distThis < dist){
                dist = distThis;
                index = i;
            }
        }
    }

    return index;
}