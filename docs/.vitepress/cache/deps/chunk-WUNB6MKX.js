import {
  PerfCounter
} from "./chunk-ZDVSIDQP.js";
import {
  InternalTexture,
  InternalTextureSource,
  IsDocumentAvailable,
  IsWindowObjectExist,
  Logger,
  PrecisionDate,
  ThinEngine,
  WebGLDataBuffer,
  WebGLHardwareTexture,
  _WarnImport
} from "./chunk-D5SXP72C.js";
import {
  EngineStore,
  Observable
} from "./chunk-A7RTI335.js";

// node_modules/@babylonjs/core/Misc/performanceMonitor.js
var PerformanceMonitor = class {
  /**
   * constructor
   * @param frameSampleSize The number of samples required to saturate the sliding window
   */
  constructor(frameSampleSize = 30) {
    this._enabled = true;
    this._rollingFrameTime = new RollingAverage(frameSampleSize);
  }
  /**
   * Samples current frame
   * @param timeMs A timestamp in milliseconds of the current frame to compare with other frames
   */
  sampleFrame(timeMs = PrecisionDate.Now) {
    if (!this._enabled) {
      return;
    }
    if (this._lastFrameTimeMs != null) {
      const dt = timeMs - this._lastFrameTimeMs;
      this._rollingFrameTime.add(dt);
    }
    this._lastFrameTimeMs = timeMs;
  }
  /**
   * Returns the average frame time in milliseconds over the sliding window (or the subset of frames sampled so far)
   */
  get averageFrameTime() {
    return this._rollingFrameTime.average;
  }
  /**
   * Returns the variance frame time in milliseconds over the sliding window (or the subset of frames sampled so far)
   */
  get averageFrameTimeVariance() {
    return this._rollingFrameTime.variance;
  }
  /**
   * Returns the frame time of the most recent frame
   */
  get instantaneousFrameTime() {
    return this._rollingFrameTime.history(0);
  }
  /**
   * Returns the average framerate in frames per second over the sliding window (or the subset of frames sampled so far)
   */
  get averageFPS() {
    return 1e3 / this._rollingFrameTime.average;
  }
  /**
   * Returns the average framerate in frames per second using the most recent frame time
   */
  get instantaneousFPS() {
    const history = this._rollingFrameTime.history(0);
    if (history === 0) {
      return 0;
    }
    return 1e3 / history;
  }
  /**
   * Returns true if enough samples have been taken to completely fill the sliding window
   */
  get isSaturated() {
    return this._rollingFrameTime.isSaturated();
  }
  /**
   * Enables contributions to the sliding window sample set
   */
  enable() {
    this._enabled = true;
  }
  /**
   * Disables contributions to the sliding window sample set
   * Samples will not be interpolated over the disabled period
   */
  disable() {
    this._enabled = false;
    this._lastFrameTimeMs = null;
  }
  /**
   * Returns true if sampling is enabled
   */
  get isEnabled() {
    return this._enabled;
  }
  /**
   * Resets performance monitor
   */
  reset() {
    this._lastFrameTimeMs = null;
    this._rollingFrameTime.reset();
  }
};
var RollingAverage = class {
  /**
   * constructor
   * @param length The number of samples required to saturate the sliding window
   */
  constructor(length) {
    this._samples = new Array(length);
    this.reset();
  }
  /**
   * Adds a sample to the sample set
   * @param v The sample value
   */
  add(v) {
    let delta;
    if (this.isSaturated()) {
      const bottomValue = this._samples[this._pos];
      delta = bottomValue - this.average;
      this.average -= delta / (this._sampleCount - 1);
      this._m2 -= delta * (bottomValue - this.average);
    } else {
      this._sampleCount++;
    }
    delta = v - this.average;
    this.average += delta / this._sampleCount;
    this._m2 += delta * (v - this.average);
    this.variance = this._m2 / (this._sampleCount - 1);
    this._samples[this._pos] = v;
    this._pos++;
    this._pos %= this._samples.length;
  }
  /**
   * Returns previously added values or null if outside of history or outside the sliding window domain
   * @param i Index in history. For example, pass 0 for the most recent value and 1 for the value before that
   * @returns Value previously recorded with add() or null if outside of range
   */
  history(i) {
    if (i >= this._sampleCount || i >= this._samples.length) {
      return 0;
    }
    const i0 = this._wrapPosition(this._pos - 1);
    return this._samples[this._wrapPosition(i0 - i)];
  }
  /**
   * Returns true if enough samples have been taken to completely fill the sliding window
   * @returns true if sample-set saturated
   */
  isSaturated() {
    return this._sampleCount >= this._samples.length;
  }
  /**
   * Resets the rolling average (equivalent to 0 samples taken so far)
   */
  reset() {
    this.average = 0;
    this.variance = 0;
    this._sampleCount = 0;
    this._pos = 0;
    this._m2 = 0;
  }
  /**
   * Wraps a value around the sample range boundaries
   * @param i Position in sample range, for example if the sample length is 5, and i is -3, then 2 will be returned.
   * @returns Wrapped position in sample range
   */
  _wrapPosition(i) {
    const max = this._samples.length;
    return (i % max + max) % max;
  }
};

// node_modules/@babylonjs/core/Engines/Extensions/engine.alpha.js
ThinEngine.prototype.setAlphaConstants = function(r, g, b, a) {
  this._alphaState.setAlphaBlendConstants(r, g, b, a);
};
ThinEngine.prototype.setAlphaMode = function(mode, noDepthWriteChange = false) {
  if (this._alphaMode === mode) {
    if (!noDepthWriteChange) {
      const depthMask = mode === 0;
      if (this.depthCullingState.depthMask !== depthMask) {
        this.depthCullingState.depthMask = depthMask;
      }
    }
    return;
  }
  switch (mode) {
    case 0:
      this._alphaState.alphaBlend = false;
      break;
    case 7:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 8:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
      this._alphaState.alphaBlend = true;
      break;
    case 2:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 6:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE, this._gl.ZERO, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 1:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE, this._gl.ZERO, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 3:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ZERO, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 4:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.DST_COLOR, this._gl.ZERO, this._gl.ONE, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 5:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 9:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.CONSTANT_COLOR, this._gl.ONE_MINUS_CONSTANT_COLOR, this._gl.CONSTANT_ALPHA, this._gl.ONE_MINUS_CONSTANT_ALPHA);
      this._alphaState.alphaBlend = true;
      break;
    case 10:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
      this._alphaState.alphaBlend = true;
      break;
    case 11:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE, this._gl.ONE, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 12:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.DST_ALPHA, this._gl.ONE, this._gl.ZERO, this._gl.ZERO);
      this._alphaState.alphaBlend = true;
      break;
    case 13:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE_MINUS_DST_COLOR, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE_MINUS_DST_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
      this._alphaState.alphaBlend = true;
      break;
    case 14:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
      this._alphaState.alphaBlend = true;
      break;
    case 15:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE, this._gl.ONE, this._gl.ZERO);
      this._alphaState.alphaBlend = true;
      break;
    case 16:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE_MINUS_DST_COLOR, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ZERO, this._gl.ONE);
      this._alphaState.alphaBlend = true;
      break;
    case 17:
      this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
      this._alphaState.alphaBlend = true;
      break;
  }
  if (!noDepthWriteChange) {
    this.depthCullingState.depthMask = mode === 0;
  }
  this._alphaMode = mode;
};
ThinEngine.prototype.getAlphaMode = function() {
  return this._alphaMode;
};
ThinEngine.prototype.setAlphaEquation = function(equation) {
  if (this._alphaEquation === equation) {
    return;
  }
  switch (equation) {
    case 0:
      this._alphaState.setAlphaEquationParameters(32774, 32774);
      break;
    case 1:
      this._alphaState.setAlphaEquationParameters(32778, 32778);
      break;
    case 2:
      this._alphaState.setAlphaEquationParameters(32779, 32779);
      break;
    case 3:
      this._alphaState.setAlphaEquationParameters(32776, 32776);
      break;
    case 4:
      this._alphaState.setAlphaEquationParameters(32775, 32775);
      break;
    case 5:
      this._alphaState.setAlphaEquationParameters(32775, 32774);
      break;
  }
  this._alphaEquation = equation;
};
ThinEngine.prototype.getAlphaEquation = function() {
  return this._alphaEquation;
};

