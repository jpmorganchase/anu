import * as anu from '@jpmorganchase/anu' 
import iris from './data/iris.json' assert {type: 'json'}; 
import {HemisphericLight, Vector3, Scene, ArcRotateCamera, ActionManager, InterpolateValueAction} from '@babylonjs/core'; 
import {extent, scaleOrdinal, scaleLinear, map,} from "d3";

export function facetPosition(engine){
  const scene = new Scene(engine)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(2,0,-5.5);

  var scaleX = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice(); 
  var scaleY = scaleLinear().domain(extent(map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice(); 
  var scaleZ = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice(); 

  var scaleC = scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())
  
  let CoT = anu.create("cot", "center", {}, {});

  let chart = anu.selectName('center', scene);

  let spheres = chart.bind('sphere', {diameter: 0.05}, iris) 
    .positionX((d) => scaleX(d.sepalLength)) 
    .positionY((d) => scaleY(d.petalLength)) 
    .positionZ((d) => scaleZ(d.sepalWidth)) 
    .material((d,m,i) => scaleC(d.species))
    .action((d,n,i) => new InterpolateValueAction( 
          ActionManager.OnPointerOverTrigger,
          n,
          'scaling',
          new Vector3(1.2, 1.2, 1.2),
          100
      ))
      .action((d,n,i) => new InterpolateValueAction(
        ActionManager.OnPointerOutTrigger,
        n,
        'scaling',
        new Vector3(1, 1, 1),
        100));
        
    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    chart.positionUI()
         .scaleUI({minimum: 0.5, maximum: 2})
         .rotateUI();


    return scene;
    
};
  


