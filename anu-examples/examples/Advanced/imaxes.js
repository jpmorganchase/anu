import { Vector3, Scene, HemisphericLight, ArcRotateCamera, Axis, Color3, Quaternion, SixDofDragBehavior, PointerDragBehavior, PhysicsPrestepType, HavokPlugin, PhysicsAggregate, PhysicsShapeBox, PhysicsShapeType , StandardMaterial} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import cars from '../../data/cars.json' assert {type: 'json'};
import HavokPhysics from "@babylonjs/havok";
import { scale } from 'ol/transform';


export async function imaxes(babylonEngine){
  const havokInstance = await HavokPhysics();
  const havokPlugin = new HavokPlugin(true, havokInstance);
  

  const scene = new Scene(babylonEngine);
  scene.enablePhysics(new Vector3(0,0,0), havokPlugin);

  const light = new HemisphericLight('light1', new Vector3(0, 10, -10), scene)
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  camera.position = new Vector3(0, 2.5, -2)



  const key_types = {
    "Name": "string",
    "Miles_per_Gallon": "number",
    "Cylinders": "number",
    "Displacement": "number",
    "Horsepower": "number",
    "Weight_in_lbs": "number",
    "Acceleration": "number",
    "Year": "date",
    "Origin": "string"
  }

  let carsColumns = []
  Object.keys(key_types).forEach(k => {
   carsColumns.push(cars.map(d => d[k])) 
  })

  const axes_height = 1;
  const axes_diameter = 0.1;

  let colorScale = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4())
  let colorScaleMaterial = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())

  let originList = cars.map(d => d.Origin)


  let imAxes = anu.bind("cylinder", {diameter: axes_diameter, height: axes_height}, carsColumns)
      .name((d,n,i) => Object.keys(key_types)[i])
      .run((d,n,i) => n.addBehavior(new PointerDragBehavior({ dragPlaneNormal: Axis.X})))

  let colliderMat = new StandardMaterial('colliderMat')

  colliderMat.alpha = 0.1

  const FILTER_GROUP_PARA = 1;
  const FILTER_GROUP_SCATTER = 2;


  // let parallel_colliders = imAxes.bind("box", {height: axes_height, width: 2, depth: 2})
  //                                 .material(colliderMat)
  //                                 .prop("isPickable", false)
  //                                 .name((d,n, i) => Object.keys(key_types)[i] + "_collider")
  //                                 .run((d,n) => {
  //                                   var colliderAggregate = new PhysicsAggregate(n, PhysicsShapeType.BOX, { mass:  Infinity}, scene);
  //                                   colliderAggregate.body.setCollisionCallbackEnabled(true);
  //                                   colliderAggregate.body.disablePreStep = false;
  //                                   colliderAggregate.body.setPrestepType(PhysicsPrestepType.TELEPORT);
  //                                   colliderAggregate.shape.filterMembershipMask = FILTER_GROUP_PARA;
  //                                   colliderAggregate.shape.filterColliderMask =  FILTER_GROUP_PARA;
  //                                 })

  let scatter_colliders = imAxes.bind("box", {height: axes_height + 0.2, width: axes_diameter, depth: axes_diameter})
                                  .material(colliderMat)
                                  .prop("isPickable", false)
                                  .name((d,n, i) => Object.keys(key_types)[i] + "_scatterCol")
                                  .run((d,n) => {
                                    var colliderAggregate = new PhysicsAggregate(n, PhysicsShapeType.BOX, { mass:  Infinity}, scene);
                                    colliderAggregate.body.setCollisionCallbackEnabled(true);
                                    colliderAggregate.body.disablePreStep = false;
                                    colliderAggregate.body.setPrestepType(PhysicsPrestepType.TELEPORT);
                                    colliderAggregate.shape.filterMembershipMask = FILTER_GROUP_SCATTER;
                                    colliderAggregate.shape.filterCollideMask = FILTER_GROUP_SCATTER;
                                  })
                        

 


