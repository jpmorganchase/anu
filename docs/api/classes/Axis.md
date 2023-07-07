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

prefabs/Axis/Axis.ts:61

## Properties

### CoT

• **CoT**: [`Selection`](Selection.md)

#### Defined in

prefabs/Axis/Axis.ts:52

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

prefabs/Axis/Axis.ts:126

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

prefabs/Axis/Axis.ts:128

___

### name

• **name**: `string`

#### Defined in

prefabs/Axis/Axis.ts:48

___

### options

• **options**: `AxisOptions`

#### Defined in

prefabs/Axis/Axis.ts:50

___

### scales

• **scales**: `any`

#### Defined in

prefabs/Axis/Axis.ts:53

___

### scene

• **scene**: `Scene`

#### Defined in

prefabs/Axis/Axis.ts:51

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

prefabs/Axis/Axis.ts:125

___

### ticks

• **ticks**: (`this`: [`Axis`](Axis.md), `labels`: { `x`: `undefined` \| [] ; `y`: `undefined` \| [] ; `z`: `undefined` \| []  }, `options`: { `x`: `undefined` \| [] ; `y`: `undefined` \| [] ; `z`: `undefined` \| []  }, `properties`: { `x`: {} ; `y`: {} ; `z`: {}  }) => [`Axis`](Axis.md) = `labelAlt`

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
| `options.x` | `undefined` \| [] |
| `options.y` | `undefined` \| [] |
| `options.z` | `undefined` \| [] |
| `properties` | `Object` |
| `properties.x` | `Object` |
| `properties.y` | `Object` |
| `properties.z` | `Object` |

##### Returns

[`Axis`](Axis.md)

#### Defined in

prefabs/Axis/Axis.ts:127

## Methods

### setCoT

▸ `Private` **setCoT**(): [`Selection`](Selection.md)

#### Returns

[`Selection`](Selection.md)

#### Defined in

prefabs/Axis/Axis.ts:72

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

prefabs/Axis/Axis.ts:83
