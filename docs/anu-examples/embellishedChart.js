// // SPDX-License-Identifier: Apache-2.0
// // Copyright : J.P. Morgan Chase & Co.

// import * as anu from '@jpmorganchase/anu';
// import * as BABYLON from '@babylonjs/core';
// import * as d3 from 'd3';
// import '@babylonjs/loaders';    //Required to load meshes

// //Create and export a function that takes a Babylon engine and returns a Babylon Scene
// export async function embellishedChart(engine){   //Mark this function as async

//   //Create an empty Scene
//   const scene = new BABYLON.Scene(engine);
//   //Add some lighting
//   new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -5), scene);
//   //Add a camera that rotates around the origin and adjust its properties
//   const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, -0.4, 0), scene);
//   camera.position = new BABYLON.Vector3(2, 0.75, -2);
//   camera.wheelPrecision = 20;
//   camera.minZ = 0;
//   camera.attachControl(true);

//   //Load a 3D model asynchronously, here we use one from the Babylon.js Assets library licensed under CC BY 4.0
//   BABYLON.ImportMeshAsync('https://raw.githubusercontent.com/BabylonJS/Assets/refs/heads/master/meshes/aerobatic_plane.glb', scene).then(result => {
//     //Get the mesh
//     let planeMesh = result.meshes[0];
    
//     //Create some fake data of planes
//     let data = [
//       {
//         "model": "Plane A",
//         "maxSpeed": 350,
//         "weight": 2100,
//         "maxAltitude": 11000
//       },
//       {
//         "model": "Plane B",
//         "maxSpeed": 150,
//         "weight": 1600,
//         "maxAltitude": 9500
//       },
//       {
//         "model": "Plane C",
//         "maxSpeed": 430,
//         "weight": 3200,
//         "maxAltitude": 11500
//       },
//       {
//         "model": "Plane D",
//         "maxSpeed": 230,
//         "weight": 2100,
//         "maxAltitude": 10500
//       },
//       {
//         "model": "Plane E",
//         "maxSpeed": 390,
//         "weight": 2800,
//         "maxAltitude": 12000
//       },
//       {
//         "model": "Plane F",
//         "maxSpeed": 190,
//         "weight": 2500,
//         "maxAltitude": 9000
//       },
//       {
//         "model": "Plane G",
//         "maxSpeed": 310,
//         "weight": 1700,
//         "maxAltitude": 10000
//       },
//       {
//         "model": "Plane H",
//         "maxSpeed": 270,
//         "weight": 1500,
//         "maxAltitude": 9500
//       }
//     ];

//     //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
//     let scaleX = d3.scaleBand().domain(Object.values(data.map(d => d.model))).range([-1,1]).paddingInner(1).paddingOuter(0.5);
//     let scaleY = d3.scaleLinear().domain(d3.extent(data.map(d => d.maxAltitude))).range([-0.25, 0.25]);
//     let scaleZ = d3.scaleLinear().domain([0, Math.max(...data.map(d => d.maxSpeed))]).range([-1, 1]).nice();
//     let scaleSize = d3.scaleLinear().domain([0, Math.max(...data.map(d => d.weight))]).range([0, 2]);

//     //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
//     let CoT = anu.create('cot', 'cot');
//     //Select our CoT so that we have it as a Selection object
//     let chart = anu.selectName('cot', scene);

//     //Create clones of the plane mesh as children of our CoT for each row of our data and set their visual encodings using method chaining
//     let planes = chart.bindClone(planeMesh, data)
//                       .position((d) => new BABYLON.Vector3(scaleX(d.model), scaleY(d.maxAltitude) - 0.125, scaleZ(d.maxSpeed)))  //Offset y a little as the plane model's origin is not centered
//                       .rotation(new BABYLON.Vector3(0, 0, 0))
//                       .scaling((d) => new BABYLON.Vector3(scaleSize(d.weight), 1, scaleSize(d.weight)));
                      
//     //Use the Axes prefab with our three D3 scales
//     anu.createAxes('myAxes',
//       {
//         scale: { x: scaleX, y: scaleY, z: scaleZ },
//         labelTicks: { y: scaleY.ticks(6)},
//         parent: chart
//       }
//     );

//     //Disable the original plane mesh to hide it
//     planeMesh.setEnabled(false);
//   });

//   return scene;
// }