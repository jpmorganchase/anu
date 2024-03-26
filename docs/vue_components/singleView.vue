<template>
  <div class="canvas-container">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { WebXRFeatureName } from '@babylonjs/core/XR/webXRFeaturesManager.js'
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience.js'
import { WebXRHandTracking } from "@babylonjs/core/XR/features/WebXRHandTracking"



const props = defineProps({
  scene: Function,
});

let babylonEngine;

onMounted(async () => {
  const canvas = document.querySelector('#canvas');

  babylonEngine = new Engine(canvas, true);

  let scene = props.scene(babylonEngine);

  const env = scene.createDefaultEnvironment();
  env.setMainColor(Color3.FromHexString('#0e0e17'));
  env.ground.position = new Vector3(0, -2, 0);

  try {
    var defaultXRExperience = await scene.createDefaultXRExperienceAsync({ floorMeshes: [env.ground] });

    defaultXRExperience.enterExitUI.overlay.style.position = "relative"
    defaultXRExperience.enterExitUI.overlay.style.float = "right"

    if (!defaultXRExperience.baseExperience) {
      console.log('No XR');
    } else {
      const featureManager = defaultXRExperience.baseExperience.featuresManager;

      if (!featureManager) {
        console.log('No Feature Manager');
      } else {
        defaultXRExperience.baseExperience.featuresManager.enableFeature(WebXRFeatureName.HAND_TRACKING, 'latest', {
          xrInput: defaultXRExperience.input,
        });
      }
    }
  } catch {
    console.warn('XR Not Supported');
  }

  babylonEngine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', function () {
    babylonEngine.resize();
  });
});

onUnmounted(() => {
  babylonEngine?.dispose();
});
</script>

<style>


.canvas-container {
    margin-bottom: 2px;
}

#canvas {
  width: 100%;
  height: 50vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>