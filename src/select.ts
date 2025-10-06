// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Engine } from '@babylonjs/core/Engines';
import { Node } from '@babylonjs/core/node';
import { Scene } from '@babylonjs/core/scene';
import { Tags } from '@babylonjs/core/Misc/tags';
import { Selection } from './selection/index';

/**
 * Select all nodes from the scene graph matching the indicator and return them as a
 * instance of Selection.
 *
 * @param name The prefix and text of the selection, selection types include: .\<name>, #\<id>, $\<tags>.
 * @param scene The babylon scene the to select from.
 * @returns an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function select(name: string, scene: Scene): Selection {
  let indicator = name[0];
  let text = name.slice(1);
  let selected = [];
  if (indicator === '.') {
    selected = scene.getNodes().filter((node) => node.name == text);
    return new Selection(selected, scene);
  } else if (indicator === '#') {
    selected = scene.getNodes().filter((node) => node.id == text);
    return new Selection(selected, scene);
  } else if (indicator === '$') {
    selected = scene.getNodes().filter((node) => Tags.MatchesQuery(node, text) == true);
    return new Selection(selected, scene);
  }

  return new Selection([], scene);
}

/**
 * Select all nodes from the scene graph matching the given name(s) and return them as a
 * instance of Selection.
 *
 * @param name the name or list of names of the nodes to be selected
 * @param scene The babylon scene the to select from.
 * @returns an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function selectName(name: string | string[], scene: Scene) {
  let selected: Node[] = [];
  
  if (Array.isArray(name)) {
    // Create a Map for O(1) lookup and automatic deduplication
        const nameSet = new Set(name);

    
    // Single pass through nodes
    selected = scene.getNodes().filter(node => nameSet.has(node.name));
  } else {
    selected = scene.getNodes().filter(node => node.name === name);
  }
  
  return new Selection(selected, scene);
}

/**
 * Select all nodes from the scene graph matching the given ID(s) and return them as a
 * instance of Selection.
 *
 * @param id the ID or list of IDs of the nodes to be selected
 * @param scene The babylon scene the to select from.
 * @returns an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function selectId(id: string | string[], scene: Scene) {
  let selected: Node[] = [];
  
  if (Array.isArray(id)) {
    // Create a Set for O(1) lookup and automatic deduplication
    const idSet = new Set(id);
    
    // Single pass through nodes
    selected = scene.getNodes().filter(node => idSet.has(node.id));
  } else {
    selected = scene.getNodes().filter(node => node.id === id);
  }
  
  return new Selection(selected, scene);
}

/**
 * Select all nodes from the scene graph matching the given tag(s) and return them as a
 * instance of Selection.
 *
 * @param tag the tag and tag logic or list of tags of the nodes to be selected
 * @param scene The babylon scene the to select from.
 * @returns an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function selectTag(tag: string | string[], scene: Scene) {
  let selected: Node[] = [];
  
  if (Array.isArray(tag)) {
    // Create a Set for O(1) lookup and automatic deduplication
    const tagSet = new Set(tag);
    
    // Single pass through nodes, checking if any tag matches
    selected = scene.getNodes().filter(node => 
      Array.from(tagSet).some(tagValue => Tags.MatchesQuery(node, tagValue))
    );
  } else {
    selected = scene.getNodes().filter(node => Tags.MatchesQuery(node, tag));
  }
  
  return new Selection(selected, scene);
}

/**
 * Select all nodes from the scene graph with binded data matching the given key value pairs and return them as a
 * instance of Selection.
 *
 * @param key the key or list of keys of the nodes to be selected.
 * @param value the value or list of values corresponding to the respective key(s) passed.
 * @param scene The babylon scene the to select from. Defaults to the last created scene if undefined.
 * @param useAndLogic If true, all keys and values must exist and match to be selected. Defaults to false.
 * @returns an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function selectData(key: string | string[], value: string | number | string[] | number[], scene?: Scene, useAndLogic?: boolean) {
  scene ??= Engine.LastCreatedScene;
  useAndLogic ??= false; 

  let selected: Node[] = [];
  
  if (Array.isArray(key) && Array.isArray(value)) {
    if (useAndLogic) {
      // AND logic: all key-value pairs must match
      const kvps = Object.fromEntries(key.map((key, index) => [key, value[index]]));
      selected = scene.getNodes().filter(node => {
        if (node.metadata?.data == null) return false;
        return Object.entries(kvps).every(([k, v]) => node.metadata.data[k] === v);
      });
    } else {
      // OR logic: any key-value pair can match
      const kvPairs = key.map((k, index) => ({ key: k, value: value[index] }));
      
      selected = scene.getNodes().filter(node => {
        if (node.metadata?.data == null) return false;
        return kvPairs.some(({ key: k, value: v }) => node.metadata.data[k] === v);
      });
    }
  } else if (Array.isArray(value)) {
    // Single key with multiple values
    const valueSet = new Set<string | number>(value);
    
    selected = scene.getNodes().filter(node => {
      if (node.metadata?.data == null) return false;
      return valueSet.has(node.metadata.data[key as string]);
    });
  } else {
    // Single key-value pair
    selected = scene.getNodes().filter(node => {
      if (node.metadata?.data == null) return false;
      return node.metadata.data[key as string] === value;
    });
  }
  
  return new Selection(selected, scene);
}
