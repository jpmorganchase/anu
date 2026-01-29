---
aside: false
---
<script setup>
import { violinChart } from '../anu-examples/violinChart.js'
</script>

# Violin Chart
Violin chart using the penguins dataset to show the distribution of beak lengths across three different penguin species. Uses kernel density estimation to create smooth distribution curves. Violin plots are particularly useful for visualizing the full distribution of data, showing not just the median but also the density at different values.

Adapted from the [violin plot from kernel density estimate](https://d3-graph-gallery.com/graph/violin_basicDens.html) example from the D3 Graph Gallery.

<singleView :scene="violinChart" />

::: code-group
<<< @/./anu-examples/violinChart.js 
:::
