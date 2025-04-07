---
aside: false
---
<script setup>
import { animationBarChartRace } from '../anu-examples/animationBarChartRace.js'
</script>

# Bar Chart Race
Reimplementation of the [Bar Chart Race, Explained](https://observablehq.com/@d3/bar-chart-race-explained) example by Mike Bostock, showing the top 12 stock prices as a race between 2000 and 2018. This example illustrates one approach to creating a constant animation between multiple timestamps.

<singleView :scene="animationBarChartRace" />

::: code-group
<<< @/./anu-examples/animationBarChartRace.js 
:::