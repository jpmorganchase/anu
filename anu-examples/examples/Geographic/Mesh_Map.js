// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Scene, Color4, HemisphericLight, ArcRotateCamera, Vector2 } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import data from 'anu/../../data/airports.csv'
import geoJ from "anu/../../data/gz_2010_us_040_00_5m.json"
import * as d3 from 'd3';


export function meshMap(babylonEngine){
  const scene = new Scene(babylonEngine);
  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0, 20, -20)


  let map = anu.createMeshMap('test', {geoJson: geoJ, depth: 0.5, projection: d3.geoAlbers().reflectY(true)});

  let projection = map.projection;

  let states = map.selection;

  let colorScale = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())

  states.material((d) => colorScale(d.NAME));

  let mapCot = anu.selectName('meshMapCOT', scene);

  let rootSphere = anu.create('sphere', 'sphere', {diameter: 0.02})
    rootSphere.isVisible = false;
    rootSphere.registerInstancedBuffer("color", 4);
    rootSphere.instancedBuffers.color = new Color4(1,1,1,1) 

  let spheres =  mapCot.bindInstance(rootSphere, data)
    .positionX((d) =>  projection([d.longitude, d.latitude])[0])
    .positionZ((d) => projection([d.longitude, d.latitude])[1])
    .setInstancedBuffer("color", new Color4(0,0,0,1))

  return scene;
}