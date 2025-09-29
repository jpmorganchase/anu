// Quick test to verify dynamic properties work
import * as anu from './src/index.js';
import * as BABYLON from '@babylonjs/core';

// Test function to verify dynamic properties
export function testDynamicProperties() {
  const engine = new BABYLON.NullEngine();
  const scene = new BABYLON.Scene(engine);
  
  // Create a selection
  const spheres = anu.bind('sphere', {diameter: 1}, [{id: 1}, {id: 2}], scene);
  
  // Test that dynamic properties should be available
  console.log('Spheres type:', typeof spheres);
  console.log('Spheres has position method:', typeof spheres.position === 'function');
  
  // Try to access a Babylon.js property dynamically
  if (typeof spheres.isVisible === 'function') {
    console.log('Dynamic property isVisible is available!');
    console.log('IsVisible values:', spheres.isVisible());
  } else {
    console.log('Dynamic property isVisible is NOT available');
  }
  
  engine.dispose();
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDynamicProperties();
}
