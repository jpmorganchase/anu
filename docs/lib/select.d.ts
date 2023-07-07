import { Scene } from '@babylonjs/core/scene';
import { Selection } from './selection/index';
/**
 * Select all nodes from the scene graph matching the indicator and return it as a
 * instance of Selection.
 *
 * @param name The prefix and text of the selection, selection types include: .\<name>, #\<id>, $\<tags>.
 * @param scene The babylon scene the to select from.
 * @returns an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export declare function select(name: string, scene: Scene): Selection;
export declare function selectName(name: string | string[], scene: Scene): Selection;
export declare function selectId(id: string | string[], scene: Scene): Selection;
export declare function selectTag(tag: string | string[], scene: Scene): Selection;
export declare function selectData(key: string | string[], value: string | number | string[] | number[], scene: Scene): Selection;
