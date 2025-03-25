import { Vector3, Scene, HemisphericLight, ArcRotateCamera, Axis, Color3, Color4, Quaternion, SixDofDragBehavior, PointerDragBehavior, PhysicsPrestepType, HavokPlugin, PhysicsAggregate, PhysicsShapeBox, PhysicsShapeType , StandardMaterial, Angle, Space} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import cars from '../../data/cars.json' assert {type: 'json'};
import HavokPhysics from "@babylonjs/havok";


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
  let originList = cars.map(d => d.Origin)

  let imAxes = anu.bind("cylinder", {diameter: axes_diameter, height: axes_height}, carsColumns)
      .name((d,n,i) => Object.keys(key_types)[i])
      //.behavior((d,n,i) => new PointerDragBehavior({ dragPlaneNormal: Axis.X}))
      .behavior((d,n,i) => new SixDofDragBehavior())

  let colliderMat = new StandardMaterial('colliderMat')
   colliderMat.alpha = 0.1

  let barMaterial = new StandardMaterial("barMaterial")
   barMaterial.diffuseColor = Color3.Teal()

  const FILTER_GROUP_COLLISION = 1;
  const FILTER_GROUP_TRIGGER = 2;

  imAxes.positionX((d,n,i) => (i * 1.5) - 5)

  let labels = anu.bind("planeText", {text: (d) => d.replaceAll("_", " "), size: 0.25}, Object.keys(key_types))
                  .run((d,n,i) => n.parent = imAxes.selected[i])
                  .positionY((axes_height / 2) + 0.1)

  let parallel_triggers = imAxes.bind("sphere", {diameter: axes_height + 0.25})
        .material(colliderMat)
        .prop("isPickable", false)
        .name((d,n, i) => Object.keys(key_types)[i] + "_collider")
        .run((d,n) => {
          var colliderAggregate = new PhysicsAggregate(n, PhysicsShapeType.BOX, { mass:  Infinity}, scene);
          colliderAggregate.shape.filterMembershipMask = FILTER_GROUP_COLLISION;
          colliderAggregate.shape.filterColliderMask =  FILTER_GROUP_COLLISION;
          colliderAggregate.body.setCollisionCallbackEnabled(true);
          colliderAggregate.body.disablePreStep = false;
          colliderAggregate.body.setPrestepType(PhysicsPrestepType.TELEPORT);
        })

  let parallel_colliders = imAxes.bind("sphere", {diameter: axes_height + 0.25})
                                  .material(colliderMat)
                                  .prop("isPickable", false)
                                  .name((d,n, i) => Object.keys(key_types)[i] + "_collider")
                                  .run((d,n) => {
                                    var colliderAggregate = new PhysicsAggregate(n, PhysicsShapeType.BOX, { mass:  Infinity}, scene);
                                    colliderAggregate.body.setCollisionCallbackEnabled(true);
                                    colliderAggregate.body.disablePreStep = false;
                                    colliderAggregate.body.setPrestepType(PhysicsPrestepType.TELEPORT);
                                    colliderAggregate.shape.filterMembershipMask = FILTER_GROUP_TRIGGER;
                                    colliderAggregate.shape.filterColliderMask =  FILTER_GROUP_TRIGGER;
                                    colliderAggregate.shape.isTrigger =  true;
                                  })
                              
                    

let parallel_charts = [];


const trigger_observer =  havokPlugin.onTriggerCollisionObservable.add((collisionEvent) => {
  let name1 = collisionEvent.collider.transformNode.name.replace("_collider", "");
  let name2 = collisionEvent.collidedAgainst.transformNode.name.replace("_collider", "");
  if (collisionEvent.type === "TRIGGER_EXITED")  {
    console.log("exit")
    disposePara(name1, name2)
  } else if (collisionEvent.collider.shape.filterMembershipMask === FILTER_GROUP_TRIGGER){
    if (collisionEvent.type === "TRIGGER_ENTERED") {
      let axis1 = collisionEvent.collider.transformNode.parent
      let axis2 = collisionEvent.collidedAgainst.transformNode.parent
      let orientation = checkOrientation(axis1, axis2)
      if (scene.getMeshByName(name1 + name2 + "_para") === null && orientation === "parallel") createParallelCoords(name1,name2)
    } 
  }
})


