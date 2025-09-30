---
aside: false
---
<script setup>
import { trajectoryMap } from '../anu-examples/trajectoryMap.js'
</script>

# 3D Trajectory on a Map
Demonstration of the [Texture Map Prefab](../guide/prefabs/texturemaps.md) combined with a [GreasedLine](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line) to render a drone flight path, based on a sample log from [Data Comets by Saffo et al.](https://onlinelibrary.wiley.com/doi/10.1111/cgf.13994) For a better visualization, you can replace the URL of the XYZ tile provider to one that provides satellite images.
<singleView :scene="trajectoryMap" />

::: code-group
<<< @/./anu-examples/trajectoryMap.js 
:::