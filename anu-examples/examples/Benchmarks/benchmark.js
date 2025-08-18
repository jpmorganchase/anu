// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import {HemisphericLight, Vector3, Scene, ArcRotateCamera, Mesh, Matrix, SolidParticleSystem} from '@babylonjs/core'; 
import * as d3 from "d3"
//import { Mesh } from 'anu';

//create and export a function that takes a babylon engine and returns a scene
export const benchmark = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(-2.5,2,-20);

  let center = anu.create('cot', 'cot')

  let cot = anu.selectName('cot', scene);

  let n = 0;

  let m;


  let scale = d3.scaleLinear().domain([0,5]).range([0,5]);

  // setInterval(() => {
    let data = Array.from({length: 8000}, () => Math.floor(Math.random() * 100));
    m = cot.bind('sphere', {diameter: 0.1}, data);
    m.position((d) => new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5))
  // }, 5000)


    anu.createAxes('test', {scale: {x: scale, y: scale, z: scale}, parent: cot, label: true, grid: true, background: true, domain: true}, scene)

  //let sphere = anu.create('sphere', 'sphere', {diameter: 0.1})
  
  //let cot = anu.selectName('cot', scene);

  // anu.bindInstance(sphere, [{}])

  

  // setInterval(() => {
  //   let data = Array.from({length: n += 500}, () => Math.floor(Math.random() * 100));
  //   m?.dispose();
  //   m = cot.bindInstance(sphere, data);
  //   m.position((d) => new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5))
  // }, 5000)

  // let SPS;
  // SPS = new SolidParticleSystem("SPS", scene, { expandable: true }); // scene is required
  // let sphere = anu.create("box", "sphere", {size: 0.1})
  // setInterval(() => {
    

  //   SPS.addShape(sphere, 10000); // 20 spheres
  
  //    //free memory
    
  //   const mesh = SPS.buildMesh(); 

  //   for (let p = 0; p < SPS.nbParticles; p++) {
  //       const particle = SPS.particles[p];
  //       //Place particles at random positions with a cube
  //       particle.position = new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5)
  //   }

     


  // SPS.initParticles();
  // SPS.setParticles();

  //   //m.position((d) => new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5))
  // }, 5000)

  //  let observer = scene.onBeforeRenderObservable.add(() => {
  //   m?.rotationY((d,n,i) => n.rotation.y += Math.log(d) * 0.01)
  // });




  return scene;
  
  };
  


