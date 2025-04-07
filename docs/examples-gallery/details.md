---
aside: false
---
<script setup>
import { details } from '../anu-examples/Details.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# Details On Demand

Example demonstrating how to use the .action() method to add [Babylon pointer actions](https://doc.babylonjs.com/features/featuresDeepDive/events/actions) and control Babylon GUI elements for details on demand hover interactions. 

<singleView :scene="details" />

::: code-group
<<< @/./anu-examples/Details.js 
:::