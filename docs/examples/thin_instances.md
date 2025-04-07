---
aside: false
---
<script setup>
import { thinInstances } from '../anu-examples/thinInstances.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# Interacting with Thin Instances
Demonstration of Thin Instances and two basic visualization interactions. Uses the mnist_784 dataset with 70,000 points dimensionally reduced using PCA and t-SNE. Hover to show tooltips, and click to select by color-coded class (i.e., the original handwritten number in the dataset). [GPU Picking](https://doc.babylonjs.com/features/featuresDeepDive/mesh/interactions/picking_collisions#gpu-picking) is used to enable interactions as the traditional CPU picking is tremendously slow (several seconds per frame). Note that GPU Picking is not yet properly supported in WebXR, thus interactions in this example are disabled upon entering WebXR.

<singleView :scene="thinInstances" />

::: code-group
<<< @/./anu-examples/thinInstances.js 
:::