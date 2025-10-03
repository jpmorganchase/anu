// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

// Selection Test Example - Comprehensive selection functionality testing
import * as anu from '@jpmorganchase/anu'
import {HemisphericLight, Vector3, Scene, ArcRotateCamera, Color3, StandardMaterial} from '@babylonjs/core';

//create and export a function that takes a babylon engine and returns a scene
export const selectionTest = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(3, 3, -5);

  // Test data for comprehensive selection testing
  const testData = [
    { id: 'sphere-1', name: 'sphere', category: 'primary', type: 'geometry', value: 10 },
    { id: 'sphere-2', name: 'sphere', category: 'secondary', type: 'geometry', value: 20 },
    { id: 'sphere-3', name: 'sphere', category: 'primary', type: 'geometry', value: 30 },
    { id: 'box-1', name: 'box', category: 'primary', type: 'geometry', value: 40 },
    { id: 'box-2', name: 'box', category: 'secondary', type: 'geometry', value: 50 },
    { id: 'cylinder-1', name: 'cylinder', category: 'special', type: 'geometry', value: 60 }
  ];

  //Create root transform node (using 'cot' which is the correct type for transform nodes)
  let root = anu.create("cot", "root");
  let rootSelection = anu.selectName("root", scene);

  // Create spheres with comprehensive metadata
  let sphereData = testData.filter(d => d.name === 'sphere');
  let redMaterial = new StandardMaterial("redMaterial", scene);
  redMaterial.diffuseColor = Color3.Red();
  
  let spheres = rootSelection.bind('sphere', {diameter: 0.3}, sphereData)
    .positionX((d, node, i) => i * 1.0 - 1.0)
    .positionY(0)
    .positionZ(0)
    .material(() => redMaterial);

  // Set up metadata for spheres
  spheres.selected.forEach((mesh, i) => {
    const data = sphereData[i];
    mesh.id = data.id;
    mesh.name = data.name;
    mesh.metadata = { 
      anujsData: data,
      category: data.category,
      type: data.type,
      value: data.value
    };
    // Add tags for tag-based selection
    mesh.tags = `${data.category} ${data.type} sphere-tag`;
  });

  // Create boxes with comprehensive metadata
  let boxData = testData.filter(d => d.name === 'box');
  let blueMaterial = new StandardMaterial("blueMaterial", scene);
  blueMaterial.diffuseColor = Color3.Blue();
  
  let boxes = rootSelection.bind('box', {size: 0.25}, boxData)
    .positionX((d, node, i) => i * 1.0 - 0.5)
    .positionY(1.0)
    .positionZ(0)
    .material(() => blueMaterial);

  // Set up metadata for boxes
  boxes.selected.forEach((mesh, i) => {
    const data = boxData[i];
    mesh.id = data.id;
    mesh.name = data.name;
    mesh.metadata = { 
      anujsData: data,
      category: data.category,
      type: data.type,
      value: data.value
    };
    // Add tags for tag-based selection
    mesh.tags = `${data.category} ${data.type} box-tag`;
  });

  // Create cylinder with metadata
  let cylinderData = testData.filter(d => d.name === 'cylinder');
  let greenMaterial = new StandardMaterial("greenMaterial", scene);
  greenMaterial.diffuseColor = Color3.Green();
  
  let cylinder = rootSelection.bind('cylinder', {height: 0.5, diameter: 0.2}, cylinderData)
    .positionX(0)
    .positionY(-1.0)
    .positionZ(0)
    .material(() => greenMaterial);


  // Set up metadata for cylinder
  cylinder.selected.forEach((mesh, i) => {
    const data = cylinderData[i];
    mesh.id = data.id;
    mesh.name = data.name;
    mesh.metadata = { 
      anujsData: data,
      category: data.category,
      type: data.type,
      value: data.value
    };
    // Add tags for tag-based selection
    mesh.tags = `${data.category} ${data.type} cylinder-tag`;
  });

  // Create hierarchical structure for chaining tests
  let group1 = anu.create("cot", "group1", {}, {}, scene);
  let group2 = anu.create("cot", "group2", {}, {}, scene);
  // Set parent relationships
  group1.setParent(root);
  group2.setParent(root);
  
  // Create selections for the groups
  let group1Selection = anu.selectName("group1", scene);
  let group2Selection = anu.selectName("group2", scene);
  
  // Add child spheres to groups
  let yellowMaterial = new StandardMaterial("yellowMaterial", scene);
  yellowMaterial.diffuseColor = Color3.Yellow();
  
  let childSphere1 = group1Selection.bind('sphere', {diameter: 0.15}, [{id: 'child-1', name: 'child-sphere', category: 'child', type: 'nested', value: 100}])
    .positionX(-2)
    .positionY(2)
    .positionZ(0)
    .material(() => yellowMaterial);
    
  childSphere1.selected.forEach((mesh, i) => {
    mesh.id = 'child-1';
    mesh.name = 'child-sphere';
    mesh.metadata = { 
      anujsData: {id: 'child-1', name: 'child-sphere', category: 'child', type: 'nested', value: 100},
      category: 'child',
      type: 'nested',
      value: 100
    };
    mesh.tags = 'child nested child-tag';
  });

  let purpleMaterial = new StandardMaterial("purpleMaterial", scene);
  purpleMaterial.diffuseColor = Color3.Purple();
  
  let childSphere2 = group2Selection.bind('sphere', {diameter: 0.15}, [{id: 'child-2', name: 'child-sphere', category: 'child', type: 'nested', value: 200}])
    .positionX(2)
    .positionY(2)
    .positionZ(0)
    .material(() => purpleMaterial);
    
  childSphere2.selected.forEach((mesh, i) => {
    mesh.id = 'child-2';
    mesh.name = 'child-sphere';
    mesh.metadata = { 
      anujsData: {id: 'child-2', name: 'child-sphere', category: 'child', type: 'nested', value: 200},
      category: 'child',
      type: 'nested',
      value: 200
    };
    mesh.tags = 'child nested child-tag';
  });

  // Make global variables available for testing
  window.scene = scene;
  window.anu = anu;
  window.BABYLON = { Scene, Vector3, Color3, HemisphericLight, ArcRotateCamera, StandardMaterial };
  window.engine = engine;



  return scene;
};
