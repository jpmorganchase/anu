import { expect, test } from "@playwright/test";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    data: any;
    anu: any;
    BABYLON: any;
    engine: any;
    scene: any;
    boxes1Values: any;
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

test.describe("Anu Proxy Method Calls Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should execute translate method correctly via proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box5'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        positions: boxes.slice(0, 5).map((box, index) => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z,
          expectedY: window.data[index]?.petalWidth, // translate(new Vector3(0,1,0), petalWidth)
          petalWidth: window.data[index]?.petalWidth
        }))
      };
    });

    softExpect(result.boxCount, "box5 count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box5 count matches data").toBe(result.dataLength);
    
    result.positions.forEach((pos, index) => {
      if (pos.expectedY !== undefined && pos.petalWidth !== undefined) {
        softExpect(pos.x, `box5 ${index} position.x`).toBe(0); // No translation on X
        softExpect(pos.y, `box5 ${index} position.y`).toBe(pos.expectedY); // Translated by 1 + petalWidth
        softExpect(pos.z, `box5 ${index} position.z`).toBe(0); // No translation on Z
      }
    });
  });


  test("should execute rotation.setAll method correctly via proxy methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box5'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map(box => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z
        }))
      };
    });

    softExpect(result.boxCount, "box5 count").toBeGreaterThan(0);
    
    result.rotations.forEach((rot, index) => {
      // rotation.setAll(2) should set all rotation components to 2
      softExpect(rot.x, `box5 ${index} rotation.x`).toBe(2);
      softExpect(rot.y, `box5 ${index} rotation.y`).toBe(2);
      softExpect(rot.z, `box5 ${index} rotation.z`).toBe(2);
    });
  });

  test("should create correct number of boxes5 based on data length", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes5 = scene.meshes.filter(mesh => mesh.id.includes('box5'));
      return {
        box5Count: boxes5.length,
        dataLength: window.data.length
      };
    });
    
    softExpect(result.box5Count, "box5 count matches data length").toBe(result.dataLength);
  });

});

test.describe("Anu Proxy Value Getter Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should get position values correctly via proxy getter methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      if (!window.boxes1Values) {
        throw new Error('boxes1Values not available');
      }

      const boxes1 = window.boxes1Values;
      
      return {
        // Test first few items
        firstPositions: boxes1.position.slice(0, 3),
        firstScalings: boxes1.scaling.slice(0, 3),
        firstRotations: boxes1.rotation.slice(0, 3),
        hasMaterials: boxes1.material && boxes1.material.length > 0,
        materialCount: boxes1.material ? boxes1.material.length : 0
      };
    });

    softExpect(result.firstPositions, "positions array").toHaveLength(3);
    softExpect(result.firstScalings, "scalings array").toHaveLength(3);
    softExpect(result.firstRotations, "rotations array").toHaveLength(3);
    softExpect(result.hasMaterials, "has materials").toBe(true);

    // Check that all positions are the expected static values (0, 1, 2)
    result.firstPositions.forEach((pos, index) => {
      softExpect(pos._x, `position ${index} x`).toBe(0);
      softExpect(pos._y, `position ${index} y`).toBe(1);
      softExpect(pos._z, `position ${index} z`).toBe(2);
    });
    
    // Check that all scalings are the expected static values (1, 2, 3)
    result.firstScalings.forEach((scale, index) => {
      softExpect(scale._x, `scaling ${index} x`).toBe(1);
      softExpect(scale._y, `scaling ${index} y`).toBe(2);
      softExpect(scale._z, `scaling ${index} z`).toBe(3);
    });
    
    // Check that all rotations are the expected static values (0, 2, 3)
    result.firstRotations.forEach((rot, index) => {
      softExpect(rot._x, `rotation ${index} x`).toBe(0);
      softExpect(rot._y, `rotation ${index} y`).toBe(2);
      softExpect(rot._z, `rotation ${index} z`).toBe(3);
    });
  });

  test("should get material and color values correctly via proxy getter methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      if (!window.boxes1Values) {
        throw new Error('boxes1Values not available');
      }

      const boxes1 = window.boxes1Values;
      
      // Try to get color values safely
      let firstDiffuseColors = [];
      let hasDiffuseColors = false;
      let diffuseColorCount = 0;
      
      try {
        if (boxes1.color && Array.isArray(boxes1.color)) {
          firstDiffuseColors = boxes1.color.slice(0, 3);
          hasDiffuseColors = boxes1.color.length > 0;
          diffuseColorCount = boxes1.color.length;
        }
      } catch (e) {
        // Color might be a proxy object, skip color testing
      }
      
      return {
        hasMaterials: boxes1.material && boxes1.material.length > 0,
        materialCount: boxes1.material ? boxes1.material.length : 0,
        firstMaterialColors: boxes1.material ? boxes1.material.slice(0, 3).map(mat => 
          mat && mat.diffuseColor ? {
            r: mat.diffuseColor.r,
            g: mat.diffuseColor.g,
            b: mat.diffuseColor.b
          } : null
        ) : [],
        hasDiffuseColors,
        diffuseColorCount,
        firstDiffuseColors
      };
    });

    softExpect(result.hasMaterials, "has materials").toBe(true);
    softExpect(result.materialCount, "material count").toBeGreaterThan(0);
    
    // Check material colors (should be red: 1, 0, 0)
    result.firstMaterialColors.forEach((color, index) => {
      if (color) {
        softExpect(color.r, `material ${index} red component`).toBe(1);
        softExpect(color.g, `material ${index} green component`).toBe(0);
        softExpect(color.b, `material ${index} blue component`).toBe(0);
      }
    });
    
    // Test the direct color values from boxes1Values.color
    if (result.hasDiffuseColors) {
      softExpect(result.diffuseColorCount, "diffuse color count").toBe(result.materialCount);
      result.firstDiffuseColors.forEach((color: any, index) => {
        if (color) {
          softExpect(color.r, `diffuse color ${index} red component`).toBe(1);
          softExpect(color.g, `diffuse color ${index} green component`).toBe(0);
          softExpect(color.b, `diffuse color ${index} blue component`).toBe(0);
        }
      });
    }
  });



});

