// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as d3 from 'd3';
import earcut from 'earcut';  //External dependecy required for PolygonMeshBuilder
import data from './data/pitches.json';

export function pitches(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  const fillLight = new BABYLON.HemisphericLight('fillLight', new BABYLON.Vector3(0, 1, 0), scene);
  fillLight.intensity = 1.25;
  fillLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(-0.25, 0.5, 0), scene);
  camera.position = new BABYLON.Vector3(-0.75, 0.75, -2);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Function to convert the coordinates of the simulated pitches into Babylon Vector3 coordinates
  function pitchToPoints(pitch) {
    const pitchTrajectory = pitch.pitch_trajectory;
    let points = pitchTrajectory.map(d => new BABYLON.Vector3(d.x / 3.281,  //Convert feet to meters
                                      d.z / 3.281,      //y and z are flipped in the data
                                      d.y / 3.281));
    points.pop();   //Remove the last point in our dataset since the simulation keeps going for one timestep beyond the homeplate
    return points;
  }

  //Calculate the timings needed to stagger the animation of each pitch based on their duration
  let timings = [];
  let acc = 500;  //Accumulator to determine time between pitches. Start with a fixed value to introduce a delay in animation on page load
  data.forEach(d => {
    const pitchTrajectory = d.pitch_trajectory;
    const duration = pitchTrajectory[pitchTrajectory.length - 1].time * 1000; //Convert seconds to milliseconds
    const offset = 100; //Constant temporal offset between pitch animations
    timings.push({ duration: duration, delay: acc});
    acc += duration + offset;
  });

  //Create a D3 scale for color, using Anu helper functions map scale outputs to Color3 objects based on the 'schemecategory10' palette from D3
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor3());

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
  label.fontSizeInPixels = 40;
  label.resizeToFit = true;
  label.text = ' ';
  UIBackground.addControl(label);

  //Create a Center of Transform TransformNode that serves the parent node for all our meshes that make up our chart
  let CoT = anu.create('cot', 'cot');
  //Select our CoT so that we have it as a Selection object
  let chart = anu.selectName('cot', scene);

  //Create lines for each pitch's trajectory
  let trajectories = chart.bind('greasedLine', { meshOptions:  {points: (d) => pitchToPoints(d) },
                                                 materialOptions: {
                                                  width: 0.02,
                                                  visibility: 0, //This will cause the line to shrink and become fully invisible
                                                  color: (d) => scaleC(d.pitch_name)
                                                 }
                                               },
                                               data)
                          .run((d,n,i) => {
                            //We want to have transparency for greasedLines to facilitate hover highlighting, but unfortunately Babylon does not support this easily as of now
                            //A workaround is to assign a 1x1 texture with an alpha value and toggle its alpha on and off. The greasedLineMaterial.color will override the texture's rgb values so we just sent these to 0
                            const texture = new BABYLON.RawTexture(new Uint8Array([0, 0, 0, 50]), 1, 1, BABYLON.Engine.TEXTUREFORMAT_RGBA, scene, false, false, BABYLON.Engine.TEXTURE_LINEAR_LINEAR);
                            n.material.diffuseTexture = texture;
                            n.material.diffuseTexture.hasAlpha = false;     //We will set these two flags to true once we want transparency
                            n.material.useAlphaFromDiffuseTexture = false;
                          });
  
  //Start an animation for the pitch trajectories
  trajectories.transition((d,n,i) => ({
                duration: timings[i].duration,    //This will cause the animation for each pitch to be the same duration as the actual pitch itself (the data is simulated at 200 Hz)
                delay: timings[i].delay           //This will achieve our stagger effect
              }))
              .prop('greasedLineMaterial.visibility', 1)  //As t increases from 0 to 1, the line will progressively reveal itself from start to end, achieving our growing line effect

  //Create sphere meshes for each pitch to simulate baseballs
  let baseballs = chart.bind('sphere', { diameter: 0.075, segments: 8 }, data)
                       .prop('isVisible', false)  //Start hidden
                       .material((d,n,i) => new BABYLON.StandardMaterial('ballMaterial'))
                       .diffuseColor((d,n,i) => scaleC(d.pitch_name))
                       .specularColor(BABYLON.Color3.Black())  //Remove reflections
                       .action((d,n,i) => new BABYLON.ExecuteCodeAction(        //When the pointer over event happens, show and update the tooltip, and
                         BABYLON.ActionManager.OnPointerOverTrigger,            //reduce the alpha of all other spheres and trajectories
                         () => {
                           hoverPlane.isVisible = true;
                           label.text = `${d.pitch_name}\n${d.release_speed} mph\n${d.type}`;
                           hoverPlane.position = n.position.add(new BABYLON.Vector3(0, 0.1, 0));
                           
                           baseballs.prop('material.alpha', (_d, _n, _i) => (_i !== i) ? 0.4 : 1);
                           trajectories.run((d_,n_,i_) => {
                             if (i_ !== i) {
                               n_.material.diffuseTexture.hasAlpha = true;    //Here we set these two flags to true to enable transparency on greasedLines
                               n_.material.useAlphaFromDiffuseTexture = true;
                             }
                           });
                         }
                       ))
                       .action((d,n,i) => new BABYLON.ExecuteCodeAction(        //When the pointer over event happens, hide the tooltip, and
                         BABYLON.ActionManager.OnPointerOutTrigger,             //reset the alpha of all spheres and trajectories
                         () => {
                           hoverPlane.isVisible = false;
                           
                           baseballs.prop('material.alpha', 1);
                           trajectories.run((_d,_n,_i) => {
                             if (_i !== i) {
                               _n.material.diffuseTexture.hasAlpha = false;
                               _n.material.useAlphaFromDiffuseTexture = false;
                             }
                           });
                         }
                       ));

  //Start an animation for the baseball pitches
  baseballs.transition((d,n,i) => ({
              duration: timings[i].duration,
              delay: timings[i].delay - 50, //Make sure that the ball moves before the line to create a nice trail effect
            }))
            .tween((d,n,i) => {
              const trajectory = pitchToPoints(d);
              n.position = trajectory[0]; //Start position
              trajectory[trajectory.length - 1] = new BABYLON.Vector3(d.plate_x / 3.281, d.plate_z / 3.281, 0); //Replace the last position with the recorded coordinates of where the ball actually was when it crosses the home plate
              
              return (t) => {
                if (t > 0)
                  n.isVisible = true;

                //In our array of Vector3, calculate between which pitch segments the animation is currently at, compute the intermediary t value, then Lerp it for a smooth animation
                const idx = Math.floor(t * (trajectory.length - 1));
                const nextIdx = Math.min(idx + 1, trajectory.length - 1);
                const thisT = t * (trajectory.length - 1) - idx;
                n.position = BABYLON.Vector3.Lerp(trajectory[idx], trajectory[nextIdx], thisT);
              }
            });

    
  //Create a simple baseball environment
  let environmentCoT = anu.create('cot', 'environment');
  let environment = anu.selectName('environment', scene);

  //Shared materials
  let sandMaterial = new BABYLON.StandardMaterial('sandMaterial');
  sandMaterial.diffuseColor = BABYLON.Color3.FromHexString('#CAA472');
  sandMaterial.specularColor = BABYLON.Color3.Black();
  let whiteMaterial = new BABYLON.StandardMaterial('rubberMaterial');
  whiteMaterial.diffuseColor = BABYLON.Color3.White();
  whiteMaterial.specularColor = BABYLON.Color3.Black();

  //Grass
  environment.bind('ground', { width: 27.4, height: 27.4 })
    .material(new BABYLON.StandardMaterial('groundMaterial'))
    .diffuseColor(BABYLON.Color3.FromHexString('#3f9b0b'))
    .specularColor(BABYLON.Color3.Black())
    .position(new BABYLON.Vector3(0, 0, 18.4))
    .rotationY(Math.PI / 4);

  //Pitcher's mound
  environment.bind('disc', { radius: 2.7432 })
    .material(sandMaterial)
    .position(new BABYLON.Vector3(0, 0.01, 18.4))
    .rotationX(Math.PI / 2);

  //Pitching rubber
  environment.bind('ground', { width: 1.524, height: 0.9144 })
    .material(whiteMaterial)
    .position(new BABYLON.Vector3(0, 0.02, 18.4 + 0.4572));

  //Sand around home plate
  environment.bind('disc', { radius: 3.9624 })
    .material(sandMaterial)
    .position(new BABYLON.Vector3(0, 0.01, 0))
    .rotationX(Math.PI / 2);

  //Home plate
  const homePlateVertices = [     //Because it is an irregular polygon, we use the PolygonMeshBuilder with custom vertices using the real world sizes of the home plate
    new BABYLON.Vector2(0, 0),
    new BABYLON.Vector2(0.2159, 0),
    new BABYLON.Vector2(0.2159, -0.2152),
    new BABYLON.Vector2(0, -0.4311),
    new BABYLON.Vector2(-0.2159, -0.2152),
    new BABYLON.Vector2(-0.2159, 0)
  ];
  let plateBuilder = new BABYLON.PolygonMeshBuilder('plateMesh', homePlateVertices, scene, earcut);   //earcut package is required as a dependency
  let plateMesh = plateBuilder.build();
  plateMesh.parent = environmentCoT;
  plateMesh = new anu.Selection([plateMesh]);
  plateMesh.material(whiteMaterial)
    .positionY(0.02);

  //Strike zone
  const strikeZoneCorners = [ 
    new BABYLON.Vector2(0.2667,0),
    new BABYLON.Vector2(0.2667,0.7551),
    new BABYLON.Vector2(-0.2667, 0.7551),
    new BABYLON.Vector2(-0.2667,0),
  ];
  const strikeZoneHole = [
    new BABYLON.Vector2(0, 0.0508),
    new BABYLON.Vector2(0.2159, 0.0508),
    new BABYLON.Vector2(0.2159, 0.7043),
    new BABYLON.Vector2(-0.2159, 0.7043),
    new BABYLON.Vector2(-0.2159, 0.0508)
  ];
  let zoneBuilder = new BABYLON.PolygonMeshBuilder('strikeZoneMesh', strikeZoneCorners, scene, earcut);
  zoneBuilder.addHole(strikeZoneHole);
  let strikeZoneMesh = zoneBuilder.build(false, 0.005);
  strikeZoneMesh.parent = environmentCoT;
  strikeZoneMesh.material = whiteMaterial;
  strikeZoneMesh.position.y = 0.4;
  strikeZoneMesh.rotation.x = -Math.PI / 2;

  return scene;
}