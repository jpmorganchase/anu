<template>
  <div class="singleView-container">
    <!-- Loading overlay -->
    <div v-if="isLoading" :class="['loading-overlay', { fullscreen: fullscreen }]">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <span class="loading-text">Loading Scene...</span>
      </div>
    </div>
    <canvas ref="canvas" :class="['singleView-canvas', { fullscreen: fullscreen }]" id="singleView-canvas"></canvas>
    <div class="xr-controls" v-show="!isLoading">
      <button 
        @click="toggleInspector" 
        :class="['xr-button', 'inspector-button', { active: inspectorVisible }]"
        title="Toggle Inspector (Shift+I)"
      >
        🔍
      </button>
      <!-- Lighting toggle hidden for now
      <button 
        @click="toggleLighting" 
        :class="['xr-button', 'lighting-button', { active: studioLightingActive }]"
        title="Toggle Studio Lighting (Shift+L)"
      >
        💡
      </button>
      -->
      <button 
        @click="startVRSession" 
        :disabled="!xrSupported || xrSessionActive"
        class="xr-button vr-button"
        title="Start VR Session"
      >
        VR
      </button>
      <button 
        @click="startARSession" 
        :disabled="!xrSupported || xrSessionActive"
        class="xr-button ar-button"
        title="Start AR Session"
      >
        AR
      </button>
      <button 
        v-if="xrSessionActive"
        @click="exitXRSession" 
        class="xr-button exit-button"
        title="Exit XR Session"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref,  onMounted, onBeforeUnmount } from 'vue';
import { Engine,  Color3, Vector3, WebXRFeatureName,  WebXRState, Scene} from '@babylonjs/core'
import { createStudioLighting } from './studioLighting.js'

const props = defineProps({
  scene: Function,
  fullscreen: {
    type: Boolean,
    default: false
  },
  noDefaultEnvironment: {
    type: Boolean,
    default: false
  },
  studioLighting: {
    type: [Boolean, Object],
    default: false
    // Can be true for defaults, or object with options:
    // { preset: 'soft'|'dramatic'|'neutral', intensity: 1.0, enableShadows: false }
  }
});

let canvas = ref();
let xrSupported = ref(false);
let xrSessionActive = ref(false);
let isLoading = ref(true);
let inspectorVisible = ref(false);
let studioLightingActive = ref(false);

let babylonEngine;
let scene;
let currentScene;
let defaultXRExperience;
let sceneEnvironment;
let studioLights;
let originalSceneLights = []; // Store references to original scene lights

// Inspector loaded dynamically to avoid SSR issues
async function toggleInspector() {
  if (!scene) return;
  
  try {
    // Dynamically import inspector only when needed (client-side only)
    await import('@babylonjs/inspector');
    
    if (inspectorVisible.value) {
      scene.debugLayer.hide();
      inspectorVisible.value = false;
    } else {
      await scene.debugLayer.show({ embedMode: true });
      inspectorVisible.value = true;
    }
  } catch (error) {
    console.error('Failed to load inspector:', error);
  }
}

function toggleLighting() {
  if (!scene) return;
  
  if (studioLightingActive.value) {
    // Switch back to original scene lights
    if (studioLights) {
      studioLights.dispose();
      studioLights = null;
    }
    // Re-enable original scene lights
    originalSceneLights.forEach(light => {
      light.setEnabled(true);
    });
    studioLightingActive.value = false;
    console.log('Switched to default scene lighting');
  } else {
    // Switch to studio lighting
    // Store and disable original lights
    originalSceneLights = [...scene.lights];
    originalSceneLights.forEach(light => {
      light.setEnabled(false);
    });
    // Create studio lights
    const lightingConfig = props.studioLighting || {};
    const lightingOptions = typeof lightingConfig === 'object' ? lightingConfig : {};
    studioLights = createStudioLighting(scene, lightingOptions);
    studioLightingActive.value = true;
    console.log('Switched to studio lighting');
  }
}

function handleKeyDown(event) {
  // Toggle inspector with Shift + I
  if (event.shiftKey && event.key.toLowerCase() === 'i') {
    event.preventDefault();
    toggleInspector();
  }
  // Toggle lighting with Shift + L
  if (event.shiftKey && event.key.toLowerCase() === 'l') {
    event.preventDefault();
    toggleLighting();
  }
}

 function resize() {
    babylonEngine?.resize();
  }

async function startVRSession() {
  if (defaultXRExperience && currentScene) {
    try {
      await defaultXRExperience.baseExperience.enterXRAsync('immersive-vr', 'local-floor');
    } catch (error) {
      console.error('Failed to start VR session:', error);
    }
  }
}