test.describe("Anu prop() Method Assignment By Value Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set position values correctly via prop method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box6'));
      return {
        boxCount: boxes.length,
        positions: boxes.slice(0, 5).map(box => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z
        }))
      };
    });

    softExpect(result.boxCount, "box6 count").toBeGreaterThan(0);
    result.positions.forEach((pos, index) => {
      softExpect(pos.x, `box6 ${index} position.x`).toBe(3);
      softExpect(pos.y, `box6 ${index} position.y`).toBe(4);
      softExpect(pos.z, `box6 ${index} position.z`).toBe(5);
    });
  });

  test("should set scaling values correctly via prop method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box6'));
      return {
        boxCount: boxes.length,
        scalings: boxes.slice(0, 5).map(box => ({
          x: box.scaling.x,
          y: box.scaling.y,
          z: box.scaling.z
        }))
      };
    });

    softExpect(result.boxCount, "box6 count").toBeGreaterThan(0);
    result.scalings.forEach((scale, index) => {
      softExpect(scale.x, `box6 ${index} scaling.x`).toBe(0.5);
      softExpect(scale.y, `box6 ${index} scaling.y`).toBe(1.5);
      softExpect(scale.z, `box6 ${index} scaling.z`).toBe(2.5);
    });
  });

  test("should set rotation values correctly via prop method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box6'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map(box => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z
        }))
      };
    });

    softExpect(result.boxCount, "box6 count").toBeGreaterThan(0);
    result.rotations.forEach((rot, index) => {
      softExpect(rot.x, `box6 ${index} rotation.x`).toBe(1);
      softExpect(rot.y, `box6 ${index} rotation.y`).toBe(3);
      softExpect(rot.z, `box6 ${index} rotation.z`).toBe(4);
    });
  });

  test("should set material correctly via prop method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box6'));
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

    softExpect(result.boxCount, "box6 count").toBeGreaterThan(0);
    result.materialColors.forEach((color, index) => {
      softExpect(color, `box6 ${index} material`).not.toBeNull();
      if (color) {
        softExpect(color.r, `box6 ${index} red component`).toBe(1);
        softExpect(color.g, `box6 ${index} green component`).toBe(0);
        softExpect(color.b, `box6 ${index} blue component`).toBe(0);
      }
    });
  });
});