const collision_observer =  havokPlugin.onCollisionObservable.add((collisionEvent) => {
  console.log(collisionEvent.collider.shape.filterMembershipMask)
  if (collisionEvent.collider.shape.filterMembershipMask === FILTER_GROUP_PARA){
    let name1 = collisionEvent.collider.transformNode.name.replace("_collider", "");
    let name2 = collisionEvent.collidedAgainst.transformNode.name.replace("_collider", "");

    let axis1 = collisionEvent.collider.transformNode.parent
    let axis2 = collisionEvent.collidedAgainst.transformNode.parent
    let orientation = checkOrientation(axis1, axis2)
    if (collisionEvent.type === "COLLISION_STARTED") {
      if (!scene.getMeshByName(name1 + name2 + "_para") && orientation === "parallel") createParallelCoords(name1,name2)
    } else if(collisionEvent.type === "COLLISION_CONTINUED"){
      if (!scene.getMeshByName(name1 + name2 + "_para") && orientation === "parallel") createParallelCoords(name1,name2)
      else if (orientation !== "parallel") disposeNodes(name1, name2)
    }
  } 
  if (collisionEvent.collider.shape.filterMembershipMask === FILTER_GROUP_SCATTER) {
    console.log("scatterplot GOOOO")
    let name1 = collisionEvent.collider.transformNode.name.replace("_scatterCol", "");
    let name2 = collisionEvent.collidedAgainst.transformNode.name.replace("_scatterCol", "");
    if (collisionEvent.type === "COLLISION_STARTED") {
      createScatterplot(name1, name2)
    }
  }

});

const collisionEnded_observer =  havokPlugin.onCollisionEndedObservable.add((collisionEvent) => {
  let name1 = collisionEvent.collider.transformNode.name.replace("_collider", "");
  let name2 = collisionEvent.collidedAgainst.transformNode.name.replace("_collider", "");
  disposeNodes(name1, name2)
});


function disposeNodes(name1, name2){
  name1 = name1.replace("_collider", "");
  name2 = name2.replace("_collider", "");
  anu.selectName(name1 + name2 + "_para", scene).dispose()

  anu.selectName(name1 + "_hist", scene).run((d,n,i) => n.setEnabled(true))
  anu.selectName(name2 + "_hist", scene).run((d,n,i) => n.setEnabled(true))
}
  
Object.keys(key_types).forEach(k => {
  createBarChart(k)
 })


  function createBarChart(axesName) {
    axesName = axesName.replace("_collider", "")
    let axis = anu.selectName(axesName, scene)
    let data = axis.selected[0].metadata.data;

    let bandScale
    let linearScale
    let bins
    if (key_types[axesName] === "number") {
      bins = d3.bin().value((d) => d)(data)
      bandScale = d3.scaleBand([-axes_height / 2, axes_height / 2]).domain([...Array(bins.length).keys()]).paddingInner(1).paddingOuter(0.5)
      linearScale = d3.scaleLinear().domain(d3.extent(bins.map(d => d.length))).range([axes_diameter / 2, 1])

      axis.bind("container").name(axesName + "_hist").bind('box', {depth: 0.05, height: 0.05}, bins)
      .scalingX((d) => linearScale(d.length))
      .positionY((d,n,i) => bandScale(i))
      .positionX((d, n) => (linearScale(d.length) + (axes_diameter / 2)) / 2)


    } else {
      bins = d3.groups(cars, d => d[axesName])
      bandScale = d3.scaleBand([-axes_height / 2, axes_height / 2]).domain([...Array(bins.length).keys()]).paddingInner(1).paddingOuter(0.5)
      linearScale = d3.scaleLinear().domain(d3.extent(bins.map(d => d[1].length))).range([axes_diameter / 2, 1])

      axis.bind("container").name(axesName + "_hist").bind('box', {depth: 0.05, height: 0.05}, bins)
      .scalingX((d) => linearScale(d[1].length))
      .positionY((d,n,i) => bandScale(i))
      .positionX((d, n) => (linearScale(d[1].length) + (axes_diameter / 2)) / 2)
    }

  }


  let calcPoints = (data, mesh1, mesh2, scale1, scale2) => {
    let points = []
    let position1 = mesh1.getAbsolutePosition()
    let position2 = mesh2.getAbsolutePosition()
    data[0].forEach((v,i) => {
      let start = new Vector3(position1.x, position1.y + scale1(v), position1.z)
      let end = new Vector3(position2.x, position2.y + scale2(data[1][i]), position2.z)
      points.push([end, start])
    })

    return points
  }

  function createParallelCoords(axesName1, axesName2) {

    axesName1 = axesName1.replace("_collider", "")
    axesName2 = axesName2.replace("_collider", "")

    let axis1 = anu.selectName(axesName1, scene)
    let axis2 = anu.selectName(axesName2, scene)

    axis1.selectName(axesName1 + "_hist").run((d,n,i) => n.setEnabled(false))
    axis2.selectName(axesName2 + "_hist").run((d,n,i) => n.setEnabled(false))

    // axis1.addTags(`para ${axesName1} ${axesName2}`)
    // axis1.addTags(`para ${axesName1} ${axesName2}`)

    let mesh1 = axis1.selected[0]
    let mesh2 = axis2.selected[0]

    let data1 = axis1.get("metadata.data")[0];
    let data2 = axis2.get("metadata.data")[0];

    let range = [-axes_height / 2, axes_height / 2];

    let scale1 = (typeof data1[0] === "string") ? d3.scalePoint().range(range).domain([...new Set(data1)]) : d3.scaleLinear().range(range).domain(d3.extent(data1))
    let scale2 = (typeof data2[0] === "string") ?  d3.scalePoint().range(range).domain([...new Set(data2)]) : d3.scaleLinear().range(range).domain(d3.extent(data2))

    let parent = anu.bind("container")
         .name(axesName1 + axesName2 + "_para")
         
    let lineSystem = parent.bind("lineSystem", {lines: (d) => calcPoints(d, mesh1, mesh2, scale1, scale2), colors: () => originList.map(v => [colorScale(v), colorScale(v)]), updatable: true}, [[data1,data2]])
                           .prop("isPickable", false)

    let lineSystemMesh = lineSystem.selected[0]
    
    Array.from([mesh1, mesh2]).forEach((n) => {
     let observer =  n.behaviors[0].onDragObservable.add((event) => {
        if (scene.getMeshByName(axesName1 + axesName2 + "_para")) {
          anu.create("lineSystem", "lineSystem", {lines: (d) => calcPoints(d, mesh1, mesh2, scale1, scale2),  updatable: true, instance: lineSystemMesh}, [data1,data2])
        } else {
          observer.remove()
        }
      });
    })

 
  }

  function createScatterplot(axesName1, axesName2) {
    axesName1 = axesName1.replace("_scatterCol", "")
    axesName2 = axesName2.replace("__scatterCol", "")

    let axis1 = anu.selectName(axesName1, scene)
    let axis2 = anu.selectName(axesName2, scene)

    axis1.selectName(axesName1 + "_hist").run((d,n,i) => n.setEnabled(false))
    axis2.selectName(axesName2 + "_hist").run((d,n,i) => n.setEnabled(false))

    let mesh1 = axis1.selected[0]
    let mesh2 = axis2.selected[0]

    let data1 = axis1.get("metadata.data")[0];
    let data2 = axis2.get("metadata.data")[0];

    let range = [-axes_height / 2, axes_height / 2];

    let scale1 = (typeof data1[0] === "string") ? d3.scalePoint().range(range).domain([...new Set(data1)]) : d3.scaleLinear().range(range).domain(d3.extent(data1))
    let scale2 = (typeof data2[0] === "string") ?  d3.scalePoint().range([0, axes_height]).domain([...new Set(data2)]) : d3.scaleLinear().range([0, axes_height]).domain(d3.extent(data2))

    
    let parent = anu.bind("cot")
         .name(axesName1 + axesName2 + "_scatter")
         .run((d,n) => {
          n.parent = mesh1
        })


      

    parent.bind("sphere", {diameter: 0.02, segments: 8}, data1)
          .positionY((d) => scale1(d))
          .positionX((d,n,i) => scale2(data2[i]))
          .material((d,n,i) => colorScaleMaterial(originList[i]))
          

  }



  imAxes.positionX((d,n,i) => i * 1)

  let first = imAxes.selected[0]
  first.position.y = -axes_height / 2
  first.rotation.z = 3.14 / 2
  






  return scene;
}

