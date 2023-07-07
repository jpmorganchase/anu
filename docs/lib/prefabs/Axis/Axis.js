import { TransformNode } from '@babylonjs/core';
import { Selection } from '../../selection';
import { shape, shapeAlt } from './shape';
import { label } from './label';
import { background } from './background';
import { ticks } from './ticks';
import { select } from '../../select';
export class Axis {
    constructor(selection, name, axis, scale) {
        this.shape = shape;
        this.label = label;
        this.background = background;
        this.ticks = ticks;
        this.selection = selection;
        this.name = name;
        this.axis = axis;
        this.scale = scale;
        this.scene = this.selection.scene;
        this.cot = new Selection([this.selection.selected[0].parent], this.scene);
        this.selections = {};
        this.boundingBox = this.selection.boundingBox();
    }
}
export class AxisAlt {
    // background: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
    // shape: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
    // label: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
    // majorTick: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
    // minorTick: {'x': Selection | null, 'y': Selection | null, 'z': Selection | null} | null;
    constructor(name, scene, options = {}) {
        this.shape = shapeAlt;
        this.name = name;
        //this.selection = selection;
        this.options = options;
        this.scene = scene;
        this.CoT = this.setCoT();
    }
    setCoT() {
        let CoT;
        if (this.options.cot === undefined) {
            new TransformNode(this.name + 'CoT', this.scene);
            CoT = select('#' + this.name + 'CoT', this.scene);
        }
        else {
            CoT = this.options.cot.bind('cot').prop('name', this.name + 'CoT');
        }
        return CoT;
    }
}
