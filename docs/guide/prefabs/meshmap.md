---
outline: deep
---

<script setup>
  import { meshMap } from  "../../anu-examples/Mesh_Map.js"
</script>

# Mesh Map

## Overview 

The Mesh Map prefab takes a [GeoJson](https://geojson.org/) and [d3-geo projection](https://d3js.org/d3-geo/projection) input and generates a [Extruded Polygon](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/extrude_polygon) Mesh for each polygon or multi-polygon GeoJSON feature. This prefab also utilize [topoJson](https://github.com/topojson/topojson) for Mesh simplification. The [createMeshMap()](/api/modules.md#createmeshmap) method returns an instance of the MeshMap object which contains the relevant properties for the Mesh creation and manipulation. Each polygon metadata.data property will be set with the data from its features.properties GeoJSON.

## Usage 

```js
//name (required), options (geojson required), babylon scene (optional) 
//Returns instance of MeshMap
let map = anu.createMeshMap(name: String, options: {}, scene: BABYLON.Scene);

//The transformed input d3-geo projection
let projection = map.projection

//A selection object containing all the generated polygons
let selection = map.selection

```

## Options


| Option     |      Value      |  Default |
| ------------- | ------------- | ------------- |
| geoJson (required) | a valid geoJSON file | null | 
| projection | (d3.GeoProjection) such as d3.geoAlbers() | d3.geoAlbers()  |
| size | ([number, number]) an array with the max height and width of the projection | [10,10] |
| transform | ([number, number]) and array with the center coordinates of the projection in render space | [0,0] | 
| simplification | (number) the simplification factor relative to the projection size | 0 |
| depth | (number) the height of the extruded the polygons | 1 |
| cot | (Babylon.Node) The node to be the parent of all the polygons, if not set a transform node "meshMapCOT" will be created | TransformNode('meshMapCOT')  |

## Methods and Properties 


| Property / Method      |      Description     |  
| ------------- | ------------- | 
|   projection  |  the transformed d3.geoProjection which can be used map position from longitude and latitude as projection([lon, lat])  |
| selection | a selection object containing all the generated polygons with their respective geoJSON properties data binded to them | 

## Examples

<singleView :scene="meshMap" />

::: code-group
<<< @/./anu-examples/Mesh_Map.js 
:::