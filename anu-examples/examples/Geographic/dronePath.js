import { Vector3, Scene, HemisphericLight, ArcRotateCamera, ExecuteCodeAction, ActionManager, PointerEventTypes } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import data from 'anu/../../data/drone-path.json';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';

export function dronePath(babylonEngine){

  //Babylon boilerplate
  const scene = new Scene(babylonEngine);
  const light = new HemisphericLight('light1', new Vector3(0, 10, -10), scene)
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  camera.position = new Vector3(2, 10, -15)

  //Create a Texture Map
  let textureMap = anu.createTextureMap('map', 
    {
      layers: [new TileLayer({ 
        source: new XYZ({                                           //Here we demonstrate overriding the default OpenStreetMap tile provider with a custom provider
          crossOrigin: 'anonymous',                                 //Required
          urls: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]  //Change these urls to your favorite tile provider that you have permission to use, here we still use OSM since it is free
        })                                                          //You can easily find these online by searching "XYZ tile providers"
      })],
      mapHeight: 1000,                                                                                                      
      mapWidth: 1000
    });
  let map = textureMap.map;

  //Get the center lon/lat of our dataset
  let center = [
    (Math.min(...data.map(d => d.longitude)) + Math.max(...data.map(d => d.longitude))) / 2,
    (Math.min(...data.map(d => d.latitude)) + Math.max(...data.map(d => d.latitude))) / 2
  ];

  //Position and zoom map
  map.getView().setCenter(center);
  map.getView().setZoom(17);

  //After the map has finished loading, render our trajectory
  map.once('postrender', () => {
      //Scales
      let scaleLon = textureMap.scaleLon;     //Use the provided scales from Texture Map
      let scaleLat = textureMap.scaleLat;     //You can replace these with other d3 scales for non-spatial data
      let scaleAlt = d3.scaleLinear().domain([Math.min(...data.map(d => d.altitude)), Math.max(...data.map(d => d.altitude))]).range([0, 2]); //Altitude in our dataset is sea level, so the minimum altitude is the ground
      let scaleC = d3.scaleSequential(anu.sequentialChromatic('OrRd').toColor3()).domain([0,Math.max(...data.map(d => d.velocity))])

      //Vector3 array of the trajectory
      let flightPath = data.map(d => new Vector3(scaleLon([d.longitude, d.latitude]), scaleAlt(d.altitude), scaleLat([d.longitude, d.latitude])));
      //Color3 array of the trajectory for each segment
      let flightColors = data.map(d => scaleC(d.velocity));

      //Create chart and trajectory
      let CoT = anu.create("cot", "chart");
      let chart = anu.selectName("chart", scene);
      let trajectories = chart.bind('greasedLine', { points: flightPath })     //Since we only have one trajectory, we can just pass in an array of Vector3 into the points parameter
        .run((d,n,i) => {                                                      //Material properties of the greasedLine need to be set separately for now in .run()
          n.greasedLineMaterial.useColors = true;                              //See for customization options: https://doc.babylonjs.com/typedoc/interfaces/BABYLON.IGreasedLineMaterial
          n.greasedLineMaterial.colors = flightColors;
      });
  });

  return scene;
}