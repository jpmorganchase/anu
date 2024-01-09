---
outline: deep
---
# Color Scales

## Overview

The color scale prefab provides utility functions for generating color scales and returning them in a variety of formats (hex, color3, material, etc.). This prefab can be used standalone or in conjunction with [d3-scale](https://d3js.org/d3-scale). Additionally, these functions implement [chroma.js](https://gka.github.io/chroma.js/) to provide a variety of predefined schemes like [color brewer](https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3), or your own custom color maps. We are also working on a few schemes of our own to come out later. 

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

 <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="400"
      src="/anu/examples.html?example=text">
  </iframe>
