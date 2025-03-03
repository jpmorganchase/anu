import * as anu from '@jpmorganchase/anu';

export default (scene) => {
  let data = { goals: 5, assists: 10, points: 2 };

  let box = anu.create(
    'box',
    'ourBox',
    { height: (d) => d.goals, width: (d) => d.assists, depth: (d) => d.points },
    data,
  );

  return scene;
};
