// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, TransformNode, AbstractMesh, Node, Light} from '@babylonjs/core';

// Use all properties from Babylon.js types without any exclusions first
export type AllBabylonProperties = Mesh & TransformNode & AbstractMesh & Node & Light;


// Define the function signature for dynamic properties
export type DynamicPropertyFunction<T> = (data: any, node: any, index: number) => T;

// Helper type for creating type-safe dynamic property accessors
export type PropertyAccessor<T> = T | DynamicPropertyFunction<T>;

// Helper type for property accessor methods that match proxy signature
// This can be used for explicit method definitions like positionX, rotationX, etc.
export type PropertyAccessorMethod<T, TSelection = any> = {
  (): T[];
  (value: T): TSelection;
  (value: (data: any, node: any, index: number) => T): TSelection;
};

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
// Only include methods that are ACTUALLY defined on the Selection class
export interface SelectionMethods {
  // Core selection methods
  select: any; selectName: any; selectId: any; selectTag: any; selectData: any;
  bind: any; run: any; bindInstance: any;
  
  // Transform properties that have custom implementations (only the X/Y/Z variants)
  positionX: any; positionY: any; positionZ: any;
  rotationX: any; rotationY: any; rotationZ: any;
  scalingX: any; scalingY: any; scalingZ: any;
  
  // Material color properties (explicit methods exist)
  ambientColor: any; diffuseColor: any; emissiveColor: any; specularColor: any;
  
  // Metadata and utility
  metadata: any; dispose: any; get: any; attr: any; filter: any; props: any; prop: any;
  
  // Tags
  addTags: any; removeTags: any; hasTags: any;
  
  // Actions and behavior
  action: any; behavior: any;
  
  // Textures
  diffuseTexture: any; specularTexture: any; emissiveTexture: any; ambientTexture: any;
  
  // Instance and thin instance methods
  registerInstancedBuffer: any; setInstancedBuffer: any;
  thinInstanceSetBuffer: any; thinInstanceRegisterAttribute: any;
  thinInstancePosition: any; thinInstanceScaling: any; thinInstanceRotation: any; thinInstanceColor: any;
  thinInstanceSetAttribute: any; thinInstanceAttributeAt: any;
  thinInstanceMatrixAt: any; thinInstanceMatrixFor: any;
  thinInstancePositionAt: any; thinInstanceScalingAt: any; thinInstanceRotationAt: any; thinInstanceColorAt: any;
  thinInstancePositionFor: any; thinInstanceScalingFor: any; thinInstanceRotationFor: any; thinInstanceColorFor: any;
  
  // UI methods
  positionUI: any; rotateUI: any; scaleUI: any;
  
  // Dynamic texture
  scaleDT: any; scaleToDT: any; drawTextDT: any;
  
  // Misc
  boundingBox: any; bindClone: any; bindThinInstance: any;
  
  // Animation
  transition: any; tween: any;
  stopTransitions: any; resetTransitions: any; restartTransitions: any; endTransitions: any;
  resetStopTransitions: any; pauseTransitions: any; stopTweens: any;
  
  // Internal properties
  propertyPath: any;
  updateTransitions: any;
  
  // Note: position, rotation, scaling, material, name, id are NOT in this list
  // because they should be handled by the proxy and get Babylon.js types
}

// Helper type to create nested property accessors
// This allows chaining like .position.x(value) or .material.diffuseColor()
// For Nullable types (like Nullable<Material>), we unwrap them to access nested properties
type NestedPropertyMethod<T, TSelection> = 
  // Use NonNullable to strip null and undefined, then check if it's an object
  NonNullable<T> extends object
    ? NonNullable<T> extends Function
      ? {}  // If it's a function, no nested properties
      : {
          // Map over properties of the unwrapped type
          [K in keyof NonNullable<T>]: 
            NonNullable<T>[K] extends (...args: any[]) => any
              ? never  // Skip function properties
              : {
                  // Getter: returns array of values (may include null/undefined from nullable parents)
                  (): (NonNullable<T>[K] | null | undefined)[];
                  // Setter: accepts value and returns Selection for chaining
                  (value: NonNullable<T>[K]): TSelection;
                  // Function setter: accepts function and returns Selection
                  (value: (data: any, node: any, index: number) => NonNullable<T>[K]): TSelection;
                } & NestedPropertyMethod<NonNullable<T>[K], TSelection>;
        } & {
          // Add index signature to allow accessing properties not on the base type
          // This handles polymorphic types like Material vs StandardMaterial
          [key: string]: {
            (): any[];
            (value: any): TSelection;
            (value: (data: any, node: any, index: number) => any): TSelection;
          } & NestedPropertyMethod<any, TSelection>;
        }
    : {};

// Type for dynamic properties - maps each Babylon.js property to methods that return ProxiedSelection
// We use a generic here so it can refer to the complete proxied type
export type DynamicProperties<TSelection> = {
  readonly [K in keyof Omit<AllBabylonProperties, keyof BaseSelectionInterface | keyof SelectionMethods>]: {
    (): AllBabylonProperties[K][];
    (value: AllBabylonProperties[K]): TSelection;
    (value: (data: any, node: any, index: number) => AllBabylonProperties[K]): TSelection;
  } & NestedPropertyMethod<AllBabylonProperties[K], TSelection>;
};