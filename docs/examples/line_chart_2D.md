---
aside: false
---

<script setup>
import { linechart2D } from '../anu-examples/LineCharts/linechart2D.js'
import singleView  from '../vue_components/singleView.vue'
</script>

# 2D Line Chart

<singleView :scene="linechart2D" />

::: code-group
<<< @/./anu-examples/LineCharts/linechart2D.js 

<<< @/./anu-examples/data/yield-curve.csv
:::