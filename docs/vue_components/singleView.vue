<template>
  <div class="singleView-container">
    <canvas ref="canvas" class="singleView-canvas" id="singleView-canvas"></canvas>
    <div class="xr-controls">
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
import { Engine,  Color3, Vector3, WebXRFeatureName,  WebXRState} from '@babylonjs/core'

const props = defineProps({
  scene: Function,
});

let canvas = ref();
let xrSupported = ref(false);
let xrSessionActive = ref(false);

let babylonEngine;
let currentScene;
let defaultXRExperience;
let sceneEnvironment;

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

  let scene = await props.scene(babylonEngine);
  currentScene = scene;

  sceneEnvironment = scene.createDefaultEnvironment();
  sceneEnvironment.setMainColor(Color3.FromHexString('#0e0e17'));
  sceneEnvironment.ground.position = new Vector3(0, -2, 0);

  try {
    //{ floorMeshes: [env.ground] }
    defaultXRExperience = await scene.createDefaultXRExperienceAsync({
      // Enable multiview for better VR performance and hand tracking
      optionalFeatures: true,
      // Ensure AR compatibility
      uiOptions: {
        sessionMode: 'immersive-vr'  // Default to VR, we'll handle AR manually
      }
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
          
          // Position XR camera back 3 units on Z-axis after XR session is ready
          defaultXRExperience.baseExperience.sessionManager.onXRFrameObservable.addOnce(() => {
            const xrCamera = defaultXRExperience.baseExperience.camera;
            if (xrCamera) {
              // Simply move camera back 3 units on Z-axis
              xrCamera.position = new Vector3(0, 0.5, -2.5);
              console.log('XR Camera positioned at:', xrCamera.position);
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
//         // Enable multiview for better VR performance
//         try {
//           const multiview = featureManager.enableFeature(WebXRFeatureName.LAYERS, "latest", { preferMultiviewOnInit: true }, true, false);

// });
//           if (multiview) {
//             console.log('Multiview enabled successfully');
//           } else {
//             console.log('Multiview not supported or failed to enable');
//           }
//         } catch (error) {
//           console.warn('Multiview not supported:', error);
//         }

        // // Enable hand tracking with proper error handling
        // try {
        //   const handTracking = featureManager.enableFeature(WebXRFeatureName.HAND_TRACKING, 'latest', {
        //     xrInput: defaultXRExperience.input,
        //     jointMeshes: {
        //       enablePhysics: false,
        //       sourceMeshes: null, // Use default hand mesh
        //       handMeshes: {
        //         left: null,
        //         right: null
        //       }
        //     }
        //   });

        //   if (handTracking) {
        //     console.log('Hand tracking enabled successfully');
            
        //     // Optional: Add hand tracking event listeners
        //     handTracking.onHandAddedObservable.add((hand) => {
        //       console.log(`${hand.handedness} hand added`);
        //     });
            
        //     handTracking.onHandRemovedObservable.add((hand) => {
        //       console.log(`${hand.handedness} hand removed`);
        //     });
        //   } else {
        //     console.warn('Hand tracking failed to enable');
        //   }
        // } catch (error) {
        //   console.warn('Hand tracking not supported or failed to enable:', error);
        // }


      }
    }
  } catch {
    console.warn('XR Not Supported');
    xrSupported.value = false;
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

.singleView-canvas {
  width: 100%;
  height: 50vh;
}
</style>