// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import iris from '../../data/iris.json' assert {type: 'json'}; //Our data
import {HemisphericLight, Vector3, Scene, ArcRotateCamera, ActionManager, InterpolateValueAction, Matrix , SceneLoader, Color4} from '@babylonjs/core'; 
import {extent, scaleOrdinal, scaleLinear, map,} from "d3";

//import { Mesh } from 'anu';

//create and export a function that takes a babylon engine and returns a scene
export const scatterplotThinInstance = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(2,2,-3.5);

  //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between -10 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = scaleLinear().domain(extent(map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice(); //
  var scaleZ = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice(); //Same as X for our Y and Z dimensions 

  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. schemecategory10 is an array of 10 color hexes
  var scaleC = scaleOrdinal(anu.ordinalChromatic('d310').toColor4())
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = anu.create("cot", "cot");

  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot', scene);

  SceneLoader.Append('./', "test.obj", scene);
  
  // let spheres = chart.bind('sphere', {diameter: 0.05}, iris) 
  //   .positionX((d) => scaleX(d.sepalLength)) 
  //   .positionY((d) => scaleY(d.petalLength))  
  //   .positionZ((d) => scaleZ(d.sepalWidth)) 
  //   .material((d) => scaleC(d.species))

  let root = anu.create('box', 'root', {size: 1});
  //root.scaling = new Vector3(0.1,0.1,0.1);

  // let thinInstance2 = anu.bindThinInstance(root, iris)
  //                       .thinInstanceSetBuffer('matrix', (d,n,i) => {
  //                         var bufferMatrices = new Float32Array(n.thinInstanceCount * 16 * 3);
  //                         d.forEach((e, i) => {
  //                          let matrix = Matrix.Scaling(0.1,0.1,0.1)
  //                          matrix.copyToArray(bufferMatrices, i * 16);
  //                         });
  //                         return bufferMatrices;

  //                       })
  //                       .thinInstanceSetBuffer('matrix', (d,n,i) => {
  //                         var bufferMatrices = new Float32Array(n.thinInstanceCount * 16 * 3);
  //                         let matricies = n.thinInstanceGetWorldMatrices();
  //                         d.forEach((e, i) => {
  //                          let matrix = matricies[i].multiply( Matrix.Translation(scaleX(e.sepalLength), scaleY(e.petalLength), scaleZ(e.sepalWidth)))
  //                          matrix.copyToArray(bufferMatrices, i * 16);
  //                         });
  //                         return bufferMatrices;
  //                       })

  
  let thinInstance = chart.bindThinInstance(root, iris)
      .thinInstanceScaling(() => new Vector3(Math.random(), Math.random(), Math.random()))    
      .thinInstancePosition((d,n,i) => new Vector3(scaleX(d.sepalLength), scaleY(d.petalLength), scaleZ(d.sepalWidth))) 
      // .thinInstanceRotation(() => Vector3.Random())
      // //.thinInstanceColor((d,n,i) => scaleC(d.species))
      // .thinInstanceRegisterAttribute("color", 4)
      // .thinInstanceSetAttribute("color", [0.5,0.5,0.5,1])
      // .thinInstanceMatrixAt(0, (d,n,i) => Matrix.Translation(-1,-1,-1).multiply(n.thinInstanceGetWorldMatrices()[i]))
      // .thinInstanceMatrixFor((d,n,i) => d.species == "setosa", Matrix.Translation(1,1,1))
      // .thinInstancePositionFor((d,n,i) => d.species == "setosa", new Vector3(1,1,1))
      // .thinInstanceScalingFor((d,n,i) => new Vector3(Math.random(), Math.random(), Math.random()))
      // .thinInstanceRotationFor((d,n,i) => d.species == "setosa", new Vector3(0,0,0))
      // .thinInstanceColorFor((d,n,i) => d.species == "virginica", new Color4(0,0,0, 1))
      // .thinInstancePositionAt(0, new Vector3(-1,-1,-1))
      // .thinInstanceScalingAt(0, new Vector3(1,1,1))
      // .thinInstanceRotationAt(0, new Vector3(0,0,0))
      // .thinInstanceColorAt(0, new Color4(0,0,0,1))

  let data = [{id:"a"},{id:"b"},{id:"c"},{id:"d"},{id:"e"}]

  let cots = anu.bind('cot', {}, data);

  cots.position((d,n,i) => new Vector3(i*40, i*40, i*40))

  // let thinInstance = cots.bindThinInstance(root.clone())
  //                       .thinInstanceSetBuffer('matrix', (d,n,i) => {
  //                         var numPerSide = 40, size = 100, ofst = size / (numPerSide - 1);

  //                         var m = Matrix.Identity();
  //                         var col = 0, index = 0;

  //                         let instanceCount = numPerSide * numPerSide * numPerSide;

  //                         let matricesData = new Float32Array(16 * instanceCount);
  //                         let colorData = new Float32Array(4 * instanceCount);
                      
  //                         for (var x = 0; x < numPerSide; x++) {
  //                             m.m[12] = -size / 2 + ofst * x;
  //                             for (var y = 0; y < numPerSide; y++) {
  //                                 m.m[13] = -size / 2 + ofst * y;
  //                                 for (var z = 0; z < numPerSide; z++) {
  //                                     m.m[14] = -size / 2 + ofst * z;
                      
  //                                     m.copyToArray(matricesData, index * 16);
                      
  //                                     var coli = Math.floor(col);
                      
  //                                     colorData[index * 4 + 0] = ((coli & 0xff0000) >> 16) / 255;
  //                                     colorData[index * 4 + 1] = ((coli & 0x00ff00) >>  8) / 255;
  //                                     colorData[index * 4 + 2] = ((coli & 0x0000ff) >>  0) / 255;
  //                                     colorData[index * 4 + 3] = 1.0;
                      
  //                                     index++;
  //                                     col += 0xffffff / instanceCount;
  //                                 }
  //                             }
  //                         }
                          
  //                         return matricesData;
  
  //                         })
                          //.thinInstancePosition((d,n,i) => new Vector3(i,i,i))

      
  //root.scaling = new Vector3(0.1,0.1,0.1);
   

   //console.log(thinInstance.selected)
        
   // anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});
 

    return scene;
  
  };
  


