---
aside: false
---
<script setup>
import { hover } from '../anu-examples/Interactions/Hover.js'
import singleView  from '../vue_components/singleView.vue'
</script>


# Pointer Hover

Example demonstrating how to use the .action() method to add [Babylon pointer actions](https://doc.babylonjs.com/features/featuresDeepDive/events/actions) to nodes in a selection.


<singleView :scene="hover" />

::: code-group
<<< @/./anu-examples/Interactions/Hover.js 

<<< @/./anu-examples/data/penguins.json
:::