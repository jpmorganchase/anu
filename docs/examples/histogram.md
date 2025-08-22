---
aside: false
---
<script setup>
import { histogram } from '../anu-examples/histogram.js'
</script>

# Histogram
Histogram using the penguins dataset to show the distribution of beak lengths. Uses the [bin()](https://d3js.org/d3-array/bin) functions from D3.

<singleView :scene="histogram" />

::: code-group
<<< @/./anu-examples/histogram.js 
:::