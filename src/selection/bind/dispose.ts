// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Selection } from '../index';

export function dispose(this: Selection, filter?: (d: any, i: number) => Boolean) {
  this.selected.forEach((node, i) => {
    filter != undefined ? (filter(node, i) ? node.dispose() : '') : node.dispose();
  });
  return this;
}
