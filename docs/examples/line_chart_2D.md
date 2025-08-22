---
aside: false
---

<script setup>
import { linechart2D } from '../anu-examples/linechart2D.js'
</script>

# 2D Line Chart
Basic 2D timeseries using [LineSystem](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/line_system/) of five stocks and their prices between 2000 and 2010.

<singleView :scene="linechart2D" />

::: code-group
<<< @/./anu-examples/linechart2D.js 
:::