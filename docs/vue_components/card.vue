<template> 
    <div style="position:relative; display: flex; flex-direction: column; align-items: center;">
        <canvas id="inlineFrameExample" ref="canvas" ></canvas>
        <a :href="props.link" style="position:absolute; top:0; left:0; display:inline-block; width:13vh; height:13vh; z-index:5;"></a>
        <span>{{ props.title }}</span>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const canvas = ref()

const props = defineProps({
  example: Function,
  title: String,
  link: String
});


onMounted(() =>  window.dispatchEvent(new CustomEvent('test', { detail: {canvas: canvas.value, scene: props.example, inspector: props.inspector}})))
 



</script>