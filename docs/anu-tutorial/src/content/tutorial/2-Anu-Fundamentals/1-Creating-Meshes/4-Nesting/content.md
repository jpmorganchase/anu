---
type: lesson
title: Nesting Meshes
---

# Nesting Meshes

Sometimes we will want to create meshes as children of other nodes in our scene-graph. This helps us both organize our scene graph as well as simplify modifying groups of nodes together.
That is because in [Babylon, children nodes will inherit the transforms and local coordinate space of their parent nodes](https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/parent_pivot/parent) (i.e. when we move or scale the parent, all children also apply these changes).
Anu lets use easily nest nodes by chaining a bind() call from a Selection.

#### Step 1: bind a Selection and bind again

Lets use bind to add a 'cot' ([Transform Node](https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/parent_pivot/transform_node/)). Then call bind again from our new cot selection to add boxes.  

```js
//bind(mesh: string, options?: {}, data?: [], scene?: Scene): Selection
let cot = anu.bind('cot') // returns a Selection

let boxes = cot.bind('box', {size: 2}, data, scene); // returns a new Selection
```

Once you have the boxes in the scene view it from the scene graph in the inspector (found under nodes). You should now see a cot node and if you expand it, three nodes set as children of cot.  
Using the inspector control gizmos you can move around cot in the scene and notice how the boxes move with it. 

:::tip
When you call bind() from another selection, meshes will be generated for each Node in the original selection. For example if we created three cots in this example, each of the three cot would have their own three boxes nested to them. You can try this out by passing data to the bind used to create cot (anu.bind('cot', {}, data)) then expand the scene graph to see the results. 
:::

