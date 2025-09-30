---
aside: false
---
<script setup>
import { vectorField } from '../anu-examples/vectorField.js'
</script>

# Vector Field
Vector field visualization of airflow using instanced cones to indicate direction. Based on an existing example from [DXR](https://sites.google.com/view/dxr-vis/examples#h.p_V4jkG1URZ2B3), but with pre-processed data to convert the directional vector in Unity to more generic Euler angles.

<singleView :scene="vectorField" />

::: code-group
<<< @/./anu-examples/vectorField.js
:::