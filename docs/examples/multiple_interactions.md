---
aside: false
---
<script setup>
import { multipleInteractions } from '../anu-examples/MultipleInteractions.js'
//import singleView  from '../vue_components/singleView.vue'
</script>


# Multiple Interactions on 3D Scatter Plot
Example demonstrating the combination of multiple interactions together on a 3D scatter plot using .action() and [Babylon pointer actions](https://doc.babylonjs.com/features/featuresDeepDive/events/actions).

<singleView :scene="multipleInteractions" />

::: code-group
<<< @/./anu-examples/MultipleInteractions.js 
:::