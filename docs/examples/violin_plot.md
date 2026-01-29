---
aside: false
---
<script setup>
import { violinPlot } from '../anu-examples/violinPlot.js'
</script>

# Violin Plot
Violin plot using [Ribbon](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/ribbon/) adapted from the [violin plot from kernel density estimate](https://d3-graph-gallery.com/graph/violin_basicDens.html) example from the D3 Graph Gallery.

<singleView :scene="violinPlot" />

::: code-group
<<< @/./anu-examples/violinPlot.js 
:::
