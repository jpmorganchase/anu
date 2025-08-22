---
aside: false
---
<script setup>
import { dimensionalityReductionPlot } from '../anu-examples/dimensionalityReductionPlot.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# Dimensionality Reduction Plot
Visualization of the mnist_784 dataset with 70,000 points dimensionally reduced using PCA and t-SNE. This example also demonstrates the use of Thin Instances and two interaction techniques: hover to show tooltips; and click to select by color-coded class (i.e., the original handwritten number in the dataset). [GPU Picking](https://doc.babylonjs.com/features/featuresDeepDive/mesh/interactions/picking_collisions#gpu-picking) is used to enable interactions as the traditional CPU picking is tremendously slow (several seconds per frame). Note that GPU Picking is not yet properly supported in WebXR, thus interactions in this example are disabled upon entering WebXR.

<singleView :scene="dimensionalityReductionPlot" />

::: code-group
<<< @/./anu-examples/dimensionalityReductionPlot.js 
:::