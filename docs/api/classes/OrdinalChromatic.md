[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / OrdinalChromatic

# Class: OrdinalChromatic

## Table of contents

### Constructors

- [constructor](OrdinalChromatic.md#constructor)

### Properties

- [scheme](OrdinalChromatic.md#scheme)

### Methods

- [toColor3](OrdinalChromatic.md#tocolor3)
- [toColor4](OrdinalChromatic.md#tocolor4)
- [toPBRMaterialGlossy](OrdinalChromatic.md#topbrmaterialglossy)
- [toPBRMaterialRough](OrdinalChromatic.md#topbrmaterialrough)
- [toStandardMaterial](OrdinalChromatic.md#tostandardmaterial)

## Constructors

### constructor

• **new OrdinalChromatic**(`scheme`): [`OrdinalChromatic`](OrdinalChromatic.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `string` \| `string`[] |

#### Returns

[`OrdinalChromatic`](OrdinalChromatic.md)

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:15](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Chromatic/Chromatic.ts#L15)

## Properties

### scheme

• **scheme**: `string`[]

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:13](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Chromatic/Chromatic.ts#L13)

## Methods

### toColor3

▸ **toColor3**(`steps?`): `Color3`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `steps` | `number` |

#### Returns

`Color3`[]

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:19](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Chromatic/Chromatic.ts#L19)

___

### toColor4

▸ **toColor4**(`steps?`): `Color4`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `steps` | `number` |

#### Returns

`Color4`[]

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:26](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Chromatic/Chromatic.ts#L26)

___

### toPBRMaterialGlossy

▸ **toPBRMaterialGlossy**(`steps?`): `PBRSpecularGlossinessMaterial`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `steps` | `number` |

#### Returns

`PBRSpecularGlossinessMaterial`[]

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:47](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Chromatic/Chromatic.ts#L47)

___

### toPBRMaterialRough

▸ **toPBRMaterialRough**(`steps?`): `PBRMetallicRoughnessMaterial`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `steps` | `number` |

#### Returns

`PBRMetallicRoughnessMaterial`[]

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:40](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Chromatic/Chromatic.ts#L40)

___

### toStandardMaterial

▸ **toStandardMaterial**(`steps?`): `StandardMaterial`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `steps` | `number` |

#### Returns

`StandardMaterial`[]

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:33](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Chromatic/Chromatic.ts#L33)
