[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / MeshMap

# Class: MeshMap

## Table of contents

### Constructors

- [constructor](MeshMap.md#constructor)

### Properties

- [cot](MeshMap.md#cot)
- [depth](MeshMap.md#depth)
- [geoJson](MeshMap.md#geojson)
- [name](MeshMap.md#name)
- [projection](MeshMap.md#projection)
- [scene](MeshMap.md#scene)
- [selection](MeshMap.md#selection)
- [simplification](MeshMap.md#simplification)
- [size](MeshMap.md#size)
- [transform](MeshMap.md#transform)

### Methods

- [createMap](MeshMap.md#createmap)

## Constructors

### constructor

• **new MeshMap**(`name`, `geoJson`, `projection`, `size`, `transform`, `simplification`, `depth`, `cot`, `scene?`): [`MeshMap`](MeshMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `geoJson` | `GeoGeometryObjects` |
| `projection` | `GeoProjection` |
| `size` | [`number`, `number`] |
| `transform` | [`number`, `number`] |
| `simplification` | `number` |
| `depth` | `number` |
| `cot` | `Nullable`\<`Node`\> |
| `scene?` | `Scene` |

#### Returns

[`MeshMap`](MeshMap.md)

#### Defined in

[prefabs/Mapping/MeshMap.ts:25](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L25)

## Properties

### cot

• **cot**: `Nullable`\<`Node`\>

#### Defined in

[prefabs/Mapping/MeshMap.ts:21](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L21)

___

### depth

• `Optional` **depth**: `number`

#### Defined in

[prefabs/Mapping/MeshMap.ts:23](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L23)

___

### geoJson

• **geoJson**: `GeoGeometryObjects`

#### Defined in

[prefabs/Mapping/MeshMap.ts:17](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L17)

___

### name

• **name**: `string`

#### Defined in

[prefabs/Mapping/MeshMap.ts:14](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L14)

___

### projection

• **projection**: `GeoProjection`

#### Defined in

[prefabs/Mapping/MeshMap.ts:18](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L18)

___

### scene

• `Optional` **scene**: `Scene`

#### Defined in

[prefabs/Mapping/MeshMap.ts:15](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L15)

___

### selection

• `Optional` **selection**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Mapping/MeshMap.ts:22](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L22)

___

### simplification

• **simplification**: `number`

#### Defined in

[prefabs/Mapping/MeshMap.ts:20](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L20)

___

### size

• **size**: [`number`, `number`]

#### Defined in

[prefabs/Mapping/MeshMap.ts:16](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L16)

___

### transform

• **transform**: [`number`, `number`]

#### Defined in

[prefabs/Mapping/MeshMap.ts:19](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L19)

## Methods

### createMap

▸ **createMap**(): [`Selection`](Selection.md)

#### Returns

[`Selection`](Selection.md)

#### Defined in

[prefabs/Mapping/MeshMap.ts:38](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/MeshMap.ts#L38)
