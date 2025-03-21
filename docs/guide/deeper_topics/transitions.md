<script setup>
  import multiView from "../../vue_components/multiView.vue"
  import { meshBench } from  "../../anu-examples/bench_mesh.js"
  import { instanceBench } from "../../anu-examples/bench_instance.js"
  import { thinInstanceBench } from "../../anu-examples/bench_thinInstance.js"
</script>

<multiView>

# Transitions

Animated transitions are one of the best ways to bring our scenes to life. Using Anu selections we can easily add transitions and animations to our scenes with just a few method calls. Anu's transitions implement the [Babylon animation system](https://doc.babylonjs.com/features/featuresDeepDive/animation/animation_introduction) and follow familiar patterns from [D3's transition methods](https://d3js.org/d3-transition).

## Basic Transition

Creating a transition is as easy as taking an existing Selection with some meshes in them and calling the [transition()](/api/classes/Selection.html#transition) method. This will return a new [Selection](/api/classes/Selection.html) instance setup to run the transition animations. Then simply use any wrapper function, prop(), or props() method that uses any of the following types: Color3, Float, Matrix, QUATERNION, Vector2, or Vector3. This will result in an animation being created and started that animates the mesh from the start value to the end value ordering to the transitionOptions passed to transition(). 

```js
let box = anu.bind('box', {}, [...Array(10).keys()]);

//click the scene to transition
scene.onPointerDown = (pointer) => {
  var box_transition = box.transition().position(Vector3.Random(-5,5))
}
```

<inlineView scene="Box_Transition" />

## Transition Options

We can pass an options object to our transition(options:{}) method. There are several options we can set to customize our transitions refer to the table for defaults:

| Variable & Type                  | Description                                                                                   | Default Value |
|----------------------------------|-----------------------------------------------------------------------------------------------|---------------|
| `duration` (`number`)  | The duration of the transition in milliseconds.                                               |  250           |
| `delay` (`number`)     | The delay before the transition starts, in milliseconds.                                      | 0          |
| `framePerSecond` (`number`) | The number of frames per second for the transition.                                       | 30           |
| `sequence` (`boolean`) | A boolean indicating whether the transition should be part of a sequence.                      |  true           |
| `easingFunction` (`function`) | An [Babylon easing function](https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations/#easing-functions) to control the transition's rate of change.                          |  undefined        |
| `loopMode` (`number` 0 to 4) | A number indicating the [Babylon loop mode](https://doc.babylonjs.com/features/featuresDeepDive/animation/animation_method/#creating-the-animation) for the transition.                                   |  0           |
| `onAnimationEnd` (`function`) | A callback function to be executed when the transition ends.                            | undefined           |


```js
let box = anu.bind('box', {}, [...Array(10).keys()]);

let transitionOptions = {
  duration: 500,
  delay: 100,
  easingFunction: new CircleEase(),
  onAnimationEnd: () => console.log('animate')
}

//click the scene to transition
scene.onPointerDown = (pointer) => {
  var box_transition = box.transition(transitionOptions).position(() => Vector3.Random(-5,5))
}

```

<inlineView scene="Box_TransitionOptions" />

## Sequencing Transitions
By default if want to sequence a series of transitions, all we have to do is call transition() again on our transition selection and each transition will play in order for each node in the Selection. This is controlled by the "sequence" option which is true by default. If you want to have separate options for different transition but want to play at the same time, just set "sequence" to false. 

```js
let box = anu.bind('box', {}, [...Array(10).keys()])
              .material(() => new StandardMaterial());

//click the scene to transition
scene.onPointerDown = (pointer) => {
  var box_transition = box.transition()
                          .position(() => Vector3.Random(-5,5))
                          .transition()
                          .diffuseColor(() => Color3.Random())
}
```

<inlineView scene="Box_TransitionSequence" />


## Tween

Sometimes we want more control over our transitions, or want to animate a variable change other the ones supported. For these cases we can use the [tween()](/api/classes/Selection.html#tween) method. 
tween expects a function that takes one variable t (time) as an argument. For each tick of the transition this function will be called passing in the current time in the transition to the function. We can use the [D3 interpolate](https://d3js.org/d3-interpolate) methods to calculate the new value of the transition variable. 

```js
let box = anu.bind('box', {}, [...Array(10).keys()]);

//click the scene to transition
scene.onPointerDown = (pointer) => {
  var box_transition = box.transition().tween((d,n,i) => {

    let interpolater = d3.interpolate(n.position.x, Math.random() * 10)


    return (t) => n.position.x = interpolater(t)
  })
}
```

<inlineView scene="Box_Tween" />

## Tween For Mesh Updates

Tween is particularly for updating parametric mesh types such as lines. These meshes require you to generate a new mesh of that type and pass the previous mesh in to be replaced. A great example of this is a line mesh. 

```js
let points1 = [
    new Vector3(-2, -1, 0),
    new Vector3(0, 1, 0),
    new Vector3(2, -1, 0),
]

let line = anu.bind('lines', {points: points1, updatable: true}, [points1], scene)

//click the scene to transition
scene.onPointerDown = (pointer) => {
  var line_transition = line.transition({duration: 1000}).tween((d,n,i) => {
  let points2 = [
    Vector3.Random(-5,5),
    Vector3.Random(-5,5),
    Vector3.Random(-5,5),
  ]
    
  let interpolater = interpolateArray(points1, points2)
    
  return (t) => {
    //Re-Mapping the vector3 to make sure they are clean
    let points = interpolater(t).map((v) => new Vector3(v._x,v._y,v._z))
    anu.create("lines", "lines", {points: points, updatable: true, instance: n}, [points], scene)
    }
  })
}
```


<inlineView scene="Line_Tween" />

</multiView>

# Controlling Active Transitions  

There are several methods you can call on selections with active transitions to stop, end, pause etc... These methods are helpful when you need to interrupt animations in progress to start a different set of transitions. For example when the user clicks a animate button multiple times. 

| Method Name            | Description                                                                                     |
|------------------------|-------------------------------------------------------------------------------------------------|
| `stopTweens`           | Stops all tween `onBeforeRenderObservables` currently running or waiting to be run on the selection. |
| `stopTransitions`      | Stops all animations currently playing or waiting to be played on the selection.                |
| `resetTransitions`     | Resets and plays all animations currently playing or waiting to be played on the selection.     |
| `resetStopTransitions` | Resets and stops all animations currently playing or waiting to be played on the selection.     |
| `pauseTransitions`     | Pauses all animations currently playing or waiting to be played on the selection.               |
| `restartTransitions`   | Resumes all paused animations currently playing or waiting to be played on the selection.       |
| `endTransitions`       | Skips to the end of all animations currently playing or waiting to be played on the selection.  |



```js
let box = anu.bind('box', {}, [...Array(10).keys()]);

let transitionOptions = {
  duration: 500,
  delay: 100,
  easingFunction: new CircleEase(),
  onAnimationEnd: () => console.log('animate')
}

var box_transition = box.transition(transitionOptions).position(() => Vector3.Random(-5,5))

setTimeout(() => {
  box_transition.stopTransitions();
}, 250)
```