// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node, Mesh, TransformNode, AbstractMesh } from '@babylonjs/core';
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
import type { DynamicProperties } from './base-types';

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
  transitions: Transition[];
  
  // Temp store for property path string for chaining
  propertyPath: string = '';

  // Index signature to allow dynamic properties
  [K: string]: any;

  constructor(nodes: Node[], scene?: Scene) {
    this.selected = nodes;
    this.scene = scene;
    this.transitions = [];

    // Create the proxy reference that will be returned  
    let proxyRef: Selection;
    
    // Return a Proxy that intercepts property access, cast to include dynamic properties  
    const proxy = new Proxy(this, {
      get(target: Selection, prop: string | symbol, receiver: any) {
        // Handle symbols first
        if (typeof prop === 'symbol') {
          return Reflect.get(target, prop, receiver);
        }

        // Helper function to evaluate property path on a node
        const evaluatePropertyPath = (node: any, path: string) => {
          const parts = path.split('.');
          let current = node;
          for (const part of parts) {
            if (current && typeof current === 'object' && part in current) {
              current = current[part];
            } else {
              return undefined;
            }
          }
          return current;
        };

        // Helper function to check if property path exists on nodes
        const hasPropertyPath = (path: string) => {
          return target.selected.some(node => {
            const value = evaluatePropertyPath(node, path);
            // Consider the path valid if we can evaluate it, even if the value is null/undefined
            // This allows accessing nested properties on nullable types
            const parts = path.split('.');
            let current = node;
            for (let i = 0; i < parts.length; i++) {
              if (current && typeof current === 'object' && parts[i] in current) {
                current = current[parts[i]];
              } else {
                // Property doesn't exist in the chain
                return false;
              }
            }
            // If we made it through all parts, the path is valid (even if final value is null)
            return true;
          });
        };

        // Helper function to check if we should use transitions
        const shouldUseTransition = () => {
          return target.transitions.length > 0;
        };

        // IMPORTANT: Check for stored property path BEFORE checking Selection class properties
        // This allows nested paths like .material.diffuseColor to work even when diffuseColor
        // is also a method on the Selection class
        if (target.propertyPath && typeof prop === 'string') {
          const newPath = `${target.propertyPath}.${prop}`;
          
          // Check if the new path exists on any selected nodes
          if (hasPropertyPath(newPath)) {
            // Create a proxy function for the extended path
            const pathMethod = new Proxy(function(...args: any[]) {
              if (args.length > 0) {
                // Check if we should use transitions
                if (shouldUseTransition()) {
                  // Use createTransition for animated property changes
                  createTransition(target as Selection, newPath, args[0]);
                  target.propertyPath = '';
                  return proxyRef;
                }
                
                // Function call - evaluate the path and set/call
                target.selected.forEach((node, i) => {
                  const pathParts = newPath.split('.');
                  const lastProp = pathParts.pop()!;
                  const parentPath = pathParts.join('.');
                  
                  const parent = parentPath ? evaluatePropertyPath(node, parentPath) : node;
                  
                  if (parent && typeof parent === 'object' && lastProp in parent) {
                    const targetProperty = parent[lastProp];
                    
                    if (typeof targetProperty === 'function') {
                      // Process arguments and call method
                      const processedArgs = args.map(arg => {
                        return arg instanceof Function ? 
                          arg((node.metadata?.data ?? {}), node, i) : arg;
                      });
                      targetProperty.apply(parent, processedArgs);
                    } else {
                      // Set property value
                      const value = args[0];
                      const actualValue = value instanceof Function ? 
                        value((node.metadata?.data ?? {}), node, i) : value;
                      parent[lastProp] = actualValue;
                    }
                  }
                });
                
                // Clear property path and return proxy for chaining
                target.propertyPath = '';
                return proxyRef;
              } else {
                // Property access - evaluate and return values
                const propertyValues = target.selected.map(node => {
                  // Evaluate the nested property path
                  const value = evaluatePropertyPath(node, newPath);
                  // Return the value even if it's null/undefined (important for nullable properties like material)
                  return value;
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
                
                // Build the extended path
                const extendedPath = `${newPath}.${nestedProp}`;
                
                // Check if this extended path exists
                if (hasPropertyPath(extendedPath)) {
                  // Set the property path and recursively create another proxy method
                  target.propertyPath = newPath;
                  // Return the proxy, which will trigger the main get handler with the extended path
                  return proxy[nestedProp];
                } else {
                  // Path doesn't exist, return undefined
                  target.propertyPath = '';
                  return undefined;
                }
              }
            });

            return pathMethod;
          } else {
            // Path doesn't exist, clear it and return undefined
            target.propertyPath = '';
            throw new Error(`Property path '${newPath}' does not exist on the selected nodes.`);
          }
        }

        // IMPORTANT: Check if the property exists on the Selection class FIRST
        // This ensures Selection methods like tween, transition, etc. are not intercepted
        // even if they coincidentally exist on Babylon nodes
        if (typeof prop === 'string' && prop in target) {
          return Reflect.get(target, prop);
        }

        // Check if the property exists on any of the selected nodes (start of new path)
        if (typeof prop === 'string') {
          const hasProperty = target.selected.some(node => 
            node && typeof node === 'object' && prop in node
          );

          if (hasProperty) {
            // Create a proxy function that handles method calls and property access
            const dynamicMethod = new Proxy(function(...args: any[]) {
              if (args.length > 0) {
                // Check if we should use transitions for node property changes
                if (shouldUseTransition()) {
                  // Use createTransition for animated property changes on node properties only
                  createTransition(target as Selection, prop, args[0]);
                  target.propertyPath = '';
                  return proxyRef;
                }
                
                // Function call - operate directly on the property
                target.selected.forEach((node, i) => {
                  if (node && typeof node === 'object' && prop in node) {
                    const nodeProperty = (node as any)[prop];
                    
                    if (typeof nodeProperty === 'function') {
                      // Process arguments and call method
                      const processedArgs = args.map(arg => {
                        return arg instanceof Function ? 
                          arg((node.metadata?.data ?? {}), node, i) : arg;
                      });
                      nodeProperty.apply(node, processedArgs);
                    } else {
                      // Set property value
                      const value = args[0];
                      const actualValue = value instanceof Function ? 
                        value((node.metadata?.data ?? {}), node, i) : value;
                      
                      // Type validation
                      const currentValue = (node as any)[prop];
                      const expectedType = typeof currentValue;
                      
                      if (currentValue !== undefined && typeof currentValue !== 'function' && actualValue !== undefined) {
                        const actualType = typeof actualValue;
                        
                        if (expectedType !== actualType && expectedType !== 'object') {
                          console.warn(`Type mismatch for property '${prop}' on node ${('name: ' + node.name || ' id: ' + node.id || 'unnamed') + ' unique ID: ' + node.uniqueId}. Expected ${expectedType}, got ${actualType}. Skipping assignment.`);
                          return proxyRef;
                        }
                      }
                      
                      (node as any)[prop] = actualValue;
                    }
                  }
                });
                
                // Clear property path and return proxy for chaining
                target.propertyPath = '';
                return proxyRef;
              } else {
                // Property access without function call - return values
                const propertyValues = target.selected
                  .filter(node => node && typeof node === 'object' && prop in node)
                  .map(node => {
                    const value = (node as any)[prop];
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
                
                // Store the property path for chaining
                target.propertyPath = prop;
                return proxy[nestedProp];
              }
            });

            return dynamicMethod;
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

  public select = select;
  public selectName = selectName;
  public selectId = selectId;
  public selectTag = selectTag;
  public selectData = selectData;
  public bind = bind;
  public run = run;
  public bindInstance = bindInstance;
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