// node_modules/@babylonjs/core/Engines/Extensions/engine.readTexture.js
function allocateAndCopyTypedBuffer(type, sizeOrDstBuffer, sizeInBytes = false, copyBuffer) {
  switch (type) {
    case 3: {
      const buffer2 = sizeOrDstBuffer instanceof ArrayBuffer ? new Int8Array(sizeOrDstBuffer) : new Int8Array(sizeOrDstBuffer);
      if (copyBuffer) {
        buffer2.set(new Int8Array(copyBuffer));
      }
      return buffer2;
    }
    case 0: {
      const buffer2 = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint8Array(sizeOrDstBuffer) : new Uint8Array(sizeOrDstBuffer);
      if (copyBuffer) {
        buffer2.set(new Uint8Array(copyBuffer));
      }
      return buffer2;
    }
    case 4: {
      const buffer2 = sizeOrDstBuffer instanceof ArrayBuffer ? new Int16Array(sizeOrDstBuffer) : new Int16Array(sizeInBytes ? sizeOrDstBuffer / 2 : sizeOrDstBuffer);
      if (copyBuffer) {
        buffer2.set(new Int16Array(copyBuffer));
      }
      return buffer2;
    }
    case 5:
    case 8:
    case 9:
    case 10:
    case 2: {
      const buffer2 = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint16Array(sizeOrDstBuffer) : new Uint16Array(sizeInBytes ? sizeOrDstBuffer / 2 : sizeOrDstBuffer);
      if (copyBuffer) {
        buffer2.set(new Uint16Array(copyBuffer));
      }
      return buffer2;
    }
    case 6: {
      const buffer2 = sizeOrDstBuffer instanceof ArrayBuffer ? new Int32Array(sizeOrDstBuffer) : new Int32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
      if (copyBuffer) {
        buffer2.set(new Int32Array(copyBuffer));
      }
      return buffer2;
    }
    case 7:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15: {
      const buffer2 = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint32Array(sizeOrDstBuffer) : new Uint32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
      if (copyBuffer) {
        buffer2.set(new Uint32Array(copyBuffer));
      }
      return buffer2;
    }
    case 1: {
      const buffer2 = sizeOrDstBuffer instanceof ArrayBuffer ? new Float32Array(sizeOrDstBuffer) : new Float32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
      if (copyBuffer) {
        buffer2.set(new Float32Array(copyBuffer));
      }
      return buffer2;
    }
  }
  const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint8Array(sizeOrDstBuffer) : new Uint8Array(sizeOrDstBuffer);
  if (copyBuffer) {
    buffer.set(new Uint8Array(copyBuffer));
  }
  return buffer;
}
ThinEngine.prototype._readTexturePixelsSync = function(texture, width, height, faceIndex = -1, level = 0, buffer = null, flushRenderer = true, noDataConversion = false, x = 0, y = 0) {
  var _a, _b;
  const gl = this._gl;
  if (!gl) {
    throw new Error("Engine does not have gl rendering context.");
  }
  if (!this._dummyFramebuffer) {
    const dummy = gl.createFramebuffer();
    if (!dummy) {
      throw new Error("Unable to create dummy framebuffer");
    }
    this._dummyFramebuffer = dummy;
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, this._dummyFramebuffer);
  if (faceIndex > -1) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, (_a = texture._hardwareTexture) == null ? void 0 : _a.underlyingResource, level);
  } else {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, (_b = texture._hardwareTexture) == null ? void 0 : _b.underlyingResource, level);
  }
  let readType = texture.type !== void 0 ? this._getWebGLTextureType(texture.type) : gl.UNSIGNED_BYTE;
  if (!noDataConversion) {
    switch (readType) {
      case gl.UNSIGNED_BYTE:
        if (!buffer) {
          buffer = new Uint8Array(4 * width * height);
        }
        readType = gl.UNSIGNED_BYTE;
        break;
      default:
        if (!buffer) {
          buffer = new Float32Array(4 * width * height);
        }
        readType = gl.FLOAT;
        break;
    }
  } else if (!buffer) {
    buffer = allocateAndCopyTypedBuffer(texture.type, 4 * width * height);
  }
  if (flushRenderer) {
    this.flushFramebuffer();
  }
  gl.readPixels(x, y, width, height, gl.RGBA, readType, buffer);
  gl.bindFramebuffer(gl.FRAMEBUFFER, this._currentFramebuffer);
  return buffer;
};
ThinEngine.prototype._readTexturePixels = function(texture, width, height, faceIndex = -1, level = 0, buffer = null, flushRenderer = true, noDataConversion = false, x = 0, y = 0) {
  return Promise.resolve(this._readTexturePixelsSync(texture, width, height, faceIndex, level, buffer, flushRenderer, noDataConversion, x, y));
};

// node_modules/@babylonjs/core/Engines/Extensions/engine.dynamicBuffer.js
ThinEngine.prototype.updateDynamicIndexBuffer = function(indexBuffer, indices, offset = 0) {
  this._currentBoundBuffer[this._gl.ELEMENT_ARRAY_BUFFER] = null;
  this.bindIndexBuffer(indexBuffer);
  let view;
  if (indexBuffer.is32Bits) {
    view = indices instanceof Uint32Array ? indices : new Uint32Array(indices);
  } else {
    view = indices instanceof Uint16Array ? indices : new Uint16Array(indices);
  }
  this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, view, this._gl.DYNAMIC_DRAW);
  this._resetIndexBufferBinding();
};
ThinEngine.prototype.updateDynamicVertexBuffer = function(vertexBuffer, data, byteOffset, byteLength) {
  this.bindArrayBuffer(vertexBuffer);
  if (byteOffset === void 0) {
    byteOffset = 0;
  }
  const dataLength = data.byteLength || data.length;
  if (byteLength === void 0 || byteLength >= dataLength && byteOffset === 0) {
    if (data instanceof Array) {
      this._gl.bufferSubData(this._gl.ARRAY_BUFFER, byteOffset, new Float32Array(data));
    } else {
      this._gl.bufferSubData(this._gl.ARRAY_BUFFER, byteOffset, data);
    }
  } else {
    if (data instanceof Array) {
      this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, new Float32Array(data).subarray(byteOffset, byteOffset + byteLength));
    } else {
      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data, byteOffset, byteLength);
      } else {
        data = new Uint8Array(data.buffer, data.byteOffset + byteOffset, byteLength);
      }
      this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, data);
    }
  }
  this._resetVertexBufferBinding();
};

