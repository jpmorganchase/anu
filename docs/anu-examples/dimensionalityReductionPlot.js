// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core'; 
import * as GUI from '@babylonjs/gui';
import * as d3 from 'd3';
import data from './data/mnist_tsne.csv';   //Our data

//Create and export a function that takes a Babylon engine and returns a Babylon Scene
export function dimensionalityReductionPlot(engine){

  //Babylon boilerplate
  const scene = new BABYLON.Scene(engine);
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(true);
  camera.position = new BABYLON.Vector3(0, 0, -23);

  //Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
  let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.TSNE1))).range([-1,1]);
  let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.TSNE2))).range([-1,1]);
  let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.TSNE3))).range([-1,1]);
  //Do the same for color, using Anu helper functions to map values to Color4 objects with colors based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

  //We use Thin Instances here for better performance, first we create a Mesh that serves as the root Node
  let rootSphere = anu.create('sphere', 'sphere', { diameter: 0.1, segments: 2 });  //Decrease segments to decrease vertices and increase performance
  rootSphere.hasVertexAlpha = true;   //Must be set to allow for transparency in thin instances
  rootSphere.isVisible = false;
  rootSphere.material = new BABYLON.StandardMaterial('myMat');
  rootSphere.material.specularColor = new BABYLON.Color4(0, 0, 0, 1);         //Remove reflections
  rootSphere.material.emissiveColor = new BABYLON.Color4(0.3, 0.3, 0.3, 1);   //Make a bit brighter
  rootSphere.material.forceDepthWrite = true;   //Setting hasVertexAlpha to true causes occlusion issues with depth, so we force it here

  //Create Thin Instances from our rootSphere and set visual encodings using the special thinInstance methods  
  let spheres = anu.bindThinInstance(rootSphere, data)
                   .thinInstancePosition((d) => new BABYLON.Vector3(scaleX(d.TSNE1), scaleY(d.TSNE2), scaleZ(d.TSNE3)))
                   .thinInstanceColor((d) => scaleC(d.class))
                   .prop('isVisible', true);


  //Create a plane Mesh that will serve as our tooltip
  const hoverPlane = anu.create('plane', 'hoverPlane', { width: 1, height: 1 });
  hoverPlane.isPickable = false;    //Disable picking so it doesn't get in the way of interactions
  hoverPlane.renderingGroupId = 1;  //Set render id higher so it always renders in front of other objects
  hoverPlane.isVisible = false;     //Hide the tooltip
  hoverPlane.billboardMode = 7;     //Set the tooltip to always face the camera

  //Add an AdvancedDynamicTexture to this plane Mesh which will let us render Babylon GUI elements on it
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(hoverPlane);

  //Create and customize the rectangle for the background
  let UIBackground = new GUI.Rectangle();
  UIBackground.adaptWidthToChildren = true;
  UIBackground.adaptHeightToChildren = true;
  UIBackground.cornerRadius = 10;
  UIBackground.color = 'Black';
  UIBackground.thickness = 2;
  UIBackground.background = 'White';
  advancedTexture.addControl(UIBackground);
  
  //Create and customize the text for our tooltip
  let label = new GUI.TextBlock();
  label.paddingLeftInPixels = 25;
  label.paddingRightInPixels = 25;
  label.fontSizeInPixels = 150;
  label.resizeToFit = true;
  label.text = ' ';
  UIBackground.addControl(label);

  
  //Create a GPUPicker that is much faster than regular picking on the CPU, see: https://doc.babylonjs.com/features/featuresDeepDive/mesh/interactions/picking_collisions#gpu-picking
  let picker1 = new BABYLON.GPUPicker();
  picker1.setPickingList([rootSphere]);    //Pass in the root mesh that is used for the Thin Instances since it contains the list of Thin Instances

  //Details on demand interaction using pointer move
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type != BABYLON.PointerEventTypes.POINTERMOVE)
      return;

    if (picker1.pickingInProgress)
      return;

    //Pick from the mouse pointer position
    picker1.pickAsync(scene.pointerX, scene.pointerY, scene, false).then((pickingInfo) => {
      if (pickingInfo) {
        //Here we use the thinInstanceIndex to retrieve its respective datum from our original dataset, and use it to determine the position of the tooltip
        let d = data[pickingInfo.thinInstanceIndex];
        let position = new BABYLON.Vector3(scaleX(d.TSNE1), scaleY(d.TSNE2), scaleZ(d.TSNE3));
        hoverPlane.position = position.add(new BABYLON.Vector3(0, 0.15, 0));
        hoverPlane.isVisible = true;
        label.text = d.class;
      }
      else {
        hoverPlane.isVisible = false;
      }

      //GPUPicker can destructively modify the PickingList passed into it, meaning that a Thin Instance might only be able to be picked once as it is removed from the list
      //Here we set the PickingList again after every pick to ensure it is always a valid picking target
      picker1.setPickingList([rootSphere]);
    });
  });


  //Here we demonstrate another interaction by using a separate GPUPicker for readability. In practice you would want to use something like a shared promise instead to use the same GPUPicker
  let picker2 = new BABYLON.GPUPicker();
  picker2.setPickingList([rootSphere]);

  //Selection interaction using pointer tap
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type != BABYLON.PointerEventTypes.POINTERTAP)
      return;
    
    if (picker2.pickingInProgress)
      return;

    picker2.pickAsync(scene.pointerX, scene.pointerY, scene, false).then((pickingInfo) => {
      if (pickingInfo) {
        //Again we use the thinInstanceIndex to retrieve its respective datum from our original dataset, and use it to determine the position of the tooltip
        let thisClass = data[pickingInfo.thinInstanceIndex].class;
        //Change the alpha of the spheres
        spheres.thinInstanceColor((d,n,i) => {
          let color = scaleC(d.class);
          return new BABYLON.Color4(color.r, color.g, color.b, (d.class === thisClass) ? 1 : 0.1);    //Make all thin instances that do not have the same class transparent
        });
        rootSphere.material.forceDepthWrite = false;    //Turn this off so that transparency works correctly
      }
      else {
        //Reset transparency if nothing was picked
        spheres.thinInstanceColor((d,n,i) => scaleC(d.class));
        rootSphere.material.forceDepthWrite = true;     //Turn this back on so that depth works correctly
      }

      picker2.setPickingList([rootSphere]);
    });
  });

  scene.metadata = { name: 'thinInstances' };
  
  return scene;
};