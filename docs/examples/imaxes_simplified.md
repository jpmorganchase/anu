---
aside: false
---

<script setup>
import { imaxes } from '../anu-examples/imaxes_simplified.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# ImAxes Simplified

This is a simplified example of how to achieve the basic embodied interactions presentend in [ImAxes by Cordeil et al.](https://dl.acm.org/doi/10.1145/3126594.3126613) For now it only handles histograms and parallel coordinates.

<singleView :scene="imaxes"/>

::: code-group
<<< @/./anu-examples/imaxes_simplified.js 
:::
