---
aside: false
---
<script setup>
import { trajectoryMultiple3D } from '../anu-examples/trajectoryMultiple3D.js'
</script>

# Multiple 3D Trajectories
Basic example of visualizing multiple 3D trajectories using [GreasedLines](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line). This example uses data binding to set the vertices and colors of GreasedLines based on the bound data, scalable to any number of trajectories. Data shown is 3D movement data of a SpatialInputCamera and an OrbitCamera sourced from [MIRIA by Büschel et al](https://github.com/imldresden/miria).


<singleView :scene="trajectoryMultiple3D" />

::: code-group
<<< @/./anu-examples/trajectoryMultiple3D.js
:::