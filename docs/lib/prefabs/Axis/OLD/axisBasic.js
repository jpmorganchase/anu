import { PipeAxis } from './Axis';
export function axisBasic(scale, axis, padding = 0) {
    let meshes = [];
    let axisMaker = new PipeAxis(this, scale, axis, padding).makeAxis(this.scene);
    return this;
}