const collision_observer =  havokPlugin.onCollisionObservable.add((collisionEvent) => {
  if (collisionEvent.collider.shape.filterMembershipMask === FILTER_GROUP_COLLISION){
      let name1 = collisionEvent.collider.transformNode.name.replace("_collider", "");
      let name2 = collisionEvent.collidedAgainst.transformNode.name.replace("_collider", "");
    if (collisionEvent.type === "COLLISION_CONTINUED"){
        let axis1 = collisionEvent.collider.transformNode.parent
        let axis2 = collisionEvent.collidedAgainst.transformNode.parent
        let orientation = checkOrientation(axis1, axis2)
        if (scene.getMeshByName(name1 + name2 + "_para") !== null && orientation !== "parallel"){
          disposePara(name1, name2)
         } 
      }
  }
});


function disposePara(name1, name2){
  name1 = name1.replace("_collider", "")
  name2 = name2.replace("_collider", "")

  anu.selectName(name1 + name2 + "_para", scene).dispose()

  Array.from([name1, name2, name1 + name2]).forEach(str => {
    const index = parallel_charts.indexOf(str);
    if (index !== -1) parallel_charts.splice(index, 1);
  });

  if (!(parallel_charts.includes(name1))) {
    anu.selectName(name1 + "_hist", scene).run((d,n,i) => n.setEnabled(true))
    anu.selectName(name1 + "_para_axis", scene).dispose()

  }
  if (!(parallel_charts.includes(name2))){
    anu.selectName(name2 + "_hist", scene).run((d,n,i) => n.setEnabled(true))
    anu.selectName(name2 + "_para_axis", scene).dispose()
  } 
}

  
  
