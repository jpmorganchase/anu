// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu'
import iris from './data/iris.json' assert {type: 'json'};
import {HemisphericLight, Vector3, Scene, ArcRotateCamera, ActionManager, ExecuteCodeAction, HighlightLayer, Color3} from '@babylonjs/core';
import {extent, scaleOrdinal, scaleLinear, map,} from "d3";
import { AdvancedDynamicTexture, Rectangle, TextBlock} from '@babylonjs/gui'

export const fig1a = function(engine){
  const scene = new Scene(engine)
  let light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
  light.intensity = 1.2
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(2,0,-5.5);

  var scaleX = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalLength}))).range([-1,1]).nice();
  var scaleY = scaleLinear().domain(extent(map(iris, (d) => {return d.petalLength}))).range([-1,1]).nice();
  var scaleZ = scaleLinear().domain(extent(map(iris, (d) => {return d.sepalWidth}))).range([-1,1]).nice();

  var scaleC = scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())

  let CoT = anu.create("cot", "center", {}, {});

  let chart = anu.selectName('center', scene);

  const highlighter = new HighlightLayer("highlighter", scene); //Allows us to had a highlight stencil to a mesh

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
  label.fontSizeInPixels = 80;
  label.resizeToFit = true;
  label.text = " "
  UIBackground.addControl(label);

  //Hide the plane until needed
  hoverPlane.isVisible = false;
  //Set billboard mode to always face camera
  hoverPlane.billboardMode = 7;

  let spheres = chart.bind('sphere', {diameter: 0.05}, iris)
    .positionX((d) => scaleX(d.sepalLength))
    .positionY((d) => scaleY(d.petalLength))
    .positionZ((d) => scaleZ(d.sepalWidth))
    .material((d,m,i) => scaleC(d.species))
    .action((d,n,i) => new ExecuteCodeAction( //A flexible action that executes a function after the trigger
    ActionManager.OnPointerOverTrigger,
    () => {
        highlighter.addMesh(n, Color3.White());
        label.text = d.species + ": " + i //Change Label Text
        hoverPlane.position = n.position.add(new Vector3(0, 0.1, 0)) //Move ui mesh to mesh position with offset
        hoverPlane.isVisible = true; //unhide mesh
    }
    ))
    .action((d,n,i) => new ExecuteCodeAction( //Same as above but in reverse
        ActionManager.OnPointerOutTrigger,
        () => {
            highlighter.removeMesh(n);
            hoverPlane.isVisible = false;
            label.text = " ";
        }
    ))

    anu.createAxes('test', scene, {parent: chart, scale: {x: scaleX, y: scaleY, z: scaleZ}});

    chart.positionUI()
         .scaleUI()
         .rotateUI();


    return scene;

};



