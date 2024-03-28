import {
  GetDOMTextContent,
  IsNavigatorAvailable,
  IsWindowObjectExist,
  Logger,
  PrecisionDate,
  ShaderProcessor,
  ThinEngine,
  _WarnImport,
  init_devTools,
  init_domManagement,
  init_logger,
  init_precisionDate,
  init_shaderProcessor,
  init_thinEngine
} from "./chunk-655E2T6V.js";
import {
  GetClass,
  init_typeStore
} from "./chunk-WM5N7J5Q.js";
import {
  EngineStore,
  Observable,
  init_engineStore,
  init_observable
} from "./chunk-AD6Y6P3L.js";
import {
  __esm
} from "./chunk-CF3WPAMV.js";

// node_modules/@babylonjs/core/Misc/deepCopier.js
function GetAllPropertyNames(obj) {
  const props = [];
  do {
    Object.getOwnPropertyNames(obj).forEach(function(prop) {
      if (props.indexOf(prop) === -1) {
        props.push(prop);
      }
    });
  } while (obj = Object.getPrototypeOf(obj));
  return props;
}
var CloneValue, DeepCopier;
var init_deepCopier = __esm({
  "node_modules/@babylonjs/core/Misc/deepCopier.js"() {
    init_logger();
    CloneValue = (source, destinationObject, shallowCopyValues) => {
      if (!source) {
        return null;
      }
      if (source.getClassName && source.getClassName() === "Mesh") {
        return null;
      }
      if (source.getClassName && (source.getClassName() === "SubMesh" || source.getClassName() === "PhysicsBody")) {
        return source.clone(destinationObject);
      } else if (source.clone) {
        return source.clone();
      } else if (Array.isArray(source)) {
        return source.slice();
      } else if (shallowCopyValues && typeof source === "object") {
        return { ...source };
      }
      return null;
    };
    DeepCopier = class {
      /**
       * Tries to copy an object by duplicating every property
       * @param source defines the source object
       * @param destination defines the target object
       * @param doNotCopyList defines a list of properties to avoid
       * @param mustCopyList defines a list of properties to copy (even if they start with _)
       * @param shallowCopyValues defines wether properties referencing objects (none cloneable) must be shallow copied (false by default)
       * @remarks shallowCopyValues will not instantite the copied values which makes it only usable for "JSON objects"
       */
      static DeepCopy(source, destination, doNotCopyList, mustCopyList, shallowCopyValues = false) {
        const properties = GetAllPropertyNames(source);
        for (const prop of properties) {
          if (prop[0] === "_" && (!mustCopyList || mustCopyList.indexOf(prop) === -1)) {
            continue;
          }
          if (prop.endsWith("Observable")) {
            continue;
          }
          if (doNotCopyList && doNotCopyList.indexOf(prop) !== -1) {
            continue;
          }
          const sourceValue = source[prop];
          const typeOfSourceValue = typeof sourceValue;
          if (typeOfSourceValue === "function") {
            continue;
          }
          try {
            if (typeOfSourceValue === "object") {
              if (sourceValue instanceof Uint8Array) {
                destination[prop] = Uint8Array.from(sourceValue);
              } else if (sourceValue instanceof Array) {
                destination[prop] = [];
                if (sourceValue.length > 0) {
                  if (typeof sourceValue[0] == "object") {
                    for (let index = 0; index < sourceValue.length; index++) {
                      const clonedValue = CloneValue(sourceValue[index], destination, shallowCopyValues);
                      if (destination[prop].indexOf(clonedValue) === -1) {
                        destination[prop].push(clonedValue);
                      }
                    }
                  } else {
                    destination[prop] = sourceValue.slice(0);
                  }
                }
              } else {
                destination[prop] = CloneValue(sourceValue, destination, shallowCopyValues);
              }
            } else {
              destination[prop] = sourceValue;
            }
          } catch (e) {
            Logger.Warn(e.message);
          }
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/webRequest.js
function createXMLHttpRequest() {
  if (typeof _native !== "undefined" && _native.XMLHttpRequest) {
    return new _native.XMLHttpRequest();
  } else {
    return new XMLHttpRequest();
  }
}
var WebRequest;
var init_webRequest = __esm({
  "node_modules/@babylonjs/core/Misc/webRequest.js"() {
    WebRequest = class _WebRequest {
      constructor() {
        this._xhr = createXMLHttpRequest();
        this._requestURL = "";
      }
      /**
       * This function can be called to check if there are request modifiers for network requests
       * @returns true if there are any custom requests available
       */
      static get IsCustomRequestAvailable() {
        return Object.keys(_WebRequest.CustomRequestHeaders).length > 0 || _WebRequest.CustomRequestModifiers.length > 0;
      }
      _injectCustomRequestHeaders() {
        if (this._shouldSkipRequestModifications(this._requestURL)) {
          return;
        }
        for (const key in _WebRequest.CustomRequestHeaders) {
          const val = _WebRequest.CustomRequestHeaders[key];
          if (val) {
            this._xhr.setRequestHeader(key, val);
          }
        }
      }
      _shouldSkipRequestModifications(url) {
        return _WebRequest.SkipRequestModificationForBabylonCDN && (url.includes("preview.babylonjs.com") || url.includes("cdn.babylonjs.com"));
      }
      /**
       * Gets or sets a function to be called when loading progress changes
       */
      get onprogress() {
        return this._xhr.onprogress;
      }
      set onprogress(value) {
        this._xhr.onprogress = value;
      }
      /**
       * Returns client's state
       */
      get readyState() {
        return this._xhr.readyState;
      }
      /**
       * Returns client's status
       */
      get status() {
        return this._xhr.status;
      }
      /**
       * Returns client's status as a text
       */
      get statusText() {
        return this._xhr.statusText;
      }
      /**
       * Returns client's response
       */
      get response() {
        return this._xhr.response;
      }
      /**
       * Returns client's response url
       */
      get responseURL() {
        return this._xhr.responseURL;
      }
      /**
       * Returns client's response as text
       */
      get responseText() {
        return this._xhr.responseText;
      }
      /**
       * Gets or sets the expected response type
       */
      get responseType() {
        return this._xhr.responseType;
      }
      set responseType(value) {
        this._xhr.responseType = value;
      }
      /**
       * Gets or sets the timeout value in milliseconds
       */
      get timeout() {
        return this._xhr.timeout;
      }
      set timeout(value) {
        this._xhr.timeout = value;
      }
      addEventListener(type, listener, options) {
        this._xhr.addEventListener(type, listener, options);
      }
      removeEventListener(type, listener, options) {
        this._xhr.removeEventListener(type, listener, options);
      }
      /**
       * Cancels any network activity
       */
      abort() {
        this._xhr.abort();
      }
      /**
       * Initiates the request. The optional argument provides the request body. The argument is ignored if request method is GET or HEAD
       * @param body defines an optional request body
       */
      send(body) {
        if (_WebRequest.CustomRequestHeaders) {
          this._injectCustomRequestHeaders();
        }
        this._xhr.send(body);
      }
      /**
       * Sets the request method, request URL
       * @param method defines the method to use (GET, POST, etc..)
       * @param url defines the url to connect with
       */
      open(method, url) {
        for (const update of _WebRequest.CustomRequestModifiers) {
          if (this._shouldSkipRequestModifications(url)) {
            return;
          }
          update(this._xhr, url);
        }
        url = url.replace("file:http:", "http:");
        url = url.replace("file:https:", "https:");
        this._requestURL = url;
        this._xhr.open(method, url, true);
      }
      /**
       * Sets the value of a request header.
       * @param name The name of the header whose value is to be set
       * @param value The value to set as the body of the header
       */
      setRequestHeader(name, value) {
        this._xhr.setRequestHeader(name, value);
      }
      /**
       * Get the string containing the text of a particular header's value.
       * @param name The name of the header
       * @returns The string containing the text of the given header name
       */
      getResponseHeader(name) {
        return this._xhr.getResponseHeader(name);
      }
    };
    WebRequest.CustomRequestHeaders = {};
    WebRequest.CustomRequestModifiers = new Array();
    WebRequest.SkipRequestModificationForBabylonCDN = true;
  }
});

// node_modules/@babylonjs/core/Misc/filesInputStore.js
var FilesInputStore;
var init_filesInputStore = __esm({
  "node_modules/@babylonjs/core/Misc/filesInputStore.js"() {
    FilesInputStore = class {
    };
    FilesInputStore.FilesToLoad = {};
  }
});

// node_modules/@babylonjs/core/Misc/retryStrategy.js
var RetryStrategy;
var init_retryStrategy = __esm({
  "node_modules/@babylonjs/core/Misc/retryStrategy.js"() {
    RetryStrategy = class {
      /**
       * Function used to defines an exponential back off strategy
       * @param maxRetries defines the maximum number of retries (3 by default)
       * @param baseInterval defines the interval between retries
       * @returns the strategy function to use
       */
      static ExponentialBackoff(maxRetries = 3, baseInterval = 500) {
        return (url, request, retryIndex) => {
          if (request.status !== 0 || retryIndex >= maxRetries || url.indexOf("file:") !== -1) {
            return -1;
          }
          return Math.pow(2, retryIndex) * baseInterval;
        };
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/error.js
var BaseError, ErrorCodes, RuntimeError;
var init_error = __esm({
  "node_modules/@babylonjs/core/Misc/error.js"() {
    BaseError = class extends Error {
    };
    BaseError._setPrototypeOf = Object.setPrototypeOf || ((o, proto) => {
      o.__proto__ = proto;
      return o;
    });
    ErrorCodes = {
      // Mesh errors 0-999
      /** Invalid or empty mesh vertex positions. */
      MeshInvalidPositionsError: 0,
      // Texture errors 1000-1999
      /** Unsupported texture found. */
      UnsupportedTextureError: 1e3,
      // GLTFLoader errors 2000-2999
      /** Unexpected magic number found in GLTF file header. */
      GLTFLoaderUnexpectedMagicError: 2e3,
      // SceneLoader errors 3000-3999
      /** SceneLoader generic error code. Ideally wraps the inner exception. */
      SceneLoaderError: 3e3,
      // File related errors 4000-4999
      /** Load file error */
      LoadFileError: 4e3,
      /** Request file error */
      RequestFileError: 4001,
      /** Read file error */
      ReadFileError: 4002
    };
    RuntimeError = class _RuntimeError extends BaseError {
      /**
       * Creates a new RuntimeError
       * @param message defines the message of the error
       * @param errorCode the error code
       * @param innerError the error that caused the outer error
       */
      constructor(message, errorCode, innerError) {
        super(message);
        this.errorCode = errorCode;
        this.innerError = innerError;
        this.name = "RuntimeError";
        BaseError._setPrototypeOf(this, _RuntimeError.prototype);
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/stringTools.js
var EndsWith, StartsWith, Decode, EncodeArrayBufferToBase64, DecodeBase64ToString, DecodeBase64ToBinary, PadNumber, StringTools;
var init_stringTools = __esm({
  "node_modules/@babylonjs/core/Misc/stringTools.js"() {
    EndsWith = (str, suffix) => {
      return str.endsWith(suffix);
    };
    StartsWith = (str, suffix) => {
      if (!str) {
        return false;
      }
      return str.startsWith(suffix);
    };
    Decode = (buffer) => {
      if (typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(buffer);
      }
      let result = "";
      for (let i = 0; i < buffer.byteLength; i++) {
        result += String.fromCharCode(buffer[i]);
      }
      return result;
    };
    EncodeArrayBufferToBase64 = (buffer) => {
      const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let output = "";
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;
      const bytes = ArrayBuffer.isView(buffer) ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) : new Uint8Array(buffer);
      while (i < bytes.length) {
        chr1 = bytes[i++];
        chr2 = i < bytes.length ? bytes[i++] : Number.NaN;
        chr3 = i < bytes.length ? bytes[i++] : Number.NaN;
        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
      }
      return output;
    };
    DecodeBase64ToString = (base64Data) => {
      return atob(base64Data);
    };
    DecodeBase64ToBinary = (base64Data) => {
      const decodedString = DecodeBase64ToString(base64Data);
      const bufferLength = decodedString.length;
      const bufferView = new Uint8Array(new ArrayBuffer(bufferLength));
      for (let i = 0; i < bufferLength; i++) {
        bufferView[i] = decodedString.charCodeAt(i);
      }
      return bufferView.buffer;
    };
    PadNumber = (num, length) => {
      let str = String(num);
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    };
    StringTools = {
      EndsWith,
      StartsWith,
      Decode,
      EncodeArrayBufferToBase64,
      DecodeBase64ToString,
      DecodeBase64ToBinary,
      PadNumber
    };
  }
});

// node_modules/@babylonjs/core/Misc/timingTools.js
var TimingTools;
var init_timingTools = __esm({
  "node_modules/@babylonjs/core/Misc/timingTools.js"() {
    init_domManagement();
    TimingTools = class {
      /**
       * Polyfill for setImmediate
       * @param action defines the action to execute after the current execution block
       */
      static SetImmediate(action) {
        if (IsWindowObjectExist() && window.setImmediate) {
          window.setImmediate(action);
        } else {
          setTimeout(action, 1);
        }
      }
    };
  }
});

// node_modules/@babylonjs/core/Misc/fileTools.js
function DecodeBase64UrlToBinary(uri) {
  return DecodeBase64ToBinary(uri.split(",")[1]);
}
var Base64DataUrlRegEx, LoadFileError, RequestFileError, ReadFileError, FileToolsOptions, _CleanUrl, SetCorsBehavior, LoadImage, ReadFile, LoadFile, RequestFile, IsFileURL, IsBase64DataUrl, TestBase64DataUrl, DecodeBase64UrlToString, initSideEffects, FileTools, _injectLTSFileTools;
var init_fileTools = __esm({
  "node_modules/@babylonjs/core/Misc/fileTools.js"() {
    init_webRequest();
    init_domManagement();
    init_observable();
    init_filesInputStore();
    init_retryStrategy();
    init_error();
    init_stringTools();
    init_shaderProcessor();
    init_thinEngine();
    init_engineStore();
    init_logger();
    init_timingTools();
    Base64DataUrlRegEx = new RegExp(/^data:([^,]+\/[^,]+)?;base64,/i);
    LoadFileError = class _LoadFileError extends RuntimeError {
      /**
       * Creates a new LoadFileError
       * @param message defines the message of the error
       * @param object defines the optional web request
       */
      constructor(message, object) {
        super(message, ErrorCodes.LoadFileError);
        this.name = "LoadFileError";
        BaseError._setPrototypeOf(this, _LoadFileError.prototype);
        if (object instanceof WebRequest) {
          this.request = object;
        } else {
          this.file = object;
        }
      }
    };
    RequestFileError = class _RequestFileError extends RuntimeError {
      /**
       * Creates a new LoadFileError
       * @param message defines the message of the error
       * @param request defines the optional web request
       */
      constructor(message, request) {
        super(message, ErrorCodes.RequestFileError);
        this.request = request;
        this.name = "RequestFileError";
        BaseError._setPrototypeOf(this, _RequestFileError.prototype);
      }
    };
    ReadFileError = class _ReadFileError extends RuntimeError {
      /**
       * Creates a new ReadFileError
       * @param message defines the message of the error
       * @param file defines the optional file
       */
      constructor(message, file) {
        super(message, ErrorCodes.ReadFileError);
        this.file = file;
        this.name = "ReadFileError";
        BaseError._setPrototypeOf(this, _ReadFileError.prototype);
      }
    };
    FileToolsOptions = {
      /**
       * Gets or sets the retry strategy to apply when an error happens while loading an asset.
       * When defining this function, return the wait time before trying again or return -1 to
       * stop retrying and error out.
       */
      DefaultRetryStrategy: RetryStrategy.ExponentialBackoff(),
      /**
       * Gets or sets the base URL to use to load assets
       */
      BaseUrl: "",
      /**
       * Default behaviour for cors in the application.
       * It can be a string if the expected behavior is identical in the entire app.
       * Or a callback to be able to set it per url or on a group of them (in case of Video source for instance)
       */
      CorsBehavior: "anonymous",
      /**
       * Gets or sets a function used to pre-process url before using them to load assets
       * @param url
       * @returns the processed url
       */
      PreprocessUrl: (url) => url,
      /**
       * Gets or sets the base URL to use to load scripts
       * Used for both JS and WASM
       */
      ScriptBaseUrl: "",
      /**
       * Gets or sets a function used to pre-process script url before using them to load.
       * Used for both JS and WASM
       * @param url defines the url to process
       * @returns the processed url
       */
      ScriptPreprocessUrl: (url) => url
    };
    _CleanUrl = (url) => {
      url = url.replace(/#/gm, "%23");
      return url;
    };
    SetCorsBehavior = (url, element) => {
      if (url && url.indexOf("data:") === 0) {
        return;
      }
      if (FileToolsOptions.CorsBehavior) {
        if (typeof FileToolsOptions.CorsBehavior === "string" || FileToolsOptions.CorsBehavior instanceof String) {
          element.crossOrigin = FileToolsOptions.CorsBehavior;
        } else {
          const result = FileToolsOptions.CorsBehavior(url);
          if (result) {
            element.crossOrigin = result;
          }
        }
      }
    };
    LoadImage = (input, onLoad, onError, offlineProvider, mimeType = "", imageBitmapOptions) => {
      const engine = EngineStore.LastCreatedEngine;
      if (typeof HTMLImageElement === "undefined" && !(engine == null ? void 0 : engine._features.forceBitmapOverHTMLImageElement)) {
        onError("LoadImage is only supported in web or BabylonNative environments.");
        return null;
      }
      let url;
      let usingObjectURL = false;
      if (input instanceof ArrayBuffer || ArrayBuffer.isView(input)) {
        if (typeof Blob !== "undefined" && typeof URL !== "undefined") {
          url = URL.createObjectURL(new Blob([input], { type: mimeType }));
          usingObjectURL = true;
        } else {
          url = `data:${mimeType};base64,` + EncodeArrayBufferToBase64(input);
        }
      } else if (input instanceof Blob) {
        url = URL.createObjectURL(input);
        usingObjectURL = true;
      } else {
        url = _CleanUrl(input);
        url = FileToolsOptions.PreprocessUrl(input);
      }
      const onErrorHandler = (exception) => {
        if (onError) {
          const inputText = url || input.toString();
          onError(`Error while trying to load image: ${inputText.indexOf("http") === 0 || inputText.length <= 128 ? inputText : inputText.slice(0, 128) + "..."}`, exception);
        }
      };
      if (engine == null ? void 0 : engine._features.forceBitmapOverHTMLImageElement) {
        LoadFile(url, (data) => {
          engine.createImageBitmap(new Blob([data], { type: mimeType }), { premultiplyAlpha: "none", ...imageBitmapOptions }).then((imgBmp) => {
            onLoad(imgBmp);
            if (usingObjectURL) {
              URL.revokeObjectURL(url);
            }
          }).catch((reason) => {
            if (onError) {
              onError("Error while trying to load image: " + input, reason);
            }
          });
        }, void 0, offlineProvider || void 0, true, (request, exception) => {
          onErrorHandler(exception);
        });
        return null;
      }
      const img = new Image();
      SetCorsBehavior(url, img);
      const handlersList = [];
      const loadHandlersList = () => {
        handlersList.forEach((handler) => {
          handler.target.addEventListener(handler.name, handler.handler);
        });
      };
      const unloadHandlersList = () => {
        handlersList.forEach((handler) => {
          handler.target.removeEventListener(handler.name, handler.handler);
        });
        handlersList.length = 0;
      };
      const loadHandler = () => {
        unloadHandlersList();
        onLoad(img);
        if (usingObjectURL && img.src) {
          URL.revokeObjectURL(img.src);
        }
      };
      const errorHandler = (err) => {
        unloadHandlersList();
        onErrorHandler(err);
        if (usingObjectURL && img.src) {
          URL.revokeObjectURL(img.src);
        }
      };
      const cspHandler = (err) => {
        if (err.blockedURI !== img.src) {
          return;
        }
        unloadHandlersList();
        const cspException = new Error(`CSP violation of policy ${err.effectiveDirective} ${err.blockedURI}. Current policy is ${err.originalPolicy}`);
        EngineStore.UseFallbackTexture = false;
        onErrorHandler(cspException);
        if (usingObjectURL && img.src) {
          URL.revokeObjectURL(img.src);
        }
        img.src = "";
      };
      handlersList.push({ target: img, name: "load", handler: loadHandler });
      handlersList.push({ target: img, name: "error", handler: errorHandler });
      handlersList.push({ target: document, name: "securitypolicyviolation", handler: cspHandler });
      loadHandlersList();
      const fromBlob = url.substring(0, 5) === "blob:";
      const fromData = url.substring(0, 5) === "data:";
      const noOfflineSupport = () => {
        if (fromBlob || fromData || !WebRequest.IsCustomRequestAvailable) {
          img.src = url;
        } else {
          LoadFile(url, (data, _, contentType) => {
            const type = !mimeType && contentType ? contentType : mimeType;
            const blob = new Blob([data], { type });
            const url2 = URL.createObjectURL(blob);
            usingObjectURL = true;
            img.src = url2;
          }, void 0, offlineProvider || void 0, true, (_request, exception) => {
            onErrorHandler(exception);
          });
        }
      };
      const loadFromOfflineSupport = () => {
        if (offlineProvider) {
          offlineProvider.loadImage(url, img);
        }
      };
      if (!fromBlob && !fromData && offlineProvider && offlineProvider.enableTexturesOffline) {
        offlineProvider.open(loadFromOfflineSupport, noOfflineSupport);
      } else {
        if (url.indexOf("file:") !== -1) {
          const textureName = decodeURIComponent(url.substring(5).toLowerCase());
          if (FilesInputStore.FilesToLoad[textureName] && typeof URL !== "undefined") {
            try {
              let blobURL;
              try {
                blobURL = URL.createObjectURL(FilesInputStore.FilesToLoad[textureName]);
              } catch (ex) {
                blobURL = URL.createObjectURL(FilesInputStore.FilesToLoad[textureName]);
              }
              img.src = blobURL;
              usingObjectURL = true;
            } catch (e) {
              img.src = "";
            }
            return img;
          }
        }
        noOfflineSupport();
      }
      return img;
    };
    ReadFile = (file, onSuccess, onProgress, useArrayBuffer, onError) => {
      const reader = new FileReader();
      const fileRequest = {
        onCompleteObservable: new Observable(),
        abort: () => reader.abort()
      };
      reader.onloadend = () => fileRequest.onCompleteObservable.notifyObservers(fileRequest);
      if (onError) {
        reader.onerror = () => {
          onError(new ReadFileError(`Unable to read ${file.name}`, file));
        };
      }
      reader.onload = (e) => {
        onSuccess(e.target["result"]);
      };
      if (onProgress) {
        reader.onprogress = onProgress;
      }
      if (!useArrayBuffer) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
      return fileRequest;
    };
    LoadFile = (fileOrUrl, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError, onOpened) => {
      if (fileOrUrl.name) {
        return ReadFile(fileOrUrl, onSuccess, onProgress, useArrayBuffer, onError ? (error) => {
          onError(void 0, error);
        } : void 0);
      }
      const url = fileOrUrl;
      if (url.indexOf("file:") !== -1) {
        let fileName = decodeURIComponent(url.substring(5).toLowerCase());
        if (fileName.indexOf("./") === 0) {
          fileName = fileName.substring(2);
        }
        const file = FilesInputStore.FilesToLoad[fileName];
        if (file) {
          return ReadFile(file, onSuccess, onProgress, useArrayBuffer, onError ? (error) => onError(void 0, new LoadFileError(error.message, error.file)) : void 0);
        }
      }
      const { match, type } = TestBase64DataUrl(url);
      if (match) {
        const fileRequest = {
          onCompleteObservable: new Observable(),
          abort: () => () => {
          }
        };
        try {
          const data = useArrayBuffer ? DecodeBase64UrlToBinary(url) : DecodeBase64UrlToString(url);
          onSuccess(data, void 0, type);
        } catch (error) {
          if (onError) {
            onError(void 0, error);
          } else {
            Logger.Error(error.message || "Failed to parse the Data URL");
          }
        }
        TimingTools.SetImmediate(() => {
          fileRequest.onCompleteObservable.notifyObservers(fileRequest);
        });
        return fileRequest;
      }
      return RequestFile(url, (data, request) => {
        onSuccess(data, request == null ? void 0 : request.responseURL, request == null ? void 0 : request.getResponseHeader("content-type"));
      }, onProgress, offlineProvider, useArrayBuffer, onError ? (error) => {
        onError(error.request, new LoadFileError(error.message, error.request));
      } : void 0, onOpened);
    };
    RequestFile = (url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError, onOpened) => {
      url = _CleanUrl(url);
      url = FileToolsOptions.PreprocessUrl(url);
      const loadUrl = FileToolsOptions.BaseUrl + url;
      let aborted = false;
      const fileRequest = {
        onCompleteObservable: new Observable(),
        abort: () => aborted = true
      };
      const requestFile = () => {
        let request = new WebRequest();
        let retryHandle = null;
        let onReadyStateChange;
        const unbindEvents = () => {
          if (!request) {
            return;
          }
          if (onProgress) {
            request.removeEventListener("progress", onProgress);
          }
          if (onReadyStateChange) {
            request.removeEventListener("readystatechange", onReadyStateChange);
          }
          request.removeEventListener("loadend", onLoadEnd);
        };
        let onLoadEnd = () => {
          unbindEvents();
          fileRequest.onCompleteObservable.notifyObservers(fileRequest);
          fileRequest.onCompleteObservable.clear();
          onProgress = void 0;
          onReadyStateChange = null;
          onLoadEnd = null;
          onError = void 0;
          onOpened = void 0;
          onSuccess = void 0;
        };
        fileRequest.abort = () => {
          aborted = true;
          if (onLoadEnd) {
            onLoadEnd();
          }
          if (request && request.readyState !== (XMLHttpRequest.DONE || 4)) {
            request.abort();
          }
          if (retryHandle !== null) {
            clearTimeout(retryHandle);
            retryHandle = null;
          }
          request = null;
        };
        const handleError = (error) => {
          const message = error.message || "Unknown error";
          if (onError && request) {
            onError(new RequestFileError(message, request));
          } else {
            Logger.Error(message);
          }
        };
        const retryLoop = (retryIndex) => {
          if (!request) {
            return;
          }
          request.open("GET", loadUrl);
          if (onOpened) {
            try {
              onOpened(request);
            } catch (e) {
              handleError(e);
              return;
            }
          }
          if (useArrayBuffer) {
            request.responseType = "arraybuffer";
          }
          if (onProgress) {
            request.addEventListener("progress", onProgress);
          }
          if (onLoadEnd) {
            request.addEventListener("loadend", onLoadEnd);
          }
          onReadyStateChange = () => {
            if (aborted || !request) {
              return;
            }
            if (request.readyState === (XMLHttpRequest.DONE || 4)) {
              if (onReadyStateChange) {
                request.removeEventListener("readystatechange", onReadyStateChange);
              }
              if (request.status >= 200 && request.status < 300 || request.status === 0 && (!IsWindowObjectExist() || IsFileURL())) {
                try {
                  if (onSuccess) {
                    onSuccess(useArrayBuffer ? request.response : request.responseText, request);
                  }
                } catch (e) {
                  handleError(e);
                }
                return;
              }
              const retryStrategy = FileToolsOptions.DefaultRetryStrategy;
              if (retryStrategy) {
                const waitTime = retryStrategy(loadUrl, request, retryIndex);
                if (waitTime !== -1) {
                  unbindEvents();
                  request = new WebRequest();
                  retryHandle = setTimeout(() => retryLoop(retryIndex + 1), waitTime);
                  return;
                }
              }
              const error = new RequestFileError("Error status: " + request.status + " " + request.statusText + " - Unable to load " + loadUrl, request);
              if (onError) {
                onError(error);
              }
            }
          };
          request.addEventListener("readystatechange", onReadyStateChange);
          request.send();
        };
        retryLoop(0);
      };
      if (offlineProvider && offlineProvider.enableSceneOffline) {
        const noOfflineSupport = (request) => {
          if (request && request.status > 400) {
            if (onError) {
              onError(request);
            }
          } else {
            requestFile();
          }
        };
        const loadFromOfflineSupport = () => {
          if (offlineProvider) {
            offlineProvider.loadFile(FileToolsOptions.BaseUrl + url, (data) => {
              if (!aborted && onSuccess) {
                onSuccess(data);
              }
              fileRequest.onCompleteObservable.notifyObservers(fileRequest);
            }, onProgress ? (event) => {
              if (!aborted && onProgress) {
                onProgress(event);
              }
            } : void 0, noOfflineSupport, useArrayBuffer);
          }
        };
        offlineProvider.open(loadFromOfflineSupport, noOfflineSupport);
      } else {
        requestFile();
      }
      return fileRequest;
    };
    IsFileURL = () => {
      return typeof location !== "undefined" && location.protocol === "file:";
    };
    IsBase64DataUrl = (uri) => {
      return Base64DataUrlRegEx.test(uri);
    };
    TestBase64DataUrl = (uri) => {
      const results = Base64DataUrlRegEx.exec(uri);
      if (results === null || results.length === 0) {
        return { match: false, type: "" };
      } else {
        const type = results[0].replace("data:", "").replace("base64,", "");
        return { match: true, type };
      }
    };
    DecodeBase64UrlToString = (uri) => {
      return DecodeBase64ToString(uri.split(",")[1]);
    };
    initSideEffects = () => {
      ThinEngine._FileToolsLoadImage = LoadImage;
      ThinEngine._FileToolsLoadFile = LoadFile;
      ShaderProcessor._FileToolsLoadFile = LoadFile;
    };
    initSideEffects();
    _injectLTSFileTools = (DecodeBase64UrlToBinary2, DecodeBase64UrlToString2, FileToolsOptions2, IsBase64DataUrl2, IsFileURL2, LoadFile2, LoadImage2, ReadFile2, RequestFile2, SetCorsBehavior2) => {
      FileTools = {
        DecodeBase64UrlToBinary: DecodeBase64UrlToBinary2,
        DecodeBase64UrlToString: DecodeBase64UrlToString2,
        DefaultRetryStrategy: FileToolsOptions2.DefaultRetryStrategy,
        BaseUrl: FileToolsOptions2.BaseUrl,
        CorsBehavior: FileToolsOptions2.CorsBehavior,
        PreprocessUrl: FileToolsOptions2.PreprocessUrl,
        IsBase64DataUrl: IsBase64DataUrl2,
        IsFileURL: IsFileURL2,
        LoadFile: LoadFile2,
        LoadImage: LoadImage2,
        ReadFile: ReadFile2,
        RequestFile: RequestFile2,
        SetCorsBehavior: SetCorsBehavior2
      };
      Object.defineProperty(FileTools, "DefaultRetryStrategy", {
        get: function() {
          return FileToolsOptions2.DefaultRetryStrategy;
        },
        set: function(value) {
          FileToolsOptions2.DefaultRetryStrategy = value;
        }
      });
      Object.defineProperty(FileTools, "BaseUrl", {
        get: function() {
          return FileToolsOptions2.BaseUrl;
        },
        set: function(value) {
          FileToolsOptions2.BaseUrl = value;
        }
      });
      Object.defineProperty(FileTools, "PreprocessUrl", {
        get: function() {
          return FileToolsOptions2.PreprocessUrl;
        },
        set: function(value) {
          FileToolsOptions2.PreprocessUrl = value;
        }
      });
      Object.defineProperty(FileTools, "CorsBehavior", {
        get: function() {
          return FileToolsOptions2.CorsBehavior;
        },
        set: function(value) {
          FileToolsOptions2.CorsBehavior = value;
        }
      });
    };
    _injectLTSFileTools(DecodeBase64UrlToBinary, DecodeBase64UrlToString, FileToolsOptions, IsBase64DataUrl, IsFileURL, LoadFile, LoadImage, ReadFile, RequestFile, SetCorsBehavior);
  }
});

// node_modules/@babylonjs/core/Misc/guid.js
function RandomGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
var GUID;
var init_guid = __esm({
  "node_modules/@babylonjs/core/Misc/guid.js"() {
    GUID = {
      /**
       * Implementation from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#answer-2117523
       * Be aware Math.random() could cause collisions, but:
       * "All but 6 of the 128 bits of the ID are randomly generated, which means that for any two ids, there's a 1 in 2^^122 (or 5.3x10^^36) chance they'll collide"
       * @returns a pseudo random id
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      RandomId: RandomGUID
    };
  }
});

// node_modules/@babylonjs/core/Misc/instantiationTools.js
var InstantiationTools;
var init_instantiationTools = __esm({
  "node_modules/@babylonjs/core/Misc/instantiationTools.js"() {
    init_logger();
    init_typeStore();
    InstantiationTools = class {
      /**
       * Tries to instantiate a new object from a given class name
       * @param className defines the class name to instantiate
       * @returns the new object or null if the system was not able to do the instantiation
       */
      static Instantiate(className2) {
        if (this.RegisteredExternalClasses && this.RegisteredExternalClasses[className2]) {
          return this.RegisteredExternalClasses[className2];
        }
        const internalClass = GetClass(className2);
        if (internalClass) {
          return internalClass;
        }
        Logger.Warn(className2 + " not found, you may have missed an import.");
        const arr = className2.split(".");
        let fn = window || this;
        for (let i = 0, len = arr.length; i < len; i++) {
          fn = fn[arr[i]];
        }
        if (typeof fn !== "function") {
          return null;
        }
        return fn;
      }
    };
    InstantiationTools.RegisteredExternalClasses = {};
  }
});

// node_modules/@babylonjs/core/Misc/tools.functions.js
function IsExponentOfTwo(value) {
  let count = 1;
  do {
    count *= 2;
  } while (count < value);
  return count === value;
}
function Mix(a, b, alpha) {
  return a * (1 - alpha) + b * alpha;
}
var init_tools_functions = __esm({
  "node_modules/@babylonjs/core/Misc/tools.functions.js"() {
  }
});

// node_modules/@babylonjs/core/Misc/tools.js
function className(name, module) {
  return (target) => {
    target["__bjsclassName__"] = name;
    target["__bjsmoduleName__"] = module != null ? module : null;
  };
}
var Tools, AsyncLoop;
var init_tools = __esm({
  "node_modules/@babylonjs/core/Misc/tools.js"() {
    init_observable();
    init_domManagement();
    init_logger();
    init_deepCopier();
    init_precisionDate();
    init_devTools();
    init_webRequest();
    init_engineStore();
    init_fileTools();
    init_timingTools();
    init_instantiationTools();
    init_guid();
    init_tools_functions();
    Tools = class _Tools {
      /**
       * Gets or sets the base URL to use to load assets
       */
      static get BaseUrl() {
        return FileToolsOptions.BaseUrl;
      }
      static set BaseUrl(value) {
        FileToolsOptions.BaseUrl = value;
      }
      /**
       * This function checks whether a URL is absolute or not.
       * It will also detect data and blob URLs
       * @param url the url to check
       * @returns is the url absolute or relative
       */
      static IsAbsoluteUrl(url) {
        if (url.indexOf("//") === 0) {
          return true;
        }
        if (url.indexOf("://") === -1) {
          return false;
        }
        if (url.indexOf(".") === -1) {
          return false;
        }
        if (url.indexOf("/") === -1) {
          return false;
        }
        if (url.indexOf(":") > url.indexOf("/")) {
          return false;
        }
        if (url.indexOf("://") < url.indexOf(".")) {
          return true;
        }
        if (url.indexOf("data:") === 0 || url.indexOf("blob:") === 0) {
          return true;
        }
        return false;
      }
      /**
       * Sets the base URL to use to load scripts
       */
      static set ScriptBaseUrl(value) {
        FileToolsOptions.ScriptBaseUrl = value;
      }
      static get ScriptBaseUrl() {
        return FileToolsOptions.ScriptBaseUrl;
      }
      /**
       * Sets a preprocessing function to run on a source URL before importing it
       * Note that this function will execute AFTER the base URL is appended to the URL
       */
      static set ScriptPreprocessUrl(func) {
        FileToolsOptions.ScriptPreprocessUrl = func;
      }
      static get ScriptPreprocessUrl() {
        return FileToolsOptions.ScriptPreprocessUrl;
      }
      /**
       * Gets or sets the retry strategy to apply when an error happens while loading an asset
       */
      static get DefaultRetryStrategy() {
        return FileToolsOptions.DefaultRetryStrategy;
      }
      static set DefaultRetryStrategy(strategy) {
        FileToolsOptions.DefaultRetryStrategy = strategy;
      }
      /**
       * Default behavior for cors in the application.
       * It can be a string if the expected behavior is identical in the entire app.
       * Or a callback to be able to set it per url or on a group of them (in case of Video source for instance)
       */
      static get CorsBehavior() {
        return FileToolsOptions.CorsBehavior;
      }
      static set CorsBehavior(value) {
        FileToolsOptions.CorsBehavior = value;
      }
      /**
       * Gets or sets a global variable indicating if fallback texture must be used when a texture cannot be loaded
       * @ignorenaming
       */
      static get UseFallbackTexture() {
        return EngineStore.UseFallbackTexture;
      }
      static set UseFallbackTexture(value) {
        EngineStore.UseFallbackTexture = value;
      }
      /**
       * Use this object to register external classes like custom textures or material
       * to allow the loaders to instantiate them
       */
      static get RegisteredExternalClasses() {
        return InstantiationTools.RegisteredExternalClasses;
      }
      static set RegisteredExternalClasses(classes) {
        InstantiationTools.RegisteredExternalClasses = classes;
      }
      /**
       * Texture content used if a texture cannot loaded
       * @ignorenaming
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static get fallbackTexture() {
        return EngineStore.FallbackTexture;
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static set fallbackTexture(value) {
        EngineStore.FallbackTexture = value;
      }
      /**
       * Read the content of a byte array at a specified coordinates (taking in account wrapping)
       * @param u defines the coordinate on X axis
       * @param v defines the coordinate on Y axis
       * @param width defines the width of the source data
       * @param height defines the height of the source data
       * @param pixels defines the source byte array
       * @param color defines the output color
       */
      static FetchToRef(u, v, width, height, pixels, color) {
        const wrappedU = Math.abs(u) * width % width | 0;
        const wrappedV = Math.abs(v) * height % height | 0;
        const position = (wrappedU + wrappedV * width) * 4;
        color.r = pixels[position] / 255;
        color.g = pixels[position + 1] / 255;
        color.b = pixels[position + 2] / 255;
        color.a = pixels[position + 3] / 255;
      }
      /**
       * Interpolates between a and b via alpha
       * @param a The lower value (returned when alpha = 0)
       * @param b The upper value (returned when alpha = 1)
       * @param alpha The interpolation-factor
       * @returns The mixed value
       */
      static Mix(a, b, alpha) {
        return 0;
      }
      /**
       * Tries to instantiate a new object from a given class name
       * @param className defines the class name to instantiate
       * @returns the new object or null if the system was not able to do the instantiation
       */
      static Instantiate(className2) {
        return InstantiationTools.Instantiate(className2);
      }
      /**
       * Polyfill for setImmediate
       * @param action defines the action to execute after the current execution block
       */
      static SetImmediate(action) {
        TimingTools.SetImmediate(action);
      }
      /**
       * Function indicating if a number is an exponent of 2
       * @param value defines the value to test
       * @returns true if the value is an exponent of 2
       */
      static IsExponentOfTwo(value) {
        return true;
      }
      /**
       * Returns the nearest 32-bit single precision float representation of a Number
       * @param value A Number.  If the parameter is of a different type, it will get converted
       * to a number or to NaN if it cannot be converted
       * @returns number
       */
      static FloatRound(value) {
        return Math.fround(value);
      }
      /**
       * Extracts the filename from a path
       * @param path defines the path to use
       * @returns the filename
       */
      static GetFilename(path) {
        const index = path.lastIndexOf("/");
        if (index < 0) {
          return path;
        }
        return path.substring(index + 1);
      }
      /**
       * Extracts the "folder" part of a path (everything before the filename).
       * @param uri The URI to extract the info from
       * @param returnUnchangedIfNoSlash Do not touch the URI if no slashes are present
       * @returns The "folder" part of the path
       */
      static GetFolderPath(uri, returnUnchangedIfNoSlash = false) {
        const index = uri.lastIndexOf("/");
        if (index < 0) {
          if (returnUnchangedIfNoSlash) {
            return uri;
          }
          return "";
        }
        return uri.substring(0, index + 1);
      }
      /**
       * Convert an angle in radians to degrees
       * @param angle defines the angle to convert
       * @returns the angle in degrees
       */
      static ToDegrees(angle) {
        return angle * 180 / Math.PI;
      }
      /**
       * Convert an angle in degrees to radians
       * @param angle defines the angle to convert
       * @returns the angle in radians
       */
      static ToRadians(angle) {
        return angle * Math.PI / 180;
      }
      /**
       * Smooth angle changes (kind of low-pass filter), in particular for device orientation "shaking"
       * Use trigonometric functions to avoid discontinuity (0/360, -180/180)
       * @param previousAngle defines last angle value, in degrees
       * @param newAngle defines new angle value, in degrees
       * @param smoothFactor defines smoothing sensitivity; min 0: no smoothing, max 1: new data ignored
       * @returns the angle in degrees
       */
      static SmoothAngleChange(previousAngle, newAngle, smoothFactor = 0.9) {
        const previousAngleRad = this.ToRadians(previousAngle);
        const newAngleRad = this.ToRadians(newAngle);
        return this.ToDegrees(Math.atan2((1 - smoothFactor) * Math.sin(newAngleRad) + smoothFactor * Math.sin(previousAngleRad), (1 - smoothFactor) * Math.cos(newAngleRad) + smoothFactor * Math.cos(previousAngleRad)));
      }
      /**
       * Returns an array if obj is not an array
       * @param obj defines the object to evaluate as an array
       * @param allowsNullUndefined defines a boolean indicating if obj is allowed to be null or undefined
       * @returns either obj directly if obj is an array or a new array containing obj
       */
      static MakeArray(obj, allowsNullUndefined) {
        if (allowsNullUndefined !== true && (obj === void 0 || obj == null)) {
          return null;
        }
        return Array.isArray(obj) ? obj : [obj];
      }
      /**
       * Gets the pointer prefix to use
       * @param engine defines the engine we are finding the prefix for
       * @returns "pointer" if touch is enabled. Else returns "mouse"
       */
      static GetPointerPrefix(engine) {
        let eventPrefix = "pointer";
        if (IsWindowObjectExist() && !window.PointerEvent) {
          eventPrefix = "mouse";
        }
        if (engine._badDesktopOS && !engine._badOS && // And not ipad pros who claim to be macs...
        !(document && "ontouchend" in document)) {
          eventPrefix = "mouse";
        }
        return eventPrefix;
      }
      /**
       * Sets the cors behavior on a dom element. This will add the required Tools.CorsBehavior to the element.
       * @param url define the url we are trying
       * @param element define the dom element where to configure the cors policy
       * @param element.crossOrigin
       */
      static SetCorsBehavior(url, element) {
        SetCorsBehavior(url, element);
      }
      /**
       * Sets the referrerPolicy behavior on a dom element.
       * @param referrerPolicy define the referrer policy to use
       * @param element define the dom element where to configure the referrer policy
       * @param element.referrerPolicy
       */
      static SetReferrerPolicyBehavior(referrerPolicy, element) {
        element.referrerPolicy = referrerPolicy;
      }
      // External files
      /**
       * Removes unwanted characters from an url
       * @param url defines the url to clean
       * @returns the cleaned url
       */
      static CleanUrl(url) {
        url = url.replace(/#/gm, "%23");
        return url;
      }
      /**
       * Gets or sets a function used to pre-process url before using them to load assets
       */
      static get PreprocessUrl() {
        return FileToolsOptions.PreprocessUrl;
      }
      static set PreprocessUrl(processor) {
        FileToolsOptions.PreprocessUrl = processor;
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
       */
      static LoadImage(input, onLoad, onError, offlineProvider, mimeType, imageBitmapOptions) {
        return LoadImage(input, onLoad, onError, offlineProvider, mimeType, imageBitmapOptions);
      }
      /**
       * Loads a file from a url
       * @param url url string, ArrayBuffer, or Blob to load
       * @param onSuccess callback called when the file successfully loads
       * @param onProgress callback called while file is loading (if the server supports this mode)
       * @param offlineProvider defines the offline provider for caching
       * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
       * @param onError callback called when the file fails to load
       * @returns a file request object
       */
      static LoadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError) {
        return LoadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError);
      }
      /**
       * Loads a file from a url
       * @param url the file url to load
       * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
       * @returns a promise containing an ArrayBuffer corresponding to the loaded file
       */
      static LoadFileAsync(url, useArrayBuffer = true) {
        return new Promise((resolve, reject) => {
          LoadFile(url, (data) => {
            resolve(data);
          }, void 0, void 0, useArrayBuffer, (request, exception) => {
            reject(exception);
          });
        });
      }
      /**
       * Get a script URL including preprocessing
       * @param scriptUrl the script Url to process
       * @param forceAbsoluteUrl force the script to be an absolute url (adding the current base url if necessary)
       * @returns a modified URL to use
       */
      static GetBabylonScriptURL(scriptUrl, forceAbsoluteUrl) {
        if (!scriptUrl) {
          return "";
        }
        if (_Tools.ScriptBaseUrl && scriptUrl.startsWith(_Tools._DefaultCdnUrl)) {
          const baseUrl = _Tools.ScriptBaseUrl[_Tools.ScriptBaseUrl.length - 1] === "/" ? _Tools.ScriptBaseUrl.substring(0, _Tools.ScriptBaseUrl.length - 1) : _Tools.ScriptBaseUrl;
          scriptUrl = scriptUrl.replace(_Tools._DefaultCdnUrl, baseUrl);
        }
        scriptUrl = _Tools.ScriptPreprocessUrl(scriptUrl);
        if (forceAbsoluteUrl) {
          scriptUrl = _Tools.GetAbsoluteUrl(scriptUrl);
        }
        return scriptUrl;
      }
      /**
       * This function is used internally by babylon components to load a script (identified by an url). When the url returns, the
       * content of this file is added into a new script element, attached to the DOM (body element)
       * @param scriptUrl defines the url of the script to load
       * @param onSuccess defines the callback called when the script is loaded
       * @param onError defines the callback to call if an error occurs
       * @param scriptId defines the id of the script element
       */
      static LoadBabylonScript(scriptUrl, onSuccess, onError, scriptId) {
        scriptUrl = _Tools.GetBabylonScriptURL(scriptUrl);
        _Tools.LoadScript(scriptUrl, onSuccess, onError);
      }
      /**
       * Load an asynchronous script (identified by an url). When the url returns, the
       * content of this file is added into a new script element, attached to the DOM (body element)
       * @param scriptUrl defines the url of the script to laod
       * @returns a promise request object
       */
      static LoadBabylonScriptAsync(scriptUrl) {
        scriptUrl = _Tools.GetBabylonScriptURL(scriptUrl);
        return _Tools.LoadScriptAsync(scriptUrl);
      }
      /**
       * This function is used internally by babylon components to load a script (identified by an url). When the url returns, the
       * content of this file is added into a new script element, attached to the DOM (body element)
       * @param scriptUrl defines the url of the script to load
       * @param onSuccess defines the callback called when the script is loaded
       * @param onError defines the callback to call if an error occurs
       * @param scriptId defines the id of the script element
       */
      static LoadScript(scriptUrl, onSuccess, onError, scriptId) {
        if (typeof importScripts === "function") {
          try {
            importScripts(scriptUrl);
            onSuccess();
          } catch (e) {
            onError == null ? void 0 : onError(`Unable to load script '${scriptUrl}' in worker`, e);
          }
          return;
        } else if (!IsWindowObjectExist()) {
          onError == null ? void 0 : onError(`Cannot load script '${scriptUrl}' outside of a window or a worker`);
          return;
        }
        const head = document.getElementsByTagName("head")[0];
        const script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", scriptUrl);
        if (scriptId) {
          script.id = scriptId;
        }
        script.onload = () => {
          if (onSuccess) {
            onSuccess();
          }
        };
        script.onerror = (e) => {
          if (onError) {
            onError(`Unable to load script '${scriptUrl}'`, e);
          }
        };
        head.appendChild(script);
      }
      /**
       * Load an asynchronous script (identified by an url). When the url returns, the
       * content of this file is added into a new script element, attached to the DOM (body element)
       * @param scriptUrl defines the url of the script to load
       * @param scriptId defines the id of the script element
       * @returns a promise request object
       */
      static LoadScriptAsync(scriptUrl, scriptId) {
        return new Promise((resolve, reject) => {
          this.LoadScript(scriptUrl, () => {
            resolve();
          }, (message, exception) => {
            reject(exception || new Error(message));
          }, scriptId);
        });
      }
      /**
       * Loads a file from a blob
       * @param fileToLoad defines the blob to use
       * @param callback defines the callback to call when data is loaded
       * @param progressCallback defines the callback to call during loading process
       * @returns a file request object
       */
      static ReadFileAsDataURL(fileToLoad, callback, progressCallback) {
        const reader = new FileReader();
        const request = {
          onCompleteObservable: new Observable(),
          abort: () => reader.abort()
        };
        reader.onloadend = () => {
          request.onCompleteObservable.notifyObservers(request);
        };
        reader.onload = (e) => {
          callback(e.target["result"]);
        };
        reader.onprogress = progressCallback;
        reader.readAsDataURL(fileToLoad);
        return request;
      }
      /**
       * Reads a file from a File object
       * @param file defines the file to load
       * @param onSuccess defines the callback to call when data is loaded
       * @param onProgress defines the callback to call during loading process
       * @param useArrayBuffer defines a boolean indicating that data must be returned as an ArrayBuffer
       * @param onError defines the callback to call when an error occurs
       * @returns a file request object
       */
      static ReadFile(file, onSuccess, onProgress, useArrayBuffer, onError) {
        return ReadFile(file, onSuccess, onProgress, useArrayBuffer, onError);
      }
      /**
       * Creates a data url from a given string content
       * @param content defines the content to convert
       * @returns the new data url link
       */
      static FileAsURL(content) {
        const fileBlob = new Blob([content]);
        const url = window.URL;
        const link = url.createObjectURL(fileBlob);
        return link;
      }
      /**
       * Format the given number to a specific decimal format
       * @param value defines the number to format
       * @param decimals defines the number of decimals to use
       * @returns the formatted string
       */
      static Format(value, decimals = 2) {
        return value.toFixed(decimals);
      }
      /**
       * Tries to copy an object by duplicating every property
       * @param source defines the source object
       * @param destination defines the target object
       * @param doNotCopyList defines a list of properties to avoid
       * @param mustCopyList defines a list of properties to copy (even if they start with _)
       */
      static DeepCopy(source, destination, doNotCopyList, mustCopyList) {
        DeepCopier.DeepCopy(source, destination, doNotCopyList, mustCopyList);
      }
      /**
       * Gets a boolean indicating if the given object has no own property
       * @param obj defines the object to test
       * @returns true if object has no own property
       */
      static IsEmpty(obj) {
        for (const i in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, i)) {
            return false;
          }
        }
        return true;
      }
      /**
       * Function used to register events at window level
       * @param windowElement defines the Window object to use
       * @param events defines the events to register
       */
      static RegisterTopRootEvents(windowElement, events) {
        for (let index = 0; index < events.length; index++) {
          const event = events[index];
          windowElement.addEventListener(event.name, event.handler, false);
          try {
            if (window.parent) {
              window.parent.addEventListener(event.name, event.handler, false);
            }
          } catch (e) {
          }
        }
      }
      /**
       * Function used to unregister events from window level
       * @param windowElement defines the Window object to use
       * @param events defines the events to unregister
       */
      static UnregisterTopRootEvents(windowElement, events) {
        for (let index = 0; index < events.length; index++) {
          const event = events[index];
          windowElement.removeEventListener(event.name, event.handler);
          try {
            if (windowElement.parent) {
              windowElement.parent.removeEventListener(event.name, event.handler);
            }
          } catch (e) {
          }
        }
      }
      /**
       * Dumps the current bound framebuffer
       * @param width defines the rendering width
       * @param height defines the rendering height
       * @param engine defines the hosting engine
       * @param successCallback defines the callback triggered once the data are available
       * @param mimeType defines the mime type of the result
       * @param fileName defines the filename to download. If present, the result will automatically be downloaded
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       * @returns a void promise
       */
      static async DumpFramebuffer(width, height, engine, successCallback, mimeType = "image/png", fileName, quality) {
        throw _WarnImport("DumpTools");
      }
      /**
       * Dumps an array buffer
       * @param width defines the rendering width
       * @param height defines the rendering height
       * @param data the data array
       * @param successCallback defines the callback triggered once the data are available
       * @param mimeType defines the mime type of the result
       * @param fileName defines the filename to download. If present, the result will automatically be downloaded
       * @param invertY true to invert the picture in the Y dimension
       * @param toArrayBuffer true to convert the data to an ArrayBuffer (encoded as `mimeType`) instead of a base64 string
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       */
      static DumpData(width, height, data, successCallback, mimeType = "image/png", fileName, invertY = false, toArrayBuffer = false, quality) {
        throw _WarnImport("DumpTools");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Dumps an array buffer
       * @param width defines the rendering width
       * @param height defines the rendering height
       * @param data the data array
       * @param mimeType defines the mime type of the result
       * @param fileName defines the filename to download. If present, the result will automatically be downloaded
       * @param invertY true to invert the picture in the Y dimension
       * @param toArrayBuffer true to convert the data to an ArrayBuffer (encoded as `mimeType`) instead of a base64 string
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       * @returns a promise that resolve to the final data
       */
      static DumpDataAsync(width, height, data, mimeType = "image/png", fileName, invertY = false, toArrayBuffer = false, quality) {
        throw _WarnImport("DumpTools");
      }
      static _IsOffScreenCanvas(canvas) {
        return canvas.convertToBlob !== void 0;
      }
      /**
       * Converts the canvas data to blob.
       * This acts as a polyfill for browsers not supporting the to blob function.
       * @param canvas Defines the canvas to extract the data from (can be an offscreen canvas)
       * @param successCallback Defines the callback triggered once the data are available
       * @param mimeType Defines the mime type of the result
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       */
      static ToBlob(canvas, successCallback, mimeType = "image/png", quality) {
        if (!_Tools._IsOffScreenCanvas(canvas) && !canvas.toBlob) {
          canvas.toBlob = function(callback, type, quality2) {
            setTimeout(() => {
              const binStr = atob(this.toDataURL(type, quality2).split(",")[1]), len = binStr.length, arr = new Uint8Array(len);
              for (let i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
              }
              callback(new Blob([arr]));
            });
          };
        }
        if (_Tools._IsOffScreenCanvas(canvas)) {
          canvas.convertToBlob({
            type: mimeType,
            quality
          }).then((blob) => successCallback(blob));
        } else {
          canvas.toBlob(function(blob) {
            successCallback(blob);
          }, mimeType, quality);
        }
      }
      /**
       * Download a Blob object
       * @param blob the Blob object
       * @param fileName the file name to download
       */
      static DownloadBlob(blob, fileName) {
        if ("download" in document.createElement("a")) {
          if (!fileName) {
            const date = /* @__PURE__ */ new Date();
            const stringDate = (date.getFullYear() + "-" + (date.getMonth() + 1)).slice(2) + "-" + date.getDate() + "_" + date.getHours() + "-" + ("0" + date.getMinutes()).slice(-2);
            fileName = "screenshot_" + stringDate + ".png";
          }
          _Tools.Download(blob, fileName);
        } else {
          if (blob && typeof URL !== "undefined") {
            const url = URL.createObjectURL(blob);
            const newWindow = window.open("");
            if (!newWindow) {
              return;
            }
            const img = newWindow.document.createElement("img");
            img.onload = function() {
              URL.revokeObjectURL(url);
            };
            img.src = url;
            newWindow.document.body.appendChild(img);
          }
        }
      }
      /**
       * Encodes the canvas data to base 64, or automatically downloads the result if `fileName` is defined.
       * @param canvas The canvas to get the data from, which can be an offscreen canvas.
       * @param successCallback The callback which is triggered once the data is available. If `fileName` is defined, the callback will be invoked after the download occurs, and the `data` argument will be an empty string.
       * @param mimeType The mime type of the result.
       * @param fileName The name of the file to download. If defined, the result will automatically be downloaded. If not defined, and `successCallback` is also not defined, the result will automatically be downloaded with an auto-generated file name.
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       */
      static EncodeScreenshotCanvasData(canvas, successCallback, mimeType = "image/png", fileName, quality) {
        if (typeof fileName === "string" || !successCallback) {
          this.ToBlob(canvas, function(blob) {
            if (blob) {
              _Tools.DownloadBlob(blob, fileName);
            }
            if (successCallback) {
              successCallback("");
            }
          }, mimeType, quality);
        } else if (successCallback) {
          if (_Tools._IsOffScreenCanvas(canvas)) {
            canvas.convertToBlob({
              type: mimeType,
              quality
            }).then((blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const base64data = reader.result;
                successCallback(base64data);
              };
            });
            return;
          }
          const base64Image = canvas.toDataURL(mimeType, quality);
          successCallback(base64Image);
        }
      }
      /**
       * Downloads a blob in the browser
       * @param blob defines the blob to download
       * @param fileName defines the name of the downloaded file
       */
      static Download(blob, fileName) {
        if (typeof URL === "undefined") {
          return;
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        a.addEventListener("click", () => {
          if (a.parentElement) {
            a.parentElement.removeChild(a);
          }
        });
        a.click();
        window.URL.revokeObjectURL(url);
      }
      /**
       * Will return the right value of the noPreventDefault variable
       * Needed to keep backwards compatibility to the old API.
       *
       * @param args arguments passed to the attachControl function
       * @returns the correct value for noPreventDefault
       */
      static BackCompatCameraNoPreventDefault(args) {
        if (typeof args[0] === "boolean") {
          return args[0];
        } else if (typeof args[1] === "boolean") {
          return args[1];
        }
        return false;
      }
      /**
       * Captures a screenshot of the current rendering
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
       * @param engine defines the rendering engine
       * @param camera defines the source camera
       * @param size This parameter can be set to a single number or to an object with the
       * following (optional) properties: precision, width, height. If a single number is passed,
       * it will be used for both width and height. If an object is passed, the screenshot size
       * will be derived from the parameters. The precision property is a multiplier allowing
       * rendering at a higher or lower resolution
       * @param successCallback defines the callback receives a single parameter which contains the
       * screenshot as a string of base64-encoded characters. This string can be assigned to the
       * src parameter of an <img> to display it
       * @param mimeType defines the MIME type of the screenshot image (default: image/png).
       * Check your browser for supported MIME types
       * @param forceDownload force the system to download the image even if a successCallback is provided
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static CreateScreenshot(engine, camera, size, successCallback, mimeType = "image/png", forceDownload = false, quality) {
        throw _WarnImport("ScreenshotTools");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Captures a screenshot of the current rendering
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
       * @param engine defines the rendering engine
       * @param camera defines the source camera
       * @param size This parameter can be set to a single number or to an object with the
       * following (optional) properties: precision, width, height. If a single number is passed,
       * it will be used for both width and height. If an object is passed, the screenshot size
       * will be derived from the parameters. The precision property is a multiplier allowing
       * rendering at a higher or lower resolution
       * @param mimeType defines the MIME type of the screenshot image (default: image/png).
       * Check your browser for supported MIME types
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       * @returns screenshot as a string of base64-encoded characters. This string can be assigned
       * to the src parameter of an <img> to display it
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static CreateScreenshotAsync(engine, camera, size, mimeType = "image/png", quality) {
        throw _WarnImport("ScreenshotTools");
      }
      /**
       * Generates an image screenshot from the specified camera.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
       * @param engine The engine to use for rendering
       * @param camera The camera to use for rendering
       * @param size This parameter can be set to a single number or to an object with the
       * following (optional) properties: precision, width, height. If a single number is passed,
       * it will be used for both width and height. If an object is passed, the screenshot size
       * will be derived from the parameters. The precision property is a multiplier allowing
       * rendering at a higher or lower resolution
       * @param successCallback The callback receives a single parameter which contains the
       * screenshot as a string of base64-encoded characters. This string can be assigned to the
       * src parameter of an <img> to display it
       * @param mimeType The MIME type of the screenshot image (default: image/png).
       * Check your browser for supported MIME types
       * @param samples Texture samples (default: 1)
       * @param antialiasing Whether antialiasing should be turned on or not (default: false)
       * @param fileName A name for for the downloaded file.
       * @param renderSprites Whether the sprites should be rendered or not (default: false)
       * @param enableStencilBuffer Whether the stencil buffer should be enabled or not (default: false)
       * @param useLayerMask if the camera's layer mask should be used to filter what should be rendered (default: true)
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static CreateScreenshotUsingRenderTarget(engine, camera, size, successCallback, mimeType = "image/png", samples = 1, antialiasing = false, fileName, renderSprites = false, enableStencilBuffer = false, useLayerMask = true, quality) {
        throw _WarnImport("ScreenshotTools");
      }
      // eslint-disable-next-line jsdoc/require-returns-check
      /**
       * Generates an image screenshot from the specified camera.
       * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
       * @param engine The engine to use for rendering
       * @param camera The camera to use for rendering
       * @param size This parameter can be set to a single number or to an object with the
       * following (optional) properties: precision, width, height. If a single number is passed,
       * it will be used for both width and height. If an object is passed, the screenshot size
       * will be derived from the parameters. The precision property is a multiplier allowing
       * rendering at a higher or lower resolution
       * @param mimeType The MIME type of the screenshot image (default: image/png).
       * Check your browser for supported MIME types
       * @param samples Texture samples (default: 1)
       * @param antialiasing Whether antialiasing should be turned on or not (default: false)
       * @param fileName A name for for the downloaded file.
       * @returns screenshot as a string of base64-encoded characters. This string can be assigned
       * @param renderSprites Whether the sprites should be rendered or not (default: false)
       * @param enableStencilBuffer Whether the stencil buffer should be enabled or not (default: false)
       * @param useLayerMask if the camera's layer mask should be used to filter what should be rendered (default: true)
       * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
       * to the src parameter of an <img> to display it
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static CreateScreenshotUsingRenderTargetAsync(engine, camera, size, mimeType = "image/png", samples = 1, antialiasing = false, fileName, renderSprites = false, enableStencilBuffer = false, useLayerMask = true, quality) {
        throw _WarnImport("ScreenshotTools");
      }
      /**
       * Implementation from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#answer-2117523
       * Be aware Math.random() could cause collisions, but:
       * "All but 6 of the 128 bits of the ID are randomly generated, which means that for any two ids, there's a 1 in 2^^122 (or 5.3x10^^36) chance they'll collide"
       * @returns a pseudo random id
       */
      static RandomId() {
        return RandomGUID();
      }
      /**
       * Test if the given uri is a base64 string
       * @deprecated Please use FileTools.IsBase64DataUrl instead.
       * @param uri The uri to test
       * @returns True if the uri is a base64 string or false otherwise
       */
      static IsBase64(uri) {
        return IsBase64DataUrl(uri);
      }
      /**
       * Decode the given base64 uri.
       * @deprecated Please use FileTools.DecodeBase64UrlToBinary instead.
       * @param uri The uri to decode
       * @returns The decoded base64 data.
       */
      static DecodeBase64(uri) {
        return DecodeBase64UrlToBinary(uri);
      }
      /**
       * Gets a value indicating the number of loading errors
       * @ignorenaming
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static get errorsCount() {
        return Logger.errorsCount;
      }
      /**
       * Log a message to the console
       * @param message defines the message to log
       */
      static Log(message) {
        Logger.Log(message);
      }
      /**
       * Write a warning message to the console
       * @param message defines the message to log
       */
      static Warn(message) {
        Logger.Warn(message);
      }
      /**
       * Write an error message to the console
       * @param message defines the message to log
       */
      static Error(message) {
        Logger.Error(message);
      }
      /**
       * Gets current log cache (list of logs)
       */
      static get LogCache() {
        return Logger.LogCache;
      }
      /**
       * Clears the log cache
       */
      static ClearLogCache() {
        Logger.ClearLogCache();
      }
      /**
       * Sets the current log level (MessageLogLevel / WarningLogLevel / ErrorLogLevel)
       */
      static set LogLevels(level) {
        Logger.LogLevels = level;
      }
      /**
       * Sets the current performance log level
       */
      static set PerformanceLogLevel(level) {
        if ((level & _Tools.PerformanceUserMarkLogLevel) === _Tools.PerformanceUserMarkLogLevel) {
          _Tools.StartPerformanceCounter = _Tools._StartUserMark;
          _Tools.EndPerformanceCounter = _Tools._EndUserMark;
          return;
        }
        if ((level & _Tools.PerformanceConsoleLogLevel) === _Tools.PerformanceConsoleLogLevel) {
          _Tools.StartPerformanceCounter = _Tools._StartPerformanceConsole;
          _Tools.EndPerformanceCounter = _Tools._EndPerformanceConsole;
          return;
        }
        _Tools.StartPerformanceCounter = _Tools._StartPerformanceCounterDisabled;
        _Tools.EndPerformanceCounter = _Tools._EndPerformanceCounterDisabled;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static _StartPerformanceCounterDisabled(counterName, condition) {
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static _EndPerformanceCounterDisabled(counterName, condition) {
      }
      static _StartUserMark(counterName, condition = true) {
        if (!_Tools._Performance) {
          if (!IsWindowObjectExist()) {
            return;
          }
          _Tools._Performance = window.performance;
        }
        if (!condition || !_Tools._Performance.mark) {
          return;
        }
        _Tools._Performance.mark(counterName + "-Begin");
      }
      static _EndUserMark(counterName, condition = true) {
        if (!condition || !_Tools._Performance.mark) {
          return;
        }
        _Tools._Performance.mark(counterName + "-End");
        _Tools._Performance.measure(counterName, counterName + "-Begin", counterName + "-End");
      }
      static _StartPerformanceConsole(counterName, condition = true) {
        if (!condition) {
          return;
        }
        _Tools._StartUserMark(counterName, condition);
        if (console.time) {
          console.time(counterName);
        }
      }
      static _EndPerformanceConsole(counterName, condition = true) {
        if (!condition) {
          return;
        }
        _Tools._EndUserMark(counterName, condition);
        console.timeEnd(counterName);
      }
      /**
       * Gets either window.performance.now() if supported or Date.now() else
       */
      static get Now() {
        return PrecisionDate.Now;
      }
      /**
       * This method will return the name of the class used to create the instance of the given object.
       * It will works only on Javascript basic data types (number, string, ...) and instance of class declared with the @className decorator.
       * @param object the object to get the class name from
       * @param isType defines if the object is actually a type
       * @returns the name of the class, will be "object" for a custom data type not using the @className decorator
       */
      static GetClassName(object, isType = false) {
        let name = null;
        if (!isType && object.getClassName) {
          name = object.getClassName();
        } else {
          if (object instanceof Object) {
            const classObj = isType ? object : Object.getPrototypeOf(object);
            name = classObj.constructor["__bjsclassName__"];
          }
          if (!name) {
            name = typeof object;
          }
        }
        return name;
      }
      /**
       * Gets the first element of an array satisfying a given predicate
       * @param array defines the array to browse
       * @param predicate defines the predicate to use
       * @returns null if not found or the element
       */
      static First(array, predicate) {
        for (const el of array) {
          if (predicate(el)) {
            return el;
          }
        }
        return null;
      }
      /**
       * This method will return the name of the full name of the class, including its owning module (if any).
       * It will works only on Javascript basic data types (number, string, ...) and instance of class declared with the @className decorator or implementing a method getClassName():string (in which case the module won't be specified).
       * @param object the object to get the class name from
       * @param isType defines if the object is actually a type
       * @returns a string that can have two forms: "moduleName.className" if module was specified when the class' Name was registered or "className" if there was not module specified.
       * @ignorenaming
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      static getFullClassName(object, isType = false) {
        let className2 = null;
        let moduleName = null;
        if (!isType && object.getClassName) {
          className2 = object.getClassName();
        } else {
          if (object instanceof Object) {
            const classObj = isType ? object : Object.getPrototypeOf(object);
            className2 = classObj.constructor["__bjsclassName__"];
            moduleName = classObj.constructor["__bjsmoduleName__"];
          }
          if (!className2) {
            className2 = typeof object;
          }
        }
        if (!className2) {
          return null;
        }
        return (moduleName != null ? moduleName + "." : "") + className2;
      }
      /**
       * Returns a promise that resolves after the given amount of time.
       * @param delay Number of milliseconds to delay
       * @returns Promise that resolves after the given amount of time
       */
      static DelayAsync(delay) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, delay);
        });
      }
      /**
       * Utility function to detect if the current user agent is Safari
       * @returns whether or not the current user agent is safari
       */
      static IsSafari() {
        if (!IsNavigatorAvailable()) {
          return false;
        }
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      }
    };
    Tools.UseCustomRequestHeaders = false;
    Tools.CustomRequestHeaders = WebRequest.CustomRequestHeaders;
    Tools.GetDOMTextContent = GetDOMTextContent;
    Tools._DefaultCdnUrl = "https://cdn.babylonjs.com";
    Tools.GetAbsoluteUrl = typeof document === "object" ? (url) => {
      const a = document.createElement("a");
      a.href = url;
      return a.href;
    } : typeof URL === "function" && typeof location === "object" ? (url) => new URL(url, location.origin).href : () => {
      throw new Error("Unable to get absolute URL. Override BABYLON.Tools.GetAbsoluteUrl to a custom implementation for the current context.");
    };
    Tools.NoneLogLevel = Logger.NoneLogLevel;
    Tools.MessageLogLevel = Logger.MessageLogLevel;
    Tools.WarningLogLevel = Logger.WarningLogLevel;
    Tools.ErrorLogLevel = Logger.ErrorLogLevel;
    Tools.AllLogLevel = Logger.AllLogLevel;
    Tools.IsWindowObjectExist = IsWindowObjectExist;
    Tools.PerformanceNoneLogLevel = 0;
    Tools.PerformanceUserMarkLogLevel = 1;
    Tools.PerformanceConsoleLogLevel = 2;
    Tools.StartPerformanceCounter = Tools._StartPerformanceCounterDisabled;
    Tools.EndPerformanceCounter = Tools._EndPerformanceCounterDisabled;
    AsyncLoop = class _AsyncLoop {
      /**
       * Constructor.
       * @param iterations the number of iterations.
       * @param func the function to run each iteration
       * @param successCallback the callback that will be called upon successful execution
       * @param offset starting offset.
       */
      constructor(iterations, func, successCallback, offset = 0) {
        this.iterations = iterations;
        this.index = offset - 1;
        this._done = false;
        this._fn = func;
        this._successCallback = successCallback;
      }
      /**
       * Execute the next iteration. Must be called after the last iteration was finished.
       */
      executeNext() {
        if (!this._done) {
          if (this.index + 1 < this.iterations) {
            ++this.index;
            this._fn(this);
          } else {
            this.breakLoop();
          }
        }
      }
      /**
       * Break the loop and run the success callback.
       */
      breakLoop() {
        this._done = true;
        this._successCallback();
      }
      /**
       * Create and run an async loop.
       * @param iterations the number of iterations.
       * @param fn the function to run each iteration
       * @param successCallback the callback that will be called upon successful execution
       * @param offset starting offset.
       * @returns the created async loop object
       */
      static Run(iterations, fn, successCallback, offset = 0) {
        const loop = new _AsyncLoop(iterations, fn, successCallback, offset);
        loop.executeNext();
        return loop;
      }
      /**
       * A for-loop that will run a given number of iterations synchronous and the rest async.
       * @param iterations total number of iterations
       * @param syncedIterations number of synchronous iterations in each async iteration.
       * @param fn the function to call each iteration.
       * @param callback a success call back that will be called when iterating stops.
       * @param breakFunction a break condition (optional)
       * @param timeout timeout settings for the setTimeout function. default - 0.
       * @returns the created async loop object
       */
      static SyncAsyncForLoop(iterations, syncedIterations, fn, callback, breakFunction, timeout = 0) {
        return _AsyncLoop.Run(Math.ceil(iterations / syncedIterations), (loop) => {
          if (breakFunction && breakFunction()) {
            loop.breakLoop();
          } else {
            setTimeout(() => {
              for (let i = 0; i < syncedIterations; ++i) {
                const iteration = loop.index * syncedIterations + i;
                if (iteration >= iterations) {
                  break;
                }
                fn(iteration);
                if (breakFunction && breakFunction()) {
                  loop.breakLoop();
                  break;
                }
              }
              loop.executeNext();
            }, timeout);
          }
        }, callback);
      }
    };
    Tools.Mix = Mix;
    Tools.IsExponentOfTwo = IsExponentOfTwo;
    EngineStore.FallbackTexture = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAAQAAAATgAAAAAAAABgAAAAAQAAAGAAAAABcGFpbnQubmV0IDQuMC41AP/bAEMABAIDAwMCBAMDAwQEBAQFCQYFBQUFCwgIBgkNCw0NDQsMDA4QFBEODxMPDAwSGBITFRYXFxcOERkbGRYaFBYXFv/bAEMBBAQEBQUFCgYGChYPDA8WFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFv/AABEIAQABAAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APH6KKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FCiiigD6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++gooooA+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gUKKKKAPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76CiiigD5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BQooooA+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/voKKKKAPl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FCiiigD6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++gooooA+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gUKKKKAPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76CiiigD5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BQooooA+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/voKKKKAPl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FCiiigD6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++gooooA+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gUKKKKAPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76Pl+iiivuj+BT6gooor4U/vo+X6KKK+6P4FPqCiiivhT++j5fooor7o/gU+oKKKK+FP76P//Z";
  }
});

export {
  DeepCopier,
  init_deepCopier,
  WebRequest,
  init_webRequest,
  FilesInputStore,
  init_filesInputStore,
  RetryStrategy,
  init_retryStrategy,
  BaseError,
  ErrorCodes,
  RuntimeError,
  init_error,
  EndsWith,
  StartsWith,
  Decode,
  EncodeArrayBufferToBase64,
  DecodeBase64ToString,
  DecodeBase64ToBinary,
  PadNumber,
  StringTools,
  init_stringTools,
  TimingTools,
  init_timingTools,
  LoadFileError,
  RequestFileError,
  ReadFileError,
  FileToolsOptions,
  SetCorsBehavior,
  LoadImage,
  ReadFile,
  LoadFile,
  RequestFile,
  IsFileURL,
  IsBase64DataUrl,
  TestBase64DataUrl,
  DecodeBase64UrlToBinary,
  DecodeBase64UrlToString,
  FileTools,
  _injectLTSFileTools,
  init_fileTools,
  InstantiationTools,
  init_instantiationTools,
  RandomGUID,
  GUID,
  init_guid,
  IsExponentOfTwo,
  Mix,
  init_tools_functions,
  Tools,
  className,
  AsyncLoop,
  init_tools
};
//# sourceMappingURL=chunk-TOSJRSWD.js.map
