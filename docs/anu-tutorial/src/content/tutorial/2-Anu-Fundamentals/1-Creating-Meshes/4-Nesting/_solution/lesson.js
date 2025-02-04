import * as anu from "@jpmorganchase/anu";

export default (scene) => {
    
    let data = [
        {goals: 10, assists: 5, points: 2},
        {goals: 3, assists: 15, points: 8},
        {goals: 1, assists: 8, points: 15}
      ];

    let cot = anu.bind('cot');

    let boxes = cot.bind('box',
    {
      height: (d) => d.goals,
      width: (d) => d.assists,
      depth: (d) => d.points
    },
    data,
    scene
    );
    
    return scene
}