---
outline: deep
---
# Facet & Position UI

## Overview 
The Facet & Position UI prefab allows you to quickly attach position, rotation, and scale UI to elements in a selection. These prefabs use pointer down and out events and pointer behaviors to perform the interaction. The mesh based UI and behavior can be customized through the method options, or after creation via selection. We use pointer based interactions as it better supports multiple platforms and one handed interaction for better accessability. These methods are members of the Selection class and will create a UI for each node in a selection. As such, its recommended to call from root node selections

## Usage 

```js

let root = anu.bind("cot") // returns selections of one transform node

root.positionUI(options?: {})
    .rotationUI(options?: {})
    .scaleUI(options?: {})
```

## Options

### Position UI

| Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
| name | (string) name prefix for UI and UI parent | node.name + "PositionUI" |
| width | (number) the width of the capsule mesh | half the width of the parent node bounding box |
| radius | (number) the radius of the capsule mesh | 5% the width |
| position | (Vector3) the starting position of the capsule mesh | bottom front position of the parent node bounding box |
| offset | (Vector3) the offset from the starting position | 2.5 times the radius -y axis |
| material | (Material) the material of the capsule mesh | StandardMaterial |
| diffuseColor | (Color3 | Color4) the diffuse color of the material if not defined | White |
| visibility | (number) the visibility of the capsule 0-1 | 1 |
| behavior | (SixDofDragBehavior) the behavior attached to the parent node | SixDofDragBehavior forceCameraOnDragStart=true rotateAroundYOnly=true |
| billboard | (number) the billboard mode setting for the parent mesh | 0 |

### Rotation UI

 Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
| name | (string) name prefix for UI and UI parent | node.name + "RotationUI" |
| axis | ({x | y | z: boolean}) the axis to generate UI for  | {x: true, y: true, z: true} |
| diameter | (number) the diameter of the torus mesh | 5% the width of the parent node bounding box |
| thickness | (number) the thickness of the torus mesh | half the diameter |
| position | (Vector3) the starting position of the capsule mesh | bottom front position of the parent node bounding box |
| offset | (Vector3) the offset from the starting position | 2.5 times the radius + 2.5 times the diameter -y axis |
| material | (Material) the material of the torus mesh | StandardMaterial |
| diffuseColor | (Color3 | Color4) the diffuse color of the material if not defined | White |
| visibility | (number) the visibility of the torus 0-1 | 1 |
| billboard | (number) the billboard mode setting for the parent mesh | 0 |

### Scale UI

 Property       |      Value      |  Default |
| ------------- | ------------- | ------------- |
| name | (string) name prefix for UI and UI parent | node.name + "ScaleUI" |
| diameter | (number) the radius of the sphere mesh | 5% the width of the parent bounding box |
| position | (Vector3) the starting position of the sphere mesh | bottom front position of the parent node bounding box |
| offset | (Vector3) the offset from the starting position | 2.5 times the radius -y axis and the width of the hypothetical positionUI z axis|
| material | (Material) the material of the sphere mesh | StandardMaterial |
| diffuseColor | (Color3 | Color4) the diffuse color of the material if not defined | White |
| visibility | (number) the visibility of the sphere 0-1 | 1 |
| behavior | (PointerDragBehavior) the behavior attached to the parent node | PointerDragBehavior dragAxis (0,1,0) moveAttached=false |
| billboard | (number) the billboard mode setting for the parent mesh | 0 |
| minimum | (number) minimum scale factor | infinity |
| maximum | (number) maximum scale factor | infinity |

## Examples

<div style="width: 100%;">
    <iframe id="inlineFrameExample"
     allow="xr-spatial-tracking; camera"
        allowfullscreen=""
        title="Inline Frame Example"
        src="/anu/examples.html?example=facetposition">
    </iframe>
</div>

::: code-group
<<< @/../anu-examples/examples/Interactions/FacetPosition.js 
:::

