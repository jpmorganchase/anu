import * as anu from '@jpmorganchase/anu';
import { Scene, HemisphericLight, ArcRotateCamera} from '@babylonjs/core';
import { Vector3, Color3 } from '@babylonjs/core/Maths';
import { StandardMaterial } from '@babylonjs/core/Materials';
import iris from '../../data/iris.json' assert {type: 'json'}; //Our data

export function proxyTest(engine) {


//Create an empty scene
const scene = new Scene(engine)

//Add some lighting
new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

//Add a camera
const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
camera.attachControl(true)
camera.position = new Vector3(20, 3, -15);
 
  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = anu.create("cot", "cot", {childObserver: true});


  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot', scene);

  const testMaterial = new StandardMaterial()
  testMaterial.diffuseColor = Color3.Red();

  const testMaterial2 = new StandardMaterial()
  testMaterial2.diffuseColor = Color3.Green();

  //Map iris data to boxes1 to test proxy object dynamic property setting by value
  let boxes1 = chart.bind('box', {size: 1}, iris)
    .id("box1")
    .position(new Vector3(0, 1, 2))
    .scaling(new Vector3(1, 2, 3))
    .rotation(new Vector3(0, 2, 3))
    .material(testMaterial);

    //Test getting values from boxes1
  let boxes1Values = {
    position: boxes1.position(),
    scaling: boxes1.scaling(),
    rotation: boxes1.rotation(),
    material: boxes1.material(),
    color: boxes1.material.diffuseColor()
  }

//Map iris data to boxes2 to test proxy object dynamic property setting by function
  let boxes2 = chart.bind('box', {size: 1}, iris)
    .id("box2")
    .position((d,n,i) => new Vector3(d.petalLength, d.petalWidth, d.sepalLength))
    .scaling((d, n, i) => new Vector3(n.position.x * 0.05, n.position.y * 0.05, n.position.z * 0.05))
    .rotation((d, n, i) => new Vector3(i, i, i))
    .material((d,n,i) => { let mat = new StandardMaterial("mat" + i); mat.diffuseColor = Color3.Green(); return mat; });

//Map iris data to boxes3 to test proxy object sub-property setting by value
  let boxes3 = chart.bind('box', {size: 1}, iris)
    .id("box3")
    .position.x(0)
    .position.y(-1)
    .position.z(-2)
    .scaling.x(-1)
    .scaling.y(-2)
    .scaling.z(-3)
    .rotation.x(0)
    .rotation.y(-2)
    .rotation.z(-3)
    .material(new StandardMaterial()).material.diffuseColor(Color3.Blue());

//Map iris data to boxes4 to test proxy object sub-property setting by function
  let boxes4 = chart.bind('box', {size: 1}, iris)
    .id("box4")
    .position.x((d,n,i) => -d.petalLength)
    .position.y((d,n,i) => -d.petalWidth)
    .position.z((d,n,i) => -d.sepalLength)
    .scaling.x((d, n, i) => -n.position.x * 0.05)
    .scaling.y((d, n, i) => -n.position.y * 0.05)
    .scaling.z((d, n, i) => -n.position.z * 0.05)
    .rotation.x((d, n, i) => -i)
    .rotation.y((d, n, i) => -i)
    .rotation.z((d, n, i) => -i)
    .material((d,n,i) => { let mat = new StandardMaterial("mat4_" + i); mat.diffuseColor = Color3.Yellow(); return mat; });

//Map iris data to boxes5 to test proxy object method calls on properties
  let boxes5 = chart.bind('box', {size: 1}, iris)
    .id("box5")
    .translate(new Vector3(0,1,0), (d,n,i) => d.petalWidth)
    .setEnabled((d,n,i) => (i % 2) === 0)
    .rotation.setAll(2)

    // Make global variables available for testing
    window.data = iris;
    window.scene = scene;
    window.boxes1Values = boxes1Values;
    window.anu = anu;
    window.BABYLON = { Scene, Vector3, Color3, HemisphericLight, ArcRotateCamera, StandardMaterial };
    window.engine = engine;


return scene;
}
