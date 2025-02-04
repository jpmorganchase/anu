---
type: lesson
title: Manipulating Selection
---

# Manipulating Selection

Manipulating nodes and meshes with Anu revolves around selecting nodes from the scene graph and modifying their properties. We can do this by invoking and chaining the methods of the [Selection](../api/classes/Selection.html) class. Remember, a Selection object is a list of nodes in a selection, the current scene, and the methods of Selection. When we invoke one of these methods, the method will be repeated for each node in the selection and then return the original or modified Selection object. This section will detail the many ways we can manipulate the nodes of a Selection object to create dynamic and data-driven scenes.

:::tip 
<a href="https://jpmorganchase.github.io/anu/guide/manipulating_selections.html#wrapper-methods" target="_blank"> Commonly Used Selection Methods </a>

<a href="https://jpmorganchase.github.io/anu/api/classes/Selection.html#properties" target="_blank"> All Selection Methods </a>
:::

#### Step 1: use Selection.positionX() to move all the boxes in the selection to x position 10





