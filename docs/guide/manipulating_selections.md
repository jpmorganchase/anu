<script setup>
  import multiView from "../vue_components/multiView.vue"
</script>

<multiView>

# Manipulating Selections
Manipulating [Nodes](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node) and [Meshes](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh) with Anu revolves around selecting Nodes from the scene graph and modifying their properties. We can do this by invoking and chaining the methods of the [Selection](../api/classes/Selection.html) class. Remember, a Selection object is a list of Nodes, the current [Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene), and the methods of Selection. When we invoke one of these methods, the method will be repeated for each Node in the Selection and then return the original or modified Selection object. This section will detail the many ways we can manipulate the Nodes of a Selection object to create dynamic and data-driven scenes.

## Value or Functions
Every method of Selection that modifies the properties of a Node can either be given a raw value of the same type of the property, or a function that returns a value of the same type of the property. Let's start with the simple case of passing the value directly. We will bind the iris data set to sphere Meshes and modify the following properties: position, scalingX, and name. Each of these methods will set the value of all spheres in our Selection to the same input value.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

spheres.position(new Vector3(1, 1, 1)) // Vector3
       .scalingX(0.2) // Number
       .name('iris_sphere'); // String
```
:::

<inlineView scene="mod_value" :inspector="true" />

However, it is often the case that we want to modify each sphere in the Selection independently based on some value such as its data, property, or index. We can easily do this by passing an anonymous function instead of a value. Anu will execute all functions with the following three parameters:

1. d: The data bound to the Node when it was created.
2. n: The Node being modified.
3. i: The index of the Node in the Selection.

These parameters are passed into the function in the above order, and while they can be named anything you want, the convention is (d,n,i). Your function must return the same type as the property you are trying to modify or else it will have no effect.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

spheres.position((d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth)) // Vector3
       .scalingX((d,n,i) => n.scaling.x * 0.1) // Number
       .name((d,n,i) => "iris_sphere:" + i); // String
```
:::

<inlineView scene="mod_function" />


## Wrapper Methods

Anu provides wrapper methods for quickly modifying commonly used properties of Nodes. These methods are intended to reduce the amount of boilerplate code needed for frequently used patterns. The wrapper methods currently implemented were chosen to coincide with typical data visualization encoding channels and important Babylon.js functions. Here is a list of some of the wrapper functions you will likely be using frequently. Refer to the API documentation of the [Selection](../api/classes/Selection.html) class for a full list of wrapper methods.

| Wrapper Method | Babylon.js Property | Type
| ----------- | ----------- | ----------- |
| [name()](../api/classes/Selection.html#name)     | [node.name](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node#name) | string
| [id()](../api/classes/Selection.html#id)   | [node.id](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node#id) | string
| [position()](../api/classes/Selection.html#position)   | [TransformNode.position](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | [Vector3](https://doc.babylonjs.com/typedoc/classes/BABYLON.Vector3)
| [positionX()](../api/classes/Selection.html#positionx)   | [TransformNode.position.x](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | Number
| [positionY()](../api/classes/Selection.html#positiony)   | [TransformNode.position.y](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | Number
| [positionZ()](../api/classes/Selection.html#positionz)   | [TransformNode.position.z](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | Number
| [scaling()](../api/classes/Selection.html#scaling)   | [TransformNode.scaling](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | Vector3
| [scalingX()](../api/classes/Selection.html#scalingx)   | [TransformNode.scaling.x](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | Number
| [scalingY()](../api/classes/Selection.html#scalingy)   | [TransformNode.scaling.y](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | Number
| [scalingZ()](../api/classes/Selection.html#scalingz)   | [TransformNode.scaling.z](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | Number
| [rotation()](../api/classes/Selection.html#rotation)   | [TransformNode.rotation](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | Vector3
| [rotationX()](../api/classes/Selection.html#rotationx)   | [TransformNode.rotation.x](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | Number
| [rotationY()](../api/classes/Selection.html#rotationy)   | [TransformNode.rotation.y](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | Number
| [rotationZ()](../api/classes/Selection.html#rotationz)   | [TransformNode.rotation.z](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | Number
| [material()](../api/classes/Selection.html#material)   | [Mesh.material](https://doc.babylonjs.com/typedoc/classes/BABYLON.StandardMaterial) | [Material](https://doc.babylonjs.com/typedoc/classes/BABYLON.Material)
| [diffuseColor()](../api/classes/Selection.html#diffusecolor)   | [Mesh.StandardMaterial.diffuseColor](https://doc.babylonjs.com/typedoc/classes/BABYLON.StandardMaterial#diffuseColor) | [Color3](https://doc.babylonjs.com/typedoc/classes/BABYLON.Color3)

## Modifying Any Property

We are not limited to only modifying properties with wrapper methods. We can use the [prop()](../api/classes/Selection.html#prop) method to modify any property of Nodes in a Selection, even those that are deeply nested. Following the example above, we can further modify the properties of our spheres.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

spheres.prop("position", (d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth)) // Vector3
       .prop("scaling.x", 0.1) // Number
       .prop("name", (d,n,i) => "iris_sphere:" + i) // String
       .prop("renderOutline", true); //Boolean
```
:::

<inlineView scene="prop" />


## Modifying Many Properties

We may want to modify many properties of Nodes in a Selection at once. When we chain methods together, we loop through the list of Nodes in the Selection and execute the method for each Node. Chaining several methods together will repeat this loop multiple times, potentially leading to performance impact. Instead of chaining methods, we can also use the [props()](../api/classes/Selection.html#props) method to set multiple properties with one loop. For example, here's how we would use props() to set the same methods as above.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

spheres.props({
                "position": (d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth),
                "scaling.x": 0.1,
                "name": (d,n,i) => "iris_sphere:" + i,
                "renderOutline": true
             });
```
:::

<inlineView scene="props" />

## Putting It All Together

If you have been following this guide in order, you now should know how we can use data and Anu to create, select, and manipulate Nodes in the Babylon.js scene graph. It may not seem like it, but this is all we need to start building immersive data visualizations! In the next section, we will walk through step by step how to make a basic data visualization with Anu.

</multiView>