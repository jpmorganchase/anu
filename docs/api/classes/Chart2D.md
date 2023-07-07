[anu](../README.md) / [Exports](../modules.md) / Chart2D

# Class: Chart2D

## Table of contents

### Constructors

- [constructor](Chart2D.md#constructor)

### Properties

- [axes](Chart2D.md#axes)
- [background](Chart2D.md#background)
- [color](Chart2D.md#color)
- [cot](Chart2D.md#cot)
- [data](Chart2D.md#data)
- [elements](Chart2D.md#elements)
- [height](Chart2D.md#height)
- [name](Chart2D.md#name)
- [padding](Chart2D.md#padding)
- [scales](Chart2D.md#scales)
- [scene](Chart2D.md#scene)
- [width](Chart2D.md#width)
- [x](Chart2D.md#x)
- [y](Chart2D.md#y)

### Methods

- [makeAxes](Chart2D.md#makeaxes)
- [makeBackground](Chart2D.md#makebackground)
- [makeElements](Chart2D.md#makeelements)
- [makeScales](Chart2D.md#makescales)

## Constructors

### constructor

• **new Chart2D**(`name`, `scene`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `scene` | `Scene` |

#### Defined in

prefabs/Chart2D/Chart2D.ts:22

## Properties

### axes

• **axes**: `Object`

#### Index signature

▪ [index: `string`]: `Axis`

#### Defined in

prefabs/Chart2D/Chart2D.ts:13

___

### background

• **background**: `Object`

#### Index signature

▪ [index: `string`]: [`Selection`](Selection.md)

#### Defined in

prefabs/Chart2D/Chart2D.ts:10

___

### color

• **color**: `Color3` \| { `key`: `string` ; `scale`: `Function`  }

#### Defined in

prefabs/Chart2D/Chart2D.ts:20

___

### cot

• **cot**: [`Selection`](Selection.md)

#### Defined in

prefabs/Chart2D/Chart2D.ts:9

___

### data

• **data**: []

#### Defined in

prefabs/Chart2D/Chart2D.ts:17

___

### elements

• **elements**: `Object`

#### Index signature

▪ [index: `string`]: [`Selection`](Selection.md)

#### Defined in

prefabs/Chart2D/Chart2D.ts:11

___

### height

• **height**: `number`

#### Defined in

prefabs/Chart2D/Chart2D.ts:14

___

### name

• **name**: `string`

#### Defined in

prefabs/Chart2D/Chart2D.ts:7

___

### padding

• **padding**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `left` | `number` |
| `right` | `number` |
| `top` | `number` |

#### Defined in

prefabs/Chart2D/Chart2D.ts:16

___

### scales

• **scales**: `Object`

#### Index signature

▪ [index: `string`]: `Function`

#### Defined in

prefabs/Chart2D/Chart2D.ts:12

___

### scene

• **scene**: `Scene`

#### Defined in

prefabs/Chart2D/Chart2D.ts:8

___

### width

• **width**: `number`

#### Defined in

prefabs/Chart2D/Chart2D.ts:15

___

### x

• **x**: `string`

#### Defined in

prefabs/Chart2D/Chart2D.ts:18

___

### y

• **y**: `string`

#### Defined in

prefabs/Chart2D/Chart2D.ts:19

## Methods

### makeAxes

▸ `Abstract` **makeAxes**(): `void`

#### Returns

`void`

#### Defined in

prefabs/Chart2D/Chart2D.ts:53

___

### makeBackground

▸ **makeBackground**(`height`, `width`, `padding`, `color`, `backgroundAlpha`): [`Chart2D`](Chart2D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |
| `padding` | `Object` |
| `padding.bottom` | `number` |
| `padding.left` | `number` |
| `padding.right` | `number` |
| `padding.top` | `number` |
| `color` | `Color3` |
| `backgroundAlpha` | `number` |

#### Returns

[`Chart2D`](Chart2D.md)

#### Defined in

prefabs/Chart2D/Chart2D.ts:28

___

### makeElements

▸ `Abstract` **makeElements**(`color`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `Color3` \| { `key`: `string` ; `scale`: `Function`  } |

#### Returns

`void`

#### Defined in

prefabs/Chart2D/Chart2D.ts:52

___

### makeScales

▸ `Abstract` **makeScales**(`data`, `x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [] |
| `x` | `string` |
| `y` | `string` |

#### Returns

`void`

#### Defined in

prefabs/Chart2D/Chart2D.ts:51
