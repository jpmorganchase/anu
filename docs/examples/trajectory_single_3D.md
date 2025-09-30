---
aside: false
---
<script setup>
import { trajectorySingle3D } from '../anu-examples/trajectorySingle3D.js'
</script>

# Single 3D Trajectory
Basic example of visualizing a single 3D trajectory using [GreasedLine](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line). This example skips data binding to set the vertices and colors of a single greasedLine directly.

<singleView :scene="trajectorySingle3D" />

::: code-group
<<< @/./anu-examples/trajectorySingle3D.js 
:::