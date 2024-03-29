import {
  PrecisionDate,
  init_precisionDate
} from "./chunk-G255QWNV.js";
import {
  __esm
} from "./chunk-CF3WPAMV.js";

// node_modules/@babylonjs/core/Misc/perfCounter.js
var PerfCounter;
var init_perfCounter = __esm({
  "node_modules/@babylonjs/core/Misc/perfCounter.js"() {
    init_precisionDate();
    PerfCounter = class _PerfCounter {
      /**
       * Returns the smallest value ever
       */
      get min() {
        return this._min;
      }
      /**
       * Returns the biggest value ever
       */
      get max() {
        return this._max;
      }
      /**
       * Returns the average value since the performance counter is running
       */
      get average() {
        return this._average;
      }
      /**
       * Returns the average value of the last second the counter was monitored
       */
      get lastSecAverage() {
        return this._lastSecAverage;
      }
      /**
       * Returns the current value
       */
      get current() {
        return this._current;
      }
      /**
       * Gets the accumulated total
       */
      get total() {
        return this._totalAccumulated;
      }
      /**
       * Gets the total value count
       */
      get count() {
        return this._totalValueCount;
      }
      /**
       * Creates a new counter
       */
      constructor() {
        this._startMonitoringTime = 0;
        this._min = 0;
        this._max = 0;
        this._average = 0;
        this._lastSecAverage = 0;
        this._current = 0;
        this._totalValueCount = 0;
        this._totalAccumulated = 0;
        this._lastSecAccumulated = 0;
        this._lastSecTime = 0;
        this._lastSecValueCount = 0;
      }
      /**
       * Call this method to start monitoring a new frame.
       * This scenario is typically used when you accumulate monitoring time many times for a single frame, you call this method at the start of the frame, then beginMonitoring to start recording and endMonitoring(false) to accumulated the recorded time to the PerfCounter or addCount() to accumulate a monitored count.
       */
      fetchNewFrame() {
        this._totalValueCount++;
        this._current = 0;
        this._lastSecValueCount++;
      }
      /**
       * Call this method to monitor a count of something (e.g. mesh drawn in viewport count)
       * @param newCount the count value to add to the monitored count
       * @param fetchResult true when it's the last time in the frame you add to the counter and you wish to update the statistics properties (min/max/average), false if you only want to update statistics.
       */
      addCount(newCount, fetchResult) {
        if (!_PerfCounter.Enabled) {
          return;
        }
        this._current += newCount;
        if (fetchResult) {
          this._fetchResult();
        }
      }
      /**
       * Start monitoring this performance counter
       */
      beginMonitoring() {
        if (!_PerfCounter.Enabled) {
          return;
        }
        this._startMonitoringTime = PrecisionDate.Now;
      }
      /**
       * Compute the time lapsed since the previous beginMonitoring() call.
       * @param newFrame true by default to fetch the result and monitor a new frame, if false the time monitored will be added to the current frame counter
       */
      endMonitoring(newFrame = true) {
        if (!_PerfCounter.Enabled) {
          return;
        }
        if (newFrame) {
          this.fetchNewFrame();
        }
        const currentTime = PrecisionDate.Now;
        this._current = currentTime - this._startMonitoringTime;
        if (newFrame) {
          this._fetchResult();
        }
      }
      /**
       * Call this method to end the monitoring of a frame.
       * This scenario is typically used when you accumulate monitoring time many times for a single frame, you call this method at the end of the frame, after beginMonitoring to start recording and endMonitoring(false) to accumulated the recorded time to the PerfCounter or addCount() to accumulate a monitored count.
       */
      endFrame() {
        this._fetchResult();
      }
      /** @internal */
      _fetchResult() {
        this._totalAccumulated += this._current;
        this._lastSecAccumulated += this._current;
        this._min = Math.min(this._min, this._current);
        this._max = Math.max(this._max, this._current);
        this._average = this._totalAccumulated / this._totalValueCount;
        const now = PrecisionDate.Now;
        if (now - this._lastSecTime > 1e3) {
          this._lastSecAverage = this._lastSecAccumulated / this._lastSecValueCount;
          this._lastSecTime = now;
          this._lastSecAccumulated = 0;
          this._lastSecValueCount = 0;
        }
      }
    };
    PerfCounter.Enabled = true;
  }
});

export {
  PerfCounter,
  init_perfCounter
};
//# sourceMappingURL=chunk-XS4HXWVV.js.map
