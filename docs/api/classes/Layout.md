[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / Layout

# Class: Layout

## Table of contents

### Constructors

- [constructor](Layout.md#constructor)

### Properties

- [currentLayout](Layout.md#currentlayout)
- [name](Layout.md#name)
- [options](Layout.md#options)
- [root](Layout.md#root)
- [scene](Layout.md#scene)

### Methods

- [animatePosition](Layout.md#animateposition)
- [animateRotation](Layout.md#animaterotation)
- [animateScale](Layout.md#animatescale)
- [attr](Layout.md#attr)
- [boundingBoxLocal](Layout.md#boundingboxlocal)
- [cylinderLayout](Layout.md#cylinderlayout)
- [planeLayout](Layout.md#planelayout)
- [sphereLayout](Layout.md#spherelayout)
- [update](Layout.md#update)

## Constructors

### constructor

• **new Layout**(`name`, `options`, `scene`): [`Layout`](Layout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `LayoutOptions` |
| `scene` | `Scene` |

#### Returns

[`Layout`](Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:32](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L32)

## Properties

### currentLayout

• **currentLayout**: `Number` = `0`

#### Defined in

[src/prefabs/Layout/Layout.ts:29](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L29)

___

### name

• **name**: `string`

#### Defined in

[src/prefabs/Layout/Layout.ts:26](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L26)

___

### options

• **options**: `LayoutOptions`

#### Defined in

[src/prefabs/Layout/Layout.ts:27](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L27)

___

### root

• **root**: `Mesh`

#### Defined in

[src/prefabs/Layout/Layout.ts:30](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L30)

___

### scene

• **scene**: `Scene`

#### Defined in

[src/prefabs/Layout/Layout.ts:28](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L28)

## Methods

### animatePosition

▸ **animatePosition**(`obj`, `newPos`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `TransformNode` |
| `newPos` | `Vector3` |

#### Returns

`void`

#### Defined in

[src/prefabs/Layout/Layout.ts:188](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L188)

___

### animateRotation

▸ **animateRotation**(`obj`, `newRot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `TransformNode` |
| `newRot` | `Vector3` |

#### Returns

`void`

#### Defined in

[src/prefabs/Layout/Layout.ts:207](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L207)

___

### animateScale

▸ **animateScale**(`obj`, `newScale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `TransformNode` |
| `newScale` | `Vector3` |

#### Returns

`void`

#### Defined in

[src/prefabs/Layout/Layout.ts:227](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L227)

___

### attr

▸ **attr**(`s`, `val`): [`Layout`](Layout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |
| `val` | `object` |

#### Returns

[`Layout`](Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:143](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L143)

___

### boundingBoxLocal

▸ **boundingBoxLocal**(`selection`): `BoundingInfo`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selection` | [`Selection`](Selection.md) |

#### Returns

`BoundingInfo`

#### Defined in

[src/prefabs/Layout/Layout.ts:246](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L246)

___

### cylinderLayout

▸ **cylinderLayout**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:69](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L69)

___

### planeLayout

▸ **planeLayout**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:40](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L40)

___

### sphereLayout

▸ **sphereLayout**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:107](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L107)

___

### update

▸ **update**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[src/prefabs/Layout/Layout.ts:180](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Layout/Layout.ts#L180)
