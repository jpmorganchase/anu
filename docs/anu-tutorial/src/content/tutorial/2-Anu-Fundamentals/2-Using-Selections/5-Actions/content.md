---
type: lesson
title: Actions
slug: /:partSlug/:chapterSlug/5-Actions.html/
---

# Adding Interaction with Actions

While there are many ways to add interaction to our scenes, the easiest is with Babylon's [action system](https://doc.babylonjs.com/features/featuresDeepDive/events/actions). Actions are similar to event listeners, where we can add actions to meshes that trigger with certain inputs and execute a defined action. We can easily add actions to the meshes in a selection with the action() wrapper method. 

#### Step 1: set a execute code action to our meshes

Lets try this by adding an action to our scene that scales the shapes when we mouse over them, and undoes it when we mouse out. 

:::tip
[list of actions](https://doc.babylonjs.com/features/featuresDeepDive/events/actions#available-actions)

[list of triggers](https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers)
:::

```js
//action(action: Action | (d,n,i) => Action)

shapes.action((d,n,i) => new ExecuteCodeAction(
    trigger, 
    () => { n.scaling = new Vector3(x,y,z)},
))
```

After we add our trigger you should be able to mouse over the box our sphere and see its scale change in response. 
When using webXR, our inputs such as ray casts and button inputs are typically treated as mouse pointer events so they should function the same as mouse and keyboard by default. 







