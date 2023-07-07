import { Selection } from '../index';
/**
 * Filters a seclection based on the function provided
 *
 * @param method A function with two parameters d (the binded data) and i (the index) that returns a boolean.
 * @returns The modified selection
 */
export declare function filter(this: Selection, method: (d: any, i: number) => boolean): Selection;
