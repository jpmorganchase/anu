import { Animation, Scene, EasingFunction, Node } from '@babylonjs/core';
import { Selection } from '../index';
import get from 'lodash-es/get';
import hasIn from 'lodash-es/hasIn';
import { delay } from 'lodash-es';



export type TransitionOptions = {
  duration?: number; //done
  delay?: number; //done
  framePerSecond?: number, //done
  merge?: Boolean,
  easingFunction?: EasingFunction, //done
  loopMode?: 0 | 1 | 2 | 3 | 4, //done but bug?
  onAnimationEnd?: () => void
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
  this.setTransitionOptions(executedOptions)


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
      selection.selected.forEach((node, i) => {
        let transitionOptions: TransitionOptions = selection.transitionOptions[i];
        
        let duration = (transitionOptions.duration || 250) / 1000;

        let fps: number = transitionOptions.framePerSecond || 30;
        let delay: number = transitionOptions.delay || 0;
        let frames: number = fps * duration;
        let loop: number = transitionOptions.loopMode || Animation.ANIMATIONLOOPMODE_CONSTANT
        let ease: EasingFunction = transitionOptions.easingFunction || undefined;
        let merge: Boolean = transitionOptions.merge || true;
        let onEnd: () => void = transitionOptions.onAnimationEnd || undefined;
        
        setTimeout(() => { hasIn(node, accessor)
          ? (async () => {
            let animatable = Animation.CreateAndStartAnimation(node.name + '_animation', node, accessor, fps , frames, get(node, accessor), value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value, loop, ease, onEnd)
            let promise = animatable.waitAsync().then(() => {
              
            })
          })()
          : console.error(accessor + ' not a property of ' + node);
        }, delay)
      

      });
  }


