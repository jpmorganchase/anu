[anu](../README.md) / [Exports](../modules.md) / Axis

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

• **new Axis**(`name`, `scene`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |
| `options` | `AxisOptions` |

#### Defined in

[prefabs/Axis/Axis.ts:56](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L56)

## Properties

### CoT

• **CoT**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:42](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L42)

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

[prefabs/Axis/Axis.ts:45](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L45)

___

### domain

• **domain**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:44](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L44)

___

### grid

• **grid**: [`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:46](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L46)

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

[prefabs/Axis/Axis.ts:47](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L47)

___

### name

• **name**: `string`

#### Defined in

[prefabs/Axis/Axis.ts:39](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L39)

___

### options

• **options**: `AxisOptions`

#### Defined in

[prefabs/Axis/Axis.ts:40](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L40)

___

### scales

• **scales**: `any`

#### Defined in

[prefabs/Axis/Axis.ts:43](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L43)

___

### scene

• **scene**: `Scene`

#### Defined in

[prefabs/Axis/Axis.ts:41](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L41)

___

### setBackground

• `Private` **setBackground**: (`this`: [`Axis`](Axis.md)) => { `x?`: [`Selection`](Selection.md) ; `y?`: [`Selection`](Selection.md) ; `z?`: [`Selection`](Selection.md)  } = `backgroundAlt`

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

[prefabs/Axis/Axis.ts:130](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L130)

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

[prefabs/Axis/Axis.ts:129](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L129)

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

[prefabs/Axis/Axis.ts:131](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L131)

___

### setLabel

• `Private` **setLabel**: (`this`: [`Axis`](Axis.md)) => { `x?`: [`Selection`](Selection.md) ; `y?`: [`Selection`](Selection.md) ; `z?`: [`Selection`](Selection.md)  } = `labelAlt`

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

[prefabs/Axis/Axis.ts:132](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L132)

## Methods

### setCoT

▸ `Private` **setCoT**(): [`Selection`](Selection.md)

#### Returns

[`Selection`](Selection.md)

#### Defined in

[prefabs/Axis/Axis.ts:70](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L70)

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

[prefabs/Axis/Axis.ts:81](https://github.com/jpmorganchase/anu/blob/3b53efa/src/prefabs/Axis/Axis.ts#L81)
