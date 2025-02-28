---
type: lesson
title: Step 5 Add Interaction
slug: /:partSlug/:chapterSlug/5-Step5.html/
---

# Adding Interaction

We are almost there, lets just add a little interaction to finish it up. Like we did in the actions section, lets add an action to highlights a node and adds details on demand when we hover. 


:::tip
[list of actions](https://doc.babylonjs.com/features/featuresDeepDive/events/actions#available-actions)

[list of triggers](https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers)
:::

#### Step 1: Create Our Actions

Lets start by creating 2 actions one that triggers on point over and one that triggers on point out. 

```js
let pointOverAction = (d,n,i) => new ExecuteCodeAction(
                         ActionManager.OnPointerOverTrigger,
                         () => {
                             //Our action code
                         }
                     );
                     
let pointOutAction = (d,n,i) => new ExecuteCodeAction( 
                         ActionManager.OnPointerOutTrigger,
                         () => {
                             //Our action code
                         }
                     );

marks.action((d,n,i) => pointOverAction(d,n,i))
     .action((d,n,i) => pointOutAction(d,n,i))
```


#### Step 2: Update Meshes in our Actions
Now that we have our actions lets add the code to outline or meshes when hovered using [renderOutline](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh#renderoutline)


```js
let pointOverAction = (d,n,i) => new ExecuteCodeAction(
                         ActionManager.OnPointerOverTrigger,
                         () => {
                             n.renderOutline = true;
                             n.outlineWidth = 0.2;
                         }
                     );
                     
let pointOutAction = (d,n,i) => new ExecuteCodeAction( 
                         ActionManager.OnPointerOutTrigger,
                         () => {
                              n.renderOutline = false;
                         }
                     );

marks.action((d,n,i) => pointOverAction(d,n,i))
     .action((d,n,i) => pointOutAction(d,n,i))
```

#### Step 3: Add a Details Label 
Now lets create a plane text object and update its visibility position and text to create a hover label. 


```js
let text = anu.create("planeText", "hover-label", {text: "blank"}) 
text.isVisible = false; //Create our text mesh and set it to be invisible

let pointOverAction = (d,n,i) => new ExecuteCodeAction(
                         ActionManager.OnPointerOverTrigger,
                         () => {
                            n.renderOutline = true;
                            n.outlineWidth = 0.2;

                            //Update text text, position, and set to be visible
                            text.updatePlaneText({text: `${d["Species"]}: ${d["Island"]}`})
                            text.position = n.position.clone().addInPlaceFromFloats(0.5, 0.5, 0)
                            text.isVisible = true;
                         }
                     );

let pointOutAction = (d,n,i) => new ExecuteCodeAction(
                         ActionManager.OnPointerOutTrigger,
                         () => {
                            n.renderOutline = false;
                            text.isVisible = false;
                         }
                     );

```

Now we have some basic interaction! Next up lets talk about setting things up to view in XR. 