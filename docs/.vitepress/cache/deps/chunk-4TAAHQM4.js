import {
  Animation,
  CreateGroundVertexData,
  Light,
  Ray,
  UtilityLayerRenderer
} from "./chunk-OHWPCADU.js";
import {
  AbstractMesh,
  Camera,
  CompatibilityOptions,
  Material,
  Mesh,
  Space,
  Texture,
  TransformNode,
  VertexData,
  WebXRHandJoint
} from "./chunk-ITV2C7F3.js";
import {
  PointerEventTypes,
  Scene,
  SceneComponentConstants,
  Tags,
  VertexBuffer
} from "./chunk-MGIQNXLG.js";
import {
  Matrix,
  Quaternion,
  TmpVectors,
  Vector2,
  Vector3,
  Vector4
} from "./chunk-KF2PBIOU.js";
import {
  Color4,
  Scalar
} from "./chunk-HW4XGYU2.js";
import {
  Epsilon
} from "./chunk-PQO2DACS.js";
import {
  WebXRFeatureName
} from "./chunk-7NS6XXZR.js";
import {
  Tools
} from "./chunk-CP55DDXS.js";
import {
  DrawWrapper,
  ShaderStore
} from "./chunk-TFTPPWZW.js";
import {
  EngineStore,
  Observable
} from "./chunk-2PRSVFDC.js";

// node_modules/@babylonjs/core/Engines/constants.js
var Constants = class {
};
Constants.ALPHA_DISABLE = 0;
Constants.ALPHA_ADD = 1;
Constants.ALPHA_COMBINE = 2;
Constants.ALPHA_SUBTRACT = 3;
Constants.ALPHA_MULTIPLY = 4;
Constants.ALPHA_MAXIMIZED = 5;
Constants.ALPHA_ONEONE = 6;
Constants.ALPHA_PREMULTIPLIED = 7;
Constants.ALPHA_PREMULTIPLIED_PORTERDUFF = 8;
Constants.ALPHA_INTERPOLATE = 9;
Constants.ALPHA_SCREENMODE = 10;
Constants.ALPHA_ONEONE_ONEONE = 11;
Constants.ALPHA_ALPHATOCOLOR = 12;
Constants.ALPHA_REVERSEONEMINUS = 13;
Constants.ALPHA_SRC_DSTONEMINUSSRCALPHA = 14;
Constants.ALPHA_ONEONE_ONEZERO = 15;
Constants.ALPHA_EXCLUSION = 16;
Constants.ALPHA_LAYER_ACCUMULATE = 17;
Constants.ALPHA_EQUATION_ADD = 0;
Constants.ALPHA_EQUATION_SUBSTRACT = 1;
Constants.ALPHA_EQUATION_REVERSE_SUBTRACT = 2;
Constants.ALPHA_EQUATION_MAX = 3;
Constants.ALPHA_EQUATION_MIN = 4;
Constants.ALPHA_EQUATION_DARKEN = 5;
Constants.DELAYLOADSTATE_NONE = 0;
Constants.DELAYLOADSTATE_LOADED = 1;
Constants.DELAYLOADSTATE_LOADING = 2;
Constants.DELAYLOADSTATE_NOTLOADED = 4;
Constants.NEVER = 512;
Constants.ALWAYS = 519;
Constants.LESS = 513;
Constants.EQUAL = 514;
Constants.LEQUAL = 515;
Constants.GREATER = 516;
Constants.GEQUAL = 518;
Constants.NOTEQUAL = 517;
Constants.KEEP = 7680;
Constants.ZERO = 0;
Constants.REPLACE = 7681;
Constants.INCR = 7682;
Constants.DECR = 7683;
Constants.INVERT = 5386;
Constants.INCR_WRAP = 34055;
Constants.DECR_WRAP = 34056;
Constants.TEXTURE_CLAMP_ADDRESSMODE = 0;
Constants.TEXTURE_WRAP_ADDRESSMODE = 1;
Constants.TEXTURE_MIRROR_ADDRESSMODE = 2;
Constants.TEXTURE_CREATIONFLAG_STORAGE = 1;
Constants.TEXTUREFORMAT_ALPHA = 0;
Constants.TEXTUREFORMAT_LUMINANCE = 1;
Constants.TEXTUREFORMAT_LUMINANCE_ALPHA = 2;
Constants.TEXTUREFORMAT_RGB = 4;
Constants.TEXTUREFORMAT_RGBA = 5;
Constants.TEXTUREFORMAT_RED = 6;
Constants.TEXTUREFORMAT_R = 6;
Constants.TEXTUREFORMAT_RG = 7;
Constants.TEXTUREFORMAT_RED_INTEGER = 8;
Constants.TEXTUREFORMAT_R_INTEGER = 8;
Constants.TEXTUREFORMAT_RG_INTEGER = 9;
Constants.TEXTUREFORMAT_RGB_INTEGER = 10;
Constants.TEXTUREFORMAT_RGBA_INTEGER = 11;
Constants.TEXTUREFORMAT_BGRA = 12;
Constants.TEXTUREFORMAT_DEPTH24_STENCIL8 = 13;
Constants.TEXTUREFORMAT_DEPTH32_FLOAT = 14;
Constants.TEXTUREFORMAT_DEPTH16 = 15;
Constants.TEXTUREFORMAT_DEPTH24 = 16;
Constants.TEXTUREFORMAT_DEPTH24UNORM_STENCIL8 = 17;
Constants.TEXTUREFORMAT_DEPTH32FLOAT_STENCIL8 = 18;
Constants.TEXTUREFORMAT_STENCIL8 = 19;
Constants.TEXTUREFORMAT_UNDEFINED = 4294967295;
Constants.TEXTUREFORMAT_COMPRESSED_RGBA_BPTC_UNORM = 36492;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_BPTC_UNORM = 36493;
Constants.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT = 36495;
Constants.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_SIGNED_FLOAT = 36494;
Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT5 = 33779;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919;
Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT3 = 33778;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918;
Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT1 = 33777;
Constants.TEXTUREFORMAT_COMPRESSED_RGB_S3TC_DXT1 = 33776;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916;
Constants.TEXTUREFORMAT_COMPRESSED_RGBA_ASTC_4x4 = 37808;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR = 37840;
Constants.TEXTUREFORMAT_COMPRESSED_RGB_ETC1_WEBGL = 36196;
Constants.TEXTUREFORMAT_COMPRESSED_RGB8_ETC2 = 37492;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_ETC2 = 37493;
Constants.TEXTUREFORMAT_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495;
Constants.TEXTUREFORMAT_COMPRESSED_RGBA8_ETC2_EAC = 37496;
Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497;
Constants.TEXTURETYPE_UNSIGNED_BYTE = 0;
Constants.TEXTURETYPE_UNSIGNED_INT = 0;
Constants.TEXTURETYPE_FLOAT = 1;
Constants.TEXTURETYPE_HALF_FLOAT = 2;
Constants.TEXTURETYPE_BYTE = 3;
Constants.TEXTURETYPE_SHORT = 4;
Constants.TEXTURETYPE_UNSIGNED_SHORT = 5;
Constants.TEXTURETYPE_INT = 6;
Constants.TEXTURETYPE_UNSIGNED_INTEGER = 7;
Constants.TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4 = 8;
Constants.TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1 = 9;
Constants.TEXTURETYPE_UNSIGNED_SHORT_5_6_5 = 10;
Constants.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV = 11;
Constants.TEXTURETYPE_UNSIGNED_INT_24_8 = 12;
Constants.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV = 13;
Constants.TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV = 14;
Constants.TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV = 15;
Constants.TEXTURETYPE_UNDEFINED = 16;
Constants.TEXTURE_2D = 3553;
Constants.TEXTURE_2D_ARRAY = 35866;
Constants.TEXTURE_CUBE_MAP = 34067;
Constants.TEXTURE_CUBE_MAP_ARRAY = 3735928559;
Constants.TEXTURE_3D = 32879;
Constants.TEXTURE_NEAREST_SAMPLINGMODE = 1;
Constants.TEXTURE_NEAREST_NEAREST = 1;
Constants.TEXTURE_BILINEAR_SAMPLINGMODE = 2;
Constants.TEXTURE_LINEAR_LINEAR = 2;
Constants.TEXTURE_TRILINEAR_SAMPLINGMODE = 3;
Constants.TEXTURE_LINEAR_LINEAR_MIPLINEAR = 3;
Constants.TEXTURE_NEAREST_NEAREST_MIPNEAREST = 4;
Constants.TEXTURE_NEAREST_LINEAR_MIPNEAREST = 5;
Constants.TEXTURE_NEAREST_LINEAR_MIPLINEAR = 6;
Constants.TEXTURE_NEAREST_LINEAR = 7;
Constants.TEXTURE_NEAREST_NEAREST_MIPLINEAR = 8;
Constants.TEXTURE_LINEAR_NEAREST_MIPNEAREST = 9;
Constants.TEXTURE_LINEAR_NEAREST_MIPLINEAR = 10;
Constants.TEXTURE_LINEAR_LINEAR_MIPNEAREST = 11;
Constants.TEXTURE_LINEAR_NEAREST = 12;
Constants.TEXTURE_EXPLICIT_MODE = 0;
Constants.TEXTURE_SPHERICAL_MODE = 1;
Constants.TEXTURE_PLANAR_MODE = 2;
Constants.TEXTURE_CUBIC_MODE = 3;
Constants.TEXTURE_PROJECTION_MODE = 4;
Constants.TEXTURE_SKYBOX_MODE = 5;
Constants.TEXTURE_INVCUBIC_MODE = 6;
Constants.TEXTURE_EQUIRECTANGULAR_MODE = 7;
Constants.TEXTURE_FIXED_EQUIRECTANGULAR_MODE = 8;
Constants.TEXTURE_FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;
Constants.TEXTURE_FILTERING_QUALITY_OFFLINE = 4096;
Constants.TEXTURE_FILTERING_QUALITY_HIGH = 64;
Constants.TEXTURE_FILTERING_QUALITY_MEDIUM = 16;
Constants.TEXTURE_FILTERING_QUALITY_LOW = 8;
Constants.SCALEMODE_FLOOR = 1;
Constants.SCALEMODE_NEAREST = 2;
Constants.SCALEMODE_CEILING = 3;
Constants.MATERIAL_TextureDirtyFlag = 1;
Constants.MATERIAL_LightDirtyFlag = 2;
Constants.MATERIAL_FresnelDirtyFlag = 4;
Constants.MATERIAL_AttributesDirtyFlag = 8;
Constants.MATERIAL_MiscDirtyFlag = 16;
Constants.MATERIAL_PrePassDirtyFlag = 32;
Constants.MATERIAL_AllDirtyFlag = 63;
Constants.MATERIAL_TriangleFillMode = 0;
Constants.MATERIAL_WireFrameFillMode = 1;
Constants.MATERIAL_PointFillMode = 2;
Constants.MATERIAL_PointListDrawMode = 3;
Constants.MATERIAL_LineListDrawMode = 4;
Constants.MATERIAL_LineLoopDrawMode = 5;
Constants.MATERIAL_LineStripDrawMode = 6;
Constants.MATERIAL_TriangleStripDrawMode = 7;
Constants.MATERIAL_TriangleFanDrawMode = 8;
Constants.MATERIAL_ClockWiseSideOrientation = 0;
Constants.MATERIAL_CounterClockWiseSideOrientation = 1;
Constants.ACTION_NothingTrigger = 0;
Constants.ACTION_OnPickTrigger = 1;
Constants.ACTION_OnLeftPickTrigger = 2;
Constants.ACTION_OnRightPickTrigger = 3;
Constants.ACTION_OnCenterPickTrigger = 4;
Constants.ACTION_OnPickDownTrigger = 5;
Constants.ACTION_OnDoublePickTrigger = 6;
Constants.ACTION_OnPickUpTrigger = 7;
Constants.ACTION_OnPickOutTrigger = 16;
Constants.ACTION_OnLongPressTrigger = 8;
Constants.ACTION_OnPointerOverTrigger = 9;
Constants.ACTION_OnPointerOutTrigger = 10;
Constants.ACTION_OnEveryFrameTrigger = 11;
Constants.ACTION_OnIntersectionEnterTrigger = 12;
Constants.ACTION_OnIntersectionExitTrigger = 13;
Constants.ACTION_OnKeyDownTrigger = 14;
Constants.ACTION_OnKeyUpTrigger = 15;
Constants.PARTICLES_BILLBOARDMODE_Y = 2;
Constants.PARTICLES_BILLBOARDMODE_ALL = 7;
Constants.PARTICLES_BILLBOARDMODE_STRETCHED = 8;
Constants.PARTICLES_BILLBOARDMODE_STRETCHED_LOCAL = 9;
Constants.MESHES_CULLINGSTRATEGY_STANDARD = 0;
Constants.MESHES_CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY = 1;
Constants.MESHES_CULLINGSTRATEGY_OPTIMISTIC_INCLUSION = 2;
Constants.MESHES_CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY = 3;
Constants.SCENELOADER_NO_LOGGING = 0;
Constants.SCENELOADER_MINIMAL_LOGGING = 1;
Constants.SCENELOADER_SUMMARY_LOGGING = 2;
Constants.SCENELOADER_DETAILED_LOGGING = 3;
Constants.PREPASS_IRRADIANCE_TEXTURE_TYPE = 0;
Constants.PREPASS_POSITION_TEXTURE_TYPE = 1;
Constants.PREPASS_VELOCITY_TEXTURE_TYPE = 2;
Constants.PREPASS_REFLECTIVITY_TEXTURE_TYPE = 3;
Constants.PREPASS_COLOR_TEXTURE_TYPE = 4;
Constants.PREPASS_DEPTH_TEXTURE_TYPE = 5;
Constants.PREPASS_NORMAL_TEXTURE_TYPE = 6;
Constants.PREPASS_ALBEDO_SQRT_TEXTURE_TYPE = 7;
Constants.BUFFER_CREATIONFLAG_READ = 1;
Constants.BUFFER_CREATIONFLAG_WRITE = 2;
Constants.BUFFER_CREATIONFLAG_READWRITE = 3;
Constants.BUFFER_CREATIONFLAG_UNIFORM = 4;
Constants.BUFFER_CREATIONFLAG_VERTEX = 8;
Constants.BUFFER_CREATIONFLAG_INDEX = 16;
Constants.BUFFER_CREATIONFLAG_STORAGE = 32;
Constants.RENDERPASS_MAIN = 0;
Constants.INPUT_ALT_KEY = 18;
Constants.INPUT_CTRL_KEY = 17;
Constants.INPUT_META_KEY1 = 91;
Constants.INPUT_META_KEY2 = 92;
Constants.INPUT_META_KEY3 = 93;
Constants.INPUT_SHIFT_KEY = 16;
Constants.SNAPSHOTRENDERING_STANDARD = 0;
Constants.SNAPSHOTRENDERING_FAST = 1;
Constants.PERSPECTIVE_CAMERA = 0;
Constants.ORTHOGRAPHIC_CAMERA = 1;
Constants.FOVMODE_VERTICAL_FIXED = 0;
Constants.FOVMODE_HORIZONTAL_FIXED = 1;
Constants.RIG_MODE_NONE = 0;
Constants.RIG_MODE_STEREOSCOPIC_ANAGLYPH = 10;
Constants.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL = 11;
Constants.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED = 12;
Constants.RIG_MODE_STEREOSCOPIC_OVERUNDER = 13;
Constants.RIG_MODE_STEREOSCOPIC_INTERLACED = 14;
Constants.RIG_MODE_VR = 20;
Constants.RIG_MODE_CUSTOM = 22;
Constants.MAX_SUPPORTED_UV_SETS = 6;
Constants.GL_ALPHA_EQUATION_ADD = 32774;
Constants.GL_ALPHA_EQUATION_MIN = 32775;
Constants.GL_ALPHA_EQUATION_MAX = 32776;
Constants.GL_ALPHA_EQUATION_SUBTRACT = 32778;
Constants.GL_ALPHA_EQUATION_REVERSE_SUBTRACT = 32779;
Constants.GL_ALPHA_FUNCTION_SRC = 768;
Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR = 769;
Constants.GL_ALPHA_FUNCTION_SRC_ALPHA = 770;
Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA = 771;
Constants.GL_ALPHA_FUNCTION_DST_ALPHA = 772;
Constants.GL_ALPHA_FUNCTION_ONE_MINUS_DST_ALPHA = 773;
Constants.GL_ALPHA_FUNCTION_DST_COLOR = 774;
Constants.GL_ALPHA_FUNCTION_ONE_MINUS_DST_COLOR = 775;
Constants.GL_ALPHA_FUNCTION_SRC_ALPHA_SATURATED = 776;
Constants.GL_ALPHA_FUNCTION_CONSTANT_COLOR = 32769;
Constants.GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_COLOR = 32770;
Constants.GL_ALPHA_FUNCTION_CONSTANT_ALPHA = 32771;
Constants.GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_ALPHA = 32772;
Constants.SnippetUrl = "https://snippet.babylonjs.com";
Constants.FOGMODE_NONE = 0;
Constants.FOGMODE_EXP = 1;
Constants.FOGMODE_EXP2 = 2;
Constants.FOGMODE_LINEAR = 3;
Constants.BYTE = 5120;
Constants.UNSIGNED_BYTE = 5121;
Constants.SHORT = 5122;
Constants.UNSIGNED_SHORT = 5123;
Constants.INT = 5124;
Constants.UNSIGNED_INT = 5125;
Constants.FLOAT = 5126;
Constants.PositionKind = "position";
Constants.NormalKind = "normal";
Constants.TangentKind = "tangent";
Constants.UVKind = "uv";
Constants.UV2Kind = "uv2";
Constants.UV3Kind = "uv3";
Constants.UV4Kind = "uv4";
Constants.UV5Kind = "uv5";
Constants.UV6Kind = "uv6";
Constants.ColorKind = "color";
Constants.ColorInstanceKind = "instanceColor";
Constants.MatricesIndicesKind = "matricesIndices";
Constants.MatricesWeightsKind = "matricesWeights";
Constants.MatricesIndicesExtraKind = "matricesIndicesExtra";
Constants.MatricesWeightsExtraKind = "matricesWeightsExtra";

// node_modules/@babylonjs/core/Events/clipboardEvents.js
var ClipboardEventTypes = class {
};
ClipboardEventTypes.COPY = 1;
ClipboardEventTypes.CUT = 2;
ClipboardEventTypes.PASTE = 3;
var ClipboardInfo = class {
  /**
   *Creates an instance of ClipboardInfo.
   * @param type Defines the type of event (BABYLON.ClipboardEventTypes)
   * @param event Defines the related dom event
   */
  constructor(type, event) {
    this.type = type;
    this.event = event;
  }
  /**
   *  Get the clipboard event's type from the keycode.
   * @param keyCode Defines the keyCode for the current keyboard event.
   * @returns {number}
   */
  static GetTypeFromCharacter(keyCode) {
    const charCode = keyCode;
    switch (charCode) {
      case 67:
        return ClipboardEventTypes.COPY;
      case 86:
        return ClipboardEventTypes.PASTE;
      case 88:
        return ClipboardEventTypes.CUT;
      default:
        return -1;
    }
  }
};

// node_modules/@babylonjs/core/Layers/layerSceneComponent.js
var LayerSceneComponent = class {
  /**
   * Creates a new instance of the component for the given scene
   * @param scene Defines the scene to register the component in
   */
  constructor(scene) {
    this.name = SceneComponentConstants.NAME_LAYER;
    this.scene = scene || EngineStore.LastCreatedScene;
    if (!this.scene) {
      return;
    }
    this._engine = this.scene.getEngine();
    this.scene.layers = [];
  }
  /**
   * Registers the component in a given scene
   */
  register() {
    this.scene._beforeCameraDrawStage.registerStep(SceneComponentConstants.STEP_BEFORECAMERADRAW_LAYER, this, this._drawCameraBackground);
    this.scene._afterCameraDrawStage.registerStep(SceneComponentConstants.STEP_AFTERCAMERADRAW_LAYER, this, this._drawCameraForegroundWithPostProcessing);
    this.scene._afterCameraPostProcessStage.registerStep(SceneComponentConstants.STEP_AFTERCAMERAPOSTPROCESS_LAYER, this, this._drawCameraForegroundWithoutPostProcessing);
    this.scene._beforeRenderTargetDrawStage.registerStep(SceneComponentConstants.STEP_BEFORERENDERTARGETDRAW_LAYER, this, this._drawRenderTargetBackground);
    this.scene._afterRenderTargetDrawStage.registerStep(SceneComponentConstants.STEP_AFTERRENDERTARGETDRAW_LAYER, this, this._drawRenderTargetForegroundWithPostProcessing);
    this.scene._afterRenderTargetPostProcessStage.registerStep(SceneComponentConstants.STEP_AFTERRENDERTARGETPOSTPROCESS_LAYER, this, this._drawRenderTargetForegroundWithoutPostProcessing);
  }
  /**
   * Rebuilds the elements related to this component in case of
   * context lost for instance.
   */
  rebuild() {
    const layers = this.scene.layers;
    for (const layer of layers) {
      layer._rebuild();
    }
  }
  /**
   * Disposes the component and the associated resources.
   */
  dispose() {
    const layers = this.scene.layers;
    while (layers.length) {
      layers[0].dispose();
    }
  }
  _draw(predicate) {
    const layers = this.scene.layers;
    if (layers.length) {
      this._engine.setDepthBuffer(false);
      for (const layer of layers) {
        if (predicate(layer)) {
          layer.render();
        }
      }
      this._engine.setDepthBuffer(true);
    }
  }
  _drawCameraPredicate(layer, isBackground, applyPostProcess, cameraLayerMask) {
    return !layer.renderOnlyInRenderTargetTextures && layer.isBackground === isBackground && layer.applyPostProcess === applyPostProcess && (layer.layerMask & cameraLayerMask) !== 0;
  }
  _drawCameraBackground(camera) {
    this._draw((layer) => {
      return this._drawCameraPredicate(layer, true, true, camera.layerMask);
    });
  }
  _drawCameraForegroundWithPostProcessing(camera) {
    this._draw((layer) => {
      return this._drawCameraPredicate(layer, false, true, camera.layerMask);
    });
  }
  _drawCameraForegroundWithoutPostProcessing(camera) {
    this._draw((layer) => {
      return this._drawCameraPredicate(layer, false, false, camera.layerMask);
    });
  }
  _drawRenderTargetPredicate(layer, isBackground, applyPostProcess, cameraLayerMask, renderTargetTexture) {
    return layer.renderTargetTextures.length > 0 && layer.isBackground === isBackground && layer.applyPostProcess === applyPostProcess && layer.renderTargetTextures.indexOf(renderTargetTexture) > -1 && (layer.layerMask & cameraLayerMask) !== 0;
  }
  _drawRenderTargetBackground(renderTarget) {
    this._draw((layer) => {
      return this._drawRenderTargetPredicate(layer, true, true, this.scene.activeCamera.layerMask, renderTarget);
    });
  }
  _drawRenderTargetForegroundWithPostProcessing(renderTarget) {
    this._draw((layer) => {
      return this._drawRenderTargetPredicate(layer, false, true, this.scene.activeCamera.layerMask, renderTarget);
    });
  }
  _drawRenderTargetForegroundWithoutPostProcessing(renderTarget) {
    this._draw((layer) => {
      return this._drawRenderTargetPredicate(layer, false, false, this.scene.activeCamera.layerMask, renderTarget);
    });
  }
  /**
   * Adds all the elements from the container to the scene
   * @param container the container holding the elements
   */
  addFromContainer(container) {
    if (!container.layers) {
      return;
    }
    container.layers.forEach((layer) => {
      this.scene.layers.push(layer);
    });
  }
  /**
   * Removes all the elements in the container from the scene
   * @param container contains the elements to remove
   * @param dispose if the removed element should be disposed (default: false)
   */
  removeFromContainer(container, dispose = false) {
    if (!container.layers) {
      return;
    }
    container.layers.forEach((layer) => {
      const index = this.scene.layers.indexOf(layer);
      if (index !== -1) {
        this.scene.layers.splice(index, 1);
      }
      if (dispose) {
        layer.dispose();
      }
    });
  }
};

