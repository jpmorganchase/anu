---
outline: deep
---
# Axes

## Overview
Axes are critical components of data visualizations. Anu provides the tools you need to create axes from scratch, but this prefab makes it easier to create axes with best practices to give you a jump start.
The default settings will produce good looking axes for many visualizations, but this prefab provides many ways to customize the output leveraging the best features of Anu, Babylon, and D3. 
This prefab integrates [d3-scale](https://github.com/d3/d3-scale) to help position elements and generate ticks, and labels. Axes can be rendered by invoking the [createAxes()](/api/modules.html#createaxes) method which returns an instance of the Axes class, and will produce 3D, 2D, or 1D axes depending on the options set.


## Usage

``` js
//Returns instance of Axes Class
let axes = anu.createAxes(name: String, scene: Scene, options: {});

//Selection object of the main axis line using GreasedLine mesh
axes.domain 

//Selection object {x,y,z} of axes background using Plane mesh
axes.background.x //y or z

//Selection object {x,y,z} of axes grid using LineSystem mesh
axes.grid.x //y or z 

//Selection object {x,y,z} of axes labels using PlaneText prefab
axes.label.x //y or z 
```

## Options

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   scale   | ({x?: scale, y?: scale, z?: scale}) the scale(s) of the axes you want to render. At least one is required  | Required |
|  parent  |  (Selection) Selection that defines the parent node. If not set a parent node will be created at the root of the scene graph.  |  undefined  |
|  domain  |  (boolean) render the domain or not  |  true  |
|  domainOptions  |  (Object) initial options of the [GreasedLine](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line) mesh |  {}  |
|  domainMaterialOptions  |  (Object) initial options of the [GreasedLine](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line) material  |  {}  |
|  grid | (boolean) render the grid lines or not   |  true  |
|  gridOptions  | (Object) initial options of the [LineSystem](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/line_system) mesh    |  {}  |
|  gridProperties  | (Object) post rendering properties of the [LineSystem](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/line_system) mesh    |  {}  |
|  gridTicks  | ({x\y\z: []}) array of values for ticks to be drawn. If nothing is passed scale.ticks() or scale.domain used |  {}  |
|  label | (boolean) render the labels or not   |  true  |
|  labelOptions  | (Object) initial options of the [PlaneText](/guide/prefabs/planetext.html) mesh  |  {}  |
|  labelProperties  | (Object) post rendering properties of the [PlaneText](/guide/prefabs/planetext.html) mesh   |  {}  |
|  labelTicks  | ({x\y\z: []}) array of values for ticks to be drawn. If nothing is passed scale.ticks() or scale.domain used |  {}  |
|  labelTicks  | ({x\y\z: (text: string) => string}) a function that takes a string and returns a new string. If not set this will default to text from scale.ticks() or scale.domain() |  {}  |


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

 <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="400"
      src="/anu/examples.html?example=axesTest">
  </iframe>
