//planeLayout = new anu.planelayout('name', {options}, scene)
//planeLayout.Update({options})
//planeLayout.Transform({options})
import { Selection } from '../../selection';
import {
  BoundingInfo,
  Scene,
  Vector2,
  Vector3,
  Mesh,
  Animation,
  BezierCurveEase,
  TransformNode,
} from '@babylonjs/core';

interface LayoutOptions {
  selection: Selection;
  rows?: number;
  columns?: number;
  radius?: number;
  margin?: Vector2;
  order?: string[];
}

export class Layout {
  name: string;
  options: LayoutOptions;
  scene: Scene;
  currentLayout: Number = 0;
  root: Mesh;

  constructor(name: string, options: LayoutOptions, scene: Scene) {
    this.name = name;
    this.options = options;
    //scene is required because of animations
    this.scene = scene;
    this.root = new Mesh(this.name, this.scene);
  }

  public planeLayout() {
    this.currentLayout = 1;
    let rownum = this.options.rows || 1;
    let margin = this.options.margin || new Vector2(0, 0);
    let chartnum = this.options.selection.selected.length;
    let boundingBox = this.boundingBoxLocal(this.options.selection);
    let widthX = boundingBox.boundingBox.extendSize.x;
    let widthY = boundingBox.boundingBox.extendSize.y;
    let colnum = this.options.columns || chartnum;

    colnum = chartnum % rownum == 0 ? chartnum / rownum : Math.floor(chartnum / rownum) + 1;

    this.options.selection.selected.forEach((node, i) => {
      //(node.parent as Mesh).showBoundingBox = showBox;
      node.parent = this.root;
      this.animatePosition(
        node as TransformNode,
        new Vector3(
          ((i % colnum) - (colnum - 1) / 2.0) * (widthX + margin.x),
          Math.floor(i / colnum) * (widthY + margin.y),
          0,
        ),
      );
      this.animateRotation(node as TransformNode, new Vector3(0, 0, 0));
    });

    return this;
  }

  public cylinderLayout() {
    this.currentLayout = 2;
    let rownum = this.options.rows || 1;
    let margin = this.options.margin || new Vector2(0, 0);
    let chartnum = this.options.selection.selected.length;
    let boundingBox = this.boundingBoxLocal(this.options.selection);
    let radius = this.options.radius || 5;
    let widthX = boundingBox.boundingBox.extendSize.x;
    let widthY = boundingBox.boundingBox.extendSize.y;
    let colnum = this.options.columns || chartnum;

    colnum = chartnum % rownum == 0 ? chartnum / rownum : Math.floor(chartnum / rownum) + 1;

    let angle = ((Math.atan(widthX / 2 / radius) * 2) / Math.PI) * 180;

    let forward = new Vector3(0, 0, 1);
    let up = new Vector3(0, 1, 0);

    this.options.selection.selected.forEach((node, i) => {
      node.parent = this.root;
      this.animateRotation(node as TransformNode, new Vector3(0, 0, 0));
      let origin = new Mesh('vect', this.scene);
      origin.position = new Vector3(0, 0, 0);
      let rowid = Math.floor(i / colnum);
      let colid = i % colnum;
      origin.rotate(new Vector3(0, 1, 0), (colid * (angle + margin.x) * Math.PI) / 180);
      let originforward = origin.getDirection(forward).normalize();
      let pos = originforward.multiplyByFloats(radius, radius, radius);
      let newPos = new Vector3(pos.x, rowid * (widthY + margin.y), pos.z);
      this.animatePosition(node as TransformNode, newPos);
      let newRot = origin.rotationQuaternion?.toEulerAngles() || new Vector3(0, 0, 0);
      this.animateRotation(node as TransformNode, newRot);
      origin.dispose();
    });

    return this;
  }

