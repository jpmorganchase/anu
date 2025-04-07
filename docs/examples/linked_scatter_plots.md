---
aside: false
---

<script setup>
import { linkedScatterPlots } from '../anu-examples/linkedScatterPlots.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# Linked Scatter Plots
Minimal re-implementation of linked scatter plots found in works such as [STREAM by Hubenschmid et al.](https://dl.acm.org/doi/abs/10.1145/3411764.3445298) Adapted from code originally written by Sebastian Hubenschmid. Hold the right mouse button to pan the camera on the browser.

<singleView :scene="linkedScatterPlots" />

::: code-group
<<< @/./anu-examples/linkedScatterPlots.js 
:::