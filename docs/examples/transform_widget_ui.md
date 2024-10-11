---
aside: false
---
<script setup>
import { transformWidget } from '../anu-examples/TransformWidget.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# Transform Widget UI

An example of how to use Anu's Transform Widget UI prefab to add position, rotation, and scale controls to a chart.


<singleView :scene="transformWidget" />

::: code-group
<<< @/./anu-examples/TransformWidget.js
:::