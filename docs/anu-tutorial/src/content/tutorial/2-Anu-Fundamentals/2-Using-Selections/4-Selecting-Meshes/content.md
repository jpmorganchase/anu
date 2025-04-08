---
type: lesson
title: Selecting Meshes
slug: /:partSlug/:chapterSlug/4-Selecting-Meshes.html/
---

# Selecting Meshes

Say we already have meshes in our scene and we want to create a new selection for these objects. Anu supports several selection methods for doing just this. 

#### Step 1: Select the box by name and move it

we can call selectName() from anu or a Selection to search either the whole scene or just the selection of all nodes with the given name. 

```js
//selectName(name: String | String[], scene: Scene): Selection
let boxSelection = anu.selectName('box-name', scene)

boxSelection.positionY(2)
```
#### Step 2: Select the sphere by id and move it

we can call selectID() from anu or a Selection to search either the whole scene or just the selection of all nodes with the given ID. 

```js
//selectName(name: String | String[], scene: Scene): Selection
let sphereSelection = anu.selectId('sphere-ID', scene)

sphereSelection.positionY(-2)
```

:::tip
For even more ways to select nodes with any see the [documentation page!](https://jpmorganchase.github.io/anu/guide/using_selections.html#select-by-tags)


