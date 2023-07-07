import { Material, Color3, BaseTexture, Node } from '@babylonjs/core';
import { Selection } from '../index';

/**
 * Sets the material on all meshes in the selection, non-meshes will be skipped.
 *
 * @param material A instance of the Material class or a function that returns a Material.
 * @returns The modified selection
 */
export function material(this: Selection, material: Material | ((d: any, n: Node, i: number) => Material)) {
  this.prop('material', material);
  return this;
}

/**
 * Sets the material diffuse color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function diffuseColor(this: Selection, color: Color3 | ((d: any, node: Node, i: number) => Color3)) {
  this.prop('material.diffuseColor', color);
  return this;
}

/**
 * Sets the material specular color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function specularColor(this: Selection, color: Color3 | ((d: any, n: Node, i: number) => Color3)) {
  this.prop('material.specularColor', color);
  return this;
}

/**
 * Sets the material emissive color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function emissiveColor(this: Selection, color: Color3 | ((d: any, n: Node, i: number) => Color3)) {
  this.prop('material.emissiveColor', color);
  return this;
}

/**
 * Sets the material ambient color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function ambientColor(this: Selection, color: Color3 | ((d: any, n: Node, i: number) => Color3)) {
  this.prop('material.ambientColor', color);
  return this;
}

/**
 * Sets the material diffuse texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function diffuseTexture(this: Selection, texture: BaseTexture | ((d: any, n: Node, i: number) => BaseTexture)) {
  this.prop('material.diffuseTexture', texture);
  return this;
}

/**
 * Sets the material specular texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function specularTexture(this: Selection, texture: BaseTexture | ((d: any, n: Node, i: number) => BaseTexture)) {
  this.prop('material.specularTexture', texture);
  return this;
}

/**
 * Sets the material emissive texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function emissiveTexture(this: Selection, texture: BaseTexture | ((d: any, n: Node, i: number) => BaseTexture)) {
  this.prop('material.emissiveTexture', texture);
  return this;
}

/**
 * Sets the material ambient texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function ambientTexture(this: Selection, texture: BaseTexture | ((d: any, n: Node, i: number) => BaseTexture)) {
  this.prop('material.ambientTexture', texture);
  return this;
}
