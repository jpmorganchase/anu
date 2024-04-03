[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / TextureMap

# Class: TextureMap

## Table of contents

### Constructors

- [constructor](TextureMap.md#constructor)

### Properties

- [container](TextureMap.md#container)
- [context](TextureMap.md#context)
- [layers](TextureMap.md#layers)
- [map](TextureMap.md#map)
- [mesh](TextureMap.md#mesh)
- [name](TextureMap.md#name)
- [resolution](TextureMap.md#resolution)
- [scaleLat](TextureMap.md#scalelat)
- [scaleLon](TextureMap.md#scalelon)
- [scene](TextureMap.md#scene)
- [size](TextureMap.md#size)
- [target](TextureMap.md#target)
- [texture](TextureMap.md#texture)
- [view](TextureMap.md#view)

### Methods

- [createContainer](TextureMap.md#createcontainer)
- [createMesh](TextureMap.md#createmesh)
- [createOLMap](TextureMap.md#createolmap)
- [createScales](TextureMap.md#createscales)
- [createTexture](TextureMap.md#createtexture)
- [keyboardControls](TextureMap.md#keyboardcontrols)

## Constructors

### constructor

• **new TextureMap**(`name`, `layers`, `view`, `resolution`, `size`, `scene?`): [`TextureMap`](TextureMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `layers` | `TileLayer`\<`OSM`\>[] |
| `view` | `View` |
| `resolution` | `Object` |
| `resolution.height` | `number` |
| `resolution.width` | `number` |
| `size` | `number` |
| `scene?` | `Scene` |

#### Returns

[`TextureMap`](TextureMap.md)

#### Defined in

[prefabs/Mapping/textureMap.ts:39](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L39)

## Properties

### container

• **container**: `HTMLElement`

#### Defined in

[prefabs/Mapping/textureMap.ts:30](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L30)

___

### context

• **context**: `Context`

#### Defined in

[prefabs/Mapping/textureMap.ts:34](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L34)

___

### layers

• **layers**: `TileLayer`\<`OSM`\>[]

#### Defined in

[prefabs/Mapping/textureMap.ts:26](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L26)

___

### map

• **map**: `Map`

#### Defined in

[prefabs/Mapping/textureMap.ts:29](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L29)

___

### mesh

• **mesh**: `Mesh`

#### Defined in

[prefabs/Mapping/textureMap.ts:33](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L33)

___

### name

• **name**: `string`

#### Defined in

[prefabs/Mapping/textureMap.ts:24](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L24)

___

### resolution

• **resolution**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[prefabs/Mapping/textureMap.ts:31](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L31)

___

### scaleLat

• **scaleLat**: `any`

#### Defined in

[prefabs/Mapping/textureMap.ts:37](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L37)

___

### scaleLon

• **scaleLon**: `any`

#### Defined in

[prefabs/Mapping/textureMap.ts:36](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L36)

___

### scene

• `Optional` **scene**: `Scene`

#### Defined in

[prefabs/Mapping/textureMap.ts:25](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L25)

___

### size

• **size**: `number`

#### Defined in

[prefabs/Mapping/textureMap.ts:35](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L35)

___

### target

• **target**: `string`

#### Defined in

[prefabs/Mapping/textureMap.ts:27](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L27)

___

### texture

• **texture**: `DynamicTexture`

#### Defined in

[prefabs/Mapping/textureMap.ts:32](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L32)

___

### view

• **view**: `View`

#### Defined in

[prefabs/Mapping/textureMap.ts:28](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L28)

## Methods

### createContainer

▸ **createContainer**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

#### Defined in

[prefabs/Mapping/textureMap.ts:64](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L64)

___

### createMesh

▸ **createMesh**(): `GroundMesh`

#### Returns

`GroundMesh`

#### Defined in

[prefabs/Mapping/textureMap.ts:105](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L105)

___

### createOLMap

▸ **createOLMap**(): `Map`

#### Returns

`Map`

#### Defined in

[prefabs/Mapping/textureMap.ts:75](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L75)

___

### createScales

▸ **createScales**(): `ScaleLinear`\<`number`, `number`, `never`\>[]

#### Returns

`ScaleLinear`\<`number`, `number`, `never`\>[]

#### Defined in

[prefabs/Mapping/textureMap.ts:123](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L123)

___

### createTexture

▸ **createTexture**(): `DynamicTexture`

#### Returns

`DynamicTexture`

#### Defined in

[prefabs/Mapping/textureMap.ts:85](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L85)

___

### keyboardControls

▸ **keyboardControls**(`scene`): [`TextureMap`](TextureMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

[`TextureMap`](TextureMap.md)

#### Defined in

[prefabs/Mapping/textureMap.ts:139](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Mapping/textureMap.ts#L139)
