import { HemisphericLight, Vector3, Scene, ArcRotateCamera, ActionManager, ExecuteCodeAction, HighlightLayer, Color3} from '@babylonjs/core';
import { AdvancedDynamicTexture, Rectangle, TextBlock} from '@babylonjs/gui'
import * as anu from '@jpmorganchase/anu';
import { extent, scaleOrdinal, scaleLinear, map, flatGroup, } from "d3";
import iris from '../../data/iris.json';

export function multipleInteractions(engine) {

  //Create an empty scene
  const scene = new Scene(engine)
  //Add some lighting (name, position, scene)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  //Add a camera that rotates around the origin 
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 3), Math.PI / 2, 5, new Vector3(0, 0, 0), scene);
  camera.attachControl(true);

  //Create D3 scales
  var scaleX = scaleLinear().domain(extent(map(iris, (d) => { return d.sepalLength }))).range([-1, 1]).nice();
  var scaleY = scaleLinear().domain(extent(map(iris, (d) => { return d.petalLength }))).range([-1, 1]).nice();
  var scaleZ = scaleLinear().domain(extent(map(iris, (d) => { return d.sepalWidth }))).range([-1, 1]).nice();
  var scaleC = scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())

  //Create a transform node to use as the parent node for all our meshes
  let CoT = anu.create("cot", "cot");
  //Select our center or transform with Anu to give us a selection obj CoT.
  let chart = anu.selectName('cot', scene);

  //HighlightLayer us to had a highlight stencil to a mesh
  const highlighter = new HighlightLayer("highlighter", scene); 

  //Use Babylon GUI system to create a texture gui for a plane mesh
  const hoverPlane = anu.create('plane', 'hoverPlane', {width: 1, height: 1})
  hoverPlane.isPickable = false; //disable picking so it doesn't get in the way of interactions
  hoverPlane.renderingGroupId = 1; //set render id higher so it always renders in front

  let advancedTexture = AdvancedDynamicTexture.CreateForMesh(hoverPlane);

  //Create a rectangle for the background
  let UIBackground = new Rectangle();
  UIBackground.adaptWidthToChildren = true;
  UIBackground.adaptHeightToChildren = true;
  UIBackground.cornerRadius = 20;
  UIBackground.color = "Black";
  UIBackground.thickness = 2;
  UIBackground.background = "White";
  advancedTexture.addControl(UIBackground);

  //Create empty text block 
  let label = new TextBlock();
  label.paddingLeftInPixels = 25;
  label.paddingRightInPixels = 25;
  label.fontSizeInPixels = 150;
  label.resizeToFit = true;
  label.text = " ";
  UIBackground.addControl(label);

  //Hide the plane until needed
  hoverPlane.isVisible = false;
  //Set billboard mode to always face camera
  hoverPlane.billboardMode = 7;

  //For readability we can define our actions separately
  let onHoverAction = (d,n,i) => new ExecuteCodeAction(
    ActionManager.OnPointerOverTrigger,
    () => {
        highlighter.addMesh(n, Color3.White());
        label.text = d.species //Change Label Text
        hoverPlane.position = n.position.add(new Vector3(0, 0.15, 0)) //Move ui mesh to mesh position with offset
        hoverPlane.isVisible = true; //unhide mesh
    }
  );

  let onLeaveAction = (d,n,i) => new ExecuteCodeAction(
    ActionManager.OnPointerOutTrigger,
    () => {
        highlighter.removeMesh(n);
        hoverPlane.isVisible = false; //hide mesh
        label.text = " ";
    }
  );

  let spheres = chart.bind('sphere', { diameter: 0.07 }, iris)
    .positionX((d) => scaleX(d.sepalLength))
    .positionY((d) => scaleY(d.petalLength))
    .positionZ((d) => scaleZ(d.sepalWidth))
    .material((d) => scaleC(d.species))
    .action(onHoverAction)    //Set actions to the ones we defined above
    .action(onLeaveAction);
  
  anu.createAxes('myAxes', scene, {
    parent: chart,
    scale: { x: scaleX, y: scaleY, z: scaleZ }});

  //Add transform widgets via prefab
  chart.positionUI().scaleUI().rotateUI();

  return scene;
};



