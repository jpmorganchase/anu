import { Animation, EasingFunction, Node, Animatable } from '@babylonjs/core';
import { Selection } from '../index';
import get from 'lodash-es/get';

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
  animatables?: Promise<Animatable>[];

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
    let transitionOptions: TransitionOptions = selection.transitions[sequence].transitionOptions[i];
    let duration = (transitionOptions.duration || 250) / 1000;
    let fps: number = transitionOptions.framePerSecond || 30;
    let delay: number = transitionOptions.delay || 0;
    let frames: number = fps * duration;
    let loop: number = transitionOptions.loopMode || Animation.ANIMATIONLOOPMODE_CONSTANT;
    let ease: EasingFunction = transitionOptions.easingFunction || undefined;
    let wait: boolean = (transitionOptions.sequence ??= true);
    let onEnd: () => void = transitionOptions.onAnimationEnd || undefined;
    let animatable = Animation.CreateAndStartAnimation(
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
    animatable.pause();
    animatable.reset();
    let promise: Promise<Animatable> = animatable.waitAsync();
    selection.transitions[sequence].animatables.push(promise);
    if (sequence !== 0 && wait) await selection.transitions[Math.max(0, sequence - 1)].animatables[i];
    setTimeout(() => animatable.restart(), delay);
  });
}

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
    let accumulatedTime = 0;

    let animatable: Animatable = new Animatable(scene, node, undefined, undefined, undefined, undefined, onEnd);
    animatable.pause();
    let promise: Promise<Animatable> = animatable.waitAsync();
    this.transitions[sequence].animatables.push(promise);
    if (sequence !== 0 && wait) await this.transitions[Math.max(0, sequence - 1)].animatables[i];
    setTimeout(() => {
      let transition = scene.onBeforeRenderObservable.add(() => {
        if (startTime === null) startTime = performance.now();

        let elapsedTime = performance.now() - startTime;
        let lerpTime = Math.min(elapsedTime / duration, 1);

        func(ease ? ease.ease(lerpTime) : lerpTime);

        if (lerpTime === 1) {
          scene.onBeforeRenderObservable.remove(transition);
          animatable.stop();
        }
      });
    }, delay);
  });
  return this;
}
