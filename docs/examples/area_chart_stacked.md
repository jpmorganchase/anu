---
aside: false
---
<script setup>
import { areaChartStacked } from '../anu-examples/areaChartStacked.js'
</script>

#  Stacked Area Chart
Stacked 2D area chart using [Ribbon](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/ribbon/) to visualize US employment data. This example also includes a legend.

<singleView :scene="areaChartStacked" />

::: code-group
<<< @/./anu-examples/areaChartStacked.js 
:::