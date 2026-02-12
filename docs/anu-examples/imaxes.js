// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as BABYLON from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import vega from 'vega-datasets';
import HavokPhysics from "@babylonjs/havok";

export async function imaxes(babylonEngine) {

  const data = await vega['cars.json']();

  //Initiate the havok physics plugin 
  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

  const scene = new BABYLON.Scene(babylonEngine);
  scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), havokPlugin);

  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  const camera = new BABYLON.ArcRotateCamera("Camera", -(Math.PI / 2), Math.PI / 3, 4, new BABYLON.Vector3(0, 0.5, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Helper object to keep track of data types
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
  };

  //Storing each column in an array to bind to our axes
  let carsColumns = [];
  Object.keys(key_types).forEach(k => {
    carsColumns.push(data.map(d => d[k]));
  });

  //Define the axes dimensions
  const axes_height = 1;
  const axes_diameter = 0.1;

  //Create a ordinal color scale for the origin 
  let colorScale = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());
  let originList = data.map(d => d.Origin);

  //Create a cylinder mesh for each dimension of our data to be our "imaxes"
  let imAxes = anu.bind("cylinder", { diameter: axes_diameter, height: axes_height }, carsColumns)
    .name((d, n, i) => Object.keys(key_types)[i]) //Set the name of each axes to it data dimension
    .behavior((d, n, i) => {   //Attach the SixDof behavior to allow use to grab and move the axes
      let behavior = new BABYLON.SixDofDragBehavior();
      behavior.allowMultiPointer = true;
      behavior.faceCameraOnDragStart = true;
      behavior.rotateDraggedObject = false;
      behavior.rotateWithMotionController = false;

      return behavior;
    });

  //Create a material to visualize our colliders
  let colliderMat = new BABYLON.StandardMaterial('colliderMat');
  colliderMat.alpha = 0.05;
  //Create a material for the histogram bars
  let barMaterial = new BABYLON.StandardMaterial("barMaterial");
  barMaterial.diffuseColor = BABYLON.Color3.Teal();

  //Set a trigger group number if we want to filter out collisions
  const FILTER_GROUP_TRIGGER = 2;

  //Move the axes into place, spaced out 1.5 meters from each other
  imAxes.positionX((d, n, i) => (i * 1.5) - 5).positionY(0.75);

  //Create labels for each axis using plane text and assign that axis as the parent
  let labels = anu.bind("planeText", { text: (d) => d.replaceAll("_", " "), size: 0.08 }, Object.keys(key_types))
    .run((d, n, i) => n.parent = imAxes.selected[i])
    .positionY((axes_height / 2) + 0.1);

  //Create a sphere mesh to act as a trigger. Assign and configure it as a physics aggregate
  let parallel_triggers = imAxes.bind("sphere", { diameter: axes_height + 0.25 })
    .material(colliderMat)
    .prop("isPickable", false)
    .name((d, n, i) => Object.keys(key_types)[i] + "_collider")
    .run((d, n) => {
      var colliderAggregate = new BABYLON.PhysicsAggregate(n, BABYLON.PhysicsShapeType.BOX, { mass: Infinity }, scene);
      colliderAggregate.body.setCollisionCallbackEnabled(true);
      colliderAggregate.body.disablePreStep = false;
      colliderAggregate.body.setPrestepType(BABYLON.PhysicsPrestepType.TELEPORT);
      colliderAggregate.shape.filterMembershipMask = FILTER_GROUP_TRIGGER;
      colliderAggregate.shape.filterColliderMask = FILTER_GROUP_TRIGGER;
      colliderAggregate.shape.isTrigger = true;
    });

  let parallel_charts = [];

  //Create an observer callback to react when the trigger is entered or exited
  const trigger_observer = havokPlugin.onTriggerCollisionObservable.add((collisionEvent) => {
    let name1 = collisionEvent.collider.transformNode.name.replace("_collider", "");
    let name2 = collisionEvent.collidedAgainst.transformNode.name.replace("_collider", "");
    if (collisionEvent.type === "TRIGGER_EXITED") {
      disposePara(name1, name2);
    } else if (collisionEvent.collider.shape.filterMembershipMask === FILTER_GROUP_TRIGGER) {
      if (collisionEvent.type === "TRIGGER_ENTERED") {
        let axis1 = collisionEvent.collider.transformNode.parent;
        let axis2 = collisionEvent.collidedAgainst.transformNode.parent;
        let orientation = checkOrientation(axis1, axis2);
        if (scene.getMeshByName(name1 + name2 + "_para") === null && orientation === "parallel") createParallelCoords(name1, name2);
      }
    }
  });

  //Helper function to dispose of the parallel coordinate plots when not needed
  function disposePara(name1, name2) {
    name1 = name1.replace("_collider", "");
    name2 = name2.replace("_collider", "");

    anu.selectName(name1 + name2 + "_para", scene).dispose();

    Array.from([name1, name2, name1 + name2]).forEach(str => {
      const index = parallel_charts.indexOf(str);
      if (index !== -1) parallel_charts.splice(index, 1);
    });

    if (!(parallel_charts.includes(name1))) {
      anu.selectName(name1 + "_hist", scene).run((d, n, i) => n.setEnabled(true));
      anu.selectName(name1 + "_para_axis", scene).dispose();
    }
    if (!(parallel_charts.includes(name2))) {
      anu.selectName(name2 + "_hist", scene).run((d, n, i) => n.setEnabled(true));
      anu.selectName(name2 + "_para_axis", scene).dispose();
    }
  }

  
  Object.keys(key_types).forEach(k => {
    createBarChart(k);
  });

  //Helper function to generate the histogram for each axes
  function createBarChart(axesName) {
    axesName = axesName.replace("_collider", "");
    let axis = anu.selectName(axesName, scene);
    let data = axis.selected[0].metadata.data;

    let parent = axis.bind("container")
      .name(axesName + "_hist");

    let bandScale;
    let linearScale;
    let bins;
    if (key_types[axesName] === "number") {
      bins = d3.bin().value((d) => d)(data);
      bandScale = d3.scaleBand([-axes_height / 2, axes_height / 2]).domain([...Array(bins.length).keys()]).paddingInner(1).paddingOuter(0.5);
      linearScale = d3.scaleLinear().domain(d3.extent(bins.map(d => d.length - 2))).range([axes_diameter / 2, 1]);

      let size = (axes_height / bins.length) * 0.5;

      parent.bind('box', { depth: 0.05, height: size }, bins)
        .material(barMaterial)
        .scalingX((d) => linearScale(d.length))
        .positionY((d, n, i) => bandScale(i))
        .positionX((d, n) => (linearScale(d.length) + (axes_diameter / 2)) / 2);

      var label_format = { y: (d) => bins[d].x0 + "-" + bins[d].x1 };

    } else {
      bins = d3.groups(data, d => d[axesName]);
      bandScale = d3.scaleBand([-axes_height / 2, axes_height / 2]).domain([...Array(bins.length).keys()]).paddingInner(1).paddingOuter(0.5);
      linearScale = d3.scaleLinear().domain(d3.extent(bins.map(d => d[1].length))).range([axes_diameter / 2, 1]);

      let size = (axes_height / bins.length) * 0.5;

      parent.bind('box', { depth: 0.05, height: size }, bins)
        .material(barMaterial)
        .scalingX((d) => linearScale(d[1].length))
        .positionY((d, n, i) => bandScale(i))
        .positionX((d, n) => (linearScale(d[1].length) + (axes_diameter / 2)) / 2);

      var label_format = {};

    }

    let axisConfig = new anu.AxesConfig({ x: linearScale, y: bandScale });
    axisConfig.parent = parent;
    axisConfig.background = false;
    axisConfig.grid = false;
    axisConfig.domainMaterialOptions = { width: 0.01 };
    axisConfig.labelTicks = { y: d3.extent(bandScale.domain()) };
    axisConfig.labelFormat = label_format;
    axisConfig.labelOptions = { x: { size: 0.05 }, y: { size: 0.08 } };
    axisConfig.labelMargin = { x: 0.05, y: 0.125 };

    anu.createAxes(axesName + "_hist_axis", scene, axisConfig);
  }

  //Helper function to calculate the position of line points as the axes move. 
  let calcPoints = (data, mesh1, mesh2, scale1, scale2) => {
    let points = [];
    let position1 = mesh1.getAbsolutePosition();
    let position2 = mesh2.getAbsolutePosition();
    data[0].forEach((v, i) => {
      let start = new BABYLON.Vector3(position1.x, position1.y + scale1(v), position1.z);
      let end = new BABYLON.Vector3(position2.x, position2.y + scale2(data[1][i]), position2.z);
      points.push([end, start]);
    });

    return points;
  };

  //Helper function that creates the parallel coordinate plots between two axes
  function createParallelCoords(axesName1, axesName2) {

    axesName1 = axesName1.replace("_collider", "");
    axesName2 = axesName2.replace("_collider", "");

    parallel_charts.push(...[axesName1, axesName2, axesName1 + axesName2]);

    let axis1 = anu.selectName(axesName1, scene);
    let axis2 = anu.selectName(axesName2, scene);

    axis1.selectName(axesName1 + "_hist").run((d, n, i) => n.setEnabled(false));
    axis2.selectName(axesName2 + "_hist").run((d, n, i) => n.setEnabled(false));

    let mesh1 = axis1.selected[0];
    let mesh2 = axis2.selected[0];

    let data1 = axis1.get("metadata.data")[0];
    let data2 = axis2.get("metadata.data")[0];

    let range = [-axes_height / 2, axes_height / 2];

    let scale1 = (typeof data1[0] === "string") ? d3.scalePoint().range(range).domain([...new Set(data1)]) : d3.scaleLinear().range(range).domain(d3.extent(data1));
    let scale2 = (typeof data2[0] === "string") ? d3.scalePoint().range(range).domain([...new Set(data2)]) : d3.scaleLinear().range(range).domain(d3.extent(data2));

    let parent = anu.bind("container")
      .name(axesName1 + axesName2 + "_para");

    let lineSystem = parent.bind("lineSystem", { lines: (d) => calcPoints(d, mesh1, mesh2, scale1, scale2), colors: () => originList.map(v => [colorScale(v), colorScale(v)]), updatable: true }, [[data1, data2]])
      .prop("isPickable", false);

    let lineSystemMesh = lineSystem.selected[0];

    Array.from([mesh1, mesh2]).forEach((n) => {
      let observer = n.behaviors[0].onDragObservable.add((event) => {
        if (scene.getMeshByName(axesName1 + axesName2 + "_para") !== null) {
          try {
            anu.create("lineSystem", "lineSystem", { lines: (d) => calcPoints(d, mesh1, mesh2, scale1, scale2), updatable: true, instance: lineSystemMesh }, [data1, data2]);
          } catch {
            console.warn("unknown");
          }
        } else {
          observer.remove();
        }
      });
    });

    let axisConfig1 = new anu.AxesConfig({ y: scale1 });
    axisConfig1.parent = axis1;
    axisConfig1.background = false;
    axisConfig1.grid = false;
    axisConfig1.domainMaterialOptions = { width: 0.01 };
    axisConfig1.labelTicks = { y: (scale1.domain().length > 10) ? evenDistributedSlice(scale1.domain(), 10) : undefined };
    // axisConfig.labelFormat = label_format
    axisConfig1.labelOptions = { y: { size: 0.08, align: "center" } };
    axisConfig1.labelProperties = { y: { "position.x": 0, "position.z": -axes_diameter / 2 } };
    anu.createAxes(axesName1 + "_para_axis", scene, axisConfig1);

    let axisConfig2 = new anu.AxesConfig({ y: scale2 });
    axisConfig2.parent = axis2;
    axisConfig2.background = false;
    axisConfig2.grid = false;
    axisConfig2.domainMaterialOptions = { width: 0.01 };
    axisConfig2.labelTicks = { y: (scale2.domain().length > 10) ? evenDistributedSlice(scale2.domain(), 10) : undefined };
    axisConfig2.labelOptions = { y: { size: 0.08, align: "center" } };
    axisConfig2.labelProperties = { y: { "position.x": 0, "position.z": -axes_diameter / 2 } };
    anu.createAxes(axesName2 + "_para_axis", scene, axisConfig2);

  }

  return scene;
}

