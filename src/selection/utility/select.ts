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
  Array.isArray(name)
    ? name.forEach((e, i) =>
        this.selected.forEach(
          (element) => (selected = selected.concat(element?.getChildren((node) => node.name == e, false))),
        ),
      )
    : this.selected.forEach(
        (element) => (selected = selected.concat(element?.getChildren((node) => node.name == name, false))),
      );
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
  Array.isArray(id)
    ? id.forEach((e, i) =>
        this.selected.forEach((element) => (selected = selected.concat(element?.getChildren((node) => node.id == e, false)))),
      )
    : this.selected.forEach((element) => (selected = selected.concat(element?.getChildren((node) => node.id == id, false))));
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
  Array.isArray(tag)
    ? tag.forEach((e, i) =>
        this.selected.forEach(
          (element) => (selected = selected.concat(element?.getChildren((node) => Tags.MatchesQuery(node, e) == true))),
        ),
      )
    : this.selected.forEach(
        (element) => (selected = selected.concat(element?.getChildren((node) => Tags.MatchesQuery(node, tag) == true))),
      );
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

  if (Array.isArray(key) && Array.isArray(value)) {
    if (useAndLogic) {
      const kvps = Object.fromEntries(key.map((key, index) => [key, value[index]]));
      let nodes = [...this.selected, ...this.selected.flatMap((element) => [element, ...element.getChildren(undefined, false)])];
      nodes.forEach((node, idx) => {
        if (node.metadata != null && Object.entries(kvps).every(([k, v]) => node.metadata.data[k] === v)) {
          selected.push(node);
        }
      });
    }
    else {
      let nodes = [...this.selected, ...this.selected.flatMap((element) => [element, ...element.getChildren(undefined, false)])];
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
    this.selected.forEach((element) =>
      (selected = [...selected, ...element.getChildren(undefined, false)]
                    .filter((node) => node.metadata != null && node.metadata.data[key as string] == value))
    );
  }
  return new Selection(selected, this.scene);
}
