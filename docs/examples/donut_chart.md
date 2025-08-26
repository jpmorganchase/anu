---
aside: false
---
<script setup>
import { donutChart } from '../anu-examples/donutChart.js'
</script>

# Donut Chart
Basic donut chart using the [pie()](https://d3js.org/d3-shape/pie) functions from D3. The code is functionally the same as that for the [Pie Chart](./pie_chart.md) except with an additional step where the center of the pie is subtracted using [Constructive Solid Geometry (CSG)](https://doc.babylonjs.com/features/featuresDeepDive/mesh/mergeMeshes#merging-meshes-with-constructive-solid-geometry), which is a wrapper around the [Manifold library](https://www.npmjs.com/package/manifold-3d).

<singleView :scene="donutChart" />

::: code-group
<<< @/./anu-examples/donutChart.js 
:::