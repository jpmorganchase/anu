<script setup>
  import multiView from "../vue_components/multiView.vue"
</script>

<multiView>

# Using Selections

Selections are the core of the Anu workflow. A [Selection](../api/classes/Selection.md) is a JavaScript object that is comprised of a list of [Nodes](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node) in the Babylon.js scene graph, the [Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) object containing those Nodes, and several methods for selecting, creating, manipulating, or retrieving values and properties from Nodes in the Babylon.js scene graph.

<div class="tip custom-block" style="padding-top: 8px">

In Babylon.js, a [Mesh](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh) is a renderable model comprised of vertices and triangles. A Node is the base class that Mesh inherits and does not, by itself, have a visual component. While we use these two terms interchangeably here, in most cases with Anu you will be selecting and manipulating Meshes to form the visual elements that make up data visualizations.

</div>


## Manually Creating a Selection

A Selection object can be manually created by declaring a new Selection with a list of Nodes. In most cases you should not need to manually create Selections, though there are some instances where this can be useful such as when [building custom polygons](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/polyMeshBuilder/) and you want to then manipulate it using Anu's API. Anu provides several methods for selecting Nodes to dynamically create Selections from the scene graph. Below is an example of a Selection object created manually.

::: code-group
```js [js]
let sphere = anu.create("sphere", "mySphere");

//constructor(nodes: Mesh[] | AbstractMesh[] | TransformNode[] | Node[], Scene?: scene)
let selection = new anu.Selection([sphere], scene);
```
:::



## Selecting Nodes From the Scene Graph

We can also select Nodes by name, ID, tags, and even by data values. These methods return an instance of Selection containing all the Nodes we selected. To start, we first add some Meshes to our scene graph which we will select later.

::: code-group
```js [js]
//anu.create returns a Mesh object that we can modify using Babylon.js functions
let box = anu.create("box", "myBox");
box.name = "box-name";
box.position = new Vector3(-1,0,0);

let sphere = anu.create("sphere", "mySphere");
sphere.id = "sphere-ID";
sphere.position = new Vector3(1,0,0);

```
:::

<inlineView scene="select" />

### Select by Name and ID

