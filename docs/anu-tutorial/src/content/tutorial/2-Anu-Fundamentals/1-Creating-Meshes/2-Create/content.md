---
type: lesson
title: Anu Create() a Mesh
slug: /:partSlug/:chapterSlug/2-Create.html/
---

# Create a Mesh with Anu

In this lesson, we will see how Anu's create() function adds and returns a mesh to the scene.
Create() wraps Babylon's MeshBuilder methods in one place and extends its functionality to except data to dynamically set mesh settings. 
While we can use Babylon's MeshBuilder to achieve the same thing, create() is largely meant to be an internal function used for other Anu methods.
However, it can be useful on its own to quickly add just a single mesh to you scene in a manner consistent with the rest of Anu. 


#### Step 1: Create a box

Lets get started by calling anu.create() to add a box to our scene. The first parameter is a string indicating the Mesh type we want to create. Create supports all the Babylon MeshBuilders as well as a couple of extra Mesh types provided by Anu such as planeText.  

```js
//create(mesh: string, name: string, options?: {}, data?: {}, scene?: Scene) : Mesh
let box = anu.create('box', 'ourBox', {size: 2}, data);
```

Once you have the box in the scene try selecting it from the scene graph in the inspector (found under nodes). 
Scroll down the properties panel until you see the "metadata" drop-down and expand it. 
Notice how the metadata property (box.metadata) now contains a data key that contains our data, this will be used later. 

#### Step 2: Set Mesh Options Dynamically

We passed some example data into our create function. We can now use this data to dynamically set the initializing properties of our box mesh. Instead of passing raw values in our options object, we can pass anonymous functions instead. These functions will be passed the variables "d" which is the data object we passed into this method. We can now return the value of the data we want to use by indexing our data object by key. 

Lets set the width, height, and depth of our box to "goals", "assists", "points" from our data object.

```js
 anu.create('box', 'ourBox',
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assists,
                        depth: (d) => d.points
                      },
                      data,
                      );
```

The create() method will execute all functions passed in the options object with our data before creating the mesh. This way we can easily set mesh parameters dynamically. In addition to this create() will also initialize several mesh setting that will be helpful for data visualization use cases, such as <a href="https://doc.babylonjs.com/features/featuresDeepDive/events/actions" target="_blank">Action Manger</a> and <a href="https://doc.babylonjs.com/features/featuresDeepDive/tags/" target="_blank">tags</a> . 