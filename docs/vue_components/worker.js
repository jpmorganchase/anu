import { Engine, Scene, Color3, Vector3} from "@babylonjs/core";
import { JSONfn } from 'jsonfn';
//import { barchart3D } from "../anu-examples/BarCharts/barchart3d";

// let tempCanvas = document.createElement('canvas');
// let engine = new Engine(tempCanvas, true);

// let engine = new Engine(canvas, true);

let engine = undefined;

self.onmessage = async function (evt) {

    if (engine === undefined){
      self.postMessage("make engine")
      engine = new Engine(evt.data.canvas, true)
    } 

    self.postMessage("start")
    let canvas = evt.data.canvas;
    let obj = await import('../anu-examples/BarCharts/barchart3d');
    let scene = await obj.barchart3D(engine)
    let view = engine.registerView(canvas, scene.activeCamera);
    const env = scene.createDefaultEnvironment();
    env.setMainColor(Color3.FromHexString('#0e0e17'));
    env.ground.position = new Vector3(0, -2, 0);

  //   scene.detachControl();

  //   canvas.addEventListener('mouseout', (i) => {
  //     scene.detachControl();
  //   })

  // canvas.addEventListener('mouseover', (i) => {
  //     engine.inputElement = canvas
  //     scene.attachControl();

      // // if (e.detail.inspector) {
      // //   Inspector.Show(scene, {
      // //     globalRoot: canvas.parentElement,
      // //     embedMode: true,
      // //     showInspector: false,
      // //   });
      // }
    //});

    engine.activeView = view;

    engine.runRenderLoop(() => {
      if (engine.activeView === view) {
        scene.render();
      }
      // scene.render();
    });
  };
  