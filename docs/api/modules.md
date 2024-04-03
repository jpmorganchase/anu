[@jpmorganchase/anu](README.md) / Exports

# @jpmorganchase/anu

## Table of contents

### Classes

- [Axis](classes/Axis.md)
- [Selection](classes/Selection.md)
- [Tracer](classes/Tracer.md)

### Variables

- [schemes](modules.md#schemes)

### Functions

- [bind](modules.md#bind)
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

[prefabs/Chromatic/Chromatic.ts:81](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Chromatic/Chromatic.ts#L81)

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

[bind.ts:21](https://github.com/jpmorganchase/anu/blob/596907d/src/bind.ts#L21)

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

[create.ts:103](https://github.com/jpmorganchase/anu/blob/596907d/src/create.ts#L103)

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

[prefabs/Axis/Axis.ts:127](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Axis/Axis.ts#L127)

___

### createMeshMap

▸ **createMeshMap**(`name`, `options`, `scene?`): `meshMap`

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

`meshMap`

#### Defined in

[prefabs/Mapping/MeshMap.ts:86](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Mapping/MeshMap.ts#L86)

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

[prefabs/Text/planeText.ts:65](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Text/planeText.ts#L65)

___

### createTextureGlobe

▸ **createTextureGlobe**(`name`, `options?`, `scene?`): `textureGlobe`

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

`textureGlobe`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:123](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Mapping/textureGlobe.ts#L123)

___

### createTextureMap

▸ **createTextureMap**(`name`, `options?`, `scene?`): `Map2D`

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

`Map2D`

#### Defined in

[prefabs/Mapping/textureMap.ts:191](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Mapping/textureMap.ts#L191)

___

### cylinderLayout

▸ **cylinderLayout**(`name`, `options`, `scene`): `Layout`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `LayoutOptions` |
| `scene` | `Scene` |

#### Returns

`Layout`

#### Defined in

[prefabs/Layout/Layout.ts:258](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Layout/Layout.ts#L258)

___

### ordinalChromatic

▸ **ordinalChromatic**(`scheme`): `OrdinalChromatic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `string` \| `string`[] |

#### Returns

`OrdinalChromatic`

#### Defined in

[prefabs/Chromatic/Chromatic.ts:68](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Chromatic/Chromatic.ts#L68)

___

### planeLayout

▸ **planeLayout**(`name`, `options`, `scene`): `Layout`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `LayoutOptions` |
| `scene` | `Scene` |

#### Returns

`Layout`

#### Defined in

[prefabs/Layout/Layout.ts:244](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Layout/Layout.ts#L244)

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

[select.ts:17](https://github.com/jpmorganchase/anu/blob/596907d/src/select.ts#L17)

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

[select.ts:98](https://github.com/jpmorganchase/anu/blob/596907d/src/select.ts#L98)

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

[select.ts:61](https://github.com/jpmorganchase/anu/blob/596907d/src/select.ts#L61)

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

[select.ts:44](https://github.com/jpmorganchase/anu/blob/596907d/src/select.ts#L44)

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

[select.ts:78](https://github.com/jpmorganchase/anu/blob/596907d/src/select.ts#L78)

___

### sequentialChromatic

▸ **sequentialChromatic**(`scheme`): `SequentialChromatic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `string` |

#### Returns

`SequentialChromatic`

#### Defined in

[prefabs/Chromatic/Chromatic.ts:72](https://github.com/jpmorganchase/anu/blob/596907d/src/prefabs/Chromatic/Chromatic.ts#L72)