test.describe("Anu prop() Method Assignment By Function Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set position values correctly via prop method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box7'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        positions: boxes.slice(0, 5).map((box, index) => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z,
          expectedX: window.data[index]?.petalLength + 10,
          expectedY: window.data[index]?.petalWidth + 10,
          expectedZ: window.data[index]?.sepalLength + 10
        }))
      };
    });

    softExpect(result.boxCount, "box7 count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box7 count matches data").toBe(result.dataLength);
    
    result.positions.forEach((pos, index) => {
      if (pos.expectedX !== undefined && pos.expectedY !== undefined && pos.expectedZ !== undefined) {
        softExpect(pos.x, `box7 ${index} position.x`).toBe(pos.expectedX);
        softExpect(pos.y, `box7 ${index} position.y`).toBe(pos.expectedY);
        softExpect(pos.z, `box7 ${index} position.z`).toBe(pos.expectedZ);
      }
    });
  });

  test("should set scaling values correctly via prop method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box7'));
      return {
        boxCount: boxes.length,
        scalings: boxes.slice(0, 5).map(box => ({
          x: box.scaling.x,
          y: box.scaling.y,
          z: box.scaling.z,
          positionX: box.position.x,
          positionY: box.position.y,
          positionZ: box.position.z,
          expectedX: box.position.x * 0.01,
          expectedY: box.position.y * 0.01,
          expectedZ: box.position.z * 0.01
        }))
      };
    });

    softExpect(result.boxCount, "box7 count").toBeGreaterThan(0);
    
    result.scalings.forEach((scale, index) => {
      softExpect(scale.x, `box7 ${index} scaling.x`).toBe(scale.expectedX);
      softExpect(scale.y, `box7 ${index} scaling.y`).toBe(scale.expectedY);
      softExpect(scale.z, `box7 ${index} scaling.z`).toBe(scale.expectedZ);
    });
  });

  test("should set rotation values correctly via prop method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box7'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map((box, index) => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z,
          expectedRotation: index * 2
        }))
      };
    });

    softExpect(result.boxCount, "box7 count").toBeGreaterThan(0);
    
    result.rotations.forEach((rot, index) => {
      softExpect(rot.x, `box7 ${index} rotation.x`).toBe(rot.expectedRotation);
      softExpect(rot.y, `box7 ${index} rotation.y`).toBe(rot.expectedRotation);
      softExpect(rot.z, `box7 ${index} rotation.z`).toBe(rot.expectedRotation);
    });
  });

  test("should set material correctly via prop method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box7'));
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

    softExpect(result.boxCount, "box7 count").toBeGreaterThan(0);
    
    result.materialColors.forEach((color, index) => {
      softExpect(color, `box7 ${index} material`).not.toBeNull();
      if (color) {
        softExpect(color.r, `box7 ${index} red component`).toBe(1);
        softExpect(color.g, `box7 ${index} green component`).toBe(0);
        softExpect(color.b, `box7 ${index} blue component`).toBe(1);
        softExpect(color.materialName, `box7 ${index} material name`).toBe(`mat7_${index}`);
      }
    });
  });
});

test.describe("Anu prop() Method Nested Property Assignment By Value Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set position values correctly via prop method with nested properties", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box8'));
      return {
        boxCount: boxes.length,
        positions: boxes.slice(0, 5).map(box => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z
        }))
      };
    });

    softExpect(result.boxCount, "box8 count").toBeGreaterThan(0);
    result.positions.forEach((pos, index) => {
      softExpect(pos.x, `box8 ${index} position.x`).toBe(5);
      softExpect(pos.y, `box8 ${index} position.y`).toBe(6);
      softExpect(pos.z, `box8 ${index} position.z`).toBe(7);
    });
  });

  test("should set scaling values correctly via prop method with nested properties", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box8'));
      return {
        boxCount: boxes.length,
        scalings: boxes.slice(0, 5).map(box => ({
          x: box.scaling.x,
          y: box.scaling.y,
          z: box.scaling.z
        }))
      };
    });

    softExpect(result.boxCount, "box8 count").toBeGreaterThan(0);
    result.scalings.forEach((scale, index) => {
      softExpect(scale.x, `box8 ${index} scaling.x`).toBe(0.8);
      softExpect(scale.y, `box8 ${index} scaling.y`).toBe(1.8);
      softExpect(scale.z, `box8 ${index} scaling.z`).toBe(2.8);
    });
  });

  test("should set rotation values correctly via prop method with nested properties", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box8'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map(box => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z
        }))
      };
    });

    softExpect(result.boxCount, "box8 count").toBeGreaterThan(0);
    result.rotations.forEach((rot, index) => {
      softExpect(rot.x, `box8 ${index} rotation.x`).toBe(1);
      softExpect(rot.y, `box8 ${index} rotation.y`).toBe(4);
      softExpect(rot.z, `box8 ${index} rotation.z`).toBe(5);
    });
  });

  test("should set material correctly via prop method with nested properties", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box8'));
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

    softExpect(result.boxCount, "box8 count").toBeGreaterThan(0);
    result.materialColors.forEach((color, index) => {
      softExpect(color, `box8 ${index} material`).not.toBeNull();
      if (color) {
        softExpect(color.r, `box8 ${index} red component`).toBe(0);
        softExpect(color.g, `box8 ${index} green component`).toBe(1);
        softExpect(color.b, `box8 ${index} blue component`).toBe(1);
      }
    });
  });
});

