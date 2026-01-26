// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { 
  HemisphericLight, 
  DirectionalLight, 
  Vector3, 
  Color3,
  ShadowGenerator
} from '@babylonjs/core';

/**
 * Creates a professional soft studio lighting setup for Babylon.js scenes
 * Uses a three-point lighting approach: Key, Fill, and Rim lights
 * 
 * @param {Scene} scene - The Babylon.js scene
 * @param {Object} options - Configuration options
 * @param {boolean} options.enableShadows - Enable soft shadows (default: false)
 * @param {number} options.intensity - Overall intensity multiplier (default: 1.0)
 * @param {string} options.preset - Lighting preset: 'soft', 'dramatic', 'neutral' (default: 'soft')
 * @returns {Object} Object containing all created lights and shadow generator
 */
export function createStudioLighting(scene, options = {}) {
  const {
    enableShadows = false,
    intensity = 1.0,
    preset = 'soft'
  } = options;

  // Preset configurations
  const presets = {
    soft: {
      ambient: { intensity: 0.5, diffuse: [0.95, 0.95, 1.0], ground: [0.4, 0.42, 0.48] },
      key: { intensity: 0.7, diffuse: [1.0, 0.98, 0.94], specular: [0.3, 0.3, 0.3] },
      fill: { intensity: 0.35, diffuse: [0.88, 0.92, 1.0] },
      rim: { intensity: 0.3, diffuse: [1.0, 1.0, 1.0] }
    },
    dramatic: {
      ambient: { intensity: 0.25, diffuse: [0.9, 0.9, 1.0], ground: [0.2, 0.22, 0.28] },
      key: { intensity: 1.0, diffuse: [1.0, 0.95, 0.88], specular: [0.5, 0.5, 0.5] },
      fill: { intensity: 0.15, diffuse: [0.8, 0.85, 1.0] },
      rim: { intensity: 0.5, diffuse: [1.0, 0.98, 0.95] }
    },
    neutral: {
      ambient: { intensity: 0.6, diffuse: [1.0, 1.0, 1.0], ground: [0.5, 0.5, 0.5] },
      key: { intensity: 0.5, diffuse: [1.0, 1.0, 1.0], specular: [0.2, 0.2, 0.2] },
      fill: { intensity: 0.3, diffuse: [1.0, 1.0, 1.0] },
      rim: { intensity: 0.2, diffuse: [1.0, 1.0, 1.0] }
    }
  };

  const config = presets[preset] || presets.soft;

  // 1. AMBIENT/HEMISPHERE LIGHT - Soft overall illumination with ground bounce
  const ambientLight = new HemisphericLight('studioAmbient', new Vector3(0, 1, 0), scene);
  ambientLight.intensity = config.ambient.intensity * intensity;
  ambientLight.diffuse = new Color3(...config.ambient.diffuse);
  ambientLight.groundColor = new Color3(...config.ambient.ground);
  ambientLight.specular = Color3.Black(); // No specular from ambient

  // 2. KEY LIGHT - Main light source (simulates large softbox from upper-left)
  const keyLight = new DirectionalLight('studioKey', new Vector3(-0.5, -1, 0.5).normalize(), scene);
  keyLight.position = new Vector3(3, 5, -3);
  keyLight.intensity = config.key.intensity * intensity;
  keyLight.diffuse = new Color3(...config.key.diffuse);
  keyLight.specular = new Color3(...config.key.specular);

  // 3. FILL LIGHT - Softens shadows from opposite side
  const fillLight = new DirectionalLight('studioFill', new Vector3(0.7, -0.5, 0.5).normalize(), scene);
  fillLight.position = new Vector3(-4, 3, -2);
  fillLight.intensity = config.fill.intensity * intensity;
  fillLight.diffuse = new Color3(...config.fill.diffuse);
  fillLight.specular = Color3.Black(); // No specular from fill

  // 4. RIM/BACK LIGHT - Creates edge definition and separation from background
  const rimLight = new DirectionalLight('studioRim', new Vector3(0, -0.3, -1).normalize(), scene);
  rimLight.position = new Vector3(0, 4, 5);
  rimLight.intensity = config.rim.intensity * intensity;
  rimLight.diffuse = new Color3(...config.rim.diffuse);
  rimLight.specular = Color3.Black();

  // Optional: Soft shadows from key light
  let shadowGenerator = null;
  if (enableShadows) {
    shadowGenerator = new ShadowGenerator(1024, keyLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;
    shadowGenerator.darkness = 0.35;
    shadowGenerator.bias = 0.001;
  }

  return {
    ambientLight,
    keyLight,
    fillLight,
    rimLight,
    shadowGenerator,
    // Helper method to add mesh to shadow casters
    addShadowCaster: (mesh) => {
      if (shadowGenerator) {
        shadowGenerator.addShadowCaster(mesh);
      }
    },
    // Helper method to dispose all lights
    dispose: () => {
      ambientLight.dispose();
      keyLight.dispose();
      fillLight.dispose();
      rimLight.dispose();
      if (shadowGenerator) {
        shadowGenerator.dispose();
      }
    },
    // Helper to adjust overall intensity
    setIntensity: (newIntensity) => {
      ambientLight.intensity = config.ambient.intensity * newIntensity;
      keyLight.intensity = config.key.intensity * newIntensity;
      fillLight.intensity = config.fill.intensity * newIntensity;
      rimLight.intensity = config.rim.intensity * newIntensity;
    }
  };
}

/**
 * Quick enhancement for existing scenes with minimal changes
 * Adds a subtle key light to complement existing HemisphericLight
 * 
 * @param {Scene} scene - The Babylon.js scene
 * @param {number} intensity - Light intensity (default: 0.5)
 * @returns {DirectionalLight} The created directional light
 */
export function addSubtleKeyLight(scene, intensity = 0.5) {
  const keyLight = new DirectionalLight('subtleKey', new Vector3(-0.5, -1, 0.5).normalize(), scene);
  keyLight.intensity = intensity;
  keyLight.diffuse = new Color3(1.0, 0.97, 0.92);
  keyLight.specular = new Color3(0.2, 0.2, 0.2);
  return keyLight;
}
