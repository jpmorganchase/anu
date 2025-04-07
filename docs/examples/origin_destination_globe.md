---
aside: false
---
<script setup>
import { originDestinationGlobe } from '../anu-examples/originDestinationGlobe.js'
</script>

# Origin-Destination Globe
Demonstration of the [Texture Globe Prefab](../guide/prefabs/texturemaps.md) combined with [GreasedLines](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line) to render flight paths originating from Atlanta International Airport, based on work by [Yang et al.](https://ieeexplore.ieee.org/document/8440844) Height encodes the distance between origin and destination airports, and line thickness encodes the number of total number of flights along that route.

<singleView :scene="originDestinationGlobe" />

::: code-group
<<< @/./anu-examples/originDestinationGlobe.js 
:::