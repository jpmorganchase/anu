---
outline: deep
---

<script setup>
import { text } from '../../anu-examples/text.js'
//import singleView  from '../../vue_components/singleView.vue'
</script>

# Plane Text

## Overview

The Plane Text prefab enables rendering 2D text in Babylon.js by integrating the MSDF text renderer addon into the Anu API conveniently and efficiently. 
Plane Text can be created by calling [createPlaneText()](/api/modules.html#createplanetext), [create()](/api/modules.html#create), or [bind()](/api/modules.html#bind), returning a PlaneText node or [Selection](/api/classes/Selection.html). The default font is Roboto Regular. To use a different font, generate a texture atlas and json specification for your font using the [MSDF font generator](https://msdf-bmfont.donmccurdy.com/).

PlaneText features async initialization with a `ready` promise for safe integration with complex scenes, global font asset caching to optimize performance across multiple instances, efficient renderer batching to minimize draw calls, and enable/disable controls for lightweight visibility toggling without resource disposal.

## Usage

``` js
//With createPlaneText() returns PlaneText (extends TransformNode)
let planeText = anu.createPlaneText(name: string, options: {}, scene: Scene);

// Wait for async initialization to complete
await planeText.ready;

//updatePlaneText() will update the PlaneText with the specified options in a single pass
planeText.updatePlaneText(options: {});

//setters will update the PlaneText with the specified option after each call
planeText.text = string;
planeText.color = Color3.Red();
planeText.size = 2;

//enable/disable rendering without disposing resources
planeText.setEnabled(false);  // Hide text
planeText.setEnabled(true);   // Show text

//With create() returns PlaneText
let planeText = anu.create('planeText', name: string, scene: Scene, options: {}, data: {});

//Can update planeText object
planeText.updatePlaneText(options: {})

//With bind() returns Selection
let text = anu.bind('planeText', scene: Scene, options: {}, data: [{}]);

//Can call updatePlaneText() to update all in a Selection 
text.updatePlaneText(options: {})
```

## Options

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
|   text   | (string) text to be rendered | 'undefined' |
| font |   (json or URL) json spec of the MSDF text font, can be imported JSON object or URL string    |    roboto-regular.json |
| atlas |   (PNG or URL) texture atlas of the MSDF text font, can be imported image or URL string   |    roboto-regular.png |
| align |    (string) horizontal alignment of the text, either 'left', 'center', or 'right'    |    'center'    |
| vAlign |    (string) vertical alignment of the text, either 'top', 'middle', or 'bottom'    |    'middle'    |
| color |   (Color3) color value of the text   |    Color3.White() |
| strokeColor |   (Color3) color value of the text's stroke   |    Color3.Black() |
| strokeWidth |   (number) width of the text's stroke. Automatically splits into equal inset and outset widths.   |    0 |
| strokeInsetWidth |   (number) inner stroke width. Can be set independently or controlled via strokeWidth.   |    0 |
| strokeOutsetWidth |   (number) outer stroke width. Can be set independently or controlled via strokeWidth.   |    0 |
| strokeOpacity |   (number) opacity value of the stroke between 0 and 1   |    1 |
| opacity |   (number) opacity value of the text between 0 and 1   |    1 |
| size     |   (number) scaling factor to be applied to the PlaneText    |   1 |
| lineHeight |   (number) line height multiplier for multi-line text   |   1 |
| thicknessControl |   (number) controls the thickness of stroke rendering   |   0 |
| isBillboard |   (boolean) makes the text face the camera when true   |   false |
| isBillboardScreenProjected |   (boolean) makes the text face the camera with screen-space projection   |   false |
| ignoreDepthBuffer |   (boolean) renders the text on top of other objects when true   |   false |

## Methods and Properties 


| Property / Method      |      Description     |  
| ------------- | ------------- | 
|   ready  |  (Promise) resolves when the PlaneText is fully initialized and rendered  |
|   updatePlaneText(options)  |  updates the plane text with all the specified options in a single pass. Undeclared options will not be modified  |
|   text  |  (string) gets or sets the rendered text  |
|   font  |  (json or URL) gets or sets the json spec of the MSDF text font |
|   atlas  |  (PNG or URL) gets or sets the texture atlas of the MSDF text font |
|   align  |  (string) gets or sets the horizontal alignment of the text ('left', 'center', or 'right')  |
|   vAlign  |  (string) gets or sets the vertical alignment of the text ('top', 'middle', or 'bottom')  |
|   color  |  (Color3) gets or sets the color value of the text  |
|   strokeColor  |  (Color3) gets or sets the stroke color value of the text  |
|   strokeWidth  |  (number) gets or sets the stroke width value. Automatically splits width into equal inset/outset components  |
|   strokeInsetWidth  |  (number) gets or sets the inner stroke width independently  |
|   strokeOutsetWidth  |  (number) gets or sets the outer stroke width independently  |
|   strokeOpacity  |  (number) gets or sets the stroke opacity value between 0 and 1  |
|   opacity  |  (number) gets or sets the text opacity value between 0 and 1  |
|   size  |  (number) gets or sets the scaling factor  |
|   lineHeight  |  (number) gets or sets the line height multiplier for multi-line text  |
|   thicknessControl  |  (number) gets or sets the thickness control for stroke rendering  |
|   isBillboard  |  (boolean) gets or sets whether text faces the camera  |
|   isBillboardScreenProjected  |  (boolean) gets or sets whether text uses screen-space projection  |
|   ignoreDepthBuffer  |  (boolean) gets or sets whether text renders on top of other objects  |
|   setEnabled(enabled)  |  enables or disables rendering of the text without disposing resources  |
|   isEnabled()  |  returns the current enabled state of the text  |

## Examples

``` js
let options = {
    text: 'Hello World',
    color: Color3.Green()
}

let myText = anu.createPlaneText('myText', options, scene);

options.text = "Goodbye World";
options.color = Color3.Red();
options.size = 1.5;

scene.onPointerDown = (pointer) => myText.updatePlaneText(options);

scene.onPointerUp = (pointer) => myText.text = "Hello Again";
```

<singleView :scene="text" />


