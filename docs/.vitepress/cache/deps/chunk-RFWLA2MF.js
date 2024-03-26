// node_modules/@babylonjs/core/Maths/math.scalar.js
var Scalar = class _Scalar {
  /**
   * Boolean : true if the absolute difference between a and b is lower than epsilon (default = 1.401298E-45)
   * @param a number
   * @param b number
   * @param epsilon (default = 1.401298E-45)
   * @returns true if the absolute difference between a and b is lower than epsilon (default = 1.401298E-45)
   */
  static WithinEpsilon(a, b, epsilon = 1401298e-51) {
    return Math.abs(a - b) <= epsilon;
  }
  /**
   * Returns a string : the upper case translation of the number i to hexadecimal.
   * @param i number
   * @returns the upper case translation of the number i to hexadecimal.
   */
  static ToHex(i) {
    const str = i.toString(16);
    if (i <= 15) {
      return ("0" + str).toUpperCase();
    }
    return str.toUpperCase();
  }
  /**
   * Returns -1 if value is negative and +1 is value is positive.
   * @param value the value
   * @returns the value itself if it's equal to zero.
   */
  static Sign(value) {
    value = +value;
    if (value === 0 || isNaN(value)) {
      return value;
    }
    return value > 0 ? 1 : -1;
  }
  /**
   * Returns the value itself if it's between min and max.
   * Returns min if the value is lower than min.
   * Returns max if the value is greater than max.
   * @param value the value to clmap
   * @param min the min value to clamp to (default: 0)
   * @param max the max value to clamp to (default: 1)
   * @returns the clamped value
   */
  static Clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }
  /**
   * the log2 of value.
   * @param value the value to compute log2 of
   * @returns the log2 of value.
   */
  static Log2(value) {
    return Math.log(value) * Math.LOG2E;
  }
  /**
   * the floor part of a log2 value.
   * @param value the value to compute log2 of
   * @returns the log2 of value.
   */
  static ILog2(value) {
    if (Math.log2) {
      return Math.floor(Math.log2(value));
    }
    if (value < 0) {
      return NaN;
    } else if (value === 0) {
      return -Infinity;
    }
    let n = 0;
    if (value < 1) {
      while (value < 1) {
        n++;
        value = value * 2;
      }
      n = -n;
    } else if (value > 1) {
      while (value > 1) {
        n++;
        value = Math.floor(value / 2);
      }
    }
    return n;
  }
  /**
   * Loops the value, so that it is never larger than length and never smaller than 0.
   *
   * This is similar to the modulo operator but it works with floating point numbers.
   * For example, using 3.0 for t and 2.5 for length, the result would be 0.5.
   * With t = 5 and length = 2.5, the result would be 0.0.
   * Note, however, that the behaviour is not defined for negative numbers as it is for the modulo operator
   * @param value the value
   * @param length the length
   * @returns the looped value
   */
  static Repeat(value, length) {
    return value - Math.floor(value / length) * length;
  }
  /**
   * Normalize the value between 0.0 and 1.0 using min and max values
   * @param value value to normalize
   * @param min max to normalize between
   * @param max min to normalize between
   * @returns the normalized value
   */
  static Normalize(value, min, max) {
    return (value - min) / (max - min);
  }
  /**
   * Denormalize the value from 0.0 and 1.0 using min and max values
   * @param normalized value to denormalize
   * @param min max to denormalize between
   * @param max min to denormalize between
   * @returns the denormalized value
   */
  static Denormalize(normalized, min, max) {
    return normalized * (max - min) + min;
  }
  /**
   * Calculates the shortest difference between two given angles given in degrees.
   * @param current current angle in degrees
   * @param target target angle in degrees
   * @returns the delta
   */
  static DeltaAngle(current, target) {
    let num = _Scalar.Repeat(target - current, 360);
    if (num > 180) {
      num -= 360;
    }
    return num;
  }
  /**
   * PingPongs the value t, so that it is never larger than length and never smaller than 0.
   * @param tx value
   * @param length length
   * @returns The returned value will move back and forth between 0 and length
   */
  static PingPong(tx, length) {
    const t = _Scalar.Repeat(tx, length * 2);
    return length - Math.abs(t - length);
  }
  /**
   * Interpolates between min and max with smoothing at the limits.
   *
   * This function interpolates between min and max in a similar way to Lerp. However, the interpolation will gradually speed up
   * from the start and slow down toward the end. This is useful for creating natural-looking animation, fading and other transitions.
   * @param from from
   * @param to to
   * @param tx value
   * @returns the smooth stepped value
   */
  static SmoothStep(from, to, tx) {
    let t = _Scalar.Clamp(tx);
    t = -2 * t * t * t + 3 * t * t;
    return to * t + from * (1 - t);
  }
  /**
   * Moves a value current towards target.
   *
   * This is essentially the same as Mathf.Lerp but instead the function will ensure that the speed never exceeds maxDelta.
   * Negative values of maxDelta pushes the value away from target.
   * @param current current value
   * @param target target value
   * @param maxDelta max distance to move
   * @returns resulting value
   */
  static MoveTowards(current, target, maxDelta) {
    let result = 0;
    if (Math.abs(target - current) <= maxDelta) {
      result = target;
    } else {
      result = current + _Scalar.Sign(target - current) * maxDelta;
    }
    return result;
  }
  /**
   * Same as MoveTowards but makes sure the values interpolate correctly when they wrap around 360 degrees.
   *
   * Variables current and target are assumed to be in degrees. For optimization reasons, negative values of maxDelta
   *  are not supported and may cause oscillation. To push current away from a target angle, add 180 to that angle instead.
   * @param current current value
   * @param target target value
   * @param maxDelta max distance to move
   * @returns resulting angle
   */
  static MoveTowardsAngle(current, target, maxDelta) {
    const num = _Scalar.DeltaAngle(current, target);
    let result = 0;
    if (-maxDelta < num && num < maxDelta) {
      result = target;
    } else {
      target = current + num;
      result = _Scalar.MoveTowards(current, target, maxDelta);
    }
    return result;
  }
  /**
   * Creates a new scalar with values linearly interpolated of "amount" between the start scalar and the end scalar.
   * @param start start value
   * @param end target value
   * @param amount amount to lerp between
   * @returns the lerped value
   */
  static Lerp(start, end, amount) {
    return start + (end - start) * amount;
  }
  /**
   * Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
   * The parameter t is clamped to the range [0, 1]. Variables a and b are assumed to be in degrees.
   * @param start start value
   * @param end target value
   * @param amount amount to lerp between
   * @returns the lerped value
   */
  static LerpAngle(start, end, amount) {
    let num = _Scalar.Repeat(end - start, 360);
    if (num > 180) {
      num -= 360;
    }
    return start + num * _Scalar.Clamp(amount);
  }
  /**
   * Calculates the linear parameter t that produces the interpolant value within the range [a, b].
   * @param a start value
   * @param b target value
   * @param value value between a and b
   * @returns the inverseLerp value
   */
  static InverseLerp(a, b, value) {
    let result = 0;
    if (a != b) {
      result = _Scalar.Clamp((value - a) / (b - a));
    } else {
      result = 0;
    }
    return result;
  }
  /**
   * Returns a new scalar located for "amount" (float) on the Hermite spline defined by the scalars "value1", "value3", "tangent1", "tangent2".
   * @see http://mathworld.wolfram.com/HermitePolynomial.html
   * @param value1 defines the first control point
   * @param tangent1 defines the first tangent
   * @param value2 defines the second control point
   * @param tangent2 defines the second tangent
   * @param amount defines the amount on the interpolation spline (between 0 and 1)
   * @returns hermite result
   */
  static Hermite(value1, tangent1, value2, tangent2, amount) {
    const squared = amount * amount;
    const cubed = amount * squared;
    const part1 = 2 * cubed - 3 * squared + 1;
    const part2 = -2 * cubed + 3 * squared;
    const part3 = cubed - 2 * squared + amount;
    const part4 = cubed - squared;
    return value1 * part1 + value2 * part2 + tangent1 * part3 + tangent2 * part4;
  }
  /**
   * Returns a new scalar which is the 1st derivative of the Hermite spline defined by the scalars "value1", "value2", "tangent1", "tangent2".
   * @param value1 defines the first control point
   * @param tangent1 defines the first tangent
   * @param value2 defines the second control point
   * @param tangent2 defines the second tangent
   * @param time define where the derivative must be done
   * @returns 1st derivative
   */
  static Hermite1stDerivative(value1, tangent1, value2, tangent2, time) {
    const t2 = time * time;
    return (t2 - time) * 6 * value1 + (3 * t2 - 4 * time + 1) * tangent1 + (-t2 + time) * 6 * value2 + (3 * t2 - 2 * time) * tangent2;
  }
  /**
   * Returns a random float number between and min and max values
   * @param min min value of random
   * @param max max value of random
   * @returns random value
   */
  static RandomRange(min, max) {
    if (min === max) {
      return min;
    }
    return Math.random() * (max - min) + min;
  }
  /**
   * This function returns percentage of a number in a given range.
   *
   * RangeToPercent(40,20,60) will return 0.5 (50%)
   * RangeToPercent(34,0,100) will return 0.34 (34%)
   * @param number to convert to percentage
   * @param min min range
   * @param max max range
   * @returns the percentage
   */
  static RangeToPercent(number, min, max) {
    return (number - min) / (max - min);
  }
  /**
   * This function returns number that corresponds to the percentage in a given range.
   *
   * PercentToRange(0.34,0,100) will return 34.
   * @param percent to convert to number
   * @param min min range
   * @param max max range
   * @returns the number
   */
  static PercentToRange(percent, min, max) {
    return (max - min) * percent + min;
  }
  /**
   * Returns the angle converted to equivalent value between -Math.PI and Math.PI radians.
   * @param angle The angle to normalize in radian.
   * @returns The converted angle.
   */
  static NormalizeRadians(angle) {
    angle -= _Scalar.TwoPi * Math.floor((angle + Math.PI) / _Scalar.TwoPi);
    return angle;
  }
  /**
   * Returns the highest common factor of two integers.
   * @param a first parameter
   * @param b second parameter
   * @returns HCF of a and b
   */
  static HCF(a, b) {
    const r = a % b;
    if (r === 0) {
      return b;
    }
    return _Scalar.HCF(b, r);
  }
};
Scalar.TwoPi = Math.PI * 2;

