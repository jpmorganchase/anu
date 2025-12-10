// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
import { select, selectName, selectId, selectTag, selectData } from './utility/select';
import { bind, bindInstance, bindThinInstance, bindClone} from './bind/bind';
import { positionX, positionY, positionZ } from './property/position';
import { rotationX, rotationY, rotationZ } from './property/rotation';
import { scalingX, scalingY, scalingZ } from './property/scaling';
import { get } from './utility/get';
import { addTags, hasTags, removeTags } from './property/tags';
import { action } from './property/actions';
import { behavior } from './property/behavior';
import {
  ambientColor,
  diffuseColor,
  emissiveColor,
  specularColor,
  ambientTexture,
  diffuseTexture,
  emissiveTexture,
  specularTexture,
} from './property/material';
import { registerInstancedBuffer, setInstancedBuffer } from './property/instancedBuffer';
import { attr, props, prop } from './property/prop';
import { evaluatePropertyPath, hasPropertyPath } from '../utils/objects';
import { run } from './utility/run';
import { dispose } from './bind/dispose';
import { drawTextDT, scaleDT } from './property/dynamicTexture';
import { boundingBox } from './utility/boundingBox';
import { filter } from './utility/filter';
import { metadata } from './property/metadata';
import { positionUI, rotateUI, scaleUI } from '../prefabs/Interactions/facetPosition';
import {
  thinInstanceSetBuffer,
  thinInstancePosition,
  thinInstanceScaling,
  thinInstanceRotation,
  thinInstanceColor,
  thinInstanceRegisterAttribute,
  thinInstanceSetAttribute,
  thinInstanceAttributeAt,
  thinInstanceMatrixAt,
  thinInstanceMatrixFor,
  thinInstancePositionAt,
  thinInstanceScalingAt,
  thinInstanceRotationAt,
  thinInstanceColorAt,
  thinInstancePositionFor,
  thinInstanceScalingFor,
  thinInstanceRotationFor,
  thinInstanceColorFor,
} from './property/thin';
import { transition, Transition, tween, stopTransitions, resetTransitions, restartTransitions, endTransitions, resetStopTransitions, pauseTransitions, stopTweens, createTransition } from './animation/transition';
import type { DynamicProperties, PropertyAccessorMethod } from './base-types';

/**
 * The core Selection class of Anu that provides proxy functionality and all the specific
 * method implementations. All functions should return an instance of Selection which 
 * contains the current scene and either a node, mesh, or list of meshes. 
 * The Selection class exposes all of Anu's core functions and enables dynamic 
 * method creation for any property that exists on the selected Babylon.js nodes.
 */
export class Selection {
  selected: Node[];
  scene?: Scene;
  protected transitions: Transition[];
  
  // Temp store for property path string for chaining
  private propertyPath: string = '';

  // Index signature to allow dynamic properties
  [K: string]: any;

  constructor(nodes: Node[], scene?: Scene) {
    this.selected = nodes;
    this.scene = scene;
    this.transitions = [];

    // Create the proxy reference that will be returned  
    let proxyRef: Selection;
    let proxy: any; // Forward declaration for use in helper functions
    const target = this; // Reference to the actual Selection instance
    
    // Helper function to check if property path exists on any selected nodes
    const nodeHasPropertyPath = (path: string) => {
      return this.selected.some(node => hasPropertyPath(node, path));
    };

    // Factory function to dynamically create proxy methods for both direct properties, accessors, methods, and nested paths. 
    const createProxyMethod = (accessor: string, isNestedPath: boolean) => {
      return new Proxy(function(...args: any[]) {
        if (args.length > 0) {
          // Use prop() to handle setting properties, calling methods, and transitions
          // Pass the first argument for single-arg calls, or the entire args array for methods
          const value = args.length === 1 ? args[0] : args;
          proxyRef.prop(accessor, value);
          target.propertyPath = '';
          return proxyRef;
        } else {
          // Property access - return current values
          const propertyValues = target.selected.map(node => {
            const value = evaluatePropertyPath(node, accessor);
            return typeof value === 'function' ? value.bind(node) : value;
          });
          
          // Clear property path
          target.propertyPath = '';
          return propertyValues;
        }
      }, {
        get(methodTarget: any, nestedProp: string | symbol) {
          if (typeof nestedProp === 'symbol') {
            return methodTarget[nestedProp];
          }
          
          if (isNestedPath) {
            // For nested paths, build extended path and validate
            const extendedPath = `${accessor}.${nestedProp}`;
            
            if (nodeHasPropertyPath(extendedPath)) {
              target.propertyPath = accessor;
              return proxy[nestedProp];
            } else {
              target.propertyPath = '';
              return undefined;
            }
          } else {
            // For direct properties, store path for next access
            target.propertyPath = accessor;
            return proxy[nestedProp];
          }
        }
      });
    };
    
    // Return a Proxy that intercepts property access, cast to include dynamic properties  
    proxy = new Proxy(this, {
      get(target: Selection, prop: string | symbol, receiver: any) {
        // Handle symbols first
        if (typeof prop === 'symbol') {
          return Reflect.get(target, prop, receiver);
        }

        // Check for stored property path to build nested paths like .material.diffuseColor
        // This must come BEFORE checking Selection class properties to handle cases where
        // a nested property name conflicts with a Selection method (e.g., material.diffuseColor)
        if (target.propertyPath && typeof prop === 'string') {
          const newPath = `${target.propertyPath}.${prop}`;
          
          // Check if the new path exists on any selected nodes
          if (nodeHasPropertyPath(newPath)) {
            // Create a proxy function for the extended path using the factory
            return createProxyMethod(newPath, true);
          } else {
            // Path doesn't exist, clear it and check if it's a Selection class property instead
            target.propertyPath = '';
            
            // Check if this is actually a Selection class property
            if (prop in target) {
              return Reflect.get(target, prop);
            }
            
            throw new Error(`Property path '${newPath}' does not exist on the selected nodes.`);
          }
        }

        // Check if the property exists on the Selection class
        // This ensures Selection methods like tween, transition, etc. are accessible
        // when there's no stored property path
        if (typeof prop === 'string' && prop in target) {
          return Reflect.get(target, prop);
        }

        // Check if the property exists on any of the selected nodes (start of new path)
        if (typeof prop === 'string') {
          const hasProperty = target.selected.some(node => 
            node && typeof node === 'object' && prop in node
          );

          if (hasProperty) {
            // Create a proxy function that handles method calls and property access using the factory
            return createProxyMethod(prop, false);
          }
        }

        // Return undefined for properties that don't exist
        return undefined;
      },

      set(target: Selection, prop: string | symbol, value: any, receiver: any) {
        // Only allow setting properties that exist on the Selection class
        if (prop in target || typeof prop === 'symbol') {
          return Reflect.set(target, prop, value, receiver);
        }

        // Explicitly disallow setting dynamic properties
        throw new Error(`Cannot assign to property '${String(prop)}'. Use method calls like .${String(prop)}(value) instead.`);
      }
    });

    // Store reference and return the proxy with proper typing
    proxyRef = proxy as Selection;
    return proxyRef;
  }

