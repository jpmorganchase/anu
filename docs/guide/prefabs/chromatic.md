---
outline: deep
---
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
  
<!-- 
## Predefined Schemes

### Ordinal Schemes



### Sequential Schemes

## Examples

### Ordinal Examples

``` js
let options = {
    text: 'Hello World',
    color: Color3.Green()
}

anu.createPlaneText('text2d', options, scene);
```

 <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="400"
      src="/anu/examples.html?example=text">
  </iframe>

  ### Sequential Examples -->
