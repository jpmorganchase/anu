//planeLayout = new anu.planelayout('name', {options}, scene)
import { Selection } from "../../selection";
import { BoundingInfo, Scene, Vector2 } from "@babylonjs/core";

interface planeLayoutOptions {
    selection: Selection,
    rows?: int, 
    columns?: int,
    margin?: Vector2,
    order?: string[],
    zalign?: boolean,
    strech?: boolean,
  }

export class PlaneLayout{
    name: string;
    options: planeLayoutOptions;
    scene: Scene;
    boundingBox: BoundingInfo;
    
    constructor(name: string, options: planeLayoutOptions, scene: Scene) {
        this.name = name;
        this.options = options;
        this.scene = scene;
        this.boundingBox = options.selection.boundingBox();
    }



    makeGrids(){
        let rownum = this.options.rows
        let padding = this.options.margin

        let chartnum = this.options.selection.selected.length

        let widthX = this.boundingBox.boundingBox.maximumWorld.x - this.boundingBox.boundingBox.minimumWorld.x;
        let widthY = this.boundingBox.boundingBox.maximumWorld.y - this.boundingBox.boundingBox.minimumWorld.y;
        let widthZ = this.boundingBox.boundingBox.maximumWorld.z - this.boundingBox.boundingBox.minimumWorld.z;

        let colnum = this.options.columns;

        colnum = chartnum % rownum == 0 ? chartnum / rownum : Math.floor(chartnum / rownum) + 1;

        for(var i = 0; i < charts.selected.length; i++) {
            cells.selected[i].id = i;
            cells.selected[i].setBoundingInfo(new BoundingInfo(box.getBoundingInfo().boundingBox.minimumWorld, box.getBoundingInfo().boundingBox.maximumWorld));
            animatePosition(scene, cells.selected[i], new Vector3(i % colnum * (widthX + padding), Math.floor(i / colnum) * (widthY + padding), 0));
            // cells.selected[i].position = new Vector3(i % colnum * (widthX + padding), Math.floor(i / colnum) * (widthY + padding), 0);
            cells.selected[i].showBoundingBox = true;
            //charts.selected[i].parent = cells.selected[i];
        }
    }
}

export function planeLayout(name: string, options: planeLayoutOptions, scene: Scene): PlaneLayout {

    const Options: planeLayoutOptions = {
        selection: options.selection,
        rows: options.rows || 1,
        columns: options.columns || options.selection.selected.length,
        margin: options.margin || new Vector2(0,0),
        order: options.order || [],
        zalign: options.zalign || false,
        strech: options.strech || false
    }

    let layout = new PlaneLayout(name, Options, scene);

    return layout;

}