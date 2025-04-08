# Contributing to Anu

Anu.js is provided as open source software, and as such welcomes contributions! There are many ways to contribute to this project to help us build, grow, and improve Anu! 

:::tip
Contributors must accept and submit our [Contributor License Agreement](https://github.com/jpmorganchase/anu/blob/main/jpmc-cla-20230406.md) before we can merge any pull-requests. 
:::


## Bug Fixes and New Features

The easiest way to contribute to Anu is to [open issues](https://github.com/jpmorganchase/anu/issues) on our github repo for bug reports and feature requests. When doing so, please try to include an example or link to code we can use to recreate the issue you are having. 

If you would like to contribute changes directly to our code-base please follow our development flow as such. 

1. Fork your own copy of the repo, and clone it locally. 
2. Run ```npm install``` in both the root of the repo and in the "anu-examples" sub folder. 
3. Create a new test example or use an existing test example in the "anu-examples" folder. 
4. Import and add your test function to /anu-examples/main.js. 
5. Run ``npm run dev`` in the "anu-examples" folder, and navigate to your example url like so ```"http://localhost:XXX/anu/?example=myExample"```
6. Make your code changes to the main library files under the "src" folder and run ```npm run build`` at the repo root to build changes. "anu-examples" is configured to use a local version of anu from the "dist" folder so your changes to Anu will be reflected in your test code once the build completes. 

After making and testing you changes, you can open a pull-request to contribute your changes back to Anu. In general, please keep the scope of each pull-request down to a specific bug fix or feature you wish to contribute. Please be sure to include descriptions about what the contribution is and how we can go about testing your code. 

### Examples of Features to Contribute 

- New wrapper operators for common properties i.e. [position()](https://github.com/jpmorganchase/anu/blob/main/src/selection/property/position.ts)
- New wrapper operators for mesh/node methods i.e. [dispose()](https://github.com/jpmorganchase/anu/blob/main/src/selection/bind/dispose.ts)
- New prefabs or changes to existing ones i.e. [brush()](https://github.com/jpmorganchase/anu/blob/main/src/prefabs/Brushing/brush.ts)

Before starting any of these changes, it would be a good idea to post an feature request issue first so we can discuss with you how to best go about creating your contribution. 

## Documentation Improvements 

## Editing the Docs 
To suggest improvements to existing pages of our documentation, such as fixing typos or adding details, please use the "Edit this page" link at the bottom of each page. This will open the location of the associated markdown file in github, where you will then be able to fork the repository, make the edits to the markdown, and create a pull-request for this change. Before doing this you should familiarize yourself with how to use [VitePress](https://vitepress.dev/guide/what-is-vitepress), the static site generator used for our documentation website.

## Creating an Example

All documentation examples can be found in the /docs/anu-examples folder, with the data used in these examples found in the data sub-folder. When adding an example you must follow the following conventions. 

1. The name of your file should match the name of the exported function. 
2. No two files or exported functions can share the same name.
3. The data used must be in the public domain or fair use. 
4. Additional dependencies must be open-source and permissive.
5. Your function must pass "engine" as an argument and return a new Babylon Scene. 
6. You can use any camera or lighting you want, but try to keep it simple. 

Please follow this template for creating documentation examples.
```js
import * as anu from '@jpmorganchase/anu' 
import { Scene, HemisphericLight, ArcRotateCamera, Vector3 } from "@babylonjs/core";

//create and export a function that takes a babylon engine and returns a scene
export const myExample = async function(engine){
  const scene = new Scene(engine);
  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 12;
  camera.attachControl(true);

  return scene;
};
```

## Adding Examples to the Docs or Gallery
Inline examples are added to our documentation using either the singleView or inlineView custom vue components, and the respective code in the /docs/anu-examples folder.

singleView examples are created using a new Babylon engine for each instance of the component. These are used when there is one example on the page, or we don't want examples to have separate engines. You must import your example code function at the top of the page you are adding a singleView to. You can see it used for the [Meshes, Clones, and Instances](https://github.com/jpmorganchase/anu/blob/main/docs/guide/deeper_topics/mesh_clone_instance.md) page and in the [example gallery example pages](https://github.com/jpmorganchase/anu/blob/main/docs/examples/bar_chart_3D.md).

```md
<script setup>
import { myExample } from "../anu-examples/myExample"
</script>

<singleView :scene="myExample" />
```

inlineView examples share a single Babylon Engine to reduce the resource requirements for pages with lots of small examples. These components need to be nested under the multiView component to work correctly. You can see an example of these components on the [Creating Meshes](https://github.com/jpmorganchase/anu/blob/main/docs/guide/first_steps.md) page.

```md
<script setup>
  import multiView from "../vue_components/multiView.vue"
</script>

<multiView>
    //where myExample is the name of the file in /docs/anu-examples
    <inlineView scene="myExample" /> 
</multiView>
```
### Adding to the Gallery
When adding an example to the gallery, please include a 400x400 thumbnail image. To add the example to the gallery view page you can use the cardImg component, please see the raw source code of [/examples/index.md](https://raw.githubusercontent.com/jpmorganchase/anu/refs/heads/main/docs/examples/index.md) to see how they are added.










