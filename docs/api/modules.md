[@jpmorganchase/anu](README.md) / Exports

# @jpmorganchase/anu

## Table of contents

### Classes

- [Axis](classes/Axis.md)
- [Layout](classes/Layout.md)
- [MeshMap](classes/MeshMap.md)
- [OrdinalChromatic](classes/OrdinalChromatic.md)
- [PlaneText](classes/PlaneText.md)
- [Selection](classes/Selection.md)
- [SequentialChromatic](classes/SequentialChromatic.md)
- [TextureGlobe](classes/TextureGlobe.md)
- [TextureMap](classes/TextureMap.md)

### Variables

- [schemes](modules.md#schemes)

### Functions

- [bind](modules.md#bind)
- [bindInstance](modules.md#bindinstance)
- [bindThinInstance](modules.md#bindthininstance)
- [create](modules.md#create)
- [createAxes](modules.md#createaxes)
- [createMeshMap](modules.md#createmeshmap)
- [createPlaneText](modules.md#createplanetext)
- [createTextureGlobe](modules.md#createtextureglobe)
- [createTextureMap](modules.md#createtexturemap)
- [cylinderLayout](modules.md#cylinderlayout)
- [ordinalChromatic](modules.md#ordinalchromatic)
- [planeLayout](modules.md#planelayout)
- [select](modules.md#select)
- [selectData](modules.md#selectdata)
- [selectId](modules.md#selectid)
- [selectName](modules.md#selectname)
- [selectTag](modules.md#selecttag)
- [sequentialChromatic](modules.md#sequentialchromatic)

## Variables

### schemes

• **schemes**: `StringByAny`

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:81](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Chromatic/Chromatic.ts#L81)

## Functions

### bind

▸ **bind**\<`MeshType`\>(`shape`, `options?`, `data?`, `scene?`): [`Selection`](classes/Selection.md)

Take a shape type, a scene, and data. For each index in the data create a new mesh for each node in the selection as the parent.
The data index of the mesh is also attached to the mesh node object under the metadata property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MeshType` | extends keyof `MeshTypes` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shape` | `MeshType` | A string of the type of the mesh geometry being created. |
| `options?` | `Property`\<`MeshTypes`, `MeshType`\> | A object containing the initial mesh parameters for the selected geometry, can be either values or functions. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |
| `scene?` | `Scene` | The Babylon scene you are targeting. |

#### Returns

[`Selection`](classes/Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/bind.ts:29](https://github.com/jpmorganchase/anu/blob/9b6add0/src/bind.ts#L29)

___

### bindInstance

▸ **bindInstance**(`mesh`, `data?`, `scene?`): [`Selection`](classes/Selection.md)

Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parent.
The data index of the mesh is also attached to the mesh node object under the metadata property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | `Mesh` | The mesh to create instances from. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |
| `scene?` | `Scene` | - |

#### Returns

[`Selection`](classes/Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/bind.ts:47](https://github.com/jpmorganchase/anu/blob/9b6add0/src/bind.ts#L47)

___

### bindThinInstance

▸ **bindThinInstance**(`mesh`, `data?`, `scene?`): [`Selection`](classes/Selection.md)

Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parent.
The data index of the mesh is also attached to the mesh node object under the metadata property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | `Mesh` | The mesh to create instances from. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |
| `scene?` | `Scene` | - |

#### Returns

[`Selection`](classes/Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/bind.ts:70](https://github.com/jpmorganchase/anu/blob/9b6add0/src/bind.ts#L70)

___

### create

▸ **create**\<`MeshType`\>(`shape`, `name`, `options?`, `data?`, `scene?`): `Mesh`

Helper function to build meshes of a specified type with options optionally set with functions and data.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MeshType` | extends keyof `MeshTypes` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shape` | `MeshType` | The name of the mesh type you want to create. |
| `name` | `string` | The string that will be used as the inital mesh ID and name. |
| `options` | `Property`\<`MeshTypes`, `MeshType`\> | An object containg the mesh parametetrs as either absolutle values or functions. |
| `data` | `object` | An object containg the data that may be used to execute any functions passed in options. |
| `scene?` | `Scene` | The scene to create the mesh in. |

#### Returns

`Mesh`

A mesh object created with the passed parameters.

#### Defined in

[src/create.ts:103](https://github.com/jpmorganchase/anu/blob/9b6add0/src/create.ts#L103)

___

### createAxes

▸ **createAxes**(`name`, `scene`, `options`): [`Axis`](classes/Axis.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |
| `options` | `AxisOptions` |

#### Returns

[`Axis`](classes/Axis.md)

#### Defined in

[src/prefabs/Axis/Axis.ts:127](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Axis/Axis.ts#L127)

___

### createMeshMap

▸ **createMeshMap**(`name`, `options`, `scene?`): [`MeshMap`](classes/MeshMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Object` |
| `options.cot?` | `Node` \| `Mesh` \| `TransformNode` |
| `options.depth?` | `number` |
| `options.geoJson` | `GeoGeometryObjects` |
| `options.projection?` | `GeoProjection` |
| `options.simplification?` | `number` |
| `options.size?` | [`number`, `number`] |
| `options.transform?` | [`number`, `number`] |
| `scene?` | `Scene` |

#### Returns

[`MeshMap`](classes/MeshMap.md)

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:85](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Mapping/MeshMap.ts#L85)

___

### createPlaneText

▸ **createPlaneText**(`name`, `options`, `scene`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `planeTextOptions` |
| `scene` | `Scene` |

#### Returns

`Mesh`

#### Defined in

[src/prefabs/Text/planeText.ts:70](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Text/planeText.ts#L70)

___

### createTextureGlobe

▸ **createTextureGlobe**(`name`, `options?`, `scene?`): [`TextureGlobe`](classes/TextureGlobe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Object` |
| `options.diameter?` | `number` |
| `options.layers?` | `TileLayer`\<`any`\>[] |
| `options.resolution?` | `Vector2` |
| `options.view?` | `View` |
| `scene?` | `Scene` |

#### Returns

[`TextureGlobe`](classes/TextureGlobe.md)

#### Defined in

[src/prefabs/Mapping/textureGlobe.ts:125](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Mapping/textureGlobe.ts#L125)

___

### createTextureMap

▸ **createTextureMap**(`name`, `options?`, `scene?`): [`TextureMap`](classes/TextureMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Object` |
| `options.layers?` | `TileLayer`\<`any`\>[] |
| `options.mapHeight?` | `number` |
| `options.mapWidth?` | `number` |
| `options.meshSize?` | `number` |
| `options.view?` | `View` |
| `scene?` | `Scene` |

#### Returns

[`TextureMap`](classes/TextureMap.md)

#### Defined in

[src/prefabs/Mapping/textureMap.ts:191](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Mapping/textureMap.ts#L191)

___

### cylinderLayout

▸ **cylinderLayout**(`name`, `options`, `scene`): [`Layout`](classes/Layout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `LayoutOptions` |
| `scene` | `Scene` |

#### Returns

[`Layout`](classes/Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:258](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Layout/Layout.ts#L258)

___

### ordinalChromatic

▸ **ordinalChromatic**(`scheme`): [`OrdinalChromatic`](classes/OrdinalChromatic.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `string` \| `string`[] |

#### Returns

[`OrdinalChromatic`](classes/OrdinalChromatic.md)

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:68](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Chromatic/Chromatic.ts#L68)

___

### planeLayout

▸ **planeLayout**(`name`, `options`, `scene`): [`Layout`](classes/Layout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `LayoutOptions` |
| `scene` | `Scene` |

#### Returns

[`Layout`](classes/Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:244](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Layout/Layout.ts#L244)

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

[src/select.ts:18](https://github.com/jpmorganchase/anu/blob/9b6add0/src/select.ts#L18)

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

[src/select.ts:99](https://github.com/jpmorganchase/anu/blob/9b6add0/src/select.ts#L99)

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

[src/select.ts:62](https://github.com/jpmorganchase/anu/blob/9b6add0/src/select.ts#L62)

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

[src/select.ts:45](https://github.com/jpmorganchase/anu/blob/9b6add0/src/select.ts#L45)

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

[src/select.ts:79](https://github.com/jpmorganchase/anu/blob/9b6add0/src/select.ts#L79)

___

### sequentialChromatic

▸ **sequentialChromatic**(`scheme`): [`SequentialChromatic`](classes/SequentialChromatic.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `string` |

#### Returns

[`SequentialChromatic`](classes/SequentialChromatic.md)

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:72](https://github.com/jpmorganchase/anu/blob/9b6add0/src/prefabs/Chromatic/Chromatic.ts#L72)