test.describe("Anu prop() Method Nested Property Assignment By Function Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set position values correctly via prop method with nested properties and functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box9'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        positions: boxes.slice(0, 5).map((box, index) => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z,
          expectedX: window.data[index]?.petalLength + 20,
          expectedY: window.data[index]?.petalWidth + 20,
          expectedZ: window.data[index]?.sepalLength + 20
        }))
      };
    });

    softExpect(result.boxCount, "box9 count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box9 count matches data").toBe(result.dataLength);
    
    result.positions.forEach((pos, index) => {
      if (pos.expectedX !== undefined && pos.expectedY !== undefined && pos.expectedZ !== undefined) {
        softExpect(pos.x, `box9 ${index} position.x`).toBe(pos.expectedX);
        softExpect(pos.y, `box9 ${index} position.y`).toBe(pos.expectedY);
        softExpect(pos.z, `box9 ${index} position.z`).toBe(pos.expectedZ);
      }
    });
  });

  test("should set scaling values correctly via prop method with nested properties and functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box9'));
      return {
        boxCount: boxes.length,
        scalings: boxes.slice(0, 5).map(box => ({
          x: box.scaling.x,
          y: box.scaling.y,
          z: box.scaling.z,
          positionX: box.position.x,
          positionY: box.position.y,
          positionZ: box.position.z,
          expectedX: box.position.x * 0.02,
          expectedY: box.position.y * 0.02,
          expectedZ: box.position.z * 0.02
        }))
      };
    });

    softExpect(result.boxCount, "box9 count").toBeGreaterThan(0);
    
    result.scalings.forEach((scale, index) => {
      softExpect(scale.x, `box9 ${index} scaling.x`).toBe(scale.expectedX);
      softExpect(scale.y, `box9 ${index} scaling.y`).toBe(scale.expectedY);
      softExpect(scale.z, `box9 ${index} scaling.z`).toBe(scale.expectedZ);
    });
  });

  test("should set rotation values correctly via prop method with nested properties and functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box9'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map((box, index) => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z,
          expectedRotation: index * 3
        }))
      };
    });

    softExpect(result.boxCount, "box9 count").toBeGreaterThan(0);
    
    result.rotations.forEach((rot, index) => {
      softExpect(rot.x, `box9 ${index} rotation.x`).toBe(rot.expectedRotation);
      softExpect(rot.y, `box9 ${index} rotation.y`).toBe(rot.expectedRotation);
      softExpect(rot.z, `box9 ${index} rotation.z`).toBe(rot.expectedRotation);
    });
  });

  test("should set material correctly via prop method with nested properties and functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box9'));
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

    softExpect(result.boxCount, "box9 count").toBeGreaterThan(0);
    
    result.materialColors.forEach((color, index) => {
      softExpect(color, `box9 ${index} material`).not.toBeNull();
      if (color) {
        softExpect(color.r, `box9 ${index} red component`).toBe(0.5);
        softExpect(color.g, `box9 ${index} green component`).toBe(0);
        softExpect(color.b, `box9 ${index} blue component`).toBe(0.5);
        softExpect(color.materialName, `box9 ${index} material name`).toBe(`mat9_${index}`);
      }
    });
  });
});

