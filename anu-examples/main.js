// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Contains the styles for our page, currently setting body,app div, and canvas to 100% h&w
import './style.css'
import * as BABYLON from "@babylonjs/core";
import { Engine, Color3, WebXRFeatureName, Scene, WebXRHandTracking, Vector3} from '@babylonjs/core';

//Import all of babylonjs, you most likely want to import individual methods as needed
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
import { layoutNew } from './examples/Layouts/layoutNew';
import { cotBind } from './examples/Selections/cot_bind';
import { spheresBind } from './examples/Selections/spheres_bind';
import { cotTransform } from './examples/Selections/cot_transform';
import { boxesTransform } from './examples/Selections/boxes_transform';
import { selectBoxes } from './examples/Selections/select_boxes';
import { modValue } from './examples/Selections/mod_value';
import { modFunction } from './examples/Selections/mod_function';
import { prop } from './examples/Selections/prop';
import { props } from './examples/Selections/props';
import { scatterPlot3DStep1 } from './examples/CreateAVis/step1';
import { scatterPlot3DStep2 } from './examples/CreateAVis/step2';
import { scatterPlot3DStep3 } from './examples/CreateAVis/step3';
import { axesTest } from './examples/Axes/axesTest';
import { text } from './examples/Text/text';
import { scatterPlot3DStep4 } from './examples/CreateAVis/step4';
import { scatterPlot3DStep5 } from './examples/CreateAVis/step5';
import { scatterPlot3DStep6 } from './examples/CreateAVis/step6';
import { meshMap } from './examples/Geographic/Mesh_Map';
import { facetPosition } from './examples/Interactions/FacetPosition';





const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//Grab DOM element where we will atach our canvas. #app is the id assiged to an empty <div> in our index.html 
const app = document.querySelector('#app');
//Create a canvas element and appened it to #app div
const canvas = document.createElement('canvas');
app.appendChild(canvas);

//initialize babylon engine, passing in our target canvas element, and create a new scene
const babylonEngine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});

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
  'layoutNew': layoutNew,
  'cot_bind': cotBind,
  'spheres_bind': spheresBind,
  'cot_transform': cotTransform,
  'boxes_transform': boxesTransform,
  'select_boxes': selectBoxes,
  'mod_value': modValue,
  'mod_function': modFunction,
  'prop': prop,
  'props': props,
  'scatterPlot3DStep1': scatterPlot3DStep1,
  'scatterPlot3DStep2': scatterPlot3DStep2,
  'scatterPlot3DStep3': scatterPlot3DStep3,
  'scatterPlot3DStep4': scatterPlot3DStep4,
  'scatterPlot3DStep5': scatterPlot3DStep5,
  'scatterPlot3DStep6': scatterPlot3DStep6,
  'axesTest': axesTest,
  'text': text,
  'meshMap': meshMap,
  'facetposition': facetPosition
}

let scene = scenes[urlParams.get('example')](babylonEngine);
//scene.clearColor = new BABYLON.Color3(30/256,30/256,32/256)

const env = scene.createDefaultEnvironment();
env.setMainColor(Color3.FromHexString('#0e0e17'));
env.ground.position = new Vector3(0,-2,0);


var defaultXRExperience = await scene.createDefaultXRExperienceAsync( { floorMeshes: [env.ground]}  );

if (!defaultXRExperience.baseExperience) {
  console.log("No XR")
  } else {

    const featureManager = defaultXRExperience.baseExperience.featuresManager;

    if (!featureManager) {

      console.log("No Feature Manager")

  } else {

      defaultXRExperience.baseExperience.featuresManager.enableFeature(WebXRFeatureName.HAND_TRACKING, "latest", {
          xrInput: defaultXRExperience.input
      });
      
    }
}

//Render the scene we created
babylonEngine.runRenderLoop(() => {
  scene.render()
})

//Listen for window size changes and resize the scene accordingly 
window.addEventListener("resize", function () {
  babylonEngine.resize();
});





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
