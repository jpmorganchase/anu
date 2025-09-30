---
aside: false
---

<script setup>
import { surfaceChart } from '../anu-examples/surfaceChart.js'
</script>

# Surface Chart
Recreation of the [3D Yield Curve](https://www.nytimes.com/interactive/2015/03/19/upshot/3d-yield-curve-economic-growth.html) from The New York Times.

<singleView :scene="surfaceChart" />

::: code-group
<<< @/./anu-examples/surfaceChart.js 
:::