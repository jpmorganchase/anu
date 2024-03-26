import {
  ArrayTools,
  Scalar,
  ToGammaSpace,
  ToLinearSpace
} from "./chunk-RFWLA2MF.js";
import {
  RegisterClass
} from "./chunk-AJT353ZC.js";

// node_modules/@babylonjs/core/Maths/math.color.js
function colorChannelToLinearSpace(color) {
  return Math.pow(color, ToLinearSpace);
}
function colorChannelToLinearSpaceExact(color) {
  if (color <= 0.04045) {
    return 0.0773993808 * color;
  }
  return Math.pow(0.947867299 * (color + 0.055), 2.4);
}
function colorChannelToGammaSpace(color) {
  return Math.pow(color, ToGammaSpace);
}
function colorChannelToGammaSpaceExact(color) {
  if (color <= 31308e-7) {
    return 12.92 * color;
  }
  return 1.055 * Math.pow(color, 0.41666) - 0.055;
}
var Color3 = class _Color3 {
  /**
   * Creates a new Color3 object from red, green, blue values, all between 0 and 1
   * @param r defines the red component (between 0 and 1, default is 0)
   * @param g defines the green component (between 0 and 1, default is 0)
   * @param b defines the blue component (between 0 and 1, default is 0)
   */
  constructor(r = 0, g = 0, b = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  /**
   * Creates a string with the Color3 current values
   * @returns the string representation of the Color3 object
   */
  toString() {
    return "{R: " + this.r + " G:" + this.g + " B:" + this.b + "}";
  }
  /**
   * Returns the string "Color3"
   * @returns "Color3"
   */
  getClassName() {
    return "Color3";
  }
  /**
   * Compute the Color3 hash code
   * @returns an unique number that can be used to hash Color3 objects
   */
  getHashCode() {
    let hash = this.r * 255 | 0;
    hash = hash * 397 ^ (this.g * 255 | 0);
    hash = hash * 397 ^ (this.b * 255 | 0);
    return hash;
  }
  // Operators
  /**
   * Stores in the given array from the given starting index the red, green, blue values as successive elements
   * @param array defines the array where to store the r,g,b components
   * @param index defines an optional index in the target array to define where to start storing values
   * @returns the current Color3 object
   */
  toArray(array, index = 0) {
    array[index] = this.r;
    array[index + 1] = this.g;
    array[index + 2] = this.b;
    return this;
  }
  /**
   * Update the current color with values stored in an array from the starting index of the given array
   * @param array defines the source array
   * @param offset defines an offset in the source array
   * @returns the current Color3 object
   */
  fromArray(array, offset = 0) {
    _Color3.FromArrayToRef(array, offset, this);
    return this;
  }
  /**
   * Returns a new Color4 object from the current Color3 and the given alpha
   * @param alpha defines the alpha component on the new Color4 object (default is 1)
   * @returns a new Color4 object
   */
  toColor4(alpha = 1) {
    return new Color4(this.r, this.g, this.b, alpha);
  }
  /**
   * Returns a new array populated with 3 numeric elements : red, green and blue values
   * @returns the new array
   */
  asArray() {
    return [this.r, this.g, this.b];
  }
  /**
   * Returns the luminance value
   * @returns a float value
   */
  toLuminance() {
    return this.r * 0.3 + this.g * 0.59 + this.b * 0.11;
  }
  /**
   * Multiply each Color3 rgb values by the given Color3 rgb values in a new Color3 object
   * @param otherColor defines the second operand
   * @returns the new Color3 object
   */
  multiply(otherColor) {
    return new _Color3(this.r * otherColor.r, this.g * otherColor.g, this.b * otherColor.b);
  }
  /**
   * Multiply the rgb values of the Color3 and the given Color3 and stores the result in the object "result"
   * @param otherColor defines the second operand
   * @param result defines the Color3 object where to store the result
   * @returns the current Color3
   */
  multiplyToRef(otherColor, result) {
    result.r = this.r * otherColor.r;
    result.g = this.g * otherColor.g;
    result.b = this.b * otherColor.b;
    return this;
  }
  /**
   * Determines equality between Color3 objects
   * @param otherColor defines the second operand
   * @returns true if the rgb values are equal to the given ones
   */
  equals(otherColor) {
    return otherColor && this.r === otherColor.r && this.g === otherColor.g && this.b === otherColor.b;
  }
  /**
   * Determines equality between the current Color3 object and a set of r,b,g values
   * @param r defines the red component to check
   * @param g defines the green component to check
   * @param b defines the blue component to check
   * @returns true if the rgb values are equal to the given ones
   */
  equalsFloats(r, g, b) {
    return this.r === r && this.g === g && this.b === b;
  }
  /**
   * Creates a new Color3 with the current Color3 values multiplied by scale
   * @param scale defines the scaling factor to apply
   * @returns a new Color3 object
   */
  scale(scale) {
    return new _Color3(this.r * scale, this.g * scale, this.b * scale);
  }
  /**
   * Multiplies the Color3 values by the float "scale"
   * @param scale defines the scaling factor to apply
   * @returns the current updated Color3
   */
  scaleInPlace(scale) {
    this.r *= scale;
    this.g *= scale;
    this.b *= scale;
    return this;
  }
  /**
   * Multiplies the rgb values by scale and stores the result into "result"
   * @param scale defines the scaling factor
   * @param result defines the Color3 object where to store the result
   * @returns the unmodified current Color3
   */
  scaleToRef(scale, result) {
    result.r = this.r * scale;
    result.g = this.g * scale;
    result.b = this.b * scale;
    return this;
  }
  /**
   * Scale the current Color3 values by a factor and add the result to a given Color3
   * @param scale defines the scale factor
   * @param result defines color to store the result into
   * @returns the unmodified current Color3
   */
  scaleAndAddToRef(scale, result) {
    result.r += this.r * scale;
    result.g += this.g * scale;
    result.b += this.b * scale;
    return this;
  }
  /**
   * Clamps the rgb values by the min and max values and stores the result into "result"
   * @param min defines minimum clamping value (default is 0)
   * @param max defines maximum clamping value (default is 1)
   * @param result defines color to store the result into
   * @returns the original Color3
   */
  clampToRef(min = 0, max = 1, result) {
    result.r = Scalar.Clamp(this.r, min, max);
    result.g = Scalar.Clamp(this.g, min, max);
    result.b = Scalar.Clamp(this.b, min, max);
    return this;
  }
  /**
   * Creates a new Color3 set with the added values of the current Color3 and of the given one
   * @param otherColor defines the second operand
   * @returns the new Color3
   */
  add(otherColor) {
    return new _Color3(this.r + otherColor.r, this.g + otherColor.g, this.b + otherColor.b);
  }
  /**
   * Stores the result of the addition of the current Color3 and given one rgb values into "result"
   * @param otherColor defines the second operand
   * @param result defines Color3 object to store the result into
   * @returns the unmodified current Color3
   */
  addToRef(otherColor, result) {
    result.r = this.r + otherColor.r;
    result.g = this.g + otherColor.g;
    result.b = this.b + otherColor.b;
    return this;
  }
  /**
   * Returns a new Color3 set with the subtracted values of the given one from the current Color3
   * @param otherColor defines the second operand
   * @returns the new Color3
   */
  subtract(otherColor) {
    return new _Color3(this.r - otherColor.r, this.g - otherColor.g, this.b - otherColor.b);
  }
  /**
   * Stores the result of the subtraction of given one from the current Color3 rgb values into "result"
   * @param otherColor defines the second operand
   * @param result defines Color3 object to store the result into
   * @returns the unmodified current Color3
   */
  subtractToRef(otherColor, result) {
    result.r = this.r - otherColor.r;
    result.g = this.g - otherColor.g;
    result.b = this.b - otherColor.b;
    return this;
  }
  /**
   * Copy the current object
   * @returns a new Color3 copied the current one
   */
  clone() {
    return new _Color3(this.r, this.g, this.b);
  }
  /**
   * Copies the rgb values from the source in the current Color3
   * @param source defines the source Color3 object
   * @returns the updated Color3 object
   */
  copyFrom(source) {
    this.r = source.r;
    this.g = source.g;
    this.b = source.b;
    return this;
  }
  /**
   * Updates the Color3 rgb values from the given floats
   * @param r defines the red component to read from
   * @param g defines the green component to read from
   * @param b defines the blue component to read from
   * @returns the current Color3 object
   */
  copyFromFloats(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }
  /**
   * Updates the Color3 rgb values from the given floats
   * @param r defines the red component to read from
   * @param g defines the green component to read from
   * @param b defines the blue component to read from
   * @returns the current Color3 object
   */
  set(r, g, b) {
    return this.copyFromFloats(r, g, b);
  }
  /**
   * Compute the Color3 hexadecimal code as a string
   * @returns a string containing the hexadecimal representation of the Color3 object
   */
  toHexString() {
    const intR = Math.round(this.r * 255);
    const intG = Math.round(this.g * 255);
    const intB = Math.round(this.b * 255);
    return "#" + Scalar.ToHex(intR) + Scalar.ToHex(intG) + Scalar.ToHex(intB);
  }
  /**
   * Converts current color in rgb space to HSV values
   * @returns a new color3 representing the HSV values
   */
  toHSV() {
    const result = new _Color3();
    this.toHSVToRef(result);
    return result;
  }
  /**
   * Converts current color in rgb space to HSV values
   * @param result defines the Color3 where to store the HSV values
   */
  toHSVToRef(result) {
    const r = this.r;
    const g = this.g;
    const b = this.b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const v = max;
    const dm = max - min;
    if (max !== 0) {
      s = dm / max;
    }
    if (max != min) {
      if (max == r) {
        h = (g - b) / dm;
        if (g < b) {
          h += 6;
        }
      } else if (max == g) {
        h = (b - r) / dm + 2;
      } else if (max == b) {
        h = (r - g) / dm + 4;
      }
      h *= 60;
    }
    result.r = h;
    result.g = s;
    result.b = v;
  }
  /**
   * Computes a new Color3 converted from the current one to linear space
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns a new Color3 object
   */
  toLinearSpace(exact = false) {
    const convertedColor = new _Color3();
    this.toLinearSpaceToRef(convertedColor, exact);
    return convertedColor;
  }
  /**
   * Converts the Color3 values to linear space and stores the result in "convertedColor"
   * @param convertedColor defines the Color3 object where to store the linear space version
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns the unmodified Color3
   */
  toLinearSpaceToRef(convertedColor, exact = false) {
    if (exact) {
      convertedColor.r = colorChannelToLinearSpaceExact(this.r);
      convertedColor.g = colorChannelToLinearSpaceExact(this.g);
      convertedColor.b = colorChannelToLinearSpaceExact(this.b);
    } else {
      convertedColor.r = colorChannelToLinearSpace(this.r);
      convertedColor.g = colorChannelToLinearSpace(this.g);
      convertedColor.b = colorChannelToLinearSpace(this.b);
    }
    return this;
  }
  /**
   * Computes a new Color3 converted from the current one to gamma space
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns a new Color3 object
   */
  toGammaSpace(exact = false) {
    const convertedColor = new _Color3();
    this.toGammaSpaceToRef(convertedColor, exact);
    return convertedColor;
  }
  /**
   * Converts the Color3 values to gamma space and stores the result in "convertedColor"
   * @param convertedColor defines the Color3 object where to store the gamma space version
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns the unmodified Color3
   */
  toGammaSpaceToRef(convertedColor, exact = false) {
    if (exact) {
      convertedColor.r = colorChannelToGammaSpaceExact(this.r);
      convertedColor.g = colorChannelToGammaSpaceExact(this.g);
      convertedColor.b = colorChannelToGammaSpaceExact(this.b);
    } else {
      convertedColor.r = colorChannelToGammaSpace(this.r);
      convertedColor.g = colorChannelToGammaSpace(this.g);
      convertedColor.b = colorChannelToGammaSpace(this.b);
    }
    return this;
  }
  /**
   * Converts Hue, saturation and value to a Color3 (RGB)
   * @param hue defines the hue (value between 0 and 360)
   * @param saturation defines the saturation (value between 0 and 1)
   * @param value defines the value (value between 0 and 1)
   * @param result defines the Color3 where to store the RGB values
   */
  static HSVtoRGBToRef(hue, saturation, value, result) {
    const chroma = value * saturation;
    const h = hue / 60;
    const x = chroma * (1 - Math.abs(h % 2 - 1));
    let r = 0;
    let g = 0;
    let b = 0;
    if (h >= 0 && h <= 1) {
      r = chroma;
      g = x;
    } else if (h >= 1 && h <= 2) {
      r = x;
      g = chroma;
    } else if (h >= 2 && h <= 3) {
      g = chroma;
      b = x;
    } else if (h >= 3 && h <= 4) {
      g = x;
      b = chroma;
    } else if (h >= 4 && h <= 5) {
      r = x;
      b = chroma;
    } else if (h >= 5 && h <= 6) {
      r = chroma;
      b = x;
    }
    const m = value - chroma;
    result.set(r + m, g + m, b + m);
  }
  /**
   * Converts Hue, saturation and value to a new Color3 (RGB)
   * @param hue defines the hue (value between 0 and 360)
   * @param saturation defines the saturation (value between 0 and 1)
   * @param value defines the value (value between 0 and 1)
   * @returns a new Color3 object
   */
  static FromHSV(hue, saturation, value) {
    const result = new _Color3(0, 0, 0);
    _Color3.HSVtoRGBToRef(hue, saturation, value, result);
    return result;
  }
  /**
   * Creates a new Color3 from the string containing valid hexadecimal values
   * @param hex defines a string containing valid hexadecimal values
   * @returns a new Color3 object
   */
  static FromHexString(hex) {
    if (hex.substring(0, 1) !== "#" || hex.length !== 7) {
      return new _Color3(0, 0, 0);
    }
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return _Color3.FromInts(r, g, b);
  }
  /**
   * Creates a new Color3 from the starting index of the given array
   * @param array defines the source array
   * @param offset defines an offset in the source array
   * @returns a new Color3 object
   */
  static FromArray(array, offset = 0) {
    return new _Color3(array[offset], array[offset + 1], array[offset + 2]);
  }
  /**
   * Creates a new Color3 from the starting index element of the given array
   * @param array defines the source array to read from
   * @param offset defines the offset in the source array
   * @param result defines the target Color3 object
   */
  static FromArrayToRef(array, offset = 0, result) {
    result.r = array[offset];
    result.g = array[offset + 1];
    result.b = array[offset + 2];
  }
  /**
   * Creates a new Color3 from integer values (< 256)
   * @param r defines the red component to read from (value between 0 and 255)
   * @param g defines the green component to read from (value between 0 and 255)
   * @param b defines the blue component to read from (value between 0 and 255)
   * @returns a new Color3 object
   */
  static FromInts(r, g, b) {
    return new _Color3(r / 255, g / 255, b / 255);
  }
  /**
   * Creates a new Color3 with values linearly interpolated of "amount" between the start Color3 and the end Color3
   * @param start defines the start Color3 value
   * @param end defines the end Color3 value
   * @param amount defines the gradient value between start and end
   * @returns a new Color3 object
   */
  static Lerp(start, end, amount) {
    const result = new _Color3(0, 0, 0);
    _Color3.LerpToRef(start, end, amount, result);
    return result;
  }
  /**
   * Creates a new Color3 with values linearly interpolated of "amount" between the start Color3 and the end Color3
   * @param left defines the start value
   * @param right defines the end value
   * @param amount defines the gradient factor
   * @param result defines the Color3 object where to store the result
   */
  static LerpToRef(left, right, amount, result) {
    result.r = left.r + (right.r - left.r) * amount;
    result.g = left.g + (right.g - left.g) * amount;
    result.b = left.b + (right.b - left.b) * amount;
  }
  /**
   * Returns a new Color3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
   * @param value1 defines the first control point
   * @param tangent1 defines the first tangent Color3
   * @param value2 defines the second control point
   * @param tangent2 defines the second tangent Color3
   * @param amount defines the amount on the interpolation spline (between 0 and 1)
   * @returns the new Color3
   */
  static Hermite(value1, tangent1, value2, tangent2, amount) {
    const squared = amount * amount;
    const cubed = amount * squared;
    const part1 = 2 * cubed - 3 * squared + 1;
    const part2 = -2 * cubed + 3 * squared;
    const part3 = cubed - 2 * squared + amount;
    const part4 = cubed - squared;
    const r = value1.r * part1 + value2.r * part2 + tangent1.r * part3 + tangent2.r * part4;
    const g = value1.g * part1 + value2.g * part2 + tangent1.g * part3 + tangent2.g * part4;
    const b = value1.b * part1 + value2.b * part2 + tangent1.b * part3 + tangent2.b * part4;
    return new _Color3(r, g, b);
  }
  /**
   * Returns a new Color3 which is the 1st derivative of the Hermite spline defined by the colors "value1", "value2", "tangent1", "tangent2".
   * @param value1 defines the first control point
   * @param tangent1 defines the first tangent
   * @param value2 defines the second control point
   * @param tangent2 defines the second tangent
   * @param time define where the derivative must be done
   * @returns 1st derivative
   */
  static Hermite1stDerivative(value1, tangent1, value2, tangent2, time) {
    const result = _Color3.Black();
    this.Hermite1stDerivativeToRef(value1, tangent1, value2, tangent2, time, result);
    return result;
  }
  /**
   * Returns a new Color3 which is the 1st derivative of the Hermite spline defined by the colors "value1", "value2", "tangent1", "tangent2".
   * @param value1 defines the first control point
   * @param tangent1 defines the first tangent
   * @param value2 defines the second control point
   * @param tangent2 defines the second tangent
   * @param time define where the derivative must be done
   * @param result define where to store the derivative
   */
  static Hermite1stDerivativeToRef(value1, tangent1, value2, tangent2, time, result) {
    const t2 = time * time;
    result.r = (t2 - time) * 6 * value1.r + (3 * t2 - 4 * time + 1) * tangent1.r + (-t2 + time) * 6 * value2.r + (3 * t2 - 2 * time) * tangent2.r;
    result.g = (t2 - time) * 6 * value1.g + (3 * t2 - 4 * time + 1) * tangent1.g + (-t2 + time) * 6 * value2.g + (3 * t2 - 2 * time) * tangent2.g;
    result.b = (t2 - time) * 6 * value1.b + (3 * t2 - 4 * time + 1) * tangent1.b + (-t2 + time) * 6 * value2.b + (3 * t2 - 2 * time) * tangent2.b;
  }
  /**
   * Returns a Color3 value containing a red color
   * @returns a new Color3 object
   */
  static Red() {
    return new _Color3(1, 0, 0);
  }
  /**
   * Returns a Color3 value containing a green color
   * @returns a new Color3 object
   */
  static Green() {
    return new _Color3(0, 1, 0);
  }
  /**
   * Returns a Color3 value containing a blue color
   * @returns a new Color3 object
   */
  static Blue() {
    return new _Color3(0, 0, 1);
  }
  /**
   * Returns a Color3 value containing a black color
   * @returns a new Color3 object
   */
  static Black() {
    return new _Color3(0, 0, 0);
  }
  /**
   * Gets a Color3 value containing a black color that must not be updated
   */
  static get BlackReadOnly() {
    return _Color3._BlackReadOnly;
  }
  /**
   * Returns a Color3 value containing a white color
   * @returns a new Color3 object
   */
  static White() {
    return new _Color3(1, 1, 1);
  }
  /**
   * Returns a Color3 value containing a purple color
   * @returns a new Color3 object
   */
  static Purple() {
    return new _Color3(0.5, 0, 0.5);
  }
  /**
   * Returns a Color3 value containing a magenta color
   * @returns a new Color3 object
   */
  static Magenta() {
    return new _Color3(1, 0, 1);
  }
  /**
   * Returns a Color3 value containing a yellow color
   * @returns a new Color3 object
   */
  static Yellow() {
    return new _Color3(1, 1, 0);
  }
  /**
   * Returns a Color3 value containing a gray color
   * @returns a new Color3 object
   */
  static Gray() {
    return new _Color3(0.5, 0.5, 0.5);
  }
  /**
   * Returns a Color3 value containing a teal color
   * @returns a new Color3 object
   */
  static Teal() {
    return new _Color3(0, 1, 1);
  }
  /**
   * Returns a Color3 value containing a random color
   * @returns a new Color3 object
   */
  static Random() {
    return new _Color3(Math.random(), Math.random(), Math.random());
  }
};
Color3._BlackReadOnly = Color3.Black();
var Color4 = class _Color4 {
  /**
   * Creates a new Color4 object from red, green, blue values, all between 0 and 1
   * @param r defines the red component (between 0 and 1, default is 0)
   * @param g defines the green component (between 0 and 1, default is 0)
   * @param b defines the blue component (between 0 and 1, default is 0)
   * @param a defines the alpha component (between 0 and 1, default is 1)
   */
  constructor(r = 0, g = 0, b = 0, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  // Operators
  /**
   * Adds in place the given Color4 values to the current Color4 object
   * @param right defines the second operand
   * @returns the current updated Color4 object
   */
  addInPlace(right) {
    this.r += right.r;
    this.g += right.g;
    this.b += right.b;
    this.a += right.a;
    return this;
  }
  /**
   * Creates a new array populated with 4 numeric elements : red, green, blue, alpha values
   * @returns the new array
   */
  asArray() {
    return [this.r, this.g, this.b, this.a];
  }
  /**
   * Stores from the starting index in the given array the Color4 successive values
   * @param array defines the array where to store the r,g,b components
   * @param index defines an optional index in the target array to define where to start storing values
   * @returns the current Color4 object
   */
  toArray(array, index = 0) {
    array[index] = this.r;
    array[index + 1] = this.g;
    array[index + 2] = this.b;
    array[index + 3] = this.a;
    return this;
  }
  /**
   * Update the current color with values stored in an array from the starting index of the given array
   * @param array defines the source array
   * @param offset defines an offset in the source array
   * @returns the current Color4 object
   */
  fromArray(array, offset = 0) {
    _Color4.FromArrayToRef(array, offset, this);
    return this;
  }
  /**
   * Determines equality between Color4 objects
   * @param otherColor defines the second operand
   * @returns true if the rgba values are equal to the given ones
   */
  equals(otherColor) {
    return otherColor && this.r === otherColor.r && this.g === otherColor.g && this.b === otherColor.b && this.a === otherColor.a;
  }
  /**
   * Creates a new Color4 set with the added values of the current Color4 and of the given one
   * @param right defines the second operand
   * @returns a new Color4 object
   */
  add(right) {
    return new _Color4(this.r + right.r, this.g + right.g, this.b + right.b, this.a + right.a);
  }
  /**
   * Creates a new Color4 set with the subtracted values of the given one from the current Color4
   * @param right defines the second operand
   * @returns a new Color4 object
   */
  subtract(right) {
    return new _Color4(this.r - right.r, this.g - right.g, this.b - right.b, this.a - right.a);
  }
  /**
   * Subtracts the given ones from the current Color4 values and stores the results in "result"
   * @param right defines the second operand
   * @param result defines the Color4 object where to store the result
   * @returns the current Color4 object
   */
  subtractToRef(right, result) {
    result.r = this.r - right.r;
    result.g = this.g - right.g;
    result.b = this.b - right.b;
    result.a = this.a - right.a;
    return this;
  }
  /**
   * Creates a new Color4 with the current Color4 values multiplied by scale
   * @param scale defines the scaling factor to apply
   * @returns a new Color4 object
   */
  scale(scale) {
    return new _Color4(this.r * scale, this.g * scale, this.b * scale, this.a * scale);
  }
  /**
   * Multiplies the Color4 values by the float "scale"
   * @param scale defines the scaling factor to apply
   * @returns the current updated Color4
   */
  scaleInPlace(scale) {
    this.r *= scale;
    this.g *= scale;
    this.b *= scale;
    this.a *= scale;
    return this;
  }
  /**
   * Multiplies the current Color4 values by scale and stores the result in "result"
   * @param scale defines the scaling factor to apply
   * @param result defines the Color4 object where to store the result
   * @returns the current unmodified Color4
   */
  scaleToRef(scale, result) {
    result.r = this.r * scale;
    result.g = this.g * scale;
    result.b = this.b * scale;
    result.a = this.a * scale;
    return this;
  }
  /**
   * Scale the current Color4 values by a factor and add the result to a given Color4
   * @param scale defines the scale factor
   * @param result defines the Color4 object where to store the result
   * @returns the unmodified current Color4
   */
  scaleAndAddToRef(scale, result) {
    result.r += this.r * scale;
    result.g += this.g * scale;
    result.b += this.b * scale;
    result.a += this.a * scale;
    return this;
  }
  /**
   * Clamps the rgb values by the min and max values and stores the result into "result"
   * @param min defines minimum clamping value (default is 0)
   * @param max defines maximum clamping value (default is 1)
   * @param result defines color to store the result into.
   * @returns the current Color4
   */
  clampToRef(min = 0, max = 1, result) {
    result.r = Scalar.Clamp(this.r, min, max);
    result.g = Scalar.Clamp(this.g, min, max);
    result.b = Scalar.Clamp(this.b, min, max);
    result.a = Scalar.Clamp(this.a, min, max);
    return this;
  }
  /**
   * Multiply an Color4 value by another and return a new Color4 object
   * @param color defines the Color4 value to multiply by
   * @returns a new Color4 object
   */
  multiply(color) {
    return new _Color4(this.r * color.r, this.g * color.g, this.b * color.b, this.a * color.a);
  }
  /**
   * Multiply a Color4 value by another and push the result in a reference value
   * @param color defines the Color4 value to multiply by
   * @param result defines the Color4 to fill the result in
   * @returns the result Color4
   */
  multiplyToRef(color, result) {
    result.r = this.r * color.r;
    result.g = this.g * color.g;
    result.b = this.b * color.b;
    result.a = this.a * color.a;
    return result;
  }
  /**
   * Creates a string with the Color4 current values
   * @returns the string representation of the Color4 object
   */
  toString() {
    return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
  }
  /**
   * Returns the string "Color4"
   * @returns "Color4"
   */
  getClassName() {
    return "Color4";
  }
  /**
   * Compute the Color4 hash code
   * @returns an unique number that can be used to hash Color4 objects
   */
  getHashCode() {
    let hash = this.r * 255 | 0;
    hash = hash * 397 ^ (this.g * 255 | 0);
    hash = hash * 397 ^ (this.b * 255 | 0);
    hash = hash * 397 ^ (this.a * 255 | 0);
    return hash;
  }
  /**
   * Creates a new Color4 copied from the current one
   * @returns a new Color4 object
   */
  clone() {
    return new _Color4(this.r, this.g, this.b, this.a);
  }
  /**
   * Copies the given Color4 values into the current one
   * @param source defines the source Color4 object
   * @returns the current updated Color4 object
   */
  copyFrom(source) {
    this.r = source.r;
    this.g = source.g;
    this.b = source.b;
    this.a = source.a;
    return this;
  }
  /**
   * Copies the given float values into the current one
   * @param r defines the red component to read from
   * @param g defines the green component to read from
   * @param b defines the blue component to read from
   * @param a defines the alpha component to read from
   * @returns the current updated Color4 object
   */
  copyFromFloats(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }
  /**
   * Copies the given float values into the current one
   * @param r defines the red component to read from
   * @param g defines the green component to read from
   * @param b defines the blue component to read from
   * @param a defines the alpha component to read from
   * @returns the current updated Color4 object
   */
  set(r, g, b, a) {
    return this.copyFromFloats(r, g, b, a);
  }
  /**
   * Compute the Color4 hexadecimal code as a string
   * @param returnAsColor3 defines if the string should only contains RGB values (off by default)
   * @returns a string containing the hexadecimal representation of the Color4 object
   */
  toHexString(returnAsColor3 = false) {
    const intR = Math.round(this.r * 255);
    const intG = Math.round(this.g * 255);
    const intB = Math.round(this.b * 255);
    if (returnAsColor3) {
      return "#" + Scalar.ToHex(intR) + Scalar.ToHex(intG) + Scalar.ToHex(intB);
    }
    const intA = Math.round(this.a * 255);
    return "#" + Scalar.ToHex(intR) + Scalar.ToHex(intG) + Scalar.ToHex(intB) + Scalar.ToHex(intA);
  }
  /**
   * Computes a new Color4 converted from the current one to linear space
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns a new Color4 object
   */
  toLinearSpace(exact = false) {
    const convertedColor = new _Color4();
    this.toLinearSpaceToRef(convertedColor, exact);
    return convertedColor;
  }
  /**
   * Converts the Color4 values to linear space and stores the result in "convertedColor"
   * @param convertedColor defines the Color4 object where to store the linear space version
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns the unmodified Color4
   */
  toLinearSpaceToRef(convertedColor, exact = false) {
    if (exact) {
      convertedColor.r = colorChannelToLinearSpaceExact(this.r);
      convertedColor.g = colorChannelToLinearSpaceExact(this.g);
      convertedColor.b = colorChannelToLinearSpaceExact(this.b);
    } else {
      convertedColor.r = colorChannelToLinearSpace(this.r);
      convertedColor.g = colorChannelToLinearSpace(this.g);
      convertedColor.b = colorChannelToLinearSpace(this.b);
    }
    convertedColor.a = this.a;
    return this;
  }
  /**
   * Computes a new Color4 converted from the current one to gamma space
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns a new Color4 object
   */
  toGammaSpace(exact = false) {
    const convertedColor = new _Color4();
    this.toGammaSpaceToRef(convertedColor, exact);
    return convertedColor;
  }
  /**
   * Converts the Color4 values to gamma space and stores the result in "convertedColor"
   * @param convertedColor defines the Color4 object where to store the gamma space version
   * @param exact defines if the conversion will be done in an exact way which is slower but more accurate (default is false)
   * @returns the unmodified Color4
   */
  toGammaSpaceToRef(convertedColor, exact = false) {
    if (exact) {
      convertedColor.r = colorChannelToGammaSpaceExact(this.r);
      convertedColor.g = colorChannelToGammaSpaceExact(this.g);
      convertedColor.b = colorChannelToGammaSpaceExact(this.b);
    } else {
      convertedColor.r = colorChannelToGammaSpace(this.r);
      convertedColor.g = colorChannelToGammaSpace(this.g);
      convertedColor.b = colorChannelToGammaSpace(this.b);
    }
    convertedColor.a = this.a;
    return this;
  }
  // Statics
  /**
   * Creates a new Color4 from the string containing valid hexadecimal values.
   *
   * A valid hex string is either in the format #RRGGBB or #RRGGBBAA.
   *
   * When a hex string without alpha is passed, the resulting Color4 has
   * its alpha value set to 1.0.
   *
   * An invalid string results in a Color with all its channels set to 0.0,
   * i.e. "transparent black".
   *
   * @param hex defines a string containing valid hexadecimal values
   * @returns a new Color4 object
   */
  static FromHexString(hex) {
    if (hex.substring(0, 1) !== "#" || hex.length !== 9 && hex.length !== 7) {
      return new _Color4(0, 0, 0, 0);
    }
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const a = hex.length === 9 ? parseInt(hex.substring(7, 9), 16) : 255;
    return _Color4.FromInts(r, g, b, a);
  }
  /**
   * Creates a new Color4 object set with the linearly interpolated values of "amount" between the left Color4 object and the right Color4 object
   * @param left defines the start value
   * @param right defines the end value
   * @param amount defines the gradient factor
   * @returns a new Color4 object
   */
  static Lerp(left, right, amount) {
    const result = new _Color4(0, 0, 0, 0);
    _Color4.LerpToRef(left, right, amount, result);
    return result;
  }
  /**
   * Set the given "result" with the linearly interpolated values of "amount" between the left Color4 object and the right Color4 object
   * @param left defines the start value
   * @param right defines the end value
   * @param amount defines the gradient factor
   * @param result defines the Color4 object where to store data
   */
  static LerpToRef(left, right, amount, result) {
    result.r = left.r + (right.r - left.r) * amount;
    result.g = left.g + (right.g - left.g) * amount;
    result.b = left.b + (right.b - left.b) * amount;
    result.a = left.a + (right.a - left.a) * amount;
  }
  /**
   * Interpolate between two Color4 using Hermite interpolation
   * @param value1 defines first Color4
   * @param tangent1 defines the incoming tangent
   * @param value2 defines second Color4
   * @param tangent2 defines the outgoing tangent
   * @param amount defines the target Color4
   * @returns the new interpolated Color4
   */
  static Hermite(value1, tangent1, value2, tangent2, amount) {
    const squared = amount * amount;
    const cubed = amount * squared;
    const part1 = 2 * cubed - 3 * squared + 1;
    const part2 = -2 * cubed + 3 * squared;
    const part3 = cubed - 2 * squared + amount;
    const part4 = cubed - squared;
    const r = value1.r * part1 + value2.r * part2 + tangent1.r * part3 + tangent2.r * part4;
    const g = value1.g * part1 + value2.g * part2 + tangent1.g * part3 + tangent2.g * part4;
    const b = value1.b * part1 + value2.b * part2 + tangent1.b * part3 + tangent2.b * part4;
    const a = value1.a * part1 + value2.a * part2 + tangent1.a * part3 + tangent2.a * part4;
    return new _Color4(r, g, b, a);
  }
  /**
   * Returns a new Color4 which is the 1st derivative of the Hermite spline defined by the colors "value1", "value2", "tangent1", "tangent2".
   * @param value1 defines the first control point
   * @param tangent1 defines the first tangent
   * @param value2 defines the second control point
   * @param tangent2 defines the second tangent
   * @param time define where the derivative must be done
   * @returns 1st derivative
   */
  static Hermite1stDerivative(value1, tangent1, value2, tangent2, time) {
    const result = new _Color4();
    this.Hermite1stDerivativeToRef(value1, tangent1, value2, tangent2, time, result);
    return result;
  }
  /**
   * Update a Color4 with the 1st derivative of the Hermite spline defined by the colors "value1", "value2", "tangent1", "tangent2".
   * @param value1 defines the first control point
   * @param tangent1 defines the first tangent
   * @param value2 defines the second control point
   * @param tangent2 defines the second tangent
   * @param time define where the derivative must be done
   * @param result define where to store the derivative
   */
  static Hermite1stDerivativeToRef(value1, tangent1, value2, tangent2, time, result) {
    const t2 = time * time;
    result.r = (t2 - time) * 6 * value1.r + (3 * t2 - 4 * time + 1) * tangent1.r + (-t2 + time) * 6 * value2.r + (3 * t2 - 2 * time) * tangent2.r;
    result.g = (t2 - time) * 6 * value1.g + (3 * t2 - 4 * time + 1) * tangent1.g + (-t2 + time) * 6 * value2.g + (3 * t2 - 2 * time) * tangent2.g;
    result.b = (t2 - time) * 6 * value1.b + (3 * t2 - 4 * time + 1) * tangent1.b + (-t2 + time) * 6 * value2.b + (3 * t2 - 2 * time) * tangent2.b;
    result.a = (t2 - time) * 6 * value1.a + (3 * t2 - 4 * time + 1) * tangent1.a + (-t2 + time) * 6 * value2.a + (3 * t2 - 2 * time) * tangent2.a;
  }
  /**
   * Creates a new Color4 from a Color3 and an alpha value
   * @param color3 defines the source Color3 to read from
   * @param alpha defines the alpha component (1.0 by default)
   * @returns a new Color4 object
   */
  static FromColor3(color3, alpha = 1) {
    return new _Color4(color3.r, color3.g, color3.b, alpha);
  }
  /**
   * Creates a new Color4 from the starting index element of the given array
   * @param array defines the source array to read from
   * @param offset defines the offset in the source array
   * @returns a new Color4 object
   */
  static FromArray(array, offset = 0) {
    return new _Color4(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
  }
  /**
   * Creates a new Color4 from the starting index element of the given array
   * @param array defines the source array to read from
   * @param offset defines the offset in the source array
   * @param result defines the target Color4 object
   */
  static FromArrayToRef(array, offset = 0, result) {
    result.r = array[offset];
    result.g = array[offset + 1];
    result.b = array[offset + 2];
    result.a = array[offset + 3];
  }
  /**
   * Creates a new Color3 from integer values (< 256)
   * @param r defines the red component to read from (value between 0 and 255)
   * @param g defines the green component to read from (value between 0 and 255)
   * @param b defines the blue component to read from (value between 0 and 255)
   * @param a defines the alpha component to read from (value between 0 and 255)
   * @returns a new Color3 object
   */
  static FromInts(r, g, b, a) {
    return new _Color4(r / 255, g / 255, b / 255, a / 255);
  }
  /**
   * Check the content of a given array and convert it to an array containing RGBA data
   * If the original array was already containing count * 4 values then it is returned directly
   * @param colors defines the array to check
   * @param count defines the number of RGBA data to expect
   * @returns an array containing count * 4 values (RGBA)
   */
  static CheckColors4(colors, count) {
    if (colors.length === count * 3) {
      const colors4 = [];
      for (let index = 0; index < colors.length; index += 3) {
        const newIndex = index / 3 * 4;
        colors4[newIndex] = colors[index];
        colors4[newIndex + 1] = colors[index + 1];
        colors4[newIndex + 2] = colors[index + 2];
        colors4[newIndex + 3] = 1;
      }
      return colors4;
    }
    return colors;
  }
};
var TmpColors = class {
};
TmpColors.Color3 = ArrayTools.BuildArray(3, Color3.Black);
TmpColors.Color4 = ArrayTools.BuildArray(3, () => new Color4(0, 0, 0, 0));
RegisterClass("BABYLON.Color3", Color3);
RegisterClass("BABYLON.Color4", Color4);

export {
  Color3,
  Color4,
  TmpColors
};
//# sourceMappingURL=chunk-G2L5SAWV.js.map
