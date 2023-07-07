[anu](README.md) / Exports

# anu

## Table of contents

### Classes

- [Axis](classes/Axis.md)
- [Chart2D](classes/Chart2D.md)
- [Selection](classes/Selection.md)
- [Tracer](classes/Tracer.md)

### Functions

- [bind](modules.md#bind)
- [create](modules.md#create)
- [createBar2D](modules.md#createbar2d)
- [createMap2D](modules.md#createmap2d)
- [createScatter2D](modules.md#createscatter2d)
- [select](modules.md#select)
- [selectData](modules.md#selectdata)
- [selectId](modules.md#selectid)
- [selectName](modules.md#selectname)
- [selectTag](modules.md#selecttag)
- [text2d](modules.md#text2d)

## Functions

### bind

▸ **bind**(`shape`, `scene`, `options?`, `data?`): [`Selection`](classes/Selection.md)

Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
The data index of the mesh is also attached to the mesh node object under the metadate property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shape` | `string` | A string of the type of the mesh geometry being created. |
| `scene` | `Scene` | The Babylon scene you are targeting. |
| `options` | `object` | A object contantaing the intial mesh parameters for the selected geometry, can be either values or functions. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |

#### Returns

[`Selection`](classes/Selection.md)

An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

bind.ts:17

___

### create

▸ **create**(`shape`, `name`, `scene`, `options?`, `data?`): `Mesh` \| `TransformNode`

Helper function to build meshes of a specified type with options optionally set with functions and data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shape` | `string` | The name of the mesh type you want to create. |
| `name` | `string` | The string that will be used as the inital mesh ID and name. |
| `scene` | `Scene` | The scene to create the mesh in. |
| `options` | `object` | An object containg the mesh parametetrs as either absolutle values or functions. |
| `data` | `object` | An object containg the data that may be used to execute any functions passed in options. |

#### Returns

`Mesh` \| `TransformNode`

A mesh object created with the passed parameters.

#### Defined in

create.ts:57

___

### createBar2D

▸ **createBar2D**(`name`, `scene`, `data`, `x`, `y`, `options?`): `Bar2D`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |
| `data` | [] |
| `x` | `string` |
| `y` | `string` |
| `options` | `Object` |
| `options.backgroundAlpha?` | `number` |
| `options.backgroundColor?` | `Color3` |
| `options.elementAlpha?` | `number` |
| `options.elementColor?` | `Color3` \| { `key`: `string` ; `scale`: `Function`  } |
| `options.height?` | `number` |
| `options.padding?` | `Object` |
| `options.padding.bottom?` | `number` |
| `options.padding.left?` | `number` |
| `options.padding.right?` | `number` |
| `options.padding.top?` | `number` |
| `options.width?` | `number` |

#### Returns

`Bar2D`

#### Defined in

prefabs/Chart2D/Bar2D.ts:80

___

### createMap2D

▸ **createMap2D**(`name`, `scene`): `Map2D`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |

#### Returns

`Map2D`

#### Defined in

prefabs/Mapping/Map2D.ts:168

___

### createScatter2D

▸ **createScatter2D**(`name`, `scene`, `data`, `x`, `y`, `options?`): `Scatter2D`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |
| `data` | [] |
| `x` | `string` |
| `y` | `string` |
| `options` | `Object` |
| `options.backgroundAlpha?` | `number` |
| `options.backgroundColor?` | `Color3` |
| `options.elementAlpha?` | `number` |
| `options.elementColor?` | `Color3` \| { `key`: `string` ; `scale`: `Function`  } |
| `options.height?` | `number` |
| `options.padding?` | `Object` |
| `options.padding.bottom?` | `number` |
| `options.padding.left?` | `number` |
| `options.padding.right?` | `number` |
| `options.padding.top?` | `number` |
| `options.width?` | `number` |

#### Returns

`Scatter2D`

#### Defined in

prefabs/Chart2D/Scatter2D.ts:68

___

### select

▸ **select**(`name`, `scene`): [`Selection`](classes/Selection.md)

Select all nodes from the scene graph matching the indicator and return it as a
instance of Selection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The prefix and text of the selection, selection types include: .\<name>, #\<id>, $\<tags>. |
| `scene` | `Scene` | The babylon scene the to select from. |

#### Returns

[`Selection`](classes/Selection.md)

an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

select.ts:14

___

### selectData

▸ **selectData**(`key`, `value`, `scene`): [`Selection`](classes/Selection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `string`[] |
| `value` | `string` \| `number` \| `string`[] \| `number`[] |
| `scene` | `Scene` |

#### Returns

[`Selection`](classes/Selection.md)

#### Defined in

select.ts:58

___

### selectId

▸ **selectId**(`id`, `scene`): [`Selection`](classes/Selection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `string`[] |
| `scene` | `Scene` |

#### Returns

[`Selection`](classes/Selection.md)

#### Defined in

select.ts:40

___

### selectName

▸ **selectName**(`name`, `scene`): [`Selection`](classes/Selection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `string`[] |
| `scene` | `Scene` |

#### Returns

[`Selection`](classes/Selection.md)

#### Defined in

select.ts:32

___

### selectTag

▸ **selectTag**(`tag`, `scene`): [`Selection`](classes/Selection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` \| `string`[] |
| `scene` | `Scene` |

#### Returns

[`Selection`](classes/Selection.md)

#### Defined in

select.ts:48

___

### text2d

▸ **text2d**(`name`, `options`, `scene`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Object` |
| `options.backgroundColor?` | `string` |
| `options.fontColor?` | `string` |
| `options.fontMod?` | `string` |
| `options.fontSize?` | `number` |
| `options.fontStyle?` | `string` |
| `options.size?` | `number` |
| `options.text?` | `string` |
| `scene` | `Scene` |

#### Returns

`Mesh`

#### Defined in

prefabs/text2d.ts:4
