[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / SequentialChromatic

# Class: SequentialChromatic

## Table of contents

### Constructors

- [constructor](SequentialChromatic.md#constructor)

### Properties

- [scheme](SequentialChromatic.md#scheme)

### Methods

- [toColor3](SequentialChromatic.md#tocolor3)
- [toColor4](SequentialChromatic.md#tocolor4)
- [toPBRMaterialGlossy](SequentialChromatic.md#topbrmaterialglossy)
- [toPBRMaterialRough](SequentialChromatic.md#topbrmaterialrough)
- [toStandardMaterial](SequentialChromatic.md#tostandardmaterial)

## Constructors

### constructor

• **new SequentialChromatic**(`scheme`): [`SequentialChromatic`](SequentialChromatic.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `string` \| `string`[] |

#### Returns

[`SequentialChromatic`](SequentialChromatic.md)

#### Defined in

[prefabs/Chromatic/Chromatic.ts:36](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Chromatic/Chromatic.ts#L36)

## Properties

### scheme

• **scheme**: `string`[]

#### Defined in

[prefabs/Chromatic/Chromatic.ts:34](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Chromatic/Chromatic.ts#L34)

## Methods

### toColor3

▸ **toColor3**(`steps?`): (`d`: `number`) => `Color3`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `undefined` \| `number` \| `number`[] | `undefined` |

#### Returns

`fn`

▸ (`d`): `Color3`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `number` |

##### Returns

`Color3`

#### Defined in

[prefabs/Chromatic/Chromatic.ts:40](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Chromatic/Chromatic.ts#L40)

___

### toColor4

▸ **toColor4**(`steps?`): (`d`: `number`) => `Color4`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `undefined` \| `number` \| `number`[] | `undefined` |

#### Returns

`fn`

▸ (`d`): `Color4`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `number` |

##### Returns

`Color4`

#### Defined in

[prefabs/Chromatic/Chromatic.ts:47](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Chromatic/Chromatic.ts#L47)

___

### toPBRMaterialGlossy

▸ **toPBRMaterialGlossy**(`steps?`): (`d`: `number`) => `PBRSpecularGlossinessMaterial`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `undefined` \| `number` \| `number`[] | `undefined` |

#### Returns

`fn`

▸ (`d`): `PBRSpecularGlossinessMaterial`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `number` |

##### Returns

`PBRSpecularGlossinessMaterial`

#### Defined in

[prefabs/Chromatic/Chromatic.ts:62](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Chromatic/Chromatic.ts#L62)

___

### toPBRMaterialRough

▸ **toPBRMaterialRough**(`steps?`): (`d`: `number`) => `PBRMetallicRoughnessMaterial`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `undefined` \| `number` \| `number`[] | `undefined` |

#### Returns

`fn`

▸ (`d`): `PBRMetallicRoughnessMaterial`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `number` |

##### Returns

`PBRMetallicRoughnessMaterial`

#### Defined in

[prefabs/Chromatic/Chromatic.ts:57](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Chromatic/Chromatic.ts#L57)

___

### toStandardMaterial

▸ **toStandardMaterial**(`steps?`): (`d`: `number`) => `StandardMaterial`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `undefined` \| `number` \| `number`[] | `undefined` |

#### Returns

`fn`

▸ (`d`): `StandardMaterial`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `number` |

##### Returns

`StandardMaterial`

#### Defined in

[prefabs/Chromatic/Chromatic.ts:52](https://github.com/jpmorganchase/anu/blob/4a68614/src/prefabs/Chromatic/Chromatic.ts#L52)
