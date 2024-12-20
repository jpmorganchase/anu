import { Animation, Scene, EasingFunction, Node} from '@babylonjs/core';
import { Selection } from '../index';
import get from 'lodash-es/get';
import hasIn from 'lodash-es/hasIn';



export type TransitionOptions = {
  duration: number;
  delay?: number;
  framePerSecond?: number,
  merge?: Boolean,
  easingFunction?: EasingFunction,
  onAnimationEnd?: () => void,
  scene?: Scene,
} 
| 
{
  framePerSecond: number,
  totalFrame: number,
  delay?: number;
  loopMode?: number,
  merge?: Boolean,
  easingFunction?: EasingFunction,
  onAnimationEnd?: () => void,
  scene?: Scene,
}


/**
 * Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.
 *
 * @param accessor The name of the property to be set (e.g. "renderingGroupId", "material.alpha").
 * @param value The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", mesh "m", and the index "i".
 * @returns The modified selection
 */
export function transition(this: Selection, options: TransitionOptions | ((d: any, n: Node, i: number) => TransitionOptions)){
  this.selected.forEach((node, i) => {
    this.setTransitionOptions(options instanceof Function ? options(node.metadata.data ??= {}, node, i) : options)
  });

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
        hasIn(node, accessor)
          ? Animation.CreateAndStartAnimation(node.name + '_animation', node, accessor, 1 , 1, get(node, accessor), value instanceof Function ? value(node.metadata.data ??= {}, node, i) : value)
          : console.error(accessor + ' not a property of ' + node);
      });
  }


