// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import {
  Vector3,
  Color3,
  StandardMaterial,
  ActionManager,
  ExecuteCodeAction,
  SixDofDragBehavior,
  Color4,
  BoundingInfo,
  TransformNode,
  PointerDragBehavior,
  Tags,
  Quaternion,
  Space,
} from '@babylonjs/core';
import { Selection, createSelection, create } from '../../index';

interface positionUIOptions {
  name?: string;
  position?: Vector3;
  offset?: Vector3;
  width?: number;
  radius?: number;
  material?: any;
  diffuseColor?: Color3 | Color4;
  visibility?: number;
  behavior?: SixDofDragBehavior;
  billboard?: number;
}

/**
 * Take a selection, for each node in the selection attach UI elements that provide positioning behavior
 *
 * @param options The associated options for this prefab.
 * @returns An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function positionUI(this: Selection, options: positionUIOptions = {}): Selection {
  this.selected.forEach((node) => {
    let { min, max } = node.getHierarchyBoundingVectors(true, (child) => !Tags.MatchesQuery(child, 'exclude'));
    let bounds = new BoundingInfo(min, max);
    let name = options.name || node.name + 'PositionUI';
    let width = options.width || bounds.boundingBox.extendSize.x * 0.5;
    let radius = options.radius || width * 0.05;
    let position =
      options.position ||
      new Vector3(
        0,
        -bounds.boundingBox.extendSize.y,
        -Math.hypot(bounds.boundingBox.extendSize.x, bounds.boundingBox.extendSize.z),
      );
    let offset = options.offset || new Vector3(0, -radius * 2.5, 0);
    let billboard = options.billboard || 0;
    let material: any;
    if (options.material === undefined) {
      material = new StandardMaterial('PositionUIMat', this.scene);
      material.diffuseColor = options.diffuseColor || Color3.White();
    } else {
      material = options.material;
    }
    let visibility = options.visibility || 1;
    let behavior: SixDofDragBehavior;
    if (options.behavior === undefined) {
      behavior = new SixDofDragBehavior();
      behavior.faceCameraOnDragStart = true;
      behavior.rotateAroundYOnly = true;
      behavior.zDragFactor = 100;
    } else {
      behavior = options.behavior;
    }

    let boundingMesh = create('container', name + 'Container', { calculateBounds: false }, this.scene);

    boundingMesh.setParent(node);
    boundingMesh.setBoundingInfo(bounds);
    boundingMesh.isPickable = false;
    boundingMesh.billboardMode = billboard;

    let boundingSelection = createSelection([boundingMesh], this.scene);

    let grab = boundingSelection
      .bind('capsule', { height: width, radius: radius })
      .name(name)
      .position(position.addInPlace(offset))
      .rotation(new Vector3(0, 0, 1.57))
      .material(material)
      .prop('visibility', visibility)
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
            node.addBehavior(behavior);
          }),
      )
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickOutTrigger, () => {
            node.removeBehavior(behavior);
          }),
      )
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
            node.removeBehavior(behavior);
          }),
      );

    grab.addTags('exclude');
  });

  return this;
}

interface scaleUIOptions {
  name?: string;
  position?: Vector3;
  offset?: Vector3;
  diameter?: number;
  material?: any;
  diffuseColor?: Color3 | Color4;
  visibility?: number;
  billboard?: number;
  behavior?: PointerDragBehavior;
  minimum?: number;
  maximum?: number;
}

export function scaleUI(this: Selection, options: scaleUIOptions = {}): Selection {
  this.selected.forEach((node) => {
    let { min, max } = node.getHierarchyBoundingVectors(true, (child) => !Tags.MatchesQuery(child, 'exclude'));
    let bounds = new BoundingInfo(min, max);
    let name = options.name || node.name + 'ScaleUI';
    let diameter = options.diameter || bounds.boundingBox.extendSize.x * 0.5 * 0.05 * 2;
    let position =
      options.position ||
      new Vector3(
        0,
        -bounds.boundingBox.extendSize.y,
        -Math.hypot(bounds.boundingBox.extendSize.x, bounds.boundingBox.extendSize.z),
      );
    let offset =
      options.offset || new Vector3((bounds.boundingBox.extendSize.x * 0.5 * 1.5) / 2, (-diameter / 2) * 2.5, 0);
    let billboard = options.billboard || 0;
    let material: any;
    if (options.material === undefined) {
      material = new StandardMaterial('PositionUIMat', this.scene);
      material.diffuseColor = options.diffuseColor || Color3.White();
    } else {
      material = options.material;
    }
    let visibility = options.visibility || 1;
    let behavior: PointerDragBehavior;
    if (options.behavior === undefined) {
      behavior = new PointerDragBehavior({ dragAxis: new Vector3(0, 1, 0) });
      behavior.moveAttached = false;
    } else {
      behavior = options.behavior;
    }
    let minimum = options.minimum || -Infinity;
    let maximum = options.maximum || Infinity;

    let boundingMesh = create('container', name + 'Container', { calculateBounds: false }, this.scene);

    boundingMesh.setParent(node);
    boundingMesh.setBoundingInfo(bounds);
    boundingMesh.isPickable = false;
    boundingMesh.billboardMode = billboard;

    let boundingSelection = createSelection([boundingMesh], this.scene);

    let scale = boundingSelection
      .bind('sphere', { diameter: diameter })
      .name(name)
      .position(position.addInPlace(offset))
      .rotation(new Vector3(0, 0, 1.57))
      .material(material)
      .prop('visibility', visibility)
      .addTags('exclude')
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
            n.addBehavior(behavior);
          }),
      )
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickOutTrigger, () => {
            n.removeBehavior(behavior);
          }),
      )
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
            n.removeBehavior(behavior);
          }),
      );

    behavior.onDragObservable.add((event) => {
      let scaleFactor = -event.dragDistance;
      let currentScale = (node as TransformNode).scaling;
      let afterScale = currentScale.add(new Vector3(scaleFactor, scaleFactor, scaleFactor));
      if (afterScale.x < minimum) {
        return;
      } else if (afterScale.x > maximum) {
        return;
      } else {
        (node as TransformNode).scaling = afterScale;
      }
    });
  });

  return this;
}

interface rotateUIOptions {
  name?: string;
  axis?: { [key: string]: Boolean };
  position?: Vector3;
  offset?: Vector3;
  diameter?: number;
  thickness?: number;
  material?: any;
  diffuseColor?: Color3 | Color4;
  visibility?: number;
  billboard?: number;
  //behavior?: {[key: string]: PointerDragBehavior};
}

export function rotateUI(this: Selection, options: rotateUIOptions = {}): Selection {
  this.selected.forEach((node) => {
    let { min, max } = node.getHierarchyBoundingVectors(true, (child) => !Tags.MatchesQuery(child, 'exclude'));
    let bounds = new BoundingInfo(min, max);
    let name = options.name || node.name + 'ScaleUI';
    let billboard = options.billboard || 0;
    let axis = options.axis || { x: true, y: true, z: true };
    let diameter = options.diameter || bounds.boundingBox.extendSize.x * 0.5 * 0.05 * 2;
    let thickness = options.thickness || diameter / 2;
    let position =
      options.position ||
      new Vector3(
        0,
        -bounds.boundingBox.extendSize.y,
        -Math.hypot(bounds.boundingBox.extendSize.x, bounds.boundingBox.extendSize.z),
      );
    let offset = options.offset || new Vector3(0, -diameter * 2.5, 0);
    let material: any;
    if (options.material === undefined) {
      material = new StandardMaterial('PositionUIMat', this.scene);
      material.diffuseColor = options.diffuseColor || Color3.White();
    } else {
      material = options.material;
    }
    let visibility = options.visibility || 1;

    let behaviors: { [key: string]: PointerDragBehavior };

    behaviors = {
      x: new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0) }),
      y: new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0) }),
      z: new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0) }),
    };
    behaviors.x!.moveAttached = false;
    behaviors.y!.moveAttached = false;
    behaviors.z!.moveAttached = false;

    let data: any = [];
    Object.keys(axis).forEach((key) => {
      if (axis[key] == true) data.push({ axis: key });
    });

    let boundingMesh = create('container', name + 'Container', { calculateBounds: false }, this.scene);

    boundingMesh.setParent(node);
    boundingMesh.setBoundingInfo(bounds);
    boundingMesh.isPickable = false;
    boundingMesh.billboardMode = billboard;

    let boundingSelection = createSelection([boundingMesh], this.scene);

    let scale = boundingSelection
      .bind('torus', { diameter: diameter, thickness: thickness }, data)
      .name((d, n, i) => (options.name ??= n.name + '_scaleUI'))
      .position((d) =>
        d.axis == 'x'
          ? new Vector3(0, 0, 0).addInPlace(position).addInPlace(offset)
          : d.axis == 'y'
          ? new Vector3(diameter * 1.5, 0, 0).addInPlace(position).addInPlace(offset)
          : d.axis == 'z'
          ? new Vector3(-diameter * 1.5, 0, 0).addInPlace(position).addInPlace(offset)
          : new Vector3(0, 0, 0),
      )
      .rotation((d) =>
        d.axis == 'x'
          ? new Vector3(0, 0, 1.57)
          : d.axis == 'y'
          ? new Vector3(0, 0, 0)
          : d.axis == 'z'
          ? new Vector3(1.57, 0, 0)
          : new Vector3(0, 0, 0),
      )
      .material(material)
      .prop('visibility', visibility)
      .addTags('exclude')
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
            n.addBehavior(behaviors[d.axis]);
          }),
      )
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickOutTrigger, () => {
            n.removeBehavior(behaviors[d.axis]);
          }),
      )
      .action(
        (d, n, i) =>
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
            n.removeBehavior(behaviors[d.axis]);
          }),
      );

    behaviors.x.onDragObservable.add((event) => {
      (node as TransformNode).rotate(new Vector3(1, 0, 0), event.dragDistance, Space.LOCAL);
    });

    behaviors.y.onDragObservable.add((event) => {
      (node as TransformNode).rotate(new Vector3(0, -1, 0), event.dragDistance, Space.LOCAL);
    });

    behaviors.z.onDragObservable.add((event) => {
      (node as TransformNode).rotate(new Vector3(0, 0, -1), event.dragDistance, Space.LOCAL);
    });
  });

  return this;
}
