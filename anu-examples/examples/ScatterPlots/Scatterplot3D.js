// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import iris from '../../data/iris.json' assert {type: 'json'}; //Our data
import {NodeMaterialModes, LightBlock, GradientBlock, GradientBlockColorStep, RemapBlock, Vector2, AnimatedInputBlockTypes, NodeMaterial, InputBlock, NodeMaterialSystemValues, TransformBlock, VertexOutputBlock, Color4, FragmentOutputBlock, HemisphericLight, Vector3, Scene, ArcRotateCamera, TransformNode, ActionManager, InterpolateValueAction, StandardMaterial, Color3, MeshBuilder, Material} from '@babylonjs/core'; 
import {extent, scaleOrdinal, scaleLinear, schemeCategory10, map, interpolateBlues} from "d3";

//import { Mesh } from 'anu';

//create and export a function that takes a babylon engine and returns a scene
export const scatterplot3D = function(engine){

  //Create an empty scene
  const scene = new Scene(engine)

  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(28,0,-30);

  //Create the functions that we will use to scale our data according to our desired dimensions. In this case we want to scale the position of our points. 
  //These functions will take a number and scale it between -10 and 10. calling .nice() adds some padding at the beginning and end 
  var scaleX = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalLength}))).range([-10,10]).nice(); //We want to encode sepal length along the x axis, so we make a linear scale function the will scale our data range (min and max sepal length) to our coordinate space (-10, 10 units)
  var scaleY = scaleLinear().domain(extent(map(iris, (d) => {return d.petalLength}))).range([-10,10]).nice(); //
  var scaleZ = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalWidth}))).range([-10,10]).nice(); //Same as X for our Y and Z dimensions 

  //This is a function that will create a color scale for our three types of flowers in our data
  //pass in the flower name and it will return the hex of its color coding. schemecategory10 is an array of 10 color hexes
  var scaleC = scaleOrdinal(anu.categoricalChromatic('d310').toStandardMaterial())

  
  //Create a transform node to use as the parent node for all our meshes
  let CoT = new TransformNode('cot')

  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot', scene);

  function makeMaterial(){
    var nodeMaterial = new NodeMaterial("node");
nodeMaterial.mode = NodeMaterialModes.Material;

// InputBlock
var position = new InputBlock("position");
position.visibleInInspector = false;
position.visibleOnFrame = false;
position.target = 1;
position.setAsAttribute("position");

// TransformBlock
var WorldPos = new TransformBlock("WorldPos");
WorldPos.visibleInInspector = false;
WorldPos.visibleOnFrame = false;
WorldPos.target = 1;
WorldPos.complementZ = 0;
WorldPos.complementW = 1;

// InputBlock
var World = new InputBlock("World");
World.visibleInInspector = false;
World.visibleOnFrame = false;
World.target = 1;
World.setAsSystemValue(NodeMaterialSystemValues.World);

// TransformBlock
var Worldnormal = new TransformBlock("World normal");
Worldnormal.visibleInInspector = false;
Worldnormal.visibleOnFrame = false;
Worldnormal.target = 1;
Worldnormal.complementZ = 0;
Worldnormal.complementW = 0;

// InputBlock
var normal = new InputBlock("normal");
normal.visibleInInspector = false;
normal.visibleOnFrame = false;
normal.target = 1;
normal.setAsAttribute("normal");

// LightBlock
var Lights = new LightBlock("Lights");
Lights.visibleInInspector = false;
Lights.visibleOnFrame = false;
Lights.target = 3;

// TransformBlock
var WorldPosViewProjectionTransform = new TransformBlock("WorldPos * ViewProjectionTransform");
WorldPosViewProjectionTransform.visibleInInspector = false;
WorldPosViewProjectionTransform.visibleOnFrame = false;
WorldPosViewProjectionTransform.target = 1;
WorldPosViewProjectionTransform.complementZ = 0;
WorldPosViewProjectionTransform.complementW = 1;

// InputBlock
var ViewProjection = new InputBlock("ViewProjection");
ViewProjection.visibleInInspector = false;
ViewProjection.visibleOnFrame = false;
ViewProjection.target = 1;
ViewProjection.setAsSystemValue(NodeMaterialSystemValues.ViewProjection);

// VertexOutputBlock
var VertexOutput = new VertexOutputBlock("VertexOutput");
VertexOutput.visibleInInspector = false;
VertexOutput.visibleOnFrame = false;
VertexOutput.target = 1;

// InputBlock
var cameraPosition = new InputBlock("cameraPosition");
cameraPosition.visibleInInspector = false;
cameraPosition.visibleOnFrame = false;
cameraPosition.target = 1;
cameraPosition.setAsSystemValue(NodeMaterialSystemValues.CameraPosition);

// GradientBlock
var Gradient = new GradientBlock("Gradient");
Gradient.visibleInInspector = false;
Gradient.visibleOnFrame = false;
Gradient.target = 4;
Gradient.colorSteps = [];
Gradient.colorSteps.push(new GradientBlockColorStep(0, new Color3(1, 0, 0)));
Gradient.colorSteps.push(new GradientBlockColorStep(0.33, new Color3(0.8627450980392157, 1, 0)));
Gradient.colorSteps.push(new GradientBlockColorStep(0.66, new Color3(0, 0.9215686274509803, 1)));
Gradient.colorSteps.push(new GradientBlockColorStep(1, new Color3(0.7372549019607844, 0.09019607843137255, 0.8588235294117647)));

// RemapBlock
var Remap = new RemapBlock("Remap");
Remap.visibleInInspector = false;
Remap.visibleOnFrame = false;
Remap.target = 4;
Remap.sourceRange = new Vector2(-1, 1);
Remap.targetRange = new Vector2(0, 1);

// InputBlock
var input = new InputBlock("input");
input.visibleInInspector = false;
input.visibleOnFrame = false;
input.target = 1;
input.value = 3;
input.min = 0;
input.max = 0;
input.isBoolean = false;
input.matrixMode = 0;
input.animationType = AnimatedInputBlockTypes.None;
input.isConstant = false;

// InputBlock
var sourceMin = new InputBlock("sourceMin");
sourceMin.visibleInInspector = false;
sourceMin.visibleOnFrame = false;
sourceMin.target = 1;
sourceMin.value = 0;
sourceMin.min = 0;
sourceMin.max = 0;
sourceMin.isBoolean = false;
sourceMin.matrixMode = 0;
sourceMin.animationType = AnimatedInputBlockTypes.None;
sourceMin.isConstant = false;

// InputBlock
var sourceMax = new InputBlock("sourceMax");
sourceMax.visibleInInspector = false;
sourceMax.visibleOnFrame = false;
sourceMax.target = 1;
sourceMax.value = 3;
sourceMax.min = 0;
sourceMax.max = 0;
sourceMax.isBoolean = false;
sourceMax.matrixMode = 0;
sourceMax.animationType = AnimatedInputBlockTypes.None;
sourceMax.isConstant = false;

// InputBlock
var targetMin = new InputBlock("targetMin");
targetMin.visibleInInspector = false;
targetMin.visibleOnFrame = false;
targetMin.target = 1;
targetMin.value = 0;
targetMin.min = 0;
targetMin.max = 0;
targetMin.isBoolean = false;
targetMin.matrixMode = 0;
targetMin.animationType = AnimatedInputBlockTypes.None;
targetMin.isConstant = true;

// InputBlock
var targetMax = new InputBlock("targetMax");
targetMax.visibleInInspector = false;
targetMax.visibleOnFrame = false;
targetMax.target = 1;
targetMax.value = 1;
targetMax.min = 1;
targetMax.max = 1;
targetMax.isBoolean = false;
targetMax.matrixMode = 0;
targetMax.animationType = AnimatedInputBlockTypes.None;
targetMax.isConstant = true;

// FragmentOutputBlock
var FragmentOutput = new FragmentOutputBlock("FragmentOutput");
FragmentOutput.visibleInInspector = false;
FragmentOutput.visibleOnFrame = false;
FragmentOutput.target = 2;
FragmentOutput.convertToGammaSpace = false;
FragmentOutput.convertToLinearSpace = false;
FragmentOutput.useLogarithmicDepth = false;

// InputBlock
var alpha = new InputBlock("alpha");
alpha.visibleInInspector = false;
alpha.visibleOnFrame = false;
alpha.target = 1;
alpha.value = 1;
alpha.min = 0;
alpha.max = 1;
alpha.isBoolean = false;
alpha.matrixMode = 0;
alpha.animationType = AnimatedInputBlockTypes.None;
alpha.isConstant = false;

// Connections
position.output.connectTo(WorldPos.vector);
World.output.connectTo(WorldPos.transform);
WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
WorldPosViewProjectionTransform.output.connectTo(Lights.worldPosition);
normal.output.connectTo(Worldnormal.vector);
World.output.connectTo(Worldnormal.transform);
Worldnormal.output.connectTo(Lights.worldNormal);
cameraPosition.output.connectTo(Lights.cameraPosition);
input.output.connectTo(Remap.input);
sourceMin.output.connectTo(Remap.sourceMin);
sourceMax.output.connectTo(Remap.sourceMax);
targetMin.output.connectTo(Remap.targetMin);
targetMax.output.connectTo(Remap.targetMax);
Remap.output.connectTo(Gradient.gradient);
Gradient.output.connectTo(Lights.diffuseColor);
Lights.diffuseOutput.connectTo(FragmentOutput.rgb);
alpha.output.connectTo(FragmentOutput.a);

// Output nodes
nodeMaterial.addOutputNode(VertexOutput);
nodeMaterial.addOutputNode(FragmentOutput);
nodeMaterial.build();

return (v) => { 
  console.log(v)
  nodeMaterial.getBlockByName("input").value = v
  return nodeMaterial.clone()};
}