// node_modules/@babylonjs/core/Maths/math.constants.js
var ToGammaSpace = 1 / 2.2;
var ToLinearSpace = 2.2;
var PHI = (1 + Math.sqrt(5)) / 2;
var Epsilon = 1e-3;

// node_modules/@babylonjs/core/Misc/arrayTools.js
var ArrayTools = class _ArrayTools {
  /**
   * Returns an array of the given size filled with elements built from the given constructor and the parameters.
   * @param size the number of element to construct and put in the array.
   * @param itemBuilder a callback responsible for creating new instance of item. Called once per array entry.
   * @returns a new array filled with new objects.
   */
  static BuildArray(size, itemBuilder) {
    const a = [];
    for (let i = 0; i < size; ++i) {
      a.push(itemBuilder());
    }
    return a;
  }
  /**
   * Returns a tuple of the given size filled with elements built from the given constructor and the parameters.
   * @param size he number of element to construct and put in the tuple.
   * @param itemBuilder a callback responsible for creating new instance of item. Called once per tuple entry.
   * @returns a new tuple filled with new objects.
   */
  static BuildTuple(size, itemBuilder) {
    return _ArrayTools.BuildArray(size, itemBuilder);
  }
};
function _observeArrayfunction(object, functionName, callback) {
  const oldFunction = object[functionName];
  if (typeof oldFunction !== "function") {
    return null;
  }
  const newFunction = function() {
    const previousLength = object.length;
    const returnValue = newFunction.previous.apply(object, arguments);
    callback(functionName, previousLength);
    return returnValue;
  };
  oldFunction.next = newFunction;
  newFunction.previous = oldFunction;
  object[functionName] = newFunction;
  return () => {
    const previous = newFunction.previous;
    if (!previous) {
      return;
    }
    const next = newFunction.next;
    if (next) {
      previous.next = next;
      next.previous = previous;
    } else {
      previous.next = void 0;
      object[functionName] = previous;
    }
    newFunction.next = void 0;
    newFunction.previous = void 0;
  };
}
var observedArrayFunctions = ["push", "splice", "pop", "shift", "unshift"];
function _ObserveArray(array, callback) {
  const unObserveFunctions = observedArrayFunctions.map((name) => {
    return _observeArrayfunction(array, name, callback);
  });
  return () => {
    unObserveFunctions.forEach((unObserveFunction) => {
      unObserveFunction == null ? void 0 : unObserveFunction();
    });
  };
}

export {
  Scalar,
  ToGammaSpace,
  ToLinearSpace,
  PHI,
  Epsilon,
  ArrayTools,
  _ObserveArray
};
//# sourceMappingURL=chunk-RFWLA2MF.js.map
