import { expect, test } from "@playwright/test";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    data: any;
    anu: any;
    BABYLON: any;
    engine: any;
    scene: any;
  }
}

// Always do soft assertions.
const softExpect = expect.configure({ soft: true });

test.describe("Anu Dynamic Property Assignment By Value Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should render proxyTest example correctly", async ({ page }) => {
    // Take a screenshot to verify the visual output
    await expect(page.locator("#renderCanvas")).toHaveScreenshot("proxy-test-initial.png", { 
      timeout: 15_000 
    });
  });

test("should set position values correctly via proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
        const scene = window.scene;
        if (!scene || !window.anu) {
            throw new Error('Scene or Anu not available');
        }

        const boxes = scene.meshes.filter(mesh => mesh.id.includes('box1'));
        return {
            boxCount: boxes.length,
            positions: boxes.slice(0, 5).map(box => ({
                x: box.position.x,
                y: box.position.y,
                z: box.position.z
            }))
        };
    });

    softExpect(result.boxCount, "box count").toBeGreaterThan(0);
    result.positions.forEach((pos, index) => {
        softExpect(pos.x, `box ${index} position.x`).toBe(0);
        softExpect(pos.y, `box ${index} position.y`).toBe(1);
        softExpect(pos.z, `box ${index} position.z`).toBe(2);
    });
});

test("should set scaling values correctly via proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
        const scene = window.scene;
        if (!scene || !window.anu) {
            throw new Error('Scene or Anu not available');
        }

        const boxes = scene.meshes.filter(mesh => mesh.id.includes('box1'));
        return {
            boxCount: boxes.length,
            scalings: boxes.slice(0, 5).map(box => ({
                x: box.scaling.x,
                y: box.scaling.y,
                z: box.scaling.z
            }))
        };
    });

    softExpect(result.boxCount, "box count").toBeGreaterThan(0);
    result.scalings.forEach((scale, index) => {
        softExpect(scale.x, `box ${index} scaling.x`).toBe(1);
        softExpect(scale.y, `box ${index} scaling.y`).toBe(2);
        softExpect(scale.z, `box ${index} scaling.z`).toBe(3);
    });
});

test("should set rotation values correctly via proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
        const scene = window.scene;
        if (!scene || !window.anu) {
            throw new Error('Scene or Anu not available');
        }

        const boxes = scene.meshes.filter(mesh => mesh.id.includes('box1'));
        return {
            boxCount: boxes.length,
            rotations: boxes.slice(0, 5).map(box => ({
                x: box.rotation.x,
                y: box.rotation.y,
                z: box.rotation.z
            }))
        };
    });

    softExpect(result.boxCount, "box count").toBeGreaterThan(0);
    result.rotations.forEach((rot, index) => {
        softExpect(rot.x, `box ${index} rotation.x`).toBe(0);
        softExpect(rot.y, `box ${index} rotation.y`).toBe(2);
        softExpect(rot.z, `box ${index} rotation.z`).toBe(3);
    });
});

test("should set material correctly via proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
        const scene = window.scene;
        if (!scene || !window.anu) {
            throw new Error('Scene or Anu not available');
        }

        const boxes = scene.meshes.filter(mesh => mesh.id.includes('box1'));
        return {
            boxCount: boxes.length,
            materialColors: boxes.slice(0, 5).map(box => {
                if (box.material && box.material.diffuseColor) {
                    return {
                        r: box.material.diffuseColor.r,
                        g: box.material.diffuseColor.g,
                        b: box.material.diffuseColor.b
                    };
                }
                return null;
            })
        };
    });

    softExpect(result.boxCount, "box count").toBeGreaterThan(0);
    result.materialColors.forEach((color, index) => {
        softExpect(color, `box ${index} material`).not.toBeNull();
        if (color) {
            softExpect(color.r, `box ${index} red component`).toBe(1);
            softExpect(color.g, `box ${index} green component`).toBe(0);
            softExpect(color.b, `box ${index} blue component`).toBe(0);
        }
    });
});

});

