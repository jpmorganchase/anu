import {
  BindBonesParameters,
  BindFogParameters,
  BindLights,
  BindLogDepth,
  BindMorphTargetParameters,
  BindSceneUniformBuffer,
  BindTextureMatrix,
  Camera,
  CompatibilityOptions,
  EffectFallbacks,
  HandleFallbacksForShadows,
  IntersectionInfo,
  Material,
  MaterialDefines,
  MaterialPluginEvent,
  Mesh,
  Node,
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
  Size,
  Texture,
  VertexData,
  addClipPlaneUniforms,
  bindClipPlane,
  prepareStringDefinesForClipPlanes
} from "./chunk-C6RLMJCY.js";
import {
  ImageProcessingConfiguration,
  LightConstants,
  PickingInfo,
  PointerEventTypes,
  PointerInfo,
  Scene,
  SerializationHelper,
  SmartArray,
  UniformBuffer,
  VertexBuffer,
  __decorate,
  expandToProperty,
  serialize,
  serializeAsColor3,
  serializeAsFresnelParameters,
  serializeAsTexture,
  serializeAsVector3
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
  Color3,
  Color4,
  Scalar,
  TmpColors
} from "./chunk-HW4XGYU2.js";
import {
  ArrayTools,
  Epsilon
} from "./chunk-PQO2DACS.js";
import {
  Engine
} from "./chunk-7PMSBYDW.js";
import {
  Tools,
  WebRequest
} from "./chunk-CP55DDXS.js";
import {
  GetClass,
  RegisterClass
} from "./chunk-AJT353ZC.js";
import {
  InternalTexture,
  InternalTextureSource,
  Logger,
  ShaderLanguage,
  ShaderProcessor,
  ShaderStore,
  ThinEngine
} from "./chunk-TFTPPWZW.js";
import {
  EngineStore,
  Observable
} from "./chunk-2PRSVFDC.js";

// node_modules/@babylonjs/core/Engines/Extensions/engine.dynamicTexture.js
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

