// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Animation, EasingFunction, Node, Animatable, Observer, Scene } from '@babylonjs/core';
import { Selection } from '../index';
import get from 'lodash-es/get';
import hasIn  from 'lodash-es/hasIn';

export type TransitionOptions = {
  duration?: number; //done
  delay?: number; //done
  framePerSecond?: number; //done
  sequence?: boolean;
  easingFunction?: EasingFunction; //done
  loopMode?: 0 | 1 | 2 | 3 | 4; //done but bug?
  onAnimationEnd?: () => void;
};

export class Transition {
  sequence: number;
  transitionOptions: TransitionOptions[];
  animatables?: {waitingPromise: Promise<Animatable>, animatable?: Animatable, animationPromise?: Promise<Animatable>, tweenObserver?: Observer<Scene>}[];

  constructor(sequence: number, transitionOptions: TransitionOptions[]) {
    this.sequence = sequence;
    this.transitionOptions = transitionOptions;
    this.animatables = [];
  }
}

/**
 * Initiates and returns a new transition selection object or adds a new transition sequence to an existing transition selection object. This method is called from a selection and is used to animate the change in transforms of each node in the selection. The transition can be customized using the provided options or a function that returns options for each node.
 *
 * @param options - The transition options to apply. This can be a `TransitionOptions` object or a function that returns a `TransitionOptions` object for each node. The function receives the data bound to the node, the node itself, and the index of the node as arguments.
 *
 * TransitionOptions:
 * - `duration` (optional): The duration of the transition in milliseconds.
 * - `delay` (optional): The delay before the transition starts, in milliseconds.
 * - `framePerSecond` (optional): The number of frames per second for the transition.
 * - `sequence` (optional): A boolean indicating whether the transition should be part of a sequence.
 * - `easingFunction` (optional): An easing function to control the transition's rate of change.
 * - `loopMode` (optional): A number (0 to 4) indicating the loop mode for the transition.
 * - `onAnimationEnd` (optional): A callback function to be executed when the transition ends.
 *
 * @returns The modified transition selection.
 */
export function transition(
  this: Selection,
  options: TransitionOptions | ((d: any, n: Node, i: number) => TransitionOptions),
) {
  let executedOptions = new Array<TransitionOptions>();
  let transitionSelection: Selection;
  if (this.transitions.length === 0) {
    transitionSelection = new Selection(this.selected, this.scene);
  } else {
    transitionSelection = this;
  }
  transitionSelection.selected.forEach((node, i) => {
    executedOptions.push(options instanceof Function ? options((node.metadata.data ??= {}), node, i) : options || {});
  });

  let transition = new Transition(this.transitions.length, executedOptions);
  transitionSelection.updateTransitions(transition);

  return transitionSelection;
}

/**
 * Creates and starts a transition animation for each node in the given selection. The transition is configured using the options specified in the selection's current transition sequence. This function handles the setup of animation parameters such as duration, frames per second, delay, loop mode, and easing function.
 *
 * @param selection - The selection of nodes to which the transition will be applied. Each node in the selection will have its property animated according to the specified options.
 * @param accessor - The name of the property to be animated (e.g., "position", "rotation").
 * @param value - The target value for the property. This can be a static value or a function that returns a value for each node. If a function is provided, it receives the data bound to the node, the node itself, and the index of the node as arguments.
 */
export function createTransition(selection: Selection, accessor: string, value: any) {
  let sequence = selection.transitions.length - 1;
  selection.selected.forEach(async (node, i) => {
    if (hasIn(node, accessor)) {
      let transitionOptions: TransitionOptions = selection.transitions[sequence].transitionOptions[i];
      let duration = (transitionOptions.duration || 250) / 1000;
      let fps: number = transitionOptions.framePerSecond || 30;
      let delay: number = transitionOptions.delay || 0;
      let frames: number = fps * duration;
      let loop: number = transitionOptions.loopMode || Animation.ANIMATIONLOOPMODE_CONSTANT;
      let ease: EasingFunction = transitionOptions.easingFunction || undefined;
      let wait: boolean = (transitionOptions.sequence ??= true);
      let onEnd: () => void = transitionOptions.onAnimationEnd || undefined;
      
      const transition = selection.transitions[sequence];
      const animationsCount = transition.animatables.length;

      let animatable: Animatable = new Animatable(node.getScene(), node);
      animatable.pause();
      let promise: Promise<Animatable> = animatable.waitAsync();
      selection.transitions[sequence].animatables.push({ waitingPromise: promise});
      let lastAnimation = selection.transitions[Math.max(0, sequence - 1)].animatables[animationsCount]
      if (sequence !== 0 && wait) await lastAnimation.waitingPromise
      if (lastAnimation.animatable) await lastAnimation.animationPromise


        let animation = Animation.CreateAndStartAnimation(
          node.name + '_' + accessor + '_animation',
          node,
          accessor,
          fps,
          frames,
          get(node, accessor),
          value instanceof Function ? value((node.metadata.data ??= {}), node, i) : value,
          loop,
          ease,
          onEnd,
        );
        animation.pause();
        transition.animatables[animationsCount].animatable = animation;
        transition.animatables[animationsCount].animationPromise = animation.waitAsync();
        animatable.stop()
        setTimeout(() => animation.restart(), delay);
    } else {
      console.warn(accessor + ' not property of ' + node);
    }
  });
}




