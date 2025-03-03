
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { HemisphericLight, ArcRotateCamera, Vector3, Scene, Engine, DefaultLoadingScreen} from '@babylonjs/core';
import lesson from "./lesson";


//Grab DOM element where we will attach our canvas. #app is the id assigned to an empty <div> in our index.html 
const app = document.querySelector('#app');
//Create a canvas element and append it to #app div
const canvas = document.createElement('canvas');
app.appendChild(canvas);

//initialize babylon engine, passing in our target canvas element, and create a new scene
const babylonEngine = new Engine(canvas, true)

const loadingScreen = new DefaultLoadingScreen(canvas);

//create a scene object using our engine
const scene = new Scene(babylonEngine)

//Add lights and a camera
new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
camera.position = new Vector3(-10, 10, -20)
camera.attachControl(true)

//Call your function executing our lesson code from lesson.js passing our scene for support 
lesson(scene)


//Render the scene we created
babylonEngine.runRenderLoop(() => {
  scene.render()
})

//Listen for window size changes and resize the scene accordingly 
window.addEventListener("resize", function () {
  babylonEngine.resize();
});


scene.debugLayer.show({embedMode: true});


// hide/show the Inspector with i
window.addEventListener("keydown", (ev) => {
    if (ev.key == 'I') {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show({embedMode: true});
        }
    }
});
