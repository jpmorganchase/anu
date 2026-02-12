// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Selection } from '../index';

/**
 * Disposes all nodes in the selection, freeing up resources and removing them from the scene.
 * 
 * @param filter - Optional filter function to selectively dispose nodes. Only nodes where the filter returns true will be disposed.
 * @param doNotRecurse - If true, prevents recursive disposal of child nodes. Defaults to false.
 * @param disposeMaterialAndTextures - If true, also disposes materials and textures associated with the nodes. Defaults to false.
 * @returns The current Selection instance for method chaining.
 * 
 * @example
 * ```typescript
 * // Dispose all nodes in the selection
 * selection.dispose();
 * 
 * // Dispose only specific nodes using a filter
 * selection.dispose((d, i) => i > 5);
 * 
 * // Dispose without recursing to children
 * selection.dispose(undefined, true);
 * 
 * // Dispose including materials and textures
 * selection.dispose(undefined, false, true);
 * ```
 */
export function dispose(this: Selection, filter?: (d: any, i: number) => Boolean, doNotRecurse?: boolean, disposeMaterialAndTextures?: boolean) {
  this.selected.forEach((node, i) => {
    filter != undefined ? (filter(node, i) ? node.dispose(doNotRecurse, disposeMaterialAndTextures) : '') : node.dispose(doNotRecurse, disposeMaterialAndTextures);
  });
  return this;
}