Object.keys(key_types).forEach(k => {
  createBarChart(k)
 })



  function createBarChart(axesName) {
    axesName = axesName.replace("_collider", "")
    let axis = anu.selectName(axesName, scene)
    let data = axis.selected[0].metadata.data;

    let parent = axis.bind("container")
                     .name(axesName + "_hist")

    let bandScale
    let linearScale
    let bins
    if (key_types[axesName] === "number") {
      bins = d3.bin().value((d) => d)(data)
      bandScale = d3.scaleBand([-axes_height / 2, axes_height / 2]).domain([...Array(bins.length).keys()]).paddingInner(1).paddingOuter(0.5)
      linearScale = d3.scaleLinear().domain(d3.extent(bins.map(d => d.length - 2))).range([axes_diameter / 2, 1])

      let size = (axes_height / bins.length) * 0.5

      console.log(size)
      
      parent.bind('box', {depth: 0.05, height: size }, bins)
            .material(barMaterial)
            .scalingX((d) => linearScale(d.length))
            .positionY((d,n,i) => bandScale(i))
            .positionX((d, n) => (linearScale(d.length) + (axes_diameter / 2)) / 2)

      var label_format = {y: (d) => bins[d].x0 + "-" + bins[d].x1}


    } else {
      bins = d3.groups(cars, d => d[axesName])
      bandScale = d3.scaleBand([-axes_height / 2, axes_height / 2]).domain([...Array(bins.length).keys()]).paddingInner(1).paddingOuter(0.5)
      linearScale = d3.scaleLinear().domain(d3.extent(bins.map(d => d[1].length))).range([axes_diameter / 2, 1])
      
      let size = (axes_height / bins.length) * 0.5

      parent.bind('box', {depth: 0.05, height: size}, bins)
            .material(barMaterial)
            .scalingX((d) => linearScale(d[1].length))
            .positionY((d,n,i) => bandScale(i))
            .positionX((d, n) => (linearScale(d[1].length) + (axes_diameter / 2)) / 2)
        
      var label_format = {}
        
      }

      let axisConfig = new anu.AxesConfig({x: linearScale, y: bandScale})
      axisConfig.parent = parent;
      axisConfig.background = false;
      axisConfig.grid = false;
      axisConfig.domainMaterialOptions = {width: 0.01};
      axisConfig.labelTicks = {y: d3.extent(bandScale.domain())}
      axisConfig.labelFormat = label_format
      axisConfig.labelOptions = {y: {size: 0.15}, x: {size: 0.1}}
      axisConfig.labelMargin = {x: 0.05}


      anu.createAxes(axesName + "_hist_axis", scene, axisConfig)
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

    parallel_charts.push(...[axesName1, axesName2, axesName1 + axesName2])

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
    let scale2 = (typeof data2[0] === "string") ?  d3.scalePoint().range(range).domain([...new Set(data2)]) : d3.scaleLinear().range(range).domain(d3.extent(data2))

    let parent = anu.bind("container")
         .name(axesName1 + axesName2 + "_para")
         
    let lineSystem = parent.bind("lineSystem", {lines: (d) => calcPoints(d, mesh1, mesh2, scale1, scale2), colors: () => originList.map(v => [colorScale(v), colorScale(v)]), updatable: true}, [[data1,data2]])
                           .prop("isPickable", false)

    let lineSystemMesh = lineSystem.selected[0]
    
    Array.from([mesh1, mesh2]).forEach((n) => {
     let observer =  n.behaviors[0].onDragObservable.add((event) => {
        if (scene.getMeshByName(axesName1 + axesName2 + "_para") !== null) {
          try {
            anu.create("lineSystem", "lineSystem", {lines: (d) => calcPoints(d, mesh1, mesh2, scale1, scale2),  updatable: true, instance: lineSystemMesh}, [data1,data2])
          } catch {
            console.warn("unknown")
          }
        } else {
          observer.remove()
        }
      });
    })

    let axisConfig1 = new anu.AxesConfig({y: scale1})
    axisConfig1.parent = axis1;
    axisConfig1.background = false;
    axisConfig1.grid = false;
    axisConfig1.domainMaterialOptions = {width: 0.01};
    axisConfig1.labelTicks = {y: (scale1.domain().length > 10) ? evenDistributedSlice(scale1.domain(), 10) : undefined}
   // axisConfig.labelFormat = label_format
    axisConfig1.labelOptions = {y: {size: 0.15, align: "center", color: Color3.Black()}}
    axisConfig1.labelProperties = {y: {"position.x": 0, "position.z": -axes_diameter / 2}}
    anu.createAxes(axesName1 + "_para_axis", scene, axisConfig1)

    let axisConfig2 = new anu.AxesConfig({y: scale2})
    axisConfig2.parent = axis2;
    axisConfig2.background = false;
    axisConfig2.grid = false;
    axisConfig2.domainMaterialOptions = {width: 0.01};
    axisConfig2.labelTicks = {y: (scale2.domain().length > 10) ? evenDistributedSlice(scale2.domain(), 10) : undefined}
    axisConfig2.labelOptions = {y: {size: 0.15, align: "center", color: Color3.Black()}}
    axisConfig2.labelProperties = {y: {"position.x": 0, "position.z": -axes_diameter / 2}}
    anu.createAxes(axesName2 + "_para_axis", scene, axisConfig2)

  }


  
  return scene;
}

function evenDistributedSlice(arr, n) {
  if (n <= 0) return [];
  const step = (arr.length - 1) / Math.max(n - 1, 1);
  return Array.from({ length: n }, (_, i) => arr[Math.round(i * step)]);
}


function checkOrientation(mesh1, mesh2) {
  // Get the world matrix of each mesh
  var worldMatrix1 = mesh1.getWorldMatrix();
  var worldMatrix2 = mesh2.getWorldMatrix();

  // Get the up vectors of each mesh using the world matrix
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
      return "parallel"
  } else if (perpendicular) {
      return "perpendicular"
  } else {
      return undefined
  }
}