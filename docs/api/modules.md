[@jpmorganchase/anu](README.md) / Exports

# @jpmorganchase/anu

## Table of contents

### Classes

- [AxesConfig](classes/AxesConfig.md)
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
- [bindClone](modules.md#bindclone)
- [bindInstance](modules.md#bindinstance)
- [bindThinInstance](modules.md#bindthininstance)
- [create](modules.md#create)
- [createAxes](modules.md#createaxes)
- [createBrush](modules.md#createbrush)
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

[src/prefabs/Chromatic/Chromatic.ts:105](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Chromatic/Chromatic.ts#L105)

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

[src/bind.ts:30](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/bind.ts#L30)

___

### bindClone

▸ **bindClone**(`this`, `mesh`, `data?`, `scene?`): [`Selection`](classes/Selection.md)

Take a selection, a mesh, and data. For each index in the data clone a new mesh.
The data index of the mesh is also attached to the mesh node object under the metadata property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | [`Selection`](classes/Selection.md) | - |
| `mesh` | `Mesh` | The mesh to create instances from. |
| `data` | `object`[] | The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data. |
| `scene?` | `Scene` | - |

#### Returns

[`Selection`](classes/Selection.md)

An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/bind.ts:53](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/bind.ts#L53)

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

[src/bind.ts:76](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/bind.ts#L76)

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

[src/bind.ts:99](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/bind.ts#L99)

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

[src/create.ts:112](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/create.ts#L112)

___

### createAxes

▸ **createAxes**(`name`, `scene`, `options`): [`Axis`](classes/Axis.md)

Creates an instance of Axes with the specified configuration.

This function supports two argument orders for backward compatibility:
1. `createAxes(name, scene, options)`
2. `createAxes(name, options, scene?)`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the axes. |
| `scene` | `Scene` | - |
| `options` | `AxesOptionsInterface` \| [`AxesConfig`](classes/AxesConfig.md) | - |

#### Returns

[`Axis`](classes/Axis.md)

An instance of Axes configured with the specified options.

**`Remarks`**

For more information, see the [Axes Documentation](https://jpmorganchase.github.io/anu/guide/prefabs/axes.html).

**`Example`**

```javascript
const options: AxesOptionsInterface = { scale: {x: scaleX, y: scaleY, z: scaleZ} };
const axes = createAxes('myAxes', scene, options);
```

#### Defined in

[src/prefabs/Axis/Axis.ts:109](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Axis/Axis.ts#L109)

▸ **createAxes**(`name`, `options`, `scene?`): [`Axis`](classes/Axis.md)

Creates an instance of Axes with the specified configuration.

This function supports two argument orders for backward compatibility:
1. `createAxes(name, scene, options)`
2. `createAxes(name, options, scene?)`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the axes. |
| `options` | `AxesOptionsInterface` \| [`AxesConfig`](classes/AxesConfig.md) | - |
| `scene?` | `Scene` | - |

#### Returns

[`Axis`](classes/Axis.md)

An instance of Axes configured with the specified options.

**`Remarks`**

For more information, see the [Axes Documentation](https://jpmorganchase.github.io/anu/guide/prefabs/axes.html).

**`Example`**

```javascript
const options: AxesOptionsInterface = { scale: {x: scaleX, y: scaleY, z: scaleZ} };
const axes = createAxes('myAxes', scene, options);
```

#### Defined in

[src/prefabs/Axis/Axis.ts:110](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Axis/Axis.ts#L110)

___

### createBrush

▸ **createBrush**(`name`, `scene`, `options`): `Brush`

Creates an instance of Brush with the specified configuration.

This function supports two argument orders for backward compatibility, scene is optional if passed last:
1. `createBrush(name, scene, options)`
2. `createBrush(name, options, scene?)`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the brush. |
| `scene` | `Scene` | - |
| `options` | `BrushOptionsInterface` | - |

#### Returns

`Brush`

An instance of Brush configured with the specified options.

**`Throws`**

Will throw an error if no scales are defined in the options.

**`Throws`**

Will throw an error if no parent is defined in the options.

**`Remarks`**

The function determines the order of the `scene` and `options` arguments based on their types.
If `arg2` is an instance of `Scene`, it is treated as the `scene`, and `arg3` is treated as the `options`.
Otherwise, `arg2` is treated as the `options`, and `arg3` is treated as the `scene`.

The `options` parameter allows for extensive customization of the brush, including scales, material, and axes transformations.

For more information, see the [Brush Documentation](https://jpmorganchase.github.io/anu/guide/prefabs/brush.html).

#### Defined in

[src/prefabs/Brushing/brush.ts:393](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Brushing/brush.ts#L393)

▸ **createBrush**(`name`, `options`, `scene?`): `Brush`

Creates an instance of Brush with the specified configuration.

This function supports two argument orders for backward compatibility, scene is optional if passed last:
1. `createBrush(name, scene, options)`
2. `createBrush(name, options, scene?)`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the brush. |
| `options` | `BrushOptionsInterface` | - |
| `scene?` | `Scene` | - |

#### Returns

`Brush`

An instance of Brush configured with the specified options.

**`Throws`**

Will throw an error if no scales are defined in the options.

**`Throws`**

Will throw an error if no parent is defined in the options.

**`Remarks`**

The function determines the order of the `scene` and `options` arguments based on their types.
If `arg2` is an instance of `Scene`, it is treated as the `scene`, and `arg3` is treated as the `options`.
Otherwise, `arg2` is treated as the `options`, and `arg3` is treated as the `scene`.

The `options` parameter allows for extensive customization of the brush, including scales, material, and axes transformations.

For more information, see the [Brush Documentation](https://jpmorganchase.github.io/anu/guide/prefabs/brush.html).

#### Defined in

[src/prefabs/Brushing/brush.ts:394](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Brushing/brush.ts#L394)

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

[src/prefabs/Mapping/MeshMap.ts:108](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Mapping/MeshMap.ts#L108)

___

### createPlaneText

▸ **createPlaneText**(`name`, `options`, `scene`): [`PlaneText`](classes/PlaneText.md)

Creates a new PlaneText prefab.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this PlaneText. |
| `options` | `PlaneTextOptions` | An options object of the PlaneText. |
| `scene` | `Scene` | The target scene for the created PlaneText. |

#### Returns

[`PlaneText`](classes/PlaneText.md)

#### Defined in

[src/prefabs/Text/planeText.ts:226](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Text/planeText.ts#L226)

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

[src/prefabs/Mapping/textureGlobe.ts:131](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Mapping/textureGlobe.ts#L131)

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

[src/prefabs/Mapping/textureMap.ts:193](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Mapping/textureMap.ts#L193)

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

[src/prefabs/Layout/Layout.ts:281](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Layout/Layout.ts#L281)

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

[src/prefabs/Chromatic/Chromatic.ts:93](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Chromatic/Chromatic.ts#L93)

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

[src/prefabs/Layout/Layout.ts:269](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Layout/Layout.ts#L269)

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

[src/select.ts:19](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/select.ts#L19)

___

### selectData

▸ **selectData**(`key`, `value`, `scene?`, `useAndLogic?`): [`Selection`](classes/Selection.md)

Select all nodes from the scene graph with binded data matching the given key value pairs and return them as a
instance of Selection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` \| `string`[] | the key or list of keys of the nodes to be selected. |
| `value` | `string` \| `number` \| `string`[] \| `number`[] | the value or list of values corresponding to the respective key(s) passed. |
| `scene?` | `Scene` | The babylon scene the to select from. Defaults to the last created scene if undefined. |
| `useAndLogic?` | `boolean` | If true, all keys and values must exist and match to be selected. Defaults to false. |

#### Returns

[`Selection`](classes/Selection.md)

an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
or undefined if a selection could not be made.

#### Defined in

[src/select.ts:101](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/select.ts#L101)

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

[src/select.ts:63](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/select.ts#L63)

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

[src/select.ts:46](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/select.ts#L46)

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

[src/select.ts:80](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/select.ts#L80)

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

[src/prefabs/Chromatic/Chromatic.ts:97](https://github.com/jpmorganchase/anu/blob/a8fa57b8/src/prefabs/Chromatic/Chromatic.ts#L97)
