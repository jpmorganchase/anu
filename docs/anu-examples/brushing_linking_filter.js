// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import vega from 'vega-datasets';

//create and export a function that takes a babylon engine and returns a scene
export const brushingLinkingFilter = async function(engine){

  const data = await vega['cars.json']();

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0.5, -5);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  
  //Create a scatter plot and put it on the left
  let scaleX1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Miles_per_Gallon))).range([-1,1]).nice();
  let scaleY1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Weight_in_lbs))).range([-1,1]).nice();
  let scaleZ1 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Acceleration))).range([-1,1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  let CoT1 = anu.create('cot', 'cot1');
  let chart1 = anu.selectName('cot1', scene);
  let spheres1 = chart1.bind('sphere', { diameter: 0.075 }, data)
                       .position((d) => new BABYLON.Vector3(scaleX1(d.Miles_per_Gallon), scaleY1(d.Weight_in_lbs), scaleZ1(d.Acceleration)))
                       .material((d) => scaleC(d.Origin));
                       
  let axes1 = anu.createAxes('myAxes1', { scale: { x: scaleX1, y: scaleY1, z: scaleZ1 }, parent: chart1 });
  chart1.position(new BABYLON.Vector3(-1.25, 0, 0));
  

  //Create a scatter plot and put it on the right
  let scaleX2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Cylinders))).range([-1,1]).nice();
  let scaleY2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Displacement))).range([-1,1]).nice();
  let scaleZ2 = d3.scaleLinear().domain(d3.extent(d3.map(data, (d) => d.Horsepower))).range([-1,1]).nice();

  let CoT2 = anu.create('cot', 'cot2');
  let chart2 = anu.selectName('cot2', scene);
  let spheres2 = chart2.bind('sphere', { diameter: 0.075 }, data)
                       .position((d) => new BABYLON.Vector3(scaleX2(d.Cylinders), scaleY2(d.Displacement), scaleZ2(d.Horsepower)))
                       .material((d) => scaleC(d.Origin));

  let axes2 = anu.createAxes('myAxes2', { scale: { x: scaleX2, y: scaleY2, z: scaleZ2 }, parent: chart2 });
  chart2.position(new BABYLON.Vector3(1.5, 0, 0));

  //Lets create simple UI to filter the data across both charts based on our Y scale on Chart 2
  
  let allSpheres = anu.selectName('sphere', scene) //First lets select all our data points, in this case all meshed named 'sphere'

  axes2.background.y.bind("box", {size: 0.15}) //Lets create a box to be our filter UI
     .material(new BABYLON.StandardMaterial()) //Give it a material and color
     .diffuseColor(BABYLON.Color3.Red)
     .positionY(() => scaleY2.range()[1]) //And set its default position to the top of our y axes
     .positionX(() => scaleZ2.range()[1])
     .behavior((d,n,i) => { //Now lets create a behavior to handle our filter interaction
        // Create a pointer drag behavior along the y axis
        let behavior = new BABYLON.PointerDragBehavior({ dragAxis: new BABYLON.Vector3(0, 1, 0) })
        behavior.moveAttached = false; // We will disable the default movement to hand it ourselves
        // add a on drag observable to handle movement but clamp it to the range of our Y scale
        behavior.onDragObservable.add((event) => {
          const newY = n.position.y + event.delta.y; //Calculate how far to move the mesh
          n.position.y = BABYLON.Scalar.Clamp(newY, scaleY2.range()[0], scaleY2.range()[1]) //Clamp that value to our range
        });
        // now add a on drag end observable to hand filtering, we could do this on move but it could fire this behavior too much and slow down our scene
        behavior.onDragEndObservable.add((event) => {
          allSpheres.prop('isVisible', true) //first set all nodes to visible again to reset meshes that should be visible
          //then filter the selection of meshes we want to hide
          let filtered = allSpheres.filter((d) => d.Displacement >= scaleY2.invert(n.position.y)) //using invert on our scale lets us go from range to domain

          filtered.prop('isVisible', false) //set that filtered selection is invisible
        });
              
    return behavior //set the behavior on our cube and done!
  })

  return scene;

};