---
type: lesson
title: Anu Bind() Several Meshes
---

# Binding Several Meshes

Instead of using [create()](../api/modules.html#create) to create and return a single mesh, we can use [bind()](../api/modules.html#bind) to create a mesh for each datum we pass to the method.
We therefore call [bind()](../api/modules.html#bind) and pass an iterable like an array of three objects as our data. This creates a mesh for each element of the array, and binds each element's data and array index to its mesh's metadata property. In the same way as [create()](../api/modules.html#create), we can use this data to manipulate the starting parameters of our meshes. However, unlike create() that returns a Babylon Mesh, bind() returns a anu [Selection](../api/classes/Selection.md) which is a class containing a list of nodes in the selection (Selection.selected) and several methods for working with the nodes in the selection, but more on that later. 

#### Step 1: Bind Boxes

Lets start by adding three boxes to our scene using the array of data in this lesson. for each box set the height, width, and depth options of each box dynamically like we did in the previous lesson using functions. 

```js
//bind(mesh: string, options?: {}, data?: [], scene?: Scene): Selection
let boxes = anu.bind('box',
                    {
                      height: ,
                      width: ,
                      depth: 
                    }, //complete this with functions setting the value of each options using a function like in the last lesson.
                    data,
                    scene
                    );
```

Once you have the boxes in the scene view it from the scene graph in the inspector (found under nodes). You should now see three nodes all at the root level for each mesh.  
You can also try logging the selection object to see what its made of (console.log(boxes) and open your browsers inspector panel ctrl/cmd + shift/option + i). You can find a list of our three box Meshes from boxes.selected


