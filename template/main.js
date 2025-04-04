
import "@babylonjs/inspector";
import * as BABYLON from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.

//Grab DOM element where we will attach our canvas. #app is the id assigned to an empty <div> in our index.html 
const app = document.querySelector('#app');
//Create a canvas element and append it to #app div
const canvas = document.createElement('canvas');
app.appendChild(canvas);

//initialize babylon engine, passing in our target canvas element, and create a new scene
const babylonEngine = new BABYLON.Engine(canvas, true)

//create a scene object using our engine
const scene = new BABYLON.Scene(babylonEngine)

//Add lights and a camera
new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene)
const camera = new BABYLON.ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
camera.position = new BABYLON.Vector3(-10, 10, -20)
camera.attachControl(true)

//Make a box as a anu Selection object
let box = anu.bind('box');

//Render the scene we created
babylonEngine.runRenderLoop(() => {
  scene.render()
})

//Listen for window size changes and resize the scene accordingly 
window.addEventListener("resize", function () {
  babylonEngine.resize();
});

//enable webXR through babylon and enable some features like multi-view layers and space warp for better performance on supported devices/browsers. 
//if you browser does not support these feature comment it out. 
try {
  var defaultXRExperience = await scene.createDefaultXRExperienceAsync({});
  const featureManager = defaultXRExperience.baseExperience.featuresManager;
  featuresManager.enableFeature(WebXRFeatureName.LAYERS, "latest", { preferMultiviewOnInit: true }, true, false);
  featuresManager.enableFeature(WebXRFeatureName.SPACE_WARP, "latest");
} catch {
  console.warn('XR Not Supported');
}


// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
    // Shift+i
    if (ev.key === "I") {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
    }
});