// node_modules/@babylonjs/core/Engines/engine.js
var Engine = class _Engine extends ThinEngine {
  /**
   * Returns the current npm package of the sdk
   */
  // Not mixed with Version for tooling purpose.
  static get NpmPackage() {
    return ThinEngine.NpmPackage;
  }
  /**
   * Returns the current version of the framework
   */
  static get Version() {
    return ThinEngine.Version;
  }
  /** Gets the list of created engines */
  static get Instances() {
    return EngineStore.Instances;
  }
  /**
   * Gets the latest created engine
   */
  static get LastCreatedEngine() {
    return EngineStore.LastCreatedEngine;
  }
  /**
   * Gets the latest created scene
   */
  static get LastCreatedScene() {
    return EngineStore.LastCreatedScene;
  }
  /** @internal */
  /**
   * Engine abstraction for loading and creating an image bitmap from a given source string.
   * @param imageSource source to load the image from.
   * @param options An object that sets options for the image's extraction.
   * @returns ImageBitmap.
   */
  _createImageBitmapFromSource(imageSource, options) {
    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        image.decode().then(() => {
          this.createImageBitmap(image, options).then((imageBitmap) => {
            resolve(imageBitmap);
          });
        });
      };
      image.onerror = () => {
        reject(`Error loading image ${image.src}`);
      };
      image.src = imageSource;
    });
    return promise;
  }
  /**
   * Engine abstraction for createImageBitmap
   * @param image source for image
   * @param options An object that sets options for the image's extraction.
   * @returns ImageBitmap
   */
  createImageBitmap(image, options) {
    return createImageBitmap(image, options);
  }
  /**
   * Resize an image and returns the image data as an uint8array
   * @param image image to resize
   * @param bufferWidth destination buffer width
   * @param bufferHeight destination buffer height
   * @returns an uint8array containing RGBA values of bufferWidth * bufferHeight size
   */
  resizeImageBitmap(image, bufferWidth, bufferHeight) {
    const canvas = this.createCanvas(bufferWidth, bufferHeight);
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to get 2d context for resizeImageBitmap");
    }
    context.drawImage(image, 0, 0);
    const buffer = context.getImageData(0, 0, bufferWidth, bufferHeight).data;
    return buffer;
  }
  /**
   * Will flag all materials in all scenes in all engines as dirty to trigger new shader compilation
   * @param flag defines which part of the materials must be marked as dirty
   * @param predicate defines a predicate used to filter which materials should be affected
   */
  static MarkAllMaterialsAsDirty(flag, predicate) {
    for (let engineIndex = 0; engineIndex < _Engine.Instances.length; engineIndex++) {
      const engine = _Engine.Instances[engineIndex];
      for (let sceneIndex = 0; sceneIndex < engine.scenes.length; sceneIndex++) {
        engine.scenes[sceneIndex].markAllMaterialsAsDirty(flag, predicate);
      }
    }
  }
  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * Method called to create the default loading screen.
   * This can be overridden in your own app.
   * @param canvas The rendering canvas element
   * @returns The loading screen
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static DefaultLoadingScreenFactory(canvas) {
    throw _WarnImport("LoadingScreen");
  }
  get _supportsHardwareTextureRescaling() {
    return !!_Engine._RescalePostProcessFactory;
  }
  /**
   * Gets the performance monitor attached to this engine
   * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#engineinstrumentation
   */
  get performanceMonitor() {
    return this._performanceMonitor;
  }
  /**
   * (WebGPU only) True (default) to be in compatibility mode, meaning rendering all existing scenes without artifacts (same rendering than WebGL).
   * Setting the property to false will improve performances but may not work in some scenes if some precautions are not taken.
   * See https://doc.babylonjs.com/setup/support/webGPU/webGPUOptimization/webGPUNonCompatibilityMode for more details
   */
  get compatibilityMode() {
    return this._compatibilityMode;
  }
  set compatibilityMode(mode) {
    this._compatibilityMode = true;
  }
  // Events
  /**
   * Gets the HTML element used to attach event listeners
   * @returns a HTML element
   */
  getInputElement() {
    return this._renderingCanvas;
  }
  /**
   * Creates a new engine
   * @param canvasOrContext defines the canvas or WebGL context to use for rendering. If you provide a WebGL context, Babylon.js will not hook events on the canvas (like pointers, keyboards, etc...) so no event observables will be available. This is mostly used when Babylon.js is used as a plugin on a system which already used the WebGL context
   * @param antialias defines enable antialiasing (default: false)
   * @param options defines further options to be sent to the getContext() function
   * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
   */
  constructor(canvasOrContext, antialias, options, adaptToDeviceRatio = false) {
    super(canvasOrContext, antialias, options, adaptToDeviceRatio);
    this.enableOfflineSupport = false;
    this.disableManifestCheck = false;
    this.disableContextMenu = true;
    this.scenes = [];
    this._virtualScenes = new Array();
    this.onNewSceneAddedObservable = new Observable();
    this.postProcesses = [];
    this.isPointerLock = false;
    this.onResizeObservable = new Observable();
    this.onCanvasBlurObservable = new Observable();
    this.onCanvasFocusObservable = new Observable();
    this.onCanvasPointerOutObservable = new Observable();
    this.onBeginFrameObservable = new Observable();
    this.customAnimationFrameRequester = null;
    this.onEndFrameObservable = new Observable();
    this.onBeforeShaderCompilationObservable = new Observable();
    this.onAfterShaderCompilationObservable = new Observable();
    this._deterministicLockstep = false;
    this._lockstepMaxSteps = 4;
    this._timeStep = 1 / 60;
    this._fps = 60;
    this._deltaTime = 0;
    this._drawCalls = new PerfCounter();
    this.canvasTabIndex = 1;
    this.disablePerformanceMonitorInBackground = false;
    this._performanceMonitor = new PerformanceMonitor();
    this._compatibilityMode = true;
    this.currentRenderPassId = 0;
    this._renderPassNames = ["main"];
    _Engine.Instances.push(this);
    if (!canvasOrContext) {
      return;
    }
    this._features.supportRenderPasses = true;
    options = this._creationOptions;
    if (canvasOrContext.getContext) {
      const canvas = canvasOrContext;
      this._sharedInit(canvas);
    }
  }
  _initGLContext() {
    super._initGLContext();
    this._rescalePostProcess = null;
  }
  /**
   * Shared initialization across engines types.
   * @param canvas The canvas associated with this instance of the engine.
   */
  _sharedInit(canvas) {
    super._sharedInit(canvas);
    this._onCanvasFocus = () => {
      this.onCanvasFocusObservable.notifyObservers(this);
    };
    this._onCanvasBlur = () => {
      this.onCanvasBlurObservable.notifyObservers(this);
    };
    this._onCanvasContextMenu = (evt) => {
      if (this.disableContextMenu) {
        evt.preventDefault();
      }
    };
    canvas.addEventListener("focus", this._onCanvasFocus);
    canvas.addEventListener("blur", this._onCanvasBlur);
    canvas.addEventListener("contextmenu", this._onCanvasContextMenu);
    this._onBlur = () => {
      if (this.disablePerformanceMonitorInBackground) {
        this._performanceMonitor.disable();
      }
      this._windowIsBackground = true;
    };
    this._onFocus = () => {
      if (this.disablePerformanceMonitorInBackground) {
        this._performanceMonitor.enable();
      }
      this._windowIsBackground = false;
    };
    this._onCanvasPointerOut = (ev) => {
      if (document.elementFromPoint(ev.clientX, ev.clientY) !== canvas) {
        this.onCanvasPointerOutObservable.notifyObservers(ev);
      }
    };
    const hostWindow = this.getHostWindow();
    if (hostWindow && typeof hostWindow.addEventListener === "function") {
      hostWindow.addEventListener("blur", this._onBlur);
      hostWindow.addEventListener("focus", this._onFocus);
    }
    canvas.addEventListener("pointerout", this._onCanvasPointerOut);
    if (!this._creationOptions.doNotHandleTouchAction) {
      this._disableTouchAction();
    }
    if (!_Engine.audioEngine && this._creationOptions.audioEngine && _Engine.AudioEngineFactory) {
      _Engine.audioEngine = _Engine.AudioEngineFactory(this.getRenderingCanvas(), this.getAudioContext(), this.getAudioDestination());
    }
    if (IsDocumentAvailable()) {
      this._onFullscreenChange = () => {
        this.isFullscreen = !!document.fullscreenElement;
        if (this.isFullscreen && this._pointerLockRequested && canvas) {
          _Engine._RequestPointerlock(canvas);
        }
      };
      document.addEventListener("fullscreenchange", this._onFullscreenChange, false);
      document.addEventListener("webkitfullscreenchange", this._onFullscreenChange, false);
      this._onPointerLockChange = () => {
        this.isPointerLock = document.pointerLockElement === canvas;
      };
      document.addEventListener("pointerlockchange", this._onPointerLockChange, false);
      document.addEventListener("webkitpointerlockchange", this._onPointerLockChange, false);
    }
    this.enableOfflineSupport = _Engine.OfflineProviderFactory !== void 0;
    this._deterministicLockstep = !!this._creationOptions.deterministicLockstep;
    this._lockstepMaxSteps = this._creationOptions.lockstepMaxSteps || 0;
    this._timeStep = this._creationOptions.timeStep || 1 / 60;
  }
  /** @internal */
  _verifyPointerLock() {
    var _a;
    (_a = this._onPointerLockChange) == null ? void 0 : _a.call(this);
  }
  /**
   * Gets current aspect ratio
   * @param viewportOwner defines the camera to use to get the aspect ratio
   * @param useScreen defines if screen size must be used (or the current render target if any)
   * @returns a number defining the aspect ratio
   */
  getAspectRatio(viewportOwner, useScreen = false) {
    const viewport = viewportOwner.viewport;
    return this.getRenderWidth(useScreen) * viewport.width / (this.getRenderHeight(useScreen) * viewport.height);
  }
  /**
   * Gets current screen aspect ratio
   * @returns a number defining the aspect ratio
   */
  getScreenAspectRatio() {
    return this.getRenderWidth(true) / this.getRenderHeight(true);
  }
  /**
   * Gets the client rect of the HTML canvas attached with the current webGL context
   * @returns a client rectangle
   */
  getRenderingCanvasClientRect() {
    if (!this._renderingCanvas) {
      return null;
    }
    return this._renderingCanvas.getBoundingClientRect();
  }
  /**
   * Gets the client rect of the HTML element used for events
   * @returns a client rectangle
   */
  getInputElementClientRect() {
    if (!this._renderingCanvas) {
      return null;
    }
    return this.getInputElement().getBoundingClientRect();
  }
  /**
   * Gets a boolean indicating that the engine is running in deterministic lock step mode
   * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
   * @returns true if engine is in deterministic lock step mode
   */
  isDeterministicLockStep() {
    return this._deterministicLockstep;
  }
  /**
   * Gets the max steps when engine is running in deterministic lock step
   * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
   * @returns the max steps
   */
  getLockstepMaxSteps() {
    return this._lockstepMaxSteps;
  }
  /**
   * Returns the time in ms between steps when using deterministic lock step.
   * @returns time step in (ms)
   */
  getTimeStep() {
    return this._timeStep * 1e3;
  }
  /**
   * Force the mipmap generation for the given render target texture
   * @param texture defines the render target texture to use
   * @param unbind defines whether or not to unbind the texture after generation. Defaults to true.
   */
  generateMipMapsForCubemap(texture, unbind = true) {
    if (texture.generateMipMaps) {
      const gl = this._gl;
      this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      if (unbind) {
        this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);
      }
    }
  }
  /** States */
  /**
   * Gets a boolean indicating if depth writing is enabled
   * @returns the current depth writing state
   */
  getDepthWrite() {
    return this._depthCullingState.depthMask;
  }
  /**
   * Enable or disable depth writing
   * @param enable defines the state to set
   */
  setDepthWrite(enable) {
    this._depthCullingState.depthMask = enable;
  }
  /**
   * Gets a boolean indicating if stencil buffer is enabled
   * @returns the current stencil buffer state
   */
  getStencilBuffer() {
    return this._stencilState.stencilTest;
  }
  /**
   * Enable or disable the stencil buffer
   * @param enable defines if the stencil buffer must be enabled or disabled
   */
  setStencilBuffer(enable) {
    this._stencilState.stencilTest = enable;
  }
  /**
   * Gets the current stencil mask
   * @returns a number defining the new stencil mask to use
   */
  getStencilMask() {
    return this._stencilState.stencilMask;
  }
  /**
   * Sets the current stencil mask
   * @param mask defines the new stencil mask to use
   */
  setStencilMask(mask) {
    this._stencilState.stencilMask = mask;
  }
  /**
   * Gets the current stencil function
   * @returns a number defining the stencil function to use
   */
  getStencilFunction() {
    return this._stencilState.stencilFunc;
  }
  /**
   * Gets the current stencil reference value
   * @returns a number defining the stencil reference value to use
   */
  getStencilFunctionReference() {
    return this._stencilState.stencilFuncRef;
  }
  /**
   * Gets the current stencil mask
   * @returns a number defining the stencil mask to use
   */
  getStencilFunctionMask() {
    return this._stencilState.stencilFuncMask;
  }
  /**
   * Sets the current stencil function
   * @param stencilFunc defines the new stencil function to use
   */
  setStencilFunction(stencilFunc) {
    this._stencilState.stencilFunc = stencilFunc;
  }
  /**
   * Sets the current stencil reference
   * @param reference defines the new stencil reference to use
   */
  setStencilFunctionReference(reference) {
    this._stencilState.stencilFuncRef = reference;
  }
  /**
   * Sets the current stencil mask
   * @param mask defines the new stencil mask to use
   */
  setStencilFunctionMask(mask) {
    this._stencilState.stencilFuncMask = mask;
  }
  /**
   * Gets the current stencil operation when stencil fails
   * @returns a number defining stencil operation to use when stencil fails
   */
  getStencilOperationFail() {
    return this._stencilState.stencilOpStencilFail;
  }
  /**
   * Gets the current stencil operation when depth fails
   * @returns a number defining stencil operation to use when depth fails
   */
  getStencilOperationDepthFail() {
    return this._stencilState.stencilOpDepthFail;
  }
  /**
   * Gets the current stencil operation when stencil passes
   * @returns a number defining stencil operation to use when stencil passes
   */
  getStencilOperationPass() {
    return this._stencilState.stencilOpStencilDepthPass;
  }
  /**
   * Sets the stencil operation to use when stencil fails
   * @param operation defines the stencil operation to use when stencil fails
   */
  setStencilOperationFail(operation) {
    this._stencilState.stencilOpStencilFail = operation;
  }
  /**
   * Sets the stencil operation to use when depth fails
   * @param operation defines the stencil operation to use when depth fails
   */
  setStencilOperationDepthFail(operation) {
    this._stencilState.stencilOpDepthFail = operation;
  }
  /**
   * Sets the stencil operation to use when stencil passes
   * @param operation defines the stencil operation to use when stencil passes
   */
  setStencilOperationPass(operation) {
    this._stencilState.stencilOpStencilDepthPass = operation;
  }
  /**
   * Sets a boolean indicating if the dithering state is enabled or disabled
   * @param value defines the dithering state
   */
  setDitheringState(value) {
    if (value) {
      this._gl.enable(this._gl.DITHER);
    } else {
      this._gl.disable(this._gl.DITHER);
    }
  }
  /**
   * Sets a boolean indicating if the rasterizer state is enabled or disabled
   * @param value defines the rasterizer state
   */
  setRasterizerState(value) {
    if (value) {
      this._gl.disable(this._gl.RASTERIZER_DISCARD);
    } else {
      this._gl.enable(this._gl.RASTERIZER_DISCARD);
    }
  }
  /**
   * Gets the current depth function
   * @returns a number defining the depth function
   */
  getDepthFunction() {
    return this._depthCullingState.depthFunc;
  }
  /**
   * Sets the current depth function
   * @param depthFunc defines the function to use
   */
  setDepthFunction(depthFunc) {
    this._depthCullingState.depthFunc = depthFunc;
  }
  /**
   * Sets the current depth function to GREATER
   */
  setDepthFunctionToGreater() {
    this.setDepthFunction(516);
  }
  /**
   * Sets the current depth function to GEQUAL
   */
  setDepthFunctionToGreaterOrEqual() {
    this.setDepthFunction(518);
  }
  /**
   * Sets the current depth function to LESS
   */
  setDepthFunctionToLess() {
    this.setDepthFunction(513);
  }
  /**
   * Sets the current depth function to LEQUAL
   */
  setDepthFunctionToLessOrEqual() {
    this.setDepthFunction(515);
  }
  /**
   * Caches the state of the stencil buffer
   */
  cacheStencilState() {
    this._cachedStencilBuffer = this.getStencilBuffer();
    this._cachedStencilFunction = this.getStencilFunction();
    this._cachedStencilMask = this.getStencilMask();
    this._cachedStencilOperationPass = this.getStencilOperationPass();
    this._cachedStencilOperationFail = this.getStencilOperationFail();
    this._cachedStencilOperationDepthFail = this.getStencilOperationDepthFail();
    this._cachedStencilReference = this.getStencilFunctionReference();
  }
  /**
   * Restores the state of the stencil buffer
   */
  restoreStencilState() {
    this.setStencilFunction(this._cachedStencilFunction);
    this.setStencilMask(this._cachedStencilMask);
    this.setStencilBuffer(this._cachedStencilBuffer);
    this.setStencilOperationPass(this._cachedStencilOperationPass);
    this.setStencilOperationFail(this._cachedStencilOperationFail);
    this.setStencilOperationDepthFail(this._cachedStencilOperationDepthFail);
    this.setStencilFunctionReference(this._cachedStencilReference);
  }
  /**
   * Directly set the WebGL Viewport
   * @param x defines the x coordinate of the viewport (in screen space)
   * @param y defines the y coordinate of the viewport (in screen space)
   * @param width defines the width of the viewport (in screen space)
   * @param height defines the height of the viewport (in screen space)
   * @returns the current viewport Object (if any) that is being replaced by this call. You can restore this viewport later on to go back to the original state
   */
  setDirectViewport(x, y, width, height) {
    const currentViewport = this._cachedViewport;
    this._cachedViewport = null;
    this._viewport(x, y, width, height);
    return currentViewport;
  }
  /**
   * Executes a scissor clear (ie. a clear on a specific portion of the screen)
   * @param x defines the x-coordinate of the bottom left corner of the clear rectangle
   * @param y defines the y-coordinate of the corner of the clear rectangle
   * @param width defines the width of the clear rectangle
   * @param height defines the height of the clear rectangle
   * @param clearColor defines the clear color
   */
  scissorClear(x, y, width, height, clearColor) {
    this.enableScissor(x, y, width, height);
    this.clear(clearColor, true, true, true);
    this.disableScissor();
  }
  /**
   * Enable scissor test on a specific rectangle (ie. render will only be executed on a specific portion of the screen)
   * @param x defines the x-coordinate of the bottom left corner of the clear rectangle
   * @param y defines the y-coordinate of the corner of the clear rectangle
   * @param width defines the width of the clear rectangle
   * @param height defines the height of the clear rectangle
   */
  enableScissor(x, y, width, height) {
    const gl = this._gl;
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(x, y, width, height);
  }
  /**
   * Disable previously set scissor test rectangle
   */
  disableScissor() {
    const gl = this._gl;
    gl.disable(gl.SCISSOR_TEST);
  }
  /**
   * @internal
   */
  _reportDrawCall(numDrawCalls = 1) {
    this._drawCalls.addCount(numDrawCalls, false);
  }
  /**
   * @internal
   */
  _loadFileAsync(url, offlineProvider, useArrayBuffer) {
    return new Promise((resolve, reject) => {
      this._loadFile(url, (data) => {
        resolve(data);
      }, void 0, offlineProvider, useArrayBuffer, (request, exception) => {
        reject(exception);
      });
    });
  }
  /**
   * Gets the source code of the vertex shader associated with a specific webGL program
   * @param program defines the program to use
   * @returns a string containing the source code of the vertex shader associated with the program
   */
  getVertexShaderSource(program) {
    const shaders = this._gl.getAttachedShaders(program);
    if (!shaders) {
      return null;
    }
    return this._gl.getShaderSource(shaders[0]);
  }
  /**
   * Gets the source code of the fragment shader associated with a specific webGL program
   * @param program defines the program to use
   * @returns a string containing the source code of the fragment shader associated with the program
   */
  getFragmentShaderSource(program) {
    const shaders = this._gl.getAttachedShaders(program);
    if (!shaders) {
      return null;
    }
    return this._gl.getShaderSource(shaders[1]);
  }
  /**
   * Sets a depth stencil texture from a render target to the according uniform.
   * @param channel The texture channel
   * @param uniform The uniform to set
   * @param texture The render target texture containing the depth stencil texture to apply
   * @param name The texture name
   */
  setDepthStencilTexture(channel, uniform, texture, name) {
    if (channel === void 0) {
      return;
    }
    if (uniform) {
      this._boundUniforms[channel] = uniform;
    }
    if (!texture || !texture.depthStencilTexture) {
      this._setTexture(channel, null, void 0, void 0, name);
    } else {
      this._setTexture(channel, texture, false, true, name);
    }
  }
  /**
   * Sets a texture to the webGL context from a postprocess
   * @param channel defines the channel to use
   * @param postProcess defines the source postprocess
   * @param name name of the channel
   */
  setTextureFromPostProcess(channel, postProcess, name) {
    let postProcessInput = null;
    if (postProcess) {
      if (postProcess._forcedOutputTexture) {
        postProcessInput = postProcess._forcedOutputTexture;
      } else if (postProcess._textures.data[postProcess._currentRenderTextureInd]) {
        postProcessInput = postProcess._textures.data[postProcess._currentRenderTextureInd];
      }
    }
    this._bindTexture(channel, (postProcessInput == null ? void 0 : postProcessInput.texture) ?? null, name);
  }
  /**
   * Binds the output of the passed in post process to the texture channel specified
   * @param channel The channel the texture should be bound to
   * @param postProcess The post process which's output should be bound
   * @param name name of the channel
   */
  setTextureFromPostProcessOutput(channel, postProcess, name) {
    var _a;
    this._bindTexture(channel, ((_a = postProcess == null ? void 0 : postProcess._outputTexture) == null ? void 0 : _a.texture) ?? null, name);
  }
  /**
   * sets the object from which width and height will be taken from when getting render width and height
   * Will fallback to the gl object
   * @param dimensions the framebuffer width and height that will be used.
   */
  set framebufferDimensionsObject(dimensions) {
    this._framebufferDimensionsObject = dimensions;
    if (this._framebufferDimensionsObject) {
      this.onResizeObservable.notifyObservers(this);
    }
  }
  _rebuildBuffers() {
    for (const scene of this.scenes) {
      scene.resetCachedMaterial();
      scene._rebuildGeometries();
    }
    for (const scene of this._virtualScenes) {
      scene.resetCachedMaterial();
      scene._rebuildGeometries();
    }
    super._rebuildBuffers();
  }
  _rebuildTextures() {
    for (const scene of this.scenes) {
      scene._rebuildTextures();
    }
    for (const scene of this._virtualScenes) {
      scene._rebuildTextures();
    }
    super._rebuildTextures();
  }
  /** @internal */
  _renderFrame() {
    for (let index = 0; index < this._activeRenderLoops.length; index++) {
      const renderFunction = this._activeRenderLoops[index];
      renderFunction();
    }
  }
  _cancelFrame() {
    if (this._renderingQueueLaunched && this.customAnimationFrameRequester) {
      this._renderingQueueLaunched = false;
      const { cancelAnimationFrame } = this.customAnimationFrameRequester;
      if (cancelAnimationFrame) {
        cancelAnimationFrame(this.customAnimationFrameRequester.requestID);
      }
    } else {
      super._cancelFrame();
    }
  }
  _renderLoop() {
    if (!this._contextWasLost) {
      let shouldRender = true;
      if (this.isDisposed || !this.renderEvenInBackground && this._windowIsBackground) {
        shouldRender = false;
      }
      if (shouldRender) {
        this.beginFrame();
        if (!this._renderViews()) {
          this._renderFrame();
        }
        this.endFrame();
      }
    }
    if (this._activeRenderLoops.length > 0) {
      if (this.customAnimationFrameRequester) {
        this.customAnimationFrameRequester.requestID = this._queueNewFrame(this.customAnimationFrameRequester.renderFunction || this._boundRenderFunction, this.customAnimationFrameRequester);
        this._frameHandler = this.customAnimationFrameRequester.requestID;
      } else {
        this._frameHandler = this._queueNewFrame(this._boundRenderFunction, this.getHostWindow());
      }
    } else {
      this._renderingQueueLaunched = false;
    }
  }
  /** @internal */
  _renderViews() {
    return false;
  }
  /**
   * Toggle full screen mode
   * @param requestPointerLock defines if a pointer lock should be requested from the user
   */
  switchFullscreen(requestPointerLock) {
    if (this.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen(requestPointerLock);
    }
  }
  /**
   * Enters full screen mode
   * @param requestPointerLock defines if a pointer lock should be requested from the user
   */
  enterFullscreen(requestPointerLock) {
    if (!this.isFullscreen) {
      this._pointerLockRequested = requestPointerLock;
      if (this._renderingCanvas) {
        _Engine._RequestFullscreen(this._renderingCanvas);
      }
    }
  }
  /**
   * Exits full screen mode
   */
  exitFullscreen() {
    if (this.isFullscreen) {
      _Engine._ExitFullscreen();
    }
  }
  /**
   * Enters Pointerlock mode
   */
  enterPointerlock() {
    if (this._renderingCanvas) {
      _Engine._RequestPointerlock(this._renderingCanvas);
    }
  }
  /**
   * Exits Pointerlock mode
   */
  exitPointerlock() {
    _Engine._ExitPointerlock();
  }
  /**
   * Begin a new frame
   */
  beginFrame() {
    this._measureFps();
    this.onBeginFrameObservable.notifyObservers(this);
    super.beginFrame();
  }
  /**
   * End the current frame
   */
  endFrame() {
    super.endFrame();
    this.onEndFrameObservable.notifyObservers(this);
  }
  /**
   * Force a specific size of the canvas
   * @param width defines the new canvas' width
   * @param height defines the new canvas' height
   * @param forceSetSize true to force setting the sizes of the underlying canvas
   * @returns true if the size was changed
   */
  setSize(width, height, forceSetSize = false) {
    if (!this._renderingCanvas) {
      return false;
    }
    if (!super.setSize(width, height, forceSetSize)) {
      return false;
    }
    if (this.scenes) {
      for (let index = 0; index < this.scenes.length; index++) {
        const scene = this.scenes[index];
        for (let camIndex = 0; camIndex < scene.cameras.length; camIndex++) {
          const cam = scene.cameras[camIndex];
          cam._currentRenderId = 0;
        }
      }
      if (this.onResizeObservable.hasObservers()) {
        this.onResizeObservable.notifyObservers(this);
      }
    }
    return true;
  }
  _deletePipelineContext(pipelineContext) {
    const webGLPipelineContext = pipelineContext;
    if (webGLPipelineContext && webGLPipelineContext.program) {
      if (webGLPipelineContext.transformFeedback) {
        this.deleteTransformFeedback(webGLPipelineContext.transformFeedback);
        webGLPipelineContext.transformFeedback = null;
      }
    }
    super._deletePipelineContext(pipelineContext);
  }
  createShaderProgram(pipelineContext, vertexCode, fragmentCode, defines, context, transformFeedbackVaryings = null) {
    context = context || this._gl;
    this.onBeforeShaderCompilationObservable.notifyObservers(this);
    const program = super.createShaderProgram(pipelineContext, vertexCode, fragmentCode, defines, context, transformFeedbackVaryings);
    this.onAfterShaderCompilationObservable.notifyObservers(this);
    return program;
  }
  _createShaderProgram(pipelineContext, vertexShader, fragmentShader, context, transformFeedbackVaryings = null) {
    const shaderProgram = context.createProgram();
    pipelineContext.program = shaderProgram;
    if (!shaderProgram) {
      throw new Error("Unable to create program");
    }
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    if (this.webGLVersion > 1 && transformFeedbackVaryings) {
      const transformFeedback = this.createTransformFeedback();
      this.bindTransformFeedback(transformFeedback);
      this.setTranformFeedbackVaryings(shaderProgram, transformFeedbackVaryings);
      pipelineContext.transformFeedback = transformFeedback;
    }
    context.linkProgram(shaderProgram);
    if (this.webGLVersion > 1 && transformFeedbackVaryings) {
      this.bindTransformFeedback(null);
    }
    pipelineContext.context = context;
    pipelineContext.vertexShader = vertexShader;
    pipelineContext.fragmentShader = fragmentShader;
    if (!pipelineContext.isParallelCompiled) {
      this._finalizePipelineContext(pipelineContext);
    }
    return shaderProgram;
  }
  /**
   * @internal
   */
  _releaseTexture(texture) {
    super._releaseTexture(texture);
  }
  /**
   * @internal
   */
  _releaseRenderTargetWrapper(rtWrapper) {
    super._releaseRenderTargetWrapper(rtWrapper);
    this.scenes.forEach((scene) => {
      scene.postProcesses.forEach((postProcess) => {
        if (postProcess._outputTexture === rtWrapper) {
          postProcess._outputTexture = null;
        }
      });
      scene.cameras.forEach((camera) => {
        camera._postProcesses.forEach((postProcess) => {
          if (postProcess) {
            if (postProcess._outputTexture === rtWrapper) {
              postProcess._outputTexture = null;
            }
          }
        });
      });
    });
  }
  /**
   * Gets the names of the render passes that are currently created
   * @returns list of the render pass names
   */
  getRenderPassNames() {
    return this._renderPassNames;
  }
  /**
   * Gets the name of the current render pass
   * @returns name of the current render pass
   */
  getCurrentRenderPassName() {
    return this._renderPassNames[this.currentRenderPassId];
  }
  /**
   * Creates a render pass id
   * @param name Name of the render pass (for debug purpose only)
   * @returns the id of the new render pass
   */
  createRenderPassId(name) {
    const id = ++_Engine._RenderPassIdCounter;
    this._renderPassNames[id] = name ?? "NONAME";
    return id;
  }
  /**
   * Releases a render pass id
   * @param id id of the render pass to release
   */
  releaseRenderPassId(id) {
    this._renderPassNames[id] = void 0;
    for (let s = 0; s < this.scenes.length; ++s) {
      const scene = this.scenes[s];
      for (let m = 0; m < scene.meshes.length; ++m) {
        const mesh = scene.meshes[m];
        if (mesh.subMeshes) {
          for (let b = 0; b < mesh.subMeshes.length; ++b) {
            const subMesh = mesh.subMeshes[b];
            subMesh._removeDrawWrapper(id);
          }
        }
      }
    }
  }
  /**
   * @internal
   * Rescales a texture
   * @param source input texture
   * @param destination destination texture
   * @param scene scene to use to render the resize
   * @param internalFormat format to use when resizing
   * @param onComplete callback to be called when resize has completed
   */
  _rescaleTexture(source, destination, scene, internalFormat, onComplete) {
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
    const rtt = this.createRenderTargetTexture({
      width: destination.width,
      height: destination.height
    }, {
      generateMipMaps: false,
      type: 0,
      samplingMode: 2,
      generateDepthBuffer: false,
      generateStencilBuffer: false
    });
    if (!this._rescalePostProcess && _Engine._RescalePostProcessFactory) {
      this._rescalePostProcess = _Engine._RescalePostProcessFactory(this);
    }
    if (this._rescalePostProcess) {
      this._rescalePostProcess.externalTextureSamplerBinding = true;
      this._rescalePostProcess.getEffect().executeWhenCompiled(() => {
        this._rescalePostProcess.onApply = function(effect) {
          effect._bindTexture("textureSampler", source);
        };
        let hostingScene = scene;
        if (!hostingScene) {
          hostingScene = this.scenes[this.scenes.length - 1];
        }
        hostingScene.postProcessManager.directRender([this._rescalePostProcess], rtt, true);
        this._bindTextureDirectly(this._gl.TEXTURE_2D, destination, true);
        this._gl.copyTexImage2D(this._gl.TEXTURE_2D, 0, internalFormat, 0, 0, destination.width, destination.height, 0);
        this.unBindFramebuffer(rtt);
        rtt.dispose();
        if (onComplete) {
          onComplete();
        }
      });
    }
  }
  // FPS
  /**
   * Gets the current framerate
   * @returns a number representing the framerate
   */
  getFps() {
    return this._fps;
  }
  /**
   * Gets the time spent between current and previous frame
   * @returns a number representing the delta time in ms
   */
  getDeltaTime() {
    return this._deltaTime;
  }
  _measureFps() {
    this._performanceMonitor.sampleFrame();
    this._fps = this._performanceMonitor.averageFPS;
    this._deltaTime = this._performanceMonitor.instantaneousFrameTime || 0;
  }
  /**
   * Wraps an external web gl texture in a Babylon texture.
   * @param texture defines the external texture
   * @param hasMipMaps defines whether the external texture has mip maps (default: false)
   * @param samplingMode defines the sampling mode for the external texture (default: 3)
   * @param width defines the width for the external texture (default: 0)
   * @param height defines the height for the external texture (default: 0)
   * @returns the babylon internal texture
   */
  wrapWebGLTexture(texture, hasMipMaps = false, samplingMode = 3, width = 0, height = 0) {
    const hardwareTexture = new WebGLHardwareTexture(texture, this._gl);
    const internalTexture = new InternalTexture(this, InternalTextureSource.Unknown, true);
    internalTexture._hardwareTexture = hardwareTexture;
    internalTexture.baseWidth = width;
    internalTexture.baseHeight = height;
    internalTexture.width = width;
    internalTexture.height = height;
    internalTexture.isReady = true;
    internalTexture.useMipMaps = hasMipMaps;
    this.updateTextureSamplingMode(samplingMode, internalTexture);
    return internalTexture;
  }
  /**
   * @internal
   */
  _uploadImageToTexture(texture, image, faceIndex = 0, lod = 0) {
    const gl = this._gl;
    const textureType = this._getWebGLTextureType(texture.type);
    const format = this._getInternalFormat(texture.format);
    const internalFormat = this._getRGBABufferInternalSizedFormat(texture.type, format);
    const bindTarget = texture.isCube ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D;
    this._bindTextureDirectly(bindTarget, texture, true);
    this._unpackFlipY(texture.invertY);
    let target = gl.TEXTURE_2D;
    if (texture.isCube) {
      target = gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex;
    }
    gl.texImage2D(target, lod, internalFormat, format, textureType, image);
    this._bindTextureDirectly(bindTarget, null, true);
  }
  /**
   * Updates a depth texture Comparison Mode and Function.
   * If the comparison Function is equal to 0, the mode will be set to none.
   * Otherwise, this only works in webgl 2 and requires a shadow sampler in the shader.
   * @param texture The texture to set the comparison function for
   * @param comparisonFunction The comparison function to set, 0 if no comparison required
   */
  updateTextureComparisonFunction(texture, comparisonFunction) {
    if (this.webGLVersion === 1) {
      Logger.Error("WebGL 1 does not support texture comparison.");
      return;
    }
    const gl = this._gl;
    if (texture.isCube) {
      this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, texture, true);
      if (comparisonFunction === 0) {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_FUNC, 515);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_MODE, gl.NONE);
      } else {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_FUNC, comparisonFunction);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
      }
      this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);
    } else {
      this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true);
      if (comparisonFunction === 0) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, 515);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.NONE);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, comparisonFunction);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
      }
      this._bindTextureDirectly(this._gl.TEXTURE_2D, null);
    }
    texture._comparisonFunction = comparisonFunction;
  }
  /**
   * Creates a webGL buffer to use with instantiation
   * @param capacity defines the size of the buffer
   * @returns the webGL buffer
   */
  createInstancesBuffer(capacity) {
    const buffer = this._gl.createBuffer();
    if (!buffer) {
      throw new Error("Unable to create instance buffer");
    }
    const result = new WebGLDataBuffer(buffer);
    result.capacity = capacity;
    this.bindArrayBuffer(result);
    this._gl.bufferData(this._gl.ARRAY_BUFFER, capacity, this._gl.DYNAMIC_DRAW);
    result.references = 1;
    return result;
  }
  /**
   * Delete a webGL buffer used with instantiation
   * @param buffer defines the webGL buffer to delete
   */
  deleteInstancesBuffer(buffer) {
    this._gl.deleteBuffer(buffer);
  }
  _clientWaitAsync(sync, flags = 0, intervalms = 10) {
    const gl = this._gl;
    return new Promise((resolve, reject) => {
      const check = () => {
        const res = gl.clientWaitSync(sync, flags, 0);
        if (res == gl.WAIT_FAILED) {
          reject();
          return;
        }
        if (res == gl.TIMEOUT_EXPIRED) {
          setTimeout(check, intervalms);
          return;
        }
        resolve();
      };
      check();
    });
  }
  /**
   * @internal
   */
  _readPixelsAsync(x, y, w, h, format, type, outputBuffer) {
    if (this._webGLVersion < 2) {
      throw new Error("_readPixelsAsync only work on WebGL2+");
    }
    const gl = this._gl;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buf);
    gl.bufferData(gl.PIXEL_PACK_BUFFER, outputBuffer.byteLength, gl.STREAM_READ);
    gl.readPixels(x, y, w, h, format, type, 0);
    gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!sync) {
      return null;
    }
    gl.flush();
    return this._clientWaitAsync(sync, 0, 10).then(() => {
      gl.deleteSync(sync);
      gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buf);
      gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, outputBuffer);
      gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
      gl.deleteBuffer(buf);
      return outputBuffer;
    });
  }
  dispose() {
    this.hideLoadingUI();
    this.onNewSceneAddedObservable.clear();
    while (this.postProcesses.length) {
      this.postProcesses[0].dispose();
    }
    if (this._rescalePostProcess) {
      this._rescalePostProcess.dispose();
    }
    while (this.scenes.length) {
      this.scenes[0].dispose();
    }
    while (this._virtualScenes.length) {
      this._virtualScenes[0].dispose();
    }
    if (EngineStore.Instances.length === 1 && _Engine.audioEngine) {
      _Engine.audioEngine.dispose();
      _Engine.audioEngine = null;
    }
    const hostWindow = this.getHostWindow();
    if (hostWindow && typeof hostWindow.removeEventListener === "function") {
      hostWindow.removeEventListener("blur", this._onBlur);
      hostWindow.removeEventListener("focus", this._onFocus);
    }
    if (this._renderingCanvas) {
      this._renderingCanvas.removeEventListener("focus", this._onCanvasFocus);
      this._renderingCanvas.removeEventListener("blur", this._onCanvasBlur);
      this._renderingCanvas.removeEventListener("pointerout", this._onCanvasPointerOut);
      this._renderingCanvas.removeEventListener("contextmenu", this._onCanvasContextMenu);
    }
    if (IsDocumentAvailable()) {
      document.removeEventListener("fullscreenchange", this._onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", this._onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", this._onFullscreenChange);
      document.removeEventListener("msfullscreenchange", this._onFullscreenChange);
      document.removeEventListener("pointerlockchange", this._onPointerLockChange);
      document.removeEventListener("mspointerlockchange", this._onPointerLockChange);
      document.removeEventListener("mozpointerlockchange", this._onPointerLockChange);
      document.removeEventListener("webkitpointerlockchange", this._onPointerLockChange);
    }
    super.dispose();
    const index = EngineStore.Instances.indexOf(this);
    if (index >= 0) {
      EngineStore.Instances.splice(index, 1);
    }
    if (!_Engine.Instances.length) {
      EngineStore.OnEnginesDisposedObservable.notifyObservers(this);
    }
    this.onResizeObservable.clear();
    this.onCanvasBlurObservable.clear();
    this.onCanvasFocusObservable.clear();
    this.onCanvasPointerOutObservable.clear();
    this.onBeginFrameObservable.clear();
    this.onEndFrameObservable.clear();
  }
  _disableTouchAction() {
    if (!this._renderingCanvas || !this._renderingCanvas.setAttribute) {
      return;
    }
    this._renderingCanvas.setAttribute("touch-action", "none");
    this._renderingCanvas.style.touchAction = "none";
    this._renderingCanvas.style.webkitTapHighlightColor = "transparent";
  }
  // Loading screen
  /**
   * Display the loading screen
   * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
   */
  displayLoadingUI() {
    if (!IsWindowObjectExist()) {
      return;
    }
    const loadingScreen = this.loadingScreen;
    if (loadingScreen) {
      loadingScreen.displayLoadingUI();
    }
  }
  /**
   * Hide the loading screen
   * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
   */
  hideLoadingUI() {
    if (!IsWindowObjectExist()) {
      return;
    }
    const loadingScreen = this._loadingScreen;
    if (loadingScreen) {
      loadingScreen.hideLoadingUI();
    }
  }
  /**
   * Gets the current loading screen object
   * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
   */
  get loadingScreen() {
    if (!this._loadingScreen && this._renderingCanvas) {
      this._loadingScreen = _Engine.DefaultLoadingScreenFactory(this._renderingCanvas);
    }
    return this._loadingScreen;
  }
  /**
   * Sets the current loading screen object
   * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
   */
  set loadingScreen(loadingScreen) {
    this._loadingScreen = loadingScreen;
  }
  /**
   * Sets the current loading screen text
   * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
   */
  set loadingUIText(text) {
    this.loadingScreen.loadingUIText = text;
  }
  /**
   * Sets the current loading screen background color
   * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
   */
  set loadingUIBackgroundColor(color) {
    this.loadingScreen.loadingUIBackgroundColor = color;
  }
  /**
   * creates and returns a new video element
   * @param constraints video constraints
   * @returns video element
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createVideoElement(constraints) {
    return document.createElement("video");
  }
  /** Pointerlock and fullscreen */
  /**
   * Ask the browser to promote the current element to pointerlock mode
   * @param element defines the DOM element to promote
   */
  static _RequestPointerlock(element) {
    if (element.requestPointerLock) {
      const promise = element.requestPointerLock();
      if (promise instanceof Promise)
        promise.then(() => {
          element.focus();
        }).catch(() => {
        });
      else
        element.focus();
    }
  }
  /**
   * Asks the browser to exit pointerlock mode
   */
  static _ExitPointerlock() {
    if (document.exitPointerLock) {
      document.exitPointerLock();
    }
  }
  /**
   * Ask the browser to promote the current element to fullscreen rendering mode
   * @param element defines the DOM element to promote
   */
  static _RequestFullscreen(element) {
    const requestFunction = element.requestFullscreen || element.webkitRequestFullscreen;
    if (!requestFunction) {
      return;
    }
    requestFunction.call(element);
  }
  /**
   * Asks the browser to exit fullscreen mode
   */
  static _ExitFullscreen() {
    const anyDoc = document;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (anyDoc.webkitCancelFullScreen) {
      anyDoc.webkitCancelFullScreen();
    }
  }
  /**
   * Get Font size information
   * @param font font name
   * @returns an object containing ascent, height and descent
   */
  getFontOffset(font) {
    const text = document.createElement("span");
    text.innerHTML = "Hg";
    text.setAttribute("style", `font: ${font} !important`);
    const block = document.createElement("div");
    block.style.display = "inline-block";
    block.style.width = "1px";
    block.style.height = "0px";
    block.style.verticalAlign = "bottom";
    const div = document.createElement("div");
    div.style.whiteSpace = "nowrap";
    div.appendChild(text);
    div.appendChild(block);
    document.body.appendChild(div);
    let fontAscent = 0;
    let fontHeight = 0;
    try {
      fontHeight = block.getBoundingClientRect().top - text.getBoundingClientRect().top;
      block.style.verticalAlign = "baseline";
      fontAscent = block.getBoundingClientRect().top - text.getBoundingClientRect().top;
    } finally {
      document.body.removeChild(div);
    }
    return { ascent: fontAscent, height: fontHeight, descent: fontHeight - fontAscent };
  }
};
Engine.ALPHA_DISABLE = 0;
Engine.ALPHA_ADD = 1;
Engine.ALPHA_COMBINE = 2;
Engine.ALPHA_SUBTRACT = 3;
Engine.ALPHA_MULTIPLY = 4;
Engine.ALPHA_MAXIMIZED = 5;
Engine.ALPHA_ONEONE = 6;
Engine.ALPHA_PREMULTIPLIED = 7;
Engine.ALPHA_PREMULTIPLIED_PORTERDUFF = 8;
Engine.ALPHA_INTERPOLATE = 9;
Engine.ALPHA_SCREENMODE = 10;
Engine.DELAYLOADSTATE_NONE = 0;
Engine.DELAYLOADSTATE_LOADED = 1;
Engine.DELAYLOADSTATE_LOADING = 2;
Engine.DELAYLOADSTATE_NOTLOADED = 4;
Engine.NEVER = 512;
Engine.ALWAYS = 519;
Engine.LESS = 513;
Engine.EQUAL = 514;
Engine.LEQUAL = 515;
Engine.GREATER = 516;
Engine.GEQUAL = 518;
Engine.NOTEQUAL = 517;
Engine.KEEP = 7680;
Engine.REPLACE = 7681;
Engine.INCR = 7682;
Engine.DECR = 7683;
Engine.INVERT = 5386;
Engine.INCR_WRAP = 34055;
Engine.DECR_WRAP = 34056;
Engine.TEXTURE_CLAMP_ADDRESSMODE = 0;
Engine.TEXTURE_WRAP_ADDRESSMODE = 1;
Engine.TEXTURE_MIRROR_ADDRESSMODE = 2;
Engine.TEXTUREFORMAT_ALPHA = 0;
Engine.TEXTUREFORMAT_LUMINANCE = 1;
Engine.TEXTUREFORMAT_LUMINANCE_ALPHA = 2;
Engine.TEXTUREFORMAT_RGB = 4;
Engine.TEXTUREFORMAT_RGBA = 5;
Engine.TEXTUREFORMAT_RED = 6;
Engine.TEXTUREFORMAT_R = 6;
Engine.TEXTUREFORMAT_RG = 7;
Engine.TEXTUREFORMAT_RED_INTEGER = 8;
Engine.TEXTUREFORMAT_R_INTEGER = 8;
Engine.TEXTUREFORMAT_RG_INTEGER = 9;
Engine.TEXTUREFORMAT_RGB_INTEGER = 10;
Engine.TEXTUREFORMAT_RGBA_INTEGER = 11;
Engine.TEXTURETYPE_UNSIGNED_BYTE = 0;
Engine.TEXTURETYPE_UNSIGNED_INT = 0;
Engine.TEXTURETYPE_FLOAT = 1;
Engine.TEXTURETYPE_HALF_FLOAT = 2;
Engine.TEXTURETYPE_BYTE = 3;
Engine.TEXTURETYPE_SHORT = 4;
Engine.TEXTURETYPE_UNSIGNED_SHORT = 5;
Engine.TEXTURETYPE_INT = 6;
Engine.TEXTURETYPE_UNSIGNED_INTEGER = 7;
Engine.TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4 = 8;
Engine.TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1 = 9;
Engine.TEXTURETYPE_UNSIGNED_SHORT_5_6_5 = 10;
Engine.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV = 11;
Engine.TEXTURETYPE_UNSIGNED_INT_24_8 = 12;
Engine.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV = 13;
Engine.TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV = 14;
Engine.TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV = 15;
Engine.TEXTURE_NEAREST_SAMPLINGMODE = 1;
Engine.TEXTURE_BILINEAR_SAMPLINGMODE = 2;
Engine.TEXTURE_TRILINEAR_SAMPLINGMODE = 3;
Engine.TEXTURE_NEAREST_NEAREST_MIPLINEAR = 8;
Engine.TEXTURE_LINEAR_LINEAR_MIPNEAREST = 11;
Engine.TEXTURE_LINEAR_LINEAR_MIPLINEAR = 3;
Engine.TEXTURE_NEAREST_NEAREST_MIPNEAREST = 4;
Engine.TEXTURE_NEAREST_LINEAR_MIPNEAREST = 5;
Engine.TEXTURE_NEAREST_LINEAR_MIPLINEAR = 6;
Engine.TEXTURE_NEAREST_LINEAR = 7;
Engine.TEXTURE_NEAREST_NEAREST = 1;
Engine.TEXTURE_LINEAR_NEAREST_MIPNEAREST = 9;
Engine.TEXTURE_LINEAR_NEAREST_MIPLINEAR = 10;
Engine.TEXTURE_LINEAR_LINEAR = 2;
Engine.TEXTURE_LINEAR_NEAREST = 12;
Engine.TEXTURE_EXPLICIT_MODE = 0;
Engine.TEXTURE_SPHERICAL_MODE = 1;
Engine.TEXTURE_PLANAR_MODE = 2;
Engine.TEXTURE_CUBIC_MODE = 3;
Engine.TEXTURE_PROJECTION_MODE = 4;
Engine.TEXTURE_SKYBOX_MODE = 5;
Engine.TEXTURE_INVCUBIC_MODE = 6;
Engine.TEXTURE_EQUIRECTANGULAR_MODE = 7;
Engine.TEXTURE_FIXED_EQUIRECTANGULAR_MODE = 8;
Engine.TEXTURE_FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;
Engine.SCALEMODE_FLOOR = 1;
Engine.SCALEMODE_NEAREST = 2;
Engine.SCALEMODE_CEILING = 3;
Engine._RescalePostProcessFactory = null;
Engine._RenderPassIdCounter = 0;

export {
  PerformanceMonitor,
  RollingAverage,
  allocateAndCopyTypedBuffer,
  Engine
};
//# sourceMappingURL=chunk-WUNB6MKX.js.map
