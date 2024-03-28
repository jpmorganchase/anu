---
aside: false
---

<script setup>
import { nodelink3d } from '../anu-examples/Networks/NodeLink3D.js'
import singleView  from '../vue_components/singleView.vue'
</script>

# 3D Node Link 

This example shows how to make a force direct node link visualization using [d3-force-3d](https://github.com/vasturiano/d3-force-3d)

<singleView :scene="nodelink3d"/>

::: code-group
<<< @/./anu-examples/Networks/NodeLink3D.js 

<<< @/./anu-examples/data/miserables.json
:::
