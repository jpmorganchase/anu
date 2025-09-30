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
export function selectName(name: string | string[], scene: Scene): Selection {
  let selected: Node[] = [];
  Array.isArray(name)
    ? name.forEach((e, i) => (selected = [...selected, ...scene.getNodes().filter((node) => node.name == e)]))
    : (selected = scene.getNodes().filter((node) => node.name == name));
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
export function selectId(id: string | string[], scene: Scene): Selection {
  let selected: Node[] = [];
  Array.isArray(id)
    ? id.forEach((e, i) => (selected = [...selected, ...scene.getNodes().filter((node) => node.name == e)]))
    : (selected = scene.getNodes().filter((node) => node.id == id));
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
export function selectTag(tag: string | string[], scene: Scene): Selection {
  let selected: Node[] = [];
  Array.isArray(tag)
    ? tag.forEach(
        (e, i) => (selected = [...selected, ...scene.getNodes().filter((node) => Tags.MatchesQuery(node, e) == true)]),
      )
    : (selected = scene.getNodes().filter((node) => Tags.MatchesQuery(node, tag) == true));
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
export function selectData(key: string | string[], value: string | number | string[] | number[], scene?: Scene, useAndLogic?: boolean): Selection {
  scene ??= Engine.LastCreatedScene;
  useAndLogic ??= false; 

  let selected: Node[] = [];
  if (Array.isArray(key) && Array.isArray(value)) {
    if (useAndLogic) {
      const kvps = Object.fromEntries(key.map((key, index) => [key, value[index]]));
      scene.getNodes().forEach((node, idx) => {
        if (node.metadata != null && Object.entries(kvps).every(([k, v]) => node.metadata.data[k] === v)) {
          selected.push(node);
        }
      });
    }
    else {
      let nodes = scene.getNodes().reverse();
      key.forEach((e, i) => {
        for (let j = nodes.length - 1; j >= 0; j--) {
          if (nodes[j].metadata != null && nodes[j].metadata.data[e] == value[i]) {
            selected.push(...nodes.splice(j, 1));
          }
        }
      });
    }
  }
  else {
    selected = scene.getNodes()
                    .filter((node) => node.metadata != null && node.metadata.data[key as string] == value);
  }
  
  return new Selection(selected, scene);
}
