---
type: lesson
title: Step 4 Adding Axes
---

# Adding Axes and Labels

No abstract visualization is complete without axes. We could create them by hand using bind to create lines, tubes, planes, and text to comprise our axes, or we could leverage the anu [Axes prefab](https://jpmorganchase.github.io/anu/guide/prefabs/axes.html) instead!

#### Step 1: Add Axes with createAxes()

We can use the axes prefab to quickly add axes to our scene using the same d3 scales we used in our visualization. The axes prefab is highly customizable with many options to tailor the output to your needs. See the prefab documentation page for a full list of options. For now lets just use the default settings. 

```js
//createAxes(name: String, scene?: Scene, options: AxisOptions{})
let axes = anu.createAxes("myAxes", scene, {
    scale: {x: scaleX, y: scaleX, z: scaleZ},
    parent: cot
})
``` 

If we want to customize the axes parts after creation we can get the selections directly from the mesh that is returned from createAxes(), or by selecting the parts from the scene graph. The parts naming convention follow name + partType. Expand the node graph to see this. 

```js
axes.grid //returns grid selection 
axes.domain //returns the domain selection
axes.background['x' | 'y', | 'z'] //returns background plane selection
axes.label['x' | 'y', | 'z'] //returns label selection
```


#### Step 2: Add Labels and Titles 

Now that we have the axes, lets and labels to help us read the visualization. There are a couple of ways to render text in Babylon, but we recommend using anu's [planeText prefab](https://jpmorganchase.github.io/anu/guide/prefabs/planetext.html) to achieve high resolution efficient text. This text is what createAxes() uses to make the labels. To use the prefab we can either call anu.createPlaneText() directly or use create() or bind() with "planeText" as the mesh type. Lets use bind(). 

```js 
let labelX = cot.bind("planeText", {text: "Beak Length (mm)"})
                .position(new Vector3(0, -6, -5))

let labelY = cot.bind("planeText", {text: "Flipper Length (mm)"})
                .position(new Vector3(-6, 0, -5))
                .rotationZ(90 * (3.14/180))

let labelZ = cot.bind("planeText", {text: "Flipper Depth (mm)"})
                .position(new Vector3(5, -6, 0))
                .rotationY(-90 * (3.14/180))
```
