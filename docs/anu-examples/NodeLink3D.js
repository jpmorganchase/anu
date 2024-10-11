// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu'
import * as d3 from 'd3';
import { Scene, HemisphericLight, ArcRotateCamera, StandardMaterial, Vector3, Color3, Color4 } from '@babylonjs/core';
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceCollide } from 'd3-force-3d'; //External required dependency for force layouts
import leMis from './data/miserables.json' assert {type: 'json'}; //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function nodelink3d(engine) {

//Create an empty Scene
  const scene = new Scene(engine);

  //Add some lighting
  let light = new HemisphericLight('light1', new Vector3(0, 10, 0), scene);
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 1, 1);
  light.groundColor = new Color3(1, 1, 1);

  //Add a camera that rotates around the origin and adjust its properties
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 30; // Adjust the sensitivity of the mouse wheel's zooming
  camera.minZ = 0;            // Adjust the distance of the camera's near plane
  camera.attachControl(true); // Allow the camera to respond to user controls
  camera.position = new Vector3(1, 1.5, -4);

  //Create a D3 color scale that returns a Color4 for our nodes
  const scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

  //Create a D3 simulation with several forces
  const simulation = forceSimulation(leMis.nodes, 3)
                        .force("link", forceLink(leMis.links))
                        .force("charge", forceManyBody())
                        .force("collide", forceCollide())
                        .force("center", forceCenter(0, 0, 0))
                        .on("tick", ticked)
                        .on("end", () => simulation.stop());


  //Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our network
  let CoT = anu.bind("cot", "cot");

  //We will be using instancing, so create a sphere mesh to be the root of our instanced meshes
  let rootSphere = anu.create('sphere', 'node');
  rootSphere.isVisible = false;
  rootSphere.material = new StandardMaterial('mat');
  rootSphere.material.specularColor = new Color3(0, 0, 0);
  rootSphere.registerInstancedBuffer('color', 4);
  rootSphere.instancedBuffers.color = new Color4(0, 0, 0, 1);

  //Create the spheres for our network and set their properties
  let nodes = CoT.bindInstance(rootSphere, leMis.nodes)
                       .position((d) => new Vector3(d.x, d.y, d.z))
                       .scaling(new Vector3(6,6,6))
                       .id((d) => d.id)
                       .setInstancedBuffer('color', (d) => scaleC(d.group));

  //We will be using a lineSystem mesh for our edges which takes a two dimension array and draws a line for each sub array.
  //lineSystems use one draw call for all line meshes and will be the most performant option
  //This function helps prepare our data for that data structure format.
  let updateLines = (data) => {
      let lines = [];
      data.forEach((v, i) => {
          let start = new Vector3(v.source.x, v.source.y, v.source.z);
          let end = new Vector3(v.target.x, v.target.y, v.target.z);
          lines.push([start, end]);
      })
      return lines;
  }

  //Create our links using our data and function from above
  let links = CoT.bind("lineSystem", { lines: (d) => updateLines(d), updatable: true }, [leMis.links])
                 .prop("color", new Color4(1, 1, 1, 1))
                 .prop("alpha", 0.3);

  //Use the run method to access our root node and call normalizeToUnitCube to scale the visualization down to 1x1x1
  CoT.run((d, n) => { n.normalizeToUnitCube() });

  //Update the position of the nodes and links each time the simulation ticks.
  function ticked() {
    //For the instanced spheres just set a new position
    nodes.position((d) => new Vector3(d.x, d.y, d.z));

    //For the links use the run method to replace the lineSystem mesh with a new one.
    //The option instance takes the old mesh and replaces it with a new mesh.
    links.run((d, n, i) => anu.create('lineSystem', 'edge', { lines: updateLines(d), instance: n, updatable: true }, d));
  }

  //Stops the simulation when we change pages, which is useful for multi-page apps
  window.navigation.addEventListener("navigate", (event) => {
      simulation.stop();
  })

  return scene;
}