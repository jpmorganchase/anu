// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/airports.csv';
import geoJ from './data/gz_2010_us_040_00_5m.json';

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function choroplethMap(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.05;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  fillLight.specular = new BABYLON.Color3(0,0,0); //Minimize specular highlights
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 1.25, -1);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Use the Mesh Map prefab to create 3D meshes based on GeoJSON data
  let meshMap = anu.createMeshMap('meshMap', { geoJson: geoJ,
                                               depth: 0.02,
                                               projection: d3.geoAlbers().reflectY(true), //Flip the Y so we don't have to rotate it later
                                               size: [2, 2],
                                               simplification: 0.00001 });  //Higher value = less vertices = better performance but less detail

  //The prefab contains a Selection that consists of the Meshes for each polygon in our GeoJSON (i.e., the US states)
  let states = meshMap.selection;
  
  //Aggregate the count of airports in each state in our dataset
  let counts = data.reduce((acc, airport) => {
    acc[airport.state] = (acc[airport.state] || 0) + 1;
    return acc;
  }, {});

  //Create a D3 scale for color, using Anu helper functions map scale outputs to StandardMaterial objects based on the 'OrRd' palette from D3
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toStandardMaterial()).domain([0, Math.max(...Object.values(counts))]);
  
  //Our geoJSON uses full state names but our airport data uses abbreviations
  const stateAbbreviations = { "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "District of Columbia": "DC", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY" };

  //Assign each state a Material and therefore, their color, based on the number of airports
  states.material((d) => scaleC(counts[stateAbbreviations[d.NAME]]));
  
  return scene;
}