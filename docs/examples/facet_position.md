---
aside: false
---
<script setup>
import { facetPosition } from '../anu-examples/Interactions/FacetPosition.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# Facet and Position UI

An example of how to use anu's facet and position ui prefab to add rotation scale and position controls to a chart.


<singleView :scene="facetPosition" />

::: code-group
<<< @/./anu-examples/Interactions/FacetPosition.js 

<<< @/./anu-examples/data/iris.json
:::