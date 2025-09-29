// Test file to verify that dynamic properties are correctly typed
import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';

// This test should show proper IntelliSense for dynamic properties
export function testIntelliSense() {
  const engine = new BABYLON.NullEngine();
  const scene = new BABYLON.Scene(engine);
  
  // Test 1: Top-level bind function should return DynamicSelection
  const spheres1 = anu.bind('sphere', {diameter: 1}, [{id: 1}], scene);
  
  // Test 2: Selection from selectName should return DynamicSelection
  const cot = anu.create('cot', 'test-cot', {}, scene);
  const chart = anu.selectName('test-cot', scene);
  
  // Test 3: Chain operations should maintain DynamicSelection type
  const spheres2 = chart.bind('sphere', {diameter: 1}, [{id: 1}]);
  
  // Test 4: Dynamic properties should be available (these should show in IntelliSense)
  // Position functions (these are custom Anu functions)
  spheres1.positionX(1);
  spheres2.positionY(2);
  
  // Test 5: Babylon.js properties should be available dynamically
  // These should work because of the proxy and DynamicProperties interface
  console.log('Visibility check:', typeof spheres1.isVisible);
  console.log('Material check:', typeof spheres2.material);
  
  // Test 6: Method chaining should preserve types
  const result = spheres1
    .positionX(1)
    .positionY(2)
    .material(() => new BABYLON.StandardMaterial('test', scene));
  
  // The result should still have dynamic properties
  console.log('Result type check:', typeof result.isVisible);
  
  engine.dispose();
  
  return {
    spheres1,
    spheres2, 
    chart,
    result
  };
}

// Export the types for inspection
export type Spheres1Type = ReturnType<typeof anu.bind>;
export type Spheres2Type = ReturnType<typeof anu.selectName>;
