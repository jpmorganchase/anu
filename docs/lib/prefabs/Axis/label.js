import { Vector3 } from '@babylonjs/core';
export function label(margin = 1) {
    let boundingBox = this.boundingBox;
    const domain = this.scale.domain();
    let range = this.scale.range();
    range = [range[0], range[1]];
    let textPosition = new Vector3(0, 0, 0);
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    try {
        ticks = this.scale.ticks();
    }
    catch (_a) {
        ticks = domain;
    }
    switch (this.axis) {
        case 'x': {
            textPosition = (d) => new Vector3(this.scale(d.text), Math.min(range[0], boundingBox.minimum.y) - margin, Math.min(range[0], boundingBox.minimum.z));
            break;
        }
        case 'y': {
            textPosition = (d) => new Vector3(Math.min(range[0], boundingBox.minimum.x) - margin, this.scale(d.text), Math.min(range[0], boundingBox.minimum.z));
            break;
        }
        case 'z': {
            textPosition = (d) => new Vector3(Math.max(range[1], boundingBox.maximum.x), Math.min(range[0], boundingBox.minimum.y) - margin, this.scale(d.text));
            break;
        }
        default: {
            break;
        }
    }
    let labelMesh = this.cot
        .bind('text2d', { text: (d) => d.text, fontSize: 60, fontColor: 'white' }, ticks.map((x) => {
        return { text: x };
    }))
        .attr('name', this.name + '_label')
        .position(textPosition);
    //this.selections['label'] = labelMesh;
    return this;
}
