<template>
  <div class="inlineView-container">
    <canvas ref="canvas" class="inlineView-canvas" id="inlineView-canvas"></canvas>
    <div class="inline-controls">
      <button 
        @click="toggleInspector" 
        :class="['inline-button', 'inspector-button', { active: inspectorVisible }]"
        title="Toggle Inspector (Shift+I)"
      >
        🔍
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const canvas = ref()
const inspectorVisible = ref(false)
let currentScene = null;

const props = defineProps({
  scene: String,
  inspector: Boolean,
});

// Inspector loaded dynamically to avoid SSR issues
async function toggleInspector() {
  if (!currentScene) return;
  
  try {
    // Dynamically import inspector only when needed (client-side only)
    await import('@babylonjs/inspector');
    
    if (inspectorVisible.value) {
      currentScene.debugLayer.hide();
      inspectorVisible.value = false;
    } else {
      // First, broadcast that we're opening an inspector (so others can close theirs)
      window.dispatchEvent(new CustomEvent('inlineInspectorOpening', { detail: { canvas: canvas.value }}));
      
      await currentScene.debugLayer.show({ embedMode: true });
      inspectorVisible.value = true;
    }
  } catch (error) {
    console.error('Failed to load inspector:', error);
  }
}

function handleKeyDown(event) {
  // Toggle inspector with Shift + I
  if (event.shiftKey && event.key.toLowerCase() === 'i') {
    event.preventDefault();
    toggleInspector();
  }
}

// Listen for scene ready event from multiView
function handleSceneReady(e) {
  if (e.detail.canvas === canvas.value) {
    currentScene = e.detail.scene;
  }
}

// Listen for other inspectors opening - close ours if it's open
function handleOtherInspectorOpening(e) {
  // If another inline view is opening its inspector and ours is visible, close ours
  if (e.detail.canvas !== canvas.value && inspectorVisible.value && currentScene) {
    currentScene.debugLayer.hide();
    inspectorVisible.value = false;
  }
}

onMounted(() => {
  canvas.value.addEventListener('wheel', evt => evt.preventDefault());
  window.dispatchEvent(new CustomEvent('test', { detail: {canvas: canvas.value, scene: props.scene, inspector: props.inspector}}))
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('inlineSceneReady', handleSceneReady);
  window.addEventListener('inlineInspectorOpening', handleOtherInspectorOpening);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('inlineSceneReady', handleSceneReady);
  window.removeEventListener('inlineInspectorOpening', handleOtherInspectorOpening);
  
  // Hide inspector if visible
  if (inspectorVisible.value && currentScene) {
    currentScene.debugLayer.hide();
  }
});

</script>

<style>
.inlineView-container {
  margin-bottom: 2px;
  width: 100%;
  height: 500px;
  margin: 5px;
  position: relative;
}

.inlineView-canvas {
  margin: 5px;
  border: 1px solid #000;
  box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.3); 
  width: 100%;
  height: 30em;
}

.inline-controls {
  position: absolute;
  bottom: 30px;
  right: 20px;
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.inline-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 36px;
}

.inspector-button {
  background: rgba(100, 108, 255, 0.6);
  color: white;
  font-size: 14px;
}

.inspector-button:hover {
  background: rgba(100, 108, 255, 0.8);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(100, 108, 255, 0.4);
}

.inspector-button.active {
  background: linear-gradient(135deg, #646cff 0%, #535bf2 100%);
  box-shadow: 0 0 20px rgba(100, 108, 255, 0.6);
}
</style>