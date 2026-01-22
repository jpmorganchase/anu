---
aside: false
---
<script setup>
import { benchmarkResults } from '../anu-examples/benchmarkResults.js'
</script>

# Benchmark Result Line Charts
Live versions of the benchmarking results found in the Anu.js CHI paper. This example demonstrates how Anu could be used to create more traditional looking 2D data visualizations. Scroll wheel zoom, and press and hold the right mouse button to pan the screen.

<singleView :scene="benchmarkResults" />

::: code-group
<<< @/./anu-examples/benchmarkResults.js
<<< @/./anu-examples/data/anu-benchmark-standard-q3.csv
<<< @/./anu-examples/data/anu-benchmark-optimized-q3.csv
<<< @/./anu-examples/data/anu-benchmark-standard-avp.csv
<<< @/./anu-examples/data/anu-benchmark-optimized-avp.csv
<<< @/./anu-examples/data/anu-benchmark-standard-gxr.csv
<<< @/./anu-examples/data/anu-benchmark-optimized-gxr.csv
<<< @/./anu-examples/data/anu-benchmark-standard-pc.csv
<<< @/./anu-examples/data/anu-benchmark-optimized-pc.csv
:::