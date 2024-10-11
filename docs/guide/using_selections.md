<script setup>
  import multiView from "../vue_components/multiView.vue"
  //import inlineView from "../vue_components/inlineView.vue"
</script>

<multiView>

# Using Selections

Selections are the core of the Anu workflow. A [Selection](../api/classes/Selection.md) is a JavaScript object that is comprised of a list of [nodes](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node) in the Babylon scene graph, the Scene object containing those nodes, and several methods for selecting, creating, manipulating, or retrieving values and properties from nodes in the Babylon scene graph.

## Manually Creating a Selection

A selection object can simply be created by declaring a new [Selection](../api/classes/Selection.md) object with a list of nodes to be included in the selection and the scene the nodes were created in. Generally speaking, selections should not be created manually, though there are particular circumstances where it is worthwhile to do so.Anu provides several methods for selecting nodes to dynamically create selections from the scene graph which we will go over next. Below is an example of a selection being created manually with the meshes we created.

::: code-group
```js [js]
let sphere = anu.create("sphere", "mySphere");

let selection = new anu.Selection([sphere], scene);
```
:::



## Selecting Nodes From the Scene Graph

Anu provides several different methods for selecting nodes from the Babylon scene graph. We can select nodes by name, ID, tags, and even by data values. These methods return an instance of [Selection](../api/classes/Selection.md) containing all the nodes we selected and allow us to update the properties of all the nodes in the selection. To start, let us add some meshes to our scene graph to select. Below we create a box with the name "box-name", and a sphere with the ID "sphere-ID".

::: code-group
```js [js]
//anu.create returns a mesh object that we can modify using Babylon functions
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

Now let us select our two meshes and add a material to each. Below we create two standard Babylon materials, setting the diffuseColor to red for the box's material and green for the sphere's material. Next, we use [selectName()](../api/modules.html#selectname) to select our box by its name, and [selectId()](../api/modules.html#selectid) to select our box by its ID. These each return a [Selection](../api/classes/Selection.md) object including our selected mesh.
We can then edit the properties of these meshes, but more on that later. Here we use [selection.material()](../api/classes/Selection.html#material) to set the materials for our two meshes respectively.

::: code-group
```js [js]
let boxMaterial = new StandardMaterial('boxMaterial', scene);
boxMaterial.diffuseColor = new Color3(1,0,0);

let sphereMaterial = new StandardMaterial('sphereMaterial', scene);
sphereMaterial.diffuseColor = new Color3(0,1,0);

//anu.selectName and anu.selectId both return a Selection object that we can modify using Anu functions
let box_selection = anu.selectName('box-name', scene)
                        .material(boxMaterial);

let sphere_selection = anu.selectId('sphere-ID', scene)
                        .material(sphereMaterial);

```
:::

<inlineView scene="select_name_tag" />

### Select by Tags

Aside from name and ID, Babylon supports adding [tags](https://doc.babylonjs.com/features/featuresDeepDive/tags) to meshes. Tags are a really handy way to organize and label meshes to make selecting them logically easier. We can use [selectTag()](../api/modules.html#selectTag) to select nodes by tag. Unlike selecting by name and by ID, you can use logic within the selection string. Take this example to select theoretical nodes in a scene graph.


::: code-group
```js [js]
//Selects all nodes with the "box" tag
anu.selectTag("box", scene);
//Selects all nodes with the "box" or "sphere" tag
anu.selectTag("box || sphere", scene);
//Selects all nodes with the "box" and "sphere" tag
anu.selectTag("box && sphere", scene);
//Selects all nodes without the "box" tag
anu.selectTag("!box", scene);
//Selects all nodes without the "box" tag
anu.selectTag("!box", scene);
//Selects all nodes with the "box" tag but without the "sphere" tag
anu.selectTag("box && !sphere", scene);

```
:::
### Select by Data

Anu's focus is manipulating the scene graph in a data-driven way. Assuming you are using [bind()](../api/modules.html#bind) to bind data to meshes in the scene graph, you can use [selectData()](../api/modules.html#selectdata) to select nodes with your data's key/value pairs. Below is an example of selecting nodes binded with the iris data set.

::: code-group
```js [js]
//Selects all nodes with binded data key "sepal-length" with a value of 1
anu.selectData('sepal-length', 1, scene);
```
:::
### Multiple Selections

All selection methods can be used to simultaneously select nodes with different search parameters by passing a list instead of a string.

::: code-group
```js [js]
//Selects all nodes with the name "box-name" or "sphere-name"
anu.selectName(['box-name', 'sphere-name'], scene);
//Selects all nodes with the ID "sphere-ID" or "box-ID"
anu.selectId(['sphere-ID', 'box-ID'], scene);
//Selects all nodes with the tag "box" or "sphere"
anu.selectTag(["box", "sphere"], scene);
//Selects all nodes with binded data that has "sepal-length" with a value of 1,
//or "petal-length" with a value of 2
anu.selectData(['sepal-length', 'petal-length'], [1,2], scene);
```
:::

## Creating Nodes with Selections

We can also call the [bind()](../api/classes/Selection.html#bind) method from a [Selection](../api/classes/Selection.md) object. This will return a new Selection object with the created nodes. These new nodes will be created as children of the nodes of the original selection. Below, we demonstrate the typical pattern we recommend for creating new nodes with bind. First, create a Selection object consisting of a single [TransformNode](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode) or otherwise empty mesh. Then use bind to create the desired meshes as children of your TransformNode. This will create a single root for all the newly created meshes which will make it easier to change all the nodes in this subtree later.

::: code-group
```js [js]
//Use a top level anu.bind to create a Selection containing
//a single TransformNode 'cot' aka Center of Transform.
//By default the name and ID of a node will be the mesh type
let cot = anu.bind('cot');

