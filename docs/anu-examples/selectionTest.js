// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';

/**
 * Selection Test Example - Demonstrates all Anu selection features for testing
 */
export function selectionTest(engine) {
  // Create scene
  const scene = new BABYLON.Scene(engine);
  
  // Add lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  
  // Add camera
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(5, 5, -5);
  camera.attachControl(true);

  // Create test data
  const testData = [
    { id: 'item-1', type: 'A', value: 10, color: 'red' },
    { id: 'item-2', type: 'B', value: 20, color: 'blue' },
    { id: 'item-3', type: 'A', value: 15, color: 'red' },
    { id: 'item-4', type: 'C', value: 25, color: 'green' }
  ];

  // Create root container
  const root = anu.create('root', 'root-container');

  // Create groups
  const group1 = anu.create('group', 'group-1', root);
  const group2 = anu.create('group', 'group-2', root);

  // Bind data to create nodes with metadata
  const selection = anu.selectName('root-container', scene);
  
  // Create spheres with data binding
  const spheres = selection.bind('sphere', { diameter: 0.5 }, testData)
    .position((d, n, i) => new BABYLON.Vector3(i * 2 - 3, 0, 0))
    .name((d) => d.id)
    .id((d) => d.id)
    .addTags((d) => `${d.type} ${d.color}`);

  // Create some boxes as children of spheres
  const boxes = spheres.bind('box', { size: 0.2 })
    .position(new BABYLON.Vector3(0, 1, 0))
    .name('child-box')
    .addTags('geometry solid');

  // Create some cylinders with specific IDs
  const cylinders = selection.bind('cylinder', { height: 1, diameter: 0.3 }, testData.slice(0, 2))
    .position((d, n, i) => new BABYLON.Vector3(i * 2 - 1, -2, 0))
    .id((d) => `cylinder-${d.id}`)
    .name('test-cylinder')
    .addTags('geometry round');

  // Test proxy features
  try {
    // Test nested property access
    spheres.position.y(0.5);
    
    // Test chained property access
    spheres.position.x((d, n, i) => i * 2 - 3).rotation.y(Math.PI / 4);
    
    // Test method calls on properties
    spheres.scaling.scaleInPlace(1.2);
    
    console.log('Selection test scene created successfully with proxy features');
  } catch (error) {
    console.error('Error in selection test scene:', error);
  }

  // Make scene globally accessible for testing
  if (typeof window !== 'undefined') {
    window.scene = scene;
    window.testData = testData;
    window.selections = {
      root: selection,
      spheres,
      boxes,
      cylinders
    };
  }

  return scene;
}
