// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Contains the styles for our page, currently setting body,app div, and canvas to 100% h&w
import './style.css'
import { Engine, WebXRFeatureName } from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';

//Import all of babylonjs, you most likely want to import individual methods as needed
import { select_data } from './examples/Selections/select_data';
import { prop } from './examples/Selections/prop';
import { props } from './examples/Selections/props';
import { animate } from './examples/Animation/animate';
import { selectionTest } from './examples/Selections/selectionTest';
import { proxyTest } from './examples/Selections/proxyTest';
import { transitionTest } from './examples/Animation/transitionTest';


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//Grab DOM element where we will atach our canvas. #app is the id assiged to an empty <div> in our index.html 
const app = document.querySelector('#app');
//Create a canvas element and appened it to #app div
const canvas = document.createElement('canvas');
canvas.id = "renderCanvas";
app.appendChild(canvas);

//initialize babylon engine, passing in our target canvas element, and create a new scene
const babylonEngine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});

//This is an object of scene functions we can call dynamically to help us switch scenes. 
const scenes = {
  'select_data': select_data,
  'prop': prop,
  'props': props,
  'animate': animate,
  'selectionTest': selectionTest,
  'proxyTest': proxyTest,
  'transitionTest': transitionTest,
}


let scene = await scenes[urlParams.get('example')](babylonEngine);

let screenshot = urlParams.get('thumbnail') || false;
// scene.clearColor = new Color3(30/256,30/256,32/256)

// let env = scene.createDefaultEnvironment();
// //let sky = scene.createDefaultSkybox(scene.environmentTexture, true, (scene.activeCamera.maxZ - scene.activeCamera.minZ)/2, 0.3, false);

// env.setMainColor(Color3.FromHexString('#14161a'))
// env.ground.position = new Vector3(0,-0.3,0)




if (screenshot == true){
  console.log("screenshot")
  scene.onReadyObservable.add(() => {
    setTimeout(() => scene.dispose(), 1000)
  });
} else {

  try {
  var defaultXRExperience = await scene.createDefaultXRExperienceAsync( { floorMeshes: [env.ground],  disableTeleportation: true}  );

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
  } catch {
    console.warn('XR Not Supported');
  }
}

//Render the scene we created
babylonEngine.runRenderLoop(() => {
  scene.render()
})

// Signal readiness to Playwright tests
function markReady() {
  if (canvas) {
    canvas.setAttribute('data-ready', '1');
  }
}

if (scene.isReady()) {
  markReady();
} else {
  scene.onReadyObservable.addOnce(() => {
    markReady();
  });
}

//Listen for window size changes and resize the scene accordingly 
window.addEventListener("resize", function () {
  babylonEngine.resize();
});

// scene.debugLayer.show();
// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
    // Shift+Ctrl+Alt+I
    if (ev.key === "I") {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
    }
});
