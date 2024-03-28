<template>
  <div class="inlineView-container">
    <canvas ref="canvas" class="inlineView-canvas" id="inlineView-canvas"></canvas>
  </div>
</template>

<script setup>
  import inlineView from "../vue_components/inlineView.vue"
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { WebXRFeatureName } from '@babylonjs/core/XR/webXRFeaturesManager.js';
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience.js';
import { WebXRHandTracking } from '@babylonjs/core/XR/features/WebXRHandTracking';

const canvas = ref()

const props = defineProps({
  scene: Function,
  inspector: Boolean,
});

onMounted(async () => {

  window.dispatchEvent(new CustomEvent('test', { detail: {canvas: canvas.value, scene: props.scene, inspector: props.inspector}}))

});

</script>

<style>
.inlineView-container {
  margin-bottom: 2px;
  width: 100%;
  height: 500px;
  margin: 5px;
}

.inlineView-canvas {
  margin: 5px;
  border: 1px solid #000;
  box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.3); 
  width: 100%;
  height: 30em;
}
</style>