import { TransformNode, Scene, Node, Mesh } from '@babylonjs/core';
import { Selection } from '../selection/index';


export class Prefab extends Mesh {
  public name: string;
  public scene: Scene;
  public readonly cot: TransformNode;
  public _parent?: Node | Selection;

  constructor(name: string, scene: Scene) {
    super(name, scene);
    // this.name = name;
    // this.scene = scene
    // this.cot = new TransformNode(name, scene)
  }

  // get parent(){
  //     return this._parent;
  // }

  // set parent(node: Node | Selection){
  //     this._parent = (node instanceof Selection) ? node.selected[0] : node;
  //     this.cot.setParent(this._parent);
  // }

  // public dispose(){
  //     this.cot.dispose(false, true);
  // }
}
