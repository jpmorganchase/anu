<script setup>
  import multiView from "../vue_components/multiView.vue"
</script>

<multiView>

# Creating a Visualization

Now that we have covered the basics of creating, selecting, and manipulating Nodes with Anu, we can start building our first data visualization. What better way to start than with the Hello World of data visualization: an iris dataset scatter plot!

## Step 1: Create a Selection and Bind Data to Meshes

In the previous sections, we discussed why it was useful to nest Meshes under a common parent. We will continue with this practice here as our first step is to create a Selection with a single Center of Transformation (CoT) Node that will serve as the parent node for all of the Meshes and Nodes that will make up our scatter plot.

```js
let cot = anu.bind('cot', scene);
```

Once we have our CoT Selection we will use bind() again from the Selection object to bind our iris data to sphere Meshes. In the example below, we are calling bind() and passing the type of Mesh we want to create, the starting options of these Meshes (in this case, the diameter), and the data we want to bind to the spheres.


::: code-group
```js
let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', { diameter: 0.5 }, iris); // [!code focus]
```

<<< @/anu-examples/data/iris.json
:::


<inlineView scene="step1" :inspector="true" />


<div class="tip custom-block" style="padding-top: 8px">
Tip: bind() behaves differently when called by itself versus from a Selection.

::: details
When calling bind() from the "anu" namespace we need to pass the Babylon.js Scene we are targeting. However, when calling bind() from a Selection we do not need to pass the Scene as it will be inferred from the Selection object. Additionally, the bind() method will always return a new Selection. This is why we first saved our CoT Selection into a variable before calling bind() again to create our spheres.
:::

</div>

## Step 2: Moving the Spheres into Position

Now that we have our spheres with data bound to them, we can start positioning them on the x-, y-, and z-axis. To do this we will use our spheres Selection object and method chain the position wrapper methods. We will use anonymous functions, passing in the data (d), node (n), and index (i). In this case, we only need the data (d) and will just return the value at our desired JSON keys. In the example below you can see how this positions all of our spheres based on the data bound to it.

```js
let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', {diameter: 0.5}, iris);

spheres.positionX((d,n,i) => d.sepalLength) // [!code focus]
       .positionY((d,n,i) => d.petalLength) // [!code focus]
       .positionZ((d,n,i) => d.sepalWidth); // [!code focus]
```


<inlineView scene="step2" />