  /**
   * Updates the transitions array with a new transition
   */
  public updateTransitions(transition: Transition) {
    this.transitions.push(transition);
  }

  /**
   * Gets the transitions array (read-only access)
   */
  public getTransitions(): Transition[] {
    return this.transitions;
  }

  public select = select;
  public selectName = selectName;
  public selectId = selectId;
  public selectTag = selectTag;
  public selectData = selectData;
  public bind = bind;
  public run = run;
  public bindInstance = bindInstance;

  // Position, rotation, and scaling methods from dedicated files
  public positionX = positionX;
  public positionY = positionY;
  public positionZ = positionZ;

  public rotationX = rotationX;
  public rotationY = rotationY;
  public rotationZ = rotationZ;

  public scalingX = scalingX;
  public scalingY = scalingY;
  public scalingZ = scalingZ;

  public get = get;
  public attr = attr;
  public addTags = addTags;
  public removeTags = removeTags;
  public hasTags = hasTags;
  public action = action;
  public behavior = behavior;

  public diffuseColor = diffuseColor;
  public specularColor = specularColor;
  public emissiveColor = emissiveColor;
  public ambientColor = ambientColor;
  public registerInstancedBuffer = registerInstancedBuffer;
  public setInstancedBuffer = setInstancedBuffer;
  public dispose = dispose;
  public diffuseTexture = diffuseTexture;
  public specularTexture = specularTexture;
  public emissiveTexture = emissiveTexture;
  public ambientTexture = ambientTexture;
  public scaleDT = scaleDT;
  public scaleToDT = scaleDT;
  public drawTextDT = drawTextDT;
  public boundingBox = boundingBox;
  public filter = filter;
  public props = props;
  public prop = prop;

  public metadata = metadata;
  public positionUI = positionUI;
  public scaleUI = scaleUI;
  public rotateUI = rotateUI;
  public thinInstanceSetBuffer = thinInstanceSetBuffer;
  public thinInstancePosition = thinInstancePosition;
  public thinInstanceScaling = thinInstanceScaling;
  public thinInstanceRotation = thinInstanceRotation;
  public thinInstanceColor = thinInstanceColor;
  public thinInstanceSetAttribute = thinInstanceSetAttribute;
  public thinInstanceAttributeAt = thinInstanceAttributeAt;
  public thinInstanceRegisterAttribute = thinInstanceRegisterAttribute;
  public thinInstanceMatrixAt = thinInstanceMatrixAt;
  public thinInstanceMatrixFor = thinInstanceMatrixFor;
  public thinInstancePositionAt = thinInstancePositionAt;
  public thinInstanceScalingAt = thinInstanceScalingAt;
  public thinInstanceRotationAt = thinInstanceRotationAt;
  public thinInstanceColorAt = thinInstanceColorAt;
  public thinInstancePositionFor = thinInstancePositionFor;
  public thinInstanceScalingFor = thinInstanceScalingFor;
  public thinInstanceRotationFor = thinInstanceRotationFor;
  public thinInstanceColorFor = thinInstanceColorFor;
  public bindThinInstance = bindThinInstance;
  public transition = transition;
  public tween = tween;
  public stopTransitions = stopTransitions;
  public resetTransitions = resetTransitions;
  public resetStopTransitions = resetStopTransitions;
  public pauseTransitions = pauseTransitions;
  public restartTransitions = restartTransitions;
  public endTransitions = endTransitions;
  public stopTweens = stopTweens;
  public bindClone = bindClone;

}

// Declaration merging to add dynamic properties to Selection class
// The generic parameter refers to the complete Selection type (after merging)
export interface Selection extends DynamicProperties<Selection> {}

// Re-export types for convenience
export type { 
  DynamicProperties, 
  PropertyAccessor, 
  DynamicPropertyFunction,
  AllBabylonProperties 
} from './base-types';

