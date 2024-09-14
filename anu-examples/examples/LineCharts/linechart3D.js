// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as d3 from "d3";
import * as anu from '@jpmorganchase/anu';
import {VertexBuffer, Mesh, TransformNode, Color3, Scene, Vector3, HemisphericLight, ArcRotateCamera, SimplificationType} from "@babylonjs/core";
import data from './yield-curve.csv'


export function linechart3D(babylonEngine) {
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
  camera.position = new Vector3(5,0,-6);

  let CoT = new TransformNode("cot");

    let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

    var parseTime = d3.timeParse("%m/%d/%Y");
    var dateFormat = d3.timeFormat("%y");
    let dates = data.map((d) => parseTime(d.Date))
  
    var scaleX = d3.scaleTime().domain(d3.extent(dates)).range([-3, 3]);
    var scaleY = d3.scaleLinear().domain([0, 9]).range([-1, 1]).nice();
    var scaleZ = d3.scalePoint().domain(years).range([-2, 2]);
    var scaleC = d3.scaleSequential(d3.interpolateBlues).domain([1, -1]);

    let myPaths2 = years.map((r) => {
      return data.map((c)=> {
            return new Vector3(
            scaleX(parseTime(c.Date)),
            scaleY(c[r]),
            scaleZ(r)
          )
      })
    })

    const options = {
      pathArray: myPaths2, 
      updatable: true,
      sideOrientation: Mesh.DOUBLESIDE,
    };

    let ribbonSelection = anu
      .select("#cot", scene)
      .bind("ribbon", options)

    let ribbon = ribbonSelection.selected[0]

    var colors = ribbon.getVerticesData(VertexBuffer.ColorKind);
    if (!colors) {
      colors = [];

    var positions = ribbon.getVerticesData(VertexBuffer.PositionKind);
      
    for (var p = 0; p < positions.length; p+=3) {
      var color = scaleC(positions[p + 1])
        .substring(4, scaleC(positions[p + 1]).length - 1)
        .replace(/ /g, "")
        .split(",");

      colors.push(color[0] / 225, color[1] / 225, color[2] / 225, 1);
      }
    }

    ribbon.setVerticesData(VertexBuffer.ColorKind, colors);
    ribbon.isPickable = false; //mesh geometry is complex turning off picking is recommended for performance. 

    anu.createAxes('test', scene, { parent: anu.select("#cot", scene),
                                    scale: {x: scaleX, y: scaleY, z: scaleZ},
                                    domainMaterialOptions: { "color": Color3.Black(), width: 5},
                                    gridTicks: {x: scaleX.ticks(d3.timeYear.every(2))},
                                    labelTicks: {x: scaleX.ticks(d3.timeYear.every(2))},
                                    labelFormat: {x: dateFormat, y: (text) => {
                                                  if (text == undefined) {
                                                    return text;
                                                  } else {
                                                    return text + "%";
                                                  }}
                                                }
                                  });

    let whiteLines = anu
      .select("#cot", scene)
      .bind("lineSystem", { lines: myPaths2 })
      .attr("color", new Color3(1, 1, 1))
      .prop("alpha", 0.5);
  
    let  blackOutline = anu
      .select("#cot", scene)
      .bind("lines", { points: myPaths2[0]})
      .attr("color", new Color3(0, 0, 0));
   
                                  
  return scene;
}
