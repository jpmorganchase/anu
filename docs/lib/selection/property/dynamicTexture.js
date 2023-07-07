import { Mesh, DynamicTexture } from '@babylonjs/core';
export function scaleDT(value) {
    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.material !== null) {
            let DT = node.material.diffuseTexture;
            DT instanceof DynamicTexture
                ? DT.scale(value instanceof Function ? value(node, i) : value)
                : console.log('Not a dynamic texture, skipping');
        }
    });
    return this;
}
export function scaleToDT(width, height) {
    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.material !== null) {
            let DT = node.material.diffuseTexture;
            DT instanceof DynamicTexture
                ? DT.scaleTo(width instanceof Function ? width(node, i) : width, height instanceof Function ? height(node, i) : height)
                : console.log('Not a dynamic texture, skipping');
        }
    });
    return this;
}
export function drawTextDT(text, font, x = null, y = null, color = null, clearColor = null) {
    this.selected.forEach((node, i) => {
        if (node instanceof Mesh && node.material !== null) {
            let DT = node.material.diffuseTexture;
            DT instanceof DynamicTexture
                ? DT.drawText(text instanceof Function ? text(node, i) : text, x instanceof Function ? x(node, i) : x, y instanceof Function ? y(node, i) : y, font instanceof Function ? font(node, i) : font, color instanceof Function ? color(node, i) : color, clearColor instanceof Function ? clearColor(node, i) : clearColor)
                : console.log('Not a dynamic texture, skipping');
        }
    });
    return this;
}
