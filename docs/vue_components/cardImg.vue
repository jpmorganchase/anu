<template> 
    <div style="position:relative; display: flex; flex-direction: column; align-items: center;">
        <a :href="props.link">
            <img :src="props.img">
        </a>
        <span><a :href="props.link">{{ props.title }}</a></span>
    </div>
</template>

<script setup>
const props = defineProps({
  img: String,
  title: String,
  link: String
});
</script>