  public sphereLayout() {
    this.currentLayout = 3;
    let rownum = this.options.rows || 1;
    let margin = this.options.margin || new Vector2(0, 0);
    let chartnum = this.options.selection.selected.length;
    let boundingBox = this.boundingBoxLocal(this.options.selection);
    let radius = this.options.radius || 5;
    let widthX = boundingBox.boundingBox.extendSize.x;
    let widthY = boundingBox.boundingBox.extendSize.y;
    let colnum = this.options.columns || chartnum;

    colnum = chartnum % rownum == 0 ? chartnum / rownum : Math.floor(chartnum / rownum) + 1;

    let angle = (Math.atan(widthX / 2 / radius) * 2 * 180) / Math.PI;
    let angleY = (Math.atan(widthY / 2 / radius) * 2 * 180) / Math.PI;

    this.options.selection.selected.forEach((node, i) => {
      //make a 3D coord using spherical coordinate system
      node.parent = this.root;
      let colid = Math.floor(i / colnum) - Math.floor(rownum / 2);
      let rowid = (i % colnum) - Math.floor(colnum / 2);
      let anglephi = (Math.min(colid * (angle + margin.y), 360) * Math.PI) / 180;
      let angletheta = (Math.min(Math.abs(90 - rowid * (angleY + margin.x)), 180) * Math.PI) / 180;
      let newPos = new Vector3(
        radius * Math.sin(angletheta) * Math.cos(anglephi),
        radius * Math.sin(angletheta) * Math.sin(anglephi),
        radius * Math.cos(angletheta),
      );
      this.animatePosition(node as TransformNode, newPos);
      let newRot = new Vector3(-anglephi, angletheta, 0);
      this.animateRotation(node as TransformNode, newRot);
    });

    return this;
  }

  public attr(s: string, val: object) {
    switch (s) {
      case 'row':
        this.options.rows = Number(val);
        if (this.currentLayout == 1) this.planeLayout();
        if (this.currentLayout == 2) this.cylinderLayout();
        if (this.currentLayout == 3) this.sphereLayout();
        break;
      case 'margin':
        let newmargin = val as Vector2;
        this.options.margin = newmargin;
        if (this.currentLayout == 1) this.planeLayout();
        if (this.currentLayout == 2) this.cylinderLayout();
        if (this.currentLayout == 3) this.sphereLayout();
        break;
      case 'radius':
        this.options.radius = Number(val);
        if (this.currentLayout == 2) this.cylinderLayout();
        if (this.currentLayout == 3) this.sphereLayout();
        break;
      default:
        break;
    }
    return this;
  }

  // public zalign(){
  //     let boundingBox = this.boundingBoxLocal(this.options.selection)
  //     let widthZ = boundingBox.boundingBox.maximumWorld.z - boundingBox.boundingBox.minimumWorld.z;
  //     this.options.selection.selected.forEach((node, i) => {
  //         let test = new Selection([this.options.selection.selected[i]], this.scene);
  //         let zSize = this.boundingBoxLocal(test).boundingBox.maximumWorld.z - this.boundingBoxLocal(test).boundingBox.minimumWorld.z;
  //         this.animatePosition((node as TransformNode), new Vector3((node as TransformNode).position.x, (node as TransformNode).position.y, zSize / 2 - widthZ / 2));
  //     })
  //     return this;
  // }

  public update() {
    if (this.currentLayout == 1) this.planeLayout();
    if (this.currentLayout == 2) this.cylinderLayout();
    if (this.currentLayout == 3) this.sphereLayout();

    return this;
  }

  private animatePosition(obj: TransformNode, newPos: Vector3) {
    var animationBezierTorus = new Animation(
      'animationBezierTorus',
      'position',
      30,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    );
    var keysBezierTorus = [];
    keysBezierTorus.push({ frame: 0, value: obj.position });
    keysBezierTorus.push({ frame: 20, value: newPos });
    animationBezierTorus.setKeys(keysBezierTorus);
    var bezierEase = new BezierCurveEase(0.73, 0, 0.31, 1);
    animationBezierTorus.setEasingFunction(bezierEase);
    obj.animations.length = Math.min(obj.animations.length, 2);
    obj.animations.push(animationBezierTorus);
    this.scene.beginDirectAnimation(obj, [animationBezierTorus], 0, 20, false);
  }

