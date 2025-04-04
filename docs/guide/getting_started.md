# Getting Started

Before diving in, let's go over some background, installation, and setup to make sure you have the best experience using Anu.

## Background

Anu does not stand alone. To begin using it, fundamental knowledge of web technologies is strongly recommended. Here is what you need to know, and what would be nice to know.

### Need to Know

 1. The basics of web development: JavaScript, HTML, and CSS.
 2. What Node.js is and how to use it.
 3. How to set up and use Babylon.js to create 3D scenes and meshes.

<div class="danger custom-block" style="padding-top: 8px">

Dive in without these you may find shallow waters and anger Stack Overflow :mage:

::: details Suggested Reading
[:link: MDN Web Docs Learn web development](https://developer.mozilla.org/en-US/docs/Learn)

[:link: W3Schools Node.js Tutorial](https://www.w3schools.com/nodejs/default.asp)

[:link: Babylon.js First Steps](https://doc.babylonjs.com/journey/theFirstStep)

[:link: Babylon.js Vite Boilerplate](https://github.com/paganaye/babylonjs-vite-boilerplate)
:::

</div>


### Nice to Know

1. D3 DOM manipulation patterns and visualization utilities.
2. WebXR API and general concepts, applications, and limitations.
3. Familiarity with Node.js tooling and bundlers, Vite, webpack, etc.


<div class="warning custom-block" style="padding-top: 8px">

You'll be able to swim without these, but you can always swim faster :shark:

::: details Suggested Reading
[:link: D3 Getting Started](https://d3js.org/getting-started)

[:link: MDN Web Docs Fundamentals of WebXR](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Fundamentals)

[:link: Vite Getting Started](https://vitejs.dev/guide/)
:::

</div>


## Installation
We recommend following the [Babylon.js + Vite](https://doc.babylonjs.com/guidedLearning/usingVite) guide to setup your project using npm.

Once your project structure is up and running, install Anu by running the following command in the terminal:

```bash
npm install @jpmorganchase/anu
```

Then, import Anu in your script files:

```js
import * as anu from '@jpmorganchase/anu';
```

You can now call Anu methods accordingly:

```js
anu.create('box', 'myBox');
```

### ...or use the Anu-Starter template
```bash
npx @jpmorganchase/anu-starter@latest my_project
```

```bash
cd my_project
npm install
npm run dev
```

See and modify main.js to get started.


### ...or try our Interactive Tutorial!
Want to try developing with Anu directly in your browser without needing to install Node.js or clone a repository? Check out our <a href="../tutorial/index.html" target="_self">Interactive Tutorial</a>!