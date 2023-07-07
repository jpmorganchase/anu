# Using Selections

Selections are the core of the anu workflow. A [Selection](../api/classes/Selection.md) is a javascript object that is comprised of a list of nodes in the Babylon scene-graph, the Scene object containing those nodes, and several methods for selecting, creating, manipulating, or retrieving values from nodes in the Babylon scene-graph. 

## Selecting Nodes

Anu provides several different methods for selecting nodes from the Babylon scene-graph. We can select nodes by name, id, tags, and even by data values. 
These methods return an instance of [Selection](../api/classes/Selection.md) containing all the nodes we selected and allow us to update the properties of all the nodes in the selection. To start let us add some meshes to our scene-graph to select. Bellow we create a box with the name "box-name", and a sphere with the ID "sphere-ID".

::: code-group
```js [js]
//anu create returns a mesh object we can modify the babylon way
let box = anu.create("box", {}, scene)
box.name = "box-name";
box.position = new Vector3(-1,0,0)

let sphere = anu.create("sphere", {}, scene)
sphere.id = "sphere-ID";
sphere.position = new Vector3(1,0,0)

```
::: 
<iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="100%"
    height="400"
    src="/index.html/?example=select">
</iframe>

### Select by Name and ID

Now let us select each of these meshes and add a material to each.
Bellow we create two strandard Babylon materials, red for our box green for our sphere. Next we use [selectName()](../api/modules.html#selectname) to select our box, and [selectId()](../api/modules.html#selectid) to select our box. These each return a selection object including or selected mesh. 
We can then edit the porperties of these meshes but more on that later. Here we use [selection.material()](../api/classes/Selection.html#material) to set our red and green materials on our meshes. 

::: code-group
```js [js]
let boxMaterial = new StandardMaterial('boxMaterial', scene)
boxMaterial.diffuseColor = new Color3(1,0,0);
let sphereMaterial = new StandardMaterial('sphereMaterial', scene)
sphereMaterial.diffuseColor = new Color3(0,1,0);

//Anu select returns a selection object we can modify the anu way
let box_selection = anu.selectName('box-name', scene)
                        .material(boxMaterial)

let sphere_selection = anu.selectId('sphere-ID', scene)
                        .material(sphereMaterial)

```
::: 
<iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="100%"
    height="400"
    src="/index.html/?example=select_name_tag">
</iframe>

### Select by Tags

Aside from name and ID, Babylon supports adding [tags](https://doc.babylonjs.com/features/featuresDeepDive/tags) to meshes. Tags are a really handy way to organize and label meshes to make selecting them logically easier. We can use [selectTag()](../api/modules.html#selectTag) to select nodes by tag. Unlike selecting by name and by id, you can use logic within the selection string. Take this example to select theoretical nodes in a scene graph. 


::: code-group
```js [js]

//selects all nodes with the "box" tag
anu.selectTag("box", scene)
//selects all nodes with the "box" or "sphere" tag
anu.selectTag("box || sphere", scene) 
//selects all nodes with the "box" and "sphere" tag
anu.selectTag("box && sphere", scene) 
//selects all nodes without the "box" tag
anu.selectTag("!box", scene) 
//selects all nodes without the "box" tag
anu.selectTag("!box", scene) 
//selects all nodes with the "box" tag but without the "sphere" tag
anu.selectTag("box && !sphere", scene) 

```
::: 
### Select by Data

Anu's focus is manipulating the scene-graph in a data-driven way. Assuming you are using [bind()](../api/modules.html#bind) to bind data to meshes in the scene-graph you can use [selectData()](../api/modules.html#selectdata) to select nodes with your data's key/value pairs. Below is an example of selecting nodes binded with the iris data set. 

::: code-group
```js [js]
//return all the nodes with binded data key "sepal-length" of 1 
anu.selectData('sepal-length', 1, scene)
```
::: 
### Multiple Selections

All selection methods can be used to simultaneously select nodes with different search parameters by passing a list instead of a string.  

::: code-group
```js [js]
anu.selectName(['box-name', 'sphere-name'], scene)
anu.selectId(['sphere-ID', 'box-ID'], scene)
anu.selectTag(["box", "sphere"], scene)
anu.selectData(['sepal-length', 'petal-length'], [1,2], scene)
```
::: 

## Creating Nodes

## Manipulating Nodes 

## Retrieving Node Values

