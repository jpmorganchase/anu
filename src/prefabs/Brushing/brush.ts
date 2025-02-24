// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Node, Observable, AbstractMesh, Mesh, BoundingBoxGizmo, UtilityLayerRenderer, PointerDragBehavior, Vector3, Color3, TransformNode, Quaternion, StandardMaterial } from '@babylonjs/core';
import { create } from '../../create';
import { Selection } from '../../selection';
import { assign, clamp, defaults, set, clone } from 'lodash-es';

export type BrushOptionsInterface = {
  parent: Node | Selection;
  scales: { x?: any, y?: any, z?: any };
  material?: StandardMaterial;
  brushable?: AbstractMesh[] | Selection;
  padding?: { x?: number, y?: number, z?: number };
  translateAxes?: { x?: boolean, y?: boolean, z?: boolean }; 
  rotateAxes?: { x?: boolean, y?: boolean, z?: boolean }; 
  minSize?: { x?: number, y?: number, z?: number };
  maxSize?: { x?: number, y?: number, z?: number };
};

interface IBrushChangeEvent {
  brushed: AbstractMesh[];
  added: AbstractMesh[];
  removed: AbstractMesh[];
}

export class Brush extends TransformNode {
  brushed: Array<AbstractMesh> = [];
  options: BrushOptionsInterface;
  brushMesh: Mesh;
  boundingBox: Mesh;

  public onBrushStartObservable = new Observable();
  public onBrushObservable = new Observable();
  public onBrushEndObservable = new Observable();
  public onBrushChangedObservable = new Observable<IBrushChangeEvent>();

  private internalOptions: BrushOptionsInterface;
  private utilLayer: UtilityLayerRenderer;
  private pointerDragBehavior: PointerDragBehavior;
  private gizmo: BoundingBoxGizmo;
  private ranges: { x: number[], y: number[], z: number[] };
  private flags: { t: boolean, r: boolean, s: boolean } = { t: false, r: false, s: false };
  private ghostDragPosition: Vector3;
  private validState: { t: Vector3, r: Quaternion, s: Vector3} = { t: Vector3.Zero(), r: Quaternion.Identity(), s: Vector3.One()};

  constructor(name: string, scene: Scene, options: BrushOptionsInterface) {
    super(name, scene, true);
    this.name = name;
    this.parent = options.parent instanceof Selection ? options.parent.selected[0] : options.parent;
    this.options;
    this.internalOptions = this.fillDefaultOptions(options);
    this.run();
  }

  public updateBrush(options: BrushOptionsInterface) {
      this.options = assign({}, this.options, options)

      //Reset variables
      if (this.boundingBox) {
        this.brushMesh.dispose();
        this.boundingBox.dispose();
        this.gizmo.dispose();
        this.brushed = [];
        this.internalOptions?.material.dispose();
      }

      this.internalOptions = this.fillDefaultOptions(options);
      this.run();
  }

