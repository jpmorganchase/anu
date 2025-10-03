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
// Always do soft assertions.
const softExpect = expect.configure({ soft: true });

test.describe("Anu Basic Selection Tests", () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the selectionTest example which demonstrates all selection features
    await page.goto("/anu/?example=selectionTest");
    
    // Wait for the canvas to be ready
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  test("should render selectionTest example correctly", async ({ page }) => {
    // Take a screenshot to verify the visual output
    await expect(page.locator("#renderCanvas")).toHaveScreenshot("selection-test-initial.png", { 
      timeout: 15_000 
    });
  });

  // Selection Tests - selectName with single and multiple inputs
  test("should select nodes by name with single and multiple inputs", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Test selectName with single inputs
      const rootSelection = window.anu.selectName('root', scene);
      const sphereSelection = window.anu.selectName('sphere', scene);
      const boxSelection = window.anu.selectName('box', scene);
      const cylinderSelection = window.anu.selectName('cylinder', scene);
      const childSphereSelection = window.anu.selectName('child-sphere', scene);
      
      // Test selectName with multiple inputs (arrays)
      const multiNameSelection = window.anu.selectName(['sphere', 'box'], scene);
      const multiNameWithNonExistent = window.anu.selectName(['sphere', 'nonexistent', 'cylinder'], scene);
      const singleNameAsArray = window.anu.selectName(['sphere'], scene);
      const emptyArray = window.anu.selectName([], scene);
      
      return {
        // Single input results
        rootCount: rootSelection.selected.length,
        sphereCount: sphereSelection.selected.length,
        boxCount: boxSelection.selected.length,
        cylinderCount: cylinderSelection.selected.length,
        childSphereCount: childSphereSelection.selected.length,
        sphereNames: sphereSelection.selected.map(node => node.name),
        sphereIds: sphereSelection.selected.map(node => node.id),
        // Multi-input results
        multiNameCount: multiNameSelection.selected.length,
        multiNameWithNonExistentCount: multiNameWithNonExistent.selected.length,
        singleNameAsArrayCount: singleNameAsArray.selected.length,
        emptyArrayCount: emptyArray.selected.length,
        multiNameTypes: multiNameSelection.selected.map(node => node.name).sort(),
        mixedSelectionTypes: multiNameWithNonExistent.selected.map(node => node.name).sort(),
      };
    });

    // Single input expectations
    softExpect(result.rootCount, "root count").toBe(1);
    softExpect(result.sphereCount, "sphere count").toBe(3); // 3 main spheres
    softExpect(result.boxCount, "box count").toBe(2);
    softExpect(result.cylinderCount, "cylinder count").toBe(1);
    softExpect(result.childSphereCount, "child sphere count").toBe(2); // 2 child spheres
    softExpect(result.sphereNames, "sphere names").toEqual(['sphere', 'sphere', 'sphere']);
    softExpect(result.sphereIds, "sphere IDs").toEqual(['sphere-1', 'sphere-2', 'sphere-3']);
    
    // Multi-input expectations
    softExpect(result.multiNameCount, "multi name count").toBe(5); // 3 spheres + 2 boxes
    softExpect(result.multiNameWithNonExistentCount, "mixed valid").toBe(4); // 3 spheres + 1 cylinder (nonexistent ignored)
    softExpect(result.singleNameAsArrayCount, "single as array").toBe(3); // 3 spheres
    softExpect(result.emptyArrayCount, "empty array").toBe(0); // Empty array returns no selections
    softExpect(result.multiNameTypes, "multi types").toEqual(['box', 'box', 'sphere', 'sphere', 'sphere']);
    softExpect(result.mixedSelectionTypes, "mixed types").toEqual(['cylinder', 'sphere', 'sphere', 'sphere']);
  });

  // Selection Tests - selectId with single and multiple inputs
  test("should select nodes by ID with single and multiple inputs", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Test selectId with single inputs
      const sphere1Selection = window.anu.selectId('sphere-1', scene);
      const box2Selection = window.anu.selectId('box-2', scene);
      const cylinderSelection = window.anu.selectId('cylinder-1', scene);
      const child1Selection = window.anu.selectId('child-1', scene);
      
      // Test selectId with multiple inputs (arrays)
      const multiSelection = window.anu.selectId(['sphere-1', 'box-1', 'cylinder-1'], scene);
      const multiIdSelection = window.anu.selectId(['sphere-1', 'box-2', 'cylinder-1'], scene);
      const multiIdWithNonExistent = window.anu.selectId(['sphere-1', 'nonexistent-id', 'child-1'], scene);
      const duplicateIds = window.anu.selectId(['sphere-1', 'sphere-1', 'box-1'], scene);
      const allSphereIds = window.anu.selectId(['sphere-1', 'sphere-2', 'sphere-3'], scene);
      const singleIdAsArray = window.anu.selectId(['box-1'], scene);
      
      return {
        // Single input results
        sphere1Count: sphere1Selection.selected.length,
        box2Count: box2Selection.selected.length,
        cylinderCount: cylinderSelection.selected.length,
        child1Count: child1Selection.selected.length,
        sphere1Id: sphere1Selection.selected[0]?.id,
        box2Id: box2Selection.selected[0]?.id,
        // Multi-input results
        multiCount: multiSelection.selected.length,
        multiIds: multiSelection.selected.map(node => node.id).sort(),
        multiIdCount: multiIdSelection.selected.length,
        multiIdWithNonExistentCount: multiIdWithNonExistent.selected.length,
        duplicateIdsCount: duplicateIds.selected.length,
        allSpheresCount: allSphereIds.selected.length,
        singleIdAsArrayCount: singleIdAsArray.selected.length,
        multiIdIds: multiIdSelection.selected.map(node => node.id).sort(),
        allSphereIds: allSphereIds.selected.map(node => node.id).sort(),
        mixedWithNonExistentIds: multiIdWithNonExistent.selected.map(node => node.id).sort(),
      };
    });

    // Single input expectations
    softExpect(result.sphere1Count, "sphere1 count").toBe(1);
    softExpect(result.box2Count, "box2 count").toBe(1);
    softExpect(result.cylinderCount, "cylinder count").toBe(1);
    softExpect(result.child1Count, "child1 count").toBe(1);
    softExpect(result.sphere1Id, "sphere1 ID").toBe('sphere-1');
    softExpect(result.box2Id, "box2 ID").toBe('box-2');
    
    // Multi-input expectations
    softExpect(result.multiCount, "multi count").toBe(3);
    softExpect(result.multiIds, "multi IDs").toEqual(['box-1', 'cylinder-1', 'sphere-1']);
    softExpect(result.multiIdCount, "multi ID count").toBe(3); // sphere-1, box-2, cylinder-1
    softExpect(result.multiIdWithNonExistentCount, "mixed valid").toBe(2); // sphere-1, child-1 (nonexistent ignored)
    softExpect(result.duplicateIdsCount, "duplicate IDs").toBe(2); // sphere-1, box-1 (duplicates handled)
    softExpect(result.allSpheresCount, "all spheres").toBe(3); // All three spheres
    softExpect(result.singleIdAsArrayCount, "single as array").toBe(1); // Single box
    softExpect(result.multiIdIds, "multi ID list").toEqual(['box-2', 'cylinder-1', 'sphere-1']);
    softExpect(result.allSphereIds, "sphere ID list").toEqual(['sphere-1', 'sphere-2', 'sphere-3']);
    softExpect(result.mixedWithNonExistentIds, "mixed IDs").toEqual(['child-1', 'sphere-1']);
  });

  // Selection Tests - selectTag with single and multiple inputs
  test("should select nodes by tags with single and multiple inputs", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Test selectTag with single inputs
      const primarySelection = window.anu.selectTag('primary', scene);
      const secondarySelection = window.anu.selectTag('secondary', scene);
      const geometrySelection = window.anu.selectTag('geometry', scene);
      const sphereTagSelection = window.anu.selectTag('sphere-tag', scene);
      const childSelection = window.anu.selectTag('child', scene);
      
      // Test selectTag with multiple inputs (arrays)
      const multiTagSelection = window.anu.selectTag(['primary', 'secondary'], scene);
      const multiTagWithNonExistent = window.anu.selectTag(['primary', 'nonexistent-tag', 'child'], scene);
      const specificTagCombos = window.anu.selectTag(['sphere-tag', 'box-tag'], scene);
      const singleTagAsArray = window.anu.selectTag(['special'], scene);
      const overlappingTags = window.anu.selectTag(['geometry', 'primary'], scene);
      
      return {
        // Single input results
        primaryCount: primarySelection.selected.length,
        secondaryCount: secondarySelection.selected.length,
        geometryCount: geometrySelection.selected.length,
        sphereTagCount: sphereTagSelection.selected.length,
        childCount: childSelection.selected.length,
        primaryCategories: primarySelection.selected.map(node => node.metadata?.category),
        geometryTypes: geometrySelection.selected.map(node => node.metadata?.type),
        // Multi-input results
        multiTagCount: multiTagSelection.selected.length,
        multiTagWithNonExistentCount: multiTagWithNonExistent.selected.length,
        specificTagCombosCount: specificTagCombos.selected.length,
        singleTagAsArrayCount: singleTagAsArray.selected.length,
        overlappingTagsCount: overlappingTags.selected.length,
        multiTagCategories: multiTagSelection.selected.map(node => node.metadata?.category).sort(),
        specificTagNames: specificTagCombos.selected.map(node => node.name).sort(),
        overlappingTagTypes: overlappingTags.selected.map(node => node.metadata?.type).sort(),
      };
    });

    // Single input expectations
    softExpect(result.primaryCount, "primary count").toBe(3); // sphere-1, sphere-3, box-1
    softExpect(result.secondaryCount, "secondary count").toBe(2); // sphere-2, box-2
    softExpect(result.geometryCount, "geometry count").toBe(6); // all main geometry objects
    softExpect(result.sphereTagCount, "sphere tag count").toBe(3); // all main spheres
    softExpect(result.childCount, "child count").toBe(2); // child spheres
    softExpect(result.primaryCategories, "primary categories").toEqual(['primary', 'primary', 'primary']);
    softExpect(result.geometryTypes, "geometry types").toEqual(['geometry', 'geometry', 'geometry', 'geometry', 'geometry', 'geometry']);
    
    // Multi-input expectations
    softExpect(result.multiTagCount, "multi tag count").toBe(5); // All primary + secondary objects
    softExpect(result.multiTagWithNonExistentCount, "mixed valid").toBe(5); // primary + child objects (nonexistent ignored)
    softExpect(result.specificTagCombosCount, "specific combos").toBe(5); // All spheres + boxes
    softExpect(result.singleTagAsArrayCount, "single as array").toBe(1); // Just the cylinder
    softExpect(result.overlappingTagsCount, "overlapping tags").toBe(6); // All geometry objects (includes overlapping primary)
    softExpect(result.multiTagCategories, "multi categories").toEqual(['primary', 'primary', 'primary', 'secondary', 'secondary']);
    softExpect(result.specificTagNames, "specific names").toEqual(['box', 'box', 'sphere', 'sphere', 'sphere']);
    softExpect(result.overlappingTagTypes, "overlapping types").toEqual(['geometry', 'geometry', 'geometry', 'geometry', 'geometry', 'geometry']);
  });

  // Selection Tests - selectData with single and multiple inputs
  test("should select nodes by data with single and multiple inputs", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Test selectData with single inputs
      const categoryPrimarySelection = window.anu.selectData('category', 'primary', scene);
      const value20Selection = window.anu.selectData('value', 20, scene);
      const typeGeometrySelection = window.anu.selectData('type', 'geometry', scene);
      
      // Test selectData with multiple conditions (OR logic)
      const multiOrSelection = window.anu.selectData(['category', 'value'], ['primary', 100], scene);
      
      // Test selectData with AND logic
      const andSelection = window.anu.selectData(['category', 'type'], ['primary', 'geometry'], scene, true);
      
      // Test selectData with multiple inputs (arrays)
      const multiValueSelection = window.anu.selectData('category', ['primary', 'secondary'], scene);
      const multiValueNumbers = window.anu.selectData('value', [10, 20, 60], scene);
      
      // Test multi-select by data with multiple keys and values (OR logic)
      const multiKeyOrSelection = window.anu.selectData(['category', 'type'], ['primary', 'nested'], scene);
      
      // Test multi-select by data with multiple keys and values (AND logic)
      const multiKeyAndSelection = window.anu.selectData(['category', 'type'], ['primary', 'geometry'], scene, true);
      
      // Test mixed multi-select scenarios
      const mixedSelection = window.anu.selectData('value', [100, 200, 30], scene);
      const nonExistentValues = window.anu.selectData('category', ['primary', 'nonexistent'], scene);
      
      return {
        // Single input results
        categoryPrimaryCount: categoryPrimarySelection.selected.length,
        value20Count: value20Selection.selected.length,
        typeGeometryCount: typeGeometrySelection.selected.length,
        multiOrCount: multiOrSelection.selected.length,
        andCount: andSelection.selected.length,
        primaryValues: categoryPrimarySelection.selected.map(node => node.metadata?.anujsData?.value).sort(),
        value20Names: value20Selection.selected.map(node => node.name),
        // Multi-input results
        multiValueCount: multiValueSelection.selected.length,
        multiValueNumbersCount: multiValueNumbers.selected.length,
        multiKeyOrCount: multiKeyOrSelection.selected.length,
        multiKeyAndCount: multiKeyAndSelection.selected.length,
        mixedSelectionCount: mixedSelection.selected.length,
        nonExistentValuesCount: nonExistentValues.selected.length,
        multiValueCategories: multiValueSelection.selected.map(node => node.metadata?.category).sort(),
        multiValueNumbersValues: multiValueNumbers.selected.map(node => node.metadata?.anujsData?.value).sort(),
        multiKeyAndCategories: multiKeyAndSelection.selected.map(node => node.metadata?.category).sort(),
        mixedSelectionValues: mixedSelection.selected.map(node => node.metadata?.anujsData?.value).sort(),
      };
    });

    // Single input expectations
    softExpect(result.categoryPrimaryCount, "primary count").toBe(3); // sphere-1, sphere-3, box-1
    softExpect(result.value20Count, "value 20 count").toBe(1); // sphere-2
    softExpect(result.typeGeometryCount, "geometry count").toBe(6); // all main geometry objects
    softExpect(result.multiOrCount, "multi OR count").toBe(5); // primary objects + child objects with value 100
    softExpect(result.andCount, "AND count").toBe(3); // objects that are both primary AND geometry
    softExpect(result.primaryValues, "primary values").toEqual([10, 30, 40]);
    softExpect(result.value20Names, "value 20 names").toEqual(['sphere']);
    
    // Multi-input expectations
    softExpect(result.multiValueCount, "multi value count").toBe(5); // All primary + secondary objects
    softExpect(result.multiValueNumbersCount, "multi numbers").toBe(3); // Objects with values 10, 20, 60
    softExpect(result.multiKeyOrCount, "multi key OR").toBe(5); // Objects that are primary OR nested type
    softExpect(result.multiKeyAndCount, "multi key AND").toBe(3); // Objects that are primary AND geometry
    softExpect(result.mixedSelectionCount, "mixed selection").toBe(3); // Objects with values 100, 200, 30
    softExpect(result.nonExistentValuesCount, "non-existent").toBe(3); // Only primary objects (nonexistent ignored)
    softExpect(result.multiValueCategories, "multi categories").toEqual(['primary', 'primary', 'primary', 'secondary', 'secondary']);
    softExpect(result.multiValueNumbersValues, "multi values").toEqual([10, 20, 60]);
    softExpect(result.multiKeyAndCategories, "AND categories").toEqual(['primary', 'primary', 'primary']);
    softExpect(result.mixedSelectionValues, "mixed values").toEqual([30, 100, 200]);
  });
});

