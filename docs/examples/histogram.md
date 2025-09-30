---
aside: false
---
<script setup>
import { histogram } from '../anu-examples/histogram.js'
</script>

# Histogram
Histogram using the penguins dataset to show the distribution of beak lengths. Uses [`d3.bin()`](https://d3js.org/d3-array/bin).

<singleView :scene="histogram" />

::: code-group
<<< @/./anu-examples/histogram.js 
:::