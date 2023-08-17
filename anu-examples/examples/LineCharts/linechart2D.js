// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import {extent, csv, timeYear, timeParse, timeFormat, scaleTime, scaleLinear, scaleSequential, interpolateBlues} from "d3";
import * as anu from "anu";
import {Mesh, TransformNode, Color3, Scene, Vector3, HemisphericLight, ArcRotateCamera} from "@babylonjs/core";

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
  camera.position = new Vector3(10.5,7,-10.5);

  let CoT = new TransformNode("cot");

 

  csv("../data/yield-curve.csv", (d) => d).then((data) => {
    let years = ["1 Yr", "2 Yr", "3 Yr", "5 Yr", "7 Yr", "10 Yr"];

    var parseTime = timeParse("%m/%d/%Y");
    var dateFormat = timeFormat("%y");
    let dates = data.map((d) => parseTime(d.Date))
  
    var scaleX = scaleTime().domain(extent(dates)).range([-5, 5]);
    var scaleY = scaleLinear().domain([0, 9]).range([-2, 2]).nice();
    var scaleC = scaleSequential(interpolateBlues).domain([2, -2]);

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


    let axis = new anu.Axis("testAxis", scene, {
      cot: anu.select("#cot", scene),
      x: scaleX,
      y: scaleY
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
          x: scaleX.ticks(timeYear.every(2)),
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
        x: scaleX.ticks(timeYear.every(2)),
        y: scaleY.ticks(),
      });

    

      
  });

  return scene;
}