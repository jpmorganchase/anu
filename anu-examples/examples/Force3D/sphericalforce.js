import { HemisphericLight, 
    Mesh,
    MeshBuilder,
    Vector2,
     Vector3,
     Scene,
     ArcRotateCamera, 
     TransformNode, 
     StandardMaterial, 
     Color3,
     KeyboardEventTypes,
     BoundingInfo,
     Animation,
     BezierCurveEase,
     PointerDragBehavior,
     Engine,
     UniversalCamera,
     CreateGreasedLine,
     ActionManager,
     Tools,
     ExecuteCodeAction,
    } from '@babylonjs/core';
    import "@babylonjs/inspector";
    import {AdvancedDynamicTexture,
      Rectangle,
      TextBlock,
      Ellipse,
      Line
    } from "@babylonjs/gui";
    import * as d3 from "d3";
    import { forceSimulation, forceLink, forceCollide, forceManyBody, forceCenter, forceRadial } from 'd3-force-3d';

  
    export function sphericalforce(babylonEngine){
        const scene = new Scene(babylonEngine)      
        new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
        const camera = new ArcRotateCamera("Camera", Tools.ToRadians(90), Tools.ToRadians(65), 30, Vector3.Zero(), scene);
        camera.attachControl(true)

        let tempcenter = new Vector3(0, 0, 0);
        
        const data = d3.json("../data/data.json").then(function(d)
        {
          //console.log(d)
          const width = 928;
          const height = 900;
  
          // Specify the color scale.
          const color = d3.scaleOrdinal(d3.schemeCategory10);
  
          // The force simulation mutates links and nodes, so create a copy
          // so that re-evaluating this cell produces the same result.
          const links = d.links.map(d => ({...d}));
          const nodes = d.nodes.map(d => ({...d}));

          //Create a simulation with several forces.
          const simulation = forceSimulation(nodes, 3)
              .force("link", forceLink(links).id(d => d.id).strength(.1))
              .force("charge", forceManyBody())
              .force("center", forceCenter(width / 2, height / 2))
              .force("center", forceRadius(nodes, 150))
              .on("tick", ticked)

            // const simulation = forceSimulation(nodes, 3)
            // .force("link", forceLink(links).id(d => d.id).strength(0.02))
            // .force("collide", forceCollide().radius(5))
            // .force("charge", null)
            // //.force("center", forceCenter(width / 2, height / 2))
            // .force("r", forceRadial(100))
            // //.force("center", forceRadius(nodes, 100))
            // .on("tick", ticked)

          console.log(nodes)
                
          let dots = [];
          let isdragged = [];
          let textLabels = [];
          let groupcolors = [];
  
          let actionManager = new ActionManager(scene);
  
          var orange = new StandardMaterial("orangeMat", scene);
          orange.diffuseColor = new Color3(1, .8, .6);
  
          var blue = new StandardMaterial("blueMat", scene);
          blue.diffuseColor = new Color3(.24, .58, .79);
  
          var green = new StandardMaterial("greenMat", scene);
          green.diffuseColor = new Color3(.24, .79, .37);
  
          var yellow = new StandardMaterial("yellowMat", scene);
          yellow.diffuseColor = new Color3(.93, .91, .51);
  
          var purple = new StandardMaterial("purpleMat", scene);
          purple.diffuseColor = new Color3(.88, .51, .93);
  
          var grey = new StandardMaterial("greyMat", scene);
          grey.diffuseColor = new Color3(.88, .88, .93);
  
          var red = new StandardMaterial("redMat", scene);
          red.diffuseColor = new Color3(.92, .43, .31);
  
          var vine = new StandardMaterial("bvineMat", scene);
          vine.diffuseColor = new Color3(.65, .93, .31);
  
          groupcolors.push(orange);
          groupcolors.push(blue);
          groupcolors.push(green);
          groupcolors.push(yellow);
          groupcolors.push(purple);
          groupcolors.push(grey);
          groupcolors.push(red);
          groupcolors.push(vine);
  
          nodes.forEach((node, i) => {
  
            //console.log(node);
            const sphere = MeshBuilder.CreateSphere("sphere", scene); //scene is optional and defaults to the current scene
            sphere.material = groupcolors[Number(node.group)];
            sphere.scaling = new Vector3(10, 10, 10)
            dots.push(sphere)
            sphere.actionManager = new ActionManager(scene);
            sphere.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function(ev){	
              //console.log(nodes[i].id)
              textLabels[i].getControlByName("target").isVisible = true;
              textLabels[i].getControlByName("rect").isVisible = true;
              textLabels[i].getControlByName("line").isVisible = true;
            }));
  
            sphere.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function(ev){
              if(!isdragged[i]){
                textLabels[i].getControlByName("target").isVisible = false;
                textLabels[i].getControlByName("rect").isVisible = false;
                textLabels[i].getControlByName("line").isVisible = false;
              }
            }));
  
            var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
  
            var rect1 = new Rectangle();
            rect1.name = "rect";
            rect1.width = 0.2;
            rect1.height = "30px";
            rect1.cornerRadius = 5;
            rect1.color = "black";
            rect1.thickness = 1;
            rect1.background = "grey";
            advancedTexture.addControl(rect1);
            rect1.linkWithMesh(sphere);   
            rect1.linkOffsetY = -50;
  
            var label = new TextBlock();
            label.name = "label";
            label.text = nodes[i].id;
            rect1.addControl(label);
  
            var target = new Ellipse();
            target.name = "target";
            target.width = "20px";
            target.height = "20px";
            target.color = "Orange";
            target.thickness = 4;
            target.background = "Grey";
            advancedTexture.addControl(target);
            target.linkWithMesh(sphere);   
  
            var line = new Line();
            line.name = "line";
            line.lineWidth = 2;
            line.color = "Orange";
            line.y2 = 5;
            line.linkOffsetY = -10;
            advancedTexture.addControl(line);
            line.linkWithMesh(sphere); 
            line.connectedControl = rect1;
  
            
            textLabels.push(advancedTexture)
            rect1.isVisible = false;
            line.isVisible = false;
            target.isVisible = false;
  
            sphere.position = new Vector3(node.x, node.y, node.z);
            isdragged.push(false);
          })
  
          let lines = [];
          let options = [];
          links.forEach((lin, i) => {
             //console.log(lin)
              const color = Color3.Random();
              
             let myPath = [];
            let start = new Vector3(lin.source.x, lin.source.y, lin.source.z);
            let end = new Vector3(lin.target.x, lin.target.y, lin.target.z);
            myPath.push(start);
            myPath.push(end);
            
            const option = {
              path: myPath, //vec3 array,
              updatable: true,
              radius: .3
            }
              //let width = [1,1];
              let line = MeshBuilder.CreateTube("tube", option, scene);            // if (!instance) {
              //   instance = line;
              // }
              //line.alwaysSelectAsActiveMesh = true;
              lines.push(line);
              options.push(option);
          })
  
          // if (instance) {
          //   camera.zoomOnFactor = 1.3;
          //   camera.zoomOn([instance]);
          // }
  
          // links.forEach((lin, i) => {
          //    //console.log(lin)
          //     const color = Color3.Random();
          //     let points = [new Vector3(lin.source.x, lin.source.y, lin.source.z), new Vector3(lin.target.x, lin.target.y, lin.target.z)]
          //     //let width = [2];
          //     const option = {
          //       points: points, //vec3 array,
          //       updatable: true,
          //     };
          //     let line = MeshBuilder.CreateLines("lines", option, scene); //scene is optional and defaults to the current scene
          //     line.alwaysSelectAsActiveMesh = true;
          //     line.color = color;
          //     lines.push(line);
          //     options.push(option);
          // })
  
          const offsets = Array(2 * 3)
          offsets.fill(0)
         
          // Set the position attributes of links and nodes each time the simulation ticks.
          function ticked() {
  
            nodes.forEach((node, i) => {
              if(!isdragged[i])
                dots[i].position = new Vector3(node.x, node.y, node.z);
            })
  
            links.forEach((lin, i) => {
  
              options[i].path[0] = new Vector3(lin.source.x,  lin.source.y,  lin.source.z); 
              options[i].path[1] = new Vector3(lin.target.x, lin.target.y, lin.target.z); 
  
              options[i].instance = lines[i];
              lines[i] = MeshBuilder.CreateTube("tube", options[i]);
  
            })

            tempcenter = new Vector3(0, 0, 0);
            let cnt  = 0;
            dots.forEach((d,i) => {
                tempcenter = tempcenter.add(d.position);
                cnt++;
            })
            tempcenter = tempcenter.divide(new Vector3(cnt, cnt, cnt));
            camera.setTarget(tempcenter);
  
          }
  
          dots.forEach((d, i) => {
            var pointerDragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0, 0, 1)});
            pointerDragBehavior.useObjectOrientationForDragging = false;
            pointerDragBehavior.onDragStartObservable.add((event)=>{
              simulation.alphaTarget(0.3).restart();
                // node.setParent(null);
                console.log("dragged")
                isdragged[i] = true;
                nodes[i].fx = d.position.x;
                nodes[i].fy = d.position.y;
                nodes[i].fz = d.position.z;
            })
            pointerDragBehavior.onDragObservable.add((event)=>{
              nodes[i].fx = d.position.x;
              nodes[i].fy = d.position.y;
              nodes[i].fz = d.position.z;
            })
            pointerDragBehavior.onDragEndObservable.add((event)=>{
              isdragged[i] = false;
              simulation.alphaTarget(0);
              nodes[i].fx = null;
              nodes[i].fy = null;
              nodes[i].fz = null;
            })
            d.addBehavior(pointerDragBehavior)
        });
  
          // simulation.alphaTarget(0.3).restart();
          
          // When this cell is re-run, stop the previous simulation. (This doesn’t
          // really matter since the target alpha is zero and the simulation will
          // stop naturally, but it’s a good practice.)
          //invalidation.then(() => simulation.stop());
  
        // // Append the SVG element.
        //   container.append(svg.node());
  
      });
        scene.clipPlane = null;
        return scene;
}

function forceRadius(nodes, R = 1) {
  return () => {
    for (const n of nodes) {
      const r = Math.hypot(n.x, n.y, n.z);
      const u = Math.pow(r ? Math.sqrt(R / r) : 1, 0.05);
      n.x *= u;
      n.y *= u;
      n.z *= u;
    }
  }
}