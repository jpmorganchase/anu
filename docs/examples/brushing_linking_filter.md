---
aside: false
---
<script setup>
import { brushingLinkingFilter } from '../anu-examples/brushing_linking_filter.js'
</script>

# Brushing and Linking Filtering
Basic example of one approach to enabling filtering with brushing and linking. Drag and release the red box to filter along the right scatter plot's y-axis.

<singleView :scene="brushingLinkingFilter" />

::: code-group
<<< @/./anu-examples/brushing_linking_filter.js 
:::