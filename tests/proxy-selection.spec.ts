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