---
outline: deep
---

<script setup>
  //import singleView from  "../../vue_components/singleView.vue"
  import { textureMap } from  "../../anu-examples/Texture_Map.js"
  import { textureGlobe } from  "../../anu-examples/Texture_Globe.js"
</script>


# Texture Maps

## Overview
The Texture Map and Globe prefabs provide a quick way to add geographic maps to your scene by using map layers and mesh textures. This prefab implements the [OpenLayers API](https://openlayers.org/) to provide support for map layers and geographic utilities. Additionally, these prefabs provide methods and functions to assist in mapping to lat/lon positions and map interactions. These can be created using [createTextureMap()](/api/modules.md#createtexturemap) and [createTextureGlobe()](/api/modules.md#createtextureglobe).

## Usage

```js
//name (required), options (optional), Babylon scene (optional)

//Returns instance of textureMap object
let textureMap = anu.createTextureMap(name: String, options?: {}, scene?: BABYLON.Scene);

//Returns instance of textureGlobe object
let textureGlobe = anu.createTextureGlobe(name: String, options?: {}, scene?: BABYLON.Scene);
```

### Setting Custom XYZ Tile Providers
You can change the XYZ Tile Provider used by TextureMap and TextureGlobe inside of the options argument. This is determined by one or more URLs in the XYZ format. You can find XYZ Tile Providers online with varying license agreements (OpenStreetMaps is permissive).

```js
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';

let textureMap = anu.createTextureMap('map', 
  {
    layers: [new TileLayer({
      source: new XYZ({
        crossOrigin: 'anonymous', //Required
        urls: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]  //Default URL, replace or add to array
      })
    })]
  });
```

## Options

### Texture Map

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   layers  | ([Tilelayers[ ]](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html)) list of map layer objects from OpenLayers  | [ new TileLayer({ source: new OSM() }) ] |
| mapHeight    |   (number) the height of the texture in pixels   |   1000 |
| mapWidth    |   (number) the width of the texture in pixels   |   2000 |
| meshSize   |   (number) the scale of the ground mesh  |   50 |
|   view  | ([View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html)) map view object from OpenLayers  | new View({ center: [0, 0], zoom: 1 }) |

### Texture Globe

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   layers  | ([Tilelayers[ ]](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html)) list of map layer objects from OpenLayers  | [ new TileLayer({ source: new OSM(), extent: [-180, -90, 180, 90] }) ] |
| resolution | (Vector2) the resolutions of the texture in pixels 2:1 ratio recommended | new Vector2(1000, 500) |
| diameter  |   (number) the diameter of the sphere mesh  |   1 |
|   view  | ([View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html)) map view object from OpenLayers  |  new View({projection: 'EPSG:4326', extent[-180, -90, 180, 90], center: [0, 0], zoom: 0}) |

## Methods and Properties

### Texture Map

| Property / Method      |      Description     |
| ------------- | ------------- |
|   container  |  the DOM element holding the map texture canvas  |
|   map  |  the open layers [Map object](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html)   |
|   texture |  the [AdvancedDynamicTexture object](https://doc.babylonjs.com/typedoc/classes/BABYLON.GUI.AdvancedDynamicTexture) used for the map  |
|   context  |  the DOM canvas object context  |
| mesh | the ground mesh |
| scaleLon([lon,lat]) | a function that take a lat lon coordinate as a list [lon, lat] and returns the x positions |
| scaleLat([lon,lat]) | a function that take a lat lon coordinate as a list [lon, lat] and returns the y positions |

### Texture Globe

| Property / Method      |      Description     |
| ------------- | ------------- |
|   container  |  the DOM element holding the map texture canvas  |
|   map  |  the open layers [Map object](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html)   |
|   texture |  the [AdvancedDynamicTexture object](https://doc.babylonjs.com/typedoc/classes/BABYLON.GUI.AdvancedDynamicTexture) used for the map  |
|   context  |  the DOM canvas object context  |
| mesh | the ground mesh |
| lonLatToVector3([lon,lat])  | function that take lon lat array [lon, lat] and returns a Vector3(x,y,z) position |

## Examples

<singleView :scene="textureMap" />

<singleView :scene="textureGlobe" />

::: code-group
<<< @/./anu-examples/Texture_Map.js

<<< @/./anu-examples/Texture_Globe.js
:::