  private fillDefaultOptions(options: BrushOptionsInterface) {
    let internalOptions = clone(options);

    //Gather all of the meshes in the given parent that have data bound to it
    internalOptions.brushable = internalOptions.brushable ??= [...this.parent.getChildMeshes(false, c => c.metadata?.data != null && Object.keys(c.metadata.data).length > 0)];
    internalOptions.brushable = internalOptions.brushable instanceof Selection ? internalOptions.brushable.selected as AbstractMesh[] : internalOptions.brushable;
    this.ranges = { x: internalOptions.scales.x?.range() ?? [0, 0], y: internalOptions.scales.y?.range() ?? [0, 0], z: internalOptions.scales.z?.range() ?? [0, 0]};
    
    // Setting sensible defaults based on the scales set
    switch (Object.values(internalOptions.scales).filter(v => v != undefined).length) {
      //1D chart
      case 1:
        if (this.internalOptions.scales.x) {
          if (!internalOptions.minSize?.y) set(internalOptions, 'minSize.y', 0.1);
          if (!internalOptions.maxSize?.y) set(internalOptions, 'maxSize.y', 0.1);
          if (!internalOptions.minSize?.z) set(internalOptions, 'minSize.z', 0.1);
          if (!internalOptions.maxSize?.z) set(internalOptions, 'maxSize.z', 0.1);
          internalOptions.translateAxes ??= { x: true, y: false, z: false};
          internalOptions.rotateAxes ??= { x: false, y: false, z: false};
        }
        else if (internalOptions.scales.y) {
          if (!internalOptions.minSize?.x) set(internalOptions, 'minSize.x', 0.1);
          if (!internalOptions.maxSize?.x) set(internalOptions, 'maxSize.x', 0.1);
          if (!internalOptions.minSize?.z) set(internalOptions, 'minSize.z', 0.1);
          if (!internalOptions.maxSize?.z) set(internalOptions, 'maxSize.z', 0.1);
          internalOptions.translateAxes ??= { x: false, y: true, z: false};
          internalOptions.rotateAxes ??= { x: false, y: false, z: false};
          
        }
        else if (internalOptions.scales.z) {
          if (!internalOptions.minSize?.x) set(internalOptions, 'minSize.x', 0.1);
          if (!internalOptions.maxSize?.x) set(internalOptions, 'maxSize.x', 0.1);
          if (!internalOptions.minSize?.y) set(internalOptions, 'minSize.y', 0.1);
          if (!internalOptions.maxSize?.y) set(internalOptions, 'maxSize.y', 0.1);
          internalOptions.translateAxes ??= { x: false, y: false, z: true};
          internalOptions.rotateAxes ??= { x: false, y: false, z: false};
        }

      //2D chart
      case 2:
        if (!internalOptions.scales.x) {
          if (!internalOptions.minSize?.x) set(internalOptions, 'minSize.x', 0.1);
          if (!internalOptions.maxSize?.x) set(internalOptions, 'maxSize.x', 0.1);
          internalOptions.translateAxes ??= { x: false, y: true, z: true };
          internalOptions.rotateAxes ??= { x: true, y: false, z: false };
        }
        else if (!internalOptions.scales.y) {
          if (!internalOptions.minSize?.y) set(internalOptions, 'minSize.y', 0.1);
          if (!internalOptions.maxSize?.y) set(internalOptions, 'maxSize.y', 0.1);
          internalOptions.translateAxes ??= { x: true, y: false, z: true };
          internalOptions.rotateAxes ??= { x: false, y: true, z: false };
        }
        else if (!internalOptions.scales.z) {
          if (!internalOptions.minSize?.z) set(internalOptions, 'minSize.z', 0.1);
          if (!internalOptions.maxSize?.z) set(internalOptions, 'maxSize.z', 0.1);
          internalOptions.translateAxes ??= { x: true, y: true, z: false };
          internalOptions.rotateAxes ??= { x: false, y: false, z: true };
        }
        break;

      //3D chart
      case 3:
        //This has the most degrees of freedom, so everything can just be default
        break;
    }

    //Set remaining defaults
    defaults(internalOptions.padding ??= {}, { x: 0.0, y: 0.0, z: 0.0 });
    defaults(internalOptions.translateAxes ??= {}, { x: true, y: true, z: true });
    defaults(internalOptions.rotateAxes ??= {}, { x: true, y: true, z: true });
    defaults(internalOptions.minSize ??= {},  { x: 0.1, y: 0.1, z: 0.1 });
    defaults(internalOptions.maxSize ??= {},  { x: (Math.abs(this.ranges.x[0]) + Math.abs(this.ranges.x[1])) + internalOptions.padding.x * 2,
                                        y: (Math.abs(this.ranges.y[0]) + Math.abs(this.ranges.y[1])) + internalOptions.padding.y * 2,
                                        z: (Math.abs(this.ranges.z[0]) + Math.abs(this.ranges.z[1])) + internalOptions.padding.z * 2});
    if (!internalOptions.material) {
      internalOptions.material = new StandardMaterial('brushMaterial');
      internalOptions.material.alpha = 0.4;
    }

    return internalOptions;
  }

