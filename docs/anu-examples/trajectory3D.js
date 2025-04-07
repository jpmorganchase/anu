// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import data from './data/drone-path.json';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';

export function trajectory3D(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -10), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(2, 10, -15);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Use the Texture Map prefab to create a plane with an OpenLayers map canvas as the texture
  let textureMap = anu.createTextureMap('map', 
    {
      layers: [new TileLayer({
        source: new XYZ({
          crossOrigin: 'anonymous',                                 //Required
          urls: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png']  //Update the urls array with an XYZ tile provider of your choice
        })
      })],
      mapHeight: 1000,                                                                                                      
      mapWidth: 1000
    });

  //Get the OpenLayers map object from the prefab which we will need to customize its settings
  let map = textureMap.map;
  //Get the center lon/lat of our dataset
  let center = [
    (Math.min(...data.map(d => d.longitude)) + Math.max(...data.map(d => d.longitude))) / 2,
    (Math.min(...data.map(d => d.latitude)) + Math.max(...data.map(d => d.latitude))) / 2
  ];
  //Change the view parameters of the map to focus on our calculated center
  map.getView().setCenter(center);
  map.getView().setZoom(17);
  

  //To help create our trajectory, the Texture Map prefab generates scale functions for us to convert lon/lat to positions in Babylon's coordinate space
  let scaleLon = textureMap.scaleLon;
  let scaleLat = textureMap.scaleLat;
  //Create a D3 scale for altitude, our dataset uses sea level so here we'll treat the minimum altitude value as ground level
  let scaleAlt = d3.scaleLinear().domain([Math.min(...data.map(d => d.altitude)), Math.max(...data.map(d => d.altitude))]).range([0, 2]);
  //Create a D3 scale for color, using Anu helper functions map scale outputs to Color3 objects based on the 'interpolateOrRd' palette from D3
  let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toColor3()).domain([0,Math.max(...data.map(d => d.velocity))]);

  //Select our map object as a Selection object which will serve as our CoT
  let chart = anu.selectName('map', scene);

  //We want to render our trajectory after the map has finished loading, use OpenLayers' callback functions for this
  //N.B: Texture Map's scale functions are only created after the map is fully rendered, so we need to use this callback regardless
  map.once('postrender', () => {
    //Create arrays for our flight path using our scales to convert data values to Vector3 coordinates and Color3 objects
    let flightPath =  data.map(d => new BABYLON.Vector3(scaleLon([d.longitude, d.latitude]), scaleAlt(d.altitude), scaleLat([d.longitude, d.latitude])));
    let flightColors = data.map(d => scaleC(d.velocity));

    //Create a greasedLine as a child of our CoT using the flight path and colors we just calculated
    let trajectories = chart.bind('greasedLine',
                                  {
                                    meshOptions: { points: flightPath },
                                    materialOptions: { useColors: true, colors: flightColors }
                                  });
  });

  return scene;
}