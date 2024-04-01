// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import {extent, csv, timeYear, timeParse, timeFormat, scaleTime, scaleLinear, scaleSequential, interpolateBlues} from "d3";
import * as anu from '@jpmorganchase/anu';
import {Mesh, TransformNode, Color3, Scene, Vector3, HemisphericLight, ArcRotateCamera} from "@babylonjs/core";
import data from './data/yield-curve.csv'


export function linechart2D(babylonEngine) {
  const scene = new Scene(babylonEngine);
  new HemisphericLight("light1", new Vector3(0, 10, 0), scene);
  const camera = new ArcRotateCamera(
    "Camera",
    -(Math.PI / 4) * 3,
    Math.PI / 4,
    10,
    new Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(true);
  camera.position = new Vector3(3,0,-6);


  let CoT = new TransformNode("cot");

 

    let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

    var parseTime = timeParse("%m/%d/%Y");
    var dateFormat = timeFormat("%y");
    let dates = data.map((d) => parseTime(d.Date))
  
    var scaleX = scaleTime().domain(extent(dates)).range([-2, 2]);
    var scaleY = scaleLinear().domain([0, 9]).range([-1, 1]).nice();
    var scaleC = scaleSequential(interpolateBlues).domain([1, -1]);

    let myPaths2 = years.map((r) => {
      return data.map((c)=> {
            return new Vector3(
            scaleX(parseTime(c.Date)),
            scaleY(c[r])
          )
      })
    })

    const options = {
      pathArray: myPaths2, 
      updatable: true,
      sideOrientation: Mesh.DOUBLESIDE,
    };

    let whiteLines = anu
      .select("#cot", scene)
      .bind("lineSystem", { lines: myPaths2 })
      .attr("color", new Color3(1, 1, 1))
      .prop("alpha", 1);

      anu.createAxes('test', scene, { parent: anu.select("#cot", scene),
      scale: {x: scaleX, y: scaleY},
      domainMaterialOptions: { "color": Color3.Black(), width: 5},
      gridTicks: {x: scaleX.ticks(timeYear.every(2))},
      labelTicks: {x: scaleX.ticks(timeYear.every(2))},
      labelFormat: {x: dateFormat, y: (text) => {
                    if (text === undefined) {
                      return "0%";
                    } else {
                      return text + "%";
                    }}
                  }
    });
      
 
  return scene;
}