/**
 * Creates and starts a transition animation for each node in the given selection and for each property in properties object. The transition is configured using the options specified in the selection's current transition sequence. This function handles the setup of animation parameters such as duration, frames per second, delay, loop mode, and easing function.
 *
 * @param selection - The selection of nodes to which the transition will be applied. Each node in the selection will have its property animated according to the specified options.
 * @param properties Object of key value pairs for the properties to be set or changed, e.g., \{\"renderingGroupId": 2, "material.alpha": 0.2\}.
 */
export function createTransitions(selection: Selection,  properties: {}) {
  let sequence = selection.transitions.length - 1;
  selection.selected.forEach(async (node, i) => {
    for (let accessor in properties) {
      if (hasIn(node, accessor)) {
        let value = properties[accessor]
        let transitionOptions: TransitionOptions = selection.transitions[sequence].transitionOptions[i];
        let duration = (transitionOptions.duration || 250) / 1000;
        let fps: number = transitionOptions.framePerSecond || 30;
        let delay: number = transitionOptions.delay || 0;
        let frames: number = fps * duration;
        let loop: number = transitionOptions.loopMode || Animation.ANIMATIONLOOPMODE_CONSTANT;
        let ease: EasingFunction = transitionOptions.easingFunction || undefined;
        let wait: boolean = (transitionOptions.sequence ??= true);
        let onEnd: () => void = transitionOptions.onAnimationEnd || undefined;

        const transition = selection.transitions[sequence];
        const animationsCount = transition.animatables.length;

        let animatable: Animatable = new Animatable(node.getScene(), node);
        animatable.pause();
        let promise: Promise<Animatable> = animatable.waitAsync();
        selection.transitions[sequence].animatables.push({ waitingPromise: promise});
        let lastAnimation = selection.transitions[Math.max(0, sequence - 1)].animatables[animationsCount]
        if (sequence !== 0 && wait) await lastAnimation.waitingPromise
        if (lastAnimation.animatable) await lastAnimation.animationPromise

       
          let animation = Animation.CreateAndStartAnimation(
            node.name + '_animation',
            node,
            accessor,
            fps,
            frames,
            get(node, accessor),
            value instanceof Function ? value((node.metadata.data ??= {}), node, i) : value,
            loop,
            ease,
            onEnd,
          );
          animation.pause();
          transition.animatables[animationsCount].animatable = animation;
          transition.animatables[animationsCount].animationPromise = animation.waitAsync();
          animatable.stop()

          setTimeout(() => animation.restart(), delay);
      } else {
        console.warn(accessor + ' not property of ' + node);
      }
    }
  });
}

//Need to add a feature to stop and start a new tween when it is called more than once
/**
 * Applies a tweening function to each node in the selection, returning a eased time value between 0-1 to be used for animation control for the total duration of the transition. The tweening function is executed for each node, allowing for fine-grained control over the animation process.
 *
 * @param value - A function that returns a tweening function for each node. The outer function receives the data bound to the node, the node itself, and the index of the node as arguments. The returned tweening function is called with a parameter `t` that represents the normalized time (from 0 to 1) of the animation.
 *
 * @returns The modified selection with the applied tweening animations.
 */
