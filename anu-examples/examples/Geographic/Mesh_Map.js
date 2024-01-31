// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Scene, Color4, HemisphericLight, ArcRotateCamera, Vector2 } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import {csv} from 'd3';
import data from 'anu/../../data/airports.csv'
import geoJ from "anu/../../data/gz_2010_us_040_00_5m.json"


export function meshMap(babylonEngine){
  const scene = new Scene(babylonEngine);
  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0, 20, -20)


  anu.createMeshMap('test', {geoJson: geoJ});

  //Use D3 to read in our csv data




  return scene;
}