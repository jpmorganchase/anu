<script setup>
  import multiView from "../vue_components/multiView.vue"
  import inlineView from "../vue_components/inlineView.vue"
import { scatterPlot3DStep1 } from '../anu-examples/CreateAVis/step1';
import { scatterPlot3DStep2 } from '../anu-examples/CreateAVis/step2';
import { scatterPlot3DStep3 } from '../anu-examples/CreateAVis/step3';
import { scatterPlot3DStep4 } from '../anu-examples/CreateAVis/step4';
import { scatterPlot3DStep5 } from '../anu-examples/CreateAVis/step5';
import { scatterPlot3DStep6 } from '../anu-examples/CreateAVis/step6';

  

</script>

<multiView>

# Creating a Visualization

Now that we have covered the basics of creating, selecting, and manipulating nodes with Anu, we can start building our first data visualization. What better way to start than with the hello world of data vis, an iris dataset scatter plot!  

## Step 1: Create a Selection and Bind Data to Meshes

In the previous sections, we discussed why it was useful to nest meshes under a common parent. We will continue with this practice here as our first step is to create a selection with a single transform node (CoT) that will serve as the parent node for all of the meshes and nodes that will make up our scatter plot. 

```js
let cot = anu.bind('cot', scene);
```

Once we have our CoT selection we will use the bind method again from the Selection object to bind our iris data to sphere meshes. 
In the example below, we are calling bind and passing the type of mesh we want to create, the starting options of these meshes, in this case, the diameter, and the data we want to bind to the spheres. 
You can expand the node graph tree to see how a sphere was created for each row of data in our iris dataset as a child of CoT. 


::: code-group
```js
let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', {diameter: 0.5}, iris); // [!code focus]
```

<<< @/../anu-examples/data/iris.json
:::


<inlineView :scene="scatterPlot3DStep1" inspector="true" />


<div class="tip custom-block" style="padding-top: 8px">
Tip: bind() behaves differently when called standalone vs. from a selection. 

::: details
When calling bind from the "anu" namespace we need to pass the Babylon scene we are targeting, however when calling bind from a selection we do not need to pass the scene as it will be inferred from the selection object. Additionally, the bind method will always return a new selection. This is why we first saved our CoT selection into a variable before calling bind again to create our spheres. 
:::

</div>

## Step 2: Moving the Spheres into Position

Now that we have our spheres, each with data bound to it, we can start positioning them on the x,y,z axis. To do this we will use our spheres selection object and method chain the position wrapper methods. We will use an anonymous function knowing that and will pass the data (d), node (n), and index (i) to the code we pass. In this case, we only need the data (d) and will just return the value at our desired JSON keys. In the example below you can see how this positions all of our spheres based on the data bound to it.

```js
let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', {diameter: 0.5}, iris); 

spheres.positionX((d,n,i) => scaleX(d.sepalLength)) // [!code focus]
       .positionY((d,n,i) => scaleY(d.petalLength)) // [!code focus]
       .positionZ((d,n,i) => scaleZ(d.sepalWidth)); // [!code focus]
```


<inlineView :scene="scatterPlot3DStep2" />



However, there are some issues with this approach and indeed returning the raw data value as the node position is poor practice. For one, our spheres are overlapping, We could fix this by scaling our spheres down but this approach is limited as we can only make them so small before they are no longer visible. Furthermore, imagine our data values were much larger or very small, our spheres could end up being positioned way too far apart or close together. We don't want to conflate our data dimensions with our global and local rendering dimensions. Instead, we should interpolate the values from our data to our rendering coordinates. While Anu does not provide these methods directly, Anu was designed to work with the fantastic scale methods from D3. 

```js
import {extent, scaleLinear, map} from "d3"; // [!code focus]

let extentX = extent(map(iris, (d) => {return d.sepalLength}));
let extentY = extent(map(iris, (d) => {return d.petalLength}));
let extentZ = extent(map(iris, (d) => {return d.sepalWidth}));

let scaleX = scaleLinear().domain(extentX).range([-10,10]).nice(); // [!code focus]
let scaleY = scaleLinear().domain(extentY).range([-10,10]).nice(); // [!code focus]
let scaleZ = scaleLinear().domain(extentZ).range([-10,10]).nice(); // [!code focus]

let cot = anu.bind('cot', scene);
let spheres = cot.bind('sphere', {diameter: 0.5}, iris); 

spheres.positionX((d,n,i) => scaleX(d.sepalLength)) // [!code focus]
       .positionY((d,n,i) => scaleY(d.petalLength)) // [!code focus]
       .positionZ((d,n,i) => scaleZ(d.sepalWidth)); // [!code focus]
```

<inlineView :scene="scatterPlot3DStep3" />

That is looking better! Above we are using linear scales from d3 to transform our data values to render space values. The domain is the extent, the minimum and maximum values, of our data keys and the range is the min and max values output by our function. For example, the smallest sepal length with output -10 and the largest 10. The nice() method simply adds some padding to make things look nicer. 
We then use these functions directly in our position x,y,z calls, passing in the raw data values and returning the transformed values between -10 and 10.

## Step 3: Adding Axes

Now that our spheres are at their correct coordinates we can start to draw our axes. We could use anu to create our axes from scratch using Babylon mesh primitives like tubes, planes, lines, and text. However, we can also use the anu axes prefab with the createAxes() method which will take care of most of the heavy lifting for us! This method requires us to pass a name, the current scene, and object of options. There is one required option which is an object of our d3 scale functions for the respective axes we want to create. We also will pass our CoT to the parent option so everything remains under the same parent. We will be using the default options for this example, but you can read the axes prefab documentation to see all the ways you can customize your axes.

```js
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

// name, scene, options // [!code focus]
anu.createAxes('axes', scene, { parent: cot, // [!code focus]
                                scale: {x: scaleX, y: scaleY, z: scaleZ} // [!code focus]
                                }); // [!code focus]
```

<inlineView :scene="scatterPlot3DStep3" />

## Step 4: Adding Color

To make our visualization really pop we should color our spheres based on what type of species they encode. We can do this again using d3 scales, however in the future anu will provide shader material prefabs to make this easier. In the meantime, define a d3 ordinal scale with a categorical color scheme, assign a material to each sphere, and set the diffuse color using our new scale. 

```js
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

// name, scene, options 
anu.createAxes('axes', scene, { parent: cot, 
                                scale: {x: scaleX, y: scaleY, z: scaleZ} 
                                }); 
```

<inlineView :scene="scatterPlot3DStep4" />


</multiView>