let material = makeMaterial();

  //This series of chained methods will create our visualization 
  //Using our CoT as a parent we use bind to create sphere meshes for each row of our data
  let spheres = chart.bind('sphere', {diameter: 0.5}, iris) 
    .positionX((d) => scaleX(d.sepalLength)) //most selection methods can either be passed a raw value, or a function that will return the correct value of the attribute
    .positionY((d) => scaleY(d.petalLength))  //When you pass a function the method will pass the data associated with the mesh as JSON and the index of the data (d,i)
    .positionZ((d) => scaleZ(d.sepalWidth)) //So we create a function that takes param d and since we know the keys of the data can pass d.<key> into our function that returns an int
    .material((d,m,i) => scaleC(d.species))
    //.diffuseColor((d) => scaleC(d.species)) //change the diffuse color of our material using our color scale function.
    //Babylon use an action system to trigger events form interacting with meshes, this is a simple example to show a hover interaction. grow when hover and shrink when stopped. 
    .action((d) => new InterpolateValueAction( 
          ActionManager.OnPointerOverTrigger,
          d,
          'scaling',
          new Vector3(1.2, 1.2, 1.2),
          100
      ))
      .action((d) => new InterpolateValueAction(
        ActionManager.OnPointerOutTrigger,
        d,
        'scaling',
        new Vector3(1, 1, 1),
        100));

     
    

 

    //Using the Axis prefab from Anu, we can create our chart axis by passing in d3 scale functions for each xyz dimension. 
    // let axis = new anu.Axis('testAxis', scene, {cot: chart, x: scaleX, y: scaleY, z: scaleZ})
    //                   .shape()
    //                   .background()
    //                   .ticks()
    //                   .grid();

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    return scene;
  
  };
  


