---
aside: false
---
<script setup>
import { barchart3D } from '../anu-examples/BarCharts/barchart3d.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# 3D Bar Chart

<singleView :scene="barchart3D" />

::: code-group
<<< @/./anu-examples/BarCharts/barchart3d.js 

<<< @/./anu-examples/data/cars.json
:::