import { expect, test } from "@playwright/test";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    anu: any;
    BABYLON: any;
    engine: any;
    scene: any;
  }
}

test.describe("Anu Proxy Selection Features", () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the Scatterplot3D example which uses the new proxy features
    await page.goto("/anu/?example=Scatterplot3D");
    
    // Wait for the canvas to be ready
   /// await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should render scatterplot3D with proxy selections correctly", async ({ page }) => {
    // Take a screenshot to verify the visual output
    await expect(page.locator("#renderCanvas")).toHaveScreenshot("scatterplot3d-proxy.png", { 
      timeout: 15_000 
    });
  });

  test("should support nested property access like spheres.position.x()", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Get the spheres selection
      const spheres = window.anu.selectName('sphere', scene);
      
      if (spheres.selected.length === 0) {
        throw new Error('No spheres found in scene');
      }

      // Test that we can access nested properties
      const initialX = spheres.selected[0]?.position?.x || 0;
      
      // Test nested property setting: spheres.position.x(5)
      try {
        spheres.position.x(5);
        const newX = spheres.selected[0]?.position?.x || 0;
        
        return {
          success: true,
          initialX,
          newX,
          changed: newX === 5
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    });

    expect(result.success).toBe(true);
    expect(result.changed).toBe(true);
    expect(result.newX).toBe(5);
  });

  test("should support chained property access like spheres.position.x().position.y()", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const spheres = window.anu.selectName('sphere', scene);
      
      if (spheres.selected.length === 0) {
        throw new Error('No spheres found in scene');
      }

      try {
        // Test chained property access
        spheres.position.x(10).position.y(15).position.z(20);
        
        const firstSphere = spheres.selected[0];
        const position = firstSphere?.position;
        
        return {
          success: true,
          x: position?.x,
          y: position?.y,
          z: position?.z,
          allCorrect: position?.x === 10 && position?.y === 15 && position?.z === 20
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    });

    expect(result.success).toBe(true);
    expect(result.allCorrect).toBe(true);
    expect(result.x).toBe(10);
    expect(result.y).toBe(15);
    expect(result.z).toBe(20);
  });

  test("should support cross-property chaining like spheres.position.x().rotation.y()", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const spheres = window.anu.selectName('sphere', scene);
      
      if (spheres.selected.length === 0) {
        throw new Error('No spheres found in scene');
      }

      try {
        // Test cross-property chaining: position -> rotation
        spheres.position.x(25).rotation.y(Math.PI / 4);
        
        const firstSphere = spheres.selected[0];
        
        return {
          success: true,
          positionX: firstSphere?.position?.x,
          rotationY: firstSphere?.rotation?.y,
          positionCorrect: firstSphere?.position?.x === 25,
          rotationCorrect: Math.abs((firstSphere?.rotation?.y || 0) - Math.PI / 4) < 0.001
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    });

    expect(result.success).toBe(true);
    expect(result.positionCorrect).toBe(true);
    expect(result.rotationCorrect).toBe(true);
  });

  test("should support method calls on nested properties like spheres.scaling.scaleInPlace()", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const spheres = window.anu.selectName('sphere', scene);
      
      if (spheres.selected.length === 0) {
        throw new Error('No spheres found in scene');
      }

      try {
        // Get initial scaling
        const initialScaling = spheres.selected[0]?.scaling?.clone();
        
        // Test method calls on nested properties
        spheres.scaling.scaleInPlace(2);
        
        const newScaling = spheres.selected[0]?.scaling;
        
        return {
          success: true,
          initialX: initialScaling?.x,
          initialY: initialScaling?.y,
          initialZ: initialScaling?.z,
          newX: newScaling?.x,
          newY: newScaling?.y,
          newZ: newScaling?.z,
          scaledCorrectly: Math.abs((newScaling?.x || 0) - (initialScaling?.x || 1) * 2) < 0.001
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    });

    expect(result.success).toBe(true);
    expect(result.scaledCorrectly).toBe(true);
  });

  test("should handle invalid property chains gracefully", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const spheres = window.anu.selectName('sphere', scene);
      
      if (spheres.selected.length === 0) {
        throw new Error('No spheres found in scene');
      }

      const results: Array<{
        test: string;
        success: boolean;
        error?: string;
        reason?: string;
        correctError?: boolean;
      }> = [];

      // Test invalid property on Vector3 (position)
      try {
        spheres.position.invalidProperty(5);
        results.push({ test: 'invalidProperty', success: false, reason: 'Should have thrown error' });
      } catch (error: any) {
        results.push({ 
          test: 'invalidProperty', 
          success: true, 
          error: error.message,
          correctError: error.message.includes('not valid')
        });
      }

      // Test accessing method after property assignment
      try {
        spheres.position.x(10).position.invalidMethod();
        results.push({ test: 'invalidMethod', success: false, reason: 'Should have thrown error' });
      } catch (error: any) {
        results.push({ 
          test: 'invalidMethod', 
          success: true, 
          error: error.message,
          correctError: error.message.includes('not valid')
        });
      }

      return results;
    });

    // Should handle invalid properties gracefully with proper error messages
    const invalidPropertyTest = result.find(r => r.test === 'invalidProperty');
    expect(invalidPropertyTest?.success).toBe(true);
    expect(invalidPropertyTest?.correctError).toBe(true);
  });

  test("should support function arguments in property chains", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const spheres = window.anu.selectName('sphere', scene);
      
      if (spheres.selected.length === 0) {
        throw new Error('No spheres found in scene');
      }

      try {
        // Test function arguments that access data and node information
        spheres.position.x((data, node, index) => index * 10);
        
        const positions = spheres.selected.map((sphere, i) => ({
          index: i,
          x: sphere?.position?.x
        }));
        
        return {
          success: true,
          positions,
          correctIndexMapping: positions.every(p => p.x === p.index * 10)
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    });

    expect(result.success).toBe(true);
    expect(result.correctIndexMapping).toBe(true);
  });
});
