<script setup>
  import multiView from "../../vue_components/multiView.vue"
</script>

<multiView>

# Transitions

With Anu, we can easily add transitions and animations to our visualizations with just a few method calls. Anu's transitions implement the [Babylon animation system](https://doc.babylonjs.com/features/featuresDeepDive/animation/animation_introduction) and follow familiar patterns from [D3's transition methods](https://d3js.org/d3-transition).


## Basic Transition

Creating a transition is as easy as taking an existing [Selection](/api/classes/Selection.html) and calling the [transition()](/api/classes/Selection.html#transition) method. This will return a new Selection instance setup to run the transition animations. Then simply chain one or more wrapper functions, prop(), or props() methods that uses any of the following types: Number, Vector2, Vector3, Quaternion, Color3, or Matrix. This will result in an animation being created and started that animates the Mesh from the start value to the end value.

```js
let box = anu.bind('box', {}, [...Array(10).keys()]);

// Click the scene to transition
scene.onPointerDown = (pointer) => {
  let boxTransition = box.transition()
                         .position(() => Vector3.Random(-5, 5))
                         .rotation(() => Quaternion.Random());
}
```

<inlineView scene="Box_Transition" />

## Transition Options

To customize our transition, we can pass an options object to our transition() method. The following table shows the options you can set and their defaults.

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
    duration: 1000,
    delay: 200,
    easingFunction: new CircleEase(),
    onAnimationEnd: () => console.log('animation ended')
}

// Click the scene to transition
scene.onPointerDown = (pointer) => {
  let boxTransition = box.transition(transitionOptions)
                         .position(() => Vector3.Random(-5, 5))
                         .rotation(() => Quaternion.Random());
}
```

<inlineView scene="Box_TransitionOptions" />

## Dynamic Transition Options

We can also use an anonymous function to return a unique transition options for each Mesh in the Selection. This allows us to do things like staggered animations based on the "d" and "i" values.

```js
let box = anu.bind('box', {}, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Click the scene to transition
scene.onPointerDown = (pointer) => {
  let boxTransition = box.transition((d,n,i) => ({
                              duration: d * 100,
                              delay: (10 - d) * 100
                          }))
                         .position(() => Vector3.Random(-5, 5))
                         .rotation(() => Quaternion.Random());
}
```

<inlineView scene="Box_TransitionOptionsFunction" />

<div class="tip custom-block" style="padding-top: 8px">

If following the above syntax, make sure the options object you are returning after the "=>" is wrapped in parentheses/brackets, else it is treated as a code block and not an object.

</div>

## Sequencing Transitions
By default, if we want to sequence a series of transitions (i.e., staging), all we have to do is call transition() again on our transition selection and each transition will play in order for each Mesh in the Selection. This is controlled by the "sequence" option which is true by default. If you want to have separate options for different transition but want to play at the same time, just set "sequence" to false. 

```js
let box = anu.bind('box', {}, [...Array(10).keys()])
              .material(() => new StandardMaterial());

// Click the scene to transition
scene.onPointerDown = (pointer) => {
  let boxTransition = box.transition({ duration: 1000 })
                         .position(() => Vector3.Random(-5, 5))
                         .transition({ duration: 1000 })
                         .rotation(() => Quaternion.Random())
                         .transition({duration: 2000, sequence: false })
                         .diffuseColor(() => Color3.Random())
}
```

<inlineView scene="Box_TransitionSequence" />

<div class="tip custom-block" style="padding-top: 8px">

Setting the "sequence" flag to false causes the transition to ignore all other transition stages declared prior in the chain, instead animating immediately. To have it run in parallel with another transition while still having it animate after prior animations, consider setting its delay to be the sum of all prior transitions.

</div>

## Tween

Sometimes we want more control over transitions, or want to animate a property in a way not already supported. In these cases we can use the [tween()](/api/classes/Selection.html#tween) method instead of wrapper or prop() methods. tween() expects a function that accepts an argument "t", which is a time variable from 0 to 1. For each tick of the transition, this function will be called with "t" being the new time variable of this tick. We can use D3's [interpolate](https://d3js.org/d3-interpolate) methods or others such as [Vector3.Lerp()](https://doc.babylonjs.com/typedoc/classes/BABYLON.Vector3#lerp) to calculate the value which the property should be set to at this tick.

```js
let box = anu.bind('box', {}, [...Array(10).keys()])
             .material(() => new StandardMaterial());

// Click the scene to transition
scene.onPointerDown = (pointer) => {
  let boxTransition = box.transition().tween((d,n,i) => {
    // Initialize interpolating variables
    let interpolator = d3.interpolate(n.position.x, (Math.random() - 0.5) * 10)
    let startColor = n.material.diffuseColor;
    let endColor = Color3.Random();

    // Return a function which will set Mesh properties every tick using our interpolating variables
    return (t) => {
      n.position.x = interpolator(t);
      n.material.diffuseColor = Color3.Lerp(startColor, endColor, t);
    };
  });
}
```

<inlineView scene="Box_Tween" />

## Tween For Mesh Updates

Tween is particularly for updating parametric Mesh types such as lines. These Meshes require you to generate a new Mesh of that type and pass the previous Mesh in to be replaced. A great example of this is a line Mesh. 

```js
// Create initial lines
let startPoints = [
  Vector3.Random(-5, 5),
  Vector3.Random(-5, 5),
  Vector3.Random(-5, 5),
  Vector3.Random(-5, 5),
  Vector3.Random(-5, 5),
]

let line = anu.bind('lines', {points: startPoints, updatable: true}, [startPoints], scene)

// Click the scene to transition
scene.onPointerDown = (pointer) => {
  var line_transition = line.transition({ duration: 500 }).tween((d,n,i) => {
    // Generate end points for the animation
    let endPoints = [
      Vector3.Random(-5, 5),
      Vector3.Random(-5, 5),
      Vector3.Random(-5, 5),
      Vector3.Random(-5, 5),
      Vector3.Random(-5, 5),
    ];
    
    let interpolator = interpolateArray(startPoints, endPoints);
    
    // Update reference so that next transition we have the proper start points
    startPoints = endPoints;

    return (t) => {
      let points = interpolator(t).map((v) => new Vector3(v._x, v._y, v._z));
      anu.create("lines", "lines", { points: points, updatable: true, instance: n }, [points], scene);  // Pass in instance: n
    };
  })
}
```

<inlineView scene="Line_Tween" />

# Controlling Active Transitions  

There are several methods you can call on Selections with active transitions to control their behavior. These methods are helpful when you need to interrupt animations in progress to start a different set of transitions, which you might have already noticed if you had tried to rapidly click on the above examples.

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

let boxTransition;

// Click the scene to start the transition
scene.onPointerDown = (pointer) => {
  boxTransition?.stopTransitions();
  boxTransition = box.transition((d,n,i) => ({ duration: 500, delay: i * 50 }))
                      .position(() => Vector3.Random(-5,5))
                      .rotation(() => Quaternion.Random());
}
```

<inlineView scene="Box_TransitionControl" />

</multiView>