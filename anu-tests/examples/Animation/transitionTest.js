// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

// This file sets up the transition test example for Playwright tests.

import * as anu from '@jpmorganchase/anu';
import { Scene, ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';

export const transitionTest = (engine) => {
  // Create the scene
  const scene = new Scene(engine);

  // Create a camera
  const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
  camera.attachControl(engine.getRenderingCanvas(), true);

  // Add a light
  const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene);

  // Test 1: Basic transition with new proxy method - position vector
  anu.bind('box', {}, [{}, {}, {}])
    .name('test1-box')
    .position(new Vector3(-2, 0, 0))
    .transition({ duration: 1000 })
    .position(new Vector3(5, 5, 5))

  // Test 2: Nested property transition with new proxy method - position.x
  anu.bind('sphere', { diameter: 1 }, [{}, {}, {}])
    .name('test2-sphere')
    .position(new Vector3(0, 0, 0))
    .transition({ duration: 1000 })
    .position.x(10);

  // Test 3: Old method - props with position object
  anu.bind('box', {}, [{}, {}, {}])
    .name('test3-box')
    .position(new Vector3(-3, 0, 0))
    .transition({ duration: 1000 })
    .props({ 'position': new Vector3(7, 7, 7) });

  // Test 4: Old method - props with nested property position.x
  anu.bind('sphere', { diameter: 1 }, [{}, {}, {}])
    .name('test4-sphere')
    .position(new Vector3(1, 0, 0))
    .transition({ duration: 1000 })
    .props({ 'position.x': 15 });

  // Test 5: Chained transitions with new proxy method
  anu.bind('cylinder', { height: 2, diameter: 1 }, [{}, {}])
    .name('test5-cylinder')
    .position(new Vector3(2, 0, 0))
    .transition({ duration: 500 })
    .position(new Vector3(1, 1, 1))
    .transition({ duration: 500, delay: 500 })
    .scaling(new Vector3(2, 2, 2));

  // Test 6: Multiple property transitions with old method
  anu.bind('box', {}, [{}, {}])
    .name('test6-box')
    .position(new Vector3(-4, 0, 0))
    .transition({ duration: 1000 })
    .props({ 
      'position.x': 3,
      'position.y': 2,
      'scaling.x': 1.5
    });

  // Test 7: Tween function
  anu.bind('sphere', { diameter: 1 }, [{}, {}])
    .name('test7-sphere')
    .position(new Vector3(3, 0, 0))
    .transition({ duration: 1000 })
    .tween((d, n, i) => (t) => {
      n.position.x = 3 + (t * 7); // Move from 3 to 10
    });

  // Test 8: Stop transitions
  const selection8 = anu.bind('box', {}, [{}])
    .name('test8-box')
    .position(new Vector3(-5, 0, 0))
    .transition({ duration: 2000 })
    .position(new Vector3(20, 20, 20));
  
  // Stop the transition after 100ms
  setTimeout(() => {
    selection8.stopTransitions();
  }, 100);

  // Expose anu to window for tests
  window.scene = scene;

  // Wait for all transitions to complete before marking the scene as ready
  // The longest transition is 2000ms (test 8), but we also have chained transitions
  // Test 5 has 500ms + 500ms delay + 500ms = 1500ms total
  // Test 8 is stopped at 100ms but still runs for 2000ms
  // Wait for 2500ms to be safe (2000ms + 500ms buffer)
  setTimeout(() => {
    const canvas = document.getElementById('renderCanvas');
    if (canvas) {
      canvas.setAttribute('data-ready', '1');
    }
  }, 2500);

  return scene;
};
