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
import { transition, Transition, tween, stopTransitions, resetTransitions, restartTransitions, endTransitions, resetStopTransitions, pauseTransitions, stopTweens, createTransition } from './animation/transition';
import { DynamicProperties } from './base-types';

// Forward declare DynamicSelection before the class so it can be used in return types
export interface DynamicSelection extends Selection, DynamicProperties {}

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

    // Return a Proxy that intercepts property access, cast to include dynamic properties  
    const proxy = new Proxy(this, {
      get(target: Selection, prop: string | symbol, receiver: any): any {
        // If the property exists on the Selection class, return it normally
        if (prop in target || typeof prop === 'symbol') {
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
            return evaluatePropertyPath(node, path) !== undefined;
          });
        };

        // Helper function to check if we should use transitions
        const shouldUseTransition = () => {
          return target.transitions.length > 0;
        };

        // If we have a stored property path, check if this prop extends it
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
                  return proxy;
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
                return proxy;
              } else {
                // Property access - evaluate and return values
                const propertyValues = target.selected
                  .map(node => evaluatePropertyPath(node, newPath))
                  .filter(value => value !== undefined);
                
                // Clear property path
                target.propertyPath = '';
                return propertyValues;
              }
            }, {
              get(methodTarget: any, nestedProp: string | symbol) {
                if (typeof nestedProp === 'symbol') {
                  return methodTarget[nestedProp];
                }
                
                // Extend the path further
                target.propertyPath = newPath;
                return proxy[nestedProp];
              }
            });

            return pathMethod;
          } else {
            // Path doesn't exist, clear it and return undefined
            target.propertyPath = '';
            throw new Error(`Property path '${newPath}' does not exist on the selected nodes.`);
          }
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
                // Check if we should use transitions
                if (shouldUseTransition()) {
                  // Use createTransition for animated property changes
                  createTransition(target as Selection, prop, args[0]);
                  target.propertyPath = '';
                  return proxy;
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
                          return proxy;
                        }
                      }
                      
                      (node as any)[prop] = actualValue;
                    }
                  }
                });
                
                // Clear property path and return proxy for chaining
                target.propertyPath = '';
                return proxy;
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
    }) as unknown as DynamicSelection;

    // Return the proxy with proper typing
    return proxy;
  }

  /**
   * Updates the transitions array with a new transition
   */
  public updateTransitions(transition: Transition): DynamicSelection {
    this.transitions.push(transition);
    return this as unknown as DynamicSelection;
  }

  // Declare method signatures with proper return types
  public select!: (this: this, ...args: Parameters<typeof select>) => DynamicSelection;
  public selectName!: (this: this, ...args: Parameters<typeof selectName>) => DynamicSelection;
  public selectId!: (this: this, ...args: Parameters<typeof selectId>) => DynamicSelection;
  public selectTag!: (this: this, ...args: Parameters<typeof selectTag>) => DynamicSelection;
  public selectData!: (this: this, ...args: Parameters<typeof selectData>) => DynamicSelection;
  public bind!: (this: this, ...args: Parameters<typeof bind>) => DynamicSelection;
  public run!: (this: this, ...args: Parameters<typeof run>) => DynamicSelection;
  public bindInstance!: (this: this, ...args: Parameters<typeof bindInstance>) => DynamicSelection;
  //public position = position;
  public positionX!: (this: this, ...args: Parameters<typeof positionX>) => DynamicSelection;
  public positionY!: (this: this, ...args: Parameters<typeof positionY>) => DynamicSelection;
  public positionZ!: (this: this, ...args: Parameters<typeof positionZ>) => DynamicSelection;
  //public translate = translate;
  //public rotation = rotation;
  public rotationX!: (this: this, ...args: Parameters<typeof rotationX>) => DynamicSelection;
  public rotationY!: (this: this, ...args: Parameters<typeof rotationY>) => DynamicSelection;
  public rotationZ!: (this: this, ...args: Parameters<typeof rotationZ>) => DynamicSelection;
  //public scaling = scaling;
  public scalingX!: (this: this, ...args: Parameters<typeof scalingX>) => DynamicSelection;
  public scalingY!: (this: this, ...args: Parameters<typeof scalingY>) => DynamicSelection;
  public scalingZ!: (this: this, ...args: Parameters<typeof scalingZ>) => DynamicSelection;
  public get!: typeof get;
  public attr!: (this: this, ...args: Parameters<typeof attr>) => DynamicSelection;
  public addTags!: (this: this, ...args: Parameters<typeof addTags>) => DynamicSelection;
  public removeTags!: (this: this, ...args: Parameters<typeof removeTags>) => DynamicSelection;
  public hasTags!: typeof hasTags;
  public action!: (this: this, ...args: Parameters<typeof action>) => DynamicSelection;
  public behavior!: (this: this, ...args: Parameters<typeof behavior>) => DynamicSelection;
  //public material = material;
  // public diffuseColor = diffuseColor;
  // public specularColor = specularColor;
  // public emissiveColor = emissiveColor;
  // public ambientColor = ambientColor;
  public registerInstancedBuffer!: (this: this, ...args: Parameters<typeof registerInstancedBuffer>) => DynamicSelection;
  public setInstancedBuffer!: (this: this, ...args: Parameters<typeof setInstancedBuffer>) => DynamicSelection;
  public dispose!: (this: this, ...args: Parameters<typeof dispose>) => DynamicSelection;
  public diffuseTexture!: (this: this, ...args: Parameters<typeof diffuseTexture>) => DynamicSelection;
  public specularTexture!: (this: this, ...args: Parameters<typeof specularTexture>) => DynamicSelection;
  public emissiveTexture!: (this: this, ...args: Parameters<typeof emissiveTexture>) => DynamicSelection;
  public ambientTexture!: (this: this, ...args: Parameters<typeof ambientTexture>) => DynamicSelection;
  public scaleDT!: (this: this, ...args: Parameters<typeof scaleDT>) => DynamicSelection;
  public scaleToDT!: (this: this, ...args: Parameters<typeof scaleDT>) => DynamicSelection;
  public drawTextDT!: (this: this, ...args: Parameters<typeof drawTextDT>) => DynamicSelection;
  public boundingBox!: typeof boundingBox;
  public filter!: (this: this, ...args: Parameters<typeof filter>) => DynamicSelection;
  public props!: (this: this, ...args: Parameters<typeof props>) => DynamicSelection;
  public prop!: (this: this, ...args: Parameters<typeof prop>) => DynamicSelection;
  //public name = name;
  //public id = id;
  public metadata!: (this: this, ...args: Parameters<typeof metadata>) => DynamicSelection;
  public positionUI!: (this: this, ...args: Parameters<typeof positionUI>) => DynamicSelection;
  public scaleUI!: (this: this, ...args: Parameters<typeof scaleUI>) => DynamicSelection;
  public rotateUI!: (this: this, ...args: Parameters<typeof rotateUI>) => DynamicSelection;
  public thinInstanceSetBuffer!: (this: this, ...args: Parameters<typeof thinInstanceSetBuffer>) => DynamicSelection;
  public thinInstancePosition!: (this: this, ...args: Parameters<typeof thinInstancePosition>) => DynamicSelection;
  public thinInstanceScaling!: (this: this, ...args: Parameters<typeof thinInstanceScaling>) => DynamicSelection;
  public thinInstanceRotation!: (this: this, ...args: Parameters<typeof thinInstanceRotation>) => DynamicSelection;
  public thinInstanceColor!: (this: this, ...args: Parameters<typeof thinInstanceColor>) => DynamicSelection;
  public thinInstanceSetAttribute!: (this: this, ...args: Parameters<typeof thinInstanceSetAttribute>) => DynamicSelection;
  public thinInstanceAttributeAt!: (this: this, ...args: Parameters<typeof thinInstanceAttributeAt>) => DynamicSelection;
  public thinInstanceRegisterAttribute!: (this: this, ...args: Parameters<typeof thinInstanceRegisterAttribute>) => DynamicSelection;
  public thinInstanceMatrixAt!: (this: this, ...args: Parameters<typeof thinInstanceMatrixAt>) => DynamicSelection;
  public thinInstanceMatrixFor!: (this: this, ...args: Parameters<typeof thinInstanceMatrixFor>) => DynamicSelection;
  public thinInstancePositionAt!: (this: this, ...args: Parameters<typeof thinInstancePositionAt>) => DynamicSelection;
  public thinInstanceScalingAt!: (this: this, ...args: Parameters<typeof thinInstanceScalingAt>) => DynamicSelection;
  public thinInstanceRotationAt!: (this: this, ...args: Parameters<typeof thinInstanceRotationAt>) => DynamicSelection;
  public thinInstanceColorAt!: (this: this, ...args: Parameters<typeof thinInstanceColorAt>) => DynamicSelection;
  public thinInstancePositionFor!: (this: this, ...args: Parameters<typeof thinInstancePositionFor>) => DynamicSelection;
  public thinInstanceScalingFor!: (this: this, ...args: Parameters<typeof thinInstanceScalingFor>) => DynamicSelection;
  public thinInstanceRotationFor!: (this: this, ...args: Parameters<typeof thinInstanceRotationFor>) => DynamicSelection;
  public thinInstanceColorFor!: (this: this, ...args: Parameters<typeof thinInstanceColorFor>) => DynamicSelection;
  public bindThinInstance!: (this: this, ...args: Parameters<typeof bindThinInstance>) => DynamicSelection;
  public transition!: (this: this, ...args: Parameters<typeof transition>) => DynamicSelection;
  public tween!: (this: this, ...args: Parameters<typeof tween>) => DynamicSelection;
  public stopTransitions!: (this: this, ...args: Parameters<typeof stopTransitions>) => DynamicSelection;
  public resetTransitions!: (this: this, ...args: Parameters<typeof resetTransitions>) => DynamicSelection;
  public resetStopTransitions!: (this: this, ...args: Parameters<typeof resetStopTransitions>) => DynamicSelection;
  public pauseTransitions!: (this: this, ...args: Parameters<typeof pauseTransitions>) => DynamicSelection;
  public restartTransitions!: (this: this, ...args: Parameters<typeof restartTransitions>) => DynamicSelection;
  public endTransitions!: (this: this, ...args: Parameters<typeof endTransitions>) => DynamicSelection;
  public stopTweens!: (this: this, ...args: Parameters<typeof stopTweens>) => DynamicSelection;
  public bindClone!: (this: this, ...args: Parameters<typeof bindClone>) => DynamicSelection;

}

