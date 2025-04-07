---
aside: false
---
<script setup>
import { pitches } from '../anu-examples/pitches.js'
//import singleView  from '../vue_components/singleView.vue'
</script>

# Baseball Pitch 3D Visualization
Based on the 3D visualization by [Baseball Savant](https://baseballsavant.mlb.com/visuals/pitch3d) and the work by [Saffo et al.](https://dl.acm.org/doi/full/10.1145/3544548.3581093) Pitch trajectories are simulated data, and ball positions are their actual recorded positions when crossing the home plate, hence the visual discrepancy between them. Strike zone size and position are rough approximations for example purposes. Animations are played at approximately real speed. Refresh to restart the animations.

<singleView :scene="pitches" />

::: code-group
<<< @/./anu-examples/pitches.js 
:::