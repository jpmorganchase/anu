[anu](../README.md) / [Exports](../modules.md) / Axis

# Class: Axis

## Table of contents

### Constructors

- [constructor](Axis.md#constructor)

### Properties

- [CoT](Axis.md#cot)
- [background](Axis.md#background)
- [grid](Axis.md#grid)
- [name](Axis.md#name)
- [options](Axis.md#options)
- [scales](Axis.md#scales)
- [scene](Axis.md#scene)
- [shape](Axis.md#shape)
- [ticks](Axis.md#ticks)

### Methods

- [setCoT](Axis.md#setcot)
- [setScales](Axis.md#setscales)

## Constructors

### constructor

• **new Axis**(`name`, `scene`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |
| `options` | `AxisOptions` |

#### Defined in

[prefabs/Axis/Axis.ts:35](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L35)

## Properties

### CoT

• **CoT**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:26](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L26)

___

### background

• **background**: (`this`: [`Axis`](Axis.md), `options`: {}, `properties`: {}) => [`Axis`](Axis.md) = `backgroundAlt`

#### Type declaration

▸ (`this`, `options?`, `properties?`): [`Axis`](Axis.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |
| `options` | `Object` |
| `properties` | `Object` |

##### Returns

[`Axis`](Axis.md)

#### Defined in

[prefabs/Axis/Axis.ts:102](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L102)

___

### grid

• **grid**: (`this`: [`Axis`](Axis.md), `labels`: { `x`: `undefined` \| [] ; `y`: `undefined` \| [] ; `z`: `undefined` \| []  }) => [`Axis`](Axis.md) = `tickAlt`

#### Type declaration

▸ (`this`, `labels?`): [`Axis`](Axis.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |
| `labels` | `Object` |
| `labels.x` | `undefined` \| [] |
| `labels.y` | `undefined` \| [] |
| `labels.z` | `undefined` \| [] |

##### Returns

[`Axis`](Axis.md)

#### Defined in

[prefabs/Axis/Axis.ts:104](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L104)

___

### name

• **name**: `string`

#### Defined in

[prefabs/Axis/Axis.ts:22](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L22)

___

### options

• **options**: `AxisOptions`

#### Defined in

[prefabs/Axis/Axis.ts:24](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L24)

___

### scales

• **scales**: `any`

#### Defined in

[prefabs/Axis/Axis.ts:27](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L27)

___

### scene

• **scene**: `Scene`

#### Defined in

[prefabs/Axis/Axis.ts:25](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L25)

___

### shape

• **shape**: (`this`: [`Axis`](Axis.md), `options`: { `radius?`: `number`  }, `properties`: {}) => [`Axis`](Axis.md) = `shapeAlt`

#### Type declaration

▸ (`this`, `options?`, `properties?`): [`Axis`](Axis.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |
| `options` | `Object` |
| `options.radius?` | `number` |
| `properties` | `Object` |

##### Returns

[`Axis`](Axis.md)

#### Defined in

[prefabs/Axis/Axis.ts:101](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L101)

___

### ticks

• **ticks**: (`this`: [`Axis`](Axis.md), `labels`: { `x`: `undefined` \| [] ; `y`: `undefined` \| [] ; `z`: `undefined` \| []  }, `options`: { `x`: `undefined` \| {} ; `y`: `undefined` \| {} ; `z`: `undefined` \| {}  }, `properties`: { `x`: {} ; `y`: {} ; `z`: {}  }) => [`Axis`](Axis.md) = `labelAlt`

#### Type declaration

▸ (`this`, `labels?`, `options?`, `properties?`): [`Axis`](Axis.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |
| `labels` | `Object` |
| `labels.x` | `undefined` \| [] |
| `labels.y` | `undefined` \| [] |
| `labels.z` | `undefined` \| [] |
| `options` | `Object` |
| `options.x` | `undefined` \| {} |
| `options.y` | `undefined` \| {} |
| `options.z` | `undefined` \| {} |
| `properties` | `Object` |
| `properties.x` | `Object` |
| `properties.y` | `Object` |
| `properties.z` | `Object` |

##### Returns

[`Axis`](Axis.md)

#### Defined in

[prefabs/Axis/Axis.ts:103](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L103)

## Methods

### setCoT

▸ `Private` **setCoT**(): [`Selection`](Selection.md)

#### Returns

[`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:44](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L44)

___

### setScales

▸ `Private` **setScales**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `x` | { `domain`: `any` = domainX; `range`: `number`[] = rangeX; `scale`: `any` = scaleX } |
| `x.domain` | `any` |
| `x.range` | `number`[] |
| `x.scale` | `any` |
| `y` | { `domain`: `any` = domainY; `range`: `number`[] = rangeY; `scale`: `any` = scaleY } |
| `y.domain` | `any` |
| `y.range` | `number`[] |
| `y.scale` | `any` |
| `z` | { `domain`: `any` = domainZ; `range`: `number`[] = rangeZ; `scale`: `any` = scaleZ } |
| `z.domain` | `any` |
| `z.range` | `number`[] |
| `z.scale` | `any` |

#### Defined in

[prefabs/Axis/Axis.ts:55](https://github.com/jpmorganchase/anu/blob/4ed179d/src/prefabs/Axis/Axis.ts#L55)
