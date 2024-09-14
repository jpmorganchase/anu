@jpmorganchase/anu / [Exports](modules.md)

# Anu

Anujs is an immersive data visualization toolkit built on the web-based 3D game engine [Babylon.js](https://www.babylonjs.com/) and [WebXR](https://immersiveweb.dev/). Anu is heavily inspired by [D3's](https://d3js.org/) data-binding DOM manipulation patterns and visualization utility. Anu works in synergy with D3 to bring these patterns to Babylon, enabling developers to dynamically manipulate the Babylon scene graph with data and augment 3D immersive visualizations with utilities, pre-fabs, and interactions. 

---
See our docs for more the details: https://jpmorganchase.github.io/anu/

## Version

Anu is currently in alpha, and development of the library remains fluid. Please see the road map to learn what features are finished or planned. Alpha release may have changes that break backwards compatibility as syntax, properties, methods, and functions will change as the library is developed further and improved. This also means that now is the best time to contribute codes, suggestions, and bug reports. See the contributing section to learn how you can contribute. 

## Install

### Install with a Babylonjs project manually. 
```
npm install @jpmorganchase/anu
```

```
import * as anu from '@jpmorganchase/anu'
```

or

### Install with our project template
```
npx @jpmorganchase/anu-starter@latest my_project 
```

```
cd my_project
npm install 
npm run dev
```

## Questions, Comments, or Suggestions?

### If you have any questions, comments or suggestions please feel free to drop by the [discussion forum](https://github.com/jpmorganchase/anu/discussions)!

## Contributing 

There are many ways to contribute such as:
    
    1. Contribute suggestions, ideas, and bug reports via github issues 
    2. Request of Contribute a visualization example for the gallery via github issues
    3. Ask or answer questions on our forum via github discussions 
    4. Bug fixes and code contributions via pull request
    5. Work on a item from the road map or a new idea,
       open a discussion on our forum first to get more information and feedback

If you would like to open and merge a pull request, you must first sign the contributor license agreement (CLA) found in the root of this repo.

## Road Map

Below is a list of select completed and planned features

- [x] Data Binding Scene Graph Manipulation 
- [x] Selections
- [x] 2D Text Pre-fab
- [x] Axes Pre-fab
- [x] Texture based maps and globes Pre-fab
- [x] Grid based layouts Pre-fab
- [ ] Network visualizations (in progress)
- [ ] Data based animation tools 
- [ ] Common data visualization interactions
- [x] Color scale materials / shaders
