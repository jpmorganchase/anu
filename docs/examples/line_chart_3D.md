---
aside: false
---

<script setup>
import { linechart3D } from '../anu-examples/linechart3D.js'
</script>

# 3D Line Chart
Recreation of the [3D Yield Curve](https://www.nytimes.com/interactive/2015/03/19/upshot/3d-yield-curve-economic-growth.html) from The New York Times.

<singleView :scene="linechart3D" />

::: code-group
<<< @/./anu-examples/linechart3D.js 
:::