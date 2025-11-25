// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Scene, MeshBuilder, StandardMaterial, Color3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, TextBlock, StackPanel, Control, ScrollViewer } from '@babylonjs/gui';
import * as anu from '@jpmorganchase/anu'

//create and export a function that takes a babylon engine and returns a scene
export const benchmark = function(babylonEngine){

  //create a scene object using our engine
  const scene = new Scene(babylonEngine)

  // Mark this scene to not use default environment and set custom XR camera position
  scene.metadata = { 
    noDefaultEnvironment: true,
    xrCameraPosition: new Vector3(0, 60, 110),
    xrDisableControllers: true
  };

  //Add lights and a camera
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
  const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 3, 150, new Vector3(0, 0, 0), scene);
  camera.lowerRadiusLimit = 80;
  camera.upperRadiusLimit = 300;
  camera.attachControl(true)

  // Benchmark state
  let currentSelection = null;
  let benchmarkData = null;
  let stopRequested = false;

  // Benchmark configurations
  const INITIAL_CUBE_COUNT = 1000; // Starting cube count
  const MAX_CUBE_COUNT = 10000000; // Maximum cube count (10 million)
  const EXPONENTIAL_BASE = 1.25; // Base for exponential growth: y = base^x
  const FPS_SAMPLE_FRAMES = 60; // Number of frames to measure FPS
  const FPS_THRESHOLD = 30; // Stop when FPS drops below this for 2 consecutive tests
  const BENCHMARK_METHODS = ['bind', 'bindClone', 'bindInstance', 'bindThinInstance'];

  // Results storage
  const benchmarkResults = {};

  // GUI Elements
  let statusText, currentStatsText, resultsText, guiPlane;

  // Create GUI on a plane
  function createGUI() {
    // Create a plane for the GUI
    const plane = MeshBuilder.CreatePlane("guiPlane", { width: 10, height: 12 }, scene);
    plane.position = new Vector3(0, 60, 100); // Position in front of camera
    plane.rotation.y = Math.PI; // Face directly at camera from starting position
    guiPlane = plane;
    
    // Create material
    const mat = new StandardMaterial("guiMat", scene);
    mat.emissiveColor = new Color3(0.1, 0.1, 0.1);
    plane.material = mat;
    
    // Create advanced texture
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane, 1024, 1280);
    
    // Main container
    const mainPanel = new StackPanel();
    mainPanel.width = "95%";
    mainPanel.height = "95%";
    mainPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    mainPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(mainPanel);
    
    // Title
    const title = new TextBlock();
    title.text = "Anu Cube Benchmark";
    title.color = "white";
    title.fontSize = 48;
    title.height = "80px";
    title.paddingBottom = "20px";
    mainPanel.addControl(title);
    
    // Buttons container
    const buttonsPanel = new StackPanel();
    buttonsPanel.isVertical = false;
    buttonsPanel.height = "80px";
    buttonsPanel.paddingBottom = "20px";
    mainPanel.addControl(buttonsPanel);
    
    // Start button
    const startButton = Button.CreateSimpleButton("startBtn", "Start Benchmark");
    startButton.width = "400px";
    startButton.height = "60px";
    startButton.color = "white";
    startButton.background = "green";
    startButton.thickness = 2;
    startButton.cornerRadius = 10;
    startButton.paddingRight = "10px";
    startButton.onPointerClickObservable.add(() => {
      runBenchmarks();
    });
    buttonsPanel.addControl(startButton);
    
    // Stop button
    const stopButton = Button.CreateSimpleButton("stopBtn", "Stop");
    stopButton.width = "200px";
    stopButton.height = "60px";
    stopButton.color = "white";
    stopButton.background = "orange";
    stopButton.thickness = 2;
    stopButton.cornerRadius = 10;
    stopButton.paddingLeft = "10px";
    stopButton.isEnabled = false;
    stopButton.onPointerClickObservable.add(() => {
      stopRequested = true;
      updateStatus('Stopping benchmark...');
      stopButton.isEnabled = false;
    });
    buttonsPanel.addControl(stopButton);
    
    // Clear button
    const clearButton = Button.CreateSimpleButton("clearBtn", "Clear Scene");
    clearButton.width = "300px";
    clearButton.height = "60px";
    clearButton.color = "white";
    clearButton.background = "red";
    clearButton.thickness = 2;
    clearButton.cornerRadius = 10;
    clearButton.paddingLeft = "10px";
    clearButton.onPointerClickObservable.add(() => {
      clearScene();
    });
    buttonsPanel.addControl(clearButton);
    
    // Download CSV button
    const downloadButton = Button.CreateSimpleButton("downloadBtn", "Download CSV");
    downloadButton.width = "250px";
    downloadButton.height = "60px";
    downloadButton.color = "white";
    downloadButton.background = "#2196F3";
    downloadButton.thickness = 2;
    downloadButton.cornerRadius = 10;
    downloadButton.paddingLeft = "10px";
    downloadButton.onPointerClickObservable.add(() => {
      downloadCSV();
    });
    buttonsPanel.addControl(downloadButton);
    
    // Status text
    statusText = new TextBlock();
    statusText.text = "Status: Ready to benchmark";
    statusText.color = "yellow";
    statusText.fontSize = 32;
    statusText.height = "60px";
    statusText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    statusText.paddingLeft = "20px";
    statusText.paddingBottom = "10px";
    mainPanel.addControl(statusText);
    
    // Current stats text
    currentStatsText = new TextBlock();
    currentStatsText.text = "No test running";
    currentStatsText.color = "cyan";
    currentStatsText.fontSize = 28;
    currentStatsText.height = "50px";
    currentStatsText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    currentStatsText.paddingLeft = "20px";
    currentStatsText.paddingBottom = "20px";
    mainPanel.addControl(currentStatsText);
    
    // Results container with scroll viewer
    const scrollViewer = new ScrollViewer();
    scrollViewer.width = "100%";
    scrollViewer.height = "900px";
    scrollViewer.thickness = 2;
    scrollViewer.color = "white";
    scrollViewer.background = "rgba(0,0,0,0.5)";
    scrollViewer.barColor = "white";
    scrollViewer.barBackground = "gray";
    mainPanel.addControl(scrollViewer);
    
    // Results text inside scroll viewer
    resultsText = new TextBlock();
    resultsText.text = "Results will appear here...";
    resultsText.color = "white";
    resultsText.fontSize = 24;
    resultsText.textWrapping = true;
    resultsText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    resultsText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    resultsText.paddingTop = "20px";
    resultsText.paddingLeft = "20px";
    resultsText.paddingRight = "20px";
    resultsText.paddingBottom = "20px";
    resultsText.resizeToFit = true;
    scrollViewer.addControl(resultsText);
    
    return { startButton, stopButton, clearButton };
  }

  // Create UI
  const guiButtons = createGUI();

  // Clear the scene
  function clearScene() {
    if (currentSelection) {
      currentSelection.dispose();
      currentSelection = null;
    }
    benchmarkData = null;
    updateStatus('Scene cleared');
    updateCurrentStats('', 0);
  }

  // Update status message
  function updateStatus(message) {
    if (statusText) {
      statusText.text = `Status: ${message}`;
    }
  }

  // Update current stats
  function updateCurrentStats(method, count) {
    if (currentStatsText) {
      const fps = babylonEngine.getFps().toFixed(0);
      currentStatsText.text = `Current: ${method} - ${count} cubes - ${fps} FPS`;
    }
  }

  // Create data for cubes at random positions
  function createCubeData(count) {
    const data = [];
    const range = 30; // Range for random positions (reduced to keep within view)
    
    for (let i = 0; i < count; i++) {
      const randomVec = Vector3.Random(-range, range);
      data.push({ 
        index: i, 
        x: randomVec.x, 
        y: randomVec.y, 
        z: randomVec.z 
      });
    }
    
    return data;
  }

  // Create cubes using different methods
  function createCubes(method, data) {
    // Clear previous selection but don't call clearScene to avoid clearing benchmarkData
    if (currentSelection) {
      currentSelection.dispose();
      currentSelection = null;
    }

    let selection;
    
    switch(method) {
      case 'bind':
        // Creates separate mesh for each cube
        selection = anu.bind('box', { size: 0.5 }, data);
        selection.position(d => new Vector3(d.x, d.y, d.z));
        break;
        
      case 'bindClone':
        // Creates one mesh and clones it
        const cloneMesh = anu.create('box', 'box', { size: 0.5 });
        selection = anu.bindClone(cloneMesh, data);
        selection.position(d => new Vector3(d.x, d.y, d.z));
        break;
        
      case 'bindInstance':
        // Creates instances (GPU optimized, same material)
        const instanceMesh = anu.create('box', 'box', { size: 0.5 });
        selection = anu.bindInstance(instanceMesh, data);
        selection.position(d => new Vector3(d.x, d.y, d.z));
        break;
        
      case 'bindThinInstance':
        // Creates thin instances (most optimized, single draw call)
        const thinInstanceMesh = anu.create('box', 'box', { size: 0.5 });
        selection = anu.bindThinInstance(thinInstanceMesh, data);
        selection.thinInstancePosition(d => new Vector3(d.x, d.y, d.z));
        break;
    }
    
    currentSelection = selection;
    return selection;
  }

  // Measure FPS for current scene
  function measureFPS() {
    return new Promise((resolve) => {
      let frameCount = 0;
      const fpsReadings = [];
      
      const measureFrame = () => {
        // Render the scene
        scene.render();
        
        // Collect FPS data
        const fps = babylonEngine.getFps();
        fpsReadings.push(fps);
        
        frameCount++;
        
        // Update current stats display every few frames
        if (frameCount % 5 === 0 && currentStatsText) {
          const currentFps = babylonEngine.getFps().toFixed(0);
          // Extract method and count from status text as a workaround
          const statusMatch = statusText?.text.match(/Testing (\w+) with (\d+) cubes/);
          if (statusMatch) {
            currentStatsText.text = `Current: ${statusMatch[1]} - ${statusMatch[2]} cubes - ${currentFps} FPS`;
          }
        }
        
        if (frameCount < FPS_SAMPLE_FRAMES) {
          requestAnimationFrame(measureFrame);
        } else {
          // Calculate average FPS
          const avgFPS = fpsReadings.reduce((a, b) => a + b, 0) / fpsReadings.length;
          resolve({ fps: avgFPS });
        }
      };
      
      // Wait a bit for scene to stabilize
      setTimeout(() => {
        requestAnimationFrame(measureFrame);
      }, 500);
    });
  }

  // Run single benchmark test
  async function runSingleTest(method, count) {
    updateStatus(`Testing ${method} with ${count} cubes...`);
    
    // Clear any previous scene first
    if (currentSelection) {
      currentSelection.dispose();
      currentSelection = null;
    }
    
    // Wait a moment to ensure cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Create data outside of timing
    benchmarkData = createCubeData(count);
    
    // Measure cube creation time
    const startTime = performance.now();
    createCubes(method, benchmarkData);
    const creationTime = performance.now() - startTime;
    
    // Measure FPS
    const fpsData = await measureFPS();
    
    return {
      method,
      count,
      creationTime: creationTime.toFixed(2),
      avgFPS: fpsData.fps.toFixed(2)
    };
  }


  // Run all benchmarks
  async function runBenchmarks() {
    stopRequested = false;
    updateStatus('Starting benchmarks...');
    if (guiButtons.startButton) guiButtons.startButton.isEnabled = false;
    if (guiButtons.stopButton) guiButtons.stopButton.isEnabled = true;
    
    for (const method of BENCHMARK_METHODS) {
      if (stopRequested) break;
      
      benchmarkResults[method] = [];
      
      let testIteration = 0; // Start at 0 for exponential growth
      let consecutiveLowFps = 0;
      let continueTest = true;
      
      while (continueTest && !stopRequested) {
        // Exponential growth: cubeCount = INITIAL_CUBE_COUNT * (base^iteration)
        // This will grow: 1000, 1500, 2250, 3375, 5062, 7593, 11390, ...
        const cubeCount = Math.round(INITIAL_CUBE_COUNT * Math.pow(EXPONENTIAL_BASE, testIteration));
        
        // Stop if we've exceeded the maximum cube count
        if (cubeCount > MAX_CUBE_COUNT) {
          updateStatus(`${method} stopped: Exceeded maximum cube count (${MAX_CUBE_COUNT})`);
          continueTest = false;
          break;
        }
        
        updateCurrentStats(method, cubeCount);
        
        const result = await runSingleTest(method, cubeCount);
        benchmarkResults[method].push(result);
        
        // Update results display
        displayResults();
        
        // Check if FPS is below threshold
        if (parseFloat(result.avgFPS) < FPS_THRESHOLD) {
          consecutiveLowFps++;
          if (consecutiveLowFps >= 2) {
            updateStatus(`${method} stopped: FPS below ${FPS_THRESHOLD} for 2 consecutive tests`);
            continueTest = false;
          }
        } else {
          consecutiveLowFps = 0;
        }
        
        // Clear data and scene between tests
        benchmarkData = null;
        if (currentSelection) {
          currentSelection.dispose();
          currentSelection = null;
        }
        
        if (continueTest) {
          // Wait for FPS to stabilize before next test
          updateStatus('Waiting for FPS to stabilize...');
          await waitForFPSStabilization();
          
          // Additional delay between tests to ensure cleanup
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Check if stop was requested during stabilization
          if (stopRequested) {
            continueTest = false;
          } else {
            // Increment iteration for next test
            testIteration++;
          }
        }
      }
    }
    
    if (stopRequested) {
      updateStatus('Benchmark stopped by user');
    } else {
      updateStatus('Benchmarks complete!');
    }
    if (guiButtons.startButton) guiButtons.startButton.isEnabled = true;
    if (guiButtons.stopButton) guiButtons.stopButton.isEnabled = false;
    clearScene();
  }

  // Wait for FPS to stabilize after clearing scene
  async function waitForFPSStabilization() {
    return new Promise((resolve) => {
      const targetStableFrames = 30; // Number of frames to check for stability
      const fpsThreshold = 2; // FPS variance threshold
      let stableFrames = 0;
      let lastFPS = 0;
      
      const checkStability = () => {
        // Render a frame to get accurate FPS
        scene.render();
        
        const currentFPS = babylonEngine.getFps();
        
        // Check if FPS is stable (within threshold of last reading)
        if (Math.abs(currentFPS - lastFPS) < fpsThreshold) {
          stableFrames++;
        } else {
          stableFrames = 0; // Reset if FPS varies too much
        }
        
        lastFPS = currentFPS;
        
        if (stableFrames >= targetStableFrames) {
          resolve();
        } else {
          requestAnimationFrame(checkStability);
        }
      };
      
      // Start checking after a short delay
      setTimeout(() => {
        requestAnimationFrame(checkStability);
      }, 200);
    });
  }

  // Display benchmark results
  function displayResults() {
    if (!resultsText) return;
    
    let text = 'BENCHMARK RESULTS\n\n';
    
    for (const method of BENCHMARK_METHODS) {
      if (!benchmarkResults[method] || benchmarkResults[method].length === 0) continue;
      
      text += `\n${method.toUpperCase()}\n`;
      text += '─'.repeat(45) + '\n';
      text += 'Cubes     Create(ms)  FPS\n';
      text += '─'.repeat(45) + '\n';
      
      for (const result of benchmarkResults[method]) {
        const cubeStr = String(result.count).padEnd(10);
        const timeStr = String(result.creationTime).padEnd(12);
        const fpsStr = String(result.avgFPS);
        text += `${cubeStr}${timeStr}${fpsStr}\n`;
      }
      text += '\n';
    }
    
    text += '\nPress G to toggle GUI visibility\n';
    
    resultsText.text = text;
  }

  // Download results as CSV
  function downloadCSV() {
    if (!resultsText || !resultsText.text) {
      alert('No benchmark results to download');
      return;
    }
    
    // Parse the results text to extract data
    const lines = resultsText.text.split('\n');
    let csvContent = 'Method,Cubes,Create(ms),FPS\n';
    let currentMethod = '';
    
    // Parse each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if this is a method header (BIND, BINDCLONE, etc.)
      if (line && BENCHMARK_METHODS.some(m => line === m.toUpperCase())) {
        currentMethod = line;
        continue;
      }
      
      // Skip separator lines, headers, and notes
      if (line.startsWith('─') || line.startsWith('Cubes') || 
          line.startsWith('Press G') ||
          line === 'BENCHMARK RESULTS' || line === '') {
        continue;
      }
      
      // Parse data lines - split by whitespace
      const parts = line.split(/\s+/).filter(p => p);
      
      if (parts.length >= 3 && currentMethod) {
        // Extract values
        const cubes = parts[0];
        const createTime = parts[1];
        const fps = parts[2];
        csvContent += `${currentMethod},${cubes},${createTime},${fps}\n`;
      }
    }
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    link.setAttribute('href', url);
    link.setAttribute('download', `anu-benchmark-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    updateStatus('CSV downloaded successfully');
  }

  // Initialize
  updateStatus('Ready to benchmark');

  // Keyboard shortcuts
  window.addEventListener("keydown", (ev) => {
    // G key - Toggle GUI
    if (ev.key === 'g' || ev.key === 'G') {
      if (guiPlane) {
        guiPlane.setEnabled(!guiPlane.isEnabled());
      }
    }
  });

  return scene;
};
