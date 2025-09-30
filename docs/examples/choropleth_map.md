---
aside: false
---

<script setup>
import { choroplethMap } from '../anu-examples/choroplethMap.js'
</script>

# Choropleth Map
Demonstration of the [Mesh Map Prefab](../guide/prefabs/meshmap.md) used as a choropleth map of the total number of airport locations in each US state, the District of Columbia and Puerto Rico.

<singleView :scene="choroplethMap" />

::: code-group
<<< @/./anu-examples/choroplethMap.js 
:::