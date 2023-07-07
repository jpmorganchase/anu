/**
 * TODO
 */
import { AbstractMesh } from '@babylonjs/core';
export function action(action) {
    this.selected.forEach((node) => {
        var _a, _b;
        node instanceof AbstractMesh
            ? action instanceof Function
                ? (_a = node.actionManager) === null || _a === void 0 ? void 0 : _a.registerAction(action(node))
                : (_b = node.actionManager) === null || _b === void 0 ? void 0 : _b.registerAction(action)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
