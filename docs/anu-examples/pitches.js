// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, ArcRotateCamera, HemisphericLight, Vector2, Vector3,  Color3, StandardMaterial, ActionManager, ExecuteCodeAction, PolygonMeshBuilder, RawTexture, Engine } from '@babylonjs/core';
import { AdvancedDynamicTexture, Rectangle, TextBlock } from '@babylonjs/gui';
import earcut from 'earcut';    //Required for PolygonMeshBuilder
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import data from './data/pitches.json';

export function pitches(engine){

  //Babylon boilerplate
  const scene = new Scene(engine);
  const light = new HemisphericLight('light1', new Vector3(0, 10, -10), scene);
  const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.09, 11, new Vector3(0, 0, 9), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Function to convert the coordinates of the simulated pitches into Babylon coordinates
  function pitchToPoints(pitch) {
    const pitchTrajectory = pitch.pitch_trajectory;
    let points = pitchTrajectory.map(d => new Vector3(d.x / 3.281,  //Convert feet to meters
                                      d.z / 3.281,      //y and z are flipped in the data
                                      d.y / 3.281));
    points.pop();   //Remove the last point in our dataset since the simulation keeps going for one timestep beyond the homeplate
    return points;
  }

  //Calculate the timings needed to stagger the animation of each pitch based on their duration
  let timings = [];
  let acc = 500;    //Accumulator to determine time between pitches. Start with a fixed value to introduce a delay in animation on page load
  data.forEach(d => {
    const pitchTrajectory = d.pitch_trajectory;
    const duration = pitchTrajectory[pitchTrajectory.length - 1].time * 1000;
    const offset = 100;     //Constant emporal offset between pitch animations
    timings.push({ duration: duration, delay: acc});
    acc += duration + offset;
  });

  //D3 scale for color coded pitch names
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor3());

  //Code for details on demand (from existing example)
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
  label.fontSizeInPixels = 40;
  label.resizeToFit = true;
  label.text = " "
  UIBackground.addControl(label);

  //Create our CoT that will hold our meshes
  let CoT = anu.create("cot", "chart");
  let chart = anu.selectName("chart", scene);

  //Create lines for each pitch's trajectory
  let trajectories = chart.bind('greasedLine', { points: (d,n,i) => pitchToPoints(d) }, data)
    .run((d,n,i) => {
      n.greasedLineMaterial.width = 0.02;
      n.greasedLineMaterial.visibility = 0;     //This will cause the line to shrink and become fully invisible
      n.greasedLineMaterial.color = scaleC(d.pitch_name);

      //We want to have transparency for greasedLines to facilitate hover highlighting, but unfortunately Babylon does not support this easily as of now
      //A workaround is to assign a 1x1 texture with an alpha value and toggle its alpha on and off. The greasedLineMaterial.color will override the texture's rgb values so we just sent these to 0
      const texture = new RawTexture(new Uint8Array([0, 0, 0, 50]), 1, 1, Engine.TEXTUREFORMAT_RGBA, scene, false, false, Engine.TEXTURE_LINEAR_LINEAR);
      n.material.diffuseTexture = texture;
      n.material.diffuseTexture.hasAlpha = false;     //We will set these flags to true once we want transparency
      n.material.useAlphaFromDiffuseTexture = false;
    })
    .transition((d,n,i) => ({
      duration: timings[i].duration,    //This will cause the animation for each pitch to be the same duration as the actual pitch itself (the data is simulated at 200 Hz)
      delay: timings[i].delay           //This will achieve our stagger effect
    }))
    .tween((d,n,i) => {
      return (t) => {
        n.greasedLineMaterial.visibility = t;   //As t increases to 1, the line will progressively reveal itself from start to end, achieving our growing line effect
      }
    });

  //Create the baseballs for each pitch
  let baseballs = chart.bind('sphere', { diameter: 0.075, segments: 8 }, data)
    .prop('isVisible', false)
    .material((d,n,i) => new StandardMaterial('ballMaterial'))
    .diffuseColor((d,n,i) => scaleC(d.pitch_name))
    .specularColor(Color3.Black())
    .action((d,n,i) => new ExecuteCodeAction(
      ActionManager.OnPointerOverTrigger,
      () => {
        //Details on demand
        hoverPlane.isVisible = true;
        label.text = `${d.pitch_name}\n${d.release_speed} mph\n${d.type}`
        hoverPlane.position = n.position.add(new Vector3(0, 0.1, 0));
        
        //Set transparency of the other baseballs and trajectories
        baseballs.prop('material.alpha', (d_, n_, i_) => (i_ !== i) ? 0.4 : 1);
        trajectories.run((d_,n_,i_) => {
          if (i_ !== i) {
            n_.material.diffuseTexture.hasAlpha = true;
            n_.material.useAlphaFromDiffuseTexture = true;
          }
        })
      }
    ))
    .action((d,n,i) => new ExecuteCodeAction(
      ActionManager.OnPointerOutTrigger,
      () => {
        hoverPlane.isVisible = false;
        
        //Reset the transparency
        baseballs.prop('material.alpha', 1);
        trajectories.run((d_,n_,i_) => {
          if (i_ !== i) {
            n_.material.diffuseTexture.hasAlpha = false;
            n_.material.useAlphaFromDiffuseTexture = false;
          }
        })
      }
    ));

  //Add animations to the baseballs. Note we do this separately from the above function chain so that we avoid assigning a Transition object to our baseballs variable
  baseballs.transition((d,n,i) => ({
      duration: timings[i].duration,
      delay: timings[i].delay - 50,   //Make sure that the ball moves before the line to create a nice trail effect
    }))
    .tween((d,n,i) => {
      const trajectory = pitchToPoints(d);
      n.position = trajectory[0];   //Start position
      trajectory[trajectory.length - 1] = new Vector3(d.plate_x / 3.281, d.plate_z / 3.281, 0);   //Replace the last position with the recorded coordinates of where the ball actually was when it crosses the home plate
      
      return (t) => {
        if (t > 0)
          n.isVisible = true;

        //In our array of Vector3, calculate between which pitch segments the animation is currently at, compute the intermediary t value, then Lerp it for a smooth animation
        const idx = Math.floor(t * (trajectory.length - 1));
        const nextIdx = Math.min(idx + 1, trajectory.length - 1);
        const thisT = t * (trajectory.length - 1) - idx;
        n.position = Vector3.Lerp(trajectory[idx], trajectory[nextIdx], thisT);
      }
    })

    
  //Create a simple baseball environment
  let environmentCoT = anu.create('cot', 'environment');
  let environment = anu.selectName('environment', scene);

  //Shared materials
  let sandMaterial = new StandardMaterial('sandMaterial');
  sandMaterial.diffuseColor = Color3.FromHexString('#CAA472');
  sandMaterial.specularColor = Color3.Black();
  let whiteMaterial = new StandardMaterial('rubberMaterial');
  whiteMaterial.diffuseColor = Color3.White();
  whiteMaterial.specularColor = Color3.Black();

  //Grass
  environment.bind('ground', { width: 27.4, height: 27.4 })
    .material(new StandardMaterial('groundMaterial'))
    .diffuseColor(Color3.FromHexString('#3f9b0b'))
    .specularColor(Color3.Black())
    .position(new Vector3(0, 0, 18.4))
    .rotationY(Math.PI / 4)

  //Pitcher's mound
  environment.bind('disc', { radius: 2.7432 })
    .material(sandMaterial)
    .position(new Vector3(0, 0.01, 18.4))
    .rotationX(Math.PI / 2)

  //Pitching rubber
  environment.bind('ground', { width: 1.524, height: 0.9144 })
    .material(whiteMaterial)
    .position(new Vector3(0, 0.02, 18.4 + 0.4572));

  //Sand around home plate
  environment.bind('disc', { radius: 3.9624 })
    .material(sandMaterial)
    .position(new Vector3(0, 0.01, 0))
    .rotationX(Math.PI / 2);

  //Home plate
  const homePlateVertices = [     //Because it is an irregular polygon, we use the PolygonMeshBuilder with custom vertices using the real world sizes of the home plate
    new Vector2(0, 0),
    new Vector2(0.2159, 0),
    new Vector2(0.2159, -0.2152),
    new Vector2(0, -0.4311),
    new Vector2(-0.2159, -0.2152),
    new Vector2(-0.2159, 0)
  ];
  let plateBuilder = new PolygonMeshBuilder('plateMesh', homePlateVertices, scene, earcut);   //earcut package is required as a dependency
  let plateMesh = plateBuilder.build()
  plateMesh.parent = environmentCoT;
  plateMesh = new anu.Selection([plateMesh]);
  plateMesh.material(whiteMaterial)
    .positionY(0.02)

  //Strike zone
  const strikeZoneCorners = [ 
    new Vector2(0.2667,0),
    new Vector2(0.2667,0.7551),
    new Vector2(-0.2667, 0.7551),
    new Vector2(-0.2667,0),
  ];
  const strikeZoneHole = [
    new Vector2(0, 0.0508),
    new Vector2(0.2159, 0.0508),
    new Vector2(0.2159, 0.7043),
    new Vector2(-0.2159, 0.7043),
    new Vector2(-0.2159, 0.0508)
  ];
  let zoneBuilder = new PolygonMeshBuilder("strikeZoneMesh", strikeZoneCorners, scene, earcut);
  zoneBuilder.addHole(strikeZoneHole);
  let strikeZoneMesh = zoneBuilder.build(false, 0.005);
  strikeZoneMesh.parent = environmentCoT;
  strikeZoneMesh.material = whiteMaterial;
  strikeZoneMesh.position.y = 0.4;
  strikeZoneMesh.rotation.x = -Math.PI / 2;

  return scene;
}