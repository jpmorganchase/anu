import * as anu from "@jpmorganchase/anu";
import penguins from "./penguins.json" assert {type: 'json'}
import { extent, scaleLinear } from "d3";
import { Vector3 } from "@babylonjs/core";

export default (scene) => {
    
    let cot = anu.bind('cot');

    let marks = cot.bind('sphere', {segments: 16}, penguins);

    let scaleX

    let scaleY

    let scaleZ

    return scene
}