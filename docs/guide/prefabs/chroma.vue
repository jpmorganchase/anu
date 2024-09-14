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
import { Material, StandardMaterial } from '@babylonjs/core';

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
    camera.position = new BABYLON.Vector3(0, 0, -props.meshes)
    camera.lowerRadiusLimit = props.meshes;
    camera.upperRadiusLimit = props.meshes;
    camera.attachControl(true)

    let data = [...Array(props.meshes).keys()].map((i) => { return {"data": i}})
    let scaleX = d3.scaleLinear().domain([0,props.meshes-1]).range([-props.meshes/2,props.meshes/2])

    let ordinalScale = d3.scaleOrdinal(anu.ordinalChromatic(props.scheme)[
      (props.material == "Color3") ? 'toColor3' :
      (props.material == "Color4") ? 'toColor4' :
      (props.material == "Standard Material") ? 'toStandardMaterial' :
      (props.material == "PBR Rough") ? 'toPBRMaterialRough' :
      (props.material == "PBR Glossy") ? 'toPBRMaterialGlossy' :
      null
    ]((props.steps > 0) ? props.steps : undefined))

    let sequentialScale = d3.scaleSequential(anu.sequentialChromatic(props.scheme).toColor3((props.steps > 0) ? props.steps : undefined)).domain([0, props.meshes-1])

    let colorScale = (props.type == "Ordinal") ? ordinalScale : sequentialScale;

    
    let spheres = anu.bind('sphere', {}, data)
       .positionX((d) => scaleX(d.data))
    
    if (props.material == "Color3" || props.material == "Color4"){
      spheres.material(() => new BABYLON.StandardMaterial('materialName'))
              .diffuseColor((d) => colorScale(d))
    } else {
      spheres.material((d) => colorScale(d))
    }


    
    
    babylonEngine.runRenderLoop(() => {
      scene.render()
    })

    window.addEventListener("resize", function () {
      babylonEngine.resize();
    });

  
   
  watch(() => [props.type, props.meshes, props.steps, props.material, props.scheme], 
  ([type, meshes, steps, material, scheme]) => {

    anu.selectName('sphere',scene).dispose();

    camera.lowerRadiusLimit = meshes;
    camera.upperRadiusLimit = meshes;
    camera.position = new BABYLON.Vector3(0, 0, -meshes)
   
    let data = [...Array(meshes).keys()].map((i) => { return {"data": i}})
    let scaleX = d3.scaleLinear().domain([0,meshes-1]).range([-meshes/2,meshes/2])

    let ordinalScale = d3.scaleOrdinal(anu.ordinalChromatic(scheme)[
      (material == "Color3") ? 'toColor3' :
      (material == "Color4") ? 'toColor4' :
      (material == "Standard Material") ? 'toStandardMaterial' :
      (material == "PBR Rough") ? 'toPBRMaterialRough' :
      (material == "PBR Glossy") ? 'toPBRMaterialGlossy' :
      null
    ]((steps > 0) ? steps : undefined))

    let sequentialScale = d3.scaleSequential(anu.sequentialChromatic(scheme)[
      (material == "Color3") ? 'toColor3' :
      (material == "Color4") ? 'toColor4' :
      (material == "Standard Material") ? 'toStandardMaterial' :
      (material == "PBR Rough") ? 'toPBRMaterialRough' :
      (material == "PBR Glossy") ? 'toPBRMaterialGlossy' :
      null
    ]((steps > 0) ? steps : undefined)).domain([0, meshes-1])

    let colorScale = (type == "Ordinal") ? ordinalScale : sequentialScale;

    console.log(colorScale(0), colorScale(meshes-1))

    let spheres = anu.bind('sphere', {}, data)
       .positionX((d) => scaleX(d.data))
    
    if (material == "Color3" || material == "Color4"){
      spheres.material(() => new BABYLON.StandardMaterial('materialName'))
              .diffuseColor((d) => colorScale(d.data))
    } else {
      spheres.material((d) => colorScale(d.data))
    }

    });


     
  }
)
</script>



<style>



</style>