---
aside: false
---
<script setup>
import { trajectory3D } from '../anu-examples/trajectory3D.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# 3D Trajectory on a Map
Based on a sample log from [Data Comets by Saffo et al.](https://onlinelibrary.wiley.com/doi/10.1111/cgf.13994). For a better visualization, you can replace the URL of the tile provider to one that provides satellite images.
<singleView :scene="trajectory3D" />

::: code-group
<<< @/./anu-examples/trajectory3D.js 
:::