  private run() {    

    this.brushMesh = create('box', 'brushBox');
    this.brushMesh.material = this.internalOptions.material;

    //BoundingBox "contains" the box mesh and has the required behaviors attached to it
    this.boundingBox = BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(this.brushMesh);
    this.boundingBox.parent = this;

    //This behavior allows the BoundingBox to be translated
    this.pointerDragBehavior = new PointerDragBehavior();
    this.pointerDragBehavior.moveAttached = false;    //False allows us to manually move the bounding box while still receiving movement deltas
    this.pointerDragBehavior.dragDeltaRatio = 1;
    this.boundingBox.addBehavior(this.pointerDragBehavior);

    //Create a renderer so that we can display our gizmo
    if (!this.utilLayer) {
      this.utilLayer = new UtilityLayerRenderer(this._scene);
      this.utilLayer.utilityLayerScene.autoClearDepthAndStencil = false;
    }

    //This gizmo acts as a behavior that allows the BoundingBox to be rotated and scaled
    this.gizmo = new BoundingBoxGizmo(Color3.FromHexString("#D3D3D3"), this.utilLayer);
    this.gizmo.setEnabledRotationAxis(Object.keys(this.internalOptions.rotateAxes).filter(k => this.internalOptions.rotateAxes[k]).join(''));   //Hide rotation handles for the disabled rotation axes
    this.gizmo.fixedDragMeshBoundsSize = true;
    this.gizmo.rotationSphereSize = 0.06;
    this.gizmo.scaleBoxSize = 0.06;
    this.gizmo.attachedMesh = this.boundingBox;
    
    //Subscribe to observables so that we can properly control the BoundingBox
    this.pointerDragBehavior.onDragStartObservable.add(() => {
      this.ghostDragPosition = this.boundingBox.position;
    })
    this.pointerDragBehavior.onDragObservable.add((event) => {
      let delta = event.delta;
      if (!this.internalOptions.translateAxes.x) delta.x = 0;
      if (!this.internalOptions.translateAxes.y) delta.y = 0;
      if (!this.internalOptions.translateAxes.z) delta.z = 0;
      this.ghostDragPosition = this.ghostDragPosition.add(delta);
      this.boundingBox.position = this.ghostDragPosition;
      this.shiftToValidPosition();
    });

    //Subscribe to the observables for the rotation and scale handles
    this.gizmo._rootMesh.getChildMeshes(false).forEach(n => {
      let behavior = n.getBehaviorByName("PointerDrag") as PointerDragBehavior;
      if (behavior) {
        let obs = behavior.onDragObservable.add(() => { 
            this.confineBoundingBoxScale();       //Make sure that the size is valid
            this.checkAndReturnToValidState();    //Make sure that the BoundingBox (position and rotation) is in a valid state
        });
        behavior.onDragObservable.makeObserverBottomPriority(obs);    //Ensures our observable will be fired *after* the gizmo completes its own rotation/scaling
      }
    });

    //Make sure the BoundingBox is in a valid size before we begin
    this.confineBoundingBoxScale();
    this.shiftToValidPosition();

    //Store a valid state of the transformation so that we can go back to it if the BoundingBox falls outside of the chart's boundaries
    this.validState.t.copyFrom(this.boundingBox.position);
    this.validState.r.copyFrom(this.boundingBox.rotationQuaternion);
    this.validState.s.copyFrom(this.boundingBox.scaling);

    //Subscribe to the observables so that we can call our respective brush functions
    //Translation
    this.pointerDragBehavior.onDragStartObservable.add(() => {
      if (!Object.values(this.flags).every(Boolean)) 
        this.brushStart();
      this.flags.t = true;  
    });
    this.pointerDragBehavior.onDragObservable.add(() => {
      this.brush();
    });
    this.pointerDragBehavior.onDragEndObservable.add(() => {
      this.flags.t = false;  
      if (!Object.values(this.flags).every(Boolean))
        this.brushEnd();
    });

    //Rotation
    this.gizmo.onRotationSphereDragObservable.add(() => {   //Gizmo has no DragStart observable
      if (!Object.values(this.flags).every(Boolean) && !this.flags.r) {
        this.brushStart();
        this.flags.r = true;
      } 
      else {
        this.brush();
      }
    });
    this.gizmo.onRotationSphereDragEndObservable.add(() => {
      this.flags.r = false;
      if (!Object.values(this.flags).every(Boolean)) {
        this.brushEnd();
      } 
    });

    //Scaling
    this.gizmo.onScaleBoxDragObservable.add(() => {         //Gizmo has no DragStart observable
      if (!Object.values(this.flags).every(Boolean) && !this.flags.s) {
        this.brushStart();
        this.flags.s = true;
      } 
      else {
        this.brush();
      }
    });
    this.gizmo.onScaleBoxDragEndObservable.add(() => {
      this.flags.s = false;
      if (!Object.values(this.flags).every(Boolean)) {
        this.brushEnd();
      } 
    });
    
    //Run the brush at the end of the frame
    this._scene.onAfterRenderObservable.addOnce(() => this.brush());
  }