test.describe("Anu prop() Method Calls Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should execute translate method correctly via prop method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10'));
      return {
        boxCount: boxes.length,
        positions: boxes.slice(0, 5).map(box => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z
        }))
      };
    });

    softExpect(result.boxCount, "box10 count").toBeGreaterThan(0);
    
    result.positions.forEach((pos, index) => {
      softExpect(pos.x, `box10 ${index} position.x`).toBe(0);
      softExpect(pos.y, `box10 ${index} position.y`).toBe(5);
      softExpect(pos.z, `box10 ${index} position.z`).toBe(0);
    });
  });

  test("should execute setEnabled method correctly via prop method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10'));
      return {
        boxCount: boxes.length,
        enabledStates: boxes.slice(0, 5).map(box => box.isEnabled())
      };
    });

    softExpect(result.boxCount, "box10 count").toBeGreaterThan(0);
    
    result.enabledStates.forEach((enabled, index) => {
      softExpect(enabled, `box10 ${index} enabled state`).toBe(true);
    });
  });

  test("should execute rotation.setAll method correctly via prop method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map(box => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z
        }))
      };
    });

    softExpect(result.boxCount, "box10 count").toBeGreaterThan(0);
    
    result.rotations.forEach((rot, index) => {
      softExpect(rot.x, `box10 ${index} rotation.x`).toBe(3);
      softExpect(rot.y, `box10 ${index} rotation.y`).toBe(3);
      softExpect(rot.z, `box10 ${index} rotation.z`).toBe(3);
    });
  });
});

test.describe("Anu prop() Method Calls with Functions Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should execute translate method correctly via prop method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10b'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        positions: boxes.slice(0, 5).map((box, index) => ({
          x: box.position.x,
          y: box.position.y,
          z: box.position.z,
          expectedX: window.data[index]?.petalLength
        }))
      };
    });

    softExpect(result.boxCount, "box10b count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box10b count matches data").toBe(result.dataLength);
    
    result.positions.forEach((pos, index) => {
      if (pos.expectedX !== undefined) {
        softExpect(pos.x, `box10b ${index} position.x`).toBe(pos.expectedX);
        softExpect(pos.y, `box10b ${index} position.y`).toBe(0);
        softExpect(pos.z, `box10b ${index} position.z`).toBe(0);
      }
    });
  });

  test("should execute setEnabled method correctly via prop method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10b'));
      return {
        boxCount: boxes.length,
        enabledStates: boxes.slice(0, 9).map((box, index) => ({
          enabled: box.isEnabled(),
          expected: (index % 3) === 0
        }))
      };
    });

    softExpect(result.boxCount, "box10b count").toBeGreaterThan(0);
    
    result.enabledStates.forEach((state, index) => {
      softExpect(state.enabled, `box10b ${index} enabled state`).toBe(state.expected);
    });
  });

  test("should execute rotation.setAll method correctly via prop method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10b'));
      return {
        boxCount: boxes.length,
        rotations: boxes.slice(0, 5).map((box, index) => ({
          x: box.rotation.x,
          y: box.rotation.y,
          z: box.rotation.z,
          expected: index * 0.1
        }))
      };
    });

    softExpect(result.boxCount, "box10b count").toBeGreaterThan(0);
    
    result.rotations.forEach((rot, index) => {
      softExpect(rot.x, `box10b ${index} rotation.x`).toBeCloseTo(rot.expected, 5);
      softExpect(rot.y, `box10b ${index} rotation.y`).toBeCloseTo(rot.expected, 5);
      softExpect(rot.z, `box10b ${index} rotation.z`).toBeCloseTo(rot.expected, 5);
    });
  });
});

test.describe("Anu props() Method Calls with Static Values Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should execute multiple methods correctly via props method with static values", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10c'));
      return {
        boxCount: boxes.length,
        values: boxes.slice(0, 5).map(box => ({
          position: { x: box.position.x, y: box.position.y, z: box.position.z },
          enabled: box.isEnabled(),
          rotation: { x: box.rotation.x, y: box.rotation.y, z: box.rotation.z }
        }))
      };
    });

    softExpect(result.boxCount, "box10c count").toBeGreaterThan(0);
    
    result.values.forEach((val, index) => {
      softExpect(val.position.x, `box10c ${index} position.x`).toBe(0);
      softExpect(val.position.y, `box10c ${index} position.y`).toBe(0);
      softExpect(val.position.z, `box10c ${index} position.z`).toBe(8);
      softExpect(val.enabled, `box10c ${index} enabled state`).toBe(true);
      softExpect(val.rotation.x, `box10c ${index} rotation.x`).toBe(4);
      softExpect(val.rotation.y, `box10c ${index} rotation.y`).toBe(4);
      softExpect(val.rotation.z, `box10c ${index} rotation.z`).toBe(4);
    });
  });
});