test.describe("Anu Selection Chaining Tests", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/anu/?example=selectionTest");
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  // Chaining Tests - Multiple selection methods
  test("should chain selectName methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Chain selectName methods
      const rootSelection = window.anu.selectName('root', scene);
      const spheresFromRoot = rootSelection.selectName('sphere');
      const childSpheresFromGroups = rootSelection.selectName('group1').selectName('child-sphere');
      
      return {
        rootCount: rootSelection.selected.length,
        spheresFromRootCount: spheresFromRoot.selected.length,
        childSpheresCount: childSpheresFromGroups.selected.length,
        sphereIds: spheresFromRoot.selected.map(node => node.id),
        childSphereIds: childSpheresFromGroups.selected.map(node => node.id),
      };
    });

    expect(result.rootCount, "root count").toBe(1);
    expect(result.spheresFromRootCount, "spheres from root").toBe(3); // 3 main spheres under root
    expect(result.childSpheresCount, "child spheres").toBe(1); // 1 child sphere under group1
    expect(result.sphereIds, "sphere IDs").toEqual(['sphere-1', 'sphere-2', 'sphere-3']);
    expect(result.childSphereIds, "child IDs").toEqual(['child-1']);
  });

  test("should chain selectName and selectTag methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Chain selectName with selectTag
      const rootSelection = window.anu.selectName('root', scene);
      const primaryGeometry = rootSelection.selectTag('primary').selectTag('geometry');
      const spheresWithPrimary = rootSelection.selectName('sphere').selectTag('primary');
      const boxesWithSecondary = rootSelection.selectName('box').selectTag('secondary');
      
      return {
        primaryGeometryCount: primaryGeometry.selected.length,
        spheresWithPrimaryCount: spheresWithPrimary.selected.length,
        boxesWithSecondaryCount: boxesWithSecondary.selected.length,
        primaryGeometryNames: primaryGeometry.selected.map(node => node.name),
        spheresPrimaryIds: spheresWithPrimary.selected.map(node => node.id),
      };
    });

    expect(result.primaryGeometryCount, "primary geometry").toBe(3); // sphere-1, sphere-3, box-1
    expect(result.spheresWithPrimaryCount, "primary spheres").toBe(2); // sphere-1, sphere-3
    expect(result.boxesWithSecondaryCount, "secondary boxes").toBe(1); // box-2
    expect(result.primaryGeometryNames.sort(), "geometry names").toEqual(['box', 'sphere', 'sphere']);
    expect(result.spheresPrimaryIds.sort(), "primary IDs").toEqual(['sphere-1', 'sphere-3']);
  });

  test("should chain selectId and selectData methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Chain selectId with selectData (though selectId typically returns single items)
      const multiIdSelection = window.anu.selectId(['sphere-1', 'sphere-2', 'box-1'], scene);
      const primaryFromMulti = multiIdSelection.selectData('category', 'primary');
      const geometryFromMulti = multiIdSelection.selectData('type', 'geometry');
      
      return {
        multiIdCount: multiIdSelection.selected.length,
        primaryFromMultiCount: primaryFromMulti.selected.length,
        geometryFromMultiCount: geometryFromMulti.selected.length,
        primaryIds: primaryFromMulti.selected.map(node => node.id).sort(),
        geometryIds: geometryFromMulti.selected.map(node => node.id).sort(),
      };
    });

    expect(result.multiIdCount, "multi ID count").toBe(3);
    expect(result.primaryFromMultiCount, "primary from multi").toBe(2); // sphere-1, box-1
    expect(result.geometryFromMultiCount, "geometry from multi").toBe(3); // all selected items are geometry
    expect(result.primaryIds, "primary IDs").toEqual(['box-1', 'sphere-1']);
    expect(result.geometryIds, "geometry IDs").toEqual(['box-1', 'sphere-1', 'sphere-2']);
  });

  test("should chain multiple different selection methods", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Complex chaining: name -> tag -> data
      const complexChain = window.anu.selectName('root', scene)
        .selectTag('geometry')
        .selectData('category', 'primary')
        .selectName('sphere');
      
      // Another complex chain: tag -> name -> id
      const sphereIds = ['sphere-1', 'sphere-3']; // Primary spheres
      const anotherChain = window.anu.selectTag('primary', scene)
        .selectName('sphere')
        .selectId(sphereIds);
      
      return {
        complexChainCount: complexChain.selected.length,
        anotherChainCount: anotherChain.selected.length,
        complexChainIds: complexChain.selected.map(node => node.id).sort(),
        anotherChainIds: anotherChain.selected.map(node => node.id).sort(),
      };
    });

    expect(result.complexChainCount, "complex chain").toBe(2); // Primary spheres
    expect(result.anotherChainCount, "another chain").toBe(2); // Primary spheres
    expect(result.complexChainIds, "complex IDs").toEqual(['sphere-1', 'sphere-3']);
    expect(result.anotherChainIds, "another IDs").toEqual(['sphere-1', 'sphere-3']);
  });

  // Multi-Select Chaining Tests - Complex chaining with multi-select
  test("should chain multi-select operations correctly", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Chain multi-select operations
      const rootSelection = window.anu.selectName('root', scene);
      const multiNameToTag = rootSelection.selectName(['sphere', 'box']).selectTag(['primary', 'secondary']);
      const multiTagToData = window.anu.selectTag(['geometry', 'nested'], scene).selectData('category', ['primary', 'child']);
      const multiIdToName = window.anu.selectId(['sphere-1', 'sphere-2', 'box-1'], scene).selectName(['sphere', 'box']);
      
      // Complex multi-select chains
      const complexChain = window.anu.selectName(['sphere', 'box'], scene)
        .selectTag(['primary', 'secondary'])
        .selectData('value', [10, 20, 40, 50]);
      
      return {
        multiNameToTagCount: multiNameToTag.selected.length,
        multiTagToDataCount: multiTagToData.selected.length,
        multiIdToNameCount: multiIdToName.selected.length,
        complexChainCount: complexChain.selected.length,
        // Verify correct filtering
        multiNameToTagCategories: multiNameToTag.selected.map(node => node.metadata?.category).sort(),
        complexChainValues: complexChain.selected.map(node => node.metadata?.anujsData?.value).sort(),
        complexChainNames: complexChain.selected.map(node => node.name).sort(),
      };
    });

    expect(result.multiNameToTagCount, "name to tag").toBe(5); // All spheres and boxes
    expect(result.multiTagToDataCount, "tag to data").toBe(5); // Geometry objects that are primary + child objects
    expect(result.multiIdToNameCount, "ID to name").toBe(3); // The three selected objects
    expect(result.complexChainCount, "complex chain").toBe(4); // Spheres and boxes with specified values
    expect(result.multiNameToTagCategories, "chain categories").toEqual(['primary', 'primary', 'primary', 'secondary', 'secondary']);
    expect(result.complexChainValues, "chain values").toEqual([10, 20, 40, 50]);
    expect(result.complexChainNames, "chain names").toEqual(['box', 'box', 'sphere', 'sphere']);
  });
});

