import { TransformNode, Vector3, Mesh } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';
import { Selection } from '../../../selection';

class Axis {
  selection: Selection;
  scale: any;
  axis: string;
  padding: number;

  constructor(selection: Selection, scale: any, axis: string, padding: number) {
    this.selection = selection;
    this.scale = scale;
    this.axis = axis;
    this.padding = padding;
  }
}

export class PipeAxis extends Axis {
  public makeAxis(scene: Scene) {
    const cot = this.selection.selected[0].parent; //New center for out axis
    //cot.parent = this.parent; //Make our axis center a child of the parent selection
    const selection = new Selection([cot!], scene); //Create a new selection with our center

    const domain = this.scale.domain();
    let range = this.scale.range();
    range = [range.at(0), range.at(-1)];

    let ticks; //Not every d3 scale supports the ticks function, for those that don't default to using domain
    try {
      ticks = this.scale.ticks();
    } catch {
      ticks = domain;
    }

    //console.log(ticks);

    let boundingBox = this.selection.boundingBox();
    //console.log(boundingBox);
    let cotPosition: Vector3 = new Vector3(0, 0, 0);
    let path: [Vector3, Vector3] = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
    let tubePosition: Vector3 = new Vector3(0, 0, 0);
    let textPosition: Vector3 | ((d: any) => Vector3) = new Vector3(0, 0, 0);

    switch (this.axis) {
      case 'x': {
        cotPosition = new Vector3(0, 0, this.padding);
        path = [
          new Vector3(Math.min(range[0], boundingBox.minimum.x), 0, 0),
          new Vector3(Math.max(range[1], boundingBox.maximum.x), 0, 0),
        ];
        tubePosition = new Vector3(0, range[0], range[0]);
        textPosition = (d) => new Vector3(this.scale(d.text), -1, 0);
        break;
      }
      case 'y': {
        cotPosition = new Vector3(this.padding, 0, this.padding);
        path = [
          new Vector3(0, Math.min(range[0], boundingBox.minimum.y), 0),
          new Vector3(0, Math.max(range[1], boundingBox.maximum.y), 0),
        ];
        tubePosition = new Vector3(range[0], 0, range[0]);
        textPosition = (d) => new Vector3(-1, this.scale(d.text), 0);
        break;
      }
      case 'z': {
        cotPosition = new Vector3(this.padding, 0, 0);
        path = [
          new Vector3(0, 0, Math.min(range[0], boundingBox.minimum.z)),
          new Vector3(0, 0, Math.max(range[1], boundingBox.maximum.z)),
        ];
        tubePosition = new Vector3(range[0], range[0], 0);
        textPosition = (d) => new Vector3(0, -1, this.scale(d.text));
        break;
      }
      default: {
        break;
      }
    }

    selection.position(cotPosition);
    var mesh = selection
      .bind('tube', { path: path, radius: 0.1, cap: 2, sideOrientation: Mesh.DOUBLESIDE })
      .position(tubePosition);

    mesh
      .bind(
        'text2d',
        { text: (d: any) => d.text, fontSize: 60, fontColor: 'white' },
        ticks.map((x: any) => {
          return { text: x };
        }),
      )
      .position(textPosition);

    return mesh;
  }
}
