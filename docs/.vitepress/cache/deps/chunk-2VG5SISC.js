import {
  Animation,
  CreateGround,
  DynamicTexture,
  Ray,
  ShaderMaterial,
  StandardMaterial,
  UtilityLayerRenderer,
  init_animation,
  init_bakedVertexAnimation,
  init_bakedVertexAnimationDeclaration,
  init_bonesDeclaration,
  init_bonesVertex,
  init_clipPlaneFragment,
  init_clipPlaneFragmentDeclaration,
  init_clipPlaneVertex,
  init_clipPlaneVertexDeclaration,
  init_dynamicTexture,
  init_fogFragment,
  init_fogFragmentDeclaration,
  init_fogVertex,
  init_fogVertexDeclaration,
  init_groundBuilder,
  init_instancesDeclaration,
  init_instancesVertex,
  init_ray,
  init_shaderMaterial,
  init_standardMaterial,
  init_utilityLayerRenderer,
  init_vertexColorMixing
} from "./chunk-NXGNFVPM.js";
import {
  AbstractMesh,
  Axis,
  BezierCurve,
  BoundingSphere,
  Camera,
  CompatibilityOptions,
  Coordinate,
  Curve3,
  Material,
  Mesh,
  Node,
  NodeMaterial,
  RenderTargetTexture,
  SceneLoader,
  Space,
  SubMesh,
  TransformNode,
  VertexData,
  Viewport,
  WebXRAbstractFeature,
  WebXRHandTracking,
  _CreationDataStorage,
  init_WebXRAbstractFeature,
  init_WebXRHandTracking,
  init_abstractMesh,
  init_boundingSphere,
  init_camera,
  init_compatibilityOptions,
  init_material,
  init_math_axis,
  init_math_path,
  init_math_viewport,
  init_mesh,
  init_mesh_vertexData,
  init_node,
  init_nodeMaterial,
  init_renderTargetTexture,
  init_sceneLoader,
  init_subMesh,
  init_transformNode
} from "./chunk-MADDKXJQ.js";
import {
  Engine,
  init_engine
} from "./chunk-AD5M3D2V.js";
import {
  EventConstants,
  KeyboardEventTypes,
  PickingInfo,
  Plane,
  PointerEventTypes,
  Scene,
  SceneComponentConstants,
  SerializationHelper,
  VertexBuffer,
  __decorate,
  init_buffer,
  init_decorators,
  init_decorators_serialization,
  init_deviceInputEvents,
  init_keyboardEvents,
  init_math_plane,
  init_pickingInfo,
  init_pointerEvents,
  init_scene,
  init_sceneComponent,
  init_tslib_es6,
  serialize,
  serializeAsMeshReference,
  serializeAsVector3
} from "./chunk-A4OKAQEU.js";
import {
  Matrix,
  Quaternion,
  TmpVectors,
  Vector2,
  Vector3,
  Vector4,
  init_math_vector
} from "./chunk-MZH63JEL.js";
import {
  Color3,
  Color4,
  Scalar,
  init_math_color,
  init_math_scalar
} from "./chunk-KSTZC6MF.js";
import {
  Epsilon,
  init_math_constants
} from "./chunk-YK7R2M7K.js";
import {
  WebXRFeatureName,
  WebXRFeaturesManager,
  init_webXRFeaturesManager
} from "./chunk-BMKUQ6K3.js";
import {
  DeepCopier,
  Tools,
  init_deepCopier,
  init_tools
} from "./chunk-JVYIJCPB.js";
import {
  InternalTexture,
  InternalTextureSource,
  IsWindowObjectExist,
  Logger,
  ShaderStore,
  WebGLHardwareTexture,
  init_domManagement,
  init_internalTexture,
  init_logger,
  init_shaderStore,
  init_webGLHardwareTexture
} from "./chunk-GEMGH3AZ.js";
import {
  Observable,
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
    Node.AddNodeConstructor("TargetCamera", (name3, scene) => {
      return () => new TargetCamera(name3, Vector3.Zero(), scene);
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
      constructor(name3, position, scene, setActiveOnSceneIfNoneActive = true) {
        super(name3, position, scene, setActiveOnSceneIfNoneActive);
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
      createRigCamera(name3, cameraIndex) {
        if (this.cameraRigMode !== Camera.RIG_MODE_NONE) {
          const rigCamera = new _TargetCamera(name3, this.position.clone(), this.getScene());
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
      constructor(name3, position, scene, setActiveOnSceneIfNoneActive = true) {
        super(name3, position, scene, setActiveOnSceneIfNoneActive);
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
      constructor(name3, scene, _xrSessionManager) {
        super(name3, Vector3.Zero(), scene);
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
    Node.AddNodeConstructor("TouchCamera", (name3, scene) => {
      return () => new TouchCamera(name3, Vector3.Zero(), scene);
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
      constructor(name3, position, scene) {
        super(name3, position, scene);
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
        this.onGamepadConnectedObservable = new Observable((observer) => {
          for (const i in this._babylonGamepads) {
            const gamepad = this._babylonGamepads[i];
            if (gamepad && gamepad._isConnected) {
              this.onGamepadConnectedObservable.notifyObserver(observer, gamepad);
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
    Node.AddNodeConstructor("FreeCamera", (name3, scene) => {
      return () => new UniversalCamera(name3, Vector3.Zero(), scene);
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
      constructor(name3, position, scene) {
        super(name3, position, scene);
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
    Camera._CreateDefaultParsedCamera = (name3, scene) => {
      return new UniversalCamera(name3, Vector3.Zero(), scene);
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
      _getChildByName(node, name3) {
        return node.getChildren((n) => n.name === name3, false)[0];
      }
      // Look through only immediate children. This will return null if no mesh exists with the given name.
      _getImmediateChildByName(node, name3) {
        return node.getChildren((n) => n.name == name3, true)[0];
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
function CreateSphere(name3, options = {}, scene = null) {
  const sphere = new Mesh(name3, scene);
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
    Mesh.CreateSphere = (name3, segments, diameter, scene, updatable, sideOrientation) => {
      const options = {
        segments,
        diameterX: diameter,
        diameterY: diameter,
        diameterZ: diameter,
        sideOrientation,
        updatable
      };
      return CreateSphere(name3, options, scene);
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
function CreateCylinder(name3, options = {}, scene) {
  const cylinder = new Mesh(name3, scene);
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
    Mesh.CreateCylinder = (name3, height, diameterTop, diameterBottom, tessellation, subdivisions, scene, updatable, sideOrientation) => {
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
      return CreateCylinder(name3, options, scene);
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
function CreateTorus(name3, options = {}, scene) {
  const torus = new Mesh(name3, scene);
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
    Mesh.CreateTorus = (name3, diameter, thickness, tessellation, scene, updatable, sideOrientation) => {
      const options = {
        diameter,
        thickness,
        tessellation,
        sideOrientation,
        updatable
      };
      return CreateTorus(name3, options, scene);
    };
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
    Mesh._instancedMeshFactory = (name3, mesh) => {
      const instance = new InstancedMesh(name3, mesh);
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
      constructor(name3, source) {
        super(name3, source.getScene());
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
      createInstance(name3) {
        return this._sourceMesh.createInstance(name3);
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
      clone(name3, newParent = null, doNotCloneChildren, newSourceMesh) {
        const result = (newSourceMesh || this._sourceMesh).createInstance(name3);
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

// node_modules/@babylonjs/core/Shaders/color.fragment.js
var name, shader;
var init_color_fragment = __esm({
  "node_modules/@babylonjs/core/Shaders/color.fragment.js"() {
    init_shaderStore();
    init_clipPlaneFragmentDeclaration();
    init_fogFragmentDeclaration();
    init_clipPlaneFragment();
    init_fogFragment();
    name = "colorPixelShader";
    shader = `#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
    ShaderStore.ShadersStore[name] = shader;
  }
});

// node_modules/@babylonjs/core/Shaders/color.vertex.js
var name2, shader2;
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
    name2 = "colorVertexShader";
    shader2 = `attribute vec3 position;
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
    ShaderStore.ShadersStore[name2] = shader2;
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
      _isShaderMaterial(shader3) {
        return shader3.getClassName() === "ShaderMaterial";
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
      constructor(name3, scene = null, parent = null, source = null, doNotCloneChildren, useVertexColor, useVertexAlpha, material) {
        super(name3, scene, parent, source, doNotCloneChildren);
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
      clone(name3, newParent = null, doNotCloneChildren) {
        return new _LinesMesh(name3, this.getScene(), newParent, this, doNotCloneChildren);
      }
      /**
       * Creates a new InstancedLinesMesh object from the mesh model.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
       * @param name defines the name of the new instance
       * @returns a new InstancedLinesMesh
       */
      createInstance(name3) {
        const instance = new InstancedLinesMesh(name3, this);
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
      constructor(name3, source) {
        super(name3, source);
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
function CreateLineSystem(name3, options, scene = null) {
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
  const lineSystem = new LinesMesh(name3, scene, null, void 0, void 0, useVertexColor, options.useVertexAlpha, options.material);
  const vertexData = CreateLineSystemVertexData(options);
  vertexData.applyToMesh(lineSystem, options.updatable);
  return lineSystem;
}
function CreateLines(name3, options, scene = null) {
  const colors = options.colors ? [options.colors] : null;
  const lines = CreateLineSystem(name3, { lines: [options.points], updatable: options.updatable, instance: options.instance, colors, useVertexAlpha: options.useVertexAlpha, material: options.material }, scene);
  return lines;
}
function CreateDashedLines(name3, options, scene = null) {
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
  const dashedLines = new LinesMesh(name3, scene, null, void 0, void 0, void 0, options.useVertexAlpha, options.material);
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
    Mesh.CreateLines = (name3, points, scene = null, updatable = false, instance = null) => {
      const options = {
        points,
        updatable,
        instance
      };
      return CreateLines(name3, options, scene);
    };
    Mesh.CreateDashedLines = (name3, points, dashSize, gapSize, dashNb, scene = null, updatable, instance) => {
      const options = {
        points,
        dashSize,
        gapSize,
        dashNb,
        updatable,
        instance
      };
      return CreateDashedLines(name3, options, scene);
    };
  }
});

// node_modules/@babylonjs/core/Misc/timer.js
function setAndStartTimer(options) {
  let timer = 0;
  const startTime = Date.now();
  options.observableParameters = options.observableParameters ?? {};
  const observer = options.contextObservable.add((payload) => {
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
      options.contextObservable.remove(observer);
      options.onAborted && options.onAborted(data);
    }
    if (timer >= options.timeout) {
      options.contextObservable.remove(observer);
      options.onEnded && options.onEnded(data);
    }
  }, options.observableParameters.mask, options.observableParameters.insertFirst, options.observableParameters.scope);
  return observer;
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
      removeFloorMeshByName(name3) {
        const mesh = this._xrSessionManager.scene.getMeshByName(name3);
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
  WebXRControllerPointerSelection,
  init_WebXRControllerPointerSelection,
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
  InstancedMesh,
  init_instancedMesh,
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
//# sourceMappingURL=chunk-2VG5SISC.js.map
