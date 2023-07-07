<template> 
    <div style="position:relative; display: flex; flex-direction: column; align-items: center;">
        <iframe id="inlineFrameExample"
            title="Inline Frame Example"
            :src="`/index.html/?example=${example}`">
        </iframe>
        <a :href=link style="position:absolute; top:0; left:0; display:inline-block; width:13vh; height:13vh; z-index:5;"></a>
        <span>{{ title }}</span>
    </div>
</template>


<script>
  export default {
    props: {
        title: { required: true, type: String},
        example: { required: true, type: String },
        link: { default: false, type: String }
    },
  };
</script>