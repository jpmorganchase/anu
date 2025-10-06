// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node, Tags } from '@babylonjs/core';
import { Selection } from '../index';

/**
 *Select all nodes from the children graph(s) of selected
 *matching the indicator and return it as a instance of Selection.
 *
 *selection types;
 *.\<Name> : select by Name
 *#\<ID> : select by ID
 *$\<Tags> : select by tags
 */
export function select(this: Selection, name: string): Selection {
  let indicator = name[0];
  let text = name.slice(1);
  let selected: any = [];

  if (indicator === '.') {
    this.selected.forEach((element) => (selected = selected.concat(element?.getChildren((node) => node.name == text, false))));
    return new Selection(selected, this.scene);
  } else if (indicator === '#') {
    this.selected.forEach((element) => (selected = selected.concat(element?.getChildren((node) => node.id == text, false))));
    return new Selection(selected, this.scene);
  } else if (indicator === '$') {
    this.selected.forEach(
      (element) => (selected = selected.concat(element?.getChildren((node) => Tags.MatchesQuery(node, text) == true, false))),
    );
    return new Selection(selected, this.scene);
  }

  return new Selection([], this.scene);
}

/**
 * Select nodes from the children graph(s) of a selection by name or list of names and return them as a instance of Selection.
 *
 * @param name A string or array of strings of the names of the nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectName(this: Selection, name: string | string[]): Selection {
  let selected: Node[] = [];
  
  if (Array.isArray(name)) {
    // Create a Set for O(1) lookup and automatic deduplication
    const nameSet = new Set(name);
    
    // Get all children from selected elements and filter by names in the set
    this.selected.forEach(element => {
      const children = element?.getChildren((node) => nameSet.has(node.name), false) || [];
      selected = selected.concat(children);
    });
  } else {
    this.selected.forEach(element => {
      const children = element?.getChildren((node) => node.name === name, false) || [];
      selected = selected.concat(children);
    });
  }
  
  return new Selection(selected, this.scene);
}

/**
 * Select nodes from the children graph(s) of a selection by ID or list of IDs and return them as a instance of Selection.
 *
 * @param id A string or array of strings of ids of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectId(this: Selection, id: string | string[]): Selection {
  let selected: Node[] = [];
  
  if (Array.isArray(id)) {
    // Create a Set for O(1) lookup and automatic deduplication
    const idSet = new Set(id);
    
    // Get all children from selected elements and filter by IDs in the set
    this.selected.forEach(element => {
      const children = element?.getChildren((node) => idSet.has(node.id), false) || [];
      selected = selected.concat(children);
    });
  } else {
    this.selected.forEach(element => {
      const children = element?.getChildren((node) => node.id === id, false) || [];
      selected = selected.concat(children);
    });
  }
  
  return new Selection(selected, this.scene);
}

/**
 * Select nodes from the children graph(s) of a selection by tag or list of tags and return them as a instance of Selection.
 *
 * @param tag A string or array of strings of tags or tag unions of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectTag(this: Selection, tag: string | string[]): Selection {
  let selected: Node[] = [];
  
  if (Array.isArray(tag)) {
    // Create a Set for O(1) lookup and automatic deduplication
    const tagSet = new Set(tag);
    
    // Get all children from selected elements and filter by tags in the set
    this.selected.forEach(element => {
      const children = element?.getChildren((node) => 
        Array.from(tagSet).some(tagValue => Tags.MatchesQuery(node, tagValue))
      , false) || [];
      selected = selected.concat(children);
    });
  } else {
    this.selected.forEach(element => {
      const children = element?.getChildren((node) => Tags.MatchesQuery(node, tag), false) || [];
      selected = selected.concat(children);
    });
  }
  
  return new Selection(selected, this.scene);
}

/**
 * Select nodes from the children graph(s) of a selection by key value pairs or list of key value pairs and return them as a instance of Selection.
 *
 * @param key A string or array of strings of the keys to be searched.
 * @param name A string or number or array of strings or numbers of key values of nodes to be selected.
 * @param useAndLogic If true, all keys and values must exist and match to be selected. Defaults to false.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectData(this: Selection, key: string | string[], value: string | number | string[] | number[], useAndLogic?: boolean): Selection {
  let selected: Node[] = [];
  useAndLogic ??= false;

  // Get all nodes from selected elements and their children
  const getAllNodes = (): Node[] => {
    return [...this.selected, ...this.selected.flatMap((element) => element.getChildren(undefined, false))];
  };

  if (Array.isArray(key) && Array.isArray(value)) {
    if (useAndLogic) {
      // AND logic: all key-value pairs must match
      const kvps = Object.fromEntries(key.map((key, index) => [key, value[index]]));
      selected = getAllNodes().filter(node => {
        if (node.metadata?.data == null) return false;
        return Object.entries(kvps).every(([k, v]) => node.metadata.data[k] === v);
      });
    } else {
      // OR logic: any key-value pair can match
      const kvPairs = key.map((k, index) => ({ key: k, value: value[index] }));
      
      selected = getAllNodes().filter(node => {
        if (node.metadata?.data == null) return false;
        return kvPairs.some(({ key: k, value: v }) => node.metadata.data[k] === v);
      });
    }
  } else if (Array.isArray(value)) {
    // Single key with multiple values
    const valueSet = new Set<string | number>(value);
    
    selected = getAllNodes().filter(node => {
      if (node.metadata?.data == null) return false;
      return valueSet.has(node.metadata.data[key as string]);
    });
  } else {
    // Single key-value pair
    selected = getAllNodes().filter(node => {
      if (node.metadata?.data == null) return false;
      return node.metadata.data[key as string] === value;
    });
  }
  
  return new Selection(selected, this.scene);
}
