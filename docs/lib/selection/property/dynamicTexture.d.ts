import { Selection } from '../index';
export declare function scaleDT(this: Selection, value: number | ((d: any, i: number) => number)): Selection;
export declare function scaleToDT(this: Selection, width: number | ((d: any, i: number) => number), height: number | ((d: any, i: number) => number)): Selection;
export declare function drawTextDT(this: Selection, text: string | ((d: any, i: number) => string), font: string | ((d: any, i: number) => string), x?: number | ((d: any, i: number) => number) | null, y?: number | ((d: any, i: number) => number) | null, color?: string | ((d: any, i: number) => string) | null, clearColor?: string | ((d: any, i: number) => string) | null): Selection;
