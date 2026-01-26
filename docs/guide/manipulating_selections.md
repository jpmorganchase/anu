<script setup>
  import multiView from "../vue_components/multiView.vue"
</script>

<multiView>

# Manipulating Selections

Manipulating [Nodes](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node) and [Meshes](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh) with Anu revolves around selecting Nodes from the scene graph and modifying their properties or calling their methods. We can do this by invoking and chaining the methods of the [Selection](../api/classes/Selection.html) class. Remember, a Selection object is a list of Nodes, the current [Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene), and the methods of Selection. When we invoke one of these methods, the method will be repeated for each Node in the Selection and then return the original or modified Selection object. This section will detail the many ways we can manipulate the Nodes of a Selection object to create dynamic and data-driven scenes.

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


## Dynamic Operators

Anu provides dynamic operator methods that work with any property or method of the selected Babylon.js Nodes. Instead of pre-defined wrapper methods, you can directly invoke any property or method name on the Selection object, and Anu's proxy system automatically creates the appropriate accessor function for you. This approach is much more flexible and allows you to work with any Node property or method without needing specific wrapper functions.

You can call any property as a method with parentheses:

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

// Use dynamic operators for any property
spheres.position((d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth))
       .name((d,n,i) => "iris_sphere:" + i)
       .scaling(new Vector3(0.5, 0.5, 0.5))
       .material.alpha(0.8)
       .renderOutline(true);
       .translate(new Vector3(1,0,0), 0.1)
```
:::

### Common Properties

Here are some commonly used properties you might work with:

| Property | Babylon.js Property | Type | Example
| ----------- | ----------- | ----------- | ----------- |
| `name()` | [node.name](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node#name) | string | `spheres.name("my-sphere")`
| `id()` | [node.id](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node#id) | string | `spheres.id("sphere-1")`
| `position()` | [TransformNode.position](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#position) | Vector3 | `spheres.position(new Vector3(1, 2, 3))`
| `scaling()` | [TransformNode.scaling](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#scaling) | Vector3 | `spheres.scaling(new Vector3(0.5, 0.5, 0.5))`
| `rotation()` | [TransformNode.rotation](https://doc.babylonjs.com/typedoc/classes/BABYLON.TransformNode#rotation) | Vector3 | `spheres.rotation(new Vector3(0, Math.PI/4, 0))`
| `material()` | [Mesh.material](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh#material) | Material | `spheres.material(myMaterial)`

### Nested Properties

You can access nested properties by chaining them together:

::: code-group
```js [js]
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

// Access nested properties using dynamic chaining
spheres.material.diffuseColor((d,n,i) => new Color3(d.value, 0.5, 0.2))
       .material.alpha(0.8)
       .scaling.x((d,n,i) => d.petalWidth * 0.1);
```
:::

### Reading Values

You can also call an operator with no arguments to retrieve the current values from all selected Nodes. This returns an array of values, one for each Node in the Selection:

::: code-group
```js [js]
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

// Get all position values
let positions = spheres.position(); // Returns array of Vector3 values
console.log(positions); // [Vector3, Vector3, Vector3, ...]

// Get all names
let names = spheres.name(); // Returns array of strings
console.log(names); // ["sphere_0", "sphere_1", "sphere_2", ...]

// Get nested property values
let alphas = spheres.material.alpha(); // Returns array of alpha values
console.log(alphas); // [0.8, 0.8, 0.8, ...]
```
:::

### Convenience Wrapper Methods

While dynamic operators work with any property, Anu also provides some convenience wrapper methods for commonly used patterns:

| Wrapper Method | Property | Type
| ----------- | ----------- | ----------- |
| [positionX()](../api/classes/Selection.html#positionx) | `position.x` | Number
| [positionY()](../api/classes/Selection.html#positiony) | `position.y` | Number
| [positionZ()](../api/classes/Selection.html#positionz) | `position.z` | Number
| [scalingX()](../api/classes/Selection.html#scalingx) | `scaling.x` | Number
| [scalingY()](../api/classes/Selection.html#scalingy) | `scaling.y` | Number
| [scalingZ()](../api/classes/Selection.html#scalingz) | `scaling.z` | Number
| [rotationX()](../api/classes/Selection.html#rotationx) | `rotation.x` | Number
| [rotationY()](../api/classes/Selection.html#rotationy) | `rotation.y` | Number
| [rotationZ()](../api/classes/Selection.html#rotationz) | `rotation.z` | Number
| [diffuseColor()](../api/classes/Selection.html#diffusecolor) | `material.diffuseColor` | Color3

## Using prop() and props() Methods

While dynamic operators allow you to access any property directly, sometimes you may want to use the `prop()` and `props()` methods explicitly. These methods work with any property or method name as a string, which can be useful when you prefer the explicit string-based approach and want to save a small amount of time short-cutting the Selection proxy. 

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

// Using prop() for individual properties
spheres.prop("position", (d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth))
       .prop("scaling.x", 0.1)
       .prop("name", (d,n,i) => "iris_sphere:" + i)
       .prop("renderOutline", true);

// Calling methods with multiple arguments
spheres.prop("rotate", [(0, 1, 0), Math.PI / 4]); // axis and angle
```
:::

<inlineView scene="prop" />


## Setting Multiple Properties at Once

For better performance, you can use the [props()](../api/classes/Selection.html#props) method to set multiple properties with a single loop through the selected Nodes. When chaining methods together, Anu loops through the entire Selection for each method call. Using `props()` reduces this to a single loop, which is especially beneficial when modifying many properties.

::: code-group
```js [js]
let cot = anu.bind('cot');
let spheres = cot.bind('sphere', { diameter: 1 }, iris);

// Efficient: sets all properties in one loop
spheres.props({
  "position": (d,n,i) => new Vector3(d.sepalLength, d.sepalWidth, d.petalWidth),
  "scaling.x": 0.1,
  "name": (d,n,i) => "iris_sphere:" + i,
  "renderOutline": true,
  "setEnabled": true, // Method call with single argument
  "translate": [new Vector3(1, 0, 0), 0.5] // Method call with multiple arguments
});
```
:::

<inlineView scene="props" />

## Putting It All Together

If you have been following this guide in order, you now should know how we can use data and Anu to create, select, and manipulate Nodes in the Babylon.js scene graph. It may not seem like it, but this is all we need to start building immersive data visualizations! In the next section, we will walk through step by step how to make a basic data visualization with Anu.

</multiView>