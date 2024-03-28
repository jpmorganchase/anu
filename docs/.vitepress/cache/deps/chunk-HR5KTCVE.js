import {
  Color3,
  Color4,
  init_math_color
} from "./chunk-AA3MBXDE.js";
import {
  PerfCounter,
  init_perfCounter
} from "./chunk-P3J2XBLI.js";
import {
  Matrix,
  Quaternion,
  TmpVectors,
  Vector2,
  Vector3,
  init_math_vector
} from "./chunk-TESUJ6ZX.js";
import {
  _ObserveArray,
  init_arrayTools
} from "./chunk-G4HJMV2J.js";
import {
  LoadFile,
  Mix,
  ReadFile,
  RequestFile,
  Tools,
  init_fileTools,
  init_tools,
  init_tools_functions
} from "./chunk-TOSJRSWD.js";
import {
  DataBuffer,
  IsNavigatorAvailable,
  IsWindowObjectExist,
  Logger,
  PrecisionDate,
  ThinEngine,
  WebGLDataBuffer,
  _WarnImport,
  init_dataBuffer,
  init_devTools,
  init_domManagement,
  init_logger,
  init_precisionDate,
  init_thinEngine,
  init_webGLDataBuffer
} from "./chunk-655E2T6V.js";
import {
  EngineStore,
  Observable,
  init_engineStore,
  init_observable
} from "./chunk-AD6Y6P3L.js";
import {
  __esm
} from "./chunk-CF3WPAMV.js";

// node_modules/@babylonjs/core/Misc/smartArray.js
var SmartArray, SmartArrayNoDuplicate;
var init_smartArray = __esm({
  "node_modules/@babylonjs/core/Misc/smartArray.js"() {
    SmartArray = class _SmartArray {
      /**
       * Instantiates a Smart Array.
       * @param capacity defines the default capacity of the array.
       */
      constructor(capacity) {
        this.length = 0;
        this.data = new Array(capacity);
        this._id = _SmartArray._GlobalId++;
      }
      /**
       * Pushes a value at the end of the active data.
       * @param value defines the object to push in the array.
       */
      push(value) {
        this.data[this.length++] = value;
        if (this.length > this.data.length) {
          this.data.length *= 2;
        }
      }
      /**
       * Iterates over the active data and apply the lambda to them.
       * @param func defines the action to apply on each value.
       */
      forEach(func) {
        for (let index = 0; index < this.length; index++) {
          func(this.data[index]);
        }
      }
      /**
       * Sorts the full sets of data.
       * @param compareFn defines the comparison function to apply.
       */
      sort(compareFn) {
        this.data.sort(compareFn);
      }
      /**
       * Resets the active data to an empty array.
       */
      reset() {
        this.length = 0;
      }
      /**
       * Releases all the data from the array as well as the array.
       */
      dispose() {
        this.reset();
        if (this.data) {
          this.data.length = 0;
        }
      }
      /**
       * Concats the active data with a given array.
       * @param array defines the data to concatenate with.
       */
      concat(array) {
        if (array.length === 0) {
          return;
        }
        if (this.length + array.length > this.data.length) {
          this.data.length = (this.length + array.length) * 2;
        }
        for (let index = 0; index < array.length; index++) {
          this.data[this.length++] = (array.data || array)[index];
        }
      }
      /**
       * Returns the position of a value in the active data.
       * @param value defines the value to find the index for
       * @returns the index if found in the active data otherwise -1
       */
      indexOf(value) {
        const position = this.data.indexOf(value);
        if (position >= this.length) {
          return -1;
        }
        return position;
      }
      /**
       * Returns whether an element is part of the active data.
       * @param value defines the value to look for
       * @returns true if found in the active data otherwise false
       */
      contains(value) {
        return this.indexOf(value) !== -1;
      }
    };
    SmartArray._GlobalId = 0;
    SmartArrayNoDuplicate = class extends SmartArray {
      constructor() {
        super(...arguments);
        this._duplicateId = 0;
      }
      /**
       * Pushes a value at the end of the active data.
       * THIS DOES NOT PREVENT DUPPLICATE DATA
       * @param value defines the object to push in the array.
       */
      push(value) {
        super.push(value);
        if (!value.__smartArrayFlags) {
          value.__smartArrayFlags = {};
        }
        value.__smartArrayFlags[this._id] = this._duplicateId;
      }
      /**
       * Pushes a value at the end of the active data.
       * If the data is already present, it won t be added again
       * @param value defines the object to push in the array.
       * @returns true if added false if it was already present
       */
      pushNoDuplicate(value) {
        if (value.__smartArrayFlags && value.__smartArrayFlags[this._id] === this._duplicateId) {
          return false;
        }
        this.push(value);
        return true;
      }
      /**
       * Resets the active data to an empty array.
       */
      reset() {
        super.reset();
        this._duplicateId++;
      }
      /**
       * Concats the active data with a given array.
       * This ensures no duplicate will be present in the result.
       * @param array defines the data to concatenate with.
       */
      concatWithNoDuplicate(array) {
        if (array.length === 0) {
          return;
        }
        if (this.length + array.length > this.data.length) {
          this.data.length = (this.length + array.length) * 2;
        }
        for (let index = 0; index < array.length; index++) {
          const item = (array.data || array)[index];
          this.pushNoDuplicate(item);
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/stringDictionary.js
var StringDictionary;
var init_stringDictionary = __esm({
  "node_modules/@babylonjs/core/Misc/stringDictionary.js"() {
    StringDictionary = class {
      constructor() {
        this._count = 0;
        this._data = {};
      }
      /**
       * This will clear this dictionary and copy the content from the 'source' one.
       * If the T value is a custom object, it won't be copied/cloned, the same object will be used
       * @param source the dictionary to take the content from and copy to this dictionary
       */
      copyFrom(source) {
        this.clear();
        source.forEach((t, v) => this.add(t, v));
      }
      /**
       * Get a value based from its key
       * @param key the given key to get the matching value from
       * @returns the value if found, otherwise undefined is returned
       */
      get(key) {
        const val = this._data[key];
        if (val !== void 0) {
          return val;
        }
        return void 0;
      }
      /**
       * Get a value from its key or add it if it doesn't exist.
       * This method will ensure you that a given key/data will be present in the dictionary.
       * @param key the given key to get the matching value from
       * @param factory the factory that will create the value if the key is not present in the dictionary.
       * The factory will only be invoked if there's no data for the given key.
       * @returns the value corresponding to the key.
       */
      getOrAddWithFactory(key, factory) {
        let val = this.get(key);
        if (val !== void 0) {
          return val;
        }
        val = factory(key);
        if (val) {
          this.add(key, val);
        }
        return val;
      }
      /**
       * Get a value from its key if present in the dictionary otherwise add it
       * @param key the key to get the value from
       * @param val if there's no such key/value pair in the dictionary add it with this value
       * @returns the value corresponding to the key
       */
      getOrAdd(key, val) {
        const curVal = this.get(key);
        if (curVal !== void 0) {
          return curVal;
        }
        this.add(key, val);
        return val;
      }
      /**
       * Check if there's a given key in the dictionary
       * @param key the key to check for
       * @returns true if the key is present, false otherwise
       */
      contains(key) {
        return this._data[key] !== void 0;
      }
      /**
       * Add a new key and its corresponding value
       * @param key the key to add
       * @param value the value corresponding to the key
       * @returns true if the operation completed successfully, false if we couldn't insert the key/value because there was already this key in the dictionary
       */
      add(key, value) {
        if (this._data[key] !== void 0) {
          return false;
        }
        this._data[key] = value;
        ++this._count;
        return true;
      }
      /**
       * Update a specific value associated to a key
       * @param key defines the key to use
       * @param value defines the value to store
       * @returns true if the value was updated (or false if the key was not found)
       */
      set(key, value) {
        if (this._data[key] === void 0) {
          return false;
        }
        this._data[key] = value;
        return true;
      }
      /**
       * Get the element of the given key and remove it from the dictionary
       * @param key defines the key to search
       * @returns the value associated with the key or null if not found
       */
      getAndRemove(key) {
        const val = this.get(key);
        if (val !== void 0) {
          delete this._data[key];
          --this._count;
          return val;
        }
        return null;
      }
      /**
       * Remove a key/value from the dictionary.
       * @param key the key to remove
       * @returns true if the item was successfully deleted, false if no item with such key exist in the dictionary
       */
      remove(key) {
        if (this.contains(key)) {
          delete this._data[key];
          --this._count;
          return true;
        }
        return false;
      }
      /**
       * Clear the whole content of the dictionary
       */
      clear() {
        this._data = {};
        this._count = 0;
      }
      /**
       * Gets the current count
       */
      get count() {
        return this._count;
      }
      /**
       * Execute a callback on each key/val of the dictionary.
       * Note that you can remove any element in this dictionary in the callback implementation
       * @param callback the callback to execute on a given key/value pair
       */
      forEach(callback) {
        for (const cur in this._data) {
          const val = this._data[cur];
          callback(cur, val);
        }
      }
      /**
       * Execute a callback on every occurrence of the dictionary until it returns a valid TRes object.
       * If the callback returns null or undefined the method will iterate to the next key/value pair
       * Note that you can remove any element in this dictionary in the callback implementation
       * @param callback the callback to execute, if it return a valid T instanced object the enumeration will stop and the object will be returned
       * @returns the first item
       */
      first(callback) {
        for (const cur in this._data) {
          const val = this._data[cur];
          const res = callback(cur, val);
          if (res) {
            return res;
          }
        }
        return null;
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/andOrNotEvaluator.js
var AndOrNotEvaluator;
var init_andOrNotEvaluator = __esm({
  "node_modules/@babylonjs/core/Misc/andOrNotEvaluator.js"() {
    AndOrNotEvaluator = class _AndOrNotEvaluator {
      /**
       * Evaluate a query
       * @param query defines the query to evaluate
       * @param evaluateCallback defines the callback used to filter result
       * @returns true if the query matches
       */
      static Eval(query, evaluateCallback) {
        if (!query.match(/\([^()]*\)/g)) {
          query = _AndOrNotEvaluator._HandleParenthesisContent(query, evaluateCallback);
        } else {
          query = query.replace(/\([^()]*\)/g, (r) => {
            r = r.slice(1, r.length - 1);
            return _AndOrNotEvaluator._HandleParenthesisContent(r, evaluateCallback);
          });
        }
        if (query === "true") {
          return true;
        }
        if (query === "false") {
          return false;
        }
        return _AndOrNotEvaluator.Eval(query, evaluateCallback);
      }
      static _HandleParenthesisContent(parenthesisContent, evaluateCallback) {
        evaluateCallback = evaluateCallback || ((r) => {
          return r === "true" ? true : false;
        });
        let result;
        const or = parenthesisContent.split("||");
        for (const i in or) {
          if (Object.prototype.hasOwnProperty.call(or, i)) {
            let ori = _AndOrNotEvaluator._SimplifyNegation(or[i].trim());
            const and = ori.split("&&");
            if (and.length > 1) {
              for (let j = 0; j < and.length; ++j) {
                const andj = _AndOrNotEvaluator._SimplifyNegation(and[j].trim());
                if (andj !== "true" && andj !== "false") {
                  if (andj[0] === "!") {
                    result = !evaluateCallback(andj.substring(1));
                  } else {
                    result = evaluateCallback(andj);
                  }
                } else {
                  result = andj === "true" ? true : false;
                }
                if (!result) {
                  ori = "false";
                  break;
                }
              }
            }
            if (result || ori === "true") {
              result = true;
              break;
            }
            if (ori !== "true" && ori !== "false") {
              if (ori[0] === "!") {
                result = !evaluateCallback(ori.substring(1));
              } else {
                result = evaluateCallback(ori);
              }
            } else {
              result = ori === "true" ? true : false;
            }
          }
        }
        return result ? "true" : "false";
      }
      static _SimplifyNegation(booleanString) {
        booleanString = booleanString.replace(/^[\s!]+/, (r) => {
          r = r.replace(/[\s]/g, () => "");
          return r.length % 2 ? "!" : "";
        });
        booleanString = booleanString.trim();
        if (booleanString === "!true") {
          booleanString = "false";
        } else if (booleanString === "!false") {
          booleanString = "true";
        }
        return booleanString;
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/tags.js
var Tags;
var init_tags = __esm({
  "node_modules/@babylonjs/core/Misc/tags.js"() {
    init_andOrNotEvaluator();
    Tags = class _Tags {
      /**
       * Adds support for tags on the given object
       * @param obj defines the object to use
       */
      static EnableFor(obj) {
        obj._tags = obj._tags || {};
        obj.hasTags = () => {
          return _Tags.HasTags(obj);
        };
        obj.addTags = (tagsString) => {
          return _Tags.AddTagsTo(obj, tagsString);
        };
        obj.removeTags = (tagsString) => {
          return _Tags.RemoveTagsFrom(obj, tagsString);
        };
        obj.matchesTagsQuery = (tagsQuery) => {
          return _Tags.MatchesQuery(obj, tagsQuery);
        };
      }
      /**
       * Removes tags support
       * @param obj defines the object to use
       */
      static DisableFor(obj) {
        delete obj._tags;
        delete obj.hasTags;
        delete obj.addTags;
        delete obj.removeTags;
        delete obj.matchesTagsQuery;
      }
      /**
       * Gets a boolean indicating if the given object has tags
       * @param obj defines the object to use
       * @returns a boolean
       */
      static HasTags(obj) {
        if (!obj._tags) {
          return false;
        }
        const tags = obj._tags;
        for (const i in tags) {
          if (Object.prototype.hasOwnProperty.call(tags, i)) {
            return true;
          }
        }
        return false;
      }
      /**
       * Gets the tags available on a given object
       * @param obj defines the object to use
       * @param asString defines if the tags must be returned as a string instead of an array of strings
       * @returns the tags
       */
      static GetTags(obj, asString = true) {
        if (!obj._tags) {
          return null;
        }
        if (asString) {
          const tagsArray = [];
          for (const tag in obj._tags) {
            if (Object.prototype.hasOwnProperty.call(obj._tags, tag) && obj._tags[tag] === true) {
              tagsArray.push(tag);
            }
          }
          return tagsArray.join(" ");
        } else {
          return obj._tags;
        }
      }
      /**
       * Adds tags to an object
       * @param obj defines the object to use
       * @param tagsString defines the tag string. The tags 'true' and 'false' are reserved and cannot be used as tags.
       * A tag cannot start with '||', '&&', and '!'. It cannot contain whitespaces
       */
      static AddTagsTo(obj, tagsString) {
        if (!tagsString) {
          return;
        }
        if (typeof tagsString !== "string") {
          return;
        }
        const tags = tagsString.split(" ");
        tags.forEach(function(tag) {
          _Tags._AddTagTo(obj, tag);
        });
      }
      /**
       * @internal
       */
      static _AddTagTo(obj, tag) {
        tag = tag.trim();
        if (tag === "" || tag === "true" || tag === "false") {
          return;
        }
        if (tag.match(/[\s]/) || tag.match(/^([!]|([|]|[&]){2})/)) {
          return;
        }
        _Tags.EnableFor(obj);
        obj._tags[tag] = true;
      }
      /**
       * Removes specific tags from a specific object
       * @param obj defines the object to use
       * @param tagsString defines the tags to remove
       */
      static RemoveTagsFrom(obj, tagsString) {
        if (!_Tags.HasTags(obj)) {
          return;
        }
        const tags = tagsString.split(" ");
        for (const t in tags) {
          _Tags._RemoveTagFrom(obj, tags[t]);
        }
      }
      /**
       * @internal
       */
      static _RemoveTagFrom(obj, tag) {
        delete obj._tags[tag];
      }
      /**
       * Defines if tags hosted on an object match a given query
       * @param obj defines the object to use
       * @param tagsQuery defines the tag query
       * @returns a boolean
       */
      static MatchesQuery(obj, tagsQuery) {
        if (tagsQuery === void 0) {
          return true;
        }
        if (tagsQuery === "") {
          return _Tags.HasTags(obj);
        }
        return AndOrNotEvaluator.Eval(tagsQuery, (r) => _Tags.HasTags(obj) && obj._tags[r]);
      }
    };
  }
});

// node_modules/@babylonjs/core/abstractScene.js
var AbstractScene;
var init_abstractScene = __esm({
  "node_modules/@babylonjs/core/abstractScene.js"() {
    AbstractScene = class {
      constructor() {
        this.rootNodes = [];
        this.cameras = [];
        this.lights = [];
        this.meshes = [];
        this.skeletons = [];
        this.particleSystems = [];
        this.animations = [];
        this.animationGroups = [];
        this.multiMaterials = [];
        this.materials = [];
        this.morphTargetManagers = [];
        this.geometries = [];
        this.transformNodes = [];
        this.actionManagers = [];
        this.textures = [];
        this._environmentTexture = null;
        this.postProcesses = [];
      }
      /**
       * Adds a parser in the list of available ones
       * @param name Defines the name of the parser
       * @param parser Defines the parser to add
       */
      static AddParser(name, parser) {
        this._BabylonFileParsers[name] = parser;
      }
      /**
       * Gets a general parser from the list of available ones
       * @param name Defines the name of the parser
       * @returns the requested parser or null
       */
      static GetParser(name) {
        if (this._BabylonFileParsers[name]) {
          return this._BabylonFileParsers[name];
        }
        return null;
      }
      /**
       * Adds n individual parser in the list of available ones
       * @param name Defines the name of the parser
       * @param parser Defines the parser to add
       */
      static AddIndividualParser(name, parser) {
        this._IndividualBabylonFileParsers[name] = parser;
      }
      /**
       * Gets an individual parser from the list of available ones
       * @param name Defines the name of the parser
       * @returns the requested parser or null
       */
      static GetIndividualParser(name) {
        if (this._IndividualBabylonFileParsers[name]) {
          return this._IndividualBabylonFileParsers[name];
        }
        return null;
      }
      /**
       * Parser json data and populate both a scene and its associated container object
       * @param jsonData Defines the data to parse
       * @param scene Defines the scene to parse the data for
       * @param container Defines the container attached to the parsing sequence
       * @param rootUrl Defines the root url of the data
       */
      static Parse(jsonData, scene, container, rootUrl) {
        for (const parserName in this._BabylonFileParsers) {
          if (Object.prototype.hasOwnProperty.call(this._BabylonFileParsers, parserName)) {
            this._BabylonFileParsers[parserName](jsonData, scene, container, rootUrl);
          }
        }
      }
      /**
       * Texture used in all pbr material as the reflection texture.
       * As in the majority of the scene they are the same (exception for multi room and so on),
       * this is easier to reference from here than from all the materials.
       */
      get environmentTexture() {
        return this._environmentTexture;
      }
      set environmentTexture(value) {
        this._environmentTexture = value;
      }
      /**
       * @returns all meshes, lights, cameras, transformNodes and bones
       */
      getNodes() {
        let nodes = [];
        nodes = nodes.concat(this.meshes);
        nodes = nodes.concat(this.lights);
        nodes = nodes.concat(this.cameras);
        nodes = nodes.concat(this.transformNodes);
        this.skeletons.forEach((skeleton) => nodes = nodes.concat(skeleton.bones));
        return nodes;
      }
    };
    AbstractScene._BabylonFileParsers = {};
    AbstractScene._IndividualBabylonFileParsers = {};
  }
});

// node_modules/@babylonjs/core/tslib.es6.js
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
var init_tslib_es6 = __esm({
  "node_modules/@babylonjs/core/tslib.es6.js"() {
  }
});

// node_modules/@babylonjs/core/Misc/decorators.functions.js
function GetDirectStore(target) {
  const classKey = target.getClassName();
  if (!__decoratorInitialStore[classKey]) {
    __decoratorInitialStore[classKey] = {};
  }
  return __decoratorInitialStore[classKey];
}
function GetMergedStore(target) {
  const classKey = target.getClassName();
  if (__mergedStore[classKey]) {
    return __mergedStore[classKey];
  }
  __mergedStore[classKey] = {};
  const store = __mergedStore[classKey];
  let currentTarget = target;
  let currentKey = classKey;
  while (currentKey) {
    const initialStore = __decoratorInitialStore[currentKey];
    for (const property in initialStore) {
      store[property] = initialStore[property];
    }
    let parent;
    let done = false;
    do {
      parent = Object.getPrototypeOf(currentTarget);
      if (!parent.getClassName) {
        done = true;
        break;
      }
      if (parent.getClassName() !== currentKey) {
        break;
      }
      currentTarget = parent;
    } while (parent);
    if (done) {
      break;
    }
    currentKey = parent.getClassName();
    currentTarget = parent;
  }
  return store;
}
var __mergedStore, __decoratorInitialStore;
var init_decorators_functions = __esm({
  "node_modules/@babylonjs/core/Misc/decorators.functions.js"() {
    __mergedStore = {};
    __decoratorInitialStore = {};
  }
});

// node_modules/@babylonjs/core/Misc/decorators.js
function generateSerializableMember(type, sourceName) {
  return (target, propertyKey) => {
    const classStore = GetDirectStore(target);
    if (!classStore[propertyKey]) {
      classStore[propertyKey] = { type, sourceName };
    }
  };
}
function generateExpandMember(setCallback, targetKey = null) {
  return (target, propertyKey) => {
    const key = targetKey || "_" + propertyKey;
    Object.defineProperty(target, propertyKey, {
      get: function() {
        return this[key];
      },
      set: function(value) {
        if (typeof this.equals === "function") {
          if (this.equals(value)) {
            return;
          }
        }
        if (this[key] === value) {
          return;
        }
        this[key] = value;
        target[setCallback].apply(this);
      },
      enumerable: true,
      configurable: true
    });
  };
}
function expandToProperty(callback, targetKey = null) {
  return generateExpandMember(callback, targetKey);
}
function serialize(sourceName) {
  return generateSerializableMember(0, sourceName);
}
function serializeAsTexture(sourceName) {
  return generateSerializableMember(1, sourceName);
}
function serializeAsColor3(sourceName) {
  return generateSerializableMember(2, sourceName);
}
function serializeAsFresnelParameters(sourceName) {
  return generateSerializableMember(3, sourceName);
}
function serializeAsVector2(sourceName) {
  return generateSerializableMember(4, sourceName);
}
function serializeAsVector3(sourceName) {
  return generateSerializableMember(5, sourceName);
}
function serializeAsMeshReference(sourceName) {
  return generateSerializableMember(6, sourceName);
}
function serializeAsColorCurves(sourceName) {
  return generateSerializableMember(7, sourceName);
}
function serializeAsColor4(sourceName) {
  return generateSerializableMember(8, sourceName);
}
function serializeAsImageProcessingConfiguration(sourceName) {
  return generateSerializableMember(9, sourceName);
}
function serializeAsQuaternion(sourceName) {
  return generateSerializableMember(10, sourceName);
}
function serializeAsMatrix(sourceName) {
  return generateSerializableMember(12, sourceName);
}
function serializeAsCameraReference(sourceName) {
  return generateSerializableMember(11, sourceName);
}
function nativeOverride(target, propertyKey, descriptor, predicate) {
  const jsFunc = descriptor.value;
  descriptor.value = (...params) => {
    let func = jsFunc;
    if (typeof _native !== "undefined" && _native[propertyKey]) {
      const nativeFunc = _native[propertyKey];
      if (predicate) {
        func = (...params2) => predicate(...params2) ? nativeFunc(...params2) : jsFunc(...params2);
      } else {
        func = nativeFunc;
      }
    }
    target[propertyKey] = func;
    return func(...params);
  };
}
var init_decorators = __esm({
  "node_modules/@babylonjs/core/Misc/decorators.js"() {
    init_decorators_functions();
    nativeOverride.filter = function(predicate) {
      return (target, propertyKey, descriptor) => nativeOverride(target, propertyKey, descriptor, predicate);
    };
  }
});

// node_modules/@babylonjs/core/Misc/decorators.serialization.js
var _copySource, SerializationHelper;
var init_decorators_serialization = __esm({
  "node_modules/@babylonjs/core/Misc/decorators.serialization.js"() {
    init_devTools();
    init_tags();
    init_math_color();
    init_math_vector();
    init_decorators_functions();
    _copySource = function(creationFunction, source, instanciate, options = {}) {
      const destination = creationFunction();
      if (Tags && Tags.HasTags(source)) {
        Tags.AddTagsTo(destination, Tags.GetTags(source, true));
      }
      const classStore = GetMergedStore(destination);
      const textureMap = {};
      for (const property in classStore) {
        const propertyDescriptor = classStore[property];
        const sourceProperty = source[property];
        const propertyType = propertyDescriptor.type;
        if (sourceProperty !== void 0 && sourceProperty !== null && (property !== "uniqueId" || SerializationHelper.AllowLoadingUniqueId)) {
          switch (propertyType) {
            case 0:
            case 6:
            case 11:
              destination[property] = sourceProperty;
              break;
            case 1:
              if (options.cloneTexturesOnlyOnce && textureMap[sourceProperty.uniqueId]) {
                destination[property] = textureMap[sourceProperty.uniqueId];
              } else {
                destination[property] = instanciate || sourceProperty.isRenderTarget ? sourceProperty : sourceProperty.clone();
                textureMap[sourceProperty.uniqueId] = destination[property];
              }
              break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 7:
            case 10:
            case 12:
              destination[property] = instanciate ? sourceProperty : sourceProperty.clone();
              break;
          }
        }
      }
      return destination;
    };
    SerializationHelper = class _SerializationHelper {
      /**
       * Appends the serialized animations from the source animations
       * @param source Source containing the animations
       * @param destination Target to store the animations
       */
      static AppendSerializedAnimations(source, destination) {
        if (source.animations) {
          destination.animations = [];
          for (let animationIndex = 0; animationIndex < source.animations.length; animationIndex++) {
            const animation = source.animations[animationIndex];
            destination.animations.push(animation.serialize());
          }
        }
      }
      /**
       * Static function used to serialized a specific entity
       * @param entity defines the entity to serialize
       * @param serializationObject defines the optional target object where serialization data will be stored
       * @returns a JSON compatible object representing the serialization of the entity
       */
      static Serialize(entity, serializationObject) {
        if (!serializationObject) {
          serializationObject = {};
        }
        if (Tags) {
          serializationObject.tags = Tags.GetTags(entity);
        }
        const serializedProperties = GetMergedStore(entity);
        for (const property in serializedProperties) {
          const propertyDescriptor = serializedProperties[property];
          const targetPropertyName = propertyDescriptor.sourceName || property;
          const propertyType = propertyDescriptor.type;
          const sourceProperty = entity[property];
          if (sourceProperty !== void 0 && sourceProperty !== null && (property !== "uniqueId" || _SerializationHelper.AllowLoadingUniqueId)) {
            switch (propertyType) {
              case 0:
                serializationObject[targetPropertyName] = sourceProperty;
                break;
              case 1:
                serializationObject[targetPropertyName] = sourceProperty.serialize();
                break;
              case 2:
                serializationObject[targetPropertyName] = sourceProperty.asArray();
                break;
              case 3:
                serializationObject[targetPropertyName] = sourceProperty.serialize();
                break;
              case 4:
                serializationObject[targetPropertyName] = sourceProperty.asArray();
                break;
              case 5:
                serializationObject[targetPropertyName] = sourceProperty.asArray();
                break;
              case 6:
                serializationObject[targetPropertyName] = sourceProperty.id;
                break;
              case 7:
                serializationObject[targetPropertyName] = sourceProperty.serialize();
                break;
              case 8:
                serializationObject[targetPropertyName] = sourceProperty.asArray();
                break;
              case 9:
                serializationObject[targetPropertyName] = sourceProperty.serialize();
                break;
              case 10:
                serializationObject[targetPropertyName] = sourceProperty.asArray();
                break;
              case 11:
                serializationObject[targetPropertyName] = sourceProperty.id;
                break;
              case 12:
                serializationObject[targetPropertyName] = sourceProperty.asArray();
                break;
            }
          }
        }
        return serializationObject;
      }
      /**
       * Given a source json and a destination object in a scene, this function will parse the source and will try to apply its content to the destination object
       * @param source the source json data
       * @param destination the destination object
       * @param scene the scene where the object is
       * @param rootUrl root url to use to load assets
       */
      static ParseProperties(source, destination, scene, rootUrl) {
        if (!rootUrl) {
          rootUrl = "";
        }
        const classStore = GetMergedStore(destination);
        for (const property in classStore) {
          const propertyDescriptor = classStore[property];
          const sourceProperty = source[propertyDescriptor.sourceName || property];
          const propertyType = propertyDescriptor.type;
          if (sourceProperty !== void 0 && sourceProperty !== null && (property !== "uniqueId" || _SerializationHelper.AllowLoadingUniqueId)) {
            const dest = destination;
            switch (propertyType) {
              case 0:
                dest[property] = sourceProperty;
                break;
              case 1:
                if (scene) {
                  dest[property] = _SerializationHelper._TextureParser(sourceProperty, scene, rootUrl);
                }
                break;
              case 2:
                dest[property] = Color3.FromArray(sourceProperty);
                break;
              case 3:
                dest[property] = _SerializationHelper._FresnelParametersParser(sourceProperty);
                break;
              case 4:
                dest[property] = Vector2.FromArray(sourceProperty);
                break;
              case 5:
                dest[property] = Vector3.FromArray(sourceProperty);
                break;
              case 6:
                if (scene) {
                  dest[property] = scene.getLastMeshById(sourceProperty);
                }
                break;
              case 7:
                dest[property] = _SerializationHelper._ColorCurvesParser(sourceProperty);
                break;
              case 8:
                dest[property] = Color4.FromArray(sourceProperty);
                break;
              case 9:
                dest[property] = _SerializationHelper._ImageProcessingConfigurationParser(sourceProperty);
                break;
              case 10:
                dest[property] = Quaternion.FromArray(sourceProperty);
                break;
              case 11:
                if (scene) {
                  dest[property] = scene.getCameraById(sourceProperty);
                }
                break;
              case 12:
                dest[property] = Matrix.FromArray(sourceProperty);
                break;
            }
          }
        }
      }
      /**
       * Creates a new entity from a serialization data object
       * @param creationFunction defines a function used to instanciated the new entity
       * @param source defines the source serialization data
       * @param scene defines the hosting scene
       * @param rootUrl defines the root url for resources
       * @returns a new entity
       */
      static Parse(creationFunction, source, scene, rootUrl = null) {
        const destination = creationFunction();
        if (Tags) {
          Tags.AddTagsTo(destination, source.tags);
        }
        _SerializationHelper.ParseProperties(source, destination, scene, rootUrl);
        return destination;
      }
      /**
       * Clones an object
       * @param creationFunction defines the function used to instanciate the new object
       * @param source defines the source object
       * @param options defines the options to use
       * @returns the cloned object
       */
      static Clone(creationFunction, source, options = {}) {
        return _copySource(creationFunction, source, false, options);
      }
      /**
       * Instanciates a new object based on a source one (some data will be shared between both object)
       * @param creationFunction defines the function used to instanciate the new object
       * @param source defines the source object
       * @returns the new object
       */
      static Instanciate(creationFunction, source) {
        return _copySource(creationFunction, source, true);
      }
    };
    SerializationHelper.AllowLoadingUniqueId = false;
    SerializationHelper._ImageProcessingConfigurationParser = (sourceProperty) => {
      throw _WarnImport("ImageProcessingConfiguration");
    };
    SerializationHelper._FresnelParametersParser = (sourceProperty) => {
      throw _WarnImport("FresnelParameters");
    };
    SerializationHelper._ColorCurvesParser = (sourceProperty) => {
      throw _WarnImport("ColorCurves");
    };
    SerializationHelper._TextureParser = (sourceProperty, scene, rootUrl) => {
      throw _WarnImport("Texture");
    };
  }
});

// node_modules/@babylonjs/core/Materials/colorCurves.functions.js
function PrepareUniformsForColorCurves(uniformsList) {
  uniformsList.push("vCameraColorCurveNeutral", "vCameraColorCurvePositive", "vCameraColorCurveNegative");
}
var init_colorCurves_functions = __esm({
  "node_modules/@babylonjs/core/Materials/colorCurves.functions.js"() {
  }
});

// node_modules/@babylonjs/core/Materials/colorCurves.js
var ColorCurves;
var init_colorCurves = __esm({
  "node_modules/@babylonjs/core/Materials/colorCurves.js"() {
    init_tslib_es6();
    init_decorators();
    init_math_color();
    init_decorators_serialization();
    init_colorCurves_functions();
    ColorCurves = class _ColorCurves {
      constructor() {
        this._dirty = true;
        this._tempColor = new Color4(0, 0, 0, 0);
        this._globalCurve = new Color4(0, 0, 0, 0);
        this._highlightsCurve = new Color4(0, 0, 0, 0);
        this._midtonesCurve = new Color4(0, 0, 0, 0);
        this._shadowsCurve = new Color4(0, 0, 0, 0);
        this._positiveCurve = new Color4(0, 0, 0, 0);
        this._negativeCurve = new Color4(0, 0, 0, 0);
        this._globalHue = 30;
        this._globalDensity = 0;
        this._globalSaturation = 0;
        this._globalExposure = 0;
        this._highlightsHue = 30;
        this._highlightsDensity = 0;
        this._highlightsSaturation = 0;
        this._highlightsExposure = 0;
        this._midtonesHue = 30;
        this._midtonesDensity = 0;
        this._midtonesSaturation = 0;
        this._midtonesExposure = 0;
        this._shadowsHue = 30;
        this._shadowsDensity = 0;
        this._shadowsSaturation = 0;
        this._shadowsExposure = 0;
      }
      /**
       * Gets the global Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      get globalHue() {
        return this._globalHue;
      }
      /**
       * Sets the global Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      set globalHue(value) {
        this._globalHue = value;
        this._dirty = true;
      }
      /**
       * Gets the global Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      get globalDensity() {
        return this._globalDensity;
      }
      /**
       * Sets the global Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      set globalDensity(value) {
        this._globalDensity = value;
        this._dirty = true;
      }
      /**
       * Gets the global Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      get globalSaturation() {
        return this._globalSaturation;
      }
      /**
       * Sets the global Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      set globalSaturation(value) {
        this._globalSaturation = value;
        this._dirty = true;
      }
      /**
       * Gets the global Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      get globalExposure() {
        return this._globalExposure;
      }
      /**
       * Sets the global Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      set globalExposure(value) {
        this._globalExposure = value;
        this._dirty = true;
      }
      /**
       * Gets the highlights Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      get highlightsHue() {
        return this._highlightsHue;
      }
      /**
       * Sets the highlights Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      set highlightsHue(value) {
        this._highlightsHue = value;
        this._dirty = true;
      }
      /**
       * Gets the highlights Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      get highlightsDensity() {
        return this._highlightsDensity;
      }
      /**
       * Sets the highlights Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      set highlightsDensity(value) {
        this._highlightsDensity = value;
        this._dirty = true;
      }
      /**
       * Gets the highlights Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      get highlightsSaturation() {
        return this._highlightsSaturation;
      }
      /**
       * Sets the highlights Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      set highlightsSaturation(value) {
        this._highlightsSaturation = value;
        this._dirty = true;
      }
      /**
       * Gets the highlights Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      get highlightsExposure() {
        return this._highlightsExposure;
      }
      /**
       * Sets the highlights Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      set highlightsExposure(value) {
        this._highlightsExposure = value;
        this._dirty = true;
      }
      /**
       * Gets the midtones Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      get midtonesHue() {
        return this._midtonesHue;
      }
      /**
       * Sets the midtones Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      set midtonesHue(value) {
        this._midtonesHue = value;
        this._dirty = true;
      }
      /**
       * Gets the midtones Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      get midtonesDensity() {
        return this._midtonesDensity;
      }
      /**
       * Sets the midtones Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      set midtonesDensity(value) {
        this._midtonesDensity = value;
        this._dirty = true;
      }
      /**
       * Gets the midtones Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      get midtonesSaturation() {
        return this._midtonesSaturation;
      }
      /**
       * Sets the midtones Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      set midtonesSaturation(value) {
        this._midtonesSaturation = value;
        this._dirty = true;
      }
      /**
       * Gets the midtones Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      get midtonesExposure() {
        return this._midtonesExposure;
      }
      /**
       * Sets the midtones Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      set midtonesExposure(value) {
        this._midtonesExposure = value;
        this._dirty = true;
      }
      /**
       * Gets the shadows Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      get shadowsHue() {
        return this._shadowsHue;
      }
      /**
       * Sets the shadows Hue value.
       * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
       */
      set shadowsHue(value) {
        this._shadowsHue = value;
        this._dirty = true;
      }
      /**
       * Gets the shadows Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      get shadowsDensity() {
        return this._shadowsDensity;
      }
      /**
       * Sets the shadows Density value.
       * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
       * Values less than zero provide a filter of opposite hue.
       */
      set shadowsDensity(value) {
        this._shadowsDensity = value;
        this._dirty = true;
      }
      /**
       * Gets the shadows Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      get shadowsSaturation() {
        return this._shadowsSaturation;
      }
      /**
       * Sets the shadows Saturation value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
       */
      set shadowsSaturation(value) {
        this._shadowsSaturation = value;
        this._dirty = true;
      }
      /**
       * Gets the shadows Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      get shadowsExposure() {
        return this._shadowsExposure;
      }
      /**
       * Sets the shadows Exposure value.
       * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
       */
      set shadowsExposure(value) {
        this._shadowsExposure = value;
        this._dirty = true;
      }
      /**
       * Returns the class name
       * @returns The class name
       */
      getClassName() {
        return "ColorCurves";
      }
      /**
       * Binds the color curves to the shader.
       * @param colorCurves The color curve to bind
       * @param effect The effect to bind to
       * @param positiveUniform The positive uniform shader parameter
       * @param neutralUniform The neutral uniform shader parameter
       * @param negativeUniform The negative uniform shader parameter
       */
      static Bind(colorCurves, effect, positiveUniform = "vCameraColorCurvePositive", neutralUniform = "vCameraColorCurveNeutral", negativeUniform = "vCameraColorCurveNegative") {
        if (colorCurves._dirty) {
          colorCurves._dirty = false;
          colorCurves._getColorGradingDataToRef(colorCurves._globalHue, colorCurves._globalDensity, colorCurves._globalSaturation, colorCurves._globalExposure, colorCurves._globalCurve);
          colorCurves._getColorGradingDataToRef(colorCurves._highlightsHue, colorCurves._highlightsDensity, colorCurves._highlightsSaturation, colorCurves._highlightsExposure, colorCurves._tempColor);
          colorCurves._tempColor.multiplyToRef(colorCurves._globalCurve, colorCurves._highlightsCurve);
          colorCurves._getColorGradingDataToRef(colorCurves._midtonesHue, colorCurves._midtonesDensity, colorCurves._midtonesSaturation, colorCurves._midtonesExposure, colorCurves._tempColor);
          colorCurves._tempColor.multiplyToRef(colorCurves._globalCurve, colorCurves._midtonesCurve);
          colorCurves._getColorGradingDataToRef(colorCurves._shadowsHue, colorCurves._shadowsDensity, colorCurves._shadowsSaturation, colorCurves._shadowsExposure, colorCurves._tempColor);
          colorCurves._tempColor.multiplyToRef(colorCurves._globalCurve, colorCurves._shadowsCurve);
          colorCurves._highlightsCurve.subtractToRef(colorCurves._midtonesCurve, colorCurves._positiveCurve);
          colorCurves._midtonesCurve.subtractToRef(colorCurves._shadowsCurve, colorCurves._negativeCurve);
        }
        if (effect) {
          effect.setFloat4(positiveUniform, colorCurves._positiveCurve.r, colorCurves._positiveCurve.g, colorCurves._positiveCurve.b, colorCurves._positiveCurve.a);
          effect.setFloat4(neutralUniform, colorCurves._midtonesCurve.r, colorCurves._midtonesCurve.g, colorCurves._midtonesCurve.b, colorCurves._midtonesCurve.a);
          effect.setFloat4(negativeUniform, colorCurves._negativeCurve.r, colorCurves._negativeCurve.g, colorCurves._negativeCurve.b, colorCurves._negativeCurve.a);
        }
      }
      /**
       * Returns color grading data based on a hue, density, saturation and exposure value.
       * @param hue
       * @param density
       * @param saturation The saturation.
       * @param exposure The exposure.
       * @param result The result data container.
       */
      _getColorGradingDataToRef(hue, density, saturation, exposure, result) {
        if (hue == null) {
          return;
        }
        hue = _ColorCurves._Clamp(hue, 0, 360);
        density = _ColorCurves._Clamp(density, -100, 100);
        saturation = _ColorCurves._Clamp(saturation, -100, 100);
        exposure = _ColorCurves._Clamp(exposure, -100, 100);
        density = _ColorCurves._ApplyColorGradingSliderNonlinear(density);
        density *= 0.5;
        exposure = _ColorCurves._ApplyColorGradingSliderNonlinear(exposure);
        if (density < 0) {
          density *= -1;
          hue = (hue + 180) % 360;
        }
        _ColorCurves._FromHSBToRef(hue, density, 50 + 0.25 * exposure, result);
        result.scaleToRef(2, result);
        result.a = 1 + 0.01 * saturation;
      }
      /**
       * Takes an input slider value and returns an adjusted value that provides extra control near the centre.
       * @param value The input slider value in range [-100,100].
       * @returns Adjusted value.
       */
      static _ApplyColorGradingSliderNonlinear(value) {
        value /= 100;
        let x = Math.abs(value);
        x = Math.pow(x, 2);
        if (value < 0) {
          x *= -1;
        }
        x *= 100;
        return x;
      }
      /**
       * Returns an RGBA Color4 based on Hue, Saturation and Brightness (also referred to as value, HSV).
       * @param hue The hue (H) input.
       * @param saturation The saturation (S) input.
       * @param brightness The brightness (B) input.
       * @param result
       * @result An RGBA color represented as Vector4.
       */
      static _FromHSBToRef(hue, saturation, brightness, result) {
        let h = _ColorCurves._Clamp(hue, 0, 360);
        const s = _ColorCurves._Clamp(saturation / 100, 0, 1);
        const v = _ColorCurves._Clamp(brightness / 100, 0, 1);
        if (s === 0) {
          result.r = v;
          result.g = v;
          result.b = v;
        } else {
          h /= 60;
          const i = Math.floor(h);
          const f = h - i;
          const p = v * (1 - s);
          const q = v * (1 - s * f);
          const t = v * (1 - s * (1 - f));
          switch (i) {
            case 0:
              result.r = v;
              result.g = t;
              result.b = p;
              break;
            case 1:
              result.r = q;
              result.g = v;
              result.b = p;
              break;
            case 2:
              result.r = p;
              result.g = v;
              result.b = t;
              break;
            case 3:
              result.r = p;
              result.g = q;
              result.b = v;
              break;
            case 4:
              result.r = t;
              result.g = p;
              result.b = v;
              break;
            default:
              result.r = v;
              result.g = p;
              result.b = q;
              break;
          }
        }
        result.a = 1;
      }
      /**
       * Returns a value clamped between min and max
       * @param value The value to clamp
       * @param min The minimum of value
       * @param max The maximum of value
       * @returns The clamped value.
       */
      static _Clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }
      /**
       * Clones the current color curve instance.
       * @returns The cloned curves
       */
      clone() {
        return SerializationHelper.Clone(() => new _ColorCurves(), this);
      }
      /**
       * Serializes the current color curve instance to a json representation.
       * @returns a JSON representation
       */
      serialize() {
        return SerializationHelper.Serialize(this);
      }
      /**
       * Parses the color curve from a json representation.
       * @param source the JSON source to parse
       * @returns The parsed curves
       */
      static Parse(source) {
        return SerializationHelper.Parse(() => new _ColorCurves(), source, null, null);
      }
    };
    ColorCurves.PrepareUniforms = PrepareUniformsForColorCurves;
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_globalHue", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_globalDensity", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_globalSaturation", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_globalExposure", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_highlightsHue", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_highlightsDensity", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_highlightsSaturation", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_highlightsExposure", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_midtonesHue", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_midtonesDensity", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_midtonesSaturation", void 0);
    __decorate([
      serialize()
    ], ColorCurves.prototype, "_midtonesExposure", void 0);
    SerializationHelper._ColorCurvesParser = ColorCurves.Parse;
  }
});

// node_modules/@babylonjs/core/Materials/imageProcessingConfiguration.functions.js
function PrepareUniformsForImageProcessing(uniforms, defines) {
  if (defines.EXPOSURE) {
    uniforms.push("exposureLinear");
  }
  if (defines.CONTRAST) {
    uniforms.push("contrast");
  }
  if (defines.COLORGRADING) {
    uniforms.push("colorTransformSettings");
  }
  if (defines.VIGNETTE || defines.DITHER) {
    uniforms.push("vInverseScreenSize");
  }
  if (defines.VIGNETTE) {
    uniforms.push("vignetteSettings1");
    uniforms.push("vignetteSettings2");
  }
  if (defines.COLORCURVES) {
    PrepareUniformsForColorCurves(uniforms);
  }
  if (defines.DITHER) {
    uniforms.push("ditherIntensity");
  }
}
function PrepareSamplersForImageProcessing(samplersList, defines) {
  if (defines.COLORGRADING) {
    samplersList.push("txColorTransform");
  }
}
var init_imageProcessingConfiguration_functions = __esm({
  "node_modules/@babylonjs/core/Materials/imageProcessingConfiguration.functions.js"() {
    init_colorCurves_functions();
  }
});

// node_modules/@babylonjs/core/Materials/imageProcessingConfiguration.js
var ImageProcessingConfiguration;
var init_imageProcessingConfiguration = __esm({
  "node_modules/@babylonjs/core/Materials/imageProcessingConfiguration.js"() {
    init_tslib_es6();
    init_decorators();
    init_observable();
    init_math_color();
    init_colorCurves();
    init_tools_functions();
    init_decorators_serialization();
    init_imageProcessingConfiguration_functions();
    ImageProcessingConfiguration = class _ImageProcessingConfiguration {
      constructor() {
        this.colorCurves = new ColorCurves();
        this._colorCurvesEnabled = false;
        this._colorGradingEnabled = false;
        this._colorGradingWithGreenDepth = true;
        this._colorGradingBGR = true;
        this._exposure = 1;
        this._toneMappingEnabled = false;
        this._toneMappingType = _ImageProcessingConfiguration.TONEMAPPING_STANDARD;
        this._contrast = 1;
        this.vignetteStretch = 0;
        this.vignetteCenterX = 0;
        this.vignetteCenterY = 0;
        this.vignetteWeight = 1.5;
        this.vignetteColor = new Color4(0, 0, 0, 0);
        this.vignetteCameraFov = 0.5;
        this._vignetteBlendMode = _ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY;
        this._vignetteEnabled = false;
        this._ditheringEnabled = false;
        this._ditheringIntensity = 1 / 255;
        this._skipFinalColorClamp = false;
        this._applyByPostProcess = false;
        this._isEnabled = true;
        this.onUpdateParameters = new Observable();
      }
      /**
       * Gets whether the color curves effect is enabled.
       */
      get colorCurvesEnabled() {
        return this._colorCurvesEnabled;
      }
      /**
       * Sets whether the color curves effect is enabled.
       */
      set colorCurvesEnabled(value) {
        if (this._colorCurvesEnabled === value) {
          return;
        }
        this._colorCurvesEnabled = value;
        this._updateParameters();
      }
      /**
       * Color grading LUT texture used in the effect if colorGradingEnabled is set to true
       */
      get colorGradingTexture() {
        return this._colorGradingTexture;
      }
      /**
       * Color grading LUT texture used in the effect if colorGradingEnabled is set to true
       */
      set colorGradingTexture(value) {
        if (this._colorGradingTexture === value) {
          return;
        }
        this._colorGradingTexture = value;
        this._updateParameters();
      }
      /**
       * Gets whether the color grading effect is enabled.
       */
      get colorGradingEnabled() {
        return this._colorGradingEnabled;
      }
      /**
       * Sets whether the color grading effect is enabled.
       */
      set colorGradingEnabled(value) {
        if (this._colorGradingEnabled === value) {
          return;
        }
        this._colorGradingEnabled = value;
        this._updateParameters();
      }
      /**
       * Gets whether the color grading effect is using a green depth for the 3d Texture.
       */
      get colorGradingWithGreenDepth() {
        return this._colorGradingWithGreenDepth;
      }
      /**
       * Sets whether the color grading effect is using a green depth for the 3d Texture.
       */
      set colorGradingWithGreenDepth(value) {
        if (this._colorGradingWithGreenDepth === value) {
          return;
        }
        this._colorGradingWithGreenDepth = value;
        this._updateParameters();
      }
      /**
       * Gets whether the color grading texture contains BGR values.
       */
      get colorGradingBGR() {
        return this._colorGradingBGR;
      }
      /**
       * Sets whether the color grading texture contains BGR values.
       */
      set colorGradingBGR(value) {
        if (this._colorGradingBGR === value) {
          return;
        }
        this._colorGradingBGR = value;
        this._updateParameters();
      }
      /**
       * Gets the Exposure used in the effect.
       */
      get exposure() {
        return this._exposure;
      }
      /**
       * Sets the Exposure used in the effect.
       */
      set exposure(value) {
        if (this._exposure === value) {
          return;
        }
        this._exposure = value;
        this._updateParameters();
      }
      /**
       * Gets whether the tone mapping effect is enabled.
       */
      get toneMappingEnabled() {
        return this._toneMappingEnabled;
      }
      /**
       * Sets whether the tone mapping effect is enabled.
       */
      set toneMappingEnabled(value) {
        if (this._toneMappingEnabled === value) {
          return;
        }
        this._toneMappingEnabled = value;
        this._updateParameters();
      }
      /**
       * Gets the type of tone mapping effect.
       */
      get toneMappingType() {
        return this._toneMappingType;
      }
      /**
       * Sets the type of tone mapping effect used in BabylonJS.
       */
      set toneMappingType(value) {
        if (this._toneMappingType === value) {
          return;
        }
        this._toneMappingType = value;
        this._updateParameters();
      }
      /**
       * Gets the contrast used in the effect.
       */
      get contrast() {
        return this._contrast;
      }
      /**
       * Sets the contrast used in the effect.
       */
      set contrast(value) {
        if (this._contrast === value) {
          return;
        }
        this._contrast = value;
        this._updateParameters();
      }
      /**
       * Back Compat: Vignette center Y Offset.
       * @deprecated use vignetteCenterY instead
       */
      get vignetteCentreY() {
        return this.vignetteCenterY;
      }
      set vignetteCentreY(value) {
        this.vignetteCenterY = value;
      }
      /**
       * Back Compat: Vignette center X Offset.
       * @deprecated use vignetteCenterX instead
       */
      get vignetteCentreX() {
        return this.vignetteCenterX;
      }
      set vignetteCentreX(value) {
        this.vignetteCenterX = value;
      }
      /**
       * Gets the vignette blend mode allowing different kind of effect.
       */
      get vignetteBlendMode() {
        return this._vignetteBlendMode;
      }
      /**
       * Sets the vignette blend mode allowing different kind of effect.
       */
      set vignetteBlendMode(value) {
        if (this._vignetteBlendMode === value) {
          return;
        }
        this._vignetteBlendMode = value;
        this._updateParameters();
      }
      /**
       * Gets whether the vignette effect is enabled.
       */
      get vignetteEnabled() {
        return this._vignetteEnabled;
      }
      /**
       * Sets whether the vignette effect is enabled.
       */
      set vignetteEnabled(value) {
        if (this._vignetteEnabled === value) {
          return;
        }
        this._vignetteEnabled = value;
        this._updateParameters();
      }
      /**
       * Gets whether the dithering effect is enabled.
       * The dithering effect can be used to reduce banding.
       */
      get ditheringEnabled() {
        return this._ditheringEnabled;
      }
      /**
       * Sets whether the dithering effect is enabled.
       * The dithering effect can be used to reduce banding.
       */
      set ditheringEnabled(value) {
        if (this._ditheringEnabled === value) {
          return;
        }
        this._ditheringEnabled = value;
        this._updateParameters();
      }
      /**
       * Gets the dithering intensity. 0 is no dithering. Default is 1.0 / 255.0.
       */
      get ditheringIntensity() {
        return this._ditheringIntensity;
      }
      /**
       * Sets the dithering intensity. 0 is no dithering. Default is 1.0 / 255.0.
       */
      set ditheringIntensity(value) {
        if (this._ditheringIntensity === value) {
          return;
        }
        this._ditheringIntensity = value;
        this._updateParameters();
      }
      /**
       * If apply by post process is set to true, setting this to true will skip the final color clamp step in the fragment shader
       * Applies to PBR materials.
       */
      get skipFinalColorClamp() {
        return this._skipFinalColorClamp;
      }
      /**
       * If apply by post process is set to true, setting this to true will skip the final color clamp step in the fragment shader
       * Applies to PBR materials.
       */
      set skipFinalColorClamp(value) {
        if (this._skipFinalColorClamp === value) {
          return;
        }
        this._skipFinalColorClamp = value;
        this._updateParameters();
      }
      /**
       * Gets whether the image processing is applied through a post process or not.
       */
      get applyByPostProcess() {
        return this._applyByPostProcess;
      }
      /**
       * Sets whether the image processing is applied through a post process or not.
       */
      set applyByPostProcess(value) {
        if (this._applyByPostProcess === value) {
          return;
        }
        this._applyByPostProcess = value;
        this._updateParameters();
      }
      /**
       * Gets whether the image processing is enabled or not.
       */
      get isEnabled() {
        return this._isEnabled;
      }
      /**
       * Sets whether the image processing is enabled or not.
       */
      set isEnabled(value) {
        if (this._isEnabled === value) {
          return;
        }
        this._isEnabled = value;
        this._updateParameters();
      }
      /**
       * Method called each time the image processing information changes requires to recompile the effect.
       */
      _updateParameters() {
        this.onUpdateParameters.notifyObservers(this);
      }
      /**
       * Gets the current class name.
       * @returns "ImageProcessingConfiguration"
       */
      getClassName() {
        return "ImageProcessingConfiguration";
      }
      /**
       * Prepare the list of defines associated to the shader.
       * @param defines the list of defines to complete
       * @param forPostProcess Define if we are currently in post process mode or not
       */
      prepareDefines(defines, forPostProcess = false) {
        if (forPostProcess !== this.applyByPostProcess || !this._isEnabled) {
          defines.VIGNETTE = false;
          defines.TONEMAPPING = false;
          defines.TONEMAPPING_ACES = false;
          defines.CONTRAST = false;
          defines.EXPOSURE = false;
          defines.COLORCURVES = false;
          defines.COLORGRADING = false;
          defines.COLORGRADING3D = false;
          defines.DITHER = false;
          defines.IMAGEPROCESSING = false;
          defines.SKIPFINALCOLORCLAMP = this.skipFinalColorClamp;
          defines.IMAGEPROCESSINGPOSTPROCESS = this.applyByPostProcess && this._isEnabled;
          return;
        }
        defines.VIGNETTE = this.vignetteEnabled;
        defines.VIGNETTEBLENDMODEMULTIPLY = this.vignetteBlendMode === _ImageProcessingConfiguration._VIGNETTEMODE_MULTIPLY;
        defines.VIGNETTEBLENDMODEOPAQUE = !defines.VIGNETTEBLENDMODEMULTIPLY;
        defines.TONEMAPPING = this.toneMappingEnabled;
        switch (this._toneMappingType) {
          case _ImageProcessingConfiguration.TONEMAPPING_ACES:
            defines.TONEMAPPING_ACES = true;
            break;
          default:
            defines.TONEMAPPING_ACES = false;
            break;
        }
        defines.CONTRAST = this.contrast !== 1;
        defines.EXPOSURE = this.exposure !== 1;
        defines.COLORCURVES = this.colorCurvesEnabled && !!this.colorCurves;
        defines.COLORGRADING = this.colorGradingEnabled && !!this.colorGradingTexture;
        if (defines.COLORGRADING) {
          defines.COLORGRADING3D = this.colorGradingTexture.is3D;
        } else {
          defines.COLORGRADING3D = false;
        }
        defines.SAMPLER3DGREENDEPTH = this.colorGradingWithGreenDepth;
        defines.SAMPLER3DBGRMAP = this.colorGradingBGR;
        defines.DITHER = this._ditheringEnabled;
        defines.IMAGEPROCESSINGPOSTPROCESS = this.applyByPostProcess;
        defines.SKIPFINALCOLORCLAMP = this.skipFinalColorClamp;
        defines.IMAGEPROCESSING = defines.VIGNETTE || defines.TONEMAPPING || defines.CONTRAST || defines.EXPOSURE || defines.COLORCURVES || defines.COLORGRADING || defines.DITHER;
      }
      /**
       * Returns true if all the image processing information are ready.
       * @returns True if ready, otherwise, false
       */
      isReady() {
        return !this.colorGradingEnabled || !this.colorGradingTexture || this.colorGradingTexture.isReady();
      }
      /**
       * Binds the image processing to the shader.
       * @param effect The effect to bind to
       * @param overrideAspectRatio Override the aspect ratio of the effect
       */
      bind(effect, overrideAspectRatio) {
        if (this._colorCurvesEnabled && this.colorCurves) {
          ColorCurves.Bind(this.colorCurves, effect);
        }
        if (this._vignetteEnabled || this._ditheringEnabled) {
          const inverseWidth = 1 / effect.getEngine().getRenderWidth();
          const inverseHeight = 1 / effect.getEngine().getRenderHeight();
          effect.setFloat2("vInverseScreenSize", inverseWidth, inverseHeight);
          if (this._ditheringEnabled) {
            effect.setFloat("ditherIntensity", 0.5 * this._ditheringIntensity);
          }
          if (this._vignetteEnabled) {
            const aspectRatio = overrideAspectRatio != null ? overrideAspectRatio : inverseHeight / inverseWidth;
            let vignetteScaleY = Math.tan(this.vignetteCameraFov * 0.5);
            let vignetteScaleX = vignetteScaleY * aspectRatio;
            const vignetteScaleGeometricMean = Math.sqrt(vignetteScaleX * vignetteScaleY);
            vignetteScaleX = Mix(vignetteScaleX, vignetteScaleGeometricMean, this.vignetteStretch);
            vignetteScaleY = Mix(vignetteScaleY, vignetteScaleGeometricMean, this.vignetteStretch);
            effect.setFloat4("vignetteSettings1", vignetteScaleX, vignetteScaleY, -vignetteScaleX * this.vignetteCenterX, -vignetteScaleY * this.vignetteCenterY);
            const vignettePower = -2 * this.vignetteWeight;
            effect.setFloat4("vignetteSettings2", this.vignetteColor.r, this.vignetteColor.g, this.vignetteColor.b, vignettePower);
          }
        }
        effect.setFloat("exposureLinear", this.exposure);
        effect.setFloat("contrast", this.contrast);
        if (this.colorGradingTexture) {
          effect.setTexture("txColorTransform", this.colorGradingTexture);
          const textureSize = this.colorGradingTexture.getSize().height;
          effect.setFloat4(
            "colorTransformSettings",
            (textureSize - 1) / textureSize,
            // textureScale
            0.5 / textureSize,
            // textureOffset
            textureSize,
            // textureSize
            this.colorGradingTexture.level
            // weight
          );
        }
      }
      /**
       * Clones the current image processing instance.
       * @returns The cloned image processing
       */
      clone() {
        return SerializationHelper.Clone(() => new _ImageProcessingConfiguration(), this);
      }
      /**
       * Serializes the current image processing instance to a json representation.
       * @returns a JSON representation
       */
      serialize() {
        return SerializationHelper.Serialize(this);
      }
      /**
       * Parses the image processing from a json representation.
       * @param source the JSON source to parse
       * @returns The parsed image processing
       */
      static Parse(source) {
        const parsed = SerializationHelper.Parse(() => new _ImageProcessingConfiguration(), source, null, null);
        if (source.vignetteCentreX !== void 0) {
          parsed.vignetteCenterX = source.vignetteCentreX;
        }
        if (source.vignetteCentreY !== void 0) {
          parsed.vignetteCenterY = source.vignetteCentreY;
        }
        return parsed;
      }
      /**
       * Used to apply the vignette as a mix with the pixel color.
       */
      static get VIGNETTEMODE_MULTIPLY() {
        return this._VIGNETTEMODE_MULTIPLY;
      }
      /**
       * Used to apply the vignette as a replacement of the pixel color.
       */
      static get VIGNETTEMODE_OPAQUE() {
        return this._VIGNETTEMODE_OPAQUE;
      }
    };
    ImageProcessingConfiguration.TONEMAPPING_STANDARD = 0;
    ImageProcessingConfiguration.TONEMAPPING_ACES = 1;
    ImageProcessingConfiguration.PrepareUniforms = PrepareUniformsForImageProcessing;
    ImageProcessingConfiguration.PrepareSamplers = PrepareSamplersForImageProcessing;
    ImageProcessingConfiguration._VIGNETTEMODE_MULTIPLY = 0;
    ImageProcessingConfiguration._VIGNETTEMODE_OPAQUE = 1;
    __decorate([
      serializeAsColorCurves()
    ], ImageProcessingConfiguration.prototype, "colorCurves", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_colorCurvesEnabled", void 0);
    __decorate([
      serializeAsTexture("colorGradingTexture")
    ], ImageProcessingConfiguration.prototype, "_colorGradingTexture", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_colorGradingEnabled", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_colorGradingWithGreenDepth", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_colorGradingBGR", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_exposure", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_toneMappingEnabled", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_toneMappingType", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_contrast", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteStretch", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteCenterX", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteCenterY", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteWeight", void 0);
    __decorate([
      serializeAsColor4()
    ], ImageProcessingConfiguration.prototype, "vignetteColor", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteCameraFov", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_vignetteBlendMode", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_vignetteEnabled", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_ditheringEnabled", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_ditheringIntensity", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_skipFinalColorClamp", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_applyByPostProcess", void 0);
    __decorate([
      serialize()
    ], ImageProcessingConfiguration.prototype, "_isEnabled", void 0);
    SerializationHelper._ImageProcessingConfigurationParser = ImageProcessingConfiguration.Parse;
  }
});

// node_modules/@babylonjs/core/Engines/Extensions/engine.uniformBuffer.js
var init_engine_uniformBuffer = __esm({
  "node_modules/@babylonjs/core/Engines/Extensions/engine.uniformBuffer.js"() {
    init_thinEngine();
    init_webGLDataBuffer();
    ThinEngine.prototype.createUniformBuffer = function(elements, _label) {
      const ubo = this._gl.createBuffer();
      if (!ubo) {
        throw new Error("Unable to create uniform buffer");
      }
      const result = new WebGLDataBuffer(ubo);
      this.bindUniformBuffer(result);
      if (elements instanceof Float32Array) {
        this._gl.bufferData(this._gl.UNIFORM_BUFFER, elements, this._gl.STATIC_DRAW);
      } else {
        this._gl.bufferData(this._gl.UNIFORM_BUFFER, new Float32Array(elements), this._gl.STATIC_DRAW);
      }
      this.bindUniformBuffer(null);
      result.references = 1;
      return result;
    };
    ThinEngine.prototype.createDynamicUniformBuffer = function(elements, _label) {
      const ubo = this._gl.createBuffer();
      if (!ubo) {
        throw new Error("Unable to create dynamic uniform buffer");
      }
      const result = new WebGLDataBuffer(ubo);
      this.bindUniformBuffer(result);
      if (elements instanceof Float32Array) {
        this._gl.bufferData(this._gl.UNIFORM_BUFFER, elements, this._gl.DYNAMIC_DRAW);
      } else {
        this._gl.bufferData(this._gl.UNIFORM_BUFFER, new Float32Array(elements), this._gl.DYNAMIC_DRAW);
      }
      this.bindUniformBuffer(null);
      result.references = 1;
      return result;
    };
    ThinEngine.prototype.updateUniformBuffer = function(uniformBuffer, elements, offset, count) {
      this.bindUniformBuffer(uniformBuffer);
      if (offset === void 0) {
        offset = 0;
      }
      if (count === void 0) {
        if (elements instanceof Float32Array) {
          this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, offset, elements);
        } else {
          this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, offset, new Float32Array(elements));
        }
      } else {
        if (elements instanceof Float32Array) {
          this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, 0, elements.subarray(offset, offset + count));
        } else {
          this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, 0, new Float32Array(elements).subarray(offset, offset + count));
        }
      }
      this.bindUniformBuffer(null);
    };
    ThinEngine.prototype.bindUniformBuffer = function(buffer) {
      this._gl.bindBuffer(this._gl.UNIFORM_BUFFER, buffer ? buffer.underlyingResource : null);
    };
    ThinEngine.prototype.bindUniformBufferBase = function(buffer, location, name) {
      this._gl.bindBufferBase(this._gl.UNIFORM_BUFFER, location, buffer ? buffer.underlyingResource : null);
    };
    ThinEngine.prototype.bindUniformBlock = function(pipelineContext, blockName, index) {
      const program = pipelineContext.program;
      const uniformLocation = this._gl.getUniformBlockIndex(program, blockName);
      if (uniformLocation !== 4294967295) {
        this._gl.uniformBlockBinding(program, uniformLocation, index);
      }
    };
  }
});

// node_modules/@babylonjs/core/Materials/uniformBuffer.js
var UniformBuffer;
var init_uniformBuffer = __esm({
  "node_modules/@babylonjs/core/Materials/uniformBuffer.js"() {
    init_logger();
    init_tools();
    init_engine_uniformBuffer();
    UniformBuffer = class _UniformBuffer {
      /**
       * Instantiates a new Uniform buffer objects.
       *
       * Handles blocks of uniform on the GPU.
       *
       * If WebGL 2 is not available, this class falls back on traditional setUniformXXX calls.
       *
       * For more information, please refer to :
       * @see https://www.khronos.org/opengl/wiki/Uniform_Buffer_Object
       * @param engine Define the engine the buffer is associated with
       * @param data Define the data contained in the buffer
       * @param dynamic Define if the buffer is updatable
       * @param name to assign to the buffer (debugging purpose)
       * @param forceNoUniformBuffer define that this object must not rely on UBO objects
       */
      constructor(engine, data, dynamic, name, forceNoUniformBuffer = false) {
        this._valueCache = {};
        this._engine = engine;
        this._noUBO = !engine.supportsUniformBuffers || forceNoUniformBuffer;
        this._dynamic = dynamic;
        this._name = name ?? "no-name";
        this._data = data || [];
        this._uniformLocations = {};
        this._uniformSizes = {};
        this._uniformArraySizes = {};
        this._uniformLocationPointer = 0;
        this._needSync = false;
        if (this._engine._features.trackUbosInFrame) {
          this._buffers = [];
          this._bufferIndex = -1;
          this._createBufferOnWrite = false;
          this._currentFrameId = 0;
        }
        if (this._noUBO) {
          this.updateMatrix3x3 = this._updateMatrix3x3ForEffect;
          this.updateMatrix2x2 = this._updateMatrix2x2ForEffect;
          this.updateFloat = this._updateFloatForEffect;
          this.updateFloat2 = this._updateFloat2ForEffect;
          this.updateFloat3 = this._updateFloat3ForEffect;
          this.updateFloat4 = this._updateFloat4ForEffect;
          this.updateFloatArray = this._updateFloatArrayForEffect;
          this.updateArray = this._updateArrayForEffect;
          this.updateIntArray = this._updateIntArrayForEffect;
          this.updateUIntArray = this._updateUIntArrayForEffect;
          this.updateMatrix = this._updateMatrixForEffect;
          this.updateMatrices = this._updateMatricesForEffect;
          this.updateVector3 = this._updateVector3ForEffect;
          this.updateVector4 = this._updateVector4ForEffect;
          this.updateColor3 = this._updateColor3ForEffect;
          this.updateColor4 = this._updateColor4ForEffect;
          this.updateDirectColor4 = this._updateDirectColor4ForEffect;
          this.updateInt = this._updateIntForEffect;
          this.updateInt2 = this._updateInt2ForEffect;
          this.updateInt3 = this._updateInt3ForEffect;
          this.updateInt4 = this._updateInt4ForEffect;
          this.updateUInt = this._updateUIntForEffect;
          this.updateUInt2 = this._updateUInt2ForEffect;
          this.updateUInt3 = this._updateUInt3ForEffect;
          this.updateUInt4 = this._updateUInt4ForEffect;
        } else {
          this._engine._uniformBuffers.push(this);
          this.updateMatrix3x3 = this._updateMatrix3x3ForUniform;
          this.updateMatrix2x2 = this._updateMatrix2x2ForUniform;
          this.updateFloat = this._updateFloatForUniform;
          this.updateFloat2 = this._updateFloat2ForUniform;
          this.updateFloat3 = this._updateFloat3ForUniform;
          this.updateFloat4 = this._updateFloat4ForUniform;
          this.updateFloatArray = this._updateFloatArrayForUniform;
          this.updateArray = this._updateArrayForUniform;
          this.updateIntArray = this._updateIntArrayForUniform;
          this.updateUIntArray = this._updateUIntArrayForUniform;
          this.updateMatrix = this._updateMatrixForUniform;
          this.updateMatrices = this._updateMatricesForUniform;
          this.updateVector3 = this._updateVector3ForUniform;
          this.updateVector4 = this._updateVector4ForUniform;
          this.updateColor3 = this._updateColor3ForUniform;
          this.updateColor4 = this._updateColor4ForUniform;
          this.updateDirectColor4 = this._updateDirectColor4ForUniform;
          this.updateInt = this._updateIntForUniform;
          this.updateInt2 = this._updateInt2ForUniform;
          this.updateInt3 = this._updateInt3ForUniform;
          this.updateInt4 = this._updateInt4ForUniform;
          this.updateUInt = this._updateUIntForUniform;
          this.updateUInt2 = this._updateUInt2ForUniform;
          this.updateUInt3 = this._updateUInt3ForUniform;
          this.updateUInt4 = this._updateUInt4ForUniform;
        }
      }
      /**
       * Indicates if the buffer is using the WebGL2 UBO implementation,
       * or just falling back on setUniformXXX calls.
       */
      get useUbo() {
        return !this._noUBO;
      }
      /**
       * Indicates if the WebGL underlying uniform buffer is in sync
       * with the javascript cache data.
       */
      get isSync() {
        return !this._needSync;
      }
      /**
       * Indicates if the WebGL underlying uniform buffer is dynamic.
       * Also, a dynamic UniformBuffer will disable cache verification and always
       * update the underlying WebGL uniform buffer to the GPU.
       * @returns if Dynamic, otherwise false
       */
      isDynamic() {
        return this._dynamic !== void 0;
      }
      /**
       * The data cache on JS side.
       * @returns the underlying data as a float array
       */
      getData() {
        return this._bufferData;
      }
      /**
       * The underlying WebGL Uniform buffer.
       * @returns the webgl buffer
       */
      getBuffer() {
        return this._buffer;
      }
      /**
       * std140 layout specifies how to align data within an UBO structure.
       * See https://khronos.org/registry/OpenGL/specs/gl/glspec45.core.pdf#page=159
       * for specs.
       * @param size
       */
      _fillAlignment(size) {
        let alignment;
        if (size <= 2) {
          alignment = size;
        } else {
          alignment = 4;
        }
        if (this._uniformLocationPointer % alignment !== 0) {
          const oldPointer = this._uniformLocationPointer;
          this._uniformLocationPointer += alignment - this._uniformLocationPointer % alignment;
          const diff = this._uniformLocationPointer - oldPointer;
          for (let i = 0; i < diff; i++) {
            this._data.push(0);
          }
        }
      }
      /**
       * Adds an uniform in the buffer.
       * Warning : the subsequents calls of this function must be in the same order as declared in the shader
       * for the layout to be correct ! The addUniform function only handles types like float, vec2, vec3, vec4, mat4,
       * meaning size=1,2,3,4 or 16. It does not handle struct types.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       * @param size Data size, or data directly.
       * @param arraySize The number of elements in the array, 0 if not an array.
       */
      addUniform(name, size, arraySize = 0) {
        if (this._noUBO) {
          return;
        }
        if (this._uniformLocations[name] !== void 0) {
          return;
        }
        let data;
        if (arraySize > 0) {
          if (size instanceof Array) {
            throw "addUniform should not be use with Array in UBO: " + name;
          }
          this._fillAlignment(4);
          this._uniformArraySizes[name] = { strideSize: size, arraySize };
          if (size == 16) {
            size = size * arraySize;
          } else {
            const perElementPadding = 4 - size;
            const totalPadding = perElementPadding * arraySize;
            size = size * arraySize + totalPadding;
          }
          data = [];
          for (let i = 0; i < size; i++) {
            data.push(0);
          }
        } else {
          if (size instanceof Array) {
            data = size;
            size = data.length;
          } else {
            size = size;
            data = [];
            for (let i = 0; i < size; i++) {
              data.push(0);
            }
          }
          this._fillAlignment(size);
        }
        this._uniformSizes[name] = size;
        this._uniformLocations[name] = this._uniformLocationPointer;
        this._uniformLocationPointer += size;
        for (let i = 0; i < size; i++) {
          this._data.push(data[i]);
        }
        this._needSync = true;
      }
      /**
       * Adds a Matrix 4x4 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       * @param mat A 4x4 matrix.
       */
      addMatrix(name, mat) {
        this.addUniform(name, Array.prototype.slice.call(mat.asArray()));
      }
      /**
       * Adds a vec2 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       * @param x Define the x component value of the vec2
       * @param y Define the y component value of the vec2
       */
      addFloat2(name, x, y) {
        const temp = [x, y];
        this.addUniform(name, temp);
      }
      /**
       * Adds a vec3 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       * @param x Define the x component value of the vec3
       * @param y Define the y component value of the vec3
       * @param z Define the z component value of the vec3
       */
      addFloat3(name, x, y, z) {
        const temp = [x, y, z];
        this.addUniform(name, temp);
      }
      /**
       * Adds a vec3 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       * @param color Define the vec3 from a Color
       */
      addColor3(name, color) {
        const temp = [color.r, color.g, color.b];
        this.addUniform(name, temp);
      }
      /**
       * Adds a vec4 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       * @param color Define the rgb components from a Color
       * @param alpha Define the a component of the vec4
       */
      addColor4(name, color, alpha) {
        const temp = [color.r, color.g, color.b, alpha];
        this.addUniform(name, temp);
      }
      /**
       * Adds a vec3 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       * @param vector Define the vec3 components from a Vector
       */
      addVector3(name, vector) {
        const temp = [vector.x, vector.y, vector.z];
        this.addUniform(name, temp);
      }
      /**
       * Adds a Matrix 3x3 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       */
      addMatrix3x3(name) {
        this.addUniform(name, 12);
      }
      /**
       * Adds a Matrix 2x2 to the uniform buffer.
       * @param name Name of the uniform, as used in the uniform block in the shader.
       */
      addMatrix2x2(name) {
        this.addUniform(name, 8);
      }
      /**
       * Effectively creates the WebGL Uniform Buffer, once layout is completed with `addUniform`.
       */
      create() {
        if (this._noUBO) {
          return;
        }
        if (this._buffer) {
          return;
        }
        this._fillAlignment(4);
        this._bufferData = new Float32Array(this._data);
        this._rebuild();
        this._needSync = true;
      }
      // The result of this method is used for debugging purpose, as part of the buffer name
      // It is meant to more easily know what this buffer is about when debugging
      // Some buffers can have a lot of uniforms (several dozens), so the method only returns the first 10 of them
      // (should be enough to understand what the buffer is for)
      _getNames() {
        const names = [];
        let i = 0;
        for (const name in this._uniformLocations) {
          names.push(name);
          if (++i === 10) {
            break;
          }
        }
        return names.join(",");
      }
      /** @internal */
      _rebuild() {
        if (this._noUBO || !this._bufferData) {
          return;
        }
        if (this._dynamic) {
          this._buffer = this._engine.createDynamicUniformBuffer(this._bufferData, this._name + "_UniformList:" + this._getNames());
        } else {
          this._buffer = this._engine.createUniformBuffer(this._bufferData, this._name + "_UniformList:" + this._getNames());
        }
        if (this._engine._features.trackUbosInFrame) {
          this._buffers.push([this._buffer, this._engine._features.checkUbosContentBeforeUpload ? this._bufferData.slice() : void 0]);
          this._bufferIndex = this._buffers.length - 1;
          this._createBufferOnWrite = false;
        }
      }
      /** @internal */
      _rebuildAfterContextLost() {
        if (this._engine._features.trackUbosInFrame) {
          this._buffers = [];
          this._currentFrameId = 0;
        }
        this._rebuild();
      }
      /** @internal */
      get _numBuffers() {
        return this._buffers.length;
      }
      /** @internal */
      get _indexBuffer() {
        return this._bufferIndex;
      }
      /** Gets the name of this buffer */
      get name() {
        return this._name;
      }
      /** Gets the current effect */
      get currentEffect() {
        return this._currentEffect;
      }
      _buffersEqual(buf1, buf2) {
        for (let i = 0; i < buf1.length; ++i) {
          if (buf1[i] !== buf2[i]) {
            return false;
          }
        }
        return true;
      }
      _copyBuffer(src, dst) {
        for (let i = 0; i < src.length; ++i) {
          dst[i] = src[i];
        }
      }
      /**
       * Updates the WebGL Uniform Buffer on the GPU.
       * If the `dynamic` flag is set to true, no cache comparison is done.
       * Otherwise, the buffer will be updated only if the cache differs.
       */
      update() {
        if (this._noUBO) {
          return;
        }
        this.bindUniformBuffer();
        if (!this._buffer) {
          this.create();
          return;
        }
        if (!this._dynamic && !this._needSync) {
          this._createBufferOnWrite = this._engine._features.trackUbosInFrame;
          return;
        }
        if (this._buffers && this._buffers.length > 1 && this._buffers[this._bufferIndex][1]) {
          if (this._buffersEqual(this._bufferData, this._buffers[this._bufferIndex][1])) {
            this._needSync = false;
            this._createBufferOnWrite = this._engine._features.trackUbosInFrame;
            return;
          } else {
            this._copyBuffer(this._bufferData, this._buffers[this._bufferIndex][1]);
          }
        }
        this._engine.updateUniformBuffer(this._buffer, this._bufferData);
        if (this._engine._features._collectUbosUpdatedInFrame) {
          if (!_UniformBuffer._UpdatedUbosInFrame[this._name]) {
            _UniformBuffer._UpdatedUbosInFrame[this._name] = 0;
          }
          _UniformBuffer._UpdatedUbosInFrame[this._name]++;
        }
        this._needSync = false;
        this._createBufferOnWrite = this._engine._features.trackUbosInFrame;
      }
      _createNewBuffer() {
        if (this._bufferIndex + 1 < this._buffers.length) {
          this._bufferIndex++;
          this._buffer = this._buffers[this._bufferIndex][0];
          this._createBufferOnWrite = false;
          this._needSync = true;
        } else {
          this._rebuild();
        }
      }
      _checkNewFrame() {
        if (this._engine._features.trackUbosInFrame && this._currentFrameId !== this._engine.frameId) {
          this._currentFrameId = this._engine.frameId;
          this._createBufferOnWrite = false;
          if (this._buffers && this._buffers.length > 0) {
            this._needSync = this._bufferIndex !== 0;
            this._bufferIndex = 0;
            this._buffer = this._buffers[this._bufferIndex][0];
          } else {
            this._bufferIndex = -1;
          }
        }
      }
      /**
       * Updates the value of an uniform. The `update` method must be called afterwards to make it effective in the GPU.
       * @param uniformName Define the name of the uniform, as used in the uniform block in the shader.
       * @param data Define the flattened data
       * @param size Define the size of the data.
       */
      updateUniform(uniformName, data, size) {
        this._checkNewFrame();
        let location = this._uniformLocations[uniformName];
        if (location === void 0) {
          if (this._buffer) {
            Logger.Error("Cannot add an uniform after UBO has been created. uniformName=" + uniformName);
            return;
          }
          this.addUniform(uniformName, size);
          location = this._uniformLocations[uniformName];
        }
        if (!this._buffer) {
          this.create();
        }
        if (!this._dynamic) {
          let changed = false;
          for (let i = 0; i < size; i++) {
            if (size === 16 && !this._engine._features.uniformBufferHardCheckMatrix || this._bufferData[location + i] !== Math.fround(data[i])) {
              changed = true;
              if (this._createBufferOnWrite) {
                this._createNewBuffer();
              }
              this._bufferData[location + i] = data[i];
            }
          }
          this._needSync = this._needSync || changed;
        } else {
          for (let i = 0; i < size; i++) {
            this._bufferData[location + i] = data[i];
          }
        }
      }
      /**
       * Updates the value of an uniform. The `update` method must be called afterwards to make it effective in the GPU.
       * @param uniformName Define the name of the uniform, as used in the uniform block in the shader.
       * @param data Define the flattened data
       * @param size Define the size of the data.
       */
      updateUniformArray(uniformName, data, size) {
        this._checkNewFrame();
        const location = this._uniformLocations[uniformName];
        if (location === void 0) {
          Logger.Error("Cannot add an uniform Array dynamically. Please, add it using addUniform and make sure that uniform buffers are supported by the current engine.");
          return;
        }
        if (!this._buffer) {
          this.create();
        }
        const arraySizes = this._uniformArraySizes[uniformName];
        if (!this._dynamic) {
          let changed = false;
          let countToFour = 0;
          let baseStride = 0;
          for (let i = 0; i < size; i++) {
            if (this._bufferData[location + baseStride * 4 + countToFour] !== Tools.FloatRound(data[i])) {
              changed = true;
              if (this._createBufferOnWrite) {
                this._createNewBuffer();
              }
              this._bufferData[location + baseStride * 4 + countToFour] = data[i];
            }
            countToFour++;
            if (countToFour === arraySizes.strideSize) {
              for (; countToFour < 4; countToFour++) {
                this._bufferData[location + baseStride * 4 + countToFour] = 0;
              }
              countToFour = 0;
              baseStride++;
            }
          }
          this._needSync = this._needSync || changed;
        } else {
          for (let i = 0; i < size; i++) {
            this._bufferData[location + i] = data[i];
          }
        }
      }
      _cacheMatrix(name, matrix) {
        this._checkNewFrame();
        const cache = this._valueCache[name];
        const flag = matrix.updateFlag;
        if (cache !== void 0 && cache === flag) {
          return false;
        }
        this._valueCache[name] = flag;
        return true;
      }
      // Update methods
      _updateMatrix3x3ForUniform(name, matrix) {
        for (let i = 0; i < 3; i++) {
          _UniformBuffer._TempBuffer[i * 4] = matrix[i * 3];
          _UniformBuffer._TempBuffer[i * 4 + 1] = matrix[i * 3 + 1];
          _UniformBuffer._TempBuffer[i * 4 + 2] = matrix[i * 3 + 2];
          _UniformBuffer._TempBuffer[i * 4 + 3] = 0;
        }
        this.updateUniform(name, _UniformBuffer._TempBuffer, 12);
      }
      _updateMatrix3x3ForEffect(name, matrix) {
        this._currentEffect.setMatrix3x3(name, matrix);
      }
      _updateMatrix2x2ForEffect(name, matrix) {
        this._currentEffect.setMatrix2x2(name, matrix);
      }
      _updateMatrix2x2ForUniform(name, matrix) {
        for (let i = 0; i < 2; i++) {
          _UniformBuffer._TempBuffer[i * 4] = matrix[i * 2];
          _UniformBuffer._TempBuffer[i * 4 + 1] = matrix[i * 2 + 1];
          _UniformBuffer._TempBuffer[i * 4 + 2] = 0;
          _UniformBuffer._TempBuffer[i * 4 + 3] = 0;
        }
        this.updateUniform(name, _UniformBuffer._TempBuffer, 8);
      }
      _updateFloatForEffect(name, x) {
        this._currentEffect.setFloat(name, x);
      }
      _updateFloatForUniform(name, x) {
        _UniformBuffer._TempBuffer[0] = x;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 1);
      }
      _updateFloat2ForEffect(name, x, y, suffix = "") {
        this._currentEffect.setFloat2(name + suffix, x, y);
      }
      _updateFloat2ForUniform(name, x, y) {
        _UniformBuffer._TempBuffer[0] = x;
        _UniformBuffer._TempBuffer[1] = y;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 2);
      }
      _updateFloat3ForEffect(name, x, y, z, suffix = "") {
        this._currentEffect.setFloat3(name + suffix, x, y, z);
      }
      _updateFloat3ForUniform(name, x, y, z) {
        _UniformBuffer._TempBuffer[0] = x;
        _UniformBuffer._TempBuffer[1] = y;
        _UniformBuffer._TempBuffer[2] = z;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 3);
      }
      _updateFloat4ForEffect(name, x, y, z, w, suffix = "") {
        this._currentEffect.setFloat4(name + suffix, x, y, z, w);
      }
      _updateFloat4ForUniform(name, x, y, z, w) {
        _UniformBuffer._TempBuffer[0] = x;
        _UniformBuffer._TempBuffer[1] = y;
        _UniformBuffer._TempBuffer[2] = z;
        _UniformBuffer._TempBuffer[3] = w;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 4);
      }
      _updateFloatArrayForEffect(name, array) {
        this._currentEffect.setFloatArray(name, array);
      }
      _updateFloatArrayForUniform(name, array) {
        this.updateUniformArray(name, array, array.length);
      }
      _updateArrayForEffect(name, array) {
        this._currentEffect.setArray(name, array);
      }
      _updateArrayForUniform(name, array) {
        this.updateUniformArray(name, array, array.length);
      }
      _updateIntArrayForEffect(name, array) {
        this._currentEffect.setIntArray(name, array);
      }
      _updateIntArrayForUniform(name, array) {
        _UniformBuffer._TempBufferInt32View.set(array);
        this.updateUniformArray(name, _UniformBuffer._TempBuffer, array.length);
      }
      _updateUIntArrayForEffect(name, array) {
        this._currentEffect.setUIntArray(name, array);
      }
      _updateUIntArrayForUniform(name, array) {
        _UniformBuffer._TempBufferUInt32View.set(array);
        this.updateUniformArray(name, _UniformBuffer._TempBuffer, array.length);
      }
      _updateMatrixForEffect(name, mat) {
        this._currentEffect.setMatrix(name, mat);
      }
      _updateMatrixForUniform(name, mat) {
        if (this._cacheMatrix(name, mat)) {
          this.updateUniform(name, mat.asArray(), 16);
        }
      }
      _updateMatricesForEffect(name, mat) {
        this._currentEffect.setMatrices(name, mat);
      }
      _updateMatricesForUniform(name, mat) {
        this.updateUniform(name, mat, mat.length);
      }
      _updateVector3ForEffect(name, vector) {
        this._currentEffect.setVector3(name, vector);
      }
      _updateVector3ForUniform(name, vector) {
        _UniformBuffer._TempBuffer[0] = vector.x;
        _UniformBuffer._TempBuffer[1] = vector.y;
        _UniformBuffer._TempBuffer[2] = vector.z;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 3);
      }
      _updateVector4ForEffect(name, vector) {
        this._currentEffect.setVector4(name, vector);
      }
      _updateVector4ForUniform(name, vector) {
        _UniformBuffer._TempBuffer[0] = vector.x;
        _UniformBuffer._TempBuffer[1] = vector.y;
        _UniformBuffer._TempBuffer[2] = vector.z;
        _UniformBuffer._TempBuffer[3] = vector.w;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 4);
      }
      _updateColor3ForEffect(name, color, suffix = "") {
        this._currentEffect.setColor3(name + suffix, color);
      }
      _updateColor3ForUniform(name, color) {
        _UniformBuffer._TempBuffer[0] = color.r;
        _UniformBuffer._TempBuffer[1] = color.g;
        _UniformBuffer._TempBuffer[2] = color.b;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 3);
      }
      _updateColor4ForEffect(name, color, alpha, suffix = "") {
        this._currentEffect.setColor4(name + suffix, color, alpha);
      }
      _updateDirectColor4ForEffect(name, color, suffix = "") {
        this._currentEffect.setDirectColor4(name + suffix, color);
      }
      _updateColor4ForUniform(name, color, alpha) {
        _UniformBuffer._TempBuffer[0] = color.r;
        _UniformBuffer._TempBuffer[1] = color.g;
        _UniformBuffer._TempBuffer[2] = color.b;
        _UniformBuffer._TempBuffer[3] = alpha;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 4);
      }
      _updateDirectColor4ForUniform(name, color) {
        _UniformBuffer._TempBuffer[0] = color.r;
        _UniformBuffer._TempBuffer[1] = color.g;
        _UniformBuffer._TempBuffer[2] = color.b;
        _UniformBuffer._TempBuffer[3] = color.a;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 4);
      }
      _updateIntForEffect(name, x, suffix = "") {
        this._currentEffect.setInt(name + suffix, x);
      }
      _updateIntForUniform(name, x) {
        _UniformBuffer._TempBufferInt32View[0] = x;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 1);
      }
      _updateInt2ForEffect(name, x, y, suffix = "") {
        this._currentEffect.setInt2(name + suffix, x, y);
      }
      _updateInt2ForUniform(name, x, y) {
        _UniformBuffer._TempBufferInt32View[0] = x;
        _UniformBuffer._TempBufferInt32View[1] = y;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 2);
      }
      _updateInt3ForEffect(name, x, y, z, suffix = "") {
        this._currentEffect.setInt3(name + suffix, x, y, z);
      }
      _updateInt3ForUniform(name, x, y, z) {
        _UniformBuffer._TempBufferInt32View[0] = x;
        _UniformBuffer._TempBufferInt32View[1] = y;
        _UniformBuffer._TempBufferInt32View[2] = z;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 3);
      }
      _updateInt4ForEffect(name, x, y, z, w, suffix = "") {
        this._currentEffect.setInt4(name + suffix, x, y, z, w);
      }
      _updateInt4ForUniform(name, x, y, z, w) {
        _UniformBuffer._TempBufferInt32View[0] = x;
        _UniformBuffer._TempBufferInt32View[1] = y;
        _UniformBuffer._TempBufferInt32View[2] = z;
        _UniformBuffer._TempBufferInt32View[3] = w;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 4);
      }
      _updateUIntForEffect(name, x, suffix = "") {
        this._currentEffect.setUInt(name + suffix, x);
      }
      _updateUIntForUniform(name, x) {
        _UniformBuffer._TempBufferUInt32View[0] = x;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 1);
      }
      _updateUInt2ForEffect(name, x, y, suffix = "") {
        this._currentEffect.setUInt2(name + suffix, x, y);
      }
      _updateUInt2ForUniform(name, x, y) {
        _UniformBuffer._TempBufferUInt32View[0] = x;
        _UniformBuffer._TempBufferUInt32View[1] = y;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 2);
      }
      _updateUInt3ForEffect(name, x, y, z, suffix = "") {
        this._currentEffect.setUInt3(name + suffix, x, y, z);
      }
      _updateUInt3ForUniform(name, x, y, z) {
        _UniformBuffer._TempBufferUInt32View[0] = x;
        _UniformBuffer._TempBufferUInt32View[1] = y;
        _UniformBuffer._TempBufferUInt32View[2] = z;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 3);
      }
      _updateUInt4ForEffect(name, x, y, z, w, suffix = "") {
        this._currentEffect.setUInt4(name + suffix, x, y, z, w);
      }
      _updateUInt4ForUniform(name, x, y, z, w) {
        _UniformBuffer._TempBufferUInt32View[0] = x;
        _UniformBuffer._TempBufferUInt32View[1] = y;
        _UniformBuffer._TempBufferUInt32View[2] = z;
        _UniformBuffer._TempBufferUInt32View[3] = w;
        this.updateUniform(name, _UniformBuffer._TempBuffer, 4);
      }
      /**
       * Sets a sampler uniform on the effect.
       * @param name Define the name of the sampler.
       * @param texture Define the texture to set in the sampler
       */
      setTexture(name, texture) {
        this._currentEffect.setTexture(name, texture);
      }
      /**
       * Sets a sampler uniform on the effect.
       * @param name Define the name of the sampler.
       * @param texture Define the (internal) texture to set in the sampler
       */
      bindTexture(name, texture) {
        this._currentEffect._bindTexture(name, texture);
      }
      /**
       * Directly updates the value of the uniform in the cache AND on the GPU.
       * @param uniformName Define the name of the uniform, as used in the uniform block in the shader.
       * @param data Define the flattened data
       */
      updateUniformDirectly(uniformName, data) {
        this.updateUniform(uniformName, data, data.length);
        this.update();
      }
      /**
       * Associates an effect to this uniform buffer
       * @param effect Define the effect to associate the buffer to
       * @param name Name of the uniform block in the shader.
       */
      bindToEffect(effect, name) {
        this._currentEffect = effect;
        this._currentEffectName = name;
      }
      /**
       * Binds the current (GPU) buffer to the effect
       */
      bindUniformBuffer() {
        if (!this._noUBO && this._buffer && this._currentEffect) {
          this._currentEffect.bindUniformBuffer(this._buffer, this._currentEffectName);
        }
      }
      /**
       * Dissociates the current effect from this uniform buffer
       */
      unbindEffect() {
        this._currentEffect = void 0;
        this._currentEffectName = void 0;
      }
      /**
       * Sets the current state of the class (_bufferIndex, _buffer) to point to the data buffer passed in parameter if this buffer is one of the buffers handled by the class (meaning if it can be found in the _buffers array)
       * This method is meant to be able to update a buffer at any time: just call setDataBuffer to set the class in the right state, call some updateXXX methods and then call udpate() => that will update the GPU buffer on the graphic card
       * @param dataBuffer buffer to look for
       * @returns true if the buffer has been found and the class internal state points to it, else false
       */
      setDataBuffer(dataBuffer) {
        if (!this._buffers) {
          return this._buffer === dataBuffer;
        }
        for (let b = 0; b < this._buffers.length; ++b) {
          const buffer = this._buffers[b];
          if (buffer[0] === dataBuffer) {
            this._bufferIndex = b;
            this._buffer = dataBuffer;
            this._createBufferOnWrite = false;
            this._currentEffect = void 0;
            return true;
          }
        }
        return false;
      }
      /**
       * Disposes the uniform buffer.
       */
      dispose() {
        if (this._noUBO) {
          return;
        }
        const uniformBuffers = this._engine._uniformBuffers;
        const index = uniformBuffers.indexOf(this);
        if (index !== -1) {
          uniformBuffers[index] = uniformBuffers[uniformBuffers.length - 1];
          uniformBuffers.pop();
        }
        if (this._engine._features.trackUbosInFrame && this._buffers) {
          for (let i = 0; i < this._buffers.length; ++i) {
            const buffer = this._buffers[i][0];
            this._engine._releaseBuffer(buffer);
          }
        } else if (this._buffer && this._engine._releaseBuffer(this._buffer)) {
          this._buffer = null;
        }
      }
    };
    UniformBuffer._UpdatedUbosInFrame = {};
    UniformBuffer._MAX_UNIFORM_SIZE = 256;
    UniformBuffer._TempBuffer = new Float32Array(UniformBuffer._MAX_UNIFORM_SIZE);
    UniformBuffer._TempBufferInt32View = new Int32Array(UniformBuffer._TempBuffer.buffer);
    UniformBuffer._TempBufferUInt32View = new Uint32Array(UniformBuffer._TempBuffer.buffer);
  }
});

// node_modules/@babylonjs/core/Buffers/buffer.js
var Buffer, VertexBuffer;
var init_buffer = __esm({
  "node_modules/@babylonjs/core/Buffers/buffer.js"() {
    init_dataBuffer();
    init_logger();
    Buffer = class {
      /**
       * Gets a boolean indicating if the Buffer is disposed
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Constructor
       * @param engine the engine
       * @param data the data to use for this buffer
       * @param updatable whether the data is updatable
       * @param stride the stride (optional)
       * @param postponeInternalCreation whether to postpone creating the internal WebGL buffer (optional)
       * @param instanced whether the buffer is instanced (optional)
       * @param useBytes set to true if the stride in in bytes (optional)
       * @param divisor sets an optional divisor for instances (1 by default)
       * @param label defines the label of the buffer (for debug purpose)
       */
      constructor(engine, data, updatable, stride = 0, postponeInternalCreation = false, instanced = false, useBytes = false, divisor, label) {
        this._isAlreadyOwned = false;
        this._isDisposed = false;
        if (engine && engine.getScene) {
          this._engine = engine.getScene().getEngine();
        } else {
          this._engine = engine;
        }
        this._updatable = updatable;
        this._instanced = instanced;
        this._divisor = divisor || 1;
        this._label = label;
        if (data instanceof DataBuffer) {
          this._data = null;
          this._buffer = data;
        } else {
          this._data = data;
          this._buffer = null;
        }
        this.byteStride = useBytes ? stride : stride * Float32Array.BYTES_PER_ELEMENT;
        if (!postponeInternalCreation) {
          this.create();
        }
      }
      /**
       * Create a new VertexBuffer based on the current buffer
       * @param kind defines the vertex buffer kind (position, normal, etc.)
       * @param offset defines offset in the buffer (0 by default)
       * @param size defines the size in floats of attributes (position is 3 for instance)
       * @param stride defines the stride size in floats in the buffer (the offset to apply to reach next value when data is interleaved)
       * @param instanced defines if the vertex buffer contains indexed data
       * @param useBytes defines if the offset and stride are in bytes     *
       * @param divisor sets an optional divisor for instances (1 by default)
       * @returns the new vertex buffer
       */
      createVertexBuffer(kind, offset, size, stride, instanced, useBytes = false, divisor) {
        const byteOffset = useBytes ? offset : offset * Float32Array.BYTES_PER_ELEMENT;
        const byteStride = stride ? useBytes ? stride : stride * Float32Array.BYTES_PER_ELEMENT : this.byteStride;
        return new VertexBuffer(this._engine, this, kind, this._updatable, true, byteStride, instanced === void 0 ? this._instanced : instanced, byteOffset, size, void 0, void 0, true, this._divisor || divisor);
      }
      // Properties
      /**
       * Gets a boolean indicating if the Buffer is updatable?
       * @returns true if the buffer is updatable
       */
      isUpdatable() {
        return this._updatable;
      }
      /**
       * Gets current buffer's data
       * @returns a DataArray or null
       */
      getData() {
        return this._data;
      }
      /**
       * Gets underlying native buffer
       * @returns underlying native buffer
       */
      getBuffer() {
        return this._buffer;
      }
      /**
       * Gets the stride in float32 units (i.e. byte stride / 4).
       * May not be an integer if the byte stride is not divisible by 4.
       * @returns the stride in float32 units
       * @deprecated Please use byteStride instead.
       */
      getStrideSize() {
        return this.byteStride / Float32Array.BYTES_PER_ELEMENT;
      }
      // Methods
      /**
       * Store data into the buffer. Creates the buffer if not used already.
       * If the buffer was already used, it will be updated only if it is updatable, otherwise it will do nothing.
       * @param data defines the data to store
       */
      create(data = null) {
        if (!data && this._buffer) {
          return;
        }
        data = data || this._data;
        if (!data) {
          return;
        }
        if (!this._buffer) {
          if (this._updatable) {
            this._buffer = this._engine.createDynamicVertexBuffer(data, this._label);
            this._data = data;
          } else {
            this._buffer = this._engine.createVertexBuffer(data, void 0, this._label);
          }
        } else if (this._updatable) {
          this._engine.updateDynamicVertexBuffer(this._buffer, data);
          this._data = data;
        }
      }
      /** @internal */
      _rebuild() {
        if (!this._data) {
          if (!this._buffer) {
            return;
          }
          if (this._buffer.capacity > 0) {
            if (this._updatable) {
              this._buffer = this._engine.createDynamicVertexBuffer(this._buffer.capacity, this._label);
            } else {
              this._buffer = this._engine.createVertexBuffer(this._buffer.capacity, void 0, this._label);
            }
            return;
          }
          Logger.Warn(`Missing data for buffer "${this._label}" ${this._buffer ? "(uniqueId: " + this._buffer.uniqueId + ")" : ""}. Buffer reconstruction failed.`);
          this._buffer = null;
        } else {
          this._buffer = null;
          this.create(this._data);
        }
      }
      /**
       * Update current buffer data
       * @param data defines the data to store
       */
      update(data) {
        this.create(data);
      }
      /**
       * Updates the data directly.
       * @param data the new data
       * @param offset the new offset
       * @param vertexCount the vertex count (optional)
       * @param useBytes set to true if the offset is in bytes
       */
      updateDirectly(data, offset, vertexCount, useBytes = false) {
        if (!this._buffer) {
          return;
        }
        if (this._updatable) {
          this._engine.updateDynamicVertexBuffer(this._buffer, data, useBytes ? offset : offset * Float32Array.BYTES_PER_ELEMENT, vertexCount ? vertexCount * this.byteStride : void 0);
          if (offset === 0 && vertexCount === void 0) {
            this._data = data;
          } else {
            this._data = null;
          }
        }
      }
      /** @internal */
      _increaseReferences() {
        if (!this._buffer) {
          return;
        }
        if (!this._isAlreadyOwned) {
          this._isAlreadyOwned = true;
          return;
        }
        this._buffer.references++;
      }
      /**
       * Release all resources
       */
      dispose() {
        if (!this._buffer) {
          return;
        }
        if (this._engine._releaseBuffer(this._buffer)) {
          this._isDisposed = true;
          this._data = null;
          this._buffer = null;
        }
      }
    };
    VertexBuffer = class _VertexBuffer {
      /**
       * Gets a boolean indicating if the Buffer is disposed
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Gets or sets the instance divisor when in instanced mode
       */
      get instanceDivisor() {
        return this._instanceDivisor;
      }
      set instanceDivisor(value) {
        const isInstanced = value != 0;
        this._instanceDivisor = value;
        if (isInstanced !== this._instanced) {
          this._instanced = isInstanced;
          this._computeHashCode();
        }
      }
      /**
       * Gets the max possible amount of vertices stored within the current vertex buffer.
       * We do not have the end offset or count so this will be too big for concatenated vertex buffers.
       * @internal
       */
      get _maxVerticesCount() {
        const data = this.getData();
        if (!data) {
          return 0;
        }
        if (Array.isArray(data)) {
          return data.length / (this.byteStride / 4) - this.byteOffset / 4;
        }
        return (data.byteLength - this.byteOffset) / this.byteStride;
      }
      /** @internal */
      constructor(engine, data, kind, updatableOrOptions, postponeInternalCreation, stride, instanced, offset, size, type, normalized = false, useBytes = false, divisor = 1, takeBufferOwnership = false) {
        this._isDisposed = false;
        let updatable = false;
        this.engine = engine;
        if (typeof updatableOrOptions === "object" && updatableOrOptions !== null) {
          updatable = updatableOrOptions.updatable ?? false;
          postponeInternalCreation = updatableOrOptions.postponeInternalCreation;
          stride = updatableOrOptions.stride;
          instanced = updatableOrOptions.instanced;
          offset = updatableOrOptions.offset;
          size = updatableOrOptions.size;
          type = updatableOrOptions.type;
          normalized = updatableOrOptions.normalized ?? false;
          useBytes = updatableOrOptions.useBytes ?? false;
          divisor = updatableOrOptions.divisor ?? 1;
          takeBufferOwnership = updatableOrOptions.takeBufferOwnership ?? false;
          this._label = updatableOrOptions.label;
        } else {
          updatable = !!updatableOrOptions;
        }
        if (data instanceof Buffer) {
          this._buffer = data;
          this._ownsBuffer = takeBufferOwnership;
        } else {
          this._buffer = new Buffer(engine, data, updatable, stride, postponeInternalCreation, instanced, useBytes, divisor, this._label);
          this._ownsBuffer = true;
        }
        this.uniqueId = _VertexBuffer._Counter++;
        this._kind = kind;
        if (type === void 0) {
          const vertexData = this.getData();
          this.type = vertexData ? _VertexBuffer.GetDataType(vertexData) : _VertexBuffer.FLOAT;
        } else {
          this.type = type;
        }
        const typeByteLength = _VertexBuffer.GetTypeByteLength(this.type);
        if (useBytes) {
          this._size = size || (stride ? stride / typeByteLength : _VertexBuffer.DeduceStride(kind));
          this.byteStride = stride || this._buffer.byteStride || this._size * typeByteLength;
          this.byteOffset = offset || 0;
        } else {
          this._size = size || stride || _VertexBuffer.DeduceStride(kind);
          this.byteStride = stride ? stride * typeByteLength : this._buffer.byteStride || this._size * typeByteLength;
          this.byteOffset = (offset || 0) * typeByteLength;
        }
        this.normalized = normalized;
        this._instanced = instanced !== void 0 ? instanced : false;
        this._instanceDivisor = instanced ? divisor : 0;
        this._alignBuffer();
        this._computeHashCode();
      }
      _computeHashCode() {
        this.hashCode = (this.type - 5120 << 0) + ((this.normalized ? 1 : 0) << 3) + (this._size << 4) + ((this._instanced ? 1 : 0) << 6) + /* keep 5 bits free */
        (this.byteStride << 12);
      }
      /** @internal */
      _rebuild() {
        var _a;
        (_a = this._buffer) == null ? void 0 : _a._rebuild();
      }
      /**
       * Returns the kind of the VertexBuffer (string)
       * @returns a string
       */
      getKind() {
        return this._kind;
      }
      // Properties
      /**
       * Gets a boolean indicating if the VertexBuffer is updatable?
       * @returns true if the buffer is updatable
       */
      isUpdatable() {
        return this._buffer.isUpdatable();
      }
      /**
       * Gets current buffer's data
       * @returns a DataArray or null
       */
      getData() {
        return this._buffer.getData();
      }
      /**
       * Gets current buffer's data as a float array. Float data is constructed if the vertex buffer data cannot be returned directly.
       * @param totalVertices number of vertices in the buffer to take into account
       * @param forceCopy defines a boolean indicating that the returned array must be cloned upon returning it
       * @returns a float array containing vertex data
       */
      getFloatData(totalVertices, forceCopy) {
        const data = this.getData();
        if (!data) {
          return null;
        }
        return _VertexBuffer.GetFloatData(data, this._size, this.type, this.byteOffset, this.byteStride, this.normalized, totalVertices, forceCopy);
      }
      /**
       * Gets underlying native buffer
       * @returns underlying native buffer
       */
      getBuffer() {
        return this._buffer.getBuffer();
      }
      /**
       * Gets the Buffer instance that wraps the native GPU buffer
       * @returns the wrapper buffer
       */
      getWrapperBuffer() {
        return this._buffer;
      }
      /**
       * Gets the stride in float32 units (i.e. byte stride / 4).
       * May not be an integer if the byte stride is not divisible by 4.
       * @returns the stride in float32 units
       * @deprecated Please use byteStride instead.
       */
      getStrideSize() {
        return this.byteStride / _VertexBuffer.GetTypeByteLength(this.type);
      }
      /**
       * Returns the offset as a multiple of the type byte length.
       * @returns the offset in bytes
       * @deprecated Please use byteOffset instead.
       */
      getOffset() {
        return this.byteOffset / _VertexBuffer.GetTypeByteLength(this.type);
      }
      /**
       * Returns the number of components or the byte size per vertex attribute
       * @param sizeInBytes If true, returns the size in bytes or else the size in number of components of the vertex attribute (default: false)
       * @returns the number of components
       */
      getSize(sizeInBytes = false) {
        return sizeInBytes ? this._size * _VertexBuffer.GetTypeByteLength(this.type) : this._size;
      }
      /**
       * Gets a boolean indicating is the internal buffer of the VertexBuffer is instanced
       * @returns true if this buffer is instanced
       */
      getIsInstanced() {
        return this._instanced;
      }
      /**
       * Returns the instancing divisor, zero for non-instanced (integer).
       * @returns a number
       */
      getInstanceDivisor() {
        return this._instanceDivisor;
      }
      // Methods
      /**
       * Store data into the buffer. If the buffer was already used it will be either recreated or updated depending on isUpdatable property
       * @param data defines the data to store
       */
      create(data) {
        this._buffer.create(data);
        this._alignBuffer();
      }
      /**
       * Updates the underlying buffer according to the passed numeric array or Float32Array.
       * This function will create a new buffer if the current one is not updatable
       * @param data defines the data to store
       */
      update(data) {
        this._buffer.update(data);
        this._alignBuffer();
      }
      /**
       * Updates directly the underlying WebGLBuffer according to the passed numeric array or Float32Array.
       * Returns the directly updated WebGLBuffer.
       * @param data the new data
       * @param offset the new offset
       * @param useBytes set to true if the offset is in bytes
       */
      updateDirectly(data, offset, useBytes = false) {
        this._buffer.updateDirectly(data, offset, void 0, useBytes);
        this._alignBuffer();
      }
      /**
       * Disposes the VertexBuffer and the underlying WebGLBuffer.
       */
      dispose() {
        if (this._ownsBuffer) {
          this._buffer.dispose();
        }
        this._isDisposed = true;
      }
      /**
       * Enumerates each value of this vertex buffer as numbers.
       * @param count the number of values to enumerate
       * @param callback the callback function called for each value
       */
      forEach(count, callback) {
        _VertexBuffer.ForEach(this._buffer.getData(), this.byteOffset, this.byteStride, this._size, this.type, count, this.normalized, callback);
      }
      /** @internal */
      _alignBuffer() {
      }
      /**
       * Deduces the stride given a kind.
       * @param kind The kind string to deduce
       * @returns The deduced stride
       */
      static DeduceStride(kind) {
        switch (kind) {
          case _VertexBuffer.UVKind:
          case _VertexBuffer.UV2Kind:
          case _VertexBuffer.UV3Kind:
          case _VertexBuffer.UV4Kind:
          case _VertexBuffer.UV5Kind:
          case _VertexBuffer.UV6Kind:
            return 2;
          case _VertexBuffer.NormalKind:
          case _VertexBuffer.PositionKind:
            return 3;
          case _VertexBuffer.ColorKind:
          case _VertexBuffer.ColorInstanceKind:
          case _VertexBuffer.MatricesIndicesKind:
          case _VertexBuffer.MatricesIndicesExtraKind:
          case _VertexBuffer.MatricesWeightsKind:
          case _VertexBuffer.MatricesWeightsExtraKind:
          case _VertexBuffer.TangentKind:
            return 4;
          default:
            throw new Error("Invalid kind '" + kind + "'");
        }
      }
      /**
       * Gets the vertex buffer type of the given data array.
       * @param data the data array
       * @returns the vertex buffer type
       */
      static GetDataType(data) {
        if (data instanceof Int8Array) {
          return _VertexBuffer.BYTE;
        } else if (data instanceof Uint8Array) {
          return _VertexBuffer.UNSIGNED_BYTE;
        } else if (data instanceof Int16Array) {
          return _VertexBuffer.SHORT;
        } else if (data instanceof Uint16Array) {
          return _VertexBuffer.UNSIGNED_SHORT;
        } else if (data instanceof Int32Array) {
          return _VertexBuffer.INT;
        } else if (data instanceof Uint32Array) {
          return _VertexBuffer.UNSIGNED_INT;
        } else {
          return _VertexBuffer.FLOAT;
        }
      }
      /**
       * Gets the byte length of the given type.
       * @param type the type
       * @returns the number of bytes
       */
      static GetTypeByteLength(type) {
        switch (type) {
          case _VertexBuffer.BYTE:
          case _VertexBuffer.UNSIGNED_BYTE:
            return 1;
          case _VertexBuffer.SHORT:
          case _VertexBuffer.UNSIGNED_SHORT:
            return 2;
          case _VertexBuffer.INT:
          case _VertexBuffer.UNSIGNED_INT:
          case _VertexBuffer.FLOAT:
            return 4;
          default:
            throw new Error(`Invalid type '${type}'`);
        }
      }
      /**
       * Enumerates each value of the given parameters as numbers.
       * @param data the data to enumerate
       * @param byteOffset the byte offset of the data
       * @param byteStride the byte stride of the data
       * @param componentCount the number of components per element
       * @param componentType the type of the component
       * @param count the number of values to enumerate
       * @param normalized whether the data is normalized
       * @param callback the callback function called for each value
       */
      static ForEach(data, byteOffset, byteStride, componentCount, componentType, count, normalized, callback) {
        if (data instanceof Array) {
          let offset = byteOffset / 4;
          const stride = byteStride / 4;
          for (let index = 0; index < count; index += componentCount) {
            for (let componentIndex = 0; componentIndex < componentCount; componentIndex++) {
              callback(data[offset + componentIndex], index + componentIndex);
            }
            offset += stride;
          }
        } else {
          const dataView = data instanceof ArrayBuffer ? new DataView(data) : new DataView(data.buffer, data.byteOffset, data.byteLength);
          const componentByteLength = _VertexBuffer.GetTypeByteLength(componentType);
          for (let index = 0; index < count; index += componentCount) {
            let componentByteOffset = byteOffset;
            for (let componentIndex = 0; componentIndex < componentCount; componentIndex++) {
              const value = _VertexBuffer._GetFloatValue(dataView, componentType, componentByteOffset, normalized);
              callback(value, index + componentIndex);
              componentByteOffset += componentByteLength;
            }
            byteOffset += byteStride;
          }
        }
      }
      static _GetFloatValue(dataView, type, byteOffset, normalized) {
        switch (type) {
          case _VertexBuffer.BYTE: {
            let value = dataView.getInt8(byteOffset);
            if (normalized) {
              value = Math.max(value / 127, -1);
            }
            return value;
          }
          case _VertexBuffer.UNSIGNED_BYTE: {
            let value = dataView.getUint8(byteOffset);
            if (normalized) {
              value = value / 255;
            }
            return value;
          }
          case _VertexBuffer.SHORT: {
            let value = dataView.getInt16(byteOffset, true);
            if (normalized) {
              value = Math.max(value / 32767, -1);
            }
            return value;
          }
          case _VertexBuffer.UNSIGNED_SHORT: {
            let value = dataView.getUint16(byteOffset, true);
            if (normalized) {
              value = value / 65535;
            }
            return value;
          }
          case _VertexBuffer.INT: {
            return dataView.getInt32(byteOffset, true);
          }
          case _VertexBuffer.UNSIGNED_INT: {
            return dataView.getUint32(byteOffset, true);
          }
          case _VertexBuffer.FLOAT: {
            return dataView.getFloat32(byteOffset, true);
          }
          default: {
            throw new Error(`Invalid component type ${type}`);
          }
        }
      }
      /**
       * Gets the given data array as a float array. Float data is constructed if the data array cannot be returned directly.
       * @param data the input data array
       * @param size the number of components
       * @param type the component type
       * @param byteOffset the byte offset of the data
       * @param byteStride the byte stride of the data
       * @param normalized whether the data is normalized
       * @param totalVertices number of vertices in the buffer to take into account
       * @param forceCopy defines a boolean indicating that the returned array must be cloned upon returning it
       * @returns a float array containing vertex data
       */
      static GetFloatData(data, size, type, byteOffset, byteStride, normalized, totalVertices, forceCopy) {
        const tightlyPackedByteStride = size * _VertexBuffer.GetTypeByteLength(type);
        const count = totalVertices * size;
        if (type !== _VertexBuffer.FLOAT || byteStride !== tightlyPackedByteStride) {
          const copy = new Float32Array(count);
          _VertexBuffer.ForEach(data, byteOffset, byteStride, size, type, count, normalized, (value, index) => copy[index] = value);
          return copy;
        }
        if (!(data instanceof Array || data instanceof Float32Array) || byteOffset !== 0 || data.length !== count) {
          if (data instanceof Array) {
            const offset = byteOffset / 4;
            return data.slice(offset, offset + count);
          } else if (data instanceof ArrayBuffer) {
            return new Float32Array(data, byteOffset, count);
          } else {
            let offset = data.byteOffset + byteOffset;
            if (forceCopy) {
              const result = new Float32Array(count);
              const source = new Float32Array(data.buffer, offset, count);
              result.set(source);
              return result;
            }
            const remainder = offset % 4;
            if (remainder) {
              offset = Math.max(0, offset - remainder);
            }
            return new Float32Array(data.buffer, offset, count);
          }
        }
        if (forceCopy) {
          return data.slice();
        }
        return data;
      }
    };
    VertexBuffer._Counter = 0;
    VertexBuffer.BYTE = 5120;
    VertexBuffer.UNSIGNED_BYTE = 5121;
    VertexBuffer.SHORT = 5122;
    VertexBuffer.UNSIGNED_SHORT = 5123;
    VertexBuffer.INT = 5124;
    VertexBuffer.UNSIGNED_INT = 5125;
    VertexBuffer.FLOAT = 5126;
    VertexBuffer.PositionKind = `position`;
    VertexBuffer.NormalKind = `normal`;
    VertexBuffer.TangentKind = `tangent`;
    VertexBuffer.UVKind = `uv`;
    VertexBuffer.UV2Kind = `uv2`;
    VertexBuffer.UV3Kind = `uv3`;
    VertexBuffer.UV4Kind = `uv4`;
    VertexBuffer.UV5Kind = `uv5`;
    VertexBuffer.UV6Kind = `uv6`;
    VertexBuffer.ColorKind = `color`;
    VertexBuffer.ColorInstanceKind = `instanceColor`;
    VertexBuffer.MatricesIndicesKind = `matricesIndices`;
    VertexBuffer.MatricesWeightsKind = `matricesWeights`;
    VertexBuffer.MatricesIndicesExtraKind = `matricesIndicesExtra`;
    VertexBuffer.MatricesWeightsExtraKind = `matricesWeightsExtra`;
  }
});

// node_modules/@babylonjs/core/Collisions/pickingInfo.js
var PickingInfo;
var init_pickingInfo = __esm({
  "node_modules/@babylonjs/core/Collisions/pickingInfo.js"() {
    init_math_vector();
    init_buffer();
    PickingInfo = class {
      constructor() {
        this.hit = false;
        this.distance = 0;
        this.pickedPoint = null;
        this.pickedMesh = null;
        this.bu = 0;
        this.bv = 0;
        this.faceId = -1;
        this.subMeshFaceId = -1;
        this.subMeshId = 0;
        this.pickedSprite = null;
        this.thinInstanceIndex = -1;
        this.ray = null;
        this.originMesh = null;
        this.aimTransform = null;
        this.gripTransform = null;
      }
      /**
       * Gets the normal corresponding to the face the pick collided with
       * @param useWorldCoordinates If the resulting normal should be relative to the world (default: false)
       * @param useVerticesNormals If the vertices normals should be used to calculate the normal instead of the normal map (default: true)
       * @returns The normal corresponding to the face the pick collided with
       * @remarks Note that the returned normal will always point towards the picking ray.
       */
      getNormal(useWorldCoordinates = false, useVerticesNormals = true) {
        if (!this.pickedMesh || useVerticesNormals && !this.pickedMesh.isVerticesDataPresent(VertexBuffer.NormalKind)) {
          return null;
        }
        let indices = this.pickedMesh.getIndices();
        if ((indices == null ? void 0 : indices.length) === 0) {
          indices = null;
        }
        let result;
        const tmp0 = TmpVectors.Vector3[0];
        const tmp1 = TmpVectors.Vector3[1];
        const tmp2 = TmpVectors.Vector3[2];
        if (useVerticesNormals) {
          const normals = this.pickedMesh.getVerticesData(VertexBuffer.NormalKind);
          let normal0 = indices ? Vector3.FromArrayToRef(normals, indices[this.faceId * 3] * 3, tmp0) : tmp0.copyFromFloats(normals[this.faceId * 3 * 3], normals[this.faceId * 3 * 3 + 1], normals[this.faceId * 3 * 3 + 2]);
          let normal1 = indices ? Vector3.FromArrayToRef(normals, indices[this.faceId * 3 + 1] * 3, tmp1) : tmp1.copyFromFloats(normals[(this.faceId * 3 + 1) * 3], normals[(this.faceId * 3 + 1) * 3 + 1], normals[(this.faceId * 3 + 1) * 3 + 2]);
          let normal2 = indices ? Vector3.FromArrayToRef(normals, indices[this.faceId * 3 + 2] * 3, tmp2) : tmp2.copyFromFloats(normals[(this.faceId * 3 + 2) * 3], normals[(this.faceId * 3 + 2) * 3 + 1], normals[(this.faceId * 3 + 2) * 3 + 2]);
          normal0 = normal0.scale(this.bu);
          normal1 = normal1.scale(this.bv);
          normal2 = normal2.scale(1 - this.bu - this.bv);
          result = new Vector3(normal0.x + normal1.x + normal2.x, normal0.y + normal1.y + normal2.y, normal0.z + normal1.z + normal2.z);
        } else {
          const positions = this.pickedMesh.getVerticesData(VertexBuffer.PositionKind);
          const vertex1 = indices ? Vector3.FromArrayToRef(positions, indices[this.faceId * 3] * 3, tmp0) : tmp0.copyFromFloats(positions[this.faceId * 3 * 3], positions[this.faceId * 3 * 3 + 1], positions[this.faceId * 3 * 3 + 2]);
          const vertex2 = indices ? Vector3.FromArrayToRef(positions, indices[this.faceId * 3 + 1] * 3, tmp1) : tmp1.copyFromFloats(positions[(this.faceId * 3 + 1) * 3], positions[(this.faceId * 3 + 1) * 3 + 1], positions[(this.faceId * 3 + 1) * 3 + 2]);
          const vertex3 = indices ? Vector3.FromArrayToRef(positions, indices[this.faceId * 3 + 2] * 3, tmp2) : tmp2.copyFromFloats(positions[(this.faceId * 3 + 2) * 3], positions[(this.faceId * 3 + 2) * 3 + 1], positions[(this.faceId * 3 + 2) * 3 + 2]);
          const p1p2 = vertex1.subtract(vertex2);
          const p3p2 = vertex3.subtract(vertex2);
          result = Vector3.Cross(p1p2, p3p2);
        }
        const transformNormalToWorld = (pickedMesh, n) => {
          let wm = pickedMesh.getWorldMatrix();
          if (pickedMesh.nonUniformScaling) {
            TmpVectors.Matrix[0].copyFrom(wm);
            wm = TmpVectors.Matrix[0];
            wm.setTranslationFromFloats(0, 0, 0);
            wm.invert();
            wm.transposeToRef(TmpVectors.Matrix[1]);
            wm = TmpVectors.Matrix[1];
          }
          Vector3.TransformNormalToRef(n, wm, n);
        };
        if (useWorldCoordinates) {
          transformNormalToWorld(this.pickedMesh, result);
        }
        if (this.ray) {
          const normalForDirectionChecking = TmpVectors.Vector3[0].copyFrom(result);
          if (!useWorldCoordinates) {
            transformNormalToWorld(this.pickedMesh, normalForDirectionChecking);
          }
          if (Vector3.Dot(normalForDirectionChecking, this.ray.direction) > 0) {
            result.negateInPlace();
          }
        }
        result.normalize();
        return result;
      }
      /**
       * Gets the texture coordinates of where the pick occurred
       * @param uvSet The UV set to use to calculate the texture coordinates (default: VertexBuffer.UVKind)
       * @returns The vector containing the coordinates of the texture
       */
      getTextureCoordinates(uvSet = VertexBuffer.UVKind) {
        if (!this.pickedMesh || !this.pickedMesh.isVerticesDataPresent(uvSet)) {
          return null;
        }
        const indices = this.pickedMesh.getIndices();
        if (!indices) {
          return null;
        }
        const uvs = this.pickedMesh.getVerticesData(uvSet);
        if (!uvs) {
          return null;
        }
        let uv0 = Vector2.FromArray(uvs, indices[this.faceId * 3] * 2);
        let uv1 = Vector2.FromArray(uvs, indices[this.faceId * 3 + 1] * 2);
        let uv2 = Vector2.FromArray(uvs, indices[this.faceId * 3 + 2] * 2);
        uv0 = uv0.scale(this.bu);
        uv1 = uv1.scale(this.bv);
        uv2 = uv2.scale(1 - this.bu - this.bv);
        return new Vector2(uv0.x + uv1.x + uv2.x, uv0.y + uv1.y + uv2.y);
      }
    };
  }
});

// node_modules/@babylonjs/core/Actions/actionEvent.js
var ActionEvent;
var init_actionEvent = __esm({
  "node_modules/@babylonjs/core/Actions/actionEvent.js"() {
    ActionEvent = class _ActionEvent {
      /**
       * Creates a new ActionEvent
       * @param source The mesh or sprite that triggered the action
       * @param pointerX The X mouse cursor position at the time of the event
       * @param pointerY The Y mouse cursor position at the time of the event
       * @param meshUnderPointer The mesh that is currently pointed at (can be null)
       * @param sourceEvent the original (browser) event that triggered the ActionEvent
       * @param additionalData additional data for the event
       */
      constructor(source, pointerX, pointerY, meshUnderPointer, sourceEvent, additionalData) {
        this.source = source;
        this.pointerX = pointerX;
        this.pointerY = pointerY;
        this.meshUnderPointer = meshUnderPointer;
        this.sourceEvent = sourceEvent;
        this.additionalData = additionalData;
      }
      /**
       * Helper function to auto-create an ActionEvent from a source mesh.
       * @param source The source mesh that triggered the event
       * @param evt The original (browser) event
       * @param additionalData additional data for the event
       * @returns the new ActionEvent
       */
      static CreateNew(source, evt, additionalData) {
        const scene = source.getScene();
        return new _ActionEvent(source, scene.pointerX, scene.pointerY, scene.meshUnderPointer || source, evt, additionalData);
      }
      /**
       * Helper function to auto-create an ActionEvent from a source sprite
       * @param source The source sprite that triggered the event
       * @param scene Scene associated with the sprite
       * @param evt The original (browser) event
       * @param additionalData additional data for the event
       * @returns the new ActionEvent
       */
      static CreateNewFromSprite(source, scene, evt, additionalData) {
        return new _ActionEvent(source, scene.pointerX, scene.pointerY, scene.meshUnderPointer, evt, additionalData);
      }
      /**
       * Helper function to auto-create an ActionEvent from a scene. If triggered by a mesh use ActionEvent.CreateNew
       * @param scene the scene where the event occurred
       * @param evt The original (browser) event
       * @returns the new ActionEvent
       */
      static CreateNewFromScene(scene, evt) {
        return new _ActionEvent(null, scene.pointerX, scene.pointerY, scene.meshUnderPointer, evt);
      }
      /**
       * Helper function to auto-create an ActionEvent from a primitive
       * @param prim defines the target primitive
       * @param pointerPos defines the pointer position
       * @param evt The original (browser) event
       * @param additionalData additional data for the event
       * @returns the new ActionEvent
       */
      static CreateNewFromPrimitive(prim, pointerPos, evt, additionalData) {
        return new _ActionEvent(prim, pointerPos.x, pointerPos.y, null, evt, additionalData);
      }
    };
  }
});

// node_modules/@babylonjs/core/PostProcesses/postProcessManager.js
var PostProcessManager;
var init_postProcessManager = __esm({
  "node_modules/@babylonjs/core/PostProcesses/postProcessManager.js"() {
    init_buffer();
    PostProcessManager = class {
      /**
       * Creates a new instance PostProcess
       * @param scene The scene that the post process is associated with.
       */
      constructor(scene) {
        this._vertexBuffers = {};
        this._scene = scene;
      }
      _prepareBuffers() {
        if (this._vertexBuffers[VertexBuffer.PositionKind]) {
          return;
        }
        const vertices = [];
        vertices.push(1, 1);
        vertices.push(-1, 1);
        vertices.push(-1, -1);
        vertices.push(1, -1);
        this._vertexBuffers[VertexBuffer.PositionKind] = new VertexBuffer(this._scene.getEngine(), vertices, VertexBuffer.PositionKind, false, false, 2);
        this._buildIndexBuffer();
      }
      _buildIndexBuffer() {
        const indices = [];
        indices.push(0);
        indices.push(1);
        indices.push(2);
        indices.push(0);
        indices.push(2);
        indices.push(3);
        this._indexBuffer = this._scene.getEngine().createIndexBuffer(indices);
      }
      /**
       * Rebuilds the vertex buffers of the manager.
       * @internal
       */
      _rebuild() {
        const vb = this._vertexBuffers[VertexBuffer.PositionKind];
        if (!vb) {
          return;
        }
        vb._rebuild();
        this._buildIndexBuffer();
      }
      // Methods
      /**
       * Prepares a frame to be run through a post process.
       * @param sourceTexture The input texture to the post processes. (default: null)
       * @param postProcesses An array of post processes to be run. (default: null)
       * @returns True if the post processes were able to be run.
       * @internal
       */
      _prepareFrame(sourceTexture = null, postProcesses = null) {
        const camera = this._scene.activeCamera;
        if (!camera) {
          return false;
        }
        postProcesses = postProcesses || camera._postProcesses.filter((pp) => {
          return pp != null;
        });
        if (!postProcesses || postProcesses.length === 0 || !this._scene.postProcessesEnabled) {
          return false;
        }
        postProcesses[0].activate(camera, sourceTexture, postProcesses !== null && postProcesses !== void 0);
        return true;
      }
      /**
       * Manually render a set of post processes to a texture.
       * Please note, the frame buffer won't be unbound after the call in case you have more render to do.
       * @param postProcesses An array of post processes to be run.
       * @param targetTexture The render target wrapper to render to.
       * @param forceFullscreenViewport force gl.viewport to be full screen eg. 0,0,textureWidth,textureHeight
       * @param faceIndex defines the face to render to if a cubemap is defined as the target
       * @param lodLevel defines which lod of the texture to render to
       * @param doNotBindFrambuffer If set to true, assumes that the framebuffer has been bound previously
       */
      directRender(postProcesses, targetTexture = null, forceFullscreenViewport = false, faceIndex = 0, lodLevel = 0, doNotBindFrambuffer = false) {
        var _a;
        const engine = this._scene.getEngine();
        for (let index = 0; index < postProcesses.length; index++) {
          if (index < postProcesses.length - 1) {
            postProcesses[index + 1].activate(this._scene.activeCamera, targetTexture == null ? void 0 : targetTexture.texture);
          } else {
            if (targetTexture) {
              engine.bindFramebuffer(targetTexture, faceIndex, void 0, void 0, forceFullscreenViewport, lodLevel);
            } else if (!doNotBindFrambuffer) {
              engine.restoreDefaultFramebuffer();
            }
            (_a = engine._debugInsertMarker) == null ? void 0 : _a.call(engine, `post process ${postProcesses[index].name} output`);
          }
          const pp = postProcesses[index];
          const effect = pp.apply();
          if (effect) {
            pp.onBeforeRenderObservable.notifyObservers(effect);
            this._prepareBuffers();
            engine.bindBuffers(this._vertexBuffers, this._indexBuffer, effect);
            engine.drawElementsType(0, 0, 6);
            pp.onAfterRenderObservable.notifyObservers(effect);
          }
        }
        engine.setDepthBuffer(true);
        engine.setDepthWrite(true);
      }
      /**
       * Finalize the result of the output of the postprocesses.
       * @param doNotPresent If true the result will not be displayed to the screen.
       * @param targetTexture The render target wrapper to render to.
       * @param faceIndex The index of the face to bind the target texture to.
       * @param postProcesses The array of post processes to render.
       * @param forceFullscreenViewport force gl.viewport to be full screen eg. 0,0,textureWidth,textureHeight (default: false)
       * @internal
       */
      _finalizeFrame(doNotPresent, targetTexture, faceIndex, postProcesses, forceFullscreenViewport = false) {
        var _a;
        const camera = this._scene.activeCamera;
        if (!camera) {
          return;
        }
        postProcesses = postProcesses || camera._postProcesses.filter((pp) => {
          return pp != null;
        });
        if (postProcesses.length === 0 || !this._scene.postProcessesEnabled) {
          return;
        }
        const engine = this._scene.getEngine();
        for (let index = 0, len = postProcesses.length; index < len; index++) {
          const pp = postProcesses[index];
          if (index < len - 1) {
            pp._outputTexture = postProcesses[index + 1].activate(camera, targetTexture == null ? void 0 : targetTexture.texture);
          } else {
            if (targetTexture) {
              engine.bindFramebuffer(targetTexture, faceIndex, void 0, void 0, forceFullscreenViewport);
              pp._outputTexture = targetTexture;
            } else {
              engine.restoreDefaultFramebuffer();
              pp._outputTexture = null;
            }
            (_a = engine._debugInsertMarker) == null ? void 0 : _a.call(engine, `post process ${postProcesses[index].name} output`);
          }
          if (doNotPresent) {
            break;
          }
          const effect = pp.apply();
          if (effect) {
            pp.onBeforeRenderObservable.notifyObservers(effect);
            this._prepareBuffers();
            engine.bindBuffers(this._vertexBuffers, this._indexBuffer, effect);
            engine.drawElementsType(0, 0, 6);
            pp.onAfterRenderObservable.notifyObservers(effect);
          }
        }
        engine.setDepthBuffer(true);
        engine.setDepthWrite(true);
        engine.setAlphaMode(0);
      }
      /**
       * Disposes of the post process manager.
       */
      dispose() {
        const buffer = this._vertexBuffers[VertexBuffer.PositionKind];
        if (buffer) {
          buffer.dispose();
          this._vertexBuffers[VertexBuffer.PositionKind] = null;
        }
        if (this._indexBuffer) {
          this._scene.getEngine()._releaseBuffer(this._indexBuffer);
          this._indexBuffer = null;
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Rendering/renderingGroup.js
var RenderingGroup;
var init_renderingGroup = __esm({
  "node_modules/@babylonjs/core/Rendering/renderingGroup.js"() {
    init_smartArray();
    init_math_vector();
    RenderingGroup = class _RenderingGroup {
      /**
       * Set the opaque sort comparison function.
       * If null the sub meshes will be render in the order they were created
       */
      set opaqueSortCompareFn(value) {
        if (value) {
          this._opaqueSortCompareFn = value;
        } else {
          this._opaqueSortCompareFn = _RenderingGroup.PainterSortCompare;
        }
        this._renderOpaque = this._renderOpaqueSorted;
      }
      /**
       * Set the alpha test sort comparison function.
       * If null the sub meshes will be render in the order they were created
       */
      set alphaTestSortCompareFn(value) {
        if (value) {
          this._alphaTestSortCompareFn = value;
        } else {
          this._alphaTestSortCompareFn = _RenderingGroup.PainterSortCompare;
        }
        this._renderAlphaTest = this._renderAlphaTestSorted;
      }
      /**
       * Set the transparent sort comparison function.
       * If null the sub meshes will be render in the order they were created
       */
      set transparentSortCompareFn(value) {
        if (value) {
          this._transparentSortCompareFn = value;
        } else {
          this._transparentSortCompareFn = _RenderingGroup.defaultTransparentSortCompare;
        }
        this._renderTransparent = this._renderTransparentSorted;
      }
      /**
       * Creates a new rendering group.
       * @param index The rendering group index
       * @param scene
       * @param opaqueSortCompareFn The opaque sort comparison function. If null no order is applied
       * @param alphaTestSortCompareFn The alpha test sort comparison function. If null no order is applied
       * @param transparentSortCompareFn The transparent sort comparison function. If null back to front + alpha index sort is applied
       */
      constructor(index, scene, opaqueSortCompareFn = null, alphaTestSortCompareFn = null, transparentSortCompareFn = null) {
        this.index = index;
        this._opaqueSubMeshes = new SmartArray(256);
        this._transparentSubMeshes = new SmartArray(256);
        this._alphaTestSubMeshes = new SmartArray(256);
        this._depthOnlySubMeshes = new SmartArray(256);
        this._particleSystems = new SmartArray(256);
        this._spriteManagers = new SmartArray(256);
        this._empty = true;
        this._edgesRenderers = new SmartArrayNoDuplicate(16);
        this._scene = scene;
        this.opaqueSortCompareFn = opaqueSortCompareFn;
        this.alphaTestSortCompareFn = alphaTestSortCompareFn;
        this.transparentSortCompareFn = transparentSortCompareFn;
      }
      /**
       * Render all the sub meshes contained in the group.
       * @param customRenderFunction Used to override the default render behaviour of the group.
       * @param renderSprites
       * @param renderParticles
       * @param activeMeshes
       */
      render(customRenderFunction, renderSprites, renderParticles, activeMeshes) {
        if (customRenderFunction) {
          customRenderFunction(this._opaqueSubMeshes, this._alphaTestSubMeshes, this._transparentSubMeshes, this._depthOnlySubMeshes);
          return;
        }
        const engine = this._scene.getEngine();
        if (this._depthOnlySubMeshes.length !== 0) {
          engine.setColorWrite(false);
          this._renderAlphaTest(this._depthOnlySubMeshes);
          engine.setColorWrite(true);
        }
        if (this._opaqueSubMeshes.length !== 0) {
          this._renderOpaque(this._opaqueSubMeshes);
        }
        if (this._alphaTestSubMeshes.length !== 0) {
          this._renderAlphaTest(this._alphaTestSubMeshes);
        }
        const stencilState = engine.getStencilBuffer();
        engine.setStencilBuffer(false);
        if (renderSprites) {
          this._renderSprites();
        }
        if (renderParticles) {
          this._renderParticles(activeMeshes);
        }
        if (this.onBeforeTransparentRendering) {
          this.onBeforeTransparentRendering();
        }
        if (this._transparentSubMeshes.length !== 0 || this._scene.useOrderIndependentTransparency) {
          engine.setStencilBuffer(stencilState);
          if (this._scene.useOrderIndependentTransparency) {
            const excludedMeshes = this._scene.depthPeelingRenderer.render(this._transparentSubMeshes);
            if (excludedMeshes.length) {
              this._renderTransparent(excludedMeshes);
            }
          } else {
            this._renderTransparent(this._transparentSubMeshes);
          }
          engine.setAlphaMode(0);
        }
        engine.setStencilBuffer(false);
        if (this._edgesRenderers.length) {
          for (let edgesRendererIndex = 0; edgesRendererIndex < this._edgesRenderers.length; edgesRendererIndex++) {
            this._edgesRenderers.data[edgesRendererIndex].render();
          }
          engine.setAlphaMode(0);
        }
        engine.setStencilBuffer(stencilState);
      }
      /**
       * Renders the opaque submeshes in the order from the opaqueSortCompareFn.
       * @param subMeshes The submeshes to render
       */
      _renderOpaqueSorted(subMeshes) {
        _RenderingGroup._RenderSorted(subMeshes, this._opaqueSortCompareFn, this._scene.activeCamera, false);
      }
      /**
       * Renders the opaque submeshes in the order from the alphatestSortCompareFn.
       * @param subMeshes The submeshes to render
       */
      _renderAlphaTestSorted(subMeshes) {
        _RenderingGroup._RenderSorted(subMeshes, this._alphaTestSortCompareFn, this._scene.activeCamera, false);
      }
      /**
       * Renders the opaque submeshes in the order from the transparentSortCompareFn.
       * @param subMeshes The submeshes to render
       */
      _renderTransparentSorted(subMeshes) {
        _RenderingGroup._RenderSorted(subMeshes, this._transparentSortCompareFn, this._scene.activeCamera, true);
      }
      /**
       * Renders the submeshes in a specified order.
       * @param subMeshes The submeshes to sort before render
       * @param sortCompareFn The comparison function use to sort
       * @param camera The camera position use to preprocess the submeshes to help sorting
       * @param transparent Specifies to activate blending if true
       */
      static _RenderSorted(subMeshes, sortCompareFn, camera, transparent) {
        let subIndex = 0;
        let subMesh;
        const cameraPosition = camera ? camera.globalPosition : _RenderingGroup._ZeroVector;
        if (transparent) {
          for (; subIndex < subMeshes.length; subIndex++) {
            subMesh = subMeshes.data[subIndex];
            subMesh._alphaIndex = subMesh.getMesh().alphaIndex;
            subMesh._distanceToCamera = Vector3.Distance(subMesh.getBoundingInfo().boundingSphere.centerWorld, cameraPosition);
          }
        }
        const sortedArray = subMeshes.length === subMeshes.data.length ? subMeshes.data : subMeshes.data.slice(0, subMeshes.length);
        if (sortCompareFn) {
          sortedArray.sort(sortCompareFn);
        }
        const scene = sortedArray[0].getMesh().getScene();
        for (subIndex = 0; subIndex < sortedArray.length; subIndex++) {
          subMesh = sortedArray[subIndex];
          if (scene._activeMeshesFrozenButKeepClipping && !subMesh.isInFrustum(scene._frustumPlanes)) {
            continue;
          }
          if (transparent) {
            const material = subMesh.getMaterial();
            if (material && material.needDepthPrePass) {
              const engine = material.getScene().getEngine();
              engine.setColorWrite(false);
              engine.setAlphaMode(0);
              subMesh.render(false);
              engine.setColorWrite(true);
            }
          }
          subMesh.render(transparent);
        }
      }
      /**
       * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
       * are rendered back to front if in the same alpha index.
       *
       * @param a The first submesh
       * @param b The second submesh
       * @returns The result of the comparison
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static defaultTransparentSortCompare(a, b) {
        if (a._alphaIndex > b._alphaIndex) {
          return 1;
        }
        if (a._alphaIndex < b._alphaIndex) {
          return -1;
        }
        return _RenderingGroup.backToFrontSortCompare(a, b);
      }
      /**
       * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
       * are rendered back to front.
       *
       * @param a The first submesh
       * @param b The second submesh
       * @returns The result of the comparison
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static backToFrontSortCompare(a, b) {
        if (a._distanceToCamera < b._distanceToCamera) {
          return 1;
        }
        if (a._distanceToCamera > b._distanceToCamera) {
          return -1;
        }
        return 0;
      }
      /**
       * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
       * are rendered front to back (prevent overdraw).
       *
       * @param a The first submesh
       * @param b The second submesh
       * @returns The result of the comparison
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static frontToBackSortCompare(a, b) {
        if (a._distanceToCamera < b._distanceToCamera) {
          return -1;
        }
        if (a._distanceToCamera > b._distanceToCamera) {
          return 1;
        }
        return 0;
      }
      /**
       * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
       * are grouped by material then geometry.
       *
       * @param a The first submesh
       * @param b The second submesh
       * @returns The result of the comparison
       */
      static PainterSortCompare(a, b) {
        const meshA = a.getMesh();
        const meshB = b.getMesh();
        if (meshA.material && meshB.material) {
          return meshA.material.uniqueId - meshB.material.uniqueId;
        }
        return meshA.uniqueId - meshB.uniqueId;
      }
      /**
       * Resets the different lists of submeshes to prepare a new frame.
       */
      prepare() {
        this._opaqueSubMeshes.reset();
        this._transparentSubMeshes.reset();
        this._alphaTestSubMeshes.reset();
        this._depthOnlySubMeshes.reset();
        this._particleSystems.reset();
        this.prepareSprites();
        this._edgesRenderers.reset();
        this._empty = true;
      }
      /**
       * Resets the different lists of sprites to prepare a new frame.
       */
      prepareSprites() {
        this._spriteManagers.reset();
      }
      dispose() {
        this._opaqueSubMeshes.dispose();
        this._transparentSubMeshes.dispose();
        this._alphaTestSubMeshes.dispose();
        this._depthOnlySubMeshes.dispose();
        this._particleSystems.dispose();
        this._spriteManagers.dispose();
        this._edgesRenderers.dispose();
      }
      /**
       * Inserts the submesh in its correct queue depending on its material.
       * @param subMesh The submesh to dispatch
       * @param [mesh] Optional reference to the submeshes's mesh. Provide if you have an exiting reference to improve performance.
       * @param [material] Optional reference to the submeshes's material. Provide if you have an exiting reference to improve performance.
       */
      dispatch(subMesh, mesh, material) {
        if (mesh === void 0) {
          mesh = subMesh.getMesh();
        }
        if (material === void 0) {
          material = subMesh.getMaterial();
        }
        if (material === null || material === void 0) {
          return;
        }
        if (material.needAlphaBlendingForMesh(mesh)) {
          this._transparentSubMeshes.push(subMesh);
        } else if (material.needAlphaTesting()) {
          if (material.needDepthPrePass) {
            this._depthOnlySubMeshes.push(subMesh);
          }
          this._alphaTestSubMeshes.push(subMesh);
        } else {
          if (material.needDepthPrePass) {
            this._depthOnlySubMeshes.push(subMesh);
          }
          this._opaqueSubMeshes.push(subMesh);
        }
        mesh._renderingGroup = this;
        if (mesh._edgesRenderer && mesh._edgesRenderer.isEnabled) {
          this._edgesRenderers.pushNoDuplicate(mesh._edgesRenderer);
        }
        this._empty = false;
      }
      dispatchSprites(spriteManager) {
        this._spriteManagers.push(spriteManager);
        this._empty = false;
      }
      dispatchParticles(particleSystem) {
        this._particleSystems.push(particleSystem);
        this._empty = false;
      }
      _renderParticles(activeMeshes) {
        if (this._particleSystems.length === 0) {
          return;
        }
        const activeCamera = this._scene.activeCamera;
        this._scene.onBeforeParticlesRenderingObservable.notifyObservers(this._scene);
        for (let particleIndex = 0; particleIndex < this._particleSystems.length; particleIndex++) {
          const particleSystem = this._particleSystems.data[particleIndex];
          if ((activeCamera && activeCamera.layerMask & particleSystem.layerMask) === 0) {
            continue;
          }
          const emitter = particleSystem.emitter;
          if (!emitter.position || !activeMeshes || activeMeshes.indexOf(emitter) !== -1) {
            this._scene._activeParticles.addCount(particleSystem.render(), false);
          }
        }
        this._scene.onAfterParticlesRenderingObservable.notifyObservers(this._scene);
      }
      _renderSprites() {
        if (!this._scene.spritesEnabled || this._spriteManagers.length === 0) {
          return;
        }
        const activeCamera = this._scene.activeCamera;
        this._scene.onBeforeSpritesRenderingObservable.notifyObservers(this._scene);
        for (let id = 0; id < this._spriteManagers.length; id++) {
          const spriteManager = this._spriteManagers.data[id];
          if ((activeCamera && activeCamera.layerMask & spriteManager.layerMask) !== 0) {
            spriteManager.render();
          }
        }
        this._scene.onAfterSpritesRenderingObservable.notifyObservers(this._scene);
      }
    };
    RenderingGroup._ZeroVector = Vector3.Zero();
  }
});

// node_modules/@babylonjs/core/Rendering/renderingManager.js
var RenderingGroupInfo, RenderingManager;
var init_renderingManager = __esm({
  "node_modules/@babylonjs/core/Rendering/renderingManager.js"() {
    init_renderingGroup();
    RenderingGroupInfo = class {
    };
    RenderingManager = class _RenderingManager {
      /**
       * Gets or sets a boolean indicating that the manager will not reset between frames.
       * This means that if a mesh becomes invisible or transparent it will not be visible until this boolean is set to false again.
       * By default, the rendering manager will dispatch all active meshes per frame (moving them to the transparent, opaque or alpha testing lists).
       * By turning this property on, you will accelerate the rendering by keeping all these lists unchanged between frames.
       */
      get maintainStateBetweenFrames() {
        return this._maintainStateBetweenFrames;
      }
      set maintainStateBetweenFrames(value) {
        if (value === this._maintainStateBetweenFrames) {
          return;
        }
        this._maintainStateBetweenFrames = value;
        if (!this._maintainStateBetweenFrames) {
          this.restoreDispachedFlags();
        }
      }
      /**
       * Restore wasDispatched flags on the lists of elements to render.
       */
      restoreDispachedFlags() {
        for (const mesh of this._scene.meshes) {
          if (mesh.subMeshes) {
            for (const subMesh of mesh.subMeshes) {
              subMesh._wasDispatched = false;
            }
          }
        }
        if (this._scene.spriteManagers) {
          for (const spriteManager of this._scene.spriteManagers) {
            spriteManager._wasDispatched = false;
          }
        }
        for (const particleSystem of this._scene.particleSystems) {
          particleSystem._wasDispatched = false;
        }
      }
      /**
       * Instantiates a new rendering group for a particular scene
       * @param scene Defines the scene the groups belongs to
       */
      constructor(scene) {
        this._useSceneAutoClearSetup = false;
        this._renderingGroups = new Array();
        this._autoClearDepthStencil = {};
        this._customOpaqueSortCompareFn = {};
        this._customAlphaTestSortCompareFn = {};
        this._customTransparentSortCompareFn = {};
        this._renderingGroupInfo = new RenderingGroupInfo();
        this._maintainStateBetweenFrames = false;
        this._scene = scene;
        for (let i = _RenderingManager.MIN_RENDERINGGROUPS; i < _RenderingManager.MAX_RENDERINGGROUPS; i++) {
          this._autoClearDepthStencil[i] = { autoClear: true, depth: true, stencil: true };
        }
      }
      /**
       * @returns the rendering group with the specified id.
       * @param id the id of the rendering group (0 by default)
       */
      getRenderingGroup(id) {
        const renderingGroupId = id || 0;
        this._prepareRenderingGroup(renderingGroupId);
        return this._renderingGroups[renderingGroupId];
      }
      _clearDepthStencilBuffer(depth = true, stencil = true) {
        if (this._depthStencilBufferAlreadyCleaned) {
          return;
        }
        this._scene.getEngine().clear(null, false, depth, stencil);
        this._depthStencilBufferAlreadyCleaned = true;
      }
      /**
       * Renders the entire managed groups. This is used by the scene or the different render targets.
       * @internal
       */
      render(customRenderFunction, activeMeshes, renderParticles, renderSprites) {
        const info = this._renderingGroupInfo;
        info.scene = this._scene;
        info.camera = this._scene.activeCamera;
        if (this._scene.spriteManagers && renderSprites) {
          for (let index = 0; index < this._scene.spriteManagers.length; index++) {
            const manager = this._scene.spriteManagers[index];
            this.dispatchSprites(manager);
          }
        }
        for (let index = _RenderingManager.MIN_RENDERINGGROUPS; index < _RenderingManager.MAX_RENDERINGGROUPS; index++) {
          this._depthStencilBufferAlreadyCleaned = index === _RenderingManager.MIN_RENDERINGGROUPS;
          const renderingGroup = this._renderingGroups[index];
          if (!renderingGroup || renderingGroup._empty) {
            continue;
          }
          const renderingGroupMask = 1 << index;
          info.renderingGroupId = index;
          this._scene.onBeforeRenderingGroupObservable.notifyObservers(info, renderingGroupMask);
          if (_RenderingManager.AUTOCLEAR) {
            const autoClear = this._useSceneAutoClearSetup ? this._scene.getAutoClearDepthStencilSetup(index) : this._autoClearDepthStencil[index];
            if (autoClear && autoClear.autoClear) {
              this._clearDepthStencilBuffer(autoClear.depth, autoClear.stencil);
            }
          }
          for (const step of this._scene._beforeRenderingGroupDrawStage) {
            step.action(index);
          }
          renderingGroup.render(customRenderFunction, renderSprites, renderParticles, activeMeshes);
          for (const step of this._scene._afterRenderingGroupDrawStage) {
            step.action(index);
          }
          this._scene.onAfterRenderingGroupObservable.notifyObservers(info, renderingGroupMask);
        }
      }
      /**
       * Resets the different information of the group to prepare a new frame
       * @internal
       */
      reset() {
        if (this.maintainStateBetweenFrames) {
          return;
        }
        for (let index = _RenderingManager.MIN_RENDERINGGROUPS; index < _RenderingManager.MAX_RENDERINGGROUPS; index++) {
          const renderingGroup = this._renderingGroups[index];
          if (renderingGroup) {
            renderingGroup.prepare();
          }
        }
      }
      /**
       * Resets the sprites information of the group to prepare a new frame
       * @internal
       */
      resetSprites() {
        if (this.maintainStateBetweenFrames) {
          return;
        }
        for (let index = _RenderingManager.MIN_RENDERINGGROUPS; index < _RenderingManager.MAX_RENDERINGGROUPS; index++) {
          const renderingGroup = this._renderingGroups[index];
          if (renderingGroup) {
            renderingGroup.prepareSprites();
          }
        }
      }
      /**
       * Dispose and release the group and its associated resources.
       * @internal
       */
      dispose() {
        this.freeRenderingGroups();
        this._renderingGroups.length = 0;
        this._renderingGroupInfo = null;
      }
      /**
       * Clear the info related to rendering groups preventing retention points during dispose.
       */
      freeRenderingGroups() {
        for (let index = _RenderingManager.MIN_RENDERINGGROUPS; index < _RenderingManager.MAX_RENDERINGGROUPS; index++) {
          const renderingGroup = this._renderingGroups[index];
          if (renderingGroup) {
            renderingGroup.dispose();
          }
        }
      }
      _prepareRenderingGroup(renderingGroupId) {
        if (this._renderingGroups[renderingGroupId] === void 0) {
          this._renderingGroups[renderingGroupId] = new RenderingGroup(renderingGroupId, this._scene, this._customOpaqueSortCompareFn[renderingGroupId], this._customAlphaTestSortCompareFn[renderingGroupId], this._customTransparentSortCompareFn[renderingGroupId]);
        }
      }
      /**
       * Add a sprite manager to the rendering manager in order to render it this frame.
       * @param spriteManager Define the sprite manager to render
       */
      dispatchSprites(spriteManager) {
        if (this.maintainStateBetweenFrames && spriteManager._wasDispatched) {
          return;
        }
        spriteManager._wasDispatched = true;
        this.getRenderingGroup(spriteManager.renderingGroupId).dispatchSprites(spriteManager);
      }
      /**
       * Add a particle system to the rendering manager in order to render it this frame.
       * @param particleSystem Define the particle system to render
       */
      dispatchParticles(particleSystem) {
        if (this.maintainStateBetweenFrames && particleSystem._wasDispatched) {
          return;
        }
        particleSystem._wasDispatched = true;
        this.getRenderingGroup(particleSystem.renderingGroupId).dispatchParticles(particleSystem);
      }
      /**
       * Add a submesh to the manager in order to render it this frame
       * @param subMesh The submesh to dispatch
       * @param mesh Optional reference to the submeshes's mesh. Provide if you have an exiting reference to improve performance.
       * @param material Optional reference to the submeshes's material. Provide if you have an exiting reference to improve performance.
       */
      dispatch(subMesh, mesh, material) {
        if (mesh === void 0) {
          mesh = subMesh.getMesh();
        }
        if (this.maintainStateBetweenFrames && subMesh._wasDispatched) {
          return;
        }
        subMesh._wasDispatched = true;
        this.getRenderingGroup(mesh.renderingGroupId).dispatch(subMesh, mesh, material);
      }
      /**
       * Overrides the default sort function applied in the rendering group to prepare the meshes.
       * This allowed control for front to back rendering or reversely depending of the special needs.
       *
       * @param renderingGroupId The rendering group id corresponding to its index
       * @param opaqueSortCompareFn The opaque queue comparison function use to sort.
       * @param alphaTestSortCompareFn The alpha test queue comparison function use to sort.
       * @param transparentSortCompareFn The transparent queue comparison function use to sort.
       */
      setRenderingOrder(renderingGroupId, opaqueSortCompareFn = null, alphaTestSortCompareFn = null, transparentSortCompareFn = null) {
        this._customOpaqueSortCompareFn[renderingGroupId] = opaqueSortCompareFn;
        this._customAlphaTestSortCompareFn[renderingGroupId] = alphaTestSortCompareFn;
        this._customTransparentSortCompareFn[renderingGroupId] = transparentSortCompareFn;
        if (this._renderingGroups[renderingGroupId]) {
          const group = this._renderingGroups[renderingGroupId];
          group.opaqueSortCompareFn = this._customOpaqueSortCompareFn[renderingGroupId];
          group.alphaTestSortCompareFn = this._customAlphaTestSortCompareFn[renderingGroupId];
          group.transparentSortCompareFn = this._customTransparentSortCompareFn[renderingGroupId];
        }
      }
      /**
       * Specifies whether or not the stencil and depth buffer are cleared between two rendering groups.
       *
       * @param renderingGroupId The rendering group id corresponding to its index
       * @param autoClearDepthStencil Automatically clears depth and stencil between groups if true.
       * @param depth Automatically clears depth between groups if true and autoClear is true.
       * @param stencil Automatically clears stencil between groups if true and autoClear is true.
       */
      setRenderingAutoClearDepthStencil(renderingGroupId, autoClearDepthStencil, depth = true, stencil = true) {
        this._autoClearDepthStencil[renderingGroupId] = {
          autoClear: autoClearDepthStencil,
          depth,
          stencil
        };
      }
      /**
       * Gets the current auto clear configuration for one rendering group of the rendering
       * manager.
       * @param index the rendering group index to get the information for
       * @returns The auto clear setup for the requested rendering group
       */
      getAutoClearDepthStencilSetup(index) {
        return this._autoClearDepthStencil[index];
      }
    };
    RenderingManager.MAX_RENDERINGGROUPS = 4;
    RenderingManager.MIN_RENDERINGGROUPS = 0;
    RenderingManager.AUTOCLEAR = true;
  }
});

// node_modules/@babylonjs/core/sceneComponent.js
var SceneComponentConstants, Stage;
var init_sceneComponent = __esm({
  "node_modules/@babylonjs/core/sceneComponent.js"() {
    SceneComponentConstants = class {
    };
    SceneComponentConstants.NAME_EFFECTLAYER = "EffectLayer";
    SceneComponentConstants.NAME_LAYER = "Layer";
    SceneComponentConstants.NAME_LENSFLARESYSTEM = "LensFlareSystem";
    SceneComponentConstants.NAME_BOUNDINGBOXRENDERER = "BoundingBoxRenderer";
    SceneComponentConstants.NAME_PARTICLESYSTEM = "ParticleSystem";
    SceneComponentConstants.NAME_GAMEPAD = "Gamepad";
    SceneComponentConstants.NAME_SIMPLIFICATIONQUEUE = "SimplificationQueue";
    SceneComponentConstants.NAME_GEOMETRYBUFFERRENDERER = "GeometryBufferRenderer";
    SceneComponentConstants.NAME_PREPASSRENDERER = "PrePassRenderer";
    SceneComponentConstants.NAME_DEPTHRENDERER = "DepthRenderer";
    SceneComponentConstants.NAME_DEPTHPEELINGRENDERER = "DepthPeelingRenderer";
    SceneComponentConstants.NAME_POSTPROCESSRENDERPIPELINEMANAGER = "PostProcessRenderPipelineManager";
    SceneComponentConstants.NAME_SPRITE = "Sprite";
    SceneComponentConstants.NAME_SUBSURFACE = "SubSurface";
    SceneComponentConstants.NAME_OUTLINERENDERER = "Outline";
    SceneComponentConstants.NAME_PROCEDURALTEXTURE = "ProceduralTexture";
    SceneComponentConstants.NAME_SHADOWGENERATOR = "ShadowGenerator";
    SceneComponentConstants.NAME_OCTREE = "Octree";
    SceneComponentConstants.NAME_PHYSICSENGINE = "PhysicsEngine";
    SceneComponentConstants.NAME_AUDIO = "Audio";
    SceneComponentConstants.NAME_FLUIDRENDERER = "FluidRenderer";
    SceneComponentConstants.STEP_ISREADYFORMESH_EFFECTLAYER = 0;
    SceneComponentConstants.STEP_BEFOREEVALUATEACTIVEMESH_BOUNDINGBOXRENDERER = 0;
    SceneComponentConstants.STEP_EVALUATESUBMESH_BOUNDINGBOXRENDERER = 0;
    SceneComponentConstants.STEP_PREACTIVEMESH_BOUNDINGBOXRENDERER = 0;
    SceneComponentConstants.STEP_CAMERADRAWRENDERTARGET_EFFECTLAYER = 1;
    SceneComponentConstants.STEP_BEFORECAMERADRAW_PREPASS = 0;
    SceneComponentConstants.STEP_BEFORECAMERADRAW_EFFECTLAYER = 1;
    SceneComponentConstants.STEP_BEFORECAMERADRAW_LAYER = 2;
    SceneComponentConstants.STEP_BEFORERENDERTARGETDRAW_PREPASS = 0;
    SceneComponentConstants.STEP_BEFORERENDERTARGETDRAW_LAYER = 1;
    SceneComponentConstants.STEP_BEFORERENDERINGMESH_PREPASS = 0;
    SceneComponentConstants.STEP_BEFORERENDERINGMESH_OUTLINE = 1;
    SceneComponentConstants.STEP_AFTERRENDERINGMESH_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERRENDERINGMESH_OUTLINE = 1;
    SceneComponentConstants.STEP_AFTERRENDERINGGROUPDRAW_EFFECTLAYER_DRAW = 0;
    SceneComponentConstants.STEP_AFTERRENDERINGGROUPDRAW_BOUNDINGBOXRENDERER = 1;
    SceneComponentConstants.STEP_BEFORECAMERAUPDATE_SIMPLIFICATIONQUEUE = 0;
    SceneComponentConstants.STEP_BEFORECAMERAUPDATE_GAMEPAD = 1;
    SceneComponentConstants.STEP_BEFORECLEAR_PROCEDURALTEXTURE = 0;
    SceneComponentConstants.STEP_BEFORECLEAR_PREPASS = 1;
    SceneComponentConstants.STEP_BEFORERENDERTARGETCLEAR_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERRENDERTARGETDRAW_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERRENDERTARGETDRAW_LAYER = 1;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_EFFECTLAYER = 1;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_LENSFLARESYSTEM = 2;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_EFFECTLAYER_DRAW = 3;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_LAYER = 4;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_FLUIDRENDERER = 5;
    SceneComponentConstants.STEP_AFTERCAMERAPOSTPROCESS_LAYER = 0;
    SceneComponentConstants.STEP_AFTERRENDERTARGETPOSTPROCESS_LAYER = 0;
    SceneComponentConstants.STEP_AFTERRENDER_AUDIO = 0;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_DEPTHRENDERER = 0;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_GEOMETRYBUFFERRENDERER = 1;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_SHADOWGENERATOR = 2;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_POSTPROCESSRENDERPIPELINEMANAGER = 3;
    SceneComponentConstants.STEP_GATHERACTIVECAMERARENDERTARGETS_DEPTHRENDERER = 0;
    SceneComponentConstants.STEP_GATHERACTIVECAMERARENDERTARGETS_FLUIDRENDERER = 1;
    SceneComponentConstants.STEP_POINTERMOVE_SPRITE = 0;
    SceneComponentConstants.STEP_POINTERDOWN_SPRITE = 0;
    SceneComponentConstants.STEP_POINTERUP_SPRITE = 0;
    Stage = class _Stage extends Array {
      /**
       * Hide ctor from the rest of the world.
       * @param items The items to add.
       */
      constructor(items) {
        super(...items);
      }
      /**
       * Creates a new Stage.
       * @returns A new instance of a Stage
       */
      static Create() {
        return Object.create(_Stage.prototype);
      }
      /**
       * Registers a step in an ordered way in the targeted stage.
       * @param index Defines the position to register the step in
       * @param component Defines the component attached to the step
       * @param action Defines the action to launch during the step
       */
      registerStep(index, component, action) {
        let i = 0;
        let maxIndex = Number.MAX_VALUE;
        for (; i < this.length; i++) {
          const step = this[i];
          maxIndex = step.index;
          if (index < maxIndex) {
            break;
          }
        }
        this.splice(i, 0, { index, component, action: action.bind(component) });
      }
      /**
       * Clears all the steps from the stage.
       */
      clear() {
        this.length = 0;
      }
    };
  }
});

// node_modules/@babylonjs/core/Events/pointerEvents.js
var PointerEventTypes, PointerInfoBase, PointerInfoPre, PointerInfo;
var init_pointerEvents = __esm({
  "node_modules/@babylonjs/core/Events/pointerEvents.js"() {
    init_math_vector();
    PointerEventTypes = class {
    };
    PointerEventTypes.POINTERDOWN = 1;
    PointerEventTypes.POINTERUP = 2;
    PointerEventTypes.POINTERMOVE = 4;
    PointerEventTypes.POINTERWHEEL = 8;
    PointerEventTypes.POINTERPICK = 16;
    PointerEventTypes.POINTERTAP = 32;
    PointerEventTypes.POINTERDOUBLETAP = 64;
    PointerInfoBase = class {
      /**
       * Instantiates the base class of pointers info.
       * @param type Defines the type of event (PointerEventTypes)
       * @param event Defines the related dom event
       */
      constructor(type, event) {
        this.type = type;
        this.event = event;
      }
    };
    PointerInfoPre = class extends PointerInfoBase {
      /**
       * Instantiates a PointerInfoPre to store pointer related info to the onPrePointerObservable event.
       * @param type Defines the type of event (PointerEventTypes)
       * @param event Defines the related dom event
       * @param localX Defines the local x coordinates of the pointer when the event occured
       * @param localY Defines the local y coordinates of the pointer when the event occured
       */
      constructor(type, event, localX, localY) {
        super(type, event);
        this.ray = null;
        this.originalPickingInfo = null;
        this.skipOnPointerObservable = false;
        this.localPosition = new Vector2(localX, localY);
      }
    };
    PointerInfo = class extends PointerInfoBase {
      /**
       * Defines the picking info associated with this PointerInfo object (if applicable)
       */
      get pickInfo() {
        if (!this._pickInfo) {
          this._generatePickInfo();
        }
        return this._pickInfo;
      }
      /**
       * Instantiates a PointerInfo to store pointer related info to the onPointerObservable event.
       * @param type Defines the type of event (PointerEventTypes)
       * @param event Defines the related dom event
       * @param pickInfo Defines the picking info associated to the info (if any)
       * @param inputManager Defines the InputManager to use if there is no pickInfo
       */
      constructor(type, event, pickInfo, inputManager = null) {
        super(type, event);
        this._pickInfo = pickInfo;
        this._inputManager = inputManager;
      }
      /**
       * Generates the picking info if needed
       */
      /** @internal */
      _generatePickInfo() {
        if (this._inputManager) {
          this._pickInfo = this._inputManager._pickMove(this.event);
          this._inputManager._setRayOnPointerInfo(this._pickInfo, this.event);
          this._inputManager = null;
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Actions/abstractActionManager.js
var AbstractActionManager;
var init_abstractActionManager = __esm({
  "node_modules/@babylonjs/core/Actions/abstractActionManager.js"() {
    AbstractActionManager = class _AbstractActionManager {
      constructor() {
        this.hoverCursor = "";
        this.actions = [];
        this.isRecursive = false;
      }
      /**
       * Does exist one action manager with at least one trigger
       **/
      static get HasTriggers() {
        for (const t in _AbstractActionManager.Triggers) {
          if (Object.prototype.hasOwnProperty.call(_AbstractActionManager.Triggers, t)) {
            return true;
          }
        }
        return false;
      }
      /**
       * Does exist one action manager with at least one pick trigger
       **/
      static get HasPickTriggers() {
        for (const t in _AbstractActionManager.Triggers) {
          if (Object.prototype.hasOwnProperty.call(_AbstractActionManager.Triggers, t)) {
            const tAsInt = parseInt(t);
            if (tAsInt >= 1 && tAsInt <= 7) {
              return true;
            }
          }
        }
        return false;
      }
      /**
       * Does exist one action manager that handles actions of a given trigger
       * @param trigger defines the trigger to be tested
       * @returns a boolean indicating whether the trigger is handled by at least one action manager
       **/
      static HasSpecificTrigger(trigger) {
        for (const t in _AbstractActionManager.Triggers) {
          if (Object.prototype.hasOwnProperty.call(_AbstractActionManager.Triggers, t)) {
            const tAsInt = parseInt(t);
            if (tAsInt === trigger) {
              return true;
            }
          }
        }
        return false;
      }
    };
    AbstractActionManager.Triggers = {};
  }
});

// node_modules/@babylonjs/core/Events/keyboardEvents.js
var KeyboardEventTypes, KeyboardInfo, KeyboardInfoPre;
var init_keyboardEvents = __esm({
  "node_modules/@babylonjs/core/Events/keyboardEvents.js"() {
    KeyboardEventTypes = class {
    };
    KeyboardEventTypes.KEYDOWN = 1;
    KeyboardEventTypes.KEYUP = 2;
    KeyboardInfo = class {
      /**
       * Instantiates a new keyboard info.
       * This class is used to store keyboard related info for the onKeyboardObservable event.
       * @param type Defines the type of event (KeyboardEventTypes)
       * @param event Defines the related dom event
       */
      constructor(type, event) {
        this.type = type;
        this.event = event;
      }
    };
    KeyboardInfoPre = class extends KeyboardInfo {
      /**
       * Defines whether the engine should skip the next onKeyboardObservable associated to this pre.
       * @deprecated use skipOnKeyboardObservable property instead
       */
      get skipOnPointerObservable() {
        return this.skipOnKeyboardObservable;
      }
      set skipOnPointerObservable(value) {
        this.skipOnKeyboardObservable = value;
      }
      /**
       * Instantiates a new keyboard pre info.
       * This class is used to store keyboard related info for the onPreKeyboardObservable event.
       * @param type Defines the type of event (KeyboardEventTypes)
       * @param event Defines the related dom event
       */
      constructor(type, event) {
        super(type, event);
        this.type = type;
        this.event = event;
        this.skipOnKeyboardObservable = false;
      }
    };
  }
});

// node_modules/@babylonjs/core/DeviceInput/InputDevices/deviceEnums.js
var DeviceType, PointerInput, NativePointerInput, DualShockInput, DualSenseInput, XboxInput, SwitchInput;
var init_deviceEnums = __esm({
  "node_modules/@babylonjs/core/DeviceInput/InputDevices/deviceEnums.js"() {
    (function(DeviceType2) {
      DeviceType2[DeviceType2["Generic"] = 0] = "Generic";
      DeviceType2[DeviceType2["Keyboard"] = 1] = "Keyboard";
      DeviceType2[DeviceType2["Mouse"] = 2] = "Mouse";
      DeviceType2[DeviceType2["Touch"] = 3] = "Touch";
      DeviceType2[DeviceType2["DualShock"] = 4] = "DualShock";
      DeviceType2[DeviceType2["Xbox"] = 5] = "Xbox";
      DeviceType2[DeviceType2["Switch"] = 6] = "Switch";
      DeviceType2[DeviceType2["DualSense"] = 7] = "DualSense";
    })(DeviceType || (DeviceType = {}));
    (function(PointerInput2) {
      PointerInput2[PointerInput2["Horizontal"] = 0] = "Horizontal";
      PointerInput2[PointerInput2["Vertical"] = 1] = "Vertical";
      PointerInput2[PointerInput2["LeftClick"] = 2] = "LeftClick";
      PointerInput2[PointerInput2["MiddleClick"] = 3] = "MiddleClick";
      PointerInput2[PointerInput2["RightClick"] = 4] = "RightClick";
      PointerInput2[PointerInput2["BrowserBack"] = 5] = "BrowserBack";
      PointerInput2[PointerInput2["BrowserForward"] = 6] = "BrowserForward";
      PointerInput2[PointerInput2["MouseWheelX"] = 7] = "MouseWheelX";
      PointerInput2[PointerInput2["MouseWheelY"] = 8] = "MouseWheelY";
      PointerInput2[PointerInput2["MouseWheelZ"] = 9] = "MouseWheelZ";
      PointerInput2[PointerInput2["Move"] = 12] = "Move";
    })(PointerInput || (PointerInput = {}));
    (function(NativePointerInput2) {
      NativePointerInput2[NativePointerInput2["Horizontal"] = 0] = "Horizontal";
      NativePointerInput2[NativePointerInput2["Vertical"] = 1] = "Vertical";
      NativePointerInput2[NativePointerInput2["LeftClick"] = 2] = "LeftClick";
      NativePointerInput2[NativePointerInput2["MiddleClick"] = 3] = "MiddleClick";
      NativePointerInput2[NativePointerInput2["RightClick"] = 4] = "RightClick";
      NativePointerInput2[NativePointerInput2["BrowserBack"] = 5] = "BrowserBack";
      NativePointerInput2[NativePointerInput2["BrowserForward"] = 6] = "BrowserForward";
      NativePointerInput2[NativePointerInput2["MouseWheelX"] = 7] = "MouseWheelX";
      NativePointerInput2[NativePointerInput2["MouseWheelY"] = 8] = "MouseWheelY";
      NativePointerInput2[NativePointerInput2["MouseWheelZ"] = 9] = "MouseWheelZ";
      NativePointerInput2[NativePointerInput2["DeltaHorizontal"] = 10] = "DeltaHorizontal";
      NativePointerInput2[NativePointerInput2["DeltaVertical"] = 11] = "DeltaVertical";
    })(NativePointerInput || (NativePointerInput = {}));
    (function(DualShockInput2) {
      DualShockInput2[DualShockInput2["Cross"] = 0] = "Cross";
      DualShockInput2[DualShockInput2["Circle"] = 1] = "Circle";
      DualShockInput2[DualShockInput2["Square"] = 2] = "Square";
      DualShockInput2[DualShockInput2["Triangle"] = 3] = "Triangle";
      DualShockInput2[DualShockInput2["L1"] = 4] = "L1";
      DualShockInput2[DualShockInput2["R1"] = 5] = "R1";
      DualShockInput2[DualShockInput2["L2"] = 6] = "L2";
      DualShockInput2[DualShockInput2["R2"] = 7] = "R2";
      DualShockInput2[DualShockInput2["Share"] = 8] = "Share";
      DualShockInput2[DualShockInput2["Options"] = 9] = "Options";
      DualShockInput2[DualShockInput2["L3"] = 10] = "L3";
      DualShockInput2[DualShockInput2["R3"] = 11] = "R3";
      DualShockInput2[DualShockInput2["DPadUp"] = 12] = "DPadUp";
      DualShockInput2[DualShockInput2["DPadDown"] = 13] = "DPadDown";
      DualShockInput2[DualShockInput2["DPadLeft"] = 14] = "DPadLeft";
      DualShockInput2[DualShockInput2["DPadRight"] = 15] = "DPadRight";
      DualShockInput2[DualShockInput2["Home"] = 16] = "Home";
      DualShockInput2[DualShockInput2["TouchPad"] = 17] = "TouchPad";
      DualShockInput2[DualShockInput2["LStickXAxis"] = 18] = "LStickXAxis";
      DualShockInput2[DualShockInput2["LStickYAxis"] = 19] = "LStickYAxis";
      DualShockInput2[DualShockInput2["RStickXAxis"] = 20] = "RStickXAxis";
      DualShockInput2[DualShockInput2["RStickYAxis"] = 21] = "RStickYAxis";
    })(DualShockInput || (DualShockInput = {}));
    (function(DualSenseInput2) {
      DualSenseInput2[DualSenseInput2["Cross"] = 0] = "Cross";
      DualSenseInput2[DualSenseInput2["Circle"] = 1] = "Circle";
      DualSenseInput2[DualSenseInput2["Square"] = 2] = "Square";
      DualSenseInput2[DualSenseInput2["Triangle"] = 3] = "Triangle";
      DualSenseInput2[DualSenseInput2["L1"] = 4] = "L1";
      DualSenseInput2[DualSenseInput2["R1"] = 5] = "R1";
      DualSenseInput2[DualSenseInput2["L2"] = 6] = "L2";
      DualSenseInput2[DualSenseInput2["R2"] = 7] = "R2";
      DualSenseInput2[DualSenseInput2["Create"] = 8] = "Create";
      DualSenseInput2[DualSenseInput2["Options"] = 9] = "Options";
      DualSenseInput2[DualSenseInput2["L3"] = 10] = "L3";
      DualSenseInput2[DualSenseInput2["R3"] = 11] = "R3";
      DualSenseInput2[DualSenseInput2["DPadUp"] = 12] = "DPadUp";
      DualSenseInput2[DualSenseInput2["DPadDown"] = 13] = "DPadDown";
      DualSenseInput2[DualSenseInput2["DPadLeft"] = 14] = "DPadLeft";
      DualSenseInput2[DualSenseInput2["DPadRight"] = 15] = "DPadRight";
      DualSenseInput2[DualSenseInput2["Home"] = 16] = "Home";
      DualSenseInput2[DualSenseInput2["TouchPad"] = 17] = "TouchPad";
      DualSenseInput2[DualSenseInput2["LStickXAxis"] = 18] = "LStickXAxis";
      DualSenseInput2[DualSenseInput2["LStickYAxis"] = 19] = "LStickYAxis";
      DualSenseInput2[DualSenseInput2["RStickXAxis"] = 20] = "RStickXAxis";
      DualSenseInput2[DualSenseInput2["RStickYAxis"] = 21] = "RStickYAxis";
    })(DualSenseInput || (DualSenseInput = {}));
    (function(XboxInput2) {
      XboxInput2[XboxInput2["A"] = 0] = "A";
      XboxInput2[XboxInput2["B"] = 1] = "B";
      XboxInput2[XboxInput2["X"] = 2] = "X";
      XboxInput2[XboxInput2["Y"] = 3] = "Y";
      XboxInput2[XboxInput2["LB"] = 4] = "LB";
      XboxInput2[XboxInput2["RB"] = 5] = "RB";
      XboxInput2[XboxInput2["LT"] = 6] = "LT";
      XboxInput2[XboxInput2["RT"] = 7] = "RT";
      XboxInput2[XboxInput2["Back"] = 8] = "Back";
      XboxInput2[XboxInput2["Start"] = 9] = "Start";
      XboxInput2[XboxInput2["LS"] = 10] = "LS";
      XboxInput2[XboxInput2["RS"] = 11] = "RS";
      XboxInput2[XboxInput2["DPadUp"] = 12] = "DPadUp";
      XboxInput2[XboxInput2["DPadDown"] = 13] = "DPadDown";
      XboxInput2[XboxInput2["DPadLeft"] = 14] = "DPadLeft";
      XboxInput2[XboxInput2["DPadRight"] = 15] = "DPadRight";
      XboxInput2[XboxInput2["Home"] = 16] = "Home";
      XboxInput2[XboxInput2["LStickXAxis"] = 17] = "LStickXAxis";
      XboxInput2[XboxInput2["LStickYAxis"] = 18] = "LStickYAxis";
      XboxInput2[XboxInput2["RStickXAxis"] = 19] = "RStickXAxis";
      XboxInput2[XboxInput2["RStickYAxis"] = 20] = "RStickYAxis";
    })(XboxInput || (XboxInput = {}));
    (function(SwitchInput2) {
      SwitchInput2[SwitchInput2["B"] = 0] = "B";
      SwitchInput2[SwitchInput2["A"] = 1] = "A";
      SwitchInput2[SwitchInput2["Y"] = 2] = "Y";
      SwitchInput2[SwitchInput2["X"] = 3] = "X";
      SwitchInput2[SwitchInput2["L"] = 4] = "L";
      SwitchInput2[SwitchInput2["R"] = 5] = "R";
      SwitchInput2[SwitchInput2["ZL"] = 6] = "ZL";
      SwitchInput2[SwitchInput2["ZR"] = 7] = "ZR";
      SwitchInput2[SwitchInput2["Minus"] = 8] = "Minus";
      SwitchInput2[SwitchInput2["Plus"] = 9] = "Plus";
      SwitchInput2[SwitchInput2["LS"] = 10] = "LS";
      SwitchInput2[SwitchInput2["RS"] = 11] = "RS";
      SwitchInput2[SwitchInput2["DPadUp"] = 12] = "DPadUp";
      SwitchInput2[SwitchInput2["DPadDown"] = 13] = "DPadDown";
      SwitchInput2[SwitchInput2["DPadLeft"] = 14] = "DPadLeft";
      SwitchInput2[SwitchInput2["DPadRight"] = 15] = "DPadRight";
      SwitchInput2[SwitchInput2["Home"] = 16] = "Home";
      SwitchInput2[SwitchInput2["Capture"] = 17] = "Capture";
      SwitchInput2[SwitchInput2["LStickXAxis"] = 18] = "LStickXAxis";
      SwitchInput2[SwitchInput2["LStickYAxis"] = 19] = "LStickYAxis";
      SwitchInput2[SwitchInput2["RStickXAxis"] = 20] = "RStickXAxis";
      SwitchInput2[SwitchInput2["RStickYAxis"] = 21] = "RStickYAxis";
    })(SwitchInput || (SwitchInput = {}));
  }
});

// node_modules/@babylonjs/core/Events/deviceInputEvents.js
var DeviceInputEventType, EventConstants;
var init_deviceInputEvents = __esm({
  "node_modules/@babylonjs/core/Events/deviceInputEvents.js"() {
    (function(DeviceInputEventType2) {
      DeviceInputEventType2[DeviceInputEventType2["PointerMove"] = 0] = "PointerMove";
      DeviceInputEventType2[DeviceInputEventType2["PointerDown"] = 1] = "PointerDown";
      DeviceInputEventType2[DeviceInputEventType2["PointerUp"] = 2] = "PointerUp";
    })(DeviceInputEventType || (DeviceInputEventType = {}));
    EventConstants = class {
    };
    EventConstants.DOM_DELTA_PIXEL = 0;
    EventConstants.DOM_DELTA_LINE = 1;
    EventConstants.DOM_DELTA_PAGE = 2;
  }
});

// node_modules/@babylonjs/core/DeviceInput/eventFactory.js
var DeviceEventFactory;
var init_eventFactory = __esm({
  "node_modules/@babylonjs/core/DeviceInput/eventFactory.js"() {
    init_deviceInputEvents();
    init_deviceEnums();
    DeviceEventFactory = class {
      /**
       * Create device input events based on provided type and slot
       *
       * @param deviceType Type of device
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param inputIndex Id of input to be checked
       * @param currentState Current value for given input
       * @param deviceInputSystem Reference to DeviceInputSystem
       * @param elementToAttachTo HTMLElement to reference as target for inputs
       * @param pointerId PointerId to use for pointer events
       * @returns IUIEvent object
       */
      static CreateDeviceEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo, pointerId) {
        switch (deviceType) {
          case DeviceType.Keyboard:
            return this._CreateKeyboardEvent(inputIndex, currentState, deviceInputSystem, elementToAttachTo);
          case DeviceType.Mouse:
            if (inputIndex === PointerInput.MouseWheelX || inputIndex === PointerInput.MouseWheelY || inputIndex === PointerInput.MouseWheelZ) {
              return this._CreateWheelEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo);
            }
          case DeviceType.Touch:
            return this._CreatePointerEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo, pointerId);
          default:
            throw `Unable to generate event for device ${DeviceType[deviceType]}`;
        }
      }
      /**
       * Creates pointer event
       *
       * @param deviceType Type of device
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param inputIndex Id of input to be checked
       * @param currentState Current value for given input
       * @param deviceInputSystem Reference to DeviceInputSystem
       * @param elementToAttachTo HTMLElement to reference as target for inputs
       * @param pointerId PointerId to use for pointer events
       * @returns IUIEvent object (Pointer)
       */
      static _CreatePointerEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo, pointerId) {
        const evt = this._CreateMouseEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo);
        if (deviceType === DeviceType.Mouse) {
          evt.deviceType = DeviceType.Mouse;
          evt.pointerId = 1;
          evt.pointerType = "mouse";
        } else {
          evt.deviceType = DeviceType.Touch;
          evt.pointerId = pointerId ?? deviceSlot;
          evt.pointerType = "touch";
        }
        let buttons = 0;
        buttons += deviceInputSystem.pollInput(deviceType, deviceSlot, PointerInput.LeftClick);
        buttons += deviceInputSystem.pollInput(deviceType, deviceSlot, PointerInput.RightClick) * 2;
        buttons += deviceInputSystem.pollInput(deviceType, deviceSlot, PointerInput.MiddleClick) * 4;
        evt.buttons = buttons;
        if (inputIndex === PointerInput.Move) {
          evt.type = "pointermove";
        } else if (inputIndex >= PointerInput.LeftClick && inputIndex <= PointerInput.RightClick) {
          evt.type = currentState === 1 ? "pointerdown" : "pointerup";
          evt.button = inputIndex - 2;
        }
        return evt;
      }
      /**
       * Create Mouse Wheel Event
       * @param deviceType Type of device
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param inputIndex Id of input to be checked
       * @param currentState Current value for given input
       * @param deviceInputSystem Reference to DeviceInputSystem
       * @param elementToAttachTo HTMLElement to reference as target for inputs
       * @returns IUIEvent object (Wheel)
       */
      static _CreateWheelEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        const evt = this._CreateMouseEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo);
        evt.pointerId = 1;
        evt.type = "wheel";
        evt.deltaMode = EventConstants.DOM_DELTA_PIXEL;
        evt.deltaX = 0;
        evt.deltaY = 0;
        evt.deltaZ = 0;
        switch (inputIndex) {
          case PointerInput.MouseWheelX:
            evt.deltaX = currentState;
            break;
          case PointerInput.MouseWheelY:
            evt.deltaY = currentState;
            break;
          case PointerInput.MouseWheelZ:
            evt.deltaZ = currentState;
            break;
        }
        return evt;
      }
      /**
       * Create Mouse Event
       * @param deviceType Type of device
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param inputIndex Id of input to be checked
       * @param currentState Current value for given input
       * @param deviceInputSystem Reference to DeviceInputSystem
       * @param elementToAttachTo HTMLElement to reference as target for inputs
       * @returns IUIEvent object (Mouse)
       */
      static _CreateMouseEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        const evt = this._CreateEvent(elementToAttachTo);
        const pointerX = deviceInputSystem.pollInput(deviceType, deviceSlot, PointerInput.Horizontal);
        const pointerY = deviceInputSystem.pollInput(deviceType, deviceSlot, PointerInput.Vertical);
        if (elementToAttachTo) {
          evt.movementX = 0;
          evt.movementY = 0;
          evt.offsetX = evt.movementX - elementToAttachTo.getBoundingClientRect().x;
          evt.offsetY = evt.movementY - elementToAttachTo.getBoundingClientRect().y;
        } else {
          evt.movementX = deviceInputSystem.pollInput(deviceType, deviceSlot, NativePointerInput.DeltaHorizontal);
          evt.movementY = deviceInputSystem.pollInput(deviceType, deviceSlot, NativePointerInput.DeltaVertical);
          evt.offsetX = 0;
          evt.offsetY = 0;
        }
        this._CheckNonCharacterKeys(evt, deviceInputSystem);
        evt.clientX = pointerX;
        evt.clientY = pointerY;
        evt.x = pointerX;
        evt.y = pointerY;
        evt.deviceType = deviceType;
        evt.deviceSlot = deviceSlot;
        evt.inputIndex = inputIndex;
        return evt;
      }
      /**
       * Create Keyboard Event
       * @param inputIndex Id of input to be checked
       * @param currentState Current value for given input
       * @param deviceInputSystem Reference to DeviceInputSystem
       * @param elementToAttachTo HTMLElement to reference as target for inputs
       * @returns IEvent object (Keyboard)
       */
      static _CreateKeyboardEvent(inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        const evt = this._CreateEvent(elementToAttachTo);
        this._CheckNonCharacterKeys(evt, deviceInputSystem);
        evt.deviceType = DeviceType.Keyboard;
        evt.deviceSlot = 0;
        evt.inputIndex = inputIndex;
        evt.type = currentState === 1 ? "keydown" : "keyup";
        evt.key = String.fromCharCode(inputIndex);
        evt.keyCode = inputIndex;
        return evt;
      }
      /**
       * Add parameters for non-character keys (Ctrl, Alt, Meta, Shift)
       * @param evt Event object to add parameters to
       * @param deviceInputSystem DeviceInputSystem to pull values from
       */
      static _CheckNonCharacterKeys(evt, deviceInputSystem) {
        const isKeyboardActive = deviceInputSystem.isDeviceAvailable(DeviceType.Keyboard);
        const altKey = isKeyboardActive && deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 18) === 1;
        const ctrlKey = isKeyboardActive && deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 17) === 1;
        const metaKey = isKeyboardActive && (deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 91) === 1 || deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 92) === 1 || deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 93) === 1);
        const shiftKey = isKeyboardActive && deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 16) === 1;
        evt.altKey = altKey;
        evt.ctrlKey = ctrlKey;
        evt.metaKey = metaKey;
        evt.shiftKey = shiftKey;
      }
      /**
       * Create base event object
       * @param elementToAttachTo Value to use as event target
       * @returns
       */
      static _CreateEvent(elementToAttachTo) {
        const evt = {};
        evt.preventDefault = () => {
        };
        evt.target = elementToAttachTo;
        return evt;
      }
    };
  }
});

// node_modules/@babylonjs/core/DeviceInput/nativeDeviceInputSystem.js
var NativeDeviceInputSystem;
var init_nativeDeviceInputSystem = __esm({
  "node_modules/@babylonjs/core/DeviceInput/nativeDeviceInputSystem.js"() {
    init_eventFactory();
    init_deviceEnums();
    NativeDeviceInputSystem = class {
      constructor(onDeviceConnected, onDeviceDisconnected, onInputChanged) {
        this._nativeInput = _native.DeviceInputSystem ? new _native.DeviceInputSystem(onDeviceConnected, onDeviceDisconnected, (deviceType, deviceSlot, inputIndex, currentState) => {
          const evt = DeviceEventFactory.CreateDeviceEvent(deviceType, deviceSlot, inputIndex, currentState, this);
          onInputChanged(deviceType, deviceSlot, evt);
        }) : this._createDummyNativeInput();
      }
      // Public functions
      /**
       * Checks for current device input value, given an id and input index. Throws exception if requested device not initialized.
       * @param deviceType Enum specifying device type
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param inputIndex Id of input to be checked
       * @returns Current value of input
       */
      pollInput(deviceType, deviceSlot, inputIndex) {
        return this._nativeInput.pollInput(deviceType, deviceSlot, inputIndex);
      }
      /**
       * Check for a specific device in the DeviceInputSystem
       * @param deviceType Type of device to check for
       * @returns bool with status of device's existence
       */
      isDeviceAvailable(deviceType) {
        return deviceType === DeviceType.Mouse || deviceType === DeviceType.Touch;
      }
      /**
       * Dispose of all the observables
       */
      dispose() {
        this._nativeInput.dispose();
      }
      /**
       * For versions of BabylonNative that don't have the NativeInput plugin initialized, create a dummy version
       * @returns Object with dummy functions
       */
      _createDummyNativeInput() {
        const nativeInput = {
          pollInput: () => {
            return 0;
          },
          isDeviceAvailable: () => {
            return false;
          },
          dispose: () => {
          }
        };
        return nativeInput;
      }
    };
  }
});

// node_modules/@babylonjs/core/DeviceInput/webDeviceInputSystem.js
var MAX_KEYCODES, MAX_POINTER_INPUTS, WebDeviceInputSystem;
var init_webDeviceInputSystem = __esm({
  "node_modules/@babylonjs/core/DeviceInput/webDeviceInputSystem.js"() {
    init_domManagement();
    init_tools();
    init_eventFactory();
    init_deviceEnums();
    MAX_KEYCODES = 255;
    MAX_POINTER_INPUTS = Object.keys(PointerInput).length / 2;
    WebDeviceInputSystem = class {
      /**
       * Constructor for the WebDeviceInputSystem
       * @param engine Engine to reference
       * @param onDeviceConnected Callback to execute when device is connected
       * @param onDeviceDisconnected Callback to execute when device is disconnected
       * @param onInputChanged Callback to execute when input changes on device
       */
      constructor(engine, onDeviceConnected, onDeviceDisconnected, onInputChanged) {
        this._inputs = [];
        this._keyboardActive = false;
        this._pointerActive = false;
        this._usingSafari = Tools.IsSafari();
        this._usingMacOS = IsNavigatorAvailable() && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
        this._keyboardDownEvent = (evt) => {
        };
        this._keyboardUpEvent = (evt) => {
        };
        this._keyboardBlurEvent = (evt) => {
        };
        this._pointerMoveEvent = (evt) => {
        };
        this._pointerDownEvent = (evt) => {
        };
        this._pointerUpEvent = (evt) => {
        };
        this._pointerCancelEvent = (evt) => {
        };
        this._pointerWheelEvent = (evt) => {
        };
        this._pointerBlurEvent = (evt) => {
        };
        this._pointerMacOSChromeOutEvent = (evt) => {
        };
        this._eventsAttached = false;
        this._mouseId = -1;
        this._isUsingFirefox = IsNavigatorAvailable() && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1;
        this._isUsingChromium = IsNavigatorAvailable() && navigator.userAgent && navigator.userAgent.indexOf("Chrome") !== -1;
        this._maxTouchPoints = 0;
        this._pointerInputClearObserver = null;
        this._gamepadConnectedEvent = (evt) => {
        };
        this._gamepadDisconnectedEvent = (evt) => {
        };
        this._eventPrefix = Tools.GetPointerPrefix(engine);
        this._engine = engine;
        this._onDeviceConnected = onDeviceConnected;
        this._onDeviceDisconnected = onDeviceDisconnected;
        this._onInputChanged = onInputChanged;
        this._mouseId = this._isUsingFirefox ? 0 : 1;
        this._enableEvents();
        if (this._usingMacOS) {
          this._metaKeys = [];
        }
        if (!this._engine._onEngineViewChanged) {
          this._engine._onEngineViewChanged = () => {
            this._enableEvents();
          };
        }
      }
      // Public functions
      /**
       * Checks for current device input value, given an id and input index. Throws exception if requested device not initialized.
       * @param deviceType Enum specifying device type
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param inputIndex Id of input to be checked
       * @returns Current value of input
       */
      pollInput(deviceType, deviceSlot, inputIndex) {
        const device = this._inputs[deviceType][deviceSlot];
        if (!device) {
          throw `Unable to find device ${DeviceType[deviceType]}`;
        }
        if (deviceType >= DeviceType.DualShock && deviceType <= DeviceType.DualSense) {
          this._updateDevice(deviceType, deviceSlot, inputIndex);
        }
        const currentValue = device[inputIndex];
        if (currentValue === void 0) {
          throw `Unable to find input ${inputIndex} for device ${DeviceType[deviceType]} in slot ${deviceSlot}`;
        }
        if (inputIndex === PointerInput.Move) {
          Tools.Warn(`Unable to provide information for PointerInput.Move.  Try using PointerInput.Horizontal or PointerInput.Vertical for move data.`);
        }
        return currentValue;
      }
      /**
       * Check for a specific device in the DeviceInputSystem
       * @param deviceType Type of device to check for
       * @returns bool with status of device's existence
       */
      isDeviceAvailable(deviceType) {
        return this._inputs[deviceType] !== void 0;
      }
      /**
       * Dispose of all the eventlisteners
       */
      dispose() {
        this._onDeviceConnected = () => {
        };
        this._onDeviceDisconnected = () => {
        };
        this._onInputChanged = () => {
        };
        delete this._engine._onEngineViewChanged;
        if (this._elementToAttachTo) {
          this._disableEvents();
        }
      }
      /**
       * Enable listening for user input events
       */
      _enableEvents() {
        const inputElement = this == null ? void 0 : this._engine.getInputElement();
        if (inputElement && (!this._eventsAttached || this._elementToAttachTo !== inputElement)) {
          this._disableEvents();
          if (this._inputs) {
            for (const inputs of this._inputs) {
              if (inputs) {
                for (const deviceSlotKey in inputs) {
                  const deviceSlot = +deviceSlotKey;
                  const device = inputs[deviceSlot];
                  if (device) {
                    for (let inputIndex = 0; inputIndex < device.length; inputIndex++) {
                      device[inputIndex] = 0;
                    }
                  }
                }
              }
            }
          }
          this._elementToAttachTo = inputElement;
          this._elementToAttachTo.tabIndex = this._elementToAttachTo.tabIndex !== -1 ? this._elementToAttachTo.tabIndex : this._engine.canvasTabIndex;
          this._handleKeyActions();
          this._handlePointerActions();
          this._handleGamepadActions();
          this._eventsAttached = true;
          this._checkForConnectedDevices();
        }
      }
      /**
       * Disable listening for user input events
       */
      _disableEvents() {
        if (this._elementToAttachTo) {
          this._elementToAttachTo.removeEventListener("blur", this._keyboardBlurEvent);
          this._elementToAttachTo.removeEventListener("blur", this._pointerBlurEvent);
          this._elementToAttachTo.removeEventListener("keydown", this._keyboardDownEvent);
          this._elementToAttachTo.removeEventListener("keyup", this._keyboardUpEvent);
          this._elementToAttachTo.removeEventListener(this._eventPrefix + "move", this._pointerMoveEvent);
          this._elementToAttachTo.removeEventListener(this._eventPrefix + "down", this._pointerDownEvent);
          this._elementToAttachTo.removeEventListener(this._eventPrefix + "up", this._pointerUpEvent);
          this._elementToAttachTo.removeEventListener(this._eventPrefix + "cancel", this._pointerCancelEvent);
          this._elementToAttachTo.removeEventListener(this._wheelEventName, this._pointerWheelEvent);
          if (this._usingMacOS && this._isUsingChromium) {
            this._elementToAttachTo.removeEventListener("lostpointercapture", this._pointerMacOSChromeOutEvent);
          }
          window.removeEventListener("gamepadconnected", this._gamepadConnectedEvent);
          window.removeEventListener("gamepaddisconnected", this._gamepadDisconnectedEvent);
        }
        if (this._pointerInputClearObserver) {
          this._engine.onEndFrameObservable.remove(this._pointerInputClearObserver);
        }
        this._eventsAttached = false;
      }
      /**
       * Checks for existing connections to devices and register them, if necessary
       * Currently handles gamepads and mouse
       */
      _checkForConnectedDevices() {
        if (navigator.getGamepads) {
          const gamepads = navigator.getGamepads();
          for (const gamepad of gamepads) {
            if (gamepad) {
              this._addGamePad(gamepad);
            }
          }
        }
        if (typeof matchMedia === "function" && matchMedia("(pointer:fine)").matches) {
          this._addPointerDevice(DeviceType.Mouse, 0, 0, 0);
        }
      }
      // Private functions
      /**
       * Add a gamepad to the DeviceInputSystem
       * @param gamepad A single DOM Gamepad object
       */
      _addGamePad(gamepad) {
        const deviceType = this._getGamepadDeviceType(gamepad.id);
        const deviceSlot = gamepad.index;
        this._gamepads = this._gamepads || new Array(gamepad.index + 1);
        this._registerDevice(deviceType, deviceSlot, gamepad.buttons.length + gamepad.axes.length);
        this._gamepads[deviceSlot] = deviceType;
      }
      /**
       * Add pointer device to DeviceInputSystem
       * @param deviceType Type of Pointer to add
       * @param deviceSlot Pointer ID (0 for mouse, pointerId for Touch)
       * @param currentX Current X at point of adding
       * @param currentY Current Y at point of adding
       */
      _addPointerDevice(deviceType, deviceSlot, currentX, currentY) {
        if (!this._pointerActive) {
          this._pointerActive = true;
        }
        this._registerDevice(deviceType, deviceSlot, MAX_POINTER_INPUTS);
        const pointer = this._inputs[deviceType][deviceSlot];
        pointer[0] = currentX;
        pointer[1] = currentY;
      }
      /**
       * Add device and inputs to device array
       * @param deviceType Enum specifying device type
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param numberOfInputs Number of input entries to create for given device
       */
      _registerDevice(deviceType, deviceSlot, numberOfInputs) {
        if (deviceSlot === void 0) {
          throw `Unable to register device ${DeviceType[deviceType]} to undefined slot.`;
        }
        if (!this._inputs[deviceType]) {
          this._inputs[deviceType] = {};
        }
        if (!this._inputs[deviceType][deviceSlot]) {
          const device = new Array(numberOfInputs);
          device.fill(0);
          this._inputs[deviceType][deviceSlot] = device;
          this._onDeviceConnected(deviceType, deviceSlot);
        }
      }
      /**
       * Given a specific device name, remove that device from the device map
       * @param deviceType Enum specifying device type
       * @param deviceSlot "Slot" or index that device is referenced in
       */
      _unregisterDevice(deviceType, deviceSlot) {
        if (this._inputs[deviceType][deviceSlot]) {
          delete this._inputs[deviceType][deviceSlot];
          this._onDeviceDisconnected(deviceType, deviceSlot);
        }
      }
      /**
       * Handle all actions that come from keyboard interaction
       */
      _handleKeyActions() {
        this._keyboardDownEvent = (evt) => {
          if (!this._keyboardActive) {
            this._keyboardActive = true;
            this._registerDevice(DeviceType.Keyboard, 0, MAX_KEYCODES);
          }
          const kbKey = this._inputs[DeviceType.Keyboard][0];
          if (kbKey) {
            kbKey[evt.keyCode] = 1;
            const deviceEvent = evt;
            deviceEvent.inputIndex = evt.keyCode;
            if (this._usingMacOS && evt.metaKey && evt.key !== "Meta") {
              if (!this._metaKeys.includes(evt.keyCode)) {
                this._metaKeys.push(evt.keyCode);
              }
            }
            this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent);
          }
        };
        this._keyboardUpEvent = (evt) => {
          if (!this._keyboardActive) {
            this._keyboardActive = true;
            this._registerDevice(DeviceType.Keyboard, 0, MAX_KEYCODES);
          }
          const kbKey = this._inputs[DeviceType.Keyboard][0];
          if (kbKey) {
            kbKey[evt.keyCode] = 0;
            const deviceEvent = evt;
            deviceEvent.inputIndex = evt.keyCode;
            if (this._usingMacOS && evt.key === "Meta" && this._metaKeys.length > 0) {
              for (const keyCode of this._metaKeys) {
                const deviceEvent2 = DeviceEventFactory.CreateDeviceEvent(DeviceType.Keyboard, 0, keyCode, 0, this, this._elementToAttachTo);
                kbKey[keyCode] = 0;
                this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent2);
              }
              this._metaKeys.splice(0, this._metaKeys.length);
            }
            this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent);
          }
        };
        this._keyboardBlurEvent = () => {
          if (this._keyboardActive) {
            const kbKey = this._inputs[DeviceType.Keyboard][0];
            for (let i = 0; i < kbKey.length; i++) {
              if (kbKey[i] !== 0) {
                kbKey[i] = 0;
                const deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Keyboard, 0, i, 0, this, this._elementToAttachTo);
                this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent);
              }
            }
            if (this._usingMacOS) {
              this._metaKeys.splice(0, this._metaKeys.length);
            }
          }
        };
        this._elementToAttachTo.addEventListener("keydown", this._keyboardDownEvent);
        this._elementToAttachTo.addEventListener("keyup", this._keyboardUpEvent);
        this._elementToAttachTo.addEventListener("blur", this._keyboardBlurEvent);
      }
      /**
       * Handle all actions that come from pointer interaction
       */
      _handlePointerActions() {
        this._maxTouchPoints = IsNavigatorAvailable() && navigator.maxTouchPoints || 2;
        if (!this._activeTouchIds) {
          this._activeTouchIds = new Array(this._maxTouchPoints);
        }
        for (let i = 0; i < this._maxTouchPoints; i++) {
          this._activeTouchIds[i] = -1;
        }
        this._pointerMoveEvent = (evt) => {
          const deviceType = this._getPointerType(evt);
          let deviceSlot = deviceType === DeviceType.Mouse ? 0 : this._activeTouchIds.indexOf(evt.pointerId);
          if (deviceType === DeviceType.Touch && deviceSlot === -1) {
            const idx = this._activeTouchIds.indexOf(-1);
            if (idx >= 0) {
              deviceSlot = idx;
              this._activeTouchIds[idx] = evt.pointerId;
              this._onDeviceConnected(deviceType, deviceSlot);
            } else {
              Tools.Warn(`Max number of touches exceeded.  Ignoring touches in excess of ${this._maxTouchPoints}`);
              return;
            }
          }
          if (!this._inputs[deviceType]) {
            this._inputs[deviceType] = {};
          }
          if (!this._inputs[deviceType][deviceSlot]) {
            this._addPointerDevice(deviceType, deviceSlot, evt.clientX, evt.clientY);
          }
          const pointer = this._inputs[deviceType][deviceSlot];
          if (pointer) {
            const deviceEvent = evt;
            deviceEvent.inputIndex = PointerInput.Move;
            pointer[PointerInput.Horizontal] = evt.clientX;
            pointer[PointerInput.Vertical] = evt.clientY;
            if (deviceType === DeviceType.Touch && pointer[PointerInput.LeftClick] === 0) {
              pointer[PointerInput.LeftClick] = 1;
            }
            if (evt.pointerId === void 0) {
              evt.pointerId = this._mouseId;
            }
            this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            if (!this._usingSafari && evt.button !== -1) {
              deviceEvent.inputIndex = evt.button + 2;
              pointer[evt.button + 2] = pointer[evt.button + 2] ? 0 : 1;
              this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            }
          }
        };
        this._pointerDownEvent = (evt) => {
          const deviceType = this._getPointerType(evt);
          let deviceSlot = deviceType === DeviceType.Mouse ? 0 : evt.pointerId;
          if (deviceType === DeviceType.Touch) {
            const idx = this._activeTouchIds.indexOf(-1);
            if (idx >= 0) {
              deviceSlot = idx;
              this._activeTouchIds[idx] = evt.pointerId;
            } else {
              Tools.Warn(`Max number of touches exceeded.  Ignoring touches in excess of ${this._maxTouchPoints}`);
              return;
            }
          }
          if (!this._inputs[deviceType]) {
            this._inputs[deviceType] = {};
          }
          if (!this._inputs[deviceType][deviceSlot]) {
            this._addPointerDevice(deviceType, deviceSlot, evt.clientX, evt.clientY);
          } else if (deviceType === DeviceType.Touch) {
            this._onDeviceConnected(deviceType, deviceSlot);
          }
          const pointer = this._inputs[deviceType][deviceSlot];
          if (pointer) {
            const previousHorizontal = pointer[PointerInput.Horizontal];
            const previousVertical = pointer[PointerInput.Vertical];
            if (deviceType === DeviceType.Mouse) {
              if (evt.pointerId === void 0) {
                evt.pointerId = this._mouseId;
              }
              if (!document.pointerLockElement) {
                try {
                  this._elementToAttachTo.setPointerCapture(this._mouseId);
                } catch (e) {
                }
              }
            } else {
              if (evt.pointerId && !document.pointerLockElement) {
                try {
                  this._elementToAttachTo.setPointerCapture(evt.pointerId);
                } catch (e) {
                }
              }
            }
            pointer[PointerInput.Horizontal] = evt.clientX;
            pointer[PointerInput.Vertical] = evt.clientY;
            pointer[evt.button + 2] = 1;
            const deviceEvent = evt;
            deviceEvent.inputIndex = evt.button + 2;
            this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            if (previousHorizontal !== evt.clientX || previousVertical !== evt.clientY) {
              deviceEvent.inputIndex = PointerInput.Move;
              this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            }
          }
        };
        this._pointerUpEvent = (evt) => {
          var _a, _b, _c, _d, _e;
          const deviceType = this._getPointerType(evt);
          const deviceSlot = deviceType === DeviceType.Mouse ? 0 : this._activeTouchIds.indexOf(evt.pointerId);
          if (deviceType === DeviceType.Touch) {
            if (deviceSlot === -1) {
              return;
            } else {
              this._activeTouchIds[deviceSlot] = -1;
            }
          }
          const pointer = (_a = this._inputs[deviceType]) == null ? void 0 : _a[deviceSlot];
          if (pointer && pointer[evt.button + 2] !== 0) {
            const previousHorizontal = pointer[PointerInput.Horizontal];
            const previousVertical = pointer[PointerInput.Vertical];
            pointer[PointerInput.Horizontal] = evt.clientX;
            pointer[PointerInput.Vertical] = evt.clientY;
            pointer[evt.button + 2] = 0;
            const deviceEvent = evt;
            if (evt.pointerId === void 0) {
              evt.pointerId = this._mouseId;
            }
            if (previousHorizontal !== evt.clientX || previousVertical !== evt.clientY) {
              deviceEvent.inputIndex = PointerInput.Move;
              this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            }
            deviceEvent.inputIndex = evt.button + 2;
            if (deviceType === DeviceType.Mouse && this._mouseId >= 0 && ((_c = (_b = this._elementToAttachTo).hasPointerCapture) == null ? void 0 : _c.call(_b, this._mouseId))) {
              this._elementToAttachTo.releasePointerCapture(this._mouseId);
            } else if (evt.pointerId && ((_e = (_d = this._elementToAttachTo).hasPointerCapture) == null ? void 0 : _e.call(_d, evt.pointerId))) {
              this._elementToAttachTo.releasePointerCapture(evt.pointerId);
            }
            this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            if (deviceType === DeviceType.Touch) {
              this._onDeviceDisconnected(deviceType, deviceSlot);
            }
          }
        };
        this._pointerCancelEvent = (evt) => {
          var _a, _b, _c, _d;
          if (evt.pointerType === "mouse") {
            const pointer = this._inputs[DeviceType.Mouse][0];
            if (this._mouseId >= 0 && ((_b = (_a = this._elementToAttachTo).hasPointerCapture) == null ? void 0 : _b.call(_a, this._mouseId))) {
              this._elementToAttachTo.releasePointerCapture(this._mouseId);
            }
            for (let inputIndex = PointerInput.LeftClick; inputIndex <= PointerInput.BrowserForward; inputIndex++) {
              if (pointer[inputIndex] === 1) {
                pointer[inputIndex] = 0;
                const deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Mouse, 0, inputIndex, 0, this, this._elementToAttachTo);
                this._onInputChanged(DeviceType.Mouse, 0, deviceEvent);
              }
            }
          } else {
            const deviceSlot = this._activeTouchIds.indexOf(evt.pointerId);
            if (deviceSlot === -1) {
              return;
            }
            if ((_d = (_c = this._elementToAttachTo).hasPointerCapture) == null ? void 0 : _d.call(_c, evt.pointerId)) {
              this._elementToAttachTo.releasePointerCapture(evt.pointerId);
            }
            this._inputs[DeviceType.Touch][deviceSlot][PointerInput.LeftClick] = 0;
            const deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Touch, deviceSlot, PointerInput.LeftClick, 0, this, this._elementToAttachTo, evt.pointerId);
            this._onInputChanged(DeviceType.Touch, deviceSlot, deviceEvent);
            this._activeTouchIds[deviceSlot] = -1;
            this._onDeviceDisconnected(DeviceType.Touch, deviceSlot);
          }
        };
        this._wheelEventName = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
        let passiveSupported = false;
        const noop = function() {
        };
        try {
          const options = Object.defineProperty({}, "passive", {
            get: function() {
              passiveSupported = true;
            }
          });
          this._elementToAttachTo.addEventListener("test", noop, options);
          this._elementToAttachTo.removeEventListener("test", noop, options);
        } catch (e) {
        }
        this._pointerBlurEvent = () => {
          var _a, _b, _c, _d, _e;
          if (this.isDeviceAvailable(DeviceType.Mouse)) {
            const pointer = this._inputs[DeviceType.Mouse][0];
            if (this._mouseId >= 0 && ((_b = (_a = this._elementToAttachTo).hasPointerCapture) == null ? void 0 : _b.call(_a, this._mouseId))) {
              this._elementToAttachTo.releasePointerCapture(this._mouseId);
            }
            for (let inputIndex = PointerInput.LeftClick; inputIndex <= PointerInput.BrowserForward; inputIndex++) {
              if (pointer[inputIndex] === 1) {
                pointer[inputIndex] = 0;
                const deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Mouse, 0, inputIndex, 0, this, this._elementToAttachTo);
                this._onInputChanged(DeviceType.Mouse, 0, deviceEvent);
              }
            }
          }
          if (this.isDeviceAvailable(DeviceType.Touch)) {
            const pointer = this._inputs[DeviceType.Touch];
            for (let deviceSlot = 0; deviceSlot < this._activeTouchIds.length; deviceSlot++) {
              const pointerId = this._activeTouchIds[deviceSlot];
              if ((_d = (_c = this._elementToAttachTo).hasPointerCapture) == null ? void 0 : _d.call(_c, pointerId)) {
                this._elementToAttachTo.releasePointerCapture(pointerId);
              }
              if (pointerId !== -1 && ((_e = pointer[deviceSlot]) == null ? void 0 : _e[PointerInput.LeftClick]) === 1) {
                pointer[deviceSlot][PointerInput.LeftClick] = 0;
                const deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Touch, deviceSlot, PointerInput.LeftClick, 0, this, this._elementToAttachTo, pointerId);
                this._onInputChanged(DeviceType.Touch, deviceSlot, deviceEvent);
                this._activeTouchIds[deviceSlot] = -1;
                this._onDeviceDisconnected(DeviceType.Touch, deviceSlot);
              }
            }
          }
        };
        this._pointerWheelEvent = (evt) => {
          const deviceType = DeviceType.Mouse;
          const deviceSlot = 0;
          if (!this._inputs[deviceType]) {
            this._inputs[deviceType] = [];
          }
          if (!this._inputs[deviceType][deviceSlot]) {
            this._pointerActive = true;
            this._registerDevice(deviceType, deviceSlot, MAX_POINTER_INPUTS);
          }
          const pointer = this._inputs[deviceType][deviceSlot];
          if (pointer) {
            pointer[PointerInput.MouseWheelX] = evt.deltaX || 0;
            pointer[PointerInput.MouseWheelY] = evt.deltaY || evt.wheelDelta || 0;
            pointer[PointerInput.MouseWheelZ] = evt.deltaZ || 0;
            const deviceEvent = evt;
            if (evt.pointerId === void 0) {
              evt.pointerId = this._mouseId;
            }
            if (pointer[PointerInput.MouseWheelX] !== 0) {
              deviceEvent.inputIndex = PointerInput.MouseWheelX;
              this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            }
            if (pointer[PointerInput.MouseWheelY] !== 0) {
              deviceEvent.inputIndex = PointerInput.MouseWheelY;
              this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            }
            if (pointer[PointerInput.MouseWheelZ] !== 0) {
              deviceEvent.inputIndex = PointerInput.MouseWheelZ;
              this._onInputChanged(deviceType, deviceSlot, deviceEvent);
            }
          }
        };
        if (this._usingMacOS && this._isUsingChromium) {
          this._pointerMacOSChromeOutEvent = (evt) => {
            if (evt.buttons > 1) {
              this._pointerCancelEvent(evt);
            }
          };
          this._elementToAttachTo.addEventListener("lostpointercapture", this._pointerMacOSChromeOutEvent);
        }
        this._elementToAttachTo.addEventListener(this._eventPrefix + "move", this._pointerMoveEvent);
        this._elementToAttachTo.addEventListener(this._eventPrefix + "down", this._pointerDownEvent);
        this._elementToAttachTo.addEventListener(this._eventPrefix + "up", this._pointerUpEvent);
        this._elementToAttachTo.addEventListener(this._eventPrefix + "cancel", this._pointerCancelEvent);
        this._elementToAttachTo.addEventListener("blur", this._pointerBlurEvent);
        this._elementToAttachTo.addEventListener(this._wheelEventName, this._pointerWheelEvent, passiveSupported ? { passive: false } : false);
        this._pointerInputClearObserver = this._engine.onEndFrameObservable.add(() => {
          if (this.isDeviceAvailable(DeviceType.Mouse)) {
            const pointer = this._inputs[DeviceType.Mouse][0];
            pointer[PointerInput.MouseWheelX] = 0;
            pointer[PointerInput.MouseWheelY] = 0;
            pointer[PointerInput.MouseWheelZ] = 0;
          }
        });
      }
      /**
       * Handle all actions that come from gamepad interaction
       */
      _handleGamepadActions() {
        this._gamepadConnectedEvent = (evt) => {
          this._addGamePad(evt.gamepad);
        };
        this._gamepadDisconnectedEvent = (evt) => {
          if (this._gamepads) {
            const deviceType = this._getGamepadDeviceType(evt.gamepad.id);
            const deviceSlot = evt.gamepad.index;
            this._unregisterDevice(deviceType, deviceSlot);
            delete this._gamepads[deviceSlot];
          }
        };
        window.addEventListener("gamepadconnected", this._gamepadConnectedEvent);
        window.addEventListener("gamepaddisconnected", this._gamepadDisconnectedEvent);
      }
      /**
       * Update all non-event based devices with each frame
       * @param deviceType Enum specifying device type
       * @param deviceSlot "Slot" or index that device is referenced in
       * @param inputIndex Id of input to be checked
       */
      _updateDevice(deviceType, deviceSlot, inputIndex) {
        const gp = navigator.getGamepads()[deviceSlot];
        if (gp && deviceType === this._gamepads[deviceSlot]) {
          const device = this._inputs[deviceType][deviceSlot];
          if (inputIndex >= gp.buttons.length) {
            device[inputIndex] = gp.axes[inputIndex - gp.buttons.length].valueOf();
          } else {
            device[inputIndex] = gp.buttons[inputIndex].value;
          }
        }
      }
      /**
       * Gets DeviceType from the device name
       * @param deviceName Name of Device from DeviceInputSystem
       * @returns DeviceType enum value
       */
      _getGamepadDeviceType(deviceName) {
        if (deviceName.indexOf("054c") !== -1) {
          return deviceName.indexOf("0ce6") !== -1 ? DeviceType.DualSense : DeviceType.DualShock;
        } else if (deviceName.indexOf("Xbox One") !== -1 || deviceName.search("Xbox 360") !== -1 || deviceName.search("xinput") !== -1) {
          return DeviceType.Xbox;
        } else if (deviceName.indexOf("057e") !== -1) {
          return DeviceType.Switch;
        }
        return DeviceType.Generic;
      }
      /**
       * Get DeviceType from a given pointer/mouse/touch event.
       * @param evt PointerEvent to evaluate
       * @returns DeviceType interpreted from event
       */
      _getPointerType(evt) {
        let deviceType = DeviceType.Mouse;
        if (evt.pointerType === "touch" || evt.pointerType === "pen" || evt.touches) {
          deviceType = DeviceType.Touch;
        }
        return deviceType;
      }
    };
  }
});

// node_modules/@babylonjs/core/DeviceInput/InputDevices/deviceSource.js
var DeviceSource;
var init_deviceSource = __esm({
  "node_modules/@babylonjs/core/DeviceInput/InputDevices/deviceSource.js"() {
    init_observable();
    DeviceSource = class {
      /**
       * Default Constructor
       * @param deviceInputSystem - Reference to DeviceInputSystem
       * @param deviceType - Type of device
       * @param deviceSlot - "Slot" or index that device is referenced in
       */
      constructor(deviceInputSystem, deviceType, deviceSlot = 0) {
        this.deviceType = deviceType;
        this.deviceSlot = deviceSlot;
        this.onInputChangedObservable = new Observable();
        this._deviceInputSystem = deviceInputSystem;
      }
      /**
       * Get input for specific input
       * @param inputIndex - index of specific input on device
       * @returns Input value from DeviceInputSystem
       */
      getInput(inputIndex) {
        return this._deviceInputSystem.pollInput(this.deviceType, this.deviceSlot, inputIndex);
      }
    };
  }
});

// node_modules/@babylonjs/core/DeviceInput/internalDeviceSourceManager.js
var InternalDeviceSourceManager;
var init_internalDeviceSourceManager = __esm({
  "node_modules/@babylonjs/core/DeviceInput/internalDeviceSourceManager.js"() {
    init_deviceEnums();
    init_nativeDeviceInputSystem();
    init_webDeviceInputSystem();
    init_deviceSource();
    InternalDeviceSourceManager = class {
      constructor(engine) {
        this._registeredManagers = new Array();
        this._refCount = 0;
        this.registerManager = (manager) => {
          for (let deviceType = 0; deviceType < this._devices.length; deviceType++) {
            const device = this._devices[deviceType];
            for (const deviceSlotKey in device) {
              const deviceSlot = +deviceSlotKey;
              manager._addDevice(new DeviceSource(this._deviceInputSystem, deviceType, deviceSlot));
            }
          }
          this._registeredManagers.push(manager);
        };
        this.unregisterManager = (manager) => {
          const idx = this._registeredManagers.indexOf(manager);
          if (idx > -1) {
            this._registeredManagers.splice(idx, 1);
          }
        };
        const numberOfDeviceTypes = Object.keys(DeviceType).length / 2;
        this._devices = new Array(numberOfDeviceTypes);
        const onDeviceConnected = (deviceType, deviceSlot) => {
          if (!this._devices[deviceType]) {
            this._devices[deviceType] = new Array();
          }
          if (!this._devices[deviceType][deviceSlot]) {
            this._devices[deviceType][deviceSlot] = deviceSlot;
          }
          for (const manager of this._registeredManagers) {
            const deviceSource = new DeviceSource(this._deviceInputSystem, deviceType, deviceSlot);
            manager._addDevice(deviceSource);
          }
        };
        const onDeviceDisconnected = (deviceType, deviceSlot) => {
          var _a;
          if ((_a = this._devices[deviceType]) == null ? void 0 : _a[deviceSlot]) {
            delete this._devices[deviceType][deviceSlot];
          }
          for (const manager of this._registeredManagers) {
            manager._removeDevice(deviceType, deviceSlot);
          }
        };
        const onInputChanged = (deviceType, deviceSlot, eventData) => {
          if (eventData) {
            for (const manager of this._registeredManagers) {
              manager._onInputChanged(deviceType, deviceSlot, eventData);
            }
          }
        };
        if (typeof _native !== "undefined") {
          this._deviceInputSystem = new NativeDeviceInputSystem(onDeviceConnected, onDeviceDisconnected, onInputChanged);
        } else {
          this._deviceInputSystem = new WebDeviceInputSystem(engine, onDeviceConnected, onDeviceDisconnected, onInputChanged);
        }
      }
      dispose() {
        this._deviceInputSystem.dispose();
      }
    };
  }
});

// node_modules/@babylonjs/core/DeviceInput/InputDevices/deviceSourceManager.js
var DeviceSourceManager;
var init_deviceSourceManager = __esm({
  "node_modules/@babylonjs/core/DeviceInput/InputDevices/deviceSourceManager.js"() {
    init_deviceEnums();
    init_observable();
    init_internalDeviceSourceManager();
    DeviceSourceManager = class {
      // Public Functions
      /**
       * Gets a DeviceSource, given a type and slot
       * @param deviceType - Type of Device
       * @param deviceSlot - Slot or ID of device
       * @returns DeviceSource
       */
      getDeviceSource(deviceType, deviceSlot) {
        if (deviceSlot === void 0) {
          if (this._firstDevice[deviceType] === void 0) {
            return null;
          }
          deviceSlot = this._firstDevice[deviceType];
        }
        if (!this._devices[deviceType] || this._devices[deviceType][deviceSlot] === void 0) {
          return null;
        }
        return this._devices[deviceType][deviceSlot];
      }
      /**
       * Gets an array of DeviceSource objects for a given device type
       * @param deviceType - Type of Device
       * @returns All available DeviceSources of a given type
       */
      getDeviceSources(deviceType) {
        if (!this._devices[deviceType]) {
          return [];
        }
        return this._devices[deviceType].filter((source) => {
          return !!source;
        });
      }
      /**
       * Default constructor
       * @param engine - Used to get canvas (if applicable)
       */
      constructor(engine) {
        const numberOfDeviceTypes = Object.keys(DeviceType).length / 2;
        this._devices = new Array(numberOfDeviceTypes);
        this._firstDevice = new Array(numberOfDeviceTypes);
        this._engine = engine;
        if (!this._engine._deviceSourceManager) {
          this._engine._deviceSourceManager = new InternalDeviceSourceManager(engine);
        }
        this._engine._deviceSourceManager._refCount++;
        this.onDeviceConnectedObservable = new Observable((observer) => {
          for (const devices of this._devices) {
            if (devices) {
              for (const device of devices) {
                if (device) {
                  this.onDeviceConnectedObservable.notifyObserver(observer, device);
                }
              }
            }
          }
        });
        this.onDeviceDisconnectedObservable = new Observable();
        this._engine._deviceSourceManager.registerManager(this);
        this._onDisposeObserver = engine.onDisposeObservable.add(() => {
          this.dispose();
        });
      }
      /**
       * Dispose of DeviceSourceManager
       */
      dispose() {
        this.onDeviceConnectedObservable.clear();
        this.onDeviceDisconnectedObservable.clear();
        if (this._engine._deviceSourceManager) {
          this._engine._deviceSourceManager.unregisterManager(this);
          if (--this._engine._deviceSourceManager._refCount < 1) {
            this._engine._deviceSourceManager.dispose();
            delete this._engine._deviceSourceManager;
          }
        }
        this._engine.onDisposeObservable.remove(this._onDisposeObserver);
      }
      // Hidden Functions
      /**
       * @param deviceSource - Source to add
       * @internal
       */
      _addDevice(deviceSource) {
        if (!this._devices[deviceSource.deviceType]) {
          this._devices[deviceSource.deviceType] = new Array();
        }
        if (!this._devices[deviceSource.deviceType][deviceSource.deviceSlot]) {
          this._devices[deviceSource.deviceType][deviceSource.deviceSlot] = deviceSource;
          this._updateFirstDevices(deviceSource.deviceType);
        }
        this.onDeviceConnectedObservable.notifyObservers(deviceSource);
      }
      /**
       * @param deviceType - DeviceType
       * @param deviceSlot - DeviceSlot
       * @internal
       */
      _removeDevice(deviceType, deviceSlot) {
        var _a, _b;
        const deviceSource = (_a = this._devices[deviceType]) == null ? void 0 : _a[deviceSlot];
        this.onDeviceDisconnectedObservable.notifyObservers(deviceSource);
        if ((_b = this._devices[deviceType]) == null ? void 0 : _b[deviceSlot]) {
          delete this._devices[deviceType][deviceSlot];
        }
        this._updateFirstDevices(deviceType);
      }
      /**
       * @param deviceType - DeviceType
       * @param deviceSlot - DeviceSlot
       * @param eventData - Event
       * @internal
       */
      _onInputChanged(deviceType, deviceSlot, eventData) {
        var _a, _b;
        (_b = (_a = this._devices[deviceType]) == null ? void 0 : _a[deviceSlot]) == null ? void 0 : _b.onInputChangedObservable.notifyObservers(eventData);
      }
      // Private Functions
      _updateFirstDevices(type) {
        switch (type) {
          case DeviceType.Keyboard:
          case DeviceType.Mouse:
            this._firstDevice[type] = 0;
            break;
          case DeviceType.Touch:
          case DeviceType.DualSense:
          case DeviceType.DualShock:
          case DeviceType.Xbox:
          case DeviceType.Switch:
          case DeviceType.Generic: {
            delete this._firstDevice[type];
            const devices = this._devices[type];
            if (devices) {
              for (let i = 0; i < devices.length; i++) {
                if (devices[i]) {
                  this._firstDevice[type] = i;
                  break;
                }
              }
            }
            break;
          }
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Inputs/scene.inputManager.js
var _ClickInfo, InputManager;
var init_scene_inputManager = __esm({
  "node_modules/@babylonjs/core/Inputs/scene.inputManager.js"() {
    init_pointerEvents();
    init_abstractActionManager();
    init_pickingInfo();
    init_math_vector();
    init_actionEvent();
    init_keyboardEvents();
    init_deviceEnums();
    init_deviceSourceManager();
    init_engineStore();
    _ClickInfo = class {
      constructor() {
        this._singleClick = false;
        this._doubleClick = false;
        this._hasSwiped = false;
        this._ignore = false;
      }
      get singleClick() {
        return this._singleClick;
      }
      get doubleClick() {
        return this._doubleClick;
      }
      get hasSwiped() {
        return this._hasSwiped;
      }
      get ignore() {
        return this._ignore;
      }
      set singleClick(b) {
        this._singleClick = b;
      }
      set doubleClick(b) {
        this._doubleClick = b;
      }
      set hasSwiped(b) {
        this._hasSwiped = b;
      }
      set ignore(b) {
        this._ignore = b;
      }
    };
    InputManager = class _InputManager {
      /**
       * Creates a new InputManager
       * @param scene - defines the hosting scene
       */
      constructor(scene) {
        this._alreadyAttached = false;
        this._meshPickProceed = false;
        this._currentPickResult = null;
        this._previousPickResult = null;
        this._totalPointersPressed = 0;
        this._doubleClickOccured = false;
        this._isSwiping = false;
        this._swipeButtonPressed = -1;
        this._skipPointerTap = false;
        this._isMultiTouchGesture = false;
        this._pointerX = 0;
        this._pointerY = 0;
        this._startingPointerPosition = new Vector2(0, 0);
        this._previousStartingPointerPosition = new Vector2(0, 0);
        this._startingPointerTime = 0;
        this._previousStartingPointerTime = 0;
        this._pointerCaptures = {};
        this._meshUnderPointerId = {};
        this._movePointerInfo = null;
        this._cameraObserverCount = 0;
        this._delayedClicks = [null, null, null, null, null];
        this._deviceSourceManager = null;
        this._scene = scene || EngineStore.LastCreatedScene;
        if (!this._scene) {
          return;
        }
      }
      /**
       * Gets the mesh that is currently under the pointer
       * @returns Mesh that the pointer is pointer is hovering over
       */
      get meshUnderPointer() {
        if (this._movePointerInfo) {
          this._movePointerInfo._generatePickInfo();
          this._movePointerInfo = null;
        }
        return this._pointerOverMesh;
      }
      /**
       * When using more than one pointer (for example in XR) you can get the mesh under the specific pointer
       * @param pointerId - the pointer id to use
       * @returns The mesh under this pointer id or null if not found
       */
      getMeshUnderPointerByPointerId(pointerId) {
        return this._meshUnderPointerId[pointerId] || null;
      }
      /**
       * Gets the pointer coordinates in 2D without any translation (ie. straight out of the pointer event)
       * @returns Vector with X/Y values directly from pointer event
       */
      get unTranslatedPointer() {
        return new Vector2(this._unTranslatedPointerX, this._unTranslatedPointerY);
      }
      /**
       * Gets or sets the current on-screen X position of the pointer
       * @returns Translated X with respect to screen
       */
      get pointerX() {
        return this._pointerX;
      }
      set pointerX(value) {
        this._pointerX = value;
      }
      /**
       * Gets or sets the current on-screen Y position of the pointer
       * @returns Translated Y with respect to screen
       */
      get pointerY() {
        return this._pointerY;
      }
      set pointerY(value) {
        this._pointerY = value;
      }
      _updatePointerPosition(evt) {
        const canvasRect = this._scene.getEngine().getInputElementClientRect();
        if (!canvasRect) {
          return;
        }
        this._pointerX = evt.clientX - canvasRect.left;
        this._pointerY = evt.clientY - canvasRect.top;
        this._unTranslatedPointerX = this._pointerX;
        this._unTranslatedPointerY = this._pointerY;
      }
      _processPointerMove(pickResult, evt) {
        const scene = this._scene;
        const engine = scene.getEngine();
        const canvas = engine.getInputElement();
        if (canvas) {
          canvas.tabIndex = engine.canvasTabIndex;
          if (!scene.doNotHandleCursors) {
            canvas.style.cursor = scene.defaultCursor;
          }
        }
        this._setCursorAndPointerOverMesh(pickResult, evt, scene);
        for (const step of scene._pointerMoveStage) {
          pickResult = pickResult || this._pickMove(evt);
          const isMeshPicked = (pickResult == null ? void 0 : pickResult.pickedMesh) ? true : false;
          pickResult = step.action(this._unTranslatedPointerX, this._unTranslatedPointerY, pickResult, isMeshPicked, canvas);
        }
        const type = evt.inputIndex >= PointerInput.MouseWheelX && evt.inputIndex <= PointerInput.MouseWheelZ ? PointerEventTypes.POINTERWHEEL : PointerEventTypes.POINTERMOVE;
        if (scene.onPointerMove) {
          pickResult = pickResult || this._pickMove(evt);
          scene.onPointerMove(evt, pickResult, type);
        }
        let pointerInfo;
        if (pickResult) {
          pointerInfo = new PointerInfo(type, evt, pickResult);
          this._setRayOnPointerInfo(pickResult, evt);
        } else {
          pointerInfo = new PointerInfo(type, evt, null, this);
          this._movePointerInfo = pointerInfo;
        }
        if (scene.onPointerObservable.hasObservers()) {
          scene.onPointerObservable.notifyObservers(pointerInfo, type);
        }
      }
      // Pointers handling
      /** @internal */
      _setRayOnPointerInfo(pickInfo, event) {
        const scene = this._scene;
        if (pickInfo && scene._pickingAvailable) {
          if (!pickInfo.ray) {
            pickInfo.ray = scene.createPickingRay(event.offsetX, event.offsetY, Matrix.Identity(), scene.activeCamera);
          }
        }
      }
      /** @internal */
      _addCameraPointerObserver(observer, mask) {
        this._cameraObserverCount++;
        return this._scene.onPointerObservable.add(observer, mask);
      }
      /** @internal */
      _removeCameraPointerObserver(observer) {
        this._cameraObserverCount--;
        return this._scene.onPointerObservable.remove(observer);
      }
      _checkForPicking() {
        return !!(this._scene.onPointerObservable.observers.length > this._cameraObserverCount || this._scene.onPointerPick);
      }
      _checkPrePointerObservable(pickResult, evt, type) {
        const scene = this._scene;
        const pi = new PointerInfoPre(type, evt, this._unTranslatedPointerX, this._unTranslatedPointerY);
        if (pickResult) {
          pi.originalPickingInfo = pickResult;
          pi.ray = pickResult.ray;
          if (evt.pointerType === "xr-near" && pickResult.originMesh) {
            pi.nearInteractionPickingInfo = pickResult;
          }
        }
        scene.onPrePointerObservable.notifyObservers(pi, type);
        if (pi.skipOnPointerObservable) {
          return true;
        } else {
          return false;
        }
      }
      /** @internal */
      _pickMove(evt) {
        const scene = this._scene;
        const pickResult = scene.pick(this._unTranslatedPointerX, this._unTranslatedPointerY, scene.pointerMovePredicate, scene.pointerMoveFastCheck, scene.cameraToUseForPointers, scene.pointerMoveTrianglePredicate);
        this._setCursorAndPointerOverMesh(pickResult, evt, scene);
        return pickResult;
      }
      _setCursorAndPointerOverMesh(pickResult, evt, scene) {
        const engine = scene.getEngine();
        const canvas = engine.getInputElement();
        if (pickResult == null ? void 0 : pickResult.pickedMesh) {
          this.setPointerOverMesh(pickResult.pickedMesh, evt.pointerId, pickResult, evt);
          if (!scene.doNotHandleCursors && canvas && this._pointerOverMesh) {
            const actionManager = this._pointerOverMesh._getActionManagerForTrigger();
            if (actionManager && actionManager.hasPointerTriggers) {
              canvas.style.cursor = actionManager.hoverCursor || scene.hoverCursor;
            }
          }
        } else {
          this.setPointerOverMesh(null, evt.pointerId, pickResult, evt);
        }
      }
      /**
       * Use this method to simulate a pointer move on a mesh
       * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
       * @param pickResult - pickingInfo of the object wished to simulate pointer event on
       * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
       */
      simulatePointerMove(pickResult, pointerEventInit) {
        const evt = new PointerEvent("pointermove", pointerEventInit);
        evt.inputIndex = PointerInput.Move;
        if (this._checkPrePointerObservable(pickResult, evt, PointerEventTypes.POINTERMOVE)) {
          return;
        }
        this._processPointerMove(pickResult, evt);
      }
      /**
       * Use this method to simulate a pointer down on a mesh
       * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
       * @param pickResult - pickingInfo of the object wished to simulate pointer event on
       * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
       */
      simulatePointerDown(pickResult, pointerEventInit) {
        const evt = new PointerEvent("pointerdown", pointerEventInit);
        evt.inputIndex = evt.button + 2;
        if (this._checkPrePointerObservable(pickResult, evt, PointerEventTypes.POINTERDOWN)) {
          return;
        }
        this._processPointerDown(pickResult, evt);
      }
      _processPointerDown(pickResult, evt) {
        const scene = this._scene;
        if (pickResult == null ? void 0 : pickResult.pickedMesh) {
          this._pickedDownMesh = pickResult.pickedMesh;
          const actionManager = pickResult.pickedMesh._getActionManagerForTrigger();
          if (actionManager) {
            if (actionManager.hasPickTriggers) {
              actionManager.processTrigger(5, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
              switch (evt.button) {
                case 0:
                  actionManager.processTrigger(2, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
                  break;
                case 1:
                  actionManager.processTrigger(4, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
                  break;
                case 2:
                  actionManager.processTrigger(3, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
                  break;
              }
            }
            if (actionManager.hasSpecificTrigger(8)) {
              window.setTimeout(() => {
                const pickResult2 = scene.pick(this._unTranslatedPointerX, this._unTranslatedPointerY, (mesh) => mesh.isPickable && mesh.isVisible && mesh.isReady() && mesh.actionManager && mesh.actionManager.hasSpecificTrigger(8) && mesh === this._pickedDownMesh, false, scene.cameraToUseForPointers);
                if ((pickResult2 == null ? void 0 : pickResult2.pickedMesh) && actionManager) {
                  if (this._totalPointersPressed !== 0 && Date.now() - this._startingPointerTime > _InputManager.LongPressDelay && !this._isPointerSwiping()) {
                    this._startingPointerTime = 0;
                    actionManager.processTrigger(8, ActionEvent.CreateNew(pickResult2.pickedMesh, evt));
                  }
                }
              }, _InputManager.LongPressDelay);
            }
          }
        } else {
          for (const step of scene._pointerDownStage) {
            pickResult = step.action(this._unTranslatedPointerX, this._unTranslatedPointerY, pickResult, evt, false);
          }
        }
        let pointerInfo;
        const type = PointerEventTypes.POINTERDOWN;
        if (pickResult) {
          if (scene.onPointerDown) {
            scene.onPointerDown(evt, pickResult, type);
          }
          pointerInfo = new PointerInfo(type, evt, pickResult);
          this._setRayOnPointerInfo(pickResult, evt);
        } else {
          pointerInfo = new PointerInfo(type, evt, null, this);
        }
        if (scene.onPointerObservable.hasObservers()) {
          scene.onPointerObservable.notifyObservers(pointerInfo, type);
        }
      }
      /**
       * @internal
       * @internals Boolean if delta for pointer exceeds drag movement threshold
       */
      _isPointerSwiping() {
        return this._isSwiping;
      }
      /**
       * Use this method to simulate a pointer up on a mesh
       * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
       * @param pickResult - pickingInfo of the object wished to simulate pointer event on
       * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
       * @param doubleTap - indicates that the pointer up event should be considered as part of a double click (false by default)
       */
      simulatePointerUp(pickResult, pointerEventInit, doubleTap) {
        const evt = new PointerEvent("pointerup", pointerEventInit);
        evt.inputIndex = PointerInput.Move;
        const clickInfo = new _ClickInfo();
        if (doubleTap) {
          clickInfo.doubleClick = true;
        } else {
          clickInfo.singleClick = true;
        }
        if (this._checkPrePointerObservable(pickResult, evt, PointerEventTypes.POINTERUP)) {
          return;
        }
        this._processPointerUp(pickResult, evt, clickInfo);
      }
      _processPointerUp(pickResult, evt, clickInfo) {
        const scene = this._scene;
        if (pickResult == null ? void 0 : pickResult.pickedMesh) {
          this._pickedUpMesh = pickResult.pickedMesh;
          if (this._pickedDownMesh === this._pickedUpMesh) {
            if (scene.onPointerPick) {
              scene.onPointerPick(evt, pickResult);
            }
            if (clickInfo.singleClick && !clickInfo.ignore && scene.onPointerObservable.observers.length > this._cameraObserverCount) {
              const type = PointerEventTypes.POINTERPICK;
              const pi = new PointerInfo(type, evt, pickResult);
              this._setRayOnPointerInfo(pickResult, evt);
              scene.onPointerObservable.notifyObservers(pi, type);
            }
          }
          const actionManager = pickResult.pickedMesh._getActionManagerForTrigger();
          if (actionManager && !clickInfo.ignore) {
            actionManager.processTrigger(7, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
            if (!clickInfo.hasSwiped && clickInfo.singleClick) {
              actionManager.processTrigger(1, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
            }
            const doubleClickActionManager = pickResult.pickedMesh._getActionManagerForTrigger(6);
            if (clickInfo.doubleClick && doubleClickActionManager) {
              doubleClickActionManager.processTrigger(6, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
            }
          }
        } else {
          if (!clickInfo.ignore) {
            for (const step of scene._pointerUpStage) {
              pickResult = step.action(this._unTranslatedPointerX, this._unTranslatedPointerY, pickResult, evt, clickInfo.doubleClick);
            }
          }
        }
        if (this._pickedDownMesh && this._pickedDownMesh !== this._pickedUpMesh) {
          const pickedDownActionManager = this._pickedDownMesh._getActionManagerForTrigger(16);
          if (pickedDownActionManager) {
            pickedDownActionManager.processTrigger(16, ActionEvent.CreateNew(this._pickedDownMesh, evt));
          }
        }
        if (!clickInfo.ignore) {
          const pi = new PointerInfo(PointerEventTypes.POINTERUP, evt, pickResult);
          this._setRayOnPointerInfo(pickResult, evt);
          scene.onPointerObservable.notifyObservers(pi, PointerEventTypes.POINTERUP);
          if (scene.onPointerUp) {
            scene.onPointerUp(evt, pickResult, PointerEventTypes.POINTERUP);
          }
          if (!clickInfo.hasSwiped && !this._skipPointerTap && !this._isMultiTouchGesture) {
            let type = 0;
            if (clickInfo.singleClick) {
              type = PointerEventTypes.POINTERTAP;
            } else if (clickInfo.doubleClick) {
              type = PointerEventTypes.POINTERDOUBLETAP;
            }
            if (type) {
              const pi2 = new PointerInfo(type, evt, pickResult);
              if (scene.onPointerObservable.hasObservers() && scene.onPointerObservable.hasSpecificMask(type)) {
                scene.onPointerObservable.notifyObservers(pi2, type);
              }
            }
          }
        }
      }
      /**
       * Gets a boolean indicating if the current pointer event is captured (meaning that the scene has already handled the pointer down)
       * @param pointerId - defines the pointer id to use in a multi-touch scenario (0 by default)
       * @returns true if the pointer was captured
       */
      isPointerCaptured(pointerId = 0) {
        return this._pointerCaptures[pointerId];
      }
      /**
       * Attach events to the canvas (To handle actionManagers triggers and raise onPointerMove, onPointerDown and onPointerUp
       * @param attachUp - defines if you want to attach events to pointerup
       * @param attachDown - defines if you want to attach events to pointerdown
       * @param attachMove - defines if you want to attach events to pointermove
       * @param elementToAttachTo - defines the target DOM element to attach to (will use the canvas by default)
       */
      attachControl(attachUp = true, attachDown = true, attachMove = true, elementToAttachTo = null) {
        const scene = this._scene;
        const engine = scene.getEngine();
        if (!elementToAttachTo) {
          elementToAttachTo = engine.getInputElement();
        }
        if (this._alreadyAttached) {
          this.detachControl();
        }
        if (elementToAttachTo) {
          this._alreadyAttachedTo = elementToAttachTo;
        }
        this._deviceSourceManager = new DeviceSourceManager(engine);
        this._initActionManager = (act) => {
          if (!this._meshPickProceed) {
            const pickResult = scene.skipPointerUpPicking || scene._registeredActions === 0 && !this._checkForPicking() && !scene.onPointerUp ? null : scene.pick(this._unTranslatedPointerX, this._unTranslatedPointerY, scene.pointerUpPredicate, scene.pointerUpFastCheck, scene.cameraToUseForPointers, scene.pointerUpTrianglePredicate);
            this._currentPickResult = pickResult;
            if (pickResult) {
              act = pickResult.hit && pickResult.pickedMesh ? pickResult.pickedMesh._getActionManagerForTrigger() : null;
            }
            this._meshPickProceed = true;
          }
          return act;
        };
        this._delayedSimpleClick = (btn, clickInfo, cb) => {
          if (Date.now() - this._previousStartingPointerTime > _InputManager.DoubleClickDelay && !this._doubleClickOccured || btn !== this._previousButtonPressed) {
            this._doubleClickOccured = false;
            clickInfo.singleClick = true;
            clickInfo.ignore = false;
            if (this._delayedClicks[btn]) {
              const evt = this._delayedClicks[btn].evt;
              const type = PointerEventTypes.POINTERTAP;
              const pi = new PointerInfo(type, evt, this._currentPickResult);
              if (scene.onPointerObservable.hasObservers() && scene.onPointerObservable.hasSpecificMask(type)) {
                scene.onPointerObservable.notifyObservers(pi, type);
              }
              this._delayedClicks[btn] = null;
            }
          }
        };
        this._initClickEvent = (obs1, obs2, evt, cb) => {
          var _a, _b;
          const clickInfo = new _ClickInfo();
          this._currentPickResult = null;
          let act = null;
          let checkPicking = obs1.hasSpecificMask(PointerEventTypes.POINTERPICK) || obs2.hasSpecificMask(PointerEventTypes.POINTERPICK) || obs1.hasSpecificMask(PointerEventTypes.POINTERTAP) || obs2.hasSpecificMask(PointerEventTypes.POINTERTAP) || obs1.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP) || obs2.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP);
          if (!checkPicking && AbstractActionManager) {
            act = this._initActionManager(act, clickInfo);
            if (act) {
              checkPicking = act.hasPickTriggers;
            }
          }
          let needToIgnoreNext = false;
          if (checkPicking) {
            const btn = evt.button;
            clickInfo.hasSwiped = this._isPointerSwiping();
            if (!clickInfo.hasSwiped) {
              let checkSingleClickImmediately = !_InputManager.ExclusiveDoubleClickMode;
              if (!checkSingleClickImmediately) {
                checkSingleClickImmediately = !obs1.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP) && !obs2.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP);
                if (checkSingleClickImmediately && !AbstractActionManager.HasSpecificTrigger(6)) {
                  act = this._initActionManager(act, clickInfo);
                  if (act) {
                    checkSingleClickImmediately = !act.hasSpecificTrigger(6);
                  }
                }
              }
              if (checkSingleClickImmediately) {
                if (Date.now() - this._previousStartingPointerTime > _InputManager.DoubleClickDelay || btn !== this._previousButtonPressed) {
                  clickInfo.singleClick = true;
                  cb(clickInfo, this._currentPickResult);
                  needToIgnoreNext = true;
                }
              } else {
                const delayedClick = {
                  evt,
                  clickInfo,
                  timeoutId: window.setTimeout(this._delayedSimpleClick.bind(this, btn, clickInfo, cb), _InputManager.DoubleClickDelay)
                };
                this._delayedClicks[btn] = delayedClick;
              }
              let checkDoubleClick = obs1.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP) || obs2.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP);
              if (!checkDoubleClick && AbstractActionManager.HasSpecificTrigger(6)) {
                act = this._initActionManager(act, clickInfo);
                if (act) {
                  checkDoubleClick = act.hasSpecificTrigger(6);
                }
              }
              if (checkDoubleClick) {
                if (btn === this._previousButtonPressed && Date.now() - this._previousStartingPointerTime < _InputManager.DoubleClickDelay && !this._doubleClickOccured) {
                  if (!clickInfo.hasSwiped && !this._isPointerSwiping()) {
                    this._previousStartingPointerTime = 0;
                    this._doubleClickOccured = true;
                    clickInfo.doubleClick = true;
                    clickInfo.ignore = false;
                    if (_InputManager.ExclusiveDoubleClickMode && this._delayedClicks[btn]) {
                      clearTimeout((_a = this._delayedClicks[btn]) == null ? void 0 : _a.timeoutId);
                      this._delayedClicks[btn] = null;
                    }
                    cb(clickInfo, this._currentPickResult);
                  } else {
                    this._doubleClickOccured = false;
                    this._previousStartingPointerTime = this._startingPointerTime;
                    this._previousStartingPointerPosition.x = this._startingPointerPosition.x;
                    this._previousStartingPointerPosition.y = this._startingPointerPosition.y;
                    this._previousButtonPressed = btn;
                    if (_InputManager.ExclusiveDoubleClickMode) {
                      if (this._delayedClicks[btn]) {
                        clearTimeout((_b = this._delayedClicks[btn]) == null ? void 0 : _b.timeoutId);
                        this._delayedClicks[btn] = null;
                      }
                      cb(clickInfo, this._previousPickResult);
                    } else {
                      cb(clickInfo, this._currentPickResult);
                    }
                  }
                  needToIgnoreNext = true;
                } else {
                  this._doubleClickOccured = false;
                  this._previousStartingPointerTime = this._startingPointerTime;
                  this._previousStartingPointerPosition.x = this._startingPointerPosition.x;
                  this._previousStartingPointerPosition.y = this._startingPointerPosition.y;
                  this._previousButtonPressed = btn;
                }
              }
            }
          }
          if (!needToIgnoreNext) {
            cb(clickInfo, this._currentPickResult);
          }
        };
        this._onPointerMove = (evt) => {
          this._updatePointerPosition(evt);
          if (!this._isSwiping && this._swipeButtonPressed !== -1) {
            this._isSwiping = Math.abs(this._startingPointerPosition.x - this._pointerX) > _InputManager.DragMovementThreshold || Math.abs(this._startingPointerPosition.y - this._pointerY) > _InputManager.DragMovementThreshold;
          }
          if (engine.isPointerLock) {
            engine._verifyPointerLock();
          }
          if (this._checkPrePointerObservable(null, evt, evt.inputIndex >= PointerInput.MouseWheelX && evt.inputIndex <= PointerInput.MouseWheelZ ? PointerEventTypes.POINTERWHEEL : PointerEventTypes.POINTERMOVE)) {
            return;
          }
          if (!scene.cameraToUseForPointers && !scene.activeCamera) {
            return;
          }
          if (scene.skipPointerMovePicking) {
            this._processPointerMove(new PickingInfo(), evt);
            return;
          }
          if (!scene.pointerMovePredicate) {
            scene.pointerMovePredicate = (mesh) => mesh.isPickable && mesh.isVisible && mesh.isReady() && mesh.isEnabled() && (mesh.enablePointerMoveEvents || scene.constantlyUpdateMeshUnderPointer || mesh._getActionManagerForTrigger() !== null) && (!scene.cameraToUseForPointers || (scene.cameraToUseForPointers.layerMask & mesh.layerMask) !== 0);
          }
          const pickResult = scene._registeredActions > 0 || scene.constantlyUpdateMeshUnderPointer ? this._pickMove(evt) : null;
          this._processPointerMove(pickResult, evt);
        };
        this._onPointerDown = (evt) => {
          var _a;
          this._totalPointersPressed++;
          this._pickedDownMesh = null;
          this._meshPickProceed = false;
          if (_InputManager.ExclusiveDoubleClickMode) {
            for (let i = 0; i < this._delayedClicks.length; i++) {
              if (this._delayedClicks[i]) {
                if (evt.button === i) {
                  clearTimeout((_a = this._delayedClicks[i]) == null ? void 0 : _a.timeoutId);
                } else {
                  const clickInfo = this._delayedClicks[i].clickInfo;
                  this._doubleClickOccured = false;
                  clickInfo.singleClick = true;
                  clickInfo.ignore = false;
                  const prevEvt = this._delayedClicks[i].evt;
                  const type = PointerEventTypes.POINTERTAP;
                  const pi = new PointerInfo(type, prevEvt, this._currentPickResult);
                  if (scene.onPointerObservable.hasObservers() && scene.onPointerObservable.hasSpecificMask(type)) {
                    scene.onPointerObservable.notifyObservers(pi, type);
                  }
                  this._delayedClicks[i] = null;
                }
              }
            }
          }
          this._updatePointerPosition(evt);
          if (this._swipeButtonPressed === -1) {
            this._swipeButtonPressed = evt.button;
          }
          if (scene.preventDefaultOnPointerDown && elementToAttachTo) {
            evt.preventDefault();
            elementToAttachTo.focus();
          }
          this._startingPointerPosition.x = this._pointerX;
          this._startingPointerPosition.y = this._pointerY;
          this._startingPointerTime = Date.now();
          if (this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERDOWN)) {
            return;
          }
          if (!scene.cameraToUseForPointers && !scene.activeCamera) {
            return;
          }
          this._pointerCaptures[evt.pointerId] = true;
          if (!scene.pointerDownPredicate) {
            scene.pointerDownPredicate = (mesh) => {
              return mesh.isPickable && mesh.isVisible && mesh.isReady() && mesh.isEnabled() && (!scene.cameraToUseForPointers || (scene.cameraToUseForPointers.layerMask & mesh.layerMask) !== 0);
            };
          }
          this._pickedDownMesh = null;
          let pickResult;
          if (scene.skipPointerDownPicking || scene._registeredActions === 0 && !this._checkForPicking() && !scene.onPointerDown) {
            pickResult = new PickingInfo();
          } else {
            pickResult = scene.pick(this._unTranslatedPointerX, this._unTranslatedPointerY, scene.pointerDownPredicate, scene.pointerDownFastCheck, scene.cameraToUseForPointers, scene.pointerDownTrianglePredicate);
          }
          this._processPointerDown(pickResult, evt);
        };
        this._onPointerUp = (evt) => {
          if (this._totalPointersPressed === 0) {
            return;
          }
          this._totalPointersPressed--;
          this._pickedUpMesh = null;
          this._meshPickProceed = false;
          this._updatePointerPosition(evt);
          if (scene.preventDefaultOnPointerUp && elementToAttachTo) {
            evt.preventDefault();
            elementToAttachTo.focus();
          }
          this._initClickEvent(scene.onPrePointerObservable, scene.onPointerObservable, evt, (clickInfo, pickResult) => {
            if (scene.onPrePointerObservable.hasObservers()) {
              this._skipPointerTap = false;
              if (!clickInfo.ignore) {
                if (this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERUP)) {
                  if (this._swipeButtonPressed === evt.button) {
                    this._isSwiping = false;
                    this._swipeButtonPressed = -1;
                  }
                  if (evt.buttons === 0) {
                    this._pointerCaptures[evt.pointerId] = false;
                  }
                  return;
                }
                if (!clickInfo.hasSwiped) {
                  if (clickInfo.singleClick && scene.onPrePointerObservable.hasSpecificMask(PointerEventTypes.POINTERTAP)) {
                    if (this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERTAP)) {
                      this._skipPointerTap = true;
                    }
                  }
                  if (clickInfo.doubleClick && scene.onPrePointerObservable.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP)) {
                    if (this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERDOUBLETAP)) {
                      this._skipPointerTap = true;
                    }
                  }
                }
              }
            }
            if (!this._pointerCaptures[evt.pointerId]) {
              if (this._swipeButtonPressed === evt.button) {
                this._isSwiping = false;
                this._swipeButtonPressed = -1;
              }
              return;
            }
            if (evt.buttons === 0) {
              this._pointerCaptures[evt.pointerId] = false;
            }
            if (!scene.cameraToUseForPointers && !scene.activeCamera) {
              return;
            }
            if (!scene.pointerUpPredicate) {
              scene.pointerUpPredicate = (mesh) => {
                return mesh.isPickable && mesh.isVisible && mesh.isReady() && mesh.isEnabled() && (!scene.cameraToUseForPointers || (scene.cameraToUseForPointers.layerMask & mesh.layerMask) !== 0);
              };
            }
            if (!this._meshPickProceed && (AbstractActionManager && AbstractActionManager.HasTriggers || this._checkForPicking() || scene.onPointerUp)) {
              this._initActionManager(null, clickInfo);
            }
            if (!pickResult) {
              pickResult = this._currentPickResult;
            }
            this._processPointerUp(pickResult, evt, clickInfo);
            this._previousPickResult = this._currentPickResult;
            if (this._swipeButtonPressed === evt.button) {
              this._isSwiping = false;
              this._swipeButtonPressed = -1;
            }
          });
        };
        this._onKeyDown = (evt) => {
          const type = KeyboardEventTypes.KEYDOWN;
          if (scene.onPreKeyboardObservable.hasObservers()) {
            const pi = new KeyboardInfoPre(type, evt);
            scene.onPreKeyboardObservable.notifyObservers(pi, type);
            if (pi.skipOnKeyboardObservable) {
              return;
            }
          }
          if (scene.onKeyboardObservable.hasObservers()) {
            const pi = new KeyboardInfo(type, evt);
            scene.onKeyboardObservable.notifyObservers(pi, type);
          }
          if (scene.actionManager) {
            scene.actionManager.processTrigger(14, ActionEvent.CreateNewFromScene(scene, evt));
          }
        };
        this._onKeyUp = (evt) => {
          const type = KeyboardEventTypes.KEYUP;
          if (scene.onPreKeyboardObservable.hasObservers()) {
            const pi = new KeyboardInfoPre(type, evt);
            scene.onPreKeyboardObservable.notifyObservers(pi, type);
            if (pi.skipOnKeyboardObservable) {
              return;
            }
          }
          if (scene.onKeyboardObservable.hasObservers()) {
            const pi = new KeyboardInfo(type, evt);
            scene.onKeyboardObservable.notifyObservers(pi, type);
          }
          if (scene.actionManager) {
            scene.actionManager.processTrigger(15, ActionEvent.CreateNewFromScene(scene, evt));
          }
        };
        this._deviceSourceManager.onDeviceConnectedObservable.add((deviceSource) => {
          if (deviceSource.deviceType === DeviceType.Mouse) {
            deviceSource.onInputChangedObservable.add((eventData) => {
              if (eventData.inputIndex === PointerInput.LeftClick || eventData.inputIndex === PointerInput.MiddleClick || eventData.inputIndex === PointerInput.RightClick || eventData.inputIndex === PointerInput.BrowserBack || eventData.inputIndex === PointerInput.BrowserForward) {
                if (attachDown && deviceSource.getInput(eventData.inputIndex) === 1) {
                  this._onPointerDown(eventData);
                } else if (attachUp && deviceSource.getInput(eventData.inputIndex) === 0) {
                  this._onPointerUp(eventData);
                }
              } else if (attachMove) {
                if (eventData.inputIndex === PointerInput.Move) {
                  this._onPointerMove(eventData);
                } else if (eventData.inputIndex === PointerInput.MouseWheelX || eventData.inputIndex === PointerInput.MouseWheelY || eventData.inputIndex === PointerInput.MouseWheelZ) {
                  this._onPointerMove(eventData);
                }
              }
            });
          } else if (deviceSource.deviceType === DeviceType.Touch) {
            deviceSource.onInputChangedObservable.add((eventData) => {
              if (eventData.inputIndex === PointerInput.LeftClick) {
                if (attachDown && deviceSource.getInput(eventData.inputIndex) === 1) {
                  this._onPointerDown(eventData);
                  if (this._totalPointersPressed > 1) {
                    this._isMultiTouchGesture = true;
                  }
                } else if (attachUp && deviceSource.getInput(eventData.inputIndex) === 0) {
                  this._onPointerUp(eventData);
                  if (this._totalPointersPressed === 0) {
                    this._isMultiTouchGesture = false;
                  }
                }
              }
              if (attachMove && eventData.inputIndex === PointerInput.Move) {
                this._onPointerMove(eventData);
              }
            });
          } else if (deviceSource.deviceType === DeviceType.Keyboard) {
            deviceSource.onInputChangedObservable.add((eventData) => {
              if (eventData.type === "keydown") {
                this._onKeyDown(eventData);
              } else if (eventData.type === "keyup") {
                this._onKeyUp(eventData);
              }
            });
          }
        });
        this._alreadyAttached = true;
      }
      /**
       * Detaches all event handlers
       */
      detachControl() {
        if (this._alreadyAttached) {
          this._deviceSourceManager.dispose();
          this._deviceSourceManager = null;
          if (this._alreadyAttachedTo && !this._scene.doNotHandleCursors) {
            this._alreadyAttachedTo.style.cursor = this._scene.defaultCursor;
          }
          this._alreadyAttached = false;
          this._alreadyAttachedTo = null;
        }
      }
      /**
       * Force the value of meshUnderPointer
       * @param mesh - defines the mesh to use
       * @param pointerId - optional pointer id when using more than one pointer. Defaults to 0
       * @param pickResult - optional pickingInfo data used to find mesh
       * @param evt - optional pointer event
       */
      setPointerOverMesh(mesh, pointerId = 0, pickResult, evt) {
        if (this._meshUnderPointerId[pointerId] === mesh && (!mesh || !mesh._internalAbstractMeshDataInfo._pointerOverDisableMeshTesting)) {
          return;
        }
        const underPointerMesh = this._meshUnderPointerId[pointerId];
        let actionManager;
        if (underPointerMesh) {
          actionManager = underPointerMesh._getActionManagerForTrigger(10);
          if (actionManager) {
            actionManager.processTrigger(10, ActionEvent.CreateNew(underPointerMesh, evt, { pointerId }));
          }
        }
        if (mesh) {
          this._meshUnderPointerId[pointerId] = mesh;
          this._pointerOverMesh = mesh;
          actionManager = mesh._getActionManagerForTrigger(9);
          if (actionManager) {
            actionManager.processTrigger(9, ActionEvent.CreateNew(mesh, evt, { pointerId, pickResult }));
          }
        } else {
          delete this._meshUnderPointerId[pointerId];
          this._pointerOverMesh = null;
        }
      }
      /**
       * Gets the mesh under the pointer
       * @returns a Mesh or null if no mesh is under the pointer
       */
      getPointerOverMesh() {
        return this.meshUnderPointer;
      }
      /**
       * @param mesh - Mesh to invalidate
       * @internal
       */
      _invalidateMesh(mesh) {
        if (this._pointerOverMesh === mesh) {
          this._pointerOverMesh = null;
        }
        if (this._pickedDownMesh === mesh) {
          this._pickedDownMesh = null;
        }
        if (this._pickedUpMesh === mesh) {
          this._pickedUpMesh = null;
        }
        for (const pointerId in this._meshUnderPointerId) {
          if (this._meshUnderPointerId[pointerId] === mesh) {
            delete this._meshUnderPointerId[pointerId];
          }
        }
      }
    };
    InputManager.DragMovementThreshold = 10;
    InputManager.LongPressDelay = 500;
    InputManager.DoubleClickDelay = 300;
    InputManager.ExclusiveDoubleClickMode = false;
  }
});

// node_modules/@babylonjs/core/Maths/math.plane.js
var Plane;
var init_math_plane = __esm({
  "node_modules/@babylonjs/core/Maths/math.plane.js"() {
    init_math_vector();
    Plane = class _Plane {
      /**
       * Creates a Plane object according to the given floats a, b, c, d and the plane equation : ax + by + cz + d = 0
       * @param a a component of the plane
       * @param b b component of the plane
       * @param c c component of the plane
       * @param d d component of the plane
       */
      constructor(a, b, c, d) {
        this.normal = new Vector3(a, b, c);
        this.d = d;
      }
      /**
       * @returns the plane coordinates as a new array of 4 elements [a, b, c, d].
       */
      asArray() {
        return [this.normal.x, this.normal.y, this.normal.z, this.d];
      }
      // Methods
      /**
       * @returns a new plane copied from the current Plane.
       */
      clone() {
        return new _Plane(this.normal.x, this.normal.y, this.normal.z, this.d);
      }
      /**
       * @returns the string "Plane".
       */
      getClassName() {
        return "Plane";
      }
      /**
       * @returns the Plane hash code.
       */
      getHashCode() {
        let hash = this.normal.getHashCode();
        hash = hash * 397 ^ (this.d | 0);
        return hash;
      }
      /**
       * Normalize the current Plane in place.
       * @returns the updated Plane.
       */
      normalize() {
        const norm = Math.sqrt(this.normal.x * this.normal.x + this.normal.y * this.normal.y + this.normal.z * this.normal.z);
        let magnitude = 0;
        if (norm !== 0) {
          magnitude = 1 / norm;
        }
        this.normal.x *= magnitude;
        this.normal.y *= magnitude;
        this.normal.z *= magnitude;
        this.d *= magnitude;
        return this;
      }
      /**
       * Applies a transformation the plane and returns the result
       * @param transformation the transformation matrix to be applied to the plane
       * @returns a new Plane as the result of the transformation of the current Plane by the given matrix.
       */
      transform(transformation) {
        const invertedMatrix = _Plane._TmpMatrix;
        transformation.invertToRef(invertedMatrix);
        const m = invertedMatrix.m;
        const x = this.normal.x;
        const y = this.normal.y;
        const z = this.normal.z;
        const d = this.d;
        const normalX = x * m[0] + y * m[1] + z * m[2] + d * m[3];
        const normalY = x * m[4] + y * m[5] + z * m[6] + d * m[7];
        const normalZ = x * m[8] + y * m[9] + z * m[10] + d * m[11];
        const finalD = x * m[12] + y * m[13] + z * m[14] + d * m[15];
        return new _Plane(normalX, normalY, normalZ, finalD);
      }
      /**
       * Compute the dot product between the point and the plane normal
       * @param point point to calculate the dot product with
       * @returns the dot product (float) of the point coordinates and the plane normal.
       */
      dotCoordinate(point) {
        return this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.d;
      }
      /**
       * Updates the current Plane from the plane defined by the three given points.
       * @param point1 one of the points used to construct the plane
       * @param point2 one of the points used to construct the plane
       * @param point3 one of the points used to construct the plane
       * @returns the updated Plane.
       */
      copyFromPoints(point1, point2, point3) {
        const x1 = point2.x - point1.x;
        const y1 = point2.y - point1.y;
        const z1 = point2.z - point1.z;
        const x2 = point3.x - point1.x;
        const y2 = point3.y - point1.y;
        const z2 = point3.z - point1.z;
        const yz = y1 * z2 - z1 * y2;
        const xz = z1 * x2 - x1 * z2;
        const xy = x1 * y2 - y1 * x2;
        const pyth = Math.sqrt(yz * yz + xz * xz + xy * xy);
        let invPyth;
        if (pyth !== 0) {
          invPyth = 1 / pyth;
        } else {
          invPyth = 0;
        }
        this.normal.x = yz * invPyth;
        this.normal.y = xz * invPyth;
        this.normal.z = xy * invPyth;
        this.d = -(this.normal.x * point1.x + this.normal.y * point1.y + this.normal.z * point1.z);
        return this;
      }
      /**
       * Checks if the plane is facing a given direction (meaning if the plane's normal is pointing in the opposite direction of the given vector).
       * Note that for this function to work as expected you should make sure that:
       *   - direction and the plane normal are normalized
       *   - epsilon is a number just bigger than -1, something like -0.99 for eg
       * @param direction the direction to check if the plane is facing
       * @param epsilon value the dot product is compared against (returns true if dot <= epsilon)
       * @returns True if the plane is facing the given direction
       */
      isFrontFacingTo(direction, epsilon) {
        const dot = Vector3.Dot(this.normal, direction);
        return dot <= epsilon;
      }
      /**
       * Calculates the distance to a point
       * @param point point to calculate distance to
       * @returns the signed distance (float) from the given point to the Plane.
       */
      signedDistanceTo(point) {
        return Vector3.Dot(point, this.normal) + this.d;
      }
      // Statics
      /**
       * Creates a plane from an  array
       * @param array the array to create a plane from
       * @returns a new Plane from the given array.
       */
      static FromArray(array) {
        return new _Plane(array[0], array[1], array[2], array[3]);
      }
      /**
       * Creates a plane from three points
       * @param point1 point used to create the plane
       * @param point2 point used to create the plane
       * @param point3 point used to create the plane
       * @returns a new Plane defined by the three given points.
       */
      static FromPoints(point1, point2, point3) {
        const result = new _Plane(0, 0, 0, 0);
        result.copyFromPoints(point1, point2, point3);
        return result;
      }
      /**
       * Creates a plane from an origin point and a normal
       * @param origin origin of the plane to be constructed
       * @param normal normal of the plane to be constructed
       * @returns a new Plane the normal vector to this plane at the given origin point.
       */
      static FromPositionAndNormal(origin, normal) {
        const plane = new _Plane(0, 0, 0, 0);
        return this.FromPositionAndNormalToRef(origin, normal, plane);
      }
      /**
       * Updates the given Plane "result" from an origin point and a normal.
       * @param origin origin of the plane to be constructed
       * @param normal the normalized normals of the plane to be constructed
       * @param result defines the Plane where to store the result
       * @returns result input
       */
      static FromPositionAndNormalToRef(origin, normal, result) {
        result.normal.copyFrom(normal);
        result.normal.normalize();
        result.d = -origin.dot(result.normal);
        return result;
      }
      /**
       * Calculates the distance from a plane and a point
       * @param origin origin of the plane to be constructed
       * @param normal normal of the plane to be constructed
       * @param point point to calculate distance to
       * @returns the signed distance between the plane defined by the normal vector at the "origin"" point and the given other point.
       */
      static SignedDistanceToPlaneFromPositionAndNormal(origin, normal, point) {
        const d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
        return Vector3.Dot(point, normal) + d;
      }
    };
    Plane._TmpMatrix = Matrix.Identity();
  }
});

// node_modules/@babylonjs/core/Maths/math.frustum.js
var Frustum;
var init_math_frustum = __esm({
  "node_modules/@babylonjs/core/Maths/math.frustum.js"() {
    init_math_plane();
    Frustum = class _Frustum {
      /**
       * Gets the planes representing the frustum
       * @param transform matrix to be applied to the returned planes
       * @returns a new array of 6 Frustum planes computed by the given transformation matrix.
       */
      static GetPlanes(transform) {
        const frustumPlanes = [];
        for (let index = 0; index < 6; index++) {
          frustumPlanes.push(new Plane(0, 0, 0, 0));
        }
        _Frustum.GetPlanesToRef(transform, frustumPlanes);
        return frustumPlanes;
      }
      /**
       * Gets the near frustum plane transformed by the transform matrix
       * @param transform transformation matrix to be applied to the resulting frustum plane
       * @param frustumPlane the resulting frustum plane
       */
      static GetNearPlaneToRef(transform, frustumPlane) {
        const m = transform.m;
        frustumPlane.normal.x = m[3] + m[2];
        frustumPlane.normal.y = m[7] + m[6];
        frustumPlane.normal.z = m[11] + m[10];
        frustumPlane.d = m[15] + m[14];
        frustumPlane.normalize();
      }
      /**
       * Gets the far frustum plane transformed by the transform matrix
       * @param transform transformation matrix to be applied to the resulting frustum plane
       * @param frustumPlane the resulting frustum plane
       */
      static GetFarPlaneToRef(transform, frustumPlane) {
        const m = transform.m;
        frustumPlane.normal.x = m[3] - m[2];
        frustumPlane.normal.y = m[7] - m[6];
        frustumPlane.normal.z = m[11] - m[10];
        frustumPlane.d = m[15] - m[14];
        frustumPlane.normalize();
      }
      /**
       * Gets the left frustum plane transformed by the transform matrix
       * @param transform transformation matrix to be applied to the resulting frustum plane
       * @param frustumPlane the resulting frustum plane
       */
      static GetLeftPlaneToRef(transform, frustumPlane) {
        const m = transform.m;
        frustumPlane.normal.x = m[3] + m[0];
        frustumPlane.normal.y = m[7] + m[4];
        frustumPlane.normal.z = m[11] + m[8];
        frustumPlane.d = m[15] + m[12];
        frustumPlane.normalize();
      }
      /**
       * Gets the right frustum plane transformed by the transform matrix
       * @param transform transformation matrix to be applied to the resulting frustum plane
       * @param frustumPlane the resulting frustum plane
       */
      static GetRightPlaneToRef(transform, frustumPlane) {
        const m = transform.m;
        frustumPlane.normal.x = m[3] - m[0];
        frustumPlane.normal.y = m[7] - m[4];
        frustumPlane.normal.z = m[11] - m[8];
        frustumPlane.d = m[15] - m[12];
        frustumPlane.normalize();
      }
      /**
       * Gets the top frustum plane transformed by the transform matrix
       * @param transform transformation matrix to be applied to the resulting frustum plane
       * @param frustumPlane the resulting frustum plane
       */
      static GetTopPlaneToRef(transform, frustumPlane) {
        const m = transform.m;
        frustumPlane.normal.x = m[3] - m[1];
        frustumPlane.normal.y = m[7] - m[5];
        frustumPlane.normal.z = m[11] - m[9];
        frustumPlane.d = m[15] - m[13];
        frustumPlane.normalize();
      }
      /**
       * Gets the bottom frustum plane transformed by the transform matrix
       * @param transform transformation matrix to be applied to the resulting frustum plane
       * @param frustumPlane the resulting frustum plane
       */
      static GetBottomPlaneToRef(transform, frustumPlane) {
        const m = transform.m;
        frustumPlane.normal.x = m[3] + m[1];
        frustumPlane.normal.y = m[7] + m[5];
        frustumPlane.normal.z = m[11] + m[9];
        frustumPlane.d = m[15] + m[13];
        frustumPlane.normalize();
      }
      /**
       * Sets the given array "frustumPlanes" with the 6 Frustum planes computed by the given transformation matrix.
       * @param transform transformation matrix to be applied to the resulting frustum planes
       * @param frustumPlanes the resulting frustum planes
       */
      static GetPlanesToRef(transform, frustumPlanes) {
        _Frustum.GetNearPlaneToRef(transform, frustumPlanes[0]);
        _Frustum.GetFarPlaneToRef(transform, frustumPlanes[1]);
        _Frustum.GetLeftPlaneToRef(transform, frustumPlanes[2]);
        _Frustum.GetRightPlaneToRef(transform, frustumPlanes[3]);
        _Frustum.GetTopPlaneToRef(transform, frustumPlanes[4]);
        _Frustum.GetBottomPlaneToRef(transform, frustumPlanes[5]);
      }
      /**
       * Tests if a point is located between the frustum planes.
       * @param point defines the point to test
       * @param frustumPlanes defines the frustum planes to test
       * @returns true if the point is located between the frustum planes
       */
      static IsPointInFrustum(point, frustumPlanes) {
        for (let i = 0; i < 6; i++) {
          if (frustumPlanes[i].dotCoordinate(point) < 0) {
            return false;
          }
        }
        return true;
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/uniqueIdGenerator.js
var UniqueIdGenerator;
var init_uniqueIdGenerator = __esm({
  "node_modules/@babylonjs/core/Misc/uniqueIdGenerator.js"() {
    UniqueIdGenerator = class {
      /**
       * Gets an unique (relatively to the current scene) Id
       */
      static get UniqueId() {
        const result = this._UniqueIdCounter;
        this._UniqueIdCounter++;
        return result;
      }
    };
    UniqueIdGenerator._UniqueIdCounter = 1;
  }
});

// node_modules/@babylonjs/core/Lights/lightConstants.js
var LightConstants;
var init_lightConstants = __esm({
  "node_modules/@babylonjs/core/Lights/lightConstants.js"() {
    LightConstants = class {
      /**
       * Sort function to order lights for rendering.
       * @param a First Light object to compare to second.
       * @param b Second Light object to compare first.
       * @returns -1 to reduce's a's index relative to be, 0 for no change, 1 to increase a's index relative to b.
       */
      static CompareLightsPriority(a, b) {
        if (a.shadowEnabled !== b.shadowEnabled) {
          return (b.shadowEnabled ? 1 : 0) - (a.shadowEnabled ? 1 : 0);
        }
        return b.renderPriority - a.renderPriority;
      }
    };
    LightConstants.FALLOFF_DEFAULT = 0;
    LightConstants.FALLOFF_PHYSICAL = 1;
    LightConstants.FALLOFF_GLTF = 2;
    LightConstants.FALLOFF_STANDARD = 3;
    LightConstants.LIGHTMAP_DEFAULT = 0;
    LightConstants.LIGHTMAP_SPECULAR = 1;
    LightConstants.LIGHTMAP_SHADOWSONLY = 2;
    LightConstants.INTENSITYMODE_AUTOMATIC = 0;
    LightConstants.INTENSITYMODE_LUMINOUSPOWER = 1;
    LightConstants.INTENSITYMODE_LUMINOUSINTENSITY = 2;
    LightConstants.INTENSITYMODE_ILLUMINANCE = 3;
    LightConstants.INTENSITYMODE_LUMINANCE = 4;
    LightConstants.LIGHTTYPEID_POINTLIGHT = 0;
    LightConstants.LIGHTTYPEID_DIRECTIONALLIGHT = 1;
    LightConstants.LIGHTTYPEID_SPOTLIGHT = 2;
    LightConstants.LIGHTTYPEID_HEMISPHERICLIGHT = 3;
  }
});

// node_modules/@babylonjs/core/Inputs/pointerPickingConfiguration.js
var PointerPickingConfiguration;
var init_pointerPickingConfiguration = __esm({
  "node_modules/@babylonjs/core/Inputs/pointerPickingConfiguration.js"() {
    PointerPickingConfiguration = class {
      constructor() {
        this.pointerDownFastCheck = false;
        this.pointerUpFastCheck = false;
        this.pointerMoveFastCheck = false;
        this.skipPointerMovePicking = false;
        this.skipPointerDownPicking = false;
        this.skipPointerUpPicking = false;
      }
    };
  }
});

// node_modules/@babylonjs/core/scene.js
var ScenePerformancePriority, Scene;
var init_scene = __esm({
  "node_modules/@babylonjs/core/scene.js"() {
    init_tools();
    init_precisionDate();
    init_observable();
    init_smartArray();
    init_stringDictionary();
    init_tags();
    init_math_vector();
    init_abstractScene();
    init_imageProcessingConfiguration();
    init_uniformBuffer();
    init_pickingInfo();
    init_actionEvent();
    init_postProcessManager();
    init_renderingManager();
    init_sceneComponent();
    init_domManagement();
    init_engineStore();
    init_devTools();
    init_scene_inputManager();
    init_perfCounter();
    init_math_color();
    init_math_frustum();
    init_uniqueIdGenerator();
    init_fileTools();
    init_lightConstants();
    init_arrayTools();
    init_pointerPickingConfiguration();
    init_logger();
    (function(ScenePerformancePriority2) {
      ScenePerformancePriority2[ScenePerformancePriority2["BackwardCompatible"] = 0] = "BackwardCompatible";
      ScenePerformancePriority2[ScenePerformancePriority2["Intermediate"] = 1] = "Intermediate";
      ScenePerformancePriority2[ScenePerformancePriority2["Aggressive"] = 2] = "Aggressive";
    })(ScenePerformancePriority || (ScenePerformancePriority = {}));
    Scene = class _Scene extends AbstractScene {
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Factory used to create the default material.
       * @param scene The scene to create the material for
       * @returns The default material
       */
      static DefaultMaterialFactory(scene) {
        throw _WarnImport("StandardMaterial");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Factory used to create the a collision coordinator.
       * @returns The collision coordinator
       */
      static CollisionCoordinatorFactory() {
        throw _WarnImport("DefaultCollisionCoordinator");
      }
      /**
       * Texture used in all pbr material as the reflection texture.
       * As in the majority of the scene they are the same (exception for multi room and so on),
       * this is easier to reference from here than from all the materials.
       */
      get environmentTexture() {
        return this._environmentTexture;
      }
      /**
       * Texture used in all pbr material as the reflection texture.
       * As in the majority of the scene they are the same (exception for multi room and so on),
       * this is easier to set here than in all the materials.
       */
      set environmentTexture(value) {
        if (this._environmentTexture === value) {
          return;
        }
        this._environmentTexture = value;
        this.markAllMaterialsAsDirty(1);
      }
      /**
       * Default image processing configuration used either in the rendering
       * Forward main pass or through the imageProcessingPostProcess if present.
       * As in the majority of the scene they are the same (exception for multi camera),
       * this is easier to reference from here than from all the materials and post process.
       *
       * No setter as we it is a shared configuration, you can set the values instead.
       */
      get imageProcessingConfiguration() {
        return this._imageProcessingConfiguration;
      }
      /**
       * Gets or sets a value indicating how to treat performance relatively to ease of use and backward compatibility
       */
      get performancePriority() {
        return this._performancePriority;
      }
      set performancePriority(value) {
        if (value === this._performancePriority) {
          return;
        }
        this._performancePriority = value;
        switch (value) {
          case ScenePerformancePriority.BackwardCompatible:
            this.skipFrustumClipping = false;
            this._renderingManager.maintainStateBetweenFrames = false;
            this.skipPointerMovePicking = false;
            this.autoClear = true;
            break;
          case ScenePerformancePriority.Intermediate:
            this.skipFrustumClipping = false;
            this._renderingManager.maintainStateBetweenFrames = false;
            this.skipPointerMovePicking = true;
            this.autoClear = false;
            break;
          case ScenePerformancePriority.Aggressive:
            this.skipFrustumClipping = true;
            this._renderingManager.maintainStateBetweenFrames = true;
            this.skipPointerMovePicking = true;
            this.autoClear = false;
            break;
        }
        this.onScenePerformancePriorityChangedObservable.notifyObservers(value);
      }
      /**
       * Gets or sets a boolean indicating if all rendering must be done in wireframe
       */
      set forceWireframe(value) {
        if (this._forceWireframe === value) {
          return;
        }
        this._forceWireframe = value;
        this.markAllMaterialsAsDirty(16);
      }
      get forceWireframe() {
        return this._forceWireframe;
      }
      /**
       * Gets or sets a boolean indicating if we should skip the frustum clipping part of the active meshes selection
       */
      set skipFrustumClipping(value) {
        if (this._skipFrustumClipping === value) {
          return;
        }
        this._skipFrustumClipping = value;
      }
      get skipFrustumClipping() {
        return this._skipFrustumClipping;
      }
      /**
       * Gets or sets a boolean indicating if all rendering must be done in point cloud
       */
      set forcePointsCloud(value) {
        if (this._forcePointsCloud === value) {
          return;
        }
        this._forcePointsCloud = value;
        this.markAllMaterialsAsDirty(16);
      }
      get forcePointsCloud() {
        return this._forcePointsCloud;
      }
      /**
       * Gets or sets the animation properties override
       */
      get animationPropertiesOverride() {
        return this._animationPropertiesOverride;
      }
      set animationPropertiesOverride(value) {
        this._animationPropertiesOverride = value;
      }
      /** Sets a function to be executed when this scene is disposed. */
      set onDispose(callback) {
        if (this._onDisposeObserver) {
          this.onDisposeObservable.remove(this._onDisposeObserver);
        }
        this._onDisposeObserver = this.onDisposeObservable.add(callback);
      }
      /** Sets a function to be executed before rendering this scene */
      set beforeRender(callback) {
        if (this._onBeforeRenderObserver) {
          this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
        }
        if (callback) {
          this._onBeforeRenderObserver = this.onBeforeRenderObservable.add(callback);
        }
      }
      /** Sets a function to be executed after rendering this scene */
      set afterRender(callback) {
        if (this._onAfterRenderObserver) {
          this.onAfterRenderObservable.remove(this._onAfterRenderObserver);
        }
        if (callback) {
          this._onAfterRenderObserver = this.onAfterRenderObservable.add(callback);
        }
      }
      /** Sets a function to be executed before rendering a camera*/
      set beforeCameraRender(callback) {
        if (this._onBeforeCameraRenderObserver) {
          this.onBeforeCameraRenderObservable.remove(this._onBeforeCameraRenderObserver);
        }
        this._onBeforeCameraRenderObserver = this.onBeforeCameraRenderObservable.add(callback);
      }
      /** Sets a function to be executed after rendering a camera*/
      set afterCameraRender(callback) {
        if (this._onAfterCameraRenderObserver) {
          this.onAfterCameraRenderObservable.remove(this._onAfterCameraRenderObserver);
        }
        this._onAfterCameraRenderObserver = this.onAfterCameraRenderObservable.add(callback);
      }
      /**
       * Gets or sets a predicate used to select candidate meshes for a pointer down event
       */
      get pointerDownPredicate() {
        return this._pointerPickingConfiguration.pointerDownPredicate;
      }
      set pointerDownPredicate(value) {
        this._pointerPickingConfiguration.pointerDownPredicate = value;
      }
      /**
       * Gets or sets a predicate used to select candidate meshes for a pointer up event
       */
      get pointerUpPredicate() {
        return this._pointerPickingConfiguration.pointerUpPredicate;
      }
      set pointerUpPredicate(value) {
        this._pointerPickingConfiguration.pointerUpPredicate = value;
      }
      /**
       * Gets or sets a predicate used to select candidate meshes for a pointer move event
       */
      get pointerMovePredicate() {
        return this._pointerPickingConfiguration.pointerMovePredicate;
      }
      set pointerMovePredicate(value) {
        this._pointerPickingConfiguration.pointerMovePredicate = value;
      }
      /**
       * Gets or sets a predicate used to select candidate meshes for a pointer down event
       */
      get pointerDownFastCheck() {
        return this._pointerPickingConfiguration.pointerDownFastCheck;
      }
      set pointerDownFastCheck(value) {
        this._pointerPickingConfiguration.pointerDownFastCheck = value;
      }
      /**
       * Gets or sets a predicate used to select candidate meshes for a pointer up event
       */
      get pointerUpFastCheck() {
        return this._pointerPickingConfiguration.pointerUpFastCheck;
      }
      set pointerUpFastCheck(value) {
        this._pointerPickingConfiguration.pointerUpFastCheck = value;
      }
      /**
       * Gets or sets a predicate used to select candidate meshes for a pointer move event
       */
      get pointerMoveFastCheck() {
        return this._pointerPickingConfiguration.pointerMoveFastCheck;
      }
      set pointerMoveFastCheck(value) {
        this._pointerPickingConfiguration.pointerMoveFastCheck = value;
      }
      /**
       * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer move event occurs.
       */
      get skipPointerMovePicking() {
        return this._pointerPickingConfiguration.skipPointerMovePicking;
      }
      set skipPointerMovePicking(value) {
        this._pointerPickingConfiguration.skipPointerMovePicking = value;
      }
      /**
       * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer down event occurs.
       */
      get skipPointerDownPicking() {
        return this._pointerPickingConfiguration.skipPointerDownPicking;
      }
      set skipPointerDownPicking(value) {
        this._pointerPickingConfiguration.skipPointerDownPicking = value;
      }
      /**
       * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer up event occurs.  Off by default.
       */
      get skipPointerUpPicking() {
        return this._pointerPickingConfiguration.skipPointerUpPicking;
      }
      set skipPointerUpPicking(value) {
        this._pointerPickingConfiguration.skipPointerUpPicking = value;
      }
      /**
       * Gets the pointer coordinates without any translation (ie. straight out of the pointer event)
       */
      get unTranslatedPointer() {
        return this._inputManager.unTranslatedPointer;
      }
      /**
       * Gets or sets the distance in pixel that you have to move to prevent some events. Default is 10 pixels
       */
      static get DragMovementThreshold() {
        return InputManager.DragMovementThreshold;
      }
      static set DragMovementThreshold(value) {
        InputManager.DragMovementThreshold = value;
      }
      /**
       * Time in milliseconds to wait to raise long press events if button is still pressed. Default is 500 ms
       */
      static get LongPressDelay() {
        return InputManager.LongPressDelay;
      }
      static set LongPressDelay(value) {
        InputManager.LongPressDelay = value;
      }
      /**
       * Time in milliseconds to wait to raise long press events if button is still pressed. Default is 300 ms
       */
      static get DoubleClickDelay() {
        return InputManager.DoubleClickDelay;
      }
      static set DoubleClickDelay(value) {
        InputManager.DoubleClickDelay = value;
      }
      /** If you need to check double click without raising a single click at first click, enable this flag */
      static get ExclusiveDoubleClickMode() {
        return InputManager.ExclusiveDoubleClickMode;
      }
      static set ExclusiveDoubleClickMode(value) {
        InputManager.ExclusiveDoubleClickMode = value;
      }
      /**
       * Bind the current view position to an effect.
       * @param effect The effect to be bound
       * @param variableName name of the shader variable that will hold the eye position
       * @param isVector3 true to indicates that variableName is a Vector3 and not a Vector4
       * @returns the computed eye position
       */
      bindEyePosition(effect, variableName = "vEyePosition", isVector3 = false) {
        const eyePosition = this._forcedViewPosition ? this._forcedViewPosition : this._mirroredCameraPosition ? this._mirroredCameraPosition : this.activeCamera.globalPosition;
        const invertNormal = this.useRightHandedSystem === (this._mirroredCameraPosition != null);
        TmpVectors.Vector4[0].set(eyePosition.x, eyePosition.y, eyePosition.z, invertNormal ? -1 : 1);
        if (effect) {
          if (isVector3) {
            effect.setFloat3(variableName, TmpVectors.Vector4[0].x, TmpVectors.Vector4[0].y, TmpVectors.Vector4[0].z);
          } else {
            effect.setVector4(variableName, TmpVectors.Vector4[0]);
          }
        }
        return TmpVectors.Vector4[0];
      }
      /**
       * Update the scene ubo before it can be used in rendering processing
       * @returns the scene UniformBuffer
       */
      finalizeSceneUbo() {
        const ubo = this.getSceneUniformBuffer();
        const eyePosition = this.bindEyePosition(null);
        ubo.updateFloat4("vEyePosition", eyePosition.x, eyePosition.y, eyePosition.z, eyePosition.w);
        ubo.update();
        return ubo;
      }
      /**
       * Gets or sets a boolean indicating if the scene must use right-handed coordinates system
       */
      set useRightHandedSystem(value) {
        if (this._useRightHandedSystem === value) {
          return;
        }
        this._useRightHandedSystem = value;
        this.markAllMaterialsAsDirty(16);
      }
      get useRightHandedSystem() {
        return this._useRightHandedSystem;
      }
      /**
       * Sets the step Id used by deterministic lock step
       * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
       * @param newStepId defines the step Id
       */
      setStepId(newStepId) {
        this._currentStepId = newStepId;
      }
      /**
       * Gets the step Id used by deterministic lock step
       * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
       * @returns the step Id
       */
      getStepId() {
        return this._currentStepId;
      }
      /**
       * Gets the internal step used by deterministic lock step
       * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
       * @returns the internal step
       */
      getInternalStep() {
        return this._currentInternalStep;
      }
      /**
       * Gets or sets a boolean indicating if fog is enabled on this scene
       * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/environment_introduction#fog
       * (Default is true)
       */
      set fogEnabled(value) {
        if (this._fogEnabled === value) {
          return;
        }
        this._fogEnabled = value;
        this.markAllMaterialsAsDirty(16);
      }
      get fogEnabled() {
        return this._fogEnabled;
      }
      /**
       * Gets or sets the fog mode to use
       * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/environment_introduction#fog
       * | mode | value |
       * | --- | --- |
       * | FOGMODE_NONE | 0 |
       * | FOGMODE_EXP | 1 |
       * | FOGMODE_EXP2 | 2 |
       * | FOGMODE_LINEAR | 3 |
       */
      set fogMode(value) {
        if (this._fogMode === value) {
          return;
        }
        this._fogMode = value;
        this.markAllMaterialsAsDirty(16);
      }
      get fogMode() {
        return this._fogMode;
      }
      /**
       * Flag indicating that the frame buffer binding is handled by another component
       */
      get prePass() {
        return !!this.prePassRenderer && this.prePassRenderer.defaultRT.enabled;
      }
      /**
       * Gets or sets a boolean indicating if shadows are enabled on this scene
       */
      set shadowsEnabled(value) {
        if (this._shadowsEnabled === value) {
          return;
        }
        this._shadowsEnabled = value;
        this.markAllMaterialsAsDirty(2);
      }
      get shadowsEnabled() {
        return this._shadowsEnabled;
      }
      /**
       * Gets or sets a boolean indicating if lights are enabled on this scene
       */
      set lightsEnabled(value) {
        if (this._lightsEnabled === value) {
          return;
        }
        this._lightsEnabled = value;
        this.markAllMaterialsAsDirty(2);
      }
      get lightsEnabled() {
        return this._lightsEnabled;
      }
      /** All of the active cameras added to this scene. */
      get activeCameras() {
        return this._activeCameras;
      }
      set activeCameras(cameras) {
        if (this._unObserveActiveCameras) {
          this._unObserveActiveCameras();
          this._unObserveActiveCameras = null;
        }
        if (cameras) {
          this._unObserveActiveCameras = _ObserveArray(cameras, () => {
            this.onActiveCamerasChanged.notifyObservers(this);
          });
        }
        this._activeCameras = cameras;
      }
      /** Gets or sets the current active camera */
      get activeCamera() {
        return this._activeCamera;
      }
      set activeCamera(value) {
        if (value === this._activeCamera) {
          return;
        }
        this._activeCamera = value;
        this.onActiveCameraChanged.notifyObservers(this);
      }
      /** The default material used on meshes when no material is affected */
      get defaultMaterial() {
        if (!this._defaultMaterial) {
          this._defaultMaterial = _Scene.DefaultMaterialFactory(this);
        }
        return this._defaultMaterial;
      }
      /** The default material used on meshes when no material is affected */
      set defaultMaterial(value) {
        this._defaultMaterial = value;
      }
      /**
       * Gets or sets a boolean indicating if textures are enabled on this scene
       */
      set texturesEnabled(value) {
        if (this._texturesEnabled === value) {
          return;
        }
        this._texturesEnabled = value;
        this.markAllMaterialsAsDirty(1);
      }
      get texturesEnabled() {
        return this._texturesEnabled;
      }
      /**
       * Gets or sets a boolean indicating if skeletons are enabled on this scene
       */
      set skeletonsEnabled(value) {
        if (this._skeletonsEnabled === value) {
          return;
        }
        this._skeletonsEnabled = value;
        this.markAllMaterialsAsDirty(8);
      }
      get skeletonsEnabled() {
        return this._skeletonsEnabled;
      }
      /** @internal */
      get collisionCoordinator() {
        if (!this._collisionCoordinator) {
          this._collisionCoordinator = _Scene.CollisionCoordinatorFactory();
          this._collisionCoordinator.init(this);
        }
        return this._collisionCoordinator;
      }
      /**
       * Gets the scene's rendering manager
       */
      get renderingManager() {
        return this._renderingManager;
      }
      /**
       * Gets the list of frustum planes (built from the active camera)
       */
      get frustumPlanes() {
        return this._frustumPlanes;
      }
      /**
       * Registers the transient components if needed.
       */
      _registerTransientComponents() {
        if (this._transientComponents.length > 0) {
          for (const component of this._transientComponents) {
            component.register();
          }
          this._transientComponents.length = 0;
        }
      }
      /**
       * @internal
       * Add a component to the scene.
       * Note that the ccomponent could be registered on th next frame if this is called after
       * the register component stage.
       * @param component Defines the component to add to the scene
       */
      _addComponent(component) {
        this._components.push(component);
        this._transientComponents.push(component);
        const serializableComponent = component;
        if (serializableComponent.addFromContainer && serializableComponent.serialize) {
          this._serializableComponents.push(serializableComponent);
        }
      }
      /**
       * @internal
       * Gets a component from the scene.
       * @param name defines the name of the component to retrieve
       * @returns the component or null if not present
       */
      _getComponent(name) {
        for (const component of this._components) {
          if (component.name === name) {
            return component;
          }
        }
        return null;
      }
      /**
       * Creates a new Scene
       * @param engine defines the engine to use to render this scene
       * @param options defines the scene options
       */
      constructor(engine, options) {
        super();
        this._inputManager = new InputManager(this);
        this.cameraToUseForPointers = null;
        this._isScene = true;
        this._blockEntityCollection = false;
        this.autoClear = true;
        this.autoClearDepthAndStencil = true;
        this.clearColor = new Color4(0.2, 0.2, 0.3, 1);
        this.ambientColor = new Color3(0, 0, 0);
        this.environmentIntensity = 1;
        this._performancePriority = ScenePerformancePriority.BackwardCompatible;
        this.onScenePerformancePriorityChangedObservable = new Observable();
        this._forceWireframe = false;
        this._skipFrustumClipping = false;
        this._forcePointsCloud = false;
        this.animationsEnabled = true;
        this._animationPropertiesOverride = null;
        this.useConstantAnimationDeltaTime = false;
        this.constantlyUpdateMeshUnderPointer = false;
        this.hoverCursor = "pointer";
        this.defaultCursor = "";
        this.doNotHandleCursors = false;
        this.preventDefaultOnPointerDown = true;
        this.preventDefaultOnPointerUp = true;
        this.metadata = null;
        this.reservedDataStore = null;
        this.disableOfflineSupportExceptionRules = [];
        this.onDisposeObservable = new Observable();
        this._onDisposeObserver = null;
        this.onBeforeRenderObservable = new Observable();
        this._onBeforeRenderObserver = null;
        this.onAfterRenderObservable = new Observable();
        this.onAfterRenderCameraObservable = new Observable();
        this._onAfterRenderObserver = null;
        this.onBeforeAnimationsObservable = new Observable();
        this.onAfterAnimationsObservable = new Observable();
        this.onBeforeDrawPhaseObservable = new Observable();
        this.onAfterDrawPhaseObservable = new Observable();
        this.onReadyObservable = new Observable();
        this.onBeforeCameraRenderObservable = new Observable();
        this._onBeforeCameraRenderObserver = null;
        this.onAfterCameraRenderObservable = new Observable();
        this._onAfterCameraRenderObserver = null;
        this.onBeforeActiveMeshesEvaluationObservable = new Observable();
        this.onAfterActiveMeshesEvaluationObservable = new Observable();
        this.onBeforeParticlesRenderingObservable = new Observable();
        this.onAfterParticlesRenderingObservable = new Observable();
        this.onDataLoadedObservable = new Observable();
        this.onNewCameraAddedObservable = new Observable();
        this.onCameraRemovedObservable = new Observable();
        this.onNewLightAddedObservable = new Observable();
        this.onLightRemovedObservable = new Observable();
        this.onNewGeometryAddedObservable = new Observable();
        this.onGeometryRemovedObservable = new Observable();
        this.onNewTransformNodeAddedObservable = new Observable();
        this.onTransformNodeRemovedObservable = new Observable();
        this.onNewMeshAddedObservable = new Observable();
        this.onMeshRemovedObservable = new Observable();
        this.onNewSkeletonAddedObservable = new Observable();
        this.onSkeletonRemovedObservable = new Observable();
        this.onNewMaterialAddedObservable = new Observable();
        this.onNewMultiMaterialAddedObservable = new Observable();
        this.onMaterialRemovedObservable = new Observable();
        this.onMultiMaterialRemovedObservable = new Observable();
        this.onNewTextureAddedObservable = new Observable();
        this.onTextureRemovedObservable = new Observable();
        this.onBeforeRenderTargetsRenderObservable = new Observable();
        this.onAfterRenderTargetsRenderObservable = new Observable();
        this.onBeforeStepObservable = new Observable();
        this.onAfterStepObservable = new Observable();
        this.onActiveCameraChanged = new Observable();
        this.onActiveCamerasChanged = new Observable();
        this.onBeforeRenderingGroupObservable = new Observable();
        this.onAfterRenderingGroupObservable = new Observable();
        this.onMeshImportedObservable = new Observable();
        this.onAnimationFileImportedObservable = new Observable();
        this._registeredForLateAnimationBindings = new SmartArrayNoDuplicate(256);
        this._pointerPickingConfiguration = new PointerPickingConfiguration();
        this.onPrePointerObservable = new Observable();
        this.onPointerObservable = new Observable();
        this.onPreKeyboardObservable = new Observable();
        this.onKeyboardObservable = new Observable();
        this._useRightHandedSystem = false;
        this._timeAccumulator = 0;
        this._currentStepId = 0;
        this._currentInternalStep = 0;
        this._fogEnabled = true;
        this._fogMode = _Scene.FOGMODE_NONE;
        this.fogColor = new Color3(0.2, 0.2, 0.3);
        this.fogDensity = 0.1;
        this.fogStart = 0;
        this.fogEnd = 1e3;
        this.needsPreviousWorldMatrices = false;
        this._shadowsEnabled = true;
        this._lightsEnabled = true;
        this._unObserveActiveCameras = null;
        this._texturesEnabled = true;
        this.physicsEnabled = true;
        this.particlesEnabled = true;
        this.spritesEnabled = true;
        this._skeletonsEnabled = true;
        this.lensFlaresEnabled = true;
        this.collisionsEnabled = true;
        this.gravity = new Vector3(0, -9.807, 0);
        this.postProcessesEnabled = true;
        this.renderTargetsEnabled = true;
        this.dumpNextRenderTargets = false;
        this.customRenderTargets = [];
        this.importedMeshesFiles = [];
        this.probesEnabled = true;
        this._meshesForIntersections = new SmartArrayNoDuplicate(256);
        this.proceduralTexturesEnabled = true;
        this._totalVertices = new PerfCounter();
        this._activeIndices = new PerfCounter();
        this._activeParticles = new PerfCounter();
        this._activeBones = new PerfCounter();
        this._animationTime = 0;
        this.animationTimeScale = 1;
        this._renderId = 0;
        this._frameId = 0;
        this._executeWhenReadyTimeoutId = null;
        this._intermediateRendering = false;
        this._defaultFrameBufferCleared = false;
        this._viewUpdateFlag = -1;
        this._projectionUpdateFlag = -1;
        this._toBeDisposed = new Array(256);
        this._activeRequests = new Array();
        this._pendingData = new Array();
        this._isDisposed = false;
        this.dispatchAllSubMeshesOfActiveMeshes = false;
        this._activeMeshes = new SmartArray(256);
        this._processedMaterials = new SmartArray(256);
        this._renderTargets = new SmartArrayNoDuplicate(256);
        this._materialsRenderTargets = new SmartArrayNoDuplicate(256);
        this._activeParticleSystems = new SmartArray(256);
        this._activeSkeletons = new SmartArrayNoDuplicate(32);
        this._softwareSkinnedMeshes = new SmartArrayNoDuplicate(32);
        this._activeAnimatables = new Array();
        this._transformMatrix = Matrix.Zero();
        this.requireLightSorting = false;
        this._components = [];
        this._serializableComponents = [];
        this._transientComponents = [];
        this._beforeCameraUpdateStage = Stage.Create();
        this._beforeClearStage = Stage.Create();
        this._beforeRenderTargetClearStage = Stage.Create();
        this._gatherRenderTargetsStage = Stage.Create();
        this._gatherActiveCameraRenderTargetsStage = Stage.Create();
        this._isReadyForMeshStage = Stage.Create();
        this._beforeEvaluateActiveMeshStage = Stage.Create();
        this._evaluateSubMeshStage = Stage.Create();
        this._preActiveMeshStage = Stage.Create();
        this._cameraDrawRenderTargetStage = Stage.Create();
        this._beforeCameraDrawStage = Stage.Create();
        this._beforeRenderTargetDrawStage = Stage.Create();
        this._beforeRenderingGroupDrawStage = Stage.Create();
        this._beforeRenderingMeshStage = Stage.Create();
        this._afterRenderingMeshStage = Stage.Create();
        this._afterRenderingGroupDrawStage = Stage.Create();
        this._afterCameraDrawStage = Stage.Create();
        this._afterCameraPostProcessStage = Stage.Create();
        this._afterRenderTargetDrawStage = Stage.Create();
        this._afterRenderTargetPostProcessStage = Stage.Create();
        this._afterRenderStage = Stage.Create();
        this._pointerMoveStage = Stage.Create();
        this._pointerDownStage = Stage.Create();
        this._pointerUpStage = Stage.Create();
        this._geometriesByUniqueId = null;
        this._defaultMeshCandidates = {
          data: [],
          length: 0
        };
        this._defaultSubMeshCandidates = {
          data: [],
          length: 0
        };
        this._preventFreeActiveMeshesAndRenderingGroups = false;
        this._activeMeshesFrozen = false;
        this._activeMeshesFrozenButKeepClipping = false;
        this._skipEvaluateActiveMeshesCompletely = false;
        this._allowPostProcessClearColor = true;
        this.getDeterministicFrameTime = () => {
          return this._engine.getTimeStep();
        };
        this._registeredActions = 0;
        this._blockMaterialDirtyMechanism = false;
        this._perfCollector = null;
        this.activeCameras = [];
        const fullOptions = {
          useGeometryUniqueIdsMap: true,
          useMaterialMeshMap: true,
          useClonedMeshMap: true,
          virtual: false,
          ...options
        };
        engine = this._engine = engine || EngineStore.LastCreatedEngine;
        if (fullOptions.virtual) {
          engine._virtualScenes.push(this);
        } else {
          EngineStore._LastCreatedScene = this;
          engine.scenes.push(this);
        }
        this._uid = null;
        this._renderingManager = new RenderingManager(this);
        if (PostProcessManager) {
          this.postProcessManager = new PostProcessManager(this);
        }
        if (IsWindowObjectExist()) {
          this.attachControl();
        }
        this._createUbo();
        if (ImageProcessingConfiguration) {
          this._imageProcessingConfiguration = new ImageProcessingConfiguration();
        }
        this.setDefaultCandidateProviders();
        if (fullOptions.useGeometryUniqueIdsMap) {
          this._geometriesByUniqueId = {};
        }
        this.useMaterialMeshMap = fullOptions.useMaterialMeshMap;
        this.useClonedMeshMap = fullOptions.useClonedMeshMap;
        if (!options || !options.virtual) {
          engine.onNewSceneAddedObservable.notifyObservers(this);
        }
      }
      /**
       * Gets a string identifying the name of the class
       * @returns "Scene" string
       */
      getClassName() {
        return "Scene";
      }
      /**
       * @internal
       */
      _getDefaultMeshCandidates() {
        this._defaultMeshCandidates.data = this.meshes;
        this._defaultMeshCandidates.length = this.meshes.length;
        return this._defaultMeshCandidates;
      }
      /**
       * @internal
       */
      _getDefaultSubMeshCandidates(mesh) {
        this._defaultSubMeshCandidates.data = mesh.subMeshes;
        this._defaultSubMeshCandidates.length = mesh.subMeshes.length;
        return this._defaultSubMeshCandidates;
      }
      /**
       * Sets the default candidate providers for the scene.
       * This sets the getActiveMeshCandidates, getActiveSubMeshCandidates, getIntersectingSubMeshCandidates
       * and getCollidingSubMeshCandidates to their default function
       */
      setDefaultCandidateProviders() {
        this.getActiveMeshCandidates = () => this._getDefaultMeshCandidates();
        this.getActiveSubMeshCandidates = (mesh) => this._getDefaultSubMeshCandidates(mesh);
        this.getIntersectingSubMeshCandidates = (mesh, localRay) => this._getDefaultSubMeshCandidates(mesh);
        this.getCollidingSubMeshCandidates = (mesh, collider) => this._getDefaultSubMeshCandidates(mesh);
      }
      /**
       * Gets the mesh that is currently under the pointer
       */
      get meshUnderPointer() {
        return this._inputManager.meshUnderPointer;
      }
      /**
       * Gets or sets the current on-screen X position of the pointer
       */
      get pointerX() {
        return this._inputManager.pointerX;
      }
      set pointerX(value) {
        this._inputManager.pointerX = value;
      }
      /**
       * Gets or sets the current on-screen Y position of the pointer
       */
      get pointerY() {
        return this._inputManager.pointerY;
      }
      set pointerY(value) {
        this._inputManager.pointerY = value;
      }
      /**
       * Gets the cached material (ie. the latest rendered one)
       * @returns the cached material
       */
      getCachedMaterial() {
        return this._cachedMaterial;
      }
      /**
       * Gets the cached effect (ie. the latest rendered one)
       * @returns the cached effect
       */
      getCachedEffect() {
        return this._cachedEffect;
      }
      /**
       * Gets the cached visibility state (ie. the latest rendered one)
       * @returns the cached visibility state
       */
      getCachedVisibility() {
        return this._cachedVisibility;
      }
      /**
       * Gets a boolean indicating if the current material / effect / visibility must be bind again
       * @param material defines the current material
       * @param effect defines the current effect
       * @param visibility defines the current visibility state
       * @returns true if one parameter is not cached
       */
      isCachedMaterialInvalid(material, effect, visibility = 1) {
        return this._cachedEffect !== effect || this._cachedMaterial !== material || this._cachedVisibility !== visibility;
      }
      /**
       * Gets the engine associated with the scene
       * @returns an Engine
       */
      getEngine() {
        return this._engine;
      }
      /**
       * Gets the total number of vertices rendered per frame
       * @returns the total number of vertices rendered per frame
       */
      getTotalVertices() {
        return this._totalVertices.current;
      }
      /**
       * Gets the performance counter for total vertices
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#instrumentation
       */
      get totalVerticesPerfCounter() {
        return this._totalVertices;
      }
      /**
       * Gets the total number of active indices rendered per frame (You can deduce the number of rendered triangles by dividing this number by 3)
       * @returns the total number of active indices rendered per frame
       */
      getActiveIndices() {
        return this._activeIndices.current;
      }
      /**
       * Gets the performance counter for active indices
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#instrumentation
       */
      get totalActiveIndicesPerfCounter() {
        return this._activeIndices;
      }
      /**
       * Gets the total number of active particles rendered per frame
       * @returns the total number of active particles rendered per frame
       */
      getActiveParticles() {
        return this._activeParticles.current;
      }
      /**
       * Gets the performance counter for active particles
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#instrumentation
       */
      get activeParticlesPerfCounter() {
        return this._activeParticles;
      }
      /**
       * Gets the total number of active bones rendered per frame
       * @returns the total number of active bones rendered per frame
       */
      getActiveBones() {
        return this._activeBones.current;
      }
      /**
       * Gets the performance counter for active bones
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#instrumentation
       */
      get activeBonesPerfCounter() {
        return this._activeBones;
      }
      /**
       * Gets the array of active meshes
       * @returns an array of AbstractMesh
       */
      getActiveMeshes() {
        return this._activeMeshes;
      }
      /**
       * Gets the animation ratio (which is 1.0 is the scene renders at 60fps and 2 if the scene renders at 30fps, etc.)
       * @returns a number
       */
      getAnimationRatio() {
        return this._animationRatio !== void 0 ? this._animationRatio : 1;
      }
      /**
       * Gets an unique Id for the current render phase
       * @returns a number
       */
      getRenderId() {
        return this._renderId;
      }
      /**
       * Gets an unique Id for the current frame
       * @returns a number
       */
      getFrameId() {
        return this._frameId;
      }
      /** Call this function if you want to manually increment the render Id*/
      incrementRenderId() {
        this._renderId++;
      }
      _createUbo() {
        this.setSceneUniformBuffer(this.createSceneUniformBuffer());
      }
      /**
       * Use this method to simulate a pointer move on a mesh
       * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
       * @param pickResult pickingInfo of the object wished to simulate pointer event on
       * @param pointerEventInit pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
       * @returns the current scene
       */
      simulatePointerMove(pickResult, pointerEventInit) {
        this._inputManager.simulatePointerMove(pickResult, pointerEventInit);
        return this;
      }
      /**
       * Use this method to simulate a pointer down on a mesh
       * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
       * @param pickResult pickingInfo of the object wished to simulate pointer event on
       * @param pointerEventInit pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
       * @returns the current scene
       */
      simulatePointerDown(pickResult, pointerEventInit) {
        this._inputManager.simulatePointerDown(pickResult, pointerEventInit);
        return this;
      }
      /**
       * Use this method to simulate a pointer up on a mesh
       * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
       * @param pickResult pickingInfo of the object wished to simulate pointer event on
       * @param pointerEventInit pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
       * @param doubleTap indicates that the pointer up event should be considered as part of a double click (false by default)
       * @returns the current scene
       */
      simulatePointerUp(pickResult, pointerEventInit, doubleTap) {
        this._inputManager.simulatePointerUp(pickResult, pointerEventInit, doubleTap);
        return this;
      }
      /**
       * Gets a boolean indicating if the current pointer event is captured (meaning that the scene has already handled the pointer down)
       * @param pointerId defines the pointer id to use in a multi-touch scenario (0 by default)
       * @returns true if the pointer was captured
       */
      isPointerCaptured(pointerId = 0) {
        return this._inputManager.isPointerCaptured(pointerId);
      }
      /**
       * Attach events to the canvas (To handle actionManagers triggers and raise onPointerMove, onPointerDown and onPointerUp
       * @param attachUp defines if you want to attach events to pointerup
       * @param attachDown defines if you want to attach events to pointerdown
       * @param attachMove defines if you want to attach events to pointermove
       */
      attachControl(attachUp = true, attachDown = true, attachMove = true) {
        this._inputManager.attachControl(attachUp, attachDown, attachMove);
      }
      /** Detaches all event handlers*/
      detachControl() {
        this._inputManager.detachControl();
      }
      /**
       * This function will check if the scene can be rendered (textures are loaded, shaders are compiled)
       * Delay loaded resources are not taking in account
       * @param checkRenderTargets true to also check that the meshes rendered as part of a render target are ready (default: true)
       * @returns true if all required resources are ready
       */
      isReady(checkRenderTargets = true) {
        var _a, _b;
        if (this._isDisposed) {
          return false;
        }
        let index;
        const engine = this.getEngine();
        const currentRenderPassId = engine.currentRenderPassId;
        engine.currentRenderPassId = ((_a = this.activeCamera) == null ? void 0 : _a.renderPassId) ?? currentRenderPassId;
        let isReady = true;
        if (this._pendingData.length > 0) {
          isReady = false;
        }
        (_b = this.prePassRenderer) == null ? void 0 : _b.update();
        if (this.useOrderIndependentTransparency && this.depthPeelingRenderer) {
          isReady && (isReady = this.depthPeelingRenderer.isReady());
        }
        if (checkRenderTargets) {
          this._processedMaterials.reset();
          this._materialsRenderTargets.reset();
        }
        for (index = 0; index < this.meshes.length; index++) {
          const mesh = this.meshes[index];
          if (!mesh.subMeshes || mesh.subMeshes.length === 0) {
            continue;
          }
          if (!mesh.isReady(true)) {
            isReady = false;
            continue;
          }
          const hardwareInstancedRendering = mesh.hasThinInstances || mesh.getClassName() === "InstancedMesh" || mesh.getClassName() === "InstancedLinesMesh" || engine.getCaps().instancedArrays && mesh.instances.length > 0;
          for (const step of this._isReadyForMeshStage) {
            if (!step.action(mesh, hardwareInstancedRendering)) {
              isReady = false;
            }
          }
          if (!checkRenderTargets) {
            continue;
          }
          const mat = mesh.material || this.defaultMaterial;
          if (mat) {
            if (mat._storeEffectOnSubMeshes) {
              for (const subMesh of mesh.subMeshes) {
                const material = subMesh.getMaterial();
                if (material && material.hasRenderTargetTextures && material.getRenderTargetTextures != null) {
                  if (this._processedMaterials.indexOf(material) === -1) {
                    this._processedMaterials.push(material);
                    this._materialsRenderTargets.concatWithNoDuplicate(material.getRenderTargetTextures());
                  }
                }
              }
            } else {
              if (mat.hasRenderTargetTextures && mat.getRenderTargetTextures != null) {
                if (this._processedMaterials.indexOf(mat) === -1) {
                  this._processedMaterials.push(mat);
                  this._materialsRenderTargets.concatWithNoDuplicate(mat.getRenderTargetTextures());
                }
              }
            }
          }
        }
        if (checkRenderTargets) {
          for (index = 0; index < this._materialsRenderTargets.length; ++index) {
            const rtt = this._materialsRenderTargets.data[index];
            if (!rtt.isReadyForRendering()) {
              isReady = false;
            }
          }
        }
        for (index = 0; index < this.geometries.length; index++) {
          const geometry = this.geometries[index];
          if (geometry.delayLoadState === 2) {
            isReady = false;
          }
        }
        if (this.activeCameras && this.activeCameras.length > 0) {
          for (const camera of this.activeCameras) {
            if (!camera.isReady(true)) {
              isReady = false;
            }
          }
        } else if (this.activeCamera) {
          if (!this.activeCamera.isReady(true)) {
            isReady = false;
          }
        }
        for (const particleSystem of this.particleSystems) {
          if (!particleSystem.isReady()) {
            isReady = false;
          }
        }
        if (this.layers) {
          for (const layer of this.layers) {
            if (!layer.isReady()) {
              isReady = false;
            }
          }
        }
        if (!engine.areAllEffectsReady()) {
          isReady = false;
        }
        engine.currentRenderPassId = currentRenderPassId;
        return isReady;
      }
      /** Resets all cached information relative to material (including effect and visibility) */
      resetCachedMaterial() {
        this._cachedMaterial = null;
        this._cachedEffect = null;
        this._cachedVisibility = null;
      }
      /**
       * Registers a function to be called before every frame render
       * @param func defines the function to register
       */
      registerBeforeRender(func) {
        this.onBeforeRenderObservable.add(func);
      }
      /**
       * Unregisters a function called before every frame render
       * @param func defines the function to unregister
       */
      unregisterBeforeRender(func) {
        this.onBeforeRenderObservable.removeCallback(func);
      }
      /**
       * Registers a function to be called after every frame render
       * @param func defines the function to register
       */
      registerAfterRender(func) {
        this.onAfterRenderObservable.add(func);
      }
      /**
       * Unregisters a function called after every frame render
       * @param func defines the function to unregister
       */
      unregisterAfterRender(func) {
        this.onAfterRenderObservable.removeCallback(func);
      }
      _executeOnceBeforeRender(func) {
        const execFunc = () => {
          func();
          setTimeout(() => {
            this.unregisterBeforeRender(execFunc);
          });
        };
        this.registerBeforeRender(execFunc);
      }
      /**
       * The provided function will run before render once and will be disposed afterwards.
       * A timeout delay can be provided so that the function will be executed in N ms.
       * The timeout is using the browser's native setTimeout so time percision cannot be guaranteed.
       * @param func The function to be executed.
       * @param timeout optional delay in ms
       */
      executeOnceBeforeRender(func, timeout) {
        if (timeout !== void 0) {
          setTimeout(() => {
            this._executeOnceBeforeRender(func);
          }, timeout);
        } else {
          this._executeOnceBeforeRender(func);
        }
      }
      /**
       * This function can help adding any object to the list of data awaited to be ready in order to check for a complete scene loading.
       * @param data defines the object to wait for
       */
      addPendingData(data) {
        this._pendingData.push(data);
      }
      /**
       * Remove a pending data from the loading list which has previously been added with addPendingData.
       * @param data defines the object to remove from the pending list
       */
      removePendingData(data) {
        const wasLoading = this.isLoading;
        const index = this._pendingData.indexOf(data);
        if (index !== -1) {
          this._pendingData.splice(index, 1);
        }
        if (wasLoading && !this.isLoading) {
          this.onDataLoadedObservable.notifyObservers(this);
        }
      }
      /**
       * Returns the number of items waiting to be loaded
       * @returns the number of items waiting to be loaded
       */
      getWaitingItemsCount() {
        return this._pendingData.length;
      }
      /**
       * Returns a boolean indicating if the scene is still loading data
       */
      get isLoading() {
        return this._pendingData.length > 0;
      }
      /**
       * Registers a function to be executed when the scene is ready
       * @param func - the function to be executed
       * @param checkRenderTargets true to also check that the meshes rendered as part of a render target are ready (default: false)
       */
      executeWhenReady(func, checkRenderTargets = false) {
        this.onReadyObservable.addOnce(func);
        if (this._executeWhenReadyTimeoutId !== null) {
          return;
        }
        this._checkIsReady(checkRenderTargets);
      }
      /**
       * Returns a promise that resolves when the scene is ready
       * @param checkRenderTargets true to also check that the meshes rendered as part of a render target are ready (default: false)
       * @returns A promise that resolves when the scene is ready
       */
      whenReadyAsync(checkRenderTargets = false) {
        return new Promise((resolve) => {
          this.executeWhenReady(() => {
            resolve();
          }, checkRenderTargets);
        });
      }
      /**
       * @internal
       */
      _checkIsReady(checkRenderTargets = false) {
        this._registerTransientComponents();
        if (this.isReady(checkRenderTargets)) {
          this.onReadyObservable.notifyObservers(this);
          this.onReadyObservable.clear();
          this._executeWhenReadyTimeoutId = null;
          return;
        }
        if (this._isDisposed) {
          this.onReadyObservable.clear();
          this._executeWhenReadyTimeoutId = null;
          return;
        }
        this._executeWhenReadyTimeoutId = setTimeout(() => {
          this.incrementRenderId();
          this._checkIsReady(checkRenderTargets);
        }, 100);
      }
      /**
       * Gets all animatable attached to the scene
       */
      get animatables() {
        return this._activeAnimatables;
      }
      /**
       * Resets the last animation time frame.
       * Useful to override when animations start running when loading a scene for the first time.
       */
      resetLastAnimationTimeFrame() {
        this._animationTimeLast = PrecisionDate.Now;
      }
      // Matrix
      /**
       * Gets the current view matrix
       * @returns a Matrix
       */
      getViewMatrix() {
        return this._viewMatrix;
      }
      /**
       * Gets the current projection matrix
       * @returns a Matrix
       */
      getProjectionMatrix() {
        return this._projectionMatrix;
      }
      /**
       * Gets the current transform matrix
       * @returns a Matrix made of View * Projection
       */
      getTransformMatrix() {
        return this._transformMatrix;
      }
      /**
       * Sets the current transform matrix
       * @param viewL defines the View matrix to use
       * @param projectionL defines the Projection matrix to use
       * @param viewR defines the right View matrix to use (if provided)
       * @param projectionR defines the right Projection matrix to use (if provided)
       */
      setTransformMatrix(viewL, projectionL, viewR, projectionR) {
        if (!viewR && !projectionR && this._multiviewSceneUbo) {
          this._multiviewSceneUbo.dispose();
          this._multiviewSceneUbo = null;
        }
        if (this._viewUpdateFlag === viewL.updateFlag && this._projectionUpdateFlag === projectionL.updateFlag) {
          return;
        }
        this._viewUpdateFlag = viewL.updateFlag;
        this._projectionUpdateFlag = projectionL.updateFlag;
        this._viewMatrix = viewL;
        this._projectionMatrix = projectionL;
        this._viewMatrix.multiplyToRef(this._projectionMatrix, this._transformMatrix);
        if (!this._frustumPlanes) {
          this._frustumPlanes = Frustum.GetPlanes(this._transformMatrix);
        } else {
          Frustum.GetPlanesToRef(this._transformMatrix, this._frustumPlanes);
        }
        if (this._multiviewSceneUbo && this._multiviewSceneUbo.useUbo) {
          this._updateMultiviewUbo(viewR, projectionR);
        } else if (this._sceneUbo.useUbo) {
          this._sceneUbo.updateMatrix("viewProjection", this._transformMatrix);
          this._sceneUbo.updateMatrix("view", this._viewMatrix);
          this._sceneUbo.updateMatrix("projection", this._projectionMatrix);
        }
      }
      /**
       * Gets the uniform buffer used to store scene data
       * @returns a UniformBuffer
       */
      getSceneUniformBuffer() {
        return this._multiviewSceneUbo ? this._multiviewSceneUbo : this._sceneUbo;
      }
      /**
       * Creates a scene UBO
       * @param name name of the uniform buffer (optional, for debugging purpose only)
       * @returns a new ubo
       */
      createSceneUniformBuffer(name) {
        const sceneUbo = new UniformBuffer(this._engine, void 0, false, name ?? "scene");
        sceneUbo.addUniform("viewProjection", 16);
        sceneUbo.addUniform("view", 16);
        sceneUbo.addUniform("projection", 16);
        sceneUbo.addUniform("vEyePosition", 4);
        return sceneUbo;
      }
      /**
       * Sets the scene ubo
       * @param ubo the ubo to set for the scene
       */
      setSceneUniformBuffer(ubo) {
        this._sceneUbo = ubo;
        this._viewUpdateFlag = -1;
        this._projectionUpdateFlag = -1;
      }
      /**
       * Gets an unique (relatively to the current scene) Id
       * @returns an unique number for the scene
       */
      getUniqueId() {
        return UniqueIdGenerator.UniqueId;
      }
      /**
       * Add a mesh to the list of scene's meshes
       * @param newMesh defines the mesh to add
       * @param recursive if all child meshes should also be added to the scene
       */
      addMesh(newMesh, recursive = false) {
        if (this._blockEntityCollection) {
          return;
        }
        this.meshes.push(newMesh);
        newMesh._resyncLightSources();
        if (!newMesh.parent) {
          newMesh._addToSceneRootNodes();
        }
        this.onNewMeshAddedObservable.notifyObservers(newMesh);
        if (recursive) {
          newMesh.getChildMeshes().forEach((m) => {
            this.addMesh(m);
          });
        }
      }
      /**
       * Remove a mesh for the list of scene's meshes
       * @param toRemove defines the mesh to remove
       * @param recursive if all child meshes should also be removed from the scene
       * @returns the index where the mesh was in the mesh list
       */
      removeMesh(toRemove, recursive = false) {
        const index = this.meshes.indexOf(toRemove);
        if (index !== -1) {
          this.meshes[index] = this.meshes[this.meshes.length - 1];
          this.meshes.pop();
          if (!toRemove.parent) {
            toRemove._removeFromSceneRootNodes();
          }
        }
        this._inputManager._invalidateMesh(toRemove);
        this.onMeshRemovedObservable.notifyObservers(toRemove);
        if (recursive) {
          toRemove.getChildMeshes().forEach((m) => {
            this.removeMesh(m);
          });
        }
        return index;
      }
      /**
       * Add a transform node to the list of scene's transform nodes
       * @param newTransformNode defines the transform node to add
       */
      addTransformNode(newTransformNode) {
        if (this._blockEntityCollection) {
          return;
        }
        if (newTransformNode.getScene() === this && newTransformNode._indexInSceneTransformNodesArray !== -1) {
          return;
        }
        newTransformNode._indexInSceneTransformNodesArray = this.transformNodes.length;
        this.transformNodes.push(newTransformNode);
        if (!newTransformNode.parent) {
          newTransformNode._addToSceneRootNodes();
        }
        this.onNewTransformNodeAddedObservable.notifyObservers(newTransformNode);
      }
      /**
       * Remove a transform node for the list of scene's transform nodes
       * @param toRemove defines the transform node to remove
       * @returns the index where the transform node was in the transform node list
       */
      removeTransformNode(toRemove) {
        const index = toRemove._indexInSceneTransformNodesArray;
        if (index !== -1) {
          if (index !== this.transformNodes.length - 1) {
            const lastNode = this.transformNodes[this.transformNodes.length - 1];
            this.transformNodes[index] = lastNode;
            lastNode._indexInSceneTransformNodesArray = index;
          }
          toRemove._indexInSceneTransformNodesArray = -1;
          this.transformNodes.pop();
          if (!toRemove.parent) {
            toRemove._removeFromSceneRootNodes();
          }
        }
        this.onTransformNodeRemovedObservable.notifyObservers(toRemove);
        return index;
      }
      /**
       * Remove a skeleton for the list of scene's skeletons
       * @param toRemove defines the skeleton to remove
       * @returns the index where the skeleton was in the skeleton list
       */
      removeSkeleton(toRemove) {
        const index = this.skeletons.indexOf(toRemove);
        if (index !== -1) {
          this.skeletons.splice(index, 1);
          this.onSkeletonRemovedObservable.notifyObservers(toRemove);
          this._executeActiveContainerCleanup(this._activeSkeletons);
        }
        return index;
      }
      /**
       * Remove a morph target for the list of scene's morph targets
       * @param toRemove defines the morph target to remove
       * @returns the index where the morph target was in the morph target list
       */
      removeMorphTargetManager(toRemove) {
        const index = this.morphTargetManagers.indexOf(toRemove);
        if (index !== -1) {
          this.morphTargetManagers.splice(index, 1);
        }
        return index;
      }
      /**
       * Remove a light for the list of scene's lights
       * @param toRemove defines the light to remove
       * @returns the index where the light was in the light list
       */
      removeLight(toRemove) {
        const index = this.lights.indexOf(toRemove);
        if (index !== -1) {
          for (const mesh of this.meshes) {
            mesh._removeLightSource(toRemove, false);
          }
          this.lights.splice(index, 1);
          this.sortLightsByPriority();
          if (!toRemove.parent) {
            toRemove._removeFromSceneRootNodes();
          }
        }
        this.onLightRemovedObservable.notifyObservers(toRemove);
        return index;
      }
      /**
       * Remove a camera for the list of scene's cameras
       * @param toRemove defines the camera to remove
       * @returns the index where the camera was in the camera list
       */
      removeCamera(toRemove) {
        const index = this.cameras.indexOf(toRemove);
        if (index !== -1) {
          this.cameras.splice(index, 1);
          if (!toRemove.parent) {
            toRemove._removeFromSceneRootNodes();
          }
        }
        if (this.activeCameras) {
          const index2 = this.activeCameras.indexOf(toRemove);
          if (index2 !== -1) {
            this.activeCameras.splice(index2, 1);
          }
        }
        if (this.activeCamera === toRemove) {
          if (this.cameras.length > 0) {
            this.activeCamera = this.cameras[0];
          } else {
            this.activeCamera = null;
          }
        }
        this.onCameraRemovedObservable.notifyObservers(toRemove);
        return index;
      }
      /**
       * Remove a particle system for the list of scene's particle systems
       * @param toRemove defines the particle system to remove
       * @returns the index where the particle system was in the particle system list
       */
      removeParticleSystem(toRemove) {
        const index = this.particleSystems.indexOf(toRemove);
        if (index !== -1) {
          this.particleSystems.splice(index, 1);
          this._executeActiveContainerCleanup(this._activeParticleSystems);
        }
        return index;
      }
      /**
       * Remove a animation for the list of scene's animations
       * @param toRemove defines the animation to remove
       * @returns the index where the animation was in the animation list
       */
      removeAnimation(toRemove) {
        const index = this.animations.indexOf(toRemove);
        if (index !== -1) {
          this.animations.splice(index, 1);
        }
        return index;
      }
      /**
       * Will stop the animation of the given target
       * @param target - the target
       * @param animationName - the name of the animation to stop (all animations will be stopped if both this and targetMask are empty)
       * @param targetMask - a function that determines if the animation should be stopped based on its target (all animations will be stopped if both this and animationName are empty)
       */
      stopAnimation(target, animationName, targetMask) {
      }
      /**
       * Removes the given animation group from this scene.
       * @param toRemove The animation group to remove
       * @returns The index of the removed animation group
       */
      removeAnimationGroup(toRemove) {
        const index = this.animationGroups.indexOf(toRemove);
        if (index !== -1) {
          this.animationGroups.splice(index, 1);
        }
        return index;
      }
      /**
       * Removes the given multi-material from this scene.
       * @param toRemove The multi-material to remove
       * @returns The index of the removed multi-material
       */
      removeMultiMaterial(toRemove) {
        const index = this.multiMaterials.indexOf(toRemove);
        if (index !== -1) {
          this.multiMaterials.splice(index, 1);
        }
        this.onMultiMaterialRemovedObservable.notifyObservers(toRemove);
        return index;
      }
      /**
       * Removes the given material from this scene.
       * @param toRemove The material to remove
       * @returns The index of the removed material
       */
      removeMaterial(toRemove) {
        const index = toRemove._indexInSceneMaterialArray;
        if (index !== -1 && index < this.materials.length) {
          if (index !== this.materials.length - 1) {
            const lastMaterial = this.materials[this.materials.length - 1];
            this.materials[index] = lastMaterial;
            lastMaterial._indexInSceneMaterialArray = index;
          }
          toRemove._indexInSceneMaterialArray = -1;
          this.materials.pop();
        }
        this.onMaterialRemovedObservable.notifyObservers(toRemove);
        return index;
      }
      /**
       * Removes the given action manager from this scene.
       * @deprecated
       * @param toRemove The action manager to remove
       * @returns The index of the removed action manager
       */
      removeActionManager(toRemove) {
        const index = this.actionManagers.indexOf(toRemove);
        if (index !== -1) {
          this.actionManagers.splice(index, 1);
        }
        return index;
      }
      /**
       * Removes the given texture from this scene.
       * @param toRemove The texture to remove
       * @returns The index of the removed texture
       */
      removeTexture(toRemove) {
        const index = this.textures.indexOf(toRemove);
        if (index !== -1) {
          this.textures.splice(index, 1);
        }
        this.onTextureRemovedObservable.notifyObservers(toRemove);
        return index;
      }
      /**
       * Adds the given light to this scene
       * @param newLight The light to add
       */
      addLight(newLight) {
        if (this._blockEntityCollection) {
          return;
        }
        this.lights.push(newLight);
        this.sortLightsByPriority();
        if (!newLight.parent) {
          newLight._addToSceneRootNodes();
        }
        for (const mesh of this.meshes) {
          if (mesh.lightSources.indexOf(newLight) === -1) {
            mesh.lightSources.push(newLight);
            mesh._resyncLightSources();
          }
        }
        this.onNewLightAddedObservable.notifyObservers(newLight);
      }
      /**
       * Sorts the list list based on light priorities
       */
      sortLightsByPriority() {
        if (this.requireLightSorting) {
          this.lights.sort(LightConstants.CompareLightsPriority);
        }
      }
      /**
       * Adds the given camera to this scene
       * @param newCamera The camera to add
       */
      addCamera(newCamera) {
        if (this._blockEntityCollection) {
          return;
        }
        this.cameras.push(newCamera);
        this.onNewCameraAddedObservable.notifyObservers(newCamera);
        if (!newCamera.parent) {
          newCamera._addToSceneRootNodes();
        }
      }
      /**
       * Adds the given skeleton to this scene
       * @param newSkeleton The skeleton to add
       */
      addSkeleton(newSkeleton) {
        if (this._blockEntityCollection) {
          return;
        }
        this.skeletons.push(newSkeleton);
        this.onNewSkeletonAddedObservable.notifyObservers(newSkeleton);
      }
      /**
       * Adds the given particle system to this scene
       * @param newParticleSystem The particle system to add
       */
      addParticleSystem(newParticleSystem) {
        if (this._blockEntityCollection) {
          return;
        }
        this.particleSystems.push(newParticleSystem);
      }
      /**
       * Adds the given animation to this scene
       * @param newAnimation The animation to add
       */
      addAnimation(newAnimation) {
        if (this._blockEntityCollection) {
          return;
        }
        this.animations.push(newAnimation);
      }
      /**
       * Adds the given animation group to this scene.
       * @param newAnimationGroup The animation group to add
       */
      addAnimationGroup(newAnimationGroup) {
        if (this._blockEntityCollection) {
          return;
        }
        this.animationGroups.push(newAnimationGroup);
      }
      /**
       * Adds the given multi-material to this scene
       * @param newMultiMaterial The multi-material to add
       */
      addMultiMaterial(newMultiMaterial) {
        if (this._blockEntityCollection) {
          return;
        }
        this.multiMaterials.push(newMultiMaterial);
        this.onNewMultiMaterialAddedObservable.notifyObservers(newMultiMaterial);
      }
      /**
       * Adds the given material to this scene
       * @param newMaterial The material to add
       */
      addMaterial(newMaterial) {
        if (this._blockEntityCollection) {
          return;
        }
        if (newMaterial.getScene() === this && newMaterial._indexInSceneMaterialArray !== -1) {
          return;
        }
        newMaterial._indexInSceneMaterialArray = this.materials.length;
        this.materials.push(newMaterial);
        this.onNewMaterialAddedObservable.notifyObservers(newMaterial);
      }
      /**
       * Adds the given morph target to this scene
       * @param newMorphTargetManager The morph target to add
       */
      addMorphTargetManager(newMorphTargetManager) {
        if (this._blockEntityCollection) {
          return;
        }
        this.morphTargetManagers.push(newMorphTargetManager);
      }
      /**
       * Adds the given geometry to this scene
       * @param newGeometry The geometry to add
       */
      addGeometry(newGeometry) {
        if (this._blockEntityCollection) {
          return;
        }
        if (this._geometriesByUniqueId) {
          this._geometriesByUniqueId[newGeometry.uniqueId] = this.geometries.length;
        }
        this.geometries.push(newGeometry);
      }
      /**
       * Adds the given action manager to this scene
       * @deprecated
       * @param newActionManager The action manager to add
       */
      addActionManager(newActionManager) {
        this.actionManagers.push(newActionManager);
      }
      /**
       * Adds the given texture to this scene.
       * @param newTexture The texture to add
       */
      addTexture(newTexture) {
        if (this._blockEntityCollection) {
          return;
        }
        this.textures.push(newTexture);
        this.onNewTextureAddedObservable.notifyObservers(newTexture);
      }
      /**
       * Switch active camera
       * @param newCamera defines the new active camera
       * @param attachControl defines if attachControl must be called for the new active camera (default: true)
       */
      switchActiveCamera(newCamera, attachControl = true) {
        const canvas = this._engine.getInputElement();
        if (!canvas) {
          return;
        }
        if (this.activeCamera) {
          this.activeCamera.detachControl();
        }
        this.activeCamera = newCamera;
        if (attachControl) {
          newCamera.attachControl();
        }
      }
      /**
       * sets the active camera of the scene using its Id
       * @param id defines the camera's Id
       * @returns the new active camera or null if none found.
       */
      setActiveCameraById(id) {
        const camera = this.getCameraById(id);
        if (camera) {
          this.activeCamera = camera;
          return camera;
        }
        return null;
      }
      /**
       * sets the active camera of the scene using its name
       * @param name defines the camera's name
       * @returns the new active camera or null if none found.
       */
      setActiveCameraByName(name) {
        const camera = this.getCameraByName(name);
        if (camera) {
          this.activeCamera = camera;
          return camera;
        }
        return null;
      }
      /**
       * get an animation group using its name
       * @param name defines the material's name
       * @returns the animation group or null if none found.
       */
      getAnimationGroupByName(name) {
        for (let index = 0; index < this.animationGroups.length; index++) {
          if (this.animationGroups[index].name === name) {
            return this.animationGroups[index];
          }
        }
        return null;
      }
      _getMaterial(allowMultiMaterials, predicate) {
        for (let index = 0; index < this.materials.length; index++) {
          const material = this.materials[index];
          if (predicate(material)) {
            return material;
          }
        }
        if (allowMultiMaterials) {
          for (let index = 0; index < this.multiMaterials.length; index++) {
            const material = this.multiMaterials[index];
            if (predicate(material)) {
              return material;
            }
          }
        }
        return null;
      }
      /**
       * Get a material using its unique id
       * @param uniqueId defines the material's unique id
       * @param allowMultiMaterials determines whether multimaterials should be considered
       * @returns the material or null if none found.
       */
      getMaterialByUniqueID(uniqueId, allowMultiMaterials = false) {
        return this._getMaterial(allowMultiMaterials, (m) => m.uniqueId === uniqueId);
      }
      /**
       * get a material using its id
       * @param id defines the material's Id
       * @param allowMultiMaterials determines whether multimaterials should be considered
       * @returns the material or null if none found.
       */
      getMaterialById(id, allowMultiMaterials = false) {
        return this._getMaterial(allowMultiMaterials, (m) => m.id === id);
      }
      /**
       * Gets a material using its name
       * @param name defines the material's name
       * @param allowMultiMaterials determines whether multimaterials should be considered
       * @returns the material or null if none found.
       */
      getMaterialByName(name, allowMultiMaterials = false) {
        return this._getMaterial(allowMultiMaterials, (m) => m.name === name);
      }
      /**
       * Gets a last added material using a given id
       * @param id defines the material's id
       * @param allowMultiMaterials determines whether multimaterials should be considered
       * @returns the last material with the given id or null if none found.
       */
      getLastMaterialById(id, allowMultiMaterials = false) {
        for (let index = this.materials.length - 1; index >= 0; index--) {
          if (this.materials[index].id === id) {
            return this.materials[index];
          }
        }
        if (allowMultiMaterials) {
          for (let index = this.multiMaterials.length - 1; index >= 0; index--) {
            if (this.multiMaterials[index].id === id) {
              return this.multiMaterials[index];
            }
          }
        }
        return null;
      }
      /**
       * Get a texture using its unique id
       * @param uniqueId defines the texture's unique id
       * @returns the texture or null if none found.
       */
      getTextureByUniqueId(uniqueId) {
        for (let index = 0; index < this.textures.length; index++) {
          if (this.textures[index].uniqueId === uniqueId) {
            return this.textures[index];
          }
        }
        return null;
      }
      /**
       * Gets a texture using its name
       * @param name defines the texture's name
       * @returns the texture or null if none found.
       */
      getTextureByName(name) {
        for (let index = 0; index < this.textures.length; index++) {
          if (this.textures[index].name === name) {
            return this.textures[index];
          }
        }
        return null;
      }
      /**
       * Gets a camera using its Id
       * @param id defines the Id to look for
       * @returns the camera or null if not found
       */
      getCameraById(id) {
        for (let index = 0; index < this.cameras.length; index++) {
          if (this.cameras[index].id === id) {
            return this.cameras[index];
          }
        }
        return null;
      }
      /**
       * Gets a camera using its unique Id
       * @param uniqueId defines the unique Id to look for
       * @returns the camera or null if not found
       */
      getCameraByUniqueId(uniqueId) {
        for (let index = 0; index < this.cameras.length; index++) {
          if (this.cameras[index].uniqueId === uniqueId) {
            return this.cameras[index];
          }
        }
        return null;
      }
      /**
       * Gets a camera using its name
       * @param name defines the camera's name
       * @returns the camera or null if none found.
       */
      getCameraByName(name) {
        for (let index = 0; index < this.cameras.length; index++) {
          if (this.cameras[index].name === name) {
            return this.cameras[index];
          }
        }
        return null;
      }
      /**
       * Gets a bone using its Id
       * @param id defines the bone's Id
       * @returns the bone or null if not found
       */
      getBoneById(id) {
        for (let skeletonIndex = 0; skeletonIndex < this.skeletons.length; skeletonIndex++) {
          const skeleton = this.skeletons[skeletonIndex];
          for (let boneIndex = 0; boneIndex < skeleton.bones.length; boneIndex++) {
            if (skeleton.bones[boneIndex].id === id) {
              return skeleton.bones[boneIndex];
            }
          }
        }
        return null;
      }
      /**
       * Gets a bone using its id
       * @param name defines the bone's name
       * @returns the bone or null if not found
       */
      getBoneByName(name) {
        for (let skeletonIndex = 0; skeletonIndex < this.skeletons.length; skeletonIndex++) {
          const skeleton = this.skeletons[skeletonIndex];
          for (let boneIndex = 0; boneIndex < skeleton.bones.length; boneIndex++) {
            if (skeleton.bones[boneIndex].name === name) {
              return skeleton.bones[boneIndex];
            }
          }
        }
        return null;
      }
      /**
       * Gets a light node using its name
       * @param name defines the light's name
       * @returns the light or null if none found.
       */
      getLightByName(name) {
        for (let index = 0; index < this.lights.length; index++) {
          if (this.lights[index].name === name) {
            return this.lights[index];
          }
        }
        return null;
      }
      /**
       * Gets a light node using its Id
       * @param id defines the light's Id
       * @returns the light or null if none found.
       */
      getLightById(id) {
        for (let index = 0; index < this.lights.length; index++) {
          if (this.lights[index].id === id) {
            return this.lights[index];
          }
        }
        return null;
      }
      /**
       * Gets a light node using its scene-generated unique Id
       * @param uniqueId defines the light's unique Id
       * @returns the light or null if none found.
       */
      getLightByUniqueId(uniqueId) {
        for (let index = 0; index < this.lights.length; index++) {
          if (this.lights[index].uniqueId === uniqueId) {
            return this.lights[index];
          }
        }
        return null;
      }
      /**
       * Gets a particle system by Id
       * @param id defines the particle system Id
       * @returns the corresponding system or null if none found
       */
      getParticleSystemById(id) {
        for (let index = 0; index < this.particleSystems.length; index++) {
          if (this.particleSystems[index].id === id) {
            return this.particleSystems[index];
          }
        }
        return null;
      }
      /**
       * Gets a geometry using its Id
       * @param id defines the geometry's Id
       * @returns the geometry or null if none found.
       */
      getGeometryById(id) {
        for (let index = 0; index < this.geometries.length; index++) {
          if (this.geometries[index].id === id) {
            return this.geometries[index];
          }
        }
        return null;
      }
      _getGeometryByUniqueId(uniqueId) {
        if (this._geometriesByUniqueId) {
          const index = this._geometriesByUniqueId[uniqueId];
          if (index !== void 0) {
            return this.geometries[index];
          }
        } else {
          for (let index = 0; index < this.geometries.length; index++) {
            if (this.geometries[index].uniqueId === uniqueId) {
              return this.geometries[index];
            }
          }
        }
        return null;
      }
      /**
       * Add a new geometry to this scene
       * @param geometry defines the geometry to be added to the scene.
       * @param force defines if the geometry must be pushed even if a geometry with this id already exists
       * @returns a boolean defining if the geometry was added or not
       */
      pushGeometry(geometry, force) {
        if (!force && this._getGeometryByUniqueId(geometry.uniqueId)) {
          return false;
        }
        this.addGeometry(geometry);
        this.onNewGeometryAddedObservable.notifyObservers(geometry);
        return true;
      }
      /**
       * Removes an existing geometry
       * @param geometry defines the geometry to be removed from the scene
       * @returns a boolean defining if the geometry was removed or not
       */
      removeGeometry(geometry) {
        let index;
        if (this._geometriesByUniqueId) {
          index = this._geometriesByUniqueId[geometry.uniqueId];
          if (index === void 0) {
            return false;
          }
        } else {
          index = this.geometries.indexOf(geometry);
          if (index < 0) {
            return false;
          }
        }
        if (index !== this.geometries.length - 1) {
          const lastGeometry = this.geometries[this.geometries.length - 1];
          if (lastGeometry) {
            this.geometries[index] = lastGeometry;
            if (this._geometriesByUniqueId) {
              this._geometriesByUniqueId[lastGeometry.uniqueId] = index;
            }
          }
        }
        if (this._geometriesByUniqueId) {
          this._geometriesByUniqueId[geometry.uniqueId] = void 0;
        }
        this.geometries.pop();
        this.onGeometryRemovedObservable.notifyObservers(geometry);
        return true;
      }
      /**
       * Gets the list of geometries attached to the scene
       * @returns an array of Geometry
       */
      getGeometries() {
        return this.geometries;
      }
      /**
       * Gets the first added mesh found of a given Id
       * @param id defines the Id to search for
       * @returns the mesh found or null if not found at all
       */
      getMeshById(id) {
        for (let index = 0; index < this.meshes.length; index++) {
          if (this.meshes[index].id === id) {
            return this.meshes[index];
          }
        }
        return null;
      }
      /**
       * Gets a list of meshes using their Id
       * @param id defines the Id to search for
       * @returns a list of meshes
       */
      getMeshesById(id) {
        return this.meshes.filter(function(m) {
          return m.id === id;
        });
      }
      /**
       * Gets the first added transform node found of a given Id
       * @param id defines the Id to search for
       * @returns the found transform node or null if not found at all.
       */
      getTransformNodeById(id) {
        for (let index = 0; index < this.transformNodes.length; index++) {
          if (this.transformNodes[index].id === id) {
            return this.transformNodes[index];
          }
        }
        return null;
      }
      /**
       * Gets a transform node with its auto-generated unique Id
       * @param uniqueId defines the unique Id to search for
       * @returns the found transform node or null if not found at all.
       */
      getTransformNodeByUniqueId(uniqueId) {
        for (let index = 0; index < this.transformNodes.length; index++) {
          if (this.transformNodes[index].uniqueId === uniqueId) {
            return this.transformNodes[index];
          }
        }
        return null;
      }
      /**
       * Gets a list of transform nodes using their Id
       * @param id defines the Id to search for
       * @returns a list of transform nodes
       */
      getTransformNodesById(id) {
        return this.transformNodes.filter(function(m) {
          return m.id === id;
        });
      }
      /**
       * Gets a mesh with its auto-generated unique Id
       * @param uniqueId defines the unique Id to search for
       * @returns the found mesh or null if not found at all.
       */
      getMeshByUniqueId(uniqueId) {
        for (let index = 0; index < this.meshes.length; index++) {
          if (this.meshes[index].uniqueId === uniqueId) {
            return this.meshes[index];
          }
        }
        return null;
      }
      /**
       * Gets a the last added mesh using a given Id
       * @param id defines the Id to search for
       * @returns the found mesh or null if not found at all.
       */
      getLastMeshById(id) {
        for (let index = this.meshes.length - 1; index >= 0; index--) {
          if (this.meshes[index].id === id) {
            return this.meshes[index];
          }
        }
        return null;
      }
      /**
       * Gets a the last transform node using a given Id
       * @param id defines the Id to search for
       * @returns the found mesh or null if not found at all.
       */
      getLastTransformNodeById(id) {
        for (let index = this.transformNodes.length - 1; index >= 0; index--) {
          if (this.transformNodes[index].id === id) {
            return this.transformNodes[index];
          }
        }
        return null;
      }
      /**
       * Gets a the last added node (Mesh, Camera, Light) using a given Id
       * @param id defines the Id to search for
       * @returns the found node or null if not found at all
       */
      getLastEntryById(id) {
        let index;
        for (index = this.meshes.length - 1; index >= 0; index--) {
          if (this.meshes[index].id === id) {
            return this.meshes[index];
          }
        }
        for (index = this.transformNodes.length - 1; index >= 0; index--) {
          if (this.transformNodes[index].id === id) {
            return this.transformNodes[index];
          }
        }
        for (index = this.cameras.length - 1; index >= 0; index--) {
          if (this.cameras[index].id === id) {
            return this.cameras[index];
          }
        }
        for (index = this.lights.length - 1; index >= 0; index--) {
          if (this.lights[index].id === id) {
            return this.lights[index];
          }
        }
        return null;
      }
      /**
       * Gets a node (Mesh, Camera, Light) using a given Id
       * @param id defines the Id to search for
       * @returns the found node or null if not found at all
       */
      getNodeById(id) {
        const mesh = this.getMeshById(id);
        if (mesh) {
          return mesh;
        }
        const transformNode = this.getTransformNodeById(id);
        if (transformNode) {
          return transformNode;
        }
        const light = this.getLightById(id);
        if (light) {
          return light;
        }
        const camera = this.getCameraById(id);
        if (camera) {
          return camera;
        }
        const bone = this.getBoneById(id);
        if (bone) {
          return bone;
        }
        return null;
      }
      /**
       * Gets a node (Mesh, Camera, Light) using a given name
       * @param name defines the name to search for
       * @returns the found node or null if not found at all.
       */
      getNodeByName(name) {
        const mesh = this.getMeshByName(name);
        if (mesh) {
          return mesh;
        }
        const transformNode = this.getTransformNodeByName(name);
        if (transformNode) {
          return transformNode;
        }
        const light = this.getLightByName(name);
        if (light) {
          return light;
        }
        const camera = this.getCameraByName(name);
        if (camera) {
          return camera;
        }
        const bone = this.getBoneByName(name);
        if (bone) {
          return bone;
        }
        return null;
      }
      /**
       * Gets a mesh using a given name
       * @param name defines the name to search for
       * @returns the found mesh or null if not found at all.
       */
      getMeshByName(name) {
        for (let index = 0; index < this.meshes.length; index++) {
          if (this.meshes[index].name === name) {
            return this.meshes[index];
          }
        }
        return null;
      }
      /**
       * Gets a transform node using a given name
       * @param name defines the name to search for
       * @returns the found transform node or null if not found at all.
       */
      getTransformNodeByName(name) {
        for (let index = 0; index < this.transformNodes.length; index++) {
          if (this.transformNodes[index].name === name) {
            return this.transformNodes[index];
          }
        }
        return null;
      }
      /**
       * Gets a skeleton using a given Id (if many are found, this function will pick the last one)
       * @param id defines the Id to search for
       * @returns the found skeleton or null if not found at all.
       */
      getLastSkeletonById(id) {
        for (let index = this.skeletons.length - 1; index >= 0; index--) {
          if (this.skeletons[index].id === id) {
            return this.skeletons[index];
          }
        }
        return null;
      }
      /**
       * Gets a skeleton using a given auto generated unique id
       * @param  uniqueId defines the unique id to search for
       * @returns the found skeleton or null if not found at all.
       */
      getSkeletonByUniqueId(uniqueId) {
        for (let index = 0; index < this.skeletons.length; index++) {
          if (this.skeletons[index].uniqueId === uniqueId) {
            return this.skeletons[index];
          }
        }
        return null;
      }
      /**
       * Gets a skeleton using a given id (if many are found, this function will pick the first one)
       * @param id defines the id to search for
       * @returns the found skeleton or null if not found at all.
       */
      getSkeletonById(id) {
        for (let index = 0; index < this.skeletons.length; index++) {
          if (this.skeletons[index].id === id) {
            return this.skeletons[index];
          }
        }
        return null;
      }
      /**
       * Gets a skeleton using a given name
       * @param name defines the name to search for
       * @returns the found skeleton or null if not found at all.
       */
      getSkeletonByName(name) {
        for (let index = 0; index < this.skeletons.length; index++) {
          if (this.skeletons[index].name === name) {
            return this.skeletons[index];
          }
        }
        return null;
      }
      /**
       * Gets a morph target manager  using a given id (if many are found, this function will pick the last one)
       * @param id defines the id to search for
       * @returns the found morph target manager or null if not found at all.
       */
      getMorphTargetManagerById(id) {
        for (let index = 0; index < this.morphTargetManagers.length; index++) {
          if (this.morphTargetManagers[index].uniqueId === id) {
            return this.morphTargetManagers[index];
          }
        }
        return null;
      }
      /**
       * Gets a morph target using a given id (if many are found, this function will pick the first one)
       * @param id defines the id to search for
       * @returns the found morph target or null if not found at all.
       */
      getMorphTargetById(id) {
        for (let managerIndex = 0; managerIndex < this.morphTargetManagers.length; ++managerIndex) {
          const morphTargetManager = this.morphTargetManagers[managerIndex];
          for (let index = 0; index < morphTargetManager.numTargets; ++index) {
            const target = morphTargetManager.getTarget(index);
            if (target.id === id) {
              return target;
            }
          }
        }
        return null;
      }
      /**
       * Gets a morph target using a given name (if many are found, this function will pick the first one)
       * @param name defines the name to search for
       * @returns the found morph target or null if not found at all.
       */
      getMorphTargetByName(name) {
        for (let managerIndex = 0; managerIndex < this.morphTargetManagers.length; ++managerIndex) {
          const morphTargetManager = this.morphTargetManagers[managerIndex];
          for (let index = 0; index < morphTargetManager.numTargets; ++index) {
            const target = morphTargetManager.getTarget(index);
            if (target.name === name) {
              return target;
            }
          }
        }
        return null;
      }
      /**
       * Gets a post process using a given name (if many are found, this function will pick the first one)
       * @param name defines the name to search for
       * @returns the found post process or null if not found at all.
       */
      getPostProcessByName(name) {
        for (let postProcessIndex = 0; postProcessIndex < this.postProcesses.length; ++postProcessIndex) {
          const postProcess = this.postProcesses[postProcessIndex];
          if (postProcess.name === name) {
            return postProcess;
          }
        }
        return null;
      }
      /**
       * Gets a boolean indicating if the given mesh is active
       * @param mesh defines the mesh to look for
       * @returns true if the mesh is in the active list
       */
      isActiveMesh(mesh) {
        return this._activeMeshes.indexOf(mesh) !== -1;
      }
      /**
       * Return a unique id as a string which can serve as an identifier for the scene
       */
      get uid() {
        if (!this._uid) {
          this._uid = Tools.RandomId();
        }
        return this._uid;
      }
      /**
       * Add an externally attached data from its key.
       * This method call will fail and return false, if such key already exists.
       * If you don't care and just want to get the data no matter what, use the more convenient getOrAddExternalDataWithFactory() method.
       * @param key the unique key that identifies the data
       * @param data the data object to associate to the key for this Engine instance
       * @returns true if no such key were already present and the data was added successfully, false otherwise
       */
      addExternalData(key, data) {
        if (!this._externalData) {
          this._externalData = new StringDictionary();
        }
        return this._externalData.add(key, data);
      }
      /**
       * Get an externally attached data from its key
       * @param key the unique key that identifies the data
       * @returns the associated data, if present (can be null), or undefined if not present
       */
      getExternalData(key) {
        if (!this._externalData) {
          return null;
        }
        return this._externalData.get(key);
      }
      /**
       * Get an externally attached data from its key, create it using a factory if it's not already present
       * @param key the unique key that identifies the data
       * @param factory the factory that will be called to create the instance if and only if it doesn't exists
       * @returns the associated data, can be null if the factory returned null.
       */
      getOrAddExternalDataWithFactory(key, factory) {
        if (!this._externalData) {
          this._externalData = new StringDictionary();
        }
        return this._externalData.getOrAddWithFactory(key, factory);
      }
      /**
       * Remove an externally attached data from the Engine instance
       * @param key the unique key that identifies the data
       * @returns true if the data was successfully removed, false if it doesn't exist
       */
      removeExternalData(key) {
        return this._externalData.remove(key);
      }
      _evaluateSubMesh(subMesh, mesh, initialMesh, forcePush) {
        if (forcePush || subMesh.isInFrustum(this._frustumPlanes)) {
          for (const step of this._evaluateSubMeshStage) {
            step.action(mesh, subMesh);
          }
          const material = subMesh.getMaterial();
          if (material !== null && material !== void 0) {
            if (material.hasRenderTargetTextures && material.getRenderTargetTextures != null) {
              if (this._processedMaterials.indexOf(material) === -1) {
                this._processedMaterials.push(material);
                this._materialsRenderTargets.concatWithNoDuplicate(material.getRenderTargetTextures());
              }
            }
            this._renderingManager.dispatch(subMesh, mesh, material);
          }
        }
      }
      /**
       * Clear the processed materials smart array preventing retention point in material dispose.
       */
      freeProcessedMaterials() {
        this._processedMaterials.dispose();
      }
      /** Gets or sets a boolean blocking all the calls to freeActiveMeshes and freeRenderingGroups
       * It can be used in order to prevent going through methods freeRenderingGroups and freeActiveMeshes several times to improve performance
       * when disposing several meshes in a row or a hierarchy of meshes.
       * When used, it is the responsibility of the user to blockfreeActiveMeshesAndRenderingGroups back to false.
       */
      get blockfreeActiveMeshesAndRenderingGroups() {
        return this._preventFreeActiveMeshesAndRenderingGroups;
      }
      set blockfreeActiveMeshesAndRenderingGroups(value) {
        if (this._preventFreeActiveMeshesAndRenderingGroups === value) {
          return;
        }
        if (value) {
          this.freeActiveMeshes();
          this.freeRenderingGroups();
        }
        this._preventFreeActiveMeshesAndRenderingGroups = value;
      }
      /**
       * Clear the active meshes smart array preventing retention point in mesh dispose.
       */
      freeActiveMeshes() {
        if (this.blockfreeActiveMeshesAndRenderingGroups) {
          return;
        }
        this._activeMeshes.dispose();
        if (this.activeCamera && this.activeCamera._activeMeshes) {
          this.activeCamera._activeMeshes.dispose();
        }
        if (this.activeCameras) {
          for (let i = 0; i < this.activeCameras.length; i++) {
            const activeCamera = this.activeCameras[i];
            if (activeCamera && activeCamera._activeMeshes) {
              activeCamera._activeMeshes.dispose();
            }
          }
        }
      }
      /**
       * Clear the info related to rendering groups preventing retention points during dispose.
       */
      freeRenderingGroups() {
        if (this.blockfreeActiveMeshesAndRenderingGroups) {
          return;
        }
        if (this._renderingManager) {
          this._renderingManager.freeRenderingGroups();
        }
        if (this.textures) {
          for (let i = 0; i < this.textures.length; i++) {
            const texture = this.textures[i];
            if (texture && texture.renderList) {
              texture.freeRenderingGroups();
            }
          }
        }
      }
      /** @internal */
      _isInIntermediateRendering() {
        return this._intermediateRendering;
      }
      /**
       * Use this function to stop evaluating active meshes. The current list will be keep alive between frames
       * @param skipEvaluateActiveMeshes defines an optional boolean indicating that the evaluate active meshes step must be completely skipped
       * @param onSuccess optional success callback
       * @param onError optional error callback
       * @param freezeMeshes defines if meshes should be frozen (true by default)
       * @param keepFrustumCulling defines if you want to keep running the frustum clipping (false by default)
       * @returns the current scene
       */
      freezeActiveMeshes(skipEvaluateActiveMeshes = false, onSuccess, onError, freezeMeshes = true, keepFrustumCulling = false) {
        this.executeWhenReady(() => {
          if (!this.activeCamera) {
            onError && onError("No active camera found");
            return;
          }
          if (!this._frustumPlanes) {
            this.updateTransformMatrix();
          }
          this._evaluateActiveMeshes();
          this._activeMeshesFrozen = true;
          this._activeMeshesFrozenButKeepClipping = keepFrustumCulling;
          this._skipEvaluateActiveMeshesCompletely = skipEvaluateActiveMeshes;
          if (freezeMeshes) {
            for (let index = 0; index < this._activeMeshes.length; index++) {
              this._activeMeshes.data[index]._freeze();
            }
          }
          onSuccess && onSuccess();
        });
        return this;
      }
      /**
       * Use this function to restart evaluating active meshes on every frame
       * @returns the current scene
       */
      unfreezeActiveMeshes() {
        for (let index = 0; index < this.meshes.length; index++) {
          const mesh = this.meshes[index];
          if (mesh._internalAbstractMeshDataInfo) {
            mesh._internalAbstractMeshDataInfo._isActive = false;
          }
        }
        for (let index = 0; index < this._activeMeshes.length; index++) {
          this._activeMeshes.data[index]._unFreeze();
        }
        this._activeMeshesFrozen = false;
        return this;
      }
      _executeActiveContainerCleanup(container) {
        const isInFastMode = this._engine.snapshotRendering && this._engine.snapshotRenderingMode === 1;
        if (!isInFastMode && this._activeMeshesFrozen && this._activeMeshes.length) {
          return;
        }
        this.onBeforeRenderObservable.addOnce(() => container.dispose());
      }
      _evaluateActiveMeshes() {
        var _a;
        if (this._engine.snapshotRendering && this._engine.snapshotRenderingMode === 1) {
          if (this._activeMeshes.length > 0) {
            (_a = this.activeCamera) == null ? void 0 : _a._activeMeshes.reset();
            this._activeMeshes.reset();
            this._renderingManager.reset();
            this._processedMaterials.reset();
            this._activeParticleSystems.reset();
            this._activeSkeletons.reset();
            this._softwareSkinnedMeshes.reset();
          }
          return;
        }
        if (this._activeMeshesFrozen && this._activeMeshes.length) {
          if (!this._skipEvaluateActiveMeshesCompletely) {
            const len2 = this._activeMeshes.length;
            for (let i = 0; i < len2; i++) {
              const mesh = this._activeMeshes.data[i];
              mesh.computeWorldMatrix();
            }
          }
          if (this._activeParticleSystems) {
            const psLength = this._activeParticleSystems.length;
            for (let i = 0; i < psLength; i++) {
              this._activeParticleSystems.data[i].animate();
            }
          }
          this._renderingManager.resetSprites();
          return;
        }
        if (!this.activeCamera) {
          return;
        }
        this.onBeforeActiveMeshesEvaluationObservable.notifyObservers(this);
        this.activeCamera._activeMeshes.reset();
        this._activeMeshes.reset();
        this._renderingManager.reset();
        this._processedMaterials.reset();
        this._activeParticleSystems.reset();
        this._activeSkeletons.reset();
        this._softwareSkinnedMeshes.reset();
        this._materialsRenderTargets.reset();
        for (const step of this._beforeEvaluateActiveMeshStage) {
          step.action();
        }
        const meshes = this.getActiveMeshCandidates();
        const len = meshes.length;
        for (let i = 0; i < len; i++) {
          const mesh = meshes.data[i];
          mesh._internalAbstractMeshDataInfo._currentLODIsUpToDate = false;
          if (mesh.isBlocked) {
            continue;
          }
          this._totalVertices.addCount(mesh.getTotalVertices(), false);
          if (!mesh.isReady() || !mesh.isEnabled() || mesh.scaling.hasAZeroComponent) {
            continue;
          }
          mesh.computeWorldMatrix();
          if (mesh.actionManager && mesh.actionManager.hasSpecificTriggers2(12, 13)) {
            this._meshesForIntersections.pushNoDuplicate(mesh);
          }
          let meshToRender = this.customLODSelector ? this.customLODSelector(mesh, this.activeCamera) : mesh.getLOD(this.activeCamera);
          mesh._internalAbstractMeshDataInfo._currentLOD = meshToRender;
          mesh._internalAbstractMeshDataInfo._currentLODIsUpToDate = true;
          if (meshToRender === void 0 || meshToRender === null) {
            continue;
          }
          if (meshToRender !== mesh && meshToRender.billboardMode !== 0) {
            meshToRender.computeWorldMatrix();
          }
          mesh._preActivate();
          if (mesh.isVisible && mesh.visibility > 0 && (mesh.layerMask & this.activeCamera.layerMask) !== 0 && (this._skipFrustumClipping || mesh.alwaysSelectAsActiveMesh || mesh.isInFrustum(this._frustumPlanes))) {
            this._activeMeshes.push(mesh);
            this.activeCamera._activeMeshes.push(mesh);
            if (meshToRender !== mesh) {
              meshToRender._activate(this._renderId, false);
            }
            for (const step of this._preActiveMeshStage) {
              step.action(mesh);
            }
            if (mesh._activate(this._renderId, false)) {
              if (!mesh.isAnInstance) {
                meshToRender._internalAbstractMeshDataInfo._onlyForInstances = false;
              } else {
                if (mesh._internalAbstractMeshDataInfo._actAsRegularMesh) {
                  meshToRender = mesh;
                }
              }
              meshToRender._internalAbstractMeshDataInfo._isActive = true;
              this._activeMesh(mesh, meshToRender);
            }
            mesh._postActivate();
          }
        }
        this.onAfterActiveMeshesEvaluationObservable.notifyObservers(this);
        if (this.particlesEnabled) {
          this.onBeforeParticlesRenderingObservable.notifyObservers(this);
          for (let particleIndex = 0; particleIndex < this.particleSystems.length; particleIndex++) {
            const particleSystem = this.particleSystems[particleIndex];
            if (!particleSystem.isStarted() || !particleSystem.emitter) {
              continue;
            }
            const emitter = particleSystem.emitter;
            if (!emitter.position || emitter.isEnabled()) {
              this._activeParticleSystems.push(particleSystem);
              particleSystem.animate();
              this._renderingManager.dispatchParticles(particleSystem);
            }
          }
          this.onAfterParticlesRenderingObservable.notifyObservers(this);
        }
      }
      _activeMesh(sourceMesh, mesh) {
        if (this._skeletonsEnabled && mesh.skeleton !== null && mesh.skeleton !== void 0) {
          if (this._activeSkeletons.pushNoDuplicate(mesh.skeleton)) {
            mesh.skeleton.prepare();
            this._activeBones.addCount(mesh.skeleton.bones.length, false);
          }
          if (!mesh.computeBonesUsingShaders) {
            this._softwareSkinnedMeshes.pushNoDuplicate(mesh);
          }
        }
        let forcePush = sourceMesh.hasInstances || sourceMesh.isAnInstance || this.dispatchAllSubMeshesOfActiveMeshes || this._skipFrustumClipping || mesh.alwaysSelectAsActiveMesh;
        if (mesh && mesh.subMeshes && mesh.subMeshes.length > 0) {
          const subMeshes = this.getActiveSubMeshCandidates(mesh);
          const len = subMeshes.length;
          forcePush = forcePush || len === 1;
          for (let i = 0; i < len; i++) {
            const subMesh = subMeshes.data[i];
            this._evaluateSubMesh(subMesh, mesh, sourceMesh, forcePush);
          }
        }
      }
      /**
       * Update the transform matrix to update from the current active camera
       * @param force defines a boolean used to force the update even if cache is up to date
       */
      updateTransformMatrix(force) {
        const activeCamera = this.activeCamera;
        if (!activeCamera) {
          return;
        }
        if (activeCamera._renderingMultiview) {
          const leftCamera = activeCamera._rigCameras[0];
          const rightCamera = activeCamera._rigCameras[1];
          this.setTransformMatrix(leftCamera.getViewMatrix(), leftCamera.getProjectionMatrix(force), rightCamera.getViewMatrix(), rightCamera.getProjectionMatrix(force));
        } else {
          this.setTransformMatrix(activeCamera.getViewMatrix(), activeCamera.getProjectionMatrix(force));
        }
      }
      _bindFrameBuffer(camera, clear = true) {
        if (camera && camera._multiviewTexture) {
          camera._multiviewTexture._bindFrameBuffer();
        } else if (camera && camera.outputRenderTarget) {
          camera.outputRenderTarget._bindFrameBuffer();
        } else {
          if (!this._engine._currentFrameBufferIsDefaultFrameBuffer()) {
            this._engine.restoreDefaultFramebuffer();
          }
        }
        if (clear) {
          this._clearFrameBuffer(camera);
        }
      }
      _clearFrameBuffer(camera) {
        if (camera && camera._multiviewTexture) {
        } else if (camera && camera.outputRenderTarget && !camera._renderingMultiview) {
          const rtt = camera.outputRenderTarget;
          if (rtt.onClearObservable.hasObservers()) {
            rtt.onClearObservable.notifyObservers(this._engine);
          } else if (!rtt.skipInitialClear && !camera.isRightCamera) {
            if (this.autoClear) {
              this._engine.clear(rtt.clearColor || this.clearColor, !rtt._cleared, true, true);
            }
            rtt._cleared = true;
          }
        } else {
          if (!this._defaultFrameBufferCleared) {
            this._defaultFrameBufferCleared = true;
            this._clear();
          } else {
            this._engine.clear(null, false, true, true);
          }
        }
      }
      /**
       * @internal
       */
      _renderForCamera(camera, rigParent, bindFrameBuffer = true) {
        var _a;
        if (camera && camera._skipRendering) {
          return;
        }
        const engine = this._engine;
        this._activeCamera = camera;
        if (!this.activeCamera) {
          throw new Error("Active camera not set");
        }
        engine.setViewport(this.activeCamera.viewport);
        this.resetCachedMaterial();
        this._renderId++;
        if (!this.prePass && bindFrameBuffer) {
          let skipInitialClear = true;
          if (camera._renderingMultiview && camera.outputRenderTarget) {
            skipInitialClear = camera.outputRenderTarget.skipInitialClear;
            if (this.autoClear) {
              this._defaultFrameBufferCleared = false;
              camera.outputRenderTarget.skipInitialClear = false;
            }
          }
          this._bindFrameBuffer(this._activeCamera);
          if (camera._renderingMultiview && camera.outputRenderTarget) {
            camera.outputRenderTarget.skipInitialClear = skipInitialClear;
          }
        }
        this.updateTransformMatrix();
        this.onBeforeCameraRenderObservable.notifyObservers(this.activeCamera);
        this._evaluateActiveMeshes();
        for (let softwareSkinnedMeshIndex = 0; softwareSkinnedMeshIndex < this._softwareSkinnedMeshes.length; softwareSkinnedMeshIndex++) {
          const mesh = this._softwareSkinnedMeshes.data[softwareSkinnedMeshIndex];
          mesh.applySkeleton(mesh.skeleton);
        }
        this.onBeforeRenderTargetsRenderObservable.notifyObservers(this);
        this._renderTargets.concatWithNoDuplicate(this._materialsRenderTargets);
        if (camera.customRenderTargets && camera.customRenderTargets.length > 0) {
          this._renderTargets.concatWithNoDuplicate(camera.customRenderTargets);
        }
        if (rigParent && rigParent.customRenderTargets && rigParent.customRenderTargets.length > 0) {
          this._renderTargets.concatWithNoDuplicate(rigParent.customRenderTargets);
        }
        if (this.environmentTexture && this.environmentTexture.isRenderTarget) {
          this._renderTargets.pushNoDuplicate(this.environmentTexture);
        }
        for (const step of this._gatherActiveCameraRenderTargetsStage) {
          step.action(this._renderTargets);
        }
        let needRebind = false;
        if (this.renderTargetsEnabled) {
          this._intermediateRendering = true;
          if (this._renderTargets.length > 0) {
            Tools.StartPerformanceCounter("Render targets", this._renderTargets.length > 0);
            for (let renderIndex = 0; renderIndex < this._renderTargets.length; renderIndex++) {
              const renderTarget = this._renderTargets.data[renderIndex];
              if (renderTarget._shouldRender()) {
                this._renderId++;
                const hasSpecialRenderTargetCamera = renderTarget.activeCamera && renderTarget.activeCamera !== this.activeCamera;
                renderTarget.render(hasSpecialRenderTargetCamera, this.dumpNextRenderTargets);
                needRebind = true;
              }
            }
            Tools.EndPerformanceCounter("Render targets", this._renderTargets.length > 0);
            this._renderId++;
          }
          for (const step of this._cameraDrawRenderTargetStage) {
            needRebind = step.action(this.activeCamera) || needRebind;
          }
          this._intermediateRendering = false;
        }
        this._engine.currentRenderPassId = ((_a = camera.outputRenderTarget) == null ? void 0 : _a.renderPassId) ?? camera.renderPassId ?? 0;
        if (needRebind && !this.prePass) {
          this._bindFrameBuffer(this._activeCamera, false);
          this.updateTransformMatrix();
        }
        this.onAfterRenderTargetsRenderObservable.notifyObservers(this);
        if (this.postProcessManager && !camera._multiviewTexture && !this.prePass) {
          this.postProcessManager._prepareFrame();
        }
        for (const step of this._beforeCameraDrawStage) {
          step.action(this.activeCamera);
        }
        this.onBeforeDrawPhaseObservable.notifyObservers(this);
        if (engine.snapshotRendering && engine.snapshotRenderingMode === 1) {
          this.finalizeSceneUbo();
        }
        this._renderingManager.render(null, null, true, true);
        this.onAfterDrawPhaseObservable.notifyObservers(this);
        for (const step of this._afterCameraDrawStage) {
          step.action(this.activeCamera);
        }
        if (this.postProcessManager && !camera._multiviewTexture) {
          const texture = camera.outputRenderTarget ? camera.outputRenderTarget.renderTarget : void 0;
          this.postProcessManager._finalizeFrame(camera.isIntermediate, texture);
        }
        for (const step of this._afterCameraPostProcessStage) {
          step.action(this.activeCamera);
        }
        this._renderTargets.reset();
        this.onAfterCameraRenderObservable.notifyObservers(this.activeCamera);
      }
      _processSubCameras(camera, bindFrameBuffer = true) {
        if (camera.cameraRigMode === 0 || camera._renderingMultiview) {
          if (camera._renderingMultiview && !this._multiviewSceneUbo) {
            this._createMultiviewUbo();
          }
          this._renderForCamera(camera, void 0, bindFrameBuffer);
          this.onAfterRenderCameraObservable.notifyObservers(camera);
          return;
        }
        if (camera._useMultiviewToSingleView) {
          this._renderMultiviewToSingleView(camera);
        } else {
          this.onBeforeCameraRenderObservable.notifyObservers(camera);
          for (let index = 0; index < camera._rigCameras.length; index++) {
            this._renderForCamera(camera._rigCameras[index], camera);
          }
        }
        this._activeCamera = camera;
        this.updateTransformMatrix();
        this.onAfterRenderCameraObservable.notifyObservers(camera);
      }
      _checkIntersections() {
        for (let index = 0; index < this._meshesForIntersections.length; index++) {
          const sourceMesh = this._meshesForIntersections.data[index];
          if (!sourceMesh.actionManager) {
            continue;
          }
          for (let actionIndex = 0; sourceMesh.actionManager && actionIndex < sourceMesh.actionManager.actions.length; actionIndex++) {
            const action = sourceMesh.actionManager.actions[actionIndex];
            if (action.trigger === 12 || action.trigger === 13) {
              const parameters = action.getTriggerParameter();
              const otherMesh = parameters.mesh ? parameters.mesh : parameters;
              const areIntersecting = otherMesh.intersectsMesh(sourceMesh, parameters.usePreciseIntersection);
              const currentIntersectionInProgress = sourceMesh._intersectionsInProgress.indexOf(otherMesh);
              if (areIntersecting && currentIntersectionInProgress === -1) {
                if (action.trigger === 12) {
                  action._executeCurrent(ActionEvent.CreateNew(sourceMesh, void 0, otherMesh));
                  sourceMesh._intersectionsInProgress.push(otherMesh);
                } else if (action.trigger === 13) {
                  sourceMesh._intersectionsInProgress.push(otherMesh);
                }
              } else if (!areIntersecting && currentIntersectionInProgress > -1) {
                if (action.trigger === 13) {
                  action._executeCurrent(ActionEvent.CreateNew(sourceMesh, void 0, otherMesh));
                }
                if (!sourceMesh.actionManager.hasSpecificTrigger(13, (parameter) => {
                  const parameterMesh = parameter.mesh ? parameter.mesh : parameter;
                  return otherMesh === parameterMesh;
                }) || action.trigger === 13) {
                  sourceMesh._intersectionsInProgress.splice(currentIntersectionInProgress, 1);
                }
              }
            }
          }
        }
      }
      /**
       * @internal
       */
      _advancePhysicsEngineStep(step) {
      }
      /** @internal */
      _animate(customDeltaTime) {
      }
      /** Execute all animations (for a frame) */
      animate() {
        if (this._engine.isDeterministicLockStep()) {
          let deltaTime = Math.max(_Scene.MinDeltaTime, Math.min(this._engine.getDeltaTime(), _Scene.MaxDeltaTime)) + this._timeAccumulator;
          const defaultFrameTime = this._engine.getTimeStep();
          const defaultFPS = 1e3 / defaultFrameTime / 1e3;
          let stepsTaken = 0;
          const maxSubSteps = this._engine.getLockstepMaxSteps();
          let internalSteps = Math.floor(deltaTime / defaultFrameTime);
          internalSteps = Math.min(internalSteps, maxSubSteps);
          while (deltaTime > 0 && stepsTaken < internalSteps) {
            this.onBeforeStepObservable.notifyObservers(this);
            this._animationRatio = defaultFrameTime * defaultFPS;
            this._animate(defaultFrameTime);
            this.onAfterAnimationsObservable.notifyObservers(this);
            if (this.physicsEnabled) {
              this._advancePhysicsEngineStep(defaultFrameTime);
            }
            this.onAfterStepObservable.notifyObservers(this);
            this._currentStepId++;
            stepsTaken++;
            deltaTime -= defaultFrameTime;
          }
          this._timeAccumulator = deltaTime < 0 ? 0 : deltaTime;
        } else {
          const deltaTime = this.useConstantAnimationDeltaTime ? 16 : Math.max(_Scene.MinDeltaTime, Math.min(this._engine.getDeltaTime(), _Scene.MaxDeltaTime));
          this._animationRatio = deltaTime * (60 / 1e3);
          this._animate();
          this.onAfterAnimationsObservable.notifyObservers(this);
          if (this.physicsEnabled) {
            this._advancePhysicsEngineStep(deltaTime);
          }
        }
      }
      _clear() {
        if (this.autoClearDepthAndStencil || this.autoClear) {
          this._engine.clear(this.clearColor, this.autoClear || this.forceWireframe || this.forcePointsCloud, this.autoClearDepthAndStencil, this.autoClearDepthAndStencil);
        }
      }
      _checkCameraRenderTarget(camera) {
        var _a;
        if ((camera == null ? void 0 : camera.outputRenderTarget) && !(camera == null ? void 0 : camera.isRigCamera)) {
          camera.outputRenderTarget._cleared = false;
        }
        if ((_a = camera == null ? void 0 : camera.rigCameras) == null ? void 0 : _a.length) {
          for (let i = 0; i < camera.rigCameras.length; ++i) {
            const rtt = camera.rigCameras[i].outputRenderTarget;
            if (rtt) {
              rtt._cleared = false;
            }
          }
        }
      }
      /**
       * Resets the draw wrappers cache of all meshes
       * @param passId If provided, releases only the draw wrapper corresponding to this render pass id
       */
      resetDrawCache(passId) {
        if (!this.meshes) {
          return;
        }
        for (const mesh of this.meshes) {
          mesh.resetDrawCache(passId);
        }
      }
      /**
       * Render the scene
       * @param updateCameras defines a boolean indicating if cameras must update according to their inputs (true by default)
       * @param ignoreAnimations defines a boolean indicating if animations should not be executed (false by default)
       */
      render(updateCameras = true, ignoreAnimations = false) {
        var _a, _b;
        if (this.isDisposed) {
          return;
        }
        if (this.onReadyObservable.hasObservers() && this._executeWhenReadyTimeoutId === null) {
          this._checkIsReady();
        }
        this._frameId++;
        this._defaultFrameBufferCleared = false;
        this._checkCameraRenderTarget(this.activeCamera);
        if ((_a = this.activeCameras) == null ? void 0 : _a.length) {
          this.activeCameras.forEach(this._checkCameraRenderTarget);
        }
        this._registerTransientComponents();
        this._activeParticles.fetchNewFrame();
        this._totalVertices.fetchNewFrame();
        this._activeIndices.fetchNewFrame();
        this._activeBones.fetchNewFrame();
        this._meshesForIntersections.reset();
        this.resetCachedMaterial();
        this.onBeforeAnimationsObservable.notifyObservers(this);
        if (this.actionManager) {
          this.actionManager.processTrigger(11);
        }
        if (!ignoreAnimations) {
          this.animate();
        }
        for (const step of this._beforeCameraUpdateStage) {
          step.action();
        }
        if (updateCameras) {
          if (this.activeCameras && this.activeCameras.length > 0) {
            for (let cameraIndex = 0; cameraIndex < this.activeCameras.length; cameraIndex++) {
              const camera = this.activeCameras[cameraIndex];
              camera.update();
              if (camera.cameraRigMode !== 0) {
                for (let index = 0; index < camera._rigCameras.length; index++) {
                  camera._rigCameras[index].update();
                }
              }
            }
          } else if (this.activeCamera) {
            this.activeCamera.update();
            if (this.activeCamera.cameraRigMode !== 0) {
              for (let index = 0; index < this.activeCamera._rigCameras.length; index++) {
                this.activeCamera._rigCameras[index].update();
              }
            }
          }
        }
        this.onBeforeRenderObservable.notifyObservers(this);
        const engine = this.getEngine();
        this.onBeforeRenderTargetsRenderObservable.notifyObservers(this);
        const currentActiveCamera = ((_b = this.activeCameras) == null ? void 0 : _b.length) ? this.activeCameras[0] : this.activeCamera;
        if (this.renderTargetsEnabled) {
          Tools.StartPerformanceCounter("Custom render targets", this.customRenderTargets.length > 0);
          this._intermediateRendering = true;
          for (let customIndex = 0; customIndex < this.customRenderTargets.length; customIndex++) {
            const renderTarget = this.customRenderTargets[customIndex];
            if (renderTarget._shouldRender()) {
              this._renderId++;
              this.activeCamera = renderTarget.activeCamera || this.activeCamera;
              if (!this.activeCamera) {
                throw new Error("Active camera not set");
              }
              engine.setViewport(this.activeCamera.viewport);
              this.updateTransformMatrix();
              renderTarget.render(currentActiveCamera !== this.activeCamera, this.dumpNextRenderTargets);
            }
          }
          Tools.EndPerformanceCounter("Custom render targets", this.customRenderTargets.length > 0);
          this._intermediateRendering = false;
          this._renderId++;
        }
        this._engine.currentRenderPassId = (currentActiveCamera == null ? void 0 : currentActiveCamera.renderPassId) ?? 0;
        this.activeCamera = currentActiveCamera;
        if (this._activeCamera && this._activeCamera.cameraRigMode !== 22 && !this.prePass) {
          this._bindFrameBuffer(this._activeCamera, false);
        }
        this.onAfterRenderTargetsRenderObservable.notifyObservers(this);
        for (const step of this._beforeClearStage) {
          step.action();
        }
        this._clearFrameBuffer(this.activeCamera);
        for (const step of this._gatherRenderTargetsStage) {
          step.action(this._renderTargets);
        }
        if (this.activeCameras && this.activeCameras.length > 0) {
          for (let cameraIndex = 0; cameraIndex < this.activeCameras.length; cameraIndex++) {
            this._processSubCameras(this.activeCameras[cameraIndex], cameraIndex > 0);
          }
        } else {
          if (!this.activeCamera) {
            throw new Error("No camera defined");
          }
          this._processSubCameras(this.activeCamera, !!this.activeCamera.outputRenderTarget);
        }
        this._checkIntersections();
        for (const step of this._afterRenderStage) {
          step.action();
        }
        if (this.afterRender) {
          this.afterRender();
        }
        this.onAfterRenderObservable.notifyObservers(this);
        if (this._toBeDisposed.length) {
          for (let index = 0; index < this._toBeDisposed.length; index++) {
            const data = this._toBeDisposed[index];
            if (data) {
              data.dispose();
            }
          }
          this._toBeDisposed.length = 0;
        }
        if (this.dumpNextRenderTargets) {
          this.dumpNextRenderTargets = false;
        }
        this._activeBones.addCount(0, true);
        this._activeIndices.addCount(0, true);
        this._activeParticles.addCount(0, true);
        this._engine.restoreDefaultFramebuffer();
      }
      /**
       * Freeze all materials
       * A frozen material will not be updatable but should be faster to render
       * Note: multimaterials will not be frozen, but their submaterials will
       */
      freezeMaterials() {
        for (let i = 0; i < this.materials.length; i++) {
          this.materials[i].freeze();
        }
      }
      /**
       * Unfreeze all materials
       * A frozen material will not be updatable but should be faster to render
       */
      unfreezeMaterials() {
        for (let i = 0; i < this.materials.length; i++) {
          this.materials[i].unfreeze();
        }
      }
      /**
       * Releases all held resources
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this.beforeRender = null;
        this.afterRender = null;
        this.metadata = null;
        this.skeletons.length = 0;
        this.morphTargetManagers.length = 0;
        this._transientComponents.length = 0;
        this._isReadyForMeshStage.clear();
        this._beforeEvaluateActiveMeshStage.clear();
        this._evaluateSubMeshStage.clear();
        this._preActiveMeshStage.clear();
        this._cameraDrawRenderTargetStage.clear();
        this._beforeCameraDrawStage.clear();
        this._beforeRenderTargetDrawStage.clear();
        this._beforeRenderingGroupDrawStage.clear();
        this._beforeRenderingMeshStage.clear();
        this._afterRenderingMeshStage.clear();
        this._afterRenderingGroupDrawStage.clear();
        this._afterCameraDrawStage.clear();
        this._afterRenderTargetDrawStage.clear();
        this._afterRenderStage.clear();
        this._beforeCameraUpdateStage.clear();
        this._beforeClearStage.clear();
        this._gatherRenderTargetsStage.clear();
        this._gatherActiveCameraRenderTargetsStage.clear();
        this._pointerMoveStage.clear();
        this._pointerDownStage.clear();
        this._pointerUpStage.clear();
        this.importedMeshesFiles = [];
        if (this.stopAllAnimations) {
          this._activeAnimatables.forEach((animatable) => {
            animatable.onAnimationEndObservable.clear();
            animatable.onAnimationEnd = null;
          });
          this.stopAllAnimations();
        }
        this.resetCachedMaterial();
        if (this.activeCamera) {
          this.activeCamera._activeMeshes.dispose();
          this.activeCamera = null;
        }
        this.activeCameras = null;
        this._activeMeshes.dispose();
        this._renderingManager.dispose();
        this._processedMaterials.dispose();
        this._activeParticleSystems.dispose();
        this._activeSkeletons.dispose();
        this._softwareSkinnedMeshes.dispose();
        this._renderTargets.dispose();
        this._materialsRenderTargets.dispose();
        this._registeredForLateAnimationBindings.dispose();
        this._meshesForIntersections.dispose();
        this._toBeDisposed.length = 0;
        const activeRequests = this._activeRequests.slice();
        for (const request of activeRequests) {
          request.abort();
        }
        this._activeRequests.length = 0;
        try {
          this.onDisposeObservable.notifyObservers(this);
        } catch (e) {
          Logger.Error("An error occurred while calling onDisposeObservable!", e);
        }
        this.detachControl();
        const canvas = this._engine.getInputElement();
        if (canvas) {
          for (let index2 = 0; index2 < this.cameras.length; index2++) {
            this.cameras[index2].detachControl();
          }
        }
        this._disposeList(this.animationGroups);
        this._disposeList(this.lights);
        this._disposeList(this.meshes, (item) => item.dispose(true));
        this._disposeList(this.transformNodes, (item) => item.dispose(true));
        const cameras = this.cameras;
        this._disposeList(cameras);
        if (this._defaultMaterial) {
          this._defaultMaterial.dispose();
        }
        this._disposeList(this.multiMaterials);
        this._disposeList(this.materials);
        this._disposeList(this.particleSystems);
        this._disposeList(this.postProcesses);
        this._disposeList(this.textures);
        this._disposeList(this.morphTargetManagers);
        this._sceneUbo.dispose();
        if (this._multiviewSceneUbo) {
          this._multiviewSceneUbo.dispose();
        }
        this.postProcessManager.dispose();
        this._disposeList(this._components);
        let index = this._engine.scenes.indexOf(this);
        if (index > -1) {
          this._engine.scenes.splice(index, 1);
        }
        if (EngineStore._LastCreatedScene === this) {
          if (this._engine.scenes.length > 0) {
            EngineStore._LastCreatedScene = this._engine.scenes[this._engine.scenes.length - 1];
          } else {
            EngineStore._LastCreatedScene = null;
          }
        }
        index = this._engine._virtualScenes.indexOf(this);
        if (index > -1) {
          this._engine._virtualScenes.splice(index, 1);
        }
        this._engine.wipeCaches(true);
        this.onDisposeObservable.clear();
        this.onBeforeRenderObservable.clear();
        this.onAfterRenderObservable.clear();
        this.onBeforeRenderTargetsRenderObservable.clear();
        this.onAfterRenderTargetsRenderObservable.clear();
        this.onAfterStepObservable.clear();
        this.onBeforeStepObservable.clear();
        this.onBeforeActiveMeshesEvaluationObservable.clear();
        this.onAfterActiveMeshesEvaluationObservable.clear();
        this.onBeforeParticlesRenderingObservable.clear();
        this.onAfterParticlesRenderingObservable.clear();
        this.onBeforeDrawPhaseObservable.clear();
        this.onAfterDrawPhaseObservable.clear();
        this.onBeforeAnimationsObservable.clear();
        this.onAfterAnimationsObservable.clear();
        this.onDataLoadedObservable.clear();
        this.onBeforeRenderingGroupObservable.clear();
        this.onAfterRenderingGroupObservable.clear();
        this.onMeshImportedObservable.clear();
        this.onBeforeCameraRenderObservable.clear();
        this.onAfterCameraRenderObservable.clear();
        this.onAfterRenderCameraObservable.clear();
        this.onReadyObservable.clear();
        this.onNewCameraAddedObservable.clear();
        this.onCameraRemovedObservable.clear();
        this.onNewLightAddedObservable.clear();
        this.onLightRemovedObservable.clear();
        this.onNewGeometryAddedObservable.clear();
        this.onGeometryRemovedObservable.clear();
        this.onNewTransformNodeAddedObservable.clear();
        this.onTransformNodeRemovedObservable.clear();
        this.onNewMeshAddedObservable.clear();
        this.onMeshRemovedObservable.clear();
        this.onNewSkeletonAddedObservable.clear();
        this.onSkeletonRemovedObservable.clear();
        this.onNewMaterialAddedObservable.clear();
        this.onNewMultiMaterialAddedObservable.clear();
        this.onMaterialRemovedObservable.clear();
        this.onMultiMaterialRemovedObservable.clear();
        this.onNewTextureAddedObservable.clear();
        this.onTextureRemovedObservable.clear();
        this.onPrePointerObservable.clear();
        this.onPointerObservable.clear();
        this.onPreKeyboardObservable.clear();
        this.onKeyboardObservable.clear();
        this.onActiveCameraChanged.clear();
        this.onScenePerformancePriorityChangedObservable.clear();
        this._isDisposed = true;
      }
      _disposeList(items, callback) {
        const itemsCopy = items.slice(0);
        callback = callback ?? ((item) => item.dispose());
        for (const item of itemsCopy) {
          callback(item);
        }
        items.length = 0;
      }
      /**
       * Gets if the scene is already disposed
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Call this function to reduce memory footprint of the scene.
       * Vertex buffers will not store CPU data anymore (this will prevent picking, collisions or physics to work correctly)
       */
      clearCachedVertexData() {
        for (let meshIndex = 0; meshIndex < this.meshes.length; meshIndex++) {
          const mesh = this.meshes[meshIndex];
          const geometry = mesh.geometry;
          if (geometry) {
            geometry.clearCachedData();
          }
        }
      }
      /**
       * This function will remove the local cached buffer data from texture.
       * It will save memory but will prevent the texture from being rebuilt
       */
      cleanCachedTextureBuffer() {
        for (const baseTexture of this.textures) {
          const buffer = baseTexture._buffer;
          if (buffer) {
            baseTexture._buffer = null;
          }
        }
      }
      /**
       * Get the world extend vectors with an optional filter
       *
       * @param filterPredicate the predicate - which meshes should be included when calculating the world size
       * @returns {{ min: Vector3; max: Vector3 }} min and max vectors
       */
      getWorldExtends(filterPredicate) {
        const min = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        const max = new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        filterPredicate = filterPredicate || (() => true);
        this.meshes.filter(filterPredicate).forEach((mesh) => {
          mesh.computeWorldMatrix(true);
          if (!mesh.subMeshes || mesh.subMeshes.length === 0 || mesh.infiniteDistance) {
            return;
          }
          const boundingInfo = mesh.getBoundingInfo();
          const minBox = boundingInfo.boundingBox.minimumWorld;
          const maxBox = boundingInfo.boundingBox.maximumWorld;
          Vector3.CheckExtends(minBox, min, max);
          Vector3.CheckExtends(maxBox, min, max);
        });
        return {
          min,
          max
        };
      }
      // Picking
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a ray that can be used to pick in the scene
       * @param x defines the x coordinate of the origin (on-screen)
       * @param y defines the y coordinate of the origin (on-screen)
       * @param world defines the world matrix to use if you want to pick in object space (instead of world space)
       * @param camera defines the camera to use for the picking
       * @param cameraViewSpace defines if picking will be done in view space (false by default)
       * @returns a Ray
       */
      createPickingRay(x, y, world, camera, cameraViewSpace = false) {
        throw _WarnImport("Ray");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a ray that can be used to pick in the scene
       * @param x defines the x coordinate of the origin (on-screen)
       * @param y defines the y coordinate of the origin (on-screen)
       * @param world defines the world matrix to use if you want to pick in object space (instead of world space)
       * @param result defines the ray where to store the picking ray
       * @param camera defines the camera to use for the picking
       * @param cameraViewSpace defines if picking will be done in view space (false by default)
       * @param enableDistantPicking defines if picking should handle large values for mesh position/scaling (false by default)
       * @returns the current scene
       */
      createPickingRayToRef(x, y, world, result, camera, cameraViewSpace = false, enableDistantPicking = false) {
        throw _WarnImport("Ray");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a ray that can be used to pick in the scene
       * @param x defines the x coordinate of the origin (on-screen)
       * @param y defines the y coordinate of the origin (on-screen)
       * @param camera defines the camera to use for the picking
       * @returns a Ray
       */
      createPickingRayInCameraSpace(x, y, camera) {
        throw _WarnImport("Ray");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a ray that can be used to pick in the scene
       * @param x defines the x coordinate of the origin (on-screen)
       * @param y defines the y coordinate of the origin (on-screen)
       * @param result defines the ray where to store the picking ray
       * @param camera defines the camera to use for the picking
       * @returns the current scene
       */
      createPickingRayInCameraSpaceToRef(x, y, result, camera) {
        throw _WarnImport("Ray");
      }
      /** @internal */
      get _pickingAvailable() {
        return false;
      }
      /** Launch a ray to try to pick a mesh in the scene
       * @param x position on screen
       * @param y position on screen
       * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
       * @param fastCheck defines if the first intersection will be used (and not the closest)
       * @param camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
       * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
       * @returns a PickingInfo
       */
      pick(x, y, predicate, fastCheck, camera, trianglePredicate) {
        const warn = _WarnImport("Ray", true);
        if (warn) {
          Logger.Warn(warn);
        }
        return new PickingInfo();
      }
      /** Launch a ray to try to pick a mesh in the scene using only bounding information of the main mesh (not using submeshes)
       * @param x position on screen
       * @param y position on screen
       * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
       * @param fastCheck defines if the first intersection will be used (and not the closest)
       * @param camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
       * @returns a PickingInfo (Please note that some info will not be set like distance, bv, bu and everything that cannot be capture by only using bounding infos)
       */
      pickWithBoundingInfo(x, y, predicate, fastCheck, camera) {
        const warn = _WarnImport("Ray", true);
        if (warn) {
          Logger.Warn(warn);
        }
        return new PickingInfo();
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Use the given ray to pick a mesh in the scene. A mesh triangle can be picked both from its front and back sides,
       * irrespective of orientation.
       * @param ray The ray to use to pick meshes
       * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must have isPickable set to true
       * @param fastCheck defines if the first intersection will be used (and not the closest)
       * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
       * @returns a PickingInfo
       */
      pickWithRay(ray, predicate, fastCheck, trianglePredicate) {
        throw _WarnImport("Ray");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Launch a ray to try to pick a mesh in the scene. A mesh triangle can be picked both from its front and back sides,
       * irrespective of orientation.
       * @param x X position on screen
       * @param y Y position on screen
       * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
       * @param camera camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
       * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
       * @returns an array of PickingInfo
       */
      multiPick(x, y, predicate, camera, trianglePredicate) {
        throw _WarnImport("Ray");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Launch a ray to try to pick a mesh in the scene
       * @param ray Ray to use
       * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
       * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
       * @returns an array of PickingInfo
       */
      multiPickWithRay(ray, predicate, trianglePredicate) {
        throw _WarnImport("Ray");
      }
      /**
       * Force the value of meshUnderPointer
       * @param mesh defines the mesh to use
       * @param pointerId optional pointer id when using more than one pointer
       * @param pickResult optional pickingInfo data used to find mesh
       */
      setPointerOverMesh(mesh, pointerId, pickResult) {
        this._inputManager.setPointerOverMesh(mesh, pointerId, pickResult);
      }
      /**
       * Gets the mesh under the pointer
       * @returns a Mesh or null if no mesh is under the pointer
       */
      getPointerOverMesh() {
        return this._inputManager.getPointerOverMesh();
      }
      // Misc.
      /** @internal */
      _rebuildGeometries() {
        for (const geometry of this.geometries) {
          geometry._rebuild();
        }
        for (const mesh of this.meshes) {
          mesh._rebuild();
        }
        if (this.postProcessManager) {
          this.postProcessManager._rebuild();
        }
        for (const component of this._components) {
          component.rebuild();
        }
        for (const system of this.particleSystems) {
          system.rebuild();
        }
        if (this.spriteManagers) {
          for (const spriteMgr of this.spriteManagers) {
            spriteMgr.rebuild();
          }
        }
      }
      /** @internal */
      _rebuildTextures() {
        for (const texture of this.textures) {
          texture._rebuild(true);
        }
        this.markAllMaterialsAsDirty(1);
      }
      /**
       * Get from a list of objects by tags
       * @param list the list of objects to use
       * @param tagsQuery the query to use
       * @param filter a predicate to filter for tags
       * @returns
       */
      _getByTags(list, tagsQuery, filter) {
        if (tagsQuery === void 0) {
          return list;
        }
        const listByTags = [];
        for (const i in list) {
          const item = list[i];
          if (Tags && Tags.MatchesQuery(item, tagsQuery) && (!filter || filter(item))) {
            listByTags.push(item);
          }
        }
        return listByTags;
      }
      /**
       * Get a list of meshes by tags
       * @param tagsQuery defines the tags query to use
       * @param filter defines a predicate used to filter results
       * @returns an array of Mesh
       */
      getMeshesByTags(tagsQuery, filter) {
        return this._getByTags(this.meshes, tagsQuery, filter);
      }
      /**
       * Get a list of cameras by tags
       * @param tagsQuery defines the tags query to use
       * @param filter defines a predicate used to filter results
       * @returns an array of Camera
       */
      getCamerasByTags(tagsQuery, filter) {
        return this._getByTags(this.cameras, tagsQuery, filter);
      }
      /**
       * Get a list of lights by tags
       * @param tagsQuery defines the tags query to use
       * @param filter defines a predicate used to filter results
       * @returns an array of Light
       */
      getLightsByTags(tagsQuery, filter) {
        return this._getByTags(this.lights, tagsQuery, filter);
      }
      /**
       * Get a list of materials by tags
       * @param tagsQuery defines the tags query to use
       * @param filter defines a predicate used to filter results
       * @returns an array of Material
       */
      getMaterialByTags(tagsQuery, filter) {
        return this._getByTags(this.materials, tagsQuery, filter).concat(this._getByTags(this.multiMaterials, tagsQuery, filter));
      }
      /**
       * Get a list of transform nodes by tags
       * @param tagsQuery defines the tags query to use
       * @param filter defines a predicate used to filter results
       * @returns an array of TransformNode
       */
      getTransformNodesByTags(tagsQuery, filter) {
        return this._getByTags(this.transformNodes, tagsQuery, filter);
      }
      /**
       * Overrides the default sort function applied in the rendering group to prepare the meshes.
       * This allowed control for front to back rendering or reversly depending of the special needs.
       *
       * @param renderingGroupId The rendering group id corresponding to its index
       * @param opaqueSortCompareFn The opaque queue comparison function use to sort.
       * @param alphaTestSortCompareFn The alpha test queue comparison function use to sort.
       * @param transparentSortCompareFn The transparent queue comparison function use to sort.
       */
      setRenderingOrder(renderingGroupId, opaqueSortCompareFn = null, alphaTestSortCompareFn = null, transparentSortCompareFn = null) {
        this._renderingManager.setRenderingOrder(renderingGroupId, opaqueSortCompareFn, alphaTestSortCompareFn, transparentSortCompareFn);
      }
      /**
       * Specifies whether or not the stencil and depth buffer are cleared between two rendering groups.
       *
       * @param renderingGroupId The rendering group id corresponding to its index
       * @param autoClearDepthStencil Automatically clears depth and stencil between groups if true.
       * @param depth Automatically clears depth between groups if true and autoClear is true.
       * @param stencil Automatically clears stencil between groups if true and autoClear is true.
       */
      setRenderingAutoClearDepthStencil(renderingGroupId, autoClearDepthStencil, depth = true, stencil = true) {
        this._renderingManager.setRenderingAutoClearDepthStencil(renderingGroupId, autoClearDepthStencil, depth, stencil);
      }
      /**
       * Gets the current auto clear configuration for one rendering group of the rendering
       * manager.
       * @param index the rendering group index to get the information for
       * @returns The auto clear setup for the requested rendering group
       */
      getAutoClearDepthStencilSetup(index) {
        return this._renderingManager.getAutoClearDepthStencilSetup(index);
      }
      /** @internal */
      _forceBlockMaterialDirtyMechanism(value) {
        this._blockMaterialDirtyMechanism = value;
      }
      /** Gets or sets a boolean blocking all the calls to markAllMaterialsAsDirty (ie. the materials won't be updated if they are out of sync) */
      get blockMaterialDirtyMechanism() {
        return this._blockMaterialDirtyMechanism;
      }
      set blockMaterialDirtyMechanism(value) {
        if (this._blockMaterialDirtyMechanism === value) {
          return;
        }
        this._blockMaterialDirtyMechanism = value;
        if (!value) {
          this.markAllMaterialsAsDirty(63);
        }
      }
      /**
       * Will flag all materials as dirty to trigger new shader compilation
       * @param flag defines the flag used to specify which material part must be marked as dirty
       * @param predicate If not null, it will be used to specify if a material has to be marked as dirty
       */
      markAllMaterialsAsDirty(flag, predicate) {
        if (this._blockMaterialDirtyMechanism) {
          return;
        }
        for (const material of this.materials) {
          if (predicate && !predicate(material)) {
            continue;
          }
          material.markAsDirty(flag);
        }
      }
      /**
       * @internal
       */
      _loadFile(fileOrUrl, onSuccess, onProgress, useOfflineSupport, useArrayBuffer, onError, onOpened) {
        const request = LoadFile(fileOrUrl, onSuccess, onProgress, useOfflineSupport ? this.offlineProvider : void 0, useArrayBuffer, onError, onOpened);
        this._activeRequests.push(request);
        request.onCompleteObservable.add((request2) => {
          this._activeRequests.splice(this._activeRequests.indexOf(request2), 1);
        });
        return request;
      }
      /**
       * @internal
       */
      _loadFileAsync(fileOrUrl, onProgress, useOfflineSupport, useArrayBuffer, onOpened) {
        return new Promise((resolve, reject) => {
          this._loadFile(fileOrUrl, (data) => {
            resolve(data);
          }, onProgress, useOfflineSupport, useArrayBuffer, (request, exception) => {
            reject(exception);
          }, onOpened);
        });
      }
      /**
       * @internal
       */
      _requestFile(url, onSuccess, onProgress, useOfflineSupport, useArrayBuffer, onError, onOpened) {
        const request = RequestFile(url, onSuccess, onProgress, useOfflineSupport ? this.offlineProvider : void 0, useArrayBuffer, onError, onOpened);
        this._activeRequests.push(request);
        request.onCompleteObservable.add((request2) => {
          this._activeRequests.splice(this._activeRequests.indexOf(request2), 1);
        });
        return request;
      }
      /**
       * @internal
       */
      _requestFileAsync(url, onProgress, useOfflineSupport, useArrayBuffer, onOpened) {
        return new Promise((resolve, reject) => {
          this._requestFile(url, (data) => {
            resolve(data);
          }, onProgress, useOfflineSupport, useArrayBuffer, (error) => {
            reject(error);
          }, onOpened);
        });
      }
      /**
       * @internal
       */
      _readFile(file, onSuccess, onProgress, useArrayBuffer, onError) {
        const request = ReadFile(file, onSuccess, onProgress, useArrayBuffer, onError);
        this._activeRequests.push(request);
        request.onCompleteObservable.add((request2) => {
          this._activeRequests.splice(this._activeRequests.indexOf(request2), 1);
        });
        return request;
      }
      /**
       * @internal
       */
      _readFileAsync(file, onProgress, useArrayBuffer) {
        return new Promise((resolve, reject) => {
          this._readFile(file, (data) => {
            resolve(data);
          }, onProgress, useArrayBuffer, (error) => {
            reject(error);
          });
        });
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * This method gets the performance collector belonging to the scene, which is generally shared with the inspector.
       * @returns the perf collector belonging to the scene.
       */
      getPerfCollector() {
        throw _WarnImport("performanceViewerSceneExtension");
      }
      // deprecated
      /**
       * Sets the active camera of the scene using its Id
       * @param id defines the camera's Id
       * @returns the new active camera or null if none found.
       * @deprecated Please use setActiveCameraById instead
       */
      setActiveCameraByID(id) {
        return this.setActiveCameraById(id);
      }
      /**
       * Get a material using its id
       * @param id defines the material's Id
       * @returns the material or null if none found.
       * @deprecated Please use getMaterialById instead
       */
      getMaterialByID(id) {
        return this.getMaterialById(id);
      }
      /**
       * Gets a the last added material using a given id
       * @param id defines the material's Id
       * @returns the last material with the given id or null if none found.
       * @deprecated Please use getLastMaterialById instead
       */
      getLastMaterialByID(id) {
        return this.getLastMaterialById(id);
      }
      /**
       * Get a texture using its unique id
       * @param uniqueId defines the texture's unique id
       * @returns the texture or null if none found.
       * @deprecated Please use getTextureByUniqueId instead
       */
      getTextureByUniqueID(uniqueId) {
        return this.getTextureByUniqueId(uniqueId);
      }
      /**
       * Gets a camera using its Id
       * @param id defines the Id to look for
       * @returns the camera or null if not found
       * @deprecated Please use getCameraById instead
       */
      getCameraByID(id) {
        return this.getCameraById(id);
      }
      /**
       * Gets a camera using its unique Id
       * @param uniqueId defines the unique Id to look for
       * @returns the camera or null if not found
       * @deprecated Please use getCameraByUniqueId instead
       */
      getCameraByUniqueID(uniqueId) {
        return this.getCameraByUniqueId(uniqueId);
      }
      /**
       * Gets a bone using its Id
       * @param id defines the bone's Id
       * @returns the bone or null if not found
       * @deprecated Please use getBoneById instead
       */
      getBoneByID(id) {
        return this.getBoneById(id);
      }
      /**
       * Gets a light node using its Id
       * @param id defines the light's Id
       * @returns the light or null if none found.
       * @deprecated Please use getLightById instead
       */
      getLightByID(id) {
        return this.getLightById(id);
      }
      /**
       * Gets a light node using its scene-generated unique Id
       * @param uniqueId defines the light's unique Id
       * @returns the light or null if none found.
       * @deprecated Please use getLightByUniqueId instead
       */
      getLightByUniqueID(uniqueId) {
        return this.getLightByUniqueId(uniqueId);
      }
      /**
       * Gets a particle system by Id
       * @param id defines the particle system Id
       * @returns the corresponding system or null if none found
       * @deprecated Please use getParticleSystemById instead
       */
      getParticleSystemByID(id) {
        return this.getParticleSystemById(id);
      }
      /**
       * Gets a geometry using its Id
       * @param id defines the geometry's Id
       * @returns the geometry or null if none found.
       * @deprecated Please use getGeometryById instead
       */
      getGeometryByID(id) {
        return this.getGeometryById(id);
      }
      /**
       * Gets the first added mesh found of a given Id
       * @param id defines the Id to search for
       * @returns the mesh found or null if not found at all
       * @deprecated Please use getMeshById instead
       */
      getMeshByID(id) {
        return this.getMeshById(id);
      }
      /**
       * Gets a mesh with its auto-generated unique Id
       * @param uniqueId defines the unique Id to search for
       * @returns the found mesh or null if not found at all.
       * @deprecated Please use getMeshByUniqueId instead
       */
      getMeshByUniqueID(uniqueId) {
        return this.getMeshByUniqueId(uniqueId);
      }
      /**
       * Gets a the last added mesh using a given Id
       * @param id defines the Id to search for
       * @returns the found mesh or null if not found at all.
       * @deprecated Please use getLastMeshById instead
       */
      getLastMeshByID(id) {
        return this.getLastMeshById(id);
      }
      /**
       * Gets a list of meshes using their Id
       * @param id defines the Id to search for
       * @returns a list of meshes
       * @deprecated Please use getMeshesById instead
       */
      getMeshesByID(id) {
        return this.getMeshesById(id);
      }
      /**
       * Gets the first added transform node found of a given Id
       * @param id defines the Id to search for
       * @returns the found transform node or null if not found at all.
       * @deprecated Please use getTransformNodeById instead
       */
      getTransformNodeByID(id) {
        return this.getTransformNodeById(id);
      }
      /**
       * Gets a transform node with its auto-generated unique Id
       * @param uniqueId defines the unique Id to search for
       * @returns the found transform node or null if not found at all.
       * @deprecated Please use getTransformNodeByUniqueId instead
       */
      getTransformNodeByUniqueID(uniqueId) {
        return this.getTransformNodeByUniqueId(uniqueId);
      }
      /**
       * Gets a list of transform nodes using their Id
       * @param id defines the Id to search for
       * @returns a list of transform nodes
       * @deprecated Please use getTransformNodesById instead
       */
      getTransformNodesByID(id) {
        return this.getTransformNodesById(id);
      }
      /**
       * Gets a node (Mesh, Camera, Light) using a given Id
       * @param id defines the Id to search for
       * @returns the found node or null if not found at all
       * @deprecated Please use getNodeById instead
       */
      getNodeByID(id) {
        return this.getNodeById(id);
      }
      /**
       * Gets a the last added node (Mesh, Camera, Light) using a given Id
       * @param id defines the Id to search for
       * @returns the found node or null if not found at all
       * @deprecated Please use getLastEntryById instead
       */
      getLastEntryByID(id) {
        return this.getLastEntryById(id);
      }
      /**
       * Gets a skeleton using a given Id (if many are found, this function will pick the last one)
       * @param id defines the Id to search for
       * @returns the found skeleton or null if not found at all.
       * @deprecated Please use getLastSkeletonById instead
       */
      getLastSkeletonByID(id) {
        return this.getLastSkeletonById(id);
      }
    };
    Scene.FOGMODE_NONE = 0;
    Scene.FOGMODE_EXP = 1;
    Scene.FOGMODE_EXP2 = 2;
    Scene.FOGMODE_LINEAR = 3;
    Scene.MinDeltaTime = 1;
    Scene.MaxDeltaTime = 1e3;
  }
});

export {
  SmartArray,
  SmartArrayNoDuplicate,
  init_smartArray,
  StringDictionary,
  init_stringDictionary,
  AndOrNotEvaluator,
  init_andOrNotEvaluator,
  Tags,
  init_tags,
  AbstractScene,
  init_abstractScene,
  __decorate,
  init_tslib_es6,
  expandToProperty,
  serialize,
  serializeAsTexture,
  serializeAsColor3,
  serializeAsFresnelParameters,
  serializeAsVector2,
  serializeAsVector3,
  serializeAsMeshReference,
  serializeAsColorCurves,
  serializeAsColor4,
  serializeAsImageProcessingConfiguration,
  serializeAsQuaternion,
  serializeAsMatrix,
  serializeAsCameraReference,
  nativeOverride,
  init_decorators,
  SerializationHelper,
  init_decorators_serialization,
  ColorCurves,
  init_colorCurves,
  PrepareUniformsForImageProcessing,
  PrepareSamplersForImageProcessing,
  init_imageProcessingConfiguration_functions,
  ImageProcessingConfiguration,
  init_imageProcessingConfiguration,
  init_engine_uniformBuffer,
  UniformBuffer,
  init_uniformBuffer,
  Buffer,
  VertexBuffer,
  init_buffer,
  PickingInfo,
  init_pickingInfo,
  ActionEvent,
  init_actionEvent,
  PostProcessManager,
  init_postProcessManager,
  RenderingGroup,
  init_renderingGroup,
  RenderingGroupInfo,
  RenderingManager,
  init_renderingManager,
  SceneComponentConstants,
  Stage,
  init_sceneComponent,
  PointerEventTypes,
  PointerInfoBase,
  PointerInfoPre,
  PointerInfo,
  init_pointerEvents,
  AbstractActionManager,
  init_abstractActionManager,
  KeyboardEventTypes,
  KeyboardInfo,
  KeyboardInfoPre,
  init_keyboardEvents,
  DeviceType,
  PointerInput,
  NativePointerInput,
  DualShockInput,
  DualSenseInput,
  XboxInput,
  SwitchInput,
  init_deviceEnums,
  DeviceInputEventType,
  EventConstants,
  init_deviceInputEvents,
  DeviceSource,
  init_deviceSource,
  DeviceSourceManager,
  init_deviceSourceManager,
  Plane,
  init_math_plane,
  Frustum,
  init_math_frustum,
  UniqueIdGenerator,
  init_uniqueIdGenerator,
  LightConstants,
  init_lightConstants,
  ScenePerformancePriority,
  Scene,
  init_scene
};
//# sourceMappingURL=chunk-HR5KTCVE.js.map
