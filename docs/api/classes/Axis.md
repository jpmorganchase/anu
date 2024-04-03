[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / Axis

# Class: Axis

## Table of contents

### Constructors

- [constructor](Axis.md#constructor)

### Properties

- [CoT](Axis.md#cot)
- [background](Axis.md#background)
- [domain](Axis.md#domain)
- [grid](Axis.md#grid)
- [label](Axis.md#label)
- [name](Axis.md#name)
- [options](Axis.md#options)
- [scales](Axis.md#scales)
- [scene](Axis.md#scene)
- [setBackground](Axis.md#setbackground)
- [setDomain](Axis.md#setdomain)
- [setGrid](Axis.md#setgrid)
- [setLabel](Axis.md#setlabel)

### Methods

- [setCoT](Axis.md#setcot)
- [setScales](Axis.md#setscales)

## Constructors

### constructor

• **new Axis**(`name`, `scene`, `options?`): [`Axis`](Axis.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |
| `options` | `AxisOptions` |

#### Returns

[`Axis`](Axis.md)

#### Defined in

[prefabs/Axis/Axis.ts:48](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L48)

## Properties

### CoT

• **CoT**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:41](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L41)

___

### background

• **background**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | [`Selection`](Selection.md) |
| `y?` | [`Selection`](Selection.md) |
| `z?` | [`Selection`](Selection.md) |

#### Defined in

[prefabs/Axis/Axis.ts:44](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L44)

___

### domain

• **domain**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:43](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L43)

___

### grid

• **grid**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:45](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L45)

___

### label

• **label**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | [`Selection`](Selection.md) |
| `y?` | [`Selection`](Selection.md) |
| `z?` | [`Selection`](Selection.md) |

#### Defined in

[prefabs/Axis/Axis.ts:46](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L46)

___

### name

• **name**: `string`

#### Defined in

[prefabs/Axis/Axis.ts:38](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L38)

___

### options

• **options**: `AxisOptions`

#### Defined in

[prefabs/Axis/Axis.ts:39](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L39)

___

### scales

• **scales**: `any`

#### Defined in

[prefabs/Axis/Axis.ts:42](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L42)

___

### scene

• **scene**: `Scene`

#### Defined in

[prefabs/Axis/Axis.ts:40](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L40)

___

### setBackground

• `Private` **setBackground**: (`this`: [`Axis`](Axis.md)) => \{ `x?`: [`Selection`](Selection.md) ; `y?`: [`Selection`](Selection.md) ; `z?`: [`Selection`](Selection.md)  } = `backgroundAlt`

#### Type declaration

▸ (`this`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x?` | [`Selection`](Selection.md) |
| `y?` | [`Selection`](Selection.md) |
| `z?` | [`Selection`](Selection.md) |

#### Defined in

[prefabs/Axis/Axis.ts:120](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L120)

___

### setDomain

• `Private` **setDomain**: (`this`: [`Axis`](Axis.md)) => [`Selection`](Selection.md) = `domain`

#### Type declaration

▸ (`this`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:119](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L119)

___

### setGrid

• `Private` **setGrid**: (`this`: [`Axis`](Axis.md)) => [`Selection`](Selection.md) = `grid`

#### Type declaration

▸ (`this`): [`Selection`](Selection.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |

##### Returns

[`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:121](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L121)

___

### setLabel

• `Private` **setLabel**: (`this`: [`Axis`](Axis.md)) => \{ `x?`: [`Selection`](Selection.md) ; `y?`: [`Selection`](Selection.md) ; `z?`: [`Selection`](Selection.md)  } = `labelAlt`

#### Type declaration

▸ (`this`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Axis`](Axis.md) |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x?` | [`Selection`](Selection.md) |
| `y?` | [`Selection`](Selection.md) |
| `z?` | [`Selection`](Selection.md) |

#### Defined in

[prefabs/Axis/Axis.ts:122](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L122)

## Methods

### setCoT

▸ **setCoT**(): [`Selection`](Selection.md)

#### Returns

[`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:60](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L60)

___

### setScales

▸ **setScales**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `x` | \{ `domain`: `any` = domainX; `range`: `number`[] = rangeX; `scale`: `any` = scaleX } |
| `x.domain` | `any` |
| `x.range` | `number`[] |
| `x.scale` | `any` |
| `y` | \{ `domain`: `any` = domainY; `range`: `number`[] = rangeY; `scale`: `any` = scaleY } |
| `y.domain` | `any` |
| `y.range` | `number`[] |
| `y.scale` | `any` |
| `z` | \{ `domain`: `any` = domainZ; `range`: `number`[] = rangeZ; `scale`: `any` = scaleZ } |
| `z.domain` | `any` |
| `z.range` | `number`[] |
| `z.scale` | `any` |

#### Defined in

[prefabs/Axis/Axis.ts:71](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Axis/Axis.ts#L71)
