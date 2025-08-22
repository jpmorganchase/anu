---
aside: false
---
<script setup>
import { histogramMultiple } from '../anu-examples/histogramMultiple.js'
</script>

# Multiple Histograms
Multiple histograms as 3D layers using the penguins dataset to show the distribution of beak length of three different penguin species. Uses the [bin()](https://d3js.org/d3-array/bin) functions from D3.

<singleView :scene="histogramMultiple" />

::: code-group
<<< @/./anu-examples/histogramMultiple.js 
:::