// node_modules/@babylonjs/core/Materials/Textures/dynamicTexture.js
var DynamicTexture = class _DynamicTexture extends Texture {
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
  constructor(name64, options, scene = null, generateMipMaps = false, samplingMode = 3, format = 5, invertY) {
    super(null, scene, !generateMipMaps, invertY, samplingMode, void 0, void 0, void 0, void 0, format);
    this.name = name64;
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

// node_modules/@babylonjs/core/Meshes/groundMesh.js
Mesh._GroundMeshParser = (parsedMesh, scene) => {
  return GroundMesh.Parse(parsedMesh, scene);
};
var GroundMesh = class _GroundMesh extends Mesh {
  constructor(name64, scene) {
    super(name64, scene);
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
function CreateGround(name64, options = {}, scene) {
  const ground = new GroundMesh(name64, scene);
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
function CreateTiledGround(name64, options, scene = null) {
  const tiledGround = new Mesh(name64, scene);
  const vertexData = CreateTiledGroundVertexData(options);
  vertexData.applyToMesh(tiledGround, options.updatable);
  return tiledGround;
}
function CreateGroundFromHeightMap(name64, url, options = {}, scene = null) {
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
  const ground = new GroundMesh(name64, scene);
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
var GroundBuilder = {
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
Mesh.CreateGround = (name64, width, height, subdivisions, scene, updatable) => {
  const options = {
    width,
    height,
    subdivisions,
    updatable
  };
  return CreateGround(name64, options, scene);
};
Mesh.CreateTiledGround = (name64, xmin, zmin, xmax, zmax, subdivisions, precision, scene, updatable) => {
  const options = {
    xmin,
    zmin,
    xmax,
    zmax,
    subdivisions,
    precision,
    updatable
  };
  return CreateTiledGround(name64, options, scene);
};
Mesh.CreateGroundFromHeightMap = (name64, url, width, height, subdivisions, minHeight, maxHeight, scene, updatable, onReady, alphaFilter) => {
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
  return CreateGroundFromHeightMap(name64, url, options, scene);
};

// node_modules/@babylonjs/core/Materials/materialFlags.js
var MaterialFlags = class {
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

// node_modules/@babylonjs/core/Materials/materialPluginManager.js
var rxOption = new RegExp("^([gimus]+)!");
var MaterialPluginManager = class _MaterialPluginManager {
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
  getPlugin(name64) {
    for (let i = 0; i < this._plugins.length; ++i) {
      if (this._plugins[i].name === name64) {
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
var plugins = [];
var inited = false;
var observer = null;
function RegisterMaterialPlugin(pluginName, factory) {
  if (!inited) {
    observer = Material.OnEventObservable.add((material) => {
      for (const [, factory2] of plugins) {
        factory2(material);
      }
    }, MaterialPluginEvent.Created);
    inited = true;
  }
  const existing = plugins.filter(([name64, _factory]) => name64 === pluginName);
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

// node_modules/@babylonjs/core/Materials/materialPluginBase.js
var MaterialPluginBase = class {
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
  constructor(material, name64, priority, defines, addToPluginList = true, enable = false, resolveIncludes = false) {
    this.priority = 500;
    this.resolveIncludes = false;
    this.registerForExtraEvents = false;
    this._material = material;
    this.name = name64;
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

// node_modules/@babylonjs/core/Materials/material.detailMapConfiguration.js
var MaterialDetailMapDefines = class extends MaterialDefines {
  constructor() {
    super(...arguments);
    this.DETAIL = false;
    this.DETAILDIRECTUV = 0;
    this.DETAIL_NORMALBLENDMETHOD = 0;
  }
};
var DetailMapConfiguration = class extends MaterialPluginBase {
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

// node_modules/@babylonjs/core/Materials/prePassConfiguration.js
var PrePassConfiguration = class {
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/decalFragmentDeclaration.js
var name = "decalFragmentDeclaration";
var shader = `#ifdef DECAL
uniform vec4 vDecalInfos;
#endif
`;
ShaderStore.IncludesShadersStore[name] = shader;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultFragmentDeclaration.js
var name2 = "defaultFragmentDeclaration";
var shader2 = `uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/sceneUboDeclaration.js
var name3 = "sceneUboDeclaration";
var shader3 = `layout(std140,column_major) uniform;uniform Scene {mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;mat4 projection;vec4 vEyePosition;};
`;
ShaderStore.IncludesShadersStore[name3] = shader3;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/meshUboDeclaration.js
var name4 = "meshUboDeclaration";
var shader4 = `#ifdef WEBGL2
uniform mat4 world;uniform float visibility;
#else
layout(std140,column_major) uniform;uniform Mesh
{mat4 world;float visibility;};
#endif
#define WORLD_UBO
`;
ShaderStore.IncludesShadersStore[name4] = shader4;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultUboDeclaration.js
var name5 = "defaultUboDeclaration";
var shader5 = `layout(std140,column_major) uniform;uniform Material
{vec4 diffuseLeftColor;vec4 diffuseRightColor;vec4 opacityParts;vec4 reflectionLeftColor;vec4 reflectionRightColor;vec4 refractionLeftColor;vec4 refractionRightColor;vec4 emissiveLeftColor;vec4 emissiveRightColor;vec2 vDiffuseInfos;vec2 vAmbientInfos;vec2 vOpacityInfos;vec2 vReflectionInfos;vec3 vReflectionPosition;vec3 vReflectionSize;vec2 vEmissiveInfos;vec2 vLightmapInfos;vec2 vSpecularInfos;vec3 vBumpInfos;mat4 diffuseMatrix;mat4 ambientMatrix;mat4 opacityMatrix;mat4 reflectionMatrix;mat4 emissiveMatrix;mat4 lightmapMatrix;mat4 specularMatrix;mat4 bumpMatrix;vec2 vTangentSpaceParams;float pointSize;float alphaCutOff;mat4 refractionMatrix;vec4 vRefractionInfos;vec3 vRefractionPosition;vec3 vRefractionSize;vec4 vSpecularColor;vec3 vEmissiveColor;vec4 vDiffuseColor;vec3 vAmbientColor;
#define ADDITIONAL_UBO_DECLARATION
};
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
ShaderStore.IncludesShadersStore[name5] = shader5;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassDeclaration.js
var name6 = "prePassDeclaration";
var shader6 = `#ifdef PREPASS
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/oitDeclaration.js
var name7 = "oitDeclaration";
var shader7 = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
#extension GL_EXT_draw_buffers : require
layout(location=0) out vec2 depth; 
layout(location=1) out vec4 frontColor;layout(location=2) out vec4 backColor;
#define MAX_DEPTH 99999.0
highp vec4 gl_FragColor;uniform sampler2D oitDepthSampler;uniform sampler2D oitFrontColorSampler;
#endif
`;
ShaderStore.IncludesShadersStore[name7] = shader7;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/mainUVVaryingDeclaration.js
var name8 = "mainUVVaryingDeclaration";
var shader8 = `#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;
ShaderStore.IncludesShadersStore[name8] = shader8;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/helperFunctions.js
var name9 = "helperFunctions";
var shader9 = `const float PI=3.1415926535897932384626433832795;const float RECIPROCAL_PI=0.3183098861837907;const float RECIPROCAL_PI2=0.15915494309189535;const float HALF_MIN=5.96046448e-08; 
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightFragmentDeclaration.js
var name10 = "lightFragmentDeclaration";
var shader10 = `#ifdef LIGHT{X}
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightUboDeclaration.js
var name11 = "lightUboDeclaration";
var shader11 = `#ifdef LIGHT{X}
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightsFragmentFunctions.js
var name12 = "lightsFragmentFunctions";
var shader12 = `struct lightingInfo
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/shadowsFragmentFunctions.js
var name13 = "shadowsFragmentFunctions";
var shader13 = `#ifdef SHADOWS
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerFragmentDeclaration.js
var name14 = "samplerFragmentDeclaration";
var shader14 = `#ifdef _DEFINENAME_
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fresnelFunction.js
var name15 = "fresnelFunction";
var shader15 = `#ifdef FRESNEL
float computeFresnelTerm(vec3 viewDirection,vec3 worldNormal,float bias,float power)
{float fresnelTerm=pow(bias+abs(dot(viewDirection,worldNormal)),power);return clamp(fresnelTerm,0.,1.);}
#endif
`;
ShaderStore.IncludesShadersStore[name15] = shader15;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/reflectionFunction.js
var name16 = "reflectionFunction";
var shader16 = `vec3 computeFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/imageProcessingDeclaration.js
var name17 = "imageProcessingDeclaration";
var shader17 = `#ifdef EXPOSURE
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/imageProcessingFunctions.js
var name18 = "imageProcessingFunctions";
var shader18 = `#if defined(COLORGRADING) && !defined(COLORGRADING3D)
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragmentMainFunctions.js
var name19 = "bumpFragmentMainFunctions";
var shader19 = `#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragmentFunctions.js
var name20 = "bumpFragmentFunctions";
var shader20 = `#if defined(BUMP)
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneFragmentDeclaration.js
var name21 = "clipPlaneFragmentDeclaration";
var shader21 = `#ifdef CLIPPLANE
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthDeclaration.js
var name22 = "logDepthDeclaration";
var shader22 = `#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;
ShaderStore.IncludesShadersStore[name22] = shader22;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogFragmentDeclaration.js
var name23 = "fogFragmentDeclaration";
var shader23 = `#ifdef FOG
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneFragment.js
var name24 = "clipPlaneFragment";
var shader24 = `#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpFragment.js
var name25 = "bumpFragment";
var shader25 = `vec2 uvOffset=vec2(0.0,0.0);
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/decalFragment.js
var name26 = "decalFragment";
var shader26 = `#ifdef DECAL
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/depthPrePass.js
var name27 = "depthPrePass";
var shader27 = `#ifdef DEPTHPREPASS
gl_FragColor=vec4(0.,0.,0.,1.0);return;
#endif
`;
ShaderStore.IncludesShadersStore[name27] = shader27;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightFragment.js
var name28 = "lightFragment";
var shader28 = `#ifdef LIGHT{X}
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthFragment.js
var name29 = "logDepthFragment";
var shader29 = `#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;
ShaderStore.IncludesShadersStore[name29] = shader29;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogFragment.js
var name30 = "fogFragment";
var shader30 = `#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;
ShaderStore.IncludesShadersStore[name30] = shader30;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/oitFragment.js
var name31 = "oitFragment";
var shader31 = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
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

// node_modules/@babylonjs/core/Shaders/default.fragment.js
var name32 = "defaultPixelShader";
var shader32 = `#include<__decl__defaultFragment>
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/decalVertexDeclaration.js
var name33 = "decalVertexDeclaration";
var shader33 = `#ifdef DECAL
uniform vec4 vDecalInfos;uniform mat4 decalMatrix;
#endif
`;
ShaderStore.IncludesShadersStore[name33] = shader33;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/defaultVertexDeclaration.js
var name34 = "defaultVertexDeclaration";
var shader34 = `uniform mat4 viewProjection;uniform mat4 view;
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/uvAttributeDeclaration.js
var name35 = "uvAttributeDeclaration";
var shader35 = `#ifdef UV{X}
attribute vec2 uv{X};
#endif
`;
ShaderStore.IncludesShadersStore[name35] = shader35;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bonesDeclaration.js
var name36 = "bonesDeclaration";
var shader36 = `#if NUM_BONE_INFLUENCERS>0
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimationDeclaration.js
var name37 = "bakedVertexAnimationDeclaration";
var shader37 = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/instancesDeclaration.js
var name38 = "instancesDeclaration";
var shader38 = `#ifdef INSTANCES
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassVertexDeclaration.js
var name39 = "prePassVertexDeclaration";
var shader39 = `#ifdef PREPASS
#ifdef PREPASS_DEPTH
varying vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
uniform mat4 previousViewProjection;varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;
#endif
#endif
`;
ShaderStore.IncludesShadersStore[name39] = shader39;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerVertexDeclaration.js
var name40 = "samplerVertexDeclaration";
var shader40 = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
varying vec2 v_VARYINGNAME_UV;
#endif
`;
ShaderStore.IncludesShadersStore[name40] = shader40;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpVertexDeclaration.js
var name41 = "bumpVertexDeclaration";
var shader41 = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#endif
`;
ShaderStore.IncludesShadersStore[name41] = shader41;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertexDeclaration.js
var name42 = "clipPlaneVertexDeclaration";
var shader42 = `#ifdef CLIPPLANE
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogVertexDeclaration.js
var name43 = "fogVertexDeclaration";
var shader43 = `#ifdef FOG
varying vec3 vFogDistance;
#endif
`;
ShaderStore.IncludesShadersStore[name43] = shader43;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightVxFragmentDeclaration.js
var name44 = "lightVxFragmentDeclaration";
var shader44 = `#ifdef LIGHT{X}
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/lightVxUboDeclaration.js
var name45 = "lightVxUboDeclaration";
var shader45 = `#ifdef LIGHT{X}
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexGlobalDeclaration.js
var name46 = "morphTargetsVertexGlobalDeclaration";
var shader46 = `#ifdef MORPHTARGETS
uniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];
#ifdef MORPHTARGETS_TEXTURE 
uniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];uniform vec3 morphTargetTextureInfo;uniform highp sampler2DArray morphTargets;vec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)
{ 
float y=floor(vertexIndex/morphTargetTextureInfo.y);float x=vertexIndex-y*morphTargetTextureInfo.y;vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);return texture(morphTargets,textureUV).xyz;}
#endif
#endif
`;
ShaderStore.IncludesShadersStore[name46] = shader46;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexDeclaration.js
var name47 = "morphTargetsVertexDeclaration";
var shader47 = `#ifdef MORPHTARGETS
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertexGlobal.js
var name48 = "morphTargetsVertexGlobal";
var shader48 = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;
ShaderStore.IncludesShadersStore[name48] = shader48;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/morphTargetsVertex.js
var name49 = "morphTargetsVertex";
var shader49 = `#ifdef MORPHTARGETS
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/instancesVertex.js
var name50 = "instancesVertex";
var shader50 = `#ifdef INSTANCES
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bonesVertex.js
var name51 = "bonesVertex";
var shader51 = `#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimation.js
var name52 = "bakedVertexAnimation";
var shader52 = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/prePassVertex.js
var name53 = "prePassVertex";
var shader53 = `#ifdef PREPASS_DEPTH
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/uvVariableDeclaration.js
var name54 = "uvVariableDeclaration";
var shader54 = `#if !defined(UV{X}) && defined(MAINUV{X})
vec2 uv{X}=vec2(0.,0.);
#endif
#ifdef MAINUV{X}
vMainUV{X}=uv{X};
#endif
`;
ShaderStore.IncludesShadersStore[name54] = shader54;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/samplerVertexImplementation.js
var name55 = "samplerVertexImplementation";
var shader55 = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/bumpVertex.js
var name56 = "bumpVertex";
var shader56 = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
vec3 tbnNormal=normalize(normalUpdated);vec3 tbnTangent=normalize(tangentUpdated.xyz);vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);
#endif
#endif
`;
ShaderStore.IncludesShadersStore[name56] = shader56;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertex.js
var name57 = "clipPlaneVertex";
var shader57 = `#ifdef CLIPPLANE
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/fogVertex.js
var name58 = "fogVertex";
var shader58 = `#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;
ShaderStore.IncludesShadersStore[name58] = shader58;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/shadowsVertex.js
var name59 = "shadowsVertex";
var shader59 = `#ifdef SHADOWS
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/vertexColorMixing.js
var name60 = "vertexColorMixing";
var shader60 = `#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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

// node_modules/@babylonjs/core/Shaders/ShadersInclude/pointCloudVertex.js
var name61 = "pointCloudVertex";
var shader61 = `#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;
ShaderStore.IncludesShadersStore[name61] = shader61;

// node_modules/@babylonjs/core/Shaders/ShadersInclude/logDepthVertex.js
var name62 = "logDepthVertex";
var shader62 = `#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;
ShaderStore.IncludesShadersStore[name62] = shader62;

// node_modules/@babylonjs/core/Shaders/default.vertex.js
var name63 = "defaultVertexShader";
var shader63 = `#include<__decl__defaultVertex>
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

// node_modules/@babylonjs/core/Materials/standardMaterial.js
var onCreatedEffectParameters = { effect: null, subMesh: null };
var StandardMaterialDefines = class extends MaterialDefines {
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
var StandardMaterial = class _StandardMaterial extends PushMaterial {
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
  constructor(name64, scene) {
    super(name64, scene);
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
  clone(name64, cloneTexturesOnlyOnce = true, rootUrl = "") {
    const result = SerializationHelper.Clone(() => new _StandardMaterial(name64, this.getScene()), this, { cloneTexturesOnlyOnce });
    result.name = name64;
    result.id = name64;
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

// node_modules/@babylonjs/core/Lights/light.js
var Light = class _Light extends Node {
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
  constructor(name64, scene) {
    super(name64, scene);
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
    this._uniformBuffer = new UniformBuffer(this.getScene().getEngine(), void 0, void 0, name64);
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
  clone(name64, newParent = null) {
    const constructor = _Light.GetConstructorFromName(this.getTypeID(), name64, this.getScene());
    if (!constructor) {
      return null;
    }
    const clonedLight = SerializationHelper.Clone(constructor, this);
    if (name64) {
      clonedLight.name = name64;
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
  static GetConstructorFromName(type, name64, scene) {
    const constructorFunc = Node.Construct("Light_Type_" + type, name64, scene);
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

// node_modules/@babylonjs/core/Lights/hemisphericLight.js
Node.AddNodeConstructor("Light_Type_3", (name64, scene) => {
  return () => new HemisphericLight(name64, Vector3.Zero(), scene);
});
var HemisphericLight = class extends Light {
  /**
   * Creates a HemisphericLight object in the scene according to the passed direction (Vector3).
   * The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction.
   * The HemisphericLight can't cast shadows.
   * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
   * @param name The friendly name of the light
   * @param direction The direction of the light reflection
   * @param scene The scene the light belongs to
   */
  constructor(name64, direction, scene) {
    super(name64, scene);
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

// node_modules/@babylonjs/core/Rendering/utilityLayerRenderer.js
var UtilityLayerRenderer = class _UtilityLayerRenderer {
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

// node_modules/@babylonjs/core/Materials/shaderMaterial.js
var onCreatedEffectParameters2 = { effect: null, subMesh: null };
var ShaderMaterial = class _ShaderMaterial extends PushMaterial {
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
  constructor(name64, scene, shaderPath, options = {}, storeEffectOnSubMeshes = true) {
    super(name64, scene, storeEffectOnSubMeshes);
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
  setTexture(name64, texture) {
    if (this._options.samplers.indexOf(name64) === -1) {
      this._options.samplers.push(name64);
    }
    this._textures[name64] = texture;
    return this;
  }
  /**
   * Set a texture array in the shader.
   * @param name Define the name of the uniform sampler array as defined in the shader
   * @param textures Define the list of textures to bind to this sampler
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setTextureArray(name64, textures) {
    if (this._options.samplers.indexOf(name64) === -1) {
      this._options.samplers.push(name64);
    }
    this._checkUniform(name64);
    this._textureArrays[name64] = textures;
    return this;
  }
  /**
   * Set an internal texture in the shader.
   * @param name Define the name of the uniform samplers as defined in the shader
   * @param texture Define the texture to bind to this sampler
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setExternalTexture(name64, texture) {
    if (this._options.externalTextures.indexOf(name64) === -1) {
      this._options.externalTextures.push(name64);
    }
    this._externalTextures[name64] = texture;
    return this;
  }
  /**
   * Set a float in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setFloat(name64, value) {
    this._checkUniform(name64);
    this._floats[name64] = value;
    return this;
  }
  /**
   * Set a int in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setInt(name64, value) {
    this._checkUniform(name64);
    this._ints[name64] = value;
    return this;
  }
  /**
   * Set a unsigned int in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setUInt(name64, value) {
    this._checkUniform(name64);
    this._uints[name64] = value;
    return this;
  }
  /**
   * Set an array of floats in the shader.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setFloats(name64, value) {
    this._checkUniform(name64);
    this._floatsArrays[name64] = value;
    return this;
  }
  /**
   * Set a vec3 in the shader from a Color3.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setColor3(name64, value) {
    this._checkUniform(name64);
    this._colors3[name64] = value;
    return this;
  }
  /**
   * Set a vec3 array in the shader from a Color3 array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setColor3Array(name64, value) {
    this._checkUniform(name64);
    this._colors3Arrays[name64] = value.reduce((arr, color) => {
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
  setColor4(name64, value) {
    this._checkUniform(name64);
    this._colors4[name64] = value;
    return this;
  }
  /**
   * Set a vec4 array in the shader from a Color4 array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setColor4Array(name64, value) {
    this._checkUniform(name64);
    this._colors4Arrays[name64] = value.reduce((arr, color) => {
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
  setVector2(name64, value) {
    this._checkUniform(name64);
    this._vectors2[name64] = value;
    return this;
  }
  /**
   * Set a vec3 in the shader from a Vector3.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setVector3(name64, value) {
    this._checkUniform(name64);
    this._vectors3[name64] = value;
    return this;
  }
  /**
   * Set a vec4 in the shader from a Vector4.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setVector4(name64, value) {
    this._checkUniform(name64);
    this._vectors4[name64] = value;
    return this;
  }
  /**
   * Set a vec4 in the shader from a Quaternion.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setQuaternion(name64, value) {
    this._checkUniform(name64);
    this._quaternions[name64] = value;
    return this;
  }
  /**
   * Set a vec4 array in the shader from a Quaternion array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setQuaternionArray(name64, value) {
    this._checkUniform(name64);
    this._quaternionsArrays[name64] = value.reduce((arr, quaternion) => {
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
  setMatrix(name64, value) {
    this._checkUniform(name64);
    this._matrices[name64] = value;
    return this;
  }
  /**
   * Set a float32Array in the shader from a matrix array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setMatrices(name64, value) {
    this._checkUniform(name64);
    const float32Array = new Float32Array(value.length * 16);
    for (let index = 0; index < value.length; index++) {
      const matrix = value[index];
      matrix.copyToArray(float32Array, index * 16);
    }
    this._matrixArrays[name64] = float32Array;
    return this;
  }
  /**
   * Set a mat3 in the shader from a Float32Array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setMatrix3x3(name64, value) {
    this._checkUniform(name64);
    this._matrices3x3[name64] = value;
    return this;
  }
  /**
   * Set a mat2 in the shader from a Float32Array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setMatrix2x2(name64, value) {
    this._checkUniform(name64);
    this._matrices2x2[name64] = value;
    return this;
  }
  /**
   * Set a vec2 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setArray2(name64, value) {
    this._checkUniform(name64);
    this._vectors2Arrays[name64] = value;
    return this;
  }
  /**
   * Set a vec3 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setArray3(name64, value) {
    this._checkUniform(name64);
    this._vectors3Arrays[name64] = value;
    return this;
  }
  /**
   * Set a vec4 array in the shader from a number array.
   * @param name Define the name of the uniform as defined in the shader
   * @param value Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setArray4(name64, value) {
    this._checkUniform(name64);
    this._vectors4Arrays[name64] = value;
    return this;
  }
  /**
   * Set a uniform buffer in the shader
   * @param name Define the name of the uniform as defined in the shader
   * @param buffer Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setUniformBuffer(name64, buffer) {
    if (this._options.uniformBuffers.indexOf(name64) === -1) {
      this._options.uniformBuffers.push(name64);
    }
    this._uniformBuffers[name64] = buffer;
    return this;
  }
  /**
   * Set a texture sampler in the shader
   * @param name Define the name of the uniform as defined in the shader
   * @param sampler Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setTextureSampler(name64, sampler) {
    if (this._options.samplerObjects.indexOf(name64) === -1) {
      this._options.samplerObjects.push(name64);
    }
    this._textureSamplers[name64] = sampler;
    return this;
  }
  /**
   * Set a storage buffer in the shader
   * @param name Define the name of the storage buffer as defined in the shader
   * @param buffer Define the value to give to the uniform
   * @returns the material itself allowing "fluent" like uniform updates
   */
  setStorageBuffer(name64, buffer) {
    if (this._options.storageBuffers.indexOf(name64) === -1) {
      this._options.storageBuffers.push(name64);
    }
    this._storageBuffers[name64] = buffer;
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
    for (const name64 in this._textures) {
      if (!this._textures[name64].isReady()) {
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
      let name64;
      for (name64 in this._textures) {
        effect.setTexture(name64, this._textures[name64]);
      }
      for (name64 in this._textureArrays) {
        effect.setTextureArray(name64, this._textureArrays[name64]);
      }
      for (name64 in this._externalTextures) {
        effect.setExternalTexture(name64, this._externalTextures[name64]);
      }
      for (name64 in this._ints) {
        effect.setInt(name64, this._ints[name64]);
      }
      for (name64 in this._uints) {
        effect.setUInt(name64, this._uints[name64]);
      }
      for (name64 in this._floats) {
        effect.setFloat(name64, this._floats[name64]);
      }
      for (name64 in this._floatsArrays) {
        effect.setArray(name64, this._floatsArrays[name64]);
      }
      for (name64 in this._colors3) {
        effect.setColor3(name64, this._colors3[name64]);
      }
      for (name64 in this._colors3Arrays) {
        effect.setArray3(name64, this._colors3Arrays[name64]);
      }
      for (name64 in this._colors4) {
        const color = this._colors4[name64];
        effect.setFloat4(name64, color.r, color.g, color.b, color.a);
      }
      for (name64 in this._colors4Arrays) {
        effect.setArray4(name64, this._colors4Arrays[name64]);
      }
      for (name64 in this._vectors2) {
        effect.setVector2(name64, this._vectors2[name64]);
      }
      for (name64 in this._vectors3) {
        effect.setVector3(name64, this._vectors3[name64]);
      }
      for (name64 in this._vectors4) {
        effect.setVector4(name64, this._vectors4[name64]);
      }
      for (name64 in this._quaternions) {
        effect.setQuaternion(name64, this._quaternions[name64]);
      }
      for (name64 in this._matrices) {
        effect.setMatrix(name64, this._matrices[name64]);
      }
      for (name64 in this._matrixArrays) {
        effect.setMatrices(name64, this._matrixArrays[name64]);
      }
      for (name64 in this._matrices3x3) {
        effect.setMatrix3x3(name64, this._matrices3x3[name64]);
      }
      for (name64 in this._matrices2x2) {
        effect.setMatrix2x2(name64, this._matrices2x2[name64]);
      }
      for (name64 in this._vectors2Arrays) {
        effect.setArray2(name64, this._vectors2Arrays[name64]);
      }
      for (name64 in this._vectors3Arrays) {
        effect.setArray3(name64, this._vectors3Arrays[name64]);
      }
      for (name64 in this._vectors4Arrays) {
        effect.setArray4(name64, this._vectors4Arrays[name64]);
      }
      for (name64 in this._quaternionsArrays) {
        effect.setArray4(name64, this._quaternionsArrays[name64]);
      }
      for (name64 in this._uniformBuffers) {
        const buffer = this._uniformBuffers[name64].getBuffer();
        if (buffer) {
          effect.bindUniformBuffer(buffer, name64);
        }
      }
      for (name64 in this._textureSamplers) {
        effect.setTextureSampler(name64, this._textureSamplers[name64]);
      }
      for (name64 in this._storageBuffers) {
        effect.setStorageBuffer(name64, this._storageBuffers[name64]);
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
    for (const name64 in this._textures) {
      activeTextures.push(this._textures[name64]);
    }
    for (const name64 in this._textureArrays) {
      const array = this._textureArrays[name64];
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
    for (const name64 in this._textures) {
      if (this._textures[name64] === texture) {
        return true;
      }
    }
    for (const name64 in this._textureArrays) {
      const array = this._textureArrays[name64];
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
  clone(name64) {
    const result = SerializationHelper.Clone(() => new _ShaderMaterial(name64, this.getScene(), this._shaderPath, this._options, this._storeEffectOnSubMeshes), this);
    result.name = name64;
    result.id = name64;
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
      let name64;
      for (name64 in this._textures) {
        this._textures[name64].dispose();
      }
      for (name64 in this._textureArrays) {
        const array = this._textureArrays[name64];
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
    let name64;
    serializationObject.stencil = this.stencil.serialize();
    serializationObject.textures = {};
    for (name64 in this._textures) {
      serializationObject.textures[name64] = this._textures[name64].serialize();
    }
    serializationObject.textureArrays = {};
    for (name64 in this._textureArrays) {
      serializationObject.textureArrays[name64] = [];
      const array = this._textureArrays[name64];
      for (let index = 0; index < array.length; index++) {
        serializationObject.textureArrays[name64].push(array[index].serialize());
      }
    }
    serializationObject.ints = {};
    for (name64 in this._ints) {
      serializationObject.ints[name64] = this._ints[name64];
    }
    serializationObject.uints = {};
    for (name64 in this._uints) {
      serializationObject.uints[name64] = this._uints[name64];
    }
    serializationObject.floats = {};
    for (name64 in this._floats) {
      serializationObject.floats[name64] = this._floats[name64];
    }
    serializationObject.floatsArrays = {};
    for (name64 in this._floatsArrays) {
      serializationObject.floatsArrays[name64] = this._floatsArrays[name64];
    }
    serializationObject.colors3 = {};
    for (name64 in this._colors3) {
      serializationObject.colors3[name64] = this._colors3[name64].asArray();
    }
    serializationObject.colors3Arrays = {};
    for (name64 in this._colors3Arrays) {
      serializationObject.colors3Arrays[name64] = this._colors3Arrays[name64];
    }
    serializationObject.colors4 = {};
    for (name64 in this._colors4) {
      serializationObject.colors4[name64] = this._colors4[name64].asArray();
    }
    serializationObject.colors4Arrays = {};
    for (name64 in this._colors4Arrays) {
      serializationObject.colors4Arrays[name64] = this._colors4Arrays[name64];
    }
    serializationObject.vectors2 = {};
    for (name64 in this._vectors2) {
      serializationObject.vectors2[name64] = this._vectors2[name64].asArray();
    }
    serializationObject.vectors3 = {};
    for (name64 in this._vectors3) {
      serializationObject.vectors3[name64] = this._vectors3[name64].asArray();
    }
    serializationObject.vectors4 = {};
    for (name64 in this._vectors4) {
      serializationObject.vectors4[name64] = this._vectors4[name64].asArray();
    }
    serializationObject.quaternions = {};
    for (name64 in this._quaternions) {
      serializationObject.quaternions[name64] = this._quaternions[name64].asArray();
    }
    serializationObject.matrices = {};
    for (name64 in this._matrices) {
      serializationObject.matrices[name64] = this._matrices[name64].asArray();
    }
    serializationObject.matrixArray = {};
    for (name64 in this._matrixArrays) {
      serializationObject.matrixArray[name64] = this._matrixArrays[name64];
    }
    serializationObject.matrices3x3 = {};
    for (name64 in this._matrices3x3) {
      serializationObject.matrices3x3[name64] = this._matrices3x3[name64];
    }
    serializationObject.matrices2x2 = {};
    for (name64 in this._matrices2x2) {
      serializationObject.matrices2x2[name64] = this._matrices2x2[name64];
    }
    serializationObject.vectors2Arrays = {};
    for (name64 in this._vectors2Arrays) {
      serializationObject.vectors2Arrays[name64] = this._vectors2Arrays[name64];
    }
    serializationObject.vectors3Arrays = {};
    for (name64 in this._vectors3Arrays) {
      serializationObject.vectors3Arrays[name64] = this._vectors3Arrays[name64];
    }
    serializationObject.vectors4Arrays = {};
    for (name64 in this._vectors4Arrays) {
      serializationObject.vectors4Arrays[name64] = this._vectors4Arrays[name64];
    }
    serializationObject.quaternionsArrays = {};
    for (name64 in this._quaternionsArrays) {
      serializationObject.quaternionsArrays[name64] = this._quaternionsArrays[name64];
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
    let name64;
    if (source.stencil) {
      material.stencil.parse(source.stencil, scene, rootUrl);
    }
    for (name64 in source.textures) {
      material.setTexture(name64, Texture.Parse(source.textures[name64], scene, rootUrl));
    }
    for (name64 in source.textureArrays) {
      const array = source.textureArrays[name64];
      const textureArray = [];
      for (let index = 0; index < array.length; index++) {
        textureArray.push(Texture.Parse(array[index], scene, rootUrl));
      }
      material.setTextureArray(name64, textureArray);
    }
    for (name64 in source.ints) {
      material.setInt(name64, source.ints[name64]);
    }
    for (name64 in source.uints) {
      material.setUInt(name64, source.uints[name64]);
    }
    for (name64 in source.floats) {
      material.setFloat(name64, source.floats[name64]);
    }
    for (name64 in source.floatsArrays) {
      material.setFloats(name64, source.floatsArrays[name64]);
    }
    for (name64 in source.colors3) {
      material.setColor3(name64, Color3.FromArray(source.colors3[name64]));
    }
    for (name64 in source.colors3Arrays) {
      const colors = source.colors3Arrays[name64].reduce((arr, num, i) => {
        if (i % 3 === 0) {
          arr.push([num]);
        } else {
          arr[arr.length - 1].push(num);
        }
        return arr;
      }, []).map((color) => Color3.FromArray(color));
      material.setColor3Array(name64, colors);
    }
    for (name64 in source.colors4) {
      material.setColor4(name64, Color4.FromArray(source.colors4[name64]));
    }
    for (name64 in source.colors4Arrays) {
      const colors = source.colors4Arrays[name64].reduce((arr, num, i) => {
        if (i % 4 === 0) {
          arr.push([num]);
        } else {
          arr[arr.length - 1].push(num);
        }
        return arr;
      }, []).map((color) => Color4.FromArray(color));
      material.setColor4Array(name64, colors);
    }
    for (name64 in source.vectors2) {
      material.setVector2(name64, Vector2.FromArray(source.vectors2[name64]));
    }
    for (name64 in source.vectors3) {
      material.setVector3(name64, Vector3.FromArray(source.vectors3[name64]));
    }
    for (name64 in source.vectors4) {
      material.setVector4(name64, Vector4.FromArray(source.vectors4[name64]));
    }
    for (name64 in source.quaternions) {
      material.setQuaternion(name64, Quaternion.FromArray(source.quaternions[name64]));
    }
    for (name64 in source.matrices) {
      material.setMatrix(name64, Matrix.FromArray(source.matrices[name64]));
    }
    for (name64 in source.matrixArray) {
      material._matrixArrays[name64] = new Float32Array(source.matrixArray[name64]);
    }
    for (name64 in source.matrices3x3) {
      material.setMatrix3x3(name64, source.matrices3x3[name64]);
    }
    for (name64 in source.matrices2x2) {
      material.setMatrix2x2(name64, source.matrices2x2[name64]);
    }
    for (name64 in source.vectors2Arrays) {
      material.setArray2(name64, source.vectors2Arrays[name64]);
    }
    for (name64 in source.vectors3Arrays) {
      material.setArray3(name64, source.vectors3Arrays[name64]);
    }
    for (name64 in source.vectors4Arrays) {
      material.setArray4(name64, source.vectors4Arrays[name64]);
    }
    for (name64 in source.quaternionsArrays) {
      material.setArray4(name64, source.quaternionsArrays[name64]);
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
  static ParseFromFileAsync(name64, url, scene, rootUrl = "") {
    return new Promise((resolve, reject) => {
      const request = new WebRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState == 4) {
          if (request.status == 200) {
            const serializationObject = JSON.parse(request.responseText);
            const output = this.Parse(serializationObject, scene || EngineStore.LastCreatedScene, rootUrl);
            if (name64) {
              output.name = name64;
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

// node_modules/@babylonjs/core/Culling/ray.js
var Ray = class _Ray {
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

// node_modules/@babylonjs/core/Animations/animationKey.js
var AnimationKeyInterpolation;
(function(AnimationKeyInterpolation2) {
  AnimationKeyInterpolation2[AnimationKeyInterpolation2["NONE"] = 0] = "NONE";
  AnimationKeyInterpolation2[AnimationKeyInterpolation2["STEP"] = 1] = "STEP";
})(AnimationKeyInterpolation || (AnimationKeyInterpolation = {}));

// node_modules/@babylonjs/core/Animations/animationRange.js
var AnimationRange = class _AnimationRange {
  /**
   * Initializes the range of an animation
   * @param name The name of the animation range
   * @param from The starting frame of the animation
   * @param to The ending frame of the animation
   */
  constructor(name64, from, to) {
    this.name = name64;
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

// node_modules/@babylonjs/core/Animations/animation.js
var _staticOffsetValueQuaternion = Object.freeze(new Quaternion(0, 0, 0, 0));
var _staticOffsetValueVector3 = Object.freeze(Vector3.Zero());
var _staticOffsetValueVector2 = Object.freeze(Vector2.Zero());
var _staticOffsetValueSize = Object.freeze(Size.Zero());
var _staticOffsetValueColor3 = Object.freeze(Color3.Black());
var _staticOffsetValueColor4 = Object.freeze(new Color4(0, 0, 0, 0));
var evaluateAnimationState = {
  key: 0,
  repeatCount: 0,
  loopMode: 2
};
var Animation = class _Animation {
  /**
   * @internal Internal use
   */
  static _PrepareAnimation(name64, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction) {
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
    const animation = new _Animation(name64, targetProperty, framePerSecond, dataType, loopMode);
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
  static CreateAndStartAnimation(name64, target, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd, scene) {
    const animation = _Animation._PrepareAnimation(name64, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);
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
  static CreateAndStartHierarchyAnimation(name64, node, directDescendantsOnly, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) {
    const animation = _Animation._PrepareAnimation(name64, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);
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
  static CreateMergeAndStartAnimation(name64, node, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) {
    const animation = _Animation._PrepareAnimation(name64, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction);
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
  constructor(name64, targetProperty, framePerSecond, dataType, loopMode, enableBlending) {
    this.name = name64;
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
      for (const name64 in this._ranges) {
        if (first) {
          ret += ", ";
          first = false;
        }
        ret += name64;
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
  createRange(name64, from, to) {
    if (!this._ranges[name64]) {
      this._ranges[name64] = new AnimationRange(name64, from, to);
    }
  }
  /**
   * Deletes an animation range by name
   * @param name Name of the animation range to delete
   * @param deleteFrames Specifies if the key frames for the range should also be deleted (true) or not (false)
   */
  deleteRange(name64, deleteFrames = true) {
    const range = this._ranges[name64];
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
    this._ranges[name64] = null;
  }
  /**
   * Gets the animation range by name, or null if not defined
   * @param name Name of the animation range
   * @returns Nullable animation range
   */
  getRange(name64) {
    return this._ranges[name64];
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
      for (const name64 in this._ranges) {
        const range = this._ranges[name64];
        if (!range) {
          continue;
        }
        clone._ranges[name64] = range.clone();
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
    for (const name64 in this._ranges) {
      const source = this._ranges[name64];
      if (!source) {
        continue;
      }
      const range = {};
      range.name = name64;
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
  static ParseFromFileAsync(name64, url) {
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
              if (name64) {
                output.name = name64;
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
Node._AnimationRangeFactory = (name64, from, to) => new AnimationRange(name64, from, to);

export {
  DynamicTexture,
  GroundMesh,
  CreateGroundVertexData,
  CreateTiledGroundVertexData,
  CreateGroundFromHeightMapVertexData,
  CreateGround,
  CreateTiledGround,
  CreateGroundFromHeightMap,
  GroundBuilder,
  PrePassConfiguration,
  MaterialFlags,
  MaterialPluginManager,
  RegisterMaterialPlugin,
  UnregisterMaterialPlugin,
  UnregisterAllMaterialPlugins,
  MaterialPluginBase,
  MaterialDetailMapDefines,
  DetailMapConfiguration,
  StandardMaterialDefines,
  StandardMaterial,
  Light,
  HemisphericLight,
  UtilityLayerRenderer,
  ShaderMaterial,
  Ray,
  AnimationKeyInterpolation,
  AnimationRange,
  _staticOffsetValueQuaternion,
  _staticOffsetValueVector3,
  _staticOffsetValueVector2,
  _staticOffsetValueSize,
  _staticOffsetValueColor3,
  _staticOffsetValueColor4,
  Animation
};
//# sourceMappingURL=chunk-XD6JXWEK.js.map
