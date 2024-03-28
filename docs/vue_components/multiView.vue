<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Inspector } from '@babylonjs/inspector';
import { tree } from 'd3';

function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
  if(!callback) return new Promise(r => callback=r);
}

let engine;

window.addEventListener('test', (e) => {
  let canvas = document.createElement('canvas');

  let engine = new Engine(canvas, true);

  let scene = e.detail.scene(engine);

  engine.registerView(e.detail.canvas);

  const env = scene.createDefaultEnvironment();
  env.setMainColor(Color3.FromHexString('#0e0e17'));
  env.ground.position = new Vector3(0, -2, 0);

  e.detail.canvas.addEventListener('mouseover', (i) => {
    scene.detachControl();
    engine.inputElement = e.detail.canvas;
    scene.attachControl();

   if (e.detail.inspector) {
      Inspector.Show(scene, {
        globalRoot: e.detail.canvas.parentElement,
        embedMode: true,
        showInspector: false,
      });
    }

  });

   

  engine.runRenderLoop(() => {
    scene.render();
  });

});


  window.addEventListener('resize', function () {
    engine?.resize();
  });

onUnmounted(() => {
  engine?.dispose();
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