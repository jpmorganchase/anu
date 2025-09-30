---
outline: deep
---

<script setup>
  import { axesTest } from  "../../anu-examples/axesTest.js"
  import { axesConfig } from "../../anu-examples/axesConfig.js"
  import { axesUpdate } from "../../anu-examples/axesUpdate.js"
</script>

# Axes

## Overview
Axes are critical components of data visualizations. Anu provides the tools you need to create axes from scratch, but this prefab makes it easier to create axes with best practices to give you a jump start.
The default settings will produce good looking axes for many visualizations, but this prefab provides many ways to customize the output leveraging the best features of Anu, Babylon.js, and D3. 
This prefab integrates [d3-scale](https://github.com/d3/d3-scale) to help position elements and generate ticks and labels. Axes can be rendered by invoking the [createAxes()](/api/modules.html#createaxes) method which returns an instance of the Axes class, and will produce 3D, 2D, or 1D axes depending on the options set.


## Usage

``` js
//Returns instance of Axes Class
let axes = anu.createAxes(name: String, options: {} | AxisConfig, scene?: Scene);

//Selection object of the main axis line using GreasedLine mesh
axes.domain;

//Selection object {x,y,z} of axes background using Plane mesh
axes.background.x; //or y or z

//Selection object {x,y,z} of axes grid using LineSystem mesh
axes.grid.x; //or y or z 

//Selection object {x,y,z} of axes labels using PlaneText prefab
axes.label.x; //or y or z 
```

#### Using AxesConfig
We can also set the axes options using the [AxesConfig](/api/classes/AxesConfig.html) helper class. This will generate defaults and allow us to change the options without writing the JSON object directly.

``` js
let axesOptions = new anu.AxesConfig({x?: scaleX, y?: scaleY, z?: scaleZ})

axesOptions.domain = false;

axesOptions.grid.y = false;

let axes = anu.createAxes('name', axesOptions);
```

#### Updating Axes
To update the axes we can call [updateAxes](/api/classes/Axis.html#updateaxes) on an instance of axes, passing in a new AxesOptions or AxesConfig and an optional TransitionOptions object if you wish to add a transition to the update. 

```js
let axesOptions = new anu.AxesConfig({x?: scaleX, y?: scaleY, z?: scaleZ})

let axes = anu.createAxes('name', axesOptions);

axesOptions.scale.x = newScaleX

axes.updateAxes(axesOptions, {duration: 250})
```

## Options

| Property                | Value                                                                                                                                  | Default     |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------|
| scale                   | ({ x?: any; y?: any; z?: any }) the scale(s) of the axes you want to render. At least one is required                                   | Required    |
| parent                  | (Node \| Selection) Selection that defines the parent node. If not set, a parent node will be created at the root of the scene graph.   | undefined   |
| domain                  | (boolean \| { x?: boolean; y?: boolean; z?: boolean }) render the domain or not                                                        | true        |
| domainOptions           | (GreasedLineParams \| {}) initial options of the [GreasedLine](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line) mesh | {}          |
| domainMaterialOptions   | (GreasedLineMaterial) initial options of the [GreasedLine](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line) material | {}          |
| domainProperties        | (GreasedLineProperties) properties of the GreasedLine mesh                                                                             | {}          |
| background              | (boolean \| { x?: boolean; y?: boolean; z?: boolean }) render the background or not                                                    | false       |
| backgroundOptions       | (PlaneParams \| { x?: PlaneParams; y?: PlaneParams; z?: PlaneParams } \| {}) initial options for the background planes                 | {}          |
| backgroundProperties    | (MeshProperties \| { x?: MeshProperties; y?: MeshProperties; z?: MeshProperties } \| {}) properties of the background planes           | {}          |
| backgroundPosition      | ({ x?: 0 \| 1; y?: 0 \| 1; z?: 0 \| 1 }) position of the background planes                                                             | { x\: 0, y: 0, z: 0 } |
| grid                    | (boolean \| { x?: boolean; y?: boolean; z?: boolean }) render the grid lines or not                                                    | true        |
| gridOptions             | (LinesParams \| {} \| { x?: LinesParams; y?: LinesParams; z?: LinesParams }) initial options of the [LineSystem](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/line_system) mesh | {}          |
| gridProperties          | (LineProperties \| {} \| { x?: LineProperties; y?: LineProperties; z?: LineProperties }) properties of the LineSystem mesh             | {}          |
| gridTicks               | ({ x?: (string \| number)[]; y?: (string \| number)[]; z?: (string \| number)[] }) array of values for ticks to be drawn               | {}          |
| label                   | (boolean \| { x?: boolean; y?: boolean; z?: boolean }) render the labels or not                                                        | true        |
| labelOptions            | (PlaneTextParams \| { x?: PlaneTextParams; y?: PlaneTextParams; z?: PlaneTextParams } \| {}) initial options of the [PlaneText](/guide/prefabs/planetext.html) mesh | {}          |
| labelProperties         | (PlaneTextProperties \| { x?: PlaneTextProperties; y?: PlaneTextProperties; z?: PlaneTextProperties } \| {}) properties of the PlaneText mesh | {}          |
| labelTicks              | ({ x?: (string \| number)[]; y?: (string \| number)[]; z?: (string \| number)[] }) array of values for ticks to be drawn               | {}          |
| labelFormat             | ({ x?: (d: string) => string; y?: (d: string) => string; z?: (d: string) => string }) a function that formats the label text           | {}          |
| labelMargin             | ({ x?: number; y?: number; z?: number }) margin for the labels                                                                         | { x\: 0.1, y: 0.1, z: 0.1 } |
| atlas                   | (Texture) texture atlas for the labels                                                                                                 | undefined   |


## Examples

### Default 3D Axes
``` js
let extentX = extent(map(iris, (d) => {return d.sepalLength}));
let extentY = extent(map(iris, (d) => {return d.petalLength}));
let extentZ = extent(map(iris, (d) => {return d.sepalWidth}));

let scaleX = scaleLinear().domain(extentX).range([-10,10]).nice(); 
let scaleY = scaleLinear().domain(extentY).range([-10,10]).nice(); 
let scaleZ = scaleLinear().domain(extentZ).range([-10,10]).nice(); 

anu.createAxes('myAxes', scene, {scale: {x: scaleX, y: scaleY, z: scaleZ}});

```

<singleView :scene="axesTest" />

### Using AxisConfig
``` js
//Create a transform node to use as the parent node for all our meshes
let CoT = new TransformNode('cot')

//Select our center or transform with Anu to give us a selection obj CoT.
let chart = anu.selectName('cot', scene);

let axesOptions = new anu.AxesConfig({x: scaleX, y: scaleY, z: scaleZ})
axesOptions.parent = chart;
axesOptions.grid = false;
axesOptions.backgroundProperties = {"material.diffuseColor": Color3.Random()}

let axes = anu.createAxes('myAxes', axesOptions);
```

<singleView :scene="axesConfig" />

### Updating Axes (mouse down and up to update)


```js
  let axesOptions = new anu.AxesConfig({x: scaleX, y: scaleY, z: scaleZ})
  let axes = anu.createAxes('myAxes', axesOptions);

  var scaleX2 = scaleLinear().domain([4,10]).range([-10,10]).nice(); 

  scene.onPointerDown = (pointer) => {
    axesOptions.scale.x = scaleX2
    axes.updateAxes(axesOptions);
  }

  scene.onPointerUp = (pointer) => {
    axesOptions.scale.x = scaleX
    axes.updateAxes(axesOptions, {duration: 300})
  }
```

<singleView :scene="axesUpdate" />


