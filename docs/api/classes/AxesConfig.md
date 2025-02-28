[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / AxesConfig

# Class: AxesConfig

Configuration class for setting up axes in a 3D scene.

## Table of contents

### Constructors

- [constructor](AxesConfig.md#constructor)

### Properties

- [atlas](AxesConfig.md#atlas)
- [background](AxesConfig.md#background)
- [backgroundOptions](AxesConfig.md#backgroundoptions)
- [backgroundPosition](AxesConfig.md#backgroundposition)
- [backgroundProperties](AxesConfig.md#backgroundproperties)
- [domain](AxesConfig.md#domain)
- [domainMaterialOptions](AxesConfig.md#domainmaterialoptions)
- [domainOptions](AxesConfig.md#domainoptions)
- [domainProperties](AxesConfig.md#domainproperties)
- [grid](AxesConfig.md#grid)
- [gridOptions](AxesConfig.md#gridoptions)
- [gridProperties](AxesConfig.md#gridproperties)
- [gridTicks](AxesConfig.md#gridticks)
- [label](AxesConfig.md#label)
- [labelFormat](AxesConfig.md#labelformat)
- [labelMargin](AxesConfig.md#labelmargin)
- [labelOptions](AxesConfig.md#labeloptions)
- [labelProperties](AxesConfig.md#labelproperties)
- [labelTicks](AxesConfig.md#labelticks)
- [parent](AxesConfig.md#parent)
- [scale](AxesConfig.md#scale)

## Constructors

### constructor

• **new AxesConfig**(`scales`): [`AxesConfig`](AxesConfig.md)

Constructs an AxesConfig instance with the given scales.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scales` | `AxesScales` | The scales for the axes. |

#### Returns

[`AxesConfig`](AxesConfig.md)

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:178](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L178)

## Properties

### atlas

• `Optional` **atlas**: `Texture`

Texture atlas for the labels.

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:172](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L172)

___

### background

• `Optional` **background**: `boolean` \| \{ `x?`: `boolean` ; `y?`: `boolean` ; `z?`: `boolean`  }

Render the background or not. Can be a boolean or an object specifying each axis.

**`Default`**

```ts
{x: true, y: true, z: true}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:89](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L89)

___

### backgroundOptions

• `Optional` **backgroundOptions**: {} \| \{ `backUVs?`: `Vector4` ; `frontUVs?`: `Vector4` ; `height?`: `number` ; `sideOrientation?`: `number` ; `size?`: `number` ; `sourcePlane?`: `Plane` ; `updatable?`: `boolean` ; `width?`: `number`  } \| \{ `x?`: \{ `backUVs?`: `Vector4` ; `frontUVs?`: `Vector4` ; `height?`: `number` ; `sideOrientation?`: `number` ; `size?`: `number` ; `sourcePlane?`: `Plane` ; `updatable?`: `boolean` ; `width?`: `number`  } ; `y?`: \{ `backUVs?`: `Vector4` ; `frontUVs?`: `Vector4` ; `height?`: `number` ; `sideOrientation?`: `number` ; `size?`: `number` ; `sourcePlane?`: `Plane` ; `updatable?`: `boolean` ; `width?`: `number`  } ; `z?`: \{ `backUVs?`: `Vector4` ; `frontUVs?`: `Vector4` ; `height?`: `number` ; `sideOrientation?`: `number` ; `size?`: `number` ; `sourcePlane?`: `Plane` ; `updatable?`: `boolean` ; `width?`: `number`  }  }

Initial options for the background planes.

**`Default`**

```ts
{x: {}, y: {}, z: {}}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:95](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L95)

___

### backgroundPosition

• `Optional` **backgroundPosition**: `Object`

Position of the background planes.

**`Default`**

```ts
{x: 0, y: 0, z: 0}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | ``0`` \| ``1`` |
| `y?` | ``0`` \| ``1`` |
| `z?` | ``0`` \| ``1`` |

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:107](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L107)

___

### backgroundProperties

• `Optional` **backgroundProperties**: {} \| `Partial`\<`Pick`\<`Mesh`, `PropertyKeys`\<`Mesh`\>\>\> \| \{ `x?`: `Partial`\<`Pick`\<`Mesh`, `PropertyKeys`\<`Mesh`\>\>\> ; `y?`: `Partial`\<`Pick`\<`Mesh`, `PropertyKeys`\<`Mesh`\>\>\> ; `z?`: `Partial`\<`Pick`\<`Mesh`, `PropertyKeys`\<`Mesh`\>\>\>  }

Properties of the background planes.

**`Default`**

```ts
{x: {}, y: {}, z: {}}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:101](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L101)

___

### domain

• `Optional` **domain**: `boolean` \| \{ `x?`: `boolean` ; `y?`: `boolean` ; `z?`: `boolean`  }

Render the domain or not. Can be a boolean or an object specifying each axis.

**`Default`**

```ts
{x: true, y: true, z: true}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:65](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L65)

___

### domainMaterialOptions

• `Optional` **domainMaterialOptions**: `GreasedLineMaterialBuilderOptions` = `{}`

Initial options of the GreasedLine material.

**`Default`**

```ts
{}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:77](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L77)

___

### domainOptions

• `Optional` **domainOptions**: {} \| `GreasedLineMeshBuilderOptions` = `{}`

Initial options of the GreasedLine mesh.

**`Default`**

```ts
{}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:71](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L71)

___

### domainProperties

• `Optional` **domainProperties**: `Partial`\<`Pick`\<`GreasedLineMesh`, `PropertyKeys`\<`GreasedLineMesh`\>\>\> = `{}`

Properties of the GreasedLine mesh.

**`Default`**

```ts
{}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:83](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L83)

___

### grid

• `Optional` **grid**: `boolean` \| \{ `x?`: `boolean` ; `y?`: `boolean` ; `z?`: `boolean`  }

Render the grid lines or not. Can be a boolean or an object specifying each axis.

**`Default`**

```ts
{x: true, y: true, z: true}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:113](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L113)

___

### gridOptions

• `Optional` **gridOptions**: {} \| \{ `colors?`: `Color4`[][] ; `instance?`: `LinesMesh` ; `lines`: `Vector3`[][] ; `material?`: `Material` ; `updatable?`: `boolean` ; `useVertexAlpha?`: `boolean`  } \| \{ `x?`: \{ `colors?`: `Color4`[][] ; `instance?`: `LinesMesh` ; `lines`: `Vector3`[][] ; `material?`: `Material` ; `updatable?`: `boolean` ; `useVertexAlpha?`: `boolean`  } ; `y?`: \{ `colors?`: `Color4`[][] ; `instance?`: `LinesMesh` ; `lines`: `Vector3`[][] ; `material?`: `Material` ; `updatable?`: `boolean` ; `useVertexAlpha?`: `boolean`  } ; `z?`: \{ `colors?`: `Color4`[][] ; `instance?`: `LinesMesh` ; `lines`: `Vector3`[][] ; `material?`: `Material` ; `updatable?`: `boolean` ; `useVertexAlpha?`: `boolean`  }  }

Initial options of the LineSystem mesh.

**`Default`**

```ts
{x: {}, y: {}, z: {}}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:119](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L119)

___

### gridProperties

• `Optional` **gridProperties**: {} \| `Partial`\<`Pick`\<`LinesMesh`, `PropertyKeys`\<`LinesMesh`\>\>\> \| \{ `x?`: `Partial`\<`Pick`\<`LinesMesh`, `PropertyKeys`\<`LinesMesh`\>\>\> ; `y?`: `Partial`\<`Pick`\<`LinesMesh`, `PropertyKeys`\<`LinesMesh`\>\>\> ; `z?`: `Partial`\<`Pick`\<`LinesMesh`, `PropertyKeys`\<`LinesMesh`\>\>\>  }

Properties of the LineSystem mesh.

**`Default`**

```ts
{x: {}, y: {}, z: {}}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:125](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L125)

___

### gridTicks

• `Optional` **gridTicks**: `Object`

Array of values for ticks to be drawn.

**`Default`**

```ts
{x: undefined, y: undefined, z: undefined}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | (`string` \| `number`)[] |
| `y?` | (`string` \| `number`)[] |
| `z?` | (`string` \| `number`)[] |

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:131](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L131)

___

### label

• `Optional` **label**: `boolean` \| \{ `x?`: `boolean` ; `y?`: `boolean` ; `z?`: `boolean`  }

Render the labels or not. Can be a boolean or an object specifying each axis.

**`Default`**

```ts
{x: true, y: true, z: true}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:137](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L137)

___

### labelFormat

• `Optional` **labelFormat**: `Object`

A function that formats the label text.

**`Default`**

```ts
{x: undefined, y: undefined, z: undefined}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | (`d`: `string`) => `string` |
| `y?` | (`d`: `string`) => `string` |
| `z?` | (`d`: `string`) => `string` |

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:161](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L161)

___

### labelMargin

• `Optional` **labelMargin**: `Object`

Margin for the labels.

**`Default`**

```ts
{x: 0.15, y: 0.15, z: 0.15}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | `number` |
| `y?` | `number` |
| `z?` | `number` |

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:167](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L167)

___

### labelOptions

• `Optional` **labelOptions**: {} \| `PlaneTextOptions` \| \{ `x?`: `PlaneTextOptions` ; `y?`: `PlaneTextOptions` ; `z?`: `PlaneTextOptions`  }

Initial options of the PlaneText mesh.

**`Default`**

```ts
{x: {}, y: {}, z: {}}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:143](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L143)

___

### labelProperties

• `Optional` **labelProperties**: {} \| `Partial`\<`Pick`\<[`PlaneText`](PlaneText.md), `PropertyKeys`\<`Mesh`\>\>\> \| \{ `x?`: `Partial`\<`Pick`\<[`PlaneText`](PlaneText.md), `PropertyKeys`\<`Mesh`\>\>\> ; `y?`: `Partial`\<`Pick`\<[`PlaneText`](PlaneText.md), `PropertyKeys`\<`Mesh`\>\>\> ; `z?`: `Partial`\<`Pick`\<[`PlaneText`](PlaneText.md), `PropertyKeys`\<`Mesh`\>\>\>  }

Properties of the PlaneText mesh.

**`Default`**

```ts
{x: {}, y: {}, z: {}}
```

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:149](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L149)

___

### labelTicks

• `Optional` **labelTicks**: `Object`

Array of values for ticks to be drawn.

**`Default`**

```ts
{x: undefined, y: undefined, z: undefined}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | (`string` \| `number`)[] |
| `y?` | (`string` \| `number`)[] |
| `z?` | (`string` \| `number`)[] |

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:155](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L155)

___

### parent

• `Optional` **parent**: `Node` \| [`Selection`](Selection.md)

Selection that defines the parent node. If not set, a parent node will be created at the root of the scene graph.

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:59](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L59)

___

### scale

• `Optional` **scale**: `Object`

The scale(s) of the axes you want to render. At least one is required.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x?` | `any` |
| `y?` | `any` |
| `z?` | `any` |

#### Defined in

[src/prefabs/Axis/AxisOptions.ts:54](https://github.com/jpmorganchase/anu/blob/7421a80/src/prefabs/Axis/AxisOptions.ts#L54)
