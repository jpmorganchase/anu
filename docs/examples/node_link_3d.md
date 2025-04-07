---
aside: false
---

<script setup>
import { nodelink3d } from '../anu-examples/NodeLink3D.js'
</script>

# 3D Node Link 
Basic example of a 3D node-link diagram simulated using [d3-force-3d](https://github.com/vasturiano/d3-force-3d) of Les Misérables character co-occurrences.

<singleView :scene="nodelink3d"/>

::: code-group
<<< @/./anu-examples/NodeLink3D.js 
:::