export function tween(this: Selection, value: (d, n, i) => (t) => void) {
  let sequence = this.transitions.length - 1;
  let scene = this.scene;
  this.selected.forEach(async (node, i) => {
    let transitionOptions: TransitionOptions = this.transitions[sequence].transitionOptions[i];
    let duration = transitionOptions.duration || 250;
    //let fps: number = transitionOptions.framePerSecond || 30;
    let delay: number = transitionOptions.delay || 0;
    //let loop: number = transitionOptions.loopMode || Animation.ANIMATIONLOOPMODE_CONSTANT
    let ease: EasingFunction = transitionOptions.easingFunction || undefined;
    let wait: boolean = (transitionOptions.sequence ??= true);
    let onEnd: () => void = transitionOptions.onAnimationEnd || undefined;
    let func = value((node.metadata.data ??= {}), node, i);
    let startTime = null;
    //let accumulatedTime = 0;

    const transition = this.transitions[sequence];
    const animationsCount = transition.animatables.length;


    let animatable: Animatable = new Animatable(scene, node, undefined, undefined, undefined, undefined, undefined);
    animatable.pause();
    let promise: Promise<Animatable> = animatable.waitAsync();
    this.transitions[sequence].animatables.push({ waitingPromise: promise });
    let lastAnimation = this.transitions[Math.max(0, sequence - 1)].animatables[animationsCount]
    if (sequence !== 0 && wait) await lastAnimation.waitingPromise
    if (lastAnimation.animatable) await lastAnimation.animationPromise
    let animation: Animatable = new Animatable(scene, node, undefined, undefined, undefined, undefined, onEnd);
    animation.pause();
    transition.animatables[animationsCount].animatable = animation;
    transition.animatables[animationsCount].animationPromise = animation.waitAsync();
    setTimeout(() => {
      let observer = scene.onBeforeRenderObservable.add(() => {
        transition.animatables[animationsCount].tweenObserver = observer
        animatable.stop();

        if (startTime === null) startTime = performance.now();
        let elapsedTime = performance.now() - startTime;
        let lerpTime = Math.min(elapsedTime / duration, 1);

        func(ease ? ease.ease(lerpTime)  : lerpTime);

        if (lerpTime === 1) {
          animation.stop();
          observer.remove()
        }       
      });
    }, delay);
  });
  return this;
}

/**
 * Stops all tween onBeforeRenderObservables currently running or waiting to be run on the selection. 
 *
 * @returns The modified selection with the applied transition animations.
 */
export function stopTweens(this: Selection){
  this.transitions.forEach((t) => {
    t.animatables.forEach( async (a) => {
      await a.waitingPromise
      a.tweenObserver.remove();
    })
  })

  return this
}

/**
 * Stops all animations currently playing or waiting to be played on the selection. 
 *
 * @returns The modified selection with the applied transition animations.
 */
export function stopTransitions(this: Selection) {
  this.transitions.forEach((t) => {
    t.animatables.forEach( async (a) => {
      await a.waitingPromise
      a?.animatable.stop();
      a?.tweenObserver.remove();
    })
  })
 return this;
}

/**
 * Rests and plays all animations currently playing or waiting to be played on the selection. 
 *
 * @returns The modified selection with the applied transition animations.
 */
export function resetTransitions(this: Selection) {
  this.transitions.forEach((t) => {
    t.animatables.forEach( async (a) => {
      await a.waitingPromise
      a.animatable.reset();
    })
  })
 
  return this;
 }

 /**
 * Rests and stops all animations currently playing or waiting to be played on the selection. 
 *
 * @returns The modified selection with the applied transition animations.
 */
 export function resetStopTransitions(this: Selection) {
  this.transitions.forEach((t) => {
    t.animatables.forEach( async (a) => {
      await a.waitingPromise
      a.animatable.reset();
      a.animatable.stop();
    })
  })
 
  return this;
 }

 /**
 * Pauses all animations currently playing or waiting to be played on the selection. 
 *
 * @returns The modified selection with the applied transition animations.
 */
 export function pauseTransitions(this: Selection) {
  this.transitions.forEach((t) => {
    t.animatables.forEach( async (a) => {
      await a.waitingPromise
      a.animatable.pause();
    })
  })
 
  return this;
 }


 /**
 * Resumes all paused animations currently playing or waiting to be played on the selection. 
 *
 * @returns The modified selection with the applied transition animations.
 */
 export function restartTransitions(this: Selection) {
  this.transitions.forEach((t) => {
    t.animatables.forEach( async (a) => {
      await a.waitingPromise
      a.animatable.restart();
    })
  })
  return this;
 }

 /**
 * Skips to the end of all animations currently playing or waiting to be played on the selection. 
 *
 * @returns The modified selection with the applied transition animations.
 */
 export function endTransitions(this: Selection) {
  this.transitions.forEach((t) => {
    t.animatables.forEach( async (a) => {
      await a.waitingPromise
      a.animatable.pause();
      a.animatable.goToFrame(a.animatable.toFrame);
      a.animatable.stop();
    })
  })
 
  return this;
 }