  private brushStart() {
    this.onBrushStartObservable.notifyObservers(undefined);
  }

  private brush() {
    let change = false;
    let added = [];
    let removed = [];
    //For each Mesh with bound data, check to see if it intersects with our BoundingBox
    (this.internalOptions.brushable as AbstractMesh[]).forEach((n) => {
        if (this.boundingBox.intersectsMesh(n, true)) {
            if (!this.brushed.includes(n)) {
                this.brushed.push(n);
                added.push(n);
                change = true;
            }
        }
        else if (this.brushed.includes(n)) {
            this.brushed = this.brushed.filter((e) => e != n);
            removed.push(n);
            change = true;
        }
    })

    this.onBrushObservable.notifyObservers(undefined);
    if (change)
      this.onBrushChangedObservable.notifyObservers({ brushed: this.brushed, added: added, removed: removed});
  }

  private brushEnd() {
    this.onBrushEndObservable.notifyObservers(undefined);
  }

  //Moves the bounding box's position back into the bounds of the chart
  //At the moment this isn't used for rotation and scaling since it causes weird behaviors with the BoundingBox either rotating into invalid positions,
  //or being scaled in the opposite direction
  private shiftToValidPosition() {
    this.boundingBox.computeWorldMatrix();
    let matrix = this.parent.computeWorldMatrix(true).clone().invert();
    let localVectors = this.boundingBox.getBoundingInfo().boundingBox.vectorsWorld.map(v => Vector3.TransformCoordinates(v, matrix));
    //For each dim, get the largest x, y, and z difference between the vector and the min/max ranges, preserving the sign
    let delta = localVectors.reduce((acc, cur) => {
      let posX = Math.max((cur.x - (this.ranges.x[1] + this.internalOptions.padding.x)), 0);
      let negX = Math.min((cur.x - (this.ranges.x[0] - this.internalOptions.padding.x)), 0);
      acc.x = [acc.x, posX, negX].reduce((m, c) => Math.abs(c) > Math.abs(m) ? c: m);

      let posY = Math.max((cur.y - (this.ranges.y[1] + this.internalOptions.padding.y)), 0);
      let negY = Math.min((cur.y - (this.ranges.y[0] - this.internalOptions.padding.y)), 0);
      acc.y = [acc.y, posY, negY].reduce((m, c) => Math.abs(c) > Math.abs(m) ? c: m);
      
      let posZ = Math.max((cur.z - (this.ranges.z[1] + this.internalOptions.padding.z)), 0);
      let negZ = Math.min((cur.z - (this.ranges.z[0] - this.internalOptions.padding.z)), 0);
      acc.z = [acc.z, posZ, negZ].reduce((m, c) => Math.abs(c) > Math.abs(m) ? c: m);
      return acc;
    }, Vector3.Zero());

    //Lock translation axes
    if (!this.internalOptions.translateAxes.x) delta.x = 0;
    if (!this.internalOptions.translateAxes.y) delta.y = 0;
    if (!this.internalOptions.translateAxes.z) delta.z = 0;

    //Update BoundingBox
    this.boundingBox.position = this.boundingBox.position.subtract(delta);
    this.boundingBox.computeWorldMatrix();
    this.validState.t.copyFrom(this.boundingBox.position);
  }



