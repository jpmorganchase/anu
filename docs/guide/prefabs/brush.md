---
outline: deep
---

<script setup>
  //import singleView from  "../../vue_components/singleView.vue"
  import { brush } from  "../../anu-examples/brush.js"
</script>

# Brush

## Overview
Brushing (and linking) is a common interaction technique in visualization. The Brush prefab provides a way to enable brushing on a visualization with a few lines of code. It leverages Babylon's [PointerDragBehavior](https://doc.babylonjs.com/features/featuresDeepDive/behaviors/meshBehaviors/#pointerdragbehavior) and [BoundingBoxGizmo](https://doc.babylonjs.com/features/featuresDeepDive/mesh/gizmo/#bounding-box-gizmo) to allow for the translation, rotation, and scaling of the selected region in a manner reminiscent of [d3-brush](https://github.com/d3/d3-brush). The prefab provides several [Observables](https://doc.babylonjs.com/features/featuresDeepDive/events/observables) that provide access to the Meshes that the Brush had selected. Sensible defaults are provided depending on the scales set in the options (i.e., 1D, 2D, vs 3D charts).

## Usage

``` js
//Returns instance of Brush class
let brush = anu.createBrush(name: String, options: { ... }, scene?: Scene);

//Calls the callback whenever the user starts to interact with the Brush
brush.onBrushStartObservable.add(() => { ... });

//Calls the callback every frame as the user interacts with the Brush
brush.onBrushObservable.add(() => { ... });

//Calls the callback whenever the user stops interacting with the Brush
brush.onBrushEndObservable.add(() => { ... });

//Calls the callback whenever selected Meshes changes
brush.onBrushChangedObservable.add((evt) => { 
  evt.brushed;    //An array of Meshes that are currently selected by the Brush
  evt.added;      //An array of Meshes that are newly selected since the last callback
  evt.removed;    //An array of Meshes that are now no longer selected since the last callback
});

//Selected Meshes can also be accessed from the Brush instance, and can be wrapped in an Anu Selection object
let selection = anu.Selection(brush.brushed);

//Brush can be updated with new options
brush.updateBrush(options: { ... });
```

## Options

| Property 	| Value 	| Default 	|
|---	|---	|---	|
| scale 	| ({x?: scale, y?: scale, z?: scale}) the scale(s) of the chart's axes. At least one is required 	| Required 	|
| parent 	| (Node \| Selection) Node or Selection that defines the parent node. This should be the same parent node that contains the chart 	| Required 	|
| material 	| (StandardMaterial) the material of the Brush's mesh 	| new StandardMaterial(), alpha = 0.4 	|
| brushable 	| (AbstractMesh[] \| Selection) Array of Meshes or Selection that denotes the Meshes that can be brushed 	| All child Meshes of parent with bound data 	|
| padding 	| ({ x?: number, y?: number, z?: number }) the extra space in meters along each respective dimension that the Brush can move along 	| x: 0, y: 0, z: 0 	|
| translateAxes 	| ({ x?: boolean, y?: boolean, z?: boolean }) sets whether the Brush can be translated along each respective dimension 	| Sensible defaults depending on scales set 	|
| rotateAxes 	| ({ x?: boolean, y?: boolean, z?: boolean }) sets whether the Brush can be rotated along each respective dimension 	| Sensible defaults depending on scales set 	|
| minSize 	| ({ x?: number, y?: number, z?: number }) the minimum size that the Brush can be scaled to along each respective dimension 	| Sensible defaults depending on scales set 	|
| minSize 	| ({ x?: number, y?: number, z?: number }) the maximum size that the Brush can be scaled to along each respective dimension 	| Sensible defaults depending on scales set 	|

## Methods and Properties 

| Property / Method      |      Description     |  
| ------------- | ------------- | 
|   updateBrush(options)  |  updates the Brush with the specified options. Currently resets the Brush's state. Undeclared options will not be modified  |
|   brushed   |   (AbstractMesh[]) an array of Meshes that are currently selected by the Brush  |


## Examples

### Basic Brush
``` js
let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Horsepower}))).range([-1,1]).nice();
let scaleY = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Weight_in_lbs}))).range([-1, 1]).nice();
let scaleZ = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Displacement}))).range([-1,1]).nice();

let brush = anu.createBrush('brush', {
    parent: chart,
    scales: { x: scaleX, y: scaleY, z: scaleZ }
});

brush.onBrushChangedObservable.add((evt) => {
    (new anu.Selection(evt.added)).prop('renderOutline', true);
    (new anu.Selection(evt.removed)).prop('renderOutline', false);
});

```

<singleView :scene="brush" />

