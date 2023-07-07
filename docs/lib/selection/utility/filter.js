import { Selection } from '../index';
/**
 * Filters a seclection based on the function provided
 *
 * @param method A function with two parameters d (the binded data) and i (the index) that returns a boolean.
 * @returns The modified selection
 */
export function filter(method) {
    let filtered = [];
    this.selected.forEach((node, i) => {
        if (method(node.metadata.data, i))
            filtered.push(node);
    });
    return new Selection(filtered, this.scene);
}
