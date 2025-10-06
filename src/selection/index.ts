// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node, Mesh, TransformNode, AbstractMesh } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
import { select, selectName, selectId, selectTag, selectData } from './utility/select';
import { bind, bindInstance, bindThinInstance, bindClone} from './bind/bind';
import { position, positionX, positionY, positionZ } from './property/position';
import { translate } from './bind/translate';
import { rotation, rotationX, rotationY, rotationZ } from './property/rotation';
import { scaling, scalingX, scalingY, scalingZ } from './property/scaling';
import { get } from './utility/get';
import { addTags, hasTags, removeTags } from './property/tags';
import { action } from './property/actions';
import { behavior } from './property/behavior';
import {
  ambientColor,
  diffuseColor,
  emissiveColor,
  material,
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
import { name, id, metadata } from './property/metadata';
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
import { transition, Transition, tween, stopTransitions, resetTransitions, restartTransitions, endTransitions, resetStopTransitions, pauseTransitions, stopTweens} from './animation/transition';
import { DynamicProperties } from './base-types';

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
  
  // Temp store for last accessed property values
  values: any[] = [];

  // Index signature to allow dynamic properties
  [K: string]: any;

  constructor(nodes: Node[], scene?: Scene) {
    this.selected = nodes;
    this.scene = scene;
    this.transitions = [];

    // Create the proxy reference that will be returned  
    let proxyRef: DynamicSelection;
    
    // Return a Proxy that intercepts property access, cast to include dynamic properties  
    const proxy = new Proxy(this, {
      get(target: Selection, prop: string | symbol, receiver: any) {
        // If the property exists on the Selection class, return it normally
        if (prop in target || typeof prop === 'symbol') {
          return Reflect.get(target, prop, receiver);
        }

        // Check if the property exists on any of the selected nodes first
        const hasProperty = target.selected.some(node => 
          node && typeof node === 'object' && prop in node
        );

        if (hasProperty && typeof prop === 'string') {
          // Create a proxy function that handles method calls and property access
          const dynamicMethod = new Proxy(function(...args: any[]) {
            // If called with arguments, set the property value or call method
            if (args.length > 0) {
              target.selected.forEach((node, i) => {
                if (node && typeof node === 'object' && prop in node) {
                  const nodeProperty = (node as any)[prop];
                  
                  // If the property is a function (method), call it with all arguments
                  if (typeof nodeProperty === 'function') {
                    
                      // Process each argument - can be a function or direct value
                      const processedArgs = args.map(arg => {
                        return arg instanceof Function ? 
                          arg((node.metadata?.data ?? {}), node, i) : arg;
                      });
                      
                      // Call the method with all processed arguments
                      nodeProperty.apply(node, processedArgs);
              
                  } else {
                    // For properties (not methods), only use the first argument
                    
                      const value = args[0];
                      const actualValue = value instanceof Function ? 
                        value((node.metadata?.data ?? {}), node, i) : value;
                      
                      // Get property descriptor to understand the property type
                      const descriptor = Object.getOwnPropertyDescriptor(node, prop) || 
                                       Object.getOwnPropertyDescriptor(Object.getPrototypeOf(node), prop);
                      
                      // Get the current value to determine expected type
                      const currentValue = (node as any)[prop];
                      const expectedType = typeof currentValue;
                      
                      // Type validation - only if current value exists and isn't a function
                      if (currentValue !== undefined && typeof currentValue !== 'function' && actualValue !== undefined) {
                        const actualType = typeof actualValue;
                        
                        // Return early if types don't match (no conversion)
                        if (expectedType !== actualType && expectedType !== 'object') {
                          console.warn(`Type mismatch for property '${prop}' on node ${('name: ' + node.name || ' id: ' + node.id || 'unnamed') + ' unique ID: ' + node.uniqueId}. Expected ${expectedType}, got ${actualType}. Skipping assignment.`);
                          return proxyRef; // Return early without setting the value
                        }
                      }
                      
                      // Set the value without conversion
                      (node as any)[prop] = actualValue;
                     
                 
                  }
                }
              });
              // Clear values array after any method call with arguments
              target.values = [];
              return proxyRef; // Return proxy object for chaining
            } else {
              // If called with no arguments, store property values and return array
              const propertyValues = target.selected
                .filter(node => node && typeof node === 'object' && prop in node)
                .map(node => {
                  const value = (node as any)[prop];
                  return typeof value === 'function' ? value.bind(node) : value;
                });
              
              target.values = propertyValues;
              return propertyValues;
            }
          }, {
            get(methodTarget: any, nestedProp: string | symbol) {
              if (typeof nestedProp === 'symbol') {
                return methodTarget[nestedProp];
              }

              // Store the property values when accessing nested properties
              const propertyValues = target.selected
                .filter(node => node && typeof node === 'object' && prop in node)
                .map(node => {
                  const value = (node as any)[prop];
                  return typeof value === 'function' ? value.bind(node) : value;
                });
              
              target.values = propertyValues;

              // Check if this nested property exists on ALL stored values
              const hasPropertyOnValues = target.values.every(value => 
                value && typeof value === 'object' && nestedProp in value
              );

              if (hasPropertyOnValues) {
                // Return a function that operates on the stored values
                return function(...args: any[]) {
                  if (args.length > 0) {
                    // Check if nested property is a method or property on each value
                    target.values.forEach((value: any, i: number) => {
                      if (value && typeof value === 'object' && nestedProp in value) {
                        const nestedPropertyValue = (value as any)[nestedProp];
                        
                        // If it's a method, call it with processed arguments
                        if (typeof nestedPropertyValue === 'function') {
                          const processedArgs = args.map(arg => {
                            return typeof arg === 'function' 
                              ? arg(target.selected[i]?.metadata?.data, target.selected[i], i)
                              : arg;
                          });
                          
                          // Call the method on the value object
                          nestedPropertyValue.apply(value, processedArgs);
                        } else {
                          // If it's a property, assign the first argument to it
                          const processedArg = typeof args[0] === 'function' 
                            ? args[0](target.selected[i]?.metadata?.data, target.selected[i], i)
                            : args[0];
                          
                          (value as any)[nestedProp] = processedArg;
                        }
                      }
                    });
                    // Clear the values array after operation and return Selection for chaining
                    target.values = [];
                    return proxyRef;
                  } else {
                    // No arguments: extract the property values from stored values
                    const newValues = target.values.map((value: any) => {
                      return value && typeof value === 'object' && nestedProp in value ? (value as any)[nestedProp] : undefined;
                    });
                    target.values = newValues;
                    return proxyRef;
                  }
                };
              } else {
                // Property doesn't exist on ALL stored values - this is invalid
                throw new Error(`Property '${nestedProp}' is not valid for the current property '${prop}'. Ensure '${prop}' returns objects that have the '${nestedProp}' property.`);
              }
            }
          });

          return dynamicMethod;
        }

        // Check if we should operate on the stored values array (only if property doesn't exist on nodes)
        if (target.values && target.values.length > 0 && typeof prop === 'string') {
          // Check if the property exists on ALL values in the array
          const hasPropertyOnValues = target.values.every(value => 
            value && typeof value === 'object' && prop in value
          );

          if (hasPropertyOnValues) {
            // Create a method that operates on the stored values
            const valueChainMethod = function(...args: any[]) {
              if (args.length > 0) {
                // Set the property on each value in the array
                target.values.forEach((value: any, i: number) => {
                  if (value && typeof value === 'object' && prop in value) {
                    const processedArg = typeof args[0] === 'function' 
                      ? args[0](target.selected[i]?.metadata?.data, target.selected[i], i)
                      : args[0];
                    
                    value[prop] = processedArg;
                  }
                });
                // Clear the values array after operation and return Selection for chaining
                target.values = [];
                return proxyRef;
              } else {
                // No arguments: extract the property values from stored values
                const newValues = target.values.map((value: any) => {
                  return value && typeof value === 'object' && prop in value ? value[prop] : undefined;
                });
                target.values = newValues;
                return proxyRef;
              }
            };
            
            return valueChainMethod;
          } else {
            // Property doesn't exist on ALL stored values - this is invalid
            throw new Error(`Property '${prop}' is not valid for the current stored values. Ensure the previous method call returned objects that have this property.`);
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
    proxyRef = proxy as DynamicSelection;
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
  //public position = position;
  public positionX = positionX;
  public positionY = positionY;
  public positionZ = positionZ;
  //public translate = translate;
  //public rotation = rotation;
  public rotationX = rotationX;
  public rotationY = rotationY;
  public rotationZ = rotationZ;
  //public scaling = scaling;
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
  //public material = material;
  // public diffuseColor = diffuseColor;
  // public specularColor = specularColor;
  // public emissiveColor = emissiveColor;
  // public ambientColor = ambientColor;
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
  //public name = name;
  //public id = id;
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
export interface Selection extends DynamicProperties {}

// Create a new interface that extends Selection with DynamicProperties
export interface DynamicSelection extends Selection, DynamicProperties {}


// Re-export types for convenience
export type { 
  DynamicProperties, 
  PropertyAccessor, 
  DynamicPropertyFunction,
  AllBabylonProperties 
} from './base-types';

