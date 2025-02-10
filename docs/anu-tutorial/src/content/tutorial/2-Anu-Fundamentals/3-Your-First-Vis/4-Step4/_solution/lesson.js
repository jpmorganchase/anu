import * as anu from "@jpmorganchase/anu";
import penguins from "./penguins.json" assert {type: 'json'}
import { extent, scaleLinear, scaleOrdinal} from "d3";
import { Vector3 } from "@babylonjs/core";

export default (scene) => {
    
    let cot = anu.bind('cot');

    let marks = cot.bind('sphere', {segments: 16}, penguins);

    let scaleX = scaleLinear().domain(extent([...penguins.map(item => item["Beak Length (mm)"])])).range([-5,5])

    let scaleY  = scaleLinear().domain(extent([...penguins.map(item => item["Flipper Length (mm)"])])).range([-5,5])

    let scaleZ = scaleLinear().domain(extent([...penguins.map(item => item["Beak Depth (mm)"])])).range([-5,5])

    let scaleSize = scaleLinear().domain(extent([...penguins.map(item => item["Body Mass (g)"])])).range([0.1, 0.5])

    let materials = anu.ordinalChromatic('d310').toStandardMaterial();
    let colorScale = scaleOrdinal(materials)

    marks.positionX((d) => scaleX(d["Beak Length (mm)"]))
         .positionY((d) => scaleY(d["Flipper Length (mm)"]))
         .positionZ((d) => scaleZ(d["Beak Depth (mm)"]))
         .scaling((d) => {
            let scaleFactor = scaleSize(d["Body Mass (g)"])
            return new Vector3(scaleFactor,scaleFactor,scaleFactor)
         })
         .material((d) => colorScale(d["Species"]))
 
    let axes = anu.createAxes("myAxes", scene, {
        scale: {x: scaleX, y: scaleX, z: scaleZ},
        parent: cot
    })


	let labelX = cot.bind("planeText", {text: "Beak Length (mm)"})
                    .position(new Vector3(0, -6, -5))

    let labelY = cot.bind("planeText", {text: "Flipper Length (mm)"})
        .position(new Vector3(-6, 0, -5))
        .rotationZ(90 * (3.14/180))

    let labelZ = cot.bind("planeText", {text: "Flipper Depth (mm)"})
        .position(new Vector3(5, -6, 0))
        .rotationY(-90 * (3.14/180))

    return scene
}