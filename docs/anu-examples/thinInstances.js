// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu'
import { HemisphericLight, Scene, ArcRotateCamera, StandardMaterial, Vector3, Color4, PointerEventTypes, GPUPicker } from '@babylonjs/core'; 
import { AdvancedDynamicTexture, Rectangle, TextBlock } from '@babylonjs/gui';
import { extent, scaleOrdinal, scaleLinear, map } from "d3";
import tsne from './data/mnist_tsne.csv';   //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function thinInstances(engine){

  //Babylon boilerplate
  const scene = new Scene(engine)
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.attachControl(true)
  camera.position = new Vector3(0, 0, -23);

  //D3 scales
  let scaleX = scaleLinear().domain(extent(map(tsne, (d) => {return d.TSNE1}))).range([-1,1]);
  let scaleY = scaleLinear().domain(extent(map(tsne, (d) => {return d.TSNE2}))).range([-1,1]);
  let scaleZ = scaleLinear().domain(extent(map(tsne, (d) => {return d.TSNE3}))).range([-1,1]);
  let scaleC = scaleOrdinal(anu.ordinalChromatic('d310').toColor4());
  
  //Create the sphere that is the basis for our instances spheres
  let sphere = anu.create('sphere', 'sphere', { diameter: 0.1, segments: 1 });  //Decrease segments to decreate vertices and increase performance
  sphere.hasVertexAlpha = true;   //Must be set to allow for transparency in thinInstances
  sphere.isVisible = false;   //Hide root node
  sphere.material = new StandardMaterial('myMat');
  sphere.material.forceDepthWrite = true;   //Setting hasVertexAlpha to true causes occlusion issues with depth, so we force it here

  //Bind thinInstances based on our data
  let spheres = anu.bindThinInstance(sphere, tsne, scene)
    .thinInstancePosition((d) => new Vector3(scaleX(d.TSNE1), scaleY(d.TSNE2), scaleZ(d.TSNE3)))
    .thinInstanceColor((d) => scaleC(d.class))
    .prop('isVisible', true);

  //Demonstrate some interactions using a details on demand tooltip
  const hoverPlane = anu.create('plane', 'hoverPlane', {width: 1, height: 1})
  hoverPlane.isPickable = false;
  hoverPlane.renderingGroupId = 1;
  hoverPlane.isVisible = false;
  hoverPlane.billboardMode = 7;
  let advancedTexture = AdvancedDynamicTexture.CreateForMesh(hoverPlane);
  let UIBackground = new Rectangle();
  UIBackground.adaptWidthToChildren = true;
  UIBackground.adaptHeightToChildren = true;
  UIBackground.cornerRadius = 10;
  UIBackground.color = "Black";
  UIBackground.thickness = 2;
  UIBackground.background = "White";
  advancedTexture.addControl(UIBackground);
  let label = new TextBlock();
  label.paddingLeftInPixels = 25;
  label.paddingRightInPixels = 25;
  label.fontSizeInPixels = 150;
  label.resizeToFit = true;
  label.text = " ";
  UIBackground.addControl(label);
  
  //Create a GPUPicker that is much faster than regular picking on the CPU, see: https://doc.babylonjs.com/features/featuresDeepDive/mesh/interactions/picking_collisions#gpu-picking
  let picker1 = new GPUPicker();
  picker1.setPickingList([sphere]);    //Pass in the root mesh that is used for the thinInstances since it contains them

  //Details on demand interaction using pointer move
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type != PointerEventTypes.POINTERMOVE)
      return;

    if (picker1.pickingInProgress)
      return;

    //Pick from the mouse pointer position
    picker1.pickAsync(scene.pointerX, scene.pointerY, scene, false).then((pickingInfo) => {
      if (pickingInfo) {
        //Here we use the thinInstanceIndex to retrieve its respective datum from our original dataset, using it to determine the position of the tooltip
        let d = tsne[pickingInfo.thinInstanceIndex];
        let position = new Vector3(scaleX(d.TSNE1), scaleY(d.TSNE2), scaleZ(d.TSNE3));
        hoverPlane.position = position.add(new Vector3(0, 0.15, 0));
        hoverPlane.isVisible = true;
        label.text = d.class;
      }
      else {
        hoverPlane.isVisible = false;
      }
      //GPUPicker can destructively modify the PickingList passed into it, meaning that a thinInstance might only be able to be picked once as it is removed from the list
      //Here we set the PickingList again after every pick to ensure it is always a valid picking target
      picker1.setPickingList([sphere]);
    });
  });


  //Here we demonstrate another interaction by using a separate GPUPicker for readability. In practice you would want to use something like a shared promise instead
  let picker2 = new GPUPicker();
  picker2.setPickingList([sphere]);
  //Selection interaction using pointer tap
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type != PointerEventTypes.POINTERTAP)
      return;
    
    if (picker2.pickingInProgress)
      return;

    picker2.pickAsync(scene.pointerX, scene.pointerY, scene, false).then((pickingInfo) => {
      if (pickingInfo) {
        let thisClass = tsne[pickingInfo.thinInstanceIndex].class;
        spheres.thinInstanceColor((d,n,i) => {
          let color = scaleC(d.class);
          return new Color4(color.r, color.g, color.b, (d.class === thisClass) ? 1 : 0.1);    //Make all thinInstances that do not have the same class transparent
        });
        sphere.material.forceDepthWrite = false;    //Turn this off so that transparency works correctly
      }
      else {
        spheres.thinInstanceColor((d,n,i) => scaleC(d.class));    //Reset transparency if nothing was picked
        sphere.material.forceDepthWrite = true;     //Turn this back on so that depth works correctly
      }

      picker2.setPickingList([sphere]);
    });
  });

  scene.metadata = { name: "thinInstances" };
  return scene;
};