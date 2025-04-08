---
type: lesson
title: Step 1 Bind Nodes
slug: /:partSlug/:chapterSlug/1-Step1.html/
---

# Build a 3D Scatter Plot with Anu

In this chapter we will walk through step-by-step how to build a 3D scatter plot using anu. While there is no one true way to accomplish this task, we will show you what we think are the best practices for using our toolkit. 

#### Step 1: Create a CoT Selection. 

We want to nest all the meshes in our scatter plot to one parent node so that is convenient to manage in our scene. Transform Nodes are a great for this purpose as they are empty light weight nodes that can apply transforms (position, scale, rotation, etc). Lets create a selection with a single transform node using bind(). 

```js
let cot = anu.bind('cot')
```

Calling bind like this will use the default arguments, and create a single transform node named "cot" to our most recent scene. If later on we have multiple cots in our scenes we would likely want to give it a unique name like cot.name("name" | (d,n,i) => "name" + i).

#### Step 2: Bind our Data to Meshes. 

Now that we have a cot lets use it to bind sphere meshes for each datum in our data set to be our visualization marks. In this example we are using the penguins data set you can see in the file explorer as "penguins.json". Using node we can import this json directly to our code. 

```js
let marks = cot.bind('sphere', {segments: 16}, penguins);
```

We are going to leave the sphere options mostly as the defaults, expect for segments. Segments will determine how many vertices the sphere is made with. The default is 32 which is a higher resolution than we really need. To save some performance lets cut this in half. 

If we expand the nodes tree in the inspector you should be able to see our cot and nested to it our 300+ sphere nodes for each datum in penguins. Next we will start to position these nodes using d3 scale functions. 