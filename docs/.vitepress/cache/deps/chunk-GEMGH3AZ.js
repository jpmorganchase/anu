import {
  EngineStore,
  Observable,
  PerformanceConfigurator,
  init_engineStore,
  init_observable,
  init_performanceConfigurator
} from "./chunk-AD6Y6P3L.js";
import {
  __esm
} from "./chunk-CF3WPAMV.js";

// node_modules/@babylonjs/core/Materials/Textures/textureSampler.js
var TextureSampler;
var init_textureSampler = __esm({
  "node_modules/@babylonjs/core/Materials/Textures/textureSampler.js"() {
    TextureSampler = class {
      /**
       * | Value | Type               | Description |
       * | ----- | ------------------ | ----------- |
       * | 0     | CLAMP_ADDRESSMODE  |             |
       * | 1     | WRAP_ADDRESSMODE   |             |
       * | 2     | MIRROR_ADDRESSMODE |             |
       */
      get wrapU() {
        return this._cachedWrapU;
      }
      set wrapU(value) {
        this._cachedWrapU = value;
      }
      /**
       * | Value | Type               | Description |
       * | ----- | ------------------ | ----------- |
       * | 0     | CLAMP_ADDRESSMODE  |             |
       * | 1     | WRAP_ADDRESSMODE   |             |
       * | 2     | MIRROR_ADDRESSMODE |             |
       */
      get wrapV() {
        return this._cachedWrapV;
      }
      set wrapV(value) {
        this._cachedWrapV = value;
      }
      /**
       * | Value | Type               | Description |
       * | ----- | ------------------ | ----------- |
       * | 0     | CLAMP_ADDRESSMODE  |             |
       * | 1     | WRAP_ADDRESSMODE   |             |
       * | 2     | MIRROR_ADDRESSMODE |             |
       */
      get wrapR() {
        return this._cachedWrapR;
      }
      set wrapR(value) {
        this._cachedWrapR = value;
      }
      /**
       * With compliant hardware and browser (supporting anisotropic filtering)
       * this defines the level of anisotropic filtering in the texture.
       * The higher the better but the slower.
       */
      get anisotropicFilteringLevel() {
        return this._cachedAnisotropicFilteringLevel;
      }
      set anisotropicFilteringLevel(value) {
        this._cachedAnisotropicFilteringLevel = value;
      }
      /**
       * Gets or sets the comparison function (513, 514, etc). Set 0 to not use a comparison function
       */
      get comparisonFunction() {
        return this._comparisonFunction;
      }
      set comparisonFunction(value) {
        this._comparisonFunction = value;
      }
      /**
       * Indicates to use the mip maps (if available on the texture).
       * Thanks to this flag, you can instruct the sampler to not sample the mipmaps even if they exist (and if the sampling mode is set to a value that normally samples the mipmaps!)
       */
      get useMipMaps() {
        return this._useMipMaps;
      }
      set useMipMaps(value) {
        this._useMipMaps = value;
      }
      /**
       * Creates a Sampler instance
       */
      constructor() {
        this.samplingMode = -1;
        this._useMipMaps = true;
        this._cachedWrapU = null;
        this._cachedWrapV = null;
        this._cachedWrapR = null;
        this._cachedAnisotropicFilteringLevel = null;
        this._comparisonFunction = 0;
      }
      /**
       * Sets all the parameters of the sampler
       * @param wrapU u address mode (default: TEXTURE_WRAP_ADDRESSMODE)
       * @param wrapV v address mode (default: TEXTURE_WRAP_ADDRESSMODE)
       * @param wrapR r address mode (default: TEXTURE_WRAP_ADDRESSMODE)
       * @param anisotropicFilteringLevel anisotropic level (default: 1)
       * @param samplingMode sampling mode (default: 2)
       * @param comparisonFunction comparison function (default: 0 - no comparison function)
       * @returns the current sampler instance
       */
      setParameters(wrapU = 1, wrapV = 1, wrapR = 1, anisotropicFilteringLevel = 1, samplingMode = 2, comparisonFunction = 0) {
        this._cachedWrapU = wrapU;
        this._cachedWrapV = wrapV;
        this._cachedWrapR = wrapR;
        this._cachedAnisotropicFilteringLevel = anisotropicFilteringLevel;
        this.samplingMode = samplingMode;
        this._comparisonFunction = comparisonFunction;
        return this;
      }
      /**
       * Compares this sampler with another one
       * @param other sampler to compare with
       * @returns true if the samplers have the same parametres, else false
       */
      compareSampler(other) {
        return this._cachedWrapU === other._cachedWrapU && this._cachedWrapV === other._cachedWrapV && this._cachedWrapR === other._cachedWrapR && this._cachedAnisotropicFilteringLevel === other._cachedAnisotropicFilteringLevel && this.samplingMode === other.samplingMode && this._comparisonFunction === other._comparisonFunction && this._useMipMaps === other._useMipMaps;
      }
    };
  }
});

// node_modules/@babylonjs/core/Materials/Textures/internalTexture.js
var InternalTextureSource, InternalTexture;
var init_internalTexture = __esm({
  "node_modules/@babylonjs/core/Materials/Textures/internalTexture.js"() {
    init_observable();
    init_textureSampler();
    (function(InternalTextureSource2) {
      InternalTextureSource2[InternalTextureSource2["Unknown"] = 0] = "Unknown";
      InternalTextureSource2[InternalTextureSource2["Url"] = 1] = "Url";
      InternalTextureSource2[InternalTextureSource2["Temp"] = 2] = "Temp";
      InternalTextureSource2[InternalTextureSource2["Raw"] = 3] = "Raw";
      InternalTextureSource2[InternalTextureSource2["Dynamic"] = 4] = "Dynamic";
      InternalTextureSource2[InternalTextureSource2["RenderTarget"] = 5] = "RenderTarget";
      InternalTextureSource2[InternalTextureSource2["MultiRenderTarget"] = 6] = "MultiRenderTarget";
      InternalTextureSource2[InternalTextureSource2["Cube"] = 7] = "Cube";
      InternalTextureSource2[InternalTextureSource2["CubeRaw"] = 8] = "CubeRaw";
      InternalTextureSource2[InternalTextureSource2["CubePrefiltered"] = 9] = "CubePrefiltered";
      InternalTextureSource2[InternalTextureSource2["Raw3D"] = 10] = "Raw3D";
      InternalTextureSource2[InternalTextureSource2["Raw2DArray"] = 11] = "Raw2DArray";
      InternalTextureSource2[InternalTextureSource2["DepthStencil"] = 12] = "DepthStencil";
      InternalTextureSource2[InternalTextureSource2["CubeRawRGBD"] = 13] = "CubeRawRGBD";
      InternalTextureSource2[InternalTextureSource2["Depth"] = 14] = "Depth";
    })(InternalTextureSource || (InternalTextureSource = {}));
    InternalTexture = class _InternalTexture extends TextureSampler {
      /**
       * Gets a boolean indicating if the texture uses mipmaps
       * TODO implements useMipMaps as a separate setting from generateMipMaps
       */
      get useMipMaps() {
        return this.generateMipMaps;
      }
      set useMipMaps(value) {
        this.generateMipMaps = value;
      }
      /** Gets the unique id of the internal texture */
      get uniqueId() {
        return this._uniqueId;
      }
      /** @internal */
      _setUniqueId(id) {
        this._uniqueId = id;
      }
      /**
       * Gets the Engine the texture belongs to.
       * @returns The babylon engine
       */
      getEngine() {
        return this._engine;
      }
      /**
       * Gets the data source type of the texture
       */
      get source() {
        return this._source;
      }
      /**
       * Creates a new InternalTexture
       * @param engine defines the engine to use
       * @param source defines the type of data that will be used
       * @param delayAllocation if the texture allocation should be delayed (default: false)
       */
      constructor(engine, source, delayAllocation = false) {
        super();
        this.isReady = false;
        this.isCube = false;
        this.is3D = false;
        this.is2DArray = false;
        this.isMultiview = false;
        this.url = "";
        this.generateMipMaps = false;
        this.samples = 0;
        this.type = -1;
        this.format = -1;
        this.onLoadedObservable = new Observable();
        this.onErrorObservable = new Observable();
        this.onRebuildCallback = null;
        this.width = 0;
        this.height = 0;
        this.depth = 0;
        this.baseWidth = 0;
        this.baseHeight = 0;
        this.baseDepth = 0;
        this.invertY = false;
        this._invertVScale = false;
        this._associatedChannel = -1;
        this._source = InternalTextureSource.Unknown;
        this._buffer = null;
        this._bufferView = null;
        this._bufferViewArray = null;
        this._bufferViewArrayArray = null;
        this._size = 0;
        this._extension = "";
        this._files = null;
        this._workingCanvas = null;
        this._workingContext = null;
        this._cachedCoordinatesMode = null;
        this._isDisabled = false;
        this._compression = null;
        this._sphericalPolynomial = null;
        this._sphericalPolynomialPromise = null;
        this._sphericalPolynomialComputed = false;
        this._lodGenerationScale = 0;
        this._lodGenerationOffset = 0;
        this._useSRGBBuffer = false;
        this._creationFlags = 0;
        this._lodTextureHigh = null;
        this._lodTextureMid = null;
        this._lodTextureLow = null;
        this._isRGBD = false;
        this._linearSpecularLOD = false;
        this._irradianceTexture = null;
        this._hardwareTexture = null;
        this._maxLodLevel = null;
        this._references = 1;
        this._gammaSpace = null;
        this._premulAlpha = false;
        this._dynamicTextureSource = null;
        this._engine = engine;
        this._source = source;
        this._uniqueId = _InternalTexture._Counter++;
        if (!delayAllocation) {
          this._hardwareTexture = engine._createHardwareTexture();
        }
      }
      /**
       * Increments the number of references (ie. the number of Texture that point to it)
       */
      incrementReferences() {
        this._references++;
      }
      /**
       * Change the size of the texture (not the size of the content)
       * @param width defines the new width
       * @param height defines the new height
       * @param depth defines the new depth (1 by default)
       */
      updateSize(width, height, depth = 1) {
        this._engine.updateTextureDimensions(this, width, height, depth);
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.baseWidth = width;
        this.baseHeight = height;
        this.baseDepth = depth;
        this._size = width * height * depth;
      }
      /** @internal */
      _rebuild() {
        this.isReady = false;
        this._cachedCoordinatesMode = null;
        this._cachedWrapU = null;
        this._cachedWrapV = null;
        this._cachedWrapR = null;
        this._cachedAnisotropicFilteringLevel = null;
        if (this.onRebuildCallback) {
          const data = this.onRebuildCallback(this);
          const swapAndSetIsReady = (proxyInternalTexture) => {
            proxyInternalTexture._swapAndDie(this, false);
            this.isReady = data.isReady;
          };
          if (data.isAsync) {
            data.proxy.then(swapAndSetIsReady);
          } else {
            swapAndSetIsReady(data.proxy);
          }
          return;
        }
        let proxy;
        switch (this.source) {
          case InternalTextureSource.Temp:
            break;
          case InternalTextureSource.Url:
            proxy = this._engine.createTexture(
              this._originalUrl ?? this.url,
              !this.generateMipMaps,
              this.invertY,
              null,
              this.samplingMode,
              // Do not use Proxy here as it could be fully synchronous
              // and proxy would be undefined.
              (temp) => {
                temp._swapAndDie(this, false);
                this.isReady = true;
              },
              null,
              this._buffer,
              void 0,
              this.format,
              this._extension,
              void 0,
              void 0,
              void 0,
              this._useSRGBBuffer
            );
            return;
          case InternalTextureSource.Raw:
            proxy = this._engine.createRawTexture(this._bufferView, this.baseWidth, this.baseHeight, this.format, this.generateMipMaps, this.invertY, this.samplingMode, this._compression, this.type, this._creationFlags, this._useSRGBBuffer);
            proxy._swapAndDie(this, false);
            this.isReady = true;
            break;
          case InternalTextureSource.Raw3D:
            proxy = this._engine.createRawTexture3D(this._bufferView, this.baseWidth, this.baseHeight, this.baseDepth, this.format, this.generateMipMaps, this.invertY, this.samplingMode, this._compression, this.type);
            proxy._swapAndDie(this, false);
            this.isReady = true;
            break;
          case InternalTextureSource.Raw2DArray:
            proxy = this._engine.createRawTexture2DArray(this._bufferView, this.baseWidth, this.baseHeight, this.baseDepth, this.format, this.generateMipMaps, this.invertY, this.samplingMode, this._compression, this.type);
            proxy._swapAndDie(this, false);
            this.isReady = true;
            break;
          case InternalTextureSource.Dynamic:
            proxy = this._engine.createDynamicTexture(this.baseWidth, this.baseHeight, this.generateMipMaps, this.samplingMode);
            proxy._swapAndDie(this, false);
            if (this._dynamicTextureSource) {
              this._engine.updateDynamicTexture(this, this._dynamicTextureSource, this.invertY, this._premulAlpha, this.format, true);
            }
            break;
          case InternalTextureSource.Cube:
            proxy = this._engine.createCubeTexture(this.url, null, this._files, !this.generateMipMaps, () => {
              proxy._swapAndDie(this, false);
              this.isReady = true;
            }, null, this.format, this._extension, false, 0, 0, null, void 0, this._useSRGBBuffer);
            return;
          case InternalTextureSource.CubeRaw:
            proxy = this._engine.createRawCubeTexture(this._bufferViewArray, this.width, this._originalFormat ?? this.format, this.type, this.generateMipMaps, this.invertY, this.samplingMode, this._compression);
            proxy._swapAndDie(this, false);
            this.isReady = true;
            break;
          case InternalTextureSource.CubeRawRGBD:
            return;
          case InternalTextureSource.CubePrefiltered:
            proxy = this._engine.createPrefilteredCubeTexture(this.url, null, this._lodGenerationScale, this._lodGenerationOffset, (proxy2) => {
              if (proxy2) {
                proxy2._swapAndDie(this, false);
              }
              this.isReady = true;
            }, null, this.format, this._extension);
            proxy._sphericalPolynomial = this._sphericalPolynomial;
            return;
          case InternalTextureSource.DepthStencil:
          case InternalTextureSource.Depth: {
            break;
          }
        }
      }
      /**
       * @internal
       */
      _swapAndDie(target, swapAll = true) {
        var _a;
        (_a = this._hardwareTexture) == null ? void 0 : _a.setUsage(target._source, this.generateMipMaps, this.is2DArray, this.isCube, this.is3D, this.width, this.height, this.depth);
        target._hardwareTexture = this._hardwareTexture;
        if (swapAll) {
          target._isRGBD = this._isRGBD;
        }
        if (this._lodTextureHigh) {
          if (target._lodTextureHigh) {
            target._lodTextureHigh.dispose();
          }
          target._lodTextureHigh = this._lodTextureHigh;
        }
        if (this._lodTextureMid) {
          if (target._lodTextureMid) {
            target._lodTextureMid.dispose();
          }
          target._lodTextureMid = this._lodTextureMid;
        }
        if (this._lodTextureLow) {
          if (target._lodTextureLow) {
            target._lodTextureLow.dispose();
          }
          target._lodTextureLow = this._lodTextureLow;
        }
        if (this._irradianceTexture) {
          if (target._irradianceTexture) {
            target._irradianceTexture.dispose();
          }
          target._irradianceTexture = this._irradianceTexture;
        }
        const cache = this._engine.getLoadedTexturesCache();
        let index = cache.indexOf(this);
        if (index !== -1) {
          cache.splice(index, 1);
        }
        index = cache.indexOf(target);
        if (index === -1) {
          cache.push(target);
        }
      }
      /**
       * Dispose the current allocated resources
       */
      dispose() {
        this._references--;
        this.onLoadedObservable.clear();
        this.onErrorObservable.clear();
        if (this._references === 0) {
          this._engine._releaseTexture(this);
          this._hardwareTexture = null;
          this._dynamicTextureSource = null;
        }
      }
    };
    InternalTexture._Counter = 0;
  }
});

// node_modules/@babylonjs/core/Misc/domManagement.js
function IsWindowObjectExist() {
  return typeof window !== "undefined";
}
function IsNavigatorAvailable() {
  return typeof navigator !== "undefined";
}
function IsDocumentAvailable() {
  return typeof document !== "undefined";
}
function GetDOMTextContent(element) {
  let result = "";
  let child = element.firstChild;
  while (child) {
    if (child.nodeType === 3) {
      result += child.textContent;
    }
    child = child.nextSibling;
  }
  return result;
}
var DomManagement;
var init_domManagement = __esm({
  "node_modules/@babylonjs/core/Misc/domManagement.js"() {
    DomManagement = {
      /**
       * Checks if the window object exists
       * @returns true if the window object exists
       */
      IsWindowObjectExist,
      /**
       * Checks if the navigator object exists
       * @returns true if the navigator object exists
       */
      IsNavigatorAvailable,
      /**
       * Check if the document object exists
       * @returns true if the document object exists
       */
      IsDocumentAvailable,
      /**
       * Extracts text content from a DOM element hierarchy
       * @param element defines the root element
       * @returns a string
       */
      GetDOMTextContent
    };
  }
});

// node_modules/@babylonjs/core/Misc/devTools.js
function _WarnImport(name, warnOnce = false) {
  if (warnOnce && warnedMap[name]) {
    return;
  }
  warnedMap[name] = true;
  return `${name} needs to be imported before as it contains a side-effect required by your code.`;
}
var warnedMap;
var init_devTools = __esm({
  "node_modules/@babylonjs/core/Misc/devTools.js"() {
    warnedMap = {};
  }
});

