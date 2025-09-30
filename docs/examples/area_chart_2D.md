---
aside: false
---

<script setup>
import { areachart2D } from '../anu-examples/areachart2D.js'
</script>

# 2D Area Chart
Basic 2D area chart using [LineSystem](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/line_system/) and [Ribbon](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/ribbon/) to visualize a single stock and its price between 2000 and 2010. 

<singleView :scene="areachart2D" />

::: code-group
<<< @/./anu-examples/areachart2D.js 
:::