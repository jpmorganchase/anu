<script setup>
  import multiView from "../vue_components/multiView.vue"
  //import inlineView from "../vue_components/inlineView.vue"
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

<inlineView scene="Box" />

## Using Data and Functions
Anu's core philosophy is enabling you to manipulate the scene-graph and its meshes with data. We can begin to see how this is implemented when we pass data into [create()](../api/modules.html#create). In this example, we pass some example data into our function. We can now use this data to dynamically set the initializing properties of our box mesh. Instead of passing a raw value in our options object, we can pass [anonymous functions](https://www.geeksforgeeks.org/javascript-anonymous-functions/) instead. These functions will be passed the variable "d" which is the data object we passed into this method. We can now return the value of the data we want to use by indexing our data object by key. Our functions can perform any valid javascript code so long as they return the appropriate value for the option we are setting, in this case a number.  

::: code-group
```js [anu]
//create(mesh: string, name: string, options?: {}, data?: {}, scene?: Scene,)
let box = anu.create('box', 
                      'ourBox', 
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assits,
                        depth: (d) => d.points
                      }, 
                      {goals: 5, assits: 10, points: 2},
                      scene
                      )
```
:::

<inlineView scene="Box_With_Data" />

## Binding Data to Boxes
Instead of using [create()](../api/modules.html#create) to create and return a single mesh, we can use [bind()](../api/modules.html#bind) to create a mesh for each index data we pass to the method. We call the bind method and pass an array length 3 of our data. [bind()](../api/modules.html#bind) creates a mesh for each element of the array and binds the respective index of data to the meshes metadata property. In the same way as [create()](../api/modules.html#create), we can use this data to manipulate the starting parameters of our meshes. But what if we want to manipulate other properties of our meshes such as their position? Notice that [bind()](../api/modules.html#bind) returns an instance of [Selection](../api/classes/Selection.md), this will be the key to dynamically manipulating our scene-graphs. 

::: code-group
```js [anu]
//bind(mesh: string, options?: {}, data?: {}, scene?: Scene)
 let boxes = anu.bind('box', 
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assits,
                        depth: (d) => d.points
                      }, 
                      [
                        {goals: 10, assits: 5, points: 2},
                        {goals: 3, assits: 15, points: 8},
                        {goals: 1, assits: 8, points: 15}
                      ],
                      scene
                      )
                    
```
:::

<inlineView scene="Box_Bind" />


## Manipulating Boxes with Selections
We will cover [Selection](../api/classes/Selection.md) in more detail later on, however, here is a quick demo of what they can do. In this example, we use [bind()](../api/modules.html#bind) to create three boxes and return the resulting selection object to the variable "boxes". We can use the selection object to method chain the provided methods of [Selection](../api/classes/Selection.md), allowing us to dynamically set all the possible properties of Babylon meshes. Here, we simply use the data we bound to these three boxes to change their respective X, Y, and Z positions.

::: code-group
```js [anu]
//bind(mesh: string, options?: {}, data?: {}, scene: Scene,)
  let boxes = anu.bind('box', 
                      {
                        height: (d) => d.goals,
                        width: (d) => d.assits,
                        depth: (d) => d.points
                      }, 
                      [
                        {goals: 10, assits: 5, points: 2},
                        {goals: 3, assits: 15, points: 8},
                        {goals: 1, assits: 8, points: 15}
                      ],
                      scene
                      )

  boxes.positionX((d) => d.goals)
        .positionY((d) => d.assits)
        .positionZ((d) => d.points)
```
:::

<inlineView scene="Box_Selection" />


## Binding Instances
When you need to render many identical meshes using [instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances) is significantly more performant that rendering each mesh individually. Instances will render all meshes in an instance using a single draw call, however this approach comes with some caveats around the flexibility of modifying properties. We can create instances using Anu with the [bindInstance()](../api/modules.html#bindInstance) method. Some properties we can change directly for each mesh in an instance, but for shared properties such as material color we need to us instance buffers. Anu provides wrapper functions for bot registering and setting instance buffers. To create a instance the bindInstance method expects a mesh object to be passed to it instead of a string.

::: code-group
```js [anu]
//create a sphere to be used in our instance and register a color buffer
let rootSphere = anu.create('sphere', 'sphere', {diameter: 0.003})
rootSphere.isVisible = false;
rootSphere.registerInstancedBuffer("color", 4);
rootSphere.instancedBuffers.color = new Color4(1,1,1,1) 


//bindInstance(mesh: Mesh, options?: {}, data?: {}, scene?: Scene,)
let spheres =  anu.bindInstance(rootSphere, data)
  .positionX((d) => Math.Random())
  .positionZ((d) => Math.Random())
  .setInstancedBuffer("color", new Color4(0,0,0,1))
```
:::


## Whats Next
By this point, you should hopefully see how we can scale up these techniques to create and manipulate Babylon meshes to create data visualizations. In the following sections, we will work toward these goals more concretely. First by learning more about selections and how to use them, and then by building a 3D visualization from the ground up. 

</multiView>