[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / MeshMap

# Class: MeshMap

## Hierarchy

- `TransformNode`

  ↳ **`MeshMap`**

## Table of contents

### Constructors

- [constructor](MeshMap.md#constructor)

### Properties

- [\_accessibilityTag](MeshMap.md#_accessibilitytag)
- [\_cache](MeshMap.md#_cache)
- [\_childUpdateId](MeshMap.md#_childupdateid)
- [\_children](MeshMap.md#_children)
- [\_currentRenderId](MeshMap.md#_currentrenderid)
- [\_disposePhysicsObserver](MeshMap.md#_disposephysicsobserver)
- [\_indexInSceneTransformNodesArray](MeshMap.md#_indexinscenetransformnodesarray)
- [\_internalMetadata](MeshMap.md#_internalmetadata)
- [\_isDirty](MeshMap.md#_isdirty)
- [\_isNode](MeshMap.md#_isnode)
- [\_isWorldMatrixFrozen](MeshMap.md#_isworldmatrixfrozen)
- [\_localMatrix](MeshMap.md#_localmatrix)
- [\_parentContainer](MeshMap.md#_parentcontainer)
- [\_parentNode](MeshMap.md#_parentnode)
- [\_physicsBody](MeshMap.md#_physicsbody)
- [\_poseMatrix](MeshMap.md#_posematrix)
- [\_postMultiplyPivotMatrix](MeshMap.md#_postmultiplypivotmatrix)
- [\_ranges](MeshMap.md#_ranges)
- [\_scaling](MeshMap.md#_scaling)
- [\_scene](MeshMap.md#_scene)
- [\_waitingParentId](MeshMap.md#_waitingparentid)
- [\_waitingParentInstanceIndex](MeshMap.md#_waitingparentinstanceindex)
- [\_waitingParsedUniqueId](MeshMap.md#_waitingparseduniqueid)
- [\_worldMatrix](MeshMap.md#_worldmatrix)
- [\_worldMatrixDeterminant](MeshMap.md#_worldmatrixdeterminant)
- [\_worldMatrixDeterminantIsDirty](MeshMap.md#_worldmatrixdeterminantisdirty)
- [animations](MeshMap.md#animations)
- [cot](MeshMap.md#cot)
- [customMarkAsDirty](MeshMap.md#custommarkasdirty)
- [depth](MeshMap.md#depth)
- [geoJson](MeshMap.md#geojson)
- [id](MeshMap.md#id)
- [ignoreNonUniformScaling](MeshMap.md#ignorenonuniformscaling)
- [inspectableCustomProperties](MeshMap.md#inspectablecustomproperties)
- [metadata](MeshMap.md#metadata)
- [name](MeshMap.md#name)
- [onAccessibilityTagChangedObservable](MeshMap.md#onaccessibilitytagchangedobservable)
- [onAfterWorldMatrixUpdateObservable](MeshMap.md#onafterworldmatrixupdateobservable)
- [onDisposeObservable](MeshMap.md#ondisposeobservable)
- [onReady](MeshMap.md#onready)
- [physicsBody](MeshMap.md#physicsbody)
- [projection](MeshMap.md#projection)
- [reIntegrateRotationIntoRotationQuaternion](MeshMap.md#reintegraterotationintorotationquaternion)
- [reservedDataStore](MeshMap.md#reserveddatastore)
- [scalingDeterminant](MeshMap.md#scalingdeterminant)
- [scene](MeshMap.md#scene)
- [selection](MeshMap.md#selection)
- [simplification](MeshMap.md#simplification)
- [size](MeshMap.md#size)
- [state](MeshMap.md#state)
- [transform](MeshMap.md#transform)
- [uniqueId](MeshMap.md#uniqueid)
- [BILLBOARDMODE\_ALL](MeshMap.md#billboardmode_all)
- [BILLBOARDMODE\_NONE](MeshMap.md#billboardmode_none)
- [BILLBOARDMODE\_USE\_POSITION](MeshMap.md#billboardmode_use_position)
- [BILLBOARDMODE\_X](MeshMap.md#billboardmode_x)
- [BILLBOARDMODE\_Y](MeshMap.md#billboardmode_y)
- [BILLBOARDMODE\_Z](MeshMap.md#billboardmode_z)
- [BillboardUseParentOrientation](MeshMap.md#billboarduseparentorientation)
- [\_AnimationRangeFactory](MeshMap.md#_animationrangefactory)

### Accessors

- [absolutePosition](MeshMap.md#absoluteposition)
- [absoluteRotationQuaternion](MeshMap.md#absoluterotationquaternion)
- [absoluteScaling](MeshMap.md#absolutescaling)
- [accessibilityTag](MeshMap.md#accessibilitytag)
- [animationPropertiesOverride](MeshMap.md#animationpropertiesoverride)
- [behaviors](MeshMap.md#behaviors)
- [billboardMode](MeshMap.md#billboardmode)
- [doNotSerialize](MeshMap.md#donotserialize)
- [forward](MeshMap.md#forward)
- [infiniteDistance](MeshMap.md#infinitedistance)
- [isWorldMatrixFrozen](MeshMap.md#isworldmatrixfrozen)
- [nonUniformScaling](MeshMap.md#nonuniformscaling)
- [onClonedObservable](MeshMap.md#onclonedobservable)
- [onDispose](MeshMap.md#ondispose)
- [onEnabledStateChangedObservable](MeshMap.md#onenabledstatechangedobservable)
- [parent](MeshMap.md#parent)
- [position](MeshMap.md#position)
- [preserveParentRotationForBillboard](MeshMap.md#preserveparentrotationforbillboard)
- [right](MeshMap.md#right)
- [rotation](MeshMap.md#rotation)
- [rotationQuaternion](MeshMap.md#rotationquaternion)
- [scaling](MeshMap.md#scaling)
- [up](MeshMap.md#up)
- [worldMatrixFromCache](MeshMap.md#worldmatrixfromcache)

### Methods

- [\_addToSceneRootNodes](MeshMap.md#_addtoscenerootnodes)
- [\_afterComputeWorldMatrix](MeshMap.md#_aftercomputeworldmatrix)
- [\_getActionManagerForTrigger](MeshMap.md#_getactionmanagerfortrigger)
- [\_getDescendants](MeshMap.md#_getdescendants)
- [\_getEffectiveParent](MeshMap.md#_geteffectiveparent)
- [\_getWorldMatrixDeterminant](MeshMap.md#_getworldmatrixdeterminant)
- [\_initCache](MeshMap.md#_initcache)
- [\_isSynchronized](MeshMap.md#_issynchronized)
- [\_markSyncedWithParent](MeshMap.md#_marksyncedwithparent)
- [\_removeFromSceneRootNodes](MeshMap.md#_removefromscenerootnodes)
- [\_serializeAsParent](MeshMap.md#_serializeasparent)
- [\_setReady](MeshMap.md#_setready)
- [\_syncParentEnabledState](MeshMap.md#_syncparentenabledstate)
- [\_updateCache](MeshMap.md#_updatecache)
- [\_updateNonUniformScalingState](MeshMap.md#_updatenonuniformscalingstate)
- [addBehavior](MeshMap.md#addbehavior)
- [addChild](MeshMap.md#addchild)
- [addRotation](MeshMap.md#addrotation)
- [applyAngularImpulse](MeshMap.md#applyangularimpulse)
- [applyImpulse](MeshMap.md#applyimpulse)
- [attachToBone](MeshMap.md#attachtobone)
- [beginAnimation](MeshMap.md#beginanimation)
- [clone](MeshMap.md#clone)
- [computeWorldMatrix](MeshMap.md#computeworldmatrix)
- [createAnimationRange](MeshMap.md#createanimationrange)
- [createMap](MeshMap.md#createmap)
- [deleteAnimationRange](MeshMap.md#deleteanimationrange)
- [detachFromBone](MeshMap.md#detachfrombone)
- [dispose](MeshMap.md#dispose)
- [freezeWorldMatrix](MeshMap.md#freezeworldmatrix)
- [getAbsolutePivotPoint](MeshMap.md#getabsolutepivotpoint)
- [getAbsolutePivotPointToRef](MeshMap.md#getabsolutepivotpointtoref)
- [getAbsolutePosition](MeshMap.md#getabsoluteposition)
- [getAnimationByName](MeshMap.md#getanimationbyname)
- [getAnimationRange](MeshMap.md#getanimationrange)
- [getAnimationRanges](MeshMap.md#getanimationranges)
- [getBehaviorByName](MeshMap.md#getbehaviorbyname)
- [getChildMeshes](MeshMap.md#getchildmeshes)
- [getChildTransformNodes](MeshMap.md#getchildtransformnodes)
- [getChildren](MeshMap.md#getchildren)
- [getClassName](MeshMap.md#getclassname)
- [getDescendants](MeshMap.md#getdescendants)
- [getDirection](MeshMap.md#getdirection)
- [getDirectionToRef](MeshMap.md#getdirectiontoref)
- [getDistanceToCamera](MeshMap.md#getdistancetocamera)
- [getEngine](MeshMap.md#getengine)
- [getHierarchyBoundingVectors](MeshMap.md#gethierarchyboundingvectors)
- [getPhysicsBody](MeshMap.md#getphysicsbody)
- [getPivotMatrix](MeshMap.md#getpivotmatrix)
- [getPivotPoint](MeshMap.md#getpivotpoint)
- [getPivotPointToRef](MeshMap.md#getpivotpointtoref)
- [getPoseMatrix](MeshMap.md#getposematrix)
- [getPositionExpressedInLocalSpace](MeshMap.md#getpositionexpressedinlocalspace)
- [getPositionInCameraSpace](MeshMap.md#getpositionincameraspace)
- [getScene](MeshMap.md#getscene)
- [getWorldMatrix](MeshMap.md#getworldmatrix)
- [instantiateHierarchy](MeshMap.md#instantiatehierarchy)
- [isDescendantOf](MeshMap.md#isdescendantof)
- [isDisposed](MeshMap.md#isdisposed)
- [isEnabled](MeshMap.md#isenabled)
- [isReady](MeshMap.md#isready)
- [isSynchronized](MeshMap.md#issynchronized)
- [isSynchronizedWithParent](MeshMap.md#issynchronizedwithparent)
- [isUsingPivotMatrix](MeshMap.md#isusingpivotmatrix)
- [isUsingPostMultiplyPivotMatrix](MeshMap.md#isusingpostmultiplypivotmatrix)
- [isWorldMatrixCameraDependent](MeshMap.md#isworldmatrixcameradependent)
- [locallyTranslate](MeshMap.md#locallytranslate)
- [lookAt](MeshMap.md#lookat)
- [markAsDirty](MeshMap.md#markasdirty)
- [normalizeToUnitCube](MeshMap.md#normalizetounitcube)
- [registerAfterWorldMatrixUpdate](MeshMap.md#registerafterworldmatrixupdate)
- [removeBehavior](MeshMap.md#removebehavior)
- [removeChild](MeshMap.md#removechild)
- [resetLocalMatrix](MeshMap.md#resetlocalmatrix)
- [rotate](MeshMap.md#rotate)
- [rotateAround](MeshMap.md#rotatearound)
- [serialize](MeshMap.md#serialize)
- [serializeAnimationRanges](MeshMap.md#serializeanimationranges)
- [setAbsolutePosition](MeshMap.md#setabsoluteposition)
- [setDirection](MeshMap.md#setdirection)
- [setEnabled](MeshMap.md#setenabled)
- [setParent](MeshMap.md#setparent)
- [setPivotMatrix](MeshMap.md#setpivotmatrix)
- [setPivotPoint](MeshMap.md#setpivotpoint)
- [setPositionWithLocalVector](MeshMap.md#setpositionwithlocalvector)
- [setPreTransformMatrix](MeshMap.md#setpretransformmatrix)
- [translate](MeshMap.md#translate)
- [unfreezeWorldMatrix](MeshMap.md#unfreezeworldmatrix)
- [unregisterAfterWorldMatrixUpdate](MeshMap.md#unregisterafterworldmatrixupdate)
- [updateCache](MeshMap.md#updatecache)
- [updatePoseMatrix](MeshMap.md#updateposematrix)
- [AddNodeConstructor](MeshMap.md#addnodeconstructor)
- [Construct](MeshMap.md#construct)
- [Parse](MeshMap.md#parse)
- [ParseAnimationRanges](MeshMap.md#parseanimationranges)

## Constructors

### constructor

• **new MeshMap**(`name`, `geoJson`, `projection`, `size`, `transform`, `simplification`, `depth`, `scene?`): [`MeshMap`](MeshMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `geoJson` | `GeoGeometryObjects` |
| `projection` | `GeoProjection` |
| `size` | [`number`, `number`] |
| `transform` | [`number`, `number`] |
| `simplification` | `number` |
| `depth` | `number` |
| `scene?` | `Scene` |

#### Returns

[`MeshMap`](MeshMap.md)

#### Overrides

TransformNode.constructor

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:25](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L25)

## Properties

### \_accessibilityTag

• `Protected` **\_accessibilityTag**: `IAccessibilityTag`

#### Inherited from

TransformNode.\_accessibilityTag

#### Defined in

node_modules/@babylonjs/core/node.d.ts:82

___

### \_cache

• **\_cache**: `any`

#### Inherited from

TransformNode.\_cache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:119

___

### \_childUpdateId

• **\_childUpdateId**: `number`

#### Inherited from

TransformNode.\_childUpdateId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:109

___

### \_children

• `Protected` **\_children**: `Node`[]

#### Inherited from

TransformNode.\_children

#### Defined in

node_modules/@babylonjs/core/node.d.ts:122

___

### \_currentRenderId

• **\_currentRenderId**: `number`

#### Inherited from

TransformNode.\_currentRenderId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:106

___

### \_disposePhysicsObserver

• **\_disposePhysicsObserver**: `Observer`\<`Node`\>

#### Inherited from

TransformNode.\_disposePhysicsObserver

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:35

___

### \_indexInSceneTransformNodesArray

• **\_indexInSceneTransformNodesArray**: `number`

#### Inherited from

TransformNode.\_indexInSceneTransformNodesArray

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:112

___

### \_internalMetadata

• **\_internalMetadata**: `any`

#### Inherited from

TransformNode.\_internalMetadata

#### Defined in

node_modules/@babylonjs/core/node.d.ts:67

___

### \_isDirty

• `Protected` **\_isDirty**: `boolean`

#### Inherited from

TransformNode.\_isDirty

#### Defined in

node_modules/@babylonjs/core/node.d.ts:24

___

### \_isNode

• `Readonly` **\_isNode**: ``true``

#### Inherited from

TransformNode.\_isNode

#### Defined in

node_modules/@babylonjs/core/node.d.ts:160

___

### \_isWorldMatrixFrozen

• `Protected` **\_isWorldMatrixFrozen**: `boolean`

#### Inherited from

TransformNode.\_isWorldMatrixFrozen

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:110

___

### \_localMatrix

• **\_localMatrix**: `Matrix`

#### Inherited from

TransformNode.\_localMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:101

___

### \_parentContainer

• **\_parentContainer**: `IAssetContainer`

#### Inherited from

TransformNode.\_parentContainer

#### Defined in

node_modules/@babylonjs/core/node.d.ts:93

___

### \_parentNode

• `Protected` **\_parentNode**: `Node`

#### Inherited from

TransformNode.\_parentNode

#### Defined in

node_modules/@babylonjs/core/node.d.ts:120

___

### \_physicsBody

• **\_physicsBody**: `PhysicsBody`

#### Inherited from

TransformNode.\_physicsBody

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:14

___

### \_poseMatrix

• **\_poseMatrix**: `Matrix`

#### Inherited from

TransformNode.\_poseMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:99

___

### \_postMultiplyPivotMatrix

• **\_postMultiplyPivotMatrix**: `boolean`

#### Inherited from

TransformNode.\_postMultiplyPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:109

___

### \_ranges

• `Protected` **\_ranges**: `Object`

#### Index signature

▪ [name: `string`]: `Nullable`\<`AnimationRange`\>

#### Inherited from

TransformNode.\_ranges

#### Defined in

node_modules/@babylonjs/core/node.d.ts:98

___

### \_scaling

• `Protected` **\_scaling**: `Vector3`

#### Inherited from

TransformNode.\_scaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:52

___

### \_scene

• **\_scene**: `Scene`

#### Inherited from

TransformNode.\_scene

#### Defined in

node_modules/@babylonjs/core/node.d.ts:117

___

### \_waitingParentId

• **\_waitingParentId**: `string`

#### Inherited from

TransformNode.\_waitingParentId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:111

___

### \_waitingParentInstanceIndex

• **\_waitingParentInstanceIndex**: `string`

#### Inherited from

TransformNode.\_waitingParentInstanceIndex

#### Defined in

node_modules/@babylonjs/core/node.d.ts:113

___

### \_waitingParsedUniqueId

• **\_waitingParsedUniqueId**: `number`

#### Inherited from

TransformNode.\_waitingParsedUniqueId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:115

___

### \_worldMatrix

• **\_worldMatrix**: `Matrix`

#### Inherited from

TransformNode.\_worldMatrix

#### Defined in

node_modules/@babylonjs/core/node.d.ts:124

___

### \_worldMatrixDeterminant

• **\_worldMatrixDeterminant**: `number`

#### Inherited from

TransformNode.\_worldMatrixDeterminant

#### Defined in

node_modules/@babylonjs/core/node.d.ts:126

___

### \_worldMatrixDeterminantIsDirty

• **\_worldMatrixDeterminantIsDirty**: `boolean`

#### Inherited from

TransformNode.\_worldMatrixDeterminantIsDirty

#### Defined in

node_modules/@babylonjs/core/node.d.ts:128

___

### animations

• **animations**: `Animation`[]

Gets a list of Animations associated with the node

#### Inherited from

TransformNode.animations

#### Defined in

node_modules/@babylonjs/core/node.d.ts:97

___

### cot

• **cot**: `Node`

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:21](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L21)

___

### customMarkAsDirty

• **customMarkAsDirty**: () => `void`

Allow user to specify custom mechanism for mark as dirty

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

TransformNode.customMarkAsDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:157

___

### depth

• `Optional` **depth**: `number`

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:23](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L23)

___

### geoJson

• **geoJson**: `GeoGeometryObjects`

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:17](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L17)

___

### id

• **id**: `string`

Gets or sets the id of the node

#### Inherited from

TransformNode.id

#### Defined in

node_modules/@babylonjs/core/node.d.ts:53

___

### ignoreNonUniformScaling

• **ignoreNonUniformScaling**: `boolean`

Gets or sets a boolean indicating that non uniform scaling (when at least one component is different from others) should be ignored.
By default the system will update normals to compensate

#### Inherited from

TransformNode.ignoreNonUniformScaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:93

___

### inspectableCustomProperties

• **inspectableCustomProperties**: `IInspectable`[]

List of inspectable custom properties (used by the Inspector)

**`See`**

https://doc.babylonjs.com/toolsAndResources/inspector#extensibility

#### Inherited from

TransformNode.inspectableCustomProperties

#### Defined in

node_modules/@babylonjs/core/node.d.ts:76

___

### metadata

• **metadata**: `any`

Gets or sets an object used to store user defined information for the node

#### Inherited from

TransformNode.metadata

#### Defined in

node_modules/@babylonjs/core/node.d.ts:65

___

### name

• **name**: `string`

#### Overrides

TransformNode.name

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:14](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L14)

___

### onAccessibilityTagChangedObservable

• **onAccessibilityTagChangedObservable**: `Observable`\<`IAccessibilityTag`\>

Observable fired when an accessibility tag is changed

#### Inherited from

TransformNode.onAccessibilityTagChangedObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:86

___

### onAfterWorldMatrixUpdateObservable

• **onAfterWorldMatrixUpdateObservable**: `Observable`\<`TransformNode`\>

An event triggered after the world matrix is updated

#### Inherited from

TransformNode.onAfterWorldMatrixUpdateObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:116

___

### onDisposeObservable

• **onDisposeObservable**: `Observable`\<`Node`\>

An event triggered when the mesh is disposed

#### Inherited from

TransformNode.onDisposeObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:164

___

### onReady

• **onReady**: (`node`: `Node`) => `void`

Callback raised when the node is ready to be used

#### Type declaration

▸ (`node`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

##### Returns

`void`

#### Inherited from

TransformNode.onReady

#### Defined in

node_modules/@babylonjs/core/node.d.ts:104

___

### physicsBody

• **physicsBody**: `PhysicsBody`

**`See`**

#### Inherited from

TransformNode.physicsBody

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:18

___

### projection

• **projection**: `GeoProjection`

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:18](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L18)

___

### reIntegrateRotationIntoRotationQuaternion

• **reIntegrateRotationIntoRotationQuaternion**: `boolean`

Gets or sets a boolean indicating that even if rotationQuaternion is defined, you can keep updating rotation property and Babylon.js will just mix both

#### Inherited from

TransformNode.reIntegrateRotationIntoRotationQuaternion

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:97

___

### reservedDataStore

• **reservedDataStore**: `any`

For internal use only. Please do not use.

#### Inherited from

TransformNode.reservedDataStore

#### Defined in

node_modules/@babylonjs/core/node.d.ts:71

___

### scalingDeterminant

• **scalingDeterminant**: `number`

Multiplication factor on scale x/y/z when computing the world matrix. Eg. for a 1x1x1 cube setting this to 2 will make it a 2x2x2 cube

#### Inherited from

TransformNode.scalingDeterminant

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:82

___

### scene

• `Optional` **scene**: `Scene`

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:15](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L15)

___

### selection

• `Optional` **selection**: [`Selection`](Selection.md)

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:22](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L22)

___

### simplification

• **simplification**: `number`

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:20](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L20)

___

### size

• **size**: [`number`, `number`]

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:16](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L16)

___

### state

• **state**: `string`

Gets or sets a string used to store user defined state for the node

#### Inherited from

TransformNode.state

#### Defined in

node_modules/@babylonjs/core/node.d.ts:61

___

### transform

• **transform**: [`number`, `number`]

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:19](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L19)

___

### uniqueId

• **uniqueId**: `number`

Gets or sets the unique id of the node

#### Inherited from

TransformNode.uniqueId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:57

___

### BILLBOARDMODE\_ALL

▪ `Static` **BILLBOARDMODE\_ALL**: `number`

Object will rotate to face the camera

#### Inherited from

TransformNode.BILLBOARDMODE\_ALL

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:34

___

### BILLBOARDMODE\_NONE

▪ `Static` **BILLBOARDMODE\_NONE**: `number`

Object will not rotate to face the camera

#### Inherited from

TransformNode.BILLBOARDMODE\_NONE

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:18

___

### BILLBOARDMODE\_USE\_POSITION

▪ `Static` **BILLBOARDMODE\_USE\_POSITION**: `number`

Object will rotate to face the camera's position instead of orientation

#### Inherited from

TransformNode.BILLBOARDMODE\_USE\_POSITION

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:38

___

### BILLBOARDMODE\_X

▪ `Static` **BILLBOARDMODE\_X**: `number`

Object will rotate to face the camera but only on the x axis

#### Inherited from

TransformNode.BILLBOARDMODE\_X

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:22

___

### BILLBOARDMODE\_Y

▪ `Static` **BILLBOARDMODE\_Y**: `number`

Object will rotate to face the camera but only on the y axis

#### Inherited from

TransformNode.BILLBOARDMODE\_Y

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:26

___

### BILLBOARDMODE\_Z

▪ `Static` **BILLBOARDMODE\_Z**: `number`

Object will rotate to face the camera but only on the z axis

#### Inherited from

TransformNode.BILLBOARDMODE\_Z

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:30

___

### BillboardUseParentOrientation

▪ `Static` **BillboardUseParentOrientation**: `boolean`

Child transform with Billboard flags should or should not apply parent rotation (default if off)

#### Inherited from

TransformNode.BillboardUseParentOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:42

___

### \_AnimationRangeFactory

▪ `Static` **\_AnimationRangeFactory**: (`_name`: `string`, `_from`: `number`, `_to`: `number`) => `AnimationRange`

#### Type declaration

▸ (`_name`, `_from`, `_to`): `AnimationRange`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_name` | `string` |
| `_from` | `number` |
| `_to` | `number` |

##### Returns

`AnimationRange`

#### Inherited from

TransformNode.\_AnimationRangeFactory

#### Defined in

node_modules/@babylonjs/core/node.d.ts:28

## Accessors

### absolutePosition

• `get` **absolutePosition**(): `Vector3`

Returns the current mesh absolute position.
Returns a Vector3.

#### Returns

`Vector3`

#### Inherited from

TransformNode.absolutePosition

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:190

___

### absoluteRotationQuaternion

• `get` **absoluteRotationQuaternion**(): `Quaternion`

Returns the current mesh absolute rotation.
Returns a Quaternion.

#### Returns

`Quaternion`

#### Inherited from

TransformNode.absoluteRotationQuaternion

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:200

___

### absoluteScaling

• `get` **absoluteScaling**(): `Vector3`

Returns the current mesh absolute scaling.
Returns a Vector3.

#### Returns

`Vector3`

#### Inherited from

TransformNode.absoluteScaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:195

___

### accessibilityTag

• `get` **accessibilityTag**(): `IAccessibilityTag`

#### Returns

`IAccessibilityTag`

#### Inherited from

TransformNode.accessibilityTag

#### Defined in

node_modules/@babylonjs/core/node.d.ts:81

• `set` **accessibilityTag**(`value`): `void`

Gets or sets the accessibility tag to describe the node for accessibility purpose.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `IAccessibilityTag` |

#### Returns

`void`

#### Inherited from

TransformNode.accessibilityTag

#### Defined in

node_modules/@babylonjs/core/node.d.ts:80

___

### animationPropertiesOverride

• `get` **animationPropertiesOverride**(): `AnimationPropertiesOverride`

Gets or sets the animation properties override

#### Returns

`AnimationPropertiesOverride`

#### Inherited from

TransformNode.animationPropertiesOverride

#### Defined in

node_modules/@babylonjs/core/node.d.ts:152

• `set` **animationPropertiesOverride**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `AnimationPropertiesOverride` |

#### Returns

`void`

#### Inherited from

TransformNode.animationPropertiesOverride

#### Defined in

node_modules/@babylonjs/core/node.d.ts:153

___

### behaviors

• `get` **behaviors**(): `Behavior`\<`Node`\>[]

Gets the list of attached behaviors

#### Returns

`Behavior`\<`Node`\>[]

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/behaviors

#### Inherited from

TransformNode.behaviors

#### Defined in

node_modules/@babylonjs/core/node.d.ts:215

___

### billboardMode

• `get` **billboardMode**(): `number`

Gets or sets the billboard mode. Default is 0.

| Value | Type | Description |
| --- | --- | --- |
| 0 | BILLBOARDMODE_NONE |  |
| 1 | BILLBOARDMODE_X |  |
| 2 | BILLBOARDMODE_Y |  |
| 4 | BILLBOARDMODE_Z |  |
| 7 | BILLBOARDMODE_ALL |  |

#### Returns

`number`

#### Inherited from

TransformNode.billboardMode

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:69

• `set` **billboardMode**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

TransformNode.billboardMode

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:70

___

### doNotSerialize

• `get` **doNotSerialize**(): `boolean`

Gets or sets a boolean used to define if the node must be serialized

#### Returns

`boolean`

#### Inherited from

TransformNode.doNotSerialize

#### Defined in

node_modules/@babylonjs/core/node.d.ts:90

• `set` **doNotSerialize**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

TransformNode.doNotSerialize

#### Defined in

node_modules/@babylonjs/core/node.d.ts:91

___

### forward

• `get` **forward**(): `Vector3`

The forward direction of that transform in world space.

#### Returns

`Vector3`

#### Inherited from

TransformNode.forward

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:162

___

### infiniteDistance

• `get` **infiniteDistance**(): `boolean`

Gets or sets the distance of the object to max, often used by skybox

#### Returns

`boolean`

#### Inherited from

TransformNode.infiniteDistance

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:87

• `set` **infiniteDistance**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

TransformNode.infiniteDistance

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:88

___

### isWorldMatrixFrozen

• `get` **isWorldMatrixFrozen**(): `boolean`

True if the World matrix has been frozen.

#### Returns

`boolean`

#### Inherited from

TransformNode.isWorldMatrixFrozen

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:246

___

### nonUniformScaling

• `get` **nonUniformScaling**(): `boolean`

True if the scaling property of this object is non uniform eg. (1,2,1)

#### Returns

`boolean`

#### Inherited from

TransformNode.nonUniformScaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:380

___

### onClonedObservable

• `get` **onClonedObservable**(): `Observable`\<`Node`\>

An event triggered when the node is cloned

#### Returns

`Observable`\<`Node`\>

#### Inherited from

TransformNode.onClonedObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:177

___

### onDispose

• `set` **onDispose**(`callback`): `void`

Sets a callback that will be raised when the node will be disposed

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Inherited from

TransformNode.onDispose

#### Defined in

node_modules/@babylonjs/core/node.d.ts:169

___

### onEnabledStateChangedObservable

• `get` **onEnabledStateChangedObservable**(): `Observable`\<`boolean`\>

An event triggered when the enabled state of the node changes

#### Returns

`Observable`\<`boolean`\>

#### Inherited from

TransformNode.onEnabledStateChangedObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:173

___

### parent

• `get` **parent**(): `Node`

#### Returns

`Node`

#### Inherited from

TransformNode.parent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:139

• `set` **parent**(`parent`): `void`

Gets or sets the parent of the node (without keeping the current position in the scene)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `Node` |

#### Returns

`void`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/parent_pivot/parent

#### Inherited from

TransformNode.parent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:138

___

### position

• `get` **position**(): `Vector3`

Gets or set the node position (default is (0.0, 0.0, 0.0))

#### Returns

`Vector3`

#### Inherited from

TransformNode.position

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:126

• `set` **position**(`newPosition`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPosition` | `Vector3` |

#### Returns

`void`

#### Inherited from

TransformNode.position

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:127

___

### preserveParentRotationForBillboard

• `get` **preserveParentRotationForBillboard**(): `boolean`

Gets or sets a boolean indicating that parent rotation should be preserved when using billboards.
This could be useful for glTF objects where parent rotation helps converting from right handed to left handed

#### Returns

`boolean`

#### Inherited from

TransformNode.preserveParentRotationForBillboard

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:76

• `set` **preserveParentRotationForBillboard**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

TransformNode.preserveParentRotationForBillboard

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:77

___

### right

• `get` **right**(): `Vector3`

The right direction of that transform in world space.

#### Returns

`Vector3`

#### Inherited from

TransformNode.right

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:170

___

### rotation

• `get` **rotation**(): `Vector3`

Gets or sets the rotation property : a Vector3 defining the rotation value in radians around each local axis X, Y, Z  (default is (0.0, 0.0, 0.0)).
If rotation quaternion is set, this Vector3 will be ignored and copy from the quaternion

#### Returns

`Vector3`

#### Inherited from

TransformNode.rotation

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:141

• `set` **rotation**(`newRotation`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newRotation` | `Vector3` |

#### Returns

`void`

#### Inherited from

TransformNode.rotation

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:142

___

### rotationQuaternion

• `get` **rotationQuaternion**(): `Quaternion`

Gets or sets the rotation Quaternion property : this a Quaternion object defining the node rotation by using a unit quaternion (undefined by default, but can be null).
If set, only the rotationQuaternion is then used to compute the node rotation (ie. node.rotation will be ignored)

#### Returns

`Quaternion`

#### Inherited from

TransformNode.rotationQuaternion

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:152

• `set` **rotationQuaternion**(`quaternion`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `quaternion` | `Quaternion` |

#### Returns

`void`

#### Inherited from

TransformNode.rotationQuaternion

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:153

___

### scaling

• `get` **scaling**(): `Vector3`

Gets or sets the scaling property : a Vector3 defining the node scaling along each local axis X, Y, Z (default is (1.0, 1.0, 1.0)).

#### Returns

`Vector3`

#### Inherited from

TransformNode.scaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:146

• `set` **scaling**(`newScaling`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newScaling` | `Vector3` |

#### Returns

`void`

#### Inherited from

TransformNode.scaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:147

___

### up

• `get` **up**(): `Vector3`

The up direction of that transform in world space.

#### Returns

`Vector3`

#### Inherited from

TransformNode.up

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:166

___

### worldMatrixFromCache

• `get` **worldMatrixFromCache**(): `Matrix`

Returns directly the latest state of the mesh World matrix.
A Matrix is returned.

#### Returns

`Matrix`

#### Inherited from

TransformNode.worldMatrixFromCache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:234

## Methods

### \_addToSceneRootNodes

▸ **_addToSceneRootNodes**(): `void`

#### Returns

`void`

#### Inherited from

TransformNode.\_addToSceneRootNodes

#### Defined in

node_modules/@babylonjs/core/node.d.ts:145

___

### \_afterComputeWorldMatrix

▸ **_afterComputeWorldMatrix**(): `void`

#### Returns

`void`

#### Inherited from

TransformNode.\_afterComputeWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:470

___

### \_getActionManagerForTrigger

▸ **_getActionManagerForTrigger**(`trigger?`, `_initialCall?`): `AbstractActionManager`

#### Parameters

| Name | Type |
| :------ | :------ |
| `trigger?` | `number` |
| `_initialCall?` | `boolean` |

#### Returns

`AbstractActionManager`

#### Inherited from

TransformNode.\_getActionManagerForTrigger

#### Defined in

node_modules/@babylonjs/core/node.d.ts:244

___

### \_getDescendants

▸ **_getDescendants**(`results`, `directDescendantsOnly?`, `predicate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | `Node`[] |
| `directDescendantsOnly?` | `boolean` |
| `predicate?` | (`node`: `Node`) => `boolean` |

#### Returns

`void`

#### Inherited from

TransformNode.\_getDescendants

#### Defined in

node_modules/@babylonjs/core/node.d.ts:293

___

### \_getEffectiveParent

▸ **_getEffectiveParent**(): `Node`

#### Returns

`Node`

#### Inherited from

TransformNode.\_getEffectiveParent

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:451

___

### \_getWorldMatrixDeterminant

▸ **_getWorldMatrixDeterminant**(): `number`

#### Returns

`number`

#### Inherited from

TransformNode.\_getWorldMatrixDeterminant

#### Defined in

node_modules/@babylonjs/core/node.d.ts:229

___

### \_initCache

▸ **_initCache**(): `void`

#### Returns

`void`

#### Inherited from

TransformNode.\_initCache

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:185

___

### \_isSynchronized

▸ **_isSynchronized**(): `boolean`

#### Returns

`boolean`

#### Inherited from

TransformNode.\_isSynchronized

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:183

___

### \_markSyncedWithParent

▸ **_markSyncedWithParent**(): `void`

#### Returns

`void`

#### Inherited from

TransformNode.\_markSyncedWithParent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:252

___

### \_removeFromSceneRootNodes

▸ **_removeFromSceneRootNodes**(): `void`

#### Returns

`void`

#### Inherited from

TransformNode.\_removeFromSceneRootNodes

#### Defined in

node_modules/@babylonjs/core/node.d.ts:147

___

### \_serializeAsParent

▸ **_serializeAsParent**(`serializationObject`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serializationObject` | `any` |

#### Returns

`void`

#### Inherited from

TransformNode.\_serializeAsParent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:143

___

### \_setReady

▸ **_setReady**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Inherited from

TransformNode.\_setReady

#### Defined in

node_modules/@babylonjs/core/node.d.ts:339

___

### \_syncParentEnabledState

▸ **_syncParentEnabledState**(): `void`

#### Returns

`void`

#### Inherited from

TransformNode.\_syncParentEnabledState

#### Defined in

node_modules/@babylonjs/core/node.d.ts:277

___

### \_updateCache

▸ **_updateCache**(`_ignoreParentClass?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ignoreParentClass?` | `boolean` |

#### Returns

`void`

#### Inherited from

TransformNode.\_updateCache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:248

___

### \_updateNonUniformScalingState

▸ **_updateNonUniformScalingState**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`boolean`

#### Inherited from

TransformNode.\_updateNonUniformScalingState

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:384

___

### addBehavior

▸ **addBehavior**(`behavior`, `attachImmediately?`): `Node`

Attach a behavior to the node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behavior` | `Behavior`\<`Node`\> | defines the behavior to attach |
| `attachImmediately?` | `boolean` | defines that the behavior must be attached even if the scene is still loading |

#### Returns

`Node`

the current Node

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/behaviors

#### Inherited from

TransformNode.addBehavior

#### Defined in

node_modules/@babylonjs/core/node.d.ts:203

___

### addChild

▸ **addChild**(`mesh`, `preserveScalingSign?`): `this`

Adds the passed mesh as a child to the current mesh.
The node will remain exactly where it is and its position / rotation will be updated accordingly.
This method is equivalent to calling setParent().

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | `TransformNode` | defines the child mesh |
| `preserveScalingSign?` | `boolean` | if true, keep scaling sign of child. Otherwise, scaling sign might change. |

#### Returns

`this`

the current mesh

#### Inherited from

TransformNode.addChild

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:368

___

### addRotation

▸ **addRotation**(`x`, `y`, `z`): `TransformNode`

Adds a rotation step to the mesh current rotation.
x, y, z are Euler angles expressed in radians.
This methods updates the current mesh rotation, either mesh.rotation, either mesh.rotationQuaternion if it's set.
This means this rotation is made in the mesh local space only.
It's useful to set a custom rotation order different from the BJS standard one YXZ.
Example : this rotates the mesh first around its local X axis, then around its local Z axis, finally around its local Y axis.
```javascript
mesh.addRotation(x1, 0, 0).addRotation(0, 0, z2).addRotation(0, 0, y3);
```
Note that `addRotation()` accumulates the passed rotation values to the current ones and computes the .rotation or .rotationQuaternion updated values.
Under the hood, only quaternions are used. So it's a little faster is you use .rotationQuaternion because it doesn't need to translate them back to Euler angles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | Rotation to add |
| `y` | `number` | Rotation to add |
| `z` | `number` | Rotation to add |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.addRotation

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:447

___

### applyAngularImpulse

▸ **applyAngularImpulse**(`angularImpulse`): `TransformNode`

Apply a physic angular impulse to the mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angularImpulse` | `Vector3` | defines the torque to apply |

#### Returns

`TransformNode`

the current mesh

#### Inherited from

TransformNode.applyAngularImpulse

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:33

___

### applyImpulse

▸ **applyImpulse**(`force`, `contactPoint`): `TransformNode`

Apply a physic impulse to the mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `force` | `Vector3` | defines the force to apply |
| `contactPoint` | `Vector3` | defines where to apply the force |

#### Returns

`TransformNode`

the current mesh

#### Inherited from

TransformNode.applyImpulse

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:28

___

### attachToBone

▸ **attachToBone**(`bone`, `affectedTransformNode`): `TransformNode`

Attach the current TransformNode to another TransformNode associated with a bone

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bone` | `Bone` | Bone affecting the TransformNode |
| `affectedTransformNode` | `TransformNode` | TransformNode associated with the bone |

#### Returns

`TransformNode`

this object

#### Inherited from

TransformNode.attachToBone

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:391

___

### beginAnimation

▸ **beginAnimation**(`name`, `loop?`, `speedRatio?`, `onAnimationEnd?`): `Animatable`

Will start the animation sequence

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the range frames for animation sequence |
| `loop?` | `boolean` | defines if the animation should loop (false by default) |
| `speedRatio?` | `number` | defines the speed factor in which to run the animation (1 by default) |
| `onAnimationEnd?` | () => `void` | defines a function to be executed when the animation ended (undefined by default) |

#### Returns

`Animatable`

the object created for this animation. If range does not exist, it will return null

#### Inherited from

TransformNode.beginAnimation

#### Defined in

node_modules/@babylonjs/core/node.d.ts:386

___

### clone

▸ **clone**(`name`, `newParent`, `doNotCloneChildren?`): `TransformNode`

Clone the current transform node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the new clone |
| `newParent` | `Node` | New parent for the clone |
| `doNotCloneChildren?` | `boolean` | Do not clone children hierarchy |

#### Returns

`TransformNode`

the new transform node

#### Inherited from

TransformNode.clone

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:503

___

### computeWorldMatrix

▸ **computeWorldMatrix**(`force?`, `camera?`): `Matrix`

Computes the world matrix of the node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `force?` | `boolean` | defines if the cache version should be invalidated forcing the world matrix to be created from scratch |
| `camera?` | `Camera` | defines the camera used if different from the scene active camera (This is used with modes like Billboard or infinite distance) |

#### Returns

`Matrix`

the world matrix

#### Inherited from

TransformNode.computeWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:464

___

### createAnimationRange

▸ **createAnimationRange**(`name`, `from`, `to`): `void`

Creates an animation range for this node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the range |
| `from` | `number` | defines the starting key |
| `to` | `number` | defines the end key |

#### Returns

`void`

#### Inherited from

TransformNode.createAnimationRange

#### Defined in

node_modules/@babylonjs/core/node.d.ts:352

___

### createMap

▸ **createMap**(): [`Selection`](Selection.md)

#### Returns

[`Selection`](Selection.md)

#### Defined in

[src/prefabs/Mapping/MeshMap.ts:46](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Mapping/MeshMap.ts#L46)

___

### deleteAnimationRange

▸ **deleteAnimationRange**(`name`, `deleteFrames?`): `void`

Delete a specific animation range

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the range to delete |
| `deleteFrames?` | `boolean` | defines if animation frames from the range must be deleted as well |

#### Returns

`void`

#### Inherited from

TransformNode.deleteAnimationRange

#### Defined in

node_modules/@babylonjs/core/node.d.ts:358

___

### detachFromBone

▸ **detachFromBone**(`resetToPreviousParent?`): `TransformNode`

Detach the transform node if its associated with a bone

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resetToPreviousParent?` | `boolean` | Indicates if the parent that was in effect when attachToBone was called should be set back or if we should set parent to null instead (defaults to the latter) |

#### Returns

`TransformNode`

this object

#### Inherited from

TransformNode.detachFromBone

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:397

___

### dispose

▸ **dispose**(`doNotRecurse?`, `disposeMaterialAndTextures?`): `void`

Releases resources associated with this transform node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doNotRecurse?` | `boolean` | Set to true to not recurse into each children (recurse into each children by default) |
| `disposeMaterialAndTextures?` | `boolean` | Set to true to also dispose referenced materials and textures (false by default) |

#### Returns

`void`

#### Inherited from

TransformNode.dispose

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:530

___

### freezeWorldMatrix

▸ **freezeWorldMatrix**(`newWorldMatrix?`, `decompose?`): `TransformNode`

Prevents the World matrix to be computed any longer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newWorldMatrix?` | `Matrix` | defines an optional matrix to use as world matrix |
| `decompose?` | `boolean` | defines whether to decompose the given newWorldMatrix or directly assign |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.freezeWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:237

___

### getAbsolutePivotPoint

▸ **getAbsolutePivotPoint**(): `Vector3`

Returns a new Vector3 set with the mesh pivot point World coordinates.

#### Returns

`Vector3`

a new Vector3 set with the mesh pivot point World coordinates.

#### Inherited from

TransformNode.getAbsolutePivotPoint

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:333

___

### getAbsolutePivotPointToRef

▸ **getAbsolutePivotPointToRef**(`result`): `TransformNode`

Sets the Vector3 "result" coordinates with the mesh pivot point World coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result` | `Vector3` | vector3 to store the result |

#### Returns

`TransformNode`

this TransformNode.

#### Inherited from

TransformNode.getAbsolutePivotPointToRef

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:339

___

### getAbsolutePosition

▸ **getAbsolutePosition**(): `Vector3`

Returns the mesh absolute position in the World.

#### Returns

`Vector3`

a Vector3.

#### Inherited from

TransformNode.getAbsolutePosition

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:251

___

### getAnimationByName

▸ **getAnimationByName**(`name`): `Animation`

Get an animation by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the animation to look for |

#### Returns

`Animation`

null if not found else the requested animation

#### Inherited from

TransformNode.getAnimationByName

#### Defined in

node_modules/@babylonjs/core/node.d.ts:345

___

### getAnimationRange

▸ **getAnimationRange**(`name`): `AnimationRange`

Get an animation range by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the animation range to look for |

#### Returns

`AnimationRange`

null if not found else the requested animation range

#### Inherited from

TransformNode.getAnimationRange

#### Defined in

node_modules/@babylonjs/core/node.d.ts:364

___

### getAnimationRanges

▸ **getAnimationRanges**(): `AnimationRange`[]

Gets the list of all animation ranges defined on this node

#### Returns

`AnimationRange`[]

an array

#### Inherited from

TransformNode.getAnimationRanges

#### Defined in

node_modules/@babylonjs/core/node.d.ts:377

___

### getBehaviorByName

▸ **getBehaviorByName**(`name`): `Behavior`\<`Node`\>

Gets an attached behavior by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the behavior to look for |

#### Returns

`Behavior`\<`Node`\>

null if behavior was not found else the requested behavior

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/behaviors

#### Inherited from

TransformNode.getBehaviorByName

#### Defined in

node_modules/@babylonjs/core/node.d.ts:222

___

### getChildMeshes

▸ **getChildMeshes**\<`T`\>(`directDescendantsOnly?`, `predicate?`): `T`[]

Get all child-meshes of this node

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `AbstractMesh` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directDescendantsOnly?` | `boolean` | defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered (Default: false) |
| `predicate?` | (`node`: `Node`) => node is T | defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored |

#### Returns

`T`[]

an array of AbstractMesh

#### Inherited from

TransformNode.getChildMeshes

#### Defined in

node_modules/@babylonjs/core/node.d.ts:314

▸ **getChildMeshes**(`directDescendantsOnly?`, `predicate?`): `AbstractMesh`[]

Get all child-meshes of this node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directDescendantsOnly?` | `boolean` | defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered (Default: false) |
| `predicate?` | (`node`: `Node`) => `boolean` | defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored |

#### Returns

`AbstractMesh`[]

an array of AbstractMesh

#### Inherited from

TransformNode.getChildMeshes

#### Defined in

node_modules/@babylonjs/core/node.d.ts:321

___

### getChildTransformNodes

▸ **getChildTransformNodes**(`directDescendantsOnly?`, `predicate?`): `TransformNode`[]

Get all child-transformNodes of this node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directDescendantsOnly?` | `boolean` | defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered |
| `predicate?` | (`node`: `Node`) => `boolean` | defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored |

#### Returns

`TransformNode`[]

an array of TransformNode

#### Inherited from

TransformNode.getChildTransformNodes

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:524

___

### getChildren

▸ **getChildren**\<`T`\>(`predicate?`, `directDescendantsOnly?`): `T`[]

Get all direct children of this node

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Node` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate?` | (`node`: `Node`) => node is T | defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored |
| `directDescendantsOnly?` | `boolean` | defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered (Default: true) |

#### Returns

`T`[]

an array of Node

#### Inherited from

TransformNode.getChildren

#### Defined in

node_modules/@babylonjs/core/node.d.ts:328

▸ **getChildren**(`predicate?`, `directDescendantsOnly?`): `Node`[]

Get all direct children of this node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate?` | (`node`: `Node`) => `boolean` | defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored |
| `directDescendantsOnly?` | `boolean` | defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered (Default: true) |

#### Returns

`Node`[]

an array of Node

#### Inherited from

TransformNode.getChildren

#### Defined in

node_modules/@babylonjs/core/node.d.ts:335

___

### getClassName

▸ **getClassName**(): `string`

Gets a string identifying the name of the class

#### Returns

`string`

"TransformNode" string

#### Inherited from

TransformNode.getClassName

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:122

___

### getDescendants

▸ **getDescendants**\<`T`\>(`directDescendantsOnly?`, `predicate?`): `T`[]

Will return all nodes that have this node as ascendant

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Node` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directDescendantsOnly?` | `boolean` | defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered |
| `predicate?` | (`node`: `Node`) => node is T | defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored |

#### Returns

`T`[]

all children nodes of all types

#### Inherited from

TransformNode.getDescendants

#### Defined in

node_modules/@babylonjs/core/node.d.ts:300

▸ **getDescendants**(`directDescendantsOnly?`, `predicate?`): `Node`[]

Will return all nodes that have this node as ascendant

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directDescendantsOnly?` | `boolean` | defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered |
| `predicate?` | (`node`: `Node`) => `boolean` | defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored |

#### Returns

`Node`[]

all children nodes of all types

#### Inherited from

TransformNode.getDescendants

#### Defined in

node_modules/@babylonjs/core/node.d.ts:307

___

### getDirection

▸ **getDirection**(`localAxis`): `Vector3`

Returns a new Vector3 that is the localAxis, expressed in the mesh local space, rotated like the mesh.
This Vector3 is expressed in the World space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localAxis` | `Vector3` | axis to rotate |

#### Returns

`Vector3`

a new Vector3 that is the localAxis, expressed in the mesh local space, rotated like the mesh.

#### Inherited from

TransformNode.getDirection

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:292

___

### getDirectionToRef

▸ **getDirectionToRef**(`localAxis`, `result`): `TransformNode`

Sets the Vector3 "result" as the rotated Vector3 "localAxis" in the same rotation than the mesh.
localAxis is expressed in the mesh local space.
result is computed in the World space from the mesh World matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localAxis` | `Vector3` | axis to rotate |
| `result` | `Vector3` | the resulting transformnode |

#### Returns

`TransformNode`

this TransformNode.

#### Inherited from

TransformNode.getDirectionToRef

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:301

___

### getDistanceToCamera

▸ **getDistanceToCamera**(`camera?`): `number`

Returns the distance from the mesh to the active camera

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera?` | `Camera` | defines the camera to use |

#### Returns

`number`

the distance

#### Inherited from

TransformNode.getDistanceToCamera

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:495

___

### getEngine

▸ **getEngine**(): `AbstractEngine`

Gets the engine of the node

#### Returns

`AbstractEngine`

a Engine

#### Inherited from

TransformNode.getEngine

#### Defined in

node_modules/@babylonjs/core/node.d.ts:194

___

### getHierarchyBoundingVectors

▸ **getHierarchyBoundingVectors**(`includeDescendants?`, `predicate?`): `Object`

Return the minimum and maximum world vectors of the entire hierarchy under current node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `includeDescendants?` | `boolean` | Include bounding info from descendants as well (true by default) |
| `predicate?` | (`abstractMesh`: `AbstractMesh`) => `boolean` | defines a callback function that can be customize to filter what meshes should be included in the list used to compute the bounding vectors |

#### Returns

`Object`

the new bounding vectors

| Name | Type |
| :------ | :------ |
| `max` | `Vector3` |
| `min` | `Vector3` |

#### Inherited from

TransformNode.getHierarchyBoundingVectors

#### Defined in

node_modules/@babylonjs/core/node.d.ts:417

___

### getPhysicsBody

▸ **getPhysicsBody**(): `PhysicsBody`

#### Returns

`PhysicsBody`

#### Inherited from

TransformNode.getPhysicsBody

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:22

___

### getPivotMatrix

▸ **getPivotMatrix**(): `Matrix`

Returns the mesh pivot matrix.
Default : Identity.

#### Returns

`Matrix`

the matrix

#### Inherited from

TransformNode.getPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:219

___

### getPivotPoint

▸ **getPivotPoint**(): `Vector3`

Returns a new Vector3 set with the mesh pivot point coordinates in the local space.

#### Returns

`Vector3`

the pivot point

#### Inherited from

TransformNode.getPivotPoint

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:322

___

### getPivotPointToRef

▸ **getPivotPointToRef**(`result`): `TransformNode`

Sets the passed Vector3 "result" with the coordinates of the mesh pivot point in the local space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result` | `Vector3` | the vector3 to store the result |

#### Returns

`TransformNode`

this TransformNode.

#### Inherited from

TransformNode.getPivotPointToRef

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:328

___

### getPoseMatrix

▸ **getPoseMatrix**(): `Matrix`

Returns the mesh Pose matrix.

#### Returns

`Matrix`

the pose matrix

#### Inherited from

TransformNode.getPoseMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:181

___

### getPositionExpressedInLocalSpace

▸ **getPositionExpressedInLocalSpace**(): `Vector3`

Returns the mesh position in the local space from the current World matrix values.

#### Returns

`Vector3`

a new Vector3.

#### Inherited from

TransformNode.getPositionExpressedInLocalSpace

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:268

___

### getPositionInCameraSpace

▸ **getPositionInCameraSpace**(`camera?`): `Vector3`

Gets the position of the current mesh in camera space

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera?` | `Camera` | defines the camera to use |

#### Returns

`Vector3`

a position

#### Inherited from

TransformNode.getPositionInCameraSpace

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:489

___

### getScene

▸ **getScene**(): `Scene`

Gets the scene of the node

#### Returns

`Scene`

a scene

#### Inherited from

TransformNode.getScene

#### Defined in

node_modules/@babylonjs/core/node.d.ts:189

___

### getWorldMatrix

▸ **getWorldMatrix**(): `Matrix`

Returns the latest update of the World matrix

#### Returns

`Matrix`

a Matrix

#### Inherited from

TransformNode.getWorldMatrix

#### Defined in

node_modules/@babylonjs/core/node.d.ts:227

___

### instantiateHierarchy

▸ **instantiateHierarchy**(`newParent?`, `options?`, `onNewNodeCreated?`): `TransformNode`

Instantiate (when possible) or clone that node with its hierarchy

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newParent?` | `TransformNode` | defines the new parent to use for the instance (or clone) |
| `options?` | `Object` | defines options to configure how copy is done |
| `options.doNotInstantiate` | `boolean` \| (`node`: `TransformNode`) => `boolean` | defines if the model must be instantiated or just cloned |
| `onNewNodeCreated?` | (`source`: `TransformNode`, `clone`: `TransformNode`) => `void` | defines an option callback to call when a clone or an instance is created |

#### Returns

`TransformNode`

an instance (or a clone) of the current node with its hierarchy

#### Inherited from

TransformNode.instantiateHierarchy

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:228

___

### isDescendantOf

▸ **isDescendantOf**(`ancestor`): `boolean`

Is this node a descendant of the given node?
The function will iterate up the hierarchy until the ancestor was found or no more parents defined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ancestor` | `Node` | defines the parent node to inspect |

#### Returns

`boolean`

a boolean indicating if this node is a descendant of the given node

#### Inherited from

TransformNode.isDescendantOf

#### Defined in

node_modules/@babylonjs/core/node.d.ts:289

___

### isDisposed

▸ **isDisposed**(): `boolean`

Gets a boolean indicating if the node has been disposed

#### Returns

`boolean`

true if the node was disposed

#### Inherited from

TransformNode.isDisposed

#### Defined in

node_modules/@babylonjs/core/node.d.ts:133

___

### isEnabled

▸ **isEnabled**(`checkAncestors?`): `boolean`

Is this node enabled?
If the node has a parent, all ancestors will be checked and false will be returned if any are false (not enabled), otherwise will return true

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `checkAncestors?` | `boolean` | indicates if this method should check the ancestors. The default is to check the ancestors. If set to false, the method will return the value of this node without checking ancestors |

#### Returns

`boolean`

whether this node (and its parent) is enabled

#### Inherited from

TransformNode.isEnabled

#### Defined in

node_modules/@babylonjs/core/node.d.ts:275

___

### isReady

▸ **isReady**(`_completeCheck?`): `boolean`

Is this node ready to be used/rendered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_completeCheck?` | `boolean` | defines if a complete check (including materials and lights) has to be done (false by default) |

#### Returns

`boolean`

true if the node is ready

#### Inherited from

TransformNode.isReady

#### Defined in

node_modules/@babylonjs/core/node.d.ts:262

___

### isSynchronized

▸ **isSynchronized**(): `boolean`

#### Returns

`boolean`

#### Inherited from

TransformNode.isSynchronized

#### Defined in

node_modules/@babylonjs/core/node.d.ts:256

___

### isSynchronizedWithParent

▸ **isSynchronizedWithParent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

TransformNode.isSynchronizedWithParent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:254

___

### isUsingPivotMatrix

▸ **isUsingPivotMatrix**(): `boolean`

return true if a pivot has been set

#### Returns

`boolean`

true if a pivot matrix is used

#### Inherited from

TransformNode.isUsingPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:132

___

### isUsingPostMultiplyPivotMatrix

▸ **isUsingPostMultiplyPivotMatrix**(): `boolean`

#### Returns

`boolean`

true if pivot matrix must be cancelled in the world matrix. When this parameter is set to true (default), the inverse of the pivot matrix is also applied at the end to cancel the transformation effect.

#### Inherited from

TransformNode.isUsingPostMultiplyPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:136

___

### isWorldMatrixCameraDependent

▸ **isWorldMatrixCameraDependent**(): `boolean`

Returns whether the transform node world matrix computation needs the camera information to be computed.
This is the case when the node is a billboard or has an infinite distance for instance.

#### Returns

`boolean`

true if the world matrix computation needs the camera information to be computed

#### Inherited from

TransformNode.isWorldMatrixCameraDependent

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:457

___

### locallyTranslate

▸ **locallyTranslate**(`vector3`): `TransformNode`

Translates the mesh along the passed Vector3 in its local space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector3` | `Vector3` | the distance to translate in localspace |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.locallyTranslate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:274

___

### lookAt

▸ **lookAt**(`targetPoint`, `yawCor?`, `pitchCor?`, `rollCor?`, `space?`): `TransformNode`

Orients a mesh towards a target point. Mesh must be drawn facing user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetPoint` | `Vector3` | the position (must be in same space as current mesh) to look at |
| `yawCor?` | `number` | optional yaw (y-axis) correction in radians |
| `pitchCor?` | `number` | optional pitch (x-axis) correction in radians |
| `rollCor?` | `number` | optional roll (z-axis) correction in radians |
| `space?` | `Space` | the chosen space of the target |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.lookAt

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:285

___

### markAsDirty

▸ **markAsDirty**(`property?`): `Node`

Flag the transform node as dirty (Forcing it to update everything)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property?` | `string` | if set to "rotation" the objects rotationQuaternion will be set to null |

#### Returns

`Node`

this  node

#### Inherited from

TransformNode.markAsDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:345

___

### normalizeToUnitCube

▸ **normalizeToUnitCube**(`includeDescendants?`, `ignoreRotation?`, `predicate?`): `TransformNode`

Uniformly scales the mesh to fit inside of a unit cube (1 X 1 X 1 units)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `includeDescendants?` | `boolean` | Use the hierarchy's bounding box instead of the mesh's bounding box. Default is false |
| `ignoreRotation?` | `boolean` | ignore rotation when computing the scale (ie. object will be axis aligned). Default is false |
| `predicate?` | (`node`: `AbstractMesh`) => `boolean` | predicate that is passed in to getHierarchyBoundingVectors when selecting which object should be included when scaling |

#### Returns

`TransformNode`

the current mesh

#### Inherited from

TransformNode.normalizeToUnitCube

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:538

___

### registerAfterWorldMatrixUpdate

▸ **registerAfterWorldMatrixUpdate**(`func`): `TransformNode`

If you'd like to be called back after the mesh position, rotation or scaling has been updated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`mesh`: `TransformNode`) => `void` | callback function to add |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.registerAfterWorldMatrixUpdate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:477

___

### removeBehavior

▸ **removeBehavior**(`behavior`): `Node`

Remove an attached behavior

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behavior` | `Behavior`\<`Node`\> | defines the behavior to attach |

#### Returns

`Node`

the current Node

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/behaviors

#### Inherited from

TransformNode.removeBehavior

#### Defined in

node_modules/@babylonjs/core/node.d.ts:210

___

### removeChild

▸ **removeChild**(`mesh`, `preserveScalingSign?`): `this`

Removes the passed mesh from the current mesh children list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | `TransformNode` | defines the child mesh |
| `preserveScalingSign?` | `boolean` | if true, keep scaling sign of child. Otherwise, scaling sign might change. |

#### Returns

`this`

the current mesh

#### Inherited from

TransformNode.removeChild

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:375

___

### resetLocalMatrix

▸ **resetLocalMatrix**(`independentOfChildren?`): `void`

Resets this nodeTransform's local matrix to Matrix.Identity().

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `independentOfChildren?` | `boolean` | indicates if all child nodeTransform's world-space transform should be preserved. |

#### Returns

`void`

#### Inherited from

TransformNode.resetLocalMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:469

___

### rotate

▸ **rotate**(`axis`, `amount`, `space?`): `TransformNode`

Rotates the mesh around the axis vector for the passed angle (amount) expressed in radians, in the given space.
space (default LOCAL) can be either Space.LOCAL, either Space.WORLD.
Note that the property `rotationQuaternion` is then automatically updated and the property `rotation` is set to (0,0,0) and no longer used.
The passed axis is also normalized.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | `Vector3` | the axis to rotate around |
| `amount` | `number` | the amount to rotate in radians |
| `space?` | `Space` | Space to rotate in (Default: local) |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.rotate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:409

___

### rotateAround

▸ **rotateAround**(`point`, `axis`, `amount`): `TransformNode`

Rotates the mesh around the axis vector for the passed angle (amount) expressed in radians, in world space.
Note that the property `rotationQuaternion` is then automatically updated and the property `rotation` is set to (0,0,0) and no longer used.
The passed axis is also normalized. .
Method is based on http://www.euclideanspace.com/maths/geometry/affine/aroundPoint/index.htm

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Vector3` | the point to rotate around |
| `axis` | `Vector3` | the axis to rotate around |
| `amount` | `number` | the amount to rotate in radians |

#### Returns

`TransformNode`

the TransformNode

#### Inherited from

TransformNode.rotateAround

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:420

___

### serialize

▸ **serialize**(`currentSerializationObject?`): `any`

Serializes the objects information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentSerializationObject?` | `any` | defines the object to serialize in |

#### Returns

`any`

the serialized object

#### Inherited from

TransformNode.serialize

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:509

___

### serializeAnimationRanges

▸ **serializeAnimationRanges**(): `any`

Serialize animation ranges into a JSON compatible object

#### Returns

`any`

serialization object

#### Inherited from

TransformNode.serializeAnimationRanges

#### Defined in

node_modules/@babylonjs/core/node.d.ts:391

___

### setAbsolutePosition

▸ **setAbsolutePosition**(`absolutePosition`): `TransformNode`

Sets the mesh absolute position in the World from a Vector3 or an Array(3).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `absolutePosition` | `Vector3` | the absolute position to set |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.setAbsolutePosition

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:257

___

### setDirection

▸ **setDirection**(`localAxis`, `yawCor?`, `pitchCor?`, `rollCor?`): `TransformNode`

Sets this transform node rotation to the given local axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localAxis` | `Vector3` | the axis in local space |
| `yawCor?` | `number` | optional yaw (y-axis) correction in radians |
| `pitchCor?` | `number` | optional pitch (x-axis) correction in radians |
| `rollCor?` | `number` | optional roll (z-axis) correction in radians |

#### Returns

`TransformNode`

this TransformNode

#### Inherited from

TransformNode.setDirection

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:310

___

### setEnabled

▸ **setEnabled**(`value`): `void`

Set the enabled state of this node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | defines the new enabled state |

#### Returns

`void`

#### Inherited from

TransformNode.setEnabled

#### Defined in

node_modules/@babylonjs/core/node.d.ts:282

___

### setParent

▸ **setParent**(`node`, `preserveScalingSign?`, `updatePivot?`): `TransformNode`

Defines the passed node as the parent of the current node.
The node will remain exactly where it is and its position / rotation will be updated accordingly.
If you don't want to preserve the current rotation / position, assign the parent through parent accessor.
Note that if the mesh has a pivot matrix / point defined it will be applied after the parent was updated.
In that case the node will not remain in the same space as it is, as the pivot will be applied.
To avoid this, you can set updatePivot to true and the pivot will be updated to identity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | the node ot set as the parent |
| `preserveScalingSign?` | `boolean` | if true, keep scaling sign of child. Otherwise, scaling sign might change. |
| `updatePivot?` | `boolean` | if true, update the pivot matrix to keep the node in the same space as before |

#### Returns

`TransformNode`

this TransformNode.

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/parent_pivot/parent

#### Inherited from

TransformNode.setParent

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:359

___

### setPivotMatrix

▸ **setPivotMatrix**(`matrix`, `postMultiplyPivotMatrix?`): `TransformNode`

Sets a new pivot matrix to the current node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | `DeepImmutableObject`\<`Matrix`\> | defines the new pivot matrix to use |
| `postMultiplyPivotMatrix?` | `boolean` | defines if the pivot matrix must be cancelled in the world matrix. When this parameter is set to true (default), the inverse of the pivot matrix is also applied at the end to cancel the transformation effect |

#### Returns

`TransformNode`

the current TransformNode

#### Inherited from

TransformNode.setPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:213

___

### setPivotPoint

▸ **setPivotPoint**(`point`, `space?`): `TransformNode`

Sets a new pivot point to the current node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Vector3` | defines the new pivot point to use |
| `space?` | `Space` | defines if the point is in world or local space (local by default) |

#### Returns

`TransformNode`

the current TransformNode

#### Inherited from

TransformNode.setPivotPoint

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:317

___

### setPositionWithLocalVector

▸ **setPositionWithLocalVector**(`vector3`): `TransformNode`

Sets the mesh position in its local space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector3` | `Vector3` | the position to set in localspace |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.setPositionWithLocalVector

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:263

___

### setPreTransformMatrix

▸ **setPreTransformMatrix**(`matrix`): `TransformNode`

Sets a new matrix to apply before all other transformation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | `Matrix` | defines the transform matrix |

#### Returns

`TransformNode`

the current TransformNode

#### Inherited from

TransformNode.setPreTransformMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:206

___

### translate

▸ **translate**(`axis`, `distance`, `space?`): `TransformNode`

Translates the mesh along the axis vector for the passed distance in the given space.
space (default LOCAL) can be either Space.LOCAL, either Space.WORLD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | `Vector3` | the axis to translate in |
| `distance` | `number` | the distance to translate |
| `space?` | `Space` | Space to rotate in (Default: local) |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.translate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:429

___

### unfreezeWorldMatrix

▸ **unfreezeWorldMatrix**(): `this`

Allows back the World matrix computation.

#### Returns

`this`

the TransformNode.

#### Inherited from

TransformNode.unfreezeWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:242

___

### unregisterAfterWorldMatrixUpdate

▸ **unregisterAfterWorldMatrixUpdate**(`func`): `TransformNode`

Removes a registered callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`mesh`: `TransformNode`) => `void` | callback function to remove |

#### Returns

`TransformNode`

the TransformNode.

#### Inherited from

TransformNode.unregisterAfterWorldMatrixUpdate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:483

___

### updateCache

▸ **updateCache**(`force?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `force?` | `boolean` |

#### Returns

`void`

#### Inherited from

TransformNode.updateCache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:240

___

### updatePoseMatrix

▸ **updatePoseMatrix**(`matrix`): `TransformNode`

Copies the parameter passed Matrix into the mesh Pose matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | `Matrix` | the matrix to copy the pose from |

#### Returns

`TransformNode`

this TransformNode.

#### Inherited from

TransformNode.updatePoseMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:176

___

### AddNodeConstructor

▸ **AddNodeConstructor**(`type`, `constructorFunc`): `void`

Add a new node constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | defines the type name of the node to construct |
| `constructorFunc` | `NodeConstructor` | defines the constructor function |

#### Returns

`void`

#### Inherited from

TransformNode.AddNodeConstructor

#### Defined in

node_modules/@babylonjs/core/node.d.ts:35

___

### Construct

▸ **Construct**(`type`, `name`, `scene`, `options?`): () => `Node`

Returns a node constructor based on type name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | defines the type name |
| `name` | `string` | defines the new node name |
| `scene` | `Scene` | defines the hosting scene |
| `options?` | `any` | defines optional options to transmit to constructors |

#### Returns

`fn`

the new constructor or null

▸ (): `Node`

##### Returns

`Node`

#### Inherited from

TransformNode.Construct

#### Defined in

node_modules/@babylonjs/core/node.d.ts:44

___

### Parse

▸ **Parse**(`parsedTransformNode`, `scene`, `rootUrl`): `TransformNode`

Returns a new TransformNode object parsed from the source provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parsedTransformNode` | `any` | is the source. |
| `scene` | `Scene` | the scene the object belongs to |
| `rootUrl` | `string` | is a string, it's the root URL to prefix the `delayLoadingFile` property with |

#### Returns

`TransformNode`

a new TransformNode object parsed from the source provided.

#### Inherited from

TransformNode.Parse

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:517

___

### ParseAnimationRanges

▸ **ParseAnimationRanges**(`node`, `parsedNode`, `_scene`): `void`

Parse animation range data from a serialization object and store them into a given node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | defines where to store the animation ranges |
| `parsedNode` | `any` | defines the serialization object to read data from |
| `_scene` | `Scene` | defines the hosting scene |

#### Returns

`void`

#### Inherited from

TransformNode.ParseAnimationRanges

#### Defined in

node_modules/@babylonjs/core/node.d.ts:410