test.describe("Anu Dynamic Property Assignment By Function Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set position values correctly via proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box2'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        positions: boxes.slice(0, 5).map((box, index) => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z,
          expectedX: window.data[index]?.petalLength,
          expectedY: window.data[index]?.petalWidth,
          expectedZ: window.data[index]?.sepalLength
        }))
      };
    });

    softExpect(result.boxCount, "box2 count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box2 count matches data").toBe(result.dataLength);
    
    result.positions.forEach((pos, index) => {
      if (pos.expectedX !== undefined && pos.expectedY !== undefined && pos.expectedZ !== undefined) {
        softExpect(pos.x, `box2 ${index} position.x`).toBe(pos.expectedX);
        softExpect(pos.y, `box2 ${index} position.y`).toBe(pos.expectedY);
        softExpect(pos.z, `box2 ${index} position.z`).toBe(pos.expectedZ);
      }
    });
  });

  test("should set scaling values correctly via proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box2'));
      return {
        boxCount: boxes.length,
        scalings: boxes.slice(0, 5).map(box => ({
          x: box.scaling.x,
          y: box.scaling.y,
          z: box.scaling.z,
          positionX: box.position.x,
          positionY: box.position.y,
          positionZ: box.position.z,
          expectedX: box.position.x * 0.05,
          expectedY: box.position.y * 0.05,
          expectedZ: box.position.z * 0.05
        }))
      };
    });

    softExpect(result.boxCount, "box2 count").toBeGreaterThan(0);
    
    result.scalings.forEach((scale, index) => {
      // Scaling should be position * 0.05 based on the function: (d, n, i) => new Vector3(n.position.x * 0.05, n.position.y * 0.05, n.position.z * 0.05)
      softExpect(scale.x, `box2 ${index} scaling.x`).toBe(scale.expectedX);
      softExpect(scale.y, `box2 ${index} scaling.y`).toBe(scale.expectedY);
      softExpect(scale.z, `box2 ${index} scaling.z`).toBe(scale.expectedZ);
    });
  });

  test("should set rotation values correctly via proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box2'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map((box, index) => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z,
          expectedRotation: index // Based on function: (d, n, i) => new Vector3(i, i, i)
        }))
      };
    });

    softExpect(result.boxCount, "box2 count").toBeGreaterThan(0);
    
    result.rotations.forEach((rot, index) => {
      // Rotation should be (i, i, i) where i is the index
      softExpect(rot.x, `box2 ${index} rotation.x`).toBe(rot.expectedRotation);
      softExpect(rot.y, `box2 ${index} rotation.y`).toBe(rot.expectedRotation);
      softExpect(rot.z, `box2 ${index} rotation.z`).toBe(rot.expectedRotation);
    });
  });

  test("should set material correctly via proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box2'));
      return {
        boxCount: boxes.length,
        materialColors: boxes.slice(0, 5).map((box, index) => {
          if (box.material && box.material.diffuseColor) {
            return {
              r: box.material.diffuseColor.r,
              g: box.material.diffuseColor.g,
              b: box.material.diffuseColor.b,
              materialName: box.material.name
            };
          }
          return null;
        })
      };
    });

    softExpect(result.boxCount, "box2 count").toBeGreaterThan(0);
    
    result.materialColors.forEach((color, index) => {
      softExpect(color, `box2 ${index} material`).not.toBeNull();
      if (color) {
        // Each box2 should have a green material created by the function
        softExpect(color.r, `box2 ${index} red component`).toBe(0);
        softExpect(color.g, `box2 ${index} green component`).toBe(1);
        softExpect(color.b, `box2 ${index} blue component`).toBe(0);
        // Each material should have a unique name based on index
        softExpect(color.materialName, `box2 ${index} material name`).toBe(`mat${index}`);
      }
    });
  });

});

test.describe("Anu Sub-Property Assignment By Value Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set position values correctly via sub-property proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box3'));
      return {
        boxCount: boxes.length,
        positions: boxes.slice(0, 5).map(box => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z
        }))
      };
    });

    softExpect(result.boxCount, "box3 count").toBeGreaterThan(0);
    result.positions.forEach((pos, index) => {
      softExpect(pos.x, `box3 ${index} position.x`).toBe(0);
      softExpect(pos.y, `box3 ${index} position.y`).toBe(-1);
      softExpect(pos.z, `box3 ${index} position.z`).toBe(-2);
    });
  });

  test("should set scaling values correctly via sub-property proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box3'));
      return {
        boxCount: boxes.length,
        scalings: boxes.slice(0, 5).map(box => ({
          x: box.scaling.x,
          y: box.scaling.y,
          z: box.scaling.z
        }))
      };
    });

    softExpect(result.boxCount, "box3 count").toBeGreaterThan(0);
    result.scalings.forEach((scale, index) => {
      softExpect(scale.x, `box3 ${index} scaling.x`).toBe(-1);
      softExpect(scale.y, `box3 ${index} scaling.y`).toBe(-2);
      softExpect(scale.z, `box3 ${index} scaling.z`).toBe(-3);
    });
  });

  test("should set rotation values correctly via sub-property proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box3'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map(box => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z
        }))
      };
    });

    softExpect(result.boxCount, "box3 count").toBeGreaterThan(0);
    result.rotations.forEach((rot, index) => {
      softExpect(rot.x, `box3 ${index} rotation.x`).toBe(0);
      softExpect(rot.y, `box3 ${index} rotation.y`).toBe(-2);
      softExpect(rot.z, `box3 ${index} rotation.z`).toBe(-3);
    });
  });

  test("should set material correctly via sub-property proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box3'));
      return {
        boxCount: boxes.length,
        materialColors: boxes.slice(0, 5).map(box => {
          if (box.material && box.material.diffuseColor) {
            return {
              r: box.material.diffuseColor.r,
              g: box.material.diffuseColor.g,
              b: box.material.diffuseColor.b
            };
          }
          return null;
        })
      };
    });

    softExpect(result.boxCount, "box3 count").toBeGreaterThan(0);
    result.materialColors.forEach((color, index) => {
      softExpect(color, `box3 ${index} material`).not.toBeNull();
      if (color) {
        // Each box3 should have a green material (testMaterial2)
        softExpect(color.r, `box3 ${index} red component`).toBe(0);
        softExpect(color.g, `box3 ${index} green component`).toBe(0);
        softExpect(color.b, `box3 ${index} blue component`).toBe(1);
      }
    });
  });

});

