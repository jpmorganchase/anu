---
aside: false
---

<script setup>
import { tiltMap } from '../anu-examples/tiltMap.js'
</script>

# Tilt Map
Basic re-implementation of [Tilt Map by Yang et al.](https://arxiv.org/abs/2006.14120) Grab and tilt the chart in XR or drag the bottom slider on the browser to transition the chart between a bar, prism, and choropleth map based on tilt angle. For the best effect, smoothly change the tilt angle of the chart.

<singleView :scene="tiltMap" />

::: code-group
<<< @/./anu-examples/tiltMap.js 
:::