import { Color3, Vector3, Mesh } from '@babylonjs/core';
import { Selection } from '../../../selection';
export class Axis {
    constructor(selection, axis, scale) {
        this.selection = selection;
        this.axis = axis;
        this.scale = scale;
        this.scene = this.selection.scene;
        this.cot = new Selection([this.selection.selected[0].parent], this.scene);
    }
}
export class PipeAxis extends Axis {
    makeAxis(options) {
        this.padding = options.padding;
        let radius = options.radius;
        const domain = this.scale.domain();
        let range = this.scale.range();
        range = [range.at(0), range.at(-1)];
        let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
        try {
            ticks = this.scale.ticks();
        }
        catch (_a) {
            ticks = domain;
        }
        let boundingBox = this.selection.boundingBox(); //get the bounding box of the selction
        let path = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
        let tubePosition = new Vector3(0, 0, 0);
        switch (this.axis) {
            case 'x': {
                path = [
                    new Vector3(Math.min(range[0], boundingBox.minimum.x), 0, 0),
                    new Vector3(Math.max(range[1], boundingBox.maximum.x), 0, 0),
                ];
                tubePosition = new Vector3(0 + this.padding.x, boundingBox.minimum.y + this.padding.y, boundingBox.minimum.z + this.padding.z);
                break;
            }
            case 'y': {
                path = [new Vector3(0, boundingBox.minimum.y, 0), new Vector3(0, boundingBox.maximum.y, 0)];
                tubePosition = new Vector3(boundingBox.minimum.x + this.padding.x, 0 + this.padding.y, boundingBox.minimum.z + this.padding.z);
                break;
            }
            case 'z': {
                path = [
                    new Vector3(0, 0, Math.min(range[0], boundingBox.minimum.z)),
                    new Vector3(0, 0, Math.max(range[1], boundingBox.maximum.z)),
                ];
                tubePosition = new Vector3(boundingBox.minimum.x + this.padding.x, boundingBox.minimum.y + this.padding.y, 0 + this.padding.z);
                break;
            }
            default: {
                break;
            }
        }
        console.log(tubePosition);
        var mesh = this.cot
            .bind('tube', { path: path, radius: radius, cap: 2, sideOrientation: Mesh.DOUBLESIDE })
            .position(tubePosition);
        return this;
    }
    makeTicks(color, alpha) {
        return this;
    }
}
export function createPipeAxis(axis, scale, options = { radius: 1, meshColor: new Color3(0, 0, 0), meshAlpha: 1, padding: new Vector3(0, 0, 0) }) {
    const radius = options.radius || 1;
    const meshColor = options.meshColor || new Color3(0, 0, 0);
    const meshAlpha = options.meshAlpha || 1;
    //const paddingX = options.padding!.x || 0;
    //const paddingY = options.padding!.y || 0;
    //const paddingZ = options.padding!.z || 0;
    const padding = options.padding || new Vector3(0, 0, 0);
    let pipeAxis = new PipeAxis(this, axis, scale);
    pipeAxis.makeAxis({ radius: radius, color: meshColor, alpha: meshAlpha, padding: padding });
    return pipeAxis;
}
