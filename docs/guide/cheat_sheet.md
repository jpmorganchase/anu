<script setup>
  import multiView from "../vue_components/multiView.vue"
  import inlineView from "../vue_components/inlineView.vue"
  import { scatterplot2D } from '../anu-examples/ScatterPlots/Scatterplot2D.js'
  import { scatterplot3D } from '../anu-examples/ScatterPlots/Scatterplot3D.js'
</script>

<multiView>

# Creating Meshes
Anu provides several methods for dynamically manipulating the Babylon scene graph by creating meshes, updating properties, and more. Let's start with the absolute basics, adding a box mesh to our scene, and manipulating its properties with some data. Then, we will learn how create and change several meshes at onces with data.

## Add a Box
In this example, you can see how anu's create() function adds a mesh to the scene and returns the mesh. We can use Babylon's MeshBuilder method to achieve the same thing, and create() is largely meant to be an internal function for other anu methods. However, notice [create()](../api/modules.html#create) can take an optional argument "data". 
When passed, the data object is appended to our mesh's metadata property and allows us to use this data to dynamically manipulate the mesh.

::: code-group
```js [anu]
//create(mesh: string, name: string, options?: {}, data?: {}, scene?: Scene, )
let box = anu.create('box', 'ourBox', {size: 2})
```
```js [babylon]
//CreateBox(name: string, options?: {}, scene?: Scene)
BABYLON.MeshBuilder.CreateBox('ourBox', {size:2}, scene)
```
:::

<inlineView :scene="scatterplot2D" />
<inlineView :scene="scatterplot2D" />
  <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="400"
      src="/anu/examples.html?example=box">
  </iframe>

## Using Data and Functions
Anu's core philosophy is enabling you to manipulate the scene-graph and its meshes with data. We can begin to see how this is implemented when we pass data into [create()](../api/modules.html#create). In this example, we pass some example data into our function. We can now use this data to dynamically set the initializing properties of our box mesh. Instead of passing a raw value in our options object, we can pass [anonymous functions](https://www.geeksforgeeks.org/javascript-anonymous-functions/) instead. These functions will be passed the variable "d" which is the data object we passed into this method. We can now return the value of the data we want to use by indexing our data object by key. Our functions can perform any valid javascript code so long as they return the appropriate value for the option we are setting, in this case a number.  

::: code-group
```js [anu]
//create(mesh: string, name: string, scene: Scene, options?: {}, data?: {})
let box = anu.create('box', 
                      'ourBox', 
                      scene, 
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assits,
                        depth: (d) => d.points
                      }, 
                      {goals: 5, assits: 10, points: 2})
```
:::
  <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="400"
      src="/anu/examples.html?example=box_data">
  </iframe>

## Binding Data to Boxes
Instead of using [create()](../api/modules.html#create) to create and return a single mesh, we can use [bind()](../api/modules.html#bind) to create a mesh for each index data we pass to the method. We call the bind method and pass an array length 3 of our data. [bind()](../api/modules.html#bind) creates a mesh for each element of the array and binds the respective index of data to the meshes metadata property. In the same way as [create()](../api/modules.html#create), we can use this data to manipulate the starting parameters of our meshes. But what if we want to manipulate other properties of our meshes such as their position? Notice that [bind()](../api/modules.html#bind) returns an instance of [Selection](../api/classes/Selection.md), this will be the key to dynamically manipulating our scene-graphs. 

::: code-group
```js [anu]
//bind(mesh: string, scene: Scene, options?: {}, data?: {})
 let boxes = anu.bind('box', 
                      scene, 
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assits,
                        depth: (d) => d.points
                      }, 
                      [
                        {goals: 10, assits: 5, points: 2},
                        {goals: 3, assits: 15, points: 8},
                        {goals: 1, assits: 8, points: 15}
                      ])
```

:::
  <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="400"
      src="/anu/examples.html?example=box_bind">
  </iframe>

## Manipulating Boxes with Selections
We will cover [Selection](../api/classes/Selection.md) in more detail later on, however, here is a quick demo of what they can do. In this example, we use [bind()](../api/modules.html#bind) to create three boxes and return the resulting selection object to the variable "boxes". We can use the selection object to method chain the provided methods of [Selection](../api/classes/Selection.md), allowing us to dynamically set all the possible properties of Babylon meshes. Here, we simply use the data we bound to these three boxes to change their respective X, Y, and Z positions.

::: code-group
```js [anu]
//bind(mesh: string, scene: Scene, options?: {}, data?: {})
  let boxes = anu.bind('box', 
                      scene, 
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assits,
                        depth: (d) => d.points
                      }, 
                      [
                        {goals: 10, assits: 5, points: 2},
                        {goals: 3, assits: 15, points: 8},
                        {goals: 1, assits: 8, points: 15}
                      ]
                      )

  boxes.positionX((d) => d.goals)
        .positionY((d) => d.assits)
        .positionZ((d) => d.points)
```
:::
  <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="400"
      src="/anu/examples.html?example=box_selection">
  </iframe>

  ## Whats Next
  By this point, you should hopefully see how we can scale up these techniques to create and manipulate Babylon meshes to create data visualizations. In the following sections, we will work toward these goals more concretely. First by learning more about selections and how to use them, and then by building a 3D visualization from the ground up. 

</multiView>