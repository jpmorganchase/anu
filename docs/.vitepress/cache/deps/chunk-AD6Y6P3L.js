import {
  __esm
} from "./chunk-CF3WPAMV.js";

// node_modules/@babylonjs/core/Misc/observable.js
var EventState, Observer, Observable;
var init_observable = __esm({
  "node_modules/@babylonjs/core/Misc/observable.js"() {
    EventState = class {
      /**
       * Create a new EventState
       * @param mask defines the mask associated with this state
       * @param skipNextObservers defines a flag which will instruct the observable to skip following observers when set to true
       * @param target defines the original target of the state
       * @param currentTarget defines the current target of the state
       */
      constructor(mask, skipNextObservers = false, target, currentTarget) {
        this.initialize(mask, skipNextObservers, target, currentTarget);
      }
      /**
       * Initialize the current event state
       * @param mask defines the mask associated with this state
       * @param skipNextObservers defines a flag which will instruct the observable to skip following observers when set to true
       * @param target defines the original target of the state
       * @param currentTarget defines the current target of the state
       * @returns the current event state
       */
      initialize(mask, skipNextObservers = false, target, currentTarget) {
        this.mask = mask;
        this.skipNextObservers = skipNextObservers;
        this.target = target;
        this.currentTarget = currentTarget;
        return this;
      }
    };
    Observer = class {
      /**
       * Creates a new observer
       * @param callback defines the callback to call when the observer is notified
       * @param mask defines the mask of the observer (used to filter notifications)
       * @param scope defines the current scope used to restore the JS context
       */
      constructor(callback, mask, scope = null) {
        this.callback = callback;
        this.mask = mask;
        this.scope = scope;
        this._willBeUnregistered = false;
        this.unregisterOnNextCall = false;
        this._remove = null;
      }
      /**
       * Remove the observer from its observable
       * This can be used instead of using the observable's remove function.
       */
      remove() {
        if (this._remove) {
          this._remove();
        }
      }
    };
    Observable = class _Observable {
      /**
       * Create an observable from a Promise.
       * @param promise a promise to observe for fulfillment.
       * @param onErrorObservable an observable to notify if a promise was rejected.
       * @returns the new Observable
       */
      static FromPromise(promise, onErrorObservable) {
        const observable = new _Observable();
        promise.then((ret) => {
          observable.notifyObservers(ret);
        }).catch((err) => {
          if (onErrorObservable) {
            onErrorObservable.notifyObservers(err);
          } else {
            throw err;
          }
        });
        return observable;
      }
      /**
       * Gets the list of observers
       * Note that observers that were recently deleted may still be present in the list because they are only really deleted on the next javascript tick!
       */
      get observers() {
        return this._observers;
      }
      /**
       * Creates a new observable
       * @param onObserverAdded defines a callback to call when a new observer is added
       * @param notifyIfTriggered If set to true the observable will notify when an observer was added if the observable was already triggered.
       */
      constructor(onObserverAdded, notifyIfTriggered = false) {
        this.notifyIfTriggered = notifyIfTriggered;
        this._observers = new Array();
        this._numObserversMarkedAsDeleted = 0;
        this._hasNotified = false;
        this._eventState = new EventState(0);
        if (onObserverAdded) {
          this._onObserverAdded = onObserverAdded;
        }
      }
      add(callback, mask = -1, insertFirst = false, scope = null, unregisterOnFirstCall = false) {
        if (!callback) {
          return null;
        }
        const observer = new Observer(callback, mask, scope);
        observer.unregisterOnNextCall = unregisterOnFirstCall;
        if (insertFirst) {
          this._observers.unshift(observer);
        } else {
          this._observers.push(observer);
        }
        if (this._onObserverAdded) {
          this._onObserverAdded(observer);
        }
        if (this._hasNotified && this.notifyIfTriggered) {
          if (this._lastNotifiedValue !== void 0) {
            this.notifyObserver(observer, this._lastNotifiedValue);
          }
        }
        observer._remove = () => {
          this.remove(observer);
        };
        return observer;
      }
      addOnce(callback) {
        return this.add(callback, void 0, void 0, void 0, true);
      }
      /**
       * Remove an Observer from the Observable object
       * @param observer the instance of the Observer to remove
       * @returns false if it doesn't belong to this Observable
       */
      remove(observer) {
        if (!observer) {
          return false;
        }
        observer._remove = null;
        const index = this._observers.indexOf(observer);
        if (index !== -1) {
          this._deferUnregister(observer);
          return true;
        }
        return false;
      }
      /**
       * Remove a callback from the Observable object
       * @param callback the callback to remove
       * @param scope optional scope. If used only the callbacks with this scope will be removed
       * @returns false if it doesn't belong to this Observable
       */
      removeCallback(callback, scope) {
        for (let index = 0; index < this._observers.length; index++) {
          const observer = this._observers[index];
          if (observer._willBeUnregistered) {
            continue;
          }
          if (observer.callback === callback && (!scope || scope === observer.scope)) {
            this._deferUnregister(observer);
            return true;
          }
        }
        return false;
      }
      /**
       * @internal
       */
      _deferUnregister(observer) {
        if (observer._willBeUnregistered) {
          return;
        }
        this._numObserversMarkedAsDeleted++;
        observer.unregisterOnNextCall = false;
        observer._willBeUnregistered = true;
        setTimeout(() => {
          this._remove(observer);
        }, 0);
      }
      // This should only be called when not iterating over _observers to avoid callback skipping.
      // Removes an observer from the _observer Array.
      _remove(observer, updateCounter = true) {
        if (!observer) {
          return false;
        }
        const index = this._observers.indexOf(observer);
        if (index !== -1) {
          if (updateCounter) {
            this._numObserversMarkedAsDeleted--;
          }
          this._observers.splice(index, 1);
          return true;
        }
        return false;
      }
      /**
       * Moves the observable to the top of the observer list making it get called first when notified
       * @param observer the observer to move
       */
      makeObserverTopPriority(observer) {
        this._remove(observer, false);
        this._observers.unshift(observer);
      }
      /**
       * Moves the observable to the bottom of the observer list making it get called last when notified
       * @param observer the observer to move
       */
      makeObserverBottomPriority(observer) {
        this._remove(observer, false);
        this._observers.push(observer);
      }
      /**
       * Notify all Observers by calling their respective callback with the given data
       * Will return true if all observers were executed, false if an observer set skipNextObservers to true, then prevent the subsequent ones to execute
       * @param eventData defines the data to send to all observers
       * @param mask defines the mask of the current notification (observers with incompatible mask (ie mask & observer.mask === 0) will not be notified)
       * @param target defines the original target of the state
       * @param currentTarget defines the current target of the state
       * @param userInfo defines any user info to send to observers
       * @returns false if the complete observer chain was not processed (because one observer set the skipNextObservers to true)
       */
      notifyObservers(eventData, mask = -1, target, currentTarget, userInfo) {
        if (this.notifyIfTriggered) {
          this._hasNotified = true;
          this._lastNotifiedValue = eventData;
        }
        if (!this._observers.length) {
          return true;
        }
        const state = this._eventState;
        state.mask = mask;
        state.target = target;
        state.currentTarget = currentTarget;
        state.skipNextObservers = false;
        state.lastReturnValue = eventData;
        state.userInfo = userInfo;
        for (const obs of this._observers) {
          if (obs._willBeUnregistered) {
            continue;
          }
          if (obs.mask & mask) {
            if (obs.unregisterOnNextCall) {
              this._deferUnregister(obs);
            }
            if (obs.scope) {
              state.lastReturnValue = obs.callback.apply(obs.scope, [eventData, state]);
            } else {
              state.lastReturnValue = obs.callback(eventData, state);
            }
          }
          if (state.skipNextObservers) {
            return false;
          }
        }
        return true;
      }
      /**
       * Notify a specific observer
       * @param observer defines the observer to notify
       * @param eventData defines the data to be sent to each callback
       * @param mask is used to filter observers defaults to -1
       */
      notifyObserver(observer, eventData, mask = -1) {
        if (this.notifyIfTriggered) {
          this._hasNotified = true;
          this._lastNotifiedValue = eventData;
        }
        if (observer._willBeUnregistered) {
          return;
        }
        const state = this._eventState;
        state.mask = mask;
        state.skipNextObservers = false;
        if (observer.unregisterOnNextCall) {
          this._deferUnregister(observer);
        }
        observer.callback(eventData, state);
      }
      /**
       * Gets a boolean indicating if the observable has at least one observer
       * @returns true is the Observable has at least one Observer registered
       */
      hasObservers() {
        return this._observers.length - this._numObserversMarkedAsDeleted > 0;
      }
      /**
       * Clear the list of observers
       */
      clear() {
        while (this._observers.length) {
          const o = this._observers.pop();
          if (o) {
            o._remove = null;
          }
        }
        this._onObserverAdded = null;
        this._numObserversMarkedAsDeleted = 0;
        this.cleanLastNotifiedState();
      }
      /**
       * Clean the last notified state - both the internal last value and the has-notified flag
       */
      cleanLastNotifiedState() {
        this._hasNotified = false;
        this._lastNotifiedValue = void 0;
      }
      /**
       * Clone the current observable
       * @returns a new observable
       */
      clone() {
        const result = new _Observable();
        result._observers = this._observers.slice(0);
        return result;
      }
      /**
       * Does this observable handles observer registered with a given mask
       * @param mask defines the mask to be tested
       * @returns whether or not one observer registered with the given mask is handled
       **/
      hasSpecificMask(mask = -1) {
        for (const obs of this._observers) {
          if (obs.mask & mask || obs.mask === mask) {
            return true;
          }
        }
        return false;
      }
    };
  }
});

