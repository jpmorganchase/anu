<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, onBeforeMount, onMounted} from 'vue';
import { Engine, Scene, Color3, Vector3, WebXRDefaultExperience, WebXRFeatureName, WebXRHandTracking} from '@babylonjs/core'
import { Inspector } from '@babylonjs/inspector';
import { JSONfn } from 'jsonfn';


let worker = new Worker(new URL('./worker.js', import.meta.url), {type: 'module'});


async function createScene(e){
  let canvas = e.detail.canvas;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  var offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({"canvas": offscreen, "scene": JSONfn.stringify(e.detail.scene) }, [offscreen]);
  worker.onmessage = function(event){
        console.log(event.data);
    };
    // let scene = await e.detail.scene(engine)
    // let view = engine.registerView(e.detail.canvas, scene.activeCamera);
    // const env = scene.createDefaultEnvironment();
    // env.setMainColor(Color3.FromHexString('#0e0e17'));
    // env.ground.position = new Vector3(0, -2, 0);

    // scene.detachControl();

    // e.detail.canvas.addEventListener('mouseout', (i) => {
    //   scene.detachControl();
    // })

    // e.detail.canvas.addEventListener('mouseover', (i) => {
    //   engine.inputElement = e.detail.canvas;
    //   scene.attachControl();

    //   if (e.detail.inspector) {
    //     Inspector.Show(scene, {
    //       globalRoot: e.detail.canvas.parentElement,
    //       embedMode: true,
    //       showInspector: false,
    //     });
    //   }
    // });

    // engine.activeView = view;

    // engine.runRenderLoop(() => {
    //   if (engine.activeView === view) {
    //     scene.render();
    //   }
    // });
     
}

window.addEventListener('test', createScene)

// window.addEventListener('resize', function () {
//       engine?.resize();
//     });

onBeforeUnmount(() => {
  engine.dispose();
  window.removeEventListener('test', createScene);
});
</script>

<style>
.singleView-container {
  margin-bottom: 2px;
  width: 100%;
  height: 50vh;
  border: 2px;
}

.singleView-canvas {
  width: 100%;
  height: 50vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>