// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import iris from './data/iris.json' assert {type: 'json'}; //Our data
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, TransformNode, ActionManager, InterpolateValueAction, StandardMaterial, Color3, MeshBuilder} from '@babylonjs/core'; 
import {extent, scaleOrdinal, scaleLinear, schemeCategory10, map} from "d3";

//import { Mesh } from 'anu';

//create and export a function that takes a babylon engine and returns a scene
export const axesTest = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(28,0,-30);

  //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between -10 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalLength}))).range([-10,10]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = scaleLinear().domain(extent(map(iris, (d) => {return d.petalLength}))).range([-10,10]).nice(); //
  var scaleZ = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalWidth}))).range([-10,10]).nice(); //Same as X for our Y and Z dimensions 

  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. schemecategory10 is an array of 10 color hexes
  var scaleC = scaleOrdinal().domain(['setosa', 'versicolor', 'virginica']).range(schemeCategory10)
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = new TransformNode('cot')

  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot', scene);

 
  //This series of chained methods will create our visualization 
  //Using our CoT as a parent we use bind to create sphere meshes for each row of our data
  // let spheres = chart.bind('sphere', {diameter: 0.5}, iris) 
  //   .positionX((d) => scaleX(d.sepalLength)) //most selection methods can either be passed a raw value, or a function that will return the correct value of the attribute
  //   .positionY((d) => scaleY(d.petalLength))  //When you pass a function the method will pass the data associated with the mesh as JSON and the index of the data (d,i)
  //   .positionZ((d) => scaleZ(d.sepalWidth)) //So we create a function that takes param d and since we know the keys of the data can pass d.<key> into our function that returns an int
  //   .material((d, i) => new StandardMaterial("myMaterial", scene)) //We need to create a material for our mesh before we can change its color
  //   .diffuseColor((d) => Color3.FromHexString(scaleC(d.species))) //change the diffuse color of our material using our color scale function.
  //   //Babylon use an action system to trigger events form interacting with meshes, this is a simple example to show a hover interaction. grow when hover and shrink when stopped. 
  //   .action((d) => new InterpolateValueAction( 
  //         ActionManager.OnPointerOverTrigger,
  //         d,
  //         'scaling',
  //         new Vector3(1.2, 1.2, 1.2),
  //         100
  //     ))
  //     .action((d) => new InterpolateValueAction(
  //       ActionManager.OnPointerOutTrigger,
  //       d,
  //       'scaling',
  //       new Vector3(1, 1, 1),
  //       100));

 
    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    

    return scene;
  
  };
  


