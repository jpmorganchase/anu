import { Material, Color3, BaseTexture } from '@babylonjs/core';
import { Selection } from '../index';
/**
 * Sets the material on all meshes in the selection, non-meshes will be skipped.
 *
 * @param material A instance of the Material class or a function that returns a Material.
 * @returns The modified selection
 */
export declare function material(this: Selection, material: Material | ((d: any, i: number) => Material)): Selection;
/**
 * Sets the material diffuse color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export declare function diffuseColor(this: Selection, color: Color3 | ((d: any, i: number) => Color3)): Selection;
/**
 * Sets the material specular color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export declare function specularColor(this: Selection, color: Color3 | ((d: any, i: number) => Color3)): Selection;
/**
 * Sets the material emissive color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export declare function emissiveColor(this: Selection, color: Color3 | ((d: any, i: number) => Color3)): Selection;
/**
 * Sets the material ambient color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export declare function ambientColor(this: Selection, color: Color3 | ((d: any, i: number) => Color3)): Selection;
/**
 * Sets the material diffuse texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export declare function diffuseTexture(this: Selection, texture: BaseTexture | ((d: any, i: number) => BaseTexture)): Selection;
/**
 * Sets the material specular texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export declare function specularTexture(this: Selection, texture: BaseTexture | ((d: any, i: number) => BaseTexture)): Selection;
/**
 * Sets the material emissive texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export declare function emissiveTexture(this: Selection, texture: BaseTexture | ((d: any, i: number) => BaseTexture)): Selection;
/**
 * Sets the material ambient texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export declare function ambientTexture(this: Selection, texture: BaseTexture | ((d: any, i: number) => BaseTexture)): Selection;
