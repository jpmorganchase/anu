<script setup>
  import multiView from "../vue_components/multiView.vue"
  //import inlineView from "../vue_components/inlineView.vue"
</script>

<multiView>

# Manipulating Selections
Manipulating nodes and meshes with Anu revolves around selecting nodes from the scene graph and modifying their properties. We can do this by invoking and chaining the methods of the [Selection](../api/classes/Selection.html) class. Remember, a Selection object is a list of nodes in a selection, the current scene, and the methods of Selection. When we invoke one of these methods, the method will be repeated for each node in the selection and then return the original or modified Selection object. This section will detail the many ways we can manipulate the nodes of a Selection object to create dynamic and data-driven scenes.  

## Value or Functions
Every method of [Selection](../api/classes/Selection.html) that modifies the properties of a node can either be given a raw value of the same type of the property, or a function that returns a value of the same type of the property. Let's start with the simple case of passing the value directly. Again we will bind the iris data set to sphere meshes, and we will modify the following properties, position, scalingX, and name. Each of these methods will set the value of all spheres in our selection to input value.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', {diameter: 1}, iris);

spheres.position(new Vector3(1,1,1)) // type vector3(x,y,z)
       .scalingX(0.2) // type int
       .name("iris_sphere"); // type string

Inspector.Show(scene, {
    embedMode: true,
    showInspector: false
});
```
::: 

<inlineView scene="mod_value" :inspector="true" />

However, it is often the case that we want to modify each sphere in the selection independently based on some value such as the data, property, or index. We can easily do this by passing an anonymous function to our methods instead of a value. Anu will execute all functions with the following three parameters:

1. d: The data bound to the node when it was created.
2. n: The node being modified.
3. i: The index of the node in the selection.
 
These parameters are passed into the function in order, and while they can be named anything the convention is (d, n, i). Your function must return the same type as the property you are trying to modify or else it will have no effect. To demonstrate this we will modify the same parameters as above but with functions instead of values. 

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', {diameter: 1}, iris);

spheres.position((d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth)) // type vector3(x,y,z)
        .scalingX((d,n,i) => n.scaling.x * 0.1) // type int
        .name((d,n,i) => "iris_sphere:" + i); // type string
```
::: 

<inlineView scene="mod_function" />


## Wrapper Methods

Anu provides wrapper methods for quickly modifying commonly used properties of nodes. These methods are intended to reduce the amount of boilerplate code needed for frequently used patterns. The wrapper methods currently implemented were chosen to coincide with typical data visualization encoding channels and important Babylon functions. We will continue to add wrapper methods as suggestions and needs arise. Here is a list of some of the wrapper functions you will likely be using frequently. Refer to the API documentation of the [Selection](../api/classes/Selection.html) class for a full list of wrapper methods.

| Wrapper Method | Babylon Property | Type 
| ----------- | ----------- | ----------- |
| [name()](../api/classes/Selection.html#name)     | [node.name](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node#name) | string
| [id()](../api/classes/Selection.html#id)   | [node.id](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node#id) | string
| [position()](../api/classes/Selection.html#position)   | [TransformNode.position](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | vector3
| [positionX()](../api/classes/Selection.html#positionx)   | [TransformNode.position.x](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | int
| [positionY()](../api/classes/Selection.html#positiony)   | [TransformNode.position.y](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | int
| [positionZ()](../api/classes/Selection.html#positionz)   | [TransformNode.position.z](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | int
| [scaling()](../api/classes/Selection.html#scaling)   | [TransformNode.scaling](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | vector3
| [scalingX()](../api/classes/Selection.html#scalingx)   | [TransformNode.scaling.x](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | int
| [scalingY()](../api/classes/Selection.html#scalingy)   | [TransformNode.scaling.y](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | int
| [scalingZ()](../api/classes/Selection.html#scalingz)   | [TransformNode.scaling.z](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | int
| [rotation()](../api/classes/Selection.html#rotation)   | [TransformNode.rotation](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | vector3
| [rotationX()](../api/classes/Selection.html#rotationx)   | [TransformNode.rotation.x](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | int
| [rotationY()](../api/classes/Selection.html#rotationy)   | [TransformNode.rotation.y](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | int
| [rotationZ()](../api/classes/Selection.html#rotationz)   | [TransformNode.rotation.z](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | int
| [material()](../api/classes/Selection.html#material)   | [Mesh.material](https://doc.babylonjs.com/typedoc/classes/BABYLON.StandardMaterial) | Material
| [diffuseColor()](../api/classes/Selection.html#diffusecolor)   | [Mesh.StandardMaterial.diffuseColor](https://doc.babylonjs.com/typedoc/classes/BABYLON.StandardMaterial#diffuseColor) | color3

## Modifying Any Property

We are not limited to only modifying the properties with wrapper methods. We can use the [prop()](../api/classes/Selection.html#prop) method to modify any property of a node in a selection, even those deeply nested, given the property exists. Following the example above, we can further modify the properties of our spheres.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', {diameter: 1}, iris);

spheres.prop("position", (d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth)) // type vector3(x,y,z)
        .prop('scaling.x', 0.1) // type int
        .prop('name', (d,n,i) => "iris_sphere:" + i) // type string
        .prop('renderOutline', true);
```
::: 

<inlineView scene="prop" />


## Modifying Many Properties

We may want to modify many properties of nodes in a selection at once. When we chain methods together we loop through the list of nodes and execute the method for each. Chaining several methods together will repeat this loop, potentially leading to performance impact. Instead of chaining methods, we can also use the [props()](../api/classes/Selection.html#props) method to set multiple properties with one loop. For example, here's how we would use props() to set the same methods as above.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', {diameter: 1}, iris);

spheres.props({"position": (d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth),
                'scaling.x': 0.1,
                'name': (d,n,i) => "iris_sphere:" + i,
                'renderOutline': true});
```
::: 

<inlineView scene="props" />

## Putting It All Together

If you have been following this guide in order, you now should know how we can use data and Anu to create, select, and manipulate nodes in the Babylon scene graph. It may not seem like it, but this is all we need to start building immersive data visualizations! In the next section, we will walk through step by step how to make a basic data visualization with Anu. 

</multiView>