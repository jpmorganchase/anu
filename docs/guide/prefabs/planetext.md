---
outline: deep
---

<script setup>
import { text } from '../../anu-examples/Text/text.js'
//import singleView  from '../../vue_components/singleView.vue'
</script>

# Plane Text

## Overview

The plane text prefab enables rendering 2D text in Babylon by integrating [babylon-msdf-text](https://github.com/bhushan6/babylon-msdf-text). 
Plane Text can be created by calling [createPlaneText()](/api/modules.html#createplanetext), [create()](/api/modules.html#create), or [bind()](/api/modules.html#bind) returning a Mesh or [Selection](/api/classes/Selection.html). The returned mesh is an empty parent mesh of the rendered text. The default font included is Roboto Regular. To use a different font, generate a texture atlas and json specification for your font using the [MSDF font generator](https://msdf-bmfont.donmccurdy.com/).

## Usage

``` js
//With createPlaneText() returns Mesh
anu.createPlaneText(name: string, options: {}, scene: Scene);

//With create() returns Mesh
anu.create('planeText', name: string, scene: Scene, options: {}, data: {});

//With bind() returns Selection
anu.bind('planeText', scene: Scene, options: {}, data: [{}]);

//With bind() from a Selection returns a new Selection
Selection.bind('planeText', options: {}, data: [{}]);
```

## Options

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   text   | (string) text to be rendered | 'undefined' |
| size     |   (number) scaling factor to be baked into the vertices    |   1 |
| opacity |   (number) opacity value between 0 and 1   |    1 |
| color |   (Color3) color value of the mesh material   |    Color3.White() |
| font |   (json) json spec of the MSDF text font    |    roboto-standard.json |
| atlas |   (png) texture atlas of the MSDF text font   |    roboto-standard.png |

## Examples

``` js
let options = {
    text: 'Hello World',
    color: Color3.Green()
}

anu.createPlaneText('text2d', options, scene);
```

<singleView :scene="text" />


