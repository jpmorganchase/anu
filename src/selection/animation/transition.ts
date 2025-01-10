import { Animation, Scene, EasingFunction, Node, Animatable, Tools } from '@babylonjs/core';
import { Selection } from '../index';
import get from 'lodash-es/get';
import hasIn from 'lodash-es/hasIn';


export type TransitionOptions = {
  duration?: number; //done
  delay?: number; //done
  framePerSecond?: number, //done
  sequence?: boolean,
  easingFunction?: EasingFunction, //done
  loopMode?: 0 | 1 | 2 | 3 | 4, //done but bug?
  onAnimationEnd?: () => void
} 

export class Transition {
  sequence: number;
  transitionOptions: TransitionOptions[];
  animatables?: Promise<Animatable>[];

  constructor(sequence: number, transitionOptions: TransitionOptions[]){
    this.sequence = sequence;
    this.transitionOptions = transitionOptions;
    this.animatables = [];
  }

  
}



/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", mesh "m", and the index "i".
 * @returns The modified selection
 */
export function transition(this: Selection, options: TransitionOptions | ((d: any, n: Node, i: number) => TransitionOptions)){
  let executedOptions = new Array<TransitionOptions>();
  this.selected.forEach((node, i) => {
    executedOptions.push(options instanceof Function ? options(node.metadata.data ??= {}, node, i) : options || {})
  });
  
  let transition = new Transition(this.transitions.length, executedOptions);
  this.updateTransitions(transition);

  return this;
}


/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", mesh "m", and the index "i".
 * @returns The modified selection
 */
export function createTransition(selection: Selection, accessor: string, value: any) {
      let sequence = selection.transitions.length - 1; 
      selection.selected.forEach(async (node, i) => {
        let transitionOptions: TransitionOptions = selection.transitions[sequence].transitionOptions[i];
        let duration = (transitionOptions.duration || 250) / 1000;
        let fps: number = transitionOptions.framePerSecond || 30;
        let delay: number = transitionOptions.delay || 0;
        let frames: number = fps * duration;
        let loop: number = transitionOptions.loopMode || Animation.ANIMATIONLOOPMODE_CONSTANT
        let ease: EasingFunction = transitionOptions.easingFunction || undefined;
        let wait: boolean = transitionOptions.sequence ??= true;
        let onEnd: () => void = transitionOptions.onAnimationEnd || undefined;
        let animatable = Animation.CreateAndStartAnimation(node.name + '_animation', node, accessor, fps , frames, get(node, accessor), value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value, loop, ease, onEnd)
        animatable.pause();
        animatable.reset();
        let promise: Promise<Animatable> = animatable.waitAsync()
        selection.transitions[sequence].animatables.push(promise)
        if (sequence !== 0 && wait) await selection.transitions[Math.max(0, sequence - 1)].animatables[i];
        setTimeout(() => animatable.restart(), delay);
      });
  }

/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", mesh "m", and the index "i".
 * @returns The modified selection
 */
export function tween(this: Selection, value: (d,n,i) => (t) => void) {
  let sequence = this.transitions.length - 1; 
  let scene = this.scene;
  this.selected.forEach(async (node, i) => {
    let transitionOptions: TransitionOptions = this.transitions[sequence].transitionOptions[i];
    let duration = (transitionOptions.duration || 250);
    let fps: number = transitionOptions.framePerSecond || 30;
    let delay: number = transitionOptions.delay || 0;
    let frames: number = fps * duration;
    let loop: number = transitionOptions.loopMode || Animation.ANIMATIONLOOPMODE_CONSTANT
    let ease: EasingFunction = transitionOptions.easingFunction || undefined;
    let wait: boolean = transitionOptions.sequence ??= true;
    let onEnd: () => void = transitionOptions.onAnimationEnd || undefined;
    let func = value(node.metadata.data ??= {}, node, i);
   

    // Variables to control the movement
    let startTime = null;

  
    // Register a function to be called before each render
    let transition = scene.onBeforeRenderObservable.add(() => {
        if (startTime === null) {
            startTime = performance.now();
        }
    
        // Calculate the elapsed time
        var elapsedTime = performance.now() - startTime;
    
        // Calculate the fraction of the duration that has passed
        var fraction = Math.min(elapsedTime / duration, 1);
    
        // Update the box's position
        func(fraction)
    
        // Stop updating after the duration has passed
        if (fraction === 1) {
            scene.onBeforeRenderObservable.remove(transition);
        }
    });
    
  

  });
}
  
  
  
  



