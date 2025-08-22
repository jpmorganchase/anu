---
aside: false
---

<script setup>
import { imaxes } from '../anu-examples/imaxes.js'
</script>

# ImAxes Simplified
Minimal re-implementation of [ImAxes by Cordeil et al.](https://dl.acm.org/doi/10.1145/3126594.3126613) and its embodied interactions. Drag axes close to or away from each other to create new visualizations. Currently only supports histograms and parallel coordinates.

<singleView :scene="imaxes"/>

::: code-group
<<< @/./anu-examples/imaxes.js 
:::
