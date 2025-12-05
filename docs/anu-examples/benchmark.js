// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { HemisphericLight, ArcRotateCamera, Vector3, Scene, MeshBuilder, StandardMaterial, Color3, PointerEventTypes, AbstractMesh, ScenePerformancePriority } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, TextBlock, StackPanel, Control, ScrollViewer } from '@babylonjs/gui';
import * as anu from '@jpmorganchase/anu'

//create and export a function that takes a babylon engine and returns a scene
export const benchmark = function(babylonEngine){

  //create a scene object using our engine
  const scene = new Scene(babylonEngine)

  scene.clearColor = null;

  // Mark this scene to not use default environment and set custom XR camera position
  scene.metadata = { 
    noDefaultEnvironment: true,
    xrCameraPosition: new Vector3(0, 60, 110),
    xrDisableControllers: true,
    xrEnableMultiview: false // Will be toggled via GUI
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
  let optimizedMode = false; // Track if optimizations are enabled
  let multiviewEnabled = false; // Track if WebXR multiview is enabled

  // Benchmark configurations
  const INITIAL_CUBE_COUNT = 100; // Starting cube count
  const MAX_CUBE_COUNT = 10000000; // Maximum cube count (10 million)
  const EXPONENTIAL_BASE = 1.33; // Base for exponential growth: y = base^x
  const FPS_SAMPLE_DURATION = 5000; // Duration to measure FPS in milliseconds (5 seconds)
  const FPS_THRESHOLD = 30; // Stop when FPS drops below this for 2 consecutive tests
  const BENCHMARK_METHODS = ['bind', 'bindClone', 'bindInstance', 'bindThinInstance'];

  // Track which methods are enabled
  const enabledMethods = {
    bind: true,
    bindClone: true,
    bindInstance: true,
    bindThinInstance: true
  };

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
    
    // Mode toggle
    const modePanel = new StackPanel();
    modePanel.isVertical = false;
    modePanel.height = "60px";
    modePanel.paddingBottom = "10px";
    mainPanel.addControl(modePanel);
    
    const modeLabel = new TextBlock();
    modeLabel.text = "Mode: Standard";
    modeLabel.color = "white";
    modeLabel.fontSize = 32;
    modeLabel.width = "300px";
    modeLabel.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    modeLabel.paddingLeft = "20px";
    modePanel.addControl(modeLabel);
    
    const toggleModeButton = Button.CreateSimpleButton("toggleMode", "Toggle Optimized");
    toggleModeButton.width = "300px";
    toggleModeButton.height = "50px";
    toggleModeButton.color = "white";
    toggleModeButton.background = "#6A1B9A";
    toggleModeButton.thickness = 2;
    toggleModeButton.cornerRadius = 10;
    toggleModeButton.paddingLeft = "20px";
    toggleModeButton.onPointerClickObservable.add(() => {
      optimizedMode = !optimizedMode;
      modeLabel.text = `Mode: ${optimizedMode ? 'Optimized' : 'Standard'}`;
      modeLabel.color = optimizedMode ? "lime" : "white";
      // Set scene performance priority based on mode
      if (optimizedMode) {
        scene.performancePriority = ScenePerformancePriority.Aggressive;
      } else {
        resetOptimizations();
      }
      updateStatus(`Switched to ${optimizedMode ? 'Optimized' : 'Standard'} mode`);
    });
    modePanel.addControl(toggleModeButton);
    
    // Multiview toggle - HIDDEN FOR NOW
    /*
    const multiviewPanel = new StackPanel();
    multiviewPanel.isVertical = false;
    multiviewPanel.height = "60px";
    multiviewPanel.paddingBottom = "10px";
    mainPanel.addControl(multiviewPanel);
    
    const multiviewLabel = new TextBlock();
    multiviewLabel.text = "Multiview: Off";
    multiviewLabel.color = "white";
    multiviewLabel.fontSize = 32;
    multiviewLabel.width = "300px";
    multiviewLabel.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    multiviewLabel.paddingLeft = "20px";
    multiviewPanel.addControl(multiviewLabel);
    
    const toggleMultiviewButton = Button.CreateSimpleButton("toggleMultiview", "Toggle Multiview");
    toggleMultiviewButton.width = "300px";
    toggleMultiviewButton.height = "50px";
    toggleMultiviewButton.color = "white";
    toggleMultiviewButton.background = "#FF6F00";
    toggleMultiviewButton.thickness = 2;
    toggleMultiviewButton.cornerRadius = 10;
    toggleMultiviewButton.paddingLeft = "20px";
    toggleMultiviewButton.onPointerClickObservable.add(() => {
      multiviewEnabled = !multiviewEnabled;
      multiviewLabel.text = `Multiview: ${multiviewEnabled ? 'On' : 'Off'}`;
      multiviewLabel.color = multiviewEnabled ? "lime" : "white";
      // Update scene metadata for multiview (will be applied via LAYERS feature on next XR session)
      if (scene.metadata) {
        scene.metadata.xrEnableMultiview = multiviewEnabled;
      }
      updateStatus(`WebXR Multiview ${multiviewEnabled ? 'enabled' : 'disabled'} (enter/restart XR to apply)`);
    });
    multiviewPanel.addControl(toggleMultiviewButton);
    */
    
    // Method selection section
    const methodSectionTitle = new TextBlock();
    methodSectionTitle.text = "Select Methods to Benchmark:";
    methodSectionTitle.color = "white";
    methodSectionTitle.fontSize = 28;
    methodSectionTitle.height = "50px";
    methodSectionTitle.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    methodSectionTitle.paddingLeft = "20px";
    methodSectionTitle.paddingTop = "10px";
    methodSectionTitle.paddingBottom = "5px";
    mainPanel.addControl(methodSectionTitle);
    
    // Create toggles for each method in a 2x2 grid
    const methodsGrid = new StackPanel();
    methodsGrid.isVertical = true;
    methodsGrid.height = "130px";
    methodsGrid.paddingBottom = "10px";
    mainPanel.addControl(methodsGrid);
    
    // Row 1: bind and bindClone
    const methodRow1 = new StackPanel();
    methodRow1.isVertical = false;
    methodRow1.height = "60px";
    methodRow1.paddingBottom = "5px";
    methodsGrid.addControl(methodRow1);
    
    // bind toggle
    const bindButton = Button.CreateSimpleButton("bindBtn", "✓ bind");
    bindButton.width = "300px";
    bindButton.height = "50px";
    bindButton.color = "white";
    bindButton.background = "green";
    bindButton.thickness = 2;
    bindButton.cornerRadius = 10;
    bindButton.paddingLeft = "10px";
    bindButton.paddingRight = "5px";
    bindButton.onPointerClickObservable.add(() => {
      enabledMethods.bind = !enabledMethods.bind;
      bindButton.textBlock.text = enabledMethods.bind ? "✓ bind" : "✗ bind";
      bindButton.background = enabledMethods.bind ? "green" : "#555";
    });
    methodRow1.addControl(bindButton);
    
    // bindClone toggle
    const bindCloneButton = Button.CreateSimpleButton("bindCloneBtn", "✓ bindClone");
    bindCloneButton.width = "300px";
    bindCloneButton.height = "50px";
    bindCloneButton.color = "white";
    bindCloneButton.background = "green";
    bindCloneButton.thickness = 2;
    bindCloneButton.cornerRadius = 10;
    bindCloneButton.paddingLeft = "5px";
    bindCloneButton.onPointerClickObservable.add(() => {
      enabledMethods.bindClone = !enabledMethods.bindClone;
      bindCloneButton.textBlock.text = enabledMethods.bindClone ? "✓ bindClone" : "✗ bindClone";
      bindCloneButton.background = enabledMethods.bindClone ? "green" : "#555";
    });
    methodRow1.addControl(bindCloneButton);
    
    // Row 2: bindInstance and bindThinInstance
    const methodRow2 = new StackPanel();
    methodRow2.isVertical = false;
    methodRow2.height = "60px";
    methodRow2.paddingBottom = "5px";
    methodsGrid.addControl(methodRow2);
    
    // bindInstance toggle
    const bindInstanceButton = Button.CreateSimpleButton("bindInstanceBtn", "✓ bindInstance");
    bindInstanceButton.width = "300px";
    bindInstanceButton.height = "50px";
    bindInstanceButton.color = "white";
    bindInstanceButton.background = "green";
    bindInstanceButton.thickness = 2;
    bindInstanceButton.cornerRadius = 10;
    bindInstanceButton.paddingLeft = "10px";
    bindInstanceButton.paddingRight = "5px";
    bindInstanceButton.onPointerClickObservable.add(() => {
      enabledMethods.bindInstance = !enabledMethods.bindInstance;
      bindInstanceButton.textBlock.text = enabledMethods.bindInstance ? "✓ bindInstance" : "✗ bindInstance";
      bindInstanceButton.background = enabledMethods.bindInstance ? "green" : "#555";
    });
    methodRow2.addControl(bindInstanceButton);
    
    // bindThinInstance toggle
    const bindThinInstanceButton = Button.CreateSimpleButton("bindThinInstanceBtn", "✓ bindThinInstance");
    bindThinInstanceButton.width = "300px";
    bindThinInstanceButton.height = "50px";
    bindThinInstanceButton.color = "white";
    bindThinInstanceButton.background = "green";
    bindThinInstanceButton.thickness = 2;
    bindThinInstanceButton.cornerRadius = 10;
    bindThinInstanceButton.paddingLeft = "5px";
    bindThinInstanceButton.onPointerClickObservable.add(() => {
      enabledMethods.bindThinInstance = !enabledMethods.bindThinInstance;
      bindThinInstanceButton.textBlock.text = enabledMethods.bindThinInstance ? "✓ bindThinInstance" : "✗ bindThinInstance";
      bindThinInstanceButton.background = enabledMethods.bindThinInstance ? "green" : "#555";
    });
    methodRow2.addControl(bindThinInstanceButton);
    
    // Buttons container
    const buttonsPanel = new StackPanel();
    buttonsPanel.isVertical = false;
    buttonsPanel.height = "80px";
    buttonsPanel.paddingBottom = "20px";
    mainPanel.addControl(buttonsPanel);
    
    // Start button
    const startButton = Button.CreateSimpleButton("startBtn", "Start");
    startButton.width = "180px";
    startButton.height = "60px";
    startButton.color = "white";
    startButton.background = "green";
    startButton.thickness = 2;
    startButton.cornerRadius = 10;
    startButton.paddingRight = "5px";
    startButton.onPointerClickObservable.add(() => {
      runBenchmarks(false);
    });
    buttonsPanel.addControl(startButton);
    
    // Start with Hidden GUI button
    const startHiddenButton = Button.CreateSimpleButton("startHiddenBtn", "Start Hidden");
    startHiddenButton.width = "180px";
    startHiddenButton.height = "60px";
    startHiddenButton.color = "white";
    startHiddenButton.background = "#2E7D32";
    startHiddenButton.thickness = 2;
    startHiddenButton.cornerRadius = 10;
    startHiddenButton.paddingLeft = "5px";
    startHiddenButton.paddingRight = "5px";
    startHiddenButton.onPointerClickObservable.add(() => {
      runBenchmarks(true);
    });
    buttonsPanel.addControl(startHiddenButton);
    
    // Stop button
    const stopButton = Button.CreateSimpleButton("stopBtn", "Stop");
    stopButton.width = "140px";
    stopButton.height = "60px";
    stopButton.color = "white";
    stopButton.background = "orange";
    stopButton.thickness = 2;
    stopButton.cornerRadius = 10;
    stopButton.paddingLeft = "5px";
    stopButton.paddingRight = "5px";
    stopButton.isEnabled = false;
    stopButton.onPointerClickObservable.add(() => {
      stopRequested = true;
      updateStatus('Stopping benchmark...');
      stopButton.isEnabled = false;
    });
    buttonsPanel.addControl(stopButton);
    
    // Clear button
    const clearButton = Button.CreateSimpleButton("clearBtn", "Clear");
    clearButton.width = "140px";
    clearButton.height = "60px";
    clearButton.color = "white";
    clearButton.background = "red";
    clearButton.thickness = 2;
    clearButton.cornerRadius = 10;
    clearButton.paddingLeft = "5px";
    clearButton.paddingRight = "5px";
    clearButton.onPointerClickObservable.add(() => {
      clearScene();
    });
    buttonsPanel.addControl(clearButton);
    
    // Download CSV button
    const downloadButton = Button.CreateSimpleButton("downloadBtn", "CSV");
    downloadButton.width = "140px";
    downloadButton.height = "60px";
    downloadButton.color = "white";
    downloadButton.background = "#2196F3";
    downloadButton.thickness = 2;
    downloadButton.cornerRadius = 10;
    downloadButton.paddingLeft = "5px";
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
    currentStatsText.paddingBottom = "10px";
    mainPanel.addControl(currentStatsText);
    
    // XR framerate display - HIDDEN FOR NOW
    /*
    const xrFrameRateText = new TextBlock();
    xrFrameRateText.text = "XR Frame Rate: N/A";
    xrFrameRateText.color = "orange";
    xrFrameRateText.fontSize = 28;
    xrFrameRateText.height = "50px";
    xrFrameRateText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    xrFrameRateText.paddingLeft = "20px";
    xrFrameRateText.paddingBottom = "20px";
    mainPanel.addControl(xrFrameRateText);
    
    // Monitor XR framerate changes
    scene.onBeforeRenderObservable.add(() => {
      if (scene.metadata?.xrFrameRate && xrFrameRateText) {
        xrFrameRateText.text = `XR Frame Rate: ${scene.metadata.xrFrameRate} Hz`;
      }
    });
    */
    
    // Results container with scroll viewer
    const scrollViewer = new ScrollViewer();
    scrollViewer.width = "100%";
    scrollViewer.height = "700px";
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
    
    return { startButton, startHiddenButton, stopButton, clearButton };
  }

  // Create UI
  const guiButtons = createGUI();

  // Clear the scene
  function clearScene() {
    if (currentSelection) {
      scene.blockfreeActiveMeshesAndRenderingGroups = true;
      currentSelection.dispose();
      currentSelection = null;
      scene.blockfreeActiveMeshesAndRenderingGroups = false;
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
      scene.blockfreeActiveMeshesAndRenderingGroups = true;
      currentSelection.dispose();
      currentSelection = null;
      scene.blockfreeActiveMeshesAndRenderingGroups = false;
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



  // Reset scene optimizations
  function resetOptimizations() {
    try {
      scene.performancePriority = ScenePerformancePriority.BackwardCompatible;
      scene.unfreezeActiveMeshes();
    } catch (error) {
      console.warn('Error resetting optimizations:', error);
    }
  }

  // Unfreeze active meshes between tests (but keep other optimizations)
  function unfreezeForNextTest() {
    try {
      scene.unfreezeActiveMeshes();
    } catch (error) {
      console.warn('Error unfreezing meshes:', error);
    }
  }

  // Refreeze active meshes for testing (if in optimized mode)
  async function refreezeForTest() {
    if (optimizedMode) {
      try {
        // Yield to event loop before freezing to keep page responsive
        await new Promise(resolve => setTimeout(resolve, 100));
        scene.freezeActiveMeshes();
        // Yield again after freezing
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.warn('Error refreezing meshes:', error);
      }
    }
  }

  // Measure FPS for current scene
  function measureFPS() {
    return new Promise((resolve) => {
      let frameCount = 0;
      const fpsReadings = [];
      let observer = null;
      let startTime = null;
      
      const measureFrame = () => {
        // Initialize start time on first frame
        if (startTime === null) {
          startTime = performance.now();
        }
        
        // Collect FPS data
        const fps = babylonEngine.getFps();
        fpsReadings.push(fps);
        
        frameCount++;
        
        // Update current stats display every few frames
        if (frameCount % 5 === 0 && currentStatsText) {
          const currentFps = babylonEngine.getFps().toFixed(0);
          const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
          // Extract method and count from status text as a workaround
          const statusMatch = statusText?.text.match(/Testing (\w+) with (\d+) cubes/);
          if (statusMatch) {
            currentStatsText.text = `Current: ${statusMatch[1]} - ${statusMatch[2]} cubes - ${currentFps} FPS (${elapsed}s)`;
          }
        }
        
        // Check if sample duration has elapsed
        const elapsed = performance.now() - startTime;
        if (elapsed >= FPS_SAMPLE_DURATION) {
          // Remove observer and calculate average FPS
          if (observer) {
            scene.onAfterRenderObservable.remove(observer);
          }
          const avgFPS = fpsReadings.reduce((a, b) => a + b, 0) / fpsReadings.length;
          console.log(`FPS measurement complete: ${frameCount} frames over ${(elapsed/1000).toFixed(2)}s, avg: ${avgFPS.toFixed(2)} FPS`);
          resolve({ fps: avgFPS });
        }
      };
      
      // Wait a bit for scene to stabilize, then start observing frames
      setTimeout(() => {
        observer = scene.onAfterRenderObservable.add(measureFrame);
      }, 500);
    });
  }

  // Run single benchmark test
  async function runSingleTest(method, count) {
    updateStatus(`Testing ${method} with ${count} cubes...`);
    
    // Unfreeze meshes before clearing
    unfreezeForNextTest();
    
    // Clear any previous scene first
    if (currentSelection) {
      scene.blockfreeActiveMeshesAndRenderingGroups = true;
      currentSelection.dispose();
      currentSelection = null;
      scene.blockfreeActiveMeshesAndRenderingGroups = false;
    }
    
    // Wait longer to ensure cleanup is complete (especially important for Quest)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create data outside of timing
    benchmarkData = createCubeData(count);
    
    // Measure cube creation time
    const startTime = performance.now();
    createCubes(method, benchmarkData);
    const creationTime = performance.now() - startTime;

    // Wait for scene to stabilize after creating cubes (Quest needs more time to process)
    updateStatus(`Stabilizing ${method} with ${count} cubes...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Freeze meshes after stabilization to avoid blocking the main thread
    await refreezeForTest();
    
    // Additional wait after freezing
    updateStatus(`Preparing ${method} with ${count} cubes for measurement...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
  async function runBenchmarks(hideGUI = false) {
    stopRequested = false;
    
    // Check if at least one method is enabled
    const hasEnabledMethods = Object.values(enabledMethods).some(enabled => enabled);
    if (!hasEnabledMethods) {
      updateStatus('Error: Please select at least one method to benchmark');
      return;
    }
    
    updateStatus('Starting benchmarks...');
    if (guiButtons.startButton) guiButtons.startButton.isEnabled = false;
    if (guiButtons.startHiddenButton) guiButtons.startHiddenButton.isEnabled = false;
    if (guiButtons.stopButton) guiButtons.stopButton.isEnabled = true;
    
    // Hide GUI if requested
    if (hideGUI && guiPlane) {
      guiPlane.setEnabled(false);
    }
    
    // Only run enabled methods
    const methodsToRun = BENCHMARK_METHODS.filter(method => enabledMethods[method]);
    
    for (const method of methodsToRun) {
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
          // Unfreeze before disposing to ensure proper cleanup
          unfreezeForNextTest();
          scene.blockfreeActiveMeshesAndRenderingGroups = true;
          currentSelection.dispose();
          currentSelection = null;
          scene.blockfreeActiveMeshesAndRenderingGroups = false;
        }
        
        if (continueTest) {
          // Wait for FPS to stabilize before next test
          updateStatus('Waiting for FPS to stabilize...');
          await waitForFPSStabilization();
          
          // Additional delay between tests to ensure cleanup (increased for Quest/Vision Pro)
          await new Promise(resolve => setTimeout(resolve, 1000));
          
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
    if (guiButtons.startHiddenButton) guiButtons.startHiddenButton.isEnabled = true;
    if (guiButtons.stopButton) guiButtons.stopButton.isEnabled = false;
    
    // Show GUI again if it was hidden
    if (hideGUI && guiPlane) {
      guiPlane.setEnabled(true);
    }
    
    // Clear scene and reset optimizations to prevent crashes
    clearScene();
    
    
    // Give the engine time to process cleanup
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Wait for FPS to stabilize after clearing scene
  async function waitForFPSStabilization() {
    return new Promise((resolve) => {
      const targetStableFrames = 30; // Number of frames to check for stability
      const fpsThreshold = 2; // FPS variance threshold
      const minFPS = 60; // Minimum FPS required before starting next trial
      const maxWaitTime = 10000; // Maximum time to wait (10 seconds)
      let stableFrames = 0;
      let lastFPS = 0;
      let observer = null;
      let timeout = null;
      
      const cleanup = () => {
        if (observer) {
          scene.onAfterRenderObservable.remove(observer);
          observer = null;
        }
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
      };
      
      const checkStability = () => {
        // Check FPS on each frame via observable
        const currentFPS = babylonEngine.getFps();
        
        // Only count stable frames if FPS is above minimum threshold
        if (currentFPS >= minFPS && Math.abs(currentFPS - lastFPS) < fpsThreshold) {
          stableFrames++;
        } else {
          stableFrames = 0; // Reset if FPS too low or varies too much
        }
        
        lastFPS = currentFPS;
        
        if (stableFrames >= targetStableFrames) {
          // Remove observer and resolve
          console.log(`FPS stabilized at ${currentFPS.toFixed(1)} FPS`);
          cleanup();
          resolve();
        }
      };
      
      // Set timeout to force continue if stabilization takes too long
      timeout = setTimeout(() => {
        console.log(`FPS stabilization timeout - moving on (current FPS: ${lastFPS.toFixed(1)})`);
        cleanup();
        resolve();
      }, maxWaitTime);
      
      // Start checking after a short delay
      setTimeout(() => {
        observer = scene.onAfterRenderObservable.add(checkStability);
      }, 200);
    });
  }

  // Display benchmark results
  function displayResults() {
    if (!resultsText) return;
    
    let text = 'BENCHMARK RESULTS\n';
    text += `Mode: ${optimizedMode ? 'OPTIMIZED' : 'STANDARD'}\n`;
    text += `Multiview: ${multiviewEnabled ? 'ON' : 'OFF'}\n`;
    const xrFrameRate = scene.metadata?.xrFrameRate;
    if (xrFrameRate) {
      text += `XR Frame Rate: ${xrFrameRate} Hz\n`;
    }
    
    // Show which methods are enabled
    const enabledMethodsList = BENCHMARK_METHODS.filter(m => enabledMethods[m]).join(', ');
    text += `Methods: ${enabledMethodsList}\n`;
    text += '\n';
    
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
    let csvContent = `Mode: ${optimizedMode ? 'OPTIMIZED' : 'STANDARD'}\n`;
    csvContent += `Multiview: ${multiviewEnabled ? 'ON' : 'OFF'}\n`;
    const xrFrameRate = scene.metadata?.xrFrameRate;
    if (xrFrameRate) {
      csvContent += `XR Frame Rate: ${xrFrameRate} Hz\n`;
    }
    const enabledMethodsList = BENCHMARK_METHODS.filter(m => enabledMethods[m]).join(', ');
    csvContent += `Methods: ${enabledMethodsList}\n`;
    csvContent += 'Method,Cubes,Create(ms),FPS\n';
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
          line.startsWith('Press G') || line.startsWith('Mode:') || 
          line.startsWith('Multiview:') || line.startsWith('XR Frame Rate:') ||
          line.startsWith('Methods:') ||
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
    
    // Generate filename with timestamp and mode
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const mode = optimizedMode ? 'optimized' : 'standard';
    const multiview = multiviewEnabled ? '-multiview' : '';
    link.setAttribute('href', url);
    link.setAttribute('download', `anu-benchmark-${mode}${multiview}-${timestamp}.csv`);
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

  // Double-click to toggle GUI
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type === PointerEventTypes.POINTERDOUBLETAP) {
      if (guiPlane) {
        guiPlane.setEnabled(!guiPlane.isEnabled());
      }
    }
  });

  // Monitor XR session state to stop benchmarks when exiting XR
  // This will be set up by the XR initialization in singleView.vue
  scene.onReadyObservable.addOnce(() => {
    // Check periodically for XR session changes
    let wasInXR = false;
    scene.onBeforeRenderObservable.add(() => {
      const inXR = scene.activeCamera?.getClassName() === 'WebXRCamera';
      
      // Detect transition from XR to non-XR (exiting XR)
      if (wasInXR && !inXR) {
        console.log('XR session ended - stopping benchmark and cleaning up');
        
        // Stop any running benchmark
        stopRequested = true;
        
        // Clean up scene
        if (currentSelection) {
          try {
            unfreezeForNextTest();
            scene.blockfreeActiveMeshesAndRenderingGroups = true;
            currentSelection.dispose();
            currentSelection = null;
            scene.blockfreeActiveMeshesAndRenderingGroups = false;
          } catch (error) {
            console.warn('Error disposing selection on XR exit:', error);
          }
        }
        
        // Reset benchmark state
        benchmarkData = null;
        
        
        // Update UI
        updateStatus('XR session ended - benchmark stopped');
        if (guiButtons.startButton) guiButtons.startButton.isEnabled = true;
        if (guiButtons.startHiddenButton) guiButtons.startHiddenButton.isEnabled = true;
        if (guiButtons.stopButton) guiButtons.stopButton.isEnabled = false;
        
        // Show GUI if it was hidden
        if (guiPlane && !guiPlane.isEnabled()) {
          guiPlane.setEnabled(true);
        }
      }
      
      wasInXR = inXR;
    });
  });

  return scene;
};
