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

[src/prefabs/Chromatic/Chromatic.ts:58](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Chromatic/Chromatic.ts#L58)

## Properties

### scheme

• **scheme**: `string`[]

#### Defined in

[src/prefabs/Chromatic/Chromatic.ts:56](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Chromatic/Chromatic.ts#L56)

## Methods

### toColor3

▸ **toColor3**(`steps?`): (`d`: `number`) => `Color3`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `number` \| `number`[] | `undefined` |

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

[src/prefabs/Chromatic/Chromatic.ts:62](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Chromatic/Chromatic.ts#L62)

___

### toColor4

▸ **toColor4**(`steps?`): (`d`: `number`) => `Color4`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `number` \| `number`[] | `undefined` |

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

[src/prefabs/Chromatic/Chromatic.ts:68](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Chromatic/Chromatic.ts#L68)

___

### toPBRMaterialGlossy

▸ **toPBRMaterialGlossy**(`steps?`): (`d`: `number`) => `PBRSpecularGlossinessMaterial`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `number` \| `number`[] | `undefined` |

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

[src/prefabs/Chromatic/Chromatic.ts:86](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Chromatic/Chromatic.ts#L86)

___

### toPBRMaterialRough

▸ **toPBRMaterialRough**(`steps?`): (`d`: `number`) => `PBRMetallicRoughnessMaterial`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `number` \| `number`[] | `undefined` |

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

[src/prefabs/Chromatic/Chromatic.ts:80](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Chromatic/Chromatic.ts#L80)

___

### toStandardMaterial

▸ **toStandardMaterial**(`steps?`): (`d`: `number`) => `StandardMaterial`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `steps` | `number` \| `number`[] | `undefined` |

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

[src/prefabs/Chromatic/Chromatic.ts:74](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Chromatic/Chromatic.ts#L74)
