// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as d3 from 'd3';  //D3 for scales
import * as anu from 'anu' //Anu for Scene-Graph Manipulation
import iris from '../../data/iris.json' assert {type: 'json'}; //Our data
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, TransformNode, StandardMaterial, Color3} from '@babylonjs/core'; 

//create and export a function that takes a babylon engine and returns a scene
export const scatterplot2D = function(engine){

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
  var scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-10,10]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.petalLength}))).range([-10,10]).nice(); //
  
  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. d3.schemecategory10 is an array of 10 color hexes
  var scaleC = d3.scaleOrdinal().domain(['setosa', 'versicolor', 'virginica']).range(d3.schemeCategory10)
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = new TransformNode('cot')

  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot', scene);

 
  //This series of chained methods will create our visualization 
  //Using our CoT as a parent we use bind to create sphere meshes for each row of our data
  let spheres = chart.bind('disc', {radius: 0.2, sideOrientation:2}, iris) 
    .positionX((d) => scaleX(d.sepalLength)) 
    .positionY((d) => scaleY(d.petalLength))  
    .positionZ((d) => - Math.random() * 0.01)
    .material((d, i) => new StandardMaterial("myMaterial", scene)) 
    .diffuseColor((d) => Color3.FromHexString(scaleC(d.species))) 

 
    //Using the Axis prefab from Anu, we can create our chart axis by passing in d3 scale functions for each xyz dimension. 
    let axis = new anu.Axis('testAxis', scene, {cot: chart, x: scaleX, y: scaleY})
                      .shape()
                      .background()
                      .ticks()
                      .grid();
    

    return scene;
  
  };
  