//Create a sphere for each row of data in the iris data set.
//These spheres will be the children of our cot node.
let spheres = cot.bind('sphere', {diameter: 1}, iris);

//Expand the node tree in the inspector to see structure.
Inspector.Show(scene, {
    embedMode: true,
    showInspector: true
});

```
:::

<inlineView scene="cot_bind" :inspector="true" />

If we call bind on a Selection with more than one node it will repeat the method for each node in the selection. Note that this is how the majority of Selection methods function. Here we call bind on our Selection of spheres. This will create a box mesh as a child node of each sphere.

::: code-group
```js [js]
let cot = anu.bind('cot');

let spheres = cot.bind('sphere', {diameter: 1}, iris);

//We can keep nesting bind on new selections
//For example, calling bind on the Selection "spheres"
//we can create a box for each sphere
let boxes = spheres.bind('box');

//Expand the node tree in the inspector to see structure.
//Each sphere under cot will now be the parent of a box mesh.
Inspector.Show(scene, {
    embedMode: true,
    showInspector: false
});
```
:::

<inlineView scene="spheres_bind" :inspector="true" />


## Manipulating Nodes with Selections
We can update these new nodes in two ways. We can either directly change the returned Selection of these nodes, or change the parent selection of the children nodes. In Babylon, when you update the transform properties of a parent node (position, scale, rotation) it changes these properties for all children of that node. First, let us update the transform properties of a selection of boxes. We will use random numbers for position, scale, and rotation. This will change these transform properties for each box in the selection individually. The result is rather artistic.

::: code-group
```js [js]
let cot = anu.bind('cot');

let boxes = cot.bind('box', {size: 1}, iris);

//Call the transform methods exposed by Selection
//Set random transforms for all the box meshes
//These methods will be executed for each box
boxes.position(() => new Vector3(Math.random(), Math.random(), Math.random()))
    .scaling(() => new Vector3(Math.random(), Math.random(), Math.random()))
    .rotation(() => new Vector3(Math.random(), Math.random(), Math.random()))
```
:::

<inlineView scene="boxes_transform" />

In contrast, if we change the transform properties of the parent node instead (in our case the cot selection), the result is much less dramatic. This is because we are changing the transform of only one node, and because the boxes are children of that node they are all being transformed in the same way. This can be useful when we want to move, scale, or rotate a group of meshes at once. For example, if we create a scatter plot and all the meshes are children of a single transform node, we can change the position, scale, and rotation of the whole scatter plot by changing the properties of the root parent node, but more on that later.

::: code-group
```js [js]
let cot = anu.bind('cot');

let boxes = cot.bind('box', {size: 1}, iris);

//Call the transform methods exposed by Selection
//set random transforms for cot which will change the transform of all children
//These methods will be executed once for the single cot
cot.position(() => new Vector3(Math.random(), Math.random(), Math.random()))
    .scaling(() => new Vector3(Math.random(), Math.random(), Math.random()))
    .rotation(() => new Vector3(Math.random(), Math.random(), Math.random()))
```
:::

<inlineView scene="cot_transform" />

## Nested Selections

Up to this point, we have only selected nodes from the top level of the scene graph. However, we can also call any of the selection methods from an instance of [Selection](../api/classes/Selection.md). Two things change when we do this. First, we no longer have to pass the scene as a parameter and second, only the subgraph of nodes in the Selection object will be searched. For example, below we use the same scene graph as above where each sphere has one child box. We will add one more box with the same name and ID as the nested meshes "box" to the root of the scene graph. When we call a selection method like [selectName](../api/classes/Selection.html#selectName) from our "spheres" selection object, only the children boxes of the spheres will be selected and returned as a new Selection object. This can be seen as we can now manipulate our new Selection of boxes without changing the box mesh we added to the root of the scene.

::: code-group
```js [js]
let cot = anu.bind('cot');

//Create a sphere for each row of data in the iris data set.
//These spheres will be the children of our cot node.
let spheres = cot.bind('sphere', {diameter: 1}, iris);
let boxes = spheres.bind('box')

//Create a new box at the root level of the scene graph
//Move it on the x axis to -2
let root_box = anu.bind('box', scene);
root_box.positionX(-2)

//Select the boxes who are children of the nodes in the sphere selection
//Move these boxes on the x axis to 2
let boxesSelection = spheres.selectName('box')
boxesSelection.positionX(2)

Inspector.Show(scene, {
    embedMode: true,
    showInspector: false
});
```
:::

<inlineView scene="select_boxes" :inspector="true" />

<!-- ## Getting Selection Values
We can retrieve values of properties from nodes in a [Selection](../api/classes/Selection.md) object.  -->

## Filtering Selections
We can filter existing selections by values of properties from nodes in a [Selection](../api/classes/Selection.md) object with the [filter](../api/classes/Selection.html#filter) method.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', {diameter: 1}, iris);

let setosa = spheres.filter((d) => d.species == "setosa")

```
:::

## Manipulating Selection Nodes
In the previous examples, we have already shown how we can modify the properties of nodes in our [Selection](../api/classes/Selection.html) object.
However, this goes way beyond just changing nodes' position and color. We can modify any property of nodes in a selection using Anu. In the next section, we will cover this in-depth.

</multiView>