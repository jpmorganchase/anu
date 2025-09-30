// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, TransformNode, AbstractMesh, Node, Light} from '@babylonjs/core';

// Use all properties from Babylon.js types without any exclusions first
export type AllBabylonProperties = Mesh & TransformNode & AbstractMesh & Node & Light;


// Define the function signature for dynamic properties
export type DynamicPropertyFunction<T> = (data: any, node: any, index: number) => T;

// Helper type for creating type-safe dynamic property accessors
export type PropertyAccessor<T> = T | DynamicPropertyFunction<T>;

// Type guard to check if a value is a function
export function isDynamicFunction<T>(value: PropertyAccessor<T>): value is DynamicPropertyFunction<T> {
  return typeof value === 'function';
}

// Forward declaration for BaseSelection to avoid circular dependency
export interface BaseSelectionInterface {
  selected: Node[];
  scene?: any;
  transitions: any[];
  updateTransitions(transition: any): void;
}

// Create a minimal type for Selection methods to exclude from dynamic properties
// This will be more comprehensive than manually listing each method
export interface SelectionMethods {
  // Core selection methods
  select: any; selectName: any; selectId: any; selectTag: any; selectData: any;
  bind: any; run: any; bindInstance: any;
  
  // Transform properties that have custom implementations
  position: any; positionX: any; positionY: any; positionZ: any;
  rotation: any; rotationX: any; rotationY: any; rotationZ: any;
  scaling: any; scalingX: any; scalingY: any; scalingZ: any;
  translate: any;
  
  // Material and visual properties
  material: any; ambientColor: any; diffuseColor: any; emissiveColor: any; specularColor: any;
  
  // Metadata and utility
  name: any; id: any; metadata: any; dispose: any;
  
  // Instance and thin instance methods
  registerInstancedBuffer: any; setInstancedBuffer: any;
  thinInstanceSetBuffer: any; thinInstanceRegisterAttribute: any;
  
  // Animation
  transition: any; tween: any;
}



// Type for dynamic properties - maps each Babylon.js property to Selection methods
export type DynamicProperties = {
  readonly [K in keyof Omit<AllBabylonProperties, keyof BaseSelectionInterface | keyof SelectionMethods>]: {
    (): AllBabylonProperties[K][];
    (value: AllBabylonProperties[K]): Selection;
    (value: (data: any, node: any, index: number) => AllBabylonProperties[K]): Selection;
  }
};