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
  camera.position = new Vector3(0, 2.5, -2)



  let map = anu.createMeshMap('meshMap', {geoJson: geoJ, depth: 0.05, projection: d3.geoAlbers().reflectY(true), size: [2,2], simplification: 0.00001});


  let projection = map.projection;

  let states = map.selection;


  let colorScale = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())

  states.material((d) => colorScale(d.NAME))
        .prop("isPickable", false); //complex geometry has performance impact when pickable 
                                    //if you need to select it wrap it in a empty mesh with bounding box set

  let mapCot = anu.selectName('meshMap', scene);

  let rootSphere = anu.create('sphere', 'sphere', {diameter: 0.003})
    rootSphere.isVisible = false;
    rootSphere.registerInstancedBuffer("color", 4);
    rootSphere.instancedBuffers.color = new Color4(1,1,1,1) 

  let spheres =  mapCot.bindInstance(rootSphere, data)
    .positionX((d) =>  projection([d.longitude, d.latitude])[0])
    .positionZ((d) => projection([d.longitude, d.latitude])[1])
    .setInstancedBuffer("color", new Color4(0,0,0,1))

  mapCot.position(new Vector3(0,1,-0.5))

  camera.setTarget(mapCot.selected[0]);

  return scene;
}