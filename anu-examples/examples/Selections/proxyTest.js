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

  const testMaterial = new StandardMaterial("mat1", scene);
  testMaterial.diffuseColor = Color3.Red();

  const testMaterial2 = new StandardMaterial("mat2");
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
    color: boxes1.material.diffuseColor(),
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

  //Map iris data to boxes6 to test prop method with value
  let boxes6 = chart.bind('box', {size: 1}, iris)
    .id("box6")
    .prop('position', new Vector3(3, 4, 5))
    .prop('scaling', new Vector3(0.5, 1.5, 2.5))
    .prop('rotation', new Vector3(1, 3, 4))
    .prop('material', testMaterial);

  //Map iris data to boxes7 to test prop method with function
  let boxes7 = chart.bind('box', {size: 1}, iris)
    .id("box7")
    .prop('position', (d,n,i) => new Vector3(d.petalLength + 10, d.petalWidth + 10, d.sepalLength + 10))
    .prop('scaling', (d, n, i) => new Vector3(n.position.x * 0.01, n.position.y * 0.01, n.position.z * 0.01))
    .prop('rotation', (d, n, i) => new Vector3(i * 2, i * 2, i * 2))
    .prop('material', (d,n,i) => { let mat = new StandardMaterial("mat7_" + i); mat.diffuseColor = Color3.Magenta(); return mat; });

  //Map iris data to boxes8 to test prop method with nested properties by value
  let boxes8 = chart.bind('box', {size: 1}, iris)
    .id("box8")
    .prop('position.x', 5)
    .prop('position.y', 6)
    .prop('position.z', 7)
    .prop('scaling.x', 0.8)
    .prop('scaling.y', 1.8)
    .prop('scaling.z', 2.8)
    .prop('rotation.x', 1)
    .prop('rotation.y', 4)
    .prop('rotation.z', 5)
    .prop('material', new StandardMaterial()).prop('material.diffuseColor', Color3.Teal());

  //Map iris data to boxes9 to test prop method with nested properties by function
  let boxes9 = chart.bind('box', {size: 1}, iris)
    .id("box9")
    .prop('position.x', (d,n,i) => d.petalLength + 20)
    .prop('position.y', (d,n,i) => d.petalWidth + 20)
    .prop('position.z', (d,n,i) => d.sepalLength + 20)
    .prop('scaling.x', (d, n, i) => n.position.x * 0.02)
    .prop('scaling.y', (d, n, i) => n.position.y * 0.02)
    .prop('scaling.z', (d, n, i) => n.position.z * 0.02)
    .prop('rotation.x', (d, n, i) => i * 3)
    .prop('rotation.y', (d, n, i) => i * 3)
    .prop('rotation.z', (d, n, i) => i * 3)
    .prop('material', (d,n,i) => { let mat = new StandardMaterial("mat9_" + i); mat.diffuseColor = Color3.Purple(); return mat; });

  //Map iris data to boxes10 to test prop method with method calls (static values)
  let boxes10 = chart.bind('box', {size: 1}, iris)
    .id("box10")
    .prop('translate', [new Vector3(0,1,0), 5])
    .prop('setEnabled', [true])
    .prop('rotation.setAll', [3]);

  //Map iris data to boxes10b to test prop method with method calls (functions)
  let boxes10b = chart.bind('box', {size: 1}, iris)
    .id("box10b")
    .prop('translate', (d,n,i) => [new Vector3(1,0,0), d.petalLength])
    .prop('setEnabled', (d,n,i) => [(i % 3) === 0])
    .prop('rotation.setAll', (d,n,i) => [i * 0.1]);

  //Map iris data to boxes10c to test props method with multiple method calls (static values)
  let boxes10c = chart.bind('box', {size: 1}, iris)
    .id("box10c")
    .props({
      'translate': [new Vector3(0,0,1), 8],
      'setEnabled': [true],
      'rotation.setAll': [4]
    });

  //Map iris data to boxes10d to test props method with multiple method calls (functions)
  let boxes10d = chart.bind('box', {size: 1}, iris)
    .id("box10d")
    .props({
      'translate': (d,n,i) => [new Vector3(0,1,1), d.sepalLength],
      'setEnabled': (d,n,i) => [(i % 4) === 0],
      'rotation.setAll': (d,n,i) => [i * 0.2]
    });

  //Map iris data to boxes11 to test props method with multiple properties by value
  let boxes11 = chart.bind('box', {size: 1}, iris)
    .id("box11")
    .props({
      'position': new Vector3(8, 9, 10),
      'scaling': new Vector3(0.3, 1.3, 2.3),
      'rotation': new Vector3(2, 5, 6),
      'material': testMaterial2
    });

  //Map iris data to boxes12 to test props method with multiple properties by function
  let boxes12 = chart.bind('box', {size: 1}, iris)
    .id("box12")
    .props({
      'position': (d,n,i) => new Vector3(d.petalLength + 30, d.petalWidth + 30, d.sepalLength + 30),
      'scaling': (d, n, i) => new Vector3(n.position.x * 0.03, n.position.y * 0.03, n.position.z * 0.03),
      'rotation': (d, n, i) => new Vector3(i * 4, i * 4, i * 4),
      'material': (d,n,i) => { let mat = new StandardMaterial("mat12_" + i); mat.diffuseColor = Color3.Gray(); return mat; }
    });

  //Map iris data to boxes13 to test props method with nested properties
  let boxes13 = chart.bind('box', {size: 1}, iris)
    .id("box13")
    .props({
      'position.x': 10,
      'position.y': 11,
      'position.z': 12,
      'scaling.x': 0.6,
      'scaling.y': 1.6,
      'scaling.z': 2.6,
      'rotation.x': 3,
      'rotation.y': 6,
      'rotation.z': 7
    })
    .prop('material', new StandardMaterial()).props({
      'material.diffuseColor': Color3.White()
    });

    // Make global variables available for testing
    window.data = iris;
    window.scene = scene;
    window.boxes1Values = boxes1Values;
    window.anu = anu;
    window.BABYLON = { Scene, Vector3, Color3, HemisphericLight, ArcRotateCamera, StandardMaterial };
    window.engine = engine;


return scene;
}
