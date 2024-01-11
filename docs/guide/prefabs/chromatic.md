---
outline: deep
---
<script setup>
  import {ref, computed } from 'vue';
  import {schemes} from '@jpmorganchase/anu';
  import chroma from './chroma.vue';

  const types = ref({ Ordinal: {
    name: "Ordinal",
    method: "d3.scaleOrdinal(anu.ordinalChromatic"
  },
    Sequential: {
    name: "Sequential",
    method: "d3.scaleSequential(anu.sequentialChromatic"
  }})

  const materials = ref({ 
    Color3: {
      name: "Color3",
      method: "toColor3",
    },
    Color4: {
      name: "Color4",
      method: "toColor4",
    },
    Standard_Material: {
      name: "Standard Material",
      method: "toStandardMaterial",
    },
    PBR_Rough: {
      name: "PBR Rough",
      method: "toPBRMaterialRough",
    },
    PBR_Glossy: {
      name: "PBR Glossy",
      method: "toPBRMaterialGlossy",
    }
  })

  const schemeList  = ref(Object.keys(schemes).reverse())

  let selectedType = ref(["Ordinal"]);
  let selectedMaterial = ref(["Color3"]);
  let selectedScheme = ref(["d310"]);
  let meshes = ref(10);
  let steps = ref(0);

  let suffix = computed(() => ".domain([0," +  (meshes.value - 1) + "])")
  
  let materialCode =  computed(() => (selectedMaterial.value[0] == "Color3") ? 'material(() => new BABYLON.StandardMaterial("mat"))\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0.diffuseColor((d) => color(d.data))' :
      (selectedMaterial.value[0] == "Color4") ? 'material(() => new BABYLON.StandardMaterial("mat"))\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0.diffuseColor((d) => color(d.data))' :
      (selectedMaterial.value[0] == "Standard Material") ? 'material((d) => color(d.data))' :
      (selectedMaterial.value[0] == "PBR Rough") ? 'material((d) => color(d.data))' :
      (selectedMaterial.value[0] == "PBR Glossy") ? 'material((d) => color(d.data))' : 
      null)

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

<div class="container2">
 <div class="ui">

  
  <select class="form-control" :required="true" @change="changeLocation" multiple size="2" v-model="selectedType">
      <option  v-for="type in types" :selected="selectedType === type.name" v-bind:value="type.name" >{{ type.name }}</option>
  </select>
  

  
  <select class="form-control" :required="true" @change="changeLocation" multiple size="5" v-model="selectedMaterial">
   <option v-for="material in materials" v-bind:value="material.name" :selected="selectedMaterial === material.name"  >{{ material.name }}</option>
  </select>

  <select class="form-control" :required="true" @change="changeLocation" multiple size="5" v-model="selectedScheme">
   <option v-for="scheme in schemeList" v-bind:value="scheme" :selected="selectedScheme === scheme" >{{ scheme }}</option>
  </select>

  
  

  <div class="sliders">
    <label> Meshes
      <input  type="range" min="5" max="50" class="slider" v-model.number="meshes">
    </label>
    <label> Steps
    <input type="range" min="0" max="100" class="slider" v-model.number="steps">
    </label>
  </div>
     
  </div>

  <chroma :type="selectedType[0]" :scheme="selectedScheme[0]" :material="selectedMaterial[0]" :meshes="meshes" :steps="steps" />
</div>


```js-vue
//Creating some "data" as a simple object list of numbers 0-n
let data = [...Array({{meshes}}).keys()].map((i) => { return {"data": i}})

//Create our color scale function
let color = {{ types[selectedType[0]].method }}('{{ selectedScheme[0] }}').{{ materials[selectedMaterial[0].replace(/ /g,"_")].method }}({{ (steps > 0) ? steps : null }})){{ (selectedType[0] == "Sequential") ? suffix : null  }}

//Create spheres and bind our data to them, 
//move spheres into position and apply our color or material
let spheres = anu.bind('sphere', {}, data)
       .positionX((d) => d.data)
       .{{ materialCode }}

```

  <style>
  .container2 {
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
