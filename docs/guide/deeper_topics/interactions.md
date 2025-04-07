<script setup>
  import { scenePointer } from "../../anu-examples/scenePointer.js"
  import { action } from "../../anu-examples/action.js"
  import { behaviorDrag } from "../../anu-examples/behaviorDrag.js"
  import { behaviorDOF } from "../../anu-examples/behaviorDOF.js"
</script>

# Interactions

In Babylon.js, there are three main techniques for adding interactions to our scenes, scene pointer observables, actions, and behaviors. 
This page will cover the essentials of each of these techniques when using Anu.js.  

## Scene Observables 

When we want to listen for inputs on our entire scene from pointers, keyboards, or controllers, we can use Babylon's [scene input observables](https://doc.babylonjs.com/features/featuresDeepDive/scene/interactWithScenes). We make use of these throughout the documentation to enable simple interactions for switching between states. However, they can also be used from more complex interactions when using the information passed from the event to implement our interaction logic. 

```js
let box = anu.create('box', 'ourBox', {size: 2}, [{count: 2}]);
box.renderOutline = true;

scene.onPointerObservable.add((info) => {
  switch (info.type) {
    case PointerEventTypes.POINTERPICK:
      info.pickInfo.pickedMesh.outlineColor = Color3.Random();
      break
  }
})
```
<singleView :scene="scenePointer" />

We can also listen to on a single kind of event. 

```js
scene.onPointerPick = (evt, info) => {
      info.pickInfo.pickedMesh.outlineColor = Color3.Random();
}
```

## Actions

We can leverage Babylon's [action system](https://doc.babylonjs.com/features/featuresDeepDive/events/actions/) when we want to create events attached to our meshes. Actions operate similarly to DOM object events in that you can define a trigger and implement your logic to react to the event. To use actions you need to register an action manager for your mesh. 
When using Anu to create meshes through create() or bind() this is done automatically for you. Then to use actions, you can call action() from a Anu Selection to attach an action to each mesh in the selection. There are several types of actions provided by Babylon such as ExecuteCodeAction and InterpolateValueAction. There are also 14 types of triggers for these actions such as OnPickTrigger and OnPointerOverTrigger. Please see the Babylon docs page for actions for full details on creating and using actions. 

```js 
let boxes = anu.bind('box', {size: 1}, [1,2,3]);

boxes.position(() => Vector3.Random(-2,2))
      .action((d,n,i) => new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, 
        (evt) => {
          n.scaling = Vector3.Random(1.5,2);
        }
      ))
```

<singleView :scene="action" />


## Behaviors 
For more complex and compound interactions, Babylon provides the [behavior interface](https://doc.babylonjs.com/features/featuresDeepDive/behaviors/) and several camera and [mesh behaviors](https://doc.babylonjs.com/features/featuresDeepDive/behaviors/meshBehaviors/) that you can attach to nodes to handle interaction such as dragging. You can easily attach behaviors to all meshes in a Selection using behavior().

```js
boxes.position(() => Vector3.Random(-2,2))
      .behavior(() => new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0) }))
```

<singleView :scene="behaviorDrag" />

Some behaviors have properties that we will want to change to change for our interactions, we can do this by expanding our functions like so. 

```js
boxes.position(() => Vector3.Random(-2,2))
      .behavior(() => {
        let behavior = new SixDofDragBehavior();
        behavior.allowMultiPointer = true;
        behavior.faceCameraOnDragStart = true;
        behavior.rotateDraggedObject = false;
        behavior.rotateWithMotionController = false;

        return behavior;
      })
```

<singleView :scene="behaviorDOF" />


## WebXR Controllers

For WebXR controller interactions please see Babylon's [WebXR Controllers Support documentation](https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRInputControllerSupport/). With this API you can listen for specific button inputs and leverage them with the above techniques. However, webXR inputs are generally treated as pointer events if specific input maps are not provided. 