  private animateRotation(obj: TransformNode, newRot: Vector3) {
    //check if quaternion is null, if so we use eulerangle
    //helper convert Quaternion.eulerangle
    //set quaternion to null when using rotation, but not the other way
    let keys = [];
    keys.push({ frame: 0, value: (obj as TransformNode).rotation });
    keys.push({ frame: 20, value: newRot });
    let animation = new Animation(
      '',
      'rotation',
      20,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE,
    );
    animation.setKeys(keys);
    var bezierEase = new BezierCurveEase(0.73, 0, 0.31, 1);
    animation.setEasingFunction(bezierEase);
    this.scene.beginDirectAnimation(obj, [animation], 0, 20, false);
  }

  private animateScale(obj: TransformNode, newScale: Vector3) {
    var animationBezierTorus = new Animation(
      'animationBezierTorus',
      'scaling',
      30,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    );
    var keysBezierTorus = [];
    keysBezierTorus.push({ frame: 0, value: obj.scaling });
    keysBezierTorus.push({ frame: 10, value: newScale });
    animationBezierTorus.setKeys(keysBezierTorus);
    var bezierEase = new BezierCurveEase(0.73, 0, 0.31, 1);
    animationBezierTorus.setEasingFunction(bezierEase);
    obj.animations.length = Math.min(obj.animations.length, 2);
    obj.animations.push(animationBezierTorus);
    this.scene.beginDirectAnimation(obj, [animationBezierTorus], 0, 10, true);
  }

  private boundingBoxLocal(selection: Selection): BoundingInfo {
    // The min and max bounding box for the entire selection
    let selectionMin = new Vector3(0, 0, 0);
    let selectionMax = new Vector3(0, 0, 0);

    // For each node in the selection, get the min and max bounding box of it and its children
    selection.selected.forEach((node, i) => {
      let nodeMin = new Vector3(0, 0, 0);
      let nodeMax = new Vector3(0, 0, 0);

      let children = node.getChildMeshes();
      children.forEach((child, j) => {
        child.computeWorldMatrix(true); 
        let childMin = child.getBoundingInfo().boundingBox.minimum;
        let childMax = child.getBoundingInfo().boundingBox.maximum;
        nodeMin = Vector3.Minimize(nodeMin, childMin);
        nodeMax = Vector3.Maximize(nodeMax, childMax);
      });

      selectionMin = Vector3.Minimize(selectionMin, nodeMin);
      selectionMax = Vector3.Maximize(selectionMax, nodeMax);
    });

    return new BoundingInfo(selectionMin, selectionMax);
  }
}

export function planeLayout(name: string, options: LayoutOptions, scene: Scene): Layout {
  const Options: LayoutOptions = {
    selection: options.selection,
    rows: options.rows || 1,
    columns: options.columns || options.selection.selected.length,
    margin: options.margin || new Vector2(0, 0),
    order: options.order || [],
  };

  return new Layout(name, Options, scene).planeLayout();
}

export function cylinderLayout(name: string, options: LayoutOptions, scene: Scene) {
  const Options: LayoutOptions = {
    selection: options.selection,
    rows: options.rows || 1,
    columns: options.columns || options.selection.selected.length,
    radius: options.radius || 5,
    margin: options.margin || new Vector2(0, 0),
    order: options.order || [],
  };

  return new Layout(name, Options, scene).cylinderLayout();
}

export function sphereLayout(name: string, options: LayoutOptions, scene: Scene): Layout {
  const Options: LayoutOptions = {
    selection: options.selection,
    rows: options.rows || 1,
    columns: options.columns || options.selection.selected.length,
    margin: options.margin || new Vector2(0, 0),
    order: options.order || [],
  };

  return new Layout(name, Options, scene).sphereLayout();
}

export function cockpitLayout() {}