test.describe("Anu Sub-Property Assignment By Function Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set position values correctly via sub-property proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box4'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        positions: boxes.slice(0, 5).map((box, index) => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z,
          expectedX: window.data[index]?.petalLength,
          expectedY: window.data[index]?.petalWidth,
          expectedZ: window.data[index]?.sepalLength
        }))
      };
    });

    softExpect(result.boxCount, "box4 count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box4 count matches data").toBe(result.dataLength);
    
    result.positions.forEach((pos, index) => {
      if (pos.expectedX !== undefined && pos.expectedY !== undefined && pos.expectedZ !== undefined) {
        softExpect(pos.x, `box4 ${index} position.x`).toBe(-pos.expectedX);
        softExpect(pos.y, `box4 ${index} position.y`).toBe(-pos.expectedY);
        softExpect(pos.z, `box4 ${index} position.z`).toBe(-pos.expectedZ);
      }
    });
  });

  test("should set scaling values correctly via sub-property proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box4'));
      return {
        boxCount: boxes.length,
        scalings: boxes.slice(0, 5).map(box => ({
          x: box.scaling.x,
          y: box.scaling.y,
          z: box.scaling.z,
          positionX: box.position.x,
          positionY: box.position.y,
          positionZ: box.position.z,
          expectedX: box.position.x * 0.05,
          expectedY: box.position.y * 0.05,
          expectedZ: box.position.z * 0.05
        }))
      };
    });

    softExpect(result.boxCount, "box4 count").toBeGreaterThan(0);
    
    result.scalings.forEach((scale, index) => {
      // Scaling should be position * 0.05 based on the functions: .scaling.x/y/z((d, n, i) => n.position.x/y/z * 0.05)
      softExpect(scale.x, `box4 ${index} scaling.x`).toBe(-scale.expectedX);
      softExpect(scale.y, `box4 ${index} scaling.y`).toBe(-scale.expectedY);
      softExpect(scale.z, `box4 ${index} scaling.z`).toBe(-scale.expectedZ);
    });
  });

  test("should set rotation values correctly via sub-property proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box4'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map((box, index) => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z,
          expectedRotation: index // Based on functions: .rotation.x/y/z((d, n, i) => i)
        }))
      };
    });

    softExpect(result.boxCount, "box4 count").toBeGreaterThan(0);
    
    result.rotations.forEach((rot, index) => {
      // Rotation should be (i, i, i) where i is the index
      softExpect(rot.x, `box4 ${index} rotation.x`).toBe(-rot.expectedRotation);
      softExpect(rot.y, `box4 ${index} rotation.y`).toBe(-rot.expectedRotation);
      softExpect(rot.z, `box4 ${index} rotation.z`).toBe(-rot.expectedRotation);
    });
  });

  test("should set material correctly via sub-property proxy methods with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box4'));
      return {
        boxCount: boxes.length,
        materialColors: boxes.slice(0, 5).map((box, index) => {
          if (box.material && box.material.diffuseColor) {
            return {
              r: box.material.diffuseColor.r,
              g: box.material.diffuseColor.g,
              b: box.material.diffuseColor.b,
              materialName: box.material.name
            };
          }
          return null;
        })
      };
    });

    softExpect(result.boxCount, "box4 count").toBeGreaterThan(0);
    
    result.materialColors.forEach((color, index) => {
      softExpect(color, `box4 ${index} material`).not.toBeNull();
      if (color) {
        // Each box4 should have a blue material created by the function
        softExpect(color.r, `box4 ${index} red component`).toBe(1);
        softExpect(color.g, `box4 ${index} green component`).toBe(1);
        softExpect(color.b, `box4 ${index} blue component`).toBe(0);
        // Each material should have a unique name based on index
        softExpect(color.materialName, `box4 ${index} material name`).toBe(`mat4_${index}`);
      }
    });
  });

});