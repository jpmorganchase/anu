---
type: lesson
title: Manipulating Selections
slug: /:partSlug/:chapterSlug/1-Manipulating-Selections.html/
---

# Manipulating Selection

Manipulating nodes and meshes with Anu revolves around selecting nodes from the scene graph and modifying their properties. We can do this by invoking and chaining the methods of the [Selection](../api/classes/Selection.html) class. Remember, a Selection object is a list of nodes in a selection, the current scene, and the methods of Selection. When we invoke one of these methods, the method will be repeated for each node in the selection and then return the original or modified Selection object. This section will detail the many ways we can manipulate the nodes of a Selection object to create dynamic and data-driven scenes.

:::tip 
<a href="https://jpmorganchase.github.io/anu/guide/manipulating_selections.html#wrapper-methods" target="_blank"> Commonly Used Selection Methods </a>

<a href="https://jpmorganchase.github.io/anu/api/classes/Selection.html#properties" target="_blank"> All Selection Methods </a>
:::

#### Step 1: Use a Selection Method to Modify the Meshes in the Selection. 

As the simplest example lets move all the boxes in the selection in the x direction 10 units from the origin. We can use the .positionX method to achieve this passing a number as the expected input type. 

```js
boxes.positionX(number)
```

this call will loop through the list of selected meshes and change the mesh.position.x value of each to the input number. We also could have changed the entire position value by using .position(Vector3) 

```js
import {Vector3}  from "@babylonjs/core"

boxes.position(new Vector3(x,y,z))
```


#### Step 2: Set Positions With Dynamically  

Instead of passing a single value we can instead pass a anonymous function that will be executed for each selected mesh. This way we can set the properties of meshes dynamically using the bound values of the mesh. 
Anu will execute all functions with the following three parameters:

1. d: The data bound to the node when it was created.
2. n: The [node](https://doc.babylonjs.com/typedoc/classes/BABYLON.Node) being modified.
3. i: The index of the node in the selection.

These parameters are passed into the function in order, and while they can be named anything the convention is (d,n,i). Your function must return the same type as the property you are trying to modify or else it will have no effect. To demonstrate this we will modify the same parameters as above but with functions instead of values.

Try setting the Y position of each node to its value of "goals" and the Z position to its index "i"
```js
boxes.positionX( (d, n, i) => /* your function code */)
```

Each box should now have its own unique position in our scene.




