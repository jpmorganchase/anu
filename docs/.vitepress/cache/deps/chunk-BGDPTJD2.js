import {
  AbstractMesh,
  Axis,
  BezierCurve,
  BindBonesParameters,
  BindFogParameters,
  BindLights,
  BindLogDepth,
  BindMorphTargetParameters,
  BindSceneUniformBuffer,
  BindTextureMatrix,
  BoundingSphere,
  Camera,
  CompatibilityOptions,
  Coordinate,
  Curve3,
  EffectFallbacks,
  HandleFallbacksForShadows,
  IntersectionInfo,
  Material,
  MaterialDefines,
  MaterialPluginEvent,
  Mesh,
  Node,
  NodeMaterial,
  PrepareAttributesForBakedVertexAnimation,
  PrepareAttributesForBones,
  PrepareAttributesForInstances,
  PrepareAttributesForMorphTargets,
  PrepareDefinesForAttributes,
  PrepareDefinesForFrameBoundValues,
  PrepareDefinesForLights,
  PrepareDefinesForMergedUV,
  PrepareDefinesForMisc,
  PrepareDefinesForMultiview,
  PrepareDefinesForOIT,
  PrepareDefinesForPrePass,
  PrepareUniformsAndSamplersList,
  PushAttributesForInstances,
  PushMaterial,
  RenderTargetTexture,
  SceneLoader,
  Size,
  Space,
  SubMesh,
  Texture,
  TransformNode,
  VertexData,
  Viewport,
  WebXRAbstractFeature,
  WebXRHandTracking,
  _CreationDataStorage,
  addClipPlaneUniforms,
  bindClipPlane,
  init_WebXRAbstractFeature,
  init_WebXRHandTracking,
  init_abstractMesh,
  init_boundingSphere,
  init_camera,
  init_clipPlaneMaterialHelper,
  init_compatibilityOptions,
  init_effectFallbacks,
  init_intersectionInfo,
  init_material,
  init_materialDefines,
  init_materialHelper_functions,
  init_materialPluginEvent,
  init_math_axis,
  init_math_path,
  init_math_size,
  init_math_viewport,
  init_mesh,
  init_mesh_vertexData,
  init_node,
  init_nodeMaterial,
  init_pushMaterial,
  init_renderTargetTexture,
  init_sceneLoader,
  init_subMesh,
  init_texture,
  init_transformNode,
  prepareStringDefinesForClipPlanes
} from "./chunk-LKAP33XN.js";
import {
  EventConstants,
  ImageProcessingConfiguration,
  KeyboardEventTypes,
  LightConstants,
  PickingInfo,
  Plane,
  PointerEventTypes,
  PointerInfo,
  Scene,
  SceneComponentConstants,
  SerializationHelper,
  SmartArray,
  UniformBuffer,
  VertexBuffer,
  __decorate,
  expandToProperty,
  init_buffer,
  init_decorators,
  init_decorators_serialization,
  init_deviceInputEvents,
  init_imageProcessingConfiguration,
  init_keyboardEvents,
  init_lightConstants,
  init_math_plane,
  init_pickingInfo,
  init_pointerEvents,
  init_scene,
  init_sceneComponent,
  init_smartArray,
  init_tslib_es6,
  init_uniformBuffer,
  serialize,
  serializeAsColor3,
  serializeAsFresnelParameters,
  serializeAsMeshReference,
  serializeAsTexture,
  serializeAsVector3
} from "./chunk-HR5KTCVE.js";
import {
  Color3,
  Color4,
  Scalar,
  TmpColors,
  init_math_color,
  init_math_scalar
} from "./chunk-AA3MBXDE.js";
import {
  Engine,
  init_engine
} from "./chunk-5SWTPNQ2.js";
import {
  Matrix,
  Quaternion,
  TmpVectors,
  Vector2,
  Vector3,
  Vector4,
  init_math_vector
} from "./chunk-TESUJ6ZX.js";
import {
  ArrayTools,
  Epsilon,
  init_arrayTools,
  init_math_constants
} from "./chunk-G4HJMV2J.js";
import {
  WebXRFeatureName,
  WebXRFeaturesManager,
  init_webXRFeaturesManager
} from "./chunk-BBK2SF62.js";
import {
  DeepCopier,
  Tools,
  WebRequest,
  init_deepCopier,
  init_tools,
  init_webRequest
} from "./chunk-TOSJRSWD.js";
import {
  InternalTexture,
  InternalTextureSource,
  IsWindowObjectExist,
  Logger,
  ShaderLanguage,
  ShaderProcessor,
  ShaderStore,
  ThinEngine,
  WebGLHardwareTexture,
  init_domManagement,
  init_internalTexture,
  init_logger,
  init_shaderLanguage,
  init_shaderProcessor,
  init_shaderStore,
  init_thinEngine,
  init_webGLHardwareTexture
} from "./chunk-655E2T6V.js";
import {
  GetClass,
  RegisterClass,
  init_typeStore
} from "./chunk-WM5N7J5Q.js";
import {
  EngineStore,
  Observable,
  init_engineStore,
  init_observable
} from "./chunk-AD6Y6P3L.js";
import {
  __esm
} from "./chunk-CF3WPAMV.js";

// node_modules/@babylonjs/core/XR/webXRLayerWrapper.js
var WebXRLayerWrapper;
var init_webXRLayerWrapper = __esm({
  "node_modules/@babylonjs/core/XR/webXRLayerWrapper.js"() {
    WebXRLayerWrapper = class {
      /**
       * Check if fixed foveation is supported on this device
       */
      get isFixedFoveationSupported() {
        return this.layerType == "XRWebGLLayer" && typeof this.layer.fixedFoveation == "number";
      }
      /**
       * Get the fixed foveation currently set, as specified by the webxr specs
       * If this returns null, then fixed foveation is not supported
       */
      get fixedFoveation() {
        if (this.isFixedFoveationSupported) {
          return this.layer.fixedFoveation;
        }
        return null;
      }
      /**
       * Set the fixed foveation to the specified value, as specified by the webxr specs
       * This value will be normalized to be between 0 and 1, 1 being max foveation, 0 being no foveation
       */
      set fixedFoveation(value) {
        if (this.isFixedFoveationSupported) {
          const val = Math.max(0, Math.min(1, value || 0));
          this.layer.fixedFoveation = val;
        }
      }
      /**
       * Create a render target provider for the wrapped layer.
       * @param xrSessionManager The XR Session Manager
       * @returns A new render target texture provider for the wrapped layer.
       */
      createRenderTargetTextureProvider(xrSessionManager) {
        this._rttWrapper = this._createRenderTargetTextureProvider(xrSessionManager);
        return this._rttWrapper;
      }
      dispose() {
        if (this._rttWrapper) {
          this._rttWrapper.dispose();
          this._rttWrapper = null;
        }
      }
      constructor(getWidth, getHeight, layer, layerType, _createRenderTargetTextureProvider) {
        this.getWidth = getWidth;
        this.getHeight = getHeight;
        this.layer = layer;
        this.layerType = layerType;
        this._createRenderTargetTextureProvider = _createRenderTargetTextureProvider;
        this._rttWrapper = null;
      }
    };
  }
});

// node_modules/@babylonjs/core/Materials/Textures/MultiviewRenderTarget.js
var MultiviewRenderTarget;
var init_MultiviewRenderTarget = __esm({
  "node_modules/@babylonjs/core/Materials/Textures/MultiviewRenderTarget.js"() {
    init_renderTargetTexture();
    MultiviewRenderTarget = class extends RenderTargetTexture {
      set samples(value) {
        this._samples = value;
      }
      get samples() {
        return this._samples;
      }
      /**
       * Creates a multiview render target
       * @param scene scene used with the render target
       * @param size the size of the render target (used for each view)
       */
      constructor(scene, size = 512) {
        super("multiview rtt", size, scene, false, true, 0, false, void 0, false, false, true, void 0, true);
        this._renderTarget = this.getScene().getEngine().createMultiviewRenderTargetTexture(this.getRenderWidth(), this.getRenderHeight());
        this._texture = this._renderTarget.texture;
        this._texture.isMultiview = true;
        this._texture.format = 5;
        this.samples = this._getEngine().getCaps().maxSamples || this.samples;
        this._texture.samples = this._samples;
      }
      /**
       * @internal
       */
      _bindFrameBuffer() {
        if (!this._renderTarget) {
          return;
        }
        this.getScene().getEngine().bindMultiviewFramebuffer(this._renderTarget);
      }
      /**
       * Gets the number of views the corresponding to the texture (eg. a MultiviewRenderTarget will have > 1)
       * @returns the view count
       */
      getViewCount() {
        return 2;
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/webXRRenderTargetTextureProvider.js
var WebXRLayerRenderTargetTextureProvider;
var init_webXRRenderTargetTextureProvider = __esm({
  "node_modules/@babylonjs/core/XR/webXRRenderTargetTextureProvider.js"() {
    init_webGLHardwareTexture();
    init_internalTexture();
    init_MultiviewRenderTarget();
    init_renderTargetTexture();
    WebXRLayerRenderTargetTextureProvider = class {
      constructor(_scene, layerWrapper) {
        this._scene = _scene;
        this.layerWrapper = layerWrapper;
        this._renderTargetTextures = new Array();
        this._engine = _scene.getEngine();
      }
      _createInternalTexture(textureSize, texture) {
        const internalTexture = new InternalTexture(this._engine, InternalTextureSource.Unknown, true);
        internalTexture.width = textureSize.width;
        internalTexture.height = textureSize.height;
        internalTexture._hardwareTexture = new WebGLHardwareTexture(texture, this._engine._gl);
        internalTexture.isReady = true;
        return internalTexture;
      }
      _createRenderTargetTexture(width, height, framebuffer, colorTexture, depthStencilTexture, multiview) {
        if (!this._engine) {
          throw new Error("Engine is disposed");
        }
        const textureSize = { width, height };
        const renderTargetTexture = multiview ? new MultiviewRenderTarget(this._scene, textureSize) : new RenderTargetTexture("XR renderTargetTexture", textureSize, this._scene);
        const renderTargetWrapper = renderTargetTexture.renderTarget;
        renderTargetWrapper._samples = renderTargetTexture.samples;
        if (framebuffer || !colorTexture) {
          renderTargetWrapper._framebuffer = framebuffer;
        }
        if (colorTexture) {
          if (multiview) {
            renderTargetWrapper._colorTextureArray = colorTexture;
          } else {
            const internalTexture = this._createInternalTexture(textureSize, colorTexture);
            renderTargetWrapper.setTexture(internalTexture, 0);
            renderTargetTexture._texture = internalTexture;
          }
        }
        if (depthStencilTexture) {
          if (multiview) {
            renderTargetWrapper._depthStencilTextureArray = depthStencilTexture;
          } else {
            renderTargetWrapper._depthStencilTexture = this._createInternalTexture(textureSize, depthStencilTexture);
          }
        }
        renderTargetTexture.disableRescaling();
        this._renderTargetTextures.push(renderTargetTexture);
        return renderTargetTexture;
      }
      _destroyRenderTargetTexture(renderTargetTexture) {
        this._renderTargetTextures.splice(this._renderTargetTextures.indexOf(renderTargetTexture), 1);
        renderTargetTexture.dispose();
      }
      getFramebufferDimensions() {
        return this._framebufferDimensions;
      }
      dispose() {
        this._renderTargetTextures.forEach((rtt) => rtt.dispose());
        this._renderTargetTextures.length = 0;
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/webXRWebGLLayer.js
var WebXRWebGLLayerWrapper, WebXRWebGLLayerRenderTargetTextureProvider;
var init_webXRWebGLLayer = __esm({
  "node_modules/@babylonjs/core/XR/webXRWebGLLayer.js"() {
    init_webXRLayerWrapper();
    init_webXRRenderTargetTextureProvider();
    WebXRWebGLLayerWrapper = class extends WebXRLayerWrapper {
      /**
       * @param layer is the layer to be wrapped.
       * @returns a new WebXRLayerWrapper wrapping the provided XRWebGLLayer.
       */
      constructor(layer) {
        super(() => layer.framebufferWidth, () => layer.framebufferHeight, layer, "XRWebGLLayer", (sessionManager) => new WebXRWebGLLayerRenderTargetTextureProvider(sessionManager.scene, this));
        this.layer = layer;
      }
    };
    WebXRWebGLLayerRenderTargetTextureProvider = class extends WebXRLayerRenderTargetTextureProvider {
      constructor(scene, layerWrapper) {
        super(scene, layerWrapper);
        this.layerWrapper = layerWrapper;
        this._layer = layerWrapper.layer;
        this._framebufferDimensions = {
          framebufferWidth: this._layer.framebufferWidth,
          framebufferHeight: this._layer.framebufferHeight
        };
      }
      trySetViewportForView(viewport, view) {
        const xrViewport = this._layer.getViewport(view);
        if (!xrViewport) {
          return false;
        }
        const framebufferWidth = this._framebufferDimensions.framebufferWidth;
        const framebufferHeight = this._framebufferDimensions.framebufferHeight;
        viewport.x = xrViewport.x / framebufferWidth;
        viewport.y = xrViewport.y / framebufferHeight;
        viewport.width = xrViewport.width / framebufferWidth;
        viewport.height = xrViewport.height / framebufferHeight;
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getRenderTargetTextureForEye(eye) {
        const layerWidth = this._layer.framebufferWidth;
        const layerHeight = this._layer.framebufferHeight;
        const framebuffer = this._layer.framebuffer;
        if (!this._rtt || layerWidth !== this._framebufferDimensions.framebufferWidth || layerHeight !== this._framebufferDimensions.framebufferHeight || framebuffer !== this._framebuffer) {
          this._rtt = this._createRenderTargetTexture(layerWidth, layerHeight, framebuffer);
          this._framebufferDimensions.framebufferWidth = layerWidth;
          this._framebufferDimensions.framebufferHeight = layerHeight;
          this._framebuffer = framebuffer;
        }
        return this._rtt;
      }
      getRenderTargetTextureForView(view) {
        return this.getRenderTargetTextureForEye(view.eye);
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/webXRManagedOutputCanvas.js
var WebXRManagedOutputCanvasOptions, WebXRManagedOutputCanvas;
var init_webXRManagedOutputCanvas = __esm({
  "node_modules/@babylonjs/core/XR/webXRManagedOutputCanvas.js"() {
    init_observable();
    init_tools();
    init_webXRWebGLLayer();
    WebXRManagedOutputCanvasOptions = class _WebXRManagedOutputCanvasOptions {
      /**
       * Get the default values of the configuration object
       * @param engine defines the engine to use (can be null)
       * @returns default values of this configuration object
       */
      static GetDefaults(engine) {
        const defaults = new _WebXRManagedOutputCanvasOptions();
        defaults.canvasOptions = {
          antialias: true,
          depth: true,
          stencil: engine ? engine.isStencilEnable : true,
          alpha: true,
          framebufferScaleFactor: 1
        };
        defaults.newCanvasCssStyle = "position:absolute; bottom:0px;right:0px;z-index:10;width:90%;height:100%;background-color: #000000;";
        return defaults;
      }
    };
    WebXRManagedOutputCanvas = class {
      /**
       * Initializes the canvas to be added/removed upon entering/exiting xr
       * @param _xrSessionManager The XR Session manager
       * @param _options optional configuration for this canvas output. defaults will be used if not provided
       */
      constructor(_xrSessionManager, _options = WebXRManagedOutputCanvasOptions.GetDefaults()) {
        this._options = _options;
        this._canvas = null;
        this._engine = null;
        this.xrLayer = null;
        this._xrLayerWrapper = null;
        this.onXRLayerInitObservable = new Observable();
        this._engine = _xrSessionManager.scene.getEngine();
        this._engine.onDisposeObservable.addOnce(() => {
          this._engine = null;
        });
        if (!_options.canvasElement) {
          const canvas = document.createElement("canvas");
          canvas.style.cssText = this._options.newCanvasCssStyle || "position:absolute; bottom:0px;right:0px;";
          this._setManagedOutputCanvas(canvas);
        } else {
          this._setManagedOutputCanvas(_options.canvasElement);
        }
        _xrSessionManager.onXRSessionInit.add(() => {
          this._addCanvas();
        });
        _xrSessionManager.onXRSessionEnded.add(() => {
          this._removeCanvas();
        });
      }
      /**
       * Disposes of the object
       */
      dispose() {
        this._removeCanvas();
        this._setManagedOutputCanvas(null);
      }
      /**
       * Initializes a XRWebGLLayer to be used as the session's baseLayer.
       * @param xrSession xr session
       * @returns a promise that will resolve once the XR Layer has been created
       */
      async initializeXRLayerAsync(xrSession) {
        const createLayer = () => {
          this.xrLayer = new XRWebGLLayer(xrSession, this.canvasContext, this._options.canvasOptions);
          this._xrLayerWrapper = new WebXRWebGLLayerWrapper(this.xrLayer);
          this.onXRLayerInitObservable.notifyObservers(this.xrLayer);
          return this.xrLayer;
        };
        if (!this.canvasContext.makeXRCompatible) {
          return Promise.resolve(createLayer());
        }
        return this.canvasContext.makeXRCompatible().then(
          // catch any error and continue. When using the emulator is throws this error for no apparent reason.
          () => {
          },
          () => {
            Tools.Warn("Error executing makeXRCompatible. This does not mean that the session will work incorrectly.");
          }
        ).then(() => {
          return createLayer();
        });
      }
      _addCanvas() {
        if (this._canvas && this._engine && this._canvas !== this._engine.getRenderingCanvas()) {
          document.body.appendChild(this._canvas);
        }
        if (this.xrLayer) {
          this._setCanvasSize(true);
        } else {
          this.onXRLayerInitObservable.addOnce(() => {
            this._setCanvasSize(true);
          });
        }
      }
      _removeCanvas() {
        if (this._canvas && this._engine && document.body.contains(this._canvas) && this._canvas !== this._engine.getRenderingCanvas()) {
          document.body.removeChild(this._canvas);
        }
        this._setCanvasSize(false);
      }
      _setCanvasSize(init = true, xrLayer = this._xrLayerWrapper) {
        if (!this._canvas || !this._engine) {
          return;
        }
        if (init) {
          if (xrLayer) {
            if (this._canvas !== this._engine.getRenderingCanvas()) {
              this._canvas.style.width = xrLayer.getWidth() + "px";
              this._canvas.style.height = xrLayer.getHeight() + "px";
            } else {
              this._engine.setSize(xrLayer.getWidth(), xrLayer.getHeight());
            }
          }
        } else {
          if (this._originalCanvasSize) {
            if (this._canvas !== this._engine.getRenderingCanvas()) {
              this._canvas.style.width = this._originalCanvasSize.width + "px";
              this._canvas.style.height = this._originalCanvasSize.height + "px";
            } else {
              this._engine.setSize(this._originalCanvasSize.width, this._originalCanvasSize.height);
            }
          }
        }
      }
      _setManagedOutputCanvas(canvas) {
        this._removeCanvas();
        if (!canvas) {
          this._canvas = null;
          this.canvasContext = null;
        } else {
          this._originalCanvasSize = {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight
          };
          this._canvas = canvas;
          this.canvasContext = this._canvas.getContext("webgl2");
          if (!this.canvasContext) {
            this.canvasContext = this._canvas.getContext("webgl");
          }
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/native/nativeXRRenderTarget.js
var NativeXRLayerWrapper, NativeXRLayerRenderTargetTextureProvider, NativeXRRenderTarget;
var init_nativeXRRenderTarget = __esm({
  "node_modules/@babylonjs/core/XR/native/nativeXRRenderTarget.js"() {
    init_webXRLayerWrapper();
    init_webXRRenderTargetTextureProvider();
    NativeXRLayerWrapper = class extends WebXRLayerWrapper {
      constructor(layer) {
        super(() => layer.framebufferWidth, () => layer.framebufferHeight, layer, "XRWebGLLayer", (sessionManager) => new NativeXRLayerRenderTargetTextureProvider(sessionManager, this));
        this.layer = layer;
      }
    };
    NativeXRLayerRenderTargetTextureProvider = class extends WebXRLayerRenderTargetTextureProvider {
      constructor(sessionManager, layerWrapper) {
        super(sessionManager.scene, layerWrapper);
        this.layerWrapper = layerWrapper;
        this._nativeRTTProvider = navigator.xr.getNativeRenderTargetProvider(sessionManager.session, this._createRenderTargetTexture.bind(this), this._destroyRenderTargetTexture.bind(this));
        this._nativeLayer = layerWrapper.layer;
      }
      trySetViewportForView(viewport) {
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = 1;
        viewport.height = 1;
        return true;
      }
      getRenderTargetTextureForEye(eye) {
        return this._nativeRTTProvider.getRenderTargetForEye(eye);
      }
      getRenderTargetTextureForView(view) {
        return this._nativeRTTProvider.getRenderTargetForEye(view.eye);
      }
      getFramebufferDimensions() {
        return {
          framebufferWidth: this._nativeLayer.framebufferWidth,
          framebufferHeight: this._nativeLayer.framebufferHeight
        };
      }
    };
    NativeXRRenderTarget = class {
      constructor(_xrSessionManager) {
        this._nativeRenderTarget = navigator.xr.getWebXRRenderTarget(_xrSessionManager.scene.getEngine());
      }
      async initializeXRLayerAsync(xrSession) {
        await this._nativeRenderTarget.initializeXRLayerAsync(xrSession);
        this.xrLayer = this._nativeRenderTarget.xrLayer;
        return this.xrLayer;
      }
      dispose() {
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/webXRSessionManager.js
var WebXRSessionManager;
var init_webXRSessionManager = __esm({
  "node_modules/@babylonjs/core/XR/webXRSessionManager.js"() {
    init_logger();
    init_observable();
    init_webXRManagedOutputCanvas();
    init_nativeXRRenderTarget();
    init_webXRWebGLLayer();
    WebXRSessionManager = class _WebXRSessionManager {
      /**
       * Scale factor to apply to all XR-related elements (camera, controllers)
       */
      get worldScalingFactor() {
        return this._worldScalingFactor;
      }
      set worldScalingFactor(value) {
        const oldValue = this._worldScalingFactor;
        this._worldScalingFactor = value;
        this.onWorldScaleFactorChangedObservable.notifyObservers({
          previousScaleFactor: oldValue,
          newScaleFactor: value
        });
      }
      /**
       * Constructs a WebXRSessionManager, this must be initialized within a user action before usage
       * @param scene The scene which the session should be created for
       */
      constructor(scene) {
        this.scene = scene;
        this.currentTimestamp = -1;
        this.defaultHeightCompensation = 1.7;
        this.onXRFrameObservable = new Observable();
        this.onXRReferenceSpaceChanged = new Observable();
        this.onXRSessionEnded = new Observable();
        this.onXRSessionInit = new Observable();
        this.onXRReferenceSpaceInitialized = new Observable();
        this.onXRReady = new Observable();
        this.inXRFrameLoop = false;
        this.inXRSession = false;
        this._worldScalingFactor = 1;
        this.onWorldScaleFactorChangedObservable = new Observable(void 0, true);
        this._engine = scene.getEngine();
        this._onEngineDisposedObserver = this._engine.onDisposeObservable.addOnce(() => {
          this._engine = null;
        });
        scene.onDisposeObservable.addOnce(() => {
          this.dispose();
        });
      }
      /**
       * The current reference space used in this session. This reference space can constantly change!
       * It is mainly used to offset the camera's position.
       */
      get referenceSpace() {
        return this._referenceSpace;
      }
      /**
       * Set a new reference space and triggers the observable
       */
      set referenceSpace(newReferenceSpace) {
        this._referenceSpace = newReferenceSpace;
        this.onXRReferenceSpaceChanged.notifyObservers(this._referenceSpace);
      }
      /**
       * The mode for the managed XR session
       */
      get sessionMode() {
        return this._sessionMode;
      }
      /**
       * Disposes of the session manager
       * This should be called explicitly by the dev, if required.
       */
      dispose() {
        var _a;
        if (this.inXRSession) {
          this.exitXRAsync();
        }
        this.onXRFrameObservable.clear();
        this.onXRSessionEnded.clear();
        this.onXRReferenceSpaceChanged.clear();
        this.onXRSessionInit.clear();
        this.onWorldScaleFactorChangedObservable.clear();
        (_a = this._engine) == null ? void 0 : _a.onDisposeObservable.remove(this._onEngineDisposedObserver);
        this._engine = null;
      }
      /**
       * Stops the xrSession and restores the render loop
       * @returns Promise which resolves after it exits XR
       */
      async exitXRAsync() {
        if (this.session && this.inXRSession) {
          this.inXRSession = false;
          try {
            return await this.session.end();
          } catch {
            Logger.Warn("Could not end XR session.");
          }
        }
        return Promise.resolve();
      }
      /**
       * Attempts to set the framebuffer-size-normalized viewport to be rendered this frame for this view.
       * In the event of a failure, the supplied viewport is not updated.
       * @param viewport the viewport to which the view will be rendered
       * @param view the view for which to set the viewport
       * @returns whether the operation was successful
       */
      trySetViewportForView(viewport, view) {
        var _a;
        return ((_a = this._baseLayerRTTProvider) == null ? void 0 : _a.trySetViewportForView(viewport, view)) || false;
      }
      /**
       * Gets the correct render target texture to be rendered this frame for this eye
       * @param eye the eye for which to get the render target
       * @returns the render target for the specified eye or null if not available
       */
      getRenderTargetTextureForEye(eye) {
        var _a;
        return ((_a = this._baseLayerRTTProvider) == null ? void 0 : _a.getRenderTargetTextureForEye(eye)) || null;
      }
      /**
       * Gets the correct render target texture to be rendered this frame for this view
       * @param view the view for which to get the render target
       * @returns the render target for the specified view or null if not available
       */
      getRenderTargetTextureForView(view) {
        var _a;
        return ((_a = this._baseLayerRTTProvider) == null ? void 0 : _a.getRenderTargetTextureForView(view)) || null;
      }
      /**
       * Creates a WebXRRenderTarget object for the XR session
       * @param options optional options to provide when creating a new render target
       * @returns a WebXR render target to which the session can render
       */
      getWebXRRenderTarget(options) {
        const engine = this.scene.getEngine();
        if (this._xrNavigator.xr.native) {
          return new NativeXRRenderTarget(this);
        } else {
          options = options || WebXRManagedOutputCanvasOptions.GetDefaults(engine);
          options.canvasElement = options.canvasElement || engine.getRenderingCanvas() || void 0;
          return new WebXRManagedOutputCanvas(this, options);
        }
      }
      /**
       * Initializes the manager
       * After initialization enterXR can be called to start an XR session
       * @returns Promise which resolves after it is initialized
       */
      initializeAsync() {
        this._xrNavigator = navigator;
        if (!this._xrNavigator.xr) {
          return Promise.reject("WebXR not available");
        }
        return Promise.resolve();
      }
      /**
       * Initializes an xr session
       * @param xrSessionMode mode to initialize
       * @param xrSessionInit defines optional and required values to pass to the session builder
       * @returns a promise which will resolve once the session has been initialized
       */
      initializeSessionAsync(xrSessionMode = "immersive-vr", xrSessionInit = {}) {
        return this._xrNavigator.xr.requestSession(xrSessionMode, xrSessionInit).then((session) => {
          this.session = session;
          this._sessionMode = xrSessionMode;
          this.inXRSession = true;
          this.onXRSessionInit.notifyObservers(session);
          this.session.addEventListener("end", () => {
            var _a;
            this.inXRSession = false;
            this.onXRSessionEnded.notifyObservers(null);
            if (this._engine) {
              this._engine.framebufferDimensionsObject = null;
              this._engine.restoreDefaultFramebuffer();
              this._engine.customAnimationFrameRequester = null;
              this._engine._renderLoop();
            }
            if (this.isNative) {
              (_a = this._baseLayerRTTProvider) == null ? void 0 : _a.dispose();
            }
            this._baseLayerRTTProvider = null;
            this._baseLayerWrapper = null;
          }, { once: true });
          return this.session;
        });
      }
      /**
       * Checks if a session would be supported for the creation options specified
       * @param sessionMode session mode to check if supported eg. immersive-vr
       * @returns A Promise that resolves to true if supported and false if not
       */
      isSessionSupportedAsync(sessionMode) {
        return _WebXRSessionManager.IsSessionSupportedAsync(sessionMode);
      }
      /**
       * Resets the reference space to the one started the session
       */
      resetReferenceSpace() {
        this.referenceSpace = this.baseReferenceSpace;
      }
      /**
       * Starts rendering to the xr layer
       */
      runXRRenderLoop() {
        var _a;
        if (!this.inXRSession || !this._engine) {
          return;
        }
        this._engine.customAnimationFrameRequester = {
          requestAnimationFrame: (callback) => this.session.requestAnimationFrame(callback),
          renderFunction: (timestamp, xrFrame) => {
            var _a2;
            if (!this.inXRSession || !this._engine) {
              return;
            }
            this.currentFrame = xrFrame;
            this.currentTimestamp = timestamp;
            if (xrFrame) {
              this.inXRFrameLoop = true;
              const framebufferDimensionsObject = ((_a2 = this._baseLayerRTTProvider) == null ? void 0 : _a2.getFramebufferDimensions()) || null;
              if (this._engine.framebufferDimensionsObject !== framebufferDimensionsObject) {
                this._engine.framebufferDimensionsObject = framebufferDimensionsObject;
              }
              this.onXRFrameObservable.notifyObservers(xrFrame);
              this._engine._renderLoop();
              this._engine.framebufferDimensionsObject = null;
              this.inXRFrameLoop = false;
            }
          }
        };
        this._engine.framebufferDimensionsObject = ((_a = this._baseLayerRTTProvider) == null ? void 0 : _a.getFramebufferDimensions()) || null;
        this.onXRFrameObservable.addOnce(() => {
          this.onXRReady.notifyObservers(this);
        });
        if (typeof window !== "undefined" && window.cancelAnimationFrame) {
          window.cancelAnimationFrame(this._engine._frameHandler);
        }
        this._engine._renderLoop();
      }
      /**
       * Sets the reference space on the xr session
       * @param referenceSpaceType space to set
       * @returns a promise that will resolve once the reference space has been set
       */
      setReferenceSpaceTypeAsync(referenceSpaceType = "local-floor") {
        return this.session.requestReferenceSpace(referenceSpaceType).then((referenceSpace) => {
          return referenceSpace;
        }, (rejectionReason) => {
          Logger.Error("XR.requestReferenceSpace failed for the following reason: ");
          Logger.Error(rejectionReason);
          Logger.Log('Defaulting to universally-supported "viewer" reference space type.');
          return this.session.requestReferenceSpace("viewer").then((referenceSpace) => {
            const heightCompensation = new XRRigidTransform({ x: 0, y: -this.defaultHeightCompensation, z: 0 });
            return referenceSpace.getOffsetReferenceSpace(heightCompensation);
          }, (rejectionReason2) => {
            Logger.Error(rejectionReason2);
            throw 'XR initialization failed: required "viewer" reference space type not supported.';
          });
        }).then((referenceSpace) => {
          return this.session.requestReferenceSpace("viewer").then((viewerReferenceSpace) => {
            this.viewerReferenceSpace = viewerReferenceSpace;
            return referenceSpace;
          });
        }).then((referenceSpace) => {
          this.referenceSpace = this.baseReferenceSpace = referenceSpace;
          this.onXRReferenceSpaceInitialized.notifyObservers(referenceSpace);
          return this.referenceSpace;
        });
      }
      /**
       * Updates the render state of the session.
       * Note that this is deprecated in favor of WebXRSessionManager.updateRenderState().
       * @param state state to set
       * @returns a promise that resolves once the render state has been updated
       * @deprecated Use updateRenderState() instead.
       */
      updateRenderStateAsync(state) {
        return Promise.resolve(this.session.updateRenderState(state));
      }
      /**
       * @internal
       */
      _setBaseLayerWrapper(baseLayerWrapper) {
        var _a, _b;
        if (this.isNative) {
          (_a = this._baseLayerRTTProvider) == null ? void 0 : _a.dispose();
        }
        this._baseLayerWrapper = baseLayerWrapper;
        this._baseLayerRTTProvider = ((_b = this._baseLayerWrapper) == null ? void 0 : _b.createRenderTargetTextureProvider(this)) || null;
      }
      /**
       * @internal
       */
      _getBaseLayerWrapper() {
        return this._baseLayerWrapper;
      }
      /**
       * Updates the render state of the session
       * @param state state to set
       */
      updateRenderState(state) {
        if (state.baseLayer) {
          this._setBaseLayerWrapper(this.isNative ? new NativeXRLayerWrapper(state.baseLayer) : new WebXRWebGLLayerWrapper(state.baseLayer));
        }
        this.session.updateRenderState(state);
      }
      /**
       * Returns a promise that resolves with a boolean indicating if the provided session mode is supported by this browser
       * @param sessionMode defines the session to test
       * @returns a promise with boolean as final value
       */
      static IsSessionSupportedAsync(sessionMode) {
        if (!navigator.xr) {
          return Promise.resolve(false);
        }
        const functionToUse = navigator.xr.isSessionSupported || navigator.xr.supportsSession;
        if (!functionToUse) {
          return Promise.resolve(false);
        } else {
          return functionToUse.call(navigator.xr, sessionMode).then((result) => {
            const returnValue = typeof result === "undefined" ? true : result;
            return Promise.resolve(returnValue);
          }).catch((e) => {
            Logger.Warn(e);
            return Promise.resolve(false);
          });
        }
      }
      /**
       * Returns true if Babylon.js is using the BabylonNative backend, otherwise false
       */
      get isNative() {
        return this._xrNavigator.xr.native ?? false;
      }
      /**
       * The current frame rate as reported by the device
       */
      get currentFrameRate() {
        var _a;
        return (_a = this.session) == null ? void 0 : _a.frameRate;
      }
      /**
       * A list of supported frame rates (only available in-session!
       */
      get supportedFrameRates() {
        var _a;
        return (_a = this.session) == null ? void 0 : _a.supportedFrameRates;
      }
      /**
       * Set the framerate of the session.
       * @param rate the new framerate. This value needs to be in the supportedFrameRates array
       * @returns a promise that resolves once the framerate has been set
       */
      updateTargetFrameRate(rate) {
        return this.session.updateTargetFrameRate(rate);
      }
      /**
       * Run a callback in the xr render loop
       * @param callback the callback to call when in XR Frame
       * @param ignoreIfNotInSession if no session is currently running, run it first thing on the next session
       */
      runInXRFrame(callback, ignoreIfNotInSession = true) {
        if (this.inXRFrameLoop) {
          callback();
        } else if (this.inXRSession || !ignoreIfNotInSession) {
          this.onXRFrameObservable.addOnce(callback);
        }
      }
      /**
       * Check if fixed foveation is supported on this device
       */
      get isFixedFoveationSupported() {
        var _a;
        return ((_a = this._baseLayerWrapper) == null ? void 0 : _a.isFixedFoveationSupported) || false;
      }
      /**
       * Get the fixed foveation currently set, as specified by the webxr specs
       * If this returns null, then fixed foveation is not supported
       */
      get fixedFoveation() {
        var _a;
        return ((_a = this._baseLayerWrapper) == null ? void 0 : _a.fixedFoveation) || null;
      }
      /**
       * Set the fixed foveation to the specified value, as specified by the webxr specs
       * This value will be normalized to be between 0 and 1, 1 being max foveation, 0 being no foveation
       */
      set fixedFoveation(value) {
        const val = Math.max(0, Math.min(1, value || 0));
        if (this._baseLayerWrapper) {
          this._baseLayerWrapper.fixedFoveation = val;
        }
      }
      /**
       * Get the features enabled on the current session
       * This is only available in-session!
       * @see https://www.w3.org/TR/webxr/#dom-xrsession-enabledfeatures
       */
      get enabledFeatures() {
        var _a;
        return ((_a = this.session) == null ? void 0 : _a.enabledFeatures) ?? null;
      }
    };
  }
});

// node_modules/@babylonjs/core/Cameras/targetCamera.js
var TargetCamera;
var init_targetCamera = __esm({
  "node_modules/@babylonjs/core/Cameras/targetCamera.js"() {
    init_tslib_es6();
    init_decorators();
    init_camera();
    init_math_vector();
    init_math_constants();
    init_math_axis();
    init_node();
    Node.AddNodeConstructor("TargetCamera", (name66, scene) => {
      return () => new TargetCamera(name66, Vector3.Zero(), scene);
    });
    TargetCamera = class _TargetCamera extends Camera {
      /**
       * Instantiates a target camera that takes a mesh or position as a target and continues to look at it while it moves.
       * This is the base of the follow, arc rotate cameras and Free camera
       * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
       * @param name Defines the name of the camera in the scene
       * @param position Defines the start position of the camera in the scene
       * @param scene Defines the scene the camera belongs to
       * @param setActiveOnSceneIfNoneActive Defines whether the camera should be marked as active if not other active cameras have been defined
       */
      constructor(name66, position, scene, setActiveOnSceneIfNoneActive = true) {
        super(name66, position, scene, setActiveOnSceneIfNoneActive);
        this._tmpUpVector = Vector3.Zero();
        this._tmpTargetVector = Vector3.Zero();
        this.cameraDirection = new Vector3(0, 0, 0);
        this.cameraRotation = new Vector2(0, 0);
        this.ignoreParentScaling = false;
        this.updateUpVectorFromRotation = false;
        this._tmpQuaternion = new Quaternion();
        this.rotation = new Vector3(0, 0, 0);
        this.speed = 2;
        this.noRotationConstraint = false;
        this.invertRotation = false;
        this.inverseRotationSpeed = 0.2;
        this.lockedTarget = null;
        this._currentTarget = Vector3.Zero();
        this._initialFocalDistance = 1;
        this._viewMatrix = Matrix.Zero();
        this._camMatrix = Matrix.Zero();
        this._cameraTransformMatrix = Matrix.Zero();
        this._cameraRotationMatrix = Matrix.Zero();
        this._referencePoint = new Vector3(0, 0, 1);
        this._transformedReferencePoint = Vector3.Zero();
        this._deferredPositionUpdate = new Vector3();
        this._deferredRotationQuaternionUpdate = new Quaternion();
        this._deferredRotationUpdate = new Vector3();
        this._deferredUpdated = false;
        this._deferOnly = false;
        this._defaultUp = Vector3.Up();
        this._cachedRotationZ = 0;
        this._cachedQuaternionRotationZ = 0;
      }
      /**
       * Gets the position in front of the camera at a given distance.
       * @param distance The distance from the camera we want the position to be
       * @returns the position
       */
      getFrontPosition(distance) {
        this.getWorldMatrix();
        const direction = this.getTarget().subtract(this.position);
        direction.normalize();
        direction.scaleInPlace(distance);
        return this.globalPosition.add(direction);
      }
      /** @internal */
      _getLockedTargetPosition() {
        if (!this.lockedTarget) {
          return null;
        }
        if (this.lockedTarget.absolutePosition) {
          const lockedTarget = this.lockedTarget;
          const m = lockedTarget.computeWorldMatrix();
          m.getTranslationToRef(lockedTarget.absolutePosition);
        }
        return this.lockedTarget.absolutePosition || this.lockedTarget;
      }
      /**
       * Store current camera state of the camera (fov, position, rotation, etc..)
       * @returns the camera
       */
      storeState() {
        this._storedPosition = this.position.clone();
        this._storedRotation = this.rotation.clone();
        if (this.rotationQuaternion) {
          this._storedRotationQuaternion = this.rotationQuaternion.clone();
        }
        return super.storeState();
      }
      /**
       * Restored camera state. You must call storeState() first
       * @returns whether it was successful or not
       * @internal
       */
      _restoreStateValues() {
        if (!super._restoreStateValues()) {
          return false;
        }
        this.position = this._storedPosition.clone();
        this.rotation = this._storedRotation.clone();
        if (this.rotationQuaternion) {
          this.rotationQuaternion = this._storedRotationQuaternion.clone();
        }
        this.cameraDirection.copyFromFloats(0, 0, 0);
        this.cameraRotation.copyFromFloats(0, 0);
        return true;
      }
      /** @internal */
      _initCache() {
        super._initCache();
        this._cache.lockedTarget = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        this._cache.rotation = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        this._cache.rotationQuaternion = new Quaternion(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
      }
      /**
       * @internal
       */
      _updateCache(ignoreParentClass) {
        if (!ignoreParentClass) {
          super._updateCache();
        }
        const lockedTargetPosition = this._getLockedTargetPosition();
        if (!lockedTargetPosition) {
          this._cache.lockedTarget = null;
        } else {
          if (!this._cache.lockedTarget) {
            this._cache.lockedTarget = lockedTargetPosition.clone();
          } else {
            this._cache.lockedTarget.copyFrom(lockedTargetPosition);
          }
        }
        this._cache.rotation.copyFrom(this.rotation);
        if (this.rotationQuaternion) {
          this._cache.rotationQuaternion.copyFrom(this.rotationQuaternion);
        }
      }
      // Synchronized
      /** @internal */
      _isSynchronizedViewMatrix() {
        if (!super._isSynchronizedViewMatrix()) {
          return false;
        }
        const lockedTargetPosition = this._getLockedTargetPosition();
        return (this._cache.lockedTarget ? this._cache.lockedTarget.equals(lockedTargetPosition) : !lockedTargetPosition) && (this.rotationQuaternion ? this.rotationQuaternion.equals(this._cache.rotationQuaternion) : this._cache.rotation.equals(this.rotation));
      }
      // Methods
      /** @internal */
      _computeLocalCameraSpeed() {
        const engine = this.getEngine();
        return this.speed * Math.sqrt(engine.getDeltaTime() / (engine.getFps() * 100));
      }
      // Target
      /**
       * Defines the target the camera should look at.
       * @param target Defines the new target as a Vector
       */
      setTarget(target) {
        this.upVector.normalize();
        this._initialFocalDistance = target.subtract(this.position).length();
        if (this.position.z === target.z) {
          this.position.z += Epsilon;
        }
        this._referencePoint.normalize().scaleInPlace(this._initialFocalDistance);
        Matrix.LookAtLHToRef(this.position, target, this._defaultUp, this._camMatrix);
        this._camMatrix.invert();
        this.rotation.x = Math.atan(this._camMatrix.m[6] / this._camMatrix.m[10]);
        const vDir = target.subtract(this.position);
        if (vDir.x >= 0) {
          this.rotation.y = -Math.atan(vDir.z / vDir.x) + Math.PI / 2;
        } else {
          this.rotation.y = -Math.atan(vDir.z / vDir.x) - Math.PI / 2;
        }
        this.rotation.z = 0;
        if (isNaN(this.rotation.x)) {
          this.rotation.x = 0;
        }
        if (isNaN(this.rotation.y)) {
          this.rotation.y = 0;
        }
        if (isNaN(this.rotation.z)) {
          this.rotation.z = 0;
        }
        if (this.rotationQuaternion) {
          Quaternion.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion);
        }
      }
      /**
       * Defines the target point of the camera.
       * The camera looks towards it form the radius distance.
       */
      get target() {
        return this.getTarget();
      }
      set target(value) {
        this.setTarget(value);
      }
      /**
       * Return the current target position of the camera. This value is expressed in local space.
       * @returns the target position
       */
      getTarget() {
        return this._currentTarget;
      }
      /** @internal */
      _decideIfNeedsToMove() {
        return Math.abs(this.cameraDirection.x) > 0 || Math.abs(this.cameraDirection.y) > 0 || Math.abs(this.cameraDirection.z) > 0;
      }
      /** @internal */
      _updatePosition() {
        if (this.parent) {
          this.parent.getWorldMatrix().invertToRef(TmpVectors.Matrix[0]);
          Vector3.TransformNormalToRef(this.cameraDirection, TmpVectors.Matrix[0], TmpVectors.Vector3[0]);
          this._deferredPositionUpdate.addInPlace(TmpVectors.Vector3[0]);
          if (!this._deferOnly) {
            this.position.copyFrom(this._deferredPositionUpdate);
          } else {
            this._deferredUpdated = true;
          }
          return;
        }
        this._deferredPositionUpdate.addInPlace(this.cameraDirection);
        if (!this._deferOnly) {
          this.position.copyFrom(this._deferredPositionUpdate);
        } else {
          this._deferredUpdated = true;
        }
      }
      /** @internal */
      _checkInputs() {
        const directionMultiplier = this.invertRotation ? -this.inverseRotationSpeed : 1;
        const needToMove = this._decideIfNeedsToMove();
        const needToRotate = this.cameraRotation.x || this.cameraRotation.y;
        this._deferredUpdated = false;
        this._deferredRotationUpdate.copyFrom(this.rotation);
        this._deferredPositionUpdate.copyFrom(this.position);
        if (this.rotationQuaternion) {
          this._deferredRotationQuaternionUpdate.copyFrom(this.rotationQuaternion);
        }
        if (needToMove) {
          this._updatePosition();
        }
        if (needToRotate) {
          if (this.rotationQuaternion) {
            this.rotationQuaternion.toEulerAnglesToRef(this._deferredRotationUpdate);
          }
          this._deferredRotationUpdate.x += this.cameraRotation.x * directionMultiplier;
          this._deferredRotationUpdate.y += this.cameraRotation.y * directionMultiplier;
          if (!this.noRotationConstraint) {
            const limit = 1.570796;
            if (this._deferredRotationUpdate.x > limit) {
              this._deferredRotationUpdate.x = limit;
            }
            if (this._deferredRotationUpdate.x < -limit) {
              this._deferredRotationUpdate.x = -limit;
            }
          }
          if (!this._deferOnly) {
            this.rotation.copyFrom(this._deferredRotationUpdate);
          } else {
            this._deferredUpdated = true;
          }
          if (this.rotationQuaternion) {
            const len = this._deferredRotationUpdate.lengthSquared();
            if (len) {
              Quaternion.RotationYawPitchRollToRef(this._deferredRotationUpdate.y, this._deferredRotationUpdate.x, this._deferredRotationUpdate.z, this._deferredRotationQuaternionUpdate);
              if (!this._deferOnly) {
                this.rotationQuaternion.copyFrom(this._deferredRotationQuaternionUpdate);
              } else {
                this._deferredUpdated = true;
              }
            }
          }
        }
        if (needToMove) {
          if (Math.abs(this.cameraDirection.x) < this.speed * Epsilon) {
            this.cameraDirection.x = 0;
          }
          if (Math.abs(this.cameraDirection.y) < this.speed * Epsilon) {
            this.cameraDirection.y = 0;
          }
          if (Math.abs(this.cameraDirection.z) < this.speed * Epsilon) {
            this.cameraDirection.z = 0;
          }
          this.cameraDirection.scaleInPlace(this.inertia);
        }
        if (needToRotate) {
          if (Math.abs(this.cameraRotation.x) < this.speed * Epsilon) {
            this.cameraRotation.x = 0;
          }
          if (Math.abs(this.cameraRotation.y) < this.speed * Epsilon) {
            this.cameraRotation.y = 0;
          }
          this.cameraRotation.scaleInPlace(this.inertia);
        }
        super._checkInputs();
      }
      _updateCameraRotationMatrix() {
        if (this.rotationQuaternion) {
          this.rotationQuaternion.toRotationMatrix(this._cameraRotationMatrix);
        } else {
          Matrix.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this._cameraRotationMatrix);
        }
      }
      /**
       * Update the up vector to apply the rotation of the camera (So if you changed the camera rotation.z this will let you update the up vector as well)
       * @returns the current camera
       */
      _rotateUpVectorWithCameraRotationMatrix() {
        Vector3.TransformNormalToRef(this._defaultUp, this._cameraRotationMatrix, this.upVector);
        return this;
      }
      /** @internal */
      _getViewMatrix() {
        if (this.lockedTarget) {
          this.setTarget(this._getLockedTargetPosition());
        }
        this._updateCameraRotationMatrix();
        if (this.rotationQuaternion && this._cachedQuaternionRotationZ != this.rotationQuaternion.z) {
          this._rotateUpVectorWithCameraRotationMatrix();
          this._cachedQuaternionRotationZ = this.rotationQuaternion.z;
        } else if (this._cachedRotationZ !== this.rotation.z) {
          this._rotateUpVectorWithCameraRotationMatrix();
          this._cachedRotationZ = this.rotation.z;
        }
        Vector3.TransformCoordinatesToRef(this._referencePoint, this._cameraRotationMatrix, this._transformedReferencePoint);
        this.position.addToRef(this._transformedReferencePoint, this._currentTarget);
        if (this.updateUpVectorFromRotation) {
          if (this.rotationQuaternion) {
            Axis.Y.rotateByQuaternionToRef(this.rotationQuaternion, this.upVector);
          } else {
            Quaternion.FromEulerVectorToRef(this.rotation, this._tmpQuaternion);
            Axis.Y.rotateByQuaternionToRef(this._tmpQuaternion, this.upVector);
          }
        }
        this._computeViewMatrix(this.position, this._currentTarget, this.upVector);
        return this._viewMatrix;
      }
      _computeViewMatrix(position, target, up) {
        if (this.ignoreParentScaling) {
          if (this.parent) {
            const parentWorldMatrix = this.parent.getWorldMatrix();
            Vector3.TransformCoordinatesToRef(position, parentWorldMatrix, this._globalPosition);
            Vector3.TransformCoordinatesToRef(target, parentWorldMatrix, this._tmpTargetVector);
            Vector3.TransformNormalToRef(up, parentWorldMatrix, this._tmpUpVector);
            this._markSyncedWithParent();
          } else {
            this._globalPosition.copyFrom(position);
            this._tmpTargetVector.copyFrom(target);
            this._tmpUpVector.copyFrom(up);
          }
          if (this.getScene().useRightHandedSystem) {
            Matrix.LookAtRHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix);
          } else {
            Matrix.LookAtLHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix);
          }
          return;
        }
        if (this.getScene().useRightHandedSystem) {
          Matrix.LookAtRHToRef(position, target, up, this._viewMatrix);
        } else {
          Matrix.LookAtLHToRef(position, target, up, this._viewMatrix);
        }
        if (this.parent) {
          const parentWorldMatrix = this.parent.getWorldMatrix();
          this._viewMatrix.invert();
          this._viewMatrix.multiplyToRef(parentWorldMatrix, this._viewMatrix);
          this._viewMatrix.getTranslationToRef(this._globalPosition);
          this._viewMatrix.invert();
          this._markSyncedWithParent();
        } else {
          this._globalPosition.copyFrom(position);
        }
      }
      /**
       * @internal
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createRigCamera(name66, cameraIndex) {
        if (this.cameraRigMode !== Camera.RIG_MODE_NONE) {
          const rigCamera = new _TargetCamera(name66, this.position.clone(), this.getScene());
          rigCamera.isRigCamera = true;
          rigCamera.rigParent = this;
          if (this.cameraRigMode === Camera.RIG_MODE_VR) {
            if (!this.rotationQuaternion) {
              this.rotationQuaternion = new Quaternion();
            }
            rigCamera._cameraRigParams = {};
            rigCamera.rotationQuaternion = new Quaternion();
          }
          rigCamera.mode = this.mode;
          rigCamera.orthoLeft = this.orthoLeft;
          rigCamera.orthoRight = this.orthoRight;
          rigCamera.orthoTop = this.orthoTop;
          rigCamera.orthoBottom = this.orthoBottom;
          return rigCamera;
        }
        return null;
      }
      /**
       * @internal
       */
      _updateRigCameras() {
        const camLeft = this._rigCameras[0];
        const camRight = this._rigCameras[1];
        this.computeWorldMatrix();
        switch (this.cameraRigMode) {
          case Camera.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
          case Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
          case Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED:
          case Camera.RIG_MODE_STEREOSCOPIC_OVERUNDER:
          case Camera.RIG_MODE_STEREOSCOPIC_INTERLACED: {
            const leftSign = this.cameraRigMode === Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? 1 : -1;
            const rightSign = this.cameraRigMode === Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? -1 : 1;
            this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * leftSign, camLeft);
            this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * rightSign, camRight);
            break;
          }
          case Camera.RIG_MODE_VR:
            if (camLeft.rotationQuaternion) {
              camLeft.rotationQuaternion.copyFrom(this.rotationQuaternion);
              camRight.rotationQuaternion.copyFrom(this.rotationQuaternion);
            } else {
              camLeft.rotation.copyFrom(this.rotation);
              camRight.rotation.copyFrom(this.rotation);
            }
            camLeft.position.copyFrom(this.position);
            camRight.position.copyFrom(this.position);
            break;
        }
        super._updateRigCameras();
      }
      _getRigCamPositionAndTarget(halfSpace, rigCamera) {
        const target = this.getTarget();
        target.subtractToRef(this.position, _TargetCamera._TargetFocalPoint);
        _TargetCamera._TargetFocalPoint.normalize().scaleInPlace(this._initialFocalDistance);
        const newFocalTarget = _TargetCamera._TargetFocalPoint.addInPlace(this.position);
        Matrix.TranslationToRef(-newFocalTarget.x, -newFocalTarget.y, -newFocalTarget.z, _TargetCamera._TargetTransformMatrix);
        _TargetCamera._TargetTransformMatrix.multiplyToRef(Matrix.RotationAxis(rigCamera.upVector, halfSpace), _TargetCamera._RigCamTransformMatrix);
        Matrix.TranslationToRef(newFocalTarget.x, newFocalTarget.y, newFocalTarget.z, _TargetCamera._TargetTransformMatrix);
        _TargetCamera._RigCamTransformMatrix.multiplyToRef(_TargetCamera._TargetTransformMatrix, _TargetCamera._RigCamTransformMatrix);
        Vector3.TransformCoordinatesToRef(this.position, _TargetCamera._RigCamTransformMatrix, rigCamera.position);
        rigCamera.setTarget(newFocalTarget);
      }
      /**
       * Gets the current object class name.
       * @returns the class name
       */
      getClassName() {
        return "TargetCamera";
      }
    };
    TargetCamera._RigCamTransformMatrix = new Matrix();
    TargetCamera._TargetTransformMatrix = new Matrix();
    TargetCamera._TargetFocalPoint = new Vector3();
    __decorate([
      serializeAsVector3()
    ], TargetCamera.prototype, "rotation", void 0);
    __decorate([
      serialize()
    ], TargetCamera.prototype, "speed", void 0);
    __decorate([
      serializeAsMeshReference("lockedTargetId")
    ], TargetCamera.prototype, "lockedTarget", void 0);
  }
});

// node_modules/@babylonjs/core/Cameras/cameraInputsManager.js
var CameraInputTypes, CameraInputsManager;
var init_cameraInputsManager = __esm({
  "node_modules/@babylonjs/core/Cameras/cameraInputsManager.js"() {
    init_logger();
    init_decorators_serialization();
    init_camera();
    CameraInputTypes = {};
    CameraInputsManager = class {
      /**
       * Instantiate a new Camera Input Manager.
       * @param camera Defines the camera the input manager belongs to
       */
      constructor(camera) {
        this.attachedToElement = false;
        this.attached = {};
        this.camera = camera;
        this.checkInputs = () => {
        };
      }
      /**
       * Add an input method to a camera
       * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
       * @param input Camera input method
       */
      add(input) {
        const type = input.getSimpleName();
        if (this.attached[type]) {
          Logger.Warn("camera input of type " + type + " already exists on camera");
          return;
        }
        this.attached[type] = input;
        input.camera = this.camera;
        if (input.checkInputs) {
          this.checkInputs = this._addCheckInputs(input.checkInputs.bind(input));
        }
        if (this.attachedToElement) {
          input.attachControl(this.noPreventDefault);
        }
      }
      /**
       * Remove a specific input method from a camera
       * example: camera.inputs.remove(camera.inputs.attached.mouse);
       * @param inputToRemove camera input method
       */
      remove(inputToRemove) {
        for (const cam in this.attached) {
          const input = this.attached[cam];
          if (input === inputToRemove) {
            input.detachControl();
            input.camera = null;
            delete this.attached[cam];
            this.rebuildInputCheck();
            return;
          }
        }
      }
      /**
       * Remove a specific input type from a camera
       * example: camera.inputs.remove("ArcRotateCameraGamepadInput");
       * @param inputType the type of the input to remove
       */
      removeByType(inputType) {
        for (const cam in this.attached) {
          const input = this.attached[cam];
          if (input.getClassName() === inputType) {
            input.detachControl();
            input.camera = null;
            delete this.attached[cam];
            this.rebuildInputCheck();
          }
        }
      }
      _addCheckInputs(fn) {
        const current = this.checkInputs;
        return () => {
          current();
          fn();
        };
      }
      /**
       * Attach the input controls to the currently attached dom element to listen the events from.
       * @param input Defines the input to attach
       */
      attachInput(input) {
        if (this.attachedToElement) {
          input.attachControl(this.noPreventDefault);
        }
      }
      /**
       * Attach the current manager inputs controls to a specific dom element to listen the events from.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachElement(noPreventDefault = false) {
        if (this.attachedToElement) {
          return;
        }
        noPreventDefault = Camera.ForceAttachControlToAlwaysPreventDefault ? false : noPreventDefault;
        this.attachedToElement = true;
        this.noPreventDefault = noPreventDefault;
        for (const cam in this.attached) {
          this.attached[cam].attachControl(noPreventDefault);
        }
      }
      /**
       * Detach the current manager inputs controls from a specific dom element.
       * @param disconnect Defines whether the input should be removed from the current list of attached inputs
       */
      detachElement(disconnect = false) {
        for (const cam in this.attached) {
          this.attached[cam].detachControl();
          if (disconnect) {
            this.attached[cam].camera = null;
          }
        }
        this.attachedToElement = false;
      }
      /**
       * Rebuild the dynamic inputCheck function from the current list of
       * defined inputs in the manager.
       */
      rebuildInputCheck() {
        this.checkInputs = () => {
        };
        for (const cam in this.attached) {
          const input = this.attached[cam];
          if (input.checkInputs) {
            this.checkInputs = this._addCheckInputs(input.checkInputs.bind(input));
          }
        }
      }
      /**
       * Remove all attached input methods from a camera
       */
      clear() {
        if (this.attachedToElement) {
          this.detachElement(true);
        }
        this.attached = {};
        this.attachedToElement = false;
        this.checkInputs = () => {
        };
      }
      /**
       * Serialize the current input manager attached to a camera.
       * This ensures than once parsed,
       * the input associated to the camera will be identical to the current ones
       * @param serializedCamera Defines the camera serialization JSON the input serialization should write to
       */
      serialize(serializedCamera) {
        const inputs = {};
        for (const cam in this.attached) {
          const input = this.attached[cam];
          const res = SerializationHelper.Serialize(input);
          inputs[input.getClassName()] = res;
        }
        serializedCamera.inputsmgr = inputs;
      }
      /**
       * Parses an input manager serialized JSON to restore the previous list of inputs
       * and states associated to a camera.
       * @param parsedCamera Defines the JSON to parse
       */
      parse(parsedCamera) {
        const parsedInputs = parsedCamera.inputsmgr;
        if (parsedInputs) {
          this.clear();
          for (const n in parsedInputs) {
            const construct = CameraInputTypes[n];
            if (construct) {
              const parsedinput = parsedInputs[n];
              const input = SerializationHelper.Parse(() => {
                return new construct();
              }, parsedinput, null);
              this.add(input);
            }
          }
        } else {
          for (const n in this.attached) {
            const construct = CameraInputTypes[this.attached[n].getClassName()];
            if (construct) {
              const input = SerializationHelper.Parse(() => {
                return new construct();
              }, parsedCamera, null);
              this.remove(this.attached[n]);
              this.add(input);
            }
          }
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/freeCameraKeyboardMoveInput.js
var FreeCameraKeyboardMoveInput;
var init_freeCameraKeyboardMoveInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/freeCameraKeyboardMoveInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_keyboardEvents();
    init_math_vector();
    init_tools();
    FreeCameraKeyboardMoveInput = class {
      constructor() {
        this.keysUp = [38];
        this.keysUpward = [33];
        this.keysDown = [40];
        this.keysDownward = [34];
        this.keysLeft = [37];
        this.keysRight = [39];
        this.rotationSpeed = 0.5;
        this.keysRotateLeft = [];
        this.keysRotateRight = [];
        this.keysRotateUp = [];
        this.keysRotateDown = [];
        this._keys = new Array();
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        if (this._onCanvasBlurObserver) {
          return;
        }
        this._scene = this.camera.getScene();
        this._engine = this._scene.getEngine();
        this._onCanvasBlurObserver = this._engine.onCanvasBlurObservable.add(() => {
          this._keys.length = 0;
        });
        this._onKeyboardObserver = this._scene.onKeyboardObservable.add((info) => {
          const evt = info.event;
          if (!evt.metaKey) {
            if (info.type === KeyboardEventTypes.KEYDOWN) {
              if (this.keysUp.indexOf(evt.keyCode) !== -1 || this.keysDown.indexOf(evt.keyCode) !== -1 || this.keysLeft.indexOf(evt.keyCode) !== -1 || this.keysRight.indexOf(evt.keyCode) !== -1 || this.keysUpward.indexOf(evt.keyCode) !== -1 || this.keysDownward.indexOf(evt.keyCode) !== -1 || this.keysRotateLeft.indexOf(evt.keyCode) !== -1 || this.keysRotateRight.indexOf(evt.keyCode) !== -1 || this.keysRotateUp.indexOf(evt.keyCode) !== -1 || this.keysRotateDown.indexOf(evt.keyCode) !== -1) {
                const index = this._keys.indexOf(evt.keyCode);
                if (index === -1) {
                  this._keys.push(evt.keyCode);
                }
                if (!noPreventDefault) {
                  evt.preventDefault();
                }
              }
            } else {
              if (this.keysUp.indexOf(evt.keyCode) !== -1 || this.keysDown.indexOf(evt.keyCode) !== -1 || this.keysLeft.indexOf(evt.keyCode) !== -1 || this.keysRight.indexOf(evt.keyCode) !== -1 || this.keysUpward.indexOf(evt.keyCode) !== -1 || this.keysDownward.indexOf(evt.keyCode) !== -1 || this.keysRotateLeft.indexOf(evt.keyCode) !== -1 || this.keysRotateRight.indexOf(evt.keyCode) !== -1 || this.keysRotateUp.indexOf(evt.keyCode) !== -1 || this.keysRotateDown.indexOf(evt.keyCode) !== -1) {
                const index = this._keys.indexOf(evt.keyCode);
                if (index >= 0) {
                  this._keys.splice(index, 1);
                }
                if (!noPreventDefault) {
                  evt.preventDefault();
                }
              }
            }
          }
        });
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        if (this._scene) {
          if (this._onKeyboardObserver) {
            this._scene.onKeyboardObservable.remove(this._onKeyboardObserver);
          }
          if (this._onCanvasBlurObserver) {
            this._engine.onCanvasBlurObservable.remove(this._onCanvasBlurObserver);
          }
          this._onKeyboardObserver = null;
          this._onCanvasBlurObserver = null;
        }
        this._keys.length = 0;
      }
      /**
       * Update the current camera state depending on the inputs that have been used this frame.
       * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
       */
      checkInputs() {
        if (this._onKeyboardObserver) {
          const camera = this.camera;
          for (let index = 0; index < this._keys.length; index++) {
            const keyCode = this._keys[index];
            const speed = camera._computeLocalCameraSpeed();
            if (this.keysLeft.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(-speed, 0, 0);
            } else if (this.keysUp.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, 0, speed);
            } else if (this.keysRight.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(speed, 0, 0);
            } else if (this.keysDown.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, 0, -speed);
            } else if (this.keysUpward.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, speed, 0);
            } else if (this.keysDownward.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, -speed, 0);
            } else if (this.keysRotateLeft.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, 0, 0);
              camera.cameraRotation.y -= this._getLocalRotation();
            } else if (this.keysRotateRight.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, 0, 0);
              camera.cameraRotation.y += this._getLocalRotation();
            } else if (this.keysRotateUp.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, 0, 0);
              camera.cameraRotation.x -= this._getLocalRotation();
            } else if (this.keysRotateDown.indexOf(keyCode) !== -1) {
              camera._localDirection.copyFromFloats(0, 0, 0);
              camera.cameraRotation.x += this._getLocalRotation();
            }
            if (camera.getScene().useRightHandedSystem) {
              camera._localDirection.z *= -1;
            }
            camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
            Vector3.TransformNormalToRef(camera._localDirection, camera._cameraTransformMatrix, camera._transformedDirection);
            camera.cameraDirection.addInPlace(camera._transformedDirection);
          }
        }
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "FreeCameraKeyboardMoveInput";
      }
      /** @internal */
      _onLostFocus() {
        this._keys.length = 0;
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "keyboard";
      }
      _getLocalRotation() {
        const handednessMultiplier = this.camera._calculateHandednessMultiplier();
        const rotation = this.rotationSpeed * this._engine.getDeltaTime() / 1e3 * handednessMultiplier;
        return rotation;
      }
    };
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysUp", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysUpward", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysDown", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysDownward", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysLeft", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysRight", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "rotationSpeed", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysRotateLeft", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysRotateRight", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysRotateUp", void 0);
    __decorate([
      serialize()
    ], FreeCameraKeyboardMoveInput.prototype, "keysRotateDown", void 0);
    CameraInputTypes["FreeCameraKeyboardMoveInput"] = FreeCameraKeyboardMoveInput;
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/freeCameraMouseInput.js
var FreeCameraMouseInput;
var init_freeCameraMouseInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/freeCameraMouseInput.js"() {
    init_tslib_es6();
    init_observable();
    init_decorators();
    init_cameraInputsManager();
    init_pointerEvents();
    init_tools();
    FreeCameraMouseInput = class {
      /**
       * Manage the mouse inputs to control the movement of a free camera.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
       * @param touchEnabled Defines if touch is enabled or not
       */
      constructor(touchEnabled = true) {
        this.touchEnabled = touchEnabled;
        this.buttons = [0, 1, 2];
        this.angularSensibility = 2e3;
        this._previousPosition = null;
        this.onPointerMovedObservable = new Observable();
        this._allowCameraRotation = true;
        this._currentActiveButton = -1;
        this._activePointerId = -1;
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        const engine = this.camera.getEngine();
        const element = engine.getInputElement();
        if (!this._pointerInput) {
          this._pointerInput = (p) => {
            const evt = p.event;
            const isTouch = evt.pointerType === "touch";
            if (!this.touchEnabled && isTouch) {
              return;
            }
            if (p.type !== PointerEventTypes.POINTERMOVE && this.buttons.indexOf(evt.button) === -1) {
              return;
            }
            const srcElement = evt.target;
            if (p.type === PointerEventTypes.POINTERDOWN) {
              if (isTouch && this._activePointerId !== -1 || !isTouch && this._currentActiveButton !== -1) {
                return;
              }
              this._activePointerId = evt.pointerId;
              try {
                srcElement == null ? void 0 : srcElement.setPointerCapture(evt.pointerId);
              } catch (e) {
              }
              if (this._currentActiveButton === -1) {
                this._currentActiveButton = evt.button;
              }
              this._previousPosition = {
                x: evt.clientX,
                y: evt.clientY
              };
              if (!noPreventDefault) {
                evt.preventDefault();
                element && element.focus();
              }
              if (engine.isPointerLock && this._onMouseMove) {
                this._onMouseMove(p.event);
              }
            } else if (p.type === PointerEventTypes.POINTERUP) {
              if (isTouch && this._activePointerId !== evt.pointerId || !isTouch && this._currentActiveButton !== evt.button) {
                return;
              }
              try {
                srcElement == null ? void 0 : srcElement.releasePointerCapture(evt.pointerId);
              } catch (e) {
              }
              this._currentActiveButton = -1;
              this._previousPosition = null;
              if (!noPreventDefault) {
                evt.preventDefault();
              }
              this._activePointerId = -1;
            } else if (p.type === PointerEventTypes.POINTERMOVE && (this._activePointerId === evt.pointerId || !isTouch)) {
              if (engine.isPointerLock && this._onMouseMove) {
                this._onMouseMove(p.event);
              } else if (this._previousPosition) {
                const handednessMultiplier = this.camera._calculateHandednessMultiplier();
                const offsetX = (evt.clientX - this._previousPosition.x) * handednessMultiplier;
                const offsetY = evt.clientY - this._previousPosition.y;
                if (this._allowCameraRotation) {
                  this.camera.cameraRotation.y += offsetX / this.angularSensibility;
                  this.camera.cameraRotation.x += offsetY / this.angularSensibility;
                }
                this.onPointerMovedObservable.notifyObservers({ offsetX, offsetY });
                this._previousPosition = {
                  x: evt.clientX,
                  y: evt.clientY
                };
                if (!noPreventDefault) {
                  evt.preventDefault();
                }
              }
            }
          };
        }
        this._onMouseMove = (evt) => {
          if (!engine.isPointerLock) {
            return;
          }
          const handednessMultiplier = this.camera._calculateHandednessMultiplier();
          const offsetX = evt.movementX * handednessMultiplier;
          this.camera.cameraRotation.y += offsetX / this.angularSensibility;
          const offsetY = evt.movementY;
          this.camera.cameraRotation.x += offsetY / this.angularSensibility;
          this._previousPosition = null;
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        };
        this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._pointerInput, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE);
        if (element) {
          this._contextMenuBind = (evt) => this.onContextMenu(evt);
          element.addEventListener("contextmenu", this._contextMenuBind, false);
        }
      }
      /**
       * Called on JS contextmenu event.
       * Override this method to provide functionality.
       * @param evt the context menu event
       */
      onContextMenu(evt) {
        evt.preventDefault();
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        if (this._observer) {
          this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer);
          if (this._contextMenuBind) {
            const engine = this.camera.getEngine();
            const element = engine.getInputElement();
            element && element.removeEventListener("contextmenu", this._contextMenuBind);
          }
          if (this.onPointerMovedObservable) {
            this.onPointerMovedObservable.clear();
          }
          this._observer = null;
          this._onMouseMove = null;
          this._previousPosition = null;
        }
        this._activePointerId = -1;
        this._currentActiveButton = -1;
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "FreeCameraMouseInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "mouse";
      }
    };
    __decorate([
      serialize()
    ], FreeCameraMouseInput.prototype, "buttons", void 0);
    __decorate([
      serialize()
    ], FreeCameraMouseInput.prototype, "angularSensibility", void 0);
    CameraInputTypes["FreeCameraMouseInput"] = FreeCameraMouseInput;
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/BaseCameraMouseWheelInput.js
var BaseCameraMouseWheelInput;
var init_BaseCameraMouseWheelInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/BaseCameraMouseWheelInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_observable();
    init_pointerEvents();
    init_deviceInputEvents();
    init_tools();
    BaseCameraMouseWheelInput = class {
      constructor() {
        this.wheelPrecisionX = 3;
        this.wheelPrecisionY = 3;
        this.wheelPrecisionZ = 3;
        this.onChangedObservable = new Observable();
        this._wheelDeltaX = 0;
        this._wheelDeltaY = 0;
        this._wheelDeltaZ = 0;
        this._ffMultiplier = 12;
        this._normalize = 120;
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       * @param noPreventDefault Defines whether event caught by the controls
       *   should call preventdefault().
       *   (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        this._wheel = (pointer) => {
          if (pointer.type !== PointerEventTypes.POINTERWHEEL) {
            return;
          }
          const event = pointer.event;
          const platformScale = event.deltaMode === EventConstants.DOM_DELTA_LINE ? this._ffMultiplier : 1;
          this._wheelDeltaX += this.wheelPrecisionX * platformScale * event.deltaX / this._normalize;
          this._wheelDeltaY -= this.wheelPrecisionY * platformScale * event.deltaY / this._normalize;
          this._wheelDeltaZ += this.wheelPrecisionZ * platformScale * event.deltaZ / this._normalize;
          if (event.preventDefault) {
            if (!noPreventDefault) {
              event.preventDefault();
            }
          }
        };
        this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._wheel, PointerEventTypes.POINTERWHEEL);
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        if (this._observer) {
          this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer);
          this._observer = null;
          this._wheel = null;
        }
        if (this.onChangedObservable) {
          this.onChangedObservable.clear();
        }
      }
      /**
       * Called for each rendered frame.
       */
      checkInputs() {
        this.onChangedObservable.notifyObservers({
          wheelDeltaX: this._wheelDeltaX,
          wheelDeltaY: this._wheelDeltaY,
          wheelDeltaZ: this._wheelDeltaZ
        });
        this._wheelDeltaX = 0;
        this._wheelDeltaY = 0;
        this._wheelDeltaZ = 0;
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "BaseCameraMouseWheelInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "mousewheel";
      }
    };
    __decorate([
      serialize()
    ], BaseCameraMouseWheelInput.prototype, "wheelPrecisionX", void 0);
    __decorate([
      serialize()
    ], BaseCameraMouseWheelInput.prototype, "wheelPrecisionY", void 0);
    __decorate([
      serialize()
    ], BaseCameraMouseWheelInput.prototype, "wheelPrecisionZ", void 0);
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/freeCameraMouseWheelInput.js
var _CameraProperty, FreeCameraMouseWheelInput;
var init_freeCameraMouseWheelInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/freeCameraMouseWheelInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_BaseCameraMouseWheelInput();
    init_math_vector();
    init_math_axis();
    (function(_CameraProperty2) {
      _CameraProperty2[_CameraProperty2["MoveRelative"] = 0] = "MoveRelative";
      _CameraProperty2[_CameraProperty2["RotateRelative"] = 1] = "RotateRelative";
      _CameraProperty2[_CameraProperty2["MoveScene"] = 2] = "MoveScene";
    })(_CameraProperty || (_CameraProperty = {}));
    FreeCameraMouseWheelInput = class extends BaseCameraMouseWheelInput {
      constructor() {
        super(...arguments);
        this._moveRelative = Vector3.Zero();
        this._rotateRelative = Vector3.Zero();
        this._moveScene = Vector3.Zero();
        this._wheelXAction = _CameraProperty.MoveRelative;
        this._wheelXActionCoordinate = Coordinate.X;
        this._wheelYAction = _CameraProperty.MoveRelative;
        this._wheelYActionCoordinate = Coordinate.Z;
        this._wheelZAction = null;
        this._wheelZActionCoordinate = null;
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "FreeCameraMouseWheelInput";
      }
      /**
       * Set which movement axis (relative to camera's orientation) the mouse
       * wheel's X axis controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelXMoveRelative(axis) {
        if (axis === null && this._wheelXAction !== _CameraProperty.MoveRelative) {
          return;
        }
        this._wheelXAction = _CameraProperty.MoveRelative;
        this._wheelXActionCoordinate = axis;
      }
      /**
       * Get the configured movement axis (relative to camera's orientation) the
       * mouse wheel's X axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelXMoveRelative() {
        if (this._wheelXAction !== _CameraProperty.MoveRelative) {
          return null;
        }
        return this._wheelXActionCoordinate;
      }
      /**
       * Set which movement axis (relative to camera's orientation) the mouse
       * wheel's Y axis controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelYMoveRelative(axis) {
        if (axis === null && this._wheelYAction !== _CameraProperty.MoveRelative) {
          return;
        }
        this._wheelYAction = _CameraProperty.MoveRelative;
        this._wheelYActionCoordinate = axis;
      }
      /**
       * Get the configured movement axis (relative to camera's orientation) the
       * mouse wheel's Y axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelYMoveRelative() {
        if (this._wheelYAction !== _CameraProperty.MoveRelative) {
          return null;
        }
        return this._wheelYActionCoordinate;
      }
      /**
       * Set which movement axis (relative to camera's orientation) the mouse
       * wheel's Z axis controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelZMoveRelative(axis) {
        if (axis === null && this._wheelZAction !== _CameraProperty.MoveRelative) {
          return;
        }
        this._wheelZAction = _CameraProperty.MoveRelative;
        this._wheelZActionCoordinate = axis;
      }
      /**
       * Get the configured movement axis (relative to camera's orientation) the
       * mouse wheel's Z axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelZMoveRelative() {
        if (this._wheelZAction !== _CameraProperty.MoveRelative) {
          return null;
        }
        return this._wheelZActionCoordinate;
      }
      /**
       * Set which rotation axis (relative to camera's orientation) the mouse
       * wheel's X axis controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelXRotateRelative(axis) {
        if (axis === null && this._wheelXAction !== _CameraProperty.RotateRelative) {
          return;
        }
        this._wheelXAction = _CameraProperty.RotateRelative;
        this._wheelXActionCoordinate = axis;
      }
      /**
       * Get the configured rotation axis (relative to camera's orientation) the
       * mouse wheel's X axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelXRotateRelative() {
        if (this._wheelXAction !== _CameraProperty.RotateRelative) {
          return null;
        }
        return this._wheelXActionCoordinate;
      }
      /**
       * Set which rotation axis (relative to camera's orientation) the mouse
       * wheel's Y axis controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelYRotateRelative(axis) {
        if (axis === null && this._wheelYAction !== _CameraProperty.RotateRelative) {
          return;
        }
        this._wheelYAction = _CameraProperty.RotateRelative;
        this._wheelYActionCoordinate = axis;
      }
      /**
       * Get the configured rotation axis (relative to camera's orientation) the
       * mouse wheel's Y axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelYRotateRelative() {
        if (this._wheelYAction !== _CameraProperty.RotateRelative) {
          return null;
        }
        return this._wheelYActionCoordinate;
      }
      /**
       * Set which rotation axis (relative to camera's orientation) the mouse
       * wheel's Z axis controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelZRotateRelative(axis) {
        if (axis === null && this._wheelZAction !== _CameraProperty.RotateRelative) {
          return;
        }
        this._wheelZAction = _CameraProperty.RotateRelative;
        this._wheelZActionCoordinate = axis;
      }
      /**
       * Get the configured rotation axis (relative to camera's orientation) the
       * mouse wheel's Z axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelZRotateRelative() {
        if (this._wheelZAction !== _CameraProperty.RotateRelative) {
          return null;
        }
        return this._wheelZActionCoordinate;
      }
      /**
       * Set which movement axis (relative to the scene) the mouse wheel's X axis
       * controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelXMoveScene(axis) {
        if (axis === null && this._wheelXAction !== _CameraProperty.MoveScene) {
          return;
        }
        this._wheelXAction = _CameraProperty.MoveScene;
        this._wheelXActionCoordinate = axis;
      }
      /**
       * Get the configured movement axis (relative to the scene) the mouse wheel's
       * X axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelXMoveScene() {
        if (this._wheelXAction !== _CameraProperty.MoveScene) {
          return null;
        }
        return this._wheelXActionCoordinate;
      }
      /**
       * Set which movement axis (relative to the scene) the mouse wheel's Y axis
       * controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelYMoveScene(axis) {
        if (axis === null && this._wheelYAction !== _CameraProperty.MoveScene) {
          return;
        }
        this._wheelYAction = _CameraProperty.MoveScene;
        this._wheelYActionCoordinate = axis;
      }
      /**
       * Get the configured movement axis (relative to the scene) the mouse wheel's
       * Y axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelYMoveScene() {
        if (this._wheelYAction !== _CameraProperty.MoveScene) {
          return null;
        }
        return this._wheelYActionCoordinate;
      }
      /**
       * Set which movement axis (relative to the scene) the mouse wheel's Z axis
       * controls.
       * @param axis The axis to be moved. Set null to clear.
       */
      set wheelZMoveScene(axis) {
        if (axis === null && this._wheelZAction !== _CameraProperty.MoveScene) {
          return;
        }
        this._wheelZAction = _CameraProperty.MoveScene;
        this._wheelZActionCoordinate = axis;
      }
      /**
       * Get the configured movement axis (relative to the scene) the mouse wheel's
       * Z axis controls.
       * @returns The configured axis or null if none.
       */
      get wheelZMoveScene() {
        if (this._wheelZAction !== _CameraProperty.MoveScene) {
          return null;
        }
        return this._wheelZActionCoordinate;
      }
      /**
       * Called for each rendered frame.
       */
      checkInputs() {
        if (this._wheelDeltaX === 0 && this._wheelDeltaY === 0 && this._wheelDeltaZ == 0) {
          return;
        }
        this._moveRelative.setAll(0);
        this._rotateRelative.setAll(0);
        this._moveScene.setAll(0);
        this._updateCamera();
        if (this.camera.getScene().useRightHandedSystem) {
          this._moveRelative.z *= -1;
        }
        const cameraTransformMatrix = Matrix.Zero();
        this.camera.getViewMatrix().invertToRef(cameraTransformMatrix);
        const transformedDirection = Vector3.Zero();
        Vector3.TransformNormalToRef(this._moveRelative, cameraTransformMatrix, transformedDirection);
        this.camera.cameraRotation.x += this._rotateRelative.x / 200;
        this.camera.cameraRotation.y += this._rotateRelative.y / 200;
        this.camera.cameraDirection.addInPlace(transformedDirection);
        this.camera.cameraDirection.addInPlace(this._moveScene);
        super.checkInputs();
      }
      /**
       * Update the camera according to any configured properties for the 3
       * mouse-wheel axis.
       */
      _updateCamera() {
        this._updateCameraProperty(this._wheelDeltaX, this._wheelXAction, this._wheelXActionCoordinate);
        this._updateCameraProperty(this._wheelDeltaY, this._wheelYAction, this._wheelYActionCoordinate);
        this._updateCameraProperty(this._wheelDeltaZ, this._wheelZAction, this._wheelZActionCoordinate);
      }
      /**
       * Update one property of the camera.
       * @param value
       * @param cameraProperty
       * @param coordinate
       */
      _updateCameraProperty(value, cameraProperty, coordinate) {
        if (value === 0) {
          return;
        }
        if (cameraProperty === null || coordinate === null) {
          return;
        }
        let action = null;
        switch (cameraProperty) {
          case _CameraProperty.MoveRelative:
            action = this._moveRelative;
            break;
          case _CameraProperty.RotateRelative:
            action = this._rotateRelative;
            break;
          case _CameraProperty.MoveScene:
            action = this._moveScene;
            break;
        }
        switch (coordinate) {
          case Coordinate.X:
            action.set(value, 0, 0);
            break;
          case Coordinate.Y:
            action.set(0, value, 0);
            break;
          case Coordinate.Z:
            action.set(0, 0, value);
            break;
        }
      }
    };
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelXMoveRelative", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelYMoveRelative", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelZMoveRelative", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelXRotateRelative", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelYRotateRelative", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelZRotateRelative", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelXMoveScene", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelYMoveScene", null);
    __decorate([
      serialize()
    ], FreeCameraMouseWheelInput.prototype, "wheelZMoveScene", null);
    CameraInputTypes["FreeCameraMouseWheelInput"] = FreeCameraMouseWheelInput;
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/freeCameraTouchInput.js
var FreeCameraTouchInput;
var init_freeCameraTouchInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/freeCameraTouchInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_pointerEvents();
    init_math_vector();
    init_tools();
    FreeCameraTouchInput = class {
      /**
       * Manage the touch inputs to control the movement of a free camera.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
       * @param allowMouse Defines if mouse events can be treated as touch events
       */
      constructor(allowMouse = false) {
        this.allowMouse = allowMouse;
        this.touchAngularSensibility = 2e5;
        this.touchMoveSensibility = 250;
        this.singleFingerRotate = false;
        this._offsetX = null;
        this._offsetY = null;
        this._pointerPressed = new Array();
        this._isSafari = Tools.IsSafari();
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        let previousPosition = null;
        if (this._pointerInput === void 0) {
          this._onLostFocus = () => {
            this._offsetX = null;
            this._offsetY = null;
          };
          this._pointerInput = (p) => {
            const evt = p.event;
            const isMouseEvent = evt.pointerType === "mouse" || this._isSafari && typeof evt.pointerType === "undefined";
            if (!this.allowMouse && isMouseEvent) {
              return;
            }
            if (p.type === PointerEventTypes.POINTERDOWN) {
              if (!noPreventDefault) {
                evt.preventDefault();
              }
              this._pointerPressed.push(evt.pointerId);
              if (this._pointerPressed.length !== 1) {
                return;
              }
              previousPosition = {
                x: evt.clientX,
                y: evt.clientY
              };
            } else if (p.type === PointerEventTypes.POINTERUP) {
              if (!noPreventDefault) {
                evt.preventDefault();
              }
              const index = this._pointerPressed.indexOf(evt.pointerId);
              if (index === -1) {
                return;
              }
              this._pointerPressed.splice(index, 1);
              if (index != 0) {
                return;
              }
              previousPosition = null;
              this._offsetX = null;
              this._offsetY = null;
            } else if (p.type === PointerEventTypes.POINTERMOVE) {
              if (!noPreventDefault) {
                evt.preventDefault();
              }
              if (!previousPosition) {
                return;
              }
              const index = this._pointerPressed.indexOf(evt.pointerId);
              if (index != 0) {
                return;
              }
              this._offsetX = evt.clientX - previousPosition.x;
              this._offsetY = -(evt.clientY - previousPosition.y);
            }
          };
        }
        this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._pointerInput, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE);
        if (this._onLostFocus) {
          const engine = this.camera.getEngine();
          const element = engine.getInputElement();
          element && element.addEventListener("blur", this._onLostFocus);
        }
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        if (this._pointerInput) {
          if (this._observer) {
            this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer);
            this._observer = null;
          }
          if (this._onLostFocus) {
            const engine = this.camera.getEngine();
            const element = engine.getInputElement();
            element && element.removeEventListener("blur", this._onLostFocus);
            this._onLostFocus = null;
          }
          this._pointerPressed.length = 0;
          this._offsetX = null;
          this._offsetY = null;
        }
      }
      /**
       * Update the current camera state depending on the inputs that have been used this frame.
       * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
       */
      checkInputs() {
        if (this._offsetX === null || this._offsetY === null) {
          return;
        }
        if (this._offsetX === 0 && this._offsetY === 0) {
          return;
        }
        const camera = this.camera;
        const handednessMultiplier = camera._calculateHandednessMultiplier();
        camera.cameraRotation.y = handednessMultiplier * this._offsetX / this.touchAngularSensibility;
        const rotateCamera = this.singleFingerRotate && this._pointerPressed.length === 1 || !this.singleFingerRotate && this._pointerPressed.length > 1;
        if (rotateCamera) {
          camera.cameraRotation.x = -this._offsetY / this.touchAngularSensibility;
        } else {
          const speed = camera._computeLocalCameraSpeed();
          const direction = new Vector3(0, 0, this.touchMoveSensibility !== 0 ? speed * this._offsetY / this.touchMoveSensibility : 0);
          Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, camera._cameraRotationMatrix);
          camera.cameraDirection.addInPlace(Vector3.TransformCoordinates(direction, camera._cameraRotationMatrix));
        }
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "FreeCameraTouchInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "touch";
      }
    };
    __decorate([
      serialize()
    ], FreeCameraTouchInput.prototype, "touchAngularSensibility", void 0);
    __decorate([
      serialize()
    ], FreeCameraTouchInput.prototype, "touchMoveSensibility", void 0);
    CameraInputTypes["FreeCameraTouchInput"] = FreeCameraTouchInput;
  }
});

// node_modules/@babylonjs/core/Cameras/freeCameraInputsManager.js
var FreeCameraInputsManager;
var init_freeCameraInputsManager = __esm({
  "node_modules/@babylonjs/core/Cameras/freeCameraInputsManager.js"() {
    init_cameraInputsManager();
    init_freeCameraKeyboardMoveInput();
    init_freeCameraMouseInput();
    init_freeCameraMouseWheelInput();
    init_freeCameraTouchInput();
    FreeCameraInputsManager = class extends CameraInputsManager {
      /**
       * Instantiates a new FreeCameraInputsManager.
       * @param camera Defines the camera the inputs belong to
       */
      constructor(camera) {
        super(camera);
        this._mouseInput = null;
        this._mouseWheelInput = null;
      }
      /**
       * Add keyboard input support to the input manager.
       * @returns the current input manager
       */
      addKeyboard() {
        this.add(new FreeCameraKeyboardMoveInput());
        return this;
      }
      /**
       * Add mouse input support to the input manager.
       * @param touchEnabled if the FreeCameraMouseInput should support touch (default: true)
       * @returns the current input manager
       */
      addMouse(touchEnabled = true) {
        if (!this._mouseInput) {
          this._mouseInput = new FreeCameraMouseInput(touchEnabled);
          this.add(this._mouseInput);
        }
        return this;
      }
      /**
       * Removes the mouse input support from the manager
       * @returns the current input manager
       */
      removeMouse() {
        if (this._mouseInput) {
          this.remove(this._mouseInput);
        }
        return this;
      }
      /**
       * Add mouse wheel input support to the input manager.
       * @returns the current input manager
       */
      addMouseWheel() {
        if (!this._mouseWheelInput) {
          this._mouseWheelInput = new FreeCameraMouseWheelInput();
          this.add(this._mouseWheelInput);
        }
        return this;
      }
      /**
       * Removes the mouse wheel input support from the manager
       * @returns the current input manager
       */
      removeMouseWheel() {
        if (this._mouseWheelInput) {
          this.remove(this._mouseWheelInput);
        }
        return this;
      }
      /**
       * Add touch input support to the input manager.
       * @returns the current input manager
       */
      addTouch() {
        this.add(new FreeCameraTouchInput());
        return this;
      }
      /**
       * Remove all attached input methods from a camera
       */
      clear() {
        super.clear();
        this._mouseInput = null;
      }
    };
  }
});

// node_modules/@babylonjs/core/Cameras/freeCamera.js
var FreeCamera;
var init_freeCamera = __esm({
  "node_modules/@babylonjs/core/Cameras/freeCamera.js"() {
    init_tslib_es6();
    init_decorators();
    init_math_vector();
    init_engine();
    init_targetCamera();
    init_freeCameraInputsManager();
    init_tools();
    FreeCamera = class extends TargetCamera {
      /**
       * Gets the input sensibility for a mouse input. (default is 2000.0)
       * Higher values reduce sensitivity.
       */
      get angularSensibility() {
        const mouse = this.inputs.attached["mouse"];
        if (mouse) {
          return mouse.angularSensibility;
        }
        return 0;
      }
      /**
       * Sets the input sensibility for a mouse input. (default is 2000.0)
       * Higher values reduce sensitivity.
       */
      set angularSensibility(value) {
        const mouse = this.inputs.attached["mouse"];
        if (mouse) {
          mouse.angularSensibility = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the forward move of the camera.
       */
      get keysUp() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysUp;
        }
        return [];
      }
      set keysUp(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysUp = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the upward move of the camera.
       */
      get keysUpward() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysUpward;
        }
        return [];
      }
      set keysUpward(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysUpward = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the backward move of the camera.
       */
      get keysDown() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysDown;
        }
        return [];
      }
      set keysDown(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysDown = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the downward move of the camera.
       */
      get keysDownward() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysDownward;
        }
        return [];
      }
      set keysDownward(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysDownward = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the left strafe move of the camera.
       */
      get keysLeft() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysLeft;
        }
        return [];
      }
      set keysLeft(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysLeft = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the right strafe move of the camera.
       */
      get keysRight() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysRight;
        }
        return [];
      }
      set keysRight(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysRight = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the left rotation move of the camera.
       */
      get keysRotateLeft() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysRotateLeft;
        }
        return [];
      }
      set keysRotateLeft(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysRotateLeft = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the right rotation move of the camera.
       */
      get keysRotateRight() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysRotateRight;
        }
        return [];
      }
      set keysRotateRight(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysRotateRight = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the up rotation move of the camera.
       */
      get keysRotateUp() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysRotateUp;
        }
        return [];
      }
      set keysRotateUp(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysRotateUp = value;
        }
      }
      /**
       * Gets or Set the list of keyboard keys used to control the down rotation move of the camera.
       */
      get keysRotateDown() {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          return keyboard.keysRotateDown;
        }
        return [];
      }
      set keysRotateDown(value) {
        const keyboard = this.inputs.attached["keyboard"];
        if (keyboard) {
          keyboard.keysRotateDown = value;
        }
      }
      /**
       * Instantiates a Free Camera.
       * This represents a free type of camera. It can be useful in First Person Shooter game for instance.
       * Please consider using the new UniversalCamera instead as it adds more functionality like touch to this camera.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
       * @param name Define the name of the camera in the scene
       * @param position Define the start position of the camera in the scene
       * @param scene Define the scene the camera belongs to
       * @param setActiveOnSceneIfNoneActive Defines whether the camera should be marked as active if not other active cameras have been defined
       */
      constructor(name66, position, scene, setActiveOnSceneIfNoneActive = true) {
        super(name66, position, scene, setActiveOnSceneIfNoneActive);
        this.ellipsoid = new Vector3(0.5, 1, 0.5);
        this.ellipsoidOffset = new Vector3(0, 0, 0);
        this.checkCollisions = false;
        this.applyGravity = false;
        this._needMoveForGravity = false;
        this._oldPosition = Vector3.Zero();
        this._diffPosition = Vector3.Zero();
        this._newPosition = Vector3.Zero();
        this._collisionMask = -1;
        this._onCollisionPositionChange = (collisionId, newPosition, collidedMesh = null) => {
          this._newPosition.copyFrom(newPosition);
          this._newPosition.subtractToRef(this._oldPosition, this._diffPosition);
          if (this._diffPosition.length() > Engine.CollisionsEpsilon) {
            this.position.addToRef(this._diffPosition, this._deferredPositionUpdate);
            if (!this._deferOnly) {
              this.position.copyFrom(this._deferredPositionUpdate);
            } else {
              this._deferredUpdated = true;
            }
            if (this.onCollide && collidedMesh) {
              this.onCollide(collidedMesh);
            }
          }
        };
        this.inputs = new FreeCameraInputsManager(this);
        this.inputs.addKeyboard().addMouse();
      }
      /**
       * Attached controls to the current camera.
       * @param ignored defines an ignored parameter kept for backward compatibility.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(ignored, noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        this.inputs.attachElement(noPreventDefault);
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        this.inputs.detachElement();
        this.cameraDirection = new Vector3(0, 0, 0);
        this.cameraRotation = new Vector2(0, 0);
      }
      /**
       * Define a collision mask to limit the list of object the camera can collide with
       */
      get collisionMask() {
        return this._collisionMask;
      }
      set collisionMask(mask) {
        this._collisionMask = !isNaN(mask) ? mask : -1;
      }
      /**
       * @internal
       */
      _collideWithWorld(displacement) {
        let globalPosition;
        if (this.parent) {
          globalPosition = Vector3.TransformCoordinates(this.position, this.parent.getWorldMatrix());
        } else {
          globalPosition = this.position;
        }
        globalPosition.subtractFromFloatsToRef(0, this.ellipsoid.y, 0, this._oldPosition);
        this._oldPosition.addInPlace(this.ellipsoidOffset);
        const coordinator = this.getScene().collisionCoordinator;
        if (!this._collider) {
          this._collider = coordinator.createCollider();
        }
        this._collider._radius = this.ellipsoid;
        this._collider.collisionMask = this._collisionMask;
        let actualDisplacement = displacement;
        if (this.applyGravity) {
          actualDisplacement = displacement.add(this.getScene().gravity);
        }
        coordinator.getNewPosition(this._oldPosition, actualDisplacement, this._collider, 3, null, this._onCollisionPositionChange, this.uniqueId);
      }
      /** @internal */
      _checkInputs() {
        if (!this._localDirection) {
          this._localDirection = Vector3.Zero();
          this._transformedDirection = Vector3.Zero();
        }
        this.inputs.checkInputs();
        super._checkInputs();
      }
      /**
       * Enable movement without a user input. This allows gravity to always be applied.
       */
      set needMoveForGravity(value) {
        this._needMoveForGravity = value;
      }
      /**
       * When true, gravity is applied whether there is user input or not.
       */
      get needMoveForGravity() {
        return this._needMoveForGravity;
      }
      /** @internal */
      _decideIfNeedsToMove() {
        return this._needMoveForGravity || Math.abs(this.cameraDirection.x) > 0 || Math.abs(this.cameraDirection.y) > 0 || Math.abs(this.cameraDirection.z) > 0;
      }
      /** @internal */
      _updatePosition() {
        if (this.checkCollisions && this.getScene().collisionsEnabled) {
          this._collideWithWorld(this.cameraDirection);
        } else {
          super._updatePosition();
        }
      }
      /**
       * Destroy the camera and release the current resources hold by it.
       */
      dispose() {
        this.inputs.clear();
        super.dispose();
      }
      /**
       * Gets the current object class name.
       * @returns the class name
       */
      getClassName() {
        return "FreeCamera";
      }
    };
    __decorate([
      serializeAsVector3()
    ], FreeCamera.prototype, "ellipsoid", void 0);
    __decorate([
      serializeAsVector3()
    ], FreeCamera.prototype, "ellipsoidOffset", void 0);
    __decorate([
      serialize()
    ], FreeCamera.prototype, "checkCollisions", void 0);
    __decorate([
      serialize()
    ], FreeCamera.prototype, "applyGravity", void 0);
  }
});

// node_modules/@babylonjs/core/XR/webXRTypes.js
var WebXRState, WebXRTrackingState;
var init_webXRTypes = __esm({
  "node_modules/@babylonjs/core/XR/webXRTypes.js"() {
    (function(WebXRState2) {
      WebXRState2[WebXRState2["ENTERING_XR"] = 0] = "ENTERING_XR";
      WebXRState2[WebXRState2["EXITING_XR"] = 1] = "EXITING_XR";
      WebXRState2[WebXRState2["IN_XR"] = 2] = "IN_XR";
      WebXRState2[WebXRState2["NOT_IN_XR"] = 3] = "NOT_IN_XR";
    })(WebXRState || (WebXRState = {}));
    (function(WebXRTrackingState2) {
      WebXRTrackingState2[WebXRTrackingState2["NOT_TRACKING"] = 0] = "NOT_TRACKING";
      WebXRTrackingState2[WebXRTrackingState2["TRACKING_LOST"] = 1] = "TRACKING_LOST";
      WebXRTrackingState2[WebXRTrackingState2["TRACKING"] = 2] = "TRACKING";
    })(WebXRTrackingState || (WebXRTrackingState = {}));
  }
});

// node_modules/@babylonjs/core/XR/webXRCamera.js
var WebXRCamera;
var init_webXRCamera = __esm({
  "node_modules/@babylonjs/core/XR/webXRCamera.js"() {
    init_math_vector();
    init_camera();
    init_freeCamera();
    init_targetCamera();
    init_math_viewport();
    init_observable();
    init_webXRTypes();
    WebXRCamera = class _WebXRCamera extends FreeCamera {
      /**
       * Creates a new webXRCamera, this should only be set at the camera after it has been updated by the xrSessionManager
       * @param name the name of the camera
       * @param scene the scene to add the camera to
       * @param _xrSessionManager a constructed xr session manager
       */
      constructor(name66, scene, _xrSessionManager) {
        super(name66, Vector3.Zero(), scene);
        this._xrSessionManager = _xrSessionManager;
        this._firstFrame = false;
        this._referenceQuaternion = Quaternion.Identity();
        this._referencedPosition = new Vector3();
        this._trackingState = WebXRTrackingState.NOT_TRACKING;
        this.onXRCameraInitializedObservable = new Observable();
        this.onBeforeCameraTeleport = new Observable();
        this.onAfterCameraTeleport = new Observable();
        this.onTrackingStateChanged = new Observable();
        this.compensateOnFirstFrame = true;
        this._rotate180 = new Quaternion(0, 1, 0, 0);
        this.minZ = 0.1;
        this.rotationQuaternion = new Quaternion();
        this.cameraRigMode = Camera.RIG_MODE_CUSTOM;
        this.updateUpVectorFromRotation = true;
        this._updateNumberOfRigCameras(1);
        this.freezeProjectionMatrix();
        this._deferOnly = true;
        this._xrSessionManager.onXRSessionInit.add(() => {
          this._referencedPosition.copyFromFloats(0, 0, 0);
          this._referenceQuaternion.copyFromFloats(0, 0, 0, 1);
          this._firstFrame = this.compensateOnFirstFrame;
          this._xrSessionManager.onWorldScaleFactorChangedObservable.add(() => {
            if (!this._xrSessionManager.currentFrame) {
              return;
            }
            this._updateDepthNearFar();
          });
        });
        this._xrSessionManager.onXRFrameObservable.add(() => {
          if (this._firstFrame) {
            this._updateFromXRSession();
          }
          if (this.onXRCameraInitializedObservable.hasObservers()) {
            this.onXRCameraInitializedObservable.notifyObservers(this);
            this.onXRCameraInitializedObservable.clear();
          }
          if (this._deferredUpdated) {
            this.position.copyFrom(this._deferredPositionUpdate);
            this.rotationQuaternion.copyFrom(this._deferredRotationQuaternionUpdate);
          }
          this._updateReferenceSpace();
          this._updateFromXRSession();
        }, void 0, true);
      }
      /**
       * Get the current XR tracking state of the camera
       */
      get trackingState() {
        return this._trackingState;
      }
      _setTrackingState(newState) {
        if (this._trackingState !== newState) {
          this._trackingState = newState;
          this.onTrackingStateChanged.notifyObservers(newState);
        }
      }
      /**
       * Return the user's height, unrelated to the current ground.
       * This will be the y position of this camera, when ground level is 0.
       *
       * Note - this value is multiplied by the worldScalingFactor (if set), so it will be in the same units as the scene.
       */
      get realWorldHeight() {
        const basePose = this._xrSessionManager.currentFrame && this._xrSessionManager.currentFrame.getViewerPose(this._xrSessionManager.baseReferenceSpace);
        if (basePose && basePose.transform) {
          return basePose.transform.position.y * this._xrSessionManager.worldScalingFactor;
        } else {
          return 0;
        }
      }
      /** @internal */
      _updateForDualEyeDebugging() {
        this._updateNumberOfRigCameras(2);
        this.rigCameras[0].viewport = new Viewport(0, 0, 0.5, 1);
        this.rigCameras[0].outputRenderTarget = null;
        this.rigCameras[1].viewport = new Viewport(0.5, 0, 0.5, 1);
        this.rigCameras[1].outputRenderTarget = null;
      }
      /**
       * Sets this camera's transformation based on a non-vr camera
       * @param otherCamera the non-vr camera to copy the transformation from
       * @param resetToBaseReferenceSpace should XR reset to the base reference space
       */
      setTransformationFromNonVRCamera(otherCamera = this.getScene().activeCamera, resetToBaseReferenceSpace = true) {
        if (!otherCamera || otherCamera === this) {
          return;
        }
        const mat = otherCamera.computeWorldMatrix();
        mat.decompose(void 0, this.rotationQuaternion, this.position);
        this.position.y = 0;
        Quaternion.FromEulerAnglesToRef(0, this.rotationQuaternion.toEulerAngles().y, 0, this.rotationQuaternion);
        this._firstFrame = true;
        if (resetToBaseReferenceSpace) {
          this._xrSessionManager.resetReferenceSpace();
        }
      }
      /**
       * Gets the current instance class name ("WebXRCamera").
       * @returns the class name
       */
      getClassName() {
        return "WebXRCamera";
      }
      /**
       * Set the target for the camera to look at.
       * Note that this only rotates around the Y axis, as opposed to the default behavior of other cameras
       * @param target the target to set the camera to look at
       */
      setTarget(target) {
        const tmpVector = TmpVectors.Vector3[1];
        target.subtractToRef(this.position, tmpVector);
        tmpVector.y = 0;
        tmpVector.normalize();
        const yRotation = Math.atan2(tmpVector.x, tmpVector.z);
        this.rotationQuaternion.toEulerAnglesToRef(tmpVector);
        Quaternion.FromEulerAnglesToRef(tmpVector.x, yRotation, tmpVector.z, this.rotationQuaternion);
      }
      dispose() {
        super.dispose();
        this._lastXRViewerPose = void 0;
      }
      _updateDepthNearFar() {
        const far = (this.maxZ || 1e4) * this._xrSessionManager.worldScalingFactor;
        const xrRenderState = {
          // if maxZ is 0 it should be "Infinity", but it doesn't work with the WebXR API. Setting to a large number.
          depthFar: far,
          depthNear: this.minZ
        };
        this._xrSessionManager.updateRenderState(xrRenderState);
        this._cache.minZ = this.minZ;
        this._cache.maxZ = far;
      }
      _updateFromXRSession() {
        const pose = this._xrSessionManager.currentFrame && this._xrSessionManager.currentFrame.getViewerPose(this._xrSessionManager.referenceSpace);
        this._lastXRViewerPose = pose || void 0;
        if (!pose) {
          this._setTrackingState(WebXRTrackingState.NOT_TRACKING);
          return;
        }
        const trackingState = pose.emulatedPosition ? WebXRTrackingState.TRACKING_LOST : WebXRTrackingState.TRACKING;
        this._setTrackingState(trackingState);
        if (this.minZ !== this._cache.minZ || this.maxZ !== this._cache.maxZ) {
          this._updateDepthNearFar();
        }
        if (pose.transform) {
          const orientation = pose.transform.orientation;
          if (pose.transform.orientation.x === void 0) {
            return;
          }
          const pos = pose.transform.position;
          this._referencedPosition.set(pos.x, pos.y, pos.z).scaleInPlace(this._xrSessionManager.worldScalingFactor);
          this._referenceQuaternion.set(orientation.x, orientation.y, orientation.z, orientation.w);
          if (!this._scene.useRightHandedSystem) {
            this._referencedPosition.z *= -1;
            this._referenceQuaternion.z *= -1;
            this._referenceQuaternion.w *= -1;
          }
          if (this._firstFrame) {
            this._firstFrame = false;
            this.position.y += this._referencedPosition.y;
            this._referenceQuaternion.copyFromFloats(0, 0, 0, 1);
          } else {
            this.rotationQuaternion.copyFrom(this._referenceQuaternion);
            this.position.copyFrom(this._referencedPosition);
          }
        }
        if (this.rigCameras.length !== pose.views.length) {
          this._updateNumberOfRigCameras(pose.views.length);
        }
        pose.views.forEach((view, i) => {
          var _a;
          const currentRig = this.rigCameras[i];
          if (!currentRig.isLeftCamera && !currentRig.isRightCamera) {
            if (view.eye === "right") {
              currentRig._isRightCamera = true;
            } else if (view.eye === "left") {
              currentRig._isLeftCamera = true;
            }
          }
          const customRenderTargets = this.getScene().customRenderTargets;
          for (let i2 = 0; i2 < customRenderTargets.length; i2++) {
            const rt = customRenderTargets[i2];
            if (currentRig.customRenderTargets.indexOf(rt) === -1) {
              currentRig.customRenderTargets.push(rt);
            }
          }
          const pos = view.transform.position;
          const orientation = view.transform.orientation;
          currentRig.parent = this.parent;
          currentRig.position.set(pos.x, pos.y, pos.z).scaleInPlace(this._xrSessionManager.worldScalingFactor);
          currentRig.rotationQuaternion.set(orientation.x, orientation.y, orientation.z, orientation.w);
          if (!this._scene.useRightHandedSystem) {
            currentRig.position.z *= -1;
            currentRig.rotationQuaternion.z *= -1;
            currentRig.rotationQuaternion.w *= -1;
          } else {
            currentRig.rotationQuaternion.multiplyInPlace(this._rotate180);
          }
          Matrix.FromFloat32ArrayToRefScaled(view.projectionMatrix, 0, 1, currentRig._projectionMatrix);
          if (!this._scene.useRightHandedSystem) {
            currentRig._projectionMatrix.toggleProjectionMatrixHandInPlace();
          }
          if (i === 0) {
            this._projectionMatrix.copyFrom(currentRig._projectionMatrix);
          }
          const renderTargetTexture = this._xrSessionManager.getRenderTargetTextureForView(view);
          this._renderingMultiview = ((_a = renderTargetTexture == null ? void 0 : renderTargetTexture._texture) == null ? void 0 : _a.isMultiview) || false;
          if (this._renderingMultiview) {
            if (i == 0) {
              this._xrSessionManager.trySetViewportForView(this.viewport, view);
              this.outputRenderTarget = renderTargetTexture;
            }
          } else {
            this._xrSessionManager.trySetViewportForView(currentRig.viewport, view);
            currentRig.outputRenderTarget = renderTargetTexture || this._xrSessionManager.getRenderTargetTextureForView(view);
          }
          currentRig.layerMask = this.layerMask;
        });
      }
      _updateNumberOfRigCameras(viewCount = 1) {
        while (this.rigCameras.length < viewCount) {
          const newCamera = new TargetCamera("XR-RigCamera: " + this.rigCameras.length, Vector3.Zero(), this.getScene());
          newCamera.minZ = 0.1;
          newCamera.rotationQuaternion = new Quaternion();
          newCamera.updateUpVectorFromRotation = true;
          newCamera.isRigCamera = true;
          newCamera.rigParent = this;
          newCamera.freezeProjectionMatrix();
          this.rigCameras.push(newCamera);
        }
        while (this.rigCameras.length > viewCount) {
          const removedCamera = this.rigCameras.pop();
          if (removedCamera) {
            removedCamera.dispose();
          }
        }
      }
      _updateReferenceSpace() {
        if (!this.position.equals(this._referencedPosition) || !this.rotationQuaternion.equals(this._referenceQuaternion)) {
          const referencedMat = TmpVectors.Matrix[0];
          const poseMat = TmpVectors.Matrix[1];
          const transformMat = TmpVectors.Matrix[2];
          Matrix.ComposeToRef(_WebXRCamera._ScaleReadOnly, this._referenceQuaternion, this._referencedPosition, referencedMat);
          Matrix.ComposeToRef(_WebXRCamera._ScaleReadOnly, this.rotationQuaternion, this.position, poseMat);
          referencedMat.invert().multiplyToRef(poseMat, transformMat);
          transformMat.invert();
          if (!this._scene.useRightHandedSystem) {
            transformMat.toggleModelMatrixHandInPlace();
          }
          transformMat.decompose(void 0, this._referenceQuaternion, this._referencedPosition);
          const transform = new XRRigidTransform({
            x: this._referencedPosition.x / this._xrSessionManager.worldScalingFactor,
            y: this._referencedPosition.y / this._xrSessionManager.worldScalingFactor,
            z: this._referencedPosition.z / this._xrSessionManager.worldScalingFactor
          }, {
            x: this._referenceQuaternion.x,
            y: this._referenceQuaternion.y,
            z: this._referenceQuaternion.z,
            w: this._referenceQuaternion.w
          });
          this._xrSessionManager.referenceSpace = this._xrSessionManager.referenceSpace.getOffsetReferenceSpace(transform);
        }
      }
    };
    WebXRCamera._ScaleReadOnly = Vector3.One();
  }
});

// node_modules/@babylonjs/core/Cameras/touchCamera.js
var TouchCamera;
var init_touchCamera = __esm({
  "node_modules/@babylonjs/core/Cameras/touchCamera.js"() {
    init_freeCamera();
    init_math_vector();
    init_node();
    Node.AddNodeConstructor("TouchCamera", (name66, scene) => {
      return () => new TouchCamera(name66, Vector3.Zero(), scene);
    });
    TouchCamera = class extends FreeCamera {
      /**
       * Defines the touch sensibility for rotation.
       * The higher the faster.
       */
      get touchAngularSensibility() {
        const touch = this.inputs.attached["touch"];
        if (touch) {
          return touch.touchAngularSensibility;
        }
        return 0;
      }
      set touchAngularSensibility(value) {
        const touch = this.inputs.attached["touch"];
        if (touch) {
          touch.touchAngularSensibility = value;
        }
      }
      /**
       * Defines the touch sensibility for move.
       * The higher the faster.
       */
      get touchMoveSensibility() {
        const touch = this.inputs.attached["touch"];
        if (touch) {
          return touch.touchMoveSensibility;
        }
        return 0;
      }
      set touchMoveSensibility(value) {
        const touch = this.inputs.attached["touch"];
        if (touch) {
          touch.touchMoveSensibility = value;
        }
      }
      /**
       * Instantiates a new touch camera.
       * This represents a FPS type of camera controlled by touch.
       * This is like a universal camera minus the Gamepad controls.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
       * @param name Define the name of the camera in the scene
       * @param position Define the start position of the camera in the scene
       * @param scene Define the scene the camera belongs to
       */
      constructor(name66, position, scene) {
        super(name66, position, scene);
        this.inputs.addTouch();
        this._setupInputs();
      }
      /**
       * Gets the current object class name.
       * @returns the class name
       */
      getClassName() {
        return "TouchCamera";
      }
      /** @internal */
      _setupInputs() {
        const touch = this.inputs.attached["touch"];
        const mouse = this.inputs.attached["mouse"];
        if (mouse) {
          mouse.touchEnabled = false;
        } else {
          touch.allowMouse = true;
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Gamepads/gamepad.js
var StickValues, Gamepad, GenericPad;
var init_gamepad = __esm({
  "node_modules/@babylonjs/core/Gamepads/gamepad.js"() {
    init_observable();
    StickValues = class {
      /**
       * Initializes the gamepad x and y control stick values
       * @param x The x component of the gamepad control stick value
       * @param y The y component of the gamepad control stick value
       */
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    };
    Gamepad = class _Gamepad {
      /**
       * Specifies if the gamepad has been connected
       */
      get isConnected() {
        return this._isConnected;
      }
      /**
       * Initializes the gamepad
       * @param id The id of the gamepad
       * @param index The index of the gamepad
       * @param browserGamepad The browser gamepad
       * @param leftStickX The x component of the left joystick
       * @param leftStickY The y component of the left joystick
       * @param rightStickX The x component of the right joystick
       * @param rightStickY The y component of the right joystick
       */
      constructor(id, index, browserGamepad, leftStickX = 0, leftStickY = 1, rightStickX = 2, rightStickY = 3) {
        this.id = id;
        this.index = index;
        this.browserGamepad = browserGamepad;
        this._leftStick = { x: 0, y: 0 };
        this._rightStick = { x: 0, y: 0 };
        this._isConnected = true;
        this._invertLeftStickY = false;
        this.type = _Gamepad.GAMEPAD;
        this._leftStickAxisX = leftStickX;
        this._leftStickAxisY = leftStickY;
        this._rightStickAxisX = rightStickX;
        this._rightStickAxisY = rightStickY;
        if (this.browserGamepad.axes.length >= 2) {
          this._leftStick = { x: this.browserGamepad.axes[this._leftStickAxisX], y: this.browserGamepad.axes[this._leftStickAxisY] };
        }
        if (this.browserGamepad.axes.length >= 4) {
          this._rightStick = { x: this.browserGamepad.axes[this._rightStickAxisX], y: this.browserGamepad.axes[this._rightStickAxisY] };
        }
      }
      /**
       * Callback triggered when the left joystick has changed
       * @param callback callback to trigger
       */
      onleftstickchanged(callback) {
        this._onleftstickchanged = callback;
      }
      /**
       * Callback triggered when the right joystick has changed
       * @param callback callback to trigger
       */
      onrightstickchanged(callback) {
        this._onrightstickchanged = callback;
      }
      /**
       * Gets the left joystick
       */
      get leftStick() {
        return this._leftStick;
      }
      /**
       * Sets the left joystick values
       */
      set leftStick(newValues) {
        if (this._onleftstickchanged && (this._leftStick.x !== newValues.x || this._leftStick.y !== newValues.y)) {
          this._onleftstickchanged(newValues);
        }
        this._leftStick = newValues;
      }
      /**
       * Gets the right joystick
       */
      get rightStick() {
        return this._rightStick;
      }
      /**
       * Sets the right joystick value
       */
      set rightStick(newValues) {
        if (this._onrightstickchanged && (this._rightStick.x !== newValues.x || this._rightStick.y !== newValues.y)) {
          this._onrightstickchanged(newValues);
        }
        this._rightStick = newValues;
      }
      /**
       * Updates the gamepad joystick positions
       */
      update() {
        if (this._leftStick) {
          this.leftStick = { x: this.browserGamepad.axes[this._leftStickAxisX], y: this.browserGamepad.axes[this._leftStickAxisY] };
          if (this._invertLeftStickY) {
            this.leftStick.y *= -1;
          }
        }
        if (this._rightStick) {
          this.rightStick = { x: this.browserGamepad.axes[this._rightStickAxisX], y: this.browserGamepad.axes[this._rightStickAxisY] };
        }
      }
      /**
       * Disposes the gamepad
       */
      dispose() {
      }
    };
    Gamepad.GAMEPAD = 0;
    Gamepad.GENERIC = 1;
    Gamepad.XBOX = 2;
    Gamepad.POSE_ENABLED = 3;
    Gamepad.DUALSHOCK = 4;
    GenericPad = class extends Gamepad {
      /**
       * Callback triggered when a button has been pressed
       * @param callback Called when a button has been pressed
       */
      onbuttondown(callback) {
        this._onbuttondown = callback;
      }
      /**
       * Callback triggered when a button has been released
       * @param callback Called when a button has been released
       */
      onbuttonup(callback) {
        this._onbuttonup = callback;
      }
      /**
       * Initializes the generic gamepad
       * @param id The id of the generic gamepad
       * @param index The index of the generic gamepad
       * @param browserGamepad The browser gamepad
       */
      constructor(id, index, browserGamepad) {
        super(id, index, browserGamepad);
        this.onButtonDownObservable = new Observable();
        this.onButtonUpObservable = new Observable();
        this.type = Gamepad.GENERIC;
        this._buttons = new Array(browserGamepad.buttons.length);
      }
      _setButtonValue(newValue, currentValue, buttonIndex) {
        if (newValue !== currentValue) {
          if (newValue === 1) {
            if (this._onbuttondown) {
              this._onbuttondown(buttonIndex);
            }
            this.onButtonDownObservable.notifyObservers(buttonIndex);
          }
          if (newValue === 0) {
            if (this._onbuttonup) {
              this._onbuttonup(buttonIndex);
            }
            this.onButtonUpObservable.notifyObservers(buttonIndex);
          }
        }
        return newValue;
      }
      /**
       * Updates the generic gamepad
       */
      update() {
        super.update();
        for (let index = 0; index < this._buttons.length; index++) {
          this._buttons[index] = this._setButtonValue(this.browserGamepad.buttons[index].value, this._buttons[index], index);
        }
      }
      /**
       * Disposes the generic gamepad
       */
      dispose() {
        super.dispose();
        this.onButtonDownObservable.clear();
        this.onButtonUpObservable.clear();
      }
    };
  }
});

// node_modules/@babylonjs/core/Gamepads/xboxGamepad.js
var Xbox360Button, Xbox360Dpad, Xbox360Pad;
var init_xboxGamepad = __esm({
  "node_modules/@babylonjs/core/Gamepads/xboxGamepad.js"() {
    init_observable();
    init_gamepad();
    (function(Xbox360Button2) {
      Xbox360Button2[Xbox360Button2["A"] = 0] = "A";
      Xbox360Button2[Xbox360Button2["B"] = 1] = "B";
      Xbox360Button2[Xbox360Button2["X"] = 2] = "X";
      Xbox360Button2[Xbox360Button2["Y"] = 3] = "Y";
      Xbox360Button2[Xbox360Button2["LB"] = 4] = "LB";
      Xbox360Button2[Xbox360Button2["RB"] = 5] = "RB";
      Xbox360Button2[Xbox360Button2["Back"] = 8] = "Back";
      Xbox360Button2[Xbox360Button2["Start"] = 9] = "Start";
      Xbox360Button2[Xbox360Button2["LeftStick"] = 10] = "LeftStick";
      Xbox360Button2[Xbox360Button2["RightStick"] = 11] = "RightStick";
    })(Xbox360Button || (Xbox360Button = {}));
    (function(Xbox360Dpad2) {
      Xbox360Dpad2[Xbox360Dpad2["Up"] = 12] = "Up";
      Xbox360Dpad2[Xbox360Dpad2["Down"] = 13] = "Down";
      Xbox360Dpad2[Xbox360Dpad2["Left"] = 14] = "Left";
      Xbox360Dpad2[Xbox360Dpad2["Right"] = 15] = "Right";
    })(Xbox360Dpad || (Xbox360Dpad = {}));
    Xbox360Pad = class extends Gamepad {
      /**
       * Creates a new XBox360 gamepad object
       * @param id defines the id of this gamepad
       * @param index defines its index
       * @param gamepad defines the internal HTML gamepad object
       * @param xboxOne defines if it is a XBox One gamepad
       */
      constructor(id, index, gamepad, xboxOne = false) {
        super(id, index, gamepad, 0, 1, 2, 3);
        this._leftTrigger = 0;
        this._rightTrigger = 0;
        this.onButtonDownObservable = new Observable();
        this.onButtonUpObservable = new Observable();
        this.onPadDownObservable = new Observable();
        this.onPadUpObservable = new Observable();
        this._buttonA = 0;
        this._buttonB = 0;
        this._buttonX = 0;
        this._buttonY = 0;
        this._buttonBack = 0;
        this._buttonStart = 0;
        this._buttonLB = 0;
        this._buttonRB = 0;
        this._buttonLeftStick = 0;
        this._buttonRightStick = 0;
        this._dPadUp = 0;
        this._dPadDown = 0;
        this._dPadLeft = 0;
        this._dPadRight = 0;
        this._isXboxOnePad = false;
        this.type = Gamepad.XBOX;
        this._isXboxOnePad = xboxOne;
      }
      /**
       * Defines the callback to call when left trigger is pressed
       * @param callback defines the callback to use
       */
      onlefttriggerchanged(callback) {
        this._onlefttriggerchanged = callback;
      }
      /**
       * Defines the callback to call when right trigger is pressed
       * @param callback defines the callback to use
       */
      onrighttriggerchanged(callback) {
        this._onrighttriggerchanged = callback;
      }
      /**
       * Gets the left trigger value
       */
      get leftTrigger() {
        return this._leftTrigger;
      }
      /**
       * Sets the left trigger value
       */
      set leftTrigger(newValue) {
        if (this._onlefttriggerchanged && this._leftTrigger !== newValue) {
          this._onlefttriggerchanged(newValue);
        }
        this._leftTrigger = newValue;
      }
      /**
       * Gets the right trigger value
       */
      get rightTrigger() {
        return this._rightTrigger;
      }
      /**
       * Sets the right trigger value
       */
      set rightTrigger(newValue) {
        if (this._onrighttriggerchanged && this._rightTrigger !== newValue) {
          this._onrighttriggerchanged(newValue);
        }
        this._rightTrigger = newValue;
      }
      /**
       * Defines the callback to call when a button is pressed
       * @param callback defines the callback to use
       */
      onbuttondown(callback) {
        this._onbuttondown = callback;
      }
      /**
       * Defines the callback to call when a button is released
       * @param callback defines the callback to use
       */
      onbuttonup(callback) {
        this._onbuttonup = callback;
      }
      /**
       * Defines the callback to call when a pad is pressed
       * @param callback defines the callback to use
       */
      ondpaddown(callback) {
        this._ondpaddown = callback;
      }
      /**
       * Defines the callback to call when a pad is released
       * @param callback defines the callback to use
       */
      ondpadup(callback) {
        this._ondpadup = callback;
      }
      _setButtonValue(newValue, currentValue, buttonType) {
        if (newValue !== currentValue) {
          if (newValue === 1) {
            if (this._onbuttondown) {
              this._onbuttondown(buttonType);
            }
            this.onButtonDownObservable.notifyObservers(buttonType);
          }
          if (newValue === 0) {
            if (this._onbuttonup) {
              this._onbuttonup(buttonType);
            }
            this.onButtonUpObservable.notifyObservers(buttonType);
          }
        }
        return newValue;
      }
      _setDPadValue(newValue, currentValue, buttonType) {
        if (newValue !== currentValue) {
          if (newValue === 1) {
            if (this._ondpaddown) {
              this._ondpaddown(buttonType);
            }
            this.onPadDownObservable.notifyObservers(buttonType);
          }
          if (newValue === 0) {
            if (this._ondpadup) {
              this._ondpadup(buttonType);
            }
            this.onPadUpObservable.notifyObservers(buttonType);
          }
        }
        return newValue;
      }
      /**
       * Gets the value of the `A` button
       */
      get buttonA() {
        return this._buttonA;
      }
      /**
       * Sets the value of the `A` button
       */
      set buttonA(value) {
        this._buttonA = this._setButtonValue(value, this._buttonA, Xbox360Button.A);
      }
      /**
       * Gets the value of the `B` button
       */
      get buttonB() {
        return this._buttonB;
      }
      /**
       * Sets the value of the `B` button
       */
      set buttonB(value) {
        this._buttonB = this._setButtonValue(value, this._buttonB, Xbox360Button.B);
      }
      /**
       * Gets the value of the `X` button
       */
      get buttonX() {
        return this._buttonX;
      }
      /**
       * Sets the value of the `X` button
       */
      set buttonX(value) {
        this._buttonX = this._setButtonValue(value, this._buttonX, Xbox360Button.X);
      }
      /**
       * Gets the value of the `Y` button
       */
      get buttonY() {
        return this._buttonY;
      }
      /**
       * Sets the value of the `Y` button
       */
      set buttonY(value) {
        this._buttonY = this._setButtonValue(value, this._buttonY, Xbox360Button.Y);
      }
      /**
       * Gets the value of the `Start` button
       */
      get buttonStart() {
        return this._buttonStart;
      }
      /**
       * Sets the value of the `Start` button
       */
      set buttonStart(value) {
        this._buttonStart = this._setButtonValue(value, this._buttonStart, Xbox360Button.Start);
      }
      /**
       * Gets the value of the `Back` button
       */
      get buttonBack() {
        return this._buttonBack;
      }
      /**
       * Sets the value of the `Back` button
       */
      set buttonBack(value) {
        this._buttonBack = this._setButtonValue(value, this._buttonBack, Xbox360Button.Back);
      }
      /**
       * Gets the value of the `Left` button
       */
      get buttonLB() {
        return this._buttonLB;
      }
      /**
       * Sets the value of the `Left` button
       */
      set buttonLB(value) {
        this._buttonLB = this._setButtonValue(value, this._buttonLB, Xbox360Button.LB);
      }
      /**
       * Gets the value of the `Right` button
       */
      get buttonRB() {
        return this._buttonRB;
      }
      /**
       * Sets the value of the `Right` button
       */
      set buttonRB(value) {
        this._buttonRB = this._setButtonValue(value, this._buttonRB, Xbox360Button.RB);
      }
      /**
       * Gets the value of the Left joystick
       */
      get buttonLeftStick() {
        return this._buttonLeftStick;
      }
      /**
       * Sets the value of the Left joystick
       */
      set buttonLeftStick(value) {
        this._buttonLeftStick = this._setButtonValue(value, this._buttonLeftStick, Xbox360Button.LeftStick);
      }
      /**
       * Gets the value of the Right joystick
       */
      get buttonRightStick() {
        return this._buttonRightStick;
      }
      /**
       * Sets the value of the Right joystick
       */
      set buttonRightStick(value) {
        this._buttonRightStick = this._setButtonValue(value, this._buttonRightStick, Xbox360Button.RightStick);
      }
      /**
       * Gets the value of D-pad up
       */
      get dPadUp() {
        return this._dPadUp;
      }
      /**
       * Sets the value of D-pad up
       */
      set dPadUp(value) {
        this._dPadUp = this._setDPadValue(value, this._dPadUp, Xbox360Dpad.Up);
      }
      /**
       * Gets the value of D-pad down
       */
      get dPadDown() {
        return this._dPadDown;
      }
      /**
       * Sets the value of D-pad down
       */
      set dPadDown(value) {
        this._dPadDown = this._setDPadValue(value, this._dPadDown, Xbox360Dpad.Down);
      }
      /**
       * Gets the value of D-pad left
       */
      get dPadLeft() {
        return this._dPadLeft;
      }
      /**
       * Sets the value of D-pad left
       */
      set dPadLeft(value) {
        this._dPadLeft = this._setDPadValue(value, this._dPadLeft, Xbox360Dpad.Left);
      }
      /**
       * Gets the value of D-pad right
       */
      get dPadRight() {
        return this._dPadRight;
      }
      /**
       * Sets the value of D-pad right
       */
      set dPadRight(value) {
        this._dPadRight = this._setDPadValue(value, this._dPadRight, Xbox360Dpad.Right);
      }
      /**
       * Force the gamepad to synchronize with device values
       */
      update() {
        super.update();
        if (this._isXboxOnePad) {
          this.buttonA = this.browserGamepad.buttons[0].value;
          this.buttonB = this.browserGamepad.buttons[1].value;
          this.buttonX = this.browserGamepad.buttons[2].value;
          this.buttonY = this.browserGamepad.buttons[3].value;
          this.buttonLB = this.browserGamepad.buttons[4].value;
          this.buttonRB = this.browserGamepad.buttons[5].value;
          this.leftTrigger = this.browserGamepad.buttons[6].value;
          this.rightTrigger = this.browserGamepad.buttons[7].value;
          this.buttonBack = this.browserGamepad.buttons[8].value;
          this.buttonStart = this.browserGamepad.buttons[9].value;
          this.buttonLeftStick = this.browserGamepad.buttons[10].value;
          this.buttonRightStick = this.browserGamepad.buttons[11].value;
          this.dPadUp = this.browserGamepad.buttons[12].value;
          this.dPadDown = this.browserGamepad.buttons[13].value;
          this.dPadLeft = this.browserGamepad.buttons[14].value;
          this.dPadRight = this.browserGamepad.buttons[15].value;
        } else {
          this.buttonA = this.browserGamepad.buttons[0].value;
          this.buttonB = this.browserGamepad.buttons[1].value;
          this.buttonX = this.browserGamepad.buttons[2].value;
          this.buttonY = this.browserGamepad.buttons[3].value;
          this.buttonLB = this.browserGamepad.buttons[4].value;
          this.buttonRB = this.browserGamepad.buttons[5].value;
          this.leftTrigger = this.browserGamepad.buttons[6].value;
          this.rightTrigger = this.browserGamepad.buttons[7].value;
          this.buttonBack = this.browserGamepad.buttons[8].value;
          this.buttonStart = this.browserGamepad.buttons[9].value;
          this.buttonLeftStick = this.browserGamepad.buttons[10].value;
          this.buttonRightStick = this.browserGamepad.buttons[11].value;
          this.dPadUp = this.browserGamepad.buttons[12].value;
          this.dPadDown = this.browserGamepad.buttons[13].value;
          this.dPadLeft = this.browserGamepad.buttons[14].value;
          this.dPadRight = this.browserGamepad.buttons[15].value;
        }
      }
      /**
       * Disposes the gamepad
       */
      dispose() {
        super.dispose();
        this.onButtonDownObservable.clear();
        this.onButtonUpObservable.clear();
        this.onPadDownObservable.clear();
        this.onPadUpObservable.clear();
      }
    };
  }
});

// node_modules/@babylonjs/core/Gamepads/dualShockGamepad.js
var DualShockButton, DualShockDpad, DualShockPad;
var init_dualShockGamepad = __esm({
  "node_modules/@babylonjs/core/Gamepads/dualShockGamepad.js"() {
    init_observable();
    init_gamepad();
    (function(DualShockButton2) {
      DualShockButton2[DualShockButton2["Cross"] = 0] = "Cross";
      DualShockButton2[DualShockButton2["Circle"] = 1] = "Circle";
      DualShockButton2[DualShockButton2["Square"] = 2] = "Square";
      DualShockButton2[DualShockButton2["Triangle"] = 3] = "Triangle";
      DualShockButton2[DualShockButton2["L1"] = 4] = "L1";
      DualShockButton2[DualShockButton2["R1"] = 5] = "R1";
      DualShockButton2[DualShockButton2["Share"] = 8] = "Share";
      DualShockButton2[DualShockButton2["Options"] = 9] = "Options";
      DualShockButton2[DualShockButton2["LeftStick"] = 10] = "LeftStick";
      DualShockButton2[DualShockButton2["RightStick"] = 11] = "RightStick";
    })(DualShockButton || (DualShockButton = {}));
    (function(DualShockDpad2) {
      DualShockDpad2[DualShockDpad2["Up"] = 12] = "Up";
      DualShockDpad2[DualShockDpad2["Down"] = 13] = "Down";
      DualShockDpad2[DualShockDpad2["Left"] = 14] = "Left";
      DualShockDpad2[DualShockDpad2["Right"] = 15] = "Right";
    })(DualShockDpad || (DualShockDpad = {}));
    DualShockPad = class extends Gamepad {
      /**
       * Creates a new DualShock gamepad object
       * @param id defines the id of this gamepad
       * @param index defines its index
       * @param gamepad defines the internal HTML gamepad object
       */
      constructor(id, index, gamepad) {
        super(id.replace("STANDARD GAMEPAD", "SONY PLAYSTATION DUALSHOCK"), index, gamepad, 0, 1, 2, 3);
        this._leftTrigger = 0;
        this._rightTrigger = 0;
        this.onButtonDownObservable = new Observable();
        this.onButtonUpObservable = new Observable();
        this.onPadDownObservable = new Observable();
        this.onPadUpObservable = new Observable();
        this._buttonCross = 0;
        this._buttonCircle = 0;
        this._buttonSquare = 0;
        this._buttonTriangle = 0;
        this._buttonShare = 0;
        this._buttonOptions = 0;
        this._buttonL1 = 0;
        this._buttonR1 = 0;
        this._buttonLeftStick = 0;
        this._buttonRightStick = 0;
        this._dPadUp = 0;
        this._dPadDown = 0;
        this._dPadLeft = 0;
        this._dPadRight = 0;
        this.type = Gamepad.DUALSHOCK;
      }
      /**
       * Defines the callback to call when left trigger is pressed
       * @param callback defines the callback to use
       */
      onlefttriggerchanged(callback) {
        this._onlefttriggerchanged = callback;
      }
      /**
       * Defines the callback to call when right trigger is pressed
       * @param callback defines the callback to use
       */
      onrighttriggerchanged(callback) {
        this._onrighttriggerchanged = callback;
      }
      /**
       * Gets the left trigger value
       */
      get leftTrigger() {
        return this._leftTrigger;
      }
      /**
       * Sets the left trigger value
       */
      set leftTrigger(newValue) {
        if (this._onlefttriggerchanged && this._leftTrigger !== newValue) {
          this._onlefttriggerchanged(newValue);
        }
        this._leftTrigger = newValue;
      }
      /**
       * Gets the right trigger value
       */
      get rightTrigger() {
        return this._rightTrigger;
      }
      /**
       * Sets the right trigger value
       */
      set rightTrigger(newValue) {
        if (this._onrighttriggerchanged && this._rightTrigger !== newValue) {
          this._onrighttriggerchanged(newValue);
        }
        this._rightTrigger = newValue;
      }
      /**
       * Defines the callback to call when a button is pressed
       * @param callback defines the callback to use
       */
      onbuttondown(callback) {
        this._onbuttondown = callback;
      }
      /**
       * Defines the callback to call when a button is released
       * @param callback defines the callback to use
       */
      onbuttonup(callback) {
        this._onbuttonup = callback;
      }
      /**
       * Defines the callback to call when a pad is pressed
       * @param callback defines the callback to use
       */
      ondpaddown(callback) {
        this._ondpaddown = callback;
      }
      /**
       * Defines the callback to call when a pad is released
       * @param callback defines the callback to use
       */
      ondpadup(callback) {
        this._ondpadup = callback;
      }
      _setButtonValue(newValue, currentValue, buttonType) {
        if (newValue !== currentValue) {
          if (newValue === 1) {
            if (this._onbuttondown) {
              this._onbuttondown(buttonType);
            }
            this.onButtonDownObservable.notifyObservers(buttonType);
          }
          if (newValue === 0) {
            if (this._onbuttonup) {
              this._onbuttonup(buttonType);
            }
            this.onButtonUpObservable.notifyObservers(buttonType);
          }
        }
        return newValue;
      }
      _setDPadValue(newValue, currentValue, buttonType) {
        if (newValue !== currentValue) {
          if (newValue === 1) {
            if (this._ondpaddown) {
              this._ondpaddown(buttonType);
            }
            this.onPadDownObservable.notifyObservers(buttonType);
          }
          if (newValue === 0) {
            if (this._ondpadup) {
              this._ondpadup(buttonType);
            }
            this.onPadUpObservable.notifyObservers(buttonType);
          }
        }
        return newValue;
      }
      /**
       * Gets the value of the `Cross` button
       */
      get buttonCross() {
        return this._buttonCross;
      }
      /**
       * Sets the value of the `Cross` button
       */
      set buttonCross(value) {
        this._buttonCross = this._setButtonValue(value, this._buttonCross, DualShockButton.Cross);
      }
      /**
       * Gets the value of the `Circle` button
       */
      get buttonCircle() {
        return this._buttonCircle;
      }
      /**
       * Sets the value of the `Circle` button
       */
      set buttonCircle(value) {
        this._buttonCircle = this._setButtonValue(value, this._buttonCircle, DualShockButton.Circle);
      }
      /**
       * Gets the value of the `Square` button
       */
      get buttonSquare() {
        return this._buttonSquare;
      }
      /**
       * Sets the value of the `Square` button
       */
      set buttonSquare(value) {
        this._buttonSquare = this._setButtonValue(value, this._buttonSquare, DualShockButton.Square);
      }
      /**
       * Gets the value of the `Triangle` button
       */
      get buttonTriangle() {
        return this._buttonTriangle;
      }
      /**
       * Sets the value of the `Triangle` button
       */
      set buttonTriangle(value) {
        this._buttonTriangle = this._setButtonValue(value, this._buttonTriangle, DualShockButton.Triangle);
      }
      /**
       * Gets the value of the `Options` button
       */
      get buttonOptions() {
        return this._buttonOptions;
      }
      /**
       * Sets the value of the `Options` button
       */
      set buttonOptions(value) {
        this._buttonOptions = this._setButtonValue(value, this._buttonOptions, DualShockButton.Options);
      }
      /**
       * Gets the value of the `Share` button
       */
      get buttonShare() {
        return this._buttonShare;
      }
      /**
       * Sets the value of the `Share` button
       */
      set buttonShare(value) {
        this._buttonShare = this._setButtonValue(value, this._buttonShare, DualShockButton.Share);
      }
      /**
       * Gets the value of the `L1` button
       */
      get buttonL1() {
        return this._buttonL1;
      }
      /**
       * Sets the value of the `L1` button
       */
      set buttonL1(value) {
        this._buttonL1 = this._setButtonValue(value, this._buttonL1, DualShockButton.L1);
      }
      /**
       * Gets the value of the `R1` button
       */
      get buttonR1() {
        return this._buttonR1;
      }
      /**
       * Sets the value of the `R1` button
       */
      set buttonR1(value) {
        this._buttonR1 = this._setButtonValue(value, this._buttonR1, DualShockButton.R1);
      }
      /**
       * Gets the value of the Left joystick
       */
      get buttonLeftStick() {
        return this._buttonLeftStick;
      }
      /**
       * Sets the value of the Left joystick
       */
      set buttonLeftStick(value) {
        this._buttonLeftStick = this._setButtonValue(value, this._buttonLeftStick, DualShockButton.LeftStick);
      }
      /**
       * Gets the value of the Right joystick
       */
      get buttonRightStick() {
        return this._buttonRightStick;
      }
      /**
       * Sets the value of the Right joystick
       */
      set buttonRightStick(value) {
        this._buttonRightStick = this._setButtonValue(value, this._buttonRightStick, DualShockButton.RightStick);
      }
      /**
       * Gets the value of D-pad up
       */
      get dPadUp() {
        return this._dPadUp;
      }
      /**
       * Sets the value of D-pad up
       */
      set dPadUp(value) {
        this._dPadUp = this._setDPadValue(value, this._dPadUp, DualShockDpad.Up);
      }
      /**
       * Gets the value of D-pad down
       */
      get dPadDown() {
        return this._dPadDown;
      }
      /**
       * Sets the value of D-pad down
       */
      set dPadDown(value) {
        this._dPadDown = this._setDPadValue(value, this._dPadDown, DualShockDpad.Down);
      }
      /**
       * Gets the value of D-pad left
       */
      get dPadLeft() {
        return this._dPadLeft;
      }
      /**
       * Sets the value of D-pad left
       */
      set dPadLeft(value) {
        this._dPadLeft = this._setDPadValue(value, this._dPadLeft, DualShockDpad.Left);
      }
      /**
       * Gets the value of D-pad right
       */
      get dPadRight() {
        return this._dPadRight;
      }
      /**
       * Sets the value of D-pad right
       */
      set dPadRight(value) {
        this._dPadRight = this._setDPadValue(value, this._dPadRight, DualShockDpad.Right);
      }
      /**
       * Force the gamepad to synchronize with device values
       */
      update() {
        super.update();
        this.buttonCross = this.browserGamepad.buttons[0].value;
        this.buttonCircle = this.browserGamepad.buttons[1].value;
        this.buttonSquare = this.browserGamepad.buttons[2].value;
        this.buttonTriangle = this.browserGamepad.buttons[3].value;
        this.buttonL1 = this.browserGamepad.buttons[4].value;
        this.buttonR1 = this.browserGamepad.buttons[5].value;
        this.leftTrigger = this.browserGamepad.buttons[6].value;
        this.rightTrigger = this.browserGamepad.buttons[7].value;
        this.buttonShare = this.browserGamepad.buttons[8].value;
        this.buttonOptions = this.browserGamepad.buttons[9].value;
        this.buttonLeftStick = this.browserGamepad.buttons[10].value;
        this.buttonRightStick = this.browserGamepad.buttons[11].value;
        this.dPadUp = this.browserGamepad.buttons[12].value;
        this.dPadDown = this.browserGamepad.buttons[13].value;
        this.dPadLeft = this.browserGamepad.buttons[14].value;
        this.dPadRight = this.browserGamepad.buttons[15].value;
      }
      /**
       * Disposes the gamepad
       */
      dispose() {
        super.dispose();
        this.onButtonDownObservable.clear();
        this.onButtonUpObservable.clear();
        this.onPadDownObservable.clear();
        this.onPadUpObservable.clear();
      }
    };
  }
});

// node_modules/@babylonjs/core/Gamepads/gamepadManager.js
var GamepadManager;
var init_gamepadManager = __esm({
  "node_modules/@babylonjs/core/Gamepads/gamepadManager.js"() {
    init_observable();
    init_domManagement();
    init_xboxGamepad();
    init_gamepad();
    init_engine();
    init_dualShockGamepad();
    init_tools();
    GamepadManager = class {
      /**
       * Initializes the gamepad manager
       * @param _scene BabylonJS scene
       */
      constructor(_scene) {
        this._scene = _scene;
        this._babylonGamepads = [];
        this._oneGamepadConnected = false;
        this._isMonitoring = false;
        this.onGamepadDisconnectedObservable = new Observable();
        if (!IsWindowObjectExist()) {
          this._gamepadEventSupported = false;
        } else {
          this._gamepadEventSupported = "GamepadEvent" in window;
          this._gamepadSupport = navigator && navigator.getGamepads;
        }
        this.onGamepadConnectedObservable = new Observable((observer2) => {
          for (const i in this._babylonGamepads) {
            const gamepad = this._babylonGamepads[i];
            if (gamepad && gamepad._isConnected) {
              this.onGamepadConnectedObservable.notifyObserver(observer2, gamepad);
            }
          }
        });
        this._onGamepadConnectedEvent = (evt) => {
          const gamepad = evt.gamepad;
          if (gamepad.index in this._babylonGamepads) {
            if (this._babylonGamepads[gamepad.index].isConnected) {
              return;
            }
          }
          let newGamepad;
          if (this._babylonGamepads[gamepad.index]) {
            newGamepad = this._babylonGamepads[gamepad.index];
            newGamepad.browserGamepad = gamepad;
            newGamepad._isConnected = true;
          } else {
            newGamepad = this._addNewGamepad(gamepad);
          }
          this.onGamepadConnectedObservable.notifyObservers(newGamepad);
          this._startMonitoringGamepads();
        };
        this._onGamepadDisconnectedEvent = (evt) => {
          const gamepad = evt.gamepad;
          for (const i in this._babylonGamepads) {
            if (this._babylonGamepads[i].index === gamepad.index) {
              const disconnectedGamepad = this._babylonGamepads[i];
              disconnectedGamepad._isConnected = false;
              this.onGamepadDisconnectedObservable.notifyObservers(disconnectedGamepad);
              disconnectedGamepad.dispose && disconnectedGamepad.dispose();
              break;
            }
          }
        };
        if (this._gamepadSupport) {
          this._updateGamepadObjects();
          if (this._babylonGamepads.length) {
            this._startMonitoringGamepads();
          }
          if (this._gamepadEventSupported) {
            const hostWindow = this._scene ? this._scene.getEngine().getHostWindow() : window;
            if (hostWindow) {
              hostWindow.addEventListener("gamepadconnected", this._onGamepadConnectedEvent, false);
              hostWindow.addEventListener("gamepaddisconnected", this._onGamepadDisconnectedEvent, false);
            }
          } else {
            this._startMonitoringGamepads();
          }
        }
      }
      /**
       * The gamepads in the game pad manager
       */
      get gamepads() {
        return this._babylonGamepads;
      }
      /**
       * Get the gamepad controllers based on type
       * @param type The type of gamepad controller
       * @returns Nullable gamepad
       */
      getGamepadByType(type = Gamepad.XBOX) {
        for (const gamepad of this._babylonGamepads) {
          if (gamepad && gamepad.type === type) {
            return gamepad;
          }
        }
        return null;
      }
      /**
       * Disposes the gamepad manager
       */
      dispose() {
        if (this._gamepadEventSupported) {
          if (this._onGamepadConnectedEvent) {
            window.removeEventListener("gamepadconnected", this._onGamepadConnectedEvent);
          }
          if (this._onGamepadDisconnectedEvent) {
            window.removeEventListener("gamepaddisconnected", this._onGamepadDisconnectedEvent);
          }
          this._onGamepadConnectedEvent = null;
          this._onGamepadDisconnectedEvent = null;
        }
        this._babylonGamepads.forEach((gamepad) => {
          gamepad.dispose();
        });
        this.onGamepadConnectedObservable.clear();
        this.onGamepadDisconnectedObservable.clear();
        this._oneGamepadConnected = false;
        this._stopMonitoringGamepads();
        this._babylonGamepads = [];
      }
      _addNewGamepad(gamepad) {
        if (!this._oneGamepadConnected) {
          this._oneGamepadConnected = true;
        }
        let newGamepad;
        const dualShock = gamepad.id.search("054c") !== -1 && gamepad.id.search("0ce6") === -1;
        const xboxOne = gamepad.id.search("Xbox One") !== -1;
        if (xboxOne || gamepad.id.search("Xbox 360") !== -1 || gamepad.id.search("xinput") !== -1 || gamepad.id.search("045e") !== -1 && gamepad.id.search("Surface Dock") === -1) {
          newGamepad = new Xbox360Pad(gamepad.id, gamepad.index, gamepad, xboxOne);
        } else if (dualShock) {
          newGamepad = new DualShockPad(gamepad.id, gamepad.index, gamepad);
        } else {
          newGamepad = new GenericPad(gamepad.id, gamepad.index, gamepad);
        }
        this._babylonGamepads[newGamepad.index] = newGamepad;
        return newGamepad;
      }
      _startMonitoringGamepads() {
        if (!this._isMonitoring) {
          this._isMonitoring = true;
          this._checkGamepadsStatus();
        }
      }
      _stopMonitoringGamepads() {
        this._isMonitoring = false;
      }
      /** @internal */
      _checkGamepadsStatus() {
        this._updateGamepadObjects();
        for (const i in this._babylonGamepads) {
          const gamepad = this._babylonGamepads[i];
          if (!gamepad || !gamepad.isConnected) {
            continue;
          }
          try {
            gamepad.update();
          } catch {
            if (this._loggedErrors.indexOf(gamepad.index) === -1) {
              Tools.Warn(`Error updating gamepad ${gamepad.id}`);
              this._loggedErrors.push(gamepad.index);
            }
          }
        }
        if (this._isMonitoring) {
          Engine.QueueNewFrame(() => {
            this._checkGamepadsStatus();
          });
        }
      }
      // This function is called only on Chrome, which does not properly support
      // connection/disconnection events and forces you to recopy again the gamepad object
      _updateGamepadObjects() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (let i = 0; i < gamepads.length; i++) {
          const gamepad = gamepads[i];
          if (gamepad) {
            if (!this._babylonGamepads[gamepad.index]) {
              const newGamepad = this._addNewGamepad(gamepad);
              this.onGamepadConnectedObservable.notifyObservers(newGamepad);
            } else {
              this._babylonGamepads[i].browserGamepad = gamepad;
              if (!this._babylonGamepads[i].isConnected) {
                this._babylonGamepads[i]._isConnected = true;
                this.onGamepadConnectedObservable.notifyObservers(this._babylonGamepads[i]);
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/freeCameraGamepadInput.js
var FreeCameraGamepadInput;
var init_freeCameraGamepadInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/freeCameraGamepadInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_math_vector();
    init_gamepad();
    FreeCameraGamepadInput = class {
      constructor() {
        this.gamepadAngularSensibility = 200;
        this.gamepadMoveSensibility = 40;
        this.deadzoneDelta = 0.1;
        this._yAxisScale = 1;
        this._cameraTransform = Matrix.Identity();
        this._deltaTransform = Vector3.Zero();
        this._vector3 = Vector3.Zero();
        this._vector2 = Vector2.Zero();
      }
      /**
       * Gets or sets a boolean indicating that Yaxis (for right stick) should be inverted
       */
      get invertYAxis() {
        return this._yAxisScale !== 1;
      }
      set invertYAxis(value) {
        this._yAxisScale = value ? -1 : 1;
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       */
      attachControl() {
        const manager = this.camera.getScene().gamepadManager;
        this._onGamepadConnectedObserver = manager.onGamepadConnectedObservable.add((gamepad) => {
          if (gamepad.type !== Gamepad.POSE_ENABLED) {
            if (!this.gamepad || gamepad.type === Gamepad.XBOX) {
              this.gamepad = gamepad;
            }
          }
        });
        this._onGamepadDisconnectedObserver = manager.onGamepadDisconnectedObservable.add((gamepad) => {
          if (this.gamepad === gamepad) {
            this.gamepad = null;
          }
        });
        this.gamepad = manager.getGamepadByType(Gamepad.XBOX);
        if (!this.gamepad && manager.gamepads.length) {
          this.gamepad = manager.gamepads[0];
        }
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        this.camera.getScene().gamepadManager.onGamepadConnectedObservable.remove(this._onGamepadConnectedObserver);
        this.camera.getScene().gamepadManager.onGamepadDisconnectedObservable.remove(this._onGamepadDisconnectedObserver);
        this.gamepad = null;
      }
      /**
       * Update the current camera state depending on the inputs that have been used this frame.
       * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
       */
      checkInputs() {
        if (this.gamepad && this.gamepad.leftStick) {
          const camera = this.camera;
          const lsValues = this.gamepad.leftStick;
          if (this.gamepadMoveSensibility !== 0) {
            lsValues.x = Math.abs(lsValues.x) > this.deadzoneDelta ? lsValues.x / this.gamepadMoveSensibility : 0;
            lsValues.y = Math.abs(lsValues.y) > this.deadzoneDelta ? lsValues.y / this.gamepadMoveSensibility : 0;
          }
          let rsValues = this.gamepad.rightStick;
          if (rsValues && this.gamepadAngularSensibility !== 0) {
            rsValues.x = Math.abs(rsValues.x) > this.deadzoneDelta ? rsValues.x / this.gamepadAngularSensibility : 0;
            rsValues.y = (Math.abs(rsValues.y) > this.deadzoneDelta ? rsValues.y / this.gamepadAngularSensibility : 0) * this._yAxisScale;
          } else {
            rsValues = { x: 0, y: 0 };
          }
          if (!camera.rotationQuaternion) {
            Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, this._cameraTransform);
          } else {
            camera.rotationQuaternion.toRotationMatrix(this._cameraTransform);
          }
          const speed = camera._computeLocalCameraSpeed() * 50;
          this._vector3.copyFromFloats(lsValues.x * speed, 0, -lsValues.y * speed);
          Vector3.TransformCoordinatesToRef(this._vector3, this._cameraTransform, this._deltaTransform);
          camera.cameraDirection.addInPlace(this._deltaTransform);
          this._vector2.copyFromFloats(rsValues.y, rsValues.x);
          camera.cameraRotation.addInPlace(this._vector2);
        }
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "FreeCameraGamepadInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "gamepad";
      }
    };
    __decorate([
      serialize()
    ], FreeCameraGamepadInput.prototype, "gamepadAngularSensibility", void 0);
    __decorate([
      serialize()
    ], FreeCameraGamepadInput.prototype, "gamepadMoveSensibility", void 0);
    CameraInputTypes["FreeCameraGamepadInput"] = FreeCameraGamepadInput;
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/BaseCameraPointersInput.js
var BaseCameraPointersInput;
var init_BaseCameraPointersInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/BaseCameraPointersInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_tools();
    init_pointerEvents();
    BaseCameraPointersInput = class {
      constructor() {
        this._currentActiveButton = -1;
        this.buttons = [0, 1, 2];
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        const engine = this.camera.getEngine();
        const element = engine.getInputElement();
        let previousPinchSquaredDistance = 0;
        let previousMultiTouchPanPosition = null;
        this._pointA = null;
        this._pointB = null;
        this._altKey = false;
        this._ctrlKey = false;
        this._metaKey = false;
        this._shiftKey = false;
        this._buttonsPressed = 0;
        this._pointerInput = (p) => {
          var _a, _b;
          const evt = p.event;
          const isTouch = evt.pointerType === "touch";
          if (p.type !== PointerEventTypes.POINTERMOVE && this.buttons.indexOf(evt.button) === -1) {
            return;
          }
          const srcElement = evt.target;
          this._altKey = evt.altKey;
          this._ctrlKey = evt.ctrlKey;
          this._metaKey = evt.metaKey;
          this._shiftKey = evt.shiftKey;
          this._buttonsPressed = evt.buttons;
          if (engine.isPointerLock) {
            const offsetX = evt.movementX;
            const offsetY = evt.movementY;
            this.onTouch(null, offsetX, offsetY);
            this._pointA = null;
            this._pointB = null;
          } else if (p.type !== PointerEventTypes.POINTERDOWN && isTouch && ((_a = this._pointA) == null ? void 0 : _a.pointerId) !== evt.pointerId && ((_b = this._pointB) == null ? void 0 : _b.pointerId) !== evt.pointerId) {
            return;
          } else if (p.type === PointerEventTypes.POINTERDOWN && (this._currentActiveButton === -1 || isTouch)) {
            try {
              srcElement == null ? void 0 : srcElement.setPointerCapture(evt.pointerId);
            } catch (e) {
            }
            if (this._pointA === null) {
              this._pointA = {
                x: evt.clientX,
                y: evt.clientY,
                pointerId: evt.pointerId,
                type: evt.pointerType
              };
            } else if (this._pointB === null) {
              this._pointB = {
                x: evt.clientX,
                y: evt.clientY,
                pointerId: evt.pointerId,
                type: evt.pointerType
              };
            } else {
              return;
            }
            if (this._currentActiveButton === -1 && !isTouch) {
              this._currentActiveButton = evt.button;
            }
            this.onButtonDown(evt);
            if (!noPreventDefault) {
              evt.preventDefault();
              element && element.focus();
            }
          } else if (p.type === PointerEventTypes.POINTERDOUBLETAP) {
            this.onDoubleTap(evt.pointerType);
          } else if (p.type === PointerEventTypes.POINTERUP && (this._currentActiveButton === evt.button || isTouch)) {
            try {
              srcElement == null ? void 0 : srcElement.releasePointerCapture(evt.pointerId);
            } catch (e) {
            }
            if (!isTouch) {
              this._pointB = null;
            }
            if (engine._badOS) {
              this._pointA = this._pointB = null;
            } else {
              if (this._pointB && this._pointA && this._pointA.pointerId == evt.pointerId) {
                this._pointA = this._pointB;
                this._pointB = null;
              } else if (this._pointA && this._pointB && this._pointB.pointerId == evt.pointerId) {
                this._pointB = null;
              } else {
                this._pointA = this._pointB = null;
              }
            }
            if (previousPinchSquaredDistance !== 0 || previousMultiTouchPanPosition) {
              this.onMultiTouch(
                this._pointA,
                this._pointB,
                previousPinchSquaredDistance,
                0,
                // pinchSquaredDistance
                previousMultiTouchPanPosition,
                null
                // multiTouchPanPosition
              );
              previousPinchSquaredDistance = 0;
              previousMultiTouchPanPosition = null;
            }
            this._currentActiveButton = -1;
            this.onButtonUp(evt);
            if (!noPreventDefault) {
              evt.preventDefault();
            }
          } else if (p.type === PointerEventTypes.POINTERMOVE) {
            if (!noPreventDefault) {
              evt.preventDefault();
            }
            if (this._pointA && this._pointB === null) {
              const offsetX = evt.clientX - this._pointA.x;
              const offsetY = evt.clientY - this._pointA.y;
              this.onTouch(this._pointA, offsetX, offsetY);
              this._pointA.x = evt.clientX;
              this._pointA.y = evt.clientY;
            } else if (this._pointA && this._pointB) {
              const ed = this._pointA.pointerId === evt.pointerId ? this._pointA : this._pointB;
              ed.x = evt.clientX;
              ed.y = evt.clientY;
              const distX = this._pointA.x - this._pointB.x;
              const distY = this._pointA.y - this._pointB.y;
              const pinchSquaredDistance = distX * distX + distY * distY;
              const multiTouchPanPosition = {
                x: (this._pointA.x + this._pointB.x) / 2,
                y: (this._pointA.y + this._pointB.y) / 2,
                pointerId: evt.pointerId,
                type: p.type
              };
              this.onMultiTouch(this._pointA, this._pointB, previousPinchSquaredDistance, pinchSquaredDistance, previousMultiTouchPanPosition, multiTouchPanPosition);
              previousMultiTouchPanPosition = multiTouchPanPosition;
              previousPinchSquaredDistance = pinchSquaredDistance;
            }
          }
        };
        this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._pointerInput, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE | PointerEventTypes.POINTERDOUBLETAP);
        this._onLostFocus = () => {
          this._pointA = this._pointB = null;
          previousPinchSquaredDistance = 0;
          previousMultiTouchPanPosition = null;
          this.onLostFocus();
        };
        this._contextMenuBind = (evt) => this.onContextMenu(evt);
        element && element.addEventListener("contextmenu", this._contextMenuBind, false);
        const hostWindow = this.camera.getScene().getEngine().getHostWindow();
        if (hostWindow) {
          Tools.RegisterTopRootEvents(hostWindow, [{ name: "blur", handler: this._onLostFocus }]);
        }
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        if (this._onLostFocus) {
          const hostWindow = this.camera.getScene().getEngine().getHostWindow();
          if (hostWindow) {
            Tools.UnregisterTopRootEvents(hostWindow, [{ name: "blur", handler: this._onLostFocus }]);
          }
        }
        if (this._observer) {
          this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer);
          this._observer = null;
          if (this._contextMenuBind) {
            const inputElement = this.camera.getScene().getEngine().getInputElement();
            inputElement && inputElement.removeEventListener("contextmenu", this._contextMenuBind);
          }
          this._onLostFocus = null;
        }
        this._altKey = false;
        this._ctrlKey = false;
        this._metaKey = false;
        this._shiftKey = false;
        this._buttonsPressed = 0;
        this._currentActiveButton = -1;
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "BaseCameraPointersInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "pointers";
      }
      /**
       * Called on pointer POINTERDOUBLETAP event.
       * Override this method to provide functionality on POINTERDOUBLETAP event.
       * @param type type of event
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onDoubleTap(type) {
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      /**
       * Called on pointer POINTERMOVE event if only a single touch is active.
       * Override this method to provide functionality.
       * @param point The current position of the pointer
       * @param offsetX The offsetX of the pointer when the event occurred
       * @param offsetY The offsetY of the pointer when the event occurred
       */
      onTouch(point, offsetX, offsetY) {
      }
      /**
       * Called on pointer POINTERMOVE event if multiple touches are active.
       * Override this method to provide functionality.
       * @param _pointA First point in the pair
       * @param _pointB Second point in the pair
       * @param previousPinchSquaredDistance Sqr Distance between the points the last time this event was fired (by this input)
       * @param pinchSquaredDistance Sqr Distance between the points this time
       * @param previousMultiTouchPanPosition Previous center point between the points
       * @param multiTouchPanPosition Current center point between the points
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onMultiTouch(_pointA, _pointB, previousPinchSquaredDistance, pinchSquaredDistance, previousMultiTouchPanPosition, multiTouchPanPosition) {
      }
      /**
       * Called on JS contextmenu event.
       * Override this method to provide functionality.
       * @param evt the event to be handled
       */
      onContextMenu(evt) {
        evt.preventDefault();
      }
      /**
       * Called each time a new POINTERDOWN event occurs. Ie, for each button
       * press.
       * Override this method to provide functionality.
       * @param _evt Defines the event to track
       */
      onButtonDown(_evt) {
      }
      /**
       * Called each time a new POINTERUP event occurs. Ie, for each button
       * release.
       * Override this method to provide functionality.
       * @param _evt Defines the event to track
       */
      onButtonUp(_evt) {
      }
      /**
       * Called when window becomes inactive.
       * Override this method to provide functionality.
       */
      onLostFocus() {
      }
    };
    __decorate([
      serialize()
    ], BaseCameraPointersInput.prototype, "buttons", void 0);
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraPointersInput.js
var ArcRotateCameraPointersInput;
var init_arcRotateCameraPointersInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraPointersInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_BaseCameraPointersInput();
    ArcRotateCameraPointersInput = class _ArcRotateCameraPointersInput extends BaseCameraPointersInput {
      constructor() {
        super(...arguments);
        this.buttons = [0, 1, 2];
        this.angularSensibilityX = 1e3;
        this.angularSensibilityY = 1e3;
        this.pinchPrecision = 12;
        this.pinchDeltaPercentage = 0;
        this.useNaturalPinchZoom = false;
        this.pinchZoom = true;
        this.panningSensibility = 1e3;
        this.multiTouchPanning = true;
        this.multiTouchPanAndZoom = true;
        this.pinchInwards = true;
        this._isPanClick = false;
        this._twoFingerActivityCount = 0;
        this._isPinching = false;
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "ArcRotateCameraPointersInput";
      }
      /**
       * Move camera from multi touch panning positions.
       * @param previousMultiTouchPanPosition
       * @param multiTouchPanPosition
       */
      _computeMultiTouchPanning(previousMultiTouchPanPosition, multiTouchPanPosition) {
        if (this.panningSensibility !== 0 && previousMultiTouchPanPosition && multiTouchPanPosition) {
          const moveDeltaX = multiTouchPanPosition.x - previousMultiTouchPanPosition.x;
          const moveDeltaY = multiTouchPanPosition.y - previousMultiTouchPanPosition.y;
          this.camera.inertialPanningX += -moveDeltaX / this.panningSensibility;
          this.camera.inertialPanningY += moveDeltaY / this.panningSensibility;
        }
      }
      /**
       * Move camera from pinch zoom distances.
       * @param previousPinchSquaredDistance
       * @param pinchSquaredDistance
       */
      _computePinchZoom(previousPinchSquaredDistance, pinchSquaredDistance) {
        const radius = this.camera.radius || _ArcRotateCameraPointersInput.MinimumRadiusForPinch;
        if (this.useNaturalPinchZoom) {
          this.camera.radius = radius * Math.sqrt(previousPinchSquaredDistance) / Math.sqrt(pinchSquaredDistance);
        } else if (this.pinchDeltaPercentage) {
          this.camera.inertialRadiusOffset += (pinchSquaredDistance - previousPinchSquaredDistance) * 1e-3 * radius * this.pinchDeltaPercentage;
        } else {
          this.camera.inertialRadiusOffset += (pinchSquaredDistance - previousPinchSquaredDistance) / (this.pinchPrecision * (this.pinchInwards ? 1 : -1) * (this.angularSensibilityX + this.angularSensibilityY) / 2);
        }
      }
      /**
       * Called on pointer POINTERMOVE event if only a single touch is active.
       * @param point current touch point
       * @param offsetX offset on X
       * @param offsetY offset on Y
       */
      onTouch(point, offsetX, offsetY) {
        if (this.panningSensibility !== 0 && (this._ctrlKey && this.camera._useCtrlForPanning || this._isPanClick)) {
          this.camera.inertialPanningX += -offsetX / this.panningSensibility;
          this.camera.inertialPanningY += offsetY / this.panningSensibility;
        } else {
          this.camera.inertialAlphaOffset -= offsetX / this.angularSensibilityX;
          this.camera.inertialBetaOffset -= offsetY / this.angularSensibilityY;
        }
      }
      /**
       * Called on pointer POINTERDOUBLETAP event.
       */
      onDoubleTap() {
        if (this.camera.useInputToRestoreState) {
          this.camera.restoreState();
        }
      }
      /**
       * Called on pointer POINTERMOVE event if multiple touches are active.
       * @param pointA point A
       * @param pointB point B
       * @param previousPinchSquaredDistance distance between points in previous pinch
       * @param pinchSquaredDistance distance between points in current pinch
       * @param previousMultiTouchPanPosition multi-touch position in previous step
       * @param multiTouchPanPosition multi-touch position in current step
       */
      onMultiTouch(pointA, pointB, previousPinchSquaredDistance, pinchSquaredDistance, previousMultiTouchPanPosition, multiTouchPanPosition) {
        if (previousPinchSquaredDistance === 0 && previousMultiTouchPanPosition === null) {
          return;
        }
        if (pinchSquaredDistance === 0 && multiTouchPanPosition === null) {
          return;
        }
        if (this.multiTouchPanAndZoom) {
          this._computePinchZoom(previousPinchSquaredDistance, pinchSquaredDistance);
          this._computeMultiTouchPanning(previousMultiTouchPanPosition, multiTouchPanPosition);
        } else if (this.multiTouchPanning && this.pinchZoom) {
          this._twoFingerActivityCount++;
          if (this._isPinching || this._twoFingerActivityCount < 20 && Math.abs(Math.sqrt(pinchSquaredDistance) - Math.sqrt(previousPinchSquaredDistance)) > this.camera.pinchToPanMaxDistance) {
            this._computePinchZoom(previousPinchSquaredDistance, pinchSquaredDistance);
            this._isPinching = true;
          } else {
            this._computeMultiTouchPanning(previousMultiTouchPanPosition, multiTouchPanPosition);
          }
        } else if (this.multiTouchPanning) {
          this._computeMultiTouchPanning(previousMultiTouchPanPosition, multiTouchPanPosition);
        } else if (this.pinchZoom) {
          this._computePinchZoom(previousPinchSquaredDistance, pinchSquaredDistance);
        }
      }
      /**
       * Called each time a new POINTERDOWN event occurs. Ie, for each button
       * press.
       * @param evt Defines the event to track
       */
      onButtonDown(evt) {
        this._isPanClick = evt.button === this.camera._panningMouseButton;
      }
      /**
       * Called each time a new POINTERUP event occurs. Ie, for each button
       * release.
       * @param _evt Defines the event to track
       */
      onButtonUp(_evt) {
        this._twoFingerActivityCount = 0;
        this._isPinching = false;
      }
      /**
       * Called when window becomes inactive.
       */
      onLostFocus() {
        this._isPanClick = false;
        this._twoFingerActivityCount = 0;
        this._isPinching = false;
      }
    };
    ArcRotateCameraPointersInput.MinimumRadiusForPinch = 1e-3;
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "buttons", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "angularSensibilityX", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "angularSensibilityY", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "pinchPrecision", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "pinchDeltaPercentage", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "useNaturalPinchZoom", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "pinchZoom", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "panningSensibility", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "multiTouchPanning", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraPointersInput.prototype, "multiTouchPanAndZoom", void 0);
    CameraInputTypes["ArcRotateCameraPointersInput"] = ArcRotateCameraPointersInput;
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraKeyboardMoveInput.js
var ArcRotateCameraKeyboardMoveInput;
var init_arcRotateCameraKeyboardMoveInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraKeyboardMoveInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_keyboardEvents();
    init_tools();
    ArcRotateCameraKeyboardMoveInput = class {
      constructor() {
        this.keysUp = [38];
        this.keysDown = [40];
        this.keysLeft = [37];
        this.keysRight = [39];
        this.keysReset = [220];
        this.panningSensibility = 50;
        this.zoomingSensibility = 25;
        this.useAltToZoom = true;
        this.angularSpeed = 0.01;
        this._keys = new Array();
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        if (this._onCanvasBlurObserver) {
          return;
        }
        this._scene = this.camera.getScene();
        this._engine = this._scene.getEngine();
        this._onCanvasBlurObserver = this._engine.onCanvasBlurObservable.add(() => {
          this._keys.length = 0;
        });
        this._onKeyboardObserver = this._scene.onKeyboardObservable.add((info) => {
          const evt = info.event;
          if (!evt.metaKey) {
            if (info.type === KeyboardEventTypes.KEYDOWN) {
              this._ctrlPressed = evt.ctrlKey;
              this._altPressed = evt.altKey;
              if (this.keysUp.indexOf(evt.keyCode) !== -1 || this.keysDown.indexOf(evt.keyCode) !== -1 || this.keysLeft.indexOf(evt.keyCode) !== -1 || this.keysRight.indexOf(evt.keyCode) !== -1 || this.keysReset.indexOf(evt.keyCode) !== -1) {
                const index = this._keys.indexOf(evt.keyCode);
                if (index === -1) {
                  this._keys.push(evt.keyCode);
                }
                if (evt.preventDefault) {
                  if (!noPreventDefault) {
                    evt.preventDefault();
                  }
                }
              }
            } else {
              if (this.keysUp.indexOf(evt.keyCode) !== -1 || this.keysDown.indexOf(evt.keyCode) !== -1 || this.keysLeft.indexOf(evt.keyCode) !== -1 || this.keysRight.indexOf(evt.keyCode) !== -1 || this.keysReset.indexOf(evt.keyCode) !== -1) {
                const index = this._keys.indexOf(evt.keyCode);
                if (index >= 0) {
                  this._keys.splice(index, 1);
                }
                if (evt.preventDefault) {
                  if (!noPreventDefault) {
                    evt.preventDefault();
                  }
                }
              }
            }
          }
        });
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        if (this._scene) {
          if (this._onKeyboardObserver) {
            this._scene.onKeyboardObservable.remove(this._onKeyboardObserver);
          }
          if (this._onCanvasBlurObserver) {
            this._engine.onCanvasBlurObservable.remove(this._onCanvasBlurObserver);
          }
          this._onKeyboardObserver = null;
          this._onCanvasBlurObserver = null;
        }
        this._keys.length = 0;
      }
      /**
       * Update the current camera state depending on the inputs that have been used this frame.
       * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
       */
      checkInputs() {
        if (this._onKeyboardObserver) {
          const camera = this.camera;
          for (let index = 0; index < this._keys.length; index++) {
            const keyCode = this._keys[index];
            if (this.keysLeft.indexOf(keyCode) !== -1) {
              if (this._ctrlPressed && this.camera._useCtrlForPanning) {
                camera.inertialPanningX -= 1 / this.panningSensibility;
              } else {
                camera.inertialAlphaOffset -= this.angularSpeed;
              }
            } else if (this.keysUp.indexOf(keyCode) !== -1) {
              if (this._ctrlPressed && this.camera._useCtrlForPanning) {
                camera.inertialPanningY += 1 / this.panningSensibility;
              } else if (this._altPressed && this.useAltToZoom) {
                camera.inertialRadiusOffset += 1 / this.zoomingSensibility;
              } else {
                camera.inertialBetaOffset -= this.angularSpeed;
              }
            } else if (this.keysRight.indexOf(keyCode) !== -1) {
              if (this._ctrlPressed && this.camera._useCtrlForPanning) {
                camera.inertialPanningX += 1 / this.panningSensibility;
              } else {
                camera.inertialAlphaOffset += this.angularSpeed;
              }
            } else if (this.keysDown.indexOf(keyCode) !== -1) {
              if (this._ctrlPressed && this.camera._useCtrlForPanning) {
                camera.inertialPanningY -= 1 / this.panningSensibility;
              } else if (this._altPressed && this.useAltToZoom) {
                camera.inertialRadiusOffset -= 1 / this.zoomingSensibility;
              } else {
                camera.inertialBetaOffset += this.angularSpeed;
              }
            } else if (this.keysReset.indexOf(keyCode) !== -1) {
              if (camera.useInputToRestoreState) {
                camera.restoreState();
              }
            }
          }
        }
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "ArcRotateCameraKeyboardMoveInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "keyboard";
      }
    };
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "keysUp", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "keysDown", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "keysLeft", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "keysRight", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "keysReset", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "panningSensibility", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "zoomingSensibility", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "useAltToZoom", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraKeyboardMoveInput.prototype, "angularSpeed", void 0);
    CameraInputTypes["ArcRotateCameraKeyboardMoveInput"] = ArcRotateCameraKeyboardMoveInput;
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraMouseWheelInput.js
var ffMultiplier, ArcRotateCameraMouseWheelInput;
var init_arcRotateCameraMouseWheelInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraMouseWheelInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_pointerEvents();
    init_math_plane();
    init_math_vector();
    init_math_constants();
    init_deviceInputEvents();
    init_math_scalar();
    init_tools();
    ffMultiplier = 40;
    ArcRotateCameraMouseWheelInput = class {
      constructor() {
        this.wheelPrecision = 3;
        this.zoomToMouseLocation = false;
        this.wheelDeltaPercentage = 0;
        this.customComputeDeltaFromMouseWheel = null;
        this._viewOffset = new Vector3(0, 0, 0);
        this._globalOffset = new Vector3(0, 0, 0);
        this._inertialPanning = Vector3.Zero();
      }
      _computeDeltaFromMouseWheelLegacyEvent(mouseWheelDelta, radius) {
        let delta = 0;
        const wheelDelta = mouseWheelDelta * 0.01 * this.wheelDeltaPercentage * radius;
        if (mouseWheelDelta > 0) {
          delta = wheelDelta / (1 + this.wheelDeltaPercentage);
        } else {
          delta = wheelDelta * (1 + this.wheelDeltaPercentage);
        }
        return delta;
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
       */
      attachControl(noPreventDefault) {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
        this._wheel = (p) => {
          if (p.type !== PointerEventTypes.POINTERWHEEL) {
            return;
          }
          const event = p.event;
          let delta = 0;
          const platformScale = event.deltaMode === EventConstants.DOM_DELTA_LINE ? ffMultiplier : 1;
          const wheelDelta = -(event.deltaY * platformScale);
          if (this.customComputeDeltaFromMouseWheel) {
            delta = this.customComputeDeltaFromMouseWheel(wheelDelta, this, event);
          } else {
            if (this.wheelDeltaPercentage) {
              delta = this._computeDeltaFromMouseWheelLegacyEvent(wheelDelta, this.camera.radius);
              if (delta > 0) {
                let estimatedTargetRadius = this.camera.radius;
                let targetInertia = this.camera.inertialRadiusOffset + delta;
                for (let i = 0; i < 20 && Math.abs(targetInertia) > 1e-3; i++) {
                  estimatedTargetRadius -= targetInertia;
                  targetInertia *= this.camera.inertia;
                }
                estimatedTargetRadius = Scalar.Clamp(estimatedTargetRadius, 0, Number.MAX_VALUE);
                delta = this._computeDeltaFromMouseWheelLegacyEvent(wheelDelta, estimatedTargetRadius);
              }
            } else {
              delta = wheelDelta / (this.wheelPrecision * 40);
            }
          }
          if (delta) {
            if (this.zoomToMouseLocation) {
              if (!this._hitPlane) {
                this._updateHitPlane();
              }
              this._zoomToMouse(delta);
            } else {
              this.camera.inertialRadiusOffset += delta;
            }
          }
          if (event.preventDefault) {
            if (!noPreventDefault) {
              event.preventDefault();
            }
          }
        };
        this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._wheel, PointerEventTypes.POINTERWHEEL);
        if (this.zoomToMouseLocation) {
          this._inertialPanning.setAll(0);
        }
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        if (this._observer) {
          this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer);
          this._observer = null;
          this._wheel = null;
        }
      }
      /**
       * Update the current camera state depending on the inputs that have been used this frame.
       * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
       */
      checkInputs() {
        if (!this.zoomToMouseLocation) {
          return;
        }
        const camera = this.camera;
        const motion = 0 + camera.inertialAlphaOffset + camera.inertialBetaOffset + camera.inertialRadiusOffset;
        if (motion) {
          this._updateHitPlane();
          camera.target.addInPlace(this._inertialPanning);
          this._inertialPanning.scaleInPlace(camera.inertia);
          this._zeroIfClose(this._inertialPanning);
        }
      }
      /**
       * Gets the class name of the current input.
       * @returns the class name
       */
      getClassName() {
        return "ArcRotateCameraMouseWheelInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "mousewheel";
      }
      _updateHitPlane() {
        const camera = this.camera;
        const direction = camera.target.subtract(camera.position);
        this._hitPlane = Plane.FromPositionAndNormal(camera.target, direction);
      }
      // Get position on the hit plane
      _getPosition() {
        const camera = this.camera;
        const scene = camera.getScene();
        const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera, false);
        if (camera.targetScreenOffset.x !== 0 || camera.targetScreenOffset.y !== 0) {
          this._viewOffset.set(camera.targetScreenOffset.x, camera.targetScreenOffset.y, 0);
          camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
          this._globalOffset = Vector3.TransformNormal(this._viewOffset, camera._cameraTransformMatrix);
          ray.origin.addInPlace(this._globalOffset);
        }
        let distance = 0;
        if (this._hitPlane) {
          distance = ray.intersectsPlane(this._hitPlane) ?? 0;
        }
        return ray.origin.addInPlace(ray.direction.scaleInPlace(distance));
      }
      _zoomToMouse(delta) {
        const camera = this.camera;
        const inertiaComp = 1 - camera.inertia;
        if (camera.lowerRadiusLimit) {
          const lowerLimit = camera.lowerRadiusLimit ?? 0;
          if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp < lowerLimit) {
            delta = (camera.radius - lowerLimit) * inertiaComp - camera.inertialRadiusOffset;
          }
        }
        if (camera.upperRadiusLimit) {
          const upperLimit = camera.upperRadiusLimit ?? 0;
          if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp > upperLimit) {
            delta = (camera.radius - upperLimit) * inertiaComp - camera.inertialRadiusOffset;
          }
        }
        const zoomDistance = delta / inertiaComp;
        const ratio = zoomDistance / camera.radius;
        const vec = this._getPosition();
        const directionToZoomLocation = TmpVectors.Vector3[6];
        vec.subtractToRef(camera.target, directionToZoomLocation);
        directionToZoomLocation.scaleInPlace(ratio);
        directionToZoomLocation.scaleInPlace(inertiaComp);
        this._inertialPanning.addInPlace(directionToZoomLocation);
        camera.inertialRadiusOffset += delta;
      }
      // Sets x y or z of passed in vector to zero if less than Epsilon.
      _zeroIfClose(vec) {
        if (Math.abs(vec.x) < Epsilon) {
          vec.x = 0;
        }
        if (Math.abs(vec.y) < Epsilon) {
          vec.y = 0;
        }
        if (Math.abs(vec.z) < Epsilon) {
          vec.z = 0;
        }
      }
    };
    __decorate([
      serialize()
    ], ArcRotateCameraMouseWheelInput.prototype, "wheelPrecision", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraMouseWheelInput.prototype, "zoomToMouseLocation", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraMouseWheelInput.prototype, "wheelDeltaPercentage", void 0);
    CameraInputTypes["ArcRotateCameraMouseWheelInput"] = ArcRotateCameraMouseWheelInput;
  }
});

// node_modules/@babylonjs/core/Cameras/arcRotateCameraInputsManager.js
var ArcRotateCameraInputsManager;
var init_arcRotateCameraInputsManager = __esm({
  "node_modules/@babylonjs/core/Cameras/arcRotateCameraInputsManager.js"() {
    init_arcRotateCameraPointersInput();
    init_arcRotateCameraKeyboardMoveInput();
    init_arcRotateCameraMouseWheelInput();
    init_cameraInputsManager();
    ArcRotateCameraInputsManager = class extends CameraInputsManager {
      /**
       * Instantiates a new ArcRotateCameraInputsManager.
       * @param camera Defines the camera the inputs belong to
       */
      constructor(camera) {
        super(camera);
      }
      /**
       * Add mouse wheel input support to the input manager.
       * @returns the current input manager
       */
      addMouseWheel() {
        this.add(new ArcRotateCameraMouseWheelInput());
        return this;
      }
      /**
       * Add pointers input support to the input manager.
       * @returns the current input manager
       */
      addPointers() {
        this.add(new ArcRotateCameraPointersInput());
        return this;
      }
      /**
       * Add keyboard input support to the input manager.
       * @returns the current input manager
       */
      addKeyboard() {
        this.add(new ArcRotateCameraKeyboardMoveInput());
        return this;
      }
    };
  }
});

// node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraGamepadInput.js
var ArcRotateCameraGamepadInput;
var init_arcRotateCameraGamepadInput = __esm({
  "node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraGamepadInput.js"() {
    init_tslib_es6();
    init_decorators();
    init_cameraInputsManager();
    init_gamepad();
    ArcRotateCameraGamepadInput = class {
      constructor() {
        this.gamepadRotationSensibility = 80;
        this.gamepadMoveSensibility = 40;
        this._yAxisScale = 1;
      }
      /**
       * Gets or sets a boolean indicating that Yaxis (for right stick) should be inverted
       */
      get invertYAxis() {
        return this._yAxisScale !== 1;
      }
      set invertYAxis(value) {
        this._yAxisScale = value ? -1 : 1;
      }
      /**
       * Attach the input controls to a specific dom element to get the input from.
       */
      attachControl() {
        const manager = this.camera.getScene().gamepadManager;
        this._onGamepadConnectedObserver = manager.onGamepadConnectedObservable.add((gamepad) => {
          if (gamepad.type !== Gamepad.POSE_ENABLED) {
            if (!this.gamepad || gamepad.type === Gamepad.XBOX) {
              this.gamepad = gamepad;
            }
          }
        });
        this._onGamepadDisconnectedObserver = manager.onGamepadDisconnectedObservable.add((gamepad) => {
          if (this.gamepad === gamepad) {
            this.gamepad = null;
          }
        });
        this.gamepad = manager.getGamepadByType(Gamepad.XBOX);
        if (!this.gamepad && manager.gamepads.length) {
          this.gamepad = manager.gamepads[0];
        }
      }
      /**
       * Detach the current controls from the specified dom element.
       */
      detachControl() {
        this.camera.getScene().gamepadManager.onGamepadConnectedObservable.remove(this._onGamepadConnectedObserver);
        this.camera.getScene().gamepadManager.onGamepadDisconnectedObservable.remove(this._onGamepadDisconnectedObserver);
        this.gamepad = null;
      }
      /**
       * Update the current camera state depending on the inputs that have been used this frame.
       * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
       */
      checkInputs() {
        if (this.gamepad) {
          const camera = this.camera;
          const rsValues = this.gamepad.rightStick;
          if (rsValues) {
            if (rsValues.x != 0) {
              const normalizedRX = rsValues.x / this.gamepadRotationSensibility;
              if (normalizedRX != 0 && Math.abs(normalizedRX) > 5e-3) {
                camera.inertialAlphaOffset += normalizedRX;
              }
            }
            if (rsValues.y != 0) {
              const normalizedRY = rsValues.y / this.gamepadRotationSensibility * this._yAxisScale;
              if (normalizedRY != 0 && Math.abs(normalizedRY) > 5e-3) {
                camera.inertialBetaOffset += normalizedRY;
              }
            }
          }
          const lsValues = this.gamepad.leftStick;
          if (lsValues && lsValues.y != 0) {
            const normalizedLY = lsValues.y / this.gamepadMoveSensibility;
            if (normalizedLY != 0 && Math.abs(normalizedLY) > 5e-3) {
              this.camera.inertialRadiusOffset -= normalizedLY;
            }
          }
        }
      }
      /**
       * Gets the class name of the current intput.
       * @returns the class name
       */
      getClassName() {
        return "ArcRotateCameraGamepadInput";
      }
      /**
       * Get the friendly name associated with the input class.
       * @returns the input friendly name
       */
      getSimpleName() {
        return "gamepad";
      }
    };
    __decorate([
      serialize()
    ], ArcRotateCameraGamepadInput.prototype, "gamepadRotationSensibility", void 0);
    __decorate([
      serialize()
    ], ArcRotateCameraGamepadInput.prototype, "gamepadMoveSensibility", void 0);
    CameraInputTypes["ArcRotateCameraGamepadInput"] = ArcRotateCameraGamepadInput;
  }
});

// node_modules/@babylonjs/core/Gamepads/gamepadSceneComponent.js
var GamepadSystemSceneComponent;
var init_gamepadSceneComponent = __esm({
  "node_modules/@babylonjs/core/Gamepads/gamepadSceneComponent.js"() {
    init_scene();
    init_sceneComponent();
    init_gamepadManager();
    init_freeCameraInputsManager();
    init_freeCameraGamepadInput();
    init_arcRotateCameraInputsManager();
    init_arcRotateCameraGamepadInput();
    Object.defineProperty(Scene.prototype, "gamepadManager", {
      get: function() {
        if (!this._gamepadManager) {
          this._gamepadManager = new GamepadManager(this);
          let component = this._getComponent(SceneComponentConstants.NAME_GAMEPAD);
          if (!component) {
            component = new GamepadSystemSceneComponent(this);
            this._addComponent(component);
          }
        }
        return this._gamepadManager;
      },
      enumerable: true,
      configurable: true
    });
    FreeCameraInputsManager.prototype.addGamepad = function() {
      this.add(new FreeCameraGamepadInput());
      return this;
    };
    ArcRotateCameraInputsManager.prototype.addGamepad = function() {
      this.add(new ArcRotateCameraGamepadInput());
      return this;
    };
    GamepadSystemSceneComponent = class {
      /**
       * Creates a new instance of the component for the given scene
       * @param scene Defines the scene to register the component in
       */
      constructor(scene) {
        this.name = SceneComponentConstants.NAME_GAMEPAD;
        this.scene = scene;
      }
      /**
       * Registers the component in a given scene
       */
      register() {
        this.scene._beforeCameraUpdateStage.registerStep(SceneComponentConstants.STEP_BEFORECAMERAUPDATE_GAMEPAD, this, this._beforeCameraUpdate);
      }
      /**
       * Rebuilds the elements related to this component in case of
       * context lost for instance.
       */
      rebuild() {
      }
      /**
       * Disposes the component and the associated resources
       */
      dispose() {
        const gamepadManager = this.scene._gamepadManager;
        if (gamepadManager) {
          gamepadManager.dispose();
          this.scene._gamepadManager = null;
        }
      }
      _beforeCameraUpdate() {
        const gamepadManager = this.scene._gamepadManager;
        if (gamepadManager && gamepadManager._isMonitoring) {
          gamepadManager._checkGamepadsStatus();
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Cameras/universalCamera.js
var UniversalCamera;
var init_universalCamera = __esm({
  "node_modules/@babylonjs/core/Cameras/universalCamera.js"() {
    init_touchCamera();
    init_node();
    init_math_vector();
    init_camera();
    init_gamepadSceneComponent();
    Node.AddNodeConstructor("FreeCamera", (name66, scene) => {
      return () => new UniversalCamera(name66, Vector3.Zero(), scene);
    });
    UniversalCamera = class extends TouchCamera {
      /**
       * Defines the gamepad rotation sensibility.
       * This is the threshold from when rotation starts to be accounted for to prevent jittering.
       */
      get gamepadAngularSensibility() {
        const gamepad = this.inputs.attached["gamepad"];
        if (gamepad) {
          return gamepad.gamepadAngularSensibility;
        }
        return 0;
      }
      set gamepadAngularSensibility(value) {
        const gamepad = this.inputs.attached["gamepad"];
        if (gamepad) {
          gamepad.gamepadAngularSensibility = value;
        }
      }
      /**
       * Defines the gamepad move sensibility.
       * This is the threshold from when moving starts to be accounted for to prevent jittering.
       */
      get gamepadMoveSensibility() {
        const gamepad = this.inputs.attached["gamepad"];
        if (gamepad) {
          return gamepad.gamepadMoveSensibility;
        }
        return 0;
      }
      set gamepadMoveSensibility(value) {
        const gamepad = this.inputs.attached["gamepad"];
        if (gamepad) {
          gamepad.gamepadMoveSensibility = value;
        }
      }
      /**
       * The Universal Camera is the one to choose for first person shooter type games, and works with all the keyboard, mouse, touch and gamepads. This replaces the earlier Free Camera,
       * which still works and will still be found in many Playgrounds.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
       * @param name Define the name of the camera in the scene
       * @param position Define the start position of the camera in the scene
       * @param scene Define the scene the camera belongs to
       */
      constructor(name66, position, scene) {
        super(name66, position, scene);
        this.inputs.addGamepad();
      }
      /**
       * Gets the current object class name.
       * @returns the class name
       */
      getClassName() {
        return "UniversalCamera";
      }
    };
    Camera._CreateDefaultParsedCamera = (name66, scene) => {
      return new UniversalCamera(name66, Vector3.Zero(), scene);
    };
  }
});

// node_modules/@babylonjs/core/XR/webXRExperienceHelper.js
var WebXRExperienceHelper;
var init_webXRExperienceHelper = __esm({
  "node_modules/@babylonjs/core/XR/webXRExperienceHelper.js"() {
    init_observable();
    init_webXRSessionManager();
    init_webXRCamera();
    init_webXRTypes();
    init_webXRFeaturesManager();
    init_logger();
    init_universalCamera();
    init_math_vector();
    WebXRExperienceHelper = class _WebXRExperienceHelper {
      /**
       * Creates a WebXRExperienceHelper
       * @param _scene The scene the helper should be created in
       */
      constructor(_scene) {
        this._scene = _scene;
        this._nonVRCamera = null;
        this._attachedToElement = false;
        this._spectatorCamera = null;
        this._originalSceneAutoClear = true;
        this._supported = false;
        this._spectatorMode = false;
        this._lastTimestamp = 0;
        this.onInitialXRPoseSetObservable = new Observable();
        this.onStateChangedObservable = new Observable();
        this.state = WebXRState.NOT_IN_XR;
        this.sessionManager = new WebXRSessionManager(_scene);
        this.camera = new WebXRCamera("webxr", _scene, this.sessionManager);
        this.featuresManager = new WebXRFeaturesManager(this.sessionManager);
        _scene.onDisposeObservable.addOnce(() => {
          this.dispose();
        });
      }
      /**
       * Creates the experience helper
       * @param scene the scene to attach the experience helper to
       * @returns a promise for the experience helper
       */
      static CreateAsync(scene) {
        const helper = new _WebXRExperienceHelper(scene);
        return helper.sessionManager.initializeAsync().then(() => {
          helper._supported = true;
          return helper;
        }).catch((e) => {
          helper._setState(WebXRState.NOT_IN_XR);
          helper.dispose();
          throw e;
        });
      }
      /**
       * Disposes of the experience helper
       */
      dispose() {
        var _a;
        this.exitXRAsync();
        this.camera.dispose();
        this.onStateChangedObservable.clear();
        this.onInitialXRPoseSetObservable.clear();
        this.sessionManager.dispose();
        (_a = this._spectatorCamera) == null ? void 0 : _a.dispose();
        if (this._nonVRCamera) {
          this._scene.activeCamera = this._nonVRCamera;
        }
      }
      /**
       * Enters XR mode (This must be done within a user interaction in most browsers eg. button click)
       * @param sessionMode options for the XR session
       * @param referenceSpaceType frame of reference of the XR session
       * @param renderTarget the output canvas that will be used to enter XR mode
       * @param sessionCreationOptions optional XRSessionInit object to init the session with
       * @returns promise that resolves after xr mode has entered
       */
      async enterXRAsync(sessionMode, referenceSpaceType, renderTarget = this.sessionManager.getWebXRRenderTarget(), sessionCreationOptions = {}) {
        var _a, _b, _c;
        if (!this._supported) {
          throw "WebXR not supported in this browser or environment";
        }
        this._setState(WebXRState.ENTERING_XR);
        if (referenceSpaceType !== "viewer" && referenceSpaceType !== "local") {
          sessionCreationOptions.optionalFeatures = sessionCreationOptions.optionalFeatures || [];
          sessionCreationOptions.optionalFeatures.push(referenceSpaceType);
        }
        sessionCreationOptions = await this.featuresManager._extendXRSessionInitObject(sessionCreationOptions);
        if (sessionMode === "immersive-ar" && referenceSpaceType !== "unbounded") {
          Logger.Warn("We recommend using 'unbounded' reference space type when using 'immersive-ar' session mode");
        }
        try {
          await this.sessionManager.initializeSessionAsync(sessionMode, sessionCreationOptions);
          await this.sessionManager.setReferenceSpaceTypeAsync(referenceSpaceType);
          const xrRenderState = {
            // if maxZ is 0 it should be "Infinity", but it doesn't work with the WebXR API. Setting to a large number.
            depthFar: this.camera.maxZ || 1e4,
            depthNear: this.camera.minZ
          };
          if (!this.featuresManager.getEnabledFeature(WebXRFeatureName.LAYERS)) {
            const baseLayer = await renderTarget.initializeXRLayerAsync(this.sessionManager.session);
            xrRenderState.baseLayer = baseLayer;
          }
          this.sessionManager.updateRenderState(xrRenderState);
          this.sessionManager.runXRRenderLoop();
          this._originalSceneAutoClear = this._scene.autoClear;
          this._nonVRCamera = this._scene.activeCamera;
          this._attachedToElement = !!((_b = (_a = this._nonVRCamera) == null ? void 0 : _a.inputs) == null ? void 0 : _b.attachedToElement);
          (_c = this._nonVRCamera) == null ? void 0 : _c.detachControl();
          this._scene.activeCamera = this.camera;
          if (sessionMode !== "immersive-ar") {
            this._nonXRToXRCamera();
          } else {
            this._scene.autoClear = false;
            this.camera.compensateOnFirstFrame = false;
            this.camera.position.set(0, 0, 0);
            this.camera.rotationQuaternion.set(0, 0, 0, 1);
            this.onInitialXRPoseSetObservable.notifyObservers(this.camera);
          }
          this.sessionManager.onXRSessionEnded.addOnce(() => {
            if (this.state !== WebXRState.EXITING_XR) {
              this._setState(WebXRState.EXITING_XR);
            }
            this.camera.rigCameras.forEach((c) => {
              c.outputRenderTarget = null;
            });
            this._scene.autoClear = this._originalSceneAutoClear;
            this._scene.activeCamera = this._nonVRCamera;
            if (this._attachedToElement && this._nonVRCamera) {
              this._nonVRCamera.attachControl(!!this._nonVRCamera.inputs.noPreventDefault);
            }
            if (sessionMode !== "immersive-ar" && this.camera.compensateOnFirstFrame) {
              if (this._nonVRCamera.setPosition) {
                this._nonVRCamera.setPosition(this.camera.position);
              } else {
                this._nonVRCamera.position.copyFrom(this.camera.position);
              }
            }
            this._setState(WebXRState.NOT_IN_XR);
          });
          this.sessionManager.onXRFrameObservable.addOnce(() => {
            this._setState(WebXRState.IN_XR);
          });
          return this.sessionManager;
        } catch (e) {
          Logger.Log(e);
          Logger.Log(e.message);
          this._setState(WebXRState.NOT_IN_XR);
          throw e;
        }
      }
      /**
       * Exits XR mode and returns the scene to its original state
       * @returns promise that resolves after xr mode has exited
       */
      exitXRAsync() {
        if (this.state !== WebXRState.IN_XR) {
          return Promise.resolve();
        }
        this._setState(WebXRState.EXITING_XR);
        return this.sessionManager.exitXRAsync();
      }
      /**
       * Enable spectator mode for desktop VR experiences.
       * When spectator mode is enabled a camera will be attached to the desktop canvas and will
       * display the first rig camera's view on the desktop canvas.
       * Please note that this will degrade performance, as it requires another camera render.
       * It is also not recommended to enable this in devices like the quest, as it brings no benefit there.
       * @param options giving WebXRSpectatorModeOption for specutator camera to setup when the spectator mode is enabled.
       */
      enableSpectatorMode(options) {
        if (!this._spectatorMode) {
          this._spectatorMode = true;
          this._switchSpectatorMode(options);
        }
      }
      /**
       * Disable spectator mode for desktop VR experiences.
       */
      disableSpecatatorMode() {
        if (this._spectatorMode) {
          this._spectatorMode = false;
          this._switchSpectatorMode();
        }
      }
      _switchSpectatorMode(options) {
        const fps = (options == null ? void 0 : options.fps) ? options.fps : 1e3;
        const refreshRate = 1 / fps * 1e3;
        const cameraIndex = (options == null ? void 0 : options.preferredCameraIndex) ? options == null ? void 0 : options.preferredCameraIndex : 0;
        const updateSpectatorCamera = () => {
          if (this._spectatorCamera) {
            const delta = this.sessionManager.currentTimestamp - this._lastTimestamp;
            if (delta >= refreshRate) {
              this._lastTimestamp = this.sessionManager.currentTimestamp;
              this._spectatorCamera.position.copyFrom(this.camera.rigCameras[cameraIndex].globalPosition);
              this._spectatorCamera.rotationQuaternion.copyFrom(this.camera.rigCameras[cameraIndex].absoluteRotation);
            }
          }
        };
        if (this._spectatorMode) {
          if (cameraIndex >= this.camera.rigCameras.length) {
            throw new Error("the preferred camera index is beyond the length of rig camera array.");
          }
          const onStateChanged = () => {
            if (this.state === WebXRState.IN_XR) {
              this._spectatorCamera = new UniversalCamera("webxr-spectator", Vector3.Zero(), this._scene);
              this._spectatorCamera.rotationQuaternion = new Quaternion();
              this._scene.activeCameras = [this.camera, this._spectatorCamera];
              this.sessionManager.onXRFrameObservable.add(updateSpectatorCamera);
              this._scene.onAfterRenderCameraObservable.add((camera) => {
                if (camera === this.camera) {
                  this._scene.getEngine().framebufferDimensionsObject = null;
                }
              });
            } else if (this.state === WebXRState.EXITING_XR) {
              this.sessionManager.onXRFrameObservable.removeCallback(updateSpectatorCamera);
              this._scene.activeCameras = null;
            }
          };
          this.onStateChangedObservable.add(onStateChanged);
          onStateChanged();
        } else {
          this.sessionManager.onXRFrameObservable.removeCallback(updateSpectatorCamera);
          this._scene.activeCameras = [this.camera];
        }
      }
      _nonXRToXRCamera() {
        this.camera.setTransformationFromNonVRCamera(this._nonVRCamera);
        this.onInitialXRPoseSetObservable.notifyObservers(this.camera);
      }
      _setState(val) {
        if (this.state === val) {
          return;
        }
        this.state = val;
        this.onStateChangedObservable.notifyObservers(this.state);
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/motionController/webXRControllerComponent.js
var WebXRControllerComponent;
var init_webXRControllerComponent = __esm({
  "node_modules/@babylonjs/core/XR/motionController/webXRControllerComponent.js"() {
    init_observable();
    WebXRControllerComponent = class {
      /**
       * Creates a new component for a motion controller.
       * It is created by the motion controller itself
       *
       * @param id the id of this component
       * @param type the type of the component
       * @param _buttonIndex index in the buttons array of the gamepad
       * @param _axesIndices indices of the values in the axes array of the gamepad
       */
      constructor(id, type, _buttonIndex = -1, _axesIndices = []) {
        this.id = id;
        this.type = type;
        this._buttonIndex = _buttonIndex;
        this._axesIndices = _axesIndices;
        this._axes = {
          x: 0,
          y: 0
        };
        this._changes = {};
        this._currentValue = 0;
        this._hasChanges = false;
        this._pressed = false;
        this._touched = false;
        this.onAxisValueChangedObservable = new Observable();
        this.onButtonStateChangedObservable = new Observable();
      }
      /**
       * The current axes data. If this component has no axes it will still return an object { x: 0, y: 0 }
       */
      get axes() {
        return this._axes;
      }
      /**
       * Get the changes. Elements will be populated only if they changed with their previous and current value
       */
      get changes() {
        return this._changes;
      }
      /**
       * Return whether or not the component changed the last frame
       */
      get hasChanges() {
        return this._hasChanges;
      }
      /**
       * is the button currently pressed
       */
      get pressed() {
        return this._pressed;
      }
      /**
       * is the button currently touched
       */
      get touched() {
        return this._touched;
      }
      /**
       * Get the current value of this component
       */
      get value() {
        return this._currentValue;
      }
      /**
       * Dispose this component
       */
      dispose() {
        this.onAxisValueChangedObservable.clear();
        this.onButtonStateChangedObservable.clear();
      }
      /**
       * Are there axes correlating to this component
       * @returns true is axes data is available
       */
      isAxes() {
        return this._axesIndices.length !== 0;
      }
      /**
       * Is this component a button (hence - pressable)
       * @returns true if can be pressed
       */
      isButton() {
        return this._buttonIndex !== -1;
      }
      /**
       * update this component using the gamepad object it is in. Called on every frame
       * @param nativeController the native gamepad controller object
       */
      update(nativeController) {
        let buttonUpdated = false;
        let axesUpdate = false;
        this._hasChanges = false;
        this._changes = {};
        if (this.isButton()) {
          const button = nativeController.buttons[this._buttonIndex];
          if (!button) {
            return;
          }
          if (this._currentValue !== button.value) {
            this.changes.value = {
              current: button.value,
              previous: this._currentValue
            };
            buttonUpdated = true;
            this._currentValue = button.value;
          }
          if (this._touched !== button.touched) {
            this.changes.touched = {
              current: button.touched,
              previous: this._touched
            };
            buttonUpdated = true;
            this._touched = button.touched;
          }
          if (this._pressed !== button.pressed) {
            this.changes.pressed = {
              current: button.pressed,
              previous: this._pressed
            };
            buttonUpdated = true;
            this._pressed = button.pressed;
          }
        }
        if (this.isAxes()) {
          if (this._axes.x !== nativeController.axes[this._axesIndices[0]]) {
            this.changes.axes = {
              current: {
                x: nativeController.axes[this._axesIndices[0]],
                y: this._axes.y
              },
              previous: {
                x: this._axes.x,
                y: this._axes.y
              }
            };
            this._axes.x = nativeController.axes[this._axesIndices[0]];
            axesUpdate = true;
          }
          if (this._axes.y !== nativeController.axes[this._axesIndices[1]]) {
            if (this.changes.axes) {
              this.changes.axes.current.y = nativeController.axes[this._axesIndices[1]];
            } else {
              this.changes.axes = {
                current: {
                  x: this._axes.x,
                  y: nativeController.axes[this._axesIndices[1]]
                },
                previous: {
                  x: this._axes.x,
                  y: this._axes.y
                }
              };
            }
            this._axes.y = nativeController.axes[this._axesIndices[1]];
            axesUpdate = true;
          }
        }
        if (buttonUpdated) {
          this._hasChanges = true;
          this.onButtonStateChangedObservable.notifyObservers(this);
        }
        if (axesUpdate) {
          this._hasChanges = true;
          this.onAxisValueChangedObservable.notifyObservers(this._axes);
        }
      }
    };
    WebXRControllerComponent.BUTTON_TYPE = "button";
    WebXRControllerComponent.SQUEEZE_TYPE = "squeeze";
    WebXRControllerComponent.THUMBSTICK_TYPE = "thumbstick";
    WebXRControllerComponent.TOUCHPAD_TYPE = "touchpad";
    WebXRControllerComponent.TRIGGER_TYPE = "trigger";
  }
});

// node_modules/@babylonjs/core/XR/motionController/webXRAbstractMotionController.js
var WebXRAbstractMotionController;
var init_webXRAbstractMotionController = __esm({
  "node_modules/@babylonjs/core/XR/motionController/webXRAbstractMotionController.js"() {
    init_webXRControllerComponent();
    init_observable();
    init_logger();
    init_sceneLoader();
    init_math_vector();
    init_mesh();
    WebXRAbstractMotionController = class {
      /**
       * constructs a new abstract motion controller
       * @param scene the scene to which the model of the controller will be added
       * @param layout The profile layout to load
       * @param gamepadObject The gamepad object correlating to this controller
       * @param handedness handedness (left/right/none) of this controller
       * @param _doNotLoadControllerMesh set this flag to ignore the mesh loading
       * @param _controllerCache a cache holding controller models already loaded in this session
       */
      constructor(scene, layout, gamepadObject, handedness, _doNotLoadControllerMesh = false, _controllerCache) {
        this.scene = scene;
        this.layout = layout;
        this.gamepadObject = gamepadObject;
        this.handedness = handedness;
        this._doNotLoadControllerMesh = _doNotLoadControllerMesh;
        this._controllerCache = _controllerCache;
        this._initComponent = (id) => {
          if (!id) {
            return;
          }
          const componentDef = this.layout.components[id];
          const type = componentDef.type;
          const buttonIndex = componentDef.gamepadIndices.button;
          const axes = [];
          if (componentDef.gamepadIndices.xAxis !== void 0 && componentDef.gamepadIndices.yAxis !== void 0) {
            axes.push(componentDef.gamepadIndices.xAxis, componentDef.gamepadIndices.yAxis);
          }
          this.components[id] = new WebXRControllerComponent(id, type, buttonIndex, axes);
        };
        this._modelReady = false;
        this.components = {};
        this.disableAnimation = false;
        this.onModelLoadedObservable = new Observable();
        if (layout.components) {
          Object.keys(layout.components).forEach(this._initComponent);
        }
      }
      /**
       * Dispose this controller, the model mesh and all its components
       */
      dispose() {
        this.getComponentIds().forEach((id) => this.getComponent(id).dispose());
        if (this.rootMesh) {
          this.rootMesh.getChildren(void 0, true).forEach((node) => {
            node.setEnabled(false);
          });
          this.rootMesh.dispose(!!this._controllerCache, !this._controllerCache);
        }
      }
      /**
       * Returns all components of specific type
       * @param type the type to search for
       * @returns an array of components with this type
       */
      getAllComponentsOfType(type) {
        return this.getComponentIds().map((id) => this.components[id]).filter((component) => component.type === type);
      }
      /**
       * get a component based an its component id as defined in layout.components
       * @param id the id of the component
       * @returns the component correlates to the id or undefined if not found
       */
      getComponent(id) {
        return this.components[id];
      }
      /**
       * Get the list of components available in this motion controller
       * @returns an array of strings correlating to available components
       */
      getComponentIds() {
        return Object.keys(this.components);
      }
      /**
       * Get the first component of specific type
       * @param type type of component to find
       * @returns a controller component or null if not found
       */
      getComponentOfType(type) {
        return this.getAllComponentsOfType(type)[0] || null;
      }
      /**
       * Get the main (Select) component of this controller as defined in the layout
       * @returns the main component of this controller
       */
      getMainComponent() {
        return this.getComponent(this.layout.selectComponentId);
      }
      /**
       * Loads the model correlating to this controller
       * When the mesh is loaded, the onModelLoadedObservable will be triggered
       * @returns A promise fulfilled with the result of the model loading
       */
      async loadModel() {
        const useGeneric = !this._getModelLoadingConstraints();
        let loadingParams = this._getGenericFilenameAndPath();
        if (useGeneric) {
          Logger.Warn("Falling back to generic models");
        } else {
          loadingParams = this._getFilenameAndPath();
        }
        return new Promise((resolve, reject) => {
          const meshesLoaded = (meshes) => {
            if (useGeneric) {
              this._getGenericParentMesh(meshes);
            } else {
              this._setRootMesh(meshes);
            }
            this._processLoadedModel(meshes);
            this._modelReady = true;
            this.onModelLoadedObservable.notifyObservers(this);
            resolve(true);
          };
          if (this._controllerCache) {
            const found = this._controllerCache.filter((c) => {
              return c.filename === loadingParams.filename && c.path === loadingParams.path;
            });
            if (found[0]) {
              found[0].meshes.forEach((mesh) => mesh.setEnabled(true));
              meshesLoaded(found[0].meshes);
              return;
            }
          }
          SceneLoader.ImportMesh("", loadingParams.path, loadingParams.filename, this.scene, (meshes) => {
            if (this._controllerCache) {
              this._controllerCache.push({
                ...loadingParams,
                meshes
              });
            }
            meshesLoaded(meshes);
          }, null, (_scene, message) => {
            Logger.Log(message);
            Logger.Warn(`Failed to retrieve controller model of type ${this.profileId} from the remote server: ${loadingParams.path}${loadingParams.filename}`);
            reject(message);
          });
        });
      }
      /**
       * Update this model using the current XRFrame
       * @param xrFrame the current xr frame to use and update the model
       */
      updateFromXRFrame(xrFrame) {
        this.getComponentIds().forEach((id) => this.getComponent(id).update(this.gamepadObject));
        this.updateModel(xrFrame);
      }
      /**
       * Backwards compatibility due to a deeply-integrated typo
       */
      get handness() {
        return this.handedness;
      }
      /**
       * Pulse (vibrate) this controller
       * If the controller does not support pulses, this function will fail silently and return Promise<false> directly after called
       * Consecutive calls to this function will cancel the last pulse call
       *
       * @param value the strength of the pulse in 0.0...1.0 range
       * @param duration Duration of the pulse in milliseconds
       * @param hapticActuatorIndex optional index of actuator (will usually be 0)
       * @returns a promise that will send true when the pulse has ended and false if the device doesn't support pulse or an error accrued
       */
      pulse(value, duration, hapticActuatorIndex = 0) {
        if (this.gamepadObject.hapticActuators && this.gamepadObject.hapticActuators[hapticActuatorIndex]) {
          return this.gamepadObject.hapticActuators[hapticActuatorIndex].pulse(value, duration);
        } else {
          return Promise.resolve(false);
        }
      }
      // Look through all children recursively. This will return null if no mesh exists with the given name.
      _getChildByName(node, name66) {
        return node.getChildren((n) => n.name === name66, false)[0];
      }
      // Look through only immediate children. This will return null if no mesh exists with the given name.
      _getImmediateChildByName(node, name66) {
        return node.getChildren((n) => n.name == name66, true)[0];
      }
      /**
       * Moves the axis on the controller mesh based on its current state
       * @param axisMap
       * @param axisValue the value of the axis which determines the meshes new position
       * @internal
       */
      _lerpTransform(axisMap, axisValue, fixValueCoordinates) {
        if (!axisMap.minMesh || !axisMap.maxMesh || !axisMap.valueMesh) {
          return;
        }
        if (!axisMap.minMesh.rotationQuaternion || !axisMap.maxMesh.rotationQuaternion || !axisMap.valueMesh.rotationQuaternion) {
          return;
        }
        const lerpValue = fixValueCoordinates ? axisValue * 0.5 + 0.5 : axisValue;
        Quaternion.SlerpToRef(axisMap.minMesh.rotationQuaternion, axisMap.maxMesh.rotationQuaternion, lerpValue, axisMap.valueMesh.rotationQuaternion);
        Vector3.LerpToRef(axisMap.minMesh.position, axisMap.maxMesh.position, lerpValue, axisMap.valueMesh.position);
      }
      /**
       * Update the model itself with the current frame data
       * @param xrFrame the frame to use for updating the model mesh
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      updateModel(xrFrame) {
        if (!this._modelReady) {
          return;
        }
        this._updateModel(xrFrame);
      }
      _getGenericFilenameAndPath() {
        return {
          filename: "generic.babylon",
          path: "https://controllers.babylonjs.com/generic/"
        };
      }
      _getGenericParentMesh(meshes) {
        this.rootMesh = new Mesh(this.profileId + " " + this.handedness, this.scene);
        meshes.forEach((mesh) => {
          if (!mesh.parent) {
            mesh.isPickable = false;
            mesh.setParent(this.rootMesh);
          }
        });
        this.rootMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/motionController/webXRGenericMotionController.js
var WebXRGenericTriggerMotionController, GenericTriggerLayout;
var init_webXRGenericMotionController = __esm({
  "node_modules/@babylonjs/core/XR/motionController/webXRGenericMotionController.js"() {
    init_webXRAbstractMotionController();
    init_mesh();
    init_math_vector();
    WebXRGenericTriggerMotionController = class _WebXRGenericTriggerMotionController extends WebXRAbstractMotionController {
      constructor(scene, gamepadObject, handedness) {
        super(scene, GenericTriggerLayout[handedness], gamepadObject, handedness);
        this.profileId = _WebXRGenericTriggerMotionController.ProfileId;
      }
      _getFilenameAndPath() {
        return {
          filename: "generic.babylon",
          path: "https://controllers.babylonjs.com/generic/"
        };
      }
      _getModelLoadingConstraints() {
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _processLoadedModel(meshes) {
      }
      _setRootMesh(meshes) {
        this.rootMesh = new Mesh(this.profileId + " " + this.handedness, this.scene);
        meshes.forEach((mesh) => {
          mesh.isPickable = false;
          if (!mesh.parent) {
            mesh.setParent(this.rootMesh);
          }
        });
        this.rootMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);
      }
      _updateModel() {
      }
    };
    WebXRGenericTriggerMotionController.ProfileId = "generic-trigger";
    GenericTriggerLayout = {
      left: {
        selectComponentId: "xr-standard-trigger",
        components: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "xr-standard-trigger": {
            type: "trigger",
            gamepadIndices: {
              button: 0
            },
            rootNodeName: "xr_standard_trigger",
            visualResponses: {}
          }
        },
        gamepadMapping: "xr-standard",
        rootNodeName: "generic-trigger-left",
        assetPath: "left.glb"
      },
      right: {
        selectComponentId: "xr-standard-trigger",
        components: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "xr-standard-trigger": {
            type: "trigger",
            gamepadIndices: {
              button: 0
            },
            rootNodeName: "xr_standard_trigger",
            visualResponses: {}
          }
        },
        gamepadMapping: "xr-standard",
        rootNodeName: "generic-trigger-right",
        assetPath: "right.glb"
      },
      none: {
        selectComponentId: "xr-standard-trigger",
        components: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "xr-standard-trigger": {
            type: "trigger",
            gamepadIndices: {
              button: 0
            },
            rootNodeName: "xr_standard_trigger",
            visualResponses: {}
          }
        },
        gamepadMapping: "xr-standard",
        rootNodeName: "generic-trigger-none",
        assetPath: "none.glb"
      }
    };
  }
});

// node_modules/@babylonjs/core/Meshes/Builders/sphereBuilder.js
function CreateSphereVertexData(options) {
  const segments = (options.segments || 32) | 0;
  const diameterX = options.diameterX || options.diameter || 1;
  const diameterY = options.diameterY || options.diameter || 1;
  const diameterZ = options.diameterZ || options.diameter || 1;
  const arc = options.arc && (options.arc <= 0 || options.arc > 1) ? 1 : options.arc || 1;
  const slice = options.slice && options.slice <= 0 ? 1 : options.slice || 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const dedupTopBottomIndices = !!options.dedupTopBottomIndices;
  const radius = new Vector3(diameterX / 2, diameterY / 2, diameterZ / 2);
  const totalZRotationSteps = 2 + segments;
  const totalYRotationSteps = 2 * totalZRotationSteps;
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  for (let zRotationStep = 0; zRotationStep <= totalZRotationSteps; zRotationStep++) {
    const normalizedZ = zRotationStep / totalZRotationSteps;
    const angleZ = normalizedZ * Math.PI * slice;
    for (let yRotationStep = 0; yRotationStep <= totalYRotationSteps; yRotationStep++) {
      const normalizedY = yRotationStep / totalYRotationSteps;
      const angleY = normalizedY * Math.PI * 2 * arc;
      const rotationZ = Matrix.RotationZ(-angleZ);
      const rotationY = Matrix.RotationY(angleY);
      const afterRotZ = Vector3.TransformCoordinates(Vector3.Up(), rotationZ);
      const complete = Vector3.TransformCoordinates(afterRotZ, rotationY);
      const vertex = complete.multiply(radius);
      const normal = complete.divide(radius).normalize();
      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(normalizedY, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - normalizedZ : normalizedZ);
    }
    if (zRotationStep > 0) {
      const verticesCount = positions.length / 3;
      for (let firstIndex = verticesCount - 2 * (totalYRotationSteps + 1); firstIndex + totalYRotationSteps + 2 < verticesCount; firstIndex++) {
        if (dedupTopBottomIndices) {
          if (zRotationStep > 1) {
            indices.push(firstIndex);
            indices.push(firstIndex + 1);
            indices.push(firstIndex + totalYRotationSteps + 1);
          }
          if (zRotationStep < totalZRotationSteps || slice < 1) {
            indices.push(firstIndex + totalYRotationSteps + 1);
            indices.push(firstIndex + 1);
            indices.push(firstIndex + totalYRotationSteps + 2);
          }
        } else {
          indices.push(firstIndex);
          indices.push(firstIndex + 1);
          indices.push(firstIndex + totalYRotationSteps + 1);
          indices.push(firstIndex + totalYRotationSteps + 1);
          indices.push(firstIndex + 1);
          indices.push(firstIndex + totalYRotationSteps + 2);
        }
      }
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateSphere(name66, options = {}, scene = null) {
  const sphere = new Mesh(name66, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  sphere._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateSphereVertexData(options);
  vertexData.applyToMesh(sphere, options.updatable);
  return sphere;
}
var SphereBuilder;
var init_sphereBuilder = __esm({
  "node_modules/@babylonjs/core/Meshes/Builders/sphereBuilder.js"() {
    init_math_vector();
    init_mesh();
    init_mesh_vertexData();
    init_compatibilityOptions();
    SphereBuilder = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CreateSphere
    };
    VertexData.CreateSphere = CreateSphereVertexData;
    Mesh.CreateSphere = (name66, segments, diameter, scene, updatable, sideOrientation) => {
      const options = {
        segments,
        diameterX: diameter,
        diameterY: diameter,
        diameterZ: diameter,
        sideOrientation,
        updatable
      };
      return CreateSphere(name66, options, scene);
    };
  }
});

// node_modules/@babylonjs/core/Materials/prePassConfiguration.js
var PrePassConfiguration;
var init_prePassConfiguration = __esm({
  "node_modules/@babylonjs/core/Materials/prePassConfiguration.js"() {
    PrePassConfiguration = class {
      constructor() {
        this.previousWorldMatrices = {};
        this.previousBones = {};
      }
      /**
       * Add the required uniforms to the current list.
       * @param uniforms defines the current uniform list.
       */
      static AddUniforms(uniforms) {
        uniforms.push("previousWorld", "previousViewProjection", "mPreviousBones");
      }
      /**
       * Add the required samplers to the current list.
       * @param samplers defines the current sampler list.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static AddSamplers(samplers) {
      }
      /**
       * Binds the material data.
       * @param effect defines the effect to update
       * @param scene defines the scene the material belongs to.
       * @param mesh The mesh
       * @param world World matrix of this mesh
       * @param isFrozen Is the material frozen
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      bindForSubMesh(effect, scene, mesh, world, isFrozen) {
        if (scene.prePassRenderer && scene.prePassRenderer.enabled && scene.prePassRenderer.currentRTisSceneRT) {
          if (scene.prePassRenderer.getIndex(2) !== -1) {
            if (!this.previousWorldMatrices[mesh.uniqueId]) {
              this.previousWorldMatrices[mesh.uniqueId] = world.clone();
            }
            if (!this.previousViewProjection) {
              this.previousViewProjection = scene.getTransformMatrix().clone();
              this.currentViewProjection = scene.getTransformMatrix().clone();
            }
            const engine = scene.getEngine();
            if (this.currentViewProjection.updateFlag !== scene.getTransformMatrix().updateFlag) {
              this._lastUpdateFrameId = engine.frameId;
              this.previousViewProjection.copyFrom(this.currentViewProjection);
              this.currentViewProjection.copyFrom(scene.getTransformMatrix());
            } else if (this._lastUpdateFrameId !== engine.frameId) {
              this._lastUpdateFrameId = engine.frameId;
              this.previousViewProjection.copyFrom(this.currentViewProjection);
            }
            effect.setMatrix("previousWorld", this.previousWorldMatrices[mesh.uniqueId]);
            effect.setMatrix("previousViewProjection", this.previousViewProjection);
            this.previousWorldMatrices[mesh.uniqueId] = world.clone();
          }
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Materials/materialFlags.js
var MaterialFlags;
var init_materialFlags = __esm({
  "node_modules/@babylonjs/core/Materials/materialFlags.js"() {
    init_engine();
    MaterialFlags = class {
      /**
       * Are diffuse textures enabled in the application.
       */
      static get DiffuseTextureEnabled() {
        return this._DiffuseTextureEnabled;
      }
      static set DiffuseTextureEnabled(value) {
        if (this._DiffuseTextureEnabled === value) {
          return;
        }
        this._DiffuseTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are detail textures enabled in the application.
       */
      static get DetailTextureEnabled() {
        return this._DetailTextureEnabled;
      }
      static set DetailTextureEnabled(value) {
        if (this._DetailTextureEnabled === value) {
          return;
        }
        this._DetailTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are decal maps enabled in the application.
       */
      static get DecalMapEnabled() {
        return this._DecalMapEnabled;
      }
      static set DecalMapEnabled(value) {
        if (this._DecalMapEnabled === value) {
          return;
        }
        this._DecalMapEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are ambient textures enabled in the application.
       */
      static get AmbientTextureEnabled() {
        return this._AmbientTextureEnabled;
      }
      static set AmbientTextureEnabled(value) {
        if (this._AmbientTextureEnabled === value) {
          return;
        }
        this._AmbientTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are opacity textures enabled in the application.
       */
      static get OpacityTextureEnabled() {
        return this._OpacityTextureEnabled;
      }
      static set OpacityTextureEnabled(value) {
        if (this._OpacityTextureEnabled === value) {
          return;
        }
        this._OpacityTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are reflection textures enabled in the application.
       */
      static get ReflectionTextureEnabled() {
        return this._ReflectionTextureEnabled;
      }
      static set ReflectionTextureEnabled(value) {
        if (this._ReflectionTextureEnabled === value) {
          return;
        }
        this._ReflectionTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are emissive textures enabled in the application.
       */
      static get EmissiveTextureEnabled() {
        return this._EmissiveTextureEnabled;
      }
      static set EmissiveTextureEnabled(value) {
        if (this._EmissiveTextureEnabled === value) {
          return;
        }
        this._EmissiveTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are specular textures enabled in the application.
       */
      static get SpecularTextureEnabled() {
        return this._SpecularTextureEnabled;
      }
      static set SpecularTextureEnabled(value) {
        if (this._SpecularTextureEnabled === value) {
          return;
        }
        this._SpecularTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are bump textures enabled in the application.
       */
      static get BumpTextureEnabled() {
        return this._BumpTextureEnabled;
      }
      static set BumpTextureEnabled(value) {
        if (this._BumpTextureEnabled === value) {
          return;
        }
        this._BumpTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are lightmap textures enabled in the application.
       */
      static get LightmapTextureEnabled() {
        return this._LightmapTextureEnabled;
      }
      static set LightmapTextureEnabled(value) {
        if (this._LightmapTextureEnabled === value) {
          return;
        }
        this._LightmapTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are refraction textures enabled in the application.
       */
      static get RefractionTextureEnabled() {
        return this._RefractionTextureEnabled;
      }
      static set RefractionTextureEnabled(value) {
        if (this._RefractionTextureEnabled === value) {
          return;
        }
        this._RefractionTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are color grading textures enabled in the application.
       */
      static get ColorGradingTextureEnabled() {
        return this._ColorGradingTextureEnabled;
      }
      static set ColorGradingTextureEnabled(value) {
        if (this._ColorGradingTextureEnabled === value) {
          return;
        }
        this._ColorGradingTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are fresnels enabled in the application.
       */
      static get FresnelEnabled() {
        return this._FresnelEnabled;
      }
      static set FresnelEnabled(value) {
        if (this._FresnelEnabled === value) {
          return;
        }
        this._FresnelEnabled = value;
        Engine.MarkAllMaterialsAsDirty(4);
      }
      /**
       * Are clear coat textures enabled in the application.
       */
      static get ClearCoatTextureEnabled() {
        return this._ClearCoatTextureEnabled;
      }
      static set ClearCoatTextureEnabled(value) {
        if (this._ClearCoatTextureEnabled === value) {
          return;
        }
        this._ClearCoatTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are clear coat bump textures enabled in the application.
       */
      static get ClearCoatBumpTextureEnabled() {
        return this._ClearCoatBumpTextureEnabled;
      }
      static set ClearCoatBumpTextureEnabled(value) {
        if (this._ClearCoatBumpTextureEnabled === value) {
          return;
        }
        this._ClearCoatBumpTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are clear coat tint textures enabled in the application.
       */
      static get ClearCoatTintTextureEnabled() {
        return this._ClearCoatTintTextureEnabled;
      }
      static set ClearCoatTintTextureEnabled(value) {
        if (this._ClearCoatTintTextureEnabled === value) {
          return;
        }
        this._ClearCoatTintTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are sheen textures enabled in the application.
       */
      static get SheenTextureEnabled() {
        return this._SheenTextureEnabled;
      }
      static set SheenTextureEnabled(value) {
        if (this._SheenTextureEnabled === value) {
          return;
        }
        this._SheenTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are anisotropic textures enabled in the application.
       */
      static get AnisotropicTextureEnabled() {
        return this._AnisotropicTextureEnabled;
      }
      static set AnisotropicTextureEnabled(value) {
        if (this._AnisotropicTextureEnabled === value) {
          return;
        }
        this._AnisotropicTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are thickness textures enabled in the application.
       */
      static get ThicknessTextureEnabled() {
        return this._ThicknessTextureEnabled;
      }
      static set ThicknessTextureEnabled(value) {
        if (this._ThicknessTextureEnabled === value) {
          return;
        }
        this._ThicknessTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are refraction intensity textures enabled in the application.
       */
      static get RefractionIntensityTextureEnabled() {
        return this._ThicknessTextureEnabled;
      }
      static set RefractionIntensityTextureEnabled(value) {
        if (this._RefractionIntensityTextureEnabled === value) {
          return;
        }
        this._RefractionIntensityTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are translucency intensity textures enabled in the application.
       */
      static get TranslucencyIntensityTextureEnabled() {
        return this._ThicknessTextureEnabled;
      }
      static set TranslucencyIntensityTextureEnabled(value) {
        if (this._TranslucencyIntensityTextureEnabled === value) {
          return;
        }
        this._TranslucencyIntensityTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
      /**
       * Are translucency intensity textures enabled in the application.
       */
      static get IridescenceTextureEnabled() {
        return this._IridescenceTextureEnabled;
      }
      static set IridescenceTextureEnabled(value) {
        if (this._IridescenceTextureEnabled === value) {
          return;
        }
        this._IridescenceTextureEnabled = value;
        Engine.MarkAllMaterialsAsDirty(1);
      }
    };
    MaterialFlags._DiffuseTextureEnabled = true;
    MaterialFlags._DetailTextureEnabled = true;
    MaterialFlags._DecalMapEnabled = true;
    MaterialFlags._AmbientTextureEnabled = true;
    MaterialFlags._OpacityTextureEnabled = true;
    MaterialFlags._ReflectionTextureEnabled = true;
    MaterialFlags._EmissiveTextureEnabled = true;
    MaterialFlags._SpecularTextureEnabled = true;
    MaterialFlags._BumpTextureEnabled = true;
    MaterialFlags._LightmapTextureEnabled = true;
    MaterialFlags._RefractionTextureEnabled = true;
    MaterialFlags._ColorGradingTextureEnabled = true;
    MaterialFlags._FresnelEnabled = true;
    MaterialFlags._ClearCoatTextureEnabled = true;
    MaterialFlags._ClearCoatBumpTextureEnabled = true;
    MaterialFlags._ClearCoatTintTextureEnabled = true;
    MaterialFlags._SheenTextureEnabled = true;
    MaterialFlags._AnisotropicTextureEnabled = true;
    MaterialFlags._ThicknessTextureEnabled = true;
    MaterialFlags._RefractionIntensityTextureEnabled = true;
    MaterialFlags._TranslucencyIntensityTextureEnabled = true;
    MaterialFlags._IridescenceTextureEnabled = true;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/decalFragmentDeclaration.js
var name, shader;
var init_decalFragmentDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/decalFragmentDeclaration.js"() {
    init_shaderStore();
    name = "decalFragmentDeclaration";
    shader = `#ifdef DECAL
uniform vec4 vDecalInfos;
#endif
`;
    ShaderStore.IncludesShadersStore[name] = shader;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultFragmentDeclaration.js
var name2, shader2;
var init_defaultFragmentDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultFragmentDeclaration.js"() {
    init_shaderStore();
    init_decalFragmentDeclaration();
    name2 = "defaultFragmentDeclaration";
    shader2 = `uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
uniform vec3 vEmissiveColor;uniform vec3 vAmbientColor;uniform float visibility;
#ifdef DIFFUSE
uniform vec2 vDiffuseInfos;
#endif
#ifdef AMBIENT
uniform vec2 vAmbientInfos;
#endif
#ifdef OPACITY 
uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;uniform vec2 vTangentSpaceParams;
#endif
#ifdef ALPHATEST
uniform float alphaCutOff;
#endif
#if defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_PROJECTION) || defined(REFRACTION) || defined(PREPASS)
uniform mat4 view;
#endif
#ifdef REFRACTION
uniform vec4 vRefractionInfos;
#ifndef REFRACTIONMAP_3D
uniform mat4 refractionMatrix;
#endif
#ifdef REFRACTIONFRESNEL
uniform vec4 refractionLeftColor;uniform vec4 refractionRightColor;
#endif
#if defined(USE_LOCAL_REFRACTIONMAP_CUBIC) && defined(REFRACTIONMAP_3D)
uniform vec3 vRefractionPosition;uniform vec3 vRefractionSize; 
#endif
#endif
#if defined(SPECULAR) && defined(SPECULARTERM)
uniform vec2 vSpecularInfos;
#endif
#ifdef DIFFUSEFRESNEL
uniform vec4 diffuseLeftColor;uniform vec4 diffuseRightColor;
#endif
#ifdef OPACITYFRESNEL
uniform vec4 opacityParts;
#endif
#ifdef EMISSIVEFRESNEL
uniform vec4 emissiveLeftColor;uniform vec4 emissiveRightColor;
#endif
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
#if defined(REFLECTIONMAP_PLANAR) || defined(REFLECTIONMAP_CUBIC) || defined(REFLECTIONMAP_PROJECTION) || defined(REFLECTIONMAP_EQUIRECTANGULAR) || defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_SKYBOX)
uniform mat4 reflectionMatrix;
#endif
#ifndef REFLECTIONMAP_SKYBOX
#if defined(USE_LOCAL_REFLECTIONMAP_CUBIC) && defined(REFLECTIONMAP_CUBIC)
uniform vec3 vReflectionPosition;uniform vec3 vReflectionSize; 
#endif
#endif
#ifdef REFLECTIONFRESNEL
uniform vec4 reflectionLeftColor;uniform vec4 reflectionRightColor;
#endif
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
#endif
#include<decalFragmentDeclaration>
#define ADDITIONAL_FRAGMENT_DECLARATION
`;
    ShaderStore.IncludesShadersStore[name2] = shader2;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/sceneUboDeclaration.js
var name3, shader3;
var init_sceneUboDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/sceneUboDeclaration.js"() {
    init_shaderStore();
    name3 = "sceneUboDeclaration";
    shader3 = `layout(std140,column_major) uniform;uniform Scene {mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;mat4 projection;vec4 vEyePosition;};
`;
    ShaderStore.IncludesShadersStore[name3] = shader3;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/meshUboDeclaration.js
var name4, shader4;
var init_meshUboDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/meshUboDeclaration.js"() {
    init_shaderStore();
    name4 = "meshUboDeclaration";
    shader4 = `#ifdef WEBGL2
uniform mat4 world;uniform float visibility;
#else
layout(std140,column_major) uniform;uniform Mesh
{mat4 world;float visibility;};
#endif
#define WORLD_UBO
`;
    ShaderStore.IncludesShadersStore[name4] = shader4;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultUboDeclaration.js
var name5, shader5;
var init_defaultUboDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultUboDeclaration.js"() {
    init_shaderStore();
    init_sceneUboDeclaration();
    init_meshUboDeclaration();
    name5 = "defaultUboDeclaration";
    shader5 = `layout(std140,column_major) uniform;uniform Material
{vec4 diffuseLeftColor;vec4 diffuseRightColor;vec4 opacityParts;vec4 reflectionLeftColor;vec4 reflectionRightColor;vec4 refractionLeftColor;vec4 refractionRightColor;vec4 emissiveLeftColor;vec4 emissiveRightColor;vec2 vDiffuseInfos;vec2 vAmbientInfos;vec2 vOpacityInfos;vec2 vReflectionInfos;vec3 vReflectionPosition;vec3 vReflectionSize;vec2 vEmissiveInfos;vec2 vLightmapInfos;vec2 vSpecularInfos;vec3 vBumpInfos;mat4 diffuseMatrix;mat4 ambientMatrix;mat4 opacityMatrix;mat4 reflectionMatrix;mat4 emissiveMatrix;mat4 lightmapMatrix;mat4 specularMatrix;mat4 bumpMatrix;vec2 vTangentSpaceParams;float pointSize;float alphaCutOff;mat4 refractionMatrix;vec4 vRefractionInfos;vec3 vRefractionPosition;vec3 vRefractionSize;vec4 vSpecularColor;vec3 vEmissiveColor;vec4 vDiffuseColor;vec3 vAmbientColor;
#define ADDITIONAL_UBO_DECLARATION
};
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
    ShaderStore.IncludesShadersStore[name5] = shader5;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassDeclaration.js
var name6, shader6;
var init_prePassDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassDeclaration.js"() {
    init_shaderStore();
    name6 = "prePassDeclaration";
    shader6 = `#ifdef PREPASS
#extension GL_EXT_draw_buffers : require
layout(location=0) out highp vec4 glFragData[{X}];highp vec4 gl_FragColor;
#ifdef PREPASS_DEPTH
varying highp vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
varying highp vec4 vCurrentPosition;varying highp vec4 vPreviousPosition;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name6] = shader6;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/oitDeclaration.js
var name7, shader7;
var init_oitDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/oitDeclaration.js"() {
    init_shaderStore();
    name7 = "oitDeclaration";
    shader7 = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
#extension GL_EXT_draw_buffers : require
layout(location=0) out vec2 depth; 
layout(location=1) out vec4 frontColor;layout(location=2) out vec4 backColor;
#define MAX_DEPTH 99999.0
highp vec4 gl_FragColor;uniform sampler2D oitDepthSampler;uniform sampler2D oitFrontColorSampler;
#endif
`;
    ShaderStore.IncludesShadersStore[name7] = shader7;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/mainUVVaryingDeclaration.js
var name8, shader8;
var init_mainUVVaryingDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/mainUVVaryingDeclaration.js"() {
    init_shaderStore();
    name8 = "mainUVVaryingDeclaration";
    shader8 = `#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;
    ShaderStore.IncludesShadersStore[name8] = shader8;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/helperFunctions.js
var name9, shader9;
var init_helperFunctions = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/helperFunctions.js"() {
    init_shaderStore();
    name9 = "helperFunctions";
    shader9 = `const float PI=3.1415926535897932384626433832795;const float RECIPROCAL_PI=0.3183098861837907;const float RECIPROCAL_PI2=0.15915494309189535;const float HALF_MIN=5.96046448e-08; 
const float LinearEncodePowerApprox=2.2;const float GammaEncodePowerApprox=1.0/LinearEncodePowerApprox;const vec3 LuminanceEncodeApprox=vec3(0.2126,0.7152,0.0722);const float Epsilon=0.0000001;
#define saturate(x) clamp(x,0.0,1.0)
#define absEps(x) abs(x)+Epsilon
#define maxEps(x) max(x,Epsilon)
#define saturateEps(x) clamp(x,Epsilon,1.0)
mat3 transposeMat3(mat3 inMatrix) {vec3 i0=inMatrix[0];vec3 i1=inMatrix[1];vec3 i2=inMatrix[2];mat3 outMatrix=mat3(
vec3(i0.x,i1.x,i2.x),
vec3(i0.y,i1.y,i2.y),
vec3(i0.z,i1.z,i2.z)
);return outMatrix;}
mat3 inverseMat3(mat3 inMatrix) {float a00=inMatrix[0][0],a01=inMatrix[0][1],a02=inMatrix[0][2];float a10=inMatrix[1][0],a11=inMatrix[1][1],a12=inMatrix[1][2];float a20=inMatrix[2][0],a21=inMatrix[2][1],a22=inMatrix[2][2];float b01=a22*a11-a12*a21;float b11=-a22*a10+a12*a20;float b21=a21*a10-a11*a20;float det=a00*b01+a01*b11+a02*b21;return mat3(b01,(-a22*a01+a02*a21),(a12*a01-a02*a11),
b11,(a22*a00-a02*a20),(-a12*a00+a02*a10),
b21,(-a21*a00+a01*a20),(a11*a00-a01*a10))/det;}
#if USE_EXACT_SRGB_CONVERSIONS
vec3 toLinearSpaceExact(vec3 color)
{vec3 nearZeroSection=0.0773993808*color;vec3 remainingSection=pow(0.947867299*(color+vec3(0.055)),vec3(2.4));
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.04045)));
#else
return
vec3(
color.r<=0.04045 ? nearZeroSection.r : remainingSection.r,
color.g<=0.04045 ? nearZeroSection.g : remainingSection.g,
color.b<=0.04045 ? nearZeroSection.b : remainingSection.b);
#endif
}
vec3 toGammaSpaceExact(vec3 color)
{vec3 nearZeroSection=12.92*color;vec3 remainingSection=1.055*pow(color,vec3(0.41666))-vec3(0.055);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.0031308)));
#else
return
vec3(
color.r<=0.0031308 ? nearZeroSection.r : remainingSection.r,
color.g<=0.0031308 ? nearZeroSection.g : remainingSection.g,
color.b<=0.0031308 ? nearZeroSection.b : remainingSection.b);
#endif
}
#endif
float toLinearSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=0.0773993808*color;float remainingSection=pow(0.947867299*(color+0.055),2.4);return color<=0.04045 ? nearZeroSection : remainingSection;
#else
return pow(color,LinearEncodePowerApprox);
#endif
}
vec3 toLinearSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toLinearSpaceExact(color);
#else
return pow(color,vec3(LinearEncodePowerApprox));
#endif
}
vec4 toLinearSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toLinearSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(LinearEncodePowerApprox)),color.a);
#endif
}
float toGammaSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=12.92*color;float remainingSection=1.055*pow(color,0.41666)-0.055;return color<=0.0031308 ? nearZeroSection : remainingSection;
#else
return pow(color,GammaEncodePowerApprox);
#endif
}
vec3 toGammaSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toGammaSpaceExact(color);
#else
return pow(color,vec3(GammaEncodePowerApprox));
#endif
}
vec4 toGammaSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toGammaSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(GammaEncodePowerApprox)),color.a);
#endif
}
float square(float value)
{return value*value;}
vec3 square(vec3 value)
{return value*value;}
float pow5(float value) {float sq=value*value;return sq*sq*value;}
float getLuminance(vec3 color)
{return clamp(dot(color,LuminanceEncodeApprox),0.,1.);}
float getRand(vec2 seed) {return fract(sin(dot(seed.xy ,vec2(12.9898,78.233)))*43758.5453);}
float dither(vec2 seed,float varianceAmount) {float rand=getRand(seed);float normVariance=varianceAmount/255.0;float dither=mix(-normVariance,normVariance,rand);return dither;}
const float rgbdMaxRange=255.0;vec4 toRGBD(vec3 color) {float maxRGB=maxEps(max(color.r,max(color.g,color.b)));float D =max(rgbdMaxRange/maxRGB,1.);D =clamp(floor(D)/255.0,0.,1.);vec3 rgb=color.rgb*D;rgb=toGammaSpace(rgb);return vec4(clamp(rgb,0.,1.),D); }
vec3 fromRGBD(vec4 rgbd) {rgbd.rgb=toLinearSpace(rgbd.rgb);return rgbd.rgb/rgbd.a;}
vec3 parallaxCorrectNormal( vec3 vertexPos,vec3 origVec,vec3 cubeSize,vec3 cubePos ) {vec3 invOrigVec=vec3(1.0,1.0,1.0)/origVec;vec3 halfSize=cubeSize*0.5;vec3 intersecAtMaxPlane=(cubePos+halfSize-vertexPos)*invOrigVec;vec3 intersecAtMinPlane=(cubePos-halfSize-vertexPos)*invOrigVec;vec3 largestIntersec=max(intersecAtMaxPlane,intersecAtMinPlane);float distance=min(min(largestIntersec.x,largestIntersec.y),largestIntersec.z);vec3 intersectPositionWS=vertexPos+origVec*distance;return intersectPositionWS-cubePos;}
`;
    ShaderStore.IncludesShadersStore[name9] = shader9;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightFragmentDeclaration.js
var name10, shader10;
var init_lightFragmentDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/lightFragmentDeclaration.js"() {
    init_shaderStore();
    name10 = "lightFragmentDeclaration";
    shader10 = `#ifdef LIGHT{X}
uniform vec4 vLightData{X};uniform vec4 vLightDiffuse{X};
#ifdef SPECULARTERM
uniform vec4 vLightSpecular{X};
#else
vec4 vLightSpecular{X}=vec4(0.);
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];uniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];uniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];uniform float cascadeBlendFactor{X};varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromCamera{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DArrayShadow shadowSampler{X};uniform highp sampler2DArray depthSampler{X};uniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];uniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];uniform float penumbraDarkness{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
#else
uniform highp sampler2DArray shadowSampler{X};
#endif
#ifdef SHADOWCSMDEBUG{X}
const vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]
(
vec3 ( 1.5,0.0,0.0 ),
vec3 ( 0.0,1.5,0.0 ),
vec3 ( 0.0,0.0,5.5 ),
vec3 ( 1.5,0.0,5.5 ),
vec3 ( 1.5,1.5,0.0 ),
vec3 ( 1.0,1.0,1.0 ),
vec3 ( 0.0,1.0,5.5 ),
vec3 ( 0.5,3.5,0.75 )
);vec3 shadowDebug{X};
#endif
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
int index{X}=-1;
#else
int index{X}=SHADOWCSMNUM_CASCADES{X}-1;
#endif
float diff{X}=0.;
#elif defined(SHADOWCUBE{X})
uniform samplerCube shadowSampler{X};
#else
varying vec4 vPositionFromLight{X};varying float vDepthMetric{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DShadow shadowSampler{X};uniform highp sampler2D depthSampler{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DShadow shadowSampler{X};
#else
uniform sampler2D shadowSampler{X};
#endif
uniform mat4 lightMatrix{X};
#endif
uniform vec4 shadowsInfo{X};uniform vec2 depthValues{X};
#endif
#ifdef SPOTLIGHT{X}
uniform vec4 vLightDirection{X};uniform vec4 vLightFalloff{X};
#elif defined(POINTLIGHT{X})
uniform vec4 vLightFalloff{X};
#elif defined(HEMILIGHT{X})
uniform vec3 vLightGround{X};
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
uniform mat4 textureProjectionMatrix{X};uniform sampler2D projectionLightSampler{X};
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name10] = shader10;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightUboDeclaration.js
var name11, shader11;
var init_lightUboDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/lightUboDeclaration.js"() {
    init_shaderStore();
    name11 = "lightUboDeclaration";
    shader11 = `#ifdef LIGHT{X}
uniform Light{X}
{vec4 vLightData;vec4 vLightDiffuse;vec4 vLightSpecular;
#ifdef SPOTLIGHT{X}
vec4 vLightDirection;vec4 vLightFalloff;
#elif defined(POINTLIGHT{X})
vec4 vLightFalloff;
#elif defined(HEMILIGHT{X})
vec3 vLightGround;
#endif
vec4 shadowsInfo;vec2 depthValues;} light{X};
#ifdef PROJECTEDLIGHTTEXTURE{X}
uniform mat4 textureProjectionMatrix{X};uniform sampler2D projectionLightSampler{X};
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];uniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];uniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];uniform float cascadeBlendFactor{X};varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromCamera{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DArrayShadow shadowSampler{X};uniform highp sampler2DArray depthSampler{X};uniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];uniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];uniform float penumbraDarkness{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
#else
uniform highp sampler2DArray shadowSampler{X};
#endif
#ifdef SHADOWCSMDEBUG{X}
const vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]
(
vec3 ( 1.5,0.0,0.0 ),
vec3 ( 0.0,1.5,0.0 ),
vec3 ( 0.0,0.0,5.5 ),
vec3 ( 1.5,0.0,5.5 ),
vec3 ( 1.5,1.5,0.0 ),
vec3 ( 1.0,1.0,1.0 ),
vec3 ( 0.0,1.0,5.5 ),
vec3 ( 0.5,3.5,0.75 )
);vec3 shadowDebug{X};
#endif
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
int index{X}=-1;
#else
int index{X}=SHADOWCSMNUM_CASCADES{X}-1;
#endif
float diff{X}=0.;
#elif defined(SHADOWCUBE{X})
uniform samplerCube shadowSampler{X}; 
#else
varying vec4 vPositionFromLight{X};varying float vDepthMetric{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DShadow shadowSampler{X};uniform highp sampler2D depthSampler{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DShadow shadowSampler{X};
#else
uniform sampler2D shadowSampler{X};
#endif
uniform mat4 lightMatrix{X};
#endif
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name11] = shader11;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightsFragmentFunctions.js
var name12, shader12;
var init_lightsFragmentFunctions = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/lightsFragmentFunctions.js"() {
    init_shaderStore();
    name12 = "lightsFragmentFunctions";
    shader12 = `struct lightingInfo
{vec3 diffuse;
#ifdef SPECULARTERM
vec3 specular;
#endif
#ifdef NDOTL
float ndl;
#endif
};lightingInfo computeLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec3 diffuseColor,vec3 specularColor,float range,float glossiness) {lightingInfo result;vec3 lightVectorW;float attenuation=1.0;if (lightData.w==0.)
{vec3 direction=lightData.xyz-vPositionW;attenuation=max(0.,1.0-length(direction)/range);lightVectorW=normalize(direction);}
else
{lightVectorW=normalize(-lightData.xyz);}
float ndl=max(0.,dot(vNormal,lightVectorW));
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=ndl*diffuseColor*attenuation;
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightVectorW);float specComp=max(0.,dot(vNormal,angleW));specComp=pow(specComp,max(1.,glossiness));result.specular=specComp*specularColor*attenuation;
#endif
return result;}
lightingInfo computeSpotLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec4 lightDirection,vec3 diffuseColor,vec3 specularColor,float range,float glossiness) {lightingInfo result;vec3 direction=lightData.xyz-vPositionW;vec3 lightVectorW=normalize(direction);float attenuation=max(0.,1.0-length(direction)/range);float cosAngle=max(0.,dot(lightDirection.xyz,-lightVectorW));if (cosAngle>=lightDirection.w)
{cosAngle=max(0.,pow(cosAngle,lightData.w));attenuation*=cosAngle;float ndl=max(0.,dot(vNormal,lightVectorW));
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=ndl*diffuseColor*attenuation;
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightVectorW);float specComp=max(0.,dot(vNormal,angleW));specComp=pow(specComp,max(1.,glossiness));result.specular=specComp*specularColor*attenuation;
#endif
return result;}
result.diffuse=vec3(0.);
#ifdef SPECULARTERM
result.specular=vec3(0.);
#endif
#ifdef NDOTL
result.ndl=0.;
#endif
return result;}
lightingInfo computeHemisphericLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec3 diffuseColor,vec3 specularColor,vec3 groundColor,float glossiness) {lightingInfo result;float ndl=dot(vNormal,lightData.xyz)*0.5+0.5;
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=mix(groundColor,diffuseColor,ndl);
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightData.xyz);float specComp=max(0.,dot(vNormal,angleW));specComp=pow(specComp,max(1.,glossiness));result.specular=specComp*specularColor;
#endif
return result;}
#define inline
vec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix){vec4 strq=textureProjectionMatrix*vec4(vPositionW,1.0);strq/=strq.w;vec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;return textureColor;}`;
    ShaderStore.IncludesShadersStore[name12] = shader12;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/shadowsFragmentFunctions.js
var name13, shader13;
var init_shadowsFragmentFunctions = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/shadowsFragmentFunctions.js"() {
    init_shaderStore();
    name13 = "shadowsFragmentFunctions";
    shader13 = `#ifdef SHADOWS
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define TEXTUREFUNC(s,c,l) texture2DLodEXT(s,c,l)
#else
#define TEXTUREFUNC(s,c,b) texture2D(s,c,b)
#endif
#ifndef SHADOWFLOAT
float unpack(vec4 color)
{const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);return dot(color,bit_shift);}
#endif
float computeFallOff(float value,vec2 clipSpace,float frustumEdgeFalloff)
{float mask=smoothstep(1.0-frustumEdgeFalloff,1.00000012,clamp(dot(clipSpace,clipSpace),0.,1.));return mix(value,1.0,mask);}
#define inline
float computeShadowCube(vec3 worldPos,vec3 lightPosition,samplerCube shadowSampler,float darkness,vec2 depthValues)
{vec3 directionToLight=worldPos-lightPosition;float depth=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);depth=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadow=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadow=textureCube(shadowSampler,directionToLight).x;
#endif
return depth>shadow ? darkness : 1.0;}
#define inline
float computeShadowWithPoissonSamplingCube(vec3 worldPos,vec3 lightPosition,samplerCube shadowSampler,float mapSize,float darkness,vec2 depthValues)
{vec3 directionToLight=worldPos-lightPosition;float depth=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);depth=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;float visibility=1.;vec3 poissonDisk[4];poissonDisk[0]=vec3(-1.0,1.0,-1.0);poissonDisk[1]=vec3(1.0,-1.0,-1.0);poissonDisk[2]=vec3(-1.0,-1.0,-1.0);poissonDisk[3]=vec3(1.0,-1.0,1.0);
#ifndef SHADOWFLOAT
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize))<depth) visibility-=0.25;if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize))<depth) visibility-=0.25;if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize))<depth) visibility-=0.25;if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize))<depth) visibility-=0.25;
#else
if (textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize).x<depth) visibility-=0.25;if (textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize).x<depth) visibility-=0.25;if (textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize).x<depth) visibility-=0.25;if (textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize).x<depth) visibility-=0.25;
#endif
return min(1.0,visibility+darkness);}
#define inline
float computeShadowWithESMCube(vec3 worldPos,vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{vec3 directionToLight=worldPos-lightPosition;float depth=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);float shadowPixelDepth=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);return esm;}
#define inline
float computeShadowWithCloseESMCube(vec3 worldPos,vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{vec3 directionToLight=worldPos-lightPosition;float depth=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);float shadowPixelDepth=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);return esm;}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define inline
float computeShadowCSM(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray shadowSampler,float darkness,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec2 uv=0.5*clipSpace.xy+vec2(0.5);vec3 uvLayer=vec3(uv.x,uv.y,layer);float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(texture2D(shadowSampler,uvLayer));
#else
float shadow=texture2D(shadowSampler,uvLayer).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;}
#endif
#define inline
float computeShadow(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec2 uv=0.5*clipSpace.xy+vec2(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadow=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;}}
#define inline
float computeShadowWithPoissonSampling(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float mapSize,float darkness,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec2 uv=0.5*clipSpace.xy+vec2(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{float shadowPixelDepth=clamp(depthMetric,0.,1.0);float visibility=1.;vec2 poissonDisk[4];poissonDisk[0]=vec2(-0.94201624,-0.39906216);poissonDisk[1]=vec2(0.94558609,-0.76890725);poissonDisk[2]=vec2(-0.094184101,-0.92938870);poissonDisk[3]=vec2(0.34495938,0.29387760);
#ifndef SHADOWFLOAT
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[0]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[1]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[2]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[3]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
#else
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[0]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[1]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[2]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[3]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
#endif
return computeFallOff(min(1.0,visibility+darkness),clipSpace.xy,frustumEdgeFalloff);}}
#define inline
float computeShadowWithESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec2 uv=0.5*clipSpace.xy+vec2(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadowMapSample=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);}}
#define inline
float computeShadowWithCloseESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec2 uv=0.5*clipSpace.xy+vec2(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{float shadowPixelDepth=clamp(depthMetric,0.,1.0); 
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadowMapSample=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);}}
#ifdef IS_NDC_HALF_ZRANGE
#define ZINCLIP clipSpace.z
#else
#define ZINCLIP uvDepth.z
#endif
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define GREATEST_LESS_THAN_ONE 0.99999994
/* disable_uniformity_analysis */
#define inline
float computeShadowWithCSMPCF1(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);float shadow=texture2D(shadowSampler,uvDepthLayer);shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}
#define inline
float computeShadowWithCSMPCF3(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=3.-2.*st;vec2 uvw1=1.+2.*st;vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;float shadow=0.;shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));shadow=shadow/16.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}
#define inline
float computeShadowWithCSMPCF5(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=4.-3.*st;vec2 uvw1=vec2(7.);vec2 uvw2=1.+3.*st;vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;float shadow=0.;shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));shadow+=uvw2.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[0]),layer,uvDepth.z));shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));shadow+=uvw2.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[1]),layer,uvDepth.z));shadow+=uvw0.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[2]),layer,uvDepth.z));shadow+=uvw1.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[2]),layer,uvDepth.z));shadow+=uvw2.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[2]),layer,uvDepth.z));shadow=shadow/144.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}
#define inline
float computeShadowWithPCF1(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{if (depthMetric>1.0 || depthMetric<0.0) {return 1.0;}
else
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=ZINCLIP;float shadow=TEXTUREFUNC(shadowSampler,uvDepth,0.);shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}
#define inline
float computeShadowWithPCF3(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{if (depthMetric>1.0 || depthMetric<0.0) {return 1.0;}
else
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=ZINCLIP;vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=3.-2.*st;vec2 uvw1=1.+2.*st;vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;float shadow=0.;shadow+=uvw0.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z),0.);shadow+=uvw1.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z),0.);shadow+=uvw0.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z),0.);shadow+=uvw1.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z),0.);shadow=shadow/16.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}
#define inline
float computeShadowWithPCF5(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{if (depthMetric>1.0 || depthMetric<0.0) {return 1.0;}
else
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=ZINCLIP;vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=4.-3.*st;vec2 uvw1=vec2(7.);vec2 uvw2=1.+3.*st;vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;float shadow=0.;shadow+=uvw0.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z),0.);shadow+=uvw1.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z),0.);shadow+=uvw2.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[0]),uvDepth.z),0.);shadow+=uvw0.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z),0.);shadow+=uvw1.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z),0.);shadow+=uvw2.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[1]),uvDepth.z),0.);shadow+=uvw0.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[2]),uvDepth.z),0.);shadow+=uvw1.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[2]),uvDepth.z),0.);shadow+=uvw2.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[2]),uvDepth.z),0.);shadow=shadow/144.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}
const vec3 PoissonSamplers32[64]=vec3[64](
vec3(0.06407013,0.05409927,0.),
vec3(0.7366577,0.5789394,0.),
vec3(-0.6270542,-0.5320278,0.),
vec3(-0.4096107,0.8411095,0.),
vec3(0.6849564,-0.4990818,0.),
vec3(-0.874181,-0.04579735,0.),
vec3(0.9989998,0.0009880066,0.),
vec3(-0.004920578,-0.9151649,0.),
vec3(0.1805763,0.9747483,0.),
vec3(-0.2138451,0.2635818,0.),
vec3(0.109845,0.3884785,0.),
vec3(0.06876755,-0.3581074,0.),
vec3(0.374073,-0.7661266,0.),
vec3(0.3079132,-0.1216763,0.),
vec3(-0.3794335,-0.8271583,0.),
vec3(-0.203878,-0.07715034,0.),
vec3(0.5912697,0.1469799,0.),
vec3(-0.88069,0.3031784,0.),
vec3(0.5040108,0.8283722,0.),
vec3(-0.5844124,0.5494877,0.),
vec3(0.6017799,-0.1726654,0.),
vec3(-0.5554981,0.1559997,0.),
vec3(-0.3016369,-0.3900928,0.),
vec3(-0.5550632,-0.1723762,0.),
vec3(0.925029,0.2995041,0.),
vec3(-0.2473137,0.5538505,0.),
vec3(0.9183037,-0.2862392,0.),
vec3(0.2469421,0.6718712,0.),
vec3(0.3916397,-0.4328209,0.),
vec3(-0.03576927,-0.6220032,0.),
vec3(-0.04661255,0.7995201,0.),
vec3(0.4402924,0.3640312,0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.),
vec3(0.)
);const vec3 PoissonSamplers64[64]=vec3[64](
vec3(-0.613392,0.617481,0.),
vec3(0.170019,-0.040254,0.),
vec3(-0.299417,0.791925,0.),
vec3(0.645680,0.493210,0.),
vec3(-0.651784,0.717887,0.),
vec3(0.421003,0.027070,0.),
vec3(-0.817194,-0.271096,0.),
vec3(-0.705374,-0.668203,0.),
vec3(0.977050,-0.108615,0.),
vec3(0.063326,0.142369,0.),
vec3(0.203528,0.214331,0.),
vec3(-0.667531,0.326090,0.),
vec3(-0.098422,-0.295755,0.),
vec3(-0.885922,0.215369,0.),
vec3(0.566637,0.605213,0.),
vec3(0.039766,-0.396100,0.),
vec3(0.751946,0.453352,0.),
vec3(0.078707,-0.715323,0.),
vec3(-0.075838,-0.529344,0.),
vec3(0.724479,-0.580798,0.),
vec3(0.222999,-0.215125,0.),
vec3(-0.467574,-0.405438,0.),
vec3(-0.248268,-0.814753,0.),
vec3(0.354411,-0.887570,0.),
vec3(0.175817,0.382366,0.),
vec3(0.487472,-0.063082,0.),
vec3(-0.084078,0.898312,0.),
vec3(0.488876,-0.783441,0.),
vec3(0.470016,0.217933,0.),
vec3(-0.696890,-0.549791,0.),
vec3(-0.149693,0.605762,0.),
vec3(0.034211,0.979980,0.),
vec3(0.503098,-0.308878,0.),
vec3(-0.016205,-0.872921,0.),
vec3(0.385784,-0.393902,0.),
vec3(-0.146886,-0.859249,0.),
vec3(0.643361,0.164098,0.),
vec3(0.634388,-0.049471,0.),
vec3(-0.688894,0.007843,0.),
vec3(0.464034,-0.188818,0.),
vec3(-0.440840,0.137486,0.),
vec3(0.364483,0.511704,0.),
vec3(0.034028,0.325968,0.),
vec3(0.099094,-0.308023,0.),
vec3(0.693960,-0.366253,0.),
vec3(0.678884,-0.204688,0.),
vec3(0.001801,0.780328,0.),
vec3(0.145177,-0.898984,0.),
vec3(0.062655,-0.611866,0.),
vec3(0.315226,-0.604297,0.),
vec3(-0.780145,0.486251,0.),
vec3(-0.371868,0.882138,0.),
vec3(0.200476,0.494430,0.),
vec3(-0.494552,-0.711051,0.),
vec3(0.612476,0.705252,0.),
vec3(-0.578845,-0.768792,0.),
vec3(-0.772454,-0.090976,0.),
vec3(0.504440,0.372295,0.),
vec3(0.155736,0.065157,0.),
vec3(0.391522,0.849605,0.),
vec3(-0.620106,-0.328104,0.),
vec3(0.789239,-0.419965,0.),
vec3(-0.545396,0.538133,0.),
vec3(-0.178564,-0.596057,0.)
);
#define inline
float computeShadowWithCSMPCSS(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);float blockerDepth=0.0;float sumBlockerDepth=0.0;float numBlocker=0.0;for (int i=0; i<searchTapCount; i ++) {blockerDepth=texture2D(depthSampler,vec3(uvDepth.xy+(lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse*PoissonSamplers32[i].xy),layer)).r;if (blockerDepth<depthMetric) {sumBlockerDepth+=blockerDepth;numBlocker++;}}
float avgBlockerDepth=sumBlockerDepth/numBlocker;float AAOffset=shadowMapSizeInverse*10.;float penumbraRatio=((depthMetric-avgBlockerDepth)*depthCorrection+AAOffset);vec4 filterRadius=vec4(penumbraRatio*lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse,0.,0.);float random=getRand(vPositionFromLight.xy);float rotationAngle=random*3.1415926;vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));float shadow=0.;for (int i=0; i<pcfTapCount; i++) {vec4 offset=vec4(poissonSamplers[i],0.);offset=vec4(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.,0.);shadow+=texture2D(shadowSampler,uvDepthLayer+offset*filterRadius);}
shadow/=float(pcfTapCount);shadow=mix(shadow,1.,min((depthMetric-avgBlockerDepth)*depthCorrection*penumbraDarkness,1.));shadow=mix(darkness,1.,shadow);if (numBlocker<1.0) {return 1.0;}
else
{return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}
#define inline
float computeShadowWithPCSS(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers)
{if (depthMetric>1.0 || depthMetric<0.0) {return 1.0;}
else
{vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));uvDepth.z=ZINCLIP;float blockerDepth=0.0;float sumBlockerDepth=0.0;float numBlocker=0.0;for (int i=0; i<searchTapCount; i ++) {blockerDepth=TEXTUREFUNC(depthSampler,uvDepth.xy+(lightSizeUV*shadowMapSizeInverse*PoissonSamplers32[i].xy),0.).r;if (blockerDepth<depthMetric) {sumBlockerDepth+=blockerDepth;numBlocker++;}}
if (numBlocker<1.0) {return 1.0;}
else
{float avgBlockerDepth=sumBlockerDepth/numBlocker;float AAOffset=shadowMapSizeInverse*10.;float penumbraRatio=((depthMetric-avgBlockerDepth)+AAOffset);float filterRadius=penumbraRatio*lightSizeUV*shadowMapSizeInverse;float random=getRand(vPositionFromLight.xy);float rotationAngle=random*3.1415926;vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));float shadow=0.;for (int i=0; i<pcfTapCount; i++) {vec3 offset=poissonSamplers[i];offset=vec3(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.);shadow+=TEXTUREFUNC(shadowSampler,uvDepth+offset*filterRadius,0.);}
shadow/=float(pcfTapCount);shadow=mix(shadow,1.,depthMetric-avgBlockerDepth);shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}}
#define inline
float computeShadowWithPCSS16(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32);}
#define inline
float computeShadowWithPCSS32(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32);}
#define inline
float computeShadowWithPCSS64(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64);}
#define inline
float computeShadowWithCSMPCSS16(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);}
#define inline
float computeShadowWithCSMPCSS32(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);}
#define inline
float computeShadowWithCSMPCSS64(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64,lightSizeUVCorrection,depthCorrection,penumbraDarkness);}
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name13] = shader13;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerFragmentDeclaration.js
var name14, shader14;
var init_samplerFragmentDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerFragmentDeclaration.js"() {
    init_shaderStore();
    name14 = "samplerFragmentDeclaration";
    shader14 = `#ifdef _DEFINENAME_
#if _DEFINENAME_DIRECTUV==1
#define v_VARYINGNAME_UV vMainUV1
#elif _DEFINENAME_DIRECTUV==2
#define v_VARYINGNAME_UV vMainUV2
#elif _DEFINENAME_DIRECTUV==3
#define v_VARYINGNAME_UV vMainUV3
#elif _DEFINENAME_DIRECTUV==4
#define v_VARYINGNAME_UV vMainUV4
#elif _DEFINENAME_DIRECTUV==5
#define v_VARYINGNAME_UV vMainUV5
#elif _DEFINENAME_DIRECTUV==6
#define v_VARYINGNAME_UV vMainUV6
#else
varying vec2 v_VARYINGNAME_UV;
#endif
uniform sampler2D _SAMPLERNAME_Sampler;
#endif
`;
    ShaderStore.IncludesShadersStore[name14] = shader14;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fresnelFunction.js
var name15, shader15;
var init_fresnelFunction = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/fresnelFunction.js"() {
    init_shaderStore();
    name15 = "fresnelFunction";
    shader15 = `#ifdef FRESNEL
float computeFresnelTerm(vec3 viewDirection,vec3 worldNormal,float bias,float power)
{float fresnelTerm=pow(bias+abs(dot(viewDirection,worldNormal)),power);return clamp(fresnelTerm,0.,1.);}
#endif
`;
    ShaderStore.IncludesShadersStore[name15] = shader15;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/reflectionFunction.js
var name16, shader16;
var init_reflectionFunction = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/reflectionFunction.js"() {
    init_shaderStore();
    name16 = "reflectionFunction";
    shader16 = `vec3 computeFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
{float lon=atan(direction.z,direction.x);float lat=acos(direction.y);vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;float s=sphereCoords.x*0.5+0.5;float t=sphereCoords.y;return vec3(s,t,0); }
vec3 computeMirroredFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
{float lon=atan(direction.z,direction.x);float lat=acos(direction.y);vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;float s=sphereCoords.x*0.5+0.5;float t=sphereCoords.y;return vec3(1.0-s,t,0); }
vec3 computeEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{vec3 cameraToVertex=normalize(worldPos.xyz-eyePosition);vec3 r=normalize(reflect(cameraToVertex,worldNormal));r=vec3(reflectionMatrix*vec4(r,0));float lon=atan(r.z,r.x);float lat=acos(r.y);vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;float s=sphereCoords.x*0.5+0.5;float t=sphereCoords.y;return vec3(s,t,0);}
vec3 computeSphericalCoords(vec4 worldPos,vec3 worldNormal,mat4 view,mat4 reflectionMatrix)
{vec3 viewDir=normalize(vec3(view*worldPos));vec3 viewNormal=normalize(vec3(view*vec4(worldNormal,0.0)));vec3 r=reflect(viewDir,viewNormal);r=vec3(reflectionMatrix*vec4(r,0));r.z=r.z-1.0;float m=2.0*length(r);return vec3(r.x/m+0.5,1.0-r.y/m-0.5,0);}
vec3 computePlanarCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{vec3 viewDir=worldPos.xyz-eyePosition;vec3 coords=normalize(reflect(viewDir,worldNormal));return vec3(reflectionMatrix*vec4(coords,1));}
vec3 computeCubicCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{vec3 viewDir=normalize(worldPos.xyz-eyePosition);vec3 coords=reflect(viewDir,worldNormal);coords=vec3(reflectionMatrix*vec4(coords,0));
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;}
vec3 computeCubicLocalCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix,vec3 reflectionSize,vec3 reflectionPosition)
{vec3 viewDir=normalize(worldPos.xyz-eyePosition);vec3 coords=reflect(viewDir,worldNormal);coords=parallaxCorrectNormal(worldPos.xyz,coords,reflectionSize,reflectionPosition);coords=vec3(reflectionMatrix*vec4(coords,0));
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;}
vec3 computeProjectionCoords(vec4 worldPos,mat4 view,mat4 reflectionMatrix)
{return vec3(reflectionMatrix*(view*worldPos));}
vec3 computeSkyBoxCoords(vec3 positionW,mat4 reflectionMatrix)
{return vec3(reflectionMatrix*vec4(positionW,1.));}
#ifdef REFLECTION
vec3 computeReflectionCoords(vec4 worldPos,vec3 worldNormal)
{
#ifdef REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED
vec3 direction=normalize(vDirectionW);return computeMirroredFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR_FIXED
vec3 direction=normalize(vDirectionW);return computeFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR
return computeEquirectangularCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_SPHERICAL
return computeSphericalCoords(worldPos,worldNormal,view,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_PLANAR
return computePlanarCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_CUBIC
#ifdef USE_LOCAL_REFLECTIONMAP_CUBIC
return computeCubicLocalCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix,vReflectionSize,vReflectionPosition);
#else
return computeCubicCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#endif
#ifdef REFLECTIONMAP_PROJECTION
return computeProjectionCoords(worldPos,view,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_SKYBOX
return computeSkyBoxCoords(vPositionUVW,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_EXPLICIT
return vec3(0,0,0);
#endif
}
#endif
`;
    ShaderStore.IncludesShadersStore[name16] = shader16;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/imageProcessingDeclaration.js
var name17, shader17;
var init_imageProcessingDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/imageProcessingDeclaration.js"() {
    init_shaderStore();
    name17 = "imageProcessingDeclaration";
    shader17 = `#ifdef EXPOSURE
uniform float exposureLinear;
#endif
#ifdef CONTRAST
uniform float contrast;
#endif
#if defined(VIGNETTE) || defined(DITHER)
uniform vec2 vInverseScreenSize;
#endif
#ifdef VIGNETTE
uniform vec4 vignetteSettings1;uniform vec4 vignetteSettings2;
#endif
#ifdef COLORCURVES
uniform vec4 vCameraColorCurveNegative;uniform vec4 vCameraColorCurveNeutral;uniform vec4 vCameraColorCurvePositive;
#endif
#ifdef COLORGRADING
#ifdef COLORGRADING3D
uniform highp sampler3D txColorTransform;
#else
uniform sampler2D txColorTransform;
#endif
uniform vec4 colorTransformSettings;
#endif
#ifdef DITHER
uniform float ditherIntensity;
#endif
`;
    ShaderStore.IncludesShadersStore[name17] = shader17;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/imageProcessingFunctions.js
var name18, shader18;
var init_imageProcessingFunctions = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/imageProcessingFunctions.js"() {
    init_shaderStore();
    name18 = "imageProcessingFunctions";
    shader18 = `#if defined(COLORGRADING) && !defined(COLORGRADING3D)
/** 
* Polyfill for SAMPLE_TEXTURE_3D,which is unsupported in WebGL.
* sampler3dSetting.x=textureOffset (0.5/textureSize).
* sampler3dSetting.y=textureSize.
*/
#define inline
vec3 sampleTexture3D(sampler2D colorTransform,vec3 color,vec2 sampler3dSetting)
{float sliceSize=2.0*sampler3dSetting.x; 
#ifdef SAMPLER3DGREENDEPTH
float sliceContinuous=(color.g-sampler3dSetting.x)*sampler3dSetting.y;
#else
float sliceContinuous=(color.b-sampler3dSetting.x)*sampler3dSetting.y;
#endif
float sliceInteger=floor(sliceContinuous);float sliceFraction=sliceContinuous-sliceInteger;
#ifdef SAMPLER3DGREENDEPTH
vec2 sliceUV=color.rb;
#else
vec2 sliceUV=color.rg;
#endif
sliceUV.x*=sliceSize;sliceUV.x+=sliceInteger*sliceSize;sliceUV=saturate(sliceUV);vec4 slice0Color=texture2D(colorTransform,sliceUV);sliceUV.x+=sliceSize;sliceUV=saturate(sliceUV);vec4 slice1Color=texture2D(colorTransform,sliceUV);vec3 result=mix(slice0Color.rgb,slice1Color.rgb,sliceFraction);
#ifdef SAMPLER3DBGRMAP
color.rgb=result.rgb;
#else
color.rgb=result.bgr;
#endif
return color;}
#endif
#ifdef TONEMAPPING_ACES
const mat3 ACESInputMat=mat3(
vec3(0.59719,0.07600,0.02840),
vec3(0.35458,0.90834,0.13383),
vec3(0.04823,0.01566,0.83777)
);const mat3 ACESOutputMat=mat3(
vec3( 1.60475,-0.10208,-0.00327),
vec3(-0.53108, 1.10813,-0.07276),
vec3(-0.07367,-0.00605, 1.07602)
);vec3 RRTAndODTFit(vec3 v)
{vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}
vec3 ACESFitted(vec3 color)
{color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;color=saturate(color);return color;}
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_DEFINITIONS
vec4 applyImageProcessing(vec4 result) {
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATSTART
#ifdef EXPOSURE
result.rgb*=exposureLinear;
#endif
#ifdef VIGNETTE
vec2 viewportXY=gl_FragCoord.xy*vInverseScreenSize;viewportXY=viewportXY*2.0-1.0;vec3 vignetteXY1=vec3(viewportXY*vignetteSettings1.xy+vignetteSettings1.zw,1.0);float vignetteTerm=dot(vignetteXY1,vignetteXY1);float vignette=pow(vignetteTerm,vignetteSettings2.w);vec3 vignetteColor=vignetteSettings2.rgb;
#ifdef VIGNETTEBLENDMODEMULTIPLY
vec3 vignetteColorMultiplier=mix(vignetteColor,vec3(1,1,1),vignette);result.rgb*=vignetteColorMultiplier;
#endif
#ifdef VIGNETTEBLENDMODEOPAQUE
result.rgb=mix(vignetteColor,result.rgb,vignette);
#endif
#endif
#ifdef TONEMAPPING
#ifdef TONEMAPPING_ACES
result.rgb=ACESFitted(result.rgb);
#else
const float tonemappingCalibration=1.590579;result.rgb=1.0-exp2(-tonemappingCalibration*result.rgb);
#endif
#endif
result.rgb=toGammaSpace(result.rgb);result.rgb=saturate(result.rgb);
#ifdef CONTRAST
vec3 resultHighContrast=result.rgb*result.rgb*(3.0-2.0*result.rgb);if (contrast<1.0) {result.rgb=mix(vec3(0.5,0.5,0.5),result.rgb,contrast);} else {result.rgb=mix(result.rgb,resultHighContrast,contrast-1.0);}
#endif
#ifdef COLORGRADING
vec3 colorTransformInput=result.rgb*colorTransformSettings.xxx+colorTransformSettings.yyy;
#ifdef COLORGRADING3D
vec3 colorTransformOutput=texture(txColorTransform,colorTransformInput).rgb;
#else
vec3 colorTransformOutput=sampleTexture3D(txColorTransform,colorTransformInput,colorTransformSettings.yz).rgb;
#endif
result.rgb=mix(result.rgb,colorTransformOutput,colorTransformSettings.www);
#endif
#ifdef COLORCURVES
float luma=getLuminance(result.rgb);vec2 curveMix=clamp(vec2(luma*3.0-1.5,luma*-3.0+1.5),vec2(0.0),vec2(1.0));vec4 colorCurve=vCameraColorCurveNeutral+curveMix.x*vCameraColorCurvePositive-curveMix.y*vCameraColorCurveNegative;result.rgb*=colorCurve.rgb;result.rgb=mix(vec3(luma),result.rgb,colorCurve.a);
#endif
#ifdef DITHER
float rand=getRand(gl_FragCoord.xy*vInverseScreenSize);float dither=mix(-ditherIntensity,ditherIntensity,rand);result.rgb=saturate(result.rgb+vec3(dither));
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATEND
return result;}`;
    ShaderStore.IncludesShadersStore[name18] = shader18;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragmentMainFunctions.js
var name19, shader19;
var init_bumpFragmentMainFunctions = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragmentMainFunctions.js"() {
    init_shaderStore();
    name19 = "bumpFragmentMainFunctions";
    shader19 = `#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#ifdef OBJECTSPACE_NORMALMAP
uniform mat4 normalMatrix;
#if defined(WEBGL2) || defined(WEBGPU)
mat4 toNormalMatrix(mat4 wMatrix)
{mat4 ret=inverse(wMatrix);ret=transpose(ret);ret[0][3]=0.;ret[1][3]=0.;ret[2][3]=0.;ret[3]=vec4(0.,0.,0.,1.);return ret;}
#else
mat4 toNormalMatrix(mat4 m)
{float
a00=m[0][0],a01=m[0][1],a02=m[0][2],a03=m[0][3],
a10=m[1][0],a11=m[1][1],a12=m[1][2],a13=m[1][3],
a20=m[2][0],a21=m[2][1],a22=m[2][2],a23=m[2][3],
a30=m[3][0],a31=m[3][1],a32=m[3][2],a33=m[3][3],
b00=a00*a11-a01*a10,
b01=a00*a12-a02*a10,
b02=a00*a13-a03*a10,
b03=a01*a12-a02*a11,
b04=a01*a13-a03*a11,
b05=a02*a13-a03*a12,
b06=a20*a31-a21*a30,
b07=a20*a32-a22*a30,
b08=a20*a33-a23*a30,
b09=a21*a32-a22*a31,
b10=a21*a33-a23*a31,
b11=a22*a33-a23*a32,
det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;mat4 mi=mat4(
a11*b11-a12*b10+a13*b09,
a02*b10-a01*b11-a03*b09,
a31*b05-a32*b04+a33*b03,
a22*b04-a21*b05-a23*b03,
a12*b08-a10*b11-a13*b07,
a00*b11-a02*b08+a03*b07,
a32*b02-a30*b05-a33*b01,
a20*b05-a22*b02+a23*b01,
a10*b10-a11*b08+a13*b06,
a01*b08-a00*b10-a03*b06,
a30*b04-a31*b02+a33*b00,
a21*b02-a20*b04-a23*b00,
a11*b07-a10*b09-a12*b06,
a00*b09-a01*b07+a02*b06,
a31*b01-a30*b03-a32*b00,
a20*b03-a21*b01+a22*b00)/det;return mat4(mi[0][0],mi[1][0],mi[2][0],mi[3][0],
mi[0][1],mi[1][1],mi[2][1],mi[3][1],
mi[0][2],mi[1][2],mi[2][2],mi[3][2],
mi[0][3],mi[1][3],mi[2][3],mi[3][3]);}
#endif
#endif
vec3 perturbNormalBase(mat3 cotangentFrame,vec3 normal,float scale)
{
#ifdef NORMALXYSCALE
normal=normalize(normal*vec3(scale,scale,1.0));
#endif
return normalize(cotangentFrame*normal);}
vec3 perturbNormal(mat3 cotangentFrame,vec3 textureSample,float scale)
{return perturbNormalBase(cotangentFrame,textureSample*2.0-1.0,scale);}
mat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv,vec2 tangentSpaceParams)
{vec3 dp1=dFdx(p);vec3 dp2=dFdy(p);vec2 duv1=dFdx(uv);vec2 duv2=dFdy(uv);vec3 dp2perp=cross(dp2,normal);vec3 dp1perp=cross(normal,dp1);vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;vec3 bitangent=dp2perp*duv1.y+dp1perp*duv2.y;tangent*=tangentSpaceParams.x;bitangent*=tangentSpaceParams.y;float det=max(dot(tangent,tangent),dot(bitangent,bitangent));float invmax=det==0.0 ? 0.0 : inversesqrt(det);return mat3(tangent*invmax,bitangent*invmax,normal);}
#endif
`;
    ShaderStore.IncludesShadersStore[name19] = shader19;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragmentFunctions.js
var name20, shader20;
var init_bumpFragmentFunctions = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragmentFunctions.js"() {
    init_shaderStore();
    init_samplerFragmentDeclaration();
    name20 = "bumpFragmentFunctions";
    shader20 = `#if defined(BUMP)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_SAMPLERNAME_,bump)
#endif
#if defined(DETAIL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_SAMPLERNAME_,detail)
#endif
#if defined(BUMP) && defined(PARALLAX)
const float minSamples=4.;const float maxSamples=15.;const int iMaxSamples=15;vec2 parallaxOcclusion(vec3 vViewDirCoT,vec3 vNormalCoT,vec2 texCoord,float parallaxScale) {float parallaxLimit=length(vViewDirCoT.xy)/vViewDirCoT.z;parallaxLimit*=parallaxScale;vec2 vOffsetDir=normalize(vViewDirCoT.xy);vec2 vMaxOffset=vOffsetDir*parallaxLimit;float numSamples=maxSamples+(dot(vViewDirCoT,vNormalCoT)*(minSamples-maxSamples));float stepSize=1.0/numSamples;float currRayHeight=1.0;vec2 vCurrOffset=vec2(0,0);vec2 vLastOffset=vec2(0,0);float lastSampledHeight=1.0;float currSampledHeight=1.0;bool keepWorking=true;for (int i=0; i<iMaxSamples; i++)
{currSampledHeight=texture2D(bumpSampler,texCoord+vCurrOffset).w;if (!keepWorking)
{}
else if (currSampledHeight>currRayHeight)
{float delta1=currSampledHeight-currRayHeight;float delta2=(currRayHeight+stepSize)-lastSampledHeight;float ratio=delta1/(delta1+delta2);vCurrOffset=(ratio)* vLastOffset+(1.0-ratio)*vCurrOffset;keepWorking=false;}
else
{currRayHeight-=stepSize;vLastOffset=vCurrOffset;
#ifdef PARALLAX_RHS
vCurrOffset-=stepSize*vMaxOffset;
#else
vCurrOffset+=stepSize*vMaxOffset;
#endif
lastSampledHeight=currSampledHeight;}}
return vCurrOffset;}
vec2 parallaxOffset(vec3 viewDir,float heightScale)
{float height=texture2D(bumpSampler,vBumpUV).w;vec2 texCoordOffset=heightScale*viewDir.xy*height;
#ifdef PARALLAX_RHS
return texCoordOffset;
#else
return -texCoordOffset;
#endif
}
#endif
`;
    ShaderStore.IncludesShadersStore[name20] = shader20;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneFragmentDeclaration.js
var name21, shader21;
var init_clipPlaneFragmentDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneFragmentDeclaration.js"() {
    init_shaderStore();
    name21 = "clipPlaneFragmentDeclaration";
    shader21 = `#ifdef CLIPPLANE
varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
varying float fClipDistance6;
#endif
`;
    ShaderStore.IncludesShadersStore[name21] = shader21;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthDeclaration.js
var name22, shader22;
var init_logDepthDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthDeclaration.js"() {
    init_shaderStore();
    name22 = "logDepthDeclaration";
    shader22 = `#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;
    ShaderStore.IncludesShadersStore[name22] = shader22;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogFragmentDeclaration.js
var name23, shader23;
var init_fogFragmentDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/fogFragmentDeclaration.js"() {
    init_shaderStore();
    name23 = "fogFragmentDeclaration";
    shader23 = `#ifdef FOG
#define FOGMODE_NONE 0.
#define FOGMODE_EXP 1.
#define FOGMODE_EXP2 2.
#define FOGMODE_LINEAR 3.
#define E 2.71828
uniform vec4 vFogInfos;uniform vec3 vFogColor;varying vec3 vFogDistance;float CalcFogFactor()
{float fogCoeff=1.0;float fogStart=vFogInfos.y;float fogEnd=vFogInfos.z;float fogDensity=vFogInfos.w;float fogDistance=length(vFogDistance);if (FOGMODE_LINEAR==vFogInfos.x)
{fogCoeff=(fogEnd-fogDistance)/(fogEnd-fogStart);}
else if (FOGMODE_EXP==vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDensity);}
else if (FOGMODE_EXP2==vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDistance*fogDensity*fogDensity);}
return clamp(fogCoeff,0.0,1.0);}
#endif
`;
    ShaderStore.IncludesShadersStore[name23] = shader23;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneFragment.js
var name24, shader24;
var init_clipPlaneFragment = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneFragment.js"() {
    init_shaderStore();
    name24 = "clipPlaneFragment";
    shader24 = `#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fClipDistance>0.0)
{discard;}
#endif
#ifdef CLIPPLANE2
else if (fClipDistance2>0.0)
{discard;}
#endif
#ifdef CLIPPLANE3
else if (fClipDistance3>0.0)
{discard;}
#endif
#ifdef CLIPPLANE4
else if (fClipDistance4>0.0)
{discard;}
#endif
#ifdef CLIPPLANE5
else if (fClipDistance5>0.0)
{discard;}
#endif
#ifdef CLIPPLANE6
else if (fClipDistance6>0.0)
{discard;}
#endif
`;
    ShaderStore.IncludesShadersStore[name24] = shader24;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragment.js
var name25, shader25;
var init_bumpFragment = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragment.js"() {
    init_shaderStore();
    name25 = "bumpFragment";
    shader25 = `vec2 uvOffset=vec2(0.0,0.0);
#if defined(BUMP) || defined(PARALLAX) || defined(DETAIL)
#ifdef NORMALXYSCALE
float normalScale=1.0;
#elif defined(BUMP)
float normalScale=vBumpInfos.y;
#else
float normalScale=1.0;
#endif
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#elif defined(BUMP)
vec2 TBNUV=gl_FrontFacing ? vBumpUV : -vBumpUV;mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vTangentSpaceParams);
#else
vec2 TBNUV=gl_FrontFacing ? vDetailUV : -vDetailUV;mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vec2(1.,1.));
#endif
#elif defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#else
vec2 TBNUV=gl_FrontFacing ? vMainUV1 : -vMainUV1;mat3 TBN=cotangent_frame(normalW,vPositionW,TBNUV,vec2(1.,1.));
#endif
#endif
#ifdef PARALLAX
mat3 invTBN=transposeMat3(TBN);
#ifdef PARALLAXOCCLUSION
uvOffset=parallaxOcclusion(invTBN*-viewDirectionW,invTBN*normalW,vBumpUV,vBumpInfos.z);
#else
uvOffset=parallaxOffset(invTBN*viewDirectionW,vBumpInfos.z);
#endif
#endif
#ifdef DETAIL
vec4 detailColor=texture2D(detailSampler,vDetailUV+uvOffset);vec2 detailNormalRG=detailColor.wy*2.0-1.0;float detailNormalB=sqrt(1.-saturate(dot(detailNormalRG,detailNormalRG)));vec3 detailNormal=vec3(detailNormalRG,detailNormalB);
#endif
#ifdef BUMP
#ifdef OBJECTSPACE_NORMALMAP
#define CUSTOM_FRAGMENT_BUMP_FRAGMENT
normalW=normalize(texture2D(bumpSampler,vBumpUV).xyz *2.0-1.0);normalW=normalize(mat3(normalMatrix)*normalW);
#elif !defined(DETAIL)
normalW=perturbNormal(TBN,texture2D(bumpSampler,vBumpUV+uvOffset).xyz,vBumpInfos.y);
#else
vec3 bumpNormal=texture2D(bumpSampler,vBumpUV+uvOffset).xyz*2.0-1.0;
#if DETAIL_NORMALBLENDMETHOD==0 
detailNormal.xy*=vDetailInfos.z;vec3 blendedNormal=normalize(vec3(bumpNormal.xy+detailNormal.xy,bumpNormal.z*detailNormal.z));
#elif DETAIL_NORMALBLENDMETHOD==1 
detailNormal.xy*=vDetailInfos.z;bumpNormal+=vec3(0.0,0.0,1.0);detailNormal*=vec3(-1.0,-1.0,1.0);vec3 blendedNormal=bumpNormal*dot(bumpNormal,detailNormal)/bumpNormal.z-detailNormal;
#endif
normalW=perturbNormalBase(TBN,blendedNormal,vBumpInfos.y);
#endif
#elif defined(DETAIL)
detailNormal.xy*=vDetailInfos.z;normalW=perturbNormalBase(TBN,detailNormal,vDetailInfos.z);
#endif
`;
    ShaderStore.IncludesShadersStore[name25] = shader25;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/decalFragment.js
var name26, shader26;
var init_decalFragment = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/decalFragment.js"() {
    init_shaderStore();
    name26 = "decalFragment";
    shader26 = `#ifdef DECAL
#ifdef GAMMADECAL
decalColor.rgb=toLinearSpace(decalColor.rgb);
#endif
#ifdef DECAL_SMOOTHALPHA
decalColor.a*=decalColor.a;
#endif
surfaceAlbedo.rgb=mix(surfaceAlbedo.rgb,decalColor.rgb,decalColor.a);
#endif
`;
    ShaderStore.IncludesShadersStore[name26] = shader26;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/depthPrePass.js
var name27, shader27;
var init_depthPrePass = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/depthPrePass.js"() {
    init_shaderStore();
    name27 = "depthPrePass";
    shader27 = `#ifdef DEPTHPREPASS
gl_FragColor=vec4(0.,0.,0.,1.0);return;
#endif
`;
    ShaderStore.IncludesShadersStore[name27] = shader27;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightFragment.js
var name28, shader28;
var init_lightFragment = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/lightFragment.js"() {
    init_shaderStore();
    name28 = "lightFragment";
    shader28 = `#ifdef LIGHT{X}
#if defined(SHADOWONLY) || defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X}) && defined(LIGHTMAPNOSPECULAR{X})
#else
#ifdef PBR
#ifdef SPOTLIGHT{X}
preInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(POINTLIGHT{X})
preInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(HEMILIGHT{X})
preInfo=computeHemisphericPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(DIRLIGHT{X})
preInfo=computeDirectionalPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#endif
preInfo.NdotV=NdotV;
#ifdef SPOTLIGHT{X}
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);preInfo.attenuation*=computeDirectionalLightFalloff_GLTF(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);preInfo.attenuation*=computeDirectionalLightFalloff_Physical(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w);
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);preInfo.attenuation*=computeDirectionalLightFalloff_Standard(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w);
#else
preInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);preInfo.attenuation*=computeDirectionalLightFalloff(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#endif
#elif defined(POINTLIGHT{X})
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);
#else
preInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);
#endif
#else
preInfo.attenuation=1.0;
#endif
#ifdef HEMILIGHT{X}
preInfo.roughness=roughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(roughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
#ifdef IRIDESCENCE
preInfo.iridescenceIntensity=iridescenceIntensity;
#endif
#ifdef HEMILIGHT{X}
info.diffuse=computeHemisphericDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb,light{X}.vLightGround);
#elif defined(SS_TRANSLUCENCY)
info.diffuse=computeDiffuseAndTransmittedLighting(preInfo,light{X}.vLightDiffuse.rgb,subSurfaceOut.transmittance);
#else
info.diffuse=computeDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb);
#endif
#ifdef SPECULARTERM
#ifdef ANISOTROPIC
info.specular=computeAnisotropicSpecularLighting(preInfo,viewDirectionW,normalW,anisotropicOut.anisotropicTangent,anisotropicOut.anisotropicBitangent,anisotropicOut.anisotropy,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#else
info.specular=computeSpecularLighting(preInfo,normalW,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#endif
#endif
#ifdef SHEEN
#ifdef SHEEN_LINKWITHALBEDO
preInfo.roughness=sheenOut.sheenIntensity;
#else
#ifdef HEMILIGHT{X}
preInfo.roughness=sheenOut.sheenRoughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(sheenOut.sheenRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
#endif
info.sheen=computeSheenLighting(preInfo,normalW,sheenOut.sheenColor,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#endif
#ifdef CLEARCOAT
#ifdef HEMILIGHT{X}
preInfo.roughness=clearcoatOut.clearCoatRoughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(clearcoatOut.clearCoatRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
info.clearCoat=computeClearCoatLighting(preInfo,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatAARoughnessFactors.x,clearcoatOut.clearCoatIntensity,light{X}.vLightDiffuse.rgb);
#ifdef CLEARCOAT_TINT
absorption=computeClearCoatLightingAbsorption(clearcoatOut.clearCoatNdotVRefract,preInfo.L,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatColor,clearcoatOut.clearCoatThickness,clearcoatOut.clearCoatIntensity);info.diffuse*=absorption;
#ifdef SPECULARTERM
info.specular*=absorption;
#endif
#endif
info.diffuse*=info.clearCoat.w;
#ifdef SPECULARTERM
info.specular*=info.clearCoat.w;
#endif
#ifdef SHEEN
info.sheen*=info.clearCoat.w;
#endif
#endif
#else
#ifdef SPOTLIGHT{X}
info=computeSpotLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDirection,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);
#elif defined(HEMILIGHT{X})
info=computeHemisphericLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightGround,glossiness);
#elif defined(POINTLIGHT{X}) || defined(DIRLIGHT{X})
info=computeLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);
#endif
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
info.diffuse*=computeProjectionTextureDiffuseLighting(projectionLightSampler{X},textureProjectionMatrix{X});
#endif
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
for (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) 
{
#ifdef SHADOWCSM_RIGHTHANDED{X}
diff{X}=viewFrustumZ{X}[i]+vPositionFromCamera{X}.z;
#else
diff{X}=viewFrustumZ{X}[i]-vPositionFromCamera{X}.z;
#endif
if (diff{X}>=0.) {index{X}=i;break;}}
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
if (index{X}>=0)
#endif
{
#if defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#else
shadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#endif
#else
shadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#ifdef SHADOWCSMDEBUG{X}
shadowDebug{X}=vec3(shadow)*vCascadeColorsMultiplier{X}[index{X}];
#endif
#ifndef SHADOWCSMNOBLEND{X}
float frustumLength=frustumLengths{X}[index{X}];float diffRatio=clamp(diff{X}/frustumLength,0.,1.)*cascadeBlendFactor{X};if (index{X}<(SHADOWCSMNUM_CASCADES{X}-1) && diffRatio<1.)
{index{X}+=1;float nextShadow=0.;
#if defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
nextShadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
nextShadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
nextShadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
nextShadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#elif defined(SHADOWMEDIUMQUALITY{X})
nextShadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#else
nextShadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#endif
#else
nextShadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
shadow=mix(nextShadow,shadow,diffRatio);
#ifdef SHADOWCSMDEBUG{X}
shadowDebug{X}=mix(vec3(nextShadow)*vCascadeColorsMultiplier{X}[index{X}],shadowDebug{X},diffRatio);
#endif
}
#endif
}
#elif defined(SHADOWCLOSEESM{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithCloseESMCube(vPositionW,light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);
#else
shadow=computeShadowWithCloseESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWESM{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithESMCube(vPositionW,light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);
#else
shadow=computeShadowWithESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPOISSON{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithPoissonSamplingCube(vPositionW,light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.depthValues);
#else
shadow=computeShadowWithPoissonSampling(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithPCF1(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithPCF3(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithPCF5(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithPCSS16(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithPCSS32(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithPCSS64(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#else
#if defined(SHADOWCUBE{X})
shadow=computeShadowCube(vPositionW,light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.depthValues);
#else
shadow=computeShadow(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#endif
#ifdef SHADOWONLY
#ifndef SHADOWINUSE
#define SHADOWINUSE
#endif
globalShadow+=shadow;shadowLightCount+=1.0;
#endif
#else
shadow=1.;
#endif
aggShadow+=shadow;numLights+=1.0;
#ifndef SHADOWONLY
#ifdef CUSTOMUSERLIGHTING
diffuseBase+=computeCustomDiffuseLighting(info,diffuseBase,shadow);
#ifdef SPECULARTERM
specularBase+=computeCustomSpecularLighting(info,specularBase,shadow);
#endif
#elif defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X})
diffuseBase+=lightmapColor.rgb*shadow;
#ifdef SPECULARTERM
#ifndef LIGHTMAPNOSPECULAR{X}
specularBase+=info.specular*shadow*lightmapColor.rgb;
#endif
#endif
#ifdef CLEARCOAT
#ifndef LIGHTMAPNOSPECULAR{X}
clearCoatBase+=info.clearCoat.rgb*shadow*lightmapColor.rgb;
#endif
#endif
#ifdef SHEEN
#ifndef LIGHTMAPNOSPECULAR{X}
sheenBase+=info.sheen.rgb*shadow;
#endif
#endif
#else
#ifdef SHADOWCSMDEBUG{X}
diffuseBase+=info.diffuse*shadowDebug{X};
#else 
diffuseBase+=info.diffuse*shadow;
#endif
#ifdef SPECULARTERM
specularBase+=info.specular*shadow;
#endif
#ifdef CLEARCOAT
clearCoatBase+=info.clearCoat.rgb*shadow;
#endif
#ifdef SHEEN
sheenBase+=info.sheen.rgb*shadow;
#endif
#endif
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name28] = shader28;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthFragment.js
var name29, shader29;
var init_logDepthFragment = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthFragment.js"() {
    init_shaderStore();
    name29 = "logDepthFragment";
    shader29 = `#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;
    ShaderStore.IncludesShadersStore[name29] = shader29;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogFragment.js
var name30, shader30;
var init_fogFragment = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/fogFragment.js"() {
    init_shaderStore();
    name30 = "fogFragment";
    shader30 = `#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;
    ShaderStore.IncludesShadersStore[name30] = shader30;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/oitFragment.js
var name31, shader31;
var init_oitFragment = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/oitFragment.js"() {
    init_shaderStore();
    name31 = "oitFragment";
    shader31 = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
float fragDepth=gl_FragCoord.z; 
#ifdef ORDER_INDEPENDENT_TRANSPARENCY_16BITS
uint halfFloat=packHalf2x16(vec2(fragDepth));vec2 full=unpackHalf2x16(halfFloat);fragDepth=full.x;
#endif
ivec2 fragCoord=ivec2(gl_FragCoord.xy);vec2 lastDepth=texelFetch(oitDepthSampler,fragCoord,0).rg;vec4 lastFrontColor=texelFetch(oitFrontColorSampler,fragCoord,0);depth.rg=vec2(-MAX_DEPTH);frontColor=lastFrontColor;backColor=vec4(0.0);
#ifdef USE_REVERSE_DEPTHBUFFER
float furthestDepth=-lastDepth.x;float nearestDepth=lastDepth.y;
#else
float nearestDepth=-lastDepth.x;float furthestDepth=lastDepth.y;
#endif
float alphaMultiplier=1.0-lastFrontColor.a;
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth>nearestDepth || fragDepth<furthestDepth) {
#else
if (fragDepth<nearestDepth || fragDepth>furthestDepth) {
#endif
return;}
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth<nearestDepth && fragDepth>furthestDepth) {
#else
if (fragDepth>nearestDepth && fragDepth<furthestDepth) {
#endif
depth.rg=vec2(-fragDepth,fragDepth);return;}
#endif
`;
    ShaderStore.IncludesShadersStore[name31] = shader31;
  }
});

// node_modules/@babylonjs/core/Shaders/default.fragment.js
var name32, shader32;
var init_default_fragment = __esm({
  "node_modules/@babylonjs/core/Shaders/default.fragment.js"() {
    init_shaderStore();
    init_defaultFragmentDeclaration();
    init_defaultUboDeclaration();
    init_prePassDeclaration();
    init_oitDeclaration();
    init_mainUVVaryingDeclaration();
    init_helperFunctions();
    init_lightFragmentDeclaration();
    init_lightUboDeclaration();
    init_lightsFragmentFunctions();
    init_shadowsFragmentFunctions();
    init_samplerFragmentDeclaration();
    init_fresnelFunction();
    init_reflectionFunction();
    init_imageProcessingDeclaration();
    init_imageProcessingFunctions();
    init_bumpFragmentMainFunctions();
    init_bumpFragmentFunctions();
    init_clipPlaneFragmentDeclaration();
    init_logDepthDeclaration();
    init_fogFragmentDeclaration();
    init_clipPlaneFragment();
    init_bumpFragment();
    init_decalFragment();
    init_depthPrePass();
    init_lightFragment();
    init_logDepthFragment();
    init_fogFragment();
    init_oitFragment();
    name32 = "defaultPixelShader";
    shader32 = `#include<__decl__defaultFragment>
#if defined(BUMP) || !defined(NORMAL)
#extension GL_OES_standard_derivatives : enable
#endif
#include<prePassDeclaration>[SCENE_MRT_COUNT]
#include<oitDeclaration>
#define CUSTOM_FRAGMENT_BEGIN
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<mainUVVaryingDeclaration>[1..7]
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<samplerFragmentDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_SAMPLERNAME_,diffuse)
#include<samplerFragmentDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_SAMPLERNAME_,ambient)
#include<samplerFragmentDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_SAMPLERNAME_,opacity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_SAMPLERNAME_,emissive)
#include<samplerFragmentDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_SAMPLERNAME_,lightmap)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_SAMPLERNAME_,decal)
#ifdef REFRACTION
#ifdef REFRACTIONMAP_3D
uniform samplerCube refractionCubeSampler;
#else
uniform sampler2D refraction2DSampler;
#endif
#endif
#if defined(SPECULARTERM)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_SAMPLERNAME_,specular)
#endif
#include<fresnelFunction>
#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
uniform samplerCube reflectionCubeSampler;
#else
uniform sampler2D reflection2DSampler;
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#endif
#include<reflectionFunction>
#endif
#include<imageProcessingDeclaration>
#include<imageProcessingFunctions>
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=normalize(-cross(dFdx(vPositionW),dFdy(vPositionW)));
#endif
#include<bumpFragment>
#ifdef TWOSIDEDLIGHTING
normalW=gl_FrontFacing ? normalW : -normalW;
#endif
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV+uvOffset);
#if defined(ALPHATEST) && !defined(ALPHATEST_AFTERALLALPHACOMPUTATIONS)
if (baseColor.a<alphaCutOff)
discard;
#endif
#ifdef ALPHAFROMDIFFUSE
alpha*=baseColor.a;
#endif
#define CUSTOM_FRAGMENT_UPDATE_ALPHA
baseColor.rgb*=vDiffuseInfos.y;
#endif
#if defined(DECAL) && !defined(DECAL_AFTER_DETAIL)
vec4 decalColor=texture2D(decalSampler,vDecalUV+uvOffset);
#include<decalFragment>(surfaceAlbedo,baseColor,GAMMADECAL,_GAMMADECAL_NOTUSED_)
#endif
#include<depthPrePass>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
#ifdef DETAIL
baseColor.rgb=baseColor.rgb*2.0*mix(0.5,detailColor.r,vDetailInfos.y);
#endif
#if defined(DECAL) && defined(DECAL_AFTER_DETAIL)
vec4 decalColor=texture2D(decalSampler,vDecalUV+uvOffset);
#include<decalFragment>(surfaceAlbedo,baseColor,GAMMADECAL,_GAMMADECAL_NOTUSED_)
#endif
#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE
vec3 baseAmbientColor=vec3(1.,1.,1.);
#ifdef AMBIENT
baseAmbientColor=texture2D(ambientSampler,vAmbientUV+uvOffset).rgb*vAmbientInfos.y;
#endif
#define CUSTOM_FRAGMENT_BEFORE_LIGHTS
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;vec3 specularColor=vSpecularColor.rgb;
#ifdef SPECULAR
vec4 specularMapColor=texture2D(specularSampler,vSpecularUV+uvOffset);specularColor=specularMapColor.rgb;
#ifdef GLOSSINESS
glossiness=glossiness*specularMapColor.a;
#endif
#endif
#else
float glossiness=0.;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
float shadow=1.;float aggShadow=0.;float numLights=0.;
#ifdef LIGHTMAP
vec4 lightmapColor=texture2D(lightmapSampler,vLightmapUV+uvOffset);
#ifdef RGBDLIGHTMAP
lightmapColor.rgb=fromRGBD(lightmapColor);
#endif
lightmapColor.rgb*=vLightmapInfos.y;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
aggShadow=aggShadow/numLights;vec4 refractionColor=vec4(0.,0.,0.,1.);
#ifdef REFRACTION
vec3 refractionVector=normalize(refract(-viewDirectionW,normalW,vRefractionInfos.y));
#ifdef REFRACTIONMAP_3D
#ifdef USE_LOCAL_REFRACTIONMAP_CUBIC
refractionVector=parallaxCorrectNormal(vPositionW,refractionVector,vRefractionSize,vRefractionPosition);
#endif
refractionVector.y=refractionVector.y*vRefractionInfos.w;vec4 refractionLookup=textureCube(refractionCubeSampler,refractionVector);if (dot(refractionVector,viewDirectionW)<1.0) {refractionColor=refractionLookup;}
#else
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*vRefractionInfos.z,1.0)));vec2 refractionCoords=vRefractionUVW.xy/vRefractionUVW.z;refractionCoords.y=1.0-refractionCoords.y;refractionColor=texture2D(refraction2DSampler,refractionCoords);
#endif
#ifdef RGBDREFRACTION
refractionColor.rgb=fromRGBD(refractionColor);
#endif
#ifdef IS_REFRACTION_LINEAR
refractionColor.rgb=toGammaSpace(refractionColor.rgb);
#endif
refractionColor.rgb*=vRefractionInfos.x;
#endif
vec4 reflectionColor=vec4(0.,0.,0.,1.);
#ifdef REFLECTION
vec3 vReflectionUVW=computeReflectionCoords(vec4(vPositionW,1.0),normalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
vReflectionUVW.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
#ifdef ROUGHNESS
float bias=vReflectionInfos.y;
#ifdef SPECULARTERM
#ifdef SPECULAR
#ifdef GLOSSINESS
bias*=(1.0-specularMapColor.a);
#endif
#endif
#endif
reflectionColor=textureCube(reflectionCubeSampler,vReflectionUVW,bias);
#else
reflectionColor=textureCube(reflectionCubeSampler,vReflectionUVW);
#endif
#else
vec2 coords=vReflectionUVW.xy;
#ifdef REFLECTIONMAP_PROJECTION
coords/=vReflectionUVW.z;
#endif
coords.y=1.0-coords.y;reflectionColor=texture2D(reflection2DSampler,coords);
#endif
#ifdef RGBDREFLECTION
reflectionColor.rgb=fromRGBD(reflectionColor);
#endif
#ifdef IS_REFLECTION_LINEAR
reflectionColor.rgb=toGammaSpace(reflectionColor.rgb);
#endif
reflectionColor.rgb*=vReflectionInfos.x;
#ifdef REFLECTIONFRESNEL
float reflectionFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,reflectionRightColor.a,reflectionLeftColor.a);
#ifdef REFLECTIONFRESNELFROMSPECULAR
#ifdef SPECULARTERM
reflectionColor.rgb*=specularColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#else
reflectionColor.rgb*=reflectionLeftColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#endif
#else
reflectionColor.rgb*=reflectionLeftColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#endif
#endif
#endif
#ifdef REFRACTIONFRESNEL
float refractionFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,refractionRightColor.a,refractionLeftColor.a);refractionColor.rgb*=refractionLeftColor.rgb*(1.0-refractionFresnelTerm)+refractionFresnelTerm*refractionRightColor.rgb;
#endif
#ifdef OPACITY
vec4 opacityMap=texture2D(opacitySampler,vOpacityUV+uvOffset);
#ifdef OPACITYRGB
opacityMap.rgb=opacityMap.rgb*vec3(0.3,0.59,0.11);alpha*=(opacityMap.x+opacityMap.y+opacityMap.z)* vOpacityInfos.y;
#else
alpha*=opacityMap.a*vOpacityInfos.y;
#endif
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef OPACITYFRESNEL
float opacityFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,opacityParts.z,opacityParts.w);alpha+=opacityParts.x*(1.0-opacityFresnelTerm)+opacityFresnelTerm*opacityParts.y;
#endif
#ifdef ALPHATEST
#ifdef ALPHATEST_AFTERALLALPHACOMPUTATIONS
if (alpha<alphaCutOff)
discard;
#endif
#ifndef ALPHABLEND
alpha=1.0;
#endif
#endif
vec3 emissiveColor=vEmissiveColor;
#ifdef EMISSIVE
emissiveColor+=texture2D(emissiveSampler,vEmissiveUV+uvOffset).rgb*vEmissiveInfos.y;
#endif
#ifdef EMISSIVEFRESNEL
float emissiveFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,emissiveRightColor.a,emissiveLeftColor.a);emissiveColor*=emissiveLeftColor.rgb*(1.0-emissiveFresnelTerm)+emissiveFresnelTerm*emissiveRightColor.rgb;
#endif
#ifdef DIFFUSEFRESNEL
float diffuseFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,diffuseRightColor.a,diffuseLeftColor.a);diffuseBase*=diffuseLeftColor.rgb*(1.0-diffuseFresnelTerm)+diffuseFresnelTerm*diffuseRightColor.rgb;
#endif
#ifdef EMISSIVEASILLUMINATION
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#else
#ifdef LINKEMISSIVEWITHDIFFUSE
vec3 finalDiffuse=clamp((diffuseBase+emissiveColor)*diffuseColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#else
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor+emissiveColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#endif
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#ifdef SPECULAROVERALPHA
alpha=clamp(alpha+dot(finalSpecular,vec3(0.3,0.59,0.11)),0.,1.);
#endif
#else
vec3 finalSpecular=vec3(0.0);
#endif
#ifdef REFLECTIONOVERALPHA
alpha=clamp(alpha+dot(reflectionColor.rgb,vec3(0.3,0.59,0.11)),0.,1.);
#endif
#ifdef EMISSIVEASILLUMINATION
vec4 color=vec4(clamp(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor.rgb+emissiveColor+refractionColor.rgb,0.0,1.0),alpha);
#else
vec4 color=vec4(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor.rgb+refractionColor.rgb,alpha);
#endif
#ifdef LIGHTMAP
#ifndef LIGHTMAPEXCLUDED
#ifdef USELIGHTMAPASSHADOWMAP
color.rgb*=lightmapColor.rgb;
#else
color.rgb+=lightmapColor.rgb;
#endif
#endif
#endif
#define CUSTOM_FRAGMENT_BEFORE_FOG
color.rgb=max(color.rgb,0.);
#include<logDepthFragment>
#include<fogFragment>
#ifdef IMAGEPROCESSINGPOSTPROCESS
color.rgb=toLinearSpace(color.rgb);
#else
#ifdef IMAGEPROCESSING
color.rgb=toLinearSpace(color.rgb);color=applyImageProcessing(color);
#endif
#endif
color.a*=visibility;
#ifdef PREMULTIPLYALPHA
color.rgb*=color.a;
#endif
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef PREPASS
float writeGeometryInfo=color.a>0.4 ? 1.0 : 0.0;gl_FragData[0]=color; 
#ifdef PREPASS_POSITION
gl_FragData[PREPASS_POSITION_INDEX]=vec4(vPositionW,writeGeometryInfo);
#endif
#ifdef PREPASS_VELOCITY
vec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;vec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;vec2 velocity=abs(a-b);velocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;gl_FragData[PREPASS_VELOCITY_INDEX]=vec4(velocity,0.0,writeGeometryInfo);
#endif
#ifdef PREPASS_IRRADIANCE
gl_FragData[PREPASS_IRRADIANCE_INDEX]=vec4(0.0,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_DEPTH
gl_FragData[PREPASS_DEPTH_INDEX]=vec4(vViewPos.z,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_NORMAL
#ifdef PREPASS_NORMAL_WORLDSPACE
gl_FragData[PREPASS_NORMAL_INDEX]=vec4(normalW,writeGeometryInfo); 
#else
gl_FragData[PREPASS_NORMAL_INDEX]=vec4(normalize((view*vec4(normalW,0.0)).rgb),writeGeometryInfo); 
#endif
#endif
#ifdef PREPASS_ALBEDO_SQRT
gl_FragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4(0.0,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_REFLECTIVITY
#if defined(SPECULARTERM)
#if defined(SPECULAR)
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toLinearSpace(specularMapColor))*writeGeometryInfo; 
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toLinearSpace(specularColor),1.0)*writeGeometryInfo;
#endif
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(0.0,0.0,0.0,1.0)*writeGeometryInfo;
#endif
#endif
#endif
#if !defined(PREPASS) || defined(WEBGL2)
gl_FragColor=color;
#endif
#include<oitFragment>
#if ORDER_INDEPENDENT_TRANSPARENCY
if (fragDepth==nearestDepth) {frontColor.rgb+=color.rgb*color.a*alphaMultiplier;frontColor.a=1.0-alphaMultiplier*(1.0-color.a);} else {backColor+=color;}
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}
`;
    ShaderStore.ShadersStore[name32] = shader32;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/decalVertexDeclaration.js
var name33, shader33;
var init_decalVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/decalVertexDeclaration.js"() {
    init_shaderStore();
    name33 = "decalVertexDeclaration";
    shader33 = `#ifdef DECAL
uniform vec4 vDecalInfos;uniform mat4 decalMatrix;
#endif
`;
    ShaderStore.IncludesShadersStore[name33] = shader33;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultVertexDeclaration.js
var name34, shader34;
var init_defaultVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultVertexDeclaration.js"() {
    init_shaderStore();
    init_decalVertexDeclaration();
    name34 = "defaultVertexDeclaration";
    shader34 = `uniform mat4 viewProjection;uniform mat4 view;
#ifdef DIFFUSE
uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
#endif
#ifdef AMBIENT
uniform mat4 ambientMatrix;uniform vec2 vAmbientInfos;
#endif
#ifdef OPACITY
uniform mat4 opacityMatrix;uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;uniform mat4 emissiveMatrix;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;uniform mat4 lightmapMatrix;
#endif
#if defined(SPECULAR) && defined(SPECULARTERM)
uniform vec2 vSpecularInfos;uniform mat4 specularMatrix;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;uniform mat4 bumpMatrix;
#endif
#ifdef REFLECTION
uniform mat4 reflectionMatrix;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;uniform mat4 detailMatrix;
#endif
#include<decalVertexDeclaration>
#define ADDITIONAL_VERTEX_DECLARATION
`;
    ShaderStore.IncludesShadersStore[name34] = shader34;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/uvAttributeDeclaration.js
var name35, shader35;
var init_uvAttributeDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/uvAttributeDeclaration.js"() {
    init_shaderStore();
    name35 = "uvAttributeDeclaration";
    shader35 = `#ifdef UV{X}
attribute vec2 uv{X};
#endif
`;
    ShaderStore.IncludesShadersStore[name35] = shader35;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bonesDeclaration.js
var name36, shader36;
var init_bonesDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bonesDeclaration.js"() {
    init_shaderStore();
    name36 = "bonesDeclaration";
    shader36 = `#if NUM_BONE_INFLUENCERS>0
attribute vec4 matricesIndices;attribute vec4 matricesWeights;
#if NUM_BONE_INFLUENCERS>4
attribute vec4 matricesIndicesExtra;attribute vec4 matricesWeightsExtra;
#endif
#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#ifdef BONETEXTURE
uniform highp sampler2D boneSampler;uniform float boneTextureWidth;
#else
uniform mat4 mBones[BonesPerMesh];
#endif
#ifdef BONES_VELOCITY_ENABLED
uniform mat4 mPreviousBones[BonesPerMesh];
#endif
#ifdef BONETEXTURE
#define inline
mat4 readMatrixFromRawSampler(sampler2D smp,float index)
{float offset=index *4.0;float dx=1.0/boneTextureWidth;vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),0.));vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),0.));vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),0.));vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),0.));return mat4(m0,m1,m2,m3);}
#endif
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name36] = shader36;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimationDeclaration.js
var name37, shader37;
var init_bakedVertexAnimationDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimationDeclaration.js"() {
    init_shaderStore();
    name37 = "bakedVertexAnimationDeclaration";
    shader37 = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
uniform float bakedVertexAnimationTime;uniform vec2 bakedVertexAnimationTextureSizeInverted;uniform vec4 bakedVertexAnimationSettings;uniform sampler2D bakedVertexAnimationTexture;
#ifdef INSTANCES
attribute vec4 bakedVertexAnimationSettingsInstanced;
#endif
#define inline
mat4 readMatrixFromRawSamplerVAT(sampler2D smp,float index,float frame)
{float offset=index*4.0;float frameUV=(frame+0.5)*bakedVertexAnimationTextureSizeInverted.y;float dx=bakedVertexAnimationTextureSizeInverted.x;vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),frameUV));vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),frameUV));vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),frameUV));vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),frameUV));return mat4(m0,m1,m2,m3);}
#endif
`;
    ShaderStore.IncludesShadersStore[name37] = shader37;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/instancesDeclaration.js
var name38, shader38;
var init_instancesDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/instancesDeclaration.js"() {
    init_shaderStore();
    name38 = "instancesDeclaration";
    shader38 = `#ifdef INSTANCES
attribute vec4 world0;attribute vec4 world1;attribute vec4 world2;attribute vec4 world3;
#ifdef INSTANCESCOLOR
attribute vec4 instanceColor;
#endif
#if defined(THIN_INSTANCES) && !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY)
attribute vec4 previousWorld0;attribute vec4 previousWorld1;attribute vec4 previousWorld2;attribute vec4 previousWorld3;
#ifdef THIN_INSTANCES
uniform mat4 previousWorld;
#endif
#endif
#else
#if !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY)
uniform mat4 previousWorld;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name38] = shader38;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassVertexDeclaration.js
var name39, shader39;
var init_prePassVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassVertexDeclaration.js"() {
    init_shaderStore();
    name39 = "prePassVertexDeclaration";
    shader39 = `#ifdef PREPASS
#ifdef PREPASS_DEPTH
varying vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
uniform mat4 previousViewProjection;varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name39] = shader39;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerVertexDeclaration.js
var name40, shader40;
var init_samplerVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerVertexDeclaration.js"() {
    init_shaderStore();
    name40 = "samplerVertexDeclaration";
    shader40 = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
varying vec2 v_VARYINGNAME_UV;
#endif
`;
    ShaderStore.IncludesShadersStore[name40] = shader40;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpVertexDeclaration.js
var name41, shader41;
var init_bumpVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpVertexDeclaration.js"() {
    init_shaderStore();
    name41 = "bumpVertexDeclaration";
    shader41 = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name41] = shader41;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertexDeclaration.js
var name42, shader42;
var init_clipPlaneVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertexDeclaration.js"() {
    init_shaderStore();
    name42 = "clipPlaneVertexDeclaration";
    shader42 = `#ifdef CLIPPLANE
uniform vec4 vClipPlane;varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
uniform vec4 vClipPlane2;varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
uniform vec4 vClipPlane3;varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
uniform vec4 vClipPlane4;varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
uniform vec4 vClipPlane5;varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
uniform vec4 vClipPlane6;varying float fClipDistance6;
#endif
`;
    ShaderStore.IncludesShadersStore[name42] = shader42;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogVertexDeclaration.js
var name43, shader43;
var init_fogVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/fogVertexDeclaration.js"() {
    init_shaderStore();
    name43 = "fogVertexDeclaration";
    shader43 = `#ifdef FOG
varying vec3 vFogDistance;
#endif
`;
    ShaderStore.IncludesShadersStore[name43] = shader43;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightVxFragmentDeclaration.js
var name44, shader44;
var init_lightVxFragmentDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/lightVxFragmentDeclaration.js"() {
    init_shaderStore();
    name44 = "lightVxFragmentDeclaration";
    shader44 = `#ifdef LIGHT{X}
uniform vec4 vLightData{X};uniform vec4 vLightDiffuse{X};
#ifdef SPECULARTERM
uniform vec4 vLightSpecular{X};
#else
vec4 vLightSpecular{X}=vec4(0.);
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromCamera{X};
#elif defined(SHADOWCUBE{X})
#else
varying vec4 vPositionFromLight{X};varying float vDepthMetric{X};uniform mat4 lightMatrix{X};
#endif
uniform vec4 shadowsInfo{X};uniform vec2 depthValues{X};
#endif
#ifdef SPOTLIGHT{X}
uniform vec4 vLightDirection{X};uniform vec4 vLightFalloff{X};
#elif defined(POINTLIGHT{X})
uniform vec4 vLightFalloff{X};
#elif defined(HEMILIGHT{X})
uniform vec3 vLightGround{X};
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name44] = shader44;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightVxUboDeclaration.js
var name45, shader45;
var init_lightVxUboDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/lightVxUboDeclaration.js"() {
    init_shaderStore();
    name45 = "lightVxUboDeclaration";
    shader45 = `#ifdef LIGHT{X}
uniform Light{X}
{vec4 vLightData;vec4 vLightDiffuse;vec4 vLightSpecular;
#ifdef SPOTLIGHT{X}
vec4 vLightDirection;vec4 vLightFalloff;
#elif defined(POINTLIGHT{X})
vec4 vLightFalloff;
#elif defined(HEMILIGHT{X})
vec3 vLightGround;
#endif
vec4 shadowsInfo;vec2 depthValues;} light{X};
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromCamera{X};
#elif defined(SHADOWCUBE{X})
#else
varying vec4 vPositionFromLight{X};varying float vDepthMetric{X};uniform mat4 lightMatrix{X};
#endif
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name45] = shader45;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexGlobalDeclaration.js
var name46, shader46;
var init_morphTargetsVertexGlobalDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexGlobalDeclaration.js"() {
    init_shaderStore();
    name46 = "morphTargetsVertexGlobalDeclaration";
    shader46 = `#ifdef MORPHTARGETS
uniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];
#ifdef MORPHTARGETS_TEXTURE 
uniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];uniform vec3 morphTargetTextureInfo;uniform highp sampler2DArray morphTargets;vec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)
{ 
float y=floor(vertexIndex/morphTargetTextureInfo.y);float x=vertexIndex-y*morphTargetTextureInfo.y;vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);return texture(morphTargets,textureUV).xyz;}
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name46] = shader46;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexDeclaration.js
var name47, shader47;
var init_morphTargetsVertexDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexDeclaration.js"() {
    init_shaderStore();
    name47 = "morphTargetsVertexDeclaration";
    shader47 = `#ifdef MORPHTARGETS
#ifndef MORPHTARGETS_TEXTURE
attribute vec3 position{X};
#ifdef MORPHTARGETS_NORMAL
attribute vec3 normal{X};
#endif
#ifdef MORPHTARGETS_TANGENT
attribute vec3 tangent{X};
#endif
#ifdef MORPHTARGETS_UV
attribute vec2 uv_{X};
#endif
#elif {X}==0
uniform int morphTargetCount;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name47] = shader47;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexGlobal.js
var name48, shader48;
var init_morphTargetsVertexGlobal = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexGlobal.js"() {
    init_shaderStore();
    name48 = "morphTargetsVertexGlobal";
    shader48 = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name48] = shader48;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertex.js
var name49, shader49;
var init_morphTargetsVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertex.js"() {
    init_shaderStore();
    name49 = "morphTargetsVertex";
    shader49 = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
#if {X}==0
for (int i=0; i<NUM_MORPH_INFLUENCERS; i++) {if (i>=morphTargetCount) break;vertexID=float(gl_VertexID)*morphTargetTextureInfo.x;positionUpdated+=(readVector3FromRawSampler(i,vertexID)-position)*morphTargetInfluences[i];vertexID+=1.0;
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(readVector3FromRawSampler(i,vertexID) -normal)*morphTargetInfluences[i];vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(readVector3FromRawSampler(i,vertexID).xy-uv)*morphTargetInfluences[i];vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(readVector3FromRawSampler(i,vertexID) -tangent.xyz)*morphTargetInfluences[i];
#endif
}
#endif
#else
positionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];
#endif
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name49] = shader49;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/instancesVertex.js
var name50, shader50;
var init_instancesVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/instancesVertex.js"() {
    init_shaderStore();
    name50 = "instancesVertex";
    shader50 = `#ifdef INSTANCES
mat4 finalWorld=mat4(world0,world1,world2,world3);
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
mat4 finalPreviousWorld=mat4(previousWorld0,previousWorld1,previousWorld2,previousWorld3);
#endif
#ifdef THIN_INSTANCES
finalWorld=world*finalWorld;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
finalPreviousWorld=previousWorld*finalPreviousWorld;
#endif
#endif
#else
mat4 finalWorld=world;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
mat4 finalPreviousWorld=previousWorld;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name50] = shader50;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bonesVertex.js
var name51, shader51;
var init_bonesVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bonesVertex.js"() {
    init_shaderStore();
    name51 = "bonesVertex";
    shader51 = `#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#if NUM_BONE_INFLUENCERS>0
mat4 influence;
#ifdef BONETEXTURE
influence=readMatrixFromRawSampler(boneSampler,matricesIndices[0])*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[1])*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[2])*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[3])*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[0])*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[1])*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[2])*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[3])*matricesWeightsExtra[3];
#endif
#else
influence=mBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=mBones[int(matricesIndices[1])]*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=mBones[int(matricesIndices[2])]*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=mBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=mBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=mBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=mBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=mBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
#endif
finalWorld=finalWorld*influence;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name51] = shader51;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimation.js
var name52, shader52;
var init_bakedVertexAnimation = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimation.js"() {
    init_shaderStore();
    name52 = "bakedVertexAnimation";
    shader52 = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
{
#ifdef INSTANCES
#define BVASNAME bakedVertexAnimationSettingsInstanced
#else
#define BVASNAME bakedVertexAnimationSettings
#endif
float VATStartFrame=BVASNAME.x;float VATEndFrame=BVASNAME.y;float VATOffsetFrame=BVASNAME.z;float VATSpeed=BVASNAME.w;float totalFrames=VATEndFrame-VATStartFrame+1.0;float time=bakedVertexAnimationTime*VATSpeed/totalFrames;float frameCorrection=time<1.0 ? 0.0 : 1.0;float numOfFrames=totalFrames-frameCorrection;float VATFrameNum=fract(time)*numOfFrames;VATFrameNum=mod(VATFrameNum+VATOffsetFrame,numOfFrames);VATFrameNum=floor(VATFrameNum);VATFrameNum+=VATStartFrame+frameCorrection;mat4 VATInfluence;VATInfluence=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[0],VATFrameNum)*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[1],VATFrameNum)*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[2],VATFrameNum)*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[3],VATFrameNum)*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[0],VATFrameNum)*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[1],VATFrameNum)*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[2],VATFrameNum)*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[3],VATFrameNum)*matricesWeightsExtra[3];
#endif
finalWorld=finalWorld*VATInfluence;}
#endif
`;
    ShaderStore.IncludesShadersStore[name52] = shader52;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassVertex.js
var name53, shader53;
var init_prePassVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassVertex.js"() {
    init_shaderStore();
    name53 = "prePassVertex";
    shader53 = `#ifdef PREPASS_DEPTH
vViewPos=(view*worldPos).rgb;
#endif
#if defined(PREPASS_VELOCITY) && defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*worldPos;
#if NUM_BONE_INFLUENCERS>0
mat4 previousInfluence;previousInfluence=mPreviousBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
previousInfluence+=mPreviousBones[int(matricesIndices[1])]*matricesWeights[1];
#endif 
#if NUM_BONE_INFLUENCERS>2
previousInfluence+=mPreviousBones[int(matricesIndices[2])]*matricesWeights[2];
#endif 
#if NUM_BONE_INFLUENCERS>3
previousInfluence+=mPreviousBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif 
#if NUM_BONE_INFLUENCERS>5
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif 
#if NUM_BONE_INFLUENCERS>6
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif 
#if NUM_BONE_INFLUENCERS>7
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
vPreviousPosition=previousViewProjection*finalPreviousWorld*previousInfluence*vec4(positionUpdated,1.0);
#else
vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name53] = shader53;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/uvVariableDeclaration.js
var name54, shader54;
var init_uvVariableDeclaration = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/uvVariableDeclaration.js"() {
    init_shaderStore();
    name54 = "uvVariableDeclaration";
    shader54 = `#if !defined(UV{X}) && defined(MAINUV{X})
vec2 uv{X}=vec2(0.,0.);
#endif
#ifdef MAINUV{X}
vMainUV{X}=uv{X};
#endif
`;
    ShaderStore.IncludesShadersStore[name54] = shader54;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerVertexImplementation.js
var name55, shader55;
var init_samplerVertexImplementation = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerVertexImplementation.js"() {
    init_shaderStore();
    name55 = "samplerVertexImplementation";
    shader55 = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
if (v_INFONAME_==0.)
{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uvUpdated,1.0,0.0));}
#ifdef UV2
else if (v_INFONAME_==1.)
{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv2,1.0,0.0));}
#endif
#ifdef UV3
else if (v_INFONAME_==2.)
{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv3,1.0,0.0));}
#endif
#ifdef UV4
else if (v_INFONAME_==3.)
{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv4,1.0,0.0));}
#endif
#ifdef UV5
else if (v_INFONAME_==4.)
{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv5,1.0,0.0));}
#endif
#ifdef UV6
else if (v_INFONAME_==5.)
{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv6,1.0,0.0));}
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name55] = shader55;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpVertex.js
var name56, shader56;
var init_bumpVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpVertex.js"() {
    init_shaderStore();
    name56 = "bumpVertex";
    shader56 = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
vec3 tbnNormal=normalize(normalUpdated);vec3 tbnTangent=normalize(tangentUpdated.xyz);vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name56] = shader56;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertex.js
var name57, shader57;
var init_clipPlaneVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertex.js"() {
    init_shaderStore();
    name57 = "clipPlaneVertex";
    shader57 = `#ifdef CLIPPLANE
fClipDistance=dot(worldPos,vClipPlane);
#endif
#ifdef CLIPPLANE2
fClipDistance2=dot(worldPos,vClipPlane2);
#endif
#ifdef CLIPPLANE3
fClipDistance3=dot(worldPos,vClipPlane3);
#endif
#ifdef CLIPPLANE4
fClipDistance4=dot(worldPos,vClipPlane4);
#endif
#ifdef CLIPPLANE5
fClipDistance5=dot(worldPos,vClipPlane5);
#endif
#ifdef CLIPPLANE6
fClipDistance6=dot(worldPos,vClipPlane6);
#endif
`;
    ShaderStore.IncludesShadersStore[name57] = shader57;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogVertex.js
var name58, shader58;
var init_fogVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/fogVertex.js"() {
    init_shaderStore();
    name58 = "fogVertex";
    shader58 = `#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;
    ShaderStore.IncludesShadersStore[name58] = shader58;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/shadowsVertex.js
var name59, shader59;
var init_shadowsVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/shadowsVertex.js"() {
    init_shaderStore();
    name59 = "shadowsVertex";
    shader59 = `#ifdef SHADOWS
#if defined(SHADOWCSM{X})
vPositionFromCamera{X}=view*worldPos;for (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) {vPositionFromLight{X}[i]=lightMatrix{X}[i]*worldPos;
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric{X}[i]=(-vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;
#else
vDepthMetric{X}[i]=(vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;
#endif
}
#elif defined(SHADOW{X}) && !defined(SHADOWCUBE{X})
vPositionFromLight{X}=lightMatrix{X}*worldPos;
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric{X}=(-vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;
#else
vDepthMetric{X}=(vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;
#endif
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name59] = shader59;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/vertexColorMixing.js
var name60, shader60;
var init_vertexColorMixing = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/vertexColorMixing.js"() {
    init_shaderStore();
    name60 = "vertexColorMixing";
    shader60 = `#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
vColor=vec4(1.0);
#ifdef VERTEXCOLOR
#ifdef VERTEXALPHA
vColor*=color;
#else
vColor.rgb*=color.rgb;
#endif
#endif
#ifdef INSTANCESCOLOR
vColor*=instanceColor;
#endif
#endif
`;
    ShaderStore.IncludesShadersStore[name60] = shader60;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/pointCloudVertex.js
var name61, shader61;
var init_pointCloudVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/pointCloudVertex.js"() {
    init_shaderStore();
    name61 = "pointCloudVertex";
    shader61 = `#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;
    ShaderStore.IncludesShadersStore[name61] = shader61;
  }
});

// node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthVertex.js
var name62, shader62;
var init_logDepthVertex = __esm({
  "node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthVertex.js"() {
    init_shaderStore();
    name62 = "logDepthVertex";
    shader62 = `#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;
    ShaderStore.IncludesShadersStore[name62] = shader62;
  }
});

// node_modules/@babylonjs/core/Shaders/default.vertex.js
var name63, shader63;
var init_default_vertex = __esm({
  "node_modules/@babylonjs/core/Shaders/default.vertex.js"() {
    init_shaderStore();
    init_defaultVertexDeclaration();
    init_defaultUboDeclaration();
    init_uvAttributeDeclaration();
    init_helperFunctions();
    init_bonesDeclaration();
    init_bakedVertexAnimationDeclaration();
    init_instancesDeclaration();
    init_prePassVertexDeclaration();
    init_mainUVVaryingDeclaration();
    init_samplerVertexDeclaration();
    init_bumpVertexDeclaration();
    init_clipPlaneVertexDeclaration();
    init_fogVertexDeclaration();
    init_lightVxFragmentDeclaration();
    init_lightVxUboDeclaration();
    init_morphTargetsVertexGlobalDeclaration();
    init_morphTargetsVertexDeclaration();
    init_logDepthDeclaration();
    init_morphTargetsVertexGlobal();
    init_morphTargetsVertex();
    init_instancesVertex();
    init_bonesVertex();
    init_bakedVertexAnimation();
    init_prePassVertex();
    init_uvVariableDeclaration();
    init_samplerVertexImplementation();
    init_bumpVertex();
    init_clipPlaneVertex();
    init_fogVertex();
    init_shadowsVertex();
    init_vertexColorMixing();
    init_pointCloudVertex();
    init_logDepthVertex();
    name63 = "defaultVertexShader";
    shader63 = `#include<__decl__defaultVertex>
#define CUSTOM_VERTEX_BEGIN
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef TANGENT
attribute vec4 tangent;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#include<uvAttributeDeclaration>[2..7]
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<helperFunctions>
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<prePassVertexDeclaration>
#include<mainUVVaryingDeclaration>[1..7]
#include<samplerVertexDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse)
#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)
#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)
#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)
#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)
#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)
#if defined(SPECULARTERM)
#include<samplerVertexDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular)
#endif
#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)
#include<samplerVertexDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal)
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<bumpVertexDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightVxFragment>[0..maxSimultaneousLights]
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#endif
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#include<logDepthDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec3 positionUpdated=position;
#ifdef NORMAL
vec3 normalUpdated=normal;
#endif
#ifdef TANGENT
vec4 tangentUpdated=tangent;
#endif
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
vPositionUVW=positionUpdated;
#endif
#define CUSTOM_VERTEX_UPDATE_POSITION
#define CUSTOM_VERTEX_UPDATE_NORMAL
#include<instancesVertex>
#if defined(PREPASS) && defined(PREPASS_VELOCITY) && !defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#ifdef NORMAL
mat3 normalWorld=mat3(finalWorld);
#if defined(INSTANCES) && defined(THIN_INSTANCES)
vNormalW=normalUpdated/vec3(dot(normalWorld[0],normalWorld[0]),dot(normalWorld[1],normalWorld[1]),dot(normalWorld[2],normalWorld[2]));vNormalW=normalize(normalWorld*vNormalW);
#else
#ifdef NONUNIFORMSCALING
normalWorld=transposeMat3(inverseMat3(normalWorld));
#endif
vNormalW=normalize(normalWorld*normalUpdated);
#endif
#endif
#define CUSTOM_VERTEX_UPDATE_WORLDPOS
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {gl_Position=viewProjection*worldPos;} else {gl_Position=viewProjectionR*worldPos;}
#else
gl_Position=viewProjection*worldPos;
#endif
vPositionW=vec3(worldPos);
#include<prePassVertex>
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
vDirectionW=normalize(vec3(finalWorld*vec4(positionUpdated,0.0)));
#endif
#ifndef UV1
vec2 uvUpdated=vec2(0.,0.);
#endif
#ifdef MAINUV1
vMainUV1=uvUpdated;
#endif
#include<uvVariableDeclaration>[2..7]
#include<samplerVertexImplementation>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_MATRIXNAME_,diffuse,_INFONAME_,DiffuseInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)
#if defined(SPECULARTERM)
#include<samplerVertexImplementation>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_MATRIXNAME_,specular,_INFONAME_,SpecularInfos.x)
#endif
#include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_MATRIXNAME_,decal,_INFONAME_,DecalInfos.x)
#include<bumpVertex>
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#include<pointCloudVertex>
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;
    ShaderStore.ShadersStore[name63] = shader63;
  }
});

// node_modules/@babylonjs/core/Materials/materialPluginManager.js
function RegisterMaterialPlugin(pluginName, factory) {
  if (!inited) {
    observer = Material.OnEventObservable.add((material) => {
      for (const [, factory2] of plugins) {
        factory2(material);
      }
    }, MaterialPluginEvent.Created);
    inited = true;
  }
  const existing = plugins.filter(([name66, _factory]) => name66 === pluginName);
  if (existing.length > 0) {
    existing[0][1] = factory;
  } else {
    plugins.push([pluginName, factory]);
  }
}
function UnregisterMaterialPlugin(pluginName) {
  for (let i = 0; i < plugins.length; ++i) {
    if (plugins[i][0] === pluginName) {
      plugins.splice(i, 1);
      if (plugins.length === 0) {
        UnregisterAllMaterialPlugins();
      }
      return true;
    }
  }
  return false;
}
function UnregisterAllMaterialPlugins() {
  plugins.length = 0;
  inited = false;
  Material.OnEventObservable.remove(observer);
  observer = null;
}
var rxOption, MaterialPluginManager, plugins, inited, observer;
var init_materialPluginManager = __esm({
  "node_modules/@babylonjs/core/Materials/materialPluginManager.js"() {
    init_material();
    init_materialPluginEvent();
    init_engineStore();
    init_shaderProcessor();
    init_shaderLanguage();
    init_shaderStore();
    rxOption = new RegExp("^([gimus]+)!");
    MaterialPluginManager = class _MaterialPluginManager {
      /**
       * Creates a new instance of the plugin manager
       * @param material material that this manager will manage the plugins for
       */
      constructor(material) {
        this._plugins = [];
        this._activePlugins = [];
        this._activePluginsForExtraEvents = [];
        this._material = material;
        this._scene = material.getScene();
        this._engine = this._scene.getEngine();
      }
      /**
       * @internal
       */
      _addPlugin(plugin) {
        for (let i = 0; i < this._plugins.length; ++i) {
          if (this._plugins[i].name === plugin.name) {
            return false;
          }
        }
        if (this._material._uniformBufferLayoutBuilt) {
          throw `The plugin "${plugin.name}" can't be added to the material "${this._material.name}" because this material has already been used for rendering! Please add plugins to materials before any rendering with this material occurs.`;
        }
        const pluginClassName = plugin.getClassName();
        if (!_MaterialPluginManager._MaterialPluginClassToMainDefine[pluginClassName]) {
          _MaterialPluginManager._MaterialPluginClassToMainDefine[pluginClassName] = "MATERIALPLUGIN_" + ++_MaterialPluginManager._MaterialPluginCounter;
        }
        this._material._callbackPluginEventGeneric = (id, info) => this._handlePluginEvent(id, info);
        this._plugins.push(plugin);
        this._plugins.sort((a, b) => a.priority - b.priority);
        this._codeInjectionPoints = {};
        const defineNamesFromPlugins = {};
        defineNamesFromPlugins[_MaterialPluginManager._MaterialPluginClassToMainDefine[pluginClassName]] = {
          type: "boolean",
          default: true
        };
        for (const plugin2 of this._plugins) {
          plugin2.collectDefines(defineNamesFromPlugins);
          this._collectPointNames("vertex", plugin2.getCustomCode("vertex"));
          this._collectPointNames("fragment", plugin2.getCustomCode("fragment"));
        }
        this._defineNamesFromPlugins = defineNamesFromPlugins;
        return true;
      }
      /**
       * @internal
       */
      _activatePlugin(plugin) {
        if (this._activePlugins.indexOf(plugin) === -1) {
          this._activePlugins.push(plugin);
          this._activePlugins.sort((a, b) => a.priority - b.priority);
          this._material._callbackPluginEventIsReadyForSubMesh = this._handlePluginEventIsReadyForSubMesh.bind(this);
          this._material._callbackPluginEventPrepareDefinesBeforeAttributes = this._handlePluginEventPrepareDefinesBeforeAttributes.bind(this);
          this._material._callbackPluginEventPrepareDefines = this._handlePluginEventPrepareDefines.bind(this);
          this._material._callbackPluginEventBindForSubMesh = this._handlePluginEventBindForSubMesh.bind(this);
          if (plugin.registerForExtraEvents) {
            this._activePluginsForExtraEvents.push(plugin);
            this._activePluginsForExtraEvents.sort((a, b) => a.priority - b.priority);
            this._material._callbackPluginEventHasRenderTargetTextures = this._handlePluginEventHasRenderTargetTextures.bind(this);
            this._material._callbackPluginEventFillRenderTargetTextures = this._handlePluginEventFillRenderTargetTextures.bind(this);
            this._material._callbackPluginEventHardBindForSubMesh = this._handlePluginEventHardBindForSubMesh.bind(this);
          }
        }
      }
      /**
       * Gets a plugin from the list of plugins managed by this manager
       * @param name name of the plugin
       * @returns the plugin if found, else null
       */
      getPlugin(name66) {
        for (let i = 0; i < this._plugins.length; ++i) {
          if (this._plugins[i].name === name66) {
            return this._plugins[i];
          }
        }
        return null;
      }
      _handlePluginEventIsReadyForSubMesh(eventData) {
        let isReady = true;
        for (const plugin of this._activePlugins) {
          isReady = isReady && plugin.isReadyForSubMesh(eventData.defines, this._scene, this._engine, eventData.subMesh);
        }
        eventData.isReadyForSubMesh = isReady;
      }
      _handlePluginEventPrepareDefinesBeforeAttributes(eventData) {
        for (const plugin of this._activePlugins) {
          plugin.prepareDefinesBeforeAttributes(eventData.defines, this._scene, eventData.mesh);
        }
      }
      _handlePluginEventPrepareDefines(eventData) {
        for (const plugin of this._activePlugins) {
          plugin.prepareDefines(eventData.defines, this._scene, eventData.mesh);
        }
      }
      _handlePluginEventHardBindForSubMesh(eventData) {
        for (const plugin of this._activePluginsForExtraEvents) {
          plugin.hardBindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, eventData.subMesh);
        }
      }
      _handlePluginEventBindForSubMesh(eventData) {
        for (const plugin of this._activePlugins) {
          plugin.bindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, eventData.subMesh);
        }
      }
      _handlePluginEventHasRenderTargetTextures(eventData) {
        let hasRenderTargetTextures = false;
        for (const plugin of this._activePluginsForExtraEvents) {
          hasRenderTargetTextures = plugin.hasRenderTargetTextures();
          if (hasRenderTargetTextures) {
            break;
          }
        }
        eventData.hasRenderTargetTextures = hasRenderTargetTextures;
      }
      _handlePluginEventFillRenderTargetTextures(eventData) {
        for (const plugin of this._activePluginsForExtraEvents) {
          plugin.fillRenderTargetTextures(eventData.renderTargets);
        }
      }
      _handlePluginEvent(id, info) {
        switch (id) {
          case MaterialPluginEvent.GetActiveTextures: {
            const eventData = info;
            for (const plugin of this._activePlugins) {
              plugin.getActiveTextures(eventData.activeTextures);
            }
            break;
          }
          case MaterialPluginEvent.GetAnimatables: {
            const eventData = info;
            for (const plugin of this._activePlugins) {
              plugin.getAnimatables(eventData.animatables);
            }
            break;
          }
          case MaterialPluginEvent.HasTexture: {
            const eventData = info;
            let hasTexture = false;
            for (const plugin of this._activePlugins) {
              hasTexture = plugin.hasTexture(eventData.texture);
              if (hasTexture) {
                break;
              }
            }
            eventData.hasTexture = hasTexture;
            break;
          }
          case MaterialPluginEvent.Disposed: {
            const eventData = info;
            for (const plugin of this._plugins) {
              plugin.dispose(eventData.forceDisposeTextures);
            }
            break;
          }
          case MaterialPluginEvent.GetDefineNames: {
            const eventData = info;
            eventData.defineNames = this._defineNamesFromPlugins;
            break;
          }
          case MaterialPluginEvent.PrepareEffect: {
            const eventData = info;
            for (const plugin of this._activePlugins) {
              eventData.fallbackRank = plugin.addFallbacks(eventData.defines, eventData.fallbacks, eventData.fallbackRank);
              plugin.getAttributes(eventData.attributes, this._scene, eventData.mesh);
            }
            if (this._uniformList.length > 0) {
              eventData.uniforms.push(...this._uniformList);
            }
            if (this._samplerList.length > 0) {
              eventData.samplers.push(...this._samplerList);
            }
            if (this._uboList.length > 0) {
              eventData.uniformBuffersNames.push(...this._uboList);
            }
            eventData.customCode = this._injectCustomCode(eventData, eventData.customCode);
            break;
          }
          case MaterialPluginEvent.PrepareUniformBuffer: {
            const eventData = info;
            this._uboDeclaration = "";
            this._vertexDeclaration = "";
            this._fragmentDeclaration = "";
            this._uniformList = [];
            this._samplerList = [];
            this._uboList = [];
            for (const plugin of this._plugins) {
              const uniforms = plugin.getUniforms();
              if (uniforms) {
                if (uniforms.ubo) {
                  for (const uniform of uniforms.ubo) {
                    if (uniform.size && uniform.type) {
                      const arraySize = uniform.arraySize ?? 0;
                      eventData.ubo.addUniform(uniform.name, uniform.size, arraySize);
                      this._uboDeclaration += `${uniform.type} ${uniform.name}${arraySize > 0 ? `[${arraySize}]` : ""};
`;
                    }
                    this._uniformList.push(uniform.name);
                  }
                }
                if (uniforms.vertex) {
                  this._vertexDeclaration += uniforms.vertex + "\n";
                }
                if (uniforms.fragment) {
                  this._fragmentDeclaration += uniforms.fragment + "\n";
                }
              }
              plugin.getSamplers(this._samplerList);
              plugin.getUniformBuffersNames(this._uboList);
            }
            break;
          }
        }
      }
      _collectPointNames(shaderType, customCode) {
        if (!customCode) {
          return;
        }
        for (const pointName in customCode) {
          if (!this._codeInjectionPoints[shaderType]) {
            this._codeInjectionPoints[shaderType] = {};
          }
          this._codeInjectionPoints[shaderType][pointName] = true;
        }
      }
      _injectCustomCode(eventData, existingCallback) {
        return (shaderType, code) => {
          var _a, _b;
          if (existingCallback) {
            code = existingCallback(shaderType, code);
          }
          if (this._uboDeclaration) {
            code = code.replace("#define ADDITIONAL_UBO_DECLARATION", this._uboDeclaration);
          }
          if (this._vertexDeclaration) {
            code = code.replace("#define ADDITIONAL_VERTEX_DECLARATION", this._vertexDeclaration);
          }
          if (this._fragmentDeclaration) {
            code = code.replace("#define ADDITIONAL_FRAGMENT_DECLARATION", this._fragmentDeclaration);
          }
          const points = (_a = this._codeInjectionPoints) == null ? void 0 : _a[shaderType];
          if (!points) {
            return code;
          }
          let processorOptions = null;
          for (let pointName in points) {
            let injectedCode = "";
            for (const plugin of this._activePlugins) {
              let customCode = (_b = plugin.getCustomCode(shaderType)) == null ? void 0 : _b[pointName];
              if (!customCode) {
                continue;
              }
              if (plugin.resolveIncludes) {
                if (processorOptions === null) {
                  const shaderLanguage = ShaderLanguage.GLSL;
                  processorOptions = {
                    defines: [],
                    indexParameters: eventData.indexParameters,
                    isFragment: false,
                    shouldUseHighPrecisionShader: this._engine._shouldUseHighPrecisionShader,
                    processor: void 0,
                    supportsUniformBuffers: this._engine.supportsUniformBuffers,
                    shadersRepository: ShaderStore.GetShadersRepository(shaderLanguage),
                    includesShadersStore: ShaderStore.GetIncludesShadersStore(shaderLanguage),
                    version: void 0,
                    platformName: this._engine.shaderPlatformName,
                    processingContext: void 0,
                    isNDCHalfZRange: this._engine.isNDCHalfZRange,
                    useReverseDepthBuffer: this._engine.useReverseDepthBuffer,
                    processCodeAfterIncludes: void 0
                    // not used by _ProcessIncludes
                  };
                }
                processorOptions.isFragment = shaderType === "fragment";
                ShaderProcessor._ProcessIncludes(customCode, processorOptions, (code2) => customCode = code2);
              }
              injectedCode += customCode + "\n";
            }
            if (injectedCode.length > 0) {
              if (pointName.charAt(0) === "!") {
                pointName = pointName.substring(1);
                let regexFlags = "g";
                if (pointName.charAt(0) === "!") {
                  regexFlags = "";
                  pointName = pointName.substring(1);
                } else {
                  const matchOption = rxOption.exec(pointName);
                  if (matchOption && matchOption.length >= 2) {
                    regexFlags = matchOption[1];
                    pointName = pointName.substring(regexFlags.length + 1);
                  }
                }
                if (regexFlags.indexOf("g") < 0) {
                  regexFlags += "g";
                }
                const sourceCode = code;
                const rx = new RegExp(pointName, regexFlags);
                let match = rx.exec(sourceCode);
                while (match !== null) {
                  let newCode = injectedCode;
                  for (let i = 0; i < match.length; ++i) {
                    newCode = newCode.replace("$" + i, match[i]);
                  }
                  code = code.replace(match[0], newCode);
                  match = rx.exec(sourceCode);
                }
              } else {
                const fullPointName = "#define " + pointName;
                code = code.replace(fullPointName, "\n" + injectedCode + "\n" + fullPointName);
              }
            }
          }
          return code;
        };
      }
    };
    MaterialPluginManager._MaterialPluginClassToMainDefine = {};
    MaterialPluginManager._MaterialPluginCounter = 0;
    (() => {
      EngineStore.OnEnginesDisposedObservable.add(() => {
        UnregisterAllMaterialPlugins();
      });
    })();
    plugins = [];
    inited = false;
    observer = null;
  }
});

// node_modules/@babylonjs/core/Materials/materialPluginBase.js
var MaterialPluginBase;
var init_materialPluginBase = __esm({
  "node_modules/@babylonjs/core/Materials/materialPluginBase.js"() {
    init_tslib_es6();
    init_decorators();
    init_materialPluginManager();
    init_decorators_serialization();
    MaterialPluginBase = class {
      _enable(enable) {
        if (enable) {
          this._pluginManager._activatePlugin(this);
        }
      }
      /**
       * Creates a new material plugin
       * @param material parent material of the plugin
       * @param name name of the plugin
       * @param priority priority of the plugin
       * @param defines list of defines used by the plugin. The value of the property is the default value for this property
       * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
       * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
       * @param resolveIncludes Indicates that any #include directive in the plugin code must be replaced by the corresponding code (default: false)
       */
      constructor(material, name66, priority, defines, addToPluginList = true, enable = false, resolveIncludes = false) {
        this.priority = 500;
        this.resolveIncludes = false;
        this.registerForExtraEvents = false;
        this._material = material;
        this.name = name66;
        this.priority = priority;
        this.resolveIncludes = resolveIncludes;
        if (!material.pluginManager) {
          material.pluginManager = new MaterialPluginManager(material);
          material.onDisposeObservable.add(() => {
            material.pluginManager = void 0;
          });
        }
        this._pluginDefineNames = defines;
        this._pluginManager = material.pluginManager;
        if (addToPluginList) {
          this._pluginManager._addPlugin(this);
        }
        if (enable) {
          this._enable(true);
        }
        this.markAllDefinesAsDirty = material._dirtyCallbacks[63];
      }
      /**
       * Gets the current class name useful for serialization or dynamic coding.
       * @returns The class name.
       */
      getClassName() {
        return "MaterialPluginBase";
      }
      /**
       * Specifies that the submesh is ready to be used.
       * @param defines the list of "defines" to update.
       * @param scene defines the scene the material belongs to.
       * @param engine the engine this scene belongs to.
       * @param subMesh the submesh to check for readiness
       * @returns - boolean indicating that the submesh is ready or not.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isReadyForSubMesh(defines, scene, engine, subMesh) {
        return true;
      }
      /**
       * Binds the material data (this function is called even if mustRebind() returns false)
       * @param uniformBuffer defines the Uniform buffer to fill in.
       * @param scene defines the scene the material belongs to.
       * @param engine defines the engine the material belongs to.
       * @param subMesh the submesh to bind data for
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hardBindForSubMesh(uniformBuffer, scene, engine, subMesh) {
      }
      /**
       * Binds the material data.
       * @param uniformBuffer defines the Uniform buffer to fill in.
       * @param scene defines the scene the material belongs to.
       * @param engine the engine this scene belongs to.
       * @param subMesh the submesh to bind data for
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      bindForSubMesh(uniformBuffer, scene, engine, subMesh) {
      }
      /**
       * Disposes the resources of the material.
       * @param forceDisposeTextures - Forces the disposal of all textures.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dispose(forceDisposeTextures) {
      }
      /**
       * Returns a list of custom shader code fragments to customize the shader.
       * @param shaderType "vertex" or "fragment"
       * @returns null if no code to be added, or a list of pointName =\> code.
       * Note that `pointName` can also be a regular expression if it starts with a `!`.
       * In that case, the string found by the regular expression (if any) will be
       * replaced by the code provided.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getCustomCode(shaderType) {
        return null;
      }
      /**
       * Collects all defines.
       * @param defines The object to append to.
       */
      collectDefines(defines) {
        if (!this._pluginDefineNames) {
          return;
        }
        for (const key of Object.keys(this._pluginDefineNames)) {
          if (key[0] === "_") {
            continue;
          }
          const type = typeof this._pluginDefineNames[key];
          defines[key] = {
            type: type === "number" ? "number" : type === "string" ? "string" : type === "boolean" ? "boolean" : "object",
            default: this._pluginDefineNames[key]
          };
        }
      }
      /**
       * Sets the defines for the next rendering. Called before PrepareDefinesForAttributes is called.
       * @param defines the list of "defines" to update.
       * @param scene defines the scene to the material belongs to.
       * @param mesh the mesh being rendered
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      prepareDefinesBeforeAttributes(defines, scene, mesh) {
      }
      /**
       * Sets the defines for the next rendering
       * @param defines the list of "defines" to update.
       * @param scene defines the scene to the material belongs to.
       * @param mesh the mesh being rendered
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      prepareDefines(defines, scene, mesh) {
      }
      /**
       * Checks to see if a texture is used in the material.
       * @param texture - Base texture to use.
       * @returns - Boolean specifying if a texture is used in the material.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hasTexture(texture) {
        return false;
      }
      /**
       * Gets a boolean indicating that current material needs to register RTT
       * @returns true if this uses a render target otherwise false.
       */
      hasRenderTargetTextures() {
        return false;
      }
      /**
       * Fills the list of render target textures.
       * @param renderTargets the list of render targets to update
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fillRenderTargetTextures(renderTargets) {
      }
      /**
       * Returns an array of the actively used textures.
       * @param activeTextures Array of BaseTextures
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getActiveTextures(activeTextures) {
      }
      /**
       * Returns the animatable textures.
       * @param animatables Array of animatable textures.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getAnimatables(animatables) {
      }
      /**
       * Add fallbacks to the effect fallbacks list.
       * @param defines defines the Base texture to use.
       * @param fallbacks defines the current fallback list.
       * @param currentRank defines the current fallback rank.
       * @returns the new fallback rank.
       */
      addFallbacks(defines, fallbacks, currentRank) {
        return currentRank;
      }
      /**
       * Gets the samplers used by the plugin.
       * @param samplers list that the sampler names should be added to.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getSamplers(samplers) {
      }
      /**
       * Gets the attributes used by the plugin.
       * @param attributes list that the attribute names should be added to.
       * @param scene the scene that the material belongs to.
       * @param mesh the mesh being rendered.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getAttributes(attributes, scene, mesh) {
      }
      /**
       * Gets the uniform buffers names added by the plugin.
       * @param ubos list that the ubo names should be added to.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getUniformBuffersNames(ubos) {
      }
      /**
       * Gets the description of the uniforms to add to the ubo (if engine supports ubos) or to inject directly in the vertex/fragment shaders (if engine does not support ubos)
       * @returns the description of the uniforms
       */
      getUniforms() {
        return {};
      }
      /**
       * Makes a duplicate of the current configuration into another one.
       * @param plugin define the config where to copy the info
       */
      copyTo(plugin) {
        SerializationHelper.Clone(() => plugin, this);
      }
      /**
       * Serializes this plugin configuration.
       * @returns - An object with the serialized config.
       */
      serialize() {
        return SerializationHelper.Serialize(this);
      }
      /**
       * Parses a plugin configuration from a serialized object.
       * @param source - Serialized object.
       * @param scene Defines the scene we are parsing for
       * @param rootUrl Defines the rootUrl to load from
       */
      parse(source, scene, rootUrl) {
        SerializationHelper.Parse(() => this, source, scene, rootUrl);
      }
    };
    __decorate([
      serialize()
    ], MaterialPluginBase.prototype, "name", void 0);
    __decorate([
      serialize()
    ], MaterialPluginBase.prototype, "priority", void 0);
    __decorate([
      serialize()
    ], MaterialPluginBase.prototype, "resolveIncludes", void 0);
    __decorate([
      serialize()
    ], MaterialPluginBase.prototype, "registerForExtraEvents", void 0);
  }
});

// node_modules/@babylonjs/core/Materials/material.detailMapConfiguration.js
var MaterialDetailMapDefines, DetailMapConfiguration;
var init_material_detailMapConfiguration = __esm({
  "node_modules/@babylonjs/core/Materials/material.detailMapConfiguration.js"() {
    init_tslib_es6();
    init_material();
    init_decorators();
    init_materialFlags();
    init_materialDefines();
    init_materialPluginBase();
    init_materialHelper_functions();
    MaterialDetailMapDefines = class extends MaterialDefines {
      constructor() {
        super(...arguments);
        this.DETAIL = false;
        this.DETAILDIRECTUV = 0;
        this.DETAIL_NORMALBLENDMETHOD = 0;
      }
    };
    DetailMapConfiguration = class extends MaterialPluginBase {
      /** @internal */
      _markAllSubMeshesAsTexturesDirty() {
        this._enable(this._isEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
      }
      constructor(material, addToPluginList = true) {
        super(material, "DetailMap", 140, new MaterialDetailMapDefines(), addToPluginList);
        this._texture = null;
        this.diffuseBlendLevel = 1;
        this.roughnessBlendLevel = 1;
        this.bumpLevel = 1;
        this._normalBlendMethod = Material.MATERIAL_NORMALBLENDMETHOD_WHITEOUT;
        this._isEnabled = false;
        this.isEnabled = false;
        this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[1];
      }
      isReadyForSubMesh(defines, scene, engine) {
        if (!this._isEnabled) {
          return true;
        }
        if (defines._areTexturesDirty && scene.texturesEnabled) {
          if (engine.getCaps().standardDerivatives && this._texture && MaterialFlags.DetailTextureEnabled) {
            if (!this._texture.isReady()) {
              return false;
            }
          }
        }
        return true;
      }
      prepareDefines(defines, scene) {
        if (this._isEnabled) {
          defines.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod;
          const engine = scene.getEngine();
          if (defines._areTexturesDirty) {
            if (engine.getCaps().standardDerivatives && this._texture && MaterialFlags.DetailTextureEnabled && this._isEnabled) {
              PrepareDefinesForMergedUV(this._texture, defines, "DETAIL");
              defines.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod;
            } else {
              defines.DETAIL = false;
            }
          }
        } else {
          defines.DETAIL = false;
        }
      }
      bindForSubMesh(uniformBuffer, scene) {
        if (!this._isEnabled) {
          return;
        }
        const isFrozen = this._material.isFrozen;
        if (!uniformBuffer.useUbo || !isFrozen || !uniformBuffer.isSync) {
          if (this._texture && MaterialFlags.DetailTextureEnabled) {
            uniformBuffer.updateFloat4("vDetailInfos", this._texture.coordinatesIndex, this.diffuseBlendLevel, this.bumpLevel, this.roughnessBlendLevel);
            BindTextureMatrix(this._texture, uniformBuffer, "detail");
          }
        }
        if (scene.texturesEnabled) {
          if (this._texture && MaterialFlags.DetailTextureEnabled) {
            uniformBuffer.setTexture("detailSampler", this._texture);
          }
        }
      }
      hasTexture(texture) {
        if (this._texture === texture) {
          return true;
        }
        return false;
      }
      getActiveTextures(activeTextures) {
        if (this._texture) {
          activeTextures.push(this._texture);
        }
      }
      getAnimatables(animatables) {
        if (this._texture && this._texture.animations && this._texture.animations.length > 0) {
          animatables.push(this._texture);
        }
      }
      dispose(forceDisposeTextures) {
        var _a;
        if (forceDisposeTextures) {
          (_a = this._texture) == null ? void 0 : _a.dispose();
        }
      }
      getClassName() {
        return "DetailMapConfiguration";
      }
      getSamplers(samplers) {
        samplers.push("detailSampler");
      }
      getUniforms() {
        return {
          ubo: [
            { name: "vDetailInfos", size: 4, type: "vec4" },
            { name: "detailMatrix", size: 16, type: "mat4" }
          ]
        };
      }
    };
    __decorate([
      serializeAsTexture("detailTexture"),
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], DetailMapConfiguration.prototype, "texture", void 0);
    __decorate([
      serialize()
    ], DetailMapConfiguration.prototype, "diffuseBlendLevel", void 0);
    __decorate([
      serialize()
    ], DetailMapConfiguration.prototype, "roughnessBlendLevel", void 0);
    __decorate([
      serialize()
    ], DetailMapConfiguration.prototype, "bumpLevel", void 0);
    __decorate([
      serialize(),
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], DetailMapConfiguration.prototype, "normalBlendMethod", void 0);
    __decorate([
      serialize(),
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], DetailMapConfiguration.prototype, "isEnabled", void 0);
  }
});

// node_modules/@babylonjs/core/Materials/standardMaterial.js
var onCreatedEffectParameters, StandardMaterialDefines, StandardMaterial;
var init_standardMaterial = __esm({
  "node_modules/@babylonjs/core/Materials/standardMaterial.js"() {
    init_tslib_es6();
    init_decorators();
    init_smartArray();
    init_scene();
    init_math_vector();
    init_math_color();
    init_buffer();
    init_prePassConfiguration();
    init_imageProcessingConfiguration();
    init_material();
    init_materialPluginEvent();
    init_materialDefines();
    init_pushMaterial();
    init_texture();
    init_typeStore();
    init_materialFlags();
    init_default_fragment();
    init_default_vertex();
    init_effectFallbacks();
    init_material_detailMapConfiguration();
    init_clipPlaneMaterialHelper();
    init_materialHelper_functions();
    init_decorators_serialization();
    onCreatedEffectParameters = { effect: null, subMesh: null };
    StandardMaterialDefines = class extends MaterialDefines {
      /**
       * Initializes the Standard Material defines.
       * @param externalProperties The external properties
       */
      constructor(externalProperties) {
        super(externalProperties);
        this.MAINUV1 = false;
        this.MAINUV2 = false;
        this.MAINUV3 = false;
        this.MAINUV4 = false;
        this.MAINUV5 = false;
        this.MAINUV6 = false;
        this.DIFFUSE = false;
        this.DIFFUSEDIRECTUV = 0;
        this.BAKED_VERTEX_ANIMATION_TEXTURE = false;
        this.AMBIENT = false;
        this.AMBIENTDIRECTUV = 0;
        this.OPACITY = false;
        this.OPACITYDIRECTUV = 0;
        this.OPACITYRGB = false;
        this.REFLECTION = false;
        this.EMISSIVE = false;
        this.EMISSIVEDIRECTUV = 0;
        this.SPECULAR = false;
        this.SPECULARDIRECTUV = 0;
        this.BUMP = false;
        this.BUMPDIRECTUV = 0;
        this.PARALLAX = false;
        this.PARALLAX_RHS = false;
        this.PARALLAXOCCLUSION = false;
        this.SPECULAROVERALPHA = false;
        this.CLIPPLANE = false;
        this.CLIPPLANE2 = false;
        this.CLIPPLANE3 = false;
        this.CLIPPLANE4 = false;
        this.CLIPPLANE5 = false;
        this.CLIPPLANE6 = false;
        this.ALPHATEST = false;
        this.DEPTHPREPASS = false;
        this.ALPHAFROMDIFFUSE = false;
        this.POINTSIZE = false;
        this.FOG = false;
        this.SPECULARTERM = false;
        this.DIFFUSEFRESNEL = false;
        this.OPACITYFRESNEL = false;
        this.REFLECTIONFRESNEL = false;
        this.REFRACTIONFRESNEL = false;
        this.EMISSIVEFRESNEL = false;
        this.FRESNEL = false;
        this.NORMAL = false;
        this.TANGENT = false;
        this.UV1 = false;
        this.UV2 = false;
        this.UV3 = false;
        this.UV4 = false;
        this.UV5 = false;
        this.UV6 = false;
        this.VERTEXCOLOR = false;
        this.VERTEXALPHA = false;
        this.NUM_BONE_INFLUENCERS = 0;
        this.BonesPerMesh = 0;
        this.BONETEXTURE = false;
        this.BONES_VELOCITY_ENABLED = false;
        this.INSTANCES = false;
        this.THIN_INSTANCES = false;
        this.INSTANCESCOLOR = false;
        this.GLOSSINESS = false;
        this.ROUGHNESS = false;
        this.EMISSIVEASILLUMINATION = false;
        this.LINKEMISSIVEWITHDIFFUSE = false;
        this.REFLECTIONFRESNELFROMSPECULAR = false;
        this.LIGHTMAP = false;
        this.LIGHTMAPDIRECTUV = 0;
        this.OBJECTSPACE_NORMALMAP = false;
        this.USELIGHTMAPASSHADOWMAP = false;
        this.REFLECTIONMAP_3D = false;
        this.REFLECTIONMAP_SPHERICAL = false;
        this.REFLECTIONMAP_PLANAR = false;
        this.REFLECTIONMAP_CUBIC = false;
        this.USE_LOCAL_REFLECTIONMAP_CUBIC = false;
        this.USE_LOCAL_REFRACTIONMAP_CUBIC = false;
        this.REFLECTIONMAP_PROJECTION = false;
        this.REFLECTIONMAP_SKYBOX = false;
        this.REFLECTIONMAP_EXPLICIT = false;
        this.REFLECTIONMAP_EQUIRECTANGULAR = false;
        this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = false;
        this.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = false;
        this.REFLECTIONMAP_OPPOSITEZ = false;
        this.INVERTCUBICMAP = false;
        this.LOGARITHMICDEPTH = false;
        this.REFRACTION = false;
        this.REFRACTIONMAP_3D = false;
        this.REFLECTIONOVERALPHA = false;
        this.TWOSIDEDLIGHTING = false;
        this.SHADOWFLOAT = false;
        this.MORPHTARGETS = false;
        this.MORPHTARGETS_NORMAL = false;
        this.MORPHTARGETS_TANGENT = false;
        this.MORPHTARGETS_UV = false;
        this.NUM_MORPH_INFLUENCERS = 0;
        this.MORPHTARGETS_TEXTURE = false;
        this.NONUNIFORMSCALING = false;
        this.PREMULTIPLYALPHA = false;
        this.ALPHATEST_AFTERALLALPHACOMPUTATIONS = false;
        this.ALPHABLEND = true;
        this.PREPASS = false;
        this.PREPASS_IRRADIANCE = false;
        this.PREPASS_IRRADIANCE_INDEX = -1;
        this.PREPASS_ALBEDO_SQRT = false;
        this.PREPASS_ALBEDO_SQRT_INDEX = -1;
        this.PREPASS_DEPTH = false;
        this.PREPASS_DEPTH_INDEX = -1;
        this.PREPASS_NORMAL = false;
        this.PREPASS_NORMAL_INDEX = -1;
        this.PREPASS_NORMAL_WORLDSPACE = false;
        this.PREPASS_POSITION = false;
        this.PREPASS_POSITION_INDEX = -1;
        this.PREPASS_VELOCITY = false;
        this.PREPASS_VELOCITY_INDEX = -1;
        this.PREPASS_REFLECTIVITY = false;
        this.PREPASS_REFLECTIVITY_INDEX = -1;
        this.SCENE_MRT_COUNT = 0;
        this.RGBDLIGHTMAP = false;
        this.RGBDREFLECTION = false;
        this.RGBDREFRACTION = false;
        this.IMAGEPROCESSING = false;
        this.VIGNETTE = false;
        this.VIGNETTEBLENDMODEMULTIPLY = false;
        this.VIGNETTEBLENDMODEOPAQUE = false;
        this.TONEMAPPING = false;
        this.TONEMAPPING_ACES = false;
        this.CONTRAST = false;
        this.COLORCURVES = false;
        this.COLORGRADING = false;
        this.COLORGRADING3D = false;
        this.SAMPLER3DGREENDEPTH = false;
        this.SAMPLER3DBGRMAP = false;
        this.DITHER = false;
        this.IMAGEPROCESSINGPOSTPROCESS = false;
        this.SKIPFINALCOLORCLAMP = false;
        this.MULTIVIEW = false;
        this.ORDER_INDEPENDENT_TRANSPARENCY = false;
        this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS = false;
        this.CAMERA_ORTHOGRAPHIC = false;
        this.CAMERA_PERSPECTIVE = false;
        this.IS_REFLECTION_LINEAR = false;
        this.IS_REFRACTION_LINEAR = false;
        this.EXPOSURE = false;
        this.DECAL_AFTER_DETAIL = false;
        this.rebuild();
      }
      setReflectionMode(modeToEnable) {
        const modes = [
          "REFLECTIONMAP_CUBIC",
          "REFLECTIONMAP_EXPLICIT",
          "REFLECTIONMAP_PLANAR",
          "REFLECTIONMAP_PROJECTION",
          "REFLECTIONMAP_PROJECTION",
          "REFLECTIONMAP_SKYBOX",
          "REFLECTIONMAP_SPHERICAL",
          "REFLECTIONMAP_EQUIRECTANGULAR",
          "REFLECTIONMAP_EQUIRECTANGULAR_FIXED",
          "REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED"
        ];
        for (const mode of modes) {
          this[mode] = mode === modeToEnable;
        }
      }
    };
    StandardMaterial = class _StandardMaterial extends PushMaterial {
      /**
       * Gets the image processing configuration used either in this material.
       */
      get imageProcessingConfiguration() {
        return this._imageProcessingConfiguration;
      }
      /**
       * Sets the Default image processing configuration used either in the this material.
       *
       * If sets to null, the scene one is in use.
       */
      set imageProcessingConfiguration(value) {
        this._attachImageProcessingConfiguration(value);
        this._markAllSubMeshesAsTexturesDirty();
      }
      /**
       * Attaches a new image processing configuration to the Standard Material.
       * @param configuration
       */
      _attachImageProcessingConfiguration(configuration) {
        if (configuration === this._imageProcessingConfiguration) {
          return;
        }
        if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
          this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
        }
        if (!configuration) {
          this._imageProcessingConfiguration = this.getScene().imageProcessingConfiguration;
        } else {
          this._imageProcessingConfiguration = configuration;
        }
        if (this._imageProcessingConfiguration) {
          this._imageProcessingObserver = this._imageProcessingConfiguration.onUpdateParameters.add(() => {
            this._markAllSubMeshesAsImageProcessingDirty();
          });
        }
      }
      /**
       * Can this material render to prepass
       */
      get isPrePassCapable() {
        return !this.disableDepthWrite;
      }
      /**
       * Gets whether the color curves effect is enabled.
       */
      get cameraColorCurvesEnabled() {
        return this.imageProcessingConfiguration.colorCurvesEnabled;
      }
      /**
       * Sets whether the color curves effect is enabled.
       */
      set cameraColorCurvesEnabled(value) {
        this.imageProcessingConfiguration.colorCurvesEnabled = value;
      }
      /**
       * Gets whether the color grading effect is enabled.
       */
      get cameraColorGradingEnabled() {
        return this.imageProcessingConfiguration.colorGradingEnabled;
      }
      /**
       * Gets whether the color grading effect is enabled.
       */
      set cameraColorGradingEnabled(value) {
        this.imageProcessingConfiguration.colorGradingEnabled = value;
      }
      /**
       * Gets whether tonemapping is enabled or not.
       */
      get cameraToneMappingEnabled() {
        return this._imageProcessingConfiguration.toneMappingEnabled;
      }
      /**
       * Sets whether tonemapping is enabled or not
       */
      set cameraToneMappingEnabled(value) {
        this._imageProcessingConfiguration.toneMappingEnabled = value;
      }
      /**
       * The camera exposure used on this material.
       * This property is here and not in the camera to allow controlling exposure without full screen post process.
       * This corresponds to a photographic exposure.
       */
      get cameraExposure() {
        return this._imageProcessingConfiguration.exposure;
      }
      /**
       * The camera exposure used on this material.
       * This property is here and not in the camera to allow controlling exposure without full screen post process.
       * This corresponds to a photographic exposure.
       */
      set cameraExposure(value) {
        this._imageProcessingConfiguration.exposure = value;
      }
      /**
       * Gets The camera contrast used on this material.
       */
      get cameraContrast() {
        return this._imageProcessingConfiguration.contrast;
      }
      /**
       * Sets The camera contrast used on this material.
       */
      set cameraContrast(value) {
        this._imageProcessingConfiguration.contrast = value;
      }
      /**
       * Gets the Color Grading 2D Lookup Texture.
       */
      get cameraColorGradingTexture() {
        return this._imageProcessingConfiguration.colorGradingTexture;
      }
      /**
       * Sets the Color Grading 2D Lookup Texture.
       */
      set cameraColorGradingTexture(value) {
        this._imageProcessingConfiguration.colorGradingTexture = value;
      }
      /**
       * The color grading curves provide additional color adjustmnent that is applied after any color grading transform (3D LUT).
       * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
       * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
       * corresponding to low luminance, medium luminance, and high luminance areas respectively.
       */
      get cameraColorCurves() {
        return this._imageProcessingConfiguration.colorCurves;
      }
      /**
       * The color grading curves provide additional color adjustment that is applied after any color grading transform (3D LUT).
       * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
       * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
       * corresponding to low luminance, medium luminance, and high luminance areas respectively.
       */
      set cameraColorCurves(value) {
        this._imageProcessingConfiguration.colorCurves = value;
      }
      /**
       * Can this material render to several textures at once
       */
      get canRenderToMRT() {
        return true;
      }
      /**
       * Instantiates a new standard material.
       * This is the default material used in Babylon. It is the best trade off between quality
       * and performances.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction
       * @param name Define the name of the material in the scene
       * @param scene Define the scene the material belong to
       */
      constructor(name66, scene) {
        super(name66, scene);
        this._diffuseTexture = null;
        this._ambientTexture = null;
        this._opacityTexture = null;
        this._reflectionTexture = null;
        this._emissiveTexture = null;
        this._specularTexture = null;
        this._bumpTexture = null;
        this._lightmapTexture = null;
        this._refractionTexture = null;
        this.ambientColor = new Color3(0, 0, 0);
        this.diffuseColor = new Color3(1, 1, 1);
        this.specularColor = new Color3(1, 1, 1);
        this.emissiveColor = new Color3(0, 0, 0);
        this.specularPower = 64;
        this._useAlphaFromDiffuseTexture = false;
        this._useEmissiveAsIllumination = false;
        this._linkEmissiveWithDiffuse = false;
        this._useSpecularOverAlpha = false;
        this._useReflectionOverAlpha = false;
        this._disableLighting = false;
        this._useObjectSpaceNormalMap = false;
        this._useParallax = false;
        this._useParallaxOcclusion = false;
        this.parallaxScaleBias = 0.05;
        this._roughness = 0;
        this.indexOfRefraction = 0.98;
        this.invertRefractionY = true;
        this.alphaCutOff = 0.4;
        this._useLightmapAsShadowmap = false;
        this._useReflectionFresnelFromSpecular = false;
        this._useGlossinessFromSpecularMapAlpha = false;
        this._maxSimultaneousLights = 4;
        this._invertNormalMapX = false;
        this._invertNormalMapY = false;
        this._twoSidedLighting = false;
        this._applyDecalMapAfterDetailMap = false;
        this._renderTargets = new SmartArray(16);
        this._worldViewProjectionMatrix = Matrix.Zero();
        this._globalAmbientColor = new Color3(0, 0, 0);
        this._cacheHasRenderTargetTextures = false;
        this.detailMap = new DetailMapConfiguration(this);
        this._attachImageProcessingConfiguration(null);
        this.prePassConfiguration = new PrePassConfiguration();
        this.getRenderTargetTextures = () => {
          this._renderTargets.reset();
          if (_StandardMaterial.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget) {
            this._renderTargets.push(this._reflectionTexture);
          }
          if (_StandardMaterial.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget) {
            this._renderTargets.push(this._refractionTexture);
          }
          this._eventInfo.renderTargets = this._renderTargets;
          this._callbackPluginEventFillRenderTargetTextures(this._eventInfo);
          return this._renderTargets;
        };
      }
      /**
       * Gets a boolean indicating that current material needs to register RTT
       */
      get hasRenderTargetTextures() {
        if (_StandardMaterial.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget) {
          return true;
        }
        if (_StandardMaterial.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget) {
          return true;
        }
        return this._cacheHasRenderTargetTextures;
      }
      /**
       * Gets the current class name of the material e.g. "StandardMaterial"
       * Mainly use in serialization.
       * @returns the class name
       */
      getClassName() {
        return "StandardMaterial";
      }
      /**
       * Specifies if the material will require alpha blending
       * @returns a boolean specifying if alpha blending is needed
       */
      needAlphaBlending() {
        if (this._disableAlphaBlending) {
          return false;
        }
        return this.alpha < 1 || this._opacityTexture != null || this._shouldUseAlphaFromDiffuseTexture() || this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled;
      }
      /**
       * Specifies if this material should be rendered in alpha test mode
       * @returns a boolean specifying if an alpha test is needed.
       */
      needAlphaTesting() {
        if (this._forceAlphaTest) {
          return true;
        }
        return this._hasAlphaChannel() && (this._transparencyMode == null || this._transparencyMode === Material.MATERIAL_ALPHATEST);
      }
      /**
       * @returns whether or not the alpha value of the diffuse texture should be used for alpha blending.
       */
      _shouldUseAlphaFromDiffuseTexture() {
        return this._diffuseTexture != null && this._diffuseTexture.hasAlpha && this._useAlphaFromDiffuseTexture && this._transparencyMode !== Material.MATERIAL_OPAQUE;
      }
      /**
       * @returns whether or not there is a usable alpha channel for transparency.
       */
      _hasAlphaChannel() {
        return this._diffuseTexture != null && this._diffuseTexture.hasAlpha || this._opacityTexture != null;
      }
      /**
       * Get the texture used for alpha test purpose.
       * @returns the diffuse texture in case of the standard material.
       */
      getAlphaTestTexture() {
        return this._diffuseTexture;
      }
      /**
       * Get if the submesh is ready to be used and all its information available.
       * Child classes can use it to update shaders
       * @param mesh defines the mesh to check
       * @param subMesh defines which submesh to check
       * @param useInstances specifies that instances should be used
       * @returns a boolean indicating that the submesh is ready or not
       */
      isReadyForSubMesh(mesh, subMesh, useInstances = false) {
        if (!this._uniformBufferLayoutBuilt) {
          this.buildUniformLayout();
        }
        const drawWrapper = subMesh._drawWrapper;
        if (drawWrapper.effect && this.isFrozen) {
          if (drawWrapper._wasPreviouslyReady && drawWrapper._wasPreviouslyUsingInstances === useInstances) {
            return true;
          }
        }
        if (!subMesh.materialDefines) {
          this._callbackPluginEventGeneric(MaterialPluginEvent.GetDefineNames, this._eventInfo);
          subMesh.materialDefines = new StandardMaterialDefines(this._eventInfo.defineNames);
        }
        const scene = this.getScene();
        const defines = subMesh.materialDefines;
        if (this._isReadyForSubMesh(subMesh)) {
          return true;
        }
        const engine = scene.getEngine();
        defines._needNormals = PrepareDefinesForLights(scene, mesh, defines, true, this._maxSimultaneousLights, this._disableLighting);
        PrepareDefinesForMultiview(scene, defines);
        const oit = this.needAlphaBlendingForMesh(mesh) && this.getScene().useOrderIndependentTransparency;
        PrepareDefinesForPrePass(scene, defines, this.canRenderToMRT && !oit);
        PrepareDefinesForOIT(scene, defines, oit);
        if (defines._areTexturesDirty) {
          this._eventInfo.hasRenderTargetTextures = false;
          this._callbackPluginEventHasRenderTargetTextures(this._eventInfo);
          this._cacheHasRenderTargetTextures = this._eventInfo.hasRenderTargetTextures;
          defines._needUVs = false;
          for (let i = 1; i <= 6; ++i) {
            defines["MAINUV" + i] = false;
          }
          if (scene.texturesEnabled) {
            defines.DIFFUSEDIRECTUV = 0;
            defines.BUMPDIRECTUV = 0;
            defines.AMBIENTDIRECTUV = 0;
            defines.OPACITYDIRECTUV = 0;
            defines.EMISSIVEDIRECTUV = 0;
            defines.SPECULARDIRECTUV = 0;
            defines.LIGHTMAPDIRECTUV = 0;
            if (this._diffuseTexture && _StandardMaterial.DiffuseTextureEnabled) {
              if (!this._diffuseTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                PrepareDefinesForMergedUV(this._diffuseTexture, defines, "DIFFUSE");
              }
            } else {
              defines.DIFFUSE = false;
            }
            if (this._ambientTexture && _StandardMaterial.AmbientTextureEnabled) {
              if (!this._ambientTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                PrepareDefinesForMergedUV(this._ambientTexture, defines, "AMBIENT");
              }
            } else {
              defines.AMBIENT = false;
            }
            if (this._opacityTexture && _StandardMaterial.OpacityTextureEnabled) {
              if (!this._opacityTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                PrepareDefinesForMergedUV(this._opacityTexture, defines, "OPACITY");
                defines.OPACITYRGB = this._opacityTexture.getAlphaFromRGB;
              }
            } else {
              defines.OPACITY = false;
            }
            if (this._reflectionTexture && _StandardMaterial.ReflectionTextureEnabled) {
              if (!this._reflectionTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                defines._needNormals = true;
                defines.REFLECTION = true;
                defines.ROUGHNESS = this._roughness > 0;
                defines.REFLECTIONOVERALPHA = this._useReflectionOverAlpha;
                defines.INVERTCUBICMAP = this._reflectionTexture.coordinatesMode === Texture.INVCUBIC_MODE;
                defines.REFLECTIONMAP_3D = this._reflectionTexture.isCube;
                defines.REFLECTIONMAP_OPPOSITEZ = defines.REFLECTIONMAP_3D && this.getScene().useRightHandedSystem ? !this._reflectionTexture.invertZ : this._reflectionTexture.invertZ;
                defines.RGBDREFLECTION = this._reflectionTexture.isRGBD;
                switch (this._reflectionTexture.coordinatesMode) {
                  case Texture.EXPLICIT_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_EXPLICIT");
                    break;
                  case Texture.PLANAR_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_PLANAR");
                    break;
                  case Texture.PROJECTION_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_PROJECTION");
                    break;
                  case Texture.SKYBOX_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_SKYBOX");
                    break;
                  case Texture.SPHERICAL_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_SPHERICAL");
                    break;
                  case Texture.EQUIRECTANGULAR_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR");
                    break;
                  case Texture.FIXED_EQUIRECTANGULAR_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR_FIXED");
                    break;
                  case Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:
                    defines.setReflectionMode("REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED");
                    break;
                  case Texture.CUBIC_MODE:
                  case Texture.INVCUBIC_MODE:
                  default:
                    defines.setReflectionMode("REFLECTIONMAP_CUBIC");
                    break;
                }
                defines.USE_LOCAL_REFLECTIONMAP_CUBIC = this._reflectionTexture.boundingBoxSize ? true : false;
              }
            } else {
              defines.REFLECTION = false;
              defines.REFLECTIONMAP_OPPOSITEZ = false;
            }
            if (this._emissiveTexture && _StandardMaterial.EmissiveTextureEnabled) {
              if (!this._emissiveTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                PrepareDefinesForMergedUV(this._emissiveTexture, defines, "EMISSIVE");
              }
            } else {
              defines.EMISSIVE = false;
            }
            if (this._lightmapTexture && _StandardMaterial.LightmapTextureEnabled) {
              if (!this._lightmapTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                PrepareDefinesForMergedUV(this._lightmapTexture, defines, "LIGHTMAP");
                defines.USELIGHTMAPASSHADOWMAP = this._useLightmapAsShadowmap;
                defines.RGBDLIGHTMAP = this._lightmapTexture.isRGBD;
              }
            } else {
              defines.LIGHTMAP = false;
            }
            if (this._specularTexture && _StandardMaterial.SpecularTextureEnabled) {
              if (!this._specularTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                PrepareDefinesForMergedUV(this._specularTexture, defines, "SPECULAR");
                defines.GLOSSINESS = this._useGlossinessFromSpecularMapAlpha;
              }
            } else {
              defines.SPECULAR = false;
            }
            if (scene.getEngine().getCaps().standardDerivatives && this._bumpTexture && _StandardMaterial.BumpTextureEnabled) {
              if (!this._bumpTexture.isReady()) {
                return false;
              } else {
                PrepareDefinesForMergedUV(this._bumpTexture, defines, "BUMP");
                defines.PARALLAX = this._useParallax;
                defines.PARALLAX_RHS = scene.useRightHandedSystem;
                defines.PARALLAXOCCLUSION = this._useParallaxOcclusion;
              }
              defines.OBJECTSPACE_NORMALMAP = this._useObjectSpaceNormalMap;
            } else {
              defines.BUMP = false;
              defines.PARALLAX = false;
              defines.PARALLAX_RHS = false;
              defines.PARALLAXOCCLUSION = false;
            }
            if (this._refractionTexture && _StandardMaterial.RefractionTextureEnabled) {
              if (!this._refractionTexture.isReadyOrNotBlocking()) {
                return false;
              } else {
                defines._needUVs = true;
                defines.REFRACTION = true;
                defines.REFRACTIONMAP_3D = this._refractionTexture.isCube;
                defines.RGBDREFRACTION = this._refractionTexture.isRGBD;
                defines.USE_LOCAL_REFRACTIONMAP_CUBIC = this._refractionTexture.boundingBoxSize ? true : false;
              }
            } else {
              defines.REFRACTION = false;
            }
            defines.TWOSIDEDLIGHTING = !this._backFaceCulling && this._twoSidedLighting;
          } else {
            defines.DIFFUSE = false;
            defines.AMBIENT = false;
            defines.OPACITY = false;
            defines.REFLECTION = false;
            defines.EMISSIVE = false;
            defines.LIGHTMAP = false;
            defines.BUMP = false;
            defines.REFRACTION = false;
          }
          defines.ALPHAFROMDIFFUSE = this._shouldUseAlphaFromDiffuseTexture();
          defines.EMISSIVEASILLUMINATION = this._useEmissiveAsIllumination;
          defines.LINKEMISSIVEWITHDIFFUSE = this._linkEmissiveWithDiffuse;
          defines.SPECULAROVERALPHA = this._useSpecularOverAlpha;
          defines.PREMULTIPLYALPHA = this.alphaMode === 7 || this.alphaMode === 8;
          defines.ALPHATEST_AFTERALLALPHACOMPUTATIONS = this.transparencyMode !== null;
          defines.ALPHABLEND = this.transparencyMode === null || this.needAlphaBlendingForMesh(mesh);
        }
        this._eventInfo.isReadyForSubMesh = true;
        this._eventInfo.defines = defines;
        this._eventInfo.subMesh = subMesh;
        this._callbackPluginEventIsReadyForSubMesh(this._eventInfo);
        if (!this._eventInfo.isReadyForSubMesh) {
          return false;
        }
        if (defines._areImageProcessingDirty && this._imageProcessingConfiguration) {
          if (!this._imageProcessingConfiguration.isReady()) {
            return false;
          }
          this._imageProcessingConfiguration.prepareDefines(defines);
          defines.IS_REFLECTION_LINEAR = this.reflectionTexture != null && !this.reflectionTexture.gammaSpace;
          defines.IS_REFRACTION_LINEAR = this.refractionTexture != null && !this.refractionTexture.gammaSpace;
        }
        if (defines._areFresnelDirty) {
          if (_StandardMaterial.FresnelEnabled) {
            if (this._diffuseFresnelParameters || this._opacityFresnelParameters || this._emissiveFresnelParameters || this._refractionFresnelParameters || this._reflectionFresnelParameters) {
              defines.DIFFUSEFRESNEL = this._diffuseFresnelParameters && this._diffuseFresnelParameters.isEnabled;
              defines.OPACITYFRESNEL = this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled;
              defines.REFLECTIONFRESNEL = this._reflectionFresnelParameters && this._reflectionFresnelParameters.isEnabled;
              defines.REFLECTIONFRESNELFROMSPECULAR = this._useReflectionFresnelFromSpecular;
              defines.REFRACTIONFRESNEL = this._refractionFresnelParameters && this._refractionFresnelParameters.isEnabled;
              defines.EMISSIVEFRESNEL = this._emissiveFresnelParameters && this._emissiveFresnelParameters.isEnabled;
              defines._needNormals = true;
              defines.FRESNEL = true;
            }
          } else {
            defines.FRESNEL = false;
          }
        }
        PrepareDefinesForMisc(mesh, scene, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh) || this._forceAlphaTest, defines, this._applyDecalMapAfterDetailMap);
        PrepareDefinesForFrameBoundValues(scene, engine, this, defines, useInstances, null, subMesh.getRenderingMesh().hasThinInstances);
        this._eventInfo.defines = defines;
        this._eventInfo.mesh = mesh;
        this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo);
        PrepareDefinesForAttributes(mesh, defines, true, true, true);
        this._callbackPluginEventPrepareDefines(this._eventInfo);
        let forceWasNotReadyPreviously = false;
        if (defines.isDirty) {
          const lightDisposed = defines._areLightsDisposed;
          defines.markAsProcessed();
          const fallbacks = new EffectFallbacks();
          if (defines.REFLECTION) {
            fallbacks.addFallback(0, "REFLECTION");
          }
          if (defines.SPECULAR) {
            fallbacks.addFallback(0, "SPECULAR");
          }
          if (defines.BUMP) {
            fallbacks.addFallback(0, "BUMP");
          }
          if (defines.PARALLAX) {
            fallbacks.addFallback(1, "PARALLAX");
          }
          if (defines.PARALLAX_RHS) {
            fallbacks.addFallback(1, "PARALLAX_RHS");
          }
          if (defines.PARALLAXOCCLUSION) {
            fallbacks.addFallback(0, "PARALLAXOCCLUSION");
          }
          if (defines.SPECULAROVERALPHA) {
            fallbacks.addFallback(0, "SPECULAROVERALPHA");
          }
          if (defines.FOG) {
            fallbacks.addFallback(1, "FOG");
          }
          if (defines.POINTSIZE) {
            fallbacks.addFallback(0, "POINTSIZE");
          }
          if (defines.LOGARITHMICDEPTH) {
            fallbacks.addFallback(0, "LOGARITHMICDEPTH");
          }
          HandleFallbacksForShadows(defines, fallbacks, this._maxSimultaneousLights);
          if (defines.SPECULARTERM) {
            fallbacks.addFallback(0, "SPECULARTERM");
          }
          if (defines.DIFFUSEFRESNEL) {
            fallbacks.addFallback(1, "DIFFUSEFRESNEL");
          }
          if (defines.OPACITYFRESNEL) {
            fallbacks.addFallback(2, "OPACITYFRESNEL");
          }
          if (defines.REFLECTIONFRESNEL) {
            fallbacks.addFallback(3, "REFLECTIONFRESNEL");
          }
          if (defines.EMISSIVEFRESNEL) {
            fallbacks.addFallback(4, "EMISSIVEFRESNEL");
          }
          if (defines.FRESNEL) {
            fallbacks.addFallback(4, "FRESNEL");
          }
          if (defines.MULTIVIEW) {
            fallbacks.addFallback(0, "MULTIVIEW");
          }
          const attribs = [VertexBuffer.PositionKind];
          if (defines.NORMAL) {
            attribs.push(VertexBuffer.NormalKind);
          }
          if (defines.TANGENT) {
            attribs.push(VertexBuffer.TangentKind);
          }
          for (let i = 1; i <= 6; ++i) {
            if (defines["UV" + i]) {
              attribs.push(`uv${i === 1 ? "" : i}`);
            }
          }
          if (defines.VERTEXCOLOR) {
            attribs.push(VertexBuffer.ColorKind);
          }
          PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
          PrepareAttributesForInstances(attribs, defines);
          PrepareAttributesForMorphTargets(attribs, mesh, defines);
          PrepareAttributesForBakedVertexAnimation(attribs, mesh, defines);
          let shaderName = "default";
          const uniforms = [
            "world",
            "view",
            "viewProjection",
            "vEyePosition",
            "vLightsType",
            "vAmbientColor",
            "vDiffuseColor",
            "vSpecularColor",
            "vEmissiveColor",
            "visibility",
            "vFogInfos",
            "vFogColor",
            "pointSize",
            "vDiffuseInfos",
            "vAmbientInfos",
            "vOpacityInfos",
            "vReflectionInfos",
            "vEmissiveInfos",
            "vSpecularInfos",
            "vBumpInfos",
            "vLightmapInfos",
            "vRefractionInfos",
            "mBones",
            "diffuseMatrix",
            "ambientMatrix",
            "opacityMatrix",
            "reflectionMatrix",
            "emissiveMatrix",
            "specularMatrix",
            "bumpMatrix",
            "normalMatrix",
            "lightmapMatrix",
            "refractionMatrix",
            "diffuseLeftColor",
            "diffuseRightColor",
            "opacityParts",
            "reflectionLeftColor",
            "reflectionRightColor",
            "emissiveLeftColor",
            "emissiveRightColor",
            "refractionLeftColor",
            "refractionRightColor",
            "vReflectionPosition",
            "vReflectionSize",
            "vRefractionPosition",
            "vRefractionSize",
            "logarithmicDepthConstant",
            "vTangentSpaceParams",
            "alphaCutOff",
            "boneTextureWidth",
            "morphTargetTextureInfo",
            "morphTargetTextureIndices"
          ];
          const samplers = [
            "diffuseSampler",
            "ambientSampler",
            "opacitySampler",
            "reflectionCubeSampler",
            "reflection2DSampler",
            "emissiveSampler",
            "specularSampler",
            "bumpSampler",
            "lightmapSampler",
            "refractionCubeSampler",
            "refraction2DSampler",
            "boneSampler",
            "morphTargets",
            "oitDepthSampler",
            "oitFrontColorSampler"
          ];
          const uniformBuffers = ["Material", "Scene", "Mesh"];
          const indexParameters = { maxSimultaneousLights: this._maxSimultaneousLights, maxSimultaneousMorphTargets: defines.NUM_MORPH_INFLUENCERS };
          this._eventInfo.fallbacks = fallbacks;
          this._eventInfo.fallbackRank = 0;
          this._eventInfo.defines = defines;
          this._eventInfo.uniforms = uniforms;
          this._eventInfo.attributes = attribs;
          this._eventInfo.samplers = samplers;
          this._eventInfo.uniformBuffersNames = uniformBuffers;
          this._eventInfo.customCode = void 0;
          this._eventInfo.mesh = mesh;
          this._eventInfo.indexParameters = indexParameters;
          this._callbackPluginEventGeneric(MaterialPluginEvent.PrepareEffect, this._eventInfo);
          PrePassConfiguration.AddUniforms(uniforms);
          PrePassConfiguration.AddSamplers(samplers);
          if (ImageProcessingConfiguration) {
            ImageProcessingConfiguration.PrepareUniforms(uniforms, defines);
            ImageProcessingConfiguration.PrepareSamplers(samplers, defines);
          }
          PrepareUniformsAndSamplersList({
            uniformsNames: uniforms,
            uniformBuffersNames: uniformBuffers,
            samplers,
            defines,
            maxSimultaneousLights: this._maxSimultaneousLights
          });
          addClipPlaneUniforms(uniforms);
          const csnrOptions = {};
          if (this.customShaderNameResolve) {
            shaderName = this.customShaderNameResolve(shaderName, uniforms, uniformBuffers, samplers, defines, attribs, csnrOptions);
          }
          const join = defines.toString();
          const previousEffect = subMesh.effect;
          let effect = scene.getEngine().createEffect(shaderName, {
            attributes: attribs,
            uniformsNames: uniforms,
            uniformBuffersNames: uniformBuffers,
            samplers,
            defines: join,
            fallbacks,
            onCompiled: this.onCompiled,
            onError: this.onError,
            indexParameters,
            processFinalCode: csnrOptions.processFinalCode,
            processCodeAfterIncludes: this._eventInfo.customCode,
            multiTarget: defines.PREPASS
          }, engine);
          this._eventInfo.customCode = void 0;
          if (effect) {
            if (this._onEffectCreatedObservable) {
              onCreatedEffectParameters.effect = effect;
              onCreatedEffectParameters.subMesh = subMesh;
              this._onEffectCreatedObservable.notifyObservers(onCreatedEffectParameters);
            }
            if (this.allowShaderHotSwapping && previousEffect && !effect.isReady()) {
              effect = previousEffect;
              defines.markAsUnprocessed();
              forceWasNotReadyPreviously = this.isFrozen;
              if (lightDisposed) {
                defines._areLightsDisposed = true;
                return false;
              }
            } else {
              scene.resetCachedMaterial();
              subMesh.setEffect(effect, defines, this._materialContext);
            }
          }
        }
        if (!subMesh.effect || !subMesh.effect.isReady()) {
          return false;
        }
        defines._renderId = scene.getRenderId();
        drawWrapper._wasPreviouslyReady = forceWasNotReadyPreviously ? false : true;
        drawWrapper._wasPreviouslyUsingInstances = useInstances;
        this._checkScenePerformancePriority();
        return true;
      }
      /**
       * Builds the material UBO layouts.
       * Used internally during the effect preparation.
       */
      buildUniformLayout() {
        const ubo = this._uniformBuffer;
        ubo.addUniform("diffuseLeftColor", 4);
        ubo.addUniform("diffuseRightColor", 4);
        ubo.addUniform("opacityParts", 4);
        ubo.addUniform("reflectionLeftColor", 4);
        ubo.addUniform("reflectionRightColor", 4);
        ubo.addUniform("refractionLeftColor", 4);
        ubo.addUniform("refractionRightColor", 4);
        ubo.addUniform("emissiveLeftColor", 4);
        ubo.addUniform("emissiveRightColor", 4);
        ubo.addUniform("vDiffuseInfos", 2);
        ubo.addUniform("vAmbientInfos", 2);
        ubo.addUniform("vOpacityInfos", 2);
        ubo.addUniform("vReflectionInfos", 2);
        ubo.addUniform("vReflectionPosition", 3);
        ubo.addUniform("vReflectionSize", 3);
        ubo.addUniform("vEmissiveInfos", 2);
        ubo.addUniform("vLightmapInfos", 2);
        ubo.addUniform("vSpecularInfos", 2);
        ubo.addUniform("vBumpInfos", 3);
        ubo.addUniform("diffuseMatrix", 16);
        ubo.addUniform("ambientMatrix", 16);
        ubo.addUniform("opacityMatrix", 16);
        ubo.addUniform("reflectionMatrix", 16);
        ubo.addUniform("emissiveMatrix", 16);
        ubo.addUniform("lightmapMatrix", 16);
        ubo.addUniform("specularMatrix", 16);
        ubo.addUniform("bumpMatrix", 16);
        ubo.addUniform("vTangentSpaceParams", 2);
        ubo.addUniform("pointSize", 1);
        ubo.addUniform("alphaCutOff", 1);
        ubo.addUniform("refractionMatrix", 16);
        ubo.addUniform("vRefractionInfos", 4);
        ubo.addUniform("vRefractionPosition", 3);
        ubo.addUniform("vRefractionSize", 3);
        ubo.addUniform("vSpecularColor", 4);
        ubo.addUniform("vEmissiveColor", 3);
        ubo.addUniform("vDiffuseColor", 4);
        ubo.addUniform("vAmbientColor", 3);
        super.buildUniformLayout();
      }
      /**
       * Binds the submesh to this material by preparing the effect and shader to draw
       * @param world defines the world transformation matrix
       * @param mesh defines the mesh containing the submesh
       * @param subMesh defines the submesh to bind the material to
       */
      bindForSubMesh(world, mesh, subMesh) {
        var _a;
        const scene = this.getScene();
        const defines = subMesh.materialDefines;
        if (!defines) {
          return;
        }
        const effect = subMesh.effect;
        if (!effect) {
          return;
        }
        this._activeEffect = effect;
        mesh.getMeshUniformBuffer().bindToEffect(effect, "Mesh");
        mesh.transferToEffect(world);
        this._uniformBuffer.bindToEffect(effect, "Material");
        this.prePassConfiguration.bindForSubMesh(this._activeEffect, scene, mesh, world, this.isFrozen);
        this._eventInfo.subMesh = subMesh;
        this._callbackPluginEventHardBindForSubMesh(this._eventInfo);
        if (defines.OBJECTSPACE_NORMALMAP) {
          world.toNormalMatrix(this._normalMatrix);
          this.bindOnlyNormalMatrix(this._normalMatrix);
        }
        const mustRebind = this._mustRebind(scene, effect, subMesh, mesh.visibility);
        BindBonesParameters(mesh, effect);
        const ubo = this._uniformBuffer;
        if (mustRebind) {
          this.bindViewProjection(effect);
          if (!ubo.useUbo || !this.isFrozen || !ubo.isSync || subMesh._drawWrapper._forceRebindOnNextCall) {
            if (_StandardMaterial.FresnelEnabled && defines.FRESNEL) {
              if (this.diffuseFresnelParameters && this.diffuseFresnelParameters.isEnabled) {
                ubo.updateColor4("diffuseLeftColor", this.diffuseFresnelParameters.leftColor, this.diffuseFresnelParameters.power);
                ubo.updateColor4("diffuseRightColor", this.diffuseFresnelParameters.rightColor, this.diffuseFresnelParameters.bias);
              }
              if (this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled) {
                ubo.updateColor4("opacityParts", new Color3(this.opacityFresnelParameters.leftColor.toLuminance(), this.opacityFresnelParameters.rightColor.toLuminance(), this.opacityFresnelParameters.bias), this.opacityFresnelParameters.power);
              }
              if (this.reflectionFresnelParameters && this.reflectionFresnelParameters.isEnabled) {
                ubo.updateColor4("reflectionLeftColor", this.reflectionFresnelParameters.leftColor, this.reflectionFresnelParameters.power);
                ubo.updateColor4("reflectionRightColor", this.reflectionFresnelParameters.rightColor, this.reflectionFresnelParameters.bias);
              }
              if (this.refractionFresnelParameters && this.refractionFresnelParameters.isEnabled) {
                ubo.updateColor4("refractionLeftColor", this.refractionFresnelParameters.leftColor, this.refractionFresnelParameters.power);
                ubo.updateColor4("refractionRightColor", this.refractionFresnelParameters.rightColor, this.refractionFresnelParameters.bias);
              }
              if (this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled) {
                ubo.updateColor4("emissiveLeftColor", this.emissiveFresnelParameters.leftColor, this.emissiveFresnelParameters.power);
                ubo.updateColor4("emissiveRightColor", this.emissiveFresnelParameters.rightColor, this.emissiveFresnelParameters.bias);
              }
            }
            if (scene.texturesEnabled) {
              if (this._diffuseTexture && _StandardMaterial.DiffuseTextureEnabled) {
                ubo.updateFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level);
                BindTextureMatrix(this._diffuseTexture, ubo, "diffuse");
              }
              if (this._ambientTexture && _StandardMaterial.AmbientTextureEnabled) {
                ubo.updateFloat2("vAmbientInfos", this._ambientTexture.coordinatesIndex, this._ambientTexture.level);
                BindTextureMatrix(this._ambientTexture, ubo, "ambient");
              }
              if (this._opacityTexture && _StandardMaterial.OpacityTextureEnabled) {
                ubo.updateFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level);
                BindTextureMatrix(this._opacityTexture, ubo, "opacity");
              }
              if (this._hasAlphaChannel()) {
                ubo.updateFloat("alphaCutOff", this.alphaCutOff);
              }
              if (this._reflectionTexture && _StandardMaterial.ReflectionTextureEnabled) {
                ubo.updateFloat2("vReflectionInfos", this._reflectionTexture.level, this.roughness);
                ubo.updateMatrix("reflectionMatrix", this._reflectionTexture.getReflectionTextureMatrix());
                if (this._reflectionTexture.boundingBoxSize) {
                  const cubeTexture = this._reflectionTexture;
                  ubo.updateVector3("vReflectionPosition", cubeTexture.boundingBoxPosition);
                  ubo.updateVector3("vReflectionSize", cubeTexture.boundingBoxSize);
                }
              }
              if (this._emissiveTexture && _StandardMaterial.EmissiveTextureEnabled) {
                ubo.updateFloat2("vEmissiveInfos", this._emissiveTexture.coordinatesIndex, this._emissiveTexture.level);
                BindTextureMatrix(this._emissiveTexture, ubo, "emissive");
              }
              if (this._lightmapTexture && _StandardMaterial.LightmapTextureEnabled) {
                ubo.updateFloat2("vLightmapInfos", this._lightmapTexture.coordinatesIndex, this._lightmapTexture.level);
                BindTextureMatrix(this._lightmapTexture, ubo, "lightmap");
              }
              if (this._specularTexture && _StandardMaterial.SpecularTextureEnabled) {
                ubo.updateFloat2("vSpecularInfos", this._specularTexture.coordinatesIndex, this._specularTexture.level);
                BindTextureMatrix(this._specularTexture, ubo, "specular");
              }
              if (this._bumpTexture && scene.getEngine().getCaps().standardDerivatives && _StandardMaterial.BumpTextureEnabled) {
                ubo.updateFloat3("vBumpInfos", this._bumpTexture.coordinatesIndex, 1 / this._bumpTexture.level, this.parallaxScaleBias);
                BindTextureMatrix(this._bumpTexture, ubo, "bump");
                if (scene._mirroredCameraPosition) {
                  ubo.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? 1 : -1, this._invertNormalMapY ? 1 : -1);
                } else {
                  ubo.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? -1 : 1, this._invertNormalMapY ? -1 : 1);
                }
              }
              if (this._refractionTexture && _StandardMaterial.RefractionTextureEnabled) {
                let depth = 1;
                if (!this._refractionTexture.isCube) {
                  ubo.updateMatrix("refractionMatrix", this._refractionTexture.getReflectionTextureMatrix());
                  if (this._refractionTexture.depth) {
                    depth = this._refractionTexture.depth;
                  }
                }
                ubo.updateFloat4("vRefractionInfos", this._refractionTexture.level, this.indexOfRefraction, depth, this.invertRefractionY ? -1 : 1);
                if (this._refractionTexture.boundingBoxSize) {
                  const cubeTexture = this._refractionTexture;
                  ubo.updateVector3("vRefractionPosition", cubeTexture.boundingBoxPosition);
                  ubo.updateVector3("vRefractionSize", cubeTexture.boundingBoxSize);
                }
              }
            }
            if (this.pointsCloud) {
              ubo.updateFloat("pointSize", this.pointSize);
            }
            if (defines.SPECULARTERM) {
              ubo.updateColor4("vSpecularColor", this.specularColor, this.specularPower);
            }
            ubo.updateColor3("vEmissiveColor", _StandardMaterial.EmissiveTextureEnabled ? this.emissiveColor : Color3.BlackReadOnly);
            ubo.updateColor4("vDiffuseColor", this.diffuseColor, this.alpha);
            scene.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor);
            ubo.updateColor3("vAmbientColor", this._globalAmbientColor);
          }
          if (scene.texturesEnabled) {
            if (this._diffuseTexture && _StandardMaterial.DiffuseTextureEnabled) {
              effect.setTexture("diffuseSampler", this._diffuseTexture);
            }
            if (this._ambientTexture && _StandardMaterial.AmbientTextureEnabled) {
              effect.setTexture("ambientSampler", this._ambientTexture);
            }
            if (this._opacityTexture && _StandardMaterial.OpacityTextureEnabled) {
              effect.setTexture("opacitySampler", this._opacityTexture);
            }
            if (this._reflectionTexture && _StandardMaterial.ReflectionTextureEnabled) {
              if (this._reflectionTexture.isCube) {
                effect.setTexture("reflectionCubeSampler", this._reflectionTexture);
              } else {
                effect.setTexture("reflection2DSampler", this._reflectionTexture);
              }
            }
            if (this._emissiveTexture && _StandardMaterial.EmissiveTextureEnabled) {
              effect.setTexture("emissiveSampler", this._emissiveTexture);
            }
            if (this._lightmapTexture && _StandardMaterial.LightmapTextureEnabled) {
              effect.setTexture("lightmapSampler", this._lightmapTexture);
            }
            if (this._specularTexture && _StandardMaterial.SpecularTextureEnabled) {
              effect.setTexture("specularSampler", this._specularTexture);
            }
            if (this._bumpTexture && scene.getEngine().getCaps().standardDerivatives && _StandardMaterial.BumpTextureEnabled) {
              effect.setTexture("bumpSampler", this._bumpTexture);
            }
            if (this._refractionTexture && _StandardMaterial.RefractionTextureEnabled) {
              if (this._refractionTexture.isCube) {
                effect.setTexture("refractionCubeSampler", this._refractionTexture);
              } else {
                effect.setTexture("refraction2DSampler", this._refractionTexture);
              }
            }
          }
          if (this.getScene().useOrderIndependentTransparency && this.needAlphaBlendingForMesh(mesh)) {
            this.getScene().depthPeelingRenderer.bind(effect);
          }
          this._eventInfo.subMesh = subMesh;
          this._callbackPluginEventBindForSubMesh(this._eventInfo);
          bindClipPlane(effect, this, scene);
          this.bindEyePosition(effect);
        } else if (scene.getEngine()._features.needToAlwaysBindUniformBuffers) {
          this._needToBindSceneUbo = true;
        }
        if (mustRebind || !this.isFrozen) {
          if (scene.lightsEnabled && !this._disableLighting) {
            BindLights(scene, mesh, effect, defines, this._maxSimultaneousLights);
          }
          if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE || this._reflectionTexture || this._refractionTexture || mesh.receiveShadows || defines.PREPASS) {
            this.bindView(effect);
          }
          BindFogParameters(scene, mesh, effect);
          if (defines.NUM_MORPH_INFLUENCERS) {
            BindMorphTargetParameters(mesh, effect);
          }
          if (defines.BAKED_VERTEX_ANIMATION_TEXTURE) {
            (_a = mesh.bakedVertexAnimationManager) == null ? void 0 : _a.bind(effect, defines.INSTANCES);
          }
          if (this.useLogarithmicDepth) {
            BindLogDepth(defines, effect, scene);
          }
          if (this._imageProcessingConfiguration && !this._imageProcessingConfiguration.applyByPostProcess) {
            this._imageProcessingConfiguration.bind(this._activeEffect);
          }
        }
        this._afterBind(mesh, this._activeEffect, subMesh);
        ubo.update();
      }
      /**
       * Get the list of animatables in the material.
       * @returns the list of animatables object used in the material
       */
      getAnimatables() {
        const results = super.getAnimatables();
        if (this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0) {
          results.push(this._diffuseTexture);
        }
        if (this._ambientTexture && this._ambientTexture.animations && this._ambientTexture.animations.length > 0) {
          results.push(this._ambientTexture);
        }
        if (this._opacityTexture && this._opacityTexture.animations && this._opacityTexture.animations.length > 0) {
          results.push(this._opacityTexture);
        }
        if (this._reflectionTexture && this._reflectionTexture.animations && this._reflectionTexture.animations.length > 0) {
          results.push(this._reflectionTexture);
        }
        if (this._emissiveTexture && this._emissiveTexture.animations && this._emissiveTexture.animations.length > 0) {
          results.push(this._emissiveTexture);
        }
        if (this._specularTexture && this._specularTexture.animations && this._specularTexture.animations.length > 0) {
          results.push(this._specularTexture);
        }
        if (this._bumpTexture && this._bumpTexture.animations && this._bumpTexture.animations.length > 0) {
          results.push(this._bumpTexture);
        }
        if (this._lightmapTexture && this._lightmapTexture.animations && this._lightmapTexture.animations.length > 0) {
          results.push(this._lightmapTexture);
        }
        if (this._refractionTexture && this._refractionTexture.animations && this._refractionTexture.animations.length > 0) {
          results.push(this._refractionTexture);
        }
        return results;
      }
      /**
       * Gets the active textures from the material
       * @returns an array of textures
       */
      getActiveTextures() {
        const activeTextures = super.getActiveTextures();
        if (this._diffuseTexture) {
          activeTextures.push(this._diffuseTexture);
        }
        if (this._ambientTexture) {
          activeTextures.push(this._ambientTexture);
        }
        if (this._opacityTexture) {
          activeTextures.push(this._opacityTexture);
        }
        if (this._reflectionTexture) {
          activeTextures.push(this._reflectionTexture);
        }
        if (this._emissiveTexture) {
          activeTextures.push(this._emissiveTexture);
        }
        if (this._specularTexture) {
          activeTextures.push(this._specularTexture);
        }
        if (this._bumpTexture) {
          activeTextures.push(this._bumpTexture);
        }
        if (this._lightmapTexture) {
          activeTextures.push(this._lightmapTexture);
        }
        if (this._refractionTexture) {
          activeTextures.push(this._refractionTexture);
        }
        return activeTextures;
      }
      /**
       * Specifies if the material uses a texture
       * @param texture defines the texture to check against the material
       * @returns a boolean specifying if the material uses the texture
       */
      hasTexture(texture) {
        if (super.hasTexture(texture)) {
          return true;
        }
        if (this._diffuseTexture === texture) {
          return true;
        }
        if (this._ambientTexture === texture) {
          return true;
        }
        if (this._opacityTexture === texture) {
          return true;
        }
        if (this._reflectionTexture === texture) {
          return true;
        }
        if (this._emissiveTexture === texture) {
          return true;
        }
        if (this._specularTexture === texture) {
          return true;
        }
        if (this._bumpTexture === texture) {
          return true;
        }
        if (this._lightmapTexture === texture) {
          return true;
        }
        if (this._refractionTexture === texture) {
          return true;
        }
        return false;
      }
      /**
       * Disposes the material
       * @param forceDisposeEffect specifies if effects should be forcefully disposed
       * @param forceDisposeTextures specifies if textures should be forcefully disposed
       */
      dispose(forceDisposeEffect, forceDisposeTextures) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        if (forceDisposeTextures) {
          (_a = this._diffuseTexture) == null ? void 0 : _a.dispose();
          (_b = this._ambientTexture) == null ? void 0 : _b.dispose();
          (_c = this._opacityTexture) == null ? void 0 : _c.dispose();
          (_d = this._reflectionTexture) == null ? void 0 : _d.dispose();
          (_e = this._emissiveTexture) == null ? void 0 : _e.dispose();
          (_f = this._specularTexture) == null ? void 0 : _f.dispose();
          (_g = this._bumpTexture) == null ? void 0 : _g.dispose();
          (_h = this._lightmapTexture) == null ? void 0 : _h.dispose();
          (_i = this._refractionTexture) == null ? void 0 : _i.dispose();
        }
        if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
          this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
        }
        super.dispose(forceDisposeEffect, forceDisposeTextures);
      }
      /**
       * Makes a duplicate of the material, and gives it a new name
       * @param name defines the new name for the duplicated material
       * @param cloneTexturesOnlyOnce - if a texture is used in more than one channel (e.g diffuse and opacity), only clone it once and reuse it on the other channels. Default false.
       * @param rootUrl defines the root URL to use to load textures
       * @returns the cloned material
       */
      clone(name66, cloneTexturesOnlyOnce = true, rootUrl = "") {
        const result = SerializationHelper.Clone(() => new _StandardMaterial(name66, this.getScene()), this, { cloneTexturesOnlyOnce });
        result.name = name66;
        result.id = name66;
        this.stencil.copyTo(result.stencil);
        this._clonePlugins(result, rootUrl);
        return result;
      }
      /**
       * Creates a standard material from parsed material data
       * @param source defines the JSON representation of the material
       * @param scene defines the hosting scene
       * @param rootUrl defines the root URL to use to load textures and relative dependencies
       * @returns a new standard material
       */
      static Parse(source, scene, rootUrl) {
        const material = SerializationHelper.Parse(() => new _StandardMaterial(source.name, scene), source, scene, rootUrl);
        if (source.stencil) {
          material.stencil.parse(source.stencil, scene, rootUrl);
        }
        Material._ParsePlugins(source, material, scene, rootUrl);
        return material;
      }
      // Flags used to enable or disable a type of texture for all Standard Materials
      /**
       * Are diffuse textures enabled in the application.
       */
      static get DiffuseTextureEnabled() {
        return MaterialFlags.DiffuseTextureEnabled;
      }
      static set DiffuseTextureEnabled(value) {
        MaterialFlags.DiffuseTextureEnabled = value;
      }
      /**
       * Are detail textures enabled in the application.
       */
      static get DetailTextureEnabled() {
        return MaterialFlags.DetailTextureEnabled;
      }
      static set DetailTextureEnabled(value) {
        MaterialFlags.DetailTextureEnabled = value;
      }
      /**
       * Are ambient textures enabled in the application.
       */
      static get AmbientTextureEnabled() {
        return MaterialFlags.AmbientTextureEnabled;
      }
      static set AmbientTextureEnabled(value) {
        MaterialFlags.AmbientTextureEnabled = value;
      }
      /**
       * Are opacity textures enabled in the application.
       */
      static get OpacityTextureEnabled() {
        return MaterialFlags.OpacityTextureEnabled;
      }
      static set OpacityTextureEnabled(value) {
        MaterialFlags.OpacityTextureEnabled = value;
      }
      /**
       * Are reflection textures enabled in the application.
       */
      static get ReflectionTextureEnabled() {
        return MaterialFlags.ReflectionTextureEnabled;
      }
      static set ReflectionTextureEnabled(value) {
        MaterialFlags.ReflectionTextureEnabled = value;
      }
      /**
       * Are emissive textures enabled in the application.
       */
      static get EmissiveTextureEnabled() {
        return MaterialFlags.EmissiveTextureEnabled;
      }
      static set EmissiveTextureEnabled(value) {
        MaterialFlags.EmissiveTextureEnabled = value;
      }
      /**
       * Are specular textures enabled in the application.
       */
      static get SpecularTextureEnabled() {
        return MaterialFlags.SpecularTextureEnabled;
      }
      static set SpecularTextureEnabled(value) {
        MaterialFlags.SpecularTextureEnabled = value;
      }
      /**
       * Are bump textures enabled in the application.
       */
      static get BumpTextureEnabled() {
        return MaterialFlags.BumpTextureEnabled;
      }
      static set BumpTextureEnabled(value) {
        MaterialFlags.BumpTextureEnabled = value;
      }
      /**
       * Are lightmap textures enabled in the application.
       */
      static get LightmapTextureEnabled() {
        return MaterialFlags.LightmapTextureEnabled;
      }
      static set LightmapTextureEnabled(value) {
        MaterialFlags.LightmapTextureEnabled = value;
      }
      /**
       * Are refraction textures enabled in the application.
       */
      static get RefractionTextureEnabled() {
        return MaterialFlags.RefractionTextureEnabled;
      }
      static set RefractionTextureEnabled(value) {
        MaterialFlags.RefractionTextureEnabled = value;
      }
      /**
       * Are color grading textures enabled in the application.
       */
      static get ColorGradingTextureEnabled() {
        return MaterialFlags.ColorGradingTextureEnabled;
      }
      static set ColorGradingTextureEnabled(value) {
        MaterialFlags.ColorGradingTextureEnabled = value;
      }
      /**
       * Are fresnels enabled in the application.
       */
      static get FresnelEnabled() {
        return MaterialFlags.FresnelEnabled;
      }
      static set FresnelEnabled(value) {
        MaterialFlags.FresnelEnabled = value;
      }
    };
    __decorate([
      serializeAsTexture("diffuseTexture")
    ], StandardMaterial.prototype, "_diffuseTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
    ], StandardMaterial.prototype, "diffuseTexture", void 0);
    __decorate([
      serializeAsTexture("ambientTexture")
    ], StandardMaterial.prototype, "_ambientTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "ambientTexture", void 0);
    __decorate([
      serializeAsTexture("opacityTexture")
    ], StandardMaterial.prototype, "_opacityTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
    ], StandardMaterial.prototype, "opacityTexture", void 0);
    __decorate([
      serializeAsTexture("reflectionTexture")
    ], StandardMaterial.prototype, "_reflectionTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "reflectionTexture", void 0);
    __decorate([
      serializeAsTexture("emissiveTexture")
    ], StandardMaterial.prototype, "_emissiveTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "emissiveTexture", void 0);
    __decorate([
      serializeAsTexture("specularTexture")
    ], StandardMaterial.prototype, "_specularTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "specularTexture", void 0);
    __decorate([
      serializeAsTexture("bumpTexture")
    ], StandardMaterial.prototype, "_bumpTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "bumpTexture", void 0);
    __decorate([
      serializeAsTexture("lightmapTexture")
    ], StandardMaterial.prototype, "_lightmapTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "lightmapTexture", void 0);
    __decorate([
      serializeAsTexture("refractionTexture")
    ], StandardMaterial.prototype, "_refractionTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "refractionTexture", void 0);
    __decorate([
      serializeAsColor3("ambient")
    ], StandardMaterial.prototype, "ambientColor", void 0);
    __decorate([
      serializeAsColor3("diffuse")
    ], StandardMaterial.prototype, "diffuseColor", void 0);
    __decorate([
      serializeAsColor3("specular")
    ], StandardMaterial.prototype, "specularColor", void 0);
    __decorate([
      serializeAsColor3("emissive")
    ], StandardMaterial.prototype, "emissiveColor", void 0);
    __decorate([
      serialize()
    ], StandardMaterial.prototype, "specularPower", void 0);
    __decorate([
      serialize("useAlphaFromDiffuseTexture")
    ], StandardMaterial.prototype, "_useAlphaFromDiffuseTexture", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
    ], StandardMaterial.prototype, "useAlphaFromDiffuseTexture", void 0);
    __decorate([
      serialize("useEmissiveAsIllumination")
    ], StandardMaterial.prototype, "_useEmissiveAsIllumination", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useEmissiveAsIllumination", void 0);
    __decorate([
      serialize("linkEmissiveWithDiffuse")
    ], StandardMaterial.prototype, "_linkEmissiveWithDiffuse", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "linkEmissiveWithDiffuse", void 0);
    __decorate([
      serialize("useSpecularOverAlpha")
    ], StandardMaterial.prototype, "_useSpecularOverAlpha", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useSpecularOverAlpha", void 0);
    __decorate([
      serialize("useReflectionOverAlpha")
    ], StandardMaterial.prototype, "_useReflectionOverAlpha", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useReflectionOverAlpha", void 0);
    __decorate([
      serialize("disableLighting")
    ], StandardMaterial.prototype, "_disableLighting", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsLightsDirty")
    ], StandardMaterial.prototype, "disableLighting", void 0);
    __decorate([
      serialize("useObjectSpaceNormalMap")
    ], StandardMaterial.prototype, "_useObjectSpaceNormalMap", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useObjectSpaceNormalMap", void 0);
    __decorate([
      serialize("useParallax")
    ], StandardMaterial.prototype, "_useParallax", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useParallax", void 0);
    __decorate([
      serialize("useParallaxOcclusion")
    ], StandardMaterial.prototype, "_useParallaxOcclusion", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useParallaxOcclusion", void 0);
    __decorate([
      serialize()
    ], StandardMaterial.prototype, "parallaxScaleBias", void 0);
    __decorate([
      serialize("roughness")
    ], StandardMaterial.prototype, "_roughness", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "roughness", void 0);
    __decorate([
      serialize()
    ], StandardMaterial.prototype, "indexOfRefraction", void 0);
    __decorate([
      serialize()
    ], StandardMaterial.prototype, "invertRefractionY", void 0);
    __decorate([
      serialize()
    ], StandardMaterial.prototype, "alphaCutOff", void 0);
    __decorate([
      serialize("useLightmapAsShadowmap")
    ], StandardMaterial.prototype, "_useLightmapAsShadowmap", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useLightmapAsShadowmap", void 0);
    __decorate([
      serializeAsFresnelParameters("diffuseFresnelParameters")
    ], StandardMaterial.prototype, "_diffuseFresnelParameters", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsFresnelDirty")
    ], StandardMaterial.prototype, "diffuseFresnelParameters", void 0);
    __decorate([
      serializeAsFresnelParameters("opacityFresnelParameters")
    ], StandardMaterial.prototype, "_opacityFresnelParameters", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsFresnelAndMiscDirty")
    ], StandardMaterial.prototype, "opacityFresnelParameters", void 0);
    __decorate([
      serializeAsFresnelParameters("reflectionFresnelParameters")
    ], StandardMaterial.prototype, "_reflectionFresnelParameters", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsFresnelDirty")
    ], StandardMaterial.prototype, "reflectionFresnelParameters", void 0);
    __decorate([
      serializeAsFresnelParameters("refractionFresnelParameters")
    ], StandardMaterial.prototype, "_refractionFresnelParameters", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsFresnelDirty")
    ], StandardMaterial.prototype, "refractionFresnelParameters", void 0);
    __decorate([
      serializeAsFresnelParameters("emissiveFresnelParameters")
    ], StandardMaterial.prototype, "_emissiveFresnelParameters", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsFresnelDirty")
    ], StandardMaterial.prototype, "emissiveFresnelParameters", void 0);
    __decorate([
      serialize("useReflectionFresnelFromSpecular")
    ], StandardMaterial.prototype, "_useReflectionFresnelFromSpecular", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsFresnelDirty")
    ], StandardMaterial.prototype, "useReflectionFresnelFromSpecular", void 0);
    __decorate([
      serialize("useGlossinessFromSpecularMapAlpha")
    ], StandardMaterial.prototype, "_useGlossinessFromSpecularMapAlpha", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "useGlossinessFromSpecularMapAlpha", void 0);
    __decorate([
      serialize("maxSimultaneousLights")
    ], StandardMaterial.prototype, "_maxSimultaneousLights", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsLightsDirty")
    ], StandardMaterial.prototype, "maxSimultaneousLights", void 0);
    __decorate([
      serialize("invertNormalMapX")
    ], StandardMaterial.prototype, "_invertNormalMapX", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "invertNormalMapX", void 0);
    __decorate([
      serialize("invertNormalMapY")
    ], StandardMaterial.prototype, "_invertNormalMapY", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "invertNormalMapY", void 0);
    __decorate([
      serialize("twoSidedLighting")
    ], StandardMaterial.prototype, "_twoSidedLighting", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], StandardMaterial.prototype, "twoSidedLighting", void 0);
    __decorate([
      serialize("applyDecalMapAfterDetailMap")
    ], StandardMaterial.prototype, "_applyDecalMapAfterDetailMap", void 0);
    __decorate([
      expandToProperty("_markAllSubMeshesAsMiscDirty")
    ], StandardMaterial.prototype, "applyDecalMapAfterDetailMap", void 0);
    RegisterClass("BABYLON.StandardMaterial", StandardMaterial);
    Scene.DefaultMaterialFactory = (scene) => {
      return new StandardMaterial("default material", scene);
    };
  }
});

// node_modules/@babylonjs/core/XR/motionController/webXRProfiledMotionController.js
var WebXRProfiledMotionController;
var init_webXRProfiledMotionController = __esm({
  "node_modules/@babylonjs/core/XR/motionController/webXRProfiledMotionController.js"() {
    init_webXRAbstractMotionController();
    init_sceneLoader();
    init_mesh();
    init_math_axis();
    init_math_color();
    init_webXRControllerComponent();
    init_sphereBuilder();
    init_standardMaterial();
    init_logger();
    WebXRProfiledMotionController = class extends WebXRAbstractMotionController {
      constructor(scene, xrInput, _profile, _repositoryUrl, controllerCache2) {
        super(scene, _profile.layouts[xrInput.handedness || "none"], xrInput.gamepad, xrInput.handedness, void 0, controllerCache2);
        this._repositoryUrl = _repositoryUrl;
        this.controllerCache = controllerCache2;
        this._buttonMeshMapping = {};
        this._touchDots = {};
        this.profileId = _profile.profileId;
      }
      dispose() {
        super.dispose();
        if (!this.controllerCache) {
          Object.keys(this._touchDots).forEach((visResKey) => {
            this._touchDots[visResKey].dispose();
          });
        }
      }
      _getFilenameAndPath() {
        return {
          filename: this.layout.assetPath,
          path: `${this._repositoryUrl}/profiles/${this.profileId}/`
        };
      }
      _getModelLoadingConstraints() {
        const glbLoaded = SceneLoader.IsPluginForExtensionAvailable(".glb");
        if (!glbLoaded) {
          Logger.Warn("glTF / glb loader was not registered, using generic controller instead");
        }
        return glbLoaded;
      }
      _processLoadedModel(_meshes) {
        this.getComponentIds().forEach((type) => {
          const componentInLayout = this.layout.components[type];
          this._buttonMeshMapping[type] = {
            mainMesh: this._getChildByName(this.rootMesh, componentInLayout.rootNodeName),
            states: {}
          };
          Object.keys(componentInLayout.visualResponses).forEach((visualResponseKey) => {
            const visResponse = componentInLayout.visualResponses[visualResponseKey];
            if (visResponse.valueNodeProperty === "transform") {
              this._buttonMeshMapping[type].states[visualResponseKey] = {
                valueMesh: this._getChildByName(this.rootMesh, visResponse.valueNodeName),
                minMesh: this._getChildByName(this.rootMesh, visResponse.minNodeName),
                maxMesh: this._getChildByName(this.rootMesh, visResponse.maxNodeName)
              };
            } else {
              const nameOfMesh = componentInLayout.type === WebXRControllerComponent.TOUCHPAD_TYPE && componentInLayout.touchPointNodeName ? componentInLayout.touchPointNodeName : visResponse.valueNodeName;
              this._buttonMeshMapping[type].states[visualResponseKey] = {
                valueMesh: this._getChildByName(this.rootMesh, nameOfMesh)
              };
              if (componentInLayout.type === WebXRControllerComponent.TOUCHPAD_TYPE && !this._touchDots[visualResponseKey]) {
                const dot = CreateSphere(visualResponseKey + "dot", {
                  diameter: 15e-4,
                  segments: 8
                }, this.scene);
                dot.material = new StandardMaterial(visualResponseKey + "mat", this.scene);
                dot.material.diffuseColor = Color3.Red();
                dot.parent = this._buttonMeshMapping[type].states[visualResponseKey].valueMesh || null;
                dot.isVisible = false;
                this._touchDots[visualResponseKey] = dot;
              }
            }
          });
        });
      }
      _setRootMesh(meshes) {
        this.rootMesh = new Mesh(this.profileId + "-" + this.handedness, this.scene);
        this.rootMesh.isPickable = false;
        let rootMesh;
        for (let i = 0; i < meshes.length; i++) {
          const mesh = meshes[i];
          mesh.isPickable = false;
          if (!mesh.parent) {
            rootMesh = mesh;
          }
        }
        if (rootMesh) {
          rootMesh.setParent(this.rootMesh);
        }
        if (!this.scene.useRightHandedSystem) {
          this.rootMesh.rotate(Axis.Y, Math.PI, Space.WORLD);
        }
      }
      _updateModel(_xrFrame) {
        if (this.disableAnimation) {
          return;
        }
        this.getComponentIds().forEach((id) => {
          const component = this.getComponent(id);
          if (!component.hasChanges) {
            return;
          }
          const meshes = this._buttonMeshMapping[id];
          const componentInLayout = this.layout.components[id];
          Object.keys(componentInLayout.visualResponses).forEach((visualResponseKey) => {
            const visResponse = componentInLayout.visualResponses[visualResponseKey];
            let value = component.value;
            if (visResponse.componentProperty === "xAxis") {
              value = component.axes.x;
            } else if (visResponse.componentProperty === "yAxis") {
              value = component.axes.y;
            }
            if (visResponse.valueNodeProperty === "transform") {
              this._lerpTransform(meshes.states[visualResponseKey], value, visResponse.componentProperty !== "button");
            } else {
              const valueMesh = meshes.states[visualResponseKey].valueMesh;
              if (valueMesh) {
                valueMesh.isVisible = component.touched || component.pressed;
              }
              if (this._touchDots[visualResponseKey]) {
                this._touchDots[visualResponseKey].isVisible = component.touched || component.pressed;
              }
            }
          });
        });
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/motionController/webXRMotionControllerManager.js
var controllerCache, WebXRMotionControllerManager;
var init_webXRMotionControllerManager = __esm({
  "node_modules/@babylonjs/core/XR/motionController/webXRMotionControllerManager.js"() {
    init_webXRGenericMotionController();
    init_tools();
    init_webXRProfiledMotionController();
    controllerCache = [];
    WebXRMotionControllerManager = class {
      /**
       * Clear the cache used for profile loading and reload when requested again
       */
      static ClearProfilesCache() {
        this._ProfilesList = null;
        this._ProfileLoadingPromises = {};
      }
      /**
       * Register the default fallbacks.
       * This function is called automatically when this file is imported.
       */
      static DefaultFallbacks() {
        this.RegisterFallbacksForProfileId("google-daydream", ["generic-touchpad"]);
        this.RegisterFallbacksForProfileId("htc-vive-focus", ["generic-trigger-touchpad"]);
        this.RegisterFallbacksForProfileId("htc-vive", ["generic-trigger-squeeze-touchpad"]);
        this.RegisterFallbacksForProfileId("magicleap-one", ["generic-trigger-squeeze-touchpad"]);
        this.RegisterFallbacksForProfileId("windows-mixed-reality", ["generic-trigger-squeeze-touchpad-thumbstick"]);
        this.RegisterFallbacksForProfileId("microsoft-mixed-reality", ["windows-mixed-reality", "generic-trigger-squeeze-touchpad-thumbstick"]);
        this.RegisterFallbacksForProfileId("oculus-go", ["generic-trigger-touchpad"]);
        this.RegisterFallbacksForProfileId("oculus-touch-v2", ["oculus-touch", "generic-trigger-squeeze-thumbstick"]);
        this.RegisterFallbacksForProfileId("oculus-touch", ["generic-trigger-squeeze-thumbstick"]);
        this.RegisterFallbacksForProfileId("samsung-gearvr", ["windows-mixed-reality", "generic-trigger-squeeze-touchpad-thumbstick"]);
        this.RegisterFallbacksForProfileId("samsung-odyssey", ["generic-touchpad"]);
        this.RegisterFallbacksForProfileId("valve-index", ["generic-trigger-squeeze-touchpad-thumbstick"]);
        this.RegisterFallbacksForProfileId("generic-hand-select", ["generic-trigger"]);
      }
      /**
       * Find a fallback profile if the profile was not found. There are a few predefined generic profiles.
       * @param profileId the profile to which a fallback needs to be found
       * @returns an array with corresponding fallback profiles
       */
      static FindFallbackWithProfileId(profileId) {
        const returnArray = this._Fallbacks[profileId] || [];
        returnArray.unshift(profileId);
        return returnArray;
      }
      /**
       * When acquiring a new xrInput object (usually by the WebXRInput class), match it with the correct profile.
       * The order of search:
       *
       * 1) Iterate the profiles array of the xr input and try finding a corresponding motion controller
       * 2) (If not found) search in the gamepad id and try using it (legacy versions only)
       * 3) search for registered fallbacks (should be redundant, nonetheless it makes sense to check)
       * 4) return the generic trigger controller if none were found
       *
       * @param xrInput the xrInput to which a new controller is initialized
       * @param scene the scene to which the model will be added
       * @param forceProfile force a certain profile for this controller
       * @returns A promise that fulfils with the motion controller class for this profile id or the generic standard class if none was found
       */
      static GetMotionControllerWithXRInput(xrInput, scene, forceProfile) {
        const profileArray = [];
        if (forceProfile) {
          profileArray.push(forceProfile);
        }
        profileArray.push(...xrInput.profiles || []);
        if (profileArray.length && !profileArray[0]) {
          profileArray.pop();
        }
        if (xrInput.gamepad && xrInput.gamepad.id) {
          switch (xrInput.gamepad.id) {
            case (xrInput.gamepad.id.match(/oculus touch/gi) ? xrInput.gamepad.id : void 0):
              profileArray.push("oculus-touch-v2");
              break;
          }
        }
        const windowsMRIdx = profileArray.indexOf("windows-mixed-reality");
        if (windowsMRIdx !== -1) {
          profileArray.splice(windowsMRIdx, 0, "microsoft-mixed-reality");
        }
        if (!profileArray.length) {
          profileArray.push("generic-trigger");
        }
        if (this.UseOnlineRepository) {
          const firstFunction = this.PrioritizeOnlineRepository ? this._LoadProfileFromRepository : this._LoadProfilesFromAvailableControllers;
          const secondFunction = this.PrioritizeOnlineRepository ? this._LoadProfilesFromAvailableControllers : this._LoadProfileFromRepository;
          return firstFunction.call(this, profileArray, xrInput, scene).catch(() => {
            return secondFunction.call(this, profileArray, xrInput, scene);
          });
        } else {
          return this._LoadProfilesFromAvailableControllers(profileArray, xrInput, scene);
        }
      }
      /**
       * Register a new controller based on its profile. This function will be called by the controller classes themselves.
       *
       * If you are missing a profile, make sure it is imported in your source, otherwise it will not register.
       *
       * @param type the profile type to register
       * @param constructFunction the function to be called when loading this profile
       */
      static RegisterController(type, constructFunction) {
        this._AvailableControllers[type] = constructFunction;
      }
      /**
       * Register a fallback to a specific profile.
       * @param profileId the profileId that will receive the fallbacks
       * @param fallbacks A list of fallback profiles
       */
      static RegisterFallbacksForProfileId(profileId, fallbacks) {
        if (this._Fallbacks[profileId]) {
          this._Fallbacks[profileId].push(...fallbacks);
        } else {
          this._Fallbacks[profileId] = fallbacks;
        }
      }
      /**
       * Will update the list of profiles available in the repository
       * @returns a promise that resolves to a map of profiles available online
       */
      static UpdateProfilesList() {
        this._ProfilesList = Tools.LoadFileAsync(this.BaseRepositoryUrl + "/profiles/profilesList.json", false).then((data) => {
          return JSON.parse(data);
        });
        return this._ProfilesList;
      }
      /**
       * Clear the controller's cache (usually happens at the end of a session)
       */
      static ClearControllerCache() {
        controllerCache.forEach((cacheItem) => {
          cacheItem.meshes.forEach((mesh) => {
            mesh.dispose(false, true);
          });
        });
        controllerCache.length = 0;
      }
      static _LoadProfileFromRepository(profileArray, xrInput, scene) {
        return Promise.resolve().then(() => {
          if (!this._ProfilesList) {
            return this.UpdateProfilesList();
          } else {
            return this._ProfilesList;
          }
        }).then((profilesList) => {
          for (let i = 0; i < profileArray.length; ++i) {
            if (!profileArray[i]) {
              continue;
            }
            if (profilesList[profileArray[i]]) {
              return profileArray[i];
            }
          }
          throw new Error(`neither controller ${profileArray[0]} nor all fallbacks were found in the repository,`);
        }).then((profileToLoad) => {
          if (!this._ProfileLoadingPromises[profileToLoad]) {
            this._ProfileLoadingPromises[profileToLoad] = Tools.LoadFileAsync(`${this.BaseRepositoryUrl}/profiles/${profileToLoad}/profile.json`, false).then((data) => JSON.parse(data));
          }
          return this._ProfileLoadingPromises[profileToLoad];
        }).then((profile) => {
          return new WebXRProfiledMotionController(scene, xrInput, profile, this.BaseRepositoryUrl, this.DisableControllerCache ? void 0 : controllerCache);
        });
      }
      static _LoadProfilesFromAvailableControllers(profileArray, xrInput, scene) {
        for (let i = 0; i < profileArray.length; ++i) {
          if (!profileArray[i]) {
            continue;
          }
          const fallbacks = this.FindFallbackWithProfileId(profileArray[i]);
          for (let j = 0; j < fallbacks.length; ++j) {
            const constructionFunction = this._AvailableControllers[fallbacks[j]];
            if (constructionFunction) {
              return Promise.resolve(constructionFunction(xrInput, scene));
            }
          }
        }
        throw new Error(`no controller requested was found in the available controllers list`);
      }
    };
    WebXRMotionControllerManager._AvailableControllers = {};
    WebXRMotionControllerManager._Fallbacks = {};
    WebXRMotionControllerManager._ProfileLoadingPromises = {};
    WebXRMotionControllerManager.BaseRepositoryUrl = "https://immersive-web.github.io/webxr-input-profiles/packages/viewer/dist";
    WebXRMotionControllerManager.PrioritizeOnlineRepository = true;
    WebXRMotionControllerManager.UseOnlineRepository = true;
    WebXRMotionControllerManager.DisableControllerCache = true;
    WebXRMotionControllerManager.RegisterController(WebXRGenericTriggerMotionController.ProfileId, (xrInput, scene) => {
      return new WebXRGenericTriggerMotionController(scene, xrInput.gamepad, xrInput.handedness);
    });
    WebXRMotionControllerManager.DefaultFallbacks();
  }
});

// node_modules/@babylonjs/core/XR/webXRInputSource.js
var idCount, WebXRInputSource;
var init_webXRInputSource = __esm({
  "node_modules/@babylonjs/core/XR/webXRInputSource.js"() {
    init_observable();
    init_abstractMesh();
    init_math_vector();
    init_webXRMotionControllerManager();
    init_tools();
    idCount = 0;
    WebXRInputSource = class {
      /**
       * Creates the input source object
       * @see https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRInputControllerSupport
       * @param _scene the scene which the controller should be associated to
       * @param inputSource the underlying input source for the controller
       * @param _options options for this controller creation
       */
      constructor(_scene, inputSource, _options = {}) {
        this._scene = _scene;
        this.inputSource = inputSource;
        this._options = _options;
        this._tmpVector = new Vector3();
        this._disposed = false;
        this.onDisposeObservable = new Observable();
        this.onMeshLoadedObservable = new Observable();
        this.onMotionControllerInitObservable = new Observable();
        this._uniqueId = `controller-${idCount++}-${inputSource.targetRayMode}-${inputSource.handedness}`;
        this.pointer = new AbstractMesh(`${this._uniqueId}-pointer`, _scene);
        this.pointer.rotationQuaternion = new Quaternion();
        if (this.inputSource.gripSpace) {
          this.grip = new AbstractMesh(`${this._uniqueId}-grip`, this._scene);
          this.grip.rotationQuaternion = new Quaternion();
        }
        this._tmpVector.set(0, 0, this._scene.useRightHandedSystem ? -1 : 1);
        if (this.inputSource.gamepad && this.inputSource.targetRayMode === "tracked-pointer") {
          WebXRMotionControllerManager.GetMotionControllerWithXRInput(inputSource, _scene, this._options.forceControllerProfile).then((motionController) => {
            this.motionController = motionController;
            this.onMotionControllerInitObservable.notifyObservers(motionController);
            if (!this._options.doNotLoadControllerMesh && !this.motionController._doNotLoadControllerMesh) {
              this.motionController.loadModel().then((success) => {
                var _a;
                if (success && this.motionController && this.motionController.rootMesh) {
                  if (this._options.renderingGroupId) {
                    this.motionController.rootMesh.renderingGroupId = this._options.renderingGroupId;
                    this.motionController.rootMesh.getChildMeshes(false).forEach((mesh) => mesh.renderingGroupId = this._options.renderingGroupId);
                  }
                  this.onMeshLoadedObservable.notifyObservers(this.motionController.rootMesh);
                  this.motionController.rootMesh.parent = this.grip || this.pointer;
                  this.motionController.disableAnimation = !!this._options.disableMotionControllerAnimation;
                }
                if (this._disposed) {
                  (_a = this.motionController) == null ? void 0 : _a.dispose();
                }
              });
            }
          }, () => {
            Tools.Warn(`Could not find a matching motion controller for the registered input source`);
          });
        }
      }
      /**
       * Get this controllers unique id
       */
      get uniqueId() {
        return this._uniqueId;
      }
      /**
       * Disposes of the object
       */
      dispose() {
        if (this.grip) {
          this.grip.dispose(true);
        }
        if (this.motionController) {
          this.motionController.dispose();
        }
        this.pointer.dispose(true);
        this.onMotionControllerInitObservable.clear();
        this.onMeshLoadedObservable.clear();
        this.onDisposeObservable.notifyObservers(this);
        this.onDisposeObservable.clear();
        this._disposed = true;
      }
      /**
       * Gets a world space ray coming from the pointer or grip
       * @param result the resulting ray
       * @param gripIfAvailable use the grip mesh instead of the pointer, if available
       */
      getWorldPointerRayToRef(result, gripIfAvailable = false) {
        const object = gripIfAvailable && this.grip ? this.grip : this.pointer;
        Vector3.TransformNormalToRef(this._tmpVector, object.getWorldMatrix(), result.direction);
        result.direction.normalize();
        result.origin.copyFrom(object.absolutePosition);
        result.length = 1e3;
      }
      /**
       * Updates the controller pose based on the given XRFrame
       * @param xrFrame xr frame to update the pose with
       * @param referenceSpace reference space to use
       * @param xrCamera the xr camera, used for parenting
       * @param xrSessionManager the session manager used to get the world reference system
       */
      updateFromXRFrame(xrFrame, referenceSpace, xrCamera, xrSessionManager) {
        const pose = xrFrame.getPose(this.inputSource.targetRaySpace, referenceSpace);
        this._lastXRPose = pose;
        if (pose) {
          const pos = pose.transform.position;
          this.pointer.position.set(pos.x, pos.y, pos.z).scaleInPlace(xrSessionManager.worldScalingFactor);
          const orientation = pose.transform.orientation;
          this.pointer.rotationQuaternion.set(orientation.x, orientation.y, orientation.z, orientation.w);
          if (!this._scene.useRightHandedSystem) {
            this.pointer.position.z *= -1;
            this.pointer.rotationQuaternion.z *= -1;
            this.pointer.rotationQuaternion.w *= -1;
          }
          this.pointer.parent = xrCamera.parent;
          this.pointer.scaling.setAll(xrSessionManager.worldScalingFactor);
        }
        if (this.inputSource.gripSpace && this.grip) {
          const pose2 = xrFrame.getPose(this.inputSource.gripSpace, referenceSpace);
          if (pose2) {
            const pos = pose2.transform.position;
            const orientation = pose2.transform.orientation;
            this.grip.position.set(pos.x, pos.y, pos.z).scaleInPlace(xrSessionManager.worldScalingFactor);
            this.grip.rotationQuaternion.set(orientation.x, orientation.y, orientation.z, orientation.w);
            if (!this._scene.useRightHandedSystem) {
              this.grip.position.z *= -1;
              this.grip.rotationQuaternion.z *= -1;
              this.grip.rotationQuaternion.w *= -1;
            }
          }
          this.grip.parent = xrCamera.parent;
          this.grip.scaling.setAll(xrSessionManager.worldScalingFactor);
        }
        if (this.motionController) {
          this.motionController.updateFromXRFrame(xrFrame);
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/webXRInput.js
var WebXRInput;
var init_webXRInput = __esm({
  "node_modules/@babylonjs/core/XR/webXRInput.js"() {
    init_observable();
    init_webXRInputSource();
    init_webXRMotionControllerManager();
    WebXRInput = class {
      /**
       * Initializes the WebXRInput
       * @param xrSessionManager the xr session manager for this session
       * @param xrCamera the WebXR camera for this session. Mainly used for teleportation
       * @param _options = initialization options for this xr input
       */
      constructor(xrSessionManager, xrCamera, _options = {}) {
        this.xrSessionManager = xrSessionManager;
        this.xrCamera = xrCamera;
        this._options = _options;
        this.controllers = [];
        this.onControllerAddedObservable = new Observable();
        this.onControllerRemovedObservable = new Observable();
        this._onInputSourcesChange = (event) => {
          this._addAndRemoveControllers(event.added, event.removed);
        };
        this._sessionEndedObserver = this.xrSessionManager.onXRSessionEnded.add(() => {
          this._addAndRemoveControllers([], this.controllers.map((c) => {
            return c.inputSource;
          }));
        });
        this._sessionInitObserver = this.xrSessionManager.onXRSessionInit.add((session) => {
          session.addEventListener("inputsourceschange", this._onInputSourcesChange);
        });
        this._frameObserver = this.xrSessionManager.onXRFrameObservable.add((frame) => {
          this.controllers.forEach((controller) => {
            controller.updateFromXRFrame(frame, this.xrSessionManager.referenceSpace, this.xrCamera, this.xrSessionManager);
          });
        });
        if (this._options.customControllersRepositoryURL) {
          WebXRMotionControllerManager.BaseRepositoryUrl = this._options.customControllersRepositoryURL;
        }
        WebXRMotionControllerManager.UseOnlineRepository = !this._options.disableOnlineControllerRepository;
        if (WebXRMotionControllerManager.UseOnlineRepository) {
          try {
            WebXRMotionControllerManager.UpdateProfilesList().catch(() => {
              WebXRMotionControllerManager.UseOnlineRepository = false;
            });
          } catch (e) {
            WebXRMotionControllerManager.UseOnlineRepository = false;
          }
        }
      }
      _addAndRemoveControllers(addInputs, removeInputs) {
        const sources = this.controllers.map((c) => {
          return c.inputSource;
        });
        for (const input of addInputs) {
          if (sources.indexOf(input) === -1) {
            const controller = new WebXRInputSource(this.xrSessionManager.scene, input, {
              ...this._options.controllerOptions || {},
              forceControllerProfile: this._options.forceInputProfile,
              doNotLoadControllerMesh: this._options.doNotLoadControllerMeshes,
              disableMotionControllerAnimation: this._options.disableControllerAnimation
            });
            this.controllers.push(controller);
            this.onControllerAddedObservable.notifyObservers(controller);
          }
        }
        const keepControllers = [];
        const removedControllers = [];
        this.controllers.forEach((c) => {
          if (removeInputs.indexOf(c.inputSource) === -1) {
            keepControllers.push(c);
          } else {
            removedControllers.push(c);
          }
        });
        this.controllers = keepControllers;
        removedControllers.forEach((c) => {
          this.onControllerRemovedObservable.notifyObservers(c);
          c.dispose();
        });
      }
      /**
       * Disposes of the object
       */
      dispose() {
        this.controllers.forEach((c) => {
          c.dispose();
        });
        this.xrSessionManager.onXRFrameObservable.remove(this._frameObserver);
        this.xrSessionManager.onXRSessionInit.remove(this._sessionInitObserver);
        this.xrSessionManager.onXRSessionEnded.remove(this._sessionEndedObserver);
        this.onControllerAddedObservable.clear();
        this.onControllerRemovedObservable.clear();
        WebXRMotionControllerManager.ClearControllerCache();
      }
    };
  }
});

// node_modules/@babylonjs/core/Meshes/Builders/cylinderBuilder.js
function CreateCylinderVertexData(options) {
  const height = options.height || 2;
  let diameterTop = options.diameterTop === 0 ? 0 : options.diameterTop || options.diameter || 1;
  let diameterBottom = options.diameterBottom === 0 ? 0 : options.diameterBottom || options.diameter || 1;
  diameterTop = diameterTop || 1e-5;
  diameterBottom = diameterBottom || 1e-5;
  const tessellation = (options.tessellation || 24) | 0;
  const subdivisions = (options.subdivisions || 1) | 0;
  const hasRings = options.hasRings ? true : false;
  const enclose = options.enclose ? true : false;
  const cap = options.cap === 0 ? 0 : options.cap || Mesh.CAP_ALL;
  const arc = options.arc && (options.arc <= 0 || options.arc > 1) ? 1 : options.arc || 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const faceUV = options.faceUV || new Array(3);
  const faceColors = options.faceColors;
  const quadNb = arc !== 1 && enclose ? 2 : 0;
  const ringNb = hasRings ? subdivisions : 1;
  const surfaceNb = 2 + (1 + quadNb) * ringNb;
  let f;
  for (f = 0; f < surfaceNb; f++) {
    if (faceColors && faceColors[f] === void 0) {
      faceColors[f] = new Color4(1, 1, 1, 1);
    }
  }
  for (f = 0; f < surfaceNb; f++) {
    if (faceUV && faceUV[f] === void 0) {
      faceUV[f] = new Vector4(0, 0, 1, 1);
    }
  }
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  const colors = [];
  const angleStep = Math.PI * 2 * arc / tessellation;
  let angle;
  let h;
  let radius;
  const tan = (diameterBottom - diameterTop) / 2 / height;
  const ringVertex = Vector3.Zero();
  const ringNormal = Vector3.Zero();
  const ringFirstVertex = Vector3.Zero();
  const ringFirstNormal = Vector3.Zero();
  const quadNormal = Vector3.Zero();
  const Y = Axis.Y;
  let i;
  let j;
  let r;
  let ringIdx = 1;
  let s = 1;
  let cs = 0;
  let v = 0;
  for (i = 0; i <= subdivisions; i++) {
    h = i / subdivisions;
    radius = (h * (diameterTop - diameterBottom) + diameterBottom) / 2;
    ringIdx = hasRings && i !== 0 && i !== subdivisions ? 2 : 1;
    for (r = 0; r < ringIdx; r++) {
      if (hasRings) {
        s += r;
      }
      if (enclose) {
        s += 2 * r;
      }
      for (j = 0; j <= tessellation; j++) {
        angle = j * angleStep;
        ringVertex.x = Math.cos(-angle) * radius;
        ringVertex.y = -height / 2 + h * height;
        ringVertex.z = Math.sin(-angle) * radius;
        if (diameterTop === 0 && i === subdivisions) {
          ringNormal.x = normals[normals.length - (tessellation + 1) * 3];
          ringNormal.y = normals[normals.length - (tessellation + 1) * 3 + 1];
          ringNormal.z = normals[normals.length - (tessellation + 1) * 3 + 2];
        } else {
          ringNormal.x = ringVertex.x;
          ringNormal.z = ringVertex.z;
          ringNormal.y = Math.sqrt(ringNormal.x * ringNormal.x + ringNormal.z * ringNormal.z) * tan;
          ringNormal.normalize();
        }
        if (j === 0) {
          ringFirstVertex.copyFrom(ringVertex);
          ringFirstNormal.copyFrom(ringNormal);
        }
        positions.push(ringVertex.x, ringVertex.y, ringVertex.z);
        normals.push(ringNormal.x, ringNormal.y, ringNormal.z);
        if (hasRings) {
          v = cs !== s ? faceUV[s].y : faceUV[s].w;
        } else {
          v = faceUV[s].y + (faceUV[s].w - faceUV[s].y) * h;
        }
        uvs.push(faceUV[s].x + (faceUV[s].z - faceUV[s].x) * j / tessellation, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - v : v);
        if (faceColors) {
          colors.push(faceColors[s].r, faceColors[s].g, faceColors[s].b, faceColors[s].a);
        }
      }
      if (arc !== 1 && enclose) {
        positions.push(ringVertex.x, ringVertex.y, ringVertex.z);
        positions.push(0, ringVertex.y, 0);
        positions.push(0, ringVertex.y, 0);
        positions.push(ringFirstVertex.x, ringFirstVertex.y, ringFirstVertex.z);
        Vector3.CrossToRef(Y, ringNormal, quadNormal);
        quadNormal.normalize();
        normals.push(quadNormal.x, quadNormal.y, quadNormal.z, quadNormal.x, quadNormal.y, quadNormal.z);
        Vector3.CrossToRef(ringFirstNormal, Y, quadNormal);
        quadNormal.normalize();
        normals.push(quadNormal.x, quadNormal.y, quadNormal.z, quadNormal.x, quadNormal.y, quadNormal.z);
        if (hasRings) {
          v = cs !== s ? faceUV[s + 1].y : faceUV[s + 1].w;
        } else {
          v = faceUV[s + 1].y + (faceUV[s + 1].w - faceUV[s + 1].y) * h;
        }
        uvs.push(faceUV[s + 1].x, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - v : v);
        uvs.push(faceUV[s + 1].z, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - v : v);
        if (hasRings) {
          v = cs !== s ? faceUV[s + 2].y : faceUV[s + 2].w;
        } else {
          v = faceUV[s + 2].y + (faceUV[s + 2].w - faceUV[s + 2].y) * h;
        }
        uvs.push(faceUV[s + 2].x, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - v : v);
        uvs.push(faceUV[s + 2].z, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - v : v);
        if (faceColors) {
          colors.push(faceColors[s + 1].r, faceColors[s + 1].g, faceColors[s + 1].b, faceColors[s + 1].a);
          colors.push(faceColors[s + 1].r, faceColors[s + 1].g, faceColors[s + 1].b, faceColors[s + 1].a);
          colors.push(faceColors[s + 2].r, faceColors[s + 2].g, faceColors[s + 2].b, faceColors[s + 2].a);
          colors.push(faceColors[s + 2].r, faceColors[s + 2].g, faceColors[s + 2].b, faceColors[s + 2].a);
        }
      }
      if (cs !== s) {
        cs = s;
      }
    }
  }
  const e = arc !== 1 && enclose ? tessellation + 4 : tessellation;
  i = 0;
  for (s = 0; s < subdivisions; s++) {
    let i0 = 0;
    let i1 = 0;
    let i2 = 0;
    let i3 = 0;
    for (j = 0; j < tessellation; j++) {
      i0 = i * (e + 1) + j;
      i1 = (i + 1) * (e + 1) + j;
      i2 = i * (e + 1) + (j + 1);
      i3 = (i + 1) * (e + 1) + (j + 1);
      indices.push(i0, i1, i2);
      indices.push(i3, i2, i1);
    }
    if (arc !== 1 && enclose) {
      indices.push(i0 + 2, i1 + 2, i2 + 2);
      indices.push(i3 + 2, i2 + 2, i1 + 2);
      indices.push(i0 + 4, i1 + 4, i2 + 4);
      indices.push(i3 + 4, i2 + 4, i1 + 4);
    }
    i = hasRings ? i + 2 : i + 1;
  }
  const createCylinderCap = (isTop) => {
    const radius2 = isTop ? diameterTop / 2 : diameterBottom / 2;
    if (radius2 === 0) {
      return;
    }
    let angle2;
    let circleVector;
    let i2;
    const u = isTop ? faceUV[surfaceNb - 1] : faceUV[0];
    let c = null;
    if (faceColors) {
      c = isTop ? faceColors[surfaceNb - 1] : faceColors[0];
    }
    const vbase = positions.length / 3;
    const offset = isTop ? height / 2 : -height / 2;
    const center = new Vector3(0, offset, 0);
    positions.push(center.x, center.y, center.z);
    normals.push(0, isTop ? 1 : -1, 0);
    const v2 = u.y + (u.w - u.y) * 0.5;
    uvs.push(u.x + (u.z - u.x) * 0.5, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - v2 : v2);
    if (c) {
      colors.push(c.r, c.g, c.b, c.a);
    }
    const textureScale = new Vector2(0.5, 0.5);
    for (i2 = 0; i2 <= tessellation; i2++) {
      angle2 = Math.PI * 2 * i2 * arc / tessellation;
      const cos = Math.cos(-angle2);
      const sin = Math.sin(-angle2);
      circleVector = new Vector3(cos * radius2, offset, sin * radius2);
      const textureCoordinate = new Vector2(cos * textureScale.x + 0.5, sin * textureScale.y + 0.5);
      positions.push(circleVector.x, circleVector.y, circleVector.z);
      normals.push(0, isTop ? 1 : -1, 0);
      const v3 = u.y + (u.w - u.y) * textureCoordinate.y;
      uvs.push(u.x + (u.z - u.x) * textureCoordinate.x, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - v3 : v3);
      if (c) {
        colors.push(c.r, c.g, c.b, c.a);
      }
    }
    for (i2 = 0; i2 < tessellation; i2++) {
      if (!isTop) {
        indices.push(vbase);
        indices.push(vbase + (i2 + 1));
        indices.push(vbase + (i2 + 2));
      } else {
        indices.push(vbase);
        indices.push(vbase + (i2 + 2));
        indices.push(vbase + (i2 + 1));
      }
    }
  };
  if (cap === Mesh.CAP_START || cap === Mesh.CAP_ALL) {
    createCylinderCap(false);
  }
  if (cap === Mesh.CAP_END || cap === Mesh.CAP_ALL) {
    createCylinderCap(true);
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  if (faceColors) {
    vertexData.colors = colors;
  }
  return vertexData;
}
function CreateCylinder(name66, options = {}, scene) {
  const cylinder = new Mesh(name66, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  cylinder._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateCylinderVertexData(options);
  vertexData.applyToMesh(cylinder, options.updatable);
  return cylinder;
}
var CylinderBuilder;
var init_cylinderBuilder = __esm({
  "node_modules/@babylonjs/core/Meshes/Builders/cylinderBuilder.js"() {
    init_math_vector();
    init_math_color();
    init_mesh();
    init_mesh_vertexData();
    init_scene();
    init_math_axis();
    init_compatibilityOptions();
    CylinderBuilder = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CreateCylinder
    };
    VertexData.CreateCylinder = CreateCylinderVertexData;
    Mesh.CreateCylinder = (name66, height, diameterTop, diameterBottom, tessellation, subdivisions, scene, updatable, sideOrientation) => {
      if (scene === void 0 || !(scene instanceof Scene)) {
        if (scene !== void 0) {
          sideOrientation = updatable || Mesh.DEFAULTSIDE;
          updatable = scene;
        }
        scene = subdivisions;
        subdivisions = 1;
      }
      const options = {
        height,
        diameterTop,
        diameterBottom,
        tessellation,
        subdivisions,
        sideOrientation,
        updatable
      };
      return CreateCylinder(name66, options, scene);
    };
  }
});

// node_modules/@babylonjs/core/Meshes/Builders/torusBuilder.js
function CreateTorusVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  const diameter = options.diameter || 1;
  const thickness = options.thickness || 0.5;
  const tessellation = (options.tessellation || 16) | 0;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const stride = tessellation + 1;
  for (let i = 0; i <= tessellation; i++) {
    const u = i / tessellation;
    const outerAngle = i * Math.PI * 2 / tessellation - Math.PI / 2;
    const transform = Matrix.Translation(diameter / 2, 0, 0).multiply(Matrix.RotationY(outerAngle));
    for (let j = 0; j <= tessellation; j++) {
      const v = 1 - j / tessellation;
      const innerAngle = j * Math.PI * 2 / tessellation + Math.PI;
      const dx = Math.cos(innerAngle);
      const dy = Math.sin(innerAngle);
      let normal = new Vector3(dx, dy, 0);
      let position = normal.scale(thickness / 2);
      const textureCoordinate = new Vector2(u, v);
      position = Vector3.TransformCoordinates(position, transform);
      normal = Vector3.TransformNormal(normal, transform);
      positions.push(position.x, position.y, position.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(textureCoordinate.x, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - textureCoordinate.y : textureCoordinate.y);
      const nextI = (i + 1) % stride;
      const nextJ = (j + 1) % stride;
      indices.push(i * stride + j);
      indices.push(i * stride + nextJ);
      indices.push(nextI * stride + j);
      indices.push(i * stride + nextJ);
      indices.push(nextI * stride + nextJ);
      indices.push(nextI * stride + j);
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateTorus(name66, options = {}, scene) {
  const torus = new Mesh(name66, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  torus._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateTorusVertexData(options);
  vertexData.applyToMesh(torus, options.updatable);
  return torus;
}
var TorusBuilder;
var init_torusBuilder = __esm({
  "node_modules/@babylonjs/core/Meshes/Builders/torusBuilder.js"() {
    init_math_vector();
    init_mesh();
    init_mesh_vertexData();
    init_compatibilityOptions();
    TorusBuilder = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CreateTorus
    };
    VertexData.CreateTorus = CreateTorusVertexData;
    Mesh.CreateTorus = (name66, diameter, thickness, tessellation, scene, updatable, sideOrientation) => {
      const options = {
        diameter,
        thickness,
        tessellation,
        sideOrientation,
        updatable
      };
      return CreateTorus(name66, options, scene);
    };
  }
});

// node_modules/@babylonjs/core/Culling/ray.js
var Ray;
var init_ray = __esm({
  "node_modules/@babylonjs/core/Culling/ray.js"() {
    init_arrayTools();
    init_math_vector();
    init_pickingInfo();
    init_intersectionInfo();
    init_scene();
    init_camera();
    init_engineStore();
    init_math_constants();
    Ray = class _Ray {
      /**
       * Creates a new ray
       * @param origin origin point
       * @param direction direction
       * @param length length of the ray
       * @param epsilon The epsilon value to use when calculating the ray/triangle intersection (default: 0)
       */
      constructor(origin, direction, length = Number.MAX_VALUE, epsilon = Epsilon) {
        this.origin = origin;
        this.direction = direction;
        this.length = length;
        this.epsilon = epsilon;
      }
      // Methods
      /**
       * Clone the current ray
       * @returns a new ray
       */
      clone() {
        return new _Ray(this.origin.clone(), this.direction.clone(), this.length);
      }
      /**
       * Checks if the ray intersects a box
       * This does not account for the ray length by design to improve perfs.
       * @param minimum bound of the box
       * @param maximum bound of the box
       * @param intersectionTreshold extra extend to be added to the box in all direction
       * @returns if the box was hit
       */
      intersectsBoxMinMax(minimum, maximum, intersectionTreshold = 0) {
        const newMinimum = _Ray._TmpVector3[0].copyFromFloats(minimum.x - intersectionTreshold, minimum.y - intersectionTreshold, minimum.z - intersectionTreshold);
        const newMaximum = _Ray._TmpVector3[1].copyFromFloats(maximum.x + intersectionTreshold, maximum.y + intersectionTreshold, maximum.z + intersectionTreshold);
        let d = 0;
        let maxValue = Number.MAX_VALUE;
        let inv;
        let min;
        let max;
        let temp;
        if (Math.abs(this.direction.x) < 1e-7) {
          if (this.origin.x < newMinimum.x || this.origin.x > newMaximum.x) {
            return false;
          }
        } else {
          inv = 1 / this.direction.x;
          min = (newMinimum.x - this.origin.x) * inv;
          max = (newMaximum.x - this.origin.x) * inv;
          if (max === -Infinity) {
            max = Infinity;
          }
          if (min > max) {
            temp = min;
            min = max;
            max = temp;
          }
          d = Math.max(min, d);
          maxValue = Math.min(max, maxValue);
          if (d > maxValue) {
            return false;
          }
        }
        if (Math.abs(this.direction.y) < 1e-7) {
          if (this.origin.y < newMinimum.y || this.origin.y > newMaximum.y) {
            return false;
          }
        } else {
          inv = 1 / this.direction.y;
          min = (newMinimum.y - this.origin.y) * inv;
          max = (newMaximum.y - this.origin.y) * inv;
          if (max === -Infinity) {
            max = Infinity;
          }
          if (min > max) {
            temp = min;
            min = max;
            max = temp;
          }
          d = Math.max(min, d);
          maxValue = Math.min(max, maxValue);
          if (d > maxValue) {
            return false;
          }
        }
        if (Math.abs(this.direction.z) < 1e-7) {
          if (this.origin.z < newMinimum.z || this.origin.z > newMaximum.z) {
            return false;
          }
        } else {
          inv = 1 / this.direction.z;
          min = (newMinimum.z - this.origin.z) * inv;
          max = (newMaximum.z - this.origin.z) * inv;
          if (max === -Infinity) {
            max = Infinity;
          }
          if (min > max) {
            temp = min;
            min = max;
            max = temp;
          }
          d = Math.max(min, d);
          maxValue = Math.min(max, maxValue);
          if (d > maxValue) {
            return false;
          }
        }
        return true;
      }
      /**
       * Checks if the ray intersects a box
       * This does not account for the ray lenght by design to improve perfs.
       * @param box the bounding box to check
       * @param intersectionTreshold extra extend to be added to the BoundingBox in all direction
       * @returns if the box was hit
       */
      intersectsBox(box, intersectionTreshold = 0) {
        return this.intersectsBoxMinMax(box.minimum, box.maximum, intersectionTreshold);
      }
      /**
       * If the ray hits a sphere
       * @param sphere the bounding sphere to check
       * @param intersectionTreshold extra extend to be added to the BoundingSphere in all direction
       * @returns true if it hits the sphere
       */
      intersectsSphere(sphere, intersectionTreshold = 0) {
        const x = sphere.center.x - this.origin.x;
        const y = sphere.center.y - this.origin.y;
        const z = sphere.center.z - this.origin.z;
        const pyth = x * x + y * y + z * z;
        const radius = sphere.radius + intersectionTreshold;
        const rr = radius * radius;
        if (pyth <= rr) {
          return true;
        }
        const dot = x * this.direction.x + y * this.direction.y + z * this.direction.z;
        if (dot < 0) {
          return false;
        }
        const temp = pyth - dot * dot;
        return temp <= rr;
      }
      /**
       * If the ray hits a triange
       * @param vertex0 triangle vertex
       * @param vertex1 triangle vertex
       * @param vertex2 triangle vertex
       * @returns intersection information if hit
       */
      intersectsTriangle(vertex0, vertex1, vertex2) {
        const edge1 = _Ray._TmpVector3[0];
        const edge2 = _Ray._TmpVector3[1];
        const pvec = _Ray._TmpVector3[2];
        const tvec = _Ray._TmpVector3[3];
        const qvec = _Ray._TmpVector3[4];
        vertex1.subtractToRef(vertex0, edge1);
        vertex2.subtractToRef(vertex0, edge2);
        Vector3.CrossToRef(this.direction, edge2, pvec);
        const det = Vector3.Dot(edge1, pvec);
        if (det === 0) {
          return null;
        }
        const invdet = 1 / det;
        this.origin.subtractToRef(vertex0, tvec);
        const bv = Vector3.Dot(tvec, pvec) * invdet;
        if (bv < -this.epsilon || bv > 1 + this.epsilon) {
          return null;
        }
        Vector3.CrossToRef(tvec, edge1, qvec);
        const bw = Vector3.Dot(this.direction, qvec) * invdet;
        if (bw < -this.epsilon || bv + bw > 1 + this.epsilon) {
          return null;
        }
        const distance = Vector3.Dot(edge2, qvec) * invdet;
        if (distance > this.length) {
          return null;
        }
        return new IntersectionInfo(1 - bv - bw, bv, distance);
      }
      /**
       * Checks if ray intersects a plane
       * @param plane the plane to check
       * @returns the distance away it was hit
       */
      intersectsPlane(plane) {
        let distance;
        const result1 = Vector3.Dot(plane.normal, this.direction);
        if (Math.abs(result1) < 999999997475243e-21) {
          return null;
        } else {
          const result2 = Vector3.Dot(plane.normal, this.origin);
          distance = (-plane.d - result2) / result1;
          if (distance < 0) {
            if (distance < -999999997475243e-21) {
              return null;
            } else {
              return 0;
            }
          }
          return distance;
        }
      }
      /**
       * Calculate the intercept of a ray on a given axis
       * @param axis to check 'x' | 'y' | 'z'
       * @param offset from axis interception (i.e. an offset of 1y is intercepted above ground)
       * @returns a vector containing the coordinates where 'axis' is equal to zero (else offset), or null if there is no intercept.
       */
      intersectsAxis(axis, offset = 0) {
        switch (axis) {
          case "y": {
            const t = (this.origin.y - offset) / this.direction.y;
            if (t > 0) {
              return null;
            }
            return new Vector3(this.origin.x + this.direction.x * -t, offset, this.origin.z + this.direction.z * -t);
          }
          case "x": {
            const t = (this.origin.x - offset) / this.direction.x;
            if (t > 0) {
              return null;
            }
            return new Vector3(offset, this.origin.y + this.direction.y * -t, this.origin.z + this.direction.z * -t);
          }
          case "z": {
            const t = (this.origin.z - offset) / this.direction.z;
            if (t > 0) {
              return null;
            }
            return new Vector3(this.origin.x + this.direction.x * -t, this.origin.y + this.direction.y * -t, offset);
          }
          default:
            return null;
        }
      }
      /**
       * Checks if ray intersects a mesh. The ray is defined in WORLD space. A mesh triangle can be picked both from its front and back sides,
       * irrespective of orientation.
       * @param mesh the mesh to check
       * @param fastCheck defines if the first intersection will be used (and not the closest)
       * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
       * @param onlyBoundingInfo defines a boolean indicating if picking should only happen using bounding info (false by default)
       * @param worldToUse defines the world matrix to use to get the world coordinate of the intersection point
       * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
       * @returns picking info of the intersection
       */
      intersectsMesh(mesh, fastCheck, trianglePredicate, onlyBoundingInfo = false, worldToUse, skipBoundingInfo = false) {
        const tm = TmpVectors.Matrix[0];
        mesh.getWorldMatrix().invertToRef(tm);
        if (this._tmpRay) {
          _Ray.TransformToRef(this, tm, this._tmpRay);
        } else {
          this._tmpRay = _Ray.Transform(this, tm);
        }
        return mesh.intersects(this._tmpRay, fastCheck, trianglePredicate, onlyBoundingInfo, worldToUse, skipBoundingInfo);
      }
      /**
       * Checks if ray intersects a mesh
       * @param meshes the meshes to check
       * @param fastCheck defines if the first intersection will be used (and not the closest)
       * @param results array to store result in
       * @returns Array of picking infos
       */
      intersectsMeshes(meshes, fastCheck, results) {
        if (results) {
          results.length = 0;
        } else {
          results = [];
        }
        for (let i = 0; i < meshes.length; i++) {
          const pickInfo = this.intersectsMesh(meshes[i], fastCheck);
          if (pickInfo.hit) {
            results.push(pickInfo);
          }
        }
        results.sort(this._comparePickingInfo);
        return results;
      }
      _comparePickingInfo(pickingInfoA, pickingInfoB) {
        if (pickingInfoA.distance < pickingInfoB.distance) {
          return -1;
        } else if (pickingInfoA.distance > pickingInfoB.distance) {
          return 1;
        } else {
          return 0;
        }
      }
      /**
       * Intersection test between the ray and a given segment within a given tolerance (threshold)
       * @param sega the first point of the segment to test the intersection against
       * @param segb the second point of the segment to test the intersection against
       * @param threshold the tolerance margin, if the ray doesn't intersect the segment but is close to the given threshold, the intersection is successful
       * @returns the distance from the ray origin to the intersection point if there's intersection, or -1 if there's no intersection
       */
      intersectionSegment(sega, segb, threshold) {
        const o = this.origin;
        const u = TmpVectors.Vector3[0];
        const rsegb = TmpVectors.Vector3[1];
        const v = TmpVectors.Vector3[2];
        const w = TmpVectors.Vector3[3];
        segb.subtractToRef(sega, u);
        this.direction.scaleToRef(_Ray._Rayl, v);
        o.addToRef(v, rsegb);
        sega.subtractToRef(o, w);
        const a = Vector3.Dot(u, u);
        const b = Vector3.Dot(u, v);
        const c = Vector3.Dot(v, v);
        const d = Vector3.Dot(u, w);
        const e = Vector3.Dot(v, w);
        const D = a * c - b * b;
        let sN, sD = D;
        let tN, tD = D;
        if (D < _Ray._Smallnum) {
          sN = 0;
          sD = 1;
          tN = e;
          tD = c;
        } else {
          sN = b * e - c * d;
          tN = a * e - b * d;
          if (sN < 0) {
            sN = 0;
            tN = e;
            tD = c;
          } else if (sN > sD) {
            sN = sD;
            tN = e + b;
            tD = c;
          }
        }
        if (tN < 0) {
          tN = 0;
          if (-d < 0) {
            sN = 0;
          } else if (-d > a) {
            sN = sD;
          } else {
            sN = -d;
            sD = a;
          }
        } else if (tN > tD) {
          tN = tD;
          if (-d + b < 0) {
            sN = 0;
          } else if (-d + b > a) {
            sN = sD;
          } else {
            sN = -d + b;
            sD = a;
          }
        }
        const sc = Math.abs(sN) < _Ray._Smallnum ? 0 : sN / sD;
        const tc = Math.abs(tN) < _Ray._Smallnum ? 0 : tN / tD;
        const qtc = TmpVectors.Vector3[4];
        v.scaleToRef(tc, qtc);
        const qsc = TmpVectors.Vector3[5];
        u.scaleToRef(sc, qsc);
        qsc.addInPlace(w);
        const dP = TmpVectors.Vector3[6];
        qsc.subtractToRef(qtc, dP);
        const isIntersected = tc > 0 && tc <= this.length && dP.lengthSquared() < threshold * threshold;
        if (isIntersected) {
          return qsc.length();
        }
        return -1;
      }
      /**
       * Update the ray from viewport position
       * @param x position
       * @param y y position
       * @param viewportWidth viewport width
       * @param viewportHeight viewport height
       * @param world world matrix
       * @param view view matrix
       * @param projection projection matrix
       * @param enableDistantPicking defines if picking should handle large values for mesh position/scaling (false by default)
       * @returns this ray updated
       */
      update(x, y, viewportWidth, viewportHeight, world, view, projection, enableDistantPicking = false) {
        if (enableDistantPicking) {
          if (!_Ray._RayDistant) {
            _Ray._RayDistant = _Ray.Zero();
          }
          _Ray._RayDistant.unprojectRayToRef(x, y, viewportWidth, viewportHeight, Matrix.IdentityReadOnly, view, projection);
          const tm = TmpVectors.Matrix[0];
          world.invertToRef(tm);
          _Ray.TransformToRef(_Ray._RayDistant, tm, this);
        } else {
          this.unprojectRayToRef(x, y, viewportWidth, viewportHeight, world, view, projection);
        }
        return this;
      }
      // Statics
      /**
       * Creates a ray with origin and direction of 0,0,0
       * @returns the new ray
       */
      static Zero() {
        return new _Ray(Vector3.Zero(), Vector3.Zero());
      }
      /**
       * Creates a new ray from screen space and viewport
       * @param x position
       * @param y y position
       * @param viewportWidth viewport width
       * @param viewportHeight viewport height
       * @param world world matrix
       * @param view view matrix
       * @param projection projection matrix
       * @returns new ray
       */
      static CreateNew(x, y, viewportWidth, viewportHeight, world, view, projection) {
        const result = _Ray.Zero();
        return result.update(x, y, viewportWidth, viewportHeight, world, view, projection);
      }
      /**
       * Function will create a new transformed ray starting from origin and ending at the end point. Ray's length will be set, and ray will be
       * transformed to the given world matrix.
       * @param origin The origin point
       * @param end The end point
       * @param world a matrix to transform the ray to. Default is the identity matrix.
       * @returns the new ray
       */
      static CreateNewFromTo(origin, end, world = Matrix.IdentityReadOnly) {
        const result = new _Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        return _Ray.CreateFromToToRef(origin, end, result, world);
      }
      /**
       * Function will update a transformed ray starting from origin and ending at the end point. Ray's length will be set, and ray will be
       * transformed to the given world matrix.
       * @param origin The origin point
       * @param end The end point
       * @param result the object to store the result
       * @param world a matrix to transform the ray to. Default is the identity matrix.
       * @returns the ref ray
       */
      static CreateFromToToRef(origin, end, result, world = Matrix.IdentityReadOnly) {
        result.origin.copyFrom(origin);
        const direction = end.subtractToRef(origin, result.direction);
        const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
        result.length = length;
        result.direction.normalize();
        return _Ray.TransformToRef(result, world, result);
      }
      /**
       * Transforms a ray by a matrix
       * @param ray ray to transform
       * @param matrix matrix to apply
       * @returns the resulting new ray
       */
      static Transform(ray, matrix) {
        const result = new _Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        _Ray.TransformToRef(ray, matrix, result);
        return result;
      }
      /**
       * Transforms a ray by a matrix
       * @param ray ray to transform
       * @param matrix matrix to apply
       * @param result ray to store result in
       * @returns the updated result ray
       */
      static TransformToRef(ray, matrix, result) {
        Vector3.TransformCoordinatesToRef(ray.origin, matrix, result.origin);
        Vector3.TransformNormalToRef(ray.direction, matrix, result.direction);
        result.length = ray.length;
        result.epsilon = ray.epsilon;
        const dir = result.direction;
        const len = dir.length();
        if (!(len === 0 || len === 1)) {
          const num = 1 / len;
          dir.x *= num;
          dir.y *= num;
          dir.z *= num;
          result.length *= len;
        }
        return result;
      }
      /**
       * Unproject a ray from screen space to object space
       * @param sourceX defines the screen space x coordinate to use
       * @param sourceY defines the screen space y coordinate to use
       * @param viewportWidth defines the current width of the viewport
       * @param viewportHeight defines the current height of the viewport
       * @param world defines the world matrix to use (can be set to Identity to go to world space)
       * @param view defines the view matrix to use
       * @param projection defines the projection matrix to use
       */
      unprojectRayToRef(sourceX, sourceY, viewportWidth, viewportHeight, world, view, projection) {
        const matrix = TmpVectors.Matrix[0];
        world.multiplyToRef(view, matrix);
        matrix.multiplyToRef(projection, matrix);
        matrix.invert();
        const engine = EngineStore.LastCreatedEngine;
        const nearScreenSource = TmpVectors.Vector3[0];
        nearScreenSource.x = sourceX / viewportWidth * 2 - 1;
        nearScreenSource.y = -(sourceY / viewportHeight * 2 - 1);
        nearScreenSource.z = (engine == null ? void 0 : engine.useReverseDepthBuffer) ? 1 : (engine == null ? void 0 : engine.isNDCHalfZRange) ? 0 : -1;
        const farScreenSource = TmpVectors.Vector3[1].copyFromFloats(nearScreenSource.x, nearScreenSource.y, 1 - 1e-8);
        const nearVec3 = TmpVectors.Vector3[2];
        const farVec3 = TmpVectors.Vector3[3];
        Vector3._UnprojectFromInvertedMatrixToRef(nearScreenSource, matrix, nearVec3);
        Vector3._UnprojectFromInvertedMatrixToRef(farScreenSource, matrix, farVec3);
        this.origin.copyFrom(nearVec3);
        farVec3.subtractToRef(nearVec3, this.direction);
        this.direction.normalize();
      }
    };
    Ray._TmpVector3 = ArrayTools.BuildArray(6, Vector3.Zero);
    Ray._RayDistant = Ray.Zero();
    Ray._Smallnum = 1e-8;
    Ray._Rayl = 1e9;
    Scene.prototype.createPickingRay = function(x, y, world, camera, cameraViewSpace = false) {
      const result = Ray.Zero();
      this.createPickingRayToRef(x, y, world, result, camera, cameraViewSpace);
      return result;
    };
    Scene.prototype.createPickingRayToRef = function(x, y, world, result, camera, cameraViewSpace = false, enableDistantPicking = false) {
      const engine = this.getEngine();
      if (!camera && !(camera = this.activeCamera)) {
        return this;
      }
      const cameraViewport = camera.viewport;
      const renderHeight = engine.getRenderHeight();
      const { x: vx, y: vy, width, height } = cameraViewport.toGlobal(engine.getRenderWidth(), renderHeight);
      const levelInv = 1 / engine.getHardwareScalingLevel();
      x = x * levelInv - vx;
      y = y * levelInv - (renderHeight - vy - height);
      result.update(x, y, width, height, world ? world : Matrix.IdentityReadOnly, cameraViewSpace ? Matrix.IdentityReadOnly : camera.getViewMatrix(), camera.getProjectionMatrix(), enableDistantPicking);
      return this;
    };
    Scene.prototype.createPickingRayInCameraSpace = function(x, y, camera) {
      const result = Ray.Zero();
      this.createPickingRayInCameraSpaceToRef(x, y, result, camera);
      return result;
    };
    Scene.prototype.createPickingRayInCameraSpaceToRef = function(x, y, result, camera) {
      if (!PickingInfo) {
        return this;
      }
      const engine = this.getEngine();
      if (!camera && !(camera = this.activeCamera)) {
        throw new Error("Active camera not set");
      }
      const cameraViewport = camera.viewport;
      const renderHeight = engine.getRenderHeight();
      const { x: vx, y: vy, width, height } = cameraViewport.toGlobal(engine.getRenderWidth(), renderHeight);
      const identity = Matrix.Identity();
      const levelInv = 1 / engine.getHardwareScalingLevel();
      x = x * levelInv - vx;
      y = y * levelInv - (renderHeight - vy - height);
      result.update(x, y, width, height, identity, identity, camera.getProjectionMatrix());
      return this;
    };
    Scene.prototype._internalPickForMesh = function(pickingInfo, rayFunction, mesh, world, fastCheck, onlyBoundingInfo, trianglePredicate, skipBoundingInfo) {
      const ray = rayFunction(world, mesh.enableDistantPicking);
      const result = mesh.intersects(ray, fastCheck, trianglePredicate, onlyBoundingInfo, world, skipBoundingInfo);
      if (!result || !result.hit) {
        return null;
      }
      if (!fastCheck && pickingInfo != null && result.distance >= pickingInfo.distance) {
        return null;
      }
      return result;
    };
    Scene.prototype._internalPick = function(rayFunction, predicate, fastCheck, onlyBoundingInfo, trianglePredicate) {
      let pickingInfo = null;
      const computeWorldMatrixForCamera = !!(this.activeCameras && this.activeCameras.length > 1 && this.cameraToUseForPointers !== this.activeCamera);
      const currentCamera = this.cameraToUseForPointers || this.activeCamera;
      for (let meshIndex = 0; meshIndex < this.meshes.length; meshIndex++) {
        const mesh = this.meshes[meshIndex];
        if (predicate) {
          if (!predicate(mesh)) {
            continue;
          }
        } else if (!mesh.isEnabled() || !mesh.isVisible || !mesh.isPickable) {
          continue;
        }
        const forceCompute = computeWorldMatrixForCamera && mesh.isWorldMatrixCameraDependent();
        const world = mesh.computeWorldMatrix(forceCompute, currentCamera);
        if (mesh.hasThinInstances && mesh.thinInstanceEnablePicking) {
          const result = this._internalPickForMesh(pickingInfo, rayFunction, mesh, world, true, true, trianglePredicate);
          if (result) {
            if (onlyBoundingInfo) {
              return result;
            }
            const tmpMatrix = TmpVectors.Matrix[1];
            const thinMatrices = mesh.thinInstanceGetWorldMatrices();
            for (let index = 0; index < thinMatrices.length; index++) {
              const thinMatrix = thinMatrices[index];
              thinMatrix.multiplyToRef(world, tmpMatrix);
              const result2 = this._internalPickForMesh(pickingInfo, rayFunction, mesh, tmpMatrix, fastCheck, onlyBoundingInfo, trianglePredicate, true);
              if (result2) {
                pickingInfo = result2;
                pickingInfo.thinInstanceIndex = index;
                if (fastCheck) {
                  return pickingInfo;
                }
              }
            }
          }
        } else {
          const result = this._internalPickForMesh(pickingInfo, rayFunction, mesh, world, fastCheck, onlyBoundingInfo, trianglePredicate);
          if (result) {
            pickingInfo = result;
            if (fastCheck) {
              return pickingInfo;
            }
          }
        }
      }
      return pickingInfo || new PickingInfo();
    };
    Scene.prototype._internalMultiPick = function(rayFunction, predicate, trianglePredicate) {
      if (!PickingInfo) {
        return null;
      }
      const pickingInfos = [];
      const computeWorldMatrixForCamera = !!(this.activeCameras && this.activeCameras.length > 1 && this.cameraToUseForPointers !== this.activeCamera);
      const currentCamera = this.cameraToUseForPointers || this.activeCamera;
      for (let meshIndex = 0; meshIndex < this.meshes.length; meshIndex++) {
        const mesh = this.meshes[meshIndex];
        if (predicate) {
          if (!predicate(mesh)) {
            continue;
          }
        } else if (!mesh.isEnabled() || !mesh.isVisible || !mesh.isPickable) {
          continue;
        }
        const forceCompute = computeWorldMatrixForCamera && mesh.isWorldMatrixCameraDependent();
        const world = mesh.computeWorldMatrix(forceCompute, currentCamera);
        if (mesh.hasThinInstances && mesh.thinInstanceEnablePicking) {
          const result = this._internalPickForMesh(null, rayFunction, mesh, world, true, true, trianglePredicate);
          if (result) {
            const tmpMatrix = TmpVectors.Matrix[1];
            const thinMatrices = mesh.thinInstanceGetWorldMatrices();
            for (let index = 0; index < thinMatrices.length; index++) {
              const thinMatrix = thinMatrices[index];
              thinMatrix.multiplyToRef(world, tmpMatrix);
              const result2 = this._internalPickForMesh(null, rayFunction, mesh, tmpMatrix, false, false, trianglePredicate, true);
              if (result2) {
                result2.thinInstanceIndex = index;
                pickingInfos.push(result2);
              }
            }
          }
        } else {
          const result = this._internalPickForMesh(null, rayFunction, mesh, world, false, false, trianglePredicate);
          if (result) {
            pickingInfos.push(result);
          }
        }
      }
      return pickingInfos;
    };
    Scene.prototype.pickWithBoundingInfo = function(x, y, predicate, fastCheck, camera) {
      if (!PickingInfo) {
        return null;
      }
      const result = this._internalPick((world) => {
        if (!this._tempPickingRay) {
          this._tempPickingRay = Ray.Zero();
        }
        this.createPickingRayToRef(x, y, world, this._tempPickingRay, camera || null);
        return this._tempPickingRay;
      }, predicate, fastCheck, true);
      if (result) {
        result.ray = this.createPickingRay(x, y, Matrix.Identity(), camera || null);
      }
      return result;
    };
    Object.defineProperty(Scene.prototype, "_pickingAvailable", {
      get: () => true,
      enumerable: false,
      configurable: false
    });
    Scene.prototype.pick = function(x, y, predicate, fastCheck, camera, trianglePredicate, _enableDistantPicking = false) {
      const result = this._internalPick((world, enableDistantPicking) => {
        if (!this._tempPickingRay) {
          this._tempPickingRay = Ray.Zero();
        }
        this.createPickingRayToRef(x, y, world, this._tempPickingRay, camera || null, false, enableDistantPicking);
        return this._tempPickingRay;
      }, predicate, fastCheck, false, trianglePredicate);
      if (result) {
        result.ray = this.createPickingRay(x, y, Matrix.Identity(), camera || null);
      }
      return result;
    };
    Scene.prototype.pickWithRay = function(ray, predicate, fastCheck, trianglePredicate) {
      const result = this._internalPick((world) => {
        if (!this._pickWithRayInverseMatrix) {
          this._pickWithRayInverseMatrix = Matrix.Identity();
        }
        world.invertToRef(this._pickWithRayInverseMatrix);
        if (!this._cachedRayForTransform) {
          this._cachedRayForTransform = Ray.Zero();
        }
        Ray.TransformToRef(ray, this._pickWithRayInverseMatrix, this._cachedRayForTransform);
        return this._cachedRayForTransform;
      }, predicate, fastCheck, false, trianglePredicate);
      if (result) {
        result.ray = ray;
      }
      return result;
    };
    Scene.prototype.multiPick = function(x, y, predicate, camera, trianglePredicate) {
      return this._internalMultiPick((world) => this.createPickingRay(x, y, world, camera || null), predicate, trianglePredicate);
    };
    Scene.prototype.multiPickWithRay = function(ray, predicate, trianglePredicate) {
      return this._internalMultiPick((world) => {
        if (!this._pickWithRayInverseMatrix) {
          this._pickWithRayInverseMatrix = Matrix.Identity();
        }
        world.invertToRef(this._pickWithRayInverseMatrix);
        if (!this._cachedRayForTransform) {
          this._cachedRayForTransform = Ray.Zero();
        }
        Ray.TransformToRef(ray, this._pickWithRayInverseMatrix, this._cachedRayForTransform);
        return this._cachedRayForTransform;
      }, predicate, trianglePredicate);
    };
    Camera.prototype.getForwardRay = function(length = 100, transform, origin) {
      return this.getForwardRayToRef(new Ray(Vector3.Zero(), Vector3.Zero(), length), length, transform, origin);
    };
    Camera.prototype.getForwardRayToRef = function(refRay, length = 100, transform, origin) {
      if (!transform) {
        transform = this.getWorldMatrix();
      }
      refRay.length = length;
      if (origin) {
        refRay.origin.copyFrom(origin);
      } else {
        refRay.origin.copyFrom(this.position);
      }
      const forward = TmpVectors.Vector3[2];
      forward.set(0, 0, this._scene.useRightHandedSystem ? -1 : 1);
      const worldForward = TmpVectors.Vector3[3];
      Vector3.TransformNormalToRef(forward, transform, worldForward);
      Vector3.NormalizeToRef(worldForward, refRay.direction);
      return refRay;
    };
  }
});

// node_modules/@babylonjs/core/Lights/light.js
var Light;
var init_light = __esm({
  "node_modules/@babylonjs/core/Lights/light.js"() {
    init_tslib_es6();
    init_decorators();
    init_math_vector();
    init_math_color();
    init_node();
    init_uniformBuffer();
    init_typeStore();
    init_lightConstants();
    init_decorators_serialization();
    Light = class _Light extends Node {
      /**
       * Defines how far from the source the light is impacting in scene units.
       * Note: Unused in PBR material as the distance light falloff is defined following the inverse squared falloff.
       */
      get range() {
        return this._range;
      }
      /**
       * Defines how far from the source the light is impacting in scene units.
       * Note: Unused in PBR material as the distance light falloff is defined following the inverse squared falloff.
       */
      set range(value) {
        this._range = value;
        this._inverseSquaredRange = 1 / (this.range * this.range);
      }
      /**
       * Gets the photometric scale used to interpret the intensity.
       * This is only relevant with PBR Materials where the light intensity can be defined in a physical way.
       */
      get intensityMode() {
        return this._intensityMode;
      }
      /**
       * Sets the photometric scale used to interpret the intensity.
       * This is only relevant with PBR Materials where the light intensity can be defined in a physical way.
       */
      set intensityMode(value) {
        this._intensityMode = value;
        this._computePhotometricScale();
      }
      /**
       * Gets the light radius used by PBR Materials to simulate soft area lights.
       */
      get radius() {
        return this._radius;
      }
      /**
       * sets the light radius used by PBR Materials to simulate soft area lights.
       */
      set radius(value) {
        this._radius = value;
        this._computePhotometricScale();
      }
      /**
       * Gets whether or not the shadows are enabled for this light. This can help turning off/on shadow without detaching
       * the current shadow generator.
       */
      get shadowEnabled() {
        return this._shadowEnabled;
      }
      /**
       * Sets whether or not the shadows are enabled for this light. This can help turning off/on shadow without detaching
       * the current shadow generator.
       */
      set shadowEnabled(value) {
        if (this._shadowEnabled === value) {
          return;
        }
        this._shadowEnabled = value;
        this._markMeshesAsLightDirty();
      }
      /**
       * Gets the only meshes impacted by this light.
       */
      get includedOnlyMeshes() {
        return this._includedOnlyMeshes;
      }
      /**
       * Sets the only meshes impacted by this light.
       */
      set includedOnlyMeshes(value) {
        this._includedOnlyMeshes = value;
        this._hookArrayForIncludedOnly(value);
      }
      /**
       * Gets the meshes not impacted by this light.
       */
      get excludedMeshes() {
        return this._excludedMeshes;
      }
      /**
       * Sets the meshes not impacted by this light.
       */
      set excludedMeshes(value) {
        this._excludedMeshes = value;
        this._hookArrayForExcluded(value);
      }
      /**
       * Gets the layer id use to find what meshes are not impacted by the light.
       * Inactive if 0
       */
      get excludeWithLayerMask() {
        return this._excludeWithLayerMask;
      }
      /**
       * Sets the layer id use to find what meshes are not impacted by the light.
       * Inactive if 0
       */
      set excludeWithLayerMask(value) {
        this._excludeWithLayerMask = value;
        this._resyncMeshes();
      }
      /**
       * Gets the layer id use to find what meshes are impacted by the light.
       * Inactive if 0
       */
      get includeOnlyWithLayerMask() {
        return this._includeOnlyWithLayerMask;
      }
      /**
       * Sets the layer id use to find what meshes are impacted by the light.
       * Inactive if 0
       */
      set includeOnlyWithLayerMask(value) {
        this._includeOnlyWithLayerMask = value;
        this._resyncMeshes();
      }
      /**
       * Gets the lightmap mode of this light (should be one of the constants defined by Light.LIGHTMAP_x)
       */
      get lightmapMode() {
        return this._lightmapMode;
      }
      /**
       * Sets the lightmap mode of this light (should be one of the constants defined by Light.LIGHTMAP_x)
       */
      set lightmapMode(value) {
        if (this._lightmapMode === value) {
          return;
        }
        this._lightmapMode = value;
        this._markMeshesAsLightDirty();
      }
      /**
       * Returns the view matrix.
       * @param _faceIndex The index of the face for which we want to extract the view matrix. Only used for point light types.
       * @returns The view matrix. Can be null, if a view matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
       */
      getViewMatrix(_faceIndex) {
        return null;
      }
      /**
       * Returns the projection matrix.
       * Note that viewMatrix and renderList are optional and are only used by lights that calculate the projection matrix from a list of meshes (e.g. directional lights with automatic extents calculation).
       * @param _viewMatrix The view transform matrix of the light (optional).
       * @param _renderList The list of meshes to take into account when calculating the projection matrix (optional).
       * @returns The projection matrix. Can be null, if a projection matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
       */
      getProjectionMatrix(_viewMatrix, _renderList) {
        return null;
      }
      /**
       * Creates a Light object in the scene.
       * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
       * @param name The friendly name of the light
       * @param scene The scene the light belongs too
       */
      constructor(name66, scene) {
        super(name66, scene);
        this.diffuse = new Color3(1, 1, 1);
        this.specular = new Color3(1, 1, 1);
        this.falloffType = _Light.FALLOFF_DEFAULT;
        this.intensity = 1;
        this._range = Number.MAX_VALUE;
        this._inverseSquaredRange = 0;
        this._photometricScale = 1;
        this._intensityMode = _Light.INTENSITYMODE_AUTOMATIC;
        this._radius = 1e-5;
        this.renderPriority = 0;
        this._shadowEnabled = true;
        this._excludeWithLayerMask = 0;
        this._includeOnlyWithLayerMask = 0;
        this._lightmapMode = 0;
        this._shadowGenerators = null;
        this._excludedMeshesIds = new Array();
        this._includedOnlyMeshesIds = new Array();
        this._isLight = true;
        this.getScene().addLight(this);
        this._uniformBuffer = new UniformBuffer(this.getScene().getEngine(), void 0, void 0, name66);
        this._buildUniformLayout();
        this.includedOnlyMeshes = [];
        this.excludedMeshes = [];
        this._resyncMeshes();
      }
      /**
       * Sets the passed Effect "effect" with the Light textures.
       * @param effect The effect to update
       * @param lightIndex The index of the light in the effect to update
       * @returns The light
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transferTexturesToEffect(effect, lightIndex) {
        return this;
      }
      /**
       * Binds the lights information from the scene to the effect for the given mesh.
       * @param lightIndex Light index
       * @param scene The scene where the light belongs to
       * @param effect The effect we are binding the data to
       * @param useSpecular Defines if specular is supported
       * @param receiveShadows Defines if the effect (mesh) we bind the light for receives shadows
       */
      _bindLight(lightIndex, scene, effect, useSpecular, receiveShadows = true) {
        const iAsString = lightIndex.toString();
        let needUpdate = false;
        this._uniformBuffer.bindToEffect(effect, "Light" + iAsString);
        if (this._renderId !== scene.getRenderId() || this._lastUseSpecular !== useSpecular || !this._uniformBuffer.useUbo) {
          this._renderId = scene.getRenderId();
          this._lastUseSpecular = useSpecular;
          const scaledIntensity = this.getScaledIntensity();
          this.transferToEffect(effect, iAsString);
          this.diffuse.scaleToRef(scaledIntensity, TmpColors.Color3[0]);
          this._uniformBuffer.updateColor4("vLightDiffuse", TmpColors.Color3[0], this.range, iAsString);
          if (useSpecular) {
            this.specular.scaleToRef(scaledIntensity, TmpColors.Color3[1]);
            this._uniformBuffer.updateColor4("vLightSpecular", TmpColors.Color3[1], this.radius, iAsString);
          }
          needUpdate = true;
        }
        this.transferTexturesToEffect(effect, iAsString);
        if (scene.shadowsEnabled && this.shadowEnabled && receiveShadows) {
          const shadowGenerator = this.getShadowGenerator(scene.activeCamera) ?? this.getShadowGenerator();
          if (shadowGenerator) {
            shadowGenerator.bindShadowLight(iAsString, effect);
            needUpdate = true;
          }
        }
        if (needUpdate) {
          this._uniformBuffer.update();
        } else {
          this._uniformBuffer.bindUniformBuffer();
        }
      }
      /**
       * Returns the string "Light".
       * @returns the class name
       */
      getClassName() {
        return "Light";
      }
      /**
       * Converts the light information to a readable string for debug purpose.
       * @param fullDetails Supports for multiple levels of logging within scene loading
       * @returns the human readable light info
       */
      toString(fullDetails) {
        let ret = "Name: " + this.name;
        ret += ", type: " + ["Point", "Directional", "Spot", "Hemispheric"][this.getTypeID()];
        if (this.animations) {
          for (let i = 0; i < this.animations.length; i++) {
            ret += ", animation[0]: " + this.animations[i].toString(fullDetails);
          }
        }
        return ret;
      }
      /** @internal */
      _syncParentEnabledState() {
        super._syncParentEnabledState();
        if (!this.isDisposed()) {
          this._resyncMeshes();
        }
      }
      /**
       * Set the enabled state of this node.
       * @param value - the new enabled state
       */
      setEnabled(value) {
        super.setEnabled(value);
        this._resyncMeshes();
      }
      /**
       * Returns the Light associated shadow generator if any.
       * @param camera Camera for which the shadow generator should be retrieved (default: null). If null, retrieves the default shadow generator
       * @returns the associated shadow generator.
       */
      getShadowGenerator(camera = null) {
        if (this._shadowGenerators === null) {
          return null;
        }
        return this._shadowGenerators.get(camera) ?? null;
      }
      /**
       * Returns all the shadow generators associated to this light
       * @returns
       */
      getShadowGenerators() {
        return this._shadowGenerators;
      }
      /**
       * Returns a Vector3, the absolute light position in the World.
       * @returns the world space position of the light
       */
      getAbsolutePosition() {
        return Vector3.Zero();
      }
      /**
       * Specifies if the light will affect the passed mesh.
       * @param mesh The mesh to test against the light
       * @returns true the mesh is affected otherwise, false.
       */
      canAffectMesh(mesh) {
        if (!mesh) {
          return true;
        }
        if (this.includedOnlyMeshes && this.includedOnlyMeshes.length > 0 && this.includedOnlyMeshes.indexOf(mesh) === -1) {
          return false;
        }
        if (this.excludedMeshes && this.excludedMeshes.length > 0 && this.excludedMeshes.indexOf(mesh) !== -1) {
          return false;
        }
        if (this.includeOnlyWithLayerMask !== 0 && (this.includeOnlyWithLayerMask & mesh.layerMask) === 0) {
          return false;
        }
        if (this.excludeWithLayerMask !== 0 && this.excludeWithLayerMask & mesh.layerMask) {
          return false;
        }
        return true;
      }
      /**
       * Releases resources associated with this node.
       * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
       * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
       */
      dispose(doNotRecurse, disposeMaterialAndTextures = false) {
        if (this._shadowGenerators) {
          const iterator = this._shadowGenerators.values();
          for (let key = iterator.next(); key.done !== true; key = iterator.next()) {
            const shadowGenerator = key.value;
            shadowGenerator.dispose();
          }
          this._shadowGenerators = null;
        }
        this.getScene().stopAnimation(this);
        if (this._parentContainer) {
          const index = this._parentContainer.lights.indexOf(this);
          if (index > -1) {
            this._parentContainer.lights.splice(index, 1);
          }
          this._parentContainer = null;
        }
        for (const mesh of this.getScene().meshes) {
          mesh._removeLightSource(this, true);
        }
        this._uniformBuffer.dispose();
        this.getScene().removeLight(this);
        super.dispose(doNotRecurse, disposeMaterialAndTextures);
      }
      /**
       * Returns the light type ID (integer).
       * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
       */
      getTypeID() {
        return 0;
      }
      /**
       * Returns the intensity scaled by the Photometric Scale according to the light type and intensity mode.
       * @returns the scaled intensity in intensity mode unit
       */
      getScaledIntensity() {
        return this._photometricScale * this.intensity;
      }
      /**
       * Returns a new Light object, named "name", from the current one.
       * @param name The name of the cloned light
       * @param newParent The parent of this light, if it has one
       * @returns the new created light
       */
      clone(name66, newParent = null) {
        const constructor = _Light.GetConstructorFromName(this.getTypeID(), name66, this.getScene());
        if (!constructor) {
          return null;
        }
        const clonedLight = SerializationHelper.Clone(constructor, this);
        if (name66) {
          clonedLight.name = name66;
        }
        if (newParent) {
          clonedLight.parent = newParent;
        }
        clonedLight.setEnabled(this.isEnabled());
        this.onClonedObservable.notifyObservers(clonedLight);
        return clonedLight;
      }
      /**
       * Serializes the current light into a Serialization object.
       * @returns the serialized object.
       */
      serialize() {
        const serializationObject = SerializationHelper.Serialize(this);
        serializationObject.uniqueId = this.uniqueId;
        serializationObject.type = this.getTypeID();
        if (this.parent) {
          this.parent._serializeAsParent(serializationObject);
        }
        if (this.excludedMeshes.length > 0) {
          serializationObject.excludedMeshesIds = [];
          this.excludedMeshes.forEach((mesh) => {
            serializationObject.excludedMeshesIds.push(mesh.id);
          });
        }
        if (this.includedOnlyMeshes.length > 0) {
          serializationObject.includedOnlyMeshesIds = [];
          this.includedOnlyMeshes.forEach((mesh) => {
            serializationObject.includedOnlyMeshesIds.push(mesh.id);
          });
        }
        SerializationHelper.AppendSerializedAnimations(this, serializationObject);
        serializationObject.ranges = this.serializeAnimationRanges();
        serializationObject.isEnabled = this.isEnabled();
        return serializationObject;
      }
      /**
       * Creates a new typed light from the passed type (integer) : point light = 0, directional light = 1, spot light = 2, hemispheric light = 3.
       * This new light is named "name" and added to the passed scene.
       * @param type Type according to the types available in Light.LIGHTTYPEID_x
       * @param name The friendly name of the light
       * @param scene The scene the new light will belong to
       * @returns the constructor function
       */
      static GetConstructorFromName(type, name66, scene) {
        const constructorFunc = Node.Construct("Light_Type_" + type, name66, scene);
        if (constructorFunc) {
          return constructorFunc;
        }
        return null;
      }
      /**
       * Parses the passed "parsedLight" and returns a new instanced Light from this parsing.
       * @param parsedLight The JSON representation of the light
       * @param scene The scene to create the parsed light in
       * @returns the created light after parsing
       */
      static Parse(parsedLight, scene) {
        const constructor = _Light.GetConstructorFromName(parsedLight.type, parsedLight.name, scene);
        if (!constructor) {
          return null;
        }
        const light = SerializationHelper.Parse(constructor, parsedLight, scene);
        if (parsedLight.excludedMeshesIds) {
          light._excludedMeshesIds = parsedLight.excludedMeshesIds;
        }
        if (parsedLight.includedOnlyMeshesIds) {
          light._includedOnlyMeshesIds = parsedLight.includedOnlyMeshesIds;
        }
        if (parsedLight.parentId !== void 0) {
          light._waitingParentId = parsedLight.parentId;
        }
        if (parsedLight.parentInstanceIndex !== void 0) {
          light._waitingParentInstanceIndex = parsedLight.parentInstanceIndex;
        }
        if (parsedLight.falloffType !== void 0) {
          light.falloffType = parsedLight.falloffType;
        }
        if (parsedLight.lightmapMode !== void 0) {
          light.lightmapMode = parsedLight.lightmapMode;
        }
        if (parsedLight.animations) {
          for (let animationIndex = 0; animationIndex < parsedLight.animations.length; animationIndex++) {
            const parsedAnimation = parsedLight.animations[animationIndex];
            const internalClass = GetClass("BABYLON.Animation");
            if (internalClass) {
              light.animations.push(internalClass.Parse(parsedAnimation));
            }
          }
          Node.ParseAnimationRanges(light, parsedLight, scene);
        }
        if (parsedLight.autoAnimate) {
          scene.beginAnimation(light, parsedLight.autoAnimateFrom, parsedLight.autoAnimateTo, parsedLight.autoAnimateLoop, parsedLight.autoAnimateSpeed || 1);
        }
        if (parsedLight.isEnabled !== void 0) {
          light.setEnabled(parsedLight.isEnabled);
        }
        return light;
      }
      _hookArrayForExcluded(array) {
        const oldPush = array.push;
        array.push = (...items) => {
          const result = oldPush.apply(array, items);
          for (const item of items) {
            item._resyncLightSource(this);
          }
          return result;
        };
        const oldSplice = array.splice;
        array.splice = (index, deleteCount) => {
          const deleted = oldSplice.apply(array, [index, deleteCount]);
          for (const item of deleted) {
            item._resyncLightSource(this);
          }
          return deleted;
        };
        for (const item of array) {
          item._resyncLightSource(this);
        }
      }
      _hookArrayForIncludedOnly(array) {
        const oldPush = array.push;
        array.push = (...items) => {
          const result = oldPush.apply(array, items);
          this._resyncMeshes();
          return result;
        };
        const oldSplice = array.splice;
        array.splice = (index, deleteCount) => {
          const deleted = oldSplice.apply(array, [index, deleteCount]);
          this._resyncMeshes();
          return deleted;
        };
        this._resyncMeshes();
      }
      _resyncMeshes() {
        for (const mesh of this.getScene().meshes) {
          mesh._resyncLightSource(this);
        }
      }
      /**
       * Forces the meshes to update their light related information in their rendering used effects
       * @internal Internal Use Only
       */
      _markMeshesAsLightDirty() {
        for (const mesh of this.getScene().meshes) {
          if (mesh.lightSources.indexOf(this) !== -1) {
            mesh._markSubMeshesAsLightDirty();
          }
        }
      }
      /**
       * Recomputes the cached photometric scale if needed.
       */
      _computePhotometricScale() {
        this._photometricScale = this._getPhotometricScale();
        this.getScene().resetCachedMaterial();
      }
      /**
       * @returns the Photometric Scale according to the light type and intensity mode.
       */
      _getPhotometricScale() {
        let photometricScale = 0;
        const lightTypeID = this.getTypeID();
        let photometricMode = this.intensityMode;
        if (photometricMode === _Light.INTENSITYMODE_AUTOMATIC) {
          if (lightTypeID === _Light.LIGHTTYPEID_DIRECTIONALLIGHT) {
            photometricMode = _Light.INTENSITYMODE_ILLUMINANCE;
          } else {
            photometricMode = _Light.INTENSITYMODE_LUMINOUSINTENSITY;
          }
        }
        switch (lightTypeID) {
          case _Light.LIGHTTYPEID_POINTLIGHT:
          case _Light.LIGHTTYPEID_SPOTLIGHT:
            switch (photometricMode) {
              case _Light.INTENSITYMODE_LUMINOUSPOWER:
                photometricScale = 1 / (4 * Math.PI);
                break;
              case _Light.INTENSITYMODE_LUMINOUSINTENSITY:
                photometricScale = 1;
                break;
              case _Light.INTENSITYMODE_LUMINANCE:
                photometricScale = this.radius * this.radius;
                break;
            }
            break;
          case _Light.LIGHTTYPEID_DIRECTIONALLIGHT:
            switch (photometricMode) {
              case _Light.INTENSITYMODE_ILLUMINANCE:
                photometricScale = 1;
                break;
              case _Light.INTENSITYMODE_LUMINANCE: {
                let apexAngleRadians = this.radius;
                apexAngleRadians = Math.max(apexAngleRadians, 1e-3);
                const solidAngle = 2 * Math.PI * (1 - Math.cos(apexAngleRadians));
                photometricScale = solidAngle;
                break;
              }
            }
            break;
          case _Light.LIGHTTYPEID_HEMISPHERICLIGHT:
            photometricScale = 1;
            break;
        }
        return photometricScale;
      }
      /**
       * Reorder the light in the scene according to their defined priority.
       * @internal Internal Use Only
       */
      _reorderLightsInScene() {
        const scene = this.getScene();
        if (this._renderPriority != 0) {
          scene.requireLightSorting = true;
        }
        this.getScene().sortLightsByPriority();
      }
    };
    Light.FALLOFF_DEFAULT = LightConstants.FALLOFF_DEFAULT;
    Light.FALLOFF_PHYSICAL = LightConstants.FALLOFF_PHYSICAL;
    Light.FALLOFF_GLTF = LightConstants.FALLOFF_GLTF;
    Light.FALLOFF_STANDARD = LightConstants.FALLOFF_STANDARD;
    Light.LIGHTMAP_DEFAULT = LightConstants.LIGHTMAP_DEFAULT;
    Light.LIGHTMAP_SPECULAR = LightConstants.LIGHTMAP_SPECULAR;
    Light.LIGHTMAP_SHADOWSONLY = LightConstants.LIGHTMAP_SHADOWSONLY;
    Light.INTENSITYMODE_AUTOMATIC = LightConstants.INTENSITYMODE_AUTOMATIC;
    Light.INTENSITYMODE_LUMINOUSPOWER = LightConstants.INTENSITYMODE_LUMINOUSPOWER;
    Light.INTENSITYMODE_LUMINOUSINTENSITY = LightConstants.INTENSITYMODE_LUMINOUSINTENSITY;
    Light.INTENSITYMODE_ILLUMINANCE = LightConstants.INTENSITYMODE_ILLUMINANCE;
    Light.INTENSITYMODE_LUMINANCE = LightConstants.INTENSITYMODE_LUMINANCE;
    Light.LIGHTTYPEID_POINTLIGHT = LightConstants.LIGHTTYPEID_POINTLIGHT;
    Light.LIGHTTYPEID_DIRECTIONALLIGHT = LightConstants.LIGHTTYPEID_DIRECTIONALLIGHT;
    Light.LIGHTTYPEID_SPOTLIGHT = LightConstants.LIGHTTYPEID_SPOTLIGHT;
    Light.LIGHTTYPEID_HEMISPHERICLIGHT = LightConstants.LIGHTTYPEID_HEMISPHERICLIGHT;
    __decorate([
      serializeAsColor3()
    ], Light.prototype, "diffuse", void 0);
    __decorate([
      serializeAsColor3()
    ], Light.prototype, "specular", void 0);
    __decorate([
      serialize()
    ], Light.prototype, "falloffType", void 0);
    __decorate([
      serialize()
    ], Light.prototype, "intensity", void 0);
    __decorate([
      serialize()
    ], Light.prototype, "range", null);
    __decorate([
      serialize()
    ], Light.prototype, "intensityMode", null);
    __decorate([
      serialize()
    ], Light.prototype, "radius", null);
    __decorate([
      serialize()
    ], Light.prototype, "_renderPriority", void 0);
    __decorate([
      expandToProperty("_reorderLightsInScene")
    ], Light.prototype, "renderPriority", void 0);
    __decorate([
      serialize("shadowEnabled")
    ], Light.prototype, "_shadowEnabled", void 0);
    __decorate([
      serialize("excludeWithLayerMask")
    ], Light.prototype, "_excludeWithLayerMask", void 0);
    __decorate([
      serialize("includeOnlyWithLayerMask")
    ], Light.prototype, "_includeOnlyWithLayerMask", void 0);
    __decorate([
      serialize("lightmapMode")
    ], Light.prototype, "_lightmapMode", void 0);
  }
});

// node_modules/@babylonjs/core/Lights/hemisphericLight.js
var HemisphericLight;
var init_hemisphericLight = __esm({
  "node_modules/@babylonjs/core/Lights/hemisphericLight.js"() {
    init_tslib_es6();
    init_decorators();
    init_math_vector();
    init_math_color();
    init_node();
    init_light();
    Node.AddNodeConstructor("Light_Type_3", (name66, scene) => {
      return () => new HemisphericLight(name66, Vector3.Zero(), scene);
    });
    HemisphericLight = class extends Light {
      /**
       * Creates a HemisphericLight object in the scene according to the passed direction (Vector3).
       * The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction.
       * The HemisphericLight can't cast shadows.
       * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
       * @param name The friendly name of the light
       * @param direction The direction of the light reflection
       * @param scene The scene the light belongs to
       */
      constructor(name66, direction, scene) {
        super(name66, scene);
        this.groundColor = new Color3(0, 0, 0);
        this.direction = direction || Vector3.Up();
      }
      _buildUniformLayout() {
        this._uniformBuffer.addUniform("vLightData", 4);
        this._uniformBuffer.addUniform("vLightDiffuse", 4);
        this._uniformBuffer.addUniform("vLightSpecular", 4);
        this._uniformBuffer.addUniform("vLightGround", 3);
        this._uniformBuffer.addUniform("shadowsInfo", 3);
        this._uniformBuffer.addUniform("depthValues", 2);
        this._uniformBuffer.create();
      }
      /**
       * Returns the string "HemisphericLight".
       * @returns The class name
       */
      getClassName() {
        return "HemisphericLight";
      }
      /**
       * Sets the HemisphericLight direction towards the passed target (Vector3).
       * Returns the updated direction.
       * @param target The target the direction should point to
       * @returns The computed direction
       */
      setDirectionToTarget(target) {
        this.direction = Vector3.Normalize(target.subtract(Vector3.Zero()));
        return this.direction;
      }
      /**
       * Returns the shadow generator associated to the light.
       * @returns Always null for hemispheric lights because it does not support shadows.
       */
      getShadowGenerator() {
        return null;
      }
      /**
       * Sets the passed Effect object with the HemisphericLight normalized direction and color and the passed name (string).
       * @param _effect The effect to update
       * @param lightIndex The index of the light in the effect to update
       * @returns The hemispheric light
       */
      transferToEffect(_effect, lightIndex) {
        const normalizeDirection = Vector3.Normalize(this.direction);
        this._uniformBuffer.updateFloat4("vLightData", normalizeDirection.x, normalizeDirection.y, normalizeDirection.z, 0, lightIndex);
        this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), lightIndex);
        return this;
      }
      transferToNodeMaterialEffect(effect, lightDataUniformName) {
        const normalizeDirection = Vector3.Normalize(this.direction);
        effect.setFloat3(lightDataUniformName, normalizeDirection.x, normalizeDirection.y, normalizeDirection.z);
        return this;
      }
      /**
       * Computes the world matrix of the node
       * @returns the world matrix
       */
      computeWorldMatrix() {
        if (!this._worldMatrix) {
          this._worldMatrix = Matrix.Identity();
        }
        return this._worldMatrix;
      }
      /**
       * Returns the integer 3.
       * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
       */
      getTypeID() {
        return Light.LIGHTTYPEID_HEMISPHERICLIGHT;
      }
      /**
       * Prepares the list of defines specific to the light type.
       * @param defines the list of defines
       * @param lightIndex defines the index of the light for the effect
       */
      prepareLightSpecificDefines(defines, lightIndex) {
        defines["HEMILIGHT" + lightIndex] = true;
      }
    };
    __decorate([
      serializeAsColor3()
    ], HemisphericLight.prototype, "groundColor", void 0);
    __decorate([
      serializeAsVector3()
    ], HemisphericLight.prototype, "direction", void 0);
  }
});

// node_modules/@babylonjs/core/Rendering/utilityLayerRenderer.js
var UtilityLayerRenderer;
var init_utilityLayerRenderer = __esm({
  "node_modules/@babylonjs/core/Rendering/utilityLayerRenderer.js"() {
    init_scene();
    init_observable();
    init_pointerEvents();
    init_pickingInfo();
    init_engineStore();
    init_hemisphericLight();
    init_math_vector();
    init_math_color();
    UtilityLayerRenderer = class _UtilityLayerRenderer {
      /**
       * Gets the camera that is used to render the utility layer (when not set, this will be the last active camera)
       * @param getRigParentIfPossible if the current active camera is a rig camera, should its parent camera be returned
       * @returns the camera that is used when rendering the utility layer
       */
      getRenderCamera(getRigParentIfPossible) {
        if (this._renderCamera) {
          return this._renderCamera;
        } else {
          let activeCam;
          if (this.originalScene.activeCameras && this.originalScene.activeCameras.length > 1) {
            activeCam = this.originalScene.activeCameras[this.originalScene.activeCameras.length - 1];
          } else {
            activeCam = this.originalScene.activeCamera;
          }
          if (getRigParentIfPossible && activeCam && activeCam.isRigCamera) {
            return activeCam.rigParent;
          }
          return activeCam;
        }
      }
      /**
       * Sets the camera that should be used when rendering the utility layer (If set to null the last active camera will be used)
       * @param cam the camera that should be used when rendering the utility layer
       */
      setRenderCamera(cam) {
        this._renderCamera = cam;
      }
      /**
       * @internal
       * Light which used by gizmos to get light shading
       */
      _getSharedGizmoLight() {
        if (!this._sharedGizmoLight) {
          this._sharedGizmoLight = new HemisphericLight("shared gizmo light", new Vector3(0, 1, 0), this.utilityLayerScene);
          this._sharedGizmoLight.intensity = 2;
          this._sharedGizmoLight.groundColor = Color3.Gray();
        }
        return this._sharedGizmoLight;
      }
      /**
       * A shared utility layer that can be used to overlay objects into a scene (Depth map of the previous scene is cleared before drawing on top of it)
       */
      static get DefaultUtilityLayer() {
        if (_UtilityLayerRenderer._DefaultUtilityLayer == null) {
          return _UtilityLayerRenderer._CreateDefaultUtilityLayerFromScene(EngineStore.LastCreatedScene);
        }
        return _UtilityLayerRenderer._DefaultUtilityLayer;
      }
      /**
       * Creates an utility layer, and set it as a default utility layer
       * @param scene associated scene
       * @internal
       */
      static _CreateDefaultUtilityLayerFromScene(scene) {
        _UtilityLayerRenderer._DefaultUtilityLayer = new _UtilityLayerRenderer(scene);
        _UtilityLayerRenderer._DefaultUtilityLayer.originalScene.onDisposeObservable.addOnce(() => {
          _UtilityLayerRenderer._DefaultUtilityLayer = null;
        });
        return _UtilityLayerRenderer._DefaultUtilityLayer;
      }
      /**
       * A shared utility layer that can be used to embed objects into a scene (Depth map of the previous scene is not cleared before drawing on top of it)
       */
      static get DefaultKeepDepthUtilityLayer() {
        if (_UtilityLayerRenderer._DefaultKeepDepthUtilityLayer == null) {
          _UtilityLayerRenderer._DefaultKeepDepthUtilityLayer = new _UtilityLayerRenderer(EngineStore.LastCreatedScene);
          _UtilityLayerRenderer._DefaultKeepDepthUtilityLayer.utilityLayerScene.autoClearDepthAndStencil = false;
          _UtilityLayerRenderer._DefaultKeepDepthUtilityLayer.originalScene.onDisposeObservable.addOnce(() => {
            _UtilityLayerRenderer._DefaultKeepDepthUtilityLayer = null;
          });
        }
        return _UtilityLayerRenderer._DefaultKeepDepthUtilityLayer;
      }
      /**
       * Instantiates a UtilityLayerRenderer
       * @param originalScene the original scene that will be rendered on top of
       * @param handleEvents boolean indicating if the utility layer should handle events
       */
      constructor(originalScene, handleEvents = true) {
        this.originalScene = originalScene;
        this._pointerCaptures = {};
        this._lastPointerEvents = {};
        this._sharedGizmoLight = null;
        this._renderCamera = null;
        this.pickUtilitySceneFirst = true;
        this.shouldRender = true;
        this.onlyCheckPointerDownEvents = true;
        this.processAllEvents = false;
        this.pickingEnabled = true;
        this.onPointerOutObservable = new Observable();
        this.utilityLayerScene = new Scene(originalScene.getEngine(), { virtual: true });
        this.utilityLayerScene.useRightHandedSystem = originalScene.useRightHandedSystem;
        this.utilityLayerScene._allowPostProcessClearColor = false;
        this.utilityLayerScene.postProcessesEnabled = false;
        this.utilityLayerScene.detachControl();
        if (handleEvents) {
          this._originalPointerObserver = originalScene.onPrePointerObservable.add((prePointerInfo) => {
            if (!this.utilityLayerScene.activeCamera) {
              return;
            }
            if (!this.pickingEnabled) {
              return;
            }
            if (!this.processAllEvents) {
              if (prePointerInfo.type !== PointerEventTypes.POINTERMOVE && prePointerInfo.type !== PointerEventTypes.POINTERUP && prePointerInfo.type !== PointerEventTypes.POINTERDOWN && prePointerInfo.type !== PointerEventTypes.POINTERDOUBLETAP) {
                return;
              }
            }
            this.utilityLayerScene.pointerX = originalScene.pointerX;
            this.utilityLayerScene.pointerY = originalScene.pointerY;
            const pointerEvent = prePointerInfo.event;
            if (originalScene.isPointerCaptured(pointerEvent.pointerId)) {
              this._pointerCaptures[pointerEvent.pointerId] = false;
              return;
            }
            const getNearPickDataForScene = (scene) => {
              let scenePick = null;
              if (prePointerInfo.nearInteractionPickingInfo) {
                if (prePointerInfo.nearInteractionPickingInfo.pickedMesh.getScene() == scene) {
                  scenePick = prePointerInfo.nearInteractionPickingInfo;
                } else {
                  scenePick = new PickingInfo();
                }
              } else if (scene !== this.utilityLayerScene && prePointerInfo.originalPickingInfo) {
                scenePick = prePointerInfo.originalPickingInfo;
              } else {
                let previousActiveCamera = null;
                if (this._renderCamera) {
                  previousActiveCamera = scene._activeCamera;
                  scene._activeCamera = this._renderCamera;
                  prePointerInfo.ray = null;
                }
                scenePick = prePointerInfo.ray ? scene.pickWithRay(prePointerInfo.ray) : scene.pick(originalScene.pointerX, originalScene.pointerY);
                if (previousActiveCamera) {
                  scene._activeCamera = previousActiveCamera;
                }
              }
              return scenePick;
            };
            const utilityScenePick = getNearPickDataForScene(this.utilityLayerScene);
            if (!prePointerInfo.ray && utilityScenePick) {
              prePointerInfo.ray = utilityScenePick.ray;
            }
            this.utilityLayerScene.onPrePointerObservable.notifyObservers(prePointerInfo);
            if (this.onlyCheckPointerDownEvents && prePointerInfo.type != PointerEventTypes.POINTERDOWN) {
              if (!prePointerInfo.skipOnPointerObservable) {
                this.utilityLayerScene.onPointerObservable.notifyObservers(new PointerInfo(prePointerInfo.type, prePointerInfo.event, utilityScenePick), prePointerInfo.type);
              }
              if (prePointerInfo.type === PointerEventTypes.POINTERUP && this._pointerCaptures[pointerEvent.pointerId]) {
                this._pointerCaptures[pointerEvent.pointerId] = false;
              }
              return;
            }
            if (this.utilityLayerScene.autoClearDepthAndStencil || this.pickUtilitySceneFirst) {
              if (utilityScenePick && utilityScenePick.hit) {
                if (!prePointerInfo.skipOnPointerObservable) {
                  this.utilityLayerScene.onPointerObservable.notifyObservers(new PointerInfo(prePointerInfo.type, prePointerInfo.event, utilityScenePick), prePointerInfo.type);
                }
                prePointerInfo.skipOnPointerObservable = true;
              }
            } else {
              const originalScenePick = getNearPickDataForScene(originalScene);
              const pointerEvent2 = prePointerInfo.event;
              if (originalScenePick && utilityScenePick) {
                if (utilityScenePick.distance === 0 && originalScenePick.pickedMesh) {
                  if (this.mainSceneTrackerPredicate && this.mainSceneTrackerPredicate(originalScenePick.pickedMesh)) {
                    this._notifyObservers(prePointerInfo, originalScenePick, pointerEvent2);
                    prePointerInfo.skipOnPointerObservable = true;
                  } else if (prePointerInfo.type === PointerEventTypes.POINTERDOWN) {
                    this._pointerCaptures[pointerEvent2.pointerId] = true;
                  } else if (prePointerInfo.type === PointerEventTypes.POINTERMOVE || prePointerInfo.type === PointerEventTypes.POINTERUP) {
                    if (this._lastPointerEvents[pointerEvent2.pointerId]) {
                      this.onPointerOutObservable.notifyObservers(pointerEvent2.pointerId);
                      delete this._lastPointerEvents[pointerEvent2.pointerId];
                    }
                    this._notifyObservers(prePointerInfo, originalScenePick, pointerEvent2);
                  }
                } else if (!this._pointerCaptures[pointerEvent2.pointerId] && (utilityScenePick.distance < originalScenePick.distance || originalScenePick.distance === 0)) {
                  this._notifyObservers(prePointerInfo, utilityScenePick, pointerEvent2);
                  if (!prePointerInfo.skipOnPointerObservable) {
                    prePointerInfo.skipOnPointerObservable = utilityScenePick.distance > 0;
                  }
                } else if (!this._pointerCaptures[pointerEvent2.pointerId] && utilityScenePick.distance >= originalScenePick.distance) {
                  if (this.mainSceneTrackerPredicate && this.mainSceneTrackerPredicate(originalScenePick.pickedMesh)) {
                    this._notifyObservers(prePointerInfo, originalScenePick, pointerEvent2);
                    prePointerInfo.skipOnPointerObservable = true;
                  } else {
                    if (prePointerInfo.type === PointerEventTypes.POINTERMOVE || prePointerInfo.type === PointerEventTypes.POINTERUP) {
                      if (this._lastPointerEvents[pointerEvent2.pointerId]) {
                        this.onPointerOutObservable.notifyObservers(pointerEvent2.pointerId);
                        delete this._lastPointerEvents[pointerEvent2.pointerId];
                      }
                    }
                    this._notifyObservers(prePointerInfo, utilityScenePick, pointerEvent2);
                  }
                }
                if (prePointerInfo.type === PointerEventTypes.POINTERUP && this._pointerCaptures[pointerEvent2.pointerId]) {
                  this._pointerCaptures[pointerEvent2.pointerId] = false;
                }
              }
            }
          });
          if (this._originalPointerObserver) {
            originalScene.onPrePointerObservable.makeObserverTopPriority(this._originalPointerObserver);
          }
        }
        this.utilityLayerScene.autoClear = false;
        this._afterRenderObserver = this.originalScene.onAfterRenderCameraObservable.add((camera) => {
          if (this.shouldRender && camera == this.getRenderCamera()) {
            this.render();
          }
        });
        this._sceneDisposeObserver = this.originalScene.onDisposeObservable.add(() => {
          this.dispose();
        });
        this._updateCamera();
      }
      _notifyObservers(prePointerInfo, pickInfo, pointerEvent) {
        if (!prePointerInfo.skipOnPointerObservable) {
          this.utilityLayerScene.onPointerObservable.notifyObservers(new PointerInfo(prePointerInfo.type, prePointerInfo.event, pickInfo), prePointerInfo.type);
          this._lastPointerEvents[pointerEvent.pointerId] = true;
        }
      }
      /**
       * Renders the utility layers scene on top of the original scene
       */
      render() {
        this._updateCamera();
        if (this.utilityLayerScene.activeCamera) {
          const oldScene = this.utilityLayerScene.activeCamera.getScene();
          const camera = this.utilityLayerScene.activeCamera;
          camera._scene = this.utilityLayerScene;
          if (camera.leftCamera) {
            camera.leftCamera._scene = this.utilityLayerScene;
          }
          if (camera.rightCamera) {
            camera.rightCamera._scene = this.utilityLayerScene;
          }
          this.utilityLayerScene.render(false);
          camera._scene = oldScene;
          if (camera.leftCamera) {
            camera.leftCamera._scene = oldScene;
          }
          if (camera.rightCamera) {
            camera.rightCamera._scene = oldScene;
          }
        }
      }
      /**
       * Disposes of the renderer
       */
      dispose() {
        this.onPointerOutObservable.clear();
        if (this._afterRenderObserver) {
          this.originalScene.onAfterCameraRenderObservable.remove(this._afterRenderObserver);
        }
        if (this._sceneDisposeObserver) {
          this.originalScene.onDisposeObservable.remove(this._sceneDisposeObserver);
        }
        if (this._originalPointerObserver) {
          this.originalScene.onPrePointerObservable.remove(this._originalPointerObserver);
        }
        this.utilityLayerScene.dispose();
      }
      _updateCamera() {
        this.utilityLayerScene.cameraToUseForPointers = this.getRenderCamera();
        this.utilityLayerScene.activeCamera = this.getRenderCamera();
      }
    };
    UtilityLayerRenderer._DefaultUtilityLayer = null;
    UtilityLayerRenderer._DefaultKeepDepthUtilityLayer = null;
  }
});

// node_modules/@babylonjs/core/XR/features/WebXRControllerPointerSelection.js
var WebXRControllerPointerSelection;
var init_WebXRControllerPointerSelection = __esm({
  "node_modules/@babylonjs/core/XR/features/WebXRControllerPointerSelection.js"() {
    init_webXRFeaturesManager();
    init_math_vector();
    init_math_color();
    init_math_axis();
    init_standardMaterial();
    init_cylinderBuilder();
    init_torusBuilder();
    init_ray();
    init_pickingInfo();
    init_WebXRAbstractFeature();
    init_utilityLayerRenderer();
    init_math_viewport();
    init_tools();
    WebXRControllerPointerSelection = class _WebXRControllerPointerSelection extends WebXRAbstractFeature {
      /**
       * constructs a new background remover module
       * @param _xrSessionManager the session manager for this module
       * @param _options read-only options to be used in this module
       */
      constructor(_xrSessionManager, _options) {
        super(_xrSessionManager);
        this._options = _options;
        this._attachController = (xrController) => {
          if (this._controllers[xrController.uniqueId]) {
            return;
          }
          const { laserPointer, selectionMesh } = this._generateNewMeshPair(this._options.forceGripIfAvailable && xrController.grip ? xrController.grip : xrController.pointer);
          this._controllers[xrController.uniqueId] = {
            xrController,
            laserPointer,
            selectionMesh,
            meshUnderPointer: null,
            pick: null,
            tmpRay: new Ray(new Vector3(), new Vector3()),
            disabledByNearInteraction: false,
            id: _WebXRControllerPointerSelection._IdCounter++
          };
          if (this._attachedController) {
            if (!this._options.enablePointerSelectionOnAllControllers && this._options.preferredHandedness && xrController.inputSource.handedness === this._options.preferredHandedness) {
              this._attachedController = xrController.uniqueId;
            }
          } else {
            if (!this._options.enablePointerSelectionOnAllControllers) {
              this._attachedController = xrController.uniqueId;
            }
          }
          switch (xrController.inputSource.targetRayMode) {
            case "tracked-pointer":
              return this._attachTrackedPointerRayMode(xrController);
            case "gaze":
              return this._attachGazeMode(xrController);
            case "screen":
            case "transient-pointer":
              return this._attachScreenRayMode(xrController);
          }
        };
        this._controllers = {};
        this._tmpVectorForPickCompare = new Vector3();
        this.disablePointerLighting = true;
        this.disableSelectionMeshLighting = true;
        this.displayLaserPointer = true;
        this.displaySelectionMesh = true;
        this.laserPointerPickedColor = new Color3(0.9, 0.9, 0.9);
        this.laserPointerDefaultColor = new Color3(0.7, 0.7, 0.7);
        this.selectionMeshDefaultColor = new Color3(0.8, 0.8, 0.8);
        this.selectionMeshPickedColor = new Color3(0.3, 0.3, 1);
        this._identityMatrix = Matrix.Identity();
        this._screenCoordinatesRef = Vector3.Zero();
        this._viewportRef = new Viewport(0, 0, 0, 0);
        this._scene = this._xrSessionManager.scene;
        if (this._options.lookAndPickMode === void 0 && (this._scene.getEngine()._badDesktopOS || this._scene.getEngine()._badOS)) {
          this._options.lookAndPickMode = true;
        }
        if (this._options.lookAndPickMode) {
          this._options.enablePointerSelectionOnAllControllers = true;
          this.displayLaserPointer = false;
        }
      }
      /**
       * attach this feature
       * Will usually be called by the features manager
       *
       * @returns true if successful.
       */
      attach() {
        if (!super.attach()) {
          return false;
        }
        this._options.xrInput.controllers.forEach(this._attachController);
        this._addNewAttachObserver(this._options.xrInput.onControllerAddedObservable, this._attachController, true);
        this._addNewAttachObserver(this._options.xrInput.onControllerRemovedObservable, (controller) => {
          this._detachController(controller.uniqueId);
        }, true);
        this._scene.constantlyUpdateMeshUnderPointer = true;
        if (this._options.gazeCamera) {
          const webXRCamera = this._options.gazeCamera;
          const { laserPointer, selectionMesh } = this._generateNewMeshPair(webXRCamera);
          this._controllers["camera"] = {
            webXRCamera,
            laserPointer,
            selectionMesh,
            meshUnderPointer: null,
            pick: null,
            tmpRay: new Ray(new Vector3(), new Vector3()),
            disabledByNearInteraction: false,
            id: _WebXRControllerPointerSelection._IdCounter++
          };
          this._attachGazeMode();
        }
        return true;
      }
      /**
       * detach this feature.
       * Will usually be called by the features manager
       *
       * @returns true if successful.
       */
      detach() {
        if (!super.detach()) {
          return false;
        }
        Object.keys(this._controllers).forEach((controllerId) => {
          this._detachController(controllerId);
        });
        return true;
      }
      /**
       * Will get the mesh under a specific pointer.
       * `scene.meshUnderPointer` will only return one mesh - either left or right.
       * @param controllerId the controllerId to check
       * @returns The mesh under pointer or null if no mesh is under the pointer
       */
      getMeshUnderPointer(controllerId) {
        if (this._controllers[controllerId]) {
          return this._controllers[controllerId].meshUnderPointer;
        } else {
          return null;
        }
      }
      /**
       * Get the xr controller that correlates to the pointer id in the pointer event
       *
       * @param id the pointer id to search for
       * @returns the controller that correlates to this id or null if not found
       */
      getXRControllerByPointerId(id) {
        const keys = Object.keys(this._controllers);
        for (let i = 0; i < keys.length; ++i) {
          if (this._controllers[keys[i]].id === id) {
            return this._controllers[keys[i]].xrController || null;
          }
        }
        return null;
      }
      /**
       * @internal
       */
      _getPointerSelectionDisabledByPointerId(id) {
        const keys = Object.keys(this._controllers);
        for (let i = 0; i < keys.length; ++i) {
          if (this._controllers[keys[i]].id === id) {
            return this._controllers[keys[i]].disabledByNearInteraction;
          }
        }
        return true;
      }
      /**
       * @internal
       */
      _setPointerSelectionDisabledByPointerId(id, state) {
        const keys = Object.keys(this._controllers);
        for (let i = 0; i < keys.length; ++i) {
          if (this._controllers[keys[i]].id === id) {
            this._controllers[keys[i]].disabledByNearInteraction = state;
            return;
          }
        }
      }
      _onXRFrame(_xrFrame) {
        Object.keys(this._controllers).forEach((id) => {
          var _a;
          const controllerData = this._controllers[id];
          if (this._options.lookAndPickMode && ((_a = controllerData.xrController) == null ? void 0 : _a.inputSource.targetRayMode) !== "transient-pointer") {
            return;
          }
          if (!this._options.enablePointerSelectionOnAllControllers && id !== this._attachedController || controllerData.disabledByNearInteraction) {
            controllerData.selectionMesh.isVisible = false;
            controllerData.laserPointer.isVisible = false;
            controllerData.pick = null;
            return;
          }
          controllerData.laserPointer.isVisible = this.displayLaserPointer;
          let controllerGlobalPosition;
          if (controllerData.xrController) {
            controllerGlobalPosition = this._options.forceGripIfAvailable && controllerData.xrController.grip ? controllerData.xrController.grip.position : controllerData.xrController.pointer.position;
            controllerData.xrController.getWorldPointerRayToRef(controllerData.tmpRay, this._options.forceGripIfAvailable);
          } else if (controllerData.webXRCamera) {
            controllerGlobalPosition = controllerData.webXRCamera.position;
            controllerData.webXRCamera.getForwardRayToRef(controllerData.tmpRay);
          } else {
            return;
          }
          if (this._options.maxPointerDistance) {
            controllerData.tmpRay.length = this._options.maxPointerDistance;
          }
          if (!this._options.disableScenePointerVectorUpdate && controllerGlobalPosition) {
            const scene = this._xrSessionManager.scene;
            const camera = this._options.xrInput.xrCamera;
            if (camera) {
              camera.viewport.toGlobalToRef(scene.getEngine().getRenderWidth() / camera.rigCameras.length, scene.getEngine().getRenderHeight(), this._viewportRef);
              Vector3.ProjectToRef(controllerGlobalPosition, this._identityMatrix, camera.getTransformationMatrix(), this._viewportRef, this._screenCoordinatesRef);
              if (typeof this._screenCoordinatesRef.x === "number" && typeof this._screenCoordinatesRef.y === "number" && !isNaN(this._screenCoordinatesRef.x) && !isNaN(this._screenCoordinatesRef.y) && this._screenCoordinatesRef.x !== Infinity && this._screenCoordinatesRef.y !== Infinity) {
                scene.pointerX = this._screenCoordinatesRef.x;
                scene.pointerY = this._screenCoordinatesRef.y;
                controllerData.screenCoordinates = {
                  x: this._screenCoordinatesRef.x,
                  y: this._screenCoordinatesRef.y
                };
              }
            }
          }
          let utilityScenePick = null;
          if (this._utilityLayerScene) {
            utilityScenePick = this._utilityLayerScene.pickWithRay(controllerData.tmpRay, this._utilityLayerScene.pointerMovePredicate || this.raySelectionPredicate);
          }
          const originalScenePick = this._scene.pickWithRay(controllerData.tmpRay, this._scene.pointerMovePredicate || this.raySelectionPredicate);
          if (!utilityScenePick || !utilityScenePick.hit) {
            controllerData.pick = originalScenePick;
          } else if (!originalScenePick || !originalScenePick.hit) {
            controllerData.pick = utilityScenePick;
          } else if (utilityScenePick.distance < originalScenePick.distance) {
            controllerData.pick = utilityScenePick;
          } else {
            controllerData.pick = originalScenePick;
          }
          if (controllerData.pick && controllerData.xrController) {
            controllerData.pick.aimTransform = controllerData.xrController.pointer;
            controllerData.pick.gripTransform = controllerData.xrController.grip || null;
            controllerData.pick.originMesh = controllerData.xrController.pointer;
          }
          const pick = controllerData.pick;
          if (pick && pick.pickedPoint && pick.hit) {
            this._updatePointerDistance(controllerData.laserPointer, pick.distance);
            controllerData.selectionMesh.position.copyFrom(pick.pickedPoint);
            controllerData.selectionMesh.scaling.x = Math.sqrt(pick.distance);
            controllerData.selectionMesh.scaling.y = Math.sqrt(pick.distance);
            controllerData.selectionMesh.scaling.z = Math.sqrt(pick.distance);
            const pickNormal = this._convertNormalToDirectionOfRay(pick.getNormal(true), controllerData.tmpRay);
            const deltaFighting = 1e-3;
            controllerData.selectionMesh.position.copyFrom(pick.pickedPoint);
            if (pickNormal) {
              const axis1 = Vector3.Cross(Axis.Y, pickNormal);
              const axis2 = Vector3.Cross(pickNormal, axis1);
              Vector3.RotationFromAxisToRef(axis2, pickNormal, axis1, controllerData.selectionMesh.rotation);
              controllerData.selectionMesh.position.addInPlace(pickNormal.scale(deltaFighting));
            }
            controllerData.selectionMesh.isVisible = this.displaySelectionMesh;
            controllerData.meshUnderPointer = pick.pickedMesh;
          } else {
            controllerData.selectionMesh.isVisible = false;
            this._updatePointerDistance(controllerData.laserPointer, 1);
            controllerData.meshUnderPointer = null;
          }
        });
      }
      get _utilityLayerScene() {
        return this._options.customUtilityLayerScene || UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene;
      }
      _attachGazeMode(xrController) {
        const controllerData = this._controllers[xrController && xrController.uniqueId || "camera"];
        const timeToSelect = this._options.timeToSelect || 3e3;
        const sceneToRenderTo = this._options.useUtilityLayer ? this._utilityLayerScene : this._scene;
        let oldPick = new PickingInfo();
        const discMesh = CreateTorus("selection", {
          diameter: 35e-4 * 15,
          thickness: 25e-4 * 6,
          tessellation: 20
        }, sceneToRenderTo);
        discMesh.isVisible = false;
        discMesh.isPickable = false;
        discMesh.parent = controllerData.selectionMesh;
        let timer = 0;
        let downTriggered = false;
        const pointerEventInit = {
          pointerId: controllerData.id,
          pointerType: "xr"
        };
        controllerData.onFrameObserver = this._xrSessionManager.onXRFrameObservable.add(() => {
          if (!controllerData.pick) {
            return;
          }
          this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
          controllerData.laserPointer.material.alpha = 0;
          discMesh.isVisible = false;
          if (controllerData.pick.hit) {
            if (!this._pickingMoved(oldPick, controllerData.pick)) {
              if (timer > timeToSelect / 10) {
                discMesh.isVisible = true;
              }
              timer += this._scene.getEngine().getDeltaTime();
              if (timer >= timeToSelect) {
                this._scene.simulatePointerDown(controllerData.pick, pointerEventInit);
                downTriggered = true;
                if (this._options.disablePointerUpOnTouchOut) {
                  this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
                }
                discMesh.isVisible = false;
              } else {
                const scaleFactor = 1 - timer / timeToSelect;
                discMesh.scaling.set(scaleFactor, scaleFactor, scaleFactor);
              }
            } else {
              if (downTriggered) {
                if (!this._options.disablePointerUpOnTouchOut) {
                  this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
                }
              }
              downTriggered = false;
              timer = 0;
            }
          } else {
            downTriggered = false;
            timer = 0;
          }
          this._scene.simulatePointerMove(controllerData.pick, pointerEventInit);
          oldPick = controllerData.pick;
        });
        if (this._options.renderingGroupId !== void 0) {
          discMesh.renderingGroupId = this._options.renderingGroupId;
        }
        if (xrController) {
          xrController.onDisposeObservable.addOnce(() => {
            if (controllerData.pick && !this._options.disablePointerUpOnTouchOut && downTriggered) {
              this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
              controllerData.finalPointerUpTriggered = true;
            }
            discMesh.dispose();
          });
        }
      }
      _attachScreenRayMode(xrController) {
        const controllerData = this._controllers[xrController.uniqueId];
        let downTriggered = false;
        const pointerEventInit = {
          pointerId: controllerData.id,
          pointerType: "xr"
        };
        controllerData.onFrameObserver = this._xrSessionManager.onXRFrameObservable.add(() => {
          this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
          if (!controllerData.pick || this._options.disablePointerUpOnTouchOut && downTriggered) {
            return;
          }
          if (!downTriggered) {
            this._scene.simulatePointerDown(controllerData.pick, pointerEventInit);
            controllerData.pointerDownTriggered = true;
            downTriggered = true;
            if (this._options.disablePointerUpOnTouchOut) {
              this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
            }
          } else {
            this._scene.simulatePointerMove(controllerData.pick, pointerEventInit);
          }
        });
        xrController.onDisposeObservable.addOnce(() => {
          this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
          this._xrSessionManager.runInXRFrame(() => {
            if (controllerData.pick && !controllerData.finalPointerUpTriggered && downTriggered && !this._options.disablePointerUpOnTouchOut) {
              this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
              controllerData.finalPointerUpTriggered = true;
            }
          });
        });
      }
      _attachTrackedPointerRayMode(xrController) {
        const controllerData = this._controllers[xrController.uniqueId];
        if (this._options.forceGazeMode) {
          return this._attachGazeMode(xrController);
        }
        const pointerEventInit = {
          pointerId: controllerData.id,
          pointerType: "xr"
        };
        controllerData.onFrameObserver = this._xrSessionManager.onXRFrameObservable.add(() => {
          controllerData.laserPointer.material.disableLighting = this.disablePointerLighting;
          controllerData.selectionMesh.material.disableLighting = this.disableSelectionMeshLighting;
          if (controllerData.pick) {
            this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
            this._scene.simulatePointerMove(controllerData.pick, pointerEventInit);
          }
        });
        if (xrController.inputSource.gamepad) {
          const init = (motionController) => {
            if (this._options.overrideButtonId) {
              controllerData.selectionComponent = motionController.getComponent(this._options.overrideButtonId);
            }
            if (!controllerData.selectionComponent) {
              controllerData.selectionComponent = motionController.getMainComponent();
            }
            controllerData.onButtonChangedObserver = controllerData.selectionComponent.onButtonStateChangedObservable.add((component) => {
              if (component.changes.pressed) {
                const pressed = component.changes.pressed.current;
                if (controllerData.pick) {
                  if (this._options.enablePointerSelectionOnAllControllers || xrController.uniqueId === this._attachedController) {
                    this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
                    if (pressed) {
                      this._scene.simulatePointerDown(controllerData.pick, pointerEventInit);
                      controllerData.pointerDownTriggered = true;
                      controllerData.selectionMesh.material.emissiveColor = this.selectionMeshPickedColor;
                      controllerData.laserPointer.material.emissiveColor = this.laserPointerPickedColor;
                    } else {
                      this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
                      controllerData.selectionMesh.material.emissiveColor = this.selectionMeshDefaultColor;
                      controllerData.laserPointer.material.emissiveColor = this.laserPointerDefaultColor;
                    }
                  }
                } else {
                  if (pressed && !this._options.enablePointerSelectionOnAllControllers && !this._options.disableSwitchOnClick) {
                    const prevController = this._controllers[this._attachedController];
                    if (prevController && prevController.pointerDownTriggered && !prevController.finalPointerUpTriggered) {
                      this._augmentPointerInit(pointerEventInit, prevController.id, prevController.screenCoordinates);
                      this._scene.simulatePointerUp(new PickingInfo(), {
                        pointerId: prevController.id,
                        pointerType: "xr"
                      });
                      prevController.finalPointerUpTriggered = true;
                    }
                    this._attachedController = xrController.uniqueId;
                  }
                }
              }
            });
          };
          if (xrController.motionController) {
            init(xrController.motionController);
          } else {
            xrController.onMotionControllerInitObservable.add(init);
          }
        } else {
          const selectStartListener = (event) => {
            this._xrSessionManager.onXRFrameObservable.addOnce(() => {
              this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
              if (controllerData.xrController && event.inputSource === controllerData.xrController.inputSource && controllerData.pick) {
                this._scene.simulatePointerDown(controllerData.pick, pointerEventInit);
                controllerData.pointerDownTriggered = true;
                controllerData.selectionMesh.material.emissiveColor = this.selectionMeshPickedColor;
                controllerData.laserPointer.material.emissiveColor = this.laserPointerPickedColor;
              }
            });
          };
          const selectEndListener = (event) => {
            this._xrSessionManager.onXRFrameObservable.addOnce(() => {
              this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
              if (controllerData.xrController && event.inputSource === controllerData.xrController.inputSource && controllerData.pick) {
                this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
                controllerData.selectionMesh.material.emissiveColor = this.selectionMeshDefaultColor;
                controllerData.laserPointer.material.emissiveColor = this.laserPointerDefaultColor;
              }
            });
          };
          controllerData.eventListeners = {
            selectend: selectEndListener,
            selectstart: selectStartListener
          };
          this._xrSessionManager.session.addEventListener("selectstart", selectStartListener);
          this._xrSessionManager.session.addEventListener("selectend", selectEndListener);
        }
      }
      _convertNormalToDirectionOfRay(normal, ray) {
        if (normal) {
          const angle = Math.acos(Vector3.Dot(normal, ray.direction));
          if (angle < Math.PI / 2) {
            normal.scaleInPlace(-1);
          }
        }
        return normal;
      }
      _detachController(xrControllerUniqueId) {
        const controllerData = this._controllers[xrControllerUniqueId];
        if (!controllerData) {
          return;
        }
        if (controllerData.selectionComponent) {
          if (controllerData.onButtonChangedObserver) {
            controllerData.selectionComponent.onButtonStateChangedObservable.remove(controllerData.onButtonChangedObserver);
          }
        }
        if (controllerData.onFrameObserver) {
          this._xrSessionManager.onXRFrameObservable.remove(controllerData.onFrameObserver);
        }
        if (controllerData.eventListeners) {
          Object.keys(controllerData.eventListeners).forEach((eventName) => {
            const func = controllerData.eventListeners && controllerData.eventListeners[eventName];
            if (func) {
              this._xrSessionManager.session.removeEventListener(eventName, func);
            }
          });
        }
        if (!controllerData.finalPointerUpTriggered && controllerData.pointerDownTriggered) {
          const pointerEventInit = {
            pointerId: controllerData.id,
            pointerType: "xr"
          };
          this._xrSessionManager.runInXRFrame(() => {
            this._augmentPointerInit(pointerEventInit, controllerData.id, controllerData.screenCoordinates);
            this._scene.simulatePointerUp(controllerData.pick || new PickingInfo(), pointerEventInit);
            controllerData.finalPointerUpTriggered = true;
          });
        }
        this._xrSessionManager.scene.onBeforeRenderObservable.addOnce(() => {
          try {
            controllerData.selectionMesh.dispose();
            controllerData.laserPointer.dispose();
            delete this._controllers[xrControllerUniqueId];
            if (this._attachedController === xrControllerUniqueId) {
              const keys = Object.keys(this._controllers);
              if (keys.length) {
                this._attachedController = keys[0];
              } else {
                this._attachedController = "";
              }
            }
          } catch (e) {
            Tools.Warn("controller already detached.");
          }
        });
      }
      _generateNewMeshPair(meshParent) {
        const sceneToRenderTo = this._options.useUtilityLayer ? this._options.customUtilityLayerScene || UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene : this._scene;
        const laserPointer = this._options.customLasterPointerMeshGenerator ? this._options.customLasterPointerMeshGenerator() : CreateCylinder("laserPointer", {
          height: 1,
          diameterTop: 2e-4,
          diameterBottom: 4e-3,
          tessellation: 20,
          subdivisions: 1
        }, sceneToRenderTo);
        laserPointer.parent = meshParent;
        const laserPointerMaterial = new StandardMaterial("laserPointerMat", sceneToRenderTo);
        laserPointerMaterial.emissiveColor = this.laserPointerDefaultColor;
        laserPointerMaterial.alpha = 0.7;
        laserPointer.material = laserPointerMaterial;
        laserPointer.rotation.x = Math.PI / 2;
        this._updatePointerDistance(laserPointer, 1);
        laserPointer.isPickable = false;
        laserPointer.isVisible = false;
        const selectionMesh = this._options.customSelectionMeshGenerator ? this._options.customSelectionMeshGenerator() : CreateTorus("gazeTracker", {
          diameter: 35e-4 * 3,
          thickness: 25e-4 * 3,
          tessellation: 20
        }, sceneToRenderTo);
        selectionMesh.bakeCurrentTransformIntoVertices();
        selectionMesh.isPickable = false;
        selectionMesh.isVisible = false;
        const targetMat = new StandardMaterial("targetMat", sceneToRenderTo);
        targetMat.specularColor = Color3.Black();
        targetMat.emissiveColor = this.selectionMeshDefaultColor;
        targetMat.backFaceCulling = false;
        selectionMesh.material = targetMat;
        if (this._options.renderingGroupId !== void 0) {
          laserPointer.renderingGroupId = this._options.renderingGroupId;
          selectionMesh.renderingGroupId = this._options.renderingGroupId;
        }
        return {
          laserPointer,
          selectionMesh
        };
      }
      _pickingMoved(oldPick, newPick) {
        var _a;
        if (!oldPick.hit || !newPick.hit) {
          return true;
        }
        if (!oldPick.pickedMesh || !oldPick.pickedPoint || !newPick.pickedMesh || !newPick.pickedPoint) {
          return true;
        }
        if (oldPick.pickedMesh !== newPick.pickedMesh) {
          return true;
        }
        (_a = oldPick.pickedPoint) == null ? void 0 : _a.subtractToRef(newPick.pickedPoint, this._tmpVectorForPickCompare);
        this._tmpVectorForPickCompare.set(Math.abs(this._tmpVectorForPickCompare.x), Math.abs(this._tmpVectorForPickCompare.y), Math.abs(this._tmpVectorForPickCompare.z));
        const delta = (this._options.gazeModePointerMovedFactor || 1) * 0.01 * newPick.distance;
        const length = this._tmpVectorForPickCompare.length();
        if (length > delta) {
          return true;
        }
        return false;
      }
      _updatePointerDistance(_laserPointer, distance = 100) {
        _laserPointer.scaling.y = distance;
        if (this._scene.useRightHandedSystem) {
          distance *= -1;
        }
        _laserPointer.position.z = distance / 2 + 0.05;
      }
      _augmentPointerInit(pointerEventInit, id, screenCoordinates) {
        pointerEventInit.pointerId = id;
        pointerEventInit.pointerType = "xr";
        if (screenCoordinates) {
          pointerEventInit.screenX = screenCoordinates.x;
          pointerEventInit.screenY = screenCoordinates.y;
        }
      }
      /** @internal */
      get lasterPointerDefaultColor() {
        return this.laserPointerDefaultColor;
      }
    };
    WebXRControllerPointerSelection._IdCounter = 200;
    WebXRControllerPointerSelection.Name = WebXRFeatureName.POINTER_SELECTION;
    WebXRControllerPointerSelection.Version = 1;
    WebXRFeaturesManager.AddWebXRFeature(WebXRControllerPointerSelection.Name, (xrSessionManager, options) => {
      return () => new WebXRControllerPointerSelection(xrSessionManager, options);
    }, WebXRControllerPointerSelection.Version, true);
  }
});

// node_modules/@babylonjs/core/Animations/animationKey.js
var AnimationKeyInterpolation;
var init_animationKey = __esm({
  "node_modules/@babylonjs/core/Animations/animationKey.js"() {
    (function(AnimationKeyInterpolation2) {
      AnimationKeyInterpolation2[AnimationKeyInterpolation2["NONE"] = 0] = "NONE";
      AnimationKeyInterpolation2[AnimationKeyInterpolation2["STEP"] = 1] = "STEP";
    })(AnimationKeyInterpolation || (AnimationKeyInterpolation = {}));
  }
});

// node_modules/@babylonjs/core/Animations/animationRange.js
var AnimationRange;
var init_animationRange = __esm({
  "node_modules/@babylonjs/core/Animations/animationRange.js"() {
    AnimationRange = class _AnimationRange {
      /**
       * Initializes the range of an animation
       * @param name The name of the animation range
       * @param from The starting frame of the animation
       * @param to The ending frame of the animation
       */
      constructor(name66, from, to) {
        this.name = name66;
        this.from = from;
        this.to = to;
      }
      /**
       * Makes a copy of the animation range
       * @returns A copy of the animation range
       */
      clone() {
        return new _AnimationRange(this.name, this.from, this.to);
      }
    };
  }
});

// node_modules/@babylonjs/core/Animations/animation.js
var _staticOffsetValueQuaternion, _staticOffsetValueVector3, _staticOffsetValueVector2, _staticOffsetValueSize, _staticOffsetValueColor3, _staticOffsetValueColor4, evaluateAnimationState, Animation;
var init_animation = __esm({
  "node_modules/@babylonjs/core/Animations/animation.js"() {
    init_math_vector();
    init_math_color();
    init_math_scalar();
    init_typeStore();
    init_animationKey();
    init_animationRange();
    init_node();
    init_math_size();
    init_webRequest();
    init_decorators_serialization();
    _staticOffsetValueQuaternion = Object.freeze(new Quaternion(0, 0, 0, 0));
    _staticOffsetValueVector3 = Object.freeze(Vector3.Zero());
    _staticOffsetValueVector2 = Object.freeze(Vector2.Zero());
    _staticOffsetValueSize = Object.freeze(Size.Zero());
    _staticOffsetValueColor3 = Object.freeze(Color3.Black());
    _staticOffsetValueColor4 = Object.freeze(new Color4(0, 0, 0, 0));
    evaluateAnimationState = {
      key: 0,
      repeatCount: 0,
      loopMode: 2
    };
    Animation = class _Animation {
      /**
       * @internal Internal use
       */
      static _PrepareAnimation(name66, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction) {
        let dataType = void 0;
        if (!isNaN(parseFloat(from)) && isFinite(from)) {
          dataType = _Animation.ANIMATIONTYPE_FLOAT;
        } else if (from instanceof Quaternion) {
          dataType = _Animation.ANIMATIONTYPE_QUATERNION;
        } else if (from instanceof Vector3) {
          dataType = _Animation.ANIMATIONTYPE_VECTOR3;
        } else if (from instanceof Vector2) {
          dataType = _Animation.ANIMATIONTYPE_VECTOR2;
        } else if (from instanceof Color3) {
          dataType = _Animation.ANIMATIONTYPE_COLOR3;
        } else if (from instanceof Color4) {
          dataType = _Animation.ANIMATIONTYPE_COLOR4;
        } else if (from instanceof Size) {
          dataType = _Animation.ANIMATIONTYPE_SIZE;
        }
        if (dataType == void 0) {
          return null;
        }
        const animation = new _Animation(name66, targetProperty, framePerSecond, dataType, loopMode);
        const keys = [
          { frame: 0, value: from },
          { frame: totalFrame, value: to }
        ];
        animation.setKeys(keys);
        if (easingFunction !== void 0) {
          animation.setEasingFunction(easingFunction);
        }
        return animation;
      }
      /**
       * Sets up an animation
       * @param property The property to animate
       * @param animationType The animation type to apply
       * @param framePerSecond The frames per second of the animation
       * @param easingFunction The easing function used in the animation
       * @returns The created animation
       */
      static CreateAnimation(property, animationType, framePerSecond, easingFunction) {
        const animation = new _Animation(property + "Animation", property, framePerSecond, animationType, _Animation.ANIMATIONLOOPMODE_CONSTANT);
        animation.setEasingFunction(easingFunction);
        return animation;
      }
      /**
       * Create and start an animation on a node
       * @param name defines the name of the global animation that will be run on all nodes
       * @param target defines the target where the animation will take place
       * @param targetProperty defines property to animate
       * @param framePerSecond defines the number of frame per second yo use
       * @param totalFrame defines the number of frames in total
       * @param from defines the initial value
       * @param to defines the final value
       * @param loopMode defines which loop mode you want to use (off by default)
       * @param easingFunction defines the easing function to use (linear by default)
       * @param onAnimationEnd defines the callback to call when animation end
       * @param scene defines the hosting scene
       * @returns the animatable created for this animation
       */
      static CreateAndStartAnimation(name66, target, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd, scene) {
        const animation = _Animation._PrepareAnimation(name66, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);
        if (!animation) {
          return null;
        }
        if (target.getScene) {
          scene = target.getScene();
        }
        if (!scene) {
          return null;
        }
        return scene.beginDirectAnimation(target, [animation], 0, totalFrame, animation.loopMode === 1, 1, onAnimationEnd);
      }
      /**
       * Create and start an animation on a node and its descendants
       * @param name defines the name of the global animation that will be run on all nodes
       * @param node defines the root node where the animation will take place
       * @param directDescendantsOnly if true only direct descendants will be used, if false direct and also indirect (children of children, an so on in a recursive manner) descendants will be used
       * @param targetProperty defines property to animate
       * @param framePerSecond defines the number of frame per second to use
       * @param totalFrame defines the number of frames in total
       * @param from defines the initial value
       * @param to defines the final value
       * @param loopMode defines which loop mode you want to use (off by default)
       * @param easingFunction defines the easing function to use (linear by default)
       * @param onAnimationEnd defines the callback to call when an animation ends (will be called once per node)
       * @returns the list of animatables created for all nodes
       * @example https://www.babylonjs-playground.com/#MH0VLI
       */
      static CreateAndStartHierarchyAnimation(name66, node, directDescendantsOnly, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) {
        const animation = _Animation._PrepareAnimation(name66, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);
        if (!animation) {
          return null;
        }
        const scene = node.getScene();
        return scene.beginDirectHierarchyAnimation(node, directDescendantsOnly, [animation], 0, totalFrame, animation.loopMode === 1, 1, onAnimationEnd);
      }
      /**
       * Creates a new animation, merges it with the existing animations and starts it
       * @param name Name of the animation
       * @param node Node which contains the scene that begins the animations
       * @param targetProperty Specifies which property to animate
       * @param framePerSecond The frames per second of the animation
       * @param totalFrame The total number of frames
       * @param from The frame at the beginning of the animation
       * @param to The frame at the end of the animation
       * @param loopMode Specifies the loop mode of the animation
       * @param easingFunction (Optional) The easing function of the animation, which allow custom mathematical formulas for animations
       * @param onAnimationEnd Callback to run once the animation is complete
       * @returns Nullable animation
       */
      static CreateMergeAndStartAnimation(name66, node, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) {
        const animation = _Animation._PrepareAnimation(name66, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);
        if (!animation) {
          return null;
        }
        node.animations.push(animation);
        return node.getScene().beginAnimation(node, 0, totalFrame, animation.loopMode === 1, 1, onAnimationEnd);
      }
      /** @internal */
      static MakeAnimationAdditive(sourceAnimation, referenceFrameOrOptions, range, cloneOriginal = false, clonedName) {
        let options;
        if (typeof referenceFrameOrOptions === "object") {
          options = referenceFrameOrOptions;
        } else {
          options = {
            referenceFrame: referenceFrameOrOptions ?? 0,
            range,
            cloneOriginalAnimation: cloneOriginal,
            clonedAnimationName: clonedName
          };
        }
        let animation = sourceAnimation;
        if (options.cloneOriginalAnimation) {
          animation = sourceAnimation.clone();
          animation.name = options.clonedAnimationName || animation.name;
        }
        if (!animation._keys.length) {
          return animation;
        }
        const referenceFrame = options.referenceFrame && options.referenceFrame >= 0 ? options.referenceFrame : 0;
        let startIndex = 0;
        const firstKey = animation._keys[0];
        let endIndex = animation._keys.length - 1;
        const lastKey = animation._keys[endIndex];
        const valueStore = {
          referenceValue: firstKey.value,
          referencePosition: TmpVectors.Vector3[0],
          referenceQuaternion: TmpVectors.Quaternion[0],
          referenceScaling: TmpVectors.Vector3[1],
          keyPosition: TmpVectors.Vector3[2],
          keyQuaternion: TmpVectors.Quaternion[1],
          keyScaling: TmpVectors.Vector3[3]
        };
        let from = firstKey.frame;
        let to = lastKey.frame;
        if (options.range) {
          const rangeValue = animation.getRange(options.range);
          if (rangeValue) {
            from = rangeValue.from;
            to = rangeValue.to;
          }
        } else {
          from = options.fromFrame ?? from;
          to = options.toFrame ?? to;
        }
        if (from !== firstKey.frame) {
          startIndex = animation.createKeyForFrame(from);
        }
        if (to !== lastKey.frame) {
          endIndex = animation.createKeyForFrame(to);
        }
        if (animation._keys.length === 1) {
          const value = animation._getKeyValue(animation._keys[0]);
          valueStore.referenceValue = value.clone ? value.clone() : value;
        } else if (referenceFrame <= firstKey.frame) {
          const value = animation._getKeyValue(firstKey.value);
          valueStore.referenceValue = value.clone ? value.clone() : value;
        } else if (referenceFrame >= lastKey.frame) {
          const value = animation._getKeyValue(lastKey.value);
          valueStore.referenceValue = value.clone ? value.clone() : value;
        } else {
          evaluateAnimationState.key = 0;
          const value = animation._interpolate(referenceFrame, evaluateAnimationState);
          valueStore.referenceValue = value.clone ? value.clone() : value;
        }
        if (animation.dataType === _Animation.ANIMATIONTYPE_QUATERNION) {
          valueStore.referenceValue.normalize().conjugateInPlace();
        } else if (animation.dataType === _Animation.ANIMATIONTYPE_MATRIX) {
          valueStore.referenceValue.decompose(valueStore.referenceScaling, valueStore.referenceQuaternion, valueStore.referencePosition);
          valueStore.referenceQuaternion.normalize().conjugateInPlace();
        }
        let startFrame = Number.MAX_VALUE;
        const clippedKeys = options.clipKeys ? [] : null;
        for (let index = startIndex; index <= endIndex; index++) {
          let key = animation._keys[index];
          if (clippedKeys) {
            key = {
              frame: key.frame,
              value: key.value.clone ? key.value.clone() : key.value,
              inTangent: key.inTangent,
              outTangent: key.outTangent,
              interpolation: key.interpolation,
              lockedTangent: key.lockedTangent
            };
            if (startFrame === Number.MAX_VALUE) {
              startFrame = key.frame;
            }
            key.frame -= startFrame;
            clippedKeys.push(key);
          }
          if (index && animation.dataType !== _Animation.ANIMATIONTYPE_FLOAT && key.value === firstKey.value) {
            continue;
          }
          switch (animation.dataType) {
            case _Animation.ANIMATIONTYPE_MATRIX:
              key.value.decompose(valueStore.keyScaling, valueStore.keyQuaternion, valueStore.keyPosition);
              valueStore.keyPosition.subtractInPlace(valueStore.referencePosition);
              valueStore.keyScaling.divideInPlace(valueStore.referenceScaling);
              valueStore.referenceQuaternion.multiplyToRef(valueStore.keyQuaternion, valueStore.keyQuaternion);
              Matrix.ComposeToRef(valueStore.keyScaling, valueStore.keyQuaternion, valueStore.keyPosition, key.value);
              break;
            case _Animation.ANIMATIONTYPE_QUATERNION:
              valueStore.referenceValue.multiplyToRef(key.value, key.value);
              break;
            case _Animation.ANIMATIONTYPE_VECTOR2:
            case _Animation.ANIMATIONTYPE_VECTOR3:
            case _Animation.ANIMATIONTYPE_COLOR3:
            case _Animation.ANIMATIONTYPE_COLOR4:
              key.value.subtractToRef(valueStore.referenceValue, key.value);
              break;
            case _Animation.ANIMATIONTYPE_SIZE:
              key.value.width -= valueStore.referenceValue.width;
              key.value.height -= valueStore.referenceValue.height;
              break;
            default:
              key.value -= valueStore.referenceValue;
          }
        }
        if (clippedKeys) {
          animation.setKeys(clippedKeys, true);
        }
        return animation;
      }
      /**
       * Transition property of an host to the target Value
       * @param property The property to transition
       * @param targetValue The target Value of the property
       * @param host The object where the property to animate belongs
       * @param scene Scene used to run the animation
       * @param frameRate Framerate (in frame/s) to use
       * @param transition The transition type we want to use
       * @param duration The duration of the animation, in milliseconds
       * @param onAnimationEnd Callback trigger at the end of the animation
       * @returns Nullable animation
       */
      static TransitionTo(property, targetValue, host, scene, frameRate, transition, duration, onAnimationEnd = null) {
        if (duration <= 0) {
          host[property] = targetValue;
          if (onAnimationEnd) {
            onAnimationEnd();
          }
          return null;
        }
        const endFrame = frameRate * (duration / 1e3);
        transition.setKeys([
          {
            frame: 0,
            value: host[property].clone ? host[property].clone() : host[property]
          },
          {
            frame: endFrame,
            value: targetValue
          }
        ]);
        if (!host.animations) {
          host.animations = [];
        }
        host.animations.push(transition);
        const animation = scene.beginAnimation(host, 0, endFrame, false);
        animation.onAnimationEnd = onAnimationEnd;
        return animation;
      }
      /**
       * Return the array of runtime animations currently using this animation
       */
      get runtimeAnimations() {
        return this._runtimeAnimations;
      }
      /**
       * Specifies if any of the runtime animations are currently running
       */
      get hasRunningRuntimeAnimations() {
        for (const runtimeAnimation of this._runtimeAnimations) {
          if (!runtimeAnimation.isStopped()) {
            return true;
          }
        }
        return false;
      }
      /**
       * Initializes the animation
       * @param name Name of the animation
       * @param targetProperty Property to animate
       * @param framePerSecond The frames per second of the animation
       * @param dataType The data type of the animation
       * @param loopMode The loop mode of the animation
       * @param enableBlending Specifies if blending should be enabled
       */
      constructor(name66, targetProperty, framePerSecond, dataType, loopMode, enableBlending) {
        this.name = name66;
        this.targetProperty = targetProperty;
        this.framePerSecond = framePerSecond;
        this.dataType = dataType;
        this.loopMode = loopMode;
        this.enableBlending = enableBlending;
        this._easingFunction = null;
        this._runtimeAnimations = new Array();
        this._events = new Array();
        this.blendingSpeed = 0.01;
        this._ranges = {};
        this.targetPropertyPath = targetProperty.split(".");
        this.dataType = dataType;
        this.loopMode = loopMode === void 0 ? _Animation.ANIMATIONLOOPMODE_CYCLE : loopMode;
        this.uniqueId = _Animation._UniqueIdGenerator++;
      }
      // Methods
      /**
       * Converts the animation to a string
       * @param fullDetails support for multiple levels of logging within scene loading
       * @returns String form of the animation
       */
      toString(fullDetails) {
        let ret = "Name: " + this.name + ", property: " + this.targetProperty;
        ret += ", datatype: " + ["Float", "Vector3", "Quaternion", "Matrix", "Color3", "Vector2"][this.dataType];
        ret += ", nKeys: " + (this._keys ? this._keys.length : "none");
        ret += ", nRanges: " + (this._ranges ? Object.keys(this._ranges).length : "none");
        if (fullDetails) {
          ret += ", Ranges: {";
          let first = true;
          for (const name66 in this._ranges) {
            if (first) {
              ret += ", ";
              first = false;
            }
            ret += name66;
          }
          ret += "}";
        }
        return ret;
      }
      /**
       * Add an event to this animation
       * @param event Event to add
       */
      addEvent(event) {
        this._events.push(event);
        this._events.sort((a, b) => a.frame - b.frame);
      }
      /**
       * Remove all events found at the given frame
       * @param frame The frame to remove events from
       */
      removeEvents(frame) {
        for (let index = 0; index < this._events.length; index++) {
          if (this._events[index].frame === frame) {
            this._events.splice(index, 1);
            index--;
          }
        }
      }
      /**
       * Retrieves all the events from the animation
       * @returns Events from the animation
       */
      getEvents() {
        return this._events;
      }
      /**
       * Creates an animation range
       * @param name Name of the animation range
       * @param from Starting frame of the animation range
       * @param to Ending frame of the animation
       */
      createRange(name66, from, to) {
        if (!this._ranges[name66]) {
          this._ranges[name66] = new AnimationRange(name66, from, to);
        }
      }
      /**
       * Deletes an animation range by name
       * @param name Name of the animation range to delete
       * @param deleteFrames Specifies if the key frames for the range should also be deleted (true) or not (false)
       */
      deleteRange(name66, deleteFrames = true) {
        const range = this._ranges[name66];
        if (!range) {
          return;
        }
        if (deleteFrames) {
          const from = range.from;
          const to = range.to;
          for (let key = this._keys.length - 1; key >= 0; key--) {
            if (this._keys[key].frame >= from && this._keys[key].frame <= to) {
              this._keys.splice(key, 1);
            }
          }
        }
        this._ranges[name66] = null;
      }
      /**
       * Gets the animation range by name, or null if not defined
       * @param name Name of the animation range
       * @returns Nullable animation range
       */
      getRange(name66) {
        return this._ranges[name66];
      }
      /**
       * Gets the key frames from the animation
       * @returns The key frames of the animation
       */
      getKeys() {
        return this._keys;
      }
      /**
       * Gets the highest frame rate of the animation
       * @returns Highest frame rate of the animation
       */
      getHighestFrame() {
        let ret = 0;
        for (let key = 0, nKeys = this._keys.length; key < nKeys; key++) {
          if (ret < this._keys[key].frame) {
            ret = this._keys[key].frame;
          }
        }
        return ret;
      }
      /**
       * Gets the easing function of the animation
       * @returns Easing function of the animation
       */
      getEasingFunction() {
        return this._easingFunction;
      }
      /**
       * Sets the easing function of the animation
       * @param easingFunction A custom mathematical formula for animation
       */
      setEasingFunction(easingFunction) {
        this._easingFunction = easingFunction;
      }
      /**
       * Interpolates a scalar linearly
       * @param startValue Start value of the animation curve
       * @param endValue End value of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns Interpolated scalar value
       */
      floatInterpolateFunction(startValue, endValue, gradient) {
        return Scalar.Lerp(startValue, endValue, gradient);
      }
      /**
       * Interpolates a scalar cubically
       * @param startValue Start value of the animation curve
       * @param outTangent End tangent of the animation
       * @param endValue End value of the animation curve
       * @param inTangent Start tangent of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns Interpolated scalar value
       */
      floatInterpolateFunctionWithTangents(startValue, outTangent, endValue, inTangent, gradient) {
        return Scalar.Hermite(startValue, outTangent, endValue, inTangent, gradient);
      }
      /**
       * Interpolates a quaternion using a spherical linear interpolation
       * @param startValue Start value of the animation curve
       * @param endValue End value of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns Interpolated quaternion value
       */
      quaternionInterpolateFunction(startValue, endValue, gradient) {
        return Quaternion.Slerp(startValue, endValue, gradient);
      }
      /**
       * Interpolates a quaternion cubically
       * @param startValue Start value of the animation curve
       * @param outTangent End tangent of the animation curve
       * @param endValue End value of the animation curve
       * @param inTangent Start tangent of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns Interpolated quaternion value
       */
      quaternionInterpolateFunctionWithTangents(startValue, outTangent, endValue, inTangent, gradient) {
        return Quaternion.Hermite(startValue, outTangent, endValue, inTangent, gradient).normalize();
      }
      /**
       * Interpolates a Vector3 linearly
       * @param startValue Start value of the animation curve
       * @param endValue End value of the animation curve
       * @param gradient Scalar amount to interpolate (value between 0 and 1)
       * @returns Interpolated scalar value
       */
      vector3InterpolateFunction(startValue, endValue, gradient) {
        return Vector3.Lerp(startValue, endValue, gradient);
      }
      /**
       * Interpolates a Vector3 cubically
       * @param startValue Start value of the animation curve
       * @param outTangent End tangent of the animation
       * @param endValue End value of the animation curve
       * @param inTangent Start tangent of the animation curve
       * @param gradient Scalar amount to interpolate (value between 0 and 1)
       * @returns InterpolatedVector3 value
       */
      vector3InterpolateFunctionWithTangents(startValue, outTangent, endValue, inTangent, gradient) {
        return Vector3.Hermite(startValue, outTangent, endValue, inTangent, gradient);
      }
      /**
       * Interpolates a Vector2 linearly
       * @param startValue Start value of the animation curve
       * @param endValue End value of the animation curve
       * @param gradient Scalar amount to interpolate (value between 0 and 1)
       * @returns Interpolated Vector2 value
       */
      vector2InterpolateFunction(startValue, endValue, gradient) {
        return Vector2.Lerp(startValue, endValue, gradient);
      }
      /**
       * Interpolates a Vector2 cubically
       * @param startValue Start value of the animation curve
       * @param outTangent End tangent of the animation
       * @param endValue End value of the animation curve
       * @param inTangent Start tangent of the animation curve
       * @param gradient Scalar amount to interpolate (value between 0 and 1)
       * @returns Interpolated Vector2 value
       */
      vector2InterpolateFunctionWithTangents(startValue, outTangent, endValue, inTangent, gradient) {
        return Vector2.Hermite(startValue, outTangent, endValue, inTangent, gradient);
      }
      /**
       * Interpolates a size linearly
       * @param startValue Start value of the animation curve
       * @param endValue End value of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns Interpolated Size value
       */
      sizeInterpolateFunction(startValue, endValue, gradient) {
        return Size.Lerp(startValue, endValue, gradient);
      }
      /**
       * Interpolates a Color3 linearly
       * @param startValue Start value of the animation curve
       * @param endValue End value of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns Interpolated Color3 value
       */
      color3InterpolateFunction(startValue, endValue, gradient) {
        return Color3.Lerp(startValue, endValue, gradient);
      }
      /**
       * Interpolates a Color3 cubically
       * @param startValue Start value of the animation curve
       * @param outTangent End tangent of the animation
       * @param endValue End value of the animation curve
       * @param inTangent Start tangent of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns interpolated value
       */
      color3InterpolateFunctionWithTangents(startValue, outTangent, endValue, inTangent, gradient) {
        return Color3.Hermite(startValue, outTangent, endValue, inTangent, gradient);
      }
      /**
       * Interpolates a Color4 linearly
       * @param startValue Start value of the animation curve
       * @param endValue End value of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns Interpolated Color3 value
       */
      color4InterpolateFunction(startValue, endValue, gradient) {
        return Color4.Lerp(startValue, endValue, gradient);
      }
      /**
       * Interpolates a Color4 cubically
       * @param startValue Start value of the animation curve
       * @param outTangent End tangent of the animation
       * @param endValue End value of the animation curve
       * @param inTangent Start tangent of the animation curve
       * @param gradient Scalar amount to interpolate
       * @returns interpolated value
       */
      color4InterpolateFunctionWithTangents(startValue, outTangent, endValue, inTangent, gradient) {
        return Color4.Hermite(startValue, outTangent, endValue, inTangent, gradient);
      }
      /**
       * @internal Internal use only
       */
      _getKeyValue(value) {
        if (typeof value === "function") {
          return value();
        }
        return value;
      }
      /**
       * Evaluate the animation value at a given frame
       * @param currentFrame defines the frame where we want to evaluate the animation
       * @returns the animation value
       */
      evaluate(currentFrame) {
        evaluateAnimationState.key = 0;
        return this._interpolate(currentFrame, evaluateAnimationState);
      }
      /**
       * @internal Internal use only
       */
      _interpolate(currentFrame, state, searchClosestKeyOnly = false) {
        if (state.loopMode === _Animation.ANIMATIONLOOPMODE_CONSTANT && state.repeatCount > 0) {
          return state.highLimitValue.clone ? state.highLimitValue.clone() : state.highLimitValue;
        }
        const keys = this._keys;
        const keysLength = keys.length;
        let key = state.key;
        while (key >= 0 && currentFrame < keys[key].frame) {
          --key;
        }
        while (key + 1 <= keysLength - 1 && currentFrame >= keys[key + 1].frame) {
          ++key;
        }
        state.key = key;
        if (key < 0) {
          return searchClosestKeyOnly ? void 0 : this._getKeyValue(keys[0].value);
        } else if (key + 1 > keysLength - 1) {
          return searchClosestKeyOnly ? void 0 : this._getKeyValue(keys[keysLength - 1].value);
        }
        const startKey = keys[key];
        const endKey = keys[key + 1];
        if (searchClosestKeyOnly && (currentFrame === startKey.frame || currentFrame === endKey.frame)) {
          return void 0;
        }
        const startValue = this._getKeyValue(startKey.value);
        const endValue = this._getKeyValue(endKey.value);
        if (startKey.interpolation === AnimationKeyInterpolation.STEP) {
          if (endKey.frame > currentFrame) {
            return startValue;
          } else {
            return endValue;
          }
        }
        const useTangent = startKey.outTangent !== void 0 && endKey.inTangent !== void 0;
        const frameDelta = endKey.frame - startKey.frame;
        let gradient = (currentFrame - startKey.frame) / frameDelta;
        const easingFunction = startKey.easingFunction || this.getEasingFunction();
        if (easingFunction !== null) {
          gradient = easingFunction.ease(gradient);
        }
        switch (this.dataType) {
          case _Animation.ANIMATIONTYPE_FLOAT: {
            const floatValue = useTangent ? this.floatInterpolateFunctionWithTangents(startValue, startKey.outTangent * frameDelta, endValue, endKey.inTangent * frameDelta, gradient) : this.floatInterpolateFunction(startValue, endValue, gradient);
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO:
                return floatValue;
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT:
                return (state.offsetValue ?? 0) * state.repeatCount + floatValue;
            }
            break;
          }
          case _Animation.ANIMATIONTYPE_QUATERNION: {
            const quatValue = useTangent ? this.quaternionInterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.quaternionInterpolateFunction(startValue, endValue, gradient);
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO:
                return quatValue;
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT:
                return quatValue.addInPlace((state.offsetValue || _staticOffsetValueQuaternion).scale(state.repeatCount));
            }
            return quatValue;
          }
          case _Animation.ANIMATIONTYPE_VECTOR3: {
            const vec3Value = useTangent ? this.vector3InterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.vector3InterpolateFunction(startValue, endValue, gradient);
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO:
                return vec3Value;
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT:
                return vec3Value.add((state.offsetValue || _staticOffsetValueVector3).scale(state.repeatCount));
            }
            break;
          }
          case _Animation.ANIMATIONTYPE_VECTOR2: {
            const vec2Value = useTangent ? this.vector2InterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.vector2InterpolateFunction(startValue, endValue, gradient);
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO:
                return vec2Value;
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT:
                return vec2Value.add((state.offsetValue || _staticOffsetValueVector2).scale(state.repeatCount));
            }
            break;
          }
          case _Animation.ANIMATIONTYPE_SIZE: {
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO:
                return this.sizeInterpolateFunction(startValue, endValue, gradient);
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT:
                return this.sizeInterpolateFunction(startValue, endValue, gradient).add((state.offsetValue || _staticOffsetValueSize).scale(state.repeatCount));
            }
            break;
          }
          case _Animation.ANIMATIONTYPE_COLOR3: {
            const color3Value = useTangent ? this.color3InterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.color3InterpolateFunction(startValue, endValue, gradient);
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO:
                return color3Value;
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT:
                return color3Value.add((state.offsetValue || _staticOffsetValueColor3).scale(state.repeatCount));
            }
            break;
          }
          case _Animation.ANIMATIONTYPE_COLOR4: {
            const color4Value = useTangent ? this.color4InterpolateFunctionWithTangents(startValue, startKey.outTangent.scale(frameDelta), endValue, endKey.inTangent.scale(frameDelta), gradient) : this.color4InterpolateFunction(startValue, endValue, gradient);
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO:
                return color4Value;
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT:
                return color4Value.add((state.offsetValue || _staticOffsetValueColor4).scale(state.repeatCount));
            }
            break;
          }
          case _Animation.ANIMATIONTYPE_MATRIX: {
            switch (state.loopMode) {
              case _Animation.ANIMATIONLOOPMODE_CYCLE:
              case _Animation.ANIMATIONLOOPMODE_CONSTANT:
              case _Animation.ANIMATIONLOOPMODE_YOYO: {
                if (_Animation.AllowMatricesInterpolation) {
                  return this.matrixInterpolateFunction(startValue, endValue, gradient, state.workValue);
                }
                return startValue;
              }
              case _Animation.ANIMATIONLOOPMODE_RELATIVE:
              case _Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: {
                return startValue;
              }
            }
            break;
          }
        }
        return 0;
      }
      /**
       * Defines the function to use to interpolate matrices
       * @param startValue defines the start matrix
       * @param endValue defines the end matrix
       * @param gradient defines the gradient between both matrices
       * @param result defines an optional target matrix where to store the interpolation
       * @returns the interpolated matrix
       */
      matrixInterpolateFunction(startValue, endValue, gradient, result) {
        if (_Animation.AllowMatrixDecomposeForInterpolation) {
          if (result) {
            Matrix.DecomposeLerpToRef(startValue, endValue, gradient, result);
            return result;
          }
          return Matrix.DecomposeLerp(startValue, endValue, gradient);
        }
        if (result) {
          Matrix.LerpToRef(startValue, endValue, gradient, result);
          return result;
        }
        return Matrix.Lerp(startValue, endValue, gradient);
      }
      /**
       * Makes a copy of the animation
       * @returns Cloned animation
       */
      clone() {
        const clone = new _Animation(this.name, this.targetPropertyPath.join("."), this.framePerSecond, this.dataType, this.loopMode);
        clone.enableBlending = this.enableBlending;
        clone.blendingSpeed = this.blendingSpeed;
        if (this._keys) {
          clone.setKeys(this._keys);
        }
        if (this._ranges) {
          clone._ranges = {};
          for (const name66 in this._ranges) {
            const range = this._ranges[name66];
            if (!range) {
              continue;
            }
            clone._ranges[name66] = range.clone();
          }
        }
        return clone;
      }
      /**
       * Sets the key frames of the animation
       * @param values The animation key frames to set
       * @param dontClone Whether to clone the keys or not (default is false, so the array of keys is cloned)
       */
      setKeys(values, dontClone = false) {
        this._keys = !dontClone ? values.slice(0) : values;
      }
      /**
       * Creates a key for the frame passed as a parameter and adds it to the animation IF a key doesn't already exist for that frame
       * @param frame Frame number
       * @returns The key index if the key was added or the index of the pre existing key if the frame passed as parameter already has a corresponding key
       */
      createKeyForFrame(frame) {
        evaluateAnimationState.key = 0;
        const value = this._interpolate(frame, evaluateAnimationState, true);
        if (!value) {
          return this._keys[evaluateAnimationState.key].frame === frame ? evaluateAnimationState.key : evaluateAnimationState.key + 1;
        }
        const newKey = {
          frame,
          value: value.clone ? value.clone() : value
        };
        this._keys.splice(evaluateAnimationState.key + 1, 0, newKey);
        return evaluateAnimationState.key + 1;
      }
      /**
       * Serializes the animation to an object
       * @returns Serialized object
       */
      serialize() {
        const serializationObject = {};
        serializationObject.name = this.name;
        serializationObject.property = this.targetProperty;
        serializationObject.framePerSecond = this.framePerSecond;
        serializationObject.dataType = this.dataType;
        serializationObject.loopBehavior = this.loopMode;
        serializationObject.enableBlending = this.enableBlending;
        serializationObject.blendingSpeed = this.blendingSpeed;
        const dataType = this.dataType;
        serializationObject.keys = [];
        const keys = this.getKeys();
        for (let index = 0; index < keys.length; index++) {
          const animationKey = keys[index];
          const key = {};
          key.frame = animationKey.frame;
          switch (dataType) {
            case _Animation.ANIMATIONTYPE_FLOAT:
              key.values = [animationKey.value];
              if (animationKey.inTangent !== void 0) {
                key.values.push(animationKey.inTangent);
              }
              if (animationKey.outTangent !== void 0) {
                if (animationKey.inTangent === void 0) {
                  key.values.push(void 0);
                }
                key.values.push(animationKey.outTangent);
              }
              if (animationKey.interpolation !== void 0) {
                if (animationKey.inTangent === void 0) {
                  key.values.push(void 0);
                }
                if (animationKey.outTangent === void 0) {
                  key.values.push(void 0);
                }
                key.values.push(animationKey.interpolation);
              }
              break;
            case _Animation.ANIMATIONTYPE_QUATERNION:
            case _Animation.ANIMATIONTYPE_MATRIX:
            case _Animation.ANIMATIONTYPE_VECTOR3:
            case _Animation.ANIMATIONTYPE_COLOR3:
            case _Animation.ANIMATIONTYPE_COLOR4:
              key.values = animationKey.value.asArray();
              if (animationKey.inTangent != void 0) {
                key.values.push(animationKey.inTangent.asArray());
              }
              if (animationKey.outTangent != void 0) {
                if (animationKey.inTangent === void 0) {
                  key.values.push(void 0);
                }
                key.values.push(animationKey.outTangent.asArray());
              }
              if (animationKey.interpolation !== void 0) {
                if (animationKey.inTangent === void 0) {
                  key.values.push(void 0);
                }
                if (animationKey.outTangent === void 0) {
                  key.values.push(void 0);
                }
                key.values.push(animationKey.interpolation);
              }
              break;
          }
          serializationObject.keys.push(key);
        }
        serializationObject.ranges = [];
        for (const name66 in this._ranges) {
          const source = this._ranges[name66];
          if (!source) {
            continue;
          }
          const range = {};
          range.name = name66;
          range.from = source.from;
          range.to = source.to;
          serializationObject.ranges.push(range);
        }
        return serializationObject;
      }
      /**
       * @internal
       */
      static _UniversalLerp(left, right, amount) {
        const constructor = left.constructor;
        if (constructor.Lerp) {
          return constructor.Lerp(left, right, amount);
        } else if (constructor.Slerp) {
          return constructor.Slerp(left, right, amount);
        } else if (left.toFixed) {
          return left * (1 - amount) + amount * right;
        } else {
          return right;
        }
      }
      /**
       * Parses an animation object and creates an animation
       * @param parsedAnimation Parsed animation object
       * @returns Animation object
       */
      static Parse(parsedAnimation) {
        const animation = new _Animation(parsedAnimation.name, parsedAnimation.property, parsedAnimation.framePerSecond, parsedAnimation.dataType, parsedAnimation.loopBehavior);
        const dataType = parsedAnimation.dataType;
        const keys = [];
        let data;
        let index;
        if (parsedAnimation.enableBlending) {
          animation.enableBlending = parsedAnimation.enableBlending;
        }
        if (parsedAnimation.blendingSpeed) {
          animation.blendingSpeed = parsedAnimation.blendingSpeed;
        }
        for (index = 0; index < parsedAnimation.keys.length; index++) {
          const key = parsedAnimation.keys[index];
          let inTangent = void 0;
          let outTangent = void 0;
          let interpolation = void 0;
          switch (dataType) {
            case _Animation.ANIMATIONTYPE_FLOAT:
              data = key.values[0];
              if (key.values.length >= 2) {
                inTangent = key.values[1];
              }
              if (key.values.length >= 3) {
                outTangent = key.values[2];
              }
              if (key.values.length >= 4) {
                interpolation = key.values[3];
              }
              break;
            case _Animation.ANIMATIONTYPE_QUATERNION:
              data = Quaternion.FromArray(key.values);
              if (key.values.length >= 8) {
                const _inTangent = Quaternion.FromArray(key.values.slice(4, 8));
                if (!_inTangent.equals(Quaternion.Zero())) {
                  inTangent = _inTangent;
                }
              }
              if (key.values.length >= 12) {
                const _outTangent = Quaternion.FromArray(key.values.slice(8, 12));
                if (!_outTangent.equals(Quaternion.Zero())) {
                  outTangent = _outTangent;
                }
              }
              if (key.values.length >= 13) {
                interpolation = key.values[12];
              }
              break;
            case _Animation.ANIMATIONTYPE_MATRIX:
              data = Matrix.FromArray(key.values);
              if (key.values.length >= 17) {
                interpolation = key.values[16];
              }
              break;
            case _Animation.ANIMATIONTYPE_COLOR3:
              data = Color3.FromArray(key.values);
              if (key.values[3]) {
                inTangent = Color3.FromArray(key.values[3]);
              }
              if (key.values[4]) {
                outTangent = Color3.FromArray(key.values[4]);
              }
              if (key.values[5]) {
                interpolation = key.values[5];
              }
              break;
            case _Animation.ANIMATIONTYPE_COLOR4:
              data = Color4.FromArray(key.values);
              if (key.values[4]) {
                inTangent = Color4.FromArray(key.values[4]);
              }
              if (key.values[5]) {
                outTangent = Color4.FromArray(key.values[5]);
              }
              if (key.values[6]) {
                interpolation = Color4.FromArray(key.values[6]);
              }
              break;
            case _Animation.ANIMATIONTYPE_VECTOR3:
            default:
              data = Vector3.FromArray(key.values);
              if (key.values[3]) {
                inTangent = Vector3.FromArray(key.values[3]);
              }
              if (key.values[4]) {
                outTangent = Vector3.FromArray(key.values[4]);
              }
              if (key.values[5]) {
                interpolation = key.values[5];
              }
              break;
          }
          const keyData = {};
          keyData.frame = key.frame;
          keyData.value = data;
          if (inTangent != void 0) {
            keyData.inTangent = inTangent;
          }
          if (outTangent != void 0) {
            keyData.outTangent = outTangent;
          }
          if (interpolation != void 0) {
            keyData.interpolation = interpolation;
          }
          keys.push(keyData);
        }
        animation.setKeys(keys);
        if (parsedAnimation.ranges) {
          for (index = 0; index < parsedAnimation.ranges.length; index++) {
            data = parsedAnimation.ranges[index];
            animation.createRange(data.name, data.from, data.to);
          }
        }
        return animation;
      }
      /**
       * Appends the serialized animations from the source animations
       * @param source Source containing the animations
       * @param destination Target to store the animations
       */
      static AppendSerializedAnimations(source, destination) {
        SerializationHelper.AppendSerializedAnimations(source, destination);
      }
      /**
       * Creates a new animation or an array of animations from a snippet saved in a remote file
       * @param name defines the name of the animation to create (can be null or empty to use the one from the json data)
       * @param url defines the url to load from
       * @returns a promise that will resolve to the new animation or an array of animations
       */
      static ParseFromFileAsync(name66, url) {
        return new Promise((resolve, reject) => {
          const request = new WebRequest();
          request.addEventListener("readystatechange", () => {
            if (request.readyState == 4) {
              if (request.status == 200) {
                let serializationObject = JSON.parse(request.responseText);
                if (serializationObject.animations) {
                  serializationObject = serializationObject.animations;
                }
                if (serializationObject.length) {
                  const output = [];
                  for (const serializedAnimation of serializationObject) {
                    output.push(this.Parse(serializedAnimation));
                  }
                  resolve(output);
                } else {
                  const output = this.Parse(serializationObject);
                  if (name66) {
                    output.name = name66;
                  }
                  resolve(output);
                }
              } else {
                reject("Unable to load the animation");
              }
            }
          });
          request.open("GET", url);
          request.send();
        });
      }
      /**
       * Creates an animation or an array of animations from a snippet saved by the Inspector
       * @param snippetId defines the snippet to load
       * @returns a promise that will resolve to the new animation or a new array of animations
       */
      static ParseFromSnippetAsync(snippetId) {
        return new Promise((resolve, reject) => {
          const request = new WebRequest();
          request.addEventListener("readystatechange", () => {
            if (request.readyState == 4) {
              if (request.status == 200) {
                const snippet = JSON.parse(JSON.parse(request.responseText).jsonPayload);
                if (snippet.animations) {
                  const serializationObject = JSON.parse(snippet.animations);
                  const outputs = [];
                  for (const serializedAnimation of serializationObject.animations) {
                    const output = this.Parse(serializedAnimation);
                    output.snippetId = snippetId;
                    outputs.push(output);
                  }
                  resolve(outputs);
                } else {
                  const serializationObject = JSON.parse(snippet.animation);
                  const output = this.Parse(serializationObject);
                  output.snippetId = snippetId;
                  resolve(output);
                }
              } else {
                reject("Unable to load the snippet " + snippetId);
              }
            }
          });
          request.open("GET", this.SnippetUrl + "/" + snippetId.replace(/#/g, "/"));
          request.send();
        });
      }
    };
    Animation._UniqueIdGenerator = 0;
    Animation.AllowMatricesInterpolation = false;
    Animation.AllowMatrixDecomposeForInterpolation = true;
    Animation.SnippetUrl = `https://snippet.babylonjs.com`;
    Animation.ANIMATIONTYPE_FLOAT = 0;
    Animation.ANIMATIONTYPE_VECTOR3 = 1;
    Animation.ANIMATIONTYPE_QUATERNION = 2;
    Animation.ANIMATIONTYPE_MATRIX = 3;
    Animation.ANIMATIONTYPE_COLOR3 = 4;
    Animation.ANIMATIONTYPE_COLOR4 = 7;
    Animation.ANIMATIONTYPE_VECTOR2 = 5;
    Animation.ANIMATIONTYPE_SIZE = 6;
    Animation.ANIMATIONLOOPMODE_RELATIVE = 0;
    Animation.ANIMATIONLOOPMODE_CYCLE = 1;
    Animation.ANIMATIONLOOPMODE_CONSTANT = 2;
    Animation.ANIMATIONLOOPMODE_YOYO = 4;
    Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT = 5;
    Animation.CreateFromSnippetAsync = Animation.ParseFromSnippetAsync;
    RegisterClass("BABYLON.Animation", Animation);
    Node._AnimationRangeFactory = (name66, from, to) => new AnimationRange(name66, from, to);
  }
});

// node_modules/@babylonjs/core/Animations/easing.js
var EasingFunction, CircleEase, BackEase, BounceEase, CubicEase, ElasticEase, ExponentialEase, PowerEase, QuadraticEase, QuarticEase, QuinticEase, SineEase, BezierCurveEase;
var init_easing = __esm({
  "node_modules/@babylonjs/core/Animations/easing.js"() {
    init_math_path();
    EasingFunction = class _EasingFunction {
      constructor() {
        this._easingMode = _EasingFunction.EASINGMODE_EASEIN;
      }
      /**
       * Sets the easing mode of the current function.
       * @param easingMode Defines the willing mode (EASINGMODE_EASEIN, EASINGMODE_EASEOUT or EASINGMODE_EASEINOUT)
       */
      setEasingMode(easingMode) {
        const n = Math.min(Math.max(easingMode, 0), 2);
        this._easingMode = n;
      }
      /**
       * Gets the current easing mode.
       * @returns the easing mode
       */
      getEasingMode() {
        return this._easingMode;
      }
      /**
       * @internal
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      easeInCore(gradient) {
        throw new Error("You must implement this method");
      }
      /**
       * Given an input gradient between 0 and 1, this returns the corresponding value
       * of the easing function.
       * @param gradient Defines the value between 0 and 1 we want the easing value for
       * @returns the corresponding value on the curve defined by the easing function
       */
      ease(gradient) {
        switch (this._easingMode) {
          case _EasingFunction.EASINGMODE_EASEIN:
            return this.easeInCore(gradient);
          case _EasingFunction.EASINGMODE_EASEOUT:
            return 1 - this.easeInCore(1 - gradient);
        }
        if (gradient >= 0.5) {
          return (1 - this.easeInCore((1 - gradient) * 2)) * 0.5 + 0.5;
        }
        return this.easeInCore(gradient * 2) * 0.5;
      }
    };
    EasingFunction.EASINGMODE_EASEIN = 0;
    EasingFunction.EASINGMODE_EASEOUT = 1;
    EasingFunction.EASINGMODE_EASEINOUT = 2;
    CircleEase = class extends EasingFunction {
      /**
       * @internal
       */
      easeInCore(gradient) {
        gradient = Math.max(0, Math.min(1, gradient));
        return 1 - Math.sqrt(1 - gradient * gradient);
      }
    };
    BackEase = class extends EasingFunction {
      /**
       * Instantiates a back ease easing
       * @see https://easings.net/#easeInBack
       * @param amplitude Defines the amplitude of the function
       */
      constructor(amplitude = 1) {
        super();
        this.amplitude = amplitude;
      }
      /**
       * @internal
       */
      easeInCore(gradient) {
        const num = Math.max(0, this.amplitude);
        return Math.pow(gradient, 3) - gradient * num * Math.sin(3.141592653589793 * gradient);
      }
    };
    BounceEase = class extends EasingFunction {
      /**
       * Instantiates a bounce easing
       * @see https://easings.net/#easeInBounce
       * @param bounces Defines the number of bounces
       * @param bounciness Defines the amplitude of the bounce
       */
      constructor(bounces = 3, bounciness = 2) {
        super();
        this.bounces = bounces;
        this.bounciness = bounciness;
      }
      /**
       * @internal
       */
      easeInCore(gradient) {
        const y = Math.max(0, this.bounces);
        let bounciness = this.bounciness;
        if (bounciness <= 1) {
          bounciness = 1.001;
        }
        const num9 = Math.pow(bounciness, y);
        const num5 = 1 - bounciness;
        const num4 = (1 - num9) / num5 + num9 * 0.5;
        const num15 = gradient * num4;
        const num65 = Math.log(-num15 * (1 - bounciness) + 1) / Math.log(bounciness);
        const num3 = Math.floor(num65);
        const num13 = num3 + 1;
        const num8 = (1 - Math.pow(bounciness, num3)) / (num5 * num4);
        const num12 = (1 - Math.pow(bounciness, num13)) / (num5 * num4);
        const num7 = (num8 + num12) * 0.5;
        const num6 = gradient - num7;
        const num2 = num7 - num8;
        return -Math.pow(1 / bounciness, y - num3) / (num2 * num2) * (num6 - num2) * (num6 + num2);
      }
    };
    CubicEase = class extends EasingFunction {
      /**
       * @internal
       */
      easeInCore(gradient) {
        return gradient * gradient * gradient;
      }
    };
    ElasticEase = class extends EasingFunction {
      /**
       * Instantiates an elastic easing function
       * @see https://easings.net/#easeInElastic
       * @param oscillations Defines the number of oscillations
       * @param springiness Defines the amplitude of the oscillations
       */
      constructor(oscillations = 3, springiness = 3) {
        super();
        this.oscillations = oscillations;
        this.springiness = springiness;
      }
      /**
       * @internal
       */
      easeInCore(gradient) {
        let num2;
        const num3 = Math.max(0, this.oscillations);
        const num = Math.max(0, this.springiness);
        if (num == 0) {
          num2 = gradient;
        } else {
          num2 = (Math.exp(num * gradient) - 1) / (Math.exp(num) - 1);
        }
        return num2 * Math.sin((6.283185307179586 * num3 + 1.5707963267948966) * gradient);
      }
    };
    ExponentialEase = class extends EasingFunction {
      /**
       * Instantiates an exponential easing function
       * @see https://easings.net/#easeInExpo
       * @param exponent Defines the exponent of the function
       */
      constructor(exponent = 2) {
        super();
        this.exponent = exponent;
      }
      /**
       * @internal
       */
      easeInCore(gradient) {
        if (this.exponent <= 0) {
          return gradient;
        }
        return (Math.exp(this.exponent * gradient) - 1) / (Math.exp(this.exponent) - 1);
      }
    };
    PowerEase = class extends EasingFunction {
      /**
       * Instantiates an power base easing function
       * @see https://easings.net/#easeInQuad
       * @param power Defines the power of the function
       */
      constructor(power = 2) {
        super();
        this.power = power;
      }
      /**
       * @internal
       */
      easeInCore(gradient) {
        const y = Math.max(0, this.power);
        return Math.pow(gradient, y);
      }
    };
    QuadraticEase = class extends EasingFunction {
      /**
       * @internal
       */
      easeInCore(gradient) {
        return gradient * gradient;
      }
    };
    QuarticEase = class extends EasingFunction {
      /**
       * @internal
       */
      easeInCore(gradient) {
        return gradient * gradient * gradient * gradient;
      }
    };
    QuinticEase = class extends EasingFunction {
      /**
       * @internal
       */
      easeInCore(gradient) {
        return gradient * gradient * gradient * gradient * gradient;
      }
    };
    SineEase = class extends EasingFunction {
      /**
       * @internal
       */
      easeInCore(gradient) {
        return 1 - Math.sin(1.5707963267948966 * (1 - gradient));
      }
    };
    BezierCurveEase = class extends EasingFunction {
      /**
       * Instantiates a bezier function
       * @see http://cubic-bezier.com/#.17,.67,.83,.67
       * @param x1 Defines the x component of the start tangent in the bezier curve
       * @param y1 Defines the y component of the start tangent in the bezier curve
       * @param x2 Defines the x component of the end tangent in the bezier curve
       * @param y2 Defines the y component of the end tangent in the bezier curve
       */
      constructor(x1 = 0, y1 = 0, x2 = 1, y2 = 1) {
        super();
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
      }
      /**
       * @internal
       */
      easeInCore(gradient) {
        return BezierCurve.Interpolate(gradient, this.x1, this.y1, this.x2, this.y2);
      }
    };
  }
});

// node_modules/@babylonjs/core/Meshes/subMesh.project.js
var init_subMesh_project = __esm({
  "node_modules/@babylonjs/core/Meshes/subMesh.project.js"() {
    init_math_vector();
    init_subMesh();
    SubMesh.prototype._projectOnTrianglesToRef = function(vector, positions, indices, step, checkStopper, ref) {
      const proj = TmpVectors.Vector3[0];
      const tmp = TmpVectors.Vector3[1];
      let distance = Infinity;
      for (let index = this.indexStart; index < this.indexStart + this.indexCount - (3 - step); index += step) {
        const indexA = indices[index];
        const indexB = indices[index + 1];
        const indexC = indices[index + 2];
        if (checkStopper && indexC === 4294967295) {
          index += 2;
          continue;
        }
        const p0 = positions[indexA];
        const p1 = positions[indexB];
        const p2 = positions[indexC];
        if (!p0 || !p1 || !p2) {
          continue;
        }
        const tmpDist = Vector3.ProjectOnTriangleToRef(vector, p0, p1, p2, tmp);
        if (tmpDist < distance) {
          proj.copyFrom(tmp);
          distance = tmpDist;
        }
      }
      ref.copyFrom(proj);
      return distance;
    };
    SubMesh.prototype._projectOnUnIndexedTrianglesToRef = function(vector, positions, indices, ref) {
      const proj = TmpVectors.Vector3[0];
      const tmp = TmpVectors.Vector3[1];
      let distance = Infinity;
      for (let index = this.verticesStart; index < this.verticesStart + this.verticesCount; index += 3) {
        const p0 = positions[index];
        const p1 = positions[index + 1];
        const p2 = positions[index + 2];
        const tmpDist = Vector3.ProjectOnTriangleToRef(vector, p0, p1, p2, tmp);
        if (tmpDist < distance) {
          proj.copyFrom(tmp);
          distance = tmpDist;
        }
      }
      ref.copyFrom(proj);
      return distance;
    };
    SubMesh.prototype.projectToRef = function(vector, positions, indices, ref) {
      const material = this.getMaterial();
      if (!material) {
        return -1;
      }
      let step = 3;
      let checkStopper = false;
      switch (material.fillMode) {
        case 3:
        case 5:
        case 6:
        case 8:
          return -1;
        case 7:
          step = 1;
          checkStopper = true;
          break;
        default:
          break;
      }
      if (material.fillMode === 4) {
        return -1;
      } else {
        if (!indices.length && this._mesh._unIndexed) {
          return this._projectOnUnIndexedTrianglesToRef(vector, positions, indices, ref);
        }
        return this._projectOnTrianglesToRef(vector, positions, indices, step, checkStopper, ref);
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/features/WebXRNearInteraction.js
var ControllerOrbAnimationState, WebXRNearControllerMode, WebXRNearInteraction;
var init_WebXRNearInteraction = __esm({
  "node_modules/@babylonjs/core/XR/features/WebXRNearInteraction.js"() {
    init_webXRFeaturesManager();
    init_sphereBuilder();
    init_math_vector();
    init_ray();
    init_pickingInfo();
    init_WebXRAbstractFeature();
    init_utilityLayerRenderer();
    init_boundingSphere();
    init_standardMaterial();
    init_math_color();
    init_nodeMaterial();
    init_animation();
    init_easing();
    init_subMesh_project();
    (function(ControllerOrbAnimationState2) {
      ControllerOrbAnimationState2[ControllerOrbAnimationState2["DEHYDRATED"] = 0] = "DEHYDRATED";
      ControllerOrbAnimationState2[ControllerOrbAnimationState2["HOVER"] = 1] = "HOVER";
      ControllerOrbAnimationState2[ControllerOrbAnimationState2["TOUCH"] = 2] = "TOUCH";
    })(ControllerOrbAnimationState || (ControllerOrbAnimationState = {}));
    (function(WebXRNearControllerMode2) {
      WebXRNearControllerMode2[WebXRNearControllerMode2["DISABLED"] = 0] = "DISABLED";
      WebXRNearControllerMode2[WebXRNearControllerMode2["CENTERED_ON_CONTROLLER"] = 1] = "CENTERED_ON_CONTROLLER";
      WebXRNearControllerMode2[WebXRNearControllerMode2["CENTERED_IN_FRONT"] = 2] = "CENTERED_IN_FRONT";
    })(WebXRNearControllerMode || (WebXRNearControllerMode = {}));
    WebXRNearInteraction = class _WebXRNearInteraction extends WebXRAbstractFeature {
      /**
       * constructs a new background remover module
       * @param _xrSessionManager the session manager for this module
       * @param _options read-only options to be used in this module
       */
      constructor(_xrSessionManager, _options) {
        super(_xrSessionManager);
        this._options = _options;
        this._tmpRay = new Ray(new Vector3(), new Vector3());
        this._attachController = (xrController) => {
          if (this._controllers[xrController.uniqueId]) {
            return;
          }
          const { touchCollisionMesh, touchCollisionMeshFunction, hydrateCollisionMeshFunction } = this._generateNewTouchPointMesh();
          const selectionMesh = this._generateVisualCue();
          this._controllers[xrController.uniqueId] = {
            xrController,
            meshUnderPointer: null,
            nearInteractionTargetMesh: null,
            pick: null,
            stalePick: null,
            touchCollisionMesh,
            touchCollisionMeshFunction,
            hydrateCollisionMeshFunction,
            currentAnimationState: ControllerOrbAnimationState.DEHYDRATED,
            grabRay: new Ray(new Vector3(), new Vector3()),
            hoverInteraction: false,
            nearInteraction: false,
            grabInteraction: false,
            downTriggered: false,
            id: _WebXRNearInteraction._IdCounter++,
            pickedPointVisualCue: selectionMesh
          };
          this._controllers[xrController.uniqueId]._worldScaleObserver = this._controllers[xrController.uniqueId]._worldScaleObserver || this._xrSessionManager.onWorldScaleFactorChangedObservable.add((values) => {
            if (values.newScaleFactor !== values.previousScaleFactor) {
              this._controllers[xrController.uniqueId].touchCollisionMesh.dispose();
              this._controllers[xrController.uniqueId].pickedPointVisualCue.dispose();
              const { touchCollisionMesh: touchCollisionMesh2, touchCollisionMeshFunction: touchCollisionMeshFunction2, hydrateCollisionMeshFunction: hydrateCollisionMeshFunction2 } = this._generateNewTouchPointMesh();
              this._controllers[xrController.uniqueId].touchCollisionMesh = touchCollisionMesh2;
              this._controllers[xrController.uniqueId].touchCollisionMeshFunction = touchCollisionMeshFunction2;
              this._controllers[xrController.uniqueId].hydrateCollisionMeshFunction = hydrateCollisionMeshFunction2;
              this._controllers[xrController.uniqueId].pickedPointVisualCue = this._generateVisualCue();
            }
          });
          if (this._attachedController) {
            if (!this._options.enableNearInteractionOnAllControllers && this._options.preferredHandedness && xrController.inputSource.handedness === this._options.preferredHandedness) {
              this._attachedController = xrController.uniqueId;
            }
          } else {
            if (!this._options.enableNearInteractionOnAllControllers) {
              this._attachedController = xrController.uniqueId;
            }
          }
          switch (xrController.inputSource.targetRayMode) {
            case "tracked-pointer":
              return this._attachNearInteractionMode(xrController);
            case "gaze":
              return null;
            case "screen":
              return null;
          }
        };
        this._controllers = {};
        this._farInteractionFeature = null;
        this.selectionMeshDefaultColor = new Color3(0.8, 0.8, 0.8);
        this.selectionMeshPickedColor = new Color3(0.3, 0.3, 1);
        this._hoverRadius = 0.1;
        this._pickRadius = 0.02;
        this._controllerPickRadius = 0.03;
        this._nearGrabLengthScale = 5;
        this._scene = this._xrSessionManager.scene;
        if (this._options.nearInteractionControllerMode === void 0) {
          this._options.nearInteractionControllerMode = WebXRNearControllerMode.CENTERED_IN_FRONT;
        }
        if (this._options.farInteractionFeature) {
          this._farInteractionFeature = this._options.farInteractionFeature;
        }
      }
      /**
       * Attach this feature
       * Will usually be called by the features manager
       *
       * @returns true if successful.
       */
      attach() {
        if (!super.attach()) {
          return false;
        }
        this._options.xrInput.controllers.forEach(this._attachController);
        this._addNewAttachObserver(this._options.xrInput.onControllerAddedObservable, this._attachController);
        this._addNewAttachObserver(this._options.xrInput.onControllerRemovedObservable, (controller) => {
          this._detachController(controller.uniqueId);
        });
        this._scene.constantlyUpdateMeshUnderPointer = true;
        return true;
      }
      /**
       * Detach this feature.
       * Will usually be called by the features manager
       *
       * @returns true if successful.
       */
      detach() {
        if (!super.detach()) {
          return false;
        }
        Object.keys(this._controllers).forEach((controllerId) => {
          this._detachController(controllerId);
        });
        return true;
      }
      /**
       * Will get the mesh under a specific pointer.
       * `scene.meshUnderPointer` will only return one mesh - either left or right.
       * @param controllerId the controllerId to check
       * @returns The mesh under pointer or null if no mesh is under the pointer
       */
      getMeshUnderPointer(controllerId) {
        if (this._controllers[controllerId]) {
          return this._controllers[controllerId].meshUnderPointer;
        } else {
          return null;
        }
      }
      /**
       * Get the xr controller that correlates to the pointer id in the pointer event
       *
       * @param id the pointer id to search for
       * @returns the controller that correlates to this id or null if not found
       */
      getXRControllerByPointerId(id) {
        const keys = Object.keys(this._controllers);
        for (let i = 0; i < keys.length; ++i) {
          if (this._controllers[keys[i]].id === id) {
            return this._controllers[keys[i]].xrController || null;
          }
        }
        return null;
      }
      /**
       * This function sets webXRControllerPointerSelection feature that will be disabled when
       * the hover range is reached for a mesh and will be reattached when not in hover range.
       * This is used to remove the selection rays when moving.
       * @param farInteractionFeature the feature to disable when finger is in hover range for a mesh
       */
      setFarInteractionFeature(farInteractionFeature) {
        this._farInteractionFeature = farInteractionFeature;
      }
      /**
       * Filter used for near interaction pick and hover
       * @param mesh the mesh candidate to be pick-filtered
       * @returns if the mesh should be included in the list of candidate meshes for near interaction
       */
      _nearPickPredicate(mesh) {
        return mesh.isEnabled() && mesh.isVisible && mesh.isPickable && mesh.isNearPickable;
      }
      /**
       * Filter used for near interaction grab
       * @param mesh the mesh candidate to be pick-filtered
       * @returns if the mesh should be included in the list of candidate meshes for near interaction
       */
      _nearGrabPredicate(mesh) {
        return mesh.isEnabled() && mesh.isVisible && mesh.isPickable && mesh.isNearGrabbable;
      }
      /**
       * Filter used for any near interaction
       * @param mesh the mesh candidate to be pick-filtered
       * @returns if the mesh should be included in the list of candidate meshes for near interaction
       */
      _nearInteractionPredicate(mesh) {
        return mesh.isEnabled() && mesh.isVisible && mesh.isPickable && (mesh.isNearPickable || mesh.isNearGrabbable);
      }
      _controllerAvailablePredicate(mesh, controllerId) {
        let parent = mesh;
        while (parent) {
          if (parent.reservedDataStore && parent.reservedDataStore.nearInteraction && parent.reservedDataStore.nearInteraction.excludedControllerId === controllerId) {
            return false;
          }
          parent = parent.parent;
        }
        return true;
      }
      _handleTransitionAnimation(controllerData, newState) {
        var _a;
        if (controllerData.currentAnimationState === newState || this._options.nearInteractionControllerMode !== WebXRNearControllerMode.CENTERED_IN_FRONT || !!((_a = controllerData.xrController) == null ? void 0 : _a.inputSource.hand)) {
          return;
        }
        if (newState > controllerData.currentAnimationState) {
          switch (controllerData.currentAnimationState) {
            case ControllerOrbAnimationState.DEHYDRATED: {
              controllerData.hydrateCollisionMeshFunction(true);
              if (newState === ControllerOrbAnimationState.HOVER) {
                break;
              }
            }
            case ControllerOrbAnimationState.HOVER: {
              controllerData.touchCollisionMeshFunction(true);
              if (newState === ControllerOrbAnimationState.TOUCH) {
                break;
              }
            }
          }
        } else {
          switch (controllerData.currentAnimationState) {
            case ControllerOrbAnimationState.TOUCH: {
              controllerData.touchCollisionMeshFunction(false);
              if (newState === ControllerOrbAnimationState.HOVER) {
                break;
              }
            }
            case ControllerOrbAnimationState.HOVER: {
              controllerData.hydrateCollisionMeshFunction(false);
              if (newState === ControllerOrbAnimationState.DEHYDRATED) {
                break;
              }
            }
          }
        }
        controllerData.currentAnimationState = newState;
      }
      _processTouchPoint(id, position, orientation) {
        var _a;
        const controllerData = this._controllers[id];
        controllerData.grabRay.origin.copyFrom(position);
        orientation.toEulerAnglesToRef(TmpVectors.Vector3[0]);
        controllerData.grabRay.direction.copyFrom(TmpVectors.Vector3[0]);
        if (this._options.nearInteractionControllerMode === WebXRNearControllerMode.CENTERED_IN_FRONT && !((_a = controllerData.xrController) == null ? void 0 : _a.inputSource.hand)) {
          controllerData.xrController.getWorldPointerRayToRef(this._tmpRay);
          controllerData.grabRay.origin.addInPlace(this._tmpRay.direction.scale(0.05));
        }
        controllerData.grabRay.length = this._nearGrabLengthScale * this._hoverRadius * this._xrSessionManager.worldScalingFactor;
        controllerData.touchCollisionMesh.position.copyFrom(controllerData.grabRay.origin).scaleInPlace(this._xrSessionManager.worldScalingFactor);
      }
      _onXRFrame(_xrFrame) {
        Object.keys(this._controllers).forEach((id) => {
          var _a;
          const controllerData = this._controllers[id];
          const handData = (_a = controllerData.xrController) == null ? void 0 : _a.inputSource.hand;
          if (!this._options.enableNearInteractionOnAllControllers && id !== this._attachedController || !controllerData.xrController || !handData && (!this._options.nearInteractionControllerMode || !controllerData.xrController.inputSource.gamepad)) {
            controllerData.pick = null;
            return;
          }
          controllerData.hoverInteraction = false;
          controllerData.nearInteraction = false;
          if (controllerData.xrController) {
            if (handData) {
              const xrIndexTip = handData.get("index-finger-tip");
              if (xrIndexTip) {
                const indexTipPose = _xrFrame.getJointPose(xrIndexTip, this._xrSessionManager.referenceSpace);
                if (indexTipPose && indexTipPose.transform) {
                  const axisRHSMultiplier = this._scene.useRightHandedSystem ? 1 : -1;
                  TmpVectors.Vector3[0].set(indexTipPose.transform.position.x, indexTipPose.transform.position.y, indexTipPose.transform.position.z * axisRHSMultiplier);
                  TmpVectors.Quaternion[0].set(indexTipPose.transform.orientation.x, indexTipPose.transform.orientation.y, indexTipPose.transform.orientation.z * axisRHSMultiplier, indexTipPose.transform.orientation.w * axisRHSMultiplier);
                  this._processTouchPoint(id, TmpVectors.Vector3[0], TmpVectors.Quaternion[0]);
                }
              }
            } else if (controllerData.xrController.inputSource.gamepad && this._options.nearInteractionControllerMode !== WebXRNearControllerMode.DISABLED) {
              let controllerPose = controllerData.xrController.pointer;
              if (controllerData.xrController.grip && this._options.nearInteractionControllerMode === WebXRNearControllerMode.CENTERED_ON_CONTROLLER) {
                controllerPose = controllerData.xrController.grip;
              }
              this._processTouchPoint(id, controllerPose.position, controllerPose.rotationQuaternion);
            }
          } else {
            return;
          }
          const accuratePickInfo = (originalScenePick, utilityScenePick) => {
            let pick = null;
            if (!utilityScenePick || !utilityScenePick.hit) {
              pick = originalScenePick;
            } else if (!originalScenePick || !originalScenePick.hit) {
              pick = utilityScenePick;
            } else if (utilityScenePick.distance < originalScenePick.distance) {
              pick = utilityScenePick;
            } else {
              pick = originalScenePick;
            }
            return pick;
          };
          const populateNearInteractionInfo = (nearInteractionInfo) => {
            let result = new PickingInfo();
            let nearInteractionAtOrigin = false;
            const nearInteraction = nearInteractionInfo && nearInteractionInfo.pickedPoint && nearInteractionInfo.hit;
            if (nearInteractionInfo == null ? void 0 : nearInteractionInfo.pickedPoint) {
              nearInteractionAtOrigin = nearInteractionInfo.pickedPoint.x === 0 && nearInteractionInfo.pickedPoint.y === 0 && nearInteractionInfo.pickedPoint.z === 0;
            }
            if (nearInteraction && !nearInteractionAtOrigin) {
              result = nearInteractionInfo;
            }
            return result;
          };
          if (!controllerData.grabInteraction) {
            let pick = null;
            let utilitySceneHoverPick = null;
            if (this._options.useUtilityLayer && this._utilityLayerScene) {
              utilitySceneHoverPick = this._pickWithSphere(controllerData, this._hoverRadius * this._xrSessionManager.worldScalingFactor, this._utilityLayerScene, (mesh) => this._nearInteractionPredicate(mesh));
            }
            const originalSceneHoverPick = this._pickWithSphere(controllerData, this._hoverRadius * this._xrSessionManager.worldScalingFactor, this._scene, (mesh) => this._nearInteractionPredicate(mesh));
            const hoverPickInfo = accuratePickInfo(originalSceneHoverPick, utilitySceneHoverPick);
            if (hoverPickInfo && hoverPickInfo.hit) {
              pick = populateNearInteractionInfo(hoverPickInfo);
              if (pick.hit) {
                controllerData.hoverInteraction = true;
              }
            }
            if (controllerData.hoverInteraction) {
              let utilitySceneNearPick = null;
              const radius = (handData ? this._pickRadius : this._controllerPickRadius) * this._xrSessionManager.worldScalingFactor;
              if (this._options.useUtilityLayer && this._utilityLayerScene) {
                utilitySceneNearPick = this._pickWithSphere(controllerData, radius, this._utilityLayerScene, (mesh) => this._nearPickPredicate(mesh));
              }
              const originalSceneNearPick = this._pickWithSphere(controllerData, radius, this._scene, (mesh) => this._nearPickPredicate(mesh));
              const pickInfo = accuratePickInfo(originalSceneNearPick, utilitySceneNearPick);
              const nearPick = populateNearInteractionInfo(pickInfo);
              if (nearPick.hit) {
                pick = nearPick;
                controllerData.nearInteraction = true;
              }
            }
            controllerData.stalePick = controllerData.pick;
            controllerData.pick = pick;
            if (controllerData.pick && controllerData.pick.pickedPoint && controllerData.pick.hit) {
              controllerData.meshUnderPointer = controllerData.pick.pickedMesh;
              controllerData.pickedPointVisualCue.position.copyFrom(controllerData.pick.pickedPoint);
              controllerData.pickedPointVisualCue.isVisible = true;
              if (this._farInteractionFeature && this._farInteractionFeature.attached) {
                this._farInteractionFeature._setPointerSelectionDisabledByPointerId(controllerData.id, true);
              }
            } else {
              controllerData.meshUnderPointer = null;
              controllerData.pickedPointVisualCue.isVisible = false;
              if (this._farInteractionFeature && this._farInteractionFeature.attached) {
                this._farInteractionFeature._setPointerSelectionDisabledByPointerId(controllerData.id, false);
              }
            }
          }
          let state = ControllerOrbAnimationState.DEHYDRATED;
          if (controllerData.grabInteraction || controllerData.nearInteraction) {
            state = ControllerOrbAnimationState.TOUCH;
          } else if (controllerData.hoverInteraction) {
            state = ControllerOrbAnimationState.HOVER;
          }
          this._handleTransitionAnimation(controllerData, state);
        });
      }
      get _utilityLayerScene() {
        return this._options.customUtilityLayerScene || UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene;
      }
      _generateVisualCue() {
        const sceneToRenderTo = this._options.useUtilityLayer ? this._options.customUtilityLayerScene || UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene : this._scene;
        const selectionMesh = CreateSphere("nearInteraction", {
          diameter: 35e-4 * 3 * this._xrSessionManager.worldScalingFactor
        }, sceneToRenderTo);
        selectionMesh.bakeCurrentTransformIntoVertices();
        selectionMesh.isPickable = false;
        selectionMesh.isVisible = false;
        selectionMesh.rotationQuaternion = Quaternion.Identity();
        const targetMat = new StandardMaterial("targetMat", sceneToRenderTo);
        targetMat.specularColor = Color3.Black();
        targetMat.emissiveColor = this.selectionMeshDefaultColor;
        targetMat.backFaceCulling = false;
        selectionMesh.material = targetMat;
        return selectionMesh;
      }
      _isControllerReadyForNearInteraction(id) {
        if (this._farInteractionFeature) {
          return this._farInteractionFeature._getPointerSelectionDisabledByPointerId(id);
        }
        return true;
      }
      _attachNearInteractionMode(xrController) {
        const controllerData = this._controllers[xrController.uniqueId];
        const pointerEventInit = {
          pointerId: controllerData.id,
          pointerType: "xr-near"
        };
        controllerData.onFrameObserver = this._xrSessionManager.onXRFrameObservable.add(() => {
          if (!this._options.enableNearInteractionOnAllControllers && xrController.uniqueId !== this._attachedController || !controllerData.xrController || !controllerData.xrController.inputSource.hand && (!this._options.nearInteractionControllerMode || !controllerData.xrController.inputSource.gamepad)) {
            return;
          }
          if (controllerData.pick) {
            controllerData.pick.ray = controllerData.grabRay;
          }
          if (controllerData.pick && this._isControllerReadyForNearInteraction(controllerData.id)) {
            this._scene.simulatePointerMove(controllerData.pick, pointerEventInit);
          }
          if (controllerData.nearInteraction && controllerData.pick && controllerData.pick.hit) {
            if (!controllerData.nearInteractionTargetMesh) {
              this._scene.simulatePointerDown(controllerData.pick, pointerEventInit);
              controllerData.nearInteractionTargetMesh = controllerData.meshUnderPointer;
              controllerData.downTriggered = true;
            }
          } else if (controllerData.nearInteractionTargetMesh && controllerData.stalePick) {
            this._scene.simulatePointerUp(controllerData.stalePick, pointerEventInit);
            controllerData.downTriggered = false;
            controllerData.nearInteractionTargetMesh = null;
          }
        });
        const grabCheck = (pressed) => {
          if (this._options.enableNearInteractionOnAllControllers || xrController.uniqueId === this._attachedController && this._isControllerReadyForNearInteraction(controllerData.id)) {
            if (controllerData.pick) {
              controllerData.pick.ray = controllerData.grabRay;
            }
            if (pressed && controllerData.pick && controllerData.meshUnderPointer && this._nearGrabPredicate(controllerData.meshUnderPointer)) {
              controllerData.grabInteraction = true;
              controllerData.pickedPointVisualCue.isVisible = false;
              this._scene.simulatePointerDown(controllerData.pick, pointerEventInit);
              controllerData.downTriggered = true;
            } else if (!pressed && controllerData.pick && controllerData.grabInteraction) {
              this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
              controllerData.downTriggered = false;
              controllerData.grabInteraction = false;
              controllerData.pickedPointVisualCue.isVisible = true;
            }
          } else {
            if (pressed && !this._options.enableNearInteractionOnAllControllers && !this._options.disableSwitchOnClick) {
              this._attachedController = xrController.uniqueId;
            }
          }
        };
        if (xrController.inputSource.gamepad) {
          const init = (motionController) => {
            controllerData.squeezeComponent = motionController.getComponent("grasp");
            if (controllerData.squeezeComponent) {
              controllerData.onSqueezeButtonChangedObserver = controllerData.squeezeComponent.onButtonStateChangedObservable.add((component) => {
                if (component.changes.pressed) {
                  const pressed = component.changes.pressed.current;
                  grabCheck(pressed);
                }
              });
            } else {
              controllerData.selectionComponent = motionController.getMainComponent();
              controllerData.onButtonChangedObserver = controllerData.selectionComponent.onButtonStateChangedObservable.add((component) => {
                if (component.changes.pressed) {
                  const pressed = component.changes.pressed.current;
                  grabCheck(pressed);
                }
              });
            }
          };
          if (xrController.motionController) {
            init(xrController.motionController);
          } else {
            xrController.onMotionControllerInitObservable.add(init);
          }
        } else {
          const selectStartListener = (event) => {
            if (controllerData.xrController && event.inputSource === controllerData.xrController.inputSource && controllerData.pick && this._isControllerReadyForNearInteraction(controllerData.id) && controllerData.meshUnderPointer && this._nearGrabPredicate(controllerData.meshUnderPointer)) {
              controllerData.grabInteraction = true;
              controllerData.pickedPointVisualCue.isVisible = false;
              this._scene.simulatePointerDown(controllerData.pick, pointerEventInit);
              controllerData.downTriggered = true;
            }
          };
          const selectEndListener = (event) => {
            if (controllerData.xrController && event.inputSource === controllerData.xrController.inputSource && controllerData.pick && this._isControllerReadyForNearInteraction(controllerData.id)) {
              this._scene.simulatePointerUp(controllerData.pick, pointerEventInit);
              controllerData.grabInteraction = false;
              controllerData.pickedPointVisualCue.isVisible = true;
              controllerData.downTriggered = false;
            }
          };
          controllerData.eventListeners = {
            selectend: selectEndListener,
            selectstart: selectStartListener
          };
          this._xrSessionManager.session.addEventListener("selectstart", selectStartListener);
          this._xrSessionManager.session.addEventListener("selectend", selectEndListener);
        }
      }
      _detachController(xrControllerUniqueId) {
        const controllerData = this._controllers[xrControllerUniqueId];
        if (!controllerData) {
          return;
        }
        if (controllerData.squeezeComponent) {
          if (controllerData.onSqueezeButtonChangedObserver) {
            controllerData.squeezeComponent.onButtonStateChangedObservable.remove(controllerData.onSqueezeButtonChangedObserver);
          }
        }
        if (controllerData.selectionComponent) {
          if (controllerData.onButtonChangedObserver) {
            controllerData.selectionComponent.onButtonStateChangedObservable.remove(controllerData.onButtonChangedObserver);
          }
        }
        if (controllerData.onFrameObserver) {
          this._xrSessionManager.onXRFrameObservable.remove(controllerData.onFrameObserver);
        }
        if (controllerData.eventListeners) {
          Object.keys(controllerData.eventListeners).forEach((eventName) => {
            const func = controllerData.eventListeners && controllerData.eventListeners[eventName];
            if (func) {
              this._xrSessionManager.session.removeEventListener(eventName, func);
            }
          });
        }
        controllerData.touchCollisionMesh.dispose();
        controllerData.pickedPointVisualCue.dispose();
        this._xrSessionManager.runInXRFrame(() => {
          if (!controllerData.downTriggered) {
            return;
          }
          const pointerEventInit = {
            pointerId: controllerData.id,
            pointerType: "xr-near"
          };
          this._scene.simulatePointerUp(new PickingInfo(), pointerEventInit);
        });
        if (controllerData._worldScaleObserver) {
          this._xrSessionManager.onWorldScaleFactorChangedObservable.remove(controllerData._worldScaleObserver);
        }
        delete this._controllers[xrControllerUniqueId];
        if (this._attachedController === xrControllerUniqueId) {
          const keys = Object.keys(this._controllers);
          if (keys.length) {
            this._attachedController = keys[0];
          } else {
            this._attachedController = "";
          }
        }
      }
      _generateNewTouchPointMesh() {
        const worldScale = this._xrSessionManager.worldScalingFactor;
        const meshCreationScene = this._options.useUtilityLayer ? this._options.customUtilityLayerScene || UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene : this._scene;
        const touchCollisionMesh = CreateSphere("PickSphere", { diameter: 1 * worldScale }, meshCreationScene);
        touchCollisionMesh.isVisible = false;
        if (this._options.motionControllerOrbMaterial) {
          touchCollisionMesh.material = this._options.motionControllerOrbMaterial;
        } else {
          NodeMaterial.ParseFromSnippetAsync("8RUNKL#3", meshCreationScene).then((nodeMaterial) => {
            touchCollisionMesh.material = nodeMaterial;
          });
        }
        const easingFunction = new QuadraticEase();
        easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        const hoverSizeVec = new Vector3(this._controllerPickRadius, this._controllerPickRadius, this._controllerPickRadius).scaleInPlace(worldScale);
        const touchSize = this._controllerPickRadius * (4 / 3);
        const touchSizeVec = new Vector3(touchSize, touchSize, touchSize).scaleInPlace(worldScale);
        const hydrateTransitionSize = this._controllerPickRadius * (7 / 6);
        const hydrateTransitionSizeVec = new Vector3(hydrateTransitionSize, hydrateTransitionSize, hydrateTransitionSize).scaleInPlace(worldScale);
        const touchHoverTransitionSize = this._controllerPickRadius * (4 / 5);
        const touchHoverTransitionSizeVec = new Vector3(touchHoverTransitionSize, touchHoverTransitionSize, touchHoverTransitionSize).scaleInPlace(worldScale);
        const hoverTouchTransitionSize = this._controllerPickRadius * (3 / 2);
        const hoverTouchTransitionSizeVec = new Vector3(hoverTouchTransitionSize, hoverTouchTransitionSize, hoverTouchTransitionSize).scaleInPlace(worldScale);
        const touchKeys = [
          { frame: 0, value: hoverSizeVec },
          { frame: 10, value: hoverTouchTransitionSizeVec },
          { frame: 18, value: touchSizeVec }
        ];
        const releaseKeys = [
          { frame: 0, value: touchSizeVec },
          { frame: 10, value: touchHoverTransitionSizeVec },
          { frame: 18, value: hoverSizeVec }
        ];
        const hydrateKeys = [
          { frame: 0, value: Vector3.ZeroReadOnly },
          { frame: 12, value: hydrateTransitionSizeVec },
          { frame: 15, value: hoverSizeVec }
        ];
        const dehydrateKeys = [
          { frame: 0, value: hoverSizeVec },
          { frame: 10, value: Vector3.ZeroReadOnly },
          { frame: 15, value: Vector3.ZeroReadOnly }
        ];
        const touchAction = new Animation("touch", "scaling", 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const releaseAction = new Animation("release", "scaling", 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const hydrateAction = new Animation("hydrate", "scaling", 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const dehydrateAction = new Animation("dehydrate", "scaling", 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        touchAction.setEasingFunction(easingFunction);
        releaseAction.setEasingFunction(easingFunction);
        hydrateAction.setEasingFunction(easingFunction);
        dehydrateAction.setEasingFunction(easingFunction);
        touchAction.setKeys(touchKeys);
        releaseAction.setKeys(releaseKeys);
        hydrateAction.setKeys(hydrateKeys);
        dehydrateAction.setKeys(dehydrateKeys);
        const touchCollisionMeshFunction = (isTouch) => {
          const action = isTouch ? touchAction : releaseAction;
          meshCreationScene.beginDirectAnimation(touchCollisionMesh, [action], 0, 18, false, 1);
        };
        const hydrateCollisionMeshFunction = (isHydration) => {
          const action = isHydration ? hydrateAction : dehydrateAction;
          if (isHydration) {
            touchCollisionMesh.isVisible = true;
          }
          meshCreationScene.beginDirectAnimation(touchCollisionMesh, [action], 0, 15, false, 1, () => {
            if (!isHydration) {
              touchCollisionMesh.isVisible = false;
            }
          });
        };
        return { touchCollisionMesh, touchCollisionMeshFunction, hydrateCollisionMeshFunction };
      }
      _pickWithSphere(controllerData, radius, sceneToUse, predicate) {
        const pickingInfo = new PickingInfo();
        pickingInfo.distance = Infinity;
        if (controllerData.touchCollisionMesh && controllerData.xrController) {
          const position = controllerData.touchCollisionMesh.position;
          const sphere = BoundingSphere.CreateFromCenterAndRadius(position, radius);
          for (let meshIndex = 0; meshIndex < sceneToUse.meshes.length; meshIndex++) {
            const mesh = sceneToUse.meshes[meshIndex];
            if (!predicate(mesh) || !this._controllerAvailablePredicate(mesh, controllerData.xrController.uniqueId)) {
              continue;
            }
            const result = _WebXRNearInteraction.PickMeshWithSphere(mesh, sphere);
            if (result && result.hit && result.distance < pickingInfo.distance) {
              pickingInfo.hit = result.hit;
              pickingInfo.pickedMesh = mesh;
              pickingInfo.pickedPoint = result.pickedPoint;
              pickingInfo.aimTransform = controllerData.xrController.pointer;
              pickingInfo.gripTransform = controllerData.xrController.grip || null;
              pickingInfo.originMesh = controllerData.touchCollisionMesh;
              pickingInfo.distance = result.distance;
              pickingInfo.bu = result.bu;
              pickingInfo.bv = result.bv;
              pickingInfo.faceId = result.faceId;
              pickingInfo.subMeshId = result.subMeshId;
            }
          }
        }
        return pickingInfo;
      }
      /**
       * Picks a mesh with a sphere
       * @param mesh the mesh to pick
       * @param sphere picking sphere in world coordinates
       * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
       * @returns the picking info
       */
      static PickMeshWithSphere(mesh, sphere, skipBoundingInfo = false) {
        const subMeshes = mesh.subMeshes;
        const pi = new PickingInfo();
        const boundingInfo = mesh.getBoundingInfo();
        if (!mesh._generatePointsArray()) {
          return pi;
        }
        if (!mesh.subMeshes || !boundingInfo) {
          return pi;
        }
        if (!skipBoundingInfo && !BoundingSphere.Intersects(boundingInfo.boundingSphere, sphere)) {
          return pi;
        }
        const result = TmpVectors.Vector3[0];
        const tmpVec = TmpVectors.Vector3[1];
        const tmpRay = new Ray(Vector3.Zero(), Vector3.Zero(), 1);
        let distance = Infinity;
        let tmp, tmpDistanceSphereToCenter, tmpDistanceSurfaceToCenter, intersectionInfo;
        const center = TmpVectors.Vector3[2];
        const worldToMesh = TmpVectors.Matrix[0];
        worldToMesh.copyFrom(mesh.getWorldMatrix());
        worldToMesh.invert();
        Vector3.TransformCoordinatesToRef(sphere.center, worldToMesh, center);
        for (let index = 0; index < subMeshes.length; index++) {
          const subMesh = subMeshes[index];
          subMesh.projectToRef(center, mesh._positions, mesh.getIndices(), tmpVec);
          Vector3.TransformCoordinatesToRef(tmpVec, mesh.getWorldMatrix(), tmpVec);
          tmp = Vector3.Distance(tmpVec, sphere.center);
          tmpDistanceSurfaceToCenter = Vector3.Distance(tmpVec, mesh.getAbsolutePosition());
          tmpDistanceSphereToCenter = Vector3.Distance(sphere.center, mesh.getAbsolutePosition());
          if (tmpDistanceSphereToCenter !== -1 && tmpDistanceSurfaceToCenter !== -1 && tmpDistanceSurfaceToCenter > tmpDistanceSphereToCenter) {
            tmp = 0;
            tmpVec.copyFrom(sphere.center);
          }
          if (tmp !== -1 && tmp < distance) {
            distance = tmp;
            Ray.CreateFromToToRef(sphere.center, tmpVec, tmpRay);
            tmpRay.length = distance * 2;
            intersectionInfo = tmpRay.intersectsMesh(mesh);
            result.copyFrom(tmpVec);
          }
        }
        if (distance < sphere.radius) {
          pi.hit = true;
          pi.distance = distance;
          pi.pickedMesh = mesh;
          pi.pickedPoint = result.clone();
          if (intersectionInfo && intersectionInfo.bu !== null && intersectionInfo.bv !== null) {
            pi.faceId = intersectionInfo.faceId;
            pi.subMeshId = intersectionInfo.subMeshId;
            pi.bu = intersectionInfo.bu;
            pi.bv = intersectionInfo.bv;
          }
        }
        return pi;
      }
    };
    WebXRNearInteraction._IdCounter = 200;
    WebXRNearInteraction.Name = WebXRFeatureName.NEAR_INTERACTION;
    WebXRNearInteraction.Version = 1;
    WebXRFeaturesManager.AddWebXRFeature(WebXRNearInteraction.Name, (xrSessionManager, options) => {
      return () => new WebXRNearInteraction(xrSessionManager, options);
    }, WebXRNearInteraction.Version, true);
  }
});

// node_modules/@babylonjs/core/XR/webXREnterExitUI.js
var WebXREnterExitUIButton, WebXREnterExitUIOptions, WebXREnterExitUI;
var init_webXREnterExitUI = __esm({
  "node_modules/@babylonjs/core/XR/webXREnterExitUI.js"() {
    init_observable();
    init_webXRTypes();
    init_tools();
    WebXREnterExitUIButton = class {
      /**
       * Creates a WebXREnterExitUIButton
       * @param element button element
       * @param sessionMode XR initialization session mode
       * @param referenceSpaceType the type of reference space to be used
       */
      constructor(element, sessionMode, referenceSpaceType) {
        this.element = element;
        this.sessionMode = sessionMode;
        this.referenceSpaceType = referenceSpaceType;
      }
      /**
       * Extendable function which can be used to update the button's visuals when the state changes
       * @param activeButton the current active button in the UI
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      update(activeButton) {
      }
    };
    WebXREnterExitUIOptions = class {
    };
    WebXREnterExitUI = class _WebXREnterExitUI {
      /**
       * Construct a new EnterExit UI class
       *
       * @param _scene babylon scene object to use
       * @param options (read-only) version of the options passed to this UI
       */
      constructor(_scene, options) {
        this._scene = _scene;
        this.options = options;
        this._activeButton = null;
        this._buttons = [];
        this.activeButtonChangedObservable = new Observable();
        this._onSessionGranted = (evt) => {
          if (this._helper) {
            this._enterXRWithButtonIndex(0);
          }
        };
        this.overlay = document.createElement("div");
        this.overlay.classList.add("xr-button-overlay");
        if (!options.ignoreSessionGrantedEvent && navigator.xr) {
          navigator.xr.addEventListener("sessiongranted", this._onSessionGranted);
        }
        if (typeof window !== "undefined") {
          if (window.location && window.location.protocol === "http:" && window.location.hostname !== "localhost") {
            Tools.Warn("WebXR can only be served over HTTPS");
            throw new Error("WebXR can only be served over HTTPS");
          }
        }
        if (options.customButtons) {
          this._buttons = options.customButtons;
        } else {
          this.overlay.style.cssText = "z-index:11;position: absolute; right: 20px;bottom: 50px;";
          const sessionMode = options.sessionMode || "immersive-vr";
          const referenceSpaceType = options.referenceSpaceType || "local-floor";
          const url = typeof SVGSVGElement === "undefined" ? "https://cdn.babylonjs.com/Assets/vrButton.png" : "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%222048%22%20height%3D%221152%22%20viewBox%3D%220%200%202048%201152%22%20version%3D%221.1%22%3E%3Cpath%20transform%3D%22rotate%28180%201024%2C576.0000000000001%29%22%20d%3D%22m1109%2C896q17%2C0%2030%2C-12t13%2C-30t-12.5%2C-30.5t-30.5%2C-12.5l-170%2C0q-18%2C0%20-30.5%2C12.5t-12.5%2C30.5t13%2C30t30%2C12l170%2C0zm-85%2C256q59%2C0%20132.5%2C-1.5t154.5%2C-5.5t164.5%2C-11.5t163%2C-20t150%2C-30t124.5%2C-41.5q23%2C-11%2042%2C-24t38%2C-30q27%2C-25%2041%2C-61.5t14%2C-72.5l0%2C-257q0%2C-123%20-47%2C-232t-128%2C-190t-190%2C-128t-232%2C-47l-81%2C0q-37%2C0%20-68.5%2C14t-60.5%2C34.5t-55.5%2C45t-53%2C45t-53%2C34.5t-55.5%2C14t-55.5%2C-14t-53%2C-34.5t-53%2C-45t-55.5%2C-45t-60.5%2C-34.5t-68.5%2C-14l-81%2C0q-123%2C0%20-232%2C47t-190%2C128t-128%2C190t-47%2C232l0%2C257q0%2C68%2038%2C115t97%2C73q54%2C24%20124.5%2C41.5t150%2C30t163%2C20t164.5%2C11.5t154.5%2C5.5t132.5%2C1.5zm939%2C-298q0%2C39%20-24.5%2C67t-58.5%2C42q-54%2C23%20-122%2C39.5t-143.5%2C28t-155.5%2C19t-157%2C11t-148.5%2C5t-129.5%2C1.5q-59%2C0%20-130%2C-1.5t-148%2C-5t-157%2C-11t-155.5%2C-19t-143.5%2C-28t-122%2C-39.5q-34%2C-14%20-58.5%2C-42t-24.5%2C-67l0%2C-257q0%2C-106%2040.5%2C-199t110%2C-162.5t162.5%2C-109.5t199%2C-40l81%2C0q27%2C0%2052%2C14t50%2C34.5t51%2C44.5t55.5%2C44.5t63.5%2C34.5t74%2C14t74%2C-14t63.5%2C-34.5t55.5%2C-44.5t51%2C-44.5t50%2C-34.5t52%2C-14l14%2C0q37%2C0%2070%2C0.5t64.5%2C4.5t63.5%2C12t68%2C23q71%2C30%20128.5%2C78.5t98.5%2C110t63.5%2C133.5t22.5%2C149l0%2C257z%22%20fill%3D%22white%22%20/%3E%3C/svg%3E%0A";
          let css = ".babylonVRicon { color: #868686; border-color: #868686; border-style: solid; margin-left: 10px; height: 50px; width: 80px; background-color: rgba(51,51,51,0.7); background-image: url(" + url + "); background-size: 80%; background-repeat:no-repeat; background-position: center; border: none; outline: none; transition: transform 0.125s ease-out } .babylonVRicon:hover { transform: scale(1.05) } .babylonVRicon:active {background-color: rgba(51,51,51,1) } .babylonVRicon:focus {background-color: rgba(51,51,51,1) }";
          css += '.babylonVRicon.vrdisplaypresenting { background-image: none;} .vrdisplaypresenting::after { content: "EXIT"} .xr-error::after { content: "ERROR"}';
          const style = document.createElement("style");
          style.appendChild(document.createTextNode(css));
          document.getElementsByTagName("head")[0].appendChild(style);
          const hmdBtn = document.createElement("button");
          hmdBtn.className = "babylonVRicon";
          hmdBtn.title = `${sessionMode} - ${referenceSpaceType}`;
          this._buttons.push(new WebXREnterExitUIButton(hmdBtn, sessionMode, referenceSpaceType));
          this._buttons[this._buttons.length - 1].update = function(activeButton) {
            this.element.style.display = activeButton === null || activeButton === this ? "" : "none";
            hmdBtn.className = "babylonVRicon" + (activeButton === this ? " vrdisplaypresenting" : "");
          };
          this._updateButtons(null);
        }
        const renderCanvas = _scene.getEngine().getInputElement();
        if (renderCanvas && renderCanvas.parentNode) {
          renderCanvas.parentNode.appendChild(this.overlay);
          _scene.onDisposeObservable.addOnce(() => {
            this.dispose();
          });
        }
      }
      /**
       * Set the helper to be used with this UI component.
       * The UI is bound to an experience helper. If not provided the UI can still be used but the events should be registered by the developer.
       *
       * @param helper the experience helper to attach
       * @param renderTarget an optional render target (in case it is created outside of the helper scope)
       * @returns a promise that resolves when the ui is ready
       */
      async setHelperAsync(helper, renderTarget) {
        this._helper = helper;
        this._renderTarget = renderTarget;
        const supportedPromises = this._buttons.map((btn) => {
          return helper.sessionManager.isSessionSupportedAsync(btn.sessionMode);
        });
        helper.onStateChangedObservable.add((state) => {
          if (state == WebXRState.NOT_IN_XR) {
            this._updateButtons(null);
          }
        });
        const results = await Promise.all(supportedPromises);
        results.forEach((supported, i) => {
          if (supported) {
            this.overlay.appendChild(this._buttons[i].element);
            this._buttons[i].element.onclick = this._enterXRWithButtonIndex.bind(this, i);
          } else {
            Tools.Warn(`Session mode "${this._buttons[i].sessionMode}" not supported in browser`);
          }
        });
      }
      /**
       * Creates UI to allow the user to enter/exit XR mode
       * @param scene the scene to add the ui to
       * @param helper the xr experience helper to enter/exit xr with
       * @param options options to configure the UI
       * @returns the created ui
       */
      static async CreateAsync(scene, helper, options) {
        const ui = new _WebXREnterExitUI(scene, options);
        await ui.setHelperAsync(helper, options.renderTarget || void 0);
        return ui;
      }
      async _enterXRWithButtonIndex(idx = 0) {
        if (this._helper.state == WebXRState.IN_XR) {
          await this._helper.exitXRAsync();
          this._updateButtons(null);
        } else if (this._helper.state == WebXRState.NOT_IN_XR) {
          try {
            await this._helper.enterXRAsync(this._buttons[idx].sessionMode, this._buttons[idx].referenceSpaceType, this._renderTarget, {
              optionalFeatures: this.options.optionalFeatures,
              requiredFeatures: this.options.requiredFeatures
            });
            this._updateButtons(this._buttons[idx]);
          } catch (e) {
            this._updateButtons(null);
            const element = this._buttons[idx].element;
            const prevTitle = element.title;
            element.title = "Error entering XR session : " + prevTitle;
            element.classList.add("xr-error");
            if (this.options.onError) {
              this.options.onError(e);
            }
          }
        }
      }
      /**
       * Disposes of the XR UI component
       */
      dispose() {
        const renderCanvas = this._scene.getEngine().getInputElement();
        if (renderCanvas && renderCanvas.parentNode && renderCanvas.parentNode.contains(this.overlay)) {
          renderCanvas.parentNode.removeChild(this.overlay);
        }
        this.activeButtonChangedObservable.clear();
        navigator.xr.removeEventListener("sessiongranted", this._onSessionGranted);
      }
      _updateButtons(activeButton) {
        this._activeButton = activeButton;
        this._buttons.forEach((b) => {
          b.update(this._activeButton);
        });
        this.activeButtonChangedObservable.notifyObservers(this._activeButton);
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Extensions/engine.dynamicTexture.js
var init_engine_dynamicTexture = __esm({
  "node_modules/@babylonjs/core/Engines/Extensions/engine.dynamicTexture.js"() {
    init_thinEngine();
    init_internalTexture();
    ThinEngine.prototype.createDynamicTexture = function(width, height, generateMipMaps, samplingMode) {
      const texture = new InternalTexture(this, InternalTextureSource.Dynamic);
      texture.baseWidth = width;
      texture.baseHeight = height;
      if (generateMipMaps) {
        width = this.needPOTTextures ? ThinEngine.GetExponentOfTwo(width, this._caps.maxTextureSize) : width;
        height = this.needPOTTextures ? ThinEngine.GetExponentOfTwo(height, this._caps.maxTextureSize) : height;
      }
      texture.width = width;
      texture.height = height;
      texture.isReady = false;
      texture.generateMipMaps = generateMipMaps;
      texture.samplingMode = samplingMode;
      this.updateTextureSamplingMode(samplingMode, texture);
      this._internalTexturesCache.push(texture);
      return texture;
    };
    ThinEngine.prototype.updateDynamicTexture = function(texture, source, invertY, premulAlpha = false, format, forceBindTexture = false, allowGPUOptimization = false) {
      if (!texture) {
        return;
      }
      const gl = this._gl;
      const target = gl.TEXTURE_2D;
      const wasPreviouslyBound = this._bindTextureDirectly(target, texture, true, forceBindTexture);
      this._unpackFlipY(invertY === void 0 ? texture.invertY : invertY);
      if (premulAlpha) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
      }
      const textureType = this._getWebGLTextureType(texture.type);
      const glformat = this._getInternalFormat(format ? format : texture.format);
      const internalFormat = this._getRGBABufferInternalSizedFormat(texture.type, glformat);
      gl.texImage2D(target, 0, internalFormat, glformat, textureType, source);
      if (texture.generateMipMaps) {
        gl.generateMipmap(target);
      }
      if (!wasPreviouslyBound) {
        this._bindTextureDirectly(target, null);
      }
      if (premulAlpha) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
      }
      if (format) {
        texture.format = format;
      }
      texture._dynamicTextureSource = source;
      texture._premulAlpha = premulAlpha;
      texture.invertY = invertY || false;
      texture.isReady = true;
    };
  }
});

// node_modules/@babylonjs/core/Materials/Textures/dynamicTexture.js
var DynamicTexture;
var init_dynamicTexture = __esm({
  "node_modules/@babylonjs/core/Materials/Textures/dynamicTexture.js"() {
    init_logger();
    init_texture();
    init_engine_dynamicTexture();
    DynamicTexture = class _DynamicTexture extends Texture {
      /**
       * Creates a DynamicTexture
       * @param name defines the name of the texture
       * @param options provides 3 alternatives for width and height of texture, a canvas, object with width and height properties, number for both width and height
       * @param scene defines the scene where you want the texture
       * @param generateMipMaps defines the use of MinMaps or not (default is false)
       * @param samplingMode defines the sampling mode to use (default is Texture.TRILINEAR_SAMPLINGMODE)
       * @param format defines the texture format to use (default is Engine.TEXTUREFORMAT_RGBA)
       * @param invertY defines if the texture needs to be inverted on the y axis during loading
       */
      constructor(name66, options, scene = null, generateMipMaps = false, samplingMode = 3, format = 5, invertY) {
        super(null, scene, !generateMipMaps, invertY, samplingMode, void 0, void 0, void 0, void 0, format);
        this.name = name66;
        this.wrapU = Texture.CLAMP_ADDRESSMODE;
        this.wrapV = Texture.CLAMP_ADDRESSMODE;
        this._generateMipMaps = generateMipMaps;
        const engine = this._getEngine();
        if (!engine) {
          return;
        }
        if (options.getContext) {
          this._canvas = options;
          this._ownCanvas = false;
          this._texture = engine.createDynamicTexture(options.width, options.height, generateMipMaps, samplingMode);
        } else {
          this._canvas = engine.createCanvas(1, 1);
          this._ownCanvas = true;
          if (options.width || options.width === 0) {
            this._texture = engine.createDynamicTexture(options.width, options.height, generateMipMaps, samplingMode);
          } else {
            this._texture = engine.createDynamicTexture(options, options, generateMipMaps, samplingMode);
          }
        }
        const textureSize = this.getSize();
        if (this._canvas.width !== textureSize.width) {
          this._canvas.width = textureSize.width;
        }
        if (this._canvas.height !== textureSize.height) {
          this._canvas.height = textureSize.height;
        }
        this._context = this._canvas.getContext("2d");
      }
      /**
       * Get the current class name of the texture useful for serialization or dynamic coding.
       * @returns "DynamicTexture"
       */
      getClassName() {
        return "DynamicTexture";
      }
      /**
       * Gets the current state of canRescale
       */
      get canRescale() {
        return true;
      }
      _recreate(textureSize) {
        this._canvas.width = textureSize.width;
        this._canvas.height = textureSize.height;
        this.releaseInternalTexture();
        this._texture = this._getEngine().createDynamicTexture(textureSize.width, textureSize.height, this._generateMipMaps, this.samplingMode);
      }
      /**
       * Scales the texture
       * @param ratio the scale factor to apply to both width and height
       */
      scale(ratio) {
        const textureSize = this.getSize();
        textureSize.width *= ratio;
        textureSize.height *= ratio;
        this._recreate(textureSize);
      }
      /**
       * Resizes the texture
       * @param width the new width
       * @param height the new height
       */
      scaleTo(width, height) {
        const textureSize = this.getSize();
        textureSize.width = width;
        textureSize.height = height;
        this._recreate(textureSize);
      }
      /**
       * Gets the context of the canvas used by the texture
       * @returns the canvas context of the dynamic texture
       */
      getContext() {
        return this._context;
      }
      /**
       * Clears the texture
       * @param clearColor Defines the clear color to use
       */
      clear(clearColor) {
        const size = this.getSize();
        if (clearColor) {
          this._context.fillStyle = clearColor;
        }
        this._context.clearRect(0, 0, size.width, size.height);
      }
      /**
       * Updates the texture
       * @param invertY defines the direction for the Y axis (default is true - y increases downwards)
       * @param premulAlpha defines if alpha is stored as premultiplied (default is false)
       * @param allowGPUOptimization true to allow some specific GPU optimizations (subject to engine feature "allowGPUOptimizationsForGUI" being true)
       */
      update(invertY, premulAlpha = false, allowGPUOptimization = false) {
        this._getEngine().updateDynamicTexture(this._texture, this._canvas, invertY === void 0 ? true : invertY, premulAlpha, this._format || void 0, void 0, allowGPUOptimization);
      }
      /**
       * Draws text onto the texture
       * @param text defines the text to be drawn
       * @param x defines the placement of the text from the left
       * @param y defines the placement of the text from the top when invertY is true and from the bottom when false
       * @param font defines the font to be used with font-style, font-size, font-name
       * @param color defines the color used for the text
       * @param fillColor defines the color for the canvas, use null to not overwrite canvas (this bleands with the background to replace, use the clear function)
       * @param invertY defines the direction for the Y axis (default is true - y increases downwards)
       * @param update defines whether texture is immediately update (default is true)
       */
      drawText(text, x, y, font, color, fillColor, invertY, update = true) {
        const size = this.getSize();
        if (fillColor) {
          this._context.fillStyle = fillColor;
          this._context.fillRect(0, 0, size.width, size.height);
        }
        this._context.font = font;
        if (x === null || x === void 0) {
          const textSize = this._context.measureText(text);
          x = (size.width - textSize.width) / 2;
        }
        if (y === null || y === void 0) {
          const fontSize = parseInt(font.replace(/\D/g, ""));
          y = size.height / 2 + fontSize / 3.65;
        }
        this._context.fillStyle = color || "";
        this._context.fillText(text, x, y);
        if (update) {
          this.update(invertY);
        }
      }
      /**
       * Disposes the dynamic texture.
       */
      dispose() {
        var _a, _b;
        super.dispose();
        if (this._ownCanvas) {
          (_b = (_a = this._canvas) == null ? void 0 : _a.remove) == null ? void 0 : _b.call(_a);
        }
        this._canvas = null;
        this._context = null;
      }
      /**
       * Clones the texture
       * @returns the clone of the texture.
       */
      clone() {
        const scene = this.getScene();
        if (!scene) {
          return this;
        }
        const textureSize = this.getSize();
        const newTexture = new _DynamicTexture(this.name, textureSize, scene, this._generateMipMaps);
        newTexture.hasAlpha = this.hasAlpha;
        newTexture.level = this.level;
        newTexture.wrapU = this.wrapU;
        newTexture.wrapV = this.wrapV;
        return newTexture;
      }
      /**
       * Serializes the dynamic texture.  The scene should be ready before the dynamic texture is serialized
       * @returns a serialized dynamic texture object
       */
      serialize() {
        const scene = this.getScene();
        if (scene && !scene.isReady()) {
          Logger.Warn("The scene must be ready before serializing the dynamic texture");
        }
        const serializationObject = super.serialize();
        if (_DynamicTexture._IsCanvasElement(this._canvas)) {
          serializationObject.base64String = this._canvas.toDataURL();
        }
        serializationObject.invertY = this._invertY;
        serializationObject.samplingMode = this.samplingMode;
        return serializationObject;
      }
      static _IsCanvasElement(canvas) {
        return canvas.toDataURL !== void 0;
      }
      /** @internal */
      _rebuild() {
        this.update();
      }
    };
  }
});

// node_modules/@babylonjs/core/Meshes/groundMesh.js
var GroundMesh;
var init_groundMesh = __esm({
  "node_modules/@babylonjs/core/Meshes/groundMesh.js"() {
    init_math_vector();
    init_buffer();
    init_mesh();
    Mesh._GroundMeshParser = (parsedMesh, scene) => {
      return GroundMesh.Parse(parsedMesh, scene);
    };
    GroundMesh = class _GroundMesh extends Mesh {
      constructor(name66, scene) {
        super(name66, scene);
        this.generateOctree = false;
      }
      /**
       * "GroundMesh"
       * @returns "GroundMesh"
       */
      getClassName() {
        return "GroundMesh";
      }
      /**
       * The minimum of x and y subdivisions
       */
      get subdivisions() {
        return Math.min(this._subdivisionsX, this._subdivisionsY);
      }
      /**
       * X subdivisions
       */
      get subdivisionsX() {
        return this._subdivisionsX;
      }
      /**
       * Y subdivisions
       */
      get subdivisionsY() {
        return this._subdivisionsY;
      }
      /**
       * This function will divide the mesh into submeshes and update an octree to help to select the right submeshes
       * for rendering, picking and collision computations. Please note that you must have a decent number of submeshes
       * to get performance improvements when using an octree.
       * @param chunksCount the number of submeshes the mesh will be divided into
       * @param octreeBlocksSize the maximum size of the octree blocks (Default: 32)
       */
      optimize(chunksCount, octreeBlocksSize = 32) {
        this._subdivisionsX = chunksCount;
        this._subdivisionsY = chunksCount;
        this.subdivide(chunksCount);
        const thisAsAny = this;
        if (thisAsAny.createOrUpdateSubmeshesOctree) {
          thisAsAny.createOrUpdateSubmeshesOctree(octreeBlocksSize);
        }
      }
      /**
       * Returns a height (y) value in the World system :
       * the ground altitude at the coordinates (x, z) expressed in the World system.
       * @param x x coordinate
       * @param z z coordinate
       * @returns the ground y position if (x, z) are outside the ground surface.
       */
      getHeightAtCoordinates(x, z) {
        const world = this.getWorldMatrix();
        const invMat = TmpVectors.Matrix[5];
        world.invertToRef(invMat);
        const tmpVect = TmpVectors.Vector3[8];
        Vector3.TransformCoordinatesFromFloatsToRef(x, 0, z, invMat, tmpVect);
        x = tmpVect.x;
        z = tmpVect.z;
        if (x < this._minX || x >= this._maxX || z <= this._minZ || z > this._maxZ) {
          return this.position.y;
        }
        if (!this._heightQuads || this._heightQuads.length == 0) {
          this._initHeightQuads();
          this._computeHeightQuads();
        }
        const facet = this._getFacetAt(x, z);
        const y = -(facet.x * x + facet.z * z + facet.w) / facet.y;
        Vector3.TransformCoordinatesFromFloatsToRef(0, y, 0, world, tmpVect);
        return tmpVect.y;
      }
      /**
       * Returns a normalized vector (Vector3) orthogonal to the ground
       * at the ground coordinates (x, z) expressed in the World system.
       * @param x x coordinate
       * @param z z coordinate
       * @returns Vector3(0.0, 1.0, 0.0) if (x, z) are outside the ground surface.
       */
      getNormalAtCoordinates(x, z) {
        const normal = new Vector3(0, 1, 0);
        this.getNormalAtCoordinatesToRef(x, z, normal);
        return normal;
      }
      /**
       * Updates the Vector3 passed a reference with a normalized vector orthogonal to the ground
       * at the ground coordinates (x, z) expressed in the World system.
       * Doesn't update the reference Vector3 if (x, z) are outside the ground surface.
       * @param x x coordinate
       * @param z z coordinate
       * @param ref vector to store the result
       * @returns the GroundMesh.
       */
      getNormalAtCoordinatesToRef(x, z, ref) {
        const world = this.getWorldMatrix();
        const tmpMat = TmpVectors.Matrix[5];
        world.invertToRef(tmpMat);
        const tmpVect = TmpVectors.Vector3[8];
        Vector3.TransformCoordinatesFromFloatsToRef(x, 0, z, tmpMat, tmpVect);
        x = tmpVect.x;
        z = tmpVect.z;
        if (x < this._minX || x > this._maxX || z < this._minZ || z > this._maxZ) {
          return this;
        }
        if (!this._heightQuads || this._heightQuads.length == 0) {
          this._initHeightQuads();
          this._computeHeightQuads();
        }
        const facet = this._getFacetAt(x, z);
        Vector3.TransformNormalFromFloatsToRef(facet.x, facet.y, facet.z, world, ref);
        return this;
      }
      /**
       * Force the heights to be recomputed for getHeightAtCoordinates() or getNormalAtCoordinates()
       * if the ground has been updated.
       * This can be used in the render loop.
       * @returns the GroundMesh.
       */
      updateCoordinateHeights() {
        if (!this._heightQuads || this._heightQuads.length == 0) {
          this._initHeightQuads();
        }
        this._computeHeightQuads();
        return this;
      }
      // Returns the element "facet" from the heightQuads array relative to (x, z) local coordinates
      _getFacetAt(x, z) {
        const col = Math.floor((x + this._maxX) * this._subdivisionsX / this._width);
        const row = Math.floor(-(z + this._maxZ) * this._subdivisionsY / this._height + this._subdivisionsY);
        const quad = this._heightQuads[row * this._subdivisionsX + col];
        let facet;
        if (z < quad.slope.x * x + quad.slope.y) {
          facet = quad.facet1;
        } else {
          facet = quad.facet2;
        }
        return facet;
      }
      //  Creates and populates the heightMap array with "facet" elements :
      // a quad is two triangular facets separated by a slope, so a "facet" element is 1 slope + 2 facets
      // slope : Vector2(c, h) = 2D diagonal line equation setting apart two triangular facets in a quad : z = cx + h
      // facet1 : Vector4(a, b, c, d) = first facet 3D plane equation : ax + by + cz + d = 0
      // facet2 :  Vector4(a, b, c, d) = second facet 3D plane equation : ax + by + cz + d = 0
      // Returns the GroundMesh.
      _initHeightQuads() {
        const subdivisionsX = this._subdivisionsX;
        const subdivisionsY = this._subdivisionsY;
        this._heightQuads = new Array();
        for (let row = 0; row < subdivisionsY; row++) {
          for (let col = 0; col < subdivisionsX; col++) {
            const quad = { slope: Vector2.Zero(), facet1: new Vector4(0, 0, 0, 0), facet2: new Vector4(0, 0, 0, 0) };
            this._heightQuads[row * subdivisionsX + col] = quad;
          }
        }
        return this;
      }
      // Compute each quad element values and update the heightMap array :
      // slope : Vector2(c, h) = 2D diagonal line equation setting apart two triangular facets in a quad : z = cx + h
      // facet1 : Vector4(a, b, c, d) = first facet 3D plane equation : ax + by + cz + d = 0
      // facet2 :  Vector4(a, b, c, d) = second facet 3D plane equation : ax + by + cz + d = 0
      // Returns the GroundMesh.
      _computeHeightQuads() {
        const positions = this.getVerticesData(VertexBuffer.PositionKind);
        if (!positions) {
          return this;
        }
        const v1 = TmpVectors.Vector3[3];
        const v2 = TmpVectors.Vector3[2];
        const v3 = TmpVectors.Vector3[1];
        const v4 = TmpVectors.Vector3[0];
        const v1v2 = TmpVectors.Vector3[4];
        const v1v3 = TmpVectors.Vector3[5];
        const v1v4 = TmpVectors.Vector3[6];
        const norm1 = TmpVectors.Vector3[7];
        const norm2 = TmpVectors.Vector3[8];
        let i = 0;
        let j = 0;
        let k = 0;
        let cd = 0;
        let h = 0;
        let d1 = 0;
        let d2 = 0;
        const subdivisionsX = this._subdivisionsX;
        const subdivisionsY = this._subdivisionsY;
        for (let row = 0; row < subdivisionsY; row++) {
          for (let col = 0; col < subdivisionsX; col++) {
            i = col * 3;
            j = row * (subdivisionsX + 1) * 3;
            k = (row + 1) * (subdivisionsX + 1) * 3;
            v1.x = positions[j + i];
            v1.y = positions[j + i + 1];
            v1.z = positions[j + i + 2];
            v2.x = positions[j + i + 3];
            v2.y = positions[j + i + 4];
            v2.z = positions[j + i + 5];
            v3.x = positions[k + i];
            v3.y = positions[k + i + 1];
            v3.z = positions[k + i + 2];
            v4.x = positions[k + i + 3];
            v4.y = positions[k + i + 4];
            v4.z = positions[k + i + 5];
            cd = (v4.z - v1.z) / (v4.x - v1.x);
            h = v1.z - cd * v1.x;
            v2.subtractToRef(v1, v1v2);
            v3.subtractToRef(v1, v1v3);
            v4.subtractToRef(v1, v1v4);
            Vector3.CrossToRef(v1v4, v1v3, norm1);
            Vector3.CrossToRef(v1v2, v1v4, norm2);
            norm1.normalize();
            norm2.normalize();
            d1 = -(norm1.x * v1.x + norm1.y * v1.y + norm1.z * v1.z);
            d2 = -(norm2.x * v2.x + norm2.y * v2.y + norm2.z * v2.z);
            const quad = this._heightQuads[row * subdivisionsX + col];
            quad.slope.copyFromFloats(cd, h);
            quad.facet1.copyFromFloats(norm1.x, norm1.y, norm1.z, d1);
            quad.facet2.copyFromFloats(norm2.x, norm2.y, norm2.z, d2);
          }
        }
        return this;
      }
      /**
       * Serializes this ground mesh
       * @param serializationObject object to write serialization to
       */
      serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.subdivisionsX = this._subdivisionsX;
        serializationObject.subdivisionsY = this._subdivisionsY;
        serializationObject.minX = this._minX;
        serializationObject.maxX = this._maxX;
        serializationObject.minZ = this._minZ;
        serializationObject.maxZ = this._maxZ;
        serializationObject.width = this._width;
        serializationObject.height = this._height;
      }
      /**
       * Parses a serialized ground mesh
       * @param parsedMesh the serialized mesh
       * @param scene the scene to create the ground mesh in
       * @returns the created ground mesh
       */
      static Parse(parsedMesh, scene) {
        const result = new _GroundMesh(parsedMesh.name, scene);
        result._subdivisionsX = parsedMesh.subdivisionsX || 1;
        result._subdivisionsY = parsedMesh.subdivisionsY || 1;
        result._minX = parsedMesh.minX;
        result._maxX = parsedMesh.maxX;
        result._minZ = parsedMesh.minZ;
        result._maxZ = parsedMesh.maxZ;
        result._width = parsedMesh.width;
        result._height = parsedMesh.height;
        return result;
      }
    };
  }
});

// node_modules/@babylonjs/core/Meshes/Builders/groundBuilder.js
function CreateGroundVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  let row, col;
  const width = options.width || 1;
  const height = options.height || 1;
  const subdivisionsX = (options.subdivisionsX || options.subdivisions || 1) | 0;
  const subdivisionsY = (options.subdivisionsY || options.subdivisions || 1) | 0;
  for (row = 0; row <= subdivisionsY; row++) {
    for (col = 0; col <= subdivisionsX; col++) {
      const position = new Vector3(col * width / subdivisionsX - width / 2, 0, (subdivisionsY - row) * height / subdivisionsY - height / 2);
      const normal = new Vector3(0, 1, 0);
      positions.push(position.x, position.y, position.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(col / subdivisionsX, CompatibilityOptions.UseOpenGLOrientationForUV ? row / subdivisionsY : 1 - row / subdivisionsY);
    }
  }
  for (row = 0; row < subdivisionsY; row++) {
    for (col = 0; col < subdivisionsX; col++) {
      indices.push(col + 1 + (row + 1) * (subdivisionsX + 1));
      indices.push(col + 1 + row * (subdivisionsX + 1));
      indices.push(col + row * (subdivisionsX + 1));
      indices.push(col + (row + 1) * (subdivisionsX + 1));
      indices.push(col + 1 + (row + 1) * (subdivisionsX + 1));
      indices.push(col + row * (subdivisionsX + 1));
    }
  }
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateTiledGroundVertexData(options) {
  const xmin = options.xmin !== void 0 && options.xmin !== null ? options.xmin : -1;
  const zmin = options.zmin !== void 0 && options.zmin !== null ? options.zmin : -1;
  const xmax = options.xmax !== void 0 && options.xmax !== null ? options.xmax : 1;
  const zmax = options.zmax !== void 0 && options.zmax !== null ? options.zmax : 1;
  const subdivisions = options.subdivisions || { w: 1, h: 1 };
  const precision = options.precision || { w: 1, h: 1 };
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  let row, col, tileRow, tileCol;
  subdivisions.h = subdivisions.h < 1 ? 1 : subdivisions.h;
  subdivisions.w = subdivisions.w < 1 ? 1 : subdivisions.w;
  precision.w = precision.w < 1 ? 1 : precision.w;
  precision.h = precision.h < 1 ? 1 : precision.h;
  const tileSize = {
    w: (xmax - xmin) / subdivisions.w,
    h: (zmax - zmin) / subdivisions.h
  };
  function applyTile(xTileMin, zTileMin, xTileMax, zTileMax) {
    const base = positions.length / 3;
    const rowLength = precision.w + 1;
    for (row = 0; row < precision.h; row++) {
      for (col = 0; col < precision.w; col++) {
        const square = [base + col + row * rowLength, base + (col + 1) + row * rowLength, base + (col + 1) + (row + 1) * rowLength, base + col + (row + 1) * rowLength];
        indices.push(square[1]);
        indices.push(square[2]);
        indices.push(square[3]);
        indices.push(square[0]);
        indices.push(square[1]);
        indices.push(square[3]);
      }
    }
    const position = Vector3.Zero();
    const normal = new Vector3(0, 1, 0);
    for (row = 0; row <= precision.h; row++) {
      position.z = row * (zTileMax - zTileMin) / precision.h + zTileMin;
      for (col = 0; col <= precision.w; col++) {
        position.x = col * (xTileMax - xTileMin) / precision.w + xTileMin;
        position.y = 0;
        positions.push(position.x, position.y, position.z);
        normals.push(normal.x, normal.y, normal.z);
        uvs.push(col / precision.w, row / precision.h);
      }
    }
  }
  for (tileRow = 0; tileRow < subdivisions.h; tileRow++) {
    for (tileCol = 0; tileCol < subdivisions.w; tileCol++) {
      applyTile(xmin + tileCol * tileSize.w, zmin + tileRow * tileSize.h, xmin + (tileCol + 1) * tileSize.w, zmin + (tileRow + 1) * tileSize.h);
    }
  }
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateGroundFromHeightMapVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  let row, col;
  const filter = options.colorFilter || new Color3(0.3, 0.59, 0.11);
  const alphaFilter = options.alphaFilter || 0;
  let invert = false;
  if (options.minHeight > options.maxHeight) {
    invert = true;
    const temp = options.maxHeight;
    options.maxHeight = options.minHeight;
    options.minHeight = temp;
  }
  for (row = 0; row <= options.subdivisions; row++) {
    for (col = 0; col <= options.subdivisions; col++) {
      const position = new Vector3(col * options.width / options.subdivisions - options.width / 2, 0, (options.subdivisions - row) * options.height / options.subdivisions - options.height / 2);
      const heightMapX = (position.x + options.width / 2) / options.width * (options.bufferWidth - 1) | 0;
      const heightMapY = (1 - (position.z + options.height / 2) / options.height) * (options.bufferHeight - 1) | 0;
      const pos = (heightMapX + heightMapY * options.bufferWidth) * 4;
      let r = options.buffer[pos] / 255;
      let g = options.buffer[pos + 1] / 255;
      let b = options.buffer[pos + 2] / 255;
      const a = options.buffer[pos + 3] / 255;
      if (invert) {
        r = 1 - r;
        g = 1 - g;
        b = 1 - b;
      }
      const gradient = r * filter.r + g * filter.g + b * filter.b;
      if (a >= alphaFilter) {
        position.y = options.minHeight + (options.maxHeight - options.minHeight) * gradient;
      } else {
        position.y = options.minHeight - Epsilon;
      }
      if (options.heightBuffer) {
        options.heightBuffer[row * (options.subdivisions + 1) + col] = position.y;
      }
      positions.push(position.x, position.y, position.z);
      normals.push(0, 0, 0);
      uvs.push(col / options.subdivisions, 1 - row / options.subdivisions);
    }
  }
  for (row = 0; row < options.subdivisions; row++) {
    for (col = 0; col < options.subdivisions; col++) {
      const idx1 = col + 1 + (row + 1) * (options.subdivisions + 1);
      const idx2 = col + 1 + row * (options.subdivisions + 1);
      const idx3 = col + row * (options.subdivisions + 1);
      const idx4 = col + (row + 1) * (options.subdivisions + 1);
      const isVisibleIdx1 = positions[idx1 * 3 + 1] >= options.minHeight;
      const isVisibleIdx2 = positions[idx2 * 3 + 1] >= options.minHeight;
      const isVisibleIdx3 = positions[idx3 * 3 + 1] >= options.minHeight;
      if (isVisibleIdx1 && isVisibleIdx2 && isVisibleIdx3) {
        indices.push(idx1);
        indices.push(idx2);
        indices.push(idx3);
      }
      const isVisibleIdx4 = positions[idx4 * 3 + 1] >= options.minHeight;
      if (isVisibleIdx4 && isVisibleIdx1 && isVisibleIdx3) {
        indices.push(idx4);
        indices.push(idx1);
        indices.push(idx3);
      }
    }
  }
  VertexData.ComputeNormals(positions, indices, normals);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreateGround(name66, options = {}, scene) {
  const ground = new GroundMesh(name66, scene);
  ground._setReady(false);
  ground._subdivisionsX = options.subdivisionsX || options.subdivisions || 1;
  ground._subdivisionsY = options.subdivisionsY || options.subdivisions || 1;
  ground._width = options.width || 1;
  ground._height = options.height || 1;
  ground._maxX = ground._width / 2;
  ground._maxZ = ground._height / 2;
  ground._minX = -ground._maxX;
  ground._minZ = -ground._maxZ;
  const vertexData = CreateGroundVertexData(options);
  vertexData.applyToMesh(ground, options.updatable);
  ground._setReady(true);
  return ground;
}
function CreateTiledGround(name66, options, scene = null) {
  const tiledGround = new Mesh(name66, scene);
  const vertexData = CreateTiledGroundVertexData(options);
  vertexData.applyToMesh(tiledGround, options.updatable);
  return tiledGround;
}
function CreateGroundFromHeightMap(name66, url, options = {}, scene = null) {
  const width = options.width || 10;
  const height = options.height || 10;
  const subdivisions = options.subdivisions || 1 | 0;
  const minHeight = options.minHeight || 0;
  const maxHeight = options.maxHeight || 1;
  const filter = options.colorFilter || new Color3(0.3, 0.59, 0.11);
  const alphaFilter = options.alphaFilter || 0;
  const updatable = options.updatable;
  const onReady = options.onReady;
  scene = scene || EngineStore.LastCreatedScene;
  const ground = new GroundMesh(name66, scene);
  ground._subdivisionsX = subdivisions;
  ground._subdivisionsY = subdivisions;
  ground._width = width;
  ground._height = height;
  ground._maxX = ground._width / 2;
  ground._maxZ = ground._height / 2;
  ground._minX = -ground._maxX;
  ground._minZ = -ground._maxZ;
  ground._setReady(false);
  let heightBuffer;
  if (options.passHeightBufferInCallback) {
    heightBuffer = new Float32Array((subdivisions + 1) * (subdivisions + 1));
  }
  const onBufferLoaded = (buffer, bufferWidth, bufferHeight) => {
    const vertexData = CreateGroundFromHeightMapVertexData({
      width,
      height,
      subdivisions,
      minHeight,
      maxHeight,
      colorFilter: filter,
      buffer,
      bufferWidth,
      bufferHeight,
      alphaFilter,
      heightBuffer
    });
    vertexData.applyToMesh(ground, updatable);
    if (onReady) {
      onReady(ground, heightBuffer);
    }
    ground._setReady(true);
  };
  if (typeof url === "string") {
    const onload = (img) => {
      const bufferWidth = img.width;
      const bufferHeight = img.height;
      if (scene.isDisposed) {
        return;
      }
      const buffer = scene == null ? void 0 : scene.getEngine().resizeImageBitmap(img, bufferWidth, bufferHeight);
      onBufferLoaded(buffer, bufferWidth, bufferHeight);
    };
    Tools.LoadImage(url, onload, options.onError ? options.onError : () => {
    }, scene.offlineProvider);
  } else {
    onBufferLoaded(url.data, url.width, url.height);
  }
  return ground;
}
var GroundBuilder;
var init_groundBuilder = __esm({
  "node_modules/@babylonjs/core/Meshes/Builders/groundBuilder.js"() {
    init_math_vector();
    init_math_color();
    init_mesh();
    init_mesh_vertexData();
    init_groundMesh();
    init_tools();
    init_engineStore();
    init_math_constants();
    init_compatibilityOptions();
    GroundBuilder = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CreateGround,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CreateGroundFromHeightMap,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CreateTiledGround
    };
    VertexData.CreateGround = CreateGroundVertexData;
    VertexData.CreateTiledGround = CreateTiledGroundVertexData;
    VertexData.CreateGroundFromHeightMap = CreateGroundFromHeightMapVertexData;
    Mesh.CreateGround = (name66, width, height, subdivisions, scene, updatable) => {
      const options = {
        width,
        height,
        subdivisions,
        updatable
      };
      return CreateGround(name66, options, scene);
    };
    Mesh.CreateTiledGround = (name66, xmin, zmin, xmax, zmax, subdivisions, precision, scene, updatable) => {
      const options = {
        xmin,
        zmin,
        xmax,
        zmax,
        subdivisions,
        precision,
        updatable
      };
      return CreateTiledGround(name66, options, scene);
    };
    Mesh.CreateGroundFromHeightMap = (name66, url, width, height, subdivisions, minHeight, maxHeight, scene, updatable, onReady, alphaFilter) => {
      const options = {
        width,
        height,
        subdivisions,
        minHeight,
        maxHeight,
        updatable,
        onReady,
        alphaFilter
      };
      return CreateGroundFromHeightMap(name66, url, options, scene);
    };
  }
});

// node_modules/@babylonjs/core/Meshes/instancedMesh.js
var InstancedMesh;
var init_instancedMesh = __esm({
  "node_modules/@babylonjs/core/Meshes/instancedMesh.js"() {
    init_math_vector();
    init_logger();
    init_abstractMesh();
    init_mesh();
    init_deepCopier();
    init_transformNode();
    init_buffer();
    init_tools();
    Mesh._instancedMeshFactory = (name66, mesh) => {
      const instance = new InstancedMesh(name66, mesh);
      if (mesh.instancedBuffers) {
        instance.instancedBuffers = {};
        for (const key in mesh.instancedBuffers) {
          instance.instancedBuffers[key] = mesh.instancedBuffers[key];
        }
      }
      return instance;
    };
    InstancedMesh = class extends AbstractMesh {
      /**
       * Creates a new InstancedMesh object from the mesh source.
       * @param name defines the name of the instance
       * @param source the mesh to create the instance from
       */
      constructor(name66, source) {
        super(name66, source.getScene());
        this._indexInSourceMeshInstanceArray = -1;
        this._distanceToCamera = 0;
        source.addInstance(this);
        this._sourceMesh = source;
        this._unIndexed = source._unIndexed;
        this.position.copyFrom(source.position);
        this.rotation.copyFrom(source.rotation);
        this.scaling.copyFrom(source.scaling);
        if (source.rotationQuaternion) {
          this.rotationQuaternion = source.rotationQuaternion.clone();
        }
        this.animations = source.animations.slice();
        for (const range of source.getAnimationRanges()) {
          if (range != null) {
            this.createAnimationRange(range.name, range.from, range.to);
          }
        }
        this.infiniteDistance = source.infiniteDistance;
        this.setPivotMatrix(source.getPivotMatrix());
        this.refreshBoundingInfo(true, true);
        this._syncSubMeshes();
      }
      /**
       * @returns the string "InstancedMesh".
       */
      getClassName() {
        return "InstancedMesh";
      }
      /** Gets the list of lights affecting that mesh */
      get lightSources() {
        return this._sourceMesh._lightSources;
      }
      _resyncLightSources() {
      }
      _resyncLightSource() {
      }
      _removeLightSource() {
      }
      // Methods
      /**
       * If the source mesh receives shadows
       */
      get receiveShadows() {
        return this._sourceMesh.receiveShadows;
      }
      set receiveShadows(_value) {
        var _a;
        if (((_a = this._sourceMesh) == null ? void 0 : _a.receiveShadows) !== _value) {
          Tools.Warn("Setting receiveShadows on an instanced mesh has no effect");
        }
      }
      /**
       * The material of the source mesh
       */
      get material() {
        return this._sourceMesh.material;
      }
      set material(_value) {
        var _a;
        if (((_a = this._sourceMesh) == null ? void 0 : _a.material) !== _value) {
          Tools.Warn("Setting material on an instanced mesh has no effect");
        }
      }
      /**
       * Visibility of the source mesh
       */
      get visibility() {
        return this._sourceMesh.visibility;
      }
      set visibility(_value) {
        var _a;
        if (((_a = this._sourceMesh) == null ? void 0 : _a.visibility) !== _value) {
          Tools.Warn("Setting visibility on an instanced mesh has no effect");
        }
      }
      /**
       * Skeleton of the source mesh
       */
      get skeleton() {
        return this._sourceMesh.skeleton;
      }
      set skeleton(_value) {
        var _a;
        if (((_a = this._sourceMesh) == null ? void 0 : _a.skeleton) !== _value) {
          Tools.Warn("Setting skeleton on an instanced mesh has no effect");
        }
      }
      /**
       * Rendering ground id of the source mesh
       */
      get renderingGroupId() {
        return this._sourceMesh.renderingGroupId;
      }
      set renderingGroupId(value) {
        if (!this._sourceMesh || value === this._sourceMesh.renderingGroupId) {
          return;
        }
        Logger.Warn("Note - setting renderingGroupId of an instanced mesh has no effect on the scene");
      }
      /**
       * @returns the total number of vertices (integer).
       */
      getTotalVertices() {
        return this._sourceMesh ? this._sourceMesh.getTotalVertices() : 0;
      }
      /**
       * Returns a positive integer : the total number of indices in this mesh geometry.
       * @returns the number of indices or zero if the mesh has no geometry.
       */
      getTotalIndices() {
        return this._sourceMesh.getTotalIndices();
      }
      /**
       * The source mesh of the instance
       */
      get sourceMesh() {
        return this._sourceMesh;
      }
      /**
       * Creates a new InstancedMesh object from the mesh model.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
       * @param name defines the name of the new instance
       * @returns a new InstancedMesh
       */
      createInstance(name66) {
        return this._sourceMesh.createInstance(name66);
      }
      /**
       * Is this node ready to be used/rendered
       * @param completeCheck defines if a complete check (including materials and lights) has to be done (false by default)
       * @returns {boolean} is it ready
       */
      isReady(completeCheck = false) {
        return this._sourceMesh.isReady(completeCheck, true);
      }
      /**
       * Returns an array of integers or a typed array (Int32Array, Uint32Array, Uint16Array) populated with the mesh indices.
       * @param kind kind of verticies to retrieve (eg. positions, normals, uvs, etc.)
       * @param copyWhenShared If true (default false) and and if the mesh geometry is shared among some other meshes, the returned array is a copy of the internal one.
       * @param forceCopy defines a boolean forcing the copy of the buffer no matter what the value of copyWhenShared is
       * @returns a float array or a Float32Array of the requested kind of data : positions, normals, uvs, etc.
       */
      getVerticesData(kind, copyWhenShared, forceCopy) {
        return this._sourceMesh.getVerticesData(kind, copyWhenShared, forceCopy);
      }
      /**
       * Sets the vertex data of the mesh geometry for the requested `kind`.
       * If the mesh has no geometry, a new Geometry object is set to the mesh and then passed this vertex data.
       * The `data` are either a numeric array either a Float32Array.
       * The parameter `updatable` is passed as is to the underlying Geometry object constructor (if initially none) or updater.
       * The parameter `stride` is an optional positive integer, it is usually automatically deducted from the `kind` (3 for positions or normals, 2 for UV, etc).
       * Note that a new underlying VertexBuffer object is created each call.
       * If the `kind` is the `PositionKind`, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
       *
       * Possible `kind` values :
       * - VertexBuffer.PositionKind
       * - VertexBuffer.UVKind
       * - VertexBuffer.UV2Kind
       * - VertexBuffer.UV3Kind
       * - VertexBuffer.UV4Kind
       * - VertexBuffer.UV5Kind
       * - VertexBuffer.UV6Kind
       * - VertexBuffer.ColorKind
       * - VertexBuffer.MatricesIndicesKind
       * - VertexBuffer.MatricesIndicesExtraKind
       * - VertexBuffer.MatricesWeightsKind
       * - VertexBuffer.MatricesWeightsExtraKind
       *
       * Returns the Mesh.
       * @param kind defines vertex data kind
       * @param data defines the data source
       * @param updatable defines if the data must be flagged as updatable (false as default)
       * @param stride defines the vertex stride (optional)
       * @returns the current mesh
       */
      setVerticesData(kind, data, updatable, stride) {
        if (this.sourceMesh) {
          this.sourceMesh.setVerticesData(kind, data, updatable, stride);
        }
        return this.sourceMesh;
      }
      /**
       * Updates the existing vertex data of the mesh geometry for the requested `kind`.
       * If the mesh has no geometry, it is simply returned as it is.
       * The `data` are either a numeric array either a Float32Array.
       * No new underlying VertexBuffer object is created.
       * If the `kind` is the `PositionKind` and if `updateExtends` is true, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
       * If the parameter `makeItUnique` is true, a new global geometry is created from this positions and is set to the mesh.
       *
       * Possible `kind` values :
       * - VertexBuffer.PositionKind
       * - VertexBuffer.UVKind
       * - VertexBuffer.UV2Kind
       * - VertexBuffer.UV3Kind
       * - VertexBuffer.UV4Kind
       * - VertexBuffer.UV5Kind
       * - VertexBuffer.UV6Kind
       * - VertexBuffer.ColorKind
       * - VertexBuffer.MatricesIndicesKind
       * - VertexBuffer.MatricesIndicesExtraKind
       * - VertexBuffer.MatricesWeightsKind
       * - VertexBuffer.MatricesWeightsExtraKind
       *
       * Returns the Mesh.
       * @param kind defines vertex data kind
       * @param data defines the data source
       * @param updateExtends defines if extends info of the mesh must be updated (can be null). This is mostly useful for "position" kind
       * @param makeItUnique defines it the updated vertex buffer must be flagged as unique (false by default)
       * @returns the source mesh
       */
      updateVerticesData(kind, data, updateExtends, makeItUnique) {
        if (this.sourceMesh) {
          this.sourceMesh.updateVerticesData(kind, data, updateExtends, makeItUnique);
        }
        return this.sourceMesh;
      }
      /**
       * Sets the mesh indices.
       * Expects an array populated with integers or a typed array (Int32Array, Uint32Array, Uint16Array).
       * If the mesh has no geometry, a new Geometry object is created and set to the mesh.
       * This method creates a new index buffer each call.
       * Returns the Mesh.
       * @param indices the source data
       * @param totalVertices defines the total number of vertices referenced by indices (could be null)
       * @returns source mesh
       */
      setIndices(indices, totalVertices = null) {
        if (this.sourceMesh) {
          this.sourceMesh.setIndices(indices, totalVertices);
        }
        return this.sourceMesh;
      }
      /**
       * Boolean : True if the mesh owns the requested kind of data.
       * @param kind defines which buffer to check (positions, indices, normals, etc). Possible `kind` values :
       * - VertexBuffer.PositionKind
       * - VertexBuffer.UVKind
       * - VertexBuffer.UV2Kind
       * - VertexBuffer.UV3Kind
       * - VertexBuffer.UV4Kind
       * - VertexBuffer.UV5Kind
       * - VertexBuffer.UV6Kind
       * - VertexBuffer.ColorKind
       * - VertexBuffer.MatricesIndicesKind
       * - VertexBuffer.MatricesIndicesExtraKind
       * - VertexBuffer.MatricesWeightsKind
       * - VertexBuffer.MatricesWeightsExtraKind
       * @returns true if data kind is present
       */
      isVerticesDataPresent(kind) {
        return this._sourceMesh.isVerticesDataPresent(kind);
      }
      /**
       * @returns an array of indices (IndicesArray).
       */
      getIndices() {
        return this._sourceMesh.getIndices();
      }
      get _positions() {
        return this._sourceMesh._positions;
      }
      /**
       * This method recomputes and sets a new BoundingInfo to the mesh unless it is locked.
       * This means the mesh underlying bounding box and sphere are recomputed.
       * @param applySkeleton defines whether to apply the skeleton before computing the bounding info
       * @param applyMorph  defines whether to apply the morph target before computing the bounding info
       * @returns the current mesh
       */
      refreshBoundingInfo(applySkeleton = false, applyMorph = false) {
        if (this.hasBoundingInfo && this.getBoundingInfo().isLocked) {
          return this;
        }
        const bias = this._sourceMesh.geometry ? this._sourceMesh.geometry.boundingBias : null;
        this._refreshBoundingInfo(this._sourceMesh._getPositionData(applySkeleton, applyMorph), bias);
        return this;
      }
      /** @internal */
      _preActivate() {
        if (this._currentLOD) {
          this._currentLOD._preActivate();
        }
        return this;
      }
      /**
       * @internal
       */
      _activate(renderId, intermediateRendering) {
        super._activate(renderId, intermediateRendering);
        if (!this._sourceMesh.subMeshes) {
          Logger.Warn("Instances should only be created for meshes with geometry.");
        }
        if (this._currentLOD) {
          const differentSign = this._currentLOD._getWorldMatrixDeterminant() >= 0 !== this._getWorldMatrixDeterminant() >= 0;
          if (differentSign) {
            this._internalAbstractMeshDataInfo._actAsRegularMesh = true;
            return true;
          }
          this._internalAbstractMeshDataInfo._actAsRegularMesh = false;
          this._currentLOD._registerInstanceForRenderId(this, renderId);
          if (intermediateRendering) {
            if (!this._currentLOD._internalAbstractMeshDataInfo._isActiveIntermediate) {
              this._currentLOD._internalAbstractMeshDataInfo._onlyForInstancesIntermediate = true;
              return true;
            }
          } else {
            if (!this._currentLOD._internalAbstractMeshDataInfo._isActive) {
              this._currentLOD._internalAbstractMeshDataInfo._onlyForInstances = true;
              return true;
            }
          }
        }
        return false;
      }
      /** @internal */
      _postActivate() {
        if (this._sourceMesh.edgesShareWithInstances && this._sourceMesh._edgesRenderer && this._sourceMesh._edgesRenderer.isEnabled && this._sourceMesh._renderingGroup) {
          this._sourceMesh._renderingGroup._edgesRenderers.pushNoDuplicate(this._sourceMesh._edgesRenderer);
          this._sourceMesh._edgesRenderer.customInstances.push(this.getWorldMatrix());
        } else if (this._edgesRenderer && this._edgesRenderer.isEnabled && this._sourceMesh._renderingGroup) {
          this._sourceMesh._renderingGroup._edgesRenderers.push(this._edgesRenderer);
        }
      }
      getWorldMatrix() {
        if (this._currentLOD && this._currentLOD.billboardMode !== TransformNode.BILLBOARDMODE_NONE && this._currentLOD._masterMesh !== this) {
          if (!this._billboardWorldMatrix) {
            this._billboardWorldMatrix = new Matrix();
          }
          const tempMaster = this._currentLOD._masterMesh;
          this._currentLOD._masterMesh = this;
          TmpVectors.Vector3[7].copyFrom(this._currentLOD.position);
          this._currentLOD.position.set(0, 0, 0);
          this._billboardWorldMatrix.copyFrom(this._currentLOD.computeWorldMatrix(true));
          this._currentLOD.position.copyFrom(TmpVectors.Vector3[7]);
          this._currentLOD._masterMesh = tempMaster;
          return this._billboardWorldMatrix;
        }
        return super.getWorldMatrix();
      }
      get isAnInstance() {
        return true;
      }
      /**
       * Returns the current associated LOD AbstractMesh.
       * @param camera defines the camera to use to pick the LOD level
       * @returns a Mesh or `null` if no LOD is associated with the AbstractMesh
       */
      getLOD(camera) {
        if (!camera) {
          return this;
        }
        const sourceMeshLODLevels = this.sourceMesh.getLODLevels();
        if (!sourceMeshLODLevels || sourceMeshLODLevels.length === 0) {
          this._currentLOD = this.sourceMesh;
        } else {
          const boundingInfo = this.getBoundingInfo();
          this._currentLOD = this.sourceMesh.getLOD(camera, boundingInfo.boundingSphere);
        }
        return this._currentLOD;
      }
      /**
       * @internal
       */
      _preActivateForIntermediateRendering(renderId) {
        return this.sourceMesh._preActivateForIntermediateRendering(renderId);
      }
      /** @internal */
      _syncSubMeshes() {
        this.releaseSubMeshes();
        if (this._sourceMesh.subMeshes) {
          for (let index = 0; index < this._sourceMesh.subMeshes.length; index++) {
            this._sourceMesh.subMeshes[index].clone(this, this._sourceMesh);
          }
        }
        return this;
      }
      /** @internal */
      _generatePointsArray() {
        return this._sourceMesh._generatePointsArray();
      }
      /** @internal */
      _updateBoundingInfo() {
        if (this.hasBoundingInfo) {
          this.getBoundingInfo().update(this.worldMatrixFromCache);
        } else {
          this.buildBoundingInfo(this.absolutePosition, this.absolutePosition, this.worldMatrixFromCache);
        }
        this._updateSubMeshesBoundingInfo(this.worldMatrixFromCache);
        return this;
      }
      /**
       * Creates a new InstancedMesh from the current mesh.
       *
       * Returns the clone.
       * @param name the cloned mesh name
       * @param newParent the optional Node to parent the clone to.
       * @param doNotCloneChildren if `true` the model children aren't cloned.
       * @param newSourceMesh if set this mesh will be used as the source mesh instead of ths instance's one
       * @returns the clone
       */
      clone(name66, newParent = null, doNotCloneChildren, newSourceMesh) {
        const result = (newSourceMesh || this._sourceMesh).createInstance(name66);
        DeepCopier.DeepCopy(this, result, [
          "name",
          "subMeshes",
          "uniqueId",
          "parent",
          "lightSources",
          "receiveShadows",
          "material",
          "visibility",
          "skeleton",
          "sourceMesh",
          "isAnInstance",
          "facetNb",
          "isFacetDataEnabled",
          "isBlocked",
          "useBones",
          "hasInstances",
          "collider",
          "edgesRenderer",
          "forward",
          "up",
          "right",
          "absolutePosition",
          "absoluteScaling",
          "absoluteRotationQuaternion",
          "isWorldMatrixFrozen",
          "nonUniformScaling",
          "behaviors",
          "worldMatrixFromCache",
          "hasThinInstances",
          "hasBoundingInfo"
        ], []);
        this.refreshBoundingInfo();
        if (newParent) {
          result.parent = newParent;
        }
        if (!doNotCloneChildren) {
          for (let index = 0; index < this.getScene().meshes.length; index++) {
            const mesh = this.getScene().meshes[index];
            if (mesh.parent === this) {
              mesh.clone(mesh.name, result);
            }
          }
        }
        result.computeWorldMatrix(true);
        this.onClonedObservable.notifyObservers(result);
        return result;
      }
      /**
       * Disposes the InstancedMesh.
       * Returns nothing.
       * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
       * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
       */
      dispose(doNotRecurse, disposeMaterialAndTextures = false) {
        this._sourceMesh.removeInstance(this);
        super.dispose(doNotRecurse, disposeMaterialAndTextures);
      }
      /**
       * @internal
       */
      _serializeAsParent(serializationObject) {
        super._serializeAsParent(serializationObject);
        serializationObject.parentId = this._sourceMesh.uniqueId;
        serializationObject.parentInstanceIndex = this._indexInSourceMeshInstanceArray;
      }
      /**
       * Instantiate (when possible) or clone that node with its hierarchy
       * @param newParent defines the new parent to use for the instance (or clone)
       * @param options defines options to configure how copy is done
       * @param options.doNotInstantiate defines if the model must be instantiated or just cloned
       * @param options.newSourcedMesh newSourcedMesh the new source mesh for the instance (or clone)
       * @param onNewNodeCreated defines an option callback to call when a clone or an instance is created
       * @returns an instance (or a clone) of the current node with its hierarchy
       */
      instantiateHierarchy(newParent = null, options, onNewNodeCreated) {
        const clone = this.clone("Clone of " + (this.name || this.id), newParent || this.parent, true, options && options.newSourcedMesh);
        if (clone) {
          if (onNewNodeCreated) {
            onNewNodeCreated(this, clone);
          }
        }
        for (const child of this.getChildTransformNodes(true)) {
          child.instantiateHierarchy(clone, options, onNewNodeCreated);
        }
        return clone;
      }
    };
    Mesh.prototype.registerInstancedBuffer = function(kind, stride) {
      var _a, _b;
      (_b = (_a = this._userInstancedBuffersStorage) == null ? void 0 : _a.vertexBuffers[kind]) == null ? void 0 : _b.dispose();
      if (!this.instancedBuffers) {
        this.instancedBuffers = {};
        for (const instance of this.instances) {
          instance.instancedBuffers = {};
        }
      }
      if (!this._userInstancedBuffersStorage) {
        this._userInstancedBuffersStorage = {
          data: {},
          vertexBuffers: {},
          strides: {},
          sizes: {},
          vertexArrayObjects: this.getEngine().getCaps().vertexArrayObject ? {} : void 0
        };
      }
      this.instancedBuffers[kind] = null;
      this._userInstancedBuffersStorage.strides[kind] = stride;
      this._userInstancedBuffersStorage.sizes[kind] = stride * 32;
      this._userInstancedBuffersStorage.data[kind] = new Float32Array(this._userInstancedBuffersStorage.sizes[kind]);
      this._userInstancedBuffersStorage.vertexBuffers[kind] = new VertexBuffer(this.getEngine(), this._userInstancedBuffersStorage.data[kind], kind, true, false, stride, true);
      for (const instance of this.instances) {
        instance.instancedBuffers[kind] = null;
      }
      this._invalidateInstanceVertexArrayObject();
      this._markSubMeshesAsAttributesDirty();
    };
    Mesh.prototype._processInstancedBuffers = function(visibleInstances, renderSelf) {
      const instanceCount = visibleInstances ? visibleInstances.length : 0;
      for (const kind in this.instancedBuffers) {
        let size = this._userInstancedBuffersStorage.sizes[kind];
        const stride = this._userInstancedBuffersStorage.strides[kind];
        const expectedSize = (instanceCount + 1) * stride;
        while (size < expectedSize) {
          size *= 2;
        }
        if (this._userInstancedBuffersStorage.data[kind].length != size) {
          this._userInstancedBuffersStorage.data[kind] = new Float32Array(size);
          this._userInstancedBuffersStorage.sizes[kind] = size;
          if (this._userInstancedBuffersStorage.vertexBuffers[kind]) {
            this._userInstancedBuffersStorage.vertexBuffers[kind].dispose();
            this._userInstancedBuffersStorage.vertexBuffers[kind] = null;
          }
        }
        const data = this._userInstancedBuffersStorage.data[kind];
        let offset = 0;
        if (renderSelf) {
          const value = this.instancedBuffers[kind];
          if (value.toArray) {
            value.toArray(data, offset);
          } else if (value.copyToArray) {
            value.copyToArray(data, offset);
          } else {
            data[offset] = value;
          }
          offset += stride;
        }
        for (let instanceIndex = 0; instanceIndex < instanceCount; instanceIndex++) {
          const instance = visibleInstances[instanceIndex];
          const value = instance.instancedBuffers[kind];
          if (value.toArray) {
            value.toArray(data, offset);
          } else if (value.copyToArray) {
            value.copyToArray(data, offset);
          } else {
            data[offset] = value;
          }
          offset += stride;
        }
        if (!this._userInstancedBuffersStorage.vertexBuffers[kind]) {
          this._userInstancedBuffersStorage.vertexBuffers[kind] = new VertexBuffer(this.getEngine(), this._userInstancedBuffersStorage.data[kind], kind, true, false, stride, true);
          this._invalidateInstanceVertexArrayObject();
        } else {
          this._userInstancedBuffersStorage.vertexBuffers[kind].updateDirectly(data, 0);
        }
      }
    };
    Mesh.prototype._invalidateInstanceVertexArrayObject = function() {
      if (!this._userInstancedBuffersStorage || this._userInstancedBuffersStorage.vertexArrayObjects === void 0) {
        return;
      }
      for (const kind in this._userInstancedBuffersStorage.vertexArrayObjects) {
        this.getEngine().releaseVertexArrayObject(this._userInstancedBuffersStorage.vertexArrayObjects[kind]);
      }
      this._userInstancedBuffersStorage.vertexArrayObjects = {};
    };
    Mesh.prototype._disposeInstanceSpecificData = function() {
      if (this._instanceDataStorage.instancesBuffer) {
        this._instanceDataStorage.instancesBuffer.dispose();
        this._instanceDataStorage.instancesBuffer = null;
      }
      while (this.instances.length) {
        this.instances[0].dispose();
      }
      for (const kind in this.instancedBuffers) {
        if (this._userInstancedBuffersStorage.vertexBuffers[kind]) {
          this._userInstancedBuffersStorage.vertexBuffers[kind].dispose();
        }
      }
      this._invalidateInstanceVertexArrayObject();
      this.instancedBuffers = {};
    };
  }
});

// node_modules/@babylonjs/core/Materials/shaderMaterial.js
var onCreatedEffectParameters2, ShaderMaterial;
var init_shaderMaterial = __esm({
  "node_modules/@babylonjs/core/Materials/shaderMaterial.js"() {
    init_decorators_serialization();
    init_scene();
    init_math_vector();
    init_buffer();
    init_texture();
    init_typeStore();
    init_math_color();
    init_effectFallbacks();
    init_webRequest();
    init_pushMaterial();
    init_engineStore();
    init_clipPlaneMaterialHelper();
    init_materialHelper_functions();
    onCreatedEffectParameters2 = { effect: null, subMesh: null };
    ShaderMaterial = class _ShaderMaterial extends PushMaterial {
      /**
       * Instantiate a new shader material.
       * The ShaderMaterial object has the necessary methods to pass data from your scene to the Vertex and Fragment Shaders and returns a material that can be applied to any mesh.
       * This returned material effects how the mesh will look based on the code in the shaders.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/shaders/shaderMaterial
       * @param name Define the name of the material in the scene
       * @param scene Define the scene the material belongs to
       * @param shaderPath Defines  the route to the shader code in one of three ways:
       *  * object: \{ vertex: "custom", fragment: "custom" \}, used with Effect.ShadersStore["customVertexShader"] and Effect.ShadersStore["customFragmentShader"]
       *  * object: \{ vertexElement: "vertexShaderCode", fragmentElement: "fragmentShaderCode" \}, used with shader code in script tags
       *  * object: \{ vertexSource: "vertex shader code string", fragmentSource: "fragment shader code string" \} using with strings containing the shaders code
       *  * string: "./COMMON_NAME", used with external files COMMON_NAME.vertex.fx and COMMON_NAME.fragment.fx in index.html folder.
       * @param options Define the options used to create the shader
       * @param storeEffectOnSubMeshes true to store effect on submeshes, false to store the effect directly in the material class.
       */
      constructor(name66, scene, shaderPath, options = {}, storeEffectOnSubMeshes = true) {
        super(name66, scene, storeEffectOnSubMeshes);
        this._textures = {};
        this._textureArrays = {};
        this._externalTextures = {};
        this._floats = {};
        this._ints = {};
        this._uints = {};
        this._floatsArrays = {};
        this._colors3 = {};
        this._colors3Arrays = {};
        this._colors4 = {};
        this._colors4Arrays = {};
        this._vectors2 = {};
        this._vectors3 = {};
        this._vectors4 = {};
        this._quaternions = {};
        this._quaternionsArrays = {};
        this._matrices = {};
        this._matrixArrays = {};
        this._matrices3x3 = {};
        this._matrices2x2 = {};
        this._vectors2Arrays = {};
        this._vectors3Arrays = {};
        this._vectors4Arrays = {};
        this._uniformBuffers = {};
        this._textureSamplers = {};
        this._storageBuffers = {};
        this._cachedWorldViewMatrix = new Matrix();
        this._cachedWorldViewProjectionMatrix = new Matrix();
        this._multiview = false;
        this._materialHelperNeedsPreviousMatrices = false;
        this._shaderPath = shaderPath;
        this._options = {
          needAlphaBlending: false,
          needAlphaTesting: false,
          attributes: ["position", "normal", "uv"],
          uniforms: ["worldViewProjection"],
          uniformBuffers: [],
          samplers: [],
          externalTextures: [],
          samplerObjects: [],
          storageBuffers: [],
          defines: [],
          useClipPlane: false,
          ...options
        };
      }
      /**
       * Gets the shader path used to define the shader code
       * It can be modified to trigger a new compilation
       */
      get shaderPath() {
        return this._shaderPath;
      }
      /**
       * Sets the shader path used to define the shader code
       * It can be modified to trigger a new compilation
       */
      set shaderPath(shaderPath) {
        this._shaderPath = shaderPath;
      }
      /**
       * Gets the options used to compile the shader.
       * They can be modified to trigger a new compilation
       */
      get options() {
        return this._options;
      }
      /**
       * is multiview set to true?
       */
      get isMultiview() {
        return this._multiview;
      }
      /**
       * Gets the current class name of the material e.g. "ShaderMaterial"
       * Mainly use in serialization.
       * @returns the class name
       */
      getClassName() {
        return "ShaderMaterial";
      }
      /**
       * Specifies if the material will require alpha blending
       * @returns a boolean specifying if alpha blending is needed
       */
      needAlphaBlending() {
        return this.alpha < 1 || this._options.needAlphaBlending;
      }
      /**
       * Specifies if this material should be rendered in alpha test mode
       * @returns a boolean specifying if an alpha test is needed.
       */
      needAlphaTesting() {
        return this._options.needAlphaTesting;
      }
      _checkUniform(uniformName) {
        if (this._options.uniforms.indexOf(uniformName) === -1) {
          this._options.uniforms.push(uniformName);
        }
      }
      /**
       * Set a texture in the shader.
       * @param name Define the name of the uniform samplers as defined in the shader
       * @param texture Define the texture to bind to this sampler
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setTexture(name66, texture) {
        if (this._options.samplers.indexOf(name66) === -1) {
          this._options.samplers.push(name66);
        }
        this._textures[name66] = texture;
        return this;
      }
      /**
       * Set a texture array in the shader.
       * @param name Define the name of the uniform sampler array as defined in the shader
       * @param textures Define the list of textures to bind to this sampler
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setTextureArray(name66, textures) {
        if (this._options.samplers.indexOf(name66) === -1) {
          this._options.samplers.push(name66);
        }
        this._checkUniform(name66);
        this._textureArrays[name66] = textures;
        return this;
      }
      /**
       * Set an internal texture in the shader.
       * @param name Define the name of the uniform samplers as defined in the shader
       * @param texture Define the texture to bind to this sampler
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setExternalTexture(name66, texture) {
        if (this._options.externalTextures.indexOf(name66) === -1) {
          this._options.externalTextures.push(name66);
        }
        this._externalTextures[name66] = texture;
        return this;
      }
      /**
       * Set a float in the shader.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setFloat(name66, value) {
        this._checkUniform(name66);
        this._floats[name66] = value;
        return this;
      }
      /**
       * Set a int in the shader.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setInt(name66, value) {
        this._checkUniform(name66);
        this._ints[name66] = value;
        return this;
      }
      /**
       * Set a unsigned int in the shader.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setUInt(name66, value) {
        this._checkUniform(name66);
        this._uints[name66] = value;
        return this;
      }
      /**
       * Set an array of floats in the shader.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setFloats(name66, value) {
        this._checkUniform(name66);
        this._floatsArrays[name66] = value;
        return this;
      }
      /**
       * Set a vec3 in the shader from a Color3.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setColor3(name66, value) {
        this._checkUniform(name66);
        this._colors3[name66] = value;
        return this;
      }
      /**
       * Set a vec3 array in the shader from a Color3 array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setColor3Array(name66, value) {
        this._checkUniform(name66);
        this._colors3Arrays[name66] = value.reduce((arr, color) => {
          color.toArray(arr, arr.length);
          return arr;
        }, []);
        return this;
      }
      /**
       * Set a vec4 in the shader from a Color4.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setColor4(name66, value) {
        this._checkUniform(name66);
        this._colors4[name66] = value;
        return this;
      }
      /**
       * Set a vec4 array in the shader from a Color4 array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setColor4Array(name66, value) {
        this._checkUniform(name66);
        this._colors4Arrays[name66] = value.reduce((arr, color) => {
          color.toArray(arr, arr.length);
          return arr;
        }, []);
        return this;
      }
      /**
       * Set a vec2 in the shader from a Vector2.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setVector2(name66, value) {
        this._checkUniform(name66);
        this._vectors2[name66] = value;
        return this;
      }
      /**
       * Set a vec3 in the shader from a Vector3.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setVector3(name66, value) {
        this._checkUniform(name66);
        this._vectors3[name66] = value;
        return this;
      }
      /**
       * Set a vec4 in the shader from a Vector4.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setVector4(name66, value) {
        this._checkUniform(name66);
        this._vectors4[name66] = value;
        return this;
      }
      /**
       * Set a vec4 in the shader from a Quaternion.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setQuaternion(name66, value) {
        this._checkUniform(name66);
        this._quaternions[name66] = value;
        return this;
      }
      /**
       * Set a vec4 array in the shader from a Quaternion array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setQuaternionArray(name66, value) {
        this._checkUniform(name66);
        this._quaternionsArrays[name66] = value.reduce((arr, quaternion) => {
          quaternion.toArray(arr, arr.length);
          return arr;
        }, []);
        return this;
      }
      /**
       * Set a mat4 in the shader from a Matrix.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setMatrix(name66, value) {
        this._checkUniform(name66);
        this._matrices[name66] = value;
        return this;
      }
      /**
       * Set a float32Array in the shader from a matrix array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setMatrices(name66, value) {
        this._checkUniform(name66);
        const float32Array = new Float32Array(value.length * 16);
        for (let index = 0; index < value.length; index++) {
          const matrix = value[index];
          matrix.copyToArray(float32Array, index * 16);
        }
        this._matrixArrays[name66] = float32Array;
        return this;
      }
      /**
       * Set a mat3 in the shader from a Float32Array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setMatrix3x3(name66, value) {
        this._checkUniform(name66);
        this._matrices3x3[name66] = value;
        return this;
      }
      /**
       * Set a mat2 in the shader from a Float32Array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setMatrix2x2(name66, value) {
        this._checkUniform(name66);
        this._matrices2x2[name66] = value;
        return this;
      }
      /**
       * Set a vec2 array in the shader from a number array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setArray2(name66, value) {
        this._checkUniform(name66);
        this._vectors2Arrays[name66] = value;
        return this;
      }
      /**
       * Set a vec3 array in the shader from a number array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setArray3(name66, value) {
        this._checkUniform(name66);
        this._vectors3Arrays[name66] = value;
        return this;
      }
      /**
       * Set a vec4 array in the shader from a number array.
       * @param name Define the name of the uniform as defined in the shader
       * @param value Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setArray4(name66, value) {
        this._checkUniform(name66);
        this._vectors4Arrays[name66] = value;
        return this;
      }
      /**
       * Set a uniform buffer in the shader
       * @param name Define the name of the uniform as defined in the shader
       * @param buffer Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setUniformBuffer(name66, buffer) {
        if (this._options.uniformBuffers.indexOf(name66) === -1) {
          this._options.uniformBuffers.push(name66);
        }
        this._uniformBuffers[name66] = buffer;
        return this;
      }
      /**
       * Set a texture sampler in the shader
       * @param name Define the name of the uniform as defined in the shader
       * @param sampler Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setTextureSampler(name66, sampler) {
        if (this._options.samplerObjects.indexOf(name66) === -1) {
          this._options.samplerObjects.push(name66);
        }
        this._textureSamplers[name66] = sampler;
        return this;
      }
      /**
       * Set a storage buffer in the shader
       * @param name Define the name of the storage buffer as defined in the shader
       * @param buffer Define the value to give to the uniform
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setStorageBuffer(name66, buffer) {
        if (this._options.storageBuffers.indexOf(name66) === -1) {
          this._options.storageBuffers.push(name66);
        }
        this._storageBuffers[name66] = buffer;
        return this;
      }
      /**
       * Adds, removes, or replaces the specified shader define and value.
       * * setDefine("MY_DEFINE", true); // enables a boolean define
       * * setDefine("MY_DEFINE", "0.5"); // adds "#define MY_DEFINE 0.5" to the shader (or sets and replaces the value of any existing define with that name)
       * * setDefine("MY_DEFINE", false); // disables and removes the define
       * Note if the active defines do change, the shader will be recompiled and this can be expensive.
       * @param define the define name e.g., "OUTPUT_TO_SRGB" or "#define OUTPUT_TO_SRGB". If the define was passed into the constructor already, the version used should match that, and in either case, it should not include any appended value.
       * @param value either the value of the define (e.g. a numerical value) or for booleans, true if the define should be enabled or false if it should be disabled
       * @returns the material itself allowing "fluent" like uniform updates
       */
      setDefine(define, value) {
        const defineName = define.trimEnd() + " ";
        const existingDefineIdx = this.options.defines.findIndex((x) => x === define || x.startsWith(defineName));
        if (existingDefineIdx >= 0) {
          this.options.defines.splice(existingDefineIdx, 1);
        }
        if (typeof value !== "boolean" || value) {
          this.options.defines.push(defineName + value);
        }
        return this;
      }
      /**
       * Specifies that the submesh is ready to be used
       * @param mesh defines the mesh to check
       * @param subMesh defines which submesh to check
       * @param useInstances specifies that instances should be used
       * @returns a boolean indicating that the submesh is ready or not
       */
      isReadyForSubMesh(mesh, subMesh, useInstances) {
        return this.isReady(mesh, useInstances, subMesh);
      }
      /**
       * Checks if the material is ready to render the requested mesh
       * @param mesh Define the mesh to render
       * @param useInstances Define whether or not the material is used with instances
       * @param subMesh defines which submesh to render
       * @returns true if ready, otherwise false
       */
      isReady(mesh, useInstances, subMesh) {
        const storeEffectOnSubMeshes = subMesh && this._storeEffectOnSubMeshes;
        if (this.isFrozen) {
          const drawWrapper2 = storeEffectOnSubMeshes ? subMesh._drawWrapper : this._drawWrapper;
          if (drawWrapper2.effect && drawWrapper2._wasPreviouslyReady && drawWrapper2._wasPreviouslyUsingInstances === useInstances) {
            return true;
          }
        }
        const scene = this.getScene();
        const engine = scene.getEngine();
        const defines = [];
        const attribs = [];
        const fallbacks = new EffectFallbacks();
        let shaderName = this._shaderPath, uniforms = this._options.uniforms, uniformBuffers = this._options.uniformBuffers, samplers = this._options.samplers;
        if (engine.getCaps().multiview && scene.activeCamera && scene.activeCamera.outputRenderTarget && scene.activeCamera.outputRenderTarget.getViewCount() > 1) {
          this._multiview = true;
          defines.push("#define MULTIVIEW");
          if (uniforms.indexOf("viewProjection") !== -1 && uniforms.indexOf("viewProjectionR") === -1) {
            uniforms.push("viewProjectionR");
          }
        }
        for (let index = 0; index < this._options.defines.length; index++) {
          const defineToAdd = this._options.defines[index].indexOf("#define") === 0 ? this._options.defines[index] : `#define ${this._options.defines[index]}`;
          defines.push(defineToAdd);
        }
        for (let index = 0; index < this._options.attributes.length; index++) {
          attribs.push(this._options.attributes[index]);
        }
        if (mesh && mesh.isVerticesDataPresent(VertexBuffer.ColorKind)) {
          if (attribs.indexOf(VertexBuffer.ColorKind) === -1) {
            attribs.push(VertexBuffer.ColorKind);
          }
          defines.push("#define VERTEXCOLOR");
        }
        if (useInstances) {
          defines.push("#define INSTANCES");
          PushAttributesForInstances(attribs, this._materialHelperNeedsPreviousMatrices);
          if (mesh == null ? void 0 : mesh.hasThinInstances) {
            defines.push("#define THIN_INSTANCES");
            if (mesh && mesh.isVerticesDataPresent(VertexBuffer.ColorInstanceKind)) {
              attribs.push(VertexBuffer.ColorInstanceKind);
              defines.push("#define INSTANCESCOLOR");
            }
          }
        }
        if (mesh && mesh.useBones && mesh.computeBonesUsingShaders && mesh.skeleton) {
          attribs.push(VertexBuffer.MatricesIndicesKind);
          attribs.push(VertexBuffer.MatricesWeightsKind);
          if (mesh.numBoneInfluencers > 4) {
            attribs.push(VertexBuffer.MatricesIndicesExtraKind);
            attribs.push(VertexBuffer.MatricesWeightsExtraKind);
          }
          const skeleton = mesh.skeleton;
          defines.push("#define NUM_BONE_INFLUENCERS " + mesh.numBoneInfluencers);
          fallbacks.addCPUSkinningFallback(0, mesh);
          if (skeleton.isUsingTextureForMatrices) {
            defines.push("#define BONETEXTURE");
            if (uniforms.indexOf("boneTextureWidth") === -1) {
              uniforms.push("boneTextureWidth");
            }
            if (this._options.samplers.indexOf("boneSampler") === -1) {
              this._options.samplers.push("boneSampler");
            }
          } else {
            defines.push("#define BonesPerMesh " + (skeleton.bones.length + 1));
            if (uniforms.indexOf("mBones") === -1) {
              uniforms.push("mBones");
            }
          }
        } else {
          defines.push("#define NUM_BONE_INFLUENCERS 0");
        }
        let numInfluencers = 0;
        const manager = mesh ? mesh.morphTargetManager : null;
        if (manager) {
          const uv = manager.supportsUVs && defines.indexOf("#define UV1") !== -1;
          const tangent = manager.supportsTangents && defines.indexOf("#define TANGENT") !== -1;
          const normal = manager.supportsNormals && defines.indexOf("#define NORMAL") !== -1;
          numInfluencers = manager.numMaxInfluencers || manager.numInfluencers;
          if (uv) {
            defines.push("#define MORPHTARGETS_UV");
          }
          if (tangent) {
            defines.push("#define MORPHTARGETS_TANGENT");
          }
          if (normal) {
            defines.push("#define MORPHTARGETS_NORMAL");
          }
          if (numInfluencers > 0) {
            defines.push("#define MORPHTARGETS");
          }
          if (manager.isUsingTextureForTargets) {
            defines.push("#define MORPHTARGETS_TEXTURE");
            if (uniforms.indexOf("morphTargetTextureIndices") === -1) {
              uniforms.push("morphTargetTextureIndices");
            }
            if (this._options.samplers.indexOf("morphTargets") === -1) {
              this._options.samplers.push("morphTargets");
            }
          }
          defines.push("#define NUM_MORPH_INFLUENCERS " + numInfluencers);
          for (let index = 0; index < numInfluencers; index++) {
            attribs.push(VertexBuffer.PositionKind + index);
            if (normal) {
              attribs.push(VertexBuffer.NormalKind + index);
            }
            if (tangent) {
              attribs.push(VertexBuffer.TangentKind + index);
            }
            if (uv) {
              attribs.push(VertexBuffer.UVKind + "_" + index);
            }
          }
          if (numInfluencers > 0) {
            uniforms = uniforms.slice();
            uniforms.push("morphTargetInfluences");
            uniforms.push("morphTargetCount");
            uniforms.push("morphTargetTextureInfo");
            uniforms.push("morphTargetTextureIndices");
          }
        } else {
          defines.push("#define NUM_MORPH_INFLUENCERS 0");
        }
        if (mesh) {
          const bvaManager = mesh.bakedVertexAnimationManager;
          if (bvaManager && bvaManager.isEnabled) {
            defines.push("#define BAKED_VERTEX_ANIMATION_TEXTURE");
            if (uniforms.indexOf("bakedVertexAnimationSettings") === -1) {
              uniforms.push("bakedVertexAnimationSettings");
            }
            if (uniforms.indexOf("bakedVertexAnimationTextureSizeInverted") === -1) {
              uniforms.push("bakedVertexAnimationTextureSizeInverted");
            }
            if (uniforms.indexOf("bakedVertexAnimationTime") === -1) {
              uniforms.push("bakedVertexAnimationTime");
            }
            if (this._options.samplers.indexOf("bakedVertexAnimationTexture") === -1) {
              this._options.samplers.push("bakedVertexAnimationTexture");
            }
          }
          PrepareAttributesForBakedVertexAnimation(attribs, mesh, defines);
        }
        for (const name66 in this._textures) {
          if (!this._textures[name66].isReady()) {
            return false;
          }
        }
        if (mesh && this._shouldTurnAlphaTestOn(mesh)) {
          defines.push("#define ALPHATEST");
        }
        if (this._options.useClipPlane !== false) {
          addClipPlaneUniforms(uniforms);
          prepareStringDefinesForClipPlanes(this, scene, defines);
        }
        if (scene.fogEnabled && (mesh == null ? void 0 : mesh.applyFog) && scene.fogMode !== Scene.FOGMODE_NONE) {
          defines.push("#define FOG");
          if (uniforms.indexOf("view") === -1) {
            uniforms.push("view");
          }
          if (uniforms.indexOf("vFogInfos") === -1) {
            uniforms.push("vFogInfos");
          }
          if (uniforms.indexOf("vFogColor") === -1) {
            uniforms.push("vFogColor");
          }
        }
        if (this._useLogarithmicDepth) {
          defines.push("#define LOGARITHMICDEPTH");
          if (uniforms.indexOf("logarithmicDepthConstant") === -1) {
            uniforms.push("logarithmicDepthConstant");
          }
        }
        if (this.customShaderNameResolve) {
          uniforms = uniforms.slice();
          uniformBuffers = uniformBuffers.slice();
          samplers = samplers.slice();
          shaderName = this.customShaderNameResolve(shaderName, uniforms, uniformBuffers, samplers, defines, attribs);
        }
        const drawWrapper = storeEffectOnSubMeshes ? subMesh._getDrawWrapper(void 0, true) : this._drawWrapper;
        const previousEffect = (drawWrapper == null ? void 0 : drawWrapper.effect) ?? null;
        const previousDefines = (drawWrapper == null ? void 0 : drawWrapper.defines) ?? null;
        const join = defines.join("\n");
        let effect = previousEffect;
        if (previousDefines !== join) {
          effect = engine.createEffect(shaderName, {
            attributes: attribs,
            uniformsNames: uniforms,
            uniformBuffersNames: uniformBuffers,
            samplers,
            defines: join,
            fallbacks,
            onCompiled: this.onCompiled,
            onError: this.onError,
            indexParameters: { maxSimultaneousMorphTargets: numInfluencers },
            shaderLanguage: this._options.shaderLanguage
          }, engine);
          if (storeEffectOnSubMeshes) {
            subMesh.setEffect(effect, join, this._materialContext);
          } else if (drawWrapper) {
            drawWrapper.setEffect(effect, join);
          }
          if (this._onEffectCreatedObservable) {
            onCreatedEffectParameters2.effect = effect;
            onCreatedEffectParameters2.subMesh = subMesh ?? (mesh == null ? void 0 : mesh.subMeshes[0]) ?? null;
            this._onEffectCreatedObservable.notifyObservers(onCreatedEffectParameters2);
          }
        }
        drawWrapper._wasPreviouslyUsingInstances = !!useInstances;
        if (!(effect == null ? void 0 : effect.isReady())) {
          return false;
        }
        if (previousEffect !== effect) {
          scene.resetCachedMaterial();
        }
        drawWrapper._wasPreviouslyReady = true;
        return true;
      }
      /**
       * Binds the world matrix to the material
       * @param world defines the world transformation matrix
       * @param effectOverride - If provided, use this effect instead of internal effect
       */
      bindOnlyWorldMatrix(world, effectOverride) {
        const scene = this.getScene();
        const effect = effectOverride ?? this.getEffect();
        if (!effect) {
          return;
        }
        if (this._options.uniforms.indexOf("world") !== -1) {
          effect.setMatrix("world", world);
        }
        if (this._options.uniforms.indexOf("worldView") !== -1) {
          world.multiplyToRef(scene.getViewMatrix(), this._cachedWorldViewMatrix);
          effect.setMatrix("worldView", this._cachedWorldViewMatrix);
        }
        if (this._options.uniforms.indexOf("worldViewProjection") !== -1) {
          world.multiplyToRef(scene.getTransformMatrix(), this._cachedWorldViewProjectionMatrix);
          effect.setMatrix("worldViewProjection", this._cachedWorldViewProjectionMatrix);
        }
        if (this._options.uniforms.indexOf("view") !== -1) {
          effect.setMatrix("view", scene.getViewMatrix());
        }
      }
      /**
       * Binds the submesh to this material by preparing the effect and shader to draw
       * @param world defines the world transformation matrix
       * @param mesh defines the mesh containing the submesh
       * @param subMesh defines the submesh to bind the material to
       */
      bindForSubMesh(world, mesh, subMesh) {
        var _a;
        this.bind(world, mesh, (_a = subMesh._drawWrapperOverride) == null ? void 0 : _a.effect, subMesh);
      }
      /**
       * Binds the material to the mesh
       * @param world defines the world transformation matrix
       * @param mesh defines the mesh to bind the material to
       * @param effectOverride - If provided, use this effect instead of internal effect
       * @param subMesh defines the submesh to bind the material to
       */
      bind(world, mesh, effectOverride, subMesh) {
        var _a;
        const storeEffectOnSubMeshes = subMesh && this._storeEffectOnSubMeshes;
        const effect = effectOverride ?? (storeEffectOnSubMeshes ? subMesh.effect : this.getEffect());
        if (!effect) {
          return;
        }
        const scene = this.getScene();
        this._activeEffect = effect;
        this.bindOnlyWorldMatrix(world, effectOverride);
        const uniformBuffers = this._options.uniformBuffers;
        let useSceneUBO = false;
        if (effect && uniformBuffers && uniformBuffers.length > 0 && scene.getEngine().supportsUniformBuffers) {
          for (let i = 0; i < uniformBuffers.length; ++i) {
            const bufferName = uniformBuffers[i];
            switch (bufferName) {
              case "Mesh":
                if (mesh) {
                  mesh.getMeshUniformBuffer().bindToEffect(effect, "Mesh");
                  mesh.transferToEffect(world);
                }
                break;
              case "Scene":
                BindSceneUniformBuffer(effect, scene.getSceneUniformBuffer());
                scene.finalizeSceneUbo();
                useSceneUBO = true;
                break;
            }
          }
        }
        const mustRebind = mesh && storeEffectOnSubMeshes ? this._mustRebind(scene, effect, subMesh, mesh.visibility) : scene.getCachedMaterial() !== this;
        if (effect && mustRebind) {
          if (!useSceneUBO && this._options.uniforms.indexOf("view") !== -1) {
            effect.setMatrix("view", scene.getViewMatrix());
          }
          if (!useSceneUBO && this._options.uniforms.indexOf("projection") !== -1) {
            effect.setMatrix("projection", scene.getProjectionMatrix());
          }
          if (!useSceneUBO && this._options.uniforms.indexOf("viewProjection") !== -1) {
            effect.setMatrix("viewProjection", scene.getTransformMatrix());
            if (this._multiview) {
              effect.setMatrix("viewProjectionR", scene._transformMatrixR);
            }
          }
          if (scene.activeCamera && this._options.uniforms.indexOf("cameraPosition") !== -1) {
            effect.setVector3("cameraPosition", scene.activeCamera.globalPosition);
          }
          BindBonesParameters(mesh, effect);
          bindClipPlane(effect, this, scene);
          if (this._useLogarithmicDepth) {
            BindLogDepth(storeEffectOnSubMeshes ? subMesh.materialDefines : effect.defines, effect, scene);
          }
          if (mesh) {
            BindFogParameters(scene, mesh, effect);
          }
          let name66;
          for (name66 in this._textures) {
            effect.setTexture(name66, this._textures[name66]);
          }
          for (name66 in this._textureArrays) {
            effect.setTextureArray(name66, this._textureArrays[name66]);
          }
          for (name66 in this._externalTextures) {
            effect.setExternalTexture(name66, this._externalTextures[name66]);
          }
          for (name66 in this._ints) {
            effect.setInt(name66, this._ints[name66]);
          }
          for (name66 in this._uints) {
            effect.setUInt(name66, this._uints[name66]);
          }
          for (name66 in this._floats) {
            effect.setFloat(name66, this._floats[name66]);
          }
          for (name66 in this._floatsArrays) {
            effect.setArray(name66, this._floatsArrays[name66]);
          }
          for (name66 in this._colors3) {
            effect.setColor3(name66, this._colors3[name66]);
          }
          for (name66 in this._colors3Arrays) {
            effect.setArray3(name66, this._colors3Arrays[name66]);
          }
          for (name66 in this._colors4) {
            const color = this._colors4[name66];
            effect.setFloat4(name66, color.r, color.g, color.b, color.a);
          }
          for (name66 in this._colors4Arrays) {
            effect.setArray4(name66, this._colors4Arrays[name66]);
          }
          for (name66 in this._vectors2) {
            effect.setVector2(name66, this._vectors2[name66]);
          }
          for (name66 in this._vectors3) {
            effect.setVector3(name66, this._vectors3[name66]);
          }
          for (name66 in this._vectors4) {
            effect.setVector4(name66, this._vectors4[name66]);
          }
          for (name66 in this._quaternions) {
            effect.setQuaternion(name66, this._quaternions[name66]);
          }
          for (name66 in this._matrices) {
            effect.setMatrix(name66, this._matrices[name66]);
          }
          for (name66 in this._matrixArrays) {
            effect.setMatrices(name66, this._matrixArrays[name66]);
          }
          for (name66 in this._matrices3x3) {
            effect.setMatrix3x3(name66, this._matrices3x3[name66]);
          }
          for (name66 in this._matrices2x2) {
            effect.setMatrix2x2(name66, this._matrices2x2[name66]);
          }
          for (name66 in this._vectors2Arrays) {
            effect.setArray2(name66, this._vectors2Arrays[name66]);
          }
          for (name66 in this._vectors3Arrays) {
            effect.setArray3(name66, this._vectors3Arrays[name66]);
          }
          for (name66 in this._vectors4Arrays) {
            effect.setArray4(name66, this._vectors4Arrays[name66]);
          }
          for (name66 in this._quaternionsArrays) {
            effect.setArray4(name66, this._quaternionsArrays[name66]);
          }
          for (name66 in this._uniformBuffers) {
            const buffer = this._uniformBuffers[name66].getBuffer();
            if (buffer) {
              effect.bindUniformBuffer(buffer, name66);
            }
          }
          for (name66 in this._textureSamplers) {
            effect.setTextureSampler(name66, this._textureSamplers[name66]);
          }
          for (name66 in this._storageBuffers) {
            effect.setStorageBuffer(name66, this._storageBuffers[name66]);
          }
        }
        if (effect && mesh && (mustRebind || !this.isFrozen)) {
          const manager = mesh.morphTargetManager;
          if (manager && manager.numInfluencers > 0) {
            BindMorphTargetParameters(mesh, effect);
          }
          const bvaManager = mesh.bakedVertexAnimationManager;
          if (bvaManager && bvaManager.isEnabled) {
            const drawWrapper = storeEffectOnSubMeshes ? subMesh._drawWrapper : this._drawWrapper;
            (_a = mesh.bakedVertexAnimationManager) == null ? void 0 : _a.bind(effect, !!drawWrapper._wasPreviouslyUsingInstances);
          }
        }
        this._afterBind(mesh, effect, subMesh);
      }
      /**
       * Gets the active textures from the material
       * @returns an array of textures
       */
      getActiveTextures() {
        const activeTextures = super.getActiveTextures();
        for (const name66 in this._textures) {
          activeTextures.push(this._textures[name66]);
        }
        for (const name66 in this._textureArrays) {
          const array = this._textureArrays[name66];
          for (let index = 0; index < array.length; index++) {
            activeTextures.push(array[index]);
          }
        }
        return activeTextures;
      }
      /**
       * Specifies if the material uses a texture
       * @param texture defines the texture to check against the material
       * @returns a boolean specifying if the material uses the texture
       */
      hasTexture(texture) {
        if (super.hasTexture(texture)) {
          return true;
        }
        for (const name66 in this._textures) {
          if (this._textures[name66] === texture) {
            return true;
          }
        }
        for (const name66 in this._textureArrays) {
          const array = this._textureArrays[name66];
          for (let index = 0; index < array.length; index++) {
            if (array[index] === texture) {
              return true;
            }
          }
        }
        return false;
      }
      /**
       * Makes a duplicate of the material, and gives it a new name
       * @param name defines the new name for the duplicated material
       * @returns the cloned material
       */
      clone(name66) {
        const result = SerializationHelper.Clone(() => new _ShaderMaterial(name66, this.getScene(), this._shaderPath, this._options, this._storeEffectOnSubMeshes), this);
        result.name = name66;
        result.id = name66;
        if (typeof result._shaderPath === "object") {
          result._shaderPath = { ...result._shaderPath };
        }
        this._options = { ...this._options };
        Object.keys(this._options).forEach((propName) => {
          const propValue = this._options[propName];
          if (Array.isArray(propValue)) {
            this._options[propName] = propValue.slice(0);
          }
        });
        this.stencil.copyTo(result.stencil);
        for (const key in this._textures) {
          result.setTexture(key, this._textures[key]);
        }
        for (const key in this._textureArrays) {
          result.setTextureArray(key, this._textureArrays[key]);
        }
        for (const key in this._externalTextures) {
          result.setExternalTexture(key, this._externalTextures[key]);
        }
        for (const key in this._ints) {
          result.setInt(key, this._ints[key]);
        }
        for (const key in this._uints) {
          result.setUInt(key, this._uints[key]);
        }
        for (const key in this._floats) {
          result.setFloat(key, this._floats[key]);
        }
        for (const key in this._floatsArrays) {
          result.setFloats(key, this._floatsArrays[key]);
        }
        for (const key in this._colors3) {
          result.setColor3(key, this._colors3[key]);
        }
        for (const key in this._colors3Arrays) {
          result._colors3Arrays[key] = this._colors3Arrays[key];
        }
        for (const key in this._colors4) {
          result.setColor4(key, this._colors4[key]);
        }
        for (const key in this._colors4Arrays) {
          result._colors4Arrays[key] = this._colors4Arrays[key];
        }
        for (const key in this._vectors2) {
          result.setVector2(key, this._vectors2[key]);
        }
        for (const key in this._vectors3) {
          result.setVector3(key, this._vectors3[key]);
        }
        for (const key in this._vectors4) {
          result.setVector4(key, this._vectors4[key]);
        }
        for (const key in this._quaternions) {
          result.setQuaternion(key, this._quaternions[key]);
        }
        for (const key in this._quaternionsArrays) {
          result._quaternionsArrays[key] = this._quaternionsArrays[key];
        }
        for (const key in this._matrices) {
          result.setMatrix(key, this._matrices[key]);
        }
        for (const key in this._matrixArrays) {
          result._matrixArrays[key] = this._matrixArrays[key].slice();
        }
        for (const key in this._matrices3x3) {
          result.setMatrix3x3(key, this._matrices3x3[key]);
        }
        for (const key in this._matrices2x2) {
          result.setMatrix2x2(key, this._matrices2x2[key]);
        }
        for (const key in this._vectors2Arrays) {
          result.setArray2(key, this._vectors2Arrays[key]);
        }
        for (const key in this._vectors3Arrays) {
          result.setArray3(key, this._vectors3Arrays[key]);
        }
        for (const key in this._vectors4Arrays) {
          result.setArray4(key, this._vectors4Arrays[key]);
        }
        for (const key in this._uniformBuffers) {
          result.setUniformBuffer(key, this._uniformBuffers[key]);
        }
        for (const key in this._textureSamplers) {
          result.setTextureSampler(key, this._textureSamplers[key]);
        }
        for (const key in this._storageBuffers) {
          result.setStorageBuffer(key, this._storageBuffers[key]);
        }
        return result;
      }
      /**
       * Disposes the material
       * @param forceDisposeEffect specifies if effects should be forcefully disposed
       * @param forceDisposeTextures specifies if textures should be forcefully disposed
       * @param notBoundToMesh specifies if the material that is being disposed is known to be not bound to any mesh
       */
      dispose(forceDisposeEffect, forceDisposeTextures, notBoundToMesh) {
        if (forceDisposeTextures) {
          let name66;
          for (name66 in this._textures) {
            this._textures[name66].dispose();
          }
          for (name66 in this._textureArrays) {
            const array = this._textureArrays[name66];
            for (let index = 0; index < array.length; index++) {
              array[index].dispose();
            }
          }
        }
        this._textures = {};
        super.dispose(forceDisposeEffect, forceDisposeTextures, notBoundToMesh);
      }
      /**
       * Serializes this material in a JSON representation
       * @returns the serialized material object
       */
      serialize() {
        const serializationObject = SerializationHelper.Serialize(this);
        serializationObject.customType = "BABYLON.ShaderMaterial";
        serializationObject.uniqueId = this.uniqueId;
        serializationObject.options = this._options;
        serializationObject.shaderPath = this._shaderPath;
        serializationObject.storeEffectOnSubMeshes = this._storeEffectOnSubMeshes;
        let name66;
        serializationObject.stencil = this.stencil.serialize();
        serializationObject.textures = {};
        for (name66 in this._textures) {
          serializationObject.textures[name66] = this._textures[name66].serialize();
        }
        serializationObject.textureArrays = {};
        for (name66 in this._textureArrays) {
          serializationObject.textureArrays[name66] = [];
          const array = this._textureArrays[name66];
          for (let index = 0; index < array.length; index++) {
            serializationObject.textureArrays[name66].push(array[index].serialize());
          }
        }
        serializationObject.ints = {};
        for (name66 in this._ints) {
          serializationObject.ints[name66] = this._ints[name66];
        }
        serializationObject.uints = {};
        for (name66 in this._uints) {
          serializationObject.uints[name66] = this._uints[name66];
        }
        serializationObject.floats = {};
        for (name66 in this._floats) {
          serializationObject.floats[name66] = this._floats[name66];
        }
        serializationObject.floatsArrays = {};
        for (name66 in this._floatsArrays) {
          serializationObject.floatsArrays[name66] = this._floatsArrays[name66];
        }
        serializationObject.colors3 = {};
        for (name66 in this._colors3) {
          serializationObject.colors3[name66] = this._colors3[name66].asArray();
        }
        serializationObject.colors3Arrays = {};
        for (name66 in this._colors3Arrays) {
          serializationObject.colors3Arrays[name66] = this._colors3Arrays[name66];
        }
        serializationObject.colors4 = {};
        for (name66 in this._colors4) {
          serializationObject.colors4[name66] = this._colors4[name66].asArray();
        }
        serializationObject.colors4Arrays = {};
        for (name66 in this._colors4Arrays) {
          serializationObject.colors4Arrays[name66] = this._colors4Arrays[name66];
        }
        serializationObject.vectors2 = {};
        for (name66 in this._vectors2) {
          serializationObject.vectors2[name66] = this._vectors2[name66].asArray();
        }
        serializationObject.vectors3 = {};
        for (name66 in this._vectors3) {
          serializationObject.vectors3[name66] = this._vectors3[name66].asArray();
        }
        serializationObject.vectors4 = {};
        for (name66 in this._vectors4) {
          serializationObject.vectors4[name66] = this._vectors4[name66].asArray();
        }
        serializationObject.quaternions = {};
        for (name66 in this._quaternions) {
          serializationObject.quaternions[name66] = this._quaternions[name66].asArray();
        }
        serializationObject.matrices = {};
        for (name66 in this._matrices) {
          serializationObject.matrices[name66] = this._matrices[name66].asArray();
        }
        serializationObject.matrixArray = {};
        for (name66 in this._matrixArrays) {
          serializationObject.matrixArray[name66] = this._matrixArrays[name66];
        }
        serializationObject.matrices3x3 = {};
        for (name66 in this._matrices3x3) {
          serializationObject.matrices3x3[name66] = this._matrices3x3[name66];
        }
        serializationObject.matrices2x2 = {};
        for (name66 in this._matrices2x2) {
          serializationObject.matrices2x2[name66] = this._matrices2x2[name66];
        }
        serializationObject.vectors2Arrays = {};
        for (name66 in this._vectors2Arrays) {
          serializationObject.vectors2Arrays[name66] = this._vectors2Arrays[name66];
        }
        serializationObject.vectors3Arrays = {};
        for (name66 in this._vectors3Arrays) {
          serializationObject.vectors3Arrays[name66] = this._vectors3Arrays[name66];
        }
        serializationObject.vectors4Arrays = {};
        for (name66 in this._vectors4Arrays) {
          serializationObject.vectors4Arrays[name66] = this._vectors4Arrays[name66];
        }
        serializationObject.quaternionsArrays = {};
        for (name66 in this._quaternionsArrays) {
          serializationObject.quaternionsArrays[name66] = this._quaternionsArrays[name66];
        }
        return serializationObject;
      }
      /**
       * Creates a shader material from parsed shader material data
       * @param source defines the JSON representation of the material
       * @param scene defines the hosting scene
       * @param rootUrl defines the root URL to use to load textures and relative dependencies
       * @returns a new material
       */
      static Parse(source, scene, rootUrl) {
        const material = SerializationHelper.Parse(() => new _ShaderMaterial(source.name, scene, source.shaderPath, source.options, source.storeEffectOnSubMeshes), source, scene, rootUrl);
        let name66;
        if (source.stencil) {
          material.stencil.parse(source.stencil, scene, rootUrl);
        }
        for (name66 in source.textures) {
          material.setTexture(name66, Texture.Parse(source.textures[name66], scene, rootUrl));
        }
        for (name66 in source.textureArrays) {
          const array = source.textureArrays[name66];
          const textureArray = [];
          for (let index = 0; index < array.length; index++) {
            textureArray.push(Texture.Parse(array[index], scene, rootUrl));
          }
          material.setTextureArray(name66, textureArray);
        }
        for (name66 in source.ints) {
          material.setInt(name66, source.ints[name66]);
        }
        for (name66 in source.uints) {
          material.setUInt(name66, source.uints[name66]);
        }
        for (name66 in source.floats) {
          material.setFloat(name66, source.floats[name66]);
        }
        for (name66 in source.floatsArrays) {
          material.setFloats(name66, source.floatsArrays[name66]);
        }
        for (name66 in source.colors3) {
          material.setColor3(name66, Color3.FromArray(source.colors3[name66]));
        }
        for (name66 in source.colors3Arrays) {
          const colors = source.colors3Arrays[name66].reduce((arr, num, i) => {
            if (i % 3 === 0) {
              arr.push([num]);
            } else {
              arr[arr.length - 1].push(num);
            }
            return arr;
          }, []).map((color) => Color3.FromArray(color));
          material.setColor3Array(name66, colors);
        }
        for (name66 in source.colors4) {
          material.setColor4(name66, Color4.FromArray(source.colors4[name66]));
        }
        for (name66 in source.colors4Arrays) {
          const colors = source.colors4Arrays[name66].reduce((arr, num, i) => {
            if (i % 4 === 0) {
              arr.push([num]);
            } else {
              arr[arr.length - 1].push(num);
            }
            return arr;
          }, []).map((color) => Color4.FromArray(color));
          material.setColor4Array(name66, colors);
        }
        for (name66 in source.vectors2) {
          material.setVector2(name66, Vector2.FromArray(source.vectors2[name66]));
        }
        for (name66 in source.vectors3) {
          material.setVector3(name66, Vector3.FromArray(source.vectors3[name66]));
        }
        for (name66 in source.vectors4) {
          material.setVector4(name66, Vector4.FromArray(source.vectors4[name66]));
        }
        for (name66 in source.quaternions) {
          material.setQuaternion(name66, Quaternion.FromArray(source.quaternions[name66]));
        }
        for (name66 in source.matrices) {
          material.setMatrix(name66, Matrix.FromArray(source.matrices[name66]));
        }
        for (name66 in source.matrixArray) {
          material._matrixArrays[name66] = new Float32Array(source.matrixArray[name66]);
        }
        for (name66 in source.matrices3x3) {
          material.setMatrix3x3(name66, source.matrices3x3[name66]);
        }
        for (name66 in source.matrices2x2) {
          material.setMatrix2x2(name66, source.matrices2x2[name66]);
        }
        for (name66 in source.vectors2Arrays) {
          material.setArray2(name66, source.vectors2Arrays[name66]);
        }
        for (name66 in source.vectors3Arrays) {
          material.setArray3(name66, source.vectors3Arrays[name66]);
        }
        for (name66 in source.vectors4Arrays) {
          material.setArray4(name66, source.vectors4Arrays[name66]);
        }
        for (name66 in source.quaternionsArrays) {
          material.setArray4(name66, source.quaternionsArrays[name66]);
        }
        return material;
      }
      /**
       * Creates a new ShaderMaterial from a snippet saved in a remote file
       * @param name defines the name of the ShaderMaterial to create (can be null or empty to use the one from the json data)
       * @param url defines the url to load from
       * @param scene defines the hosting scene
       * @param rootUrl defines the root URL to use to load textures and relative dependencies
       * @returns a promise that will resolve to the new ShaderMaterial
       */
      static ParseFromFileAsync(name66, url, scene, rootUrl = "") {
        return new Promise((resolve, reject) => {
          const request = new WebRequest();
          request.addEventListener("readystatechange", () => {
            if (request.readyState == 4) {
              if (request.status == 200) {
                const serializationObject = JSON.parse(request.responseText);
                const output = this.Parse(serializationObject, scene || EngineStore.LastCreatedScene, rootUrl);
                if (name66) {
                  output.name = name66;
                }
                resolve(output);
              } else {
                reject("Unable to load the ShaderMaterial");
              }
            }
          });
          request.open("GET", url);
          request.send();
        });
      }
      /**
       * Creates a ShaderMaterial from a snippet saved by the Inspector
       * @param snippetId defines the snippet to load
       * @param scene defines the hosting scene
       * @param rootUrl defines the root URL to use to load textures and relative dependencies
       * @returns a promise that will resolve to the new ShaderMaterial
       */
      static ParseFromSnippetAsync(snippetId, scene, rootUrl = "") {
        return new Promise((resolve, reject) => {
          const request = new WebRequest();
          request.addEventListener("readystatechange", () => {
            if (request.readyState == 4) {
              if (request.status == 200) {
                const snippet = JSON.parse(JSON.parse(request.responseText).jsonPayload);
                const serializationObject = JSON.parse(snippet.shaderMaterial);
                const output = this.Parse(serializationObject, scene || EngineStore.LastCreatedScene, rootUrl);
                output.snippetId = snippetId;
                resolve(output);
              } else {
                reject("Unable to load the snippet " + snippetId);
              }
            }
          });
          request.open("GET", this.SnippetUrl + "/" + snippetId.replace(/#/g, "/"));
          request.send();
        });
      }
    };
    ShaderMaterial.SnippetUrl = `https://snippet.babylonjs.com`;
    ShaderMaterial.CreateFromSnippetAsync = ShaderMaterial.ParseFromSnippetAsync;
    RegisterClass("BABYLON.ShaderMaterial", ShaderMaterial);
  }
});

// node_modules/@babylonjs/core/Shaders/color.fragment.js
var name64, shader64;
var init_color_fragment = __esm({
  "node_modules/@babylonjs/core/Shaders/color.fragment.js"() {
    init_shaderStore();
    init_clipPlaneFragmentDeclaration();
    init_fogFragmentDeclaration();
    init_clipPlaneFragment();
    init_fogFragment();
    name64 = "colorPixelShader";
    shader64 = `#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
#define VERTEXCOLOR
varying vec4 vColor;
#else
uniform vec4 color;
#endif
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
gl_FragColor=vColor;
#else
gl_FragColor=color;
#endif
#include<fogFragment>(color,gl_FragColor)
#define CUSTOM_FRAGMENT_MAIN_END
}`;
    ShaderStore.ShadersStore[name64] = shader64;
  }
});

// node_modules/@babylonjs/core/Shaders/color.vertex.js
var name65, shader65;
var init_color_vertex = __esm({
  "node_modules/@babylonjs/core/Shaders/color.vertex.js"() {
    init_shaderStore();
    init_bonesDeclaration();
    init_bakedVertexAnimationDeclaration();
    init_clipPlaneVertexDeclaration();
    init_fogVertexDeclaration();
    init_instancesDeclaration();
    init_instancesVertex();
    init_bonesVertex();
    init_bakedVertexAnimation();
    init_clipPlaneVertex();
    init_fogVertex();
    init_vertexColorMixing();
    name65 = "colorVertexShader";
    shader65 = `attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#ifdef FOG
uniform mat4 view;
#endif
#include<instancesDeclaration>
uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {gl_Position=viewProjection*worldPos;} else {gl_Position=viewProjectionR*worldPos;}
#else
gl_Position=viewProjection*worldPos;
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<vertexColorMixing>
#define CUSTOM_VERTEX_MAIN_END
}`;
    ShaderStore.ShadersStore[name65] = shader65;
  }
});

// node_modules/@babylonjs/core/Meshes/linesMesh.js
var LinesMesh, InstancedLinesMesh;
var init_linesMesh = __esm({
  "node_modules/@babylonjs/core/Meshes/linesMesh.js"() {
    init_math_color();
    init_buffer();
    init_mesh();
    init_instancedMesh();
    init_material();
    init_shaderMaterial();
    init_color_fragment();
    init_color_vertex();
    Mesh._LinesMeshParser = (parsedMesh, scene) => {
      return LinesMesh.Parse(parsedMesh, scene);
    };
    LinesMesh = class _LinesMesh extends Mesh {
      _isShaderMaterial(shader66) {
        return shader66.getClassName() === "ShaderMaterial";
      }
      /**
       * Creates a new LinesMesh
       * @param name defines the name
       * @param scene defines the hosting scene
       * @param parent defines the parent mesh if any
       * @param source defines the optional source LinesMesh used to clone data from
       * @param doNotCloneChildren When cloning, skip cloning child meshes of source, default False.
       * When false, achieved by calling a clone(), also passing False.
       * This will make creation of children, recursive.
       * @param useVertexColor defines if this LinesMesh supports vertex color
       * @param useVertexAlpha defines if this LinesMesh supports vertex alpha
       * @param material material to use to draw the line. If not provided, will create a new one
       */
      constructor(name66, scene = null, parent = null, source = null, doNotCloneChildren, useVertexColor, useVertexAlpha, material) {
        super(name66, scene, parent, source, doNotCloneChildren);
        this.useVertexColor = useVertexColor;
        this.useVertexAlpha = useVertexAlpha;
        this.color = new Color3(1, 1, 1);
        this.alpha = 1;
        if (source) {
          this.color = source.color.clone();
          this.alpha = source.alpha;
          this.useVertexColor = source.useVertexColor;
          this.useVertexAlpha = source.useVertexAlpha;
        }
        this.intersectionThreshold = 0.1;
        const defines = [];
        const options = {
          attributes: [VertexBuffer.PositionKind],
          uniforms: ["world", "viewProjection"],
          needAlphaBlending: true,
          defines,
          useClipPlane: null
        };
        if (useVertexAlpha === false) {
          options.needAlphaBlending = false;
        } else {
          options.defines.push("#define VERTEXALPHA");
        }
        if (!useVertexColor) {
          options.uniforms.push("color");
          this._color4 = new Color4();
        } else {
          options.defines.push("#define VERTEXCOLOR");
          options.attributes.push(VertexBuffer.ColorKind);
        }
        if (material) {
          this.material = material;
        } else {
          this.material = new ShaderMaterial("colorShader", this.getScene(), "color", options, false);
          this.material.doNotSerialize = true;
        }
      }
      isReady() {
        if (!this._lineMaterial.isReady(this, !!this._userInstancedBuffersStorage || this.hasThinInstances)) {
          return false;
        }
        return super.isReady();
      }
      /**
       * @returns the string "LineMesh"
       */
      getClassName() {
        return "LinesMesh";
      }
      /**
       * @internal
       */
      get material() {
        return this._lineMaterial;
      }
      /**
       * @internal
       */
      set material(value) {
        this._lineMaterial = value;
        this._lineMaterial.fillMode = Material.LineListDrawMode;
      }
      /**
       * @internal
       */
      get checkCollisions() {
        return false;
      }
      set checkCollisions(value) {
      }
      /**
       * @internal
       */
      _bind(_subMesh, colorEffect) {
        if (!this._geometry) {
          return this;
        }
        const indexToBind = this.isUnIndexed ? null : this._geometry.getIndexBuffer();
        if (!this._userInstancedBuffersStorage || this.hasThinInstances) {
          this._geometry._bind(colorEffect, indexToBind);
        } else {
          this._geometry._bind(colorEffect, indexToBind, this._userInstancedBuffersStorage.vertexBuffers, this._userInstancedBuffersStorage.vertexArrayObjects);
        }
        if (!this.useVertexColor && this._isShaderMaterial(this._lineMaterial)) {
          const { r, g, b } = this.color;
          this._color4.set(r, g, b, this.alpha);
          this._lineMaterial.setColor4("color", this._color4);
        }
        return this;
      }
      /**
       * @internal
       */
      _draw(subMesh, fillMode, instancesCount) {
        if (!this._geometry || !this._geometry.getVertexBuffers() || !this._unIndexed && !this._geometry.getIndexBuffer()) {
          return this;
        }
        const engine = this.getScene().getEngine();
        if (this._unIndexed) {
          engine.drawArraysType(Material.LineListDrawMode, subMesh.verticesStart, subMesh.verticesCount, instancesCount);
        } else {
          engine.drawElementsType(Material.LineListDrawMode, subMesh.indexStart, subMesh.indexCount, instancesCount);
        }
        return this;
      }
      /**
       * Disposes of the line mesh
       * @param doNotRecurse If children should be disposed
       * @param disposeMaterialAndTextures This parameter is not used by the LineMesh class
       * @param doNotDisposeMaterial If the material should not be disposed (default: false, meaning the material is disposed)
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dispose(doNotRecurse, disposeMaterialAndTextures = false, doNotDisposeMaterial) {
        if (!doNotDisposeMaterial) {
          this._lineMaterial.dispose(false, false, true);
        }
        super.dispose(doNotRecurse);
      }
      /**
       * Returns a new LineMesh object cloned from the current one.
       * @param name defines the cloned mesh name
       * @param newParent defines the new mesh parent
       * @param doNotCloneChildren if set to true, none of the mesh children are cloned (false by default)
       * @returns the new mesh
       */
      clone(name66, newParent = null, doNotCloneChildren) {
        return new _LinesMesh(name66, this.getScene(), newParent, this, doNotCloneChildren);
      }
      /**
       * Creates a new InstancedLinesMesh object from the mesh model.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
       * @param name defines the name of the new instance
       * @returns a new InstancedLinesMesh
       */
      createInstance(name66) {
        const instance = new InstancedLinesMesh(name66, this);
        if (this.instancedBuffers) {
          instance.instancedBuffers = {};
          for (const key in this.instancedBuffers) {
            instance.instancedBuffers[key] = this.instancedBuffers[key];
          }
        }
        return instance;
      }
      /**
       * Serializes this ground mesh
       * @param serializationObject object to write serialization to
       */
      serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.color = this.color.asArray();
        serializationObject.alpha = this.alpha;
      }
      /**
       * Parses a serialized ground mesh
       * @param parsedMesh the serialized mesh
       * @param scene the scene to create the ground mesh in
       * @returns the created ground mesh
       */
      static Parse(parsedMesh, scene) {
        const result = new _LinesMesh(parsedMesh.name, scene);
        result.color = Color3.FromArray(parsedMesh.color);
        result.alpha = parsedMesh.alpha;
        return result;
      }
    };
    InstancedLinesMesh = class extends InstancedMesh {
      constructor(name66, source) {
        super(name66, source);
        this.intersectionThreshold = source.intersectionThreshold;
      }
      /**
       * @returns the string "InstancedLinesMesh".
       */
      getClassName() {
        return "InstancedLinesMesh";
      }
    };
  }
});

// node_modules/@babylonjs/core/Meshes/Builders/linesBuilder.js
function CreateLineSystemVertexData(options) {
  const indices = [];
  const positions = [];
  const lines = options.lines;
  const colors = options.colors;
  const vertexColors = [];
  let idx = 0;
  for (let l = 0; l < lines.length; l++) {
    const points = lines[l];
    for (let index = 0; index < points.length; index++) {
      const { x, y, z } = points[index];
      positions.push(x, y, z);
      if (colors) {
        const color = colors[l];
        const { r, g, b, a } = color[index];
        vertexColors.push(r, g, b, a);
      }
      if (index > 0) {
        indices.push(idx - 1);
        indices.push(idx);
      }
      idx++;
    }
  }
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  if (colors) {
    vertexData.colors = vertexColors;
  }
  return vertexData;
}
function CreateDashedLinesVertexData(options) {
  const dashSize = options.dashSize || 3;
  const gapSize = options.gapSize || 1;
  const dashNb = options.dashNb || 200;
  const points = options.points;
  const positions = [];
  const indices = [];
  const curvect = Vector3.Zero();
  let lg = 0;
  let nb = 0;
  let shft = 0;
  let dashshft = 0;
  let curshft = 0;
  let idx = 0;
  let i = 0;
  for (i = 0; i < points.length - 1; i++) {
    points[i + 1].subtractToRef(points[i], curvect);
    lg += curvect.length();
  }
  shft = lg / dashNb;
  dashshft = dashSize * shft / (dashSize + gapSize);
  for (i = 0; i < points.length - 1; i++) {
    points[i + 1].subtractToRef(points[i], curvect);
    nb = Math.floor(curvect.length() / shft);
    curvect.normalize();
    for (let j = 0; j < nb; j++) {
      curshft = shft * j;
      positions.push(points[i].x + curshft * curvect.x, points[i].y + curshft * curvect.y, points[i].z + curshft * curvect.z);
      positions.push(points[i].x + (curshft + dashshft) * curvect.x, points[i].y + (curshft + dashshft) * curvect.y, points[i].z + (curshft + dashshft) * curvect.z);
      indices.push(idx, idx + 1);
      idx += 2;
    }
  }
  const vertexData = new VertexData();
  vertexData.positions = positions;
  vertexData.indices = indices;
  return vertexData;
}
function CreateLineSystem(name66, options, scene = null) {
  const instance = options.instance;
  const lines = options.lines;
  const colors = options.colors;
  if (instance) {
    const positions = instance.getVerticesData(VertexBuffer.PositionKind);
    let vertexColor;
    let lineColors;
    if (colors) {
      vertexColor = instance.getVerticesData(VertexBuffer.ColorKind);
    }
    let i = 0;
    let c = 0;
    for (let l = 0; l < lines.length; l++) {
      const points = lines[l];
      for (let p = 0; p < points.length; p++) {
        positions[i] = points[p].x;
        positions[i + 1] = points[p].y;
        positions[i + 2] = points[p].z;
        if (colors && vertexColor) {
          lineColors = colors[l];
          vertexColor[c] = lineColors[p].r;
          vertexColor[c + 1] = lineColors[p].g;
          vertexColor[c + 2] = lineColors[p].b;
          vertexColor[c + 3] = lineColors[p].a;
          c += 4;
        }
        i += 3;
      }
    }
    instance.updateVerticesData(VertexBuffer.PositionKind, positions, false, false);
    if (colors && vertexColor) {
      instance.updateVerticesData(VertexBuffer.ColorKind, vertexColor, false, false);
    }
    return instance;
  }
  const useVertexColor = colors ? true : false;
  const lineSystem = new LinesMesh(name66, scene, null, void 0, void 0, useVertexColor, options.useVertexAlpha, options.material);
  const vertexData = CreateLineSystemVertexData(options);
  vertexData.applyToMesh(lineSystem, options.updatable);
  return lineSystem;
}
function CreateLines(name66, options, scene = null) {
  const colors = options.colors ? [options.colors] : null;
  const lines = CreateLineSystem(name66, { lines: [options.points], updatable: options.updatable, instance: options.instance, colors, useVertexAlpha: options.useVertexAlpha, material: options.material }, scene);
  return lines;
}
function CreateDashedLines(name66, options, scene = null) {
  const points = options.points;
  const instance = options.instance;
  const gapSize = options.gapSize || 1;
  const dashSize = options.dashSize || 3;
  if (instance) {
    const positionFunction = (positions) => {
      const curvect = Vector3.Zero();
      const nbSeg = positions.length / 6;
      let lg = 0;
      let nb = 0;
      let shft = 0;
      let dashshft = 0;
      let curshft = 0;
      let p = 0;
      let i = 0;
      let j = 0;
      for (i = 0; i < points.length - 1; i++) {
        points[i + 1].subtractToRef(points[i], curvect);
        lg += curvect.length();
      }
      shft = lg / nbSeg;
      const dashSize2 = instance._creationDataStorage.dashSize;
      const gapSize2 = instance._creationDataStorage.gapSize;
      dashshft = dashSize2 * shft / (dashSize2 + gapSize2);
      for (i = 0; i < points.length - 1; i++) {
        points[i + 1].subtractToRef(points[i], curvect);
        nb = Math.floor(curvect.length() / shft);
        curvect.normalize();
        j = 0;
        while (j < nb && p < positions.length) {
          curshft = shft * j;
          positions[p] = points[i].x + curshft * curvect.x;
          positions[p + 1] = points[i].y + curshft * curvect.y;
          positions[p + 2] = points[i].z + curshft * curvect.z;
          positions[p + 3] = points[i].x + (curshft + dashshft) * curvect.x;
          positions[p + 4] = points[i].y + (curshft + dashshft) * curvect.y;
          positions[p + 5] = points[i].z + (curshft + dashshft) * curvect.z;
          p += 6;
          j++;
        }
      }
      while (p < positions.length) {
        positions[p] = points[i].x;
        positions[p + 1] = points[i].y;
        positions[p + 2] = points[i].z;
        p += 3;
      }
    };
    if (options.dashNb || options.dashSize || options.gapSize || options.useVertexAlpha || options.material) {
      Logger.Warn("You have used an option other than points with the instance option. Please be aware that these other options will be ignored.");
    }
    instance.updateMeshPositions(positionFunction, false);
    return instance;
  }
  const dashedLines = new LinesMesh(name66, scene, null, void 0, void 0, void 0, options.useVertexAlpha, options.material);
  const vertexData = CreateDashedLinesVertexData(options);
  vertexData.applyToMesh(dashedLines, options.updatable);
  dashedLines._creationDataStorage = new _CreationDataStorage();
  dashedLines._creationDataStorage.dashSize = dashSize;
  dashedLines._creationDataStorage.gapSize = gapSize;
  return dashedLines;
}
var LinesBuilder;
var init_linesBuilder = __esm({
  "node_modules/@babylonjs/core/Meshes/Builders/linesBuilder.js"() {
    init_math_vector();
    init_mesh();
    init_mesh_vertexData();
    init_linesMesh();
    init_buffer();
    init_logger();
    LinesBuilder = {
      CreateDashedLines,
      CreateLineSystem,
      CreateLines
    };
    VertexData.CreateLineSystem = CreateLineSystemVertexData;
    VertexData.CreateDashedLines = CreateDashedLinesVertexData;
    Mesh.CreateLines = (name66, points, scene = null, updatable = false, instance = null) => {
      const options = {
        points,
        updatable,
        instance
      };
      return CreateLines(name66, options, scene);
    };
    Mesh.CreateDashedLines = (name66, points, dashSize, gapSize, dashNb, scene = null, updatable, instance) => {
      const options = {
        points,
        dashSize,
        gapSize,
        dashNb,
        updatable,
        instance
      };
      return CreateDashedLines(name66, options, scene);
    };
  }
});

// node_modules/@babylonjs/core/Misc/timer.js
function setAndStartTimer(options) {
  let timer = 0;
  const startTime = Date.now();
  options.observableParameters = options.observableParameters ?? {};
  const observer2 = options.contextObservable.add((payload) => {
    const now = Date.now();
    timer = now - startTime;
    const data = {
      startTime,
      currentTime: now,
      deltaTime: timer,
      completeRate: timer / options.timeout,
      payload
    };
    options.onTick && options.onTick(data);
    if (options.breakCondition && options.breakCondition()) {
      options.contextObservable.remove(observer2);
      options.onAborted && options.onAborted(data);
    }
    if (timer >= options.timeout) {
      options.contextObservable.remove(observer2);
      options.onEnded && options.onEnded(data);
    }
  }, options.observableParameters.mask, options.observableParameters.insertFirst, options.observableParameters.scope);
  return observer2;
}
var TimerState, AdvancedTimer;
var init_timer = __esm({
  "node_modules/@babylonjs/core/Misc/timer.js"() {
    init_observable();
    (function(TimerState2) {
      TimerState2[TimerState2["INIT"] = 0] = "INIT";
      TimerState2[TimerState2["STARTED"] = 1] = "STARTED";
      TimerState2[TimerState2["ENDED"] = 2] = "ENDED";
    })(TimerState || (TimerState = {}));
    AdvancedTimer = class {
      /**
       * Will construct a new advanced timer based on the options provided. Timer will not start until start() is called.
       * @param options construction options for this advanced timer
       */
      constructor(options) {
        this.onEachCountObservable = new Observable();
        this.onTimerAbortedObservable = new Observable();
        this.onTimerEndedObservable = new Observable();
        this.onStateChangedObservable = new Observable();
        this._observer = null;
        this._breakOnNextTick = false;
        this._tick = (payload) => {
          const now = Date.now();
          this._timer = now - this._startTime;
          const data = {
            startTime: this._startTime,
            currentTime: now,
            deltaTime: this._timer,
            completeRate: this._timer / this._timeToEnd,
            payload
          };
          const shouldBreak = this._breakOnNextTick || this._breakCondition(data);
          if (shouldBreak || this._timer >= this._timeToEnd) {
            this._stop(data, shouldBreak);
          } else {
            this.onEachCountObservable.notifyObservers(data);
          }
        };
        this._setState(TimerState.INIT);
        this._contextObservable = options.contextObservable;
        this._observableParameters = options.observableParameters ?? {};
        this._breakCondition = options.breakCondition ?? (() => false);
        this._timeToEnd = options.timeout;
        if (options.onEnded) {
          this.onTimerEndedObservable.add(options.onEnded);
        }
        if (options.onTick) {
          this.onEachCountObservable.add(options.onTick);
        }
        if (options.onAborted) {
          this.onTimerAbortedObservable.add(options.onAborted);
        }
      }
      /**
       * set a breaking condition for this timer. Default is to never break during count
       * @param predicate the new break condition. Returns true to break, false otherwise
       */
      set breakCondition(predicate) {
        this._breakCondition = predicate;
      }
      /**
       * Reset ALL associated observables in this advanced timer
       */
      clearObservables() {
        this.onEachCountObservable.clear();
        this.onTimerAbortedObservable.clear();
        this.onTimerEndedObservable.clear();
        this.onStateChangedObservable.clear();
      }
      /**
       * Will start a new iteration of this timer. Only one instance of this timer can run at a time.
       *
       * @param timeToEnd how much time to measure until timer ended
       */
      start(timeToEnd = this._timeToEnd) {
        if (this._state === TimerState.STARTED) {
          throw new Error("Timer already started. Please stop it before starting again");
        }
        this._timeToEnd = timeToEnd;
        this._startTime = Date.now();
        this._timer = 0;
        this._observer = this._contextObservable.add(this._tick, this._observableParameters.mask, this._observableParameters.insertFirst, this._observableParameters.scope);
        this._setState(TimerState.STARTED);
      }
      /**
       * Will force a stop on the next tick.
       */
      stop() {
        if (this._state !== TimerState.STARTED) {
          return;
        }
        this._breakOnNextTick = true;
      }
      /**
       * Dispose this timer, clearing all resources
       */
      dispose() {
        if (this._observer) {
          this._contextObservable.remove(this._observer);
        }
        this.clearObservables();
      }
      _setState(newState) {
        this._state = newState;
        this.onStateChangedObservable.notifyObservers(this._state);
      }
      _stop(data, aborted = false) {
        this._contextObservable.remove(this._observer);
        this._setState(TimerState.ENDED);
        if (aborted) {
          this.onTimerAbortedObservable.notifyObservers(data);
        } else {
          this.onTimerEndedObservable.notifyObservers(data);
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/XR/features/WebXRControllerTeleportation.js
var WebXRMotionControllerTeleportation;
var init_WebXRControllerTeleportation = __esm({
  "node_modules/@babylonjs/core/XR/features/WebXRControllerTeleportation.js"() {
    init_webXRFeaturesManager();
    init_observable();
    init_webXRControllerComponent();
    init_math_vector();
    init_ray();
    init_dynamicTexture();
    init_cylinderBuilder();
    init_easing();
    init_animation();
    init_math_axis();
    init_standardMaterial();
    init_groundBuilder();
    init_torusBuilder();
    init_math_path();
    init_linesBuilder();
    init_WebXRAbstractFeature();
    init_math_color();
    init_utilityLayerRenderer();
    init_pointerEvents();
    init_timer();
    WebXRMotionControllerTeleportation = class extends WebXRAbstractFeature {
      /**
       * Is rotation enabled when moving forward?
       * Disabling this feature will prevent the user from deciding the direction when teleporting
       */
      get rotationEnabled() {
        return this._rotationEnabled;
      }
      /**
       * Sets whether rotation is enabled or not
       * @param enabled is rotation enabled when teleportation is shown
       */
      set rotationEnabled(enabled) {
        this._rotationEnabled = enabled;
        if (this._options.teleportationTargetMesh) {
          const children = this._options.teleportationTargetMesh.getChildMeshes(false, (node) => node.name === "rotationCone");
          if (children[0]) {
            children[0].setEnabled(enabled);
          }
        }
      }
      /**
       * Exposes the currently set teleportation target mesh.
       */
      get teleportationTargetMesh() {
        return this._options.teleportationTargetMesh || null;
      }
      /**
       * constructs a new teleportation system
       * @param _xrSessionManager an instance of WebXRSessionManager
       * @param _options configuration object for this feature
       */
      constructor(_xrSessionManager, _options) {
        super(_xrSessionManager);
        this._options = _options;
        this._controllers = {};
        this._snappedToPoint = false;
        this._cachedColor4White = new Color4(1, 1, 1, 1);
        this._tmpRay = new Ray(new Vector3(), new Vector3());
        this._tmpVector = new Vector3();
        this._tmpQuaternion = new Quaternion();
        this._worldScaleObserver = null;
        this.skipNextTeleportation = false;
        this.backwardsMovementEnabled = true;
        this.backwardsTeleportationDistance = 0.7;
        this.parabolicCheckRadius = 5;
        this.parabolicRayEnabled = true;
        this.straightRayEnabled = true;
        this.rotationAngle = Math.PI / 8;
        this.onTargetMeshPositionUpdatedObservable = new Observable();
        this.teleportationEnabled = true;
        this._rotationEnabled = true;
        this.onBeforeCameraTeleportRotation = new Observable();
        this.onAfterCameraTeleportRotation = new Observable();
        this._attachController = (xrController) => {
          if (this._controllers[xrController.uniqueId] || this._options.forceHandedness && xrController.inputSource.handedness !== this._options.forceHandedness) {
            return;
          }
          this._controllers[xrController.uniqueId] = {
            xrController,
            teleportationState: {
              forward: false,
              backwards: false,
              rotating: false,
              currentRotation: 0,
              baseRotation: 0,
              blocked: false,
              initialHit: false,
              mainComponentUsed: false
            }
          };
          const controllerData = this._controllers[xrController.uniqueId];
          if (controllerData.xrController.inputSource.targetRayMode === "tracked-pointer" && controllerData.xrController.inputSource.gamepad) {
            const initMotionController = () => {
              if (xrController.motionController) {
                const movementController = xrController.motionController.getComponentOfType(WebXRControllerComponent.THUMBSTICK_TYPE) || xrController.motionController.getComponentOfType(WebXRControllerComponent.TOUCHPAD_TYPE);
                if (!movementController || this._options.useMainComponentOnly) {
                  const mainComponent = xrController.motionController.getMainComponent();
                  if (!mainComponent) {
                    return;
                  }
                  controllerData.teleportationState.mainComponentUsed = true;
                  controllerData.teleportationComponent = mainComponent;
                  controllerData.onButtonChangedObserver = mainComponent.onButtonStateChangedObservable.add(() => {
                    if (!this.teleportationEnabled) {
                      return;
                    }
                    const teleportLocal = () => {
                      controllerData.teleportationState.forward = true;
                      controllerData.teleportationState.initialHit = false;
                      this._currentTeleportationControllerId = controllerData.xrController.uniqueId;
                      controllerData.teleportationState.baseRotation = this._options.xrInput.xrCamera.rotationQuaternion.toEulerAngles().y;
                      controllerData.teleportationState.currentRotation = 0;
                      const timeToSelect = this._options.timeToTeleport || 3e3;
                      setAndStartTimer({
                        timeout: timeToSelect,
                        contextObservable: this._xrSessionManager.onXRFrameObservable,
                        breakCondition: () => !mainComponent.pressed,
                        onEnded: () => {
                          if (this._currentTeleportationControllerId === controllerData.xrController.uniqueId && controllerData.teleportationState.forward) {
                            this._teleportForward(xrController.uniqueId);
                          }
                        }
                      });
                    };
                    if (mainComponent.changes.pressed) {
                      if (mainComponent.changes.pressed.current) {
                        if (this._options.timeToTeleportStart) {
                          setAndStartTimer({
                            timeout: this._options.timeToTeleportStart,
                            contextObservable: this._xrSessionManager.onXRFrameObservable,
                            onEnded: () => {
                              if (mainComponent.pressed) {
                                teleportLocal();
                              }
                            }
                          });
                        } else {
                          teleportLocal();
                        }
                      } else {
                        controllerData.teleportationState.forward = false;
                        this._currentTeleportationControllerId = "";
                      }
                    }
                  });
                } else {
                  controllerData.teleportationComponent = movementController;
                  controllerData.onAxisChangedObserver = movementController.onAxisValueChangedObservable.add((axesData) => {
                    if (axesData.y <= 0.7 && controllerData.teleportationState.backwards) {
                      controllerData.teleportationState.backwards = false;
                    }
                    if (axesData.y > 0.7 && !controllerData.teleportationState.forward && this.backwardsMovementEnabled && !this.snapPointsOnly) {
                      if (!controllerData.teleportationState.backwards) {
                        controllerData.teleportationState.backwards = true;
                        this._tmpQuaternion.copyFrom(this._options.xrInput.xrCamera.rotationQuaternion);
                        this._tmpQuaternion.toEulerAnglesToRef(this._tmpVector);
                        this._tmpVector.x = 0;
                        this._tmpVector.z = 0;
                        Quaternion.FromEulerVectorToRef(this._tmpVector, this._tmpQuaternion);
                        this._tmpVector.set(0, 0, this.backwardsTeleportationDistance * (this._xrSessionManager.scene.useRightHandedSystem ? 1 : -1));
                        this._tmpVector.rotateByQuaternionToRef(this._tmpQuaternion, this._tmpVector);
                        this._tmpVector.addInPlace(this._options.xrInput.xrCamera.position);
                        this._tmpRay.origin.copyFrom(this._tmpVector);
                        this._tmpRay.length = this._options.xrInput.xrCamera.realWorldHeight + 0.1;
                        this._tmpRay.direction.set(0, -1, 0);
                        const pick = this._xrSessionManager.scene.pickWithRay(this._tmpRay, (o) => {
                          return this._floorMeshes.indexOf(o) !== -1;
                        });
                        if (pick && pick.pickedPoint) {
                          this._options.xrInput.xrCamera.position.x = pick.pickedPoint.x;
                          this._options.xrInput.xrCamera.position.z = pick.pickedPoint.z;
                        }
                      }
                    }
                    if (axesData.y < -0.7 && !this._currentTeleportationControllerId && !controllerData.teleportationState.rotating && this.teleportationEnabled) {
                      controllerData.teleportationState.forward = true;
                      this._currentTeleportationControllerId = controllerData.xrController.uniqueId;
                      controllerData.teleportationState.baseRotation = this._options.xrInput.xrCamera.rotationQuaternion.toEulerAngles().y;
                    }
                    if (axesData.x) {
                      if (!controllerData.teleportationState.forward) {
                        if (!controllerData.teleportationState.rotating && Math.abs(axesData.x) > 0.7) {
                          controllerData.teleportationState.rotating = true;
                          const rotation = this.rotationAngle * (axesData.x > 0 ? 1 : -1) * (this._xrSessionManager.scene.useRightHandedSystem ? -1 : 1);
                          this.onBeforeCameraTeleportRotation.notifyObservers(rotation);
                          Quaternion.FromEulerAngles(0, rotation, 0).multiplyToRef(this._options.xrInput.xrCamera.rotationQuaternion, this._options.xrInput.xrCamera.rotationQuaternion);
                          this.onAfterCameraTeleportRotation.notifyObservers(this._options.xrInput.xrCamera.rotationQuaternion);
                        }
                      } else {
                        if (this._currentTeleportationControllerId === controllerData.xrController.uniqueId) {
                          if (this.rotationEnabled) {
                            setTimeout(() => {
                              controllerData.teleportationState.currentRotation = Math.atan2(axesData.x, axesData.y * (this._xrSessionManager.scene.useRightHandedSystem ? 1 : -1));
                            });
                          } else {
                            controllerData.teleportationState.currentRotation = 0;
                          }
                        }
                      }
                    } else {
                      controllerData.teleportationState.rotating = false;
                    }
                    if (axesData.x === 0 && axesData.y === 0) {
                      if (controllerData.teleportationState.blocked) {
                        controllerData.teleportationState.blocked = false;
                        this._setTargetMeshVisibility(false);
                      }
                      if (controllerData.teleportationState.forward) {
                        this._teleportForward(xrController.uniqueId);
                      }
                    }
                  });
                }
              }
            };
            if (xrController.motionController) {
              initMotionController();
            } else {
              xrController.onMotionControllerInitObservable.addOnce(() => {
                initMotionController();
              });
            }
          } else {
            controllerData.teleportationState.mainComponentUsed = true;
            let breakObserver = false;
            const teleportLocal = () => {
              this._currentTeleportationControllerId = controllerData.xrController.uniqueId;
              controllerData.teleportationState.forward = true;
              controllerData.teleportationState.initialHit = false;
              controllerData.teleportationState.baseRotation = this._options.xrInput.xrCamera.rotationQuaternion.toEulerAngles().y;
              controllerData.teleportationState.currentRotation = 0;
              const timeToSelect = this._options.timeToTeleport || 3e3;
              setAndStartTimer({
                timeout: timeToSelect,
                contextObservable: this._xrSessionManager.onXRFrameObservable,
                onEnded: () => {
                  if (this._currentTeleportationControllerId === controllerData.xrController.uniqueId && controllerData.teleportationState.forward) {
                    this._teleportForward(xrController.uniqueId);
                  }
                }
              });
            };
            this._xrSessionManager.scene.onPointerObservable.add((pointerInfo) => {
              if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
                breakObserver = false;
                if (this._options.timeToTeleportStart) {
                  setAndStartTimer({
                    timeout: this._options.timeToTeleportStart,
                    contextObservable: this._xrSessionManager.onXRFrameObservable,
                    onEnded: () => {
                      if (this._currentTeleportationControllerId === controllerData.xrController.uniqueId) {
                        teleportLocal();
                      }
                    },
                    breakCondition: () => {
                      if (breakObserver) {
                        breakObserver = false;
                        return true;
                      }
                      return false;
                    }
                  });
                } else {
                  teleportLocal();
                }
              } else if (pointerInfo.type === PointerEventTypes.POINTERUP) {
                breakObserver = true;
                controllerData.teleportationState.forward = false;
                this._currentTeleportationControllerId = "";
              }
            });
          }
        };
        this._colorArray = Array(24).fill(this._cachedColor4White);
        if (!this._options.teleportationTargetMesh) {
          this._createDefaultTargetMesh();
        }
        this._floorMeshes = this._options.floorMeshes || [];
        this._snapToPositions = this._options.snapPositions || [];
        this._blockedRayColor = this._options.blockedRayColor || new Color4(1, 0, 0, 0.75);
        this._setTargetMeshVisibility(false);
        this.onBeforeCameraTeleport = _options.xrInput.xrCamera.onBeforeCameraTeleport;
        this.onAfterCameraTeleport = _options.xrInput.xrCamera.onAfterCameraTeleport;
        this.parabolicCheckRadius *= this._xrSessionManager.worldScalingFactor;
        this._worldScaleObserver = _xrSessionManager.onWorldScaleFactorChangedObservable.add((values) => {
          var _a;
          this.parabolicCheckRadius = this.parabolicCheckRadius / values.previousScaleFactor * values.newScaleFactor;
          (_a = this._options.teleportationTargetMesh) == null ? void 0 : _a.scaling.scaleInPlace(values.newScaleFactor / values.previousScaleFactor);
        });
      }
      /**
       * Get the snapPointsOnly flag
       */
      get snapPointsOnly() {
        return !!this._options.snapPointsOnly;
      }
      /**
       * Sets the snapPointsOnly flag
       * @param snapToPoints should teleportation be exclusively to snap points
       */
      set snapPointsOnly(snapToPoints) {
        this._options.snapPointsOnly = snapToPoints;
      }
      /**
       * Add a new mesh to the floor meshes array
       * @param mesh the mesh to use as floor mesh
       */
      addFloorMesh(mesh) {
        this._floorMeshes.push(mesh);
      }
      /**
       * Add a mesh to the list of meshes blocking the teleportation ray
       * @param mesh The mesh to add to the teleportation-blocking meshes
       */
      addBlockerMesh(mesh) {
        this._options.pickBlockerMeshes = this._options.pickBlockerMeshes || [];
        this._options.pickBlockerMeshes.push(mesh);
      }
      /**
       * Add a new snap-to point to fix teleportation to this position
       * @param newSnapPoint The new Snap-To point
       */
      addSnapPoint(newSnapPoint) {
        this._snapToPositions.push(newSnapPoint);
      }
      attach() {
        if (!super.attach()) {
          return false;
        }
        this._currentTeleportationControllerId = "";
        this._options.xrInput.controllers.forEach(this._attachController);
        this._addNewAttachObserver(this._options.xrInput.onControllerAddedObservable, this._attachController);
        this._addNewAttachObserver(this._options.xrInput.onControllerRemovedObservable, (controller) => {
          this._detachController(controller.uniqueId);
        });
        return true;
      }
      detach() {
        if (!super.detach()) {
          return false;
        }
        Object.keys(this._controllers).forEach((controllerId) => {
          this._detachController(controllerId);
        });
        this._setTargetMeshVisibility(false);
        this._currentTeleportationControllerId = "";
        this._controllers = {};
        return true;
      }
      dispose() {
        super.dispose();
        this._options.teleportationTargetMesh && this._options.teleportationTargetMesh.dispose(false, true);
        if (this._worldScaleObserver) {
          this._xrSessionManager.onWorldScaleFactorChangedObservable.remove(this._worldScaleObserver);
        }
      }
      /**
       * Remove a mesh from the floor meshes array
       * @param mesh the mesh to remove
       */
      removeFloorMesh(mesh) {
        const index = this._floorMeshes.indexOf(mesh);
        if (index !== -1) {
          this._floorMeshes.splice(index, 1);
        }
      }
      /**
       * Remove a mesh from the blocker meshes array
       * @param mesh the mesh to remove
       */
      removeBlockerMesh(mesh) {
        this._options.pickBlockerMeshes = this._options.pickBlockerMeshes || [];
        const index = this._options.pickBlockerMeshes.indexOf(mesh);
        if (index !== -1) {
          this._options.pickBlockerMeshes.splice(index, 1);
        }
      }
      /**
       * Remove a mesh from the floor meshes array using its name
       * @param name the mesh name to remove
       */
      removeFloorMeshByName(name66) {
        const mesh = this._xrSessionManager.scene.getMeshByName(name66);
        if (mesh) {
          this.removeFloorMesh(mesh);
        }
      }
      /**
       * This function will iterate through the array, searching for this point or equal to it. It will then remove it from the snap-to array
       * @param snapPointToRemove the point (or a clone of it) to be removed from the array
       * @returns was the point found and removed or not
       */
      removeSnapPoint(snapPointToRemove) {
        let index = this._snapToPositions.indexOf(snapPointToRemove);
        if (index === -1) {
          for (let i = 0; i < this._snapToPositions.length; ++i) {
            if (this._snapToPositions[i].equals(snapPointToRemove)) {
              index = i;
              break;
            }
          }
        }
        if (index !== -1) {
          this._snapToPositions.splice(index, 1);
          return true;
        }
        return false;
      }
      /**
       * This function sets a selection feature that will be disabled when
       * the forward ray is shown and will be reattached when hidden.
       * This is used to remove the selection rays when moving.
       * @param selectionFeature the feature to disable when forward movement is enabled
       */
      setSelectionFeature(selectionFeature) {
        this._selectionFeature = selectionFeature;
      }
      _onXRFrame(_xrFrame) {
        const frame = this._xrSessionManager.currentFrame;
        const scene = this._xrSessionManager.scene;
        if (!this.attach || !frame) {
          return;
        }
        const targetMesh = this._options.teleportationTargetMesh;
        if (this._currentTeleportationControllerId) {
          if (!targetMesh) {
            return;
          }
          targetMesh.rotationQuaternion = targetMesh.rotationQuaternion || new Quaternion();
          const controllerData = this._controllers[this._currentTeleportationControllerId];
          if (controllerData && controllerData.teleportationState.forward) {
            Quaternion.RotationYawPitchRollToRef(controllerData.teleportationState.currentRotation + controllerData.teleportationState.baseRotation, 0, 0, targetMesh.rotationQuaternion);
            let hitPossible = false;
            const controlSelectionFeature = controllerData.xrController.inputSource.targetRayMode !== "transient-pointer";
            controllerData.xrController.getWorldPointerRayToRef(this._tmpRay);
            if (this.straightRayEnabled) {
              const pick = scene.pickWithRay(this._tmpRay, (o) => {
                if (this._options.blockerMeshesPredicate && this._options.blockerMeshesPredicate(o)) {
                  return true;
                }
                if (this._options.blockAllPickableMeshes && o.isPickable) {
                  return true;
                }
                if (this._options.pickBlockerMeshes && this._options.pickBlockerMeshes.indexOf(o) !== -1) {
                  return true;
                }
                const index = this._floorMeshes.indexOf(o);
                if (index === -1) {
                  return false;
                }
                return this._floorMeshes[index].absolutePosition.y < this._options.xrInput.xrCamera.globalPosition.y;
              });
              const floorMeshPicked = pick && pick.pickedMesh && this._floorMeshes.indexOf(pick.pickedMesh) !== -1;
              if (pick && pick.pickedMesh && !floorMeshPicked) {
                if (controllerData.teleportationState.mainComponentUsed && !controllerData.teleportationState.initialHit) {
                  controllerData.teleportationState.forward = false;
                  return;
                }
                controllerData.teleportationState.blocked = true;
                this._setTargetMeshVisibility(false, false, controlSelectionFeature);
                this._showParabolicPath(pick);
                return;
              } else if (pick && pick.pickedPoint) {
                controllerData.teleportationState.initialHit = true;
                controllerData.teleportationState.blocked = false;
                hitPossible = true;
                this._setTargetMeshPosition(pick);
                this._setTargetMeshVisibility(true, false, controlSelectionFeature);
                this._showParabolicPath(pick);
              }
            }
            if (this.parabolicRayEnabled && !hitPossible) {
              const xRotation = controllerData.xrController.pointer.rotationQuaternion.toEulerAngles().x;
              const compensation = 1 + (Math.PI / 2 - Math.abs(xRotation));
              const radius = this.parabolicCheckRadius * compensation;
              this._tmpRay.origin.addToRef(this._tmpRay.direction.scale(radius * 2), this._tmpVector);
              this._tmpVector.y = this._tmpRay.origin.y;
              this._tmpRay.origin.addInPlace(this._tmpRay.direction.scale(radius));
              this._tmpVector.subtractToRef(this._tmpRay.origin, this._tmpRay.direction);
              this._tmpRay.direction.normalize();
              const pick = scene.pickWithRay(this._tmpRay, (o) => {
                if (this._options.blockerMeshesPredicate && this._options.blockerMeshesPredicate(o)) {
                  return true;
                }
                if (this._options.blockAllPickableMeshes && o.isPickable) {
                  return true;
                }
                if (this._options.pickBlockerMeshes && this._options.pickBlockerMeshes.indexOf(o) !== -1) {
                  return true;
                }
                return this._floorMeshes.indexOf(o) !== -1;
              });
              const floorMeshPicked = pick && pick.pickedMesh && this._floorMeshes.indexOf(pick.pickedMesh) !== -1;
              if (pick && pick.pickedMesh && !floorMeshPicked) {
                if (controllerData.teleportationState.mainComponentUsed && !controllerData.teleportationState.initialHit) {
                  controllerData.teleportationState.forward = false;
                  return;
                }
                controllerData.teleportationState.blocked = true;
                this._setTargetMeshVisibility(false, false, controlSelectionFeature);
                this._showParabolicPath(pick);
                return;
              } else if (pick && pick.pickedPoint) {
                controllerData.teleportationState.initialHit = true;
                controllerData.teleportationState.blocked = false;
                hitPossible = true;
                this._setTargetMeshPosition(pick);
                this._setTargetMeshVisibility(true, false, controlSelectionFeature);
                this._showParabolicPath(pick);
              }
            }
            this._setTargetMeshVisibility(hitPossible, false, controlSelectionFeature);
          } else {
            this._setTargetMeshVisibility(false, false, true);
          }
        } else {
          this._disposeBezierCurve();
          this._setTargetMeshVisibility(false, false, true);
        }
      }
      _createDefaultTargetMesh() {
        this._options.defaultTargetMeshOptions = this._options.defaultTargetMeshOptions || {};
        const sceneToRenderTo = this._options.useUtilityLayer ? this._options.customUtilityLayerScene || UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene : this._xrSessionManager.scene;
        const teleportationTarget = CreateGround("teleportationTarget", { width: 2, height: 2, subdivisions: 2 }, sceneToRenderTo);
        teleportationTarget.isPickable = false;
        if (this._options.defaultTargetMeshOptions.teleportationCircleMaterial) {
          teleportationTarget.material = this._options.defaultTargetMeshOptions.teleportationCircleMaterial;
        } else {
          const length = 512;
          const dynamicTexture = new DynamicTexture("teleportationPlaneDynamicTexture", length, sceneToRenderTo, true);
          dynamicTexture.hasAlpha = true;
          const context = dynamicTexture.getContext();
          const centerX = length / 2;
          const centerY = length / 2;
          const radius = 200;
          context.beginPath();
          context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
          context.fillStyle = this._options.defaultTargetMeshOptions.teleportationFillColor || "#444444";
          context.fill();
          context.lineWidth = 10;
          context.strokeStyle = this._options.defaultTargetMeshOptions.teleportationBorderColor || "#FFFFFF";
          context.stroke();
          context.closePath();
          dynamicTexture.update();
          const teleportationCircleMaterial = new StandardMaterial("teleportationPlaneMaterial", sceneToRenderTo);
          teleportationCircleMaterial.diffuseTexture = dynamicTexture;
          teleportationTarget.material = teleportationCircleMaterial;
        }
        const torus = CreateTorus("torusTeleportation", {
          diameter: 0.75,
          thickness: 0.1,
          tessellation: 20
        }, sceneToRenderTo);
        torus.isPickable = false;
        torus.parent = teleportationTarget;
        if (!this._options.defaultTargetMeshOptions.disableAnimation) {
          const animationInnerCircle = new Animation("animationInnerCircle", "position.y", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
          const keys = [];
          keys.push({
            frame: 0,
            value: 0
          });
          keys.push({
            frame: 30,
            value: 0.4
          });
          keys.push({
            frame: 60,
            value: 0
          });
          animationInnerCircle.setKeys(keys);
          const easingFunction = new SineEase();
          easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
          animationInnerCircle.setEasingFunction(easingFunction);
          torus.animations = [];
          torus.animations.push(animationInnerCircle);
          sceneToRenderTo.beginAnimation(torus, 0, 60, true);
        }
        const cone = CreateCylinder("rotationCone", { diameterTop: 0, tessellation: 4 }, sceneToRenderTo);
        cone.isPickable = false;
        cone.scaling.set(0.5, 0.12, 0.2);
        cone.rotate(Axis.X, Math.PI / 2);
        cone.position.z = 0.6;
        cone.parent = torus;
        if (this._options.defaultTargetMeshOptions.torusArrowMaterial) {
          torus.material = this._options.defaultTargetMeshOptions.torusArrowMaterial;
          cone.material = this._options.defaultTargetMeshOptions.torusArrowMaterial;
        } else {
          const torusConeMaterial = new StandardMaterial("torusConsMat", sceneToRenderTo);
          torusConeMaterial.disableLighting = !!this._options.defaultTargetMeshOptions.disableLighting;
          if (torusConeMaterial.disableLighting) {
            torusConeMaterial.emissiveColor = new Color3(0.3, 0.3, 1);
          } else {
            torusConeMaterial.diffuseColor = new Color3(0.3, 0.3, 1);
          }
          torusConeMaterial.alpha = 0.9;
          torus.material = torusConeMaterial;
          cone.material = torusConeMaterial;
          this._teleportationRingMaterial = torusConeMaterial;
        }
        if (this._options.renderingGroupId !== void 0) {
          teleportationTarget.renderingGroupId = this._options.renderingGroupId;
          torus.renderingGroupId = this._options.renderingGroupId;
          cone.renderingGroupId = this._options.renderingGroupId;
        }
        this._options.teleportationTargetMesh = teleportationTarget;
        this._options.teleportationTargetMesh.scaling.setAll(this._xrSessionManager.worldScalingFactor);
        this._setTargetMeshVisibility(false);
      }
      _detachController(xrControllerUniqueId) {
        const controllerData = this._controllers[xrControllerUniqueId];
        if (!controllerData) {
          return;
        }
        if (controllerData.teleportationComponent) {
          if (controllerData.onAxisChangedObserver) {
            controllerData.teleportationComponent.onAxisValueChangedObservable.remove(controllerData.onAxisChangedObserver);
          }
          if (controllerData.onButtonChangedObserver) {
            controllerData.teleportationComponent.onButtonStateChangedObservable.remove(controllerData.onButtonChangedObserver);
          }
        }
        delete this._controllers[xrControllerUniqueId];
      }
      _findClosestSnapPointWithRadius(realPosition, radius = this._options.snapToPositionRadius || 0.8) {
        let closestPoint = null;
        let closestDistance = Number.MAX_VALUE;
        if (this._snapToPositions.length) {
          const radiusSquared = radius * radius;
          this._snapToPositions.forEach((position) => {
            const dist = Vector3.DistanceSquared(position, realPosition);
            if (dist <= radiusSquared && dist < closestDistance) {
              closestDistance = dist;
              closestPoint = position;
            }
          });
        }
        return closestPoint;
      }
      _setTargetMeshPosition(pickInfo) {
        const newPosition = pickInfo.pickedPoint;
        if (!this._options.teleportationTargetMesh || !newPosition) {
          return;
        }
        const snapPosition = this._findClosestSnapPointWithRadius(newPosition);
        this._snappedToPoint = !!snapPosition;
        if (this.snapPointsOnly && !this._snappedToPoint && this._teleportationRingMaterial) {
          this._teleportationRingMaterial.diffuseColor.set(1, 0.3, 0.3);
        } else if (this.snapPointsOnly && this._snappedToPoint && this._teleportationRingMaterial) {
          this._teleportationRingMaterial.diffuseColor.set(0.3, 0.3, 1);
        }
        this._options.teleportationTargetMesh.position.copyFrom(snapPosition || newPosition);
        this._options.teleportationTargetMesh.position.y += 0.01;
        this.onTargetMeshPositionUpdatedObservable.notifyObservers(pickInfo);
      }
      _setTargetMeshVisibility(visible, force, controlSelectionFeature) {
        if (!this._options.teleportationTargetMesh) {
          return;
        }
        if (this._options.teleportationTargetMesh.isVisible === visible && !force) {
          return;
        }
        this._options.teleportationTargetMesh.isVisible = visible;
        this._options.teleportationTargetMesh.getChildren(void 0, false).forEach((m) => {
          m.isVisible = visible;
        });
        if (!visible) {
          if (this._quadraticBezierCurve) {
            this._quadraticBezierCurve.dispose();
            this._quadraticBezierCurve = null;
          }
          if (this._selectionFeature && controlSelectionFeature) {
            this._selectionFeature.attach();
          }
        } else {
          if (this._selectionFeature && controlSelectionFeature) {
            this._selectionFeature.detach();
          }
        }
      }
      _disposeBezierCurve() {
        if (this._quadraticBezierCurve) {
          this._quadraticBezierCurve.dispose();
          this._quadraticBezierCurve = null;
        }
      }
      _showParabolicPath(pickInfo) {
        if (!pickInfo.pickedPoint || !this._currentTeleportationControllerId) {
          return;
        }
        const sceneToRenderTo = this._options.useUtilityLayer ? this._options.customUtilityLayerScene || UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene : this._xrSessionManager.scene;
        const controllerData = this._controllers[this._currentTeleportationControllerId];
        const quadraticBezierVectors = Curve3.CreateQuadraticBezier(controllerData.xrController.pointer.absolutePosition, pickInfo.ray.origin, pickInfo.pickedPoint, 25);
        const color = controllerData.teleportationState.blocked ? this._blockedRayColor : void 0;
        const colorsArray = this._colorArray.fill(color || this._cachedColor4White);
        const points = quadraticBezierVectors.getPoints();
        points.shift();
        points.shift();
        if (!this._options.generateRayPathMesh) {
          this._quadraticBezierCurve = CreateLines("teleportation path line", { points, instance: this._quadraticBezierCurve, updatable: true, colors: colorsArray }, sceneToRenderTo);
        } else {
          this._quadraticBezierCurve = this._options.generateRayPathMesh(quadraticBezierVectors.getPoints(), pickInfo);
        }
        this._quadraticBezierCurve.isPickable = false;
        if (this._options.renderingGroupId !== void 0) {
          this._quadraticBezierCurve.renderingGroupId = this._options.renderingGroupId;
        }
      }
      _teleportForward(controllerId) {
        const controllerData = this._controllers[controllerId];
        if (!controllerData || !controllerData.teleportationState.forward || !this.teleportationEnabled) {
          return;
        }
        controllerData.teleportationState.forward = false;
        this._currentTeleportationControllerId = "";
        if (this.snapPointsOnly && !this._snappedToPoint) {
          return;
        }
        if (this.skipNextTeleportation) {
          this.skipNextTeleportation = false;
          return;
        }
        if (this._options.teleportationTargetMesh && this._options.teleportationTargetMesh.isVisible) {
          const height = this._options.xrInput.xrCamera.realWorldHeight;
          this.onBeforeCameraTeleport.notifyObservers(this._options.xrInput.xrCamera.position);
          this._options.xrInput.xrCamera.position.copyFrom(this._options.teleportationTargetMesh.position);
          this._options.xrInput.xrCamera.position.y += height;
          Quaternion.FromEulerAngles(0, controllerData.teleportationState.currentRotation - (this._xrSessionManager.scene.useRightHandedSystem ? Math.PI : 0), 0).multiplyToRef(this._options.xrInput.xrCamera.rotationQuaternion, this._options.xrInput.xrCamera.rotationQuaternion);
          this.onAfterCameraTeleport.notifyObservers(this._options.xrInput.xrCamera.position);
        }
      }
    };
    WebXRMotionControllerTeleportation.Name = WebXRFeatureName.TELEPORTATION;
    WebXRMotionControllerTeleportation.Version = 1;
    WebXRFeaturesManager.AddWebXRFeature(WebXRMotionControllerTeleportation.Name, (xrSessionManager, options) => {
      return () => new WebXRMotionControllerTeleportation(xrSessionManager, options);
    }, WebXRMotionControllerTeleportation.Version, true);
  }
});

// node_modules/@babylonjs/core/XR/webXRDefaultExperience.js
var WebXRDefaultExperienceOptions, WebXRDefaultExperience;
var init_webXRDefaultExperience = __esm({
  "node_modules/@babylonjs/core/XR/webXRDefaultExperience.js"() {
    init_webXRExperienceHelper();
    init_webXRInput();
    init_WebXRControllerPointerSelection();
    init_WebXRNearInteraction();
    init_webXREnterExitUI();
    init_WebXRHandTracking();
    init_WebXRControllerTeleportation();
    init_logger();
    WebXRDefaultExperienceOptions = class {
    };
    WebXRDefaultExperience = class _WebXRDefaultExperience {
      constructor() {
      }
      /**
       * Creates the default xr experience
       * @param scene scene
       * @param options options for basic configuration
       * @returns resulting WebXRDefaultExperience
       */
      static CreateAsync(scene, options = {}) {
        const result = new _WebXRDefaultExperience();
        scene.onDisposeObservable.addOnce(() => {
          result.dispose();
        });
        if (!options.disableDefaultUI) {
          const uiOptions = {
            renderTarget: result.renderTarget,
            ...options.uiOptions || {}
          };
          if (options.optionalFeatures) {
            if (typeof options.optionalFeatures === "boolean") {
              uiOptions.optionalFeatures = ["hit-test", "anchors", "plane-detection", "hand-tracking"];
            } else {
              uiOptions.optionalFeatures = options.optionalFeatures;
            }
          }
          result.enterExitUI = new WebXREnterExitUI(scene, uiOptions);
        }
        return WebXRExperienceHelper.CreateAsync(scene).then((xrHelper) => {
          result.baseExperience = xrHelper;
          if (options.ignoreNativeCameraTransformation) {
            result.baseExperience.camera.compensateOnFirstFrame = false;
          }
          result.input = new WebXRInput(xrHelper.sessionManager, xrHelper.camera, {
            controllerOptions: {
              renderingGroupId: options.renderingGroupId
            },
            ...options.inputOptions || {}
          });
          if (!options.disablePointerSelection) {
            const pointerSelectionOptions = {
              ...options.pointerSelectionOptions,
              xrInput: result.input,
              renderingGroupId: options.renderingGroupId
            };
            result.pointerSelection = result.baseExperience.featuresManager.enableFeature(WebXRControllerPointerSelection.Name, options.useStablePlugins ? "stable" : "latest", pointerSelectionOptions);
            if (!options.disableTeleportation) {
              result.teleportation = result.baseExperience.featuresManager.enableFeature(WebXRMotionControllerTeleportation.Name, options.useStablePlugins ? "stable" : "latest", {
                floorMeshes: options.floorMeshes,
                xrInput: result.input,
                renderingGroupId: options.renderingGroupId,
                ...options.teleportationOptions
              });
              result.teleportation.setSelectionFeature(result.pointerSelection);
            }
          }
          if (!options.disableNearInteraction) {
            result.nearInteraction = result.baseExperience.featuresManager.enableFeature(WebXRNearInteraction.Name, options.useStablePlugins ? "stable" : "latest", {
              xrInput: result.input,
              farInteractionFeature: result.pointerSelection,
              renderingGroupId: options.renderingGroupId,
              useUtilityLayer: true,
              enableNearInteractionOnAllControllers: true,
              ...options.nearInteractionOptions
            });
          }
          if (!options.disableHandTracking) {
            result.baseExperience.featuresManager.enableFeature(WebXRHandTracking.Name, options.useStablePlugins ? "stable" : "latest", {
              xrInput: result.input,
              ...options.handSupportOptions
            }, void 0, false);
          }
          result.renderTarget = result.baseExperience.sessionManager.getWebXRRenderTarget(options.outputCanvasOptions);
          if (!options.disableDefaultUI) {
            return result.enterExitUI.setHelperAsync(result.baseExperience, result.renderTarget);
          } else {
            return;
          }
        }).then(() => {
          return result;
        }).catch((error) => {
          Logger.Error("Error initializing XR");
          Logger.Error(error);
          return result;
        });
      }
      /**
       * Disposes of the experience helper
       */
      dispose() {
        if (this.baseExperience) {
          this.baseExperience.dispose();
        }
        if (this.input) {
          this.input.dispose();
        }
        if (this.enterExitUI) {
          this.enterExitUI.dispose();
        }
        if (this.renderTarget) {
          this.renderTarget.dispose();
        }
      }
    };
  }
});

export {
  WebXRLayerWrapper,
  init_webXRLayerWrapper,
  MultiviewRenderTarget,
  init_MultiviewRenderTarget,
  WebXRLayerRenderTargetTextureProvider,
  init_webXRRenderTargetTextureProvider,
  WebXRWebGLLayerWrapper,
  init_webXRWebGLLayer,
  WebXRManagedOutputCanvasOptions,
  WebXRManagedOutputCanvas,
  init_webXRManagedOutputCanvas,
  NativeXRLayerWrapper,
  NativeXRLayerRenderTargetTextureProvider,
  NativeXRRenderTarget,
  init_nativeXRRenderTarget,
  WebXRSessionManager,
  init_webXRSessionManager,
  TargetCamera,
  init_targetCamera,
  CameraInputTypes,
  CameraInputsManager,
  init_cameraInputsManager,
  FreeCameraKeyboardMoveInput,
  init_freeCameraKeyboardMoveInput,
  FreeCameraMouseInput,
  init_freeCameraMouseInput,
  BaseCameraMouseWheelInput,
  init_BaseCameraMouseWheelInput,
  FreeCameraMouseWheelInput,
  init_freeCameraMouseWheelInput,
  FreeCameraTouchInput,
  init_freeCameraTouchInput,
  FreeCameraInputsManager,
  init_freeCameraInputsManager,
  FreeCamera,
  init_freeCamera,
  WebXRState,
  WebXRTrackingState,
  init_webXRTypes,
  WebXRCamera,
  init_webXRCamera,
  TouchCamera,
  init_touchCamera,
  StickValues,
  Gamepad,
  GenericPad,
  init_gamepad,
  Xbox360Button,
  Xbox360Dpad,
  Xbox360Pad,
  init_xboxGamepad,
  DualShockButton,
  DualShockDpad,
  DualShockPad,
  init_dualShockGamepad,
  GamepadManager,
  init_gamepadManager,
  FreeCameraGamepadInput,
  init_freeCameraGamepadInput,
  BaseCameraPointersInput,
  init_BaseCameraPointersInput,
  ArcRotateCameraPointersInput,
  init_arcRotateCameraPointersInput,
  ArcRotateCameraKeyboardMoveInput,
  init_arcRotateCameraKeyboardMoveInput,
  ArcRotateCameraMouseWheelInput,
  init_arcRotateCameraMouseWheelInput,
  ArcRotateCameraInputsManager,
  init_arcRotateCameraInputsManager,
  ArcRotateCameraGamepadInput,
  init_arcRotateCameraGamepadInput,
  GamepadSystemSceneComponent,
  init_gamepadSceneComponent,
  UniversalCamera,
  init_universalCamera,
  WebXRExperienceHelper,
  init_webXRExperienceHelper,
  WebXRControllerComponent,
  init_webXRControllerComponent,
  WebXRAbstractMotionController,
  init_webXRAbstractMotionController,
  WebXRGenericTriggerMotionController,
  init_webXRGenericMotionController,
  CreateSphereVertexData,
  CreateSphere,
  SphereBuilder,
  init_sphereBuilder,
  PrePassConfiguration,
  init_prePassConfiguration,
  MaterialFlags,
  init_materialFlags,
  init_decalFragmentDeclaration,
  init_sceneUboDeclaration,
  init_meshUboDeclaration,
  init_prePassDeclaration,
  init_oitDeclaration,
  init_mainUVVaryingDeclaration,
  init_helperFunctions,
  init_lightFragmentDeclaration,
  init_lightUboDeclaration,
  init_lightsFragmentFunctions,
  init_shadowsFragmentFunctions,
  init_samplerFragmentDeclaration,
  init_fresnelFunction,
  init_reflectionFunction,
  init_imageProcessingDeclaration,
  init_imageProcessingFunctions,
  init_bumpFragmentMainFunctions,
  init_bumpFragmentFunctions,
  init_clipPlaneFragmentDeclaration,
  init_logDepthDeclaration,
  init_fogFragmentDeclaration,
  init_clipPlaneFragment,
  init_bumpFragment,
  init_decalFragment,
  init_depthPrePass,
  init_lightFragment,
  init_logDepthFragment,
  init_fogFragment,
  init_oitFragment,
  init_decalVertexDeclaration,
  init_uvAttributeDeclaration,
  init_bonesDeclaration,
  init_bakedVertexAnimationDeclaration,
  init_instancesDeclaration,
  init_prePassVertexDeclaration,
  init_samplerVertexDeclaration,
  init_bumpVertexDeclaration,
  init_clipPlaneVertexDeclaration,
  init_fogVertexDeclaration,
  init_lightVxFragmentDeclaration,
  init_lightVxUboDeclaration,
  init_morphTargetsVertexGlobalDeclaration,
  init_morphTargetsVertexDeclaration,
  init_morphTargetsVertexGlobal,
  init_morphTargetsVertex,
  init_instancesVertex,
  init_bonesVertex,
  init_bakedVertexAnimation,
  init_prePassVertex,
  init_uvVariableDeclaration,
  init_samplerVertexImplementation,
  init_bumpVertex,
  init_clipPlaneVertex,
  init_fogVertex,
  init_shadowsVertex,
  init_vertexColorMixing,
  init_pointCloudVertex,
  init_logDepthVertex,
  MaterialPluginManager,
  RegisterMaterialPlugin,
  UnregisterMaterialPlugin,
  UnregisterAllMaterialPlugins,
  init_materialPluginManager,
  MaterialPluginBase,
  init_materialPluginBase,
  MaterialDetailMapDefines,
  DetailMapConfiguration,
  init_material_detailMapConfiguration,
  StandardMaterialDefines,
  StandardMaterial,
  init_standardMaterial,
  WebXRProfiledMotionController,
  init_webXRProfiledMotionController,
  WebXRMotionControllerManager,
  init_webXRMotionControllerManager,
  WebXRInputSource,
  init_webXRInputSource,
  WebXRInput,
  init_webXRInput,
  CreateCylinderVertexData,
  CreateCylinder,
  CylinderBuilder,
  init_cylinderBuilder,
  CreateTorusVertexData,
  CreateTorus,
  TorusBuilder,
  init_torusBuilder,
  Ray,
  init_ray,
  Light,
  init_light,
  HemisphericLight,
  init_hemisphericLight,
  UtilityLayerRenderer,
  init_utilityLayerRenderer,
  WebXRControllerPointerSelection,
  init_WebXRControllerPointerSelection,
  AnimationKeyInterpolation,
  init_animationKey,
  AnimationRange,
  init_animationRange,
  _staticOffsetValueQuaternion,
  _staticOffsetValueVector3,
  _staticOffsetValueVector2,
  _staticOffsetValueSize,
  _staticOffsetValueColor3,
  _staticOffsetValueColor4,
  Animation,
  init_animation,
  EasingFunction,
  CircleEase,
  BackEase,
  BounceEase,
  CubicEase,
  ElasticEase,
  ExponentialEase,
  PowerEase,
  QuadraticEase,
  QuarticEase,
  QuinticEase,
  SineEase,
  BezierCurveEase,
  init_easing,
  init_subMesh_project,
  WebXRNearControllerMode,
  WebXRNearInteraction,
  init_WebXRNearInteraction,
  WebXREnterExitUIButton,
  WebXREnterExitUIOptions,
  WebXREnterExitUI,
  init_webXREnterExitUI,
  init_engine_dynamicTexture,
  DynamicTexture,
  init_dynamicTexture,
  GroundMesh,
  init_groundMesh,
  CreateGroundVertexData,
  CreateTiledGroundVertexData,
  CreateGroundFromHeightMapVertexData,
  CreateGround,
  CreateTiledGround,
  CreateGroundFromHeightMap,
  GroundBuilder,
  init_groundBuilder,
  InstancedMesh,
  init_instancedMesh,
  ShaderMaterial,
  init_shaderMaterial,
  init_color_fragment,
  init_color_vertex,
  LinesMesh,
  InstancedLinesMesh,
  init_linesMesh,
  CreateLineSystemVertexData,
  CreateDashedLinesVertexData,
  CreateLineSystem,
  CreateLines,
  CreateDashedLines,
  LinesBuilder,
  init_linesBuilder,
  TimerState,
  setAndStartTimer,
  AdvancedTimer,
  init_timer,
  WebXRMotionControllerTeleportation,
  init_WebXRControllerTeleportation,
  WebXRDefaultExperienceOptions,
  WebXRDefaultExperience,
  init_webXRDefaultExperience
};
//# sourceMappingURL=chunk-BGDPTJD2.js.map