// node_modules/@babylonjs/core/Misc/logger.js
var Logger;
var init_logger = __esm({
  "node_modules/@babylonjs/core/Misc/logger.js"() {
    Logger = class _Logger {
      static _CheckLimit(message, limit) {
        let entry = _Logger._LogLimitOutputs[message];
        if (!entry) {
          entry = { limit, current: 1 };
          _Logger._LogLimitOutputs[message] = entry;
        } else {
          entry.current++;
        }
        return entry.current <= entry.limit;
      }
      static _GenerateLimitMessage(message, level = 1) {
        const entry = _Logger._LogLimitOutputs[message];
        if (!entry || !_Logger.MessageLimitReached) {
          return;
        }
        const type = this._Levels[level];
        if (entry.current === entry.limit) {
          _Logger[type.name](_Logger.MessageLimitReached.replace(/%LIMIT%/g, "" + entry.limit).replace(/%TYPE%/g, type.name ?? ""));
        }
      }
      static _AddLogEntry(entry) {
        _Logger._LogCache = entry + _Logger._LogCache;
        if (_Logger.OnNewCacheEntry) {
          _Logger.OnNewCacheEntry(entry);
        }
      }
      static _FormatMessage(message) {
        const padStr = (i) => i < 10 ? "0" + i : "" + i;
        const date = /* @__PURE__ */ new Date();
        return "[" + padStr(date.getHours()) + ":" + padStr(date.getMinutes()) + ":" + padStr(date.getSeconds()) + "]: " + message;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static _LogDisabled(message, limit) {
      }
      static _LogEnabled(level = 1, message, limit) {
        const msg = Array.isArray(message) ? message[0] : message;
        if (limit !== void 0 && !_Logger._CheckLimit(msg, limit)) {
          return;
        }
        const formattedMessage = _Logger._FormatMessage(msg);
        const type = this._Levels[level];
        const optionals = Array.isArray(message) ? message.slice(1) : [];
        type.logFunc && type.logFunc("BJS - " + formattedMessage, ...optionals);
        const entry = `<div style='color:${type.color}'>${formattedMessage}</div><br>`;
        _Logger._AddLogEntry(entry);
        _Logger._GenerateLimitMessage(msg, level);
      }
      /**
       * Gets current log cache (list of logs)
       */
      static get LogCache() {
        return _Logger._LogCache;
      }
      /**
       * Clears the log cache
       */
      static ClearLogCache() {
        _Logger._LogCache = "";
        _Logger._LogLimitOutputs = {};
        _Logger.errorsCount = 0;
      }
      /**
       * Sets the current log level (MessageLogLevel / WarningLogLevel / ErrorLogLevel)
       */
      static set LogLevels(level) {
        _Logger.Log = _Logger._LogDisabled;
        _Logger.Warn = _Logger._LogDisabled;
        _Logger.Error = _Logger._LogDisabled;
        [_Logger.MessageLogLevel, _Logger.WarningLogLevel, _Logger.ErrorLogLevel].forEach((l) => {
          if ((level & l) === l) {
            const type = this._Levels[l];
            _Logger[type.name] = _Logger._LogEnabled.bind(_Logger, l);
          }
        });
      }
    };
    Logger.NoneLogLevel = 0;
    Logger.MessageLogLevel = 1;
    Logger.WarningLogLevel = 2;
    Logger.ErrorLogLevel = 4;
    Logger.AllLogLevel = 7;
    Logger.MessageLimitReached = "Too many %TYPE%s (%LIMIT%), no more %TYPE%s will be reported for this message.";
    Logger._LogCache = "";
    Logger._LogLimitOutputs = {};
    Logger._Levels = [
      {},
      { color: "white", logFunc: console.log, name: "Log" },
      { color: "orange", logFunc: console.warn, name: "Warn" },
      {},
      { color: "red", logFunc: console.error, name: "Error" }
    ];
    Logger.errorsCount = 0;
    Logger.Log = Logger._LogEnabled.bind(Logger, Logger.MessageLogLevel);
    Logger.Warn = Logger._LogEnabled.bind(Logger, Logger.WarningLogLevel);
    Logger.Error = Logger._LogEnabled.bind(Logger, Logger.ErrorLogLevel);
  }
});

// node_modules/@babylonjs/core/Materials/shaderLanguage.js
var ShaderLanguage;
var init_shaderLanguage = __esm({
  "node_modules/@babylonjs/core/Materials/shaderLanguage.js"() {
    (function(ShaderLanguage2) {
      ShaderLanguage2[ShaderLanguage2["GLSL"] = 0] = "GLSL";
      ShaderLanguage2[ShaderLanguage2["WGSL"] = 1] = "WGSL";
    })(ShaderLanguage || (ShaderLanguage = {}));
  }
});

// node_modules/@babylonjs/core/Engines/shaderStore.js
var ShaderStore;
var init_shaderStore = __esm({
  "node_modules/@babylonjs/core/Engines/shaderStore.js"() {
    init_shaderLanguage();
    ShaderStore = class _ShaderStore {
      /**
       * Gets the shaders repository path for a given shader language
       * @param shaderLanguage the shader language
       * @returns the path to the shaders repository
       */
      static GetShadersRepository(shaderLanguage = ShaderLanguage.GLSL) {
        return shaderLanguage === ShaderLanguage.GLSL ? _ShaderStore.ShadersRepository : _ShaderStore.ShadersRepositoryWGSL;
      }
      /**
       * Gets the shaders store of a given shader language
       * @param shaderLanguage the shader language
       * @returns the shaders store
       */
      static GetShadersStore(shaderLanguage = ShaderLanguage.GLSL) {
        return shaderLanguage === ShaderLanguage.GLSL ? _ShaderStore.ShadersStore : _ShaderStore.ShadersStoreWGSL;
      }
      /**
       * Gets the include shaders store of a given shader language
       * @param shaderLanguage the shader language
       * @returns the include shaders store
       */
      static GetIncludesShadersStore(shaderLanguage = ShaderLanguage.GLSL) {
        return shaderLanguage === ShaderLanguage.GLSL ? _ShaderStore.IncludesShadersStore : _ShaderStore.IncludesShadersStoreWGSL;
      }
    };
    ShaderStore.ShadersRepository = "src/Shaders/";
    ShaderStore.ShadersStore = {};
    ShaderStore.IncludesShadersStore = {};
    ShaderStore.ShadersRepositoryWGSL = "src/ShadersWGSL/";
    ShaderStore.ShadersStoreWGSL = {};
    ShaderStore.IncludesShadersStoreWGSL = {};
  }
});

// node_modules/@babylonjs/core/Engines/Processors/shaderCodeNode.js
var defaultAttributeKeywordName, defaultVaryingKeywordName, ShaderCodeNode;
var init_shaderCodeNode = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/shaderCodeNode.js"() {
    defaultAttributeKeywordName = "attribute";
    defaultVaryingKeywordName = "varying";
    ShaderCodeNode = class {
      constructor() {
        this.children = [];
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isValid(preprocessors) {
        return true;
      }
      process(preprocessors, options) {
        var _a, _b, _c, _d, _e, _f;
        let result = "";
        if (this.line) {
          let value = this.line;
          const processor = options.processor;
          if (processor) {
            if (processor.lineProcessor) {
              value = processor.lineProcessor(value, options.isFragment, options.processingContext);
            }
            const attributeKeyword = ((_a = options.processor) == null ? void 0 : _a.attributeKeywordName) ?? defaultAttributeKeywordName;
            const varyingKeyword = options.isFragment && ((_b = options.processor) == null ? void 0 : _b.varyingFragmentKeywordName) ? (_c = options.processor) == null ? void 0 : _c.varyingFragmentKeywordName : !options.isFragment && ((_d = options.processor) == null ? void 0 : _d.varyingVertexKeywordName) ? (_e = options.processor) == null ? void 0 : _e.varyingVertexKeywordName : defaultVaryingKeywordName;
            if (!options.isFragment && processor.attributeProcessor && this.line.startsWith(attributeKeyword)) {
              value = processor.attributeProcessor(this.line, preprocessors, options.processingContext);
            } else if (processor.varyingProcessor && (((_f = processor.varyingCheck) == null ? void 0 : _f.call(processor, this.line, options.isFragment)) || !processor.varyingCheck && this.line.startsWith(varyingKeyword))) {
              value = processor.varyingProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
            } else if (processor.uniformProcessor && processor.uniformRegexp && processor.uniformRegexp.test(this.line)) {
              if (!options.lookForClosingBracketForUniformBuffer) {
                value = processor.uniformProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
              }
            } else if (processor.uniformBufferProcessor && processor.uniformBufferRegexp && processor.uniformBufferRegexp.test(this.line)) {
              if (!options.lookForClosingBracketForUniformBuffer) {
                value = processor.uniformBufferProcessor(this.line, options.isFragment, options.processingContext);
                options.lookForClosingBracketForUniformBuffer = true;
              }
            } else if (processor.textureProcessor && processor.textureRegexp && processor.textureRegexp.test(this.line)) {
              value = processor.textureProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
            } else if ((processor.uniformProcessor || processor.uniformBufferProcessor) && this.line.startsWith("uniform") && !options.lookForClosingBracketForUniformBuffer) {
              const regex = /uniform\s+(?:(?:highp)?|(?:lowp)?)\s*(\S+)\s+(\S+)\s*;/;
              if (regex.test(this.line)) {
                if (processor.uniformProcessor) {
                  value = processor.uniformProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
                }
              } else {
                if (processor.uniformBufferProcessor) {
                  value = processor.uniformBufferProcessor(this.line, options.isFragment, options.processingContext);
                  options.lookForClosingBracketForUniformBuffer = true;
                }
              }
            }
            if (options.lookForClosingBracketForUniformBuffer && this.line.indexOf("}") !== -1) {
              options.lookForClosingBracketForUniformBuffer = false;
              if (processor.endOfUniformBufferProcessor) {
                value = processor.endOfUniformBufferProcessor(this.line, options.isFragment, options.processingContext);
              }
            }
          }
          result += value + "\n";
        }
        this.children.forEach((child) => {
          result += child.process(preprocessors, options);
        });
        if (this.additionalDefineKey) {
          preprocessors[this.additionalDefineKey] = this.additionalDefineValue || "true";
        }
        return result;
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/shaderCodeCursor.js
var ShaderCodeCursor;
var init_shaderCodeCursor = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/shaderCodeCursor.js"() {
    ShaderCodeCursor = class {
      constructor() {
        this._lines = [];
      }
      get currentLine() {
        return this._lines[this.lineIndex];
      }
      get canRead() {
        return this.lineIndex < this._lines.length - 1;
      }
      set lines(value) {
        this._lines.length = 0;
        for (const line of value) {
          if (!line || line === "\r") {
            continue;
          }
          if (line[0] === "#") {
            this._lines.push(line);
            continue;
          }
          const trimmedLine = line.trim();
          if (!trimmedLine) {
            continue;
          }
          if (trimmedLine.startsWith("//")) {
            this._lines.push(line);
            continue;
          }
          const semicolonIndex = trimmedLine.indexOf(";");
          if (semicolonIndex === -1) {
            this._lines.push(trimmedLine);
          } else if (semicolonIndex === trimmedLine.length - 1) {
            if (trimmedLine.length > 1) {
              this._lines.push(trimmedLine);
            }
          } else {
            const split = line.split(";");
            for (let index = 0; index < split.length; index++) {
              let subLine = split[index];
              if (!subLine) {
                continue;
              }
              subLine = subLine.trim();
              if (!subLine) {
                continue;
              }
              this._lines.push(subLine + (index !== split.length - 1 ? ";" : ""));
            }
          }
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/shaderCodeConditionNode.js
var ShaderCodeConditionNode;
var init_shaderCodeConditionNode = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/shaderCodeConditionNode.js"() {
    init_shaderCodeNode();
    ShaderCodeConditionNode = class extends ShaderCodeNode {
      process(preprocessors, options) {
        for (let index = 0; index < this.children.length; index++) {
          const node = this.children[index];
          if (node.isValid(preprocessors)) {
            return node.process(preprocessors, options);
          }
        }
        return "";
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/shaderCodeTestNode.js
var ShaderCodeTestNode;
var init_shaderCodeTestNode = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/shaderCodeTestNode.js"() {
    init_shaderCodeNode();
    ShaderCodeTestNode = class extends ShaderCodeNode {
      isValid(preprocessors) {
        return this.testExpression.isTrue(preprocessors);
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/Expressions/shaderDefineExpression.js
var ShaderDefineExpression;
var init_shaderDefineExpression = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/Expressions/shaderDefineExpression.js"() {
    ShaderDefineExpression = class _ShaderDefineExpression {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isTrue(preprocessors) {
        return true;
      }
      static postfixToInfix(postfix) {
        const stack = [];
        for (const c of postfix) {
          if (_ShaderDefineExpression._OperatorPriority[c] === void 0) {
            stack.push(c);
          } else {
            const v1 = stack[stack.length - 1], v2 = stack[stack.length - 2];
            stack.length -= 2;
            stack.push(`(${v2}${c}${v1})`);
          }
        }
        return stack[stack.length - 1];
      }
      /**
       * Converts an infix expression to a postfix expression.
       *
       * This method is used to transform infix expressions, which are more human-readable,
       * into postfix expressions, also known as Reverse Polish Notation (RPN), that can be
       * evaluated more efficiently by a computer. The conversion is based on the operator
       * priority defined in _OperatorPriority.
       *
       * The function employs a stack-based algorithm for the conversion and caches the result
       * to improve performance. The cache keeps track of each converted expression's access time
       * to manage the cache size and optimize memory usage. When the cache size exceeds a specified
       * limit, the least recently accessed items in the cache are deleted.
       *
       * The cache mechanism is particularly helpful for shader compilation, where the same infix
       * expressions might be encountered repeatedly, hence the caching can speed up the process.
       *
       * @param infix - The infix expression to be converted.
       * @returns The postfix expression as an array of strings.
       */
      static infixToPostfix(infix) {
        const cacheItem = _ShaderDefineExpression._InfixToPostfixCache.get(infix);
        if (cacheItem) {
          cacheItem.accessTime = Date.now();
          return cacheItem.result;
        }
        if (!infix.includes("&&") && !infix.includes("||") && !infix.includes(")") && !infix.includes("(")) {
          return [infix];
        }
        const result = [];
        let stackIdx = -1;
        const pushOperand = () => {
          operand = operand.trim();
          if (operand !== "") {
            result.push(operand);
            operand = "";
          }
        };
        const push = (s) => {
          if (stackIdx < _ShaderDefineExpression._Stack.length - 1) {
            _ShaderDefineExpression._Stack[++stackIdx] = s;
          }
        };
        const peek = () => _ShaderDefineExpression._Stack[stackIdx];
        const pop = () => stackIdx === -1 ? "!!INVALID EXPRESSION!!" : _ShaderDefineExpression._Stack[stackIdx--];
        let idx = 0, operand = "";
        while (idx < infix.length) {
          const c = infix.charAt(idx), token = idx < infix.length - 1 ? infix.substr(idx, 2) : "";
          if (c === "(") {
            operand = "";
            push(c);
          } else if (c === ")") {
            pushOperand();
            while (stackIdx !== -1 && peek() !== "(") {
              result.push(pop());
            }
            pop();
          } else if (_ShaderDefineExpression._OperatorPriority[token] > 1) {
            pushOperand();
            while (stackIdx !== -1 && _ShaderDefineExpression._OperatorPriority[peek()] >= _ShaderDefineExpression._OperatorPriority[token]) {
              result.push(pop());
            }
            push(token);
            idx++;
          } else {
            operand += c;
          }
          idx++;
        }
        pushOperand();
        while (stackIdx !== -1) {
          if (peek() === "(") {
            pop();
          } else {
            result.push(pop());
          }
        }
        if (_ShaderDefineExpression._InfixToPostfixCache.size >= _ShaderDefineExpression.InfixToPostfixCacheLimitSize) {
          _ShaderDefineExpression.ClearCache();
        }
        _ShaderDefineExpression._InfixToPostfixCache.set(infix, { result, accessTime: Date.now() });
        return result;
      }
      static ClearCache() {
        const sortedCache = Array.from(_ShaderDefineExpression._InfixToPostfixCache.entries()).sort((a, b) => a[1].accessTime - b[1].accessTime);
        for (let i = 0; i < _ShaderDefineExpression.InfixToPostfixCacheCleanupSize; i++) {
          _ShaderDefineExpression._InfixToPostfixCache.delete(sortedCache[i][0]);
        }
      }
    };
    ShaderDefineExpression.InfixToPostfixCacheLimitSize = 5e4;
    ShaderDefineExpression.InfixToPostfixCacheCleanupSize = 25e3;
    ShaderDefineExpression._InfixToPostfixCache = /* @__PURE__ */ new Map();
    ShaderDefineExpression._OperatorPriority = {
      ")": 0,
      "(": 1,
      "||": 2,
      "&&": 3
    };
    ShaderDefineExpression._Stack = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  }
});

// node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineIsDefinedOperator.js
var ShaderDefineIsDefinedOperator;
var init_shaderDefineIsDefinedOperator = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineIsDefinedOperator.js"() {
    init_shaderDefineExpression();
    ShaderDefineIsDefinedOperator = class extends ShaderDefineExpression {
      constructor(define, not = false) {
        super();
        this.define = define;
        this.not = not;
      }
      isTrue(preprocessors) {
        let condition = preprocessors[this.define] !== void 0;
        if (this.not) {
          condition = !condition;
        }
        return condition;
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineOrOperator.js
var ShaderDefineOrOperator;
var init_shaderDefineOrOperator = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineOrOperator.js"() {
    init_shaderDefineExpression();
    ShaderDefineOrOperator = class extends ShaderDefineExpression {
      isTrue(preprocessors) {
        return this.leftOperand.isTrue(preprocessors) || this.rightOperand.isTrue(preprocessors);
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineAndOperator.js
var ShaderDefineAndOperator;
var init_shaderDefineAndOperator = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineAndOperator.js"() {
    init_shaderDefineExpression();
    ShaderDefineAndOperator = class extends ShaderDefineExpression {
      isTrue(preprocessors) {
        return this.leftOperand.isTrue(preprocessors) && this.rightOperand.isTrue(preprocessors);
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineArithmeticOperator.js
var ShaderDefineArithmeticOperator;
var init_shaderDefineArithmeticOperator = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/Expressions/Operators/shaderDefineArithmeticOperator.js"() {
    init_shaderDefineExpression();
    ShaderDefineArithmeticOperator = class extends ShaderDefineExpression {
      constructor(define, operand, testValue) {
        super();
        this.define = define;
        this.operand = operand;
        this.testValue = testValue;
      }
      isTrue(preprocessors) {
        let value = preprocessors[this.define];
        if (value === void 0) {
          value = this.define;
        }
        let condition = false;
        const left = parseInt(value);
        const right = parseInt(this.testValue);
        switch (this.operand) {
          case ">":
            condition = left > right;
            break;
          case "<":
            condition = left < right;
            break;
          case "<=":
            condition = left <= right;
            break;
          case ">=":
            condition = left >= right;
            break;
          case "==":
            condition = left === right;
            break;
          case "!=":
            condition = left !== right;
            break;
        }
        return condition;
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/Processors/shaderProcessor.js
var regexSE, regexSERevert, regexShaderInclude, regexShaderDecl, regexLightX, regexX, reusableMatches, ShaderProcessor;
var init_shaderProcessor = __esm({
  "node_modules/@babylonjs/core/Engines/Processors/shaderProcessor.js"() {
    init_shaderCodeNode();
    init_shaderCodeCursor();
    init_shaderCodeConditionNode();
    init_shaderCodeTestNode();
    init_shaderDefineIsDefinedOperator();
    init_shaderDefineOrOperator();
    init_shaderDefineAndOperator();
    init_shaderDefineExpression();
    init_shaderDefineArithmeticOperator();
    init_devTools();
    init_shaderLanguage();
    regexSE = /defined\s*?\((.+?)\)/g;
    regexSERevert = /defined\s*?\[(.+?)\]/g;
    regexShaderInclude = /#include\s?<(.+)>(\((.*)\))*(\[(.*)\])*/g;
    regexShaderDecl = /__decl__/;
    regexLightX = /light\{X\}.(\w*)/g;
    regexX = /\{X\}/g;
    reusableMatches = [];
    ShaderProcessor = class _ShaderProcessor {
      static Initialize(options) {
        if (options.processor && options.processor.initializeShaders) {
          options.processor.initializeShaders(options.processingContext);
        }
      }
      static Process(sourceCode, options, callback, engine) {
        var _a;
        if ((_a = options.processor) == null ? void 0 : _a.preProcessShaderCode) {
          sourceCode = options.processor.preProcessShaderCode(sourceCode, options.isFragment);
        }
        this._ProcessIncludes(sourceCode, options, (codeWithIncludes) => {
          if (options.processCodeAfterIncludes) {
            codeWithIncludes = options.processCodeAfterIncludes(options.isFragment ? "fragment" : "vertex", codeWithIncludes);
          }
          const migratedCode = this._ProcessShaderConversion(codeWithIncludes, options, engine);
          callback(migratedCode, codeWithIncludes);
        });
      }
      static PreProcess(sourceCode, options, callback, engine) {
        var _a;
        if ((_a = options.processor) == null ? void 0 : _a.preProcessShaderCode) {
          sourceCode = options.processor.preProcessShaderCode(sourceCode, options.isFragment);
        }
        this._ProcessIncludes(sourceCode, options, (codeWithIncludes) => {
          if (options.processCodeAfterIncludes) {
            codeWithIncludes = options.processCodeAfterIncludes(options.isFragment ? "fragment" : "vertex", codeWithIncludes);
          }
          const migratedCode = this._ApplyPreProcessing(codeWithIncludes, options, engine);
          callback(migratedCode, codeWithIncludes);
        });
      }
      static Finalize(vertexCode, fragmentCode, options) {
        if (!options.processor || !options.processor.finalizeShaders) {
          return { vertexCode, fragmentCode };
        }
        return options.processor.finalizeShaders(vertexCode, fragmentCode, options.processingContext);
      }
      static _ProcessPrecision(source, options) {
        var _a;
        if ((_a = options.processor) == null ? void 0 : _a.noPrecision) {
          return source;
        }
        const shouldUseHighPrecisionShader = options.shouldUseHighPrecisionShader;
        if (source.indexOf("precision highp float") === -1) {
          if (!shouldUseHighPrecisionShader) {
            source = "precision mediump float;\n" + source;
          } else {
            source = "precision highp float;\n" + source;
          }
        } else {
          if (!shouldUseHighPrecisionShader) {
            source = source.replace("precision highp float", "precision mediump float");
          }
        }
        return source;
      }
      static _ExtractOperation(expression) {
        const regex = /defined\((.+)\)/;
        const match = regex.exec(expression);
        if (match && match.length) {
          return new ShaderDefineIsDefinedOperator(match[1].trim(), expression[0] === "!");
        }
        const operators = ["==", "!=", ">=", "<=", "<", ">"];
        let operator = "";
        let indexOperator = 0;
        for (operator of operators) {
          indexOperator = expression.indexOf(operator);
          if (indexOperator > -1) {
            break;
          }
        }
        if (indexOperator === -1) {
          return new ShaderDefineIsDefinedOperator(expression);
        }
        const define = expression.substring(0, indexOperator).trim();
        const value = expression.substring(indexOperator + operator.length).trim();
        return new ShaderDefineArithmeticOperator(define, operator, value);
      }
      static _BuildSubExpression(expression) {
        expression = expression.replace(regexSE, "defined[$1]");
        const postfix = ShaderDefineExpression.infixToPostfix(expression);
        const stack = [];
        for (const c of postfix) {
          if (c !== "||" && c !== "&&") {
            stack.push(c);
          } else if (stack.length >= 2) {
            let v1 = stack[stack.length - 1], v2 = stack[stack.length - 2];
            stack.length -= 2;
            const operator = c == "&&" ? new ShaderDefineAndOperator() : new ShaderDefineOrOperator();
            if (typeof v1 === "string") {
              v1 = v1.replace(regexSERevert, "defined($1)");
            }
            if (typeof v2 === "string") {
              v2 = v2.replace(regexSERevert, "defined($1)");
            }
            operator.leftOperand = typeof v2 === "string" ? this._ExtractOperation(v2) : v2;
            operator.rightOperand = typeof v1 === "string" ? this._ExtractOperation(v1) : v1;
            stack.push(operator);
          }
        }
        let result = stack[stack.length - 1];
        if (typeof result === "string") {
          result = result.replace(regexSERevert, "defined($1)");
        }
        return typeof result === "string" ? this._ExtractOperation(result) : result;
      }
      static _BuildExpression(line, start) {
        const node = new ShaderCodeTestNode();
        const command = line.substring(0, start);
        let expression = line.substring(start);
        expression = expression.substring(0, (expression.indexOf("//") + 1 || expression.length + 1) - 1).trim();
        if (command === "#ifdef") {
          node.testExpression = new ShaderDefineIsDefinedOperator(expression);
        } else if (command === "#ifndef") {
          node.testExpression = new ShaderDefineIsDefinedOperator(expression, true);
        } else {
          node.testExpression = this._BuildSubExpression(expression);
        }
        return node;
      }
      static _MoveCursorWithinIf(cursor, rootNode, ifNode) {
        let line = cursor.currentLine;
        while (this._MoveCursor(cursor, ifNode)) {
          line = cursor.currentLine;
          const first5 = line.substring(0, 5).toLowerCase();
          if (first5 === "#else") {
            const elseNode = new ShaderCodeNode();
            rootNode.children.push(elseNode);
            this._MoveCursor(cursor, elseNode);
            return;
          } else if (first5 === "#elif") {
            const elifNode = this._BuildExpression(line, 5);
            rootNode.children.push(elifNode);
            ifNode = elifNode;
          }
        }
      }
      static _MoveCursor(cursor, rootNode) {
        while (cursor.canRead) {
          cursor.lineIndex++;
          const line = cursor.currentLine;
          if (line.indexOf("#") >= 0) {
            const matches = _ShaderProcessor._MoveCursorRegex.exec(line);
            if (matches && matches.length) {
              const keyword = matches[0];
              switch (keyword) {
                case "#ifdef": {
                  const newRootNode = new ShaderCodeConditionNode();
                  rootNode.children.push(newRootNode);
                  const ifNode = this._BuildExpression(line, 6);
                  newRootNode.children.push(ifNode);
                  this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                  break;
                }
                case "#else":
                case "#elif":
                  return true;
                case "#endif":
                  return false;
                case "#ifndef": {
                  const newRootNode = new ShaderCodeConditionNode();
                  rootNode.children.push(newRootNode);
                  const ifNode = this._BuildExpression(line, 7);
                  newRootNode.children.push(ifNode);
                  this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                  break;
                }
                case "#if": {
                  const newRootNode = new ShaderCodeConditionNode();
                  const ifNode = this._BuildExpression(line, 3);
                  rootNode.children.push(newRootNode);
                  newRootNode.children.push(ifNode);
                  this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                  break;
                }
              }
              continue;
            }
          }
          const newNode = new ShaderCodeNode();
          newNode.line = line;
          rootNode.children.push(newNode);
          if (line[0] === "#" && line[1] === "d") {
            const split = line.replace(";", "").split(" ");
            newNode.additionalDefineKey = split[1];
            if (split.length === 3) {
              newNode.additionalDefineValue = split[2];
            }
          }
        }
        return false;
      }
      static _EvaluatePreProcessors(sourceCode, preprocessors, options) {
        const rootNode = new ShaderCodeNode();
        const cursor = new ShaderCodeCursor();
        cursor.lineIndex = -1;
        cursor.lines = sourceCode.split("\n");
        this._MoveCursor(cursor, rootNode);
        return rootNode.process(preprocessors, options);
      }
      static _PreparePreProcessors(options, engine) {
        var _a;
        const defines = options.defines;
        const preprocessors = {};
        for (const define of defines) {
          const keyValue = define.replace("#define", "").replace(";", "").trim();
          const split = keyValue.split(" ");
          preprocessors[split[0]] = split.length > 1 ? split[1] : "";
        }
        if (((_a = options.processor) == null ? void 0 : _a.shaderLanguage) === ShaderLanguage.GLSL) {
          preprocessors["GL_ES"] = "true";
        }
        preprocessors["__VERSION__"] = options.version;
        preprocessors[options.platformName] = "true";
        engine._getGlobalDefines(preprocessors);
        return preprocessors;
      }
      static _ProcessShaderConversion(sourceCode, options, engine) {
        let preparedSourceCode = this._ProcessPrecision(sourceCode, options);
        if (!options.processor) {
          return preparedSourceCode;
        }
        if (options.processor.shaderLanguage === ShaderLanguage.GLSL && preparedSourceCode.indexOf("#version 3") !== -1) {
          preparedSourceCode = preparedSourceCode.replace("#version 300 es", "");
          if (!options.processor.parseGLES3) {
            return preparedSourceCode;
          }
        }
        const defines = options.defines;
        const preprocessors = this._PreparePreProcessors(options, engine);
        if (options.processor.preProcessor) {
          preparedSourceCode = options.processor.preProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext);
        }
        preparedSourceCode = this._EvaluatePreProcessors(preparedSourceCode, preprocessors, options);
        if (options.processor.postProcessor) {
          preparedSourceCode = options.processor.postProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext, engine);
        }
        if (engine._features.needShaderCodeInlining) {
          preparedSourceCode = engine.inlineShaderCode(preparedSourceCode);
        }
        return preparedSourceCode;
      }
      static _ApplyPreProcessing(sourceCode, options, engine) {
        var _a, _b;
        let preparedSourceCode = sourceCode;
        const defines = options.defines;
        const preprocessors = this._PreparePreProcessors(options, engine);
        if ((_a = options.processor) == null ? void 0 : _a.preProcessor) {
          preparedSourceCode = options.processor.preProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext);
        }
        preparedSourceCode = this._EvaluatePreProcessors(preparedSourceCode, preprocessors, options);
        if ((_b = options.processor) == null ? void 0 : _b.postProcessor) {
          preparedSourceCode = options.processor.postProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext, engine);
        }
        if (engine._features.needShaderCodeInlining) {
          preparedSourceCode = engine.inlineShaderCode(preparedSourceCode);
        }
        return preparedSourceCode;
      }
      /** @internal */
      static _ProcessIncludes(sourceCode, options, callback) {
        reusableMatches.length = 0;
        let match;
        while ((match = regexShaderInclude.exec(sourceCode)) !== null) {
          reusableMatches.push(match);
        }
        let returnValue = String(sourceCode);
        let parts = [sourceCode];
        let keepProcessing = false;
        for (const match2 of reusableMatches) {
          let includeFile = match2[1];
          if (includeFile.indexOf("__decl__") !== -1) {
            includeFile = includeFile.replace(regexShaderDecl, "");
            if (options.supportsUniformBuffers) {
              includeFile = includeFile.replace("Vertex", "Ubo").replace("Fragment", "Ubo");
            }
            includeFile = includeFile + "Declaration";
          }
          if (options.includesShadersStore[includeFile]) {
            let includeContent = options.includesShadersStore[includeFile];
            if (match2[2]) {
              const splits = match2[3].split(",");
              for (let index = 0; index < splits.length; index += 2) {
                const source = new RegExp(splits[index], "g");
                const dest = splits[index + 1];
                includeContent = includeContent.replace(source, dest);
              }
            }
            if (match2[4]) {
              const indexString = match2[5];
              if (indexString.indexOf("..") !== -1) {
                const indexSplits = indexString.split("..");
                const minIndex = parseInt(indexSplits[0]);
                let maxIndex = parseInt(indexSplits[1]);
                let sourceIncludeContent = includeContent.slice(0);
                includeContent = "";
                if (isNaN(maxIndex)) {
                  maxIndex = options.indexParameters[indexSplits[1]];
                }
                for (let i = minIndex; i < maxIndex; i++) {
                  if (!options.supportsUniformBuffers) {
                    sourceIncludeContent = sourceIncludeContent.replace(regexLightX, (str, p1) => {
                      return p1 + "{X}";
                    });
                  }
                  includeContent += sourceIncludeContent.replace(regexX, i.toString()) + "\n";
                }
              } else {
                if (!options.supportsUniformBuffers) {
                  includeContent = includeContent.replace(regexLightX, (str, p1) => {
                    return p1 + "{X}";
                  });
                }
                includeContent = includeContent.replace(regexX, indexString);
              }
            }
            const newParts = [];
            for (const part of parts) {
              const splitPart = part.split(match2[0]);
              for (let i = 0; i < splitPart.length - 1; i++) {
                newParts.push(splitPart[i]);
                newParts.push(includeContent);
              }
              newParts.push(splitPart[splitPart.length - 1]);
            }
            parts = newParts;
            keepProcessing = keepProcessing || includeContent.indexOf("#include<") >= 0 || includeContent.indexOf("#include <") >= 0;
          } else {
            const includeShaderUrl = options.shadersRepository + "ShadersInclude/" + includeFile + ".fx";
            _ShaderProcessor._FileToolsLoadFile(includeShaderUrl, (fileContent) => {
              options.includesShadersStore[includeFile] = fileContent;
              this._ProcessIncludes(parts.join(""), options, callback);
            });
            return;
          }
        }
        reusableMatches.length = 0;
        returnValue = parts.join("");
        if (keepProcessing) {
          this._ProcessIncludes(returnValue.toString(), options, callback);
        } else {
          callback(returnValue);
        }
      }
      /**
       * Loads a file from a url
       * @param url url to load
       * @param onSuccess callback called when the file successfully loads
       * @param onProgress callback called while file is loading (if the server supports this mode)
       * @param offlineProvider defines the offline provider for caching
       * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
       * @param onError callback called when the file fails to load
       * @returns a file request object
       * @internal
       */
      static _FileToolsLoadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError) {
        throw _WarnImport("FileTools");
      }
    };
    ShaderProcessor._MoveCursorRegex = /(#ifdef)|(#else)|(#elif)|(#endif)|(#ifndef)|(#if)/;
  }
});

// node_modules/@babylonjs/core/Materials/effect.js
var Effect;
var init_effect = __esm({
  "node_modules/@babylonjs/core/Materials/effect.js"() {
    init_observable();
    init_domManagement();
    init_logger();
    init_shaderProcessor();
    init_shaderStore();
    init_shaderLanguage();
    Effect = class _Effect {
      /**
       * Gets or sets the relative url used to load shaders if using the engine in non-minified mode
       */
      static get ShadersRepository() {
        return ShaderStore.ShadersRepository;
      }
      static set ShadersRepository(repo) {
        ShaderStore.ShadersRepository = repo;
      }
      /**
       * Observable that will be called when effect is bound.
       */
      get onBindObservable() {
        if (!this._onBindObservable) {
          this._onBindObservable = new Observable();
        }
        return this._onBindObservable;
      }
      /**
       * Gets the shader language type used to write vertex and fragment source code.
       */
      get shaderLanguage() {
        return this._shaderLanguage;
      }
      /**
       * Instantiates an effect.
       * An effect can be used to create/manage/execute vertex and fragment shaders.
       * @param baseName Name of the effect.
       * @param attributesNamesOrOptions List of attribute names that will be passed to the shader or set of all options to create the effect.
       * @param uniformsNamesOrEngine List of uniform variable names that will be passed to the shader or the engine that will be used to render effect.
       * @param samplers List of sampler variables that will be passed to the shader.
       * @param engine Engine to be used to render the effect
       * @param defines Define statements to be added to the shader.
       * @param fallbacks Possible fallbacks for this effect to improve performance when needed.
       * @param onCompiled Callback that will be called when the shader is compiled.
       * @param onError Callback that will be called if an error occurs during shader compilation.
       * @param indexParameters Parameters to be used with Babylons include syntax to iterate over an array (eg. \{lights: 10\})
       * @param key Effect Key identifying uniquely compiled shader variants
       * @param shaderLanguage the language the shader is written in (default: GLSL)
       */
      constructor(baseName, attributesNamesOrOptions, uniformsNamesOrEngine, samplers = null, engine, defines = null, fallbacks = null, onCompiled = null, onError = null, indexParameters, key = "", shaderLanguage = ShaderLanguage.GLSL) {
        this.name = null;
        this.defines = "";
        this.onCompiled = null;
        this.onError = null;
        this.onBind = null;
        this.uniqueId = 0;
        this.onCompileObservable = new Observable();
        this.onErrorObservable = new Observable();
        this._onBindObservable = null;
        this._isDisposed = false;
        this._bonesComputationForcedToCPU = false;
        this._uniformBuffersNames = {};
        this._multiTarget = false;
        this._samplers = {};
        this._isReady = false;
        this._compilationError = "";
        this._allFallbacksProcessed = false;
        this._uniforms = {};
        this._key = "";
        this._fallbacks = null;
        this._vertexSourceCodeOverride = "";
        this._fragmentSourceCodeOverride = "";
        this._transformFeedbackVaryings = null;
        this._pipelineContext = null;
        this._vertexSourceCode = "";
        this._fragmentSourceCode = "";
        this._vertexSourceCodeBeforeMigration = "";
        this._fragmentSourceCodeBeforeMigration = "";
        this._rawVertexSourceCode = "";
        this._rawFragmentSourceCode = "";
        this._processCodeAfterIncludes = void 0;
        this._processFinalCode = null;
        this.name = baseName;
        this._key = key;
        if (attributesNamesOrOptions.attributes) {
          const options = attributesNamesOrOptions;
          this._engine = uniformsNamesOrEngine;
          this._attributesNames = options.attributes;
          this._uniformsNames = options.uniformsNames.concat(options.samplers);
          this._samplerList = options.samplers.slice();
          this.defines = options.defines;
          this.onError = options.onError;
          this.onCompiled = options.onCompiled;
          this._fallbacks = options.fallbacks;
          this._indexParameters = options.indexParameters;
          this._transformFeedbackVaryings = options.transformFeedbackVaryings || null;
          this._multiTarget = !!options.multiTarget;
          this._shaderLanguage = options.shaderLanguage ?? ShaderLanguage.GLSL;
          if (options.uniformBuffersNames) {
            this._uniformBuffersNamesList = options.uniformBuffersNames.slice();
            for (let i = 0; i < options.uniformBuffersNames.length; i++) {
              this._uniformBuffersNames[options.uniformBuffersNames[i]] = i;
            }
          }
          this._processFinalCode = options.processFinalCode ?? null;
          this._processCodeAfterIncludes = options.processCodeAfterIncludes ?? void 0;
        } else {
          this._engine = engine;
          this.defines = defines == null ? "" : defines;
          this._uniformsNames = uniformsNamesOrEngine.concat(samplers);
          this._samplerList = samplers ? samplers.slice() : [];
          this._attributesNames = attributesNamesOrOptions;
          this._uniformBuffersNamesList = [];
          this._shaderLanguage = shaderLanguage;
          this.onError = onError;
          this.onCompiled = onCompiled;
          this._indexParameters = indexParameters;
          this._fallbacks = fallbacks;
        }
        this._attributeLocationByName = {};
        this.uniqueId = _Effect._UniqueIdSeed++;
        this._processShaderCode();
      }
      /** @internal */
      _processShaderCode(shaderProcessor = null, keepExistingPipelineContext = false) {
        let vertexSource;
        let fragmentSource;
        const baseName = this.name;
        const hostDocument = IsWindowObjectExist() ? this._engine.getHostDocument() : null;
        if (baseName.vertexSource) {
          vertexSource = "source:" + baseName.vertexSource;
        } else if (baseName.vertexElement) {
          vertexSource = hostDocument ? hostDocument.getElementById(baseName.vertexElement) : null;
          if (!vertexSource) {
            vertexSource = baseName.vertexElement;
          }
        } else {
          vertexSource = baseName.vertex || baseName;
        }
        if (baseName.fragmentSource) {
          fragmentSource = "source:" + baseName.fragmentSource;
        } else if (baseName.fragmentElement) {
          fragmentSource = hostDocument ? hostDocument.getElementById(baseName.fragmentElement) : null;
          if (!fragmentSource) {
            fragmentSource = baseName.fragmentElement;
          }
        } else {
          fragmentSource = baseName.fragment || baseName;
        }
        this._processingContext = this._engine._getShaderProcessingContext(this._shaderLanguage);
        let processorOptions = {
          defines: this.defines.split("\n"),
          indexParameters: this._indexParameters,
          isFragment: false,
          shouldUseHighPrecisionShader: this._engine._shouldUseHighPrecisionShader,
          processor: shaderProcessor ?? this._engine._getShaderProcessor(this._shaderLanguage),
          supportsUniformBuffers: this._engine.supportsUniformBuffers,
          shadersRepository: ShaderStore.GetShadersRepository(this._shaderLanguage),
          includesShadersStore: ShaderStore.GetIncludesShadersStore(this._shaderLanguage),
          version: (this._engine.version * 100).toString(),
          platformName: this._engine.shaderPlatformName,
          processingContext: this._processingContext,
          isNDCHalfZRange: this._engine.isNDCHalfZRange,
          useReverseDepthBuffer: this._engine.useReverseDepthBuffer,
          processCodeAfterIncludes: this._processCodeAfterIncludes
        };
        const shaderCodes = [void 0, void 0];
        const shadersLoaded = () => {
          if (shaderCodes[0] && shaderCodes[1]) {
            processorOptions.isFragment = true;
            const [migratedVertexCode, fragmentCode] = shaderCodes;
            ShaderProcessor.Process(fragmentCode, processorOptions, (migratedFragmentCode, codeBeforeMigration) => {
              this._fragmentSourceCodeBeforeMigration = codeBeforeMigration;
              if (this._processFinalCode) {
                migratedFragmentCode = this._processFinalCode("fragment", migratedFragmentCode);
              }
              const finalShaders = ShaderProcessor.Finalize(migratedVertexCode, migratedFragmentCode, processorOptions);
              processorOptions = null;
              this._useFinalCode(finalShaders.vertexCode, finalShaders.fragmentCode, baseName, keepExistingPipelineContext);
            }, this._engine);
          }
        };
        this._loadShader(vertexSource, "Vertex", "", (vertexCode) => {
          ShaderProcessor.Initialize(processorOptions);
          ShaderProcessor.Process(vertexCode, processorOptions, (migratedVertexCode, codeBeforeMigration) => {
            this._rawVertexSourceCode = vertexCode;
            this._vertexSourceCodeBeforeMigration = codeBeforeMigration;
            if (this._processFinalCode) {
              migratedVertexCode = this._processFinalCode("vertex", migratedVertexCode);
            }
            shaderCodes[0] = migratedVertexCode;
            shadersLoaded();
          }, this._engine);
        });
        this._loadShader(fragmentSource, "Fragment", "Pixel", (fragmentCode) => {
          this._rawFragmentSourceCode = fragmentCode;
          shaderCodes[1] = fragmentCode;
          shadersLoaded();
        });
      }
      _useFinalCode(migratedVertexCode, migratedFragmentCode, baseName, keepExistingPipelineContext = false) {
        if (baseName) {
          const vertex = baseName.vertexElement || baseName.vertex || baseName.spectorName || baseName;
          const fragment = baseName.fragmentElement || baseName.fragment || baseName.spectorName || baseName;
          this._vertexSourceCode = (this._shaderLanguage === ShaderLanguage.WGSL ? "//" : "") + "#define SHADER_NAME vertex:" + vertex + "\n" + migratedVertexCode;
          this._fragmentSourceCode = (this._shaderLanguage === ShaderLanguage.WGSL ? "//" : "") + "#define SHADER_NAME fragment:" + fragment + "\n" + migratedFragmentCode;
        } else {
          this._vertexSourceCode = migratedVertexCode;
          this._fragmentSourceCode = migratedFragmentCode;
        }
        this._prepareEffect(keepExistingPipelineContext);
      }
      /**
       * Unique key for this effect
       */
      get key() {
        return this._key;
      }
      /**
       * If the effect has been compiled and prepared.
       * @returns if the effect is compiled and prepared.
       */
      isReady() {
        try {
          return this._isReadyInternal();
        } catch {
          return false;
        }
      }
      _isReadyInternal() {
        if (this._isReady) {
          return true;
        }
        if (this._pipelineContext) {
          return this._pipelineContext.isReady;
        }
        return false;
      }
      /**
       * The engine the effect was initialized with.
       * @returns the engine.
       */
      getEngine() {
        return this._engine;
      }
      /**
       * The pipeline context for this effect
       * @returns the associated pipeline context
       */
      getPipelineContext() {
        return this._pipelineContext;
      }
      /**
       * The set of names of attribute variables for the shader.
       * @returns An array of attribute names.
       */
      getAttributesNames() {
        return this._attributesNames;
      }
      /**
       * Returns the attribute at the given index.
       * @param index The index of the attribute.
       * @returns The location of the attribute.
       */
      getAttributeLocation(index) {
        return this._attributes[index];
      }
      /**
       * Returns the attribute based on the name of the variable.
       * @param name of the attribute to look up.
       * @returns the attribute location.
       */
      getAttributeLocationByName(name) {
        return this._attributeLocationByName[name];
      }
      /**
       * The number of attributes.
       * @returns the number of attributes.
       */
      getAttributesCount() {
        return this._attributes.length;
      }
      /**
       * Gets the index of a uniform variable.
       * @param uniformName of the uniform to look up.
       * @returns the index.
       */
      getUniformIndex(uniformName) {
        return this._uniformsNames.indexOf(uniformName);
      }
      /**
       * Returns the attribute based on the name of the variable.
       * @param uniformName of the uniform to look up.
       * @returns the location of the uniform.
       */
      getUniform(uniformName) {
        return this._uniforms[uniformName];
      }
      /**
       * Returns an array of sampler variable names
       * @returns The array of sampler variable names.
       */
      getSamplers() {
        return this._samplerList;
      }
      /**
       * Returns an array of uniform variable names
       * @returns The array of uniform variable names.
       */
      getUniformNames() {
        return this._uniformsNames;
      }
      /**
       * Returns an array of uniform buffer variable names
       * @returns The array of uniform buffer variable names.
       */
      getUniformBuffersNames() {
        return this._uniformBuffersNamesList;
      }
      /**
       * Returns the index parameters used to create the effect
       * @returns The index parameters object
       */
      getIndexParameters() {
        return this._indexParameters;
      }
      /**
       * The error from the last compilation.
       * @returns the error string.
       */
      getCompilationError() {
        return this._compilationError;
      }
      /**
       * Gets a boolean indicating that all fallbacks were used during compilation
       * @returns true if all fallbacks were used
       */
      allFallbacksProcessed() {
        return this._allFallbacksProcessed;
      }
      /**
       * Adds a callback to the onCompiled observable and call the callback immediately if already ready.
       * @param func The callback to be used.
       */
      executeWhenCompiled(func) {
        if (this.isReady()) {
          func(this);
          return;
        }
        this.onCompileObservable.add((effect) => {
          func(effect);
        });
        if (!this._pipelineContext || this._pipelineContext.isAsync) {
          setTimeout(() => {
            this._checkIsReady(null);
          }, 16);
        }
      }
      _checkIsReady(previousPipelineContext) {
        try {
          if (this._isReadyInternal()) {
            return;
          }
        } catch (e) {
          this._processCompilationErrors(e, previousPipelineContext);
          return;
        }
        if (this._isDisposed) {
          return;
        }
        setTimeout(() => {
          this._checkIsReady(previousPipelineContext);
        }, 16);
      }
      _loadShader(shader, key, optionalKey, callback) {
        if (typeof HTMLElement !== "undefined") {
          if (shader instanceof HTMLElement) {
            const shaderCode = GetDOMTextContent(shader);
            callback(shaderCode);
            return;
          }
        }
        if (shader.substr(0, 7) === "source:") {
          callback(shader.substr(7));
          return;
        }
        if (shader.substr(0, 7) === "base64:") {
          const shaderBinary = window.atob(shader.substr(7));
          callback(shaderBinary);
          return;
        }
        const shaderStore = ShaderStore.GetShadersStore(this._shaderLanguage);
        if (shaderStore[shader + key + "Shader"]) {
          callback(shaderStore[shader + key + "Shader"]);
          return;
        }
        if (optionalKey && shaderStore[shader + optionalKey + "Shader"]) {
          callback(shaderStore[shader + optionalKey + "Shader"]);
          return;
        }
        let shaderUrl;
        if (shader[0] === "." || shader[0] === "/" || shader.indexOf("http") > -1) {
          shaderUrl = shader;
        } else {
          shaderUrl = ShaderStore.GetShadersRepository(this._shaderLanguage) + shader;
        }
        this._engine._loadFile(shaderUrl + "." + key.toLowerCase() + ".fx", callback);
      }
      /**
       * Gets the vertex shader source code of this effect
       * This is the final source code that will be compiled, after all the processing has been done (pre-processing applied, code injection/replacement, etc)
       */
      get vertexSourceCode() {
        var _a;
        return this._vertexSourceCodeOverride && this._fragmentSourceCodeOverride ? this._vertexSourceCodeOverride : ((_a = this._pipelineContext) == null ? void 0 : _a._getVertexShaderCode()) ?? this._vertexSourceCode;
      }
      /**
       * Gets the fragment shader source code of this effect
       * This is the final source code that will be compiled, after all the processing has been done (pre-processing applied, code injection/replacement, etc)
       */
      get fragmentSourceCode() {
        var _a;
        return this._vertexSourceCodeOverride && this._fragmentSourceCodeOverride ? this._fragmentSourceCodeOverride : ((_a = this._pipelineContext) == null ? void 0 : _a._getFragmentShaderCode()) ?? this._fragmentSourceCode;
      }
      /**
       * Gets the vertex shader source code before migration.
       * This is the source code after the include directives have been replaced by their contents but before the code is migrated, i.e. before ShaderProcess._ProcessShaderConversion is executed.
       * This method is, among other things, responsible for parsing #if/#define directives as well as converting GLES2 syntax to GLES3 (in the case of WebGL).
       */
      get vertexSourceCodeBeforeMigration() {
        return this._vertexSourceCodeBeforeMigration;
      }
      /**
       * Gets the fragment shader source code before migration.
       * This is the source code after the include directives have been replaced by their contents but before the code is migrated, i.e. before ShaderProcess._ProcessShaderConversion is executed.
       * This method is, among other things, responsible for parsing #if/#define directives as well as converting GLES2 syntax to GLES3 (in the case of WebGL).
       */
      get fragmentSourceCodeBeforeMigration() {
        return this._fragmentSourceCodeBeforeMigration;
      }
      /**
       * Gets the vertex shader source code before it has been modified by any processing
       */
      get rawVertexSourceCode() {
        return this._rawVertexSourceCode;
      }
      /**
       * Gets the fragment shader source code before it has been modified by any processing
       */
      get rawFragmentSourceCode() {
        return this._rawFragmentSourceCode;
      }
      /**
       * Recompiles the webGL program
       * @param vertexSourceCode The source code for the vertex shader.
       * @param fragmentSourceCode The source code for the fragment shader.
       * @param onCompiled Callback called when completed.
       * @param onError Callback called on error.
       * @internal
       */
      _rebuildProgram(vertexSourceCode, fragmentSourceCode, onCompiled, onError) {
        this._isReady = false;
        this._vertexSourceCodeOverride = vertexSourceCode;
        this._fragmentSourceCodeOverride = fragmentSourceCode;
        this.onError = (effect, error) => {
          if (onError) {
            onError(error);
          }
        };
        this.onCompiled = () => {
          var _a, _b;
          const scenes = this.getEngine().scenes;
          if (scenes) {
            for (let i = 0; i < scenes.length; i++) {
              scenes[i].markAllMaterialsAsDirty(63);
            }
          }
          (_b = (_a = this._pipelineContext)._handlesSpectorRebuildCallback) == null ? void 0 : _b.call(_a, onCompiled);
        };
        this._fallbacks = null;
        this._prepareEffect();
      }
      /**
       * Prepares the effect
       * @internal
       */
      _prepareEffect(keepExistingPipelineContext = false) {
        const attributesNames = this._attributesNames;
        const defines = this.defines;
        const previousPipelineContext = this._pipelineContext;
        this._isReady = false;
        try {
          const engine = this._engine;
          this._pipelineContext = (keepExistingPipelineContext ? previousPipelineContext : void 0) ?? engine.createPipelineContext(this._processingContext);
          this._pipelineContext._name = this._key.replace(/\r/g, "").replace(/\n/g, "|");
          const rebuildRebind = (vertexSourceCode, fragmentSourceCode, onCompiled, onError) => this._rebuildProgram(vertexSourceCode, fragmentSourceCode, onCompiled, onError);
          if (this._vertexSourceCodeOverride && this._fragmentSourceCodeOverride) {
            engine._preparePipelineContext(this._pipelineContext, this._vertexSourceCodeOverride, this._fragmentSourceCodeOverride, true, this._rawVertexSourceCode, this._rawFragmentSourceCode, rebuildRebind, null, this._transformFeedbackVaryings, this._key);
          } else {
            engine._preparePipelineContext(this._pipelineContext, this._vertexSourceCode, this._fragmentSourceCode, false, this._rawVertexSourceCode, this._rawFragmentSourceCode, rebuildRebind, defines, this._transformFeedbackVaryings, this._key);
          }
          engine._executeWhenRenderingStateIsCompiled(this._pipelineContext, () => {
            this._attributes = [];
            this._pipelineContext._fillEffectInformation(this, this._uniformBuffersNames, this._uniformsNames, this._uniforms, this._samplerList, this._samplers, attributesNames, this._attributes);
            if (attributesNames) {
              for (let i = 0; i < attributesNames.length; i++) {
                const name = attributesNames[i];
                this._attributeLocationByName[name] = this._attributes[i];
              }
            }
            engine.bindSamplers(this);
            this._compilationError = "";
            this._isReady = true;
            if (this.onCompiled) {
              this.onCompiled(this);
            }
            this.onCompileObservable.notifyObservers(this);
            this.onCompileObservable.clear();
            if (this._fallbacks) {
              this._fallbacks.unBindMesh();
            }
            if (previousPipelineContext && !keepExistingPipelineContext) {
              this.getEngine()._deletePipelineContext(previousPipelineContext);
            }
          });
          if (this._pipelineContext.isAsync) {
            this._checkIsReady(previousPipelineContext);
          }
        } catch (e) {
          this._processCompilationErrors(e, previousPipelineContext);
        }
      }
      _getShaderCodeAndErrorLine(code, error, isFragment) {
        const regexp = isFragment ? /FRAGMENT SHADER ERROR: 0:(\d+?):/ : /VERTEX SHADER ERROR: 0:(\d+?):/;
        let errorLine = null;
        if (error && code) {
          const res = error.match(regexp);
          if (res && res.length === 2) {
            const lineNumber = parseInt(res[1]);
            const lines = code.split("\n", -1);
            if (lines.length >= lineNumber) {
              errorLine = `Offending line [${lineNumber}] in ${isFragment ? "fragment" : "vertex"} code: ${lines[lineNumber - 1]}`;
            }
          }
        }
        return [code, errorLine];
      }
      _processCompilationErrors(e, previousPipelineContext = null) {
        var _a, _b, _c;
        this._compilationError = e.message;
        const attributesNames = this._attributesNames;
        const fallbacks = this._fallbacks;
        Logger.Error("Unable to compile effect:");
        Logger.Error("Uniforms: " + this._uniformsNames.map(function(uniform) {
          return " " + uniform;
        }));
        Logger.Error("Attributes: " + attributesNames.map(function(attribute) {
          return " " + attribute;
        }));
        Logger.Error("Defines:\n" + this.defines);
        if (_Effect.LogShaderCodeOnCompilationError) {
          let lineErrorVertex = null, lineErrorFragment = null, code = null;
          if ((_a = this._pipelineContext) == null ? void 0 : _a._getVertexShaderCode()) {
            [code, lineErrorVertex] = this._getShaderCodeAndErrorLine(this._pipelineContext._getVertexShaderCode(), this._compilationError, false);
            if (code) {
              Logger.Error("Vertex code:");
              Logger.Error(code);
            }
          }
          if ((_b = this._pipelineContext) == null ? void 0 : _b._getFragmentShaderCode()) {
            [code, lineErrorFragment] = this._getShaderCodeAndErrorLine((_c = this._pipelineContext) == null ? void 0 : _c._getFragmentShaderCode(), this._compilationError, true);
            if (code) {
              Logger.Error("Fragment code:");
              Logger.Error(code);
            }
          }
          if (lineErrorVertex) {
            Logger.Error(lineErrorVertex);
          }
          if (lineErrorFragment) {
            Logger.Error(lineErrorFragment);
          }
        }
        Logger.Error("Error: " + this._compilationError);
        const notifyErrors = () => {
          if (this.onError) {
            this.onError(this, this._compilationError);
          }
          this.onErrorObservable.notifyObservers(this);
        };
        if (previousPipelineContext) {
          this._pipelineContext = previousPipelineContext;
          this._isReady = true;
          notifyErrors();
        }
        if (fallbacks) {
          this._pipelineContext = null;
          if (fallbacks.hasMoreFallbacks) {
            this._allFallbacksProcessed = false;
            Logger.Error("Trying next fallback.");
            this.defines = fallbacks.reduce(this.defines, this);
            this._prepareEffect();
          } else {
            this._allFallbacksProcessed = true;
            notifyErrors();
            this.onErrorObservable.clear();
            if (this._fallbacks) {
              this._fallbacks.unBindMesh();
            }
          }
        } else {
          this._allFallbacksProcessed = true;
          if (!previousPipelineContext) {
            notifyErrors();
          }
        }
      }
      /**
       * Checks if the effect is supported. (Must be called after compilation)
       */
      get isSupported() {
        return this._compilationError === "";
      }
      /**
       * Binds a texture to the engine to be used as output of the shader.
       * @param channel Name of the output variable.
       * @param texture Texture to bind.
       * @internal
       */
      _bindTexture(channel, texture) {
        this._engine._bindTexture(this._samplers[channel], texture, channel);
      }
      /**
       * Sets a texture on the engine to be used in the shader.
       * @param channel Name of the sampler variable.
       * @param texture Texture to set.
       */
      setTexture(channel, texture) {
        this._engine.setTexture(this._samplers[channel], this._uniforms[channel], texture, channel);
      }
      /**
       * Sets a depth stencil texture from a render target on the engine to be used in the shader.
       * @param channel Name of the sampler variable.
       * @param texture Texture to set.
       */
      setDepthStencilTexture(channel, texture) {
        this._engine.setDepthStencilTexture(this._samplers[channel], this._uniforms[channel], texture, channel);
      }
      /**
       * Sets an array of textures on the engine to be used in the shader.
       * @param channel Name of the variable.
       * @param textures Textures to set.
       */
      setTextureArray(channel, textures) {
        const exName = channel + "Ex";
        if (this._samplerList.indexOf(exName + "0") === -1) {
          const initialPos = this._samplerList.indexOf(channel);
          for (let index = 1; index < textures.length; index++) {
            const currentExName = exName + (index - 1).toString();
            this._samplerList.splice(initialPos + index, 0, currentExName);
          }
          let channelIndex = 0;
          for (const key of this._samplerList) {
            this._samplers[key] = channelIndex;
            channelIndex += 1;
          }
        }
        this._engine.setTextureArray(this._samplers[channel], this._uniforms[channel], textures, channel);
      }
      /**
       * Sets a texture to be the input of the specified post process. (To use the output, pass in the next post process in the pipeline)
       * @param channel Name of the sampler variable.
       * @param postProcess Post process to get the input texture from.
       */
      setTextureFromPostProcess(channel, postProcess) {
        this._engine.setTextureFromPostProcess(this._samplers[channel], postProcess, channel);
      }
      /**
       * (Warning! setTextureFromPostProcessOutput may be desired instead)
       * Sets the input texture of the passed in post process to be input of this effect. (To use the output of the passed in post process use setTextureFromPostProcessOutput)
       * @param channel Name of the sampler variable.
       * @param postProcess Post process to get the output texture from.
       */
      setTextureFromPostProcessOutput(channel, postProcess) {
        this._engine.setTextureFromPostProcessOutput(this._samplers[channel], postProcess, channel);
      }
      /**
       * Binds a buffer to a uniform.
       * @param buffer Buffer to bind.
       * @param name Name of the uniform variable to bind to.
       */
      bindUniformBuffer(buffer, name) {
        const bufferName = this._uniformBuffersNames[name];
        if (bufferName === void 0 || _Effect._BaseCache[bufferName] === buffer && this._engine._features.useUBOBindingCache) {
          return;
        }
        _Effect._BaseCache[bufferName] = buffer;
        this._engine.bindUniformBufferBase(buffer, bufferName, name);
      }
      /**
       * Binds block to a uniform.
       * @param blockName Name of the block to bind.
       * @param index Index to bind.
       */
      bindUniformBlock(blockName, index) {
        this._engine.bindUniformBlock(this._pipelineContext, blockName, index);
      }
      /**
       * Sets an integer value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param value Value to be set.
       * @returns this effect.
       */
      setInt(uniformName, value) {
        this._pipelineContext.setInt(uniformName, value);
        return this;
      }
      /**
       * Sets an int2 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First int in int2.
       * @param y Second int in int2.
       * @returns this effect.
       */
      setInt2(uniformName, x, y) {
        this._pipelineContext.setInt2(uniformName, x, y);
        return this;
      }
      /**
       * Sets an int3 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First int in int3.
       * @param y Second int in int3.
       * @param z Third int in int3.
       * @returns this effect.
       */
      setInt3(uniformName, x, y, z) {
        this._pipelineContext.setInt3(uniformName, x, y, z);
        return this;
      }
      /**
       * Sets an int4 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First int in int4.
       * @param y Second int in int4.
       * @param z Third int in int4.
       * @param w Fourth int in int4.
       * @returns this effect.
       */
      setInt4(uniformName, x, y, z, w) {
        this._pipelineContext.setInt4(uniformName, x, y, z, w);
        return this;
      }
      /**
       * Sets an int array on a uniform variable.
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setIntArray(uniformName, array) {
        this._pipelineContext.setIntArray(uniformName, array);
        return this;
      }
      /**
       * Sets an int array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setIntArray2(uniformName, array) {
        this._pipelineContext.setIntArray2(uniformName, array);
        return this;
      }
      /**
       * Sets an int array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setIntArray3(uniformName, array) {
        this._pipelineContext.setIntArray3(uniformName, array);
        return this;
      }
      /**
       * Sets an int array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setIntArray4(uniformName, array) {
        this._pipelineContext.setIntArray4(uniformName, array);
        return this;
      }
      /**
       * Sets an unsigned integer value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param value Value to be set.
       * @returns this effect.
       */
      setUInt(uniformName, value) {
        this._pipelineContext.setUInt(uniformName, value);
        return this;
      }
      /**
       * Sets an unsigned int2 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First unsigned int in uint2.
       * @param y Second unsigned int in uint2.
       * @returns this effect.
       */
      setUInt2(uniformName, x, y) {
        this._pipelineContext.setUInt2(uniformName, x, y);
        return this;
      }
      /**
       * Sets an unsigned int3 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First unsigned int in uint3.
       * @param y Second unsigned int in uint3.
       * @param z Third unsigned int in uint3.
       * @returns this effect.
       */
      setUInt3(uniformName, x, y, z) {
        this._pipelineContext.setUInt3(uniformName, x, y, z);
        return this;
      }
      /**
       * Sets an unsigned int4 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First unsigned int in uint4.
       * @param y Second unsigned int in uint4.
       * @param z Third unsigned int in uint4.
       * @param w Fourth unsigned int in uint4.
       * @returns this effect.
       */
      setUInt4(uniformName, x, y, z, w) {
        this._pipelineContext.setUInt4(uniformName, x, y, z, w);
        return this;
      }
      /**
       * Sets an unsigned int array on a uniform variable.
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setUIntArray(uniformName, array) {
        this._pipelineContext.setUIntArray(uniformName, array);
        return this;
      }
      /**
       * Sets an unsigned int array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setUIntArray2(uniformName, array) {
        this._pipelineContext.setUIntArray2(uniformName, array);
        return this;
      }
      /**
       * Sets an unsigned int array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setUIntArray3(uniformName, array) {
        this._pipelineContext.setUIntArray3(uniformName, array);
        return this;
      }
      /**
       * Sets an unsigned int array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setUIntArray4(uniformName, array) {
        this._pipelineContext.setUIntArray4(uniformName, array);
        return this;
      }
      /**
       * Sets an float array on a uniform variable.
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setFloatArray(uniformName, array) {
        this._pipelineContext.setArray(uniformName, array);
        return this;
      }
      /**
       * Sets an float array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setFloatArray2(uniformName, array) {
        this._pipelineContext.setArray2(uniformName, array);
        return this;
      }
      /**
       * Sets an float array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setFloatArray3(uniformName, array) {
        this._pipelineContext.setArray3(uniformName, array);
        return this;
      }
      /**
       * Sets an float array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setFloatArray4(uniformName, array) {
        this._pipelineContext.setArray4(uniformName, array);
        return this;
      }
      /**
       * Sets an array on a uniform variable.
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setArray(uniformName, array) {
        this._pipelineContext.setArray(uniformName, array);
        return this;
      }
      /**
       * Sets an array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setArray2(uniformName, array) {
        this._pipelineContext.setArray2(uniformName, array);
        return this;
      }
      /**
       * Sets an array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setArray3(uniformName, array) {
        this._pipelineContext.setArray3(uniformName, array);
        return this;
      }
      /**
       * Sets an array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       * @returns this effect.
       */
      setArray4(uniformName, array) {
        this._pipelineContext.setArray4(uniformName, array);
        return this;
      }
      /**
       * Sets matrices on a uniform variable.
       * @param uniformName Name of the variable.
       * @param matrices matrices to be set.
       * @returns this effect.
       */
      setMatrices(uniformName, matrices) {
        this._pipelineContext.setMatrices(uniformName, matrices);
        return this;
      }
      /**
       * Sets matrix on a uniform variable.
       * @param uniformName Name of the variable.
       * @param matrix matrix to be set.
       * @returns this effect.
       */
      setMatrix(uniformName, matrix) {
        this._pipelineContext.setMatrix(uniformName, matrix);
        return this;
      }
      /**
       * Sets a 3x3 matrix on a uniform variable. (Specified as [1,2,3,4,5,6,7,8,9] will result in [1,2,3][4,5,6][7,8,9] matrix)
       * @param uniformName Name of the variable.
       * @param matrix matrix to be set.
       * @returns this effect.
       */
      setMatrix3x3(uniformName, matrix) {
        this._pipelineContext.setMatrix3x3(uniformName, matrix);
        return this;
      }
      /**
       * Sets a 2x2 matrix on a uniform variable. (Specified as [1,2,3,4] will result in [1,2][3,4] matrix)
       * @param uniformName Name of the variable.
       * @param matrix matrix to be set.
       * @returns this effect.
       */
      setMatrix2x2(uniformName, matrix) {
        this._pipelineContext.setMatrix2x2(uniformName, matrix);
        return this;
      }
      /**
       * Sets a float on a uniform variable.
       * @param uniformName Name of the variable.
       * @param value value to be set.
       * @returns this effect.
       */
      setFloat(uniformName, value) {
        this._pipelineContext.setFloat(uniformName, value);
        return this;
      }
      /**
       * Sets a boolean on a uniform variable.
       * @param uniformName Name of the variable.
       * @param bool value to be set.
       * @returns this effect.
       */
      setBool(uniformName, bool) {
        this._pipelineContext.setInt(uniformName, bool ? 1 : 0);
        return this;
      }
      /**
       * Sets a Vector2 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param vector2 vector2 to be set.
       * @returns this effect.
       */
      setVector2(uniformName, vector2) {
        this._pipelineContext.setVector2(uniformName, vector2);
        return this;
      }
      /**
       * Sets a float2 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First float in float2.
       * @param y Second float in float2.
       * @returns this effect.
       */
      setFloat2(uniformName, x, y) {
        this._pipelineContext.setFloat2(uniformName, x, y);
        return this;
      }
      /**
       * Sets a Vector3 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param vector3 Value to be set.
       * @returns this effect.
       */
      setVector3(uniformName, vector3) {
        this._pipelineContext.setVector3(uniformName, vector3);
        return this;
      }
      /**
       * Sets a float3 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First float in float3.
       * @param y Second float in float3.
       * @param z Third float in float3.
       * @returns this effect.
       */
      setFloat3(uniformName, x, y, z) {
        this._pipelineContext.setFloat3(uniformName, x, y, z);
        return this;
      }
      /**
       * Sets a Vector4 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param vector4 Value to be set.
       * @returns this effect.
       */
      setVector4(uniformName, vector4) {
        this._pipelineContext.setVector4(uniformName, vector4);
        return this;
      }
      /**
       * Sets a Quaternion on a uniform variable.
       * @param uniformName Name of the variable.
       * @param quaternion Value to be set.
       * @returns this effect.
       */
      setQuaternion(uniformName, quaternion) {
        this._pipelineContext.setQuaternion(uniformName, quaternion);
        return this;
      }
      /**
       * Sets a float4 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First float in float4.
       * @param y Second float in float4.
       * @param z Third float in float4.
       * @param w Fourth float in float4.
       * @returns this effect.
       */
      setFloat4(uniformName, x, y, z, w) {
        this._pipelineContext.setFloat4(uniformName, x, y, z, w);
        return this;
      }
      /**
       * Sets a Color3 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param color3 Value to be set.
       * @returns this effect.
       */
      setColor3(uniformName, color3) {
        this._pipelineContext.setColor3(uniformName, color3);
        return this;
      }
      /**
       * Sets a Color4 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param color3 Value to be set.
       * @param alpha Alpha value to be set.
       * @returns this effect.
       */
      setColor4(uniformName, color3, alpha) {
        this._pipelineContext.setColor4(uniformName, color3, alpha);
        return this;
      }
      /**
       * Sets a Color4 on a uniform variable
       * @param uniformName defines the name of the variable
       * @param color4 defines the value to be set
       * @returns this effect.
       */
      setDirectColor4(uniformName, color4) {
        this._pipelineContext.setDirectColor4(uniformName, color4);
        return this;
      }
      /**
       * Release all associated resources.
       **/
      dispose() {
        if (this._pipelineContext) {
          this._pipelineContext.dispose();
        }
        this._engine._releaseEffect(this);
        this._isDisposed = true;
      }
      /**
       * This function will add a new shader to the shader store
       * @param name the name of the shader
       * @param pixelShader optional pixel shader content
       * @param vertexShader optional vertex shader content
       * @param shaderLanguage the language the shader is written in (default: GLSL)
       */
      static RegisterShader(name, pixelShader, vertexShader, shaderLanguage = ShaderLanguage.GLSL) {
        if (pixelShader) {
          ShaderStore.GetShadersStore(shaderLanguage)[`${name}PixelShader`] = pixelShader;
        }
        if (vertexShader) {
          ShaderStore.GetShadersStore(shaderLanguage)[`${name}VertexShader`] = vertexShader;
        }
      }
      /**
       * Resets the cache of effects.
       */
      static ResetCache() {
        _Effect._BaseCache = {};
      }
    };
    Effect.LogShaderCodeOnCompilationError = true;
    Effect._UniqueIdSeed = 0;
    Effect._BaseCache = {};
    Effect.ShadersStore = ShaderStore.ShadersStore;
    Effect.IncludesShadersStore = ShaderStore.IncludesShadersStore;
  }
});

// node_modules/@babylonjs/core/States/depthCullingState.js
var DepthCullingState;
var init_depthCullingState = __esm({
  "node_modules/@babylonjs/core/States/depthCullingState.js"() {
    DepthCullingState = class {
      /**
       * Initializes the state.
       * @param reset
       */
      constructor(reset = true) {
        this._isDepthTestDirty = false;
        this._isDepthMaskDirty = false;
        this._isDepthFuncDirty = false;
        this._isCullFaceDirty = false;
        this._isCullDirty = false;
        this._isZOffsetDirty = false;
        this._isFrontFaceDirty = false;
        if (reset) {
          this.reset();
        }
      }
      get isDirty() {
        return this._isDepthFuncDirty || this._isDepthTestDirty || this._isDepthMaskDirty || this._isCullFaceDirty || this._isCullDirty || this._isZOffsetDirty || this._isFrontFaceDirty;
      }
      get zOffset() {
        return this._zOffset;
      }
      set zOffset(value) {
        if (this._zOffset === value) {
          return;
        }
        this._zOffset = value;
        this._isZOffsetDirty = true;
      }
      get zOffsetUnits() {
        return this._zOffsetUnits;
      }
      set zOffsetUnits(value) {
        if (this._zOffsetUnits === value) {
          return;
        }
        this._zOffsetUnits = value;
        this._isZOffsetDirty = true;
      }
      get cullFace() {
        return this._cullFace;
      }
      set cullFace(value) {
        if (this._cullFace === value) {
          return;
        }
        this._cullFace = value;
        this._isCullFaceDirty = true;
      }
      get cull() {
        return this._cull;
      }
      set cull(value) {
        if (this._cull === value) {
          return;
        }
        this._cull = value;
        this._isCullDirty = true;
      }
      get depthFunc() {
        return this._depthFunc;
      }
      set depthFunc(value) {
        if (this._depthFunc === value) {
          return;
        }
        this._depthFunc = value;
        this._isDepthFuncDirty = true;
      }
      get depthMask() {
        return this._depthMask;
      }
      set depthMask(value) {
        if (this._depthMask === value) {
          return;
        }
        this._depthMask = value;
        this._isDepthMaskDirty = true;
      }
      get depthTest() {
        return this._depthTest;
      }
      set depthTest(value) {
        if (this._depthTest === value) {
          return;
        }
        this._depthTest = value;
        this._isDepthTestDirty = true;
      }
      get frontFace() {
        return this._frontFace;
      }
      set frontFace(value) {
        if (this._frontFace === value) {
          return;
        }
        this._frontFace = value;
        this._isFrontFaceDirty = true;
      }
      reset() {
        this._depthMask = true;
        this._depthTest = true;
        this._depthFunc = null;
        this._cullFace = null;
        this._cull = null;
        this._zOffset = 0;
        this._zOffsetUnits = 0;
        this._frontFace = null;
        this._isDepthTestDirty = true;
        this._isDepthMaskDirty = true;
        this._isDepthFuncDirty = false;
        this._isCullFaceDirty = false;
        this._isCullDirty = false;
        this._isZOffsetDirty = true;
        this._isFrontFaceDirty = false;
      }
      apply(gl) {
        if (!this.isDirty) {
          return;
        }
        if (this._isCullDirty) {
          if (this.cull) {
            gl.enable(gl.CULL_FACE);
          } else {
            gl.disable(gl.CULL_FACE);
          }
          this._isCullDirty = false;
        }
        if (this._isCullFaceDirty) {
          gl.cullFace(this.cullFace);
          this._isCullFaceDirty = false;
        }
        if (this._isDepthMaskDirty) {
          gl.depthMask(this.depthMask);
          this._isDepthMaskDirty = false;
        }
        if (this._isDepthTestDirty) {
          if (this.depthTest) {
            gl.enable(gl.DEPTH_TEST);
          } else {
            gl.disable(gl.DEPTH_TEST);
          }
          this._isDepthTestDirty = false;
        }
        if (this._isDepthFuncDirty) {
          gl.depthFunc(this.depthFunc);
          this._isDepthFuncDirty = false;
        }
        if (this._isZOffsetDirty) {
          if (this.zOffset || this.zOffsetUnits) {
            gl.enable(gl.POLYGON_OFFSET_FILL);
            gl.polygonOffset(this.zOffset, this.zOffsetUnits);
          } else {
            gl.disable(gl.POLYGON_OFFSET_FILL);
          }
          this._isZOffsetDirty = false;
        }
        if (this._isFrontFaceDirty) {
          gl.frontFace(this.frontFace);
          this._isFrontFaceDirty = false;
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/States/stencilState.js
var StencilState;
var init_stencilState = __esm({
  "node_modules/@babylonjs/core/States/stencilState.js"() {
    StencilState = class _StencilState {
      constructor() {
        this.reset();
      }
      reset() {
        this.enabled = false;
        this.mask = 255;
        this.func = _StencilState.ALWAYS;
        this.funcRef = 1;
        this.funcMask = 255;
        this.opStencilFail = _StencilState.KEEP;
        this.opDepthFail = _StencilState.KEEP;
        this.opStencilDepthPass = _StencilState.REPLACE;
      }
      get stencilFunc() {
        return this.func;
      }
      set stencilFunc(value) {
        this.func = value;
      }
      get stencilFuncRef() {
        return this.funcRef;
      }
      set stencilFuncRef(value) {
        this.funcRef = value;
      }
      get stencilFuncMask() {
        return this.funcMask;
      }
      set stencilFuncMask(value) {
        this.funcMask = value;
      }
      get stencilOpStencilFail() {
        return this.opStencilFail;
      }
      set stencilOpStencilFail(value) {
        this.opStencilFail = value;
      }
      get stencilOpDepthFail() {
        return this.opDepthFail;
      }
      set stencilOpDepthFail(value) {
        this.opDepthFail = value;
      }
      get stencilOpStencilDepthPass() {
        return this.opStencilDepthPass;
      }
      set stencilOpStencilDepthPass(value) {
        this.opStencilDepthPass = value;
      }
      get stencilMask() {
        return this.mask;
      }
      set stencilMask(value) {
        this.mask = value;
      }
      get stencilTest() {
        return this.enabled;
      }
      set stencilTest(value) {
        this.enabled = value;
      }
    };
    StencilState.ALWAYS = 519;
    StencilState.KEEP = 7680;
    StencilState.REPLACE = 7681;
  }
});

// node_modules/@babylonjs/core/States/alphaCullingState.js
var AlphaState;
var init_alphaCullingState = __esm({
  "node_modules/@babylonjs/core/States/alphaCullingState.js"() {
    AlphaState = class {
      /**
       * Initializes the state.
       */
      constructor() {
        this._blendFunctionParameters = new Array(4);
        this._blendEquationParameters = new Array(2);
        this._blendConstants = new Array(4);
        this._isBlendConstantsDirty = false;
        this._alphaBlend = false;
        this._isAlphaBlendDirty = false;
        this._isBlendFunctionParametersDirty = false;
        this._isBlendEquationParametersDirty = false;
        this.reset();
      }
      get isDirty() {
        return this._isAlphaBlendDirty || this._isBlendFunctionParametersDirty || this._isBlendEquationParametersDirty;
      }
      get alphaBlend() {
        return this._alphaBlend;
      }
      set alphaBlend(value) {
        if (this._alphaBlend === value) {
          return;
        }
        this._alphaBlend = value;
        this._isAlphaBlendDirty = true;
      }
      setAlphaBlendConstants(r, g, b, a) {
        if (this._blendConstants[0] === r && this._blendConstants[1] === g && this._blendConstants[2] === b && this._blendConstants[3] === a) {
          return;
        }
        this._blendConstants[0] = r;
        this._blendConstants[1] = g;
        this._blendConstants[2] = b;
        this._blendConstants[3] = a;
        this._isBlendConstantsDirty = true;
      }
      setAlphaBlendFunctionParameters(value0, value1, value2, value3) {
        if (this._blendFunctionParameters[0] === value0 && this._blendFunctionParameters[1] === value1 && this._blendFunctionParameters[2] === value2 && this._blendFunctionParameters[3] === value3) {
          return;
        }
        this._blendFunctionParameters[0] = value0;
        this._blendFunctionParameters[1] = value1;
        this._blendFunctionParameters[2] = value2;
        this._blendFunctionParameters[3] = value3;
        this._isBlendFunctionParametersDirty = true;
      }
      setAlphaEquationParameters(rgb, alpha) {
        if (this._blendEquationParameters[0] === rgb && this._blendEquationParameters[1] === alpha) {
          return;
        }
        this._blendEquationParameters[0] = rgb;
        this._blendEquationParameters[1] = alpha;
        this._isBlendEquationParametersDirty = true;
      }
      reset() {
        this._alphaBlend = false;
        this._blendFunctionParameters[0] = null;
        this._blendFunctionParameters[1] = null;
        this._blendFunctionParameters[2] = null;
        this._blendFunctionParameters[3] = null;
        this._blendEquationParameters[0] = null;
        this._blendEquationParameters[1] = null;
        this._blendConstants[0] = null;
        this._blendConstants[1] = null;
        this._blendConstants[2] = null;
        this._blendConstants[3] = null;
        this._isAlphaBlendDirty = true;
        this._isBlendFunctionParametersDirty = false;
        this._isBlendEquationParametersDirty = false;
        this._isBlendConstantsDirty = false;
      }
      apply(gl) {
        if (!this.isDirty) {
          return;
        }
        if (this._isAlphaBlendDirty) {
          if (this._alphaBlend) {
            gl.enable(gl.BLEND);
          } else {
            gl.disable(gl.BLEND);
          }
          this._isAlphaBlendDirty = false;
        }
        if (this._isBlendFunctionParametersDirty) {
          gl.blendFuncSeparate(this._blendFunctionParameters[0], this._blendFunctionParameters[1], this._blendFunctionParameters[2], this._blendFunctionParameters[3]);
          this._isBlendFunctionParametersDirty = false;
        }
        if (this._isBlendEquationParametersDirty) {
          gl.blendEquationSeparate(this._blendEquationParameters[0], this._blendEquationParameters[1]);
          this._isBlendEquationParametersDirty = false;
        }
        if (this._isBlendConstantsDirty) {
          gl.blendColor(this._blendConstants[0], this._blendConstants[1], this._blendConstants[2], this._blendConstants[3]);
          this._isBlendConstantsDirty = false;
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/WebGL/webGL2ShaderProcessors.js
var varyingRegex, WebGL2ShaderProcessor;
var init_webGL2ShaderProcessors = __esm({
  "node_modules/@babylonjs/core/Engines/WebGL/webGL2ShaderProcessors.js"() {
    init_shaderLanguage();
    varyingRegex = /(flat\s)?\s*varying\s*.*/;
    WebGL2ShaderProcessor = class {
      constructor() {
        this.shaderLanguage = ShaderLanguage.GLSL;
      }
      attributeProcessor(attribute) {
        return attribute.replace("attribute", "in");
      }
      varyingCheck(varying, _isFragment) {
        return varyingRegex.test(varying);
      }
      varyingProcessor(varying, isFragment) {
        return varying.replace("varying", isFragment ? "in" : "out");
      }
      postProcessor(code, defines, isFragment) {
        const hasDrawBuffersExtension = code.search(/#extension.+GL_EXT_draw_buffers.+require/) !== -1;
        const regex = /#extension.+(GL_OVR_multiview2|GL_OES_standard_derivatives|GL_EXT_shader_texture_lod|GL_EXT_frag_depth|GL_EXT_draw_buffers).+(enable|require)/g;
        code = code.replace(regex, "");
        code = code.replace(/texture2D\s*\(/g, "texture(");
        if (isFragment) {
          const hasOutput = code.search(/layout *\(location *= *0\) *out/g) !== -1;
          code = code.replace(/texture2DLodEXT\s*\(/g, "textureLod(");
          code = code.replace(/textureCubeLodEXT\s*\(/g, "textureLod(");
          code = code.replace(/textureCube\s*\(/g, "texture(");
          code = code.replace(/gl_FragDepthEXT/g, "gl_FragDepth");
          code = code.replace(/gl_FragColor/g, "glFragColor");
          code = code.replace(/gl_FragData/g, "glFragData");
          code = code.replace(/void\s+?main\s*\(/g, (hasDrawBuffersExtension || hasOutput ? "" : "layout(location = 0) out vec4 glFragColor;\n") + "void main(");
        } else {
          const hasMultiviewExtension = defines.indexOf("#define MULTIVIEW") !== -1;
          if (hasMultiviewExtension) {
            return "#extension GL_OVR_multiview2 : require\nlayout (num_views = 2) in;\n" + code;
          }
        }
        return code;
      }
    };
  }
});

// node_modules/@babylonjs/core/Buffers/dataBuffer.js
var DataBuffer;
var init_dataBuffer = __esm({
  "node_modules/@babylonjs/core/Buffers/dataBuffer.js"() {
    DataBuffer = class _DataBuffer {
      /**
       * Gets the underlying buffer
       */
      get underlyingResource() {
        return null;
      }
      /**
       * Constructs the buffer
       */
      constructor() {
        this.references = 0;
        this.capacity = 0;
        this.is32Bits = false;
        this.uniqueId = _DataBuffer._Counter++;
      }
    };
    DataBuffer._Counter = 0;
  }
});

// node_modules/@babylonjs/core/Meshes/WebGL/webGLDataBuffer.js
var WebGLDataBuffer;
var init_webGLDataBuffer = __esm({
  "node_modules/@babylonjs/core/Meshes/WebGL/webGLDataBuffer.js"() {
    init_dataBuffer();
    WebGLDataBuffer = class extends DataBuffer {
      constructor(resource) {
        super();
        this._buffer = resource;
      }
      get underlyingResource() {
        return this._buffer;
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/WebGL/webGLPipelineContext.js
var WebGLPipelineContext;
var init_webGLPipelineContext = __esm({
  "node_modules/@babylonjs/core/Engines/WebGL/webGLPipelineContext.js"() {
    WebGLPipelineContext = class {
      constructor() {
        this._valueCache = {};
        this.vertexCompilationError = null;
        this.fragmentCompilationError = null;
        this.programLinkError = null;
        this.programValidationError = null;
        this._isDisposed = false;
      }
      get isAsync() {
        return this.isParallelCompiled;
      }
      get isReady() {
        if (this.program) {
          if (this.isParallelCompiled) {
            return this.engine._isRenderingStateCompiled(this);
          }
          return true;
        }
        return false;
      }
      _handlesSpectorRebuildCallback(onCompiled) {
        if (onCompiled && this.program) {
          onCompiled(this.program);
        }
      }
      _fillEffectInformation(effect, uniformBuffersNames, uniformsNames, uniforms, samplerList, samplers, attributesNames, attributes) {
        const engine = this.engine;
        if (engine.supportsUniformBuffers) {
          for (const name in uniformBuffersNames) {
            effect.bindUniformBlock(name, uniformBuffersNames[name]);
          }
        }
        const effectAvailableUniforms = this.engine.getUniforms(this, uniformsNames);
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
        samplerList.forEach((name, index2) => {
          samplers[name] = index2;
        });
        for (const attr of engine.getAttributes(this, attributesNames)) {
          attributes.push(attr);
        }
      }
      /**
       * Release all associated resources.
       **/
      dispose() {
        this._uniforms = {};
        this._isDisposed = true;
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
        if (!cache || cache.length !== 2) {
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
        if (!cache || cache.length !== 3) {
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
        if (!cache || cache.length !== 4) {
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
        if (this.engine.setInt(this._uniforms[uniformName], value)) {
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
          if (!this.engine.setInt2(this._uniforms[uniformName], x, y)) {
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
          if (!this.engine.setInt3(this._uniforms[uniformName], x, y, z)) {
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
          if (!this.engine.setInt4(this._uniforms[uniformName], x, y, z, w)) {
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
        this.engine.setIntArray(this._uniforms[uniformName], array);
      }
      /**
       * Sets an int array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setIntArray2(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setIntArray2(this._uniforms[uniformName], array);
      }
      /**
       * Sets an int array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setIntArray3(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setIntArray3(this._uniforms[uniformName], array);
      }
      /**
       * Sets an int array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setIntArray4(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setIntArray4(this._uniforms[uniformName], array);
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
        if (this.engine.setUInt(this._uniforms[uniformName], value)) {
          this._valueCache[uniformName] = value;
        }
      }
      /**
       * Sets an unsigned int2 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First unsigned int in uint2.
       * @param y Second unsigned int in uint2.
       */
      setUInt2(uniformName, x, y) {
        if (this._cacheFloat2(uniformName, x, y)) {
          if (!this.engine.setUInt2(this._uniforms[uniformName], x, y)) {
            this._valueCache[uniformName] = null;
          }
        }
      }
      /**
       * Sets an unsigned int3 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First unsigned int in uint3.
       * @param y Second unsigned int in uint3.
       * @param z Third unsigned int in uint3.
       */
      setUInt3(uniformName, x, y, z) {
        if (this._cacheFloat3(uniformName, x, y, z)) {
          if (!this.engine.setUInt3(this._uniforms[uniformName], x, y, z)) {
            this._valueCache[uniformName] = null;
          }
        }
      }
      /**
       * Sets an unsigned int4 value on a uniform variable.
       * @param uniformName Name of the variable.
       * @param x First unsigned int in uint4.
       * @param y Second unsigned int in uint4.
       * @param z Third unsigned int in uint4.
       * @param w Fourth unsigned int in uint4.
       */
      setUInt4(uniformName, x, y, z, w) {
        if (this._cacheFloat4(uniformName, x, y, z, w)) {
          if (!this.engine.setUInt4(this._uniforms[uniformName], x, y, z, w)) {
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
        this.engine.setUIntArray(this._uniforms[uniformName], array);
      }
      /**
       * Sets an unsigned int array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setUIntArray2(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setUIntArray2(this._uniforms[uniformName], array);
      }
      /**
       * Sets an unsigned int array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setUIntArray3(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setUIntArray3(this._uniforms[uniformName], array);
      }
      /**
       * Sets an unsigned int array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setUIntArray4(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setUIntArray4(this._uniforms[uniformName], array);
      }
      /**
       * Sets an array on a uniform variable.
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setArray(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setArray(this._uniforms[uniformName], array);
      }
      /**
       * Sets an array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setArray2(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setArray2(this._uniforms[uniformName], array);
      }
      /**
       * Sets an array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setArray3(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setArray3(this._uniforms[uniformName], array);
      }
      /**
       * Sets an array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
       * @param uniformName Name of the variable.
       * @param array array to be set.
       */
      setArray4(uniformName, array) {
        this._valueCache[uniformName] = null;
        this.engine.setArray4(this._uniforms[uniformName], array);
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
        this.engine.setMatrices(this._uniforms[uniformName], matrices);
      }
      /**
       * Sets matrix on a uniform variable.
       * @param uniformName Name of the variable.
       * @param matrix matrix to be set.
       */
      setMatrix(uniformName, matrix) {
        if (this._cacheMatrix(uniformName, matrix)) {
          if (!this.engine.setMatrices(this._uniforms[uniformName], matrix.asArray())) {
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
        this.engine.setMatrix3x3(this._uniforms[uniformName], matrix);
      }
      /**
       * Sets a 2x2 matrix on a uniform variable. (Specified as [1,2,3,4] will result in [1,2][3,4] matrix)
       * @param uniformName Name of the variable.
       * @param matrix matrix to be set.
       */
      setMatrix2x2(uniformName, matrix) {
        this._valueCache[uniformName] = null;
        this.engine.setMatrix2x2(this._uniforms[uniformName], matrix);
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
        if (this.engine.setFloat(this._uniforms[uniformName], value)) {
          this._valueCache[uniformName] = value;
        }
      }
      /**
       * Sets a Vector2 on a uniform variable.
       * @param uniformName Name of the variable.
       * @param vector2 vector2 to be set.
       */
      setVector2(uniformName, vector2) {
        if (this._cacheFloat2(uniformName, vector2.x, vector2.y)) {
          if (!this.engine.setFloat2(this._uniforms[uniformName], vector2.x, vector2.y)) {
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
          if (!this.engine.setFloat2(this._uniforms[uniformName], x, y)) {
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
          if (!this.engine.setFloat3(this._uniforms[uniformName], vector3.x, vector3.y, vector3.z)) {
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
          if (!this.engine.setFloat3(this._uniforms[uniformName], x, y, z)) {
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
          if (!this.engine.setFloat4(this._uniforms[uniformName], vector4.x, vector4.y, vector4.z, vector4.w)) {
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
          if (!this.engine.setFloat4(this._uniforms[uniformName], quaternion.x, quaternion.y, quaternion.z, quaternion.w)) {
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
          if (!this.engine.setFloat4(this._uniforms[uniformName], x, y, z, w)) {
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
          if (!this.engine.setFloat3(this._uniforms[uniformName], color3.r, color3.g, color3.b)) {
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
          if (!this.engine.setFloat4(this._uniforms[uniformName], color3.r, color3.g, color3.b, alpha)) {
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
          if (!this.engine.setFloat4(this._uniforms[uniformName], color4.r, color4.g, color4.b, color4.a)) {
            this._valueCache[uniformName] = null;
          }
        }
      }
      _getVertexShaderCode() {
        return this.vertexShader ? this.engine._getShaderSource(this.vertexShader) : null;
      }
      _getFragmentShaderCode() {
        return this.fragmentShader ? this.engine._getShaderSource(this.fragmentShader) : null;
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/WebGL/webGLHardwareTexture.js
var WebGLHardwareTexture;
var init_webGLHardwareTexture = __esm({
  "node_modules/@babylonjs/core/Engines/WebGL/webGLHardwareTexture.js"() {
    WebGLHardwareTexture = class {
      get underlyingResource() {
        return this._webGLTexture;
      }
      constructor(existingTexture = null, context) {
        this._MSAARenderBuffers = null;
        this._context = context;
        if (!existingTexture) {
          existingTexture = context.createTexture();
          if (!existingTexture) {
            throw new Error("Unable to create webGL texture");
          }
        }
        this.set(existingTexture);
      }
      setUsage() {
      }
      set(hardwareTexture) {
        this._webGLTexture = hardwareTexture;
      }
      reset() {
        this._webGLTexture = null;
        this._MSAARenderBuffers = null;
      }
      addMSAARenderBuffer(buffer) {
        if (!this._MSAARenderBuffers) {
          this._MSAARenderBuffers = [];
        }
        this._MSAARenderBuffers.push(buffer);
      }
      releaseMSAARenderBuffers() {
        if (this._MSAARenderBuffers) {
          for (const buffer of this._MSAARenderBuffers) {
            this._context.deleteRenderbuffer(buffer);
          }
          this._MSAARenderBuffers = null;
        }
      }
      getMSAARenderBuffer(index = 0) {
        var _a;
        return ((_a = this._MSAARenderBuffers) == null ? void 0 : _a[index]) ?? null;
      }
      release() {
        this.releaseMSAARenderBuffers();
        if (this._webGLTexture) {
          this._context.deleteTexture(this._webGLTexture);
        }
        this.reset();
      }
    };
  }
});

// node_modules/@babylonjs/core/Materials/drawWrapper.js
var DrawWrapper;
var init_drawWrapper = __esm({
  "node_modules/@babylonjs/core/Materials/drawWrapper.js"() {
    DrawWrapper = class {
      static IsWrapper(effect) {
        return effect.getPipelineContext === void 0;
      }
      static GetEffect(effect) {
        return effect.getPipelineContext === void 0 ? effect.effect : effect;
      }
      constructor(engine, createMaterialContext = true) {
        this._wasPreviouslyReady = false;
        this._forceRebindOnNextCall = true;
        this._wasPreviouslyUsingInstances = null;
        this.effect = null;
        this.defines = null;
        this.drawContext = engine.createDrawContext();
        if (createMaterialContext) {
          this.materialContext = engine.createMaterialContext();
        }
      }
      setEffect(effect, defines, resetContext = true) {
        var _a;
        this.effect = effect;
        if (defines !== void 0) {
          this.defines = defines;
        }
        if (resetContext) {
          (_a = this.drawContext) == null ? void 0 : _a.reset();
        }
      }
      dispose() {
        var _a;
        (_a = this.drawContext) == null ? void 0 : _a.dispose();
      }
    };
  }
});

// node_modules/@babylonjs/core/States/stencilStateComposer.js
var StencilStateComposer;
var init_stencilStateComposer = __esm({
  "node_modules/@babylonjs/core/States/stencilStateComposer.js"() {
    StencilStateComposer = class {
      get isDirty() {
        return this._isStencilTestDirty || this._isStencilMaskDirty || this._isStencilFuncDirty || this._isStencilOpDirty;
      }
      get func() {
        return this._func;
      }
      set func(value) {
        if (this._func === value) {
          return;
        }
        this._func = value;
        this._isStencilFuncDirty = true;
      }
      get funcRef() {
        return this._funcRef;
      }
      set funcRef(value) {
        if (this._funcRef === value) {
          return;
        }
        this._funcRef = value;
        this._isStencilFuncDirty = true;
      }
      get funcMask() {
        return this._funcMask;
      }
      set funcMask(value) {
        if (this._funcMask === value) {
          return;
        }
        this._funcMask = value;
        this._isStencilFuncDirty = true;
      }
      get opStencilFail() {
        return this._opStencilFail;
      }
      set opStencilFail(value) {
        if (this._opStencilFail === value) {
          return;
        }
        this._opStencilFail = value;
        this._isStencilOpDirty = true;
      }
      get opDepthFail() {
        return this._opDepthFail;
      }
      set opDepthFail(value) {
        if (this._opDepthFail === value) {
          return;
        }
        this._opDepthFail = value;
        this._isStencilOpDirty = true;
      }
      get opStencilDepthPass() {
        return this._opStencilDepthPass;
      }
      set opStencilDepthPass(value) {
        if (this._opStencilDepthPass === value) {
          return;
        }
        this._opStencilDepthPass = value;
        this._isStencilOpDirty = true;
      }
      get mask() {
        return this._mask;
      }
      set mask(value) {
        if (this._mask === value) {
          return;
        }
        this._mask = value;
        this._isStencilMaskDirty = true;
      }
      get enabled() {
        return this._enabled;
      }
      set enabled(value) {
        if (this._enabled === value) {
          return;
        }
        this._enabled = value;
        this._isStencilTestDirty = true;
      }
      constructor(reset = true) {
        this._isStencilTestDirty = false;
        this._isStencilMaskDirty = false;
        this._isStencilFuncDirty = false;
        this._isStencilOpDirty = false;
        this.useStencilGlobalOnly = false;
        if (reset) {
          this.reset();
        }
      }
      reset() {
        var _a;
        this.stencilMaterial = void 0;
        (_a = this.stencilGlobal) == null ? void 0 : _a.reset();
        this._isStencilTestDirty = true;
        this._isStencilMaskDirty = true;
        this._isStencilFuncDirty = true;
        this._isStencilOpDirty = true;
      }
      apply(gl) {
        var _a;
        if (!gl) {
          return;
        }
        const stencilMaterialEnabled = !this.useStencilGlobalOnly && !!((_a = this.stencilMaterial) == null ? void 0 : _a.enabled);
        this.enabled = stencilMaterialEnabled ? this.stencilMaterial.enabled : this.stencilGlobal.enabled;
        this.func = stencilMaterialEnabled ? this.stencilMaterial.func : this.stencilGlobal.func;
        this.funcRef = stencilMaterialEnabled ? this.stencilMaterial.funcRef : this.stencilGlobal.funcRef;
        this.funcMask = stencilMaterialEnabled ? this.stencilMaterial.funcMask : this.stencilGlobal.funcMask;
        this.opStencilFail = stencilMaterialEnabled ? this.stencilMaterial.opStencilFail : this.stencilGlobal.opStencilFail;
        this.opDepthFail = stencilMaterialEnabled ? this.stencilMaterial.opDepthFail : this.stencilGlobal.opDepthFail;
        this.opStencilDepthPass = stencilMaterialEnabled ? this.stencilMaterial.opStencilDepthPass : this.stencilGlobal.opStencilDepthPass;
        this.mask = stencilMaterialEnabled ? this.stencilMaterial.mask : this.stencilGlobal.mask;
        if (!this.isDirty) {
          return;
        }
        if (this._isStencilTestDirty) {
          if (this.enabled) {
            gl.enable(gl.STENCIL_TEST);
          } else {
            gl.disable(gl.STENCIL_TEST);
          }
          this._isStencilTestDirty = false;
        }
        if (this._isStencilMaskDirty) {
          gl.stencilMask(this.mask);
          this._isStencilMaskDirty = false;
        }
        if (this._isStencilFuncDirty) {
          gl.stencilFunc(this.func, this.funcRef, this.funcMask);
          this._isStencilFuncDirty = false;
        }
        if (this._isStencilOpDirty) {
          gl.stencilOp(this.opStencilFail, this.opDepthFail, this.opStencilDepthPass);
          this._isStencilOpDirty = false;
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/precisionDate.js
var PrecisionDate;
var init_precisionDate = __esm({
  "node_modules/@babylonjs/core/Misc/precisionDate.js"() {
    init_domManagement();
    PrecisionDate = class {
      /**
       * Gets either window.performance.now() if supported or Date.now() else
       */
      static get Now() {
        if (IsWindowObjectExist() && window.performance && window.performance.now) {
          return window.performance.now();
        }
        return Date.now();
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/WebGL/webGLShaderProcessors.js
var WebGLShaderProcessor;
var init_webGLShaderProcessors = __esm({
  "node_modules/@babylonjs/core/Engines/WebGL/webGLShaderProcessors.js"() {
    init_shaderLanguage();
    WebGLShaderProcessor = class {
      constructor() {
        this.shaderLanguage = ShaderLanguage.GLSL;
      }
      postProcessor(code, defines, isFragment, processingContext, engine) {
        if (!engine.getCaps().drawBuffersExtension) {
          const regex = /#extension.+GL_EXT_draw_buffers.+(enable|require)/g;
          code = code.replace(regex, "");
        }
        return code;
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/thinEngine.js
var BufferPointer, ThinEngine;
var init_thinEngine = __esm({
  "node_modules/@babylonjs/core/Engines/thinEngine.js"() {
    init_engineStore();
    init_effect();
    init_devTools();
    init_observable();
    init_depthCullingState();
    init_stencilState();
    init_alphaCullingState();
    init_internalTexture();
    init_logger();
    init_domManagement();
    init_webGLShaderProcessors();
    init_webGL2ShaderProcessors();
    init_webGLDataBuffer();
    init_webGLPipelineContext();
    init_performanceConfigurator();
    init_webGLHardwareTexture();
    init_drawWrapper();
    init_stencilStateComposer();
    init_shaderLanguage();
    init_precisionDate();
    BufferPointer = class {
    };
    ThinEngine = class _ThinEngine {
      /**
       * Returns the current npm package of the sdk
       */
      // Not mixed with Version for tooling purpose.
      static get NpmPackage() {
        return "babylonjs@6.49.0";
      }
      /**
       * Returns the current version of the framework
       */
      static get Version() {
        return "6.49.0";
      }
      /**
       * Returns a string describing the current engine
       */
      get description() {
        let description = this.name + this.webGLVersion;
        if (this._caps.parallelShaderCompile) {
          description += " - Parallel shader compilation";
        }
        return description;
      }
      /**
       * Gets or sets the name of the engine
       */
      get name() {
        return this._name;
      }
      set name(value) {
        this._name = value;
      }
      /**
       * Returns the version of the engine
       */
      get version() {
        return this._webGLVersion;
      }
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Gets or sets the relative url used to load shaders if using the engine in non-minified mode
       */
      static get ShadersRepository() {
        return Effect.ShadersRepository;
      }
      static set ShadersRepository(value) {
        Effect.ShadersRepository = value;
      }
      /**
       * @internal
       */
      _getShaderProcessor(shaderLanguage) {
        return this._shaderProcessor;
      }
      /**
       * Gets or sets a boolean indicating if depth buffer should be reverse, going from far to near.
       * This can provide greater z depth for distant objects.
       */
      get useReverseDepthBuffer() {
        return this._useReverseDepthBuffer;
      }
      set useReverseDepthBuffer(useReverse) {
        if (useReverse === this._useReverseDepthBuffer) {
          return;
        }
        this._useReverseDepthBuffer = useReverse;
        if (useReverse) {
          this._depthCullingState.depthFunc = 518;
        } else {
          this._depthCullingState.depthFunc = 515;
        }
      }
      /**
       * Gets the current frame id
       */
      get frameId() {
        return this._frameId;
      }
      /**
       * Gets a boolean indicating that the engine supports uniform buffers
       * @see https://doc.babylonjs.com/setup/support/webGL2#uniform-buffer-objets
       */
      get supportsUniformBuffers() {
        return this.webGLVersion > 1 && !this.disableUniformBuffers;
      }
      /**
       * Gets the options used for engine creation
       * @returns EngineOptions object
       */
      getCreationOptions() {
        return this._creationOptions;
      }
      /** @internal */
      get _shouldUseHighPrecisionShader() {
        return !!(this._caps.highPrecisionShaderSupported && this._highPrecisionShadersAllowed);
      }
      /**
       * Gets a boolean indicating that only power of 2 textures are supported
       * Please note that you can still use non power of 2 textures but in this case the engine will forcefully convert them
       */
      get needPOTTextures() {
        return this._webGLVersion < 2 || this.forcePOTTextures;
      }
      /**
       * Gets the list of current active render loop functions
       * @returns a read only array with the current render loop functions
       */
      get activeRenderLoops() {
        return this._activeRenderLoops;
      }
      /**
       * Gets or sets a boolean indicating if resources should be retained to be able to handle context lost events
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#handling-webgl-context-lost
       */
      get doNotHandleContextLost() {
        return this._doNotHandleContextLost;
      }
      set doNotHandleContextLost(value) {
        this._doNotHandleContextLost = value;
      }
      get _supportsHardwareTextureRescaling() {
        return false;
      }
      /**
       * sets the object from which width and height will be taken from when getting render width and height
       * Will fallback to the gl object
       * @param dimensions the framebuffer width and height that will be used.
       */
      set framebufferDimensionsObject(dimensions) {
        this._framebufferDimensionsObject = dimensions;
      }
      /**
       * Gets the current viewport
       */
      get currentViewport() {
        return this._cachedViewport;
      }
      /**
       * Gets the default empty texture
       */
      get emptyTexture() {
        if (!this._emptyTexture) {
          this._emptyTexture = this.createRawTexture(new Uint8Array(4), 1, 1, 5, false, false, 1);
        }
        return this._emptyTexture;
      }
      /**
       * Gets the default empty 3D texture
       */
      get emptyTexture3D() {
        if (!this._emptyTexture3D) {
          this._emptyTexture3D = this.createRawTexture3D(new Uint8Array(4), 1, 1, 1, 5, false, false, 1);
        }
        return this._emptyTexture3D;
      }
      /**
       * Gets the default empty 2D array texture
       */
      get emptyTexture2DArray() {
        if (!this._emptyTexture2DArray) {
          this._emptyTexture2DArray = this.createRawTexture2DArray(new Uint8Array(4), 1, 1, 1, 5, false, false, 1);
        }
        return this._emptyTexture2DArray;
      }
      /**
       * Gets the default empty cube texture
       */
      get emptyCubeTexture() {
        if (!this._emptyCubeTexture) {
          const faceData = new Uint8Array(4);
          const cubeData = [faceData, faceData, faceData, faceData, faceData, faceData];
          this._emptyCubeTexture = this.createRawCubeTexture(cubeData, 1, 5, 0, false, false, 1);
        }
        return this._emptyCubeTexture;
      }
      /**
       * Gets a boolean indicating if the engine runs in WebGPU or not.
       */
      get isWebGPU() {
        return this._isWebGPU;
      }
      /**
       * Gets the shader platform name used by the effects.
       */
      get shaderPlatformName() {
        return this._shaderPlatformName;
      }
      /**
       * Enables or disables the snapshot rendering mode
       * Note that the WebGL engine does not support snapshot rendering so setting the value won't have any effect for this engine
       */
      get snapshotRendering() {
        return false;
      }
      set snapshotRendering(activate) {
      }
      /**
       * Gets or sets the snapshot rendering mode
       */
      get snapshotRenderingMode() {
        return this._snapshotRenderingMode;
      }
      set snapshotRenderingMode(mode) {
        this._snapshotRenderingMode = mode;
      }
      /**
       * Creates a new snapshot at the next frame using the current snapshotRenderingMode
       */
      snapshotRenderingReset() {
        this.snapshotRendering = false;
      }
      static _CreateCanvas(width, height) {
        if (typeof document === "undefined") {
          return new OffscreenCanvas(width, height);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
      }
      /**
       * Create a canvas. This method is overridden by other engines
       * @param width width
       * @param height height
       * @returns ICanvas interface
       */
      createCanvas(width, height) {
        return _ThinEngine._CreateCanvas(width, height);
      }
      /**
       * Create an image to use with canvas
       * @returns IImage interface
       */
      createCanvasImage() {
        return document.createElement("img");
      }
      /**
       * Creates a new engine
       * @param canvasOrContext defines the canvas or WebGL context to use for rendering. If you provide a WebGL context, Babylon.js will not hook events on the canvas (like pointers, keyboards, etc...) so no event observables will be available. This is mostly used when Babylon.js is used as a plugin on a system which already used the WebGL context
       * @param antialias defines enable antialiasing (default: false)
       * @param options defines further options to be sent to the getContext() function
       * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
       */
      constructor(canvasOrContext, antialias, options, adaptToDeviceRatio) {
        var _a, _b;
        this._name = "WebGL";
        this._isDisposed = false;
        this.forcePOTTextures = false;
        this.isFullscreen = false;
        this.cullBackFaces = null;
        this.renderEvenInBackground = true;
        this.preventCacheWipeBetweenFrames = false;
        this.validateShaderPrograms = false;
        this._useReverseDepthBuffer = false;
        this.isNDCHalfZRange = false;
        this.hasOriginBottomLeft = true;
        this.disableUniformBuffers = false;
        this.onDisposeObservable = new Observable();
        this._frameId = 0;
        this._uniformBuffers = new Array();
        this._storageBuffers = new Array();
        this._webGLVersion = 1;
        this._windowIsBackground = false;
        this._highPrecisionShadersAllowed = true;
        this._badOS = false;
        this._badDesktopOS = false;
        this._activeRenderLoops = new Array();
        this.onContextLostObservable = new Observable();
        this.onContextRestoredObservable = new Observable();
        this._contextWasLost = false;
        this._doNotHandleContextLost = false;
        this.disableVertexArrayObjects = false;
        this._colorWrite = true;
        this._colorWriteChanged = true;
        this._depthCullingState = new DepthCullingState();
        this._stencilStateComposer = new StencilStateComposer();
        this._stencilState = new StencilState();
        this._alphaState = new AlphaState();
        this._alphaMode = 1;
        this._alphaEquation = 0;
        this._internalTexturesCache = new Array();
        this._renderTargetWrapperCache = new Array();
        this._activeChannel = 0;
        this._currentTextureChannel = -1;
        this._boundTexturesCache = {};
        this._compiledEffects = {};
        this._vertexAttribArraysEnabled = [];
        this._currentRenderTarget = null;
        this._uintIndicesCurrentlySet = false;
        this._currentBoundBuffer = new Array();
        this._currentFramebuffer = null;
        this._dummyFramebuffer = null;
        this._currentBufferPointers = new Array();
        this._currentInstanceLocations = new Array();
        this._currentInstanceBuffers = new Array();
        this._boundRenderFunction = () => this._renderLoop();
        this._vaoRecordInProgress = false;
        this._mustWipeVertexAttributes = false;
        this._frameHandler = 0;
        this._nextFreeTextureSlots = new Array();
        this._maxSimultaneousTextures = 0;
        this._maxMSAASamplesOverride = null;
        this._activeRequests = new Array();
        this.adaptToDeviceRatio = false;
        this._lastDevicePixelRatio = 1;
        this._transformTextureUrl = null;
        this.hostInformation = {
          isMobile: false
        };
        this.premultipliedAlpha = true;
        this.onBeforeTextureInitObservable = new Observable();
        this._isWebGPU = false;
        this._snapshotRenderingMode = 0;
        this._viewportCached = { x: 0, y: 0, z: 0, w: 0 };
        this._unpackFlipYCached = null;
        this.enableUnpackFlipYCached = true;
        this._boundUniforms = {};
        this.startTime = PrecisionDate.Now;
        let canvas = null;
        options = options || {};
        this._creationOptions = options;
        this.adaptToDeviceRatio = adaptToDeviceRatio ?? false;
        this._stencilStateComposer.stencilGlobal = this._stencilState;
        PerformanceConfigurator.SetMatrixPrecision(!!options.useHighPrecisionMatrix);
        options.antialias = antialias ?? options.antialias;
        options.deterministicLockstep = options.deterministicLockstep ?? false;
        options.lockstepMaxSteps = options.lockstepMaxSteps ?? 4;
        options.timeStep = options.timeStep ?? 1 / 60;
        options.audioEngine = options.audioEngine ?? true;
        options.stencil = options.stencil ?? true;
        this._audioContext = ((_a = options.audioEngineOptions) == null ? void 0 : _a.audioContext) ?? null;
        this._audioDestination = ((_b = options.audioEngineOptions) == null ? void 0 : _b.audioDestination) ?? null;
        this.premultipliedAlpha = options.premultipliedAlpha ?? true;
        this.useExactSrgbConversions = options.useExactSrgbConversions ?? false;
        this._doNotHandleContextLost = !!options.doNotHandleContextLost;
        this._isStencilEnable = options.stencil ? true : false;
        adaptToDeviceRatio = adaptToDeviceRatio || options.adaptToDeviceRatio || false;
        const devicePixelRatio = IsWindowObjectExist() ? window.devicePixelRatio || 1 : 1;
        const limitDeviceRatio = options.limitDeviceRatio || devicePixelRatio;
        this._hardwareScalingLevel = adaptToDeviceRatio ? 1 / Math.min(limitDeviceRatio, devicePixelRatio) : 1;
        this._lastDevicePixelRatio = devicePixelRatio;
        if (!canvasOrContext) {
          return;
        }
        if (canvasOrContext.getContext) {
          canvas = canvasOrContext;
          this._renderingCanvas = canvas;
          if (options.preserveDrawingBuffer === void 0) {
            options.preserveDrawingBuffer = false;
          }
          if (options.xrCompatible === void 0) {
            options.xrCompatible = true;
          }
          if (navigator && navigator.userAgent) {
            this._setupMobileChecks();
            const ua = navigator.userAgent;
            for (const exception of _ThinEngine.ExceptionList) {
              const key = exception.key;
              const targets = exception.targets;
              const check = new RegExp(key);
              if (check.test(ua)) {
                if (exception.capture && exception.captureConstraint) {
                  const capture = exception.capture;
                  const constraint = exception.captureConstraint;
                  const regex = new RegExp(capture);
                  const matches = regex.exec(ua);
                  if (matches && matches.length > 0) {
                    const capturedValue = parseInt(matches[matches.length - 1]);
                    if (capturedValue >= constraint) {
                      continue;
                    }
                  }
                }
                for (const target of targets) {
                  switch (target) {
                    case "uniformBuffer":
                      this.disableUniformBuffers = true;
                      break;
                    case "vao":
                      this.disableVertexArrayObjects = true;
                      break;
                    case "antialias":
                      options.antialias = false;
                      break;
                    case "maxMSAASamples":
                      this._maxMSAASamplesOverride = 1;
                      break;
                  }
                }
              }
            }
          }
          if (!this._doNotHandleContextLost) {
            this._onContextLost = (evt) => {
              evt.preventDefault();
              this._contextWasLost = true;
              Logger.Warn("WebGL context lost.");
              this.onContextLostObservable.notifyObservers(this);
            };
            this._onContextRestored = () => {
              this._restoreEngineAfterContextLost(() => this._initGLContext());
            };
            canvas.addEventListener("webglcontextlost", this._onContextLost, false);
            canvas.addEventListener("webglcontextrestored", this._onContextRestored, false);
            options.powerPreference = options.powerPreference || "high-performance";
          }
          this._badDesktopOS = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (this._badDesktopOS) {
            options.xrCompatible = false;
          }
          if (!options.disableWebGL2Support) {
            try {
              this._gl = canvas.getContext("webgl2", options) || canvas.getContext("experimental-webgl2", options);
              if (this._gl) {
                this._webGLVersion = 2;
                this._shaderPlatformName = "WEBGL2";
                if (!this._gl.deleteQuery) {
                  this._webGLVersion = 1;
                  this._shaderPlatformName = "WEBGL1";
                }
              }
            } catch (e) {
            }
          }
          if (!this._gl) {
            if (!canvas) {
              throw new Error("The provided canvas is null or undefined.");
            }
            try {
              this._gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
            } catch (e) {
              throw new Error("WebGL not supported");
            }
          }
          if (!this._gl) {
            throw new Error("WebGL not supported");
          }
        } else {
          this._gl = canvasOrContext;
          this._renderingCanvas = this._gl.canvas;
          if (this._gl.renderbufferStorageMultisample) {
            this._webGLVersion = 2;
            this._shaderPlatformName = "WEBGL2";
          } else {
            this._shaderPlatformName = "WEBGL1";
          }
          const attributes = this._gl.getContextAttributes();
          if (attributes) {
            options.stencil = attributes.stencil;
          }
        }
        this._gl.pixelStorei(this._gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, this._gl.NONE);
        if (options.useHighPrecisionFloats !== void 0) {
          this._highPrecisionShadersAllowed = options.useHighPrecisionFloats;
        }
        this.resize();
        this._initGLContext();
        this._initFeatures();
        for (let i = 0; i < this._caps.maxVertexAttribs; i++) {
          this._currentBufferPointers[i] = new BufferPointer();
        }
        this._shaderProcessor = this.webGLVersion > 1 ? new WebGL2ShaderProcessor() : new WebGLShaderProcessor();
        this._badOS = /iPad/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent);
        const versionToLog = `Babylon.js v${_ThinEngine.Version}`;
        Logger.Log(versionToLog + ` - ${this.description}`);
        if (this._renderingCanvas && this._renderingCanvas.setAttribute) {
          this._renderingCanvas.setAttribute("data-engine", versionToLog);
        }
      }
      _setupMobileChecks() {
        if (!(navigator && navigator.userAgent)) {
          return;
        }
        this._checkForMobile = () => {
          const currentUA = navigator.userAgent;
          this.hostInformation.isMobile = currentUA.indexOf("Mobile") !== -1 || // Needed for iOS 13+ detection on iPad (inspired by solution from https://stackoverflow.com/questions/9038625/detect-if-device-is-ios)
          currentUA.indexOf("Mac") !== -1 && IsDocumentAvailable() && "ontouchend" in document;
        };
        this._checkForMobile();
        if (IsWindowObjectExist()) {
          window.addEventListener("resize", this._checkForMobile);
        }
      }
      _clearEmptyResources() {
        this._dummyFramebuffer = null;
        this._emptyTexture = null;
        this._emptyCubeTexture = null;
        this._emptyTexture3D = null;
        this._emptyTexture2DArray = null;
      }
      _rebuildGraphicsResources() {
        var _a;
        this.wipeCaches(true);
        this._rebuildEffects();
        (_a = this._rebuildComputeEffects) == null ? void 0 : _a.call(this);
        this._rebuildBuffers();
        this._rebuildInternalTextures();
        this._rebuildTextures();
        this._rebuildRenderTargetWrappers();
        this.wipeCaches(true);
      }
      _flagContextRestored() {
        Logger.Warn(this.name + " context successfully restored.");
        this.onContextRestoredObservable.notifyObservers(this);
        this._contextWasLost = false;
      }
      _restoreEngineAfterContextLost(initEngine) {
        setTimeout(async () => {
          this._clearEmptyResources();
          const depthTest = this._depthCullingState.depthTest;
          const depthFunc = this._depthCullingState.depthFunc;
          const depthMask = this._depthCullingState.depthMask;
          const stencilTest = this._stencilState.stencilTest;
          await initEngine();
          this._rebuildGraphicsResources();
          this._depthCullingState.depthTest = depthTest;
          this._depthCullingState.depthFunc = depthFunc;
          this._depthCullingState.depthMask = depthMask;
          this._stencilState.stencilTest = stencilTest;
          this._flagContextRestored();
        }, 0);
      }
      /**
       * Shared initialization across engines types.
       * @param canvas The canvas associated with this instance of the engine.
       */
      _sharedInit(canvas) {
        this._renderingCanvas = canvas;
      }
      /**
       * @internal
       */
      _getShaderProcessingContext(shaderLanguage) {
        return null;
      }
      _rebuildInternalTextures() {
        const currentState = this._internalTexturesCache.slice();
        for (const internalTexture of currentState) {
          internalTexture._rebuild();
        }
      }
      _rebuildRenderTargetWrappers() {
        const currentState = this._renderTargetWrapperCache.slice();
        for (const renderTargetWrapper of currentState) {
          renderTargetWrapper._rebuild();
        }
      }
      _rebuildEffects() {
        for (const key in this._compiledEffects) {
          const effect = this._compiledEffects[key];
          effect._pipelineContext = null;
          effect._prepareEffect();
        }
        Effect.ResetCache();
      }
      /**
       * Gets a boolean indicating if all created effects are ready
       * @returns true if all effects are ready
       */
      areAllEffectsReady() {
        for (const key in this._compiledEffects) {
          const effect = this._compiledEffects[key];
          if (!effect.isReady()) {
            return false;
          }
        }
        return true;
      }
      _rebuildBuffers() {
        for (const uniformBuffer of this._uniformBuffers) {
          uniformBuffer._rebuildAfterContextLost();
        }
      }
      _rebuildTextures() {
      }
      _initGLContext() {
        this._caps = {
          maxTexturesImageUnits: this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS),
          maxCombinedTexturesImageUnits: this._gl.getParameter(this._gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
          maxVertexTextureImageUnits: this._gl.getParameter(this._gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
          maxTextureSize: this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE),
          maxSamples: this._webGLVersion > 1 ? this._gl.getParameter(this._gl.MAX_SAMPLES) : 1,
          maxCubemapTextureSize: this._gl.getParameter(this._gl.MAX_CUBE_MAP_TEXTURE_SIZE),
          maxRenderTextureSize: this._gl.getParameter(this._gl.MAX_RENDERBUFFER_SIZE),
          maxVertexAttribs: this._gl.getParameter(this._gl.MAX_VERTEX_ATTRIBS),
          maxVaryingVectors: this._gl.getParameter(this._gl.MAX_VARYING_VECTORS),
          maxFragmentUniformVectors: this._gl.getParameter(this._gl.MAX_FRAGMENT_UNIFORM_VECTORS),
          maxVertexUniformVectors: this._gl.getParameter(this._gl.MAX_VERTEX_UNIFORM_VECTORS),
          parallelShaderCompile: this._gl.getExtension("KHR_parallel_shader_compile") || void 0,
          standardDerivatives: this._webGLVersion > 1 || this._gl.getExtension("OES_standard_derivatives") !== null,
          maxAnisotropy: 1,
          astc: this._gl.getExtension("WEBGL_compressed_texture_astc") || this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_astc"),
          bptc: this._gl.getExtension("EXT_texture_compression_bptc") || this._gl.getExtension("WEBKIT_EXT_texture_compression_bptc"),
          s3tc: this._gl.getExtension("WEBGL_compressed_texture_s3tc") || this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"),
          // eslint-disable-next-line @typescript-eslint/naming-convention
          s3tc_srgb: this._gl.getExtension("WEBGL_compressed_texture_s3tc_srgb") || this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc_srgb"),
          pvrtc: this._gl.getExtension("WEBGL_compressed_texture_pvrtc") || this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
          etc1: this._gl.getExtension("WEBGL_compressed_texture_etc1") || this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc1"),
          etc2: this._gl.getExtension("WEBGL_compressed_texture_etc") || this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc") || this._gl.getExtension("WEBGL_compressed_texture_es3_0"),
          textureAnisotropicFilterExtension: this._gl.getExtension("EXT_texture_filter_anisotropic") || this._gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || this._gl.getExtension("MOZ_EXT_texture_filter_anisotropic"),
          uintIndices: this._webGLVersion > 1 || this._gl.getExtension("OES_element_index_uint") !== null,
          fragmentDepthSupported: this._webGLVersion > 1 || this._gl.getExtension("EXT_frag_depth") !== null,
          highPrecisionShaderSupported: false,
          timerQuery: this._gl.getExtension("EXT_disjoint_timer_query_webgl2") || this._gl.getExtension("EXT_disjoint_timer_query"),
          supportOcclusionQuery: this._webGLVersion > 1,
          canUseTimestampForTimerQuery: false,
          drawBuffersExtension: false,
          maxMSAASamples: 1,
          colorBufferFloat: !!(this._webGLVersion > 1 && this._gl.getExtension("EXT_color_buffer_float")),
          supportFloatTexturesResolve: false,
          rg11b10ufColorRenderable: false,
          colorBufferHalfFloat: !!(this._webGLVersion > 1 && this._gl.getExtension("EXT_color_buffer_half_float")),
          textureFloat: this._webGLVersion > 1 || this._gl.getExtension("OES_texture_float") ? true : false,
          textureHalfFloat: this._webGLVersion > 1 || this._gl.getExtension("OES_texture_half_float") ? true : false,
          textureHalfFloatRender: false,
          textureFloatLinearFiltering: false,
          textureFloatRender: false,
          textureHalfFloatLinearFiltering: false,
          vertexArrayObject: false,
          instancedArrays: false,
          textureLOD: this._webGLVersion > 1 || this._gl.getExtension("EXT_shader_texture_lod") ? true : false,
          texelFetch: this._webGLVersion !== 1,
          blendMinMax: false,
          multiview: this._gl.getExtension("OVR_multiview2"),
          oculusMultiview: this._gl.getExtension("OCULUS_multiview"),
          depthTextureExtension: false,
          canUseGLInstanceID: this._webGLVersion > 1,
          canUseGLVertexID: this._webGLVersion > 1,
          supportComputeShaders: false,
          supportSRGBBuffers: false,
          supportTransformFeedbacks: this._webGLVersion > 1,
          textureMaxLevel: this._webGLVersion > 1,
          texture2DArrayMaxLayerCount: this._webGLVersion > 1 ? this._gl.getParameter(this._gl.MAX_ARRAY_TEXTURE_LAYERS) : 128,
          disableMorphTargetTexture: false
        };
        this._caps.supportFloatTexturesResolve = this._caps.colorBufferFloat;
        this._caps.rg11b10ufColorRenderable = this._caps.colorBufferFloat;
        this._glVersion = this._gl.getParameter(this._gl.VERSION);
        const rendererInfo = this._gl.getExtension("WEBGL_debug_renderer_info");
        if (rendererInfo != null) {
          this._glRenderer = this._gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL);
          this._glVendor = this._gl.getParameter(rendererInfo.UNMASKED_VENDOR_WEBGL);
        }
        if (!this._glVendor) {
          this._glVendor = this._gl.getParameter(this._gl.VENDOR) || "Unknown vendor";
        }
        if (!this._glRenderer) {
          this._glRenderer = this._gl.getParameter(this._gl.RENDERER) || "Unknown renderer";
        }
        if (this._gl.HALF_FLOAT_OES !== 36193) {
          this._gl.HALF_FLOAT_OES = 36193;
        }
        if (this._gl.RGBA16F !== 34842) {
          this._gl.RGBA16F = 34842;
        }
        if (this._gl.RGBA32F !== 34836) {
          this._gl.RGBA32F = 34836;
        }
        if (this._gl.DEPTH24_STENCIL8 !== 35056) {
          this._gl.DEPTH24_STENCIL8 = 35056;
        }
        if (this._caps.timerQuery) {
          if (this._webGLVersion === 1) {
            this._gl.getQuery = this._caps.timerQuery.getQueryEXT.bind(this._caps.timerQuery);
          }
          this._caps.canUseTimestampForTimerQuery = (this._gl.getQuery(this._caps.timerQuery.TIMESTAMP_EXT, this._caps.timerQuery.QUERY_COUNTER_BITS_EXT) ?? 0) > 0;
        }
        this._caps.maxAnisotropy = this._caps.textureAnisotropicFilterExtension ? this._gl.getParameter(this._caps.textureAnisotropicFilterExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
        this._caps.textureFloatLinearFiltering = this._caps.textureFloat && this._gl.getExtension("OES_texture_float_linear") ? true : false;
        this._caps.textureFloatRender = this._caps.textureFloat && this._canRenderToFloatFramebuffer() ? true : false;
        this._caps.textureHalfFloatLinearFiltering = this._webGLVersion > 1 || this._caps.textureHalfFloat && this._gl.getExtension("OES_texture_half_float_linear") ? true : false;
        if (this._caps.astc) {
          this._gl.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR = this._caps.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
        }
        if (this._caps.bptc) {
          this._gl.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT = this._caps.bptc.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT;
        }
        if (this._caps.s3tc_srgb) {
          this._gl.COMPRESSED_SRGB_S3TC_DXT1_EXT = this._caps.s3tc_srgb.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          this._gl.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = this._caps.s3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          this._gl.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = this._caps.s3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        }
        if (this._caps.etc2) {
          this._gl.COMPRESSED_SRGB8_ETC2 = this._caps.etc2.COMPRESSED_SRGB8_ETC2;
          this._gl.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = this._caps.etc2.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
        }
        if (this._webGLVersion > 1) {
          if (this._gl.HALF_FLOAT_OES !== 5131) {
            this._gl.HALF_FLOAT_OES = 5131;
          }
        }
        this._caps.textureHalfFloatRender = this._caps.textureHalfFloat && this._canRenderToHalfFloatFramebuffer();
        if (this._webGLVersion > 1) {
          this._caps.drawBuffersExtension = true;
          this._caps.maxMSAASamples = this._maxMSAASamplesOverride !== null ? this._maxMSAASamplesOverride : this._gl.getParameter(this._gl.MAX_SAMPLES);
        } else {
          const drawBuffersExtension = this._gl.getExtension("WEBGL_draw_buffers");
          if (drawBuffersExtension !== null) {
            this._caps.drawBuffersExtension = true;
            this._gl.drawBuffers = drawBuffersExtension.drawBuffersWEBGL.bind(drawBuffersExtension);
            this._gl.DRAW_FRAMEBUFFER = this._gl.FRAMEBUFFER;
            for (let i = 0; i < 16; i++) {
              this._gl["COLOR_ATTACHMENT" + i + "_WEBGL"] = drawBuffersExtension["COLOR_ATTACHMENT" + i + "_WEBGL"];
            }
          }
        }
        if (this._webGLVersion > 1) {
          this._caps.depthTextureExtension = true;
        } else {
          const depthTextureExtension = this._gl.getExtension("WEBGL_depth_texture");
          if (depthTextureExtension != null) {
            this._caps.depthTextureExtension = true;
            this._gl.UNSIGNED_INT_24_8 = depthTextureExtension.UNSIGNED_INT_24_8_WEBGL;
          }
        }
        if (this.disableVertexArrayObjects) {
          this._caps.vertexArrayObject = false;
        } else if (this._webGLVersion > 1) {
          this._caps.vertexArrayObject = true;
        } else {
          const vertexArrayObjectExtension = this._gl.getExtension("OES_vertex_array_object");
          if (vertexArrayObjectExtension != null) {
            this._caps.vertexArrayObject = true;
            this._gl.createVertexArray = vertexArrayObjectExtension.createVertexArrayOES.bind(vertexArrayObjectExtension);
            this._gl.bindVertexArray = vertexArrayObjectExtension.bindVertexArrayOES.bind(vertexArrayObjectExtension);
            this._gl.deleteVertexArray = vertexArrayObjectExtension.deleteVertexArrayOES.bind(vertexArrayObjectExtension);
          }
        }
        if (this._webGLVersion > 1) {
          this._caps.instancedArrays = true;
        } else {
          const instanceExtension = this._gl.getExtension("ANGLE_instanced_arrays");
          if (instanceExtension != null) {
            this._caps.instancedArrays = true;
            this._gl.drawArraysInstanced = instanceExtension.drawArraysInstancedANGLE.bind(instanceExtension);
            this._gl.drawElementsInstanced = instanceExtension.drawElementsInstancedANGLE.bind(instanceExtension);
            this._gl.vertexAttribDivisor = instanceExtension.vertexAttribDivisorANGLE.bind(instanceExtension);
          } else {
            this._caps.instancedArrays = false;
          }
        }
        if (this._gl.getShaderPrecisionFormat) {
          const vertexhighp = this._gl.getShaderPrecisionFormat(this._gl.VERTEX_SHADER, this._gl.HIGH_FLOAT);
          const fragmenthighp = this._gl.getShaderPrecisionFormat(this._gl.FRAGMENT_SHADER, this._gl.HIGH_FLOAT);
          if (vertexhighp && fragmenthighp) {
            this._caps.highPrecisionShaderSupported = vertexhighp.precision !== 0 && fragmenthighp.precision !== 0;
          }
        }
        if (this._webGLVersion > 1) {
          this._caps.blendMinMax = true;
        } else {
          const blendMinMaxExtension = this._gl.getExtension("EXT_blend_minmax");
          if (blendMinMaxExtension != null) {
            this._caps.blendMinMax = true;
            this._gl.MAX = blendMinMaxExtension.MAX_EXT;
            this._gl.MIN = blendMinMaxExtension.MIN_EXT;
          }
        }
        if (!this._caps.supportSRGBBuffers) {
          if (this._webGLVersion > 1) {
            this._caps.supportSRGBBuffers = true;
            this._glSRGBExtensionValues = {
              SRGB: WebGL2RenderingContext.SRGB,
              SRGB8: WebGL2RenderingContext.SRGB8,
              SRGB8_ALPHA8: WebGL2RenderingContext.SRGB8_ALPHA8
            };
          } else {
            const sRGBExtension = this._gl.getExtension("EXT_sRGB");
            if (sRGBExtension != null) {
              this._caps.supportSRGBBuffers = true;
              this._glSRGBExtensionValues = {
                SRGB: sRGBExtension.SRGB_EXT,
                SRGB8: sRGBExtension.SRGB_ALPHA_EXT,
                SRGB8_ALPHA8: sRGBExtension.SRGB_ALPHA_EXT
              };
            }
          }
          this._caps.supportSRGBBuffers = this._caps.supportSRGBBuffers && !!(this._creationOptions && this._creationOptions.forceSRGBBufferSupportState);
        }
        this._depthCullingState.depthTest = true;
        this._depthCullingState.depthFunc = this._gl.LEQUAL;
        this._depthCullingState.depthMask = true;
        this._maxSimultaneousTextures = this._caps.maxCombinedTexturesImageUnits;
        for (let slot = 0; slot < this._maxSimultaneousTextures; slot++) {
          this._nextFreeTextureSlots.push(slot);
        }
        if (this._glRenderer === "Mali-G72") {
          this._caps.disableMorphTargetTexture = true;
        }
      }
      _initFeatures() {
        this._features = {
          forceBitmapOverHTMLImageElement: typeof HTMLImageElement === "undefined",
          supportRenderAndCopyToLodForFloatTextures: this._webGLVersion !== 1,
          supportDepthStencilTexture: this._webGLVersion !== 1,
          supportShadowSamplers: this._webGLVersion !== 1,
          uniformBufferHardCheckMatrix: false,
          allowTexturePrefiltering: this._webGLVersion !== 1,
          trackUbosInFrame: false,
          checkUbosContentBeforeUpload: false,
          supportCSM: this._webGLVersion !== 1,
          basisNeedsPOT: this._webGLVersion === 1,
          support3DTextures: this._webGLVersion !== 1,
          needTypeSuffixInShaderConstants: this._webGLVersion !== 1,
          supportMSAA: this._webGLVersion !== 1,
          supportSSAO2: this._webGLVersion !== 1,
          supportExtendedTextureFormats: this._webGLVersion !== 1,
          supportSwitchCaseInShader: this._webGLVersion !== 1,
          supportSyncTextureRead: true,
          needsInvertingBitmap: true,
          useUBOBindingCache: true,
          needShaderCodeInlining: false,
          needToAlwaysBindUniformBuffers: false,
          supportRenderPasses: false,
          supportSpriteInstancing: true,
          forceVertexBufferStrideAndOffsetMultiple4Bytes: false,
          _collectUbosUpdatedInFrame: false
        };
      }
      /**
       * Gets version of the current webGL context
       * Keep it for back compat - use version instead
       */
      get webGLVersion() {
        return this._webGLVersion;
      }
      /**
       * Gets a string identifying the name of the class
       * @returns "Engine" string
       */
      getClassName() {
        return "ThinEngine";
      }
      /**
       * Returns true if the stencil buffer has been enabled through the creation option of the context.
       */
      get isStencilEnable() {
        return this._isStencilEnable;
      }
      /** @internal */
      _prepareWorkingCanvas() {
        if (this._workingCanvas) {
          return;
        }
        this._workingCanvas = this.createCanvas(1, 1);
        const context = this._workingCanvas.getContext("2d");
        if (context) {
          this._workingContext = context;
        }
      }
      /**
       * Reset the texture cache to empty state
       */
      resetTextureCache() {
        for (const key in this._boundTexturesCache) {
          if (!Object.prototype.hasOwnProperty.call(this._boundTexturesCache, key)) {
            continue;
          }
          this._boundTexturesCache[key] = null;
        }
        this._currentTextureChannel = -1;
      }
      /**
       * Gets an object containing information about the current engine context
       * @returns an object containing the vendor, the renderer and the version of the current engine context
       */
      getInfo() {
        return this.getGlInfo();
      }
      /**
       * Gets an object containing information about the current webGL context
       * @returns an object containing the vendor, the renderer and the version of the current webGL context
       */
      getGlInfo() {
        return {
          vendor: this._glVendor,
          renderer: this._glRenderer,
          version: this._glVersion
        };
      }
      /**
       * Defines the hardware scaling level.
       * By default the hardware scaling level is computed from the window device ratio.
       * if level = 1 then the engine will render at the exact resolution of the canvas. If level = 0.5 then the engine will render at twice the size of the canvas.
       * @param level defines the level to use
       */
      setHardwareScalingLevel(level) {
        this._hardwareScalingLevel = level;
        this.resize();
      }
      /**
       * Gets the current hardware scaling level.
       * By default the hardware scaling level is computed from the window device ratio.
       * if level = 1 then the engine will render at the exact resolution of the canvas. If level = 0.5 then the engine will render at twice the size of the canvas.
       * @returns a number indicating the current hardware scaling level
       */
      getHardwareScalingLevel() {
        return this._hardwareScalingLevel;
      }
      /**
       * Gets the list of loaded textures
       * @returns an array containing all loaded textures
       */
      getLoadedTexturesCache() {
        return this._internalTexturesCache;
      }
      /**
       * Gets the object containing all engine capabilities
       * @returns the EngineCapabilities object
       */
      getCaps() {
        return this._caps;
      }
      /**
       * stop executing a render loop function and remove it from the execution array
       * @param renderFunction defines the function to be removed. If not provided all functions will be removed.
       */
      stopRenderLoop(renderFunction) {
        if (!renderFunction) {
          this._activeRenderLoops.length = 0;
          this._cancelFrame();
          return;
        }
        const index = this._activeRenderLoops.indexOf(renderFunction);
        if (index >= 0) {
          this._activeRenderLoops.splice(index, 1);
          if (this._activeRenderLoops.length == 0) {
            this._cancelFrame();
          }
        }
      }
      _cancelFrame() {
        if (this._frameHandler !== 0) {
          const handlerToCancel = this._frameHandler;
          this._frameHandler = 0;
          if (!IsWindowObjectExist()) {
            if (typeof cancelAnimationFrame === "function") {
              return cancelAnimationFrame(handlerToCancel);
            }
          } else {
            const { cancelAnimationFrame: cancelAnimationFrame2 } = this.getHostWindow() || window;
            if (typeof cancelAnimationFrame2 === "function") {
              return cancelAnimationFrame2(handlerToCancel);
            }
          }
          return clearTimeout(handlerToCancel);
        }
      }
      /** @internal */
      _renderLoop() {
        this._frameHandler = 0;
        if (!this._contextWasLost) {
          let shouldRender = true;
          if (this._isDisposed || !this.renderEvenInBackground && this._windowIsBackground) {
            shouldRender = false;
          }
          if (shouldRender) {
            this.beginFrame();
            for (let index = 0; index < this._activeRenderLoops.length; index++) {
              const renderFunction = this._activeRenderLoops[index];
              renderFunction();
            }
            this.endFrame();
          }
        }
        if (this._frameHandler === 0) {
          this._frameHandler = this._queueNewFrame(this._boundRenderFunction, this.getHostWindow());
        }
      }
      /**
       * Gets the HTML canvas attached with the current webGL context
       * @returns a HTML canvas
       */
      getRenderingCanvas() {
        return this._renderingCanvas;
      }
      /**
       * Gets the audio context specified in engine initialization options
       * @returns an Audio Context
       */
      getAudioContext() {
        return this._audioContext;
      }
      /**
       * Gets the audio destination specified in engine initialization options
       * @returns an audio destination node
       */
      getAudioDestination() {
        return this._audioDestination;
      }
      /**
       * Gets host window
       * @returns the host window object
       */
      getHostWindow() {
        if (!IsWindowObjectExist()) {
          return null;
        }
        if (this._renderingCanvas && this._renderingCanvas.ownerDocument && this._renderingCanvas.ownerDocument.defaultView) {
          return this._renderingCanvas.ownerDocument.defaultView;
        }
        return window;
      }
      /**
       * Gets the current render width
       * @param useScreen defines if screen size must be used (or the current render target if any)
       * @returns a number defining the current render width
       */
      getRenderWidth(useScreen = false) {
        if (!useScreen && this._currentRenderTarget) {
          return this._currentRenderTarget.width;
        }
        return this._framebufferDimensionsObject ? this._framebufferDimensionsObject.framebufferWidth : this._gl.drawingBufferWidth;
      }
      /**
       * Gets the current render height
       * @param useScreen defines if screen size must be used (or the current render target if any)
       * @returns a number defining the current render height
       */
      getRenderHeight(useScreen = false) {
        if (!useScreen && this._currentRenderTarget) {
          return this._currentRenderTarget.height;
        }
        return this._framebufferDimensionsObject ? this._framebufferDimensionsObject.framebufferHeight : this._gl.drawingBufferHeight;
      }
      /**
       * Can be used to override the current requestAnimationFrame requester.
       * @internal
       */
      _queueNewFrame(bindedRenderFunction, requester) {
        return _ThinEngine.QueueNewFrame(bindedRenderFunction, requester);
      }
      /**
       * Register and execute a render loop. The engine can have more than one render function
       * @param renderFunction defines the function to continuously execute
       */
      runRenderLoop(renderFunction) {
        if (this._activeRenderLoops.indexOf(renderFunction) !== -1) {
          return;
        }
        this._activeRenderLoops.push(renderFunction);
        if (this._activeRenderLoops.length === 1 && this._frameHandler === 0) {
          this._frameHandler = this._queueNewFrame(this._boundRenderFunction, this.getHostWindow());
        }
      }
      /**
       * Clear the current render buffer or the current render target (if any is set up)
       * @param color defines the color to use
       * @param backBuffer defines if the back buffer must be cleared
       * @param depth defines if the depth buffer must be cleared
       * @param stencil defines if the stencil buffer must be cleared
       */
      clear(color, backBuffer, depth, stencil = false) {
        var _a, _b;
        const useStencilGlobalOnly = this.stencilStateComposer.useStencilGlobalOnly;
        this.stencilStateComposer.useStencilGlobalOnly = true;
        this.applyStates();
        this.stencilStateComposer.useStencilGlobalOnly = useStencilGlobalOnly;
        let mode = 0;
        if (backBuffer && color) {
          let setBackBufferColor = true;
          if (this._currentRenderTarget) {
            const textureFormat = (_a = this._currentRenderTarget.texture) == null ? void 0 : _a.format;
            if (textureFormat === 8 || textureFormat === 9 || textureFormat === 10 || textureFormat === 11) {
              const textureType = (_b = this._currentRenderTarget.texture) == null ? void 0 : _b.type;
              if (textureType === 7 || textureType === 5) {
                _ThinEngine._TempClearColorUint32[0] = color.r * 255;
                _ThinEngine._TempClearColorUint32[1] = color.g * 255;
                _ThinEngine._TempClearColorUint32[2] = color.b * 255;
                _ThinEngine._TempClearColorUint32[3] = color.a * 255;
                this._gl.clearBufferuiv(this._gl.COLOR, 0, _ThinEngine._TempClearColorUint32);
                setBackBufferColor = false;
              } else {
                _ThinEngine._TempClearColorInt32[0] = color.r * 255;
                _ThinEngine._TempClearColorInt32[1] = color.g * 255;
                _ThinEngine._TempClearColorInt32[2] = color.b * 255;
                _ThinEngine._TempClearColorInt32[3] = color.a * 255;
                this._gl.clearBufferiv(this._gl.COLOR, 0, _ThinEngine._TempClearColorInt32);
                setBackBufferColor = false;
              }
            }
          }
          if (setBackBufferColor) {
            this._gl.clearColor(color.r, color.g, color.b, color.a !== void 0 ? color.a : 1);
            mode |= this._gl.COLOR_BUFFER_BIT;
          }
        }
        if (depth) {
          if (this.useReverseDepthBuffer) {
            this._depthCullingState.depthFunc = this._gl.GEQUAL;
            this._gl.clearDepth(0);
          } else {
            this._gl.clearDepth(1);
          }
          mode |= this._gl.DEPTH_BUFFER_BIT;
        }
        if (stencil) {
          this._gl.clearStencil(0);
          mode |= this._gl.STENCIL_BUFFER_BIT;
        }
        this._gl.clear(mode);
      }
      /**
       * @internal
       */
      _viewport(x, y, width, height) {
        if (x !== this._viewportCached.x || y !== this._viewportCached.y || width !== this._viewportCached.z || height !== this._viewportCached.w) {
          this._viewportCached.x = x;
          this._viewportCached.y = y;
          this._viewportCached.z = width;
          this._viewportCached.w = height;
          this._gl.viewport(x, y, width, height);
        }
      }
      /**
       * Set the WebGL's viewport
       * @param viewport defines the viewport element to be used
       * @param requiredWidth defines the width required for rendering. If not provided the rendering canvas' width is used
       * @param requiredHeight defines the height required for rendering. If not provided the rendering canvas' height is used
       */
      setViewport(viewport, requiredWidth, requiredHeight) {
        const width = requiredWidth || this.getRenderWidth();
        const height = requiredHeight || this.getRenderHeight();
        const x = viewport.x || 0;
        const y = viewport.y || 0;
        this._cachedViewport = viewport;
        this._viewport(x * width, y * height, width * viewport.width, height * viewport.height);
      }
      /**
       * Begin a new frame
       */
      beginFrame() {
      }
      /**
       * Enf the current frame
       */
      endFrame() {
        if (this._badOS) {
          this.flushFramebuffer();
        }
        this._frameId++;
      }
      /**
       * Resize the view according to the canvas' size
       * @param forceSetSize true to force setting the sizes of the underlying canvas
       */
      resize(forceSetSize = false) {
        let width;
        let height;
        if (this.adaptToDeviceRatio) {
          const devicePixelRatio = IsWindowObjectExist() ? window.devicePixelRatio || 1 : 1;
          const changeRatio = this._lastDevicePixelRatio / devicePixelRatio;
          this._lastDevicePixelRatio = devicePixelRatio;
          this._hardwareScalingLevel *= changeRatio;
        }
        if (IsWindowObjectExist() && IsDocumentAvailable()) {
          if (this._renderingCanvas) {
            const boundingRect = this._renderingCanvas.getBoundingClientRect ? this._renderingCanvas.getBoundingClientRect() : {
              // fallback to last solution in case the function doesn't exist
              width: this._renderingCanvas.width * this._hardwareScalingLevel,
              height: this._renderingCanvas.height * this._hardwareScalingLevel
            };
            width = this._renderingCanvas.clientWidth || boundingRect.width || this._renderingCanvas.width || 100;
            height = this._renderingCanvas.clientHeight || boundingRect.height || this._renderingCanvas.height || 100;
          } else {
            width = window.innerWidth;
            height = window.innerHeight;
          }
        } else {
          width = this._renderingCanvas ? this._renderingCanvas.width : 100;
          height = this._renderingCanvas ? this._renderingCanvas.height : 100;
        }
        this.setSize(width / this._hardwareScalingLevel, height / this._hardwareScalingLevel, forceSetSize);
      }
      /**
       * Force a specific size of the canvas
       * @param width defines the new canvas' width
       * @param height defines the new canvas' height
       * @param forceSetSize true to force setting the sizes of the underlying canvas
       * @returns true if the size was changed
       */
      setSize(width, height, forceSetSize = false) {
        if (!this._renderingCanvas) {
          return false;
        }
        width = width | 0;
        height = height | 0;
        if (!forceSetSize && this._renderingCanvas.width === width && this._renderingCanvas.height === height) {
          return false;
        }
        this._renderingCanvas.width = width;
        this._renderingCanvas.height = height;
        return true;
      }
      /**
       * Binds the frame buffer to the specified texture.
       * @param rtWrapper The render target wrapper to render to
       * @param faceIndex The face of the texture to render to in case of cube texture and if the render target wrapper is not a multi render target
       * @param requiredWidth The width of the target to render to
       * @param requiredHeight The height of the target to render to
       * @param forceFullscreenViewport Forces the viewport to be the entire texture/screen if true
       * @param lodLevel Defines the lod level to bind to the frame buffer
       * @param layer Defines the 2d array index to bind to the frame buffer if the render target wrapper is not a multi render target
       */
      bindFramebuffer(rtWrapper, faceIndex = 0, requiredWidth, requiredHeight, forceFullscreenViewport, lodLevel = 0, layer = 0) {
        var _a, _b, _c, _d, _e, _f;
        const webglRTWrapper = rtWrapper;
        if (this._currentRenderTarget) {
          this.unBindFramebuffer(this._currentRenderTarget);
        }
        this._currentRenderTarget = rtWrapper;
        this._bindUnboundFramebuffer(webglRTWrapper._MSAAFramebuffer ? webglRTWrapper._MSAAFramebuffer : webglRTWrapper._framebuffer);
        const gl = this._gl;
        if (!rtWrapper.isMulti) {
          if (rtWrapper.is2DArray) {
            gl.framebufferTextureLayer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, (_a = rtWrapper.texture._hardwareTexture) == null ? void 0 : _a.underlyingResource, lodLevel, layer);
          } else if (rtWrapper.isCube) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, (_b = rtWrapper.texture._hardwareTexture) == null ? void 0 : _b.underlyingResource, lodLevel);
          } else if (webglRTWrapper._currentLOD !== lodLevel) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, (_c = rtWrapper.texture._hardwareTexture) == null ? void 0 : _c.underlyingResource, lodLevel);
            webglRTWrapper._currentLOD = lodLevel;
          }
        }
        const depthStencilTexture = rtWrapper._depthStencilTexture;
        if (depthStencilTexture) {
          const attachment = rtWrapper._depthStencilTextureWithStencil ? gl.DEPTH_STENCIL_ATTACHMENT : gl.DEPTH_ATTACHMENT;
          if (rtWrapper.is2DArray) {
            gl.framebufferTextureLayer(gl.FRAMEBUFFER, attachment, (_d = depthStencilTexture._hardwareTexture) == null ? void 0 : _d.underlyingResource, lodLevel, layer);
          } else if (rtWrapper.isCube) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, (_e = depthStencilTexture._hardwareTexture) == null ? void 0 : _e.underlyingResource, lodLevel);
          } else {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, (_f = depthStencilTexture._hardwareTexture) == null ? void 0 : _f.underlyingResource, lodLevel);
          }
        }
        if (this._cachedViewport && !forceFullscreenViewport) {
          this.setViewport(this._cachedViewport, requiredWidth, requiredHeight);
        } else {
          if (!requiredWidth) {
            requiredWidth = rtWrapper.width;
            if (lodLevel) {
              requiredWidth = requiredWidth / Math.pow(2, lodLevel);
            }
          }
          if (!requiredHeight) {
            requiredHeight = rtWrapper.height;
            if (lodLevel) {
              requiredHeight = requiredHeight / Math.pow(2, lodLevel);
            }
          }
          this._viewport(0, 0, requiredWidth, requiredHeight);
        }
        this.wipeCaches();
      }
      /**
       * Set various states to the webGL context
       * @param culling defines culling state: true to enable culling, false to disable it
       * @param zOffset defines the value to apply to zOffset (0 by default)
       * @param force defines if states must be applied even if cache is up to date
       * @param reverseSide defines if culling must be reversed (CCW if false, CW if true)
       * @param cullBackFaces true to cull back faces, false to cull front faces (if culling is enabled)
       * @param stencil stencil states to set
       * @param zOffsetUnits defines the value to apply to zOffsetUnits (0 by default)
       */
      setState(culling, zOffset = 0, force, reverseSide = false, cullBackFaces, stencil, zOffsetUnits = 0) {
        if (this._depthCullingState.cull !== culling || force) {
          this._depthCullingState.cull = culling;
        }
        const cullFace = this.cullBackFaces ?? cullBackFaces ?? true ? this._gl.BACK : this._gl.FRONT;
        if (this._depthCullingState.cullFace !== cullFace || force) {
          this._depthCullingState.cullFace = cullFace;
        }
        this.setZOffset(zOffset);
        this.setZOffsetUnits(zOffsetUnits);
        const frontFace = reverseSide ? this._gl.CW : this._gl.CCW;
        if (this._depthCullingState.frontFace !== frontFace || force) {
          this._depthCullingState.frontFace = frontFace;
        }
        this._stencilStateComposer.stencilMaterial = stencil;
      }
      /**
       * Gets a boolean indicating if depth testing is enabled
       * @returns the current state
       */
      getDepthBuffer() {
        return this._depthCullingState.depthTest;
      }
      /**
       * Enable or disable depth buffering
       * @param enable defines the state to set
       */
      setDepthBuffer(enable) {
        this._depthCullingState.depthTest = enable;
      }
      /**
       * Set the z offset Factor to apply to current rendering
       * @param value defines the offset to apply
       */
      setZOffset(value) {
        this._depthCullingState.zOffset = this.useReverseDepthBuffer ? -value : value;
      }
      /**
       * Gets the current value of the zOffset Factor
       * @returns the current zOffset Factor state
       */
      getZOffset() {
        const zOffset = this._depthCullingState.zOffset;
        return this.useReverseDepthBuffer ? -zOffset : zOffset;
      }
      /**
       * Set the z offset Units to apply to current rendering
       * @param value defines the offset to apply
       */
      setZOffsetUnits(value) {
        this._depthCullingState.zOffsetUnits = this.useReverseDepthBuffer ? -value : value;
      }
      /**
       * Gets the current value of the zOffset Units
       * @returns the current zOffset Units state
       */
      getZOffsetUnits() {
        const zOffsetUnits = this._depthCullingState.zOffsetUnits;
        return this.useReverseDepthBuffer ? -zOffsetUnits : zOffsetUnits;
      }
      /**
       * @internal
       */
      _bindUnboundFramebuffer(framebuffer) {
        if (this._currentFramebuffer !== framebuffer) {
          this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
          this._currentFramebuffer = framebuffer;
        }
      }
      /** @internal */
      _currentFrameBufferIsDefaultFrameBuffer() {
        return this._currentFramebuffer === null;
      }
      /**
       * Generates the mipmaps for a texture
       * @param texture texture to generate the mipmaps for
       */
      generateMipmaps(texture) {
        this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true);
        this._gl.generateMipmap(this._gl.TEXTURE_2D);
        this._bindTextureDirectly(this._gl.TEXTURE_2D, null);
      }
      /**
       * Unbind the current render target texture from the webGL context
       * @param texture defines the render target wrapper to unbind
       * @param disableGenerateMipMaps defines a boolean indicating that mipmaps must not be generated
       * @param onBeforeUnbind defines a function which will be called before the effective unbind
       */
      unBindFramebuffer(texture, disableGenerateMipMaps = false, onBeforeUnbind) {
        var _a;
        const webglRTWrapper = texture;
        this._currentRenderTarget = null;
        const gl = this._gl;
        if (webglRTWrapper._MSAAFramebuffer) {
          if (texture.isMulti) {
            this.unBindMultiColorAttachmentFramebuffer(texture, disableGenerateMipMaps, onBeforeUnbind);
            return;
          }
          gl.bindFramebuffer(gl.READ_FRAMEBUFFER, webglRTWrapper._MSAAFramebuffer);
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, webglRTWrapper._framebuffer);
          gl.blitFramebuffer(0, 0, texture.width, texture.height, 0, 0, texture.width, texture.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        }
        if (((_a = texture.texture) == null ? void 0 : _a.generateMipMaps) && !disableGenerateMipMaps && !texture.isCube) {
          this.generateMipmaps(texture.texture);
        }
        if (onBeforeUnbind) {
          if (webglRTWrapper._MSAAFramebuffer) {
            this._bindUnboundFramebuffer(webglRTWrapper._framebuffer);
          }
          onBeforeUnbind();
        }
        this._bindUnboundFramebuffer(null);
      }
      /**
       * Force a webGL flush (ie. a flush of all waiting webGL commands)
       */
      flushFramebuffer() {
        this._gl.flush();
      }
      /**
       * Unbind the current render target and bind the default framebuffer
       */
      restoreDefaultFramebuffer() {
        if (this._currentRenderTarget) {
          this.unBindFramebuffer(this._currentRenderTarget);
        } else {
          this._bindUnboundFramebuffer(null);
        }
        if (this._cachedViewport) {
          this.setViewport(this._cachedViewport);
        }
        this.wipeCaches();
      }
      // VBOs
      /** @internal */
      _resetVertexBufferBinding() {
        this.bindArrayBuffer(null);
        this._cachedVertexBuffers = null;
      }
      /**
       * Creates a vertex buffer
       * @param data the data or size for the vertex buffer
       * @param _updatable whether the buffer should be created as updatable
       * @param _label defines the label of the buffer (for debug purpose)
       * @returns the new WebGL static buffer
       */
      createVertexBuffer(data, _updatable, _label) {
        return this._createVertexBuffer(data, this._gl.STATIC_DRAW);
      }
      _createVertexBuffer(data, usage) {
        const vbo = this._gl.createBuffer();
        if (!vbo) {
          throw new Error("Unable to create vertex buffer");
        }
        const dataBuffer = new WebGLDataBuffer(vbo);
        this.bindArrayBuffer(dataBuffer);
        if (typeof data !== "number") {
          if (data instanceof Array) {
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(data), usage);
            dataBuffer.capacity = data.length * 4;
          } else {
            this._gl.bufferData(this._gl.ARRAY_BUFFER, data, usage);
            dataBuffer.capacity = data.byteLength;
          }
        } else {
          this._gl.bufferData(this._gl.ARRAY_BUFFER, new Uint8Array(data), usage);
          dataBuffer.capacity = data;
        }
        this._resetVertexBufferBinding();
        dataBuffer.references = 1;
        return dataBuffer;
      }
      /**
       * Creates a dynamic vertex buffer
       * @param data the data for the dynamic vertex buffer
       * @param _label defines the label of the buffer (for debug purpose)
       * @returns the new WebGL dynamic buffer
       */
      createDynamicVertexBuffer(data, _label) {
        return this._createVertexBuffer(data, this._gl.DYNAMIC_DRAW);
      }
      _resetIndexBufferBinding() {
        this.bindIndexBuffer(null);
        this._cachedIndexBuffer = null;
      }
      /**
       * Creates a new index buffer
       * @param indices defines the content of the index buffer
       * @param updatable defines if the index buffer must be updatable
       * @param _label defines the label of the buffer (for debug purpose)
       * @returns a new webGL buffer
       */
      createIndexBuffer(indices, updatable, _label) {
        const vbo = this._gl.createBuffer();
        const dataBuffer = new WebGLDataBuffer(vbo);
        if (!vbo) {
          throw new Error("Unable to create index buffer");
        }
        this.bindIndexBuffer(dataBuffer);
        const data = this._normalizeIndexData(indices);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, data, updatable ? this._gl.DYNAMIC_DRAW : this._gl.STATIC_DRAW);
        this._resetIndexBufferBinding();
        dataBuffer.references = 1;
        dataBuffer.is32Bits = data.BYTES_PER_ELEMENT === 4;
        return dataBuffer;
      }
      _normalizeIndexData(indices) {
        const bytesPerElement = indices.BYTES_PER_ELEMENT;
        if (bytesPerElement === 2) {
          return indices;
        }
        if (this._caps.uintIndices) {
          if (indices instanceof Uint32Array) {
            return indices;
          } else {
            for (let index = 0; index < indices.length; index++) {
              if (indices[index] >= 65535) {
                return new Uint32Array(indices);
              }
            }
            return new Uint16Array(indices);
          }
        }
        return new Uint16Array(indices);
      }
      /**
       * Bind a webGL buffer to the webGL context
       * @param buffer defines the buffer to bind
       */
      bindArrayBuffer(buffer) {
        if (!this._vaoRecordInProgress) {
          this._unbindVertexArrayObject();
        }
        this._bindBuffer(buffer, this._gl.ARRAY_BUFFER);
      }
      /**
       * Bind a specific block at a given index in a specific shader program
       * @param pipelineContext defines the pipeline context to use
       * @param blockName defines the block name
       * @param index defines the index where to bind the block
       */
      bindUniformBlock(pipelineContext, blockName, index) {
        const program = pipelineContext.program;
        const uniformLocation = this._gl.getUniformBlockIndex(program, blockName);
        this._gl.uniformBlockBinding(program, uniformLocation, index);
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      bindIndexBuffer(buffer) {
        if (!this._vaoRecordInProgress) {
          this._unbindVertexArrayObject();
        }
        this._bindBuffer(buffer, this._gl.ELEMENT_ARRAY_BUFFER);
      }
      _bindBuffer(buffer, target) {
        if (this._vaoRecordInProgress || this._currentBoundBuffer[target] !== buffer) {
          this._gl.bindBuffer(target, buffer ? buffer.underlyingResource : null);
          this._currentBoundBuffer[target] = buffer;
        }
      }
      /**
       * update the bound buffer with the given data
       * @param data defines the data to update
       */
      updateArrayBuffer(data) {
        this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, data);
      }
      _vertexAttribPointer(buffer, indx, size, type, normalized, stride, offset) {
        const pointer = this._currentBufferPointers[indx];
        if (!pointer) {
          return;
        }
        let changed = false;
        if (!pointer.active) {
          changed = true;
          pointer.active = true;
          pointer.index = indx;
          pointer.size = size;
          pointer.type = type;
          pointer.normalized = normalized;
          pointer.stride = stride;
          pointer.offset = offset;
          pointer.buffer = buffer;
        } else {
          if (pointer.buffer !== buffer) {
            pointer.buffer = buffer;
            changed = true;
          }
          if (pointer.size !== size) {
            pointer.size = size;
            changed = true;
          }
          if (pointer.type !== type) {
            pointer.type = type;
            changed = true;
          }
          if (pointer.normalized !== normalized) {
            pointer.normalized = normalized;
            changed = true;
          }
          if (pointer.stride !== stride) {
            pointer.stride = stride;
            changed = true;
          }
          if (pointer.offset !== offset) {
            pointer.offset = offset;
            changed = true;
          }
        }
        if (changed || this._vaoRecordInProgress) {
          this.bindArrayBuffer(buffer);
          if (type === this._gl.UNSIGNED_INT || type === this._gl.INT) {
            this._gl.vertexAttribIPointer(indx, size, type, stride, offset);
          } else {
            this._gl.vertexAttribPointer(indx, size, type, normalized, stride, offset);
          }
        }
      }
      /**
       * @internal
       */
      _bindIndexBufferWithCache(indexBuffer) {
        if (indexBuffer == null) {
          return;
        }
        if (this._cachedIndexBuffer !== indexBuffer) {
          this._cachedIndexBuffer = indexBuffer;
          this.bindIndexBuffer(indexBuffer);
          this._uintIndicesCurrentlySet = indexBuffer.is32Bits;
        }
      }
      _bindVertexBuffersAttributes(vertexBuffers, effect, overrideVertexBuffers) {
        const attributes = effect.getAttributesNames();
        if (!this._vaoRecordInProgress) {
          this._unbindVertexArrayObject();
        }
        this.unbindAllAttributes();
        for (let index = 0; index < attributes.length; index++) {
          const order = effect.getAttributeLocation(index);
          if (order >= 0) {
            const ai = attributes[index];
            let vertexBuffer = null;
            if (overrideVertexBuffers) {
              vertexBuffer = overrideVertexBuffers[ai];
            }
            if (!vertexBuffer) {
              vertexBuffer = vertexBuffers[ai];
            }
            if (!vertexBuffer) {
              continue;
            }
            this._gl.enableVertexAttribArray(order);
            if (!this._vaoRecordInProgress) {
              this._vertexAttribArraysEnabled[order] = true;
            }
            const buffer = vertexBuffer.getBuffer();
            if (buffer) {
              this._vertexAttribPointer(buffer, order, vertexBuffer.getSize(), vertexBuffer.type, vertexBuffer.normalized, vertexBuffer.byteStride, vertexBuffer.byteOffset);
              if (vertexBuffer.getIsInstanced()) {
                this._gl.vertexAttribDivisor(order, vertexBuffer.getInstanceDivisor());
                if (!this._vaoRecordInProgress) {
                  this._currentInstanceLocations.push(order);
                  this._currentInstanceBuffers.push(buffer);
                }
              }
            }
          }
        }
      }
      /**
       * Records a vertex array object
       * @see https://doc.babylonjs.com/setup/support/webGL2#vertex-array-objects
       * @param vertexBuffers defines the list of vertex buffers to store
       * @param indexBuffer defines the index buffer to store
       * @param effect defines the effect to store
       * @param overrideVertexBuffers defines optional list of avertex buffers that overrides the entries in vertexBuffers
       * @returns the new vertex array object
       */
      recordVertexArrayObject(vertexBuffers, indexBuffer, effect, overrideVertexBuffers) {
        const vao = this._gl.createVertexArray();
        if (!vao) {
          throw new Error("Unable to create VAO");
        }
        this._vaoRecordInProgress = true;
        this._gl.bindVertexArray(vao);
        this._mustWipeVertexAttributes = true;
        this._bindVertexBuffersAttributes(vertexBuffers, effect, overrideVertexBuffers);
        this.bindIndexBuffer(indexBuffer);
        this._vaoRecordInProgress = false;
        this._gl.bindVertexArray(null);
        return vao;
      }
      /**
       * Bind a specific vertex array object
       * @see https://doc.babylonjs.com/setup/support/webGL2#vertex-array-objects
       * @param vertexArrayObject defines the vertex array object to bind
       * @param indexBuffer defines the index buffer to bind
       */
      bindVertexArrayObject(vertexArrayObject, indexBuffer) {
        if (this._cachedVertexArrayObject !== vertexArrayObject) {
          this._cachedVertexArrayObject = vertexArrayObject;
          this._gl.bindVertexArray(vertexArrayObject);
          this._cachedVertexBuffers = null;
          this._cachedIndexBuffer = null;
          this._uintIndicesCurrentlySet = indexBuffer != null && indexBuffer.is32Bits;
          this._mustWipeVertexAttributes = true;
        }
      }
      /**
       * Bind webGl buffers directly to the webGL context
       * @param vertexBuffer defines the vertex buffer to bind
       * @param indexBuffer defines the index buffer to bind
       * @param vertexDeclaration defines the vertex declaration to use with the vertex buffer
       * @param vertexStrideSize defines the vertex stride of the vertex buffer
       * @param effect defines the effect associated with the vertex buffer
       */
      bindBuffersDirectly(vertexBuffer, indexBuffer, vertexDeclaration, vertexStrideSize, effect) {
        if (this._cachedVertexBuffers !== vertexBuffer || this._cachedEffectForVertexBuffers !== effect) {
          this._cachedVertexBuffers = vertexBuffer;
          this._cachedEffectForVertexBuffers = effect;
          const attributesCount = effect.getAttributesCount();
          this._unbindVertexArrayObject();
          this.unbindAllAttributes();
          let offset = 0;
          for (let index = 0; index < attributesCount; index++) {
            if (index < vertexDeclaration.length) {
              const order = effect.getAttributeLocation(index);
              if (order >= 0) {
                this._gl.enableVertexAttribArray(order);
                this._vertexAttribArraysEnabled[order] = true;
                this._vertexAttribPointer(vertexBuffer, order, vertexDeclaration[index], this._gl.FLOAT, false, vertexStrideSize, offset);
              }
              offset += vertexDeclaration[index] * 4;
            }
          }
        }
        this._bindIndexBufferWithCache(indexBuffer);
      }
      _unbindVertexArrayObject() {
        if (!this._cachedVertexArrayObject) {
          return;
        }
        this._cachedVertexArrayObject = null;
        this._gl.bindVertexArray(null);
      }
      /**
       * Bind a list of vertex buffers to the webGL context
       * @param vertexBuffers defines the list of vertex buffers to bind
       * @param indexBuffer defines the index buffer to bind
       * @param effect defines the effect associated with the vertex buffers
       * @param overrideVertexBuffers defines optional list of avertex buffers that overrides the entries in vertexBuffers
       */
      bindBuffers(vertexBuffers, indexBuffer, effect, overrideVertexBuffers) {
        if (this._cachedVertexBuffers !== vertexBuffers || this._cachedEffectForVertexBuffers !== effect) {
          this._cachedVertexBuffers = vertexBuffers;
          this._cachedEffectForVertexBuffers = effect;
          this._bindVertexBuffersAttributes(vertexBuffers, effect, overrideVertexBuffers);
        }
        this._bindIndexBufferWithCache(indexBuffer);
      }
      /**
       * Unbind all instance attributes
       */
      unbindInstanceAttributes() {
        let boundBuffer;
        for (let i = 0, ul = this._currentInstanceLocations.length; i < ul; i++) {
          const instancesBuffer = this._currentInstanceBuffers[i];
          if (boundBuffer != instancesBuffer && instancesBuffer.references) {
            boundBuffer = instancesBuffer;
            this.bindArrayBuffer(instancesBuffer);
          }
          const offsetLocation = this._currentInstanceLocations[i];
          this._gl.vertexAttribDivisor(offsetLocation, 0);
        }
        this._currentInstanceBuffers.length = 0;
        this._currentInstanceLocations.length = 0;
      }
      /**
       * Release and free the memory of a vertex array object
       * @param vao defines the vertex array object to delete
       */
      releaseVertexArrayObject(vao) {
        this._gl.deleteVertexArray(vao);
      }
      /**
       * @internal
       */
      _releaseBuffer(buffer) {
        buffer.references--;
        if (buffer.references === 0) {
          this._deleteBuffer(buffer);
          return true;
        }
        return false;
      }
      _deleteBuffer(buffer) {
        this._gl.deleteBuffer(buffer.underlyingResource);
      }
      /**
       * Update the content of a webGL buffer used with instantiation and bind it to the webGL context
       * @param instancesBuffer defines the webGL buffer to update and bind
       * @param data defines the data to store in the buffer
       * @param offsetLocations defines the offsets or attributes information used to determine where data must be stored in the buffer
       */
      updateAndBindInstancesBuffer(instancesBuffer, data, offsetLocations) {
        this.bindArrayBuffer(instancesBuffer);
        if (data) {
          this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, data);
        }
        if (offsetLocations[0].index !== void 0) {
          this.bindInstancesBuffer(instancesBuffer, offsetLocations, true);
        } else {
          for (let index = 0; index < 4; index++) {
            const offsetLocation = offsetLocations[index];
            if (!this._vertexAttribArraysEnabled[offsetLocation]) {
              this._gl.enableVertexAttribArray(offsetLocation);
              this._vertexAttribArraysEnabled[offsetLocation] = true;
            }
            this._vertexAttribPointer(instancesBuffer, offsetLocation, 4, this._gl.FLOAT, false, 64, index * 16);
            this._gl.vertexAttribDivisor(offsetLocation, 1);
            this._currentInstanceLocations.push(offsetLocation);
            this._currentInstanceBuffers.push(instancesBuffer);
          }
        }
      }
      /**
       * Bind the content of a webGL buffer used with instantiation
       * @param instancesBuffer defines the webGL buffer to bind
       * @param attributesInfo defines the offsets or attributes information used to determine where data must be stored in the buffer
       * @param computeStride defines Whether to compute the strides from the info or use the default 0
       */
      bindInstancesBuffer(instancesBuffer, attributesInfo, computeStride = true) {
        this.bindArrayBuffer(instancesBuffer);
        let stride = 0;
        if (computeStride) {
          for (let i = 0; i < attributesInfo.length; i++) {
            const ai = attributesInfo[i];
            stride += ai.attributeSize * 4;
          }
        }
        for (let i = 0; i < attributesInfo.length; i++) {
          const ai = attributesInfo[i];
          if (ai.index === void 0) {
            ai.index = this._currentEffect.getAttributeLocationByName(ai.attributeName);
          }
          if (ai.index < 0) {
            continue;
          }
          if (!this._vertexAttribArraysEnabled[ai.index]) {
            this._gl.enableVertexAttribArray(ai.index);
            this._vertexAttribArraysEnabled[ai.index] = true;
          }
          this._vertexAttribPointer(instancesBuffer, ai.index, ai.attributeSize, ai.attributeType || this._gl.FLOAT, ai.normalized || false, stride, ai.offset);
          this._gl.vertexAttribDivisor(ai.index, ai.divisor === void 0 ? 1 : ai.divisor);
          this._currentInstanceLocations.push(ai.index);
          this._currentInstanceBuffers.push(instancesBuffer);
        }
      }
      /**
       * Disable the instance attribute corresponding to the name in parameter
       * @param name defines the name of the attribute to disable
       */
      disableInstanceAttributeByName(name) {
        if (!this._currentEffect) {
          return;
        }
        const attributeLocation = this._currentEffect.getAttributeLocationByName(name);
        this.disableInstanceAttribute(attributeLocation);
      }
      /**
       * Disable the instance attribute corresponding to the location in parameter
       * @param attributeLocation defines the attribute location of the attribute to disable
       */
      disableInstanceAttribute(attributeLocation) {
        let shouldClean = false;
        let index;
        while ((index = this._currentInstanceLocations.indexOf(attributeLocation)) !== -1) {
          this._currentInstanceLocations.splice(index, 1);
          this._currentInstanceBuffers.splice(index, 1);
          shouldClean = true;
          index = this._currentInstanceLocations.indexOf(attributeLocation);
        }
        if (shouldClean) {
          this._gl.vertexAttribDivisor(attributeLocation, 0);
          this.disableAttributeByIndex(attributeLocation);
        }
      }
      /**
       * Disable the attribute corresponding to the location in parameter
       * @param attributeLocation defines the attribute location of the attribute to disable
       */
      disableAttributeByIndex(attributeLocation) {
        this._gl.disableVertexAttribArray(attributeLocation);
        this._vertexAttribArraysEnabled[attributeLocation] = false;
        this._currentBufferPointers[attributeLocation].active = false;
      }
      /**
       * Send a draw order
       * @param useTriangles defines if triangles must be used to draw (else wireframe will be used)
       * @param indexStart defines the starting index
       * @param indexCount defines the number of index to draw
       * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
       */
      draw(useTriangles, indexStart, indexCount, instancesCount) {
        this.drawElementsType(useTriangles ? 0 : 1, indexStart, indexCount, instancesCount);
      }
      /**
       * Draw a list of points
       * @param verticesStart defines the index of first vertex to draw
       * @param verticesCount defines the count of vertices to draw
       * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
       */
      drawPointClouds(verticesStart, verticesCount, instancesCount) {
        this.drawArraysType(2, verticesStart, verticesCount, instancesCount);
      }
      /**
       * Draw a list of unindexed primitives
       * @param useTriangles defines if triangles must be used to draw (else wireframe will be used)
       * @param verticesStart defines the index of first vertex to draw
       * @param verticesCount defines the count of vertices to draw
       * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
       */
      drawUnIndexed(useTriangles, verticesStart, verticesCount, instancesCount) {
        this.drawArraysType(useTriangles ? 0 : 1, verticesStart, verticesCount, instancesCount);
      }
      /**
       * Draw a list of indexed primitives
       * @param fillMode defines the primitive to use
       * @param indexStart defines the starting index
       * @param indexCount defines the number of index to draw
       * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
       */
      drawElementsType(fillMode, indexStart, indexCount, instancesCount) {
        this.applyStates();
        this._reportDrawCall();
        const drawMode = this._drawMode(fillMode);
        const indexFormat = this._uintIndicesCurrentlySet ? this._gl.UNSIGNED_INT : this._gl.UNSIGNED_SHORT;
        const mult = this._uintIndicesCurrentlySet ? 4 : 2;
        if (instancesCount) {
          this._gl.drawElementsInstanced(drawMode, indexCount, indexFormat, indexStart * mult, instancesCount);
        } else {
          this._gl.drawElements(drawMode, indexCount, indexFormat, indexStart * mult);
        }
      }
      /**
       * Draw a list of unindexed primitives
       * @param fillMode defines the primitive to use
       * @param verticesStart defines the index of first vertex to draw
       * @param verticesCount defines the count of vertices to draw
       * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
       */
      drawArraysType(fillMode, verticesStart, verticesCount, instancesCount) {
        this.applyStates();
        this._reportDrawCall();
        const drawMode = this._drawMode(fillMode);
        if (instancesCount) {
          this._gl.drawArraysInstanced(drawMode, verticesStart, verticesCount, instancesCount);
        } else {
          this._gl.drawArrays(drawMode, verticesStart, verticesCount);
        }
      }
      _drawMode(fillMode) {
        switch (fillMode) {
          case 0:
            return this._gl.TRIANGLES;
          case 2:
            return this._gl.POINTS;
          case 1:
            return this._gl.LINES;
          case 3:
            return this._gl.POINTS;
          case 4:
            return this._gl.LINES;
          case 5:
            return this._gl.LINE_LOOP;
          case 6:
            return this._gl.LINE_STRIP;
          case 7:
            return this._gl.TRIANGLE_STRIP;
          case 8:
            return this._gl.TRIANGLE_FAN;
          default:
            return this._gl.TRIANGLES;
        }
      }
      /** @internal */
      _reportDrawCall() {
      }
      // Shaders
      /**
       * @internal
       */
      _releaseEffect(effect) {
        if (this._compiledEffects[effect._key]) {
          delete this._compiledEffects[effect._key];
        }
        const pipelineContext = effect.getPipelineContext();
        if (pipelineContext) {
          this._deletePipelineContext(pipelineContext);
        }
      }
      /**
       * @internal
       */
      _deletePipelineContext(pipelineContext) {
        const webGLPipelineContext = pipelineContext;
        if (webGLPipelineContext && webGLPipelineContext.program) {
          webGLPipelineContext.program.__SPECTOR_rebuildProgram = null;
          this._gl.deleteProgram(webGLPipelineContext.program);
        }
      }
      /** @internal */
      _getGlobalDefines(defines) {
        if (defines) {
          if (this.isNDCHalfZRange) {
            defines["IS_NDC_HALF_ZRANGE"] = "";
          } else {
            delete defines["IS_NDC_HALF_ZRANGE"];
          }
          if (this.useReverseDepthBuffer) {
            defines["USE_REVERSE_DEPTHBUFFER"] = "";
          } else {
            delete defines["USE_REVERSE_DEPTHBUFFER"];
          }
          if (this.useExactSrgbConversions) {
            defines["USE_EXACT_SRGB_CONVERSIONS"] = "";
          } else {
            delete defines["USE_EXACT_SRGB_CONVERSIONS"];
          }
          return;
        } else {
          let s = "";
          if (this.isNDCHalfZRange) {
            s += "#define IS_NDC_HALF_ZRANGE";
          }
          if (this.useReverseDepthBuffer) {
            if (s) {
              s += "\n";
            }
            s += "#define USE_REVERSE_DEPTHBUFFER";
          }
          if (this.useExactSrgbConversions) {
            if (s) {
              s += "\n";
            }
            s += "#define USE_EXACT_SRGB_CONVERSIONS";
          }
          return s;
        }
      }
      /**
       * Create a new effect (used to store vertex/fragment shaders)
       * @param baseName defines the base name of the effect (The name of file without .fragment.fx or .vertex.fx)
       * @param attributesNamesOrOptions defines either a list of attribute names or an IEffectCreationOptions object
       * @param uniformsNamesOrEngine defines either a list of uniform names or the engine to use
       * @param samplers defines an array of string used to represent textures
       * @param defines defines the string containing the defines to use to compile the shaders
       * @param fallbacks defines the list of potential fallbacks to use if shader compilation fails
       * @param onCompiled defines a function to call when the effect creation is successful
       * @param onError defines a function to call when the effect creation has failed
       * @param indexParameters defines an object containing the index values to use to compile shaders (like the maximum number of simultaneous lights)
       * @param shaderLanguage the language the shader is written in (default: GLSL)
       * @returns the new Effect
       */
      createEffect(baseName, attributesNamesOrOptions, uniformsNamesOrEngine, samplers, defines, fallbacks, onCompiled, onError, indexParameters, shaderLanguage = ShaderLanguage.GLSL) {
        const vertex = baseName.vertexElement || baseName.vertex || baseName.vertexToken || baseName.vertexSource || baseName;
        const fragment = baseName.fragmentElement || baseName.fragment || baseName.fragmentToken || baseName.fragmentSource || baseName;
        const globalDefines = this._getGlobalDefines();
        let fullDefines = defines ?? attributesNamesOrOptions.defines ?? "";
        if (globalDefines) {
          fullDefines += globalDefines;
        }
        const name = vertex + "+" + fragment + "@" + fullDefines;
        if (this._compiledEffects[name]) {
          const compiledEffect = this._compiledEffects[name];
          if (onCompiled && compiledEffect.isReady()) {
            onCompiled(compiledEffect);
          }
          return compiledEffect;
        }
        const effect = new Effect(baseName, attributesNamesOrOptions, uniformsNamesOrEngine, samplers, this, defines, fallbacks, onCompiled, onError, indexParameters, name, shaderLanguage);
        this._compiledEffects[name] = effect;
        return effect;
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static _ConcatenateShader(source, defines, shaderVersion = "") {
        return shaderVersion + (defines ? defines + "\n" : "") + source;
      }
      _compileShader(source, type, defines, shaderVersion) {
        return this._compileRawShader(_ThinEngine._ConcatenateShader(source, defines, shaderVersion), type);
      }
      _compileRawShader(source, type) {
        const gl = this._gl;
        const shader = gl.createShader(type === "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
        if (!shader) {
          let error = gl.NO_ERROR;
          let tempError = gl.NO_ERROR;
          while ((tempError = gl.getError()) !== gl.NO_ERROR) {
            error = tempError;
          }
          throw new Error(`Something went wrong while creating a gl ${type} shader object. gl error=${error}, gl isContextLost=${gl.isContextLost()}, _contextWasLost=${this._contextWasLost}`);
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      }
      /**
       * @internal
       */
      _getShaderSource(shader) {
        return this._gl.getShaderSource(shader);
      }
      /**
       * Directly creates a webGL program
       * @param pipelineContext  defines the pipeline context to attach to
       * @param vertexCode defines the vertex shader code to use
       * @param fragmentCode defines the fragment shader code to use
       * @param context defines the webGL context to use (if not set, the current one will be used)
       * @param transformFeedbackVaryings defines the list of transform feedback varyings to use
       * @returns the new webGL program
       */
      createRawShaderProgram(pipelineContext, vertexCode, fragmentCode, context, transformFeedbackVaryings = null) {
        context = context || this._gl;
        const vertexShader = this._compileRawShader(vertexCode, "vertex");
        const fragmentShader = this._compileRawShader(fragmentCode, "fragment");
        return this._createShaderProgram(pipelineContext, vertexShader, fragmentShader, context, transformFeedbackVaryings);
      }
      /**
       * Creates a webGL program
       * @param pipelineContext  defines the pipeline context to attach to
       * @param vertexCode  defines the vertex shader code to use
       * @param fragmentCode defines the fragment shader code to use
       * @param defines defines the string containing the defines to use to compile the shaders
       * @param context defines the webGL context to use (if not set, the current one will be used)
       * @param transformFeedbackVaryings defines the list of transform feedback varyings to use
       * @returns the new webGL program
       */
      createShaderProgram(pipelineContext, vertexCode, fragmentCode, defines, context, transformFeedbackVaryings = null) {
        context = context || this._gl;
        const shaderVersion = this._webGLVersion > 1 ? "#version 300 es\n#define WEBGL2 \n" : "";
        const vertexShader = this._compileShader(vertexCode, "vertex", defines, shaderVersion);
        const fragmentShader = this._compileShader(fragmentCode, "fragment", defines, shaderVersion);
        return this._createShaderProgram(pipelineContext, vertexShader, fragmentShader, context, transformFeedbackVaryings);
      }
      /**
       * Inline functions in shader code that are marked to be inlined
       * @param code code to inline
       * @returns inlined code
       */
      inlineShaderCode(code) {
        return code;
      }
      /**
       * Creates a new pipeline context
       * @param shaderProcessingContext defines the shader processing context used during the processing if available
       * @returns the new pipeline
       */
      createPipelineContext(shaderProcessingContext) {
        const pipelineContext = new WebGLPipelineContext();
        pipelineContext.engine = this;
        if (this._caps.parallelShaderCompile) {
          pipelineContext.isParallelCompiled = true;
        }
        return pipelineContext;
      }
      /**
       * Creates a new material context
       * @returns the new context
       */
      createMaterialContext() {
        return void 0;
      }
      /**
       * Creates a new draw context
       * @returns the new context
       */
      createDrawContext() {
        return void 0;
      }
      _createShaderProgram(pipelineContext, vertexShader, fragmentShader, context, transformFeedbackVaryings = null) {
        const shaderProgram = context.createProgram();
        pipelineContext.program = shaderProgram;
        if (!shaderProgram) {
          throw new Error("Unable to create program");
        }
        context.attachShader(shaderProgram, vertexShader);
        context.attachShader(shaderProgram, fragmentShader);
        context.linkProgram(shaderProgram);
        pipelineContext.context = context;
        pipelineContext.vertexShader = vertexShader;
        pipelineContext.fragmentShader = fragmentShader;
        if (!pipelineContext.isParallelCompiled) {
          this._finalizePipelineContext(pipelineContext);
        }
        return shaderProgram;
      }
      _finalizePipelineContext(pipelineContext) {
        const context = pipelineContext.context;
        const vertexShader = pipelineContext.vertexShader;
        const fragmentShader = pipelineContext.fragmentShader;
        const program = pipelineContext.program;
        const linked = context.getProgramParameter(program, context.LINK_STATUS);
        if (!linked) {
          if (!this._gl.getShaderParameter(vertexShader, this._gl.COMPILE_STATUS)) {
            const log = this._gl.getShaderInfoLog(vertexShader);
            if (log) {
              pipelineContext.vertexCompilationError = log;
              throw new Error("VERTEX SHADER " + log);
            }
          }
          if (!this._gl.getShaderParameter(fragmentShader, this._gl.COMPILE_STATUS)) {
            const log = this._gl.getShaderInfoLog(fragmentShader);
            if (log) {
              pipelineContext.fragmentCompilationError = log;
              throw new Error("FRAGMENT SHADER " + log);
            }
          }
          const error = context.getProgramInfoLog(program);
          if (error) {
            pipelineContext.programLinkError = error;
            throw new Error(error);
          }
        }
        if (this.validateShaderPrograms) {
          context.validateProgram(program);
          const validated = context.getProgramParameter(program, context.VALIDATE_STATUS);
          if (!validated) {
            const error = context.getProgramInfoLog(program);
            if (error) {
              pipelineContext.programValidationError = error;
              throw new Error(error);
            }
          }
        }
        context.deleteShader(vertexShader);
        context.deleteShader(fragmentShader);
        pipelineContext.vertexShader = void 0;
        pipelineContext.fragmentShader = void 0;
        if (pipelineContext.onCompiled) {
          pipelineContext.onCompiled();
          pipelineContext.onCompiled = void 0;
        }
      }
      /**
       * @internal
       */
      _preparePipelineContext(pipelineContext, vertexSourceCode, fragmentSourceCode, createAsRaw, rawVertexSourceCode, rawFragmentSourceCode, rebuildRebind, defines, transformFeedbackVaryings, key) {
        const webGLRenderingState = pipelineContext;
        if (createAsRaw) {
          webGLRenderingState.program = this.createRawShaderProgram(webGLRenderingState, vertexSourceCode, fragmentSourceCode, void 0, transformFeedbackVaryings);
        } else {
          webGLRenderingState.program = this.createShaderProgram(webGLRenderingState, vertexSourceCode, fragmentSourceCode, defines, void 0, transformFeedbackVaryings);
        }
        webGLRenderingState.program.__SPECTOR_rebuildProgram = rebuildRebind;
      }
      /**
       * @internal
       */
      _isRenderingStateCompiled(pipelineContext) {
        const webGLPipelineContext = pipelineContext;
        if (this._isDisposed || webGLPipelineContext._isDisposed) {
          return false;
        }
        if (this._gl.getProgramParameter(webGLPipelineContext.program, this._caps.parallelShaderCompile.COMPLETION_STATUS_KHR)) {
          this._finalizePipelineContext(webGLPipelineContext);
          return true;
        }
        return false;
      }
      /**
       * @internal
       */
      _executeWhenRenderingStateIsCompiled(pipelineContext, action) {
        const webGLPipelineContext = pipelineContext;
        if (!webGLPipelineContext.isParallelCompiled) {
          action();
          return;
        }
        const oldHandler = webGLPipelineContext.onCompiled;
        if (oldHandler) {
          webGLPipelineContext.onCompiled = () => {
            oldHandler();
            action();
          };
        } else {
          webGLPipelineContext.onCompiled = action;
        }
      }
      /**
       * Gets the list of webGL uniform locations associated with a specific program based on a list of uniform names
       * @param pipelineContext defines the pipeline context to use
       * @param uniformsNames defines the list of uniform names
       * @returns an array of webGL uniform locations
       */
      getUniforms(pipelineContext, uniformsNames) {
        const results = new Array();
        const webGLPipelineContext = pipelineContext;
        for (let index = 0; index < uniformsNames.length; index++) {
          results.push(this._gl.getUniformLocation(webGLPipelineContext.program, uniformsNames[index]));
        }
        return results;
      }
      /**
       * Gets the list of active attributes for a given webGL program
       * @param pipelineContext defines the pipeline context to use
       * @param attributesNames defines the list of attribute names to get
       * @returns an array of indices indicating the offset of each attribute
       */
      getAttributes(pipelineContext, attributesNames) {
        const results = [];
        const webGLPipelineContext = pipelineContext;
        for (let index = 0; index < attributesNames.length; index++) {
          try {
            results.push(this._gl.getAttribLocation(webGLPipelineContext.program, attributesNames[index]));
          } catch (e) {
            results.push(-1);
          }
        }
        return results;
      }
      /**
       * Activates an effect, making it the current one (ie. the one used for rendering)
       * @param effect defines the effect to activate
       */
      enableEffect(effect) {
        effect = effect !== null && DrawWrapper.IsWrapper(effect) ? effect.effect : effect;
        if (!effect || effect === this._currentEffect) {
          return;
        }
        this._stencilStateComposer.stencilMaterial = void 0;
        effect = effect;
        this.bindSamplers(effect);
        this._currentEffect = effect;
        if (effect.onBind) {
          effect.onBind(effect);
        }
        if (effect._onBindObservable) {
          effect._onBindObservable.notifyObservers(effect);
        }
      }
      /**
       * Set the value of an uniform to a number (int)
       * @param uniform defines the webGL uniform location where to store the value
       * @param value defines the int number to store
       * @returns true if the value was set
       */
      setInt(uniform, value) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform1i(uniform, value);
        return true;
      }
      /**
       * Set the value of an uniform to a int2
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @returns true if the value was set
       */
      setInt2(uniform, x, y) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform2i(uniform, x, y);
        return true;
      }
      /**
       * Set the value of an uniform to a int3
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @param z defines the 3rd component of the value
       * @returns true if the value was set
       */
      setInt3(uniform, x, y, z) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform3i(uniform, x, y, z);
        return true;
      }
      /**
       * Set the value of an uniform to a int4
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @param z defines the 3rd component of the value
       * @param w defines the 4th component of the value
       * @returns true if the value was set
       */
      setInt4(uniform, x, y, z, w) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform4i(uniform, x, y, z, w);
        return true;
      }
      /**
       * Set the value of an uniform to an array of int32
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of int32 to store
       * @returns true if the value was set
       */
      setIntArray(uniform, array) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform1iv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of int32 (stored as vec2)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of int32 to store
       * @returns true if the value was set
       */
      setIntArray2(uniform, array) {
        if (!uniform || array.length % 2 !== 0) {
          return false;
        }
        this._gl.uniform2iv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of int32 (stored as vec3)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of int32 to store
       * @returns true if the value was set
       */
      setIntArray3(uniform, array) {
        if (!uniform || array.length % 3 !== 0) {
          return false;
        }
        this._gl.uniform3iv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of int32 (stored as vec4)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of int32 to store
       * @returns true if the value was set
       */
      setIntArray4(uniform, array) {
        if (!uniform || array.length % 4 !== 0) {
          return false;
        }
        this._gl.uniform4iv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to a number (unsigned int)
       * @param uniform defines the webGL uniform location where to store the value
       * @param value defines the unsigned int number to store
       * @returns true if the value was set
       */
      setUInt(uniform, value) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform1ui(uniform, value);
        return true;
      }
      /**
       * Set the value of an uniform to a unsigned int2
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @returns true if the value was set
       */
      setUInt2(uniform, x, y) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform2ui(uniform, x, y);
        return true;
      }
      /**
       * Set the value of an uniform to a unsigned int3
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @param z defines the 3rd component of the value
       * @returns true if the value was set
       */
      setUInt3(uniform, x, y, z) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform3ui(uniform, x, y, z);
        return true;
      }
      /**
       * Set the value of an uniform to a unsigned int4
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @param z defines the 3rd component of the value
       * @param w defines the 4th component of the value
       * @returns true if the value was set
       */
      setUInt4(uniform, x, y, z, w) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform4ui(uniform, x, y, z, w);
        return true;
      }
      /**
       * Set the value of an uniform to an array of unsigned int32
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of unsigned int32 to store
       * @returns true if the value was set
       */
      setUIntArray(uniform, array) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform1uiv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of unsigned int32 (stored as vec2)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of unsigned int32 to store
       * @returns true if the value was set
       */
      setUIntArray2(uniform, array) {
        if (!uniform || array.length % 2 !== 0) {
          return false;
        }
        this._gl.uniform2uiv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of unsigned int32 (stored as vec3)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of unsigned int32 to store
       * @returns true if the value was set
       */
      setUIntArray3(uniform, array) {
        if (!uniform || array.length % 3 !== 0) {
          return false;
        }
        this._gl.uniform3uiv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of unsigned int32 (stored as vec4)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of unsigned int32 to store
       * @returns true if the value was set
       */
      setUIntArray4(uniform, array) {
        if (!uniform || array.length % 4 !== 0) {
          return false;
        }
        this._gl.uniform4uiv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of number
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of number to store
       * @returns true if the value was set
       */
      setArray(uniform, array) {
        if (!uniform) {
          return false;
        }
        if (array.length < 1) {
          return false;
        }
        this._gl.uniform1fv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of number (stored as vec2)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of number to store
       * @returns true if the value was set
       */
      setArray2(uniform, array) {
        if (!uniform || array.length % 2 !== 0) {
          return false;
        }
        this._gl.uniform2fv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of number (stored as vec3)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of number to store
       * @returns true if the value was set
       */
      setArray3(uniform, array) {
        if (!uniform || array.length % 3 !== 0) {
          return false;
        }
        this._gl.uniform3fv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of number (stored as vec4)
       * @param uniform defines the webGL uniform location where to store the value
       * @param array defines the array of number to store
       * @returns true if the value was set
       */
      setArray4(uniform, array) {
        if (!uniform || array.length % 4 !== 0) {
          return false;
        }
        this._gl.uniform4fv(uniform, array);
        return true;
      }
      /**
       * Set the value of an uniform to an array of float32 (stored as matrices)
       * @param uniform defines the webGL uniform location where to store the value
       * @param matrices defines the array of float32 to store
       * @returns true if the value was set
       */
      setMatrices(uniform, matrices) {
        if (!uniform) {
          return false;
        }
        this._gl.uniformMatrix4fv(uniform, false, matrices);
        return true;
      }
      /**
       * Set the value of an uniform to a matrix (3x3)
       * @param uniform defines the webGL uniform location where to store the value
       * @param matrix defines the Float32Array representing the 3x3 matrix to store
       * @returns true if the value was set
       */
      setMatrix3x3(uniform, matrix) {
        if (!uniform) {
          return false;
        }
        this._gl.uniformMatrix3fv(uniform, false, matrix);
        return true;
      }
      /**
       * Set the value of an uniform to a matrix (2x2)
       * @param uniform defines the webGL uniform location where to store the value
       * @param matrix defines the Float32Array representing the 2x2 matrix to store
       * @returns true if the value was set
       */
      setMatrix2x2(uniform, matrix) {
        if (!uniform) {
          return false;
        }
        this._gl.uniformMatrix2fv(uniform, false, matrix);
        return true;
      }
      /**
       * Set the value of an uniform to a number (float)
       * @param uniform defines the webGL uniform location where to store the value
       * @param value defines the float number to store
       * @returns true if the value was transferred
       */
      setFloat(uniform, value) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform1f(uniform, value);
        return true;
      }
      /**
       * Set the value of an uniform to a vec2
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @returns true if the value was set
       */
      setFloat2(uniform, x, y) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform2f(uniform, x, y);
        return true;
      }
      /**
       * Set the value of an uniform to a vec3
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @param z defines the 3rd component of the value
       * @returns true if the value was set
       */
      setFloat3(uniform, x, y, z) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform3f(uniform, x, y, z);
        return true;
      }
      /**
       * Set the value of an uniform to a vec4
       * @param uniform defines the webGL uniform location where to store the value
       * @param x defines the 1st component of the value
       * @param y defines the 2nd component of the value
       * @param z defines the 3rd component of the value
       * @param w defines the 4th component of the value
       * @returns true if the value was set
       */
      setFloat4(uniform, x, y, z, w) {
        if (!uniform) {
          return false;
        }
        this._gl.uniform4f(uniform, x, y, z, w);
        return true;
      }
      // States
      /**
       * Apply all cached states (depth, culling, stencil and alpha)
       */
      applyStates() {
        this._depthCullingState.apply(this._gl);
        this._stencilStateComposer.apply(this._gl);
        this._alphaState.apply(this._gl);
        if (this._colorWriteChanged) {
          this._colorWriteChanged = false;
          const enable = this._colorWrite;
          this._gl.colorMask(enable, enable, enable, enable);
        }
      }
      /**
       * Enable or disable color writing
       * @param enable defines the state to set
       */
      setColorWrite(enable) {
        if (enable !== this._colorWrite) {
          this._colorWriteChanged = true;
          this._colorWrite = enable;
        }
      }
      /**
       * Gets a boolean indicating if color writing is enabled
       * @returns the current color writing state
       */
      getColorWrite() {
        return this._colorWrite;
      }
      /**
       * Gets the depth culling state manager
       */
      get depthCullingState() {
        return this._depthCullingState;
      }
      /**
       * Gets the alpha state manager
       */
      get alphaState() {
        return this._alphaState;
      }
      /**
       * Gets the stencil state manager
       */
      get stencilState() {
        return this._stencilState;
      }
      /**
       * Gets the stencil state composer
       */
      get stencilStateComposer() {
        return this._stencilStateComposer;
      }
      // Textures
      /**
       * Clears the list of texture accessible through engine.
       * This can help preventing texture load conflict due to name collision.
       */
      clearInternalTexturesCache() {
        this._internalTexturesCache.length = 0;
      }
      /**
       * Force the entire cache to be cleared
       * You should not have to use this function unless your engine needs to share the webGL context with another engine
       * @param bruteForce defines a boolean to force clearing ALL caches (including stencil, detoh and alpha states)
       */
      wipeCaches(bruteForce) {
        if (this.preventCacheWipeBetweenFrames && !bruteForce) {
          return;
        }
        this._currentEffect = null;
        this._viewportCached.x = 0;
        this._viewportCached.y = 0;
        this._viewportCached.z = 0;
        this._viewportCached.w = 0;
        this._unbindVertexArrayObject();
        if (bruteForce) {
          this._currentProgram = null;
          this.resetTextureCache();
          this._stencilStateComposer.reset();
          this._depthCullingState.reset();
          this._depthCullingState.depthFunc = this._gl.LEQUAL;
          this._alphaState.reset();
          this._alphaMode = 1;
          this._alphaEquation = 0;
          this._colorWrite = true;
          this._colorWriteChanged = true;
          this._unpackFlipYCached = null;
          this._gl.pixelStorei(this._gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, this._gl.NONE);
          this._gl.pixelStorei(this._gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
          this._mustWipeVertexAttributes = true;
          this.unbindAllAttributes();
        }
        this._resetVertexBufferBinding();
        this._cachedIndexBuffer = null;
        this._cachedEffectForVertexBuffers = null;
        this.bindIndexBuffer(null);
      }
      /**
       * @internal
       */
      _getSamplingParameters(samplingMode, generateMipMaps) {
        const gl = this._gl;
        let magFilter = gl.NEAREST;
        let minFilter = gl.NEAREST;
        switch (samplingMode) {
          case 11:
            magFilter = gl.LINEAR;
            if (generateMipMaps) {
              minFilter = gl.LINEAR_MIPMAP_NEAREST;
            } else {
              minFilter = gl.LINEAR;
            }
            break;
          case 3:
            magFilter = gl.LINEAR;
            if (generateMipMaps) {
              minFilter = gl.LINEAR_MIPMAP_LINEAR;
            } else {
              minFilter = gl.LINEAR;
            }
            break;
          case 8:
            magFilter = gl.NEAREST;
            if (generateMipMaps) {
              minFilter = gl.NEAREST_MIPMAP_LINEAR;
            } else {
              minFilter = gl.NEAREST;
            }
            break;
          case 4:
            magFilter = gl.NEAREST;
            if (generateMipMaps) {
              minFilter = gl.NEAREST_MIPMAP_NEAREST;
            } else {
              minFilter = gl.NEAREST;
            }
            break;
          case 5:
            magFilter = gl.NEAREST;
            if (generateMipMaps) {
              minFilter = gl.LINEAR_MIPMAP_NEAREST;
            } else {
              minFilter = gl.LINEAR;
            }
            break;
          case 6:
            magFilter = gl.NEAREST;
            if (generateMipMaps) {
              minFilter = gl.LINEAR_MIPMAP_LINEAR;
            } else {
              minFilter = gl.LINEAR;
            }
            break;
          case 7:
            magFilter = gl.NEAREST;
            minFilter = gl.LINEAR;
            break;
          case 1:
            magFilter = gl.NEAREST;
            minFilter = gl.NEAREST;
            break;
          case 9:
            magFilter = gl.LINEAR;
            if (generateMipMaps) {
              minFilter = gl.NEAREST_MIPMAP_NEAREST;
            } else {
              minFilter = gl.NEAREST;
            }
            break;
          case 10:
            magFilter = gl.LINEAR;
            if (generateMipMaps) {
              minFilter = gl.NEAREST_MIPMAP_LINEAR;
            } else {
              minFilter = gl.NEAREST;
            }
            break;
          case 2:
            magFilter = gl.LINEAR;
            minFilter = gl.LINEAR;
            break;
          case 12:
            magFilter = gl.LINEAR;
            minFilter = gl.NEAREST;
            break;
        }
        return {
          min: minFilter,
          mag: magFilter
        };
      }
      /** @internal */
      _createTexture() {
        const texture = this._gl.createTexture();
        if (!texture) {
          throw new Error("Unable to create texture");
        }
        return texture;
      }
      /** @internal */
      _createHardwareTexture() {
        return new WebGLHardwareTexture(this._createTexture(), this._gl);
      }
      /**
       * Creates an internal texture without binding it to a framebuffer
       * @internal
       * @param size defines the size of the texture
       * @param options defines the options used to create the texture
       * @param delayGPUTextureCreation true to delay the texture creation the first time it is really needed. false to create it right away
       * @param source source type of the texture
       * @returns a new internal texture
       */
      _createInternalTexture(size, options, delayGPUTextureCreation = true, source = InternalTextureSource.Unknown) {
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
        useSRGBBuffer && (useSRGBBuffer = this._caps.supportSRGBBuffers && (this.webGLVersion > 1 || this.isWebGPU));
        if (type === 1 && !this._caps.textureFloatLinearFiltering) {
          samplingMode = 1;
        } else if (type === 2 && !this._caps.textureHalfFloatLinearFiltering) {
          samplingMode = 1;
        }
        if (type === 1 && !this._caps.textureFloat) {
          type = 0;
          Logger.Warn("Float textures are not supported. Type forced to TEXTURETYPE_UNSIGNED_BYTE");
        }
        const gl = this._gl;
        const texture = new InternalTexture(this, source);
        const width = size.width || size;
        const height = size.height || size;
        const layers = size.layers || 0;
        const filters = this._getSamplingParameters(samplingMode, generateMipMaps);
        const target = layers !== 0 ? gl.TEXTURE_2D_ARRAY : gl.TEXTURE_2D;
        const sizedFormat = this._getRGBABufferInternalSizedFormat(type, format, useSRGBBuffer);
        const internalFormat = this._getInternalFormat(format);
        const textureType = this._getWebGLTextureType(type);
        this._bindTextureDirectly(target, texture);
        if (layers !== 0) {
          texture.is2DArray = true;
          gl.texImage3D(target, 0, sizedFormat, width, height, layers, 0, internalFormat, textureType, null);
        } else {
          gl.texImage2D(target, 0, sizedFormat, width, height, 0, internalFormat, textureType, null);
        }
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, filters.mag);
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, filters.min);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (generateMipMaps) {
          this._gl.generateMipmap(target);
        }
        this._bindTextureDirectly(target, null);
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
      /**
       * @internal
       */
      _getUseSRGBBuffer(useSRGBBuffer, noMipmap) {
        return useSRGBBuffer && this._caps.supportSRGBBuffers && (this.webGLVersion > 1 || this.isWebGPU || noMipmap);
      }
      _createTextureBase(url, noMipmap, invertY, scene, samplingMode = 3, onLoad = null, onError = null, prepareTexture, prepareTextureProcessFunction, buffer = null, fallback = null, format = null, forcedExtension = null, mimeType, loaderOptions, useSRGBBuffer) {
        url = url || "";
        const fromData = url.substr(0, 5) === "data:";
        const fromBlob = url.substr(0, 5) === "blob:";
        const isBase64 = fromData && url.indexOf(";base64,") !== -1;
        const texture = fallback ? fallback : new InternalTexture(this, InternalTextureSource.Url);
        if (texture !== fallback) {
          texture.label = url.substring(0, 60);
        }
        const originalUrl = url;
        if (this._transformTextureUrl && !isBase64 && !fallback && !buffer) {
          url = this._transformTextureUrl(url);
        }
        if (originalUrl !== url) {
          texture._originalUrl = originalUrl;
        }
        const lastDot = url.lastIndexOf(".");
        let extension = forcedExtension ? forcedExtension : lastDot > -1 ? url.substring(lastDot).toLowerCase() : "";
        let loader = null;
        const queryStringIndex = extension.indexOf("?");
        if (queryStringIndex > -1) {
          extension = extension.split("?")[0];
        }
        for (const availableLoader of _ThinEngine._TextureLoaders) {
          if (availableLoader.canLoad(extension, mimeType)) {
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
        texture._useSRGBBuffer = this._getUseSRGBBuffer(!!useSRGBBuffer, noMipmap);
        if (!this._doNotHandleContextLost) {
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
            if (EngineStore.UseFallbackTexture && url !== EngineStore.FallbackTexture) {
              this._createTextureBase(EngineStore.FallbackTexture, noMipmap, texture.invertY, scene, samplingMode, null, onError, prepareTexture, prepareTextureProcessFunction, buffer, texture);
            }
            message = (message || "Unknown error") + (EngineStore.UseFallbackTexture ? " - Fallback texture was used" : "");
            texture.onErrorObservable.notifyObservers({ message, exception });
            if (onError) {
              onError(message, exception);
            }
          } else {
            Logger.Warn(`Failed to load ${url}, falling back to ${originalUrl}`);
            this._createTextureBase(originalUrl, noMipmap, texture.invertY, scene, samplingMode, onLoad, onError, prepareTexture, prepareTextureProcessFunction, buffer, texture, format, forcedExtension, mimeType, loaderOptions, useSRGBBuffer);
          }
        };
        if (loader) {
          const callback = (data) => {
            loader.loadData(data, texture, (width, height, loadMipmap, isCompressed, done, loadFailed) => {
              if (loadFailed) {
                onInternalError("TextureLoader failed to load data");
              } else {
                prepareTexture(texture, extension, scene, { width, height }, texture.invertY, !loadMipmap, isCompressed, () => {
                  done();
                  return false;
                }, samplingMode);
              }
            }, loaderOptions);
          };
          if (!buffer) {
            this._loadFile(url, (data) => callback(new Uint8Array(data)), void 0, scene ? scene.offlineProvider : void 0, true, (request, exception) => {
              onInternalError("Unable to load " + (request ? request.responseURL : url, exception));
            });
          } else {
            if (buffer instanceof ArrayBuffer) {
              callback(new Uint8Array(buffer));
            } else if (ArrayBuffer.isView(buffer)) {
              callback(buffer);
            } else {
              if (onError) {
                onError("Unable to load: only ArrayBuffer or ArrayBufferView is supported", null);
              }
            }
          }
        } else {
          const onload = (img) => {
            if (fromBlob && !this._doNotHandleContextLost) {
              texture._buffer = img;
            }
            prepareTexture(texture, extension, scene, img, texture.invertY, noMipmap, false, prepareTextureProcessFunction, samplingMode);
          };
          if (!fromData || isBase64) {
            if (buffer && (typeof buffer.decoding === "string" || buffer.close)) {
              onload(buffer);
            } else {
              _ThinEngine._FileToolsLoadImage(url, onload, onInternalError, scene ? scene.offlineProvider : null, mimeType, texture.invertY && this._features.needsInvertingBitmap ? { imageOrientation: "flipY" } : void 0);
            }
          } else if (typeof buffer === "string" || buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer) || buffer instanceof Blob) {
            _ThinEngine._FileToolsLoadImage(buffer, onload, onInternalError, scene ? scene.offlineProvider : null, mimeType, texture.invertY && this._features.needsInvertingBitmap ? { imageOrientation: "flipY" } : void 0);
          } else if (buffer) {
            onload(buffer);
          }
        }
        return texture;
      }
      /**
       * Usually called from Texture.ts.
       * Passed information to create a WebGLTexture
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
      createTexture(url, noMipmap, invertY, scene, samplingMode = 3, onLoad = null, onError = null, buffer = null, fallback = null, format = null, forcedExtension = null, mimeType, loaderOptions, creationFlags, useSRGBBuffer) {
        return this._createTextureBase(url, noMipmap, invertY, scene, samplingMode, onLoad, onError, this._prepareWebGLTexture.bind(this), (potWidth, potHeight, img, extension, texture, continuationCallback) => {
          const gl = this._gl;
          const isPot = img.width === potWidth && img.height === potHeight;
          texture._creationFlags = creationFlags ?? 0;
          const tip = this._getTexImageParametersForCreateTexture(format, extension, texture._useSRGBBuffer);
          if (isPot) {
            gl.texImage2D(gl.TEXTURE_2D, 0, tip.internalFormat, tip.format, tip.type, img);
            return false;
          }
          const maxTextureSize = this._caps.maxTextureSize;
          if (img.width > maxTextureSize || img.height > maxTextureSize || !this._supportsHardwareTextureRescaling) {
            this._prepareWorkingCanvas();
            if (!this._workingCanvas || !this._workingContext) {
              return false;
            }
            this._workingCanvas.width = potWidth;
            this._workingCanvas.height = potHeight;
            this._workingContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, potWidth, potHeight);
            gl.texImage2D(gl.TEXTURE_2D, 0, tip.internalFormat, tip.format, tip.type, this._workingCanvas);
            texture.width = potWidth;
            texture.height = potHeight;
            return false;
          } else {
            const source = new InternalTexture(this, InternalTextureSource.Temp);
            this._bindTextureDirectly(gl.TEXTURE_2D, source, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, tip.internalFormat, tip.format, tip.type, img);
            this._rescaleTexture(source, texture, scene, tip.format, () => {
              this._releaseTexture(source);
              this._bindTextureDirectly(gl.TEXTURE_2D, texture, true);
              continuationCallback();
            });
          }
          return true;
        }, buffer, fallback, format, forcedExtension, mimeType, loaderOptions, useSRGBBuffer);
      }
      /**
       * Calls to the GL texImage2D and texImage3D functions require three arguments describing the pixel format of the texture.
       * createTexture derives these from the babylonFormat and useSRGBBuffer arguments and also the file extension of the URL it's working with.
       * This function encapsulates that derivation for easy unit testing.
       * @param babylonFormat Babylon's format enum, as specified in ITextureCreationOptions.
       * @param fileExtension The file extension including the dot, e.g. .jpg.
       * @param useSRGBBuffer Use SRGB not linear.
       * @returns The options to pass to texImage2D or texImage3D calls.
       * @internal
       */
      _getTexImageParametersForCreateTexture(babylonFormat, fileExtension, useSRGBBuffer) {
        if (babylonFormat === void 0 || babylonFormat === null) {
          babylonFormat = fileExtension === ".jpg" && !useSRGBBuffer ? 4 : 5;
        }
        let format, internalFormat;
        if (this.webGLVersion === 1) {
          format = this._getInternalFormat(babylonFormat, useSRGBBuffer);
          internalFormat = format;
        } else {
          format = this._getInternalFormat(babylonFormat, false);
          internalFormat = this._getRGBABufferInternalSizedFormat(0, babylonFormat, useSRGBBuffer);
        }
        return {
          internalFormat,
          format,
          type: this._gl.UNSIGNED_BYTE
        };
      }
      /**
       * Loads an image as an HTMLImageElement.
       * @param input url string, ArrayBuffer, or Blob to load
       * @param onLoad callback called when the image successfully loads
       * @param onError callback called when the image fails to load
       * @param offlineProvider offline provider for caching
       * @param mimeType optional mime type
       * @param imageBitmapOptions optional the options to use when creating an ImageBitmap
       * @returns the HTMLImageElement of the loaded image
       * @internal
       */
      static _FileToolsLoadImage(input, onLoad, onError, offlineProvider, mimeType, imageBitmapOptions) {
        throw _WarnImport("FileTools");
      }
      /**
       * @internal
       */
      _rescaleTexture(source, destination, scene, internalFormat, onComplete) {
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a raw texture
       * @param data defines the data to store in the texture
       * @param width defines the width of the texture
       * @param height defines the height of the texture
       * @param format defines the format of the data
       * @param generateMipMaps defines if the engine should generate the mip levels
       * @param invertY defines if data must be stored with Y axis inverted
       * @param samplingMode defines the required sampling mode (Texture.NEAREST_SAMPLINGMODE by default)
       * @param compression defines the compression used (null by default)
       * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_INT by default)
       * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
       * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
       * @returns the raw texture inside an InternalTexture
       */
      createRawTexture(data, width, height, format, generateMipMaps, invertY, samplingMode, compression = null, type = 0, creationFlags = 0, useSRGBBuffer = false) {
        throw _WarnImport("Engine.RawTexture");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a new raw cube texture
       * @param data defines the array of data to use to create each face
       * @param size defines the size of the textures
       * @param format defines the format of the data
       * @param type defines the type of the data (like Engine.TEXTURETYPE_UNSIGNED_INT)
       * @param generateMipMaps  defines if the engine should generate the mip levels
       * @param invertY defines if data must be stored with Y axis inverted
       * @param samplingMode defines the required sampling mode (like Texture.NEAREST_SAMPLINGMODE)
       * @param compression defines the compression used (null by default)
       * @returns the cube texture as an InternalTexture
       */
      createRawCubeTexture(data, size, format, type, generateMipMaps, invertY, samplingMode, compression = null) {
        throw _WarnImport("Engine.RawTexture");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a new raw 3D texture
       * @param data defines the data used to create the texture
       * @param width defines the width of the texture
       * @param height defines the height of the texture
       * @param depth defines the depth of the texture
       * @param format defines the format of the texture
       * @param generateMipMaps defines if the engine must generate mip levels
       * @param invertY defines if data must be stored with Y axis inverted
       * @param samplingMode defines the required sampling mode (like Texture.NEAREST_SAMPLINGMODE)
       * @param compression defines the compressed used (can be null)
       * @param textureType defines the compressed used (can be null)
       * @returns a new raw 3D texture (stored in an InternalTexture)
       */
      createRawTexture3D(data, width, height, depth, format, generateMipMaps, invertY, samplingMode, compression = null, textureType = 0) {
        throw _WarnImport("Engine.RawTexture");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Creates a new raw 2D array texture
       * @param data defines the data used to create the texture
       * @param width defines the width of the texture
       * @param height defines the height of the texture
       * @param depth defines the number of layers of the texture
       * @param format defines the format of the texture
       * @param generateMipMaps defines if the engine must generate mip levels
       * @param invertY defines if data must be stored with Y axis inverted
       * @param samplingMode defines the required sampling mode (like Texture.NEAREST_SAMPLINGMODE)
       * @param compression defines the compressed used (can be null)
       * @param textureType defines the compressed used (can be null)
       * @returns a new raw 2D array texture (stored in an InternalTexture)
       */
      createRawTexture2DArray(data, width, height, depth, format, generateMipMaps, invertY, samplingMode, compression = null, textureType = 0) {
        throw _WarnImport("Engine.RawTexture");
      }
      /**
       * @internal
       */
      _unpackFlipY(value) {
        if (this._unpackFlipYCached !== value) {
          this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, value ? 1 : 0);
          if (this.enableUnpackFlipYCached) {
            this._unpackFlipYCached = value;
          }
        }
      }
      /** @internal */
      _getUnpackAlignement() {
        return this._gl.getParameter(this._gl.UNPACK_ALIGNMENT);
      }
      _getTextureTarget(texture) {
        if (texture.isCube) {
          return this._gl.TEXTURE_CUBE_MAP;
        } else if (texture.is3D) {
          return this._gl.TEXTURE_3D;
        } else if (texture.is2DArray || texture.isMultiview) {
          return this._gl.TEXTURE_2D_ARRAY;
        }
        return this._gl.TEXTURE_2D;
      }
      /**
       * Update the sampling mode of a given texture
       * @param samplingMode defines the required sampling mode
       * @param texture defines the texture to update
       * @param generateMipMaps defines whether to generate mipmaps for the texture
       */
      updateTextureSamplingMode(samplingMode, texture, generateMipMaps = false) {
        const target = this._getTextureTarget(texture);
        const filters = this._getSamplingParameters(samplingMode, texture.useMipMaps || generateMipMaps);
        this._setTextureParameterInteger(target, this._gl.TEXTURE_MAG_FILTER, filters.mag, texture);
        this._setTextureParameterInteger(target, this._gl.TEXTURE_MIN_FILTER, filters.min);
        if (generateMipMaps) {
          texture.generateMipMaps = true;
          this._gl.generateMipmap(target);
        }
        this._bindTextureDirectly(target, null);
        texture.samplingMode = samplingMode;
      }
      /**
       * Update the dimensions of a texture
       * @param texture texture to update
       * @param width new width of the texture
       * @param height new height of the texture
       * @param depth new depth of the texture
       */
      updateTextureDimensions(texture, width, height, depth = 1) {
      }
      /**
       * Update the sampling mode of a given texture
       * @param texture defines the texture to update
       * @param wrapU defines the texture wrap mode of the u coordinates
       * @param wrapV defines the texture wrap mode of the v coordinates
       * @param wrapR defines the texture wrap mode of the r coordinates
       */
      updateTextureWrappingMode(texture, wrapU, wrapV = null, wrapR = null) {
        const target = this._getTextureTarget(texture);
        if (wrapU !== null) {
          this._setTextureParameterInteger(target, this._gl.TEXTURE_WRAP_S, this._getTextureWrapMode(wrapU), texture);
          texture._cachedWrapU = wrapU;
        }
        if (wrapV !== null) {
          this._setTextureParameterInteger(target, this._gl.TEXTURE_WRAP_T, this._getTextureWrapMode(wrapV), texture);
          texture._cachedWrapV = wrapV;
        }
        if ((texture.is2DArray || texture.is3D) && wrapR !== null) {
          this._setTextureParameterInteger(target, this._gl.TEXTURE_WRAP_R, this._getTextureWrapMode(wrapR), texture);
          texture._cachedWrapR = wrapR;
        }
        this._bindTextureDirectly(target, null);
      }
      /**
       * @internal
       */
      _setupDepthStencilTexture(internalTexture, size, generateStencil, bilinearFiltering, comparisonFunction, samples = 1) {
        const width = size.width || size;
        const height = size.height || size;
        const layers = size.layers || 0;
        internalTexture.baseWidth = width;
        internalTexture.baseHeight = height;
        internalTexture.width = width;
        internalTexture.height = height;
        internalTexture.is2DArray = layers > 0;
        internalTexture.depth = layers;
        internalTexture.isReady = true;
        internalTexture.samples = samples;
        internalTexture.generateMipMaps = false;
        internalTexture.samplingMode = bilinearFiltering ? 2 : 1;
        internalTexture.type = 0;
        internalTexture._comparisonFunction = comparisonFunction;
        const gl = this._gl;
        const target = this._getTextureTarget(internalTexture);
        const samplingParameters = this._getSamplingParameters(internalTexture.samplingMode, false);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, samplingParameters.mag);
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, samplingParameters.min);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (this.webGLVersion > 1) {
          if (comparisonFunction === 0) {
            gl.texParameteri(target, gl.TEXTURE_COMPARE_FUNC, 515);
            gl.texParameteri(target, gl.TEXTURE_COMPARE_MODE, gl.NONE);
          } else {
            gl.texParameteri(target, gl.TEXTURE_COMPARE_FUNC, comparisonFunction);
            gl.texParameteri(target, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
          }
        }
      }
      /**
       * @internal
       */
      _uploadCompressedDataToTextureDirectly(texture, internalFormat, width, height, data, faceIndex = 0, lod = 0) {
        const gl = this._gl;
        let target = gl.TEXTURE_2D;
        if (texture.isCube) {
          target = gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex;
        }
        if (texture._useSRGBBuffer) {
          switch (internalFormat) {
            case 37492:
            case 36196:
              if (this._caps.etc2) {
                internalFormat = gl.COMPRESSED_SRGB8_ETC2;
              } else {
                texture._useSRGBBuffer = false;
              }
              break;
            case 37496:
              if (this._caps.etc2) {
                internalFormat = gl.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
              } else {
                texture._useSRGBBuffer = false;
              }
              break;
            case 36492:
              internalFormat = gl.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT;
              break;
            case 37808:
              internalFormat = gl.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
              break;
            case 33776:
              if (this._caps.s3tc_srgb) {
                internalFormat = gl.COMPRESSED_SRGB_S3TC_DXT1_EXT;
              } else {
                texture._useSRGBBuffer = false;
              }
              break;
            case 33777:
              if (this._caps.s3tc_srgb) {
                internalFormat = gl.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
              } else {
                texture._useSRGBBuffer = false;
              }
              break;
            case 33779:
              if (this._caps.s3tc_srgb) {
                internalFormat = gl.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
              } else {
                texture._useSRGBBuffer = false;
              }
              break;
            default:
              texture._useSRGBBuffer = false;
              break;
          }
        }
        this._gl.compressedTexImage2D(target, lod, internalFormat, width, height, 0, data);
      }
      /**
       * @internal
       */
      _uploadDataToTextureDirectly(texture, imageData, faceIndex = 0, lod = 0, babylonInternalFormat, useTextureWidthAndHeight = false) {
        const gl = this._gl;
        const textureType = this._getWebGLTextureType(texture.type);
        const format = this._getInternalFormat(texture.format);
        const internalFormat = babylonInternalFormat === void 0 ? this._getRGBABufferInternalSizedFormat(texture.type, texture.format, texture._useSRGBBuffer) : this._getInternalFormat(babylonInternalFormat, texture._useSRGBBuffer);
        this._unpackFlipY(texture.invertY);
        let target = gl.TEXTURE_2D;
        if (texture.isCube) {
          target = gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex;
        }
        const lodMaxWidth = Math.round(Math.log(texture.width) * Math.LOG2E);
        const lodMaxHeight = Math.round(Math.log(texture.height) * Math.LOG2E);
        const width = useTextureWidthAndHeight ? texture.width : Math.pow(2, Math.max(lodMaxWidth - lod, 0));
        const height = useTextureWidthAndHeight ? texture.height : Math.pow(2, Math.max(lodMaxHeight - lod, 0));
        gl.texImage2D(target, lod, internalFormat, width, height, 0, format, textureType, imageData);
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
        const gl = this._gl;
        const textureType = this._getWebGLTextureType(texture.type);
        const format = this._getInternalFormat(texture.format);
        this._unpackFlipY(texture.invertY);
        let targetForBinding = gl.TEXTURE_2D;
        let target = gl.TEXTURE_2D;
        if (texture.isCube) {
          target = gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex;
          targetForBinding = gl.TEXTURE_CUBE_MAP;
        }
        this._bindTextureDirectly(targetForBinding, texture, true);
        gl.texSubImage2D(target, lod, xOffset, yOffset, width, height, format, textureType, imageData);
        if (generateMipMaps) {
          this._gl.generateMipmap(target);
        }
        this._bindTextureDirectly(targetForBinding, null);
      }
      /**
       * @internal
       */
      _uploadArrayBufferViewToTexture(texture, imageData, faceIndex = 0, lod = 0) {
        const gl = this._gl;
        const bindTarget = texture.isCube ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D;
        this._bindTextureDirectly(bindTarget, texture, true);
        this._uploadDataToTextureDirectly(texture, imageData, faceIndex, lod);
        this._bindTextureDirectly(bindTarget, null, true);
      }
      _prepareWebGLTextureContinuation(texture, scene, noMipmap, isCompressed, samplingMode) {
        const gl = this._gl;
        if (!gl) {
          return;
        }
        const filters = this._getSamplingParameters(samplingMode, !noMipmap);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filters.mag);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filters.min);
        if (!noMipmap && !isCompressed) {
          gl.generateMipmap(gl.TEXTURE_2D);
        }
        this._bindTextureDirectly(gl.TEXTURE_2D, null);
        if (scene) {
          scene.removePendingData(texture);
        }
        texture.onLoadedObservable.notifyObservers(texture);
        texture.onLoadedObservable.clear();
      }
      _prepareWebGLTexture(texture, extension, scene, img, invertY, noMipmap, isCompressed, processFunction, samplingMode = 3) {
        const maxTextureSize = this.getCaps().maxTextureSize;
        const potWidth = Math.min(maxTextureSize, this.needPOTTextures ? _ThinEngine.GetExponentOfTwo(img.width, maxTextureSize) : img.width);
        const potHeight = Math.min(maxTextureSize, this.needPOTTextures ? _ThinEngine.GetExponentOfTwo(img.height, maxTextureSize) : img.height);
        const gl = this._gl;
        if (!gl) {
          return;
        }
        if (!texture._hardwareTexture) {
          if (scene) {
            scene.removePendingData(texture);
          }
          return;
        }
        this._bindTextureDirectly(gl.TEXTURE_2D, texture, true);
        this._unpackFlipY(invertY === void 0 ? true : invertY ? true : false);
        texture.baseWidth = img.width;
        texture.baseHeight = img.height;
        texture.width = potWidth;
        texture.height = potHeight;
        texture.isReady = true;
        texture.type = texture.type !== -1 ? texture.type : 0;
        texture.format = texture.format !== -1 ? texture.format : extension === ".jpg" && !texture._useSRGBBuffer ? 4 : 5;
        if (processFunction(potWidth, potHeight, img, extension, texture, () => {
          this._prepareWebGLTextureContinuation(texture, scene, noMipmap, isCompressed, samplingMode);
        })) {
          return;
        }
        this._prepareWebGLTextureContinuation(texture, scene, noMipmap, isCompressed, samplingMode);
      }
      /**
       * @internal
       */
      _setupFramebufferDepthAttachments(generateStencilBuffer, generateDepthBuffer, width, height, samples = 1) {
        const gl = this._gl;
        if (generateStencilBuffer && generateDepthBuffer) {
          return this._createRenderBuffer(width, height, samples, gl.DEPTH_STENCIL, gl.DEPTH24_STENCIL8, gl.DEPTH_STENCIL_ATTACHMENT);
        }
        if (generateDepthBuffer) {
          let depthFormat = gl.DEPTH_COMPONENT16;
          if (this._webGLVersion > 1) {
            depthFormat = gl.DEPTH_COMPONENT32F;
          }
          return this._createRenderBuffer(width, height, samples, depthFormat, depthFormat, gl.DEPTH_ATTACHMENT);
        }
        if (generateStencilBuffer) {
          return this._createRenderBuffer(width, height, samples, gl.STENCIL_INDEX8, gl.STENCIL_INDEX8, gl.STENCIL_ATTACHMENT);
        }
        return null;
      }
      /**
       * @internal
       */
      _createRenderBuffer(width, height, samples, internalFormat, msInternalFormat, attachment, unbindBuffer = true) {
        const gl = this._gl;
        const renderBuffer = gl.createRenderbuffer();
        return this._updateRenderBuffer(renderBuffer, width, height, samples, internalFormat, msInternalFormat, attachment, unbindBuffer);
      }
      _updateRenderBuffer(renderBuffer, width, height, samples, internalFormat, msInternalFormat, attachment, unbindBuffer = true) {
        const gl = this._gl;
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
        if (samples > 1 && gl.renderbufferStorageMultisample) {
          gl.renderbufferStorageMultisample(gl.RENDERBUFFER, samples, msInternalFormat, width, height);
        } else {
          gl.renderbufferStorage(gl.RENDERBUFFER, internalFormat, width, height);
        }
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderBuffer);
        if (unbindBuffer) {
          gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }
        return renderBuffer;
      }
      /**
       * @internal
       */
      _releaseTexture(texture) {
        var _a;
        this._deleteTexture((_a = texture._hardwareTexture) == null ? void 0 : _a.underlyingResource);
        this.unbindAllTextures();
        const index = this._internalTexturesCache.indexOf(texture);
        if (index !== -1) {
          this._internalTexturesCache.splice(index, 1);
        }
        if (texture._lodTextureHigh) {
          texture._lodTextureHigh.dispose();
        }
        if (texture._lodTextureMid) {
          texture._lodTextureMid.dispose();
        }
        if (texture._lodTextureLow) {
          texture._lodTextureLow.dispose();
        }
        if (texture._irradianceTexture) {
          texture._irradianceTexture.dispose();
        }
      }
      /**
       * @internal
       */
      _releaseRenderTargetWrapper(rtWrapper) {
        const index = this._renderTargetWrapperCache.indexOf(rtWrapper);
        if (index !== -1) {
          this._renderTargetWrapperCache.splice(index, 1);
        }
      }
      _deleteTexture(texture) {
        if (texture) {
          this._gl.deleteTexture(texture);
        }
      }
      _setProgram(program) {
        if (this._currentProgram !== program) {
          this._gl.useProgram(program);
          this._currentProgram = program;
        }
      }
      /**
       * Binds an effect to the webGL context
       * @param effect defines the effect to bind
       */
      bindSamplers(effect) {
        const webGLPipelineContext = effect.getPipelineContext();
        this._setProgram(webGLPipelineContext.program);
        const samplers = effect.getSamplers();
        for (let index = 0; index < samplers.length; index++) {
          const uniform = effect.getUniform(samplers[index]);
          if (uniform) {
            this._boundUniforms[index] = uniform;
          }
        }
        this._currentEffect = null;
      }
      _activateCurrentTexture() {
        if (this._currentTextureChannel !== this._activeChannel) {
          this._gl.activeTexture(this._gl.TEXTURE0 + this._activeChannel);
          this._currentTextureChannel = this._activeChannel;
        }
      }
      /**
       * @internal
       */
      _bindTextureDirectly(target, texture, forTextureDataUpdate = false, force = false) {
        var _a;
        let wasPreviouslyBound = false;
        const isTextureForRendering = texture && texture._associatedChannel > -1;
        if (forTextureDataUpdate && isTextureForRendering) {
          this._activeChannel = texture._associatedChannel;
        }
        const currentTextureBound = this._boundTexturesCache[this._activeChannel];
        if (currentTextureBound !== texture || force) {
          this._activateCurrentTexture();
          if (texture && texture.isMultiview) {
            Logger.Error(["_bindTextureDirectly called with a multiview texture!", target, texture]);
            throw "_bindTextureDirectly called with a multiview texture!";
          } else {
            this._gl.bindTexture(target, ((_a = texture == null ? void 0 : texture._hardwareTexture) == null ? void 0 : _a.underlyingResource) ?? null);
          }
          this._boundTexturesCache[this._activeChannel] = texture;
          if (texture) {
            texture._associatedChannel = this._activeChannel;
          }
        } else if (forTextureDataUpdate) {
          wasPreviouslyBound = true;
          this._activateCurrentTexture();
        }
        if (isTextureForRendering && !forTextureDataUpdate) {
          this._bindSamplerUniformToChannel(texture._associatedChannel, this._activeChannel);
        }
        return wasPreviouslyBound;
      }
      /**
       * @internal
       */
      _bindTexture(channel, texture, name) {
        if (channel === void 0) {
          return;
        }
        if (texture) {
          texture._associatedChannel = channel;
        }
        this._activeChannel = channel;
        const target = texture ? this._getTextureTarget(texture) : this._gl.TEXTURE_2D;
        this._bindTextureDirectly(target, texture);
      }
      /**
       * Unbind all textures from the webGL context
       */
      unbindAllTextures() {
        for (let channel = 0; channel < this._maxSimultaneousTextures; channel++) {
          this._activeChannel = channel;
          this._bindTextureDirectly(this._gl.TEXTURE_2D, null);
          this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);
          if (this.webGLVersion > 1) {
            this._bindTextureDirectly(this._gl.TEXTURE_3D, null);
            this._bindTextureDirectly(this._gl.TEXTURE_2D_ARRAY, null);
          }
        }
      }
      /**
       * Sets a texture to the according uniform.
       * @param channel The texture channel
       * @param uniform The uniform to set
       * @param texture The texture to apply
       * @param name The name of the uniform in the effect
       */
      setTexture(channel, uniform, texture, name) {
        if (channel === void 0) {
          return;
        }
        if (uniform) {
          this._boundUniforms[channel] = uniform;
        }
        this._setTexture(channel, texture);
      }
      _bindSamplerUniformToChannel(sourceSlot, destination) {
        const uniform = this._boundUniforms[sourceSlot];
        if (!uniform || uniform._currentState === destination) {
          return;
        }
        this._gl.uniform1i(uniform, destination);
        uniform._currentState = destination;
      }
      _getTextureWrapMode(mode) {
        switch (mode) {
          case 1:
            return this._gl.REPEAT;
          case 0:
            return this._gl.CLAMP_TO_EDGE;
          case 2:
            return this._gl.MIRRORED_REPEAT;
        }
        return this._gl.REPEAT;
      }
      _setTexture(channel, texture, isPartOfTextureArray = false, depthStencilTexture = false, name = "") {
        if (!texture) {
          if (this._boundTexturesCache[channel] != null) {
            this._activeChannel = channel;
            this._bindTextureDirectly(this._gl.TEXTURE_2D, null);
            this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);
            if (this.webGLVersion > 1) {
              this._bindTextureDirectly(this._gl.TEXTURE_3D, null);
              this._bindTextureDirectly(this._gl.TEXTURE_2D_ARRAY, null);
            }
          }
          return false;
        }
        if (texture.video) {
          this._activeChannel = channel;
          const videoInternalTexture = texture.getInternalTexture();
          if (videoInternalTexture) {
            videoInternalTexture._associatedChannel = channel;
          }
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
        if (!isPartOfTextureArray && internalTexture) {
          internalTexture._associatedChannel = channel;
        }
        let needToBind = true;
        if (this._boundTexturesCache[channel] === internalTexture) {
          if (!isPartOfTextureArray) {
            this._bindSamplerUniformToChannel(internalTexture._associatedChannel, channel);
          }
          needToBind = false;
        }
        this._activeChannel = channel;
        const target = this._getTextureTarget(internalTexture);
        if (needToBind) {
          this._bindTextureDirectly(target, internalTexture, isPartOfTextureArray);
        }
        if (internalTexture && !internalTexture.isMultiview) {
          if (internalTexture.isCube && internalTexture._cachedCoordinatesMode !== texture.coordinatesMode) {
            internalTexture._cachedCoordinatesMode = texture.coordinatesMode;
            const textureWrapMode = texture.coordinatesMode !== 3 && texture.coordinatesMode !== 5 ? 1 : 0;
            texture.wrapU = textureWrapMode;
            texture.wrapV = textureWrapMode;
          }
          if (internalTexture._cachedWrapU !== texture.wrapU) {
            internalTexture._cachedWrapU = texture.wrapU;
            this._setTextureParameterInteger(target, this._gl.TEXTURE_WRAP_S, this._getTextureWrapMode(texture.wrapU), internalTexture);
          }
          if (internalTexture._cachedWrapV !== texture.wrapV) {
            internalTexture._cachedWrapV = texture.wrapV;
            this._setTextureParameterInteger(target, this._gl.TEXTURE_WRAP_T, this._getTextureWrapMode(texture.wrapV), internalTexture);
          }
          if (internalTexture.is3D && internalTexture._cachedWrapR !== texture.wrapR) {
            internalTexture._cachedWrapR = texture.wrapR;
            this._setTextureParameterInteger(target, this._gl.TEXTURE_WRAP_R, this._getTextureWrapMode(texture.wrapR), internalTexture);
          }
          this._setAnisotropicLevel(target, internalTexture, texture.anisotropicFilteringLevel);
        }
        return true;
      }
      /**
       * Sets an array of texture to the webGL context
       * @param channel defines the channel where the texture array must be set
       * @param uniform defines the associated uniform location
       * @param textures defines the array of textures to bind
       * @param name name of the channel
       */
      setTextureArray(channel, uniform, textures, name) {
        if (channel === void 0 || !uniform) {
          return;
        }
        if (!this._textureUnits || this._textureUnits.length !== textures.length) {
          this._textureUnits = new Int32Array(textures.length);
        }
        for (let i = 0; i < textures.length; i++) {
          const texture = textures[i].getInternalTexture();
          if (texture) {
            this._textureUnits[i] = channel + i;
            texture._associatedChannel = channel + i;
          } else {
            this._textureUnits[i] = -1;
          }
        }
        this._gl.uniform1iv(uniform, this._textureUnits);
        for (let index = 0; index < textures.length; index++) {
          this._setTexture(this._textureUnits[index], textures[index], true);
        }
      }
      /**
       * @internal
       */
      _setAnisotropicLevel(target, internalTexture, anisotropicFilteringLevel) {
        const anisotropicFilterExtension = this._caps.textureAnisotropicFilterExtension;
        if (internalTexture.samplingMode !== 11 && internalTexture.samplingMode !== 3 && internalTexture.samplingMode !== 2) {
          anisotropicFilteringLevel = 1;
        }
        if (anisotropicFilterExtension && internalTexture._cachedAnisotropicFilteringLevel !== anisotropicFilteringLevel) {
          this._setTextureParameterFloat(target, anisotropicFilterExtension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(anisotropicFilteringLevel, this._caps.maxAnisotropy), internalTexture);
          internalTexture._cachedAnisotropicFilteringLevel = anisotropicFilteringLevel;
        }
      }
      _setTextureParameterFloat(target, parameter, value, texture) {
        this._bindTextureDirectly(target, texture, true, true);
        this._gl.texParameterf(target, parameter, value);
      }
      _setTextureParameterInteger(target, parameter, value, texture) {
        if (texture) {
          this._bindTextureDirectly(target, texture, true, true);
        }
        this._gl.texParameteri(target, parameter, value);
      }
      /**
       * Unbind all vertex attributes from the webGL context
       */
      unbindAllAttributes() {
        if (this._mustWipeVertexAttributes) {
          this._mustWipeVertexAttributes = false;
          for (let i = 0; i < this._caps.maxVertexAttribs; i++) {
            this.disableAttributeByIndex(i);
          }
          return;
        }
        for (let i = 0, ul = this._vertexAttribArraysEnabled.length; i < ul; i++) {
          if (i >= this._caps.maxVertexAttribs || !this._vertexAttribArraysEnabled[i]) {
            continue;
          }
          this.disableAttributeByIndex(i);
        }
      }
      /**
       * Force the engine to release all cached effects. This means that next effect compilation will have to be done completely even if a similar effect was already compiled
       */
      releaseEffects() {
        for (const name in this._compiledEffects) {
          const webGLPipelineContext = this._compiledEffects[name].getPipelineContext();
          this._deletePipelineContext(webGLPipelineContext);
        }
        this._compiledEffects = {};
      }
      /**
       * Dispose and release all associated resources
       */
      dispose() {
        var _a, _b;
        this._isDisposed = true;
        this.stopRenderLoop();
        if (this.onBeforeTextureInitObservable) {
          this.onBeforeTextureInitObservable.clear();
        }
        if (this._emptyTexture) {
          this._releaseTexture(this._emptyTexture);
          this._emptyTexture = null;
        }
        if (this._emptyCubeTexture) {
          this._releaseTexture(this._emptyCubeTexture);
          this._emptyCubeTexture = null;
        }
        if (this._dummyFramebuffer) {
          this._gl.deleteFramebuffer(this._dummyFramebuffer);
        }
        this.releaseEffects();
        (_a = this.releaseComputeEffects) == null ? void 0 : _a.call(this);
        this.unbindAllAttributes();
        this._boundUniforms = {};
        if (IsWindowObjectExist()) {
          if (this._renderingCanvas) {
            if (!this._doNotHandleContextLost) {
              this._renderingCanvas.removeEventListener("webglcontextlost", this._onContextLost);
              this._renderingCanvas.removeEventListener("webglcontextrestored", this._onContextRestored);
            }
            window.removeEventListener("resize", this._checkForMobile);
          }
        }
        this._workingCanvas = null;
        this._workingContext = null;
        this._currentBufferPointers.length = 0;
        this._renderingCanvas = null;
        this._currentProgram = null;
        this._boundRenderFunction = null;
        Effect.ResetCache();
        for (const request of this._activeRequests) {
          request.abort();
        }
        this.onDisposeObservable.notifyObservers(this);
        this.onDisposeObservable.clear();
        if (this._creationOptions.loseContextOnDispose) {
          (_b = this._gl.getExtension("WEBGL_lose_context")) == null ? void 0 : _b.loseContext();
        }
      }
      /**
       * Attach a new callback raised when context lost event is fired
       * @param callback defines the callback to call
       */
      attachContextLostEvent(callback) {
        if (this._renderingCanvas) {
          this._renderingCanvas.addEventListener("webglcontextlost", callback, false);
        }
      }
      /**
       * Attach a new callback raised when context restored event is fired
       * @param callback defines the callback to call
       */
      attachContextRestoredEvent(callback) {
        if (this._renderingCanvas) {
          this._renderingCanvas.addEventListener("webglcontextrestored", callback, false);
        }
      }
      /**
       * Get the current error code of the webGL context
       * @returns the error code
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError
       */
      getError() {
        return this._gl.getError();
      }
      _canRenderToFloatFramebuffer() {
        if (this._webGLVersion > 1) {
          return this._caps.colorBufferFloat;
        }
        return this._canRenderToFramebuffer(1);
      }
      _canRenderToHalfFloatFramebuffer() {
        if (this._webGLVersion > 1) {
          return this._caps.colorBufferFloat;
        }
        return this._canRenderToFramebuffer(2);
      }
      // Thank you : http://stackoverflow.com/questions/28827511/webgl-ios-render-to-floating-point-texture
      _canRenderToFramebuffer(type) {
        const gl = this._gl;
        while (gl.getError() !== gl.NO_ERROR) {
        }
        let successful = true;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, this._getRGBABufferInternalSizedFormat(type), 1, 1, 0, gl.RGBA, this._getWebGLTextureType(type), null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        successful = successful && status === gl.FRAMEBUFFER_COMPLETE;
        successful = successful && gl.getError() === gl.NO_ERROR;
        if (successful) {
          gl.clear(gl.COLOR_BUFFER_BIT);
          successful = successful && gl.getError() === gl.NO_ERROR;
        }
        if (successful) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          const readFormat = gl.RGBA;
          const readType = gl.UNSIGNED_BYTE;
          const buffer = new Uint8Array(4);
          gl.readPixels(0, 0, 1, 1, readFormat, readType, buffer);
          successful = successful && gl.getError() === gl.NO_ERROR;
        }
        gl.deleteTexture(texture);
        gl.deleteFramebuffer(fb);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        while (!successful && gl.getError() !== gl.NO_ERROR) {
        }
        return successful;
      }
      /**
       * @internal
       */
      _getWebGLTextureType(type) {
        if (this._webGLVersion === 1) {
          switch (type) {
            case 1:
              return this._gl.FLOAT;
            case 2:
              return this._gl.HALF_FLOAT_OES;
            case 0:
              return this._gl.UNSIGNED_BYTE;
            case 8:
              return this._gl.UNSIGNED_SHORT_4_4_4_4;
            case 9:
              return this._gl.UNSIGNED_SHORT_5_5_5_1;
            case 10:
              return this._gl.UNSIGNED_SHORT_5_6_5;
          }
          return this._gl.UNSIGNED_BYTE;
        }
        switch (type) {
          case 3:
            return this._gl.BYTE;
          case 0:
            return this._gl.UNSIGNED_BYTE;
          case 4:
            return this._gl.SHORT;
          case 5:
            return this._gl.UNSIGNED_SHORT;
          case 6:
            return this._gl.INT;
          case 7:
            return this._gl.UNSIGNED_INT;
          case 1:
            return this._gl.FLOAT;
          case 2:
            return this._gl.HALF_FLOAT;
          case 8:
            return this._gl.UNSIGNED_SHORT_4_4_4_4;
          case 9:
            return this._gl.UNSIGNED_SHORT_5_5_5_1;
          case 10:
            return this._gl.UNSIGNED_SHORT_5_6_5;
          case 11:
            return this._gl.UNSIGNED_INT_2_10_10_10_REV;
          case 12:
            return this._gl.UNSIGNED_INT_24_8;
          case 13:
            return this._gl.UNSIGNED_INT_10F_11F_11F_REV;
          case 14:
            return this._gl.UNSIGNED_INT_5_9_9_9_REV;
          case 15:
            return this._gl.FLOAT_32_UNSIGNED_INT_24_8_REV;
        }
        return this._gl.UNSIGNED_BYTE;
      }
      /**
       * @internal
       */
      _getInternalFormat(format, useSRGBBuffer = false) {
        let internalFormat = useSRGBBuffer ? this._glSRGBExtensionValues.SRGB8_ALPHA8 : this._gl.RGBA;
        switch (format) {
          case 0:
            internalFormat = this._gl.ALPHA;
            break;
          case 1:
            internalFormat = this._gl.LUMINANCE;
            break;
          case 2:
            internalFormat = this._gl.LUMINANCE_ALPHA;
            break;
          case 6:
            internalFormat = this._gl.RED;
            break;
          case 7:
            internalFormat = this._gl.RG;
            break;
          case 4:
            internalFormat = useSRGBBuffer ? this._glSRGBExtensionValues.SRGB : this._gl.RGB;
            break;
          case 5:
            internalFormat = useSRGBBuffer ? this._glSRGBExtensionValues.SRGB8_ALPHA8 : this._gl.RGBA;
            break;
        }
        if (this._webGLVersion > 1) {
          switch (format) {
            case 8:
              internalFormat = this._gl.RED_INTEGER;
              break;
            case 9:
              internalFormat = this._gl.RG_INTEGER;
              break;
            case 10:
              internalFormat = this._gl.RGB_INTEGER;
              break;
            case 11:
              internalFormat = this._gl.RGBA_INTEGER;
              break;
          }
        }
        return internalFormat;
      }
      /**
       * @internal
       */
      _getRGBABufferInternalSizedFormat(type, format, useSRGBBuffer = false) {
        if (this._webGLVersion === 1) {
          if (format !== void 0) {
            switch (format) {
              case 0:
                return this._gl.ALPHA;
              case 1:
                return this._gl.LUMINANCE;
              case 2:
                return this._gl.LUMINANCE_ALPHA;
              case 4:
                return useSRGBBuffer ? this._glSRGBExtensionValues.SRGB : this._gl.RGB;
            }
          }
          return this._gl.RGBA;
        }
        switch (type) {
          case 3:
            switch (format) {
              case 6:
                return this._gl.R8_SNORM;
              case 7:
                return this._gl.RG8_SNORM;
              case 4:
                return this._gl.RGB8_SNORM;
              case 8:
                return this._gl.R8I;
              case 9:
                return this._gl.RG8I;
              case 10:
                return this._gl.RGB8I;
              case 11:
                return this._gl.RGBA8I;
              default:
                return this._gl.RGBA8_SNORM;
            }
          case 0:
            switch (format) {
              case 6:
                return this._gl.R8;
              case 7:
                return this._gl.RG8;
              case 4:
                return useSRGBBuffer ? this._glSRGBExtensionValues.SRGB8 : this._gl.RGB8;
              case 5:
                return useSRGBBuffer ? this._glSRGBExtensionValues.SRGB8_ALPHA8 : this._gl.RGBA8;
              case 8:
                return this._gl.R8UI;
              case 9:
                return this._gl.RG8UI;
              case 10:
                return this._gl.RGB8UI;
              case 11:
                return this._gl.RGBA8UI;
              case 0:
                return this._gl.ALPHA;
              case 1:
                return this._gl.LUMINANCE;
              case 2:
                return this._gl.LUMINANCE_ALPHA;
              default:
                return this._gl.RGBA8;
            }
          case 4:
            switch (format) {
              case 8:
                return this._gl.R16I;
              case 9:
                return this._gl.RG16I;
              case 10:
                return this._gl.RGB16I;
              case 11:
                return this._gl.RGBA16I;
              default:
                return this._gl.RGBA16I;
            }
          case 5:
            switch (format) {
              case 8:
                return this._gl.R16UI;
              case 9:
                return this._gl.RG16UI;
              case 10:
                return this._gl.RGB16UI;
              case 11:
                return this._gl.RGBA16UI;
              default:
                return this._gl.RGBA16UI;
            }
          case 6:
            switch (format) {
              case 8:
                return this._gl.R32I;
              case 9:
                return this._gl.RG32I;
              case 10:
                return this._gl.RGB32I;
              case 11:
                return this._gl.RGBA32I;
              default:
                return this._gl.RGBA32I;
            }
          case 7:
            switch (format) {
              case 8:
                return this._gl.R32UI;
              case 9:
                return this._gl.RG32UI;
              case 10:
                return this._gl.RGB32UI;
              case 11:
                return this._gl.RGBA32UI;
              default:
                return this._gl.RGBA32UI;
            }
          case 1:
            switch (format) {
              case 6:
                return this._gl.R32F;
              case 7:
                return this._gl.RG32F;
              case 4:
                return this._gl.RGB32F;
              case 5:
                return this._gl.RGBA32F;
              default:
                return this._gl.RGBA32F;
            }
          case 2:
            switch (format) {
              case 6:
                return this._gl.R16F;
              case 7:
                return this._gl.RG16F;
              case 4:
                return this._gl.RGB16F;
              case 5:
                return this._gl.RGBA16F;
              default:
                return this._gl.RGBA16F;
            }
          case 10:
            return this._gl.RGB565;
          case 13:
            return this._gl.R11F_G11F_B10F;
          case 14:
            return this._gl.RGB9_E5;
          case 8:
            return this._gl.RGBA4;
          case 9:
            return this._gl.RGB5_A1;
          case 11:
            switch (format) {
              case 5:
                return this._gl.RGB10_A2;
              case 11:
                return this._gl.RGB10_A2UI;
              default:
                return this._gl.RGB10_A2;
            }
        }
        return useSRGBBuffer ? this._glSRGBExtensionValues.SRGB8_ALPHA8 : this._gl.RGBA8;
      }
      /**
       * @internal
       */
      _loadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError) {
        const request = _ThinEngine._FileToolsLoadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError);
        this._activeRequests.push(request);
        request.onCompleteObservable.add((request2) => {
          this._activeRequests.splice(this._activeRequests.indexOf(request2), 1);
        });
        return request;
      }
      /**
       * Loads a file from a url
       * @param url url to load
       * @param onSuccess callback called when the file successfully loads
       * @param onProgress callback called while file is loading (if the server supports this mode)
       * @param offlineProvider defines the offline provider for caching
       * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
       * @param onError callback called when the file fails to load
       * @returns a file request object
       * @internal
       */
      static _FileToolsLoadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError) {
        throw _WarnImport("FileTools");
      }
      /**
       * Reads pixels from the current frame buffer. Please note that this function can be slow
       * @param x defines the x coordinate of the rectangle where pixels must be read
       * @param y defines the y coordinate of the rectangle where pixels must be read
       * @param width defines the width of the rectangle where pixels must be read
       * @param height defines the height of the rectangle where pixels must be read
       * @param hasAlpha defines whether the output should have alpha or not (defaults to true)
       * @param flushRenderer true to flush the renderer from the pending commands before reading the pixels
       * @returns a ArrayBufferView promise (Uint8Array) containing RGBA colors
       */
      readPixels(x, y, width, height, hasAlpha = true, flushRenderer = true) {
        const numChannels = hasAlpha ? 4 : 3;
        const format = hasAlpha ? this._gl.RGBA : this._gl.RGB;
        const data = new Uint8Array(height * width * numChannels);
        if (flushRenderer) {
          this.flushFramebuffer();
        }
        this._gl.readPixels(x, y, width, height, format, this._gl.UNSIGNED_BYTE, data);
        return Promise.resolve(data);
      }
      /**
       * Gets a Promise<boolean> indicating if the engine can be instantiated (ie. if a webGL context can be found)
       */
      static get IsSupportedAsync() {
        return Promise.resolve(this.isSupported());
      }
      /**
       * Gets a boolean indicating if the engine can be instantiated (ie. if a webGL context can be found)
       */
      static get IsSupported() {
        return this.isSupported();
      }
      /**
       * Gets a boolean indicating if the engine can be instantiated (ie. if a webGL context can be found)
       * @returns true if the engine can be created
       * @ignorenaming
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static isSupported() {
        if (this._HasMajorPerformanceCaveat !== null) {
          return !this._HasMajorPerformanceCaveat;
        }
        if (this._IsSupported === null) {
          try {
            const tempcanvas = this._CreateCanvas(1, 1);
            const gl = tempcanvas.getContext("webgl") || tempcanvas.getContext("experimental-webgl");
            this._IsSupported = gl != null && !!window.WebGLRenderingContext;
          } catch (e) {
            this._IsSupported = false;
          }
        }
        return this._IsSupported;
      }
      /**
       * Gets a boolean indicating if the engine can be instantiated on a performant device (ie. if a webGL context can be found and it does not use a slow implementation)
       */
      static get HasMajorPerformanceCaveat() {
        if (this._HasMajorPerformanceCaveat === null) {
          try {
            const tempcanvas = this._CreateCanvas(1, 1);
            const gl = tempcanvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) || tempcanvas.getContext("experimental-webgl", { failIfMajorPerformanceCaveat: true });
            this._HasMajorPerformanceCaveat = !gl;
          } catch (e) {
            this._HasMajorPerformanceCaveat = false;
          }
        }
        return this._HasMajorPerformanceCaveat;
      }
      /**
       * Find the next highest power of two.
       * @param x Number to start search from.
       * @returns Next highest power of two.
       */
      static CeilingPOT(x) {
        x--;
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        x++;
        return x;
      }
      /**
       * Find the next lowest power of two.
       * @param x Number to start search from.
       * @returns Next lowest power of two.
       */
      static FloorPOT(x) {
        x = x | x >> 1;
        x = x | x >> 2;
        x = x | x >> 4;
        x = x | x >> 8;
        x = x | x >> 16;
        return x - (x >> 1);
      }
      /**
       * Find the nearest power of two.
       * @param x Number to start search from.
       * @returns Next nearest power of two.
       */
      static NearestPOT(x) {
        const c = _ThinEngine.CeilingPOT(x);
        const f = _ThinEngine.FloorPOT(x);
        return c - x > x - f ? f : c;
      }
      /**
       * Get the closest exponent of two
       * @param value defines the value to approximate
       * @param max defines the maximum value to return
       * @param mode defines how to define the closest value
       * @returns closest exponent of two of the given value
       */
      static GetExponentOfTwo(value, max, mode = 2) {
        let pot;
        switch (mode) {
          case 1:
            pot = _ThinEngine.FloorPOT(value);
            break;
          case 2:
            pot = _ThinEngine.NearestPOT(value);
            break;
          case 3:
          default:
            pot = _ThinEngine.CeilingPOT(value);
            break;
        }
        return Math.min(pot, max);
      }
      /**
       * Queue a new function into the requested animation frame pool (ie. this function will be executed by the browser (or the javascript engine) for the next frame)
       * @param func - the function to be called
       * @param requester - the object that will request the next frame. Falls back to window.
       * @returns frame number
       */
      static QueueNewFrame(func, requester) {
        if (!IsWindowObjectExist()) {
          if (typeof requestAnimationFrame === "function") {
            return requestAnimationFrame(func);
          }
        } else {
          const { requestAnimationFrame: requestAnimationFrame2 } = requester || window;
          if (typeof requestAnimationFrame2 === "function") {
            return requestAnimationFrame2(func);
          }
        }
        return setTimeout(func, 16);
      }
      /**
       * Gets host document
       * @returns the host document object
       */
      getHostDocument() {
        if (this._renderingCanvas && this._renderingCanvas.ownerDocument) {
          return this._renderingCanvas.ownerDocument;
        }
        return IsDocumentAvailable() ? document : null;
      }
    };
    ThinEngine._TempClearColorUint32 = new Uint32Array(4);
    ThinEngine._TempClearColorInt32 = new Int32Array(4);
    ThinEngine.ExceptionList = [
      { key: "Chrome/63.0", capture: "63\\.0\\.3239\\.(\\d+)", captureConstraint: 108, targets: ["uniformBuffer"] },
      { key: "Firefox/58", capture: null, captureConstraint: null, targets: ["uniformBuffer"] },
      { key: "Firefox/59", capture: null, captureConstraint: null, targets: ["uniformBuffer"] },
      { key: "Chrome/72.+?Mobile", capture: null, captureConstraint: null, targets: ["vao"] },
      { key: "Chrome/73.+?Mobile", capture: null, captureConstraint: null, targets: ["vao"] },
      { key: "Chrome/74.+?Mobile", capture: null, captureConstraint: null, targets: ["vao"] },
      { key: "Mac OS.+Chrome/71", capture: null, captureConstraint: null, targets: ["vao"] },
      { key: "Mac OS.+Chrome/72", capture: null, captureConstraint: null, targets: ["vao"] },
      { key: "Mac OS.+Chrome", capture: null, captureConstraint: null, targets: ["uniformBuffer"] },
      { key: "Chrome/12\\d\\..+?Mobile", capture: null, captureConstraint: null, targets: ["uniformBuffer"] },
      // desktop osx safari 15.4
      { key: ".*AppleWebKit.*(15.4).*Safari", capture: null, captureConstraint: null, targets: ["antialias", "maxMSAASamples"] },
      // mobile browsers using safari 15.4 on ios
      { key: ".*(15.4).*AppleWebKit.*Safari", capture: null, captureConstraint: null, targets: ["antialias", "maxMSAASamples"] }
    ];
    ThinEngine._TextureLoaders = [];
    ThinEngine.CollisionsEpsilon = 1e-3;
    ThinEngine._IsSupported = null;
    ThinEngine._HasMajorPerformanceCaveat = null;
  }
});

export {
  TextureSampler,
  init_textureSampler,
  InternalTextureSource,
  InternalTexture,
  init_internalTexture,
  IsWindowObjectExist,
  IsNavigatorAvailable,
  IsDocumentAvailable,
  GetDOMTextContent,
  DomManagement,
  init_domManagement,
  _WarnImport,
  init_devTools,
  Logger,
  init_logger,
  ShaderLanguage,
  init_shaderLanguage,
  ShaderProcessor,
  init_shaderProcessor,
  ShaderStore,
  init_shaderStore,
  Effect,
  init_effect,
  DepthCullingState,
  init_depthCullingState,
  StencilState,
  init_stencilState,
  AlphaState,
  init_alphaCullingState,
  WebGL2ShaderProcessor,
  init_webGL2ShaderProcessors,
  DataBuffer,
  init_dataBuffer,
  WebGLDataBuffer,
  init_webGLDataBuffer,
  WebGLPipelineContext,
  init_webGLPipelineContext,
  WebGLHardwareTexture,
  init_webGLHardwareTexture,
  DrawWrapper,
  init_drawWrapper,
  StencilStateComposer,
  init_stencilStateComposer,
  PrecisionDate,
  init_precisionDate,
  ThinEngine,
  init_thinEngine
};
//# sourceMappingURL=chunk-GEMGH3AZ.js.map
