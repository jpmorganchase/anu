<script setup>
  import multiView from "../vue_components/multiView.vue"
</script>

<multiView>

# Creating Meshes
Anu provides methods for dynamically manipulating the Babylon.js scene graph by creating [Meshes](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh), updating properties, and more. Let's start with the absolute basics: adding a box Mesh to our scene, and manipulating its properties with some data. Then, we will learn how create and change several Meshes at once with data.

## Add a Box
In this example, you can see how Anu's [create()](../api/modules.html#create) function adds a Mesh to the scene and returns the Mesh. While we can use Babylon.js's MeshBuilder to achieve the same thing, create() is largely meant to be an internal function used for other Anu methods. However, notice create() can take an optional argument "data". When passed, the data object is appended to our Mesh's metadata property and allows us to use this data to dynamically manipulate the Mesh.

::: code-group
```js [anu]
//create(mesh: string, name: string, options?: {}, data?: {}, scene?: Scene, )
let box = anu.create('box', 'myBox', {size: 2});
```
```js [babylon]
//CreateBox(name: string, options?: {}, scene?: Scene)
BABYLON.MeshBuilder.CreateBox('myBox', {size:2}, scene);
```
:::

<inlineView scene="Box" />

<div class="tip custom-block" style="padding-top: 8px">

