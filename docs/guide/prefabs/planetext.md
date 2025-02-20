---
outline: deep
---

<script setup>
import { text } from '../../anu-examples/text.js'
//import singleView  from '../../vue_components/singleView.vue'
</script>

# Plane Text

## Overview

The plane text prefab enables rendering 2D text in Babylon by integrating [babylon-msdf-text](https://github.com/bhushan6/babylon-msdf-text). 
Plane Text can be created by calling [createPlaneText()](/api/modules.html#createplanetext), [create()](/api/modules.html#create), or [bind()](/api/modules.html#bind) returning a Mesh or [Selection](/api/classes/Selection.html). The returned mesh is an empty parent mesh of the rendered text. The default font included is Roboto Regular. To use a different font, generate a texture atlas and json specification for your font using the [MSDF font generator](https://msdf-bmfont.donmccurdy.com/).

## Usage

``` js
//With createPlaneText() returns Mesh
let planeText = anu.createPlaneText(name: string, options: {}, scene: Scene);

//updatePlaneText() will update the Mesh with the specified options in a single pass
planeText.updatePlaneText(options: {});

//setters will update the Mesh with the specified option after each call
planeText.text = string;

//With create() returns Mesh
let mesh = anu.create('planeText', name: string, scene: Scene, options: {}, data: {});

//With bind() returns Selection
anu.bind('planeText', scene: Scene, options: {}, data: [{}]);

//With bind() from a Selection returns a new Selection
Selection.bind('planeText', options: {}, data: [{}]);

//Combine run() and updatePlaneText() to update a Selection
Selection.run((d,n,i) => n.updatePlaneText(options: {}));
```

## Options

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   text   | (string) text to be rendered | 'undefined' |
| size     |   (number) scaling factor to be applied to the Mesh, same as scaling    |   1 |
| opacity |   (number) opacity value between 0 and 1   |    1 |
| align |    (string) horizontal alignment of the text, either 'left, 'center', or 'right'    |    'center'    |
| color |   (Color3) color value of the mesh material   |    Color3.White() |
| font |   (json) json spec of the MSDF text font    |    roboto-standard.json |
| atlas |   (png) texture atlas of the MSDF text font   |    roboto-standard.png |
| fontHeight    |   (number) max height of all chars in the json spec of the MSDF text font. Do not change if using default font. If using custom font, either calculate the max height value from the font's json spec or leave undefined to automatically calculate at runtime |   undefined   |

## Methods and Properties 


| Property / Method      |      Description     |  
| ------------- | ------------- | 
|   updatePlaneText(options)  |  updates the plane text with all the specified options in a single pass. Undeclared options will not be modified  |
|   text  |  (string) gets or sets the rendered text  |
|   size  |  (number) gets or sets the scaling factor  |
|   opacity  |  (number) gets or sets the opacity value  |
|   align  |  (string) gets or sets the horizontal alignment of the text  |
|   color  |  (color3) gets or sets the color value of the mesh material  |
|   font  |  (json) gets or sets the json spec of the MSDF text font |
|   atlas  |  (png) gets or sets the texture atlas of the MSDF text font |
|   fontHeight  |  (number) gets or sets the max height of the json spec |

## Examples

``` js
let options = {
    text: 'Hello World',
    color: Color3.Green()
}

let myText = anu.createPlaneText('myText', options, scene);

options.text = "Goodbye World";
options.color = Color3.Red();
options.size = 1.5;

scene.onPointerDown = (pointer) => myText.updatePlaneText(options);

scene.onPointerUp = (pointer) => myText.text = "Hello Again";
```

<singleView :scene="text" />


