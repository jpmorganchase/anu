<template>
  <div class="inlineView-container">
    <canvas ref="canvas" class="inlineView-canvas" id="inlineView-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const canvas = ref()

const props = defineProps({
  scene: String,
  inspector: Boolean,
});

onMounted(() => {
  canvas.value.addEventListener('wheel', evt => evt.preventDefault());
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