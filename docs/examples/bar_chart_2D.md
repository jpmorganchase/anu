---
aside: false
---
<script setup>
import { barchart2d } from '../anu-examples/BarCharts/barchart2d.js'
import singleView  from '../vue_components/singleView.vue'
</script>

# 2D Bar Chart

<singleView :scene="barchart2d" />

::: code-group
<<< @/./anu-examples/BarCharts/barchart2d.js 

<<< @/./anu-examples/data/cars.json
:::