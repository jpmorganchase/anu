import * as anu from "@jpmorganchase/anu";
import penguins from "./penguins.json" assert {type: 'json'}
import { extent, scaleLinear } from "d3";
import { Vector3 } from "@babylonjs/core";

export default (scene) => {
    
    let cot = anu.bind('cot');

    let marks = cot.bind('sphere', {segments: 16}, penguins);

    let scaleX = scaleLinear().domain(extent([...penguins.map(item => item["Beak Length (mm)"])])).range([-5,5])

    let scaleY  = scaleLinear().domain(extent([...penguins.map(item => item["Flipper Length (mm)"])])).range([-5,5])

    let scaleZ = scaleLinear().domain(extent([...penguins.map(item => item["Beak Depth (mm)"])])).range([-5,5])

    let scaleSize = scaleLinear().domain(extent([...penguins.map(item => item["Body Mass (g)"])])).range([0.1, 0.5])

    marks.positionX((d) => scaleX(d["Beak Length (mm)"]))
         .positionY((d) => scaleY(d["Flipper Length (mm)"]))
         .positionZ((d) => scaleZ(d["Beak Depth (mm)"]))
         .scaling((d) => {
            let scaleFactor = scaleSize(d["Body Mass (g)"])
            return new Vector3(scaleFactor,scaleFactor,scaleFactor)
         })
 


    return scene
}