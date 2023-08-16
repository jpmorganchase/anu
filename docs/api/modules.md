[anu](README.md) / Exports

# anu

## Table of contents

### Classes

- [Axis](classes/Axis.md)
- [Selection](classes/Selection.md)
- [Tracer](classes/Tracer.md)

### Functions

- [bind](modules.md#bind)
- [create](modules.md#create)
- [createTextureGlobe](modules.md#createtextureglobe)
- [createTextureMap](modules.md#createtexturemap)
- [select](modules.md#select)
- [selectData](modules.md#selectdata)
- [selectId](modules.md#selectid)
- [selectName](modules.md#selectname)
- [selectTag](modules.md#selecttag)
- [text2d](modules.md#text2d)

## Functions

### bind

▸ **bind**(`shape`, `scene`, `options?`, `data?`): [`Selection`](classes/Selection.md)

Take a shape type, a scene, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
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

[bind.ts:19](https://github.com/jpmorganchase/anu/blob/4ed179d/src/bind.ts#L19)

___

### create

▸ **create**(`shape`, `name`, `scene`, `options?`, `data?`): `Mesh`

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

`Mesh`

A mesh object created with the passed parameters.

#### Defined in

[create.ts:60](https://github.com/jpmorganchase/anu/blob/4ed179d/src/create.ts#L60)

___

### createTextureGlobe

▸ **createTextureGlobe**(`name`, `options`, `scene`): `textureGlobe`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Object` |
| `options.diameter` | `number` |
| `options.layers?` | `TileLayer`<`any`\>[] |
| `options.resolution?` | `Vector2` |
| `options.view?` | `View` |
| `scene` | `Scene` |

#### Returns

`textureGlobe`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:123](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Mapping/textureGlobe.ts#L123)

___

### createTextureMap

▸ **createTextureMap**(`name`, `options`, `scene`): `Map2D`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Object` |
| `options.layers?` | `TileLayer`<`any`\>[] |
| `options.mapHeight?` | `number` |
| `options.mapWidth?` | `number` |
| `options.meshSize?` | `number` |
| `options.view?` | `View` |
| `scene` | `Scene` |

#### Returns

`Map2D`

#### Defined in

[prefabs/Mapping/textureMap.ts:191](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Mapping/textureMap.ts#L191)

___

### select

▸ **select**(`name`, `scene`): [`Selection`](classes/Selection.md)

Select all nodes from the scene graph matching the indicator and return them as a
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

[select.ts:17](https://github.com/jpmorganchase/anu/blob/4ed179d/src/select.ts#L17)

___

### selectData

▸ **selectData**(`key`, `value`, `scene`): [`Selection`](classes/Selection.md)

Select all nodes from the scene graph with binded data matching the given key value pairs and return them as a
instance of Selection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` \| `string`[] | the key or list of keys of the nodes to be selected. |
| `value` | `string` \| `number` \| `string`[] \| `number`[] | the value or list of values corresponding to the respective key(s) passed. |
| `scene` | `Scene` | The babylon scene the to select from. |

#### Returns

[`Selection`](classes/Selection.md)

an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[select.ts:98](https://github.com/jpmorganchase/anu/blob/4ed179d/src/select.ts#L98)

___

### selectId

▸ **selectId**(`id`, `scene`): [`Selection`](classes/Selection.md)

Select all nodes from the scene graph matching the given ID(s) and return them as a
instance of Selection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `string`[] | the ID or list of IDs of the nodes to be selected |
| `scene` | `Scene` | The babylon scene the to select from. |

#### Returns

[`Selection`](classes/Selection.md)

an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[select.ts:61](https://github.com/jpmorganchase/anu/blob/4ed179d/src/select.ts#L61)

___

### selectName

▸ **selectName**(`name`, `scene`): [`Selection`](classes/Selection.md)

Select all nodes from the scene graph matching the given name(s) and return them as a
instance of Selection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` \| `string`[] | the name or list of names of the nodes to be selected |
| `scene` | `Scene` | The babylon scene the to select from. |

#### Returns

[`Selection`](classes/Selection.md)

an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[select.ts:44](https://github.com/jpmorganchase/anu/blob/4ed179d/src/select.ts#L44)

___

### selectTag

▸ **selectTag**(`tag`, `scene`): [`Selection`](classes/Selection.md)

Select all nodes from the scene graph matching the given tag(s) and return them as a
instance of Selection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` \| `string`[] | the tag and tag logic or list of tags of the nodes to be selected |
| `scene` | `Scene` | The babylon scene the to select from. |

#### Returns

[`Selection`](classes/Selection.md)

an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[select.ts:78](https://github.com/jpmorganchase/anu/blob/4ed179d/src/select.ts#L78)

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

[prefabs/text2d.ts:7](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/text2d.ts#L7)
