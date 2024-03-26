---
aside: false
---

<script setup>
import { scatterplot3D } from '../anu-examples/ScatterPlots/Scatterplot3D.js'
import singleView  from '../vue_components/singleView.vue'

</script>



# 3D Scatter Plot 

<singleView :scene="scatterplot3D" />


::: code-group
<<< @/../anu-examples/examples/ScatterPlots/Scatterplot3D.js 

<<< @/../anu-examples/data/iris.json
:::