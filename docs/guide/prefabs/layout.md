---
outline: deep
---

<script setup>
  //import singleView from  "../../vue_components/singleView.vue"
  import { layout } from  "../../anu-examples/layout.js"
</script>

# Layouts

## Overview 
The Layout prefabs provide a quick way to generate 3D layouts for a Selection of 3D visualizations created using Anu. 

## Usage 

```js
//name (required), options (optional), scene (required) 

//returns instance of a layout that arranges a selection of 3D visualizations on a 2D flat grid 
let layout = anu.planeLayout(name: String, options?: {}, scene: BABYLON.Scene);

//returns instance of a layout that arranges a selection of 3D visualizations on a 3D cylindrical grid 
let layout = anu.cylinderLayout(name: String, options?: {}, scene: BABYLON.Scene);

//returns instance of n layout that arranges a selection of 3D visualizations on a 3D spherical grid 
let layout = anu.sphereLayout(name: String, options?: {}, scene: BABYLON.Scene);

//Change the row number and update the layout
layout.attr("row", val: number)

//Change the margin and update the layout
layout.attr("margin", val: BABYLON.Vector2)

//Change the radius and update the layout
layout.attr("radius", val: number)

//Update the layout now
//Can be called right after the Selection or Option changes
layout.update();

```

## Options

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   selection  | (anu.Selection) a list of nodes in the Babylon scene-graph to be added to the layout, one cell per node. The expected usage is to pass a selection of root nodes for each chart. | null |
| rows    | (number)  the number of rows for the layout   |   1 |
| radius    |   (number) the radius of the layout, only applicable to cylindrical/spherical layouts | 5 |
| margin   |   (Vector2) the margin of the layout in x and y dimensions  | (0, 0) |

## Methods and Properties 

| Property / Method      |      Description     |  
| ------------- | ------------- | 
|   root  |  (Mesh) the parent TransformNode of the layout  |
|   currentLayout  |  (number) the current layout created (1 = plane; 2 = cylinder; 3 = sphere)  |
|   attr  |  quickly change an option parameter and update the layout |
|   update  | update the layout |

## Examples

<singleView :scene="layout" />

::: code-group
<<< @/./anu-examples/layout.js 
:::