function checkOrientation(mesh1, mesh2) {
  // Get the world matrix of each mesh
  var worldMatrix1 = mesh1.getWorldMatrix();
  var worldMatrix2 = mesh2.getWorldMatrix();

  // Get the forward, up, and right vectors of each mesh using the world matrix
  var up1 = Vector3.TransformNormal(Axis.Y, worldMatrix1);
  var up2 = Vector3.TransformNormal(Axis.Y, worldMatrix2);

  // Normalize the vectors
  up1.normalize();
  up2.normalize();

  // Define a small epsilon for floating-point comparison
  var epsilon = 0.001;

  // Function to check if two vectors are parallel
  function areVectorsParallel(v1, v2, epsilon) {
      var dotProduct = Vector3.Dot(v1, v2);
      return Math.abs(dotProduct - 1) < epsilon || Math.abs(dotProduct + 1) < epsilon;
  }

  // Function to check if two vectors are perpendicular
  function areVectorsPerpendicular(v1, v2, epsilon) {
      var dotProduct = Vector3.Dot(v1, v2);
      return Math.abs(dotProduct) < epsilon;
  }

 // Check parallelism and perpendicularity for the chosen axes
var parallel = areVectorsParallel(up1, up2, epsilon) 

var perpendicular = areVectorsPerpendicular(up1, up2, epsilon);

  if (parallel) {
      console.log("The meshes are parallel.");
      return "parallel"
  } else if (perpendicular) {
      console.log("The meshes are perpendicular.");
      return "perpendicular"
  } else {
      console.log("The meshes are neither parallel nor perpendicular.");
      return undefined
  }
}