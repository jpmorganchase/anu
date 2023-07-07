import { Mesh } from '@babylonjs/core';
/**
 * Sets the material on all meshes in the selection, non-meshes will be skipped.
 *
 * @param material A instance of the Material class or a function that returns a Material.
 * @returns The modified selection
 */
export function material(material) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material = material instanceof Function ? material(node.metadata.data, i) : material)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material diffuse color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function diffuseColor(color) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.diffuseColor =
                color instanceof Function ? color(node.metadata.data, i) : color)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material specular color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function specularColor(color) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.specularColor =
                color instanceof Function ? color(node.metadata.data, i) : color)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material emissive color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function emissiveColor(color) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.emissiveColor =
                color instanceof Function ? color(node.metadata.data, i) : color)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material ambient color on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param color A instance of Color3 or a function that returns a Color3
 * @returns The modified selection
 */
export function ambientColor(color) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.ambientColor =
                color instanceof Function ? color(node.metadata.data, i) : color)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material diffuse texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function diffuseTexture(texture) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.diffuseTexture =
                texture instanceof Function ? texture(node.metadata.data, i) : texture)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material specular texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function specularTexture(texture) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.specularTexture =
                texture instanceof Function ? texture(node.metadata.data, i) : texture)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material emissive texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function emissiveTexture(texture) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.emissiveTexture =
                texture instanceof Function ? texture(node.metadata.data, i) : texture)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
/**
 * Sets the material ambient texture on all meshes in the selection, meshs without materials won't be affected.
 *
 * @param texture A instance of BaseTexture or a function that returns a BaseTexture
 * @returns The modified selection
 */
export function ambientTexture(texture) {
    this.selected.forEach((node, i) => {
        node instanceof Mesh
            ? (node.material.ambientTexture =
                texture instanceof Function ? texture(node.metadata.data, i) : texture)
            : console.log('Node not a mesh, skipping.');
    });
    return this;
}
