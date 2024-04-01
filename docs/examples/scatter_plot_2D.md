---
aside: false
---
<script setup>
import { scatterplot2D } from '../anu-examples/ScatterPlots/Scatterplot2D.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# 2D Scatter Plot 

<singleView :scene="scatterplot2D" />

::: code-group
<<< @/./anu-examples/ScatterPlots/Scatterplot2D.js 

<<< @/./anu-examples/data/iris.json
:::