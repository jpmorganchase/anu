import { Vector3, StandardMaterial, Color3} from "@babylonjs/core";
import { scaleOrdinal } from "d3-scale";
import * as anu from "@jpmorganchase/anu";

export default (scene) => {
    
    let data = [
        {goals: 10, assists: 5, points: 2, group: 'a'},
        {goals: 3, assists: 15, points: 8, group: 'b'},
        {goals: 1, assists: 8, points: 15, group: 'c'},
        {goals: 1, assists: 5, points: 2, group: 'a'},
        {goals: 13, assists: 5, points: 8, group: 'b'},
        {goals: 4, assists: 2, points: 5, group: 'c'}
      ];

    let boxes = anu.bind('box', {size: 1}, data)
                   .position((d) => new Vector3(d.goals, d.assists, d.points));

    let material
    
    boxes

    return scene
}