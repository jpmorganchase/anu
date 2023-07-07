import { Vector3, Mesh, Color3, StandardMaterial } from '@babylonjs/core';
import { assign } from 'lodash-es';
export function shape(options = {}, properties = {}) {
    const domain = this.scale.domain();
    let range = this.scale.range();
    range = [range[0], range[range.length - 1]];
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    try {
        ticks = this.scale.ticks();
    }
    catch (_a) {
        ticks = domain;
    }
    let boundingBox = this.boundingBox;
    let path = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
    let tubePosition = new Vector3(0, 0, 0);
    switch (this.axis) {
        case 'x': {
            path = [
                new Vector3(Math.min(range[0], boundingBox.minimum.x), 0, 0),
                new Vector3(Math.max(range[1], boundingBox.maximum.x), 0, 0),
            ];
            tubePosition = new Vector3(0, Math.min(range[0], boundingBox.minimum.y), Math.min(range[0], boundingBox.minimum.z));
            break;
        }
        case 'y': {
            path = [new Vector3(0, boundingBox.minimum.y, 0), new Vector3(0, boundingBox.maximum.y, 0)];
            tubePosition = new Vector3(Math.min(range[0], boundingBox.minimum.x), 0, Math.min(range[0], boundingBox.minimum.z));
            break;
        }
        case 'z': {
            path = [
                new Vector3(0, 0, Math.min(range[0], boundingBox.minimum.z)),
                new Vector3(0, 0, Math.max(range[1], boundingBox.maximum.z)),
            ];
            tubePosition = new Vector3(Math.max(range[1], boundingBox.maximum.x), Math.min(range[0], boundingBox.minimum.y), 0);
            break;
        }
        default: {
            break;
        }
    }
    let default_options = { path: path, radius: 0.5, cap: 2, sideOrientation: Mesh.DOUBLESIDE };
    let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };
    let shapeMesh = this.cot
        .bind('tube', assign({}, default_options, options))
        .attr('name', this.name + '_shape')
        .position(tubePosition)
        .material(new StandardMaterial(name + '_material', this.scene))
        .props(assign({}, default_properties, properties));
    return this;
}
export function shapeAlt(options = {}, properties = {}) {
    if (this.options.x != undefined) {
        let scaleX = this.options.x;
        let range = scaleX.range();
        range = [range[0], range.slice(-1)];
        let pathX = [
            new Vector3(range[0], 0, 0),
            new Vector3(range[1], 0, 0),
        ];
        let tubePositionX = new Vector3(0, range[0], range[0]);
        let default_options = { path: pathX, radius: 0.1, cap: 2, sideOrientation: Mesh.DOUBLESIDE };
        let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };
        let shapeMeshX = this.CoT
            .bind('tube', assign({}, default_options, options))
            .attr('name', this.name + '_shapeX')
            .position(tubePositionX)
            .material(new StandardMaterial(this.name + '_shapeX_material', this.scene))
            .props(assign({}, default_properties, properties));
    }
    if (this.options.y != undefined) {
        console.log('hello');
        let scaleY = this.options.y;
        let range = scaleY.range();
        range = [range[0], range.slice(-1)];
        let pathY = [new Vector3(0, range[0], 0), new Vector3(0, range[1], 0)];
        let tubePositionY = new Vector3(range[0], 0, range[0]);
        let default_options = { path: pathY, radius: 0.1, cap: 2, sideOrientation: Mesh.DOUBLESIDE };
        let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };
        let shapeMeshY = this.CoT
            .bind('tube', assign({}, default_options, options))
            .attr('name', this.name + '_shapeY')
            .position(tubePositionY)
            .material(new StandardMaterial(this.name + '_shapeY_material', this.scene))
            .props(assign({}, default_properties, properties));
    }
    if (this.options.z != undefined) {
        let scaleZ = this.options.z;
        let range = scaleZ.range();
        range = [range[0], range.slice(-1)];
        let pathZ = [new Vector3(0, 0, range[0]), new Vector3(0, 0, range[1])];
        let tubePositionZ = new Vector3(range[1], range[0], range[0] + (Math.abs(range[1] - range[0]) / 2));
        let default_options = { path: pathZ, radius: 0.1, cap: 2, sideOrientation: Mesh.DOUBLESIDE };
        let default_properties = { 'material.diffuseColor': Color3.White, 'material.alpha': 1 };
        let shapeMesh = this.CoT
            .bind('tube', assign({}, default_options, options))
            .attr('name', this.name + '_shapeZ')
            .position(tubePositionZ)
            .material(new StandardMaterial(this.name + '_shapeZ_material', this.scene))
            .props(assign({}, default_properties, properties));
    }
}