test.describe("Anu props() Method Calls with Functions Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should execute multiple methods correctly via props method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box10d'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        values: boxes.slice(0, 12).map((box, index) => ({
          position: { 
            x: box.position.x, 
            y: box.position.y, 
            z: box.position.z,
            expectedY: window.data[index]?.sepalLength,
            expectedZ: window.data[index]?.sepalLength
          },
          enabled: box.isEnabled(),
          expectedEnabled: (index % 4) === 0,
          rotation: { 
            x: box.rotation.x, 
            y: box.rotation.y, 
            z: box.rotation.z,
            expected: index * 0.2
          }
        }))
      };
    });

    softExpect(result.boxCount, "box10d count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box10d count matches data").toBe(result.dataLength);
    
    result.values.forEach((val, index) => {
      if (val.position.expectedY !== undefined && val.position.expectedZ !== undefined) {
        softExpect(val.position.x, `box10d ${index} position.x`).toBe(0);
        softExpect(val.position.y, `box10d ${index} position.y`).toBe(val.position.expectedY);
        softExpect(val.position.z, `box10d ${index} position.z`).toBe(val.position.expectedZ);
      }
      softExpect(val.enabled, `box10d ${index} enabled state`).toBe(val.expectedEnabled);
      softExpect(val.rotation.x, `box10d ${index} rotation.x`).toBeCloseTo(val.rotation.expected, 5);
      softExpect(val.rotation.y, `box10d ${index} rotation.y`).toBeCloseTo(val.rotation.expected, 5);
      softExpect(val.rotation.z, `box10d ${index} rotation.z`).toBeCloseTo(val.rotation.expected, 5);
    });
  });
});

test.describe("Anu props() Method Assignment By Value Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set multiple properties correctly via props method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box11'));
      return {
        boxCount: boxes.length,
        values: boxes.slice(0, 5).map(box => ({
          position: { x: box.position.x, y: box.position.y, z: box.position.z },
          scaling: { x: box.scaling.x, y: box.scaling.y, z: box.scaling.z },
          rotation: { x: box.rotation.x, y: box.rotation.y, z: box.rotation.z },
          material: box.material ? {
            r: box.material.diffuseColor?.r,
            g: box.material.diffuseColor?.g,
            b: box.material.diffuseColor?.b
          } : null
        }))
      };
    });

    softExpect(result.boxCount, "box11 count").toBeGreaterThan(0);
    
    result.values.forEach((val, index) => {
      softExpect(val.position.x, `box11 ${index} position.x`).toBe(8);
      softExpect(val.position.y, `box11 ${index} position.y`).toBe(9);
      softExpect(val.position.z, `box11 ${index} position.z`).toBe(10);
      
      softExpect(val.scaling.x, `box11 ${index} scaling.x`).toBe(0.3);
      softExpect(val.scaling.y, `box11 ${index} scaling.y`).toBe(1.3);
      softExpect(val.scaling.z, `box11 ${index} scaling.z`).toBe(2.3);
      
      softExpect(val.rotation.x, `box11 ${index} rotation.x`).toBe(2);
      softExpect(val.rotation.y, `box11 ${index} rotation.y`).toBe(5);
      softExpect(val.rotation.z, `box11 ${index} rotation.z`).toBe(6);
      
      if (val.material) {
        softExpect(val.material.r, `box11 ${index} red component`).toBe(0);
        softExpect(val.material.g, `box11 ${index} green component`).toBe(1);
        softExpect(val.material.b, `box11 ${index} blue component`).toBe(0);
      }
    });
  });
});

