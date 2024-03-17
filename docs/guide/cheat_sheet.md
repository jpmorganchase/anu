---
layout: doc
---

# Cheat Sheet

The most common methods and techniques you'll need all in one place

## Making Meshes

``` js
//create(type: string, name: string, options?: {}, data?: {}, scene?: BABYLON.Scene, )
let mesh = anu.create('box', 'ourBox', {size: 2})

//create mesh with data
let mesh = anu.create('box', 'ourBox', scene, {size: (d) => d.size}, {size: 5})

//create selection of mesh(s)

```