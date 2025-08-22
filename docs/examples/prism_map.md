---
aside: false
---

<script setup>
import { prismMap } from '../anu-examples/prismMap.js'
</script>

# Prism Map
Demonstration of the [Mesh Map Prefab](../guide/prefabs/meshmap.md) used as a prism map of the total number of airport locations in each US state, the District of Columbia and Puerto Rico.

<singleView :scene="prismMap" />

::: code-group
<<< @/./anu-examples/prismMap.js 
:::