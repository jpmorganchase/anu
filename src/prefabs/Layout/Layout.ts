//planeLayout = new anu.planelayout('name', {options}, scene)
//planeLayout.Update({options})
//planeLayout.Transform({options})
import { Selection } from "../../selection";
import { BoundingInfo, Scene, Vector2, Vector3, Mesh, Animation, BezierCurveEase, TransformNode } from "@babylonjs/core";

interface LayoutOptions {
    selection: Selection,
    rows?: number, 
    columns?: number,
    radius?: number,
    margin?: Vector2,
    order?: string[],
  }

export class Layout{
    name: string;
    options: LayoutOptions;
    scene: Scene;
    //boundingBox: BoundingInfo;
    
    constructor(name: string, options: LayoutOptions, scene: Scene) {
        this.name = name;
        this.options = options;
        this.scene = scene;
        //this.boundingBox = options.selection.boundingBoxLocal();
    }

    private animatePosition(obj: TransformNode, newPos: Vector3){
        var animationBezierTorus = new Animation("animationBezierTorus", "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysBezierTorus = [];
        keysBezierTorus.push({ frame: 0, value: obj.position });
        keysBezierTorus.push({ frame: 20, value: newPos });
        animationBezierTorus.setKeys(keysBezierTorus);
        var bezierEase = new BezierCurveEase(0.73, 0, 0.31, 1);
        animationBezierTorus.setEasingFunction(bezierEase);
        obj.animations.length = Math.min(obj.animations.length, 2);
        obj.animations.push(animationBezierTorus);
        this.scene.beginAnimation(obj, 0, 20, false);
    }

    private animateScale(obj: TransformNode, newScale: Vector3){
        var animationBezierTorus = new Animation("animationBezierTorus", "scaling", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysBezierTorus = [];
        keysBezierTorus.push({ frame: 0, value: obj.scaling });
        keysBezierTorus.push({ frame: 10, value: newScale });
        animationBezierTorus.setKeys(keysBezierTorus);
        var bezierEase = new BezierCurveEase(0.73, 0, 0.31, 1);
        animationBezierTorus.setEasingFunction(bezierEase);
        obj.animations.length = Math.min(obj.animations.length, 2);        
        obj.animations.push(animationBezierTorus);
        this.scene.beginAnimation(obj, 0, 10, true);
    }

    public boundingBoxLocal(selection: Selection): BoundingInfo {

        let selectionMin = new Vector3(0, 0, 0);
        let selectionMax = new Vector3(0, 0, 0);

        selection.selected.forEach((node, i) => {
        let meshes = node.getChildMeshes();
        meshes.forEach((mesh, j) => {
            mesh.computeWorldMatrix(true); //without this the bounding box is calulcated at the mesh creation position...TODO investigate.
            let nodeMin = mesh.getBoundingInfo().boundingBox.minimumWorld.subtract((node as TransformNode).getAbsolutePosition());
            let nodeMax = mesh.getBoundingInfo().boundingBox.maximumWorld.subtract((node as TransformNode).getAbsolutePosition());
            selectionMin = Vector3.Minimize(selectionMin, nodeMin);
            selectionMax = Vector3.Maximize(selectionMax, nodeMax);
            });
        });

        return new BoundingInfo(selectionMin, selectionMax);
    }

    public planeLayout(){
        let rownum = this.options.rows || 1
        let padding = this.options.margin || new Vector2(0, 0)
        let chartnum = this.options.selection.selected.length
        let boundingBox = this.boundingBoxLocal(this.options.selection)
        let widthX = boundingBox.boundingBox.maximumWorld.x - boundingBox.boundingBox.minimumWorld.x;
        let widthY = boundingBox.boundingBox.maximumWorld.y - boundingBox.boundingBox.minimumWorld.y;
        let colnum = this.options.columns || chartnum;

        colnum = chartnum % rownum == 0 ? chartnum / rownum : Math.floor(chartnum / rownum) + 1;

        let cells : Mesh[] = [];
        
        this.options.selection.selected.forEach((node, i) => {
            if(node.parent == null){
                let m = new Mesh("cell", this.scene);
                m.setBoundingInfo(new BoundingInfo(boundingBox.boundingBox.minimumWorld, boundingBox.boundingBox.maximumWorld));
                node.parent = m;
                cells.push(m);
            } else {
                (node.parent as Mesh).setBoundingInfo(new BoundingInfo(boundingBox.boundingBox.minimumWorld, boundingBox.boundingBox.maximumWorld));
                cells.push((node.parent as Mesh));
            }
            this.animatePosition((cells[cells.length - 1]), new Vector3(i % colnum * (widthX + padding.x), Math.floor(i / colnum) * (widthY + padding.y), 0));
            this.animatePosition((node as TransformNode), new Vector3(0, 0, 0))
        })
        return this;
    }

    public attr(s: string, val: object){
        switch(s){
            case "row":
                this.options.rows = Number(val);
                planeLayout(this.name, this.options, this.scene);
                break;
            case "margin":
                let newmargin = val as Vector2;
                this.options.margin = newmargin;
                planeLayout(this.name, this.options, this.scene);
                break;
            default:
                break;
        }
        return this;
    }

    public zalign(){
        let boundingBox = this.boundingBoxLocal(this.options.selection)
        let widthZ = boundingBox.boundingBox.maximumWorld.z - boundingBox.boundingBox.minimumWorld.z;
        this.options.selection.selected.forEach((node, i) => {
            let test = new Selection([this.options.selection.selected[i]], this.scene);
            let zSize = test.boundingBox().boundingBox.maximumWorld.z - test.boundingBox().boundingBox.minimumWorld.z;
            this.animatePosition((node as TransformNode), new Vector3((node as TransformNode).position.x, (node as TransformNode).position.y, zSize / 2 - widthZ / 2));
        })
        return this;
    }

    public stretch(){
        let boundingBox = this.boundingBoxLocal(this.options.selection)
        let widthX = boundingBox.boundingBox.maximumWorld.x - boundingBox.boundingBox.minimumWorld.x;
        let widthY = boundingBox.boundingBox.maximumWorld.y - boundingBox.boundingBox.minimumWorld.y;
        let widthZ = boundingBox.boundingBox.maximumWorld.z - boundingBox.boundingBox.minimumWorld.z;
        this.options.selection.selected.forEach((node, i) => {
            this.animateScale((node as TransformNode), new Vector3(widthX / 6, widthY / 6, widthZ / 6));
        })
        return this;
    }

    public cylinderLayout(){
        let rownum = this.options.rows || 1
        let padding = this.options.margin || new Vector2(0,0)
        let chartnum = this.options.selection.selected.length
        //let boundingBox = this.options.selection.boundingBox()
        let boundingBox = this.boundingBoxLocal(this.options.selection)
        let radius = this.options.radius || 5
        let widthX = boundingBox.boundingBox.maximumWorld.x - boundingBox.boundingBox.minimumWorld.x;
        let colnum = this.options.columns || chartnum;

        colnum = chartnum % rownum == 0 ? chartnum / rownum : colnum = Math.floor(chartnum / rownum) + 1;

        var angle = Math.atan(widthX / 2 / radius) * 2

        var up = new Vector3(0, 1, 0);
        var forward = new Vector3(0, 0, 1);

        let cells : Mesh[] = [];
        
        this.options.selection.selected.forEach((node, i) => {
            if(node.parent == null){
                let m = new Mesh("cell", this.scene);
                node.parent = m;
                cells.push(m);
            } else {
                cells.push((node.parent as Mesh));
            }
        })

    }



    // public planeLayout = planeLayout;
    // public cylinderLayout = cylinderLayout;
    // public cockpitLayout = cockpitLayout
    
}

export function planeLayout(name: string, options: LayoutOptions, scene: Scene): Layout {

    const Options: LayoutOptions = {
        selection: options.selection,
        rows: options.rows || 1,
        columns: options.columns || options.selection.selected.length,
        margin: options.margin || new Vector2(0,0),
        order: options.order || [],
    }
 
    return new Layout(name, Options, scene).planeLayout();
}

export function cylinderLayout(){}

export function cockpitLayout(){}
