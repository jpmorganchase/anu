[anu](../README.md) / [Exports](../modules.md) / Selection

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
- [axis](Selection.md#axis)
- [bind](Selection.md#bind)
- [bindInstance](Selection.md#bindinstance)
- [boundingBox](Selection.md#boundingbox)
- [diffuseColor](Selection.md#diffusecolor)
- [diffuseTexture](Selection.md#diffusetexture)
- [dispose](Selection.md#dispose)
- [drawTextDT](Selection.md#drawtextdt)
- [emissiveColor](Selection.md#emissivecolor)
- [emissiveTexture](Selection.md#emissivetexture)
- [filter](Selection.md#filter)
- [func](Selection.md#func)
- [get](Selection.md#get)
- [hasTags](Selection.md#hastags)
- [material](Selection.md#material)
- [pipeAxis](Selection.md#pipeaxis)
- [position](Selection.md#position)
- [positionX](Selection.md#positionx)
- [positionY](Selection.md#positiony)
- [positionZ](Selection.md#positionz)
- [prop](Selection.md#prop)
- [props](Selection.md#props)
- [registerInstancedBuffer](Selection.md#registerinstancedbuffer)
- [removeTags](Selection.md#removetags)
- [rotation](Selection.md#rotation)
- [rotationX](Selection.md#rotationx)
- [rotationY](Selection.md#rotationy)
- [rotationZ](Selection.md#rotationz)
- [scaleDT](Selection.md#scaledt)
- [scaleToDT](Selection.md#scaletodt)
- [scaling](Selection.md#scaling)
- [scalingX](Selection.md#scalingx)
- [scalingY](Selection.md#scalingy)
- [scalingZ](Selection.md#scalingz)
- [scene](Selection.md#scene)
- [select](Selection.md#select)
- [selectId](Selection.md#selectid)
- [selectName](Selection.md#selectname)
- [selectTag](Selection.md#selecttag)
- [selected](Selection.md#selected)
- [setInstancedBuffer](Selection.md#setinstancedbuffer)
- [specularColor](Selection.md#specularcolor)
- [specularTexture](Selection.md#speculartexture)
- [translate](Selection.md#translate)

## Constructors

### constructor

• **new Selection**(`nodes`, `scene`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `Node`[] |
| `scene` | `Scene` |

#### Defined in

selection/index.ts:43

## Properties

### action

• **action**: (`this`: [`Selection`](Selection.md), `action`: `Action` \| (`d`: `any`) => `Action`) => [`Selection`](Selection.md) = `action`

#### Type declaration

▸ (`this`, `action`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `action` | `Action` \| (`d`: `any`) => `Action` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

selection/index.ts:73

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

selection/index.ts:70

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

selection/index.ts:78

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

selection/index.ts:85

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
| `value` | `any` | The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", and the index "i". |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

selection/index.ts:69

___

### axis

• **axis**: (`this`: [`Selection`](Selection.md), `scale`: `any`, `axis`: `string`, `padding`: `number`) => [`Selection`](Selection.md) = `axisBasic`

#### Type declaration

▸ (`this`, `scale`, `axis`, `padding?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `scale` | `any` | `undefined` |
| `axis` | `string` | `undefined` |
| `padding` | `number` | `0` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

selection/index.ts:89

___

### bind

• **bind**: (`this`: [`Selection`](Selection.md), `shape`: `string`, `options`: `object`, `data`: `object`[]) => [`Selection`](Selection.md) = `bind`

#### Type declaration

▸ (`this`, `shape`, `options?`, `data?`): [`Selection`](Selection.md)

Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
The data index of the mesh is also attached to the mesh node object under the metadate property.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `shape` | `string` | A string of the type of the mesh geometry being created. |
| `options` | `object` | A object contantaing the intial mesh parameters for the selected geometry, can be either values or functions. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |

##### Returns

[`Selection`](Selection.md)

An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

selection/index.ts:52

___

### bindInstance

• **bindInstance**: (`this`: [`Selection`](Selection.md), `mesh`: `Mesh`, `data`: `object`[]) => [`Selection`](Selection.md) = `bindInstance`

#### Type declaration

▸ (`this`, `mesh`, `data?`): [`Selection`](Selection.md)

Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
The data index of the mesh is also attached to the mesh node object under the metadate property.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `mesh` | `Mesh` | The mesh to create instances from. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |

##### Returns

[`Selection`](Selection.md)

An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

selection/index.ts:54

___

### boundingBox

• **boundingBox**: (`this`: [`Selection`](Selection.md)) => `BoundingInfo` = `boundingBox`

#### Type declaration

▸ (`this`): `BoundingInfo`

Calculates the cumalitive bounding box of the current selection.

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |

##### Returns

`BoundingInfo`

instance of BoundingInfo class, an object containing all bounding box values.

#### Defined in

selection/index.ts:90

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

selection/index.ts:75

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

selection/index.ts:82

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

selection/index.ts:81

___

### drawTextDT

• **drawTextDT**: (`this`: [`Selection`](Selection.md), `text`: `string` \| (`d`: `any`, `i`: `number`) => `string`, `font`: `string` \| (`d`: `any`, `i`: `number`) => `string`, `x`: ``null`` \| `number` \| (`d`: `any`, `i`: `number`) => `number`, `y`: ``null`` \| `number` \| (`d`: `any`, `i`: `number`) => `number`, `color`: ``null`` \| `string` \| (`d`: `any`, `i`: `number`) => `string`, `clearColor`: ``null`` \| `string` \| (`d`: `any`, `i`: `number`) => `string`) => [`Selection`](Selection.md) = `drawTextDT`

#### Type declaration

▸ (`this`, `text`, `font`, `x?`, `y?`, `color?`, `clearColor?`): [`Selection`](Selection.md)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | `undefined` |
| `text` | `string` \| (`d`: `any`, `i`: `number`) => `string` | `undefined` |
| `font` | `string` \| (`d`: `any`, `i`: `number`) => `string` | `undefined` |
| `x` | ``null`` \| `number` \| (`d`: `any`, `i`: `number`) => `number` | `null` |
| `y` | ``null`` \| `number` \| (`d`: `any`, `i`: `number`) => `number` | `null` |
| `color` | ``null`` \| `string` \| (`d`: `any`, `i`: `number`) => `string` | `null` |
| `clearColor` | ``null`` \| `string` \| (`d`: `any`, `i`: `number`) => `string` | `null` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

selection/index.ts:88

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

selection/index.ts:77

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

selection/index.ts:84

___

### filter

• **filter**: (`this`: [`Selection`](Selection.md), `method`: (`d`: `any`, `i`: `number`) => `boolean`) => [`Selection`](Selection.md) = `filter`

#### Type declaration

▸ (`this`, `method`): [`Selection`](Selection.md)

Filters a seclection based on the function provided

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `method` | (`d`: `any`, `i`: `number`) => `boolean` | A function with two parameters d (the binded data) and i (the index) that returns a boolean. |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

selection/index.ts:91

___

### func

• **func**: (`this`: [`Selection`](Selection.md), `method`: (`m`: `Mesh`, `i`: `number`) => `any`, `params`: `Object`) => `Object`[] = `func`

#### Type declaration

▸ (`this`, `method`, `params?`): `Object`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `method` | (`m`: `Mesh`, `i`: `number`) => `any` |
| `params` | `Object` |

##### Returns

`Object`[]

#### Defined in

selection/index.ts:53

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

selection/index.ts:68

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

selection/index.ts:72

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

selection/index.ts:74

___

### pipeAxis

• **pipeAxis**: (`this`: [`Selection`](Selection.md), `axis`: `string`, `scale`: `any`, `options`: { `meshAlpha?`: `number` ; `meshColor?`: `Color3` ; `padding?`: `Vector3` ; `radius?`: `number`  }) => `PipeAxis` = `createPipeAxis`

#### Type declaration

▸ (`this`, `axis`, `scale`, `options?`): `PipeAxis`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `axis` | `string` |
| `scale` | `any` |
| `options` | `Object` |
| `options.meshAlpha?` | `number` |
| `options.meshColor?` | `Color3` |
| `options.padding?` | `Vector3` |
| `options.radius?` | `number` |

##### Returns

`PipeAxis`

#### Defined in

selection/index.ts:92

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

selection/index.ts:55

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

selection/index.ts:56

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

selection/index.ts:57

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

selection/index.ts:58

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
| `value` | `any` | The value to set the property or a function(d, i) returing the value for said property with scope of the binded data "d", and the index "i". |

##### Returns

[`Selection`](Selection.md)

The modified selection

#### Defined in

selection/index.ts:94

___

### props

• **props**: (`this`: [`Selection`](Selection.md), `properties`: {}) => [`Selection`](Selection.md) = `props`

#### Type declaration

▸ (`this`, `properties`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Selection`](Selection.md) |
| `properties` | `Object` |

##### Returns

[`Selection`](Selection.md)

#### Defined in

selection/index.ts:93

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

selection/index.ts:79

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

selection/index.ts:71

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

selection/index.ts:60

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

selection/index.ts:61

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

selection/index.ts:62

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

selection/index.ts:63

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

selection/index.ts:86

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

selection/index.ts:87

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

selection/index.ts:64

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

selection/index.ts:65

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

selection/index.ts:66

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

selection/index.ts:67

___

### scene

• **scene**: `Scene`

#### Defined in

selection/index.ts:41

___

### select

• **select**: (`this`: [`Selection`](Selection.md), `name`: `string`) => [`Selection`](Selection.md) = `select`

#### Type declaration

▸ (`this`, `name`): [`Selection`](Selection.md)

Select all nodes from the childern graph(s) of selected
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

selection/index.ts:48

___

### selectId

• **selectId**: (`this`: [`Selection`](Selection.md), `id`: `string` \| `string`[]) => [`Selection`](Selection.md) = `selectId`

#### Type declaration

▸ (`this`, `id`): [`Selection`](Selection.md)

Select nodes from the childern graph(s) of selected by id and return it as a instance of Selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `id` | `string` \| `string`[] | A string or array of strings of ids of nodes to be selected. |

##### Returns

[`Selection`](Selection.md)

A new instance of Selection with the selected nodes.

#### Defined in

selection/index.ts:50

___

### selectName

• **selectName**: (`this`: [`Selection`](Selection.md), `name`: `string` \| `string`[]) => [`Selection`](Selection.md) = `selectName`

#### Type declaration

▸ (`this`, `name`): [`Selection`](Selection.md)

Select nodes from the childern graph(s) of selected by name and return it as a instance of Selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `name` | `string` \| `string`[] | A string or array of strings of the names of the nodes to be selected. |

##### Returns

[`Selection`](Selection.md)

A new instance of Selection with the selected nodes.

#### Defined in

selection/index.ts:49

___

### selectTag

• **selectTag**: (`this`: [`Selection`](Selection.md), `tag`: `string` \| `string`[]) => [`Selection`](Selection.md) = `selectTag`

#### Type declaration

▸ (`this`, `tag`): [`Selection`](Selection.md)

Select nodes from the childern graph(s) of selected by tag and return it as a instance of Selection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](Selection.md) | - |
| `tag` | `string` \| `string`[] | A string or array of strings of tags or tag unions of nodes to be selected. |

##### Returns

[`Selection`](Selection.md)

A new instance of Selection with the selected nodes.

#### Defined in

selection/index.ts:51

___

### selected

• **selected**: `Node`[]

#### Defined in

selection/index.ts:40

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

selection/index.ts:80

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

selection/index.ts:76

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

selection/index.ts:83

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

selection/index.ts:59
