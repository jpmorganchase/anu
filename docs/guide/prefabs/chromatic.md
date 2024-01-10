---
outline: deep
---
<script setup>
  import {ref} from 'vue';
  import chroma from './chroma.vue';

  const types = ref({ ordinal: {
    name: "Ordinal",
    method: "d3.scaleOrdinal(anu.ordinalChromatic"
  },
    sequential: {
    name: "Sequential",
    method: "d3.scaleSequential(anu.sequentialChromatic"
  }})

  const materials = ref({ 
    color3: {
      name: "Color3",
      method: "toColor3",
    },
    color4: {
      name: "Color4",
      method: "toColor4",
    },
    standard: {
      name: "Standard Material",
      method: "toStandardMaterial",
    },
    pbrRough: {
      name: "PBR Rough",
      method: "toPBRMaterialRough",
    },
    pbrGlossy: {
      name: "PBR Glossy",
      method: "toPBRMaterialGlossy",
    }
  })

  let selectedType = ref("Ordinal");
  let selectedMaterial = ref("Standard");
  let scheme = ref("d3");
  let meshes = ref(10);
  let steps = ref(10);

  

  const colors = ref(['1','2','3']);
</script>

# Color Scales

## Overview

The color scale prefab provides utility class and methods for generating color scales and returning them in a variety of formats (hex, color3, material, etc.). This prefab can be used standalone or in conjunction with [d3-scale](https://d3js.org/d3-scale). Additionally, these functions implement [chroma.js](https://gka.github.io/chroma.js/) to provide a variety of predefined schemes like [color brewer](https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3), or your own custom color maps. We are also working on a few schemes of our own to come out later. 

## Usage



``` js
//returns list of color from scheme name or list of color hex codes
anu.ordinalChromatic(string | string[]).toColor3()

//returns function that accepts int 0-1 and returns corresponding color
anu.sequentialChromatic(string | string[]).toColor3() 
```



## Color and Material Formats

| Method       |    Return | 
| ------------- | ------------- | 
|   toColor3(steps)  | returns type of [color3](https://doc.babylonjs.com/typedoc/classes/BABYLON.Color3) length of steps or scheme by default | 
|   toColor4(steps)  | returns type of [color3](https://doc.babylonjs.com/typedoc/classes/BABYLON.Color4) length of steps or scheme by default | 
|   toStandardMaterial(steps)  | returns type of [standardMaterial](https://doc.babylonjs.com/typedoc/classes/BABYLON.StandardMaterial) length of steps or scheme by default | 
|   toPBRMaterialRough(steps)  | returns type of [PBRMetallicRoughnessMaterial](https://doc.babylonjs.com/typedoc/classes/BABYLON.PBRMetallicRoughnessMaterial) length of steps or scheme by default | 
|   toPBRMaterialGlossy(steps)  | returns type of [PBRSpecularGlossinessMaterial](https://doc.babylonjs.com/typedoc/classes/BABYLON.PBRSpecularGlossinessMaterial) length of steps or scheme by default | 
  

## Examples

<div class="container">
 <div class="ui">

  
  <select class="form-control" :required="true" @change="changeLocation" multiple size="2" v-model="selectedType">
      <option  v-for="type in types" :selected="selectedType === type.name" v-bind:value="type.name" >{{ type.name }}</option>
  </select>
  

  
  <select class="form-control" :required="true" @change="changeLocation" multiple size="5">
   <option v-for="material in materials" v-bind:value="material.name" >{{ material.name }}</option>
  </select>

  <select class="form-control" :required="true" @change="changeLocation" multiple size="4">
   <option :selected="true">Material</option>
   <option v-for="color in colors" v-bind:value="color" >{{ color }}</option>
  </select>

  
  

  <div class="sliders">
    <label> Meshes
      <input  type="range" min="5" max="50" class="slider" v-model.number="meshes">
    </label>
    <label> Steps
    <input type="range" min="0" max="100" class="slider" id="myRange" v-model.number="steps">
    </label>
  </div>
     
  </div>

  <chroma :type="selectedType[0]" :scheme="scheme" :material="selectedMaterial" :meshes="meshes" :steps="steps" />
</div>

```js
test
```



  <style>
     .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    margin-top: 10px;
  }

    .container {
    width: 100%
  }

  .ui {
    display: flex;
    justify-content: space-evenly;
  }

  .sliders {
    display: flex;
    flex-direction: column;
  }

  .canvas-container {
    width: 100%;
    height: 100px;
    overflow: hidden;
  }

  #canvas {
    width: 100%;
    height: 500px;
    position: relative;
    top: -200px;

  }
    </style>
