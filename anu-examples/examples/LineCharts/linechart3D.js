// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as d3 from "d3";
import * as anu from "anu";
import {VertexBuffer, Mesh, TransformNode, Color3, Scene, Vector3, HemisphericLight, ArcRotateCamera, MeshBuilder } from "@babylonjs/core";

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
  camera.position = new Vector3(10.5,7,-10.5);

  let CoT = new TransformNode("cot");

 

  d3.csv("../data/yield-curve.csv", (d) => d).then((data) => {
    let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

    var parseTime = d3.timeParse("%m/%d/%Y");
    var dateFormat = d3.timeFormat("%y");
    let dates = data.map((d) => parseTime(d.Date))
  
    var scaleX = d3.scaleTime().domain(d3.extent(dates)).range([-5, 5]);
    var scaleY = d3.scaleLinear().domain([0, 9]).range([-2, 2]).nice();
    var scaleZ = d3.scalePoint().domain(years).range([-3, 3]);
    var scaleC = d3.scaleSequential(d3.interpolateBlues).domain([2, -2]);

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

    let axis = new anu.Axis("testAxis", scene, {
      cot: anu.select("#cot", scene),
      x: scaleX,
      y: scaleY,
      z: scaleZ,
    })
      .shape(
        { radius: 0.02 },
        {
          "material.diffuseColor": Color3.Black,
          "material.alpha": 1,
          "material.specularColor": Color3.Black,
        }
      )
      .background()
      .ticks(
        {
          x: scaleX.ticks(d3.timeYear.every(2)),
          y: scaleY.ticks(),
        },
        {
          x: {
            text: (d) => {
              return dateFormat(d.text);
            },
          },
          y: {
            text: (d) => {
              if (d.text === undefined) {
                return "0%";
              } else {
                return d.text + "%";
              }
            },
          },
        }
      )
      .grid({
        x: scaleX.ticks(d3.timeYear.every(2)),
        y: scaleY.ticks(),
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
      
  });


  

  return scene;
}