//Helper function that reduces the number of labels to add to an axes for parallel coordinates
function evenDistributedSlice(arr, n) {
  if (n <= 0) return [];
  const step = (arr.length - 1) / Math.max(n - 1, 1);
  return Array.from({ length: n }, (_, i) => arr[Math.round(i * step)]);
}

//Helper function that checks if two axes are parallel to each other
function checkOrientation(mesh1, mesh2) {
  // Get the world matrix of each mesh
  var worldMatrix1 = mesh1.getWorldMatrix();
  var worldMatrix2 = mesh2.getWorldMatrix();

  // Get the up vectors of each mesh using the world matrix
  var up1 = BABYLON.Vector3.TransformNormal(BABYLON.Axis.Y, worldMatrix1);
  var up2 = BABYLON.Vector3.TransformNormal(BABYLON.Axis.Y, worldMatrix2);

  // Normalize the vectors
  up1.normalize();
  up2.normalize();

  // Define a small epsilon for floating-point comparison
  var epsilon = 0.01;

  // Function to check if two vectors are parallel
  function areVectorsParallel(v1, v2, epsilon) {
    var dotProduct = BABYLON.Vector3.Dot(v1, v2);
    return Math.abs(dotProduct - 1) < epsilon || Math.abs(dotProduct + 1) < epsilon;
  }

  // Function to check if two vectors are perpendicular
  function areVectorsPerpendicular(v1, v2, epsilon) {
    var dotProduct = BABYLON.Vector3.Dot(v1, v2);
    return Math.abs(dotProduct) < epsilon;
  }

  // Check parallelism and perpendicularity for the chosen axes
  var parallel = areVectorsParallel(up1, up2, epsilon);

  var perpendicular = areVectorsPerpendicular(up1, up2, epsilon);

  if (parallel) {
    return "parallel";
  } else if (perpendicular) {
    return "perpendicular";
  } else {
    return undefined;
  }
}