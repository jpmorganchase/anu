// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

// This file sets up the transition test example for Playwright tests.

import { Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from '@babylonjs/core';

export const transitionTest = (engine) => {
  // Create the scene
  const scene = new Scene(engine);

  // Create a camera
  const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
  camera.attachControl(engine.getRenderingCanvas(), true);

  // Add a light
  const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene);

  // Create some meshes
  const box = MeshBuilder.CreateBox('box', {}, scene);
  box.position = new Vector3(-2, 0, 0);

  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);
  sphere.position = new Vector3(0, 0, 0);

  const cylinder = MeshBuilder.CreateCylinder('cylinder', { height: 2, diameter: 1 }, scene);
  cylinder.position = new Vector3(2, 0, 0);

  // Expose the scene and meshes to the window for Playwright tests
  window.scene = scene;
  window.anu = {
    select: (meshes) => {
      return {
        transition: (options) => {
          return {
            position: (vector) => {
              meshes.forEach(mesh => mesh.position = vector);
            },
            scaling: (vector) => {
              meshes.forEach(mesh => mesh.scaling = vector);
            },
            tween: (callback) => {
              // Example tween implementation
              meshes.forEach((mesh, index) => {
                const tweenFunction = callback({}, mesh, index);
                tweenFunction(1); // Simulate the end of the tween
              });
            }
          };
        },
        stopTransitions: () => {
          // Example stop implementation
        }
      };
    }
  };

  return scene;
};