// Assign implementations to the Selection prototype
// This ensures the methods are available while maintaining proper types
Selection.prototype.select = select;
Selection.prototype.selectName = selectName;
Selection.prototype.selectId = selectId;
Selection.prototype.selectTag = selectTag;
Selection.prototype.selectData = selectData;
Selection.prototype.bind = bind;
Selection.prototype.run = run;
Selection.prototype.bindInstance = bindInstance;
Selection.prototype.positionX = positionX;
Selection.prototype.positionY = positionY;
Selection.prototype.positionZ = positionZ;
Selection.prototype.rotationX = rotationX;
Selection.prototype.rotationY = rotationY;
Selection.prototype.rotationZ = rotationZ;
Selection.prototype.scalingX = scalingX;
Selection.prototype.scalingY = scalingY;
Selection.prototype.scalingZ = scalingZ;
Selection.prototype.get = get;
Selection.prototype.attr = attr;
Selection.prototype.addTags = addTags;
Selection.prototype.removeTags = removeTags;
Selection.prototype.hasTags = hasTags;
Selection.prototype.action = action;
Selection.prototype.behavior = behavior;
Selection.prototype.registerInstancedBuffer = registerInstancedBuffer;
Selection.prototype.setInstancedBuffer = setInstancedBuffer;
Selection.prototype.dispose = dispose;
Selection.prototype.diffuseTexture = diffuseTexture;
Selection.prototype.specularTexture = specularTexture;
Selection.prototype.emissiveTexture = emissiveTexture;
Selection.prototype.ambientTexture = ambientTexture;
Selection.prototype.scaleDT = scaleDT;
Selection.prototype.scaleToDT = scaleDT;
Selection.prototype.drawTextDT = drawTextDT;
Selection.prototype.boundingBox = boundingBox;
Selection.prototype.filter = filter;
Selection.prototype.props = props;
Selection.prototype.prop = prop;
Selection.prototype.metadata = metadata;
Selection.prototype.positionUI = positionUI;
Selection.prototype.scaleUI = scaleUI;
Selection.prototype.rotateUI = rotateUI;
Selection.prototype.thinInstanceSetBuffer = thinInstanceSetBuffer;
Selection.prototype.thinInstancePosition = thinInstancePosition;
Selection.prototype.thinInstanceScaling = thinInstanceScaling;
Selection.prototype.thinInstanceRotation = thinInstanceRotation;
Selection.prototype.thinInstanceColor = thinInstanceColor;
Selection.prototype.thinInstanceSetAttribute = thinInstanceSetAttribute;
Selection.prototype.thinInstanceAttributeAt = thinInstanceAttributeAt;
Selection.prototype.thinInstanceRegisterAttribute = thinInstanceRegisterAttribute;
Selection.prototype.thinInstanceMatrixAt = thinInstanceMatrixAt;
Selection.prototype.thinInstanceMatrixFor = thinInstanceMatrixFor;
Selection.prototype.thinInstancePositionAt = thinInstancePositionAt;
Selection.prototype.thinInstanceScalingAt = thinInstanceScalingAt;
Selection.prototype.thinInstanceRotationAt = thinInstanceRotationAt;
Selection.prototype.thinInstanceColorAt = thinInstanceColorAt;
Selection.prototype.thinInstancePositionFor = thinInstancePositionFor;
Selection.prototype.thinInstanceScalingFor = thinInstanceScalingFor;
Selection.prototype.thinInstanceRotationFor = thinInstanceRotationFor;
Selection.prototype.thinInstanceColorFor = thinInstanceColorFor;
Selection.prototype.bindThinInstance = bindThinInstance;
Selection.prototype.transition = transition;
Selection.prototype.tween = tween;
Selection.prototype.stopTransitions = stopTransitions;
Selection.prototype.resetTransitions = resetTransitions;
Selection.prototype.resetStopTransitions = resetStopTransitions;
Selection.prototype.pauseTransitions = pauseTransitions;
Selection.prototype.restartTransitions = restartTransitions;
Selection.prototype.endTransitions = endTransitions;
Selection.prototype.stopTweens = stopTweens;
Selection.prototype.bindClone = bindClone;

// Declaration merging to add dynamic properties to Selection class
export interface Selection extends DynamicProperties {}


// Re-export types for convenience
export type { 
  DynamicProperties, 
  PropertyAccessor, 
  DynamicPropertyFunction,
  AllBabylonProperties 
} from './base-types';

