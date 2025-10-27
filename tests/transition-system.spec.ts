// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { test, expect } from '@playwright/test';
import { Vector3 } from '@babylonjs/core';

// Always do soft assertions.
const softExpect = expect.configure({ soft: true });

test.describe('Transition System Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the transition test example
    await page.goto('/anu/?example=transitionTest');

    // Wait for the canvas to be ready
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test('should apply transitions to position', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box'));
      const selection = window.anu.select(boxes);

      // Apply a transition to position
      selection.transition({ duration: 1000 }).position(new Vector3(5, 5, 5));

      return boxes.map(box => ({
        x: box.position.x,
        y: box.position.y,
        z: box.position.z
      }));
    });

    result.forEach((pos, index) => {
      softExpect(pos.x).toBe(5);
      softExpect(pos.y).toBe(5);
      softExpect(pos.z).toBe(5);
    });
  });

  test('should apply transitions to nested properties', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const spheres = scene.meshes.filter(mesh => mesh.id.includes('sphere'));
      const selection = window.anu.select(spheres);

      // Apply a transition to position.x
      selection.transition({ duration: 1000 }).position.x(10);

      return spheres.map(sphere => ({
        x: sphere.position.x
      }));
    });

    result.forEach((pos, index) => {
      softExpect(pos.x).toBe(10);
    });
  });

  test('should chain multiple transitions', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const cylinders = scene.meshes.filter(mesh => mesh.id.includes('cylinder'));
      const selection = window.anu.select(cylinders);

      // Chain transitions
      selection
        .transition({ duration: 500 }).position(new Vector3(1, 1, 1))
        .transition({ duration: 500, delay: 500 }).scaling(new Vector3(2, 2, 2));

      return cylinders.map(cylinder => ({
        x: cylinder.position.x,
        y: cylinder.position.y,
        z: cylinder.position.z,
        scaleX: cylinder.scaling.x,
        scaleY: cylinder.scaling.y,
        scaleZ: cylinder.scaling.z
      }));
    });

    result.forEach((cyl, index) => {
      softExpect(cyl.x).toBe(1);
      softExpect(cyl.y).toBe(1);
      softExpect(cyl.z).toBe(1);
      softExpect(cyl.scaleX).toBe(2);
      softExpect(cyl.scaleY).toBe(2);
      softExpect(cyl.scaleZ).toBe(2);
    });
  });

  test('should stop transitions', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box'));
      const selection = window.anu.select(boxes);

      // Start a transition and then stop it
      selection.transition({ duration: 1000 }).position(new Vector3(5, 5, 5));
      selection.stopTransitions();

      return boxes.map(box => ({
        x: box.position.x,
        y: box.position.y,
        z: box.position.z
      }));
    });

    result.forEach((pos, index) => {
      softExpect(pos.x).not.toBe(5);
      softExpect(pos.y).not.toBe(5);
      softExpect(pos.z).not.toBe(5);
    });
  });

  test('should apply tweening', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const spheres = scene.meshes.filter(mesh => mesh.id.includes('sphere'));
      const selection = window.anu.select(spheres);

      // Apply a tween
      selection.transition({ duration: 1000 }).tween((d, n, i) => (t) => {
        n.position.x = t * 10;
      });

      return spheres.map(sphere => ({
        x: sphere.position.x
      }));
    });

    result.forEach((pos, index) => {
      softExpect(pos.x).toBe(10);
    });
  });

});
