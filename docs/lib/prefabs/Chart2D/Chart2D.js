import { StandardMaterial, TransformNode } from '@babylonjs/core';
import { Selection } from '../../selection';
export class Chart2D {
    constructor(name, scene) {
        this.name = name;
        this.scene = scene;
        this.cot = new Selection([new TransformNode(name + '_cot', scene)], scene);
    }
    makeBackground(height, width, padding, color, backgroundAlpha) {
        this.height = height;
        this.width = width;
        this.padding = padding;
        let background = this.cot
            .bind('plane', { height: height, width: width })
            .material((d, i) => new StandardMaterial(this.name + '_backgroundMaterial', this.scene))
            .diffuseColor((d) => color)
            .attr('material.backFaceCulling', false)
            .attr('material.alpha', backgroundAlpha);
        this.background = { backgroundPlane: background };
        return this;
    }
}
