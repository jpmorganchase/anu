import { Vector3, Scene, Color4, HemisphericLight, ArcRotateCamera, Vector2 } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import data from './data/airports.csv'


export function textureGlobe(babylonEngine){
  const scene = new Scene(babylonEngine);
  //Add some lighting
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  //Add a camera that rotates around the origin
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 50;
  camera.minZ = 0;
  camera.attachControl(true)
  camera.position = new Vector3(0, 4, -2.5)



  //Use D3 to read in our csv data


    let globe = anu.createTextureGlobe('globe', {resolution: new Vector2(5000,2500), diameter:1})

    let rootSphere = anu.create('sphere', 'sphere', {diameter: 0.02})
    rootSphere.isVisible = false;
    rootSphere.registerInstancedBuffer("color", 4);
    rootSphere.instancedBuffers.color = new Color4(1,1,1,1)

    let spheres =  anu.selectName('globe', scene).bindInstance(rootSphere, data)
    .setInstancedBuffer("color", new Color4(0,0,0,1))
    .scaling(new Vector3(0.1,0.1,0.1))
    .position((d) => globe.lonLatToVector3([d.longitude, d.latitude]))



    anu.selectName('globe', scene).position(new Vector3(0, 0, 0))

  return scene;
}