async function startARSession() {
  if (defaultXRExperience && currentScene) {
    try {
      console.log('Attempting to start AR session...');
      
      // Check if AR is supported
      if (!navigator.xr) {
        console.error('WebXR not supported');
        return;
      }
      
      const arSupported = await navigator.xr.isSessionSupported('immersive-ar');
      if (!arSupported) {
        console.error('AR not supported on this device/browser');
        alert('AR is not supported on this device or browser. Try using Chrome on an Android device or Safari on iOS.');
        return;
      }
      
      console.log('AR is supported, proceeding with session...');
      
      // Disable environment for AR (we want to see the real world)
      if (sceneEnvironment) {
        // Disable skybox
        if (sceneEnvironment.skybox) {
          sceneEnvironment.skybox.setEnabled(false);
        }
        // Disable ground
        if (sceneEnvironment.ground) {
          sceneEnvironment.ground.setEnabled(false);
        }
        // Disable environment texture if it exists
        if (sceneEnvironment.rootMesh) {
          sceneEnvironment.rootMesh.setEnabled(false);
        }
        console.log('Environment disabled for AR');
      }
      
      // Try different reference spaces for AR
      const referenceSpaces = ['local-floor', 'local', 'viewer'];
      let sessionStarted = false;
      
      for (const refSpace of referenceSpaces) {
        try {
          console.log(`Trying AR with reference space: ${refSpace}`);
          await defaultXRExperience.baseExperience.enterXRAsync('immersive-ar', refSpace);
          sessionStarted = true;
          console.log(`AR session started successfully with ${refSpace}`);
          break;
        } catch (refSpaceError) {
          console.warn(`Failed with ${refSpace}:`, refSpaceError);
        }
      }
      
      if (!sessionStarted) {
        throw new Error('Failed to start AR with any reference space');
      }
      
    } catch (error) {
      console.error('Failed to start AR session:', error);
      alert(`AR Session Error: ${error.message}`);
      
      // Re-enable environment if AR failed
      if (sceneEnvironment) {
        if (sceneEnvironment.skybox) {
          sceneEnvironment.skybox.setEnabled(true);
        }
        if (sceneEnvironment.ground) {
          sceneEnvironment.ground.setEnabled(true);
        }
        if (sceneEnvironment.rootMesh) {
          sceneEnvironment.rootMesh.setEnabled(true);
        }
      }
    }
  }
}

async function exitXRSession() {
  if (defaultXRExperience && defaultXRExperience.baseExperience) {
    try {
      await defaultXRExperience.baseExperience.exitXRAsync();
      
      // Re-enable environment when exiting XR
      if (sceneEnvironment) {
        if (sceneEnvironment.skybox) {
          sceneEnvironment.skybox.setEnabled(true);
        }
        if (sceneEnvironment.ground) {
          sceneEnvironment.ground.setEnabled(true);
        }
        if (sceneEnvironment.rootMesh) {
          sceneEnvironment.rootMesh.setEnabled(true);
        }
      }
    } catch (error) {
      console.error('Failed to exit XR session:', error);
    }
  }
}

