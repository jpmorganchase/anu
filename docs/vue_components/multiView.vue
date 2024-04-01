<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, onBeforeMount, onMounted} from 'vue';
import { Engine, Scene, Color3, Vector3, WebXRDefaultExperience, WebXRFeatureName, WebXRHandTracking} from '@babylonjs/core'
// import { Inspector } from "@babylonjs/inspector";

let canvas = document.createElement('canvas');
let engine = new Engine(canvas, true)

async function createScene(e){
  let canvas = e.detail.canvas;

  let module = await import("../anu-examples/" + e.detail.scene + ".js")
  let fn = Object.keys(module)[0];
  let scene = await module[fn](engine)
  let view = engine.registerView(canvas, scene.activeCamera);
  const env = scene.createDefaultEnvironment();
  env.setMainColor(Color3.FromHexString('#0e0e17'));
  env.ground.position = new Vector3(0, -2, 0);

  scene.detachControl();

  canvas.addEventListener('mouseout', (i) => {
   scene.detachControl();
  })

  canvas.addEventListener('mouseover', (i) => {
    engine.inputElement = canvas
    scene.attachControl();

  //   if (e.detail.inspector) {
  //     Inspector.hide()
  //     Inspector.show(scene, {
  //        globalRoot: canvas.parentElement,
  //        embedMode: true,
  //        showInspector: false,
  //      });
  //   }
  });

  engine.activeView = view;


  engine.runRenderLoop(() => {
    if (engine.activeView === view) {
    
      scene.render();

    }
    // scene.render();
  });

    
     
}

window.addEventListener('test', createScene)

window.addEventListener('resize', function () {
      engine?.resize();
    });

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