---
type: lesson
title: Actions
---

# Adding Interaction with Actions

While there are many ways to add interaction to our scenes, the easiest is with Babylon's [action system](https://doc.babylonjs.com/features/featuresDeepDive/events/actions). Actions are similar to event listeners, where we can add actions to meshes that trigger with certain inputs and execute a defined action. We can easily add actions to the meshes in a selection with the action() wrapper method. 

#### Step 1: set a execute code action to our meshes

Lets try this by adding an action to our scene that scales the box when we click on it. 



```js
//action(action: Action | (d,n,i) => Action)
```



