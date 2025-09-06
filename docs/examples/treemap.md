---
aside: false
---
<script setup>
import { treemap } from '../anu-examples/treemap.js'
</script>

# Treemap
An example of a 3D treemap using [`d3.treemap()`](https://d3js.org/d3-hierarchy/treemap) adapted from [@D3](https://observablehq.com/@d3/treemap/2).

<singleView :scene="treemap" />

::: code-group
<<< @/./anu-examples/treemap.js 
:::