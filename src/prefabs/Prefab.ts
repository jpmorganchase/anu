import { TransformNode } from "@babylonjs/core/Meshes/transformNode"
import { Selection } from "../selection/index"
import { Scene } from "@babylonjs/core/scene";
import { Node } from "@babylonjs/core/node";
import { assign } from 'lodash-es';

export class Prefab { 
    public name: string;
    public scene: Scene;
    public readonly cot: TransformNode;
    public _parent?: Node | Selection;
   
    constructor(name: string, scene: Scene){
        this.name = name; 
        this.scene = scene
        this.cot = new TransformNode(name, scene)
    }

    get parent(){
        return this._parent;
    }

    set parent(node: Node | Selection){
        this._parent = (node instanceof Selection) ? node.selected[0] : node;
        this.cot.setParent(this._parent);
    }

    public dispose(){
        this.cot.dispose(false, true);
    }


    

   
    

}