However, by using the raw data for our sphere positions we clearly run into several issues, least of all that they are off-center and difficult to view. We do not want to conflate our data dimensions with our global and local dimensions in Babylon.js. This is where we leverage the highly useful [scale methods from D3](https://d3js.org/d3-scale) to do this conversion from data dimensions to 3D coordinates. This step should be familiar for those experienced with D3.

```js
import { extent, scaleLinear, map } from "d3"; // [!code focus]

let extentX = extent(map(iris, (d) => {return d.sepalLength})); // [!code focus]
let extentY = extent(map(iris, (d) => {return d.petalLength})); // [!code focus]
let extentZ = extent(map(iris, (d) => {return d.sepalWidth})); // [!code focus]

let scaleX = scaleLinear().domain(extentX).range([-10,10]).nice(); // [!code focus]
let scaleY = scaleLinear().domain(extentY).range([-10,10]).nice(); // [!code focus]
let scaleZ = scaleLinear().domain(extentZ).range([-10,10]).nice(); // [!code focus]

let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', {diameter: 0.5}, iris);

spheres.positionX((d,n,i) => scaleX(d.sepalLength)) // [!code focus]
       .positionY((d,n,i) => scaleY(d.petalLength)) // [!code focus]
       .positionZ((d,n,i) => scaleZ(d.sepalWidth)); // [!code focus]
```

<inlineView scene="step3" />

That is looking better! Using D3's [scaleLinear()](https://d3js.org/d3-scale/linear), we transform the data values to Babylon.js's 3D coordinate system. The domain is minimum and maximum values of a given data dimension (i.e., the extent), and the range is the min and max values output by the scale function. The [nice()](https://d3js.org/d3-scale/linear#linear_nice) method from D3 simply adds some padding to make things look nicer. We then use these functions directly in our position x, y, and z calls, passing in the raw data values and returning the transformed values between the specified minimum and maximum ranges: in our case, -10 and 10.

## Step 3: Adding Axes

Now that our spheres are at their correct coordinates we can start to draw our axes. We could use Anu to create our axes from scratch using Babylon.js mesh primitives like tubes, planes, lines, and text. However, we can also use the Anu [axes prefab](./prefabs/axes.md) with the [createAxes()](../api/modules.md#createaxes) method which will take care of most of the heavy lifting for us! This method requires us to pass a name for our new axes and object of options. Within this options object, the only requirement is that it contains an object of our D3 scale functions for the respective axes we want to create. We also will pass our CoT to the parent option so everything remains under the same parent. We will be using the default options for this example, but you can read the [Axis](../api/classes/Axis.md) prefab documentation to see all the ways you can customize your axes.

```js
import { extent, scaleLinear, map } from "d3";

let extentX = extent(map(iris, (d) => {return d.sepalLength}));
let extentY = extent(map(iris, (d) => {return d.petalLength}));
let extentZ = extent(map(iris, (d) => {return d.sepalWidth}));

let scaleX = scaleLinear().domain(extentX).range([-10,10]).nice();
let scaleY = scaleLinear().domain(extentY).range([-10,10]).nice();
let scaleZ = scaleLinear().domain(extentZ).range([-10,10]).nice();

let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', {diameter: 0.5}, iris);

spheres.positionX((d,n,i) => scaleX(d.sepalLength))
       .positionY((d,n,i) => scaleY(d.petalLength))
       .positionZ((d,n,i) => scaleZ(d.sepalWidth));

//name, options // [!code focus]
anu.createAxes('axes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, // [!code focus]
                         parent: cot // [!code focus]
                       }); // [!code focus]
```

<inlineView scene="step5" />

<div class="tip custom-block" style="padding-top: 8px">
Anu provides two separate ways to declare options for the axes prefab.

::: details
Shown above is the most straightforward way which is to declare the options object directly in the method call. This is considered the [default approach](./prefabs/axes.md#default-3d-axes) of creating axes.

Another way is to declare a separate [AxesConfig](../api/classes/AxesConfig.md) object prior to calling createAxes(). This is a more [advanced approach](../guide/prefabs/axes.md#using-axisconfig) that can used in conjunction with [updateAxes()](../api/classes/Axis.md#updateaxes) to make adjustments to the axes appearance without re-declaring repeat options.
:::

</div>

## Step 4: Adding Color

To make our visualization more informative, we can color our spheres based on the species they represent. We can also do this using D3's scales. We define a D3 [scaleOrdinal()](https://d3js.org/d3-scale/ordinal), setting the output range to one of D3's [categorical schemes](https://d3js.org/d3-scale-chromatic/categorical). This will return a hex color string. To color our spheres, we first need to instantiate and assign a material to each sphere, then set its diffuseColor with the help of our new scale.

```js
import { extent, scaleLinear, map, scaleOrdinal, schemeCategory10 } from "d3"; // [!code focus]

let extentX = extent(map(iris, (d) => {return d.sepalLength}));
let extentY = extent(map(iris, (d) => {return d.petalLength}));
let extentZ = extent(map(iris, (d) => {return d.sepalWidth}));

let scaleX = scaleLinear().domain(extentX).range([-10,10]).nice();
let scaleY = scaleLinear().domain(extentY).range([-10,10]).nice();
let scaleZ = scaleLinear().domain(extentZ).range([-10,10]).nice();

let species = ['setosa', 'versicolor', 'virginica'] // [!code focus]
let scaleC = scaleOrdinal().domain(species).range(schemeCategory10) // [!code focus]

let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', {diameter: 0.5}, iris);

spheres.positionX((d,n,i) => scaleX(d.sepalLength))
       .positionY((d,n,i) => scaleY(d.petalLength))
       .positionZ((d,n,i) => scaleZ(d.sepalWidth))
       .material((d,n,i) => new StandardMaterial("myMaterial" + i, scene)) // [!code focus]
       .diffuseColor((d) => Color3.FromHexString(scaleC(d.species))); // [!code focus]

//name, options // [!code focus]
anu.createAxes('axes', { scale: { x: scaleX, y: scaleY, z: scaleZ }, // [!code focus]
                         parent: cot // [!code focus]
                       }); // [!code focus]
```

<inlineView scene="step6" />


</multiView>


