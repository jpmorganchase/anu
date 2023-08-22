// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Contains the styles for our page, currently setting body,app div, and canvas to 100% h&w
import './style.css'
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

//Import all of babylonjs, you most likely want to import individual methods as needed
import { Engine, Scene, Color3 } from "@babylonjs/core";
import {scatterplot3D } from './examples/ScatterPlots/Scatterplot3D';
import { barchart3D } from './examples/BarCharts/barchart3d';
import { box } from './examples/FirstSteps/Box';
import { box_data } from './examples/FirstSteps/Box_With_Data';
import { box_bind } from './examples/FirstSteps/Box_Bind';
import { box_selection } from './examples/FirstSteps/Box_Selection';
import { select } from './examples/Selections/select';
import { select_name_tag } from './examples/Selections/select_name_tag';
import { linechart3D } from './examples/LineCharts/linechart3D';
import { scatterplot2D } from './examples/ScatterPlots/Scatterplot2D';
import { barchart2d } from './examples/BarCharts/barchart2d';
import { linechart2D } from './examples/LineCharts/linechart2D';
import { textureMap } from './examples/Geographic/Texture_Map';
import { textureGlobe } from './examples/Geographic/Texture_Globe';
import { layout } from './examples/Layouts/layout';
import { cotBind } from './examples/Selections/cot_bind';
import { spheresBind } from './examples/Selections/spheres_bind';
import { cotTransform } from './examples/Selections/cot_transform';
import { boxesTransform } from './examples/Selections/boxes_transform';
import { selectBoxes } from './examples/Selections/select_boxes';
import { modValue } from './examples/Selections/mod_value';
import { modFunction } from './examples/Selections/mod_function';



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//Grab DOM element where we will atach our canvas. #app is the id assiged to an empty <div> in our index.html 
const app = document.querySelector('#app');
//Create a canvas element and appened it to #app div
const canvas = document.createElement('canvas');
app.appendChild(canvas);

//initialize babylon engine, passing in our target canvas element, and create a new scene
const babylonEngine = new Engine(canvas, true)

//This is an object of scene functions we can call dynamically to help us switch scenes. 
const scenes = {
  'box': box,
  'box_data': box_data,
  'box_bind': box_bind,
  'box_selection': box_selection,
  'select': select,
  'select_name_tag': select_name_tag,
  'scatterplot3D': scatterplot3D, 
  'barchart3D': barchart3D, 
  'linechart3D': linechart3D,
  'scatterplot2D': scatterplot2D,
  'barchart2D': barchart2d,
  'linechart2D': linechart2D,
  'textureMap': textureMap,
  'textureGlobe': textureGlobe,
  'layout': layout,
  'cot_bind': cotBind,
  'spheres_bind': spheresBind,
  'cot_transform': cotTransform,
  'boxes_transform': boxesTransform,
  'select_boxes': selectBoxes,
  'mod_value': modValue,
  'mod_function': modFunction
}

let scene = scenes[urlParams.get('example')](babylonEngine);
scene.clearColor = new Color3(30/256,30/256,32/256)

//Render the scene we created
babylonEngine.runRenderLoop(() => {
  scene.render()
})

//Listen for window size changes and resize the scene accordingly 
window.addEventListener("resize", function () {
  babylonEngine.resize();
});

// scene.debugLayer.show();

// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
    // Shift+Ctrl+Alt+I
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
    }
});