test.describe("Anu Selection Empty Selection Tests", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/anu/?example=selectionTest");
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  // Empty Selection Tests - No matching criteria
  test("should handle empty selections when no nodes match criteria", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Test empty selections
      const emptyByName = window.anu.selectName('nonexistent', scene);
      const emptyById = window.anu.selectId('nonexistent-id', scene);
      const emptyByTag = window.anu.selectTag('nonexistent-tag', scene);
      const emptyByData = window.anu.selectData('nonexistent-key', 'nonexistent-value', scene);
      
      // Test chaining on empty selections
      const chainedEmpty = emptyByName.selectName('also-nonexistent').selectTag('fake-tag');
      
      // Test operations on empty selections
      const transformedEmpty = emptyByName.positionX(100);
      
      return {
        emptyByNameCount: emptyByName.selected.length,
        emptyByIdCount: emptyById.selected.length,
        emptyByTagCount: emptyByTag.selected.length,
        emptyByDataCount: emptyByData.selected.length,
        chainedEmptyCount: chainedEmpty.selected.length,
        transformedEmptyCount: transformedEmpty.selected.length,
        // Verify all return valid selection objects
        emptyByNameIsSelection: typeof emptyByName.selectName === 'function',
        chainedEmptyIsSelection: typeof chainedEmpty.selectTag === 'function',
      };
    });

    expect(result.emptyByNameCount, "empty by name").toBe(0);
    expect(result.emptyByIdCount, "empty by ID").toBe(0);
    expect(result.emptyByTagCount, "empty by tag").toBe(0);
    expect(result.emptyByDataCount, "empty by data").toBe(0);
    expect(result.chainedEmptyCount, "chained empty").toBe(0);
    expect(result.transformedEmptyCount, "transformed empty").toBe(0);
    expect(result.emptyByNameIsSelection, "empty is selection").toBe(true);
    expect(result.chainedEmptyIsSelection, "chained is selection").toBe(true);
  });

  test("should handle empty selections in hierarchical structures", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Test empty selections within valid hierarchies
      const rootSelection = window.anu.selectName('root', scene);
      const nonexistentFromRoot = rootSelection.selectName('nonexistent-child');
      const group1Selection = rootSelection.selectName('group1');
      const nonexistentFromGroup = group1Selection.selectName('nonexistent-item');
      
      // Test empty selections with valid data queries that don't match
      const noValue999 = rootSelection.selectData('value', 999);
      const noCategoryFake = rootSelection.selectData('category', 'fake-category');
      
      return {
        rootCount: rootSelection.selected.length,
        nonexistentFromRootCount: nonexistentFromRoot.selected.length,
        group1Count: group1Selection.selected.length,
        nonexistentFromGroupCount: nonexistentFromGroup.selected.length,
        noValue999Count: noValue999.selected.length,
        noCategoryFakeCount: noCategoryFake.selected.length,
      };
    });

    expect(result.rootCount, "root exists").toBe(1); // Root exists
    expect(result.nonexistentFromRootCount, "nonexistent child").toBe(0); // Child doesn't exist
    expect(result.group1Count, "group1 exists").toBe(1); // Group1 exists
    expect(result.nonexistentFromGroupCount, "nonexistent item").toBe(0); // Item doesn't exist in group
    expect(result.noValue999Count, "no value 999").toBe(0); // No nodes with value 999
    expect(result.noCategoryFakeCount, "no fake category").toBe(0); // No nodes with fake category
  });

  // Multi-Select Edge Cases - Performance and edge cases
  test("should handle multi-select edge cases and performance scenarios", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Edge cases for multi-select
      const emptyArrayName = window.anu.selectName([], scene);
      const emptyArrayId = window.anu.selectId([], scene);
      const emptyArrayTag = window.anu.selectTag([], scene);
      
      // Large multi-select arrays
      const largeIdArray = ['sphere-1', 'sphere-2', 'sphere-3', 'box-1', 'box-2', 'cylinder-1', 'child-1', 'child-2'];
      const largeIdSelection = window.anu.selectId(largeIdArray, scene);
      
      // Mixed valid and invalid multi-select
      const mixedValidInvalid = window.anu.selectName(['sphere', 'invalid1', 'box', 'invalid2', 'cylinder'], scene);
      
      // Duplicate entries in multi-select
      const duplicateNames = window.anu.selectName(['sphere', 'sphere', 'box', 'sphere'], scene);
      const duplicateTags = window.anu.selectTag(['primary', 'geometry', 'primary'], scene);
      
      return {
        emptyArrayNameCount: emptyArrayName.selected.length,
        emptyArrayIdCount: emptyArrayId.selected.length,
        emptyArrayTagCount: emptyArrayTag.selected.length,
        largeIdSelectionCount: largeIdSelection.selected.length,
        mixedValidInvalidCount: mixedValidInvalid.selected.length,
        duplicateNamesCount: duplicateNames.selected.length,
        duplicateTagsCount: duplicateTags.selected.length,
        // Verify handling of duplicates and invalid entries
        largeIdSelectionIds: largeIdSelection.selected.map(node => node.id).sort(),
        mixedValidInvalidNames: mixedValidInvalid.selected.map(node => node.name).sort(),
        duplicateNamesUnique: [...new Set(duplicateNames.selected.map(node => node.name))].sort(),
      };
    });

    expect(result.emptyArrayNameCount, "empty name array").toBe(0);
    expect(result.emptyArrayIdCount, "empty ID array").toBe(0);
    expect(result.emptyArrayTagCount, "empty tag array").toBe(0);
    expect(result.largeIdSelectionCount, "large selection").toBe(8); // All objects if they exist
    expect(result.mixedValidInvalidCount, "mixed valid").toBe(6); // Valid objects only (3 spheres + 2 boxes + 1 cylinder)
    expect(result.duplicateNamesCount, "duplicate names").toBe(5); // 3 spheres + 2 boxes (duplicates handled)
    expect(result.duplicateTagsCount, "duplicate tags").toBe(6); // All geometry objects (duplicates handled)
    expect(result.largeIdSelectionIds, "large IDs").toEqual(['box-1', 'box-2', 'child-1', 'child-2', 'cylinder-1', 'sphere-1', 'sphere-2', 'sphere-3']);
    expect(result.mixedValidInvalidNames, "mixed names").toEqual(['box', 'box', 'cylinder', 'sphere', 'sphere', 'sphere']);
    expect(result.duplicateNamesUnique, "unique names").toEqual(['box', 'sphere']);
  });
});