The type of Mesh that is created using create() is determined by the first string argument. Anu supports almost all of the [MeshBuilder](https://doc.babylonjs.com/typedoc/variables/BABYLON.MeshBuilder) types from Babylon.js, in addition to several more. The following table shows the appropriate string to use in Anu to create the respective Mesh.

::: details Show Table

| String        | Mesh Type                                                                 |
|---------------|---------------------------------------------------------------------------|
| box           | [CreateBox](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateBox) |
| capsule       | [CreateCapsule](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateCapsule) |
| cot           | [TransformNode](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode) |
| cylinder      | [CreateCylinder](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateCylinder) |
| dashedLines   | [CreateDashedLines](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateDashedLines) |
| disc          | [CreateDisc](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateDisc) |
| geodesic      | [CreateGeodesic](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateGeodesic) |
| goldberg      | [CreateGoldberg](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateGoldberg) |
| greasedLine   | [CreateGreasedLine](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateGreasedLine) |
| ground        | [CreateGround](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateGround) |
| icosphere     | [CreateIcoSphere](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateIcoSphere) |
| lathe         | [CreateLathe](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateLathe) |
| lines         | [CreateLines](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateLines) |
| lineSystem    | [CreateLineSystem](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateLineSystem) |
| plane         | [CreatePlane](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreatePlane) |
| planeText     | [PlaneText](../guide/prefabs/planetext.md) |
| polygon       | [CreatePolygon](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreatePolygon) |
| polyhedron    | [CreatePolyhedron](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreatePolyhedron) |
| ribbon        | [CreateRibbon](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateRibbon) |
| sphere        | [CreateSphere](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateSphere) |
| tiledBox      | [CreateTiledBox](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateTiledBox) |
| tiledGround   | [CreateTiledGround](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateTiledGround) |
| tiledPlane    | [CreateTiledPlane](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateTiledPlane) |
| torus         | [CreateTorus](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateTorus) |
| torusKnot     | [CreateTorusKnot](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateTorusKnot) |
| tube          | [CreateTube](https://doc.babylonjs.com/typedoc/functions/BABYLON.CreateTube) |
| extrude       | [ExtrudeShape](https://doc.babylonjs.com/typedoc/functions/BABYLON.ExtrudeShape) |
| extrudeCustom | [ExtrudeShapeCustom](https://doc.babylonjs.com/typedoc/functions/BABYLON.ExtrudeShapeCustom) |
| extrudePolygon| [ExtrudePolygon](https://doc.babylonjs.com/typedoc/functions/BABYLON.ExtrudePolygon) |
<!-- | container     | []() | -->
:::

</div>


## Using Data and Functions
Anu's core philosophy is to enable you to manipulate the scene graph and its Meshes with data. We can begin to see how this is implemented when we pass data into create(), as shown in this example. We can use this data to dynamically set the initializing properties of our box Mesh through the use of [anonymous functions](https://www.geeksforgeeks.org/javascript-anonymous-functions/) instead of raw values in our options argument. These functions will be passed the variable "d" which is the data object we passed into this method, and should return a value of the appropriate type that we want to be set. Usually this would just be by accessing a property of the data object by key, but we can also execute valid JavaScript code to perform additional calculations before returning our value.

::: code-group
```js [anu]
//create(mesh: string, name: string, options?: {}, data?: {}, scene?: Scene,)
let box = anu.create('box',
                     'myBox',
                     {
                       height: (d) => d.goals,
                       width: (d) => d.assists,
                       depth: (d) => d.points
                     },
                     {
                       goals: 5,
                       assists: 10,
                       points: 2
                     },
                     scene
                     );
```
:::

<inlineView scene="Box_With_Data" />

## Binding Data to Meshes
Instead of using create() to create and return a single Mesh, we can use [bind()](../api/modules.html#bind) to create a Mesh for each datum we pass to the method. We therefore call bind() and pass an array of three objects as our data. This creates a Mesh for each element of the array, and binds each element's data and array index to its corresponding Mesh's metadata property. In the same way as create(), we can use this data to manipulate the starting parameters of our Meshes.

::: code-group
```js [anu]
//bind(mesh: string, options?: {}, data?: {}, scene?: Scene)
let boxes = anu.bind('box',
                    {
                      height: (d) => d.goals,
                      width: (d) => d.assists,
                      depth: (d) => d.points
                    },
                    [
                      { goals: 10, assists: 5, points: 2 },
                      { goals: 3, assists: 15, points: 8 },
                      { goals: 1, assists: 8, points: 15 }
                    ],
                    scene
                    );

```
:::

<inlineView scene="Box_Bind" />


## Manipulating Boxes with Selections
We've created our boxes based on data that we bound to them using bind(), but what if we want to manipulate other properties of our Meshes such as their position? Notice that bind() returns a [Selection](../api/classes/Selection.md) object that contains references to the newly created Meshes. While we will go cover Selection in more detail later on, here we briefly demonstrate the value of Selection for manipulating Meshes using Anu.

After creating several boxes using bind(), we assign its return Selection object to a variable "boxes". From this variable, we can chain together our desired operator methods provided by Selection to set the corresponding properties of our boxes. Similar to the options parameter in create(), we can pass either raw values or anonymous functions to set their values based on their bound data.

::: code-group
```js [anu]
//bind(mesh: string, options?: {}, data?: {}, scene: Scene,)
let boxes = anu.bind('box',
                    {
                      height: (d) => d.goals,
                      width: (d) => d.assists,
                      depth: (d) => d.points
                    },
                    [
                      { goals: 10, assists: 5, points: 2 },
                      { goals: 3, assists: 15, points: 8 },
                      { goals: 1, assists: 8, points: 15 }
                    ],
                    scene
                    );

//Pass in an anonymous function to dynamically set properties based on data
boxes.positionX((d) => d.goals)
     .positionY((d) => d.assists)
     .positionZ((d) => d.points);

//Alternatively, we can set the position all at once using a Vector3
boxes.position((d) => new Vector3(d.goals, d.assists, d.points));

//Pass in a raw value to set all meshes in the Selection to the same value
boxes.rotationX(Math.PI / 4);

```
:::

<inlineView scene="Box_Selection" />


## Binding Instances
When visualizing lots of identical Meshes, Babylon.js provides ways to improve rendering performance such as [Instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances) and [Thin Instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/thinInstances/). Anu provides methods including [bindInstance()](../api/modules.html#bindinstance) and [bindThinInstance()](../api/modules.html#bindthininstance) to make use of these features. These approaches, however, come with caveats around the flexibility of modifying Mesh properties. The [Meshes, Clones, and Instances](./deeper_topics/mesh_clone_instance.md) page provides more details around this topic.

Here we demonstrate the use of bindInstance(). It requires an already created Mesh to be passed into it, which will serve as the root Mesh that will be instanced for each datum. Some properties can be set the usual way for each instanced Mesh in the Selection (e.g., position, rotation, scaling), but others are innately shared by all instances (e.g., material color) unless we used instanced buffers. Anu provides functions to do so as shown below.

::: code-group
```js [anu]
//Generate 1000 fake data points
let data = [];
for (let i = 0; i < 1000; i++) {
  data.push(
    {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
      col: new Color4(Math.random(), Math.random(), Math.random(), 1)
    });
};

//Create a sphere to be used in our instance and register a color buffer
let rootSphere = anu.create('sphere', 'rootSphere', {diameter: 0.003});
rootSphere.isVisible = false;
rootSphere.registerInstancedBuffer("color", 4);
rootSphere.instancedBuffers.color = new Color4(1,1,1,1);

//bindInstance(mesh: Mesh, data?: {}, scene?: Scene,)
let spheres =  anu.bindInstance(rootSphere, data)
  .positionX((d) => d.x * 10)
  .positionY((d) => d.y * 10)
  .positionZ((d) => d.z * 10)
  .setInstancedBuffer("color", (d) => d.col);
```
:::

<inlineView scene="Binding_Instances" />

## What's Next?
By this point, you should hopefully see how we can scale up these techniques to create and manipulate Babylon.js Meshes to create data visualizations. In the following sections, we will work toward these goals more concretely. First by learning more about Selections and how to use them, and then by building a 3D scatter plot from the ground up.

</multiView>