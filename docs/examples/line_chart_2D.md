---
aside: false
---

<script setup>
import { linechart2D } from '../anu-examples/linechart2D.js'
import { linechart2DTubes } from '../anu-examples/linechart2DTubes.js'
</script>

# 2D Line Chart
Basic 2D timeseries using [LineSystem](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/line_system/) of five stocks and their prices between 2000 and 2010.

<singleView :scene="linechart2D" />

Alternatively, [Tubes](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/tube/) can be used to provide further visual control over each line. In particular, the radius of each Tube can be set (LineSystem does not support this), making the lines easier to see from long distances.

<singleView :scene="linechart2DTubes" />

::: code-group
<<< @/./anu-examples/linechart2D.js 
<<< @/./anu-examples/linechart2DTubes.js 
:::