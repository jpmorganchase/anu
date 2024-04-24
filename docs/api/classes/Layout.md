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

[prefabs/Layout/Layout.ts:23](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L23)

## Properties

### currentLayout

• **currentLayout**: `Number` = `0`

#### Defined in

[prefabs/Layout/Layout.ts:20](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L20)

___

### name

• **name**: `string`

#### Defined in

[prefabs/Layout/Layout.ts:17](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L17)

___

### options

• **options**: `LayoutOptions`

#### Defined in

[prefabs/Layout/Layout.ts:18](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L18)

___

### root

• **root**: `Mesh`

#### Defined in

[prefabs/Layout/Layout.ts:21](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L21)

___

### scene

• **scene**: `Scene`

#### Defined in

[prefabs/Layout/Layout.ts:19](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L19)

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

[prefabs/Layout/Layout.ts:182](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L182)

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

[prefabs/Layout/Layout.ts:195](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L195)

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

[prefabs/Layout/Layout.ts:210](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L210)

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

[prefabs/Layout/Layout.ts:124](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L124)

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

[prefabs/Layout/Layout.ts:223](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L223)

___

### cylinderLayout

▸ **cylinderLayout**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[prefabs/Layout/Layout.ts:53](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L53)

___

### planeLayout

▸ **planeLayout**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[prefabs/Layout/Layout.ts:31](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L31)

___

### sphereLayout

▸ **sphereLayout**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[prefabs/Layout/Layout.ts:91](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L91)

___

### update

▸ **update**(): [`Layout`](Layout.md)

#### Returns

[`Layout`](Layout.md)

#### Defined in

[prefabs/Layout/Layout.ts:171](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Layout/Layout.ts#L171)
