---
aside: false
---
<script setup>
import { benchmark } from '../anu-examples/benchmark.js'
</script>

# Anu Benchmark

This interactive benchmark compares the performance of different Anu binding methods: `bind`, `bindClone`, `bindInstance`, and `bindThinInstance`.

The benchmark uses exponential growth (1.5x per iteration) starting from 1,000 cubes up to 10 million cubes, and measures:
- **Creation Time**: How long it takes to create and position the cubes
- **FPS**: Frames per second during rendering
- **CPU Time**: CPU frame time from Babylon's engine
- **GPU Time**: GPU frame time from instrumentation
- **Memory Usage**: JavaScript heap memory consumption (Chrome only with `--enable-precise-memory-info` flag)

The benchmark automatically stops when FPS drops below 30 for two consecutive tests or when the maximum cube count is reached.

**Controls:**
- Click "Start Benchmark" to run all tests
- Click "Clear Scene" to remove all cubes
- Click "Download CSV" to export results
- Press **G** to toggle GUI visibility

<singleView :scene="benchmark" />

::: code-group
<<< @/./anu-examples/benchmark.js 
:::

## Understanding the Results

### Binding Methods

1. **bind**: Creates individual meshes for each cube - Most flexible but least performant
2. **bindClone**: Creates clones from a source mesh - Better performance, shared geometry
3. **bindInstance**: Creates GPU instances - Excellent performance, shared material
4. **bindThinInstance**: Creates thin instances - Best performance, single draw call

### Performance Metrics

- **Lower creation time** = faster initialization
- **Higher FPS** = smoother rendering
- **Lower CPU/GPU time** = more efficient processing
- **Lower memory usage** = better resource utilization

Use this benchmark to understand which binding method is best suited for your visualization needs based on the number of objects and required features.