  //Rescales the BoundingBox such that it falls within the allowed min and max sizes
  private confineBoundingBoxScale() {
    const epsilon = 0.001;
    let needsUpdate = false;
    if (this.boundingBox.scaling.x < this.internalOptions.minSize.x - epsilon || this.boundingBox.scaling.x > this.internalOptions.maxSize.x + epsilon) {
      this.boundingBox.scaling.x = clamp(this.boundingBox.scaling.x, this.internalOptions.minSize.x, this.internalOptions.maxSize.x);
      needsUpdate = true;
    }
    if (this.boundingBox.scaling.y < this.internalOptions.minSize.y - epsilon || this.boundingBox.scaling.y > this.internalOptions.maxSize.y + epsilon) {
      this.boundingBox.scaling.y = clamp(this.boundingBox.scaling.y, this.internalOptions.minSize.y, this.internalOptions.maxSize.y);
      needsUpdate = true;
    }
    if (this.boundingBox.scaling.z < this.internalOptions.minSize.z - epsilon || this.boundingBox.scaling.z > this.internalOptions.maxSize.z + epsilon) {
      this.boundingBox.scaling.z = clamp(this.boundingBox.scaling.z, this.internalOptions.minSize.z, this.internalOptions.maxSize.z);
      needsUpdate = true;
    }

    if (needsUpdate) {
      this.boundingBox.position.copyFrom(this.validState.t)   //We need to get the last valid position since scaling sometimes affects position
      this.boundingBox.computeWorldMatrix();
      this.validState.s.copyFrom(this.boundingBox.scaling);   //This scaling is now valid, so save it
    }
  }

  //Checks to see if the BoundingBox is in a valid state and if not, sets it back to the previously valid state
  private checkAndReturnToValidState() {
    const epsilon = 0.001;
    let worldVectors = this.boundingBox.getBoundingInfo().boundingBox.vectorsWorld;
    //Check if any of the 8 vectors of the BoundingBox are out of range
    let matrix = this.parent.computeWorldMatrix(true).clone().invert();
    for (let i = 0; i < worldVectors.length; i++) {
      let localVector = Vector3.TransformCoordinates(worldVectors[i], matrix);
      if (!((!this.internalOptions.scales.x || (this.ranges.x[0] - this.internalOptions.padding.x - epsilon <= localVector.x && localVector.x <= this.ranges.x[1] + this.internalOptions.padding.x + epsilon)) &&
            (!this.internalOptions.scales.y || (this.ranges.y[0] - this.internalOptions.padding.y - epsilon <= localVector.y && localVector.y <= this.ranges.y[1] + this.internalOptions.padding.y + epsilon)) &&
            (!this.internalOptions.scales.z || (this.ranges.z[0] - this.internalOptions.padding.z - epsilon <= localVector.z && localVector.z <= this.ranges.z[1] + this.internalOptions.padding.z + epsilon)))) {
        //One of the vectors is out of range and thus is invalid, reset the BoundingBox to a previously valid state
        this.boundingBox.position.copyFrom(this.validState.t);
        this.boundingBox.rotationQuaternion.copyFrom(this.validState.r);
        this.boundingBox.scaling.copyFrom(this.validState.s);
        this.shiftToValidPosition();
        return;
      }
    }
    //If execution reaches here, the state is valid. Save it
    this.validState.t.copyFrom(this.boundingBox.position);
    this.validState.r.copyFrom(this.boundingBox.rotationQuaternion);
    this.validState.s.copyFrom(this.boundingBox.scaling);
  }
}


export function createBrush(name: string, scene: Scene, options: BrushOptionsInterface) {
  if (!options.scales)
    throw new Error("Brush Prefab requires at least one scale to be defined");

  if (!options.parent)
    throw new Error("Brush prefab must have a parent")

  const Options: BrushOptionsInterface = {
    parent: options.parent,
    scales: options.scales,
    material: options.material ?? undefined,
    brushable: options.brushable ?? undefined,
    padding: options.padding ?? undefined,
    translateAxes: options.translateAxes ?? undefined,
    rotateAxes: options.rotateAxes ?? undefined,
    minSize: options.minSize ?? undefined,
    maxSize: options.maxSize ?? undefined,
  }

  return new Brush(name, scene, Options);
}