onMounted(async () => {
  canvas.value.addEventListener('wheel', evt => evt.preventDefault());
  babylonEngine = new Engine(canvas.value, true);

  scene = await props.scene(babylonEngine);
  currentScene = scene;

  // Only create default environment if not disabled by prop or scene metadata
  if (!props.noDefaultEnvironment && !scene.metadata?.noDefaultEnvironment) {
    sceneEnvironment = scene.createDefaultEnvironment();
    sceneEnvironment.setMainColor(Color3.FromHexString('#0e0e17'));
    sceneEnvironment.ground.position = new Vector3(0, -2, 0);
  }

  try {
    // Check scene metadata for disabling controllers
    const disableControllers = scene.metadata?.xrDisableControllers;
    
    //{ floorMeshes: [env.ground] }
    defaultXRExperience = await scene.createDefaultXRExperienceAsync({
      // Enable multiview for better VR performance and hand tracking
      optionalFeatures: true,
      // Ensure AR compatibility
      uiOptions: {
        sessionMode: 'immersive-vr'  // Default to VR, we'll handle AR manually
      },
      // Conditionally disable controller meshes based on scene metadata
      inputOptions: disableControllers ? {
        doNotLoadControllerMeshes: true
      } : undefined
    });
    xrSupported.value = true;

    // Hide the default XR UI since we're using custom buttons
    if (defaultXRExperience.enterExitUI) {
      defaultXRExperience.enterExitUI.overlay.style.display = 'none';
    }


    if (!defaultXRExperience.baseExperience) {
      console.log('No XR');
    } else {
      const featureManager = defaultXRExperience.baseExperience.featuresManager;

      defaultXRExperience.baseExperience.onStateChangedObservable.add((state) => {
        if (state === WebXRState.ENTERING_XR) {
          xrSessionActive.value = true;
          
          // Position XR camera after XR session is ready
          defaultXRExperience.baseExperience.sessionManager.onXRFrameObservable.addOnce(() => {
            const xrCamera = defaultXRExperience.baseExperience.camera;
            if (xrCamera) {
              // Check if scene has custom XR camera position
              const customXRPosition = scene.metadata?.xrCameraPosition;
              if (customXRPosition) {
                // For AR, we need to set the position differently since it uses real-world tracking
                const sessionMode = defaultXRExperience.baseExperience.sessionManager.session?.mode;
                if (sessionMode === 'immersive-ar') {
                  // In AR, adjust the camera's initial position
                  // AR cameras are typically locked to real-world tracking, so we set initial position
                  xrCamera.position.copyFrom(customXRPosition);
                  console.log('AR Camera positioned at custom position:', xrCamera.position);
                } else {
                  // VR mode - standard positioning works
                  xrCamera.position = customXRPosition;
                  console.log('VR Camera positioned at custom position:', xrCamera.position);
                }
              } else {
                // Default position
                xrCamera.position = new Vector3(0, 0.5, -2.5);
                console.log('XR Camera positioned at default position:', xrCamera.position);
              }
            }
          });
          
          //Special exceptions for certain scenes
          switch (scene.metadata?.name) {
            case "thinInstances":
              console.log("Disabling GPU Picking interactions in WebXR due to lack of support.")
              scene.onPointerObservable.clear();
              break;
          }
        } else if (state === WebXRState.EXITING_XR || state === WebXRState.NOT_IN_XR) {
          xrSessionActive.value = false;
        }
      });

      if (!featureManager) {
        console.log('No Feature Manager');
      } else {
        // Enable hand tracking
        try {
          featureManager.enableFeature(WebXRFeatureName.HAND_TRACKING, "latest", {
            xrInput: defaultXRExperience.input,
            // Use the newer handMeshes API instead of deprecated jointMeshes options
            handMeshes: {
              disableDefaultMeshes: false,  // Enable default hand meshes
            },
            jointMeshes: {
              invisible: true,  // Hide the joint spheres, show only the hand mesh
            }
          });
          console.log('Hand tracking enabled with hand meshes');
        } catch (error) {
          console.warn('Hand tracking not available:', error);
        }
      }
    }
  } catch {
    console.warn('XR Not Supported');
    xrSupported.value = false;
  }

  scene.executeWhenReady(() => {
    // Setup studio lighting if enabled via prop or scene metadata
    const lightingConfig = props.studioLighting || scene.metadata?.studioLighting;
    if (lightingConfig) {
      // Store and disable all existing lights in the scene before adding studio lights
      originalSceneLights.length = 0;
      const existingLights = [...scene.lights];
      existingLights.forEach(light => {
        originalSceneLights.push(light);
        light.setEnabled(false);
        console.log('Disabled existing light:', light.name);
      });
      
      const lightingOptions = typeof lightingConfig === 'object' ? lightingConfig : {};
      studioLights = createStudioLighting(scene, lightingOptions);
      studioLightingActive.value = true;
      console.log('Studio lighting enabled with preset:', lightingOptions.preset || 'soft');
    }
    
    canvas.value.setAttribute('scene-ready', '1');
    isLoading.value = false;
  });

  babylonEngine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', resize);
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  window.removeEventListener('keydown', handleKeyDown);
  
  // Dispose studio lighting if created
  if (studioLights) {
    studioLights.dispose();
  }
  
  scene?.dispose();
  babylonEngine?.dispose();

  // window.location.reload();

});
</script>

<style>
.singleView-container {
  margin-bottom: 2px;
  width: 100%;
  position: relative;
}

.xr-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.xr-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 40px;
}

.xr-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.vr-button {
  background: rgba(128, 128, 128, 0.6);
  color: white;
}

.vr-button:hover:not(:disabled) {
  background: rgba(128, 128, 128, 0.8);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(128, 128, 128, 0.4);
}

.ar-button {
  background: rgba(128, 128, 128, 0.6);
  color: white;
}

.ar-button:hover:not(:disabled) {
  background: rgba(128, 128, 128, 0.8);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(128, 128, 128, 0.4);
}

.exit-button {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
}

.exit-button:hover {
  background: linear-gradient(135deg, #ff5252 0%, #dc4a40 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.4);
}

.inspector-button {
  background: rgba(100, 108, 255, 0.6);
  color: white;
  font-size: 16px;
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

.lighting-button {
  background: rgba(255, 193, 7, 0.6);
  color: white;
  font-size: 16px;
}

.lighting-button:hover {
  background: rgba(255, 193, 7, 0.8);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(255, 193, 7, 0.4);
}

.lighting-button.active {
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
}

.singleView-canvas {
  width: 100%;
  height: 50vh;
}

.singleView-canvas.fullscreen {
  height: calc(100vh - 62px); /* Subtract navbar height (typically 64px in VitePress) */
}
</style>