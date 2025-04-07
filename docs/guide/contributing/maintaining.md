# Maintaining Anu

We aimed to keep Anu.js relatively easy to maintain to ensure its longevity, even in the event the original maintainers can no longer provide support. This page details the relevant information needed to maintain the code base, including the project structure, tooling, and dependencies. 

## Project Structure

We have setup Anu as a mono-repo containing all the relevant code, examples, and projects. 

### Core Package

The core Anu package is located at the root of our repo with the relevant toolkit code found in the ```src``` folder. Anu uses Typescript and Vite to compile and bundle the code base into a node package. The configuration of these compilers can be found in ```vite.config.ts``` and ```tsconfig.json```. To build the package you can run ```npm install``` and then ```npm run build``` to compile the package to the ```dist``` folder. The package settings and dependencies can be found in the ```package.json``` file. 


```
ANU
└───src //the main library code
│   └───assets //static files for things like fonts
│   └───prefabs //folder containing prefab code
|   |   |   ...        
│   └───selection //folder containing the Selection API
|   |   |   index.ts //File the Selection class is defined in
|   |   |   ...
|   |   index.ts //The entry file for our package
|   |   ...
└───dist //output folder of the built library
|   package.json //package settings, dependencies, etc.
|   vite.config.ts //settings of the vite bundler
|   tsconfig.json //setting of the Typescript bundler
```

### Test Code

Our test examples used when developing Anu can be found in the ```anu-tests``` folder which contains a node app that is bundled using vite. To use this project navigate to the folder first build a local version of Anu as shown above, then navigate to the folder in your terminal and run ```npm install``` and then ```npm run dev```. This will launch a local host web-server that you can view the examples from by passing the example name you want to view in the url like so ```"http://localhost:XXX/anu/?example=myExample"```.

```
ANU
└───anu-tests //Folder containing the tests node app
    └───data //The data used in the test examples
    └───examples //contains the example code organized by type
    |   main.js //contains the main logic of the app
    |   ...
```

### Documentation Website

Our documentation website is built using [VitePress](https://vitepress.dev/) and can be found in the ```docs``` folder. To run the docs locally you can navigate to the folder and run ```npm install``` and then ```npm run docs:dev``` which will launch the local dev server. The interactive tutorial is a separate application in the ```anu-tutorial``` and is built using [TutorialKit](https://tutorialkit.dev/). To run the tutorial, again navigate to the sub-folder and and run ```npm install``` and then ```npm run dev```. If you wish to build the project you can run ```npm run build``` which will generate the static tutorial site in the ```/docs/public/tutorial``` folder. 

```
ANU
└───docs //Folder containing the documentation website
    └───.vitepress //VitePress configuration and settings
    └───anu-examples //Contains all the examples used in the docs
    └───api //TSDoc API specs auto generated from the Anu API 
    └───examples-gallery //Markdown for each gallery example and main page
    └───guide //Contains the main documentation section markdown
    └───vue_components //Custom components for displaying examples, etc.
    |   ...
```

## Anu Dependencies  

Anu uses select dependencies that will need to be maintained and update as needed. 

### Core API

our core API relies mainly on two dependencies, [Babylon.js](https://www.babylonjs.com/) and [Lodash](https://lodash.com/). 

Babylon is listed as a peer-dependency, which means users need to install their own version of Babylon to use Anu. This was done so that users can control the exact version of Babylon they want to use. Anu is compatible with every version of Babylon to date starting with version 5. 
If a new major version of Babylon is released, Anu's ```package.json``` will need to be update as so, where "N" is the major version number of Babylon. 

```json
{
  "peerDependencies": {
    "@babylonjs/core": "5.x || 6.x || 7.x || 8.x || N.x"
  }
}
```
Babylon is generally great about maintaining backwards compatibility, but breaking changes can happen. These changes can be found in [Babylon's docs](https://doc.babylonjs.com/breaking-changes).

Lodash is a relatively stable API that should not require frequent updates that we use for JS object operation support. Anu is currently using Lodash version ```4.x.x``` and primarly makes use of the assign, merge, default, set, clone, hasIn, and get methods. 

### Prefabs

Our prefabs utilize other dependencies that may need to be updated to function correctly.

- [Axes](https://jpmorganchase.github.io/anu/guide/prefabs/axes.html): [d3-scale](https://d3js.org/d3-scale)
- [Chromatic](https://jpmorganchase.github.io/anu/guide/prefabs/chromatic.html): [chroma.js](https://gka.github.io/chroma.js/)
- [MeshMap](https://jpmorganchase.github.io/anu/guide/prefabs/meshmap.html): [d3-geo](https://d3js.org/d3-geo), [d3-geo-projection](https://github.com/d3/d3-geo-projection), [topojsonClient/Server/Simplify](https://github.com/topojson/topojson), [earcut](https://github.com/mapbox/earcut), 
- [TextureMap](https://jpmorganchase.github.io/anu/guide/prefabs/texturemaps.html): [OpenLayers](https://openlayers.org/)
- [PlaneText](https://jpmorganchase.github.io/anu/guide/prefabs/planetext.html): [babylon-msdf-text](https://github.com/bhushan6/babylon-msdf-text)