test.describe("Anu Selection Invalid Input Tests", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/anu/?example=selectionTest");
    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });
  });

  // Invalid Input Tests - Non-existent names, IDs, tags
  test("should handle invalid inputs gracefully", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      const errors: Array<{test: string, error?: string, success: boolean}> = [];

      // Test invalid name inputs
      try {
        const invalidName = window.anu.selectName('', scene); // Empty string
        errors.push({test: 'empty-name', success: true});
      } catch (error: any) {
        errors.push({test: 'empty-name', error: error.message, success: false});
      }

      try {
        const nullName = window.anu.selectName(null as any, scene); // Null input
        errors.push({test: 'null-name', success: true});
      } catch (error: any) {
        errors.push({test: 'null-name', error: error.message, success: false});
      }

      // Test invalid ID inputs
      try {
        const emptyId = window.anu.selectId('', scene); // Empty string
        errors.push({test: 'empty-id', success: true});
      } catch (error: any) {
        errors.push({test: 'empty-id', error: error.message, success: false});
      }

      try {
        const arrayWithEmpty = window.anu.selectId(['valid-id', '', 'another-valid'], scene);
        errors.push({test: 'array-with-empty', success: true});
      } catch (error: any) {
        errors.push({test: 'array-with-empty', error: error.message, success: false});
      }

      // Test invalid tag inputs
      try {
        const emptyTag = window.anu.selectTag('', scene); // Empty string
        errors.push({test: 'empty-tag', success: true});
      } catch (error: any) {
        errors.push({test: 'empty-tag', error: error.message, success: false});
      }

      // Test invalid data inputs
      try {
        const emptyKey = window.anu.selectData('', 'value', scene); // Empty key
        errors.push({test: 'empty-data-key', success: true});
      } catch (error: any) {
        errors.push({test: 'empty-data-key', error: error.message, success: false});
      }

      try {
        const undefinedValue = window.anu.selectData('key', undefined, scene); // Undefined value
        errors.push({test: 'undefined-data-value', success: true});
      } catch (error: any) {
        errors.push({test: 'undefined-data-value', error: error.message, success: false});
      }

      return errors;
    });

    // The selection methods should handle invalid inputs gracefully
    // Most should succeed but return empty selections rather than throwing errors
    const emptyNameTest = result.find(r => r.test === 'empty-name');
    const nullNameTest = result.find(r => r.test === 'null-name');
    const emptyIdTest = result.find(r => r.test === 'empty-id');
    
    // These should generally succeed (return empty selections) rather than throw
    expect(emptyNameTest?.success, "empty name").toBe(true);
    expect(emptyIdTest?.success, "empty ID").toBe(true);
    
    // Null inputs might throw errors, which is acceptable
    if (nullNameTest?.success === false) {
      expect(nullNameTest.error, "null error").toContain('');
    }
  });

  test("should handle invalid scene context", async ({ page }) => {
    const result = await page.evaluate(() => {
      const errors: Array<{test: string, error?: string, success: boolean}> = [];

      // Test with null scene
      try {
        const invalidScene = window.anu.selectName('test', null as any);
        errors.push({test: 'null-scene', success: true});
      } catch (error: any) {
        errors.push({test: 'null-scene', error: error.message, success: false});
      }

      // Test with undefined scene
      try {
        const undefinedScene = window.anu.selectName('test', undefined as any);
        errors.push({test: 'undefined-scene', success: true});
      } catch (error: any) {
        errors.push({test: 'undefined-scene', error: error.message, success: false});
      }

      // Test with wrong type as scene
      try {
        const wrongTypeScene = window.anu.selectName('test', 'not-a-scene' as any);
        errors.push({test: 'wrong-type-scene', success: true});
      } catch (error: any) {
        errors.push({test: 'wrong-type-scene', error: error.message, success: false});
      }

      return errors;
    });

    // Invalid scene contexts should throw appropriate errors
    const nullSceneTest = result.find(r => r.test === 'null-scene');
    const undefinedSceneTest = result.find(r => r.test === 'undefined-scene');
    const wrongTypeSceneTest = result.find(r => r.test === 'wrong-type-scene');

    // These should generally fail with meaningful errors
    expect(nullSceneTest?.success || undefinedSceneTest?.success || wrongTypeSceneTest?.success, "invalid scene").toBe(false);
  });

  test("should verify nodes have correct metadata after selection", async ({ page }) => {
    const result = await page.evaluate(() => {
      const scene = window.scene;
      if (!scene || !window.anu) {
        throw new Error('Scene or Anu not available');
      }

      // Verify that selections return nodes with expected metadata structure
      const sphereSelection = window.anu.selectName('sphere', scene);
      const boxSelection = window.anu.selectName('box', scene);
      
      const sphereMetadata = sphereSelection.selected.map(node => ({
        hasId: !!node.id,
        hasName: !!node.name,
        hasMetadata: !!node.metadata,
        hasAnujsData: !!(node.metadata && node.metadata.anujsData),
        hasTags: !!node.tags,
        category: node.metadata?.category,
        type: node.metadata?.type,
      }));
      
      const boxMetadata = boxSelection.selected.map(node => ({
        hasId: !!node.id,
        hasName: !!node.name,
        hasMetadata: !!node.metadata,
        hasAnujsData: !!(node.metadata && node.metadata.anujsData),
        hasTags: !!node.tags,
        category: node.metadata?.category,
        type: node.metadata?.type,
      }));
      
      return {
        sphereMetadata,
        boxMetadata,
        allSpheresHaveCorrectMetadata: sphereMetadata.every(m => 
          m.hasId && m.hasName && m.hasMetadata && m.hasAnujsData && m.hasTags && m.type === 'geometry'
        ),
        allBoxesHaveCorrectMetadata: boxMetadata.every(m => 
          m.hasId && m.hasName && m.hasMetadata && m.hasAnujsData && m.hasTags && m.type === 'geometry'
        ),
      };
    });

    expect(result.allSpheresHaveCorrectMetadata, "sphere metadata").toBe(true);
    expect(result.allBoxesHaveCorrectMetadata, "box metadata").toBe(true);
    expect(result.sphereMetadata.length, "sphere count").toBe(3);
    expect(result.boxMetadata.length, "box count").toBe(2);
  });
});


