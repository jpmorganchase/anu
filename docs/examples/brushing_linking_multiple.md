---
aside: false
---
<script setup>
import { brushingLinkingMultiple } from '../anu-examples/brushing_linking_multiple.js'
</script>

# Multiple Selection for Brushing and Linking
Demonstration of the [Brush Prefab](../guide/prefabs/brush.md) used to brush and link regions on two charts. Brushes can be dragged and scaled. The left brush highlights using an outline, the right brush highlights using a solid color.

<singleView :scene="brushingLinkingMultiple" />

::: code-group
<<< @/./anu-examples/brushing_linking_multiple.js 
:::