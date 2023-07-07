import { Selection } from '../index';
/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", and the index "i".
 * @returns The modified selection
 */
export declare function attr(this: Selection, accessor: string, value: any): Selection;
/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", and the index "i".
 * @returns The modified selection
 */
export declare function prop(this: Selection, accessor: string, value: any): Selection;
export declare function props(this: Selection, properties: {}): Selection;
