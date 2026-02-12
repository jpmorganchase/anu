// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

/**
 * TODO
 */
import { Tags } from '@babylonjs/core';
import { Selection } from '../index';

export function addTags(this: Selection, tags: string | ((d: any, i: number) => string)) {
  this.selected.forEach((node, i) => {
    let tag = tags instanceof Function ? tags(node.metadata.data, i) : tags;
    Tags.AddTagsTo(node, tag);
  });
  return this;
}

export function removeTags(this: Selection, tags: string) {
  this.selected.forEach((node) => Tags.RemoveTagsFrom(node, tags));
  return this;
}

export function hasTags(this: Selection, query?: string) {
  let values: Object[] = [];
  this.selected.forEach((node) => {
    query === undefined
      ? values.push({ node: node, value: Tags.HasTags(node) })
      : values.push({ node: node, value: Tags.MatchesQuery(node, query) });
  });
  return values;
}
