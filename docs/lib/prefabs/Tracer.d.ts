import { Selection } from '../selection';
export declare class Tracer {
    selection: Selection;
    name: string;
    path: any;
    constructor(selection: Selection, name: string, path: any);
    init(): void;
}
