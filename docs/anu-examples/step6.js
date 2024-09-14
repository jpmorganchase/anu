// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import { Scene, HemisphericLight, ArcRotateCamera, Vector3, StandardMaterial, Color3} from "@babylonjs/core";
import iris from './data/iris.json' assert {type: 'json'};
import {extent, scaleOrdinal, scaleLinear, schemeCategory10, map} from "d3";


//create and export a function that takes a babylon engine and returns a scene
export const scatterPlot3DStep6 = function(engine){
    
  const scene = new Scene(engine)

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(20,2,-40)


   //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between 0 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalLength}))).range([-10,10]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = scaleLinear().domain(extent(map(iris, (d) => {return d.petalLength}))).range([-10,10]).nice(); //
  var scaleZ = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalWidth}))).range([-10,10]).nice(); //Same as X for our Y and Z dimensions 

  var scaleC = scaleOrdinal().domain(['setosa', 'versicolor', 'virginica']).range(schemeCategory10)

  let cot = anu.bind('cot');
  let spheres = cot.bind('sphere', {diameter: 0.5}, iris);
  

  spheres.positionX((d,n,i) => scaleX(d.sepalLength))
  .positionY((d,n,i) => scaleY(d.petalLength)) 
  .positionZ((d,n,i) => scaleZ(d.sepalWidth))
  .material((d,n,i) => new StandardMaterial("myMaterial" + i, scene))
  .diffuseColor((d) => Color3.FromHexString(scaleC(d.species)));
  

  let axes = anu.createAxes('axes', scene, {  parent: cot, 
                                              scale: {x: scaleX, y: scaleY, z: scaleZ}
                                            });

                                          
  return scene;
}; 
