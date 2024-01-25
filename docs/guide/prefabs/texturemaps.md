---
outline: deep
---
# Texture Maps

## Overview 
The Texture map and globe prefabs provide a quick way to add geographic maps to your scene by using map layers and mesh textures. This prefab implements the [OpenLayers API](https://openlayers.org/) to provide support for map layers and geographic utilities. Additionally, these prefabs provide methods and functions to assist in mapping to Lat Lon positions and map interactions.  

## Usage 

```js
//name (required), options (optional), babylon scene (optional) 

//returns instance of textureMap object 
let textureMap = anu.createTextureMap(name: String, options?: {}, scene?: BABYLON.Scene);

//returns instance of textureGlobe object
let textureGlobe = anu.createTextureGlobe(name: String, options?: {}, scene?: BABYLON.Scene);
```

## Options

### Texture Map

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   layers  | ([Tilelayers[ ]](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html)) list of map layer objects from OpenLayers  | [ new TileLayer({ source: new OSM() }) ] |
| mapHeight    |   (number) the height of the texture in pixels   |   2000 |
| mapWidth    |   (number) the width of the texture in pixels   |   1000 |
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

[TextureMap](https://jpmorganchase.github.io/anu/examples/texture_map.html)

[TextureGlobe](https://jpmorganchase.github.io/anu/examples/texture_globe.html)