test.describe("Anu props() Method Assignment By Function Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set multiple properties correctly via props method with functions", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu || !window.data) {
        throw new Error('Scene, Anu, or data not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box12'));
      return {
        boxCount: boxes.length,
        dataLength: window.data.length,
        values: boxes.slice(0, 5).map((box, index) => ({
          position: { 
            x: box.position.x, 
            y: box.position.y, 
            z: box.position.z,
            expectedX: window.data[index]?.petalLength + 30,
            expectedY: window.data[index]?.petalWidth + 30,
            expectedZ: window.data[index]?.sepalLength + 30
          },
          scaling: { 
            x: box.scaling.x, 
            y: box.scaling.y, 
            z: box.scaling.z,
            expectedX: box.position.x * 0.03,
            expectedY: box.position.y * 0.03,
            expectedZ: box.position.z * 0.03
          },
          rotation: { 
            x: box.rotation.x, 
            y: box.rotation.y, 
            z: box.rotation.z,
            expected: index * 4
          },
          material: box.material ? {
            r: box.material.diffuseColor?.r,
            g: box.material.diffuseColor?.g,
            b: box.material.diffuseColor?.b,
            name: box.material.name
          } : null
        }))
      };
    });

    softExpect(result.boxCount, "box12 count").toBeGreaterThan(0);
    softExpect(result.boxCount, "box12 count matches data").toBe(result.dataLength);
    
    result.values.forEach((val, index) => {
      if (val.position.expectedX !== undefined) {
        softExpect(val.position.x, `box12 ${index} position.x`).toBe(val.position.expectedX);
        softExpect(val.position.y, `box12 ${index} position.y`).toBe(val.position.expectedY);
        softExpect(val.position.z, `box12 ${index} position.z`).toBe(val.position.expectedZ);
      }
      
      softExpect(val.scaling.x, `box12 ${index} scaling.x`).toBe(val.scaling.expectedX);
      softExpect(val.scaling.y, `box12 ${index} scaling.y`).toBe(val.scaling.expectedY);
      softExpect(val.scaling.z, `box12 ${index} scaling.z`).toBe(val.scaling.expectedZ);
      
      softExpect(val.rotation.x, `box12 ${index} rotation.x`).toBe(val.rotation.expected);
      softExpect(val.rotation.y, `box12 ${index} rotation.y`).toBe(val.rotation.expected);
      softExpect(val.rotation.z, `box12 ${index} rotation.z`).toBe(val.rotation.expected);
      
      if (val.material) {
        softExpect(val.material.r, `box12 ${index} red component`).toBe(0.5);
        softExpect(val.material.g, `box12 ${index} green component`).toBe(0.5);
        softExpect(val.material.b, `box12 ${index} blue component`).toBe(0.5);
        softExpect(val.material.name, `box12 ${index} material name`).toBe(`mat12_${index}`);
      }
    });
  });
});

test.describe("Anu props() Method Nested Property Assignment Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the proxyTest example using the Anu framework URL pattern
    await page.goto("/anu/?example=proxyTest");
    
    // Wait for the canvas to be ready, similar to selection tests
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should set multiple nested properties correctly via props method", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const boxes = scene.meshes.filter(mesh => mesh.id.includes('box13'));
      return {
        boxCount: boxes.length,
        values: boxes.slice(0, 5).map(box => ({
          position: { x: box.position.x, y: box.position.y, z: box.position.z },
          scaling: { x: box.scaling.x, y: box.scaling.y, z: box.scaling.z },
          rotation: { x: box.rotation.x, y: box.rotation.y, z: box.rotation.z },
          material: box.material ? {
            r: box.material.diffuseColor?.r,
            g: box.material.diffuseColor?.g,
            b: box.material.diffuseColor?.b
          } : null
        }))
      };
    });

    softExpect(result.boxCount, "box13 count").toBeGreaterThan(0);
    
    result.values.forEach((val, index) => {
      softExpect(val.position.x, `box13 ${index} position.x`).toBe(10);
      softExpect(val.position.y, `box13 ${index} position.y`).toBe(11);
      softExpect(val.position.z, `box13 ${index} position.z`).toBe(12);
      
      softExpect(val.scaling.x, `box13 ${index} scaling.x`).toBe(0.6);
      softExpect(val.scaling.y, `box13 ${index} scaling.y`).toBe(1.6);
      softExpect(val.scaling.z, `box13 ${index} scaling.z`).toBe(2.6);
      
      softExpect(val.rotation.x, `box13 ${index} rotation.x`).toBe(3);
      softExpect(val.rotation.y, `box13 ${index} rotation.y`).toBe(6);
      softExpect(val.rotation.z, `box13 ${index} rotation.z`).toBe(7);
      
      if (val.material) {
        softExpect(val.material.r, `box13 ${index} red component`).toBe(1);
        softExpect(val.material.g, `box13 ${index} green component`).toBe(1);
        softExpect(val.material.b, `box13 ${index} blue component`).toBe(1);
      }
    });
  });
});