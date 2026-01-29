// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import * as d3force from 'd3-force-3d'; //External required dependency for force layouts
import leMis from './data/miserables.json' assert {type: 'json'};

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function nodelink3d(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  let light = const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  light.diffuse = new BABYLON.Color3(1, 1, 1);
  light.specular = new BABYLON.Color3(1, 1, 1);
  light.groundColor = new BABYLON.Color3(1, 1, 1);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(1, 1.5, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Create a D3 color scale using Anu helper functions to map values to Color4 objects with colors based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

  //Create a D3 simulation with several forces, this function mutates the data object we pass in so we make a deep clone of it first
  let data = JSON.parse(JSON.stringify(leMis));
  let simulation = d3force.forceSimulation(data.nodes, 3)
                          .force('link', d3force.forceLink(data.links))
                          .force('charge', d3force.forceManyBody())
                          .force('collide', d3force.forceCollide())
                          .force('center', d3force.forceCenter(0, 0, 0))
                          .on('tick', ticked)
                          .on('end', () => simulation.stop());

  //We use Mesh instancing here for better performance, first we create a Mesh that serves as the root Node
  let rootSphere = anu.create('sphere', 'node', { diameter: 5 });
  rootSphere.isVisible = false;
  rootSphere.registerInstancedBuffer('color', 4);   //We need an InstancedBuffer to set the color of instances
  
  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let network = anu.selectName('cot', scene);

  //Create instanced sphere meshes from our rootSphere as children of our CoT for each row of our data and set their initial visual encodings using method chaining
  let nodes = network.bindInstance(rootSphere, data.nodes)
                       .position((d) => new BABYLON.Vector3(d.x, d.y, d.z))
                       .setInstancedBuffer('color', (d) => scaleC(d.group))
                       .id((d) => d.id);

  //Create a helper function that will return us an array of arrays where each sub-array is the start and end Vector3 of each link
  function dataToLinks(data) {
    let lines = [];
    data.forEach((v, i) => {
        let start = (new BABYLON.Vector3(v.source.x, v.source.y, v.source.z));
        let end = (new BABYLON.Vector3(v.target.x, v.target.y, v.target.z));
        lines.push([start, end]);
    })
    return lines;
  }

  //Create our lineSystem mesh using our data and helper function from above
  let links = network.bind('lineSystem', { lines: (d) => dataToLinks(d), updatable: true }, [data.links])
                     .prop('color', new BABYLON.Color4(1, 1, 1, 1));

  //Update the position of the nodes and links each time the simulation ticks
  function ticked() {
    //For the instanced spheres just set a new position
    nodes.position((d) => (new BABYLON.Vector3(d.x, d.y, d.z)));
    //For the links use the run method to replace the lineSystem mesh with a new one, passing in the mesh into the instance option
    links.run((d, n, i) => anu.create('lineSystem', 'edge', { lines: dataToLinks(d), instance: n, updatable: true }, d));
  }

  //The network can get quite big in size (spatial size), so here we run a function to scale the entire network down to a 1x1x1 box
  network.run((d,n,i) => n.normalizeToUnitCube());

  return scene;
}