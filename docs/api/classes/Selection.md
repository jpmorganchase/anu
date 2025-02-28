[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / Selection

# Class: Selection

## Table of contents

### Constructors

- [constructor](Selection.md#constructor)

### Properties

- [action](Selection.md#action)
- [addTags](Selection.md#addtags)
- [ambientColor](Selection.md#ambientcolor)
- [ambientTexture](Selection.md#ambienttexture)
- [attr](Selection.md#attr)
- [bind](Selection.md#bind)
- [bindInstance](Selection.md#bindinstance)
- [bindThinInstance](Selection.md#bindthininstance)
- [boundingBox](Selection.md#boundingbox)
- [diffuseColor](Selection.md#diffusecolor)
- [diffuseTexture](Selection.md#diffusetexture)
- [dispose](Selection.md#dispose)
- [drawTextDT](Selection.md#drawtextdt)
- [emissiveColor](Selection.md#emissivecolor)
- [emissiveTexture](Selection.md#emissivetexture)
- [filter](Selection.md#filter)
- [get](Selection.md#get)
- [hasTags](Selection.md#hastags)
- [id](Selection.md#id)
- [material](Selection.md#material)
- [metadata](Selection.md#metadata)
- [name](Selection.md#name)
- [position](Selection.md#position)
- [positionUI](Selection.md#positionui)
- [positionX](Selection.md#positionx)
- [positionY](Selection.md#positiony)
- [positionZ](Selection.md#positionz)
- [prop](Selection.md#prop)
- [props](Selection.md#props)
- [registerInstancedBuffer](Selection.md#registerinstancedbuffer)
- [removeTags](Selection.md#removetags)
- [rotateUI](Selection.md#rotateui)
- [rotation](Selection.md#rotation)
- [rotationX](Selection.md#rotationx)
- [rotationY](Selection.md#rotationy)
- [rotationZ](Selection.md#rotationz)
- [run](Selection.md#run)
- [scaleDT](Selection.md#scaledt)
- [scaleToDT](Selection.md#scaletodt)
- [scaleUI](Selection.md#scaleui)
- [scaling](Selection.md#scaling)
- [scalingX](Selection.md#scalingx)
- [scalingY](Selection.md#scalingy)
- [scalingZ](Selection.md#scalingz)
- [scene](Selection.md#scene)
- [select](Selection.md#select)
- [selectData](Selection.md#selectdata)
- [selectId](Selection.md#selectid)
- [selectName](Selection.md#selectname)
- [selectTag](Selection.md#selecttag)
- [selected](Selection.md#selected)
- [setInstancedBuffer](Selection.md#setinstancedbuffer)
- [specularColor](Selection.md#specularcolor)
- [specularTexture](Selection.md#speculartexture)
- [thinInstanceAttributeAt](Selection.md#thininstanceattributeat)
- [thinInstanceColor](Selection.md#thininstancecolor)
- [thinInstanceColorAt](Selection.md#thininstancecolorat)
- [thinInstanceColorFor](Selection.md#thininstancecolorfor)
- [thinInstanceMatrixAt](Selection.md#thininstancematrixat)
- [thinInstanceMatrixFor](Selection.md#thininstancematrixfor)
- [thinInstancePosition](Selection.md#thininstanceposition)
- [thinInstancePositionAt](Selection.md#thininstancepositionat)
- [thinInstancePositionFor](Selection.md#thininstancepositionfor)
- [thinInstanceRegisterAttribute](Selection.md#thininstanceregisterattribute)
- [thinInstanceRotation](Selection.md#thininstancerotation)
- [thinInstanceRotationAt](Selection.md#thininstancerotationat)
- [thinInstanceRotationFor](Selection.md#thininstancerotationfor)
- [thinInstanceScaling](Selection.md#thininstancescaling)
- [thinInstanceScalingAt](Selection.md#thininstancescalingat)
- [thinInstanceScalingFor](Selection.md#thininstancescalingfor)
- [thinInstanceSetAttribute](Selection.md#thininstancesetattribute)
- [thinInstanceSetBuffer](Selection.md#thininstancesetbuffer)
- [transition](Selection.md#transition)
- [transitions](Selection.md#transitions)
- [translate](Selection.md#translate)
- [tween](Selection.md#tween)

### Methods

- [updateTransitions](Selection.md#updatetransitions)

## Constructors

### constructor

• **new Selection**(`nodes`, `scene?`): [`Selection`](Selection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `Mesh`[] \| `AbstractMesh`[] \| `TransformNode`[] \| `Node`[] |
| `scene?` | `Scene` |

#### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:68](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L68)

## Properties

### action

• **action**: (`this`: [`Selection`](Selection.md), `action`: `Action` \| (`d`: `any`, `n`: `AbstractMesh`, `i`: `number`) => `Action`) => [`Selection`](Selection.md) = `action`

#### Type declaration

▸ (`this`, `action`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `action` | `Action` \| (`d`: `any`, `n`: `AbstractMesh`, `i`: `number`) => `Action` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:104](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L104)

___

### addTags

• **addTags**: (`this`: [`Selection`](Selection.md), `tags`: `string` \| (`d`: `any`, `i`: `number`) => `string`) => [`Selection`](Selection.md) = `addTags`

#### Type declaration

▸ (`this`, `tags`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `tags` | `string` \| (`d`: `any`, `i`: `number`) => `string` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:101](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L101)

___

### ambientColor

• **ambientColor**: (`this`: [`Selection`](Selection.md), `color`: `Color3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color3`) => [`Selection`](Selection.md) = `ambientColor`

#### Type declaration

▸ (`this`, `color`): [`Selection`](Selection.md)

Sets the material ambient color on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `color` | `Color3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color3` | A instance of Color3 or a function that returns a Color3 |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:109](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L109)

___

### ambientTexture

• **ambientTexture**: (`this`: [`Selection`](Selection.md), `texture`: `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture`) => [`Selection`](Selection.md) = `ambientTexture`

#### Type declaration

▸ (`this`, `texture`): [`Selection`](Selection.md)

Sets the material ambient texture on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `texture` | `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture` | A instance of BaseTexture or a function that returns a BaseTexture |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:116](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L116)

___

### attr

• **attr**: (`this`: [`Selection`](Selection.md), `accessor`: `string`, `value`: `any`) => [`Selection`](Selection.md) = `attr`

#### Type declaration

▸ (`this`, `accessor`, `value`): [`Selection`](Selection.md)

Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `accessor` | `string` | The name of the property to be set (e.g. "renderingGroupId", "material.alpha"). |
| `value` | `any` | The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", mesh "m", and the index "i". |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:100](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L100)

___

### bind

• **bind**: \<MeshType\>(`this`: [`Selection`](Selection.md), `shape`: `MeshType`, `options`: `Property`\<`MeshTypes`, `MeshType`\>, `data`: `object`[]) => [`Selection`](Selection.md) = `bind`

#### Type declaration

▸ \<`MeshType`\>(`this`, `shape`, `options?`, `data?`): [`Selection`](Selection.md)

Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parent.
The data index of the mesh is also attached to the mesh node object under the metadata property.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `MeshType` | extends keyof `MeshTypes` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `shape` | `MeshType` | A string of the type of the mesh geometry being created. |
| `options` | `Property`\<`MeshTypes`, `MeshType`\> | A object containing the initial mesh parameters for the selected geometry, can be either values or functions. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |

##### Returns

[`Selection`](Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/selection/index.ts:83](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L83)

___

### bindInstance

• **bindInstance**: (`this`: [`Selection`](Selection.md), `mesh`: `Mesh`, `data`: `object`[]) => [`Selection`](Selection.md) = `bindInstance`

#### Type declaration

▸ (`this`, `mesh`, `data?`): [`Selection`](Selection.md)

Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parent.
The data index of the mesh is also attached to the mesh node object under the metadata property.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `mesh` | `Mesh` | The mesh to create instances from. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |

##### Returns

[`Selection`](Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/selection/index.ts:85](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L85)

___

### bindThinInstance

• **bindThinInstance**: (`this`: [`Selection`](Selection.md), `mesh`: `Mesh`, `data`: `object`[]) => [`Selection`](Selection.md) = `bindThinInstance`

#### Type declaration

▸ (`this`, `mesh`, `data?`): [`Selection`](Selection.md)

Take a selection, a mesh, and data. For each index in the data create a new mesh for each node in the selection as the parent.
The data index of the mesh is also attached to the mesh node object under the metadata property.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `mesh` | `Mesh` | The mesh to create instances from. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |

##### Returns

[`Selection`](Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/selection/index.ts:148](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L148)

___

### boundingBox

• **boundingBox**: (`this`: [`Selection`](Selection.md), `exclude`: `string`) => `BoundingInfo` = `boundingBox`

#### Type declaration

▸ (`this`, `exclude?`): `BoundingInfo`

Calculates the cumulative bounding box of the current selection.

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `exclude` | `string` | `''` |

##### Returns

`BoundingInfo`

instance of BoundingInfo class, an object containing all bounding box values.

#### Defined in

[src/selection/index.ts:120](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L120)

___

### diffuseColor

• **diffuseColor**: (`this`: [`Selection`](Selection.md), `color`: `Color3` \| (`d`: `any`, `node`: `Node`, `i`: `number`) => `Color3`) => [`Selection`](Selection.md) = `diffuseColor`

#### Type declaration

▸ (`this`, `color`): [`Selection`](Selection.md)

Sets the material diffuse color on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `color` | `Color3` \| (`d`: `any`, `node`: `Node`, `i`: `number`) => `Color3` | A instance of Color3 or a function that returns a Color3 |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:106](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L106)

___

### diffuseTexture

• **diffuseTexture**: (`this`: [`Selection`](Selection.md), `texture`: `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture`) => [`Selection`](Selection.md) = `diffuseTexture`

#### Type declaration

▸ (`this`, `texture`): [`Selection`](Selection.md)

Sets the material diffuse texture on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `texture` | `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture` | A instance of BaseTexture or a function that returns a BaseTexture |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:113](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L113)

___

### dispose

• **dispose**: (`this`: [`Selection`](Selection.md), `filter?`: (`d`: `any`, `i`: `number`) => `Boolean`) => [`Selection`](Selection.md) = `dispose`

#### Type declaration

▸ (`this`, `filter?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `filter?` | (`d`: `any`, `i`: `number`) => `Boolean` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:112](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L112)

___

### drawTextDT

• **drawTextDT**: (`this`: [`Selection`](Selection.md), `text`: `string` \| (`d`: `any`, `i`: `number`) => `string`, `font`: `string` \| (`d`: `any`, `i`: `number`) => `string`, `x`: `number` \| (`d`: `any`, `i`: `number`) => `number`, `y`: `number` \| (`d`: `any`, `i`: `number`) => `number`, `color`: `string` \| (`d`: `any`, `i`: `number`) => `string`, `clearColor`: `string` \| (`d`: `any`, `i`: `number`) => `string`) => [`Selection`](Selection.md) = `drawTextDT`

#### Type declaration

▸ (`this`, `text`, `font`, `x?`, `y?`, `color?`, `clearColor?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `text` | `string` \| (`d`: `any`, `i`: `number`) => `string` | `undefined` |
| `font` | `string` \| (`d`: `any`, `i`: `number`) => `string` | `undefined` |
| `x` | `number` \| (`d`: `any`, `i`: `number`) => `number` | `null` |
| `y` | `number` \| (`d`: `any`, `i`: `number`) => `number` | `null` |
| `color` | `string` \| (`d`: `any`, `i`: `number`) => `string` | `null` |
| `clearColor` | `string` \| (`d`: `any`, `i`: `number`) => `string` | `null` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:119](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L119)

___

### emissiveColor

• **emissiveColor**: (`this`: [`Selection`](Selection.md), `color`: `Color3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color3`) => [`Selection`](Selection.md) = `emissiveColor`

#### Type declaration

▸ (`this`, `color`): [`Selection`](Selection.md)

Sets the material emissive color on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `color` | `Color3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color3` | A instance of Color3 or a function that returns a Color3 |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:108](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L108)

___

### emissiveTexture

• **emissiveTexture**: (`this`: [`Selection`](Selection.md), `texture`: `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture`) => [`Selection`](Selection.md) = `emissiveTexture`

#### Type declaration

▸ (`this`, `texture`): [`Selection`](Selection.md)

Sets the material emissive texture on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `texture` | `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture` | A instance of BaseTexture or a function that returns a BaseTexture |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:115](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L115)

___

### filter

• **filter**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean`) => [`Selection`](Selection.md) = `filter`

#### Type declaration

▸ (`this`, `method`): [`Selection`](Selection.md)

Filters a seclection based on the function provided

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `method` | (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean` | A function with two parameters d (the binded data) and i (the index) that returns a boolean. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:121](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L121)

___

### get

• **get**: (`this`: [`Selection`](Selection.md), `accessor`: `string`) => `Object`[] = `get`

#### Type declaration

▸ (`this`, `accessor`): `Object`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `accessor` | `string` |

##### Returns

`Object`[]

#### Defined in

[src/selection/index.ts:99](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L99)

___

### hasTags

• **hasTags**: (`this`: [`Selection`](Selection.md), `query?`: `string`) => `Object`[] = `hasTags`

#### Type declaration

▸ (`this`, `query?`): `Object`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `query?` | `string` |

##### Returns

`Object`[]

#### Defined in

[src/selection/index.ts:103](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L103)

___

### id

• **id**: (`this`: [`Selection`](Selection.md), `id`: `string` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `string`) => [`Selection`](Selection.md) = `id`

#### Type declaration

▸ (`this`, `id`): [`Selection`](Selection.md)

Sets the id on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `id` | `string` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `string` | A string or a function that returns a string |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:125](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L125)

___

### material

• **material**: (`this`: [`Selection`](Selection.md), `material`: `Material` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Material`) => [`Selection`](Selection.md) = `material`

#### Type declaration

▸ (`this`, `material`): [`Selection`](Selection.md)

Sets the material on all meshes in the selection, non-meshes will be skipped.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `material` | `Material` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Material` | A instance of the Material class or a function that returns a Material. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:105](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L105)

___

### metadata

• **metadata**: (`this`: [`Selection`](Selection.md), `key`: `string`, `value`: {} \| (`d`: `any`, `n`: `Node`, `i`: `number`) => {}) => [`Selection`](Selection.md) = `metadata`

#### Type declaration

▸ (`this`, `key`, `value`): [`Selection`](Selection.md)

Adds to the metadata on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `key` | `string` | A string to be the key for your object inside node.metadata |
| `value` | {} \| (`d`: `any`, `n`: `Node`, `i`: `number`) => {} | An object or a function that returns an object |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:126](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L126)

___

### name

• **name**: (`this`: [`Selection`](Selection.md), `name`: `string` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `string`) => [`Selection`](Selection.md) = `name`

#### Type declaration

▸ (`this`, `name`): [`Selection`](Selection.md)

Sets the Name on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `name` | `string` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `string` | A string or a function that returns a string |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:124](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L124)

___

### position

• **position**: (`this`: [`Selection`](Selection.md), `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `position`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the XYZ position on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` | A instance of Vector3 or a function that returns a Vector3 |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:86](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L86)

___

### positionUI

• **positionUI**: (`this`: [`Selection`](Selection.md), `options`: `positionUIOptions`) => [`Selection`](Selection.md) = `positionUI`

#### Type declaration

▸ (`this`, `options?`): [`Selection`](Selection.md)

Take a selection, for each node in the selection attach UI elements that provide positioning behavior

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `options` | `positionUIOptions` | The associated options for this prefab. |

##### Returns

[`Selection`](Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/selection/index.ts:127](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L127)

___

### positionX

• **positionX**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `positionX`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the X position on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:87](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L87)

___

### positionY

• **positionY**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `positionY`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the Y position on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:88](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L88)

___

### positionZ

• **positionZ**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `positionZ`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the Z position on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:89](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L89)

___

### prop

• **prop**: (`this`: [`Selection`](Selection.md), `accessor`: `string`, `value`: `any`) => [`Selection`](Selection.md) = `prop`

#### Type declaration

▸ (`this`, `accessor`, `value`): [`Selection`](Selection.md)

Called from a selection this method allows you to set any property or subproperty of nodes in the selection given that property exists.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `accessor` | `string` | The name of the property to be set (e.g. "renderingGroupId", "material.alpha"). |
| `value` | `any` | The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", mesh "m", and the index "i". |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:123](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L123)

___

### props

• **props**: (`this`: [`Selection`](Selection.md), `properties`: {}) => [`Selection`](Selection.md) = `props`

#### Type declaration

▸ (`this`, `properties`): [`Selection`](Selection.md)

Called from a selection this method allows you to set multiple properties or subproperties of nodes in the selection given that property exists.
Use this method to improve performance when setting or changing many properties.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `properties` | `Object` | Object of key value pairs for the properties to be set or changed, e.g., {\"renderingGroupId": 2, "material.alpha": 0.2}. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:122](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L122)

___

### registerInstancedBuffer

• **registerInstancedBuffer**: (`this`: [`Selection`](Selection.md), `attr`: `string`, `size`: `number`) => [`Selection`](Selection.md) = `registerInstancedBuffer`

#### Type declaration

▸ (`this`, `attr`, `size`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `attr` | `string` |
| `size` | `number` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:110](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L110)

___

### removeTags

• **removeTags**: (`this`: [`Selection`](Selection.md), `tags`: `string`) => [`Selection`](Selection.md) = `removeTags`

#### Type declaration

▸ (`this`, `tags`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `tags` | `string` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:102](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L102)

___

### rotateUI

• **rotateUI**: (`this`: [`Selection`](Selection.md), `options`: `rotateUIOptions`) => [`Selection`](Selection.md) = `rotateUI`

#### Type declaration

▸ (`this`, `options?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `options` | `rotateUIOptions` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:129](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L129)

___

### rotation

• **rotation**: (`this`: [`Selection`](Selection.md), `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `rotation`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the XYZ rotation in raidians on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` | A instance of Vector3 or a function that returns a Vector3 |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:91](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L91)

___

### rotationX

• **rotationX**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `rotationX`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the X rotation in radians on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:92](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L92)

___

### rotationY

• **rotationY**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `rotationY`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the Y rotation in radians on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:93](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L93)

___

### rotationZ

• **rotationZ**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `rotationZ`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the Z rotation in radians on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:94](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L94)

___

### run

• **run**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `node`: `Node`, `i`: `number`) => `any`) => [`Selection`](Selection.md) = `run`

#### Type declaration

▸ (`this`, `method`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `method` | (`d`: `any`, `node`: `Node`, `i`: `number`) => `any` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:84](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L84)

___

### scaleDT

• **scaleDT**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `scaleDT`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `value` | `number` \| (`d`: `any`, `i`: `number`) => `number` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:117](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L117)

___

### scaleToDT

• **scaleToDT**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `scaleDT`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `value` | `number` \| (`d`: `any`, `i`: `number`) => `number` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:118](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L118)

___

### scaleUI

• **scaleUI**: (`this`: [`Selection`](Selection.md), `options`: `scaleUIOptions`) => [`Selection`](Selection.md) = `scaleUI`

#### Type declaration

▸ (`this`, `options?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `options` | `scaleUIOptions` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:128](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L128)

___

### scaling

• **scaling**: (`this`: [`Selection`](Selection.md), `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `scaling`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the XYZ scaling on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` | A instance of Vector3 or a function that returns a Vector3 |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:95](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L95)

___

### scalingX

• **scalingX**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `scalingX`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the X scaling on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:96](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L96)

___

### scalingY

• **scalingY**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `scalingY`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the Y scaling on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:97](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L97)

___

### scalingZ

• **scalingZ**: (`this`: [`Selection`](Selection.md), `value`: `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number`) => [`Selection`](Selection.md) = `scalingZ`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Sets the Z scaling on all nodes in the selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | `number` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `number` | A number or a function that returns a number. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:98](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L98)

___

### scene

• `Optional` **scene**: `Scene`

#### Defined in

[src/selection/index.ts:65](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L65)

___

### select

• **select**: (`this`: [`Selection`](Selection.md), `name`: `string`) => [`Selection`](Selection.md) = `select`

#### Type declaration

▸ (`this`, `name`): [`Selection`](Selection.md)

Select all nodes from the children graph(s) of selected
matching the indicator and return it as a instance of Selection.

selection types;
.\<Name> : select by Name
#\<ID> : select by ID
$\<Tags> : select by tags

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `name` | `string` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:78](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L78)

___

### selectData

• **selectData**: (`this`: [`Selection`](Selection.md), `key`: `string` \| `string`[], `value`: `string` \| `number` \| `string`[] \| `number`[], `useAndLogic?`: `boolean`) => [`Selection`](Selection.md) = `selectData`

#### Type declaration

▸ (`this`, `key`, `value`, `useAndLogic?`): [`Selection`](Selection.md)

Select nodes from the children graph(s) of a selection by key value pairs or list of key value pairs and return them as a instance of Selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `key` | `string` \| `string`[] | A string or array of strings of the keys to be searched. |
| `value` | `string` \| `number` \| `string`[] \| `number`[] | - |
| `useAndLogic?` | `boolean` | If true, all keys and values must exist and match to be selected. Defaults to false. |

##### Returns

[`Selection`](Selection.md)

A new instance of Selection with the selected nodes.

#### Defined in

[src/selection/index.ts:82](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L82)

___

### selectId

• **selectId**: (`this`: [`Selection`](Selection.md), `id`: `string` \| `string`[]) => [`Selection`](Selection.md) = `selectId`

#### Type declaration

▸ (`this`, `id`): [`Selection`](Selection.md)

Select nodes from the children graph(s) of a selection by ID or list of IDs and return them as a instance of Selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `id` | `string` \| `string`[] | A string or array of strings of ids of nodes to be selected. |

##### Returns

[`Selection`](Selection.md)

A new instance of Selection with the selected nodes.

#### Defined in

[src/selection/index.ts:80](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L80)

___

### selectName

• **selectName**: (`this`: [`Selection`](Selection.md), `name`: `string` \| `string`[]) => [`Selection`](Selection.md) = `selectName`

#### Type declaration

▸ (`this`, `name`): [`Selection`](Selection.md)

Select nodes from the children graph(s) of a selection by name or list of names and return them as a instance of Selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `name` | `string` \| `string`[] | A string or array of strings of the names of the nodes to be selected. |

##### Returns

[`Selection`](Selection.md)

A new instance of Selection with the selected nodes.

#### Defined in

[src/selection/index.ts:79](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L79)

___

### selectTag

• **selectTag**: (`this`: [`Selection`](Selection.md), `tag`: `string` \| `string`[]) => [`Selection`](Selection.md) = `selectTag`

#### Type declaration

▸ (`this`, `tag`): [`Selection`](Selection.md)

Select nodes from the children graph(s) of a selection by tag or list of tags and return them as a instance of Selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `tag` | `string` \| `string`[] | A string or array of strings of tags or tag unions of nodes to be selected. |

##### Returns

[`Selection`](Selection.md)

A new instance of Selection with the selected nodes.

#### Defined in

[src/selection/index.ts:81](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L81)

___

### selected

• **selected**: `Mesh`[] \| `AbstractMesh`[] \| `TransformNode`[] \| `Node`[]

#### Defined in

[src/selection/index.ts:64](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L64)

___

### setInstancedBuffer

• **setInstancedBuffer**: (`this`: [`Selection`](Selection.md), `attr`: `string`, `value`: `any`) => [`Selection`](Selection.md) = `setInstancedBuffer`

#### Type declaration

▸ (`this`, `attr`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `attr` | `string` |
| `value` | `any` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:111](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L111)

___

### specularColor

• **specularColor**: (`this`: [`Selection`](Selection.md), `color`: `Color3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color3`) => [`Selection`](Selection.md) = `specularColor`

#### Type declaration

▸ (`this`, `color`): [`Selection`](Selection.md)

Sets the material specular color on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `color` | `Color3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color3` | A instance of Color3 or a function that returns a Color3 |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:107](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L107)

___

### specularTexture

• **specularTexture**: (`this`: [`Selection`](Selection.md), `texture`: `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture`) => [`Selection`](Selection.md) = `specularTexture`

#### Type declaration

▸ (`this`, `texture`): [`Selection`](Selection.md)

Sets the material specular texture on all meshes in the selection, meshs without materials won't be affected.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `texture` | `BaseTexture` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `BaseTexture` | A instance of BaseTexture or a function that returns a BaseTexture |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

[src/selection/index.ts:114](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L114)

___

### thinInstanceAttributeAt

• **thinInstanceAttributeAt**: (`this`: [`Selection`](Selection.md), `attribute`: `string`, `index`: `number`, `value`: `any`) => [`Selection`](Selection.md) = `thinInstanceAttributeAt`

#### Type declaration

▸ (`this`, `attribute`, `index`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `attribute` | `string` |
| `index` | `number` |
| `value` | `any` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:136](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L136)

___

### thinInstanceColor

• **thinInstanceColor**: (`this`: [`Selection`](Selection.md), `value`: `Color4` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color4`, `staticBuffer`: `boolean`) => [`Selection`](Selection.md) = `thinInstanceColor`

#### Type declaration

▸ (`this`, `value`, `staticBuffer?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `value` | `Color4` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color4` | `undefined` |
| `staticBuffer` | `boolean` | `false` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:134](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L134)

___

### thinInstanceColorAt

• **thinInstanceColorAt**: (`this`: [`Selection`](Selection.md), `index`: `number`, `value`: `Color4` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color4`) => [`Selection`](Selection.md) = `thinInstanceColorAt`

#### Type declaration

▸ (`this`, `index`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `index` | `number` |
| `value` | `Color4` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color4` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:143](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L143)

___

### thinInstanceColorFor

• **thinInstanceColorFor**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean`, `value`: `Color4` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color4`) => [`Selection`](Selection.md) = `thinInstanceColorFor`

#### Type declaration

▸ (`this`, `method`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `method` | (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean` |
| `value` | `Color4` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Color4` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:147](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L147)

___

### thinInstanceMatrixAt

• **thinInstanceMatrixAt**: (`this`: [`Selection`](Selection.md), `index`: `number`, `value`: `Matrix` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Matrix`) => [`Selection`](Selection.md) = `thinInstanceMatrixAt`

#### Type declaration

▸ (`this`, `index`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `index` | `number` |
| `value` | `Matrix` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Matrix` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:138](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L138)

___

### thinInstanceMatrixFor

• **thinInstanceMatrixFor**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean`, `value`: `Matrix` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Matrix`) => [`Selection`](Selection.md) = `thinInstanceMatrixFor`

#### Type declaration

▸ (`this`, `method`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `method` | (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean` |
| `value` | `Matrix` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Matrix` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:139](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L139)

___

### thinInstancePosition

• **thinInstancePosition**: (`this`: [`Selection`](Selection.md), `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`, `staticBuffer`: `boolean`) => [`Selection`](Selection.md) = `thinInstancePosition`

#### Type declaration

▸ (`this`, `value`, `staticBuffer?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` | `undefined` |
| `staticBuffer` | `boolean` | `false` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:131](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L131)

___

### thinInstancePositionAt

• **thinInstancePositionAt**: (`this`: [`Selection`](Selection.md), `index`: `number`, `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `thinInstancePositionAt`

#### Type declaration

▸ (`this`, `index`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `index` | `number` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:140](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L140)

___

### thinInstancePositionFor

• **thinInstancePositionFor**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean`, `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `thinInstancePositionFor`

#### Type declaration

▸ (`this`, `method`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `method` | (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:144](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L144)

___

### thinInstanceRegisterAttribute

• **thinInstanceRegisterAttribute**: (`this`: [`Selection`](Selection.md), `attribute`: `string`, `stride`: `number`) => [`Selection`](Selection.md) = `thinInstanceRegisterAttribute`

#### Type declaration

▸ (`this`, `attribute`, `stride`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `attribute` | `string` |
| `stride` | `number` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:137](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L137)

___

### thinInstanceRotation

• **thinInstanceRotation**: (`this`: [`Selection`](Selection.md), `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`, `staticBuffer`: `boolean`) => [`Selection`](Selection.md) = `thinInstanceRotation`

#### Type declaration

▸ (`this`, `value`, `staticBuffer?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` | `undefined` |
| `staticBuffer` | `boolean` | `false` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:133](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L133)

___

### thinInstanceRotationAt

• **thinInstanceRotationAt**: (`this`: [`Selection`](Selection.md), `index`: `number`, `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `thinInstanceRotationAt`

#### Type declaration

▸ (`this`, `index`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `index` | `number` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:142](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L142)

___

### thinInstanceRotationFor

• **thinInstanceRotationFor**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean`, `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `thinInstanceRotationFor`

#### Type declaration

▸ (`this`, `method`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `method` | (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:146](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L146)

___

### thinInstanceScaling

• **thinInstanceScaling**: (`this`: [`Selection`](Selection.md), `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`, `staticBuffer`: `boolean`) => [`Selection`](Selection.md) = `thinInstanceScaling`

#### Type declaration

▸ (`this`, `value`, `staticBuffer?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` | `undefined` |
| `staticBuffer` | `boolean` | `false` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:132](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L132)

___

### thinInstanceScalingAt

• **thinInstanceScalingAt**: (`this`: [`Selection`](Selection.md), `index`: `number`, `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `thinInstanceScalingAt`

#### Type declaration

▸ (`this`, `index`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `index` | `number` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:141](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L141)

___

### thinInstanceScalingFor

• **thinInstanceScalingFor**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean`, `value`: `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3`) => [`Selection`](Selection.md) = `thinInstanceScalingFor`

#### Type declaration

▸ (`this`, `method`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `method` | (`d`: `any`, `n`: `Node`, `i`: `number`) => `boolean` |
| `value` | `Vector3` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Vector3` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:145](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L145)

___

### thinInstanceSetAttribute

• **thinInstanceSetAttribute**: (`this`: [`Selection`](Selection.md), `attribute`: `string`, `value`: `any`) => [`Selection`](Selection.md) = `thinInstanceSetAttribute`

#### Type declaration

▸ (`this`, `attribute`, `value`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `attribute` | `string` |
| `value` | `any` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:135](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L135)

___

### thinInstanceSetBuffer

• **thinInstanceSetBuffer**: (`this`: [`Selection`](Selection.md), `attribute`: `string`, `value`: `Float32Array` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Float32Array`, `stride?`: `number`, `staticBuffer`: `boolean`) => [`Selection`](Selection.md) = `thinInstanceSetBuffer`

#### Type declaration

▸ (`this`, `attribute`, `value`, `stride?`, `staticBuffer?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `attribute` | `string` | `undefined` |
| `value` | `Float32Array` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `Float32Array` | `undefined` |
| `stride?` | `number` | `undefined` |
| `staticBuffer` | `boolean` | `false` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:130](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L130)

___

### transition

• **transition**: (`this`: [`Selection`](Selection.md), `options`: `TransitionOptions` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `TransitionOptions`) => [`Selection`](Selection.md) = `transition`

#### Type declaration

▸ (`this`, `options`): [`Selection`](Selection.md)

Initiates and returns a new transition selection object or adds a new transition sequence to an existing transition selection object. This method is called from a selection and is used to animate the change in transforms of each node in the selection. The transition can be customized using the provided options or a function that returns options for each node.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `options` | `TransitionOptions` \| (`d`: `any`, `n`: `Node`, `i`: `number`) => `TransitionOptions` | The transition options to apply. This can be a `TransitionOptions` object or a function that returns a `TransitionOptions` object for each node. The function receives the data bound to the node, the node itself, and the index of the node as arguments. TransitionOptions: - `duration` (optional): The duration of the transition in milliseconds. - `delay` (optional): The delay before the transition starts, in milliseconds. - `framePerSecond` (optional): The number of frames per second for the transition. - `sequence` (optional): A boolean indicating whether the transition should be part of a sequence. - `easingFunction` (optional): An easing function to control the transition's rate of change. - `loopMode` (optional): A number (0 to 4) indicating the loop mode for the transition. - `onAnimationEnd` (optional): A callback function to be executed when the transition ends. |

##### Returns

[`Selection`](Selection.md)

The modified transition selection.

#### Defined in

[src/selection/index.ts:149](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L149)

___

### transitions

• **transitions**: `Transition`[]

#### Defined in

[src/selection/index.ts:66](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L66)

___

### translate

• **translate**: (`this`: [`Selection`](Selection.md), `value`: `Vector3` \| (`d`: `any`, `i`: `number`) => `Vector3`, `distance`: `number` \| (`d`: `any`, `i`: `number`) => `number`, `space?`: `Space`) => [`Selection`](Selection.md) = `translate`

#### Type declaration

▸ (`this`, `value`, `distance`, `space?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `value` | `Vector3` \| (`d`: `any`, `i`: `number`) => `Vector3` |
| `distance` | `number` \| (`d`: `any`, `i`: `number`) => `number` |
| `space?` | `Space` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[src/selection/index.ts:90](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L90)

___

### tween

• **tween**: (`this`: [`Selection`](Selection.md), `value`: (`d`: `any`, `n`: `any`, `i`: `any`) => (`t`: `any`) => `void`) => [`Selection`](Selection.md) = `tween`

#### Type declaration

▸ (`this`, `value`): [`Selection`](Selection.md)

Applies a tweening function to each node in the selection, returning a eased time value between 0-1 to be used for animation control for the total duration of the transition. The tweening function is executed for each node, allowing for fine-grained control over the animation process.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `value` | (`d`: `any`, `n`: `any`, `i`: `any`) => (`t`: `any`) => `void` | A function that returns a tweening function for each node. The outer function receives the data bound to the node, the node itself, and the index of the node as arguments. The returned tweening function is called with a parameter `t` that represents the normalized time (from 0 to 1) of the animation. |

##### Returns

[`Selection`](Selection.md)

The modified selection with the applied tweening animations.

#### Defined in

[src/selection/index.ts:150](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L150)

## Methods

### updateTransitions

▸ **updateTransitions**(`transition`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `Transition` |

#### Returns

`void`

#### Defined in

[src/selection/index.ts:74](https://github.com/jpmorganchase/anu/blob/7421a80/src/selection/index.ts#L74)
