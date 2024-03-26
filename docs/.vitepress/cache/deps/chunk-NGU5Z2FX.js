import {
  CreateSphere,
  Light,
  Ray,
  ShaderMaterial,
  WebXRAbstractMotionController,
  WebXRControllerComponent,
  WebXRLayerRenderTargetTextureProvider,
  WebXRLayerWrapper,
  WebXRMotionControllerManager,
  WebXRWebGLLayerWrapper
} from "./chunk-UGQY6IHA.js";
import {
  Axis,
  BaseTexture,
  DumpTools,
  EffectRenderer,
  EffectWrapper,
  Mesh,
  Node,
  PhysicsImpostor,
  PostProcess,
  RenderTargetTexture,
  RenderTargetWrapper,
  SceneLoader,
  Texture,
  WebXRAbstractFeature
} from "./chunk-OI2LY7WF.js";
import {
  LightConstants,
  Scene,
  SerializationHelper,
  VertexBuffer,
  __decorate,
  serialize,
  serializeAsVector3
} from "./chunk-S7F4SLFM.js";
import {
  Matrix,
  Quaternion,
  TmpVectors,
  Vector2,
  Vector3
} from "./chunk-JJMLEYST.js";
import {
  WebXRFeatureName,
  WebXRFeaturesManager
} from "./chunk-QCQ52DSJ.js";
import {
  ErrorCodes,
  RuntimeError,
  Tools
} from "./chunk-NZYIJQX6.js";
import {
  Engine
} from "./chunk-WUNB6MKX.js";
import {
  DataBuffer,
  InternalTexture,
  InternalTextureSource,
  Logger,
  ShaderStore,
  ThinEngine,
  WebGL2ShaderProcessor,
  WebGLHardwareTexture
} from "./chunk-D5SXP72C.js";
import {
  EngineStore,
  Observable
} from "./chunk-A7RTI335.js";
import {
  Color3,
  Color4
} from "./chunk-G2L5SAWV.js";
import {
  Scalar,
  ToLinearSpace
} from "./chunk-RFWLA2MF.js";
import {
  RegisterClass
} from "./chunk-AJT353ZC.js";

// node_modules/@babylonjs/core/XR/features/WebXRHitTestLegacy.js
var WebXRHitTestLegacy = class _WebXRHitTestLegacy extends WebXRAbstractFeature {
  /**
   * Creates a new instance of the (legacy version) hit test feature
   * @param _xrSessionManager an instance of WebXRSessionManager
   * @param options options to use when constructing this feature
   */
  constructor(_xrSessionManager, options = {}) {
    super(_xrSessionManager);
    this.options = options;
    this._direction = new Vector3(0, 0, -1);
    this._mat = new Matrix();
    this._onSelectEnabled = false;
    this._origin = new Vector3(0, 0, 0);
    this.lastNativeXRHitResults = [];
    this.onHitTestResultObservable = new Observable();
    this._onHitTestResults = (xrResults) => {
      const mats = xrResults.map((result) => {
        const mat = Matrix.FromArray(result.hitMatrix);
        if (!this._xrSessionManager.scene.useRightHandedSystem) {
          mat.toggleModelMatrixHandInPlace();
        }
        if (this.options.worldParentNode) {
          mat.multiplyToRef(this.options.worldParentNode.getWorldMatrix(), mat);
        }
        return {
          xrHitResult: result,
          transformationMatrix: mat
        };
      });
      this.lastNativeXRHitResults = xrResults;
      this.onHitTestResultObservable.notifyObservers(mats);
    };
    this._onSelect = (event) => {
      if (!this._onSelectEnabled) {
        return;
      }
      _WebXRHitTestLegacy.XRHitTestWithSelectEvent(event, this._xrSessionManager.referenceSpace);
    };
    this.xrNativeFeatureName = "hit-test";
    Tools.Warn("A newer version of this plugin is available");
  }
  /**
   * execute a hit test with an XR Ray
   *
   * @param xrSession a native xrSession that will execute this hit test
   * @param xrRay the ray (position and direction) to use for ray-casting
   * @param referenceSpace native XR reference space to use for the hit-test
   * @param filter filter function that will filter the results
   * @returns a promise that resolves with an array of native XR hit result in xr coordinates system
   */
  static XRHitTestWithRay(xrSession, xrRay, referenceSpace, filter) {
    return xrSession.requestHitTest(xrRay, referenceSpace).then((results) => {
      const filterFunction = filter || ((result) => !!result.hitMatrix);
      return results.filter(filterFunction);
    });
  }
  /**
   * Execute a hit test on the current running session using a select event returned from a transient input (such as touch)
   * @param event the (select) event to use to select with
   * @param referenceSpace the reference space to use for this hit test
   * @returns a promise that resolves with an array of native XR hit result in xr coordinates system
   */
  static XRHitTestWithSelectEvent(event, referenceSpace) {
    const targetRayPose = event.frame.getPose(event.inputSource.targetRaySpace, referenceSpace);
    if (!targetRayPose) {
      return Promise.resolve([]);
    }
    const targetRay = new XRRay(targetRayPose.transform);
    return this.XRHitTestWithRay(event.frame.session, targetRay, referenceSpace);
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
    if (this.options.testOnPointerDownOnly) {
      this._xrSessionManager.session.addEventListener("select", this._onSelect, false);
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
    this._onSelectEnabled = false;
    this._xrSessionManager.session.removeEventListener("select", this._onSelect);
    return true;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this.onHitTestResultObservable.clear();
  }
  _onXRFrame(frame) {
    if (!this.attached || this.options.testOnPointerDownOnly) {
      return;
    }
    const pose = frame.getViewerPose(this._xrSessionManager.referenceSpace);
    if (!pose) {
      return;
    }
    Matrix.FromArrayToRef(pose.transform.matrix, 0, this._mat);
    Vector3.TransformCoordinatesFromFloatsToRef(0, 0, 0, this._mat, this._origin);
    Vector3.TransformCoordinatesFromFloatsToRef(0, 0, -1, this._mat, this._direction);
    this._direction.subtractInPlace(this._origin);
    this._direction.normalize();
    const ray = new XRRay({ x: this._origin.x, y: this._origin.y, z: this._origin.z, w: 0 }, { x: this._direction.x, y: this._direction.y, z: this._direction.z, w: 0 });
    _WebXRHitTestLegacy.XRHitTestWithRay(this._xrSessionManager.session, ray, this._xrSessionManager.referenceSpace).then(this._onHitTestResults);
  }
};
WebXRHitTestLegacy.Name = WebXRFeatureName.HIT_TEST;
WebXRHitTestLegacy.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRHitTestLegacy.Name, (xrSessionManager, options) => {
  return () => new WebXRHitTestLegacy(xrSessionManager, options);
}, WebXRHitTestLegacy.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXRAnchorSystem.js
var anchorIdProvider = 0;
var WebXRAnchorSystem = class extends WebXRAbstractFeature {
  /**
   * Set the reference space to use for anchor creation, when not using a hit test.
   * Will default to the session's reference space if not defined
   */
  set referenceSpaceForFrameAnchors(referenceSpace) {
    this._referenceSpaceForFrameAnchors = referenceSpace;
  }
  /**
   * constructs a new anchor system
   * @param _xrSessionManager an instance of WebXRSessionManager
   * @param _options configuration object for this feature
   */
  constructor(_xrSessionManager, _options = {}) {
    super(_xrSessionManager);
    this._options = _options;
    this._lastFrameDetected = /* @__PURE__ */ new Set();
    this._trackedAnchors = [];
    this._futureAnchors = [];
    this.onAnchorAddedObservable = new Observable();
    this.onAnchorRemovedObservable = new Observable();
    this.onAnchorUpdatedObservable = new Observable();
    this._tmpVector = new Vector3();
    this._tmpQuaternion = new Quaternion();
    this.xrNativeFeatureName = "anchors";
  }
  _populateTmpTransformation(position, rotationQuaternion) {
    this._tmpVector.copyFrom(position);
    this._tmpQuaternion.copyFrom(rotationQuaternion);
    if (!this._xrSessionManager.scene.useRightHandedSystem) {
      this._tmpVector.z *= -1;
      this._tmpQuaternion.z *= -1;
      this._tmpQuaternion.w *= -1;
    }
    return {
      position: this._tmpVector,
      rotationQuaternion: this._tmpQuaternion
    };
  }
  /**
   * Create a new anchor point using a hit test result at a specific point in the scene
   * An anchor is tracked only after it is added to the trackerAnchors in xrFrame. The promise returned here does not yet guaranty that.
   * Use onAnchorAddedObservable to get newly added anchors if you require tracking guaranty.
   *
   * @param hitTestResult The hit test result to use for this anchor creation
   * @param position an optional position offset for this anchor
   * @param rotationQuaternion an optional rotation offset for this anchor
   * @returns A promise that fulfills when babylon has created the corresponding WebXRAnchor object and tracking has begun
   */
  async addAnchorPointUsingHitTestResultAsync(hitTestResult, position = new Vector3(), rotationQuaternion = new Quaternion()) {
    this._populateTmpTransformation(position, rotationQuaternion);
    const m = new XRRigidTransform({ x: this._tmpVector.x, y: this._tmpVector.y, z: this._tmpVector.z }, { x: this._tmpQuaternion.x, y: this._tmpQuaternion.y, z: this._tmpQuaternion.z, w: this._tmpQuaternion.w });
    if (!hitTestResult.xrHitResult.createAnchor) {
      this.detach();
      throw new Error("Anchors not enabled in this environment/browser");
    } else {
      try {
        const nativeAnchor = await hitTestResult.xrHitResult.createAnchor(m);
        return new Promise((resolve, reject) => {
          this._futureAnchors.push({
            nativeAnchor,
            resolved: false,
            submitted: true,
            xrTransformation: m,
            resolve,
            reject
          });
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
  /**
   * Add a new anchor at a specific position and rotation
   * This function will add a new anchor per default in the next available frame. Unless forced, the createAnchor function
   * will be called in the next xrFrame loop to make sure that the anchor can be created correctly.
   * An anchor is tracked only after it is added to the trackerAnchors in xrFrame. The promise returned here does not yet guaranty that.
   * Use onAnchorAddedObservable to get newly added anchors if you require tracking guaranty.
   *
   * @param position the position in which to add an anchor
   * @param rotationQuaternion an optional rotation for the anchor transformation
   * @param forceCreateInCurrentFrame force the creation of this anchor in the current frame. Must be called inside xrFrame loop!
   * @returns A promise that fulfills when babylon has created the corresponding WebXRAnchor object and tracking has begun
   */
  async addAnchorAtPositionAndRotationAsync(position, rotationQuaternion = new Quaternion(), forceCreateInCurrentFrame = false) {
    this._populateTmpTransformation(position, rotationQuaternion);
    const xrTransformation = new XRRigidTransform({ x: this._tmpVector.x, y: this._tmpVector.y, z: this._tmpVector.z }, { x: this._tmpQuaternion.x, y: this._tmpQuaternion.y, z: this._tmpQuaternion.z, w: this._tmpQuaternion.w });
    const xrAnchor = forceCreateInCurrentFrame && this.attached && this._xrSessionManager.currentFrame ? await this._createAnchorAtTransformation(xrTransformation, this._xrSessionManager.currentFrame) : void 0;
    return new Promise((resolve, reject) => {
      this._futureAnchors.push({
        nativeAnchor: xrAnchor,
        resolved: false,
        submitted: false,
        xrTransformation,
        resolve,
        reject
      });
    });
  }
  /**
   * Get the list of anchors currently being tracked by the system
   */
  get anchors() {
    return this._trackedAnchors;
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
    if (!this._options.doNotRemoveAnchorsOnSessionEnded) {
      while (this._trackedAnchors.length) {
        const toRemove = this._trackedAnchors.pop();
        if (toRemove) {
          try {
            toRemove.remove();
          } catch (e) {
          }
          this.onAnchorRemovedObservable.notifyObservers(toRemove);
        }
      }
    }
    return true;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    this._futureAnchors.length = 0;
    super.dispose();
    this.onAnchorAddedObservable.clear();
    this.onAnchorRemovedObservable.clear();
    this.onAnchorUpdatedObservable.clear();
  }
  _onXRFrame(frame) {
    if (!this.attached || !frame) {
      return;
    }
    const trackedAnchors = frame.trackedAnchors;
    if (trackedAnchors) {
      const toRemove = this._trackedAnchors.filter((anchor) => !trackedAnchors.has(anchor.xrAnchor)).map((anchor) => {
        const index = this._trackedAnchors.indexOf(anchor);
        return index;
      });
      let idxTracker = 0;
      toRemove.forEach((index) => {
        const anchor = this._trackedAnchors.splice(index - idxTracker, 1)[0];
        this.onAnchorRemovedObservable.notifyObservers(anchor);
        idxTracker++;
      });
      trackedAnchors.forEach((xrAnchor) => {
        if (!this._lastFrameDetected.has(xrAnchor)) {
          const newAnchor = {
            id: anchorIdProvider++,
            xrAnchor,
            remove: () => xrAnchor.delete()
          };
          const anchor = this._updateAnchorWithXRFrame(xrAnchor, newAnchor, frame);
          this._trackedAnchors.push(anchor);
          this.onAnchorAddedObservable.notifyObservers(anchor);
          const results = this._futureAnchors.filter((futureAnchor) => futureAnchor.nativeAnchor === xrAnchor);
          const result = results[0];
          if (result) {
            result.resolve(anchor);
            result.resolved = true;
          }
        } else {
          const index = this._findIndexInAnchorArray(xrAnchor);
          const anchor = this._trackedAnchors[index];
          try {
            this._updateAnchorWithXRFrame(xrAnchor, anchor, frame);
            if (anchor.attachedNode) {
              anchor.attachedNode.rotationQuaternion = anchor.attachedNode.rotationQuaternion || new Quaternion();
              anchor.transformationMatrix.decompose(anchor.attachedNode.scaling, anchor.attachedNode.rotationQuaternion, anchor.attachedNode.position);
            }
            this.onAnchorUpdatedObservable.notifyObservers(anchor);
          } catch (e) {
            Tools.Warn(`Anchor could not be updated`);
          }
        }
      });
      this._lastFrameDetected = trackedAnchors;
    }
    this._futureAnchors.forEach((futureAnchor) => {
      if (!futureAnchor.resolved && !futureAnchor.submitted) {
        this._createAnchorAtTransformation(futureAnchor.xrTransformation, frame).then((nativeAnchor) => {
          futureAnchor.nativeAnchor = nativeAnchor;
        }, (error) => {
          futureAnchor.resolved = true;
          futureAnchor.reject(error);
        });
        futureAnchor.submitted = true;
      }
    });
  }
  /**
   * avoiding using Array.find for global support.
   * @param xrAnchor the plane to find in the array
   * @returns the index of the anchor in the array or -1 if not found
   */
  _findIndexInAnchorArray(xrAnchor) {
    for (let i = 0; i < this._trackedAnchors.length; ++i) {
      if (this._trackedAnchors[i].xrAnchor === xrAnchor) {
        return i;
      }
    }
    return -1;
  }
  _updateAnchorWithXRFrame(xrAnchor, anchor, xrFrame) {
    const pose = xrFrame.getPose(xrAnchor.anchorSpace, this._xrSessionManager.referenceSpace);
    if (pose) {
      const mat = anchor.transformationMatrix || new Matrix();
      Matrix.FromArrayToRef(pose.transform.matrix, 0, mat);
      if (!this._xrSessionManager.scene.useRightHandedSystem) {
        mat.toggleModelMatrixHandInPlace();
      }
      anchor.transformationMatrix = mat;
      if (!this._options.worldParentNode) {
      } else {
        mat.multiplyToRef(this._options.worldParentNode.getWorldMatrix(), mat);
      }
    }
    return anchor;
  }
  async _createAnchorAtTransformation(xrTransformation, xrFrame) {
    if (xrFrame.createAnchor) {
      try {
        return xrFrame.createAnchor(xrTransformation, this._referenceSpaceForFrameAnchors ?? this._xrSessionManager.referenceSpace);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      this.detach();
      throw new Error("Anchors are not enabled in your browser");
    }
  }
};
WebXRAnchorSystem.Name = WebXRFeatureName.ANCHOR_SYSTEM;
WebXRAnchorSystem.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRAnchorSystem.Name, (xrSessionManager, options) => {
  return () => new WebXRAnchorSystem(xrSessionManager, options);
}, WebXRAnchorSystem.Version);

// node_modules/@babylonjs/core/XR/features/WebXRPlaneDetector.js
var planeIdProvider = 0;
var WebXRPlaneDetector = class extends WebXRAbstractFeature {
  /**
   * construct a new Plane Detector
   * @param _xrSessionManager an instance of xr Session manager
   * @param _options configuration to use when constructing this feature
   */
  constructor(_xrSessionManager, _options = {}) {
    super(_xrSessionManager);
    this._options = _options;
    this._detectedPlanes = [];
    this._enabled = false;
    this._lastFrameDetected = /* @__PURE__ */ new Set();
    this.onPlaneAddedObservable = new Observable();
    this.onPlaneRemovedObservable = new Observable();
    this.onPlaneUpdatedObservable = new Observable();
    this.xrNativeFeatureName = "plane-detection";
    if (this._xrSessionManager.session) {
      this._init();
    } else {
      this._xrSessionManager.onXRSessionInit.addOnce(() => {
        this._init();
      });
    }
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
    if (!this._options.doNotRemovePlanesOnSessionEnded) {
      while (this._detectedPlanes.length) {
        const toRemove = this._detectedPlanes.pop();
        if (toRemove) {
          this.onPlaneRemovedObservable.notifyObservers(toRemove);
        }
      }
    }
    return true;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this.onPlaneAddedObservable.clear();
    this.onPlaneRemovedObservable.clear();
    this.onPlaneUpdatedObservable.clear();
  }
  /**
   * Check if the needed objects are defined.
   * This does not mean that the feature is enabled, but that the objects needed are well defined.
   * @returns true if the initial compatibility test passed
   */
  isCompatible() {
    return typeof XRPlane !== "undefined";
  }
  /**
   * Enable room capture mode.
   * When enabled and supported by the system,
   * the detectedPlanes array will be populated with the detected room boundaries
   * @see https://immersive-web.github.io/real-world-geometry/plane-detection.html#dom-xrsession-initiateroomcapture
   * @returns true if plane detection is enabled and supported. Will reject if not supported.
   */
  async initiateRoomCapture() {
    if (this._xrSessionManager.session.initiateRoomCapture) {
      return this._xrSessionManager.session.initiateRoomCapture();
    }
    return Promise.reject("initiateRoomCapture is not supported on this session");
  }
  _onXRFrame(frame) {
    var _a;
    if (!this.attached || !this._enabled || !frame) {
      return;
    }
    const detectedPlanes = frame.detectedPlanes || ((_a = frame.worldInformation) == null ? void 0 : _a.detectedPlanes);
    if (detectedPlanes) {
      for (let planeIdx = 0; planeIdx < this._detectedPlanes.length; planeIdx++) {
        const plane = this._detectedPlanes[planeIdx];
        if (!detectedPlanes.has(plane.xrPlane)) {
          this._detectedPlanes.splice(planeIdx--, 1);
          this.onPlaneRemovedObservable.notifyObservers(plane);
        }
      }
      detectedPlanes.forEach((xrPlane) => {
        if (!this._lastFrameDetected.has(xrPlane)) {
          const newPlane = {
            id: planeIdProvider++,
            xrPlane,
            polygonDefinition: []
          };
          const plane = this._updatePlaneWithXRPlane(xrPlane, newPlane, frame);
          this._detectedPlanes.push(plane);
          this.onPlaneAddedObservable.notifyObservers(plane);
        } else {
          if (xrPlane.lastChangedTime === this._xrSessionManager.currentTimestamp) {
            const index = this._findIndexInPlaneArray(xrPlane);
            const plane = this._detectedPlanes[index];
            this._updatePlaneWithXRPlane(xrPlane, plane, frame);
            this.onPlaneUpdatedObservable.notifyObservers(plane);
          }
        }
      });
      this._lastFrameDetected = detectedPlanes;
    }
  }
  _init() {
    const internalInit = () => {
      this._enabled = true;
      if (this._detectedPlanes.length) {
        this._detectedPlanes.length = 0;
      }
    };
    if (!!this._xrSessionManager.isNative && !!this._options.preferredDetectorOptions && !!this._xrSessionManager.session.trySetPreferredPlaneDetectorOptions) {
      this._xrSessionManager.session.trySetPreferredPlaneDetectorOptions(this._options.preferredDetectorOptions);
    }
    if (!this._xrSessionManager.session.updateWorldTrackingState) {
      internalInit();
      return;
    }
    this._xrSessionManager.session.updateWorldTrackingState({ planeDetectionState: { enabled: true } });
    internalInit();
  }
  _updatePlaneWithXRPlane(xrPlane, plane, xrFrame) {
    plane.polygonDefinition = xrPlane.polygon.map((xrPoint) => {
      const rightHandedSystem = this._xrSessionManager.scene.useRightHandedSystem ? 1 : -1;
      return new Vector3(xrPoint.x, xrPoint.y, xrPoint.z * rightHandedSystem);
    });
    const pose = xrFrame.getPose(xrPlane.planeSpace, this._xrSessionManager.referenceSpace);
    if (pose) {
      const mat = plane.transformationMatrix || new Matrix();
      Matrix.FromArrayToRef(pose.transform.matrix, 0, mat);
      if (!this._xrSessionManager.scene.useRightHandedSystem) {
        mat.toggleModelMatrixHandInPlace();
      }
      plane.transformationMatrix = mat;
      if (this._options.worldParentNode) {
        mat.multiplyToRef(this._options.worldParentNode.getWorldMatrix(), mat);
      }
    }
    return plane;
  }
  /**
   * avoiding using Array.find for global support.
   * @param xrPlane the plane to find in the array
   * @returns the index of the plane in the array or -1 if not found
   */
  _findIndexInPlaneArray(xrPlane) {
    for (let i = 0; i < this._detectedPlanes.length; ++i) {
      if (this._detectedPlanes[i].xrPlane === xrPlane) {
        return i;
      }
    }
    return -1;
  }
};
WebXRPlaneDetector.Name = WebXRFeatureName.PLANE_DETECTION;
WebXRPlaneDetector.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRPlaneDetector.Name, (xrSessionManager, options) => {
  return () => new WebXRPlaneDetector(xrSessionManager, options);
}, WebXRPlaneDetector.Version);

// node_modules/@babylonjs/core/XR/features/WebXRBackgroundRemover.js
var WebXRBackgroundRemover = class extends WebXRAbstractFeature {
  /**
   * constructs a new background remover module
   * @param _xrSessionManager the session manager for this module
   * @param options read-only options to be used in this module
   */
  constructor(_xrSessionManager, options = {}) {
    super(_xrSessionManager);
    this.options = options;
    this.onBackgroundStateChangedObservable = new Observable();
  }
  /**
   * attach this feature
   * Will usually be called by the features manager
   *
   * @returns true if successful.
   */
  attach() {
    this._setBackgroundState(false);
    return super.attach();
  }
  /**
   * detach this feature.
   * Will usually be called by the features manager
   *
   * @returns true if successful.
   */
  detach() {
    this._setBackgroundState(true);
    return super.detach();
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this.onBackgroundStateChangedObservable.clear();
  }
  _onXRFrame(_xrFrame) {
  }
  _setBackgroundState(newState) {
    const scene = this._xrSessionManager.scene;
    if (!this.options.ignoreEnvironmentHelper) {
      if (this.options.environmentHelperRemovalFlags) {
        if (this.options.environmentHelperRemovalFlags.skyBox) {
          const backgroundSkybox = scene.getMeshByName("BackgroundSkybox");
          if (backgroundSkybox) {
            backgroundSkybox.setEnabled(newState);
          }
        }
        if (this.options.environmentHelperRemovalFlags.ground) {
          const backgroundPlane = scene.getMeshByName("BackgroundPlane");
          if (backgroundPlane) {
            backgroundPlane.setEnabled(newState);
          }
        }
      } else {
        const backgroundHelper = scene.getMeshByName("BackgroundHelper");
        if (backgroundHelper) {
          backgroundHelper.setEnabled(newState);
        }
      }
    }
    if (this.options.backgroundMeshes) {
      this.options.backgroundMeshes.forEach((mesh) => mesh.setEnabled(newState));
    }
    this.onBackgroundStateChangedObservable.notifyObservers(newState);
  }
};
WebXRBackgroundRemover.Name = WebXRFeatureName.BACKGROUND_REMOVER;
WebXRBackgroundRemover.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRBackgroundRemover.Name, (xrSessionManager, options) => {
  return () => new WebXRBackgroundRemover(xrSessionManager, options);
}, WebXRBackgroundRemover.Version, true);

// node_modules/@babylonjs/core/XR/features/WebXRControllerPhysics.js
var IWebXRControllerPhysicsOptions = class {
};
var WebXRControllerPhysics = class extends WebXRAbstractFeature {
  _createPhysicsImpostor(xrController) {
    const impostorType = this._options.physicsProperties.impostorType || PhysicsImpostor.SphereImpostor;
    const impostorSize = this._options.physicsProperties.impostorSize || 0.1;
    const impostorMesh = CreateSphere("impostor-mesh-" + xrController.uniqueId, {
      diameterX: typeof impostorSize === "number" ? impostorSize : impostorSize.width,
      diameterY: typeof impostorSize === "number" ? impostorSize : impostorSize.height,
      diameterZ: typeof impostorSize === "number" ? impostorSize : impostorSize.depth
    });
    impostorMesh.isVisible = this._debugMode;
    impostorMesh.isPickable = false;
    impostorMesh.rotationQuaternion = new Quaternion();
    const controllerMesh = xrController.grip || xrController.pointer;
    impostorMesh.position.copyFrom(controllerMesh.position);
    impostorMesh.rotationQuaternion.copyFrom(controllerMesh.rotationQuaternion);
    const impostor = new PhysicsImpostor(impostorMesh, impostorType, {
      mass: 0,
      ...this._options.physicsProperties
    });
    this._controllers[xrController.uniqueId] = {
      xrController,
      impostor,
      impostorMesh
    };
  }
  /**
   * Construct a new Controller Physics Feature
   * @param _xrSessionManager the corresponding xr session manager
   * @param _options options to create this feature with
   */
  constructor(_xrSessionManager, _options) {
    super(_xrSessionManager);
    this._options = _options;
    this._attachController = (xrController) => {
      if (this._controllers[xrController.uniqueId]) {
        return;
      }
      if (!this._xrSessionManager.scene.isPhysicsEnabled()) {
        Logger.Warn("physics engine not enabled, skipped. Please add this controller manually.");
      }
      if (this._options.physicsProperties.useControllerMesh && xrController.inputSource.gamepad) {
        xrController.onMotionControllerInitObservable.addOnce((motionController) => {
          if (!motionController._doNotLoadControllerMesh) {
            motionController.onModelLoadedObservable.addOnce(() => {
              const impostor = new PhysicsImpostor(motionController.rootMesh, PhysicsImpostor.MeshImpostor, {
                mass: 0,
                ...this._options.physicsProperties
              });
              const controllerMesh = xrController.grip || xrController.pointer;
              this._controllers[xrController.uniqueId] = {
                xrController,
                impostor,
                oldPos: controllerMesh.position.clone(),
                oldRotation: controllerMesh.rotationQuaternion.clone()
              };
            });
          } else {
            this._createPhysicsImpostor(xrController);
          }
        });
      } else {
        this._createPhysicsImpostor(xrController);
      }
    };
    this._controllers = {};
    this._debugMode = false;
    this._delta = 0;
    this._lastTimestamp = 0;
    this._tmpQuaternion = new Quaternion();
    this._tmpVector = new Vector3();
    if (!this._options.physicsProperties) {
      this._options.physicsProperties = {};
    }
  }
  /**
   * @internal
   * enable debugging - will show console outputs and the impostor mesh
   */
  _enablePhysicsDebug() {
    this._debugMode = true;
    Object.keys(this._controllers).forEach((controllerId) => {
      const controllerData = this._controllers[controllerId];
      if (controllerData.impostorMesh) {
        controllerData.impostorMesh.isVisible = true;
      }
    });
  }
  /**
   * Manually add a controller (if no xrInput was provided or physics engine was not enabled)
   * @param xrController the controller to add
   */
  addController(xrController) {
    this._attachController(xrController);
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
    if (!this._options.xrInput) {
      return true;
    }
    this._options.xrInput.controllers.forEach(this._attachController);
    this._addNewAttachObserver(this._options.xrInput.onControllerAddedObservable, this._attachController);
    this._addNewAttachObserver(this._options.xrInput.onControllerRemovedObservable, (controller) => {
      this._detachController(controller.uniqueId);
    });
    if (this._options.enableHeadsetImpostor) {
      const params = this._options.headsetImpostorParams || {
        impostorType: PhysicsImpostor.SphereImpostor,
        restitution: 0.8,
        impostorSize: 0.3
      };
      const impostorSize = params.impostorSize || 0.3;
      this._headsetMesh = CreateSphere("headset-mesh", {
        diameterX: typeof impostorSize === "number" ? impostorSize : impostorSize.width,
        diameterY: typeof impostorSize === "number" ? impostorSize : impostorSize.height,
        diameterZ: typeof impostorSize === "number" ? impostorSize : impostorSize.depth
      });
      this._headsetMesh.rotationQuaternion = new Quaternion();
      this._headsetMesh.isVisible = false;
      this._headsetImpostor = new PhysicsImpostor(this._headsetMesh, params.impostorType, { mass: 0, ...params });
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
    if (this._headsetMesh) {
      this._headsetMesh.dispose();
    }
    return true;
  }
  /**
   * Get the headset impostor, if enabled
   * @returns the impostor
   */
  getHeadsetImpostor() {
    return this._headsetImpostor;
  }
  /**
   * Get the physics impostor of a specific controller.
   * The impostor is not attached to a mesh because a mesh for each controller is not obligatory
   * @param controller the controller or the controller id of which to get the impostor
   * @returns the impostor or null
   */
  getImpostorForController(controller) {
    const id = typeof controller === "string" ? controller : controller.uniqueId;
    if (this._controllers[id]) {
      return this._controllers[id].impostor;
    } else {
      return null;
    }
  }
  /**
   * Update the physics properties provided in the constructor
   * @param newProperties the new properties object
   * @param newProperties.impostorType
   * @param newProperties.impostorSize
   * @param newProperties.friction
   * @param newProperties.restitution
   */
  setPhysicsProperties(newProperties) {
    this._options.physicsProperties = {
      ...this._options.physicsProperties,
      ...newProperties
    };
  }
  _onXRFrame(_xrFrame) {
    var _a, _b;
    this._delta = this._xrSessionManager.currentTimestamp - this._lastTimestamp;
    this._lastTimestamp = this._xrSessionManager.currentTimestamp;
    if (this._headsetMesh && this._headsetImpostor) {
      this._headsetMesh.position.copyFrom(this._options.xrInput.xrCamera.globalPosition);
      this._headsetMesh.rotationQuaternion.copyFrom(this._options.xrInput.xrCamera.absoluteRotation);
      if ((_a = this._options.xrInput.xrCamera._lastXRViewerPose) == null ? void 0 : _a.linearVelocity) {
        const lv = this._options.xrInput.xrCamera._lastXRViewerPose.linearVelocity;
        this._tmpVector.set(lv.x, lv.y, lv.z);
        this._headsetImpostor.setLinearVelocity(this._tmpVector);
      }
      if ((_b = this._options.xrInput.xrCamera._lastXRViewerPose) == null ? void 0 : _b.angularVelocity) {
        const av = this._options.xrInput.xrCamera._lastXRViewerPose.angularVelocity;
        this._tmpVector.set(av.x, av.y, av.z);
        this._headsetImpostor.setAngularVelocity(this._tmpVector);
      }
    }
    Object.keys(this._controllers).forEach((controllerId) => {
      var _a2, _b2;
      const controllerData = this._controllers[controllerId];
      const controllerMesh = controllerData.xrController.grip || controllerData.xrController.pointer;
      const comparedPosition = controllerData.oldPos || controllerData.impostorMesh.position;
      if ((_a2 = controllerData.xrController._lastXRPose) == null ? void 0 : _a2.linearVelocity) {
        const lv = controllerData.xrController._lastXRPose.linearVelocity;
        this._tmpVector.set(lv.x, lv.y, lv.z);
        controllerData.impostor.setLinearVelocity(this._tmpVector);
      } else {
        controllerMesh.position.subtractToRef(comparedPosition, this._tmpVector);
        this._tmpVector.scaleInPlace(1e3 / this._delta);
        controllerData.impostor.setLinearVelocity(this._tmpVector);
      }
      comparedPosition.copyFrom(controllerMesh.position);
      if (this._debugMode) {
        Logger.Log([this._tmpVector, "linear"]);
      }
      const comparedQuaternion = controllerData.oldRotation || controllerData.impostorMesh.rotationQuaternion;
      if ((_b2 = controllerData.xrController._lastXRPose) == null ? void 0 : _b2.angularVelocity) {
        const av = controllerData.xrController._lastXRPose.angularVelocity;
        this._tmpVector.set(av.x, av.y, av.z);
        controllerData.impostor.setAngularVelocity(this._tmpVector);
      } else {
        if (!comparedQuaternion.equalsWithEpsilon(controllerMesh.rotationQuaternion)) {
          comparedQuaternion.conjugateInPlace().multiplyToRef(controllerMesh.rotationQuaternion, this._tmpQuaternion);
          const len = Math.sqrt(this._tmpQuaternion.x * this._tmpQuaternion.x + this._tmpQuaternion.y * this._tmpQuaternion.y + this._tmpQuaternion.z * this._tmpQuaternion.z);
          this._tmpVector.set(this._tmpQuaternion.x, this._tmpQuaternion.y, this._tmpQuaternion.z);
          if (len < 1e-3) {
            this._tmpVector.scaleInPlace(2);
          } else {
            const angle = 2 * Math.atan2(len, this._tmpQuaternion.w);
            this._tmpVector.scaleInPlace(angle / (len * (this._delta / 1e3)));
          }
          controllerData.impostor.setAngularVelocity(this._tmpVector);
        }
      }
      comparedQuaternion.copyFrom(controllerMesh.rotationQuaternion);
      if (this._debugMode) {
        Logger.Log([this._tmpVector, this._tmpQuaternion, "angular"]);
      }
    });
  }
  _detachController(xrControllerUniqueId) {
    const controllerData = this._controllers[xrControllerUniqueId];
    if (!controllerData) {
      return;
    }
    if (controllerData.impostorMesh) {
      controllerData.impostorMesh.dispose();
    }
    delete this._controllers[xrControllerUniqueId];
  }
};
WebXRControllerPhysics.Name = WebXRFeatureName.PHYSICS_CONTROLLERS;
WebXRControllerPhysics.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRControllerPhysics.Name, (xrSessionManager, options) => {
  return () => new WebXRControllerPhysics(xrSessionManager, options);
}, WebXRControllerPhysics.Version, true);

// node_modules/@babylonjs/core/XR/features/WebXRHitTest.js
var WebXRHitTest = class extends WebXRAbstractFeature {
  /**
   * Creates a new instance of the hit test feature
   * @param _xrSessionManager an instance of WebXRSessionManager
   * @param options options to use when constructing this feature
   */
  constructor(_xrSessionManager, options = {}) {
    super(_xrSessionManager);
    this.options = options;
    this._tmpMat = new Matrix();
    this._tmpPos = new Vector3();
    this._tmpQuat = new Quaternion();
    this._initHitTestSource = (referenceSpace) => {
      if (!referenceSpace) {
        return;
      }
      const offsetRay = new XRRay(this.options.offsetRay || {});
      const hitTestOptions = {
        space: this.options.useReferenceSpace ? referenceSpace : this._xrSessionManager.viewerReferenceSpace,
        offsetRay
      };
      if (this.options.entityTypes) {
        hitTestOptions.entityTypes = this.options.entityTypes;
      }
      if (!hitTestOptions.space) {
        Tools.Warn("waiting for viewer reference space to initialize");
        return;
      }
      this._xrSessionManager.session.requestHitTestSource(hitTestOptions).then((hitTestSource) => {
        if (this._xrHitTestSource) {
          this._xrHitTestSource.cancel();
        }
        this._xrHitTestSource = hitTestSource;
      });
    };
    this.autoCloneTransformation = false;
    this.onHitTestResultObservable = new Observable();
    this.paused = false;
    this.xrNativeFeatureName = "hit-test";
    Tools.Warn("Hit test is an experimental and unstable feature.");
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
    if (!this._xrSessionManager.session.requestHitTestSource) {
      return false;
    }
    if (!this.options.disablePermanentHitTest) {
      if (this._xrSessionManager.referenceSpace) {
        this._initHitTestSource(this._xrSessionManager.referenceSpace);
      }
      this._xrSessionManager.onXRReferenceSpaceChanged.add(this._initHitTestSource);
    }
    if (this.options.enableTransientHitTest) {
      const offsetRay = new XRRay(this.options.transientOffsetRay || {});
      this._xrSessionManager.session.requestHitTestSourceForTransientInput({
        profile: this.options.transientHitTestProfile || "generic-touchscreen",
        offsetRay,
        entityTypes: this.options.entityTypes
      }).then((hitSource) => {
        this._transientXrHitTestSource = hitSource;
      });
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
    if (this._xrHitTestSource) {
      this._xrHitTestSource.cancel();
      this._xrHitTestSource = null;
    }
    this._xrSessionManager.onXRReferenceSpaceChanged.removeCallback(this._initHitTestSource);
    if (this._transientXrHitTestSource) {
      this._transientXrHitTestSource.cancel();
      this._transientXrHitTestSource = null;
    }
    return true;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this.onHitTestResultObservable.clear();
  }
  _onXRFrame(frame) {
    if (!this.attached || this.paused) {
      return;
    }
    if (this._xrHitTestSource) {
      const results = frame.getHitTestResults(this._xrHitTestSource);
      this._processWebXRHitTestResult(results);
    }
    if (this._transientXrHitTestSource) {
      const hitTestResultsPerInputSource = frame.getHitTestResultsForTransientInput(this._transientXrHitTestSource);
      hitTestResultsPerInputSource.forEach((resultsPerInputSource) => {
        this._processWebXRHitTestResult(resultsPerInputSource.results, resultsPerInputSource.inputSource);
      });
    }
  }
  _processWebXRHitTestResult(hitTestResults, inputSource) {
    const results = [];
    hitTestResults.forEach((hitTestResult) => {
      const pose = hitTestResult.getPose(this._xrSessionManager.referenceSpace);
      if (!pose) {
        return;
      }
      const pos = pose.transform.position;
      const quat = pose.transform.orientation;
      this._tmpPos.set(pos.x, pos.y, pos.z).scaleInPlace(this._xrSessionManager.worldScalingFactor);
      this._tmpQuat.set(quat.x, quat.y, quat.z, quat.w);
      Matrix.FromFloat32ArrayToRefScaled(pose.transform.matrix, 0, 1, this._tmpMat);
      if (!this._xrSessionManager.scene.useRightHandedSystem) {
        this._tmpPos.z *= -1;
        this._tmpQuat.z *= -1;
        this._tmpQuat.w *= -1;
        this._tmpMat.toggleModelMatrixHandInPlace();
      }
      const result = {
        position: this.autoCloneTransformation ? this._tmpPos.clone() : this._tmpPos,
        rotationQuaternion: this.autoCloneTransformation ? this._tmpQuat.clone() : this._tmpQuat,
        transformationMatrix: this.autoCloneTransformation ? this._tmpMat.clone() : this._tmpMat,
        inputSource,
        isTransient: !!inputSource,
        xrHitResult: hitTestResult
      };
      results.push(result);
    });
    this.onHitTestResultObservable.notifyObservers(results);
  }
};
WebXRHitTest.Name = WebXRFeatureName.HIT_TEST;
WebXRHitTest.Version = 2;
WebXRFeaturesManager.AddWebXRFeature(WebXRHitTest.Name, (xrSessionManager, options) => {
  return () => new WebXRHitTest(xrSessionManager, options);
}, WebXRHitTest.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXRFeaturePointSystem.js
var WebXRFeaturePointSystem = class extends WebXRAbstractFeature {
  /**
   * The current feature point cloud maintained across frames.
   */
  get featurePointCloud() {
    return this._featurePointCloud;
  }
  /**
   * construct the feature point system
   * @param _xrSessionManager an instance of xr Session manager
   */
  constructor(_xrSessionManager) {
    super(_xrSessionManager);
    this._enabled = false;
    this._featurePointCloud = [];
    this.onFeaturePointsAddedObservable = new Observable();
    this.onFeaturePointsUpdatedObservable = new Observable();
    this.xrNativeFeatureName = "bjsfeature-points";
    if (this._xrSessionManager.session) {
      this._init();
    } else {
      this._xrSessionManager.onXRSessionInit.addOnce(() => {
        this._init();
      });
    }
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
    this.featurePointCloud.length = 0;
    return true;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this._featurePointCloud.length = 0;
    this.onFeaturePointsUpdatedObservable.clear();
    this.onFeaturePointsAddedObservable.clear();
  }
  /**
   * On receiving a new XR frame if this feature is attached notify observers new feature point data is available.
   * @param frame
   */
  _onXRFrame(frame) {
    if (!this.attached || !this._enabled || !frame) {
      return;
    }
    const featurePointRawData = frame.featurePointCloud;
    if (!featurePointRawData || featurePointRawData.length === 0) {
      return;
    } else {
      if (featurePointRawData.length % 5 !== 0) {
        throw new Error("Received malformed feature point cloud of length: " + featurePointRawData.length);
      }
      const numberOfFeaturePoints = featurePointRawData.length / 5;
      const updatedFeaturePoints = [];
      const addedFeaturePoints = [];
      for (let i = 0; i < numberOfFeaturePoints; i++) {
        const rawIndex = i * 5;
        const id = featurePointRawData[rawIndex + 4];
        if (!this._featurePointCloud[id]) {
          this._featurePointCloud[id] = { position: new Vector3(), confidenceValue: 0 };
          addedFeaturePoints.push(id);
        } else {
          updatedFeaturePoints.push(id);
        }
        this._featurePointCloud[id].position.x = featurePointRawData[rawIndex];
        this._featurePointCloud[id].position.y = featurePointRawData[rawIndex + 1];
        this._featurePointCloud[id].position.z = featurePointRawData[rawIndex + 2];
        this._featurePointCloud[id].confidenceValue = featurePointRawData[rawIndex + 3];
      }
      if (addedFeaturePoints.length > 0) {
        this.onFeaturePointsAddedObservable.notifyObservers(addedFeaturePoints);
      }
      if (updatedFeaturePoints.length > 0) {
        this.onFeaturePointsUpdatedObservable.notifyObservers(updatedFeaturePoints);
      }
    }
  }
  /**
   * Initializes the feature. If the feature point feature is not available for this environment do not mark the feature as enabled.
   */
  _init() {
    if (!this._xrSessionManager.session.trySetFeaturePointCloudEnabled || !this._xrSessionManager.session.trySetFeaturePointCloudEnabled(true)) {
      return;
    }
    this._enabled = true;
  }
};
WebXRFeaturePointSystem.Name = WebXRFeatureName.FEATURE_POINTS;
WebXRFeaturePointSystem.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRFeaturePointSystem.Name, (xrSessionManager) => {
  return () => new WebXRFeaturePointSystem(xrSessionManager);
}, WebXRFeaturePointSystem.Version);

// node_modules/@babylonjs/core/XR/features/WebXRMeshDetector.js
var meshIdProvider = 0;
var WebXRMeshDetector = class extends WebXRAbstractFeature {
  constructor(_xrSessionManager, _options = {}) {
    super(_xrSessionManager);
    this._options = _options;
    this._detectedMeshes = /* @__PURE__ */ new Map();
    this.onMeshAddedObservable = new Observable();
    this.onMeshRemovedObservable = new Observable();
    this.onMeshUpdatedObservable = new Observable();
    this.xrNativeFeatureName = "mesh-detection";
    if (this._options.generateMeshes) {
      this._options.convertCoordinateSystems = true;
    }
    if (this._xrSessionManager.session) {
      this._init();
    } else {
      this._xrSessionManager.onXRSessionInit.addOnce(() => {
        this._init();
      });
    }
  }
  detach() {
    if (!super.detach()) {
      return false;
    }
    if (!!this._xrSessionManager.isNative && !!this._xrSessionManager.session.trySetMeshDetectorEnabled) {
      this._xrSessionManager.session.trySetMeshDetectorEnabled(false);
    }
    if (!this._options.doNotRemoveMeshesOnSessionEnded) {
      this._detectedMeshes.forEach((mesh) => {
        this.onMeshRemovedObservable.notifyObservers(mesh);
      });
      this._detectedMeshes.clear();
    }
    return true;
  }
  dispose() {
    super.dispose();
    this.onMeshAddedObservable.clear();
    this.onMeshRemovedObservable.clear();
    this.onMeshUpdatedObservable.clear();
  }
  _onXRFrame(frame) {
    var _a;
    try {
      if (!this.attached || !frame) {
        return;
      }
      const detectedMeshes = frame.detectedMeshes || ((_a = frame.worldInformation) == null ? void 0 : _a.detectedMeshes);
      if (detectedMeshes) {
        const toRemove = /* @__PURE__ */ new Set();
        this._detectedMeshes.forEach((vertexData, xrMesh) => {
          if (!detectedMeshes.has(xrMesh)) {
            toRemove.add(xrMesh);
          }
        });
        toRemove.forEach((xrMesh) => {
          const vertexData = this._detectedMeshes.get(xrMesh);
          if (vertexData) {
            this.onMeshRemovedObservable.notifyObservers(vertexData);
            this._detectedMeshes.delete(xrMesh);
          }
        });
        detectedMeshes.forEach((xrMesh) => {
          if (!this._detectedMeshes.has(xrMesh)) {
            const partialVertexData = {
              id: meshIdProvider++,
              xrMesh
            };
            const vertexData = this._updateVertexDataWithXRMesh(xrMesh, partialVertexData, frame);
            this._detectedMeshes.set(xrMesh, vertexData);
            this.onMeshAddedObservable.notifyObservers(vertexData);
          } else {
            if (xrMesh.lastChangedTime === this._xrSessionManager.currentTimestamp) {
              const vertexData = this._detectedMeshes.get(xrMesh);
              if (vertexData) {
                this._updateVertexDataWithXRMesh(xrMesh, vertexData, frame);
                this.onMeshUpdatedObservable.notifyObservers(vertexData);
              }
            }
          }
        });
      }
    } catch (error) {
      Logger.Log(error.stack);
    }
  }
  _init() {
    if (this._xrSessionManager.isNative) {
      if (this._xrSessionManager.session.trySetMeshDetectorEnabled) {
        this._xrSessionManager.session.trySetMeshDetectorEnabled(true);
      }
      if (!!this._options.preferredDetectorOptions && !!this._xrSessionManager.session.trySetPreferredMeshDetectorOptions) {
        this._xrSessionManager.session.trySetPreferredMeshDetectorOptions(this._options.preferredDetectorOptions);
      }
    }
  }
  _updateVertexDataWithXRMesh(xrMesh, mesh, xrFrame) {
    var _a;
    mesh.xrMesh = xrMesh;
    mesh.worldParentNode = this._options.worldParentNode;
    const positions = xrMesh.vertices || xrMesh.positions;
    if (this._options.convertCoordinateSystems) {
      if (!this._xrSessionManager.scene.useRightHandedSystem) {
        mesh.positions = new Float32Array(positions.length);
        for (let i = 0; i < positions.length; i += 3) {
          mesh.positions[i] = positions[i];
          mesh.positions[i + 1] = positions[i + 1];
          mesh.positions[i + 2] = -1 * positions[i + 2];
        }
        if (xrMesh.normals) {
          mesh.normals = new Float32Array(xrMesh.normals.length);
          for (let i = 0; i < xrMesh.normals.length; i += 3) {
            mesh.normals[i] = xrMesh.normals[i];
            mesh.normals[i + 1] = xrMesh.normals[i + 1];
            mesh.normals[i + 2] = -1 * xrMesh.normals[i + 2];
          }
        }
      } else {
        mesh.positions = positions;
        mesh.normals = xrMesh.normals;
      }
      mesh.indices = xrMesh.indices;
      const pose = xrFrame.getPose(xrMesh.meshSpace, this._xrSessionManager.referenceSpace);
      if (pose) {
        const mat = mesh.transformationMatrix || new Matrix();
        Matrix.FromArrayToRef(pose.transform.matrix, 0, mat);
        if (!this._xrSessionManager.scene.useRightHandedSystem) {
          mat.toggleModelMatrixHandInPlace();
        }
        mesh.transformationMatrix = mat;
        if (this._options.worldParentNode) {
          mat.multiplyToRef(this._options.worldParentNode.getWorldMatrix(), mat);
        }
      }
      if (this._options.generateMeshes) {
        if (!mesh.mesh) {
          const generatedMesh = new Mesh("xr mesh " + mesh.id, this._xrSessionManager.scene);
          generatedMesh.rotationQuaternion = new Quaternion();
          generatedMesh.setVerticesData(VertexBuffer.PositionKind, mesh.positions);
          if (mesh.normals) {
            generatedMesh.setVerticesData(VertexBuffer.NormalKind, mesh.normals);
          } else {
            generatedMesh.createNormals(true);
          }
          generatedMesh.setIndices(mesh.indices, void 0, true);
          mesh.mesh = generatedMesh;
        } else {
          const generatedMesh = mesh.mesh;
          generatedMesh.updateVerticesData(VertexBuffer.PositionKind, mesh.positions);
          if (mesh.normals) {
            generatedMesh.updateVerticesData(VertexBuffer.NormalKind, mesh.normals);
          } else {
            generatedMesh.createNormals(true);
          }
          generatedMesh.updateIndices(mesh.indices);
        }
        (_a = mesh.transformationMatrix) == null ? void 0 : _a.decompose(mesh.mesh.scaling, mesh.mesh.rotationQuaternion, mesh.mesh.position);
      }
    }
    return mesh;
  }
};
WebXRMeshDetector.Name = WebXRFeatureName.MESH_DETECTION;
WebXRMeshDetector.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRMeshDetector.Name, (xrSessionManager, options) => {
  return () => new WebXRMeshDetector(xrSessionManager, options);
}, WebXRMeshDetector.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXRImageTracking.js
var ImageTrackingScoreStatus;
(function(ImageTrackingScoreStatus2) {
  ImageTrackingScoreStatus2[ImageTrackingScoreStatus2["NotReceived"] = 0] = "NotReceived";
  ImageTrackingScoreStatus2[ImageTrackingScoreStatus2["Waiting"] = 1] = "Waiting";
  ImageTrackingScoreStatus2[ImageTrackingScoreStatus2["Received"] = 2] = "Received";
})(ImageTrackingScoreStatus || (ImageTrackingScoreStatus = {}));
var WebXRImageTracking = class extends WebXRAbstractFeature {
  /**
   * constructs the image tracking feature
   * @param _xrSessionManager the session manager for this module
   * @param options read-only options to be used in this module
   */
  constructor(_xrSessionManager, options) {
    super(_xrSessionManager);
    this.options = options;
    this.onUntrackableImageFoundObservable = new Observable();
    this.onTrackableImageFoundObservable = new Observable();
    this.onTrackedImageUpdatedObservable = new Observable();
    this._trackableScoreStatus = ImageTrackingScoreStatus.NotReceived;
    this._trackedImages = [];
    this.xrNativeFeatureName = "image-tracking";
  }
  /**
   * attach this feature
   * Will usually be called by the features manager
   *
   * @returns true if successful.
   */
  attach() {
    return super.attach();
  }
  /**
   * detach this feature.
   * Will usually be called by the features manager
   *
   * @returns true if successful.
   */
  detach() {
    return super.detach();
  }
  /**
   * Get a tracked image by its ID.
   *
   * @param id the id of the image to load (position in the init array)
   * @returns a trackable image, if exists in this location
   */
  getTrackedImageById(id) {
    return this._trackedImages[id] || null;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this._trackedImages.forEach((trackedImage) => {
      trackedImage.originalBitmap.close();
    });
    this._trackedImages.length = 0;
    this.onTrackableImageFoundObservable.clear();
    this.onUntrackableImageFoundObservable.clear();
    this.onTrackedImageUpdatedObservable.clear();
  }
  /**
   * Extends the session init object if needed
   * @returns augmentation object fo the xr session init object.
   */
  async getXRSessionInitExtension() {
    if (!this.options.images || !this.options.images.length) {
      return {};
    }
    const promises = this.options.images.map((image) => {
      if (typeof image.src === "string") {
        return this._xrSessionManager.scene.getEngine()._createImageBitmapFromSource(image.src);
      } else {
        return Promise.resolve(image.src);
      }
    });
    try {
      const images = await Promise.all(promises);
      this._originalTrackingRequest = images.map((image, idx) => {
        return {
          image,
          widthInMeters: this.options.images[idx].estimatedRealWorldWidth
        };
      });
      return {
        trackedImages: this._originalTrackingRequest
      };
    } catch (ex) {
      Tools.Error("Error loading images for tracking, WebXRImageTracking disabled for this session.");
      return {};
    }
  }
  _onXRFrame(_xrFrame) {
    if (!_xrFrame.getImageTrackingResults || this._trackableScoreStatus === ImageTrackingScoreStatus.Waiting) {
      return;
    }
    if (this._trackableScoreStatus === ImageTrackingScoreStatus.NotReceived) {
      this._checkScoresAsync();
      return;
    }
    const imageTrackedResults = _xrFrame.getImageTrackingResults();
    for (const result of imageTrackedResults) {
      let changed = false;
      const imageIndex = result.index;
      const imageObject = this._trackedImages[imageIndex];
      if (!imageObject) {
        continue;
      }
      imageObject.xrTrackingResult = result;
      if (imageObject.realWorldWidth !== result.measuredWidthInMeters) {
        imageObject.realWorldWidth = result.measuredWidthInMeters;
        changed = true;
      }
      const pose = _xrFrame.getPose(result.imageSpace, this._xrSessionManager.referenceSpace);
      if (pose) {
        const mat = imageObject.transformationMatrix;
        Matrix.FromArrayToRef(pose.transform.matrix, 0, mat);
        if (!this._xrSessionManager.scene.useRightHandedSystem) {
          mat.toggleModelMatrixHandInPlace();
        }
        changed = true;
      }
      const state = result.trackingState;
      const emulated = state === "emulated";
      if (imageObject.emulated !== emulated) {
        imageObject.emulated = emulated;
        changed = true;
      }
      if (changed) {
        this.onTrackedImageUpdatedObservable.notifyObservers(imageObject);
      }
    }
  }
  async _checkScoresAsync() {
    if (!this._xrSessionManager.session.getTrackedImageScores || this._trackableScoreStatus !== ImageTrackingScoreStatus.NotReceived) {
      return;
    }
    this._trackableScoreStatus = ImageTrackingScoreStatus.Waiting;
    const imageScores = await this._xrSessionManager.session.getTrackedImageScores();
    if (!imageScores || imageScores.length === 0) {
      this._trackableScoreStatus = ImageTrackingScoreStatus.NotReceived;
      return;
    }
    for (let idx = 0; idx < imageScores.length; ++idx) {
      if (imageScores[idx] == "untrackable") {
        this.onUntrackableImageFoundObservable.notifyObservers(idx);
      } else {
        const originalBitmap = this._originalTrackingRequest[idx].image;
        const imageObject = {
          id: idx,
          originalBitmap,
          transformationMatrix: new Matrix(),
          ratio: originalBitmap.width / originalBitmap.height
        };
        this._trackedImages[idx] = imageObject;
        this.onTrackableImageFoundObservable.notifyObservers(imageObject);
      }
    }
    this._trackableScoreStatus = imageScores.length > 0 ? ImageTrackingScoreStatus.Received : ImageTrackingScoreStatus.NotReceived;
  }
};
WebXRImageTracking.Name = WebXRFeatureName.IMAGE_TRACKING;
WebXRImageTracking.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRImageTracking.Name, (xrSessionManager, options) => {
  return () => new WebXRImageTracking(xrSessionManager, options);
}, WebXRImageTracking.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXRDOMOverlay.js
var WebXRDomOverlay = class extends WebXRAbstractFeature {
  /**
   * Creates a new instance of the dom-overlay feature
   * @param _xrSessionManager an instance of WebXRSessionManager
   * @param options options to use when constructing this feature
   */
  constructor(_xrSessionManager, options) {
    super(_xrSessionManager);
    this.options = options;
    this._domOverlayType = null;
    this._beforeXRSelectListener = null;
    this._element = null;
    this.xrNativeFeatureName = "dom-overlay";
    Tools.Warn("dom-overlay is an experimental and unstable feature.");
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
    if (!this._xrSessionManager.session.domOverlayState || this._xrSessionManager.session.domOverlayState.type === null) {
      return false;
    }
    this._domOverlayType = this._xrSessionManager.session.domOverlayState.type;
    if (this._element !== null && this.options.supressXRSelectEvents === true) {
      this._beforeXRSelectListener = (ev) => {
        ev.preventDefault();
      };
      this._element.addEventListener("beforexrselect", this._beforeXRSelectListener);
    }
    return true;
  }
  /**
   * The type of DOM overlay (null when not supported).  Provided by UA and remains unchanged for duration of session.
   */
  get domOverlayType() {
    return this._domOverlayType;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    if (this._element !== null && this._beforeXRSelectListener) {
      this._element.removeEventListener("beforexrselect", this._beforeXRSelectListener);
    }
  }
  _onXRFrame(_xrFrame) {
  }
  /**
   * Extends the session init object if needed
   * @returns augmentation object for the xr session init object.
   */
  async getXRSessionInitExtension() {
    if (this.options.element === void 0) {
      Tools.Warn('"element" option must be provided to attach xr-dom-overlay feature.');
      return {};
    } else if (typeof this.options.element === "string") {
      const selectedElement = document.querySelector(this.options.element);
      if (selectedElement === null) {
        Tools.Warn(`element not found '${this.options.element}' (not requesting xr-dom-overlay)`);
        return {};
      }
      this._element = selectedElement;
    } else {
      this._element = this.options.element;
    }
    return {
      domOverlay: {
        root: this._element
      }
    };
  }
};
WebXRDomOverlay.Name = WebXRFeatureName.DOM_OVERLAY;
WebXRDomOverlay.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRDomOverlay.Name, (xrSessionManager, options) => {
  return () => new WebXRDomOverlay(xrSessionManager, options);
}, WebXRDomOverlay.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXRControllerMovement.js
var WebXRControllerMovement = class _WebXRControllerMovement extends WebXRAbstractFeature {
  /**
   * Current movement direction.  Will be null before XR Frames have been processed.
   */
  get movementDirection() {
    return this._movementDirection;
  }
  /**
   * Is movement enabled
   */
  get movementEnabled() {
    return this._featureContext.movementEnabled;
  }
  /**
   * Sets whether movement is enabled or not
   * @param enabled is movement enabled
   */
  set movementEnabled(enabled) {
    this._featureContext.movementEnabled = enabled;
  }
  /**
   * If movement follows viewer pose
   */
  get movementOrientationFollowsViewerPose() {
    return this._featureContext.movementOrientationFollowsViewerPose;
  }
  /**
   * Sets whether movement follows viewer pose
   * @param followsPose is movement should follow viewer pose
   */
  set movementOrientationFollowsViewerPose(followsPose) {
    this._featureContext.movementOrientationFollowsViewerPose = followsPose;
  }
  /**
   * Gets movement speed
   */
  get movementSpeed() {
    return this._featureContext.movementSpeed;
  }
  /**
   * Sets movement speed
   * @param movementSpeed movement speed
   */
  set movementSpeed(movementSpeed) {
    this._featureContext.movementSpeed = movementSpeed;
  }
  /**
   * Gets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for movement (avoids jitter/unintentional movement)
   */
  get movementThreshold() {
    return this._featureContext.movementThreshold;
  }
  /**
   * Sets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for movement (avoids jitter/unintentional movement)
   * @param movementThreshold new threshold
   */
  set movementThreshold(movementThreshold) {
    this._featureContext.movementThreshold = movementThreshold;
  }
  /**
   * Is rotation enabled
   */
  get rotationEnabled() {
    return this._featureContext.rotationEnabled;
  }
  /**
   * Sets whether rotation is enabled or not
   * @param enabled is rotation enabled
   */
  set rotationEnabled(enabled) {
    this._featureContext.rotationEnabled = enabled;
  }
  /**
   * Gets rotation speed factor
   */
  get rotationSpeed() {
    return this._featureContext.rotationSpeed;
  }
  /**
   * Sets rotation speed factor (1.0 is default)
   * @param rotationSpeed new rotation speed factor
   */
  set rotationSpeed(rotationSpeed) {
    this._featureContext.rotationSpeed = rotationSpeed;
  }
  /**
   * Gets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for rotation (avoids jitter/unintentional rotation)
   */
  get rotationThreshold() {
    return this._featureContext.rotationThreshold;
  }
  /**
   * Sets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for rotation (avoids jitter/unintentional rotation)
   * @param threshold new threshold
   */
  set rotationThreshold(threshold) {
    this._featureContext.rotationThreshold = threshold;
  }
  /**
   * constructs a new movement controller system
   * @param _xrSessionManager an instance of WebXRSessionManager
   * @param options configuration object for this feature
   */
  constructor(_xrSessionManager, options) {
    super(_xrSessionManager);
    this._controllers = {};
    this._currentRegistrationConfigurations = [];
    this._movementDirection = new Quaternion();
    this._tmpRotationMatrix = Matrix.Identity();
    this._tmpTranslationDirection = new Vector3();
    this._tmpMovementTranslation = new Vector3();
    this._tempCacheQuaternion = new Quaternion();
    this._attachController = (xrController) => {
      if (this._controllers[xrController.uniqueId]) {
        return;
      }
      this._controllers[xrController.uniqueId] = {
        xrController,
        registeredComponents: []
      };
      const controllerData = this._controllers[xrController.uniqueId];
      if (controllerData.xrController.inputSource.targetRayMode === "tracked-pointer" && controllerData.xrController.inputSource.gamepad) {
        const initController = () => {
          if (xrController.motionController) {
            for (const registration of this._currentRegistrationConfigurations) {
              let component = null;
              if (registration.allowedComponentTypes) {
                for (const componentType of registration.allowedComponentTypes) {
                  const componentOfType = xrController.motionController.getComponentOfType(componentType);
                  if (componentOfType !== null) {
                    component = componentOfType;
                    break;
                  }
                }
              }
              if (registration.mainComponentOnly) {
                const mainComponent = xrController.motionController.getMainComponent();
                if (mainComponent === null) {
                  continue;
                }
                component = mainComponent;
              }
              if (typeof registration.componentSelectionPredicate === "function") {
                component = registration.componentSelectionPredicate(xrController);
              }
              if (component && registration.forceHandedness) {
                if (xrController.inputSource.handedness !== registration.forceHandedness) {
                  continue;
                }
              }
              if (component === null) {
                continue;
              }
              const registeredComponent = {
                registrationConfiguration: registration,
                component
              };
              controllerData.registeredComponents.push(registeredComponent);
              if ("axisChangedHandler" in registration) {
                registeredComponent.onAxisChangedObserver = component.onAxisValueChangedObservable.add((axesData) => {
                  registration.axisChangedHandler(axesData, this._movementState, this._featureContext, this._xrInput);
                });
              }
              if ("buttonChangedhandler" in registration) {
                registeredComponent.onButtonChangedObserver = component.onButtonStateChangedObservable.add(() => {
                  if (component.changes.pressed) {
                    registration.buttonChangedhandler(component.changes.pressed, this._movementState, this._featureContext, this._xrInput);
                  }
                });
              }
            }
          }
        };
        if (xrController.motionController) {
          initController();
        } else {
          xrController.onMotionControllerInitObservable.addOnce(() => {
            initController();
          });
        }
      }
    };
    if (!options || options.xrInput === void 0) {
      Tools.Error('WebXRControllerMovement feature requires "xrInput" option.');
      return;
    }
    if (Array.isArray(options.customRegistrationConfigurations)) {
      this._currentRegistrationConfigurations = options.customRegistrationConfigurations;
    } else {
      this._currentRegistrationConfigurations = _WebXRControllerMovement.REGISTRATIONS.default;
    }
    this._featureContext = {
      movementEnabled: options.movementEnabled || true,
      movementOrientationFollowsViewerPose: options.movementOrientationFollowsViewerPose ?? true,
      movementSpeed: options.movementSpeed ?? 1,
      movementThreshold: options.movementThreshold ?? 0.25,
      rotationEnabled: options.rotationEnabled ?? true,
      rotationSpeed: options.rotationSpeed ?? 1,
      rotationThreshold: options.rotationThreshold ?? 0.25
    };
    this._movementState = {
      moveX: 0,
      moveY: 0,
      rotateX: 0,
      rotateY: 0
    };
    this._xrInput = options.xrInput;
  }
  attach() {
    if (!super.attach()) {
      return false;
    }
    this._xrInput.controllers.forEach(this._attachController);
    this._addNewAttachObserver(this._xrInput.onControllerAddedObservable, this._attachController);
    this._addNewAttachObserver(this._xrInput.onControllerRemovedObservable, (controller) => {
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
    this._controllers = {};
    return true;
  }
  /**
   * Occurs on every XR frame.
   * @param _xrFrame
   */
  _onXRFrame(_xrFrame) {
    if (!this.attached) {
      return;
    }
    if (this._movementState.rotateX !== 0 && this._featureContext.rotationEnabled) {
      const deltaMillis = this._xrSessionManager.scene.getEngine().getDeltaTime();
      const rotationY = deltaMillis * 1e-3 * this._featureContext.rotationSpeed * this._movementState.rotateX * (this._xrSessionManager.scene.useRightHandedSystem ? -1 : 1);
      if (this._featureContext.movementOrientationFollowsViewerPose) {
        this._xrInput.xrCamera.cameraRotation.y += rotationY;
        Quaternion.RotationYawPitchRollToRef(rotationY, 0, 0, this._tempCacheQuaternion);
        this._xrInput.xrCamera.rotationQuaternion.multiplyToRef(this._tempCacheQuaternion, this._movementDirection);
      } else {
        Quaternion.RotationYawPitchRollToRef(rotationY * 3, 0, 0, this._tempCacheQuaternion);
        this._movementDirection.multiplyInPlace(this._tempCacheQuaternion);
      }
    } else if (this._featureContext.movementOrientationFollowsViewerPose) {
      this._movementDirection.copyFrom(this._xrInput.xrCamera.rotationQuaternion);
    }
    if ((this._movementState.moveX || this._movementState.moveY) && this._featureContext.movementEnabled) {
      Matrix.FromQuaternionToRef(this._movementDirection, this._tmpRotationMatrix);
      this._tmpTranslationDirection.set(this._movementState.moveX, 0, this._movementState.moveY * (this._xrSessionManager.scene.useRightHandedSystem ? 1 : -1));
      Vector3.TransformCoordinatesToRef(this._tmpTranslationDirection, this._tmpRotationMatrix, this._tmpMovementTranslation);
      this._tmpMovementTranslation.scaleInPlace(this._xrInput.xrCamera._computeLocalCameraSpeed() * this._featureContext.movementSpeed);
      this._xrInput.xrCamera.cameraDirection.addInPlace(this._tmpMovementTranslation);
    }
  }
  _detachController(xrControllerUniqueId) {
    const controllerData = this._controllers[xrControllerUniqueId];
    if (!controllerData) {
      return;
    }
    for (const registeredComponent of controllerData.registeredComponents) {
      if (registeredComponent.onAxisChangedObserver) {
        registeredComponent.component.onAxisValueChangedObservable.remove(registeredComponent.onAxisChangedObserver);
      }
      if (registeredComponent.onButtonChangedObserver) {
        registeredComponent.component.onButtonStateChangedObservable.remove(registeredComponent.onButtonChangedObserver);
      }
    }
    delete this._controllers[xrControllerUniqueId];
  }
};
WebXRControllerMovement.Name = WebXRFeatureName.MOVEMENT;
WebXRControllerMovement.REGISTRATIONS = {
  default: [
    {
      allowedComponentTypes: [WebXRControllerComponent.THUMBSTICK_TYPE, WebXRControllerComponent.TOUCHPAD_TYPE],
      forceHandedness: "left",
      axisChangedHandler: (axes, movementState, featureContext) => {
        movementState.rotateX = Math.abs(axes.x) > featureContext.rotationThreshold ? axes.x : 0;
        movementState.rotateY = Math.abs(axes.y) > featureContext.rotationThreshold ? axes.y : 0;
      }
    },
    {
      allowedComponentTypes: [WebXRControllerComponent.THUMBSTICK_TYPE, WebXRControllerComponent.TOUCHPAD_TYPE],
      forceHandedness: "right",
      axisChangedHandler: (axes, movementState, featureContext) => {
        movementState.moveX = Math.abs(axes.x) > featureContext.movementThreshold ? axes.x : 0;
        movementState.moveY = Math.abs(axes.y) > featureContext.movementThreshold ? axes.y : 0;
      }
    }
  ]
};
WebXRControllerMovement.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRControllerMovement.Name, (xrSessionManager, options) => {
  return () => new WebXRControllerMovement(xrSessionManager, options);
}, WebXRControllerMovement.Version, true);

// node_modules/@babylonjs/core/Lights/shadowLight.js
var ShadowLight = class extends Light {
  constructor() {
    super(...arguments);
    this._needProjectionMatrixCompute = true;
    this._viewMatrix = Matrix.Identity();
    this._projectionMatrix = Matrix.Identity();
  }
  _setPosition(value) {
    this._position = value;
  }
  /**
   * Sets the position the shadow will be casted from. Also use as the light position for both
   * point and spot lights.
   */
  get position() {
    return this._position;
  }
  /**
   * Sets the position the shadow will be casted from. Also use as the light position for both
   * point and spot lights.
   */
  set position(value) {
    this._setPosition(value);
  }
  _setDirection(value) {
    this._direction = value;
  }
  /**
   * In 2d mode (needCube being false), gets the direction used to cast the shadow.
   * Also use as the light direction on spot and directional lights.
   */
  get direction() {
    return this._direction;
  }
  /**
   * In 2d mode (needCube being false), sets the direction used to cast the shadow.
   * Also use as the light direction on spot and directional lights.
   */
  set direction(value) {
    this._setDirection(value);
  }
  /**
   * Gets the shadow projection clipping minimum z value.
   */
  get shadowMinZ() {
    return this._shadowMinZ;
  }
  /**
   * Sets the shadow projection clipping minimum z value.
   */
  set shadowMinZ(value) {
    this._shadowMinZ = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Sets the shadow projection clipping maximum z value.
   */
  get shadowMaxZ() {
    return this._shadowMaxZ;
  }
  /**
   * Gets the shadow projection clipping maximum z value.
   */
  set shadowMaxZ(value) {
    this._shadowMaxZ = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Computes the transformed information (transformedPosition and transformedDirection in World space) of the current light
   * @returns true if the information has been computed, false if it does not need to (no parenting)
   */
  computeTransformedInformation() {
    if (this.parent && this.parent.getWorldMatrix) {
      if (!this.transformedPosition) {
        this.transformedPosition = Vector3.Zero();
      }
      Vector3.TransformCoordinatesToRef(this.position, this.parent.getWorldMatrix(), this.transformedPosition);
      if (this.direction) {
        if (!this.transformedDirection) {
          this.transformedDirection = Vector3.Zero();
        }
        Vector3.TransformNormalToRef(this.direction, this.parent.getWorldMatrix(), this.transformedDirection);
      }
      return true;
    }
    return false;
  }
  /**
   * Return the depth scale used for the shadow map.
   * @returns the depth scale.
   */
  getDepthScale() {
    return 50;
  }
  /**
   * Get the direction to use to render the shadow map. In case of cube texture, the face index can be passed.
   * @param faceIndex The index of the face we are computed the direction to generate shadow
   * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getShadowDirection(faceIndex) {
    return this.transformedDirection ? this.transformedDirection : this.direction;
  }
  /**
   * If computeTransformedInformation has been called, returns the ShadowLight absolute position in the world. Otherwise, returns the local position.
   * @returns the position vector in world space
   */
  getAbsolutePosition() {
    return this.transformedPosition ? this.transformedPosition : this.position;
  }
  /**
   * Sets the ShadowLight direction toward the passed target.
   * @param target The point to target in local space
   * @returns the updated ShadowLight direction
   */
  setDirectionToTarget(target) {
    this.direction = Vector3.Normalize(target.subtract(this.position));
    return this.direction;
  }
  /**
   * Returns the light rotation in euler definition.
   * @returns the x y z rotation in local space.
   */
  getRotation() {
    this.direction.normalize();
    const xaxis = Vector3.Cross(this.direction, Axis.Y);
    const yaxis = Vector3.Cross(xaxis, this.direction);
    return Vector3.RotationFromAxis(xaxis, yaxis, this.direction);
  }
  /**
   * Returns whether or not the shadow generation require a cube texture or a 2d texture.
   * @returns true if a cube texture needs to be use
   */
  needCube() {
    return false;
  }
  /**
   * Detects if the projection matrix requires to be recomputed this frame.
   * @returns true if it requires to be recomputed otherwise, false.
   */
  needProjectionMatrixCompute() {
    return this._needProjectionMatrixCompute;
  }
  /**
   * Forces the shadow generator to recompute the projection matrix even if position and direction did not changed.
   */
  forceProjectionMatrixCompute() {
    this._needProjectionMatrixCompute = true;
  }
  /** @internal */
  _initCache() {
    super._initCache();
    this._cache.position = Vector3.Zero();
  }
  /** @internal */
  _isSynchronized() {
    if (!this._cache.position.equals(this.position)) {
      return false;
    }
    return true;
  }
  /**
   * Computes the world matrix of the node
   * @param force defines if the cache version should be invalidated forcing the world matrix to be created from scratch
   * @returns the world matrix
   */
  computeWorldMatrix(force) {
    if (!force && this.isSynchronized()) {
      this._currentRenderId = this.getScene().getRenderId();
      return this._worldMatrix;
    }
    this._updateCache();
    this._cache.position.copyFrom(this.position);
    if (!this._worldMatrix) {
      this._worldMatrix = Matrix.Identity();
    }
    Matrix.TranslationToRef(this.position.x, this.position.y, this.position.z, this._worldMatrix);
    if (this.parent && this.parent.getWorldMatrix) {
      this._worldMatrix.multiplyToRef(this.parent.getWorldMatrix(), this._worldMatrix);
      this._markSyncedWithParent();
    }
    this._worldMatrixDeterminantIsDirty = true;
    return this._worldMatrix;
  }
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the min for
   * @returns the depth min z
   */
  getDepthMinZ(activeCamera) {
    return this.shadowMinZ !== void 0 ? this.shadowMinZ : activeCamera.minZ;
  }
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the max for
   * @returns the depth max z
   */
  getDepthMaxZ(activeCamera) {
    return this.shadowMaxZ !== void 0 ? this.shadowMaxZ : activeCamera.maxZ;
  }
  /**
   * Sets the shadow projection matrix in parameter to the generated projection matrix.
   * @param matrix The matrix to updated with the projection information
   * @param viewMatrix The transform matrix of the light
   * @param renderList The list of mesh to render in the map
   * @returns The current light
   */
  setShadowProjectionMatrix(matrix, viewMatrix, renderList) {
    if (this.customProjectionMatrixBuilder) {
      this.customProjectionMatrixBuilder(viewMatrix, renderList, matrix);
    } else {
      this._setDefaultShadowProjectionMatrix(matrix, viewMatrix, renderList);
    }
    return this;
  }
  /** @internal */
  _syncParentEnabledState() {
    super._syncParentEnabledState();
    if (!this.parent || !this.parent.getWorldMatrix) {
      this.transformedPosition = null;
      this.transformedDirection = null;
    }
  }
  /**
   * Returns the view matrix.
   * @param faceIndex The index of the face for which we want to extract the view matrix. Only used for point light types.
   * @returns The view matrix. Can be null, if a view matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
   */
  getViewMatrix(faceIndex) {
    const lightDirection = TmpVectors.Vector3[0];
    let lightPosition = this.position;
    if (this.computeTransformedInformation()) {
      lightPosition = this.transformedPosition;
    }
    Vector3.NormalizeToRef(this.getShadowDirection(faceIndex), lightDirection);
    if (Math.abs(Vector3.Dot(lightDirection, Vector3.Up())) === 1) {
      lightDirection.z = 1e-13;
    }
    const lightTarget = TmpVectors.Vector3[1];
    lightPosition.addToRef(lightDirection, lightTarget);
    Matrix.LookAtLHToRef(lightPosition, lightTarget, Vector3.Up(), this._viewMatrix);
    return this._viewMatrix;
  }
  /**
   * Returns the projection matrix.
   * Note that viewMatrix and renderList are optional and are only used by lights that calculate the projection matrix from a list of meshes (e.g. directional lights with automatic extents calculation).
   * @param viewMatrix The view transform matrix of the light (optional).
   * @param renderList The list of meshes to take into account when calculating the projection matrix (optional).
   * @returns The projection matrix. Can be null, if a projection matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
   */
  getProjectionMatrix(viewMatrix, renderList) {
    this.setShadowProjectionMatrix(this._projectionMatrix, viewMatrix ?? this._viewMatrix, renderList ?? []);
    return this._projectionMatrix;
  }
};
__decorate([
  serializeAsVector3()
], ShadowLight.prototype, "position", null);
__decorate([
  serializeAsVector3()
], ShadowLight.prototype, "direction", null);
__decorate([
  serialize()
], ShadowLight.prototype, "shadowMinZ", null);
__decorate([
  serialize()
], ShadowLight.prototype, "shadowMaxZ", null);

// node_modules/@babylonjs/core/Lights/directionalLight.js
Node.AddNodeConstructor("Light_Type_1", (name11, scene) => {
  return () => new DirectionalLight(name11, Vector3.Zero(), scene);
});
var DirectionalLight = class extends ShadowLight {
  /**
   * Fix frustum size for the shadow generation. This is disabled if the value is 0.
   */
  get shadowFrustumSize() {
    return this._shadowFrustumSize;
  }
  /**
   * Specifies a fix frustum size for the shadow generation.
   */
  set shadowFrustumSize(value) {
    this._shadowFrustumSize = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Gets the shadow projection scale against the optimal computed one.
   * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
   * This does not impact in fixed frustum size (shadowFrustumSize being set)
   */
  get shadowOrthoScale() {
    return this._shadowOrthoScale;
  }
  /**
   * Sets the shadow projection scale against the optimal computed one.
   * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
   * This does not impact in fixed frustum size (shadowFrustumSize being set)
   */
  set shadowOrthoScale(value) {
    this._shadowOrthoScale = value;
    this.forceProjectionMatrixCompute();
  }
  /**
   * Gets or sets the orthoLeft property used to build the light frustum
   */
  get orthoLeft() {
    return this._orthoLeft;
  }
  set orthoLeft(left) {
    this._orthoLeft = left;
  }
  /**
   * Gets or sets the orthoRight property used to build the light frustum
   */
  get orthoRight() {
    return this._orthoRight;
  }
  set orthoRight(right) {
    this._orthoRight = right;
  }
  /**
   * Gets or sets the orthoTop property used to build the light frustum
   */
  get orthoTop() {
    return this._orthoTop;
  }
  set orthoTop(top) {
    this._orthoTop = top;
  }
  /**
   * Gets or sets the orthoBottom property used to build the light frustum
   */
  get orthoBottom() {
    return this._orthoBottom;
  }
  set orthoBottom(bottom) {
    this._orthoBottom = bottom;
  }
  /**
   * Creates a DirectionalLight object in the scene, oriented towards the passed direction (Vector3).
   * The directional light is emitted from everywhere in the given direction.
   * It can cast shadows.
   * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
   * @param name The friendly name of the light
   * @param direction The direction of the light
   * @param scene The scene the light belongs to
   */
  constructor(name11, direction, scene) {
    super(name11, scene);
    this._shadowFrustumSize = 0;
    this._shadowOrthoScale = 0.1;
    this.autoUpdateExtends = true;
    this.autoCalcShadowZBounds = false;
    this._orthoLeft = Number.MAX_VALUE;
    this._orthoRight = Number.MIN_VALUE;
    this._orthoTop = Number.MIN_VALUE;
    this._orthoBottom = Number.MAX_VALUE;
    this.position = direction.scale(-1);
    this.direction = direction;
  }
  /**
   * Returns the string "DirectionalLight".
   * @returns The class name
   */
  getClassName() {
    return "DirectionalLight";
  }
  /**
   * Returns the integer 1.
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */
  getTypeID() {
    return Light.LIGHTTYPEID_DIRECTIONALLIGHT;
  }
  /**
   * Sets the passed matrix "matrix" as projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   * @param viewMatrix
   * @param renderList
   */
  _setDefaultShadowProjectionMatrix(matrix, viewMatrix, renderList) {
    if (this.shadowFrustumSize > 0) {
      this._setDefaultFixedFrustumShadowProjectionMatrix(matrix);
    } else {
      this._setDefaultAutoExtendShadowProjectionMatrix(matrix, viewMatrix, renderList);
    }
  }
  /**
   * Sets the passed matrix "matrix" as fixed frustum projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   */
  _setDefaultFixedFrustumShadowProjectionMatrix(matrix) {
    const activeCamera = this.getScene().activeCamera;
    if (!activeCamera) {
      return;
    }
    Matrix.OrthoLHToRef(this.shadowFrustumSize, this.shadowFrustumSize, this.shadowMinZ !== void 0 ? this.shadowMinZ : activeCamera.minZ, this.shadowMaxZ !== void 0 ? this.shadowMaxZ : activeCamera.maxZ, matrix, this.getScene().getEngine().isNDCHalfZRange);
  }
  /**
   * Sets the passed matrix "matrix" as auto extend projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   * @param viewMatrix
   * @param renderList
   */
  _setDefaultAutoExtendShadowProjectionMatrix(matrix, viewMatrix, renderList) {
    const activeCamera = this.getScene().activeCamera;
    if (!activeCamera) {
      return;
    }
    if (this.autoUpdateExtends || this._orthoLeft === Number.MAX_VALUE) {
      const tempVector3 = Vector3.Zero();
      this._orthoLeft = Number.MAX_VALUE;
      this._orthoRight = -Number.MAX_VALUE;
      this._orthoTop = -Number.MAX_VALUE;
      this._orthoBottom = Number.MAX_VALUE;
      let shadowMinZ = Number.MAX_VALUE;
      let shadowMaxZ = -Number.MAX_VALUE;
      for (let meshIndex = 0; meshIndex < renderList.length; meshIndex++) {
        const mesh = renderList[meshIndex];
        if (!mesh) {
          continue;
        }
        const boundingInfo = mesh.getBoundingInfo();
        const boundingBox = boundingInfo.boundingBox;
        for (let index = 0; index < boundingBox.vectorsWorld.length; index++) {
          Vector3.TransformCoordinatesToRef(boundingBox.vectorsWorld[index], viewMatrix, tempVector3);
          if (tempVector3.x < this._orthoLeft) {
            this._orthoLeft = tempVector3.x;
          }
          if (tempVector3.y < this._orthoBottom) {
            this._orthoBottom = tempVector3.y;
          }
          if (tempVector3.x > this._orthoRight) {
            this._orthoRight = tempVector3.x;
          }
          if (tempVector3.y > this._orthoTop) {
            this._orthoTop = tempVector3.y;
          }
          if (this.autoCalcShadowZBounds) {
            if (tempVector3.z < shadowMinZ) {
              shadowMinZ = tempVector3.z;
            }
            if (tempVector3.z > shadowMaxZ) {
              shadowMaxZ = tempVector3.z;
            }
          }
        }
      }
      if (this.autoCalcShadowZBounds) {
        this._shadowMinZ = shadowMinZ;
        this._shadowMaxZ = shadowMaxZ;
      }
    }
    const xOffset = this._orthoRight - this._orthoLeft;
    const yOffset = this._orthoTop - this._orthoBottom;
    const minZ = this.shadowMinZ !== void 0 ? this.shadowMinZ : activeCamera.minZ;
    const maxZ = this.shadowMaxZ !== void 0 ? this.shadowMaxZ : activeCamera.maxZ;
    const useReverseDepthBuffer = this.getScene().getEngine().useReverseDepthBuffer;
    Matrix.OrthoOffCenterLHToRef(this._orthoLeft - xOffset * this.shadowOrthoScale, this._orthoRight + xOffset * this.shadowOrthoScale, this._orthoBottom - yOffset * this.shadowOrthoScale, this._orthoTop + yOffset * this.shadowOrthoScale, useReverseDepthBuffer ? maxZ : minZ, useReverseDepthBuffer ? minZ : maxZ, matrix, this.getScene().getEngine().isNDCHalfZRange);
  }
  _buildUniformLayout() {
    this._uniformBuffer.addUniform("vLightData", 4);
    this._uniformBuffer.addUniform("vLightDiffuse", 4);
    this._uniformBuffer.addUniform("vLightSpecular", 4);
    this._uniformBuffer.addUniform("shadowsInfo", 3);
    this._uniformBuffer.addUniform("depthValues", 2);
    this._uniformBuffer.create();
  }
  /**
   * Sets the passed Effect object with the DirectionalLight transformed position (or position if not parented) and the passed name.
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The directional light
   */
  transferToEffect(effect, lightIndex) {
    if (this.computeTransformedInformation()) {
      this._uniformBuffer.updateFloat4("vLightData", this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z, 1, lightIndex);
      return this;
    }
    this._uniformBuffer.updateFloat4("vLightData", this.direction.x, this.direction.y, this.direction.z, 1, lightIndex);
    return this;
  }
  transferToNodeMaterialEffect(effect, lightDataUniformName) {
    if (this.computeTransformedInformation()) {
      effect.setFloat3(lightDataUniformName, this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z);
      return this;
    }
    effect.setFloat3(lightDataUniformName, this.direction.x, this.direction.y, this.direction.z);
    return this;
  }
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * (when not using reverse depth buffer / NDC half Z range)
   * @param activeCamera The camera we are returning the min for
   * @returns the depth min z
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDepthMinZ(activeCamera) {
    const engine = this._scene.getEngine();
    return !engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? 0 : 1;
  }
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * (when not using reverse depth buffer / NDC half Z range)
   * @param activeCamera The camera we are returning the max for
   * @returns the depth max z
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDepthMaxZ(activeCamera) {
    const engine = this._scene.getEngine();
    return engine.useReverseDepthBuffer && engine.isNDCHalfZRange ? 0 : 1;
  }
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */
  prepareLightSpecificDefines(defines, lightIndex) {
    defines["DIRLIGHT" + lightIndex] = true;
  }
};
__decorate([
  serialize()
], DirectionalLight.prototype, "shadowFrustumSize", null);
__decorate([
  serialize()
], DirectionalLight.prototype, "shadowOrthoScale", null);
__decorate([
  serialize()
], DirectionalLight.prototype, "autoUpdateExtends", void 0);
__decorate([
  serialize()
], DirectionalLight.prototype, "autoCalcShadowZBounds", void 0);
__decorate([
  serialize("orthoLeft")
], DirectionalLight.prototype, "_orthoLeft", void 0);
__decorate([
  serialize("orthoRight")
], DirectionalLight.prototype, "_orthoRight", void 0);
__decorate([
  serialize("orthoTop")
], DirectionalLight.prototype, "_orthoTop", void 0);
__decorate([
  serialize("orthoBottom")
], DirectionalLight.prototype, "_orthoBottom", void 0);

// node_modules/@babylonjs/core/Maths/sphericalPolynomial.js
var SH3ylmBasisConstants = [
  Math.sqrt(1 / (4 * Math.PI)),
  -Math.sqrt(3 / (4 * Math.PI)),
  Math.sqrt(3 / (4 * Math.PI)),
  -Math.sqrt(3 / (4 * Math.PI)),
  Math.sqrt(15 / (4 * Math.PI)),
  -Math.sqrt(15 / (4 * Math.PI)),
  Math.sqrt(5 / (16 * Math.PI)),
  -Math.sqrt(15 / (4 * Math.PI)),
  Math.sqrt(15 / (16 * Math.PI))
  // l22
];
var SH3ylmBasisTrigonometricTerms = [
  () => 1,
  (direction) => direction.y,
  (direction) => direction.z,
  (direction) => direction.x,
  (direction) => direction.x * direction.y,
  (direction) => direction.y * direction.z,
  (direction) => 3 * direction.z * direction.z - 1,
  (direction) => direction.x * direction.z,
  (direction) => direction.x * direction.x - direction.y * direction.y
  // l22
];
var applySH3 = (lm, direction) => {
  return SH3ylmBasisConstants[lm] * SH3ylmBasisTrigonometricTerms[lm](direction);
};
var SHCosKernelConvolution = [Math.PI, 2 * Math.PI / 3, 2 * Math.PI / 3, 2 * Math.PI / 3, Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4];
var SphericalHarmonics = class _SphericalHarmonics {
  constructor() {
    this.preScaled = false;
    this.l00 = Vector3.Zero();
    this.l1_1 = Vector3.Zero();
    this.l10 = Vector3.Zero();
    this.l11 = Vector3.Zero();
    this.l2_2 = Vector3.Zero();
    this.l2_1 = Vector3.Zero();
    this.l20 = Vector3.Zero();
    this.l21 = Vector3.Zero();
    this.l22 = Vector3.Zero();
  }
  /**
   * Adds a light to the spherical harmonics
   * @param direction the direction of the light
   * @param color the color of the light
   * @param deltaSolidAngle the delta solid angle of the light
   */
  addLight(direction, color, deltaSolidAngle) {
    TmpVectors.Vector3[0].set(color.r, color.g, color.b);
    const colorVector = TmpVectors.Vector3[0];
    const c = TmpVectors.Vector3[1];
    colorVector.scaleToRef(deltaSolidAngle, c);
    c.scaleToRef(applySH3(0, direction), TmpVectors.Vector3[2]);
    this.l00.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(1, direction), TmpVectors.Vector3[2]);
    this.l1_1.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(2, direction), TmpVectors.Vector3[2]);
    this.l10.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(3, direction), TmpVectors.Vector3[2]);
    this.l11.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(4, direction), TmpVectors.Vector3[2]);
    this.l2_2.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(5, direction), TmpVectors.Vector3[2]);
    this.l2_1.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(6, direction), TmpVectors.Vector3[2]);
    this.l20.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(7, direction), TmpVectors.Vector3[2]);
    this.l21.addInPlace(TmpVectors.Vector3[2]);
    c.scaleToRef(applySH3(8, direction), TmpVectors.Vector3[2]);
    this.l22.addInPlace(TmpVectors.Vector3[2]);
  }
  /**
   * Scales the spherical harmonics by the given amount
   * @param scale the amount to scale
   */
  scaleInPlace(scale) {
    this.l00.scaleInPlace(scale);
    this.l1_1.scaleInPlace(scale);
    this.l10.scaleInPlace(scale);
    this.l11.scaleInPlace(scale);
    this.l2_2.scaleInPlace(scale);
    this.l2_1.scaleInPlace(scale);
    this.l20.scaleInPlace(scale);
    this.l21.scaleInPlace(scale);
    this.l22.scaleInPlace(scale);
  }
  /**
   * Convert from incident radiance (Li) to irradiance (E) by applying convolution with the cosine-weighted hemisphere.
   *
   * ```
   * E_lm = A_l * L_lm
   * ```
   *
   * In spherical harmonics this convolution amounts to scaling factors for each frequency band.
   * This corresponds to equation 5 in "An Efficient Representation for Irradiance Environment Maps", where
   * the scaling factors are given in equation 9.
   */
  convertIncidentRadianceToIrradiance() {
    this.l00.scaleInPlace(SHCosKernelConvolution[0]);
    this.l1_1.scaleInPlace(SHCosKernelConvolution[1]);
    this.l10.scaleInPlace(SHCosKernelConvolution[2]);
    this.l11.scaleInPlace(SHCosKernelConvolution[3]);
    this.l2_2.scaleInPlace(SHCosKernelConvolution[4]);
    this.l2_1.scaleInPlace(SHCosKernelConvolution[5]);
    this.l20.scaleInPlace(SHCosKernelConvolution[6]);
    this.l21.scaleInPlace(SHCosKernelConvolution[7]);
    this.l22.scaleInPlace(SHCosKernelConvolution[8]);
  }
  /**
   * Convert from irradiance to outgoing radiance for Lambertian BDRF, suitable for efficient shader evaluation.
   *
   * ```
   * L = (1/pi) * E * rho
   * ```
   *
   * This is done by an additional scale by 1/pi, so is a fairly trivial operation but important conceptually.
   */
  convertIrradianceToLambertianRadiance() {
    this.scaleInPlace(1 / Math.PI);
  }
  /**
   * Integrates the reconstruction coefficients directly in to the SH preventing further
   * required operations at run time.
   *
   * This is simply done by scaling back the SH with Ylm constants parameter.
   * The trigonometric part being applied by the shader at run time.
   */
  preScaleForRendering() {
    this.preScaled = true;
    this.l00.scaleInPlace(SH3ylmBasisConstants[0]);
    this.l1_1.scaleInPlace(SH3ylmBasisConstants[1]);
    this.l10.scaleInPlace(SH3ylmBasisConstants[2]);
    this.l11.scaleInPlace(SH3ylmBasisConstants[3]);
    this.l2_2.scaleInPlace(SH3ylmBasisConstants[4]);
    this.l2_1.scaleInPlace(SH3ylmBasisConstants[5]);
    this.l20.scaleInPlace(SH3ylmBasisConstants[6]);
    this.l21.scaleInPlace(SH3ylmBasisConstants[7]);
    this.l22.scaleInPlace(SH3ylmBasisConstants[8]);
  }
  /**
   * update the spherical harmonics coefficients from the given array
   * @param data defines the 9x3 coefficients (l00, l1-1, l10, l11, l2-2, l2-1, l20, l21, l22)
   * @returns the spherical harmonics (this)
   */
  updateFromArray(data) {
    Vector3.FromArrayToRef(data[0], 0, this.l00);
    Vector3.FromArrayToRef(data[1], 0, this.l1_1);
    Vector3.FromArrayToRef(data[2], 0, this.l10);
    Vector3.FromArrayToRef(data[3], 0, this.l11);
    Vector3.FromArrayToRef(data[4], 0, this.l2_2);
    Vector3.FromArrayToRef(data[5], 0, this.l2_1);
    Vector3.FromArrayToRef(data[6], 0, this.l20);
    Vector3.FromArrayToRef(data[7], 0, this.l21);
    Vector3.FromArrayToRef(data[8], 0, this.l22);
    return this;
  }
  /**
   * update the spherical harmonics coefficients from the given floats array
   * @param data defines the 9x3 coefficients (l00, l1-1, l10, l11, l2-2, l2-1, l20, l21, l22)
   * @returns the spherical harmonics (this)
   */
  updateFromFloatsArray(data) {
    Vector3.FromFloatsToRef(data[0], data[1], data[2], this.l00);
    Vector3.FromFloatsToRef(data[3], data[4], data[5], this.l1_1);
    Vector3.FromFloatsToRef(data[6], data[7], data[8], this.l10);
    Vector3.FromFloatsToRef(data[9], data[10], data[11], this.l11);
    Vector3.FromFloatsToRef(data[12], data[13], data[14], this.l2_2);
    Vector3.FromFloatsToRef(data[15], data[16], data[17], this.l2_1);
    Vector3.FromFloatsToRef(data[18], data[19], data[20], this.l20);
    Vector3.FromFloatsToRef(data[21], data[22], data[23], this.l21);
    Vector3.FromFloatsToRef(data[24], data[25], data[26], this.l22);
    return this;
  }
  /**
   * Constructs a spherical harmonics from an array.
   * @param data defines the 9x3 coefficients (l00, l1-1, l10, l11, l2-2, l2-1, l20, l21, l22)
   * @returns the spherical harmonics
   */
  static FromArray(data) {
    const sh = new _SphericalHarmonics();
    return sh.updateFromArray(data);
  }
  // Keep for references.
  /**
   * Gets the spherical harmonics from polynomial
   * @param polynomial the spherical polynomial
   * @returns the spherical harmonics
   */
  static FromPolynomial(polynomial) {
    const result = new _SphericalHarmonics();
    result.l00 = polynomial.xx.scale(0.376127).add(polynomial.yy.scale(0.376127)).add(polynomial.zz.scale(0.376126));
    result.l1_1 = polynomial.y.scale(0.977204);
    result.l10 = polynomial.z.scale(0.977204);
    result.l11 = polynomial.x.scale(0.977204);
    result.l2_2 = polynomial.xy.scale(1.16538);
    result.l2_1 = polynomial.yz.scale(1.16538);
    result.l20 = polynomial.zz.scale(1.34567).subtract(polynomial.xx.scale(0.672834)).subtract(polynomial.yy.scale(0.672834));
    result.l21 = polynomial.zx.scale(1.16538);
    result.l22 = polynomial.xx.scale(1.16538).subtract(polynomial.yy.scale(1.16538));
    result.l1_1.scaleInPlace(-1);
    result.l11.scaleInPlace(-1);
    result.l2_1.scaleInPlace(-1);
    result.l21.scaleInPlace(-1);
    result.scaleInPlace(Math.PI);
    return result;
  }
};
var SphericalPolynomial = class _SphericalPolynomial {
  constructor() {
    this.x = Vector3.Zero();
    this.y = Vector3.Zero();
    this.z = Vector3.Zero();
    this.xx = Vector3.Zero();
    this.yy = Vector3.Zero();
    this.zz = Vector3.Zero();
    this.xy = Vector3.Zero();
    this.yz = Vector3.Zero();
    this.zx = Vector3.Zero();
  }
  /**
   * The spherical harmonics used to create the polynomials.
   */
  get preScaledHarmonics() {
    if (!this._harmonics) {
      this._harmonics = SphericalHarmonics.FromPolynomial(this);
    }
    if (!this._harmonics.preScaled) {
      this._harmonics.preScaleForRendering();
    }
    return this._harmonics;
  }
  /**
   * Adds an ambient color to the spherical polynomial
   * @param color the color to add
   */
  addAmbient(color) {
    TmpVectors.Vector3[0].copyFromFloats(color.r, color.g, color.b);
    const colorVector = TmpVectors.Vector3[0];
    this.xx.addInPlace(colorVector);
    this.yy.addInPlace(colorVector);
    this.zz.addInPlace(colorVector);
  }
  /**
   * Scales the spherical polynomial by the given amount
   * @param scale the amount to scale
   */
  scaleInPlace(scale) {
    this.x.scaleInPlace(scale);
    this.y.scaleInPlace(scale);
    this.z.scaleInPlace(scale);
    this.xx.scaleInPlace(scale);
    this.yy.scaleInPlace(scale);
    this.zz.scaleInPlace(scale);
    this.yz.scaleInPlace(scale);
    this.zx.scaleInPlace(scale);
    this.xy.scaleInPlace(scale);
  }
  /**
   * Updates the spherical polynomial from harmonics
   * @param harmonics the spherical harmonics
   * @returns the spherical polynomial
   */
  updateFromHarmonics(harmonics) {
    this._harmonics = harmonics;
    this.x.copyFrom(harmonics.l11);
    this.x.scaleInPlace(1.02333).scaleInPlace(-1);
    this.y.copyFrom(harmonics.l1_1);
    this.y.scaleInPlace(1.02333).scaleInPlace(-1);
    this.z.copyFrom(harmonics.l10);
    this.z.scaleInPlace(1.02333);
    this.xx.copyFrom(harmonics.l00);
    TmpVectors.Vector3[0].copyFrom(harmonics.l20).scaleInPlace(0.247708);
    TmpVectors.Vector3[1].copyFrom(harmonics.l22).scaleInPlace(0.429043);
    this.xx.scaleInPlace(0.886277).subtractInPlace(TmpVectors.Vector3[0]).addInPlace(TmpVectors.Vector3[1]);
    this.yy.copyFrom(harmonics.l00);
    this.yy.scaleInPlace(0.886277).subtractInPlace(TmpVectors.Vector3[0]).subtractInPlace(TmpVectors.Vector3[1]);
    this.zz.copyFrom(harmonics.l00);
    TmpVectors.Vector3[0].copyFrom(harmonics.l20).scaleInPlace(0.495417);
    this.zz.scaleInPlace(0.886277).addInPlace(TmpVectors.Vector3[0]);
    this.yz.copyFrom(harmonics.l2_1);
    this.yz.scaleInPlace(0.858086).scaleInPlace(-1);
    this.zx.copyFrom(harmonics.l21);
    this.zx.scaleInPlace(0.858086).scaleInPlace(-1);
    this.xy.copyFrom(harmonics.l2_2);
    this.xy.scaleInPlace(0.858086);
    this.scaleInPlace(1 / Math.PI);
    return this;
  }
  /**
   * Gets the spherical polynomial from harmonics
   * @param harmonics the spherical harmonics
   * @returns the spherical polynomial
   */
  static FromHarmonics(harmonics) {
    const result = new _SphericalPolynomial();
    return result.updateFromHarmonics(harmonics);
  }
  /**
   * Constructs a spherical polynomial from an array.
   * @param data defines the 9x3 coefficients (x, y, z, xx, yy, zz, yz, zx, xy)
   * @returns the spherical polynomial
   */
  static FromArray(data) {
    const sp = new _SphericalPolynomial();
    Vector3.FromArrayToRef(data[0], 0, sp.x);
    Vector3.FromArrayToRef(data[1], 0, sp.y);
    Vector3.FromArrayToRef(data[2], 0, sp.z);
    Vector3.FromArrayToRef(data[3], 0, sp.xx);
    Vector3.FromArrayToRef(data[4], 0, sp.yy);
    Vector3.FromArrayToRef(data[5], 0, sp.zz);
    Vector3.FromArrayToRef(data[6], 0, sp.yz);
    Vector3.FromArrayToRef(data[7], 0, sp.zx);
    Vector3.FromArrayToRef(data[8], 0, sp.xy);
    return sp;
  }
};

// node_modules/@babylonjs/core/Shaders/hdrFiltering.vertex.js
var name = "hdrFilteringVertexShader";
var shader = `attribute vec2 position;varying vec3 direction;uniform vec3 up;uniform vec3 right;uniform vec3 front;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
mat3 view=mat3(up,right,front);direction=view*vec3(position,1.0);gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;
ShaderStore.ShadersStore[name] = shader;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/importanceSampling.js
var name2 = "importanceSampling";
var shader2 = `vec3 hemisphereCosSample(vec2 u) {float phi=2.*PI*u.x;float cosTheta2=1.-u.y;float cosTheta=sqrt(cosTheta2);float sinTheta=sqrt(1.-cosTheta2);return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}
vec3 hemisphereImportanceSampleDggx(vec2 u,float a) {float phi=2.*PI*u.x;float cosTheta2=(1.-u.y)/(1.+(a+1.)*((a-1.)*u.y));float cosTheta=sqrt(cosTheta2);float sinTheta=sqrt(1.-cosTheta2);return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}
vec3 hemisphereImportanceSampleDCharlie(vec2 u,float a) { 
float phi=2.*PI*u.x;float sinTheta=pow(u.y,a/(2.*a+1.));float cosTheta=sqrt(1.-sinTheta*sinTheta);return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}`;
ShaderStore.IncludesShadersStore[name2] = shader2;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/pbrBRDFFunctions.js
var name3 = "pbrBRDFFunctions";
var shader3 = `#define FRESNEL_MAXIMUM_ON_ROUGH 0.25
#ifdef MS_BRDF_ENERGY_CONSERVATION
vec3 getEnergyConservationFactor(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {return 1.0+specularEnvironmentR0*(1.0/environmentBrdf.y-1.0);}
#endif
#ifdef ENVIRONMENTBRDF
vec3 getBRDFLookup(float NdotV,float perceptualRoughness) {vec2 UV=vec2(NdotV,perceptualRoughness);vec4 brdfLookup=texture2D(environmentBrdfSampler,UV);
#ifdef ENVIRONMENTBRDF_RGBD
brdfLookup.rgb=fromRGBD(brdfLookup.rgba);
#endif
return brdfLookup.rgb;}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 specularEnvironmentR90,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=(specularEnvironmentR90-specularEnvironmentR0)*environmentBrdf.x+specularEnvironmentR0*environmentBrdf.y;
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+specularEnvironmentR90*environmentBrdf.y;
#endif
return reflectance;}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=mix(environmentBrdf.xxx,environmentBrdf.yyy,specularEnvironmentR0);
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+environmentBrdf.y;
#endif
return reflectance;}
#endif
/* NOT USED
#if defined(SHEEN) && defined(SHEEN_SOFTER)
float getBRDFLookupCharlieSheen(float NdotV,float perceptualRoughness)
{float c=1.0-NdotV;float c3=c*c*c;return 0.65584461*c3+1.0/(4.16526551+exp(-7.97291361*perceptualRoughness+6.33516894));}
#endif
*/
#if !defined(ENVIRONMENTBRDF) || defined(REFLECTIONMAP_SKYBOX) || defined(ALPHAFRESNEL)
vec3 getReflectanceFromAnalyticalBRDFLookup_Jones(float VdotN,vec3 reflectance0,vec3 reflectance90,float smoothness)
{float weight=mix(FRESNEL_MAXIMUM_ON_ROUGH,1.0,smoothness);return reflectance0+weight*(reflectance90-reflectance0)*pow5(saturate(1.0-VdotN));}
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)
/**
* The sheen BRDF not containing F can be easily stored in the blue channel of the BRDF texture.
* The blue channel contains DCharlie*VAshikhmin*NdotL as a lokkup table
*/
vec3 getSheenReflectanceFromBRDFLookup(const vec3 reflectance0,const vec3 environmentBrdf) {vec3 sheenEnvironmentReflectance=reflectance0*environmentBrdf.b;return sheenEnvironmentReflectance;}
#endif
vec3 fresnelSchlickGGX(float VdotH,vec3 reflectance0,vec3 reflectance90)
{return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);}
float fresnelSchlickGGX(float VdotH,float reflectance0,float reflectance90)
{return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);}
#ifdef CLEARCOAT
vec3 getR0RemappedForClearCoat(vec3 f0) {
#ifdef CLEARCOAT_DEFAULTIOR
#ifdef MOBILE
return saturate(f0*(f0*0.526868+0.529324)-0.0482256);
#else
return saturate(f0*(f0*(0.941892-0.263008*f0)+0.346479)-0.0285998);
#endif
#else
vec3 s=sqrt(f0);vec3 t=(vClearCoatRefractionParams.z+vClearCoatRefractionParams.w*s)/(vClearCoatRefractionParams.w+vClearCoatRefractionParams.z*s);return square(t);
#endif
}
#endif
#ifdef IRIDESCENCE
const mat3 XYZ_TO_REC709=mat3(
3.2404542,-0.9692660, 0.0556434,
-1.5371385, 1.8760108,-0.2040259,
-0.4985314, 0.0415560, 1.0572252
);vec3 getIORTfromAirToSurfaceR0(vec3 f0) {vec3 sqrtF0=sqrt(f0);return (1.+sqrtF0)/(1.-sqrtF0);}
vec3 getR0fromIORs(vec3 iorT,float iorI) {return square((iorT-vec3(iorI))/(iorT+vec3(iorI)));}
float getR0fromIORs(float iorT,float iorI) {return square((iorT-iorI)/(iorT+iorI));}
vec3 evalSensitivity(float opd,vec3 shift) {float phase=2.0*PI*opd*1.0e-9;const vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);const vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);const vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-square(phase)*var);xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*square(phase));xyz/=1.0685e-7;vec3 srgb=XYZ_TO_REC709*xyz;return srgb;}
vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0) {vec3 I=vec3(1.0);float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));float sinTheta2Sq=square(outsideIOR/iridescenceIOR)*(1.0-square(cosTheta1));float cosTheta2Sq=1.0-sinTheta2Sq;if (cosTheta2Sq<0.0) {return I;}
float cosTheta2=sqrt(cosTheta2Sq);float R0=getR0fromIORs(iridescenceIOR,outsideIOR);float R12=fresnelSchlickGGX(cosTheta1,R0,1.);float R21=R12;float T121=1.0-R12;float phi12=0.0;if (iridescenceIOR<outsideIOR) phi12=PI;float phi21=PI-phi12;vec3 baseIOR=getIORTfromAirToSurfaceR0(clamp(baseF0,0.0,0.9999)); 
vec3 R1=getR0fromIORs(baseIOR,iridescenceIOR);vec3 R23=fresnelSchlickGGX(cosTheta2,R1,vec3(1.));vec3 phi23=vec3(0.0);if (baseIOR[0]<iridescenceIOR) phi23[0]=PI;if (baseIOR[1]<iridescenceIOR) phi23[1]=PI;if (baseIOR[2]<iridescenceIOR) phi23[2]=PI;float opd=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,0.9999);vec3 r123=sqrt(R123);vec3 Rs=square(T121)*R23/(vec3(1.0)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for (int m=1; m<=2; ++m)
{Cm*=r123;vec3 Sm=2.0*evalSensitivity(float(m)*opd,float(m)*phi);I+=Cm*Sm;}
return max(I,vec3(0.0));}
#endif
float normalDistributionFunction_TrowbridgeReitzGGX(float NdotH,float alphaG)
{float a2=square(alphaG);float d=NdotH*NdotH*(a2-1.0)+1.0;return a2/(PI*d*d);}
#ifdef SHEEN
float normalDistributionFunction_CharlieSheen(float NdotH,float alphaG)
{float invR=1./alphaG;float cos2h=NdotH*NdotH;float sin2h=1.-cos2h;return (2.+invR)*pow(sin2h,invR*.5)/(2.*PI);}
#endif
#ifdef ANISOTROPIC
float normalDistributionFunction_BurleyGGX_Anisotropic(float NdotH,float TdotH,float BdotH,const vec2 alphaTB) {float a2=alphaTB.x*alphaTB.y;vec3 v=vec3(alphaTB.y*TdotH,alphaTB.x *BdotH,a2*NdotH);float v2=dot(v,v);float w2=a2/v2;return a2*w2*w2*RECIPROCAL_PI;}
#endif
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility_GGXCorrelated(float NdotL,float NdotV,float alphaG) {
#ifdef MOBILE
float GGXV=NdotL*(NdotV*(1.0-alphaG)+alphaG);float GGXL=NdotV*(NdotL*(1.0-alphaG)+alphaG);return 0.5/(GGXV+GGXL);
#else
float a2=alphaG*alphaG;float GGXV=NdotL*sqrt(NdotV*(NdotV-a2*NdotV)+a2);float GGXL=NdotV*sqrt(NdotL*(NdotL-a2*NdotL)+a2);return 0.5/(GGXV+GGXL);
#endif
}
#else
float smithVisibilityG1_TrowbridgeReitzGGXFast(float dot,float alphaG)
{
#ifdef MOBILE
return 1.0/(dot+alphaG+(1.0-alphaG)*dot ));
#else
float alphaSquared=alphaG*alphaG;return 1.0/(dot+sqrt(alphaSquared+(1.0-alphaSquared)*dot*dot));
#endif
}
float smithVisibility_TrowbridgeReitzGGXFast(float NdotL,float NdotV,float alphaG)
{float visibility=smithVisibilityG1_TrowbridgeReitzGGXFast(NdotL,alphaG)*smithVisibilityG1_TrowbridgeReitzGGXFast(NdotV,alphaG);return visibility;}
#endif
#ifdef ANISOTROPIC
float smithVisibility_GGXCorrelated_Anisotropic(float NdotL,float NdotV,float TdotV,float BdotV,float TdotL,float BdotL,const vec2 alphaTB) {float lambdaV=NdotL*length(vec3(alphaTB.x*TdotV,alphaTB.y*BdotV,NdotV));float lambdaL=NdotV*length(vec3(alphaTB.x*TdotL,alphaTB.y*BdotL,NdotL));float v=0.5/(lambdaV+lambdaL);return v;}
#endif
#ifdef CLEARCOAT
float visibility_Kelemen(float VdotH) {return 0.25/(VdotH*VdotH); }
#endif
#ifdef SHEEN
float visibility_Ashikhmin(float NdotL,float NdotV)
{return 1./(4.*(NdotL+NdotV-NdotL*NdotV));}
/* NOT USED
#ifdef SHEEN_SOFTER
float l(float x,float alphaG)
{float oneMinusAlphaSq=(1.0-alphaG)*(1.0-alphaG);float a=mix(21.5473,25.3245,oneMinusAlphaSq);float b=mix(3.82987,3.32435,oneMinusAlphaSq);float c=mix(0.19823,0.16801,oneMinusAlphaSq);float d=mix(-1.97760,-1.27393,oneMinusAlphaSq);float e=mix(-4.32054,-4.85967,oneMinusAlphaSq);return a/(1.0+b*pow(x,c))+d*x+e;}
float lambdaSheen(float cosTheta,float alphaG)
{return abs(cosTheta)<0.5 ? exp(l(cosTheta,alphaG)) : exp(2.0*l(0.5,alphaG)-l(1.0-cosTheta,alphaG));}
float visibility_CharlieSheen(float NdotL,float NdotV,float alphaG)
{float G=1.0/(1.0+lambdaSheen(NdotV,alphaG)+lambdaSheen(NdotL,alphaG));return G/(4.0*NdotV*NdotL);}
#endif
*/
#endif
float diffuseBRDF_Burley(float NdotL,float NdotV,float VdotH,float roughness) {float diffuseFresnelNV=pow5(saturateEps(1.0-NdotL));float diffuseFresnelNL=pow5(saturateEps(1.0-NdotV));float diffuseFresnel90=0.5+2.0*VdotH*VdotH*roughness;float fresnel =
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNL) *
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNV);return fresnel/PI;}
#ifdef SS_TRANSLUCENCY
vec3 transmittanceBRDF_Burley(const vec3 tintColor,const vec3 diffusionDistance,float thickness) {vec3 S=1./maxEps(diffusionDistance);vec3 temp=exp((-0.333333333*thickness)*S);return tintColor.rgb*0.25*(temp*temp*temp+3.0*temp);}
float computeWrappedDiffuseNdotL(float NdotL,float w) {float t=1.0+w;float invt2=1.0/square(t);return saturate((NdotL+w)*invt2);}
#endif
`;
ShaderStore.IncludesShadersStore[name3] = shader3;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/hdrFilteringFunctions.js
var name4 = "hdrFilteringFunctions";
var shader4 = `#ifdef NUM_SAMPLES
#if NUM_SAMPLES>0
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
float radicalInverse_VdC(uint bits) 
{bits=(bits<<16u) | (bits>>16u);bits=((bits & 0x55555555u)<<1u) | ((bits & 0xAAAAAAAAu)>>1u);bits=((bits & 0x33333333u)<<2u) | ((bits & 0xCCCCCCCCu)>>2u);bits=((bits & 0x0F0F0F0Fu)<<4u) | ((bits & 0xF0F0F0F0u)>>4u);bits=((bits & 0x00FF00FFu)<<8u) | ((bits & 0xFF00FF00u)>>8u);return float(bits)*2.3283064365386963e-10; }
vec2 hammersley(uint i,uint N)
{return vec2(float(i)/float(N),radicalInverse_VdC(i));}
#else
float vanDerCorpus(int n,int base)
{float invBase=1.0/float(base);float denom =1.0;float result =0.0;for(int i=0; i<32; ++i)
{if(n>0)
{denom =mod(float(n),2.0);result+=denom*invBase;invBase=invBase/2.0;n =int(float(n)/2.0);}}
return result;}
vec2 hammersley(int i,int N)
{return vec2(float(i)/float(N),vanDerCorpus(i,2));}
#endif
float log4(float x) {return log2(x)/2.;}
const float NUM_SAMPLES_FLOAT=float(NUM_SAMPLES);const float NUM_SAMPLES_FLOAT_INVERSED=1./NUM_SAMPLES_FLOAT;const float K=4.;
#define inline
vec3 irradiance(samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)
{vec3 n=normalize(inputN);vec3 result=vec3(0.0);vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);tangent=normalize(cross(tangent,n));vec3 bitangent=cross(n,tangent);mat3 tbn=mat3(tangent,bitangent,n);float maxLevel=filteringInfo.y;float dim0=filteringInfo.x;float omegaP=(4.*PI)/(6.*dim0*dim0);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{vec2 Xi=hammersley(i,NUM_SAMPLES);vec3 Ls=hemisphereCosSample(Xi);Ls=normalize(Ls);vec3 Ns=vec3(0.,0.,1.);float NoL=dot(Ns,Ls);if (NoL>0.) {float pdf_inversed=PI/NoL;float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;float l=log4(omegaS)-log4(omegaP)+log4(K);float mipLevel=clamp(l,0.0,maxLevel);vec3 c=textureCubeLodEXT(inputTexture,tbn*Ls,mipLevel).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c;}}
result=result*NUM_SAMPLES_FLOAT_INVERSED;return result;}
#define inline
vec3 radiance(float alphaG,samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)
{vec3 n=normalize(inputN);vec3 c=textureCube(inputTexture,n).rgb; 
if (alphaG==0.) {
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
return c;} else {vec3 result=vec3(0.);vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);tangent=normalize(cross(tangent,n));vec3 bitangent=cross(n,tangent);mat3 tbn=mat3(tangent,bitangent,n);float maxLevel=filteringInfo.y;float dim0=filteringInfo.x;float omegaP=(4.*PI)/(6.*dim0*dim0);float weight=0.;
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{vec2 Xi=hammersley(i,NUM_SAMPLES);vec3 H=hemisphereImportanceSampleDggx(Xi,alphaG);float NoV=1.;float NoH=H.z;float NoH2=H.z*H.z;float NoL=2.*NoH2-1.;vec3 L=vec3(2.*NoH*H.x,2.*NoH*H.y,NoL);L=normalize(L);if (NoL>0.) {float pdf_inversed=4./normalDistributionFunction_TrowbridgeReitzGGX(NoH,alphaG);float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;float l=log4(omegaS)-log4(omegaP)+log4(K);float mipLevel=clamp(float(l),0.0,maxLevel);weight+=NoL;vec3 c=textureCubeLodEXT(inputTexture,tbn*L,mipLevel).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c*NoL;}}
result=result/weight;return result;}}
#endif
#endif
`;
ShaderStore.IncludesShadersStore[name4] = shader4;

// node_modules/@babylonjs/core/Shaders/hdrFiltering.fragment.js
var name5 = "hdrFilteringPixelShader";
var shader5 = `#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;
ShaderStore.ShadersStore[name5] = shader5;

// node_modules/@babylonjs/core/Materials/Textures/Filtering/hdrFiltering.js
var HDRFiltering = class {
  /**
   * Instantiates HDR filter for reflection maps
   *
   * @param engine Thin engine
   * @param options Options
   */
  constructor(engine, options = {}) {
    this._lodGenerationOffset = 0;
    this._lodGenerationScale = 0.8;
    this.quality = 4096;
    this.hdrScale = 1;
    this._engine = engine;
    this.hdrScale = options.hdrScale || this.hdrScale;
    this.quality = options.quality || this.quality;
  }
  _createRenderTarget(size) {
    let textureType = 0;
    if (this._engine.getCaps().textureHalfFloatRender) {
      textureType = 2;
    } else if (this._engine.getCaps().textureFloatRender) {
      textureType = 1;
    }
    const rtWrapper = this._engine.createRenderTargetCubeTexture(size, {
      format: 5,
      type: textureType,
      createMipMaps: true,
      generateMipMaps: false,
      generateDepthBuffer: false,
      generateStencilBuffer: false,
      samplingMode: 1
    });
    this._engine.updateTextureWrappingMode(rtWrapper.texture, 0, 0, 0);
    this._engine.updateTextureSamplingMode(3, rtWrapper.texture, true);
    return rtWrapper;
  }
  _prefilterInternal(texture) {
    const width = texture.getSize().width;
    const mipmapsCount = Scalar.ILog2(width) + 1;
    const effect = this._effectWrapper.effect;
    const outputTexture = this._createRenderTarget(width);
    this._effectRenderer.saveStates();
    this._effectRenderer.setViewport();
    const intTexture = texture.getInternalTexture();
    if (intTexture) {
      this._engine.updateTextureSamplingMode(3, intTexture, true);
    }
    this._effectRenderer.applyEffectWrapper(this._effectWrapper);
    const directions = [
      [new Vector3(0, 0, -1), new Vector3(0, -1, 0), new Vector3(1, 0, 0)],
      [new Vector3(0, 0, 1), new Vector3(0, -1, 0), new Vector3(-1, 0, 0)],
      [new Vector3(1, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 0)],
      [new Vector3(1, 0, 0), new Vector3(0, 0, -1), new Vector3(0, -1, 0)],
      [new Vector3(1, 0, 0), new Vector3(0, -1, 0), new Vector3(0, 0, 1)],
      [new Vector3(-1, 0, 0), new Vector3(0, -1, 0), new Vector3(0, 0, -1)]
      // NegativeZ
    ];
    effect.setFloat("hdrScale", this.hdrScale);
    effect.setFloat2("vFilteringInfo", texture.getSize().width, mipmapsCount);
    effect.setTexture("inputTexture", texture);
    for (let face = 0; face < 6; face++) {
      effect.setVector3("up", directions[face][0]);
      effect.setVector3("right", directions[face][1]);
      effect.setVector3("front", directions[face][2]);
      for (let lod = 0; lod < mipmapsCount; lod++) {
        this._engine.bindFramebuffer(outputTexture, face, void 0, void 0, true, lod);
        this._effectRenderer.applyEffectWrapper(this._effectWrapper);
        let alpha = Math.pow(2, (lod - this._lodGenerationOffset) / this._lodGenerationScale) / width;
        if (lod === 0) {
          alpha = 0;
        }
        effect.setFloat("alphaG", alpha);
        this._effectRenderer.draw();
      }
    }
    this._effectRenderer.restoreStates();
    this._engine.restoreDefaultFramebuffer();
    this._engine._releaseTexture(texture._texture);
    const type = outputTexture.texture.type;
    const format = outputTexture.texture.format;
    outputTexture._swapAndDie(texture._texture);
    texture._texture.type = type;
    texture._texture.format = format;
    texture.gammaSpace = false;
    texture.lodGenerationOffset = this._lodGenerationOffset;
    texture.lodGenerationScale = this._lodGenerationScale;
    texture._prefiltered = true;
    return texture;
  }
  _createEffect(texture, onCompiled) {
    const defines = [];
    if (texture.gammaSpace) {
      defines.push("#define GAMMA_INPUT");
    }
    defines.push("#define NUM_SAMPLES " + this.quality + "u");
    const effectWrapper = new EffectWrapper({
      engine: this._engine,
      name: "hdrFiltering",
      vertexShader: "hdrFiltering",
      fragmentShader: "hdrFiltering",
      samplerNames: ["inputTexture"],
      uniformNames: ["vSampleDirections", "vWeights", "up", "right", "front", "vFilteringInfo", "hdrScale", "alphaG"],
      useShaderStore: true,
      defines,
      onCompiled
    });
    return effectWrapper;
  }
  /**
   * Get a value indicating if the filter is ready to be used
   * @param texture Texture to filter
   * @returns true if the filter is ready
   */
  isReady(texture) {
    return texture.isReady() && this._effectWrapper.effect.isReady();
  }
  /**
   * Prefilters a cube texture to have mipmap levels representing roughness values.
   * Prefiltering will be invoked at the end of next rendering pass.
   * This has to be done once the map is loaded, and has not been prefiltered by a third party software.
   * See http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf for more information
   * @param texture Texture to filter
   * @param onFinished Callback when filtering is done
   * @returns Promise called when prefiltering is done
   */
  prefilter(texture, onFinished = null) {
    if (!this._engine._features.allowTexturePrefiltering) {
      Logger.Warn("HDR prefiltering is not available in WebGL 1., you can use real time filtering instead.");
      return Promise.reject("HDR prefiltering is not available in WebGL 1., you can use real time filtering instead.");
    }
    return new Promise((resolve) => {
      this._effectRenderer = new EffectRenderer(this._engine);
      this._effectWrapper = this._createEffect(texture);
      this._effectWrapper.effect.executeWhenCompiled(() => {
        this._prefilterInternal(texture);
        this._effectRenderer.dispose();
        this._effectWrapper.dispose();
        resolve();
        if (onFinished) {
          onFinished();
        }
      });
    });
  }
};

// node_modules/@babylonjs/core/XR/features/WebXRLightEstimation.js
var WebXRLightEstimation = class extends WebXRAbstractFeature {
  /**
   * Creates a new instance of the light estimation feature
   * @param _xrSessionManager an instance of WebXRSessionManager
   * @param options options to use when constructing this feature
   */
  constructor(_xrSessionManager, options) {
    super(_xrSessionManager);
    this.options = options;
    this._canvasContext = null;
    this._reflectionCubeMap = null;
    this._xrLightEstimate = null;
    this._xrLightProbe = null;
    this._xrWebGLBinding = null;
    this._lightDirection = Vector3.Up().negateInPlace();
    this._lightColor = Color3.White();
    this._intensity = 1;
    this._sphericalHarmonics = new SphericalHarmonics();
    this._cubeMapPollTime = Date.now();
    this._lightEstimationPollTime = Date.now();
    this._reflectionCubeMapTextureSize = 16;
    this.directionalLight = null;
    this.onReflectionCubeMapUpdatedObservable = new Observable();
    this._updateReflectionCubeMap = () => {
      var _a;
      if (!this._xrLightProbe) {
        return;
      }
      if (this.options.cubeMapPollInterval) {
        const now = Date.now();
        if (now - this._cubeMapPollTime < this.options.cubeMapPollInterval) {
          return;
        }
        this._cubeMapPollTime = now;
      }
      const lp = this._getXRGLBinding().getReflectionCubeMap(this._xrLightProbe);
      if (lp && this._reflectionCubeMap) {
        if (!this._reflectionCubeMap._texture) {
          const internalTexture = new InternalTexture(this._xrSessionManager.scene.getEngine(), InternalTextureSource.Unknown);
          internalTexture.isCube = true;
          internalTexture.invertY = false;
          internalTexture._useSRGBBuffer = this.options.reflectionFormat === "srgba8";
          internalTexture.format = 5;
          internalTexture.generateMipMaps = true;
          internalTexture.type = this.options.reflectionFormat !== "srgba8" ? 2 : 0;
          internalTexture.samplingMode = 3;
          internalTexture.width = this._reflectionCubeMapTextureSize;
          internalTexture.height = this._reflectionCubeMapTextureSize;
          internalTexture._cachedWrapU = 1;
          internalTexture._cachedWrapV = 1;
          internalTexture._hardwareTexture = new WebGLHardwareTexture(lp, this._getCanvasContext());
          this._reflectionCubeMap._texture = internalTexture;
        } else {
          (_a = this._reflectionCubeMap._texture._hardwareTexture) == null ? void 0 : _a.set(lp);
          this._reflectionCubeMap._texture.getEngine().resetTextureCache();
        }
        this._reflectionCubeMap._texture.isReady = true;
        if (!this.options.disablePreFiltering) {
          this._xrLightProbe.removeEventListener("reflectionchange", this._updateReflectionCubeMap);
          this._hdrFilter.prefilter(this._reflectionCubeMap).then(() => {
            this._xrSessionManager.scene.markAllMaterialsAsDirty(1);
            this.onReflectionCubeMapUpdatedObservable.notifyObservers(this._reflectionCubeMap);
            this._xrLightProbe.addEventListener("reflectionchange", this._updateReflectionCubeMap);
          });
        } else {
          this._xrSessionManager.scene.markAllMaterialsAsDirty(1);
          this.onReflectionCubeMapUpdatedObservable.notifyObservers(this._reflectionCubeMap);
        }
      }
    };
    this.xrNativeFeatureName = "light-estimation";
    if (this.options.createDirectionalLightSource) {
      this.directionalLight = new DirectionalLight("light estimation directional", this._lightDirection, this._xrSessionManager.scene);
      this.directionalLight.position = new Vector3(0, 8, 0);
      this.directionalLight.intensity = 0;
      this.directionalLight.falloffType = LightConstants.FALLOFF_GLTF;
    }
    this._hdrFilter = new HDRFiltering(this._xrSessionManager.scene.getEngine());
    Tools.Warn("light-estimation is an experimental and unstable feature.");
  }
  /**
   * While the estimated cube map is expected to update over time to better reflect the user's environment as they move around those changes are unlikely to happen with every XRFrame.
   * Since creating and processing the cube map is potentially expensive, especially if mip maps are needed, you can listen to the onReflectionCubeMapUpdatedObservable to determine
   * when it has been updated.
   */
  get reflectionCubeMapTexture() {
    return this._reflectionCubeMap;
  }
  /**
   * The most recent light estimate.  Available starting on the first frame where the device provides a light probe.
   */
  get xrLightingEstimate() {
    if (this._xrLightEstimate) {
      return {
        lightColor: this._lightColor,
        lightDirection: this._lightDirection,
        lightIntensity: this._intensity,
        sphericalHarmonics: this._sphericalHarmonics
      };
    }
    return this._xrLightEstimate;
  }
  _getCanvasContext() {
    if (this._canvasContext === null) {
      this._canvasContext = this._xrSessionManager.scene.getEngine()._gl;
    }
    return this._canvasContext;
  }
  _getXRGLBinding() {
    if (this._xrWebGLBinding === null) {
      const context = this._getCanvasContext();
      this._xrWebGLBinding = new XRWebGLBinding(this._xrSessionManager.session, context);
    }
    return this._xrWebGLBinding;
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
    const reflectionFormat = this.options.reflectionFormat ?? (this._xrSessionManager.session.preferredReflectionFormat || "srgba8");
    this.options.reflectionFormat = reflectionFormat;
    this._xrSessionManager.session.requestLightProbe({
      reflectionFormat
    }).then((xrLightProbe) => {
      this._xrLightProbe = xrLightProbe;
      if (!this.options.disableCubeMapReflection) {
        if (!this._reflectionCubeMap) {
          this._reflectionCubeMap = new BaseTexture(this._xrSessionManager.scene);
          this._reflectionCubeMap._isCube = true;
          this._reflectionCubeMap.coordinatesMode = 3;
          if (this.options.setSceneEnvironmentTexture) {
            this._xrSessionManager.scene.environmentTexture = this._reflectionCubeMap;
          }
        }
        this._xrLightProbe.addEventListener("reflectionchange", this._updateReflectionCubeMap);
      }
    });
    return true;
  }
  /**
   * detach this feature.
   * Will usually be called by the features manager
   *
   * @returns true if successful.
   */
  detach() {
    const detached = super.detach();
    if (this._xrLightProbe !== null && !this.options.disableCubeMapReflection) {
      this._xrLightProbe.removeEventListener("reflectionchange", this._updateReflectionCubeMap);
      this._xrLightProbe = null;
    }
    this._canvasContext = null;
    this._xrLightEstimate = null;
    this._xrWebGLBinding = null;
    return detached;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this.onReflectionCubeMapUpdatedObservable.clear();
    if (this.directionalLight) {
      this.directionalLight.dispose();
      this.directionalLight = null;
    }
    if (this._reflectionCubeMap !== null) {
      if (this._reflectionCubeMap._texture) {
        this._reflectionCubeMap._texture.dispose();
      }
      this._reflectionCubeMap.dispose();
      this._reflectionCubeMap = null;
    }
  }
  _onXRFrame(_xrFrame) {
    var _a;
    if (this._xrLightProbe !== null) {
      if (this.options.lightEstimationPollInterval) {
        const now = Date.now();
        if (now - this._lightEstimationPollTime < this.options.lightEstimationPollInterval) {
          return;
        }
        this._lightEstimationPollTime = now;
      }
      this._xrLightEstimate = _xrFrame.getLightEstimate(this._xrLightProbe);
      if (this._xrLightEstimate) {
        this._intensity = Math.max(1, this._xrLightEstimate.primaryLightIntensity.x, this._xrLightEstimate.primaryLightIntensity.y, this._xrLightEstimate.primaryLightIntensity.z);
        const rhsFactor = this._xrSessionManager.scene.useRightHandedSystem ? 1 : -1;
        if (this.options.disableVectorReuse) {
          this._lightDirection = new Vector3();
          this._lightColor = new Color3();
          if (this.directionalLight) {
            this.directionalLight.direction = this._lightDirection;
            this.directionalLight.diffuse = this._lightColor;
          }
        }
        this._lightDirection.copyFromFloats(this._xrLightEstimate.primaryLightDirection.x, this._xrLightEstimate.primaryLightDirection.y, this._xrLightEstimate.primaryLightDirection.z * rhsFactor);
        this._lightColor.copyFromFloats(this._xrLightEstimate.primaryLightIntensity.x / this._intensity, this._xrLightEstimate.primaryLightIntensity.y / this._intensity, this._xrLightEstimate.primaryLightIntensity.z / this._intensity);
        this._sphericalHarmonics.updateFromFloatsArray(this._xrLightEstimate.sphericalHarmonicsCoefficients);
        if (this._reflectionCubeMap && !this.options.disableSphericalPolynomial) {
          this._reflectionCubeMap.sphericalPolynomial = this._reflectionCubeMap.sphericalPolynomial || new SphericalPolynomial();
          (_a = this._reflectionCubeMap.sphericalPolynomial) == null ? void 0 : _a.updateFromHarmonics(this._sphericalHarmonics);
        }
        this._lightDirection.negateInPlace();
        if (this.directionalLight) {
          this.directionalLight.direction.copyFrom(this._lightDirection);
          this.directionalLight.intensity = Math.min(this._intensity, 1);
          this.directionalLight.diffuse.copyFrom(this._lightColor);
        }
      }
    }
  }
};
WebXRLightEstimation.Name = WebXRFeatureName.LIGHT_ESTIMATION;
WebXRLightEstimation.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRLightEstimation.Name, (xrSessionManager, options) => {
  return () => new WebXRLightEstimation(xrSessionManager, options);
}, WebXRLightEstimation.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXREyeTracking.js
var WebXREyeTracking = class extends WebXRAbstractFeature {
  /**
   * Creates a new instance of the XR eye tracking feature.
   * @param _xrSessionManager An instance of WebXRSessionManager.
   */
  constructor(_xrSessionManager) {
    super(_xrSessionManager);
    this.onEyeTrackingStartedObservable = new Observable();
    this.onEyeTrackingEndedObservable = new Observable();
    this.onEyeTrackingFrameUpdateObservable = new Observable();
    this._eyeTrackingStartListener = (event) => {
      this._latestEyeSpace = event.gazeSpace;
      this._gazeRay = new Ray(Vector3.Zero(), Vector3.Forward());
      this.onEyeTrackingStartedObservable.notifyObservers(this._gazeRay);
    };
    this._eyeTrackingEndListener = () => {
      this._latestEyeSpace = null;
      this._gazeRay = null;
      this.onEyeTrackingEndedObservable.notifyObservers();
    };
    this.xrNativeFeatureName = "eye-tracking";
    if (this._xrSessionManager.session) {
      this._init();
    } else {
      this._xrSessionManager.onXRSessionInit.addOnce(() => {
        this._init();
      });
    }
  }
  /**
   * Dispose this feature and all of the resources attached.
   */
  dispose() {
    super.dispose();
    this._xrSessionManager.session.removeEventListener("eyetrackingstart", this._eyeTrackingStartListener);
    this._xrSessionManager.session.removeEventListener("eyetrackingend", this._eyeTrackingEndListener);
    this.onEyeTrackingStartedObservable.clear();
    this.onEyeTrackingEndedObservable.clear();
    this.onEyeTrackingFrameUpdateObservable.clear();
  }
  /**
   * Returns whether the gaze data is valid or not
   * @returns true if the data is valid
   */
  get isEyeGazeValid() {
    return !!this._gazeRay;
  }
  /**
   * Get a reference to the gaze ray. This data is valid while eye tracking persists, and will be set to null when gaze data is no longer available
   * @returns a reference to the gaze ray if it exists and is valid, returns null otherwise.
   */
  getEyeGaze() {
    return this._gazeRay;
  }
  _onXRFrame(frame) {
    if (!this.attached || !frame) {
      return;
    }
    if (this._latestEyeSpace && this._gazeRay) {
      const pose = frame.getPose(this._latestEyeSpace, this._xrSessionManager.referenceSpace);
      if (pose) {
        this._gazeRay.origin.set(pose.transform.position.x, pose.transform.position.y, pose.transform.position.z).scaleInPlace(this._xrSessionManager.worldScalingFactor);
        const quat = pose.transform.orientation;
        TmpVectors.Quaternion[0].set(quat.x, quat.y, quat.z, quat.w);
        if (!this._xrSessionManager.scene.useRightHandedSystem) {
          this._gazeRay.origin.z *= -1;
          TmpVectors.Quaternion[0].z *= -1;
          TmpVectors.Quaternion[0].w *= -1;
          Vector3.LeftHandedForwardReadOnly.rotateByQuaternionToRef(TmpVectors.Quaternion[0], this._gazeRay.direction);
        } else {
          Vector3.RightHandedForwardReadOnly.rotateByQuaternionToRef(TmpVectors.Quaternion[0], this._gazeRay.direction);
        }
        this.onEyeTrackingFrameUpdateObservable.notifyObservers(this._gazeRay);
      }
    }
  }
  _init() {
    if (this._xrSessionManager.isNative) {
      this._xrSessionManager.session.addEventListener("eyetrackingstart", this._eyeTrackingStartListener);
      this._xrSessionManager.session.addEventListener("eyetrackingend", this._eyeTrackingEndListener);
    }
  }
};
WebXREyeTracking.Name = WebXRFeatureName.EYE_TRACKING;
WebXREyeTracking.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXREyeTracking.Name, (xrSessionManager) => {
  return () => new WebXREyeTracking(xrSessionManager);
}, WebXREyeTracking.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXRWalkingLocomotion.js
var CircleBuffer = class {
  constructor(numSamples, initializer) {
    this._samples = [];
    this._idx = 0;
    for (let idx = 0; idx < numSamples; ++idx) {
      this._samples.push(initializer ? initializer() : Vector2.Zero());
    }
  }
  get length() {
    return this._samples.length;
  }
  push(x, y) {
    this._idx = (this._idx + this._samples.length - 1) % this._samples.length;
    this.at(0).copyFromFloats(x, y);
  }
  at(idx) {
    if (idx >= this._samples.length) {
      throw new Error("Index out of bounds");
    }
    return this._samples[(this._idx + idx) % this._samples.length];
  }
};
var FirstStepDetector = class {
  constructor() {
    this._samples = new CircleBuffer(20);
    this._entropy = 0;
    this.onFirstStepDetected = new Observable();
  }
  update(posX, posY, forwardX, forwardY) {
    this._samples.push(posX, posY);
    const origin = this._samples.at(0);
    this._entropy *= this._entropyDecayFactor;
    this._entropy += Vector2.Distance(origin, this._samples.at(1));
    if (this._entropy > this._entropyThreshold) {
      return;
    }
    let samePointIdx;
    for (samePointIdx = this._samePointCheckStartIdx; samePointIdx < this._samples.length; ++samePointIdx) {
      if (Vector2.DistanceSquared(origin, this._samples.at(samePointIdx)) < this._samePointSquaredDistanceThreshold) {
        break;
      }
    }
    if (samePointIdx === this._samples.length) {
      return;
    }
    let apexDistSquared = -1;
    let apexIdx = 0;
    for (let distSquared, idx = 1; idx < samePointIdx; ++idx) {
      distSquared = Vector2.DistanceSquared(origin, this._samples.at(idx));
      if (distSquared > apexDistSquared) {
        apexIdx = idx;
        apexDistSquared = distSquared;
      }
    }
    if (apexDistSquared < this._apexSquaredDistanceThreshold) {
      return;
    }
    const apex = this._samples.at(apexIdx);
    const axis = apex.subtract(origin);
    axis.normalize();
    const vec = TmpVectors.Vector2[0];
    let dot;
    let sample;
    let sumSquaredProjectionDistances = 0;
    for (let idx = 1; idx < samePointIdx; ++idx) {
      sample = this._samples.at(idx);
      sample.subtractToRef(origin, vec);
      dot = Vector2.Dot(axis, vec);
      sumSquaredProjectionDistances += vec.lengthSquared() - dot * dot;
    }
    if (sumSquaredProjectionDistances > samePointIdx * this._squaredProjectionDistanceThreshold) {
      return;
    }
    const forwardVec = TmpVectors.Vector3[0];
    forwardVec.set(forwardX, forwardY, 0);
    const axisVec = TmpVectors.Vector3[1];
    axisVec.set(axis.x, axis.y, 0);
    const isApexLeft = Vector3.Cross(forwardVec, axisVec).z > 0;
    const leftApex = origin.clone();
    const rightApex = origin.clone();
    apex.subtractToRef(origin, axis);
    if (isApexLeft) {
      axis.scaleAndAddToRef(this._axisToApexShrinkFactor, leftApex);
      axis.scaleAndAddToRef(this._axisToApexExtendFactor, rightApex);
    } else {
      axis.scaleAndAddToRef(this._axisToApexExtendFactor, leftApex);
      axis.scaleAndAddToRef(this._axisToApexShrinkFactor, rightApex);
    }
    this.onFirstStepDetected.notifyObservers({
      leftApex,
      rightApex,
      currentPosition: origin,
      currentStepDirection: isApexLeft ? "right" : "left"
    });
  }
  reset() {
    for (let idx = 0; idx < this._samples.length; ++idx) {
      this._samples.at(idx).copyFromFloats(0, 0);
    }
  }
  get _samePointCheckStartIdx() {
    return Math.floor(this._samples.length / 3);
  }
  get _samePointSquaredDistanceThreshold() {
    return 0.03 * 0.03;
  }
  get _apexSquaredDistanceThreshold() {
    return 0.09 * 0.09;
  }
  get _squaredProjectionDistanceThreshold() {
    return 0.03 * 0.03;
  }
  get _axisToApexShrinkFactor() {
    return 0.8;
  }
  get _axisToApexExtendFactor() {
    return -1.6;
  }
  get _entropyDecayFactor() {
    return 0.93;
  }
  get _entropyThreshold() {
    return 0.4;
  }
};
var WalkingTracker = class {
  constructor(leftApex, rightApex, currentPosition, currentStepDirection) {
    this._leftApex = new Vector2();
    this._rightApex = new Vector2();
    this._currentPosition = new Vector2();
    this._axis = new Vector2();
    this._axisLength = -1;
    this._forward = new Vector2();
    this._steppingLeft = false;
    this._t = -1;
    this._maxT = -1;
    this._maxTPosition = new Vector2();
    this._vitality = 0;
    this.onMovement = new Observable();
    this.onFootfall = new Observable();
    this._reset(leftApex, rightApex, currentPosition, currentStepDirection === "left");
  }
  _reset(leftApex, rightApex, currentPosition, steppingLeft) {
    this._leftApex.copyFrom(leftApex);
    this._rightApex.copyFrom(rightApex);
    this._steppingLeft = steppingLeft;
    if (this._steppingLeft) {
      this._leftApex.subtractToRef(this._rightApex, this._axis);
      this._forward.copyFromFloats(-this._axis.y, this._axis.x);
    } else {
      this._rightApex.subtractToRef(this._leftApex, this._axis);
      this._forward.copyFromFloats(this._axis.y, -this._axis.x);
    }
    this._axisLength = this._axis.length();
    this._forward.scaleInPlace(1 / this._axisLength);
    this._updateTAndVitality(currentPosition.x, currentPosition.y);
    this._maxT = this._t;
    this._maxTPosition.copyFrom(currentPosition);
    this._vitality = 1;
  }
  _updateTAndVitality(x, y) {
    this._currentPosition.copyFromFloats(x, y);
    if (this._steppingLeft) {
      this._currentPosition.subtractInPlace(this._rightApex);
    } else {
      this._currentPosition.subtractInPlace(this._leftApex);
    }
    const priorT = this._t;
    const dot = Vector2.Dot(this._currentPosition, this._axis);
    this._t = dot / (this._axisLength * this._axisLength);
    const projDistSquared = this._currentPosition.lengthSquared() - dot / this._axisLength * (dot / this._axisLength);
    this._vitality *= 0.92 - 100 * Math.max(projDistSquared - 16e-4, 0) + Math.max(this._t - priorT, 0);
  }
  update(x, y) {
    if (this._vitality < this._vitalityThreshold) {
      return false;
    }
    const priorT = this._t;
    this._updateTAndVitality(x, y);
    if (this._t > this._maxT) {
      this._maxT = this._t;
      this._maxTPosition.copyFromFloats(x, y);
    }
    if (this._vitality < this._vitalityThreshold) {
      return false;
    }
    if (this._t > priorT) {
      this.onMovement.notifyObservers({ deltaT: this._t - priorT });
      if (priorT < 0.5 && this._t >= 0.5) {
        this.onFootfall.notifyObservers({ foot: this._steppingLeft ? "left" : "right" });
      }
    }
    if (this._t < 0.95 * this._maxT) {
      this._currentPosition.copyFromFloats(x, y);
      if (this._steppingLeft) {
        this._leftApex.copyFrom(this._maxTPosition);
      } else {
        this._rightApex.copyFrom(this._maxTPosition);
      }
      this._reset(this._leftApex, this._rightApex, this._currentPosition, !this._steppingLeft);
    }
    if (this._axisLength < 0.03) {
      return false;
    }
    return true;
  }
  get _vitalityThreshold() {
    return 0.1;
  }
  get forward() {
    return this._forward;
  }
};
var Walker = class _Walker {
  static get _MillisecondsPerUpdate() {
    return 1e3 / 15;
  }
  constructor(engine) {
    this._detector = new FirstStepDetector();
    this._walker = null;
    this._movement = new Vector2();
    this._millisecondsSinceLastUpdate = _Walker._MillisecondsPerUpdate;
    this.movementThisFrame = Vector3.Zero();
    this._engine = engine;
    this._detector.onFirstStepDetected.add((event) => {
      if (!this._walker) {
        this._walker = new WalkingTracker(event.leftApex, event.rightApex, event.currentPosition, event.currentStepDirection);
        this._walker.onFootfall.add(() => {
          Logger.Log("Footfall!");
        });
        this._walker.onMovement.add((event2) => {
          this._walker.forward.scaleAndAddToRef(0.024 * event2.deltaT, this._movement);
        });
      }
    });
  }
  update(position, forward) {
    forward.y = 0;
    forward.normalize();
    this._millisecondsSinceLastUpdate += this._engine.getDeltaTime();
    if (this._millisecondsSinceLastUpdate >= _Walker._MillisecondsPerUpdate) {
      this._millisecondsSinceLastUpdate -= _Walker._MillisecondsPerUpdate;
      this._detector.update(position.x, position.z, forward.x, forward.z);
      if (this._walker) {
        const updated = this._walker.update(position.x, position.z);
        if (!updated) {
          this._walker = null;
        }
      }
      this._movement.scaleInPlace(0.85);
    }
    this.movementThisFrame.set(this._movement.x, 0, this._movement.y);
  }
};
var WebXRWalkingLocomotion = class extends WebXRAbstractFeature {
  /**
   * The module's name.
   */
  static get Name() {
    return WebXRFeatureName.WALKING_LOCOMOTION;
  }
  /**
   * The (Babylon) version of this module.
   * This is an integer representing the implementation version.
   * This number has no external basis.
   */
  static get Version() {
    return 1;
  }
  /**
   * The target to be articulated by walking locomotion.
   * When the walking locomotion feature detects walking in place, this element's
   * X and Z coordinates will be modified to reflect locomotion. This target should
   * be either the XR space's origin (i.e., the parent node of the WebXRCamera) or
   * the WebXRCamera itself. Note that the WebXRCamera path will modify the position
   * of the WebXRCamera directly and is thus discouraged.
   */
  get locomotionTarget() {
    return this._locomotionTarget;
  }
  /**
   * The target to be articulated by walking locomotion.
   * When the walking locomotion feature detects walking in place, this element's
   * X and Z coordinates will be modified to reflect locomotion. This target should
   * be either the XR space's origin (i.e., the parent node of the WebXRCamera) or
   * the WebXRCamera itself. Note that the WebXRCamera path will modify the position
   * of the WebXRCamera directly and is thus discouraged.
   */
  set locomotionTarget(locomotionTarget) {
    this._locomotionTarget = locomotionTarget;
    this._isLocomotionTargetWebXRCamera = this._locomotionTarget.getClassName() === "WebXRCamera";
  }
  /**
   * Construct a new Walking Locomotion feature.
   * @param sessionManager manager for the current XR session
   * @param options creation options, prominently including the vector target for locomotion
   */
  constructor(sessionManager, options) {
    super(sessionManager);
    this._up = new Vector3();
    this._forward = new Vector3();
    this._position = new Vector3();
    this._movement = new Vector3();
    this._sessionManager = sessionManager;
    this.locomotionTarget = options.locomotionTarget;
    if (this._isLocomotionTargetWebXRCamera) {
      Logger.Warn("Using walking locomotion directly on a WebXRCamera may have unintended interactions with other XR techniques. Using an XR space parent is highly recommended");
    }
  }
  /**
   * Checks whether this feature is compatible with the current WebXR session.
   * Walking locomotion is only compatible with "immersive-vr" sessions.
   * @returns true if compatible, false otherwise
   */
  isCompatible() {
    return this._sessionManager.sessionMode === void 0 || this._sessionManager.sessionMode === "immersive-vr";
  }
  /**
   * Attaches the feature.
   * Typically called automatically by the features manager.
   * @returns true if attach succeeded, false otherwise
   */
  attach() {
    if (!this.isCompatible || !super.attach()) {
      return false;
    }
    this._walker = new Walker(this._sessionManager.scene.getEngine());
    return true;
  }
  /**
   * Detaches the feature.
   * Typically called automatically by the features manager.
   * @returns true if detach succeeded, false otherwise
   */
  detach() {
    if (!super.detach()) {
      return false;
    }
    this._walker = null;
    return true;
  }
  _onXRFrame(frame) {
    const pose = frame.getViewerPose(this._sessionManager.baseReferenceSpace);
    if (!pose) {
      return;
    }
    const handednessScalar = this.locomotionTarget.getScene().useRightHandedSystem ? 1 : -1;
    const m = pose.transform.matrix;
    this._up.copyFromFloats(m[4], m[5], handednessScalar * m[6]);
    this._forward.copyFromFloats(m[8], m[9], handednessScalar * m[10]);
    this._position.copyFromFloats(m[12], m[13], handednessScalar * m[14]);
    this._forward.scaleAndAddToRef(0.05, this._position);
    this._up.scaleAndAddToRef(-0.05, this._position);
    this._walker.update(this._position, this._forward);
    this._movement.copyFrom(this._walker.movementThisFrame);
    if (!this._isLocomotionTargetWebXRCamera) {
      Vector3.TransformNormalToRef(this._movement, this.locomotionTarget.getWorldMatrix(), this._movement);
    }
    this.locomotionTarget.position.addInPlace(this._movement);
  }
};
WebXRFeaturesManager.AddWebXRFeature(WebXRWalkingLocomotion.Name, (xrSessionManager, options) => {
  return () => new WebXRWalkingLocomotion(xrSessionManager, options);
}, WebXRWalkingLocomotion.Version, false);

// node_modules/@babylonjs/core/XR/features/Layers/WebXRCompositionLayer.js
var WebXRCompositionLayerWrapper = class extends WebXRLayerWrapper {
  constructor(getWidth, getHeight, layer, layerType, isMultiview, createRTTProvider, _originalInternalTexture = null) {
    super(getWidth, getHeight, layer, layerType, createRTTProvider);
    this.getWidth = getWidth;
    this.getHeight = getHeight;
    this.layer = layer;
    this.layerType = layerType;
    this.isMultiview = isMultiview;
    this.createRTTProvider = createRTTProvider;
    this._originalInternalTexture = _originalInternalTexture;
  }
};
var WebXRCompositionLayerRenderTargetTextureProvider = class extends WebXRLayerRenderTargetTextureProvider {
  constructor(_xrSessionManager, _xrWebGLBinding, layerWrapper) {
    super(_xrSessionManager.scene, layerWrapper);
    this._xrSessionManager = _xrSessionManager;
    this._xrWebGLBinding = _xrWebGLBinding;
    this.layerWrapper = layerWrapper;
    this._lastSubImages = /* @__PURE__ */ new Map();
    this.onRenderTargetTextureCreatedObservable = new Observable();
    this._compositionLayer = layerWrapper.layer;
  }
  _getRenderTargetForSubImage(subImage, eye = "none") {
    const lastSubImage = this._lastSubImages.get(eye);
    const eyeIndex = eye == "right" ? 1 : 0;
    const colorTextureWidth = subImage.colorTextureWidth ?? subImage.textureWidth;
    const colorTextureHeight = subImage.colorTextureHeight ?? subImage.textureHeight;
    if (!this._renderTargetTextures[eyeIndex] || (lastSubImage == null ? void 0 : lastSubImage.textureWidth) !== colorTextureWidth || (lastSubImage == null ? void 0 : lastSubImage.textureHeight) !== colorTextureHeight) {
      let depthStencilTexture;
      const depthStencilTextureWidth = subImage.depthStencilTextureWidth ?? colorTextureWidth;
      const depthStencilTextureHeight = subImage.depthStencilTextureHeight ?? colorTextureHeight;
      if (colorTextureWidth === depthStencilTextureWidth || colorTextureHeight === depthStencilTextureHeight) {
        depthStencilTexture = subImage.depthStencilTexture;
      }
      this._renderTargetTextures[eyeIndex] = this._createRenderTargetTexture(colorTextureWidth, colorTextureHeight, null, subImage.colorTexture, depthStencilTexture, this.layerWrapper.isMultiview);
      this._framebufferDimensions = {
        framebufferWidth: colorTextureWidth,
        framebufferHeight: colorTextureHeight
      };
      this.onRenderTargetTextureCreatedObservable.notifyObservers({ texture: this._renderTargetTextures[eyeIndex], eye });
    }
    this._lastSubImages.set(eye, subImage);
    return this._renderTargetTextures[eyeIndex];
  }
  _getSubImageForEye(eye) {
    const currentFrame = this._xrSessionManager.currentFrame;
    if (currentFrame) {
      return this._xrWebGLBinding.getSubImage(this._compositionLayer, currentFrame, eye);
    }
    return null;
  }
  getRenderTargetTextureForEye(eye) {
    const subImage = this._getSubImageForEye(eye);
    if (subImage) {
      return this._getRenderTargetForSubImage(subImage, eye);
    }
    return null;
  }
  getRenderTargetTextureForView(view) {
    return this.getRenderTargetTextureForEye(view == null ? void 0 : view.eye);
  }
  _setViewportForSubImage(viewport, subImage) {
    const textureWidth = subImage.colorTextureWidth ?? subImage.textureWidth;
    const textureHeight = subImage.colorTextureHeight ?? subImage.textureHeight;
    const xrViewport = subImage.viewport;
    viewport.x = xrViewport.x / textureWidth;
    viewport.y = xrViewport.y / textureHeight;
    viewport.width = xrViewport.width / textureWidth;
    viewport.height = xrViewport.height / textureHeight;
  }
  trySetViewportForView(viewport, view) {
    const subImage = this._lastSubImages.get(view.eye) || this._getSubImageForEye(view.eye);
    if (subImage) {
      this._setViewportForSubImage(viewport, subImage);
      return true;
    }
    return false;
  }
};

// node_modules/@babylonjs/core/XR/features/Layers/WebXRProjectionLayer.js
var WebXRProjectionLayerWrapper = class extends WebXRCompositionLayerWrapper {
  constructor(layer, isMultiview, xrGLBinding) {
    super(() => layer.textureWidth, () => layer.textureHeight, layer, "XRProjectionLayer", isMultiview, (sessionManager) => new WebXRProjectionLayerRenderTargetTextureProvider(sessionManager, xrGLBinding, this));
    this.layer = layer;
  }
};
var WebXRProjectionLayerRenderTargetTextureProvider = class extends WebXRCompositionLayerRenderTargetTextureProvider {
  constructor(_xrSessionManager, _xrWebGLBinding, layerWrapper) {
    super(_xrSessionManager, _xrWebGLBinding, layerWrapper);
    this.layerWrapper = layerWrapper;
    this._projectionLayer = layerWrapper.layer;
  }
  _getSubImageForView(view) {
    return this._xrWebGLBinding.getViewSubImage(this._projectionLayer, view);
  }
  getRenderTargetTextureForView(view) {
    return this._getRenderTargetForSubImage(this._getSubImageForView(view), view.eye);
  }
  getRenderTargetTextureForEye(eye) {
    const lastSubImage = this._lastSubImages.get(eye);
    if (lastSubImage) {
      return this._getRenderTargetForSubImage(lastSubImage, eye);
    }
    return null;
  }
  trySetViewportForView(viewport, view) {
    const subImage = this._lastSubImages.get(view.eye) || this._getSubImageForView(view);
    if (subImage) {
      this._setViewportForSubImage(viewport, subImage);
      return true;
    }
    return false;
  }
};
var defaultXRProjectionLayerInit = {
  textureType: "texture",
  colorFormat: 6408,
  depthFormat: 35056,
  scaleFactor: 1,
  clearOnAccess: false
};

// node_modules/@babylonjs/core/XR/features/WebXRLayers.js
var defaultXRWebGLLayerInit = {};
var WebXRLayers = class extends WebXRAbstractFeature {
  constructor(_xrSessionManager, _options = {}) {
    super(_xrSessionManager);
    this._options = _options;
    this._existingLayers = [];
    this._isMultiviewEnabled = false;
    this._projectionLayerInitialized = false;
    this._compositionLayerTextureMapping = /* @__PURE__ */ new WeakMap();
    this._layerToRTTProviderMapping = /* @__PURE__ */ new WeakMap();
    this.xrNativeFeatureName = "layers";
  }
  /**
   * Attach this feature.
   * Will usually be called by the features manager.
   *
   * @returns true if successful.
   */
  attach() {
    if (!super.attach()) {
      return false;
    }
    const engine = this._xrSessionManager.scene.getEngine();
    this._glContext = engine._gl;
    this._xrWebGLBinding = new XRWebGLBinding(this._xrSessionManager.session, this._glContext);
    this._existingLayers.length = 0;
    const projectionLayerInit = { ...defaultXRProjectionLayerInit, ...this._options.projectionLayerInit };
    this._isMultiviewEnabled = this._options.preferMultiviewOnInit && engine.getCaps().multiview;
    this.createProjectionLayer(
      projectionLayerInit
      /*, projectionLayerMultiview*/
    );
    this._projectionLayerInitialized = true;
    return true;
  }
  detach() {
    if (!super.detach()) {
      return false;
    }
    this._existingLayers.forEach((layer) => {
      layer.dispose();
    });
    this._existingLayers.length = 0;
    this._projectionLayerInitialized = false;
    return true;
  }
  /**
   * Creates a new XRWebGLLayer.
   * @param params an object providing configuration options for the new XRWebGLLayer
   * @returns the XRWebGLLayer
   */
  createXRWebGLLayer(params = defaultXRWebGLLayerInit) {
    const layer = new XRWebGLLayer(this._xrSessionManager.session, this._glContext, params);
    return new WebXRWebGLLayerWrapper(layer);
  }
  _validateLayerInit(params, multiview = this._isMultiviewEnabled) {
    if (!this._xrSessionManager.inXRSession) {
      throw new Error("Cannot create a layer outside of a WebXR session. Make sure the session has started before creating layers.");
    }
    if (multiview && params.textureType !== "texture-array") {
      throw new Error("Projection layers can only be made multiview if they use texture arrays. Set the textureType parameter to 'texture-array'.");
    }
    if (!multiview && params.textureType === "texture-array") {
      throw new Error("We currently only support multiview rendering when the textureType parameter is set to 'texture-array'.");
    }
  }
  _extendXRLayerInit(params, multiview = this._isMultiviewEnabled) {
    if (multiview) {
      params.textureType = "texture-array";
    }
    return params;
  }
  /**
   * Creates a new XRProjectionLayer.
   * @param params an object providing configuration options for the new XRProjectionLayer.
   * @param multiview whether the projection layer should render with multiview. Will be tru automatically if the extension initialized with multiview.
   * @returns the projection layer
   */
  createProjectionLayer(params = defaultXRProjectionLayerInit, multiview = this._isMultiviewEnabled) {
    this._extendXRLayerInit(params, multiview);
    this._validateLayerInit(params, multiview);
    const projLayer = this._xrWebGLBinding.createProjectionLayer(params);
    const layer = new WebXRProjectionLayerWrapper(projLayer, multiview, this._xrWebGLBinding);
    this.addXRSessionLayer(layer);
    return layer;
  }
  /**
   * Note about making it private - this function will be exposed once I decide on a proper API to support all of the XR layers' options
   * @param options an object providing configuration options for the new XRQuadLayer.
   * @param babylonTexture the texture to display in the layer
   * @returns the quad layer
   */
  _createQuadLayer(options = { params: {} }, babylonTexture) {
    this._extendXRLayerInit(options.params, false);
    const width = this._existingLayers[0].layer.textureWidth;
    const height = this._existingLayers[0].layer.textureHeight;
    const populatedParams = {
      space: this._xrSessionManager.referenceSpace,
      viewPixelWidth: width,
      viewPixelHeight: height,
      clearOnAccess: true,
      ...options.params
    };
    this._validateLayerInit(populatedParams, false);
    const quadLayer = this._xrWebGLBinding.createQuadLayer(populatedParams);
    quadLayer.width = this._isMultiviewEnabled ? 1 : 2;
    quadLayer.height = 1;
    const wrapper = new WebXRCompositionLayerWrapper(() => quadLayer.width, () => quadLayer.height, quadLayer, "XRQuadLayer", false, (sessionManager) => new WebXRCompositionLayerRenderTargetTextureProvider(sessionManager, this._xrWebGLBinding, wrapper));
    if (babylonTexture) {
      this._compositionLayerTextureMapping.set(quadLayer, babylonTexture);
    }
    const rtt = wrapper.createRenderTargetTextureProvider(this._xrSessionManager);
    this._layerToRTTProviderMapping.set(quadLayer, rtt);
    this.addXRSessionLayer(wrapper);
    return wrapper;
  }
  /**
   * @experimental
   * This will support full screen ADT when used with WebXR Layers. This API might change in the future.
   * Note that no interaction will be available with the ADT when using this method
   * @param texture the texture to display in the layer
   * @param options optional parameters for the layer
   * @returns a composition layer containing the texture
   */
  addFullscreenAdvancedDynamicTexture(texture, options = { distanceFromHeadset: 1.5 }) {
    const wrapper = this._createQuadLayer({
      params: {
        space: this._xrSessionManager.viewerReferenceSpace,
        textureType: "texture",
        layout: "mono"
      }
    }, texture);
    const layer = wrapper.layer;
    const distance = Math.max(0.1, options.distanceFromHeadset);
    const pos = { x: 0, y: 0, z: -distance };
    const orient = { x: 0, y: 0, z: 0, w: 1 };
    layer.transform = new XRRigidTransform(pos, orient);
    const rttProvider = this._layerToRTTProviderMapping.get(layer);
    if (!rttProvider) {
      throw new Error("Could not find the RTT provider for the layer");
    }
    const babylonLayer = this._xrSessionManager.scene.layers.find((babylonLayer2) => {
      return babylonLayer2.texture === texture;
    });
    if (!babylonLayer) {
      throw new Error("Could not find the babylon layer for the texture");
    }
    rttProvider.onRenderTargetTextureCreatedObservable.add((data) => {
      if (data.eye && data.eye === "right") {
        return;
      }
      data.texture.clearColor = new Color4(0, 0, 0, 0);
      babylonLayer.renderTargetTextures.push(data.texture);
      babylonLayer.renderOnlyInRenderTargetTextures = true;
      this._xrSessionManager.scene.onBeforeRenderObservable.add(() => {
        data.texture.render();
      });
      babylonLayer.renderTargetTextures.push(data.texture);
      babylonLayer.renderOnlyInRenderTargetTextures = true;
      this._xrSessionManager.onXRSessionEnded.addOnce(() => {
        babylonLayer.renderTargetTextures.splice(babylonLayer.renderTargetTextures.indexOf(data.texture), 1);
        babylonLayer.renderOnlyInRenderTargetTextures = false;
      });
    });
    return wrapper;
  }
  /**
   * @experimental
   * This functions allows you to add a lens flare system to the XR scene.
   * Note - this will remove the lens flare system from the scene and add it to the XR scene.
   * This feature is experimental and might change in the future.
   * @param flareSystem the flare system to add
   * @returns a composition layer containing the flare system
   */
  _addLensFlareSystem(flareSystem) {
    const wrapper = this._createQuadLayer({
      params: {
        space: this._xrSessionManager.viewerReferenceSpace,
        textureType: "texture",
        layout: "mono"
      }
    });
    const layer = wrapper.layer;
    layer.width = 2;
    layer.height = 1;
    const distance = 10;
    const pos = { x: 0, y: 0, z: -distance };
    const orient = { x: 0, y: 0, z: 0, w: 1 };
    layer.transform = new XRRigidTransform(pos, orient);
    const rttProvider = this._layerToRTTProviderMapping.get(layer);
    if (!rttProvider) {
      throw new Error("Could not find the RTT provider for the layer");
    }
    rttProvider.onRenderTargetTextureCreatedObservable.add((data) => {
      data.texture.clearColor = new Color4(0, 0, 0, 0);
      data.texture.customRenderFunction = () => {
        flareSystem.render();
      };
    });
    this._xrSessionManager.onXRSessionInit.add(() => {
      this._xrSessionManager.scene.lensFlareSystems.splice(this._xrSessionManager.scene.lensFlareSystems.indexOf(flareSystem), 1);
    });
    this._xrSessionManager.onXRSessionEnded.add(() => {
      this._xrSessionManager.scene.lensFlareSystems.push(flareSystem);
    });
    return wrapper;
  }
  /**
   * Add a new layer to the already-existing list of layers
   * @param wrappedLayer the new layer to add to the existing ones
   */
  addXRSessionLayer(wrappedLayer) {
    this._existingLayers.push(wrappedLayer);
    this.setXRSessionLayers(this._existingLayers);
  }
  /**
   * Sets the layers to be used by the XR session.
   * Note that you must call this function with any layers you wish to render to
   * since it adds them to the XR session's render state
   * (replacing any layers that were added in a previous call to setXRSessionLayers or updateRenderState).
   * This method also sets up the session manager's render target texture provider
   * as the first layer in the array, which feeds the WebXR camera(s) attached to the session.
   * @param wrappedLayers An array of WebXRLayerWrapper, usually returned from the WebXRLayers createLayer functions.
   */
  setXRSessionLayers(wrappedLayers = this._existingLayers) {
    const renderStateInit = { ...this._xrSessionManager.session.renderState };
    renderStateInit.baseLayer = void 0;
    renderStateInit.layers = wrappedLayers.map((wrappedLayer) => wrappedLayer.layer);
    this._xrSessionManager.updateRenderState(renderStateInit);
    if (!this._projectionLayerInitialized) {
      this._xrSessionManager._setBaseLayerWrapper(wrappedLayers.length > 0 ? wrappedLayers.at(0) : null);
    }
  }
  isCompatible() {
    return !this._xrSessionManager.isNative && typeof XRWebGLBinding !== "undefined" && !!XRWebGLBinding.prototype.createProjectionLayer;
  }
  /**
   * Dispose this feature and all of the resources attached.
   */
  dispose() {
    super.dispose();
  }
  _onXRFrame(_xrFrame) {
    const layers = this._existingLayers;
    for (let i = 0; i < layers.length; ++i) {
      const layer = layers[i];
      if (layer.layerType !== "XRProjectionLayer") {
        const rttProvider = this._layerToRTTProviderMapping.get(layer.layer);
        if (!rttProvider) {
          continue;
        }
        if (rttProvider.layerWrapper.isMultiview) {
          const pose = _xrFrame.getViewerPose(this._xrSessionManager.referenceSpace);
          if (pose) {
            const views = pose.views;
            for (let j = 0; j < views.length; ++j) {
              const view = views[j];
              rttProvider.getRenderTargetTextureForView(view);
            }
          }
        } else {
          rttProvider.getRenderTargetTextureForView();
        }
      }
    }
  }
};
WebXRLayers.Name = WebXRFeatureName.LAYERS;
WebXRLayers.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRLayers.Name, (xrSessionManager, options) => {
  return () => new WebXRLayers(xrSessionManager, options);
}, WebXRLayers.Version, false);

// node_modules/@babylonjs/core/Engines/Extensions/engine.rawTexture.js
ThinEngine.prototype.updateRawTexture = function(texture, data, format, invertY, compression = null, type = 0, useSRGBBuffer = false) {
  if (!texture) {
    return;
  }
  const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type, format, useSRGBBuffer);
  const internalFormat = this._getInternalFormat(format);
  const textureType = this._getWebGLTextureType(type);
  this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true);
  this._unpackFlipY(invertY === void 0 ? true : invertY ? true : false);
  if (!this._doNotHandleContextLost) {
    texture._bufferView = data;
    texture.format = format;
    texture.type = type;
    texture.invertY = invertY;
    texture._compression = compression;
  }
  if (texture.width % 4 !== 0) {
    this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1);
  }
  if (compression && data) {
    this._gl.compressedTexImage2D(this._gl.TEXTURE_2D, 0, this.getCaps().s3tc[compression], texture.width, texture.height, 0, data);
  } else {
    this._gl.texImage2D(this._gl.TEXTURE_2D, 0, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, data);
  }
  if (texture.generateMipMaps) {
    this._gl.generateMipmap(this._gl.TEXTURE_2D);
  }
  this._bindTextureDirectly(this._gl.TEXTURE_2D, null);
  texture.isReady = true;
};
ThinEngine.prototype.createRawTexture = function(data, width, height, format, generateMipMaps, invertY, samplingMode, compression = null, type = 0, creationFlags = 0, useSRGBBuffer = false) {
  const texture = new InternalTexture(this, InternalTextureSource.Raw);
  texture.baseWidth = width;
  texture.baseHeight = height;
  texture.width = width;
  texture.height = height;
  texture.format = format;
  texture.generateMipMaps = generateMipMaps;
  texture.samplingMode = samplingMode;
  texture.invertY = invertY;
  texture._compression = compression;
  texture.type = type;
  texture._useSRGBBuffer = this._getUseSRGBBuffer(useSRGBBuffer, !generateMipMaps);
  if (!this._doNotHandleContextLost) {
    texture._bufferView = data;
  }
  this.updateRawTexture(texture, data, format, invertY, compression, type, texture._useSRGBBuffer);
  this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true);
  const filters = this._getSamplingParameters(samplingMode, generateMipMaps);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, filters.mag);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, filters.min);
  if (generateMipMaps) {
    this._gl.generateMipmap(this._gl.TEXTURE_2D);
  }
  this._bindTextureDirectly(this._gl.TEXTURE_2D, null);
  this._internalTexturesCache.push(texture);
  return texture;
};
ThinEngine.prototype.createRawCubeTexture = function(data, size, format, type, generateMipMaps, invertY, samplingMode, compression = null) {
  const gl = this._gl;
  const texture = new InternalTexture(this, InternalTextureSource.CubeRaw);
  texture.isCube = true;
  texture.format = format;
  texture.type = type;
  if (!this._doNotHandleContextLost) {
    texture._bufferViewArray = data;
  }
  const textureType = this._getWebGLTextureType(type);
  let internalFormat = this._getInternalFormat(format);
  if (internalFormat === gl.RGB) {
    internalFormat = gl.RGBA;
  }
  if (textureType === gl.FLOAT && !this._caps.textureFloatLinearFiltering) {
    generateMipMaps = false;
    samplingMode = 1;
    Logger.Warn("Float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.");
  } else if (textureType === this._gl.HALF_FLOAT_OES && !this._caps.textureHalfFloatLinearFiltering) {
    generateMipMaps = false;
    samplingMode = 1;
    Logger.Warn("Half float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.");
  } else if (textureType === gl.FLOAT && !this._caps.textureFloatRender) {
    generateMipMaps = false;
    Logger.Warn("Render to float textures is not supported. Mipmap generation forced to false.");
  } else if (textureType === gl.HALF_FLOAT && !this._caps.colorBufferFloat) {
    generateMipMaps = false;
    Logger.Warn("Render to half float textures is not supported. Mipmap generation forced to false.");
  }
  const width = size;
  const height = width;
  texture.width = width;
  texture.height = height;
  texture.invertY = invertY;
  texture._compression = compression;
  const isPot = !this.needPOTTextures || Tools.IsExponentOfTwo(texture.width) && Tools.IsExponentOfTwo(texture.height);
  if (!isPot) {
    generateMipMaps = false;
  }
  if (data) {
    this.updateRawCubeTexture(texture, data, format, type, invertY, compression);
  } else {
    const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type);
    const level = 0;
    this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      if (compression) {
        gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, this.getCaps().s3tc[compression], texture.width, texture.height, 0, void 0);
      } else {
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, null);
      }
    }
    this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);
  }
  this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, texture, true);
  if (data && generateMipMaps) {
    this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);
  }
  const filters = this._getSamplingParameters(samplingMode, generateMipMaps);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, filters.mag);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, filters.min);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);
  texture.generateMipMaps = generateMipMaps;
  texture.samplingMode = samplingMode;
  texture.isReady = true;
  return texture;
};
ThinEngine.prototype.updateRawCubeTexture = function(texture, data, format, type, invertY, compression = null, level = 0) {
  texture._bufferViewArray = data;
  texture.format = format;
  texture.type = type;
  texture.invertY = invertY;
  texture._compression = compression;
  const gl = this._gl;
  const textureType = this._getWebGLTextureType(type);
  let internalFormat = this._getInternalFormat(format);
  const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type);
  let needConversion = false;
  if (internalFormat === gl.RGB) {
    internalFormat = gl.RGBA;
    needConversion = true;
  }
  this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);
  this._unpackFlipY(invertY === void 0 ? true : invertY ? true : false);
  if (texture.width % 4 !== 0) {
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  }
  for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
    let faceData = data[faceIndex];
    if (compression) {
      gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, this.getCaps().s3tc[compression], texture.width, texture.height, 0, faceData);
    } else {
      if (needConversion) {
        faceData = _convertRGBtoRGBATextureData(faceData, texture.width, texture.height, type);
      }
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, faceData);
    }
  }
  const isPot = !this.needPOTTextures || Tools.IsExponentOfTwo(texture.width) && Tools.IsExponentOfTwo(texture.height);
  if (isPot && texture.generateMipMaps && level === 0) {
    this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);
  }
  this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);
  texture.isReady = true;
};
ThinEngine.prototype.createRawCubeTextureFromUrl = function(url, scene, size, format, type, noMipmap, callback, mipmapGenerator, onLoad = null, onError = null, samplingMode = 3, invertY = false) {
  const gl = this._gl;
  const texture = this.createRawCubeTexture(null, size, format, type, !noMipmap, invertY, samplingMode, null);
  scene == null ? void 0 : scene.addPendingData(texture);
  texture.url = url;
  texture.isReady = false;
  this._internalTexturesCache.push(texture);
  const onerror = (request, exception) => {
    scene == null ? void 0 : scene.removePendingData(texture);
    if (onError && request) {
      onError(request.status + " " + request.statusText, exception);
    }
  };
  const internalCallback = (data) => {
    const width = texture.width;
    const faceDataArrays = callback(data);
    if (!faceDataArrays) {
      return;
    }
    if (mipmapGenerator) {
      const textureType = this._getWebGLTextureType(type);
      let internalFormat = this._getInternalFormat(format);
      const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type);
      let needConversion = false;
      if (internalFormat === gl.RGB) {
        internalFormat = gl.RGBA;
        needConversion = true;
      }
      this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);
      this._unpackFlipY(false);
      const mipData = mipmapGenerator(faceDataArrays);
      for (let level = 0; level < mipData.length; level++) {
        const mipSize = width >> level;
        for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
          let mipFaceData = mipData[level][faceIndex];
          if (needConversion) {
            mipFaceData = _convertRGBtoRGBATextureData(mipFaceData, mipSize, mipSize, type);
          }
          gl.texImage2D(faceIndex, level, internalSizedFomat, mipSize, mipSize, 0, internalFormat, textureType, mipFaceData);
        }
      }
      this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);
    } else {
      this.updateRawCubeTexture(texture, faceDataArrays, format, type, invertY);
    }
    texture.isReady = true;
    scene == null ? void 0 : scene.removePendingData(texture);
    texture.onLoadedObservable.notifyObservers(texture);
    texture.onLoadedObservable.clear();
    if (onLoad) {
      onLoad();
    }
  };
  this._loadFile(url, (data) => {
    internalCallback(data);
  }, void 0, scene == null ? void 0 : scene.offlineProvider, true, onerror);
  return texture;
};
function _convertRGBtoRGBATextureData(rgbData, width, height, textureType) {
  let rgbaData;
  let val1 = 1;
  if (textureType === 1) {
    rgbaData = new Float32Array(width * height * 4);
  } else if (textureType === 2) {
    rgbaData = new Uint16Array(width * height * 4);
    val1 = 15360;
  } else if (textureType === 7) {
    rgbaData = new Uint32Array(width * height * 4);
  } else {
    rgbaData = new Uint8Array(width * height * 4);
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = (y * width + x) * 3;
      const newIndex = (y * width + x) * 4;
      rgbaData[newIndex + 0] = rgbData[index + 0];
      rgbaData[newIndex + 1] = rgbData[index + 1];
      rgbaData[newIndex + 2] = rgbData[index + 2];
      rgbaData[newIndex + 3] = val1;
    }
  }
  return rgbaData;
}
function _makeCreateRawTextureFunction(is3D) {
  return function(data, width, height, depth, format, generateMipMaps, invertY, samplingMode, compression = null, textureType = 0) {
    const target = is3D ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY;
    const source = is3D ? InternalTextureSource.Raw3D : InternalTextureSource.Raw2DArray;
    const texture = new InternalTexture(this, source);
    texture.baseWidth = width;
    texture.baseHeight = height;
    texture.baseDepth = depth;
    texture.width = width;
    texture.height = height;
    texture.depth = depth;
    texture.format = format;
    texture.type = textureType;
    texture.generateMipMaps = generateMipMaps;
    texture.samplingMode = samplingMode;
    if (is3D) {
      texture.is3D = true;
    } else {
      texture.is2DArray = true;
    }
    if (!this._doNotHandleContextLost) {
      texture._bufferView = data;
    }
    if (is3D) {
      this.updateRawTexture3D(texture, data, format, invertY, compression, textureType);
    } else {
      this.updateRawTexture2DArray(texture, data, format, invertY, compression, textureType);
    }
    this._bindTextureDirectly(target, texture, true);
    const filters = this._getSamplingParameters(samplingMode, generateMipMaps);
    this._gl.texParameteri(target, this._gl.TEXTURE_MAG_FILTER, filters.mag);
    this._gl.texParameteri(target, this._gl.TEXTURE_MIN_FILTER, filters.min);
    if (generateMipMaps) {
      this._gl.generateMipmap(target);
    }
    this._bindTextureDirectly(target, null);
    this._internalTexturesCache.push(texture);
    return texture;
  };
}
ThinEngine.prototype.createRawTexture2DArray = _makeCreateRawTextureFunction(false);
ThinEngine.prototype.createRawTexture3D = _makeCreateRawTextureFunction(true);
function _makeUpdateRawTextureFunction(is3D) {
  return function(texture, data, format, invertY, compression = null, textureType = 0) {
    const target = is3D ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY;
    const internalType = this._getWebGLTextureType(textureType);
    const internalFormat = this._getInternalFormat(format);
    const internalSizedFomat = this._getRGBABufferInternalSizedFormat(textureType, format);
    this._bindTextureDirectly(target, texture, true);
    this._unpackFlipY(invertY === void 0 ? true : invertY ? true : false);
    if (!this._doNotHandleContextLost) {
      texture._bufferView = data;
      texture.format = format;
      texture.invertY = invertY;
      texture._compression = compression;
    }
    if (texture.width % 4 !== 0) {
      this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1);
    }
    if (compression && data) {
      this._gl.compressedTexImage3D(target, 0, this.getCaps().s3tc[compression], texture.width, texture.height, texture.depth, 0, data);
    } else {
      this._gl.texImage3D(target, 0, internalSizedFomat, texture.width, texture.height, texture.depth, 0, internalFormat, internalType, data);
    }
    if (texture.generateMipMaps) {
      this._gl.generateMipmap(target);
    }
    this._bindTextureDirectly(target, null);
    texture.isReady = true;
  };
}
ThinEngine.prototype.updateRawTexture2DArray = _makeUpdateRawTextureFunction(false);
ThinEngine.prototype.updateRawTexture3D = _makeUpdateRawTextureFunction(true);

// node_modules/@babylonjs/core/Materials/Textures/rawTexture.js
var RawTexture = class _RawTexture extends Texture {
  /**
   * Instantiates a new RawTexture.
   * Raw texture can help creating a texture directly from an array of data.
   * This can be super useful if you either get the data from an uncompressed source or
   * if you wish to create your texture pixel by pixel.
   * @param data define the array of data to use to create the texture (null to create an empty texture)
   * @param width define the width of the texture
   * @param height define the height of the texture
   * @param format define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps define whether mip maps should be generated or not
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
   * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
   */
  constructor(data, width, height, format, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = 3, type = 0, creationFlags, useSRGBBuffer) {
    super(null, sceneOrEngine, !generateMipMaps, invertY, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, creationFlags);
    this.format = format;
    if (!this._engine) {
      return;
    }
    if (!this._engine._caps.textureFloatLinearFiltering && type === 1) {
      samplingMode = 1;
    }
    if (!this._engine._caps.textureHalfFloatLinearFiltering && type === 2) {
      samplingMode = 1;
    }
    this._texture = this._engine.createRawTexture(data, width, height, format, generateMipMaps, invertY, samplingMode, null, type, creationFlags ?? 0, useSRGBBuffer ?? false);
    this.wrapU = Texture.CLAMP_ADDRESSMODE;
    this.wrapV = Texture.CLAMP_ADDRESSMODE;
  }
  /**
   * Updates the texture underlying data.
   * @param data Define the new data of the texture
   */
  update(data) {
    this._getEngine().updateRawTexture(this._texture, data, this._texture.format, this._texture.invertY, null, this._texture.type, this._texture._useSRGBBuffer);
  }
  /**
   * Creates a luminance texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @returns the luminance texture
   */
  static CreateLuminanceTexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = 3) {
    return new _RawTexture(data, width, height, 1, sceneOrEngine, generateMipMaps, invertY, samplingMode);
  }
  /**
   * Creates a luminance alpha texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @returns the luminance alpha texture
   */
  static CreateLuminanceAlphaTexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = 3) {
    return new _RawTexture(data, width, height, 2, sceneOrEngine, generateMipMaps, invertY, samplingMode);
  }
  /**
   * Creates an alpha texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @returns the alpha texture
   */
  static CreateAlphaTexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = 3) {
    return new _RawTexture(data, width, height, 0, sceneOrEngine, generateMipMaps, invertY, samplingMode);
  }
  /**
   * Creates a RGB texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
   * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
   * @returns the RGB alpha texture
   */
  static CreateRGBTexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = 3, type = 0, creationFlags = 0, useSRGBBuffer = false) {
    return new _RawTexture(data, width, height, 4, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, creationFlags, useSRGBBuffer);
  }
  /**
   * Creates a RGBA texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
   * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
   * @returns the RGBA texture
   */
  static CreateRGBATexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = 3, type = 0, creationFlags = 0, useSRGBBuffer = false) {
    return new _RawTexture(data, width, height, 5, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, creationFlags, useSRGBBuffer);
  }
  /**
   * Creates a RGBA storage texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
   * @returns the RGBA texture
   */
  static CreateRGBAStorageTexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = 3, type = 0, useSRGBBuffer = false) {
    return new _RawTexture(data, width, height, 5, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, 1, useSRGBBuffer);
  }
  /**
   * Creates a R texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @returns the R texture
   */
  static CreateRTexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = Texture.TRILINEAR_SAMPLINGMODE, type = 1) {
    return new _RawTexture(data, width, height, 6, sceneOrEngine, generateMipMaps, invertY, samplingMode, type);
  }
  /**
   * Creates a R storage texture from some data.
   * @param data Define the texture data
   * @param width Define the width of the texture
   * @param height Define the height of the texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param generateMipMaps Define whether or not to create mip maps for the texture
   * @param invertY define if the data should be flipped on Y when uploaded to the GPU
   * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
   * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
   * @returns the R texture
   */
  static CreateRStorageTexture(data, width, height, sceneOrEngine, generateMipMaps = true, invertY = false, samplingMode = Texture.TRILINEAR_SAMPLINGMODE, type = 1) {
    return new _RawTexture(data, width, height, 6, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, 1);
  }
};

// node_modules/@babylonjs/core/XR/features/WebXRDepthSensing.js
var WebXRDepthSensing = class extends WebXRAbstractFeature {
  /**
   * Width of depth data. If depth data is not exist, returns null.
   */
  get width() {
    return this._width;
  }
  /**
   * Height of depth data. If depth data is not exist, returns null.
   */
  get height() {
    return this._height;
  }
  /**
   * Scale factor by which the raw depth values must be multiplied in order to get the depths in meters.
   */
  get rawValueToMeters() {
    return this._rawValueToMeters;
  }
  /**
   * An XRRigidTransform that needs to be applied when indexing into the depth buffer.
   */
  get normDepthBufferFromNormView() {
    return this._normDepthBufferFromNormView;
  }
  /**
   * Describes which depth-sensing usage ("cpu" or "gpu") is used.
   */
  get depthUsage() {
    switch (this._xrSessionManager.session.depthUsage) {
      case "cpu-optimized":
        return "cpu";
      case "gpu-optimized":
        return "gpu";
    }
  }
  /**
   * Describes which depth sensing data format ("ushort" or "float") is used.
   */
  get depthDataFormat() {
    switch (this._xrSessionManager.session.depthDataFormat) {
      case "luminance-alpha":
        return "ushort";
      case "float32":
        return "float";
    }
  }
  /**
   * Latest cached InternalTexture which containing depth buffer information.
   * This can be used when the depth usage is "gpu".
   */
  get latestInternalTexture() {
    if (!this._cachedWebGLTexture) {
      return null;
    }
    const engine = this._xrSessionManager.scene.getEngine();
    const internalTexture = new InternalTexture(engine, InternalTextureSource.Unknown);
    internalTexture.isCube = false;
    internalTexture.invertY = false;
    internalTexture._useSRGBBuffer = false;
    internalTexture.format = this.depthDataFormat === "ushort" ? 2 : 5;
    internalTexture.generateMipMaps = false;
    internalTexture.type = this.depthDataFormat === "ushort" ? 5 : 1;
    internalTexture.samplingMode = 7;
    internalTexture.width = this.width ?? 0;
    internalTexture.height = this.height ?? 0;
    internalTexture._cachedWrapU = 1;
    internalTexture._cachedWrapV = 1;
    internalTexture._hardwareTexture = new WebGLHardwareTexture(this._cachedWebGLTexture, engine._gl);
    return internalTexture;
  }
  /**
   * cached depth buffer
   */
  get latestDepthBuffer() {
    if (!this._cachedDepthBuffer) {
      return null;
    }
    return this.depthDataFormat === "ushort" ? new Uint16Array(this._cachedDepthBuffer) : new Float32Array(this._cachedDepthBuffer);
  }
  /**
   * Latest cached Texture of depth image which is made from the depth buffer data.
   */
  get latestDepthImageTexture() {
    return this._cachedDepthImageTexture;
  }
  /**
   * Creates a new instance of the depth sensing feature
   * @param _xrSessionManager the WebXRSessionManager
   * @param options options for WebXR Depth Sensing Feature
   */
  constructor(_xrSessionManager, options) {
    super(_xrSessionManager);
    this.options = options;
    this._width = null;
    this._height = null;
    this._rawValueToMeters = null;
    this._normDepthBufferFromNormView = null;
    this._cachedDepthBuffer = null;
    this._cachedWebGLTexture = null;
    this._cachedDepthImageTexture = null;
    this.onGetDepthInMetersAvailable = new Observable();
    this.xrNativeFeatureName = "depth-sensing";
    Tools.Warn("depth-sensing is an experimental and unstable feature.");
  }
  /**
   * attach this feature
   * Will usually be called by the features manager
   * @param force should attachment be forced (even when already attached)
   * @returns true if successful.
   */
  attach(force) {
    if (!super.attach(force)) {
      return false;
    }
    const isBothDepthUsageAndFormatNull = this._xrSessionManager.session.depthDataFormat == null || this._xrSessionManager.session.depthUsage == null;
    if (isBothDepthUsageAndFormatNull) {
      return false;
    }
    this._glBinding = new XRWebGLBinding(this._xrSessionManager.session, this._xrSessionManager.scene.getEngine()._gl);
    return true;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    var _a;
    (_a = this._cachedDepthImageTexture) == null ? void 0 : _a.dispose();
  }
  _onXRFrame(_xrFrame) {
    const referenceSPace = this._xrSessionManager.referenceSpace;
    const pose = _xrFrame.getViewerPose(referenceSPace);
    if (pose == null) {
      return;
    }
    for (const view of pose.views) {
      switch (this.depthUsage) {
        case "cpu":
          this._updateDepthInformationAndTextureCPUDepthUsage(_xrFrame, view, this.depthDataFormat);
          break;
        case "gpu":
          if (!this._glBinding) {
            break;
          }
          this._updateDepthInformationAndTextureWebGLDepthUsage(this._glBinding, view, this.depthDataFormat);
          break;
        default:
          Tools.Error("Unknown depth usage");
          this.detach();
          break;
      }
    }
  }
  _updateDepthInformationAndTextureCPUDepthUsage(frame, view, dataFormat) {
    const depthInfo = frame.getDepthInformation(view);
    if (depthInfo === null) {
      return;
    }
    const { data, width, height, rawValueToMeters, getDepthInMeters } = depthInfo;
    this._width = width;
    this._height = height;
    this._rawValueToMeters = rawValueToMeters;
    this._cachedDepthBuffer = data;
    this.onGetDepthInMetersAvailable.notifyObservers(getDepthInMeters.bind(depthInfo));
    if (!this._cachedDepthImageTexture) {
      this._cachedDepthImageTexture = RawTexture.CreateRTexture(null, width, height, this._xrSessionManager.scene, false, true, Texture.NEAREST_SAMPLINGMODE, Engine.TEXTURETYPE_FLOAT);
    }
    switch (dataFormat) {
      case "ushort":
        this._cachedDepthImageTexture.update(Float32Array.from(new Uint16Array(data)).map((value) => value * rawValueToMeters));
        break;
      case "float":
        this._cachedDepthImageTexture.update(new Float32Array(data).map((value) => value * rawValueToMeters));
        break;
      default:
        break;
    }
  }
  _updateDepthInformationAndTextureWebGLDepthUsage(webglBinding, view, dataFormat) {
    const depthInfo = webglBinding.getDepthInformation(view);
    if (depthInfo === null) {
      return;
    }
    const { texture, width, height } = depthInfo;
    this._width = width;
    this._height = height;
    this._cachedWebGLTexture = texture;
    const scene = this._xrSessionManager.scene;
    const engine = scene.getEngine();
    const internalTexture = engine.wrapWebGLTexture(texture);
    if (!this._cachedDepthImageTexture) {
      this._cachedDepthImageTexture = RawTexture.CreateRTexture(null, width, height, scene, false, true, Texture.NEAREST_SAMPLINGMODE, dataFormat === "ushort" ? Engine.TEXTURETYPE_UNSIGNED_BYTE : Engine.TEXTURETYPE_FLOAT);
    }
    this._cachedDepthImageTexture._texture = internalTexture;
  }
  /**
   * Extends the session init object if needed
   * @returns augmentation object for the xr session init object.
   */
  getXRSessionInitExtension() {
    const isDepthUsageDeclared = this.options.usagePreference != null && this.options.usagePreference.length !== 0;
    const isDataFormatDeclared = this.options.dataFormatPreference != null && this.options.dataFormatPreference.length !== 0;
    return new Promise((resolve) => {
      if (isDepthUsageDeclared && isDataFormatDeclared) {
        const usages = this.options.usagePreference.map((usage) => {
          switch (usage) {
            case "cpu":
              return "cpu-optimized";
            case "gpu":
              return "gpu-optimized";
          }
        });
        const dataFormats = this.options.dataFormatPreference.map((format) => {
          switch (format) {
            case "ushort":
              return "luminance-alpha";
            case "float":
              return "float32";
          }
        });
        resolve({
          depthSensing: {
            usagePreference: usages,
            dataFormatPreference: dataFormats
          }
        });
      } else {
        resolve({});
      }
    });
  }
};
WebXRDepthSensing.Name = WebXRFeatureName.DEPTH_SENSING;
WebXRDepthSensing.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRDepthSensing.Name, (xrSessionManager, options) => {
  return () => new WebXRDepthSensing(xrSessionManager, options);
}, WebXRDepthSensing.Version, false);

// node_modules/@babylonjs/core/Shaders/velocity.fragment.js
var name6 = "velocityPixelShader";
var shader6 = `precision highp float;
#define CUSTOM_FRAGMENT_BEGIN
varying vec4 clipPos;varying vec4 previousClipPos;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
highp vec4 motionVector=( clipPos/clipPos.w-previousClipPos/previousClipPos.w );gl_FragColor=motionVector;
#define CUSTOM_FRAGMENT_MAIN_END
}`;
ShaderStore.ShadersStore[name6] = shader6;

// node_modules/@babylonjs/core/Shaders/velocity.vertex.js
var name7 = "velocityVertexShader";
var shader7 = `#define CUSTOM_VERTEX_BEGIN
#define VELOCITY
attribute vec3 position;
#include<instancesDeclaration>
uniform mat4 viewProjection;uniform mat4 previousViewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;uniform mat4 previousViewProjectionR;
#endif
varying vec4 clipPos;varying vec4 previousClipPos;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec3 positionUpdated=position;
#include<instancesVertex>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);vec4 previousWorldPos=finalPreviousWorld*vec4(positionUpdated,1.0);
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {clipPos=viewProjection*worldPos;previousClipPos=previousViewProjection*previousWorldPos;gl_Position=clipPos;} else {clipPos=viewProjectionR*worldPos;previousClipPos=previousViewProjectionR*previousWorldPos;gl_Position=clipPos;}
#elif
clipPos=viewProjection*worldPos;previousClipPos=previousViewProjection*previousWorldPos;gl_Position=clipPos;
#endif
#define CUSTOM_VERTEX_MAIN_END
}`;
ShaderStore.ShadersStore[name7] = shader7;

// node_modules/@babylonjs/core/XR/features/WebXRSpaceWarp.js
var XRSpaceWarpRenderTarget = class extends RenderTargetTexture {
  /**
   * Creates a Space Warp render target
   * @param motionVectorTexture WebGLTexture provided by WebGLSubImage
   * @param depthStencilTexture WebGLTexture provided by WebGLSubImage
   * @param scene scene used with the render target
   * @param size the size of the render target (used for each view)
   */
  constructor(motionVectorTexture, depthStencilTexture, scene, size = 512) {
    super("spacewarp rtt", size, scene, false, true, 2, false, void 0, false, false, true, void 0, true);
    this._originalPairing = [];
    this._previousWorldMatrices = [];
    this._previousTransforms = [Matrix.Identity(), Matrix.Identity()];
    this._renderTarget = this.getScene().getEngine().createMultiviewRenderTargetTexture(this.getRenderWidth(), this.getRenderHeight(), motionVectorTexture, depthStencilTexture);
    this._renderTarget._disposeOnlyFramebuffers = true;
    this._texture = this._renderTarget.texture;
    this._texture.isMultiview = true;
    this._texture.format = 5;
    if (scene) {
      this._velocityMaterial = new ShaderMaterial("velocity shader material", scene, {
        vertex: "velocity",
        fragment: "velocity"
      }, {
        uniforms: ["world", "previousWorld", "viewProjection", "viewProjectionR", "previousViewProjection", "previousViewProjectionR"]
      });
      this._velocityMaterial._materialHelperNeedsPreviousMatrices = true;
      this._velocityMaterial.onBindObservable.add((mesh) => {
        this._previousWorldMatrices[mesh.uniqueId] = this._previousWorldMatrices[mesh.uniqueId] || mesh.getWorldMatrix();
        this._velocityMaterial.getEffect().setMatrix("previousWorld", this._previousWorldMatrices[mesh.uniqueId]);
        this._previousWorldMatrices[mesh.uniqueId] = mesh.getWorldMatrix();
        this._velocityMaterial.getEffect().setMatrix("previousViewProjection", this._previousTransforms[0]);
        this._velocityMaterial.getEffect().setMatrix("previousViewProjectionR", this._previousTransforms[1]);
        this._previousTransforms[0].copyFrom(scene.getTransformMatrix());
        this._previousTransforms[1].copyFrom(scene._transformMatrixR);
      });
      this._velocityMaterial.freeze();
    }
  }
  render(useCameraPostProcess = false, dumpForDebug = false) {
    this._originalPairing.length = 0;
    const scene = this.getScene();
    if (scene && this._velocityMaterial) {
      scene.getActiveMeshes().forEach((mesh) => {
        this._originalPairing.push([mesh, mesh.material]);
        mesh.material = this._velocityMaterial;
      });
    }
    super.render(useCameraPostProcess, dumpForDebug);
    this._originalPairing.forEach((tuple) => {
      tuple[0].material = tuple[1];
    });
  }
  /**
   * @internal
   */
  _bindFrameBuffer() {
    if (!this._renderTarget) {
      return;
    }
    this.getScene().getEngine().bindSpaceWarpFramebuffer(this._renderTarget);
  }
  /**
   * Gets the number of views the corresponding to the texture (eg. a SpaceWarpRenderTarget will have > 1)
   * @returns the view count
   */
  getViewCount() {
    return 2;
  }
  dispose() {
    super.dispose();
    this._velocityMaterial.dispose();
    this._previousTransforms.length = 0;
    this._previousWorldMatrices.length = 0;
    this._originalPairing.length = 0;
  }
};
var WebXRSpaceWarpRenderTargetTextureProvider = class {
  constructor(_scene, _xrSessionManager, _xrWebGLBinding) {
    this._scene = _scene;
    this._xrSessionManager = _xrSessionManager;
    this._xrWebGLBinding = _xrWebGLBinding;
    this._lastSubImages = /* @__PURE__ */ new Map();
    this._renderTargetTextures = /* @__PURE__ */ new Map();
    this._engine = _scene.getEngine();
  }
  _getSubImageForView(view) {
    const layerWrapper = this._xrSessionManager._getBaseLayerWrapper();
    if (!layerWrapper) {
      throw new Error("For Space Warp, the base layer should be a WebXR Projection Layer.");
    }
    if (layerWrapper.layerType !== "XRProjectionLayer") {
      throw new Error('For Space Warp, the base layer type should "XRProjectionLayer".');
    }
    const layer = layerWrapper.layer;
    return this._xrWebGLBinding.getViewSubImage(layer, view);
  }
  _setViewportForSubImage(viewport, subImage) {
    viewport.x = 0;
    viewport.y = 0;
    viewport.width = subImage.motionVectorTextureWidth;
    viewport.height = subImage.motionVectorTextureHeight;
  }
  _createRenderTargetTexture(width, height, framebuffer, motionVectorTexture, depthStencilTexture) {
    if (!this._engine) {
      throw new Error("Engine is disposed");
    }
    const textureSize = { width, height };
    const renderTargetTexture = new XRSpaceWarpRenderTarget(motionVectorTexture, depthStencilTexture, this._scene, textureSize);
    const renderTargetWrapper = renderTargetTexture.renderTarget;
    if (framebuffer) {
      renderTargetWrapper._framebuffer = framebuffer;
    }
    renderTargetWrapper._colorTextureArray = motionVectorTexture;
    renderTargetWrapper._depthStencilTextureArray = depthStencilTexture;
    renderTargetTexture.disableRescaling();
    renderTargetTexture.renderListPredicate = () => true;
    return renderTargetTexture;
  }
  _getRenderTargetForSubImage(subImage, view) {
    const lastSubImage = this._lastSubImages.get(view);
    let renderTargetTexture = this._renderTargetTextures.get(view.eye);
    const width = subImage.motionVectorTextureWidth;
    const height = subImage.motionVectorTextureHeight;
    if (!renderTargetTexture || (lastSubImage == null ? void 0 : lastSubImage.textureWidth) !== width || (lastSubImage == null ? void 0 : lastSubImage.textureHeight) != height) {
      renderTargetTexture = this._createRenderTargetTexture(width, height, null, subImage.motionVectorTexture, subImage.depthStencilTexture);
      this._renderTargetTextures.set(view.eye, renderTargetTexture);
      this._framebufferDimensions = {
        framebufferWidth: width,
        framebufferHeight: height
      };
    }
    this._lastSubImages.set(view, subImage);
    return renderTargetTexture;
  }
  trySetViewportForView(viewport, view) {
    const subImage = this._lastSubImages.get(view) || this._getSubImageForView(view);
    if (subImage) {
      this._setViewportForSubImage(viewport, subImage);
      return true;
    }
    return false;
  }
  /**
   * Access the motion vector (which will turn on Space Warp)
   * @param view the view to access the motion vector texture for
   */
  accessMotionVector(view) {
    const subImage = this._getSubImageForView(view);
    if (subImage) {
      subImage.motionVectorTexture;
      subImage.depthStencilTexture;
    }
  }
  getRenderTargetTextureForEye(_eye) {
    return null;
  }
  getRenderTargetTextureForView(view) {
    const subImage = this._getSubImageForView(view);
    if (subImage) {
      return this._getRenderTargetForSubImage(subImage, view);
    }
    return null;
  }
  dispose() {
    this._renderTargetTextures.forEach((rtt) => rtt.dispose());
    this._renderTargetTextures.clear();
  }
};
var WebXRSpaceWarp = class extends WebXRAbstractFeature {
  /**
   * constructor for the space warp feature
   * @param _xrSessionManager the xr session manager for this feature
   */
  constructor(_xrSessionManager) {
    super(_xrSessionManager);
    this._onAfterRenderObserver = null;
    this.dependsOn = [WebXRFeatureName.LAYERS];
    this.xrNativeFeatureName = "space-warp";
    this._xrSessionManager.scene.needsPreviousWorldMatrices = true;
  }
  /**
   * Attach this feature.
   * Will usually be called by the features manager.
   *
   * @returns true if successful.
   */
  attach() {
    if (!super.attach()) {
      return false;
    }
    const engine = this._xrSessionManager.scene.getEngine();
    this._glContext = engine._gl;
    this._xrWebGLBinding = new XRWebGLBinding(this._xrSessionManager.session, this._glContext);
    this.spaceWarpRTTProvider = new WebXRSpaceWarpRenderTargetTextureProvider(this._xrSessionManager.scene, this._xrSessionManager, this._xrWebGLBinding);
    this._onAfterRenderObserver = this._xrSessionManager.scene.onAfterRenderObservable.add(() => this._onAfterRender());
    return true;
  }
  detach() {
    this._xrSessionManager.scene.onAfterRenderObservable.remove(this._onAfterRenderObserver);
    return super.detach();
  }
  _onAfterRender() {
    if (this.attached && this._renderTargetTexture) {
      this._renderTargetTexture.render(false, false);
    }
  }
  isCompatible() {
    return this._xrSessionManager.scene.getEngine().getCaps().colorBufferHalfFloat || false;
  }
  dispose() {
    super.dispose();
  }
  _onXRFrame(_xrFrame) {
    const pose = _xrFrame.getViewerPose(this._xrSessionManager.referenceSpace);
    if (!pose) {
      return;
    }
    const view = pose.views[0];
    this._renderTargetTexture = this._renderTargetTexture || this.spaceWarpRTTProvider.getRenderTargetTextureForView(view);
    this.spaceWarpRTTProvider.accessMotionVector(view);
  }
};
WebXRSpaceWarp.Name = WebXRFeatureName.SPACE_WARP;
WebXRSpaceWarp.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRSpaceWarp.Name, (xrSessionManager) => {
  return () => new WebXRSpaceWarp(xrSessionManager);
}, WebXRSpaceWarp.Version, false);

// node_modules/@babylonjs/core/XR/features/WebXRRawCameraAccess.js
var WebXRRawCameraAccess = class extends WebXRAbstractFeature {
  /**
   * Creates a new instance of the feature
   * @param _xrSessionManager the WebXRSessionManager
   * @param options options for the Feature
   */
  constructor(_xrSessionManager, options = {}) {
    super(_xrSessionManager);
    this.options = options;
    this._cachedInternalTextures = [];
    this.texturesData = [];
    this.viewIndex = [];
    this.cameraIntrinsics = [];
    this.onTexturesUpdatedObservable = new Observable();
    this.xrNativeFeatureName = "camera-access";
  }
  attach(force) {
    if (!super.attach(force)) {
      return false;
    }
    this._glContext = this._xrSessionManager.scene.getEngine()._gl;
    this._glBinding = new XRWebGLBinding(this._xrSessionManager.session, this._glContext);
    return true;
  }
  detach() {
    if (!super.detach()) {
      return false;
    }
    this._glBinding = void 0;
    if (!this.options.doNotDisposeOnDetach) {
      this._cachedInternalTextures.forEach((t) => t.dispose());
      this.texturesData.forEach((t) => t.dispose());
      this._cachedInternalTextures.length = 0;
      this.texturesData.length = 0;
      this.cameraIntrinsics.length = 0;
    }
    return true;
  }
  /**
   * Dispose this feature and all of the resources attached
   */
  dispose() {
    super.dispose();
    this.onTexturesUpdatedObservable.clear();
  }
  /**
   * @see https://github.com/immersive-web/raw-camera-access/blob/main/explainer.md
   * @param view the XRView to update
   * @param index the index of the view in the views array
   */
  _updateCameraIntrinsics(view, index) {
    const cameraViewport = {
      width: view.camera.width,
      height: view.camera.height,
      x: 0,
      y: 0
    };
    const p = view.projectionMatrix;
    const u0 = (1 - p[8]) * cameraViewport.width / 2 + cameraViewport.x;
    const v0 = (1 - p[9]) * cameraViewport.height / 2 + cameraViewport.y;
    const ax = cameraViewport.width / 2 * p[0];
    const ay = cameraViewport.height / 2 * p[5];
    const gamma = cameraViewport.width / 2 * p[4];
    this.cameraIntrinsics[index] = {
      u0,
      v0,
      ax,
      ay,
      gamma,
      width: cameraViewport.width,
      height: cameraViewport.height,
      viewportX: cameraViewport.x,
      viewportY: cameraViewport.y
    };
  }
  _updateInternalTextures(view, index = 0) {
    var _a, _b;
    if (!view.camera) {
      return false;
    }
    this.viewIndex[index] = view.eye;
    const lp = (_a = this._glBinding) == null ? void 0 : _a.getCameraImage(view.camera);
    if (!this._cachedInternalTextures[index]) {
      const internalTexture = new InternalTexture(this._xrSessionManager.scene.getEngine(), InternalTextureSource.Unknown, true);
      internalTexture.isCube = true;
      internalTexture.invertY = false;
      internalTexture.format = 5;
      internalTexture.generateMipMaps = true;
      internalTexture.type = 1;
      internalTexture.samplingMode = 3;
      internalTexture.width = view.camera.width;
      internalTexture.height = view.camera.height;
      internalTexture._cachedWrapU = 1;
      internalTexture._cachedWrapV = 1;
      internalTexture._hardwareTexture = new WebGLHardwareTexture(lp, this._glContext);
      this._cachedInternalTextures[index] = internalTexture;
      const texture = new BaseTexture(this._xrSessionManager.scene);
      texture.name = `WebXR Raw Camera Access (${index})`;
      texture._texture = this._cachedInternalTextures[index];
      this.texturesData[index] = texture;
      this._updateCameraIntrinsics(view, index);
    } else {
      (_b = this._cachedInternalTextures[index]._hardwareTexture) == null ? void 0 : _b.set(lp);
    }
    this._cachedInternalTextures[index].isReady = true;
    return true;
  }
  _onXRFrame(_xrFrame) {
    const referenceSPace = this._xrSessionManager.referenceSpace;
    const pose = _xrFrame.getViewerPose(referenceSPace);
    if (!pose || !pose.views) {
      return;
    }
    let updated = true;
    pose.views.forEach((view, index) => {
      updated = updated && this._updateInternalTextures(view, index);
    });
    if (updated) {
      this.onTexturesUpdatedObservable.notifyObservers(this.texturesData);
    }
  }
};
WebXRRawCameraAccess.Name = WebXRFeatureName.RAW_CAMERA_ACCESS;
WebXRRawCameraAccess.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRRawCameraAccess.Name, (xrSessionManager, options) => {
  return () => new WebXRRawCameraAccess(xrSessionManager, options);
}, WebXRRawCameraAccess.Version, false);

// node_modules/@babylonjs/core/XR/motionController/webXRGenericHandController.js
var WebXRGenericHandController = class extends WebXRAbstractMotionController {
  /**
   * Create a new hand controller object, without loading a controller model
   * @param scene the scene to use to create this controller
   * @param gamepadObject the corresponding gamepad object
   * @param handedness the handedness of the controller
   */
  constructor(scene, gamepadObject, handedness) {
    super(scene, GenericHandSelectGraspProfile[handedness], gamepadObject, handedness, true);
    this.profileId = "generic-hand-select-grasp";
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
  _processLoadedModel(_meshes) {
  }
  _setRootMesh(meshes) {
  }
  _updateModel() {
  }
};
WebXRMotionControllerManager.RegisterController("generic-hand-select-grasp", (xrInput, scene) => {
  return new WebXRGenericHandController(scene, xrInput.gamepad, xrInput.handedness);
});
var GenericHandSelectGraspProfile = {
  left: {
    selectComponentId: "xr-standard-trigger",
    components: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr-standard-trigger",
        visualResponses: {}
      },
      grasp: {
        type: "trigger",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "grasp",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "generic-hand-select-grasp-left",
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
        rootNodeName: "xr-standard-trigger",
        visualResponses: {}
      },
      grasp: {
        type: "trigger",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "grasp",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "generic-hand-select-grasp-right",
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
        rootNodeName: "xr-standard-trigger",
        visualResponses: {}
      },
      grasp: {
        type: "trigger",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "grasp",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "generic-hand-select-grasp-none",
    assetPath: "none.glb"
  }
};

// node_modules/@babylonjs/core/XR/motionController/webXRMicrosoftMixedRealityController.js
var WebXRMicrosoftMixedRealityController = class _WebXRMicrosoftMixedRealityController extends WebXRAbstractMotionController {
  constructor(scene, gamepadObject, handedness) {
    super(scene, MixedRealityProfile["left-right"], gamepadObject, handedness);
    this._mapping = {
      defaultButton: {
        valueNodeName: "VALUE",
        unpressedNodeName: "UNPRESSED",
        pressedNodeName: "PRESSED"
      },
      defaultAxis: {
        valueNodeName: "VALUE",
        minNodeName: "MIN",
        maxNodeName: "MAX"
      },
      buttons: {
        "xr-standard-trigger": {
          rootNodeName: "SELECT",
          componentProperty: "button",
          states: ["default", "touched", "pressed"]
        },
        "xr-standard-squeeze": {
          rootNodeName: "GRASP",
          componentProperty: "state",
          states: ["pressed"]
        },
        "xr-standard-touchpad": {
          rootNodeName: "TOUCHPAD_PRESS",
          labelAnchorNodeName: "squeeze-label",
          touchPointNodeName: "TOUCH"
          // TODO - use this for visual feedback
        },
        "xr-standard-thumbstick": {
          rootNodeName: "THUMBSTICK_PRESS",
          componentProperty: "state",
          states: ["pressed"]
        }
      },
      axes: {
        "xr-standard-touchpad": {
          "x-axis": {
            rootNodeName: "TOUCHPAD_TOUCH_X"
          },
          "y-axis": {
            rootNodeName: "TOUCHPAD_TOUCH_Y"
          }
        },
        "xr-standard-thumbstick": {
          "x-axis": {
            rootNodeName: "THUMBSTICK_X"
          },
          "y-axis": {
            rootNodeName: "THUMBSTICK_Y"
          }
        }
      }
    };
    this.profileId = "microsoft-mixed-reality";
  }
  _getFilenameAndPath() {
    let filename = "";
    if (this.handedness === "left") {
      filename = _WebXRMicrosoftMixedRealityController.MODEL_LEFT_FILENAME;
    } else {
      filename = _WebXRMicrosoftMixedRealityController.MODEL_RIGHT_FILENAME;
    }
    const device = "default";
    const path = _WebXRMicrosoftMixedRealityController.MODEL_BASE_URL + device + "/";
    return {
      filename,
      path
    };
  }
  _getModelLoadingConstraints() {
    const glbLoaded = SceneLoader.IsPluginForExtensionAvailable(".glb");
    if (!glbLoaded) {
      Logger.Warn("glTF / glb loaded was not registered, using generic controller instead");
    }
    return glbLoaded;
  }
  _processLoadedModel(_meshes) {
    if (!this.rootMesh) {
      return;
    }
    this.getComponentIds().forEach((id, i) => {
      if (this.disableAnimation) {
        return;
      }
      if (id && this.rootMesh) {
        const buttonMap = this._mapping.buttons[id];
        const buttonMeshName = buttonMap.rootNodeName;
        if (!buttonMeshName) {
          Logger.Log("Skipping unknown button at index: " + i + " with mapped name: " + id);
          return;
        }
        const buttonMesh = this._getChildByName(this.rootMesh, buttonMeshName);
        if (!buttonMesh) {
          Logger.Warn("Missing button mesh with name: " + buttonMeshName);
          return;
        }
        buttonMap.valueMesh = this._getImmediateChildByName(buttonMesh, this._mapping.defaultButton.valueNodeName);
        buttonMap.pressedMesh = this._getImmediateChildByName(buttonMesh, this._mapping.defaultButton.pressedNodeName);
        buttonMap.unpressedMesh = this._getImmediateChildByName(buttonMesh, this._mapping.defaultButton.unpressedNodeName);
        if (buttonMap.valueMesh && buttonMap.pressedMesh && buttonMap.unpressedMesh) {
          const comp = this.getComponent(id);
          if (comp) {
            comp.onButtonStateChangedObservable.add((component) => {
              this._lerpTransform(buttonMap, component.value);
            }, void 0, true);
          }
        } else {
          Logger.Warn("Missing button submesh under mesh with name: " + buttonMeshName);
        }
      }
    });
    this.getComponentIds().forEach((id) => {
      const comp = this.getComponent(id);
      if (!comp.isAxes()) {
        return;
      }
      ["x-axis", "y-axis"].forEach((axis) => {
        if (!this.rootMesh) {
          return;
        }
        const axisMap = this._mapping.axes[id][axis];
        const axisMesh = this._getChildByName(this.rootMesh, axisMap.rootNodeName);
        if (!axisMesh) {
          Logger.Warn("Missing axis mesh with name: " + axisMap.rootNodeName);
          return;
        }
        axisMap.valueMesh = this._getImmediateChildByName(axisMesh, this._mapping.defaultAxis.valueNodeName);
        axisMap.minMesh = this._getImmediateChildByName(axisMesh, this._mapping.defaultAxis.minNodeName);
        axisMap.maxMesh = this._getImmediateChildByName(axisMesh, this._mapping.defaultAxis.maxNodeName);
        if (axisMap.valueMesh && axisMap.minMesh && axisMap.maxMesh) {
          if (comp) {
            comp.onAxisValueChangedObservable.add((axisValues) => {
              const value = axis === "x-axis" ? axisValues.x : axisValues.y;
              this._lerpTransform(axisMap, value, true);
            }, void 0, true);
          }
        } else {
          Logger.Warn("Missing axis submesh under mesh with name: " + axisMap.rootNodeName);
        }
      });
    });
  }
  _setRootMesh(meshes) {
    this.rootMesh = new Mesh(this.profileId + " " + this.handedness, this.scene);
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
      this.rootMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);
    }
  }
  _updateModel() {
  }
};
WebXRMicrosoftMixedRealityController.MODEL_BASE_URL = "https://controllers.babylonjs.com/microsoft/";
WebXRMicrosoftMixedRealityController.MODEL_LEFT_FILENAME = "left.glb";
WebXRMicrosoftMixedRealityController.MODEL_RIGHT_FILENAME = "right.glb";
WebXRMotionControllerManager.RegisterController("windows-mixed-reality", (xrInput, scene) => {
  return new WebXRMicrosoftMixedRealityController(scene, xrInput.gamepad, xrInput.handedness);
});
var MixedRealityProfile = {
  left: {
    selectComponentId: "xr-standard-trigger",
    components: {
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr_standard_trigger",
        visualResponses: {
          xr_standard_trigger_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_trigger_pressed_value",
            minNodeName: "xr_standard_trigger_pressed_min",
            maxNodeName: "xr_standard_trigger_pressed_max"
          }
        }
      },
      "xr-standard-squeeze": {
        type: "squeeze",
        gamepadIndices: {
          button: 1
        },
        rootNodeName: "xr_standard_squeeze",
        visualResponses: {
          xr_standard_squeeze_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_squeeze_pressed_value",
            minNodeName: "xr_standard_squeeze_pressed_min",
            maxNodeName: "xr_standard_squeeze_pressed_max"
          }
        }
      },
      "xr-standard-touchpad": {
        type: "touchpad",
        gamepadIndices: {
          button: 2,
          xAxis: 0,
          yAxis: 1
        },
        rootNodeName: "xr_standard_touchpad",
        visualResponses: {
          xr_standard_touchpad_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_pressed_value",
            minNodeName: "xr_standard_touchpad_pressed_min",
            maxNodeName: "xr_standard_touchpad_pressed_max"
          },
          xr_standard_touchpad_xaxis_pressed: {
            componentProperty: "xAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_xaxis_pressed_value",
            minNodeName: "xr_standard_touchpad_xaxis_pressed_min",
            maxNodeName: "xr_standard_touchpad_xaxis_pressed_max"
          },
          xr_standard_touchpad_yaxis_pressed: {
            componentProperty: "yAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_yaxis_pressed_value",
            minNodeName: "xr_standard_touchpad_yaxis_pressed_min",
            maxNodeName: "xr_standard_touchpad_yaxis_pressed_max"
          },
          xr_standard_touchpad_xaxis_touched: {
            componentProperty: "xAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_xaxis_touched_value",
            minNodeName: "xr_standard_touchpad_xaxis_touched_min",
            maxNodeName: "xr_standard_touchpad_xaxis_touched_max"
          },
          xr_standard_touchpad_yaxis_touched: {
            componentProperty: "yAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_yaxis_touched_value",
            minNodeName: "xr_standard_touchpad_yaxis_touched_min",
            maxNodeName: "xr_standard_touchpad_yaxis_touched_max"
          },
          xr_standard_touchpad_axes_touched: {
            componentProperty: "state",
            states: ["touched", "pressed"],
            valueNodeProperty: "visibility",
            valueNodeName: "xr_standard_touchpad_axes_touched_value"
          }
        },
        touchPointNodeName: "xr_standard_touchpad_axes_touched_value"
      },
      "xr-standard-thumbstick": {
        type: "thumbstick",
        gamepadIndices: {
          button: 3,
          xAxis: 2,
          yAxis: 3
        },
        rootNodeName: "xr_standard_thumbstick",
        visualResponses: {
          xr_standard_thumbstick_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_thumbstick_pressed_value",
            minNodeName: "xr_standard_thumbstick_pressed_min",
            maxNodeName: "xr_standard_thumbstick_pressed_max"
          },
          xr_standard_thumbstick_xaxis_pressed: {
            componentProperty: "xAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_thumbstick_xaxis_pressed_value",
            minNodeName: "xr_standard_thumbstick_xaxis_pressed_min",
            maxNodeName: "xr_standard_thumbstick_xaxis_pressed_max"
          },
          xr_standard_thumbstick_yaxis_pressed: {
            componentProperty: "yAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_thumbstick_yaxis_pressed_value",
            minNodeName: "xr_standard_thumbstick_yaxis_pressed_min",
            maxNodeName: "xr_standard_thumbstick_yaxis_pressed_max"
          }
        }
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "microsoft-mixed-reality-left",
    assetPath: "left.glb"
  },
  right: {
    selectComponentId: "xr-standard-trigger",
    components: {
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr_standard_trigger",
        visualResponses: {
          xr_standard_trigger_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_trigger_pressed_value",
            minNodeName: "xr_standard_trigger_pressed_min",
            maxNodeName: "xr_standard_trigger_pressed_max"
          }
        }
      },
      "xr-standard-squeeze": {
        type: "squeeze",
        gamepadIndices: {
          button: 1
        },
        rootNodeName: "xr_standard_squeeze",
        visualResponses: {
          xr_standard_squeeze_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_squeeze_pressed_value",
            minNodeName: "xr_standard_squeeze_pressed_min",
            maxNodeName: "xr_standard_squeeze_pressed_max"
          }
        }
      },
      "xr-standard-touchpad": {
        type: "touchpad",
        gamepadIndices: {
          button: 2,
          xAxis: 0,
          yAxis: 1
        },
        rootNodeName: "xr_standard_touchpad",
        visualResponses: {
          xr_standard_touchpad_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_pressed_value",
            minNodeName: "xr_standard_touchpad_pressed_min",
            maxNodeName: "xr_standard_touchpad_pressed_max"
          },
          xr_standard_touchpad_xaxis_pressed: {
            componentProperty: "xAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_xaxis_pressed_value",
            minNodeName: "xr_standard_touchpad_xaxis_pressed_min",
            maxNodeName: "xr_standard_touchpad_xaxis_pressed_max"
          },
          xr_standard_touchpad_yaxis_pressed: {
            componentProperty: "yAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_yaxis_pressed_value",
            minNodeName: "xr_standard_touchpad_yaxis_pressed_min",
            maxNodeName: "xr_standard_touchpad_yaxis_pressed_max"
          },
          xr_standard_touchpad_xaxis_touched: {
            componentProperty: "xAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_xaxis_touched_value",
            minNodeName: "xr_standard_touchpad_xaxis_touched_min",
            maxNodeName: "xr_standard_touchpad_xaxis_touched_max"
          },
          xr_standard_touchpad_yaxis_touched: {
            componentProperty: "yAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_touchpad_yaxis_touched_value",
            minNodeName: "xr_standard_touchpad_yaxis_touched_min",
            maxNodeName: "xr_standard_touchpad_yaxis_touched_max"
          },
          xr_standard_touchpad_axes_touched: {
            componentProperty: "state",
            states: ["touched", "pressed"],
            valueNodeProperty: "visibility",
            valueNodeName: "xr_standard_touchpad_axes_touched_value"
          }
        },
        touchPointNodeName: "xr_standard_touchpad_axes_touched_value"
      },
      "xr-standard-thumbstick": {
        type: "thumbstick",
        gamepadIndices: {
          button: 3,
          xAxis: 2,
          yAxis: 3
        },
        rootNodeName: "xr_standard_thumbstick",
        visualResponses: {
          xr_standard_thumbstick_pressed: {
            componentProperty: "button",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_thumbstick_pressed_value",
            minNodeName: "xr_standard_thumbstick_pressed_min",
            maxNodeName: "xr_standard_thumbstick_pressed_max"
          },
          xr_standard_thumbstick_xaxis_pressed: {
            componentProperty: "xAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_thumbstick_xaxis_pressed_value",
            minNodeName: "xr_standard_thumbstick_xaxis_pressed_min",
            maxNodeName: "xr_standard_thumbstick_xaxis_pressed_max"
          },
          xr_standard_thumbstick_yaxis_pressed: {
            componentProperty: "yAxis",
            states: ["default", "touched", "pressed"],
            valueNodeProperty: "transform",
            valueNodeName: "xr_standard_thumbstick_yaxis_pressed_value",
            minNodeName: "xr_standard_thumbstick_yaxis_pressed_min",
            maxNodeName: "xr_standard_thumbstick_yaxis_pressed_max"
          }
        }
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "microsoft-mixed-reality-right",
    assetPath: "right.glb"
  }
};

// node_modules/@babylonjs/core/XR/motionController/webXROculusTouchMotionController.js
var WebXROculusTouchMotionController = class _WebXROculusTouchMotionController extends WebXRAbstractMotionController {
  constructor(scene, gamepadObject, handedness, _legacyMapping = false, _forceLegacyControllers = false) {
    super(scene, OculusTouchLayouts[handedness], gamepadObject, handedness);
    this._forceLegacyControllers = _forceLegacyControllers;
    this.profileId = "oculus-touch";
  }
  _getFilenameAndPath() {
    let filename = "";
    if (this.handedness === "left") {
      filename = _WebXROculusTouchMotionController.MODEL_LEFT_FILENAME;
    } else {
      filename = _WebXROculusTouchMotionController.MODEL_RIGHT_FILENAME;
    }
    const path = this._isQuest() ? _WebXROculusTouchMotionController.QUEST_MODEL_BASE_URL : _WebXROculusTouchMotionController.MODEL_BASE_URL;
    return {
      filename,
      path
    };
  }
  _getModelLoadingConstraints() {
    return true;
  }
  _processLoadedModel(_meshes) {
    const isQuest = this._isQuest();
    const triggerDirection = this.handedness === "right" ? -1 : 1;
    this.getComponentIds().forEach((id) => {
      const comp = id && this.getComponent(id);
      if (comp) {
        comp.onButtonStateChangedObservable.add((component) => {
          if (!this.rootMesh || this.disableAnimation) {
            return;
          }
          switch (id) {
            case "xr-standard-trigger":
              if (!isQuest) {
                this._modelRootNode.getChildren()[3].rotation.x = -component.value * 0.2;
                this._modelRootNode.getChildren()[3].position.y = -component.value * 5e-3;
                this._modelRootNode.getChildren()[3].position.z = -component.value * 5e-3;
              }
              return;
            case "xr-standard-squeeze":
              if (!isQuest) {
                this._modelRootNode.getChildren()[4].position.x = triggerDirection * component.value * 35e-4;
              }
              return;
            case "xr-standard-thumbstick":
              return;
            case "a-button":
            case "x-button":
              if (!isQuest) {
                if (component.pressed) {
                  this._modelRootNode.getChildren()[1].position.y = -1e-3;
                } else {
                  this._modelRootNode.getChildren()[1].position.y = 0;
                }
              }
              return;
            case "b-button":
            case "y-button":
              if (!isQuest) {
                if (component.pressed) {
                  this._modelRootNode.getChildren()[2].position.y = -1e-3;
                } else {
                  this._modelRootNode.getChildren()[2].position.y = 0;
                }
              }
              return;
          }
        }, void 0, true);
      }
    });
  }
  _setRootMesh(meshes) {
    this.rootMesh = new Mesh(this.profileId + " " + this.handedness, this.scene);
    if (!this.scene.useRightHandedSystem) {
      this.rootMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);
    }
    meshes.forEach((mesh) => {
      mesh.isPickable = false;
    });
    if (this._isQuest()) {
      this._modelRootNode = meshes[0];
    } else {
      this._modelRootNode = meshes[1];
      this.rootMesh.position.y = 0.034;
      this.rootMesh.position.z = 0.052;
    }
    this._modelRootNode.parent = this.rootMesh;
  }
  _updateModel() {
  }
  /**
   * Is this the new type of oculus touch. At the moment both have the same profile and it is impossible to differentiate
   * between the touch and touch 2.
   * @returns true if this is the new type of oculus touch controllers.
   */
  _isQuest() {
    return !!navigator.userAgent.match(/Quest/gi) && !this._forceLegacyControllers;
  }
};
WebXROculusTouchMotionController.MODEL_BASE_URL = "https://controllers.babylonjs.com/oculus/";
WebXROculusTouchMotionController.MODEL_LEFT_FILENAME = "left.babylon";
WebXROculusTouchMotionController.MODEL_RIGHT_FILENAME = "right.babylon";
WebXROculusTouchMotionController.QUEST_MODEL_BASE_URL = "https://controllers.babylonjs.com/oculusQuest/";
WebXRMotionControllerManager.RegisterController("oculus-touch", (xrInput, scene) => {
  return new WebXROculusTouchMotionController(scene, xrInput.gamepad, xrInput.handedness);
});
WebXRMotionControllerManager.RegisterController("oculus-touch-legacy", (xrInput, scene) => {
  return new WebXROculusTouchMotionController(scene, xrInput.gamepad, xrInput.handedness, true);
});
var OculusTouchLayouts = {
  left: {
    selectComponentId: "xr-standard-trigger",
    components: {
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr_standard_trigger",
        visualResponses: {}
      },
      "xr-standard-squeeze": {
        type: "squeeze",
        gamepadIndices: {
          button: 1
        },
        rootNodeName: "xr_standard_squeeze",
        visualResponses: {}
      },
      "xr-standard-thumbstick": {
        type: "thumbstick",
        gamepadIndices: {
          button: 3,
          xAxis: 2,
          yAxis: 3
        },
        rootNodeName: "xr_standard_thumbstick",
        visualResponses: {}
      },
      "x-button": {
        type: "button",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "x_button",
        visualResponses: {}
      },
      "y-button": {
        type: "button",
        gamepadIndices: {
          button: 5
        },
        rootNodeName: "y_button",
        visualResponses: {}
      },
      thumbrest: {
        type: "button",
        gamepadIndices: {
          button: 6
        },
        rootNodeName: "thumbrest",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "oculus-touch-v2-left",
    assetPath: "left.glb"
  },
  right: {
    selectComponentId: "xr-standard-trigger",
    components: {
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr_standard_trigger",
        visualResponses: {}
      },
      "xr-standard-squeeze": {
        type: "squeeze",
        gamepadIndices: {
          button: 1
        },
        rootNodeName: "xr_standard_squeeze",
        visualResponses: {}
      },
      "xr-standard-thumbstick": {
        type: "thumbstick",
        gamepadIndices: {
          button: 3,
          xAxis: 2,
          yAxis: 3
        },
        rootNodeName: "xr_standard_thumbstick",
        visualResponses: {}
      },
      "a-button": {
        type: "button",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "a_button",
        visualResponses: {}
      },
      "b-button": {
        type: "button",
        gamepadIndices: {
          button: 5
        },
        rootNodeName: "b_button",
        visualResponses: {}
      },
      thumbrest: {
        type: "button",
        gamepadIndices: {
          button: 6
        },
        rootNodeName: "thumbrest",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "oculus-touch-v2-right",
    assetPath: "right.glb"
  }
};

// node_modules/@babylonjs/core/XR/motionController/webXRHTCViveMotionController.js
var WebXRHTCViveMotionController = class _WebXRHTCViveMotionController extends WebXRAbstractMotionController {
  /**
   * Create a new Vive motion controller object
   * @param scene the scene to use to create this controller
   * @param gamepadObject the corresponding gamepad object
   * @param handedness the handedness of the controller
   */
  constructor(scene, gamepadObject, handedness) {
    super(scene, HTCViveLayout[handedness], gamepadObject, handedness);
    this.profileId = "htc-vive";
  }
  _getFilenameAndPath() {
    const filename = _WebXRHTCViveMotionController.MODEL_FILENAME;
    const path = _WebXRHTCViveMotionController.MODEL_BASE_URL;
    return {
      filename,
      path
    };
  }
  _getModelLoadingConstraints() {
    return true;
  }
  _processLoadedModel(_meshes) {
    this.getComponentIds().forEach((id) => {
      const comp = id && this.getComponent(id);
      if (comp) {
        comp.onButtonStateChangedObservable.add((component) => {
          if (!this.rootMesh || this.disableAnimation) {
            return;
          }
          switch (id) {
            case "xr-standard-trigger":
              this._modelRootNode.getChildren()[6].rotation.x = -component.value * 0.15;
              return;
            case "xr-standard-touchpad":
              return;
            case "xr-standard-squeeze":
              return;
          }
        }, void 0, true);
      }
    });
  }
  _setRootMesh(meshes) {
    this.rootMesh = new Mesh(this.profileId + " " + this.handedness, this.scene);
    meshes.forEach((mesh) => {
      mesh.isPickable = false;
    });
    this._modelRootNode = meshes[1];
    this._modelRootNode.parent = this.rootMesh;
    if (!this.scene.useRightHandedSystem) {
      this.rootMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);
    }
  }
  _updateModel() {
  }
};
WebXRHTCViveMotionController.MODEL_BASE_URL = "https://controllers.babylonjs.com/vive/";
WebXRHTCViveMotionController.MODEL_FILENAME = "wand.babylon";
WebXRMotionControllerManager.RegisterController("htc-vive", (xrInput, scene) => {
  return new WebXRHTCViveMotionController(scene, xrInput.gamepad, xrInput.handedness);
});
var HTCViveLayout = {
  left: {
    selectComponentId: "xr-standard-trigger",
    components: {
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr_standard_trigger",
        visualResponses: {}
      },
      "xr-standard-squeeze": {
        type: "squeeze",
        gamepadIndices: {
          button: 1
        },
        rootNodeName: "xr_standard_squeeze",
        visualResponses: {}
      },
      "xr-standard-touchpad": {
        type: "touchpad",
        gamepadIndices: {
          button: 2,
          xAxis: 0,
          yAxis: 1
        },
        rootNodeName: "xr_standard_touchpad",
        visualResponses: {}
      },
      menu: {
        type: "button",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "menu",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "htc_vive_none",
    assetPath: "none.glb"
  },
  right: {
    selectComponentId: "xr-standard-trigger",
    components: {
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr_standard_trigger",
        visualResponses: {}
      },
      "xr-standard-squeeze": {
        type: "squeeze",
        gamepadIndices: {
          button: 1
        },
        rootNodeName: "xr_standard_squeeze",
        visualResponses: {}
      },
      "xr-standard-touchpad": {
        type: "touchpad",
        gamepadIndices: {
          button: 2,
          xAxis: 0,
          yAxis: 1
        },
        rootNodeName: "xr_standard_touchpad",
        visualResponses: {}
      },
      menu: {
        type: "button",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "menu",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "htc_vive_none",
    assetPath: "none.glb"
  },
  none: {
    selectComponentId: "xr-standard-trigger",
    components: {
      "xr-standard-trigger": {
        type: "trigger",
        gamepadIndices: {
          button: 0
        },
        rootNodeName: "xr_standard_trigger",
        visualResponses: {}
      },
      "xr-standard-squeeze": {
        type: "squeeze",
        gamepadIndices: {
          button: 1
        },
        rootNodeName: "xr_standard_squeeze",
        visualResponses: {}
      },
      "xr-standard-touchpad": {
        type: "touchpad",
        gamepadIndices: {
          button: 2,
          xAxis: 0,
          yAxis: 1
        },
        rootNodeName: "xr_standard_touchpad",
        visualResponses: {}
      },
      menu: {
        type: "button",
        gamepadIndices: {
          button: 4
        },
        rootNodeName: "menu",
        visualResponses: {}
      }
    },
    gamepadMapping: "xr-standard",
    rootNodeName: "htc-vive-none",
    assetPath: "none.glb"
  }
};

// node_modules/@babylonjs/core/Shaders/rgbdDecode.fragment.js
var name8 = "rgbdDecodePixelShader";
var shader8 = `varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);}`;
ShaderStore.ShadersStore[name8] = shader8;

// node_modules/@babylonjs/core/Shaders/passCube.fragment.js
var name9 = "passCubePixelShader";
var shader9 = `varying vec2 vUV;uniform samplerCube textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{vec2 uv=vUV*2.0-1.0;
#ifdef POSITIVEX
gl_FragColor=textureCube(textureSampler,vec3(1.001,uv.y,uv.x));
#endif
#ifdef NEGATIVEX
gl_FragColor=textureCube(textureSampler,vec3(-1.001,uv.y,uv.x));
#endif
#ifdef POSITIVEY
gl_FragColor=textureCube(textureSampler,vec3(uv.y,1.001,uv.x));
#endif
#ifdef NEGATIVEY
gl_FragColor=textureCube(textureSampler,vec3(uv.y,-1.001,uv.x));
#endif
#ifdef POSITIVEZ
gl_FragColor=textureCube(textureSampler,vec3(uv,1.001));
#endif
#ifdef NEGATIVEZ
gl_FragColor=textureCube(textureSampler,vec3(uv,-1.001));
#endif
}`;
ShaderStore.ShadersStore[name9] = shader9;

// node_modules/@babylonjs/core/PostProcesses/passPostProcess.js
var PassPostProcess = class _PassPostProcess extends PostProcess {
  /**
   * Gets a string identifying the name of the class
   * @returns "PassPostProcess" string
   */
  getClassName() {
    return "PassPostProcess";
  }
  /**
   * Creates the PassPostProcess
   * @param name The name of the effect.
   * @param options The required width/height ratio to downsize to before computing the render pass.
   * @param camera The camera to apply the render pass to.
   * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
   * @param engine The engine which the post process will be applied. (default: current engine)
   * @param reusable If the post process can be reused on the same frame. (default: false)
   * @param textureType The type of texture to be used when performing the post processing.
   * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
   */
  constructor(name11, options, camera = null, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
    super(name11, "pass", null, null, options, camera, samplingMode, engine, reusable, void 0, textureType, void 0, null, blockCompilation);
  }
  /**
   * @internal
   */
  static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
    return SerializationHelper.Parse(() => {
      return new _PassPostProcess(parsedPostProcess.name, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess._engine, parsedPostProcess.reusable);
    }, parsedPostProcess, scene, rootUrl);
  }
};
RegisterClass("BABYLON.PassPostProcess", PassPostProcess);
var PassCubePostProcess = class _PassCubePostProcess extends PostProcess {
  /**
   * Gets or sets the cube face to display.
   *  * 0 is +X
   *  * 1 is -X
   *  * 2 is +Y
   *  * 3 is -Y
   *  * 4 is +Z
   *  * 5 is -Z
   */
  get face() {
    return this._face;
  }
  set face(value) {
    if (value < 0 || value > 5) {
      return;
    }
    this._face = value;
    switch (this._face) {
      case 0:
        this.updateEffect("#define POSITIVEX");
        break;
      case 1:
        this.updateEffect("#define NEGATIVEX");
        break;
      case 2:
        this.updateEffect("#define POSITIVEY");
        break;
      case 3:
        this.updateEffect("#define NEGATIVEY");
        break;
      case 4:
        this.updateEffect("#define POSITIVEZ");
        break;
      case 5:
        this.updateEffect("#define NEGATIVEZ");
        break;
    }
  }
  /**
   * Gets a string identifying the name of the class
   * @returns "PassCubePostProcess" string
   */
  getClassName() {
    return "PassCubePostProcess";
  }
  /**
   * Creates the PassCubePostProcess
   * @param name The name of the effect.
   * @param options The required width/height ratio to downsize to before computing the render pass.
   * @param camera The camera to apply the render pass to.
   * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
   * @param engine The engine which the post process will be applied. (default: current engine)
   * @param reusable If the post process can be reused on the same frame. (default: false)
   * @param textureType The type of texture to be used when performing the post processing.
   * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
   */
  constructor(name11, options, camera = null, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
    super(name11, "passCube", null, null, options, camera, samplingMode, engine, reusable, "#define POSITIVEX", textureType, void 0, null, blockCompilation);
    this._face = 0;
  }
  /**
   * @internal
   */
  static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
    return SerializationHelper.Parse(() => {
      return new _PassCubePostProcess(parsedPostProcess.name, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess._engine, parsedPostProcess.reusable);
    }, parsedPostProcess, scene, rootUrl);
  }
};
Engine._RescalePostProcessFactory = (engine) => {
  return new PassPostProcess("rescale", 1, null, 2, engine, false, 0);
};

// node_modules/@babylonjs/core/Misc/textureTools.js
function CreateResizedCopy(texture, width, height, useBilinearMode = true) {
  const scene = texture.getScene();
  const engine = scene.getEngine();
  const rtt = new RenderTargetTexture("resized" + texture.name, { width, height }, scene, !texture.noMipmap, true, texture._texture.type, false, texture.samplingMode, false);
  rtt.wrapU = texture.wrapU;
  rtt.wrapV = texture.wrapV;
  rtt.uOffset = texture.uOffset;
  rtt.vOffset = texture.vOffset;
  rtt.uScale = texture.uScale;
  rtt.vScale = texture.vScale;
  rtt.uAng = texture.uAng;
  rtt.vAng = texture.vAng;
  rtt.wAng = texture.wAng;
  rtt.coordinatesIndex = texture.coordinatesIndex;
  rtt.level = texture.level;
  rtt.anisotropicFilteringLevel = texture.anisotropicFilteringLevel;
  rtt._texture.isReady = false;
  texture.wrapU = Texture.CLAMP_ADDRESSMODE;
  texture.wrapV = Texture.CLAMP_ADDRESSMODE;
  const passPostProcess = new PassPostProcess("pass", 1, null, useBilinearMode ? Texture.BILINEAR_SAMPLINGMODE : Texture.NEAREST_SAMPLINGMODE, engine, false, 0);
  passPostProcess.externalTextureSamplerBinding = true;
  passPostProcess.getEffect().executeWhenCompiled(() => {
    passPostProcess.onApply = function(effect) {
      effect.setTexture("textureSampler", texture);
    };
    const internalTexture = rtt.renderTarget;
    if (internalTexture) {
      scene.postProcessManager.directRender([passPostProcess], internalTexture);
      engine.unBindFramebuffer(internalTexture);
      rtt.disposeFramebufferObjects();
      passPostProcess.dispose();
      rtt.getInternalTexture().isReady = true;
    }
  });
  return rtt;
}
function ApplyPostProcess(postProcessName, internalTexture, scene, type, samplingMode, format, width, height) {
  const engine = internalTexture.getEngine();
  internalTexture.isReady = false;
  samplingMode = samplingMode ?? internalTexture.samplingMode;
  type = type ?? internalTexture.type;
  format = format ?? internalTexture.format;
  width = width ?? internalTexture.width;
  height = height ?? internalTexture.height;
  if (type === -1) {
    type = 0;
  }
  return new Promise((resolve) => {
    const postProcess = new PostProcess("postprocess", postProcessName, null, null, 1, null, samplingMode, engine, false, void 0, type, void 0, null, false, format);
    postProcess.externalTextureSamplerBinding = true;
    const encodedTexture = engine.createRenderTargetTexture({ width, height }, {
      generateDepthBuffer: false,
      generateMipMaps: false,
      generateStencilBuffer: false,
      samplingMode,
      type,
      format
    });
    postProcess.getEffect().executeWhenCompiled(() => {
      postProcess.onApply = (effect) => {
        effect._bindTexture("textureSampler", internalTexture);
        effect.setFloat2("scale", 1, 1);
      };
      scene.postProcessManager.directRender([postProcess], encodedTexture, true);
      engine.restoreDefaultFramebuffer();
      engine._releaseTexture(internalTexture);
      if (postProcess) {
        postProcess.dispose();
      }
      encodedTexture._swapAndDie(internalTexture);
      internalTexture.type = type;
      internalTexture.format = 5;
      internalTexture.isReady = true;
      resolve(internalTexture);
    });
  });
}
var floatView;
var int32View;
function ToHalfFloat(value) {
  if (!floatView) {
    floatView = new Float32Array(1);
    int32View = new Int32Array(floatView.buffer);
  }
  floatView[0] = value;
  const x = int32View[0];
  let bits = x >> 16 & 32768;
  let m = x >> 12 & 2047;
  const e = x >> 23 & 255;
  if (e < 103) {
    return bits;
  }
  if (e > 142) {
    bits |= 31744;
    bits |= (e == 255 ? 0 : 1) && x & 8388607;
    return bits;
  }
  if (e < 113) {
    m |= 2048;
    bits |= (m >> 114 - e) + (m >> 113 - e & 1);
    return bits;
  }
  bits |= e - 112 << 10 | m >> 1;
  bits += m & 1;
  return bits;
}
function FromHalfFloat(value) {
  const s = (value & 32768) >> 15;
  const e = (value & 31744) >> 10;
  const f = value & 1023;
  if (e === 0) {
    return (s ? -1 : 1) * Math.pow(2, -14) * (f / Math.pow(2, 10));
  } else if (e == 31) {
    return f ? NaN : (s ? -1 : 1) * Infinity;
  }
  return (s ? -1 : 1) * Math.pow(2, e - 15) * (1 + f / Math.pow(2, 10));
}
var ProcessAsync = async (texture, width, height, face, lod) => {
  const scene = texture.getScene();
  const engine = scene.getEngine();
  let lodPostProcess;
  if (!texture.isCube) {
    lodPostProcess = new PostProcess("lod", "lod", ["lod", "gamma"], null, 1, null, Texture.NEAREST_NEAREST_MIPNEAREST, engine);
  } else {
    const faceDefines = ["#define POSITIVEX", "#define NEGATIVEX", "#define POSITIVEY", "#define NEGATIVEY", "#define POSITIVEZ", "#define NEGATIVEZ"];
    lodPostProcess = new PostProcess("lodCube", "lodCube", ["lod", "gamma"], null, 1, null, Texture.NEAREST_NEAREST_MIPNEAREST, engine, false, faceDefines[face]);
  }
  await new Promise((resolve) => {
    lodPostProcess.getEffect().executeWhenCompiled(() => {
      resolve(0);
    });
  });
  const rtt = new RenderTargetTexture("temp", { width, height }, scene, false);
  lodPostProcess.onApply = function(effect) {
    effect.setTexture("textureSampler", texture);
    effect.setFloat("lod", lod);
    effect.setBool("gamma", texture.gammaSpace);
  };
  const internalTexture = texture.getInternalTexture();
  try {
    if (rtt.renderTarget && internalTexture) {
      const samplingMode = internalTexture.samplingMode;
      if (lod !== 0) {
        texture.updateSamplingMode(Texture.NEAREST_NEAREST_MIPNEAREST);
      } else {
        texture.updateSamplingMode(Texture.NEAREST_NEAREST);
      }
      scene.postProcessManager.directRender([lodPostProcess], rtt.renderTarget, true);
      texture.updateSamplingMode(samplingMode);
      const bufferView = await engine.readPixels(0, 0, width, height);
      const data = new Uint8Array(bufferView.buffer, 0, bufferView.byteLength);
      engine.unBindFramebuffer(rtt.renderTarget);
      return data;
    } else {
      throw Error("Render to texture failed.");
    }
  } finally {
    rtt.dispose();
    lodPostProcess.dispose();
  }
};
async function GetTextureDataAsync(texture, width, height, face = 0, lod = 0) {
  if (!texture.isReady() && texture._texture) {
    await new Promise((resolve, reject) => {
      if (texture._texture === null) {
        reject(0);
        return;
      }
      texture._texture.onLoadedObservable.addOnce(() => {
        resolve(0);
      });
    });
  }
  return await ProcessAsync(texture, width, height, face, lod);
}
var TextureTools = {
  /**
   * Uses the GPU to create a copy texture rescaled at a given size
   * @param texture Texture to copy from
   * @param width defines the desired width
   * @param height defines the desired height
   * @param useBilinearMode defines if bilinear mode has to be used
   * @returns the generated texture
   */
  CreateResizedCopy,
  /**
   * Apply a post process to a texture
   * @param postProcessName name of the fragment post process
   * @param internalTexture the texture to encode
   * @param scene the scene hosting the texture
   * @param type type of the output texture. If not provided, use the one from internalTexture
   * @param samplingMode sampling mode to use to sample the source texture. If not provided, use the one from internalTexture
   * @param format format of the output texture. If not provided, use the one from internalTexture
   * @returns a promise with the internalTexture having its texture replaced by the result of the processing
   */
  ApplyPostProcess,
  /**
   * Converts a number to half float
   * @param value number to convert
   * @returns converted number
   */
  ToHalfFloat,
  /**
   * Converts a half float to a number
   * @param value half float to convert
   * @returns converted half float
   */
  FromHalfFloat,
  /**
   * Gets the data of the specified texture by rendering it to an intermediate RGBA texture and retrieving the bytes from it.
   * This is convienent to get 8-bit RGBA values for a texture in a GPU compressed format.
   * @param texture the source texture
   * @param width the width of the result, which does not have to match the source texture width
   * @param height the height of the result, which does not have to match the source texture height
   * @param face if the texture has multiple faces, the face index to use for the source
   * @param channels a filter for which of the RGBA channels to return in the result
   * @param lod if the texture has multiple LODs, the lod index to use for the source
   * @returns the 8-bit texture data
   */
  GetTextureDataAsync
};

// node_modules/@babylonjs/core/Misc/rgbdTextureTools.js
var RGBDTextureTools = class {
  /**
   * Expand the RGBD Texture from RGBD to Half Float if possible.
   * @param texture the texture to expand.
   */
  static ExpandRGBDTexture(texture) {
    const internalTexture = texture._texture;
    if (!internalTexture || !texture.isRGBD) {
      return;
    }
    const engine = internalTexture.getEngine();
    const caps = engine.getCaps();
    const isReady = internalTexture.isReady;
    let expandTexture = false;
    if (caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering) {
      expandTexture = true;
      internalTexture.type = 2;
    } else if (caps.textureFloatRender && caps.textureFloatLinearFiltering) {
      expandTexture = true;
      internalTexture.type = 1;
    }
    if (expandTexture) {
      internalTexture.isReady = false;
      internalTexture._isRGBD = false;
      internalTexture.invertY = false;
    }
    const expandRGBDTexture = () => {
      const rgbdPostProcess = new PostProcess("rgbdDecode", "rgbdDecode", null, null, 1, null, 3, engine, false, void 0, internalTexture.type, void 0, null, false);
      rgbdPostProcess.externalTextureSamplerBinding = true;
      const expandedTexture = engine.createRenderTargetTexture(internalTexture.width, {
        generateDepthBuffer: false,
        generateMipMaps: false,
        generateStencilBuffer: false,
        samplingMode: internalTexture.samplingMode,
        type: internalTexture.type,
        format: 5
      });
      rgbdPostProcess.getEffect().executeWhenCompiled(() => {
        rgbdPostProcess.onApply = (effect) => {
          effect._bindTexture("textureSampler", internalTexture);
          effect.setFloat2("scale", 1, 1);
        };
        texture.getScene().postProcessManager.directRender([rgbdPostProcess], expandedTexture, true);
        engine.restoreDefaultFramebuffer();
        engine._releaseTexture(internalTexture);
        if (rgbdPostProcess) {
          rgbdPostProcess.dispose();
        }
        expandedTexture._swapAndDie(internalTexture);
        internalTexture.isReady = true;
      });
    };
    if (expandTexture) {
      if (isReady) {
        expandRGBDTexture();
      } else {
        texture.onLoadObservable.addOnce(expandRGBDTexture);
      }
    }
  }
  /**
   * Encode the texture to RGBD if possible.
   * @param internalTexture the texture to encode
   * @param scene the scene hosting the texture
   * @param outputTextureType type of the texture in which the encoding is performed
   * @returns a promise with the internalTexture having its texture replaced by the result of the processing
   */
  static EncodeTextureToRGBD(internalTexture, scene, outputTextureType = 0) {
    return ApplyPostProcess("rgbdEncode", internalTexture, scene, outputTextureType, 1, 5);
  }
};

// node_modules/@babylonjs/core/Misc/HighDynamicRange/cubemapToSphericalPolynomial.js
var FileFaceOrientation = class {
  constructor(name11, worldAxisForNormal, worldAxisForFileX, worldAxisForFileY) {
    this.name = name11;
    this.worldAxisForNormal = worldAxisForNormal;
    this.worldAxisForFileX = worldAxisForFileX;
    this.worldAxisForFileY = worldAxisForFileY;
  }
};
var CubeMapToSphericalPolynomialTools = class {
  /**
   * Converts a texture to the according Spherical Polynomial data.
   * This extracts the first 3 orders only as they are the only one used in the lighting.
   *
   * @param texture The texture to extract the information from.
   * @returns The Spherical Polynomial data.
   */
  static ConvertCubeMapTextureToSphericalPolynomial(texture) {
    var _a;
    if (!texture.isCube) {
      return null;
    }
    (_a = texture.getScene()) == null ? void 0 : _a.getEngine().flushFramebuffer();
    const size = texture.getSize().width;
    const rightPromise = texture.readPixels(0, void 0, void 0, false);
    const leftPromise = texture.readPixels(1, void 0, void 0, false);
    let upPromise;
    let downPromise;
    if (texture.isRenderTarget) {
      upPromise = texture.readPixels(3, void 0, void 0, false);
      downPromise = texture.readPixels(2, void 0, void 0, false);
    } else {
      upPromise = texture.readPixels(2, void 0, void 0, false);
      downPromise = texture.readPixels(3, void 0, void 0, false);
    }
    const frontPromise = texture.readPixels(4, void 0, void 0, false);
    const backPromise = texture.readPixels(5, void 0, void 0, false);
    const gammaSpace = texture.gammaSpace;
    const format = 5;
    let type = 0;
    if (texture.textureType == 1 || texture.textureType == 2) {
      type = 1;
    }
    return new Promise((resolve) => {
      Promise.all([leftPromise, rightPromise, upPromise, downPromise, frontPromise, backPromise]).then(([left, right, up, down, front, back]) => {
        const cubeInfo = {
          size,
          right,
          left,
          up,
          down,
          front,
          back,
          format,
          type,
          gammaSpace
        };
        resolve(this.ConvertCubeMapToSphericalPolynomial(cubeInfo));
      });
    });
  }
  /**
   * Compute the area on the unit sphere of the rectangle defined by (x,y) and the origin
   * See https://www.rorydriscoll.com/2012/01/15/cubemap-texel-solid-angle/
   * @param x
   * @param y
   * @returns the area
   */
  static _AreaElement(x, y) {
    return Math.atan2(x * y, Math.sqrt(x * x + y * y + 1));
  }
  /**
   * Converts a cubemap to the according Spherical Polynomial data.
   * This extracts the first 3 orders only as they are the only one used in the lighting.
   *
   * @param cubeInfo The Cube map to extract the information from.
   * @returns The Spherical Polynomial data.
   */
  static ConvertCubeMapToSphericalPolynomial(cubeInfo) {
    const sphericalHarmonics = new SphericalHarmonics();
    let totalSolidAngle = 0;
    const du = 2 / cubeInfo.size;
    const dv = du;
    const halfTexel = 0.5 * du;
    const minUV = halfTexel - 1;
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      const fileFace = this._FileFaces[faceIndex];
      const dataArray = cubeInfo[fileFace.name];
      let v = minUV;
      const stride = cubeInfo.format === 5 ? 4 : 3;
      for (let y = 0; y < cubeInfo.size; y++) {
        let u = minUV;
        for (let x = 0; x < cubeInfo.size; x++) {
          const worldDirection = fileFace.worldAxisForFileX.scale(u).add(fileFace.worldAxisForFileY.scale(v)).add(fileFace.worldAxisForNormal);
          worldDirection.normalize();
          const deltaSolidAngle = this._AreaElement(u - halfTexel, v - halfTexel) - this._AreaElement(u - halfTexel, v + halfTexel) - this._AreaElement(u + halfTexel, v - halfTexel) + this._AreaElement(u + halfTexel, v + halfTexel);
          let r = dataArray[y * cubeInfo.size * stride + x * stride + 0];
          let g = dataArray[y * cubeInfo.size * stride + x * stride + 1];
          let b = dataArray[y * cubeInfo.size * stride + x * stride + 2];
          if (isNaN(r)) {
            r = 0;
          }
          if (isNaN(g)) {
            g = 0;
          }
          if (isNaN(b)) {
            b = 0;
          }
          if (cubeInfo.type === 0) {
            r /= 255;
            g /= 255;
            b /= 255;
          }
          if (cubeInfo.gammaSpace) {
            r = Math.pow(Scalar.Clamp(r), ToLinearSpace);
            g = Math.pow(Scalar.Clamp(g), ToLinearSpace);
            b = Math.pow(Scalar.Clamp(b), ToLinearSpace);
          }
          const max = this.MAX_HDRI_VALUE;
          if (this.PRESERVE_CLAMPED_COLORS) {
            const currentMax = Math.max(r, g, b);
            if (currentMax > max) {
              const factor = max / currentMax;
              r *= factor;
              g *= factor;
              b *= factor;
            }
          } else {
            r = Scalar.Clamp(r, 0, max);
            g = Scalar.Clamp(g, 0, max);
            b = Scalar.Clamp(b, 0, max);
          }
          const color = new Color3(r, g, b);
          sphericalHarmonics.addLight(worldDirection, color, deltaSolidAngle);
          totalSolidAngle += deltaSolidAngle;
          u += du;
        }
        v += dv;
      }
    }
    const sphereSolidAngle = 4 * Math.PI;
    const facesProcessed = 6;
    const expectedSolidAngle = sphereSolidAngle * facesProcessed / 6;
    const correctionFactor = expectedSolidAngle / totalSolidAngle;
    sphericalHarmonics.scaleInPlace(correctionFactor);
    sphericalHarmonics.convertIncidentRadianceToIrradiance();
    sphericalHarmonics.convertIrradianceToLambertianRadiance();
    return SphericalPolynomial.FromHarmonics(sphericalHarmonics);
  }
};
CubeMapToSphericalPolynomialTools._FileFaces = [
  new FileFaceOrientation("right", new Vector3(1, 0, 0), new Vector3(0, 0, -1), new Vector3(0, -1, 0)),
  new FileFaceOrientation("left", new Vector3(-1, 0, 0), new Vector3(0, 0, 1), new Vector3(0, -1, 0)),
  new FileFaceOrientation("up", new Vector3(0, 1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, 1)),
  new FileFaceOrientation("down", new Vector3(0, -1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, -1)),
  new FileFaceOrientation("front", new Vector3(0, 0, 1), new Vector3(1, 0, 0), new Vector3(0, -1, 0)),
  new FileFaceOrientation("back", new Vector3(0, 0, -1), new Vector3(-1, 0, 0), new Vector3(0, -1, 0))
  // -Z bottom
];
CubeMapToSphericalPolynomialTools.MAX_HDRI_VALUE = 4096;
CubeMapToSphericalPolynomialTools.PRESERVE_CLAMPED_COLORS = false;

// node_modules/@babylonjs/core/Materials/Textures/baseTexture.polynomial.js
BaseTexture.prototype.forceSphericalPolynomialsRecompute = function() {
  if (this._texture) {
    this._texture._sphericalPolynomial = null;
    this._texture._sphericalPolynomialPromise = null;
    this._texture._sphericalPolynomialComputed = false;
  }
};
Object.defineProperty(BaseTexture.prototype, "sphericalPolynomial", {
  get: function() {
    if (this._texture) {
      if (this._texture._sphericalPolynomial || this._texture._sphericalPolynomialComputed) {
        return this._texture._sphericalPolynomial;
      }
      if (this._texture.isReady) {
        if (!this._texture._sphericalPolynomialPromise) {
          this._texture._sphericalPolynomialPromise = CubeMapToSphericalPolynomialTools.ConvertCubeMapTextureToSphericalPolynomial(this);
          if (this._texture._sphericalPolynomialPromise === null) {
            this._texture._sphericalPolynomialComputed = true;
          } else {
            this._texture._sphericalPolynomialPromise.then((sphericalPolynomial) => {
              this._texture._sphericalPolynomial = sphericalPolynomial;
              this._texture._sphericalPolynomialComputed = true;
            });
          }
        }
        return null;
      }
    }
    return null;
  },
  set: function(value) {
    if (this._texture) {
      this._texture._sphericalPolynomial = value;
    }
  },
  enumerable: true,
  configurable: true
});

// node_modules/@babylonjs/core/Shaders/rgbdEncode.fragment.js
var name10 = "rgbdEncodePixelShader";
var shader10 = `varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);}`;
ShaderStore.ShadersStore[name10] = shader10;

// node_modules/@babylonjs/core/Misc/environmentTextureTools.js
var DefaultEnvironmentTextureImageType = "image/png";
var CurrentVersion = 2;
var MagicBytes = [134, 22, 135, 150, 246, 214, 150, 54];
function GetEnvInfo(data) {
  const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let pos = 0;
  for (let i = 0; i < MagicBytes.length; i++) {
    if (dataView.getUint8(pos++) !== MagicBytes[i]) {
      Logger.Error("Not a babylon environment map");
      return null;
    }
  }
  let manifestString = "";
  let charCode = 0;
  while (charCode = dataView.getUint8(pos++)) {
    manifestString += String.fromCharCode(charCode);
  }
  let manifest = JSON.parse(manifestString);
  manifest = normalizeEnvInfo(manifest);
  if (manifest.specular) {
    manifest.specular.specularDataPosition = pos;
    manifest.specular.lodGenerationScale = manifest.specular.lodGenerationScale || 0.8;
  }
  return manifest;
}
function normalizeEnvInfo(info) {
  if (info.version > CurrentVersion) {
    throw new Error(`Unsupported babylon environment map version "${info.version}". Latest supported version is "${CurrentVersion}".`);
  }
  if (info.version === 2) {
    return info;
  }
  info = { ...info, version: 2, imageType: DefaultEnvironmentTextureImageType };
  return info;
}
async function CreateEnvTextureAsync(texture, options = {}) {
  var _a;
  const internalTexture = texture.getInternalTexture();
  if (!internalTexture) {
    return Promise.reject("The cube texture is invalid.");
  }
  const imageType = options.imageType ?? DefaultEnvironmentTextureImageType;
  const engine = internalTexture.getEngine();
  if (texture.textureType !== 2 && texture.textureType !== 1 && texture.textureType !== 0 && texture.textureType !== 0 && texture.textureType !== 7 && texture.textureType !== -1) {
    return Promise.reject("The cube texture should allow HDR (Full Float or Half Float).");
  }
  let textureType = 1;
  if (!engine.getCaps().textureFloatRender) {
    textureType = 2;
    if (!engine.getCaps().textureHalfFloatRender) {
      return Promise.reject("Env texture can only be created when the browser supports half float or full float rendering.");
    }
  }
  texture.sphericalPolynomial;
  const sphericalPolynomialPromise = (_a = texture.getInternalTexture()) == null ? void 0 : _a._sphericalPolynomialPromise;
  const cubeWidth = internalTexture.width;
  const hostingScene = new Scene(engine);
  const specularTextures = {};
  engine.flushFramebuffer();
  const mipmapsCount = Scalar.ILog2(internalTexture.width);
  for (let i = 0; i <= mipmapsCount; i++) {
    const faceWidth = Math.pow(2, mipmapsCount - i);
    for (let face = 0; face < 6; face++) {
      let faceData = await texture.readPixels(face, i, void 0, false);
      if (faceData && faceData.byteLength === faceData.length) {
        const faceDataFloat = new Float32Array(faceData.byteLength * 4);
        for (let i2 = 0; i2 < faceData.byteLength; i2++) {
          faceDataFloat[i2] = faceData[i2] / 255;
          faceDataFloat[i2] = Math.pow(faceDataFloat[i2], 2.2);
        }
        faceData = faceDataFloat;
      } else if (faceData && texture.gammaSpace) {
        const floatData = faceData;
        for (let i2 = 0; i2 < floatData.length; i2++) {
          floatData[i2] = Math.pow(floatData[i2], 2.2);
        }
      }
      const tempTexture = engine.createRawTexture(faceData, faceWidth, faceWidth, 5, false, true, 1, null, textureType);
      await RGBDTextureTools.EncodeTextureToRGBD(tempTexture, hostingScene, textureType);
      const rgbdEncodedData = await engine._readTexturePixels(tempTexture, faceWidth, faceWidth);
      const imageEncodedData = await DumpTools.DumpDataAsync(faceWidth, faceWidth, rgbdEncodedData, imageType, void 0, false, true, options.imageQuality);
      specularTextures[i * 6 + face] = imageEncodedData;
      tempTexture.dispose();
    }
  }
  hostingScene.dispose();
  if (sphericalPolynomialPromise) {
    await sphericalPolynomialPromise;
  }
  const info = {
    version: CurrentVersion,
    width: cubeWidth,
    imageType,
    irradiance: _CreateEnvTextureIrradiance(texture),
    specular: {
      mipmaps: [],
      lodGenerationScale: texture.lodGenerationScale
    }
  };
  let position = 0;
  for (let i = 0; i <= mipmapsCount; i++) {
    for (let face = 0; face < 6; face++) {
      const byteLength = specularTextures[i * 6 + face].byteLength;
      info.specular.mipmaps.push({
        length: byteLength,
        position
      });
      position += byteLength;
    }
  }
  const infoString = JSON.stringify(info);
  const infoBuffer = new ArrayBuffer(infoString.length + 1);
  const infoView = new Uint8Array(infoBuffer);
  for (let i = 0, strLen = infoString.length; i < strLen; i++) {
    infoView[i] = infoString.charCodeAt(i);
  }
  infoView[infoString.length] = 0;
  const totalSize = MagicBytes.length + position + infoBuffer.byteLength;
  const finalBuffer = new ArrayBuffer(totalSize);
  const finalBufferView = new Uint8Array(finalBuffer);
  const dataView = new DataView(finalBuffer);
  let pos = 0;
  for (let i = 0; i < MagicBytes.length; i++) {
    dataView.setUint8(pos++, MagicBytes[i]);
  }
  finalBufferView.set(new Uint8Array(infoBuffer), pos);
  pos += infoBuffer.byteLength;
  for (let i = 0; i <= mipmapsCount; i++) {
    for (let face = 0; face < 6; face++) {
      const dataBuffer = specularTextures[i * 6 + face];
      finalBufferView.set(new Uint8Array(dataBuffer), pos);
      pos += dataBuffer.byteLength;
    }
  }
  return finalBuffer;
}
function _CreateEnvTextureIrradiance(texture) {
  const polynmials = texture.sphericalPolynomial;
  if (polynmials == null) {
    return null;
  }
  return {
    x: [polynmials.x.x, polynmials.x.y, polynmials.x.z],
    y: [polynmials.y.x, polynmials.y.y, polynmials.y.z],
    z: [polynmials.z.x, polynmials.z.y, polynmials.z.z],
    xx: [polynmials.xx.x, polynmials.xx.y, polynmials.xx.z],
    yy: [polynmials.yy.x, polynmials.yy.y, polynmials.yy.z],
    zz: [polynmials.zz.x, polynmials.zz.y, polynmials.zz.z],
    yz: [polynmials.yz.x, polynmials.yz.y, polynmials.yz.z],
    zx: [polynmials.zx.x, polynmials.zx.y, polynmials.zx.z],
    xy: [polynmials.xy.x, polynmials.xy.y, polynmials.xy.z]
  };
}
function CreateImageDataArrayBufferViews(data, info) {
  info = normalizeEnvInfo(info);
  const specularInfo = info.specular;
  let mipmapsCount = Scalar.Log2(info.width);
  mipmapsCount = Math.round(mipmapsCount) + 1;
  if (specularInfo.mipmaps.length !== 6 * mipmapsCount) {
    throw new Error(`Unsupported specular mipmaps number "${specularInfo.mipmaps.length}"`);
  }
  const imageData = new Array(mipmapsCount);
  for (let i = 0; i < mipmapsCount; i++) {
    imageData[i] = new Array(6);
    for (let face = 0; face < 6; face++) {
      const imageInfo = specularInfo.mipmaps[i * 6 + face];
      imageData[i][face] = new Uint8Array(data.buffer, data.byteOffset + specularInfo.specularDataPosition + imageInfo.position, imageInfo.length);
    }
  }
  return imageData;
}
function UploadEnvLevelsAsync(texture, data, info) {
  info = normalizeEnvInfo(info);
  const specularInfo = info.specular;
  if (!specularInfo) {
    return Promise.resolve();
  }
  texture._lodGenerationScale = specularInfo.lodGenerationScale;
  const imageData = CreateImageDataArrayBufferViews(data, info);
  return UploadLevelsAsync(texture, imageData, info.imageType);
}
function _OnImageReadyAsync(image, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture) {
  return new Promise((resolve, reject) => {
    if (expandTexture) {
      const tempTexture = engine.createTexture(null, true, true, null, 1, null, (message) => {
        reject(message);
      }, image);
      rgbdPostProcess.getEffect().executeWhenCompiled(() => {
        rgbdPostProcess.externalTextureSamplerBinding = true;
        rgbdPostProcess.onApply = (effect) => {
          effect._bindTexture("textureSampler", tempTexture);
          effect.setFloat2("scale", 1, engine._features.needsInvertingBitmap && image instanceof ImageBitmap ? -1 : 1);
        };
        if (!engine.scenes.length) {
          return;
        }
        engine.scenes[0].postProcessManager.directRender([rgbdPostProcess], cubeRtt, true, face, i);
        engine.restoreDefaultFramebuffer();
        tempTexture.dispose();
        URL.revokeObjectURL(url);
        resolve();
      });
    } else {
      engine._uploadImageToTexture(texture, image, face, i);
      if (generateNonLODTextures) {
        const lodTexture = lodTextures[i];
        if (lodTexture) {
          engine._uploadImageToTexture(lodTexture._texture, image, face, 0);
        }
      }
      resolve();
    }
  });
}
function UploadLevelsAsync(texture, imageData, imageType = DefaultEnvironmentTextureImageType) {
  if (!Tools.IsExponentOfTwo(texture.width)) {
    throw new Error("Texture size must be a power of two");
  }
  const mipmapsCount = Scalar.ILog2(texture.width) + 1;
  const engine = texture.getEngine();
  let expandTexture = false;
  let generateNonLODTextures = false;
  let rgbdPostProcess = null;
  let cubeRtt = null;
  let lodTextures = null;
  const caps = engine.getCaps();
  texture.format = 5;
  texture.type = 0;
  texture.generateMipMaps = true;
  texture._cachedAnisotropicFilteringLevel = null;
  engine.updateTextureSamplingMode(3, texture);
  if (!caps.textureLOD) {
    expandTexture = false;
    generateNonLODTextures = true;
    lodTextures = {};
  } else if (!engine._features.supportRenderAndCopyToLodForFloatTextures) {
    expandTexture = false;
  } else if (caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering) {
    expandTexture = true;
    texture.type = 2;
  } else if (caps.textureFloatRender && caps.textureFloatLinearFiltering) {
    expandTexture = true;
    texture.type = 1;
  }
  if (expandTexture) {
    rgbdPostProcess = new PostProcess("rgbdDecode", "rgbdDecode", null, null, 1, null, 3, engine, false, void 0, texture.type, void 0, null, false);
    texture._isRGBD = false;
    texture.invertY = false;
    cubeRtt = engine.createRenderTargetCubeTexture(texture.width, {
      generateDepthBuffer: false,
      generateMipMaps: true,
      generateStencilBuffer: false,
      samplingMode: 3,
      type: texture.type,
      format: 5
    });
  } else {
    texture._isRGBD = true;
    texture.invertY = true;
    if (generateNonLODTextures) {
      const mipSlices = 3;
      const scale = texture._lodGenerationScale;
      const offset = texture._lodGenerationOffset;
      for (let i = 0; i < mipSlices; i++) {
        const smoothness = i / (mipSlices - 1);
        const roughness = 1 - smoothness;
        const minLODIndex = offset;
        const maxLODIndex = (mipmapsCount - 1) * scale + offset;
        const lodIndex = minLODIndex + (maxLODIndex - minLODIndex) * roughness;
        const mipmapIndex = Math.round(Math.min(Math.max(lodIndex, 0), maxLODIndex));
        const glTextureFromLod = new InternalTexture(engine, InternalTextureSource.Temp);
        glTextureFromLod.isCube = true;
        glTextureFromLod.invertY = true;
        glTextureFromLod.generateMipMaps = false;
        engine.updateTextureSamplingMode(2, glTextureFromLod);
        const lodTexture = new BaseTexture(null);
        lodTexture._isCube = true;
        lodTexture._texture = glTextureFromLod;
        lodTextures[mipmapIndex] = lodTexture;
        switch (i) {
          case 0:
            texture._lodTextureLow = lodTexture;
            break;
          case 1:
            texture._lodTextureMid = lodTexture;
            break;
          case 2:
            texture._lodTextureHigh = lodTexture;
            break;
        }
      }
    }
  }
  const promises = [];
  for (let i = 0; i < imageData.length; i++) {
    for (let face = 0; face < 6; face++) {
      const bytes = imageData[i][face];
      const blob = new Blob([bytes], { type: imageType });
      const url = URL.createObjectURL(blob);
      let promise;
      if (engine._features.forceBitmapOverHTMLImageElement) {
        promise = engine.createImageBitmap(blob, { premultiplyAlpha: "none" }).then((img) => {
          return _OnImageReadyAsync(img, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture);
        });
      } else {
        const image = new Image();
        image.src = url;
        promise = new Promise((resolve, reject) => {
          image.onload = () => {
            _OnImageReadyAsync(image, engine, expandTexture, rgbdPostProcess, url, face, i, generateNonLODTextures, lodTextures, cubeRtt, texture).then(() => resolve()).catch((reason) => {
              reject(reason);
            });
          };
          image.onerror = (error) => {
            reject(error);
          };
        });
      }
      promises.push(promise);
    }
  }
  if (imageData.length < mipmapsCount) {
    let data;
    const size = Math.pow(2, mipmapsCount - 1 - imageData.length);
    const dataLength = size * size * 4;
    switch (texture.type) {
      case 0: {
        data = new Uint8Array(dataLength);
        break;
      }
      case 2: {
        data = new Uint16Array(dataLength);
        break;
      }
      case 1: {
        data = new Float32Array(dataLength);
        break;
      }
    }
    for (let i = imageData.length; i < mipmapsCount; i++) {
      for (let face = 0; face < 6; face++) {
        engine._uploadArrayBufferViewToTexture(texture, data, face, i);
      }
    }
  }
  return Promise.all(promises).then(() => {
    if (cubeRtt) {
      engine._releaseTexture(texture);
      cubeRtt._swapAndDie(texture);
    }
    if (rgbdPostProcess) {
      rgbdPostProcess.dispose();
    }
    if (generateNonLODTextures) {
      if (texture._lodTextureHigh && texture._lodTextureHigh._texture) {
        texture._lodTextureHigh._texture.isReady = true;
      }
      if (texture._lodTextureMid && texture._lodTextureMid._texture) {
        texture._lodTextureMid._texture.isReady = true;
      }
      if (texture._lodTextureLow && texture._lodTextureLow._texture) {
        texture._lodTextureLow._texture.isReady = true;
      }
    }
  });
}
function UploadEnvSpherical(texture, info) {
  info = normalizeEnvInfo(info);
  const irradianceInfo = info.irradiance;
  if (!irradianceInfo) {
    return;
  }
  const sp = new SphericalPolynomial();
  Vector3.FromArrayToRef(irradianceInfo.x, 0, sp.x);
  Vector3.FromArrayToRef(irradianceInfo.y, 0, sp.y);
  Vector3.FromArrayToRef(irradianceInfo.z, 0, sp.z);
  Vector3.FromArrayToRef(irradianceInfo.xx, 0, sp.xx);
  Vector3.FromArrayToRef(irradianceInfo.yy, 0, sp.yy);
  Vector3.FromArrayToRef(irradianceInfo.zz, 0, sp.zz);
  Vector3.FromArrayToRef(irradianceInfo.yz, 0, sp.yz);
  Vector3.FromArrayToRef(irradianceInfo.zx, 0, sp.zx);
  Vector3.FromArrayToRef(irradianceInfo.xy, 0, sp.xy);
  texture._sphericalPolynomial = sp;
}
function _UpdateRGBDAsync(internalTexture, data, sphericalPolynomial, lodScale, lodOffset) {
  const proxy = internalTexture.getEngine().createRawCubeTexture(null, internalTexture.width, internalTexture.format, internalTexture.type, internalTexture.generateMipMaps, internalTexture.invertY, internalTexture.samplingMode, internalTexture._compression);
  const proxyPromise = UploadLevelsAsync(proxy, data).then(() => internalTexture);
  internalTexture.onRebuildCallback = (_internalTexture) => {
    return {
      proxy: proxyPromise,
      isReady: true,
      isAsync: true
    };
  };
  internalTexture._source = InternalTextureSource.CubeRawRGBD;
  internalTexture._bufferViewArrayArray = data;
  internalTexture._lodGenerationScale = lodScale;
  internalTexture._lodGenerationOffset = lodOffset;
  internalTexture._sphericalPolynomial = sphericalPolynomial;
  return UploadLevelsAsync(internalTexture, data).then(() => {
    internalTexture.isReady = true;
    return internalTexture;
  });
}
var EnvironmentTextureTools = {
  /**
   * Gets the environment info from an env file.
   * @param data The array buffer containing the .env bytes.
   * @returns the environment file info (the json header) if successfully parsed, normalized to the latest supported version.
   */
  GetEnvInfo,
  /**
   * Creates an environment texture from a loaded cube texture.
   * @param texture defines the cube texture to convert in env file
   * @param options options for the conversion process
   * @param options.imageType the mime type for the encoded images, with support for "image/png" (default) and "image/webp"
   * @param options.imageQuality the image quality of encoded WebP images.
   * @returns a promise containing the environment data if successful.
   */
  CreateEnvTextureAsync,
  /**
   * Creates the ArrayBufferViews used for initializing environment texture image data.
   * @param data the image data
   * @param info parameters that determine what views will be created for accessing the underlying buffer
   * @returns the views described by info providing access to the underlying buffer
   */
  CreateImageDataArrayBufferViews,
  /**
   * Uploads the texture info contained in the env file to the GPU.
   * @param texture defines the internal texture to upload to
   * @param data defines the data to load
   * @param info defines the texture info retrieved through the GetEnvInfo method
   * @returns a promise
   */
  UploadEnvLevelsAsync,
  /**
   * Uploads the levels of image data to the GPU.
   * @param texture defines the internal texture to upload to
   * @param imageData defines the array buffer views of image data [mipmap][face]
   * @param imageType the mime type of the image data
   * @returns a promise
   */
  UploadLevelsAsync,
  /**
   * Uploads spherical polynomials information to the texture.
   * @param texture defines the texture we are trying to upload the information to
   * @param info defines the environment texture info retrieved through the GetEnvInfo method
   */
  UploadEnvSpherical
};

// node_modules/@babylonjs/core/Misc/codeStringParsingTools.js
function ExtractBetweenMarkers(markerOpen, markerClose, block, startIndex) {
  let currPos = startIndex, openMarkers = 0, waitForChar = "";
  while (currPos < block.length) {
    const currChar = block.charAt(currPos);
    if (!waitForChar) {
      switch (currChar) {
        case markerOpen:
          openMarkers++;
          break;
        case markerClose:
          openMarkers--;
          break;
        case '"':
        case "'":
        case "`":
          waitForChar = currChar;
          break;
        case "/":
          if (currPos + 1 < block.length) {
            const nextChar = block.charAt(currPos + 1);
            if (nextChar === "/") {
              waitForChar = "\n";
            } else if (nextChar === "*") {
              waitForChar = "*/";
            }
          }
          break;
      }
    } else {
      if (currChar === waitForChar) {
        if (waitForChar === '"' || waitForChar === "'") {
          block.charAt(currPos - 1) !== "\\" && (waitForChar = "");
        } else {
          waitForChar = "";
        }
      } else if (waitForChar === "*/" && currChar === "*" && currPos + 1 < block.length) {
        block.charAt(currPos + 1) === "/" && (waitForChar = "");
        if (waitForChar === "") {
          currPos++;
        }
      }
    }
    currPos++;
    if (openMarkers === 0) {
      break;
    }
  }
  return openMarkers === 0 ? currPos - 1 : -1;
}
function SkipWhitespaces(s, index) {
  while (index < s.length) {
    const c = s[index];
    if (c !== " " && c !== "\n" && c !== "\r" && c !== "	" && c !== "\n" && c !== " ") {
      break;
    }
    index++;
  }
  return index;
}
function IsIdentifierChar(c) {
  const v = c.charCodeAt(0);
  return v >= 48 && v <= 57 || // 0-9
  v >= 65 && v <= 90 || // A-Z
  v >= 97 && v <= 122 || // a-z
  v == 95;
}
function RemoveComments(block) {
  let currPos = 0, waitForChar = "", inComments = false;
  const s = [];
  while (currPos < block.length) {
    const currChar = block.charAt(currPos);
    if (!waitForChar) {
      switch (currChar) {
        case '"':
        case "'":
        case "`":
          waitForChar = currChar;
          break;
        case "/":
          if (currPos + 1 < block.length) {
            const nextChar = block.charAt(currPos + 1);
            if (nextChar === "/") {
              waitForChar = "\n";
              inComments = true;
            } else if (nextChar === "*") {
              waitForChar = "*/";
              inComments = true;
            }
          }
          break;
      }
      if (!inComments) {
        s.push(currChar);
      }
    } else {
      if (currChar === waitForChar) {
        if (waitForChar === '"' || waitForChar === "'") {
          block.charAt(currPos - 1) !== "\\" && (waitForChar = "");
          s.push(currChar);
        } else {
          waitForChar = "";
          inComments = false;
        }
      } else if (waitForChar === "*/" && currChar === "*" && currPos + 1 < block.length) {
        block.charAt(currPos + 1) === "/" && (waitForChar = "");
        if (waitForChar === "") {
          inComments = false;
          currPos++;
        }
      } else {
        if (!inComments) {
          s.push(currChar);
        }
      }
    }
    currPos++;
  }
  return s.join("");
}
function FindBackward(s, index, c, c2) {
  while (index >= 0 && s.charAt(index) !== c && (!c2 || s.charAt(index) !== c2)) {
    index--;
  }
  return index;
}
function EscapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// node_modules/@babylonjs/core/Engines/Processors/shaderCodeInliner.js
var ShaderCodeInliner = class _ShaderCodeInliner {
  /** Gets the code after the inlining process */
  get code() {
    return this._sourceCode;
  }
  /**
   * Initializes the inliner
   * @param sourceCode shader code source to inline
   * @param numMaxIterations maximum number of iterations (used to detect recursive calls)
   */
  constructor(sourceCode, numMaxIterations = 20) {
    this.debug = false;
    this._sourceCode = sourceCode;
    this._numMaxIterations = numMaxIterations;
    this._functionDescr = [];
    this.inlineToken = "#define inline";
  }
  /**
   * Start the processing of the shader code
   */
  processCode() {
    if (this.debug) {
      Logger.Log(`Start inlining process (code size=${this._sourceCode.length})...`);
    }
    this._collectFunctions();
    this._processInlining(this._numMaxIterations);
    if (this.debug) {
      Logger.Log("End of inlining process.");
    }
  }
  _collectFunctions() {
    let startIndex = 0;
    while (startIndex < this._sourceCode.length) {
      const inlineTokenIndex = this._sourceCode.indexOf(this.inlineToken, startIndex);
      if (inlineTokenIndex < 0) {
        break;
      }
      const funcParamsStartIndex = this._sourceCode.indexOf("(", inlineTokenIndex + this.inlineToken.length);
      if (funcParamsStartIndex < 0) {
        if (this.debug) {
          Logger.Warn(`Could not find the opening parenthesis after the token. startIndex=${startIndex}`);
        }
        startIndex = inlineTokenIndex + this.inlineToken.length;
        continue;
      }
      const funcNameMatch = _ShaderCodeInliner._RegexpFindFunctionNameAndType.exec(this._sourceCode.substring(inlineTokenIndex + this.inlineToken.length, funcParamsStartIndex));
      if (!funcNameMatch) {
        if (this.debug) {
          Logger.Warn(`Could not extract the name/type of the function from: ${this._sourceCode.substring(inlineTokenIndex + this.inlineToken.length, funcParamsStartIndex)}`);
        }
        startIndex = inlineTokenIndex + this.inlineToken.length;
        continue;
      }
      const [funcType, funcName] = [funcNameMatch[3], funcNameMatch[4]];
      const funcParamsEndIndex = ExtractBetweenMarkers("(", ")", this._sourceCode, funcParamsStartIndex);
      if (funcParamsEndIndex < 0) {
        if (this.debug) {
          Logger.Warn(`Could not extract the parameters the function '${funcName}' (type=${funcType}). funcParamsStartIndex=${funcParamsStartIndex}`);
        }
        startIndex = inlineTokenIndex + this.inlineToken.length;
        continue;
      }
      const funcParams = this._sourceCode.substring(funcParamsStartIndex + 1, funcParamsEndIndex);
      const funcBodyStartIndex = SkipWhitespaces(this._sourceCode, funcParamsEndIndex + 1);
      if (funcBodyStartIndex === this._sourceCode.length) {
        if (this.debug) {
          Logger.Warn(`Could not extract the body of the function '${funcName}' (type=${funcType}). funcParamsEndIndex=${funcParamsEndIndex}`);
        }
        startIndex = inlineTokenIndex + this.inlineToken.length;
        continue;
      }
      const funcBodyEndIndex = ExtractBetweenMarkers("{", "}", this._sourceCode, funcBodyStartIndex);
      if (funcBodyEndIndex < 0) {
        if (this.debug) {
          Logger.Warn(`Could not extract the body of the function '${funcName}' (type=${funcType}). funcBodyStartIndex=${funcBodyStartIndex}`);
        }
        startIndex = inlineTokenIndex + this.inlineToken.length;
        continue;
      }
      const funcBody = this._sourceCode.substring(funcBodyStartIndex, funcBodyEndIndex + 1);
      const params = RemoveComments(funcParams).split(",");
      const paramNames = [];
      for (let p = 0; p < params.length; ++p) {
        const param = params[p].trim();
        const idx = param.lastIndexOf(" ");
        if (idx >= 0) {
          paramNames.push(param.substring(idx + 1));
        }
      }
      if (funcType !== "void") {
        paramNames.push("return");
      }
      this._functionDescr.push({
        name: funcName,
        type: funcType,
        parameters: paramNames,
        body: funcBody,
        callIndex: 0
      });
      startIndex = funcBodyEndIndex + 1;
      const partBefore = inlineTokenIndex > 0 ? this._sourceCode.substring(0, inlineTokenIndex) : "";
      const partAfter = funcBodyEndIndex + 1 < this._sourceCode.length - 1 ? this._sourceCode.substring(funcBodyEndIndex + 1) : "";
      this._sourceCode = partBefore + partAfter;
      startIndex -= funcBodyEndIndex + 1 - inlineTokenIndex;
    }
    if (this.debug) {
      Logger.Log(`Collect functions: ${this._functionDescr.length} functions found. functionDescr=${this._functionDescr}`);
    }
  }
  _processInlining(numMaxIterations = 20) {
    while (numMaxIterations-- >= 0) {
      if (!this._replaceFunctionCallsByCode()) {
        break;
      }
    }
    if (this.debug) {
      Logger.Log(`numMaxIterations is ${numMaxIterations} after inlining process`);
    }
    return numMaxIterations >= 0;
  }
  _replaceFunctionCallsByCode() {
    let doAgain = false;
    for (const func of this._functionDescr) {
      const { name: name11, type, parameters, body } = func;
      let startIndex = 0;
      while (startIndex < this._sourceCode.length) {
        const functionCallIndex = this._sourceCode.indexOf(name11, startIndex);
        if (functionCallIndex < 0) {
          break;
        }
        if (functionCallIndex === 0 || IsIdentifierChar(this._sourceCode.charAt(functionCallIndex - 1))) {
          startIndex = functionCallIndex + name11.length;
          continue;
        }
        const callParamsStartIndex = SkipWhitespaces(this._sourceCode, functionCallIndex + name11.length);
        if (callParamsStartIndex === this._sourceCode.length || this._sourceCode.charAt(callParamsStartIndex) !== "(") {
          startIndex = functionCallIndex + name11.length;
          continue;
        }
        const callParamsEndIndex = ExtractBetweenMarkers("(", ")", this._sourceCode, callParamsStartIndex);
        if (callParamsEndIndex < 0) {
          if (this.debug) {
            Logger.Warn(`Could not extract the parameters of the function call. Function '${name11}' (type=${type}). callParamsStartIndex=${callParamsStartIndex}`);
          }
          startIndex = functionCallIndex + name11.length;
          continue;
        }
        const callParams = this._sourceCode.substring(callParamsStartIndex + 1, callParamsEndIndex);
        const splitParameterCall = (s) => {
          const parameters2 = [];
          let curIdx = 0, startParamIdx = 0;
          while (curIdx < s.length) {
            if (s.charAt(curIdx) === "(") {
              const idx2 = ExtractBetweenMarkers("(", ")", s, curIdx);
              if (idx2 < 0) {
                return null;
              }
              curIdx = idx2;
            } else if (s.charAt(curIdx) === ",") {
              parameters2.push(s.substring(startParamIdx, curIdx));
              startParamIdx = curIdx + 1;
            }
            curIdx++;
          }
          if (startParamIdx < curIdx) {
            parameters2.push(s.substring(startParamIdx, curIdx));
          }
          return parameters2;
        };
        const params = splitParameterCall(RemoveComments(callParams));
        if (params === null) {
          if (this.debug) {
            Logger.Warn(`Invalid function call: can't extract the parameters of the function call. Function '${name11}' (type=${type}). callParamsStartIndex=${callParamsStartIndex}, callParams=` + callParams);
          }
          startIndex = functionCallIndex + name11.length;
          continue;
        }
        const paramNames = [];
        for (let p = 0; p < params.length; ++p) {
          const param = params[p].trim();
          paramNames.push(param);
        }
        const retParamName = type !== "void" ? name11 + "_" + func.callIndex++ : null;
        if (retParamName) {
          paramNames.push(retParamName + " =");
        }
        if (paramNames.length !== parameters.length) {
          if (this.debug) {
            Logger.Warn(`Invalid function call: not the same number of parameters for the call than the number expected by the function. Function '${name11}' (type=${type}). function parameters=${parameters}, call parameters=${paramNames}`);
          }
          startIndex = functionCallIndex + name11.length;
          continue;
        }
        startIndex = callParamsEndIndex + 1;
        const funcBody = this._replaceNames(body, parameters, paramNames);
        let partBefore = functionCallIndex > 0 ? this._sourceCode.substring(0, functionCallIndex) : "";
        const partAfter = callParamsEndIndex + 1 < this._sourceCode.length - 1 ? this._sourceCode.substring(callParamsEndIndex + 1) : "";
        if (retParamName) {
          const injectDeclarationIndex = FindBackward(this._sourceCode, functionCallIndex - 1, "\n", "{");
          partBefore = this._sourceCode.substring(0, injectDeclarationIndex + 1);
          const partBetween = this._sourceCode.substring(injectDeclarationIndex + 1, functionCallIndex);
          this._sourceCode = partBefore + type + " " + retParamName + ";\n" + funcBody + "\n" + partBetween + retParamName + partAfter;
          if (this.debug) {
            Logger.Log(`Replace function call by code. Function '${name11}' (type=${type}). injectDeclarationIndex=${injectDeclarationIndex}, call parameters=${paramNames}`);
          }
        } else {
          this._sourceCode = partBefore + funcBody + partAfter;
          startIndex += funcBody.length - (callParamsEndIndex + 1 - functionCallIndex);
          if (this.debug) {
            Logger.Log(`Replace function call by code. Function '${name11}' (type=${type}). functionCallIndex=${functionCallIndex}, call parameters=${paramNames}`);
          }
        }
        doAgain = true;
      }
    }
    return doAgain;
  }
  _replaceNames(code, sources, destinations) {
    for (let i = 0; i < sources.length; ++i) {
      const source = new RegExp(EscapeRegExp(sources[i]), "g"), sourceLen = sources[i].length, destination = destinations[i];
      code = code.replace(source, (match, ...args) => {
        const offset = args[0];
        if (IsIdentifierChar(code.charAt(offset - 1)) || IsIdentifierChar(code.charAt(offset + sourceLen))) {
          return sources[i];
        }
        return destination;
      });
    }
    return code;
  }
};
ShaderCodeInliner._RegexpFindFunctionNameAndType = /((\s+?)(\w+)\s+(\w+)\s*?)$/;

// node_modules/@babylonjs/core/Engines/Native/nativeDataStream.js
var NativeDataStream = class _NativeDataStream {
  constructor() {
    const buffer = new ArrayBuffer(_NativeDataStream.DEFAULT_BUFFER_SIZE);
    this._uint32s = new Uint32Array(buffer);
    this._int32s = new Int32Array(buffer);
    this._float32s = new Float32Array(buffer);
    this._length = _NativeDataStream.DEFAULT_BUFFER_SIZE / 4;
    this._position = 0;
    this._nativeDataStream = new _native.NativeDataStream(() => {
      this._flush();
    });
  }
  /**
   * Writes a uint32 to the stream
   * @param value the value to write
   */
  writeUint32(value) {
    this._flushIfNecessary(1);
    this._uint32s[this._position++] = value;
  }
  /**
   * Writes an int32 to the stream
   * @param value the value to write
   */
  writeInt32(value) {
    this._flushIfNecessary(1);
    this._int32s[this._position++] = value;
  }
  /**
   * Writes a float32 to the stream
   * @param value the value to write
   */
  writeFloat32(value) {
    this._flushIfNecessary(1);
    this._float32s[this._position++] = value;
  }
  /**
   * Writes a uint32 array to the stream
   * @param values the values to write
   */
  writeUint32Array(values) {
    this._flushIfNecessary(1 + values.length);
    this._uint32s[this._position++] = values.length;
    this._uint32s.set(values, this._position);
    this._position += values.length;
  }
  /**
   * Writes an int32 array to the stream
   * @param values the values to write
   */
  writeInt32Array(values) {
    this._flushIfNecessary(1 + values.length);
    this._uint32s[this._position++] = values.length;
    this._int32s.set(values, this._position);
    this._position += values.length;
  }
  /**
   * Writes a float32 array to the stream
   * @param values the values to write
   */
  writeFloat32Array(values) {
    this._flushIfNecessary(1 + values.length);
    this._uint32s[this._position++] = values.length;
    this._float32s.set(values, this._position);
    this._position += values.length;
  }
  /**
   * Writes native data to the stream
   * @param handle the handle to the native data
   */
  writeNativeData(handle) {
    this._flushIfNecessary(handle.length);
    this._uint32s.set(handle, this._position);
    this._position += handle.length;
  }
  /**
   * Writes a boolean to the stream
   * @param value the value to write
   */
  writeBoolean(value) {
    this.writeUint32(value ? 1 : 0);
  }
  _flushIfNecessary(required) {
    if (this._position + required > this._length) {
      this._flush();
    }
  }
  _flush() {
    this._nativeDataStream.writeBuffer(this._uint32s.buffer, this._position);
    this._position = 0;
  }
};
NativeDataStream.DEFAULT_BUFFER_SIZE = 65536;

// node_modules/@babylonjs/core/Engines/Native/nativePipelineContext.js
var NativePipelineContext = class {
  get isReady() {
    if (this.compilationError) {
      const message = this.compilationError.message;
      throw new Error("SHADER ERROR" + (typeof message === "string" ? "\n" + message : ""));
    }
    return this.isCompiled;
  }
  _getVertexShaderCode() {
    return null;
  }
  _getFragmentShaderCode() {
    return null;
  }
  constructor(engine, isAsync) {
    this.isCompiled = false;
    this._valueCache = {};
    this._engine = engine;
    this.isAsync = isAsync;
  }
  _fillEffectInformation(effect, uniformBuffersNames, uniformsNames, uniforms, samplerList, samplers, attributesNames, attributes) {
    const engine = this._engine;
    if (engine.supportsUniformBuffers) {
      for (const name11 in uniformBuffersNames) {
        effect.bindUniformBlock(name11, uniformBuffersNames[name11]);
      }
    }
    const effectAvailableUniforms = this._engine.getUniforms(this, uniformsNames);
    effectAvailableUniforms.forEach((uniform, index2) => {
      uniforms[uniformsNames[index2]] = uniform;
    });
    this._uniforms = uniforms;
    let index;
    for (index = 0; index < samplerList.length; index++) {
      const sampler = effect.getUniform(samplerList[index]);
      if (sampler == null) {
        samplerList.splice(index, 1);
        index--;
      }
    }
    samplerList.forEach((name11, index2) => {
      samplers[name11] = index2;
    });
    attributes.push(...engine.getAttributes(this, attributesNames));
  }
  /**
   * Release all associated resources.
   **/
  dispose() {
    this._uniforms = {};
  }
  /**
   * @internal
   */
  _cacheMatrix(uniformName, matrix) {
    const cache = this._valueCache[uniformName];
    const flag = matrix.updateFlag;
    if (cache !== void 0 && cache === flag) {
      return false;
    }
    this._valueCache[uniformName] = flag;
    return true;
  }
  /**
   * @internal
   */
  _cacheFloat2(uniformName, x, y) {
    let cache = this._valueCache[uniformName];
    if (!cache) {
      cache = [x, y];
      this._valueCache[uniformName] = cache;
      return true;
    }
    let changed = false;
    if (cache[0] !== x) {
      cache[0] = x;
      changed = true;
    }
    if (cache[1] !== y) {
      cache[1] = y;
      changed = true;
    }
    return changed;
  }
  /**
   * @internal
   */
  _cacheFloat3(uniformName, x, y, z) {
    let cache = this._valueCache[uniformName];
    if (!cache) {
      cache = [x, y, z];
      this._valueCache[uniformName] = cache;
      return true;
    }
    let changed = false;
    if (cache[0] !== x) {
      cache[0] = x;
      changed = true;
    }
    if (cache[1] !== y) {
      cache[1] = y;
      changed = true;
    }
    if (cache[2] !== z) {
      cache[2] = z;
      changed = true;
    }
    return changed;
  }
  /**
   * @internal
   */
  _cacheFloat4(uniformName, x, y, z, w) {
    let cache = this._valueCache[uniformName];
    if (!cache) {
      cache = [x, y, z, w];
      this._valueCache[uniformName] = cache;
      return true;
    }
    let changed = false;
    if (cache[0] !== x) {
      cache[0] = x;
      changed = true;
    }
    if (cache[1] !== y) {
      cache[1] = y;
      changed = true;
    }
    if (cache[2] !== z) {
      cache[2] = z;
      changed = true;
    }
    if (cache[3] !== w) {
      cache[3] = w;
      changed = true;
    }
    return changed;
  }
  /**
   * Sets an integer value on a uniform variable.
   * @param uniformName Name of the variable.
   * @param value Value to be set.
   */
  setInt(uniformName, value) {
    const cache = this._valueCache[uniformName];
    if (cache !== void 0 && cache === value) {
      return;
    }
    if (this._engine.setInt(this._uniforms[uniformName], value)) {
      this._valueCache[uniformName] = value;
    }
  }
  /**
   * Sets a int2 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First int in int2.
   * @param y Second int in int2.
   */
  setInt2(uniformName, x, y) {
    if (this._cacheFloat2(uniformName, x, y)) {
      if (!this._engine.setInt2(this._uniforms[uniformName], x, y)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a int3 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First int in int3.
   * @param y Second int in int3.
   * @param z Third int in int3.
   */
  setInt3(uniformName, x, y, z) {
    if (this._cacheFloat3(uniformName, x, y, z)) {
      if (!this._engine.setInt3(this._uniforms[uniformName], x, y, z)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a int4 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First int in int4.
   * @param y Second int in int4.
   * @param z Third int in int4.
   * @param w Fourth int in int4.
   */
  setInt4(uniformName, x, y, z, w) {
    if (this._cacheFloat4(uniformName, x, y, z, w)) {
      if (!this._engine.setInt4(this._uniforms[uniformName], x, y, z, w)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets an int array on a uniform variable.
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setIntArray(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setIntArray(this._uniforms[uniformName], array);
  }
  /**
   * Sets an int array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setIntArray2(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setIntArray2(this._uniforms[uniformName], array);
  }
  /**
   * Sets an int array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setIntArray3(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setIntArray3(this._uniforms[uniformName], array);
  }
  /**
   * Sets an int array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setIntArray4(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setIntArray4(this._uniforms[uniformName], array);
  }
  /**
   * Sets an unsigned integer value on a uniform variable.
   * @param uniformName Name of the variable.
   * @param value Value to be set.
   */
  setUInt(uniformName, value) {
    const cache = this._valueCache[uniformName];
    if (cache !== void 0 && cache === value) {
      return;
    }
    if (this._engine.setUInt(this._uniforms[uniformName], value)) {
      this._valueCache[uniformName] = value;
    }
  }
  /**
   * Sets a unsigned int2 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First unsigned int in uint2.
   * @param y Second unsigned int in uint2.
   */
  setUInt2(uniformName, x, y) {
    if (this._cacheFloat2(uniformName, x, y)) {
      if (!this._engine.setUInt2(this._uniforms[uniformName], x, y)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a unsigned int3 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First unsigned int in uint3.
   * @param y Second unsigned int in uint3.
   * @param z Third unsigned int in uint3.
   */
  setUInt3(uniformName, x, y, z) {
    if (this._cacheFloat3(uniformName, x, y, z)) {
      if (!this._engine.setUInt3(this._uniforms[uniformName], x, y, z)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a unsigned int4 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First unsigned int in uint4.
   * @param y Second unsigned int in uint4.
   * @param z Third unsigned int in uint4.
   * @param w Fourth unsigned int in uint4.
   */
  setUInt4(uniformName, x, y, z, w) {
    if (this._cacheFloat4(uniformName, x, y, z, w)) {
      if (!this._engine.setUInt4(this._uniforms[uniformName], x, y, z, w)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets an unsigned int array on a uniform variable.
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setUIntArray(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setUIntArray(this._uniforms[uniformName], array);
  }
  /**
   * Sets an unsigned int array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setUIntArray2(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setUIntArray2(this._uniforms[uniformName], array);
  }
  /**
   * Sets an unsigned int array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setUIntArray3(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setUIntArray3(this._uniforms[uniformName], array);
  }
  /**
   * Sets an unsigned int array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setUIntArray4(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setUIntArray4(this._uniforms[uniformName], array);
  }
  /**
   * Sets an float array on a uniform variable.
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setFloatArray(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setFloatArray(this._uniforms[uniformName], array);
  }
  /**
   * Sets an float array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setFloatArray2(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setFloatArray2(this._uniforms[uniformName], array);
  }
  /**
   * Sets an float array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setFloatArray3(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setFloatArray3(this._uniforms[uniformName], array);
  }
  /**
   * Sets an float array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setFloatArray4(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setFloatArray4(this._uniforms[uniformName], array);
  }
  /**
   * Sets an array on a uniform variable.
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setArray(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setArray(this._uniforms[uniformName], array);
  }
  /**
   * Sets an array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setArray2(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setArray2(this._uniforms[uniformName], array);
  }
  /**
   * Sets an array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setArray3(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setArray3(this._uniforms[uniformName], array);
  }
  /**
   * Sets an array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
   * @param uniformName Name of the variable.
   * @param array array to be set.
   */
  setArray4(uniformName, array) {
    this._valueCache[uniformName] = null;
    this._engine.setArray4(this._uniforms[uniformName], array);
  }
  /**
   * Sets matrices on a uniform variable.
   * @param uniformName Name of the variable.
   * @param matrices matrices to be set.
   */
  setMatrices(uniformName, matrices) {
    if (!matrices) {
      return;
    }
    this._valueCache[uniformName] = null;
    this._engine.setMatrices(this._uniforms[uniformName], matrices);
  }
  /**
   * Sets matrix on a uniform variable.
   * @param uniformName Name of the variable.
   * @param matrix matrix to be set.
   */
  setMatrix(uniformName, matrix) {
    if (this._cacheMatrix(uniformName, matrix)) {
      if (!this._engine.setMatrices(this._uniforms[uniformName], matrix.toArray())) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a 3x3 matrix on a uniform variable. (Specified as [1,2,3,4,5,6,7,8,9] will result in [1,2,3][4,5,6][7,8,9] matrix)
   * @param uniformName Name of the variable.
   * @param matrix matrix to be set.
   */
  setMatrix3x3(uniformName, matrix) {
    this._valueCache[uniformName] = null;
    this._engine.setMatrix3x3(this._uniforms[uniformName], matrix);
  }
  /**
   * Sets a 2x2 matrix on a uniform variable. (Specified as [1,2,3,4] will result in [1,2][3,4] matrix)
   * @param uniformName Name of the variable.
   * @param matrix matrix to be set.
   */
  setMatrix2x2(uniformName, matrix) {
    this._valueCache[uniformName] = null;
    this._engine.setMatrix2x2(this._uniforms[uniformName], matrix);
  }
  /**
   * Sets a float on a uniform variable.
   * @param uniformName Name of the variable.
   * @param value value to be set.
   */
  setFloat(uniformName, value) {
    const cache = this._valueCache[uniformName];
    if (cache !== void 0 && cache === value) {
      return;
    }
    if (this._engine.setFloat(this._uniforms[uniformName], value)) {
      this._valueCache[uniformName] = value;
    }
  }
  /**
   * Sets a boolean on a uniform variable.
   * @param uniformName Name of the variable.
   * @param bool value to be set.
   */
  setBool(uniformName, bool) {
    const cache = this._valueCache[uniformName];
    if (cache !== void 0 && cache === bool) {
      return;
    }
    if (this._engine.setInt(this._uniforms[uniformName], bool ? 1 : 0)) {
      this._valueCache[uniformName] = bool ? 1 : 0;
    }
  }
  /**
   * Sets a Vector2 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param vector2 vector2 to be set.
   */
  setVector2(uniformName, vector2) {
    if (this._cacheFloat2(uniformName, vector2.x, vector2.y)) {
      if (!this._engine.setFloat2(this._uniforms[uniformName], vector2.x, vector2.y)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a float2 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First float in float2.
   * @param y Second float in float2.
   */
  setFloat2(uniformName, x, y) {
    if (this._cacheFloat2(uniformName, x, y)) {
      if (!this._engine.setFloat2(this._uniforms[uniformName], x, y)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a Vector3 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param vector3 Value to be set.
   */
  setVector3(uniformName, vector3) {
    if (this._cacheFloat3(uniformName, vector3.x, vector3.y, vector3.z)) {
      if (!this._engine.setFloat3(this._uniforms[uniformName], vector3.x, vector3.y, vector3.z)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a float3 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First float in float3.
   * @param y Second float in float3.
   * @param z Third float in float3.
   */
  setFloat3(uniformName, x, y, z) {
    if (this._cacheFloat3(uniformName, x, y, z)) {
      if (!this._engine.setFloat3(this._uniforms[uniformName], x, y, z)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a Vector4 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param vector4 Value to be set.
   */
  setVector4(uniformName, vector4) {
    if (this._cacheFloat4(uniformName, vector4.x, vector4.y, vector4.z, vector4.w)) {
      if (!this._engine.setFloat4(this._uniforms[uniformName], vector4.x, vector4.y, vector4.z, vector4.w)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a Quaternion on a uniform variable.
   * @param uniformName Name of the variable.
   * @param quaternion Value to be set.
   */
  setQuaternion(uniformName, quaternion) {
    if (this._cacheFloat4(uniformName, quaternion.x, quaternion.y, quaternion.z, quaternion.w)) {
      if (!this._engine.setFloat4(this._uniforms[uniformName], quaternion.x, quaternion.y, quaternion.z, quaternion.w)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a float4 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param x First float in float4.
   * @param y Second float in float4.
   * @param z Third float in float4.
   * @param w Fourth float in float4.
   */
  setFloat4(uniformName, x, y, z, w) {
    if (this._cacheFloat4(uniformName, x, y, z, w)) {
      if (!this._engine.setFloat4(this._uniforms[uniformName], x, y, z, w)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a Color3 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param color3 Value to be set.
   */
  setColor3(uniformName, color3) {
    if (this._cacheFloat3(uniformName, color3.r, color3.g, color3.b)) {
      if (!this._engine.setFloat3(this._uniforms[uniformName], color3.r, color3.g, color3.b)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a Color4 on a uniform variable.
   * @param uniformName Name of the variable.
   * @param color3 Value to be set.
   * @param alpha Alpha value to be set.
   */
  setColor4(uniformName, color3, alpha) {
    if (this._cacheFloat4(uniformName, color3.r, color3.g, color3.b, alpha)) {
      if (!this._engine.setFloat4(this._uniforms[uniformName], color3.r, color3.g, color3.b, alpha)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
  /**
   * Sets a Color4 on a uniform variable
   * @param uniformName defines the name of the variable
   * @param color4 defines the value to be set
   */
  setDirectColor4(uniformName, color4) {
    if (this._cacheFloat4(uniformName, color4.r, color4.g, color4.b, color4.a)) {
      if (!this._engine.setFloat4(this._uniforms[uniformName], color4.r, color4.g, color4.b, color4.a)) {
        this._valueCache[uniformName] = null;
      }
    }
  }
};

// node_modules/@babylonjs/core/Engines/Native/nativeRenderTargetWrapper.js
var NativeRenderTargetWrapper = class extends RenderTargetWrapper {
  get _framebuffer() {
    return this.__framebuffer;
  }
  set _framebuffer(framebuffer) {
    if (this.__framebuffer) {
      this._engine._releaseFramebufferObjects(this.__framebuffer);
    }
    this.__framebuffer = framebuffer;
  }
  get _framebufferDepthStencil() {
    return this.__framebufferDepthStencil;
  }
  set _framebufferDepthStencil(framebufferDepthStencil) {
    if (this.__framebufferDepthStencil) {
      this._engine._releaseFramebufferObjects(this.__framebufferDepthStencil);
    }
    this.__framebufferDepthStencil = framebufferDepthStencil;
  }
  constructor(isMulti, isCube, size, engine) {
    super(isMulti, isCube, size, engine);
    this.__framebuffer = null;
    this.__framebufferDepthStencil = null;
    this._engine = engine;
  }
  dispose(disposeOnlyFramebuffers = false) {
    this._framebuffer = null;
    this._framebufferDepthStencil = null;
    super.dispose(disposeOnlyFramebuffers);
  }
};

// node_modules/@babylonjs/core/Engines/Native/nativeHardwareTexture.js
var NativeHardwareTexture = class {
  get underlyingResource() {
    return this._nativeTexture;
  }
  constructor(existingTexture, engine) {
    this._engine = engine;
    this.set(existingTexture);
  }
  setUsage() {
  }
  set(hardwareTexture) {
    this._nativeTexture = hardwareTexture;
  }
  reset() {
    this._nativeTexture = null;
  }
  release() {
    if (this._nativeTexture) {
      this._engine.deleteTexture(this._nativeTexture);
    }
    this.reset();
  }
};

// node_modules/@babylonjs/core/Engines/Native/nativeHelpers.js
function getNativeTextureFormat(format, type) {
  switch (format) {
    case 15:
      return _native.Engine.TEXTURE_FORMAT_D16;
    case 16:
      return _native.Engine.TEXTURE_FORMAT_D24;
    case 13:
      return _native.Engine.TEXTURE_FORMAT_D24S8;
    case 14:
      return _native.Engine.TEXTURE_FORMAT_D32F;
    case 36492:
      return _native.Engine.TEXTURE_FORMAT_BC7;
    case 36494:
      return _native.Engine.TEXTURE_FORMAT_BC6H;
    case 33779:
      return _native.Engine.TEXTURE_FORMAT_BC3;
    case 33778:
      return _native.Engine.TEXTURE_FORMAT_BC2;
    case 33777:
      return _native.Engine.TEXTURE_FORMAT_BC1;
    case 33776:
      return _native.Engine.TEXTURE_FORMAT_BC1;
    case 37808:
      return _native.Engine.TEXTURE_FORMAT_ASTC4x4;
    case 36196:
      return _native.Engine.TEXTURE_FORMAT_ETC1;
    case 37492:
      return _native.Engine.TEXTURE_FORMAT_ETC2;
    case 37496:
      return _native.Engine.TEXTURE_FORMAT_ETC2A;
    case 4: {
      switch (type) {
        case 0:
          return _native.Engine.TEXTURE_FORMAT_RGB8;
        case 3:
          return _native.Engine.TEXTURE_FORMAT_RGB8S;
        case 6:
          return _native.Engine.TEXTURE_FORMAT_RGB8I;
        case 7:
          return _native.Engine.TEXTURE_FORMAT_RGB8U;
      }
      break;
    }
    case 5: {
      switch (type) {
        case 0:
          return _native.Engine.TEXTURE_FORMAT_RGBA8;
        case 1:
          return _native.Engine.TEXTURE_FORMAT_RGBA32F;
        case 2:
          return _native.Engine.TEXTURE_FORMAT_RGBA16F;
        case 3:
          return _native.Engine.TEXTURE_FORMAT_RGBA8S;
        case 4:
          return _native.Engine.TEXTURE_FORMAT_RGBA16I;
        case 5:
          return _native.Engine.TEXTURE_FORMAT_RGBA16U;
        case 6:
          return _native.Engine.TEXTURE_FORMAT_RGBA32I;
        case 7:
          return _native.Engine.TEXTURE_FORMAT_RGBA32U;
      }
      break;
    }
    case 6: {
      switch (type) {
        case 0:
          return _native.Engine.TEXTURE_FORMAT_R8;
        case 1:
          return _native.Engine.TEXTURE_FORMAT_R32F;
        case 2:
          return _native.Engine.TEXTURE_FORMAT_R16F;
        case 3:
          return _native.Engine.TEXTURE_FORMAT_R8S;
        case 4:
          return _native.Engine.TEXTURE_FORMAT_R16S;
        case 5:
          return _native.Engine.TEXTURE_FORMAT_R16U;
        case 6:
          return _native.Engine.TEXTURE_FORMAT_R32I;
        case 7:
          return _native.Engine.TEXTURE_FORMAT_R32U;
      }
      break;
    }
    case 7: {
      switch (type) {
        case 0:
          return _native.Engine.TEXTURE_FORMAT_RG8;
        case 1:
          return _native.Engine.TEXTURE_FORMAT_RG32F;
        case 2:
          return _native.Engine.TEXTURE_FORMAT_RG16F;
        case 3:
          return _native.Engine.TEXTURE_FORMAT_RG8S;
        case 4:
          return _native.Engine.TEXTURE_FORMAT_RG16S;
        case 5:
          return _native.Engine.TEXTURE_FORMAT_RG16U;
        case 6:
          return _native.Engine.TEXTURE_FORMAT_RG32I;
        case 7:
          return _native.Engine.TEXTURE_FORMAT_RG32U;
      }
      break;
    }
    case 12: {
      switch (type) {
        case 0:
          return _native.Engine.TEXTURE_FORMAT_BGRA8;
      }
      break;
    }
  }
  throw new RuntimeError(`Unsupported texture format or type: format ${format}, type ${type}.`, ErrorCodes.UnsupportedTextureError);
}
function getNativeSamplingMode(samplingMode) {
  switch (samplingMode) {
    case 1:
      return _native.Engine.TEXTURE_NEAREST_NEAREST;
    case 2:
      return _native.Engine.TEXTURE_LINEAR_LINEAR;
    case 3:
      return _native.Engine.TEXTURE_LINEAR_LINEAR_MIPLINEAR;
    case 4:
      return _native.Engine.TEXTURE_NEAREST_NEAREST_MIPNEAREST;
    case 5:
      return _native.Engine.TEXTURE_NEAREST_LINEAR_MIPNEAREST;
    case 6:
      return _native.Engine.TEXTURE_NEAREST_LINEAR_MIPLINEAR;
    case 7:
      return _native.Engine.TEXTURE_NEAREST_LINEAR;
    case 8:
      return _native.Engine.TEXTURE_NEAREST_NEAREST_MIPLINEAR;
    case 9:
      return _native.Engine.TEXTURE_LINEAR_NEAREST_MIPNEAREST;
    case 10:
      return _native.Engine.TEXTURE_LINEAR_NEAREST_MIPLINEAR;
    case 11:
      return _native.Engine.TEXTURE_LINEAR_LINEAR_MIPNEAREST;
    case 12:
      return _native.Engine.TEXTURE_LINEAR_NEAREST;
    default:
      throw new Error(`Unsupported sampling mode: ${samplingMode}.`);
  }
}
function getNativeAddressMode(wrapMode) {
  switch (wrapMode) {
    case 1:
      return _native.Engine.ADDRESS_MODE_WRAP;
    case 0:
      return _native.Engine.ADDRESS_MODE_CLAMP;
    case 2:
      return _native.Engine.ADDRESS_MODE_MIRROR;
    default:
      throw new Error("Unexpected wrap mode: " + wrapMode + ".");
  }
}
function getNativeStencilFunc(func) {
  switch (func) {
    case 513:
      return _native.Engine.STENCIL_TEST_LESS;
    case 515:
      return _native.Engine.STENCIL_TEST_LEQUAL;
    case 514:
      return _native.Engine.STENCIL_TEST_EQUAL;
    case 518:
      return _native.Engine.STENCIL_TEST_GEQUAL;
    case 516:
      return _native.Engine.STENCIL_TEST_GREATER;
    case 517:
      return _native.Engine.STENCIL_TEST_NOTEQUAL;
    case 512:
      return _native.Engine.STENCIL_TEST_NEVER;
    case 519:
      return _native.Engine.STENCIL_TEST_ALWAYS;
    default:
      throw new Error(`Unsupported stencil func mode: ${func}.`);
  }
}
function getNativeStencilOpFail(opFail) {
  switch (opFail) {
    case 7680:
      return _native.Engine.STENCIL_OP_FAIL_S_KEEP;
    case 0:
      return _native.Engine.STENCIL_OP_FAIL_S_ZERO;
    case 7681:
      return _native.Engine.STENCIL_OP_FAIL_S_REPLACE;
    case 7682:
      return _native.Engine.STENCIL_OP_FAIL_S_INCR;
    case 7683:
      return _native.Engine.STENCIL_OP_FAIL_S_DECR;
    case 5386:
      return _native.Engine.STENCIL_OP_FAIL_S_INVERT;
    case 34055:
      return _native.Engine.STENCIL_OP_FAIL_S_INCRSAT;
    case 34056:
      return _native.Engine.STENCIL_OP_FAIL_S_DECRSAT;
    default:
      throw new Error(`Unsupported stencil OpFail mode: ${opFail}.`);
  }
}
function getNativeStencilDepthFail(depthFail) {
  switch (depthFail) {
    case 7680:
      return _native.Engine.STENCIL_OP_FAIL_Z_KEEP;
    case 0:
      return _native.Engine.STENCIL_OP_FAIL_Z_ZERO;
    case 7681:
      return _native.Engine.STENCIL_OP_FAIL_Z_REPLACE;
    case 7682:
      return _native.Engine.STENCIL_OP_FAIL_Z_INCR;
    case 7683:
      return _native.Engine.STENCIL_OP_FAIL_Z_DECR;
    case 5386:
      return _native.Engine.STENCIL_OP_FAIL_Z_INVERT;
    case 34055:
      return _native.Engine.STENCIL_OP_FAIL_Z_INCRSAT;
    case 34056:
      return _native.Engine.STENCIL_OP_FAIL_Z_DECRSAT;
    default:
      throw new Error(`Unsupported stencil depthFail mode: ${depthFail}.`);
  }
}
function getNativeStencilDepthPass(opPass) {
  switch (opPass) {
    case 7680:
      return _native.Engine.STENCIL_OP_PASS_Z_KEEP;
    case 0:
      return _native.Engine.STENCIL_OP_PASS_Z_ZERO;
    case 7681:
      return _native.Engine.STENCIL_OP_PASS_Z_REPLACE;
    case 7682:
      return _native.Engine.STENCIL_OP_PASS_Z_INCR;
    case 7683:
      return _native.Engine.STENCIL_OP_PASS_Z_DECR;
    case 5386:
      return _native.Engine.STENCIL_OP_PASS_Z_INVERT;
    case 34055:
      return _native.Engine.STENCIL_OP_PASS_Z_INCRSAT;
    case 34056:
      return _native.Engine.STENCIL_OP_PASS_Z_DECRSAT;
    default:
      throw new Error(`Unsupported stencil opPass mode: ${opPass}.`);
  }
}
function getNativeAlphaMode(mode) {
  switch (mode) {
    case 0:
      return _native.Engine.ALPHA_DISABLE;
    case 1:
      return _native.Engine.ALPHA_ADD;
    case 2:
      return _native.Engine.ALPHA_COMBINE;
    case 3:
      return _native.Engine.ALPHA_SUBTRACT;
    case 4:
      return _native.Engine.ALPHA_MULTIPLY;
    case 5:
      return _native.Engine.ALPHA_MAXIMIZED;
    case 6:
      return _native.Engine.ALPHA_ONEONE;
    case 7:
      return _native.Engine.ALPHA_PREMULTIPLIED;
    case 8:
      return _native.Engine.ALPHA_PREMULTIPLIED_PORTERDUFF;
    case 9:
      return _native.Engine.ALPHA_INTERPOLATE;
    case 10:
      return _native.Engine.ALPHA_SCREENMODE;
    default:
      throw new Error(`Unsupported alpha mode: ${mode}.`);
  }
}
function getNativeAttribType(type) {
  switch (type) {
    case VertexBuffer.BYTE:
      return _native.Engine.ATTRIB_TYPE_INT8;
    case VertexBuffer.UNSIGNED_BYTE:
      return _native.Engine.ATTRIB_TYPE_UINT8;
    case VertexBuffer.SHORT:
      return _native.Engine.ATTRIB_TYPE_INT16;
    case VertexBuffer.UNSIGNED_SHORT:
      return _native.Engine.ATTRIB_TYPE_UINT16;
    case VertexBuffer.FLOAT:
      return _native.Engine.ATTRIB_TYPE_FLOAT;
    default:
      throw new Error(`Unsupported attribute type: ${type}.`);
  }
}

// node_modules/@babylonjs/core/Engines/nativeEngine.js
var onNativeObjectInitialized = new Observable();
if (typeof self !== "undefined" && !Object.prototype.hasOwnProperty.call(self, "_native")) {
  let __native;
  Object.defineProperty(self, "_native", {
    get: () => __native,
    set: (value) => {
      __native = value;
      if (__native) {
        onNativeObjectInitialized.notifyObservers(__native);
      }
    }
  });
}
function AcquireNativeObjectAsync() {
  return new Promise((resolve) => {
    if (typeof _native === "undefined") {
      onNativeObjectInitialized.addOnce((nativeObject) => resolve(nativeObject));
    } else {
      resolve(_native);
    }
  });
}
async function RegisterNativeTypeAsync(typeName, constructor) {
  (await AcquireNativeObjectAsync())[typeName] = constructor;
}
var NativeDataBuffer = class extends DataBuffer {
};
var CommandBufferEncoder = class {
  constructor(_engine) {
    this._engine = _engine;
    this._pending = new Array();
    this._isCommandBufferScopeActive = false;
    this._commandStream = NativeEngine._createNativeDataStream();
    this._engine.setCommandDataStream(this._commandStream);
  }
  beginCommandScope() {
    if (this._isCommandBufferScopeActive) {
      throw new Error("Command scope already active.");
    }
    this._isCommandBufferScopeActive = true;
  }
  endCommandScope() {
    if (!this._isCommandBufferScopeActive) {
      throw new Error("Command scope is not active.");
    }
    this._isCommandBufferScopeActive = false;
    this._submit();
  }
  startEncodingCommand(command) {
    this._commandStream.writeNativeData(command);
  }
  encodeCommandArgAsUInt32(commandArg) {
    this._commandStream.writeUint32(commandArg);
  }
  encodeCommandArgAsUInt32s(commandArg) {
    this._commandStream.writeUint32Array(commandArg);
  }
  encodeCommandArgAsInt32(commandArg) {
    this._commandStream.writeInt32(commandArg);
  }
  encodeCommandArgAsInt32s(commandArg) {
    this._commandStream.writeInt32Array(commandArg);
  }
  encodeCommandArgAsFloat32(commandArg) {
    this._commandStream.writeFloat32(commandArg);
  }
  encodeCommandArgAsFloat32s(commandArg) {
    this._commandStream.writeFloat32Array(commandArg);
  }
  encodeCommandArgAsNativeData(commandArg) {
    this._commandStream.writeNativeData(commandArg);
    this._pending.push(commandArg);
  }
  finishEncodingCommand() {
    if (!this._isCommandBufferScopeActive) {
      this._submit();
    }
  }
  _submit() {
    this._engine.submitCommands();
    this._pending.length = 0;
  }
};
var NativeEngine = class _NativeEngine extends Engine {
  setHardwareScalingLevel(level) {
    super.setHardwareScalingLevel(level);
    this._engine.setHardwareScalingLevel(level);
  }
  constructor(options = {}) {
    super(null, false, void 0, options.adaptToDeviceRatio);
    this._engine = new _native.Engine();
    this._camera = _native.Camera ? new _native.Camera() : null;
    this._commandBufferEncoder = new CommandBufferEncoder(this._engine);
    this._boundBuffersVertexArray = null;
    this._currentDepthTest = _native.Engine.DEPTH_TEST_LEQUAL;
    this._stencilTest = false;
    this._stencilMask = 255;
    this._stencilFunc = 519;
    this._stencilFuncRef = 0;
    this._stencilFuncMask = 255;
    this._stencilOpStencilFail = 7680;
    this._stencilOpDepthFail = 7680;
    this._stencilOpStencilDepthPass = 7681;
    this._zOffset = 0;
    this._zOffsetUnits = 0;
    this._depthWrite = true;
    if (_native.Engine.PROTOCOL_VERSION !== _NativeEngine.PROTOCOL_VERSION) {
      throw new Error(`Protocol version mismatch: ${_native.Engine.PROTOCOL_VERSION} (Native) !== ${_NativeEngine.PROTOCOL_VERSION} (JS)`);
    }
    this._webGLVersion = 2;
    this.disableUniformBuffers = true;
    this._shaderPlatformName = "NATIVE";
    this._caps = {
      maxTexturesImageUnits: 16,
      maxVertexTextureImageUnits: 16,
      maxCombinedTexturesImageUnits: 32,
      maxTextureSize: _native.Engine.CAPS_LIMITS_MAX_TEXTURE_SIZE,
      maxCubemapTextureSize: 512,
      maxRenderTextureSize: 512,
      maxVertexAttribs: 16,
      maxVaryingVectors: 16,
      maxFragmentUniformVectors: 16,
      maxVertexUniformVectors: 16,
      standardDerivatives: true,
      astc: null,
      pvrtc: null,
      etc1: null,
      etc2: null,
      bptc: null,
      maxAnisotropy: 16,
      uintIndices: true,
      fragmentDepthSupported: false,
      highPrecisionShaderSupported: true,
      colorBufferFloat: false,
      supportFloatTexturesResolve: false,
      rg11b10ufColorRenderable: false,
      textureFloat: true,
      textureFloatLinearFiltering: false,
      textureFloatRender: true,
      textureHalfFloat: true,
      textureHalfFloatLinearFiltering: false,
      textureHalfFloatRender: true,
      textureLOD: true,
      texelFetch: false,
      drawBuffersExtension: false,
      depthTextureExtension: false,
      vertexArrayObject: true,
      instancedArrays: true,
      supportOcclusionQuery: false,
      canUseTimestampForTimerQuery: false,
      blendMinMax: false,
      maxMSAASamples: 16,
      canUseGLInstanceID: true,
      canUseGLVertexID: true,
      supportComputeShaders: false,
      supportSRGBBuffers: true,
      supportTransformFeedbacks: false,
      textureMaxLevel: false,
      texture2DArrayMaxLayerCount: _native.Engine.CAPS_LIMITS_MAX_TEXTURE_LAYERS,
      disableMorphTargetTexture: false,
      parallelShaderCompile: { COMPLETION_STATUS_KHR: 0 }
    };
    this._features = {
      forceBitmapOverHTMLImageElement: true,
      supportRenderAndCopyToLodForFloatTextures: false,
      supportDepthStencilTexture: false,
      supportShadowSamplers: false,
      uniformBufferHardCheckMatrix: false,
      allowTexturePrefiltering: false,
      trackUbosInFrame: false,
      checkUbosContentBeforeUpload: false,
      supportCSM: false,
      basisNeedsPOT: false,
      support3DTextures: false,
      needTypeSuffixInShaderConstants: false,
      supportMSAA: true,
      supportSSAO2: false,
      supportExtendedTextureFormats: false,
      supportSwitchCaseInShader: false,
      supportSyncTextureRead: false,
      needsInvertingBitmap: true,
      useUBOBindingCache: true,
      needShaderCodeInlining: true,
      needToAlwaysBindUniformBuffers: false,
      supportRenderPasses: true,
      supportSpriteInstancing: false,
      forceVertexBufferStrideMultiple4Bytes: false,
      _collectUbosUpdatedInFrame: false
    };
    Tools.Log("Babylon Native (v" + Engine.Version + ") launched");
    Tools.LoadScript = function(scriptUrl, onSuccess, onError, scriptId) {
      Tools.LoadFile(scriptUrl, (data) => {
        Function(data).apply(null);
        if (onSuccess) {
          onSuccess();
        }
      }, void 0, void 0, false, (request, exception) => {
        if (onError) {
          onError("LoadScript Error", exception);
        }
      });
    };
    if (typeof URL === "undefined") {
      window.URL = {
        createObjectURL: function() {
        },
        revokeObjectURL: function() {
        }
      };
    }
    if (typeof Blob === "undefined") {
      window.Blob = function(v) {
        return v;
      };
    }
    if (!Array.prototype.flat) {
      Object.defineProperty(Array.prototype, "flat", {
        configurable: true,
        value: function flat() {
          const depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
          return depth ? Array.prototype.reduce.call(this, function(acc, cur) {
            if (Array.isArray(cur)) {
              acc.push.apply(acc, flat.call(cur, depth - 1));
            } else {
              acc.push(cur);
            }
            return acc;
          }, []) : Array.prototype.slice.call(this);
        },
        writable: true
      });
    }
    const devicePixelRatio = window ? window.devicePixelRatio || 1 : 1;
    this._hardwareScalingLevel = options.adaptToDeviceRatio ? 1 / devicePixelRatio : 1;
    this._engine.setHardwareScalingLevel(this._hardwareScalingLevel);
    this._lastDevicePixelRatio = devicePixelRatio;
    this.resize();
    const currentDepthFunction = this.getDepthFunction();
    if (currentDepthFunction) {
      this.setDepthFunction(currentDepthFunction);
    }
    this._shaderProcessor = new WebGL2ShaderProcessor();
    this.onNewSceneAddedObservable.add((scene) => {
      const originalRender = scene.render;
      scene.render = (...args) => {
        this._commandBufferEncoder.beginCommandScope();
        originalRender.apply(scene, args);
        this._commandBufferEncoder.endCommandScope();
      };
    });
  }
  dispose() {
    super.dispose();
    if (this._boundBuffersVertexArray) {
      this._deleteVertexArray(this._boundBuffersVertexArray);
    }
    this._engine.dispose();
  }
  /** @internal */
  static _createNativeDataStream() {
    return new NativeDataStream();
  }
  /**
   * Can be used to override the current requestAnimationFrame requester.
   * @internal
   */
  _queueNewFrame(bindedRenderFunction, requester) {
    if (requester.requestAnimationFrame && requester !== window) {
      requester.requestAnimationFrame(bindedRenderFunction);
    } else {
      this._engine.requestAnimationFrame(bindedRenderFunction);
    }
    return 0;
  }
  /**
   * Override default engine behavior.
   * @param framebuffer
   */
  _bindUnboundFramebuffer(framebuffer) {
    if (this._currentFramebuffer !== framebuffer) {
      if (this._currentFramebuffer) {
        this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_UNBINDFRAMEBUFFER);
        this._commandBufferEncoder.encodeCommandArgAsNativeData(this._currentFramebuffer);
        this._commandBufferEncoder.finishEncodingCommand();
      }
      if (framebuffer) {
        this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_BINDFRAMEBUFFER);
        this._commandBufferEncoder.encodeCommandArgAsNativeData(framebuffer);
        this._commandBufferEncoder.finishEncodingCommand();
      }
      this._currentFramebuffer = framebuffer;
    }
  }
  /**
   * Gets host document
   * @returns the host document object
   */
  getHostDocument() {
    return null;
  }
  clear(color, backBuffer, depth, stencil = false) {
    if (this.useReverseDepthBuffer) {
      throw new Error("reverse depth buffer is not currently implemented");
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_CLEAR);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(backBuffer && color ? 1 : 0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(color ? color.r : 0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(color ? color.g : 0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(color ? color.b : 0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(color ? color.a : 1);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(depth ? 1 : 0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(1);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(stencil ? 1 : 0);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(0);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  createIndexBuffer(indices, updateable, _label) {
    const data = this._normalizeIndexData(indices);
    const buffer = new NativeDataBuffer();
    buffer.references = 1;
    buffer.is32Bits = data.BYTES_PER_ELEMENT === 4;
    if (data.byteLength) {
      buffer.nativeIndexBuffer = this._engine.createIndexBuffer(data.buffer, data.byteOffset, data.byteLength, buffer.is32Bits, updateable ?? false);
    }
    return buffer;
  }
  createVertexBuffer(vertices, updateable, _label) {
    const data = ArrayBuffer.isView(vertices) ? vertices : new Float32Array(vertices);
    const buffer = new NativeDataBuffer();
    buffer.references = 1;
    if (data.byteLength) {
      buffer.nativeVertexBuffer = this._engine.createVertexBuffer(data.buffer, data.byteOffset, data.byteLength, updateable ?? false);
    }
    return buffer;
  }
  _recordVertexArrayObject(vertexArray, vertexBuffers, indexBuffer, effect, overrideVertexBuffers) {
    if (indexBuffer) {
      this._engine.recordIndexBuffer(vertexArray, indexBuffer.nativeIndexBuffer);
    }
    const attributes = effect.getAttributesNames();
    for (let index = 0; index < attributes.length; index++) {
      const location = effect.getAttributeLocation(index);
      if (location >= 0) {
        const kind = attributes[index];
        let vertexBuffer = null;
        if (overrideVertexBuffers) {
          vertexBuffer = overrideVertexBuffers[kind];
        }
        if (!vertexBuffer) {
          vertexBuffer = vertexBuffers[kind];
        }
        if (vertexBuffer) {
          const buffer = vertexBuffer.getBuffer();
          if (buffer && buffer.nativeVertexBuffer) {
            this._engine.recordVertexBuffer(vertexArray, buffer.nativeVertexBuffer, location, vertexBuffer.byteOffset, vertexBuffer.byteStride, vertexBuffer.getSize(), getNativeAttribType(vertexBuffer.type), vertexBuffer.normalized, vertexBuffer.getInstanceDivisor());
          }
        }
      }
    }
  }
  bindBuffers(vertexBuffers, indexBuffer, effect) {
    if (this._boundBuffersVertexArray) {
      this._deleteVertexArray(this._boundBuffersVertexArray);
    }
    this._boundBuffersVertexArray = this._engine.createVertexArray();
    this._recordVertexArrayObject(this._boundBuffersVertexArray, vertexBuffers, indexBuffer, effect);
    this.bindVertexArrayObject(this._boundBuffersVertexArray);
  }
  recordVertexArrayObject(vertexBuffers, indexBuffer, effect, overrideVertexBuffers) {
    const vertexArray = this._engine.createVertexArray();
    this._recordVertexArrayObject(vertexArray, vertexBuffers, indexBuffer, effect, overrideVertexBuffers);
    return vertexArray;
  }
  _deleteVertexArray(vertexArray) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DELETEVERTEXARRAY);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(vertexArray);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  bindVertexArrayObject(vertexArray) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_BINDVERTEXARRAY);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(vertexArray);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  releaseVertexArrayObject(vertexArray) {
    this._deleteVertexArray(vertexArray);
  }
  getAttributes(pipelineContext, attributesNames) {
    const nativePipelineContext = pipelineContext;
    return this._engine.getAttributes(nativePipelineContext.program, attributesNames);
  }
  /**
   * Draw a list of indexed primitives
   * @param fillMode defines the primitive to use
   * @param indexStart defines the starting index
   * @param indexCount defines the number of index to draw
   * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
   */
  drawElementsType(fillMode, indexStart, indexCount, instancesCount) {
    this._drawCalls.addCount(1, false);
    if (instancesCount && _native.Engine.COMMAND_DRAWINDEXEDINSTANCED) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DRAWINDEXEDINSTANCED);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(fillMode);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(indexStart);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(indexCount);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(instancesCount);
    } else {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DRAWINDEXED);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(fillMode);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(indexStart);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(indexCount);
    }
    this._commandBufferEncoder.finishEncodingCommand();
  }
  /**
   * Draw a list of unindexed primitives
   * @param fillMode defines the primitive to use
   * @param verticesStart defines the index of first vertex to draw
   * @param verticesCount defines the count of vertices to draw
   * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
   */
  drawArraysType(fillMode, verticesStart, verticesCount, instancesCount) {
    this._drawCalls.addCount(1, false);
    if (instancesCount && _native.Engine.COMMAND_DRAWINSTANCED) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DRAWINSTANCED);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(fillMode);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(verticesStart);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(verticesCount);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(instancesCount);
    } else {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DRAW);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(fillMode);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(verticesStart);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(verticesCount);
    }
    this._commandBufferEncoder.finishEncodingCommand();
  }
  createPipelineContext() {
    const isAsync = !!(this._caps.parallelShaderCompile && this._engine.createProgramAsync);
    return new NativePipelineContext(this, isAsync);
  }
  createMaterialContext() {
    return void 0;
  }
  createDrawContext() {
    return void 0;
  }
  /**
   * @internal
   */
  _preparePipelineContext(pipelineContext, vertexSourceCode, fragmentSourceCode, createAsRaw, _rawVertexSourceCode, _rawFragmentSourceCode, _rebuildRebind, defines) {
    if (createAsRaw) {
      this.createRawShaderProgram();
    } else {
      this.createShaderProgram(pipelineContext, vertexSourceCode, fragmentSourceCode, defines);
    }
  }
  /**
   * @internal
   */
  _executeWhenRenderingStateIsCompiled(pipelineContext, action) {
    const nativePipelineContext = pipelineContext;
    if (nativePipelineContext.isAsync) {
      if (nativePipelineContext.onCompiled) {
        const oldHandler = nativePipelineContext.onCompiled;
        nativePipelineContext.onCompiled = () => {
          oldHandler();
          action();
        };
      } else {
        nativePipelineContext.onCompiled = action;
      }
    } else {
      action();
    }
  }
  createRawShaderProgram() {
    throw new Error("Not Supported");
  }
  createShaderProgram(pipelineContext, vertexCode, fragmentCode, defines) {
    const nativePipelineContext = pipelineContext;
    this.onBeforeShaderCompilationObservable.notifyObservers(this);
    const vertexInliner = new ShaderCodeInliner(vertexCode);
    vertexInliner.processCode();
    vertexCode = vertexInliner.code;
    const fragmentInliner = new ShaderCodeInliner(fragmentCode);
    fragmentInliner.processCode();
    fragmentCode = fragmentInliner.code;
    vertexCode = ThinEngine._ConcatenateShader(vertexCode, defines);
    fragmentCode = ThinEngine._ConcatenateShader(fragmentCode, defines);
    const onSuccess = () => {
      var _a;
      nativePipelineContext.isCompiled = true;
      (_a = nativePipelineContext.onCompiled) == null ? void 0 : _a.call(nativePipelineContext);
      this.onAfterShaderCompilationObservable.notifyObservers(this);
    };
    if (pipelineContext.isAsync) {
      nativePipelineContext.program = this._engine.createProgramAsync(vertexCode, fragmentCode, onSuccess, (error) => {
        nativePipelineContext.compilationError = error;
      });
    } else {
      try {
        nativePipelineContext.program = this._engine.createProgram(vertexCode, fragmentCode);
        onSuccess();
      } catch (e) {
        const message = e == null ? void 0 : e.message;
        throw new Error("SHADER ERROR" + (typeof message === "string" ? "\n" + message : ""));
      }
    }
    return nativePipelineContext.program;
  }
  /**
   * Inline functions in shader code that are marked to be inlined
   * @param code code to inline
   * @returns inlined code
   */
  inlineShaderCode(code) {
    const sci = new ShaderCodeInliner(code);
    sci.debug = false;
    sci.processCode();
    return sci.code;
  }
  _setProgram(program) {
    if (this._currentProgram !== program) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETPROGRAM);
      this._commandBufferEncoder.encodeCommandArgAsNativeData(program);
      this._commandBufferEncoder.finishEncodingCommand();
      this._currentProgram = program;
    }
  }
  _deletePipelineContext(pipelineContext) {
    const nativePipelineContext = pipelineContext;
    if (nativePipelineContext && nativePipelineContext.program) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DELETEPROGRAM);
      this._commandBufferEncoder.encodeCommandArgAsNativeData(nativePipelineContext.program);
      this._commandBufferEncoder.finishEncodingCommand();
    }
  }
  getUniforms(pipelineContext, uniformsNames) {
    const nativePipelineContext = pipelineContext;
    return this._engine.getUniforms(nativePipelineContext.program, uniformsNames);
  }
  bindUniformBlock(pipelineContext, blockName, index) {
    throw new Error("Not Implemented");
  }
  bindSamplers(effect) {
    const nativePipelineContext = effect.getPipelineContext();
    this._setProgram(nativePipelineContext.program);
    const samplers = effect.getSamplers();
    for (let index = 0; index < samplers.length; index++) {
      const uniform = effect.getUniform(samplers[index]);
      if (uniform) {
        this._boundUniforms[index] = uniform;
      }
    }
    this._currentEffect = null;
  }
  getRenderWidth(useScreen = false) {
    if (!useScreen && this._currentRenderTarget) {
      return this._currentRenderTarget.width;
    }
    return this._engine.getRenderWidth();
  }
  getRenderHeight(useScreen = false) {
    if (!useScreen && this._currentRenderTarget) {
      return this._currentRenderTarget.height;
    }
    return this._engine.getRenderHeight();
  }
  setViewport(viewport, requiredWidth, requiredHeight) {
    this._cachedViewport = viewport;
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETVIEWPORT);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(viewport.x);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(viewport.y);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(viewport.width);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(viewport.height);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  enableScissor(x, y, width, height) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETSCISSOR);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(x);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(y);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(width);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(height);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  disableScissor() {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETSCISSOR);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(0);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  setState(culling, zOffset = 0, force, reverseSide = false, cullBackFaces, stencil, zOffsetUnits = 0) {
    this._zOffset = zOffset;
    this._zOffsetUnits = zOffsetUnits;
    if (this._zOffset !== 0) {
      Tools.Warn("zOffset is not supported in Native engine.");
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETSTATE);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(culling ? 1 : 0);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(zOffset);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(zOffsetUnits);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(this.cullBackFaces ?? cullBackFaces ?? true ? 1 : 0);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(reverseSide ? 1 : 0);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  /**
   * Gets the client rect of native canvas.  Needed for InputManager.
   * @returns a client rectangle
   */
  getInputElementClientRect() {
    const rect = {
      bottom: this.getRenderHeight(),
      height: this.getRenderHeight(),
      left: 0,
      right: this.getRenderWidth(),
      top: 0,
      width: this.getRenderWidth(),
      x: 0,
      y: 0,
      toJSON: () => {
      }
    };
    return rect;
  }
  /**
   * Set the z offset Factor to apply to current rendering
   * @param value defines the offset to apply
   */
  setZOffset(value) {
    if (value !== this._zOffset) {
      this._zOffset = value;
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETZOFFSET);
      this._commandBufferEncoder.encodeCommandArgAsFloat32(this.useReverseDepthBuffer ? -value : value);
      this._commandBufferEncoder.finishEncodingCommand();
    }
  }
  /**
   * Gets the current value of the zOffset Factor
   * @returns the current zOffset Factor state
   */
  getZOffset() {
    return this._zOffset;
  }
  /**
   * Set the z offset Units to apply to current rendering
   * @param value defines the offset to apply
   */
  setZOffsetUnits(value) {
    if (value !== this._zOffsetUnits) {
      this._zOffsetUnits = value;
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETZOFFSETUNITS);
      this._commandBufferEncoder.encodeCommandArgAsFloat32(this.useReverseDepthBuffer ? -value : value);
      this._commandBufferEncoder.finishEncodingCommand();
    }
  }
  /**
   * Gets the current value of the zOffset Units
   * @returns the current zOffset Units state
   */
  getZOffsetUnits() {
    return this._zOffsetUnits;
  }
  /**
   * Enable or disable depth buffering
   * @param enable defines the state to set
   */
  setDepthBuffer(enable) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETDEPTHTEST);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(enable ? this._currentDepthTest : _native.Engine.DEPTH_TEST_ALWAYS);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  /**
   * Gets a boolean indicating if depth writing is enabled
   * @returns the current depth writing state
   */
  getDepthWrite() {
    return this._depthWrite;
  }
  getDepthFunction() {
    switch (this._currentDepthTest) {
      case _native.Engine.DEPTH_TEST_NEVER:
        return 512;
      case _native.Engine.DEPTH_TEST_ALWAYS:
        return 519;
      case _native.Engine.DEPTH_TEST_GREATER:
        return 516;
      case _native.Engine.DEPTH_TEST_GEQUAL:
        return 518;
      case _native.Engine.DEPTH_TEST_NOTEQUAL:
        return 517;
      case _native.Engine.DEPTH_TEST_EQUAL:
        return 514;
      case _native.Engine.DEPTH_TEST_LESS:
        return 513;
      case _native.Engine.DEPTH_TEST_LEQUAL:
        return 515;
    }
    return null;
  }
  setDepthFunction(depthFunc) {
    let nativeDepthFunc = 0;
    switch (depthFunc) {
      case 512:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_NEVER;
        break;
      case 519:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_ALWAYS;
        break;
      case 516:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_GREATER;
        break;
      case 518:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_GEQUAL;
        break;
      case 517:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_NOTEQUAL;
        break;
      case 514:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_EQUAL;
        break;
      case 513:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_LESS;
        break;
      case 515:
        nativeDepthFunc = _native.Engine.DEPTH_TEST_LEQUAL;
        break;
    }
    this._currentDepthTest = nativeDepthFunc;
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETDEPTHTEST);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(this._currentDepthTest);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  /**
   * Enable or disable depth writing
   * @param enable defines the state to set
   */
  setDepthWrite(enable) {
    this._depthWrite = enable;
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETDEPTHWRITE);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(Number(enable));
    this._commandBufferEncoder.finishEncodingCommand();
  }
  /**
   * Enable or disable color writing
   * @param enable defines the state to set
   */
  setColorWrite(enable) {
    this._colorWrite = enable;
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETCOLORWRITE);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(Number(enable));
    this._commandBufferEncoder.finishEncodingCommand();
  }
  /**
   * Gets a boolean indicating if color writing is enabled
   * @returns the current color writing state
   */
  getColorWrite() {
    return this._colorWrite;
  }
  applyStencil() {
    this._setStencil(this._stencilMask, getNativeStencilOpFail(this._stencilOpStencilFail), getNativeStencilDepthFail(this._stencilOpDepthFail), getNativeStencilDepthPass(this._stencilOpStencilDepthPass), getNativeStencilFunc(this._stencilFunc), this._stencilFuncRef);
  }
  _setStencil(mask, stencilOpFail, depthOpFail, depthOpPass, func, ref) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETSTENCIL);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(mask);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(stencilOpFail);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(depthOpFail);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(depthOpPass);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(func);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(ref);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  /**
   * Enable or disable the stencil buffer
   * @param enable defines if the stencil buffer must be enabled or disabled
   */
  setStencilBuffer(enable) {
    this._stencilTest = enable;
    if (enable) {
      this.applyStencil();
    } else {
      this._setStencil(255, _native.Engine.STENCIL_OP_FAIL_S_KEEP, _native.Engine.STENCIL_OP_FAIL_Z_KEEP, _native.Engine.STENCIL_OP_PASS_Z_KEEP, _native.Engine.STENCIL_TEST_ALWAYS, 0);
    }
  }
  /**
   * Gets a boolean indicating if stencil buffer is enabled
   * @returns the current stencil buffer state
   */
  getStencilBuffer() {
    return this._stencilTest;
  }
  /**
   * Gets the current stencil operation when stencil passes
   * @returns a number defining stencil operation to use when stencil passes
   */
  getStencilOperationPass() {
    return this._stencilOpStencilDepthPass;
  }
  /**
   * Sets the stencil operation to use when stencil passes
   * @param operation defines the stencil operation to use when stencil passes
   */
  setStencilOperationPass(operation) {
    this._stencilOpStencilDepthPass = operation;
    this.applyStencil();
  }
  /**
   * Sets the current stencil mask
   * @param mask defines the new stencil mask to use
   */
  setStencilMask(mask) {
    this._stencilMask = mask;
    this.applyStencil();
  }
  /**
   * Sets the current stencil function
   * @param stencilFunc defines the new stencil function to use
   */
  setStencilFunction(stencilFunc) {
    this._stencilFunc = stencilFunc;
    this.applyStencil();
  }
  /**
   * Sets the current stencil reference
   * @param reference defines the new stencil reference to use
   */
  setStencilFunctionReference(reference) {
    this._stencilFuncRef = reference;
    this.applyStencil();
  }
  /**
   * Sets the current stencil mask
   * @param mask defines the new stencil mask to use
   */
  setStencilFunctionMask(mask) {
    this._stencilFuncMask = mask;
  }
  /**
   * Sets the stencil operation to use when stencil fails
   * @param operation defines the stencil operation to use when stencil fails
   */
  setStencilOperationFail(operation) {
    this._stencilOpStencilFail = operation;
    this.applyStencil();
  }
  /**
   * Sets the stencil operation to use when depth fails
   * @param operation defines the stencil operation to use when depth fails
   */
  setStencilOperationDepthFail(operation) {
    this._stencilOpDepthFail = operation;
    this.applyStencil();
  }
  /**
   * Gets the current stencil mask
   * @returns a number defining the new stencil mask to use
   */
  getStencilMask() {
    return this._stencilMask;
  }
  /**
   * Gets the current stencil function
   * @returns a number defining the stencil function to use
   */
  getStencilFunction() {
    return this._stencilFunc;
  }
  /**
   * Gets the current stencil reference value
   * @returns a number defining the stencil reference value to use
   */
  getStencilFunctionReference() {
    return this._stencilFuncRef;
  }
  /**
   * Gets the current stencil mask
   * @returns a number defining the stencil mask to use
   */
  getStencilFunctionMask() {
    return this._stencilFuncMask;
  }
  /**
   * Gets the current stencil operation when stencil fails
   * @returns a number defining stencil operation to use when stencil fails
   */
  getStencilOperationFail() {
    return this._stencilOpStencilFail;
  }
  /**
   * Gets the current stencil operation when depth fails
   * @returns a number defining stencil operation to use when depth fails
   */
  getStencilOperationDepthFail() {
    return this._stencilOpDepthFail;
  }
  /**
   * Sets alpha constants used by some alpha blending modes
   * @param r defines the red component
   * @param g defines the green component
   * @param b defines the blue component
   * @param a defines the alpha component
   */
  setAlphaConstants(r, g, b, a) {
    throw new Error("Setting alpha blend constant color not yet implemented.");
  }
  /**
   * Sets the current alpha mode
   * @param mode defines the mode to use (one of the BABYLON.undefined)
   * @param noDepthWriteChange defines if depth writing state should remains unchanged (false by default)
   * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering
   */
  setAlphaMode(mode, noDepthWriteChange = false) {
    if (this._alphaMode === mode) {
      return;
    }
    const nativeMode = getNativeAlphaMode(mode);
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETBLENDMODE);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(nativeMode);
    this._commandBufferEncoder.finishEncodingCommand();
    if (!noDepthWriteChange) {
      this.setDepthWrite(mode === 0);
    }
    this._alphaMode = mode;
  }
  /**
   * Gets the current alpha mode
   * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering
   * @returns the current alpha mode
   */
  getAlphaMode() {
    return this._alphaMode;
  }
  setInt(uniform, int) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETINT);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsInt32(int);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setIntArray(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETINTARRAY);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsInt32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setIntArray2(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETINTARRAY2);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsInt32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setIntArray3(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETINTARRAY3);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsInt32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setIntArray4(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETINTARRAY4);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsInt32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloatArray(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOATARRAY);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloatArray2(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOATARRAY2);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloatArray3(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOATARRAY3);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloatArray4(uniform, array) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOATARRAY4);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32s(array);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setArray(uniform, array) {
    if (!uniform) {
      return false;
    }
    return this.setFloatArray(uniform, new Float32Array(array));
  }
  setArray2(uniform, array) {
    if (!uniform) {
      return false;
    }
    return this.setFloatArray2(uniform, new Float32Array(array));
  }
  setArray3(uniform, array) {
    if (!uniform) {
      return false;
    }
    return this.setFloatArray3(uniform, new Float32Array(array));
  }
  setArray4(uniform, array) {
    if (!uniform) {
      return false;
    }
    return this.setFloatArray4(uniform, new Float32Array(array));
  }
  setMatrices(uniform, matrices) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETMATRICES);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32s(matrices);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setMatrix3x3(uniform, matrix) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETMATRIX3X3);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32s(matrix);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setMatrix2x2(uniform, matrix) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETMATRIX2X2);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32s(matrix);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloat(uniform, value) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOAT);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(value);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloat2(uniform, x, y) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOAT2);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(x);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(y);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloat3(uniform, x, y, z) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOAT3);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(x);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(y);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(z);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setFloat4(uniform, x, y, z, w) {
    if (!uniform) {
      return false;
    }
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETFLOAT4);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(x);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(y);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(z);
    this._commandBufferEncoder.encodeCommandArgAsFloat32(w);
    this._commandBufferEncoder.finishEncodingCommand();
    return true;
  }
  setColor3(uniform, color3) {
    if (!uniform) {
      return false;
    }
    this.setFloat3(uniform, color3.r, color3.g, color3.b);
    return true;
  }
  setColor4(uniform, color3, alpha) {
    if (!uniform) {
      return false;
    }
    this.setFloat4(uniform, color3.r, color3.g, color3.b, alpha);
    return true;
  }
  wipeCaches(bruteForce) {
    if (this.preventCacheWipeBetweenFrames) {
      return;
    }
    this.resetTextureCache();
    this._currentEffect = null;
    if (bruteForce) {
      this._currentProgram = null;
      this._stencilStateComposer.reset();
      this._depthCullingState.reset();
      this._alphaState.reset();
    }
    this._cachedVertexBuffers = null;
    this._cachedIndexBuffer = null;
    this._cachedEffectForVertexBuffers = null;
  }
  _createTexture() {
    return this._engine.createTexture();
  }
  _deleteTexture(texture) {
    if (texture) {
      this._engine.deleteTexture(texture);
    }
  }
  /**
   * Update the content of a dynamic texture
   * @param texture defines the texture to update
   * @param canvas defines the canvas containing the source
   * @param invertY defines if data must be stored with Y axis inverted
   * @param premulAlpha defines if alpha is stored as premultiplied
   * @param format defines the format of the data
   */
  updateDynamicTexture(texture, canvas, invertY, premulAlpha = false, format) {
    if (premulAlpha === void 0) {
      premulAlpha = false;
    }
    if (!!texture && !!texture._hardwareTexture) {
      const source = canvas.getCanvasTexture();
      const destination = texture._hardwareTexture.underlyingResource;
      this._engine.copyTexture(destination, source);
      texture.isReady = true;
    }
  }
  createDynamicTexture(width, height, generateMipMaps, samplingMode) {
    width = Math.max(width, 1);
    height = Math.max(height, 1);
    return this.createRawTexture(new Uint8Array(width * height * 4), width, height, 5, false, false, samplingMode);
  }
  createVideoElement(constraints) {
    if (this._camera) {
      return this._camera.createVideo(constraints);
    }
    return null;
  }
  updateVideoTexture(texture, video, invertY) {
    if (texture && texture._hardwareTexture && this._camera) {
      const webGLTexture = texture._hardwareTexture.underlyingResource;
      this._camera.updateVideoTexture(webGLTexture, video, invertY);
    }
  }
  createRawTexture(data, width, height, format, generateMipMaps, invertY, samplingMode, compression = null, type = 0, creationFlags = 0, useSRGBBuffer = false) {
    const texture = new InternalTexture(this, InternalTextureSource.Raw);
    texture.format = format;
    texture.generateMipMaps = generateMipMaps;
    texture.samplingMode = samplingMode;
    texture.invertY = invertY;
    texture.baseWidth = width;
    texture.baseHeight = height;
    texture.width = texture.baseWidth;
    texture.height = texture.baseHeight;
    texture._compression = compression;
    texture.type = type;
    texture._useSRGBBuffer = this._getUseSRGBBuffer(useSRGBBuffer, !generateMipMaps);
    this.updateRawTexture(texture, data, format, invertY, compression, type, texture._useSRGBBuffer);
    if (texture._hardwareTexture) {
      const webGLTexture = texture._hardwareTexture.underlyingResource;
      const filter = getNativeSamplingMode(samplingMode);
      this._setTextureSampling(webGLTexture, filter);
    }
    this._internalTexturesCache.push(texture);
    return texture;
  }
  createRawTexture2DArray(data, width, height, depth, format, generateMipMaps, invertY, samplingMode, compression = null, textureType = 0) {
    const texture = new InternalTexture(this, InternalTextureSource.Raw2DArray);
    texture.baseWidth = width;
    texture.baseHeight = height;
    texture.baseDepth = depth;
    texture.width = width;
    texture.height = height;
    texture.depth = depth;
    texture.format = format;
    texture.type = textureType;
    texture.generateMipMaps = generateMipMaps;
    texture.samplingMode = samplingMode;
    texture.is2DArray = true;
    if (texture._hardwareTexture) {
      const nativeTexture = texture._hardwareTexture.underlyingResource;
      this._engine.loadRawTexture2DArray(nativeTexture, data, width, height, depth, getNativeTextureFormat(format, textureType), generateMipMaps, invertY);
      const filter = getNativeSamplingMode(samplingMode);
      this._setTextureSampling(nativeTexture, filter);
    }
    texture.isReady = true;
    this._internalTexturesCache.push(texture);
    return texture;
  }
  updateRawTexture(texture, bufferView, format, invertY, compression = null, type = 0, useSRGBBuffer = false) {
    if (!texture) {
      return;
    }
    if (bufferView && texture._hardwareTexture) {
      const underlyingResource = texture._hardwareTexture.underlyingResource;
      this._engine.loadRawTexture(underlyingResource, bufferView, texture.width, texture.height, getNativeTextureFormat(format, type), texture.generateMipMaps, texture.invertY);
    }
    texture.isReady = true;
  }
  // TODO: Refactor to share more logic with babylon.engine.ts version.
  /**
   * Usually called from Texture.ts.
   * Passed information to create a NativeTexture
   * @param url defines a value which contains one of the following:
   * * A conventional http URL, e.g. 'http://...' or 'file://...'
   * * A base64 string of in-line texture data, e.g. 'data:image/jpg;base64,/...'
   * * An indicator that data being passed using the buffer parameter, e.g. 'data:mytexture.jpg'
   * @param noMipmap defines a boolean indicating that no mipmaps shall be generated.  Ignored for compressed textures.  They must be in the file
   * @param invertY when true, image is flipped when loaded.  You probably want true. Certain compressed textures may invert this if their default is inverted (eg. ktx)
   * @param scene needed for loading to the correct scene
   * @param samplingMode mode with should be used sample / access the texture (Default: Texture.TRILINEAR_SAMPLINGMODE)
   * @param onLoad optional callback to be called upon successful completion
   * @param onError optional callback to be called upon failure
   * @param buffer a source of a file previously fetched as either a base64 string, an ArrayBuffer (compressed or image format), HTMLImageElement (image format), or a Blob
   * @param fallback an internal argument in case the function must be called again, due to etc1 not having alpha capabilities
   * @param format internal format.  Default: RGB when extension is '.jpg' else RGBA.  Ignored for compressed textures
   * @param forcedExtension defines the extension to use to pick the right loader
   * @param mimeType defines an optional mime type
   * @param loaderOptions options to be passed to the loader
   * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
   * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
   * @returns a InternalTexture for assignment back into BABYLON.Texture
   */
  createTexture(url, noMipmap, invertY, scene, samplingMode = 3, onLoad = null, onError = null, buffer = null, fallback = null, format = null, forcedExtension = null, mimeType, loaderOptions, creationFlags, useSRGBBuffer = false) {
    url = url || "";
    const fromData = url.substr(0, 5) === "data:";
    const isBase64 = fromData && url.indexOf(";base64,") !== -1;
    const texture = fallback ? fallback : new InternalTexture(this, InternalTextureSource.Url);
    const originalUrl = url;
    if (this._transformTextureUrl && !isBase64 && !fallback && !buffer) {
      url = this._transformTextureUrl(url);
    }
    const lastDot = url.lastIndexOf(".");
    const extension = forcedExtension ? forcedExtension : lastDot > -1 ? url.substring(lastDot).toLowerCase() : "";
    let loader = null;
    for (const availableLoader of Engine._TextureLoaders) {
      if (availableLoader.canLoad(extension)) {
        loader = availableLoader;
        break;
      }
    }
    if (scene) {
      scene.addPendingData(texture);
    }
    texture.url = url;
    texture.generateMipMaps = !noMipmap;
    texture.samplingMode = samplingMode;
    texture.invertY = invertY;
    texture._useSRGBBuffer = this._getUseSRGBBuffer(useSRGBBuffer, noMipmap);
    if (!this.doNotHandleContextLost) {
      texture._buffer = buffer;
    }
    let onLoadObserver = null;
    if (onLoad && !fallback) {
      onLoadObserver = texture.onLoadedObservable.add(onLoad);
    }
    if (!fallback) {
      this._internalTexturesCache.push(texture);
    }
    const onInternalError = (message, exception) => {
      if (scene) {
        scene.removePendingData(texture);
      }
      if (url === originalUrl) {
        if (onLoadObserver) {
          texture.onLoadedObservable.remove(onLoadObserver);
        }
        if (EngineStore.UseFallbackTexture) {
          this.createTexture(EngineStore.FallbackTexture, noMipmap, texture.invertY, scene, samplingMode, null, onError, buffer, texture);
        }
        if (onError) {
          onError((message || "Unknown error") + (EngineStore.UseFallbackTexture ? " - Fallback texture was used" : ""), exception);
        }
      } else {
        Logger.Warn(`Failed to load ${url}, falling back to ${originalUrl}`);
        this.createTexture(originalUrl, noMipmap, texture.invertY, scene, samplingMode, onLoad, onError, buffer, texture, format, forcedExtension, mimeType, loaderOptions);
      }
    };
    if (loader) {
      throw new Error("Loading textures from IInternalTextureLoader not yet implemented.");
    } else {
      const onload = (data) => {
        if (!texture._hardwareTexture) {
          if (scene) {
            scene.removePendingData(texture);
          }
          return;
        }
        const underlyingResource = texture._hardwareTexture.underlyingResource;
        this._engine.loadTexture(underlyingResource, data, !noMipmap, invertY, texture._useSRGBBuffer, () => {
          texture.baseWidth = this._engine.getTextureWidth(underlyingResource);
          texture.baseHeight = this._engine.getTextureHeight(underlyingResource);
          texture.width = texture.baseWidth;
          texture.height = texture.baseHeight;
          texture.isReady = true;
          const filter = getNativeSamplingMode(samplingMode);
          this._setTextureSampling(underlyingResource, filter);
          if (scene) {
            scene.removePendingData(texture);
          }
          texture.onLoadedObservable.notifyObservers(texture);
          texture.onLoadedObservable.clear();
        }, () => {
          throw new Error("Could not load a native texture.");
        });
      };
      if (fromData && buffer) {
        if (buffer instanceof ArrayBuffer) {
          onload(new Uint8Array(buffer));
        } else if (ArrayBuffer.isView(buffer)) {
          onload(buffer);
        } else if (typeof buffer === "string") {
          onload(new Uint8Array(Tools.DecodeBase64(buffer)));
        } else {
          throw new Error("Unsupported buffer type");
        }
      } else {
        if (isBase64) {
          onload(new Uint8Array(Tools.DecodeBase64(url)));
        } else {
          this._loadFile(url, (data) => onload(new Uint8Array(data)), void 0, void 0, true, (request, exception) => {
            onInternalError("Unable to load " + (request ? request.responseURL : url, exception));
          });
        }
      }
    }
    return texture;
  }
  /**
   * Wraps an external native texture in a Babylon texture.
   * @param texture defines the external texture
   * @param hasMipMaps defines whether the external texture has mip maps
   * @param samplingMode defines the sampling mode for the external texture (default: 3)
   * @returns the babylon internal texture
   */
  wrapNativeTexture(texture, hasMipMaps = false, samplingMode = 3) {
    const hardwareTexture = new NativeHardwareTexture(texture, this._engine);
    const internalTexture = new InternalTexture(this, InternalTextureSource.Unknown, true);
    internalTexture._hardwareTexture = hardwareTexture;
    internalTexture.baseWidth = this._engine.getTextureWidth(texture);
    internalTexture.baseHeight = this._engine.getTextureHeight(texture);
    internalTexture.width = internalTexture.baseWidth;
    internalTexture.height = internalTexture.baseHeight;
    internalTexture.isReady = true;
    internalTexture.useMipMaps = hasMipMaps;
    this.updateTextureSamplingMode(samplingMode, internalTexture);
    return internalTexture;
  }
  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * Wraps an external web gl texture in a Babylon texture.
   * @returns the babylon internal texture
   */
  wrapWebGLTexture() {
    throw new Error("wrapWebGLTexture is not supported, use wrapNativeTexture instead.");
  }
  _createDepthStencilTexture(size, options, rtWrapper) {
    const generateStencil = options.generateStencil || false;
    const samples = options.samples || 1;
    const nativeRTWrapper = rtWrapper;
    const texture = new InternalTexture(this, InternalTextureSource.DepthStencil);
    const width = size.width ?? size;
    const height = size.height ?? size;
    const framebuffer = this._engine.createFrameBuffer(texture._hardwareTexture.underlyingResource, width, height, generateStencil, true, samples);
    nativeRTWrapper._framebufferDepthStencil = framebuffer;
    return texture;
  }
  /**
   * @internal
   */
  _releaseFramebufferObjects(framebuffer) {
    if (framebuffer) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DELETEFRAMEBUFFER);
      this._commandBufferEncoder.encodeCommandArgAsNativeData(framebuffer);
      this._commandBufferEncoder.finishEncodingCommand();
    }
  }
  /**
   * @internal Engine abstraction for loading and creating an image bitmap from a given source string.
   * @param imageSource source to load the image from.
   * @param options An object that sets options for the image's extraction.
   * @returns ImageBitmap
   */
  _createImageBitmapFromSource(imageSource, options) {
    const promise = new Promise((resolve, reject) => {
      const image = this.createCanvasImage();
      image.onload = () => {
        try {
          const imageBitmap = this._engine.createImageBitmap(image);
          resolve(imageBitmap);
        } catch (error) {
          reject(`Error loading image ${image.src} with exception: ${error}`);
        }
      };
      image.onerror = (error) => {
        reject(`Error loading image ${image.src} with exception: ${error}`);
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
    return new Promise((resolve, reject) => {
      if (Array.isArray(image)) {
        const arr = image;
        if (arr.length) {
          const image2 = this._engine.createImageBitmap(arr[0]);
          if (image2) {
            resolve(image2);
            return;
          }
        }
      }
      reject(`Unsupported data for createImageBitmap.`);
    });
  }
  /**
   * Resize an image and returns the image data as an uint8array
   * @param image image to resize
   * @param bufferWidth destination buffer width
   * @param bufferHeight destination buffer height
   * @returns an uint8array containing RGBA values of bufferWidth * bufferHeight size
   */
  resizeImageBitmap(image, bufferWidth, bufferHeight) {
    return this._engine.resizeImageBitmap(image, bufferWidth, bufferHeight);
  }
  /**
   * Creates a cube texture
   * @param rootUrl defines the url where the files to load is located
   * @param scene defines the current scene
   * @param files defines the list of files to load (1 per face)
   * @param noMipmap defines a boolean indicating that no mipmaps shall be generated (false by default)
   * @param onLoad defines an optional callback raised when the texture is loaded
   * @param onError defines an optional callback raised if there is an issue to load the texture
   * @param format defines the format of the data
   * @param forcedExtension defines the extension to use to pick the right loader
   * @param createPolynomials if a polynomial sphere should be created for the cube texture
   * @param lodScale defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness
   * @param lodOffset defines the offset applied to environment texture. This manages first LOD level used for IBL according to the roughness
   * @param fallback defines texture to use while falling back when (compressed) texture file not found.
   * @param loaderOptions options to be passed to the loader
   * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
   * @returns the cube texture as an InternalTexture
   */
  createCubeTexture(rootUrl, scene, files, noMipmap, onLoad = null, onError = null, format, forcedExtension = null, createPolynomials = false, lodScale = 0, lodOffset = 0, fallback = null, loaderOptions, useSRGBBuffer = false) {
    const texture = fallback ? fallback : new InternalTexture(this, InternalTextureSource.Cube);
    texture.isCube = true;
    texture.url = rootUrl;
    texture.generateMipMaps = !noMipmap;
    texture._lodGenerationScale = lodScale;
    texture._lodGenerationOffset = lodOffset;
    texture._useSRGBBuffer = this._getUseSRGBBuffer(useSRGBBuffer, !!noMipmap);
    if (!this._doNotHandleContextLost) {
      texture._extension = forcedExtension;
      texture._files = files;
    }
    const lastDot = rootUrl.lastIndexOf(".");
    const extension = forcedExtension ? forcedExtension : lastDot > -1 ? rootUrl.substring(lastDot).toLowerCase() : "";
    if (extension === ".env") {
      const onloaddata = (data) => {
        const info = GetEnvInfo(data);
        texture.width = info.width;
        texture.height = info.width;
        UploadEnvSpherical(texture, info);
        const specularInfo = info.specular;
        if (!specularInfo) {
          throw new Error(`Nothing else parsed so far`);
        }
        texture._lodGenerationScale = specularInfo.lodGenerationScale;
        const imageData = CreateImageDataArrayBufferViews(data, info);
        texture.format = 5;
        texture.type = 0;
        texture.generateMipMaps = true;
        texture.getEngine().updateTextureSamplingMode(Texture.TRILINEAR_SAMPLINGMODE, texture);
        texture._isRGBD = true;
        texture.invertY = true;
        this._engine.loadCubeTextureWithMips(texture._hardwareTexture.underlyingResource, imageData, false, texture._useSRGBBuffer, () => {
          texture.isReady = true;
          if (onLoad) {
            onLoad();
          }
        }, () => {
          throw new Error("Could not load a native cube texture.");
        });
      };
      if (files && files.length === 6) {
        throw new Error(`Multi-file loading not allowed on env files.`);
      } else {
        const onInternalError = (request, exception) => {
          if (onError && request) {
            onError(request.status + " " + request.statusText, exception);
          }
        };
        this._loadFile(rootUrl, (data) => {
          onloaddata(new Uint8Array(data, 0, data.byteLength));
        }, void 0, void 0, true, onInternalError);
      }
    } else {
      if (!files || files.length !== 6) {
        throw new Error("Cannot load cubemap because 6 files were not defined");
      }
      const reorderedFiles = [files[0], files[3], files[1], files[4], files[2], files[5]];
      Promise.all(reorderedFiles.map((file) => this._loadFileAsync(file, void 0, true).then((data) => new Uint8Array(data, 0, data.byteLength)))).then((data) => {
        return new Promise((resolve, reject) => {
          this._engine.loadCubeTexture(texture._hardwareTexture.underlyingResource, data, !noMipmap, true, texture._useSRGBBuffer, resolve, reject);
        });
      }).then(() => {
        texture.isReady = true;
        if (onLoad) {
          onLoad();
        }
      }, (error) => {
        if (onError) {
          onError(`Failed to load cubemap: ${error.message}`, error);
        }
      });
    }
    this._internalTexturesCache.push(texture);
    return texture;
  }
  /** @internal */
  _createHardwareTexture() {
    return new NativeHardwareTexture(this._createTexture(), this._engine);
  }
  /** @internal */
  _createHardwareRenderTargetWrapper(isMulti, isCube, size) {
    const rtWrapper = new NativeRenderTargetWrapper(isMulti, isCube, size, this);
    this._renderTargetWrapperCache.push(rtWrapper);
    return rtWrapper;
  }
  /** @internal */
  _createInternalTexture(size, options, _delayGPUTextureCreation = true, source = InternalTextureSource.Unknown) {
    let generateMipMaps = false;
    let type = 0;
    let samplingMode = 3;
    let format = 5;
    let useSRGBBuffer = false;
    let samples = 1;
    let label;
    if (options !== void 0 && typeof options === "object") {
      generateMipMaps = !!options.generateMipMaps;
      type = options.type === void 0 ? 0 : options.type;
      samplingMode = options.samplingMode === void 0 ? 3 : options.samplingMode;
      format = options.format === void 0 ? 5 : options.format;
      useSRGBBuffer = options.useSRGBBuffer === void 0 ? false : options.useSRGBBuffer;
      samples = options.samples ?? 1;
      label = options.label;
    } else {
      generateMipMaps = !!options;
    }
    useSRGBBuffer = this._getUseSRGBBuffer(useSRGBBuffer, !generateMipMaps);
    if (type === 1 && !this._caps.textureFloatLinearFiltering) {
      samplingMode = 1;
    } else if (type === 2 && !this._caps.textureHalfFloatLinearFiltering) {
      samplingMode = 1;
    }
    if (type === 1 && !this._caps.textureFloat) {
      type = 0;
      Logger.Warn("Float textures are not supported. Type forced to TEXTURETYPE_UNSIGNED_BYTE");
    }
    const texture = new InternalTexture(this, source);
    const width = size.width ?? size;
    const height = size.height ?? size;
    const layers = size.layers || 0;
    if (layers !== 0) {
      throw new Error("Texture layers are not supported in Babylon Native");
    }
    const nativeTexture = texture._hardwareTexture.underlyingResource;
    const nativeTextureFormat = getNativeTextureFormat(format, type);
    this._engine.initializeTexture(nativeTexture, width, height, generateMipMaps, nativeTextureFormat, true, useSRGBBuffer, samples);
    this._setTextureSampling(nativeTexture, getNativeSamplingMode(samplingMode));
    texture._useSRGBBuffer = useSRGBBuffer;
    texture.baseWidth = width;
    texture.baseHeight = height;
    texture.width = width;
    texture.height = height;
    texture.depth = layers;
    texture.isReady = true;
    texture.samples = samples;
    texture.generateMipMaps = generateMipMaps;
    texture.samplingMode = samplingMode;
    texture.type = type;
    texture.format = format;
    texture.label = label;
    this._internalTexturesCache.push(texture);
    return texture;
  }
  createRenderTargetTexture(size, options) {
    const rtWrapper = this._createHardwareRenderTargetWrapper(false, false, size);
    let generateDepthBuffer = true;
    let generateStencilBuffer = false;
    let noColorAttachment = false;
    let colorAttachment = void 0;
    let samples = 1;
    if (options !== void 0 && typeof options === "object") {
      generateDepthBuffer = options.generateDepthBuffer ?? true;
      generateStencilBuffer = !!options.generateStencilBuffer;
      noColorAttachment = !!options.noColorAttachment;
      colorAttachment = options.colorAttachment;
      samples = options.samples ?? 1;
    }
    const texture = colorAttachment || (noColorAttachment ? null : this._createInternalTexture(size, options, true, InternalTextureSource.RenderTarget));
    const width = size.width ?? size;
    const height = size.height ?? size;
    const framebuffer = this._engine.createFrameBuffer(texture ? texture._hardwareTexture.underlyingResource : null, width, height, generateStencilBuffer, generateDepthBuffer, samples);
    rtWrapper._framebuffer = framebuffer;
    rtWrapper._generateDepthBuffer = generateDepthBuffer;
    rtWrapper._generateStencilBuffer = generateStencilBuffer;
    rtWrapper._samples = samples;
    rtWrapper.setTextures(texture);
    return rtWrapper;
  }
  updateRenderTargetTextureSampleCount(rtWrapper, samples) {
    Logger.Warn("Updating render target sample count is not currently supported");
    return rtWrapper.samples;
  }
  updateTextureSamplingMode(samplingMode, texture) {
    if (texture._hardwareTexture) {
      const filter = getNativeSamplingMode(samplingMode);
      this._setTextureSampling(texture._hardwareTexture.underlyingResource, filter);
    }
    texture.samplingMode = samplingMode;
  }
  bindFramebuffer(texture, faceIndex, requiredWidth, requiredHeight, forceFullscreenViewport) {
    const nativeRTWrapper = texture;
    if (this._currentRenderTarget) {
      this.unBindFramebuffer(this._currentRenderTarget);
    }
    this._currentRenderTarget = texture;
    if (faceIndex) {
      throw new Error("Cuboid frame buffers are not yet supported in NativeEngine.");
    }
    if (requiredWidth || requiredHeight) {
      throw new Error("Required width/height for frame buffers not yet supported in NativeEngine.");
    }
    if (forceFullscreenViewport) {
    }
    if (nativeRTWrapper._framebufferDepthStencil) {
      this._bindUnboundFramebuffer(nativeRTWrapper._framebufferDepthStencil);
    } else {
      this._bindUnboundFramebuffer(nativeRTWrapper._framebuffer);
    }
  }
  unBindFramebuffer(texture, disableGenerateMipMaps = false, onBeforeUnbind) {
    this._currentRenderTarget = null;
    if (onBeforeUnbind) {
      onBeforeUnbind();
    }
    this._bindUnboundFramebuffer(null);
  }
  createDynamicVertexBuffer(data) {
    return this.createVertexBuffer(data, true);
  }
  updateDynamicIndexBuffer(indexBuffer, indices, offset = 0) {
    const buffer = indexBuffer;
    const data = this._normalizeIndexData(indices);
    buffer.is32Bits = data.BYTES_PER_ELEMENT === 4;
    this._engine.updateDynamicIndexBuffer(buffer.nativeIndexBuffer, data.buffer, data.byteOffset, data.byteLength, offset);
  }
  updateDynamicVertexBuffer(vertexBuffer, verticies, byteOffset, byteLength) {
    const buffer = vertexBuffer;
    const data = ArrayBuffer.isView(verticies) ? verticies : new Float32Array(verticies);
    this._engine.updateDynamicVertexBuffer(buffer.nativeVertexBuffer, data.buffer, data.byteOffset + (byteOffset ?? 0), byteLength ?? data.byteLength);
  }
  // TODO: Refactor to share more logic with base Engine implementation.
  _setTexture(channel, texture, isPartOfTextureArray = false, depthStencilTexture = false) {
    const uniform = this._boundUniforms[channel];
    if (!uniform) {
      return false;
    }
    if (!texture) {
      if (this._boundTexturesCache[channel] != null) {
        this._activeChannel = channel;
        this._boundTexturesCache[channel] = null;
      }
      return false;
    }
    if (texture.video) {
      this._activeChannel = channel;
      texture.update();
    } else if (texture.delayLoadState === 4) {
      texture.delayLoad();
      return false;
    }
    let internalTexture;
    if (depthStencilTexture) {
      internalTexture = texture.depthStencilTexture;
    } else if (texture.isReady()) {
      internalTexture = texture.getInternalTexture();
    } else if (texture.isCube) {
      internalTexture = this.emptyCubeTexture;
    } else if (texture.is3D) {
      internalTexture = this.emptyTexture3D;
    } else if (texture.is2DArray) {
      internalTexture = this.emptyTexture2DArray;
    } else {
      internalTexture = this.emptyTexture;
    }
    this._activeChannel = channel;
    if (!internalTexture || !internalTexture._hardwareTexture) {
      return false;
    }
    this._setTextureWrapMode(internalTexture._hardwareTexture.underlyingResource, getNativeAddressMode(texture.wrapU), getNativeAddressMode(texture.wrapV), getNativeAddressMode(texture.wrapR));
    this._updateAnisotropicLevel(texture);
    this._setTextureCore(uniform, internalTexture._hardwareTexture.underlyingResource);
    return true;
  }
  // filter is a NativeFilter.XXXX value.
  _setTextureSampling(texture, filter) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETTEXTURESAMPLING);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(texture);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(filter);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  // addressModes are NativeAddressMode.XXXX values.
  _setTextureWrapMode(texture, addressModeU, addressModeV, addressModeW) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETTEXTUREWRAPMODE);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(texture);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(addressModeU);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(addressModeV);
    this._commandBufferEncoder.encodeCommandArgAsUInt32(addressModeW);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  _setTextureCore(uniform, texture) {
    this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETTEXTURE);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(uniform);
    this._commandBufferEncoder.encodeCommandArgAsNativeData(texture);
    this._commandBufferEncoder.finishEncodingCommand();
  }
  // TODO: Share more of this logic with the base implementation.
  // TODO: Rename to match naming in base implementation once refactoring allows different parameters.
  _updateAnisotropicLevel(texture) {
    const internalTexture = texture.getInternalTexture();
    const value = texture.anisotropicFilteringLevel;
    if (!internalTexture || !internalTexture._hardwareTexture) {
      return;
    }
    if (internalTexture._cachedAnisotropicFilteringLevel !== value) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_SETTEXTUREANISOTROPICLEVEL);
      this._commandBufferEncoder.encodeCommandArgAsNativeData(internalTexture._hardwareTexture.underlyingResource);
      this._commandBufferEncoder.encodeCommandArgAsUInt32(value);
      this._commandBufferEncoder.finishEncodingCommand();
      internalTexture._cachedAnisotropicFilteringLevel = value;
    }
  }
  /**
   * @internal
   */
  _bindTexture(channel, texture) {
    const uniform = this._boundUniforms[channel];
    if (!uniform) {
      return;
    }
    if (texture && texture._hardwareTexture) {
      const underlyingResource = texture._hardwareTexture.underlyingResource;
      this._setTextureCore(uniform, underlyingResource);
    }
  }
  _deleteBuffer(buffer) {
    if (buffer.nativeIndexBuffer) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DELETEINDEXBUFFER);
      this._commandBufferEncoder.encodeCommandArgAsNativeData(buffer.nativeIndexBuffer);
      this._commandBufferEncoder.finishEncodingCommand();
      delete buffer.nativeIndexBuffer;
    }
    if (buffer.nativeVertexBuffer) {
      this._commandBufferEncoder.startEncodingCommand(_native.Engine.COMMAND_DELETEVERTEXBUFFER);
      this._commandBufferEncoder.encodeCommandArgAsNativeData(buffer.nativeVertexBuffer);
      this._commandBufferEncoder.finishEncodingCommand();
      delete buffer.nativeVertexBuffer;
    }
  }
  /**
   * Create a canvas
   * @param width width
   * @param height height
   * @returns ICanvas interface
   */
  createCanvas(width, height) {
    if (!_native.Canvas) {
      throw new Error("Native Canvas plugin not available.");
    }
    const canvas = new _native.Canvas();
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  /**
   * Create an image to use with canvas
   * @returns IImage interface
   */
  createCanvasImage() {
    if (!_native.Canvas) {
      throw new Error("Native Canvas plugin not available.");
    }
    const image = new _native.Image();
    return image;
  }
  /**
   * Update a portion of an internal texture
   * @param texture defines the texture to update
   * @param imageData defines the data to store into the texture
   * @param xOffset defines the x coordinates of the update rectangle
   * @param yOffset defines the y coordinates of the update rectangle
   * @param width defines the width of the update rectangle
   * @param height defines the height of the update rectangle
   * @param faceIndex defines the face index if texture is a cube (0 by default)
   * @param lod defines the lod level to update (0 by default)
   * @param generateMipMaps defines whether to generate mipmaps or not
   */
  updateTextureData(texture, imageData, xOffset, yOffset, width, height, faceIndex = 0, lod = 0, generateMipMaps = false) {
    throw new Error("updateTextureData not implemented.");
  }
  /**
   * @internal
   */
  _uploadCompressedDataToTextureDirectly(texture, internalFormat, width, height, data, faceIndex = 0, lod = 0) {
    throw new Error("_uploadCompressedDataToTextureDirectly not implemented.");
  }
  /**
   * @internal
   */
  _uploadDataToTextureDirectly(texture, imageData, faceIndex = 0, lod = 0) {
    throw new Error("_uploadDataToTextureDirectly not implemented.");
  }
  /**
   * @internal
   */
  _uploadArrayBufferViewToTexture(texture, imageData, faceIndex = 0, lod = 0) {
    throw new Error("_uploadArrayBufferViewToTexture not implemented.");
  }
  /**
   * @internal
   */
  _uploadImageToTexture(texture, image, faceIndex = 0, lod = 0) {
    throw new Error("_uploadArrayBufferViewToTexture not implemented.");
  }
  getFontOffset(font) {
    const result = { ascent: 0, height: 0, descent: 0 };
    return result;
  }
  /**
   * No equivalent for native. Do nothing.
   */
  flushFramebuffer() {
  }
  _readTexturePixels(texture, width, height, faceIndex, level, buffer, _flushRenderer, _noDataConversion, x, y) {
    var _a;
    if (faceIndex !== void 0 && faceIndex !== -1) {
      throw new Error(`Reading cubemap faces is not supported, but faceIndex is ${faceIndex}.`);
    }
    return this._engine.readTexture((_a = texture._hardwareTexture) == null ? void 0 : _a.underlyingResource, level ?? 0, x ?? 0, y ?? 0, width, height, (buffer == null ? void 0 : buffer.buffer) ?? null, (buffer == null ? void 0 : buffer.byteOffset) ?? 0, (buffer == null ? void 0 : buffer.byteLength) ?? 0).then((rawBuffer) => {
      if (!buffer) {
        buffer = new Uint8Array(rawBuffer);
      }
      return buffer;
    });
  }
};
NativeEngine.PROTOCOL_VERSION = 8;

// node_modules/@babylonjs/core/XR/native/nativeXRFrame.js
var NativeXRFrame = class {
  get session() {
    return this._nativeImpl.session;
  }
  constructor(_nativeImpl) {
    this._nativeImpl = _nativeImpl;
    this._xrTransform = new XRRigidTransform();
    this._xrPose = {
      transform: this._xrTransform,
      emulatedPosition: false
    };
    this._xrPoseVectorData = new Float32Array(4 + 4);
    this.fillPoses = this._nativeImpl.fillPoses.bind(this._nativeImpl);
    this.getViewerPose = this._nativeImpl.getViewerPose.bind(this._nativeImpl);
    this.getHitTestResults = this._nativeImpl.getHitTestResults.bind(this._nativeImpl);
    this.getHitTestResultsForTransientInput = () => {
      throw new Error("XRFrame.getHitTestResultsForTransientInput not supported on native.");
    };
    this.createAnchor = this._nativeImpl.createAnchor.bind(this._nativeImpl);
    this.getJointPose = this._nativeImpl.getJointPose.bind(this._nativeImpl);
    this.fillJointRadii = this._nativeImpl.fillJointRadii.bind(this._nativeImpl);
    this.getLightEstimate = () => {
      throw new Error("XRFrame.getLightEstimate not supported on native.");
    };
    this.getImageTrackingResults = () => {
      return this._nativeImpl._imageTrackingResults ?? [];
    };
  }
  getPose(space, baseSpace) {
    if (!this._nativeImpl.getPoseData(space, baseSpace, this._xrPoseVectorData.buffer, this._xrTransform.matrix.buffer)) {
      return void 0;
    }
    const position = this._xrTransform.position;
    position.x = this._xrPoseVectorData[0];
    position.y = this._xrPoseVectorData[1];
    position.z = this._xrPoseVectorData[2];
    position.w = this._xrPoseVectorData[3];
    const orientation = this._xrTransform.orientation;
    orientation.x = this._xrPoseVectorData[4];
    orientation.y = this._xrPoseVectorData[5];
    orientation.z = this._xrPoseVectorData[6];
    orientation.w = this._xrPoseVectorData[7];
    return this._xrPose;
  }
  get trackedAnchors() {
    return this._nativeImpl.trackedAnchors;
  }
  get worldInformation() {
    return this._nativeImpl.worldInformation;
  }
  get detectedPlanes() {
    return this._nativeImpl.detectedPlanes;
  }
  get featurePointCloud() {
    return this._nativeImpl.featurePointCloud;
  }
  getDepthInformation(view) {
    throw new Error("This function is not available in Babylon Native");
  }
};
RegisterNativeTypeAsync("NativeXRFrame", NativeXRFrame);

export {
  RawTexture,
  PassPostProcess,
  PassCubePostProcess,
  NativeDataStream,
  SphericalHarmonics,
  SphericalPolynomial,
  CreateResizedCopy,
  ApplyPostProcess,
  ToHalfFloat,
  FromHalfFloat,
  GetTextureDataAsync,
  TextureTools,
  RGBDTextureTools,
  CubeMapToSphericalPolynomialTools,
  GetEnvInfo,
  normalizeEnvInfo,
  CreateEnvTextureAsync,
  CreateImageDataArrayBufferViews,
  UploadEnvLevelsAsync,
  UploadLevelsAsync,
  UploadEnvSpherical,
  _UpdateRGBDAsync,
  EnvironmentTextureTools,
  RemoveComments,
  ShaderCodeInliner,
  AcquireNativeObjectAsync,
  RegisterNativeTypeAsync,
  NativeEngine,
  ShadowLight,
  DirectionalLight,
  HDRFiltering,
  WebXRHitTestLegacy,
  WebXRAnchorSystem,
  WebXRPlaneDetector,
  WebXRBackgroundRemover,
  IWebXRControllerPhysicsOptions,
  WebXRControllerPhysics,
  WebXRHitTest,
  WebXRFeaturePointSystem,
  WebXRMeshDetector,
  WebXRImageTracking,
  WebXRDomOverlay,
  WebXRControllerMovement,
  WebXRLightEstimation,
  WebXREyeTracking,
  WebXRWalkingLocomotion,
  WebXRLayers,
  WebXRDepthSensing,
  XRSpaceWarpRenderTarget,
  WebXRSpaceWarpRenderTargetTextureProvider,
  WebXRSpaceWarp,
  WebXRRawCameraAccess,
  WebXRGenericHandController,
  WebXRMicrosoftMixedRealityController,
  WebXROculusTouchMotionController,
  WebXRHTCViveMotionController,
  NativeXRFrame
};
//# sourceMappingURL=chunk-NGU5Z2FX.js.map
