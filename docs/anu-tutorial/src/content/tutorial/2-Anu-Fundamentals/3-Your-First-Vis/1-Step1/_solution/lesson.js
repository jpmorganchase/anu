import * as anu from "@jpmorganchase/anu";
import penguins from "./penguins.json" assert {type: 'json'}

export default (scene) => {
    
    let cot = anu.bind('cot');

    let marks = cot.bind('sphere', {segments: 16}, penguins);

    return scene
}