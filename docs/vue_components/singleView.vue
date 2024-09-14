<template>
  <div class="singleView-container">
    <canvas ref="canvas" class="singleView-canvas" id="singleView-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
import { Engine, Scene, Color3, Vector3, WebXRDefaultExperience, WebXRFeatureName, WebXRHandTracking} from '@babylonjs/core'

const props = defineProps({
  scene: Function,
});

let canvas = ref();

let babylonEngine;

 function resize() {
    babylonEngine?.resize();
  }

onMounted(async () => {
  canvas.value.addEventListener('wheel', evt => evt.preventDefault());
  babylonEngine = new Engine(canvas.value, true);

  let scene = props.scene(babylonEngine);

  const env = scene.createDefaultEnvironment();
  env.setMainColor(Color3.FromHexString('#0e0e17'));
  env.ground.position = new Vector3(0, -2, 0);

  try {
    var defaultXRExperience = await scene.createDefaultXRExperienceAsync({ floorMeshes: [env.ground] });

    defaultXRExperience.enterExitUI.overlay.style.position = 'relative';
    defaultXRExperience.enterExitUI.overlay.style.float = 'right';

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

  window.addEventListener('resize', resize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  babylonEngine?.dispose();
});
</script>

<style>
.singleView-container {
  margin-bottom: 2px;
  width: 100%;
}

.singleView-canvas {
  width: 100%;
  height: 50vh;
}
</style>