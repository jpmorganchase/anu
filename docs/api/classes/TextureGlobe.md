[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / TextureGlobe

# Class: TextureGlobe

## Table of contents

### Constructors

- [constructor](TextureGlobe.md#constructor)

### Properties

- [container](TextureGlobe.md#container)
- [context](TextureGlobe.md#context)
- [diameter](TextureGlobe.md#diameter)
- [layers](TextureGlobe.md#layers)
- [lonLatToVector3](TextureGlobe.md#lonlattovector3)
- [map](TextureGlobe.md#map)
- [mesh](TextureGlobe.md#mesh)
- [name](TextureGlobe.md#name)
- [resolution](TextureGlobe.md#resolution)
- [scene](TextureGlobe.md#scene)
- [target](TextureGlobe.md#target)
- [texture](TextureGlobe.md#texture)
- [view](TextureGlobe.md#view)

### Methods

- [createContainer](TextureGlobe.md#createcontainer)
- [createMesh](TextureGlobe.md#createmesh)
- [createOLMap](TextureGlobe.md#createolmap)
- [createScales](TextureGlobe.md#createscales)
- [createTexture](TextureGlobe.md#createtexture)

## Constructors

### constructor

• **new TextureGlobe**(`name`, `layers`, `view`, `resolution`, `diameter`, `scene?`): [`TextureGlobe`](TextureGlobe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `layers` | `TileLayer`\<`OSM`\>[] |
| `view` | `View` |
| `resolution` | `Vector2` |
| `diameter` | `number` |
| `scene?` | `Scene` |

#### Returns

[`TextureGlobe`](TextureGlobe.md)

#### Defined in

[prefabs/Mapping/textureGlobe.ts:39](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L39)

## Properties

### container

• **container**: `HTMLElement`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:31](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L31)

___

### context

• **context**: `Context`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:35](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L35)

___

### diameter

• **diameter**: `number`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:36](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L36)

___

### layers

• **layers**: `TileLayer`\<`OSM`\>[]

#### Defined in

[prefabs/Mapping/textureGlobe.ts:27](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L27)

___

### lonLatToVector3

• **lonLatToVector3**: `Function`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:37](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L37)

___

### map

• **map**: `Map`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:30](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L30)

___

### mesh

• **mesh**: `Mesh`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:34](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L34)

___

### name

• **name**: `string`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:25](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L25)

___

### resolution

• **resolution**: `Vector2`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:32](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L32)

___

### scene

• `Optional` **scene**: `Scene`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:26](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L26)

___

### target

• **target**: `string`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:28](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L28)

___

### texture

• **texture**: `DynamicTexture`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:33](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L33)

___

### view

• **view**: `View`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:29](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L29)

## Methods

### createContainer

▸ **createContainer**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:55](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L55)

___

### createMesh

▸ **createMesh**(): `Mesh`

#### Returns

`Mesh`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:94](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L94)

___

### createOLMap

▸ **createOLMap**(): `Map`

#### Returns

`Map`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:66](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L66)

___

### createScales

▸ **createScales**(`c`): `Vector3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `Coordinate` |

#### Returns

`Vector3`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:109](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L109)

___

### createTexture

▸ **createTexture**(): `DynamicTexture`

#### Returns

`DynamicTexture`

#### Defined in

[prefabs/Mapping/textureGlobe.ts:76](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureGlobe.ts#L76)
