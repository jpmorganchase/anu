import { Vector3 } from '@babylonjs/core';
export function ticks() {
    let boundingBox = this.boundingBox;
    const domain = this.scale.domain();
    let range = this.scale.range();
    range = [range[0], range[1]];
    let tickPosition = [new Vector3(0, 0, 0)];
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    try {
        ticks = this.scale.ticks();
    }
    catch (_a) {
        ticks = domain;
    }
    switch (this.axis) {
        case 'x': {
            tickPosition = (d) => [
                new Vector3(this.scale(d.text), boundingBox.minimum.y, boundingBox.minimum.z),
                new Vector3(this.scale(d.text), boundingBox.minimum.y, boundingBox.maximum.z),
                new Vector3(this.scale(d.text), boundingBox.maximum.y, boundingBox.maximum.z),
            ];
            break;
        }
        case 'y': {
            tickPosition = (d) => [
                new Vector3(boundingBox.minimum.x, this.scale(d.text), boundingBox.minimum.z),
                new Vector3(boundingBox.minimum.x, this.scale(d.text), boundingBox.maximum.z),
                new Vector3(boundingBox.maximum.x, this.scale(d.text), boundingBox.maximum.z),
            ];
            break;
        }
        case 'z': {
            tickPosition = (d) => [
                new Vector3(boundingBox.maximum.x, boundingBox.minimum.y, this.scale(d.text)),
                new Vector3(boundingBox.minimum.x, boundingBox.minimum.y, this.scale(d.text)),
                new Vector3(boundingBox.minimum.x, boundingBox.maximum.y, this.scale(d.text)),
            ];
            break;
        }
        default: {
            break;
        }
    }
    let tickMesh = this.cot
        .bind('lines', { points: tickPosition }, ticks.map((x) => {
        return { text: x };
    }))
        .attr('name', this.name + '_tick')
        .attr('alpha', 0.3);
    //this.selections['ticks'] = tickMesh;
    return this;
}
