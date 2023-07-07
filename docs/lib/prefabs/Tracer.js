import { TransformNode, Color3 } from '@babylonjs/core';
import { Selection } from '../selection';
//selection of the meshes that need to be connected with a line
//make a path through all points
//update path before render
function update() { }
export class Tracer {
    constructor(selection, name, path) {
        this.selection = selection;
        this.name = name;
        this.path = selection.selected.map((d) => {
            d.computeWorldMatrix(true);
            return d.getAbsolutePosition();
        });
    }
    init() {
        let line = new Selection([new TransformNode(this.name + '_cot', this.selection.scene)], this.selection.scene);
        line
            .bind('lines', { points: this.path, updatable: true }, [{}])
            .attr('color', new Color3(1, 1, 1))
            .attr('alpha', 0.2);
    }
}
