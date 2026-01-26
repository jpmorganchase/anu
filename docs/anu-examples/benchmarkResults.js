// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

// import '@babylonjs/inspector';  // Disabled - causes SSR build issues
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import * as anu from '@jpmorganchase/anu';
/** Our data */
import dataQ3standard from './data/anu-benchmark-standard-q3.csv';
import dataQ3optimized from './data/anu-benchmark-optimized-q3.csv';
import dataAvpStandard from './data/anu-benchmark-standard-avp.csv';
import dataAvpOptimized from './data/anu-benchmark-optimized-avp.csv';
import dataGxrStandard from './data/anu-benchmark-standard-gxr.csv';
import dataGxrOptimized from './data/anu-benchmark-optimized-gxr.csv';
import dataPcStandard from './data/anu-benchmark-standard-pc.csv';
import dataPcOptimized from './data/anu-benchmark-optimized-pc.csv';

export function benchmarkResults(engine) {

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(1, 1, 1);
  //Add some lighting
  const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 0, -5), scene);
  light1.specular = new BABYLON.Color3(0, 0, 0);
  const light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, 0, 5), scene);
  light2.specular = new BABYLON.Color3(0, 0, 0);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 0, -16);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  //Grab DOM element where we will attach our canvas. #app is the id assigned to an empty <div> in our index.html
  const app = document.querySelector('#app');
  //Create a canvas element and append it to #app div
  const canvas = document.createElement('canvas');
  app.appendChild(canvas);


  const series = ['Mesh', 'Clone', 'Instance', 'Thin Instance'];

  /** Create a line chart that shows the FPS with the specified data and name of the device */
  function createLineChartFPS(dataStandard, dataOptimized, name, showLegend = false) {
    //D3 scale functions
    let scaleX = d3.scaleLog().domain([100, 1000000]).range([-2.5, 2.5]);
    let scaleY = d3.scaleLinear().domain([0, 120]).range([-1, 1]);
    let scaleC = d3.scaleOrdinal().domain(['Mesh', 'Clone', 'Instance', 'Thin Instance']).range(['#ca0020', '#0571b0', '#008837', '#7b3294']);

    //Create the CoT for this chart
    let chart = anu.bind('cot')
      .addTags('fps');
    
    //Create dots for the standard values
    let dotsStandard = chart
      .bind('sphere', { diameter: 0.05, segments: 4 }, dataStandard)
      .position((d, n, i) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.FPS), 0))
      .material((d, n, i) => new BABYLON.StandardMaterial())
      .diffuseColor((d, n, i) => BABYLON.Color3.FromHexString(scaleC(d.Method)));

    //Create dots for the optimized values
    let dotsOptimized = chart
      .bind('sphere', { diameter: 0.05, segments: 4 }, dataOptimized)
      .position((d, n, i) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.FPS), 0))
      .material((d, n, i) => new BABYLON.StandardMaterial())
      .diffuseColor((d, n, i) => BABYLON.Color3.FromHexString(scaleC(d.Method)));

    
    //Group the data by their series such that each series has an array of values that correspond to our x and y dimensions
    let pathsStandard = dataStandard.reduce((acc, d) => {
      (acc[d.Method] = acc[d.Method] || []).push({ Cubes: d.Cubes, FPS: d.FPS });
      return acc;
    }, {});
    pathsStandard = Object.keys(pathsStandard).map((methodName) => ({
      Method: methodName,
      values: pathsStandard[methodName],
    }));

    let pathsOptimized = dataOptimized.reduce((acc, d) => {
      (acc[d.Method] = acc[d.Method] || []).push({ Cubes: d.Cubes, FPS: d.FPS });
      return acc;
    }, {});
    pathsOptimized = Object.keys(pathsOptimized).map((methodName) => ({
      Method: methodName,
      values: pathsOptimized[methodName],
    }));


    /** Helper function that will turn an array of consecutive values to a 2D array of consecutive pairs
     * i.e.: [a, b, c, d] => [[a, b], [b, c], [c, d]]
     * This is because greasedLine looks bad when a single contiguous line has sharp angles
     * Transforming the data this way will draw a new greasedLine segment for each pair, thus preventing sharp angles
     */
    function consecutivePairs(arr) {
      const result = [];
      for (let i = 0; i < arr.length - 1; i++) {
        result.push([arr[i], arr[i + 1]]);
      }
      return result;
    }


    //Create greasedlines to render the paths with our helper function
    let linesStandard = chart.bind(
      'greasedLine',
      {
        meshOptions: {
          points: (path) =>
            consecutivePairs(path.values.map((d) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.FPS), 0))),
          ribbonOptions: {
            directions: [BABYLON.Vector3.Up()],
          },
        },
        materialOptions: {
          color: (path) => BABYLON.Color3.FromHexString(scaleC(path.Method)),
          width: 0.025,
        },
      },
      pathsStandard
    );

    let linesOptimized = chart.bind(
      'greasedLine',
      {
        meshOptions: {
          points: (path) =>
            consecutivePairs(path.values.map((d) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.FPS), 0))),
          ribbonOptions: {
            directions: [BABYLON.Vector3.Up()],
          },
        },
        materialOptions: {
          color: (path) => BABYLON.Color3.FromHexString(scaleC(path.Method)),
          width: 0.025,
          useDash: true,
          dashRatio: 0.5,
          dashCount: 3,
        },
      },
      pathsOptimized
    );

    //Use the axes prefab with our two D3 scales with additional customizations
    let axes = anu.createAxes('myAxes', {
      scale: { x: scaleX, y: scaleY },
      parent: chart,
      domain: false,
      gridProperties: { color: BABYLON.Color3.Black() },
      gridTicks: { x: scaleX.ticks(3), y: scaleY.ticks(5) },
      labelTicks: { x: scaleX.ticks(3), y: scaleY.ticks(5) },
      labelFormat: {
        x: (num) => {
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
          } else {
            return num.toString();
          }
        },
      },
      labelOptions: { color: BABYLON.Color3.Gray(), size: 0.15 },
    });


    //Set x and y axes labels
    let xLabel = chart
      .bind('planeText', { text: (d) => d, size: 0.25, color: BABYLON.Color3.Gray() }, ['Number of Meshes'])
      .position(new BABYLON.Vector3(0, -1.4, -0.05));

    let yLabel = chart
      .bind('planeText', { text: (d) => d, size: 0.225, color: BABYLON.Color3.Gray() }, ['Frames Per Second'])
      .position(new BABYLON.Vector3(-3, 0, 0))
      .rotation(new BABYLON.Vector3(0, 0, Math.PI / 2));

    //Set title
    let title = chart
      .bind('planeText', { text: (d) => d, size: 0.4, color: BABYLON.Color3.Gray() }, [name])
      .position(new BABYLON.Vector3(0, 1.3, -0.05));

    if (showLegend) {
      //Create a legend
      let legend = chart.bind('cot');
  
      //Create colored keys
      let keys = legend
        .bind('plane', { size: 0.2 }, series)
        .positionX((d, n, i) => i * 1.05)
        .material(() => new BABYLON.StandardMaterial())
        .diffuseColor((d, n, i) => BABYLON.Color3.FromHexString(scaleC(d)));
  
      //Create labels for each key
      let labels = legend
        .bind('planeText', { text: (d) => d, size: 0.15, color: BABYLON.Color3.Gray(), align: 'left' }, series)
        .positionX((d, n, i) => i * 1.05 + 0.15)
  
      //Align our legend nicely
      legend.position(new BABYLON.Vector3(-2, -1.75, 0));
    }

    return chart;

  }

  /** Create a line chart that shows the FPS with the specified data and name of the device */
  function createLineChartCreateTime(dataStandard, dataOptimized, name, showLegend = false) {
    //D3 scale functions
    let scaleX = d3.scaleLog().domain([100, 1000000]).range([-2.5, 2.5]);
    let scaleY = d3.scaleLinear().domain([0, 6000]).range([-1, 1]);
    let scaleC = d3.scaleOrdinal().domain(['Mesh', 'Clone', 'Instance', 'Thin Instance']).range(['#ca0020', '#0571b0', '#008837', '#7b3294']);

    //Create the CoT for this chart
    let chart = anu.bind('cot')
      .addTags('time');
    
    //Create dots for the standard values
    let dotsStandard = chart
      .bind('sphere', { diameter: 0.05, segments: 4 }, dataStandard)
      .position((d, n, i) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.Create), 0))
      .material((d, n, i) => new BABYLON.StandardMaterial())
      .diffuseColor((d, n, i) => BABYLON.Color3.FromHexString(scaleC(d.Method)));

    //Create dots for the optimized values
    let dotsOptimized = chart
      .bind('sphere', { diameter: 0.05, segments: 4 }, dataOptimized)
      .position((d, n, i) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.Create), 0))
      .material((d, n, i) => new BABYLON.StandardMaterial())
      .diffuseColor((d, n, i) => BABYLON.Color3.FromHexString(scaleC(d.Method)));

    
    //Group the data by their series such that each series has an array of values that correspond to our x and y dimensions
    let pathsStandard = dataStandard.reduce((acc, d) => {
      (acc[d.Method] = acc[d.Method] || []).push({ Cubes: d.Cubes, Create: d.Create });
      return acc;
    }, {});
    pathsStandard = Object.keys(pathsStandard).map((methodName) => ({
      Method: methodName,
      values: pathsStandard[methodName],
    }));

    let pathsOptimized = dataOptimized.reduce((acc, d) => {
      (acc[d.Method] = acc[d.Method] || []).push({ Cubes: d.Cubes, Create: d.Create });
      return acc;
    }, {});
    pathsOptimized = Object.keys(pathsOptimized).map((methodName) => ({
      Method: methodName,
      values: pathsOptimized[methodName],
    }));

    /** Helper function that will turn an array of consecutive values to a 2D array of consecutive pairs
     * i.e.: [a, b, c, d] => [[a, b], [b, c], [c, d]]
     * This is because greasedLine looks bad when a single contiguous line has sharp angles
     * Transforming the data this way will draw a new greasedLine segment for each pair, thus preventing sharp angles
     */
    function consecutivePairs(arr) {
      const result = [];
      for (let i = 0; i < arr.length - 1; i++) {
        result.push([arr[i], arr[i + 1]]);
      }
      return result;
    }


    //Create greasedlines to render the paths with our helper function
    let linesStandard = chart.bind(
      'greasedLine',
      {
        meshOptions: {
          points: (path) =>
            consecutivePairs(path.values.map((d) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.Create), 0))),
          ribbonOptions: {
            directions: [BABYLON.Vector3.Up()],
          },
        },
        materialOptions: {
          color: (path) => BABYLON.Color3.FromHexString(scaleC(path.Method)),
          width: 0.025,
        },
      },
      pathsStandard
    );

    let linesOptimized = chart.bind(
      'greasedLine',
      {
        meshOptions: {
          points: (path) =>
            consecutivePairs(path.values.map((d) => new BABYLON.Vector3(scaleX(d.Cubes), scaleY(d.Create), 0))),
          ribbonOptions: {
            directions: [BABYLON.Vector3.Up()],
          },
        },
        materialOptions: {
          color: (path) => BABYLON.Color3.FromHexString(scaleC(path.Method)),
          width: 0.025,
          useDash: true,
          dashRatio: 0.5,
          dashCount: 3,
        },
      },
      pathsOptimized
    );


    //Use the axes prefab with our two D3 scales with additional customizations
    let axes = anu.createAxes('myAxes', {
      scale: { x: scaleX, y: scaleY },
      parent: chart,
      domain: false,
      gridProperties: { color: BABYLON.Color3.Black() },
      gridTicks: { x: scaleX.ticks(3), y: scaleY.ticks(5) },
      labelTicks: { x: scaleX.ticks(3), y: scaleY.ticks(5) },
      labelFormat: {
        x: (num) => {
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
          } else {
            return num.toString();
          }
        },
      },
      labelOptions: { color: BABYLON.Color3.Gray(), size: 0.15 },
    });


    //Set x and y axes labels
    let xLabel = chart
      .bind('planeText', { text: (d) => d, size: 0.25, color: BABYLON.Color3.Gray() }, ['Number of Meshes'])
      .position(new BABYLON.Vector3(0, -1.4, -0.05));

    let yLabel = chart
      .bind('planeText', { text: (d) => d, size: 0.225, color: BABYLON.Color3.Gray() }, ['Create (ms)'])
      .position(new BABYLON.Vector3(-3.1, 0, 0))
      .rotation(new BABYLON.Vector3(0, 0, Math.PI / 2));

    //Set title
    let title = chart
      .bind('planeText', { text: (d) => d, size: 0.4, color: BABYLON.Color3.Gray() }, [name])
      .position(new BABYLON.Vector3(0, 1.3, -0.05));

    if (showLegend) {
      //Create a legend
      let legend = chart.bind('cot');
  
      //Create colored keys
      let keys = legend
        .bind('plane', { size: 0.2 }, series)
        .positionX((d, n, i) => i * 1.05)
        .material(() => new BABYLON.StandardMaterial())
        .diffuseColor((d, n, i) => BABYLON.Color3.FromHexString(scaleC(d)));
  
      //Create labels for each key
      let labels = legend
        .bind('planeText', { text: (d) => d, size: 0.15, color: BABYLON.Color3.Gray(), align: 'left' }, series)
        .positionX((d, n, i) => i * 1.05 + 0.15)
  
      //Align our legend nicely
      legend.position(new BABYLON.Vector3(-2, -1.75, 0));
    }

    return chart;
  }

  //Create the line charts for fps
  createLineChartFPS(dataPcStandard, dataPcOptimized, 'PC', true);
  createLineChartFPS(dataGxrStandard, dataGxrOptimized, 'Galaxy XR', false);
  createLineChartFPS(dataAvpStandard, dataAvpOptimized, 'Apple Vision Pro', false);
  createLineChartFPS(dataQ3standard, dataQ3optimized, 'Meta Quest 3', false);

  //Layout the charts using the layout prefab, though this is not strictly necessary as our layout is pretty simple
  let fpsCharts = anu.selectTag('fps', scene)
  let fpsLayout = anu.planeLayout('fpsLayout', { selection: fpsCharts, columns: 1, rows: 4, margin: new BABYLON.Vector2(0, 2.25) }, scene);
  fpsLayout.update();
  fpsLayout.root.position.x = -3.25;
  fpsLayout.root.position.y = -4.75;

  //Do the same for the create time charts
  createLineChartCreateTime(dataPcStandard, dataPcOptimized, 'PC', true);
  createLineChartCreateTime(dataGxrStandard, dataGxrOptimized, 'Galaxy XR', false);
  createLineChartCreateTime(dataAvpStandard, dataAvpOptimized, 'Apple Vision Pro', false);
  createLineChartCreateTime(dataQ3standard, dataQ3optimized, 'Meta Quest 3', false);

  let timeCharts = anu.selectTag('time', scene);
  let timeLayout = anu.planeLayout('timeLayout', { selection: timeCharts, columns: 1, rows: 4, margin: new BABYLON.Vector2(0, 2.25) }, scene);
  timeLayout.update()
  timeLayout.root.position.x = 3.25;
  timeLayout.root.position.y = -4.75;


  scene.metadata = {
    noDefaultEnvironment: true
  };

  return scene;
}
