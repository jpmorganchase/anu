import { Selection } from '../index';
export declare function addTags(this: Selection, tags: string | ((d: any, i: number) => string)): Selection;
export declare function removeTags(this: Selection, tags: string): Selection;
export declare function hasTags(this: Selection, query?: string): Object[];
