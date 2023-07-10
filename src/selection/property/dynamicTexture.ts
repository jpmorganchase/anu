// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, StandardMaterial, DynamicTexture } from '@babylonjs/core';
import { Selection } from '../index';
import { fromPairs } from 'lodash-es';

export function scaleDT(this: Selection, value: number | ((d: any, i: number) => number)) {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.material !== null) {
      let DT = (<StandardMaterial>node.material).diffuseTexture;
      DT instanceof DynamicTexture
        ? DT.scale(value instanceof Function ? value(node, i) : value)
        : console.log('Not a dynamic texture, skipping');
    }
  });
  return this;
}

export function scaleToDT(
  this: Selection,
  width: number | ((d: any, i: number) => number),
  height: number | ((d: any, i: number) => number),
) {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.material !== null) {
      let DT = (<StandardMaterial>node.material).diffuseTexture;
      DT instanceof DynamicTexture
        ? DT.scaleTo(
            width instanceof Function ? width(node, i) : width,
            height instanceof Function ? height(node, i) : height,
          )
        : console.log('Not a dynamic texture, skipping');
    }
  });
  return this;
}

export function drawTextDT(
  this: Selection,
  text: string | ((d: any, i: number) => string),
  font: string | ((d: any, i: number) => string),
  x: number | ((d: any, i: number) => number) | null = null,
  y: number | ((d: any, i: number) => number) | null = null,
  color: string | ((d: any, i: number) => string) | null = null,
  clearColor: string | ((d: any, i: number) => string) | null = null,
) {
  this.selected.forEach((node, i) => {
    if (node instanceof Mesh && node.material !== null) {
      let DT = (<StandardMaterial>node.material).diffuseTexture;
      DT instanceof DynamicTexture
        ? DT.drawText(
            text instanceof Function ? text(node, i) : text,
            x instanceof Function ? x(node, i) : x,
            y instanceof Function ? y(node, i) : y,
            font instanceof Function ? font(node, i) : font,
            color instanceof Function ? color(node, i) : color,
            clearColor instanceof Function ? clearColor(node, i) : clearColor,
          )
        : console.log('Not a dynamic texture, skipping');
    }
  });
  return this;
}