// node_modules/@babylonjs/core/Shaders/layer.fragment.js
var name = "layerPixelShader";
var shader = `varying vec2 vUV;uniform sampler2D textureSampler;uniform vec4 color;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
vec4 baseColor=texture2D(textureSampler,vUV);
#ifdef LINEAR
baseColor.rgb=toGammaSpace(baseColor.rgb);
#endif
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
gl_FragColor=baseColor*color;
#define CUSTOM_FRAGMENT_MAIN_END
}`;
ShaderStore.ShadersStore[name] = shader;

// node_modules/@babylonjs/core/Shaders/layer.vertex.js
var name2 = "layerVertexShader";
var shader2 = `attribute vec2 position;uniform vec2 scale;uniform vec2 offset;uniform mat4 textureMatrix;varying vec2 vUV;const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec2 shiftedPosition=position*scale+offset;vUV=vec2(textureMatrix*vec4(shiftedPosition*madd+madd,1.0,0.0));gl_Position=vec4(shiftedPosition,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;
ShaderStore.ShadersStore[name2] = shader2;

// node_modules/@babylonjs/core/Layers/layer.js
var Layer = class {
  /**
   * Determines if the layer is drawn before (true) or after (false) post-processing.
   * If the layer is background, it is always before.
   */
  set applyPostProcess(value) {
    this._applyPostProcess = value;
  }
  get applyPostProcess() {
    return this.isBackground || this._applyPostProcess;
  }
  /**
   * Back compatibility with callback before the onDisposeObservable existed.
   * The set callback will be triggered when the layer has been disposed.
   */
  set onDispose(callback) {
    if (this._onDisposeObserver) {
      this.onDisposeObservable.remove(this._onDisposeObserver);
    }
    this._onDisposeObserver = this.onDisposeObservable.add(callback);
  }
  /**
   * Back compatibility with callback before the onBeforeRenderObservable existed.
   * The set callback will be triggered just before rendering the layer.
   */
  set onBeforeRender(callback) {
    if (this._onBeforeRenderObserver) {
      this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
    }
    this._onBeforeRenderObserver = this.onBeforeRenderObservable.add(callback);
  }
  /**
   * Back compatibility with callback before the onAfterRenderObservable existed.
   * The set callback will be triggered just after rendering the layer.
   */
  set onAfterRender(callback) {
    if (this._onAfterRenderObserver) {
      this.onAfterRenderObservable.remove(this._onAfterRenderObserver);
    }
    this._onAfterRenderObserver = this.onAfterRenderObservable.add(callback);
  }
  /**
   * Instantiates a new layer.
   * This represents a full screen 2d layer.
   * This can be useful to display a picture in the  background of your scene for instance.
   * @see https://www.babylonjs-playground.com/#08A2BS#1
   * @param name Define the name of the layer in the scene
   * @param imgUrl Define the url of the texture to display in the layer
   * @param scene Define the scene the layer belongs to
   * @param isBackground Defines whether the layer is displayed in front or behind the scene
   * @param color Defines a color for the layer
   */
  constructor(name3, imgUrl, scene, isBackground, color) {
    this.name = name3;
    this._applyPostProcess = true;
    this.scale = new Vector2(1, 1);
    this.offset = new Vector2(0, 0);
    this.alphaBlendingMode = 2;
    this.layerMask = 268435455;
    this.renderTargetTextures = [];
    this.renderOnlyInRenderTargetTextures = false;
    this.isEnabled = true;
    this._vertexBuffers = {};
    this.onDisposeObservable = new Observable();
    this.onBeforeRenderObservable = new Observable();
    this.onAfterRenderObservable = new Observable();
    this.texture = imgUrl ? new Texture(imgUrl, scene, true) : null;
    this.isBackground = isBackground === void 0 ? true : isBackground;
    this.color = color === void 0 ? new Color4(1, 1, 1, 1) : color;
    this._scene = scene || EngineStore.LastCreatedScene;
    let layerComponent = this._scene._getComponent(SceneComponentConstants.NAME_LAYER);
    if (!layerComponent) {
      layerComponent = new LayerSceneComponent(this._scene);
      this._scene._addComponent(layerComponent);
    }
    this._scene.layers.push(this);
    const engine = this._scene.getEngine();
    this._drawWrapper = new DrawWrapper(engine);
    const vertices = [];
    vertices.push(1, 1);
    vertices.push(-1, 1);
    vertices.push(-1, -1);
    vertices.push(1, -1);
    const vertexBuffer = new VertexBuffer(engine, vertices, VertexBuffer.PositionKind, false, false, 2);
    this._vertexBuffers[VertexBuffer.PositionKind] = vertexBuffer;
    this._createIndexBuffer();
  }
  _createIndexBuffer() {
    const engine = this._scene.getEngine();
    const indices = [];
    indices.push(0);
    indices.push(1);
    indices.push(2);
    indices.push(0);
    indices.push(2);
    indices.push(3);
    this._indexBuffer = engine.createIndexBuffer(indices);
  }
  /** @internal */
  _rebuild() {
    const vb = this._vertexBuffers[VertexBuffer.PositionKind];
    if (vb) {
      vb._rebuild();
    }
    this._createIndexBuffer();
  }
  /**
   * Checks if the layer is ready to be rendered
   * @returns true if the layer is ready. False otherwise.
   */
  isReady() {
    var _a;
    const engine = this._scene.getEngine();
    let defines = "";
    if (this.alphaTest) {
      defines = "#define ALPHATEST";
    }
    if (this.texture && !this.texture.gammaSpace) {
      defines += "\n#define LINEAR";
    }
    if (this._previousDefines !== defines) {
      this._previousDefines = defines;
      this._drawWrapper.effect = engine.createEffect("layer", [VertexBuffer.PositionKind], ["textureMatrix", "color", "scale", "offset"], ["textureSampler"], defines);
    }
    const currentEffect = this._drawWrapper.effect;
    return (currentEffect == null ? void 0 : currentEffect.isReady()) && ((_a = this.texture) == null ? void 0 : _a.isReady());
  }
  /**
   * Renders the layer in the scene.
   */
  render() {
    if (!this.isEnabled) {
      return;
    }
    const engine = this._scene.getEngine();
    if (!this.isReady()) {
      return;
    }
    const currentEffect = this._drawWrapper.effect;
    this.onBeforeRenderObservable.notifyObservers(this);
    engine.enableEffect(this._drawWrapper);
    engine.setState(false);
    currentEffect.setTexture("textureSampler", this.texture);
    currentEffect.setMatrix("textureMatrix", this.texture.getTextureMatrix());
    currentEffect.setFloat4("color", this.color.r, this.color.g, this.color.b, this.color.a);
    currentEffect.setVector2("offset", this.offset);
    currentEffect.setVector2("scale", this.scale);
    engine.bindBuffers(this._vertexBuffers, this._indexBuffer, currentEffect);
    if (!this.alphaTest) {
      engine.setAlphaMode(this.alphaBlendingMode);
      engine.drawElementsType(Material.TriangleFillMode, 0, 6);
      engine.setAlphaMode(0);
    } else {
      engine.drawElementsType(Material.TriangleFillMode, 0, 6);
    }
    this.onAfterRenderObservable.notifyObservers(this);
  }
  /**
   * Disposes and releases the associated resources.
   */
  dispose() {
    const vertexBuffer = this._vertexBuffers[VertexBuffer.PositionKind];
    if (vertexBuffer) {
      vertexBuffer.dispose();
      this._vertexBuffers[VertexBuffer.PositionKind] = null;
    }
    if (this._indexBuffer) {
      this._scene.getEngine()._releaseBuffer(this._indexBuffer);
      this._indexBuffer = null;
    }
    if (this.texture) {
      this.texture.dispose();
      this.texture = null;
    }
    this.renderTargetTextures = [];
    const index = this._scene.layers.indexOf(this);
    this._scene.layers.splice(index, 1);
    this.onDisposeObservable.notifyObservers(this);
    this.onDisposeObservable.clear();
    this.onAfterRenderObservable.clear();
    this.onBeforeRenderObservable.clear();
  }
};

// node_modules/@babylonjs/core/Meshes/Builders/boxBuilder.js
function CreateBoxVertexData(options) {
  const nbFaces = 6;
  let indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  const normals = [
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0
  ];
  const uvs = [];
  let positions = [];
  const width = options.width || options.size || 1;
  const height = options.height || options.size || 1;
  const depth = options.depth || options.size || 1;
  const wrap = options.wrap || false;
  let topBaseAt = options.topBaseAt === void 0 ? 1 : options.topBaseAt;
  let bottomBaseAt = options.bottomBaseAt === void 0 ? 0 : options.bottomBaseAt;
  topBaseAt = (topBaseAt + 4) % 4;
  bottomBaseAt = (bottomBaseAt + 4) % 4;
  const topOrder = [2, 0, 3, 1];
  const bottomOrder = [2, 0, 1, 3];
  let topIndex = topOrder[topBaseAt];
  let bottomIndex = bottomOrder[bottomBaseAt];
  let basePositions = [
    1,
    -1,
    1,
    -1,
    -1,
    1,
    -1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1,
    -1,
    -1,
    1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1,
    -1,
    1,
    1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1
  ];
  if (wrap) {
    indices = [2, 3, 0, 2, 0, 1, 4, 5, 6, 4, 6, 7, 9, 10, 11, 9, 11, 8, 12, 14, 15, 12, 13, 14];
    basePositions = [
      -1,
      1,
      1,
      1,
      1,
      1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1
    ];
    let topFaceBase = [
      [1, 1, 1],
      [-1, 1, 1],
      [-1, 1, -1],
      [1, 1, -1]
    ];
    let bottomFaceBase = [
      [-1, -1, 1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, -1, -1]
    ];
    const topFaceOrder = [17, 18, 19, 16];
    const bottomFaceOrder = [22, 23, 20, 21];
    while (topIndex > 0) {
      topFaceBase.unshift(topFaceBase.pop());
      topFaceOrder.unshift(topFaceOrder.pop());
      topIndex--;
    }
    while (bottomIndex > 0) {
      bottomFaceBase.unshift(bottomFaceBase.pop());
      bottomFaceOrder.unshift(bottomFaceOrder.pop());
      bottomIndex--;
    }
    topFaceBase = topFaceBase.flat();
    bottomFaceBase = bottomFaceBase.flat();
    basePositions = basePositions.concat(topFaceBase).concat(bottomFaceBase);
    indices.push(topFaceOrder[0], topFaceOrder[2], topFaceOrder[3], topFaceOrder[0], topFaceOrder[1], topFaceOrder[2]);
    indices.push(bottomFaceOrder[0], bottomFaceOrder[2], bottomFaceOrder[3], bottomFaceOrder[0], bottomFaceOrder[1], bottomFaceOrder[2]);
  }
  const scaleArray = [width / 2, height / 2, depth / 2];
  positions = basePositions.reduce((accumulator, currentValue, currentIndex) => accumulator.concat(currentValue * scaleArray[currentIndex % 3]), []);
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const faceUV = options.faceUV || new Array(6);
  const faceColors = options.faceColors;
  const colors = [];
  for (let f = 0; f < 6; f++) {
    if (faceUV[f] === void 0) {
      faceUV[f] = new Vector4(0, 0, 1, 1);
    }
    if (faceColors && faceColors[f] === void 0) {
      faceColors[f] = new Color4(1, 1, 1, 1);
    }
  }
  for (let index = 0; index < nbFaces; index++) {
    uvs.push(faceUV[index].z, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - faceUV[index].w : faceUV[index].w);
    uvs.push(faceUV[index].x, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - faceUV[index].w : faceUV[index].w);
    uvs.push(faceUV[index].x, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - faceUV[index].y : faceUV[index].y);
    uvs.push(faceUV[index].z, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 - faceUV[index].y : faceUV[index].y);
    if (faceColors) {
      for (let c = 0; c < 4; c++) {
        colors.push(faceColors[index].r, faceColors[index].g, faceColors[index].b, faceColors[index].a);
      }
    }
  }
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  if (faceColors) {
    const totalColors = sideOrientation === VertexData.DOUBLESIDE ? colors.concat(colors) : colors;
    vertexData.colors = totalColors;
  }
  return vertexData;
}
function CreateSegmentedBoxVertexData(options) {
  const width = options.width || options.size || 1;
  const height = options.height || options.size || 1;
  const depth = options.depth || options.size || 1;
  const widthSegments = (options.widthSegments || options.segments || 1) | 0;
  const heightSegments = (options.heightSegments || options.segments || 1) | 0;
  const depthSegments = (options.depthSegments || options.segments || 1) | 0;
  const rotationMatrix = new Matrix();
  const translationMatrix = new Matrix();
  const transformMatrix = new Matrix();
  const bottomPlane = CreateGroundVertexData({ width, height: depth, subdivisionsX: widthSegments, subdivisionsY: depthSegments });
  Matrix.TranslationToRef(0, -height / 2, 0, translationMatrix);
  Matrix.RotationZToRef(Math.PI, rotationMatrix);
  rotationMatrix.multiplyToRef(translationMatrix, transformMatrix);
  bottomPlane.transform(transformMatrix);
  const topPlane = CreateGroundVertexData({ width, height: depth, subdivisionsX: widthSegments, subdivisionsY: depthSegments });
  Matrix.TranslationToRef(0, height / 2, 0, transformMatrix);
  topPlane.transform(transformMatrix);
  const negXPlane = CreateGroundVertexData({ width: height, height: depth, subdivisionsX: heightSegments, subdivisionsY: depthSegments });
  Matrix.TranslationToRef(-width / 2, 0, 0, translationMatrix);
  Matrix.RotationZToRef(Math.PI / 2, rotationMatrix);
  rotationMatrix.multiplyToRef(translationMatrix, transformMatrix);
  negXPlane.transform(transformMatrix);
  const posXPlane = CreateGroundVertexData({ width: height, height: depth, subdivisionsX: heightSegments, subdivisionsY: depthSegments });
  Matrix.TranslationToRef(width / 2, 0, 0, translationMatrix);
  Matrix.RotationZToRef(-Math.PI / 2, rotationMatrix);
  rotationMatrix.multiplyToRef(translationMatrix, transformMatrix);
  posXPlane.transform(transformMatrix);
  const negZPlane = CreateGroundVertexData({ width, height, subdivisionsX: widthSegments, subdivisionsY: heightSegments });
  Matrix.TranslationToRef(0, 0, -depth / 2, translationMatrix);
  Matrix.RotationXToRef(-Math.PI / 2, rotationMatrix);
  rotationMatrix.multiplyToRef(translationMatrix, transformMatrix);
  negZPlane.transform(transformMatrix);
  const posZPlane = CreateGroundVertexData({ width, height, subdivisionsX: widthSegments, subdivisionsY: heightSegments });
  Matrix.TranslationToRef(0, 0, depth / 2, translationMatrix);
  Matrix.RotationXToRef(Math.PI / 2, rotationMatrix);
  rotationMatrix.multiplyToRef(translationMatrix, transformMatrix);
  posZPlane.transform(transformMatrix);
  bottomPlane.merge([topPlane, posXPlane, negXPlane, negZPlane, posZPlane], true);
  return bottomPlane;
}
function CreateBox(name3, options = {}, scene = null) {
  const box = new Mesh(name3, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  box._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreateBoxVertexData(options);
  vertexData.applyToMesh(box, options.updatable);
  return box;
}
var BoxBuilder = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CreateBox
};
VertexData.CreateBox = CreateBoxVertexData;
Mesh.CreateBox = (name3, size, scene = null, updatable, sideOrientation) => {
  const options = {
    size,
    sideOrientation,
    updatable
  };
  return CreateBox(name3, options, scene);
};

// node_modules/@babylonjs/core/Behaviors/Meshes/handConstraintBehavior.js
var HandConstraintZone;
(function(HandConstraintZone2) {
  HandConstraintZone2[HandConstraintZone2["ABOVE_FINGER_TIPS"] = 0] = "ABOVE_FINGER_TIPS";
  HandConstraintZone2[HandConstraintZone2["RADIAL_SIDE"] = 1] = "RADIAL_SIDE";
  HandConstraintZone2[HandConstraintZone2["ULNAR_SIDE"] = 2] = "ULNAR_SIDE";
  HandConstraintZone2[HandConstraintZone2["BELOW_WRIST"] = 3] = "BELOW_WRIST";
})(HandConstraintZone || (HandConstraintZone = {}));
var HandConstraintOrientation;
(function(HandConstraintOrientation2) {
  HandConstraintOrientation2[HandConstraintOrientation2["LOOK_AT_CAMERA"] = 0] = "LOOK_AT_CAMERA";
  HandConstraintOrientation2[HandConstraintOrientation2["HAND_ROTATION"] = 1] = "HAND_ROTATION";
})(HandConstraintOrientation || (HandConstraintOrientation = {}));
var HandConstraintVisibility;
(function(HandConstraintVisibility2) {
  HandConstraintVisibility2[HandConstraintVisibility2["ALWAYS_VISIBLE"] = 0] = "ALWAYS_VISIBLE";
  HandConstraintVisibility2[HandConstraintVisibility2["PALM_UP"] = 1] = "PALM_UP";
  HandConstraintVisibility2[HandConstraintVisibility2["GAZE_FOCUS"] = 2] = "GAZE_FOCUS";
  HandConstraintVisibility2[HandConstraintVisibility2["PALM_AND_GAZE"] = 3] = "PALM_AND_GAZE";
})(HandConstraintVisibility || (HandConstraintVisibility = {}));
var HandConstraintBehavior = class {
  /**
   * Builds a hand constraint behavior
   */
  constructor() {
    this._sceneRenderObserver = null;
    this._zoneAxis = {};
    this.handConstraintVisibility = HandConstraintVisibility.PALM_AND_GAZE;
    this.palmUpStrictness = 0.95;
    this.gazeProximityRadius = 0.15;
    this.targetOffset = 0.1;
    this.targetZone = HandConstraintZone.ULNAR_SIDE;
    this.zoneOrientationMode = HandConstraintOrientation.HAND_ROTATION;
    this.nodeOrientationMode = HandConstraintOrientation.HAND_ROTATION;
    this.handedness = "none";
    this.lerpTime = 100;
    this._zoneAxis[HandConstraintZone.ABOVE_FINGER_TIPS] = new Vector3(0, 1, 0);
    this._zoneAxis[HandConstraintZone.RADIAL_SIDE] = new Vector3(-1, 0, 0);
    this._zoneAxis[HandConstraintZone.ULNAR_SIDE] = new Vector3(1, 0, 0);
    this._zoneAxis[HandConstraintZone.BELOW_WRIST] = new Vector3(0, -1, 0);
  }
  /** gets or sets behavior's name */
  get name() {
    return "HandConstraint";
  }
  /** Enable the behavior */
  enable() {
    this._node.setEnabled(true);
  }
  /** Disable the behavior */
  disable() {
    this._node.setEnabled(false);
  }
  _getHandPose() {
    if (!this._handTracking) {
      return null;
    }
    let hand;
    if (this.handedness === "none") {
      hand = this._handTracking.getHandByHandedness("left") || this._handTracking.getHandByHandedness("right");
    } else {
      hand = this._handTracking.getHandByHandedness(this.handedness);
    }
    if (hand) {
      const pinkyMetacarpal = hand.getJointMesh(WebXRHandJoint.PINKY_FINGER_METACARPAL);
      const middleMetacarpal = hand.getJointMesh(WebXRHandJoint.MIDDLE_FINGER_METACARPAL);
      const wrist = hand.getJointMesh(WebXRHandJoint.WRIST);
      if (wrist && middleMetacarpal && pinkyMetacarpal) {
        const handPose = { position: middleMetacarpal.absolutePosition, quaternion: new Quaternion(), id: hand.xrController.uniqueId };
        const up = TmpVectors.Vector3[0];
        const forward = TmpVectors.Vector3[1];
        const left = TmpVectors.Vector3[2];
        up.copyFrom(middleMetacarpal.absolutePosition).subtractInPlace(wrist.absolutePosition).normalize();
        forward.copyFrom(pinkyMetacarpal.absolutePosition).subtractInPlace(middleMetacarpal.absolutePosition).normalize();
        Vector3.CrossToRef(up, forward, forward);
        Vector3.CrossToRef(forward, up, left);
        Quaternion.FromLookDirectionLHToRef(forward, up, handPose.quaternion);
        return handPose;
      }
    }
    return null;
  }
  /**
   * Initializes the hand constraint behavior
   */
  init() {
  }
  /**
   * Attaches the hand constraint to a `TransformNode`
   * @param node defines the node to attach the behavior to
   */
  attach(node) {
    this._node = node;
    this._scene = node.getScene();
    if (!this._node.rotationQuaternion) {
      this._node.rotationQuaternion = Quaternion.RotationYawPitchRoll(this._node.rotation.y, this._node.rotation.x, this._node.rotation.z);
    }
    let lastTick = Date.now();
    this._sceneRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
      const pose = this._getHandPose();
      this._node.reservedDataStore = this._node.reservedDataStore || {};
      this._node.reservedDataStore.nearInteraction = this._node.reservedDataStore.nearInteraction || {};
      this._node.reservedDataStore.nearInteraction.excludedControllerId = null;
      if (pose) {
        const zoneOffset = TmpVectors.Vector3[0];
        const camera = this._scene.activeCamera;
        zoneOffset.copyFrom(this._zoneAxis[this.targetZone]);
        const cameraLookAtQuaternion = TmpVectors.Quaternion[0];
        if (camera && (this.zoneOrientationMode === HandConstraintOrientation.LOOK_AT_CAMERA || this.nodeOrientationMode === HandConstraintOrientation.LOOK_AT_CAMERA)) {
          const toCamera = TmpVectors.Vector3[1];
          toCamera.copyFrom(camera.position).subtractInPlace(pose.position).normalize();
          if (this._scene.useRightHandedSystem) {
            Quaternion.FromLookDirectionRHToRef(toCamera, Vector3.UpReadOnly, cameraLookAtQuaternion);
          } else {
            Quaternion.FromLookDirectionLHToRef(toCamera, Vector3.UpReadOnly, cameraLookAtQuaternion);
          }
        }
        if (this.zoneOrientationMode === HandConstraintOrientation.HAND_ROTATION) {
          pose.quaternion.toRotationMatrix(TmpVectors.Matrix[0]);
        } else {
          cameraLookAtQuaternion.toRotationMatrix(TmpVectors.Matrix[0]);
        }
        Vector3.TransformNormalToRef(zoneOffset, TmpVectors.Matrix[0], zoneOffset);
        zoneOffset.scaleInPlace(this.targetOffset);
        const targetPosition = TmpVectors.Vector3[2];
        const targetRotation = TmpVectors.Quaternion[1];
        targetPosition.copyFrom(pose.position).addInPlace(zoneOffset);
        if (this.nodeOrientationMode === HandConstraintOrientation.HAND_ROTATION) {
          targetRotation.copyFrom(pose.quaternion);
        } else {
          targetRotation.copyFrom(cameraLookAtQuaternion);
        }
        const elapsed = Date.now() - lastTick;
        Vector3.SmoothToRef(this._node.position, targetPosition, elapsed, this.lerpTime, this._node.position);
        Quaternion.SmoothToRef(this._node.rotationQuaternion, targetRotation, elapsed, this.lerpTime, this._node.rotationQuaternion);
        this._node.reservedDataStore.nearInteraction.excludedControllerId = pose.id;
      }
      this._setVisibility(pose);
      lastTick = Date.now();
    });
  }
  _setVisibility(pose) {
    let palmVisible = true;
    let gazeVisible = true;
    const camera = this._scene.activeCamera;
    if (camera) {
      const cameraForward = camera.getForwardRay();
      if (this.handConstraintVisibility === HandConstraintVisibility.GAZE_FOCUS || this.handConstraintVisibility === HandConstraintVisibility.PALM_AND_GAZE) {
        gazeVisible = false;
        let gaze;
        if (this._eyeTracking) {
          gaze = this._eyeTracking.getEyeGaze();
        }
        gaze = gaze || cameraForward;
        const gazeToBehavior = TmpVectors.Vector3[0];
        if (pose) {
          pose.position.subtractToRef(gaze.origin, gazeToBehavior);
        } else {
          this._node.getAbsolutePosition().subtractToRef(gaze.origin, gazeToBehavior);
        }
        const projectedDistance = Vector3.Dot(gazeToBehavior, gaze.direction);
        const projectedSquared = projectedDistance * projectedDistance;
        if (projectedDistance > 0) {
          const radiusSquared = gazeToBehavior.lengthSquared() - projectedSquared;
          if (radiusSquared < this.gazeProximityRadius * this.gazeProximityRadius) {
            gazeVisible = true;
          }
        }
      }
      if (this.handConstraintVisibility === HandConstraintVisibility.PALM_UP || this.handConstraintVisibility === HandConstraintVisibility.PALM_AND_GAZE) {
        palmVisible = false;
        if (pose) {
          const palmDirection = TmpVectors.Vector3[0];
          Vector3.LeftHandedForwardReadOnly.rotateByQuaternionToRef(pose.quaternion, palmDirection);
          if (Vector3.Dot(palmDirection, cameraForward.direction) > this.palmUpStrictness * 2 - 1) {
            palmVisible = true;
          }
        }
      }
    }
    this._node.setEnabled(palmVisible && gazeVisible);
  }
  /**
   * Detaches the behavior from the `TransformNode`
   */
  detach() {
    this._scene.onBeforeRenderObservable.remove(this._sceneRenderObserver);
  }
  /**
   * Links the behavior to the XR experience in which to retrieve hand transform information.
   * @param xr xr experience
   */
  linkToXRExperience(xr) {
    const featuresManager = xr.featuresManager ? xr.featuresManager : xr;
    if (!featuresManager) {
      Tools.Error("XR features manager must be available or provided directly for the Hand Menu to work");
    } else {
      try {
        this._eyeTracking = featuresManager.getEnabledFeature(WebXRFeatureName.EYE_TRACKING);
      } catch {
      }
      try {
        this._handTracking = featuresManager.getEnabledFeature(WebXRFeatureName.HAND_TRACKING);
      } catch {
        Tools.Error("Hand tracking must be enabled for the Hand Menu to work");
      }
    }
  }
};

// node_modules/@babylonjs/core/Meshes/Builders/planeBuilder.js
function CreatePlaneVertexData(options) {
  const indices = [];
  const positions = [];
  const normals = [];
  const uvs = [];
  const width = options.width || options.size || 1;
  const height = options.height || options.size || 1;
  const sideOrientation = options.sideOrientation === 0 ? 0 : options.sideOrientation || VertexData.DEFAULTSIDE;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  positions.push(-halfWidth, -halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(0, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 : 0);
  positions.push(halfWidth, -halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(1, CompatibilityOptions.UseOpenGLOrientationForUV ? 1 : 0);
  positions.push(halfWidth, halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(1, CompatibilityOptions.UseOpenGLOrientationForUV ? 0 : 1);
  positions.push(-halfWidth, halfHeight, 0);
  normals.push(0, 0, -1);
  uvs.push(0, CompatibilityOptions.UseOpenGLOrientationForUV ? 0 : 1);
  indices.push(0);
  indices.push(1);
  indices.push(2);
  indices.push(0);
  indices.push(2);
  indices.push(3);
  VertexData._ComputeSides(sideOrientation, positions, indices, normals, uvs, options.frontUVs, options.backUVs);
  const vertexData = new VertexData();
  vertexData.indices = indices;
  vertexData.positions = positions;
  vertexData.normals = normals;
  vertexData.uvs = uvs;
  return vertexData;
}
function CreatePlane(name3, options = {}, scene = null) {
  const plane = new Mesh(name3, scene);
  options.sideOrientation = Mesh._GetDefaultSideOrientation(options.sideOrientation);
  plane._originalBuilderSideOrientation = options.sideOrientation;
  const vertexData = CreatePlaneVertexData(options);
  vertexData.applyToMesh(plane, options.updatable);
  if (options.sourcePlane) {
    plane.translate(options.sourcePlane.normal, -options.sourcePlane.d);
    plane.setDirection(options.sourcePlane.normal.scale(-1));
  }
  return plane;
}
var PlaneBuilder = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CreatePlane
};
VertexData.CreatePlane = CreatePlaneVertexData;
Mesh.CreatePlane = (name3, size, scene, updatable, sideOrientation) => {
  const options = {
    size,
    width: size,
    height: size,
    sideOrientation,
    updatable
  };
  return CreatePlane(name3, options, scene);
};

// node_modules/@babylonjs/core/Behaviors/Meshes/fadeInOutBehavior.js
var FadeInOutBehavior = class {
  /**
   * Time in milliseconds to delay before fading in (Default: 0)
   * Will set both fade in and out delay to the same value
   */
  get delay() {
    return this.fadeInDelay;
  }
  set delay(value) {
    this.fadeInDelay = value;
    this.fadeOutDelay = value;
  }
  /**
   * Instantiates the FadeInOutBehavior
   */
  constructor() {
    this.fadeInDelay = 0;
    this.fadeOutDelay = 0;
    this.fadeInTime = 300;
    this.fadeOutTime = 300;
    this._millisecondsPerFrame = 1e3 / 60;
    this._hovered = false;
    this._hoverValue = 0;
    this._ownerNode = null;
    this._delay = 0;
    this._time = 300;
    this._update = () => {
      if (this._ownerNode) {
        this._hoverValue += this._hovered ? this._millisecondsPerFrame : -this._millisecondsPerFrame;
        this._setAllVisibility(this._ownerNode, (this._hoverValue - this._delay) / this._time);
        if (this._ownerNode.visibility > 1) {
          this._setAllVisibility(this._ownerNode, 1);
          if (this._hoverValue > this._time) {
            this._hoverValue = this._time;
            this._detachObserver();
            return;
          }
        } else if (this._ownerNode.visibility < 0) {
          this._setAllVisibility(this._ownerNode, 0);
          if (this._hoverValue < 0) {
            this._hoverValue = 0;
            this._detachObserver();
            return;
          }
        }
        this._attachObserver();
      }
    };
  }
  /**
   *  The name of the behavior
   */
  get name() {
    return "FadeInOut";
  }
  /**
   *  Initializes the behavior
   */
  init() {
  }
  /**
   * Attaches the fade behavior on the passed in mesh
   * @param ownerNode The mesh that will be faded in/out once attached
   */
  attach(ownerNode) {
    this._ownerNode = ownerNode;
    this._setAllVisibility(this._ownerNode, 0);
  }
  /**
   *  Detaches the behavior from the mesh
   */
  detach() {
    this._ownerNode = null;
  }
  /**
   * Triggers the mesh to begin fading in (or out)
   * @param fadeIn if the object should fade in or out (true to fade in)
   */
  fadeIn(fadeIn = true) {
    this._delay = fadeIn ? this.fadeInDelay : this.fadeOutDelay;
    this._time = fadeIn ? this.fadeInTime : this.fadeOutTime;
    this._detachObserver();
    if (this._ownerNode && (fadeIn && this._ownerNode.visibility >= 1 || !fadeIn && this._ownerNode.visibility <= 0)) {
      return;
    }
    this._hovered = fadeIn;
    if (!this._hovered) {
      this._delay *= -1;
    }
    if (this._ownerNode.visibility >= 1) {
      this._hoverValue = this._time;
    } else if (this._ownerNode.visibility <= 0) {
      this._hoverValue = 0;
    }
    this._update();
  }
  /**
   * Triggers the mesh to begin fading out
   */
  fadeOut() {
    this.fadeIn(false);
  }
  _setAllVisibility(mesh, value) {
    mesh.visibility = value;
    mesh.getChildMeshes().forEach((c) => {
      this._setAllVisibility(c, value);
    });
  }
  _attachObserver() {
    var _a;
    if (!this._onBeforeRenderObserver) {
      this._onBeforeRenderObserver = (_a = this._ownerNode) == null ? void 0 : _a.getScene().onBeforeRenderObservable.add(this._update);
    }
  }
  _detachObserver() {
    var _a;
    if (this._onBeforeRenderObserver) {
      (_a = this._ownerNode) == null ? void 0 : _a.getScene().onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
      this._onBeforeRenderObserver = null;
    }
  }
};

// node_modules/@babylonjs/core/Behaviors/Meshes/followBehavior.js
var FollowBehavior = class {
  constructor() {
    this._tmpQuaternion = new Quaternion();
    this._tmpVectors = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
    this._tmpMatrix = new Matrix();
    this._tmpInvertView = new Matrix();
    this._tmpForward = new Vector3();
    this._tmpNodeForward = new Vector3();
    this._tmpPosition = new Vector3();
    this._workingPosition = new Vector3();
    this._workingQuaternion = new Quaternion();
    this._lastTick = -1;
    this._recenterNextUpdate = true;
    this.interpolatePose = true;
    this.lerpTime = 500;
    this.ignoreCameraPitchAndRoll = false;
    this.pitchOffset = 15;
    this.maxViewVerticalDegrees = 30;
    this.maxViewHorizontalDegrees = 30;
    this.orientToCameraDeadzoneDegrees = 60;
    this.ignoreDistanceClamp = false;
    this.ignoreAngleClamp = false;
    this.verticalMaxDistance = 0;
    this.defaultDistance = 0.8;
    this.maximumDistance = 2;
    this.minimumDistance = 0.3;
    this.useFixedVerticalOffset = false;
    this.fixedVerticalOffset = 0;
    this._enabled = true;
  }
  /**
   * The camera that should be followed by this behavior
   */
  get followedCamera() {
    return this._followedCamera || this._scene.activeCamera;
  }
  set followedCamera(camera) {
    this._followedCamera = camera;
  }
  /**
   *  The name of the behavior
   */
  get name() {
    return "Follow";
  }
  /**
   *  Initializes the behavior
   */
  init() {
  }
  /**
   * Attaches the follow behavior
   * @param ownerNode The mesh that will be following once attached
   * @param followedCamera The camera that should be followed by the node
   */
  attach(ownerNode, followedCamera) {
    this._scene = ownerNode.getScene();
    this.attachedNode = ownerNode;
    if (followedCamera) {
      this.followedCamera = followedCamera;
    }
    this._addObservables();
  }
  /**
   *  Detaches the behavior from the mesh
   */
  detach() {
    this.attachedNode = null;
    this._removeObservables();
  }
  /**
   * Recenters the attached node in front of the camera on the next update
   */
  recenter() {
    this._recenterNextUpdate = true;
  }
  _angleBetweenVectorAndPlane(vector, normal) {
    this._tmpVectors[0].copyFrom(vector);
    vector = this._tmpVectors[0];
    this._tmpVectors[1].copyFrom(normal);
    normal = this._tmpVectors[1];
    vector.normalize();
    normal.normalize();
    return Math.PI / 2 - Math.acos(Vector3.Dot(vector, normal));
  }
  _length2D(vector) {
    return Math.sqrt(vector.x * vector.x + vector.z * vector.z);
  }
  _distanceClamp(currentToTarget, moveToDefault = false) {
    let minDistance = this.minimumDistance;
    let maxDistance = this.maximumDistance;
    const defaultDistance = this.defaultDistance;
    const direction = this._tmpVectors[0];
    direction.copyFrom(currentToTarget);
    let currentDistance = direction.length();
    direction.normalizeFromLength(currentDistance);
    if (this.ignoreCameraPitchAndRoll) {
      minDistance = this._length2D(direction) * minDistance;
      maxDistance = this._length2D(direction) * maxDistance;
      const currentDistance2D = this._length2D(currentToTarget);
      direction.scaleInPlace(currentDistance / currentDistance2D);
      currentDistance = currentDistance2D;
    }
    let clampedDistance = currentDistance;
    if (moveToDefault) {
      clampedDistance = defaultDistance;
    } else {
      clampedDistance = Scalar.Clamp(currentDistance, minDistance, maxDistance);
    }
    currentToTarget.copyFrom(direction).scaleInPlace(clampedDistance);
    return currentDistance !== clampedDistance;
  }
  _applyVerticalClamp(currentToTarget) {
    if (this.verticalMaxDistance !== 0) {
      currentToTarget.y = Scalar.Clamp(currentToTarget.y, -this.verticalMaxDistance, this.verticalMaxDistance);
    }
  }
  _toOrientationQuatToRef(vector, quaternion) {
    Quaternion.RotationYawPitchRollToRef(Math.atan2(vector.x, vector.z), Math.atan2(vector.y, Math.sqrt(vector.z * vector.z + vector.x * vector.x)), 0, quaternion);
  }
  _applyPitchOffset(invertView) {
    const forward = this._tmpVectors[0];
    const right = this._tmpVectors[1];
    forward.copyFromFloats(0, 0, this._scene.useRightHandedSystem ? -1 : 1);
    right.copyFromFloats(1, 0, 0);
    Vector3.TransformNormalToRef(forward, invertView, forward);
    forward.y = 0;
    forward.normalize();
    Vector3.TransformNormalToRef(right, invertView, right);
    Quaternion.RotationAxisToRef(right, this.pitchOffset * Math.PI / 180, this._tmpQuaternion);
    forward.rotateByQuaternionToRef(this._tmpQuaternion, forward);
    this._toOrientationQuatToRef(forward, this._tmpQuaternion);
    this._tmpQuaternion.toRotationMatrix(this._tmpMatrix);
    invertView.copyFrom(this._tmpMatrix);
  }
  _angularClamp(invertView, currentToTarget) {
    const forward = this._tmpVectors[5];
    forward.copyFromFloats(0, 0, this._scene.useRightHandedSystem ? -1 : 1);
    const right = this._tmpVectors[6];
    right.copyFromFloats(1, 0, 0);
    Vector3.TransformNormalToRef(forward, invertView, forward);
    Vector3.TransformNormalToRef(right, invertView, right);
    const up = Vector3.UpReadOnly;
    const dist = currentToTarget.length();
    if (dist < Epsilon) {
      return false;
    }
    let angularClamped = false;
    const rotationQuat = this._tmpQuaternion;
    if (this.ignoreCameraPitchAndRoll) {
      const angle2 = Vector3.GetAngleBetweenVectorsOnPlane(currentToTarget, forward, right);
      Quaternion.RotationAxisToRef(right, angle2, rotationQuat);
      currentToTarget.rotateByQuaternionToRef(rotationQuat, currentToTarget);
    } else {
      const angle2 = -Vector3.GetAngleBetweenVectorsOnPlane(currentToTarget, forward, right);
      const minMaxAngle2 = this.maxViewVerticalDegrees * Math.PI / 180 * 0.5;
      if (angle2 < -minMaxAngle2) {
        Quaternion.RotationAxisToRef(right, -angle2 - minMaxAngle2, rotationQuat);
        currentToTarget.rotateByQuaternionToRef(rotationQuat, currentToTarget);
        angularClamped = true;
      } else if (angle2 > minMaxAngle2) {
        Quaternion.RotationAxisToRef(right, -angle2 + minMaxAngle2, rotationQuat);
        currentToTarget.rotateByQuaternionToRef(rotationQuat, currentToTarget);
        angularClamped = true;
      }
    }
    const angle = this._angleBetweenVectorAndPlane(currentToTarget, right) * (this._scene.useRightHandedSystem ? -1 : 1);
    const minMaxAngle = this.maxViewHorizontalDegrees * Math.PI / 180 * 0.5;
    if (angle < -minMaxAngle) {
      Quaternion.RotationAxisToRef(up, -angle - minMaxAngle, rotationQuat);
      currentToTarget.rotateByQuaternionToRef(rotationQuat, currentToTarget);
      angularClamped = true;
    } else if (angle > minMaxAngle) {
      Quaternion.RotationAxisToRef(up, -angle + minMaxAngle, rotationQuat);
      currentToTarget.rotateByQuaternionToRef(rotationQuat, currentToTarget);
      angularClamped = true;
    }
    return angularClamped;
  }
  _orientationClamp(currentToTarget, rotationQuaternion) {
    var _a;
    const toFollowed = this._tmpVectors[0];
    toFollowed.copyFrom(currentToTarget).scaleInPlace(-1).normalize();
    const up = this._tmpVectors[1];
    const right = this._tmpVectors[2];
    up.copyFromFloats(0, 1, 0);
    Vector3.CrossToRef(toFollowed, up, right);
    const length = right.length();
    if (length < Epsilon) {
      return;
    }
    right.normalizeFromLength(length);
    Vector3.CrossToRef(right, toFollowed, up);
    if ((_a = this.attachedNode) == null ? void 0 : _a.getScene().useRightHandedSystem) {
      Quaternion.FromLookDirectionRHToRef(toFollowed, up, rotationQuaternion);
    } else {
      Quaternion.FromLookDirectionLHToRef(toFollowed, up, rotationQuaternion);
    }
  }
  _passedOrientationDeadzone(currentToTarget, forward) {
    const leashToFollow = this._tmpVectors[5];
    leashToFollow.copyFrom(currentToTarget);
    leashToFollow.normalize();
    const angle = Math.abs(Vector3.GetAngleBetweenVectorsOnPlane(forward, leashToFollow, Vector3.UpReadOnly));
    return angle * 180 / Math.PI > this.orientToCameraDeadzoneDegrees;
  }
  _updateLeashing(camera) {
    if (this.attachedNode && this._enabled) {
      const oldParent = this.attachedNode.parent;
      this.attachedNode.setParent(null);
      const worldMatrix = this.attachedNode.getWorldMatrix();
      const currentToTarget = this._workingPosition;
      const rotationQuaternion = this._workingQuaternion;
      const pivot = this.attachedNode.getPivotPoint();
      const invertView = this._tmpInvertView;
      invertView.copyFrom(camera.getViewMatrix());
      invertView.invert();
      Vector3.TransformCoordinatesToRef(pivot, worldMatrix, currentToTarget);
      const position = this._tmpPosition;
      position.copyFromFloats(0, 0, 0);
      Vector3.TransformCoordinatesToRef(position, worldMatrix, position);
      position.scaleInPlace(-1).subtractInPlace(pivot);
      currentToTarget.subtractInPlace(camera.globalPosition);
      if (this.ignoreCameraPitchAndRoll) {
        this._applyPitchOffset(invertView);
      }
      let angularClamped = false;
      const forward = this._tmpForward;
      forward.copyFromFloats(0, 0, this._scene.useRightHandedSystem ? -1 : 1);
      Vector3.TransformNormalToRef(forward, invertView, forward);
      const nodeForward = this._tmpNodeForward;
      nodeForward.copyFromFloats(0, 0, this._scene.useRightHandedSystem ? -1 : 1);
      Vector3.TransformNormalToRef(nodeForward, worldMatrix, nodeForward);
      if (this._recenterNextUpdate) {
        currentToTarget.copyFrom(forward).scaleInPlace(this.defaultDistance);
      } else {
        if (this.ignoreAngleClamp) {
          const currentDistance = currentToTarget.length();
          currentToTarget.copyFrom(forward).scaleInPlace(currentDistance);
        } else {
          angularClamped = this._angularClamp(invertView, currentToTarget);
        }
      }
      let distanceClamped = false;
      if (!this.ignoreDistanceClamp) {
        distanceClamped = this._distanceClamp(currentToTarget, angularClamped);
        this._applyVerticalClamp(currentToTarget);
      }
      if (this.useFixedVerticalOffset) {
        currentToTarget.y = position.y - camera.globalPosition.y + this.fixedVerticalOffset;
      }
      if (angularClamped || distanceClamped || this._passedOrientationDeadzone(currentToTarget, nodeForward) || this._recenterNextUpdate) {
        this._orientationClamp(currentToTarget, rotationQuaternion);
      }
      this._workingPosition.subtractInPlace(pivot);
      this._recenterNextUpdate = false;
      this.attachedNode.setParent(oldParent);
    }
  }
  _updateTransformToGoal(elapsed) {
    if (!this.attachedNode || !this.followedCamera || !this._enabled) {
      return;
    }
    if (!this.attachedNode.rotationQuaternion) {
      this.attachedNode.rotationQuaternion = Quaternion.Identity();
    }
    const oldParent = this.attachedNode.parent;
    this.attachedNode.setParent(null);
    if (!this.interpolatePose) {
      this.attachedNode.position.copyFrom(this.followedCamera.globalPosition).addInPlace(this._workingPosition);
      this.attachedNode.rotationQuaternion.copyFrom(this._workingQuaternion);
      return;
    }
    const currentDirection = new Vector3();
    currentDirection.copyFrom(this.attachedNode.position).subtractInPlace(this.followedCamera.globalPosition);
    Vector3.SmoothToRef(currentDirection, this._workingPosition, elapsed, this.lerpTime, currentDirection);
    currentDirection.addInPlace(this.followedCamera.globalPosition);
    this.attachedNode.position.copyFrom(currentDirection);
    const currentRotation = new Quaternion();
    currentRotation.copyFrom(this.attachedNode.rotationQuaternion);
    Quaternion.SmoothToRef(currentRotation, this._workingQuaternion, elapsed, this.lerpTime, this.attachedNode.rotationQuaternion);
    this.attachedNode.setParent(oldParent);
  }
  _addObservables() {
    this._lastTick = Date.now();
    this._onBeforeRender = this._scene.onBeforeRenderObservable.add(() => {
      if (!this.followedCamera) {
        return;
      }
      const tick = Date.now();
      this._updateLeashing(this.followedCamera);
      this._updateTransformToGoal(tick - this._lastTick);
      this._lastTick = tick;
    });
  }
  _removeObservables() {
    if (this._onBeforeRender) {
      this._scene.onBeforeRenderObservable.remove(this._onBeforeRender);
    }
  }
};

// node_modules/@babylonjs/core/Behaviors/Meshes/baseSixDofDragBehavior.js
var BaseSixDofDragBehavior = class _BaseSixDofDragBehavior {
  constructor() {
    this._attachedToElement = false;
    this._virtualMeshesInfo = {};
    this._tmpVector = new Vector3();
    this._tmpQuaternion = new Quaternion();
    this._dragType = {
      NONE: 0,
      DRAG: 1,
      DRAG_WITH_CONTROLLER: 2,
      NEAR_DRAG: 3
    };
    this._moving = false;
    this._dragging = this._dragType.NONE;
    this.draggableMeshes = null;
    this.zDragFactor = 3;
    this.currentDraggingPointerIds = [];
    this.detachCameraControls = true;
    this.onDragStartObservable = new Observable();
    this.onDragObservable = new Observable();
    this.onDragEndObservable = new Observable();
    this.allowMultiPointer = true;
  }
  /**
   * The id of the pointer that is currently interacting with the behavior (-1 when no pointer is active)
   */
  get currentDraggingPointerId() {
    if (this.currentDraggingPointerIds[0] !== void 0) {
      return this.currentDraggingPointerIds[0];
    }
    return -1;
  }
  set currentDraggingPointerId(value) {
    this.currentDraggingPointerIds[0] = value;
  }
  /**
   * Get or set the currentDraggingPointerId
   * @deprecated Please use currentDraggingPointerId instead
   */
  get currentDraggingPointerID() {
    return this.currentDraggingPointerId;
  }
  set currentDraggingPointerID(currentDraggingPointerID) {
    this.currentDraggingPointerId = currentDraggingPointerID;
  }
  /**
   *  The name of the behavior
   */
  get name() {
    return "BaseSixDofDrag";
  }
  /**
   *  Returns true if the attached mesh is currently moving with this behavior
   */
  get isMoving() {
    return this._moving;
  }
  /**
   *  Initializes the behavior
   */
  init() {
  }
  /**
   * In the case of multiple active cameras, the cameraToUseForPointers should be used if set instead of active camera
   */
  get _pointerCamera() {
    if (this._scene.cameraToUseForPointers) {
      return this._scene.cameraToUseForPointers;
    } else {
      return this._scene.activeCamera;
    }
  }
  _createVirtualMeshInfo() {
    const dragMesh = new AbstractMesh("", _BaseSixDofDragBehavior._virtualScene);
    dragMesh.rotationQuaternion = new Quaternion();
    const originMesh = new AbstractMesh("", _BaseSixDofDragBehavior._virtualScene);
    originMesh.rotationQuaternion = new Quaternion();
    const pivotMesh = new AbstractMesh("", _BaseSixDofDragBehavior._virtualScene);
    pivotMesh.rotationQuaternion = new Quaternion();
    return {
      dragging: false,
      moving: false,
      dragMesh,
      originMesh,
      pivotMesh,
      startingPivotPosition: new Vector3(),
      startingPivotOrientation: new Quaternion(),
      startingPosition: new Vector3(),
      startingOrientation: new Quaternion(),
      lastOriginPosition: new Vector3(),
      lastDragPosition: new Vector3()
    };
  }
  _resetVirtualMeshesPosition() {
    for (let i = 0; i < this.currentDraggingPointerIds.length; i++) {
      this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].pivotMesh.position.copyFrom(this._ownerNode.getAbsolutePivotPoint());
      this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].pivotMesh.rotationQuaternion.copyFrom(this._ownerNode.rotationQuaternion);
      this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].startingPivotPosition.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].pivotMesh.position);
      this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].startingPivotOrientation.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].pivotMesh.rotationQuaternion);
      this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].startingPosition.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].dragMesh.position);
      this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].startingOrientation.copyFrom(this._virtualMeshesInfo[this.currentDraggingPointerIds[i]].dragMesh.rotationQuaternion);
    }
  }
  _pointerUpdate2D(ray, pointerId, zDragFactor) {
    if (this._pointerCamera && this._pointerCamera.cameraRigMode == Camera.RIG_MODE_NONE && !this._pointerCamera._isLeftCamera && !this._pointerCamera._isRightCamera) {
      ray.origin.copyFrom(this._pointerCamera.globalPosition);
      zDragFactor = 0;
    }
    const virtualMeshesInfo = this._virtualMeshesInfo[pointerId];
    const originDragDifference = TmpVectors.Vector3[0];
    ray.origin.subtractToRef(virtualMeshesInfo.lastOriginPosition, originDragDifference);
    virtualMeshesInfo.lastOriginPosition.copyFrom(ray.origin);
    const localOriginDragDifference = -Vector3.Dot(originDragDifference, ray.direction);
    virtualMeshesInfo.originMesh.addChild(virtualMeshesInfo.dragMesh);
    virtualMeshesInfo.originMesh.addChild(virtualMeshesInfo.pivotMesh);
    this._applyZOffset(virtualMeshesInfo.dragMesh, localOriginDragDifference, zDragFactor);
    this._applyZOffset(virtualMeshesInfo.pivotMesh, localOriginDragDifference, zDragFactor);
    virtualMeshesInfo.originMesh.position.copyFrom(ray.origin);
    const lookAt = TmpVectors.Vector3[0];
    ray.origin.addToRef(ray.direction, lookAt);
    virtualMeshesInfo.originMesh.lookAt(lookAt);
    virtualMeshesInfo.originMesh.removeChild(virtualMeshesInfo.dragMesh);
    virtualMeshesInfo.originMesh.removeChild(virtualMeshesInfo.pivotMesh);
  }
  _pointerUpdateXR(controllerAimTransform, controllerGripTransform, pointerId, zDragFactor) {
    const virtualMeshesInfo = this._virtualMeshesInfo[pointerId];
    virtualMeshesInfo.originMesh.position.copyFrom(controllerAimTransform.position);
    if (this._dragging === this._dragType.NEAR_DRAG && controllerGripTransform) {
      virtualMeshesInfo.originMesh.rotationQuaternion.copyFrom(controllerGripTransform.rotationQuaternion);
    } else {
      virtualMeshesInfo.originMesh.rotationQuaternion.copyFrom(controllerAimTransform.rotationQuaternion);
    }
    virtualMeshesInfo.pivotMesh.computeWorldMatrix(true);
    virtualMeshesInfo.dragMesh.computeWorldMatrix(true);
    if (zDragFactor !== 0) {
      const cameraForwardVec = TmpVectors.Vector3[0];
      const originDragDirection = TmpVectors.Vector3[1];
      cameraForwardVec.copyFrom(this._pointerCamera.getForwardRay().direction);
      virtualMeshesInfo.originMesh.position.subtractToRef(virtualMeshesInfo.lastOriginPosition, originDragDirection);
      virtualMeshesInfo.lastOriginPosition.copyFrom(virtualMeshesInfo.originMesh.position);
      const controllerDragDistance = originDragDirection.length();
      originDragDirection.normalize();
      const cameraToDrag = TmpVectors.Vector3[2];
      const controllerToDrag = TmpVectors.Vector3[3];
      virtualMeshesInfo.dragMesh.absolutePosition.subtractToRef(this._pointerCamera.globalPosition, cameraToDrag);
      virtualMeshesInfo.dragMesh.absolutePosition.subtractToRef(virtualMeshesInfo.originMesh.position, controllerToDrag);
      const controllerToDragDistance = controllerToDrag.length();
      cameraToDrag.normalize();
      controllerToDrag.normalize();
      const controllerDragScaling = Math.abs(Vector3.Dot(originDragDirection, controllerToDrag)) * Vector3.Dot(originDragDirection, cameraForwardVec);
      let zOffsetScaling = controllerDragScaling * zDragFactor * controllerDragDistance * controllerToDragDistance;
      const minDistanceFromControllerToDragMesh = 0.01;
      if (zOffsetScaling < 0 && minDistanceFromControllerToDragMesh - controllerToDragDistance > zOffsetScaling) {
        zOffsetScaling = Math.min(minDistanceFromControllerToDragMesh - controllerToDragDistance, 0);
      }
      controllerToDrag.scaleInPlace(zOffsetScaling);
      controllerToDrag.addToRef(virtualMeshesInfo.pivotMesh.absolutePosition, this._tmpVector);
      virtualMeshesInfo.pivotMesh.setAbsolutePosition(this._tmpVector);
      controllerToDrag.addToRef(virtualMeshesInfo.dragMesh.absolutePosition, this._tmpVector);
      virtualMeshesInfo.dragMesh.setAbsolutePosition(this._tmpVector);
    }
  }
  /**
   * Attaches the scale behavior the passed in mesh
   * @param ownerNode The mesh that will be scaled around once attached
   */
  attach(ownerNode) {
    this._ownerNode = ownerNode;
    this._scene = this._ownerNode.getScene();
    if (!_BaseSixDofDragBehavior._virtualScene) {
      _BaseSixDofDragBehavior._virtualScene = new Scene(this._scene.getEngine(), { virtual: true });
      _BaseSixDofDragBehavior._virtualScene.detachControl();
    }
    const pickPredicate = (m) => {
      return this._ownerNode === m || m.isDescendantOf(this._ownerNode) && (!this.draggableMeshes || this.draggableMeshes.indexOf(m) !== -1);
    };
    this._pointerObserver = this._scene.onPointerObservable.add((pointerInfo) => {
      const pointerId = pointerInfo.event.pointerId;
      if (!this._virtualMeshesInfo[pointerId]) {
        this._virtualMeshesInfo[pointerId] = this._createVirtualMeshInfo();
      }
      const virtualMeshesInfo = this._virtualMeshesInfo[pointerId];
      const isXRNearPointer = pointerInfo.event.pointerType === "xr-near";
      if (pointerInfo.type == PointerEventTypes.POINTERDOWN) {
        if (!virtualMeshesInfo.dragging && pointerInfo.pickInfo && pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh && pointerInfo.pickInfo.pickedPoint && pointerInfo.pickInfo.ray && (!isXRNearPointer || pointerInfo.pickInfo.aimTransform) && pickPredicate(pointerInfo.pickInfo.pickedMesh)) {
          if (!this.allowMultiPointer && this.currentDraggingPointerIds.length > 0) {
            return;
          }
          if (this._pointerCamera && this._pointerCamera.cameraRigMode === Camera.RIG_MODE_NONE && !this._pointerCamera._isLeftCamera && !this._pointerCamera._isRightCamera) {
            pointerInfo.pickInfo.ray.origin.copyFrom(this._pointerCamera.globalPosition);
          }
          this._ownerNode.computeWorldMatrix(true);
          const virtualMeshesInfo2 = this._virtualMeshesInfo[pointerId];
          if (isXRNearPointer) {
            this._dragging = pointerInfo.pickInfo.originMesh ? this._dragType.NEAR_DRAG : this._dragType.DRAG_WITH_CONTROLLER;
            virtualMeshesInfo2.originMesh.position.copyFrom(pointerInfo.pickInfo.aimTransform.position);
            if (this._dragging === this._dragType.NEAR_DRAG && pointerInfo.pickInfo.gripTransform) {
              virtualMeshesInfo2.originMesh.rotationQuaternion.copyFrom(pointerInfo.pickInfo.gripTransform.rotationQuaternion);
            } else {
              virtualMeshesInfo2.originMesh.rotationQuaternion.copyFrom(pointerInfo.pickInfo.aimTransform.rotationQuaternion);
            }
          } else {
            this._dragging = this._dragType.DRAG;
            virtualMeshesInfo2.originMesh.position.copyFrom(pointerInfo.pickInfo.ray.origin);
          }
          virtualMeshesInfo2.lastOriginPosition.copyFrom(virtualMeshesInfo2.originMesh.position);
          virtualMeshesInfo2.dragMesh.position.copyFrom(pointerInfo.pickInfo.pickedPoint);
          virtualMeshesInfo2.lastDragPosition.copyFrom(pointerInfo.pickInfo.pickedPoint);
          virtualMeshesInfo2.pivotMesh.position.copyFrom(this._ownerNode.getAbsolutePivotPoint());
          virtualMeshesInfo2.pivotMesh.rotationQuaternion.copyFrom(this._ownerNode.absoluteRotationQuaternion);
          virtualMeshesInfo2.startingPosition.copyFrom(virtualMeshesInfo2.dragMesh.position);
          virtualMeshesInfo2.startingPivotPosition.copyFrom(virtualMeshesInfo2.pivotMesh.position);
          virtualMeshesInfo2.startingOrientation.copyFrom(virtualMeshesInfo2.dragMesh.rotationQuaternion);
          virtualMeshesInfo2.startingPivotOrientation.copyFrom(virtualMeshesInfo2.pivotMesh.rotationQuaternion);
          if (isXRNearPointer) {
            virtualMeshesInfo2.originMesh.addChild(virtualMeshesInfo2.dragMesh);
            virtualMeshesInfo2.originMesh.addChild(virtualMeshesInfo2.pivotMesh);
          } else {
            virtualMeshesInfo2.originMesh.lookAt(virtualMeshesInfo2.dragMesh.position);
          }
          virtualMeshesInfo2.dragging = true;
          if (this.currentDraggingPointerIds.indexOf(pointerId) === -1) {
            this.currentDraggingPointerIds.push(pointerId);
          }
          if (this.detachCameraControls && this._pointerCamera && !this._pointerCamera.leftCamera) {
            if (this._pointerCamera.inputs && this._pointerCamera.inputs.attachedToElement) {
              this._pointerCamera.detachControl();
              this._attachedToElement = true;
            } else if (!this.allowMultiPointer || this.currentDraggingPointerIds.length === 0) {
              this._attachedToElement = false;
            }
          }
          this._targetDragStart(virtualMeshesInfo2.pivotMesh.position, virtualMeshesInfo2.pivotMesh.rotationQuaternion, pointerId);
          this.onDragStartObservable.notifyObservers({ position: virtualMeshesInfo2.pivotMesh.position });
        }
      } else if (pointerInfo.type == PointerEventTypes.POINTERUP || pointerInfo.type == PointerEventTypes.POINTERDOUBLETAP) {
        const registeredPointerIndex = this.currentDraggingPointerIds.indexOf(pointerId);
        virtualMeshesInfo.dragging = false;
        if (registeredPointerIndex !== -1) {
          this.currentDraggingPointerIds.splice(registeredPointerIndex, 1);
          if (this.currentDraggingPointerIds.length === 0) {
            this._moving = false;
            this._dragging = this._dragType.NONE;
            if (this.detachCameraControls && this._attachedToElement && this._pointerCamera && !this._pointerCamera.leftCamera) {
              this._reattachCameraControls();
              this._attachedToElement = false;
            }
          }
          virtualMeshesInfo.originMesh.removeChild(virtualMeshesInfo.dragMesh);
          virtualMeshesInfo.originMesh.removeChild(virtualMeshesInfo.pivotMesh);
          this._targetDragEnd(pointerId);
          this.onDragEndObservable.notifyObservers({});
        }
      } else if (pointerInfo.type == PointerEventTypes.POINTERMOVE) {
        const registeredPointerIndex = this.currentDraggingPointerIds.indexOf(pointerId);
        if (registeredPointerIndex !== -1 && virtualMeshesInfo.dragging && pointerInfo.pickInfo && (pointerInfo.pickInfo.ray || pointerInfo.pickInfo.aimTransform)) {
          let zDragFactor = this.zDragFactor;
          if (this.currentDraggingPointerIds.length > 1 || pointerInfo.pickInfo.originMesh) {
            zDragFactor = 0;
          }
          this._ownerNode.computeWorldMatrix(true);
          if (!isXRNearPointer) {
            this._pointerUpdate2D(pointerInfo.pickInfo.ray, pointerId, zDragFactor);
          } else {
            this._pointerUpdateXR(pointerInfo.pickInfo.aimTransform, pointerInfo.pickInfo.gripTransform, pointerId, zDragFactor);
          }
          this._tmpQuaternion.copyFrom(virtualMeshesInfo.startingPivotOrientation);
          this._tmpQuaternion.x = -this._tmpQuaternion.x;
          this._tmpQuaternion.y = -this._tmpQuaternion.y;
          this._tmpQuaternion.z = -this._tmpQuaternion.z;
          virtualMeshesInfo.pivotMesh.absoluteRotationQuaternion.multiplyToRef(this._tmpQuaternion, this._tmpQuaternion);
          virtualMeshesInfo.pivotMesh.absolutePosition.subtractToRef(virtualMeshesInfo.startingPivotPosition, this._tmpVector);
          this.onDragObservable.notifyObservers({ delta: this._tmpVector, position: virtualMeshesInfo.pivotMesh.position, pickInfo: pointerInfo.pickInfo });
          this._targetDrag(this._tmpVector, this._tmpQuaternion, pointerId);
          virtualMeshesInfo.lastDragPosition.copyFrom(virtualMeshesInfo.dragMesh.absolutePosition);
          this._moving = true;
        }
      }
    });
  }
  _applyZOffset(node, localOriginDragDifference, zDragFactor) {
    node.position.z -= node.position.z < 1 ? localOriginDragDifference * zDragFactor : localOriginDragDifference * zDragFactor * node.position.z;
    if (node.position.z < 0) {
      node.position.z = 0;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _targetDragStart(worldPosition, worldRotation, pointerId) {
  }
  _targetDrag(worldDeltaPosition, worldDeltaRotation, pointerId) {
  }
  _targetDragEnd(pointerId) {
  }
  _reattachCameraControls() {
    if (this._pointerCamera) {
      if (this._pointerCamera.getClassName() === "ArcRotateCamera") {
        const arcRotateCamera = this._pointerCamera;
        arcRotateCamera.attachControl(arcRotateCamera.inputs ? arcRotateCamera.inputs.noPreventDefault : true, arcRotateCamera._useCtrlForPanning, arcRotateCamera._panningMouseButton);
      } else {
        this._pointerCamera.attachControl(this._pointerCamera.inputs ? this._pointerCamera.inputs.noPreventDefault : true);
      }
    }
  }
  /**
   * Detaches the behavior from the mesh
   */
  detach() {
    if (this._scene) {
      if (this.detachCameraControls && this._attachedToElement && this._pointerCamera && !this._pointerCamera.leftCamera) {
        this._reattachCameraControls();
        this._attachedToElement = false;
      }
      this._scene.onPointerObservable.remove(this._pointerObserver);
    }
    for (const pointerId in this._virtualMeshesInfo) {
      this._virtualMeshesInfo[pointerId].originMesh.dispose();
      this._virtualMeshesInfo[pointerId].dragMesh.dispose();
    }
    this.onDragEndObservable.clear();
    this.onDragObservable.clear();
    this.onDragStartObservable.clear();
  }
};

// node_modules/@babylonjs/core/Behaviors/Meshes/sixDofDragBehavior.js
var SixDofDragBehavior = class extends BaseSixDofDragBehavior {
  constructor() {
    super(...arguments);
    this._sceneRenderObserver = null;
    this._targetPosition = new Vector3(0, 0, 0);
    this._targetOrientation = new Quaternion();
    this._targetScaling = new Vector3(1, 1, 1);
    this._startingPosition = new Vector3(0, 0, 0);
    this._startingOrientation = new Quaternion();
    this._startingScaling = new Vector3(1, 1, 1);
    this.onPositionChangedObservable = new Observable();
    this.dragDeltaRatio = 0.2;
    this.rotateDraggedObject = true;
    this.rotateAroundYOnly = false;
    this.rotateWithMotionController = true;
    this.disableMovement = false;
    this.faceCameraOnDragStart = false;
  }
  /**
   *  The name of the behavior
   */
  get name() {
    return "SixDofDrag";
  }
  /**
   * Attaches the six DoF drag behavior
   * @param ownerNode The mesh that will be dragged around once attached
   */
  attach(ownerNode) {
    super.attach(ownerNode);
    ownerNode.isNearGrabbable = true;
    this._virtualTransformNode = new TransformNode("virtual_sixDof", BaseSixDofDragBehavior._virtualScene);
    this._virtualTransformNode.rotationQuaternion = Quaternion.Identity();
    this._sceneRenderObserver = ownerNode.getScene().onBeforeRenderObservable.add(() => {
      if (this.currentDraggingPointerIds.length === 1 && this._moving && !this.disableMovement) {
        const deltaToAdd = TmpVectors.Vector3[0];
        deltaToAdd.copyFrom(this._targetPosition).subtractInPlace(ownerNode.absolutePosition).scaleInPlace(this.dragDeltaRatio);
        const deltaToAddTransformed = TmpVectors.Vector3[1];
        deltaToAddTransformed.copyFrom(deltaToAdd);
        if (ownerNode.parent) {
          const parentRotationMatrixInverse = TmpVectors.Matrix[0];
          ownerNode.parent.absoluteRotationQuaternion.toRotationMatrix(parentRotationMatrixInverse);
          parentRotationMatrixInverse.invert();
          Vector3.TransformNormalToRef(deltaToAdd, parentRotationMatrixInverse, deltaToAddTransformed);
        }
        ownerNode.position.addInPlace(deltaToAddTransformed);
        this.onPositionChangedObservable.notifyObservers({ position: ownerNode.absolutePosition });
        if (!ownerNode.parent || ownerNode.parent.scaling && !ownerNode.parent.scaling.isNonUniformWithinEpsilon(1e-3)) {
          const rotationToApply = TmpVectors.Quaternion[0];
          rotationToApply.copyFrom(this._targetOrientation);
          if (ownerNode.parent) {
            const parentRotationInverse = TmpVectors.Quaternion[0];
            parentRotationInverse.copyFrom(ownerNode.parent.absoluteRotationQuaternion);
            parentRotationInverse.invertInPlace();
            parentRotationInverse.multiplyToRef(this._targetOrientation, rotationToApply);
          }
          Quaternion.SlerpToRef(ownerNode.rotationQuaternion, rotationToApply, this.dragDeltaRatio, ownerNode.rotationQuaternion);
        }
      }
    });
  }
  _getPositionOffsetAround(transformationLocalOrigin, scaling, rotation) {
    const translationMatrix = TmpVectors.Matrix[0];
    const translationMatrixInv = TmpVectors.Matrix[1];
    const rotationMatrix = TmpVectors.Matrix[2];
    const scaleMatrix = TmpVectors.Matrix[3];
    const finalMatrix = TmpVectors.Matrix[4];
    Matrix.TranslationToRef(transformationLocalOrigin.x, transformationLocalOrigin.y, transformationLocalOrigin.z, translationMatrix);
    Matrix.TranslationToRef(-transformationLocalOrigin.x, -transformationLocalOrigin.y, -transformationLocalOrigin.z, translationMatrixInv);
    Matrix.FromQuaternionToRef(rotation, rotationMatrix);
    Matrix.ScalingToRef(scaling, scaling, scaling, scaleMatrix);
    translationMatrixInv.multiplyToRef(rotationMatrix, finalMatrix);
    finalMatrix.multiplyToRef(scaleMatrix, finalMatrix);
    finalMatrix.multiplyToRef(translationMatrix, finalMatrix);
    return finalMatrix.getTranslation();
  }
  _onePointerPositionUpdated(worldDeltaPosition, worldDeltaRotation) {
    const pointerDelta = TmpVectors.Vector3[0];
    pointerDelta.setAll(0);
    if (this._dragging === this._dragType.DRAG) {
      if (this.rotateDraggedObject) {
        if (this.rotateAroundYOnly) {
          Quaternion.RotationYawPitchRollToRef(worldDeltaRotation.toEulerAngles().y, 0, 0, TmpVectors.Quaternion[0]);
        } else {
          TmpVectors.Quaternion[0].copyFrom(worldDeltaRotation);
        }
        TmpVectors.Quaternion[0].multiplyToRef(this._startingOrientation, this._targetOrientation);
      }
    } else if (this._dragging === this._dragType.NEAR_DRAG || this._dragging === this._dragType.DRAG_WITH_CONTROLLER && this.rotateWithMotionController) {
      worldDeltaRotation.multiplyToRef(this._startingOrientation, this._targetOrientation);
    }
    this._targetPosition.copyFrom(this._startingPosition).addInPlace(worldDeltaPosition);
  }
  _twoPointersPositionUpdated() {
    const startingPosition0 = this._virtualMeshesInfo[this.currentDraggingPointerIds[0]].startingPosition;
    const startingPosition1 = this._virtualMeshesInfo[this.currentDraggingPointerIds[1]].startingPosition;
    const startingCenter = TmpVectors.Vector3[0];
    startingPosition0.addToRef(startingPosition1, startingCenter);
    startingCenter.scaleInPlace(0.5);
    const startingVector = TmpVectors.Vector3[1];
    startingPosition1.subtractToRef(startingPosition0, startingVector);
    const currentPosition0 = this._virtualMeshesInfo[this.currentDraggingPointerIds[0]].dragMesh.absolutePosition;
    const currentPosition1 = this._virtualMeshesInfo[this.currentDraggingPointerIds[1]].dragMesh.absolutePosition;
    const currentCenter = TmpVectors.Vector3[2];
    currentPosition0.addToRef(currentPosition1, currentCenter);
    currentCenter.scaleInPlace(0.5);
    const currentVector = TmpVectors.Vector3[3];
    currentPosition1.subtractToRef(currentPosition0, currentVector);
    const scaling = currentVector.length() / startingVector.length();
    const translation = currentCenter.subtract(startingCenter);
    const rotationQuaternion = Quaternion.FromEulerAngles(0, Vector3.GetAngleBetweenVectorsOnPlane(startingVector.normalize(), currentVector.normalize(), Vector3.UpReadOnly), 0);
    const oldParent = this._ownerNode.parent;
    this._ownerNode.setParent(null);
    const positionOffset = this._getPositionOffsetAround(startingCenter.subtract(this._virtualTransformNode.getAbsolutePivotPoint()), scaling, rotationQuaternion);
    this._virtualTransformNode.rotationQuaternion.multiplyToRef(rotationQuaternion, this._ownerNode.rotationQuaternion);
    this._virtualTransformNode.scaling.scaleToRef(scaling, this._ownerNode.scaling);
    this._virtualTransformNode.position.addToRef(translation.addInPlace(positionOffset), this._ownerNode.position);
    this.onPositionChangedObservable.notifyObservers({ position: this._ownerNode.position });
    this._ownerNode.setParent(oldParent);
  }
  _targetDragStart() {
    const pointerCount = this.currentDraggingPointerIds.length;
    if (!this._ownerNode.rotationQuaternion) {
      this._ownerNode.rotationQuaternion = Quaternion.RotationYawPitchRoll(this._ownerNode.rotation.y, this._ownerNode.rotation.x, this._ownerNode.rotation.z);
    }
    const worldPivot = this._ownerNode.getAbsolutePivotPoint();
    if (pointerCount === 1) {
      this._targetPosition.copyFrom(this._ownerNode.absolutePosition);
      this._targetOrientation.copyFrom(this._ownerNode.absoluteRotationQuaternion);
      this._targetScaling.copyFrom(this._ownerNode.absoluteScaling);
      if (this.faceCameraOnDragStart && this._scene.activeCamera) {
        const toCamera = TmpVectors.Vector3[0];
        this._scene.activeCamera.position.subtractToRef(worldPivot, toCamera);
        toCamera.normalize();
        const quat = TmpVectors.Quaternion[0];
        if (this._scene.useRightHandedSystem) {
          Quaternion.FromLookDirectionRHToRef(toCamera, new Vector3(0, 1, 0), quat);
        } else {
          Quaternion.FromLookDirectionLHToRef(toCamera, new Vector3(0, 1, 0), quat);
        }
        quat.normalize();
        Quaternion.RotationYawPitchRollToRef(quat.toEulerAngles().y, 0, 0, TmpVectors.Quaternion[0]);
        this._targetOrientation.copyFrom(TmpVectors.Quaternion[0]);
      }
      this._startingPosition.copyFrom(this._targetPosition);
      this._startingOrientation.copyFrom(this._targetOrientation);
      this._startingScaling.copyFrom(this._targetScaling);
    } else if (pointerCount === 2) {
      this._virtualTransformNode.setPivotPoint(new Vector3(0, 0, 0), Space.LOCAL);
      this._virtualTransformNode.position.copyFrom(this._ownerNode.absolutePosition);
      this._virtualTransformNode.scaling.copyFrom(this._ownerNode.absoluteScaling);
      this._virtualTransformNode.rotationQuaternion.copyFrom(this._ownerNode.absoluteRotationQuaternion);
      this._virtualTransformNode.setPivotPoint(worldPivot, Space.WORLD);
      this._resetVirtualMeshesPosition();
    }
  }
  _targetDrag(worldDeltaPosition, worldDeltaRotation) {
    if (this.currentDraggingPointerIds.length === 1) {
      this._onePointerPositionUpdated(worldDeltaPosition, worldDeltaRotation);
    } else if (this.currentDraggingPointerIds.length === 2) {
      this._twoPointersPositionUpdated();
    }
  }
  _targetDragEnd() {
    if (this.currentDraggingPointerIds.length === 1) {
      this._resetVirtualMeshesPosition();
      const previousFaceCameraFlag = this.faceCameraOnDragStart;
      this.faceCameraOnDragStart = false;
      this._targetDragStart();
      this.faceCameraOnDragStart = previousFaceCameraFlag;
    }
  }
  /**
   *  Detaches the behavior from the mesh
   */
  detach() {
    super.detach();
    if (this._ownerNode) {
      this._ownerNode.isNearGrabbable = false;
      this._ownerNode.getScene().onBeforeRenderObservable.remove(this._sceneRenderObserver);
    }
    if (this._virtualTransformNode) {
      this._virtualTransformNode.dispose();
    }
  }
};

// node_modules/@babylonjs/core/Behaviors/Meshes/surfaceMagnetismBehavior.js
var SurfaceMagnetismBehavior = class {
  constructor() {
    this._attachPointLocalOffset = new Vector3();
    this._workingPosition = new Vector3();
    this._workingQuaternion = new Quaternion();
    this._lastTick = -1;
    this._hit = false;
    this.hitNormalOffset = 0.05;
    this.meshes = [];
    this.interpolatePose = true;
    this.lerpTime = 250;
    this.keepOrientationVertical = true;
    this.enabled = true;
    this.maxStickingDistance = 0.8;
  }
  /**
   * Name of the behavior
   */
  get name() {
    return "SurfaceMagnetism";
  }
  /**
   * Function called when the behavior needs to be initialized (after attaching it to a target)
   */
  init() {
  }
  /**
   * Attaches the behavior to a transform node
   * @param target defines the target where the behavior is attached to
   * @param scene the scene
   */
  attach(target, scene) {
    this._attachedMesh = target;
    this._scene = scene || target.getScene();
    if (!this._attachedMesh.rotationQuaternion) {
      this._attachedMesh.rotationQuaternion = Quaternion.RotationYawPitchRoll(this._attachedMesh.rotation.y, this._attachedMesh.rotation.x, this._attachedMesh.rotation.z);
    }
    this.updateAttachPoint();
    this._workingPosition.copyFrom(this._attachedMesh.position);
    this._workingQuaternion.copyFrom(this._attachedMesh.rotationQuaternion);
    this._addObservables();
  }
  /**
   * Detaches the behavior
   */
  detach() {
    this._attachedMesh = null;
    this._removeObservables();
  }
  _getTargetPose(pickingInfo) {
    if (!this._attachedMesh) {
      return null;
    }
    if (pickingInfo && pickingInfo.hit) {
      const pickedNormal = pickingInfo.getNormal(true, true);
      const pickedPoint = pickingInfo.pickedPoint;
      if (!pickedNormal || !pickedPoint) {
        return null;
      }
      pickedNormal.normalize();
      const worldTarget = TmpVectors.Vector3[0];
      worldTarget.copyFrom(pickedNormal);
      worldTarget.scaleInPlace(this.hitNormalOffset);
      worldTarget.addInPlace(pickedPoint);
      if (this._attachedMesh.parent) {
        TmpVectors.Matrix[0].copyFrom(this._attachedMesh.parent.getWorldMatrix()).invert();
        Vector3.TransformNormalToRef(worldTarget, TmpVectors.Matrix[0], worldTarget);
      }
      return {
        position: worldTarget,
        quaternion: Quaternion.RotationYawPitchRoll(-Math.atan2(pickedNormal.x, -pickedNormal.z), this.keepOrientationVertical ? 0 : Math.atan2(pickedNormal.y, Math.sqrt(pickedNormal.z * pickedNormal.z + pickedNormal.x * pickedNormal.x)), 0)
      };
    }
    return null;
  }
  /**
   * Updates the attach point with the current geometry extents of the attached mesh
   */
  updateAttachPoint() {
    this._getAttachPointOffsetToRef(this._attachPointLocalOffset);
  }
  /**
   * Finds the intersection point of the given ray onto the meshes and updates the target.
   * Transformation will be interpolated according to `interpolatePose` and `lerpTime` properties.
   * If no mesh of `meshes` are hit, this does nothing.
   * @param pickInfo The input pickingInfo that will be used to intersect the meshes
   * @returns a boolean indicating if we found a hit to stick to
   */
  findAndUpdateTarget(pickInfo) {
    this._hit = false;
    if (!pickInfo.ray) {
      return false;
    }
    const subPicking = pickInfo.ray.intersectsMeshes(this.meshes)[0];
    if (this._attachedMesh && subPicking && subPicking.hit && subPicking.pickedMesh) {
      const pose = this._getTargetPose(subPicking);
      if (pose && Vector3.Distance(this._attachedMesh.position, pose.position) < this.maxStickingDistance) {
        this._workingPosition.copyFrom(pose.position);
        this._workingQuaternion.copyFrom(pose.quaternion);
        this._hit = true;
      }
    }
    return this._hit;
  }
  _getAttachPointOffsetToRef(ref) {
    if (!this._attachedMesh) {
      ref.setAll(0);
      return;
    }
    const storedQuat = TmpVectors.Quaternion[0];
    storedQuat.copyFrom(this._attachedMesh.rotationQuaternion);
    this._attachedMesh.rotationQuaternion.copyFromFloats(0, 0, 0, 1);
    this._attachedMesh.computeWorldMatrix();
    const boundingMinMax = this._attachedMesh.getHierarchyBoundingVectors();
    const center = TmpVectors.Vector3[0];
    boundingMinMax.max.addToRef(boundingMinMax.min, center);
    center.scaleInPlace(0.5);
    center.z = boundingMinMax.max.z;
    const invWorld = TmpVectors.Matrix[0];
    this._attachedMesh.getWorldMatrix().invertToRef(invWorld);
    Vector3.TransformCoordinatesToRef(center, invWorld, ref);
    this._attachedMesh.rotationQuaternion.copyFrom(storedQuat);
  }
  _updateTransformToGoal(elapsed) {
    if (!this._attachedMesh || !this._hit) {
      return;
    }
    const oldParent = this._attachedMesh.parent;
    this._attachedMesh.setParent(null);
    const worldOffset = TmpVectors.Vector3[0];
    Vector3.TransformNormalToRef(this._attachPointLocalOffset, this._attachedMesh.getWorldMatrix(), worldOffset);
    if (!this.interpolatePose) {
      this._attachedMesh.position.copyFrom(this._workingPosition).subtractInPlace(worldOffset);
      this._attachedMesh.rotationQuaternion.copyFrom(this._workingQuaternion);
      return;
    }
    const interpolatedPosition = new Vector3();
    Vector3.SmoothToRef(this._attachedMesh.position, this._workingPosition, elapsed, this.lerpTime, interpolatedPosition);
    this._attachedMesh.position.copyFrom(interpolatedPosition);
    const currentRotation = new Quaternion();
    currentRotation.copyFrom(this._attachedMesh.rotationQuaternion);
    Quaternion.SmoothToRef(currentRotation, this._workingQuaternion, elapsed, this.lerpTime, this._attachedMesh.rotationQuaternion);
    this._attachedMesh.setParent(oldParent);
  }
  _addObservables() {
    this._pointerObserver = this._scene.onPointerObservable.add((pointerInfo) => {
      if (this.enabled && pointerInfo.type == PointerEventTypes.POINTERMOVE && pointerInfo.pickInfo) {
        this.findAndUpdateTarget(pointerInfo.pickInfo);
      }
    });
    this._lastTick = Date.now();
    this._onBeforeRender = this._scene.onBeforeRenderObservable.add(() => {
      const tick = Date.now();
      this._updateTransformToGoal(tick - this._lastTick);
      this._lastTick = tick;
    });
  }
  _removeObservables() {
    this._scene.onPointerObservable.remove(this._pointerObserver);
    this._scene.onBeforeRenderObservable.remove(this._onBeforeRender);
    this._pointerObserver = null;
    this._onBeforeRender = null;
  }
};

// node_modules/@babylonjs/core/Gizmos/gizmo.js
var GizmoAnchorPoint;
(function(GizmoAnchorPoint2) {
  GizmoAnchorPoint2[GizmoAnchorPoint2["Origin"] = 0] = "Origin";
  GizmoAnchorPoint2[GizmoAnchorPoint2["Pivot"] = 1] = "Pivot";
})(GizmoAnchorPoint || (GizmoAnchorPoint = {}));
var GizmoCoordinatesMode;
(function(GizmoCoordinatesMode2) {
  GizmoCoordinatesMode2[GizmoCoordinatesMode2["World"] = 0] = "World";
  GizmoCoordinatesMode2[GizmoCoordinatesMode2["Local"] = 1] = "Local";
})(GizmoCoordinatesMode || (GizmoCoordinatesMode = {}));
var Gizmo = class _Gizmo {
  /**
   * Ratio for the scale of the gizmo (Default: 1)
   */
  set scaleRatio(value) {
    this._scaleRatio = value;
  }
  get scaleRatio() {
    return this._scaleRatio;
  }
  /**
   * True when the mouse pointer is hovered a gizmo mesh
   */
  get isHovered() {
    return this._isHovered;
  }
  /**
   * Mesh that the gizmo will be attached to. (eg. on a drag gizmo the mesh that will be dragged)
   * * When set, interactions will be enabled
   */
  get attachedMesh() {
    return this._attachedMesh;
  }
  set attachedMesh(value) {
    this._attachedMesh = value;
    if (value) {
      this._attachedNode = value;
    }
    this._rootMesh.setEnabled(value ? true : false);
    this._attachedNodeChanged(value);
  }
  /**
   * Node that the gizmo will be attached to. (eg. on a drag gizmo the mesh, bone or NodeTransform that will be dragged)
   * * When set, interactions will be enabled
   */
  get attachedNode() {
    return this._attachedNode;
  }
  set attachedNode(value) {
    this._attachedNode = value;
    this._attachedMesh = null;
    this._rootMesh.setEnabled(value ? true : false);
    this._attachedNodeChanged(value);
  }
  /**
   * Disposes and replaces the current meshes in the gizmo with the specified mesh
   * @param mesh The mesh to replace the default mesh of the gizmo
   */
  setCustomMesh(mesh) {
    if (mesh.getScene() != this.gizmoLayer.utilityLayerScene) {
      throw "When setting a custom mesh on a gizmo, the custom meshes scene must be the same as the gizmos (eg. gizmo.gizmoLayer.utilityLayerScene)";
    }
    this._rootMesh.getChildMeshes().forEach((c) => {
      c.dispose();
    });
    mesh.parent = this._rootMesh;
    this._customMeshSet = true;
  }
  /**
   * Additional transform applied to the gizmo.
   * It's useful when the gizmo is attached to a bone: if the bone is part of a skeleton attached to a mesh, you should define the mesh as additionalTransformNode if you want the gizmo to be displayed at the bone's correct location.
   * Otherwise, as the gizmo is relative to the skeleton root, the mesh transformation will not be taken into account.
   */
  get additionalTransformNode() {
    return this._additionalTransformNode;
  }
  set additionalTransformNode(value) {
    this._additionalTransformNode = value;
  }
  /**
   * If set the gizmo's rotation will be updated to match the attached mesh each frame (Default: true)
   * NOTE: This is only possible for meshes with uniform scaling, as otherwise it's not possible to decompose the rotation
   */
  set updateGizmoRotationToMatchAttachedMesh(value) {
    this._updateGizmoRotationToMatchAttachedMesh = value;
  }
  get updateGizmoRotationToMatchAttachedMesh() {
    return this._updateGizmoRotationToMatchAttachedMesh;
  }
  /**
   * If set the gizmo's position will be updated to match the attached mesh each frame (Default: true)
   */
  set updateGizmoPositionToMatchAttachedMesh(value) {
    this._updateGizmoPositionToMatchAttachedMesh = value;
  }
  get updateGizmoPositionToMatchAttachedMesh() {
    return this._updateGizmoPositionToMatchAttachedMesh;
  }
  /**
   * Defines where the gizmo will be positioned if `updateGizmoPositionToMatchAttachedMesh` is enabled.
   * (Default: GizmoAnchorPoint.Origin)
   */
  set anchorPoint(value) {
    this._anchorPoint = value;
  }
  get anchorPoint() {
    return this._anchorPoint;
  }
  /**
   * Set the coordinate system to use. By default it's local.
   * But it's possible for a user to tweak so its local for translation and world for rotation.
   * In that case, setting the coordinate system will change `updateGizmoRotationToMatchAttachedMesh` and `updateGizmoPositionToMatchAttachedMesh`
   */
  set coordinatesMode(coordinatesMode) {
    this._coordinatesMode = coordinatesMode;
    const local = coordinatesMode == GizmoCoordinatesMode.Local;
    this.updateGizmoRotationToMatchAttachedMesh = local;
    this.updateGizmoPositionToMatchAttachedMesh = true;
  }
  get coordinatesMode() {
    return this._coordinatesMode;
  }
  /**
   * When set, the gizmo will always appear the same size no matter where the camera is (default: true)
   */
  set updateScale(value) {
    this._updateScale = value;
  }
  get updateScale() {
    return this._updateScale;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _attachedNodeChanged(value) {
  }
  /**
   * Creates a gizmo
   * @param gizmoLayer The utility layer the gizmo will be added to
   */
  constructor(gizmoLayer = UtilityLayerRenderer.DefaultUtilityLayer) {
    this.gizmoLayer = gizmoLayer;
    this._attachedMesh = null;
    this._attachedNode = null;
    this._customRotationQuaternion = null;
    this._scaleRatio = 1;
    this._isHovered = false;
    this._customMeshSet = false;
    this._updateGizmoRotationToMatchAttachedMesh = true;
    this._updateGizmoPositionToMatchAttachedMesh = true;
    this._anchorPoint = GizmoAnchorPoint.Origin;
    this._updateScale = true;
    this._coordinatesMode = GizmoCoordinatesMode.Local;
    this._interactionsEnabled = true;
    this._rightHandtoLeftHandMatrix = Matrix.RotationY(Math.PI);
    this._rootMesh = new Mesh("gizmoRootNode", gizmoLayer.utilityLayerScene);
    this._rootMesh.rotationQuaternion = Quaternion.Identity();
    this._beforeRenderObserver = this.gizmoLayer.utilityLayerScene.onBeforeRenderObservable.add(() => {
      this._update();
    });
  }
  /**
   * posture that the gizmo will be display
   * When set null, default value will be used (Quaternion(0, 0, 0, 1))
   */
  get customRotationQuaternion() {
    return this._customRotationQuaternion;
  }
  set customRotationQuaternion(customRotationQuaternion) {
    this._customRotationQuaternion = customRotationQuaternion;
  }
  /**
   * Updates the gizmo to match the attached mesh's position/rotation
   */
  _update() {
    if (this.attachedNode) {
      let effectiveNode = this.attachedNode;
      if (this.attachedMesh) {
        effectiveNode = this.attachedMesh || this.attachedNode;
      }
      if (this.updateGizmoPositionToMatchAttachedMesh) {
        if (this.anchorPoint == GizmoAnchorPoint.Pivot && effectiveNode.getAbsolutePivotPoint) {
          const position = effectiveNode.getAbsolutePivotPoint();
          this._rootMesh.position.copyFrom(position);
        } else {
          const row = effectiveNode.getWorldMatrix().getRow(3);
          const position = row ? row.toVector3() : new Vector3(0, 0, 0);
          this._rootMesh.position.copyFrom(position);
        }
      }
      if (this.updateGizmoRotationToMatchAttachedMesh) {
        const supportedNode = effectiveNode._isMesh || effectiveNode.getClassName() === "AbstractMesh" || effectiveNode.getClassName() === "TransformNode" || effectiveNode.getClassName() === "InstancedMesh";
        const transformNode = supportedNode ? effectiveNode : void 0;
        effectiveNode.getWorldMatrix().decompose(void 0, this._rootMesh.rotationQuaternion, void 0, _Gizmo.PreserveScaling ? transformNode : void 0);
        this._rootMesh.rotationQuaternion.normalize();
      } else {
        if (this._customRotationQuaternion) {
          this._rootMesh.rotationQuaternion.copyFrom(this._customRotationQuaternion);
        } else {
          this._rootMesh.rotationQuaternion.set(0, 0, 0, 1);
        }
      }
      if (this.updateScale) {
        const activeCamera = this.gizmoLayer.utilityLayerScene.activeCamera;
        const cameraPosition = activeCamera.globalPosition;
        this._rootMesh.position.subtractToRef(cameraPosition, TmpVectors.Vector3[0]);
        let scale = this.scaleRatio;
        if (activeCamera.mode == Camera.ORTHOGRAPHIC_CAMERA) {
          if (activeCamera.orthoTop && activeCamera.orthoBottom) {
            const orthoHeight = activeCamera.orthoTop - activeCamera.orthoBottom;
            scale *= orthoHeight;
          }
        } else {
          const camForward = activeCamera.getScene().useRightHandedSystem ? Vector3.RightHandedForwardReadOnly : Vector3.LeftHandedForwardReadOnly;
          const direction = activeCamera.getDirection(camForward);
          scale *= Vector3.Dot(TmpVectors.Vector3[0], direction);
        }
        this._rootMesh.scaling.setAll(scale);
        if (effectiveNode._getWorldMatrixDeterminant() < 0 && !_Gizmo.PreserveScaling) {
          this._rootMesh.scaling.y *= -1;
        }
      } else {
        this._rootMesh.scaling.setAll(this.scaleRatio);
      }
    }
    if (this.additionalTransformNode) {
      this._rootMesh.computeWorldMatrix(true);
      this._rootMesh.getWorldMatrix().multiplyToRef(this.additionalTransformNode.getWorldMatrix(), TmpVectors.Matrix[0]);
      TmpVectors.Matrix[0].decompose(this._rootMesh.scaling, this._rootMesh.rotationQuaternion, this._rootMesh.position);
    }
  }
  /**
   * if transform has a pivot and is not using PostMultiplyPivotMatrix, then the worldMatrix contains the pivot matrix (it's not cancelled at the end)
   * so, when extracting the world matrix component, the translation (and other components) is containing the pivot translation.
   * And the pivot is applied each frame. Removing it anyway here makes it applied only in computeWorldMatrix.
   * @param transform local transform that needs to be transform by the pivot inverse matrix
   * @param localMatrix local matrix that needs to be transform by the pivot inverse matrix
   * @param result resulting matrix transformed by pivot inverse if the transform node is using pivot without using post Multiply Pivot Matrix
   */
  _handlePivotMatrixInverse(transform, localMatrix, result) {
    if (transform.isUsingPivotMatrix() && !transform.isUsingPostMultiplyPivotMatrix()) {
      transform.getPivotMatrix().invertToRef(TmpVectors.Matrix[5]);
      TmpVectors.Matrix[5].multiplyToRef(localMatrix, result);
      return;
    }
    result.copyFrom(localMatrix);
  }
  /**
   * computes the rotation/scaling/position of the transform once the Node world matrix has changed.
   */
  _matrixChanged() {
    if (!this._attachedNode) {
      return;
    }
    if (this._attachedNode._isCamera) {
      const camera = this._attachedNode;
      let worldMatrix;
      let worldMatrixUC;
      if (camera.parent) {
        const parentInv = TmpVectors.Matrix[1];
        camera.parent._worldMatrix.invertToRef(parentInv);
        this._attachedNode._worldMatrix.multiplyToRef(parentInv, TmpVectors.Matrix[0]);
        worldMatrix = TmpVectors.Matrix[0];
      } else {
        worldMatrix = this._attachedNode._worldMatrix;
      }
      if (camera.getScene().useRightHandedSystem) {
        this._rightHandtoLeftHandMatrix.multiplyToRef(worldMatrix, TmpVectors.Matrix[1]);
        worldMatrixUC = TmpVectors.Matrix[1];
      } else {
        worldMatrixUC = worldMatrix;
      }
      worldMatrixUC.decompose(TmpVectors.Vector3[1], TmpVectors.Quaternion[0], TmpVectors.Vector3[0]);
      const inheritsTargetCamera = this._attachedNode.getClassName() === "FreeCamera" || this._attachedNode.getClassName() === "FlyCamera" || this._attachedNode.getClassName() === "ArcFollowCamera" || this._attachedNode.getClassName() === "TargetCamera" || this._attachedNode.getClassName() === "TouchCamera" || this._attachedNode.getClassName() === "UniversalCamera";
      if (inheritsTargetCamera) {
        const targetCamera = this._attachedNode;
        targetCamera.rotation = TmpVectors.Quaternion[0].toEulerAngles();
        if (targetCamera.rotationQuaternion) {
          targetCamera.rotationQuaternion.copyFrom(TmpVectors.Quaternion[0]);
          targetCamera.rotationQuaternion.normalize();
        }
      }
      camera.position.copyFrom(TmpVectors.Vector3[0]);
    } else if (this._attachedNode._isMesh || this._attachedNode.getClassName() === "AbstractMesh" || this._attachedNode.getClassName() === "TransformNode" || this._attachedNode.getClassName() === "InstancedMesh") {
      const transform = this._attachedNode;
      if (transform.parent) {
        const parentInv = TmpVectors.Matrix[0];
        const localMat = TmpVectors.Matrix[1];
        transform.parent.getWorldMatrix().invertToRef(parentInv);
        this._attachedNode.getWorldMatrix().multiplyToRef(parentInv, localMat);
        const matrixToDecompose = TmpVectors.Matrix[4];
        this._handlePivotMatrixInverse(transform, localMat, matrixToDecompose);
        matrixToDecompose.decompose(TmpVectors.Vector3[0], TmpVectors.Quaternion[0], transform.position, _Gizmo.PreserveScaling ? transform : void 0, _Gizmo.UseAbsoluteScaling);
        TmpVectors.Quaternion[0].normalize();
        if (transform.isUsingPivotMatrix()) {
          const r = TmpVectors.Quaternion[1];
          Quaternion.RotationYawPitchRollToRef(transform.rotation.y, transform.rotation.x, transform.rotation.z, r);
          const scaleMatrix = TmpVectors.Matrix[2];
          Matrix.ScalingToRef(transform.scaling.x, transform.scaling.y, transform.scaling.z, scaleMatrix);
          const rotationMatrix = TmpVectors.Matrix[2];
          r.toRotationMatrix(rotationMatrix);
          const pivotMatrix = transform.getPivotMatrix();
          const invPivotMatrix = TmpVectors.Matrix[3];
          pivotMatrix.invertToRef(invPivotMatrix);
          pivotMatrix.multiplyToRef(scaleMatrix, TmpVectors.Matrix[4]);
          TmpVectors.Matrix[4].multiplyToRef(rotationMatrix, TmpVectors.Matrix[5]);
          TmpVectors.Matrix[5].multiplyToRef(invPivotMatrix, TmpVectors.Matrix[6]);
          TmpVectors.Matrix[6].getTranslationToRef(TmpVectors.Vector3[1]);
          transform.position.subtractInPlace(TmpVectors.Vector3[1]);
        }
      } else {
        const matrixToDecompose = TmpVectors.Matrix[4];
        this._handlePivotMatrixInverse(transform, this._attachedNode._worldMatrix, matrixToDecompose);
        matrixToDecompose.decompose(TmpVectors.Vector3[0], TmpVectors.Quaternion[0], transform.position, _Gizmo.PreserveScaling ? transform : void 0, _Gizmo.UseAbsoluteScaling);
      }
      TmpVectors.Vector3[0].scaleInPlace(1 / transform.scalingDeterminant);
      transform.scaling.copyFrom(TmpVectors.Vector3[0]);
      if (!transform.billboardMode) {
        if (transform.rotationQuaternion) {
          transform.rotationQuaternion.copyFrom(TmpVectors.Quaternion[0]);
          transform.rotationQuaternion.normalize();
        } else {
          transform.rotation = TmpVectors.Quaternion[0].toEulerAngles();
        }
      }
    } else if (this._attachedNode.getClassName() === "Bone") {
      const bone = this._attachedNode;
      const parent = bone.getParent();
      if (parent) {
        const invParent = TmpVectors.Matrix[0];
        const boneLocalMatrix = TmpVectors.Matrix[1];
        parent.getFinalMatrix().invertToRef(invParent);
        bone.getFinalMatrix().multiplyToRef(invParent, boneLocalMatrix);
        const lmat = bone.getLocalMatrix();
        lmat.copyFrom(boneLocalMatrix);
      } else {
        const lmat = bone.getLocalMatrix();
        lmat.copyFrom(bone.getFinalMatrix());
      }
      bone.markAsDirty();
    } else {
      const light = this._attachedNode;
      if (light.getTypeID) {
        const type = light.getTypeID();
        if (type === Light.LIGHTTYPEID_DIRECTIONALLIGHT || type === Light.LIGHTTYPEID_SPOTLIGHT || type === Light.LIGHTTYPEID_POINTLIGHT) {
          const parent = light.parent;
          if (parent) {
            const invParent = TmpVectors.Matrix[0];
            const nodeLocalMatrix = TmpVectors.Matrix[1];
            parent.getWorldMatrix().invertToRef(invParent);
            light.getWorldMatrix().multiplyToRef(invParent, nodeLocalMatrix);
            nodeLocalMatrix.decompose(void 0, TmpVectors.Quaternion[0], TmpVectors.Vector3[0]);
          } else {
            this._attachedNode._worldMatrix.decompose(void 0, TmpVectors.Quaternion[0], TmpVectors.Vector3[0]);
          }
          light.position = new Vector3(TmpVectors.Vector3[0].x, TmpVectors.Vector3[0].y, TmpVectors.Vector3[0].z);
          if (light.direction) {
            light.direction = new Vector3(light.direction.x, light.direction.y, light.direction.z);
          }
        }
      }
    }
  }
  /**
   * refresh gizmo mesh material
   * @param gizmoMeshes
   * @param material material to apply
   */
  _setGizmoMeshMaterial(gizmoMeshes, material) {
    if (gizmoMeshes) {
      gizmoMeshes.forEach((m) => {
        m.material = material;
        if (m.color) {
          m.color = material.diffuseColor;
        }
      });
    }
  }
  /**
   * Subscribes to pointer up, down, and hover events. Used for responsive gizmos.
   * @param gizmoLayer The utility layer the gizmo will be added to
   * @param gizmoAxisCache Gizmo axis definition used for reactive gizmo UI
   * @returns {Observer<PointerInfo>} pointerObserver
   */
  static GizmoAxisPointerObserver(gizmoLayer, gizmoAxisCache) {
    let dragging = false;
    const pointerObserver = gizmoLayer.utilityLayerScene.onPointerObservable.add((pointerInfo) => {
      var _a, _b;
      if (pointerInfo.pickInfo) {
        if (pointerInfo.type === PointerEventTypes.POINTERMOVE) {
          if (dragging) {
            return;
          }
          gizmoAxisCache.forEach((cache) => {
            var _a2, _b2;
            if (cache.colliderMeshes && cache.gizmoMeshes) {
              const isHovered = ((_b2 = cache.colliderMeshes) == null ? void 0 : _b2.indexOf((_a2 = pointerInfo == null ? void 0 : pointerInfo.pickInfo) == null ? void 0 : _a2.pickedMesh)) != -1;
              const material = cache.dragBehavior.enabled ? isHovered || cache.active ? cache.hoverMaterial : cache.material : cache.disableMaterial;
              cache.gizmoMeshes.forEach((m) => {
                m.material = material;
                if (m.color) {
                  m.color = material.diffuseColor;
                }
              });
            }
          });
        }
        if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
          if (gizmoAxisCache.has((_a = pointerInfo.pickInfo.pickedMesh) == null ? void 0 : _a.parent)) {
            dragging = true;
            const statusMap = gizmoAxisCache.get((_b = pointerInfo.pickInfo.pickedMesh) == null ? void 0 : _b.parent);
            statusMap.active = true;
            gizmoAxisCache.forEach((cache) => {
              var _a2, _b2;
              const isHovered = ((_b2 = cache.colliderMeshes) == null ? void 0 : _b2.indexOf((_a2 = pointerInfo == null ? void 0 : pointerInfo.pickInfo) == null ? void 0 : _a2.pickedMesh)) != -1;
              const material = (isHovered || cache.active) && cache.dragBehavior.enabled ? cache.hoverMaterial : cache.disableMaterial;
              cache.gizmoMeshes.forEach((m) => {
                m.material = material;
                if (m.color) {
                  m.color = material.diffuseColor;
                }
              });
            });
          }
        }
        if (pointerInfo.type === PointerEventTypes.POINTERUP) {
          gizmoAxisCache.forEach((cache) => {
            cache.active = false;
            dragging = false;
            cache.gizmoMeshes.forEach((m) => {
              m.material = cache.dragBehavior.enabled ? cache.material : cache.disableMaterial;
              if (m.color) {
                m.color = cache.material.diffuseColor;
              }
            });
          });
        }
      }
    });
    return pointerObserver;
  }
  /**
   * Disposes of the gizmo
   */
  dispose() {
    this._rootMesh.dispose();
    if (this._beforeRenderObserver) {
      this.gizmoLayer.utilityLayerScene.onBeforeRenderObservable.remove(this._beforeRenderObserver);
    }
  }
};
Gizmo.PreserveScaling = false;
Gizmo.UseAbsoluteScaling = true;

// node_modules/@babylonjs/core/Misc/pivotTools.js
var PivotTools = class _PivotTools {
  /**
   * @internal
   */
  static _RemoveAndStorePivotPoint(mesh) {
    if (mesh && _PivotTools._PivotCached === 0) {
      mesh.getPivotPointToRef(_PivotTools._OldPivotPoint);
      _PivotTools._PivotPostMultiplyPivotMatrix = mesh._postMultiplyPivotMatrix;
      if (!_PivotTools._OldPivotPoint.equalsToFloats(0, 0, 0)) {
        mesh.setPivotMatrix(Matrix.IdentityReadOnly);
        _PivotTools._OldPivotPoint.subtractToRef(mesh.getPivotPoint(), _PivotTools._PivotTranslation);
        _PivotTools._PivotTmpVector.copyFromFloats(1, 1, 1);
        _PivotTools._PivotTmpVector.subtractInPlace(mesh.scaling);
        _PivotTools._PivotTmpVector.multiplyInPlace(_PivotTools._PivotTranslation);
        mesh.position.addInPlace(_PivotTools._PivotTmpVector);
      }
    }
    _PivotTools._PivotCached++;
  }
  /**
   * @internal
   */
  static _RestorePivotPoint(mesh) {
    if (mesh && !_PivotTools._OldPivotPoint.equalsToFloats(0, 0, 0) && _PivotTools._PivotCached === 1) {
      mesh.setPivotPoint(_PivotTools._OldPivotPoint);
      mesh._postMultiplyPivotMatrix = _PivotTools._PivotPostMultiplyPivotMatrix;
      _PivotTools._PivotTmpVector.copyFromFloats(1, 1, 1);
      _PivotTools._PivotTmpVector.subtractInPlace(mesh.scaling);
      _PivotTools._PivotTmpVector.multiplyInPlace(_PivotTools._PivotTranslation);
      mesh.position.subtractInPlace(_PivotTools._PivotTmpVector);
    }
    this._PivotCached--;
  }
};
PivotTools._PivotCached = 0;
PivotTools._OldPivotPoint = new Vector3();
PivotTools._PivotTranslation = new Vector3();
PivotTools._PivotTmpVector = new Vector3();
PivotTools._PivotPostMultiplyPivotMatrix = false;

// node_modules/@babylonjs/core/Behaviors/Meshes/pointerDragBehavior.js
var PointerDragBehavior = class _PointerDragBehavior {
  /**
   * Get or set the currentDraggingPointerId
   * @deprecated Please use currentDraggingPointerId instead
   */
  get currentDraggingPointerID() {
    return this.currentDraggingPointerId;
  }
  set currentDraggingPointerID(currentDraggingPointerID) {
    this.currentDraggingPointerId = currentDraggingPointerID;
  }
  /**
   *  If the drag behavior will react to drag events (Default: true)
   */
  set enabled(value) {
    if (value != this._enabled) {
      this.onEnabledObservable.notifyObservers(value);
    }
    this._enabled = value;
  }
  get enabled() {
    return this._enabled;
  }
  /**
   * Gets the options used by the behavior
   */
  get options() {
    return this._options;
  }
  /**
   * Sets the options used by the behavior
   */
  set options(options) {
    this._options = options;
  }
  /**
   * Creates a pointer drag behavior that can be attached to a mesh
   * @param options The drag axis or normal of the plane that will be dragged across. If no options are specified the drag plane will always face the ray's origin (eg. camera)
   * @param options.dragAxis
   * @param options.dragPlaneNormal
   */
  constructor(options) {
    this._useAlternatePickedPointAboveMaxDragAngleDragSpeed = -1.1;
    this._activeDragButton = -1;
    this.maxDragAngle = 0;
    this.dragButtons = [0, 1, 2];
    this._useAlternatePickedPointAboveMaxDragAngle = false;
    this.currentDraggingPointerId = -1;
    this.dragging = false;
    this.dragDeltaRatio = 0.2;
    this.updateDragPlane = true;
    this._debugMode = false;
    this._moving = false;
    this.onDragObservable = new Observable();
    this.onDragStartObservable = new Observable();
    this.onDragEndObservable = new Observable();
    this.onEnabledObservable = new Observable();
    this.moveAttached = true;
    this._enabled = true;
    this.startAndReleaseDragOnPointerEvents = true;
    this.detachCameraControls = true;
    this.useObjectOrientationForDragging = true;
    this.validateDrag = (target) => {
      return true;
    };
    this._tmpVector = new Vector3(0, 0, 0);
    this._alternatePickedPoint = new Vector3(0, 0, 0);
    this._worldDragAxis = new Vector3(0, 0, 0);
    this._targetPosition = new Vector3(0, 0, 0);
    this._attachedToElement = false;
    this._startDragRay = new Ray(new Vector3(), new Vector3());
    this._lastPointerRay = {};
    this._dragDelta = new Vector3();
    this._pointA = new Vector3(0, 0, 0);
    this._pointC = new Vector3(0, 0, 0);
    this._localAxis = new Vector3(0, 0, 0);
    this._lookAt = new Vector3(0, 0, 0);
    this._options = options ? options : {};
    let optionCount = 0;
    if (this._options.dragAxis) {
      optionCount++;
    }
    if (this._options.dragPlaneNormal) {
      optionCount++;
    }
    if (optionCount > 1) {
      throw "Multiple drag modes specified in dragBehavior options. Only one expected";
    }
  }
  /**
   *  The name of the behavior
   */
  get name() {
    return "PointerDrag";
  }
  /**
   *  Initializes the behavior
   */
  init() {
  }
  /**
   * Attaches the drag behavior the passed in mesh
   * @param ownerNode The mesh that will be dragged around once attached
   * @param predicate Predicate to use for pick filtering
   */
  attach(ownerNode, predicate) {
    this._scene = ownerNode.getScene();
    ownerNode.isNearGrabbable = true;
    this.attachedNode = ownerNode;
    if (!_PointerDragBehavior._PlaneScene) {
      if (this._debugMode) {
        _PointerDragBehavior._PlaneScene = this._scene;
      } else {
        _PointerDragBehavior._PlaneScene = new Scene(this._scene.getEngine(), { virtual: true });
        _PointerDragBehavior._PlaneScene.detachControl();
        this._scene.onDisposeObservable.addOnce(() => {
          _PointerDragBehavior._PlaneScene.dispose();
          _PointerDragBehavior._PlaneScene = null;
        });
      }
    }
    this._dragPlane = CreatePlane("pointerDragPlane", { size: this._debugMode ? 1 : 1e4, updatable: false, sideOrientation: Mesh.DOUBLESIDE }, _PointerDragBehavior._PlaneScene);
    this.lastDragPosition = new Vector3(0, 0, 0);
    const pickPredicate = predicate ? predicate : (m) => {
      return this.attachedNode == m || m.isDescendantOf(this.attachedNode);
    };
    this._pointerObserver = this._scene.onPointerObservable.add((pointerInfo) => {
      if (!this.enabled) {
        if (this._attachedToElement) {
          this.releaseDrag();
        }
        return;
      }
      if (pointerInfo.type == PointerEventTypes.POINTERDOWN) {
        if (this.startAndReleaseDragOnPointerEvents && !this.dragging && pointerInfo.pickInfo && pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh && pointerInfo.pickInfo.pickedPoint && pointerInfo.pickInfo.ray && pickPredicate(pointerInfo.pickInfo.pickedMesh)) {
          if (this._activeDragButton === -1 && this.dragButtons.indexOf(pointerInfo.event.button) !== -1) {
            this._activeDragButton = pointerInfo.event.button;
            this._activePointerInfo = pointerInfo;
            this._startDrag(pointerInfo.event.pointerId, pointerInfo.pickInfo.ray, pointerInfo.pickInfo.pickedPoint);
          }
        }
      } else if (pointerInfo.type == PointerEventTypes.POINTERUP) {
        if (this.startAndReleaseDragOnPointerEvents && this.currentDraggingPointerId == pointerInfo.event.pointerId && (this._activeDragButton === pointerInfo.event.button || this._activeDragButton === -1)) {
          this.releaseDrag();
        }
      } else if (pointerInfo.type == PointerEventTypes.POINTERMOVE) {
        const pointerId = pointerInfo.event.pointerId;
        if (this.currentDraggingPointerId === _PointerDragBehavior._AnyMouseId && pointerId !== _PointerDragBehavior._AnyMouseId) {
          const evt = pointerInfo.event;
          const isMouseEvent = evt.pointerType === "mouse" || !this._scene.getEngine().hostInformation.isMobile && evt instanceof MouseEvent;
          if (isMouseEvent) {
            if (this._lastPointerRay[this.currentDraggingPointerId]) {
              this._lastPointerRay[pointerId] = this._lastPointerRay[this.currentDraggingPointerId];
              delete this._lastPointerRay[this.currentDraggingPointerId];
            }
            this.currentDraggingPointerId = pointerId;
          }
        }
        if (!this._lastPointerRay[pointerId]) {
          this._lastPointerRay[pointerId] = new Ray(new Vector3(), new Vector3());
        }
        if (pointerInfo.pickInfo && pointerInfo.pickInfo.ray) {
          this._lastPointerRay[pointerId].origin.copyFrom(pointerInfo.pickInfo.ray.origin);
          this._lastPointerRay[pointerId].direction.copyFrom(pointerInfo.pickInfo.ray.direction);
          if (this.currentDraggingPointerId == pointerId && this.dragging) {
            this._moveDrag(pointerInfo.pickInfo.ray);
          }
        }
      }
    });
    this._beforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
      if (this._moving && this.moveAttached) {
        let needMatrixUpdate = false;
        PivotTools._RemoveAndStorePivotPoint(this.attachedNode);
        this._targetPosition.subtractToRef(this.attachedNode.absolutePosition, this._tmpVector);
        this._tmpVector.scaleInPlace(this.dragDeltaRatio);
        this.attachedNode.getAbsolutePosition().addToRef(this._tmpVector, this._tmpVector);
        if (this.validateDrag(this._tmpVector)) {
          this.attachedNode.setAbsolutePosition(this._tmpVector);
          needMatrixUpdate = true;
        }
        PivotTools._RestorePivotPoint(this.attachedNode);
        if (needMatrixUpdate) {
          this.attachedNode.computeWorldMatrix();
        }
      }
    });
  }
  /**
   * Force release the drag action by code.
   */
  releaseDrag() {
    if (this.dragging) {
      this.dragging = false;
      this.onDragEndObservable.notifyObservers({ dragPlanePoint: this.lastDragPosition, pointerId: this.currentDraggingPointerId, pointerInfo: this._activePointerInfo });
    }
    this.currentDraggingPointerId = -1;
    this._activeDragButton = -1;
    this._activePointerInfo = null;
    this._moving = false;
    if (this.detachCameraControls && this._attachedToElement && this._scene.activeCamera && !this._scene.activeCamera.leftCamera) {
      if (this._scene.activeCamera.getClassName() === "ArcRotateCamera") {
        const arcRotateCamera = this._scene.activeCamera;
        arcRotateCamera.attachControl(arcRotateCamera.inputs ? arcRotateCamera.inputs.noPreventDefault : true, arcRotateCamera._useCtrlForPanning, arcRotateCamera._panningMouseButton);
      } else {
        this._scene.activeCamera.attachControl(this._scene.activeCamera.inputs ? this._scene.activeCamera.inputs.noPreventDefault : true);
      }
      this._attachedToElement = false;
    }
  }
  /**
   * Simulates the start of a pointer drag event on the behavior
   * @param pointerId pointerID of the pointer that should be simulated (Default: Any mouse pointer ID)
   * @param fromRay initial ray of the pointer to be simulated (Default: Ray from camera to attached mesh)
   * @param startPickedPoint picked point of the pointer to be simulated (Default: attached mesh position)
   */
  startDrag(pointerId = _PointerDragBehavior._AnyMouseId, fromRay, startPickedPoint) {
    this._startDrag(pointerId, fromRay, startPickedPoint);
    let lastRay = this._lastPointerRay[pointerId];
    if (pointerId === _PointerDragBehavior._AnyMouseId) {
      lastRay = this._lastPointerRay[Object.keys(this._lastPointerRay)[0]];
    }
    if (lastRay) {
      this._moveDrag(lastRay);
    }
  }
  _startDrag(pointerId, fromRay, startPickedPoint) {
    if (!this._scene.activeCamera || this.dragging || !this.attachedNode) {
      return;
    }
    PivotTools._RemoveAndStorePivotPoint(this.attachedNode);
    if (fromRay) {
      this._startDragRay.direction.copyFrom(fromRay.direction);
      this._startDragRay.origin.copyFrom(fromRay.origin);
    } else {
      this._startDragRay.origin.copyFrom(this._scene.activeCamera.position);
      this.attachedNode.getWorldMatrix().getTranslationToRef(this._tmpVector);
      this._tmpVector.subtractToRef(this._scene.activeCamera.position, this._startDragRay.direction);
    }
    this._updateDragPlanePosition(this._startDragRay, startPickedPoint ? startPickedPoint : this._tmpVector);
    const pickedPoint = this._pickWithRayOnDragPlane(this._startDragRay);
    if (pickedPoint) {
      this.dragging = true;
      this.currentDraggingPointerId = pointerId;
      this.lastDragPosition.copyFrom(pickedPoint);
      this.onDragStartObservable.notifyObservers({ dragPlanePoint: pickedPoint, pointerId: this.currentDraggingPointerId, pointerInfo: this._activePointerInfo });
      this._targetPosition.copyFrom(this.attachedNode.getAbsolutePosition());
      if (this.detachCameraControls && this._scene.activeCamera && this._scene.activeCamera.inputs && !this._scene.activeCamera.leftCamera) {
        if (this._scene.activeCamera.inputs.attachedToElement) {
          this._scene.activeCamera.detachControl();
          this._attachedToElement = true;
        } else {
          this._attachedToElement = false;
        }
      }
    } else {
      this.releaseDrag();
    }
    PivotTools._RestorePivotPoint(this.attachedNode);
  }
  _moveDrag(ray) {
    this._moving = true;
    const pickedPoint = this._pickWithRayOnDragPlane(ray);
    if (pickedPoint) {
      PivotTools._RemoveAndStorePivotPoint(this.attachedNode);
      if (this.updateDragPlane) {
        this._updateDragPlanePosition(ray, pickedPoint);
      }
      let dragLength = 0;
      if (this._options.dragAxis) {
        this.useObjectOrientationForDragging ? Vector3.TransformCoordinatesToRef(this._options.dragAxis, this.attachedNode.getWorldMatrix().getRotationMatrix(), this._worldDragAxis) : this._worldDragAxis.copyFrom(this._options.dragAxis);
        pickedPoint.subtractToRef(this.lastDragPosition, this._tmpVector);
        dragLength = Vector3.Dot(this._tmpVector, this._worldDragAxis);
        this._worldDragAxis.scaleToRef(dragLength, this._dragDelta);
      } else {
        dragLength = this._dragDelta.length();
        pickedPoint.subtractToRef(this.lastDragPosition, this._dragDelta);
      }
      this._targetPosition.addInPlace(this._dragDelta);
      this.onDragObservable.notifyObservers({
        dragDistance: dragLength,
        delta: this._dragDelta,
        dragPlanePoint: pickedPoint,
        dragPlaneNormal: this._dragPlane.forward,
        pointerId: this.currentDraggingPointerId,
        pointerInfo: this._activePointerInfo
      });
      this.lastDragPosition.copyFrom(pickedPoint);
      PivotTools._RestorePivotPoint(this.attachedNode);
    }
  }
  _pickWithRayOnDragPlane(ray) {
    if (!ray) {
      return null;
    }
    let angle = Math.acos(Vector3.Dot(this._dragPlane.forward, ray.direction));
    if (angle > Math.PI / 2) {
      angle = Math.PI - angle;
    }
    if (this.maxDragAngle > 0 && angle > this.maxDragAngle) {
      if (this._useAlternatePickedPointAboveMaxDragAngle) {
        this._tmpVector.copyFrom(ray.direction);
        this.attachedNode.absolutePosition.subtractToRef(ray.origin, this._alternatePickedPoint);
        this._alternatePickedPoint.normalize();
        this._alternatePickedPoint.scaleInPlace(this._useAlternatePickedPointAboveMaxDragAngleDragSpeed * Vector3.Dot(this._alternatePickedPoint, this._tmpVector));
        this._tmpVector.addInPlace(this._alternatePickedPoint);
        const dot = Vector3.Dot(this._dragPlane.forward, this._tmpVector);
        this._dragPlane.forward.scaleToRef(-dot, this._alternatePickedPoint);
        this._alternatePickedPoint.addInPlace(this._tmpVector);
        this._alternatePickedPoint.addInPlace(this.attachedNode.absolutePosition);
        return this._alternatePickedPoint;
      } else {
        return null;
      }
    }
    const planeNormal = this._dragPlane.forward;
    const planePosition = this._dragPlane.position;
    const dotProduct = ray.direction.dot(planeNormal);
    if (Math.abs(dotProduct) < Epsilon) {
      return null;
    }
    planePosition.subtractToRef(ray.origin, TmpVectors.Vector3[0]);
    const t = TmpVectors.Vector3[0].dot(planeNormal) / dotProduct;
    if (t < 0) {
      return null;
    }
    ray.direction.scaleToRef(t, TmpVectors.Vector3[0]);
    const intersectionPoint = ray.origin.add(TmpVectors.Vector3[0]);
    return intersectionPoint;
  }
  // Position the drag plane based on the attached mesh position, for single axis rotate the plane along the axis to face the camera
  _updateDragPlanePosition(ray, dragPlanePosition) {
    this._pointA.copyFrom(dragPlanePosition);
    if (this._options.dragAxis) {
      this.useObjectOrientationForDragging ? Vector3.TransformCoordinatesToRef(this._options.dragAxis, this.attachedNode.getWorldMatrix().getRotationMatrix(), this._localAxis) : this._localAxis.copyFrom(this._options.dragAxis);
      ray.origin.subtractToRef(this._pointA, this._pointC);
      this._pointC.normalize();
      if (Math.abs(Vector3.Dot(this._localAxis, this._pointC)) > 0.999) {
        if (Math.abs(Vector3.Dot(Vector3.UpReadOnly, this._pointC)) > 0.999) {
          this._lookAt.copyFrom(Vector3.Right());
        } else {
          this._lookAt.copyFrom(Vector3.UpReadOnly);
        }
      } else {
        Vector3.CrossToRef(this._localAxis, this._pointC, this._lookAt);
        Vector3.CrossToRef(this._localAxis, this._lookAt, this._lookAt);
        this._lookAt.normalize();
      }
      this._dragPlane.position.copyFrom(this._pointA);
      this._pointA.addToRef(this._lookAt, this._lookAt);
      this._dragPlane.lookAt(this._lookAt);
    } else if (this._options.dragPlaneNormal) {
      this.useObjectOrientationForDragging ? Vector3.TransformCoordinatesToRef(this._options.dragPlaneNormal, this.attachedNode.getWorldMatrix().getRotationMatrix(), this._localAxis) : this._localAxis.copyFrom(this._options.dragPlaneNormal);
      this._dragPlane.position.copyFrom(this._pointA);
      this._pointA.addToRef(this._localAxis, this._lookAt);
      this._dragPlane.lookAt(this._lookAt);
    } else {
      this._dragPlane.position.copyFrom(this._pointA);
      this._dragPlane.lookAt(ray.origin);
    }
    this._dragPlane.position.copyFrom(this.attachedNode.getAbsolutePosition());
    this._dragPlane.computeWorldMatrix(true);
  }
  /**
   *  Detaches the behavior from the mesh
   */
  detach() {
    this._lastPointerRay = {};
    if (this.attachedNode) {
      this.attachedNode.isNearGrabbable = false;
    }
    if (this._pointerObserver) {
      this._scene.onPointerObservable.remove(this._pointerObserver);
    }
    if (this._beforeRenderObserver) {
      this._scene.onBeforeRenderObservable.remove(this._beforeRenderObserver);
    }
    if (this._dragPlane) {
      this._dragPlane.dispose();
    }
    this.releaseDrag();
  }
};
PointerDragBehavior._AnyMouseId = -2;

// node_modules/@babylonjs/core/Animations/animationGroup.js
var TargetedAnimation = class {
  /**
   * Returns the string "TargetedAnimation"
   * @returns "TargetedAnimation"
   */
  getClassName() {
    return "TargetedAnimation";
  }
  /**
   * Serialize the object
   * @returns the JSON object representing the current entity
   */
  serialize() {
    const serializationObject = {};
    serializationObject.animation = this.animation.serialize();
    serializationObject.targetId = this.target.id;
    return serializationObject;
  }
};
var AnimationGroup = class _AnimationGroup {
  /**
   * Gets or sets the mask associated with this animation group. This mask is used to filter which objects should be animated.
   */
  get mask() {
    return this._mask;
  }
  set mask(value) {
    if (this._mask === value) {
      return;
    }
    this._mask = value;
    this.syncWithMask(true);
  }
  /**
   * Makes sure that the animations are either played or stopped according to the animation group mask.
   * Note however that the call won't have any effect if the animation group has not been started yet.
   * @param forceUpdate If true, forces to loop over the animatables even if no mask is defined (used internally, you shouldn't need to use it). Default: false.
   */
  syncWithMask(forceUpdate = false) {
    if (!this.mask && !forceUpdate) {
      this._numActiveAnimatables = this._targetedAnimations.length;
      return;
    }
    this._numActiveAnimatables = 0;
    for (let i = 0; i < this._animatables.length; ++i) {
      const animatable = this._animatables[i];
      if (!this.mask || this.mask.disabled || this.mask.retainsTarget(animatable.target.name)) {
        this._numActiveAnimatables++;
        if (animatable.paused) {
          animatable.restart();
        }
      } else {
        if (!animatable.paused) {
          animatable.pause();
        }
      }
    }
  }
  /**
   * Removes all animations for the targets not retained by the animation group mask.
   * Use this function if you know you won't need those animations anymore and if you want to free memory.
   */
  removeUnmaskedAnimations() {
    if (!this.mask || this.mask.disabled) {
      return;
    }
    for (let i = 0; i < this._animatables.length; ++i) {
      const animatable = this._animatables[i];
      if (!this.mask.retainsTarget(animatable.target.name)) {
        animatable.stop();
        this._animatables.splice(i, 1);
        --i;
      }
    }
    for (let index = 0; index < this._targetedAnimations.length; index++) {
      const targetedAnimation = this._targetedAnimations[index];
      if (!this.mask.retainsTarget(targetedAnimation.target.name)) {
        this._targetedAnimations.splice(index, 1);
        --index;
      }
    }
  }
  /**
   * Gets or sets the first frame
   */
  get from() {
    return this._from;
  }
  set from(value) {
    if (this._from === value) {
      return;
    }
    this._from = value;
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.fromFrame = this._from;
    }
  }
  /**
   * Gets or sets the last frame
   */
  get to() {
    return this._to;
  }
  set to(value) {
    if (this._to === value) {
      return;
    }
    this._to = value;
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.toFrame = this._to;
    }
  }
  /**
   * Define if the animations are started
   */
  get isStarted() {
    return this._isStarted;
  }
  /**
   * Gets a value indicating that the current group is playing
   */
  get isPlaying() {
    return this._isStarted && !this._isPaused;
  }
  /**
   * Gets or sets the speed ratio to use for all animations
   */
  get speedRatio() {
    return this._speedRatio;
  }
  /**
   * Gets or sets the speed ratio to use for all animations
   */
  set speedRatio(value) {
    if (this._speedRatio === value) {
      return;
    }
    this._speedRatio = value;
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.speedRatio = this._speedRatio;
    }
  }
  /**
   * Gets or sets if all animations should loop or not
   */
  get loopAnimation() {
    return this._loopAnimation;
  }
  set loopAnimation(value) {
    if (this._loopAnimation === value) {
      return;
    }
    this._loopAnimation = value;
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.loopAnimation = this._loopAnimation;
    }
  }
  /**
   * Gets or sets if all animations should be evaluated additively
   */
  get isAdditive() {
    return this._isAdditive;
  }
  set isAdditive(value) {
    if (this._isAdditive === value) {
      return;
    }
    this._isAdditive = value;
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.isAdditive = this._isAdditive;
    }
  }
  /**
   * Gets or sets the weight to apply to all animations of the group
   */
  get weight() {
    return this._weight;
  }
  set weight(value) {
    if (this._weight === value) {
      return;
    }
    this._weight = value;
    this.setWeightForAllAnimatables(this._weight);
  }
  /**
   * Gets the targeted animations for this animation group
   */
  get targetedAnimations() {
    return this._targetedAnimations;
  }
  /**
   * returning the list of animatables controlled by this animation group.
   */
  get animatables() {
    return this._animatables;
  }
  /**
   * Gets the list of target animations
   */
  get children() {
    return this._targetedAnimations;
  }
  /**
   * Gets or sets the order of play of the animation group (default: 0)
   */
  get playOrder() {
    return this._playOrder;
  }
  set playOrder(value) {
    if (this._playOrder === value) {
      return;
    }
    this._playOrder = value;
    if (this._animatables.length > 0) {
      for (let i = 0; i < this._animatables.length; i++) {
        this._animatables[i].playOrder = this._playOrder;
      }
      this._scene.sortActiveAnimatables();
    }
  }
  /**
   * Allows the animations of the animation group to blend with current running animations
   * Note that a null value means that each animation will use their own existing blending configuration (Animation.enableBlending)
   */
  get enableBlending() {
    return this._enableBlending;
  }
  set enableBlending(value) {
    if (this._enableBlending === value) {
      return;
    }
    this._enableBlending = value;
    if (value !== null) {
      for (let i = 0; i < this._targetedAnimations.length; ++i) {
        this._targetedAnimations[i].animation.enableBlending = value;
      }
    }
  }
  /**
   * Gets or sets the animation blending speed
   * Note that a null value means that each animation will use their own existing blending configuration (Animation.blendingSpeed)
   */
  get blendingSpeed() {
    return this._blendingSpeed;
  }
  set blendingSpeed(value) {
    if (this._blendingSpeed === value) {
      return;
    }
    this._blendingSpeed = value;
    if (value !== null) {
      for (let i = 0; i < this._targetedAnimations.length; ++i) {
        this._targetedAnimations[i].animation.blendingSpeed = value;
      }
    }
  }
  /**
   * Gets the length (in seconds) of the animation group
   * This function assumes that all animations are played at the same framePerSecond speed!
   * Note: you can only call this method after you've added at least one targeted animation!
   * @param from Starting frame range (default is AnimationGroup.from)
   * @param to Ending frame range (default is AnimationGroup.to)
   * @returns The length in seconds
   */
  getLength(from, to) {
    from = from ?? this._from;
    to = to ?? this._to;
    const fps = this.targetedAnimations[0].animation.framePerSecond * this._speedRatio;
    return (to - from) / fps;
  }
  /**
   * Merge the array of animation groups into a new animation group
   * @param animationGroups List of animation groups to merge
   * @param disposeSource If true, animation groups will be disposed after being merged (default: true)
   * @param normalize If true, animation groups will be normalized before being merged, so that all animations have the same "from" and "to" frame (default: false)
   * @param weight Weight for the new animation group. If not provided, it will inherit the weight from the first animation group of the array
   * @returns The new animation group or null if no animation groups were passed
   */
  static MergeAnimationGroups(animationGroups, disposeSource = true, normalize = false, weight) {
    if (animationGroups.length === 0) {
      return null;
    }
    weight = weight ?? animationGroups[0].weight;
    let beginFrame = Number.MAX_VALUE;
    let endFrame = -Number.MAX_VALUE;
    if (normalize) {
      for (const animationGroup of animationGroups) {
        if (animationGroup.from < beginFrame) {
          beginFrame = animationGroup.from;
        }
        if (animationGroup.to > endFrame) {
          endFrame = animationGroup.to;
        }
      }
    }
    const mergedAnimationGroup = new _AnimationGroup(animationGroups[0].name + "_merged", animationGroups[0]._scene, weight);
    for (const animationGroup of animationGroups) {
      if (normalize) {
        animationGroup.normalize(beginFrame, endFrame);
      }
      for (const targetedAnimation of animationGroup.targetedAnimations) {
        mergedAnimationGroup.addTargetedAnimation(targetedAnimation.animation, targetedAnimation.target);
      }
      if (disposeSource) {
        animationGroup.dispose();
      }
    }
    return mergedAnimationGroup;
  }
  /**
   * Instantiates a new Animation Group.
   * This helps managing several animations at once.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/groupAnimations
   * @param name Defines the name of the group
   * @param scene Defines the scene the group belongs to
   * @param weight Defines the weight to use for animations in the group (-1.0 by default, meaning "no weight")
   * @param playOrder Defines the order of play of the animation group (default is 0)
   */
  constructor(name3, scene = null, weight = -1, playOrder = 0) {
    this.name = name3;
    this._targetedAnimations = new Array();
    this._animatables = new Array();
    this._from = Number.MAX_VALUE;
    this._to = -Number.MAX_VALUE;
    this._speedRatio = 1;
    this._loopAnimation = false;
    this._isAdditive = false;
    this._weight = -1;
    this._playOrder = 0;
    this._enableBlending = null;
    this._blendingSpeed = null;
    this._numActiveAnimatables = 0;
    this._parentContainer = null;
    this.onAnimationEndObservable = new Observable();
    this.onAnimationLoopObservable = new Observable();
    this.onAnimationGroupLoopObservable = new Observable();
    this.onAnimationGroupEndObservable = new Observable();
    this.onAnimationGroupPauseObservable = new Observable();
    this.onAnimationGroupPlayObservable = new Observable();
    this.metadata = null;
    this._mask = null;
    this._animationLoopFlags = [];
    this._scene = scene || EngineStore.LastCreatedScene;
    this._weight = weight;
    this._playOrder = playOrder;
    this.uniqueId = this._scene.getUniqueId();
    this._scene.addAnimationGroup(this);
  }
  /**
   * Add an animation (with its target) in the group
   * @param animation defines the animation we want to add
   * @param target defines the target of the animation
   * @returns the TargetedAnimation object
   */
  addTargetedAnimation(animation, target) {
    const targetedAnimation = new TargetedAnimation();
    targetedAnimation.animation = animation;
    targetedAnimation.target = target;
    const keys = animation.getKeys();
    if (this._from > keys[0].frame) {
      this._from = keys[0].frame;
    }
    if (this._to < keys[keys.length - 1].frame) {
      this._to = keys[keys.length - 1].frame;
    }
    if (this._enableBlending !== null) {
      animation.enableBlending = this._enableBlending;
    }
    if (this._blendingSpeed !== null) {
      animation.blendingSpeed = this._blendingSpeed;
    }
    this._targetedAnimations.push(targetedAnimation);
    return targetedAnimation;
  }
  /**
   * Remove an animation from the group
   * @param animation defines the animation we want to remove
   */
  removeTargetedAnimation(animation) {
    for (let index = this._targetedAnimations.length - 1; index > -1; index--) {
      const targetedAnimation = this._targetedAnimations[index];
      if (targetedAnimation.animation === animation) {
        this._targetedAnimations.splice(index, 1);
      }
    }
  }
  /**
   * This function will normalize every animation in the group to make sure they all go from beginFrame to endFrame
   * It can add constant keys at begin or end
   * @param beginFrame defines the new begin frame for all animations or the smallest begin frame of all animations if null (defaults to null)
   * @param endFrame defines the new end frame for all animations or the largest end frame of all animations if null (defaults to null)
   * @returns the animation group
   */
  normalize(beginFrame = null, endFrame = null) {
    if (beginFrame == null) {
      beginFrame = this._from;
    }
    if (endFrame == null) {
      endFrame = this._to;
    }
    for (let index = 0; index < this._targetedAnimations.length; index++) {
      const targetedAnimation = this._targetedAnimations[index];
      const keys = targetedAnimation.animation.getKeys();
      const startKey = keys[0];
      const endKey = keys[keys.length - 1];
      if (startKey.frame > beginFrame) {
        const newKey = {
          frame: beginFrame,
          value: startKey.value,
          inTangent: startKey.inTangent,
          outTangent: startKey.outTangent,
          interpolation: startKey.interpolation
        };
        keys.splice(0, 0, newKey);
      }
      if (endKey.frame < endFrame) {
        const newKey = {
          frame: endFrame,
          value: endKey.value,
          inTangent: endKey.inTangent,
          outTangent: endKey.outTangent,
          interpolation: endKey.interpolation
        };
        keys.push(newKey);
      }
    }
    this._from = beginFrame;
    this._to = endFrame;
    return this;
  }
  _processLoop(animatable, targetedAnimation, index) {
    animatable.onAnimationLoop = () => {
      this.onAnimationLoopObservable.notifyObservers(targetedAnimation);
      if (this._animationLoopFlags[index]) {
        return;
      }
      this._animationLoopFlags[index] = true;
      this._animationLoopCount++;
      if (this._animationLoopCount === this._numActiveAnimatables) {
        this.onAnimationGroupLoopObservable.notifyObservers(this);
        this._animationLoopCount = 0;
        this._animationLoopFlags.length = 0;
      }
    };
  }
  /**
   * Start all animations on given targets
   * @param loop defines if animations must loop
   * @param speedRatio defines the ratio to apply to animation speed (1 by default)
   * @param from defines the from key (optional)
   * @param to defines the to key (optional)
   * @param isAdditive defines the additive state for the resulting animatables (optional)
   * @returns the current animation group
   */
  start(loop = false, speedRatio = 1, from, to, isAdditive) {
    if (this._isStarted || this._targetedAnimations.length === 0) {
      return this;
    }
    this._loopAnimation = loop;
    this._animationLoopCount = 0;
    this._animationLoopFlags.length = 0;
    for (let index = 0; index < this._targetedAnimations.length; index++) {
      const targetedAnimation = this._targetedAnimations[index];
      const animatable = this._scene.beginDirectAnimation(targetedAnimation.target, [targetedAnimation.animation], from !== void 0 ? from : this._from, to !== void 0 ? to : this._to, loop, speedRatio, void 0, void 0, isAdditive !== void 0 ? isAdditive : this._isAdditive);
      animatable.weight = this._weight;
      animatable.playOrder = this._playOrder;
      animatable.onAnimationEnd = () => {
        this.onAnimationEndObservable.notifyObservers(targetedAnimation);
        this._checkAnimationGroupEnded(animatable);
      };
      this._processLoop(animatable, targetedAnimation, index);
      this._animatables.push(animatable);
    }
    this.syncWithMask();
    this._scene.sortActiveAnimatables();
    this._speedRatio = speedRatio;
    this._isStarted = true;
    this._isPaused = false;
    this.onAnimationGroupPlayObservable.notifyObservers(this);
    return this;
  }
  /**
   * Pause all animations
   * @returns the animation group
   */
  pause() {
    if (!this._isStarted) {
      return this;
    }
    this._isPaused = true;
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.pause();
    }
    this.onAnimationGroupPauseObservable.notifyObservers(this);
    return this;
  }
  /**
   * Play all animations to initial state
   * This function will start() the animations if they were not started or will restart() them if they were paused
   * @param loop defines if animations must loop
   * @returns the animation group
   */
  play(loop) {
    if (this.isStarted && this._animatables.length === this._targetedAnimations.length) {
      if (loop !== void 0) {
        this.loopAnimation = loop;
      }
      this.restart();
    } else {
      this.stop();
      this.start(loop, this._speedRatio);
    }
    this._isPaused = false;
    return this;
  }
  /**
   * Reset all animations to initial state
   * @returns the animation group
   */
  reset() {
    if (!this._isStarted) {
      this.play();
      this.goToFrame(0);
      this.stop();
      return this;
    }
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.reset();
    }
    return this;
  }
  /**
   * Restart animations from key 0
   * @returns the animation group
   */
  restart() {
    if (!this._isStarted) {
      return this;
    }
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.restart();
    }
    this.syncWithMask();
    this.onAnimationGroupPlayObservable.notifyObservers(this);
    return this;
  }
  /**
   * Stop all animations
   * @returns the animation group
   */
  stop() {
    if (!this._isStarted) {
      return this;
    }
    const list = this._animatables.slice();
    for (let index = 0; index < list.length; index++) {
      list[index].stop(void 0, void 0, true);
    }
    let curIndex = 0;
    for (let index = 0; index < this._scene._activeAnimatables.length; index++) {
      const animatable = this._scene._activeAnimatables[index];
      if (animatable._runtimeAnimations.length > 0) {
        this._scene._activeAnimatables[curIndex++] = animatable;
      }
    }
    this._scene._activeAnimatables.length = curIndex;
    this._isStarted = false;
    return this;
  }
  /**
   * Set animation weight for all animatables
   *
   * @since 6.12.4
   *  You can pass the weight to the AnimationGroup constructor, or use the weight property to set it after the group has been created,
   *  making it easier to define the overall animation weight than calling setWeightForAllAnimatables() after the animation group has been started
   * @param weight defines the weight to use
   * @returns the animationGroup
   * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#animation-weights
   */
  setWeightForAllAnimatables(weight) {
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.weight = weight;
    }
    return this;
  }
  /**
   * Synchronize and normalize all animatables with a source animatable
   * @param root defines the root animatable to synchronize with (null to stop synchronizing)
   * @returns the animationGroup
   * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#animation-weights
   */
  syncAllAnimationsWith(root) {
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.syncWith(root);
    }
    return this;
  }
  /**
   * Goes to a specific frame in this animation group
   * @param frame the frame number to go to
   * @returns the animationGroup
   */
  goToFrame(frame) {
    if (!this._isStarted) {
      return this;
    }
    for (let index = 0; index < this._animatables.length; index++) {
      const animatable = this._animatables[index];
      animatable.goToFrame(frame);
    }
    return this;
  }
  /**
   * Dispose all associated resources
   */
  dispose() {
    this._targetedAnimations.length = 0;
    this._animatables.length = 0;
    const index = this._scene.animationGroups.indexOf(this);
    if (index > -1) {
      this._scene.animationGroups.splice(index, 1);
    }
    if (this._parentContainer) {
      const index2 = this._parentContainer.animationGroups.indexOf(this);
      if (index2 > -1) {
        this._parentContainer.animationGroups.splice(index2, 1);
      }
      this._parentContainer = null;
    }
    this.onAnimationEndObservable.clear();
    this.onAnimationGroupEndObservable.clear();
    this.onAnimationGroupPauseObservable.clear();
    this.onAnimationGroupPlayObservable.clear();
    this.onAnimationLoopObservable.clear();
    this.onAnimationGroupLoopObservable.clear();
  }
  _checkAnimationGroupEnded(animatable) {
    const idx = this._animatables.indexOf(animatable);
    if (idx > -1) {
      this._animatables.splice(idx, 1);
    }
    if (this._animatables.length === 0) {
      this._isStarted = false;
      this.onAnimationGroupEndObservable.notifyObservers(this);
    }
  }
  /**
   * Clone the current animation group and returns a copy
   * @param newName defines the name of the new group
   * @param targetConverter defines an optional function used to convert current animation targets to new ones
   * @param cloneAnimations defines if the animations should be cloned or referenced
   * @returns the new animation group
   */
  clone(newName, targetConverter, cloneAnimations = false) {
    const newGroup = new _AnimationGroup(newName || this.name, this._scene, this._weight, this._playOrder);
    newGroup._from = this.from;
    newGroup._to = this.to;
    newGroup._speedRatio = this.speedRatio;
    newGroup._loopAnimation = this.loopAnimation;
    newGroup._isAdditive = this.isAdditive;
    newGroup._enableBlending = this.enableBlending;
    newGroup._blendingSpeed = this.blendingSpeed;
    newGroup.metadata = this.metadata;
    newGroup.mask = this.mask;
    for (const targetAnimation of this._targetedAnimations) {
      newGroup.addTargetedAnimation(cloneAnimations ? targetAnimation.animation.clone() : targetAnimation.animation, targetConverter ? targetConverter(targetAnimation.target) : targetAnimation.target);
    }
    return newGroup;
  }
  /**
   * Serializes the animationGroup to an object
   * @returns Serialized object
   */
  serialize() {
    const serializationObject = {};
    serializationObject.name = this.name;
    serializationObject.from = this.from;
    serializationObject.to = this.to;
    serializationObject.speedRatio = this.speedRatio;
    serializationObject.loopAnimation = this.loopAnimation;
    serializationObject.isAdditive = this.isAdditive;
    serializationObject.weight = this.weight;
    serializationObject.playOrder = this.playOrder;
    serializationObject.enableBlending = this.enableBlending;
    serializationObject.blendingSpeed = this.blendingSpeed;
    serializationObject.targetedAnimations = [];
    for (let targetedAnimationIndex = 0; targetedAnimationIndex < this.targetedAnimations.length; targetedAnimationIndex++) {
      const targetedAnimation = this.targetedAnimations[targetedAnimationIndex];
      serializationObject.targetedAnimations[targetedAnimationIndex] = targetedAnimation.serialize();
    }
    if (Tags && Tags.HasTags(this)) {
      serializationObject.tags = Tags.GetTags(this);
    }
    if (this.metadata) {
      serializationObject.metadata = this.metadata;
    }
    return serializationObject;
  }
  // Statics
  /**
   * Returns a new AnimationGroup object parsed from the source provided.
   * @param parsedAnimationGroup defines the source
   * @param scene defines the scene that will receive the animationGroup
   * @returns a new AnimationGroup
   */
  static Parse(parsedAnimationGroup, scene) {
    const animationGroup = new _AnimationGroup(parsedAnimationGroup.name, scene, parsedAnimationGroup.weight, parsedAnimationGroup.playOrder);
    for (let i = 0; i < parsedAnimationGroup.targetedAnimations.length; i++) {
      const targetedAnimation = parsedAnimationGroup.targetedAnimations[i];
      const animation = Animation.Parse(targetedAnimation.animation);
      const id = targetedAnimation.targetId;
      if (targetedAnimation.animation.property === "influence") {
        const morphTarget = scene.getMorphTargetById(id);
        if (morphTarget) {
          animationGroup.addTargetedAnimation(animation, morphTarget);
        }
      } else {
        const targetNode = scene.getNodeById(id);
        if (targetNode != null) {
          animationGroup.addTargetedAnimation(animation, targetNode);
        }
      }
    }
    if (Tags) {
      Tags.AddTagsTo(animationGroup, parsedAnimationGroup.tags);
    }
    if (parsedAnimationGroup.from !== null && parsedAnimationGroup.to !== null) {
      animationGroup.normalize(parsedAnimationGroup.from, parsedAnimationGroup.to);
    }
    if (parsedAnimationGroup.speedRatio !== void 0) {
      animationGroup._speedRatio = parsedAnimationGroup.speedRatio;
    }
    if (parsedAnimationGroup.loopAnimation !== void 0) {
      animationGroup._loopAnimation = parsedAnimationGroup.loopAnimation;
    }
    if (parsedAnimationGroup.isAdditive !== void 0) {
      animationGroup._isAdditive = parsedAnimationGroup.isAdditive;
    }
    if (parsedAnimationGroup.weight !== void 0) {
      animationGroup._weight = parsedAnimationGroup.weight;
    }
    if (parsedAnimationGroup.playOrder !== void 0) {
      animationGroup._playOrder = parsedAnimationGroup.playOrder;
    }
    if (parsedAnimationGroup.enableBlending !== void 0) {
      animationGroup._enableBlending = parsedAnimationGroup.enableBlending;
    }
    if (parsedAnimationGroup.blendingSpeed !== void 0) {
      animationGroup._blendingSpeed = parsedAnimationGroup.blendingSpeed;
    }
    if (parsedAnimationGroup.metadata !== void 0) {
      animationGroup.metadata = parsedAnimationGroup.metadata;
    }
    return animationGroup;
  }
  /** @internal */
  static MakeAnimationAdditive(sourceAnimationGroup, referenceFrameOrOptions, range, cloneOriginal = false, clonedName) {
    let options;
    if (typeof referenceFrameOrOptions === "object") {
      options = referenceFrameOrOptions;
    } else {
      options = {
        referenceFrame: referenceFrameOrOptions,
        range,
        cloneOriginalAnimationGroup: cloneOriginal,
        clonedAnimationName: clonedName
      };
    }
    let animationGroup = sourceAnimationGroup;
    if (options.cloneOriginalAnimationGroup) {
      animationGroup = sourceAnimationGroup.clone(options.clonedAnimationGroupName || animationGroup.name);
    }
    const targetedAnimations = animationGroup.targetedAnimations;
    for (let index = 0; index < targetedAnimations.length; index++) {
      const targetedAnimation = targetedAnimations[index];
      targetedAnimation.animation = Animation.MakeAnimationAdditive(targetedAnimation.animation, options);
    }
    animationGroup.isAdditive = true;
    if (options.clipKeys) {
      let from = Number.MAX_VALUE;
      let to = -Number.MAX_VALUE;
      const targetedAnimations2 = animationGroup.targetedAnimations;
      for (let index = 0; index < targetedAnimations2.length; index++) {
        const targetedAnimation = targetedAnimations2[index];
        const animation = targetedAnimation.animation;
        const keys = animation.getKeys();
        if (from > keys[0].frame) {
          from = keys[0].frame;
        }
        if (to < keys[keys.length - 1].frame) {
          to = keys[keys.length - 1].frame;
        }
      }
      animationGroup._from = from;
      animationGroup._to = to;
    }
    return animationGroup;
  }
  /**
   * Creates a new animation, keeping only the keys that are inside a given key range
   * @param sourceAnimationGroup defines the animation group on which to operate
   * @param fromKey defines the lower bound of the range
   * @param toKey defines the upper bound of the range
   * @param name defines the name of the new animation group. If not provided, use the same name as animationGroup
   * @param dontCloneAnimations defines whether or not the animations should be cloned before clipping the keys. Default is false, so animations will be cloned
   * @returns a new animation group stripped from all the keys outside the given range
   */
  static ClipKeys(sourceAnimationGroup, fromKey, toKey, name3, dontCloneAnimations) {
    const animationGroup = sourceAnimationGroup.clone(name3 || sourceAnimationGroup.name);
    return _AnimationGroup.ClipKeysInPlace(animationGroup, fromKey, toKey, dontCloneAnimations);
  }
  /**
   * Updates an existing animation, keeping only the keys that are inside a given key range
   * @param animationGroup defines the animation group on which to operate
   * @param fromKey defines the lower bound of the range
   * @param toKey defines the upper bound of the range
   * @param dontCloneAnimations defines whether or not the animations should be cloned before clipping the keys. Default is false, so animations will be cloned
   * @returns the animationGroup stripped from all the keys outside the given range
   */
  static ClipKeysInPlace(animationGroup, fromKey, toKey, dontCloneAnimations) {
    return _AnimationGroup.ClipInPlace(animationGroup, fromKey, toKey, dontCloneAnimations, false);
  }
  /**
   * Creates a new animation, keeping only the frames that are inside a given frame range
   * @param sourceAnimationGroup defines the animation group on which to operate
   * @param fromFrame defines the lower bound of the range
   * @param toFrame defines the upper bound of the range
   * @param name defines the name of the new animation group. If not provided, use the same name as animationGroup
   * @param dontCloneAnimations defines whether or not the animations should be cloned before clipping the frames. Default is false, so animations will be cloned
   * @returns a new animation group stripped from all the frames outside the given range
   */
  static ClipFrames(sourceAnimationGroup, fromFrame, toFrame, name3, dontCloneAnimations) {
    const animationGroup = sourceAnimationGroup.clone(name3 || sourceAnimationGroup.name);
    return _AnimationGroup.ClipFramesInPlace(animationGroup, fromFrame, toFrame, dontCloneAnimations);
  }
  /**
   * Updates an existing animation, keeping only the frames that are inside a given frame range
   * @param animationGroup defines the animation group on which to operate
   * @param fromFrame defines the lower bound of the range
   * @param toFrame defines the upper bound of the range
   * @param dontCloneAnimations defines whether or not the animations should be cloned before clipping the frames. Default is false, so animations will be cloned
   * @returns the animationGroup stripped from all the frames outside the given range
   */
  static ClipFramesInPlace(animationGroup, fromFrame, toFrame, dontCloneAnimations) {
    return _AnimationGroup.ClipInPlace(animationGroup, fromFrame, toFrame, dontCloneAnimations, true);
  }
  /**
   * Updates an existing animation, keeping only the keys that are inside a given key or frame range
   * @param animationGroup defines the animation group on which to operate
   * @param start defines the lower bound of the range
   * @param end defines the upper bound of the range
   * @param dontCloneAnimations defines whether or not the animations should be cloned before clipping the keys. Default is false, so animations will be cloned
   * @param useFrame defines if the range is defined by frame numbers or key indices (default is false which means use key indices)
   * @returns the animationGroup stripped from all the keys outside the given range
   */
  static ClipInPlace(animationGroup, start, end, dontCloneAnimations, useFrame = false) {
    let from = Number.MAX_VALUE;
    let to = -Number.MAX_VALUE;
    const targetedAnimations = animationGroup.targetedAnimations;
    for (let index = 0; index < targetedAnimations.length; index++) {
      const targetedAnimation = targetedAnimations[index];
      const animation = dontCloneAnimations ? targetedAnimation.animation : targetedAnimation.animation.clone();
      if (useFrame) {
        animation.createKeyForFrame(start);
        animation.createKeyForFrame(end);
      }
      const keys = animation.getKeys();
      const newKeys = [];
      let startFrame = Number.MAX_VALUE;
      for (let k = 0; k < keys.length; k++) {
        const key = keys[k];
        if (!useFrame && k >= start && k <= end || useFrame && key.frame >= start && key.frame <= end) {
          const newKey = {
            frame: key.frame,
            value: key.value.clone ? key.value.clone() : key.value,
            inTangent: key.inTangent,
            outTangent: key.outTangent,
            interpolation: key.interpolation,
            lockedTangent: key.lockedTangent
          };
          if (startFrame === Number.MAX_VALUE) {
            startFrame = newKey.frame;
          }
          newKey.frame -= startFrame;
          newKeys.push(newKey);
        }
      }
      if (newKeys.length === 0) {
        targetedAnimations.splice(index, 1);
        index--;
        continue;
      }
      if (from > newKeys[0].frame) {
        from = newKeys[0].frame;
      }
      if (to < newKeys[newKeys.length - 1].frame) {
        to = newKeys[newKeys.length - 1].frame;
      }
      animation.setKeys(newKeys, true);
      targetedAnimation.animation = animation;
    }
    animationGroup._from = from;
    animationGroup._to = to;
    return animationGroup;
  }
  /**
   * Returns the string "AnimationGroup"
   * @returns "AnimationGroup"
   */
  getClassName() {
    return "AnimationGroup";
  }
  /**
   * Creates a detailed string about the object
   * @param fullDetails defines if the output string will support multiple levels of logging within scene loading
   * @returns a string representing the object
   */
  toString(fullDetails) {
    let ret = "Name: " + this.name;
    ret += ", type: " + this.getClassName();
    if (fullDetails) {
      ret += ", from: " + this._from;
      ret += ", to: " + this._to;
      ret += ", isStarted: " + this._isStarted;
      ret += ", speedRatio: " + this._speedRatio;
      ret += ", targetedAnimations length: " + this._targetedAnimations.length;
      ret += ", animatables length: " + this._animatables;
    }
    return ret;
  }
};

export {
  Constants,
  ClipboardEventTypes,
  ClipboardInfo,
  LayerSceneComponent,
  Layer,
  CreateBoxVertexData,
  CreateSegmentedBoxVertexData,
  CreateBox,
  BoxBuilder,
  HandConstraintZone,
  HandConstraintOrientation,
  HandConstraintVisibility,
  HandConstraintBehavior,
  CreatePlaneVertexData,
  CreatePlane,
  PlaneBuilder,
  FadeInOutBehavior,
  FollowBehavior,
  BaseSixDofDragBehavior,
  SixDofDragBehavior,
  SurfaceMagnetismBehavior,
  GizmoAnchorPoint,
  GizmoCoordinatesMode,
  Gizmo,
  PivotTools,
  PointerDragBehavior,
  TargetedAnimation,
  AnimationGroup
};
//# sourceMappingURL=chunk-4TAAHQM4.js.map
