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
import { evaluatePropertyPath } from '../utils/objects';
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
  
  // Store proxy reference for use in methods
  private proxyRef!: Selection;

  // Index signature to allow dynamic properties
  [K: string]: any;

  constructor(nodes: Node[], scene?: Scene) {
    this.selected = nodes;
    this.scene = scene;
    this.transitions = [];

    // Create and return the proxy
    const proxy = new Proxy(this, {
      get: (target, prop, receiver) => this.proxyGet(target, prop, receiver),
      set: (target, prop, value, receiver) => this.proxySet(target, prop, value, receiver)
    });
    this.proxyRef = proxy as Selection;
    return this.proxyRef;
  }

  /**
   * Proxy get handler - main entry point for property access
   */
  private proxyGet(target: Selection, prop: string | symbol, receiver: any): any {
    if (typeof prop === 'symbol') {
      return Reflect.get(target, prop, receiver);
    }

    // Check for stored property path to build nested paths
    if (target.propertyPath) {
      return this.handleNestedPath(target, prop);
    }

    // Check if the property exists on the Selection class
    if (prop in target) {
      return Reflect.get(target, prop);
    }

    // Check if the property exists on any of the selected nodes
    if (this.nodeHasPropertyPath(prop)) {
      return this.createProxyMethod(prop, false);
    }

    return undefined;
  }

  /**
   * Proxy set handler
   */
  private proxySet(target: Selection, prop: string | symbol, value: any, receiver: any): boolean {
    if (prop in target || typeof prop === 'symbol') {
      return Reflect.set(target, prop, value, receiver);
    }
    throw new Error(`Cannot assign to property '${String(prop)}'. Use method calls like .${String(prop)}(value) instead.`);
  }

  /**
   * Handle nested path resolution in proxy get
   */
  private handleNestedPath(target: Selection, prop: string): any {
    const newPath = `${target.propertyPath}.${prop}`;
    
    if (this.nodeHasPropertyPath(newPath)) {
      return this.createProxyMethod(newPath, true);
    }
    
    target.propertyPath = '';
    
    if (prop in target) {
      return Reflect.get(target, prop);
    }
    
    throw new Error(`Property path '${newPath}' does not exist on the selected nodes.`);
  }

  /**
   * Factory function to create proxy methods for dynamic property access
   */
  private createProxyMethod(accessor: string, isNestedPath: boolean): any {
    const self = this;
    
    const methodHandler = function(...args: any[]) {
      if (args.length > 0) {
        const value = args.length === 1 ? args[0] : args;
        self.proxyRef.prop(accessor, value);
        self.propertyPath = '';
        return self.proxyRef;
      }
      const propertyValues = self.getPropertyValues(accessor);
      self.propertyPath = '';
      return propertyValues;
    };

    return new Proxy(methodHandler, {
      get: (methodTarget: any, nestedProp: string | symbol) => 
        this.handleNestedPropertyAccess(methodTarget, nestedProp, accessor, isNestedPath)
    });
  }

  /**
   * Handle nested property access in proxy methods
   */
  private handleNestedPropertyAccess(
    methodTarget: any, 
    nestedProp: string | symbol, 
    accessor: string, 
    isNestedPath: boolean
  ): any {
    if (typeof nestedProp === 'symbol') {
      return methodTarget[nestedProp];
    }
    
    if (isNestedPath) {
      const extendedPath = `${accessor}.${nestedProp}`;
      if (this.nodeHasPropertyPath(extendedPath)) {
        this.propertyPath = accessor;
        return this.proxyRef[nestedProp];
      }
      this.propertyPath = '';
      return undefined;
    }
    
    this.propertyPath = accessor;
    return this.proxyRef[nestedProp];
  }

  /**
   * Check if property path exists on any selected nodes
   */
  private nodeHasPropertyPath(path: string): boolean {
    return this.selected.some(node => evaluatePropertyPath(node, path) !== undefined);
  }

  /**
   * Get property values from all selected nodes for a given accessor
   */
  private getPropertyValues(accessor: string): any[] {
    return this.selected.map(node => {
      const value = evaluatePropertyPath(node, accessor);
      return typeof value === 'function' ? value.bind(node) : value;
    });
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

