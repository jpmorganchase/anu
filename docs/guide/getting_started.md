# Getting Started

Before diving in, let's go over some background, installation, and set-up to make sure you have the best experience using Anu.

## Background

Anu does not stand alone. To use it effectively, knowledge of web technology stacks is recommended. Here is what you need to know, and what would be nice to know.

### Need to Know

 1. The basics of web development - JS/HTML/CSS.
 2. How to set up and use Babylon.js to create 3D scenes and meshes.
 3. What Node.js is and how to use it.

<div class="danger custom-block" style="padding-top: 8px">

Dive in without these you may find shallow water and angry stack overflow :mage:

::: details Suggested Reading
[:link: mdn Web Docs](https://developer.mozilla.org/en-US/docs/Learn)

[:link: Babylon First Steps](https://doc.babylonjs.com/journey/theFirstStep)

[:link: Babylon Vite Boilerplate](https://github.com/paganaye/babylonjs-vite-boilerplate)

[:link: W3 Schools Node.js Tutorial](https://www.w3schools.com/nodejs/default.asp)
:::

</div>



### Nice to Know

1. D3 DOM manipulation patterns and visualization utilities.
2. Web XR API and general concepts, applications, and limitations.
3. Familiarity with Node.js tooling and bundlers, vite, webpack, etc.


<div class="warning custom-block" style="padding-top: 8px">

You'll be able to swim without these, but you can always swim faster :shark:

::: details Suggested Reading
[:link: D3 Select](https://github.com/d3/d3-selection)

[:link: D3 Scale](https://github.com/d3/d3-scale)

[:link: mdn WebXR Fundies](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Fundamentals)

[:link: Vite Getting Started](https://vitejs.dev/guide/)
:::

</div>


## Installation
We recommend following the [Babylon + Vite](https://doc.babylonjs.com/guidedLearning/usingVite) guide to set-up your Babylonjs project.

Once your project structure is up and running install Anu.js by building it locally in a different file directory and linking it to your project. 

```bash
npm install @jpmorganchase/anu
```

Then import the anu name space

```js 
import * as anu from '@jpmorganchase/anu'
```

You can now call anu methods as such

```js
//mesh, name, scene
anu.create('box', 'myBox', scene)
```

