import { Selection } from '../index';
/**
 *Select all nodes from the childern graph(s) of selected
 *matching the indicator and return it as a instance of Selection.
 *
 *selection types;
 *.<Name> : select by Name
 *#<ID> : select by ID
 *$<Tags> : select by tags
 */
export declare function select(this: Selection, name: string): Selection;
/**
 * Select nodes from the childern graph(s) of selected by name and return it as a instance of Selection.
 *
 * @param name A string or array of strings of the names of the nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export declare function selectName(this: Selection, name: string | string[]): Selection;
/**
 * Select nodes from the childern graph(s) of selected by id and return it as a instance of Selection.
 *
 * @param id A string or array of strings of ids of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export declare function selectId(this: Selection, id: string | string[]): Selection;
/**
 * Select nodes from the childern graph(s) of selected by tag and return it as a instance of Selection.
 *
 * @param tag A string or array of strings of tags or tag unions of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export declare function selectTag(this: Selection, tag: string | string[]): Selection;
/**
 * Select nodes from the childern graph(s) of selected by data value and return it as a instance of Selection.
 *
 * @param key A string or array of strings of the keys to be searched.
 * @param name A string or number or array of strings or numbers of key values of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export declare function selectData(this: Selection, key: string | string[], value: string | number | string[] | number[]): Selection;
