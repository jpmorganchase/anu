<template>
  <div class="singleView-container">
    <canvas ref="canvas" class="singleView-canvas" id="singleView-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
import { Engine, Scene, Color3, Vector3, WebXRDefaultExperience, WebXRFeatureName, WebXRHandTracking, WebXRState} from '@babylonjs/core'

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

  let scene = await props.scene(babylonEngine);

  // const env = scene.createDefaultEnvironment();
  // env.setMainColor(Color3.FromHexString('#0e0e17'));
  // env.ground.position = new Vector3(0, -2, 0);

  try {
    //{ floorMeshes: [env.ground] }
    var defaultXRExperience = await scene.createDefaultXRExperienceAsync();

    defaultXRExperience.enterExitUI.overlay.style.position = 'relative';
    defaultXRExperience.enterExitUI.overlay.style.float = 'right';


    if (!defaultXRExperience.baseExperience) {
      console.log('No XR');
    } else {
      const featureManager = defaultXRExperience.baseExperience.featuresManager;

      defaultXRExperience.baseExperience.onStateChangedObservable.add((state) => {
        if (state === WebXRState.ENTERING_XR) {
          //Special exceptions for certain scenes
          switch (scene.metadata?.name) {
            case "thinInstances":
              console.log("Disabling GPU Picking interactions in WebXR due to lack of support.")
              scene.onPointerObservable.clear();
              break;
          }
        }
      });

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