import {
  __esm
} from "./chunk-CF3WPAMV.js";

// node_modules/@babylonjs/core/Maths/math.constants.js
var ToGammaSpace, ToLinearSpace, PHI, Epsilon;
var init_math_constants = __esm({
  "node_modules/@babylonjs/core/Maths/math.constants.js"() {
    ToGammaSpace = 1 / 2.2;
    ToLinearSpace = 2.2;
    PHI = (1 + Math.sqrt(5)) / 2;
    Epsilon = 1e-3;
  }
});

// node_modules/@babylonjs/core/Misc/arrayTools.js
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
var ArrayTools, observedArrayFunctions;
var init_arrayTools = __esm({
  "node_modules/@babylonjs/core/Misc/arrayTools.js"() {
    ArrayTools = class _ArrayTools {
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
    observedArrayFunctions = ["push", "splice", "pop", "shift", "unshift"];
  }
});

// node_modules/@babylonjs/core/Maths/math.scalar.functions.js
function WithinEpsilon(a, b, epsilon = 1401298e-51) {
  return Math.abs(a - b) <= epsilon;
}
function RandomRange(min, max) {
  if (min === max) {
    return min;
  }
  return Math.random() * (max - min) + min;
}
function Lerp(start, end, amount) {
  return start + (end - start) * amount;
}
function Clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}
function NormalizeRadians(angle) {
  angle -= Math.PI * 2 * Math.floor((angle + Math.PI) / (Math.PI * 2));
  return angle;
}
function ToHex(i) {
  const str = i.toString(16);
  if (i <= 15) {
    return ("0" + str).toUpperCase();
  }
  return str.toUpperCase();
}
var init_math_scalar_functions = __esm({
  "node_modules/@babylonjs/core/Maths/math.scalar.functions.js"() {
  }
});

export {
  ToGammaSpace,
  ToLinearSpace,
  PHI,
  Epsilon,
  init_math_constants,
  ArrayTools,
  _ObserveArray,
  init_arrayTools,
  WithinEpsilon,
  RandomRange,
  Lerp,
  Clamp,
  NormalizeRadians,
  ToHex,
  init_math_scalar_functions
};
//# sourceMappingURL=chunk-G4HJMV2J.js.map
