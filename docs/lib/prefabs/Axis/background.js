import { Vector3, StandardMaterial, Color3, Mesh, Tools } from '@babylonjs/core';
export function background() {
    let boundingBox = this.boundingBox;
    const domain = this.scale.domain();
    let range = this.scale.range();
    range = [range[0], range[1]];
    let planePosition = new Vector3(0, 0, 0);
    let planeRotation = new Vector3(0, 0, 0);
    let planeWidth = 0;
    let planeHeight = 0;
    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    try {
        ticks = this.scale.ticks();
    }
    catch (_a) {
        ticks = domain;
    }
    switch (this.axis) {
        case 'x': {
            planePosition = new Vector3(0, 0, Math.max(range[1], boundingBox.maximum.z));
            planeRotation = new Vector3(0, 0, 0);
            planeWidth = Math.abs(Math.min(range[0], boundingBox.minimum.x) - Math.max(range[1], boundingBox.maximum.x));
            planeHeight = Math.abs(Math.min(range[0], boundingBox.minimum.z) - Math.max(range[1], boundingBox.maximum.z));
            break;
        }
        case 'y': {
            planePosition = (d) => new Vector3(Math.min(range[0], boundingBox.minimum.x), 0, 0);
            planeRotation = (d) => new Vector3(0, Tools.ToRadians(90), 0);
            planeWidth = Math.abs(Math.min(range[0], boundingBox.minimum.z) - Math.max(range[1], boundingBox.maximum.z));
            planeHeight = Math.abs(Math.min(range[0], boundingBox.minimum.y) - Math.max(range[1], boundingBox.maximum.y));
            break;
        }
        case 'z': {
            planePosition = (d) => new Vector3(0, Math.min(range[0], boundingBox.minimum.y), 0);
            planeRotation = (d) => new Vector3(Tools.ToRadians(90), 0, 0);
            planeWidth = Math.abs(Math.min(range[0], boundingBox.minimum.x) - Math.max(range[1], boundingBox.maximum.x));
            planeHeight = Math.abs(Math.min(range[0], boundingBox.minimum.y) - Math.max(range[1], boundingBox.maximum.y));
            break;
        }
        default: {
            break;
        }
    }
    let material = new StandardMaterial(this.name + '_background_material', this.scene);
    material.diffuseColor = Color3.White();
    material.alpha = 0.2;
    let backgroundMesh = this.cot
        .bind('plane', { height: planeHeight, width: planeWidth, sideOrientation: Mesh.DOUBLESIDE }, [{}])
        .attr('name', this.name + '_background')
        .position(planePosition)
        .rotation(planeRotation)
        .material(material);
    //this.selections['background'] = backgroundMesh;
    return this;
}
