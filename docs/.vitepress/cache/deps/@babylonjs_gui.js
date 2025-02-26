import {
  AbstractMesh,
  Animation,
  AnimationGroup,
  Axis,
  BaseSixDofDragBehavior,
  ClipboardEventTypes,
  ClipboardInfo,
  Color3,
  Color4,
  Constants,
  CreateBox,
  CreatePlane,
  DecodeBase64ToBinary,
  DynamicTexture,
  EffectFallbacks,
  EngineStore,
  Epsilon,
  FadeInOutBehavior,
  FollowBehavior,
  GetClass,
  Gizmo,
  HandConstraintBehavior,
  HandleFallbacksForShadows,
  HemisphericLight,
  IsDocumentAvailable,
  KeyboardEventTypes,
  Layer,
  Logger,
  MaterialDefines,
  Matrix,
  Mesh,
  Observable,
  PerfCounter,
  PivotTools,
  PointerDragBehavior,
  PointerEventTypes,
  PrepareAttributesForInstances,
  PrepareDefinesForAttributes,
  PrepareUniformsAndSamplersList,
  PushMaterial,
  Quaternion,
  RandomGUID,
  RegisterClass,
  Scalar,
  SceneLoader,
  SerializationHelper,
  ShaderMaterial,
  ShaderStore,
  SixDofDragBehavior,
  Space,
  StandardMaterial,
  SurfaceMagnetismBehavior,
  Texture,
  TmpColors,
  TmpVectors,
  Tools,
  TransformNode,
  UtilityLayerRenderer,
  Vector2,
  Vector3,
  Vector4,
  VertexBuffer,
  VertexData,
  Viewport,
  WebRequest,
  __decorate,
  expandToProperty,
  serialize,
  serializeAsColor3,
  serializeAsColor4,
  serializeAsTexture,
  serializeAsVector3
} from "./chunk-F43E4K3S.js";
import "./chunk-Y2F7D3TJ.js";

// node_modules/@babylonjs/gui/2D/valueAndUnit.js
var ValueAndUnit = class _ValueAndUnit {
  /**
   * Creates a new ValueAndUnit
   * @param value defines the value to store
   * @param unit defines the unit to store - defaults to ValueAndUnit.UNITMODE_PIXEL
   * @param negativeValueAllowed defines a boolean indicating if the value can be negative
   */
  constructor(value, unit = _ValueAndUnit.UNITMODE_PIXEL, negativeValueAllowed = true) {
    this.negativeValueAllowed = negativeValueAllowed;
    this._value = 1;
    this._unit = _ValueAndUnit.UNITMODE_PIXEL;
    this.ignoreAdaptiveScaling = false;
    this.onChangedObservable = new Observable();
    this._value = value;
    this._unit = unit;
    this._originalUnit = unit;
  }
  /** Gets a boolean indicating if the value is a percentage */
  get isPercentage() {
    return this._unit === _ValueAndUnit.UNITMODE_PERCENTAGE;
  }
  /** Gets a boolean indicating if the value is store as pixel */
  get isPixel() {
    return this._unit === _ValueAndUnit.UNITMODE_PIXEL;
  }
  /**
   * Gets value (without units)
   * @deprecated use value property instead
   */
  get internalValue() {
    return this._value;
  }
  /** Gets value (without units) */
  get value() {
    return this._value;
  }
  /** Sets value (without units) */
  set value(value) {
    if (value !== this._value) {
      this._value = value;
      this.onChangedObservable.notifyObservers();
    }
  }
  /** Gets units (without value) */
  get unit() {
    return this._unit;
  }
  /** Sets units (without value) */
  set unit(value) {
    if (value !== this._unit) {
      this._unit = value;
      this.onChangedObservable.notifyObservers();
    }
  }
  /**
   * Gets value as pixel
   * @param host defines the root host
   * @param refValue defines the reference value for percentages
   * @returns the value as pixel
   */
  getValueInPixel(host, refValue) {
    if (this.isPixel) {
      return this.getValue(host);
    }
    return this.getValue(host) * refValue;
  }
  /**
   * Update the current value and unit.
   * @param value defines the value to store
   * @param unit defines the unit to store
   * @returns the current ValueAndUnit
   */
  updateInPlace(value, unit = _ValueAndUnit.UNITMODE_PIXEL) {
    if (this.value !== value || this.unit !== unit) {
      this._value = value;
      this._unit = unit;
      this.onChangedObservable.notifyObservers();
    }
    return this;
  }
  /**
   * Gets the value accordingly to its unit
   * @param host  defines the root host
   * @returns the value
   */
  getValue(host) {
    if (host && !this.ignoreAdaptiveScaling && this.unit !== _ValueAndUnit.UNITMODE_PERCENTAGE) {
      let width = 0;
      let height = 0;
      if (host.idealWidth) {
        width = Math.ceil(this._value * host.getSize().width / host.idealWidth);
      }
      if (host.idealHeight) {
        height = Math.ceil(this._value * host.getSize().height / host.idealHeight);
      }
      if (host.useSmallestIdeal && host.idealWidth && host.idealHeight) {
        return window.innerWidth < window.innerHeight ? width : height;
      }
      if (host.idealWidth) {
        return width;
      }
      if (host.idealHeight) {
        return height;
      }
    }
    return this._value;
  }
  /**
   * Gets a string representation of the value
   * @param host defines the root host
   * @param decimals defines an optional number of decimals to display
   * @returns a string
   */
  toString(host, decimals) {
    switch (this._unit) {
      case _ValueAndUnit.UNITMODE_PERCENTAGE: {
        const percentage = this.getValue(host) * 100;
        return (decimals ? percentage.toFixed(decimals) : percentage) + "%";
      }
      case _ValueAndUnit.UNITMODE_PIXEL: {
        const pixels = this.getValue(host);
        return (decimals ? pixels.toFixed(decimals) : pixels) + "px";
      }
    }
    return this._unit.toString();
  }
  /**
   * Store a value parsed from a string
   * @param source defines the source string
   * @returns true if the value was successfully parsed and updated
   */
  fromString(source) {
    const match = _ValueAndUnit._Regex.exec(source.toString());
    if (!match || match.length === 0) {
      return false;
    }
    let sourceValue = parseFloat(match[1]);
    let sourceUnit = this._originalUnit;
    if (!this.negativeValueAllowed) {
      if (sourceValue < 0) {
        sourceValue = 0;
      }
    }
    if (match.length === 4) {
      switch (match[3]) {
        case "px":
          sourceUnit = _ValueAndUnit.UNITMODE_PIXEL;
          break;
        case "%":
          sourceUnit = _ValueAndUnit.UNITMODE_PERCENTAGE;
          sourceValue /= 100;
          break;
      }
    }
    if (sourceValue === this._value && sourceUnit === this._unit) {
      return false;
    }
    this._value = sourceValue;
    this._unit = sourceUnit;
    this.onChangedObservable.notifyObservers();
    return true;
  }
  /** UNITMODE_PERCENTAGE */
  static get UNITMODE_PERCENTAGE() {
    return _ValueAndUnit._UNITMODE_PERCENTAGE;
  }
  /** UNITMODE_PIXEL */
  static get UNITMODE_PIXEL() {
    return _ValueAndUnit._UNITMODE_PIXEL;
  }
};
ValueAndUnit._Regex = /(^-?\d*(\.\d+)?)(%|px)?/;
ValueAndUnit._UNITMODE_PERCENTAGE = 0;
ValueAndUnit._UNITMODE_PIXEL = 1;

// node_modules/@babylonjs/gui/2D/measure.js
var tmpRect = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
var tmpRect2 = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
var tmpV1 = new Vector2(0, 0);
var tmpV2 = new Vector2(0, 0);
var Measure = class _Measure {
  /**
   * Creates a new measure
   * @param left defines left coordinate
   * @param top defines top coordinate
   * @param width defines width dimension
   * @param height defines height dimension
   */
  constructor(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }
  /**
   * Copy from another measure
   * @param other defines the other measure to copy from
   */
  copyFrom(other) {
    this.left = other.left;
    this.top = other.top;
    this.width = other.width;
    this.height = other.height;
  }
  /**
   * Copy from a group of 4 floats
   * @param left defines left coordinate
   * @param top defines top coordinate
   * @param width defines width dimension
   * @param height defines height dimension
   */
  copyFromFloats(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }
  /**
   * Computes the axis aligned bounding box measure for two given measures
   * @param a Input measure
   * @param b Input measure
   * @param result the resulting bounding measure
   */
  static CombineToRef(a, b, result) {
    const left = Math.min(a.left, b.left);
    const top = Math.min(a.top, b.top);
    const right = Math.max(a.left + a.width, b.left + b.width);
    const bottom = Math.max(a.top + a.height, b.top + b.height);
    result.left = left;
    result.top = top;
    result.width = right - left;
    result.height = bottom - top;
  }
  /**
   * Computes the axis aligned bounding box of the measure after it is modified by a given transform
   * @param transform the matrix to transform the measure before computing the AABB
   * @param addX number to add to left
   * @param addY number to add to top
   * @param addWidth number to add to width
   * @param addHeight number to add to height
   * @param result the resulting AABB
   */
  addAndTransformToRef(transform, addX, addY, addWidth, addHeight, result) {
    const left = this.left + addX;
    const top = this.top + addY;
    const width = this.width + addWidth;
    const height = this.height + addHeight;
    tmpRect[0].copyFromFloats(left, top);
    tmpRect[1].copyFromFloats(left + width, top);
    tmpRect[2].copyFromFloats(left + width, top + height);
    tmpRect[3].copyFromFloats(left, top + height);
    tmpV1.copyFromFloats(Number.MAX_VALUE, Number.MAX_VALUE);
    tmpV2.copyFromFloats(0, 0);
    for (let i = 0; i < 4; i++) {
      transform.transformCoordinates(tmpRect[i].x, tmpRect[i].y, tmpRect2[i]);
      tmpV1.x = Math.floor(Math.min(tmpV1.x, tmpRect2[i].x));
      tmpV1.y = Math.floor(Math.min(tmpV1.y, tmpRect2[i].y));
      tmpV2.x = Math.ceil(Math.max(tmpV2.x, tmpRect2[i].x));
      tmpV2.y = Math.ceil(Math.max(tmpV2.y, tmpRect2[i].y));
    }
    result.left = tmpV1.x;
    result.top = tmpV1.y;
    result.width = tmpV2.x - tmpV1.x;
    result.height = tmpV2.y - tmpV1.y;
  }
  /**
   * Computes the axis aligned bounding box of the measure after it is modified by a given transform
   * @param transform the matrix to transform the measure before computing the AABB
   * @param result the resulting AABB
   */
  transformToRef(transform, result) {
    this.addAndTransformToRef(transform, 0, 0, 0, 0, result);
  }
  /**
   * Check equality between this measure and another one
   * @param other defines the other measures
   * @returns true if both measures are equals
   */
  isEqualsTo(other) {
    if (this.left !== other.left) {
      return false;
    }
    if (this.top !== other.top) {
      return false;
    }
    if (this.width !== other.width) {
      return false;
    }
    if (this.height !== other.height) {
      return false;
    }
    return true;
  }
  /**
   * Creates an empty measure
   * @returns a new measure
   */
  static Empty() {
    return new _Measure(0, 0, 0, 0);
  }
};

// node_modules/@babylonjs/gui/2D/math2D.js
var Vector2WithInfo = class extends Vector2 {
  /**
   * Creates a new Vector2WithInfo
   * @param source defines the vector2 data to transport
   * @param buttonIndex defines the current mouse button index
   */
  constructor(source, buttonIndex = 0) {
    super(source.x, source.y);
    this.buttonIndex = buttonIndex;
  }
};
var Matrix2D = class _Matrix2D {
  /**
   * Creates a new matrix
   * @param m00 defines value for (0, 0)
   * @param m01 defines value for (0, 1)
   * @param m10 defines value for (1, 0)
   * @param m11 defines value for (1, 1)
   * @param m20 defines value for (2, 0)
   * @param m21 defines value for (2, 1)
   */
  constructor(m00, m01, m10, m11, m20, m21) {
    this.m = new Float32Array(6);
    this.fromValues(m00, m01, m10, m11, m20, m21);
  }
  /**
   * Fills the matrix from direct values
   * @param m00 defines value for (0, 0)
   * @param m01 defines value for (0, 1)
   * @param m10 defines value for (1, 0)
   * @param m11 defines value for (1, 1)
   * @param m20 defines value for (2, 0)
   * @param m21 defines value for (2, 1)
   * @returns the current modified matrix
   */
  fromValues(m00, m01, m10, m11, m20, m21) {
    this.m[0] = m00;
    this.m[1] = m01;
    this.m[2] = m10;
    this.m[3] = m11;
    this.m[4] = m20;
    this.m[5] = m21;
    return this;
  }
  /**
   * Gets matrix determinant
   * @returns the determinant
   */
  determinant() {
    return this.m[0] * this.m[3] - this.m[1] * this.m[2];
  }
  /**
   * Inverses the matrix and stores it in a target matrix
   * @param result defines the target matrix
   * @returns the current matrix
   */
  invertToRef(result) {
    const l0 = this.m[0];
    const l1 = this.m[1];
    const l2 = this.m[2];
    const l3 = this.m[3];
    const l4 = this.m[4];
    const l5 = this.m[5];
    const det = this.determinant();
    if (det < Epsilon * Epsilon) {
      result.m[0] = 0;
      result.m[1] = 0;
      result.m[2] = 0;
      result.m[3] = 0;
      result.m[4] = 0;
      result.m[5] = 0;
      return this;
    }
    const detDiv = 1 / det;
    const det4 = l2 * l5 - l3 * l4;
    const det5 = l1 * l4 - l0 * l5;
    result.m[0] = l3 * detDiv;
    result.m[1] = -l1 * detDiv;
    result.m[2] = -l2 * detDiv;
    result.m[3] = l0 * detDiv;
    result.m[4] = det4 * detDiv;
    result.m[5] = det5 * detDiv;
    return this;
  }
  /**
   * Multiplies the current matrix with another one
   * @param other defines the second operand
   * @param result defines the target matrix
   * @returns the current matrix
   */
  multiplyToRef(other, result) {
    const l0 = this.m[0];
    const l1 = this.m[1];
    const l2 = this.m[2];
    const l3 = this.m[3];
    const l4 = this.m[4];
    const l5 = this.m[5];
    const r0 = other.m[0];
    const r1 = other.m[1];
    const r2 = other.m[2];
    const r3 = other.m[3];
    const r4 = other.m[4];
    const r5 = other.m[5];
    result.m[0] = l0 * r0 + l1 * r2;
    result.m[1] = l0 * r1 + l1 * r3;
    result.m[2] = l2 * r0 + l3 * r2;
    result.m[3] = l2 * r1 + l3 * r3;
    result.m[4] = l4 * r0 + l5 * r2 + r4;
    result.m[5] = l4 * r1 + l5 * r3 + r5;
    return this;
  }
  /**
   * Applies the current matrix to a set of 2 floats and stores the result in a vector2
   * @param x defines the x coordinate to transform
   * @param y defines the x coordinate to transform
   * @param result defines the target vector2
   * @returns the current matrix
   */
  transformCoordinates(x, y, result) {
    result.x = x * this.m[0] + y * this.m[2] + this.m[4];
    result.y = x * this.m[1] + y * this.m[3] + this.m[5];
    return this;
  }
  // Statics
  /**
   * Creates an identity matrix
   * @returns a new matrix
   */
  static Identity() {
    return new _Matrix2D(1, 0, 0, 1, 0, 0);
  }
  /**
   * Creates an identity matrix and stores it in a target matrix
   * @param result defines the target matrix
   */
  static IdentityToRef(result) {
    result.m[0] = 1;
    result.m[1] = 0;
    result.m[2] = 0;
    result.m[3] = 1;
    result.m[4] = 0;
    result.m[5] = 0;
  }
  /**
   * Creates a translation matrix and stores it in a target matrix
   * @param x defines the x coordinate of the translation
   * @param y defines the y coordinate of the translation
   * @param result defines the target matrix
   */
  static TranslationToRef(x, y, result) {
    result.fromValues(1, 0, 0, 1, x, y);
  }
  /**
   * Creates a scaling matrix and stores it in a target matrix
   * @param x defines the x coordinate of the scaling
   * @param y defines the y coordinate of the scaling
   * @param result defines the target matrix
   */
  static ScalingToRef(x, y, result) {
    result.fromValues(x, 0, 0, y, 0, 0);
  }
  /**
   * Creates a rotation matrix and stores it in a target matrix
   * @param angle defines the rotation angle
   * @param result defines the target matrix
   */
  static RotationToRef(angle, result) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    result.fromValues(c, s, -s, c, 0, 0);
  }
  /**
   * Composes a matrix from translation, rotation, scaling and parent matrix and stores it in a target matrix
   * @param tx defines the x coordinate of the translation
   * @param ty defines the y coordinate of the translation
   * @param angle defines the rotation angle
   * @param scaleX defines the x coordinate of the scaling
   * @param scaleY defines the y coordinate of the scaling
   * @param parentMatrix defines the parent matrix to multiply by (can be null)
   * @param result defines the target matrix
   */
  static ComposeToRef(tx, ty, angle, scaleX, scaleY, parentMatrix, result) {
    _Matrix2D.TranslationToRef(tx, ty, _Matrix2D._TempPreTranslationMatrix);
    _Matrix2D.ScalingToRef(scaleX, scaleY, _Matrix2D._TempScalingMatrix);
    _Matrix2D.RotationToRef(angle, _Matrix2D._TempRotationMatrix);
    _Matrix2D.TranslationToRef(-tx, -ty, _Matrix2D._TempPostTranslationMatrix);
    _Matrix2D._TempPreTranslationMatrix.multiplyToRef(_Matrix2D._TempScalingMatrix, _Matrix2D._TempCompose0);
    _Matrix2D._TempCompose0.multiplyToRef(_Matrix2D._TempRotationMatrix, _Matrix2D._TempCompose1);
    if (parentMatrix) {
      _Matrix2D._TempCompose1.multiplyToRef(_Matrix2D._TempPostTranslationMatrix, _Matrix2D._TempCompose2);
      _Matrix2D._TempCompose2.multiplyToRef(parentMatrix, result);
    } else {
      _Matrix2D._TempCompose1.multiplyToRef(_Matrix2D._TempPostTranslationMatrix, result);
    }
  }
};
Matrix2D._TempPreTranslationMatrix = Matrix2D.Identity();
Matrix2D._TempPostTranslationMatrix = Matrix2D.Identity();
Matrix2D._TempRotationMatrix = Matrix2D.Identity();
Matrix2D._TempScalingMatrix = Matrix2D.Identity();
Matrix2D._TempCompose0 = Matrix2D.Identity();
Matrix2D._TempCompose1 = Matrix2D.Identity();
Matrix2D._TempCompose2 = Matrix2D.Identity();
var MathTools = class _MathTools {
  /**
   * Rounds a number to the nearest multiple of a given precision
   * @param value the value to be rounded
   * @param precision the multiple to which the value will be rounded. Default is 100 (2 decimal digits)
   * @returns
   */
  static Round(value, precision = _MathTools.DefaultRoundingPrecision) {
    return Math.round(value * precision) / precision;
  }
};
MathTools.DefaultRoundingPrecision = 100;

// node_modules/@babylonjs/gui/2D/controls/control.js
var Control = class _Control {
  /**
   * Gets or sets a boolean indicating if the control is readonly (default: false).
   * A readonly control will still raise pointer events but will not react to them
   */
  get isReadOnly() {
    return this._isReadOnly;
  }
  set isReadOnly(value) {
    this._isReadOnly = value;
  }
  /**
   * Gets the transformed measure, that is the bounding box of the control after applying all transformations
   */
  get transformedMeasure() {
    return this._evaluatedMeasure;
  }
  /**
   * Sets/Gets a boolean indicating if the children are clipped to the current control bounds.
   * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
   */
  set clipChildren(value) {
    this._clipChildren = value;
  }
  get clipChildren() {
    return this._clipChildren;
  }
  /**
   * Sets/Gets a boolean indicating that control content must be clipped
   * Please note that not clipping content may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
   */
  set clipContent(value) {
    this._clipContent = value;
  }
  get clipContent() {
    return this._clipContent;
  }
  /** Gets or sets a value indicating the offset to apply on X axis to render the shadow */
  get shadowOffsetX() {
    return this._shadowOffsetX;
  }
  set shadowOffsetX(value) {
    if (this._shadowOffsetX === value) {
      return;
    }
    this._shadowOffsetX = value;
    this._markAsDirty();
  }
  /** Gets or sets a value indicating the offset to apply on Y axis to render the shadow */
  get shadowOffsetY() {
    return this._shadowOffsetY;
  }
  set shadowOffsetY(value) {
    if (this._shadowOffsetY === value) {
      return;
    }
    this._shadowOffsetY = value;
    this._markAsDirty();
  }
  /** Gets or sets a value indicating the amount of blur to use to render the shadow */
  get shadowBlur() {
    return this._shadowBlur;
  }
  set shadowBlur(value) {
    if (this._shadowBlur === value) {
      return;
    }
    this._previousShadowBlur = this._shadowBlur;
    this._shadowBlur = value;
    this._markAsDirty();
  }
  /** Gets or sets a value indicating the color of the shadow (black by default ie. "#000") */
  get shadowColor() {
    return this._shadowColor;
  }
  set shadowColor(value) {
    if (this._shadowColor === value) {
      return;
    }
    this._shadowColor = value;
    this._markAsDirty();
  }
  // Properties
  /** Gets the control type name */
  get typeName() {
    return this._getTypeName();
  }
  /**
   * Get the current class name of the control.
   * @returns current class name
   */
  getClassName() {
    return this._getTypeName();
  }
  /**
   * Gets or sets the accessibility tag to describe the control for accessibility purpose.
   * By default, GUI controls already indicate accessibility info, but one can override the info using this tag.
   */
  set accessibilityTag(value) {
    this._accessibilityTag = value;
    this.onAccessibilityTagChangedObservable.notifyObservers(value);
  }
  get accessibilityTag() {
    return this._accessibilityTag;
  }
  /**
   * Get the hosting AdvancedDynamicTexture
   */
  get host() {
    return this._host;
  }
  /** Gets or set information about font offsets (used to render and align text) */
  get fontOffset() {
    return this._fontOffset;
  }
  set fontOffset(offset) {
    this._fontOffset = offset;
  }
  /** Gets or sets alpha value for the control (1 means opaque and 0 means entirely transparent) */
  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    if (this._alpha === value) {
      return;
    }
    this._alphaSet = true;
    this._alpha = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets a number indicating size of stroke we want to highlight the control with (mostly for debugging purpose)
   */
  get highlightLineWidth() {
    return this._highlightLineWidth;
  }
  set highlightLineWidth(value) {
    if (this._highlightLineWidth === value) {
      return;
    }
    this._highlightLineWidth = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets a boolean indicating that we want to highlight the control (mostly for debugging purpose)
   */
  get isHighlighted() {
    return this._isHighlighted;
  }
  set isHighlighted(value) {
    if (this._isHighlighted === value) {
      return;
    }
    this._isHighlighted = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets a string defining the color to use for highlighting this control
   */
  get highlightColor() {
    return this._highlightColor;
  }
  set highlightColor(value) {
    if (this._highlightColor === value) {
      return;
    }
    this._highlightColor = value;
    this._markAsDirty();
  }
  /** Gets or sets a value indicating the scale factor on X axis (1 by default)
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
   */
  get scaleX() {
    return this._scaleX;
  }
  set scaleX(value) {
    if (this._scaleX === value) {
      return;
    }
    this._scaleX = value;
    this._markAsDirty();
    this._markMatrixAsDirty();
  }
  /** Gets or sets a value indicating the scale factor on Y axis (1 by default)
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
   */
  get scaleY() {
    return this._scaleY;
  }
  set scaleY(value) {
    if (this._scaleY === value) {
      return;
    }
    this._scaleY = value;
    this._markAsDirty();
    this._markMatrixAsDirty();
  }
  /** Gets or sets the rotation angle (0 by default)
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
   */
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    if (this._rotation === value) {
      return;
    }
    this._rotation = value;
    this._markAsDirty();
    this._markMatrixAsDirty();
  }
  /** Gets or sets the transformation center on Y axis (0 by default)
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
   */
  get transformCenterY() {
    return this._transformCenterY;
  }
  set transformCenterY(value) {
    if (this._transformCenterY === value) {
      return;
    }
    this._transformCenterY = value;
    this._markAsDirty();
    this._markMatrixAsDirty();
  }
  /** Gets or sets the transformation center on X axis (0 by default)
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
   */
  get transformCenterX() {
    return this._transformCenterX;
  }
  set transformCenterX(value) {
    if (this._transformCenterX === value) {
      return;
    }
    this._transformCenterX = value;
    this._markAsDirty();
    this._markMatrixAsDirty();
  }
  /**
   * Gets or sets the horizontal alignment
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#alignments
   */
  get horizontalAlignment() {
    return this._horizontalAlignment;
  }
  set horizontalAlignment(value) {
    if (this._horizontalAlignment === value) {
      return;
    }
    this._horizontalAlignment = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the vertical alignment
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#alignments
   */
  get verticalAlignment() {
    return this._verticalAlignment;
  }
  set verticalAlignment(value) {
    if (this._verticalAlignment === value) {
      return;
    }
    this._verticalAlignment = value;
    this._markAsDirty();
  }
  set fixedRatio(value) {
    if (this._fixedRatio === value) {
      return;
    }
    this._fixedRatio = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets a fixed ratio for this control.
   * When different from 0, the ratio is used to compute the "second" dimension.
   * The first dimension used in the computation is the last one set (by setting width / widthInPixels or height / heightInPixels), and the
   * second dimension is computed as first dimension * fixedRatio
   */
  get fixedRatio() {
    return this._fixedRatio;
  }
  set fixedRatioMasterIsWidth(value) {
    if (this._fixedRatioMasterIsWidth === value) {
      return;
    }
    this._fixedRatioMasterIsWidth = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets a boolean indicating that the fixed ratio is set on the width instead of the height. True by default.
   * When the height of a control is set, this property is changed to false.
   */
  get fixedRatioMasterIsWidth() {
    return this._fixedRatioMasterIsWidth;
  }
  /**
   * Gets or sets control width
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get width() {
    return this._width.toString(this._host);
  }
  set width(value) {
    this._fixedRatioMasterIsWidth = true;
    if (this._width.toString(this._host) === value) {
      return;
    }
    if (this._width.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets the control width in pixel
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get widthInPixels() {
    return this._width.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set widthInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this._fixedRatioMasterIsWidth = true;
    this.width = value + "px";
  }
  /**
   * Gets or sets control height
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get height() {
    return this._height.toString(this._host);
  }
  set height(value) {
    this._fixedRatioMasterIsWidth = false;
    if (this._height.toString(this._host) === value) {
      return;
    }
    if (this._height.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets control height in pixel
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get heightInPixels() {
    return this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
  }
  set heightInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this._fixedRatioMasterIsWidth = false;
    this.height = value + "px";
  }
  /** Gets or set font family */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(value) {
    if (this._fontFamily === value) {
      return;
    }
    this._fontFamily = value;
    this._resetFontCache();
  }
  /** Gets or sets font style */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(value) {
    if (this._fontStyle === value) {
      return;
    }
    this._fontStyle = value;
    this._resetFontCache();
  }
  /** Gets or sets font weight */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(value) {
    if (this._fontWeight === value) {
      return;
    }
    this._fontWeight = value;
    this._resetFontCache();
  }
  /**
   * Gets or sets style
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#styles
   */
  get style() {
    return this._style;
  }
  set style(value) {
    if (this._style) {
      this._style.onChangedObservable.remove(this._styleObserver);
      this._styleObserver = null;
    }
    this._style = value;
    if (this._style) {
      this._styleObserver = this._style.onChangedObservable.add(() => {
        this._markAsDirty();
        this._resetFontCache();
      });
    }
    this._markAsDirty();
    this._resetFontCache();
  }
  /** @internal */
  get _isFontSizeInPercentage() {
    return this._fontSize.isPercentage;
  }
  /** Gets or sets font size in pixels */
  get fontSizeInPixels() {
    const fontSizeToUse = this._style ? this._style._fontSize : this._fontSize;
    if (fontSizeToUse.isPixel) {
      return fontSizeToUse.getValue(this._host);
    }
    return fontSizeToUse.getValueInPixel(this._host, this._tempParentMeasure.height || this._cachedParentMeasure.height);
  }
  set fontSizeInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.fontSize = value + "px";
  }
  /** Gets or sets font size */
  get fontSize() {
    return this._fontSize.toString(this._host);
  }
  set fontSize(value) {
    if (this._fontSize.toString(this._host) === value) {
      return;
    }
    if (this._fontSize.fromString(value)) {
      this._markAsDirty();
      this._resetFontCache();
    }
  }
  /** Gets or sets foreground color */
  get color() {
    return this._color;
  }
  set color(value) {
    if (this._color === value) {
      return;
    }
    this._color = value;
    this._markAsDirty();
  }
  /** Gets or sets gradient. Setting a gradient will override the color */
  get gradient() {
    return this._gradient;
  }
  set gradient(value) {
    if (this._gradient === value) {
      return;
    }
    this._gradient = value;
    this._markAsDirty();
  }
  /** Gets or sets z index which is used to reorder controls on the z axis */
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(value) {
    if (this.zIndex === value) {
      return;
    }
    this._zIndex = value;
    if (this.parent) {
      this.parent._reOrderControl(this);
    }
  }
  /** Gets or sets a boolean indicating if the control can be rendered */
  get notRenderable() {
    return this._doNotRender;
  }
  set notRenderable(value) {
    if (this._doNotRender === value) {
      return;
    }
    this._doNotRender = value;
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating if the control is visible */
  get isVisible() {
    return this._isVisible;
  }
  set isVisible(value) {
    if (this._isVisible === value) {
      return;
    }
    this._isVisible = value;
    this._markAsDirty(true);
    this.onIsVisibleChangedObservable.notifyObservers(value);
  }
  /** Gets a boolean indicating that the control needs to update its rendering */
  get isDirty() {
    return this._isDirty;
  }
  /**
   * Gets the current linked mesh (or null if none)
   */
  get linkedMesh() {
    return this._linkedMesh;
  }
  /**
   * Gets or sets a value indicating the padding should work like in CSS.
   * Basically, it will add the padding amount on each side of the parent control for its children.
   */
  get descendantsOnlyPadding() {
    return this._descendantsOnlyPadding;
  }
  set descendantsOnlyPadding(value) {
    if (this._descendantsOnlyPadding === value) {
      return;
    }
    this._descendantsOnlyPadding = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets a value indicating the padding to use on the left of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingLeft() {
    return this._paddingLeft.toString(this._host);
  }
  set paddingLeft(value) {
    if (this._paddingLeft.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the padding in pixels to use on the left of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingLeftInPixels() {
    return this._paddingLeft.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set paddingLeftInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.paddingLeft = value + "px";
  }
  /** @internal */
  get _paddingLeftInPixels() {
    if (this._descendantsOnlyPadding) {
      return 0;
    }
    return this.paddingLeftInPixels;
  }
  /**
   * Gets or sets a value indicating the padding to use on the right of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingRight() {
    return this._paddingRight.toString(this._host);
  }
  set paddingRight(value) {
    if (this._paddingRight.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the padding in pixels to use on the right of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingRightInPixels() {
    return this._paddingRight.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set paddingRightInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.paddingRight = value + "px";
  }
  /** @internal */
  get _paddingRightInPixels() {
    if (this._descendantsOnlyPadding) {
      return 0;
    }
    return this.paddingRightInPixels;
  }
  /**
   * Gets or sets a value indicating the padding to use on the top of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingTop() {
    return this._paddingTop.toString(this._host);
  }
  set paddingTop(value) {
    if (this._paddingTop.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the padding in pixels to use on the top of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingTopInPixels() {
    return this._paddingTop.getValueInPixel(this._host, this._cachedParentMeasure.height);
  }
  set paddingTopInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.paddingTop = value + "px";
  }
  /** @internal */
  get _paddingTopInPixels() {
    if (this._descendantsOnlyPadding) {
      return 0;
    }
    return this.paddingTopInPixels;
  }
  /**
   * Gets or sets a value indicating the padding to use on the bottom of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingBottom() {
    return this._paddingBottom.toString(this._host);
  }
  set paddingBottom(value) {
    if (this._paddingBottom.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the padding in pixels to use on the bottom of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get paddingBottomInPixels() {
    return this._paddingBottom.getValueInPixel(this._host, this._cachedParentMeasure.height);
  }
  set paddingBottomInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.paddingBottom = value + "px";
  }
  /** @internal */
  get _paddingBottomInPixels() {
    if (this._descendantsOnlyPadding) {
      return 0;
    }
    return this.paddingBottomInPixels;
  }
  /**
   * Gets or sets a value indicating the left coordinate of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get left() {
    return this._left.toString(this._host);
  }
  set left(value) {
    if (this._left.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the left coordinate in pixels of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get leftInPixels() {
    return this._left.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set leftInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.left = value + "px";
  }
  /**
   * Gets or sets a value indicating the top coordinate of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get top() {
    return this._top.toString(this._host);
  }
  set top(value) {
    if (this._top.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the top coordinate in pixels of the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get topInPixels() {
    return this._top.getValueInPixel(this._host, this._cachedParentMeasure.height);
  }
  set topInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.top = value + "px";
  }
  /**
   * Gets or sets a value indicating the offset on X axis to the linked mesh
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
   */
  get linkOffsetX() {
    return this._linkOffsetX.toString(this._host);
  }
  set linkOffsetX(value) {
    if (this._linkOffsetX.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the offset in pixels on X axis to the linked mesh
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
   */
  get linkOffsetXInPixels() {
    return this._linkOffsetX.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set linkOffsetXInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.linkOffsetX = value + "px";
  }
  /**
   * Gets or sets a value indicating the offset on Y axis to the linked mesh
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
   */
  get linkOffsetY() {
    return this._linkOffsetY.toString(this._host);
  }
  set linkOffsetY(value) {
    if (this._linkOffsetY.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets a value indicating the offset in pixels on Y axis to the linked mesh
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
   */
  get linkOffsetYInPixels() {
    return this._linkOffsetY.getValueInPixel(this._host, this._cachedParentMeasure.height);
  }
  set linkOffsetYInPixels(value) {
    if (isNaN(value)) {
      return;
    }
    this.linkOffsetY = value + "px";
  }
  /** Gets the center coordinate on X axis */
  get centerX() {
    return this._currentMeasure.left + this._currentMeasure.width / 2;
  }
  /** Gets the center coordinate on Y axis */
  get centerY() {
    return this._currentMeasure.top + this._currentMeasure.height / 2;
  }
  /** Gets or sets if control is Enabled */
  get isEnabled() {
    return this._isEnabled;
  }
  set isEnabled(value) {
    if (this._isEnabled === value) {
      return;
    }
    this._isEnabled = value;
    this._markAsDirty();
    const recursivelyFirePointerOut = (control) => {
      if (!control.host) {
        return;
      }
      for (const pointer in control.host._lastControlOver) {
        if (control === this.host._lastControlOver[pointer]) {
          control._onPointerOut(control, null, true);
          delete control.host._lastControlOver[pointer];
        }
      }
      if (control.children !== void 0) {
        control.children.forEach(recursivelyFirePointerOut);
      }
    };
    recursivelyFirePointerOut(this);
    this.onEnabledStateChangedObservable.notifyObservers(value);
  }
  /** Gets or sets background color of control if it's disabled. Only applies to Button class. */
  get disabledColor() {
    return this._disabledColor;
  }
  set disabledColor(value) {
    if (this._disabledColor === value) {
      return;
    }
    this._disabledColor = value;
    this._markAsDirty();
  }
  /** Gets or sets front color of control if it's disabled. Only applies to Checkbox class. */
  get disabledColorItem() {
    return this._disabledColorItem;
  }
  set disabledColorItem(value) {
    if (this._disabledColorItem === value) {
      return;
    }
    this._disabledColorItem = value;
    this._markAsDirty();
  }
  // Functions
  /**
   * Creates a new control
   * @param name defines the name of the control
   */
  constructor(name22) {
    this.name = name22;
    this._alpha = 1;
    this._alphaSet = false;
    this._zIndex = 0;
    this._currentMeasure = Measure.Empty();
    this._tempPaddingMeasure = Measure.Empty();
    this._fontFamily = "";
    this._fontStyle = "";
    this._fontWeight = "";
    this._fontSize = new ValueAndUnit(18, ValueAndUnit.UNITMODE_PIXEL, false);
    this._width = new ValueAndUnit(1, ValueAndUnit.UNITMODE_PERCENTAGE, false);
    this._height = new ValueAndUnit(1, ValueAndUnit.UNITMODE_PERCENTAGE, false);
    this._color = "";
    this._style = null;
    this._horizontalAlignment = _Control.HORIZONTAL_ALIGNMENT_CENTER;
    this._verticalAlignment = _Control.VERTICAL_ALIGNMENT_CENTER;
    this._isDirty = true;
    this._wasDirty = false;
    this._tempParentMeasure = Measure.Empty();
    this._prevCurrentMeasureTransformedIntoGlobalSpace = Measure.Empty();
    this._cachedParentMeasure = Measure.Empty();
    this._descendantsOnlyPadding = false;
    this._paddingLeft = new ValueAndUnit(0);
    this._paddingRight = new ValueAndUnit(0);
    this._paddingTop = new ValueAndUnit(0);
    this._paddingBottom = new ValueAndUnit(0);
    this._left = new ValueAndUnit(0);
    this._top = new ValueAndUnit(0);
    this._scaleX = 1;
    this._scaleY = 1;
    this._rotation = 0;
    this._transformCenterX = 0.5;
    this._transformCenterY = 0.5;
    this._transformMatrix = Matrix2D.Identity();
    this._invertTransformMatrix = Matrix2D.Identity();
    this._transformedPosition = Vector2.Zero();
    this._isMatrixDirty = true;
    this._isVisible = true;
    this._isHighlighted = false;
    this._highlightColor = "#4affff";
    this._highlightLineWidth = 2;
    this._fontSet = false;
    this._dummyVector2 = Vector2.Zero();
    this._downCount = 0;
    this._enterCount = -1;
    this._doNotRender = false;
    this._downPointerIds = {};
    this._evaluatedMeasure = new Measure(0, 0, 0, 0);
    this._evaluatedParentMeasure = new Measure(0, 0, 0, 0);
    this._isEnabled = true;
    this._disabledColor = "#9a9a9a";
    this._disabledColorItem = "#6a6a6a";
    this._isReadOnly = false;
    this._gradient = null;
    this._rebuildLayout = false;
    this.onEnabledStateChangedObservable = new Observable();
    this._customData = {};
    this._isClipped = false;
    this._automaticSize = false;
    this.metadata = null;
    this.isHitTestVisible = true;
    this.isPointerBlocker = false;
    this.isFocusInvisible = false;
    this._clipChildren = true;
    this._clipContent = true;
    this.useBitmapCache = false;
    this._shadowOffsetX = 0;
    this._shadowOffsetY = 0;
    this._shadowBlur = 0;
    this._previousShadowBlur = 0;
    this._shadowColor = "black";
    this.hoverCursor = "";
    this._linkOffsetX = new ValueAndUnit(0);
    this._linkOffsetY = new ValueAndUnit(0);
    this._accessibilityTag = null;
    this.onAccessibilityTagChangedObservable = new Observable();
    this.onWheelObservable = new Observable();
    this.onPointerMoveObservable = new Observable();
    this.onPointerOutObservable = new Observable();
    this.onPointerDownObservable = new Observable();
    this.onPointerUpObservable = new Observable();
    this.onPointerClickObservable = new Observable();
    this.onPointerEnterObservable = new Observable();
    this.onDirtyObservable = new Observable();
    this.onBeforeDrawObservable = new Observable();
    this.onAfterDrawObservable = new Observable();
    this.onDisposeObservable = new Observable();
    this.onIsVisibleChangedObservable = new Observable();
    this.isSerializable = true;
    this._fixedRatio = 0;
    this._fixedRatioMasterIsWidth = true;
    this.animations = null;
    this._tmpMeasureA = new Measure(0, 0, 0, 0);
  }
  /** @internal */
  _getTypeName() {
    return "Control";
  }
  /**
   * Gets the first ascendant in the hierarchy of the given type
   * @param className defines the required type
   * @returns the ascendant or null if not found
   */
  getAscendantOfClass(className) {
    if (!this.parent) {
      return null;
    }
    if (this.parent.getClassName() === className) {
      return this.parent;
    }
    return this.parent.getAscendantOfClass(className);
  }
  /**
   * Mark control element as dirty
   * @param force force non visible elements to be marked too
   */
  markAsDirty(force = false) {
    this._markAsDirty(force);
  }
  /**
   * Mark the element and its children as dirty
   */
  markAllAsDirty() {
    this._markAllAsDirty();
  }
  /** @internal */
  _resetFontCache() {
    this._fontSet = true;
    this._markAsDirty();
  }
  /**
   * Determines if a container is an ascendant of the current control
   * @param container defines the container to look for
   * @returns true if the container is one of the ascendant of the control
   */
  isAscendant(container) {
    if (!this.parent) {
      return false;
    }
    if (this.parent === container) {
      return true;
    }
    return this.parent.isAscendant(container);
  }
  /**
   * Gets coordinates in local control space
   * @param globalCoordinates defines the coordinates to transform
   * @returns the new coordinates in local space
   */
  getLocalCoordinates(globalCoordinates) {
    const result = Vector2.Zero();
    this.getLocalCoordinatesToRef(globalCoordinates, result);
    return result;
  }
  /**
   * Gets coordinates in local control space
   * @param globalCoordinates defines the coordinates to transform
   * @param result defines the target vector2 where to store the result
   * @returns the current control
   */
  getLocalCoordinatesToRef(globalCoordinates, result) {
    result.x = globalCoordinates.x - this._currentMeasure.left;
    result.y = globalCoordinates.y - this._currentMeasure.top;
    return this;
  }
  /**
   * Gets coordinates in parent local control space
   * @param globalCoordinates defines the coordinates to transform
   * @returns the new coordinates in parent local space
   */
  getParentLocalCoordinates(globalCoordinates) {
    const result = Vector2.Zero();
    result.x = globalCoordinates.x - this._cachedParentMeasure.left;
    result.y = globalCoordinates.y - this._cachedParentMeasure.top;
    return result;
  }
  /**
   * Move the current control to a vector3 position projected onto the screen.
   * @param position defines the target position
   * @param scene defines the hosting scene
   */
  moveToVector3(position, scene) {
    if (!this._host || this.parent !== this._host._rootContainer) {
      Tools.Error("Cannot move a control to a vector3 if the control is not at root level");
      return;
    }
    this.horizontalAlignment = _Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.verticalAlignment = _Control.VERTICAL_ALIGNMENT_TOP;
    const globalViewport = this._host._getGlobalViewport();
    const projectedPosition = Vector3.Project(position, Matrix.IdentityReadOnly, scene.getTransformMatrix(), globalViewport);
    this._moveToProjectedPosition(projectedPosition);
    if (projectedPosition.z < 0 || projectedPosition.z > 1) {
      this.notRenderable = true;
      return;
    }
    this.notRenderable = false;
  }
  /**
   * Will store all controls that have this control as ascendant in a given array
   * @param results defines the array where to store the descendants
   * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
   * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
   */
  getDescendantsToRef(results, directDescendantsOnly = false, predicate) {
  }
  /**
   * Will return all controls that have this control as ascendant
   * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
   * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
   * @returns all child controls
   */
  getDescendants(directDescendantsOnly, predicate) {
    const results = [];
    this.getDescendantsToRef(results, directDescendantsOnly, predicate);
    return results;
  }
  /**
   * Link current control with a target mesh
   * @param mesh defines the mesh to link with
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
   */
  linkWithMesh(mesh) {
    if (!this._host || this.parent && this.parent !== this._host._rootContainer) {
      if (mesh) {
        Tools.Error("Cannot link a control to a mesh if the control is not at root level");
      }
      return;
    }
    const index = this._host._linkedControls.indexOf(this);
    if (index !== -1) {
      this._linkedMesh = mesh;
      if (!mesh) {
        this._host._linkedControls.splice(index, 1);
      }
      return;
    } else if (!mesh) {
      return;
    }
    this.horizontalAlignment = _Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.verticalAlignment = _Control.VERTICAL_ALIGNMENT_TOP;
    this._linkedMesh = mesh;
    this._host._linkedControls.push(this);
  }
  /**
   * Shorthand function to set the top, right, bottom, and left padding values on the control.
   * @param { string | number} paddingTop - The value of the top padding.
   * @param { string | number} paddingRight - The value of the right padding. If omitted, top is used.
   * @param { string | number} paddingBottom - The value of the bottom padding. If omitted, top is used.
   * @param { string | number} paddingLeft - The value of the left padding. If omitted, right is used.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  setPadding(paddingTop, paddingRight, paddingBottom, paddingLeft) {
    const top = paddingTop;
    const right = paddingRight ?? top;
    const bottom = paddingBottom ?? top;
    const left = paddingLeft ?? right;
    this.paddingTop = top;
    this.paddingRight = right;
    this.paddingBottom = bottom;
    this.paddingLeft = left;
  }
  /**
   * Shorthand funtion to set the top, right, bottom, and left padding values in pixels on the control.
   * @param { number} paddingTop - The value in pixels of the top padding.
   * @param { number} paddingRight - The value in pixels of the right padding. If omitted, top is used.
   * @param { number} paddingBottom - The value in pixels of the bottom padding. If omitted, top is used.
   * @param { number} paddingLeft - The value in pixels of the left padding. If omitted, right is used.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  setPaddingInPixels(paddingTop, paddingRight, paddingBottom, paddingLeft) {
    const top = paddingTop;
    const right = paddingRight ?? top;
    const bottom = paddingBottom ?? top;
    const left = paddingLeft ?? right;
    this.paddingTopInPixels = top;
    this.paddingRightInPixels = right;
    this.paddingBottomInPixels = bottom;
    this.paddingLeftInPixels = left;
  }
  /**
   * @internal
   */
  _moveToProjectedPosition(projectedPosition) {
    var _a;
    const oldLeft = this._left.getValue(this._host);
    const oldTop = this._top.getValue(this._host);
    const parentMeasure = (_a = this.parent) == null ? void 0 : _a._currentMeasure;
    if (parentMeasure) {
      this._processMeasures(parentMeasure, this._host.getContext());
    }
    let newLeft = projectedPosition.x + this._linkOffsetX.getValue(this._host) - this._currentMeasure.width / 2;
    let newTop = projectedPosition.y + this._linkOffsetY.getValue(this._host) - this._currentMeasure.height / 2;
    const leftAndTopIgnoreAdaptiveScaling = this._left.ignoreAdaptiveScaling && this._top.ignoreAdaptiveScaling;
    if (leftAndTopIgnoreAdaptiveScaling) {
      if (Math.abs(newLeft - oldLeft) < 0.5) {
        newLeft = oldLeft;
      }
      if (Math.abs(newTop - oldTop) < 0.5) {
        newTop = oldTop;
      }
    }
    if (!leftAndTopIgnoreAdaptiveScaling && oldLeft === newLeft && oldTop === newTop) {
      return;
    }
    this.left = newLeft + "px";
    this.top = newTop + "px";
    this._left.ignoreAdaptiveScaling = true;
    this._top.ignoreAdaptiveScaling = true;
    this._markAsDirty();
  }
  /**
   * @internal
   */
  _offsetLeft(offset) {
    this._isDirty = true;
    this._currentMeasure.left += offset;
  }
  /**
   * @internal
   */
  _offsetTop(offset) {
    this._isDirty = true;
    this._currentMeasure.top += offset;
  }
  /** @internal */
  _markMatrixAsDirty() {
    this._isMatrixDirty = true;
    this._flagDescendantsAsMatrixDirty();
  }
  /** @internal */
  _flagDescendantsAsMatrixDirty() {
  }
  /**
   * @internal
   */
  _intersectsRect(rect, context) {
    this._transform(context);
    if (this._evaluatedMeasure.left >= rect.left + rect.width) {
      return false;
    }
    if (this._evaluatedMeasure.top >= rect.top + rect.height) {
      return false;
    }
    if (this._evaluatedMeasure.left + this._evaluatedMeasure.width <= rect.left) {
      return false;
    }
    if (this._evaluatedMeasure.top + this._evaluatedMeasure.height <= rect.top) {
      return false;
    }
    return true;
  }
  /** @internal */
  _computeAdditionalOffsetX() {
    return 0;
  }
  /** @internal */
  _computeAdditionalOffsetY() {
    return 0;
  }
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  invalidateRect() {
    this._transform();
    if (this.host && this.host.useInvalidateRectOptimization) {
      this._currentMeasure.transformToRef(this._transformMatrix, this._tmpMeasureA);
      Measure.CombineToRef(this._tmpMeasureA, this._prevCurrentMeasureTransformedIntoGlobalSpace, this._tmpMeasureA);
      const shadowOffsetX = this.shadowOffsetX;
      const shadowOffsetY = this.shadowOffsetY;
      const shadowBlur = Math.max(this._previousShadowBlur, this.shadowBlur);
      const leftShadowOffset = Math.min(Math.min(shadowOffsetX, 0) - shadowBlur * 2, 0);
      const rightShadowOffset = Math.max(Math.max(shadowOffsetX, 0) + shadowBlur * 2, 0);
      const topShadowOffset = Math.min(Math.min(shadowOffsetY, 0) - shadowBlur * 2, 0);
      const bottomShadowOffset = Math.max(Math.max(shadowOffsetY, 0) + shadowBlur * 2, 0);
      const offsetX = this._computeAdditionalOffsetX();
      const offsetY = this._computeAdditionalOffsetY();
      this.host.invalidateRect(Math.floor(this._tmpMeasureA.left + leftShadowOffset - offsetX), Math.floor(this._tmpMeasureA.top + topShadowOffset - offsetY), Math.ceil(this._tmpMeasureA.left + this._tmpMeasureA.width + rightShadowOffset + offsetX), Math.ceil(this._tmpMeasureA.top + this._tmpMeasureA.height + bottomShadowOffset + offsetY));
    }
  }
  /**
   * @internal
   */
  _markAsDirty(force = false) {
    if (!this._isVisible && !force) {
      return;
    }
    this._isDirty = true;
    this._markMatrixAsDirty();
    if (this._host) {
      this._host.markAsDirty();
    }
  }
  /** @internal */
  _markAllAsDirty() {
    this._markAsDirty();
    if (this._font) {
      this._prepareFont();
    }
  }
  /**
   * @internal
   */
  _link(host) {
    this._host = host;
    if (this._host) {
      this.uniqueId = this._host.getScene().getUniqueId();
    }
  }
  /**
   * @internal
   */
  _transform(context) {
    if (!this._isMatrixDirty && this._scaleX === 1 && this._scaleY === 1 && this._rotation === 0) {
      return;
    }
    const offsetX = this._currentMeasure.width * this._transformCenterX + this._currentMeasure.left;
    const offsetY = this._currentMeasure.height * this._transformCenterY + this._currentMeasure.top;
    if (context) {
      context.translate(offsetX, offsetY);
      context.rotate(this._rotation);
      context.scale(this._scaleX, this._scaleY);
      context.translate(-offsetX, -offsetY);
    }
    if (this._isMatrixDirty || this._cachedOffsetX !== offsetX || this._cachedOffsetY !== offsetY) {
      this._cachedOffsetX = offsetX;
      this._cachedOffsetY = offsetY;
      this._isMatrixDirty = false;
      this._flagDescendantsAsMatrixDirty();
      Matrix2D.ComposeToRef(-offsetX, -offsetY, this._rotation, this._scaleX, this._scaleY, this.parent ? this.parent._transformMatrix : null, this._transformMatrix);
      this._transformMatrix.invertToRef(this._invertTransformMatrix);
      this._currentMeasure.transformToRef(this._transformMatrix, this._evaluatedMeasure);
    }
  }
  /**
   * @internal
   */
  _renderHighlight(context) {
    if (!this.isHighlighted) {
      return;
    }
    context.save();
    context.strokeStyle = this._highlightColor;
    context.lineWidth = this._highlightLineWidth;
    this._renderHighlightSpecific(context);
    context.restore();
  }
  /**
   * @internal
   */
  _renderHighlightSpecific(context) {
    context.strokeRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
  }
  _getColor(context) {
    return this.gradient ? this.gradient.getCanvasGradient(context) : this.color;
  }
  /**
   * @internal
   */
  _applyStates(context) {
    if (this._isFontSizeInPercentage) {
      this._fontSet = true;
    }
    if (this._host && this._host.useSmallestIdeal && !this._font) {
      this._fontSet = true;
    }
    if (this._fontSet) {
      this._prepareFont();
      this._fontSet = false;
    }
    if (this._font) {
      context.font = this._font;
    }
    if (this._color || this.gradient) {
      context.fillStyle = this._getColor(context);
    }
    if (_Control.AllowAlphaInheritance) {
      context.globalAlpha *= this._alpha;
    } else if (this._alphaSet) {
      context.globalAlpha = this.parent && !this.parent.renderToIntermediateTexture ? this.parent.alpha * this._alpha : this._alpha;
    }
  }
  /**
   * @internal
   */
  _layout(parentMeasure, context) {
    if (!this.isDirty && (!this.isVisible || this.notRenderable)) {
      return false;
    }
    if (this._isDirty || !this._cachedParentMeasure.isEqualsTo(parentMeasure)) {
      this.host._numLayoutCalls++;
      this._currentMeasure.addAndTransformToRef(this._transformMatrix, -this._paddingLeftInPixels | 0, -this._paddingTopInPixels | 0, this._paddingRightInPixels | 0, this._paddingBottomInPixels | 0, this._prevCurrentMeasureTransformedIntoGlobalSpace);
      context.save();
      this._applyStates(context);
      let rebuildCount = 0;
      do {
        this._rebuildLayout = false;
        this._processMeasures(parentMeasure, context);
        rebuildCount++;
      } while (this._rebuildLayout && rebuildCount < 3);
      if (rebuildCount >= 3) {
        Logger.Error(`Layout cycle detected in GUI (Control name=${this.name}, uniqueId=${this.uniqueId})`);
      }
      context.restore();
      this.invalidateRect();
      this._evaluateClippingState(parentMeasure);
    }
    this._wasDirty = this._isDirty;
    this._isDirty = false;
    return true;
  }
  /**
   * @internal
   */
  _processMeasures(parentMeasure, context) {
    this._tempPaddingMeasure.copyFrom(parentMeasure);
    if (this.parent && this.parent.descendantsOnlyPadding) {
      this._tempPaddingMeasure.left += this.parent.paddingLeftInPixels;
      this._tempPaddingMeasure.top += this.parent.paddingTopInPixels;
      this._tempPaddingMeasure.width -= this.parent.paddingLeftInPixels + this.parent.paddingRightInPixels;
      this._tempPaddingMeasure.height -= this.parent.paddingTopInPixels + this.parent.paddingBottomInPixels;
    }
    this._currentMeasure.copyFrom(this._tempPaddingMeasure);
    this._preMeasure(this._tempPaddingMeasure, context);
    this._measure();
    this._postMeasure(this._tempPaddingMeasure, context);
    this._computeAlignment(this._tempPaddingMeasure, context);
    this._currentMeasure.left = this._currentMeasure.left | 0;
    this._currentMeasure.top = this._currentMeasure.top | 0;
    this._currentMeasure.width = this._currentMeasure.width | 0;
    this._currentMeasure.height = this._currentMeasure.height | 0;
    this._additionalProcessing(this._tempPaddingMeasure, context);
    this._cachedParentMeasure.copyFrom(this._tempPaddingMeasure);
    this._currentMeasure.transformToRef(this._transformMatrix, this._evaluatedMeasure);
    if (this.onDirtyObservable.hasObservers()) {
      this.onDirtyObservable.notifyObservers(this);
    }
  }
  _evaluateClippingState(parentMeasure) {
    this._transform();
    this._currentMeasure.transformToRef(this._transformMatrix, this._evaluatedMeasure);
    if (this.parent && this.parent.clipChildren) {
      parentMeasure.transformToRef(this.parent._transformMatrix, this._evaluatedParentMeasure);
      if (this._evaluatedMeasure.left > this._evaluatedParentMeasure.left + this._evaluatedParentMeasure.width) {
        this._isClipped = true;
        return;
      }
      if (this._evaluatedMeasure.left + this._evaluatedMeasure.width < this._evaluatedParentMeasure.left) {
        this._isClipped = true;
        return;
      }
      if (this._evaluatedMeasure.top > this._evaluatedParentMeasure.top + this._evaluatedParentMeasure.height) {
        this._isClipped = true;
        return;
      }
      if (this._evaluatedMeasure.top + this._evaluatedMeasure.height < this._evaluatedParentMeasure.top) {
        this._isClipped = true;
        return;
      }
    }
    this._isClipped = false;
  }
  /** @internal */
  _measure() {
    if (this._width.isPixel) {
      this._currentMeasure.width = this._width.getValue(this._host);
    } else {
      this._currentMeasure.width *= this._width.getValue(this._host);
    }
    if (this._height.isPixel) {
      this._currentMeasure.height = this._height.getValue(this._host);
    } else {
      this._currentMeasure.height *= this._height.getValue(this._host);
    }
    if (this._fixedRatio !== 0) {
      if (this._fixedRatioMasterIsWidth) {
        this._currentMeasure.height = this._currentMeasure.width * this._fixedRatio;
      } else {
        this._currentMeasure.width = this._currentMeasure.height * this._fixedRatio;
      }
    }
  }
  /**
   * @internal
   */
  _computeAlignment(parentMeasure, context) {
    const width = this._currentMeasure.width;
    const height = this._currentMeasure.height;
    const parentWidth = parentMeasure.width;
    const parentHeight = parentMeasure.height;
    let x = 0;
    let y = 0;
    switch (this.horizontalAlignment) {
      case _Control.HORIZONTAL_ALIGNMENT_LEFT:
        x = 0;
        break;
      case _Control.HORIZONTAL_ALIGNMENT_RIGHT:
        x = parentWidth - width;
        break;
      case _Control.HORIZONTAL_ALIGNMENT_CENTER:
        x = (parentWidth - width) / 2;
        break;
    }
    switch (this.verticalAlignment) {
      case _Control.VERTICAL_ALIGNMENT_TOP:
        y = 0;
        break;
      case _Control.VERTICAL_ALIGNMENT_BOTTOM:
        y = parentHeight - height;
        break;
      case _Control.VERTICAL_ALIGNMENT_CENTER:
        y = (parentHeight - height) / 2;
        break;
    }
    if (!this.descendantsOnlyPadding) {
      if (this._paddingLeft.isPixel) {
        this._currentMeasure.left += this._paddingLeft.getValue(this._host);
        this._currentMeasure.width -= this._paddingLeft.getValue(this._host);
      } else {
        this._currentMeasure.left += parentWidth * this._paddingLeft.getValue(this._host);
        this._currentMeasure.width -= parentWidth * this._paddingLeft.getValue(this._host);
      }
      if (this._paddingRight.isPixel) {
        this._currentMeasure.width -= this._paddingRight.getValue(this._host);
      } else {
        this._currentMeasure.width -= parentWidth * this._paddingRight.getValue(this._host);
      }
      if (this._paddingTop.isPixel) {
        this._currentMeasure.top += this._paddingTop.getValue(this._host);
        this._currentMeasure.height -= this._paddingTop.getValue(this._host);
      } else {
        this._currentMeasure.top += parentHeight * this._paddingTop.getValue(this._host);
        this._currentMeasure.height -= parentHeight * this._paddingTop.getValue(this._host);
      }
      if (this._paddingBottom.isPixel) {
        this._currentMeasure.height -= this._paddingBottom.getValue(this._host);
      } else {
        this._currentMeasure.height -= parentHeight * this._paddingBottom.getValue(this._host);
      }
    }
    if (this._left.isPixel) {
      this._currentMeasure.left += this._left.getValue(this._host);
    } else {
      this._currentMeasure.left += parentWidth * this._left.getValue(this._host);
    }
    if (this._top.isPixel) {
      this._currentMeasure.top += this._top.getValue(this._host);
    } else {
      this._currentMeasure.top += parentHeight * this._top.getValue(this._host);
    }
    this._currentMeasure.left += x;
    this._currentMeasure.top += y;
  }
  /**
   * @internal
   */
  _preMeasure(parentMeasure, context) {
  }
  /**
   * @internal
   */
  _postMeasure(parentMeasure, context) {
  }
  /**
   * @internal
   */
  _additionalProcessing(parentMeasure, context) {
  }
  /**
   * @internal
   */
  _clipForChildren(context) {
  }
  _clip(context, invalidatedRectangle) {
    context.beginPath();
    _Control._ClipMeasure.copyFrom(this._currentMeasure);
    if (invalidatedRectangle) {
      invalidatedRectangle.transformToRef(this._invertTransformMatrix, this._tmpMeasureA);
      const intersection = new Measure(0, 0, 0, 0);
      intersection.left = Math.max(this._tmpMeasureA.left, this._currentMeasure.left);
      intersection.top = Math.max(this._tmpMeasureA.top, this._currentMeasure.top);
      intersection.width = Math.min(this._tmpMeasureA.left + this._tmpMeasureA.width, this._currentMeasure.left + this._currentMeasure.width) - intersection.left;
      intersection.height = Math.min(this._tmpMeasureA.top + this._tmpMeasureA.height, this._currentMeasure.top + this._currentMeasure.height) - intersection.top;
      _Control._ClipMeasure.copyFrom(intersection);
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      const shadowOffsetX = this.shadowOffsetX;
      const shadowOffsetY = this.shadowOffsetY;
      const shadowBlur = this.shadowBlur;
      const leftShadowOffset = Math.min(Math.min(shadowOffsetX, 0) - shadowBlur * 2, 0);
      const rightShadowOffset = Math.max(Math.max(shadowOffsetX, 0) + shadowBlur * 2, 0);
      const topShadowOffset = Math.min(Math.min(shadowOffsetY, 0) - shadowBlur * 2, 0);
      const bottomShadowOffset = Math.max(Math.max(shadowOffsetY, 0) + shadowBlur * 2, 0);
      context.rect(_Control._ClipMeasure.left + leftShadowOffset, _Control._ClipMeasure.top + topShadowOffset, _Control._ClipMeasure.width + rightShadowOffset - leftShadowOffset, _Control._ClipMeasure.height + bottomShadowOffset - topShadowOffset);
    } else {
      context.rect(_Control._ClipMeasure.left, _Control._ClipMeasure.top, _Control._ClipMeasure.width, _Control._ClipMeasure.height);
    }
    context.clip();
  }
  /**
   * @internal
   */
  _render(context, invalidatedRectangle) {
    if (!this.isVisible || this.notRenderable || this._isClipped) {
      this._isDirty = false;
      return false;
    }
    this.host._numRenderCalls++;
    context.save();
    this._applyStates(context);
    this._transform(context);
    if (this.clipContent) {
      this._clip(context, invalidatedRectangle);
    }
    if (this.onBeforeDrawObservable.hasObservers()) {
      this.onBeforeDrawObservable.notifyObservers(this);
    }
    if (this.useBitmapCache && !this._wasDirty && this._cacheData) {
      context.putImageData(this._cacheData, this._currentMeasure.left, this._currentMeasure.top);
    } else {
      this._draw(context, invalidatedRectangle);
    }
    if (this.useBitmapCache && this._wasDirty) {
      this._cacheData = context.getImageData(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
    }
    this._renderHighlight(context);
    if (this.onAfterDrawObservable.hasObservers()) {
      this.onAfterDrawObservable.notifyObservers(this);
    }
    context.restore();
    return true;
  }
  /**
   * @internal
   */
  _draw(context, invalidatedRectangle) {
  }
  /**
   * Tests if a given coordinates belong to the current control
   * @param x defines x coordinate to test
   * @param y defines y coordinate to test
   * @returns true if the coordinates are inside the control
   */
  contains(x, y) {
    this._invertTransformMatrix.transformCoordinates(x, y, this._transformedPosition);
    x = this._transformedPosition.x;
    y = this._transformedPosition.y;
    if (x < this._currentMeasure.left) {
      return false;
    }
    if (x > this._currentMeasure.left + this._currentMeasure.width) {
      return false;
    }
    if (y < this._currentMeasure.top) {
      return false;
    }
    if (y > this._currentMeasure.top + this._currentMeasure.height) {
      return false;
    }
    if (this.isPointerBlocker) {
      this._host._shouldBlockPointer = true;
    }
    return true;
  }
  /**
   * @internal
   */
  _processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
    if (!this._isEnabled) {
      return false;
    }
    if (!this.isHitTestVisible || !this.isVisible || this._doNotRender) {
      return false;
    }
    if (!this.contains(x, y)) {
      return false;
    }
    this._processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY);
    return true;
  }
  /**
   * @internal
   */
  _onPointerMove(target, coordinates, pointerId, pi) {
    const canNotify = this.onPointerMoveObservable.notifyObservers(coordinates, -1, target, this, pi);
    if (canNotify && this.parent != null && !this.isPointerBlocker) {
      this.parent._onPointerMove(target, coordinates, pointerId, pi);
    }
  }
  /**
   * @internal
   */
  _onPointerEnter(target, pi) {
    if (!this._isEnabled) {
      return false;
    }
    if (this._enterCount > 0) {
      return false;
    }
    if (this._enterCount === -1) {
      this._enterCount = 0;
    }
    this._enterCount++;
    const canNotify = this.onPointerEnterObservable.notifyObservers(this, -1, target, this, pi);
    if (canNotify && this.parent != null && !this.isPointerBlocker) {
      this.parent._onPointerEnter(target, pi);
    }
    return true;
  }
  /**
   * @internal
   */
  _onPointerOut(target, pi, force = false) {
    if (!force && (!this._isEnabled || target === this)) {
      return;
    }
    this._enterCount = 0;
    let canNotify = true;
    if (!target.isAscendant(this)) {
      canNotify = this.onPointerOutObservable.notifyObservers(this, -1, target, this, pi);
    }
    if (canNotify && this.parent != null && !this.isPointerBlocker) {
      this.parent._onPointerOut(target, pi, force);
    }
  }
  /**
   * @internal
   */
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    this._onPointerEnter(this, pi);
    if (this._downCount !== 0) {
      return false;
    }
    this._downCount++;
    this._downPointerIds[pointerId] = true;
    const canNotify = this.onPointerDownObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
    if (canNotify && this.parent != null && !this.isPointerBlocker) {
      this.parent._onPointerDown(target, coordinates, pointerId, buttonIndex, pi);
    }
    if (pi && this.uniqueId !== this._host.rootContainer.uniqueId) {
      this._host._capturedPointerIds.add(pi.event.pointerId);
    }
    return true;
  }
  /**
   * @internal
   */
  _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
    if (!this._isEnabled) {
      return;
    }
    this._downCount = 0;
    delete this._downPointerIds[pointerId];
    let canNotifyClick = notifyClick;
    if (notifyClick && (this._enterCount > 0 || this._enterCount === -1)) {
      canNotifyClick = this.onPointerClickObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
    }
    const canNotify = this.onPointerUpObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
    if (canNotify && this.parent != null && !this.isPointerBlocker) {
      this.parent._onPointerUp(target, coordinates, pointerId, buttonIndex, canNotifyClick, pi);
    }
    if (pi && this.uniqueId !== this._host.rootContainer.uniqueId) {
      this._host._capturedPointerIds.delete(pi.event.pointerId);
    }
  }
  /**
   * @internal
   */
  _forcePointerUp(pointerId = null) {
    if (pointerId !== null) {
      this._onPointerUp(this, Vector2.Zero(), pointerId, 0, true);
    } else {
      for (const key in this._downPointerIds) {
        this._onPointerUp(this, Vector2.Zero(), +key, 0, true);
      }
    }
  }
  /**
   * @internal
   */
  _onWheelScroll(deltaX, deltaY) {
    if (!this._isEnabled) {
      return;
    }
    const canNotify = this.onWheelObservable.notifyObservers(new Vector2(deltaX, deltaY));
    if (canNotify && this.parent != null) {
      this.parent._onWheelScroll(deltaX, deltaY);
    }
  }
  /** @internal */
  _onCanvasBlur() {
  }
  /**
   * @internal
   */
  _processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY) {
    if (!this._isEnabled) {
      return false;
    }
    this._dummyVector2.copyFromFloats(x, y);
    if (type === PointerEventTypes.POINTERMOVE) {
      this._onPointerMove(this, this._dummyVector2, pointerId, pi);
      const previousControlOver = this._host._lastControlOver[pointerId];
      if (previousControlOver && previousControlOver !== this) {
        previousControlOver._onPointerOut(this, pi);
      }
      if (previousControlOver !== this) {
        this._onPointerEnter(this, pi);
      }
      this._host._lastControlOver[pointerId] = this;
      return true;
    }
    if (type === PointerEventTypes.POINTERDOWN) {
      this._onPointerDown(this, this._dummyVector2, pointerId, buttonIndex, pi);
      this._host._registerLastControlDown(this, pointerId);
      this._host._lastPickedControl = this;
      return true;
    }
    if (type === PointerEventTypes.POINTERUP) {
      if (this._host._lastControlDown[pointerId]) {
        this._host._lastControlDown[pointerId]._onPointerUp(this, this._dummyVector2, pointerId, buttonIndex, true, pi);
      }
      delete this._host._lastControlDown[pointerId];
      return true;
    }
    if (type === PointerEventTypes.POINTERWHEEL) {
      if (this._host._lastControlOver[pointerId]) {
        this._host._lastControlOver[pointerId]._onWheelScroll(deltaX, deltaY);
        return true;
      }
    }
    return false;
  }
  _getStyleProperty(propName, defaultValue) {
    const prop = (this._style && this._style[propName]) ?? this[propName];
    if (!prop && this.parent) {
      return this.parent._getStyleProperty(propName, defaultValue);
    } else if (!this.parent) {
      return defaultValue;
    } else {
      return prop;
    }
  }
  _prepareFont() {
    if (!this._font && !this._fontSet) {
      return;
    }
    this._font = this._getStyleProperty("fontStyle", "") + " " + this._getStyleProperty("fontWeight", "") + " " + this.fontSizeInPixels + "px " + this._getStyleProperty("fontFamily", "Arial");
    this._fontOffset = _Control._GetFontOffset(this._font);
    this.getDescendants().forEach((child) => child._markAllAsDirty());
  }
  /**
   * A control has a dimension fully defined if that dimension doesn't depend on the parent's dimension.
   * As an example, a control that has dimensions in pixels is fully defined, while in percentage is not fully defined.
   * @param dim the dimension to check (width or height)
   * @returns if the dimension is fully defined
   */
  isDimensionFullyDefined(dim) {
    return this.getDimension(dim).isPixel;
  }
  /**
   * Gets the dimension of the control along a specified axis
   * @param dim the dimension to retrieve (width or height)
   * @returns the dimension value along the specified axis
   */
  getDimension(dim) {
    if (dim === "width") {
      return this._width;
    } else {
      return this._height;
    }
  }
  /**
   * Clones a control and its descendants
   * @param host the texture where the control will be instantiated. Can be empty, in which case the control will be created on the same texture
   * @returns the cloned control
   */
  clone(host) {
    const serialization = {};
    this.serialize(serialization, true);
    const controlType = Tools.Instantiate("BABYLON.GUI." + serialization.className);
    const cloned = new controlType();
    cloned.parse(serialization, host);
    return cloned;
  }
  /**
   * Parses a serialized object into this control
   * @param serializedObject the object with the serialized properties
   * @param host the texture where the control will be instantiated. Can be empty, in which case the control will be created on the same texture
   * @returns this control
   */
  parse(serializedObject, host) {
    SerializationHelper.Parse(() => this, serializedObject, null);
    this.name = serializedObject.name;
    this._parseFromContent(serializedObject, host ?? this._host);
    return this;
  }
  /**
   * Serializes the current control
   * @param serializationObject defined the JSON serialized object
   * @param force if the control should be serialized even if the isSerializable flag is set to false (default false)
   */
  serialize(serializationObject, force = false) {
    if (!this.isSerializable && !force) {
      return;
    }
    SerializationHelper.Serialize(this, serializationObject);
    serializationObject.name = this.name;
    serializationObject.className = this.getClassName();
    this._prepareFont();
    if (this._font) {
      serializationObject.fontFamily = this._fontFamily;
      serializationObject.fontSize = this.fontSize;
      serializationObject.fontWeight = this.fontWeight;
      serializationObject.fontStyle = this.fontStyle;
    }
    if (this._gradient) {
      serializationObject.gradient = {};
      this._gradient.serialize(serializationObject.gradient);
    }
    SerializationHelper.AppendSerializedAnimations(this, serializationObject);
  }
  /**
   * @internal
   */
  _parseFromContent(serializedObject, host) {
    var _a;
    if (serializedObject.fontFamily) {
      this.fontFamily = serializedObject.fontFamily;
    }
    if (serializedObject.fontSize) {
      this.fontSize = serializedObject.fontSize;
    }
    if (serializedObject.fontWeight) {
      this.fontWeight = serializedObject.fontWeight;
    }
    if (serializedObject.fontStyle) {
      this.fontStyle = serializedObject.fontStyle;
    }
    if (serializedObject.gradient) {
      const className = Tools.Instantiate("BABYLON.GUI." + serializedObject.gradient.className);
      this._gradient = new className();
      (_a = this._gradient) == null ? void 0 : _a.parse(serializedObject.gradient);
    }
    if (serializedObject.animations) {
      this.animations = [];
      for (let animationIndex = 0; animationIndex < serializedObject.animations.length; animationIndex++) {
        const parsedAnimation = serializedObject.animations[animationIndex];
        const internalClass = GetClass("BABYLON.Animation");
        if (internalClass) {
          this.animations.push(internalClass.Parse(parsedAnimation));
        }
      }
      if (serializedObject.autoAnimate && this._host && this._host.getScene()) {
        this._host.getScene().beginAnimation(this, serializedObject.autoAnimateFrom, serializedObject.autoAnimateTo, serializedObject.autoAnimateLoop, serializedObject.autoAnimateSpeed || 1);
      }
    }
    this.fixedRatioMasterIsWidth = serializedObject.fixedRatioMasterIsWidth ?? this.fixedRatioMasterIsWidth;
  }
  /** Releases associated resources */
  dispose() {
    this.onDirtyObservable.clear();
    this.onBeforeDrawObservable.clear();
    this.onAfterDrawObservable.clear();
    this.onPointerDownObservable.clear();
    this.onPointerEnterObservable.clear();
    this.onPointerMoveObservable.clear();
    this.onPointerOutObservable.clear();
    this.onPointerUpObservable.clear();
    this.onPointerClickObservable.clear();
    this.onWheelObservable.clear();
    if (this._styleObserver && this._style) {
      this._style.onChangedObservable.remove(this._styleObserver);
      this._styleObserver = null;
    }
    if (this.parent) {
      this.parent.removeControl(this);
      this.parent = null;
    }
    if (this._host) {
      const index = this._host._linkedControls.indexOf(this);
      if (index > -1) {
        this.linkWithMesh(null);
      }
    }
    this.onDisposeObservable.notifyObservers(this);
    this.onDisposeObservable.clear();
  }
  /** HORIZONTAL_ALIGNMENT_LEFT */
  static get HORIZONTAL_ALIGNMENT_LEFT() {
    return _Control._HORIZONTAL_ALIGNMENT_LEFT;
  }
  /** HORIZONTAL_ALIGNMENT_RIGHT */
  static get HORIZONTAL_ALIGNMENT_RIGHT() {
    return _Control._HORIZONTAL_ALIGNMENT_RIGHT;
  }
  /** HORIZONTAL_ALIGNMENT_CENTER */
  static get HORIZONTAL_ALIGNMENT_CENTER() {
    return _Control._HORIZONTAL_ALIGNMENT_CENTER;
  }
  /** VERTICAL_ALIGNMENT_TOP */
  static get VERTICAL_ALIGNMENT_TOP() {
    return _Control._VERTICAL_ALIGNMENT_TOP;
  }
  /** VERTICAL_ALIGNMENT_BOTTOM */
  static get VERTICAL_ALIGNMENT_BOTTOM() {
    return _Control._VERTICAL_ALIGNMENT_BOTTOM;
  }
  /** VERTICAL_ALIGNMENT_CENTER */
  static get VERTICAL_ALIGNMENT_CENTER() {
    return _Control._VERTICAL_ALIGNMENT_CENTER;
  }
  /**
   * @internal
   */
  static _GetFontOffset(font) {
    if (_Control._FontHeightSizes[font]) {
      return _Control._FontHeightSizes[font];
    }
    const engine = EngineStore.LastCreatedEngine;
    if (!engine) {
      throw new Error("Invalid engine. Unable to create a canvas.");
    }
    const result = engine.getFontOffset(font);
    _Control._FontHeightSizes[font] = result;
    return result;
  }
  /**
   * Creates a Control from parsed data
   * @param serializedObject defines parsed data
   * @param host defines the hosting AdvancedDynamicTexture
   * @returns a new Control
   */
  static Parse(serializedObject, host) {
    const controlType = Tools.Instantiate("BABYLON.GUI." + serializedObject.className);
    const control = SerializationHelper.Parse(() => new controlType(), serializedObject, null);
    control.name = serializedObject.name;
    control._parseFromContent(serializedObject, host);
    return control;
  }
  /**
   * @internal
   */
  static drawEllipse(x, y, width, height, context) {
    context.translate(x, y);
    context.scale(width, height);
    context.beginPath();
    context.arc(0, 0, 1, 0, 2 * Math.PI);
    context.closePath();
    context.scale(1 / width, 1 / height);
    context.translate(-x, -y);
  }
  /**
   * Returns true if the control is ready to be used
   * @returns
   */
  isReady() {
    return true;
  }
};
Control.AllowAlphaInheritance = false;
Control._ClipMeasure = new Measure(0, 0, 0, 0);
Control._HORIZONTAL_ALIGNMENT_LEFT = 0;
Control._HORIZONTAL_ALIGNMENT_RIGHT = 1;
Control._HORIZONTAL_ALIGNMENT_CENTER = 2;
Control._VERTICAL_ALIGNMENT_TOP = 0;
Control._VERTICAL_ALIGNMENT_BOTTOM = 1;
Control._VERTICAL_ALIGNMENT_CENTER = 2;
Control._FontHeightSizes = {};
Control.AddHeader = () => {
};
__decorate([
  serialize()
], Control.prototype, "metadata", void 0);
__decorate([
  serialize()
], Control.prototype, "isHitTestVisible", void 0);
__decorate([
  serialize()
], Control.prototype, "isPointerBlocker", void 0);
__decorate([
  serialize()
], Control.prototype, "isFocusInvisible", void 0);
__decorate([
  serialize()
], Control.prototype, "clipChildren", null);
__decorate([
  serialize()
], Control.prototype, "clipContent", null);
__decorate([
  serialize()
], Control.prototype, "useBitmapCache", void 0);
__decorate([
  serialize()
], Control.prototype, "shadowOffsetX", null);
__decorate([
  serialize()
], Control.prototype, "shadowOffsetY", null);
__decorate([
  serialize()
], Control.prototype, "shadowBlur", null);
__decorate([
  serialize()
], Control.prototype, "shadowColor", null);
__decorate([
  serialize()
], Control.prototype, "hoverCursor", void 0);
__decorate([
  serialize()
], Control.prototype, "fontOffset", null);
__decorate([
  serialize()
], Control.prototype, "alpha", null);
__decorate([
  serialize()
], Control.prototype, "isSerializable", void 0);
__decorate([
  serialize()
], Control.prototype, "scaleX", null);
__decorate([
  serialize()
], Control.prototype, "scaleY", null);
__decorate([
  serialize()
], Control.prototype, "rotation", null);
__decorate([
  serialize()
], Control.prototype, "transformCenterY", null);
__decorate([
  serialize()
], Control.prototype, "transformCenterX", null);
__decorate([
  serialize()
], Control.prototype, "horizontalAlignment", null);
__decorate([
  serialize()
], Control.prototype, "verticalAlignment", null);
__decorate([
  serialize()
], Control.prototype, "fixedRatio", null);
__decorate([
  serialize()
], Control.prototype, "fixedRatioMasterIsWidth", null);
__decorate([
  serialize()
], Control.prototype, "width", null);
__decorate([
  serialize()
], Control.prototype, "height", null);
__decorate([
  serialize()
], Control.prototype, "style", null);
__decorate([
  serialize()
], Control.prototype, "color", null);
__decorate([
  serialize()
], Control.prototype, "gradient", null);
__decorate([
  serialize()
], Control.prototype, "zIndex", null);
__decorate([
  serialize()
], Control.prototype, "notRenderable", null);
__decorate([
  serialize()
], Control.prototype, "isVisible", null);
__decorate([
  serialize()
], Control.prototype, "descendantsOnlyPadding", null);
__decorate([
  serialize()
], Control.prototype, "paddingLeft", null);
__decorate([
  serialize()
], Control.prototype, "paddingRight", null);
__decorate([
  serialize()
], Control.prototype, "paddingTop", null);
__decorate([
  serialize()
], Control.prototype, "paddingBottom", null);
__decorate([
  serialize()
], Control.prototype, "left", null);
__decorate([
  serialize()
], Control.prototype, "top", null);
__decorate([
  serialize()
], Control.prototype, "linkOffsetX", null);
__decorate([
  serialize()
], Control.prototype, "linkOffsetY", null);
__decorate([
  serialize()
], Control.prototype, "isEnabled", null);
__decorate([
  serialize()
], Control.prototype, "disabledColor", null);
__decorate([
  serialize()
], Control.prototype, "disabledColorItem", null);
__decorate([
  serialize()
], Control.prototype, "overlapGroup", void 0);
__decorate([
  serialize()
], Control.prototype, "overlapDeltaMultiplier", void 0);
RegisterClass("BABYLON.GUI.Control", Control);

// node_modules/@babylonjs/gui/2D/controls/container.js
var Container = class extends Control {
  /** Gets or sets boolean indicating if children should be rendered to an intermediate texture rather than directly to host, useful for alpha blending */
  get renderToIntermediateTexture() {
    return this._renderToIntermediateTexture;
  }
  set renderToIntermediateTexture(value) {
    if (this._renderToIntermediateTexture === value) {
      return;
    }
    this._renderToIntermediateTexture = value;
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating if the container should try to adapt to its children height */
  get adaptHeightToChildren() {
    return this._adaptHeightToChildren;
  }
  set adaptHeightToChildren(value) {
    if (this._adaptHeightToChildren === value) {
      return;
    }
    this._adaptHeightToChildren = value;
    if (value) {
      this.height = "100%";
    }
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating if the container should try to adapt to its children width */
  get adaptWidthToChildren() {
    return this._adaptWidthToChildren;
  }
  set adaptWidthToChildren(value) {
    if (this._adaptWidthToChildren === value) {
      return;
    }
    this._adaptWidthToChildren = value;
    if (value) {
      this.width = "100%";
    }
    this._markAsDirty();
  }
  /** Gets or sets background color */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this._markAsDirty();
  }
  /** Gets or sets background gradient color. Takes precedence over background */
  get backgroundGradient() {
    return this._backgroundGradient;
  }
  set backgroundGradient(value) {
    if (this._backgroundGradient === value) {
      return;
    }
    this._backgroundGradient = value;
    this._markAsDirty();
  }
  /** Gets the list of children */
  get children() {
    return this._children;
  }
  get isReadOnly() {
    return this._isReadOnly;
  }
  set isReadOnly(value) {
    this._isReadOnly = value;
    for (const child of this._children) {
      child.isReadOnly = value;
    }
  }
  /**
   * Creates a new Container
   * @param name defines the name of the container
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._children = new Array();
    this._measureForChildren = Measure.Empty();
    this._background = "";
    this._backgroundGradient = null;
    this._adaptWidthToChildren = false;
    this._adaptHeightToChildren = false;
    this._renderToIntermediateTexture = false;
    this._intermediateTexture = null;
    this.delegatePickingToChildren = false;
    this.logLayoutCycleErrors = false;
    this.maxLayoutCycle = 3;
    this.onControlAddedObservable = new Observable();
    this.onControlRemovedObservable = new Observable();
    this._inverseTransformMatrix = Matrix2D.Identity();
    this._inverseMeasure = new Measure(0, 0, 0, 0);
  }
  _getTypeName() {
    return "Container";
  }
  _flagDescendantsAsMatrixDirty() {
    for (const child of this.children) {
      child._isClipped = false;
      child._markMatrixAsDirty();
    }
  }
  /**
   * Gets a child using its name
   * @param name defines the child name to look for
   * @returns the child control if found
   */
  getChildByName(name22) {
    for (const child of this.children) {
      if (child.name === name22) {
        return child;
      }
    }
    return null;
  }
  /**
   * Gets a child using its type and its name
   * @param name defines the child name to look for
   * @param type defines the child type to look for
   * @returns the child control if found
   */
  getChildByType(name22, type) {
    for (const child of this.children) {
      if (child.typeName === type) {
        return child;
      }
    }
    return null;
  }
  /**
   * Search for a specific control in children
   * @param control defines the control to look for
   * @returns true if the control is in child list
   */
  containsControl(control) {
    return this.children.indexOf(control) !== -1;
  }
  /**
   * Adds a new control to the current container
   * @param control defines the control to add
   * @returns the current container
   */
  addControl(control) {
    if (!control) {
      return this;
    }
    const index = this._children.indexOf(control);
    if (index !== -1) {
      return this;
    }
    control._link(this._host);
    control._markAllAsDirty();
    this._reOrderControl(control);
    this._markAsDirty();
    this.onControlAddedObservable.notifyObservers(control);
    return this;
  }
  /**
   * Removes all controls from the current container
   * @returns the current container
   */
  clearControls() {
    const children = this.children.slice();
    for (const child of children) {
      this.removeControl(child);
    }
    return this;
  }
  /**
   * Removes a control from the current container
   * @param control defines the control to remove
   * @returns the current container
   */
  removeControl(control) {
    const index = this._children.indexOf(control);
    if (index !== -1) {
      this._children.splice(index, 1);
      control.parent = null;
    }
    control.linkWithMesh(null);
    if (this._host) {
      this._host._cleanControlAfterRemoval(control);
    }
    this._markAsDirty();
    this.onControlRemovedObservable.notifyObservers(control);
    return this;
  }
  /**
   * @internal
   */
  _reOrderControl(control) {
    const linkedMesh = control.linkedMesh;
    this.removeControl(control);
    let wasAdded = false;
    for (let index = 0; index < this._children.length; index++) {
      if (this._children[index].zIndex > control.zIndex) {
        this._children.splice(index, 0, control);
        wasAdded = true;
        break;
      }
    }
    if (!wasAdded) {
      this._children.push(control);
    }
    control.parent = this;
    if (linkedMesh) {
      control.linkWithMesh(linkedMesh);
    }
    this._markAsDirty();
  }
  /**
   * @internal
   */
  _offsetLeft(offset) {
    super._offsetLeft(offset);
    for (const child of this._children) {
      child._offsetLeft(offset);
    }
  }
  /**
   * @internal
   */
  _offsetTop(offset) {
    super._offsetTop(offset);
    for (const child of this._children) {
      child._offsetTop(offset);
    }
  }
  /** @internal */
  _markAllAsDirty() {
    super._markAllAsDirty();
    for (let index = 0; index < this._children.length; index++) {
      this._children[index]._markAllAsDirty();
    }
  }
  _getBackgroundColor(context) {
    return this._backgroundGradient ? this._backgroundGradient.getCanvasGradient(context) : this._background;
  }
  /**
   * @internal
   */
  _localDraw(context) {
    if (this._background || this._backgroundGradient) {
      context.save();
      if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
        context.shadowColor = this.shadowColor;
        context.shadowBlur = this.shadowBlur;
        context.shadowOffsetX = this.shadowOffsetX;
        context.shadowOffsetY = this.shadowOffsetY;
      }
      context.fillStyle = this._getBackgroundColor(context);
      context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
      context.restore();
    }
  }
  /**
   * @internal
   */
  _link(host) {
    super._link(host);
    for (const child of this._children) {
      child._link(host);
    }
  }
  /** @internal */
  _beforeLayout() {
  }
  /**
   * @internal
   */
  _processMeasures(parentMeasure, context) {
    if (this._isDirty || !this._cachedParentMeasure.isEqualsTo(parentMeasure)) {
      super._processMeasures(parentMeasure, context);
      this._evaluateClippingState(parentMeasure);
      if (this._renderToIntermediateTexture) {
        if (this._intermediateTexture && this._host.getScene() != this._intermediateTexture.getScene()) {
          this._intermediateTexture.dispose();
          this._intermediateTexture = null;
        }
        if (!this._intermediateTexture) {
          this._intermediateTexture = new DynamicTexture("", { width: this._currentMeasure.width, height: this._currentMeasure.height }, this._host.getScene(), false, Texture.NEAREST_SAMPLINGMODE, Constants.TEXTUREFORMAT_RGBA, false);
          this._intermediateTexture.hasAlpha = true;
        } else {
          this._intermediateTexture.scaleTo(this._currentMeasure.width, this._currentMeasure.height);
        }
      }
    }
  }
  /**
   * @internal
   */
  _layout(parentMeasure, context) {
    var _a, _b;
    if (!this.isDirty && (!this.isVisible || this.notRenderable)) {
      return false;
    }
    this.host._numLayoutCalls++;
    if (this._isDirty) {
      this._currentMeasure.transformToRef(this._transformMatrix, this._prevCurrentMeasureTransformedIntoGlobalSpace);
    }
    let rebuildCount = 0;
    context.save();
    this._applyStates(context);
    this._beforeLayout();
    do {
      let computedWidth = -1;
      let computedHeight = -1;
      this._rebuildLayout = false;
      this._processMeasures(parentMeasure, context);
      if (!this._isClipped) {
        for (const child of this._children) {
          child._tempParentMeasure.copyFrom(this._measureForChildren);
          if (child._layout(this._measureForChildren, context)) {
            if (child.isVisible && !child.notRenderable) {
              if (this.adaptWidthToChildren && child._width.isPixel) {
                computedWidth = Math.max(computedWidth, child._currentMeasure.width + child._paddingLeftInPixels + child._paddingRightInPixels);
              }
              if (this.adaptHeightToChildren && child._height.isPixel) {
                computedHeight = Math.max(computedHeight, child._currentMeasure.height + child._paddingTopInPixels + child._paddingBottomInPixels);
              }
            }
          }
        }
        if (this.adaptWidthToChildren && computedWidth >= 0) {
          computedWidth += this.paddingLeftInPixels + this.paddingRightInPixels;
          if (this.width !== computedWidth + "px") {
            (_a = this.parent) == null ? void 0 : _a._markAsDirty();
            this.width = computedWidth + "px";
            this._width.ignoreAdaptiveScaling = true;
            this._rebuildLayout = true;
          }
        }
        if (this.adaptHeightToChildren && computedHeight >= 0) {
          computedHeight += this.paddingTopInPixels + this.paddingBottomInPixels;
          if (this.height !== computedHeight + "px") {
            (_b = this.parent) == null ? void 0 : _b._markAsDirty();
            this.height = computedHeight + "px";
            this._height.ignoreAdaptiveScaling = true;
            this._rebuildLayout = true;
          }
        }
        this._postMeasure();
      }
      rebuildCount++;
    } while (this._rebuildLayout && rebuildCount < this.maxLayoutCycle);
    if (rebuildCount >= 3 && this.logLayoutCycleErrors) {
      Logger.Error(`Layout cycle detected in GUI (Container name=${this.name}, uniqueId=${this.uniqueId})`);
    }
    context.restore();
    if (this._isDirty) {
      this.invalidateRect();
      this._isDirty = false;
    }
    return true;
  }
  _postMeasure() {
  }
  /**
   * @internal
   */
  _draw(context, invalidatedRectangle) {
    const renderToIntermediateTextureThisDraw = this._renderToIntermediateTexture && this._intermediateTexture;
    const contextToDrawTo = renderToIntermediateTextureThisDraw ? this._intermediateTexture.getContext() : context;
    if (renderToIntermediateTextureThisDraw) {
      contextToDrawTo.save();
      contextToDrawTo.translate(-this._currentMeasure.left, -this._currentMeasure.top);
      if (invalidatedRectangle) {
        this._transformMatrix.invertToRef(this._inverseTransformMatrix);
        invalidatedRectangle.transformToRef(this._inverseTransformMatrix, this._inverseMeasure);
        contextToDrawTo.clearRect(this._inverseMeasure.left, this._inverseMeasure.top, this._inverseMeasure.width, this._inverseMeasure.height);
      } else {
        contextToDrawTo.clearRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
      }
    }
    this._localDraw(contextToDrawTo);
    context.save();
    if (this.clipChildren) {
      this._clipForChildren(contextToDrawTo);
    }
    for (const child of this._children) {
      if (invalidatedRectangle) {
        if (!child._intersectsRect(invalidatedRectangle)) {
          continue;
        }
      }
      child._render(contextToDrawTo, invalidatedRectangle);
    }
    if (renderToIntermediateTextureThisDraw) {
      contextToDrawTo.restore();
      context.save();
      context.globalAlpha = this.alpha;
      context.drawImage(contextToDrawTo.canvas, this._currentMeasure.left, this._currentMeasure.top);
      context.restore();
    }
    context.restore();
  }
  getDescendantsToRef(results, directDescendantsOnly = false, predicate) {
    if (!this.children) {
      return;
    }
    for (let index = 0; index < this.children.length; index++) {
      const item = this.children[index];
      if (!predicate || predicate(item)) {
        results.push(item);
      }
      if (!directDescendantsOnly) {
        item.getDescendantsToRef(results, false, predicate);
      }
    }
  }
  /**
   * @internal
   */
  _processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
    if (!this._isEnabled || !this.isVisible || this.notRenderable) {
      return false;
    }
    const contains = super.contains(x, y);
    if (!contains && this.clipChildren) {
      return false;
    }
    if (this.delegatePickingToChildren) {
      let contains2 = false;
      for (let index = this._children.length - 1; index >= 0; index--) {
        const child = this._children[index];
        if (child.isEnabled && child.isHitTestVisible && child.isVisible && !child.notRenderable && child.contains(x, y)) {
          contains2 = true;
          break;
        }
      }
      if (!contains2) {
        return false;
      }
    }
    for (let index = this._children.length - 1; index >= 0; index--) {
      const child = this._children[index];
      if (child._processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY)) {
        if (child.hoverCursor) {
          this._host._changeCursor(child.hoverCursor);
        }
        return true;
      }
    }
    if (!contains) {
      return false;
    }
    if (!this.isHitTestVisible) {
      return false;
    }
    return this._processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY);
  }
  /**
   * @internal
   */
  _additionalProcessing(parentMeasure, context) {
    super._additionalProcessing(parentMeasure, context);
    this._measureForChildren.copyFrom(this._currentMeasure);
  }
  _getAdaptDimTo(dim) {
    if (dim === "width") {
      return this.adaptWidthToChildren;
    } else {
      return this.adaptHeightToChildren;
    }
  }
  isDimensionFullyDefined(dim) {
    if (this._getAdaptDimTo(dim)) {
      for (const child of this.children) {
        if (!child.isDimensionFullyDefined(dim)) {
          return false;
        }
      }
      return true;
    }
    return super.isDimensionFullyDefined(dim);
  }
  /**
   * Serializes the current control
   * @param serializationObject defined the JSON serialized object
   * @param force force serialization even if isSerializable === false
   */
  serialize(serializationObject, force = false) {
    super.serialize(serializationObject, force);
    if (!this.isSerializable && !force) {
      return;
    }
    if (this.backgroundGradient) {
      serializationObject.backgroundGradient = {};
      this.backgroundGradient.serialize(serializationObject.backgroundGradient);
    }
    if (!this.children.length) {
      return;
    }
    serializationObject.children = [];
    for (const child of this.children) {
      if (child.isSerializable || force) {
        const childSerializationObject = {};
        child.serialize(childSerializationObject);
        serializationObject.children.push(childSerializationObject);
      }
    }
  }
  /** Releases associated resources */
  dispose() {
    var _a;
    super.dispose();
    for (let index = this.children.length - 1; index >= 0; index--) {
      this.children[index].dispose();
    }
    (_a = this._intermediateTexture) == null ? void 0 : _a.dispose();
  }
  /**
   * @internal
   */
  _parseFromContent(serializedObject, host) {
    var _a;
    super._parseFromContent(serializedObject, host);
    this._link(host);
    if (serializedObject.backgroundGradient) {
      const className = Tools.Instantiate("BABYLON.GUI." + serializedObject.backgroundGradient.className);
      this._backgroundGradient = new className();
      (_a = this._backgroundGradient) == null ? void 0 : _a.parse(serializedObject.backgroundGradient);
    }
    if (!serializedObject.children) {
      return;
    }
    for (const childData of serializedObject.children) {
      this.addControl(Control.Parse(childData, host));
    }
  }
  isReady() {
    for (const child of this.children) {
      if (!child.isReady()) {
        return false;
      }
    }
    return true;
  }
};
__decorate([
  serialize()
], Container.prototype, "delegatePickingToChildren", void 0);
__decorate([
  serialize()
], Container.prototype, "renderToIntermediateTexture", null);
__decorate([
  serialize()
], Container.prototype, "maxLayoutCycle", void 0);
__decorate([
  serialize()
], Container.prototype, "adaptHeightToChildren", null);
__decorate([
  serialize()
], Container.prototype, "adaptWidthToChildren", null);
__decorate([
  serialize()
], Container.prototype, "background", null);
__decorate([
  serialize()
], Container.prototype, "backgroundGradient", null);
RegisterClass("BABYLON.GUI.Container", Container);

// node_modules/@babylonjs/gui/2D/controls/rectangle.js
var Rectangle = class extends Container {
  /** Gets or sets border thickness */
  get thickness() {
    return this._thickness;
  }
  set thickness(value) {
    if (this._thickness === value) {
      return;
    }
    this._thickness = value;
    this._markAsDirty();
  }
  /** Gets or sets the corner radius of all angles */
  get cornerRadius() {
    return this._cornerRadius[0];
  }
  set cornerRadius(value) {
    if (value < 0) {
      value = 0;
    }
    if (this._cornerRadius[0] === value && this._cornerRadius[1] === value && this._cornerRadius[2] === value && this._cornerRadius[3] === value) {
      return;
    }
    this._cornerRadius[0] = this._cornerRadius[1] = this._cornerRadius[2] = this._cornerRadius[3] = value;
    this._markAsDirty();
  }
  /** Gets or sets the corner radius top left angle */
  get cornerRadiusX() {
    return this._cornerRadius[0];
  }
  set cornerRadiusX(value) {
    if (this._cornerRadius[0] === value) {
      return;
    }
    this._cornerRadius[0] = value;
  }
  /** Gets or sets the corner radius top right angle */
  get cornerRadiusY() {
    return this._cornerRadius[1];
  }
  set cornerRadiusY(value) {
    if (this._cornerRadius[1] === value) {
      return;
    }
    this._cornerRadius[1] = value;
  }
  /** Gets or sets the corner radius bottom left angle */
  get cornerRadiusZ() {
    return this._cornerRadius[2];
  }
  set cornerRadiusZ(value) {
    if (this._cornerRadius[2] === value) {
      return;
    }
    this._cornerRadius[2] = value;
  }
  /** Gets or sets the corner radius bottom right angle */
  get cornerRadiusW() {
    return this._cornerRadius[3];
  }
  set cornerRadiusW(value) {
    if (this._cornerRadius[3] === value) {
      return;
    }
    this._cornerRadius[3] = value;
  }
  /**
   * Creates a new Rectangle
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._thickness = 1;
    this._cornerRadius = [0, 0, 0, 0];
    this._cachedRadius = [0, 0, 0, 0];
  }
  _getTypeName() {
    return "Rectangle";
  }
  /** @internal */
  _computeAdditionalOffsetX() {
    let additionalWidth = 0;
    if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
      additionalWidth += 1;
    }
    if (this.thickness) {
      additionalWidth += this.thickness / 2;
    }
    return additionalWidth;
  }
  /** @internal */
  _computeAdditionalOffsetY() {
    let additionalHeight = 0;
    if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
      additionalHeight += 1;
    }
    if (this.thickness) {
      additionalHeight += this.thickness / 2;
    }
    return additionalHeight;
  }
  _getRectangleFill(context) {
    return this._getBackgroundColor(context);
  }
  _localDraw(context) {
    context.save();
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    if (this._background || this._backgroundGradient) {
      context.fillStyle = this._getRectangleFill(context);
      if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
        this._drawRoundedRect(context, this._thickness / 2);
        context.fill();
      } else {
        context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
      }
    }
    if (this._thickness) {
      if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
      }
      if (this.color || this.gradient) {
        context.strokeStyle = this.gradient ? this.gradient.getCanvasGradient(context) : this.color;
      }
      context.lineWidth = this._thickness;
      if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
        this._drawRoundedRect(context, this._thickness / 2);
        context.stroke();
      } else {
        context.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, this._currentMeasure.width - this._thickness, this._currentMeasure.height - this._thickness);
      }
    }
    context.restore();
  }
  _additionalProcessing(parentMeasure, context) {
    super._additionalProcessing(parentMeasure, context);
    this._measureForChildren.width -= 2 * this._thickness;
    this._measureForChildren.height -= 2 * this._thickness;
    this._measureForChildren.left += this._thickness;
    this._measureForChildren.top += this._thickness;
  }
  _drawRoundedRect(context, offset = 0) {
    const x = this._currentMeasure.left + offset;
    const y = this._currentMeasure.top + offset;
    const width = this._currentMeasure.width - offset * 2;
    const height = this._currentMeasure.height - offset * 2;
    for (let index = 0; index < this._cornerRadius.length; index++) {
      this._cachedRadius[index] = Math.abs(Math.min(height / 2, Math.min(width / 2, this._cornerRadius[index])));
    }
    context.beginPath();
    context.moveTo(x + this._cachedRadius[0], y);
    context.lineTo(x + width - this._cachedRadius[1], y);
    context.arc(x + width - this._cachedRadius[1], y + this._cachedRadius[1], this._cachedRadius[1], 3 * Math.PI / 2, Math.PI * 2);
    context.lineTo(x + width, y + height - this._cachedRadius[2]);
    context.arc(x + width - this._cachedRadius[2], y + height - this._cachedRadius[2], this._cachedRadius[2], 0, Math.PI / 2);
    context.lineTo(x + this._cachedRadius[3], y + height);
    context.arc(x + this._cachedRadius[3], y + height - this._cachedRadius[3], this._cachedRadius[3], Math.PI / 2, Math.PI);
    context.lineTo(x, y + this._cachedRadius[0]);
    context.arc(x + this._cachedRadius[0], y + this._cachedRadius[0], this._cachedRadius[0], Math.PI, 3 * Math.PI / 2);
    context.closePath();
  }
  _clipForChildren(context) {
    if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
      this._drawRoundedRect(context, this._thickness);
      context.clip();
    }
  }
};
__decorate([
  serialize()
], Rectangle.prototype, "thickness", null);
__decorate([
  serialize()
], Rectangle.prototype, "cornerRadius", null);
__decorate([
  serialize()
], Rectangle.prototype, "cornerRadiusX", null);
__decorate([
  serialize()
], Rectangle.prototype, "cornerRadiusY", null);
__decorate([
  serialize()
], Rectangle.prototype, "cornerRadiusZ", null);
__decorate([
  serialize()
], Rectangle.prototype, "cornerRadiusW", null);
RegisterClass("BABYLON.GUI.Rectangle", Rectangle);

// node_modules/@babylonjs/gui/2D/controls/textBlock.js
var TextWrapping;
(function(TextWrapping2) {
  TextWrapping2[TextWrapping2["Clip"] = 0] = "Clip";
  TextWrapping2[TextWrapping2["WordWrap"] = 1] = "WordWrap";
  TextWrapping2[TextWrapping2["Ellipsis"] = 2] = "Ellipsis";
  TextWrapping2[TextWrapping2["WordWrapEllipsis"] = 3] = "WordWrapEllipsis";
})(TextWrapping || (TextWrapping = {}));
var TextBlock = class extends Control {
  /**
   * Return the line list (you may need to use the onLinesReadyObservable to make sure the list is ready)
   */
  get lines() {
    return this._lines;
  }
  /**
       * Gets or sets a boolean indicating that the TextBlock will be resized to fit its content
  
       */
  get resizeToFit() {
    return this._resizeToFit;
  }
  /**
       * Gets or sets a boolean indicating that the TextBlock will be resized to fit its content
  
       */
  set resizeToFit(value) {
    if (this._resizeToFit === value) {
      return;
    }
    this._resizeToFit = value;
    if (this._resizeToFit) {
      this._width.ignoreAdaptiveScaling = true;
      this._height.ignoreAdaptiveScaling = true;
    }
    this._markAsDirty();
  }
  /**
   * Gets or sets a boolean indicating if text must be wrapped
   */
  get textWrapping() {
    return this._textWrapping;
  }
  /**
   * Gets or sets a boolean indicating if text must be wrapped
   */
  set textWrapping(value) {
    if (this._textWrapping === value) {
      return;
    }
    this._textWrapping = +value;
    this._markAsDirty();
  }
  /**
   * Gets or sets text to display
   */
  get text() {
    return this._text;
  }
  /**
   * Gets or sets text to display
   */
  set text(value) {
    if (this._text === value) {
      return;
    }
    this._text = value + "";
    this._markAsDirty();
    this.onTextChangedObservable.notifyObservers(this);
  }
  /**
   * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
   */
  get textHorizontalAlignment() {
    return this._textHorizontalAlignment;
  }
  /**
   * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
   */
  set textHorizontalAlignment(value) {
    if (this._textHorizontalAlignment === value) {
      return;
    }
    this._textHorizontalAlignment = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
   */
  get textVerticalAlignment() {
    return this._textVerticalAlignment;
  }
  /**
   * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
   */
  set textVerticalAlignment(value) {
    if (this._textVerticalAlignment === value) {
      return;
    }
    this._textVerticalAlignment = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets line spacing value
   */
  set lineSpacing(value) {
    if (this._lineSpacing.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets line spacing value
   */
  get lineSpacing() {
    return this._lineSpacing.toString(this._host);
  }
  /**
   * Gets or sets outlineWidth of the text to display
   */
  get outlineWidth() {
    return this._outlineWidth;
  }
  /**
   * Gets or sets outlineWidth of the text to display
   */
  set outlineWidth(value) {
    if (this._outlineWidth === value) {
      return;
    }
    this._outlineWidth = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets a boolean indicating that text must have underline
   */
  get underline() {
    return this._underline;
  }
  /**
   * Gets or sets a boolean indicating that text must have underline
   */
  set underline(value) {
    if (this._underline === value) {
      return;
    }
    this._underline = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets an boolean indicating that text must be crossed out
   */
  get lineThrough() {
    return this._lineThrough;
  }
  /**
   * Gets or sets an boolean indicating that text must be crossed out
   */
  set lineThrough(value) {
    if (this._lineThrough === value) {
      return;
    }
    this._lineThrough = value;
    this._markAsDirty();
  }
  /**
   * If the outline should be applied to the underline/strike-through too. Has different behavior in Edge/Chrome vs Firefox.
   */
  get applyOutlineToUnderline() {
    return this._applyOutlineToUnderline;
  }
  set applyOutlineToUnderline(value) {
    if (this._applyOutlineToUnderline === value) {
      return;
    }
    this._applyOutlineToUnderline = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets outlineColor of the text to display
   */
  get outlineColor() {
    return this._outlineColor;
  }
  /**
   * Gets or sets outlineColor of the text to display
   */
  set outlineColor(value) {
    if (this._outlineColor === value) {
      return;
    }
    this._outlineColor = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets word divider
   */
  get wordDivider() {
    return this._wordDivider;
  }
  /**
   * Gets or sets word divider
   */
  set wordDivider(value) {
    if (this._wordDivider === value) {
      return;
    }
    this._wordDivider = value;
    this._markAsDirty();
  }
  /**
   * By default, if a text block has text wrapping other than Clip, its width
   * is not resized even if resizeToFit = true. This parameter forces the width
   * to be resized.
   */
  get forceResizeWidth() {
    return this._forceResizeWidth;
  }
  set forceResizeWidth(value) {
    if (this._forceResizeWidth === value) {
      return;
    }
    this._forceResizeWidth = value;
    this._markAsDirty();
  }
  /**
   * Creates a new TextBlock object
   * @param name defines the name of the control
   * @param text defines the text to display (empty string by default)
   */
  constructor(name22, text = "") {
    super(name22);
    this.name = name22;
    this._text = "";
    this._textWrapping = TextWrapping.Clip;
    this._textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    this._textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    this._resizeToFit = false;
    this._lineSpacing = new ValueAndUnit(0);
    this._outlineWidth = 0;
    this._outlineColor = "white";
    this._underline = false;
    this._lineThrough = false;
    this._wordDivider = " ";
    this._forceResizeWidth = false;
    this._applyOutlineToUnderline = false;
    this.onTextChangedObservable = new Observable();
    this.onLinesReadyObservable = new Observable();
    this._linesTemp = [];
    this.text = text;
  }
  _getTypeName() {
    return "TextBlock";
  }
  _processMeasures(parentMeasure, context) {
    if (!this._fontOffset || this.isDirty) {
      this._fontOffset = Control._GetFontOffset(context.font);
    }
    super._processMeasures(parentMeasure, context);
    this._lines = this._breakLines(this._currentMeasure.width, this._currentMeasure.height, context);
    this.onLinesReadyObservable.notifyObservers(this);
    let maxLineWidth = 0;
    for (let i = 0; i < this._lines.length; i++) {
      const line = this._lines[i];
      if (line.width > maxLineWidth) {
        maxLineWidth = line.width;
      }
    }
    if (this._resizeToFit) {
      if (this._textWrapping === TextWrapping.Clip || this._forceResizeWidth) {
        const newWidth = Math.ceil(this._paddingLeftInPixels) + Math.ceil(this._paddingRightInPixels) + Math.ceil(maxLineWidth);
        if (newWidth !== this._width.getValueInPixel(this._host, this._tempParentMeasure.width)) {
          this._width.updateInPlace(newWidth, ValueAndUnit.UNITMODE_PIXEL);
          this._rebuildLayout = true;
        }
      }
      let newHeight = this._paddingTopInPixels + this._paddingBottomInPixels + this._fontOffset.height * this._lines.length | 0;
      if (this._lines.length > 0 && this._lineSpacing.internalValue !== 0) {
        let lineSpacing = 0;
        if (this._lineSpacing.isPixel) {
          lineSpacing = this._lineSpacing.getValue(this._host);
        } else {
          lineSpacing = this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
        }
        newHeight += (this._lines.length - 1) * lineSpacing;
      }
      if (newHeight !== this._height.internalValue) {
        this._height.updateInPlace(newHeight, ValueAndUnit.UNITMODE_PIXEL);
        this._rebuildLayout = true;
      }
    }
  }
  _drawText(text, textWidth, y, context) {
    const width = this._currentMeasure.width;
    let x = 0;
    switch (this._textHorizontalAlignment) {
      case Control.HORIZONTAL_ALIGNMENT_LEFT:
        x = 0;
        break;
      case Control.HORIZONTAL_ALIGNMENT_RIGHT:
        x = width - textWidth;
        break;
      case Control.HORIZONTAL_ALIGNMENT_CENTER:
        x = (width - textWidth) / 2;
        break;
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    if (this.outlineWidth) {
      context.strokeText(text, this._currentMeasure.left + x, y);
    }
    context.fillText(text, this._currentMeasure.left + x, y);
    if (this._underline) {
      this._drawLine(this._currentMeasure.left + x, y + 3, this._currentMeasure.left + x + textWidth, y + 3, context);
    }
    if (this._lineThrough) {
      this._drawLine(this._currentMeasure.left + x, y - this.fontSizeInPixels / 3, this._currentMeasure.left + x + textWidth, y - this.fontSizeInPixels / 3, context);
    }
  }
  _drawLine(xFrom, yFrom, xTo, yTo, context) {
    context.beginPath();
    context.lineWidth = Math.round(this.fontSizeInPixels * 0.05);
    context.moveTo(xFrom, yFrom);
    context.lineTo(xTo, yTo);
    if (this.outlineWidth && this.applyOutlineToUnderline) {
      context.stroke();
      context.fill();
    } else {
      const currentStroke = context.strokeStyle;
      context.strokeStyle = context.fillStyle;
      context.stroke();
      context.strokeStyle = currentStroke;
    }
    context.closePath();
  }
  /**
   * @internal
   */
  _draw(context) {
    context.save();
    this._applyStates(context);
    this._renderLines(context);
    context.restore();
  }
  _applyStates(context) {
    super._applyStates(context);
    if (this.outlineWidth) {
      context.lineWidth = this.outlineWidth;
      context.strokeStyle = this.outlineColor;
      context.lineJoin = "miter";
      context.miterLimit = 2;
    }
  }
  _breakLines(refWidth, refHeight, context) {
    this._linesTemp.length = 0;
    const _lines = this.text.split("\n");
    if (this._textWrapping === TextWrapping.Ellipsis) {
      for (const _line of _lines) {
        this._linesTemp.push(this._parseLineEllipsis(_line, refWidth, context));
      }
    } else if (this._textWrapping === TextWrapping.WordWrap) {
      for (const _line of _lines) {
        this._linesTemp.push(...this._parseLineWordWrap(_line, refWidth, context));
      }
    } else if (this._textWrapping === TextWrapping.WordWrapEllipsis) {
      for (const _line of _lines) {
        this._linesTemp.push(...this._parseLineWordWrapEllipsis(_line, refWidth, refHeight, context));
      }
    } else {
      for (const _line of _lines) {
        this._linesTemp.push(this._parseLine(_line, context));
      }
    }
    return this._linesTemp;
  }
  _parseLine(line = "", context) {
    return { text: line, width: this._getTextMetricsWidth(context.measureText(line)) };
  }
  //Calculate how many characters approximately we need to remove
  _getCharsToRemove(lineWidth, width, lineLength) {
    const diff = lineWidth > width ? lineWidth - width : 0;
    const charWidth = lineWidth / lineLength;
    const removeChars = Math.max(Math.floor(diff / charWidth), 1);
    return removeChars;
  }
  _parseLineEllipsis(line = "", width, context) {
    let lineWidth = this._getTextMetricsWidth(context.measureText(line));
    let removeChars = this._getCharsToRemove(lineWidth, width, line.length);
    const characters = Array.from && Array.from(line);
    if (!characters) {
      while (line.length > 2 && lineWidth > width) {
        line = line.slice(0, -removeChars);
        lineWidth = this._getTextMetricsWidth(context.measureText(line + "…"));
        removeChars = this._getCharsToRemove(lineWidth, width, line.length);
      }
      line += "…";
    } else {
      while (characters.length && lineWidth > width) {
        characters.splice(characters.length - removeChars, removeChars);
        line = `${characters.join("")}…`;
        lineWidth = this._getTextMetricsWidth(context.measureText(line));
        removeChars = this._getCharsToRemove(lineWidth, width, line.length);
      }
    }
    return { text: line, width: lineWidth };
  }
  _getTextMetricsWidth(textMetrics) {
    if (textMetrics.actualBoundingBoxLeft !== void 0) {
      return Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight);
    }
    return textMetrics.width;
  }
  _parseLineWordWrap(line = "", width, context) {
    const lines = [];
    const words = this.wordSplittingFunction ? this.wordSplittingFunction(line) : line.split(this._wordDivider);
    let lineWidth = this._getTextMetricsWidth(context.measureText(line));
    for (let n = 0; n < words.length; n++) {
      const testLine = n > 0 ? line + this._wordDivider + words[n] : words[0];
      const testWidth = this._getTextMetricsWidth(context.measureText(testLine));
      if (testWidth > width && n > 0) {
        lines.push({ text: line, width: lineWidth });
        line = words[n];
        lineWidth = this._getTextMetricsWidth(context.measureText(line));
      } else {
        lineWidth = testWidth;
        line = testLine;
      }
    }
    lines.push({ text: line, width: lineWidth });
    return lines;
  }
  _parseLineWordWrapEllipsis(line = "", width, height, context) {
    const lines = this._parseLineWordWrap(line, width, context);
    for (let n = 1; n <= lines.length; n++) {
      const currentHeight = this._computeHeightForLinesOf(n);
      if (currentHeight > height && n > 1) {
        const lastLine = lines[n - 2];
        const currentLine = lines[n - 1];
        lines[n - 2] = this._parseLineEllipsis(lastLine.text + this._wordDivider + currentLine.text, width, context);
        const linesToRemove = lines.length - n + 1;
        for (let i = 0; i < linesToRemove; i++) {
          lines.pop();
        }
        return lines;
      }
    }
    return lines;
  }
  _renderLines(context) {
    if (!this._fontOffset || !this._lines) {
      return;
    }
    const height = this._currentMeasure.height;
    let rootY = 0;
    switch (this._textVerticalAlignment) {
      case Control.VERTICAL_ALIGNMENT_TOP:
        rootY = this._fontOffset.ascent;
        break;
      case Control.VERTICAL_ALIGNMENT_BOTTOM:
        rootY = height - this._fontOffset.height * (this._lines.length - 1) - this._fontOffset.descent;
        break;
      case Control.VERTICAL_ALIGNMENT_CENTER:
        rootY = this._fontOffset.ascent + (height - this._fontOffset.height * this._lines.length) / 2;
        break;
    }
    rootY += this._currentMeasure.top;
    for (let i = 0; i < this._lines.length; i++) {
      const line = this._lines[i];
      if (i !== 0 && this._lineSpacing.internalValue !== 0) {
        if (this._lineSpacing.isPixel) {
          rootY += this._lineSpacing.getValue(this._host);
        } else {
          rootY = rootY + this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
        }
      }
      this._drawText(line.text, line.width, rootY, context);
      rootY += this._fontOffset.height;
    }
  }
  _computeHeightForLinesOf(lineCount) {
    let newHeight = this._paddingTopInPixels + this._paddingBottomInPixels + this._fontOffset.height * lineCount;
    if (lineCount > 0 && this._lineSpacing.internalValue !== 0) {
      let lineSpacing = 0;
      if (this._lineSpacing.isPixel) {
        lineSpacing = this._lineSpacing.getValue(this._host);
      } else {
        lineSpacing = this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
      }
      newHeight += (lineCount - 1) * lineSpacing;
    }
    return newHeight;
  }
  isDimensionFullyDefined(dim) {
    if (this.resizeToFit) {
      return true;
    }
    return super.isDimensionFullyDefined(dim);
  }
  /**
   * Given a width constraint applied on the text block, find the expected height
   * @returns expected height
   */
  computeExpectedHeight() {
    var _a;
    if (this.text && this.widthInPixels) {
      const context = (_a = EngineStore.LastCreatedEngine) == null ? void 0 : _a.createCanvas(0, 0).getContext("2d");
      if (context) {
        this._applyStates(context);
        if (!this._fontOffset) {
          this._fontOffset = Control._GetFontOffset(context.font);
        }
        const lines = this._lines ? this._lines : this._breakLines(this.widthInPixels - this._paddingLeftInPixels - this._paddingRightInPixels, this.heightInPixels - this._paddingTopInPixels - this._paddingBottomInPixels, context);
        return this._computeHeightForLinesOf(lines.length);
      }
    }
    return 0;
  }
  dispose() {
    super.dispose();
    this.onTextChangedObservable.clear();
  }
};
__decorate([
  serialize()
], TextBlock.prototype, "resizeToFit", null);
__decorate([
  serialize()
], TextBlock.prototype, "textWrapping", null);
__decorate([
  serialize()
], TextBlock.prototype, "text", null);
__decorate([
  serialize()
], TextBlock.prototype, "textHorizontalAlignment", null);
__decorate([
  serialize()
], TextBlock.prototype, "textVerticalAlignment", null);
__decorate([
  serialize()
], TextBlock.prototype, "lineSpacing", null);
__decorate([
  serialize()
], TextBlock.prototype, "outlineWidth", null);
__decorate([
  serialize()
], TextBlock.prototype, "underline", null);
__decorate([
  serialize()
], TextBlock.prototype, "lineThrough", null);
__decorate([
  serialize()
], TextBlock.prototype, "applyOutlineToUnderline", null);
__decorate([
  serialize()
], TextBlock.prototype, "outlineColor", null);
__decorate([
  serialize()
], TextBlock.prototype, "wordDivider", null);
__decorate([
  serialize()
], TextBlock.prototype, "forceResizeWidth", null);
RegisterClass("BABYLON.GUI.TextBlock", TextBlock);

// node_modules/@babylonjs/gui/2D/controls/image.js
var Image = class _Image extends Control {
  /**
   * Gets a boolean indicating that the content is loaded
   */
  get isLoaded() {
    return this._loaded;
  }
  isReady() {
    return this.isLoaded;
  }
  /**
   * Gets or sets a boolean indicating if pointers should only be validated on pixels with alpha > 0.
   * Beware using this as this will consume more memory as the image has to be stored twice
   */
  get detectPointerOnOpaqueOnly() {
    return this._detectPointerOnOpaqueOnly;
  }
  set detectPointerOnOpaqueOnly(value) {
    if (this._detectPointerOnOpaqueOnly === value) {
      return;
    }
    this._detectPointerOnOpaqueOnly = value;
  }
  /**
   * Gets or sets the left value for slicing (9-patch)
   */
  get sliceLeft() {
    return this._sliceLeft;
  }
  set sliceLeft(value) {
    if (this._sliceLeft === value) {
      return;
    }
    this._sliceLeft = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the right value for slicing (9-patch)
   */
  get sliceRight() {
    return this._sliceRight;
  }
  set sliceRight(value) {
    if (this._sliceRight === value) {
      return;
    }
    this._sliceRight = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the top value for slicing (9-patch)
   */
  get sliceTop() {
    return this._sliceTop;
  }
  set sliceTop(value) {
    if (this._sliceTop === value) {
      return;
    }
    this._sliceTop = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the bottom value for slicing (9-patch)
   */
  get sliceBottom() {
    return this._sliceBottom;
  }
  set sliceBottom(value) {
    if (this._sliceBottom === value) {
      return;
    }
    this._sliceBottom = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the left coordinate in the source image
   */
  get sourceLeft() {
    return this._sourceLeft;
  }
  set sourceLeft(value) {
    if (this._sourceLeft === value) {
      return;
    }
    this._sourceLeft = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the top coordinate in the source image
   */
  get sourceTop() {
    return this._sourceTop;
  }
  set sourceTop(value) {
    if (this._sourceTop === value) {
      return;
    }
    this._sourceTop = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the width to capture in the source image
   */
  get sourceWidth() {
    return this._sourceWidth;
  }
  set sourceWidth(value) {
    if (this._sourceWidth === value) {
      return;
    }
    this._sourceWidth = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the height to capture in the source image
   */
  get sourceHeight() {
    return this._sourceHeight;
  }
  set sourceHeight(value) {
    if (this._sourceHeight === value) {
      return;
    }
    this._sourceHeight = value;
    this._markAsDirty();
  }
  /**
   * Gets the image width
   */
  get imageWidth() {
    return this._imageWidth;
  }
  /**
   * Gets the image height
   */
  get imageHeight() {
    return this._imageHeight;
  }
  /**
   * Gets or sets a boolean indicating if nine patch slices (left, top, right, bottom) should be read from image data
   */
  get populateNinePatchSlicesFromImage() {
    return this._populateNinePatchSlicesFromImage;
  }
  set populateNinePatchSlicesFromImage(value) {
    if (this._populateNinePatchSlicesFromImage === value) {
      return;
    }
    this._populateNinePatchSlicesFromImage = value;
    if (this._populateNinePatchSlicesFromImage && this._loaded) {
      this._extractNinePatchSliceDataFromImage();
    }
  }
  /** Indicates if the format of the image is SVG */
  get isSVG() {
    return this._isSVG;
  }
  /** Gets the status of the SVG attributes computation (sourceLeft, sourceTop, sourceWidth, sourceHeight) */
  get svgAttributesComputationCompleted() {
    return this._svgAttributesComputationCompleted;
  }
  /**
   * Gets or sets a boolean indicating if the image can force its container to adapt its size
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
   */
  get autoScale() {
    return this._autoScale;
  }
  set autoScale(value) {
    if (this._autoScale === value) {
      return;
    }
    this._autoScale = value;
    if (value && this._loaded) {
      this.synchronizeSizeWithContent();
    }
  }
  /** Gets or sets the stretching mode used by the image */
  get stretch() {
    return this._stretch;
  }
  set stretch(value) {
    if (this._stretch === value) {
      return;
    }
    this._stretch = value;
    this._markAsDirty();
  }
  /**
   * @internal
   */
  _rotate90(n, preserveProperties = false) {
    var _a, _b;
    const width = this._domImage.width;
    const height = this._domImage.height;
    const engine = ((_b = (_a = this._host) == null ? void 0 : _a.getScene()) == null ? void 0 : _b.getEngine()) || EngineStore.LastCreatedEngine;
    if (!engine) {
      throw new Error("Invalid engine. Unable to create a canvas.");
    }
    const canvas = engine.createCanvas(height, width);
    const context = canvas.getContext("2d");
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(n * Math.PI / 2);
    context.drawImage(this._domImage, 0, 0, width, height, -width / 2, -height / 2, width, height);
    const dataUrl = canvas.toDataURL("image/jpg");
    const rotatedImage = new _Image(this.name + "rotated", dataUrl);
    if (preserveProperties) {
      rotatedImage._stretch = this._stretch;
      rotatedImage._autoScale = this._autoScale;
      rotatedImage._cellId = this._cellId;
      rotatedImage._cellWidth = n % 1 ? this._cellHeight : this._cellWidth;
      rotatedImage._cellHeight = n % 1 ? this._cellWidth : this._cellHeight;
    }
    this._handleRotationForSVGImage(this, rotatedImage, n);
    this._imageDataCache.data = null;
    return rotatedImage;
  }
  _handleRotationForSVGImage(srcImage, dstImage, n) {
    if (!srcImage._isSVG) {
      return;
    }
    if (srcImage._svgAttributesComputationCompleted) {
      this._rotate90SourceProperties(srcImage, dstImage, n);
      this._markAsDirty();
    } else {
      srcImage.onSVGAttributesComputedObservable.addOnce(() => {
        this._rotate90SourceProperties(srcImage, dstImage, n);
        this._markAsDirty();
      });
    }
  }
  _rotate90SourceProperties(srcImage, dstImage, n) {
    let srcLeft = srcImage.sourceLeft, srcTop = srcImage.sourceTop, srcWidth = srcImage.domImage.width, srcHeight = srcImage.domImage.height;
    let dstLeft = srcLeft, dstTop = srcTop, dstWidth = srcImage.sourceWidth, dstHeight = srcImage.sourceHeight;
    if (n != 0) {
      const mult = n < 0 ? -1 : 1;
      n = n % 4;
      for (let i = 0; i < Math.abs(n); ++i) {
        dstLeft = -(srcTop - srcHeight / 2) * mult + srcHeight / 2;
        dstTop = (srcLeft - srcWidth / 2) * mult + srcWidth / 2;
        [dstWidth, dstHeight] = [dstHeight, dstWidth];
        if (n < 0) {
          dstTop -= dstHeight;
        } else {
          dstLeft -= dstWidth;
        }
        srcLeft = dstLeft;
        srcTop = dstTop;
        [srcWidth, srcHeight] = [srcHeight, srcWidth];
      }
    }
    dstImage.sourceLeft = dstLeft;
    dstImage.sourceTop = dstTop;
    dstImage.sourceWidth = dstWidth;
    dstImage.sourceHeight = dstHeight;
  }
  _extractNinePatchSliceDataFromImage() {
    var _a, _b;
    const width = this._domImage.width;
    const height = this._domImage.height;
    if (!this._workingCanvas) {
      const engine = ((_b = (_a = this._host) == null ? void 0 : _a.getScene()) == null ? void 0 : _b.getEngine()) || EngineStore.LastCreatedEngine;
      if (!engine) {
        throw new Error("Invalid engine. Unable to create a canvas.");
      }
      this._workingCanvas = engine.createCanvas(width, height);
    }
    const canvas = this._workingCanvas;
    const context = canvas.getContext("2d");
    context.drawImage(this._domImage, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    this._sliceLeft = -1;
    this._sliceRight = -1;
    for (let x = 0; x < width; x++) {
      const alpha = imageData.data[x * 4 + 3];
      if (alpha > 127 && this._sliceLeft === -1) {
        this._sliceLeft = x;
        continue;
      }
      if (alpha < 127 && this._sliceLeft > -1) {
        this._sliceRight = x;
        break;
      }
    }
    this._sliceTop = -1;
    this._sliceBottom = -1;
    for (let y = 0; y < height; y++) {
      const alpha = imageData.data[y * width * 4 + 3];
      if (alpha > 127 && this._sliceTop === -1) {
        this._sliceTop = y;
        continue;
      }
      if (alpha < 127 && this._sliceTop > -1) {
        this._sliceBottom = y;
        break;
      }
    }
  }
  /**
   * Gets or sets the internal DOM image used to render the control
   */
  set domImage(value) {
    this._domImage = value;
    this._loaded = false;
    this._imageDataCache.data = null;
    if (this._domImage.width) {
      this._onImageLoaded();
    } else {
      this._domImage.onload = () => {
        this._onImageLoaded();
      };
    }
  }
  get domImage() {
    return this._domImage;
  }
  _onImageLoaded() {
    this._imageDataCache.data = null;
    this._imageWidth = this._domImage.width;
    this._imageHeight = this._domImage.height;
    this._loaded = true;
    if (this._populateNinePatchSlicesFromImage) {
      this._extractNinePatchSliceDataFromImage();
    }
    if (this._autoScale) {
      this.synchronizeSizeWithContent();
    }
    this.onImageLoadedObservable.notifyObservers(this);
    this._markAsDirty();
  }
  /**
   * Gets the image source url
   */
  get source() {
    return this._source;
  }
  /**
   * Resets the internal Image Element cache. Can reduce memory usage.
   */
  static ResetImageCache() {
    _Image.SourceImgCache.clear();
  }
  _removeCacheUsage(source) {
    const value = source && _Image.SourceImgCache.get(source);
    if (value) {
      value.timesUsed -= 1;
      if (value.timesUsed === 0) {
        _Image.SourceImgCache.delete(source);
      }
    }
  }
  /**
   * Gets or sets image source url
   */
  set source(value) {
    var _a, _b;
    if (this._source === value) {
      return;
    }
    this._removeCacheUsage(this._source);
    this._loaded = false;
    this._source = value;
    this._imageDataCache.data = null;
    if (value) {
      value = this._svgCheck(value);
    }
    const engine = ((_b = (_a = this._host) == null ? void 0 : _a.getScene()) == null ? void 0 : _b.getEngine()) || EngineStore.LastCreatedEngine;
    if (!engine) {
      throw new Error("Invalid engine. Unable to create a canvas.");
    }
    if (value && _Image.SourceImgCache.has(value)) {
      const cachedData = _Image.SourceImgCache.get(value);
      this._domImage = cachedData.img;
      cachedData.timesUsed += 1;
      if (cachedData.loaded) {
        this._onImageLoaded();
      } else {
        cachedData.waitingForLoadCallback.push(this._onImageLoaded.bind(this));
      }
      return;
    }
    this._domImage = engine.createCanvasImage();
    if (value) {
      _Image.SourceImgCache.set(value, { img: this._domImage, timesUsed: 1, loaded: false, waitingForLoadCallback: [this._onImageLoaded.bind(this)] });
    }
    this._domImage.onload = () => {
      if (value) {
        const cachedData = _Image.SourceImgCache.get(value);
        if (cachedData) {
          cachedData.loaded = true;
          for (const waitingCallback of cachedData.waitingForLoadCallback) {
            waitingCallback();
          }
          cachedData.waitingForLoadCallback.length = 0;
          return;
        }
      }
      this._onImageLoaded();
    };
    if (value) {
      Tools.SetCorsBehavior(value, this._domImage);
      Tools.SetReferrerPolicyBehavior(this.referrerPolicy, this._domImage);
      this._domImage.src = value;
    }
  }
  /**
   * Checks for svg document with icon id present
   * @param value the source svg
   * @returns the svg
   */
  _svgCheck(value) {
    if (window.SVGSVGElement && value.search(/.svg#/gi) !== -1 && value.indexOf("#") === value.lastIndexOf("#")) {
      this._isSVG = true;
      const svgsrc = value.split("#")[0];
      const elemid = value.split("#")[1];
      const svgExist = document.body.querySelector('object[data="' + svgsrc + '"]');
      if (svgExist) {
        const svgDoc = svgExist.contentDocument;
        if (svgDoc && svgDoc.documentElement) {
          const vb = svgDoc.documentElement.getAttribute("viewBox");
          const docwidth = Number(svgDoc.documentElement.getAttribute("width"));
          const docheight = Number(svgDoc.documentElement.getAttribute("height"));
          const elem = svgDoc.getElementById(elemid);
          if (elem && vb && docwidth && docheight) {
            this._getSVGAttribs(svgExist, elemid);
            return value;
          }
        }
        svgExist.addEventListener("load", () => {
          this._getSVGAttribs(svgExist, elemid);
        });
      } else {
        const svgImage = document.createElement("object");
        svgImage.data = svgsrc;
        svgImage.type = "image/svg+xml";
        svgImage.width = "0%";
        svgImage.height = "0%";
        document.body.appendChild(svgImage);
        svgImage.onload = () => {
          const svgobj = document.body.querySelector('object[data="' + svgsrc + '"]');
          if (svgobj) {
            this._getSVGAttribs(svgobj, elemid);
          }
        };
      }
      return svgsrc;
    } else {
      return value;
    }
  }
  /**
   * Sets sourceLeft, sourceTop, sourceWidth, sourceHeight automatically
   * given external svg file and icon id
   * @param svgsrc
   * @param elemid
   */
  _getSVGAttribs(svgsrc, elemid) {
    const svgDoc = svgsrc.contentDocument;
    if (svgDoc && svgDoc.documentElement) {
      const vb = svgDoc.documentElement.getAttribute("viewBox");
      const docwidth = Number(svgDoc.documentElement.getAttribute("width"));
      const docheight = Number(svgDoc.documentElement.getAttribute("height"));
      const elem = svgDoc.getElementById(elemid);
      if (vb && docwidth && docheight && elem) {
        const vb_width = Number(vb.split(" ")[2]);
        const vb_height = Number(vb.split(" ")[3]);
        const elem_bbox = elem.getBBox();
        let elem_matrix_a = 1;
        let elem_matrix_d = 1;
        let elem_matrix_e = 0;
        let elem_matrix_f = 0;
        const mainMatrix = elem.transform.baseVal.consolidate().matrix;
        if (elem.transform && elem.transform.baseVal.consolidate()) {
          elem_matrix_a = mainMatrix.a;
          elem_matrix_d = mainMatrix.d;
          elem_matrix_e = mainMatrix.e;
          elem_matrix_f = mainMatrix.f;
        }
        this.sourceLeft = (elem_matrix_a * elem_bbox.x + elem_matrix_e) * docwidth / vb_width;
        this.sourceTop = (elem_matrix_d * elem_bbox.y + elem_matrix_f) * docheight / vb_height;
        this.sourceWidth = elem_bbox.width * elem_matrix_a * (docwidth / vb_width);
        this.sourceHeight = elem_bbox.height * elem_matrix_d * (docheight / vb_height);
        this._svgAttributesComputationCompleted = true;
        this.onSVGAttributesComputedObservable.notifyObservers(this);
      }
    }
  }
  /**
   * Gets or sets the cell width to use when animation sheet is enabled
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
   */
  get cellWidth() {
    return this._cellWidth;
  }
  set cellWidth(value) {
    if (this._cellWidth === value) {
      return;
    }
    this._cellWidth = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the cell height to use when animation sheet is enabled
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
   */
  get cellHeight() {
    return this._cellHeight;
  }
  set cellHeight(value) {
    if (this._cellHeight === value) {
      return;
    }
    this._cellHeight = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the cell id to use (this will turn on the animation sheet mode)
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
   */
  get cellId() {
    return this._cellId;
  }
  set cellId(value) {
    if (this._cellId === value) {
      return;
    }
    this._cellId = value;
    this._markAsDirty();
  }
  /**
   * Creates a new Image
   * @param name defines the control name
   * @param url defines the image url
   */
  constructor(name22, url = null) {
    super(name22);
    this.name = name22;
    this._workingCanvas = null;
    this._loaded = false;
    this._stretch = _Image.STRETCH_FILL;
    this._autoScale = false;
    this._sourceLeft = 0;
    this._sourceTop = 0;
    this._sourceWidth = 0;
    this._sourceHeight = 0;
    this._svgAttributesComputationCompleted = false;
    this._isSVG = false;
    this._cellWidth = 0;
    this._cellHeight = 0;
    this._cellId = -1;
    this._populateNinePatchSlicesFromImage = false;
    this._imageDataCache = { data: null, key: "" };
    this.onImageLoadedObservable = new Observable();
    this.onSVGAttributesComputedObservable = new Observable();
    this.source = url;
  }
  /**
   * Tests if a given coordinates belong to the current control
   * @param x defines x coordinate to test
   * @param y defines y coordinate to test
   * @returns true if the coordinates are inside the control
   */
  contains(x, y) {
    if (!super.contains(x, y)) {
      return false;
    }
    if (!this._detectPointerOnOpaqueOnly || !this._workingCanvas) {
      return true;
    }
    const width = this._currentMeasure.width | 0;
    const height = this._currentMeasure.height | 0;
    const key = width + "_" + height;
    let imageData = this._imageDataCache.data;
    if (!imageData || this._imageDataCache.key !== key) {
      const canvas = this._workingCanvas;
      const context = canvas.getContext("2d");
      this._imageDataCache.data = imageData = context.getImageData(0, 0, width, height).data;
      this._imageDataCache.key = key;
    }
    x = x - this._currentMeasure.left | 0;
    y = y - this._currentMeasure.top | 0;
    const pickedPixel = imageData[(x + y * width) * 4 + 3];
    return pickedPixel > 0;
  }
  _getTypeName() {
    return "Image";
  }
  /** Force the control to synchronize with its content */
  synchronizeSizeWithContent() {
    if (!this._loaded) {
      return;
    }
    this.width = this._domImage.width + "px";
    this.height = this._domImage.height + "px";
  }
  _processMeasures(parentMeasure, context) {
    if (this._loaded) {
      switch (this._stretch) {
        case _Image.STRETCH_NONE:
          break;
        case _Image.STRETCH_FILL:
          break;
        case _Image.STRETCH_UNIFORM:
          break;
        case _Image.STRETCH_NINE_PATCH:
          break;
        case _Image.STRETCH_EXTEND:
          if (this._autoScale) {
            this.synchronizeSizeWithContent();
          }
          if (this.parent && this.parent.parent) {
            this.parent.adaptWidthToChildren = true;
            this.parent.adaptHeightToChildren = true;
          }
          break;
      }
    }
    super._processMeasures(parentMeasure, context);
  }
  _prepareWorkingCanvasForOpaqueDetection() {
    var _a, _b;
    if (!this._detectPointerOnOpaqueOnly) {
      return;
    }
    const width = this._currentMeasure.width;
    const height = this._currentMeasure.height;
    if (!this._workingCanvas) {
      const engine = ((_b = (_a = this._host) == null ? void 0 : _a.getScene()) == null ? void 0 : _b.getEngine()) || EngineStore.LastCreatedEngine;
      if (!engine) {
        throw new Error("Invalid engine. Unable to create a canvas.");
      }
      this._workingCanvas = engine.createCanvas(width, height);
    }
    const canvas = this._workingCanvas;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
  }
  _drawImage(context, sx, sy, sw, sh, tx, ty, tw, th) {
    context.drawImage(this._domImage, sx, sy, sw, sh, tx, ty, tw, th);
    if (!this._detectPointerOnOpaqueOnly) {
      return;
    }
    const transform = context.getTransform();
    const canvas = this._workingCanvas;
    const workingCanvasContext = canvas.getContext("2d");
    workingCanvasContext.save();
    const ttx = tx - this._currentMeasure.left;
    const tty = ty - this._currentMeasure.top;
    workingCanvasContext.setTransform(transform.a, transform.b, transform.c, transform.d, (ttx + tw) / 2, (tty + th) / 2);
    workingCanvasContext.translate(-(ttx + tw) / 2, -(tty + th) / 2);
    workingCanvasContext.drawImage(this._domImage, sx, sy, sw, sh, ttx, tty, tw, th);
    workingCanvasContext.restore();
  }
  _draw(context) {
    context.save();
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    let x, y, width, height;
    if (this.cellId == -1) {
      x = this._sourceLeft;
      y = this._sourceTop;
      width = this._sourceWidth ? this._sourceWidth : this._imageWidth;
      height = this._sourceHeight ? this._sourceHeight : this._imageHeight;
    } else {
      const rowCount = this._domImage.naturalWidth / this.cellWidth;
      const column = this.cellId / rowCount >> 0;
      const row = this.cellId % rowCount;
      x = this.cellWidth * row;
      y = this.cellHeight * column;
      width = this.cellWidth;
      height = this.cellHeight;
    }
    this._prepareWorkingCanvasForOpaqueDetection();
    this._applyStates(context);
    if (this._loaded) {
      switch (this._stretch) {
        case _Image.STRETCH_NONE:
          this._drawImage(context, x, y, width, height, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
          break;
        case _Image.STRETCH_FILL:
          this._drawImage(context, x, y, width, height, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
          break;
        case _Image.STRETCH_UNIFORM: {
          const hRatio = this._currentMeasure.width / width;
          const vRatio = this._currentMeasure.height / height;
          const ratio = Math.min(hRatio, vRatio);
          const centerX = (this._currentMeasure.width - width * ratio) / 2;
          const centerY = (this._currentMeasure.height - height * ratio) / 2;
          this._drawImage(context, x, y, width, height, this._currentMeasure.left + centerX, this._currentMeasure.top + centerY, width * ratio, height * ratio);
          break;
        }
        case _Image.STRETCH_EXTEND:
          this._drawImage(context, x, y, width, height, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
          break;
        case _Image.STRETCH_NINE_PATCH:
          this._renderNinePatch(context, x, y, width, height);
          break;
      }
    }
    context.restore();
  }
  _renderNinePatch(context, sx, sy, sw, sh) {
    const leftWidth = this._sliceLeft;
    const topHeight = this._sliceTop;
    const bottomHeight = sh - this._sliceBottom;
    const rightWidth = sw - this._sliceRight;
    const centerWidth = this._sliceRight - this._sliceLeft;
    const centerHeight = this._sliceBottom - this._sliceTop;
    const targetCenterWidth = this._currentMeasure.width - rightWidth - leftWidth + 2;
    const targetCenterHeight = this._currentMeasure.height - bottomHeight - topHeight + 2;
    const centerLeftOffset = this._currentMeasure.left + leftWidth - 1;
    const centerTopOffset = this._currentMeasure.top + topHeight - 1;
    const rightOffset = this._currentMeasure.left + this._currentMeasure.width - rightWidth;
    const bottomOffset = this._currentMeasure.top + this._currentMeasure.height - bottomHeight;
    this._drawImage(context, sx, sy, leftWidth, topHeight, this._currentMeasure.left, this._currentMeasure.top, leftWidth, topHeight);
    this._drawImage(context, sx + this._sliceLeft, sy, centerWidth, topHeight, centerLeftOffset + 1, this._currentMeasure.top, targetCenterWidth - 2, topHeight);
    this._drawImage(context, sx + this._sliceRight, sy, rightWidth, topHeight, rightOffset, this._currentMeasure.top, rightWidth, topHeight);
    this._drawImage(context, sx, sy + this._sliceTop, leftWidth, centerHeight, this._currentMeasure.left, centerTopOffset + 1, leftWidth, targetCenterHeight - 2);
    this._drawImage(context, sx + this._sliceLeft, sy + this._sliceTop, centerWidth, centerHeight, centerLeftOffset, centerTopOffset, targetCenterWidth, targetCenterHeight);
    this._drawImage(context, sx + this._sliceRight, sy + this._sliceTop, rightWidth, centerHeight, rightOffset, centerTopOffset + 1, rightWidth, targetCenterHeight - 2);
    this._drawImage(context, sx, sy + this._sliceBottom, leftWidth, bottomHeight, this._currentMeasure.left, bottomOffset, leftWidth, bottomHeight);
    this._drawImage(context, sx + this.sliceLeft, sy + this._sliceBottom, centerWidth, bottomHeight, centerLeftOffset + 1, bottomOffset, targetCenterWidth - 2, bottomHeight);
    this._drawImage(context, sx + this._sliceRight, sy + this._sliceBottom, rightWidth, bottomHeight, rightOffset, bottomOffset, rightWidth, bottomHeight);
  }
  dispose() {
    super.dispose();
    this.onImageLoadedObservable.clear();
    this.onSVGAttributesComputedObservable.clear();
    this._removeCacheUsage(this._source);
  }
};
Image.SourceImgCache = /* @__PURE__ */ new Map();
Image.STRETCH_NONE = 0;
Image.STRETCH_FILL = 1;
Image.STRETCH_UNIFORM = 2;
Image.STRETCH_EXTEND = 3;
Image.STRETCH_NINE_PATCH = 4;
__decorate([
  serialize()
], Image.prototype, "detectPointerOnOpaqueOnly", null);
__decorate([
  serialize()
], Image.prototype, "sliceLeft", null);
__decorate([
  serialize()
], Image.prototype, "sliceRight", null);
__decorate([
  serialize()
], Image.prototype, "sliceTop", null);
__decorate([
  serialize()
], Image.prototype, "sliceBottom", null);
__decorate([
  serialize()
], Image.prototype, "sourceLeft", null);
__decorate([
  serialize()
], Image.prototype, "sourceTop", null);
__decorate([
  serialize()
], Image.prototype, "sourceWidth", null);
__decorate([
  serialize()
], Image.prototype, "sourceHeight", null);
__decorate([
  serialize()
], Image.prototype, "populateNinePatchSlicesFromImage", null);
__decorate([
  serialize()
], Image.prototype, "autoScale", null);
__decorate([
  serialize()
], Image.prototype, "stretch", null);
__decorate([
  serialize()
], Image.prototype, "source", null);
__decorate([
  serialize()
], Image.prototype, "cellWidth", null);
__decorate([
  serialize()
], Image.prototype, "cellHeight", null);
__decorate([
  serialize()
], Image.prototype, "cellId", null);
RegisterClass("BABYLON.GUI.Image", Image);

// node_modules/@babylonjs/gui/2D/controls/button.js
var Button = class extends Rectangle {
  /**
   * Returns the image part of the button (if any)
   */
  get image() {
    return this._image;
  }
  /**
   * Returns the TextBlock part of the button (if any)
   */
  get textBlock() {
    return this._textBlock;
  }
  /**
   * Creates a new Button
   * @param name defines the name of the button
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this.thickness = 1;
    this.isPointerBlocker = true;
    let alphaStore = null;
    this.pointerEnterAnimation = () => {
      alphaStore = this.alpha;
      this.alpha -= 0.1;
    };
    this.pointerOutAnimation = () => {
      if (alphaStore !== null) {
        this.alpha = alphaStore;
      }
    };
    this.pointerDownAnimation = () => {
      this.scaleX -= 0.05;
      this.scaleY -= 0.05;
    };
    this.pointerUpAnimation = () => {
      this.scaleX += 0.05;
      this.scaleY += 0.05;
    };
  }
  _getTypeName() {
    return "Button";
  }
  // While being a container, the button behaves like a control.
  /**
   * @internal
   */
  _processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
    if (!this._isEnabled || !this.isHitTestVisible || !this.isVisible || this.notRenderable) {
      return false;
    }
    if (!super.contains(x, y)) {
      return false;
    }
    if (this.delegatePickingToChildren) {
      let contains = false;
      for (let index = this._children.length - 1; index >= 0; index--) {
        const child = this._children[index];
        if (child.isEnabled && child.isHitTestVisible && child.isVisible && !child.notRenderable && child.contains(x, y)) {
          contains = true;
          break;
        }
      }
      if (!contains) {
        return false;
      }
    }
    this._processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY);
    return true;
  }
  /**
   * @internal
   */
  _onPointerEnter(target, pi) {
    if (!super._onPointerEnter(target, pi)) {
      return false;
    }
    if (!this.isReadOnly && this.pointerEnterAnimation) {
      this.pointerEnterAnimation();
    }
    return true;
  }
  /**
   * @internal
   */
  _onPointerOut(target, pi, force = false) {
    if (!this.isReadOnly && this.pointerOutAnimation) {
      this.pointerOutAnimation();
    }
    super._onPointerOut(target, pi, force);
  }
  /**
   * @internal
   */
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (!this.isReadOnly && this.pointerDownAnimation) {
      this.pointerDownAnimation();
    }
    return true;
  }
  _getRectangleFill(context) {
    if (this.isEnabled) {
      return this._getBackgroundColor(context);
    } else {
      return this._disabledColor;
    }
  }
  /**
   * @internal
   */
  _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
    if (!this.isReadOnly && this.pointerUpAnimation) {
      this.pointerUpAnimation();
    }
    super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi);
  }
  /**
   * Serializes the current button
   * @param serializationObject defines the JSON serialized object
   * @param force force serialization even if isSerializable === false
   */
  serialize(serializationObject, force) {
    super.serialize(serializationObject, force);
    if (!this.isSerializable && !force) {
      return;
    }
    if (this._textBlock) {
      serializationObject.textBlockName = this._textBlock.name;
    }
    if (this._image) {
      serializationObject.imageName = this._image.name;
    }
  }
  /**
   * @internal
   */
  _parseFromContent(serializedObject, host) {
    super._parseFromContent(serializedObject, host);
    if (serializedObject.textBlockName) {
      this._textBlock = this.getChildByName(serializedObject.textBlockName);
    }
    if (serializedObject.imageName) {
      this._image = this.getChildByName(serializedObject.imageName);
    }
  }
  // Statics
  /**
   * Creates a new button made with an image and a text
   * @param name defines the name of the button
   * @param text defines the text of the button
   * @param imageUrl defines the url of the image
   * @returns a new Button
   */
  static CreateImageButton(name22, text, imageUrl) {
    const result = new this(name22);
    const textBlock = new TextBlock(name22 + "_button", text);
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    textBlock.paddingLeft = "20%";
    result.addControl(textBlock);
    const iconImage = new Image(name22 + "_icon", imageUrl);
    iconImage.width = "20%";
    iconImage.stretch = Image.STRETCH_UNIFORM;
    iconImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    result.addControl(iconImage);
    result._image = iconImage;
    result._textBlock = textBlock;
    return result;
  }
  /**
   * Creates a new button made with an image
   * @param name defines the name of the button
   * @param imageUrl defines the url of the image
   * @returns a new Button
   */
  static CreateImageOnlyButton(name22, imageUrl) {
    const result = new this(name22);
    const iconImage = new Image(name22 + "_icon", imageUrl);
    iconImage.stretch = Image.STRETCH_FILL;
    iconImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    result.addControl(iconImage);
    result._image = iconImage;
    return result;
  }
  /**
   * Creates a new button made with a text
   * @param name defines the name of the button
   * @param text defines the text of the button
   * @returns a new Button
   */
  static CreateSimpleButton(name22, text) {
    const result = new this(name22);
    const textBlock = new TextBlock(name22 + "_button", text);
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    result.addControl(textBlock);
    result._textBlock = textBlock;
    return result;
  }
  /**
   * Creates a new button made with an image and a centered text
   * @param name defines the name of the button
   * @param text defines the text of the button
   * @param imageUrl defines the url of the image
   * @returns a new Button
   */
  static CreateImageWithCenterTextButton(name22, text, imageUrl) {
    const result = new this(name22);
    const iconImage = new Image(name22 + "_icon", imageUrl);
    iconImage.stretch = Image.STRETCH_FILL;
    result.addControl(iconImage);
    const textBlock = new TextBlock(name22 + "_button", text);
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    result.addControl(textBlock);
    result._image = iconImage;
    result._textBlock = textBlock;
    return result;
  }
};
RegisterClass("BABYLON.GUI.Button", Button);

// node_modules/@babylonjs/gui/2D/controls/stackPanel.js
var StackPanel = class extends Container {
  /** Gets or sets a boolean indicating if the stack panel is vertical or horizontal*/
  get isVertical() {
    return this._isVertical;
  }
  set isVertical(value) {
    if (this._isVertical === value) {
      return;
    }
    this._isVertical = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the spacing (in pixels) between each child.
   */
  get spacing() {
    return this._spacing;
  }
  set spacing(value) {
    if (this._spacing === value) {
      return;
    }
    this._spacing = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets panel width.
   * This value should not be set when in horizontal mode as it will be computed automatically
   */
  set width(value) {
    if (!this._doNotTrackManualChanges) {
      this._manualWidth = true;
    }
    if (this._width.toString(this._host) === value) {
      return;
    }
    if (this._width.fromString(value)) {
      this._markAsDirty();
    }
  }
  get width() {
    return this._width.toString(this._host);
  }
  /**
   * Gets or sets panel height.
   * This value should not be set when in vertical mode as it will be computed automatically
   */
  set height(value) {
    if (!this._doNotTrackManualChanges) {
      this._manualHeight = true;
    }
    if (this._height.toString(this._host) === value) {
      return;
    }
    if (this._height.fromString(value)) {
      this._markAsDirty();
    }
  }
  get height() {
    return this._height.toString(this._host);
  }
  /**
   * Creates a new StackPanel
   * @param name defines control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._isVertical = true;
    this._manualWidth = false;
    this._manualHeight = false;
    this._doNotTrackManualChanges = false;
    this._spacing = 0;
    this.ignoreLayoutWarnings = false;
  }
  _getTypeName() {
    return "StackPanel";
  }
  /**
   * @internal
   */
  _preMeasure(parentMeasure, context) {
    for (const child of this._children) {
      if (this._isVertical) {
        child.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
      } else {
        child.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
      }
    }
    super._preMeasure(parentMeasure, context);
  }
  _additionalProcessing(parentMeasure, context) {
    super._additionalProcessing(parentMeasure, context);
    this._measureForChildren.copyFrom(parentMeasure);
    this._measureForChildren.left = this._currentMeasure.left;
    this._measureForChildren.top = this._currentMeasure.top;
    if (!this.isVertical || this._manualWidth) {
      this._measureForChildren.width = this._currentMeasure.width;
    }
    if (this.isVertical || this._manualHeight) {
      this._measureForChildren.height = this._currentMeasure.height;
    }
  }
  _postMeasure() {
    let stackWidth = 0;
    let stackHeight = 0;
    const childrenCount = this._children.length;
    for (let index = 0; index < childrenCount; index++) {
      const child = this._children[index];
      if (!child.isVisible || child.notRenderable) {
        continue;
      }
      if (this._isVertical) {
        if (child.top !== stackHeight + "px") {
          child.top = stackHeight + "px";
          this._rebuildLayout = true;
          child._top.ignoreAdaptiveScaling = true;
        }
        if (!this.ignoreLayoutWarnings && !child.isDimensionFullyDefined("height")) {
          Logger.Warn(`Control (Name:${child.name}, UniqueId:${child.uniqueId}) is using height in percentage mode inside a vertical StackPanel`, 1);
        } else {
          stackHeight += child._currentMeasure.height + child._paddingTopInPixels + child._paddingBottomInPixels + (index < childrenCount - 1 ? this._spacing : 0);
        }
      } else {
        if (child.left !== stackWidth + "px") {
          child.left = stackWidth + "px";
          this._rebuildLayout = true;
          child._left.ignoreAdaptiveScaling = true;
        }
        if (!this.ignoreLayoutWarnings && !child.isDimensionFullyDefined("width")) {
          Logger.Warn(`Control (Name:${child.name}, UniqueId:${child.uniqueId}) is using width in percentage mode inside a horizontal StackPanel`, 1);
        } else {
          stackWidth += child._currentMeasure.width + child._paddingLeftInPixels + child._paddingRightInPixels + (index < childrenCount - 1 ? this._spacing : 0);
        }
      }
    }
    stackWidth += this._paddingLeftInPixels + this._paddingRightInPixels;
    stackHeight += this._paddingTopInPixels + this._paddingBottomInPixels;
    this._doNotTrackManualChanges = true;
    let panelWidthChanged = false;
    let panelHeightChanged = false;
    if ((!this._manualHeight || this.adaptHeightToChildren) && this._isVertical) {
      const previousHeight = this.height;
      this.height = stackHeight + "px";
      panelHeightChanged = previousHeight !== this.height || !this._height.ignoreAdaptiveScaling;
    }
    if ((!this._manualWidth || this.adaptWidthToChildren) && !this._isVertical) {
      const previousWidth = this.width;
      this.width = stackWidth + "px";
      panelWidthChanged = previousWidth !== this.width || !this._width.ignoreAdaptiveScaling;
    }
    if (panelHeightChanged) {
      this._height.ignoreAdaptiveScaling = true;
    }
    if (panelWidthChanged) {
      this._width.ignoreAdaptiveScaling = true;
    }
    this._doNotTrackManualChanges = false;
    if (panelWidthChanged || panelHeightChanged) {
      this._rebuildLayout = true;
    }
    super._postMeasure();
  }
  _getManualDim(dim) {
    if (dim === "width") {
      return this._manualWidth;
    } else {
      return this._manualHeight;
    }
  }
  isDimensionFullyDefined(dim) {
    if (dim === "height" ? this.isVertical : !this.isVertical && !this._getManualDim(dim)) {
      for (const child of this._children) {
        if (!child.isDimensionFullyDefined(dim)) {
          return false;
        }
      }
      return true;
    }
    return this.getDimension(dim).isPixel || this._getAdaptDimTo(dim);
  }
  /**
   * Serializes the current control
   * @param serializationObject defined the JSON serialized object
   * @param force force serialization even if isSerializable === false
   */
  serialize(serializationObject, force) {
    super.serialize(serializationObject, force);
    if (!this.isSerializable && !force) {
      return;
    }
    serializationObject.manualWidth = this._manualWidth;
    serializationObject.manualHeight = this._manualHeight;
  }
  /**
   * @internal
   */
  _parseFromContent(serializedObject, host) {
    this._manualWidth = serializedObject.manualWidth;
    this._manualHeight = serializedObject.manualHeight;
    super._parseFromContent(serializedObject, host);
  }
};
__decorate([
  serialize()
], StackPanel.prototype, "ignoreLayoutWarnings", void 0);
__decorate([
  serialize()
], StackPanel.prototype, "isVertical", null);
__decorate([
  serialize()
], StackPanel.prototype, "spacing", null);
__decorate([
  serialize()
], StackPanel.prototype, "width", null);
__decorate([
  serialize()
], StackPanel.prototype, "height", null);
RegisterClass("BABYLON.GUI.StackPanel", StackPanel);

// node_modules/@babylonjs/gui/2D/controls/checkbox.js
var Checkbox = class _Checkbox extends Control {
  /** Gets or sets border thickness  */
  get thickness() {
    return this._thickness;
  }
  set thickness(value) {
    if (this._thickness === value) {
      return;
    }
    this._thickness = value;
    this._markAsDirty();
  }
  /** Gets or sets a value indicating the ratio between overall size and check size */
  get checkSizeRatio() {
    return this._checkSizeRatio;
  }
  set checkSizeRatio(value) {
    value = Math.max(Math.min(1, value), 0);
    if (this._checkSizeRatio === value) {
      return;
    }
    this._checkSizeRatio = value;
    this._markAsDirty();
  }
  /** Gets or sets background color */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating if the checkbox is checked or not */
  get isChecked() {
    return this._isChecked;
  }
  set isChecked(value) {
    if (this._isChecked === value) {
      return;
    }
    this._isChecked = value;
    this._markAsDirty();
    this.onIsCheckedChangedObservable.notifyObservers(value);
  }
  /**
   * Creates a new CheckBox
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._isChecked = false;
    this._background = "black";
    this._checkSizeRatio = 0.8;
    this._thickness = 1;
    this.onIsCheckedChangedObservable = new Observable();
    this.isPointerBlocker = true;
  }
  _getTypeName() {
    return "Checkbox";
  }
  /**
   * @internal
   */
  _draw(context) {
    context.save();
    this._applyStates(context);
    const actualWidth = this._currentMeasure.width - this._thickness;
    const actualHeight = this._currentMeasure.height - this._thickness;
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
    context.fillRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, actualWidth, actualHeight);
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    if (this._isChecked) {
      context.fillStyle = this._isEnabled ? this.color ? this.color : "#ffffff" : this._disabledColorItem;
      const offsetWidth = actualWidth * this._checkSizeRatio;
      const offsetHeight = actualHeight * this._checkSizeRatio;
      context.fillRect(this._currentMeasure.left + this._thickness / 2 + (actualWidth - offsetWidth) / 2, this._currentMeasure.top + this._thickness / 2 + (actualHeight - offsetHeight) / 2, offsetWidth, offsetHeight);
    }
    context.strokeStyle = this.color;
    context.lineWidth = this._thickness;
    context.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, actualWidth, actualHeight);
    context.restore();
  }
  // Events
  /**
   * @internal
   */
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (!this.isReadOnly) {
      this.isChecked = !this.isChecked;
    }
    return true;
  }
  /**
   * Utility function to easily create a checkbox with a header
   * @param title defines the label to use for the header
   * @param onValueChanged defines the callback to call when value changes
   * @returns a StackPanel containing the checkbox and a textBlock
   */
  static AddCheckBoxWithHeader(title, onValueChanged) {
    const panel = new StackPanel();
    panel.isVertical = false;
    panel.height = "30px";
    const checkbox = new _Checkbox();
    checkbox.width = "20px";
    checkbox.height = "20px";
    checkbox.isChecked = true;
    checkbox.color = "green";
    checkbox.onIsCheckedChangedObservable.add(onValueChanged);
    panel.addControl(checkbox);
    const header = new TextBlock();
    header.text = title;
    header.width = "180px";
    header.paddingLeft = "5px";
    header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.color = "white";
    panel.addControl(header);
    return panel;
  }
};
__decorate([
  serialize()
], Checkbox.prototype, "thickness", null);
__decorate([
  serialize()
], Checkbox.prototype, "checkSizeRatio", null);
__decorate([
  serialize()
], Checkbox.prototype, "background", null);
__decorate([
  serialize()
], Checkbox.prototype, "isChecked", null);
RegisterClass("BABYLON.GUI.Checkbox", Checkbox);

// node_modules/@babylonjs/gui/2D/controls/textWrapper.js
var TextWrapper = class {
  get text() {
    return this._characters ? this._characters.join("") : this._text;
  }
  set text(txt) {
    this._text = txt;
    this._characters = Array.from && Array.from(txt);
  }
  get length() {
    return this._characters ? this._characters.length : this._text.length;
  }
  removePart(idxStart, idxEnd, insertTxt) {
    this._text = this._text.slice(0, idxStart) + (insertTxt ? insertTxt : "") + this._text.slice(idxEnd);
    if (this._characters) {
      const newCharacters = insertTxt ? Array.from(insertTxt) : [];
      this._characters.splice(idxStart, idxEnd - idxStart, ...newCharacters);
    }
  }
  charAt(idx) {
    return this._characters ? this._characters[idx] : this._text.charAt(idx);
  }
  substr(from, length) {
    if (this._characters) {
      if (isNaN(from)) {
        from = 0;
      } else if (from >= 0) {
        from = Math.min(from, this._characters.length);
      } else {
        from = this._characters.length + Math.max(from, -this._characters.length);
      }
      if (length === void 0) {
        length = this._characters.length - from;
      } else if (isNaN(length)) {
        length = 0;
      } else if (length < 0) {
        length = 0;
      }
      const temp = [];
      while (--length >= 0) {
        temp[length] = this._characters[from + length];
      }
      return temp.join("");
    }
    return this._text.substr(from, length);
  }
  substring(from, to) {
    if (this._characters) {
      if (isNaN(from)) {
        from = 0;
      } else if (from > this._characters.length) {
        from = this._characters.length;
      } else if (from < 0) {
        from = 0;
      }
      if (to === void 0) {
        to = this._characters.length;
      } else if (isNaN(to)) {
        to = 0;
      } else if (to > this._characters.length) {
        to = this._characters.length;
      } else if (to < 0) {
        to = 0;
      }
      const temp = [];
      let idx = 0;
      while (from < to) {
        temp[idx++] = this._characters[from++];
      }
      return temp.join("");
    }
    return this._text.substring(from, to);
  }
  isWord(index) {
    const rWord = /\w/g;
    return this._characters ? this._characters[index].search(rWord) !== -1 : this._text.search(rWord) !== -1;
  }
};

// node_modules/@babylonjs/gui/2D/controls/inputText.js
var InputText = class extends Control {
  /**
   * Gets or sets outlineWidth of the text to display
   */
  get outlineWidth() {
    return this._outlineWidth;
  }
  set outlineWidth(value) {
    if (this._outlineWidth === value) {
      return;
    }
    this._outlineWidth = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets outlineColor of the text to display
   */
  get outlineColor() {
    return this._outlineColor;
  }
  set outlineColor(value) {
    if (this._outlineColor === value) {
      return;
    }
    this._outlineColor = value;
    this._markAsDirty();
  }
  /** Gets or sets the maximum width allowed by the control */
  get maxWidth() {
    return this._maxWidth.toString(this._host);
  }
  /** Gets the maximum width allowed by the control in pixels */
  get maxWidthInPixels() {
    return this._maxWidth.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set maxWidth(value) {
    if (this._maxWidth.toString(this._host) === value) {
      return;
    }
    if (this._maxWidth.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets the text highlighter transparency; default: 0.4 */
  get highligherOpacity() {
    return this._highligherOpacity;
  }
  set highligherOpacity(value) {
    if (this._highligherOpacity === value) {
      return;
    }
    this._highligherOpacity = value;
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating whether to select complete text by default on input focus */
  get onFocusSelectAll() {
    return this._onFocusSelectAll;
  }
  set onFocusSelectAll(value) {
    if (this._onFocusSelectAll === value) {
      return;
    }
    this._onFocusSelectAll = value;
    this._markAsDirty();
  }
  /** Gets or sets the text hightlight color */
  get textHighlightColor() {
    return this._textHighlightColor;
  }
  set textHighlightColor(value) {
    if (this._textHighlightColor === value) {
      return;
    }
    this._textHighlightColor = value;
    this._markAsDirty();
  }
  /** Gets or sets control margin */
  get margin() {
    return this._margin.toString(this._host);
  }
  /** Gets control margin in pixels */
  get marginInPixels() {
    return this._margin.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set margin(value) {
    if (this._margin.toString(this._host) === value) {
      return;
    }
    if (this._margin.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets a boolean indicating if the control can auto stretch its width to adapt to the text */
  get autoStretchWidth() {
    return this._autoStretchWidth;
  }
  set autoStretchWidth(value) {
    if (this._autoStretchWidth === value) {
      return;
    }
    this._autoStretchWidth = value;
    this._markAsDirty();
  }
  /** Gets or sets border thickness */
  get thickness() {
    return this._thickness;
  }
  set thickness(value) {
    if (this._thickness === value) {
      return;
    }
    this._thickness = value;
    this._markAsDirty();
  }
  /** Gets or sets the background color when focused */
  get focusedBackground() {
    return this._focusedBackground;
  }
  set focusedBackground(value) {
    if (this._focusedBackground === value) {
      return;
    }
    this._focusedBackground = value;
    this._markAsDirty();
  }
  /** Gets or sets the background color when focused */
  get focusedColor() {
    return this._focusedColor;
  }
  set focusedColor(value) {
    if (this._focusedColor === value) {
      return;
    }
    this._focusedColor = value;
    this._markAsDirty();
  }
  /** Gets or sets the background color */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this._markAsDirty();
  }
  /** Gets or sets the placeholder color */
  get placeholderColor() {
    return this._placeholderColor;
  }
  set placeholderColor(value) {
    if (this._placeholderColor === value) {
      return;
    }
    this._placeholderColor = value;
    this._markAsDirty();
  }
  /** Gets or sets the text displayed when the control is empty */
  get placeholderText() {
    return this._placeholderText;
  }
  set placeholderText(value) {
    if (this._placeholderText === value) {
      return;
    }
    this._placeholderText = value;
    this._markAsDirty();
  }
  /** Gets or sets the dead key. 0 to disable. */
  get deadKey() {
    return this._deadKey;
  }
  set deadKey(flag) {
    this._deadKey = flag;
  }
  /** Gets or sets the highlight text */
  get highlightedText() {
    return this._highlightedText;
  }
  set highlightedText(text) {
    if (this._highlightedText === text) {
      return;
    }
    this._highlightedText = text;
    this._markAsDirty();
  }
  /** Gets or sets if the current key should be added */
  get addKey() {
    return this._addKey;
  }
  set addKey(flag) {
    this._addKey = flag;
  }
  /** Gets or sets the value of the current key being entered */
  get currentKey() {
    return this._currentKey;
  }
  set currentKey(key) {
    this._currentKey = key;
  }
  /** Gets or sets the text displayed in the control */
  get text() {
    return this._textWrapper.text;
  }
  set text(value) {
    const valueAsString = value.toString();
    if (!this._textWrapper) {
      this._textWrapper = new TextWrapper();
    }
    if (this._textWrapper.text === valueAsString) {
      return;
    }
    this._textWrapper.text = valueAsString;
    this._textHasChanged();
  }
  _textHasChanged() {
    this._markAsDirty();
    this.onTextChangedObservable.notifyObservers(this);
  }
  _applyStates(context) {
    super._applyStates(context);
    if (this.outlineWidth) {
      context.lineWidth = this.outlineWidth;
      context.strokeStyle = this.outlineColor;
    }
  }
  /** Gets or sets control width */
  get width() {
    return this._width.toString(this._host);
  }
  set width(value) {
    if (this._width.toString(this._host) === value) {
      return;
    }
    if (this._width.fromString(value)) {
      this._markAsDirty();
    }
    this.autoStretchWidth = false;
  }
  /**
   * Creates a new InputText
   * @param name defines the control name
   * @param text defines the text of the control
   */
  constructor(name22, text = "") {
    super(name22);
    this.name = name22;
    this._placeholderText = "";
    this._background = "#222222";
    this._focusedBackground = "#000000";
    this._focusedColor = "white";
    this._placeholderColor = "gray";
    this._thickness = 1;
    this._margin = new ValueAndUnit(10, ValueAndUnit.UNITMODE_PIXEL);
    this._autoStretchWidth = true;
    this._maxWidth = new ValueAndUnit(1, ValueAndUnit.UNITMODE_PERCENTAGE, false);
    this._isFocused = false;
    this._blinkIsEven = false;
    this._cursorOffset = 0;
    this._deadKey = false;
    this._addKey = true;
    this._currentKey = "";
    this._isTextHighlightOn = false;
    this._textHighlightColor = "#d5e0ff";
    this._highligherOpacity = 0.4;
    this._highlightedText = "";
    this._startHighlightIndex = 0;
    this._endHighlightIndex = 0;
    this._cursorIndex = -1;
    this._outlineWidth = 0;
    this._outlineColor = "white";
    this._onFocusSelectAll = false;
    this._isPointerDown = false;
    this.promptMessage = "Please enter text:";
    this.disableMobilePrompt = false;
    this.onTextChangedObservable = new Observable();
    this.onBeforeKeyAddObservable = new Observable();
    this.onFocusObservable = new Observable();
    this.onBlurObservable = new Observable();
    this.onTextHighlightObservable = new Observable();
    this.onTextCopyObservable = new Observable();
    this.onTextCutObservable = new Observable();
    this.onTextPasteObservable = new Observable();
    this.onKeyboardEventProcessedObservable = new Observable();
    this.text = text;
    this.isPointerBlocker = true;
  }
  /** @internal */
  onBlur() {
    this._isFocused = false;
    this._scrollLeft = null;
    this._cursorOffset = 0;
    clearTimeout(this._blinkTimeout);
    this._markAsDirty();
    this.onBlurObservable.notifyObservers(this);
    this._host.unRegisterClipboardEvents();
    if (this._onClipboardObserver) {
      this._host.onClipboardObservable.remove(this._onClipboardObserver);
    }
    const scene = this._host.getScene();
    if (this._onPointerDblTapObserver && scene) {
      scene.onPointerObservable.remove(this._onPointerDblTapObserver);
    }
  }
  /** @internal */
  onFocus() {
    if (!this._isEnabled) {
      return;
    }
    this._scrollLeft = null;
    this._isFocused = true;
    this._blinkIsEven = false;
    this._cursorOffset = 0;
    this._markAsDirty();
    this.onFocusObservable.notifyObservers(this);
    if (this._focusedBy === "touch" && !this.disableMobilePrompt) {
      const value = prompt(this.promptMessage);
      if (value !== null) {
        this.text = value;
      }
      this._host.focusedControl = null;
      return;
    }
    this._host.registerClipboardEvents();
    this._onClipboardObserver = this._host.onClipboardObservable.add((clipboardInfo) => {
      switch (clipboardInfo.type) {
        case ClipboardEventTypes.COPY:
          this._onCopyText(clipboardInfo.event);
          this.onTextCopyObservable.notifyObservers(this);
          break;
        case ClipboardEventTypes.CUT:
          this._onCutText(clipboardInfo.event);
          this.onTextCutObservable.notifyObservers(this);
          break;
        case ClipboardEventTypes.PASTE:
          this._onPasteText(clipboardInfo.event);
          this.onTextPasteObservable.notifyObservers(this);
          break;
        default:
          return;
      }
    });
    const scene = this._host.getScene();
    if (scene) {
      this._onPointerDblTapObserver = scene.onPointerObservable.add((pointerInfo) => {
        if (!this._isFocused) {
          return;
        }
        if (pointerInfo.type === PointerEventTypes.POINTERDOUBLETAP) {
          this._processDblClick(pointerInfo);
        }
      });
    }
    if (this._onFocusSelectAll) {
      this._selectAllText();
    }
  }
  /**
   * Function to focus an inputText programmatically
   */
  focus() {
    this._host.moveFocusToControl(this);
  }
  /**
   * Function to unfocus an inputText programmatically
   */
  blur() {
    this._host.focusedControl = null;
  }
  _getTypeName() {
    return "InputText";
  }
  /**
   * Function called to get the list of controls that should not steal the focus from this control
   * @returns an array of controls
   */
  keepsFocusWith() {
    if (!this._connectedVirtualKeyboard) {
      return null;
    }
    return [this._connectedVirtualKeyboard];
  }
  /**
   * @internal
   */
  processKey(keyCode, key, evt) {
    if (this.isReadOnly) {
      return;
    }
    if (evt && (evt.ctrlKey || evt.metaKey) && (keyCode === 67 || keyCode === 86 || keyCode === 88)) {
      return;
    }
    if (evt && (evt.ctrlKey || evt.metaKey) && keyCode === 65) {
      this._selectAllText();
      evt.preventDefault();
      return;
    }
    switch (keyCode) {
      case 32:
        key = " ";
        break;
      case 191:
        if (evt) {
          evt.preventDefault();
        }
        break;
      case 8:
        if (this._textWrapper.text && this._textWrapper.length > 0) {
          if (this.isTextHighlightOn) {
            this._textWrapper.removePart(this._startHighlightIndex, this._endHighlightIndex);
            this._textHasChanged();
            this.isTextHighlightOn = false;
            this._cursorOffset = this._textWrapper.length - this._startHighlightIndex;
            this._blinkIsEven = false;
            if (evt) {
              evt.preventDefault();
            }
            return;
          }
          if (this._cursorOffset === 0) {
            this.text = this._textWrapper.substr(0, this._textWrapper.length - 1);
          } else {
            const deletePosition = this._textWrapper.length - this._cursorOffset;
            if (deletePosition > 0) {
              this._textWrapper.removePart(deletePosition - 1, deletePosition);
              this._textHasChanged();
            }
          }
        }
        if (evt) {
          evt.preventDefault();
        }
        return;
      case 46:
        if (this.isTextHighlightOn) {
          this._textWrapper.removePart(this._startHighlightIndex, this._endHighlightIndex);
          this._textHasChanged();
          this.isTextHighlightOn = false;
          this._cursorOffset = this._textWrapper.length - this._startHighlightIndex;
          if (evt) {
            evt.preventDefault();
          }
          return;
        }
        if (this._textWrapper.text && this._textWrapper.length > 0 && this._cursorOffset > 0) {
          const deletePosition = this._textWrapper.length - this._cursorOffset;
          this._textWrapper.removePart(deletePosition, deletePosition + 1);
          this._textHasChanged();
          this._cursorOffset--;
        }
        if (evt) {
          evt.preventDefault();
        }
        return;
      case 13:
        this._host.focusedControl = null;
        this.isTextHighlightOn = false;
        return;
      case 35:
        this._cursorOffset = 0;
        this._blinkIsEven = false;
        this.isTextHighlightOn = false;
        this._markAsDirty();
        return;
      case 36:
        this._cursorOffset = this._textWrapper.length;
        this._blinkIsEven = false;
        this.isTextHighlightOn = false;
        this._markAsDirty();
        return;
      case 37:
        this._cursorOffset++;
        if (this._cursorOffset > this._textWrapper.length) {
          this._cursorOffset = this._textWrapper.length;
        }
        if (evt && evt.shiftKey) {
          this._blinkIsEven = false;
          if (evt.ctrlKey || evt.metaKey) {
            if (!this.isTextHighlightOn) {
              if (this._textWrapper.length === this._cursorOffset) {
                return;
              } else {
                this._endHighlightIndex = this._textWrapper.length - this._cursorOffset + 1;
              }
            }
            this._startHighlightIndex = 0;
            this._cursorIndex = this._textWrapper.length - this._endHighlightIndex;
            this._cursorOffset = this._textWrapper.length;
            this.isTextHighlightOn = true;
            this._markAsDirty();
            return;
          }
          if (!this.isTextHighlightOn) {
            this.isTextHighlightOn = true;
            this._cursorIndex = this._cursorOffset >= this._textWrapper.length ? this._textWrapper.length : this._cursorOffset - 1;
          } else if (this._cursorIndex === -1) {
            this._cursorIndex = this._textWrapper.length - this._endHighlightIndex;
            this._cursorOffset = this._startHighlightIndex === 0 ? this._textWrapper.length : this._textWrapper.length - this._startHighlightIndex + 1;
          }
          if (this._cursorIndex < this._cursorOffset) {
            this._endHighlightIndex = this._textWrapper.length - this._cursorIndex;
            this._startHighlightIndex = this._textWrapper.length - this._cursorOffset;
          } else if (this._cursorIndex > this._cursorOffset) {
            this._endHighlightIndex = this._textWrapper.length - this._cursorOffset;
            this._startHighlightIndex = this._textWrapper.length - this._cursorIndex;
          } else {
            this.isTextHighlightOn = false;
          }
          this._markAsDirty();
          return;
        }
        if (this.isTextHighlightOn) {
          this._cursorOffset = this._textWrapper.length - this._startHighlightIndex;
          this.isTextHighlightOn = false;
        }
        if (evt && (evt.ctrlKey || evt.metaKey)) {
          this._cursorOffset = this._textWrapper.length;
          evt.preventDefault();
        }
        this._blinkIsEven = false;
        this.isTextHighlightOn = false;
        this._cursorIndex = -1;
        this._markAsDirty();
        return;
      case 39:
        this._cursorOffset--;
        if (this._cursorOffset < 0) {
          this._cursorOffset = 0;
        }
        if (evt && evt.shiftKey) {
          this._blinkIsEven = false;
          if (evt.ctrlKey || evt.metaKey) {
            if (!this.isTextHighlightOn) {
              if (this._cursorOffset === 0) {
                return;
              } else {
                this._startHighlightIndex = this._textWrapper.length - this._cursorOffset - 1;
              }
            }
            this._endHighlightIndex = this._textWrapper.length;
            this.isTextHighlightOn = true;
            this._cursorIndex = this._textWrapper.length - this._startHighlightIndex;
            this._cursorOffset = 0;
            this._markAsDirty();
            return;
          }
          if (!this.isTextHighlightOn) {
            this.isTextHighlightOn = true;
            this._cursorIndex = this._cursorOffset <= 0 ? 0 : this._cursorOffset + 1;
          } else if (this._cursorIndex === -1) {
            this._cursorIndex = this._textWrapper.length - this._startHighlightIndex;
            this._cursorOffset = this._textWrapper.length === this._endHighlightIndex ? 0 : this._textWrapper.length - this._endHighlightIndex - 1;
          }
          if (this._cursorIndex < this._cursorOffset) {
            this._endHighlightIndex = this._textWrapper.length - this._cursorIndex;
            this._startHighlightIndex = this._textWrapper.length - this._cursorOffset;
          } else if (this._cursorIndex > this._cursorOffset) {
            this._endHighlightIndex = this._textWrapper.length - this._cursorOffset;
            this._startHighlightIndex = this._textWrapper.length - this._cursorIndex;
          } else {
            this.isTextHighlightOn = false;
          }
          this._markAsDirty();
          return;
        }
        if (this.isTextHighlightOn) {
          this._cursorOffset = this._textWrapper.length - this._endHighlightIndex;
          this.isTextHighlightOn = false;
        }
        if (evt && (evt.ctrlKey || evt.metaKey)) {
          this._cursorOffset = 0;
          evt.preventDefault();
        }
        this._blinkIsEven = false;
        this.isTextHighlightOn = false;
        this._cursorIndex = -1;
        this._markAsDirty();
        return;
    }
    if (keyCode === 32) {
      key = (evt == null ? void 0 : evt.key) ?? " ";
    }
    this._deadKey = key === "Dead";
    if (key && (keyCode === -1 || // Direct access
    keyCode === 32 || // Space
    keyCode === 34 || // "    add support for single and double quotes
    keyCode === 39 || // '
    keyCode > 47 && keyCode < 64 || // Numbers
    keyCode > 64 && keyCode < 91 || // Letters
    keyCode > 159 && keyCode < 193 || // Special characters
    keyCode > 218 && keyCode < 223 || // Special characters
    keyCode > 95 && keyCode < 112)) {
      this._currentKey = key;
      this.onBeforeKeyAddObservable.notifyObservers(this);
      key = this._currentKey;
      if (this._addKey && !this._deadKey) {
        if (this.isTextHighlightOn) {
          this._textWrapper.removePart(this._startHighlightIndex, this._endHighlightIndex, key);
          this._textHasChanged();
          this._cursorOffset = this._textWrapper.length - (this._startHighlightIndex + 1);
          this.isTextHighlightOn = false;
          this._blinkIsEven = false;
          this._markAsDirty();
        } else if (this._cursorOffset === 0) {
          this.text += this._deadKey && (evt == null ? void 0 : evt.key) ? evt.key : key;
        } else {
          const insertPosition = this._textWrapper.length - this._cursorOffset;
          this._textWrapper.removePart(insertPosition, insertPosition, key);
          this._textHasChanged();
        }
      }
    }
  }
  /**
   * @internal
   */
  _updateValueFromCursorIndex(offset) {
    this._blinkIsEven = false;
    if (this._cursorIndex === -1) {
      this._cursorIndex = offset;
    } else {
      if (this._cursorIndex < this._cursorOffset) {
        this._endHighlightIndex = this._textWrapper.length - this._cursorIndex;
        this._startHighlightIndex = this._textWrapper.length - this._cursorOffset;
      } else if (this._cursorIndex > this._cursorOffset) {
        this._endHighlightIndex = this._textWrapper.length - this._cursorOffset;
        this._startHighlightIndex = this._textWrapper.length - this._cursorIndex;
      } else {
        this.isTextHighlightOn = false;
        this._markAsDirty();
        return;
      }
    }
    this.isTextHighlightOn = true;
    this._markAsDirty();
  }
  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _processDblClick(evt) {
    this._startHighlightIndex = this._textWrapper.length - this._cursorOffset;
    this._endHighlightIndex = this._startHighlightIndex;
    let moveLeft, moveRight;
    do {
      moveRight = this._endHighlightIndex < this._textWrapper.length && this._textWrapper.isWord(this._endHighlightIndex) ? ++this._endHighlightIndex : 0;
      moveLeft = this._startHighlightIndex > 0 && this._textWrapper.isWord(this._startHighlightIndex - 1) ? --this._startHighlightIndex : 0;
    } while (moveLeft || moveRight);
    this._cursorOffset = this._textWrapper.length - this._startHighlightIndex;
    this.isTextHighlightOn = true;
    this._clickedCoordinate = null;
    this._blinkIsEven = true;
    this._cursorIndex = -1;
    this._markAsDirty();
  }
  /** @internal */
  _selectAllText() {
    this._blinkIsEven = true;
    this.isTextHighlightOn = true;
    this._startHighlightIndex = 0;
    this._endHighlightIndex = this._textWrapper.length;
    this._cursorOffset = this._textWrapper.length;
    this._cursorIndex = -1;
    this._markAsDirty();
  }
  /**
   * Handles the keyboard event
   * @param evt Defines the KeyboardEvent
   */
  processKeyboard(evt) {
    this.processKey(evt.keyCode, evt.key, evt);
    this.onKeyboardEventProcessedObservable.notifyObservers(evt);
  }
  /**
   * @internal
   */
  _onCopyText(ev) {
    this.isTextHighlightOn = false;
    try {
      ev.clipboardData && ev.clipboardData.setData("text/plain", this._highlightedText);
    } catch {
    }
    this._host.clipboardData = this._highlightedText;
  }
  /**
   * @internal
   */
  _onCutText(ev) {
    if (!this._highlightedText) {
      return;
    }
    this._textWrapper.removePart(this._startHighlightIndex, this._endHighlightIndex);
    this._textHasChanged();
    this.isTextHighlightOn = false;
    this._cursorOffset = this._textWrapper.length - this._startHighlightIndex;
    try {
      ev.clipboardData && ev.clipboardData.setData("text/plain", this._highlightedText);
    } catch {
    }
    this._host.clipboardData = this._highlightedText;
    this._highlightedText = "";
  }
  /**
   * @internal
   */
  _onPasteText(ev) {
    let data = "";
    if (ev.clipboardData && ev.clipboardData.types.indexOf("text/plain") !== -1) {
      data = ev.clipboardData.getData("text/plain");
    } else {
      data = this._host.clipboardData;
    }
    const insertPosition = this._textWrapper.length - this._cursorOffset;
    this._textWrapper.removePart(insertPosition, insertPosition, data);
    this._textHasChanged();
  }
  _draw(context) {
    context.save();
    this._applyStates(context);
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    if (this._isFocused) {
      if (this._focusedBackground) {
        context.fillStyle = this._isEnabled ? this._focusedBackground : this._disabledColor;
        context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
      }
    } else if (this._background) {
      context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
      context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    if (!this._fontOffset || this._wasDirty) {
      this._fontOffset = Control._GetFontOffset(context.font);
    }
    const clipTextLeft = this._currentMeasure.left + this._margin.getValueInPixel(this._host, this._tempParentMeasure.width);
    if (this.color) {
      context.fillStyle = this.color;
    }
    let text = this._beforeRenderText(this._textWrapper);
    if (!this._isFocused && !this._textWrapper.text && this._placeholderText) {
      text = new TextWrapper();
      text.text = this._placeholderText;
      if (this._placeholderColor) {
        context.fillStyle = this._placeholderColor;
      }
    }
    this._textWidth = context.measureText(text.text).width;
    const marginWidth = this._margin.getValueInPixel(this._host, this._tempParentMeasure.width) * 2;
    if (this._autoStretchWidth) {
      this.width = Math.min(this._maxWidth.getValueInPixel(this._host, this._tempParentMeasure.width), this._textWidth + marginWidth) + "px";
      this._autoStretchWidth = true;
    }
    const rootY = this._fontOffset.ascent + (this._currentMeasure.height - this._fontOffset.height) / 2;
    const availableWidth = this._width.getValueInPixel(this._host, this._tempParentMeasure.width) - marginWidth;
    context.save();
    context.beginPath();
    context.rect(clipTextLeft, this._currentMeasure.top + (this._currentMeasure.height - this._fontOffset.height) / 2, availableWidth + 2, this._currentMeasure.height);
    context.clip();
    if (this._isFocused && this._textWidth > availableWidth) {
      const textLeft = clipTextLeft - this._textWidth + availableWidth;
      if (!this._scrollLeft) {
        this._scrollLeft = textLeft;
      }
    } else {
      this._scrollLeft = clipTextLeft;
    }
    if (this.outlineWidth) {
      context.strokeText(text.text, this._scrollLeft, this._currentMeasure.top + rootY);
    }
    context.fillText(text.text, this._scrollLeft, this._currentMeasure.top + rootY);
    if (this._isFocused) {
      if (this._clickedCoordinate) {
        const rightPosition = this._scrollLeft + this._textWidth;
        const absoluteCursorPosition = rightPosition - this._clickedCoordinate;
        let currentSize = 0;
        this._cursorOffset = 0;
        let previousDist = 0;
        do {
          if (this._cursorOffset) {
            previousDist = Math.abs(absoluteCursorPosition - currentSize);
          }
          this._cursorOffset++;
          currentSize = context.measureText(text.substr(text.length - this._cursorOffset, this._cursorOffset)).width;
        } while (currentSize < absoluteCursorPosition && text.length >= this._cursorOffset);
        if (Math.abs(absoluteCursorPosition - currentSize) > previousDist) {
          this._cursorOffset--;
        }
        this._blinkIsEven = false;
        this._clickedCoordinate = null;
      }
      if (!this._blinkIsEven) {
        const cursorOffsetText = text.substr(text.length - this._cursorOffset);
        const cursorOffsetWidth = context.measureText(cursorOffsetText).width;
        let cursorLeft = this._scrollLeft + this._textWidth - cursorOffsetWidth;
        if (cursorLeft < clipTextLeft) {
          this._scrollLeft += clipTextLeft - cursorLeft;
          cursorLeft = clipTextLeft;
          this._markAsDirty();
        } else if (cursorLeft > clipTextLeft + availableWidth) {
          this._scrollLeft += clipTextLeft + availableWidth - cursorLeft;
          cursorLeft = clipTextLeft + availableWidth;
          this._markAsDirty();
        }
        if (!this.isTextHighlightOn) {
          context.fillRect(cursorLeft, this._currentMeasure.top + (this._currentMeasure.height - this._fontOffset.height) / 2, 2, this._fontOffset.height);
        }
      }
      clearTimeout(this._blinkTimeout);
      this._blinkTimeout = setTimeout(() => {
        this._blinkIsEven = !this._blinkIsEven;
        this._markAsDirty();
      }, 500);
      if (this.isTextHighlightOn) {
        clearTimeout(this._blinkTimeout);
        const highlightCursorOffsetWidth = context.measureText(text.substring(this._startHighlightIndex)).width;
        let highlightCursorLeft = this._scrollLeft + this._textWidth - highlightCursorOffsetWidth;
        this._highlightedText = text.substring(this._startHighlightIndex, this._endHighlightIndex);
        let width = context.measureText(text.substring(this._startHighlightIndex, this._endHighlightIndex)).width;
        if (highlightCursorLeft < clipTextLeft) {
          width = width - (clipTextLeft - highlightCursorLeft);
          if (!width) {
            width = context.measureText(text.charAt(text.length - this._cursorOffset)).width;
          }
          highlightCursorLeft = clipTextLeft;
        }
        context.globalAlpha = this._highligherOpacity;
        context.fillStyle = this._textHighlightColor;
        context.fillRect(highlightCursorLeft, this._currentMeasure.top + (this._currentMeasure.height - this._fontOffset.height) / 2, width, this._fontOffset.height);
        context.globalAlpha = 1;
      }
    }
    context.restore();
    if (this._thickness) {
      if (this._isFocused) {
        if (this.focusedColor) {
          context.strokeStyle = this.focusedColor;
        }
      } else {
        if (this.color) {
          context.strokeStyle = this.color;
        }
      }
      context.lineWidth = this._thickness;
      context.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, this._currentMeasure.width - this._thickness, this._currentMeasure.height - this._thickness);
    }
    context.restore();
  }
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (this.isReadOnly) {
      return true;
    }
    this._clickedCoordinate = coordinates.x;
    this.isTextHighlightOn = false;
    this._highlightedText = "";
    this._cursorIndex = -1;
    this._isPointerDown = true;
    this._host._capturingControl[pointerId] = this;
    this._focusedBy = pi.event.pointerType;
    if (this._host.focusedControl === this) {
      clearTimeout(this._blinkTimeout);
      this._markAsDirty();
      return true;
    }
    if (!this._isEnabled) {
      return false;
    }
    this._host.focusedControl = this;
    return true;
  }
  _onPointerMove(target, coordinates, pointerId, pi) {
    if (this._host.focusedControl === this && this._isPointerDown && !this.isReadOnly) {
      this._clickedCoordinate = coordinates.x;
      this._markAsDirty();
      this._updateValueFromCursorIndex(this._cursorOffset);
    }
    super._onPointerMove(target, coordinates, pointerId, pi);
  }
  _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick) {
    this._isPointerDown = false;
    delete this._host._capturingControl[pointerId];
    super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick);
  }
  _beforeRenderText(textWrapper) {
    return textWrapper;
  }
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  set isTextHighlightOn(value) {
    if (this._isTextHighlightOn === value) {
      return;
    }
    if (value) {
      this.onTextHighlightObservable.notifyObservers(this);
    }
    this._isTextHighlightOn = value;
  }
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  get isTextHighlightOn() {
    return this._isTextHighlightOn;
  }
  dispose() {
    super.dispose();
    this.onBlurObservable.clear();
    this.onFocusObservable.clear();
    this.onTextChangedObservable.clear();
    this.onTextCopyObservable.clear();
    this.onTextCutObservable.clear();
    this.onTextPasteObservable.clear();
    this.onTextHighlightObservable.clear();
    this.onKeyboardEventProcessedObservable.clear();
  }
};
__decorate([
  serialize()
], InputText.prototype, "promptMessage", void 0);
__decorate([
  serialize()
], InputText.prototype, "disableMobilePrompt", void 0);
__decorate([
  serialize()
], InputText.prototype, "maxWidth", null);
__decorate([
  serialize()
], InputText.prototype, "highligherOpacity", null);
__decorate([
  serialize()
], InputText.prototype, "onFocusSelectAll", null);
__decorate([
  serialize()
], InputText.prototype, "textHighlightColor", null);
__decorate([
  serialize()
], InputText.prototype, "margin", null);
__decorate([
  serialize()
], InputText.prototype, "autoStretchWidth", null);
__decorate([
  serialize()
], InputText.prototype, "thickness", null);
__decorate([
  serialize()
], InputText.prototype, "focusedBackground", null);
__decorate([
  serialize()
], InputText.prototype, "focusedColor", null);
__decorate([
  serialize()
], InputText.prototype, "background", null);
__decorate([
  serialize()
], InputText.prototype, "placeholderColor", null);
__decorate([
  serialize()
], InputText.prototype, "placeholderText", null);
__decorate([
  serialize()
], InputText.prototype, "deadKey", null);
__decorate([
  serialize()
], InputText.prototype, "text", null);
__decorate([
  serialize()
], InputText.prototype, "width", null);
RegisterClass("BABYLON.GUI.InputText", InputText);

// node_modules/@babylonjs/gui/2D/controls/grid.js
var Grid = class extends Container {
  /**
   * Sets/Gets a boolean indicating that control content must be clipped
   * Please note that not clipping content may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
   */
  set clipContent(value) {
    this._clipContent = value;
    for (const key in this._cells) {
      this._cells[key].clipContent = value;
    }
  }
  get clipContent() {
    return this._clipContent;
  }
  /**
   * Sets/Gets a boolean indicating if the children are clipped to the current control bounds.
   * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
   */
  set clipChildren(value) {
    this._clipChildren = value;
    for (const key in this._cells) {
      this._cells[key].clipChildren = value;
    }
  }
  get clipChildren() {
    return this._clipChildren;
  }
  /**
   * Gets the number of columns
   */
  get columnCount() {
    return this._columnDefinitions.length;
  }
  /**
   * Gets the number of rows
   */
  get rowCount() {
    return this._rowDefinitions.length;
  }
  /** Gets the list of children */
  get children() {
    return this._childControls;
  }
  /** Gets the list of cells (e.g. the containers) */
  get cells() {
    return this._cells;
  }
  /**
   * Gets the definition of a specific row
   * @param index defines the index of the row
   * @returns the row definition
   */
  getRowDefinition(index) {
    if (index < 0 || index >= this._rowDefinitions.length) {
      return null;
    }
    return this._rowDefinitions[index];
  }
  /**
   * Gets the definition of a specific column
   * @param index defines the index of the column
   * @returns the column definition
   */
  getColumnDefinition(index) {
    if (index < 0 || index >= this._columnDefinitions.length) {
      return null;
    }
    return this._columnDefinitions[index];
  }
  /**
   * Adds a new row to the grid
   * @param height defines the height of the row (either in pixel or a value between 0 and 1)
   * @param isPixel defines if the height is expressed in pixel (or in percentage)
   * @returns the current grid
   */
  addRowDefinition(height, isPixel = false) {
    this._rowDefinitions.push(new ValueAndUnit(height, isPixel ? ValueAndUnit.UNITMODE_PIXEL : ValueAndUnit.UNITMODE_PERCENTAGE));
    this._rowDefinitionObservers.push(this._rowDefinitions[this.rowCount - 1].onChangedObservable.add(() => this._markAsDirty()));
    this._markAsDirty();
    return this;
  }
  /**
   * Adds a new column to the grid
   * @param width defines the width of the column (either in pixel or a value between 0 and 1)
   * @param isPixel defines if the width is expressed in pixel (or in percentage)
   * @returns the current grid
   */
  addColumnDefinition(width, isPixel = false) {
    this._columnDefinitions.push(new ValueAndUnit(width, isPixel ? ValueAndUnit.UNITMODE_PIXEL : ValueAndUnit.UNITMODE_PERCENTAGE));
    this._columnDefinitionObservers.push(this._columnDefinitions[this.columnCount - 1].onChangedObservable.add(() => this._markAsDirty()));
    this._markAsDirty();
    return this;
  }
  /**
   * Update a row definition
   * @param index defines the index of the row to update
   * @param height defines the height of the row (either in pixel or a value between 0 and 1)
   * @param isPixel defines if the weight is expressed in pixel (or in percentage)
   * @returns the current grid
   */
  setRowDefinition(index, height, isPixel = false) {
    if (index < 0 || index >= this._rowDefinitions.length) {
      return this;
    }
    const current = this._rowDefinitions[index];
    if (current && current.isPixel === isPixel && current.value === height) {
      return this;
    }
    this._rowDefinitions[index].onChangedObservable.remove(this._rowDefinitionObservers[index]);
    this._rowDefinitions[index] = new ValueAndUnit(height, isPixel ? ValueAndUnit.UNITMODE_PIXEL : ValueAndUnit.UNITMODE_PERCENTAGE);
    this._rowDefinitionObservers[index] = this._rowDefinitions[index].onChangedObservable.add(() => this._markAsDirty());
    this._markAsDirty();
    return this;
  }
  /**
   * Update a column definition
   * @param index defines the index of the column to update
   * @param width defines the width of the column (either in pixel or a value between 0 and 1)
   * @param isPixel defines if the width is expressed in pixel (or in percentage)
   * @returns the current grid
   */
  setColumnDefinition(index, width, isPixel = false) {
    if (index < 0 || index >= this._columnDefinitions.length) {
      return this;
    }
    const current = this._columnDefinitions[index];
    if (current && current.isPixel === isPixel && current.value === width) {
      return this;
    }
    this._columnDefinitions[index].onChangedObservable.remove(this._columnDefinitionObservers[index]);
    this._columnDefinitions[index] = new ValueAndUnit(width, isPixel ? ValueAndUnit.UNITMODE_PIXEL : ValueAndUnit.UNITMODE_PERCENTAGE);
    this._columnDefinitionObservers[index] = this._columnDefinitions[index].onChangedObservable.add(() => this._markAsDirty());
    this._markAsDirty();
    return this;
  }
  /**
   * Gets the list of children stored in a specific cell
   * @param row defines the row to check
   * @param column defines the column to check
   * @returns the list of controls
   */
  getChildrenAt(row, column) {
    const cell = this._cells[`${row}:${column}`];
    if (!cell) {
      return null;
    }
    return cell.children;
  }
  /**
   * Gets a string representing the child cell info (row x column)
   * @param child defines the control to get info from
   * @returns a string containing the child cell info (row x column)
   */
  getChildCellInfo(child) {
    return child._tag;
  }
  _removeCell(cell, key) {
    if (!cell) {
      return;
    }
    super.removeControl(cell);
    for (const control of cell.children) {
      const childIndex = this._childControls.indexOf(control);
      if (childIndex !== -1) {
        this._childControls.splice(childIndex, 1);
      }
    }
    delete this._cells[key];
  }
  _offsetCell(previousKey, key) {
    if (!this._cells[key]) {
      return;
    }
    this._cells[previousKey] = this._cells[key];
    for (const control of this._cells[previousKey].children) {
      control._tag = previousKey;
    }
    delete this._cells[key];
  }
  /**
   * Remove a column definition at specified index
   * @param index defines the index of the column to remove
   * @returns the current grid
   */
  removeColumnDefinition(index) {
    if (index < 0 || index >= this._columnDefinitions.length) {
      return this;
    }
    for (let x = 0; x < this._rowDefinitions.length; x++) {
      const key = `${x}:${index}`;
      const cell = this._cells[key];
      this._removeCell(cell, key);
    }
    for (let x = 0; x < this._rowDefinitions.length; x++) {
      for (let y = index + 1; y < this._columnDefinitions.length; y++) {
        const previousKey = `${x}:${y - 1}`;
        const key = `${x}:${y}`;
        this._offsetCell(previousKey, key);
      }
    }
    this._columnDefinitions[index].onChangedObservable.remove(this._columnDefinitionObservers[index]);
    this._columnDefinitions.splice(index, 1);
    this._columnDefinitionObservers.splice(index, 1);
    this._markAsDirty();
    return this;
  }
  /**
   * Remove a row definition at specified index
   * @param index defines the index of the row to remove
   * @returns the current grid
   */
  removeRowDefinition(index) {
    if (index < 0 || index >= this._rowDefinitions.length) {
      return this;
    }
    for (let y = 0; y < this._columnDefinitions.length; y++) {
      const key = `${index}:${y}`;
      const cell = this._cells[key];
      this._removeCell(cell, key);
    }
    for (let y = 0; y < this._columnDefinitions.length; y++) {
      for (let x = index + 1; x < this._rowDefinitions.length; x++) {
        const previousKey = `${x - 1}:${y}`;
        const key = `${x}:${y}`;
        this._offsetCell(previousKey, key);
      }
    }
    this._rowDefinitions[index].onChangedObservable.remove(this._rowDefinitionObservers[index]);
    this._rowDefinitions.splice(index, 1);
    this._rowDefinitionObservers.splice(index, 1);
    this._markAsDirty();
    return this;
  }
  /**
   * Adds a new control to the current grid
   * @param control defines the control to add
   * @param row defines the row where to add the control (0 by default)
   * @param column defines the column where to add the control (0 by default)
   * @returns the current grid
   */
  addControl(control, row = 0, column = 0) {
    if (this._rowDefinitions.length === 0) {
      this.addRowDefinition(1, false);
    }
    if (this._columnDefinitions.length === 0) {
      this.addColumnDefinition(1, false);
    }
    if (this._childControls.indexOf(control) !== -1) {
      Tools.Warn(`Control (Name:${control.name}, UniqueId:${control.uniqueId}) is already associated with this grid. You must remove it before reattaching it`);
      return this;
    }
    const x = Math.min(row, this._rowDefinitions.length - 1);
    const y = Math.min(column, this._columnDefinitions.length - 1);
    const key = `${x}:${y}`;
    let goodContainer = this._cells[key];
    if (!goodContainer) {
      goodContainer = new Container(key);
      this._cells[key] = goodContainer;
      goodContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
      goodContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
      goodContainer.clipContent = this.clipContent;
      goodContainer.clipChildren = this.clipChildren;
      super.addControl(goodContainer);
    }
    goodContainer.addControl(control);
    this._childControls.push(control);
    control._tag = key;
    control.parent = this;
    this._markAsDirty();
    return this;
  }
  /**
   * Removes a control from the current container
   * @param control defines the control to remove
   * @returns the current container
   */
  removeControl(control) {
    const index = this._childControls.indexOf(control);
    if (index !== -1) {
      this._childControls.splice(index, 1);
    }
    const cell = this._cells[control._tag];
    if (cell) {
      cell.removeControl(control);
      control._tag = null;
    }
    this._markAsDirty();
    return this;
  }
  /**
   * Creates a new Grid
   * @param name defines control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._rowDefinitions = new Array();
    this._rowDefinitionObservers = [];
    this._columnDefinitions = new Array();
    this._columnDefinitionObservers = [];
    this._cells = {};
    this._childControls = new Array();
  }
  _getTypeName() {
    return "Grid";
  }
  _getGridDefinitions(definitionCallback) {
    const widths = [];
    const heights = [];
    const lefts = [];
    const tops = [];
    let availableWidth = this._currentMeasure.width;
    let globalWidthPercentage = 0;
    let availableHeight = this._currentMeasure.height;
    let globalHeightPercentage = 0;
    let index = 0;
    for (const rowDefinition of this._rowDefinitions) {
      if (rowDefinition.isPixel) {
        const height = rowDefinition.getValue(this._host);
        availableHeight -= height;
        heights[index] = height;
      } else {
        globalHeightPercentage += rowDefinition.value;
      }
      index++;
    }
    let top = 0;
    index = 0;
    for (const rowDefinition of this._rowDefinitions) {
      tops.push(top);
      if (!rowDefinition.isPixel) {
        const height = Math.round(rowDefinition.value / globalHeightPercentage * availableHeight);
        top += height;
        heights[index] = height;
      } else {
        top += rowDefinition.getValue(this._host);
      }
      index++;
    }
    index = 0;
    for (const columnDefinition of this._columnDefinitions) {
      if (columnDefinition.isPixel) {
        const width = columnDefinition.getValue(this._host);
        availableWidth -= width;
        widths[index] = width;
      } else {
        globalWidthPercentage += columnDefinition.value;
      }
      index++;
    }
    let left = 0;
    index = 0;
    for (const columnDefinition of this._columnDefinitions) {
      lefts.push(left);
      if (!columnDefinition.isPixel) {
        const width = Math.round(columnDefinition.value / globalWidthPercentage * availableWidth);
        left += width;
        widths[index] = width;
      } else {
        left += columnDefinition.getValue(this._host);
      }
      index++;
    }
    definitionCallback(lefts, tops, widths, heights);
  }
  _additionalProcessing(parentMeasure, context) {
    this._getGridDefinitions((lefts, tops, widths, heights) => {
      for (const key in this._cells) {
        if (!Object.prototype.hasOwnProperty.call(this._cells, key)) {
          continue;
        }
        const split = key.split(":");
        const x = parseInt(split[0]);
        const y = parseInt(split[1]);
        const cell = this._cells[key];
        cell.leftInPixels = lefts[y];
        cell.topInPixels = tops[x];
        cell.widthInPixels = widths[y];
        cell.heightInPixels = heights[x];
        cell._left.ignoreAdaptiveScaling = true;
        cell._top.ignoreAdaptiveScaling = true;
        cell._width.ignoreAdaptiveScaling = true;
        cell._height.ignoreAdaptiveScaling = true;
      }
    });
    super._additionalProcessing(parentMeasure, context);
  }
  _flagDescendantsAsMatrixDirty() {
    for (const key in this._cells) {
      if (!Object.prototype.hasOwnProperty.call(this._cells, key)) {
        continue;
      }
      const child = this._cells[key];
      child._markMatrixAsDirty();
    }
  }
  _renderHighlightSpecific(context) {
    super._renderHighlightSpecific(context);
    this._getGridDefinitions((lefts, tops, widths, heights) => {
      for (let index = 0; index < lefts.length; index++) {
        const left = this._currentMeasure.left + lefts[index] + widths[index];
        context.beginPath();
        context.moveTo(left, this._currentMeasure.top);
        context.lineTo(left, this._currentMeasure.top + this._currentMeasure.height);
        context.stroke();
      }
      for (let index = 0; index < tops.length; index++) {
        const top = this._currentMeasure.top + tops[index] + heights[index];
        context.beginPath();
        context.moveTo(this._currentMeasure.left, top);
        context.lineTo(this._currentMeasure.left + this._currentMeasure.width, top);
        context.stroke();
      }
    });
    context.restore();
  }
  /** Releases associated resources */
  dispose() {
    super.dispose();
    for (const control of this._childControls) {
      control.dispose();
    }
    for (let index = 0; index < this._rowDefinitions.length; index++) {
      this._rowDefinitions[index].onChangedObservable.remove(this._rowDefinitionObservers[index]);
    }
    for (let index = 0; index < this._columnDefinitions.length; index++) {
      this._columnDefinitions[index].onChangedObservable.remove(this._columnDefinitionObservers[index]);
    }
    this._rowDefinitionObservers.length = 0;
    this._rowDefinitions.length = 0;
    this._columnDefinitionObservers.length = 0;
    this._columnDefinitions.length = 0;
    this._cells = {};
    this._childControls.length = 0;
  }
  /**
   * Serializes the current control
   * @param serializationObject defined the JSON serialized object
   * @param force force serialization even if isSerializable === false
   */
  serialize(serializationObject, force) {
    super.serialize(serializationObject, force);
    if (!this.isSerializable && !force) {
      return;
    }
    serializationObject.columnCount = this.columnCount;
    serializationObject.rowCount = this.rowCount;
    serializationObject.columns = [];
    serializationObject.rows = [];
    serializationObject.tags = [];
    for (let i = 0; i < this.columnCount; ++i) {
      const cd = this.getColumnDefinition(i);
      const childSerializationObject = { value: cd == null ? void 0 : cd.getValue(this.host), unit: cd == null ? void 0 : cd.unit };
      serializationObject.columns.push(childSerializationObject);
    }
    for (let i = 0; i < this.rowCount; ++i) {
      const rd = this.getRowDefinition(i);
      const childSerializationObject = { value: rd == null ? void 0 : rd.getValue(this.host), unit: rd == null ? void 0 : rd.unit };
      serializationObject.rows.push(childSerializationObject);
    }
    this.children.forEach((child) => {
      serializationObject.tags.push(child._tag);
    });
  }
  /**
   * @internal
   */
  _parseFromContent(serializedObject, host) {
    super._parseFromContent(serializedObject, host);
    const children = [];
    this.children.forEach((child) => {
      children.push(child);
    });
    this.removeRowDefinition(0);
    this.removeColumnDefinition(0);
    for (let i = 0; i < serializedObject.columnCount; ++i) {
      const columnValue = serializedObject.columns[i].value;
      const unit = serializedObject.columns[i].unit;
      this.addColumnDefinition(columnValue, unit === 1 ? true : false);
    }
    for (let i = 0; i < serializedObject.rowCount; ++i) {
      const rowValue = serializedObject.rows[i].value;
      const unit = serializedObject.rows[i].unit;
      this.addRowDefinition(rowValue, unit === 1 ? true : false);
    }
    for (let i = 0; i < children.length; ++i) {
      const cellInfo = serializedObject.tags[i];
      let rowNumber = parseInt(cellInfo.substring(0, cellInfo.search(":")));
      if (isNaN(rowNumber)) {
        rowNumber = 0;
      }
      let columnNumber = parseInt(cellInfo.substring(cellInfo.search(":") + 1));
      if (isNaN(columnNumber)) {
        columnNumber = 0;
      }
      this.addControl(children[i], rowNumber, columnNumber);
    }
  }
};
__decorate([
  serialize()
], Grid.prototype, "clipContent", null);
RegisterClass("BABYLON.GUI.Grid", Grid);

// node_modules/@babylonjs/gui/2D/controls/colorpicker.js
var ColorPicker = class _ColorPicker extends Control {
  /** Gets or sets the color of the color picker */
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._value.equals(value)) {
      return;
    }
    this._value.copyFrom(value);
    this._value.toHSVToRef(this._tmpColor);
    this._h = this._tmpColor.r;
    this._s = Math.max(this._tmpColor.g, 1e-5);
    this._v = Math.max(this._tmpColor.b, 1e-5);
    this._markAsDirty();
    if (this._value.r <= _ColorPicker._Epsilon) {
      this._value.r = 0;
    }
    if (this._value.g <= _ColorPicker._Epsilon) {
      this._value.g = 0;
    }
    if (this._value.b <= _ColorPicker._Epsilon) {
      this._value.b = 0;
    }
    if (this._value.r >= 1 - _ColorPicker._Epsilon) {
      this._value.r = 1;
    }
    if (this._value.g >= 1 - _ColorPicker._Epsilon) {
      this._value.g = 1;
    }
    if (this._value.b >= 1 - _ColorPicker._Epsilon) {
      this._value.b = 1;
    }
    this.onValueChangedObservable.notifyObservers(this._value);
  }
  /**
   * Gets or sets control width
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get width() {
    return this._width.toString(this._host);
  }
  set width(value) {
    if (this._width.toString(this._host) === value) {
      return;
    }
    if (this._width.fromString(value)) {
      if (this._width.getValue(this._host) === 0) {
        value = "1px";
        this._width.fromString(value);
      }
      this._height.fromString(value);
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets control height
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
   */
  get height() {
    return this._height.toString(this._host);
  }
  /** Gets or sets control height */
  set height(value) {
    if (this._height.toString(this._host) === value) {
      return;
    }
    if (this._height.fromString(value)) {
      if (this._height.getValue(this._host) === 0) {
        value = "1px";
        this._height.fromString(value);
      }
      this._width.fromString(value);
      this._markAsDirty();
    }
  }
  /** Gets or sets control size */
  get size() {
    return this.width;
  }
  set size(value) {
    this.width = value;
  }
  /**
   * Creates a new ColorPicker
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._value = Color3.Red();
    this._tmpColor = new Color3();
    this._pointerStartedOnSquare = false;
    this._pointerStartedOnWheel = false;
    this._squareLeft = 0;
    this._squareTop = 0;
    this._squareSize = 0;
    this._h = 360;
    this._s = 1;
    this._v = 1;
    this._lastPointerDownId = -1;
    this.onValueChangedObservable = new Observable();
    this._pointerIsDown = false;
    this.value = new Color3(0.88, 0.1, 0.1);
    this.size = "200px";
    this.isPointerBlocker = true;
  }
  _getTypeName() {
    return "ColorPicker";
  }
  /**
   * @internal
   */
  _preMeasure(parentMeasure) {
    if (parentMeasure.width < parentMeasure.height) {
      this._currentMeasure.height = parentMeasure.width;
    } else {
      this._currentMeasure.width = parentMeasure.height;
    }
  }
  _updateSquareProps() {
    const radius = Math.min(this._currentMeasure.width, this._currentMeasure.height) * 0.5;
    const wheelThickness = radius * 0.2;
    const innerDiameter = (radius - wheelThickness) * 2;
    const squareSize = innerDiameter / Math.sqrt(2);
    const offset = radius - squareSize * 0.5;
    this._squareLeft = this._currentMeasure.left + offset;
    this._squareTop = this._currentMeasure.top + offset;
    this._squareSize = squareSize;
  }
  _drawGradientSquare(hueValue, left, top, width, height, context) {
    const lgh = context.createLinearGradient(left, top, width + left, top);
    lgh.addColorStop(0, "#fff");
    lgh.addColorStop(1, "hsl(" + hueValue + ", 100%, 50%)");
    context.fillStyle = lgh;
    context.fillRect(left, top, width, height);
    const lgv = context.createLinearGradient(left, top, left, height + top);
    lgv.addColorStop(0, "rgba(0,0,0,0)");
    lgv.addColorStop(1, "#000");
    context.fillStyle = lgv;
    context.fillRect(left, top, width, height);
  }
  _drawCircle(centerX, centerY, radius, context) {
    context.beginPath();
    context.arc(centerX, centerY, radius + 1, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = "#333333";
    context.stroke();
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = "#ffffff";
    context.stroke();
  }
  _createColorWheelCanvas(radius, thickness) {
    const engine = EngineStore.LastCreatedEngine;
    if (!engine) {
      throw new Error("Invalid engine. Unable to create a canvas.");
    }
    const canvas = engine.createCanvas(radius * 2, radius * 2);
    const context = canvas.getContext("2d");
    const image = context.getImageData(0, 0, radius * 2, radius * 2);
    const data = image.data;
    const color = this._tmpColor;
    const maxDistSq = radius * radius;
    const innerRadius = radius - thickness;
    const minDistSq = innerRadius * innerRadius;
    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const distSq = x * x + y * y;
        if (distSq > maxDistSq || distSq < minDistSq) {
          continue;
        }
        const dist = Math.sqrt(distSq);
        const ang = Math.atan2(y, x);
        Color3.HSVtoRGBToRef(ang * 180 / Math.PI + 180, dist / radius, 1, color);
        const index = (x + radius + (y + radius) * 2 * radius) * 4;
        data[index] = color.r * 255;
        data[index + 1] = color.g * 255;
        data[index + 2] = color.b * 255;
        let alphaRatio = (dist - innerRadius) / (radius - innerRadius);
        let alphaAmount = 0.2;
        const maxAlpha = 0.2;
        const minAlpha = 0.04;
        const lowerRadius = 50;
        const upperRadius = 150;
        if (radius < lowerRadius) {
          alphaAmount = maxAlpha;
        } else if (radius > upperRadius) {
          alphaAmount = minAlpha;
        } else {
          alphaAmount = (minAlpha - maxAlpha) * (radius - lowerRadius) / (upperRadius - lowerRadius) + maxAlpha;
        }
        alphaRatio = (dist - innerRadius) / (radius - innerRadius);
        if (alphaRatio < alphaAmount) {
          data[index + 3] = 255 * (alphaRatio / alphaAmount);
        } else if (alphaRatio > 1 - alphaAmount) {
          data[index + 3] = 255 * (1 - (alphaRatio - (1 - alphaAmount)) / alphaAmount);
        } else {
          data[index + 3] = 255;
        }
      }
    }
    context.putImageData(image, 0, 0);
    return canvas;
  }
  /**
   * @internal
   */
  _draw(context) {
    context.save();
    this._applyStates(context);
    const radius = Math.min(this._currentMeasure.width, this._currentMeasure.height) * 0.5;
    const wheelThickness = radius * 0.2;
    const left = this._currentMeasure.left;
    const top = this._currentMeasure.top;
    if (!this._colorWheelCanvas || this._colorWheelCanvas.width != radius * 2) {
      this._colorWheelCanvas = this._createColorWheelCanvas(radius, wheelThickness);
    }
    this._updateSquareProps();
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
      context.fillRect(this._squareLeft, this._squareTop, this._squareSize, this._squareSize);
    }
    context.drawImage(this._colorWheelCanvas, left, top);
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    this._drawGradientSquare(this._h, this._squareLeft, this._squareTop, this._squareSize, this._squareSize, context);
    let cx = this._squareLeft + this._squareSize * this._s;
    let cy = this._squareTop + this._squareSize * (1 - this._v);
    this._drawCircle(cx, cy, radius * 0.04, context);
    const dist = radius - wheelThickness * 0.5;
    cx = left + radius + Math.cos((this._h - 180) * Math.PI / 180) * dist;
    cy = top + radius + Math.sin((this._h - 180) * Math.PI / 180) * dist;
    this._drawCircle(cx, cy, wheelThickness * 0.35, context);
    context.restore();
  }
  _updateValueFromPointer(x, y) {
    if (this._pointerStartedOnWheel) {
      const radius = Math.min(this._currentMeasure.width, this._currentMeasure.height) * 0.5;
      const centerX = radius + this._currentMeasure.left;
      const centerY = radius + this._currentMeasure.top;
      this._h = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 180;
    } else if (this._pointerStartedOnSquare) {
      this._updateSquareProps();
      this._s = (x - this._squareLeft) / this._squareSize;
      this._v = 1 - (y - this._squareTop) / this._squareSize;
      this._s = Math.min(this._s, 1);
      this._s = Math.max(this._s, _ColorPicker._Epsilon);
      this._v = Math.min(this._v, 1);
      this._v = Math.max(this._v, _ColorPicker._Epsilon);
    }
    Color3.HSVtoRGBToRef(this._h, this._s, this._v, this._tmpColor);
    this.value = this._tmpColor;
  }
  _isPointOnSquare(x, y) {
    this._updateSquareProps();
    const left = this._squareLeft;
    const top = this._squareTop;
    const size = this._squareSize;
    if (x >= left && x <= left + size && y >= top && y <= top + size) {
      return true;
    }
    return false;
  }
  _isPointOnWheel(x, y) {
    const radius = Math.min(this._currentMeasure.width, this._currentMeasure.height) * 0.5;
    const centerX = radius + this._currentMeasure.left;
    const centerY = radius + this._currentMeasure.top;
    const wheelThickness = radius * 0.2;
    const innerRadius = radius - wheelThickness;
    const radiusSq = radius * radius;
    const innerRadiusSq = innerRadius * innerRadius;
    const dx = x - centerX;
    const dy = y - centerY;
    const distSq = dx * dx + dy * dy;
    if (distSq <= radiusSq && distSq >= innerRadiusSq) {
      return true;
    }
    return false;
  }
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (this.isReadOnly) {
      return true;
    }
    this._pointerIsDown = true;
    this._pointerStartedOnSquare = false;
    this._pointerStartedOnWheel = false;
    this._invertTransformMatrix.transformCoordinates(coordinates.x, coordinates.y, this._transformedPosition);
    const x = this._transformedPosition.x;
    const y = this._transformedPosition.y;
    if (this._isPointOnSquare(x, y)) {
      this._pointerStartedOnSquare = true;
    } else if (this._isPointOnWheel(x, y)) {
      this._pointerStartedOnWheel = true;
    }
    this._updateValueFromPointer(x, y);
    this._host._capturingControl[pointerId] = this;
    this._lastPointerDownId = pointerId;
    return true;
  }
  _onPointerMove(target, coordinates, pointerId, pi) {
    if (pointerId != this._lastPointerDownId) {
      return;
    }
    if (!this.isReadOnly) {
      this._invertTransformMatrix.transformCoordinates(coordinates.x, coordinates.y, this._transformedPosition);
      const x = this._transformedPosition.x;
      const y = this._transformedPosition.y;
      if (this._pointerIsDown) {
        this._updateValueFromPointer(x, y);
      }
    }
    super._onPointerMove(target, coordinates, pointerId, pi);
  }
  _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
    this._pointerIsDown = false;
    delete this._host._capturingControl[pointerId];
    super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi);
  }
  _onCanvasBlur() {
    this._forcePointerUp();
    super._onCanvasBlur();
  }
  /**
   * This function expands the color picker by creating a color picker dialog with manual
   * color value input and the ability to save colors into an array to be used later in
   * subsequent launches of the dialogue.
   * @param advancedTexture defines the AdvancedDynamicTexture the dialog is assigned to
   * @param options defines size for dialog and options for saved colors. Also accepts last color picked as hex string and saved colors array as hex strings.
   * @param options.pickerWidth
   * @param options.pickerHeight
   * @param options.headerHeight
   * @param options.lastColor
   * @param options.swatchLimit
   * @param options.numSwatchesPerLine
   * @param options.savedColors
   * @returns picked color as a hex string and the saved colors array as hex strings.
   */
  static ShowPickerDialogAsync(advancedTexture, options) {
    return new Promise((resolve) => {
      options.pickerWidth = options.pickerWidth || "640px";
      options.pickerHeight = options.pickerHeight || "400px";
      options.headerHeight = options.headerHeight || "35px";
      options.lastColor = options.lastColor || "#000000";
      options.swatchLimit = options.swatchLimit || 20;
      options.numSwatchesPerLine = options.numSwatchesPerLine || 10;
      const drawerMaxRows = options.swatchLimit / options.numSwatchesPerLine;
      const rawSwatchSize = parseFloat(options.pickerWidth) / options.numSwatchesPerLine;
      const gutterSize = Math.floor(rawSwatchSize * 0.25);
      const colGutters = gutterSize * (options.numSwatchesPerLine + 1);
      const swatchSize = Math.floor((parseFloat(options.pickerWidth) - colGutters) / options.numSwatchesPerLine);
      const drawerMaxSize = swatchSize * drawerMaxRows + gutterSize * (drawerMaxRows + 1);
      const containerSize = (parseInt(options.pickerHeight) + drawerMaxSize + Math.floor(swatchSize * 0.25)).toString() + "px";
      const buttonColor = "#c0c0c0";
      const buttonBackgroundColor = "#535353";
      const buttonBackgroundHoverColor = "#414141";
      const buttonBackgroundClickColor = "515151";
      const buttonDisabledColor = "#555555";
      const buttonDisabledBackgroundColor = "#454545";
      const currentSwatchesOutlineColor = "#404040";
      const luminanceLimitColor = Color3.FromHexString("#dddddd");
      const luminanceLimit = luminanceLimitColor.r + luminanceLimitColor.g + luminanceLimitColor.b;
      const iconColorDark = "#aaaaaa";
      const iconColorLight = "#ffffff";
      let buttonFontSize;
      let butEdit;
      const inputFieldLabels = ["R", "G", "B"];
      const inputTextBackgroundColor = "#454545";
      const inputTextColor = "#f0f0f0";
      let swatchNumber;
      let swatchDrawer;
      let editSwatchMode = false;
      let butSave;
      let lastVal;
      let activeField;
      const dialogContainer = new Grid();
      dialogContainer.name = "Dialog Container";
      dialogContainer.width = options.pickerWidth;
      if (options.savedColors) {
        dialogContainer.height = containerSize;
        const topRow = parseInt(options.pickerHeight) / parseInt(containerSize);
        dialogContainer.addRowDefinition(topRow, false);
        dialogContainer.addRowDefinition(1 - topRow, false);
      } else {
        dialogContainer.height = options.pickerHeight;
        dialogContainer.addRowDefinition(1, false);
      }
      advancedTexture.addControl(dialogContainer);
      if (options.savedColors) {
        swatchDrawer = new Grid();
        swatchDrawer.name = "Swatch Drawer";
        swatchDrawer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        swatchDrawer.background = buttonBackgroundColor;
        swatchDrawer.width = options.pickerWidth;
        const initialRows = options.savedColors.length / options.numSwatchesPerLine;
        let gutterCount;
        if (initialRows == 0) {
          gutterCount = 0;
        } else {
          gutterCount = initialRows + 1;
        }
        swatchDrawer.height = (swatchSize * initialRows + gutterCount * gutterSize).toString() + "px";
        swatchDrawer.top = Math.floor(swatchSize * 0.25).toString() + "px";
        for (let i = 0; i < Math.ceil(options.savedColors.length / options.numSwatchesPerLine) * 2 + 1; i++) {
          if (i % 2 != 0) {
            swatchDrawer.addRowDefinition(swatchSize, true);
          } else {
            swatchDrawer.addRowDefinition(gutterSize, true);
          }
        }
        for (let i = 0; i < options.numSwatchesPerLine * 2 + 1; i++) {
          if (i % 2 != 0) {
            swatchDrawer.addColumnDefinition(swatchSize, true);
          } else {
            swatchDrawer.addColumnDefinition(gutterSize, true);
          }
        }
        dialogContainer.addControl(swatchDrawer, 1, 0);
      }
      const pickerPanel = new Grid();
      pickerPanel.name = "Picker Panel";
      pickerPanel.height = options.pickerHeight;
      const panelHead = parseInt(options.headerHeight) / parseInt(options.pickerHeight);
      const pickerPanelRows = [panelHead, 1 - panelHead];
      pickerPanel.addRowDefinition(pickerPanelRows[0], false);
      pickerPanel.addRowDefinition(pickerPanelRows[1], false);
      dialogContainer.addControl(pickerPanel, 0, 0);
      const header = new Rectangle();
      header.name = "Dialogue Header Bar";
      header.background = "#cccccc";
      header.thickness = 0;
      pickerPanel.addControl(header, 0, 0);
      const closeButton = Button.CreateSimpleButton("closeButton", "a");
      closeButton.fontFamily = "coreglyphs";
      const headerColor3 = Color3.FromHexString(header.background);
      const closeIconColor = new Color3(1 - headerColor3.r, 1 - headerColor3.g, 1 - headerColor3.b);
      closeButton.color = closeIconColor.toHexString();
      closeButton.fontSize = Math.floor(parseInt(options.headerHeight) * 0.6);
      closeButton.textBlock.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
      closeButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
      closeButton.height = closeButton.width = options.headerHeight;
      closeButton.background = header.background;
      closeButton.thickness = 0;
      closeButton.pointerDownAnimation = () => {
      };
      closeButton.pointerUpAnimation = () => {
        closeButton.background = header.background;
      };
      closeButton.pointerEnterAnimation = () => {
        closeButton.color = header.background;
        closeButton.background = "red";
      };
      closeButton.pointerOutAnimation = () => {
        closeButton.color = closeIconColor.toHexString();
        closeButton.background = header.background;
      };
      closeButton.onPointerClickObservable.add(() => {
        closePicker(currentSwatch.background);
      });
      pickerPanel.addControl(closeButton, 0, 0);
      const dialogBody = new Grid();
      dialogBody.name = "Dialogue Body";
      dialogBody.background = buttonBackgroundColor;
      const dialogBodyCols = [0.4375, 0.5625];
      dialogBody.addRowDefinition(1, false);
      dialogBody.addColumnDefinition(dialogBodyCols[0], false);
      dialogBody.addColumnDefinition(dialogBodyCols[1], false);
      pickerPanel.addControl(dialogBody, 1, 0);
      const pickerGrid = new Grid();
      pickerGrid.name = "Picker Grid";
      pickerGrid.addRowDefinition(0.85, false);
      pickerGrid.addRowDefinition(0.15, false);
      dialogBody.addControl(pickerGrid, 0, 0);
      const picker = new _ColorPicker();
      picker.name = "GUI Color Picker";
      if (options.pickerHeight < options.pickerWidth) {
        picker.width = 0.89;
      } else {
        picker.height = 0.89;
      }
      picker.value = Color3.FromHexString(options.lastColor);
      picker.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
      picker.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
      picker.onPointerDownObservable.add(() => {
        activeField = picker.name;
        lastVal = "";
        editSwatches(false);
      });
      picker.onValueChangedObservable.add(function(value) {
        if (activeField == picker.name) {
          updateValues(value, picker.name);
        }
      });
      pickerGrid.addControl(picker, 0, 0);
      const pickerBodyRight = new Grid();
      pickerBodyRight.name = "Dialogue Right Half";
      pickerBodyRight.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
      const pickerBodyRightRows = [0.514, 0.486];
      pickerBodyRight.addRowDefinition(pickerBodyRightRows[0], false);
      pickerBodyRight.addRowDefinition(pickerBodyRightRows[1], false);
      dialogBody.addControl(pickerBodyRight, 1, 1);
      const pickerSwatchesButtons = new Grid();
      pickerSwatchesButtons.name = "Swatches and Buttons";
      const pickerButtonsCol = [0.417, 0.583];
      pickerSwatchesButtons.addRowDefinition(1, false);
      pickerSwatchesButtons.addColumnDefinition(pickerButtonsCol[0], false);
      pickerSwatchesButtons.addColumnDefinition(pickerButtonsCol[1], false);
      pickerBodyRight.addControl(pickerSwatchesButtons, 0, 0);
      const pickerSwatches = new Grid();
      pickerSwatches.name = "New and Current Swatches";
      const pickeSwatchesRows = [0.04, 0.16, 0.64, 0.16];
      pickerSwatches.addRowDefinition(pickeSwatchesRows[0], false);
      pickerSwatches.addRowDefinition(pickeSwatchesRows[1], false);
      pickerSwatches.addRowDefinition(pickeSwatchesRows[2], false);
      pickerSwatches.addRowDefinition(pickeSwatchesRows[3], false);
      pickerSwatchesButtons.addControl(pickerSwatches, 0, 0);
      const activeSwatches = new Grid();
      activeSwatches.name = "Active Swatches";
      activeSwatches.width = 0.67;
      activeSwatches.addRowDefinition(0.5, false);
      activeSwatches.addRowDefinition(0.5, false);
      pickerSwatches.addControl(activeSwatches, 2, 0);
      const labelWidth = Math.floor(parseInt(options.pickerWidth) * dialogBodyCols[1] * pickerButtonsCol[0] * 0.11);
      const labelHeight = Math.floor(parseInt(options.pickerHeight) * pickerPanelRows[1] * pickerBodyRightRows[0] * pickeSwatchesRows[1] * 0.5);
      let labelTextSize;
      if (options.pickerWidth > options.pickerHeight) {
        labelTextSize = labelHeight;
      } else {
        labelTextSize = labelWidth;
      }
      const newText = new TextBlock();
      newText.text = "new";
      newText.name = "New Color Label";
      newText.color = buttonColor;
      newText.fontSize = labelTextSize;
      pickerSwatches.addControl(newText, 1, 0);
      const newSwatch = new Rectangle();
      newSwatch.name = "New Color Swatch";
      newSwatch.background = options.lastColor;
      newSwatch.thickness = 0;
      activeSwatches.addControl(newSwatch, 0, 0);
      const currentSwatch = Button.CreateSimpleButton("currentSwatch", "");
      currentSwatch.background = options.lastColor;
      currentSwatch.thickness = 0;
      currentSwatch.onPointerClickObservable.add(() => {
        const revertColor = Color3.FromHexString(currentSwatch.background);
        updateValues(revertColor, currentSwatch.name);
        editSwatches(false);
      });
      currentSwatch.pointerDownAnimation = () => {
      };
      currentSwatch.pointerUpAnimation = () => {
      };
      currentSwatch.pointerEnterAnimation = () => {
      };
      currentSwatch.pointerOutAnimation = () => {
      };
      activeSwatches.addControl(currentSwatch, 1, 0);
      const swatchOutline = new Rectangle();
      swatchOutline.name = "Swatch Outline";
      swatchOutline.width = 0.67;
      swatchOutline.thickness = 2;
      swatchOutline.color = currentSwatchesOutlineColor;
      swatchOutline.isHitTestVisible = false;
      pickerSwatches.addControl(swatchOutline, 2, 0);
      const currentText = new TextBlock();
      currentText.name = "Current Color Label";
      currentText.text = "current";
      currentText.color = buttonColor;
      currentText.fontSize = labelTextSize;
      pickerSwatches.addControl(currentText, 3, 0);
      const buttonGrid = new Grid();
      buttonGrid.name = "Button Grid";
      buttonGrid.height = 0.8;
      const buttonGridRows = 1 / 3;
      buttonGrid.addRowDefinition(buttonGridRows, false);
      buttonGrid.addRowDefinition(buttonGridRows, false);
      buttonGrid.addRowDefinition(buttonGridRows, false);
      pickerSwatchesButtons.addControl(buttonGrid, 0, 1);
      const buttonWidth = Math.floor(parseInt(options.pickerWidth) * dialogBodyCols[1] * pickerButtonsCol[1] * 0.67).toString() + "px";
      const buttonHeight = Math.floor(parseInt(options.pickerHeight) * pickerPanelRows[1] * pickerBodyRightRows[0] * (parseFloat(buttonGrid.height.toString()) / 100) * buttonGridRows * 0.7).toString() + "px";
      if (parseFloat(buttonWidth) > parseFloat(buttonHeight)) {
        buttonFontSize = Math.floor(parseFloat(buttonHeight) * 0.45);
      } else {
        buttonFontSize = Math.floor(parseFloat(buttonWidth) * 0.11);
      }
      const butOK = Button.CreateSimpleButton("butOK", "OK");
      butOK.width = buttonWidth;
      butOK.height = buttonHeight;
      butOK.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
      butOK.thickness = 2;
      butOK.color = buttonColor;
      butOK.fontSize = buttonFontSize;
      butOK.background = buttonBackgroundColor;
      butOK.onPointerEnterObservable.add(() => {
        butOK.background = buttonBackgroundHoverColor;
      });
      butOK.onPointerOutObservable.add(() => {
        butOK.background = buttonBackgroundColor;
      });
      butOK.pointerDownAnimation = () => {
        butOK.background = buttonBackgroundClickColor;
      };
      butOK.pointerUpAnimation = () => {
        butOK.background = buttonBackgroundHoverColor;
      };
      butOK.onPointerClickObservable.add(() => {
        editSwatches(false);
        closePicker(newSwatch.background);
      });
      buttonGrid.addControl(butOK, 0, 0);
      const butCancel = Button.CreateSimpleButton("butCancel", "Cancel");
      butCancel.width = buttonWidth;
      butCancel.height = buttonHeight;
      butCancel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
      butCancel.thickness = 2;
      butCancel.color = buttonColor;
      butCancel.fontSize = buttonFontSize;
      butCancel.background = buttonBackgroundColor;
      butCancel.onPointerEnterObservable.add(() => {
        butCancel.background = buttonBackgroundHoverColor;
      });
      butCancel.onPointerOutObservable.add(() => {
        butCancel.background = buttonBackgroundColor;
      });
      butCancel.pointerDownAnimation = () => {
        butCancel.background = buttonBackgroundClickColor;
      };
      butCancel.pointerUpAnimation = () => {
        butCancel.background = buttonBackgroundHoverColor;
      };
      butCancel.onPointerClickObservable.add(() => {
        editSwatches(false);
        closePicker(currentSwatch.background);
      });
      buttonGrid.addControl(butCancel, 1, 0);
      if (options.savedColors) {
        butSave = Button.CreateSimpleButton("butSave", "Save");
        butSave.width = buttonWidth;
        butSave.height = buttonHeight;
        butSave.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        butSave.thickness = 2;
        butSave.fontSize = buttonFontSize;
        if (options.savedColors.length < options.swatchLimit) {
          butSave.color = buttonColor;
          butSave.background = buttonBackgroundColor;
        } else {
          disableButton(butSave, true);
        }
        butSave.onPointerEnterObservable.add(() => {
          if (options.savedColors) {
            if (options.savedColors.length < options.swatchLimit) {
              butSave.background = buttonBackgroundHoverColor;
            }
          }
        });
        butSave.onPointerOutObservable.add(() => {
          if (options.savedColors) {
            if (options.savedColors.length < options.swatchLimit) {
              butSave.background = buttonBackgroundColor;
            }
          }
        });
        butSave.pointerDownAnimation = () => {
          if (options.savedColors) {
            if (options.savedColors.length < options.swatchLimit) {
              butSave.background = buttonBackgroundClickColor;
            }
          }
        };
        butSave.pointerUpAnimation = () => {
          if (options.savedColors) {
            if (options.savedColors.length < options.swatchLimit) {
              butSave.background = buttonBackgroundHoverColor;
            }
          }
        };
        butSave.onPointerClickObservable.add(() => {
          if (options.savedColors) {
            if (options.savedColors.length == 0) {
              setEditButtonVisibility(true);
            }
            if (options.savedColors.length < options.swatchLimit) {
              updateSwatches(newSwatch.background, butSave);
            }
            editSwatches(false);
          }
        });
        if (options.savedColors.length > 0) {
          setEditButtonVisibility(true);
        }
        buttonGrid.addControl(butSave, 2, 0);
      }
      const pickerColorValues = new Grid();
      pickerColorValues.name = "Dialog Lower Right";
      pickerColorValues.addRowDefinition(0.02, false);
      pickerColorValues.addRowDefinition(0.63, false);
      pickerColorValues.addRowDefinition(0.21, false);
      pickerColorValues.addRowDefinition(0.14, false);
      pickerBodyRight.addControl(pickerColorValues, 1, 0);
      const currentColor = Color3.FromHexString(options.lastColor);
      const rgbValuesQuadrant = new Grid();
      rgbValuesQuadrant.name = "RGB Values";
      rgbValuesQuadrant.width = 0.82;
      rgbValuesQuadrant.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
      rgbValuesQuadrant.addRowDefinition(1 / 3, false);
      rgbValuesQuadrant.addRowDefinition(1 / 3, false);
      rgbValuesQuadrant.addRowDefinition(1 / 3, false);
      rgbValuesQuadrant.addColumnDefinition(0.1, false);
      rgbValuesQuadrant.addColumnDefinition(0.2, false);
      rgbValuesQuadrant.addColumnDefinition(0.7, false);
      pickerColorValues.addControl(rgbValuesQuadrant, 1, 0);
      for (let i = 0; i < inputFieldLabels.length; i++) {
        const labelText2 = new TextBlock();
        labelText2.text = inputFieldLabels[i];
        labelText2.color = buttonColor;
        labelText2.fontSize = buttonFontSize;
        rgbValuesQuadrant.addControl(labelText2, i, 0);
      }
      const rValInt = new InputText();
      rValInt.width = 0.83;
      rValInt.height = 0.72;
      rValInt.name = "rIntField";
      rValInt.fontSize = buttonFontSize;
      rValInt.text = (currentColor.r * 255).toString();
      rValInt.color = inputTextColor;
      rValInt.background = inputTextBackgroundColor;
      rValInt.onFocusObservable.add(() => {
        activeField = rValInt.name;
        lastVal = rValInt.text;
        editSwatches(false);
      });
      rValInt.onBlurObservable.add(() => {
        if (rValInt.text == "") {
          rValInt.text = "0";
        }
        updateInt(rValInt, "r");
        if (activeField == rValInt.name) {
          activeField = "";
        }
      });
      rValInt.onTextChangedObservable.add(() => {
        if (activeField == rValInt.name) {
          updateInt(rValInt, "r");
        }
      });
      rgbValuesQuadrant.addControl(rValInt, 0, 1);
      const gValInt = new InputText();
      gValInt.width = 0.83;
      gValInt.height = 0.72;
      gValInt.name = "gIntField";
      gValInt.fontSize = buttonFontSize;
      gValInt.text = (currentColor.g * 255).toString();
      gValInt.color = inputTextColor;
      gValInt.background = inputTextBackgroundColor;
      gValInt.onFocusObservable.add(() => {
        activeField = gValInt.name;
        lastVal = gValInt.text;
        editSwatches(false);
      });
      gValInt.onBlurObservable.add(() => {
        if (gValInt.text == "") {
          gValInt.text = "0";
        }
        updateInt(gValInt, "g");
        if (activeField == gValInt.name) {
          activeField = "";
        }
      });
      gValInt.onTextChangedObservable.add(() => {
        if (activeField == gValInt.name) {
          updateInt(gValInt, "g");
        }
      });
      rgbValuesQuadrant.addControl(gValInt, 1, 1);
      const bValInt = new InputText();
      bValInt.width = 0.83;
      bValInt.height = 0.72;
      bValInt.name = "bIntField";
      bValInt.fontSize = buttonFontSize;
      bValInt.text = (currentColor.b * 255).toString();
      bValInt.color = inputTextColor;
      bValInt.background = inputTextBackgroundColor;
      bValInt.onFocusObservable.add(() => {
        activeField = bValInt.name;
        lastVal = bValInt.text;
        editSwatches(false);
      });
      bValInt.onBlurObservable.add(() => {
        if (bValInt.text == "") {
          bValInt.text = "0";
        }
        updateInt(bValInt, "b");
        if (activeField == bValInt.name) {
          activeField = "";
        }
      });
      bValInt.onTextChangedObservable.add(() => {
        if (activeField == bValInt.name) {
          updateInt(bValInt, "b");
        }
      });
      rgbValuesQuadrant.addControl(bValInt, 2, 1);
      const rValDec = new InputText();
      rValDec.width = 0.95;
      rValDec.height = 0.72;
      rValDec.name = "rDecField";
      rValDec.fontSize = buttonFontSize;
      rValDec.text = currentColor.r.toString();
      rValDec.color = inputTextColor;
      rValDec.background = inputTextBackgroundColor;
      rValDec.onFocusObservable.add(() => {
        activeField = rValDec.name;
        lastVal = rValDec.text;
        editSwatches(false);
      });
      rValDec.onBlurObservable.add(() => {
        if (parseFloat(rValDec.text) == 0 || rValDec.text == "") {
          rValDec.text = "0";
          updateFloat(rValDec, "r");
        }
        if (activeField == rValDec.name) {
          activeField = "";
        }
      });
      rValDec.onTextChangedObservable.add(() => {
        if (activeField == rValDec.name) {
          updateFloat(rValDec, "r");
        }
      });
      rgbValuesQuadrant.addControl(rValDec, 0, 2);
      const gValDec = new InputText();
      gValDec.width = 0.95;
      gValDec.height = 0.72;
      gValDec.name = "gDecField";
      gValDec.fontSize = buttonFontSize;
      gValDec.text = currentColor.g.toString();
      gValDec.color = inputTextColor;
      gValDec.background = inputTextBackgroundColor;
      gValDec.onFocusObservable.add(() => {
        activeField = gValDec.name;
        lastVal = gValDec.text;
        editSwatches(false);
      });
      gValDec.onBlurObservable.add(() => {
        if (parseFloat(gValDec.text) == 0 || gValDec.text == "") {
          gValDec.text = "0";
          updateFloat(gValDec, "g");
        }
        if (activeField == gValDec.name) {
          activeField = "";
        }
      });
      gValDec.onTextChangedObservable.add(() => {
        if (activeField == gValDec.name) {
          updateFloat(gValDec, "g");
        }
      });
      rgbValuesQuadrant.addControl(gValDec, 1, 2);
      const bValDec = new InputText();
      bValDec.width = 0.95;
      bValDec.height = 0.72;
      bValDec.name = "bDecField";
      bValDec.fontSize = buttonFontSize;
      bValDec.text = currentColor.b.toString();
      bValDec.color = inputTextColor;
      bValDec.background = inputTextBackgroundColor;
      bValDec.onFocusObservable.add(() => {
        activeField = bValDec.name;
        lastVal = bValDec.text;
        editSwatches(false);
      });
      bValDec.onBlurObservable.add(() => {
        if (parseFloat(bValDec.text) == 0 || bValDec.text == "") {
          bValDec.text = "0";
          updateFloat(bValDec, "b");
        }
        if (activeField == bValDec.name) {
          activeField = "";
        }
      });
      bValDec.onTextChangedObservable.add(() => {
        if (activeField == bValDec.name) {
          updateFloat(bValDec, "b");
        }
      });
      rgbValuesQuadrant.addControl(bValDec, 2, 2);
      const hexValueQuadrant = new Grid();
      hexValueQuadrant.name = "Hex Value";
      hexValueQuadrant.width = 0.82;
      hexValueQuadrant.addRowDefinition(1, false);
      hexValueQuadrant.addColumnDefinition(0.1, false);
      hexValueQuadrant.addColumnDefinition(0.9, false);
      pickerColorValues.addControl(hexValueQuadrant, 2, 0);
      const labelText = new TextBlock();
      labelText.text = "#";
      labelText.color = buttonColor;
      labelText.fontSize = buttonFontSize;
      hexValueQuadrant.addControl(labelText, 0, 0);
      const hexVal = new InputText();
      hexVal.width = 0.96;
      hexVal.height = 0.72;
      hexVal.name = "hexField";
      hexVal.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
      hexVal.fontSize = buttonFontSize;
      const minusPound = options.lastColor.split("#");
      hexVal.text = minusPound[1];
      hexVal.color = inputTextColor;
      hexVal.background = inputTextBackgroundColor;
      hexVal.onFocusObservable.add(() => {
        activeField = hexVal.name;
        lastVal = hexVal.text;
        editSwatches(false);
      });
      hexVal.onBlurObservable.add(() => {
        if (hexVal.text.length == 3) {
          const val = hexVal.text.split("");
          hexVal.text = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
        }
        if (hexVal.text == "") {
          hexVal.text = "000000";
          updateValues(Color3.FromHexString(hexVal.text), "b");
        }
        if (activeField == hexVal.name) {
          activeField = "";
        }
      });
      hexVal.onTextChangedObservable.add(() => {
        let newHexValue = hexVal.text;
        const checkHex = /[^0-9A-F]/i.test(newHexValue);
        if ((hexVal.text.length > 6 || checkHex) && activeField == hexVal.name) {
          hexVal.text = lastVal;
        } else {
          if (hexVal.text.length < 6) {
            const leadingZero = 6 - hexVal.text.length;
            for (let i = 0; i < leadingZero; i++) {
              newHexValue = "0" + newHexValue;
            }
          }
          if (hexVal.text.length == 3) {
            const val = hexVal.text.split("");
            newHexValue = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
          }
          newHexValue = "#" + newHexValue;
          if (activeField == hexVal.name) {
            lastVal = hexVal.text;
            updateValues(Color3.FromHexString(newHexValue), hexVal.name);
          }
        }
      });
      hexValueQuadrant.addControl(hexVal, 0, 1);
      if (options.savedColors && options.savedColors.length > 0) {
        updateSwatches("", butSave);
      }
      function updateValues(value, inputField) {
        activeField = inputField;
        const pickedColor = value.toHexString();
        newSwatch.background = pickedColor;
        if (rValInt.name != activeField) {
          rValInt.text = Math.floor(value.r * 255).toString();
        }
        if (gValInt.name != activeField) {
          gValInt.text = Math.floor(value.g * 255).toString();
        }
        if (bValInt.name != activeField) {
          bValInt.text = Math.floor(value.b * 255).toString();
        }
        if (rValDec.name != activeField) {
          rValDec.text = value.r.toString();
        }
        if (gValDec.name != activeField) {
          gValDec.text = value.g.toString();
        }
        if (bValDec.name != activeField) {
          bValDec.text = value.b.toString();
        }
        if (hexVal.name != activeField) {
          const minusPound2 = pickedColor.split("#");
          hexVal.text = minusPound2[1];
        }
        if (picker.name != activeField) {
          picker.value = value;
        }
      }
      function updateInt(field, channel) {
        let newValue = field.text;
        const checkVal = /[^0-9]/g.test(newValue);
        if (checkVal) {
          field.text = lastVal;
          return;
        } else {
          if (newValue != "") {
            if (Math.floor(parseInt(newValue)) < 0) {
              newValue = "0";
            } else if (Math.floor(parseInt(newValue)) > 255) {
              newValue = "255";
            } else if (isNaN(parseInt(newValue))) {
              newValue = "0";
            }
          }
          if (activeField == field.name) {
            lastVal = newValue;
          }
        }
        if (newValue != "") {
          newValue = parseInt(newValue).toString();
          field.text = newValue;
          const newSwatchRGB = Color3.FromHexString(newSwatch.background);
          if (activeField == field.name) {
            if (channel == "r") {
              updateValues(new Color3(parseInt(newValue) / 255, newSwatchRGB.g, newSwatchRGB.b), field.name);
            } else if (channel == "g") {
              updateValues(new Color3(newSwatchRGB.r, parseInt(newValue) / 255, newSwatchRGB.b), field.name);
            } else {
              updateValues(new Color3(newSwatchRGB.r, newSwatchRGB.g, parseInt(newValue) / 255), field.name);
            }
          }
        }
      }
      function updateFloat(field, channel) {
        let newValue = field.text;
        const checkVal = /[^0-9.]/g.test(newValue);
        if (checkVal) {
          field.text = lastVal;
          return;
        } else {
          if (newValue != "" && newValue != "." && parseFloat(newValue) != 0) {
            if (parseFloat(newValue) < 0) {
              newValue = "0.0";
            } else if (parseFloat(newValue) > 1) {
              newValue = "1.0";
            } else if (isNaN(parseFloat(newValue))) {
              newValue = "0.0";
            }
          }
          if (activeField == field.name) {
            lastVal = newValue;
          }
        }
        if (newValue != "" && newValue != "." && parseFloat(newValue) != 0) {
          newValue = parseFloat(newValue).toString();
          field.text = newValue;
        } else {
          newValue = "0.0";
        }
        const newSwatchRGB = Color3.FromHexString(newSwatch.background);
        if (activeField == field.name) {
          if (channel == "r") {
            updateValues(new Color3(parseFloat(newValue), newSwatchRGB.g, newSwatchRGB.b), field.name);
          } else if (channel == "g") {
            updateValues(new Color3(newSwatchRGB.r, parseFloat(newValue), newSwatchRGB.b), field.name);
          } else {
            updateValues(new Color3(newSwatchRGB.r, newSwatchRGB.g, parseFloat(newValue)), field.name);
          }
        }
      }
      function deleteSwatch(index) {
        if (options.savedColors) {
          options.savedColors.splice(index, 1);
        }
        if (options.savedColors && options.savedColors.length == 0) {
          setEditButtonVisibility(false);
          editSwatchMode = false;
        }
      }
      function createSwatch() {
        if (options.savedColors && options.savedColors[swatchNumber]) {
          let icon;
          if (editSwatchMode) {
            icon = "b";
          } else {
            icon = "";
          }
          const swatch = Button.CreateSimpleButton("Swatch_" + swatchNumber, icon);
          swatch.fontFamily = "coreglyphs";
          const swatchColor = Color3.FromHexString(options.savedColors[swatchNumber]);
          const swatchLuminence = swatchColor.r + swatchColor.g + swatchColor.b;
          if (swatchLuminence > luminanceLimit) {
            swatch.color = iconColorDark;
          } else {
            swatch.color = iconColorLight;
          }
          swatch.fontSize = Math.floor(swatchSize * 0.7);
          swatch.textBlock.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
          swatch.height = swatch.width = swatchSize.toString() + "px";
          swatch.background = options.savedColors[swatchNumber];
          swatch.thickness = 2;
          const metadata = swatchNumber;
          swatch.pointerDownAnimation = () => {
            swatch.thickness = 4;
          };
          swatch.pointerUpAnimation = () => {
            swatch.thickness = 3;
          };
          swatch.pointerEnterAnimation = () => {
            swatch.thickness = 3;
          };
          swatch.pointerOutAnimation = () => {
            swatch.thickness = 2;
          };
          swatch.onPointerClickObservable.add(() => {
            if (!editSwatchMode) {
              if (options.savedColors) {
                updateValues(Color3.FromHexString(options.savedColors[metadata]), swatch.name);
              }
            } else {
              deleteSwatch(metadata);
              updateSwatches("", butSave);
            }
          });
          return swatch;
        } else {
          return null;
        }
      }
      function editSwatches(mode) {
        if (mode !== void 0) {
          editSwatchMode = mode;
        }
        let thisButton;
        if (editSwatchMode) {
          for (let i = 0; i < swatchDrawer.children.length; i++) {
            thisButton = swatchDrawer.children[i];
            thisButton.textBlock.text = "b";
          }
          if (butEdit !== void 0) {
            butEdit.textBlock.text = "Done";
          }
        } else {
          for (let i = 0; i < swatchDrawer.children.length; i++) {
            thisButton = swatchDrawer.children[i];
            thisButton.textBlock.text = "";
          }
          if (butEdit !== void 0) {
            butEdit.textBlock.text = "Edit";
          }
        }
      }
      function updateSwatches(color, button) {
        if (options.savedColors) {
          if (color != "") {
            options.savedColors.push(color);
          }
          swatchNumber = 0;
          swatchDrawer.clearControls();
          const rowCount = Math.ceil(options.savedColors.length / options.numSwatchesPerLine);
          let gutterCount;
          if (rowCount == 0) {
            gutterCount = 0;
          } else {
            gutterCount = rowCount + 1;
          }
          if (swatchDrawer.rowCount != rowCount + gutterCount) {
            const currentRows = swatchDrawer.rowCount;
            for (let i = 0; i < currentRows; i++) {
              swatchDrawer.removeRowDefinition(0);
            }
            for (let i = 0; i < rowCount + gutterCount; i++) {
              if (i % 2) {
                swatchDrawer.addRowDefinition(swatchSize, true);
              } else {
                swatchDrawer.addRowDefinition(gutterSize, true);
              }
            }
          }
          swatchDrawer.height = (swatchSize * rowCount + gutterCount * gutterSize).toString() + "px";
          for (let y = 1, thisRow = 1; y < rowCount + gutterCount; y += 2, thisRow++) {
            let totalButtonsThisRow;
            if (options.savedColors.length > thisRow * options.numSwatchesPerLine) {
              totalButtonsThisRow = options.numSwatchesPerLine;
            } else {
              totalButtonsThisRow = options.savedColors.length - (thisRow - 1) * options.numSwatchesPerLine;
            }
            const buttonIterations = Math.min(Math.max(totalButtonsThisRow, 0), options.numSwatchesPerLine);
            for (let x = 0, w = 1; x < buttonIterations; x++) {
              if (x > options.numSwatchesPerLine) {
                continue;
              }
              const swatch = createSwatch();
              if (swatch != null) {
                swatchDrawer.addControl(swatch, y, w);
                w += 2;
                swatchNumber++;
              } else {
                continue;
              }
            }
          }
          if (options.savedColors.length >= options.swatchLimit) {
            disableButton(button, true);
          } else {
            disableButton(button, false);
          }
        }
      }
      function setEditButtonVisibility(enableButton) {
        if (enableButton) {
          butEdit = Button.CreateSimpleButton("butEdit", "Edit");
          butEdit.width = buttonWidth;
          butEdit.height = buttonHeight;
          butEdit.left = Math.floor(parseInt(buttonWidth) * 0.1).toString() + "px";
          butEdit.top = (parseFloat(butEdit.left) * -1).toString() + "px";
          butEdit.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
          butEdit.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
          butEdit.thickness = 2;
          butEdit.color = buttonColor;
          butEdit.fontSize = buttonFontSize;
          butEdit.background = buttonBackgroundColor;
          butEdit.onPointerEnterObservable.add(() => {
            butEdit.background = buttonBackgroundHoverColor;
          });
          butEdit.onPointerOutObservable.add(() => {
            butEdit.background = buttonBackgroundColor;
          });
          butEdit.pointerDownAnimation = () => {
            butEdit.background = buttonBackgroundClickColor;
          };
          butEdit.pointerUpAnimation = () => {
            butEdit.background = buttonBackgroundHoverColor;
          };
          butEdit.onPointerClickObservable.add(() => {
            if (editSwatchMode) {
              editSwatchMode = false;
            } else {
              editSwatchMode = true;
            }
            editSwatches();
          });
          pickerGrid.addControl(butEdit, 1, 0);
        } else {
          pickerGrid.removeControl(butEdit);
        }
      }
      function disableButton(button, disabled) {
        if (disabled) {
          button.color = buttonDisabledColor;
          button.background = buttonDisabledBackgroundColor;
        } else {
          button.color = buttonColor;
          button.background = buttonBackgroundColor;
        }
      }
      function closePicker(color) {
        if (options.savedColors && options.savedColors.length > 0) {
          resolve({
            savedColors: options.savedColors,
            pickedColor: color
          });
        } else {
          resolve({
            pickedColor: color
          });
        }
        advancedTexture.removeControl(dialogContainer);
      }
    });
  }
};
ColorPicker._Epsilon = 1e-6;
__decorate([
  serialize()
], ColorPicker.prototype, "value", null);
__decorate([
  serialize()
], ColorPicker.prototype, "width", null);
__decorate([
  serialize()
], ColorPicker.prototype, "height", null);
__decorate([
  serialize()
], ColorPicker.prototype, "size", null);
RegisterClass("BABYLON.GUI.ColorPicker", ColorPicker);

// node_modules/@babylonjs/gui/2D/controls/ellipse.js
var Ellipse = class extends Container {
  /** Gets or sets border thickness */
  get thickness() {
    return this._thickness;
  }
  set thickness(value) {
    if (this._thickness === value) {
      return;
    }
    this._thickness = value;
    this._markAsDirty();
  }
  /**
   * Creates a new Ellipse
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._thickness = 1;
  }
  _getTypeName() {
    return "Ellipse";
  }
  _localDraw(context) {
    context.save();
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._thickness / 2, this._currentMeasure.height / 2 - this._thickness / 2, context);
    if (this._backgroundGradient || this._background) {
      context.fillStyle = this._getBackgroundColor(context);
      context.fill();
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    if (this._thickness) {
      if (this.color) {
        context.strokeStyle = this.color;
      }
      context.lineWidth = this._thickness;
      context.stroke();
    }
    context.restore();
  }
  _additionalProcessing(parentMeasure, context) {
    super._additionalProcessing(parentMeasure, context);
    this._measureForChildren.width -= 2 * this._thickness;
    this._measureForChildren.height -= 2 * this._thickness;
    this._measureForChildren.left += this._thickness;
    this._measureForChildren.top += this._thickness;
  }
  _clipForChildren(context) {
    Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2, this._currentMeasure.height / 2, context);
    context.clip();
  }
  _renderHighlightSpecific(context) {
    Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._highlightLineWidth / 2, this._currentMeasure.height / 2 - this._highlightLineWidth / 2, context);
    context.stroke();
  }
};
__decorate([
  serialize()
], Ellipse.prototype, "thickness", null);
RegisterClass("BABYLON.GUI.Ellipse", Ellipse);

// node_modules/@babylonjs/gui/2D/controls/focusableButton.js
var FocusableButton = class extends Button {
  constructor(name22) {
    super(name22);
    this.name = name22;
    this.focusedColor = null;
    this._isFocused = false;
    this._unfocusedColor = null;
    this.onFocusObservable = new Observable();
    this.onBlurObservable = new Observable();
    this.onKeyboardEventProcessedObservable = new Observable();
    this._unfocusedColor = this.color;
  }
  /** @internal */
  onBlur() {
    if (this._isFocused) {
      this._isFocused = false;
      if (this.focusedColor && this._unfocusedColor != null) {
        this.color = this._unfocusedColor;
      }
      this.onBlurObservable.notifyObservers(this);
    }
  }
  /** @internal */
  onFocus() {
    this._isFocused = true;
    if (this.focusedColor) {
      this._unfocusedColor = this.color;
      this.color = this.focusedColor;
    }
    this.onFocusObservable.notifyObservers(this);
  }
  /**
   * Function called to get the list of controls that should not steal the focus from this control
   * @returns an array of controls
   */
  keepsFocusWith() {
    return null;
  }
  /**
   * Function to focus a button programmatically
   */
  focus() {
    this._host.moveFocusToControl(this);
  }
  /**
   * Function to unfocus a button programmatically
   */
  blur() {
    this._host.focusedControl = null;
  }
  /**
   * Handles the keyboard event
   * @param evt Defines the KeyboardEvent
   */
  processKeyboard(evt) {
    this.onKeyboardEventProcessedObservable.notifyObservers(evt, -1, this);
  }
  /**
   * @internal
   */
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!this.isReadOnly) {
      this.focus();
    }
    return super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi);
  }
  /** @internal */
  dispose() {
    super.dispose();
    this.onBlurObservable.clear();
    this.onFocusObservable.clear();
    this.onKeyboardEventProcessedObservable.clear();
  }
};
RegisterClass("BABYLON.GUI.FocusableButton", FocusableButton);

// node_modules/@babylonjs/gui/2D/controls/inputTextArea.js
var InputTextArea = class extends InputText {
  /** Gets or sets a boolean indicating if the control can auto stretch its height to adapt to the text */
  get autoStretchHeight() {
    return this._autoStretchHeight;
  }
  set autoStretchHeight(value) {
    if (this._autoStretchHeight === value) {
      return;
    }
    this._autoStretchHeight = value;
    this._markAsDirty();
  }
  set height(value) {
    this.fixedRatioMasterIsWidth = false;
    if (this._height.toString(this._host) === value) {
      return;
    }
    if (this._height.fromString(value)) {
      this._markAsDirty();
    }
    this._autoStretchHeight = false;
  }
  get maxHeight() {
    return this._maxHeight.toString(this._host);
  }
  /** Gets the maximum width allowed by the control in pixels */
  get maxHeightInPixels() {
    return this._maxHeight.getValueInPixel(this._host, this._cachedParentMeasure.height);
  }
  set maxHeight(value) {
    if (this._maxHeight.toString(this._host) === value) {
      return;
    }
    if (this._maxHeight.fromString(value)) {
      this._markAsDirty();
    }
  }
  /**
   * Creates a new InputTextArea
   * @param name defines the control name
   * @param text defines the text of the control
   */
  constructor(name22, text = "") {
    super(name22);
    this.name = name22;
    this._textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this._prevText = this.text;
    this._lineSpacing = new ValueAndUnit(0);
    this._maxHeight = new ValueAndUnit(1, ValueAndUnit.UNITMODE_PERCENTAGE, false);
    this.onLinesReadyObservable = new Observable();
    this.text = text;
    this.isPointerBlocker = true;
    this.onLinesReadyObservable.add(() => this._updateCursorPosition());
    this._highlightCursorInfo = {
      initialStartIndex: -1,
      initialRelativeStartIndex: -1,
      initialLineIndex: -1
    };
    this._cursorInfo = {
      globalStartIndex: 0,
      globalEndIndex: 0,
      relativeEndIndex: 0,
      relativeStartIndex: 0,
      currentLineIndex: 0
    };
  }
  _getTypeName() {
    return "InputTextArea";
  }
  /**
   * Handles the keyboard event
   * @param evt Defines the KeyboardEvent
   */
  processKeyboard(evt) {
    if (this.isReadOnly) {
      return;
    }
    this.alternativeProcessKey(evt.code, evt.key, evt);
    this.onKeyboardEventProcessedObservable.notifyObservers(evt);
  }
  /**
   * Process the last keyboard input
   *
   * @param code The ascii input number
   * @param key The key string representation
   * @param evt The keyboard event emits with input
   * @internal
   */
  alternativeProcessKey(code, key, evt) {
    if (evt && (evt.ctrlKey || evt.metaKey) && (code === "KeyC" || code === "KeyV" || code === "KeyX")) {
      return;
    }
    switch (code) {
      case "KeyA":
        if (evt && (evt.ctrlKey || evt.metaKey)) {
          this._selectAllText();
          evt.preventDefault();
          return;
        }
        break;
      case "Period":
        if (evt && evt.shiftKey) {
          evt.preventDefault();
        }
        break;
      case "Backspace":
        if (!this._isTextHighlightOn && this._cursorInfo.globalStartIndex > 0) {
          this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
          this._cursorInfo.globalStartIndex--;
        }
        this._prevText = this._textWrapper.text;
        this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
        this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
        if (evt) {
          evt.preventDefault();
        }
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._textHasChanged();
        break;
      case "Delete":
        if (!this._isTextHighlightOn && this._cursorInfo.globalEndIndex < this.text.length) {
          this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex + 1;
        }
        this._prevText = this._textWrapper.text;
        this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
        this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
        if (evt) {
          evt.preventDefault();
        }
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._textHasChanged();
        break;
      case "Enter":
        this._prevText = this._textWrapper.text;
        this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex, "\n");
        this._cursorInfo.globalStartIndex++;
        this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._textHasChanged();
        return;
      case "End":
        this._cursorInfo.globalStartIndex = this.text.length;
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._markAsDirty();
        return;
      case "Home":
        this._cursorInfo.globalStartIndex = 0;
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._markAsDirty();
        return;
      case "ArrowLeft":
        this._markAsDirty();
        if (evt && evt.shiftKey) {
          if (evt.ctrlKey || evt.metaKey) {
            this._cursorInfo.globalStartIndex -= this._cursorInfo.relativeStartIndex;
            this._cursorInfo.globalEndIndex = this._highlightCursorInfo.initialStartIndex;
          }
          if (!this._isTextHighlightOn) {
            this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
            this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
            this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
            this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
            this._cursorInfo.globalStartIndex--;
            this._isTextHighlightOn = true;
          } else {
            if (this._cursorInfo.globalEndIndex > this._highlightCursorInfo.initialStartIndex) {
              this._cursorInfo.globalEndIndex--;
            } else {
              this._cursorInfo.globalStartIndex--;
            }
          }
          this._blinkIsEven = true;
          evt.preventDefault();
          return;
        }
        if (this._isTextHighlightOn) {
          this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
        } else if (evt && (evt.ctrlKey || evt.metaKey)) {
          this._cursorInfo.globalStartIndex -= this._cursorInfo.relativeStartIndex;
          evt.preventDefault();
        } else if (this._cursorInfo.globalStartIndex > 0) {
          this._cursorInfo.globalStartIndex--;
        }
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        return;
      case "ArrowRight":
        this._markAsDirty();
        if (evt && evt.shiftKey) {
          if (evt.ctrlKey || evt.metaKey) {
            const rightDelta = this._lines[this._cursorInfo.currentLineIndex].text.length - this._cursorInfo.relativeEndIndex - 1;
            this._cursorInfo.globalEndIndex += rightDelta;
            this._cursorInfo.globalStartIndex = this._highlightCursorInfo.initialStartIndex;
          }
          if (!this._isTextHighlightOn) {
            this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
            this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
            this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
            this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
            this._cursorInfo.globalEndIndex++;
            this._isTextHighlightOn = true;
          } else {
            if (this._cursorInfo.globalStartIndex < this._highlightCursorInfo.initialStartIndex) {
              this._cursorInfo.globalStartIndex++;
            } else {
              this._cursorInfo.globalEndIndex++;
            }
          }
          this._blinkIsEven = true;
          evt.preventDefault();
          return;
        }
        if (this._isTextHighlightOn) {
          this._cursorInfo.globalStartIndex = this._cursorInfo.globalEndIndex;
        } else if (evt && (evt.ctrlKey || evt.metaKey)) {
          const rightDelta = this._lines[this._cursorInfo.currentLineIndex].text.length - this._cursorInfo.relativeEndIndex;
          this._cursorInfo.globalStartIndex += rightDelta;
        } else if (this._cursorInfo.globalStartIndex < this.text.length) {
          this._cursorInfo.globalStartIndex++;
        }
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        return;
      case "ArrowUp":
        this._blinkIsEven = false;
        if (evt) {
          if (evt.shiftKey) {
            if (!this._isTextHighlightOn) {
              this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
              this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
              this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
            }
            this._isTextHighlightOn = true;
            this._blinkIsEven = true;
          } else {
            this._isTextHighlightOn = false;
          }
          evt.preventDefault();
        }
        if (this._cursorInfo.currentLineIndex === 0) {
          this._cursorInfo.globalStartIndex = 0;
        } else {
          const currentLine = this._lines[this._cursorInfo.currentLineIndex];
          const upperLine = this._lines[this._cursorInfo.currentLineIndex - 1];
          let tmpIndex = 0;
          let relativeIndex = 0;
          if (!this._isTextHighlightOn || this._cursorInfo.currentLineIndex < this._highlightCursorInfo.initialLineIndex) {
            tmpIndex = this._cursorInfo.globalStartIndex;
            relativeIndex = this._cursorInfo.relativeStartIndex;
          } else {
            tmpIndex = this._cursorInfo.globalEndIndex;
            relativeIndex = this._cursorInfo.relativeEndIndex;
          }
          const currentText = currentLine.text.substr(0, relativeIndex);
          const currentWidth = this._contextForBreakLines.measureText(currentText).width;
          let upperWidth = 0;
          let previousWidth = 0;
          tmpIndex -= relativeIndex;
          tmpIndex -= upperLine.text.length + upperLine.lineEnding.length;
          let upperLineRelativeIndex = 0;
          while (upperWidth < currentWidth && upperLineRelativeIndex < upperLine.text.length) {
            tmpIndex++;
            upperLineRelativeIndex++;
            previousWidth = Math.abs(currentWidth - upperWidth);
            upperWidth = this._contextForBreakLines.measureText(upperLine.text.substr(0, upperLineRelativeIndex)).width;
          }
          if (Math.abs(currentWidth - upperWidth) > previousWidth && upperLineRelativeIndex > 0) {
            tmpIndex--;
          }
          if (!this._isTextHighlightOn) {
            this._cursorInfo.globalStartIndex = tmpIndex;
          } else if (this._cursorInfo.currentLineIndex <= this._highlightCursorInfo.initialLineIndex) {
            this._cursorInfo.globalStartIndex = tmpIndex;
            this._cursorInfo.globalEndIndex = this._highlightCursorInfo.initialStartIndex;
            this._cursorInfo.relativeEndIndex = this._highlightCursorInfo.initialRelativeStartIndex;
          } else {
            this._cursorInfo.globalEndIndex = tmpIndex;
          }
        }
        this._markAsDirty();
        return;
      case "ArrowDown":
        this._blinkIsEven = false;
        if (evt) {
          if (evt.shiftKey) {
            if (!this._isTextHighlightOn) {
              this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
              this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
              this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
            }
            this._isTextHighlightOn = true;
            this._blinkIsEven = true;
          } else {
            this._isTextHighlightOn = false;
          }
          evt.preventDefault();
        }
        if (this._cursorInfo.currentLineIndex === this._lines.length - 1) {
          this._cursorInfo.globalStartIndex = this.text.length;
        } else {
          const currentLine = this._lines[this._cursorInfo.currentLineIndex];
          const underLine = this._lines[this._cursorInfo.currentLineIndex + 1];
          let tmpIndex = 0;
          let relativeIndex = 0;
          if (!this._isTextHighlightOn || this._cursorInfo.currentLineIndex < this._highlightCursorInfo.initialLineIndex) {
            tmpIndex = this._cursorInfo.globalStartIndex;
            relativeIndex = this._cursorInfo.relativeStartIndex;
          } else {
            tmpIndex = this._cursorInfo.globalEndIndex;
            relativeIndex = this._cursorInfo.relativeEndIndex;
          }
          const currentText = currentLine.text.substr(0, relativeIndex);
          const currentWidth = this._contextForBreakLines.measureText(currentText).width;
          let underWidth = 0;
          let previousWidth = 0;
          tmpIndex += currentLine.text.length - relativeIndex + currentLine.lineEnding.length;
          let underLineRelativeIndex = 0;
          while (underWidth < currentWidth && underLineRelativeIndex < underLine.text.length) {
            tmpIndex++;
            underLineRelativeIndex++;
            previousWidth = Math.abs(currentWidth - underWidth);
            underWidth = this._contextForBreakLines.measureText(underLine.text.substr(0, underLineRelativeIndex)).width;
          }
          if (Math.abs(currentWidth - underWidth) > previousWidth && underLineRelativeIndex > 0) {
            tmpIndex--;
          }
          if (!this._isTextHighlightOn) {
            this._cursorInfo.globalStartIndex = tmpIndex;
          } else if (this._cursorInfo.currentLineIndex < this._highlightCursorInfo.initialLineIndex) {
            this._cursorInfo.globalStartIndex = tmpIndex;
            if (this._cursorInfo.globalStartIndex > this._cursorInfo.globalEndIndex) {
              this._cursorInfo.globalEndIndex += this._cursorInfo.globalStartIndex;
              this._cursorInfo.globalStartIndex = this._cursorInfo.globalEndIndex - this._cursorInfo.globalStartIndex;
              this._cursorInfo.globalEndIndex -= this._cursorInfo.globalStartIndex;
            }
          } else {
            this._cursorInfo.globalEndIndex = tmpIndex;
            this._cursorInfo.globalStartIndex = this._highlightCursorInfo.initialStartIndex;
          }
        }
        this._markAsDirty();
        return;
    }
    if ((key == null ? void 0 : key.length) === 1) {
      evt == null ? void 0 : evt.preventDefault();
      this._currentKey = key;
      this.onBeforeKeyAddObservable.notifyObservers(this);
      key = this._currentKey;
      if (this._addKey) {
        this._isTextHighlightOn = false;
        this._blinkIsEven = false;
        this._prevText = this._textWrapper.text;
        this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex, key);
        this._cursorInfo.globalStartIndex += key.length;
        this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
        this._textHasChanged();
      }
    }
  }
  _parseLineWordWrap(line = "", width, context) {
    const lines = [];
    const words = line.split(" ");
    let lineWidth = 0;
    for (let n = 0; n < words.length; n++) {
      const testLine = n > 0 ? line + " " + words[n] : words[0];
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > width) {
        if (n > 0) {
          lineWidth = context.measureText(line).width;
          lines.push({ text: line, width: lineWidth, lineEnding: " " });
        }
        line = words[n];
        let flushedLine = "";
        line.split("").map((char) => {
          if (context.measureText(flushedLine + char).width > width) {
            lines.push({ text: flushedLine, width: context.measureText(flushedLine).width, lineEnding: "" });
            flushedLine = "";
          }
          flushedLine += char;
        });
        line = flushedLine;
        lineWidth = context.measureText(line).width;
      } else {
        lineWidth = testWidth;
        line = testLine;
      }
    }
    lines.push({ text: line, width: lineWidth, lineEnding: " " });
    return lines;
  }
  _breakLines(refWidth, context) {
    const lines = [];
    const _lines = (this.text || this.placeholderText).split("\n");
    if (this.clipContent) {
      for (const _line of _lines) {
        lines.push(...this._parseLineWordWrap(_line, refWidth, context));
      }
    } else {
      for (const _line of _lines) {
        lines.push(this._parseLine(_line, context));
      }
    }
    lines[lines.length - 1].lineEnding = "\n";
    return lines;
  }
  _parseLine(line = "", context) {
    return { text: line, width: context.measureText(line).width, lineEnding: " " };
  }
  /**
   * Processing of child right before the parent measurement update
   *
   * @param parentMeasure The parent measure
   * @param context The rendering canvas
   * @internal
   */
  _preMeasure(parentMeasure, context) {
    if (!this._fontOffset || this._wasDirty) {
      this._fontOffset = Control._GetFontOffset(context.font);
    }
    let text = this._beforeRenderText(this._textWrapper).text;
    if (!this.text && this._placeholderText) {
      text = this._placeholderText;
    }
    this._textWidth = context.measureText(text).width;
    const marginWidth = this._margin.getValueInPixel(this._host, parentMeasure.width) * 2;
    if (this._autoStretchWidth) {
      const tmpLines = text.split("\n");
      const longerString = tmpLines.reduce((acc, val) => {
        const valueLength = context.measureText(val).width;
        const accLength = context.measureText(acc).width;
        return valueLength > accLength ? val : acc;
      }, "");
      const longerStringWidth = context.measureText(longerString).width;
      this.width = Math.min(this._maxWidth.getValueInPixel(this._host, parentMeasure.width), longerStringWidth + marginWidth) + "px";
      this.autoStretchWidth = true;
    }
    this._availableWidth = this._width.getValueInPixel(this._host, parentMeasure.width) - marginWidth;
    this._lines = this._breakLines(this._availableWidth, context);
    this._contextForBreakLines = context;
    if (this._autoStretchHeight) {
      const textHeight = this._lines.length * this._fontOffset.height;
      const totalHeight = textHeight + this._margin.getValueInPixel(this._host, parentMeasure.height) * 2;
      this.height = Math.min(this._maxHeight.getValueInPixel(this._host, parentMeasure.height), totalHeight) + "px";
      this._autoStretchHeight = true;
    }
    this._availableHeight = this._height.getValueInPixel(this._host, parentMeasure.height) - marginWidth;
    if (this._isFocused) {
      this._cursorInfo.currentLineIndex = 0;
      let lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
      let tmpLength = 0;
      while (tmpLength + lineLength <= this._cursorInfo.globalStartIndex) {
        tmpLength += lineLength;
        if (this._cursorInfo.currentLineIndex < this._lines.length - 1) {
          this._cursorInfo.currentLineIndex++;
          lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
        }
      }
    }
  }
  _textHasChanged() {
    if (!this._prevText && this._textWrapper.text && this.placeholderText) {
      this._cursorInfo.currentLineIndex = 0;
      this._cursorInfo.globalStartIndex = 1;
      this._cursorInfo.globalEndIndex = 1;
      this._cursorInfo.relativeStartIndex = 1;
      this._cursorInfo.relativeEndIndex = 1;
    }
    super._textHasChanged();
  }
  _computeScroll() {
    this._clipTextLeft = this._currentMeasure.left + this._margin.getValueInPixel(this._host, this._cachedParentMeasure.width);
    this._clipTextTop = this._currentMeasure.top + this._margin.getValueInPixel(this._host, this._cachedParentMeasure.height);
    if (this._isFocused && this._lines[this._cursorInfo.currentLineIndex].width > this._availableWidth) {
      const textLeft = this._clipTextLeft - this._lines[this._cursorInfo.currentLineIndex].width + this._availableWidth;
      if (!this._scrollLeft) {
        this._scrollLeft = textLeft;
      }
    } else {
      this._scrollLeft = this._clipTextLeft;
    }
    if (this._isFocused && !this._autoStretchHeight) {
      const selectedHeight = (this._cursorInfo.currentLineIndex + 1) * this._fontOffset.height;
      const textTop = this._clipTextTop - selectedHeight;
      if (!this._scrollTop) {
        this._scrollTop = textTop;
      }
    } else {
      this._scrollTop = this._clipTextTop;
    }
  }
  /**
   * Processing of child after the parent measurement update
   *
   * @internal
   */
  _additionalProcessing() {
    this.highlightedText = "";
    this.onLinesReadyObservable.notifyObservers(this);
  }
  _drawText(text, textWidth, y, context) {
    const width = this._currentMeasure.width;
    let x = this._scrollLeft;
    switch (this._textHorizontalAlignment) {
      case Control.HORIZONTAL_ALIGNMENT_LEFT:
        x += 0;
        break;
      case Control.HORIZONTAL_ALIGNMENT_RIGHT:
        x += width - textWidth;
        break;
      case Control.HORIZONTAL_ALIGNMENT_CENTER:
        x += (width - textWidth) / 2;
        break;
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    if (this.outlineWidth) {
      context.strokeText(text, this._currentMeasure.left + x, y);
    }
    context.fillText(text, x, y);
  }
  /**
   * Copy the text in the clipboard
   *
   * @param ev The clipboard event
   * @internal
   */
  _onCopyText(ev) {
    this._isTextHighlightOn = false;
    try {
      ev.clipboardData && ev.clipboardData.setData("text/plain", this._highlightedText);
    } catch {
    }
    this._host.clipboardData = this._highlightedText;
  }
  /**
   * Cut the text and copy it in the clipboard
   *
   * @param ev The clipboard event
   * @internal
   */
  _onCutText(ev) {
    if (!this._highlightedText) {
      return;
    }
    try {
      ev.clipboardData && ev.clipboardData.setData("text/plain", this._highlightedText);
    } catch {
    }
    this._host.clipboardData = this._highlightedText;
    this._prevText = this._textWrapper.text;
    this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
    this._textHasChanged();
  }
  /**
   * Paste the copied text from the clipboard
   *
   * @param ev The clipboard event
   * @internal
   */
  _onPasteText(ev) {
    let data = "";
    if (ev.clipboardData && ev.clipboardData.types.indexOf("text/plain") !== -1) {
      data = ev.clipboardData.getData("text/plain");
    } else {
      data = this._host.clipboardData;
    }
    this._isTextHighlightOn = false;
    this._prevText = this._textWrapper.text;
    this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex, data);
    const deltaIndex = data.length - (this._cursorInfo.globalEndIndex - this._cursorInfo.globalStartIndex);
    this._cursorInfo.globalStartIndex += deltaIndex;
    this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
    this._textHasChanged();
  }
  _draw(context) {
    this._computeScroll();
    this._scrollLeft = this._scrollLeft ?? 0;
    this._scrollTop = this._scrollTop ?? 0;
    context.save();
    this._applyStates(context);
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    if (this._isFocused) {
      if (this._focusedBackground) {
        context.fillStyle = this._isEnabled ? this._focusedBackground : this._disabledColor;
        context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
      }
    } else if (this._background) {
      context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
      context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    if (this.color) {
      context.fillStyle = this.color;
    }
    const height = this._currentMeasure.height;
    const width = this._currentMeasure.width;
    let rootY = 0;
    switch (this._textVerticalAlignment) {
      case Control.VERTICAL_ALIGNMENT_TOP:
        rootY = this._fontOffset.ascent;
        break;
      case Control.VERTICAL_ALIGNMENT_BOTTOM:
        rootY = height - this._fontOffset.height * (this._lines.length - 1) - this._fontOffset.descent;
        break;
      case Control.VERTICAL_ALIGNMENT_CENTER:
        rootY = this._fontOffset.ascent + (height - this._fontOffset.height * this._lines.length) / 2;
        break;
    }
    context.save();
    context.beginPath();
    context.fillStyle = this.fontStyle;
    if (!this._textWrapper.text && this.placeholderText) {
      context.fillStyle = this._placeholderColor;
    }
    context.rect(this._clipTextLeft, this._clipTextTop, this._availableWidth + 2, this._availableHeight + 2);
    context.clip();
    rootY += this._scrollTop;
    for (let i = 0; i < this._lines.length; i++) {
      const line = this._lines[i];
      if (i !== 0 && this._lineSpacing.internalValue !== 0) {
        if (this._lineSpacing.isPixel) {
          rootY += this._lineSpacing.getValue(this._host);
        } else {
          rootY = rootY + this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
        }
      }
      this._drawText(line.text, line.width, rootY, context);
      rootY += this._fontOffset.height;
    }
    context.restore();
    if (this._isFocused) {
      if (!this._blinkIsEven || this._isTextHighlightOn) {
        let cursorLeft = this._scrollLeft + context.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substr(0, this._cursorInfo.relativeStartIndex)).width;
        if (cursorLeft < this._clipTextLeft) {
          this._scrollLeft += this._clipTextLeft - cursorLeft;
          cursorLeft = this._clipTextLeft;
          this._markAsDirty();
        } else if (cursorLeft > this._clipTextLeft + this._availableWidth) {
          this._scrollLeft += this._clipTextLeft + this._availableWidth - cursorLeft;
          cursorLeft = this._clipTextLeft + this._availableWidth;
          this._markAsDirty();
        }
        let cursorTop = this._scrollTop + this._cursorInfo.currentLineIndex * this._fontOffset.height;
        if (cursorTop < this._clipTextTop) {
          this._scrollTop += this._clipTextTop - cursorTop;
          cursorTop = this._clipTextTop;
          this._markAsDirty();
        } else if (cursorTop + this._fontOffset.height > this._clipTextTop + this._availableHeight) {
          this._scrollTop += this._clipTextTop + this._availableHeight - cursorTop - this._fontOffset.height;
          cursorTop = this._clipTextTop + this._availableHeight - this._fontOffset.height;
          this._markAsDirty();
        }
        if (!this._isTextHighlightOn) {
          context.fillRect(cursorLeft, cursorTop, 2, this._fontOffset.height);
        }
      }
      this._resetBlinking();
      if (this._isTextHighlightOn) {
        clearTimeout(this._blinkTimeout);
        this._highlightedText = this.text.substring(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
        context.globalAlpha = this._highligherOpacity;
        context.fillStyle = this._textHighlightColor;
        const startLineIndex = Math.min(this._cursorInfo.currentLineIndex, this._highlightCursorInfo.initialLineIndex);
        const endLineIndex = Math.max(this._cursorInfo.currentLineIndex, this._highlightCursorInfo.initialLineIndex);
        let highlightRootY = this._scrollTop + startLineIndex * this._fontOffset.height;
        for (let i = startLineIndex; i <= endLineIndex; i++) {
          const line = this._lines[i];
          let highlightRootX = this._scrollLeft;
          switch (this._textHorizontalAlignment) {
            case Control.HORIZONTAL_ALIGNMENT_LEFT:
              highlightRootX += 0;
              break;
            case Control.HORIZONTAL_ALIGNMENT_RIGHT:
              highlightRootX += width - line.width;
              break;
            case Control.HORIZONTAL_ALIGNMENT_CENTER:
              highlightRootX += (width - line.width) / 2;
              break;
          }
          const begin = i === startLineIndex ? this._cursorInfo.relativeStartIndex : 0;
          const end = i === endLineIndex ? this._cursorInfo.relativeEndIndex : line.text.length;
          const leftOffsetWidth = context.measureText(line.text.substr(0, begin)).width;
          const selectedText = line.text.substring(begin, end);
          const hightlightWidth = context.measureText(selectedText).width;
          context.fillRect(highlightRootX + leftOffsetWidth, highlightRootY, hightlightWidth, this._fontOffset.height);
          highlightRootY += this._fontOffset.height;
        }
        if (this._cursorInfo.globalEndIndex === this._cursorInfo.globalStartIndex) {
          this._resetBlinking();
        }
      }
    }
    context.restore();
    if (this._thickness) {
      if (this._isFocused) {
        if (this.focusedColor) {
          context.strokeStyle = this.focusedColor;
        }
      } else {
        if (this.color) {
          context.strokeStyle = this.color;
        }
      }
      context.lineWidth = this._thickness;
      context.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, this._currentMeasure.width - this._thickness, this._currentMeasure.height - this._thickness);
    }
  }
  _resetBlinking() {
    clearTimeout(this._blinkTimeout);
    this._blinkTimeout = setTimeout(() => {
      this._blinkIsEven = !this._blinkIsEven;
      this._markAsDirty();
    }, 500);
  }
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (this.isReadOnly) {
      return true;
    }
    this._clickedCoordinateX = coordinates.x;
    this._clickedCoordinateY = coordinates.y;
    this._isTextHighlightOn = false;
    this._highlightedText = "";
    this._isPointerDown = true;
    this._host._capturingControl[pointerId] = this;
    if (this._host.focusedControl === this) {
      clearTimeout(this._blinkTimeout);
      this._markAsDirty();
      return true;
    }
    if (!this._isEnabled) {
      return false;
    }
    this._host.focusedControl = this;
    return true;
  }
  // for textselection
  _onPointerMove(target, coordinates, pointerId, pi) {
    if (pi.event.movementX === 0 && pi.event.movementY === 0) {
      return;
    }
    if (this._host.focusedControl === this && this._isPointerDown && !this.isReadOnly) {
      this._clickedCoordinateX = coordinates.x;
      this._clickedCoordinateY = coordinates.y;
      if (!this._isTextHighlightOn) {
        this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
        this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
        this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
        this._isTextHighlightOn = true;
      }
      this._markAsDirty();
    }
    super._onPointerMove(target, coordinates, pointerId, pi);
  }
  /**
   * Apply the correct position of cursor according to current modification
   */
  _updateCursorPosition() {
    if (!this._isFocused) {
      return;
    }
    if (!this._textWrapper.text && this.placeholderText) {
      this._cursorInfo.currentLineIndex = 0;
      this._cursorInfo.globalStartIndex = 0;
      this._cursorInfo.globalEndIndex = 0;
      this._cursorInfo.relativeStartIndex = 0;
      this._cursorInfo.relativeEndIndex = 0;
    } else {
      if (this._clickedCoordinateX && this._clickedCoordinateY) {
        if (!this._isTextHighlightOn) {
          this._cursorInfo = {
            globalStartIndex: 0,
            globalEndIndex: 0,
            relativeStartIndex: 0,
            relativeEndIndex: 0,
            currentLineIndex: 0
          };
        }
        let globalIndex = 0;
        let relativeIndex = 0;
        const lastClickedCoordinateY = this._clickedCoordinateY - this._scrollTop;
        const relativeCoordinateY = Math.floor(lastClickedCoordinateY / this._fontOffset.height);
        this._cursorInfo.currentLineIndex = Math.min(Math.max(relativeCoordinateY, 0), this._lines.length - 1);
        let currentSize = 0;
        const relativeXPosition = this._clickedCoordinateX - (this._scrollLeft ?? 0);
        let previousDist = 0;
        for (let index = 0; index < this._cursorInfo.currentLineIndex; index++) {
          const line = this._lines[index];
          globalIndex += line.text.length + line.lineEnding.length;
        }
        while (currentSize < relativeXPosition && this._lines[this._cursorInfo.currentLineIndex].text.length > relativeIndex) {
          relativeIndex++;
          previousDist = Math.abs(relativeXPosition - currentSize);
          currentSize = this._contextForBreakLines.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substr(0, relativeIndex)).width;
        }
        if (Math.abs(relativeXPosition - currentSize) > previousDist && relativeIndex > 0) {
          relativeIndex--;
        }
        globalIndex += relativeIndex;
        if (!this._isTextHighlightOn) {
          this._cursorInfo.globalStartIndex = globalIndex;
          this._cursorInfo.relativeStartIndex = relativeIndex;
          this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
          this._cursorInfo.relativeEndIndex = this._cursorInfo.relativeStartIndex;
        } else {
          if (globalIndex < this._highlightCursorInfo.initialStartIndex) {
            this._cursorInfo.globalStartIndex = globalIndex;
            this._cursorInfo.relativeStartIndex = relativeIndex;
            this._cursorInfo.globalEndIndex = this._highlightCursorInfo.initialStartIndex;
            this._cursorInfo.relativeEndIndex = this._highlightCursorInfo.initialRelativeStartIndex;
          } else {
            this._cursorInfo.globalStartIndex = this._highlightCursorInfo.initialStartIndex;
            this._cursorInfo.relativeStartIndex = this._highlightCursorInfo.initialRelativeStartIndex;
            this._cursorInfo.globalEndIndex = globalIndex;
            this._cursorInfo.relativeEndIndex = relativeIndex;
          }
        }
        this._blinkIsEven = this._isTextHighlightOn;
        this._clickedCoordinateX = null;
        this._clickedCoordinateY = null;
      } else {
        this._cursorInfo.relativeStartIndex = 0;
        this._cursorInfo.currentLineIndex = 0;
        let lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
        let tmpLength = 0;
        while (tmpLength + lineLength <= this._cursorInfo.globalStartIndex) {
          tmpLength += lineLength;
          if (this._cursorInfo.currentLineIndex < this._lines.length - 1) {
            this._cursorInfo.currentLineIndex++;
            lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
          }
        }
        this._cursorInfo.relativeStartIndex = this._cursorInfo.globalStartIndex - tmpLength;
        if (this._highlightCursorInfo.initialStartIndex !== -1 && this._cursorInfo.globalStartIndex >= this._highlightCursorInfo.initialStartIndex) {
          while (tmpLength + lineLength <= this._cursorInfo.globalEndIndex) {
            tmpLength += lineLength;
            if (this._cursorInfo.currentLineIndex < this._lines.length - 1) {
              this._cursorInfo.currentLineIndex++;
              lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
            }
          }
          this._cursorInfo.relativeEndIndex = this._cursorInfo.globalEndIndex - tmpLength;
        } else if (!this._isTextHighlightOn) {
          this._cursorInfo.relativeEndIndex = this._cursorInfo.relativeStartIndex;
          this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
        }
      }
    }
  }
  /**
   * Update all values of cursor information based on cursorIndex value
   *
   * @param offset The index to take care of
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateValueFromCursorIndex(offset) {
  }
  /**
   * Select the word immediatly under the cursor on double click
   *
   * @param _evt Pointer informations of double click
   * @internal
   */
  _processDblClick(_evt) {
    let moveLeft, moveRight;
    do {
      moveLeft = this._cursorInfo.globalStartIndex > 0 && this._textWrapper.isWord(this._cursorInfo.globalStartIndex - 1) ? --this._cursorInfo.globalStartIndex : 0;
      moveRight = this._cursorInfo.globalEndIndex < this._textWrapper.length && this._textWrapper.isWord(this._cursorInfo.globalEndIndex) ? ++this._cursorInfo.globalEndIndex : 0;
    } while (moveLeft || moveRight);
    this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
    this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
    this.onTextHighlightObservable.notifyObservers(this);
    this._isTextHighlightOn = true;
    this._blinkIsEven = true;
    this._markAsDirty();
  }
  /** @internal */
  _selectAllText() {
    this._isTextHighlightOn = true;
    this._blinkIsEven = true;
    this._highlightCursorInfo = {
      initialStartIndex: 0,
      initialRelativeStartIndex: 0,
      initialLineIndex: 0
    };
    this._cursorInfo = {
      globalStartIndex: 0,
      globalEndIndex: this._textWrapper.length,
      relativeEndIndex: this._lines[this._lines.length - 1].text.length,
      relativeStartIndex: 0,
      currentLineIndex: this._lines.length - 1
    };
    this._markAsDirty();
  }
  dispose() {
    super.dispose();
    this.onLinesReadyObservable.clear();
  }
};
__decorate([
  serialize()
], InputTextArea.prototype, "autoStretchHeight", null);
__decorate([
  serialize()
], InputTextArea.prototype, "maxHeight", null);
RegisterClass("BABYLON.GUI.InputTextArea", InputTextArea);

// node_modules/@babylonjs/gui/2D/controls/inputPassword.js
var InputPassword = class extends InputText {
  _getTypeName() {
    return "InputPassword";
  }
  _beforeRenderText(textWrapper) {
    const pwdTextWrapper = new TextWrapper();
    let txt = "";
    for (let i = 0; i < textWrapper.length; i++) {
      txt += "•";
    }
    pwdTextWrapper.text = txt;
    return pwdTextWrapper;
  }
};
RegisterClass("BABYLON.GUI.InputPassword", InputPassword);

// node_modules/@babylonjs/gui/2D/controls/line.js
var Line = class extends Control {
  /** Gets or sets the dash pattern */
  get dash() {
    return this._dash;
  }
  set dash(value) {
    if (this._dash === value) {
      return;
    }
    this._dash = value;
    this._markAsDirty();
  }
  /** Gets or sets the control connected with the line end */
  get connectedControl() {
    return this._connectedControl;
  }
  set connectedControl(value) {
    if (this._connectedControl === value) {
      return;
    }
    if (this._connectedControlDirtyObserver && this._connectedControl) {
      this._connectedControl.onDirtyObservable.remove(this._connectedControlDirtyObserver);
      this._connectedControlDirtyObserver = null;
    }
    if (value) {
      this._connectedControlDirtyObserver = value.onDirtyObservable.add(() => this._markAsDirty());
    }
    this._connectedControl = value;
    this._markAsDirty();
  }
  /** Gets or sets start coordinates on X axis */
  get x1() {
    return this._x1.toString(this._host);
  }
  set x1(value) {
    if (this._x1.toString(this._host) === value) {
      return;
    }
    if (this._x1.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets start coordinates on Y axis */
  get y1() {
    return this._y1.toString(this._host);
  }
  set y1(value) {
    if (this._y1.toString(this._host) === value) {
      return;
    }
    if (this._y1.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets end coordinates on X axis */
  get x2() {
    return this._x2.toString(this._host);
  }
  set x2(value) {
    if (this._x2.toString(this._host) === value) {
      return;
    }
    if (this._x2.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets end coordinates on Y axis */
  get y2() {
    return this._y2.toString(this._host);
  }
  set y2(value) {
    if (this._y2.toString(this._host) === value) {
      return;
    }
    if (this._y2.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets line width */
  get lineWidth() {
    return this._lineWidth;
  }
  set lineWidth(value) {
    if (this._lineWidth === value) {
      return;
    }
    this._lineWidth = value;
    this._markAsDirty();
  }
  /** Gets or sets horizontal alignment */
  set horizontalAlignment(value) {
    return;
  }
  /** Gets or sets vertical alignment */
  set verticalAlignment(value) {
    return;
  }
  /** @internal */
  get _effectiveX2() {
    return (this._connectedControl ? this._connectedControl.centerX : 0) + this._x2.getValue(this._host);
  }
  /** @internal */
  get _effectiveY2() {
    return (this._connectedControl ? this._connectedControl.centerY : 0) + this._y2.getValue(this._host);
  }
  /**
   * Creates a new Line
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._lineWidth = 1;
    this._x1 = new ValueAndUnit(0);
    this._y1 = new ValueAndUnit(0);
    this._x2 = new ValueAndUnit(0);
    this._y2 = new ValueAndUnit(0);
    this._dash = new Array();
    this._automaticSize = true;
    this.isHitTestVisible = false;
    this._horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  }
  _getTypeName() {
    return "Line";
  }
  _draw(context) {
    context.save();
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    this._applyStates(context);
    context.strokeStyle = this._getColor(context);
    context.lineWidth = this._lineWidth;
    context.setLineDash(this._dash);
    context.beginPath();
    context.moveTo(this._cachedParentMeasure.left + this._x1.getValue(this._host), this._cachedParentMeasure.top + this._y1.getValue(this._host));
    context.lineTo(this._cachedParentMeasure.left + this._effectiveX2, this._cachedParentMeasure.top + this._effectiveY2);
    context.stroke();
    context.restore();
  }
  _measure() {
    this._currentMeasure.width = Math.abs(this._x1.getValue(this._host) - this._effectiveX2) + this._lineWidth;
    this._currentMeasure.height = Math.abs(this._y1.getValue(this._host) - this._effectiveY2) + this._lineWidth;
  }
  _computeAlignment(parentMeasure) {
    this._currentMeasure.left = parentMeasure.left + Math.min(this._x1.getValue(this._host), this._effectiveX2) - this._lineWidth / 2;
    this._currentMeasure.top = parentMeasure.top + Math.min(this._y1.getValue(this._host), this._effectiveY2) - this._lineWidth / 2;
  }
  /**
   * Move one end of the line given 3D cartesian coordinates.
   * @param position Targeted world position
   * @param scene Scene
   * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
   */
  moveToVector3(position, scene, end = false) {
    if (!this._host || this.parent !== this._host._rootContainer) {
      Tools.Error("Cannot move a control to a vector3 if the control is not at root level");
      return;
    }
    const globalViewport = this._host._getGlobalViewport();
    const projectedPosition = Vector3.Project(position, Matrix.IdentityReadOnly, scene.getTransformMatrix(), globalViewport);
    this._moveToProjectedPosition(projectedPosition, end);
    if (projectedPosition.z < 0 || projectedPosition.z > 1) {
      this.notRenderable = true;
      return;
    }
    this.notRenderable = false;
  }
  /**
   * Move one end of the line to a position in screen absolute space.
   * @param projectedPosition Position in screen absolute space (X, Y)
   * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
   */
  _moveToProjectedPosition(projectedPosition, end = false) {
    const x = projectedPosition.x + this._linkOffsetX.getValue(this._host) + "px";
    const y = projectedPosition.y + this._linkOffsetY.getValue(this._host) + "px";
    if (end) {
      this.x2 = x;
      this.y2 = y;
      this._x2.ignoreAdaptiveScaling = true;
      this._y2.ignoreAdaptiveScaling = true;
    } else {
      this.x1 = x;
      this.y1 = y;
      this._x1.ignoreAdaptiveScaling = true;
      this._y1.ignoreAdaptiveScaling = true;
    }
  }
};
__decorate([
  serialize()
], Line.prototype, "dash", null);
__decorate([
  serialize()
], Line.prototype, "x1", null);
__decorate([
  serialize()
], Line.prototype, "y1", null);
__decorate([
  serialize()
], Line.prototype, "x2", null);
__decorate([
  serialize()
], Line.prototype, "y2", null);
__decorate([
  serialize()
], Line.prototype, "lineWidth", null);
RegisterClass("BABYLON.GUI.Line", Line);

// node_modules/@babylonjs/gui/2D/multiLinePoint.js
var MultiLinePoint = class {
  /**
   * Creates a new MultiLinePoint
   * @param multiLine defines the source MultiLine object
   */
  constructor(multiLine) {
    this._multiLine = multiLine;
    this._x = new ValueAndUnit(0);
    this._y = new ValueAndUnit(0);
    this._point = new Vector3(0, 0, 0);
  }
  /** Gets or sets x coordinate */
  get x() {
    return this._x.toString(this._multiLine._host);
  }
  set x(value) {
    if (this._x.toString(this._multiLine._host) === value) {
      return;
    }
    if (this._x.fromString(value)) {
      this._multiLine._markAsDirty();
    }
  }
  /** Gets or sets y coordinate */
  get y() {
    return this._y.toString(this._multiLine._host);
  }
  set y(value) {
    if (this._y.toString(this._multiLine._host) === value) {
      return;
    }
    if (this._y.fromString(value)) {
      this._multiLine._markAsDirty();
    }
  }
  /** Gets or sets the control associated with this point */
  get control() {
    return this._control;
  }
  set control(value) {
    if (this._control === value) {
      return;
    }
    if (this._control && this._controlObserver) {
      this._control.onDirtyObservable.remove(this._controlObserver);
      this._controlObserver = null;
    }
    this._control = value;
    if (this._control) {
      this._controlObserver = this._control.onDirtyObservable.add(this._multiLine.onPointUpdate);
    }
    this._multiLine._markAsDirty();
  }
  /** Gets or sets the mesh associated with this point */
  get mesh() {
    return this._mesh;
  }
  set mesh(value) {
    if (this._mesh === value) {
      return;
    }
    if (this._mesh && this._meshObserver) {
      this._mesh.getScene().onAfterCameraRenderObservable.remove(this._meshObserver);
    }
    this._mesh = value;
    if (this._mesh) {
      this._meshObserver = this._mesh.getScene().onAfterCameraRenderObservable.add(this._multiLine.onPointUpdate);
    }
    this._multiLine._markAsDirty();
  }
  /** Resets links */
  resetLinks() {
    this.control = null;
    this.mesh = null;
  }
  /**
   * Gets a translation vector with Z component
   * @returns the translation vector
   */
  translate() {
    this._point = this._translatePoint();
    return this._point;
  }
  _translatePoint() {
    if (this._mesh != null) {
      return this._multiLine._host.getProjectedPositionWithZ(this._mesh.getBoundingInfo().boundingSphere.center, this._mesh.getWorldMatrix());
    } else if (this._control != null) {
      return new Vector3(this._control.centerX, this._control.centerY, 1 - Epsilon);
    } else {
      const host = this._multiLine._host;
      const xValue = this._x.getValueInPixel(host, Number(host._canvas.width));
      const yValue = this._y.getValueInPixel(host, Number(host._canvas.height));
      return new Vector3(xValue, yValue, 1 - Epsilon);
    }
  }
  /** Release associated resources */
  dispose() {
    this.resetLinks();
  }
};

// node_modules/@babylonjs/gui/2D/controls/multiLine.js
var MultiLine = class extends Control {
  /**
   * Creates a new MultiLine
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._lineWidth = 1;
    this.onPointUpdate = () => {
      this._markAsDirty();
    };
    this._automaticSize = true;
    this.isHitTestVisible = false;
    this._horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this._dash = [];
    this._points = [];
  }
  /** Gets or sets dash pattern */
  get dash() {
    return this._dash;
  }
  set dash(value) {
    if (this._dash === value) {
      return;
    }
    this._dash = value;
    this._markAsDirty();
  }
  /**
   * Gets point stored at specified index
   * @param index defines the index to look for
   * @returns the requested point if found
   */
  getAt(index) {
    if (!this._points[index]) {
      this._points[index] = new MultiLinePoint(this);
    }
    return this._points[index];
  }
  /**
   * Adds new points to the point collection
   * @param items defines the list of items (mesh, control or 2d coordinates) to add
   * @returns the list of created MultiLinePoint
   */
  add(...items) {
    return items.map((item) => this.push(item));
  }
  /**
   * Adds a new point to the point collection
   * @param item defines the item (mesh, control or 2d coordinates) to add
   * @returns the created MultiLinePoint
   */
  push(item) {
    const point = this.getAt(this._points.length);
    if (item == null) {
      return point;
    }
    if (item instanceof AbstractMesh) {
      point.mesh = item;
    } else if (item instanceof Control) {
      point.control = item;
    } else if (item.x != null && item.y != null) {
      point.x = item.x;
      point.y = item.y;
    }
    return point;
  }
  /**
   * Remove a specific value or point from the active point collection
   * @param value defines the value or point to remove
   */
  remove(value) {
    let index;
    if (value instanceof MultiLinePoint) {
      index = this._points.indexOf(value);
      if (index === -1) {
        return;
      }
    } else {
      index = value;
    }
    const point = this._points[index];
    if (!point) {
      return;
    }
    point.dispose();
    this._points.splice(index, 1);
  }
  /**
   * Resets this object to initial state (no point)
   */
  reset() {
    while (this._points.length > 0) {
      this.remove(this._points.length - 1);
    }
  }
  /**
   * Resets all links
   */
  resetLinks() {
    this._points.forEach((point) => {
      if (point != null) {
        point.resetLinks();
      }
    });
  }
  /** Gets or sets line width */
  get lineWidth() {
    return this._lineWidth;
  }
  set lineWidth(value) {
    if (this._lineWidth === value) {
      return;
    }
    this._lineWidth = value;
    this._markAsDirty();
  }
  set horizontalAlignment(value) {
    return;
  }
  set verticalAlignment(value) {
    return;
  }
  _getTypeName() {
    return "MultiLine";
  }
  _draw(context) {
    context.save();
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    this._applyStates(context);
    context.strokeStyle = this.color;
    context.lineWidth = this._lineWidth;
    context.setLineDash(this._dash);
    context.beginPath();
    let first = true;
    let previousPoint;
    this._points.forEach((point) => {
      if (!point) {
        return;
      }
      if (first) {
        context.moveTo(point._point.x, point._point.y);
        first = false;
      } else {
        if (point._point.z < 1 && previousPoint.z < 1) {
          context.lineTo(point._point.x, point._point.y);
        } else {
          context.moveTo(point._point.x, point._point.y);
        }
      }
      previousPoint = point._point;
    });
    context.stroke();
    context.restore();
  }
  _additionalProcessing() {
    this._minX = null;
    this._minY = null;
    this._maxX = null;
    this._maxY = null;
    this._points.forEach((point) => {
      if (!point) {
        return;
      }
      point.translate();
      if (this._minX == null || point._point.x < this._minX) {
        this._minX = point._point.x;
      }
      if (this._minY == null || point._point.y < this._minY) {
        this._minY = point._point.y;
      }
      if (this._maxX == null || point._point.x > this._maxX) {
        this._maxX = point._point.x;
      }
      if (this._maxY == null || point._point.y > this._maxY) {
        this._maxY = point._point.y;
      }
    });
    if (this._minX == null) {
      this._minX = 0;
    }
    if (this._minY == null) {
      this._minY = 0;
    }
    if (this._maxX == null) {
      this._maxX = 0;
    }
    if (this._maxY == null) {
      this._maxY = 0;
    }
  }
  _measure() {
    if (this._minX == null || this._maxX == null || this._minY == null || this._maxY == null) {
      return;
    }
    this._currentMeasure.width = Math.abs(this._maxX - this._minX) + this._lineWidth;
    this._currentMeasure.height = Math.abs(this._maxY - this._minY) + this._lineWidth;
  }
  _computeAlignment() {
    if (this._minX == null || this._minY == null) {
      return;
    }
    this._currentMeasure.left = this._minX - this._lineWidth / 2;
    this._currentMeasure.top = this._minY - this._lineWidth / 2;
  }
  dispose() {
    this.reset();
    super.dispose();
  }
};
__decorate([
  serialize()
], MultiLine.prototype, "dash", null);
RegisterClass("BABYLON.GUI.MultiLine", MultiLine);

// node_modules/@babylonjs/gui/2D/controls/radioButton.js
var RadioButton = class _RadioButton extends Control {
  /** Gets or sets border thickness */
  get thickness() {
    return this._thickness;
  }
  set thickness(value) {
    if (this._thickness === value) {
      return;
    }
    this._thickness = value;
    this._markAsDirty();
  }
  /** Gets or sets a value indicating the ratio between overall size and check size */
  get checkSizeRatio() {
    return this._checkSizeRatio;
  }
  set checkSizeRatio(value) {
    value = Math.max(Math.min(1, value), 0);
    if (this._checkSizeRatio === value) {
      return;
    }
    this._checkSizeRatio = value;
    this._markAsDirty();
  }
  /** Gets or sets background color */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating if the checkbox is checked or not */
  get isChecked() {
    return this._isChecked;
  }
  set isChecked(value) {
    if (this._isChecked === value) {
      return;
    }
    this._isChecked = value;
    this._markAsDirty();
    this.onIsCheckedChangedObservable.notifyObservers(value);
    if (this._isChecked && this._host) {
      this._host.executeOnAllControls((control) => {
        if (control === this) {
          return;
        }
        if (control.group === void 0) {
          return;
        }
        const childRadio = control;
        if (childRadio.group === this.group) {
          childRadio.isChecked = false;
        }
      });
    }
  }
  /**
   * Creates a new RadioButton
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._isChecked = false;
    this._background = "black";
    this._checkSizeRatio = 0.8;
    this._thickness = 1;
    this.group = "";
    this.onIsCheckedChangedObservable = new Observable();
    this.isPointerBlocker = true;
  }
  _getTypeName() {
    return "RadioButton";
  }
  _draw(context) {
    context.save();
    this._applyStates(context);
    const actualWidth = this._currentMeasure.width - this._thickness;
    const actualHeight = this._currentMeasure.height - this._thickness;
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._thickness / 2, this._currentMeasure.height / 2 - this._thickness / 2, context);
    context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
    context.fill();
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    context.strokeStyle = this.color;
    context.lineWidth = this._thickness;
    context.stroke();
    if (this._isChecked) {
      context.fillStyle = this._isEnabled ? this.color : this._disabledColor;
      const offsetWidth = actualWidth * this._checkSizeRatio;
      const offseHeight = actualHeight * this._checkSizeRatio;
      Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, offsetWidth / 2 - this._thickness / 2, offseHeight / 2 - this._thickness / 2, context);
      context.fill();
    }
    context.restore();
  }
  // Events
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (this.isReadOnly) {
      return true;
    }
    if (!this.isChecked) {
      this.isChecked = true;
    }
    return true;
  }
  /**
   * Utility function to easily create a radio button with a header
   * @param title defines the label to use for the header
   * @param group defines the group to use for the radio button
   * @param isChecked defines the initial state of the radio button
   * @param onValueChanged defines the callback to call when value changes
   * @returns a StackPanel containing the radio button and a textBlock
   */
  static AddRadioButtonWithHeader(title, group, isChecked, onValueChanged) {
    const panel = new StackPanel();
    panel.isVertical = false;
    panel.height = "30px";
    const radio = new _RadioButton();
    radio.width = "20px";
    radio.height = "20px";
    radio.isChecked = isChecked;
    radio.color = "green";
    radio.group = group;
    radio.onIsCheckedChangedObservable.add((value) => onValueChanged(radio, value));
    panel.addControl(radio);
    const header = new TextBlock();
    header.text = title;
    header.width = "180px";
    header.paddingLeft = "5px";
    header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.color = "white";
    panel.addControl(header);
    return panel;
  }
};
__decorate([
  serialize()
], RadioButton.prototype, "thickness", null);
__decorate([
  serialize()
], RadioButton.prototype, "group", void 0);
__decorate([
  serialize()
], RadioButton.prototype, "checkSizeRatio", null);
__decorate([
  serialize()
], RadioButton.prototype, "background", null);
__decorate([
  serialize()
], RadioButton.prototype, "isChecked", null);
RegisterClass("BABYLON.GUI.RadioButton", RadioButton);

// node_modules/@babylonjs/gui/2D/controls/sliders/baseSlider.js
var BaseSlider = class extends Control {
  /** Gets or sets a boolean indicating if the thumb must be rendered */
  get displayThumb() {
    return this._displayThumb;
  }
  set displayThumb(value) {
    if (this._displayThumb === value) {
      return;
    }
    this._displayThumb = value;
    this._markAsDirty();
  }
  /** Gets or sets a step to apply to values (0 by default) */
  get step() {
    return this._step;
  }
  set step(value) {
    if (this._step === value) {
      return;
    }
    this._step = value;
    this._markAsDirty();
  }
  /** Gets or sets main bar offset (ie. the margin applied to the value bar) */
  get barOffset() {
    return this._barOffset.toString(this._host);
  }
  /** Gets main bar offset in pixels*/
  get barOffsetInPixels() {
    return this._barOffset.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set barOffset(value) {
    if (this._barOffset.toString(this._host) === value) {
      return;
    }
    if (this._barOffset.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets thumb width */
  get thumbWidth() {
    return this._thumbWidth.toString(this._host);
  }
  /** Gets thumb width in pixels */
  get thumbWidthInPixels() {
    return this._thumbWidth.getValueInPixel(this._host, this._cachedParentMeasure.width);
  }
  set thumbWidth(value) {
    if (this._thumbWidth.toString(this._host) === value) {
      return;
    }
    if (this._thumbWidth.fromString(value)) {
      this._markAsDirty();
    }
  }
  /** Gets or sets minimum value */
  get minimum() {
    return this._minimum;
  }
  set minimum(value) {
    if (this._minimum === value) {
      return;
    }
    this._minimum = value;
    this._markAsDirty();
    this.value = Math.max(Math.min(this.value, this._maximum), this._minimum);
  }
  /** Gets or sets maximum value */
  get maximum() {
    return this._maximum;
  }
  set maximum(value) {
    if (this._maximum === value) {
      return;
    }
    this._maximum = value;
    this._markAsDirty();
    this.value = Math.max(Math.min(this.value, this._maximum), this._minimum);
  }
  /** Gets or sets current value */
  get value() {
    return this._value;
  }
  set value(value) {
    value = Math.max(Math.min(value, this._maximum), this._minimum);
    if (this._value === value) {
      return;
    }
    this._value = value;
    this._markAsDirty();
    this.onValueChangedObservable.notifyObservers(this._value);
  }
  /**Gets or sets a boolean indicating if the slider should be vertical or horizontal */
  get isVertical() {
    return this._isVertical;
  }
  set isVertical(value) {
    if (this._isVertical === value) {
      return;
    }
    this._isVertical = value;
    this._markAsDirty();
  }
  /** Gets or sets a value indicating if the thumb can go over main bar extends */
  get isThumbClamped() {
    return this._isThumbClamped;
  }
  set isThumbClamped(value) {
    if (this._isThumbClamped === value) {
      return;
    }
    this._isThumbClamped = value;
    this._markAsDirty();
  }
  /**
   * Creates a new BaseSlider
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._thumbWidth = new ValueAndUnit(20, ValueAndUnit.UNITMODE_PIXEL, false);
    this._minimum = 0;
    this._maximum = 100;
    this._value = 50;
    this._isVertical = false;
    this._barOffset = new ValueAndUnit(5, ValueAndUnit.UNITMODE_PIXEL, false);
    this._isThumbClamped = false;
    this._displayThumb = true;
    this._step = 0;
    this._lastPointerDownId = -1;
    this._effectiveBarOffset = 0;
    this.onValueChangedObservable = new Observable();
    this._pointerIsDown = false;
    this.isPointerBlocker = true;
  }
  _getTypeName() {
    return "BaseSlider";
  }
  _getThumbPosition() {
    if (this.isVertical) {
      return (this.maximum - this.value) / (this.maximum - this.minimum) * this._backgroundBoxLength;
    }
    return (this.value - this.minimum) / (this.maximum - this.minimum) * this._backgroundBoxLength;
  }
  _getThumbThickness(type) {
    let thumbThickness = 0;
    switch (type) {
      case "circle":
        if (this._thumbWidth.isPixel) {
          thumbThickness = Math.max(this._thumbWidth.getValue(this._host), this._backgroundBoxThickness);
        } else {
          thumbThickness = this._backgroundBoxThickness * this._thumbWidth.getValue(this._host);
        }
        break;
      case "rectangle":
        if (this._thumbWidth.isPixel) {
          thumbThickness = Math.min(this._thumbWidth.getValue(this._host), this._backgroundBoxThickness);
        } else {
          thumbThickness = this._backgroundBoxThickness * this._thumbWidth.getValue(this._host);
        }
    }
    return thumbThickness;
  }
  _prepareRenderingData(type) {
    this._effectiveBarOffset = 0;
    this._renderLeft = this._currentMeasure.left;
    this._renderTop = this._currentMeasure.top;
    this._renderWidth = this._currentMeasure.width;
    this._renderHeight = this._currentMeasure.height;
    this._backgroundBoxLength = Math.max(this._currentMeasure.width, this._currentMeasure.height);
    this._backgroundBoxThickness = Math.min(this._currentMeasure.width, this._currentMeasure.height);
    this._effectiveThumbThickness = this._getThumbThickness(type);
    if (this.displayThumb) {
      this._backgroundBoxLength -= this._effectiveThumbThickness;
    }
    if (this.isVertical && this._currentMeasure.height < this._currentMeasure.width) {
      Logger.Error("Height should be greater than width");
      return;
    }
    if (this._barOffset.isPixel) {
      this._effectiveBarOffset = Math.min(this._barOffset.getValue(this._host), this._backgroundBoxThickness);
    } else {
      this._effectiveBarOffset = this._backgroundBoxThickness * this._barOffset.getValue(this._host);
    }
    this._backgroundBoxThickness -= this._effectiveBarOffset * 2;
    if (this.isVertical) {
      this._renderLeft += this._effectiveBarOffset;
      if (!this.isThumbClamped && this.displayThumb) {
        this._renderTop += this._effectiveThumbThickness / 2;
      }
      this._renderHeight = this._backgroundBoxLength;
      this._renderWidth = this._backgroundBoxThickness;
    } else {
      this._renderTop += this._effectiveBarOffset;
      if (!this.isThumbClamped && this.displayThumb) {
        this._renderLeft += this._effectiveThumbThickness / 2;
      }
      this._renderHeight = this._backgroundBoxThickness;
      this._renderWidth = this._backgroundBoxLength;
    }
  }
  /**
   * @internal
   */
  _updateValueFromPointer(x, y) {
    if (this.rotation != 0) {
      this._invertTransformMatrix.transformCoordinates(x, y, this._transformedPosition);
      x = this._transformedPosition.x;
      y = this._transformedPosition.y;
    }
    let value;
    if (this._isVertical) {
      value = this._minimum + (1 - (y - this._currentMeasure.top) / this._currentMeasure.height) * (this._maximum - this._minimum);
    } else {
      value = this._minimum + (x - this._currentMeasure.left) / this._currentMeasure.width * (this._maximum - this._minimum);
    }
    this.value = this._step ? Math.round(value / this._step) * this._step : value;
  }
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (this.isReadOnly) {
      return true;
    }
    this._pointerIsDown = true;
    this._updateValueFromPointer(coordinates.x, coordinates.y);
    this._host._capturingControl[pointerId] = this;
    this._lastPointerDownId = pointerId;
    return true;
  }
  _onPointerMove(target, coordinates, pointerId, pi) {
    if (pointerId != this._lastPointerDownId) {
      return;
    }
    if (this._pointerIsDown && !this.isReadOnly) {
      this._updateValueFromPointer(coordinates.x, coordinates.y);
    }
    super._onPointerMove(target, coordinates, pointerId, pi);
  }
  _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick) {
    this._pointerIsDown = false;
    delete this._host._capturingControl[pointerId];
    super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick);
  }
  _onCanvasBlur() {
    this._forcePointerUp();
    super._onCanvasBlur();
  }
};
__decorate([
  serialize()
], BaseSlider.prototype, "displayThumb", null);
__decorate([
  serialize()
], BaseSlider.prototype, "step", null);
__decorate([
  serialize()
], BaseSlider.prototype, "barOffset", null);
__decorate([
  serialize()
], BaseSlider.prototype, "thumbWidth", null);
__decorate([
  serialize()
], BaseSlider.prototype, "minimum", null);
__decorate([
  serialize()
], BaseSlider.prototype, "maximum", null);
__decorate([
  serialize()
], BaseSlider.prototype, "value", null);
__decorate([
  serialize()
], BaseSlider.prototype, "isVertical", null);
__decorate([
  serialize()
], BaseSlider.prototype, "isThumbClamped", null);

// node_modules/@babylonjs/gui/2D/controls/sliders/slider.js
var Slider = class extends BaseSlider {
  /** Gets or sets a boolean indicating if the value bar must be rendered */
  get displayValueBar() {
    return this._displayValueBar;
  }
  set displayValueBar(value) {
    if (this._displayValueBar === value) {
      return;
    }
    this._displayValueBar = value;
    this._markAsDirty();
  }
  /** Gets or sets border color */
  get borderColor() {
    return this._borderColor;
  }
  set borderColor(value) {
    if (this._borderColor === value) {
      return;
    }
    this._borderColor = value;
    this._markAsDirty();
  }
  /** Gets or sets background color */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this._markAsDirty();
  }
  /** Gets or sets background gradient */
  get backgroundGradient() {
    return this._backgroundGradient;
  }
  set backgroundGradient(value) {
    if (this._backgroundGradient === value) {
      return;
    }
    this._backgroundGradient = value;
    this._markAsDirty();
  }
  /** Gets or sets thumb's color */
  get thumbColor() {
    return this._thumbColor;
  }
  set thumbColor(value) {
    if (this._thumbColor === value) {
      return;
    }
    this._thumbColor = value;
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating if the thumb should be round or square */
  get isThumbCircle() {
    return this._isThumbCircle;
  }
  set isThumbCircle(value) {
    if (this._isThumbCircle === value) {
      return;
    }
    this._isThumbCircle = value;
    this._markAsDirty();
  }
  /**
   * Creates a new Slider
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._background = "black";
    this._borderColor = "white";
    this._thumbColor = "";
    this._isThumbCircle = false;
    this._displayValueBar = true;
    this._backgroundGradient = null;
  }
  _getTypeName() {
    return "Slider";
  }
  _getBackgroundColor(context) {
    return this._backgroundGradient ? this._backgroundGradient.getCanvasGradient(context) : this._background;
  }
  _draw(context) {
    context.save();
    this._applyStates(context);
    this._prepareRenderingData(this.isThumbCircle ? "circle" : "rectangle");
    let left = this._renderLeft;
    let top = this._renderTop;
    const width = this._renderWidth;
    const height = this._renderHeight;
    let radius = 0;
    if (this.isThumbClamped && this.isThumbCircle) {
      if (this.isVertical) {
        top += this._effectiveThumbThickness / 2;
      } else {
        left += this._effectiveThumbThickness / 2;
      }
      radius = this._backgroundBoxThickness / 2;
    } else {
      radius = (this._effectiveThumbThickness - this._effectiveBarOffset) / 2;
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    const thumbPosition = this._getThumbPosition();
    context.fillStyle = this._getBackgroundColor(context);
    if (this.isVertical) {
      if (this.isThumbClamped) {
        if (this.isThumbCircle) {
          context.beginPath();
          context.arc(left + this._backgroundBoxThickness / 2, top, radius, Math.PI, 2 * Math.PI);
          context.fill();
          context.fillRect(left, top, width, height);
        } else {
          context.fillRect(left, top, width, height + this._effectiveThumbThickness);
        }
      } else {
        context.fillRect(left, top, width, height);
      }
    } else {
      if (this.isThumbClamped) {
        if (this.isThumbCircle) {
          context.beginPath();
          context.arc(left + this._backgroundBoxLength, top + this._backgroundBoxThickness / 2, radius, 0, 2 * Math.PI);
          context.fill();
          context.fillRect(left, top, width, height);
        } else {
          context.fillRect(left, top, width + this._effectiveThumbThickness, height);
        }
      } else {
        context.fillRect(left, top, width, height);
      }
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    context.fillStyle = this._getColor(context);
    if (this._displayValueBar) {
      if (this.isVertical) {
        if (this.isThumbClamped) {
          if (this.isThumbCircle) {
            context.beginPath();
            context.arc(left + this._backgroundBoxThickness / 2, top + this._backgroundBoxLength, radius, 0, 2 * Math.PI);
            context.fill();
            context.fillRect(left, top + thumbPosition, width, height - thumbPosition);
          } else {
            context.fillRect(left, top + thumbPosition, width, height - thumbPosition + this._effectiveThumbThickness);
          }
        } else {
          context.fillRect(left, top + thumbPosition, width, height - thumbPosition);
        }
      } else {
        if (this.isThumbClamped) {
          if (this.isThumbCircle) {
            context.beginPath();
            context.arc(left, top + this._backgroundBoxThickness / 2, radius, 0, 2 * Math.PI);
            context.fill();
            context.fillRect(left, top, thumbPosition, height);
          } else {
            context.fillRect(left, top, thumbPosition, height);
          }
        } else {
          context.fillRect(left, top, thumbPosition, height);
        }
      }
    }
    context.fillStyle = this._thumbColor || this._getColor(context);
    if (this.displayThumb) {
      if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
        context.shadowColor = this.shadowColor;
        context.shadowBlur = this.shadowBlur;
        context.shadowOffsetX = this.shadowOffsetX;
        context.shadowOffsetY = this.shadowOffsetY;
      }
      if (this._isThumbCircle) {
        context.beginPath();
        if (this.isVertical) {
          context.arc(left + this._backgroundBoxThickness / 2, top + thumbPosition, radius, 0, 2 * Math.PI);
        } else {
          context.arc(left + thumbPosition, top + this._backgroundBoxThickness / 2, radius, 0, 2 * Math.PI);
        }
        context.fill();
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
          context.shadowBlur = 0;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
        }
        context.strokeStyle = this._borderColor;
        context.stroke();
      } else {
        if (this.isVertical) {
          context.fillRect(left - this._effectiveBarOffset, this._currentMeasure.top + thumbPosition, this._currentMeasure.width, this._effectiveThumbThickness);
        } else {
          context.fillRect(this._currentMeasure.left + thumbPosition, this._currentMeasure.top, this._effectiveThumbThickness, this._currentMeasure.height);
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
          context.shadowBlur = 0;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
        }
        context.strokeStyle = this._borderColor;
        if (this.isVertical) {
          context.strokeRect(left - this._effectiveBarOffset, this._currentMeasure.top + thumbPosition, this._currentMeasure.width, this._effectiveThumbThickness);
        } else {
          context.strokeRect(this._currentMeasure.left + thumbPosition, this._currentMeasure.top, this._effectiveThumbThickness, this._currentMeasure.height);
        }
      }
    }
    context.restore();
  }
  serialize(serializationObject) {
    super.serialize(serializationObject);
    if (this.backgroundGradient) {
      serializationObject.backgroundGradient = {};
      this.backgroundGradient.serialize(serializationObject.backgroundGradient);
    }
  }
  /** @internal */
  _parseFromContent(serializedObject, host) {
    super._parseFromContent(serializedObject, host);
    if (serializedObject.backgroundGradient) {
      const className = Tools.Instantiate("BABYLON.GUI." + serializedObject.backgroundGradient.className);
      this.backgroundGradient = new className();
      this.backgroundGradient.parse(serializedObject.backgroundGradient);
    }
  }
};
__decorate([
  serialize()
], Slider.prototype, "displayValueBar", null);
__decorate([
  serialize()
], Slider.prototype, "borderColor", null);
__decorate([
  serialize()
], Slider.prototype, "background", null);
__decorate([
  serialize()
], Slider.prototype, "thumbColor", null);
__decorate([
  serialize()
], Slider.prototype, "isThumbCircle", null);
RegisterClass("BABYLON.GUI.Slider", Slider);

// node_modules/@babylonjs/gui/2D/controls/selector.js
var SelectorGroup = class {
  /**
   * Creates a new SelectorGroup
   * @param name of group, used as a group heading
   */
  constructor(name22) {
    this.name = name22;
    this._groupPanel = new StackPanel();
    this._selectors = new Array();
    this._groupPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this._groupPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._groupHeader = this._addGroupHeader(name22);
  }
  /** Gets the groupPanel of the SelectorGroup  */
  get groupPanel() {
    return this._groupPanel;
  }
  /** Gets the selectors array */
  get selectors() {
    return this._selectors;
  }
  /** Gets and sets the group header */
  get header() {
    return this._groupHeader.text;
  }
  set header(label) {
    if (this._groupHeader.text === "label") {
      return;
    }
    this._groupHeader.text = label;
  }
  /**
   * @internal
   */
  _addGroupHeader(text) {
    const groupHeading = new TextBlock("groupHead", text);
    groupHeading.width = 0.9;
    groupHeading.height = "30px";
    groupHeading.textWrapping = true;
    groupHeading.color = "black";
    groupHeading.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    groupHeading.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    groupHeading.left = "2px";
    this._groupPanel.addControl(groupHeading);
    return groupHeading;
  }
  /**
   * @internal
   */
  _getSelector(selectorNb) {
    if (selectorNb < 0 || selectorNb >= this._selectors.length) {
      return;
    }
    return this._selectors[selectorNb];
  }
  /** Removes the selector at the given position
   * @param selectorNb the position of the selector within the group
   */
  removeSelector(selectorNb) {
    if (selectorNb < 0 || selectorNb >= this._selectors.length) {
      return;
    }
    this._groupPanel.removeControl(this._selectors[selectorNb]);
    this._selectors.splice(selectorNb, 1);
  }
};
var CheckboxGroup = class extends SelectorGroup {
  /** Adds a checkbox as a control
   * @param text is the label for the selector
   * @param func is the function called when the Selector is checked
   * @param checked is true when Selector is checked
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addCheckbox(text, func = (s) => {
  }, checked = false) {
    checked = checked || false;
    const button = new Checkbox();
    button.width = "20px";
    button.height = "20px";
    button.color = "#364249";
    button.background = "#CCCCCC";
    button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.onIsCheckedChangedObservable.add(function(state) {
      func(state);
    });
    const _selector = Control.AddHeader(button, text, "200px", { isHorizontal: true, controlFirst: true });
    _selector.height = "30px";
    _selector.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    _selector.left = "4px";
    this.groupPanel.addControl(_selector);
    this.selectors.push(_selector);
    button.isChecked = checked;
    if (this.groupPanel.parent && this.groupPanel.parent.parent) {
      button.color = this.groupPanel.parent.parent.buttonColor;
      button.background = this.groupPanel.parent.parent.buttonBackground;
    }
  }
  /**
   * @internal
   */
  _setSelectorLabel(selectorNb, label) {
    this.selectors[selectorNb].children[1].text = label;
  }
  /**
   * @internal
   */
  _setSelectorLabelColor(selectorNb, color) {
    this.selectors[selectorNb].children[1].color = color;
  }
  /**
   * @internal
   */
  _setSelectorButtonColor(selectorNb, color) {
    this.selectors[selectorNb].children[0].color = color;
  }
  /**
   * @internal
   */
  _setSelectorButtonBackground(selectorNb, color) {
    this.selectors[selectorNb].children[0].background = color;
  }
};
var RadioGroup = class extends SelectorGroup {
  constructor() {
    super(...arguments);
    this._selectNb = 0;
  }
  /** Adds a radio button as a control
   * @param label is the label for the selector
   * @param func is the function called when the Selector is checked
   * @param checked is true when Selector is checked
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRadio(label, func = (n) => {
  }, checked = false) {
    const nb = this._selectNb++;
    const button = new RadioButton();
    button.name = label;
    button.width = "20px";
    button.height = "20px";
    button.color = "#364249";
    button.background = "#CCCCCC";
    button.group = this.name;
    button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.onIsCheckedChangedObservable.add(function(state) {
      if (state) {
        func(nb);
      }
    });
    const _selector = Control.AddHeader(button, label, "200px", { isHorizontal: true, controlFirst: true });
    _selector.height = "30px";
    _selector.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    _selector.left = "4px";
    this.groupPanel.addControl(_selector);
    this.selectors.push(_selector);
    button.isChecked = checked;
    if (this.groupPanel.parent && this.groupPanel.parent.parent) {
      button.color = this.groupPanel.parent.parent.buttonColor;
      button.background = this.groupPanel.parent.parent.buttonBackground;
    }
  }
  /**
   * @internal
   */
  _setSelectorLabel(selectorNb, label) {
    this.selectors[selectorNb].children[1].text = label;
  }
  /**
   * @internal
   */
  _setSelectorLabelColor(selectorNb, color) {
    this.selectors[selectorNb].children[1].color = color;
  }
  /**
   * @internal
   */
  _setSelectorButtonColor(selectorNb, color) {
    this.selectors[selectorNb].children[0].color = color;
  }
  /**
   * @internal
   */
  _setSelectorButtonBackground(selectorNb, color) {
    this.selectors[selectorNb].children[0].background = color;
  }
};
var SliderGroup = class extends SelectorGroup {
  /**
   * Adds a slider to the SelectorGroup
   * @param label is the label for the SliderBar
   * @param func is the function called when the Slider moves
   * @param unit is a string describing the units used, eg degrees or metres
   * @param min is the minimum value for the Slider
   * @param max is the maximum value for the Slider
   * @param value is the start value for the Slider between min and max
   * @param onValueChange is the function used to format the value displayed, eg radians to degrees
   */
  addSlider(label, func = (v) => {
  }, unit = "Units", min = 0, max = 0, value = 0, onValueChange = (v) => {
    return v | 0;
  }) {
    const button = new Slider();
    button.name = unit;
    button.value = value;
    button.minimum = min;
    button.maximum = max;
    button.width = 0.9;
    button.height = "20px";
    button.color = "#364249";
    button.background = "#CCCCCC";
    button.borderColor = "black";
    button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.left = "4px";
    button.paddingBottom = "4px";
    button.onValueChangedObservable.add(function(value2) {
      button.parent.children[0].text = button.parent.children[0].name + ": " + onValueChange(value2) + " " + button.name;
      func(value2);
    });
    const _selector = Control.AddHeader(button, label + ": " + onValueChange(value) + " " + unit, "30px", { isHorizontal: false, controlFirst: false });
    _selector.height = "60px";
    _selector.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    _selector.left = "4px";
    _selector.children[0].name = label;
    this.groupPanel.addControl(_selector);
    this.selectors.push(_selector);
    if (this.groupPanel.parent && this.groupPanel.parent.parent) {
      button.color = this.groupPanel.parent.parent.buttonColor;
      button.background = this.groupPanel.parent.parent.buttonBackground;
    }
  }
  /**
   * @internal
   */
  _setSelectorLabel(selectorNb, label) {
    this.selectors[selectorNb].children[0].name = label;
    this.selectors[selectorNb].children[0].text = label + ": " + this.selectors[selectorNb].children[1].value + " " + this.selectors[selectorNb].children[1].name;
  }
  /**
   * @internal
   */
  _setSelectorLabelColor(selectorNb, color) {
    this.selectors[selectorNb].children[0].color = color;
  }
  /**
   * @internal
   */
  _setSelectorButtonColor(selectorNb, color) {
    this.selectors[selectorNb].children[1].color = color;
  }
  /**
   * @internal
   */
  _setSelectorButtonBackground(selectorNb, color) {
    this.selectors[selectorNb].children[1].background = color;
  }
};
var SelectionPanel = class extends Rectangle {
  /**
   * Creates a new SelectionPanel
   * @param name of SelectionPanel
   * @param groups is an array of SelectionGroups
   */
  constructor(name22, groups = []) {
    super(name22);
    this.name = name22;
    this.groups = groups;
    this._buttonColor = "#364249";
    this._buttonBackground = "#CCCCCC";
    this._headerColor = "black";
    this._barColor = "white";
    this._barHeight = "2px";
    this._spacerHeight = "20px";
    this._bars = new Array();
    this._groups = groups;
    this.thickness = 2;
    this._panel = new StackPanel();
    this._panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this._panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._panel.top = 5;
    this._panel.left = 5;
    this._panel.width = 0.95;
    if (groups.length > 0) {
      for (let i = 0; i < groups.length - 1; i++) {
        this._panel.addControl(groups[i].groupPanel);
        this._addSpacer();
      }
      this._panel.addControl(groups[groups.length - 1].groupPanel);
    }
    this.addControl(this._panel);
  }
  _getTypeName() {
    return "SelectionPanel";
  }
  /** Gets the (stack) panel of the SelectionPanel  */
  get panel() {
    return this._panel;
  }
  /** Gets or sets the headerColor */
  get headerColor() {
    return this._headerColor;
  }
  set headerColor(color) {
    if (this._headerColor === color) {
      return;
    }
    this._headerColor = color;
    this._setHeaderColor();
  }
  _setHeaderColor() {
    for (let i = 0; i < this._groups.length; i++) {
      this._groups[i].groupPanel.children[0].color = this._headerColor;
    }
  }
  /** Gets or sets the button color */
  get buttonColor() {
    return this._buttonColor;
  }
  set buttonColor(color) {
    if (this._buttonColor === color) {
      return;
    }
    this._buttonColor = color;
    this._setbuttonColor();
  }
  _setbuttonColor() {
    for (let i = 0; i < this._groups.length; i++) {
      for (let j = 0; j < this._groups[i].selectors.length; j++) {
        this._groups[i]._setSelectorButtonColor(j, this._buttonColor);
      }
    }
  }
  /** Gets or sets the label color */
  get labelColor() {
    return this._labelColor;
  }
  set labelColor(color) {
    if (this._labelColor === color) {
      return;
    }
    this._labelColor = color;
    this._setLabelColor();
  }
  _setLabelColor() {
    for (let i = 0; i < this._groups.length; i++) {
      for (let j = 0; j < this._groups[i].selectors.length; j++) {
        this._groups[i]._setSelectorLabelColor(j, this._labelColor);
      }
    }
  }
  /** Gets or sets the button background */
  get buttonBackground() {
    return this._buttonBackground;
  }
  set buttonBackground(color) {
    if (this._buttonBackground === color) {
      return;
    }
    this._buttonBackground = color;
    this._setButtonBackground();
  }
  _setButtonBackground() {
    for (let i = 0; i < this._groups.length; i++) {
      for (let j = 0; j < this._groups[i].selectors.length; j++) {
        this._groups[i]._setSelectorButtonBackground(j, this._buttonBackground);
      }
    }
  }
  /** Gets or sets the color of separator bar */
  get barColor() {
    return this._barColor;
  }
  set barColor(color) {
    if (this._barColor === color) {
      return;
    }
    this._barColor = color;
    this._setBarColor();
  }
  _setBarColor() {
    for (let i = 0; i < this._bars.length; i++) {
      this._bars[i].children[0].background = this._barColor;
    }
  }
  /** Gets or sets the height of separator bar */
  get barHeight() {
    return this._barHeight;
  }
  set barHeight(value) {
    if (this._barHeight === value) {
      return;
    }
    this._barHeight = value;
    this._setBarHeight();
  }
  _setBarHeight() {
    for (let i = 0; i < this._bars.length; i++) {
      this._bars[i].children[0].height = this._barHeight;
    }
  }
  /** Gets or sets the height of spacers*/
  get spacerHeight() {
    return this._spacerHeight;
  }
  set spacerHeight(value) {
    if (this._spacerHeight === value) {
      return;
    }
    this._spacerHeight = value;
    this._setSpacerHeight();
  }
  _setSpacerHeight() {
    for (let i = 0; i < this._bars.length; i++) {
      this._bars[i].height = this._spacerHeight;
    }
  }
  /** Adds a bar between groups */
  _addSpacer() {
    const separator = new Container();
    separator.width = 1;
    separator.height = this._spacerHeight;
    separator.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    const bar = new Rectangle();
    bar.width = 1;
    bar.height = this._barHeight;
    bar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    bar.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    bar.background = this._barColor;
    bar.color = "transparent";
    separator.addControl(bar);
    this._panel.addControl(separator);
    this._bars.push(separator);
  }
  /** Add a group to the selection panel
   * @param group is the selector group to add
   */
  addGroup(group) {
    if (this._groups.length > 0) {
      this._addSpacer();
    }
    this._panel.addControl(group.groupPanel);
    this._groups.push(group);
    group.groupPanel.children[0].color = this._headerColor;
    for (let j = 0; j < group.selectors.length; j++) {
      group._setSelectorButtonColor(j, this._buttonColor);
      group._setSelectorButtonBackground(j, this._buttonBackground);
    }
  }
  /** Remove the group from the given position
   * @param groupNb is the position of the group in the list
   */
  removeGroup(groupNb) {
    if (groupNb < 0 || groupNb >= this._groups.length) {
      return;
    }
    const group = this._groups[groupNb];
    this._panel.removeControl(group.groupPanel);
    this._groups.splice(groupNb, 1);
    if (groupNb < this._bars.length) {
      this._panel.removeControl(this._bars[groupNb]);
      this._bars.splice(groupNb, 1);
    }
  }
  /** Change a group header label
   * @param label is the new group header label
   * @param groupNb is the number of the group to relabel
   * */
  setHeaderName(label, groupNb) {
    if (groupNb < 0 || groupNb >= this._groups.length) {
      return;
    }
    const group = this._groups[groupNb];
    group.groupPanel.children[0].text = label;
  }
  /** Change selector label to the one given
   * @param label is the new selector label
   * @param groupNb is the number of the groupcontaining the selector
   * @param selectorNb is the number of the selector within a group to relabel
   * */
  relabel(label, groupNb, selectorNb) {
    if (groupNb < 0 || groupNb >= this._groups.length) {
      return;
    }
    const group = this._groups[groupNb];
    if (selectorNb < 0 || selectorNb >= group.selectors.length) {
      return;
    }
    group._setSelectorLabel(selectorNb, label);
  }
  /** For a given group position remove the selector at the given position
   * @param groupNb is the number of the group to remove the selector from
   * @param selectorNb is the number of the selector within the group
   */
  removeFromGroupSelector(groupNb, selectorNb) {
    if (groupNb < 0 || groupNb >= this._groups.length) {
      return;
    }
    const group = this._groups[groupNb];
    if (selectorNb < 0 || selectorNb >= group.selectors.length) {
      return;
    }
    group.removeSelector(selectorNb);
  }
  /** For a given group position of correct type add a checkbox button
   * @param groupNb is the number of the group to remove the selector from
   * @param label is the label for the selector
   * @param func is the function called when the Selector is checked
   * @param checked is true when Selector is checked
   */
  addToGroupCheckbox(groupNb, label, func = () => {
  }, checked = false) {
    if (groupNb < 0 || groupNb >= this._groups.length) {
      return;
    }
    const group = this._groups[groupNb];
    group.addCheckbox(label, func, checked);
  }
  /** For a given group position of correct type add a radio button
   * @param groupNb is the number of the group to remove the selector from
   * @param label is the label for the selector
   * @param func is the function called when the Selector is checked
   * @param checked is true when Selector is checked
   */
  addToGroupRadio(groupNb, label, func = () => {
  }, checked = false) {
    if (groupNb < 0 || groupNb >= this._groups.length) {
      return;
    }
    const group = this._groups[groupNb];
    group.addRadio(label, func, checked);
  }
  /**
   * For a given slider group add a slider
   * @param groupNb is the number of the group to add the slider to
   * @param label is the label for the Slider
   * @param func is the function called when the Slider moves
   * @param unit is a string describing the units used, eg degrees or metres
   * @param min is the minimum value for the Slider
   * @param max is the maximum value for the Slider
   * @param value is the start value for the Slider between min and max
   * @param onVal is the function used to format the value displayed, eg radians to degrees
   */
  addToGroupSlider(groupNb, label, func = () => {
  }, unit = "Units", min = 0, max = 0, value = 0, onVal = (v) => {
    return v | 0;
  }) {
    if (groupNb < 0 || groupNb >= this._groups.length) {
      return;
    }
    const group = this._groups[groupNb];
    group.addSlider(label, func, unit, min, max, value, onVal);
  }
};

// node_modules/@babylonjs/gui/2D/controls/scrollViewers/scrollViewerWindow.js
var _ScrollViewerWindow = class extends Container {
  get freezeControls() {
    return this._freezeControls;
  }
  set freezeControls(value) {
    if (this._freezeControls === value) {
      return;
    }
    if (!value) {
      this._restoreMeasures();
    }
    this._freezeControls = false;
    const textureSize = this.host.getSize();
    const renderWidth = textureSize.width;
    const renderHeight = textureSize.height;
    const context = this.host.getContext();
    const measure = new Measure(0, 0, renderWidth, renderHeight);
    this.host._numLayoutCalls = 0;
    this.host._rootContainer._layout(measure, context);
    if (value) {
      this._updateMeasures();
      if (this._useBuckets()) {
        this._makeBuckets();
      }
    }
    this._freezeControls = value;
    this.host.markAsDirty();
  }
  get bucketWidth() {
    return this._bucketWidth;
  }
  get bucketHeight() {
    return this._bucketHeight;
  }
  setBucketSizes(width, height) {
    this._bucketWidth = width;
    this._bucketHeight = height;
    if (this._useBuckets()) {
      if (this._freezeControls) {
        this._makeBuckets();
      }
    } else {
      this._buckets = {};
    }
  }
  _useBuckets() {
    return this._bucketWidth > 0 && this._bucketHeight > 0;
  }
  _makeBuckets() {
    this._buckets = {};
    this._bucketLen = Math.ceil(this.widthInPixels / this._bucketWidth);
    this._dispatchInBuckets(this._children);
    this._oldLeft = null;
    this._oldTop = null;
  }
  _dispatchInBuckets(children) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      const bStartX = Math.max(0, Math.floor((child._customData._origLeft - this._customData.origLeft) / this._bucketWidth)), bEndX = Math.floor((child._customData._origLeft - this._customData.origLeft + child._currentMeasure.width - 1) / this._bucketWidth), bEndY = Math.floor((child._customData._origTop - this._customData.origTop + child._currentMeasure.height - 1) / this._bucketHeight);
      let bStartY = Math.max(0, Math.floor((child._customData._origTop - this._customData.origTop) / this._bucketHeight));
      while (bStartY <= bEndY) {
        for (let x = bStartX; x <= bEndX; ++x) {
          const bucket = bStartY * this._bucketLen + x;
          let lstc = this._buckets[bucket];
          if (!lstc) {
            lstc = [];
            this._buckets[bucket] = lstc;
          }
          lstc.push(child);
        }
        bStartY++;
      }
      if (child instanceof Container && child._children.length > 0) {
        this._dispatchInBuckets(child._children);
      }
    }
  }
  // reset left and top measures for the window and all its children
  _updateMeasures() {
    const left = this.leftInPixels | 0, top = this.topInPixels | 0;
    this._measureForChildren.left -= left;
    this._measureForChildren.top -= top;
    this._currentMeasure.left -= left;
    this._currentMeasure.top -= top;
    this._customData.origLeftForChildren = this._measureForChildren.left;
    this._customData.origTopForChildren = this._measureForChildren.top;
    this._customData.origLeft = this._currentMeasure.left;
    this._customData.origTop = this._currentMeasure.top;
    this._updateChildrenMeasures(this._children, left, top);
  }
  _updateChildrenMeasures(children, left, top) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      child._currentMeasure.left -= left;
      child._currentMeasure.top -= top;
      child._customData._origLeft = child._currentMeasure.left;
      child._customData._origTop = child._currentMeasure.top;
      if (child instanceof Container && child._children.length > 0) {
        this._updateChildrenMeasures(child._children, left, top);
      }
    }
  }
  _restoreMeasures() {
    const left = this.leftInPixels | 0, top = this.topInPixels | 0;
    this._measureForChildren.left = this._customData.origLeftForChildren + left;
    this._measureForChildren.top = this._customData.origTopForChildren + top;
    this._currentMeasure.left = this._customData.origLeft + left;
    this._currentMeasure.top = this._customData.origTop + top;
  }
  /**
   * Creates a new ScrollViewerWindow
   * @param name of ScrollViewerWindow
   */
  constructor(name22) {
    super(name22);
    this._freezeControls = false;
    this._bucketWidth = 0;
    this._bucketHeight = 0;
    this._buckets = {};
  }
  _getTypeName() {
    return "ScrollViewerWindow";
  }
  /**
   * @internal
   */
  _additionalProcessing(parentMeasure, context) {
    super._additionalProcessing(parentMeasure, context);
    this._parentMeasure = parentMeasure;
    this._measureForChildren.left = this._currentMeasure.left;
    this._measureForChildren.top = this._currentMeasure.top;
    this._measureForChildren.width = parentMeasure.width;
    this._measureForChildren.height = parentMeasure.height;
  }
  /**
   * @internal
   */
  _layout(parentMeasure, context) {
    if (this._freezeControls) {
      this.invalidateRect();
      return false;
    }
    return super._layout(parentMeasure, context);
  }
  _scrollChildren(children, left, top) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      child._currentMeasure.left = child._customData._origLeft + left;
      child._currentMeasure.top = child._customData._origTop + top;
      child._isClipped = false;
      if (child instanceof Container && child._children.length > 0) {
        this._scrollChildren(child._children, left, top);
      }
    }
  }
  _scrollChildrenWithBuckets(left, top, scrollLeft, scrollTop) {
    const bStartX = Math.max(0, Math.floor(-left / this._bucketWidth)), bEndX = Math.floor((-left + this._parentMeasure.width - 1) / this._bucketWidth), bEndY = Math.floor((-top + this._parentMeasure.height - 1) / this._bucketHeight);
    let bStartY = Math.max(0, Math.floor(-top / this._bucketHeight));
    while (bStartY <= bEndY) {
      for (let x = bStartX; x <= bEndX; ++x) {
        const bucket = bStartY * this._bucketLen + x, lstc = this._buckets[bucket];
        if (lstc) {
          for (let i = 0; i < lstc.length; ++i) {
            const child = lstc[i];
            child._currentMeasure.left = child._customData._origLeft + scrollLeft;
            child._currentMeasure.top = child._customData._origTop + scrollTop;
            child._isClipped = false;
          }
        }
      }
      bStartY++;
    }
  }
  /**
   * @internal
   */
  _draw(context, invalidatedRectangle) {
    if (!this._freezeControls) {
      super._draw(context, invalidatedRectangle);
      return;
    }
    this._localDraw(context);
    if (this.clipChildren) {
      this._clipForChildren(context);
    }
    const left = this.leftInPixels | 0, top = this.topInPixels | 0;
    if (this._useBuckets()) {
      if (this._oldLeft !== null && this._oldTop !== null) {
        this._scrollChildrenWithBuckets(this._oldLeft, this._oldTop, left, top);
        this._scrollChildrenWithBuckets(left, top, left, top);
      } else {
        this._scrollChildren(this._children, left, top);
      }
    } else {
      this._scrollChildren(this._children, left, top);
    }
    this._oldLeft = left;
    this._oldTop = top;
    for (const child of this._children) {
      if (!child._intersectsRect(this._parentMeasure)) {
        continue;
      }
      child._render(context, this._parentMeasure);
    }
  }
  _postMeasure() {
    if (this._freezeControls) {
      super._postMeasure();
      return;
    }
    let maxWidth = this.parentClientWidth;
    let maxHeight = this.parentClientHeight;
    for (const child of this.children) {
      if (!child.isVisible || child.notRenderable) {
        continue;
      }
      if (child.horizontalAlignment === Control.HORIZONTAL_ALIGNMENT_CENTER) {
        child._offsetLeft(this._currentMeasure.left - child._currentMeasure.left);
      }
      if (child.verticalAlignment === Control.VERTICAL_ALIGNMENT_CENTER) {
        child._offsetTop(this._currentMeasure.top - child._currentMeasure.top);
      }
      maxWidth = Math.max(maxWidth, child._currentMeasure.left - this._currentMeasure.left + child._currentMeasure.width + child.paddingRightInPixels);
      maxHeight = Math.max(maxHeight, child._currentMeasure.top - this._currentMeasure.top + child._currentMeasure.height + child.paddingBottomInPixels);
    }
    if (this._currentMeasure.width !== maxWidth) {
      this._width.updateInPlace(maxWidth, ValueAndUnit.UNITMODE_PIXEL);
      this._currentMeasure.width = maxWidth;
      this._rebuildLayout = true;
      this._isDirty = true;
    }
    if (this._currentMeasure.height !== maxHeight) {
      this._height.updateInPlace(maxHeight, ValueAndUnit.UNITMODE_PIXEL);
      this._currentMeasure.height = maxHeight;
      this._rebuildLayout = true;
      this._isDirty = true;
    }
    super._postMeasure();
  }
};

// node_modules/@babylonjs/gui/2D/controls/sliders/scrollBar.js
var ScrollBar = class extends BaseSlider {
  /** Gets or sets border color */
  get borderColor() {
    return this._borderColor;
  }
  set borderColor(value) {
    if (this._borderColor === value) {
      return;
    }
    this._borderColor = value;
    this._markAsDirty();
  }
  /** Gets or sets background color */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this._markAsDirty();
  }
  /** Gets or sets background gradient. Takes precedence over gradient. */
  get backgroundGradient() {
    return this._backgroundGradient;
  }
  set backgroundGradient(value) {
    if (this._backgroundGradient === value) {
      return;
    }
    this._backgroundGradient = value;
    this._markAsDirty();
  }
  /** Inverts the scrolling direction (default: false) */
  get invertScrollDirection() {
    return this._invertScrollDirection;
  }
  set invertScrollDirection(invert) {
    this._invertScrollDirection = invert;
  }
  /**
   * Creates a new Slider
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._background = "black";
    this._borderColor = "white";
    this._tempMeasure = new Measure(0, 0, 0, 0);
    this._invertScrollDirection = false;
    this._backgroundGradient = null;
  }
  _getTypeName() {
    return "Scrollbar";
  }
  _getThumbThickness() {
    let thumbThickness = 0;
    if (this._thumbWidth.isPixel) {
      thumbThickness = this._thumbWidth.getValue(this._host);
    } else {
      thumbThickness = this._backgroundBoxThickness * this._thumbWidth.getValue(this._host);
    }
    return thumbThickness;
  }
  _getBackgroundColor(context) {
    return this._backgroundGradient ? this._backgroundGradient.getCanvasGradient(context) : this._background;
  }
  _draw(context) {
    context.save();
    this._applyStates(context);
    this._prepareRenderingData("rectangle");
    const left = this._renderLeft;
    const thumbPosition = this._getThumbPosition();
    context.fillStyle = this._getBackgroundColor(context);
    context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
    context.fillStyle = this._getColor(context);
    if (this.isVertical) {
      this._tempMeasure.left = left - this._effectiveBarOffset;
      this._tempMeasure.top = this._currentMeasure.top + thumbPosition;
      this._tempMeasure.width = this._currentMeasure.width;
      this._tempMeasure.height = this._effectiveThumbThickness;
    } else {
      this._tempMeasure.left = this._currentMeasure.left + thumbPosition;
      this._tempMeasure.top = this._currentMeasure.top;
      this._tempMeasure.width = this._effectiveThumbThickness;
      this._tempMeasure.height = this._currentMeasure.height;
    }
    context.fillRect(this._tempMeasure.left, this._tempMeasure.top, this._tempMeasure.width, this._tempMeasure.height);
    context.restore();
  }
  /**
   * @internal
   */
  _updateValueFromPointer(x, y) {
    if (this.rotation != 0) {
      this._invertTransformMatrix.transformCoordinates(x, y, this._transformedPosition);
      x = this._transformedPosition.x;
      y = this._transformedPosition.y;
    }
    const sign = this._invertScrollDirection ? -1 : 1;
    if (this._first) {
      this._first = false;
      this._originX = x;
      this._originY = y;
      if (x < this._tempMeasure.left || x > this._tempMeasure.left + this._tempMeasure.width || y < this._tempMeasure.top || y > this._tempMeasure.top + this._tempMeasure.height) {
        if (this.isVertical) {
          this.value = this.minimum + (1 - (y - this._currentMeasure.top) / this._currentMeasure.height) * (this.maximum - this.minimum);
        } else {
          this.value = this.minimum + (x - this._currentMeasure.left) / this._currentMeasure.width * (this.maximum - this.minimum);
        }
      }
    }
    let delta = 0;
    if (this.isVertical) {
      delta = -((y - this._originY) / (this._currentMeasure.height - this._effectiveThumbThickness));
    } else {
      delta = (x - this._originX) / (this._currentMeasure.width - this._effectiveThumbThickness);
    }
    this.value += sign * delta * (this.maximum - this.minimum);
    this._originX = x;
    this._originY = y;
  }
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    this._first = true;
    return super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi);
  }
  serialize(serializationObject) {
    super.serialize(serializationObject);
    if (this.backgroundGradient) {
      serializationObject.backgroundGradient = {};
      this.backgroundGradient.serialize(serializationObject.backgroundGradient);
    }
  }
  _parseFromContent(serializationObject, host) {
    super._parseFromContent(serializationObject, host);
    if (serializationObject.backgroundGradient) {
      const className = Tools.Instantiate("BABYLON.GUI." + serializationObject.backgroundGradient.className);
      this.backgroundGradient = new className();
      this.backgroundGradient.parse(serializationObject.backgroundGradient);
    }
  }
};
__decorate([
  serialize()
], ScrollBar.prototype, "borderColor", null);
__decorate([
  serialize()
], ScrollBar.prototype, "background", null);
__decorate([
  serialize()
], ScrollBar.prototype, "invertScrollDirection", null);
RegisterClass("BABYLON.GUI.Scrollbar", ScrollBar);

// node_modules/@babylonjs/gui/2D/controls/sliders/imageScrollBar.js
var ImageScrollBar = class extends BaseSlider {
  /** Inverts the scrolling direction (default: false) */
  get invertScrollDirection() {
    return this._invertScrollDirection;
  }
  set invertScrollDirection(invert) {
    this._invertScrollDirection = invert;
  }
  /**
   * Gets or sets the image used to render the background for horizontal bar
   */
  get backgroundImage() {
    return this._backgroundBaseImage;
  }
  set backgroundImage(value) {
    if (this._backgroundBaseImage === value) {
      return;
    }
    this._backgroundBaseImage = value;
    if (this.isVertical && this.num90RotationInVerticalMode !== 0) {
      if (!value.isLoaded) {
        value.onImageLoadedObservable.addOnce(() => {
          const rotatedValue = value._rotate90(this.num90RotationInVerticalMode, true);
          this._backgroundImage = rotatedValue;
          if (!rotatedValue.isLoaded) {
            rotatedValue.onImageLoadedObservable.addOnce(() => {
              this._markAsDirty();
            });
          }
          this._markAsDirty();
        });
      } else {
        this._backgroundImage = value._rotate90(this.num90RotationInVerticalMode, true);
        this._markAsDirty();
      }
    } else {
      this._backgroundImage = value;
      if (value && !value.isLoaded) {
        value.onImageLoadedObservable.addOnce(() => {
          this._markAsDirty();
        });
      }
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets the image used to render the thumb
   */
  get thumbImage() {
    return this._thumbBaseImage;
  }
  set thumbImage(value) {
    if (this._thumbBaseImage === value) {
      return;
    }
    this._thumbBaseImage = value;
    if (this.isVertical && this.num90RotationInVerticalMode !== 0) {
      if (!value.isLoaded) {
        value.onImageLoadedObservable.addOnce(() => {
          const rotatedValue = value._rotate90(-this.num90RotationInVerticalMode, true);
          this._thumbImage = rotatedValue;
          if (!rotatedValue.isLoaded) {
            rotatedValue.onImageLoadedObservable.addOnce(() => {
              this._markAsDirty();
            });
          }
          this._markAsDirty();
        });
      } else {
        this._thumbImage = value._rotate90(-this.num90RotationInVerticalMode, true);
        this._markAsDirty();
      }
    } else {
      this._thumbImage = value;
      if (value && !value.isLoaded) {
        value.onImageLoadedObservable.addOnce(() => {
          this._markAsDirty();
        });
      }
      this._markAsDirty();
    }
  }
  /**
   * Gets or sets the length of the thumb
   */
  get thumbLength() {
    return this._thumbLength;
  }
  set thumbLength(value) {
    if (this._thumbLength === value) {
      return;
    }
    this._thumbLength = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the height of the thumb
   */
  get thumbHeight() {
    return this._thumbHeight;
  }
  set thumbHeight(value) {
    if (this._thumbLength === value) {
      return;
    }
    this._thumbHeight = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the height of the bar image
   */
  get barImageHeight() {
    return this._barImageHeight;
  }
  set barImageHeight(value) {
    if (this._barImageHeight === value) {
      return;
    }
    this._barImageHeight = value;
    this._markAsDirty();
  }
  /**
   * Creates a new ImageScrollBar
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._thumbLength = 0.5;
    this._thumbHeight = 1;
    this._barImageHeight = 1;
    this._tempMeasure = new Measure(0, 0, 0, 0);
    this._invertScrollDirection = false;
    this.num90RotationInVerticalMode = 1;
  }
  _getTypeName() {
    return "ImageScrollBar";
  }
  _getThumbThickness() {
    let thumbThickness = 0;
    if (this._thumbWidth.isPixel) {
      thumbThickness = this._thumbWidth.getValue(this._host);
    } else {
      thumbThickness = this._backgroundBoxThickness * this._thumbWidth.getValue(this._host);
    }
    return thumbThickness;
  }
  _draw(context) {
    context.save();
    this._applyStates(context);
    this._prepareRenderingData("rectangle");
    const thumbPosition = this._getThumbPosition();
    const left = this._renderLeft;
    const top = this._renderTop;
    const width = this._renderWidth;
    const height = this._renderHeight;
    if (this._backgroundImage) {
      this._tempMeasure.copyFromFloats(left, top, width, height);
      if (this.isVertical) {
        this._tempMeasure.copyFromFloats(left + width * (1 - this._barImageHeight) * 0.5, this._currentMeasure.top, width * this._barImageHeight, height);
        this._tempMeasure.height += this._effectiveThumbThickness;
        this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure);
      } else {
        this._tempMeasure.copyFromFloats(this._currentMeasure.left, top + height * (1 - this._barImageHeight) * 0.5, width, height * this._barImageHeight);
        this._tempMeasure.width += this._effectiveThumbThickness;
        this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure);
      }
      this._backgroundImage._draw(context);
    }
    if (this.isVertical) {
      this._tempMeasure.copyFromFloats(left - this._effectiveBarOffset + this._currentMeasure.width * (1 - this._thumbHeight) * 0.5, this._currentMeasure.top + thumbPosition, this._currentMeasure.width * this._thumbHeight, this._effectiveThumbThickness);
    } else {
      this._tempMeasure.copyFromFloats(this._currentMeasure.left + thumbPosition, this._currentMeasure.top + this._currentMeasure.height * (1 - this._thumbHeight) * 0.5, this._effectiveThumbThickness, this._currentMeasure.height * this._thumbHeight);
    }
    if (this._thumbImage) {
      this._thumbImage._currentMeasure.copyFrom(this._tempMeasure);
      this._thumbImage._draw(context);
    }
    context.restore();
  }
  /**
   * @internal
   */
  _updateValueFromPointer(x, y) {
    if (this.rotation != 0) {
      this._invertTransformMatrix.transformCoordinates(x, y, this._transformedPosition);
      x = this._transformedPosition.x;
      y = this._transformedPosition.y;
    }
    const sign = this._invertScrollDirection ? -1 : 1;
    if (this._first) {
      this._first = false;
      this._originX = x;
      this._originY = y;
      if (x < this._tempMeasure.left || x > this._tempMeasure.left + this._tempMeasure.width || y < this._tempMeasure.top || y > this._tempMeasure.top + this._tempMeasure.height) {
        if (this.isVertical) {
          this.value = this.minimum + (1 - (y - this._currentMeasure.top) / this._currentMeasure.height) * (this.maximum - this.minimum);
        } else {
          this.value = this.minimum + (x - this._currentMeasure.left) / this._currentMeasure.width * (this.maximum - this.minimum);
        }
      }
    }
    let delta = 0;
    if (this.isVertical) {
      delta = -((y - this._originY) / (this._currentMeasure.height - this._effectiveThumbThickness));
    } else {
      delta = (x - this._originX) / (this._currentMeasure.width - this._effectiveThumbThickness);
    }
    this.value += sign * delta * (this.maximum - this.minimum);
    this._originX = x;
    this._originY = y;
  }
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    this._first = true;
    return super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi);
  }
};
__decorate([
  serialize()
], ImageScrollBar.prototype, "num90RotationInVerticalMode", void 0);
__decorate([
  serialize()
], ImageScrollBar.prototype, "invertScrollDirection", null);

// node_modules/@babylonjs/gui/2D/controls/scrollViewers/scrollViewer.js
var ScrollViewer = class extends Rectangle {
  /**
   * Gets the horizontal scrollbar
   */
  get horizontalBar() {
    return this._horizontalBar;
  }
  /**
   * Gets the vertical scrollbar
   */
  get verticalBar() {
    return this._verticalBar;
  }
  /**
   * Adds a new control to the current container
   * @param control defines the control to add
   * @returns the current container
   */
  addControl(control) {
    if (!control) {
      return this;
    }
    this._window.addControl(control);
    return this;
  }
  /**
   * Removes a control from the current container
   * @param control defines the control to remove
   * @returns the current container
   */
  removeControl(control) {
    this._window.removeControl(control);
    return this;
  }
  /** Gets the list of children */
  get children() {
    return this._window.children;
  }
  _flagDescendantsAsMatrixDirty() {
    for (const child of this._children) {
      child._markMatrixAsDirty();
    }
  }
  /**
   * Freezes or unfreezes the controls in the window.
   * When controls are frozen, the scroll viewer can render a lot more quickly but updates to positions/sizes of controls
   * are not taken into account. If you want to change positions/sizes, unfreeze, perform the changes then freeze again
   */
  get freezeControls() {
    return this._window.freezeControls;
  }
  set freezeControls(value) {
    this._window.freezeControls = value;
  }
  /** Gets the bucket width */
  get bucketWidth() {
    return this._window.bucketWidth;
  }
  /** Gets the bucket height */
  get bucketHeight() {
    return this._window.bucketHeight;
  }
  /**
   * Sets the bucket sizes.
   * When freezeControls is true, setting a non-zero bucket size will improve performances by updating only
   * controls that are visible. The bucket sizes is used to subdivide (internally) the window area to smaller areas into which
   * controls are dispatched. So, the size should be roughly equals to the mean size of all the controls of
   * the window. To disable the usage of buckets, sets either width or height (or both) to 0.
   * Please note that using this option will raise the memory usage (the higher the bucket sizes, the less memory
   * used), that's why it is not enabled by default.
   * @param width width of the bucket
   * @param height height of the bucket
   */
  setBucketSizes(width, height) {
    this._window.setBucketSizes(width, height);
  }
  /**
   * Forces the horizontal scroll bar to be displayed
   */
  get forceHorizontalBar() {
    return this._forceHorizontalBar;
  }
  set forceHorizontalBar(value) {
    this._grid.setRowDefinition(1, value ? this._barSize : 0, true);
    this._horizontalBar.isVisible = value;
    this._forceHorizontalBar = value;
  }
  /**
   * Forces the vertical scroll bar to be displayed
   */
  get forceVerticalBar() {
    return this._forceVerticalBar;
  }
  set forceVerticalBar(value) {
    this._grid.setColumnDefinition(1, value ? this._barSize : 0, true);
    this._verticalBar.isVisible = value;
    this._forceVerticalBar = value;
  }
  /**
   * Creates a new ScrollViewer
   * @param name of ScrollViewer
   * @param isImageBased
   */
  constructor(name22, isImageBased) {
    super(name22);
    this._barSize = 20;
    this._pointerIsOver = false;
    this._wheelPrecision = 0.05;
    this._thumbLength = 0.5;
    this._thumbHeight = 1;
    this._barImageHeight = 1;
    this._horizontalBarImageHeight = 1;
    this._verticalBarImageHeight = 1;
    this._oldWindowContentsWidth = 0;
    this._oldWindowContentsHeight = 0;
    this._forceHorizontalBar = false;
    this._forceVerticalBar = false;
    this._useImageBar = isImageBased ? isImageBased : false;
    this.onDirtyObservable.add(() => {
      this._horizontalBarSpace.color = this.color;
      this._verticalBarSpace.color = this.color;
      this._dragSpace.color = this.color;
    });
    this.onPointerEnterObservable.add(() => {
      this._pointerIsOver = true;
    });
    this.onPointerOutObservable.add(() => {
      this._pointerIsOver = false;
    });
    this._grid = new Grid();
    if (this._useImageBar) {
      this._horizontalBar = new ImageScrollBar();
      this._verticalBar = new ImageScrollBar();
    } else {
      this._horizontalBar = new ScrollBar();
      this._verticalBar = new ScrollBar();
    }
    this._window = new _ScrollViewerWindow("scrollViewer_window");
    this._window.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._window.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this._grid.addColumnDefinition(1);
    this._grid.addColumnDefinition(0, true);
    this._grid.addRowDefinition(1);
    this._grid.addRowDefinition(0, true);
    super.addControl(this._grid);
    this._grid.addControl(this._window, 0, 0);
    this._verticalBarSpace = new Rectangle();
    this._verticalBarSpace.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._verticalBarSpace.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this._verticalBarSpace.thickness = 1;
    this._grid.addControl(this._verticalBarSpace, 0, 1);
    this._addBar(this._verticalBar, this._verticalBarSpace, true, Math.PI);
    this._horizontalBarSpace = new Rectangle();
    this._horizontalBarSpace.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._horizontalBarSpace.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this._horizontalBarSpace.thickness = 1;
    this._grid.addControl(this._horizontalBarSpace, 1, 0);
    this._addBar(this._horizontalBar, this._horizontalBarSpace, false, 0);
    this._dragSpace = new Rectangle();
    this._dragSpace.thickness = 1;
    this._grid.addControl(this._dragSpace, 1, 1);
    if (!this._useImageBar) {
      this.barColor = "grey";
      this.barBackground = "transparent";
    }
  }
  /** Reset the scroll viewer window to initial size */
  resetWindow() {
    this._window.width = "100%";
    this._window.height = "100%";
  }
  _getTypeName() {
    return "ScrollViewer";
  }
  _buildClientSizes() {
    const ratio = this.host.idealRatio;
    this._window.parentClientWidth = this._currentMeasure.width - (this._verticalBar.isVisible || this.forceVerticalBar ? this._barSize * ratio : 0) - 2 * this.thickness;
    this._window.parentClientHeight = this._currentMeasure.height - (this._horizontalBar.isVisible || this.forceHorizontalBar ? this._barSize * ratio : 0) - 2 * this.thickness;
    this._clientWidth = this._window.parentClientWidth;
    this._clientHeight = this._window.parentClientHeight;
  }
  _additionalProcessing(parentMeasure, context) {
    super._additionalProcessing(parentMeasure, context);
    this._buildClientSizes();
  }
  _postMeasure() {
    super._postMeasure();
    this._updateScroller();
    this._setWindowPosition(false);
  }
  /**
   * Gets or sets the mouse wheel precision
   * from 0 to 1 with a default value of 0.05
   * */
  get wheelPrecision() {
    return this._wheelPrecision;
  }
  set wheelPrecision(value) {
    if (this._wheelPrecision === value) {
      return;
    }
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this._wheelPrecision = value;
  }
  /** Gets or sets the scroll bar container background color */
  get scrollBackground() {
    return this._horizontalBarSpace.background;
  }
  set scrollBackground(color) {
    if (this._horizontalBarSpace.background === color) {
      return;
    }
    this._horizontalBarSpace.background = color;
    this._verticalBarSpace.background = color;
  }
  /** Gets or sets the bar color */
  get barColor() {
    return this._barColor;
  }
  set barColor(color) {
    if (this._barColor === color) {
      return;
    }
    this._barColor = color;
    this._horizontalBar.color = color;
    this._verticalBar.color = color;
  }
  /** Gets or sets the bar image */
  get thumbImage() {
    return this._barImage;
  }
  set thumbImage(value) {
    if (this._barImage === value) {
      return;
    }
    this._barImage = value;
    const hb = this._horizontalBar;
    const vb = this._verticalBar;
    hb.thumbImage = value;
    vb.thumbImage = value;
  }
  /** Gets or sets the horizontal bar image */
  get horizontalThumbImage() {
    return this._horizontalBarImage;
  }
  set horizontalThumbImage(value) {
    if (this._horizontalBarImage === value) {
      return;
    }
    this._horizontalBarImage = value;
    const hb = this._horizontalBar;
    hb.thumbImage = value;
  }
  /** Gets or sets the vertical bar image */
  get verticalThumbImage() {
    return this._verticalBarImage;
  }
  set verticalThumbImage(value) {
    if (this._verticalBarImage === value) {
      return;
    }
    this._verticalBarImage = value;
    const vb = this._verticalBar;
    vb.thumbImage = value;
  }
  /** Gets or sets the size of the bar */
  get barSize() {
    return this._barSize;
  }
  set barSize(value) {
    if (this._barSize === value) {
      return;
    }
    this._barSize = value;
    this._markAsDirty();
    if (this._horizontalBar.isVisible) {
      this._grid.setRowDefinition(1, this._barSize, true);
    }
    if (this._verticalBar.isVisible) {
      this._grid.setColumnDefinition(1, this._barSize, true);
    }
  }
  /** Gets or sets the length of the thumb */
  get thumbLength() {
    return this._thumbLength;
  }
  set thumbLength(value) {
    if (this._thumbLength === value) {
      return;
    }
    if (value <= 0) {
      value = 0.1;
    }
    if (value > 1) {
      value = 1;
    }
    this._thumbLength = value;
    const hb = this._horizontalBar;
    const vb = this._verticalBar;
    hb.thumbLength = value;
    vb.thumbLength = value;
    this._markAsDirty();
  }
  /** Gets or sets the height of the thumb */
  get thumbHeight() {
    return this._thumbHeight;
  }
  set thumbHeight(value) {
    if (this._thumbHeight === value) {
      return;
    }
    if (value <= 0) {
      value = 0.1;
    }
    if (value > 1) {
      value = 1;
    }
    this._thumbHeight = value;
    const hb = this._horizontalBar;
    const vb = this._verticalBar;
    hb.thumbHeight = value;
    vb.thumbHeight = value;
    this._markAsDirty();
  }
  /** Gets or sets the height of the bar image */
  get barImageHeight() {
    return this._barImageHeight;
  }
  set barImageHeight(value) {
    if (this._barImageHeight === value) {
      return;
    }
    if (value <= 0) {
      value = 0.1;
    }
    if (value > 1) {
      value = 1;
    }
    this._barImageHeight = value;
    const hb = this._horizontalBar;
    const vb = this._verticalBar;
    hb.barImageHeight = value;
    vb.barImageHeight = value;
    this._markAsDirty();
  }
  /** Gets or sets the height of the horizontal bar image */
  get horizontalBarImageHeight() {
    return this._horizontalBarImageHeight;
  }
  set horizontalBarImageHeight(value) {
    if (this._horizontalBarImageHeight === value) {
      return;
    }
    if (value <= 0) {
      value = 0.1;
    }
    if (value > 1) {
      value = 1;
    }
    this._horizontalBarImageHeight = value;
    const hb = this._horizontalBar;
    hb.barImageHeight = value;
    this._markAsDirty();
  }
  /** Gets or sets the height of the vertical bar image */
  get verticalBarImageHeight() {
    return this._verticalBarImageHeight;
  }
  set verticalBarImageHeight(value) {
    if (this._verticalBarImageHeight === value) {
      return;
    }
    if (value <= 0) {
      value = 0.1;
    }
    if (value > 1) {
      value = 1;
    }
    this._verticalBarImageHeight = value;
    const vb = this._verticalBar;
    vb.barImageHeight = value;
    this._markAsDirty();
  }
  /** Gets or sets the bar background */
  get barBackground() {
    return this._barBackground;
  }
  set barBackground(color) {
    if (this._barBackground === color) {
      return;
    }
    this._barBackground = color;
    const hb = this._horizontalBar;
    const vb = this._verticalBar;
    hb.background = color;
    vb.background = color;
    this._dragSpace.background = color;
  }
  /** Gets or sets the bar background image */
  get barImage() {
    return this._barBackgroundImage;
  }
  set barImage(value) {
    this._barBackgroundImage = value;
    const hb = this._horizontalBar;
    const vb = this._verticalBar;
    hb.backgroundImage = value;
    vb.backgroundImage = value;
  }
  /** Gets or sets the horizontal bar background image */
  get horizontalBarImage() {
    return this._horizontalBarBackgroundImage;
  }
  set horizontalBarImage(value) {
    this._horizontalBarBackgroundImage = value;
    const hb = this._horizontalBar;
    hb.backgroundImage = value;
  }
  /** Gets or sets the vertical bar background image */
  get verticalBarImage() {
    return this._verticalBarBackgroundImage;
  }
  set verticalBarImage(value) {
    this._verticalBarBackgroundImage = value;
    const vb = this._verticalBar;
    vb.backgroundImage = value;
  }
  _setWindowPosition(force = true) {
    const ratio = this.host.idealRatio;
    const windowContentsWidth = this._window._currentMeasure.width;
    const windowContentsHeight = this._window._currentMeasure.height;
    if (!force && this._oldWindowContentsWidth === windowContentsWidth && this._oldWindowContentsHeight === windowContentsHeight) {
      return;
    }
    this._oldWindowContentsWidth = windowContentsWidth;
    this._oldWindowContentsHeight = windowContentsHeight;
    const _endLeft = this._clientWidth - windowContentsWidth;
    const _endTop = this._clientHeight - windowContentsHeight;
    const newLeft = this._horizontalBar.value / ratio * _endLeft + "px";
    const newTop = this._verticalBar.value / ratio * _endTop + "px";
    if (newLeft !== this._window.left) {
      this._window.left = newLeft;
      if (!this.freezeControls) {
        this._rebuildLayout = true;
      }
    }
    if (newTop !== this._window.top) {
      this._window.top = newTop;
      if (!this.freezeControls) {
        this._rebuildLayout = true;
      }
    }
  }
  /** @internal */
  _updateScroller() {
    const windowContentsWidth = this._window._currentMeasure.width;
    const windowContentsHeight = this._window._currentMeasure.height;
    if (this._horizontalBar.isVisible && windowContentsWidth <= this._clientWidth && !this.forceHorizontalBar) {
      this._grid.setRowDefinition(1, 0, true);
      this._horizontalBar.isVisible = false;
      this._horizontalBar.value = 0;
      this._rebuildLayout = true;
    } else if (!this._horizontalBar.isVisible && (windowContentsWidth > this._clientWidth || this.forceHorizontalBar)) {
      this._grid.setRowDefinition(1, this._barSize, true);
      this._horizontalBar.isVisible = true;
      this._rebuildLayout = true;
    }
    if (this._verticalBar.isVisible && windowContentsHeight <= this._clientHeight && !this.forceVerticalBar) {
      this._grid.setColumnDefinition(1, 0, true);
      this._verticalBar.isVisible = false;
      this._verticalBar.value = 0;
      this._rebuildLayout = true;
    } else if (!this._verticalBar.isVisible && (windowContentsHeight > this._clientHeight || this.forceVerticalBar)) {
      this._grid.setColumnDefinition(1, this._barSize, true);
      this._verticalBar.isVisible = true;
      this._rebuildLayout = true;
    }
    this._buildClientSizes();
    const ratio = this.host.idealRatio;
    this._horizontalBar.thumbWidth = this._thumbLength * 0.9 * (this._clientWidth / ratio) + "px";
    this._verticalBar.thumbWidth = this._thumbLength * 0.9 * (this._clientHeight / ratio) + "px";
  }
  _link(host) {
    super._link(host);
    this._attachWheel();
  }
  /**
   * @internal
   */
  _addBar(barControl, barContainer, isVertical, rotation) {
    barControl.paddingLeft = 0;
    barControl.width = "100%";
    barControl.height = "100%";
    barControl.barOffset = 0;
    barControl.value = 0;
    barControl.maximum = 1;
    barControl.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    barControl.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    barControl.isVertical = isVertical;
    barControl.rotation = rotation;
    barControl.isVisible = false;
    barContainer.addControl(barControl);
    barControl.onValueChangedObservable.add(() => {
      this._setWindowPosition();
    });
  }
  /** @internal */
  _attachWheel() {
    if (!this._host || this._onWheelObserver) {
      return;
    }
    this._onWheelObserver = this.onWheelObservable.add((pi) => {
      if (!this._pointerIsOver || this.isReadOnly) {
        return;
      }
      if (this._verticalBar.isVisible == true) {
        if (pi.y < 0 && this._verticalBar.value > 0) {
          this._verticalBar.value -= this._wheelPrecision;
        } else if (pi.y > 0 && this._verticalBar.value < this._verticalBar.maximum) {
          this._verticalBar.value += this._wheelPrecision;
        }
      }
      if (this._horizontalBar.isVisible == true) {
        if (pi.x < 0 && this._horizontalBar.value < this._horizontalBar.maximum) {
          this._horizontalBar.value += this._wheelPrecision;
        } else if (pi.x > 0 && this._horizontalBar.value > 0) {
          this._horizontalBar.value -= this._wheelPrecision;
        }
      }
    });
  }
  _renderHighlightSpecific(context) {
    if (!this.isHighlighted) {
      return;
    }
    super._renderHighlightSpecific(context);
    this._grid._renderHighlightSpecific(context);
    context.restore();
  }
  /** Releases associated resources */
  dispose() {
    this.onWheelObservable.remove(this._onWheelObserver);
    this._onWheelObserver = null;
    super.dispose();
  }
};
__decorate([
  serialize()
], ScrollViewer.prototype, "wheelPrecision", null);
__decorate([
  serialize()
], ScrollViewer.prototype, "scrollBackground", null);
__decorate([
  serialize()
], ScrollViewer.prototype, "barColor", null);
__decorate([
  serialize()
], ScrollViewer.prototype, "barSize", null);
__decorate([
  serialize()
], ScrollViewer.prototype, "barBackground", null);
RegisterClass("BABYLON.GUI.ScrollViewer", ScrollViewer);

// node_modules/@babylonjs/gui/2D/controls/toggleButton.js
var ToggleButton = class extends Rectangle {
  /** Gets or sets group name this toggle button belongs to */
  get group() {
    return this._group;
  }
  set group(value) {
    if (this._group === value) {
      return;
    }
    this._group = value;
  }
  /** Gets or sets a boolean indicating if the toggle button is active or not */
  get isActive() {
    return this._isActive;
  }
  set isActive(value) {
    var _a, _b;
    if (this._isActive === value) {
      return;
    }
    this._isActive = value;
    if (this._isActive) {
      (_a = this.toActiveAnimation) == null ? void 0 : _a.call(this);
    } else {
      (_b = this.toInactiveAnimation) == null ? void 0 : _b.call(this);
    }
    this._markAsDirty();
    this.onIsActiveChangedObservable.notifyObservers(value);
    if (this._isActive && this._host && this._group) {
      this._host.executeOnAllControls((control) => {
        if (control.typeName === "ToggleButton") {
          if (control === this) {
            return;
          }
          const childToggle = control;
          if (childToggle.group === this.group) {
            childToggle.isActive = false;
          }
        }
      });
    }
  }
  /**
   * Creates a new ToggleButton
   * @param name defines the control name
   * @param group defines the toggle group this toggle belongs to
   */
  constructor(name22, group) {
    super(name22);
    this.name = name22;
    this.onIsActiveChangedObservable = new Observable();
    this.delegatePickingToChildren = false;
    this._isActive = false;
    this.group = group ?? "";
    this.thickness = 0;
    this.isPointerBlocker = true;
    let alphaStore = null;
    this.toActiveAnimation = () => {
      this.thickness = 1;
    };
    this.toInactiveAnimation = () => {
      this.thickness = 0;
    };
    this.pointerEnterActiveAnimation = () => {
      alphaStore = this.alpha;
      this.alpha -= 0.1;
    };
    this.pointerOutActiveAnimation = () => {
      if (alphaStore !== null) {
        this.alpha = alphaStore;
      }
    };
    this.pointerDownActiveAnimation = () => {
      this.scaleX -= 0.05;
      this.scaleY -= 0.05;
    };
    this.pointerUpActiveAnimation = () => {
      this.scaleX += 0.05;
      this.scaleY += 0.05;
    };
    this.pointerEnterInactiveAnimation = () => {
      alphaStore = this.alpha;
      this.alpha -= 0.1;
    };
    this.pointerOutInactiveAnimation = () => {
      if (alphaStore !== null) {
        this.alpha = alphaStore;
      }
    };
    this.pointerDownInactiveAnimation = () => {
      this.scaleX -= 0.05;
      this.scaleY -= 0.05;
    };
    this.pointerUpInactiveAnimation = () => {
      this.scaleX += 0.05;
      this.scaleY += 0.05;
    };
  }
  _getTypeName() {
    return "ToggleButton";
  }
  // While being a container, the toggle button behaves like a control.
  /**
   * @internal
   */
  _processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
    if (!this._isEnabled || !this.isHitTestVisible || !this.isVisible || this.notRenderable) {
      return false;
    }
    if (!super.contains(x, y)) {
      return false;
    }
    if (this.delegatePickingToChildren) {
      let contains = false;
      for (let index = this._children.length - 1; index >= 0; index--) {
        const child = this._children[index];
        if (child.isEnabled && child.isHitTestVisible && child.isVisible && !child.notRenderable && child.contains(x, y)) {
          contains = true;
          break;
        }
      }
      if (!contains) {
        return false;
      }
    }
    this._processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY);
    return true;
  }
  /**
   * @internal
   */
  _onPointerEnter(target, pi) {
    if (!super._onPointerEnter(target, pi)) {
      return false;
    }
    if (this.isReadOnly) {
      return true;
    }
    if (this._isActive) {
      if (this.pointerEnterActiveAnimation) {
        this.pointerEnterActiveAnimation();
      }
    } else {
      if (this.pointerEnterInactiveAnimation) {
        this.pointerEnterInactiveAnimation();
      }
    }
    return true;
  }
  /**
   * @internal
   */
  _onPointerOut(target, pi, force = false) {
    if (!this.isReadOnly) {
      if (this._isActive) {
        if (this.pointerOutActiveAnimation) {
          this.pointerOutActiveAnimation();
        }
      } else {
        if (this.pointerOutInactiveAnimation) {
          this.pointerOutInactiveAnimation();
        }
      }
    }
    super._onPointerOut(target, pi, force);
  }
  /**
   * @internal
   */
  _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
    if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
      return false;
    }
    if (this.isReadOnly) {
      return true;
    }
    if (this._isActive) {
      if (this.pointerDownActiveAnimation) {
        this.pointerDownActiveAnimation();
      }
    } else {
      if (this.pointerDownInactiveAnimation) {
        this.pointerDownInactiveAnimation();
      }
    }
    return true;
  }
  /**
   * @internal
   */
  _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
    if (!this.isReadOnly) {
      if (this._isActive) {
        if (this.pointerUpActiveAnimation) {
          this.pointerUpActiveAnimation();
        }
      } else {
        if (this.pointerUpInactiveAnimation) {
          this.pointerUpInactiveAnimation();
        }
      }
    }
    super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi);
  }
};
RegisterClass("BABYLON.GUI.ToggleButton", ToggleButton);

// node_modules/@babylonjs/gui/2D/controls/virtualKeyboard.js
var KeyPropertySet = class {
};
var VirtualKeyboard = class _VirtualKeyboard extends StackPanel {
  constructor() {
    super(...arguments);
    this.onKeyPressObservable = new Observable();
    this.defaultButtonWidth = "40px";
    this.defaultButtonHeight = "40px";
    this.defaultButtonPaddingLeft = "2px";
    this.defaultButtonPaddingRight = "2px";
    this.defaultButtonPaddingTop = "2px";
    this.defaultButtonPaddingBottom = "2px";
    this.defaultButtonColor = "#DDD";
    this.defaultButtonBackground = "#070707";
    this.shiftButtonColor = "#7799FF";
    this.selectedShiftThickness = 1;
    this.shiftState = 0;
    this._currentlyConnectedInputText = null;
    this._connectedInputTexts = [];
    this._onKeyPressObserver = null;
  }
  _getTypeName() {
    return "VirtualKeyboard";
  }
  _createKey(key, propertySet) {
    const button = Button.CreateSimpleButton(key, key);
    button.width = propertySet && propertySet.width ? propertySet.width : this.defaultButtonWidth;
    button.height = propertySet && propertySet.height ? propertySet.height : this.defaultButtonHeight;
    button.color = propertySet && propertySet.color ? propertySet.color : this.defaultButtonColor;
    button.background = propertySet && propertySet.background ? propertySet.background : this.defaultButtonBackground;
    button.paddingLeft = propertySet && propertySet.paddingLeft ? propertySet.paddingLeft : this.defaultButtonPaddingLeft;
    button.paddingRight = propertySet && propertySet.paddingRight ? propertySet.paddingRight : this.defaultButtonPaddingRight;
    button.paddingTop = propertySet && propertySet.paddingTop ? propertySet.paddingTop : this.defaultButtonPaddingTop;
    button.paddingBottom = propertySet && propertySet.paddingBottom ? propertySet.paddingBottom : this.defaultButtonPaddingBottom;
    button.thickness = 0;
    button.isFocusInvisible = true;
    button.shadowColor = this.shadowColor;
    button.shadowBlur = this.shadowBlur;
    button.shadowOffsetX = this.shadowOffsetX;
    button.shadowOffsetY = this.shadowOffsetY;
    button.onPointerUpObservable.add(() => {
      this.onKeyPressObservable.notifyObservers(key);
    });
    return button;
  }
  /**
   * Adds a new row of keys
   * @param keys defines the list of keys to add
   * @param propertySets defines the associated property sets
   */
  addKeysRow(keys, propertySets) {
    const panel = new StackPanel();
    panel.isVertical = false;
    panel.isFocusInvisible = true;
    let maxKey = null;
    for (let i = 0; i < keys.length; i++) {
      let properties = null;
      if (propertySets && propertySets.length === keys.length) {
        properties = propertySets[i];
      }
      const key = this._createKey(keys[i], properties);
      if (!maxKey || key.heightInPixels > maxKey.heightInPixels) {
        maxKey = key;
      }
      panel.addControl(key);
    }
    panel.height = maxKey ? maxKey.height : this.defaultButtonHeight;
    this.addControl(panel);
  }
  /**
   * Set the shift key to a specific state
   * @param shiftState defines the new shift state
   */
  applyShiftState(shiftState) {
    if (!this.children) {
      return;
    }
    for (let i = 0; i < this.children.length; i++) {
      const row = this.children[i];
      if (!row || !row.children) {
        continue;
      }
      const rowContainer = row;
      for (let j = 0; j < rowContainer.children.length; j++) {
        const button = rowContainer.children[j];
        if (!button || !button.children[0]) {
          continue;
        }
        const button_tblock = button.children[0];
        if (button_tblock.text === "⇧") {
          button.color = shiftState ? this.shiftButtonColor : this.defaultButtonColor;
          button.thickness = shiftState > 1 ? this.selectedShiftThickness : 0;
        }
        button_tblock.text = shiftState > 0 ? button_tblock.text.toUpperCase() : button_tblock.text.toLowerCase();
      }
    }
  }
  /** Gets the input text control currently attached to the keyboard */
  get connectedInputText() {
    return this._currentlyConnectedInputText;
  }
  /**
   * Connects the keyboard with an input text control
   *
   * @param input defines the target control
   */
  connect(input) {
    const inputTextAlreadyConnected = this._connectedInputTexts.some((a) => a.input === input);
    if (inputTextAlreadyConnected) {
      return;
    }
    if (this._onKeyPressObserver === null) {
      this._onKeyPressObserver = this.onKeyPressObservable.add((key) => {
        if (!this._currentlyConnectedInputText) {
          return;
        }
        this._currentlyConnectedInputText._host.focusedControl = this._currentlyConnectedInputText;
        switch (key) {
          case "⇧":
            this.shiftState++;
            if (this.shiftState > 2) {
              this.shiftState = 0;
            }
            this.applyShiftState(this.shiftState);
            return;
          case "←":
            if (this._currentlyConnectedInputText instanceof InputTextArea) {
              this._currentlyConnectedInputText.alternativeProcessKey("Backspace");
            } else {
              this._currentlyConnectedInputText.processKey(8);
            }
            return;
          case "↵":
            if (this._currentlyConnectedInputText instanceof InputTextArea) {
              this._currentlyConnectedInputText.alternativeProcessKey("Enter");
            } else {
              this._currentlyConnectedInputText.processKey(13);
            }
            return;
        }
        if (this._currentlyConnectedInputText instanceof InputTextArea) {
          this._currentlyConnectedInputText.alternativeProcessKey("", this.shiftState ? key.toUpperCase() : key);
        } else {
          this._currentlyConnectedInputText.processKey(-1, this.shiftState ? key.toUpperCase() : key);
        }
        if (this.shiftState === 1) {
          this.shiftState = 0;
          this.applyShiftState(this.shiftState);
        }
      });
    }
    this.isVisible = false;
    this._currentlyConnectedInputText = input;
    input._connectedVirtualKeyboard = this;
    const onFocusObserver = input.onFocusObservable.add(() => {
      this._currentlyConnectedInputText = input;
      input._connectedVirtualKeyboard = this;
      this.isVisible = true;
    });
    const onBlurObserver = input.onBlurObservable.add(() => {
      input._connectedVirtualKeyboard = null;
      this._currentlyConnectedInputText = null;
      this.isVisible = false;
    });
    this._connectedInputTexts.push({
      input,
      onBlurObserver,
      onFocusObserver
    });
  }
  /**
   * Disconnects the keyboard from connected InputText controls
   *
   * @param input optionally defines a target control, otherwise all are disconnected
   */
  disconnect(input) {
    if (input) {
      const filtered = this._connectedInputTexts.filter((a) => a.input === input);
      if (filtered.length === 1) {
        this._removeConnectedInputObservables(filtered[0]);
        this._connectedInputTexts = this._connectedInputTexts.filter((a) => a.input !== input);
        if (this._currentlyConnectedInputText === input) {
          this._currentlyConnectedInputText = null;
        }
      }
    } else {
      this._connectedInputTexts.forEach((connectedInputText) => {
        this._removeConnectedInputObservables(connectedInputText);
      });
      this._connectedInputTexts.length = 0;
    }
    if (this._connectedInputTexts.length === 0) {
      this._currentlyConnectedInputText = null;
      this.onKeyPressObservable.remove(this._onKeyPressObserver);
      this._onKeyPressObserver = null;
    }
  }
  _removeConnectedInputObservables(connectedInputText) {
    connectedInputText.input._connectedVirtualKeyboard = null;
    connectedInputText.input.onFocusObservable.remove(connectedInputText.onFocusObserver);
    connectedInputText.input.onBlurObservable.remove(connectedInputText.onBlurObserver);
  }
  /**
   * Release all resources
   */
  dispose() {
    super.dispose();
    this.disconnect();
  }
  // Statics
  /**
   * Creates a new keyboard using a default layout
   *
   * @param name defines control name
   * @returns a new VirtualKeyboard
   */
  static CreateDefaultLayout(name22) {
    const returnValue = new _VirtualKeyboard(name22);
    returnValue.addKeysRow(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←"]);
    returnValue.addKeysRow(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]);
    returnValue.addKeysRow(["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "↵"]);
    returnValue.addKeysRow(["⇧", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]);
    returnValue.addKeysRow([" "], [{ width: "200px" }]);
    return returnValue;
  }
  /**
   * @internal
   */
  _parseFromContent(serializedObject, host) {
    super._parseFromContent(serializedObject, host);
    for (const row of this.children) {
      if (row.getClassName() === "StackPanel") {
        const stackPanel = row;
        for (const key of stackPanel.children) {
          if (key.getClassName() === "Button" && key.name) {
            key.onPointerUpObservable.add(() => {
              this.onKeyPressObservable.notifyObservers(key.name);
            });
          }
        }
      }
    }
  }
};
RegisterClass("BABYLON.GUI.VirtualKeyboard", VirtualKeyboard);

// node_modules/@babylonjs/gui/2D/controls/displayGrid.js
var DisplayGrid = class extends Control {
  /** Gets or sets a boolean indicating if minor lines must be rendered (true by default)) */
  get displayMinorLines() {
    return this._displayMinorLines;
  }
  set displayMinorLines(value) {
    if (this._displayMinorLines === value) {
      return;
    }
    this._displayMinorLines = value;
    this._markAsDirty();
  }
  /** Gets or sets a boolean indicating if major lines must be rendered (true by default)) */
  get displayMajorLines() {
    return this._displayMajorLines;
  }
  set displayMajorLines(value) {
    if (this._displayMajorLines === value) {
      return;
    }
    this._displayMajorLines = value;
    this._markAsDirty();
  }
  /** Gets or sets background color (Black by default) */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this._markAsDirty();
  }
  /** Gets or sets the width of each cell (20 by default) */
  get cellWidth() {
    return this._cellWidth;
  }
  set cellWidth(value) {
    this._cellWidth = value;
    this._markAsDirty();
  }
  /** Gets or sets the height of each cell (20 by default) */
  get cellHeight() {
    return this._cellHeight;
  }
  set cellHeight(value) {
    this._cellHeight = value;
    this._markAsDirty();
  }
  /** Gets or sets the tickness of minor lines (1 by default) */
  get minorLineTickness() {
    return this._minorLineTickness;
  }
  set minorLineTickness(value) {
    this._minorLineTickness = value;
    this._markAsDirty();
  }
  /** Gets or sets the color of minor lines (DarkGray by default) */
  get minorLineColor() {
    return this._minorLineColor;
  }
  set minorLineColor(value) {
    this._minorLineColor = value;
    this._markAsDirty();
  }
  /** Gets or sets the tickness of major lines (2 by default) */
  get majorLineTickness() {
    return this._majorLineTickness;
  }
  set majorLineTickness(value) {
    this._majorLineTickness = value;
    this._markAsDirty();
  }
  /** Gets or sets the color of major lines (White by default) */
  get majorLineColor() {
    return this._majorLineColor;
  }
  set majorLineColor(value) {
    this._majorLineColor = value;
    this._markAsDirty();
  }
  /** Gets or sets the frequency of major lines (default is 1 every 5 minor lines)*/
  get majorLineFrequency() {
    return this._majorLineFrequency;
  }
  set majorLineFrequency(value) {
    this._majorLineFrequency = value;
    this._markAsDirty();
  }
  /**
   * Creates a new GridDisplayRectangle
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._cellWidth = 20;
    this._cellHeight = 20;
    this._minorLineTickness = 1;
    this._minorLineColor = "DarkGray";
    this._majorLineTickness = 2;
    this._majorLineColor = "White";
    this._majorLineFrequency = 5;
    this._background = "Black";
    this._displayMajorLines = true;
    this._displayMinorLines = true;
  }
  _draw(context) {
    context.save();
    this._applyStates(context);
    if (this._isEnabled) {
      if (this._background) {
        context.fillStyle = this._background;
        context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
      }
      const cellCountX = this._currentMeasure.width / this._cellWidth;
      const cellCountY = this._currentMeasure.height / this._cellHeight;
      const left = this._currentMeasure.left + this._currentMeasure.width / 2;
      const top = this._currentMeasure.top + this._currentMeasure.height / 2;
      if (this._displayMinorLines) {
        context.strokeStyle = this._minorLineColor;
        context.lineWidth = this._minorLineTickness;
        for (let x = -cellCountX / 2 + 1; x < cellCountX / 2; x++) {
          const cellX = left + x * this.cellWidth;
          context.beginPath();
          context.moveTo(cellX, this._currentMeasure.top);
          context.lineTo(cellX, this._currentMeasure.top + this._currentMeasure.height);
          context.stroke();
        }
        for (let y = -cellCountY / 2 + 1; y < cellCountY / 2; y++) {
          const cellY = top + y * this.cellHeight;
          context.beginPath();
          context.moveTo(this._currentMeasure.left, cellY);
          context.lineTo(this._currentMeasure.left + this._currentMeasure.width, cellY);
          context.stroke();
        }
      }
      if (this._displayMajorLines) {
        context.strokeStyle = this._majorLineColor;
        context.lineWidth = this._majorLineTickness;
        for (let x = -cellCountX / 2 + this._majorLineFrequency; x < cellCountX / 2; x += this._majorLineFrequency) {
          const cellX = left + x * this.cellWidth;
          context.beginPath();
          context.moveTo(cellX, this._currentMeasure.top);
          context.lineTo(cellX, this._currentMeasure.top + this._currentMeasure.height);
          context.stroke();
        }
        for (let y = -cellCountY / 2 + this._majorLineFrequency; y < cellCountY / 2; y += this._majorLineFrequency) {
          const cellY = top + y * this.cellHeight;
          context.moveTo(this._currentMeasure.left, cellY);
          context.lineTo(this._currentMeasure.left + this._currentMeasure.width, cellY);
          context.closePath();
          context.stroke();
        }
      }
    }
    context.restore();
  }
  _getTypeName() {
    return "DisplayGrid";
  }
};
__decorate([
  serialize()
], DisplayGrid.prototype, "displayMinorLines", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "displayMajorLines", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "background", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "cellWidth", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "cellHeight", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "minorLineTickness", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "minorLineColor", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "majorLineTickness", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "majorLineColor", null);
__decorate([
  serialize()
], DisplayGrid.prototype, "majorLineFrequency", null);
RegisterClass("BABYLON.GUI.DisplayGrid", DisplayGrid);

// node_modules/@babylonjs/gui/2D/controls/sliders/imageBasedSlider.js
var ImageBasedSlider = class extends BaseSlider {
  get displayThumb() {
    return this._displayThumb && this.thumbImage != null;
  }
  set displayThumb(value) {
    if (this._displayThumb === value) {
      return;
    }
    this._displayThumb = value;
    this._markAsDirty();
  }
  /**
   * Gets or sets the image used to render the background
   */
  get backgroundImage() {
    return this._backgroundImage;
  }
  set backgroundImage(value) {
    if (this._backgroundImage === value) {
      return;
    }
    this._backgroundImage = value;
    if (value && !value.isLoaded) {
      value.onImageLoadedObservable.addOnce(() => this._markAsDirty());
    }
    this._markAsDirty();
  }
  /**
   * Gets or sets the image used to render the value bar
   */
  get valueBarImage() {
    return this._valueBarImage;
  }
  set valueBarImage(value) {
    if (this._valueBarImage === value) {
      return;
    }
    this._valueBarImage = value;
    if (value && !value.isLoaded) {
      value.onImageLoadedObservable.addOnce(() => this._markAsDirty());
    }
    this._markAsDirty();
  }
  /**
   * Gets or sets the image used to render the thumb
   */
  get thumbImage() {
    return this._thumbImage;
  }
  set thumbImage(value) {
    if (this._thumbImage === value) {
      return;
    }
    this._thumbImage = value;
    if (value && !value.isLoaded) {
      value.onImageLoadedObservable.addOnce(() => this._markAsDirty());
    }
    this._markAsDirty();
  }
  /**
   * Creates a new ImageBasedSlider
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.name = name22;
    this._tempMeasure = new Measure(0, 0, 0, 0);
  }
  _getTypeName() {
    return "ImageBasedSlider";
  }
  _draw(context) {
    context.save();
    this._applyStates(context);
    this._prepareRenderingData("rectangle");
    const thumbPosition = this._getThumbPosition();
    const left = this._renderLeft;
    const top = this._renderTop;
    const width = this._renderWidth;
    const height = this._renderHeight;
    if (this._backgroundImage) {
      this._tempMeasure.copyFromFloats(left, top, width, height);
      if (this.isThumbClamped && this.displayThumb) {
        if (this.isVertical) {
          this._tempMeasure.height += this._effectiveThumbThickness;
        } else {
          this._tempMeasure.width += this._effectiveThumbThickness;
        }
      }
      this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure);
      this._backgroundImage._draw(context);
    }
    if (this._valueBarImage) {
      if (this.isVertical) {
        if (this.isThumbClamped && this.displayThumb) {
          this._tempMeasure.copyFromFloats(left, top + thumbPosition, width, height - thumbPosition + this._effectiveThumbThickness);
        } else {
          this._tempMeasure.copyFromFloats(left, top + thumbPosition, width, height - thumbPosition);
        }
      } else {
        if (this.isThumbClamped && this.displayThumb) {
          this._tempMeasure.copyFromFloats(left, top, thumbPosition + this._effectiveThumbThickness / 2, height);
        } else {
          this._tempMeasure.copyFromFloats(left, top, thumbPosition, height);
        }
      }
      this._valueBarImage._currentMeasure.copyFrom(this._tempMeasure);
      this._valueBarImage._draw(context);
    }
    if (this.displayThumb) {
      if (this.isVertical) {
        this._tempMeasure.copyFromFloats(left - this._effectiveBarOffset, this._currentMeasure.top + thumbPosition, this._currentMeasure.width, this._effectiveThumbThickness);
      } else {
        this._tempMeasure.copyFromFloats(this._currentMeasure.left + thumbPosition, this._currentMeasure.top, this._effectiveThumbThickness, this._currentMeasure.height);
      }
      this._thumbImage._currentMeasure.copyFrom(this._tempMeasure);
      this._thumbImage._draw(context);
    }
    context.restore();
  }
  /**
   * Serializes the current control
   * @param serializationObject defined the JSON serialized object
   */
  serialize(serializationObject) {
    super.serialize(serializationObject);
    const backgroundImage = {};
    const thumbImage = {};
    const valueBarImage = {};
    this.backgroundImage.serialize(backgroundImage);
    this.thumbImage.serialize(thumbImage);
    this.valueBarImage.serialize(valueBarImage);
    serializationObject.backgroundImage = backgroundImage;
    serializationObject.thumbImage = thumbImage;
    serializationObject.valueBarImage = valueBarImage;
  }
  /**
   * @internal
   */
  _parseFromContent(serializedObject, host) {
    super._parseFromContent(serializedObject, host);
    this.backgroundImage = Image.Parse(serializedObject.backgroundImage, host);
    this.thumbImage = Image.Parse(serializedObject.thumbImage, host);
    this.valueBarImage = Image.Parse(serializedObject.valueBarImage, host);
  }
};
__decorate([
  serialize()
], ImageBasedSlider.prototype, "displayThumb", null);
RegisterClass("BABYLON.GUI.ImageBasedSlider", ImageBasedSlider);

// node_modules/@babylonjs/gui/2D/controls/statics.js
var name = "Statics";
Control.AddHeader = function(control, text, size, options) {
  const panel = new StackPanel("panel");
  const isHorizontal = options ? options.isHorizontal : true;
  const controlFirst = options ? options.controlFirst : true;
  panel.isVertical = !isHorizontal;
  const header = new TextBlock("header");
  header.text = text;
  header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  if (isHorizontal) {
    header.width = size;
  } else {
    header.height = size;
  }
  if (controlFirst) {
    panel.addControl(control);
    panel.addControl(header);
    header.paddingLeft = "5px";
  } else {
    panel.addControl(header);
    panel.addControl(control);
    header.paddingRight = "5px";
  }
  header.shadowBlur = control.shadowBlur;
  header.shadowColor = control.shadowColor;
  header.shadowOffsetX = control.shadowOffsetX;
  header.shadowOffsetY = control.shadowOffsetY;
  return panel;
};

// node_modules/@babylonjs/gui/2D/controls/gradient/BaseGradient.js
var BaseGradient = class {
  constructor() {
    this._colorStops = [];
    this._gradientDirty = true;
  }
  _addColorStopsToCanvasGradient() {
    for (const stop of this._colorStops) {
      this._canvasGradient.addColorStop(stop.offset, stop.color);
    }
  }
  /**
   * If there are any changes or the context changed, regenerate the canvas gradient object. Else,
   * reuse the existing gradient.
   * @param context the context to create the gradient from
   * @returns the canvas gradient
   */
  getCanvasGradient(context) {
    if (this._gradientDirty || this._context !== context) {
      this._context = context;
      this._canvasGradient = this._createCanvasGradient(context);
      this._addColorStopsToCanvasGradient();
      this._gradientDirty = false;
    }
    return this._canvasGradient;
  }
  /**
   * Adds a new color stop to the gradient.
   * @param offset the offset of the stop on the gradient. Should be between 0 and 1
   * @param color the color of the stop
   */
  addColorStop(offset, color) {
    this._colorStops.push({ offset, color });
    this._gradientDirty = true;
  }
  /**
   * Removes an existing color stop with the specified offset from the gradient
   * @param offset the offset of the stop to be removed
   */
  removeColorStop(offset) {
    this._colorStops = this._colorStops.filter((colorStop) => colorStop.offset !== offset);
    this._gradientDirty = true;
  }
  /**
   * Removes all color stops from the gradient
   */
  clearColorStops() {
    this._colorStops = [];
    this._gradientDirty = true;
  }
  /**
   * Color stops of the gradient
   */
  get colorStops() {
    return this._colorStops;
  }
  /**
   * @returns Type of the gradient
   */
  getClassName() {
    return "BaseGradient";
  }
  /**
   * Serialize into a json object
   * @param serializationObject object to serialize into
   */
  serialize(serializationObject) {
    serializationObject.colorStops = this._colorStops;
    serializationObject.className = this.getClassName();
  }
  /**
   * Parse from json object
   * @param serializationObject object to parse from
   */
  parse(serializationObject) {
    this._colorStops = serializationObject.colorStops;
  }
};

// node_modules/@babylonjs/gui/2D/controls/gradient/LinearGradient.js
var LinearGradient = class extends BaseGradient {
  /**
   * Creates a new linear gradient
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   */
  constructor(x0, y0, x1, y1) {
    super();
    this._x0 = x0 ?? 0;
    this._y0 = y0 ?? 0;
    this._x1 = x1 ?? 0;
    this._y1 = y1 ?? 0;
  }
  _createCanvasGradient(context) {
    return context.createLinearGradient(this._x0, this._y0, this._x1, this._y1);
  }
  /** X axis coordinate of the starting point in the line */
  get x0() {
    return this._x0;
  }
  /** X axis coordinate of the ending point in the line */
  get x1() {
    return this._x1;
  }
  /** Y axis coordinate of the starting point in the line */
  get y0() {
    return this._y0;
  }
  /** Y axis coordinate of the ending point in the line */
  get y1() {
    return this._y1;
  }
  /**
   * Class name of the gradient
   * @returns the class name of the gradient
   */
  getClassName() {
    return "LinearGradient";
  }
  /**
   * Serializes this gradient
   * @param serializationObject the object to serialize to
   */
  serialize(serializationObject) {
    super.serialize(serializationObject);
    serializationObject.x0 = this._x0;
    serializationObject.y0 = this._y0;
    serializationObject.x1 = this._x1;
    serializationObject.y1 = this._y1;
  }
  /**
   * Parses a gradient from a serialization object
   * @param serializationObject the object to parse from
   */
  parse(serializationObject) {
    super.parse(serializationObject);
    this._x0 = serializationObject.x0;
    this._y0 = serializationObject.y0;
    this._x1 = serializationObject.x1;
    this._y1 = serializationObject.y1;
  }
};
RegisterClass("BABYLON.GUI.LinearGradient", LinearGradient);

// node_modules/@babylonjs/gui/2D/controls/gradient/RadialGradient.js
var RadialGradient = class extends BaseGradient {
  /**
   * Creates a new radial gradient
   * @param x0 x coordinate of the first circle's center
   * @param y0 y coordinate of the first circle's center
   * @param r0 radius of the first circle
   * @param x1 x coordinate of the second circle's center
   * @param y1 y coordinate of the second circle's center
   * @param r1 radius of the second circle
   */
  constructor(x0, y0, r0, x1, y1, r1) {
    super();
    this._x0 = x0 ?? 0;
    this._y0 = y0 ?? 0;
    this._r0 = r0 ?? 0;
    this._x1 = x1 ?? 0;
    this._y1 = y1 ?? 0;
    this._r1 = r1 ?? 0;
  }
  _createCanvasGradient(context) {
    return context.createRadialGradient(this._x0, this._y0, this._r0, this._x1, this._y1, this._r1);
  }
  /** x coordinate of the first circle's center */
  get x0() {
    return this._x0;
  }
  /** x coordinate of the second circle's center */
  get x1() {
    return this._x1;
  }
  /** y coordinate of the first circle's center */
  get y0() {
    return this._y0;
  }
  /** y coordinate of the second circle's center */
  get y1() {
    return this._y1;
  }
  /** radius of the first circle */
  get r0() {
    return this._r0;
  }
  /** radius of the second circle */
  get r1() {
    return this._r1;
  }
  /**
   * Class name of the gradient
   * @returns the class name of the gradient
   */
  getClassName() {
    return "RadialGradient";
  }
  /**
   * Serializes this gradient
   * @param serializationObject the object to serialize to
   */
  serialize(serializationObject) {
    super.serialize(serializationObject);
    serializationObject.x0 = this._x0;
    serializationObject.y0 = this._y0;
    serializationObject.r0 = this._r0;
    serializationObject.x1 = this._x1;
    serializationObject.y1 = this._y1;
    serializationObject.r1 = this._r1;
  }
  /**
   * Parses a gradient from a serialization object
   * @param serializationObject the object to parse from
   */
  parse(serializationObject) {
    super.parse(serializationObject);
    this._x0 = serializationObject.x0;
    this._y0 = serializationObject.y0;
    this._r0 = serializationObject.r0;
    this._x1 = serializationObject.x1;
    this._y1 = serializationObject.y1;
    this._r1 = serializationObject.r1;
  }
};
RegisterClass("BABYLON.GUI.RadialGradient", RadialGradient);

// node_modules/@babylonjs/gui/2D/style.js
var Style = class {
  /**
   * Creates a new style object
   * @param host defines the AdvancedDynamicTexture which hosts this style
   */
  constructor(host) {
    this._fontFamily = "Arial";
    this._fontStyle = "";
    this._fontWeight = "";
    this._fontSize = new ValueAndUnit(18, ValueAndUnit.UNITMODE_PIXEL, false);
    this.onChangedObservable = new Observable();
    this._host = host;
  }
  /**
   * Gets or sets the font size
   */
  get fontSize() {
    return this._fontSize.toString(this._host);
  }
  set fontSize(value) {
    if (this._fontSize.toString(this._host) === value) {
      return;
    }
    if (this._fontSize.fromString(value)) {
      this.onChangedObservable.notifyObservers(this);
    }
  }
  /**
   * Gets or sets the font family
   */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(value) {
    if (this._fontFamily === value) {
      return;
    }
    this._fontFamily = value;
    this.onChangedObservable.notifyObservers(this);
  }
  /**
   * Gets or sets the font style
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(value) {
    if (this._fontStyle === value) {
      return;
    }
    this._fontStyle = value;
    this.onChangedObservable.notifyObservers(this);
  }
  /** Gets or sets font weight */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(value) {
    if (this._fontWeight === value) {
      return;
    }
    this._fontWeight = value;
    this.onChangedObservable.notifyObservers(this);
  }
  /** Dispose all associated resources */
  dispose() {
    this.onChangedObservable.clear();
  }
};

// node_modules/@babylonjs/gui/2D/advancedDynamicTexture.js
var AdvancedDynamicTexture = class _AdvancedDynamicTexture extends DynamicTexture {
  /** Gets the number of layout calls made the last time the ADT has been rendered */
  get numLayoutCalls() {
    return this._numLayoutCalls;
  }
  /** Gets the number of render calls made the last time the ADT has been rendered */
  get numRenderCalls() {
    return this._numRenderCalls;
  }
  /**
   * Gets or sets a number used to scale rendering size (2 means that the texture will be twice bigger).
   * Useful when you want more antialiasing
   */
  get renderScale() {
    return this._renderScale;
  }
  set renderScale(value) {
    if (value === this._renderScale) {
      return;
    }
    this._renderScale = value;
    this._onResize();
  }
  /** Gets or sets the background color */
  get background() {
    return this._background;
  }
  set background(value) {
    if (this._background === value) {
      return;
    }
    this._background = value;
    this.markAsDirty();
  }
  /**
   * Gets or sets the ideal width used to design controls.
   * The GUI will then rescale everything accordingly
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
   */
  get idealWidth() {
    return this._idealWidth;
  }
  set idealWidth(value) {
    if (this._idealWidth === value) {
      return;
    }
    this._idealWidth = value;
    this.markAsDirty();
    this._rootContainer._markAllAsDirty();
  }
  /**
   * Gets or sets the ideal height used to design controls.
   * The GUI will then rescale everything accordingly
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
   */
  get idealHeight() {
    return this._idealHeight;
  }
  set idealHeight(value) {
    if (this._idealHeight === value) {
      return;
    }
    this._idealHeight = value;
    this.markAsDirty();
    this._rootContainer._markAllAsDirty();
  }
  /**
   * Gets or sets a boolean indicating if the smallest ideal value must be used if idealWidth and idealHeight are both set
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
   */
  get useSmallestIdeal() {
    return this._useSmallestIdeal;
  }
  set useSmallestIdeal(value) {
    if (this._useSmallestIdeal === value) {
      return;
    }
    this._useSmallestIdeal = value;
    this.markAsDirty();
    this._rootContainer._markAllAsDirty();
  }
  /**
   * Gets or sets a boolean indicating if adaptive scaling must be used
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
   */
  get renderAtIdealSize() {
    return this._renderAtIdealSize;
  }
  set renderAtIdealSize(value) {
    if (this._renderAtIdealSize === value) {
      return;
    }
    this._renderAtIdealSize = value;
    this._onResize();
  }
  /**
   * Gets the ratio used when in "ideal mode"
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
   * */
  get idealRatio() {
    let rwidth = 0;
    let rheight = 0;
    if (this._idealWidth) {
      rwidth = this.getSize().width / this._idealWidth;
    }
    if (this._idealHeight) {
      rheight = this.getSize().height / this._idealHeight;
    }
    if (this._useSmallestIdeal && this._idealWidth && this._idealHeight) {
      return window.innerWidth < window.innerHeight ? rwidth : rheight;
    }
    if (this._idealWidth) {
      return rwidth;
    }
    if (this._idealHeight) {
      return rheight;
    }
    return 1;
  }
  /**
   * Gets the underlying layer used to render the texture when in fullscreen mode
   */
  get layer() {
    return this._layerToDispose;
  }
  /**
   * Gets the root container control
   */
  get rootContainer() {
    return this._rootContainer;
  }
  /**
   * Returns an array containing the root container.
   * This is mostly used to let the Inspector introspects the ADT
   * @returns an array containing the rootContainer
   */
  getChildren() {
    return [this._rootContainer];
  }
  /**
   * Will return all controls that are inside this texture
   * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
   * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
   * @returns all child controls
   */
  getDescendants(directDescendantsOnly, predicate) {
    return this._rootContainer.getDescendants(directDescendantsOnly, predicate);
  }
  /**
   * Will return all controls with the given type name
   * @param typeName defines the type name to search for
   * @returns an array of all controls found
   */
  getControlsByType(typeName) {
    return this._rootContainer.getDescendants(false, (control) => control.typeName === typeName);
  }
  /**
   * Will return the first control with the given name
   * @param name defines the name to search for
   * @returns the first control found or null
   */
  getControlByName(name22) {
    return this._getControlByKey("name", name22);
  }
  _getControlByKey(key, value) {
    return this._rootContainer.getDescendants().find((control) => control[key] === value) || null;
  }
  /**
   * Gets or sets the current focused control
   */
  get focusedControl() {
    return this._focusedControl;
  }
  set focusedControl(control) {
    if (this._focusedControl == control) {
      return;
    }
    if (this._focusedControl) {
      this._focusedControl.onBlur();
    }
    if (control) {
      control.onFocus();
    }
    this._focusedControl = control;
  }
  /**
   * Gets or sets a boolean indicating if the texture must be rendered in background or foreground when in fullscreen mode
   */
  get isForeground() {
    if (!this.layer) {
      return true;
    }
    return !this.layer.isBackground;
  }
  set isForeground(value) {
    if (!this.layer) {
      return;
    }
    if (this.layer.isBackground === !value) {
      return;
    }
    this.layer.isBackground = !value;
  }
  /**
   * Gets or set information about clipboardData
   */
  get clipboardData() {
    return this._clipboardData;
  }
  set clipboardData(value) {
    this._clipboardData = value;
  }
  /**
   * Creates a new AdvancedDynamicTexture
   * @param name defines the name of the texture
   * @param width defines the width of the texture
   * @param height defines the height of the texture
   * @param scene defines the hosting scene
   * @param generateMipMaps defines a boolean indicating if mipmaps must be generated (false by default)
   * @param samplingMode defines the texture sampling mode (Texture.NEAREST_SAMPLINGMODE by default)
   * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
   */
  constructor(name22, width = 0, height = 0, scene, generateMipMaps = false, samplingMode = Texture.NEAREST_SAMPLINGMODE, invertY = true) {
    super(name22, { width, height }, scene, generateMipMaps, samplingMode, Constants.TEXTUREFORMAT_RGBA, invertY);
    this.onGuiReadyObservable = new Observable();
    this._isDirty = false;
    this._rootContainer = new Container("root");
    this._lastControlOver = {};
    this._lastControlDown = {};
    this._capturingControl = {};
    this._linkedControls = new Array();
    this._isFullscreen = false;
    this._fullscreenViewport = new Viewport(0, 0, 1, 1);
    this._idealWidth = 0;
    this._idealHeight = 0;
    this._useSmallestIdeal = false;
    this._renderAtIdealSize = false;
    this._blockNextFocusCheck = false;
    this._renderScale = 1;
    this._cursorChanged = false;
    this._defaultMousePointerId = 0;
    this._rootChildrenHaveChanged = false;
    this._capturedPointerIds = /* @__PURE__ */ new Set();
    this._numLayoutCalls = 0;
    this._numRenderCalls = 0;
    this._clipboardData = "";
    this.onClipboardObservable = new Observable();
    this.onControlPickedObservable = new Observable();
    this.onBeginLayoutObservable = new Observable();
    this.onEndLayoutObservable = new Observable();
    this.onBeginRenderObservable = new Observable();
    this.onEndRenderObservable = new Observable();
    this.premulAlpha = false;
    this.applyYInversionOnUpdate = true;
    this.skipBlockEvents = 0;
    this.checkPointerEveryFrame = false;
    this._useInvalidateRectOptimization = true;
    this._invalidatedRectangle = null;
    this._clearMeasure = new Measure(0, 0, 0, 0);
    this._onClipboardCopy = (rawEvt) => {
      const evt = rawEvt;
      const ev = new ClipboardInfo(ClipboardEventTypes.COPY, evt);
      this.onClipboardObservable.notifyObservers(ev);
      evt.preventDefault();
    };
    this._onClipboardCut = (rawEvt) => {
      const evt = rawEvt;
      const ev = new ClipboardInfo(ClipboardEventTypes.CUT, evt);
      this.onClipboardObservable.notifyObservers(ev);
      evt.preventDefault();
    };
    this._onClipboardPaste = (rawEvt) => {
      const evt = rawEvt;
      const ev = new ClipboardInfo(ClipboardEventTypes.PASTE, evt);
      this.onClipboardObservable.notifyObservers(ev);
      evt.preventDefault();
    };
    this.parseContent = this.parseSerializedObject;
    scene = this.getScene();
    if (!scene || !this._texture) {
      return;
    }
    this.applyYInversionOnUpdate = invertY;
    this._rootElement = scene.getEngine().getInputElement();
    this._renderObserver = scene.onBeforeCameraRenderObservable.add((camera) => this._checkUpdate(camera));
    this._controlAddedObserver = this._rootContainer.onControlAddedObservable.add((control) => {
      if (control) {
        this._rootChildrenHaveChanged = true;
      }
    });
    this._controlRemovedObserver = this._rootContainer.onControlRemovedObservable.add((control) => {
      if (control) {
        this._rootChildrenHaveChanged = true;
      }
    });
    this._preKeyboardObserver = scene.onPreKeyboardObservable.add((info) => {
      if (!this._focusedControl) {
        return;
      }
      if (info.type === KeyboardEventTypes.KEYDOWN) {
        this._focusedControl.processKeyboard(info.event);
      }
      info.skipOnPointerObservable = true;
    });
    this._rootContainer._link(this);
    this.hasAlpha = true;
    if (!width || !height) {
      this._resizeObserver = scene.getEngine().onResizeObservable.add(() => this._onResize());
      this._onResize();
    }
    this._texture.isReady = true;
  }
  /**
   * Get the current class name of the texture useful for serialization or dynamic coding.
   * @returns "AdvancedDynamicTexture"
   */
  getClassName() {
    return "AdvancedDynamicTexture";
  }
  /**
   * Function used to execute a function on all controls
   * @param func defines the function to execute
   * @param container defines the container where controls belong. If null the root container will be used
   */
  executeOnAllControls(func, container) {
    if (!container) {
      container = this._rootContainer;
    }
    func(container);
    for (const child of container.children) {
      if (child.children) {
        this.executeOnAllControls(func, child);
        continue;
      }
      func(child);
    }
  }
  /**
   * Gets or sets a boolean indicating if the InvalidateRect optimization should be turned on
   */
  get useInvalidateRectOptimization() {
    return this._useInvalidateRectOptimization;
  }
  set useInvalidateRectOptimization(value) {
    this._useInvalidateRectOptimization = value;
  }
  /**
   * Invalidates a rectangle area on the gui texture
   * @param invalidMinX left most position of the rectangle to invalidate in the texture
   * @param invalidMinY top most position of the rectangle to invalidate in the texture
   * @param invalidMaxX right most position of the rectangle to invalidate in the texture
   * @param invalidMaxY bottom most position of the rectangle to invalidate in the texture
   */
  invalidateRect(invalidMinX, invalidMinY, invalidMaxX, invalidMaxY) {
    if (!this._useInvalidateRectOptimization) {
      return;
    }
    if (!this._invalidatedRectangle) {
      this._invalidatedRectangle = new Measure(invalidMinX, invalidMinY, invalidMaxX - invalidMinX + 1, invalidMaxY - invalidMinY + 1);
    } else {
      const maxX = Math.ceil(Math.max(this._invalidatedRectangle.left + this._invalidatedRectangle.width - 1, invalidMaxX));
      const maxY = Math.ceil(Math.max(this._invalidatedRectangle.top + this._invalidatedRectangle.height - 1, invalidMaxY));
      this._invalidatedRectangle.left = Math.floor(Math.min(this._invalidatedRectangle.left, invalidMinX));
      this._invalidatedRectangle.top = Math.floor(Math.min(this._invalidatedRectangle.top, invalidMinY));
      this._invalidatedRectangle.width = maxX - this._invalidatedRectangle.left + 1;
      this._invalidatedRectangle.height = maxY - this._invalidatedRectangle.top + 1;
    }
  }
  /**
   * Marks the texture as dirty forcing a complete update
   */
  markAsDirty() {
    this._isDirty = true;
  }
  /**
   * Helper function used to create a new style
   * @returns a new style
   * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#styles
   */
  createStyle() {
    return new Style(this);
  }
  /**
   * Adds a new control to the root container
   * @param control defines the control to add
   * @returns the current texture
   */
  addControl(control) {
    this._rootContainer.addControl(control);
    return this;
  }
  /**
   * Removes a control from the root container
   * @param control defines the control to remove
   * @returns the current texture
   */
  removeControl(control) {
    this._rootContainer.removeControl(control);
    return this;
  }
  /**
   * Moves overlapped controls towards a position where it is not overlapping anymore.
   * Please note that this method alters linkOffsetXInPixels and linkOffsetYInPixels.
   * @param overlapGroup the overlap group which will be processed or undefined to process all overlap groups
   * @param deltaStep the step size (speed) to reach the target non overlapping position (default 0.1)
   * @param repelFactor how much is the control repelled by other controls
   */
  moveToNonOverlappedPosition(overlapGroup, deltaStep = 1, repelFactor = 1) {
    let controlsForGroup;
    if (Array.isArray(overlapGroup)) {
      controlsForGroup = overlapGroup;
    } else {
      const descendants = this.getDescendants(true);
      controlsForGroup = overlapGroup === void 0 ? descendants.filter((c) => c.overlapGroup !== void 0) : descendants.filter((c) => c.overlapGroup === overlapGroup);
    }
    controlsForGroup.forEach((control1) => {
      let velocity = Vector2.Zero();
      const center = new Vector2(control1.centerX, control1.centerY);
      controlsForGroup.forEach((control2) => {
        if (control1 !== control2 && _AdvancedDynamicTexture._Overlaps(control1, control2)) {
          const diff = center.subtract(new Vector2(control2.centerX, control2.centerY));
          const diffLength = diff.length();
          if (diffLength > 0) {
            velocity = velocity.add(diff.normalize().scale(repelFactor / diffLength));
          }
        }
      });
      if (velocity.length() > 0) {
        velocity = velocity.normalize().scale(deltaStep * (control1.overlapDeltaMultiplier ?? 1));
        control1.linkOffsetXInPixels += velocity.x;
        control1.linkOffsetYInPixels += velocity.y;
      }
    });
  }
  /**
   * Release all resources
   */
  dispose() {
    const scene = this.getScene();
    if (!scene) {
      return;
    }
    this._rootElement = null;
    scene.onBeforeCameraRenderObservable.remove(this._renderObserver);
    if (this._resizeObserver) {
      scene.getEngine().onResizeObservable.remove(this._resizeObserver);
    }
    if (this._prePointerObserver) {
      scene.onPrePointerObservable.remove(this._prePointerObserver);
    }
    if (this._sceneRenderObserver) {
      scene.onBeforeRenderObservable.remove(this._sceneRenderObserver);
    }
    if (this._pointerObserver) {
      scene.onPointerObservable.remove(this._pointerObserver);
    }
    if (this._preKeyboardObserver) {
      scene.onPreKeyboardObservable.remove(this._preKeyboardObserver);
    }
    if (this._canvasPointerOutObserver) {
      scene.getEngine().onCanvasPointerOutObservable.remove(this._canvasPointerOutObserver);
    }
    if (this._canvasBlurObserver) {
      scene.getEngine().onCanvasBlurObservable.remove(this._canvasBlurObserver);
    }
    if (this._controlAddedObserver) {
      this._rootContainer.onControlAddedObservable.remove(this._controlAddedObserver);
    }
    if (this._controlRemovedObserver) {
      this._rootContainer.onControlRemovedObservable.remove(this._controlRemovedObserver);
    }
    if (this._layerToDispose) {
      this._layerToDispose.texture = null;
      this._layerToDispose.dispose();
      this._layerToDispose = null;
    }
    this._rootContainer.dispose();
    this.onClipboardObservable.clear();
    this.onControlPickedObservable.clear();
    this.onBeginRenderObservable.clear();
    this.onEndRenderObservable.clear();
    this.onBeginLayoutObservable.clear();
    this.onEndLayoutObservable.clear();
    this.onGuiReadyObservable.clear();
    super.dispose();
  }
  _onResize() {
    const scene = this.getScene();
    if (!scene) {
      return;
    }
    const engine = scene.getEngine();
    const textureSize = this.getSize();
    let renderWidth = engine.getRenderWidth() * this._renderScale;
    let renderHeight = engine.getRenderHeight() * this._renderScale;
    if (this._renderAtIdealSize) {
      if (this._idealWidth) {
        renderHeight = renderHeight * this._idealWidth / renderWidth;
        renderWidth = this._idealWidth;
      } else if (this._idealHeight) {
        renderWidth = renderWidth * this._idealHeight / renderHeight;
        renderHeight = this._idealHeight;
      }
    }
    if (textureSize.width !== renderWidth || textureSize.height !== renderHeight) {
      this.scaleTo(renderWidth, renderHeight);
      this.markAsDirty();
      if (this._idealWidth || this._idealHeight) {
        this._rootContainer._markAllAsDirty();
      }
    }
    this.invalidateRect(0, 0, textureSize.width - 1, textureSize.height - 1);
  }
  /** @internal */
  _getGlobalViewport() {
    const size = this.getSize();
    const globalViewPort = this._fullscreenViewport.toGlobal(size.width, size.height);
    const targetX = Math.round(globalViewPort.width * (1 / this.rootContainer.scaleX));
    const targetY = Math.round(globalViewPort.height * (1 / this.rootContainer.scaleY));
    globalViewPort.x += (globalViewPort.width - targetX) / 2;
    globalViewPort.y += (globalViewPort.height - targetY) / 2;
    globalViewPort.width = targetX;
    globalViewPort.height = targetY;
    return globalViewPort;
  }
  /**
   * Get screen coordinates for a vector3
   * @param position defines the position to project
   * @param worldMatrix defines the world matrix to use
   * @returns the projected position
   */
  getProjectedPosition(position, worldMatrix) {
    const result = this.getProjectedPositionWithZ(position, worldMatrix);
    return new Vector2(result.x, result.y);
  }
  /**
   * Get screen coordinates for a vector3
   * @param position defines the position to project
   * @param worldMatrix defines the world matrix to use
   * @returns the projected position with Z
   */
  getProjectedPositionWithZ(position, worldMatrix) {
    const scene = this.getScene();
    if (!scene) {
      return Vector3.Zero();
    }
    const globalViewport = this._getGlobalViewport();
    const projectedPosition = Vector3.Project(position, worldMatrix, scene.getTransformMatrix(), globalViewport);
    return new Vector3(projectedPosition.x, projectedPosition.y, projectedPosition.z);
  }
  _checkUpdate(camera, skipUpdate) {
    if (this._layerToDispose) {
      if ((camera.layerMask & this._layerToDispose.layerMask) === 0) {
        return;
      }
    }
    if (this._isFullscreen && this._linkedControls.length) {
      const scene = this.getScene();
      if (!scene) {
        return;
      }
      const globalViewport = this._getGlobalViewport();
      for (const control of this._linkedControls) {
        if (!control.isVisible) {
          continue;
        }
        const mesh = control._linkedMesh;
        if (!mesh || mesh.isDisposed()) {
          Tools.SetImmediate(() => {
            control.linkWithMesh(null);
          });
          continue;
        }
        const position = mesh.getBoundingInfo ? mesh.getBoundingInfo().boundingSphere.center : Vector3.ZeroReadOnly;
        const projectedPosition = Vector3.Project(position, mesh.getWorldMatrix(), scene.getTransformMatrix(), globalViewport);
        if (projectedPosition.z < 0 || projectedPosition.z > 1) {
          control.notRenderable = true;
          continue;
        }
        control.notRenderable = false;
        if (this.useInvalidateRectOptimization) {
          control.invalidateRect();
        }
        control._moveToProjectedPosition(projectedPosition);
      }
    }
    if (!this._isDirty && !this._rootContainer.isDirty) {
      return;
    }
    this._isDirty = false;
    this._render(skipUpdate);
    if (!skipUpdate) {
      this.update(this.applyYInversionOnUpdate, this.premulAlpha, _AdvancedDynamicTexture.AllowGPUOptimizations);
    }
  }
  _render(skipRender) {
    var _a;
    const textureSize = this.getSize();
    const renderWidth = textureSize.width;
    const renderHeight = textureSize.height;
    const context = this.getContext();
    context.font = "18px Arial";
    context.strokeStyle = "white";
    if (this.onGuiReadyObservable.hasObservers()) {
      this._checkGuiIsReady();
    }
    if (this._rootChildrenHaveChanged) {
      const camera = (_a = this.getScene()) == null ? void 0 : _a.activeCamera;
      if (camera) {
        this._rootChildrenHaveChanged = false;
        this._checkUpdate(camera, true);
      }
    }
    this.onBeginLayoutObservable.notifyObservers(this);
    const measure = new Measure(0, 0, renderWidth, renderHeight);
    this._numLayoutCalls = 0;
    this._rootContainer._layout(measure, context);
    this.onEndLayoutObservable.notifyObservers(this);
    this._isDirty = false;
    if (skipRender) {
      return;
    }
    if (this._invalidatedRectangle) {
      this._clearMeasure.copyFrom(this._invalidatedRectangle);
    } else {
      this._clearMeasure.copyFromFloats(0, 0, renderWidth, renderHeight);
    }
    context.clearRect(this._clearMeasure.left, this._clearMeasure.top, this._clearMeasure.width, this._clearMeasure.height);
    if (this._background) {
      context.save();
      context.fillStyle = this._background;
      context.fillRect(this._clearMeasure.left, this._clearMeasure.top, this._clearMeasure.width, this._clearMeasure.height);
      context.restore();
    }
    this.onBeginRenderObservable.notifyObservers(this);
    this._numRenderCalls = 0;
    this._rootContainer._render(context, this._invalidatedRectangle);
    this.onEndRenderObservable.notifyObservers(this);
    this._invalidatedRectangle = null;
  }
  /**
   * @internal
   */
  _changeCursor(cursor) {
    if (this._rootElement) {
      this._rootElement.style.cursor = cursor;
      this._cursorChanged = true;
    }
  }
  /**
   * @internal
   */
  _registerLastControlDown(control, pointerId) {
    this._lastControlDown[pointerId] = control;
    this.onControlPickedObservable.notifyObservers(control);
  }
  _doPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
    const scene = this.getScene();
    if (!scene) {
      return;
    }
    const engine = scene.getEngine();
    const textureSize = this.getSize();
    if (this._isFullscreen) {
      const camera = scene.cameraToUseForPointers || scene.activeCamera;
      if (!camera) {
        return;
      }
      const viewport = camera.viewport;
      x = x * (textureSize.width / (engine.getRenderWidth() * viewport.width));
      y = y * (textureSize.height / (engine.getRenderHeight() * viewport.height));
    }
    if (this._capturingControl[pointerId]) {
      if (this._capturingControl[pointerId].isPointerBlocker) {
        this._shouldBlockPointer = true;
      }
      this._capturingControl[pointerId]._processObservables(type, x, y, pi, pointerId, buttonIndex);
      return;
    }
    this._cursorChanged = false;
    if (!this._rootContainer._processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY)) {
      if (!scene.doNotHandleCursors) {
        this._changeCursor("");
      }
      if (type === PointerEventTypes.POINTERMOVE) {
        if (this._lastControlOver[pointerId]) {
          this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId], pi);
          delete this._lastControlOver[pointerId];
        }
      }
    }
    if (!this._cursorChanged && !scene.doNotHandleCursors) {
      this._changeCursor("");
    }
    this._manageFocus();
  }
  /**
   * @internal
   */
  _cleanControlAfterRemovalFromList(list, control) {
    for (const pointerId in list) {
      if (!Object.prototype.hasOwnProperty.call(list, pointerId)) {
        continue;
      }
      const lastControlOver = list[pointerId];
      if (lastControlOver === control) {
        delete list[pointerId];
      }
    }
  }
  /**
   * @internal
   */
  _cleanControlAfterRemoval(control) {
    this._cleanControlAfterRemovalFromList(this._lastControlDown, control);
    this._cleanControlAfterRemovalFromList(this._lastControlOver, control);
  }
  /**
   * This function will run a pointer event on this ADT and will trigger any pointer events on any controls
   * This will work on a fullscreen ADT only. For mesh based ADT, simulate pointer events using the scene directly.
   * @param x pointer X on the canvas for the picking
   * @param y pointer Y on the canvas for the picking
   * @param pi optional pointer information
   */
  pick(x, y, pi = null) {
    if (this._isFullscreen && this._scene) {
      this._translateToPicking(this._scene, new Viewport(0, 0, 0, 0), pi, x, y);
    }
  }
  _translateToPicking(scene, tempViewport, pi, x = scene.pointerX, y = scene.pointerY) {
    const camera = scene.cameraToUseForPointers || scene.activeCamera;
    const engine = scene.getEngine();
    const originalCameraToUseForPointers = scene.cameraToUseForPointers;
    if (!camera) {
      tempViewport.x = 0;
      tempViewport.y = 0;
      tempViewport.width = engine.getRenderWidth();
      tempViewport.height = engine.getRenderHeight();
    } else {
      if (camera.rigCameras.length) {
        const rigViewport = new Viewport(0, 0, 1, 1);
        camera.rigCameras.forEach((rigCamera) => {
          rigCamera.viewport.toGlobalToRef(engine.getRenderWidth(), engine.getRenderHeight(), rigViewport);
          const transformedX2 = x / engine.getHardwareScalingLevel() - rigViewport.x;
          const transformedY2 = y / engine.getHardwareScalingLevel() - (engine.getRenderHeight() - rigViewport.y - rigViewport.height);
          if (transformedX2 < 0 || transformedY2 < 0 || x > rigViewport.width || y > rigViewport.height) {
            return;
          }
          scene.cameraToUseForPointers = rigCamera;
          tempViewport.x = rigViewport.x;
          tempViewport.y = rigViewport.y;
          tempViewport.width = rigViewport.width;
          tempViewport.height = rigViewport.height;
        });
      } else {
        camera.viewport.toGlobalToRef(engine.getRenderWidth(), engine.getRenderHeight(), tempViewport);
      }
    }
    const transformedX = x / engine.getHardwareScalingLevel() - tempViewport.x;
    const transformedY = y / engine.getHardwareScalingLevel() - (engine.getRenderHeight() - tempViewport.y - tempViewport.height);
    this._shouldBlockPointer = false;
    if (pi) {
      const pointerId = pi.event.pointerId || this._defaultMousePointerId;
      this._doPicking(transformedX, transformedY, pi, pi.type, pointerId, pi.event.button, pi.event.deltaX, pi.event.deltaY);
      if (this._shouldBlockPointer && !(pi.type & this.skipBlockEvents) || this._capturingControl[pointerId]) {
        pi.skipOnPointerObservable = true;
      }
    } else {
      this._doPicking(transformedX, transformedY, null, PointerEventTypes.POINTERMOVE, this._defaultMousePointerId, 0);
    }
    scene.cameraToUseForPointers = originalCameraToUseForPointers;
  }
  /** Attach to all scene events required to support pointer events */
  attach() {
    const scene = this.getScene();
    if (!scene) {
      return;
    }
    const tempViewport = new Viewport(0, 0, 0, 0);
    this._prePointerObserver = scene.onPrePointerObservable.add((pi) => {
      if (scene.isPointerCaptured(pi.event.pointerId) && pi.type === PointerEventTypes.POINTERUP && !this._capturedPointerIds.has(pi.event.pointerId)) {
        return;
      }
      if (pi.type !== PointerEventTypes.POINTERMOVE && pi.type !== PointerEventTypes.POINTERUP && pi.type !== PointerEventTypes.POINTERDOWN && pi.type !== PointerEventTypes.POINTERWHEEL) {
        return;
      }
      if (pi.type === PointerEventTypes.POINTERMOVE) {
        if (scene.isPointerCaptured(pi.event.pointerId)) {
          return;
        }
        if (pi.event.pointerId) {
          this._defaultMousePointerId = pi.event.pointerId;
        }
      }
      this._translateToPicking(scene, tempViewport, pi);
    });
    this._attachPickingToSceneRender(scene, () => this._translateToPicking(scene, tempViewport, null), false);
    this._attachToOnPointerOut(scene);
    this._attachToOnBlur(scene);
  }
  /**
   * Register the clipboard Events onto the canvas
   */
  registerClipboardEvents() {
    self.addEventListener("copy", this._onClipboardCopy, false);
    self.addEventListener("cut", this._onClipboardCut, false);
    self.addEventListener("paste", this._onClipboardPaste, false);
  }
  /**
   * Unregister the clipboard Events from the canvas
   */
  unRegisterClipboardEvents() {
    self.removeEventListener("copy", this._onClipboardCopy);
    self.removeEventListener("cut", this._onClipboardCut);
    self.removeEventListener("paste", this._onClipboardPaste);
  }
  /**
   * Transform uvs from mesh space to texture space, taking the texture into account
   * @param uv the uvs in mesh space
   * @returns the uvs in texture space
   */
  _transformUvs(uv) {
    const textureMatrix = this.getTextureMatrix();
    let result;
    if (textureMatrix.isIdentityAs3x2()) {
      result = uv;
    } else {
      const homogeneousTextureMatrix = TmpVectors.Matrix[0];
      textureMatrix.getRowToRef(0, TmpVectors.Vector4[0]);
      textureMatrix.getRowToRef(1, TmpVectors.Vector4[1]);
      textureMatrix.getRowToRef(2, TmpVectors.Vector4[2]);
      const r0 = TmpVectors.Vector4[0];
      const r1 = TmpVectors.Vector4[1];
      const r2 = TmpVectors.Vector4[2];
      homogeneousTextureMatrix.setRowFromFloats(0, r0.x, r0.y, 0, 0);
      homogeneousTextureMatrix.setRowFromFloats(1, r1.x, r1.y, 0, 0);
      homogeneousTextureMatrix.setRowFromFloats(2, 0, 0, 1, 0);
      homogeneousTextureMatrix.setRowFromFloats(3, r2.x, r2.y, 0, 1);
      result = TmpVectors.Vector2[0];
      Vector2.TransformToRef(uv, homogeneousTextureMatrix, result);
    }
    if (this.wrapU === Texture.WRAP_ADDRESSMODE || this.wrapU === Texture.MIRROR_ADDRESSMODE) {
      if (result.x > 1) {
        let fX = result.x - Math.trunc(result.x);
        if (this.wrapU === Texture.MIRROR_ADDRESSMODE && Math.trunc(result.x) % 2 === 1) {
          fX = 1 - fX;
        }
        result.x = fX;
      }
    }
    if (this.wrapV === Texture.WRAP_ADDRESSMODE || this.wrapV === Texture.MIRROR_ADDRESSMODE) {
      if (result.y > 1) {
        let fY = result.y - Math.trunc(result.y);
        if (this.wrapV === Texture.MIRROR_ADDRESSMODE && Math.trunc(result.x) % 2 === 1) {
          fY = 1 - fY;
        }
        result.y = fY;
      }
    }
    return result;
  }
  /**
   * Connect the texture to a hosting mesh to enable interactions
   * @param mesh defines the mesh to attach to
   * @param supportPointerMove defines a boolean indicating if pointer move events must be catched as well
   */
  attachToMesh(mesh, supportPointerMove = true) {
    const scene = this.getScene();
    if (!scene) {
      return;
    }
    if (this._pointerObserver) {
      scene.onPointerObservable.remove(this._pointerObserver);
    }
    this._pointerObserver = scene.onPointerObservable.add((pi) => {
      if (pi.type !== PointerEventTypes.POINTERMOVE && pi.type !== PointerEventTypes.POINTERUP && pi.type !== PointerEventTypes.POINTERDOWN && pi.type !== PointerEventTypes.POINTERWHEEL) {
        return;
      }
      if (pi.type === PointerEventTypes.POINTERMOVE && pi.event.pointerId) {
        this._defaultMousePointerId = pi.event.pointerId;
      }
      const pointerId = pi.event.pointerId || this._defaultMousePointerId;
      if (pi.pickInfo && pi.pickInfo.hit && pi.pickInfo.pickedMesh === mesh) {
        let uv = pi.pickInfo.getTextureCoordinates();
        if (uv) {
          uv = this._transformUvs(uv);
          const size = this.getSize();
          this._doPicking(uv.x * size.width, (this.applyYInversionOnUpdate ? 1 - uv.y : uv.y) * size.height, pi, pi.type, pointerId, pi.event.button, pi.event.deltaX, pi.event.deltaY);
        }
      } else if (pi.type === PointerEventTypes.POINTERUP) {
        if (this._lastControlDown[pointerId]) {
          this._lastControlDown[pointerId]._forcePointerUp(pointerId);
        }
        delete this._lastControlDown[pointerId];
        if (this.focusedControl) {
          const friendlyControls = this.focusedControl.keepsFocusWith();
          let canMoveFocus = true;
          if (friendlyControls) {
            for (const control of friendlyControls) {
              if (this === control._host) {
                continue;
              }
              const otherHost = control._host;
              if (otherHost._lastControlOver[pointerId] && otherHost._lastControlOver[pointerId].isAscendant(control)) {
                canMoveFocus = false;
                break;
              }
            }
          }
          if (canMoveFocus) {
            this.focusedControl = null;
          }
        }
      } else if (pi.type === PointerEventTypes.POINTERMOVE) {
        if (this._lastControlOver[pointerId]) {
          this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId], pi, true);
        }
        delete this._lastControlOver[pointerId];
      }
    });
    mesh.enablePointerMoveEvents = supportPointerMove;
    this._attachPickingToSceneRender(scene, () => {
      const pointerId = this._defaultMousePointerId;
      const pick = scene == null ? void 0 : scene.pick(scene.pointerX, scene.pointerY);
      if (pick && pick.hit && pick.pickedMesh === mesh) {
        let uv = pick.getTextureCoordinates();
        if (uv) {
          uv = this._transformUvs(uv);
          const size = this.getSize();
          this._doPicking(uv.x * size.width, (this.applyYInversionOnUpdate ? 1 - uv.y : uv.y) * size.height, null, PointerEventTypes.POINTERMOVE, pointerId, 0);
        }
      } else {
        if (this._lastControlOver[pointerId]) {
          this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId], null, true);
        }
        delete this._lastControlOver[pointerId];
      }
    }, true);
    this._attachToOnPointerOut(scene);
    this._attachToOnBlur(scene);
  }
  /**
   * Move the focus to a specific control
   * @param control defines the control which will receive the focus
   */
  moveFocusToControl(control) {
    this.focusedControl = control;
    this._lastPickedControl = control;
    this._blockNextFocusCheck = true;
  }
  _manageFocus() {
    if (this._blockNextFocusCheck) {
      this._blockNextFocusCheck = false;
      this._lastPickedControl = this._focusedControl;
      return;
    }
    if (this._focusedControl) {
      if (this._focusedControl !== this._lastPickedControl) {
        if (this._lastPickedControl.isFocusInvisible) {
          return;
        }
        this.focusedControl = null;
      }
    }
  }
  _attachPickingToSceneRender(scene, pickFunction, forcePicking) {
    this._sceneRenderObserver = scene.onBeforeRenderObservable.add(() => {
      if (!this.checkPointerEveryFrame) {
        return;
      }
      if (this._linkedControls.length > 0 || forcePicking) {
        pickFunction();
      }
    });
  }
  _attachToOnPointerOut(scene) {
    this._canvasPointerOutObserver = scene.getEngine().onCanvasPointerOutObservable.add((pointerEvent) => {
      if (this._lastControlOver[pointerEvent.pointerId]) {
        this._lastControlOver[pointerEvent.pointerId]._onPointerOut(this._lastControlOver[pointerEvent.pointerId], null);
      }
      delete this._lastControlOver[pointerEvent.pointerId];
      if (this._lastControlDown[pointerEvent.pointerId] && this._lastControlDown[pointerEvent.pointerId] !== this._capturingControl[pointerEvent.pointerId]) {
        this._lastControlDown[pointerEvent.pointerId]._forcePointerUp(pointerEvent.pointerId);
        delete this._lastControlDown[pointerEvent.pointerId];
      }
    });
  }
  _attachToOnBlur(scene) {
    this._canvasBlurObserver = scene.getEngine().onCanvasBlurObservable.add(() => {
      Object.entries(this._lastControlDown).forEach(([, value]) => {
        value._onCanvasBlur();
      });
      this.focusedControl = null;
      this._lastControlDown = {};
    });
  }
  /**
   * Serializes the entire GUI system
   * @returns an object with the JSON serialized data
   */
  serializeContent() {
    const size = this.getSize();
    const serializationObject = {
      root: {},
      width: size.width,
      height: size.height
    };
    this._rootContainer.serialize(serializationObject.root);
    return serializationObject;
  }
  /**
   * Recreate the content of the ADT from a JSON object
   * @param serializedObject define the JSON serialized object to restore from
   * @param scaleToSize defines whether to scale to texture to the saved size
   */
  parseSerializedObject(serializedObject, scaleToSize) {
    this._rootContainer = Control.Parse(serializedObject.root, this);
    if (scaleToSize) {
      const width = serializedObject.width;
      const height = serializedObject.height;
      if (typeof width === "number" && typeof height === "number" && width >= 0 && height >= 0) {
        this.scaleTo(width, height);
      } else {
        this.scaleTo(1920, 1080);
      }
    }
  }
  /**
   * Clones the ADT. If no mesh is defined, the GUI will be considered as a fullscreen GUI
   * @param newName defines the name of the new ADT
   * @param attachToMesh defines if the new ADT should be attached to a mesh
   * @returns the clone of the ADT
   */
  clone(newName, attachToMesh) {
    const scene = this.getScene();
    if (!scene) {
      return this;
    }
    const size = this.getSize();
    const data = this.serializeContent();
    let clone;
    if (!this._isFullscreen) {
      if (attachToMesh) {
        clone = _AdvancedDynamicTexture.CreateForMesh(attachToMesh, size.width, size.height);
      } else {
        clone = new _AdvancedDynamicTexture(newName ?? "Clone of " + this.name, size.width, size.height, scene, !this.noMipmap, this.samplingMode);
      }
    } else {
      clone = _AdvancedDynamicTexture.CreateFullscreenUI(newName ?? "Clone of " + this.name);
    }
    clone.parseSerializedObject(data);
    return clone;
  }
  /**
   * Recreate the content of the ADT from a snippet saved by the GUI editor
   * @param snippetId defines the snippet to load
   * @param scaleToSize defines whether to scale to texture to the saved size
   * @param appendToAdt if provided the snippet will be appended to the adt. Otherwise a fullscreen ADT will be created.
   * @returns a promise that will resolve on success
   */
  static async ParseFromSnippetAsync(snippetId, scaleToSize, appendToAdt) {
    const adt = appendToAdt ?? _AdvancedDynamicTexture.CreateFullscreenUI("ADT from snippet");
    if (snippetId === "_BLANK") {
      return adt;
    }
    const serialized = await _AdvancedDynamicTexture._LoadURLContentAsync(_AdvancedDynamicTexture.SnippetUrl + "/" + snippetId.replace(/#/g, "/"), true);
    adt.parseSerializedObject(serialized, scaleToSize);
    return adt;
  }
  /**
   * Recreate the content of the ADT from a snippet saved by the GUI editor
   * @param snippetId defines the snippet to load
   * @param scaleToSize defines whether to scale to texture to the saved size
   * @returns a promise that will resolve on success
   */
  parseFromSnippetAsync(snippetId, scaleToSize) {
    return _AdvancedDynamicTexture.ParseFromSnippetAsync(snippetId, scaleToSize, this);
  }
  /**
   * Recreate the content of the ADT from a url json
   * @param url defines the url to load
   * @param scaleToSize defines whether to scale to texture to the saved size
   * @param appendToAdt if provided the snippet will be appended to the adt. Otherwise a fullscreen ADT will be created.
   * @returns a promise that will resolve on success
   */
  static async ParseFromFileAsync(url, scaleToSize, appendToAdt) {
    const adt = appendToAdt ?? _AdvancedDynamicTexture.CreateFullscreenUI("ADT from URL");
    const serialized = await _AdvancedDynamicTexture._LoadURLContentAsync(url);
    adt.parseSerializedObject(serialized, scaleToSize);
    return adt;
  }
  /**
   * Recreate the content of the ADT from a url json
   * @param url defines the url to load
   * @param scaleToSize defines whether to scale to texture to the saved size
   * @returns a promise that will resolve on success
   */
  parseFromURLAsync(url, scaleToSize) {
    return _AdvancedDynamicTexture.ParseFromFileAsync(url, scaleToSize, this);
  }
  static _LoadURLContentAsync(url, snippet = false) {
    if (url === "") {
      return Promise.reject("No URL provided");
    }
    return new Promise((resolve, reject) => {
      const request = new WebRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState == 4) {
          if (request.status == 200) {
            let gui;
            if (snippet) {
              const payload = JSON.parse(JSON.parse(request.responseText).jsonPayload);
              gui = payload.encodedGui ? new TextDecoder("utf-8").decode(DecodeBase64ToBinary(payload.encodedGui)) : payload.gui;
            } else {
              gui = request.responseText;
            }
            const serializationObject = JSON.parse(gui);
            resolve(serializationObject);
          } else {
            reject("Unable to load");
          }
        }
      });
      request.open("GET", url);
      request.send();
    });
  }
  // Statics
  /**
   * Compares two rectangle based controls for pixel overlap
   * @param control1 The first control to compare
   * @param control2 The second control to compare
   * @returns true if overlaps, otherwise false
   */
  static _Overlaps(control1, control2) {
    return !(control1.centerX > control2.centerX + control2.widthInPixels || control1.centerX + control1.widthInPixels < control2.centerX || control1.centerY + control1.heightInPixels < control2.centerY || control1.centerY > control2.centerY + control2.heightInPixels);
  }
  /**
   * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh)
   * @param mesh defines the mesh which will receive the texture
   * @param width defines the texture width (1024 by default)
   * @param height defines the texture height (1024 by default)
   * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
   * @param onlyAlphaTesting defines a boolean indicating that alpha blending will not be used (only alpha testing) (false by default)
   * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
   * @param materialSetupCallback defines a custom way of creating and setting up the material on the mesh
   * @returns a new AdvancedDynamicTexture
   */
  static CreateForMesh(mesh, width = 1024, height = 1024, supportPointerMove = true, onlyAlphaTesting = false, invertY, materialSetupCallback = this._CreateMaterial) {
    const uniqueId = RandomGUID();
    const result = new _AdvancedDynamicTexture(`AdvancedDynamicTexture for ${mesh.name} [${uniqueId}]`, width, height, mesh.getScene(), true, Texture.TRILINEAR_SAMPLINGMODE, invertY);
    materialSetupCallback(mesh, uniqueId, result, onlyAlphaTesting);
    result.attachToMesh(mesh, supportPointerMove);
    return result;
  }
  static _CreateMaterial(mesh, uniqueId, texture, onlyAlphaTesting) {
    const internalClassType = GetClass("BABYLON.StandardMaterial");
    if (!internalClassType) {
      throw "StandardMaterial needs to be imported before as it contains a side-effect required by your code.";
    }
    const material = new internalClassType(`AdvancedDynamicTextureMaterial for ${mesh.name} [${uniqueId}]`, mesh.getScene());
    material.backFaceCulling = false;
    material.diffuseColor = Color3.Black();
    material.specularColor = Color3.Black();
    if (onlyAlphaTesting) {
      material.diffuseTexture = texture;
      material.emissiveTexture = texture;
      texture.hasAlpha = true;
    } else {
      material.emissiveTexture = texture;
      material.opacityTexture = texture;
    }
    mesh.material = material;
  }
  /**
   * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh) BUT do not create a new material for the mesh. You will be responsible for connecting the texture
   * @param mesh defines the mesh which will receive the texture
   * @param width defines the texture width (1024 by default)
   * @param height defines the texture height (1024 by default)
   * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
   * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
   * @returns a new AdvancedDynamicTexture
   */
  static CreateForMeshTexture(mesh, width = 1024, height = 1024, supportPointerMove = true, invertY) {
    const result = new _AdvancedDynamicTexture(mesh.name + " AdvancedDynamicTexture", width, height, mesh.getScene(), true, Texture.TRILINEAR_SAMPLINGMODE, invertY);
    result.attachToMesh(mesh, supportPointerMove);
    return result;
  }
  /**
   * Creates a new AdvancedDynamicTexture in fullscreen mode.
   * In this mode the texture will rely on a layer for its rendering.
   * This allows it to be treated like any other layer.
   * As such, if you have a multi camera setup, you can set the layerMask on the GUI as well.
   * LayerMask is set through advancedTexture.layer.layerMask
   * @param name defines name for the texture
   * @param foreground defines a boolean indicating if the texture must be rendered in foreground (default is true)
   * @param scene defines the hosting scene
   * @param sampling defines the texture sampling mode (Texture.BILINEAR_SAMPLINGMODE by default)
   * @param adaptiveScaling defines whether to automatically scale root to match hardwarescaling (false by default)
   * @returns a new AdvancedDynamicTexture
   */
  static CreateFullscreenUI(name22, foreground = true, scene = null, sampling = Texture.BILINEAR_SAMPLINGMODE, adaptiveScaling = false) {
    const result = new _AdvancedDynamicTexture(name22, 0, 0, scene, false, sampling);
    const resultScene = result.getScene();
    const layer = new Layer(name22 + "_layer", null, resultScene, !foreground);
    layer.texture = result;
    result._layerToDispose = layer;
    result._isFullscreen = true;
    if (adaptiveScaling && resultScene) {
      const newScale = 1 / resultScene.getEngine().getHardwareScalingLevel();
      result._rootContainer.scaleX = newScale;
      result._rootContainer.scaleY = newScale;
    }
    result.attach();
    return result;
  }
  /**
   * Scales the texture
   * @param ratio the scale factor to apply to both width and height
   */
  scale(ratio) {
    super.scale(ratio);
    this.markAsDirty();
  }
  /**
   * Resizes the texture
   * @param width the new width
   * @param height the new height
   */
  scaleTo(width, height) {
    super.scaleTo(width, height);
    this.markAsDirty();
  }
  _checkGuiIsReady() {
    if (this.guiIsReady()) {
      this.onGuiReadyObservable.notifyObservers(this);
      this.onGuiReadyObservable.clear();
    }
  }
  /**
   * @returns true if all the GUI components are ready to render
   */
  guiIsReady() {
    return this._rootContainer.isReady();
  }
};
AdvancedDynamicTexture.SnippetUrl = Constants.SnippetUrl;
AdvancedDynamicTexture.AllowGPUOptimizations = true;

// node_modules/@babylonjs/gui/2D/adtInstrumentation.js
var AdvancedDynamicTextureInstrumentation = class {
  // Properties
  /**
   * Gets the perf counter used to capture render time
   */
  get renderTimeCounter() {
    return this._renderTime;
  }
  /**
   * Gets the perf counter used to capture layout time
   */
  get layoutTimeCounter() {
    return this._layoutTime;
  }
  /**
   * Enable or disable the render time capture
   */
  get captureRenderTime() {
    return this._captureRenderTime;
  }
  set captureRenderTime(value) {
    if (value === this._captureRenderTime) {
      return;
    }
    this._captureRenderTime = value;
    if (value) {
      this._onBeginRenderObserver = this.texture.onBeginRenderObservable.add(() => {
        this._renderTime.beginMonitoring();
      });
      this._onEndRenderObserver = this.texture.onEndRenderObservable.add(() => {
        this._renderTime.endMonitoring(true);
      });
    } else {
      this.texture.onBeginRenderObservable.remove(this._onBeginRenderObserver);
      this._onBeginRenderObserver = null;
      this.texture.onEndRenderObservable.remove(this._onEndRenderObserver);
      this._onEndRenderObserver = null;
    }
  }
  /**
   * Enable or disable the layout time capture
   */
  get captureLayoutTime() {
    return this._captureLayoutTime;
  }
  set captureLayoutTime(value) {
    if (value === this._captureLayoutTime) {
      return;
    }
    this._captureLayoutTime = value;
    if (value) {
      this._onBeginLayoutObserver = this.texture.onBeginLayoutObservable.add(() => {
        this._layoutTime.beginMonitoring();
      });
      this._onEndLayoutObserver = this.texture.onEndLayoutObservable.add(() => {
        this._layoutTime.endMonitoring(true);
      });
    } else {
      this.texture.onBeginLayoutObservable.remove(this._onBeginLayoutObserver);
      this._onBeginLayoutObserver = null;
      this.texture.onEndLayoutObservable.remove(this._onEndLayoutObserver);
      this._onEndLayoutObserver = null;
    }
  }
  /**
   * Instantiates a new advanced dynamic texture instrumentation.
   * This class can be used to get instrumentation data from an AdvancedDynamicTexture object
   * @param texture Defines the AdvancedDynamicTexture to instrument
   */
  constructor(texture) {
    this.texture = texture;
    this._captureRenderTime = false;
    this._renderTime = new PerfCounter();
    this._captureLayoutTime = false;
    this._layoutTime = new PerfCounter();
    this._onBeginRenderObserver = null;
    this._onEndRenderObserver = null;
    this._onBeginLayoutObserver = null;
    this._onEndLayoutObserver = null;
  }
  /**
   * Dispose and release associated resources.
   */
  dispose() {
    this.texture.onBeginRenderObservable.remove(this._onBeginRenderObserver);
    this._onBeginRenderObserver = null;
    this.texture.onEndRenderObservable.remove(this._onEndRenderObserver);
    this._onEndRenderObserver = null;
    this.texture.onBeginLayoutObservable.remove(this._onBeginLayoutObserver);
    this._onBeginLayoutObserver = null;
    this.texture.onEndLayoutObservable.remove(this._onEndLayoutObserver);
    this._onEndLayoutObserver = null;
    this.texture = null;
  }
};

// node_modules/@babylonjs/gui/2D/xmlLoader.js
var XmlLoaderError = "XmlLoader Exception : XML file is malformed or corrupted.";
var XmlLoader = class {
  /**
   * Create a new xml loader
   * @param parentClass Sets the class context. Used when the loader is instanced inside a class and not in a global context
   */
  constructor(parentClass = null) {
    this._nodes = {};
    this._nodeTypes = {
      element: 1,
      attribute: 2,
      text: 3
    };
    this._isLoaded = false;
    this._objectAttributes = {
      textHorizontalAlignment: 1,
      textVerticalAlignment: 2,
      horizontalAlignment: 3,
      verticalAlignment: 4,
      stretch: 5
    };
    if (parentClass) {
      this._parentClass = parentClass;
    }
  }
  _getChainElement(attributeValue) {
    let element = window;
    if (this._parentClass) {
      element = this._parentClass;
    }
    let value = attributeValue;
    value = value.split(".");
    for (let i = 0; i < value.length; i++) {
      element = element[value[i]];
    }
    return element;
  }
  _getClassAttribute(attributeName) {
    const attribute = attributeName.split(".");
    const className = GetClass("BABYLON.GUI." + attribute[0]);
    return className[attribute[1]];
  }
  _createGuiElement(node, parent, linkParent = true) {
    try {
      const className = GetClass("BABYLON.GUI." + node.nodeName);
      const guiNode = new className();
      if (parent && linkParent) {
        parent.addControl(guiNode);
      }
      for (let i = 0; i < node.attributes.length; i++) {
        if (node.attributes[i].name.toLowerCase().includes("datasource")) {
          continue;
        }
        if (node.attributes[i].name.toLowerCase().includes("observable")) {
          const element = this._getChainElement(node.attributes[i].value);
          guiNode[node.attributes[i].name].add(element);
          continue;
        } else if (node.attributes[i].name == "linkWithMesh") {
          if (this._parentClass) {
            guiNode.linkWithMesh(this._parentClass[node.attributes[i].value]);
          } else {
            guiNode.linkWithMesh(window[node.attributes[i].value]);
          }
        } else if (node.attributes[i].value.startsWith("{{") && node.attributes[i].value.endsWith("}}")) {
          const element = this._getChainElement(node.attributes[i].value.substring(2, node.attributes[i].value.length - 2));
          guiNode[node.attributes[i].name] = element;
        } else if (!this._objectAttributes[node.attributes[i].name]) {
          if (node.attributes[i].value == "true" || node.attributes[i].value == "false") {
            guiNode[node.attributes[i].name] = node.attributes[i].value == "true";
          } else {
            guiNode[node.attributes[i].name] = !isNaN(Number(node.attributes[i].value)) ? Number(node.attributes[i].value) : node.attributes[i].value;
          }
        } else {
          guiNode[node.attributes[i].name] = this._getClassAttribute(node.attributes[i].value);
        }
      }
      if (!node.attributes.getNamedItem("id")) {
        this._nodes[node.nodeName + Object.keys(this._nodes).length + "_gen"] = guiNode;
        return guiNode;
      }
      let id = node.attributes.getNamedItem("id").value;
      if (id.startsWith("{{") && id.endsWith("}}")) {
        id = this._getChainElement(id.substring(2, id.length - 2));
      }
      if (!this._nodes[id]) {
        this._nodes[id] = guiNode;
      } else {
        throw "XmlLoader Exception : Duplicate ID, every element should have an unique ID attribute";
      }
      return guiNode;
    } catch (exception) {
      throw "XmlLoader Exception : Error parsing Control " + node.nodeName + "," + exception + ".";
    }
  }
  _parseGrid(node, guiNode, parent) {
    let width;
    let height;
    let columns;
    const rows = node.children;
    let cells;
    let isPixel = false;
    let cellNode;
    let rowNumber = -1;
    let columnNumber = -1;
    let totalColumnsNumber = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].nodeType != this._nodeTypes.element) {
        continue;
      }
      if (rows[i].nodeName != "Row") {
        throw "XmlLoader Exception : Expecting Row node, received " + rows[i].nodeName;
      }
      rowNumber += 1;
      columns = rows[i].children;
      if (!rows[i].attributes.getNamedItem("height")) {
        throw "XmlLoader Exception : Height must be defined for grid rows";
      }
      height = Number(rows[i].attributes.getNamedItem("height").nodeValue);
      isPixel = rows[i].attributes.getNamedItem("isPixel") ? JSON.parse(rows[i].attributes.getNamedItem("isPixel").nodeValue) : false;
      guiNode.addRowDefinition(height, isPixel);
      for (let j = 0; j < columns.length; j++) {
        if (columns[j].nodeType != this._nodeTypes.element) {
          continue;
        }
        if (columns[j].nodeName != "Column") {
          throw "XmlLoader Exception : Expecting Column node, received " + columns[j].nodeName;
        }
        columnNumber += 1;
        if (rowNumber > 0 && columnNumber > totalColumnsNumber) {
          throw "XmlLoader Exception : In the Grid element, the number of columns is defined in the first row, do not add more columns in the subsequent rows.";
        }
        if (rowNumber == 0) {
          if (!columns[j].attributes.getNamedItem("width")) {
            throw "XmlLoader Exception : Width must be defined for all the grid columns in the first row";
          }
          width = Number(columns[j].attributes.getNamedItem("width").nodeValue);
          isPixel = columns[j].attributes.getNamedItem("isPixel") ? JSON.parse(columns[j].attributes.getNamedItem("isPixel").nodeValue) : false;
          guiNode.addColumnDefinition(width, isPixel);
        }
        cells = columns[j].children;
        for (let k = 0; k < cells.length; k++) {
          if (cells[k].nodeType != this._nodeTypes.element) {
            continue;
          }
          cellNode = this._createGuiElement(cells[k], guiNode, false);
          guiNode.addControl(cellNode, rowNumber, columnNumber);
          if (cells[k].firstChild) {
            this._parseXml(cells[k].firstChild, cellNode);
          }
        }
      }
      if (rowNumber == 0) {
        totalColumnsNumber = columnNumber;
      }
      columnNumber = -1;
    }
    if (node.nextSibling) {
      this._parseXml(node.nextSibling, parent);
    }
  }
  _parseElement(node, guiNode, parent) {
    if (node.firstChild) {
      this._parseXml(node.firstChild, guiNode);
    }
    if (node.nextSibling) {
      this._parseXml(node.nextSibling, parent);
    }
  }
  _prepareSourceElement(node, guiNode, variable, source, iterator) {
    if (this._parentClass) {
      this._parentClass[variable] = source[iterator];
    } else {
      window[variable] = source[iterator];
    }
    if (node.firstChild) {
      this._parseXml(node.firstChild, guiNode, true);
    }
  }
  _parseElementsFromSource(node, guiNode, parent) {
    const dataSource = node.attributes.getNamedItem("dataSource").value;
    if (!dataSource.includes(" in ")) {
      throw "XmlLoader Exception : Malformed XML, Data Source must include an in";
    } else {
      let isArray = true;
      const splittedSource = dataSource.split(" in ");
      if (splittedSource.length < 2) {
        throw "XmlLoader Exception : Malformed XML, Data Source must have an iterator and a source";
      }
      let source = splittedSource[1];
      if (source.startsWith("{") && source.endsWith("}")) {
        isArray = false;
      }
      if (!isArray || source.startsWith("[") && source.endsWith("]")) {
        source = source.substring(1, source.length - 1);
      }
      if (this._parentClass) {
        source = this._parentClass[source];
      } else {
        source = window[source];
      }
      if (isArray) {
        for (let i = 0; i < source.length; i++) {
          this._prepareSourceElement(node, guiNode, splittedSource[0], source, i);
        }
      } else {
        for (const i in source) {
          this._prepareSourceElement(node, guiNode, splittedSource[0], source, i);
        }
      }
      if (node.nextSibling) {
        this._parseXml(node.nextSibling, parent);
      }
    }
  }
  _parseXml(node, parent, generated = false) {
    if (node.nodeType != this._nodeTypes.element) {
      if (node.nextSibling) {
        this._parseXml(node.nextSibling, parent, generated);
      }
      return;
    }
    if (generated) {
      node.setAttribute("id", parent.id + (parent._children.length + 1));
    }
    const guiNode = this._createGuiElement(node, parent);
    if (!this._rootNode) {
      this._rootNode = guiNode;
    }
    if (node.nodeName == "Grid") {
      this._parseGrid(node, guiNode, parent);
    } else if (!node.attributes.getNamedItem("dataSource")) {
      this._parseElement(node, guiNode, parent);
    } else {
      this._parseElementsFromSource(node, guiNode, parent);
    }
  }
  /**
   * Gets if the loading has finished.
   * @returns whether the loading has finished or not
   */
  isLoaded() {
    return this._isLoaded;
  }
  /**
   * Gets a loaded node / control by id.
   * @param id the Controls id set in the xml
   * @returns element of type Control
   */
  getNodeById(id) {
    return this._nodes[id];
  }
  /**
   * Gets all loaded nodes / controls
   * @returns Array of controls
   */
  getNodes() {
    return this._nodes;
  }
  /**
   * Disposes the loaded layout
   */
  dispose() {
    if (this._rootNode) {
      this._rootNode.dispose();
      this._rootNode = null;
      this._nodes = {};
    }
  }
  /**
   * Initiates the xml layout loading
   * @param xmlFile defines the xml layout to load
   * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
   * @param onSuccess defines the callback called on layout load successfully.
   * @param onError defines the callback called on layout load failure.
   */
  loadLayout(xmlFile, rootNode, onSuccess = null, onError = null) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        if (!xhttp.responseXML) {
          if (onError) {
            onError(XmlLoaderError);
            return;
          } else {
            throw XmlLoaderError;
          }
        }
        const xmlDoc = xhttp.responseXML.documentElement;
        this._parseXml(xmlDoc.firstChild, rootNode);
        this._isLoaded = true;
        if (onSuccess) {
          onSuccess();
        }
      }
    };
    xhttp.onerror = function() {
      if (onError) {
        onError("an error occurred during loading the layout");
      }
    };
    xhttp.open("GET", xmlFile, true);
    xhttp.send();
  }
  /**
   * Initiates the xml layout loading asynchronously
   * @param xmlFile defines the xml layout to load
   * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
   * @returns Promise
   */
  async loadLayoutAsync(xmlFile, rootNode) {
    return new Promise((resolve, reject) => {
      this.loadLayout(xmlFile, rootNode, resolve, reject);
    });
  }
};

// node_modules/@babylonjs/gui/3D/vector3WithInfo.js
var Vector3WithInfo = class extends Vector3 {
  /**
   * Creates a new Vector3WithInfo
   * @param source defines the vector3 data to transport
   * @param buttonIndex defines the current mouse button index
   */
  constructor(source, buttonIndex = 0) {
    super(source.x, source.y, source.z);
    this.buttonIndex = buttonIndex;
  }
};

// node_modules/@babylonjs/gui/3D/controls/control3D.js
var Control3D = class {
  /** Gets or sets the control position in world space */
  get position() {
    if (!this._node) {
      return Vector3.Zero();
    }
    return this._node.position;
  }
  set position(value) {
    if (!this._node) {
      return;
    }
    this._node.position = value;
  }
  /** Gets or sets the control scaling in world space */
  get scaling() {
    if (!this._node) {
      return new Vector3(1, 1, 1);
    }
    return this._node.scaling;
  }
  set scaling(value) {
    if (!this._node) {
      return;
    }
    this._isScaledByManager = false;
    this._node.scaling = value;
  }
  /**
   * Gets the list of attached behaviors
   * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
   */
  get behaviors() {
    return this._behaviors;
  }
  /**
   * Attach a behavior to the control
   * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
   * @param behavior defines the behavior to attach
   * @returns the current control
   */
  addBehavior(behavior) {
    const index = this._behaviors.indexOf(behavior);
    if (index !== -1) {
      return this;
    }
    behavior.init();
    const scene = this._host.scene;
    if (scene.isLoading) {
      scene.onDataLoadedObservable.addOnce(() => {
        behavior.attach(this);
      });
    } else {
      behavior.attach(this);
    }
    this._behaviors.push(behavior);
    return this;
  }
  /**
   * Remove an attached behavior
   * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
   * @param behavior defines the behavior to attach
   * @returns the current control
   */
  removeBehavior(behavior) {
    const index = this._behaviors.indexOf(behavior);
    if (index === -1) {
      return this;
    }
    this._behaviors[index].detach();
    this._behaviors.splice(index, 1);
    return this;
  }
  /**
   * Gets an attached behavior by name
   * @param name defines the name of the behavior to look for
   * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
   * @returns null if behavior was not found else the requested behavior
   */
  getBehaviorByName(name22) {
    for (const behavior of this._behaviors) {
      if (behavior.name === name22) {
        return behavior;
      }
    }
    return null;
  }
  /** Gets or sets a boolean indicating if the control is visible */
  get isVisible() {
    return this._isVisible;
  }
  set isVisible(value) {
    if (this._isVisible === value) {
      return;
    }
    this._isVisible = value;
    const mesh = this.mesh;
    if (mesh) {
      mesh.setEnabled(value);
    }
  }
  /**
   * Creates a new control
   * @param name defines the control name
   */
  constructor(name22) {
    this.name = name22;
    this._downCount = 0;
    this._enterCount = -1;
    this._downPointerIds = {};
    this._isVisible = true;
    this._isScaledByManager = false;
    this.onPointerMoveObservable = new Observable();
    this.onPointerOutObservable = new Observable();
    this.onPointerDownObservable = new Observable();
    this.onPointerUpObservable = new Observable();
    this.onPointerClickObservable = new Observable();
    this.onPointerEnterObservable = new Observable();
    this._behaviors = new Array();
  }
  /**
   * Gets a string representing the class name
   */
  get typeName() {
    return this._getTypeName();
  }
  /**
   * Get the current class name of the control.
   * @returns current class name
   */
  getClassName() {
    return this._getTypeName();
  }
  _getTypeName() {
    return "Control3D";
  }
  /**
   * Gets the transform node used by this control
   */
  get node() {
    return this._node;
  }
  /**
   * Gets the mesh used to render this control
   */
  get mesh() {
    if (this._node instanceof AbstractMesh) {
      return this._node;
    }
    return null;
  }
  /**
   * Link the control as child of the given node
   * @param node defines the node to link to. Use null to unlink the control
   * @returns the current control
   */
  linkToTransformNode(node) {
    if (this._node) {
      this._node.parent = node;
    }
    return this;
  }
  /**
   * @internal
   */
  _prepareNode(scene) {
    if (!this._node) {
      this._node = this._createNode(scene);
      if (!this.node) {
        return;
      }
      this._injectGUI3DReservedDataStore(this.node).control = this;
      const mesh = this.mesh;
      if (mesh) {
        mesh.isPickable = true;
        this._affectMaterial(mesh);
      }
    }
  }
  _injectGUI3DReservedDataStore(node) {
    node.reservedDataStore = node.reservedDataStore ?? {};
    node.reservedDataStore.GUI3D = node.reservedDataStore.GUI3D ?? {};
    return node.reservedDataStore.GUI3D;
  }
  /**
   * Node creation.
   * Can be overriden by children
   * @param scene defines the scene where the node must be attached
   * @returns the attached node or null if none. Must return a Mesh or AbstractMesh if there is an attached visible object
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createNode(scene) {
    return null;
  }
  /**
   * Affect a material to the given mesh
   * @param mesh defines the mesh which will represent the control
   */
  _affectMaterial(mesh) {
    mesh.material = null;
  }
  _isTouchButton3D(control) {
    return control._generatePointerEventType !== void 0;
  }
  // Pointers
  /**
   * @internal
   */
  _onPointerMove(target, coordinates) {
    this.onPointerMoveObservable.notifyObservers(coordinates, -1, target, this);
  }
  /**
   * @internal
   */
  _onPointerEnter(target) {
    if (this._enterCount === -1) {
      this._enterCount = 0;
    }
    this._enterCount++;
    if (this._enterCount > 1) {
      return false;
    }
    this.onPointerEnterObservable.notifyObservers(this, -1, target, this);
    if (this.pointerEnterAnimation) {
      this.pointerEnterAnimation();
    }
    return true;
  }
  /**
   * @internal
   */
  _onPointerOut(target) {
    this._enterCount--;
    if (this._enterCount > 0) {
      return;
    }
    this._enterCount = 0;
    this.onPointerOutObservable.notifyObservers(this, -1, target, this);
    if (this.pointerOutAnimation) {
      this.pointerOutAnimation();
    }
  }
  /**
   * @internal
   */
  _onPointerDown(target, coordinates, pointerId, buttonIndex) {
    this._downCount++;
    this._downPointerIds[pointerId] = this._downPointerIds[pointerId] + 1 || 1;
    if (this._downCount !== 1) {
      return false;
    }
    this.onPointerDownObservable.notifyObservers(new Vector3WithInfo(coordinates, buttonIndex), -1, target, this);
    if (this.pointerDownAnimation) {
      this.pointerDownAnimation();
    }
    return true;
  }
  /**
   * @internal
   */
  _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick) {
    this._downCount--;
    this._downPointerIds[pointerId]--;
    if (this._downPointerIds[pointerId] <= 0) {
      delete this._downPointerIds[pointerId];
    }
    if (this._downCount < 0) {
      this._downCount = 0;
      return;
    }
    if (this._downCount == 0) {
      if (notifyClick && (this._enterCount > 0 || this._enterCount === -1)) {
        this.onPointerClickObservable.notifyObservers(new Vector3WithInfo(coordinates, buttonIndex), -1, target, this);
      }
      this.onPointerUpObservable.notifyObservers(new Vector3WithInfo(coordinates, buttonIndex), -1, target, this);
      if (this.pointerUpAnimation) {
        this.pointerUpAnimation();
      }
    }
  }
  /**
   * @internal
   */
  forcePointerUp(pointerId = null) {
    if (pointerId !== null) {
      this._onPointerUp(this, Vector3.Zero(), pointerId, 0, true);
    } else {
      for (const key in this._downPointerIds) {
        this._onPointerUp(this, Vector3.Zero(), +key, 0, true);
      }
      if (this._downCount > 0) {
        this._downCount = 1;
        this._onPointerUp(this, Vector3.Zero(), 0, 0, true);
      }
    }
  }
  /**
   * @internal
   */
  _processObservables(type, pickedPoint, originMeshPosition, pointerId, buttonIndex) {
    if (this._isTouchButton3D(this) && originMeshPosition) {
      type = this._generatePointerEventType(type, originMeshPosition, this._downCount);
    }
    if (type === PointerEventTypes.POINTERMOVE) {
      this._onPointerMove(this, pickedPoint);
      const previousControlOver = this._host._lastControlOver[pointerId];
      if (previousControlOver && previousControlOver !== this) {
        previousControlOver._onPointerOut(this);
      }
      if (previousControlOver !== this) {
        this._onPointerEnter(this);
      }
      this._host._lastControlOver[pointerId] = this;
      return true;
    }
    if (type === PointerEventTypes.POINTERDOWN) {
      this._onPointerDown(this, pickedPoint, pointerId, buttonIndex);
      this._host._lastControlDown[pointerId] = this;
      this._host._lastPickedControl = this;
      return true;
    }
    if (type === PointerEventTypes.POINTERUP || type === PointerEventTypes.POINTERDOUBLETAP) {
      if (this._host._lastControlDown[pointerId]) {
        this._host._lastControlDown[pointerId]._onPointerUp(this, pickedPoint, pointerId, buttonIndex, true);
      }
      delete this._host._lastControlDown[pointerId];
      return true;
    }
    return false;
  }
  /** @internal */
  _disposeNode() {
    if (this._node) {
      this._node.dispose();
      this._node = null;
    }
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    this.onPointerDownObservable.clear();
    this.onPointerEnterObservable.clear();
    this.onPointerMoveObservable.clear();
    this.onPointerOutObservable.clear();
    this.onPointerUpObservable.clear();
    this.onPointerClickObservable.clear();
    this._disposeNode();
    for (const behavior of this._behaviors) {
      behavior.detach();
    }
  }
};

// node_modules/@babylonjs/gui/3D/controls/contentDisplay3D.js
var ContentDisplay3D = class extends Control3D {
  constructor() {
    super(...arguments);
    this._contentResolution = 512;
    this._contentScaleRatio = 2;
  }
  /**
   * Gets or sets the GUI 2D content used to display the button's facade
   */
  get content() {
    return this._content;
  }
  set content(value) {
    this._content = value;
    if (!value || !this._host || !this._host.utilityLayer) {
      return;
    }
    if (!this._facadeTexture) {
      this._facadeTexture = new AdvancedDynamicTexture("Facade", this._contentResolution, this._contentResolution, this._host.utilityLayer.utilityLayerScene, true, Texture.TRILINEAR_SAMPLINGMODE);
      this._setFacadeTextureScaling();
      this._facadeTexture.premulAlpha = true;
    } else {
      this._facadeTexture.rootContainer.clearControls();
    }
    this._facadeTexture.addControl(value);
    this._applyFacade(this._facadeTexture);
  }
  _setFacadeTextureScaling() {
    if (this._facadeTexture) {
      this._facadeTexture.rootContainer.scaleX = this._contentScaleRatio;
      this._facadeTexture.rootContainer.scaleY = this._contentScaleRatioY ?? this._contentScaleRatio;
    }
  }
  /**
   * Gets or sets the texture resolution used to render content (512 by default)
   */
  get contentResolution() {
    return this._contentResolution;
  }
  set contentResolution(value) {
    if (this._contentResolution === value) {
      return;
    }
    this._contentResolution = value;
    this._resetContent();
  }
  _disposeFacadeTexture() {
    if (this._facadeTexture) {
      this._facadeTexture.dispose();
      this._facadeTexture = null;
    }
  }
  _resetContent() {
    this._disposeFacadeTexture();
    this.content = this._content;
  }
  /**
   * Apply the facade texture (created from the content property).
   * This function can be overloaded by child classes
   * @param facadeTexture defines the AdvancedDynamicTexture to use
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _applyFacade(facadeTexture) {
  }
};

// node_modules/@babylonjs/gui/3D/controls/abstractButton3D.js
var AbstractButton3D = class extends ContentDisplay3D {
  /**
   * Creates a new button
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
  }
  _getTypeName() {
    return "AbstractButton3D";
  }
  // Mesh association
  _createNode(scene) {
    return new TransformNode("button" + this.name, scene);
  }
};

// node_modules/@babylonjs/gui/3D/controls/button3D.js
var Button3D = class extends AbstractButton3D {
  /**
   * Creates a new button
   * @param name defines the control name
   * @param options defines the options used to create the button
   */
  constructor(name22, options) {
    super(name22);
    this._options = {
      width: 1,
      height: 1,
      depth: 0.08,
      ...options
    };
    this.pointerEnterAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this._currentMaterial.emissiveColor = Color3.Red();
    };
    this.pointerOutAnimation = () => {
      this._currentMaterial.emissiveColor = Color3.Black();
    };
    this.pointerDownAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(0.95);
    };
    this.pointerUpAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(1 / 0.95);
    };
  }
  /**
   * Apply the facade texture (created from the content property).
   * @param facadeTexture defines the AdvancedDynamicTexture to use
   */
  _applyFacade(facadeTexture) {
    this._currentMaterial.emissiveTexture = facadeTexture;
  }
  _getTypeName() {
    return "Button3D";
  }
  // Mesh association
  _createNode(scene) {
    const faceUV = new Array(6);
    for (let i = 0; i < 6; i++) {
      faceUV[i] = new Vector4(0, 0, 0, 0);
    }
    if (scene.useRightHandedSystem) {
      faceUV[0].copyFromFloats(1, 0, 0, 1);
    } else {
      faceUV[1].copyFromFloats(0, 0, 1, 1);
    }
    const mesh = CreateBox(this.name + "_rootMesh", {
      width: this._options.width,
      height: this._options.height,
      depth: this._options.depth,
      faceUV,
      wrap: true
    }, scene);
    this._contentScaleRatioY = this._contentScaleRatio * this._options.width / this._options.height;
    this._setFacadeTextureScaling();
    return mesh;
  }
  _affectMaterial(mesh) {
    const material = new StandardMaterial(this.name + "Material", mesh.getScene());
    material.specularColor = Color3.Black();
    mesh.material = material;
    this._currentMaterial = material;
    this._resetContent();
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    super.dispose();
    this._disposeFacadeTexture();
    if (this._currentMaterial) {
      this._currentMaterial.dispose();
    }
  }
};

// node_modules/@babylonjs/gui/3D/controls/container3D.js
var Container3D = class extends Control3D {
  /**
   * Gets the list of child controls
   */
  get children() {
    return this._children;
  }
  /**
   * Gets or sets a boolean indicating if the layout must be blocked (default is false).
   * This is helpful to optimize layout operation when adding multiple children in a row
   */
  get blockLayout() {
    return this._blockLayout;
  }
  set blockLayout(value) {
    if (this._blockLayout === value) {
      return;
    }
    this._blockLayout = value;
    if (!this._blockLayout) {
      this._arrangeChildren();
    }
  }
  /**
   * Creates a new container
   * @param name defines the container name
   */
  constructor(name22) {
    super(name22);
    this._blockLayout = false;
    this._children = new Array();
  }
  /**
   * Force the container to update the layout. Please note that it will not take blockLayout property in account
   * @returns the current container
   */
  updateLayout() {
    this._arrangeChildren();
    return this;
  }
  /**
   * Gets a boolean indicating if the given control is in the children of this control
   * @param control defines the control to check
   * @returns true if the control is in the child list
   */
  containsControl(control) {
    return this._children.indexOf(control) !== -1;
  }
  /**
   * Adds a control to the children of this control
   * @param control defines the control to add
   * @returns the current container
   */
  addControl(control) {
    const index = this._children.indexOf(control);
    if (index !== -1) {
      return this;
    }
    control.parent = this;
    control._host = this._host;
    this._children.push(control);
    if (this._host.utilityLayer) {
      control._prepareNode(this._host.utilityLayer.utilityLayerScene);
      if (control.node) {
        control.node.parent = this.node;
      }
      if (!this.blockLayout) {
        this._arrangeChildren();
      }
    }
    return this;
  }
  /**
   * This function will be called everytime a new control is added
   */
  _arrangeChildren() {
  }
  _createNode(scene) {
    return new TransformNode("ContainerNode", scene);
  }
  /**
   * Removes a control from the children of this control
   * @param control defines the control to remove
   * @returns the current container
   */
  removeControl(control) {
    const index = this._children.indexOf(control);
    if (index !== -1) {
      this._children.splice(index, 1);
      control.parent = null;
      control._disposeNode();
    }
    return this;
  }
  _getTypeName() {
    return "Container3D";
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    for (const control of this._children) {
      control.dispose();
    }
    this._children.length = 0;
    super.dispose();
  }
};
Container3D.UNSET_ORIENTATION = 0;
Container3D.FACEORIGIN_ORIENTATION = 1;
Container3D.FACEORIGINREVERSED_ORIENTATION = 2;
Container3D.FACEFORWARD_ORIENTATION = 3;
Container3D.FACEFORWARDREVERSED_ORIENTATION = 4;

// node_modules/@babylonjs/gui/3D/controls/volumeBasedPanel.js
var VolumeBasedPanel = class extends Container3D {
  /**
   * Gets or sets the orientation to apply to all controls (BABYLON.Container3D.FaceOriginReversedOrientation by default)
   * | Value | Type                                | Description |
   * | ----- | ----------------------------------- | ----------- |
   * | 0     | UNSET_ORIENTATION                   |  Control rotation will remain unchanged |
   * | 1     | FACEORIGIN_ORIENTATION              |  Control will rotate to make it look at sphere central axis |
   * | 2     | FACEORIGINREVERSED_ORIENTATION      |  Control will rotate to make it look back at sphere central axis |
   * | 3     | FACEFORWARD_ORIENTATION             |  Control will rotate to look at z axis (0, 0, 1) |
   * | 4     | FACEFORWARDREVERSED_ORIENTATION     |  Control will rotate to look at negative z axis (0, 0, -1) |
   */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    if (this._orientation === value) {
      return;
    }
    this._orientation = value;
    Tools.SetImmediate(() => {
      this._arrangeChildren();
    });
  }
  /**
   * Gets or sets the number of columns requested (10 by default).
   * The panel will automatically compute the number of rows based on number of child controls.
   */
  get columns() {
    return this._columns;
  }
  set columns(value) {
    if (this._columns === value) {
      return;
    }
    this._columns = value;
    this._rowThenColum = true;
    Tools.SetImmediate(() => {
      this._arrangeChildren();
    });
  }
  /**
   * Gets or sets a the number of rows requested.
   * The panel will automatically compute the number of columns based on number of child controls.
   */
  get rows() {
    return this._rows;
  }
  set rows(value) {
    if (this._rows === value) {
      return;
    }
    this._rows = value;
    this._rowThenColum = false;
    Tools.SetImmediate(() => {
      this._arrangeChildren();
    });
  }
  /**
   * Creates new VolumeBasedPanel
   * @param name
   */
  constructor(name22) {
    super(name22);
    this._columns = 10;
    this._rows = 0;
    this._rowThenColum = true;
    this._orientation = Container3D.FACEORIGIN_ORIENTATION;
    this.margin = 0;
  }
  _arrangeChildren() {
    this._cellWidth = 0;
    this._cellHeight = 0;
    let rows = 0;
    let columns = 0;
    let controlCount = 0;
    const currentInverseWorld = Matrix.Invert(this.node.computeWorldMatrix(true));
    for (const child of this._children) {
      if (!child.mesh) {
        continue;
      }
      controlCount++;
      child.mesh.computeWorldMatrix(true);
      const boundingBox = child.mesh.getHierarchyBoundingVectors();
      const extendSize = TmpVectors.Vector3[0];
      const diff = TmpVectors.Vector3[1];
      boundingBox.max.subtractToRef(boundingBox.min, diff);
      diff.scaleInPlace(0.5);
      Vector3.TransformNormalToRef(diff, currentInverseWorld, extendSize);
      this._cellWidth = Math.max(this._cellWidth, extendSize.x * 2);
      this._cellHeight = Math.max(this._cellHeight, extendSize.y * 2);
    }
    this._cellWidth += this.margin * 2;
    this._cellHeight += this.margin * 2;
    if (this._rowThenColum) {
      columns = this._columns;
      rows = Math.ceil(controlCount / this._columns);
    } else {
      rows = this._rows;
      columns = Math.ceil(controlCount / this._rows);
    }
    const startOffsetX = columns * 0.5 * this._cellWidth;
    const startOffsetY = rows * 0.5 * this._cellHeight;
    const nodeGrid = [];
    let cellCounter = 0;
    if (this._rowThenColum) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          nodeGrid.push(new Vector3(c * this._cellWidth - startOffsetX + this._cellWidth / 2, r * this._cellHeight - startOffsetY + this._cellHeight / 2, 0));
          cellCounter++;
          if (cellCounter > controlCount) {
            break;
          }
        }
      }
    } else {
      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
          nodeGrid.push(new Vector3(c * this._cellWidth - startOffsetX + this._cellWidth / 2, r * this._cellHeight - startOffsetY + this._cellHeight / 2, 0));
          cellCounter++;
          if (cellCounter > controlCount) {
            break;
          }
        }
      }
    }
    cellCounter = 0;
    for (const child of this._children) {
      if (!child.mesh) {
        continue;
      }
      this._mapGridNode(child, nodeGrid[cellCounter]);
      cellCounter++;
    }
    this._finalProcessing();
  }
  /** Child classes can implement this function to provide additional processing */
  _finalProcessing() {
  }
};

// node_modules/@babylonjs/gui/3D/controls/cylinderPanel.js
var CylinderPanel = class extends VolumeBasedPanel {
  constructor() {
    super(...arguments);
    this._radius = 5;
  }
  /**
   * Gets or sets the radius of the cylinder where to project controls (5 by default)
   */
  get radius() {
    return this._radius;
  }
  set radius(value) {
    if (this._radius === value) {
      return;
    }
    this._radius = value;
    Tools.SetImmediate(() => {
      this._arrangeChildren();
    });
  }
  _mapGridNode(control, nodePosition) {
    const mesh = control.mesh;
    if (!mesh) {
      return;
    }
    const newPos = this._cylindricalMapping(nodePosition);
    control.position = newPos;
    switch (this.orientation) {
      case Container3D.FACEORIGIN_ORIENTATION:
        mesh.lookAt(new Vector3(2 * newPos.x, newPos.y, 2 * newPos.z));
        break;
      case Container3D.FACEORIGINREVERSED_ORIENTATION:
        mesh.lookAt(new Vector3(-newPos.x, newPos.y, -newPos.z));
        break;
      case Container3D.FACEFORWARD_ORIENTATION:
        break;
      case Container3D.FACEFORWARDREVERSED_ORIENTATION:
        mesh.rotate(Axis.Y, Math.PI, Space.LOCAL);
        break;
    }
  }
  _cylindricalMapping(source) {
    const newPos = new Vector3(0, source.y, this._radius);
    const yAngle = source.x / this._radius;
    Matrix.RotationYawPitchRollToRef(yAngle, 0, 0, TmpVectors.Matrix[0]);
    return Vector3.TransformNormal(newPos, TmpVectors.Matrix[0]);
  }
};

// node_modules/@babylonjs/gui/3D/materials/fluent/shaders/fluent.vertex.js
var name2 = "fluentVertexShader";
var shader = `precision highp float;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;uniform mat4 world;uniform mat4 viewProjection;varying vec2 vUV;
#ifdef BORDER
varying vec2 scaleInfo;uniform float borderWidth;uniform vec3 scaleFactor;
#endif
#ifdef HOVERLIGHT
varying vec3 worldPosition;
#endif
void main(void) {vUV=uv;
#ifdef BORDER
vec3 scale=scaleFactor;float minScale=min(min(scale.x,scale.y),scale.z);float maxScale=max(max(scale.x,scale.y),scale.z);float minOverMiddleScale=minScale/(scale.x+scale.y+scale.z-minScale-maxScale);float areaYZ=scale.y*scale.z;float areaXZ=scale.x*scale.z;float areaXY=scale.x*scale.y;float scaledBorderWidth=borderWidth; 
if (abs(normal.x)==1.0) 
{scale.x=scale.y;scale.y=scale.z;if (areaYZ>areaXZ && areaYZ>areaXY)
{scaledBorderWidth*=minOverMiddleScale;}}
else if (abs(normal.y)==1.0) 
{scale.x=scale.z;if (areaXZ>areaXY && areaXZ>areaYZ)
{scaledBorderWidth*=minOverMiddleScale;}}
else 
{if (areaXY>areaYZ && areaXY>areaXZ)
{scaledBorderWidth*=minOverMiddleScale;}}
float scaleRatio=min(scale.x,scale.y)/max(scale.x,scale.y);if (scale.x>scale.y)
{scaleInfo.x=1.0-(scaledBorderWidth*scaleRatio);scaleInfo.y=1.0-scaledBorderWidth;}
else
{scaleInfo.x=1.0-scaledBorderWidth;scaleInfo.y=1.0-(scaledBorderWidth*scaleRatio);} 
#endif 
vec4 worldPos=world*vec4(position,1.0);
#ifdef HOVERLIGHT
worldPosition=worldPos.xyz;
#endif
gl_Position=viewProjection*worldPos;}
`;
ShaderStore.ShadersStore[name2] = shader;

// node_modules/@babylonjs/gui/3D/materials/fluent/shaders/fluent.fragment.js
var name3 = "fluentPixelShader";
var shader2 = `precision highp float;varying vec2 vUV;uniform vec4 albedoColor;
#ifdef INNERGLOW
uniform vec4 innerGlowColor;
#endif
#ifdef BORDER
varying vec2 scaleInfo;uniform float edgeSmoothingValue;uniform float borderMinValue;
#endif
#ifdef HOVERLIGHT
varying vec3 worldPosition;uniform vec3 hoverPosition;uniform vec4 hoverColor;uniform float hoverRadius;
#endif
#ifdef TEXTURE
uniform sampler2D albedoSampler;uniform mat4 textureMatrix;vec2 finalUV;
#endif
void main(void) {vec3 albedo=albedoColor.rgb;float alpha=albedoColor.a;
#ifdef TEXTURE
finalUV=vec2(textureMatrix*vec4(vUV,1.0,0.0));albedo=texture2D(albedoSampler,finalUV).rgb;
#endif
#ifdef HOVERLIGHT
float pointToHover=(1.0-clamp(length(hoverPosition-worldPosition)/hoverRadius,0.,1.))*hoverColor.a;albedo=clamp(albedo+hoverColor.rgb*pointToHover,0.,1.);
#else
float pointToHover=1.0;
#endif
#ifdef BORDER 
float borderPower=10.0;float inverseBorderPower=1.0/borderPower;vec3 borderColor=albedo*borderPower;vec2 distanceToEdge;distanceToEdge.x=abs(vUV.x-0.5)*2.0;distanceToEdge.y=abs(vUV.y-0.5)*2.0;float borderValue=max(smoothstep(scaleInfo.x-edgeSmoothingValue,scaleInfo.x+edgeSmoothingValue,distanceToEdge.x),
smoothstep(scaleInfo.y-edgeSmoothingValue,scaleInfo.y+edgeSmoothingValue,distanceToEdge.y));borderColor=borderColor*borderValue*max(borderMinValue*inverseBorderPower,pointToHover); 
albedo+=borderColor;alpha=max(alpha,borderValue);
#endif
#ifdef INNERGLOW
vec2 uvGlow=(vUV-vec2(0.5,0.5))*(innerGlowColor.a*2.0);uvGlow=uvGlow*uvGlow;uvGlow=uvGlow*uvGlow;albedo+=mix(vec3(0.0,0.0,0.0),innerGlowColor.rgb,uvGlow.x+uvGlow.y); 
#endif
gl_FragColor=vec4(albedo,alpha);}`;
ShaderStore.ShadersStore[name3] = shader2;

// node_modules/@babylonjs/gui/3D/materials/fluent/fluentMaterial.js
var FluentMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this.INNERGLOW = false;
    this.BORDER = false;
    this.HOVERLIGHT = false;
    this.TEXTURE = false;
    this.rebuild();
  }
};
var FluentMaterial = class _FluentMaterial extends PushMaterial {
  /**
   * Creates a new Fluent material
   * @param name defines the name of the material
   * @param scene defines the hosting scene
   */
  constructor(name22, scene) {
    super(name22, scene);
    this.innerGlowColorIntensity = 0.5;
    this.innerGlowColor = new Color3(1, 1, 1);
    this.albedoColor = new Color3(0.3, 0.35, 0.4);
    this.renderBorders = false;
    this.borderWidth = 0.5;
    this.edgeSmoothingValue = 0.02;
    this.borderMinValue = 0.1;
    this.renderHoverLight = false;
    this.hoverRadius = 0.01;
    this.hoverColor = new Color4(0.3, 0.3, 0.3, 1);
    this.hoverPosition = Vector3.Zero();
  }
  needAlphaBlending() {
    return this.alpha !== 1;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new FluentMaterialDefines();
    }
    const scene = this.getScene();
    const defines = subMesh.materialDefines;
    if (!this.checkReadyOnEveryCall && subMesh.effect) {
      if (defines._renderId === scene.getRenderId()) {
        return true;
      }
    }
    if (defines._areTexturesDirty) {
      defines.INNERGLOW = this.innerGlowColorIntensity > 0;
      defines.BORDER = this.renderBorders;
      defines.HOVERLIGHT = this.renderHoverLight;
      if (this._albedoTexture) {
        if (!this._albedoTexture.isReadyOrNotBlocking()) {
          return false;
        } else {
          defines.TEXTURE = true;
        }
      } else {
        defines.TEXTURE = false;
      }
    }
    const engine = scene.getEngine();
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const attribs = [VertexBuffer.PositionKind];
      attribs.push(VertexBuffer.NormalKind);
      attribs.push(VertexBuffer.UVKind);
      const shaderName = "fluent";
      const uniforms = [
        "world",
        "viewProjection",
        "innerGlowColor",
        "albedoColor",
        "borderWidth",
        "edgeSmoothingValue",
        "scaleFactor",
        "borderMinValue",
        "hoverColor",
        "hoverPosition",
        "hoverRadius",
        "textureMatrix"
      ];
      const samplers = ["albedoSampler"];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      const join = defines.toString();
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks: null,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines, this._materialContext);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
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
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
    if (this._mustRebind(scene, effect, subMesh)) {
      this._activeEffect.setColor4("albedoColor", this.albedoColor, this.alpha);
      if (defines.INNERGLOW) {
        this._activeEffect.setColor4("innerGlowColor", this.innerGlowColor, this.innerGlowColorIntensity);
      }
      if (defines.BORDER) {
        this._activeEffect.setFloat("borderWidth", this.borderWidth);
        this._activeEffect.setFloat("edgeSmoothingValue", this.edgeSmoothingValue);
        this._activeEffect.setFloat("borderMinValue", this.borderMinValue);
        mesh.getBoundingInfo().boundingBox.extendSize.multiplyToRef(mesh.scaling, TmpVectors.Vector3[0]);
        this._activeEffect.setVector3("scaleFactor", TmpVectors.Vector3[0]);
      }
      if (defines.HOVERLIGHT) {
        this._activeEffect.setDirectColor4("hoverColor", this.hoverColor);
        this._activeEffect.setFloat("hoverRadius", this.hoverRadius);
        this._activeEffect.setVector3("hoverPosition", this.hoverPosition);
      }
      if (defines.TEXTURE && this._albedoTexture) {
        this._activeEffect.setTexture("albedoSampler", this._albedoTexture);
        const matrix = this._albedoTexture.getTextureMatrix();
        this._activeEffect.setMatrix("textureMatrix", matrix);
      }
    }
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  getActiveTextures() {
    const activeTextures = super.getActiveTextures();
    return activeTextures;
  }
  hasTexture(texture) {
    if (super.hasTexture(texture)) {
      return true;
    }
    return false;
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _FluentMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = super.serialize();
    serializationObject.customType = "BABYLON.GUI.FluentMaterial";
    return serializationObject;
  }
  getClassName() {
    return "FluentMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _FluentMaterial(source.name, scene), source, scene, rootUrl);
  }
};
__decorate([
  serialize(),
  expandToProperty("_markAllSubMeshesAsTexturesDirty")
], FluentMaterial.prototype, "innerGlowColorIntensity", void 0);
__decorate([
  serializeAsColor3()
], FluentMaterial.prototype, "innerGlowColor", void 0);
__decorate([
  serializeAsColor3()
], FluentMaterial.prototype, "albedoColor", void 0);
__decorate([
  serialize(),
  expandToProperty("_markAllSubMeshesAsTexturesDirty")
], FluentMaterial.prototype, "renderBorders", void 0);
__decorate([
  serialize()
], FluentMaterial.prototype, "borderWidth", void 0);
__decorate([
  serialize()
], FluentMaterial.prototype, "edgeSmoothingValue", void 0);
__decorate([
  serialize()
], FluentMaterial.prototype, "borderMinValue", void 0);
__decorate([
  serialize(),
  expandToProperty("_markAllSubMeshesAsTexturesDirty")
], FluentMaterial.prototype, "renderHoverLight", void 0);
__decorate([
  serialize()
], FluentMaterial.prototype, "hoverRadius", void 0);
__decorate([
  serializeAsColor4()
], FluentMaterial.prototype, "hoverColor", void 0);
__decorate([
  serializeAsVector3()
], FluentMaterial.prototype, "hoverPosition", void 0);
__decorate([
  serializeAsTexture("albedoTexture")
], FluentMaterial.prototype, "_albedoTexture", void 0);
__decorate([
  expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
], FluentMaterial.prototype, "albedoTexture", void 0);
RegisterClass("BABYLON.GUI.FluentMaterial", FluentMaterial);

// node_modules/@babylonjs/gui/3D/controls/touchHolographicMenu.js
var TouchHolographicMenu = class _TouchHolographicMenu extends VolumeBasedPanel {
  /**
   * Gets or sets the margin size of the backplate in button size units.
   * Setting this to 1, will make the backPlate margin the size of 1 button
   */
  get backPlateMargin() {
    return this._backPlateMargin;
  }
  set backPlateMargin(value) {
    this._backPlateMargin = value;
    if (this._children.length >= 1) {
      this.children.forEach((control) => {
        this._updateCurrentMinMax(control.position);
      });
      this._updateMargins();
    }
  }
  _createNode(scene) {
    const node = new Mesh(`menu_${this.name}`, scene);
    this._backPlate = CreateBox("backPlate" + this.name, { size: 1 }, scene);
    this._backPlate.parent = node;
    return node;
  }
  _affectMaterial(mesh) {
    this._backPlateMaterial = new FluentMaterial(this.name + "backPlateMaterial", mesh.getScene());
    this._backPlateMaterial.albedoColor = new Color3(0.08, 0.15, 0.55);
    this._backPlateMaterial.renderBorders = true;
    this._backPlateMaterial.renderHoverLight = true;
    this._pickedPointObserver = this._host.onPickedPointChangedObservable.add((pickedPoint) => {
      if (pickedPoint) {
        this._backPlateMaterial.hoverPosition = pickedPoint;
        this._backPlateMaterial.hoverColor.a = 1;
      } else {
        this._backPlateMaterial.hoverColor.a = 0;
      }
    });
    this._backPlate.material = this._backPlateMaterial;
  }
  _mapGridNode(control, nodePosition) {
    const mesh = control.mesh;
    if (!mesh) {
      return;
    }
    control.position = nodePosition.clone();
    this._updateCurrentMinMax(nodePosition);
  }
  _finalProcessing() {
    this._updateMargins();
  }
  _updateCurrentMinMax(nodePosition) {
    if (!this._currentMin) {
      this._currentMin = nodePosition.clone();
      this._currentMax = nodePosition.clone();
    }
    this._currentMin.minimizeInPlace(nodePosition);
    this._currentMax.maximizeInPlace(nodePosition);
  }
  _updateMargins() {
    if (this._children.length > 0) {
      this._currentMin.addInPlaceFromFloats(-this._cellWidth / 2, -this._cellHeight / 2, 0);
      this._currentMax.addInPlaceFromFloats(this._cellWidth / 2, this._cellHeight / 2, 0);
      const extendSize = this._currentMax.subtract(this._currentMin);
      this._backPlate.scaling.x = extendSize.x + this._cellWidth * this.backPlateMargin;
      this._backPlate.scaling.y = extendSize.y + this._cellHeight * this.backPlateMargin;
      this._backPlate.scaling.z = 1e-3;
      for (let i = 0; i < this._children.length; i++) {
        this._children[i].position.subtractInPlace(this._currentMin).subtractInPlace(extendSize.scale(0.5));
        this._children[i].position.z -= 0.01;
      }
    }
    this._currentMin = null;
    this._currentMax = null;
  }
  /**
   * Creates a holographic menu GUI 3D control
   * @param name name of the menu
   */
  constructor(name22) {
    super(name22);
    this._backPlateMargin = 1.25;
  }
  /**
   * Adds a button to the menu.
   * Please note that the back material of the button will be set to transparent as it is attached to the menu.
   *
   * @param button Button to add
   * @returns This menu
   */
  addButton(button) {
    const wasLayoutBlocked = this.blockLayout;
    if (!wasLayoutBlocked) {
      this.blockLayout = true;
    }
    super.addControl(button);
    button.isBackplateVisible = false;
    button.scaling.scaleInPlace(_TouchHolographicMenu.MENU_BUTTON_SCALE);
    if (!wasLayoutBlocked) {
      this.blockLayout = false;
    }
    return this;
  }
  /**
   * This method should not be used directly. It is inherited from `Container3D`.
   * Please use `addButton` instead.
   * @param _control the control to add
   * @returns the current container
   */
  addControl(_control) {
    Logger.Warn("TouchHolographicMenu can only contain buttons. Please use the method `addButton` instead.");
    return this;
  }
  /**
   * Disposes the menu
   */
  dispose() {
    super.dispose();
    this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
  }
};
TouchHolographicMenu.MENU_BUTTON_SCALE = 1;

// node_modules/@babylonjs/gui/3D/controls/handMenu.js
var HandMenu = class extends TouchHolographicMenu {
  /**
   * The hand constraint behavior setting the transformation of this node
   */
  get handConstraintBehavior() {
    return this._handConstraintBehavior;
  }
  _createNode(scene) {
    const node = super._createNode(scene);
    this._handConstraintBehavior.attach(node);
    return node;
  }
  /**
   * Creates a hand menu GUI 3D control
   * @param xr the WebXRExperienceHelper used to link this control to the enabled WebXRHandTracking feature
   * @param name name of the hand menu
   */
  constructor(xr, name22) {
    super(name22);
    this._handConstraintBehavior = new HandConstraintBehavior();
    this._handConstraintBehavior.linkToXRExperience(xr);
    this.backPlateMargin = 0.15;
    this.rows = 3;
  }
  /**
   * Disposes the hand menu
   */
  dispose() {
    super.dispose();
    this._handConstraintBehavior.detach();
  }
};

// node_modules/@babylonjs/gui/3D/materials/fluentBackplate/shaders/fluentBackplate.fragment.js
var name4 = "fluentBackplatePixelShader";
var shader3 = `uniform vec3 cameraPosition;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;uniform float _Radius_;uniform float _Line_Width_;uniform bool _Absolute_Sizes_;uniform float _Filter_Width_;uniform vec4 _Base_Color_;uniform vec4 _Line_Color_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform float _Rate_;uniform vec4 _Highlight_Color_;uniform float _Highlight_Width_;uniform vec4 _Highlight_Transform_;uniform float _Highlight_;uniform float _Iridescence_Intensity_;uniform float _Iridescence_Edge_Intensity_;uniform float _Angle_;uniform float _Fade_Out_;uniform bool _Reflected_;uniform float _Frequency_;uniform float _Vertical_Offset_;uniform sampler2D _Iridescent_Map_;uniform bool _Use_Global_Left_Index_;uniform bool _Use_Global_Right_Index_;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;void Round_Rect_Fragment_B31(
float Radius,
float Line_Width,
vec4 Line_Color,
float Filter_Width,
vec2 UV,
float Line_Visibility,
vec4 Rect_Parms,
vec4 Fill_Color,
out vec4 Color)
{float d=length(max(abs(UV)-Rect_Parms.xy,0.0));float dx=max(fwidth(d)*Filter_Width,0.00001);float g=min(Rect_Parms.z,Rect_Parms.w);float dgrad=max(fwidth(g)*Filter_Width,0.00001);float Inside_Rect=clamp(g/dgrad,0.0,1.0);float inner=clamp((d+dx*0.5-max(Radius-Line_Width,d-dx*0.5))/dx,0.0,1.0);Color=clamp(mix(Fill_Color,Line_Color,inner),0.0,1.0)*Inside_Rect;}
void Blob_Fragment_B71(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{float k1=dot(Blob_Info1.xy,Blob_Info1.xy);float k2=dot(Blob_Info2.xy,Blob_Info2.xy);vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);}
void Line_Fragment_B48(
vec4 Base_Color,
vec4 Highlight_Color,
float Highlight_Width,
vec3 Line_Vertex,
float Highlight,
out vec4 Line_Color)
{float k2=1.0-clamp(abs(Line_Vertex.y/Highlight_Width),0.0,1.0);Line_Color=mix(Base_Color,Highlight_Color,Highlight*k2);}
void Scale_RGB_B54(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=vec4(Scalar,Scalar,Scalar,1)*Color;}
void Conditional_Float_B38(
bool Which,
float If_True,
float If_False,
out float Result)
{Result=Which ? If_True : If_False;}
void main()
{float R_Q72;float G_Q72;float B_Q72;float A_Q72;R_Q72=vColor.r; G_Q72=vColor.g; B_Q72=vColor.b; A_Q72=vColor.a;vec4 Blob_Color_Q71;
#if BLOB_ENABLE
float k1=dot(vExtra2.xy,vExtra2.xy);float k2=dot(vExtra3.xy,vExtra3.xy);vec3 closer=k1<k2 ? vec3(k1,vExtra2.z,vExtra2.w) : vec3(k2,vExtra3.z,vExtra3.w);Blob_Color_Q71=closer.z*texture(_Blob_Texture_,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
#else
Blob_Color_Q71=vec4(0,0,0,0);
#endif
vec4 Line_Color_Q48;Line_Fragment_B48(_Line_Color_,_Highlight_Color_,_Highlight_Width_,vTangent,_Highlight_,Line_Color_Q48);float X_Q67;float Y_Q67;X_Q67=vUV.x;Y_Q67=vUV.y;vec3 Incident_Q66=normalize(vPosition-cameraPosition);vec3 Reflected_Q60=reflect(Incident_Q66,vBinormal);float Product_Q63=Y_Q67*_Vertical_Offset_;float Dot_Q68=dot(Incident_Q66, Reflected_Q60);float Dot_Q57=dot(vNormal, Incident_Q66);float Result_Q38;Conditional_Float_B38(_Reflected_,Dot_Q68,Dot_Q57,Result_Q38);float Product_Q64=Result_Q38*_Frequency_;float Sum_Q69=Product_Q64+1.0;float Product_Q70=Sum_Q69*0.5;float Sum_Q62=Product_Q63+Product_Q70;float FractF_Q59=fract(Sum_Q62);vec2 Vec2_Q65=vec2(FractF_Q59,0.5);vec4 Color_Q58;
#if IRIDESCENT_MAP_ENABLE
Color_Q58=texture(_Iridescent_Map_,Vec2_Q65);
#else
Color_Q58=vec4(0,0,0,0);
#endif
vec4 Result_Q54;Scale_RGB_B54(Color_Q58,_Iridescence_Edge_Intensity_,Result_Q54);vec4 Result_Q55;Scale_RGB_B54(Color_Q58,_Iridescence_Intensity_,Result_Q55);vec4 Base_And_Iridescent_Q53;Base_And_Iridescent_Q53=Line_Color_Q48+vec4(Result_Q54.rgb,0.0);vec4 Base_And_Iridescent_Q56;Base_And_Iridescent_Q56=_Base_Color_+vec4(Result_Q55.rgb,0.0);vec4 Result_Q52=Base_And_Iridescent_Q53; Result_Q52.a=1.0;vec4 Result_Q35=Blob_Color_Q71+(1.0-Blob_Color_Q71.a)*Base_And_Iridescent_Q56;vec4 Color_Q31;Round_Rect_Fragment_B31(R_Q72,G_Q72,Result_Q52,_Filter_Width_,vUV,1.0,vExtra1,Result_Q35,Color_Q31);vec4 Result_Q47=_Fade_Out_*Color_Q31;vec4 Out_Color=Result_Q47;float Clip_Threshold=0.001;bool To_sRGB=false;gl_FragColor=Out_Color;}`;
ShaderStore.ShadersStore[name4] = shader3;

// node_modules/@babylonjs/gui/3D/materials/fluentBackplate/shaders/fluentBackplate.vertex.js
var name5 = "fluentBackplateVertexShader";
var shader4 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;uniform float _Line_Width_;uniform bool _Absolute_Sizes_;uniform float _Filter_Width_;uniform vec4 _Base_Color_;uniform vec4 _Line_Color_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform float _Rate_;uniform vec4 _Highlight_Color_;uniform float _Highlight_Width_;uniform vec4 _Highlight_Transform_;uniform float _Highlight_;uniform float _Iridescence_Intensity_;uniform float _Iridescence_Edge_Intensity_;uniform float _Angle_;uniform float _Fade_Out_;uniform bool _Reflected_;uniform float _Frequency_;uniform float _Vertical_Offset_;uniform sampler2D _Iridescent_Map_;uniform bool _Use_Global_Left_Index_;uniform bool _Use_Global_Right_Index_;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;void Object_To_World_Pos_B115(
vec3 Pos_Object,
out vec3 Pos_World)
{Pos_World=(world*vec4(Pos_Object,1.0)).xyz;}
void PickDir_B140(
float Degrees,
vec3 DirX,
vec3 DirY,
out vec3 Dir)
{float a=Degrees*3.14159/180.0;Dir=cos(a)*DirX+sin(a)*DirY;}
void Round_Rect_Vertex_B139(
vec2 UV,
float Radius,
float Margin,
float Anisotropy,
float Gradient1,
float Gradient2,
out vec2 Rect_UV,
out vec4 Rect_Parms,
out vec2 Scale_XY,
out vec2 Line_UV)
{Scale_XY=vec2(Anisotropy,1.0);Line_UV=(UV-vec2(0.5,0.5));Rect_UV=Line_UV*Scale_XY;Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius)-vec2(Margin,Margin);Rect_Parms.z=Gradient1; 
Rect_Parms.w=Gradient2;}
void Line_Vertex_B135(
vec2 Scale_XY,
vec2 UV,
float Time,
float Rate,
vec4 Highlight_Transform,
out vec3 Line_Vertex)
{float angle2=(Rate*Time)*2.0*3.1416;float sinAngle2=sin(angle2);float cosAngle2=cos(angle2);vec2 xformUV=UV*Highlight_Transform.xy+Highlight_Transform.zw;Line_Vertex.x=0.0;Line_Vertex.y=cosAngle2*xformUV.x-sinAngle2*xformUV.y;Line_Vertex.z=0.0; }
void Blob_Vertex_B180(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{vec3 blob=Blob_Position;vec3 delta=blob-Position;float dist=dot(Normal,delta);float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);float Fade=fadeValue*Intensity*Blob_Fade;float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);}
void Move_Verts_B129(
float Anisotropy,
vec3 P,
float Radius,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir)
{vec2 UV=P.xy*2.0+0.5;vec2 center=clamp(UV,0.0,1.0);vec2 delta=UV-center;vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);New_UV=center+r2*(UV-2.0*center+0.5);New_P=vec3(New_UV-0.5,P.z);Radial_Gradient=1.0-length(delta)*2.0;Radial_Dir=vec3(delta*r2,0.0);}
void Object_To_World_Dir_B132(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;Binormal_Length=length(Binormal_World);Binormal_World_N=Binormal_World/Binormal_Length;}
void RelativeOrAbsoluteDetail_B147(
float Nominal_Radius,
float Nominal_LineWidth,
bool Absolute_Measurements,
float Height,
out float Radius,
out float Line_Width)
{float scale=Absolute_Measurements ? 1.0/Height : 1.0;Radius=Nominal_Radius*scale;Line_Width=Nominal_LineWidth*scale;}
void Edge_AA_Vertex_B130(
vec3 Position_World,
vec3 Position_Object,
vec3 Normal_Object,
vec3 Eye,
float Radial_Gradient,
vec3 Radial_Dir,
vec3 Tangent,
out float Gradient1,
out float Gradient2)
{vec3 I=(Eye-Position_World);vec3 T=(world* vec4(Tangent,0.0)).xyz;float g=(dot(T,I)<0.0) ? 0.0 : 1.0;if (Normal_Object.z==0.0) { 
Gradient1=Position_Object.z>0.0 ? g : 1.0;Gradient2=Position_Object.z>0.0 ? 1.0 : g;} else {Gradient1=g+(1.0-g)*(Radial_Gradient);Gradient2=1.0;}}
void Pick_Radius_B144(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{bool whichY=Position.y>0.0;Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);Result*=Radius;}
void main()
{vec3 Nrm_World_Q128;Nrm_World_Q128=normalize((world*vec4(normal,0.0)).xyz);vec3 Tangent_World_Q131;vec3 Tangent_World_N_Q131;float Tangent_Length_Q131;Tangent_World_Q131=(world*vec4(vec3(1,0,0),0.0)).xyz;Tangent_Length_Q131=length(Tangent_World_Q131);Tangent_World_N_Q131=Tangent_World_Q131/Tangent_Length_Q131;vec3 Binormal_World_Q132;vec3 Binormal_World_N_Q132;float Binormal_Length_Q132;Object_To_World_Dir_B132(vec3(0,1,0),Binormal_World_Q132,Binormal_World_N_Q132,Binormal_Length_Q132);float Anisotropy_Q133=Tangent_Length_Q131/Binormal_Length_Q132;vec3 Result_Q177;Result_Q177=mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(_Use_Global_Left_Index_));vec3 Result_Q178;Result_Q178=mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(_Use_Global_Right_Index_));float Result_Q144;Pick_Radius_B144(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q144);vec3 Dir_Q140;PickDir_B140(_Angle_,Tangent_World_N_Q131,Binormal_World_N_Q132,Dir_Q140);float Radius_Q147;float Line_Width_Q147;RelativeOrAbsoluteDetail_B147(Result_Q144,_Line_Width_,_Absolute_Sizes_,Binormal_Length_Q132,Radius_Q147,Line_Width_Q147);vec4 Out_Color_Q145=vec4(Radius_Q147,Line_Width_Q147,0,1);vec3 New_P_Q129;vec2 New_UV_Q129;float Radial_Gradient_Q129;vec3 Radial_Dir_Q129;Move_Verts_B129(Anisotropy_Q133,position,Radius_Q147,New_P_Q129,New_UV_Q129,Radial_Gradient_Q129,Radial_Dir_Q129);vec3 Pos_World_Q115;Object_To_World_Pos_B115(New_P_Q129,Pos_World_Q115);vec4 Blob_Info_Q180;
#if BLOB_ENABLE
Blob_Vertex_B180(Pos_World_Q115,Nrm_World_Q128,Tangent_World_N_Q131,Binormal_World_N_Q132,Result_Q177,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q180);
#else
Blob_Info_Q180=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q181;
#if BLOB_ENABLE_2
Blob_Vertex_B180(Pos_World_Q115,Nrm_World_Q128,Tangent_World_N_Q131,Binormal_World_N_Q132,Result_Q178,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q181);
#else
Blob_Info_Q181=vec4(0,0,0,0);
#endif
float Gradient1_Q130;float Gradient2_Q130;
#if SMOOTH_EDGES
Edge_AA_Vertex_B130(Pos_World_Q115,position,normal,cameraPosition,Radial_Gradient_Q129,Radial_Dir_Q129,tangent,Gradient1_Q130,Gradient2_Q130);
#else
Gradient1_Q130=1.0;Gradient2_Q130=1.0;
#endif
vec2 Rect_UV_Q139;vec4 Rect_Parms_Q139;vec2 Scale_XY_Q139;vec2 Line_UV_Q139;Round_Rect_Vertex_B139(New_UV_Q129,Radius_Q147,0.0,Anisotropy_Q133,Gradient1_Q130,Gradient2_Q130,Rect_UV_Q139,Rect_Parms_Q139,Scale_XY_Q139,Line_UV_Q139);vec3 Line_Vertex_Q135;Line_Vertex_B135(Scale_XY_Q139,Line_UV_Q139,0.0,_Rate_,_Highlight_Transform_,Line_Vertex_Q135);vec3 Position=Pos_World_Q115;vec3 Normal=Dir_Q140;vec2 UV=Rect_UV_Q139;vec3 Tangent=Line_Vertex_Q135;vec3 Binormal=Nrm_World_Q128;vec4 Color=Out_Color_Q145;vec4 Extra1=Rect_Parms_Q139;vec4 Extra2=Blob_Info_Q180;vec4 Extra3=Blob_Info_Q181;gl_Position=viewProjection*vec4(Position,1);vPosition=Position;vNormal=Normal;vUV=UV;vTangent=Tangent;vBinormal=Binormal;vColor=Color;vExtra1=Extra1;vExtra2=Extra2;vExtra3=Extra3;}`;
ShaderStore.ShadersStore[name5] = shader4;

// node_modules/@babylonjs/gui/3D/materials/fluentBackplate/fluentBackplateMaterial.js
var FluentBackplateMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this.BLOB_ENABLE = true;
    this.BLOB_ENABLE_2 = true;
    this.SMOOTH_EDGES = true;
    this.IRIDESCENT_MAP_ENABLE = true;
    this._needNormals = true;
    this.rebuild();
  }
};
var FluentBackplateMaterial = class _FluentBackplateMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.radius = 0.03;
    this.lineWidth = 0.01;
    this.absoluteSizes = false;
    this._filterWidth = 1;
    this.baseColor = new Color4(0.0392157, 0.0666667, 0.207843, 1);
    this.lineColor = new Color4(0.14902, 0.133333, 0.384314, 1);
    this.blobIntensity = 0.98;
    this.blobFarSize = 0.04;
    this.blobNearDistance = 0;
    this.blobFarDistance = 0.08;
    this.blobFadeLength = 0.08;
    this.blobNearSize = 0.22;
    this.blobPulse = 0;
    this.blobFade = 0;
    this.blobNearSize2 = 0.22;
    this.blobPulse2 = 0;
    this.blobFade2 = 0;
    this._rate = 0.135;
    this.highlightColor = new Color4(0.98, 0.98, 0.98, 1);
    this.highlightWidth = 0.25;
    this._highlightTransform = new Vector4(1, 1, 0, 0);
    this._highlight = 1;
    this.iridescenceIntensity = 0;
    this.iridescenceEdgeIntensity = 1;
    this._angle = -45;
    this.fadeOut = 1;
    this._reflected = true;
    this._frequency = 1;
    this._verticalOffset = 0;
    this.globalLeftIndexTipPosition = Vector3.Zero();
    this._globalLeftIndexTipPosition4 = Vector4.Zero();
    this.globalRightIndexTipPosition = Vector3.Zero();
    this._globalRightIndexTipPosition4 = Vector4.Zero();
    this.alphaMode = Constants.ALPHA_DISABLE;
    this.backFaceCulling = false;
    this._blobTexture = new Texture(_FluentBackplateMaterial.BLOB_TEXTURE_URL, this.getScene(), true, false, Texture.NEAREST_SAMPLINGMODE);
    this._iridescentMap = new Texture(_FluentBackplateMaterial.IM_TEXTURE_URL, this.getScene(), true, false, Texture.NEAREST_SAMPLINGMODE);
  }
  needAlphaBlending() {
    return false;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new FluentBackplateMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, false, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "fluentBackplate";
      const join = defines.toString();
      const uniforms = [
        "world",
        "viewProjection",
        "cameraPosition",
        "_Radius_",
        "_Line_Width_",
        "_Absolute_Sizes_",
        "_Filter_Width_",
        "_Base_Color_",
        "_Line_Color_",
        "_Radius_Top_Left_",
        "_Radius_Top_Right_",
        "_Radius_Bottom_Left_",
        "_Radius_Bottom_Right_",
        "_Blob_Position_",
        "_Blob_Intensity_",
        "_Blob_Near_Size_",
        "_Blob_Far_Size_",
        "_Blob_Near_Distance_",
        "_Blob_Far_Distance_",
        "_Blob_Fade_Length_",
        "_Blob_Pulse_",
        "_Blob_Fade_",
        "_Blob_Texture_",
        "_Blob_Position_2_",
        "_Blob_Near_Size_2_",
        "_Blob_Pulse_2_",
        "_Blob_Fade_2_",
        "_Rate_",
        "_Highlight_Color_",
        "_Highlight_Width_",
        "_Highlight_Transform_",
        "_Highlight_",
        "_Iridescence_Intensity_",
        "_Iridescence_Edge_Intensity_",
        "_Angle_",
        "_Fade_Out_",
        "_Reflected_",
        "_Frequency_",
        "_Vertical_Offset_",
        "_Iridescent_Map_",
        "_Use_Global_Left_Index_",
        "_Use_Global_Right_Index_",
        "Global_Left_Index_Tip_Position",
        "Global_Right_Index_Tip_Position"
      ];
      const samplers = ["_Blob_Texture_", "_Iridescent_Map_"];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines, this._materialContext);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
    var _a;
    const defines = subMesh.materialDefines;
    if (!defines) {
      return;
    }
    const effect = subMesh.effect;
    if (!effect) {
      return;
    }
    this._activeEffect = effect;
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", this.getScene().getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", ((_a = this.getScene().activeCamera) == null ? void 0 : _a.position) ?? Vector3.ZeroReadOnly);
    this._activeEffect.setFloat("_Radius_", this.radius);
    this._activeEffect.setFloat("_Line_Width_", this.lineWidth);
    this._activeEffect.setFloat("_Absolute_Sizes_", this.absoluteSizes ? 1 : 0);
    this._activeEffect.setFloat("_Filter_Width_", this._filterWidth);
    this._activeEffect.setDirectColor4("_Base_Color_", this.baseColor);
    this._activeEffect.setDirectColor4("_Line_Color_", this.lineColor);
    this._activeEffect.setFloat("_Radius_Top_Left_", 1);
    this._activeEffect.setFloat("_Radius_Top_Right_", 1);
    this._activeEffect.setFloat("_Radius_Bottom_Left_", 1);
    this._activeEffect.setFloat("_Radius_Bottom_Right_", 1);
    this._activeEffect.setFloat("_Blob_Intensity_", this.blobIntensity);
    this._activeEffect.setFloat("_Blob_Near_Size_", this.blobNearSize);
    this._activeEffect.setFloat("_Blob_Far_Size_", this.blobFarSize);
    this._activeEffect.setFloat("_Blob_Near_Distance_", this.blobNearDistance);
    this._activeEffect.setFloat("_Blob_Far_Distance_", this.blobFarDistance);
    this._activeEffect.setFloat("_Blob_Fade_Length_", this.blobFadeLength);
    this._activeEffect.setFloat("_Blob_Pulse_", this.blobPulse);
    this._activeEffect.setFloat("_Blob_Fade_", this.blobFade);
    this._activeEffect.setTexture("_Blob_Texture_", this._blobTexture);
    this._activeEffect.setFloat("_Blob_Near_Size_2_", this.blobNearSize2);
    this._activeEffect.setFloat("_Blob_Pulse_2_", this.blobPulse2);
    this._activeEffect.setFloat("_Blob_Fade_2_", this.blobFade2);
    this._activeEffect.setFloat("_Rate_", this._rate);
    this._activeEffect.setDirectColor4("_Highlight_Color_", this.highlightColor);
    this._activeEffect.setFloat("_Highlight_Width_", this.highlightWidth);
    this._activeEffect.setVector4("_Highlight_Transform_", this._highlightTransform);
    this._activeEffect.setFloat("_Highlight_", this._highlight);
    this._activeEffect.setFloat("_Iridescence_Intensity_", this.iridescenceIntensity);
    this._activeEffect.setFloat("_Iridescence_Edge_Intensity_", this.iridescenceEdgeIntensity);
    this._activeEffect.setFloat("_Angle_", this._angle);
    this._activeEffect.setFloat("_Fade_Out_", this.fadeOut);
    this._activeEffect.setFloat("_Reflected_", this._reflected ? 1 : 0);
    this._activeEffect.setFloat("_Frequency_", this._frequency);
    this._activeEffect.setFloat("_Vertical_Offset_", this._verticalOffset);
    this._activeEffect.setTexture("_Iridescent_Map_", this._iridescentMap);
    this._activeEffect.setFloat("_Use_Global_Left_Index_", 1);
    this._activeEffect.setFloat("_Use_Global_Right_Index_", 1);
    this._globalLeftIndexTipPosition4.set(this.globalLeftIndexTipPosition.x, this.globalLeftIndexTipPosition.y, this.globalLeftIndexTipPosition.z, 1);
    this._activeEffect.setVector4("Global_Left_Index_Tip_Position", this._globalLeftIndexTipPosition4);
    this._globalRightIndexTipPosition4.set(this.globalRightIndexTipPosition.x, this.globalRightIndexTipPosition.y, this.globalRightIndexTipPosition.z, 1);
    this._activeEffect.setVector4("Global_Right_Index_Tip_Position", this._globalRightIndexTipPosition4);
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
    this._blobTexture.dispose();
    this._iridescentMap.dispose();
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _FluentBackplateMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = super.serialize();
    serializationObject.customType = "BABYLON.FluentBackplateMaterial";
    return serializationObject;
  }
  getClassName() {
    return "FluentBackplateMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _FluentBackplateMaterial(source.name, scene), source, scene, rootUrl);
  }
};
FluentBackplateMaterial.BLOB_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-backplate-blob.png";
FluentBackplateMaterial.IM_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-backplate-iridescence.png";
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "radius", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "lineWidth", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "absoluteSizes", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "baseColor", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "lineColor", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobIntensity", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobFarSize", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobNearDistance", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobFarDistance", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobFadeLength", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobNearSize", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobPulse", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobFade", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobNearSize2", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobPulse2", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "blobFade2", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "highlightColor", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "highlightWidth", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "iridescenceIntensity", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "iridescenceEdgeIntensity", void 0);
__decorate([
  serialize()
], FluentBackplateMaterial.prototype, "fadeOut", void 0);
__decorate([
  serializeAsVector3()
], FluentBackplateMaterial.prototype, "globalLeftIndexTipPosition", void 0);
__decorate([
  serializeAsVector3()
], FluentBackplateMaterial.prototype, "globalRightIndexTipPosition", void 0);
RegisterClass("BABYLON.GUI.FluentBackplateMaterial", FluentBackplateMaterial);

// node_modules/@babylonjs/gui/3D/controls/holographicBackplate.js
var HolographicBackplate = class _HolographicBackplate extends Control3D {
  /**
   * Rendering ground id of the backplate mesh.
   */
  set renderingGroupId(id) {
    this._model.renderingGroupId = id;
  }
  get renderingGroupId() {
    return this._model.renderingGroupId;
  }
  /**
   * Gets the material used by the backplate
   */
  get material() {
    return this._material;
  }
  /**
   * Gets a boolean indicating if this backplate shares its material with other HolographicBackplates
   */
  get shareMaterials() {
    return this._shareMaterials;
  }
  /**
   * Creates a new holographic backplate
   * @param name defines the control name
   * @param _shareMaterials
   */
  constructor(name22, _shareMaterials = true) {
    super(name22);
    this._shareMaterials = _shareMaterials;
  }
  _getTypeName() {
    return "HolographicBackplate";
  }
  // Mesh association
  _createNode(scene) {
    const collisionMesh = CreateBox((this.name ?? "HolographicBackplate") + "_CollisionMesh", {
      width: 1,
      height: 1,
      depth: 1
    }, scene);
    collisionMesh.isPickable = true;
    collisionMesh.visibility = 0;
    SceneLoader.ImportMeshAsync(void 0, _HolographicBackplate.MODEL_BASE_URL, _HolographicBackplate.MODEL_FILENAME, scene).then((result) => {
      const importedModel = result.meshes[1];
      importedModel.name = `${this.name}_frontPlate`;
      importedModel.isPickable = false;
      importedModel.parent = collisionMesh;
      if (this._material) {
        importedModel.material = this._material;
      }
      this._model = importedModel;
    });
    return collisionMesh;
  }
  _createMaterial(mesh) {
    this._material = new FluentBackplateMaterial(this.name + " Material", mesh.getScene());
  }
  _affectMaterial(mesh) {
    if (this._shareMaterials) {
      if (!this._host._touchSharedMaterials["fluentBackplateMaterial"]) {
        this._createMaterial(mesh);
        this._host._touchSharedMaterials["fluentBackplateMaterial"] = this._material;
      } else {
        this._material = this._host._touchSharedMaterials["fluentBackplateMaterial"];
      }
    } else {
      this._createMaterial(mesh);
    }
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    super.dispose();
    if (!this.shareMaterials) {
      this._material.dispose();
    }
    this._model.dispose();
  }
};
HolographicBackplate.MODEL_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
HolographicBackplate.MODEL_FILENAME = "mrtk-fluent-backplate.glb";

// node_modules/@babylonjs/gui/3D/controls/holographicButton.js
var HolographicButton = class extends Button3D {
  _disposeTooltip() {
    this._tooltipFade = null;
    if (this._tooltipTextBlock) {
      this._tooltipTextBlock.dispose();
    }
    if (this._tooltipTexture) {
      this._tooltipTexture.dispose();
    }
    if (this._tooltipMesh) {
      this._tooltipMesh.dispose();
    }
    this.onPointerEnterObservable.remove(this._tooltipHoverObserver);
    this.onPointerOutObservable.remove(this._tooltipOutObserver);
  }
  /**
   * Rendering ground id of all the mesh in the button
   */
  set renderingGroupId(id) {
    this._backPlate.renderingGroupId = id;
    this._textPlate.renderingGroupId = id;
    this._frontPlate.renderingGroupId = id;
    if (this._tooltipMesh) {
      this._tooltipMesh.renderingGroupId = id;
    }
  }
  get renderingGroupId() {
    return this._backPlate.renderingGroupId;
  }
  /**
   * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
   */
  set tooltipText(text) {
    if (!text) {
      this._disposeTooltip();
      return;
    }
    if (!this._tooltipFade) {
      const rightHandedScene = this._backPlate._scene.useRightHandedSystem;
      this._tooltipMesh = CreatePlane("", { size: 1 }, this._backPlate._scene);
      const tooltipBackground = CreatePlane("", { size: 1, sideOrientation: Mesh.DOUBLESIDE }, this._backPlate._scene);
      const mat = new StandardMaterial("", this._backPlate._scene);
      mat.diffuseColor = Color3.FromHexString("#212121");
      tooltipBackground.material = mat;
      tooltipBackground.isPickable = false;
      this._tooltipMesh.addChild(tooltipBackground);
      tooltipBackground.position = Vector3.Forward(rightHandedScene).scale(0.05);
      this._tooltipMesh.scaling.y = 1 / 3;
      this._tooltipMesh.position = Vector3.Up().scale(0.7).add(Vector3.Forward(rightHandedScene).scale(-0.15));
      this._tooltipMesh.isPickable = false;
      this._tooltipMesh.parent = this._backPlate;
      this._tooltipTexture = AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh);
      this._tooltipTextBlock = new TextBlock();
      this._tooltipTextBlock.scaleY = 3;
      this._tooltipTextBlock.color = "white";
      this._tooltipTextBlock.fontSize = 130;
      this._tooltipTexture.addControl(this._tooltipTextBlock);
      this._tooltipFade = new FadeInOutBehavior();
      this._tooltipFade.delay = 500;
      this._tooltipMesh.addBehavior(this._tooltipFade);
      this._tooltipHoverObserver = this.onPointerEnterObservable.add(() => {
        if (this._tooltipFade) {
          this._tooltipFade.fadeIn(true);
        }
      });
      this._tooltipOutObserver = this.onPointerOutObservable.add(() => {
        if (this._tooltipFade) {
          this._tooltipFade.fadeIn(false);
        }
      });
    }
    if (this._tooltipTextBlock) {
      this._tooltipTextBlock.text = text;
    }
  }
  get tooltipText() {
    if (this._tooltipTextBlock) {
      return this._tooltipTextBlock.text;
    }
    return null;
  }
  /**
   * Gets or sets text for the button
   */
  get text() {
    return this._text;
  }
  set text(value) {
    if (this._text === value) {
      return;
    }
    this._text = value;
    this._rebuildContent();
  }
  /**
   * Gets or sets the image url for the button
   */
  get imageUrl() {
    return this._imageUrl;
  }
  set imageUrl(value) {
    if (this._imageUrl === value) {
      return;
    }
    this._imageUrl = value;
    this._rebuildContent();
  }
  /**
   * Gets the back material used by this button
   */
  get backMaterial() {
    return this._backMaterial;
  }
  /**
   * Gets the front material used by this button
   */
  get frontMaterial() {
    return this._frontMaterial;
  }
  /**
   * Gets the plate material used by this button
   */
  get plateMaterial() {
    return this._plateMaterial;
  }
  /**
   * Gets a boolean indicating if this button shares its material with other HolographicButtons
   */
  get shareMaterials() {
    return this._shareMaterials;
  }
  /**
   * Creates a new button
   * @param name defines the control name
   * @param shareMaterials
   */
  constructor(name22, shareMaterials = true) {
    super(name22);
    this._shareMaterials = true;
    this._shareMaterials = shareMaterials;
    this.pointerEnterAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this._frontPlate.setEnabled(true);
    };
    this.pointerOutAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this._frontPlate.setEnabled(false);
    };
  }
  _getTypeName() {
    return "HolographicButton";
  }
  _rebuildContent() {
    this._disposeFacadeTexture();
    const panel = new StackPanel();
    panel.isVertical = true;
    if (IsDocumentAvailable() && !!document.createElement) {
      if (this._imageUrl) {
        const image = new Image();
        image.source = this._imageUrl;
        image.paddingTop = "40px";
        image.height = "180px";
        image.width = "100px";
        image.paddingBottom = "40px";
        panel.addControl(image);
      }
    }
    if (this._text) {
      const text = new TextBlock();
      text.text = this._text;
      text.color = "white";
      text.height = "30px";
      text.fontSize = 24;
      panel.addControl(text);
    }
    if (this._frontPlate) {
      this.content = panel;
    }
  }
  // Mesh association
  _createNode(scene) {
    this._backPlate = CreateBox(this.name + "BackMesh", {
      width: 1,
      height: 1,
      depth: 0.08
    }, scene);
    this._frontPlate = CreateBox(this.name + "FrontMesh", {
      width: 1,
      height: 1,
      depth: 0.08
    }, scene);
    this._frontPlate.parent = this._backPlate;
    this._frontPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(-0.08);
    this._frontPlate.isPickable = false;
    this._frontPlate.setEnabled(false);
    this._textPlate = super._createNode(scene);
    this._textPlate.parent = this._backPlate;
    this._textPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(-0.08);
    this._textPlate.isPickable = false;
    return this._backPlate;
  }
  _applyFacade(facadeTexture) {
    this._plateMaterial.emissiveTexture = facadeTexture;
    this._plateMaterial.opacityTexture = facadeTexture;
  }
  _createBackMaterial(mesh) {
    this._backMaterial = new FluentMaterial(this.name + "Back Material", mesh.getScene());
    this._backMaterial.renderHoverLight = true;
    this._pickedPointObserver = this._host.onPickedPointChangedObservable.add((pickedPoint) => {
      if (pickedPoint) {
        this._backMaterial.hoverPosition = pickedPoint;
        this._backMaterial.hoverColor.a = 1;
      } else {
        this._backMaterial.hoverColor.a = 0;
      }
    });
  }
  _createFrontMaterial(mesh) {
    this._frontMaterial = new FluentMaterial(this.name + "Front Material", mesh.getScene());
    this._frontMaterial.innerGlowColorIntensity = 0;
    this._frontMaterial.alpha = 0.5;
    this._frontMaterial.renderBorders = true;
  }
  _createPlateMaterial(mesh) {
    this._plateMaterial = new StandardMaterial(this.name + "Plate Material", mesh.getScene());
    this._plateMaterial.specularColor = Color3.Black();
  }
  _affectMaterial(mesh) {
    if (this._shareMaterials) {
      if (!this._host._sharedMaterials["backFluentMaterial"]) {
        this._createBackMaterial(mesh);
        this._host._sharedMaterials["backFluentMaterial"] = this._backMaterial;
      } else {
        this._backMaterial = this._host._sharedMaterials["backFluentMaterial"];
      }
      if (!this._host._sharedMaterials["frontFluentMaterial"]) {
        this._createFrontMaterial(mesh);
        this._host._sharedMaterials["frontFluentMaterial"] = this._frontMaterial;
      } else {
        this._frontMaterial = this._host._sharedMaterials["frontFluentMaterial"];
      }
    } else {
      this._createBackMaterial(mesh);
      this._createFrontMaterial(mesh);
    }
    this._createPlateMaterial(mesh);
    this._backPlate.material = this._backMaterial;
    this._frontPlate.material = this._frontMaterial;
    this._textPlate.material = this._plateMaterial;
    this._rebuildContent();
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    super.dispose();
    this._disposeTooltip();
    if (!this.shareMaterials) {
      this._backMaterial.dispose();
      this._frontMaterial.dispose();
      this._plateMaterial.dispose();
      if (this._pickedPointObserver) {
        this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
        this._pickedPointObserver = null;
      }
    }
  }
};

// node_modules/@babylonjs/gui/3D/materials/fluentButton/shaders/fluentButton.fragment.js
var name6 = "fluentButtonPixelShader";
var shader5 = `uniform vec3 cameraPosition;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;uniform float _Edge_Width_;uniform vec4 _Edge_Color_;uniform bool _Relative_Width_;uniform float _Proximity_Max_Intensity_;uniform float _Proximity_Far_Distance_;uniform float _Proximity_Near_Radius_;uniform float _Proximity_Anisotropy_;uniform float _Selection_Fuzz_;uniform float _Selected_;uniform float _Selection_Fade_;uniform float _Selection_Fade_Size_;uniform float _Selected_Distance_;uniform float _Selected_Fade_Length_;uniform bool _Blob_Enable_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Inner_Fade_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform bool _Blob_Enable_2_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Inner_Fade_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform vec3 _Active_Face_Dir_;uniform vec3 _Active_Face_Up_;uniform bool Enable_Fade;uniform float _Fade_Width_;uniform bool _Smooth_Active_Face_;uniform bool _Show_Frame_;uniform bool _Use_Blob_Texture_;uniform bool Use_Global_Left_Index;uniform bool Use_Global_Right_Index;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;uniform vec4 Global_Left_Thumb_Tip_Position;uniform vec4 Global_Right_Thumb_Tip_Position;uniform float Global_Left_Index_Tip_Proximity;uniform float Global_Right_Index_Tip_Proximity;void Holo_Edge_Fragment_B35(
vec4 Edges,
float Edge_Width,
out float NotEdge)
{vec2 c=vec2(min(Edges.r,Edges.g),min(Edges.b,Edges.a));vec2 df=fwidth(c)*Edge_Width;vec2 g=clamp(c/df,0.0,1.0);NotEdge=g.x*g.y;}
void Blob_Fragment_B39(
vec2 UV,
vec3 Blob_Info,
sampler2D Blob_Texture,
out vec4 Blob_Color)
{float k=dot(UV,UV);Blob_Color=Blob_Info.y*texture(Blob_Texture,vec2(vec2(sqrt(k),Blob_Info.x).x,1.0-vec2(sqrt(k),Blob_Info.x).y))*(1.0-clamp(k,0.0,1.0));}
vec2 FilterStep(vec2 Edge,vec2 X)
{vec2 dX=max(fwidth(X),vec2(0.00001,0.00001));return clamp( (X+dX-max(Edge,X-dX))/(dX*2.0),0.0,1.0);}
void Wireframe_Fragment_B59(
vec3 Widths,
vec2 UV,
float Proximity,
vec4 Edge_Color,
out vec4 Wireframe)
{vec2 c=min(UV,vec2(1.0,1.0)-UV);vec2 g=FilterStep(Widths.xy*0.5,c); 
Wireframe=(1.0-min(g.x,g.y))*Proximity*Edge_Color;}
void Proximity_B53(
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Proximity_Max_Intensity,
float Proximity_Near_Radius,
vec3 Position,
vec3 Show_Selection,
vec4 Extra1,
float Dist_To_Face,
float Intensity,
out float Proximity)
{vec2 delta1=Extra1.xy;vec2 delta2=Extra1.zw;float d2=sqrt(min(dot(delta1,delta1),dot(delta2,delta2))+Dist_To_Face*Dist_To_Face);Proximity=Intensity*Proximity_Max_Intensity*(1.0-clamp(d2/Proximity_Near_Radius,0.0,1.0))*(1.0-Show_Selection.x)+Show_Selection.x;}
void To_XYZ_B46(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{X=Vec3.x;Y=Vec3.y;Z=Vec3.z;}
void main()
{float NotEdge_Q35;
#if ENABLE_FADE
Holo_Edge_Fragment_B35(vColor,_Fade_Width_,NotEdge_Q35);
#else
NotEdge_Q35=1.0;
#endif
vec4 Blob_Color_Q39;float k=dot(vUV,vUV);vec2 blobTextureCoord=vec2(vec2(sqrt(k),vTangent.x).x,1.0-vec2(sqrt(k),vTangent.x).y);vec4 blobColor=mix(vec4(1.0,1.0,1.0,1.0)*step(1.0-vTangent.x,clamp(sqrt(k)+0.1,0.0,1.0)),texture(_Blob_Texture_,blobTextureCoord),float(_Use_Blob_Texture_));Blob_Color_Q39=vTangent.y*blobColor*(1.0-clamp(k,0.0,1.0));float Is_Quad_Q24;Is_Quad_Q24=vNormal.z;vec3 Blob_Position_Q41= mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(Use_Global_Left_Index));vec3 Blob_Position_Q42= mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(Use_Global_Right_Index));float X_Q46;float Y_Q46;float Z_Q46;To_XYZ_B46(vBinormal,X_Q46,Y_Q46,Z_Q46);float Proximity_Q53;Proximity_B53(Blob_Position_Q41,Blob_Position_Q42,_Proximity_Max_Intensity_,_Proximity_Near_Radius_,vPosition,vBinormal,vExtra1,Y_Q46,Z_Q46,Proximity_Q53);vec4 Wireframe_Q59;Wireframe_Fragment_B59(vNormal,vUV,Proximity_Q53,_Edge_Color_,Wireframe_Q59);vec4 Wire_Or_Blob_Q23=mix(Wireframe_Q59,Blob_Color_Q39,Is_Quad_Q24);vec4 Result_Q22;Result_Q22=mix(Wire_Or_Blob_Q23,vec4(0.3,0.3,0.3,0.3),float(_Show_Frame_));vec4 Final_Color_Q37=NotEdge_Q35*Result_Q22;vec4 Out_Color=Final_Color_Q37;float Clip_Threshold=0.0;bool To_sRGB=false;gl_FragColor=Out_Color;}`;
ShaderStore.ShadersStore[name6] = shader5;

// node_modules/@babylonjs/gui/3D/materials/fluentButton/shaders/fluentButton.vertex.js
var name7 = "fluentButtonVertexShader";
var shader6 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;attribute vec3 tangent;attribute vec4 color;uniform float _Edge_Width_;uniform vec4 _Edge_Color_;uniform float _Proximity_Max_Intensity_;uniform float _Proximity_Far_Distance_;uniform float _Proximity_Near_Radius_;uniform float _Proximity_Anisotropy_;uniform float _Selection_Fuzz_;uniform float _Selected_;uniform float _Selection_Fade_;uniform float _Selection_Fade_Size_;uniform float _Selected_Distance_;uniform float _Selected_Fade_Length_;uniform bool _Blob_Enable_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Inner_Fade_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform bool _Blob_Enable_2_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Inner_Fade_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform vec3 _Active_Face_Dir_;uniform vec3 _Active_Face_Up_;uniform bool _Enable_Fade_;uniform float _Fade_Width_;uniform bool _Smooth_Active_Face_;uniform bool _Show_Frame_;uniform bool Use_Global_Left_Index;uniform bool Use_Global_Right_Index;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;uniform vec4 Global_Left_Thumb_Tip_Position;uniform vec4 Global_Right_Thumb_Tip_Position;uniform float Global_Left_Index_Tip_Proximity;uniform float Global_Right_Index_Tip_Proximity;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;void Blob_Vertex_B47(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
vec4 Vx_Color,
vec2 UV,
vec3 Face_Center,
vec2 Face_Size,
vec2 In_UV,
float Blob_Fade_Length,
float Selection_Fade,
float Selection_Fade_Size,
float Inner_Fade,
vec3 Active_Face_Center,
float Blob_Pulse,
float Blob_Fade,
float Blob_Enabled,
out vec3 Out_Position,
out vec2 Out_UV,
out vec3 Blob_Info)
{float blobSize,fadeIn;vec3 Hit_Position;Blob_Info=vec3(0.0,0.0,0.0);float Hit_Distance=dot(Blob_Position-Face_Center,Normal);Hit_Position=Blob_Position-Hit_Distance*Normal;float absD=abs(Hit_Distance);float lerpVal=clamp((absD-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);fadeIn=1.0-clamp((absD-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float innerFade=1.0-clamp(-Hit_Distance/Inner_Fade,0.0,1.0);float farClip=clamp(1.0-step(Blob_Far_Distance+Blob_Fade_Length,absD),0.0,1.0);float size=mix(Blob_Near_Size,Blob_Far_Size,lerpVal)*farClip;blobSize=mix(size,Selection_Fade_Size,Selection_Fade)*innerFade*Blob_Enabled;Blob_Info.x=lerpVal*0.5+0.5;Blob_Info.y=fadeIn*Intensity*(1.0-Selection_Fade)*Blob_Fade;Blob_Info.x*=(1.0-Blob_Pulse);vec3 delta=Hit_Position-Face_Center;vec2 blobCenterXY=vec2(dot(delta,Tangent),dot(delta,Bitangent));vec2 quadUVin=2.0*UV-1.0; 
vec2 blobXY=blobCenterXY+quadUVin*blobSize;vec2 blobClipped=clamp(blobXY,-Face_Size*0.5,Face_Size*0.5);vec2 blobUV=(blobClipped-blobCenterXY)/max(blobSize,0.0001)*2.0;vec3 blobCorner=Face_Center+blobClipped.x*Tangent+blobClipped.y*Bitangent;Out_Position=mix(Position,blobCorner,Vx_Color.rrr);Out_UV=mix(In_UV,blobUV,Vx_Color.rr);}
vec2 ProjectProximity(
vec3 blobPosition,
vec3 position,
vec3 center,
vec3 dir,
vec3 xdir,
vec3 ydir,
out float vdistance
)
{vec3 delta=blobPosition-position;vec2 xy=vec2(dot(delta,xdir),dot(delta,ydir));vdistance=abs(dot(delta,dir));return xy;}
void Proximity_Vertex_B66(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Active_Face_Center,
vec3 Active_Face_Dir,
vec3 Position,
float Proximity_Far_Distance,
float Relative_Scale,
float Proximity_Anisotropy,
vec3 Up,
out vec4 Extra1,
out float Distance_To_Face,
out float Intensity)
{vec3 Active_Face_Dir_X=normalize(cross(Active_Face_Dir,Up));vec3 Active_Face_Dir_Y=cross(Active_Face_Dir,Active_Face_Dir_X);float distz1,distz2;Extra1.xy=ProjectProximity(Blob_Position,Position,Active_Face_Center,Active_Face_Dir,Active_Face_Dir_X*Proximity_Anisotropy,Active_Face_Dir_Y,distz1)/Relative_Scale;Extra1.zw=ProjectProximity(Blob_Position_2,Position,Active_Face_Center,Active_Face_Dir,Active_Face_Dir_X*Proximity_Anisotropy,Active_Face_Dir_Y,distz2)/Relative_Scale;Distance_To_Face=dot(Active_Face_Dir,Position-Active_Face_Center);Intensity=1.0-clamp(min(distz1,distz2)/Proximity_Far_Distance,0.0,1.0);}
void Holo_Edge_Vertex_B44(
vec3 Incident,
vec3 Normal,
vec2 UV,
vec3 Tangent,
vec3 Bitangent,
bool Smooth_Active_Face,
float Active,
out vec4 Holo_Edges)
{float NdotI=dot(Incident,Normal);vec2 flip=(UV-vec2(0.5,0.5));float udot=dot(Incident,Tangent)*flip.x*NdotI;float uval=1.0-float(udot>0.0);float vdot=-dot(Incident,Bitangent)*flip.y*NdotI;float vval=1.0-float(vdot>0.0);float Smooth_And_Active=step(1.0,float(Smooth_Active_Face && Active>0.0));uval=mix(uval,max(1.0,uval),Smooth_And_Active); 
vval=mix(vval,max(1.0,vval),Smooth_And_Active);Holo_Edges=vec4(1.0,1.0,1.0,1.0)-vec4(uval*UV.x,uval*(1.0-UV.x),vval*UV.y,vval*(1.0-UV.y));}
void Object_To_World_Pos_B13(
vec3 Pos_Object,
out vec3 Pos_World)
{Pos_World=(world*vec4(Pos_Object,1.0)).xyz;}
void Choose_Blob_B38(
vec4 Vx_Color,
vec3 Position1,
vec3 Position2,
bool Blob_Enable_1,
bool Blob_Enable_2,
float Near_Size_1,
float Near_Size_2,
float Blob_Inner_Fade_1,
float Blob_Inner_Fade_2,
float Blob_Pulse_1,
float Blob_Pulse_2,
float Blob_Fade_1,
float Blob_Fade_2,
out vec3 Position,
out float Near_Size,
out float Inner_Fade,
out float Blob_Enable,
out float Fade,
out float Pulse)
{Position=Position1*(1.0-Vx_Color.g)+Vx_Color.g*Position2;float b1=float(Blob_Enable_1);float b2=float(Blob_Enable_2);Blob_Enable=b1+(b2-b1)*Vx_Color.g;Pulse=Blob_Pulse_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Pulse_2;Fade=Blob_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Fade_2;Near_Size=Near_Size_1*(1.0-Vx_Color.g)+Vx_Color.g*Near_Size_2;Inner_Fade=Blob_Inner_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Inner_Fade_2;}
void Wireframe_Vertex_B51(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Edge_Width,
vec2 Face_Size,
out vec3 Wire_Vx_Pos,
out vec2 UV,
out vec2 Widths)
{Widths.xy=Edge_Width/Face_Size;float x=dot(Position,Tangent);float y=dot(Position,Bitangent);float dx=0.5-abs(x);float newx=(0.5-dx*Widths.x*2.0)*sign(x);float dy=0.5-abs(y);float newy=(0.5-dy*Widths.y*2.0)*sign(y);Wire_Vx_Pos=Normal*0.5+newx*Tangent+newy*Bitangent;UV.x=dot(Wire_Vx_Pos,Tangent)+0.5;UV.y=dot(Wire_Vx_Pos,Bitangent)+0.5;}
vec2 ramp2(vec2 start,vec2 end,vec2 x)
{return clamp((x-start)/(end-start),vec2(0.0,0.0),vec2(1.0,1.0));}
float computeSelection(
vec3 blobPosition,
vec3 normal,
vec3 tangent,
vec3 bitangent,
vec3 faceCenter,
vec2 faceSize,
float selectionFuzz,
float farDistance,
float fadeLength
)
{vec3 delta=blobPosition-faceCenter;float absD=abs(dot(delta,normal));float fadeIn=1.0-clamp((absD-farDistance)/fadeLength,0.0,1.0);vec2 blobCenterXY=vec2(dot(delta,tangent),dot(delta,bitangent));vec2 innerFace=faceSize*(1.0-selectionFuzz)*0.5;vec2 selectPulse=ramp2(-faceSize*0.5,-innerFace,blobCenterXY)-ramp2(innerFace,faceSize*0.5,blobCenterXY);return selectPulse.x*selectPulse.y*fadeIn;}
void Selection_Vertex_B48(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec2 Face_Size,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Selection_Fuzz,
float Selected,
float Far_Distance,
float Fade_Length,
vec3 Active_Face_Dir,
out float Show_Selection)
{float select1=computeSelection(Blob_Position,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);float select2=computeSelection(Blob_Position_2,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);float Active=max(0.0,dot(Active_Face_Dir,Normal));Show_Selection=mix(max(select1,select2),1.0,Selected)*Active;}
void Proximity_Visibility_B54(
float Selection,
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Input_Width,
float Proximity_Far_Distance,
float Proximity_Radius,
vec3 Active_Face_Center,
vec3 Active_Face_Dir,
out float Width)
{vec3 boxEdges=(world*vec4(vec3(0.5,0.5,0.5),0.0)).xyz;float boxMaxSize=length(boxEdges);float d1=dot(Proximity_Center-Active_Face_Center,Active_Face_Dir);vec3 blob1=Proximity_Center-d1*Active_Face_Dir;float d2=dot(Proximity_Center_2-Active_Face_Center,Active_Face_Dir);vec3 blob2=Proximity_Center_2-d2*Active_Face_Dir;vec3 delta1=blob1-Active_Face_Center;vec3 delta2=blob2-Active_Face_Center;float dist1=dot(delta1,delta1);float dist2=dot(delta2,delta2);float nearestProxDist=sqrt(min(dist1,dist2));Width=Input_Width*(1.0-step(boxMaxSize+Proximity_Radius,nearestProxDist))*(1.0-step(Proximity_Far_Distance,min(d1,d2))*(1.0-step(0.0001,Selection)));}
void Object_To_World_Dir_B67(
vec3 Dir_Object,
out vec3 Dir_World)
{Dir_World=(world*vec4(Dir_Object,0.0)).xyz;}
void main()
{vec3 Active_Face_Center_Q49;Active_Face_Center_Q49=(world*vec4(_Active_Face_Dir_*0.5,1.0)).xyz;vec3 Blob_Position_Q41= mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(Use_Global_Left_Index));vec3 Blob_Position_Q42= mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(Use_Global_Right_Index));vec3 Active_Face_Dir_Q64=normalize((world*vec4(_Active_Face_Dir_,0.0)).xyz);float Relative_Scale_Q57;
#if RELATIVE_WIDTH
Relative_Scale_Q57=length((world*vec4(vec3(0,1,0),0.0)).xyz);
#else
Relative_Scale_Q57=1.0;
#endif
vec3 Tangent_World_Q30;Tangent_World_Q30=(world*vec4(tangent,0.0)).xyz;vec3 Binormal_World_Q31;Binormal_World_Q31=(world*vec4((cross(normal,tangent)),0.0)).xyz;vec3 Normal_World_Q60;Normal_World_Q60=(world*vec4(normal,0.0)).xyz;vec3 Result_Q18=0.5*normal;vec3 Dir_World_Q67;Object_To_World_Dir_B67(_Active_Face_Up_,Dir_World_Q67);float Product_Q56=_Edge_Width_*Relative_Scale_Q57;vec3 Normal_World_N_Q29=normalize(Normal_World_Q60);vec3 Tangent_World_N_Q28=normalize(Tangent_World_Q30);vec3 Binormal_World_N_Q32=normalize(Binormal_World_Q31);vec3 Position_Q38;float Near_Size_Q38;float Inner_Fade_Q38;float Blob_Enable_Q38;float Fade_Q38;float Pulse_Q38;Choose_Blob_B38(color,Blob_Position_Q41,Blob_Position_Q42,_Blob_Enable_,_Blob_Enable_2_,_Blob_Near_Size_,_Blob_Near_Size_2_,_Blob_Inner_Fade_,_Blob_Inner_Fade_2_,_Blob_Pulse_,_Blob_Pulse_2_,_Blob_Fade_,_Blob_Fade_2_,Position_Q38,Near_Size_Q38,Inner_Fade_Q38,Blob_Enable_Q38,Fade_Q38,Pulse_Q38);vec3 Face_Center_Q33;Face_Center_Q33=(world*vec4(Result_Q18,1.0)).xyz;vec2 Face_Size_Q50=vec2(length(Tangent_World_Q30),length(Binormal_World_Q31));float Show_Selection_Q48;Selection_Vertex_B48(Blob_Position_Q41,Blob_Position_Q42,Face_Center_Q33,Face_Size_Q50,Normal_World_N_Q29,Tangent_World_N_Q28,Binormal_World_N_Q32,_Selection_Fuzz_,_Selected_,_Selected_Distance_,_Selected_Fade_Length_,Active_Face_Dir_Q64,Show_Selection_Q48);vec3 Normalized_Q72=normalize(Dir_World_Q67);float Active_Q34=max(0.0,dot(Active_Face_Dir_Q64,Normal_World_N_Q29));float Width_Q54;Proximity_Visibility_B54(Show_Selection_Q48,Blob_Position_Q41,Blob_Position_Q42,Product_Q56,_Proximity_Far_Distance_,_Proximity_Near_Radius_,Active_Face_Center_Q49,Active_Face_Dir_Q64,Width_Q54);vec3 Wire_Vx_Pos_Q51;vec2 UV_Q51;vec2 Widths_Q51;Wireframe_Vertex_B51(position,normal,tangent,(cross(normal,tangent)),Width_Q54,Face_Size_Q50,Wire_Vx_Pos_Q51,UV_Q51,Widths_Q51);vec3 Vec3_Q27=vec3(Widths_Q51.x,Widths_Q51.y,color.r);vec3 Pos_World_Q13;Object_To_World_Pos_B13(Wire_Vx_Pos_Q51,Pos_World_Q13);vec3 Incident_Q36=normalize(Pos_World_Q13-cameraPosition);vec3 Out_Position_Q47;vec2 Out_UV_Q47;vec3 Blob_Info_Q47;Blob_Vertex_B47(Pos_World_Q13,Normal_World_N_Q29,Tangent_World_N_Q28,Binormal_World_N_Q32,Position_Q38,_Blob_Intensity_,Near_Size_Q38,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,color,uv,Face_Center_Q33,Face_Size_Q50,UV_Q51,_Blob_Fade_Length_,_Selection_Fade_,_Selection_Fade_Size_,Inner_Fade_Q38,Active_Face_Center_Q49,Pulse_Q38,Fade_Q38,Blob_Enable_Q38,Out_Position_Q47,Out_UV_Q47,Blob_Info_Q47);vec4 Extra1_Q66;float Distance_To_Face_Q66;float Intensity_Q66;Proximity_Vertex_B66(Blob_Position_Q41,Blob_Position_Q42,Active_Face_Center_Q49,Active_Face_Dir_Q64,Pos_World_Q13,_Proximity_Far_Distance_,Relative_Scale_Q57,_Proximity_Anisotropy_,Normalized_Q72,Extra1_Q66,Distance_To_Face_Q66,Intensity_Q66);vec4 Holo_Edges_Q44;Holo_Edge_Vertex_B44(Incident_Q36,Normal_World_N_Q29,uv,Tangent_World_Q30,Binormal_World_Q31,_Smooth_Active_Face_,Active_Q34,Holo_Edges_Q44);vec3 Vec3_Q19=vec3(Show_Selection_Q48,Distance_To_Face_Q66,Intensity_Q66);vec3 Position=Out_Position_Q47;vec2 UV=Out_UV_Q47;vec3 Tangent=Blob_Info_Q47;vec3 Binormal=Vec3_Q19;vec3 Normal=Vec3_Q27;vec4 Extra1=Extra1_Q66;vec4 Color=Holo_Edges_Q44;gl_Position=viewProjection*vec4(Position,1);vPosition=Position;vNormal=Normal;vUV=UV;vTangent=Tangent;vBinormal=Binormal;vColor=Color;vExtra1=Extra1;}`;
ShaderStore.ShadersStore[name7] = shader6;

// node_modules/@babylonjs/gui/3D/materials/fluentButton/fluentButtonMaterial.js
var FluentButtonMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this.RELATIVE_WIDTH = true;
    this.ENABLE_FADE = true;
    this._needNormals = true;
    this._needUVs = true;
    this.rebuild();
  }
};
var FluentButtonMaterial = class _FluentButtonMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.edgeWidth = 0.04;
    this.edgeColor = new Color4(0.592157, 0.592157, 0.592157, 1);
    this.proximityMaxIntensity = 0.45;
    this.proximityFarDistance = 0.16;
    this.proximityNearRadius = 1.5;
    this.proximityAnisotropy = 1;
    this.selectionFuzz = 0.5;
    this.selected = 0;
    this.selectionFade = 0;
    this.selectionFadeSize = 0.3;
    this.selectedDistance = 0.08;
    this.selectedFadeLength = 0.08;
    this.blobIntensity = 0.5;
    this.blobFarSize = 0.05;
    this.blobNearDistance = 0;
    this.blobFarDistance = 0.08;
    this.blobFadeLength = 0.08;
    this.leftBlobEnable = true;
    this.leftBlobNearSize = 0.025;
    this.leftBlobPulse = 0;
    this.leftBlobFade = 1;
    this.leftBlobInnerFade = 0.01;
    this.rightBlobEnable = true;
    this.rightBlobNearSize = 0.025;
    this.rightBlobPulse = 0;
    this.rightBlobFade = 1;
    this.rightBlobInnerFade = 0.01;
    this.activeFaceDir = new Vector3(0, 0, -1);
    this.activeFaceUp = new Vector3(0, 1, 0);
    this.enableFade = true;
    this.fadeWidth = 1.5;
    this.smoothActiveFace = true;
    this.showFrame = false;
    this.useBlobTexture = true;
    this.globalLeftIndexTipPosition = Vector3.Zero();
    this.globalRightIndexTipPosition = Vector3.Zero();
    this.alphaMode = Constants.ALPHA_ADD;
    this.disableDepthWrite = true;
    this.backFaceCulling = false;
    this._blobTexture = new Texture(_FluentButtonMaterial.BLOB_TEXTURE_URL, this.getScene(), true, false, Texture.NEAREST_SAMPLINGMODE);
  }
  needAlphaBlending() {
    return true;
  }
  needAlphaTesting() {
    return true;
  }
  getAlphaTestTexture() {
    return null;
  }
  // Methods
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new FluentButtonMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, true, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "fluentButton";
      const join = defines.toString();
      const uniforms = [
        "world",
        "viewProjection",
        "cameraPosition",
        "_Edge_Width_",
        "_Edge_Color_",
        "_Relative_Width_",
        "_Proximity_Max_Intensity_",
        "_Proximity_Far_Distance_",
        "_Proximity_Near_Radius_",
        "_Proximity_Anisotropy_",
        "_Selection_Fuzz_",
        "_Selected_",
        "_Selection_Fade_",
        "_Selection_Fade_Size_",
        "_Selected_Distance_",
        "_Selected_Fade_Length_",
        "_Blob_Enable_",
        "_Blob_Position_",
        "_Blob_Intensity_",
        "_Blob_Near_Size_",
        "_Blob_Far_Size_",
        "_Blob_Near_Distance_",
        "_Blob_Far_Distance_",
        "_Blob_Fade_Length_",
        "_Blob_Inner_Fade_",
        "_Blob_Pulse_",
        "_Blob_Fade_",
        "_Blob_Texture_",
        "_Blob_Enable_2_",
        "_Blob_Position_2_",
        "_Blob_Near_Size_2_",
        "_Blob_Inner_Fade_2_",
        "_Blob_Pulse_2_",
        "_Blob_Fade_2_",
        "_Active_Face_Dir_",
        "_Active_Face_Up_",
        "_Enable_Fade_",
        "_Fade_Width_",
        "_Smooth_Active_Face_",
        "_Show_Frame_",
        "_Use_Blob_Texture_",
        "Use_Global_Left_Index",
        "Use_Global_Right_Index",
        "Global_Left_Index_Tip_Position",
        "Global_Right_Index_Tip_Position",
        "Global_Left_Thumb_Tip_Position",
        "Global_Right_Thumb_Tip_Position",
        "Global_Left_Index_Tip_Proximity",
        "Global_Right_Index_Tip_Proximity"
      ];
      const samplers = ["_Blob_Texture_"];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines, this._materialContext);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
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
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", scene.activeCamera.position);
    this._activeEffect.setTexture("_Blob_Texture_", this._blobTexture);
    this._activeEffect.setFloat("_Edge_Width_", this.edgeWidth);
    this._activeEffect.setColor4("_Edge_Color_", new Color3(this.edgeColor.r, this.edgeColor.g, this.edgeColor.b), this.edgeColor.a);
    this._activeEffect.setFloat("_Proximity_Max_Intensity_", this.proximityMaxIntensity);
    this._activeEffect.setFloat("_Proximity_Far_Distance_", this.proximityFarDistance);
    this._activeEffect.setFloat("_Proximity_Near_Radius_", this.proximityNearRadius);
    this._activeEffect.setFloat("_Proximity_Anisotropy_", this.proximityAnisotropy);
    this._activeEffect.setFloat("_Selection_Fuzz_", this.selectionFuzz);
    this._activeEffect.setFloat("_Selected_", this.selected);
    this._activeEffect.setFloat("_Selection_Fade_", this.selectionFade);
    this._activeEffect.setFloat("_Selection_Fade_Size_", this.selectionFadeSize);
    this._activeEffect.setFloat("_Selected_Distance_", this.selectedDistance);
    this._activeEffect.setFloat("_Selected_Fade_Length_", this.selectedFadeLength);
    this._activeEffect.setFloat("_Blob_Enable_", this.leftBlobEnable ? 1 : 0);
    this._activeEffect.setFloat("_Blob_Intensity_", this.blobIntensity);
    this._activeEffect.setFloat("_Blob_Near_Size_", this.leftBlobNearSize);
    this._activeEffect.setFloat("_Blob_Far_Size_", this.blobFarSize);
    this._activeEffect.setFloat("_Blob_Near_Distance_", this.blobNearDistance);
    this._activeEffect.setFloat("_Blob_Far_Distance_", this.blobFarDistance);
    this._activeEffect.setFloat("_Blob_Fade_Length_", this.blobFadeLength);
    this._activeEffect.setFloat("_Blob_Inner_Fade_", this.leftBlobInnerFade);
    this._activeEffect.setFloat("_Blob_Pulse_", this.leftBlobPulse);
    this._activeEffect.setFloat("_Blob_Fade_", this.leftBlobFade);
    this._activeEffect.setFloat("_Blob_Enable_2_", this.rightBlobEnable ? 1 : 0);
    this._activeEffect.setFloat("_Blob_Near_Size_2_", this.rightBlobNearSize);
    this._activeEffect.setFloat("_Blob_Inner_Fade_2_", this.rightBlobInnerFade);
    this._activeEffect.setFloat("_Blob_Pulse_2_", this.rightBlobPulse);
    this._activeEffect.setFloat("_Blob_Fade_2_", this.rightBlobFade);
    this._activeEffect.setVector3("_Active_Face_Dir_", this.activeFaceDir);
    this._activeEffect.setVector3("_Active_Face_Up_", this.activeFaceUp);
    this._activeEffect.setFloat("_Fade_Width_", this.fadeWidth);
    this._activeEffect.setFloat("_Smooth_Active_Face_", this.smoothActiveFace ? 1 : 0);
    this._activeEffect.setFloat("_Show_Frame_", this.showFrame ? 1 : 0);
    this._activeEffect.setFloat("_Use_Blob_Texture_", this.useBlobTexture ? 1 : 0);
    this._activeEffect.setFloat("Use_Global_Left_Index", 1);
    this._activeEffect.setFloat("Use_Global_Right_Index", 1);
    this._activeEffect.setVector4("Global_Left_Index_Tip_Position", new Vector4(this.globalLeftIndexTipPosition.x, this.globalLeftIndexTipPosition.y, this.globalLeftIndexTipPosition.z, 1));
    this._activeEffect.setVector4("Global_Right_Index_Tip_Position", new Vector4(this.globalRightIndexTipPosition.x, this.globalRightIndexTipPosition.y, this.globalRightIndexTipPosition.z, 1));
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _FluentButtonMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = super.serialize();
    serializationObject.customType = "BABYLON.FluentButtonMaterial";
    return serializationObject;
  }
  getClassName() {
    return "FluentButtonMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _FluentButtonMaterial(source.name, scene), source, scene, rootUrl);
  }
};
FluentButtonMaterial.BLOB_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-button-blob.png";
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "edgeWidth", void 0);
__decorate([
  serializeAsColor4()
], FluentButtonMaterial.prototype, "edgeColor", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "proximityMaxIntensity", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "proximityFarDistance", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "proximityNearRadius", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "proximityAnisotropy", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "selectionFuzz", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "selected", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "selectionFade", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "selectionFadeSize", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "selectedDistance", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "selectedFadeLength", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "blobIntensity", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "blobFarSize", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "blobNearDistance", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "blobFarDistance", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "blobFadeLength", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "leftBlobEnable", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "leftBlobNearSize", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "leftBlobPulse", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "leftBlobFade", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "leftBlobInnerFade", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "rightBlobEnable", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "rightBlobNearSize", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "rightBlobPulse", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "rightBlobFade", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "rightBlobInnerFade", void 0);
__decorate([
  serializeAsVector3()
], FluentButtonMaterial.prototype, "activeFaceDir", void 0);
__decorate([
  serializeAsVector3()
], FluentButtonMaterial.prototype, "activeFaceUp", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "enableFade", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "fadeWidth", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "smoothActiveFace", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "showFrame", void 0);
__decorate([
  serialize()
], FluentButtonMaterial.prototype, "useBlobTexture", void 0);
__decorate([
  serializeAsVector3()
], FluentButtonMaterial.prototype, "globalLeftIndexTipPosition", void 0);
__decorate([
  serializeAsVector3()
], FluentButtonMaterial.prototype, "globalRightIndexTipPosition", void 0);
RegisterClass("BABYLON.GUI.FluentButtonMaterial", FluentButtonMaterial);

// node_modules/@babylonjs/gui/3D/controls/touchButton3D.js
var TouchButton3D = class extends Button3D {
  /**
   * Creates a new touchable button
   * @param name defines the control name
   * @param collisionMesh mesh to track collisions with
   */
  constructor(name22, collisionMesh) {
    super(name22);
    this._isNearPressed = false;
    this._interactionSurfaceHeight = 0;
    this._isToggleButton = false;
    this._toggleState = false;
    this._toggleButtonCallback = () => {
      this._onToggle(!this._toggleState);
    };
    this.onToggleObservable = new Observable();
    this.collidableFrontDirection = Vector3.Zero();
    if (collisionMesh) {
      this.collisionMesh = collisionMesh;
    }
  }
  /**
   * Whether the current interaction is caused by near interaction or not
   */
  get isActiveNearInteraction() {
    return this._isNearPressed;
  }
  /**
   * Sets the front-facing direction of the button. Pass in Vector3.Zero to allow interactions from any direction
   * @param frontWorldDir the forward direction of the button
   */
  set collidableFrontDirection(frontWorldDir) {
    this._collidableFrontDirection = frontWorldDir.normalize();
    if (this._collisionMesh) {
      const invert = TmpVectors.Matrix[0];
      invert.copyFrom(this._collisionMesh.getWorldMatrix());
      invert.invert();
      Vector3.TransformNormalToRef(this._collidableFrontDirection, invert, this._collidableFrontDirection);
      this._collidableFrontDirection.normalize();
    }
  }
  /**
   * Returns the front-facing direction of the button, or Vector3.Zero if there is no 'front'
   */
  get collidableFrontDirection() {
    if (this._collisionMesh) {
      const transformedDirection = TmpVectors.Vector3[0];
      Vector3.TransformNormalToRef(this._collidableFrontDirection, this._collisionMesh.getWorldMatrix(), transformedDirection);
      return transformedDirection.normalize();
    }
    return this._collidableFrontDirection;
  }
  /**
   * Sets the mesh used for testing input collision
   * @param collisionMesh the new collision mesh for the button
   */
  set collisionMesh(collisionMesh) {
    var _a;
    if (this._collisionMesh) {
      this._collisionMesh.isNearPickable = false;
      if ((_a = this._collisionMesh.reservedDataStore) == null ? void 0 : _a.GUI3D) {
        this._collisionMesh.reservedDataStore.GUI3D = {};
      }
      this._collisionMesh.getChildMeshes().forEach((mesh) => {
        var _a2;
        mesh.isNearPickable = false;
        if ((_a2 = mesh.reservedDataStore) == null ? void 0 : _a2.GUI3D) {
          mesh.reservedDataStore.GUI3D = {};
        }
      });
    }
    this._collisionMesh = collisionMesh;
    this._injectGUI3DReservedDataStore(this._collisionMesh).control = this;
    this._collisionMesh.isNearPickable = true;
    this._collisionMesh.getChildMeshes().forEach((mesh) => {
      this._injectGUI3DReservedDataStore(mesh).control = this;
      mesh.isNearPickable = true;
    });
    this.collidableFrontDirection = collisionMesh.forward;
  }
  /**
   * Setter for if this TouchButton3D should be treated as a toggle button
   * @param value If this TouchHolographicButton should act like a toggle button
   */
  set isToggleButton(value) {
    if (value === this._isToggleButton) {
      return;
    }
    this._isToggleButton = value;
    if (value) {
      this.onPointerUpObservable.add(this._toggleButtonCallback);
    } else {
      this.onPointerUpObservable.removeCallback(this._toggleButtonCallback);
      if (this._toggleState) {
        this._onToggle(false);
      }
    }
  }
  get isToggleButton() {
    return this._isToggleButton;
  }
  /**
   * A public entrypoint to set the toggle state of the TouchHolographicButton. Only works if 'isToggleButton' is true
   * @param newState The new state to set the TouchHolographicButton's toggle state to
   */
  set isToggled(newState) {
    if (this._isToggleButton && this._toggleState !== newState) {
      this._onToggle(newState);
    }
  }
  get isToggled() {
    return this._toggleState;
  }
  _onToggle(newState) {
    this._toggleState = newState;
    this.onToggleObservable.notifyObservers(newState);
  }
  // Returns true if the collidable is in front of the button, or if the button has no front direction
  _isInteractionInFrontOfButton(collidablePos) {
    return this._getInteractionHeight(collidablePos, this._collisionMesh.getAbsolutePosition()) > 0;
  }
  /**
   * Get the height of the touchPoint from the collidable part of the button
   * @param touchPoint the point to compare to the button, in absolute position
   * @returns the depth of the touch point into the front of the button
   */
  getPressDepth(touchPoint) {
    if (!this._isNearPressed) {
      return 0;
    }
    const interactionHeight = this._getInteractionHeight(touchPoint, this._collisionMesh.getAbsolutePosition());
    return this._interactionSurfaceHeight - interactionHeight;
  }
  // Returns true if the collidable is in front of the button, or if the button has no front direction
  _getInteractionHeight(interactionPos, basePos) {
    const frontDir = this.collidableFrontDirection;
    if (frontDir.length() === 0) {
      return Vector3.Distance(interactionPos, basePos);
    }
    const d = Vector3.Dot(basePos, frontDir);
    const abc = Vector3.Dot(interactionPos, frontDir);
    return abc - d;
  }
  /**
   * @internal
   */
  _generatePointerEventType(providedType, nearMeshPosition, activeInteractionCount) {
    if (providedType === PointerEventTypes.POINTERDOWN || providedType === PointerEventTypes.POINTERMOVE) {
      if (!this._isInteractionInFrontOfButton(nearMeshPosition)) {
        return PointerEventTypes.POINTERMOVE;
      } else {
        this._isNearPressed = true;
        this._interactionSurfaceHeight = this._getInteractionHeight(nearMeshPosition, this._collisionMesh.getAbsolutePosition());
      }
    }
    if (providedType === PointerEventTypes.POINTERUP) {
      if (activeInteractionCount == 0) {
        return PointerEventTypes.POINTERMOVE;
      } else {
        this._isNearPressed = false;
      }
    }
    return providedType;
  }
  _getTypeName() {
    return "TouchButton3D";
  }
  // Mesh association
  _createNode(scene) {
    return super._createNode(scene);
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    super.dispose();
    this.onPointerUpObservable.removeCallback(this._toggleButtonCallback);
    this.onToggleObservable.clear();
    if (this._collisionMesh) {
      this._collisionMesh.dispose();
    }
  }
};

// node_modules/@babylonjs/gui/3D/controls/touchHolographicButton.js
var TouchHolographicButton = class _TouchHolographicButton extends TouchButton3D {
  _disposeTooltip() {
    this._tooltipFade = null;
    if (this._tooltipTextBlock) {
      this._tooltipTextBlock.dispose();
    }
    if (this._tooltipTexture) {
      this._tooltipTexture.dispose();
    }
    if (this._tooltipMesh) {
      this._tooltipMesh.dispose();
    }
    this.onPointerEnterObservable.remove(this._tooltipHoverObserver);
    this.onPointerOutObservable.remove(this._tooltipOutObserver);
  }
  /**
   * Rendering ground id of all the mesh in the button
   */
  set renderingGroupId(id) {
    this._backPlate.renderingGroupId = id;
    this._textPlate.renderingGroupId = id;
    this._frontPlate.renderingGroupId = id;
    if (this._tooltipMesh) {
      this._tooltipMesh.renderingGroupId = id;
    }
  }
  get renderingGroupId() {
    return this._backPlate.renderingGroupId;
  }
  /**
   * Gets the mesh used to render this control
   */
  get mesh() {
    return this._backPlate;
  }
  /**
   * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
   */
  set tooltipText(text) {
    if (!text) {
      this._disposeTooltip();
      return;
    }
    if (!this._tooltipFade) {
      const rightHandedScene = this._backPlate._scene.useRightHandedSystem;
      this._tooltipMesh = CreatePlane("", { size: 1 }, this._backPlate._scene);
      const tooltipBackground = CreatePlane("", { size: 1, sideOrientation: Mesh.DOUBLESIDE }, this._backPlate._scene);
      const mat = new StandardMaterial("", this._backPlate._scene);
      mat.diffuseColor = Color3.FromHexString("#212121");
      tooltipBackground.material = mat;
      tooltipBackground.isPickable = false;
      this._tooltipMesh.addChild(tooltipBackground);
      tooltipBackground.position = Vector3.Forward(rightHandedScene).scale(0.05);
      this._tooltipMesh.scaling.y = 1 / 3;
      this._tooltipMesh.position = Vector3.Up().scale(0.7).add(Vector3.Forward(rightHandedScene).scale(-0.15));
      this._tooltipMesh.isPickable = false;
      this._tooltipMesh.parent = this._backPlate;
      this._tooltipTexture = AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh);
      this._tooltipTextBlock = new TextBlock();
      this._tooltipTextBlock.scaleY = 3;
      this._tooltipTextBlock.color = "white";
      this._tooltipTextBlock.fontSize = 130;
      this._tooltipTexture.addControl(this._tooltipTextBlock);
      this._tooltipFade = new FadeInOutBehavior();
      this._tooltipFade.delay = 500;
      this._tooltipMesh.addBehavior(this._tooltipFade);
      this._tooltipHoverObserver = this.onPointerEnterObservable.add(() => {
        if (this._tooltipFade) {
          this._tooltipFade.fadeIn(true);
        }
      });
      this._tooltipOutObserver = this.onPointerOutObservable.add(() => {
        if (this._tooltipFade) {
          this._tooltipFade.fadeIn(false);
        }
      });
    }
    if (this._tooltipTextBlock) {
      this._tooltipTextBlock.text = text;
    }
  }
  get tooltipText() {
    if (this._tooltipTextBlock) {
      return this._tooltipTextBlock.text;
    }
    return null;
  }
  /**
   * Gets or sets text for the button
   */
  get text() {
    return this._text;
  }
  set text(value) {
    if (this._text === value) {
      return;
    }
    this._text = value;
    this._rebuildContent();
  }
  /**
   * Gets or sets the image url for the button
   */
  get imageUrl() {
    return this._imageUrl;
  }
  set imageUrl(value) {
    if (this._imageUrl === value) {
      return;
    }
    this._imageUrl = value;
    this._rebuildContent();
  }
  /**
   * Gets the back material used by this button
   */
  get backMaterial() {
    return this._backMaterial;
  }
  /**
   * Gets the front material used by this button
   */
  get frontMaterial() {
    return this._frontMaterial;
  }
  /**
   * Gets the plate material used by this button
   */
  get plateMaterial() {
    return this._plateMaterial;
  }
  /**
   * Gets a boolean indicating if this button shares its material with other HolographicButtons
   */
  get shareMaterials() {
    return this._shareMaterials;
  }
  /**
   * Sets whether the backplate is visible or hidden. Hiding the backplate is not recommended without some sort of replacement
   */
  set isBackplateVisible(isVisible) {
    if (this.mesh && !!this._backMaterial) {
      if (isVisible && !this._isBackplateVisible) {
        this._backPlate.visibility = 1;
      } else if (!isVisible && this._isBackplateVisible) {
        this._backPlate.visibility = 0;
      }
    }
    this._isBackplateVisible = isVisible;
  }
  /**
   * Creates a new button
   * @param name defines the control name
   * @param shareMaterials
   */
  constructor(name22, shareMaterials = true) {
    super(name22);
    this._shareMaterials = true;
    this._isBackplateVisible = true;
    this._frontPlateDepth = 0.5;
    this._backPlateDepth = 0.04;
    this._backplateColor = new Color3(0.08, 0.15, 0.55);
    this._backplateToggledColor = new Color3(0.25, 0.4, 0.95);
    this._shareMaterials = shareMaterials;
    this.pointerEnterAnimation = () => {
      this._frontMaterial.leftBlobEnable = true;
      this._frontMaterial.rightBlobEnable = true;
    };
    this.pointerOutAnimation = () => {
      this._frontMaterial.leftBlobEnable = false;
      this._frontMaterial.rightBlobEnable = false;
    };
    this.pointerDownAnimation = () => {
      if (this._frontPlate && !this.isActiveNearInteraction) {
        this._frontPlate.scaling.z = this._frontPlateDepth * 0.2;
        this._frontPlate.position = Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth - 0.2 * this._frontPlateDepth) / 2);
        this._textPlate.position = Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth + 0.2 * this._frontPlateDepth) / 2);
      }
    };
    this.pointerUpAnimation = () => {
      if (this._frontPlate) {
        this._frontPlate.scaling.z = this._frontPlateDepth;
        this._frontPlate.position = Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth - this._frontPlateDepth) / 2);
        this._textPlate.position = Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth + this._frontPlateDepth) / 2);
      }
    };
    this.onPointerMoveObservable.add((position) => {
      if (this._frontPlate && this.isActiveNearInteraction) {
        const scale = Vector3.Zero();
        if (this._backPlate.getWorldMatrix().decompose(scale, void 0, void 0)) {
          let interactionHeight = this._getInteractionHeight(position, this._backPlate.getAbsolutePosition()) / scale.z;
          interactionHeight = Scalar.Clamp(interactionHeight - this._backPlateDepth / 2, 0.2 * this._frontPlateDepth, this._frontPlateDepth);
          this._frontPlate.scaling.z = interactionHeight;
          this._frontPlate.position = Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth - interactionHeight) / 2);
          this._textPlate.position = Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth + interactionHeight) / 2);
        }
      }
    });
    this._pointerHoverObserver = this.onPointerMoveObservable.add((hoverPosition) => {
      this._frontMaterial.globalLeftIndexTipPosition = hoverPosition;
    });
  }
  _getTypeName() {
    return "TouchHolographicButton";
  }
  _rebuildContent() {
    this._disposeFacadeTexture();
    const panel = new StackPanel();
    panel.isVertical = true;
    if (IsDocumentAvailable() && !!document.createElement) {
      if (this._imageUrl) {
        const image = new Image();
        image.source = this._imageUrl;
        image.paddingTop = "40px";
        image.height = "180px";
        image.width = "100px";
        image.paddingBottom = "40px";
        panel.addControl(image);
      }
    }
    if (this._text) {
      const text = new TextBlock();
      text.text = this._text;
      text.color = "white";
      text.height = "30px";
      text.fontSize = 24;
      panel.addControl(text);
    }
    this.content = panel;
  }
  // Mesh association
  _createNode(scene) {
    this.name = this.name ?? "TouchHolographicButton";
    const collisionMesh = CreateBox(`${this.name}_collisionMesh`, {
      width: 1,
      height: 1,
      depth: this._frontPlateDepth
    }, scene);
    collisionMesh.isPickable = true;
    collisionMesh.isNearPickable = true;
    collisionMesh.visibility = 0;
    collisionMesh.position = Vector3.Forward(scene.useRightHandedSystem).scale(-this._frontPlateDepth / 2);
    SceneLoader.ImportMeshAsync(void 0, _TouchHolographicButton.MODEL_BASE_URL, _TouchHolographicButton.MODEL_FILENAME, scene).then((result) => {
      const alphaMesh = CreateBox("${this.name}_alphaMesh", {
        width: 1,
        height: 1,
        depth: 1
      }, scene);
      alphaMesh.isPickable = false;
      alphaMesh.material = new StandardMaterial("${this.name}_alphaMesh_material", scene);
      alphaMesh.material.alpha = 0.15;
      const importedFrontPlate = result.meshes[1];
      importedFrontPlate.name = `${this.name}_frontPlate`;
      importedFrontPlate.isPickable = false;
      importedFrontPlate.scaling.z = this._frontPlateDepth;
      alphaMesh.parent = importedFrontPlate;
      importedFrontPlate.parent = collisionMesh;
      if (this._frontMaterial) {
        importedFrontPlate.material = this._frontMaterial;
      }
      this._frontPlate = importedFrontPlate;
    });
    this._backPlate = CreateBox(`${this.name}_backPlate`, {
      width: 1,
      height: 1,
      depth: this._backPlateDepth
    }, scene);
    this._backPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(this._backPlateDepth / 2);
    this._backPlate.isPickable = false;
    this._textPlate = super._createNode(scene);
    this._textPlate.name = `${this.name}_textPlate`;
    this._textPlate.isPickable = false;
    this._textPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(-this._frontPlateDepth / 2);
    this._backPlate.addChild(collisionMesh);
    this._backPlate.addChild(this._textPlate);
    const tn = new TransformNode(`{this.name}_root`, scene);
    this._backPlate.setParent(tn);
    this.collisionMesh = collisionMesh;
    this.collidableFrontDirection = this._backPlate.forward.negate();
    return tn;
  }
  _applyFacade(facadeTexture) {
    this._plateMaterial.emissiveTexture = facadeTexture;
    this._plateMaterial.opacityTexture = facadeTexture;
    this._plateMaterial.diffuseColor = new Color3(0.4, 0.4, 0.4);
  }
  _createBackMaterial(mesh) {
    this._backMaterial = new FluentMaterial(this.name + "backPlateMaterial", mesh.getScene());
    this._backMaterial.albedoColor = this._backplateColor;
    this._backMaterial.renderBorders = true;
    this._backMaterial.renderHoverLight = false;
  }
  _createFrontMaterial(mesh) {
    this._frontMaterial = new FluentButtonMaterial(this.name + "Front Material", mesh.getScene());
  }
  _createPlateMaterial(mesh) {
    this._plateMaterial = new StandardMaterial(this.name + "Plate Material", mesh.getScene());
    this._plateMaterial.specularColor = Color3.Black();
  }
  _onToggle(newState) {
    if (this._backMaterial) {
      if (newState) {
        this._backMaterial.albedoColor = this._backplateToggledColor;
      } else {
        this._backMaterial.albedoColor = this._backplateColor;
      }
    }
    super._onToggle(newState);
  }
  _affectMaterial(mesh) {
    if (this._shareMaterials) {
      if (!this._host._touchSharedMaterials["backFluentMaterial"]) {
        this._createBackMaterial(mesh);
        this._host._touchSharedMaterials["backFluentMaterial"] = this._backMaterial;
      } else {
        this._backMaterial = this._host._touchSharedMaterials["backFluentMaterial"];
      }
      if (!this._host._touchSharedMaterials["frontFluentMaterial"]) {
        this._createFrontMaterial(mesh);
        this._host._touchSharedMaterials["frontFluentMaterial"] = this._frontMaterial;
      } else {
        this._frontMaterial = this._host._touchSharedMaterials["frontFluentMaterial"];
      }
    } else {
      this._createBackMaterial(mesh);
      this._createFrontMaterial(mesh);
    }
    this._createPlateMaterial(mesh);
    this._backPlate.material = this._backMaterial;
    this._textPlate.material = this._plateMaterial;
    if (!this._isBackplateVisible) {
      this._backPlate.visibility = 0;
    }
    if (this._frontPlate) {
      this._frontPlate.material = this._frontMaterial;
    }
    this._rebuildContent();
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    super.dispose();
    this._disposeTooltip();
    this.onPointerMoveObservable.remove(this._pointerHoverObserver);
    if (!this.shareMaterials) {
      this._backMaterial.dispose();
      this._frontMaterial.dispose();
      this._plateMaterial.dispose();
      if (this._pickedPointObserver) {
        this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
        this._pickedPointObserver = null;
      }
    }
  }
};
TouchHolographicButton.MODEL_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
TouchHolographicButton.MODEL_FILENAME = "mrtk-fluent-button.glb";

// node_modules/@babylonjs/gui/3D/behaviors/defaultBehavior.js
var DefaultBehavior = class {
  /**
   * Instantiates the default behavior
   */
  constructor() {
    this.followBehaviorEnabled = false;
    this.sixDofDragBehaviorEnabled = true;
    this.surfaceMagnetismBehaviorEnabled = true;
    this._followBehavior = new FollowBehavior();
    this._sixDofDragBehavior = new SixDofDragBehavior();
    this._surfaceMagnetismBehavior = new SurfaceMagnetismBehavior();
  }
  /**
   *  The name of the behavior
   */
  get name() {
    return "Default";
  }
  /**
   *  The follow behavior
   */
  get followBehavior() {
    return this._followBehavior;
  }
  /**
   *  The six DoF drag behavior
   */
  get sixDofDragBehavior() {
    return this._sixDofDragBehavior;
  }
  /**
   * The surface magnetism behavior
   */
  get surfaceMagnetismBehavior() {
    return this._surfaceMagnetismBehavior;
  }
  /**
   *  Initializes the behavior
   */
  init() {
  }
  /**
   * Attaches the default behavior
   * @param ownerMesh The top level mesh
   * @param draggablesMeshes Descendant meshes that can be used for dragging the owner mesh
   * @param sceneUnderstandingMeshes Meshes from the scene understanding that will be used for surface magnetism
   */
  attach(ownerMesh, draggablesMeshes, sceneUnderstandingMeshes) {
    this._scene = ownerMesh.getScene();
    this.attachedNode = ownerMesh;
    this._addObservables();
    this._followBehavior.attach(ownerMesh);
    this._sixDofDragBehavior.attach(ownerMesh);
    this._sixDofDragBehavior.draggableMeshes = draggablesMeshes || null;
    this._sixDofDragBehavior.faceCameraOnDragStart = true;
    this._surfaceMagnetismBehavior.attach(ownerMesh, this._scene);
    if (sceneUnderstandingMeshes) {
      this._surfaceMagnetismBehavior.meshes = sceneUnderstandingMeshes;
    }
    this._surfaceMagnetismBehavior.enabled = false;
  }
  /**
   *  Detaches the behavior from the mesh
   */
  detach() {
    this.attachedNode = null;
    this._removeObservables();
    this._followBehavior.detach();
    this._sixDofDragBehavior.detach();
    this._surfaceMagnetismBehavior.detach();
  }
  _addObservables() {
    this._onBeforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
      this._followBehavior._enabled = !this._sixDofDragBehavior.isMoving && this.followBehaviorEnabled;
    });
    this._onDragObserver = this._sixDofDragBehavior.onDragObservable.add((event) => {
      this._sixDofDragBehavior.disableMovement = this._surfaceMagnetismBehavior.findAndUpdateTarget(event.pickInfo);
    });
  }
  _removeObservables() {
    this._scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
    this._sixDofDragBehavior.onDragObservable.remove(this._onDragObserver);
  }
};

// node_modules/@babylonjs/gui/3D/materials/handle/shaders/handle.vertex.js
var name8 = "handleVertexShader";
var shader7 = `precision highp float;attribute vec3 position;uniform vec3 positionOffset;uniform mat4 worldViewProjection;uniform float scale;void main(void) {vec4 vPos=vec4((vec3(position)+positionOffset)*scale,1.0);gl_Position=worldViewProjection*vPos;}`;
ShaderStore.ShadersStore[name8] = shader7;

// node_modules/@babylonjs/gui/3D/materials/handle/shaders/handle.fragment.js
var name9 = "handlePixelShader";
var shader8 = `uniform vec3 color;void main(void) {gl_FragColor=vec4(color,1.0);}`;
ShaderStore.ShadersStore[name9] = shader8;

// node_modules/@babylonjs/gui/3D/materials/handle/handleMaterial.js
var HandleMaterial = class extends ShaderMaterial {
  /**
   * Is the material indicating hovering state
   */
  get hover() {
    return this._hover;
  }
  set hover(b) {
    this._hover = b;
    this._updateInterpolationTarget();
  }
  /**
   * Is the material indicating drag state
   */
  get drag() {
    return this._drag;
  }
  set drag(b) {
    this._drag = b;
    this._updateInterpolationTarget();
  }
  /**
   * Creates a handle material
   * @param name Name of the material
   * @param scene Scene
   */
  constructor(name22, scene) {
    super(name22, scene, "handle", {
      attributes: ["position"],
      uniforms: ["worldViewProjection", "color", "scale", "positionOffset"],
      needAlphaBlending: false,
      needAlphaTesting: false
    });
    this._hover = false;
    this._drag = false;
    this._color = new Color3();
    this._scale = 1;
    this._lastTick = -1;
    this.animationLength = 100;
    this.hoverColor = new Color3(0, 0.467, 0.84);
    this.baseColor = new Color3(1, 1, 1);
    this.hoverScale = 0.75;
    this.baseScale = 0.35;
    this.dragScale = 0.55;
    this._positionOffset = Vector3.Zero();
    this._updateInterpolationTarget();
    this._lastTick = Date.now();
    this._onBeforeRender = this.getScene().onBeforeRenderObservable.add(() => {
      const tick = Date.now();
      const delta = tick - this._lastTick;
      const scaleDiff = this._targetScale - this._scale;
      const colorDiff = TmpColors.Color3[0].copyFrom(this._targetColor).subtractToRef(this._color, TmpColors.Color3[0]);
      this._scale = this._scale + scaleDiff * delta / this.animationLength;
      colorDiff.scaleToRef(delta / this.animationLength, colorDiff);
      this._color.addToRef(colorDiff, this._color);
      this.setColor3("color", this._color);
      this.setFloat("scale", this._scale);
      this.setVector3("positionOffset", this._positionOffset);
      this._lastTick = tick;
    });
  }
  _updateInterpolationTarget() {
    if (this.drag) {
      this._targetColor = this.hoverColor;
      this._targetScale = this.dragScale;
    } else if (this.hover) {
      this._targetColor = this.hoverColor;
      this._targetScale = this.hoverScale;
    } else {
      this._targetColor = this.baseColor;
      this._targetScale = this.baseScale;
    }
  }
  /**
   * Disposes the handle material
   */
  dispose() {
    super.dispose();
    this.getScene().onBeforeRenderObservable.remove(this._onBeforeRender);
  }
};

// node_modules/@babylonjs/gui/3D/gizmos/gizmoHandle.js
var HandleState;
(function(HandleState2) {
  HandleState2[HandleState2["IDLE"] = 0] = "IDLE";
  HandleState2[HandleState2["HOVER"] = 1] = "HOVER";
  HandleState2[HandleState2["DRAG"] = 2] = "DRAG";
})(HandleState || (HandleState = {}));
var GizmoHandle = class {
  /**
   * The current state of the handle
   */
  get state() {
    return this._state;
  }
  /**
   * Returns the gizmo carrying this handle
   */
  get gizmo() {
    return this._gizmo;
  }
  /**
   * Sets hover state
   */
  set hover(value) {
    if (value) {
      this._state |= HandleState.HOVER;
    } else {
      this._state &= ~HandleState.HOVER;
    }
    this._updateMaterial();
  }
  /**
   * Sets drag state
   */
  set drag(value) {
    if (value) {
      this._state |= HandleState.DRAG;
    } else {
      this._state &= ~HandleState.DRAG;
    }
    this._updateMaterial();
  }
  /**
   * Creates a handle for a SlateGizmo
   * @param gizmo associated SlateGizmo
   * @param scene scene
   */
  constructor(gizmo, scene) {
    this._state = HandleState.IDLE;
    this._materials = [];
    this._scene = scene;
    this._gizmo = gizmo;
    this.node = this.createNode();
    this.node.reservedDataStore = {
      handle: this
    };
  }
  _createMaterial(positionOffset) {
    const mat = new HandleMaterial("handle", this._scene);
    if (positionOffset) {
      mat._positionOffset = positionOffset;
    }
    return mat;
  }
  _updateMaterial() {
    const state = this._state;
    for (const mat of this._materials) {
      mat.hover = false;
      mat.drag = false;
    }
    if (state & HandleState.DRAG) {
      for (const mat of this._materials) {
        mat.drag = true;
      }
    } else if (state & HandleState.HOVER) {
      for (const mat of this._materials) {
        mat.hover = true;
      }
    }
  }
  /**
   * Binds callbacks from dragging interaction
   * @param dragStartFn Function to call on drag start
   * @param dragFn Function to call on drag
   * @param dragEndFn Function to call on drag end
   */
  setDragBehavior(dragStartFn, dragFn, dragEndFn) {
    const dragBehavior = new BaseSixDofDragBehavior();
    this._dragBehavior = dragBehavior;
    this._dragStartObserver = dragBehavior.onDragStartObservable.add(dragStartFn);
    this._draggingObserver = dragBehavior.onDragObservable.add(dragFn);
    this._dragEndObserver = dragBehavior.onDragEndObservable.add(dragEndFn);
    this._dragBehavior.attach(this.node);
  }
  /**
   * Disposes the handle
   */
  dispose() {
    this._dragBehavior.onDragStartObservable.remove(this._dragStartObserver);
    this._dragBehavior.onDragObservable.remove(this._draggingObserver);
    this._dragBehavior.onDragEndObservable.remove(this._dragEndObserver);
    this._dragBehavior.detach();
    for (const material of this._materials) {
      material.dispose();
    }
    this.node.dispose();
  }
};
var SideHandle = class extends GizmoHandle {
  /**
   * Creates the meshes and parent node of the handle
   * @returns created node
   */
  createNode() {
    const verticalBox = CreateBox("sideVert", { width: 1, height: 10, depth: 0.1 }, this._scene);
    const sideNode = new TransformNode("side", this._scene);
    verticalBox.parent = sideNode;
    const mat = this._createMaterial();
    verticalBox.material = mat;
    verticalBox.isNearGrabbable = true;
    this._materials.push(mat);
    return sideNode;
  }
};
var CornerHandle = class extends GizmoHandle {
  /**
   * Creates the meshes and parent node of the handle
   * @returns created node
   */
  createNode() {
    const horizontalBox = CreateBox("angleHor", { width: 3, height: 1, depth: 0.1 }, this._scene);
    const verticalBox = CreateBox("angleVert", { width: 1, height: 3, depth: 0.1 }, this._scene);
    const angleNode = new TransformNode("angle", this._scene);
    horizontalBox.parent = angleNode;
    verticalBox.parent = angleNode;
    horizontalBox.material = this._createMaterial(new Vector3(1, 0, 0));
    verticalBox.material = this._createMaterial(new Vector3(0, 1, 0));
    verticalBox.isNearGrabbable = true;
    horizontalBox.isNearGrabbable = true;
    this._materials.push(horizontalBox.material);
    this._materials.push(verticalBox.material);
    return angleNode;
  }
};

// node_modules/@babylonjs/gui/3D/gizmos/slateGizmo.js
var SlateGizmo = class extends Gizmo {
  /**
   * The slate attached to this gizmo
   */
  set attachedSlate(control) {
    if (control) {
      this.attachedMesh = control.mesh;
      this.updateBoundingBox();
      this._pickedPointObserver = control._host.onPickingObservable.add((pickedMesh) => {
        if (this._handleHovered && (!pickedMesh || pickedMesh.parent !== this._handleHovered.node)) {
          this._handleHovered.hover = false;
          this._handleHovered = null;
        }
        if (pickedMesh && pickedMesh.parent && pickedMesh.parent.reservedDataStore && pickedMesh.parent.reservedDataStore.handle) {
          const handle = pickedMesh.parent.reservedDataStore.handle;
          if (handle.gizmo === this) {
            this._handleHovered = handle;
            this._handleHovered.hover = true;
          }
        }
      });
    } else if (this._attachedSlate) {
      this._attachedSlate._host.onPickingObservable.remove(this._pickedPointObserver);
    }
    this._attachedSlate = control;
  }
  get attachedSlate() {
    return this._attachedSlate;
  }
  constructor(utilityLayer) {
    super(utilityLayer);
    this._boundingDimensions = new Vector3(0, 0, 0);
    this._renderObserver = null;
    this._tmpQuaternion = new Quaternion();
    this._tmpVector = new Vector3(0, 0, 0);
    this._corners = [];
    this._sides = [];
    this._boundingBoxGizmo = {
      min: new Vector3(),
      max: new Vector3()
    };
    this._margin = 0.35;
    this._handleSize = 0.075;
    this._attachedSlate = null;
    this._existingSlateScale = new Vector3();
    this.fixedScreenSize = false;
    this.fixedScreenSizeDistanceFactor = 10;
    this._createNode();
    this.updateScale = false;
    this._renderObserver = this.gizmoLayer.originalScene.onBeforeRenderObservable.add(() => {
      if (this.attachedMesh && !this._existingSlateScale.equals(this.attachedMesh.scaling)) {
        this.updateBoundingBox();
      }
    });
  }
  _createNode() {
    this._handlesParent = new TransformNode("handlesParent", this.gizmoLayer.utilityLayerScene);
    this._handlesParent.rotationQuaternion = Quaternion.Identity();
    const masksCorners = [
      {
        dimensions: new Vector3(-1, -1, 0),
        origin: new Vector3(1, 0, 0)
      },
      {
        dimensions: new Vector3(1, -1, 0),
        origin: new Vector3(0, 0, 0)
      },
      {
        dimensions: new Vector3(1, 1, 0),
        origin: new Vector3(0, 1, 0)
      },
      {
        dimensions: new Vector3(-1, 1, 0),
        origin: new Vector3(1, 1, 0)
      }
    ];
    for (let i = 0; i < 4; i++) {
      const corner = new CornerHandle(this, this.gizmoLayer.utilityLayerScene);
      this._corners.push(corner);
      corner.node.rotation.z = Math.PI / 2 * i;
      corner.node.parent = this._handlesParent;
      this._assignDragBehaviorCorners(corner, (originStart, dimensionsStart, offset, masks) => this._moveHandle(originStart, dimensionsStart, offset, masks, true), masksCorners[i]);
    }
    for (let i = 0; i < 4; i++) {
      const side = new SideHandle(this, this.gizmoLayer.utilityLayerScene);
      this._sides.push(side);
      side.node.rotation.z = Math.PI / 2 * i;
      side.node.parent = this._handlesParent;
      this._assignDragBehaviorSides(side, i % 2 === 0 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0));
    }
    this._handlesParent.parent = this._rootMesh;
  }
  _keepAspectRatio(vector, aspectRatio, invertDiagonal = false) {
    const axis = TmpVectors.Vector3[0];
    axis.copyFromFloats(aspectRatio, 1, 0).normalize();
    if (invertDiagonal) {
      axis.y *= -1;
    }
    const dot = Vector3.Dot(vector, axis);
    vector.copyFrom(axis).scaleInPlace(dot);
  }
  _clampDimensions(vector, dimensions, mask, keepAspectRatio = false) {
    const impact = TmpVectors.Vector3[0];
    impact.copyFrom(vector).multiplyInPlace(mask);
    const clampedDimensions = TmpVectors.Vector3[1];
    clampedDimensions.copyFromFloats(Math.max(this._attachedSlate.minDimensions.x, impact.x + dimensions.x), Math.max(this._attachedSlate.minDimensions.y, impact.y + dimensions.y), 0);
    if (keepAspectRatio) {
      const ratio = dimensions.x / dimensions.y;
      clampedDimensions.x = Math.max(clampedDimensions.x, clampedDimensions.y * ratio);
      clampedDimensions.y = Math.max(clampedDimensions.y, clampedDimensions.x / ratio);
    }
    impact.copyFrom(clampedDimensions).subtractInPlace(dimensions);
    vector.x = Math.sign(vector.x) * Math.abs(impact.x);
    vector.y = Math.sign(vector.y) * Math.abs(impact.y);
  }
  _moveHandle(originStart, dimensionsStart, offset, masks, isCorner) {
    if (!this._attachedSlate) {
      return;
    }
    if (isCorner) {
      const aspectRatio = dimensionsStart.x / dimensionsStart.y;
      this._keepAspectRatio(offset, aspectRatio, masks.dimensions.x * masks.dimensions.y < 0);
    }
    this._clampDimensions(offset, dimensionsStart, masks.dimensions, isCorner);
    const offsetOriginMasked = TmpVectors.Vector3[0];
    const offsetDimensionsMasked = TmpVectors.Vector3[1];
    offsetOriginMasked.copyFrom(offset).multiplyInPlace(masks.origin);
    offsetDimensionsMasked.copyFrom(offset).multiplyInPlace(masks.dimensions);
    this._attachedSlate.origin.copyFrom(originStart).addInPlace(offsetOriginMasked);
    this._attachedSlate.dimensions.set(dimensionsStart.x + offsetDimensionsMasked.x, dimensionsStart.y + offsetDimensionsMasked.y);
  }
  _assignDragBehaviorCorners(handle, moveFn, masks) {
    const dimensionsStart = new Vector3();
    const originStart = new Vector3();
    const dragOrigin = new Vector3();
    const toObjectFrame = new Matrix();
    const dragPlaneNormal = new Vector3();
    const projectToRef = (position, normal, origin, ref) => {
      position.subtractToRef(origin, TmpVectors.Vector3[0]);
      const dot = Vector3.Dot(TmpVectors.Vector3[0], normal);
      TmpVectors.Vector3[1].copyFrom(normal).scaleInPlace(dot);
      TmpVectors.Vector3[0].subtractInPlace(TmpVectors.Vector3[1]);
      TmpVectors.Vector3[0].addToRef(origin, ref);
    };
    const dragStart = (event) => {
      if (this.attachedSlate && this.attachedMesh) {
        dimensionsStart.set(this.attachedSlate.dimensions.x, this.attachedSlate.dimensions.y, Epsilon);
        originStart.copyFrom(this.attachedSlate.origin);
        dragOrigin.copyFrom(event.position);
        toObjectFrame.copyFrom(this.attachedMesh.computeWorldMatrix(true));
        toObjectFrame.invert();
        this.attachedSlate._followButton.isToggled = false;
        Vector3.TransformNormalToRef(Vector3.Forward(), this.attachedMesh.getWorldMatrix(), dragPlaneNormal);
        dragPlaneNormal.normalize();
        if (this._handleHovered) {
          this._handleDragged = this._handleHovered;
          this._handleDragged.drag = true;
        }
      }
    };
    const dragging = (event) => {
      if (this.attachedSlate && this.attachedMesh) {
        projectToRef(event.position, dragPlaneNormal, dragOrigin, this._tmpVector);
        this._tmpVector.subtractInPlace(dragOrigin);
        Vector3.TransformNormalToRef(this._tmpVector, toObjectFrame, this._tmpVector);
        moveFn(originStart, dimensionsStart, this._tmpVector, masks);
        this.attachedSlate._positionElements();
        this.updateBoundingBox();
      }
    };
    const dragEnd = () => {
      if (this.attachedSlate && this.attachedNode) {
        this.attachedSlate._updatePivot();
        if (this._handleDragged) {
          this._handleDragged.drag = false;
          this._handleDragged = null;
        }
      }
    };
    handle.setDragBehavior(dragStart, dragging, dragEnd);
  }
  _assignDragBehaviorSides(handle, dragPlaneNormal) {
    const quaternionOrigin = new Quaternion();
    const dragOrigin = new Vector3();
    const directionOrigin = new Vector3();
    const worldPivot = new Vector3();
    const worldPlaneNormal = new Vector3();
    const dragStart = (event) => {
      if (this.attachedSlate && this.attachedMesh) {
        quaternionOrigin.copyFrom(this.attachedMesh.rotationQuaternion);
        dragOrigin.copyFrom(event.position);
        worldPivot.copyFrom(this.attachedMesh.getAbsolutePivotPoint());
        directionOrigin.copyFrom(dragOrigin).subtractInPlace(worldPivot).normalize();
        this.attachedSlate._followButton.isToggled = false;
        Vector3.TransformNormalToRef(dragPlaneNormal, this.attachedMesh.getWorldMatrix(), worldPlaneNormal);
        worldPlaneNormal.normalize();
        if (this._handleHovered) {
          this._handleDragged = this._handleHovered;
          this._handleDragged.drag = true;
        }
      }
    };
    const dragging = (event) => {
      if (this.attachedSlate && this.attachedMesh) {
        this._tmpVector.copyFrom(event.position);
        this._tmpVector.subtractInPlace(worldPivot);
        this._tmpVector.normalize();
        const angle = -Vector3.GetAngleBetweenVectorsOnPlane(this._tmpVector, directionOrigin, worldPlaneNormal);
        Quaternion.RotationAxisToRef(dragPlaneNormal, angle, this._tmpQuaternion);
        quaternionOrigin.multiplyToRef(this._tmpQuaternion, this.attachedMesh.rotationQuaternion);
      }
    };
    const dragEnd = () => {
      if (this.attachedSlate && this.attachedNode) {
        this.attachedSlate._updatePivot();
        if (this._handleDragged) {
          this._handleDragged.drag = false;
          this._handleDragged = null;
        }
      }
    };
    handle.setDragBehavior(dragStart, dragging, dragEnd);
  }
  _attachedNodeChanged(value) {
    if (value) {
      this.updateBoundingBox();
    }
  }
  /**
   * Updates the bounding box information for the gizmo
   */
  updateBoundingBox() {
    if (this.attachedMesh) {
      PivotTools._RemoveAndStorePivotPoint(this.attachedMesh);
      const originalParent = this.attachedMesh.parent;
      this.attachedMesh.setParent(null);
      this._update();
      if (!this.attachedMesh.rotationQuaternion) {
        this.attachedMesh.rotationQuaternion = Quaternion.RotationYawPitchRoll(this.attachedMesh.rotation.y, this.attachedMesh.rotation.x, this.attachedMesh.rotation.z);
      }
      this._tmpQuaternion.copyFrom(this.attachedMesh.rotationQuaternion);
      this._tmpVector.copyFrom(this.attachedMesh.position);
      this.attachedMesh.rotationQuaternion.set(0, 0, 0, 1);
      this.attachedMesh.position.set(0, 0, 0);
      const boundingMinMax = this.attachedMesh.getHierarchyBoundingVectors();
      boundingMinMax.max.subtractToRef(boundingMinMax.min, this._boundingDimensions);
      this._boundingBoxGizmo.min = boundingMinMax.min;
      this._boundingBoxGizmo.max = boundingMinMax.max;
      this._updateHandlesPosition();
      this._updateHandlesScaling();
      this.attachedMesh.rotationQuaternion.copyFrom(this._tmpQuaternion);
      this.attachedMesh.position.copyFrom(this._tmpVector);
      PivotTools._RestorePivotPoint(this.attachedMesh);
      this.attachedMesh.setParent(originalParent);
      this.attachedMesh.computeWorldMatrix(true);
      this._existingSlateScale.copyFrom(this.attachedMesh.scaling);
    }
  }
  _updateHandlesPosition() {
    const min = this._boundingBoxGizmo.min.clone();
    const max = this._boundingBoxGizmo.max.clone();
    const handleScaling = this._corners[0].node.scaling.length();
    min.x -= this._margin * handleScaling;
    min.y -= this._margin * handleScaling;
    max.x += this._margin * handleScaling;
    max.y += this._margin * handleScaling;
    const center = min.add(max).scaleInPlace(0.5);
    this._corners[0].node.position.copyFromFloats(min.x, min.y, 0);
    this._corners[1].node.position.copyFromFloats(max.x, min.y, 0);
    this._corners[2].node.position.copyFromFloats(max.x, max.y, 0);
    this._corners[3].node.position.copyFromFloats(min.x, max.y, 0);
    this._sides[0].node.position.copyFromFloats(min.x, center.y, 0);
    this._sides[1].node.position.copyFromFloats(center.x, min.y, 0);
    this._sides[2].node.position.copyFromFloats(max.x, center.y, 0);
    this._sides[3].node.position.copyFromFloats(center.x, max.y, 0);
  }
  _updateHandlesScaling() {
    if (this._attachedSlate && this._attachedSlate.mesh) {
      const scaledWidth = this._attachedSlate.mesh.scaling.x * this._attachedSlate.dimensions.x;
      const scaledHeight = this._attachedSlate.mesh.scaling.y * this._attachedSlate.dimensions.y;
      const scale = Math.min(scaledWidth, scaledHeight) * this._handleSize;
      for (let index = 0; index < this._corners.length; index++) {
        this._corners[index].node.scaling.setAll(scale);
      }
      for (let index = 0; index < this._sides.length; index++) {
        this._sides[index].node.scaling.setAll(scale);
      }
    }
  }
  _update() {
    super._update();
    if (!this.gizmoLayer.utilityLayerScene.activeCamera) {
      return;
    }
    if (this._attachedSlate && this._attachedSlate.mesh) {
      if (this.fixedScreenSize) {
        this._attachedSlate.mesh.absolutePosition.subtractToRef(this.gizmoLayer.utilityLayerScene.activeCamera.position, this._tmpVector);
        const distanceFromCamera = this._handleSize * this._tmpVector.length() / this.fixedScreenSizeDistanceFactor;
        for (let i = 0; i < this._corners.length; i++) {
          this._corners[i].node.scaling.set(distanceFromCamera, distanceFromCamera, distanceFromCamera);
        }
        for (let i = 0; i < this._sides.length; i++) {
          this._sides[i].node.scaling.set(distanceFromCamera, distanceFromCamera, distanceFromCamera);
        }
      }
      this._updateHandlesPosition();
    }
  }
  dispose() {
    this.gizmoLayer.originalScene.onBeforeRenderObservable.remove(this._renderObserver);
    super.dispose();
    for (const corner of this._corners) {
      corner.dispose();
    }
    for (const side of this._sides) {
      side.dispose();
    }
  }
};

// node_modules/@babylonjs/gui/3D/controls/holographicSlate.js
var HolographicSlate = class _HolographicSlate extends ContentDisplay3D {
  /**
   * Regroups all mesh behaviors for the slate
   */
  get defaultBehavior() {
    return this._defaultBehavior;
  }
  /**
   * 2D dimensions of the slate
   */
  get dimensions() {
    return this._dimensions;
  }
  set dimensions(value) {
    let scale = 1;
    if (value.x < this.minDimensions.x || value.y < this.minDimensions.y) {
      const newRatio = value.x / value.y;
      const minRatio = this.minDimensions.x / this.minDimensions.y;
      if (minRatio > newRatio) {
        scale = this.minDimensions.x / value.x;
      } else {
        scale = this.minDimensions.y / value.y;
      }
    }
    this._dimensions.copyFrom(value).scaleInPlace(scale);
    this._updatePivot();
    this._positionElements();
  }
  /**
   * Height of the title bar component
   */
  get titleBarHeight() {
    return this._titleBarHeight;
  }
  set titleBarHeight(value) {
    this._titleBarHeight = value;
  }
  /**
   * Rendering ground id of all the meshes
   */
  set renderingGroupId(id) {
    this._titleBar.renderingGroupId = id;
    this._titleBarTitle.renderingGroupId = id;
    this._contentPlate.renderingGroupId = id;
    this._backPlate.renderingGroupId = id;
  }
  get renderingGroupId() {
    return this._titleBar.renderingGroupId;
  }
  /**
   * The title text displayed at the top of the slate
   */
  set title(title) {
    this._titleText = title;
    if (this._titleTextComponent) {
      this._titleTextComponent.text = title;
    }
  }
  get title() {
    return this._titleText;
  }
  /**
   * Creates a new slate
   * @param name defines the control name
   */
  constructor(name22) {
    super(name22);
    this.titleBarMargin = 5e-3;
    this.origin = new Vector3(0, 0, 0);
    this._dimensions = new Vector2(21.875, 12.5);
    this._titleBarHeight = 0.625;
    this._titleText = "";
    this._contentScaleRatio = 1;
    this.minDimensions = new Vector2(15.625, 6.25);
    this.defaultDimensions = this._dimensions.clone();
    this._followButton = new TouchHolographicButton("followButton" + this.name);
    this._followButton.isToggleButton = true;
    this._closeButton = new TouchHolographicButton("closeButton" + this.name);
    this._contentViewport = new Viewport(0, 0, 1, 1);
    this._contentDragBehavior = new PointerDragBehavior({
      dragPlaneNormal: new Vector3(0, 0, -1)
    });
  }
  /**
   * Apply the facade texture (created from the content property).
   * This function can be overloaded by child classes
   * @param facadeTexture defines the AdvancedDynamicTexture to use
   */
  _applyFacade(facadeTexture) {
    this._contentMaterial.albedoTexture = facadeTexture;
    this._resetContentPositionAndZoom();
    this._applyContentViewport();
    facadeTexture.attachToMesh(this._contentPlate, true);
  }
  _addControl(control) {
    control._host = this._host;
    if (this._host.utilityLayer) {
      control._prepareNode(this._host.utilityLayer.utilityLayerScene);
    }
  }
  _getTypeName() {
    return "HolographicSlate";
  }
  /**
   * @internal
   */
  _positionElements() {
    const followButton = this._followButton;
    const closeButton = this._closeButton;
    const titleBar = this._titleBar;
    const titleBarTitle = this._titleBarTitle;
    const contentPlate = this._contentPlate;
    const backPlate = this._backPlate;
    if (followButton && closeButton && titleBar) {
      closeButton.scaling.setAll(this.titleBarHeight);
      followButton.scaling.setAll(this.titleBarHeight);
      closeButton.position.copyFromFloats(this.dimensions.x - this.titleBarHeight / 2, -this.titleBarHeight / 2, 0).addInPlace(this.origin);
      followButton.position.copyFromFloats(this.dimensions.x - 3 * this.titleBarHeight / 2, -this.titleBarHeight / 2, 0).addInPlace(this.origin);
      const contentPlateHeight = this.dimensions.y - this.titleBarHeight - this.titleBarMargin;
      const rightHandScene = contentPlate.getScene().useRightHandedSystem;
      titleBar.scaling.set(this.dimensions.x, this.titleBarHeight, Epsilon);
      titleBarTitle.scaling.set(this.dimensions.x - 2 * this.titleBarHeight, this.titleBarHeight, Epsilon);
      contentPlate.scaling.copyFromFloats(this.dimensions.x, contentPlateHeight, Epsilon);
      backPlate.scaling.copyFromFloats(this.dimensions.x, contentPlateHeight, Epsilon);
      titleBar.position.copyFromFloats(this.dimensions.x / 2, -(this.titleBarHeight / 2), 0).addInPlace(this.origin);
      titleBarTitle.position.copyFromFloats(this.dimensions.x / 2 - this.titleBarHeight, -(this.titleBarHeight / 2), rightHandScene ? Epsilon : -Epsilon).addInPlace(this.origin);
      contentPlate.position.copyFromFloats(this.dimensions.x / 2, -(this.titleBarHeight + this.titleBarMargin + contentPlateHeight / 2), 0).addInPlace(this.origin);
      backPlate.position.copyFromFloats(this.dimensions.x / 2, -(this.titleBarHeight + this.titleBarMargin + contentPlateHeight / 2), rightHandScene ? -Epsilon : Epsilon).addInPlace(this.origin);
      this._titleTextComponent.host.scaleTo(_HolographicSlate._DEFAULT_TEXT_RESOLUTION_Y * titleBarTitle.scaling.x / titleBarTitle.scaling.y, _HolographicSlate._DEFAULT_TEXT_RESOLUTION_Y);
      const aspectRatio = this.dimensions.x / contentPlateHeight;
      this._contentViewport.width = this._contentScaleRatio;
      this._contentViewport.height = this._contentScaleRatio / aspectRatio;
      this._applyContentViewport();
      if (this._gizmo) {
        this._gizmo.updateBoundingBox();
      }
    }
  }
  _applyContentViewport() {
    var _a;
    if (((_a = this._contentPlate) == null ? void 0 : _a.material) && this._contentPlate.material.albedoTexture) {
      const tex = this._contentPlate.material.albedoTexture;
      tex.uScale = this._contentScaleRatio;
      tex.vScale = this._contentScaleRatio / this._contentViewport.width * this._contentViewport.height;
      tex.uOffset = this._contentViewport.x;
      tex.vOffset = this._contentViewport.y;
    }
  }
  _resetContentPositionAndZoom() {
    this._contentViewport.x = 0;
    this._contentViewport.y = 1 - this._contentViewport.height / this._contentViewport.width;
    this._contentScaleRatio = 1;
  }
  /**
   * @internal
   */
  _updatePivot() {
    if (!this.mesh) {
      return;
    }
    const center = new Vector3(this.dimensions.x * 0.5, -this.dimensions.y * 0.5, Epsilon);
    center.addInPlace(this.origin);
    center.z = 0;
    const origin = new Vector3(0, 0, 0);
    Vector3.TransformCoordinatesToRef(origin, this.mesh.computeWorldMatrix(true), origin);
    this.mesh.setPivotPoint(center);
    const origin2 = new Vector3(0, 0, 0);
    Vector3.TransformCoordinatesToRef(origin2, this.mesh.computeWorldMatrix(true), origin2);
    this.mesh.position.addInPlace(origin).subtractInPlace(origin2);
  }
  // Mesh association
  _createNode(scene) {
    const node = new Mesh("slate_" + this.name, scene);
    this._titleBar = CreateBox("titleBar_" + this.name, { size: 1 }, scene);
    this._titleBarTitle = CreatePlane("titleText_" + this.name, { size: 1 }, scene);
    this._titleBarTitle.parent = node;
    this._titleBarTitle.isPickable = false;
    const adt = AdvancedDynamicTexture.CreateForMesh(this._titleBarTitle);
    this._titleTextComponent = new TextBlock("titleText_" + this.name, this._titleText);
    this._titleTextComponent.textWrapping = TextWrapping.Ellipsis;
    this._titleTextComponent.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._titleTextComponent.color = "white";
    this._titleTextComponent.fontSize = _HolographicSlate._DEFAULT_TEXT_RESOLUTION_Y / 2;
    this._titleTextComponent.paddingLeft = _HolographicSlate._DEFAULT_TEXT_RESOLUTION_Y / 4;
    adt.addControl(this._titleTextComponent);
    if (scene.useRightHandedSystem) {
      const faceUV = new Vector4(0, 0, 1, 1);
      this._contentPlate = CreatePlane("contentPlate_" + this.name, { size: 1, sideOrientation: VertexData.BACKSIDE, frontUVs: faceUV }, scene);
      this._backPlate = CreatePlane("backPlate_" + this.name, { size: 1, sideOrientation: VertexData.FRONTSIDE }, scene);
    } else {
      const faceUV = new Vector4(0, 0, 1, 1);
      this._contentPlate = CreatePlane("contentPlate_" + this.name, { size: 1, sideOrientation: VertexData.FRONTSIDE, frontUVs: faceUV }, scene);
      this._backPlate = CreatePlane("backPlate_" + this.name, { size: 1, sideOrientation: VertexData.BACKSIDE }, scene);
    }
    this._titleBar.parent = node;
    this._titleBar.isNearGrabbable = true;
    this._contentPlate.parent = node;
    this._backPlate.parent = node;
    this._attachContentPlateBehavior();
    this._addControl(this._followButton);
    this._addControl(this._closeButton);
    const followButton = this._followButton;
    const closeButton = this._closeButton;
    followButton.node.parent = node;
    closeButton.node.parent = node;
    this._positionElements();
    this._followButton.imageUrl = _HolographicSlate.ASSETS_BASE_URL + _HolographicSlate.FOLLOW_ICON_FILENAME;
    this._closeButton.imageUrl = _HolographicSlate.ASSETS_BASE_URL + _HolographicSlate.CLOSE_ICON_FILENAME;
    this._followButton.isBackplateVisible = false;
    this._closeButton.isBackplateVisible = false;
    this._followButton.onToggleObservable.add((isToggled) => {
      this._defaultBehavior.followBehaviorEnabled = isToggled;
      if (this._defaultBehavior.followBehaviorEnabled) {
        this._defaultBehavior.followBehavior.recenter();
      }
    });
    this._closeButton.onPointerClickObservable.add(() => {
      this.dispose();
    });
    node.rotationQuaternion = Quaternion.Identity();
    node.isVisible = false;
    return node;
  }
  _attachContentPlateBehavior() {
    this._contentDragBehavior.attach(this._contentPlate);
    this._contentDragBehavior.moveAttached = false;
    this._contentDragBehavior.useObjectOrientationForDragging = true;
    this._contentDragBehavior.updateDragPlane = false;
    const origin = new Vector3();
    const worldDimensions = new Vector3();
    const upWorld = new Vector3();
    const rightWorld = new Vector3();
    const projectedOffset = new Vector2();
    let startViewport;
    let worldMatrix;
    this._contentDragBehavior.onDragStartObservable.add((event) => {
      if (!this.node) {
        return;
      }
      startViewport = this._contentViewport.clone();
      worldMatrix = this.node.computeWorldMatrix(true);
      origin.copyFrom(event.dragPlanePoint);
      worldDimensions.set(this.dimensions.x, this.dimensions.y, Epsilon);
      worldDimensions.y -= this.titleBarHeight + this.titleBarMargin;
      Vector3.TransformNormalToRef(worldDimensions, worldMatrix, worldDimensions);
      upWorld.copyFromFloats(0, 1, 0);
      Vector3.TransformNormalToRef(upWorld, worldMatrix, upWorld);
      rightWorld.copyFromFloats(1, 0, 0);
      Vector3.TransformNormalToRef(rightWorld, worldMatrix, rightWorld);
      upWorld.normalize();
      upWorld.scaleInPlace(1 / Vector3.Dot(upWorld, worldDimensions));
      rightWorld.normalize();
      rightWorld.scaleInPlace(1 / Vector3.Dot(rightWorld, worldDimensions));
    });
    const offset = new Vector3();
    this._contentDragBehavior.onDragObservable.add((event) => {
      offset.copyFrom(event.dragPlanePoint);
      offset.subtractInPlace(origin);
      projectedOffset.copyFromFloats(Vector3.Dot(offset, rightWorld), Vector3.Dot(offset, upWorld));
      this._contentViewport.x = Scalar.Clamp(startViewport.x - offset.x, 0, 1 - this._contentViewport.width * this._contentScaleRatio);
      this._contentViewport.y = Scalar.Clamp(startViewport.y - offset.y, 0, 1 - this._contentViewport.height * this._contentScaleRatio);
      this._applyContentViewport();
    });
  }
  _affectMaterial(mesh) {
    this._titleBarMaterial = new FluentBackplateMaterial(`${this.name} plateMaterial`, mesh.getScene());
    this._contentMaterial = new FluentMaterial(`${this.name} contentMaterial`, mesh.getScene());
    this._contentMaterial.renderBorders = true;
    this._backMaterial = new FluentBackplateMaterial(`${this.name} backPlate`, mesh.getScene());
    this._backMaterial.lineWidth = Epsilon;
    this._backMaterial.radius = 5e-3;
    this._backMaterial.backFaceCulling = true;
    this._titleBar.material = this._titleBarMaterial;
    this._contentPlate.material = this._contentMaterial;
    this._backPlate.material = this._backMaterial;
    this._resetContent();
    this._applyContentViewport();
  }
  /**
   * @internal
   */
  _prepareNode(scene) {
    super._prepareNode(scene);
    this._gizmo = new SlateGizmo(this._host.utilityLayer);
    this._gizmo.attachedSlate = this;
    this._defaultBehavior = new DefaultBehavior();
    this._defaultBehavior.attach(this.node, [this._titleBar]);
    this._defaultBehavior.sixDofDragBehavior.onDragStartObservable.add(() => {
      this._followButton.isToggled = false;
    });
    this._positionChangedObserver = this._defaultBehavior.sixDofDragBehavior.onPositionChangedObservable.add(() => {
      this._gizmo.updateBoundingBox();
    });
    this._updatePivot();
    this.resetDefaultAspectAndPose(false);
  }
  /**
   * Resets the aspect and pose of the slate so it is right in front of the active camera, facing towards it.
   * @param resetAspect Should the slate's dimensions/aspect ratio be reset as well
   */
  resetDefaultAspectAndPose(resetAspect = true) {
    if (!this._host || !this._host.utilityLayer || !this.node) {
      return;
    }
    const scene = this._host.utilityLayer.utilityLayerScene;
    const camera = scene.activeCamera;
    if (camera) {
      const worldMatrix = camera.getWorldMatrix();
      const backward = Vector3.TransformNormal(Vector3.Backward(scene.useRightHandedSystem), worldMatrix);
      this.origin.setAll(0);
      this._gizmo.updateBoundingBox();
      const pivot = this.node.getAbsolutePivotPoint();
      this.node.position.copyFrom(camera.position).subtractInPlace(backward).subtractInPlace(pivot);
      this.node.rotationQuaternion = Quaternion.FromLookDirectionLH(backward, new Vector3(0, 1, 0));
      if (resetAspect) {
        this.dimensions = this.defaultDimensions;
      }
    }
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    super.dispose();
    this._titleBarMaterial.dispose();
    this._contentMaterial.dispose();
    this._titleBar.dispose();
    this._titleBarTitle.dispose();
    this._contentPlate.dispose();
    this._backPlate.dispose();
    this._followButton.dispose();
    this._closeButton.dispose();
    this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
    this._defaultBehavior.sixDofDragBehavior.onPositionChangedObservable.remove(this._positionChangedObserver);
    this._defaultBehavior.detach();
    this._gizmo.dispose();
    this._contentDragBehavior.detach();
  }
};
HolographicSlate.ASSETS_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
HolographicSlate.CLOSE_ICON_FILENAME = "IconClose.png";
HolographicSlate.FOLLOW_ICON_FILENAME = "IconFollowMe.png";
HolographicSlate._DEFAULT_TEXT_RESOLUTION_Y = 102.4;

// node_modules/@babylonjs/gui/3D/controls/meshButton3D.js
var MeshButton3D = class extends Button3D {
  /**
   * Creates a new 3D button based on a mesh
   * @param mesh mesh to become a 3D button
   * @param name defines the control name
   */
  constructor(mesh, name22) {
    super(name22);
    this._currentMesh = mesh;
    this.pointerEnterAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(1.1);
    };
    this.pointerOutAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(1 / 1.1);
    };
    this.pointerDownAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(0.95);
    };
    this.pointerUpAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(1 / 0.95);
    };
  }
  _getTypeName() {
    return "MeshButton3D";
  }
  // Mesh association
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createNode(scene) {
    this._currentMesh.getChildMeshes().forEach((mesh) => {
      this._injectGUI3DReservedDataStore(mesh).control = this;
    });
    return this._currentMesh;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _affectMaterial(mesh) {
  }
};

// node_modules/@babylonjs/gui/3D/controls/nearMenu.js
var NearMenu = class _NearMenu extends TouchHolographicMenu {
  /**
   * Regroups all mesh behaviors for the near menu
   */
  get defaultBehavior() {
    return this._defaultBehavior;
  }
  /**
   * Indicates if the near menu is world-pinned
   */
  get isPinned() {
    return this._isPinned;
  }
  set isPinned(value) {
    if (this._pinButton.isToggled !== value) {
      this._pinButton.isToggled = value;
      return;
    }
    this._isPinned = value;
    if (value) {
      this._defaultBehavior.followBehaviorEnabled = false;
    } else {
      this._defaultBehavior.followBehaviorEnabled = true;
    }
  }
  _createPinButton(parent) {
    const control = new TouchHolographicButton("pin" + this.name, false);
    control.imageUrl = _NearMenu._ASSETS_BASE_URL + _NearMenu._PIN_ICON_FILENAME;
    control.parent = this;
    control._host = this._host;
    control.isToggleButton = true;
    control.onToggleObservable.add((newState) => {
      this.isPinned = newState;
    });
    if (this._host.utilityLayer) {
      control._prepareNode(this._host.utilityLayer.utilityLayerScene);
      control.scaling.scaleInPlace(TouchHolographicMenu.MENU_BUTTON_SCALE);
      if (control.node) {
        control.node.parent = parent;
      }
    }
    return control;
  }
  _createNode(scene) {
    const node = super._createNode(scene);
    this._pinButton = this._createPinButton(node);
    this.isPinned = false;
    this._defaultBehavior.attach(node, [this._backPlate]);
    this._defaultBehavior.followBehavior.ignoreCameraPitchAndRoll = true;
    this._defaultBehavior.followBehavior.pitchOffset = -15;
    this._defaultBehavior.followBehavior.minimumDistance = 0.3;
    this._defaultBehavior.followBehavior.defaultDistance = 0.4;
    this._defaultBehavior.followBehavior.maximumDistance = 0.6;
    this._backPlate.isNearGrabbable = true;
    node.isVisible = false;
    return node;
  }
  _finalProcessing() {
    super._finalProcessing();
    this._pinButton.position.copyFromFloats((this._backPlate.scaling.x + TouchHolographicMenu.MENU_BUTTON_SCALE) / 2, this._backPlate.scaling.y / 2, 0);
  }
  /**
   * Creates a near menu GUI 3D control
   * @param name name of the near menu
   */
  constructor(name22) {
    super(name22);
    this._isPinned = false;
    this._defaultBehavior = new DefaultBehavior();
    this._dragObserver = this._defaultBehavior.sixDofDragBehavior.onDragObservable.add(() => {
      this.isPinned = true;
    });
    this.backPlateMargin = 1;
  }
  /**
   * Disposes the near menu
   */
  dispose() {
    super.dispose();
    this._defaultBehavior.sixDofDragBehavior.onDragObservable.remove(this._dragObserver);
    this._defaultBehavior.detach();
  }
};
NearMenu._ASSETS_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
NearMenu._PIN_ICON_FILENAME = "IconPin.png";

// node_modules/@babylonjs/gui/3D/controls/planePanel.js
var PlanePanel = class extends VolumeBasedPanel {
  _mapGridNode(control, nodePosition) {
    const mesh = control.mesh;
    if (!mesh) {
      return;
    }
    control.position = nodePosition.clone();
    const target = TmpVectors.Vector3[0];
    target.copyFrom(nodePosition);
    switch (this.orientation) {
      case Container3D.FACEORIGIN_ORIENTATION:
      case Container3D.FACEFORWARD_ORIENTATION:
        target.addInPlace(new Vector3(0, 0, 1));
        mesh.lookAt(target);
        break;
      case Container3D.FACEFORWARDREVERSED_ORIENTATION:
      case Container3D.FACEORIGINREVERSED_ORIENTATION:
        target.addInPlace(new Vector3(0, 0, -1));
        mesh.lookAt(target);
        break;
    }
  }
};

// node_modules/@babylonjs/gui/3D/controls/scatterPanel.js
var ScatterPanel = class extends VolumeBasedPanel {
  constructor() {
    super(...arguments);
    this._iteration = 100;
  }
  /**
   * Gets or sets the number of iteration to use to scatter the controls (100 by default)
   */
  get iteration() {
    return this._iteration;
  }
  set iteration(value) {
    if (this._iteration === value) {
      return;
    }
    this._iteration = value;
    Tools.SetImmediate(() => {
      this._arrangeChildren();
    });
  }
  _mapGridNode(control, nodePosition) {
    const mesh = control.mesh;
    const newPos = this._scatterMapping(nodePosition);
    if (!mesh) {
      return;
    }
    switch (this.orientation) {
      case Container3D.FACEORIGIN_ORIENTATION:
      case Container3D.FACEFORWARD_ORIENTATION:
        mesh.lookAt(new Vector3(0, 0, 1));
        break;
      case Container3D.FACEFORWARDREVERSED_ORIENTATION:
      case Container3D.FACEORIGINREVERSED_ORIENTATION:
        mesh.lookAt(new Vector3(0, 0, -1));
        break;
    }
    control.position = newPos;
  }
  _scatterMapping(source) {
    source.x = (1 - Math.random() * 2) * this._cellWidth;
    source.y = (1 - Math.random() * 2) * this._cellHeight;
    return source;
  }
  _finalProcessing() {
    const meshes = [];
    for (const child of this._children) {
      if (!child.mesh) {
        continue;
      }
      meshes.push(child.mesh);
    }
    for (let count = 0; count < this._iteration; count++) {
      meshes.sort((a, b) => {
        const distance1 = a.position.lengthSquared();
        const distance2 = b.position.lengthSquared();
        if (distance1 < distance2) {
          return 1;
        } else if (distance1 > distance2) {
          return -1;
        }
        return 0;
      });
      const radiusPaddingSquared = Math.pow(this.margin, 2);
      const cellSize = Math.max(this._cellWidth, this._cellHeight);
      const difference2D = TmpVectors.Vector2[0];
      const difference = TmpVectors.Vector3[0];
      for (let i = 0; i < meshes.length - 1; i++) {
        for (let j = i + 1; j < meshes.length; j++) {
          if (i != j) {
            meshes[j].position.subtractToRef(meshes[i].position, difference);
            difference2D.x = difference.x;
            difference2D.y = difference.y;
            const combinedRadius = cellSize;
            let distance = difference2D.lengthSquared() - radiusPaddingSquared;
            const minSeparation = Math.min(distance, radiusPaddingSquared);
            distance -= minSeparation;
            if (distance < Math.pow(combinedRadius, 2)) {
              difference2D.normalize();
              difference.scaleInPlace((combinedRadius - Math.sqrt(distance)) * 0.5);
              meshes[j].position.addInPlace(difference);
              meshes[i].position.subtractInPlace(difference);
            }
          }
        }
      }
    }
  }
};

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlSliderBar.fragment.js
var name10 = "mrdlSliderBarPixelShader";
var shader9 = `uniform vec3 cameraPosition;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;uniform float _Radius_;uniform float _Bevel_Front_;uniform float _Bevel_Front_Stretch_;uniform float _Bevel_Back_;uniform float _Bevel_Back_Stretch_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform bool _Bulge_Enabled_;uniform float _Bulge_Height_;uniform float _Bulge_Radius_;uniform float _Sun_Intensity_;uniform float _Sun_Theta_;uniform float _Sun_Phi_;uniform float _Indirect_Diffuse_;uniform vec4 _Albedo_;uniform float _Specular_;uniform float _Shininess_;uniform float _Sharpness_;uniform float _Subsurface_;uniform vec4 _Left_Color_;uniform vec4 _Right_Color_;uniform float _Reflection_;uniform float _Front_Reflect_;uniform float _Edge_Reflect_;uniform float _Power_;uniform vec4 _Sky_Color_;uniform vec4 _Horizon_Color_;uniform vec4 _Ground_Color_;uniform float _Horizon_Power_;uniform sampler2D _Reflection_Map_;uniform sampler2D _Indirect_Environment_;uniform float _Width_;uniform float _Fuzz_;uniform float _Min_Fuzz_;uniform float _Clip_Fade_;uniform float _Hue_Shift_;uniform float _Saturation_Shift_;uniform float _Value_Shift_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform vec3 _Left_Index_Pos_;uniform vec3 _Right_Index_Pos_;uniform vec3 _Left_Index_Middle_Pos_;uniform vec3 _Right_Index_Middle_Pos_;uniform sampler2D _Decal_;uniform vec2 _Decal_Scale_XY_;uniform bool _Decal_Front_Only_;uniform float _Rim_Intensity_;uniform sampler2D _Rim_Texture_;uniform float _Rim_Hue_Shift_;uniform float _Rim_Saturation_Shift_;uniform float _Rim_Value_Shift_;uniform float _Iridescence_Intensity_;uniform sampler2D _Iridescence_Texture_;uniform bool Use_Global_Left_Index;uniform bool Use_Global_Right_Index;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;uniform vec4 Global_Left_Thumb_Tip_Position;uniform vec4 Global_Right_Thumb_Tip_Position;uniform vec4 Global_Left_Index_Middle_Position;uniform vec4 Global_Right_Index_Middle_Position;uniform float Global_Left_Index_Tip_Proximity;uniform float Global_Right_Index_Tip_Proximity;void Blob_Fragment_B30(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{float k1=dot(Blob_Info1.xy,Blob_Info1.xy);float k2=dot(Blob_Info2.xy,Blob_Info2.xy);vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);}
void FastLinearTosRGB_B42(
vec4 Linear,
out vec4 sRGB)
{sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));sRGB.a=Linear.a;}
void Scale_RGB_B59(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=vec4(Scalar,Scalar,Scalar,1)*Color;}
void Fragment_Main_B121(
float Sun_Intensity,
float Sun_Theta,
float Sun_Phi,
vec3 Normal,
vec4 Albedo,
float Fresnel_Reflect,
float Shininess,
vec3 Incident,
vec4 Horizon_Color,
vec4 Sky_Color,
vec4 Ground_Color,
float Indirect_Diffuse,
float Specular,
float Horizon_Power,
float Reflection,
vec4 Reflection_Sample,
vec4 Indirect_Sample,
float Sharpness,
float SSS,
float Subsurface,
vec4 Translucence,
vec4 Rim_Light,
vec4 Iridescence,
out vec4 Result)
{float theta=Sun_Theta*2.0*3.14159;float phi=Sun_Phi*3.14159;vec3 lightDir= vec3(cos(phi)*cos(theta),sin(phi),cos(phi)*sin(theta));float NdotL=max(dot(lightDir,Normal),0.0);vec3 R=reflect(Incident,Normal);float RdotL=max(0.0,dot(R,lightDir));float specular=pow(RdotL,Shininess);specular=mix(specular,smoothstep(0.495*Sharpness,1.0-0.495*Sharpness,specular),Sharpness);vec4 gi=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);Result=((Sun_Intensity*NdotL+Indirect_Sample*Indirect_Diffuse+Translucence)*(1.0+SSS*Subsurface))*Albedo*(1.0-Fresnel_Reflect)+(Sun_Intensity*specular*Specular+Fresnel_Reflect*Reflection*Reflection_Sample)+Fresnel_Reflect*Rim_Light+Iridescence;}
void Bulge_B79(
bool Enabled,
vec3 Normal,
vec3 Tangent,
float Bulge_Height,
vec4 UV,
float Bulge_Radius,
vec3 ButtonN,
out vec3 New_Normal)
{vec2 xy=clamp(UV.xy*2.0,vec2(-1,-1),vec2(1,1));vec3 B=(cross(Normal,Tangent));float k=-clamp(1.0-length(xy)/Bulge_Radius,0.0,1.0)*Bulge_Height;k=sin(k*3.14159*0.5);k*=smoothstep(0.9998,0.9999,abs(dot(ButtonN,Normal)));New_Normal=Normal*sqrt(1.0-k*k)+(xy.x*Tangent+xy.y*B)*k;New_Normal=Enabled ? New_Normal : Normal;}
void SSS_B77(
vec3 ButtonN,
vec3 Normal,
vec3 Incident,
out float Result)
{float NdotI=abs(dot(Normal,Incident));float BdotI=abs(dot(ButtonN,Incident));Result=(abs(NdotI-BdotI)); }
void FingerOcclusion_B67(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{float d=dot((Nearest-Position),Forward);float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);}
void FingerOcclusion_B68(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{float d=dot((Nearest-Position),Forward);float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);}
void Scale_Color_B91(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=Scalar*Color;}
void From_HSV_B73(
float Hue,
float Saturation,
float Value,
float Alpha,
out vec4 Color)
{vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(vec3(Hue,Hue,Hue)+K.xyz)*6.0-K.www);Color.rgb=Value*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),Saturation);Color.a=Alpha;}
void Fast_Fresnel_B122(
float Front_Reflect,
float Edge_Reflect,
float Power,
vec3 Normal,
vec3 Incident,
out float Transmit,
out float Reflect)
{float d=max(-dot(Incident,Normal),0.0);Reflect=Front_Reflect+(Edge_Reflect-Front_Reflect)*pow(.01-d,Power);Transmit=1.0-Reflect;}
void Mapped_Environment_B51(
sampler2D Reflected_Environment,
sampler2D Indirect_Environment,
vec3 Dir,
out vec4 Reflected_Color,
out vec4 Indirect_Diffuse)
{Reflected_Color=texture(Reflected_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));Indirect_Diffuse=texture(Indirect_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));}
vec4 SampleEnv_Bid50(vec3 D,vec4 S,vec4 H,vec4 G,float exponent)
{float k=pow(abs(D.y),exponent);vec4 C;if (D.y>0.0) {C=mix(H,S,k);} else {C=mix(H,G,k); }
return C;}
void Sky_Environment_B50(
vec3 Normal,
vec3 Reflected,
vec4 Sky_Color,
vec4 Horizon_Color,
vec4 Ground_Color,
float Horizon_Power,
out vec4 Reflected_Color,
out vec4 Indirect_Color)
{Reflected_Color=SampleEnv_Bid50(Reflected,Sky_Color,Horizon_Color,Ground_Color,Horizon_Power);Indirect_Color=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);}
void Min_Segment_Distance_B65(
vec3 P0,
vec3 P1,
vec3 Q0,
vec3 Q1,
out vec3 NearP,
out vec3 NearQ,
out float Distance)
{vec3 u=P1-P0;vec3 v=Q1-Q0;vec3 w=P0-Q0;float a=dot(u,u);float b=dot(u,v);float c=dot(v,v);float d=dot(u,w);float e=dot(v,w);float D=a*c-b*b;float sD=D;float tD=D;float sc,sN,tc,tN;if (D<0.00001) {sN=0.0;sD=1.0;tN=e;tD=c;} else {sN=(b*e-c*d);tN=(a*e-b*d);if (sN<0.0) {sN=0.0;tN=e;tD=c;} else if (sN>sD) {sN=sD;tN=e+b;tD=c;}}
if (tN<0.0) {tN=0.0;if (-d<0.0) {sN=0.0;} else if (-d>a) {sN=sD;} else {sN=-d;sD=a;}} else if (tN>tD) {tN=tD;if ((-d+b)<0.0) {sN=0.0;} else if ((-d+b)>a) {sN=sD;} else {sN=(-d+b);sD=a;}}
sc=abs(sN)<0.000001 ? 0.0 : sN/sD;tc=abs(tN)<0.000001 ? 0.0 : tN/tD;NearP=P0+sc*u;NearQ=Q0+tc*v;Distance=distance(NearP,NearQ);}
void To_XYZ_B74(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{X=Vec3.x;Y=Vec3.y;Z=Vec3.z;}
void Finger_Positions_B64(
vec3 Left_Index_Pos,
vec3 Right_Index_Pos,
vec3 Left_Index_Middle_Pos,
vec3 Right_Index_Middle_Pos,
out vec3 Left_Index,
out vec3 Right_Index,
out vec3 Left_Index_Middle,
out vec3 Right_Index_Middle)
{Left_Index= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Left_Index_Pos);Right_Index= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Right_Index_Pos);Left_Index_Middle= (Use_Global_Left_Index ? Global_Left_Index_Middle_Position.xyz : Left_Index_Middle_Pos);Right_Index_Middle= (Use_Global_Right_Index ? Global_Right_Index_Middle_Position.xyz : Right_Index_Middle_Pos);}
void VaryHSV_B108(
vec3 HSV_In,
float Hue_Shift,
float Saturation_Shift,
float Value_Shift,
out vec3 HSV_Out)
{HSV_Out=vec3(fract(HSV_In.x+Hue_Shift),clamp(HSV_In.y+Saturation_Shift,0.0,1.0),clamp(HSV_In.z+Value_Shift,0.0,1.0));}
void Remap_Range_B114(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));}
void To_HSV_B75(
vec4 Color,
out float Hue,
out float Saturation,
out float Value,
out float Alpha,
out vec3 HSV)
{vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=Color.g<Color.b ? vec4(Color.bg,K.wz) : vec4(Color.gb,K.xy);vec4 q=Color.r<p.x ? vec4(p.xyw,Color.r) : vec4(Color.r,p.yzx);float d=q.x-min(q.w,q.y);float e=1.0e-10;Hue=abs(q.z+(q.w-q.y)/(6.0*d+e));Saturation=d/(q.x+e);Value=q.x;Alpha=Color.a;HSV=vec3(Hue,Saturation,Value);}
void Code_B110(
float X,
out float Result)
{Result=(acos(X)/3.14159-0.5)*2.0;}
void Rim_Light_B132(
vec3 Front,
vec3 Normal,
vec3 Incident,
float Rim_Intensity,
sampler2D Texture,
out vec4 Result)
{vec3 R=reflect(Incident,Normal);float RdotF=dot(R,Front);float RdotL=sqrt(1.0-RdotF*RdotF);vec2 UV=vec2(R.y*0.5+0.5,0.5);vec4 Color=texture(Texture,UV);Result=Color;}
void main()
{vec4 Blob_Color_Q30;
#if BLOB_ENABLE
Blob_Fragment_B30(_Blob_Texture_,vExtra2,vExtra3,Blob_Color_Q30);
#else
Blob_Color_Q30=vec4(0,0,0,0);
#endif
vec3 Incident_Q39=normalize(vPosition-cameraPosition);vec3 Normalized_Q38=normalize(vNormal);vec3 Normalized_Q71=normalize(vTangent);vec4 Color_Q83;
#if DECAL_ENABLE
Color_Q83=texture(_Decal_,vUV);
#else
Color_Q83=vec4(0,0,0,0);
#endif
float X_Q90;float Y_Q90;float Z_Q90;float W_Q90;X_Q90=vExtra1.x;Y_Q90=vExtra1.y;Z_Q90=vExtra1.z;W_Q90=vExtra1.w;vec4 Linear_Q43;Linear_Q43.rgb=clamp(_Sky_Color_.rgb*_Sky_Color_.rgb,0.0,1.0);Linear_Q43.a=_Sky_Color_.a;vec4 Linear_Q44;Linear_Q44.rgb=clamp(_Horizon_Color_.rgb*_Horizon_Color_.rgb,0.0,1.0);Linear_Q44.a=_Horizon_Color_.a;vec4 Linear_Q45;Linear_Q45.rgb=clamp(_Ground_Color_.rgb*_Ground_Color_.rgb,0.0,1.0);Linear_Q45.a=_Ground_Color_.a;vec3 Left_Index_Q64;vec3 Right_Index_Q64;vec3 Left_Index_Middle_Q64;vec3 Right_Index_Middle_Q64;Finger_Positions_B64(_Left_Index_Pos_,_Right_Index_Pos_,_Left_Index_Middle_Pos_,_Right_Index_Middle_Pos_,Left_Index_Q64,Right_Index_Q64,Left_Index_Middle_Q64,Right_Index_Middle_Q64);vec4 Linear_Q46;Linear_Q46.rgb=clamp(_Albedo_.rgb*_Albedo_.rgb,0.0,1.0);Linear_Q46.a=_Albedo_.a;vec3 Normalized_Q107=normalize(vBinormal);vec3 Incident_Q70=normalize(vPosition-cameraPosition);vec3 New_Normal_Q79;Bulge_B79(_Bulge_Enabled_,Normalized_Q38,Normalized_Q71,_Bulge_Height_,vColor,_Bulge_Radius_,vBinormal,New_Normal_Q79);float Result_Q77;SSS_B77(vBinormal,New_Normal_Q79,Incident_Q39,Result_Q77);vec4 Result_Q91;Scale_Color_B91(Color_Q83,X_Q90,Result_Q91);float Transmit_Q122;float Reflect_Q122;Fast_Fresnel_B122(_Front_Reflect_,_Edge_Reflect_,_Power_,New_Normal_Q79,Incident_Q39,Transmit_Q122,Reflect_Q122);float Product_Q125=Y_Q90*Y_Q90;vec3 NearP_Q65;vec3 NearQ_Q65;float Distance_Q65;Min_Segment_Distance_B65(Left_Index_Q64,Left_Index_Middle_Q64,vPosition,cameraPosition,NearP_Q65,NearQ_Q65,Distance_Q65);vec3 NearP_Q63;vec3 NearQ_Q63;float Distance_Q63;Min_Segment_Distance_B65(Right_Index_Q64,Right_Index_Middle_Q64,vPosition,cameraPosition,NearP_Q63,NearQ_Q63,Distance_Q63);vec3 Reflected_Q47=reflect(Incident_Q39,New_Normal_Q79);vec4 Product_Q103=Linear_Q46*vec4(1,1,1,1);vec4 Result_Q132;Rim_Light_B132(Normalized_Q107,Normalized_Q38,Incident_Q70,_Rim_Intensity_,_Rim_Texture_,Result_Q132);float Dot_Q72=dot(Incident_Q70, Normalized_Q71);float MaxAB_Q123=max(Reflect_Q122,Product_Q125);float NotInShadow_Q67;
#if OCCLUSION_ENABLED
FingerOcclusion_B67(_Width_,Distance_Q65,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q65,_Clip_Fade_,NotInShadow_Q67);
#else
NotInShadow_Q67=1.0;
#endif
float NotInShadow_Q68;
#if OCCLUSION_ENABLED
FingerOcclusion_B68(_Width_,Distance_Q63,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q63,_Clip_Fade_,NotInShadow_Q68);
#else
NotInShadow_Q68=1.0;
#endif
vec4 Reflected_Color_Q51;vec4 Indirect_Diffuse_Q51;
#if ENV_ENABLE
Mapped_Environment_B51(_Reflection_Map_,_Indirect_Environment_,Reflected_Q47,Reflected_Color_Q51,Indirect_Diffuse_Q51);
#else
Reflected_Color_Q51=vec4(0,0,0,1);Indirect_Diffuse_Q51=vec4(0,0,0,1);
#endif
vec4 Reflected_Color_Q50;vec4 Indirect_Color_Q50;
#if SKY_ENABLED
Sky_Environment_B50(New_Normal_Q79,Reflected_Q47,Linear_Q43,Linear_Q44,Linear_Q45,_Horizon_Power_,Reflected_Color_Q50,Indirect_Color_Q50);
#else
Reflected_Color_Q50=vec4(0,0,0,1);Indirect_Color_Q50=vec4(0,0,0,1);
#endif
float Hue_Q75;float Saturation_Q75;float Value_Q75;float Alpha_Q75;vec3 HSV_Q75;To_HSV_B75(Product_Q103,Hue_Q75,Saturation_Q75,Value_Q75,Alpha_Q75,HSV_Q75);float Hue_Q127;float Saturation_Q127;float Value_Q127;float Alpha_Q127;vec3 HSV_Q127;To_HSV_B75(Result_Q132,Hue_Q127,Saturation_Q127,Value_Q127,Alpha_Q127,HSV_Q127);float Result_Q110;Code_B110(Dot_Q72,Result_Q110);float AbsA_Q76=abs(Result_Q110);float MinAB_Q58=min(NotInShadow_Q67,NotInShadow_Q68);vec4 Sum_Q48=Reflected_Color_Q51+Reflected_Color_Q50;vec4 Sum_Q49=Indirect_Diffuse_Q51+Indirect_Color_Q50;vec3 HSV_Out_Q126;VaryHSV_B108(HSV_Q127,_Rim_Hue_Shift_,_Rim_Saturation_Shift_,_Rim_Value_Shift_,HSV_Out_Q126);float Out_Q114;Remap_Range_B114(-1.0,1.0,0.0,1.0,Result_Q110,Out_Q114);float Product_Q106;Product_Q106=AbsA_Q76*_Hue_Shift_;float X_Q128;float Y_Q128;float Z_Q128;To_XYZ_B74(HSV_Out_Q126,X_Q128,Y_Q128,Z_Q128);vec2 Vec2_Q112=vec2(Out_Q114,0.5);vec3 HSV_Out_Q108;VaryHSV_B108(HSV_Q75,Product_Q106,_Saturation_Shift_,_Value_Shift_,HSV_Out_Q108);vec4 Color_Q129;From_HSV_B73(X_Q128,Y_Q128,Z_Q128,0.0,Color_Q129);vec4 Color_Q111;
#if IRIDESCENCE_ENABLED
Color_Q111=texture(_Iridescence_Texture_,Vec2_Q112);
#else
Color_Q111=vec4(0,0,0,0);
#endif
float X_Q74;float Y_Q74;float Z_Q74;To_XYZ_B74(HSV_Out_Q108,X_Q74,Y_Q74,Z_Q74);vec4 Result_Q131=_Rim_Intensity_*Color_Q129;vec4 Result_Q113=_Iridescence_Intensity_*Color_Q111;vec4 Color_Q73;From_HSV_B73(X_Q74,Y_Q74,Z_Q74,0.0,Color_Q73);vec4 Result_Q84=Result_Q91+(1.0-Result_Q91.a)*Color_Q73;vec4 Result_Q121;Fragment_Main_B121(_Sun_Intensity_,_Sun_Theta_,_Sun_Phi_,New_Normal_Q79,Result_Q84,MaxAB_Q123,_Shininess_,Incident_Q39,_Horizon_Color_,_Sky_Color_,_Ground_Color_,_Indirect_Diffuse_,_Specular_,_Horizon_Power_,_Reflection_,Sum_Q48,Sum_Q49,_Sharpness_,Result_Q77,_Subsurface_,vec4(0,0,0,0),Result_Q131,Result_Q113,Result_Q121);vec4 Result_Q59;Scale_RGB_B59(Result_Q121,MinAB_Q58,Result_Q59);vec4 sRGB_Q42;FastLinearTosRGB_B42(Result_Q59,sRGB_Q42);vec4 Result_Q31=Blob_Color_Q30+(1.0-Blob_Color_Q30.a)*sRGB_Q42;vec4 Result_Q40=Result_Q31; Result_Q40.a=1.0;vec4 Out_Color=Result_Q40;float Clip_Threshold=0.001;bool To_sRGB=false;gl_FragColor=Out_Color;}`;
ShaderStore.ShadersStore[name10] = shader9;

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlSliderBar.vertex.js
var name11 = "mrdlSliderBarVertexShader";
var shader10 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;uniform float _Bevel_Front_;uniform float _Bevel_Front_Stretch_;uniform float _Bevel_Back_;uniform float _Bevel_Back_Stretch_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform bool _Bulge_Enabled_;uniform float _Bulge_Height_;uniform float _Bulge_Radius_;uniform float _Sun_Intensity_;uniform float _Sun_Theta_;uniform float _Sun_Phi_;uniform float _Indirect_Diffuse_;uniform vec4 _Albedo_;uniform float _Specular_;uniform float _Shininess_;uniform float _Sharpness_;uniform float _Subsurface_;uniform vec4 _Left_Color_;uniform vec4 _Right_Color_;uniform float _Reflection_;uniform float _Front_Reflect_;uniform float _Edge_Reflect_;uniform float _Power_;uniform vec4 _Sky_Color_;uniform vec4 _Horizon_Color_;uniform vec4 _Ground_Color_;uniform float _Horizon_Power_;uniform sampler2D _Reflection_Map_;uniform sampler2D _Indirect_Environment_;uniform float _Width_;uniform float _Fuzz_;uniform float _Min_Fuzz_;uniform float _Clip_Fade_;uniform float _Hue_Shift_;uniform float _Saturation_Shift_;uniform float _Value_Shift_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform vec3 _Left_Index_Pos_;uniform vec3 _Right_Index_Pos_;uniform vec3 _Left_Index_Middle_Pos_;uniform vec3 _Right_Index_Middle_Pos_;uniform sampler2D _Decal_;uniform vec2 _Decal_Scale_XY_;uniform bool _Decal_Front_Only_;uniform float _Rim_Intensity_;uniform sampler2D _Rim_Texture_;uniform float _Rim_Hue_Shift_;uniform float _Rim_Saturation_Shift_;uniform float _Rim_Value_Shift_;uniform float _Iridescence_Intensity_;uniform sampler2D _Iridescence_Texture_;uniform bool Use_Global_Left_Index;uniform bool Use_Global_Right_Index;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;uniform vec4 Global_Left_Thumb_Tip_Position;uniform vec4 Global_Right_Thumb_Tip_Position;uniform float Global_Left_Index_Tip_Proximity;uniform float Global_Right_Index_Tip_Proximity;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;void Object_To_World_Pos_B12(
vec3 Pos_Object,
out vec3 Pos_World)
{Pos_World=(world*vec4(Pos_Object,1.0)).xyz;}
void Object_To_World_Normal_B32(
vec3 Nrm_Object,
out vec3 Nrm_World)
{Nrm_World=(vec4(Nrm_Object,0.0)).xyz;}
void Blob_Vertex_B23(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{vec3 blob= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Blob_Position);vec3 delta=blob-Position;float dist=dot(Normal,delta);float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);float Fade=fadeValue*Intensity*Blob_Fade;float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);}
void Blob_Vertex_B24(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{vec3 blob= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Blob_Position);vec3 delta=blob-Position;float dist=dot(Normal,delta);float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);float Fade=fadeValue*Intensity*Blob_Fade;float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);}
void Move_Verts_B130(
float Anisotropy,
vec3 P,
float Radius,
float Bevel,
vec3 Normal_Object,
float ScaleZ,
float Stretch,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir,
out vec3 New_Normal)
{vec2 UV=P.xy*2.0+0.5;vec2 center=clamp(UV,0.0,1.0);vec2 delta=UV-center;float deltad=(length(delta)*2.0);float f=(Bevel+(Radius-Bevel)*Stretch)/Radius;float innerd=clamp(deltad*2.0,0.0,1.0);float outerd=clamp(deltad*2.0-1.0,0.0,1.0);float bevelAngle=outerd*3.14159*0.5;float sinb=sin(bevelAngle);float cosb=cos(bevelAngle);float beveld=(1.0-f)*innerd+f*sinb;float br=outerd;vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);float dir=P.z<0.0001 ? 1.0 : -1.0;New_UV=center+r2*((0.5-center)+normalize(delta+vec2(0.0,0.000001))*beveld*0.5);New_P=vec3(New_UV-0.5,P.z+dir*(1.0-cosb)*Bevel*ScaleZ);Radial_Gradient=clamp((deltad-0.5)*2.0,0.0,1.0);Radial_Dir=vec3(delta*r2,0.0);vec3 beveledNormal=cosb*Normal_Object+sinb*vec3(delta.x,delta.y,0.0);New_Normal=Normal_Object.z==0.0 ? Normal_Object : beveledNormal;}
void Object_To_World_Dir_B60(
vec3 Dir_Object,
out vec3 Normal_World,
out vec3 Normal_World_N,
out float Normal_Length)
{Normal_World=(world*vec4(Dir_Object,0.0)).xyz;Normal_Length=length(Normal_World);Normal_World_N=Normal_World/Normal_Length;}
void To_XYZ_B78(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{X=Vec3.x;Y=Vec3.y;Z=Vec3.z;}
void Conditional_Float_B93(
bool Which,
float If_True,
float If_False,
out float Result)
{Result=Which ? If_True : If_False;}
void Object_To_World_Dir_B28(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;Binormal_Length=length(Binormal_World);Binormal_World_N=Binormal_World/Binormal_Length;}
void Pick_Radius_B69(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{bool whichY=Position.y>0.0;Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);Result*=Radius;}
void Conditional_Float_B36(
bool Which,
float If_True,
float If_False,
out float Result)
{Result=Which ? If_True : If_False;}
void Greater_Than_B37(
float Left,
float Right,
out bool Not_Greater_Than,
out bool Greater_Than)
{Greater_Than=Left>Right;Not_Greater_Than=!Greater_Than;}
void Remap_Range_B105(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));}
void main()
{vec2 XY_Q85;XY_Q85=(uv-vec2(0.5,0.5))*_Decal_Scale_XY_+vec2(0.5,0.5);vec3 Tangent_World_Q27;vec3 Tangent_World_N_Q27;float Tangent_Length_Q27;Tangent_World_Q27=(world*vec4(vec3(1,0,0),0.0)).xyz;Tangent_Length_Q27=length(Tangent_World_Q27);Tangent_World_N_Q27=Tangent_World_Q27/Tangent_Length_Q27;vec3 Normal_World_Q60;vec3 Normal_World_N_Q60;float Normal_Length_Q60;Object_To_World_Dir_B60(vec3(0,0,1),Normal_World_Q60,Normal_World_N_Q60,Normal_Length_Q60);float X_Q78;float Y_Q78;float Z_Q78;To_XYZ_B78(position,X_Q78,Y_Q78,Z_Q78);vec3 Nrm_World_Q26;Nrm_World_Q26=normalize((world*vec4(normal,0.0)).xyz);vec3 Binormal_World_Q28;vec3 Binormal_World_N_Q28;float Binormal_Length_Q28;Object_To_World_Dir_B28(vec3(0,1,0),Binormal_World_Q28,Binormal_World_N_Q28,Binormal_Length_Q28);float Anisotropy_Q29=Tangent_Length_Q27/Binormal_Length_Q28;float Result_Q69;Pick_Radius_B69(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q69);float Anisotropy_Q53=Binormal_Length_Q28/Normal_Length_Q60;bool Not_Greater_Than_Q37;bool Greater_Than_Q37;Greater_Than_B37(Z_Q78,0.0,Not_Greater_Than_Q37,Greater_Than_Q37);vec4 Linear_Q101;Linear_Q101.rgb=clamp(_Left_Color_.rgb*_Left_Color_.rgb,0.0,1.0);Linear_Q101.a=_Left_Color_.a;vec4 Linear_Q102;Linear_Q102.rgb=clamp(_Right_Color_.rgb*_Right_Color_.rgb,0.0,1.0);Linear_Q102.a=_Right_Color_.a;vec3 Difference_Q61=vec3(0,0,0)-Normal_World_N_Q60;vec4 Out_Color_Q34=vec4(X_Q78,Y_Q78,Z_Q78,1);float Result_Q36;Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_,_Bevel_Front_,Result_Q36);float Result_Q94;Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_Stretch_,_Bevel_Front_Stretch_,Result_Q94);vec3 New_P_Q130;vec2 New_UV_Q130;float Radial_Gradient_Q130;vec3 Radial_Dir_Q130;vec3 New_Normal_Q130;Move_Verts_B130(Anisotropy_Q29,position,Result_Q69,Result_Q36,normal,Anisotropy_Q53,Result_Q94,New_P_Q130,New_UV_Q130,Radial_Gradient_Q130,Radial_Dir_Q130,New_Normal_Q130);float X_Q98;float Y_Q98;X_Q98=New_UV_Q130.x;Y_Q98=New_UV_Q130.y;vec3 Pos_World_Q12;Object_To_World_Pos_B12(New_P_Q130,Pos_World_Q12);vec3 Nrm_World_Q32;Object_To_World_Normal_B32(New_Normal_Q130,Nrm_World_Q32);vec4 Blob_Info_Q23;
#if BLOB_ENABLE
Blob_Vertex_B23(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q23);
#else
Blob_Info_Q23=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q24;
#if BLOB_ENABLE_2
Blob_Vertex_B24(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_2_,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q24);
#else
Blob_Info_Q24=vec4(0,0,0,0);
#endif
float Out_Q105;Remap_Range_B105(0.0,1.0,0.0,1.0,X_Q98,Out_Q105);float X_Q86;float Y_Q86;float Z_Q86;To_XYZ_B78(Nrm_World_Q32,X_Q86,Y_Q86,Z_Q86);vec4 Color_At_T_Q97=mix(Linear_Q101,Linear_Q102,Out_Q105);float Minus_F_Q87=-Z_Q86;float R_Q99;float G_Q99;float B_Q99;float A_Q99;R_Q99=Color_At_T_Q97.r; G_Q99=Color_At_T_Q97.g; B_Q99=Color_At_T_Q97.b; A_Q99=Color_At_T_Q97.a;float ClampF_Q88=clamp(0.0,Minus_F_Q87,1.0);float Result_Q93;Conditional_Float_B93(_Decal_Front_Only_,ClampF_Q88,1.0,Result_Q93);vec4 Vec4_Q89=vec4(Result_Q93,Radial_Gradient_Q130,G_Q99,B_Q99);vec3 Position=Pos_World_Q12;vec3 Normal=Nrm_World_Q32;vec2 UV=XY_Q85;vec3 Tangent=Tangent_World_N_Q27;vec3 Binormal=Difference_Q61;vec4 Color=Out_Color_Q34;vec4 Extra1=Vec4_Q89;vec4 Extra2=Blob_Info_Q23;vec4 Extra3=Blob_Info_Q24;gl_Position=viewProjection*vec4(Position,1);vPosition=Position;vNormal=Normal;vUV=UV;vTangent=Tangent;vBinormal=Binormal;vColor=Color;vExtra1=Extra1;vExtra2=Extra2;vExtra3=Extra3;}`;
ShaderStore.ShadersStore[name11] = shader10;

// node_modules/@babylonjs/gui/3D/materials/mrdl/mrdlSliderBarMaterial.js
var MRDLSliderBarMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this.SKY_ENABLED = true;
    this.BLOB_ENABLE_2 = true;
    this.IRIDESCENCE_ENABLED = true;
    this._needNormals = true;
    this._needUVs = true;
    this.rebuild();
  }
};
var MRDLSliderBarMaterial = class _MRDLSliderBarMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.radius = 0.6;
    this.bevelFront = 0.6;
    this.bevelFrontStretch = 0.077;
    this.bevelBack = 0;
    this.bevelBackStretch = 0;
    this.radiusTopLeft = 1;
    this.radiusTopRight = 1;
    this.radiusBottomLeft = 1;
    this.radiusBottomRight = 1;
    this.bulgeEnabled = false;
    this.bulgeHeight = -0.323;
    this.bulgeRadius = 0.73;
    this.sunIntensity = 1.102;
    this.sunTheta = 0.76;
    this.sunPhi = 0.526;
    this.indirectDiffuse = 0.658;
    this.albedo = new Color4(0.0117647, 0.505882, 0.996078, 1);
    this.specular = 0;
    this.shininess = 10;
    this.sharpness = 0;
    this.subsurface = 0;
    this.leftGradientColor = new Color4(0.0117647, 0.505882, 0.996078, 1);
    this.rightGradientColor = new Color4(0.0117647, 0.505882, 0.996078, 1);
    this.reflection = 0.749;
    this.frontReflect = 0;
    this.edgeReflect = 0.09;
    this.power = 8.13;
    this.skyColor = new Color4(0.0117647, 0.964706, 0.996078, 1);
    this.horizonColor = new Color4(0.0117647, 0.333333, 0.996078, 1);
    this.groundColor = new Color4(0, 0.254902, 0.996078, 1);
    this.horizonPower = 1;
    this.width = 0.02;
    this.fuzz = 0.5;
    this.minFuzz = 1e-3;
    this.clipFade = 0.01;
    this.hueShift = 0;
    this.saturationShift = 0;
    this.valueShift = 0;
    this.blobPosition = new Vector3(0, 0, 0.1);
    this.blobIntensity = 0.5;
    this.blobNearSize = 0.01;
    this.blobFarSize = 0.03;
    this.blobNearDistance = 0;
    this.blobFarDistance = 0.08;
    this.blobFadeLength = 0.576;
    this.blobPulse = 0;
    this.blobFade = 1;
    this.blobPosition2 = new Vector3(0.2, 0, 0.1);
    this.blobNearSize2 = 0.01;
    this.blobPulse2 = 0;
    this.blobFade2 = 1;
    this.blobTexture = new Texture("", this.getScene());
    this.leftIndexPosition = new Vector3(0, 0, 1);
    this.rightIndexPosition = new Vector3(-1, -1, -1);
    this.leftIndexMiddlePosition = new Vector3(0, 0, 0);
    this.rightIndexMiddlePosition = new Vector3(0, 0, 0);
    this.decalScaleXY = new Vector2(1.5, 1.5);
    this.decalFrontOnly = true;
    this.rimIntensity = 0.287;
    this.rimHueShift = 0;
    this.rimSaturationShift = 0;
    this.rimValueShift = -1;
    this.iridescenceIntensity = 0;
    this.useGlobalLeftIndex = 1;
    this.useGlobalRightIndex = 1;
    this.globalLeftIndexTipProximity = 0;
    this.globalRightIndexTipProximity = 0;
    this.globalLeftIndexTipPosition = new Vector4(0.5, 0, -0.55, 1);
    this.globaRightIndexTipPosition = new Vector4(0, 0, 0, 1);
    this.globalLeftThumbTipPosition = new Vector4(0.5, 0, -0.55, 1);
    this.globalRightThumbTipPosition = new Vector4(0, 0, 0, 1);
    this.globalLeftIndexMiddlePosition = new Vector4(0.5, 0, -0.55, 1);
    this.globalRightIndexMiddlePosition = new Vector4(0, 0, 0, 1);
    this.alphaMode = Constants.ALPHA_DISABLE;
    this.backFaceCulling = false;
    this._blueGradientTexture = new Texture(_MRDLSliderBarMaterial.BLUE_GRADIENT_TEXTURE_URL, this.getScene(), true, false, Texture.NEAREST_SAMPLINGMODE);
    this._decalTexture = new Texture("", this.getScene());
    this._reflectionMapTexture = new Texture("", this.getScene());
    this._indirectEnvTexture = new Texture("", this.getScene());
  }
  needAlphaBlending() {
    return false;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  // Methods
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new MRDLSliderBarMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, false, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "mrdlSliderBar";
      const join = defines.toString();
      const uniforms = [
        "world",
        "viewProjection",
        "cameraPosition",
        "_Radius_",
        "_Bevel_Front_",
        "_Bevel_Front_Stretch_",
        "_Bevel_Back_",
        "_Bevel_Back_Stretch_",
        "_Radius_Top_Left_",
        "_Radius_Top_Right_",
        "_Radius_Bottom_Left_",
        "_Radius_Bottom_Right_",
        "_Bulge_Enabled_",
        "_Bulge_Height_",
        "_Bulge_Radius_",
        "_Sun_Intensity_",
        "_Sun_Theta_",
        "_Sun_Phi_",
        "_Indirect_Diffuse_",
        "_Albedo_",
        "_Specular_",
        "_Shininess_",
        "_Sharpness_",
        "_Subsurface_",
        "_Left_Color_",
        "_Right_Color_",
        "_Reflection_",
        "_Front_Reflect_",
        "_Edge_Reflect_",
        "_Power_",
        "_Sky_Color_",
        "_Horizon_Color_",
        "_Ground_Color_",
        "_Horizon_Power_",
        "_Reflection_Map_",
        "_Indirect_Environment_",
        "_Width_",
        "_Fuzz_",
        "_Min_Fuzz_",
        "_Clip_Fade_",
        "_Hue_Shift_",
        "_Saturation_Shift_",
        "_Value_Shift_",
        "_Blob_Position_",
        "_Blob_Intensity_",
        "_Blob_Near_Size_",
        "_Blob_Far_Size_",
        "_Blob_Near_Distance_",
        "_Blob_Far_Distance_",
        "_Blob_Fade_Length_",
        "_Blob_Pulse_",
        "_Blob_Fade_",
        "_Blob_Texture_",
        "_Blob_Position_2_",
        "_Blob_Near_Size_2_",
        "_Blob_Pulse_2_",
        "_Blob_Fade_2_",
        "_Left_Index_Pos_",
        "_Right_Index_Pos_",
        "_Left_Index_Middle_Pos_",
        "_Right_Index_Middle_Pos_",
        "_Decal_",
        "_Decal_Scale_XY_",
        "_Decal_Front_Only_",
        "_Rim_Intensity_",
        "_Rim_Texture_",
        "_Rim_Hue_Shift_",
        "_Rim_Saturation_Shift_",
        "_Rim_Value_Shift_",
        "_Iridescence_Intensity_",
        "_Iridescence_Texture_",
        "Use_Global_Left_Index",
        "Use_Global_Right_Index",
        "Global_Left_Index_Tip_Position",
        "Global_Right_Index_Tip_Position",
        "Global_Left_Thumb_Tip_Position",
        "Global_Right_Thumb_Tip_Position",
        "Global_Left_Index_Middle_Position;",
        "Global_Right_Index_Middle_Position",
        "Global_Left_Index_Tip_Proximity",
        "Global_Right_Index_Tip_Proximity"
      ];
      const samplers = ["_Rim_Texture_", "_Iridescence_Texture_"];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines, this._materialContext);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
    const defines = subMesh.materialDefines;
    if (!defines) {
      return;
    }
    const effect = subMesh.effect;
    if (!effect) {
      return;
    }
    this._activeEffect = effect;
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", this.getScene().getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", this.getScene().activeCamera.position);
    this._activeEffect.setFloat("_Radius_", this.radius);
    this._activeEffect.setFloat("_Bevel_Front_", this.bevelFront);
    this._activeEffect.setFloat("_Bevel_Front_Stretch_", this.bevelFrontStretch);
    this._activeEffect.setFloat("_Bevel_Back_", this.bevelBack);
    this._activeEffect.setFloat("_Bevel_Back_Stretch_", this.bevelBackStretch);
    this._activeEffect.setFloat("_Radius_Top_Left_", this.radiusTopLeft);
    this._activeEffect.setFloat("_Radius_Top_Right_", this.radiusTopRight);
    this._activeEffect.setFloat("_Radius_Bottom_Left_", this.radiusBottomLeft);
    this._activeEffect.setFloat("_Radius_Bottom_Right_", this.radiusBottomRight);
    this._activeEffect.setFloat("_Bulge_Enabled_", this.bulgeEnabled ? 1 : 0);
    this._activeEffect.setFloat("_Bulge_Height_", this.bulgeHeight);
    this._activeEffect.setFloat("_Bulge_Radius_", this.bulgeRadius);
    this._activeEffect.setFloat("_Sun_Intensity_", this.sunIntensity);
    this._activeEffect.setFloat("_Sun_Theta_", this.sunTheta);
    this._activeEffect.setFloat("_Sun_Phi_", this.sunPhi);
    this._activeEffect.setFloat("_Indirect_Diffuse_", this.indirectDiffuse);
    this._activeEffect.setDirectColor4("_Albedo_", this.albedo);
    this._activeEffect.setFloat("_Specular_", this.specular);
    this._activeEffect.setFloat("_Shininess_", this.shininess);
    this._activeEffect.setFloat("_Sharpness_", this.sharpness);
    this._activeEffect.setFloat("_Subsurface_", this.subsurface);
    this._activeEffect.setDirectColor4("_Left_Color_", this.leftGradientColor);
    this._activeEffect.setDirectColor4("_Right_Color_", this.rightGradientColor);
    this._activeEffect.setFloat("_Reflection_", this.reflection);
    this._activeEffect.setFloat("_Front_Reflect_", this.frontReflect);
    this._activeEffect.setFloat("_Edge_Reflect_", this.edgeReflect);
    this._activeEffect.setFloat("_Power_", this.power);
    this._activeEffect.setDirectColor4("_Sky_Color_", this.skyColor);
    this._activeEffect.setDirectColor4("_Horizon_Color_", this.horizonColor);
    this._activeEffect.setDirectColor4("_Ground_Color_", this.groundColor);
    this._activeEffect.setFloat("_Horizon_Power_", this.horizonPower);
    this._activeEffect.setTexture("_Reflection_Map_", this._reflectionMapTexture);
    this._activeEffect.setTexture("_Indirect_Environment_", this._indirectEnvTexture);
    this._activeEffect.setFloat("_Width_", this.width);
    this._activeEffect.setFloat("_Fuzz_", this.fuzz);
    this._activeEffect.setFloat("_Min_Fuzz_", this.minFuzz);
    this._activeEffect.setFloat("_Clip_Fade_", this.clipFade);
    this._activeEffect.setFloat("_Hue_Shift_", this.hueShift);
    this._activeEffect.setFloat("_Saturation_Shift_", this.saturationShift);
    this._activeEffect.setFloat("_Value_Shift_", this.valueShift);
    this._activeEffect.setVector3("_Blob_Position_", this.blobPosition);
    this._activeEffect.setFloat("_Blob_Intensity_", this.blobIntensity);
    this._activeEffect.setFloat("_Blob_Near_Size_", this.blobNearSize);
    this._activeEffect.setFloat("_Blob_Far_Size_", this.blobFarSize);
    this._activeEffect.setFloat("_Blob_Near_Distance_", this.blobNearDistance);
    this._activeEffect.setFloat("_Blob_Far_Distance_", this.blobFarDistance);
    this._activeEffect.setFloat("_Blob_Fade_Length_", this.blobFadeLength);
    this._activeEffect.setFloat("_Blob_Pulse_", this.blobPulse);
    this._activeEffect.setFloat("_Blob_Fade_", this.blobFade);
    this._activeEffect.setTexture("_Blob_Texture_", this.blobTexture);
    this._activeEffect.setVector3("_Blob_Position_2_", this.blobPosition2);
    this._activeEffect.setFloat("_Blob_Near_Size_2_", this.blobNearSize2);
    this._activeEffect.setFloat("_Blob_Pulse_2_", this.blobPulse2);
    this._activeEffect.setFloat("_Blob_Fade_2_", this.blobFade2);
    this._activeEffect.setVector3("_Left_Index_Pos_", this.leftIndexPosition);
    this._activeEffect.setVector3("_Right_Index_Pos_", this.rightIndexPosition);
    this._activeEffect.setVector3("_Left_Index_Middle_Pos_", this.leftIndexMiddlePosition);
    this._activeEffect.setVector3("_Right_Index_Middle_Pos_", this.rightIndexMiddlePosition);
    this._activeEffect.setTexture("_Decal_", this._decalTexture);
    this._activeEffect.setVector2("_Decal_Scale_XY_", this.decalScaleXY);
    this._activeEffect.setFloat("_Decal_Front_Only_", this.decalFrontOnly ? 1 : 0);
    this._activeEffect.setFloat("_Rim_Intensity_", this.rimIntensity);
    this._activeEffect.setTexture("_Rim_Texture_", this._blueGradientTexture);
    this._activeEffect.setFloat("_Rim_Hue_Shift_", this.rimHueShift);
    this._activeEffect.setFloat("_Rim_Saturation_Shift_", this.rimSaturationShift);
    this._activeEffect.setFloat("_Rim_Value_Shift_", this.rimValueShift);
    this._activeEffect.setFloat("_Iridescence_Intensity_", this.iridescenceIntensity);
    this._activeEffect.setTexture("_Iridescence_Texture_", this._blueGradientTexture);
    this._activeEffect.setFloat("Use_Global_Left_Index", this.useGlobalLeftIndex);
    this._activeEffect.setFloat("Use_Global_Right_Index", this.useGlobalRightIndex);
    this._activeEffect.setVector4("Global_Left_Index_Tip_Position", this.globalLeftIndexTipPosition);
    this._activeEffect.setVector4("Global_Right_Index_Tip_Position", this.globaRightIndexTipPosition);
    this._activeEffect.setVector4("Global_Left_Thumb_Tip_Position", this.globalLeftThumbTipPosition);
    this._activeEffect.setVector4("Global_Right_Thumb_Tip_Position", this.globalRightThumbTipPosition);
    this._activeEffect.setVector4("Global_Left_Index_Middle_Position", this.globalLeftIndexMiddlePosition);
    this._activeEffect.setVector4("Global_Right_Index_Middle_Position", this.globalRightIndexMiddlePosition);
    this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity", this.globalLeftIndexTipProximity);
    this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity", this.globalRightIndexTipProximity);
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
    this._reflectionMapTexture.dispose();
    this._indirectEnvTexture.dispose();
    this._blueGradientTexture.dispose();
    this._decalTexture.dispose();
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _MRDLSliderBarMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = super.serialize();
    serializationObject.customType = "BABYLON.MRDLSliderBarMaterial";
    return serializationObject;
  }
  getClassName() {
    return "MRDLSliderBarMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _MRDLSliderBarMaterial(source.name, scene), source, scene, rootUrl);
  }
};
MRDLSliderBarMaterial.BLUE_GRADIENT_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-blue-gradient.png";
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "radius", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "bevelFront", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "bevelFrontStretch", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "bevelBack", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "bevelBackStretch", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "radiusTopLeft", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "radiusTopRight", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "radiusBottomLeft", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "radiusBottomRight", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "bulgeEnabled", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "bulgeHeight", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "bulgeRadius", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "sunIntensity", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "sunTheta", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "sunPhi", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "indirectDiffuse", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "albedo", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "specular", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "shininess", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "sharpness", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "subsurface", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "leftGradientColor", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "rightGradientColor", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "reflection", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "frontReflect", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "edgeReflect", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "power", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "skyColor", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "horizonColor", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "groundColor", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "horizonPower", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "width", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "fuzz", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "minFuzz", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "clipFade", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "hueShift", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "saturationShift", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "valueShift", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobPosition", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobIntensity", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobNearSize", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobFarSize", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobNearDistance", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobFarDistance", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobFadeLength", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobPulse", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobFade", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobPosition2", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobNearSize2", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobPulse2", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobFade2", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "blobTexture", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "leftIndexPosition", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "rightIndexPosition", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "leftIndexMiddlePosition", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "rightIndexMiddlePosition", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "decalScaleXY", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "decalFrontOnly", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "rimIntensity", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "rimHueShift", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "rimSaturationShift", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "rimValueShift", void 0);
__decorate([
  serialize()
], MRDLSliderBarMaterial.prototype, "iridescenceIntensity", void 0);
RegisterClass("BABYLON.GUI.MRDLSliderBarMaterial", MRDLSliderBarMaterial);

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlSliderThumb.fragment.js
var name12 = "mrdlSliderThumbPixelShader";
var shader11 = `uniform vec3 cameraPosition;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;uniform float _Radius_;uniform float _Bevel_Front_;uniform float _Bevel_Front_Stretch_;uniform float _Bevel_Back_;uniform float _Bevel_Back_Stretch_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform bool _Bulge_Enabled_;uniform float _Bulge_Height_;uniform float _Bulge_Radius_;uniform float _Sun_Intensity_;uniform float _Sun_Theta_;uniform float _Sun_Phi_;uniform float _Indirect_Diffuse_;uniform vec4 _Albedo_;uniform float _Specular_;uniform float _Shininess_;uniform float _Sharpness_;uniform float _Subsurface_;uniform vec4 _Left_Color_;uniform vec4 _Right_Color_;uniform float _Reflection_;uniform float _Front_Reflect_;uniform float _Edge_Reflect_;uniform float _Power_;uniform vec4 _Sky_Color_;uniform vec4 _Horizon_Color_;uniform vec4 _Ground_Color_;uniform float _Horizon_Power_;uniform sampler2D _Reflection_Map_;uniform sampler2D _Indirect_Environment_;uniform float _Width_;uniform float _Fuzz_;uniform float _Min_Fuzz_;uniform float _Clip_Fade_;uniform float _Hue_Shift_;uniform float _Saturation_Shift_;uniform float _Value_Shift_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform vec3 _Left_Index_Pos_;uniform vec3 _Right_Index_Pos_;uniform vec3 _Left_Index_Middle_Pos_;uniform vec3 _Right_Index_Middle_Pos_;uniform sampler2D _Decal_;uniform vec2 _Decal_Scale_XY_;uniform bool _Decal_Front_Only_;uniform float _Rim_Intensity_;uniform sampler2D _Rim_Texture_;uniform float _Rim_Hue_Shift_;uniform float _Rim_Saturation_Shift_;uniform float _Rim_Value_Shift_;uniform float _Iridescence_Intensity_;uniform sampler2D _Iridescence_Texture_;uniform bool Use_Global_Left_Index;uniform bool Use_Global_Right_Index;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;uniform vec4 Global_Left_Thumb_Tip_Position;uniform vec4 Global_Right_Thumb_Tip_Position;uniform vec4 Global_Left_Index_Middle_Position;uniform vec4 Global_Right_Index_Middle_Position;uniform float Global_Left_Index_Tip_Proximity;uniform float Global_Right_Index_Tip_Proximity;void Blob_Fragment_B180(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{float k1=dot(Blob_Info1.xy,Blob_Info1.xy);float k2=dot(Blob_Info2.xy,Blob_Info2.xy);vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);}
void FastLinearTosRGB_B192(
vec4 Linear,
out vec4 sRGB)
{sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));sRGB.a=Linear.a;}
void Scale_RGB_B209(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=vec4(Scalar,Scalar,Scalar,1)*Color;}
void Fragment_Main_B271(
float Sun_Intensity,
float Sun_Theta,
float Sun_Phi,
vec3 Normal,
vec4 Albedo,
float Fresnel_Reflect,
float Shininess,
vec3 Incident,
vec4 Horizon_Color,
vec4 Sky_Color,
vec4 Ground_Color,
float Indirect_Diffuse,
float Specular,
float Horizon_Power,
float Reflection,
vec4 Reflection_Sample,
vec4 Indirect_Sample,
float Sharpness,
float SSS,
float Subsurface,
vec4 Translucence,
vec4 Rim_Light,
vec4 Iridescence,
out vec4 Result)
{float theta=Sun_Theta*2.0*3.14159;float phi=Sun_Phi*3.14159;vec3 lightDir= vec3(cos(phi)*cos(theta),sin(phi),cos(phi)*sin(theta));float NdotL=max(dot(lightDir,Normal),0.0);vec3 R=reflect(Incident,Normal);float RdotL=max(0.0,dot(R,lightDir));float specular=pow(RdotL,Shininess);specular=mix(specular,smoothstep(0.495*Sharpness,1.0-0.495*Sharpness,specular),Sharpness);vec4 gi=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);Result=((Sun_Intensity*NdotL+Indirect_Sample*Indirect_Diffuse+Translucence)*(1.0+SSS*Subsurface))*Albedo*(1.0-Fresnel_Reflect)+(Sun_Intensity*specular*Specular+Fresnel_Reflect*Reflection*Reflection_Sample)+Fresnel_Reflect*Rim_Light+Iridescence;}
void Bulge_B229(
bool Enabled,
vec3 Normal,
vec3 Tangent,
float Bulge_Height,
vec4 UV,
float Bulge_Radius,
vec3 ButtonN,
out vec3 New_Normal)
{vec2 xy=clamp(UV.xy*2.0,vec2(-1,-1),vec2(1,1));vec3 B=(cross(Normal,Tangent));float k=-clamp(1.0-length(xy)/Bulge_Radius,0.0,1.0)*Bulge_Height;k=sin(k*3.14159*0.5);k*=smoothstep(0.9998,0.9999,abs(dot(ButtonN,Normal)));New_Normal=Normal*sqrt(1.0-k*k)+(xy.x*Tangent+xy.y*B)*k;New_Normal=Enabled ? New_Normal : Normal;}
void SSS_B227(
vec3 ButtonN,
vec3 Normal,
vec3 Incident,
out float Result)
{float NdotI=abs(dot(Normal,Incident));float BdotI=abs(dot(ButtonN,Incident));Result=(abs(NdotI-BdotI)); }
void FingerOcclusion_B217(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{float d=dot((Nearest-Position),Forward);float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);}
void FingerOcclusion_B218(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{float d=dot((Nearest-Position),Forward);float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);}
void Scale_Color_B241(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=Scalar*Color;}
void From_HSV_B223(
float Hue,
float Saturation,
float Value,
float Alpha,
out vec4 Color)
{vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(vec3(Hue,Hue,Hue)+K.xyz)*6.0-K.www);Color.rgb=Value*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),Saturation);Color.a=Alpha;}
void Fast_Fresnel_B272(
float Front_Reflect,
float Edge_Reflect,
float Power,
vec3 Normal,
vec3 Incident,
out float Transmit,
out float Reflect)
{float d=max(-dot(Incident,Normal),0.0);Reflect=Front_Reflect+(Edge_Reflect-Front_Reflect)*pow(1.0-d,Power);Transmit=1.0-Reflect;}
void Mapped_Environment_B201(
sampler2D Reflected_Environment,
sampler2D Indirect_Environment,
vec3 Dir,
out vec4 Reflected_Color,
out vec4 Indirect_Diffuse)
{Reflected_Color=texture(Reflected_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));Indirect_Diffuse=texture(Indirect_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));}
vec4 SampleEnv_Bid200(vec3 D,vec4 S,vec4 H,vec4 G,float exponent)
{float k=pow(abs(D.y),exponent);vec4 C;if (D.y>0.0) {C=mix(H,S,k);} else {C=mix(H,G,k); }
return C;}
void Sky_Environment_B200(
vec3 Normal,
vec3 Reflected,
vec4 Sky_Color,
vec4 Horizon_Color,
vec4 Ground_Color,
float Horizon_Power,
out vec4 Reflected_Color,
out vec4 Indirect_Color)
{Reflected_Color=SampleEnv_Bid200(Reflected,Sky_Color,Horizon_Color,Ground_Color,Horizon_Power);Indirect_Color=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);}
void Min_Segment_Distance_B215(
vec3 P0,
vec3 P1,
vec3 Q0,
vec3 Q1,
out vec3 NearP,
out vec3 NearQ,
out float Distance)
{vec3 u=P1-P0;vec3 v=Q1-Q0;vec3 w=P0-Q0;float a=dot(u,u);float b=dot(u,v);float c=dot(v,v);float d=dot(u,w);float e=dot(v,w);float D=a*c-b*b;float sD=D;float tD=D;float sc,sN,tc,tN;if (D<0.00001) {sN=0.0;sD=1.0;tN=e;tD=c;} else {sN=(b*e-c*d);tN=(a*e-b*d);if (sN<0.0) {sN=0.0;tN=e;tD=c;} else if (sN>sD) {sN=sD;tN=e+b;tD=c;}}
if (tN<0.0) {tN=0.0;if (-d<0.0) {sN=0.0;} else if (-d>a) {sN=sD;} else {sN=-d;sD=a;}} else if (tN>tD) {tN=tD;if ((-d+b)<0.0) {sN=0.0;} else if ((-d+b)>a) {sN=sD;} else {sN=(-d+b);sD=a;}}
sc=abs(sN)<0.000001 ? 0.0 : sN/sD;tc=abs(tN)<0.000001 ? 0.0 : tN/tD;NearP=P0+sc*u;NearQ=Q0+tc*v;Distance=distance(NearP,NearQ);}
void To_XYZ_B224(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{X=Vec3.x;Y=Vec3.y;Z=Vec3.z;}
void Finger_Positions_B214(
vec3 Left_Index_Pos,
vec3 Right_Index_Pos,
vec3 Left_Index_Middle_Pos,
vec3 Right_Index_Middle_Pos,
out vec3 Left_Index,
out vec3 Right_Index,
out vec3 Left_Index_Middle,
out vec3 Right_Index_Middle)
{Left_Index= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Left_Index_Pos);Right_Index= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Right_Index_Pos);Left_Index_Middle= (Use_Global_Left_Index ? Global_Left_Index_Middle_Position.xyz : Left_Index_Middle_Pos);Right_Index_Middle= (Use_Global_Right_Index ? Global_Right_Index_Middle_Position.xyz : Right_Index_Middle_Pos);}
void VaryHSV_B258(
vec3 HSV_In,
float Hue_Shift,
float Saturation_Shift,
float Value_Shift,
out vec3 HSV_Out)
{HSV_Out=vec3(fract(HSV_In.x+Hue_Shift),clamp(HSV_In.y+Saturation_Shift,0.0,1.0),clamp(HSV_In.z+Value_Shift,0.0,1.0));}
void Remap_Range_B264(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));}
void To_HSV_B225(
vec4 Color,
out float Hue,
out float Saturation,
out float Value,
out float Alpha,
out vec3 HSV)
{vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=Color.g<Color.b ? vec4(Color.bg,K.wz) : vec4(Color.gb,K.xy);vec4 q=Color.r<p.x ? vec4(p.xyw,Color.r) : vec4(Color.r,p.yzx);float d=q.x-min(q.w,q.y);float e=1.0e-10;Hue=abs(q.z+(q.w-q.y)/(6.0*d+e));Saturation=d/(q.x+e);Value=q.x;Alpha=Color.a;HSV=vec3(Hue,Saturation,Value);}
void Code_B260(
float X,
out float Result)
{Result=(acos(X)/3.14159-0.5)*2.0;}
void Rim_Light_B282(
vec3 Front,
vec3 Normal,
vec3 Incident,
float Rim_Intensity,
sampler2D Texture,
out vec4 Result)
{vec3 R=reflect(Incident,Normal);float RdotF=dot(R,Front);float RdotL=sqrt(1.0-RdotF*RdotF);vec2 UV=vec2(R.y*0.5+0.5,0.5);vec4 Color=texture(Texture,UV);Result=Color;}
void main()
{vec4 Blob_Color_Q180;
#if BLOB_ENABLE
Blob_Fragment_B180(_Blob_Texture_,vExtra2,vExtra3,Blob_Color_Q180);
#else
Blob_Color_Q180=vec4(0,0,0,0);
#endif
vec3 Incident_Q189=normalize(vPosition-cameraPosition);vec3 Normalized_Q188=normalize(vNormal);vec3 Normalized_Q221=normalize(vTangent);vec4 Color_Q233;
#if DECAL_ENABLE
Color_Q233=texture(_Decal_,vUV);
#else
Color_Q233=vec4(0,0,0,0);
#endif
float X_Q240;float Y_Q240;float Z_Q240;float W_Q240;X_Q240=vExtra1.x;Y_Q240=vExtra1.y;Z_Q240=vExtra1.z;W_Q240=vExtra1.w;vec4 Linear_Q193;Linear_Q193.rgb=clamp(_Sky_Color_.rgb*_Sky_Color_.rgb,0.0,1.0);Linear_Q193.a=_Sky_Color_.a;vec4 Linear_Q194;Linear_Q194.rgb=clamp(_Horizon_Color_.rgb*_Horizon_Color_.rgb,0.0,1.0);Linear_Q194.a=_Horizon_Color_.a;vec4 Linear_Q195;Linear_Q195.rgb=clamp(_Ground_Color_.rgb*_Ground_Color_.rgb,0.0,1.0);Linear_Q195.a=_Ground_Color_.a;vec3 Left_Index_Q214;vec3 Right_Index_Q214;vec3 Left_Index_Middle_Q214;vec3 Right_Index_Middle_Q214;Finger_Positions_B214(_Left_Index_Pos_,_Right_Index_Pos_,_Left_Index_Middle_Pos_,_Right_Index_Middle_Pos_,Left_Index_Q214,Right_Index_Q214,Left_Index_Middle_Q214,Right_Index_Middle_Q214);vec4 Linear_Q196;Linear_Q196.rgb=clamp(_Albedo_.rgb*_Albedo_.rgb,0.0,1.0);Linear_Q196.a=_Albedo_.a;vec3 Normalized_Q257=normalize(vBinormal);vec3 Incident_Q220=normalize(vPosition-cameraPosition);vec3 New_Normal_Q229;Bulge_B229(_Bulge_Enabled_,Normalized_Q188,Normalized_Q221,_Bulge_Height_,vColor,_Bulge_Radius_,vBinormal,New_Normal_Q229);float Result_Q227;SSS_B227(vBinormal,New_Normal_Q229,Incident_Q189,Result_Q227);vec4 Result_Q241;Scale_Color_B241(Color_Q233,X_Q240,Result_Q241);float Transmit_Q272;float Reflect_Q272;Fast_Fresnel_B272(_Front_Reflect_,_Edge_Reflect_,_Power_,New_Normal_Q229,Incident_Q189,Transmit_Q272,Reflect_Q272);float Product_Q275=Y_Q240*Y_Q240;vec3 NearP_Q215;vec3 NearQ_Q215;float Distance_Q215;Min_Segment_Distance_B215(Left_Index_Q214,Left_Index_Middle_Q214,vPosition,cameraPosition,NearP_Q215,NearQ_Q215,Distance_Q215);vec3 NearP_Q213;vec3 NearQ_Q213;float Distance_Q213;Min_Segment_Distance_B215(Right_Index_Q214,Right_Index_Middle_Q214,vPosition,cameraPosition,NearP_Q213,NearQ_Q213,Distance_Q213);vec3 Reflected_Q197=reflect(Incident_Q189,New_Normal_Q229);vec4 Product_Q253=Linear_Q196*vec4(1,1,1,1);vec4 Result_Q282;Rim_Light_B282(Normalized_Q257,Normalized_Q188,Incident_Q220,_Rim_Intensity_,_Rim_Texture_,Result_Q282);float Dot_Q222=dot(Incident_Q220, Normalized_Q221);float MaxAB_Q273=max(Reflect_Q272,Product_Q275);float NotInShadow_Q217;
#if OCCLUSION_ENABLED
FingerOcclusion_B217(_Width_,Distance_Q215,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q215,_Clip_Fade_,NotInShadow_Q217);
#else
NotInShadow_Q217=1.0;
#endif
float NotInShadow_Q218;
#if OCCLUSION_ENABLED
FingerOcclusion_B218(_Width_,Distance_Q213,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q213,_Clip_Fade_,NotInShadow_Q218);
#else
NotInShadow_Q218=1.0;
#endif
vec4 Reflected_Color_Q201;vec4 Indirect_Diffuse_Q201;
#if ENV_ENABLE
Mapped_Environment_B201(_Reflection_Map_,_Indirect_Environment_,Reflected_Q197,Reflected_Color_Q201,Indirect_Diffuse_Q201);
#else
Reflected_Color_Q201=vec4(0,0,0,1);Indirect_Diffuse_Q201=vec4(0,0,0,1);
#endif
vec4 Reflected_Color_Q200;vec4 Indirect_Color_Q200;
#if SKY_ENABLED
Sky_Environment_B200(New_Normal_Q229,Reflected_Q197,Linear_Q193,Linear_Q194,Linear_Q195,_Horizon_Power_,Reflected_Color_Q200,Indirect_Color_Q200);
#else
Reflected_Color_Q200=vec4(0,0,0,1);Indirect_Color_Q200=vec4(0,0,0,1);
#endif
float Hue_Q225;float Saturation_Q225;float Value_Q225;float Alpha_Q225;vec3 HSV_Q225;To_HSV_B225(Product_Q253,Hue_Q225,Saturation_Q225,Value_Q225,Alpha_Q225,HSV_Q225);float Hue_Q277;float Saturation_Q277;float Value_Q277;float Alpha_Q277;vec3 HSV_Q277;To_HSV_B225(Result_Q282,Hue_Q277,Saturation_Q277,Value_Q277,Alpha_Q277,HSV_Q277);float Result_Q260;Code_B260(Dot_Q222,Result_Q260);float AbsA_Q226=abs(Result_Q260);float MinAB_Q208=min(NotInShadow_Q217,NotInShadow_Q218);vec4 Sum_Q198=Reflected_Color_Q201+Reflected_Color_Q200;vec4 Sum_Q199=Indirect_Diffuse_Q201+Indirect_Color_Q200;vec3 HSV_Out_Q276;VaryHSV_B258(HSV_Q277,_Rim_Hue_Shift_,_Rim_Saturation_Shift_,_Rim_Value_Shift_,HSV_Out_Q276);float Out_Q264;Remap_Range_B264(-1.0,1.0,0.0,1.0,Result_Q260,Out_Q264);float Product_Q256;Product_Q256=AbsA_Q226*_Hue_Shift_;float X_Q278;float Y_Q278;float Z_Q278;To_XYZ_B224(HSV_Out_Q276,X_Q278,Y_Q278,Z_Q278);vec2 Vec2_Q262=vec2(Out_Q264,0.5);vec3 HSV_Out_Q258;VaryHSV_B258(HSV_Q225,Product_Q256,_Saturation_Shift_,_Value_Shift_,HSV_Out_Q258);vec4 Color_Q279;From_HSV_B223(X_Q278,Y_Q278,Z_Q278,0.0,Color_Q279);vec4 Color_Q261;
#if IRIDESCENCE_ENABLED
Color_Q261=texture(_Iridescence_Texture_,Vec2_Q262);
#else
Color_Q261=vec4(0,0,0,0);
#endif
float X_Q224;float Y_Q224;float Z_Q224;To_XYZ_B224(HSV_Out_Q258,X_Q224,Y_Q224,Z_Q224);vec4 Result_Q281=_Rim_Intensity_*Color_Q279;vec4 Result_Q263=_Iridescence_Intensity_*Color_Q261;vec4 Color_Q223;From_HSV_B223(X_Q224,Y_Q224,Z_Q224,0.0,Color_Q223);vec4 Result_Q234=Result_Q241+(1.0-Result_Q241.a)*Color_Q223;vec4 Result_Q271;Fragment_Main_B271(_Sun_Intensity_,_Sun_Theta_,_Sun_Phi_,New_Normal_Q229,Result_Q234,MaxAB_Q273,_Shininess_,Incident_Q189,_Horizon_Color_,_Sky_Color_,_Ground_Color_,_Indirect_Diffuse_,_Specular_,_Horizon_Power_,_Reflection_,Sum_Q198,Sum_Q199,_Sharpness_,Result_Q227,_Subsurface_,vec4(0,0,0,0),Result_Q281,Result_Q263,Result_Q271);vec4 Result_Q209;Scale_RGB_B209(Result_Q271,MinAB_Q208,Result_Q209);vec4 sRGB_Q192;FastLinearTosRGB_B192(Result_Q209,sRGB_Q192);vec4 Result_Q181=Blob_Color_Q180+(1.0-Blob_Color_Q180.a)*sRGB_Q192;vec4 Result_Q190=Result_Q181; Result_Q190.a=1.0;vec4 Out_Color=Result_Q190;float Clip_Threshold=0.001;bool To_sRGB=false;gl_FragColor=Out_Color;}`;
ShaderStore.ShadersStore[name12] = shader11;

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlSliderThumb.vertex.js
var name13 = "mrdlSliderThumbVertexShader";
var shader12 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;uniform float _Bevel_Front_;uniform float _Bevel_Front_Stretch_;uniform float _Bevel_Back_;uniform float _Bevel_Back_Stretch_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform bool _Bulge_Enabled_;uniform float _Bulge_Height_;uniform float _Bulge_Radius_;uniform float _Sun_Intensity_;uniform float _Sun_Theta_;uniform float _Sun_Phi_;uniform float _Indirect_Diffuse_;uniform vec4 _Albedo_;uniform float _Specular_;uniform float _Shininess_;uniform float _Sharpness_;uniform float _Subsurface_;uniform vec4 _Left_Color_;uniform vec4 _Right_Color_;uniform float _Reflection_;uniform float _Front_Reflect_;uniform float _Edge_Reflect_;uniform float _Power_;uniform vec4 _Sky_Color_;uniform vec4 _Horizon_Color_;uniform vec4 _Ground_Color_;uniform float _Horizon_Power_;uniform sampler2D _Reflection_Map_;uniform sampler2D _Indirect_Environment_;uniform float _Width_;uniform float _Fuzz_;uniform float _Min_Fuzz_;uniform float _Clip_Fade_;uniform float _Hue_Shift_;uniform float _Saturation_Shift_;uniform float _Value_Shift_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform vec3 _Left_Index_Pos_;uniform vec3 _Right_Index_Pos_;uniform vec3 _Left_Index_Middle_Pos_;uniform vec3 _Right_Index_Middle_Pos_;uniform sampler2D _Decal_;uniform vec2 _Decal_Scale_XY_;uniform bool _Decal_Front_Only_;uniform float _Rim_Intensity_;uniform sampler2D _Rim_Texture_;uniform float _Rim_Hue_Shift_;uniform float _Rim_Saturation_Shift_;uniform float _Rim_Value_Shift_;uniform float _Iridescence_Intensity_;uniform sampler2D _Iridescence_Texture_;uniform bool Use_Global_Left_Index;uniform bool Use_Global_Right_Index;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;uniform vec4 Global_Left_Thumb_Tip_Position;uniform vec4 Global_Right_Thumb_Tip_Position;uniform float Global_Left_Index_Tip_Proximity;uniform float Global_Right_Index_Tip_Proximity;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;void Object_To_World_Pos_B162(
vec3 Pos_Object,
out vec3 Pos_World)
{Pos_World=(world*vec4(Pos_Object,1.0)).xyz;}
void Object_To_World_Normal_B182(
vec3 Nrm_Object,
out vec3 Nrm_World)
{Nrm_World=(vec4(Nrm_Object,0.0)).xyz;}
void Blob_Vertex_B173(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{vec3 blob= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Blob_Position);vec3 delta=blob-Position;float dist=dot(Normal,delta);float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);float Fade=fadeValue*Intensity*Blob_Fade;float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);}
void Blob_Vertex_B174(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{vec3 blob= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Blob_Position);vec3 delta=blob-Position;float dist=dot(Normal,delta);float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);float Fade=fadeValue*Intensity*Blob_Fade;float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);}
void Move_Verts_B280(
float Anisotropy,
vec3 P,
float Radius,
float Bevel,
vec3 Normal_Object,
float ScaleZ,
float Stretch,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir,
out vec3 New_Normal)
{vec2 UV=P.xy*2.0+0.5;vec2 center=clamp(UV,0.0,1.0);vec2 delta=UV-center;float deltad=(length(delta)*2.0);float f=(Bevel+(Radius-Bevel)*Stretch)/Radius;float innerd=clamp(deltad*2.0,0.0,1.0);float outerd=clamp(deltad*2.0-1.0,0.0,1.0);float bevelAngle=outerd*3.14159*0.5;float sinb=sin(bevelAngle);float cosb=cos(bevelAngle);float beveld=(1.0-f)*innerd+f*sinb;float br=outerd;vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);float dir=P.z<0.0001 ? 1.0 : -1.0;New_UV=center+r2*((0.5-center)+normalize(delta+vec2(0.0,0.000001))*beveld*0.5);New_P=vec3(New_UV-0.5,P.z+dir*(1.0-cosb)*Bevel*ScaleZ);Radial_Gradient=clamp((deltad-0.5)*2.0,0.0,1.0);Radial_Dir=vec3(delta*r2,0.0);vec3 beveledNormal=cosb*Normal_Object+sinb*vec3(delta.x,delta.y,0.0);New_Normal=Normal_Object.z==0.0 ? Normal_Object : beveledNormal;}
void Object_To_World_Dir_B210(
vec3 Dir_Object,
out vec3 Normal_World,
out vec3 Normal_World_N,
out float Normal_Length)
{Normal_World=(world*vec4(Dir_Object,0.0)).xyz;Normal_Length=length(Normal_World);Normal_World_N=Normal_World/Normal_Length;}
void To_XYZ_B228(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{X=Vec3.x;Y=Vec3.y;Z=Vec3.z;}
void Conditional_Float_B243(
bool Which,
float If_True,
float If_False,
out float Result)
{Result=Which ? If_True : If_False;}
void Object_To_World_Dir_B178(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;Binormal_Length=length(Binormal_World);Binormal_World_N=Binormal_World/Binormal_Length;}
void Pick_Radius_B219(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{bool whichY=Position.y>0.0;Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);Result*=Radius;}
void Conditional_Float_B186(
bool Which,
float If_True,
float If_False,
out float Result)
{Result=Which ? If_True : If_False;}
void Greater_Than_B187(
float Left,
float Right,
out bool Not_Greater_Than,
out bool Greater_Than)
{Greater_Than=Left>Right;Not_Greater_Than=!Greater_Than;}
void Remap_Range_B255(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));}
void main()
{vec2 XY_Q235;XY_Q235=(uv-vec2(0.5,0.5))*_Decal_Scale_XY_+vec2(0.5,0.5);vec3 Tangent_World_Q177;vec3 Tangent_World_N_Q177;float Tangent_Length_Q177;Tangent_World_Q177=(world*vec4(vec3(1,0,0),0.0)).xyz;Tangent_Length_Q177=length(Tangent_World_Q177);Tangent_World_N_Q177=Tangent_World_Q177/Tangent_Length_Q177;vec3 Normal_World_Q210;vec3 Normal_World_N_Q210;float Normal_Length_Q210;Object_To_World_Dir_B210(vec3(0,0,1),Normal_World_Q210,Normal_World_N_Q210,Normal_Length_Q210);float X_Q228;float Y_Q228;float Z_Q228;To_XYZ_B228(position,X_Q228,Y_Q228,Z_Q228);vec3 Nrm_World_Q176;Nrm_World_Q176=normalize((world*vec4(normal,0.0)).xyz);vec3 Binormal_World_Q178;vec3 Binormal_World_N_Q178;float Binormal_Length_Q178;Object_To_World_Dir_B178(vec3(0,1,0),Binormal_World_Q178,Binormal_World_N_Q178,Binormal_Length_Q178);float Anisotropy_Q179=Tangent_Length_Q177/Binormal_Length_Q178;float Result_Q219;Pick_Radius_B219(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q219);float Anisotropy_Q203=Binormal_Length_Q178/Normal_Length_Q210;bool Not_Greater_Than_Q187;bool Greater_Than_Q187;Greater_Than_B187(Z_Q228,0.0,Not_Greater_Than_Q187,Greater_Than_Q187);vec4 Linear_Q251;Linear_Q251.rgb=clamp(_Left_Color_.rgb*_Left_Color_.rgb,0.0,1.0);Linear_Q251.a=_Left_Color_.a;vec4 Linear_Q252;Linear_Q252.rgb=clamp(_Right_Color_.rgb*_Right_Color_.rgb,0.0,1.0);Linear_Q252.a=_Right_Color_.a;vec3 Difference_Q211=vec3(0,0,0)-Normal_World_N_Q210;vec4 Out_Color_Q184=vec4(X_Q228,Y_Q228,Z_Q228,1);float Result_Q186;Conditional_Float_B186(Greater_Than_Q187,_Bevel_Back_,_Bevel_Front_,Result_Q186);float Result_Q244;Conditional_Float_B186(Greater_Than_Q187,_Bevel_Back_Stretch_,_Bevel_Front_Stretch_,Result_Q244);vec3 New_P_Q280;vec2 New_UV_Q280;float Radial_Gradient_Q280;vec3 Radial_Dir_Q280;vec3 New_Normal_Q280;Move_Verts_B280(Anisotropy_Q179,position,Result_Q219,Result_Q186,normal,Anisotropy_Q203,Result_Q244,New_P_Q280,New_UV_Q280,Radial_Gradient_Q280,Radial_Dir_Q280,New_Normal_Q280);float X_Q248;float Y_Q248;X_Q248=New_UV_Q280.x;Y_Q248=New_UV_Q280.y;vec3 Pos_World_Q162;Object_To_World_Pos_B162(New_P_Q280,Pos_World_Q162);vec3 Nrm_World_Q182;Object_To_World_Normal_B182(New_Normal_Q280,Nrm_World_Q182);vec4 Blob_Info_Q173;
#if BLOB_ENABLE
Blob_Vertex_B173(Pos_World_Q162,Nrm_World_Q176,Tangent_World_N_Q177,Binormal_World_N_Q178,_Blob_Position_,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q173);
#else
Blob_Info_Q173=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q174;
#if BLOB_ENABLE_2
Blob_Vertex_B174(Pos_World_Q162,Nrm_World_Q176,Tangent_World_N_Q177,Binormal_World_N_Q178,_Blob_Position_2_,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q174);
#else
Blob_Info_Q174=vec4(0,0,0,0);
#endif
float Out_Q255;Remap_Range_B255(0.0,1.0,0.0,1.0,X_Q248,Out_Q255);float X_Q236;float Y_Q236;float Z_Q236;To_XYZ_B228(Nrm_World_Q182,X_Q236,Y_Q236,Z_Q236);vec4 Color_At_T_Q247=mix(Linear_Q251,Linear_Q252,Out_Q255);float Minus_F_Q237=-Z_Q236;float R_Q249;float G_Q249;float B_Q249;float A_Q249;R_Q249=Color_At_T_Q247.r; G_Q249=Color_At_T_Q247.g; B_Q249=Color_At_T_Q247.b; A_Q249=Color_At_T_Q247.a;float ClampF_Q238=clamp(0.0,Minus_F_Q237,1.0);float Result_Q243;Conditional_Float_B243(_Decal_Front_Only_,ClampF_Q238,1.0,Result_Q243);vec4 Vec4_Q239=vec4(Result_Q243,Radial_Gradient_Q280,G_Q249,B_Q249);vec3 Position=Pos_World_Q162;vec3 Normal=Nrm_World_Q182;vec2 UV=XY_Q235;vec3 Tangent=Tangent_World_N_Q177;vec3 Binormal=Difference_Q211;vec4 Color=Out_Color_Q184;vec4 Extra1=Vec4_Q239;vec4 Extra2=Blob_Info_Q173;vec4 Extra3=Blob_Info_Q174;gl_Position=viewProjection*vec4(Position,1);vPosition=Position;vNormal=Normal;vUV=UV;vTangent=Tangent;vBinormal=Binormal;vColor=Color;vExtra1=Extra1;vExtra2=Extra2;vExtra3=Extra3;}`;
ShaderStore.ShadersStore[name13] = shader12;

// node_modules/@babylonjs/gui/3D/materials/mrdl/mrdlSliderThumbMaterial.js
var MRDLSliderThumbMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this.SKY_ENABLED = true;
    this.BLOB_ENABLE_2 = true;
    this.IRIDESCENCE_ENABLED = true;
    this._needNormals = true;
    this._needUVs = true;
    this.rebuild();
  }
};
var MRDLSliderThumbMaterial = class _MRDLSliderThumbMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.radius = 0.157;
    this.bevelFront = 0.065;
    this.bevelFrontStretch = 0.077;
    this.bevelBack = 0.031;
    this.bevelBackStretch = 0;
    this.radiusTopLeft = 1;
    this.radiusTopRight = 1;
    this.radiusBottomLeft = 1;
    this.radiusBottomRight = 1;
    this.bulgeEnabled = false;
    this.bulgeHeight = -0.323;
    this.bulgeRadius = 0.73;
    this.sunIntensity = 2;
    this.sunTheta = 0.937;
    this.sunPhi = 0.555;
    this.indirectDiffuse = 1;
    this.albedo = new Color4(0.0117647, 0.505882, 0.996078, 1);
    this.specular = 0;
    this.shininess = 10;
    this.sharpness = 0;
    this.subsurface = 0.31;
    this.leftGradientColor = new Color4(0.0117647, 0.505882, 0.996078, 1);
    this.rightGradientColor = new Color4(0.0117647, 0.505882, 0.996078, 1);
    this.reflection = 0.749;
    this.frontReflect = 0;
    this.edgeReflect = 0.09;
    this.power = 8.1;
    this.skyColor = new Color4(0.0117647, 0.960784, 0.996078, 1);
    this.horizonColor = new Color4(0.0117647, 0.333333, 0.996078, 1);
    this.groundColor = new Color4(0, 0.254902, 0.996078, 1);
    this.horizonPower = 1;
    this.width = 0.02;
    this.fuzz = 0.5;
    this.minFuzz = 1e-3;
    this.clipFade = 0.01;
    this.hueShift = 0;
    this.saturationShift = 0;
    this.valueShift = 0;
    this.blobPosition = new Vector3(0, 0, 0.1);
    this.blobIntensity = 0.5;
    this.blobNearSize = 0.01;
    this.blobFarSize = 0.03;
    this.blobNearDistance = 0;
    this.blobFarDistance = 0.08;
    this.blobFadeLength = 0.576;
    this.blobPulse = 0;
    this.blobFade = 1;
    this.blobPosition2 = new Vector3(0.2, 0, 0.1);
    this.blobNearSize2 = 0.01;
    this.blobPulse2 = 0;
    this.blobFade2 = 1;
    this.blobTexture = new Texture("", this.getScene());
    this.leftIndexPosition = new Vector3(0, 0, 1);
    this.rightIndexPosition = new Vector3(-1, -1, -1);
    this.leftIndexMiddlePosition = new Vector3(0, 0, 0);
    this.rightIndexMiddlePosition = new Vector3(0, 0, 0);
    this.decalScaleXY = new Vector2(1.5, 1.5);
    this.decalFrontOnly = true;
    this.rimIntensity = 0.287;
    this.rimHueShift = 0;
    this.rimSaturationShift = 0;
    this.rimValueShift = -1;
    this.iridescenceIntensity = 0;
    this.useGlobalLeftIndex = 1;
    this.useGlobalRightIndex = 1;
    this.globalLeftIndexTipProximity = 0;
    this.globalRightIndexTipProximity = 0;
    this.globalLeftIndexTipPosition = new Vector4(0.5, 0, -0.55, 1);
    this.globaRightIndexTipPosition = new Vector4(0, 0, 0, 1);
    this.globalLeftThumbTipPosition = new Vector4(0.5, 0, -0.55, 1);
    this.globalRightThumbTipPosition = new Vector4(0, 0, 0, 1);
    this.globalLeftIndexMiddlePosition = new Vector4(0.5, 0, -0.55, 1);
    this.globalRightIndexMiddlePosition = new Vector4(0, 0, 0, 1);
    this.alphaMode = Constants.ALPHA_DISABLE;
    this.backFaceCulling = false;
    this._blueGradientTexture = new Texture(_MRDLSliderThumbMaterial.BLUE_GRADIENT_TEXTURE_URL, scene, true, false, Texture.NEAREST_SAMPLINGMODE);
    this._decalTexture = new Texture("", this.getScene());
    this._reflectionMapTexture = new Texture("", this.getScene());
    this._indirectEnvTexture = new Texture("", this.getScene());
  }
  needAlphaBlending() {
    return false;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  // Methods
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new MRDLSliderThumbMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, false, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "mrdlSliderThumb";
      const join = defines.toString();
      const uniforms = [
        "world",
        "viewProjection",
        "cameraPosition",
        "_Radius_",
        "_Bevel_Front_",
        "_Bevel_Front_Stretch_",
        "_Bevel_Back_",
        "_Bevel_Back_Stretch_",
        "_Radius_Top_Left_",
        "_Radius_Top_Right_",
        "_Radius_Bottom_Left_",
        "_Radius_Bottom_Right_",
        "_Bulge_Enabled_",
        "_Bulge_Height_",
        "_Bulge_Radius_",
        "_Sun_Intensity_",
        "_Sun_Theta_",
        "_Sun_Phi_",
        "_Indirect_Diffuse_",
        "_Albedo_",
        "_Specular_",
        "_Shininess_",
        "_Sharpness_",
        "_Subsurface_",
        "_Left_Color_",
        "_Right_Color_",
        "_Reflection_",
        "_Front_Reflect_",
        "_Edge_Reflect_",
        "_Power_",
        "_Sky_Color_",
        "_Horizon_Color_",
        "_Ground_Color_",
        "_Horizon_Power_",
        "_Reflection_Map_",
        "_Indirect_Environment_",
        "_Width_",
        "_Fuzz_",
        "_Min_Fuzz_",
        "_Clip_Fade_",
        "_Hue_Shift_",
        "_Saturation_Shift_",
        "_Value_Shift_",
        "_Blob_Position_",
        "_Blob_Intensity_",
        "_Blob_Near_Size_",
        "_Blob_Far_Size_",
        "_Blob_Near_Distance_",
        "_Blob_Far_Distance_",
        "_Blob_Fade_Length_",
        "_Blob_Pulse_",
        "_Blob_Fade_",
        "_Blob_Texture_",
        "_Blob_Position_2_",
        "_Blob_Near_Size_2_",
        "_Blob_Pulse_2_",
        "_Blob_Fade_2_",
        "_Left_Index_Pos_",
        "_Right_Index_Pos_",
        "_Left_Index_Middle_Pos_",
        "_Right_Index_Middle_Pos_",
        "_Decal_",
        "_Decal_Scale_XY_",
        "_Decal_Front_Only_",
        "_Rim_Intensity_",
        "_Rim_Texture_",
        "_Rim_Hue_Shift_",
        "_Rim_Saturation_Shift_",
        "_Rim_Value_Shift_",
        "_Iridescence_Intensity_",
        "_Iridescence_Texture_",
        "Use_Global_Left_Index",
        "Use_Global_Right_Index",
        "Global_Left_Index_Tip_Position",
        "Global_Right_Index_Tip_Position",
        "Global_Left_Thumb_Tip_Position",
        "Global_Right_Thumb_Tip_Position",
        "Global_Left_Index_Middle_Position;",
        "Global_Right_Index_Middle_Position",
        "Global_Left_Index_Tip_Proximity",
        "Global_Right_Index_Tip_Proximity"
      ];
      const samplers = ["_Rim_Texture_", "_Iridescence_Texture_"];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
    const defines = subMesh.materialDefines;
    if (!defines) {
      return;
    }
    const effect = subMesh.effect;
    if (!effect) {
      return;
    }
    this._activeEffect = effect;
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", this.getScene().getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", this.getScene().activeCamera.position);
    this._activeEffect.setFloat("_Radius_", this.radius);
    this._activeEffect.setFloat("_Bevel_Front_", this.bevelFront);
    this._activeEffect.setFloat("_Bevel_Front_Stretch_", this.bevelFrontStretch);
    this._activeEffect.setFloat("_Bevel_Back_", this.bevelBack);
    this._activeEffect.setFloat("_Bevel_Back_Stretch_", this.bevelBackStretch);
    this._activeEffect.setFloat("_Radius_Top_Left_", this.radiusTopLeft);
    this._activeEffect.setFloat("_Radius_Top_Right_", this.radiusTopRight);
    this._activeEffect.setFloat("_Radius_Bottom_Left_", this.radiusBottomLeft);
    this._activeEffect.setFloat("_Radius_Bottom_Right_", this.radiusBottomRight);
    this._activeEffect.setFloat("_Bulge_Enabled_", this.bulgeEnabled ? 1 : 0);
    this._activeEffect.setFloat("_Bulge_Height_", this.bulgeHeight);
    this._activeEffect.setFloat("_Bulge_Radius_", this.bulgeRadius);
    this._activeEffect.setFloat("_Sun_Intensity_", this.sunIntensity);
    this._activeEffect.setFloat("_Sun_Theta_", this.sunTheta);
    this._activeEffect.setFloat("_Sun_Phi_", this.sunPhi);
    this._activeEffect.setFloat("_Indirect_Diffuse_", this.indirectDiffuse);
    this._activeEffect.setDirectColor4("_Albedo_", this.albedo);
    this._activeEffect.setFloat("_Specular_", this.specular);
    this._activeEffect.setFloat("_Shininess_", this.shininess);
    this._activeEffect.setFloat("_Sharpness_", this.sharpness);
    this._activeEffect.setFloat("_Subsurface_", this.subsurface);
    this._activeEffect.setDirectColor4("_Left_Color_", this.leftGradientColor);
    this._activeEffect.setDirectColor4("_Right_Color_", this.rightGradientColor);
    this._activeEffect.setFloat("_Reflection_", this.reflection);
    this._activeEffect.setFloat("_Front_Reflect_", this.frontReflect);
    this._activeEffect.setFloat("_Edge_Reflect_", this.edgeReflect);
    this._activeEffect.setFloat("_Power_", this.power);
    this._activeEffect.setDirectColor4("_Sky_Color_", this.skyColor);
    this._activeEffect.setDirectColor4("_Horizon_Color_", this.horizonColor);
    this._activeEffect.setDirectColor4("_Ground_Color_", this.groundColor);
    this._activeEffect.setFloat("_Horizon_Power_", this.horizonPower);
    this._activeEffect.setTexture("_Reflection_Map_", this._reflectionMapTexture);
    this._activeEffect.setTexture("_Indirect_Environment_", this._indirectEnvTexture);
    this._activeEffect.setFloat("_Width_", this.width);
    this._activeEffect.setFloat("_Fuzz_", this.fuzz);
    this._activeEffect.setFloat("_Min_Fuzz_", this.minFuzz);
    this._activeEffect.setFloat("_Clip_Fade_", this.clipFade);
    this._activeEffect.setFloat("_Hue_Shift_", this.hueShift);
    this._activeEffect.setFloat("_Saturation_Shift_", this.saturationShift);
    this._activeEffect.setFloat("_Value_Shift_", this.valueShift);
    this._activeEffect.setVector3("_Blob_Position_", this.blobPosition);
    this._activeEffect.setFloat("_Blob_Intensity_", this.blobIntensity);
    this._activeEffect.setFloat("_Blob_Near_Size_", this.blobNearSize);
    this._activeEffect.setFloat("_Blob_Far_Size_", this.blobFarSize);
    this._activeEffect.setFloat("_Blob_Near_Distance_", this.blobNearDistance);
    this._activeEffect.setFloat("_Blob_Far_Distance_", this.blobFarDistance);
    this._activeEffect.setFloat("_Blob_Fade_Length_", this.blobFadeLength);
    this._activeEffect.setFloat("_Blob_Pulse_", this.blobPulse);
    this._activeEffect.setFloat("_Blob_Fade_", this.blobFade);
    this._activeEffect.setTexture("_Blob_Texture_", this.blobTexture);
    this._activeEffect.setVector3("_Blob_Position_2_", this.blobPosition2);
    this._activeEffect.setFloat("_Blob_Near_Size_2_", this.blobNearSize2);
    this._activeEffect.setFloat("_Blob_Pulse_2_", this.blobPulse2);
    this._activeEffect.setFloat("_Blob_Fade_2_", this.blobFade2);
    this._activeEffect.setVector3("_Left_Index_Pos_", this.leftIndexPosition);
    this._activeEffect.setVector3("_Right_Index_Pos_", this.rightIndexPosition);
    this._activeEffect.setVector3("_Left_Index_Middle_Pos_", this.leftIndexMiddlePosition);
    this._activeEffect.setVector3("_Right_Index_Middle_Pos_", this.rightIndexMiddlePosition);
    this._activeEffect.setTexture("_Decal_", this._decalTexture);
    this._activeEffect.setVector2("_Decal_Scale_XY_", this.decalScaleXY);
    this._activeEffect.setFloat("_Decal_Front_Only_", this.decalFrontOnly ? 1 : 0);
    this._activeEffect.setFloat("_Rim_Intensity_", this.rimIntensity);
    this._activeEffect.setTexture("_Rim_Texture_", this._blueGradientTexture);
    this._activeEffect.setFloat("_Rim_Hue_Shift_", this.rimHueShift);
    this._activeEffect.setFloat("_Rim_Saturation_Shift_", this.rimSaturationShift);
    this._activeEffect.setFloat("_Rim_Value_Shift_", this.rimValueShift);
    this._activeEffect.setFloat("_Iridescence_Intensity_", this.iridescenceIntensity);
    this._activeEffect.setTexture("_Iridescence_Texture_", this._blueGradientTexture);
    this._activeEffect.setFloat("Use_Global_Left_Index", this.useGlobalLeftIndex);
    this._activeEffect.setFloat("Use_Global_Right_Index", this.useGlobalRightIndex);
    this._activeEffect.setVector4("Global_Left_Index_Tip_Position", this.globalLeftIndexTipPosition);
    this._activeEffect.setVector4("Global_Right_Index_Tip_Position", this.globaRightIndexTipPosition);
    this._activeEffect.setVector4("Global_Left_Thumb_Tip_Position", this.globalLeftThumbTipPosition);
    this._activeEffect.setVector4("Global_Right_Thumb_Tip_Position", this.globalRightThumbTipPosition);
    this._activeEffect.setVector4("Global_Left_Index_Middle_Position", this.globalLeftIndexMiddlePosition);
    this._activeEffect.setVector4("Global_Right_Index_Middle_Position", this.globalRightIndexMiddlePosition);
    this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity", this.globalLeftIndexTipProximity);
    this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity", this.globalRightIndexTipProximity);
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
    this._reflectionMapTexture.dispose();
    this._indirectEnvTexture.dispose();
    this._blueGradientTexture.dispose();
    this._decalTexture.dispose();
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _MRDLSliderThumbMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = super.serialize();
    serializationObject.customType = "BABYLON.MRDLSliderThumbMaterial";
    return serializationObject;
  }
  getClassName() {
    return "MRDLSliderThumbMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _MRDLSliderThumbMaterial(source.name, scene), source, scene, rootUrl);
  }
};
MRDLSliderThumbMaterial.BLUE_GRADIENT_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-blue-gradient.png";
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "radius", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "bevelFront", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "bevelFrontStretch", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "bevelBack", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "bevelBackStretch", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "radiusTopLeft", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "radiusTopRight", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "radiusBottomLeft", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "radiusBottomRight", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "bulgeEnabled", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "bulgeHeight", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "bulgeRadius", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "sunIntensity", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "sunTheta", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "sunPhi", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "indirectDiffuse", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "albedo", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "specular", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "shininess", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "sharpness", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "subsurface", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "leftGradientColor", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "rightGradientColor", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "reflection", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "frontReflect", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "edgeReflect", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "power", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "skyColor", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "horizonColor", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "groundColor", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "horizonPower", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "width", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "fuzz", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "minFuzz", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "clipFade", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "hueShift", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "saturationShift", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "valueShift", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobPosition", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobIntensity", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobNearSize", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobFarSize", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobNearDistance", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobFarDistance", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobFadeLength", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobPulse", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobFade", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobPosition2", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobNearSize2", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobPulse2", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobFade2", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "blobTexture", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "leftIndexPosition", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "rightIndexPosition", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "leftIndexMiddlePosition", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "rightIndexMiddlePosition", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "decalScaleXY", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "decalFrontOnly", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "rimIntensity", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "rimHueShift", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "rimSaturationShift", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "rimValueShift", void 0);
__decorate([
  serialize()
], MRDLSliderThumbMaterial.prototype, "iridescenceIntensity", void 0);
RegisterClass("BABYLON.GUI.MRDLSliderThumbMaterial", MRDLSliderThumbMaterial);

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlBackplate.fragment.js
var name14 = "mrdlBackplatePixelShader";
var shader13 = `uniform vec3 cameraPosition;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vExtra1;varying vec4 vExtra2;uniform float _Radius_;uniform float _Line_Width_;uniform bool _Absolute_Sizes_;uniform float _Filter_Width_;uniform vec4 _Base_Color_;uniform vec4 _Line_Color_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform float _Rate_;uniform vec4 _Highlight_Color_;uniform float _Highlight_Width_;uniform vec4 _Highlight_Transform_;uniform float _Highlight_;uniform float _Iridescence_Intensity_;uniform float _Iridescence_Edge_Intensity_;uniform vec4 _Iridescence_Tint_;uniform sampler2D _Iridescent_Map_;uniform float _Angle_;uniform bool _Reflected_;uniform float _Frequency_;uniform float _Vertical_Offset_;uniform vec4 _Gradient_Color_;uniform vec4 _Top_Left_;uniform vec4 _Top_Right_;uniform vec4 _Bottom_Left_;uniform vec4 _Bottom_Right_;uniform float _Edge_Width_;uniform float _Edge_Power_;uniform float _Line_Gradient_Blend_;uniform float _Fade_Out_;void FastLinearTosRGB_B353(
vec4 Linear,
out vec4 sRGB)
{sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));sRGB.a=Linear.a;}
void Round_Rect_Fragment_B332(
float Radius,
float Line_Width,
vec4 Line_Color,
float Filter_Width,
vec2 UV,
float Line_Visibility,
vec4 Rect_Parms,
vec4 Fill_Color,
out vec4 Color)
{float d=length(max(abs(UV)-Rect_Parms.xy,0.0));float dx=max(fwidth(d)*Filter_Width,0.00001);float g=min(Rect_Parms.z,Rect_Parms.w);float dgrad=max(fwidth(g)*Filter_Width,0.00001);float Inside_Rect=clamp(g/dgrad,0.0,1.0);float inner=clamp((d+dx*0.5-max(Radius-Line_Width,d-dx*0.5))/dx,0.0,1.0);Color=clamp(mix(Fill_Color,Line_Color,inner),0.0,1.0)*Inside_Rect;}
void Iridescence_B343(
vec3 Position,
vec3 Normal,
vec2 UV,
vec3 Axis,
vec3 Eye,
vec4 Tint,
sampler2D Texture,
bool Reflected,
float Frequency,
float Vertical_Offset,
out vec4 Color)
{vec3 i=normalize(Position-Eye);vec3 r=reflect(i,Normal);float idota=dot(i,Axis);float idotr=dot(i,r);float x=Reflected ? idotr : idota;vec2 xy;xy.x=fract((x*Frequency+1.0)*0.5+UV.y*Vertical_Offset);xy.y=0.5;Color=texture(Texture,xy);Color.rgb*=Tint.rgb;}
void Scale_RGB_B346(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=vec4(Scalar,Scalar,Scalar,1)*Color;}
void Scale_RGB_B344(
float Scalar,
vec4 Color,
out vec4 Result)
{Result=vec4(Scalar,Scalar,Scalar,1)*Color;}
void Line_Fragment_B362(
vec4 Base_Color,
vec4 Highlight_Color,
float Highlight_Width,
vec3 Line_Vertex,
float Highlight,
out vec4 Line_Color)
{float k2=1.0-clamp(abs(Line_Vertex.y/Highlight_Width),0.0,1.0);Line_Color=mix(Base_Color,Highlight_Color,Highlight*k2);}
void Edge_B356(
vec4 RectParms,
float Radius,
float Line_Width,
vec2 UV,
float Edge_Width,
float Edge_Power,
out float Result)
{float d=length(max(abs(UV)-RectParms.xy,0.0));float edge=1.0-clamp((1.0-d/(Radius-Line_Width))/Edge_Width,0.0,1.0);Result=pow(edge,Edge_Power);}
void Gradient_B355(
vec4 Gradient_Color,
vec4 Top_Left,
vec4 Top_Right,
vec4 Bottom_Left,
vec4 Bottom_Right,
vec2 UV,
out vec4 Result)
{vec3 top=Top_Left.rgb+(Top_Right.rgb-Top_Left.rgb)*UV.x;vec3 bottom=Bottom_Left.rgb+(Bottom_Right.rgb-Bottom_Left.rgb)*UV.x;Result.rgb=Gradient_Color.rgb*(bottom+(top-bottom)*UV.y);Result.a=1.0;}
void main()
{float X_Q338;float Y_Q338;float Z_Q338;float W_Q338;X_Q338=vExtra2.x;Y_Q338=vExtra2.y;Z_Q338=vExtra2.z;W_Q338=vExtra2.w;vec4 Color_Q343;
#if IRIDESCENCE_ENABLE
Iridescence_B343(vPosition,vNormal,vUV,vBinormal,cameraPosition,_Iridescence_Tint_,_Iridescent_Map_,_Reflected_,_Frequency_,_Vertical_Offset_,Color_Q343);
#else
Color_Q343=vec4(0,0,0,0);
#endif
vec4 Result_Q344;Scale_RGB_B344(_Iridescence_Intensity_,Color_Q343,Result_Q344);vec4 Line_Color_Q362;Line_Fragment_B362(_Line_Color_,_Highlight_Color_,_Highlight_Width_,vTangent,_Highlight_,Line_Color_Q362);float Result_Q356;
#if EDGE_ONLY
Edge_B356(vExtra1,Z_Q338,W_Q338,vUV,_Edge_Width_,_Edge_Power_,Result_Q356);
#else
Result_Q356=1.0;
#endif
vec2 Vec2_Q339=vec2(X_Q338,Y_Q338);vec4 Result_Q355;Gradient_B355(_Gradient_Color_,_Top_Left_,_Top_Right_,_Bottom_Left_,_Bottom_Right_,Vec2_Q339,Result_Q355);vec4 Linear_Q348;Linear_Q348.rgb=clamp(Result_Q355.rgb*Result_Q355.rgb,0.0,1.0);Linear_Q348.a=Result_Q355.a;vec4 Result_Q346;Scale_RGB_B346(Linear_Q348,Result_Q356,Result_Q346);vec4 Sum_Q345=Result_Q346+Result_Q344;vec4 Color_At_T_Q347=mix(Line_Color_Q362,Result_Q346,_Line_Gradient_Blend_);vec4 Base_And_Iridescent_Q350;Base_And_Iridescent_Q350=_Base_Color_+vec4(Sum_Q345.rgb,0.0);vec4 Sum_Q349=Color_At_T_Q347+_Iridescence_Edge_Intensity_*Color_Q343;vec4 Result_Q351=Sum_Q349; Result_Q351.a=1.0;vec4 Color_Q332;Round_Rect_Fragment_B332(Z_Q338,W_Q338,Result_Q351,_Filter_Width_,vUV,1.0,vExtra1,Base_And_Iridescent_Q350,Color_Q332);vec4 Result_Q354=_Fade_Out_*Color_Q332;vec4 sRGB_Q353;FastLinearTosRGB_B353(Result_Q354,sRGB_Q353);vec4 Out_Color=sRGB_Q353;float Clip_Threshold=0.001;bool To_sRGB=false;gl_FragColor=Out_Color;}`;
ShaderStore.ShadersStore[name14] = shader13;

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlBackplate.vertex.js
var name15 = "mrdlBackplateVertexShader";
var shader14 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec3 tangent;uniform float _Radius_;uniform float _Line_Width_;uniform bool _Absolute_Sizes_;uniform float _Filter_Width_;uniform vec4 _Base_Color_;uniform vec4 _Line_Color_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform float _Rate_;uniform vec4 _Highlight_Color_;uniform float _Highlight_Width_;uniform vec4 _Highlight_Transform_;uniform float _Highlight_;uniform float _Iridescence_Intensity_;uniform float _Iridescence_Edge_Intensity_;uniform vec4 _Iridescence_Tint_;uniform sampler2D _Iridescent_Map_;uniform float _Angle_;uniform bool _Reflected_;uniform float _Frequency_;uniform float _Vertical_Offset_;uniform vec4 _Gradient_Color_;uniform vec4 _Top_Left_;uniform vec4 _Top_Right_;uniform vec4 _Bottom_Left_;uniform vec4 _Bottom_Right_;uniform float _Edge_Width_;uniform float _Edge_Power_;uniform float _Line_Gradient_Blend_;uniform float _Fade_Out_;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vExtra1;varying vec4 vExtra2;void Object_To_World_Pos_B314(
vec3 Pos_Object,
out vec3 Pos_World)
{Pos_World=(world*vec4(Pos_Object,1.0)).xyz;}
void Round_Rect_Vertex_B357(
vec2 UV,
float Radius,
float Margin,
float Anisotropy,
float Gradient1,
float Gradient2,
vec3 Normal,
vec4 Color_Scale_Translate,
out vec2 Rect_UV,
out vec4 Rect_Parms,
out vec2 Scale_XY,
out vec2 Line_UV,
out vec2 Color_UV_Info)
{Scale_XY=vec2(Anisotropy,1.0);Line_UV=(UV-vec2(0.5,0.5));Rect_UV=Line_UV*Scale_XY;Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius)-vec2(Margin,Margin);Rect_Parms.z=Gradient1; 
Rect_Parms.w=Gradient2;Color_UV_Info=(Line_UV+vec2(0.5,0.5))*Color_Scale_Translate.xy+Color_Scale_Translate.zw;}
void Line_Vertex_B333(
vec2 Scale_XY,
vec2 UV,
float Time,
float Rate,
vec4 Highlight_Transform,
out vec3 Line_Vertex)
{float angle2=(Rate*Time)*2.0*3.1416;float sinAngle2=sin(angle2);float cosAngle2=cos(angle2);vec2 xformUV=UV*Highlight_Transform.xy+Highlight_Transform.zw;Line_Vertex.x=0.0;Line_Vertex.y=cosAngle2*xformUV.x-sinAngle2*xformUV.y;Line_Vertex.z=0.0; }
void PickDir_B334(
float Degrees,
vec3 DirX,
vec3 DirY,
out vec3 Dir)
{float a=Degrees*3.14159/180.0;Dir=cos(a)*DirX+sin(a)*DirY;}
void Move_Verts_B327(
float Anisotropy,
vec3 P,
float Radius,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir)
{vec2 UV=P.xy*2.0+0.5;vec2 center=clamp(UV,0.0,1.0);vec2 delta=UV-center;vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);New_UV=center+r2*(UV-2.0*center+0.5);New_P=vec3(New_UV-0.5,P.z);Radial_Gradient=1.0-length(delta)*2.0;Radial_Dir=vec3(delta*r2,0.0);}
void Pick_Radius_B336(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{bool whichY=Position.y>0.0;Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);Result*=Radius;}
void Edge_AA_Vertex_B328(
vec3 Position_World,
vec3 Position_Object,
vec3 Normal_Object,
vec3 Eye,
float Radial_Gradient,
vec3 Radial_Dir,
vec3 Tangent,
out float Gradient1,
out float Gradient2)
{vec3 I=(Eye-Position_World);vec3 T=(vec4(Tangent,0.0)).xyz;float g=(dot(T,I)<0.0) ? 0.0 : 1.0;if (Normal_Object.z==0.0) { 
Gradient1=Position_Object.z>0.0 ? g : 1.0;Gradient2=Position_Object.z>0.0 ? 1.0 : g;} else {Gradient1=g+(1.0-g)*(Radial_Gradient);Gradient2=1.0;}}
void Object_To_World_Dir_B330(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;Binormal_Length=length(Binormal_World);Binormal_World_N=Binormal_World/Binormal_Length;}
void RelativeOrAbsoluteDetail_B341(
float Nominal_Radius,
float Nominal_LineWidth,
bool Absolute_Measurements,
float Height,
out float Radius,
out float Line_Width)
{float scale=Absolute_Measurements ? 1.0/Height : 1.0;Radius=Nominal_Radius*scale;Line_Width=Nominal_LineWidth*scale;}
void main()
{vec3 Nrm_World_Q326;Nrm_World_Q326=normalize((world*vec4(normal,0.0)).xyz);vec3 Tangent_World_Q329;vec3 Tangent_World_N_Q329;float Tangent_Length_Q329;Tangent_World_Q329=(world*vec4(vec3(1,0,0),0.0)).xyz;Tangent_Length_Q329=length(Tangent_World_Q329);Tangent_World_N_Q329=Tangent_World_Q329/Tangent_Length_Q329;vec3 Binormal_World_Q330;vec3 Binormal_World_N_Q330;float Binormal_Length_Q330;Object_To_World_Dir_B330(vec3(0,1,0),Binormal_World_Q330,Binormal_World_N_Q330,Binormal_Length_Q330);float Radius_Q341;float Line_Width_Q341;RelativeOrAbsoluteDetail_B341(_Radius_,_Line_Width_,_Absolute_Sizes_,Binormal_Length_Q330,Radius_Q341,Line_Width_Q341);vec3 Dir_Q334;PickDir_B334(_Angle_,Tangent_World_N_Q329,Binormal_World_N_Q330,Dir_Q334);float Result_Q336;Pick_Radius_B336(Radius_Q341,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q336);float Anisotropy_Q331=Tangent_Length_Q329/Binormal_Length_Q330;vec4 Out_Color_Q337=vec4(Result_Q336,Line_Width_Q341,0,1);vec3 New_P_Q327;vec2 New_UV_Q327;float Radial_Gradient_Q327;vec3 Radial_Dir_Q327;Move_Verts_B327(Anisotropy_Q331,position,Result_Q336,New_P_Q327,New_UV_Q327,Radial_Gradient_Q327,Radial_Dir_Q327);vec3 Pos_World_Q314;Object_To_World_Pos_B314(New_P_Q327,Pos_World_Q314);float Gradient1_Q328;float Gradient2_Q328;
#if SMOOTH_EDGES
Edge_AA_Vertex_B328(Pos_World_Q314,position,normal,cameraPosition,Radial_Gradient_Q327,Radial_Dir_Q327,tangent,Gradient1_Q328,Gradient2_Q328);
#else
Gradient1_Q328=1.0;Gradient2_Q328=1.0;
#endif
vec2 Rect_UV_Q357;vec4 Rect_Parms_Q357;vec2 Scale_XY_Q357;vec2 Line_UV_Q357;vec2 Color_UV_Info_Q357;Round_Rect_Vertex_B357(New_UV_Q327,Result_Q336,0.0,Anisotropy_Q331,Gradient1_Q328,Gradient2_Q328,normal,vec4(1,1,0,0),Rect_UV_Q357,Rect_Parms_Q357,Scale_XY_Q357,Line_UV_Q357,Color_UV_Info_Q357);vec3 Line_Vertex_Q333;Line_Vertex_B333(Scale_XY_Q357,Line_UV_Q357,(20.0),_Rate_,_Highlight_Transform_,Line_Vertex_Q333);float X_Q359;float Y_Q359;X_Q359=Color_UV_Info_Q357.x;Y_Q359=Color_UV_Info_Q357.y;vec4 Vec4_Q358=vec4(X_Q359,Y_Q359,Result_Q336,Line_Width_Q341);vec3 Position=Pos_World_Q314;vec3 Normal=Nrm_World_Q326;vec2 UV=Rect_UV_Q357;vec3 Tangent=Line_Vertex_Q333;vec3 Binormal=Dir_Q334;vec4 Color=Out_Color_Q337;vec4 Extra1=Rect_Parms_Q357;vec4 Extra2=Vec4_Q358;vec4 Extra3=vec4(0,0,0,0);gl_Position=viewProjection*vec4(Position,1);vPosition=Position;vNormal=Normal;vUV=UV;vTangent=Tangent;vBinormal=Binormal;vExtra1=Extra1;vExtra2=Extra2;}`;
ShaderStore.ShadersStore[name15] = shader14;

// node_modules/@babylonjs/gui/3D/materials/mrdl/mrdlBackplateMaterial.js
var MRDLBackplateMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this.IRIDESCENCE_ENABLE = true;
    this.SMOOTH_EDGES = true;
    this._needNormals = true;
    this.rebuild();
  }
};
var MRDLBackplateMaterial = class _MRDLBackplateMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.radius = 0.3;
    this.lineWidth = 3e-3;
    this.absoluteSizes = false;
    this._filterWidth = 1;
    this.baseColor = new Color4(0, 0, 0, 1);
    this.lineColor = new Color4(0.2, 0.262745, 0.4, 1);
    this.radiusTopLeft = 1;
    this.radiusTopRight = 1;
    this.radiusBottomLeft = 1;
    this.radiusBottomRight = 1;
    this._rate = 0;
    this.highlightColor = new Color4(0.239216, 0.435294, 0.827451, 1);
    this.highlightWidth = 0;
    this._highlightTransform = new Vector4(1, 1, 0, 0);
    this._highlight = 1;
    this.iridescenceIntensity = 0.45;
    this.iridescenceEdgeIntensity = 1;
    this.iridescenceTint = new Color4(1, 1, 1, 1);
    this._angle = -45;
    this.fadeOut = 1;
    this._reflected = true;
    this._frequency = 1;
    this._verticalOffset = 0;
    this.gradientColor = new Color4(0.74902, 0.74902, 0.74902, 1);
    this.topLeftGradientColor = new Color4(784314e-8, 0.294118, 0.580392, 1);
    this.topRightGradientColor = new Color4(0.305882, 0, 1, 1);
    this.bottomLeftGradientColor = new Color4(0.133333, 0.258824, 0.992157, 1);
    this.bottomRightGradientColor = new Color4(0.176471, 0.176471, 0.619608, 1);
    this.edgeWidth = 0.5;
    this.edgePower = 1;
    this.edgeLineGradientBlend = 0.5;
    this.alphaMode = Constants.ALPHA_DISABLE;
    this.backFaceCulling = false;
    this._iridescentMapTexture = new Texture(_MRDLBackplateMaterial.IRIDESCENT_MAP_TEXTURE_URL, this.getScene(), true, false, Texture.NEAREST_SAMPLINGMODE);
  }
  needAlphaBlending() {
    return false;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  // Methods
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new MRDLBackplateMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, false, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "mrdlBackplate";
      const join = defines.toString();
      const uniforms = [
        "world",
        "viewProjection",
        "cameraPosition",
        "_Radius_",
        "_Line_Width_",
        "_Absolute_Sizes_",
        "_Filter_Width_",
        "_Base_Color_",
        "_Line_Color_",
        "_Radius_Top_Left_",
        "_Radius_Top_Right_",
        "_Radius_Bottom_Left_",
        "_Radius_Bottom_Right_",
        "_Rate_",
        "_Highlight_Color_",
        "_Highlight_Width_",
        "_Highlight_Transform_",
        "_Highlight_",
        "_Iridescence_Intensity_",
        "_Iridescence_Edge_Intensity_",
        "_Iridescence_Tint_",
        "_Iridescent_Map_",
        "_Angle_",
        "_Reflected_",
        "_Frequency_",
        "_Vertical_Offset_",
        "_Gradient_Color_",
        "_Top_Left_",
        "_Top_Right_",
        "_Bottom_Left_",
        "_Bottom_Right_",
        "_Edge_Width_",
        "_Edge_Power_",
        "_Line_Gradient_Blend_",
        "_Fade_Out_"
      ];
      const samplers = ["_Iridescent_Map_"];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
    const defines = subMesh.materialDefines;
    if (!defines) {
      return;
    }
    const effect = subMesh.effect;
    if (!effect) {
      return;
    }
    this._activeEffect = effect;
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", this.getScene().getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", this.getScene().activeCamera.position);
    this._activeEffect.setFloat("_Radius_", this.radius);
    this._activeEffect.setFloat("_Line_Width_", this.lineWidth);
    this._activeEffect.setFloat("_Absolute_Sizes_", this.absoluteSizes ? 1 : 0);
    this._activeEffect.setFloat("_Filter_Width_", this._filterWidth);
    this._activeEffect.setDirectColor4("_Base_Color_", this.baseColor);
    this._activeEffect.setDirectColor4("_Line_Color_", this.lineColor);
    this._activeEffect.setFloat("_Radius_Top_Left_", this.radiusTopLeft);
    this._activeEffect.setFloat("_Radius_Top_Right_", this.radiusTopRight);
    this._activeEffect.setFloat("_Radius_Bottom_Left_", this.radiusBottomLeft);
    this._activeEffect.setFloat("_Radius_Bottom_Right_", this.radiusBottomRight);
    this._activeEffect.setFloat("_Rate_", this._rate);
    this._activeEffect.setDirectColor4("_Highlight_Color_", this.highlightColor);
    this._activeEffect.setFloat("_Highlight_Width_", this.highlightWidth);
    this._activeEffect.setVector4("_Highlight_Transform_", this._highlightTransform);
    this._activeEffect.setFloat("_Highlight_", this._highlight);
    this._activeEffect.setFloat("_Iridescence_Intensity_", this.iridescenceIntensity);
    this._activeEffect.setFloat("_Iridescence_Edge_Intensity_", this.iridescenceEdgeIntensity);
    this._activeEffect.setDirectColor4("_Iridescence_Tint_", this.iridescenceTint);
    this._activeEffect.setTexture("_Iridescent_Map_", this._iridescentMapTexture);
    this._activeEffect.setFloat("_Angle_", this._angle);
    this._activeEffect.setFloat("_Reflected_", this._reflected ? 1 : 0);
    this._activeEffect.setFloat("_Frequency_", this._frequency);
    this._activeEffect.setFloat("_Vertical_Offset_", this._verticalOffset);
    this._activeEffect.setDirectColor4("_Gradient_Color_", this.gradientColor);
    this._activeEffect.setDirectColor4("_Top_Left_", this.topLeftGradientColor);
    this._activeEffect.setDirectColor4("_Top_Right_", this.topRightGradientColor);
    this._activeEffect.setDirectColor4("_Bottom_Left_", this.bottomLeftGradientColor);
    this._activeEffect.setDirectColor4("_Bottom_Right_", this.bottomRightGradientColor);
    this._activeEffect.setFloat("_Edge_Width_", this.edgeWidth);
    this._activeEffect.setFloat("_Edge_Power_", this.edgePower);
    this._activeEffect.setFloat("_Line_Gradient_Blend_", this.edgeLineGradientBlend);
    this._activeEffect.setFloat("_Fade_Out_", this.fadeOut);
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _MRDLBackplateMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = super.serialize();
    serializationObject.customType = "BABYLON.MRDLBackplateMaterial";
    return serializationObject;
  }
  getClassName() {
    return "MRDLBackplateMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _MRDLBackplateMaterial(source.name, scene), source, scene, rootUrl);
  }
};
MRDLBackplateMaterial.IRIDESCENT_MAP_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-backplate-iridescence.png";
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "radius", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "lineWidth", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "absoluteSizes", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "baseColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "lineColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "radiusTopLeft", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "radiusTopRight", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "radiusBottomLeft", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "radiusBottomRight", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "highlightColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "highlightWidth", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "iridescenceIntensity", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "iridescenceEdgeIntensity", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "iridescenceTint", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "fadeOut", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "gradientColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "topLeftGradientColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "topRightGradientColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "bottomLeftGradientColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "bottomRightGradientColor", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "edgeWidth", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "edgePower", void 0);
__decorate([
  serialize()
], MRDLBackplateMaterial.prototype, "edgeLineGradientBlend", void 0);
RegisterClass("BABYLON.GUI.MRDLBackplateMaterial", MRDLBackplateMaterial);

// node_modules/@babylonjs/gui/3D/controls/slider3D.js
var SLIDER_MIN = 0;
var SLIDER_MAX = 100;
var SLIDER_VAL = 50;
var SLIDER_STEP = 0;
var SLIDER_SCALING = 1;
var SLIDER_MARGIN = 0.2;
var Slider3D = class _Slider3D extends Control3D {
  /**
   * Creates a new slider
   * @param name defines the control name
   * @param sliderBackplateVisible defines if the control has a backplate, default is false
   */
  constructor(name22, sliderBackplateVisible) {
    super(name22);
    this.onValueChangedObservable = new Observable();
    this._sliderBackplateVisible = sliderBackplateVisible || false;
    this._minimum = SLIDER_MIN;
    this._maximum = SLIDER_MAX;
    this._step = SLIDER_STEP;
    this._value = SLIDER_VAL;
  }
  /**
   * Gets the mesh used to render this control
   */
  get mesh() {
    if (this.node) {
      return this._sliderThumb;
    }
    return null;
  }
  /** Gets or sets minimum value */
  get minimum() {
    return this._minimum;
  }
  set minimum(value) {
    if (this._minimum === value) {
      return;
    }
    this._minimum = Math.max(value, SLIDER_MIN);
    this._value = Math.max(Math.min(this._value, this._maximum), this._minimum);
  }
  /** Gets or sets maximum value */
  get maximum() {
    return this._maximum;
  }
  set maximum(value) {
    if (this._maximum === value) {
      return;
    }
    this._maximum = Math.max(value, this._minimum);
    this._value = Math.max(Math.min(this._value, this._maximum), this._minimum);
  }
  /** Gets or sets step value */
  get step() {
    return this._step;
  }
  set step(value) {
    if (this._step === value) {
      return;
    }
    this._step = Math.max(Math.min(value, this._maximum - this._minimum), SLIDER_STEP);
  }
  /** Gets or sets current value */
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._value === value) {
      return;
    }
    this._value = Math.max(Math.min(value, this._maximum), this._minimum);
    if (this._sliderThumb) {
      this._sliderThumb.position.x = this._convertToPosition(this.value);
    }
    this.onValueChangedObservable.notifyObservers(this._value);
  }
  get start() {
    if (!this.node) {
      return -SLIDER_SCALING / 2;
    }
    return this._sliderBar.position.x - this._sliderBar.scaling.x / 2;
  }
  get end() {
    if (!this.node) {
      return SLIDER_SCALING / 2;
    }
    return this._sliderBar.position.x + this._sliderBar.scaling.x / 2;
  }
  /**
   * Gets the slider bar material used by this control
   */
  get sliderBarMaterial() {
    return this._sliderBarMaterial;
  }
  /**
   * Gets the slider thumb material used by this control
   */
  get sliderThumbMaterial() {
    return this._sliderThumbMaterial;
  }
  /**
   * Gets the slider backplate material used by this control
   */
  get sliderBackplateMaterial() {
    return this._sliderBackplateMaterial;
  }
  /** Sets a boolean indicating if the control is visible */
  set isVisible(value) {
    var _a;
    if (this._isVisible === value) {
      return;
    }
    this._isVisible = value;
    (_a = this.node) == null ? void 0 : _a.setEnabled(value);
  }
  // Mesh association
  _createNode(scene) {
    const sliderBackplate = CreateBox(`${this.name}_sliderbackplate`, {
      width: 1,
      height: 1,
      depth: 1
    }, scene);
    sliderBackplate.isPickable = false;
    sliderBackplate.visibility = 0;
    sliderBackplate.scaling = new Vector3(1, 0.5, 0.8);
    SceneLoader.ImportMeshAsync(void 0, _Slider3D.MODEL_BASE_URL, _Slider3D.MODEL_FILENAME, scene).then((result) => {
      result.meshes.forEach((m) => {
        m.isPickable = false;
      });
      const sliderBackplateModel = result.meshes[1];
      const sliderBarModel = result.meshes[1].clone(`${this.name}_sliderbar`, sliderBackplate);
      const sliderThumbModel = result.meshes[1].clone(`${this.name}_sliderthumb`, sliderBackplate);
      sliderBackplateModel.visibility = 0;
      if (this._sliderBackplateVisible) {
        sliderBackplateModel.visibility = 1;
        sliderBackplateModel.name = `${this.name}_sliderbackplate`;
        sliderBackplateModel.scaling.x = 1;
        sliderBackplateModel.scaling.z = 0.2;
        sliderBackplateModel.parent = sliderBackplate;
        if (this._sliderBackplateMaterial) {
          sliderBackplateModel.material = this._sliderBackplateMaterial;
        }
        this._sliderBackplate = sliderBackplateModel;
      }
      if (sliderBarModel) {
        sliderBarModel.parent = sliderBackplate;
        sliderBarModel.position.z = -0.1;
        sliderBarModel.scaling = new Vector3(SLIDER_SCALING - SLIDER_MARGIN, 0.04, 0.3);
        if (this._sliderBarMaterial) {
          sliderBarModel.material = this._sliderBarMaterial;
        }
        this._sliderBar = sliderBarModel;
      }
      if (sliderThumbModel) {
        sliderThumbModel.parent = sliderBackplate;
        sliderThumbModel.isPickable = true;
        sliderThumbModel.position.z = -0.115;
        sliderThumbModel.scaling = new Vector3(0.025, 0.3, 0.6);
        sliderThumbModel.position.x = this._convertToPosition(this.value);
        sliderThumbModel.addBehavior(this._createBehavior());
        if (this._sliderThumbMaterial) {
          sliderThumbModel.material = this._sliderThumbMaterial;
        }
        this._sliderThumb = sliderThumbModel;
      }
      this._injectGUI3DReservedDataStore(sliderBackplate).control = this;
      sliderBackplate.getChildMeshes().forEach((mesh) => {
        this._injectGUI3DReservedDataStore(mesh).control = this;
      });
    });
    this._affectMaterial(sliderBackplate);
    return sliderBackplate;
  }
  _affectMaterial(mesh) {
    this._sliderBackplateMaterial = this._sliderBackplateMaterial ?? new MRDLBackplateMaterial(`${this.name}_sliderbackplate_material`, mesh.getScene());
    this._sliderBarMaterial = this._sliderBarMaterial ?? new MRDLSliderBarMaterial(`${this.name}_sliderbar_material`, mesh.getScene());
    this._sliderThumbMaterial = this._sliderThumbMaterial ?? new MRDLSliderThumbMaterial(`${this.name}_sliderthumb_material`, mesh.getScene());
  }
  _createBehavior() {
    const pointerDragBehavior = new PointerDragBehavior({ dragAxis: Vector3.Right() });
    pointerDragBehavior.moveAttached = false;
    pointerDragBehavior.onDragStartObservable.add(() => {
      this._draggedPosition = this._sliderThumb.position.x;
    });
    pointerDragBehavior.onDragObservable.add((event) => {
      this._draggedPosition += event.dragDistance / this.scaling.x;
      this.value = this._convertToValue(this._draggedPosition);
    });
    return pointerDragBehavior;
  }
  _convertToPosition(value) {
    const position = (value - this.minimum) / (this.maximum - this.minimum) * (this.end - this.start) + this.start;
    return Math.min(Math.max(position, this.start), this.end);
  }
  _convertToValue(position) {
    let value = (position - this.start) / (this.end - this.start) * (this.maximum - this.minimum);
    value = this.step ? Math.round(value / this.step) * this.step : value;
    return Math.max(Math.min(this.minimum + value, this._maximum), this._minimum);
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    var _a, _b, _c, _d, _e, _f;
    super.dispose();
    (_a = this._sliderBar) == null ? void 0 : _a.dispose();
    (_b = this._sliderThumb) == null ? void 0 : _b.dispose();
    (_c = this._sliderBarMaterial) == null ? void 0 : _c.dispose();
    (_d = this._sliderThumbMaterial) == null ? void 0 : _d.dispose();
    (_e = this._sliderBackplate) == null ? void 0 : _e.dispose();
    (_f = this._sliderBackplateMaterial) == null ? void 0 : _f.dispose();
  }
};
Slider3D.MODEL_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
Slider3D.MODEL_FILENAME = "mrtk-fluent-backplate.glb";

// node_modules/@babylonjs/gui/3D/controls/spherePanel.js
var SpherePanel = class extends VolumeBasedPanel {
  constructor() {
    super(...arguments);
    this._radius = 5;
  }
  /**
   * Gets or sets the radius of the sphere where to project controls (5 by default)
   */
  get radius() {
    return this._radius;
  }
  set radius(value) {
    if (this._radius === value) {
      return;
    }
    this._radius = value;
    Tools.SetImmediate(() => {
      this._arrangeChildren();
    });
  }
  _mapGridNode(control, nodePosition) {
    const mesh = control.mesh;
    if (!mesh) {
      return;
    }
    const newPos = this._sphericalMapping(nodePosition);
    control.position = newPos;
    switch (this.orientation) {
      case Container3D.FACEORIGIN_ORIENTATION:
        mesh.lookAt(new Vector3(2 * newPos.x, 2 * newPos.y, 2 * newPos.z));
        break;
      case Container3D.FACEORIGINREVERSED_ORIENTATION:
        mesh.lookAt(new Vector3(-newPos.x, -newPos.y, -newPos.z));
        break;
      case Container3D.FACEFORWARD_ORIENTATION:
        break;
      case Container3D.FACEFORWARDREVERSED_ORIENTATION:
        mesh.rotate(Axis.Y, Math.PI, Space.LOCAL);
        break;
    }
  }
  _sphericalMapping(source) {
    const newPos = new Vector3(0, 0, this._radius);
    const xAngle = source.y / this._radius;
    const yAngle = -(source.x / this._radius);
    Matrix.RotationYawPitchRollToRef(yAngle, xAngle, 0, TmpVectors.Matrix[0]);
    return Vector3.TransformNormal(newPos, TmpVectors.Matrix[0]);
  }
};

// node_modules/@babylonjs/gui/3D/controls/stackPanel3D.js
var StackPanel3D = class extends Container3D {
  /**
   * Gets or sets a boolean indicating if the stack panel is vertical or horizontal (horizontal by default)
   */
  get isVertical() {
    return this._isVertical;
  }
  set isVertical(value) {
    if (this._isVertical === value) {
      return;
    }
    this._isVertical = value;
    Tools.SetImmediate(() => {
      this._arrangeChildren();
    });
  }
  /**
   * Creates new StackPanel
   * @param isVertical
   */
  constructor(isVertical = false) {
    super();
    this._isVertical = false;
    this.margin = 0.1;
    this._isVertical = isVertical;
  }
  _arrangeChildren() {
    let width = 0;
    let height = 0;
    let controlCount = 0;
    const extendSizes = [];
    const currentInverseWorld = Matrix.Invert(this.node.computeWorldMatrix(true));
    for (const child of this._children) {
      if (!child.mesh) {
        continue;
      }
      controlCount++;
      child.mesh.computeWorldMatrix(true);
      child.mesh.getWorldMatrix().multiplyToRef(currentInverseWorld, TmpVectors.Matrix[0]);
      const boundingBox = child.mesh.getBoundingInfo().boundingBox;
      const extendSize = Vector3.TransformNormal(boundingBox.extendSize, TmpVectors.Matrix[0]);
      extendSizes.push(extendSize);
      if (this._isVertical) {
        height += extendSize.y;
      } else {
        width += extendSize.x;
      }
    }
    if (this._isVertical) {
      height += (controlCount - 1) * this.margin / 2;
    } else {
      width += (controlCount - 1) * this.margin / 2;
    }
    let offset;
    if (this._isVertical) {
      offset = -height;
    } else {
      offset = -width;
    }
    let index = 0;
    for (const child of this._children) {
      if (!child.mesh) {
        continue;
      }
      controlCount--;
      const extendSize = extendSizes[index++];
      if (this._isVertical) {
        child.position.y = offset + extendSize.y;
        child.position.x = 0;
        offset += extendSize.y * 2;
      } else {
        child.position.x = offset + extendSize.x;
        child.position.y = 0;
        offset += extendSize.x * 2;
      }
      offset += controlCount > 0 ? this.margin : 0;
    }
  }
};

// node_modules/@babylonjs/gui/3D/controls/touchMeshButton3D.js
var TouchMeshButton3D = class extends TouchButton3D {
  /**
   * Creates a new 3D button based on a mesh
   * @param mesh mesh to become a 3D button. By default this is also the mesh for near interaction collision checking
   * @param name defines the control name
   */
  constructor(mesh, name22) {
    super(name22, mesh);
    this._currentMesh = mesh;
    this.pointerEnterAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(1.1);
    };
    this.pointerOutAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(1 / 1.1);
    };
    this.pointerDownAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(0.95);
    };
    this.pointerUpAnimation = () => {
      if (!this.mesh) {
        return;
      }
      this.mesh.scaling.scaleInPlace(1 / 0.95);
    };
  }
  _getTypeName() {
    return "TouchMeshButton3D";
  }
  // Mesh association
  _createNode() {
    this._currentMesh.getChildMeshes().forEach((mesh) => {
      this._injectGUI3DReservedDataStore(mesh).control = this;
    });
    return this._currentMesh;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _affectMaterial(mesh) {
  }
};

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlBackglow.fragment.js
var name16 = "mrdlBackglowPixelShader";
var shader15 = `uniform vec3 cameraPosition;varying vec3 vNormal;varying vec2 vUV;uniform float _Bevel_Radius_;uniform float _Line_Width_;uniform bool _Absolute_Sizes_;uniform float _Tuning_Motion_;uniform float _Motion_;uniform float _Max_Intensity_;uniform float _Intensity_Fade_In_Exponent_;uniform float _Outer_Fuzz_Start_;uniform float _Outer_Fuzz_End_;uniform vec4 _Color_;uniform vec4 _Inner_Color_;uniform float _Blend_Exponent_;uniform float _Falloff_;uniform float _Bias_;float BiasFunc(float b,float v) {return pow(v,log(clamp(b,0.001,0.999))/log(0.5));}
void Fuzzy_Round_Rect_B33(
float Size_X,
float Size_Y,
float Radius_X,
float Radius_Y,
float Line_Width,
vec2 UV,
float Outer_Fuzz,
float Max_Outer_Fuzz,
out float Rect_Distance,
out float Inner_Distance)
{vec2 halfSize=vec2(Size_X,Size_Y)*0.5;vec2 r=max(min(vec2(Radius_X,Radius_Y),halfSize),vec2(0.001,0.001));float radius=min(r.x,r.y)-Max_Outer_Fuzz;vec2 v=abs(UV);vec2 nearestp=min(v,halfSize-r);float d=distance(nearestp,v);Inner_Distance=clamp(1.0-(radius-d)/Line_Width,0.0,1.0);Rect_Distance=clamp(1.0-(d-radius)/Outer_Fuzz,0.0,1.0)*Inner_Distance;}
void main()
{float X_Q42;float Y_Q42;X_Q42=vNormal.x;Y_Q42=vNormal.y;float MaxAB_Q24=max(_Tuning_Motion_,_Motion_);float Sqrt_F_Q27=sqrt(MaxAB_Q24);float Power_Q43=pow(MaxAB_Q24,_Intensity_Fade_In_Exponent_);float Value_At_T_Q26=mix(_Outer_Fuzz_Start_,_Outer_Fuzz_End_,Sqrt_F_Q27);float Product_Q23=_Max_Intensity_*Power_Q43;float Rect_Distance_Q33;float Inner_Distance_Q33;Fuzzy_Round_Rect_B33(X_Q42,Y_Q42,_Bevel_Radius_,_Bevel_Radius_,_Line_Width_,vUV,Value_At_T_Q26,_Outer_Fuzz_Start_,Rect_Distance_Q33,Inner_Distance_Q33);float Power_Q44=pow(Inner_Distance_Q33,_Blend_Exponent_);float Result_Q45=pow(BiasFunc(_Bias_,Rect_Distance_Q33),_Falloff_);vec4 Color_At_T_Q25=mix(_Inner_Color_,_Color_,Power_Q44);float Product_Q22=Result_Q45*Product_Q23;vec4 Result_Q28=Product_Q22*Color_At_T_Q25;vec4 Out_Color=Result_Q28;float Clip_Threshold=0.0;gl_FragColor=Out_Color;}`;
ShaderStore.ShadersStore[name16] = shader15;

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlBackglow.vertex.js
var name17 = "mrdlBackglowVertexShader";
var shader16 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;attribute vec3 tangent;uniform float _Bevel_Radius_;uniform float _Line_Width_;uniform bool _Absolute_Sizes_;uniform float _Tuning_Motion_;uniform float _Motion_;uniform float _Max_Intensity_;uniform float _Intensity_Fade_In_Exponent_;uniform float _Outer_Fuzz_Start_;uniform float _Outer_Fuzz_End_;uniform vec4 _Color_;uniform vec4 _Inner_Color_;uniform float _Blend_Exponent_;uniform float _Falloff_;uniform float _Bias_;varying vec3 vNormal;varying vec2 vUV;void main()
{vec3 Dir_World_Q41=(world*vec4(tangent,0.0)).xyz;vec3 Dir_World_Q40=(world*vec4((cross(normal,tangent)),0.0)).xyz;float MaxAB_Q24=max(_Tuning_Motion_,_Motion_);float Length_Q16=length(Dir_World_Q41);float Length_Q17=length(Dir_World_Q40);bool Greater_Than_Q37=MaxAB_Q24>0.0;vec3 Sizes_Q35;vec2 XY_Q35;Sizes_Q35=(_Absolute_Sizes_ ? vec3(Length_Q16,Length_Q17,0) : vec3(Length_Q16/Length_Q17,1,0));XY_Q35=(uv-vec2(0.5,0.5))*Sizes_Q35.xy;vec3 Result_Q38=Greater_Than_Q37 ? position : vec3(0,0,0);vec3 Pos_World_Q39=(world*vec4(Result_Q38,1.0)).xyz;vec3 Position=Pos_World_Q39;vec3 Normal=Sizes_Q35;vec2 UV=XY_Q35;vec3 Tangent=vec3(0,0,0);vec3 Binormal=vec3(0,0,0);vec4 Color=vec4(1,1,1,1);gl_Position=viewProjection*vec4(Position,1);vNormal=Normal;vUV=UV;}`;
ShaderStore.ShadersStore[name17] = shader16;

// node_modules/@babylonjs/gui/3D/materials/mrdl/mrdlBackglowMaterial.js
var MRDLBackglowMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this._needNormals = true;
    this._needUVs = true;
    this.rebuild();
  }
};
var MRDLBackglowMaterial = class _MRDLBackglowMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.bevelRadius = 0.16;
    this.lineWidth = 0.16;
    this.absoluteSizes = false;
    this.tuningMotion = 0;
    this.motion = 1;
    this.maxIntensity = 0.7;
    this.intensityFadeInExponent = 2;
    this.outerFuzzStart = 0.04;
    this.outerFuzzEnd = 0.04;
    this.color = new Color4(0.682353, 0.698039, 1, 1);
    this.innerColor = new Color4(0.356863, 0.392157, 0.796078, 1);
    this.blendExponent = 1.5;
    this.falloff = 2;
    this.bias = 0.5;
    this.alphaMode = Constants.ALPHA_ADD;
    this.disableDepthWrite = true;
    this.backFaceCulling = false;
  }
  needAlphaBlending() {
    return true;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  // Methods
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new MRDLBackglowMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, false, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "mrdlBackglow";
      const join = defines.toString();
      const uniforms = [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "viewProjection",
        "cameraPosition",
        "_Bevel_Radius_",
        "_Line_Width_",
        "_Absolute_Sizes_",
        "_Tuning_Motion_",
        "_Motion_",
        "_Max_Intensity_",
        "_Intensity_Fade_In_Exponent_",
        "_Outer_Fuzz_Start_",
        "_Outer_Fuzz_End_",
        "_Color_",
        "_Inner_Color_",
        "_Blend_Exponent_",
        "_Falloff_",
        "_Bias_"
      ];
      const samplers = [];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
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
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", scene.activeCamera.position);
    this._activeEffect.setFloat("_Bevel_Radius_", this.bevelRadius);
    this._activeEffect.setFloat("_Line_Width_", this.lineWidth);
    this._activeEffect.setFloat("_Absolute_Sizes_", this.absoluteSizes ? 1 : 0);
    this._activeEffect.setFloat("_Tuning_Motion_", this.tuningMotion);
    this._activeEffect.setFloat("_Motion_", this.motion);
    this._activeEffect.setFloat("_Max_Intensity_", this.maxIntensity);
    this._activeEffect.setFloat("_Intensity_Fade_In_Exponent_", this.intensityFadeInExponent);
    this._activeEffect.setFloat("_Outer_Fuzz_Start_", this.outerFuzzStart);
    this._activeEffect.setFloat("_Outer_Fuzz_End_", this.outerFuzzEnd);
    this._activeEffect.setDirectColor4("_Color_", this.color);
    this._activeEffect.setDirectColor4("_Inner_Color_", this.innerColor);
    this._activeEffect.setFloat("_Blend_Exponent_", this.blendExponent);
    this._activeEffect.setFloat("_Falloff_", this.falloff);
    this._activeEffect.setFloat("_Bias_", this.bias);
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _MRDLBackglowMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.MRDLBackglowMaterial";
    return serializationObject;
  }
  getClassName() {
    return "MRDLBackglowMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _MRDLBackglowMaterial(source.name, scene), source, scene, rootUrl);
  }
};
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "bevelRadius", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "lineWidth", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "absoluteSizes", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "tuningMotion", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "motion", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "maxIntensity", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "intensityFadeInExponent", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "outerFuzzStart", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "outerFuzzEnd", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "color", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "innerColor", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "blendExponent", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "falloff", void 0);
__decorate([
  serialize()
], MRDLBackglowMaterial.prototype, "bias", void 0);
RegisterClass("BABYLON.GUI.MRDLBackglowMaterial", MRDLBackglowMaterial);

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlFrontplate.fragment.js
var name18 = "mrdlFrontplatePixelShader";
var shader17 = `uniform vec3 cameraPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;uniform float _Radius_;uniform float _Line_Width_;uniform bool _Relative_To_Height_;uniform float _Filter_Width_;uniform vec4 _Edge_Color_;uniform float _Fade_Out_;uniform bool _Smooth_Edges_;uniform bool _Blob_Enable_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Inner_Fade_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform float _Blob_Pulse_Max_Size_;uniform bool _Blob_Enable_2_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Inner_Fade_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform float _Gaze_Intensity_;uniform float _Gaze_Focus_;uniform sampler2D _Blob_Texture_;uniform float _Selection_Fuzz_;uniform float _Selected_;uniform float _Selection_Fade_;uniform float _Selection_Fade_Size_;uniform float _Selected_Distance_;uniform float _Selected_Fade_Length_;uniform float _Proximity_Max_Intensity_;uniform float _Proximity_Far_Distance_;uniform float _Proximity_Near_Radius_;uniform float _Proximity_Anisotropy_;uniform bool _Use_Global_Left_Index_;uniform bool _Use_Global_Right_Index_;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;void Scale_Color_B54(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=Scalar*Color;}
void Scale_RGB_B50(
vec4 Color,
float Scalar,
out vec4 Result)
{Result=vec4(Scalar,Scalar,Scalar,1)*Color;}
void Proximity_Fragment_B51(
float Proximity_Max_Intensity,
float Proximity_Near_Radius,
vec4 Deltas,
float Show_Selection,
float Distance_Fade1,
float Distance_Fade2,
float Strength,
out float Proximity)
{float proximity1=(1.0-clamp(length(Deltas.xy)/Proximity_Near_Radius,0.0,1.0))*Distance_Fade1;float proximity2=(1.0-clamp(length(Deltas.zw)/Proximity_Near_Radius,0.0,1.0))*Distance_Fade2;Proximity=Strength*(Proximity_Max_Intensity*max(proximity1,proximity2) *(1.0-Show_Selection)+Show_Selection);}
void Blob_Fragment_B56(
vec2 UV,
vec3 Blob_Info,
sampler2D Blob_Texture,
out vec4 Blob_Color)
{float k=dot(UV,UV);Blob_Color=Blob_Info.y*texture(Blob_Texture,vec2(vec2(sqrt(k),Blob_Info.x).x,1.0-vec2(sqrt(k),Blob_Info.x).y))*(1.0-clamp(k,0.0,1.0));}
void Round_Rect_Fragment_B61(
float Radius,
vec4 Line_Color,
float Filter_Width,
float Line_Visibility,
vec4 Fill_Color,
bool Smooth_Edges,
vec4 Rect_Parms,
out float Inside_Rect)
{float d=length(max(abs(Rect_Parms.zw)-Rect_Parms.xy,0.0));float dx=max(fwidth(d)*Filter_Width,0.00001);Inside_Rect=Smooth_Edges ? clamp((Radius-d)/dx,0.0,1.0) : 1.0-step(Radius,d);}
void main()
{float Is_Quad_Q53;Is_Quad_Q53=vNormal.z;vec4 Blob_Color_Q56;Blob_Fragment_B56(vUV,vTangent,_Blob_Texture_,Blob_Color_Q56);float X_Q52;float Y_Q52;float Z_Q52;float W_Q52;X_Q52=vExtra3.x;Y_Q52=vExtra3.y;Z_Q52=vExtra3.z;W_Q52=vExtra3.w;float Proximity_Q51;Proximity_Fragment_B51(_Proximity_Max_Intensity_,_Proximity_Near_Radius_,vExtra2,X_Q52,Y_Q52,Z_Q52,1.0,Proximity_Q51);float Inside_Rect_Q61;Round_Rect_Fragment_B61(W_Q52,vec4(1,1,1,1),_Filter_Width_,1.0,vec4(0,0,0,0),_Smooth_Edges_,vExtra1,Inside_Rect_Q61);vec4 Result_Q50;Scale_RGB_B50(_Edge_Color_,Proximity_Q51,Result_Q50);vec4 Result_Q47=Inside_Rect_Q61*Blob_Color_Q56;vec4 Color_At_T_Q48=mix(Result_Q50,Result_Q47,Is_Quad_Q53);vec4 Result_Q54;Scale_Color_B54(Color_At_T_Q48,_Fade_Out_,Result_Q54);vec4 Out_Color=Result_Q54;float Clip_Threshold=0.001;bool To_sRGB=false;gl_FragColor=Out_Color;}`;
ShaderStore.ShadersStore[name18] = shader17;

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlFrontplate.vertex.js
var name19 = "mrdlFrontplateVertexShader";
var shader18 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;attribute vec3 tangent;attribute vec4 color;uniform float _Radius_;uniform float _Line_Width_;uniform bool _Relative_To_Height_;uniform float _Filter_Width_;uniform vec4 _Edge_Color_;uniform float _Fade_Out_;uniform bool _Smooth_Edges_;uniform bool _Blob_Enable_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Inner_Fade_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform float _Blob_Pulse_Max_Size_;uniform bool _Blob_Enable_2_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Inner_Fade_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform float _Gaze_Intensity_;uniform float _Gaze_Focus_;uniform sampler2D _Blob_Texture_;uniform float _Selection_Fuzz_;uniform float _Selected_;uniform float _Selection_Fade_;uniform float _Selection_Fade_Size_;uniform float _Selected_Distance_;uniform float _Selected_Fade_Length_;uniform float _Proximity_Max_Intensity_;uniform float _Proximity_Far_Distance_;uniform float _Proximity_Near_Radius_;uniform float _Proximity_Anisotropy_;uniform bool _Use_Global_Left_Index_;uniform bool _Use_Global_Right_Index_;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;void Blob_Vertex_B40(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
vec4 Vx_Color,
vec2 UV,
vec3 Face_Center,
vec2 Face_Size,
vec2 In_UV,
float Blob_Fade_Length,
float Selection_Fade,
float Selection_Fade_Size,
float Inner_Fade,
float Blob_Pulse,
float Blob_Fade,
float Blob_Enabled,
float DistanceOffset,
out vec3 Out_Position,
out vec2 Out_UV,
out vec3 Blob_Info,
out vec2 Blob_Relative_UV)
{float blobSize,fadeIn;vec3 Hit_Position;Blob_Info=vec3(0.0,0.0,0.0);float Hit_Distance=dot(Blob_Position-Face_Center,Normal)+DistanceOffset*Blob_Far_Distance;Hit_Position=Blob_Position-Hit_Distance*Normal;float absD=abs(Hit_Distance);float lerpVal=clamp((absD-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);fadeIn=1.0-clamp((absD-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float innerFade=1.0-clamp(-Hit_Distance/Inner_Fade,0.0,1.0);float farClip=clamp(1.0-step(Blob_Far_Distance+Blob_Fade_Length,absD),0.0,1.0);float size=mix(Blob_Near_Size,Blob_Far_Size,lerpVal)*farClip;blobSize=mix(size,Selection_Fade_Size,Selection_Fade)*innerFade*Blob_Enabled;Blob_Info.x=lerpVal*0.5+0.5;Blob_Info.y=fadeIn*Intensity*(1.0-Selection_Fade)*Blob_Fade;Blob_Info.x*=(1.0-Blob_Pulse);vec3 delta=Hit_Position-Face_Center;vec2 blobCenterXY=vec2(dot(delta,Tangent),dot(delta,Bitangent));vec2 quadUVin=2.0*UV-1.0; 
vec2 blobXY=blobCenterXY+quadUVin*blobSize;vec2 blobClipped=clamp(blobXY,-Face_Size*0.5,Face_Size*0.5);vec2 blobUV=(blobClipped-blobCenterXY)/max(blobSize,0.0001)*2.0;vec3 blobCorner=Face_Center+blobClipped.x*Tangent+blobClipped.y*Bitangent;Out_Position=mix(Position,blobCorner,Vx_Color.rrr);Out_UV=mix(In_UV,blobUV,Vx_Color.rr);Blob_Relative_UV=blobClipped/Face_Size.y;}
void Round_Rect_Vertex_B36(
vec2 UV,
vec3 Tangent,
vec3 Binormal,
float Radius,
float Anisotropy,
vec2 Blob_Center_UV,
out vec2 Rect_UV,
out vec2 Scale_XY,
out vec4 Rect_Parms)
{Scale_XY=vec2(Anisotropy,1.0);Rect_UV=(UV-vec2(0.5,0.5))*Scale_XY;Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius);Rect_Parms.zw=Blob_Center_UV;}
vec2 ProjectProximity(
vec3 blobPosition,
vec3 position,
vec3 center,
vec3 dir,
vec3 xdir,
vec3 ydir,
out float vdistance
)
{vec3 delta=blobPosition-position;vec2 xy=vec2(dot(delta,xdir),dot(delta,ydir));vdistance=abs(dot(delta,dir));return xy;}
void Proximity_Vertex_B33(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec3 Position,
float Proximity_Far_Distance,
float Relative_Scale,
float Proximity_Anisotropy,
vec3 Normal,
vec3 Tangent,
vec3 Binormal,
out vec4 Extra,
out float Distance_To_Face,
out float Distance_Fade1,
out float Distance_Fade2)
{float distz1,distz2;Extra.xy=ProjectProximity(Blob_Position,Position,Face_Center,Normal,Tangent*Proximity_Anisotropy,Binormal,distz1)/Relative_Scale;Extra.zw=ProjectProximity(Blob_Position_2,Position,Face_Center,Normal,Tangent*Proximity_Anisotropy,Binormal,distz2)/Relative_Scale;Distance_To_Face=dot(Normal,Position-Face_Center);Distance_Fade1=1.0-clamp(distz1/Proximity_Far_Distance,0.0,1.0);Distance_Fade2=1.0-clamp(distz2/Proximity_Far_Distance,0.0,1.0);}
void Object_To_World_Pos_B12(
vec3 Pos_Object,
out vec3 Pos_World)
{Pos_World=(world*vec4(Pos_Object,1.0)).xyz;}
void Choose_Blob_B27(
vec4 Vx_Color,
vec3 Position1,
vec3 Position2,
bool Blob_Enable_1,
bool Blob_Enable_2,
float Near_Size_1,
float Near_Size_2,
float Blob_Inner_Fade_1,
float Blob_Inner_Fade_2,
float Blob_Pulse_1,
float Blob_Pulse_2,
float Blob_Fade_1,
float Blob_Fade_2,
out vec3 Position,
out float Near_Size,
out float Inner_Fade,
out float Blob_Enable,
out float Fade,
out float Pulse)
{Position=Position1*(1.0-Vx_Color.g)+Vx_Color.g*Position2;float b1=Blob_Enable_1 ? 1.0 : 0.0;float b2=Blob_Enable_2 ? 1.0 : 0.0;Blob_Enable=b1+(b2-b1)*Vx_Color.g;Pulse=Blob_Pulse_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Pulse_2;Fade=Blob_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Fade_2;Near_Size=Near_Size_1*(1.0-Vx_Color.g)+Vx_Color.g*Near_Size_2;Inner_Fade=Blob_Inner_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Inner_Fade_2;}
void Move_Verts_B32(
vec2 UV,
float Radius,
float Anisotropy,
float Line_Width,
float Visible,
out vec3 New_P,
out vec2 New_UV)
{vec2 xy=2.0*UV-vec2(0.5,0.5);vec2 center=clamp(xy,0.0,1.0);vec2 delta=2.0*(xy-center);float deltaLength=length(delta);vec2 aniso=vec2(1.0/Anisotropy,1.0);center=(center-vec2(0.5,0.5))*(1.0-2.0*Radius*aniso);New_UV=vec2((2.0-2.0*deltaLength)*Visible,0.0);float deltaRadius= (Radius-Line_Width*New_UV.x);New_P.xy=(center+deltaRadius/deltaLength *aniso*delta);New_P.z=0.0;}
void Object_To_World_Dir_B14(
vec3 Dir_Object,
out vec3 Binormal_World)
{Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;}
void Proximity_Visibility_B55(
float Selection,
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Proximity_Far_Distance,
float Proximity_Radius,
vec3 Face_Center,
vec3 Normal,
vec2 Face_Size,
float Gaze,
out float Width)
{float boxMaxSize=length(Face_Size)*0.5;float d1=dot(Proximity_Center-Face_Center,Normal);vec3 blob1=Proximity_Center-d1*Normal;float d2=dot(Proximity_Center_2-Face_Center,Normal);vec3 blob2=Proximity_Center_2-d2*Normal;vec3 delta1=blob1-Face_Center;vec3 delta2=blob2-Face_Center;float dist1=dot(delta1,delta1);float dist2=dot(delta2,delta2);float nearestProxDist=sqrt(min(dist1,dist2));Width=(1.0-step(boxMaxSize+Proximity_Radius,nearestProxDist))*(1.0-step(Proximity_Far_Distance,min(d1,d2))*(1.0-step(0.0001,Selection)));Width=max(Gaze,Width);}
vec2 ramp2(vec2 start,vec2 end,vec2 x)
{return clamp((x-start)/(end-start),vec2(0.0,0.0),vec2(1.0,1.0));}
float computeSelection(
vec3 blobPosition,
vec3 normal,
vec3 tangent,
vec3 bitangent,
vec3 faceCenter,
vec2 faceSize,
float selectionFuzz,
float farDistance,
float fadeLength
)
{vec3 delta=blobPosition-faceCenter;float absD=abs(dot(delta,normal));float fadeIn=1.0-clamp((absD-farDistance)/fadeLength,0.0,1.0);vec2 blobCenterXY=vec2(dot(delta,tangent),dot(delta,bitangent));vec2 innerFace=faceSize*(1.0-selectionFuzz)*0.5;vec2 selectPulse=ramp2(-faceSize*0.5,-innerFace,blobCenterXY)-ramp2(innerFace,faceSize*0.5,blobCenterXY);return selectPulse.x*selectPulse.y*fadeIn;}
void Selection_Vertex_B31(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec2 Face_Size,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Selection_Fuzz,
float Selected,
float Far_Distance,
float Fade_Length,
vec3 Active_Face_Dir,
out float Show_Selection)
{float select1=computeSelection(Blob_Position,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);float select2=computeSelection(Blob_Position_2,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);Show_Selection=mix(max(select1,select2),1.0,Selected);}
void main()
{vec3 Vec3_Q29=vec3(vec2(0,0).x,vec2(0,0).y,color.r);vec3 Nrm_World_Q24;Nrm_World_Q24=normalize((world*vec4(normal,0.0)).xyz);vec3 Face_Center_Q30;Face_Center_Q30=(world*vec4(vec3(0,0,0),1.0)).xyz;vec3 Tangent_World_Q13;Tangent_World_Q13=(world*vec4(tangent,0.0)).xyz;vec3 Result_Q42;Result_Q42=_Use_Global_Left_Index_ ? Global_Left_Index_Tip_Position.xyz : _Blob_Position_;vec3 Result_Q43;Result_Q43=_Use_Global_Right_Index_ ? Global_Right_Index_Tip_Position.xyz : _Blob_Position_2_;float Value_At_T_Q58=mix(_Blob_Near_Size_,_Blob_Pulse_Max_Size_,_Blob_Pulse_);float Value_At_T_Q59=mix(_Blob_Near_Size_2_,_Blob_Pulse_Max_Size_,_Blob_Pulse_2_);vec3 Cross_Q70=cross(normal,tangent);float Product_Q45=_Gaze_Intensity_*_Gaze_Focus_;float Step_Q46=step(0.0001,Product_Q45);vec3 Tangent_World_N_Q15=normalize(Tangent_World_Q13);vec3 Position_Q27;float Near_Size_Q27;float Inner_Fade_Q27;float Blob_Enable_Q27;float Fade_Q27;float Pulse_Q27;Choose_Blob_B27(color,Result_Q42,Result_Q43,_Blob_Enable_,_Blob_Enable_2_,Value_At_T_Q58,Value_At_T_Q59,_Blob_Inner_Fade_,_Blob_Inner_Fade_2_,_Blob_Pulse_,_Blob_Pulse_2_,_Blob_Fade_,_Blob_Fade_2_,Position_Q27,Near_Size_Q27,Inner_Fade_Q27,Blob_Enable_Q27,Fade_Q27,Pulse_Q27);vec3 Binormal_World_Q14;Object_To_World_Dir_B14(Cross_Q70,Binormal_World_Q14);float Anisotropy_Q21=length(Tangent_World_Q13)/length(Binormal_World_Q14);vec3 Binormal_World_N_Q16=normalize(Binormal_World_Q14);vec2 Face_Size_Q35;float ScaleY_Q35;Face_Size_Q35=vec2(length(Tangent_World_Q13),length(Binormal_World_Q14));ScaleY_Q35=Face_Size_Q35.y;float Out_Radius_Q38;float Out_Line_Width_Q38;Out_Radius_Q38=_Relative_To_Height_ ? _Radius_ : _Radius_/ScaleY_Q35;Out_Line_Width_Q38=_Relative_To_Height_ ? _Line_Width_ : _Line_Width_/ScaleY_Q35;float Show_Selection_Q31;Selection_Vertex_B31(Result_Q42,Result_Q43,Face_Center_Q30,Face_Size_Q35,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,_Selection_Fuzz_,_Selected_,_Selected_Distance_,_Selected_Fade_Length_,vec3(0,0,-1),Show_Selection_Q31);float MaxAB_Q41=max(Show_Selection_Q31,Product_Q45);float Width_Q55;Proximity_Visibility_B55(Show_Selection_Q31,Result_Q42,Result_Q43,_Proximity_Far_Distance_,_Proximity_Near_Radius_,Face_Center_Q30,Nrm_World_Q24,Face_Size_Q35,Step_Q46,Width_Q55);vec3 New_P_Q32;vec2 New_UV_Q32;Move_Verts_B32(uv,Out_Radius_Q38,Anisotropy_Q21,Out_Line_Width_Q38,Width_Q55,New_P_Q32,New_UV_Q32);vec3 Pos_World_Q12;Object_To_World_Pos_B12(New_P_Q32,Pos_World_Q12);vec3 Out_Position_Q40;vec2 Out_UV_Q40;vec3 Blob_Info_Q40;vec2 Blob_Relative_UV_Q40;Blob_Vertex_B40(Pos_World_Q12,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,Position_Q27,_Blob_Intensity_,Near_Size_Q27,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,color,uv,Face_Center_Q30,Face_Size_Q35,New_UV_Q32,_Blob_Fade_Length_,_Selection_Fade_,_Selection_Fade_Size_,Inner_Fade_Q27,Pulse_Q27,Fade_Q27,Blob_Enable_Q27,0.0,Out_Position_Q40,Out_UV_Q40,Blob_Info_Q40,Blob_Relative_UV_Q40);vec2 Rect_UV_Q36;vec2 Scale_XY_Q36;vec4 Rect_Parms_Q36;Round_Rect_Vertex_B36(New_UV_Q32,Tangent_World_Q13,Binormal_World_Q14,Out_Radius_Q38,Anisotropy_Q21,Blob_Relative_UV_Q40,Rect_UV_Q36,Scale_XY_Q36,Rect_Parms_Q36);vec4 Extra_Q33;float Distance_To_Face_Q33;float Distance_Fade1_Q33;float Distance_Fade2_Q33;Proximity_Vertex_B33(Result_Q42,Result_Q43,Face_Center_Q30,Pos_World_Q12,_Proximity_Far_Distance_,1.0,_Proximity_Anisotropy_,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,Extra_Q33,Distance_To_Face_Q33,Distance_Fade1_Q33,Distance_Fade2_Q33);vec4 Vec4_Q37=vec4(MaxAB_Q41,Distance_Fade1_Q33,Distance_Fade2_Q33,Out_Radius_Q38);vec3 Position=Out_Position_Q40;vec3 Normal=Vec3_Q29;vec2 UV=Out_UV_Q40;vec3 Tangent=Blob_Info_Q40;vec3 Binormal=vec3(0,0,0);vec4 Color=vec4(1,1,1,1);vec4 Extra1=Rect_Parms_Q36;vec4 Extra2=Extra_Q33;vec4 Extra3=Vec4_Q37;gl_Position=viewProjection*vec4(Position,1);vNormal=Normal;vUV=UV;vTangent=Tangent;vExtra1=Extra1;vExtra2=Extra2;vExtra3=Extra3;}`;
ShaderStore.ShadersStore[name19] = shader18;

// node_modules/@babylonjs/gui/3D/materials/mrdl/mrdlFrontplateMaterial.js
var MRDLFrontplateMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this.SMOOTH_EDGES = true;
    this._needNormals = true;
    this._needUVs = true;
    this.rebuild();
  }
};
var MRDLFrontplateMaterial = class _MRDLFrontplateMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.radius = 0.12;
    this.lineWidth = 0.01;
    this.relativeToHeight = false;
    this._filterWidth = 1;
    this.edgeColor = new Color4(0.53, 0.53, 0.53, 1);
    this.blobEnable = true;
    this.blobPosition = new Vector3(100, 100, 100);
    this.blobIntensity = 0.5;
    this.blobNearSize = 0.032;
    this.blobFarSize = 0.048;
    this.blobNearDistance = 8e-3;
    this.blobFarDistance = 0.064;
    this.blobFadeLength = 0.04;
    this.blobInnerFade = 0.01;
    this.blobPulse = 0;
    this.blobFade = 1;
    this.blobPulseMaxSize = 0.05;
    this.blobEnable2 = true;
    this.blobPosition2 = new Vector3(10, 10.1, -0.6);
    this.blobNearSize2 = 8e-3;
    this.blobInnerFade2 = 0.1;
    this.blobPulse2 = 0;
    this.blobFade2 = 1;
    this.gazeIntensity = 0.8;
    this.gazeFocus = 0;
    this.selectionFuzz = 0.5;
    this.selected = 1;
    this.selectionFade = 0.2;
    this.selectionFadeSize = 0;
    this.selectedDistance = 0.08;
    this.selectedFadeLength = 0.08;
    this.proximityMaxIntensity = 0.45;
    this.proximityFarDistance = 0.16;
    this.proximityNearRadius = 0.016;
    this.proximityAnisotropy = 1;
    this.useGlobalLeftIndex = true;
    this.useGlobalRightIndex = true;
    this.fadeOut = 1;
    this.alphaMode = Constants.ALPHA_ADD;
    this.disableDepthWrite = true;
    this.backFaceCulling = false;
    this._blobTexture = new Texture(_MRDLFrontplateMaterial.BLOB_TEXTURE_URL, scene, true, false, Texture.NEAREST_SAMPLINGMODE);
  }
  needAlphaBlending() {
    return true;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  // Methods
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new MRDLFrontplateMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, false, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "mrdlFrontplate";
      const join = defines.toString();
      const uniforms = [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "viewProjection",
        "cameraPosition",
        "_Radius_",
        "_Line_Width_",
        "_Relative_To_Height_",
        "_Filter_Width_",
        "_Edge_Color_",
        "_Fade_Out_",
        "_Smooth_Edges_",
        "_Blob_Enable_",
        "_Blob_Position_",
        "_Blob_Intensity_",
        "_Blob_Near_Size_",
        "_Blob_Far_Size_",
        "_Blob_Near_Distance_",
        "_Blob_Far_Distance_",
        "_Blob_Fade_Length_",
        "_Blob_Inner_Fade_",
        "_Blob_Pulse_",
        "_Blob_Fade_",
        "_Blob_Pulse_Max_Size_",
        "_Blob_Enable_2_",
        "_Blob_Position_2_",
        "_Blob_Near_Size_2_",
        "_Blob_Inner_Fade_2_",
        "_Blob_Pulse_2_",
        "_Blob_Fade_2_",
        "_Gaze_Intensity_",
        "_Gaze_Focus_",
        "_Blob_Texture_",
        "_Selection_Fuzz_",
        "_Selected_",
        "_Selection_Fade_",
        "_Selection_Fade_Size_",
        "_Selected_Distance_",
        "_Selected_Fade_Length_",
        "_Proximity_Max_Intensity_",
        "_Proximity_Far_Distance_",
        "_Proximity_Near_Radius_",
        "_Proximity_Anisotropy_",
        "Global_Left_Index_Tip_Position",
        "Global_Right_Index_Tip_Position",
        "_Use_Global_Left_Index_",
        "_Use_Global_Right_Index_"
      ];
      const samplers = [];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
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
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", scene.activeCamera.position);
    this._activeEffect.setFloat("_Radius_", this.radius);
    this._activeEffect.setFloat("_Line_Width_", this.lineWidth);
    this._activeEffect.setFloat("_Relative_To_Height_", this.relativeToHeight ? 1 : 0);
    this._activeEffect.setFloat("_Filter_Width_", this._filterWidth);
    this._activeEffect.setDirectColor4("_Edge_Color_", this.edgeColor);
    this._activeEffect.setFloat("_Fade_Out_", this.fadeOut);
    this._activeEffect.setFloat("_Blob_Enable_", this.blobEnable ? 1 : 0);
    this._activeEffect.setVector3("_Blob_Position_", this.blobPosition);
    this._activeEffect.setFloat("_Blob_Intensity_", this.blobIntensity);
    this._activeEffect.setFloat("_Blob_Near_Size_", this.blobNearSize);
    this._activeEffect.setFloat("_Blob_Far_Size_", this.blobFarSize);
    this._activeEffect.setFloat("_Blob_Near_Distance_", this.blobNearDistance);
    this._activeEffect.setFloat("_Blob_Far_Distance_", this.blobFarDistance);
    this._activeEffect.setFloat("_Blob_Fade_Length_", this.blobFadeLength);
    this._activeEffect.setFloat("_Blob_Inner_Fade_", this.blobInnerFade);
    this._activeEffect.setFloat("_Blob_Pulse_", this.blobPulse);
    this._activeEffect.setFloat("_Blob_Fade_", this.blobFade);
    this._activeEffect.setFloat("_Blob_Pulse_Max_Size_", this.blobPulseMaxSize);
    this._activeEffect.setFloat("_Blob_Enable_2_", this.blobEnable2 ? 1 : 0);
    this._activeEffect.setVector3("_Blob_Position_2_", this.blobPosition2);
    this._activeEffect.setFloat("_Blob_Near_Size_2_", this.blobNearSize2);
    this._activeEffect.setFloat("_Blob_Inner_Fade_2_", this.blobInnerFade2);
    this._activeEffect.setFloat("_Blob_Pulse_2_", this.blobPulse2);
    this._activeEffect.setFloat("_Blob_Fade_2_", this.blobFade2);
    this._activeEffect.setFloat("_Gaze_Intensity_", this.gazeIntensity);
    this._activeEffect.setFloat("_Gaze_Focus_", this.gazeFocus);
    this._activeEffect.setTexture("_Blob_Texture_", this._blobTexture);
    this._activeEffect.setFloat("_Selection_Fuzz_", this.selectionFuzz);
    this._activeEffect.setFloat("_Selected_", this.selected);
    this._activeEffect.setFloat("_Selection_Fade_", this.selectionFade);
    this._activeEffect.setFloat("_Selection_Fade_Size_", this.selectionFadeSize);
    this._activeEffect.setFloat("_Selected_Distance_", this.selectedDistance);
    this._activeEffect.setFloat("_Selected_Fade_Length_", this.selectedFadeLength);
    this._activeEffect.setFloat("_Proximity_Max_Intensity_", this.proximityMaxIntensity);
    this._activeEffect.setFloat("_Proximity_Far_Distance_", this.proximityFarDistance);
    this._activeEffect.setFloat("_Proximity_Near_Radius_", this.proximityNearRadius);
    this._activeEffect.setFloat("_Proximity_Anisotropy_", this.proximityAnisotropy);
    this._activeEffect.setFloat("_Use_Global_Left_Index_", this.useGlobalLeftIndex ? 1 : 0);
    this._activeEffect.setFloat("_Use_Global_Right_Index_", this.useGlobalRightIndex ? 1 : 0);
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _MRDLFrontplateMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.MRDLFrontplateMaterial";
    return serializationObject;
  }
  getClassName() {
    return "MRDLFrontplateMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _MRDLFrontplateMaterial(source.name, scene), source, scene, rootUrl);
  }
};
MRDLFrontplateMaterial.BLOB_TEXTURE_URL = "";
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "radius", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "lineWidth", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "relativeToHeight", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "edgeColor", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobEnable", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobPosition", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobIntensity", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobNearSize", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobFarSize", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobNearDistance", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobFarDistance", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobFadeLength", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobInnerFade", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobPulse", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobFade", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobPulseMaxSize", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobEnable2", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobPosition2", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobNearSize2", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobInnerFade2", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobPulse2", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "blobFade2", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "gazeIntensity", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "gazeFocus", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "selectionFuzz", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "selected", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "selectionFade", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "selectionFadeSize", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "selectedDistance", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "selectedFadeLength", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "proximityMaxIntensity", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "proximityFarDistance", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "proximityNearRadius", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "proximityAnisotropy", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "useGlobalLeftIndex", void 0);
__decorate([
  serialize()
], MRDLFrontplateMaterial.prototype, "useGlobalRightIndex", void 0);
RegisterClass("BABYLON.GUI.MRDLFrontplateMaterial", MRDLFrontplateMaterial);

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlInnerquad.fragment.js
var name20 = "mrdlInnerquadPixelShader";
var shader19 = `uniform vec3 cameraPosition;varying vec2 vUV;varying vec3 vTangent;uniform vec4 _Color_;uniform float _Radius_;uniform bool _Fixed_Radius_;uniform float _Filter_Width_;uniform float _Glow_Fraction_;uniform float _Glow_Max_;uniform float _Glow_Falloff_;float FilterStep_Bid194(float edge,float x,float filterWidth)
{float dx=max(1.0E-5,fwidth(x)*filterWidth);return max((x+dx*0.5-max(edge,x-dx*0.5))/dx,0.0);}
void Round_Rect_B194(
float Size_X,
float Size_Y,
float Radius,
vec4 Rect_Color,
float Filter_Width,
vec2 UV,
float Glow_Fraction,
float Glow_Max,
float Glow_Falloff,
out vec4 Color)
{vec2 halfSize=vec2(Size_X,Size_Y)*0.5;vec2 r=max(min(vec2(Radius,Radius),halfSize),vec2(0.01,0.01));vec2 v=abs(UV);vec2 nearestp=min(v,halfSize-r);vec2 delta=(v-nearestp)/max(vec2(0.01,0.01),r);float Distance=length(delta);float insideRect=1.0-FilterStep_Bid194(1.0-Glow_Fraction,Distance,Filter_Width);float glow=clamp((1.0-Distance)/Glow_Fraction,0.0,1.0);glow=pow(glow,Glow_Falloff);Color=Rect_Color*max(insideRect,glow*Glow_Max);}
void main()
{float X_Q192;float Y_Q192;float Z_Q192;X_Q192=vTangent.x;Y_Q192=vTangent.y;Z_Q192=vTangent.z;vec4 Color_Q194;Round_Rect_B194(X_Q192,1.0,Y_Q192,_Color_,_Filter_Width_,vUV,_Glow_Fraction_,_Glow_Max_,_Glow_Falloff_,Color_Q194);vec4 Out_Color=Color_Q194;float Clip_Threshold=0.0;gl_FragColor=Out_Color;}
`;
ShaderStore.ShadersStore[name20] = shader19;

// node_modules/@babylonjs/gui/3D/materials/mrdl/shaders/mrdlInnerquad.vertex.js
var name21 = "mrdlInnerquadVertexShader";
var shader20 = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;attribute vec3 tangent;attribute vec4 color;uniform vec4 _Color_;uniform float _Radius_;uniform bool _Fixed_Radius_;uniform float _Filter_Width_;uniform float _Glow_Fraction_;uniform float _Glow_Max_;uniform float _Glow_Falloff_;varying vec2 vUV;varying vec3 vTangent;void main()
{vec3 Pos_World_Q189;Pos_World_Q189=(world*vec4(position,1.0)).xyz;vec3 Dir_World_Q190;Dir_World_Q190=(world*vec4(tangent,0.0)).xyz;vec3 Dir_World_Q191;Dir_World_Q191=(world*vec4((cross(normal,tangent)),0.0)).xyz;float Length_Q180=length(Dir_World_Q190);float Length_Q181=length(Dir_World_Q191);float Quotient_Q184=Length_Q180/Length_Q181;float Quotient_Q195=_Radius_/Length_Q181;vec2 Result_Q193;Result_Q193=vec2((uv.x-0.5)*Length_Q180/Length_Q181,(uv.y-0.5));float Result_Q198=_Fixed_Radius_ ? Quotient_Q195 : _Radius_;vec3 Vec3_Q183=vec3(Quotient_Q184,Result_Q198,0);vec3 Position=Pos_World_Q189;vec3 Normal=vec3(0,0,0);vec2 UV=Result_Q193;vec3 Tangent=Vec3_Q183;vec3 Binormal=vec3(0,0,0);vec4 Color=color;gl_Position=viewProjection*vec4(Position,1);vUV=UV;vTangent=Tangent;}
`;
ShaderStore.ShadersStore[name21] = shader20;

// node_modules/@babylonjs/gui/3D/materials/mrdl/mrdlInnerquadMaterial.js
var MRDLInnerquadMaterialDefines = class extends MaterialDefines {
  constructor() {
    super();
    this._needNormals = true;
    this._needUVs = true;
    this.rebuild();
  }
};
var MRDLInnerquadMaterial = class _MRDLInnerquadMaterial extends PushMaterial {
  constructor(name22, scene) {
    super(name22, scene);
    this.color = new Color4(1, 1, 1, 0.05);
    this.radius = 0.12;
    this.fixedRadius = true;
    this._filterWidth = 1;
    this.glowFraction = 0;
    this.glowMax = 0.5;
    this.glowFalloff = 2;
    this.alphaMode = Constants.ALPHA_COMBINE;
    this.backFaceCulling = false;
  }
  needAlphaBlending() {
    return true;
  }
  needAlphaTesting() {
    return false;
  }
  getAlphaTestTexture() {
    return null;
  }
  // Methods
  isReadyForSubMesh(mesh, subMesh) {
    const drawWrapper = subMesh._drawWrapper;
    if (this.isFrozen) {
      if (drawWrapper.effect && drawWrapper._wasPreviouslyReady) {
        return true;
      }
    }
    if (!subMesh.materialDefines) {
      subMesh.materialDefines = new MRDLInnerquadMaterialDefines();
    }
    const defines = subMesh.materialDefines;
    const scene = this.getScene();
    if (this._isReadyForSubMesh(subMesh)) {
      return true;
    }
    const engine = scene.getEngine();
    PrepareDefinesForAttributes(mesh, defines, true, false);
    if (defines.isDirty) {
      defines.markAsProcessed();
      scene.resetCachedMaterial();
      const fallbacks = new EffectFallbacks();
      if (defines.FOG) {
        fallbacks.addFallback(1, "FOG");
      }
      HandleFallbacksForShadows(defines, fallbacks);
      defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
      const attribs = [VertexBuffer.PositionKind];
      if (defines.NORMAL) {
        attribs.push(VertexBuffer.NormalKind);
      }
      if (defines.UV1) {
        attribs.push(VertexBuffer.UVKind);
      }
      if (defines.UV2) {
        attribs.push(VertexBuffer.UV2Kind);
      }
      if (defines.VERTEXCOLOR) {
        attribs.push(VertexBuffer.ColorKind);
      }
      if (defines.TANGENT) {
        attribs.push(VertexBuffer.TangentKind);
      }
      PrepareAttributesForInstances(attribs, defines);
      const shaderName = "mrdlInnerquad";
      const join = defines.toString();
      const uniforms = [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "viewProjection",
        "cameraPosition",
        "_Color_",
        "_Radius_",
        "_Fixed_Radius_",
        "_Filter_Width_",
        "_Glow_Fraction_",
        "_Glow_Max_",
        "_Glow_Falloff_"
      ];
      const samplers = [];
      const uniformBuffers = [];
      PrepareUniformsAndSamplersList({
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines,
        maxSimultaneousLights: 4
      });
      subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
        attributes: attribs,
        uniformsNames: uniforms,
        uniformBuffersNames: uniformBuffers,
        samplers,
        defines: join,
        fallbacks,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 4 }
      }, engine), defines);
    }
    if (!subMesh.effect || !subMesh.effect.isReady()) {
      return false;
    }
    defines._renderId = scene.getRenderId();
    drawWrapper._wasPreviouslyReady = true;
    return true;
  }
  bindForSubMesh(world, mesh, subMesh) {
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
    this.bindOnlyWorldMatrix(world);
    this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
    this._activeEffect.setVector3("cameraPosition", scene.activeCamera.position);
    this._activeEffect.setDirectColor4("_Color_", this.color);
    this._activeEffect.setFloat("_Radius_", this.radius);
    this._activeEffect.setFloat("_Fixed_Radius_", this.fixedRadius ? 1 : 0);
    this._activeEffect.setFloat("_Filter_Width_", this._filterWidth);
    this._activeEffect.setFloat("_Glow_Fraction_", this.glowFraction);
    this._activeEffect.setFloat("_Glow_Max_", this.glowMax);
    this._activeEffect.setFloat("_Glow_Falloff_", this.glowFalloff);
    this._afterBind(mesh, this._activeEffect, subMesh);
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    return [];
  }
  dispose(forceDisposeEffect) {
    super.dispose(forceDisposeEffect);
  }
  clone(name22) {
    return SerializationHelper.Clone(() => new _MRDLInnerquadMaterial(name22, this.getScene()), this);
  }
  serialize() {
    const serializationObject = SerializationHelper.Serialize(this);
    serializationObject.customType = "BABYLON.MRDLInnerquadMaterial";
    return serializationObject;
  }
  getClassName() {
    return "MRDLInnerquadMaterial";
  }
  // Statics
  static Parse(source, scene, rootUrl) {
    return SerializationHelper.Parse(() => new _MRDLInnerquadMaterial(source.name, scene), source, scene, rootUrl);
  }
};
__decorate([
  serialize()
], MRDLInnerquadMaterial.prototype, "color", void 0);
__decorate([
  serialize()
], MRDLInnerquadMaterial.prototype, "radius", void 0);
__decorate([
  serialize()
], MRDLInnerquadMaterial.prototype, "fixedRadius", void 0);
__decorate([
  serialize()
], MRDLInnerquadMaterial.prototype, "glowFraction", void 0);
__decorate([
  serialize()
], MRDLInnerquadMaterial.prototype, "glowMax", void 0);
__decorate([
  serialize()
], MRDLInnerquadMaterial.prototype, "glowFalloff", void 0);
RegisterClass("BABYLON.GUI.MRDLInnerquadMaterial", MRDLInnerquadMaterial);

// node_modules/@babylonjs/gui/3D/controls/MRTK3/touchHolographicButton.js
var TouchHolographicButton2 = class _TouchHolographicButton extends TouchButton3D {
  _disposeTooltip() {
    this._tooltipFade = null;
    if (this._tooltipTextBlock) {
      this._tooltipTextBlock.dispose();
    }
    if (this._tooltipTexture) {
      this._tooltipTexture.dispose();
    }
    if (this._tooltipMesh) {
      this._tooltipMesh.dispose();
    }
    this.onPointerEnterObservable.remove(this._tooltipHoverObserver);
    this.onPointerOutObservable.remove(this._tooltipOutObserver);
  }
  /**
   * Rendering ground id of all the mesh in the button
   */
  set renderingGroupId(id) {
    this._backPlate.renderingGroupId = id;
    this._textPlate.renderingGroupId = id;
    this._frontPlate.renderingGroupId = id;
    this._backGlow.renderingGroupId = id;
    this._innerQuad.renderingGroupId = id;
    if (this._tooltipMesh) {
      this._tooltipMesh.renderingGroupId = id;
    }
  }
  get renderingGroupId() {
    return this._backPlate.renderingGroupId;
  }
  /**
   * Gets the mesh used to render this control
   */
  get mesh() {
    return this._backPlate;
  }
  /**
   * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
   * Set this property after adding the button to the GUI3DManager
   */
  set tooltipText(text) {
    if (!text) {
      this._disposeTooltip();
      return;
    }
    if (!this._tooltipFade) {
      const rightHandedScene = this._backPlate._scene.useRightHandedSystem;
      this._tooltipMesh = CreatePlane("", { size: 1 }, this._backPlate._scene);
      this._tooltipMesh.position = Vector3.Down().scale(0.7).add(Vector3.Forward(rightHandedScene).scale(-0.15));
      this._tooltipMesh.isPickable = false;
      this._tooltipMesh.parent = this._frontPlateCollisionMesh;
      this._tooltipTexture = AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh);
      const tooltipBackground = new Rectangle();
      tooltipBackground.height = 0.25;
      tooltipBackground.width = 0.8;
      tooltipBackground.cornerRadius = 25;
      tooltipBackground.color = "#ffffff";
      tooltipBackground.thickness = 20;
      tooltipBackground.background = "#060668";
      this._tooltipTexture.addControl(tooltipBackground);
      this._tooltipTextBlock = new TextBlock();
      this._tooltipTextBlock.color = "white";
      this._tooltipTextBlock.fontSize = 100;
      this._tooltipTexture.addControl(this._tooltipTextBlock);
      this._tooltipFade = new FadeInOutBehavior();
      this._tooltipFade.delay = 500;
      this._tooltipMesh.addBehavior(this._tooltipFade);
      this._tooltipHoverObserver = this.onPointerEnterObservable.add(() => {
        if (this._tooltipFade) {
          this._tooltipFade.fadeIn(true);
        }
      });
      this._tooltipOutObserver = this.onPointerOutObservable.add(() => {
        if (this._tooltipFade) {
          this._tooltipFade.fadeIn(false);
        }
      });
    }
    if (this._tooltipTextBlock) {
      this._tooltipTextBlock.text = text;
    }
  }
  get tooltipText() {
    var _a;
    return ((_a = this._tooltipTextBlock) == null ? void 0 : _a.text) || null;
  }
  /**
   * Gets or sets text for the button
   */
  get text() {
    return this._text;
  }
  set text(value) {
    if (this._text === value) {
      return;
    }
    this._text = value;
    this._rebuildContent();
  }
  /**
   * Gets or sets subtext for a button with larger width
   */
  get subtext() {
    return this._subtext;
  }
  set subtext(value) {
    if (this._subtext === value) {
      return;
    }
    this._subtext = value;
    this._rebuildContent();
  }
  /**
   * Gets or sets the image url for the button
   */
  get imageUrl() {
    return this._imageUrl;
  }
  set imageUrl(value) {
    if (this._imageUrl === value) {
      return;
    }
    this._imageUrl = value;
    this._rebuildContent();
  }
  /**
   * Gets the back material used by this button
   */
  get backMaterial() {
    return this._backMaterial;
  }
  /**
   * Gets the front material used by this button
   */
  get frontMaterial() {
    return this._frontMaterial;
  }
  /**
   * Gets the back glow material used by this button
   */
  get backGlowMaterial() {
    return this._backGlowMaterial;
  }
  /**
   * Gets the inner quad material used by this button
   */
  get innerQuadMaterial() {
    return this._innerQuadMaterial;
  }
  /**
   * Gets the plate material used by this button
   */
  get plateMaterial() {
    return this._plateMaterial;
  }
  /**
   * Gets a boolean indicating if this button shares its material with other V3 Buttons
   */
  get shareMaterials() {
    return this._shareMaterials;
  }
  /**
   * Sets whether the backplate is visible or hidden. Hiding the backplate is not recommended without some sort of replacement
   */
  set isBackplateVisible(isVisible) {
    if (this.mesh && this._backMaterial) {
      if (isVisible && !this._isBackplateVisible) {
        this._backPlate.visibility = 1;
      } else if (!isVisible && this._isBackplateVisible) {
        this._backPlate.visibility = 0;
      }
    }
    this._isBackplateVisible = isVisible;
  }
  /**
   * Creates a new button
   * @param name defines the control name
   * @param shareMaterials
   */
  constructor(name22, shareMaterials = true) {
    super(name22);
    this.width = 1;
    this.height = 1;
    this.radius = 0.14;
    this.textSizeInPixels = 18;
    this.imageSizeInPixels = 40;
    this.plateMaterialColor = new Color3(0.4, 0.4, 0.4);
    this.frontPlateDepth = 0.2;
    this.backPlateDepth = 0.04;
    this.backGlowOffset = 0.1;
    this.flatPlaneDepth = 1e-3;
    this.innerQuadRadius = this.radius - 0.04;
    this.innerQuadColor = new Color4(0, 0, 0, 0);
    this.innerQuadToggledColor = new Color4(0.5197843, 0.6485234, 0.9607843, 0.6);
    this.innerQuadHoverColor = new Color4(1, 1, 1, 0.05);
    this.innerQuadToggledHoverColor = new Color4(0.5197843, 0.6485234, 0.9607843, 1);
    this._isBackplateVisible = true;
    this._shareMaterials = true;
    this._shareMaterials = shareMaterials;
    this.pointerEnterAnimation = () => {
      if (this._frontPlate && this._textPlate && !this.isToggleButton) {
        this._performEnterExitAnimation(1);
      }
      if (this.isToggleButton && this._innerQuadMaterial) {
        if (this.isToggled) {
          this._innerQuadMaterial.color = this.innerQuadToggledHoverColor;
        } else {
          this._innerQuadMaterial.color = this.innerQuadHoverColor;
        }
      }
    };
    this.pointerOutAnimation = () => {
      if (this._frontPlate && this._textPlate && !this.isToggleButton) {
        this._performEnterExitAnimation(-0.8);
      }
      if (this.isToggleButton && this._innerQuadMaterial) {
        this._onToggle(this.isToggled);
      }
    };
    this.pointerDownAnimation = () => {
    };
    this.pointerUpAnimation = () => {
    };
    this._pointerClickObserver = this.onPointerClickObservable.add(() => {
      if (this._frontPlate && this._backGlow && !this.isActiveNearInteraction) {
        this._performClickAnimation();
      }
      if (this.isToggleButton && this._innerQuadMaterial) {
        this._onToggle(this.isToggled);
      }
    });
    this._pointerEnterObserver = this.onPointerEnterObservable.add(() => {
      this.pointerEnterAnimation();
    });
    this._pointerOutObserver = this.onPointerOutObservable.add(() => {
      this.pointerOutAnimation();
    });
    this._toggleObserver = this.onToggleObservable.add((isToggled) => {
      if (isToggled) {
        this._innerQuadMaterial.color = this.innerQuadToggledColor;
      } else {
        this._innerQuadMaterial.color = this.innerQuadColor;
      }
    });
  }
  _getTypeName() {
    return "TouchHolographicButton";
  }
  _rebuildContent() {
    let content;
    if (this._getAspectRatio() <= 1) {
      content = this._alignContentVertically();
    } else {
      content = this._alignContentHorizontally();
    }
    this.content = content;
  }
  _getAspectRatio() {
    return this.width / this.height;
  }
  _alignContentVertically() {
    const panel = new StackPanel();
    panel.isVertical = true;
    if (IsDocumentAvailable() && !!document.createElement) {
      if (this._imageUrl) {
        const image = new Image();
        image.source = this._imageUrl;
        image.heightInPixels = 180;
        image.widthInPixels = 100;
        image.paddingTopInPixels = 40;
        image.paddingBottomInPixels = 40;
        panel.addControl(image);
      }
    }
    if (this._text) {
      const text = new TextBlock();
      text.text = this._text;
      text.color = "white";
      text.heightInPixels = 30;
      text.fontSize = 24;
      panel.addControl(text);
    }
    return panel;
  }
  _alignContentHorizontally() {
    let totalPanelWidthInPixels = 240;
    const padding = 15;
    const contentContainer = new Rectangle();
    contentContainer.widthInPixels = totalPanelWidthInPixels;
    contentContainer.heightInPixels = totalPanelWidthInPixels;
    contentContainer.color = "transparent";
    contentContainer.setPaddingInPixels(padding, padding, padding, padding);
    totalPanelWidthInPixels -= padding * 2;
    const panel = new StackPanel();
    panel.isVertical = false;
    panel.scaleY = this._getAspectRatio();
    if (IsDocumentAvailable() && !!document.createElement) {
      if (this._imageUrl) {
        const imageContainer = new Rectangle(`${this.name}_image`);
        imageContainer.widthInPixels = this.imageSizeInPixels;
        imageContainer.heightInPixels = this.imageSizeInPixels;
        imageContainer.color = "transparent";
        totalPanelWidthInPixels -= this.imageSizeInPixels;
        const image = new Image();
        image.source = this._imageUrl;
        imageContainer.addControl(image);
        panel.addControl(imageContainer);
      }
    }
    if (this._text) {
      const text = new TextBlock(`${this.name}_text`);
      text.text = this._text;
      text.color = "white";
      text.fontSize = this.textSizeInPixels;
      text.widthInPixels = totalPanelWidthInPixels;
      if (this._imageUrl) {
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        text.paddingLeftInPixels = padding;
      }
      if (this._subtext) {
        const textContainer = new Grid();
        textContainer.addColumnDefinition(1);
        textContainer.addRowDefinition(0.5);
        textContainer.addRowDefinition(0.5);
        textContainer.widthInPixels = totalPanelWidthInPixels;
        textContainer.heightInPixels = 45;
        const subtext = new TextBlock(`${this.name}_subtext`);
        subtext.text = this._subtext;
        subtext.color = "#EEEEEEAB";
        subtext.fontSize = this.textSizeInPixels * 0.75;
        subtext.fontWeight = "600";
        if (this._imageUrl) {
          subtext.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
          subtext.paddingLeftInPixels = padding;
        }
        textContainer.addControl(text, 0);
        textContainer.addControl(subtext, 1);
        panel.addControl(textContainer);
      } else {
        panel.addControl(text);
      }
    }
    contentContainer.addControl(panel);
    return contentContainer;
  }
  // Mesh association
  _createNode(scene) {
    this.name = this.name ?? "TouchHolographicButton";
    const backPlateMesh = this._createBackPlate(scene);
    const collisionMesh = this._createFrontPlate(scene);
    const innerQuadMesh = this._createInnerQuad(scene);
    const backGlowMesh = this._createBackGlow(scene);
    this._frontPlateCollisionMesh = collisionMesh;
    this._textPlate = super._createNode(scene);
    this._textPlate.name = `${this.name}_textPlate`;
    this._textPlate.isPickable = false;
    this._textPlate.scaling.x = this.width;
    this._textPlate.parent = collisionMesh;
    this._backPlate = backPlateMesh;
    this._backPlate.position = Vector3.Forward(scene.useRightHandedSystem).scale(this.backPlateDepth / 2);
    this._backPlate.isPickable = false;
    this._backPlate.addChild(collisionMesh);
    this._backPlate.addChild(innerQuadMesh);
    if (backGlowMesh) {
      this._backPlate.addChild(backGlowMesh);
    }
    const tn = new TransformNode(`${this.name}_root`, scene);
    this._backPlate.setParent(tn);
    this.collisionMesh = collisionMesh;
    this.collidableFrontDirection = this._backPlate.forward.negate();
    return tn;
  }
  _createBackPlate(scene) {
    const backPlateMesh = CreateBox(`${this.name}_backPlate`, {}, scene);
    backPlateMesh.isPickable = false;
    backPlateMesh.visibility = 0;
    backPlateMesh.scaling.z = 0.2;
    SceneLoader.ImportMeshAsync(void 0, _TouchHolographicButton.MRTK_ASSET_BASE_URL, _TouchHolographicButton.BACKPLATE_MODEL_FILENAME, scene).then((result) => {
      const backPlateModel = result.meshes[1];
      backPlateModel.visibility = 0;
      if (this._isBackplateVisible) {
        backPlateModel.visibility = 1;
        backPlateModel.name = `${this.name}_backPlate`;
        backPlateModel.isPickable = false;
        backPlateModel.scaling.x = this.width;
        backPlateModel.scaling.y = this.height;
        backPlateModel.parent = backPlateMesh;
      }
      if (this._backMaterial) {
        backPlateModel.material = this._backMaterial;
      }
      this._backPlate = backPlateModel;
    });
    return backPlateMesh;
  }
  _createFrontPlate(scene) {
    const collisionMesh = CreateBox(`${this.name}_frontPlate`, {
      width: this.width,
      height: this.height,
      depth: this.frontPlateDepth
    }, scene);
    collisionMesh.isPickable = true;
    collisionMesh.isNearPickable = true;
    collisionMesh.visibility = 0;
    collisionMesh.position = Vector3.Forward(scene.useRightHandedSystem).scale((this.backPlateDepth - this.frontPlateDepth) / 2);
    SceneLoader.ImportMeshAsync(void 0, _TouchHolographicButton.MRTK_ASSET_BASE_URL, _TouchHolographicButton.FRONTPLATE_MODEL_FILENAME, scene).then((result) => {
      const collisionPlate = CreateBox(`${this.name}_collisionPlate`, {
        width: this.width,
        height: this.height
      }, scene);
      collisionPlate.isPickable = false;
      collisionPlate.scaling.z = this.frontPlateDepth;
      collisionPlate.visibility = 0;
      collisionPlate.parent = collisionMesh;
      this._collisionPlate = collisionPlate;
      const frontPlateModel = result.meshes[1];
      frontPlateModel.name = `${this.name}_frontPlate`;
      frontPlateModel.isPickable = false;
      frontPlateModel.scaling.x = this.width - this.backGlowOffset;
      frontPlateModel.scaling.y = this.height - this.backGlowOffset;
      frontPlateModel.position = Vector3.Forward(scene.useRightHandedSystem).scale(-0.5);
      frontPlateModel.parent = collisionPlate;
      if (this.isToggleButton) {
        frontPlateModel.visibility = 0;
      }
      if (this._frontMaterial) {
        frontPlateModel.material = this._frontMaterial;
      }
      this._textPlate.scaling.x = 1;
      this._textPlate.parent = frontPlateModel;
      this._frontPlate = frontPlateModel;
    });
    return collisionMesh;
  }
  _createInnerQuad(scene) {
    const innerQuadMesh = CreateBox(`${this.name}_innerQuad`, {}, scene);
    innerQuadMesh.isPickable = false;
    innerQuadMesh.visibility = 0;
    innerQuadMesh.scaling.z = this.flatPlaneDepth;
    innerQuadMesh.position.z += this.backPlateDepth / 2 - this.flatPlaneDepth;
    SceneLoader.ImportMeshAsync(void 0, _TouchHolographicButton.MRTK_ASSET_BASE_URL, _TouchHolographicButton.INNERQUAD_MODEL_FILENAME, scene).then((result) => {
      const innerQuadModel = result.meshes[1];
      innerQuadModel.name = `${this.name}_innerQuad`;
      innerQuadModel.isPickable = false;
      innerQuadModel.scaling.x = this.width - this.backGlowOffset;
      innerQuadModel.scaling.y = this.height - this.backGlowOffset;
      innerQuadModel.parent = innerQuadMesh;
      if (this._innerQuadMaterial) {
        innerQuadModel.material = this._innerQuadMaterial;
      }
      this._innerQuad = innerQuadModel;
    });
    return innerQuadMesh;
  }
  _createBackGlow(scene) {
    if (this.isToggleButton) {
      return;
    }
    const backGlowMesh = CreateBox(`${this.name}_backGlow`, {}, scene);
    backGlowMesh.isPickable = false;
    backGlowMesh.visibility = 0;
    backGlowMesh.scaling.z = this.flatPlaneDepth;
    backGlowMesh.position.z += this.backPlateDepth / 2 - this.flatPlaneDepth * 2;
    SceneLoader.ImportMeshAsync(void 0, _TouchHolographicButton.MRTK_ASSET_BASE_URL, _TouchHolographicButton.BACKGLOW_MODEL_FILENAME, scene).then((result) => {
      const backGlowModel = result.meshes[1];
      backGlowModel.name = `${this.name}_backGlow`;
      backGlowModel.isPickable = false;
      backGlowModel.scaling.x = this.width - this.backGlowOffset;
      backGlowModel.scaling.y = this.height - this.backGlowOffset;
      backGlowModel.parent = backGlowMesh;
      if (this._backGlowMaterial) {
        backGlowModel.material = this._backGlowMaterial;
      }
      this._backGlow = backGlowModel;
    });
    return backGlowMesh;
  }
  _applyFacade(facadeTexture) {
    this._plateMaterial.emissiveTexture = facadeTexture;
    this._plateMaterial.opacityTexture = facadeTexture;
    this._plateMaterial.diffuseColor = this.plateMaterialColor;
  }
  _performClickAnimation() {
    const frameRate = 60;
    const animationGroup = new AnimationGroup("Click Animation Group");
    const animations = [
      {
        name: "backGlowMotion",
        mesh: this._backGlow,
        property: "material.motion",
        keys: [
          {
            frame: 0,
            values: [0, 0, 0]
          },
          {
            frame: 20,
            values: [1, 0.0144, 0.0144]
          },
          {
            frame: 40,
            values: [0.0027713229489760476, 0, 0]
          },
          {
            frame: 45,
            values: [0.0027713229489760476]
          }
        ]
      },
      {
        name: "_collisionPlateZSlide",
        mesh: this._collisionPlate,
        property: "position.z",
        keys: [
          {
            frame: 0,
            values: [0, 0, 0]
          },
          {
            frame: 20,
            values: [Vector3.Forward(this._collisionPlate._scene.useRightHandedSystem).scale(this.frontPlateDepth / 2).z, 0, 0]
          },
          {
            frame: 40,
            values: [0, 0.005403332496794331]
          },
          {
            frame: 45,
            values: [0]
          }
        ]
      },
      {
        name: "_collisionPlateZScale",
        mesh: this._collisionPlate,
        property: "scaling.z",
        keys: [
          {
            frame: 0,
            values: [this.frontPlateDepth, 0, 0]
          },
          {
            frame: 20,
            values: [this.backPlateDepth, 0, 0]
          },
          {
            frame: 40,
            values: [this.frontPlateDepth, 54e-4]
          },
          {
            frame: 45,
            values: [this.frontPlateDepth]
          }
        ]
      }
    ];
    for (const animation of animations) {
      const anim = new Animation(animation.name, animation.property, frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
      const animkeyFrames = [];
      for (const key of animation.keys) {
        animkeyFrames.push({
          frame: key.frame,
          value: key.values[0],
          inTangent: key.values[1],
          outTangent: key.values[2],
          interpolation: key.values[3]
        });
      }
      anim.setKeys(animkeyFrames);
      if (!animation.mesh) {
        continue;
      }
      animationGroup.addTargetedAnimation(anim, animation.mesh);
    }
    animationGroup.normalize(0, 45);
    animationGroup.speedRatio = 1;
    animationGroup.play();
  }
  _performEnterExitAnimation(speedRatio) {
    const frameRate = 60;
    const animationGroup = new AnimationGroup("Enter Exit Animation Group");
    const animations = [
      {
        name: "frontPlateFadeOut",
        mesh: this._frontPlate,
        property: "material.fadeOut",
        keys: [
          {
            frame: 0,
            values: [0, 0, 0.025045314830017686, 0]
          },
          {
            frame: 40,
            values: [1.00205599570012, 0.025045314830017686, 0, 0]
          }
        ]
      },
      {
        name: "textPlateZSlide",
        mesh: this._textPlate,
        property: "position.z",
        keys: [
          {
            frame: 0,
            values: [0, 0, 0]
          },
          {
            frame: 40,
            values: [Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-0.15).z, 0, 0]
          }
        ]
      }
    ];
    for (const animation of animations) {
      const anim = new Animation(animation.name, animation.property, frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
      const animkeyFrames = [];
      for (const key of animation.keys) {
        animkeyFrames.push({
          frame: key.frame,
          value: key.values[0],
          inTangent: key.values[1],
          outTangent: key.values[2],
          interpolation: key.values[3]
        });
      }
      anim.setKeys(animkeyFrames);
      if (!animation.mesh) {
        continue;
      }
      animationGroup.addTargetedAnimation(anim, animation.mesh);
    }
    animationGroup.normalize(0, 45);
    animationGroup.speedRatio = speedRatio;
    animationGroup.play();
  }
  _createBackMaterial(mesh) {
    this._backMaterial = this._backMaterial ?? new MRDLBackplateMaterial(this.name + "backPlateMaterial", mesh.getScene());
    this._backMaterial.absoluteSizes = true;
    this._backMaterial.radius = this.radius;
    this._backMaterial.lineWidth = 0.02;
  }
  _createFrontMaterial(mesh) {
    this._frontMaterial = this._frontMaterial ?? new MRDLFrontplateMaterial(this.name + "Front Material", mesh.getScene());
    this.frontMaterial.radius = this.innerQuadRadius;
    this.frontMaterial.fadeOut = 0;
  }
  _createBackGlowMaterial(mesh) {
    const glowRadius = this.radius + 0.04;
    this._backGlowMaterial = this._backGlowMaterial ?? new MRDLBackglowMaterial(this.name + "Back Glow Material", mesh.getScene());
    this._backGlowMaterial.bevelRadius = glowRadius;
    this._backGlowMaterial.lineWidth = glowRadius;
    this._backGlowMaterial.motion = 0;
  }
  _createInnerQuadMaterial(mesh) {
    this._innerQuadMaterial = this._innerQuadMaterial ?? new MRDLInnerquadMaterial("inner_quad", mesh.getScene());
    this._innerQuadMaterial.radius = this.innerQuadRadius;
    if (this.isToggleButton) {
      this._innerQuadMaterial.color = this.innerQuadColor;
    }
  }
  _createPlateMaterial(mesh) {
    this._plateMaterial = this._plateMaterial ?? new StandardMaterial(this.name + "Plate Material", mesh.getScene());
    this._plateMaterial.specularColor = Color3.Black();
  }
  _onToggle(newState) {
    super._onToggle(newState);
  }
  _affectMaterial(mesh) {
    if (this._shareMaterials) {
      if (!this._host._touchSharedMaterials["mrdlBackplateMaterial"]) {
        this._createBackMaterial(mesh);
        this._host._touchSharedMaterials["mrdlBackplateMaterial"] = this._backMaterial;
      } else {
        this._backMaterial = this._host._touchSharedMaterials["mrdlBackplateMaterial"];
      }
      if (!this._host._touchSharedMaterials["mrdlFrontplateMaterial"]) {
        this._createFrontMaterial(mesh);
        this._host._touchSharedMaterials["mrdlFrontplateMaterial"] = this._frontMaterial;
      } else {
        this._frontMaterial = this._host._touchSharedMaterials["mrdlFrontplateMaterial"];
      }
      if (!this._host._touchSharedMaterials["mrdlBackglowMaterial"]) {
        this._createBackGlowMaterial(mesh);
        this._host._touchSharedMaterials["mrdlBackglowMaterial"] = this._backGlowMaterial;
      } else {
        this._backGlowMaterial = this._host._touchSharedMaterials["mrdlBackglowMaterial"];
      }
      if (!this._host._touchSharedMaterials["mrdlInnerQuadMaterial"]) {
        this._createInnerQuadMaterial(mesh);
        this._host._touchSharedMaterials["mrdlInnerQuadMaterial"] = this._innerQuadMaterial;
      } else {
        this._innerQuadMaterial = this._host._touchSharedMaterials["mrdlInnerQuadMaterial"];
      }
    } else {
      this._createBackMaterial(mesh);
      this._createFrontMaterial(mesh);
      this._createBackGlowMaterial(mesh);
      this._createInnerQuadMaterial(mesh);
    }
    this._createPlateMaterial(mesh);
    this._backPlate.material = this._backMaterial;
    this._textPlate.material = this._plateMaterial;
    if (!this._isBackplateVisible) {
      this._backPlate.visibility = 0;
    }
    if (this._frontPlate) {
      this._frontPlate.material = this._frontMaterial;
    }
    if (this._backGlow) {
      this._backGlow.material = this._backGlowMaterial;
    }
    if (this._innerQuad) {
      this._innerQuad.material = this._innerQuadMaterial;
    }
    this._rebuildContent();
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    super.dispose();
    this._disposeTooltip();
    this.onPointerClickObservable.remove(this._pointerClickObserver);
    this.onPointerEnterObservable.remove(this._pointerEnterObserver);
    this.onPointerOutObservable.remove(this._pointerOutObserver);
    this.onToggleObservable.remove(this._toggleObserver);
    if (!this.shareMaterials) {
      this._backMaterial.dispose();
      this._frontMaterial.dispose();
      this._plateMaterial.dispose();
      this._backGlowMaterial.dispose();
      this._innerQuadMaterial.dispose();
      if (this._pickedPointObserver) {
        this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
        this._pickedPointObserver = null;
      }
    }
  }
};
TouchHolographicButton2.MRTK_ASSET_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
TouchHolographicButton2.FRONTPLATE_MODEL_FILENAME = "mrtk-fluent-frontplate.glb";
TouchHolographicButton2.BACKPLATE_MODEL_FILENAME = "mrtk-fluent-backplate.glb";
TouchHolographicButton2.BACKGLOW_MODEL_FILENAME = "mrtk-fluent-button.glb";
TouchHolographicButton2.INNERQUAD_MODEL_FILENAME = "SlateProximity.glb";

// node_modules/@babylonjs/gui/3D/gui3DManager.js
var GUI3DManager = class _GUI3DManager {
  /** Gets the hosting scene */
  get scene() {
    return this._scene;
  }
  /** Gets associated utility layer */
  get utilityLayer() {
    return this._utilityLayer;
  }
  /** Gets the scaling for all UI elements owned by this manager */
  get controlScaling() {
    return this._customControlScaling;
  }
  /** Sets the scaling adjustment for all UI elements owned by this manager */
  set controlScaling(newScale) {
    if (this._customControlScaling !== newScale && newScale > 0) {
      const scaleRatio = newScale / this._customControlScaling;
      this._customControlScaling = newScale;
      this._rootContainer.children.forEach((control) => {
        control.scaling.scaleInPlace(scaleRatio);
        if (newScale !== 1) {
          control._isScaledByManager = true;
        }
      });
    }
  }
  /** Gets if controls attached to this manager are realistically sized, based on the fact that 1 unit length is 1 meter */
  get useRealisticScaling() {
    return this.controlScaling === _GUI3DManager.MRTK_REALISTIC_SCALING;
  }
  /** Sets if controls attached to this manager are realistically sized, based on the fact that 1 unit length is 1 meter */
  set useRealisticScaling(newValue) {
    this.controlScaling = newValue ? _GUI3DManager.MRTK_REALISTIC_SCALING : 1;
  }
  /**
   * Creates a new GUI3DManager
   * @param scene
   */
  constructor(scene) {
    this._customControlScaling = 1;
    this._lastControlOver = {};
    this._lastControlDown = {};
    this.onPickedPointChangedObservable = new Observable();
    this.onPickingObservable = new Observable();
    this._sharedMaterials = {};
    this._touchSharedMaterials = {};
    this._scene = scene || EngineStore.LastCreatedScene;
    this._sceneDisposeObserver = this._scene.onDisposeObservable.add(() => {
      this._sceneDisposeObserver = null;
      this._utilityLayer = null;
      this.dispose();
    });
    this._utilityLayer = UtilityLayerRenderer._CreateDefaultUtilityLayerFromScene(this._scene);
    this._utilityLayer.onlyCheckPointerDownEvents = false;
    this._utilityLayer.pickUtilitySceneFirst = false;
    this._utilityLayer.mainSceneTrackerPredicate = (mesh) => {
      var _a, _b, _c;
      return mesh && ((_c = (_b = (_a = mesh.reservedDataStore) == null ? void 0 : _a.GUI3D) == null ? void 0 : _b.control) == null ? void 0 : _c._node);
    };
    this._rootContainer = new Container3D("RootContainer");
    this._rootContainer._host = this;
    const utilityLayerScene = this._utilityLayer.utilityLayerScene;
    this._pointerOutObserver = this._utilityLayer.onPointerOutObservable.add((pointerId) => {
      this._handlePointerOut(pointerId, true);
    });
    this._pointerObserver = utilityLayerScene.onPointerObservable.add((pi) => {
      this._doPicking(pi);
    });
    this._utilityLayer.utilityLayerScene.autoClear = false;
    this._utilityLayer.utilityLayerScene.autoClearDepthAndStencil = false;
    new HemisphericLight("hemi", Vector3.Up(), this._utilityLayer.utilityLayerScene);
  }
  _handlePointerOut(pointerId, isPointerUp) {
    const previousControlOver = this._lastControlOver[pointerId];
    if (previousControlOver) {
      previousControlOver._onPointerOut(previousControlOver);
      delete this._lastControlOver[pointerId];
    }
    if (isPointerUp) {
      if (this._lastControlDown[pointerId]) {
        this._lastControlDown[pointerId].forcePointerUp();
        delete this._lastControlDown[pointerId];
      }
    }
    this.onPickedPointChangedObservable.notifyObservers(null);
  }
  _doPicking(pi) {
    var _a, _b, _c;
    if (!this._utilityLayer || !this._utilityLayer.shouldRender || !this._utilityLayer.utilityLayerScene.activeCamera) {
      return false;
    }
    const pointerEvent = pi.event;
    const pointerId = pointerEvent.pointerId || 0;
    const buttonIndex = pointerEvent.button;
    const pickingInfo = pi.pickInfo;
    if (pickingInfo) {
      this.onPickingObservable.notifyObservers(pickingInfo.pickedMesh);
    }
    if (!pickingInfo || !pickingInfo.hit) {
      this._handlePointerOut(pointerId, pi.type === PointerEventTypes.POINTERUP);
      return false;
    }
    if (pickingInfo.pickedPoint) {
      this.onPickedPointChangedObservable.notifyObservers(pickingInfo.pickedPoint);
    }
    const control = (_b = (_a = pickingInfo.pickedMesh.reservedDataStore) == null ? void 0 : _a.GUI3D) == null ? void 0 : _b.control;
    if (!!control && !control._processObservables(pi.type, pickingInfo.pickedPoint, ((_c = pickingInfo.originMesh) == null ? void 0 : _c.position) || null, pointerId, buttonIndex)) {
      if (pi.type === PointerEventTypes.POINTERMOVE) {
        if (this._lastControlOver[pointerId]) {
          this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId]);
        }
        delete this._lastControlOver[pointerId];
      }
    }
    if (pi.type === PointerEventTypes.POINTERUP) {
      if (this._lastControlDown[pointerEvent.pointerId]) {
        this._lastControlDown[pointerEvent.pointerId].forcePointerUp();
        delete this._lastControlDown[pointerEvent.pointerId];
      }
      if (pointerEvent.pointerType === "touch" || pointerEvent.pointerType === "xr" && this._scene.getEngine().hostInformation.isMobile) {
        this._handlePointerOut(pointerId, false);
      }
    }
    return true;
  }
  /**
   * Gets the root container
   */
  get rootContainer() {
    return this._rootContainer;
  }
  /**
   * Gets a boolean indicating if the given control is in the root child list
   * @param control defines the control to check
   * @returns true if the control is in the root child list
   */
  containsControl(control) {
    return this._rootContainer.containsControl(control);
  }
  /**
   * Adds a control to the root child list
   * @param control defines the control to add
   * @returns the current manager
   */
  addControl(control) {
    this._rootContainer.addControl(control);
    if (this._customControlScaling !== 1) {
      control.scaling.scaleInPlace(this._customControlScaling);
      control._isScaledByManager = true;
    }
    return this;
  }
  /**
   * Removes a control from the root child list
   * @param control defines the control to remove
   * @returns the current container
   */
  removeControl(control) {
    this._rootContainer.removeControl(control);
    if (control._isScaledByManager) {
      control.scaling.scaleInPlace(1 / this._customControlScaling);
      control._isScaledByManager = false;
    }
    return this;
  }
  /**
   * Releases all associated resources
   */
  dispose() {
    this._rootContainer.dispose();
    for (const materialName in this._sharedMaterials) {
      if (!Object.prototype.hasOwnProperty.call(this._sharedMaterials, materialName)) {
        continue;
      }
      this._sharedMaterials[materialName].dispose();
    }
    this._sharedMaterials = {};
    for (const materialName in this._touchSharedMaterials) {
      if (!Object.prototype.hasOwnProperty.call(this._touchSharedMaterials, materialName)) {
        continue;
      }
      this._touchSharedMaterials[materialName].dispose();
    }
    this._touchSharedMaterials = {};
    if (this._pointerOutObserver && this._utilityLayer) {
      this._utilityLayer.onPointerOutObservable.remove(this._pointerOutObserver);
      this._pointerOutObserver = null;
    }
    this.onPickedPointChangedObservable.clear();
    this.onPickingObservable.clear();
    const utilityLayerScene = this._utilityLayer ? this._utilityLayer.utilityLayerScene : null;
    if (utilityLayerScene) {
      if (this._pointerObserver) {
        utilityLayerScene.onPointerObservable.remove(this._pointerObserver);
        this._pointerObserver = null;
      }
    }
    if (this._scene) {
      if (this._sceneDisposeObserver) {
        this._scene.onDisposeObservable.remove(this._sceneDisposeObserver);
        this._sceneDisposeObserver = null;
      }
    }
    if (this._utilityLayer) {
      this._utilityLayer.dispose();
    }
  }
};
GUI3DManager.MRTK_REALISTIC_SCALING = 0.032;
export {
  AbstractButton3D,
  AdvancedDynamicTexture,
  AdvancedDynamicTextureInstrumentation,
  BaseGradient,
  BaseSlider,
  Button,
  Button3D,
  Checkbox,
  CheckboxGroup,
  ColorPicker,
  Container,
  Container3D,
  Control,
  Control3D,
  CornerHandle,
  CylinderPanel,
  DisplayGrid,
  Ellipse,
  FluentBackplateMaterial,
  FluentButtonMaterial,
  FluentMaterial,
  FluentMaterialDefines,
  FocusableButton,
  GUI3DManager,
  GizmoHandle,
  Grid,
  HandMenu,
  HandleMaterial,
  HandleState,
  HolographicBackplate,
  HolographicButton,
  HolographicSlate,
  Image,
  ImageBasedSlider,
  ImageScrollBar,
  InputPassword,
  InputText,
  InputTextArea,
  KeyPropertySet,
  Line,
  LinearGradient,
  MRDLBackplateMaterial,
  MRDLSliderBarMaterial,
  MRDLSliderThumbMaterial,
  MathTools,
  Matrix2D,
  Measure,
  MeshButton3D,
  MultiLine,
  MultiLinePoint,
  NearMenu,
  PlanePanel,
  RadialGradient,
  RadioButton,
  RadioGroup,
  Rectangle,
  ScatterPanel,
  ScrollBar,
  ScrollViewer,
  SelectionPanel,
  SelectorGroup,
  SideHandle,
  SlateGizmo,
  Slider,
  Slider3D,
  SliderGroup,
  SpherePanel,
  StackPanel,
  StackPanel3D,
  Style,
  TextBlock,
  TextWrapper,
  TextWrapping,
  ToggleButton,
  TouchButton3D,
  TouchHolographicButton,
  TouchHolographicButton2 as TouchHolographicButtonV3,
  TouchHolographicMenu,
  TouchMeshButton3D,
  ValueAndUnit,
  Vector2WithInfo,
  Vector3WithInfo,
  VirtualKeyboard,
  VolumeBasedPanel,
  XmlLoader,
  name
};
//# sourceMappingURL=@babylonjs_gui.js.map
