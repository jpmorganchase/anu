import { Selection } from '../../../selection';
import { PipeAxis } from './Axis';

export function axisBasic(this: Selection, scale: any, axis: string, padding = 0) {
  let meshes = [];

  let axisMaker = new PipeAxis(this, scale, axis, padding).makeAxis(this.scene);

  return this;
}