Now let us select our two Meshes and add a material to each. Below we create two Babylon.js [StandardMaterials](https://doc.babylonjs.com/typedoc/classes/BABYLON.StandardMaterial), setting the diffuseColor of one material to red and the other to green. Next, we use [selectName()](../api/modules.html#selectname) to select our box by its name, and [selectId()](../api/modules.html#selectid) to select our sphere by its ID. These each return a [Selection](../api/classes/Selection.md) object that contains our selected Mesh. We can then assign the material for our two meshes using [selection.material()](../api/classes/Selection.html#material). Note that you can still assign Mesh properties using the standard Babylon.js way instead of through Anu's methods, but Anu can provide additional convenience especially in the case of multiple Selections (explained later).

::: code-group
```js [js]
let boxMaterial = new StandardMaterial('boxMaterial', scene);
boxMaterial.diffuseColor = new Color3(1, 0, 0);

let sphereMaterial = new StandardMaterial('sphereMaterial', scene);
sphereMaterial.diffuseColor = new Color3(0, 1, 0);

//anu.selectName and anu.selectId both return a Selection object that we can modify using Anu methods
let boxSelection = anu.selectName('box-name', scene)
                      .material(boxMaterial);

let boxSelection = anu.selectId('sphere-ID', scene)
                      .material(sphereMaterial);

```
:::

<inlineView scene="select_name_tag" />

### Select by Tags

Aside from name and ID, Babylon.js supports adding [tags](https://doc.babylonjs.com/features/featuresDeepDive/tags) to meshes. Tags are a really handy way to organize and label meshes to make selecting them later much easier. We can call [addTags()](../api/classes/Selection.md#addtags) from a Selection object to add a tag to all of its Nodes, and use [selectTag()](../api/modules.html#selectTag) to select all Nodes with the specified tag. Unlike selectName() and selectID(), you can use logic in selectTag() as shown below.

::: code-group
```js [js]
//Add the same tag to all Nodes in the Selection
mySelection.addTags('myTag');
//Add a tag based on each Node's bound data in the Selection
mySelection.addTags((d) => d.tag);

//Selects all Nodes with the "box" tag
anu.selectTag('box', scene);
//Selects all Nodes with the "box" or "sphere" tag
anu.selectTag('box || sphere', scene);
//Selects all Nodes with the "box" and "sphere" tag
anu.selectTag('box && sphere', scene);
//Selects all Nodes without the "box" tag
anu.selectTag('!box', scene);
//Selects all Nodes without the "box" tag
anu.selectTag('!box', scene);
//Selects all Nodes with the "box" tag but without the "sphere" tag
anu.selectTag('box && !sphere', scene);

```
:::

### Select by Data

Assuming you are using [bind()](../api/modules.html#bind) to bind data to Meshes in the scene graph, you can use [selectData()](../api/modules.html#selectdata) to select Nodes based on their bound data's key-value pairs.

::: code-group
```js [js]
//Selects all Nodes that have bound data with the key "sepal-length" and a corresponding value of 1
anu.selectData('sepal-length', 1, scene);
```
:::


### Multiple Selections

All selection methods can be used to simultaneously select Nodes with different search parameters by passing a list instead of a string.

::: code-group
```js [js]
//Selects all Nodes with the name "box-name" OR "sphere-name"
anu.selectName(['box-name', 'sphere-name'], scene);
//Selects all Nodes with the ID "sphere-ID" OR "box-ID"
anu.selectId(['sphere-ID', 'box-ID'], scene);
//Selects all Nodes with the tag "box" OR "sphere"
anu.selectTag(["box", "sphere"], scene);

//Selects all Nodes with bound data that has "sepal-length" of 1 OR "petal-length" of 2
//selectData(key: string | string[], value: string | number | string[] | number[], scene?: Scene, useAndLogic?: boolean)
anu.selectData(['sepal-length', 'petal-length'], [1, 2], scene, false);

//Selects all Nodes with bound data that has "sepal-length" of 1 AND "petal-length" of 2
//Setting the last argument to true forces selectData() to use AND logic
anu.selectData(['sepal-length', 'petal-length'], [1, 2], scene, true);
```
:::

## Creating Nodes with Selections

We can also call the bind() method from a Selection object. This will return a new Selection object with the created Nodes as children of the Nodes of the original Selection. Here we demonstrate the typical pattern for creating new Nodes with bind(). First, create a Selection object consisting of a single [TransformNode](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode). This serves as our "Center of Transform" (CoT) that will be the parent of other Meshes in our scene graph. This is akin to the [\<g\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/g) element used to group SVG elements in D3. We then use bind() from the Selection to create our desired Meshes as children of our CoT. This makes it easier to keep track of and manipulate all of the Nodes that belong to this CoT.

::: code-group
```js [js]
//Create a single TransformNode as our CoT
let cot = anu.bind('cot');

//Bind spheres as children of our CoT
let spheres = cot.bind('sphere', { diameter: 1 }, [-2, 0, 2])
                 .positionX(d => d);

```
:::

<inlineView scene="cot_bind" :inspector="true" />

If we call bind() on a Selection with more than one Node, it will repeat the method for each Node in the Selection. This is how the majority of Selection methods function. Here we call bind() on our Selection of spheres. This will create a box Mesh as a child of each sphere with each box inheriting its parent spheres data by default. We can override this behavior by passing a new data array to our bind method `bind('mesh-type', {options}, [new data])` or using a function that returns a new data array as with other operators `bind('mesh-type', {options}, (d,n,i) => [new data])`

::: code-group
```js [js]
let cot = anu.bind('cot');

let spheres = cot.bind('sphere', { diameter: 1 }, [-2, 0, 2])
                 .positionX(d => d);

//Calling bind() on our Selection of spheres will bind new Nodes as children 
//of each sphere and by default will inherit the data bound to its parent
let boxes = spheres.bind('box');
                   .positionY(d => d);
```
:::

<inlineView scene="spheres_bind" :inspector="true" />


## Manipulating Parent-Child Nodes with Selections
Following this pattern, we now have two Selection objects: one for the parent CoT and the other for the child Meshes. This gives us the option to manipulate either the parent or child Selection which will achieve different results. In Babylon.js (and in many other 3D engines), updating the transform properties of a parent Node (i.e., position, rotation, scaling) will also change the corresponding property of its children Nodes. To demonstrate this, let us try updating a Selection of child Meshes with random values, which will update the properties of each Mesh individually. The result is rather artistic.

::: code-group
```js [js]
let cot = anu.bind('cot');

let boxes = cot.bind('box', { size: 1 }, iris);

boxes.position(() => new Vector3(Math.random(), Math.random(), Math.random()))
     .rotation(() => new Vector3(Math.random(), Math.random(), Math.random()))
     .scaling(() => new Vector3(Math.random(), Math.random(), Math.random()));
```
:::

<inlineView scene="boxes_transform" />

In contrast, if we update the transform properties of the Selection for the parent CoT, only this parent Node will be updated and all of its child Meshes will move along with it. This is particularly useful for when we want to move, rotate, or scale a group of Meshes at once, such as when our CoT holds all of the child Meshes that forms a chart which we want to reposition as a whole.

::: code-group
```js [js]
let cot = anu.bind('cot');

let boxes = cot.bind('box', {size: 1}, iris);

//Calling from "cot" and not "boxes"
cot.position(() => new Vector3(Math.random(), Math.random(), Math.random()))
   .rotation(() => new Vector3(Math.random(), Math.random(), Math.random()))
   .scaling(() => new Vector3(Math.random(), Math.random(), Math.random()));
```
:::

<inlineView scene="cot_transform" />

## Nested Selections

Up to this point, we have only selected Nodes from the top level of the scene graph. However, we can also call any of the Selection methods from an instance of Selection. Two things change when we do this. First, we no longer have to pass the scene as a parameter and second, only the subgraph of Nodes in the Selection object will be searched. The following example demonstrates how calling a Selection method like selectName() from a Selection object will not select a Node with the correct name that is not part of said Selection object or its children.

::: code-group
```js [js]
let cot = anu.bind('cot');

//Create two spheres and put them to the left and middle of the screen
let spheres = cot.bind('sphere', { diameter: 1 }, [-2, 0]);
                 .positionX(d => d);
//Create a box for each sphere as children
let boxes = spheres.bind('box');

//Create a third box and put it towards the right
let rootBox = anu.bind('box')
                 .positionX(2);

//Make a new Selection of boxes, but only to those that belong to or are children of our "spheres" Selection
let newSelection = spheres.selectName('box');
//Move only the selected boxes down
newSelection.positionY(-1);
```
:::

<inlineView scene="select_boxes" :inspector="true" />


## Filtering Selections
We can filter existing Selections using the [filter](../api/classes/Selection.html#filter) method which expects a predicate function, keeping only the Nodes that passed the predicate.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

let setosa = spheres.filter((d) => d.species === "setosa");
```
:::

## Manipulating Selection Nodes
Up until now, we have shown how we can modify the properties of Nodes in our Selection objects. However, we can go beyond just modifying their position, rotation, scaling, and color. In the next section, we demonstrate how we can modify any property of our Nodes using Anu.

</multiView>