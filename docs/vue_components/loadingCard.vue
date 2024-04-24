<template> 
    <div style="position:relative; display: flex; flex-direction: column; align-items: center;">
        <img id="inlineFrameExample"  src="./" />
        <a :href="props.link" style="position:absolute; top:0; left:0; display:inline-block; width:13vh; height:13vh; z-index:5;"></a>
        <span>{{ props.title }}</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        link: String
    });
</script>