// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { test, expect } from '@playwright/test';

declare global {
  interface Window {
    scene: any;
  }
}

// Always do soft assertions.
const softExpect = expect.configure({ soft: true });

test.describe('Transition System Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the transition test example
    await page.goto('/anu/?example=transitionTest');

    // Wait for the canvas to be ready
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test('should render transitionTest example correctly after all transitions complete', async ({ page }) => {
    // Take a screenshot to verify the visual output after transitions
    await expect(page.locator("#renderCanvas")).toHaveScreenshot("transition-test-complete.png", { 
      timeout: 15_000 
    });
  });

  test('should apply transitions to position using new proxy method', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const boxes = scene.meshes.filter(mesh => mesh.id.includes('test1-box'));

      return boxes.map(box => ({
        x: box.position.x,
        y: box.position.y,
        z: box.position.z
      }));
    });

    result.forEach((pos) => {
      softExpect(pos.x).toBe(5);
      softExpect(pos.y).toBe(5);
      softExpect(pos.z).toBe(5);
    });
  });

  test('should apply transitions to nested property position.x using new proxy method', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const spheres = scene.meshes.filter(mesh => mesh.id.includes('test2-sphere'));

      return spheres.map(sphere => ({
        x: sphere.position.x
      }));
    });

    result.forEach((pos) => {
      softExpect(pos.x).toBe(10);
    });
  });

  test('should apply transitions using old props method with position vector', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const boxes = scene.meshes.filter(mesh => mesh.id.includes('test3-box'));

      return boxes.map(box => ({
        x: box.position.x,
        y: box.position.y,
        z: box.position.z
      }));
    });

    result.forEach((pos) => {
      softExpect(pos.x).toBe(7);
      softExpect(pos.y).toBe(7);
      softExpect(pos.z).toBe(7);
    });
  });

  test('should apply transitions using old props method with nested property', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const spheres = scene.meshes.filter(mesh => mesh.id.includes('test4-sphere'));

      return spheres.map(sphere => ({
        x: sphere.position.x
      }));
    });

    result.forEach((pos) => {
      softExpect(pos.x).toBe(15);
    });
  });

  test('should chain multiple transitions using new proxy method', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const cylinders = scene.meshes.filter(mesh => mesh.id.includes('test5-cylinder'));

      return cylinders.map(cylinder => ({
        x: cylinder.position.x,
        y: cylinder.position.y,
        z: cylinder.position.z,
        scaleX: cylinder.scaling.x,
        scaleY: cylinder.scaling.y,
        scaleZ: cylinder.scaling.z
      }));
    });

    result.forEach((cyl) => {
      softExpect(cyl.x).toBe(1);
      softExpect(cyl.y).toBe(1);
      softExpect(cyl.z).toBe(1);
      softExpect(cyl.scaleX).toBe(2);
      softExpect(cyl.scaleY).toBe(2);
      softExpect(cyl.scaleZ).toBe(2);
    });
  });

  test('should apply multiple property transitions using old props method', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const boxes = scene.meshes.filter(mesh => mesh.id.includes('test6-box'));

      return boxes.map(box => ({
        x: box.position.x,
        y: box.position.y,
        scaleX: box.scaling.x
      }));
    });

    result.forEach((box) => {
      softExpect(box.x).toBe(3);
      softExpect(box.y).toBe(2);
      softExpect(box.scaleX).toBe(1.5);
    });
  });

  test('should apply tweening', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const spheres = scene.meshes.filter(mesh => mesh.id.includes('test7-sphere'));

      return spheres.map(sphere => ({
        x: sphere.position.x
      }));
    });

    result.forEach((pos) => {
      softExpect(pos.x).toBe(10);
    });
  });

  test('should stop transitions when stopTransitions is called', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      const boxes = scene.meshes.filter(mesh => mesh.id.includes('test8-box'));

      return boxes.map(box => ({
        x: box.position.x,
        y: box.position.y,
        z: box.position.z
      }));
    });

    result.forEach((pos) => {
      // Position should not have reached the final value (20, 20, 20)
      // Should be somewhere between initial (-5, 0, 0) and final (20, 20, 20)
      softExpect(pos.x).toBeLessThan(20);
      softExpect(pos.x).toBeGreaterThan(-5);
    });
  });

});
