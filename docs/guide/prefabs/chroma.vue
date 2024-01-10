<template> 
 
   
    <div class="canvas-container">
    <canvas id="canvas"></canvas>
    </div>


</template>


<script setup>
  import {ref, watch, onMounted} from 'vue';
  import * as d3 from 'd3'
  import * as BABYLON from "@babylonjs/core";
  import * as anu from '@jpmorganchase/anu';
import { StandardMaterial } from '@babylonjs/core';

  const props = defineProps({
  type: String,
  scheme: String,
  material: String,
  meshes: Number,
  steps: Number
})

  

  onMounted(() => {
  const canvas =  document.querySelector('#canvas');;

    const babylonEngine = new BABYLON.Engine(canvas, true)

    let scene = new BABYLON.Scene(babylonEngine);
    scene.clearColor = new BABYLON.Color3(30/256,30/256,32/256)

    new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, 0), scene)

    const camera = new BABYLON.ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
    
    
    babylonEngine.runRenderLoop(() => {
      scene.render()
    })

    window.addEventListener("resize", function () {
  babylonEngine.resize();
  
  });
   
  watch(() => [props.type, props.meshes, props.steps, props.material, props.scheme], 
  ([type, meshes, steps, material, scheme]) => {

    console.log(material, type, steps, scheme, meshes)

    anu.selectName('sphere',scene).dispose();

    camera.position = new BABYLON.Vector3(0, 0, -meshes)
    camera.lowerRadiusLimit = -meshes;
    camera.upperRadiusLimit = -meshes;
    camera.attachControl(true)

    let data = [...Array(meshes).keys()].map((i) => { return {"data": i}})
    let scaleX = d3.scaleLinear().domain([0,meshes-1]).range([-meshes/2,meshes/2])

    let ordinalScale = d3.scaleOrdinal(anu.ordinalChromatic("d310").toColor3())

    let sequentialScale = d3.scaleSequential(anu.sequentialChromatic("d310").toColor3())

    let scale = (type == "Ordinal") ? ordinalScale : sequentialScale;

    anu.bind('sphere', {}, data)
       .positionX((d) => scaleX(d.data))
       .material(() => new BABYLON.StandardMaterial())
    });


     
  }
)
</script>



<style>



</style>