// node_modules/@babylonjs/core/Engines/engineStore.js
var EngineStore;
var init_engineStore = __esm({
  "node_modules/@babylonjs/core/Engines/engineStore.js"() {
    init_observable();
    EngineStore = class {
      /**
       * Gets the latest created engine
       */
      static get LastCreatedEngine() {
        if (this.Instances.length === 0) {
          return null;
        }
        return this.Instances[this.Instances.length - 1];
      }
      /**
       * Gets the latest created scene
       */
      static get LastCreatedScene() {
        return this._LastCreatedScene;
      }
    };
    EngineStore.Instances = [];
    EngineStore.OnEnginesDisposedObservable = new Observable();
    EngineStore._LastCreatedScene = null;
    EngineStore.UseFallbackTexture = true;
    EngineStore.FallbackTexture = "";
  }
});

// node_modules/@babylonjs/core/Engines/performanceConfigurator.js
var PerformanceConfigurator;
var init_performanceConfigurator = __esm({
  "node_modules/@babylonjs/core/Engines/performanceConfigurator.js"() {
    PerformanceConfigurator = class _PerformanceConfigurator {
      /**
       * @internal
       */
      static SetMatrixPrecision(use64bits) {
        _PerformanceConfigurator.MatrixTrackPrecisionChange = false;
        if (use64bits && !_PerformanceConfigurator.MatrixUse64Bits) {
          if (_PerformanceConfigurator.MatrixTrackedMatrices) {
            for (let m = 0; m < _PerformanceConfigurator.MatrixTrackedMatrices.length; ++m) {
              const matrix = _PerformanceConfigurator.MatrixTrackedMatrices[m];
              const values = matrix._m;
              matrix._m = new Array(16);
              for (let i = 0; i < 16; ++i) {
                matrix._m[i] = values[i];
              }
            }
          }
        }
        _PerformanceConfigurator.MatrixUse64Bits = use64bits;
        _PerformanceConfigurator.MatrixCurrentType = _PerformanceConfigurator.MatrixUse64Bits ? Array : Float32Array;
        _PerformanceConfigurator.MatrixTrackedMatrices = null;
      }
    };
    PerformanceConfigurator.MatrixUse64Bits = false;
    PerformanceConfigurator.MatrixTrackPrecisionChange = true;
    PerformanceConfigurator.MatrixCurrentType = Float32Array;
    PerformanceConfigurator.MatrixTrackedMatrices = [];
  }
});

export {
  EventState,
  Observer,
  Observable,
  init_observable,
  EngineStore,
  init_engineStore,
  PerformanceConfigurator,
  init_performanceConfigurator
};
//# sourceMappingURL=chunk-AD6Y6P3L.js.map
