---
layout: page
aside: false
---
<script setup>
import { ref, onMounted } from 'vue'

// Get example name from URL parameter
const urlParams = new URLSearchParams(window.location.search)
const exampleName = urlParams.get('example') || 'Box'

// Dynamically import the example
const sceneFunction = ref(null)

onMounted(async () => {
  try {
    const module = await import(`./anu-examples/${exampleName}.js`)
    // Get the first exported function (the scene function)
    sceneFunction.value = Object.values(module)[0]
    if (typeof sceneFunction.value !== 'function') {
      console.error('No function exported from example:', exampleName)
    }
  } catch (error) {
    console.error('Failed to load example:', exampleName, error)
  }
})
</script>

<div v-if="sceneFunction">
  <singleView :scene="sceneFunction" :fullscreen="true" :noDefaultEnvironment="true" />
</div>
<div v-else style="padding: 2rem; text-align: center;">
  <p>Loading example: {{ exampleName }}...</p>
</div>
