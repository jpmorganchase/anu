[@jpmorganchase/anu](../README.md) / [Exports](../modules.md) / PlaneText

# Class: PlaneText

## Hierarchy

- `Mesh`

  ↳ **`PlaneText`**

## Table of contents

### Constructors

- [constructor](PlaneText.md#constructor)

### Properties

- [\_\_occlusionDataStorage](PlaneText.md#__occlusiondatastorage)
- [\_accessibilityTag](PlaneText.md#_accessibilitytag)
- [\_binaryInfo](PlaneText.md#_binaryinfo)
- [\_bonesTransformMatrices](PlaneText.md#_bonestransformmatrices)
- [\_boundingInfo](PlaneText.md#_boundinginfo)
- [\_boundingInfoIsDirty](PlaneText.md#_boundinginfoisdirty)
- [\_cache](PlaneText.md#_cache)
- [\_childUpdateId](PlaneText.md#_childupdateid)
- [\_children](PlaneText.md#_children)
- [\_creationDataStorage](PlaneText.md#_creationdatastorage)
- [\_currentRenderId](PlaneText.md#_currentrenderid)
- [\_decalMap](PlaneText.md#_decalmap)
- [\_delayInfo](PlaneText.md#_delayinfo)
- [\_delayLoadingFunction](PlaneText.md#_delayloadingfunction)
- [\_disposePhysicsObserver](PlaneText.md#_disposephysicsobserver)
- [\_edgesRenderer](PlaneText.md#_edgesrenderer)
- [\_geometry](PlaneText.md#_geometry)
- [\_indexInSceneTransformNodesArray](PlaneText.md#_indexinscenetransformnodesarray)
- [\_instanceDataStorage](PlaneText.md#_instancedatastorage)
- [\_internalAbstractMeshDataInfo](PlaneText.md#_internalabstractmeshdatainfo)
- [\_internalMetadata](PlaneText.md#_internalmetadata)
- [\_intersectionsInProgress](PlaneText.md#_intersectionsinprogress)
- [\_isDirty](PlaneText.md#_isdirty)
- [\_isNode](PlaneText.md#_isnode)
- [\_isWorldMatrixFrozen](PlaneText.md#_isworldmatrixfrozen)
- [\_lightSources](PlaneText.md#_lightsources)
- [\_localMatrix](PlaneText.md#_localmatrix)
- [\_masterMesh](PlaneText.md#_mastermesh)
- [\_occlusionDataStorage](PlaneText.md#_occlusiondatastorage)
- [\_occlusionQuery](PlaneText.md#_occlusionquery)
- [\_originalBuilderSideOrientation](PlaneText.md#_originalbuildersideorientation)
- [\_parentContainer](PlaneText.md#_parentcontainer)
- [\_parentNode](PlaneText.md#_parentnode)
- [\_physicsBody](PlaneText.md#_physicsbody)
- [\_physicsImpostor](PlaneText.md#_physicsimpostor)
- [\_poseMatrix](PlaneText.md#_posematrix)
- [\_postMultiplyPivotMatrix](PlaneText.md#_postmultiplypivotmatrix)
- [\_ranges](PlaneText.md#_ranges)
- [\_renderId](PlaneText.md#_renderid)
- [\_renderOutline](PlaneText.md#_renderoutline)
- [\_renderOverlay](PlaneText.md#_renderoverlay)
- [\_renderingGroup](PlaneText.md#_renderinggroup)
- [\_scaling](PlaneText.md#_scaling)
- [\_scene](PlaneText.md#_scene)
- [\_shouldGenerateFlatShading](PlaneText.md#_shouldgenerateflatshading)
- [\_showBoundingBox](PlaneText.md#_showboundingbox)
- [\_submeshesOctree](PlaneText.md#_submeshesoctree)
- [\_thinInstanceDataStorage](PlaneText.md#_thininstancedatastorage)
- [\_transformMatrixTexture](PlaneText.md#_transformmatrixtexture)
- [\_unIndexed](PlaneText.md#_unindexed)
- [\_uniformBuffer](PlaneText.md#_uniformbuffer)
- [\_userInstancedBuffersStorage](PlaneText.md#_userinstancedbuffersstorage)
- [\_userThinInstanceBuffersStorage](PlaneText.md#_userthininstancebuffersstorage)
- [\_waitingData](PlaneText.md#_waitingdata)
- [\_waitingMaterialId](PlaneText.md#_waitingmaterialid)
- [\_waitingMorphTargetManagerId](PlaneText.md#_waitingmorphtargetmanagerid)
- [\_waitingParentId](PlaneText.md#_waitingparentid)
- [\_waitingParentInstanceIndex](PlaneText.md#_waitingparentinstanceindex)
- [\_waitingParsedUniqueId](PlaneText.md#_waitingparseduniqueid)
- [\_worldMatrix](PlaneText.md#_worldmatrix)
- [\_worldMatrixDeterminant](PlaneText.md#_worldmatrixdeterminant)
- [\_worldMatrixDeterminantIsDirty](PlaneText.md#_worldmatrixdeterminantisdirty)
- [actionManager](PlaneText.md#actionmanager)
- [alphaIndex](PlaneText.md#alphaindex)
- [alwaysSelectAsActiveMesh](PlaneText.md#alwaysselectasactivemesh)
- [animations](PlaneText.md#animations)
- [cullingStrategy](PlaneText.md#cullingstrategy)
- [customMarkAsDirty](PlaneText.md#custommarkasdirty)
- [decalMap](PlaneText.md#decalmap)
- [definedFacingForward](PlaneText.md#definedfacingforward)
- [delayLoadState](PlaneText.md#delayloadstate)
- [delayLoadingFile](PlaneText.md#delayloadingfile)
- [doNotSyncBoundingInfo](PlaneText.md#donotsyncboundinginfo)
- [edgesColor](PlaneText.md#edgescolor)
- [edgesRenderer](PlaneText.md#edgesrenderer)
- [edgesShareWithInstances](PlaneText.md#edgessharewithinstances)
- [edgesWidth](PlaneText.md#edgeswidth)
- [ellipsoid](PlaneText.md#ellipsoid)
- [ellipsoidOffset](PlaneText.md#ellipsoidoffset)
- [enablePointerMoveEvents](PlaneText.md#enablepointermoveevents)
- [forceRenderingWhenOccluded](PlaneText.md#forcerenderingwhenoccluded)
- [id](PlaneText.md#id)
- [ignoreCameraMaxZ](PlaneText.md#ignorecameramaxz)
- [ignoreNonUniformScaling](PlaneText.md#ignorenonuniformscaling)
- [inspectableCustomProperties](PlaneText.md#inspectablecustomproperties)
- [instancedBuffers](PlaneText.md#instancedbuffers)
- [instances](PlaneText.md#instances)
- [isBlocker](PlaneText.md#isblocker)
- [isNearGrabbable](PlaneText.md#isneargrabbable)
- [isNearPickable](PlaneText.md#isnearpickable)
- [isOccluded](PlaneText.md#isoccluded)
- [isOcclusionQueryInProgress](PlaneText.md#isocclusionqueryinprogress)
- [isPickable](PlaneText.md#ispickable)
- [metadata](PlaneText.md#metadata)
- [name](PlaneText.md#name)
- [occlusionQueryAlgorithmType](PlaneText.md#occlusionqueryalgorithmtype)
- [occlusionRetryCount](PlaneText.md#occlusionretrycount)
- [occlusionType](PlaneText.md#occlusiontype)
- [onAccessibilityTagChangedObservable](PlaneText.md#onaccessibilitytagchangedobservable)
- [onAfterWorldMatrixUpdateObservable](PlaneText.md#onafterworldmatrixupdateobservable)
- [onCollideObservable](PlaneText.md#oncollideobservable)
- [onCollisionPositionChangeObservable](PlaneText.md#oncollisionpositionchangeobservable)
- [onDisposeObservable](PlaneText.md#ondisposeobservable)
- [onLODLevelSelection](PlaneText.md#onlodlevelselection)
- [onMaterialChangedObservable](PlaneText.md#onmaterialchangedobservable)
- [onMeshReadyObservable](PlaneText.md#onmeshreadyobservable)
- [onReady](PlaneText.md#onready)
- [onRebuildObservable](PlaneText.md#onrebuildobservable)
- [options](PlaneText.md#options)
- [outlineColor](PlaneText.md#outlinecolor)
- [outlineWidth](PlaneText.md#outlinewidth)
- [overlayAlpha](PlaneText.md#overlayalpha)
- [overlayColor](PlaneText.md#overlaycolor)
- [physicsBody](PlaneText.md#physicsbody)
- [physicsImpostor](PlaneText.md#physicsimpostor)
- [reIntegrateRotationIntoRotationQuaternion](PlaneText.md#reintegraterotationintorotationquaternion)
- [renderOutline](PlaneText.md#renderoutline)
- [renderOverlay](PlaneText.md#renderoverlay)
- [reservedDataStore](PlaneText.md#reserveddatastore)
- [scalingDeterminant](PlaneText.md#scalingdeterminant)
- [scene](PlaneText.md#scene)
- [showBoundingBox](PlaneText.md#showboundingbox)
- [showSubMeshesBoundingBox](PlaneText.md#showsubmeshesboundingbox)
- [state](PlaneText.md#state)
- [subMeshes](PlaneText.md#submeshes)
- [thinInstanceAllowAutomaticStaticBufferRecreation](PlaneText.md#thininstanceallowautomaticstaticbufferrecreation)
- [thinInstanceCount](PlaneText.md#thininstancecount)
- [thinInstanceEnablePicking](PlaneText.md#thininstanceenablepicking)
- [uniqueId](PlaneText.md#uniqueid)
- [useOctreeForCollisions](PlaneText.md#useoctreeforcollisions)
- [useOctreeForPicking](PlaneText.md#useoctreeforpicking)
- [useOctreeForRenderingSelection](PlaneText.md#useoctreeforrenderingselection)
- [BACKSIDE](PlaneText.md#backside)
- [BOTTOM](PlaneText.md#bottom)
- [BillboardUseParentOrientation](PlaneText.md#billboarduseparentorientation)
- [CAP\_ALL](PlaneText.md#cap_all)
- [CAP\_END](PlaneText.md#cap_end)
- [CAP\_START](PlaneText.md#cap_start)
- [CENTER](PlaneText.md#center)
- [CULLINGSTRATEGY\_BOUNDINGSPHERE\_ONLY](PlaneText.md#cullingstrategy_boundingsphere_only)
- [CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION](PlaneText.md#cullingstrategy_optimistic_inclusion)
- [CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION\_THEN\_BSPHERE\_ONLY](PlaneText.md#cullingstrategy_optimistic_inclusion_then_bsphere_only)
- [CULLINGSTRATEGY\_STANDARD](PlaneText.md#cullingstrategy_standard)
- [DEFAULTSIDE](PlaneText.md#defaultside)
- [DOUBLESIDE](PlaneText.md#doubleside)
- [FLIP\_N\_ROTATE\_ROW](PlaneText.md#flip_n_rotate_row)
- [FLIP\_N\_ROTATE\_TILE](PlaneText.md#flip_n_rotate_tile)
- [FLIP\_ROW](PlaneText.md#flip_row)
- [FLIP\_TILE](PlaneText.md#flip_tile)
- [FRONTSIDE](PlaneText.md#frontside)
- [INSTANCEDMESH\_SORT\_TRANSPARENT](PlaneText.md#instancedmesh_sort_transparent)
- [LEFT](PlaneText.md#left)
- [NO\_CAP](PlaneText.md#no_cap)
- [NO\_FLIP](PlaneText.md#no_flip)
- [OCCLUSION\_ALGORITHM\_TYPE\_ACCURATE](PlaneText.md#occlusion_algorithm_type_accurate)
- [OCCLUSION\_ALGORITHM\_TYPE\_CONSERVATIVE](PlaneText.md#occlusion_algorithm_type_conservative)
- [OCCLUSION\_TYPE\_NONE](PlaneText.md#occlusion_type_none)
- [OCCLUSION\_TYPE\_OPTIMISTIC](PlaneText.md#occlusion_type_optimistic)
- [OCCLUSION\_TYPE\_STRICT](PlaneText.md#occlusion_type_strict)
- [RIGHT](PlaneText.md#right)
- [ROTATE\_ROW](PlaneText.md#rotate_row)
- [ROTATE\_TILE](PlaneText.md#rotate_tile)
- [TOP](PlaneText.md#top)
- [\_AnimationRangeFactory](PlaneText.md#_animationrangefactory)
- [\_GoldbergMeshParser](PlaneText.md#_goldbergmeshparser)
- [\_GreasedLineMeshParser](PlaneText.md#_greasedlinemeshparser)
- [\_GreasedLineRibbonMeshParser](PlaneText.md#_greasedlineribbonmeshparser)
- [\_GroundMeshParser](PlaneText.md#_groundmeshparser)
- [\_LinesMeshParser](PlaneText.md#_linesmeshparser)
- [\_TrailMeshParser](PlaneText.md#_trailmeshparser)

### Accessors

- [\_isMesh](PlaneText.md#_ismesh)
- [\_positions](PlaneText.md#_positions)
- [absolutePosition](PlaneText.md#absoluteposition)
- [absoluteRotationQuaternion](PlaneText.md#absoluterotationquaternion)
- [absoluteScaling](PlaneText.md#absolutescaling)
- [accessibilityTag](PlaneText.md#accessibilitytag)
- [align](PlaneText.md#align)
- [animationPropertiesOverride](PlaneText.md#animationpropertiesoverride)
- [applyFog](PlaneText.md#applyfog)
- [areNormalsFrozen](PlaneText.md#arenormalsfrozen)
- [atlas](PlaneText.md#atlas)
- [bakedVertexAnimationManager](PlaneText.md#bakedvertexanimationmanager)
- [behaviors](PlaneText.md#behaviors)
- [billboardMode](PlaneText.md#billboardmode)
- [checkCollisions](PlaneText.md#checkcollisions)
- [cloneMeshMap](PlaneText.md#clonemeshmap)
- [collider](PlaneText.md#collider)
- [collisionGroup](PlaneText.md#collisiongroup)
- [collisionMask](PlaneText.md#collisionmask)
- [collisionResponse](PlaneText.md#collisionresponse)
- [collisionRetryCount](PlaneText.md#collisionretrycount)
- [color](PlaneText.md#color)
- [computeBonesUsingShaders](PlaneText.md#computebonesusingshaders)
- [doNotSerialize](PlaneText.md#donotserialize)
- [enableDistantPicking](PlaneText.md#enabledistantpicking)
- [facetDepthSortFrom](PlaneText.md#facetdepthsortfrom)
- [facetNb](PlaneText.md#facetnb)
- [font](PlaneText.md#font)
- [fontHeight](PlaneText.md#fontheight)
- [forceWorldMatrixInstancedBufferUpdate](PlaneText.md#forceworldmatrixinstancedbufferupdate)
- [forcedInstanceCount](PlaneText.md#forcedinstancecount)
- [forward](PlaneText.md#forward)
- [geometry](PlaneText.md#geometry)
- [hasBoundingInfo](PlaneText.md#hasboundinginfo)
- [hasInstances](PlaneText.md#hasinstances)
- [hasLODLevels](PlaneText.md#haslodlevels)
- [hasThinInstances](PlaneText.md#hasthininstances)
- [hasVertexAlpha](PlaneText.md#hasvertexalpha)
- [infiniteDistance](PlaneText.md#infinitedistance)
- [inheritVisibility](PlaneText.md#inheritvisibility)
- [isAnInstance](PlaneText.md#isaninstance)
- [isBlocked](PlaneText.md#isblocked)
- [isFacetDataEnabled](PlaneText.md#isfacetdataenabled)
- [isUnIndexed](PlaneText.md#isunindexed)
- [isVisible](PlaneText.md#isvisible)
- [isWorldMatrixFrozen](PlaneText.md#isworldmatrixfrozen)
- [layerMask](PlaneText.md#layermask)
- [lightSources](PlaneText.md#lightsources)
- [manualUpdateOfPreviousWorldMatrixInstancedBuffer](PlaneText.md#manualupdateofpreviousworldmatrixinstancedbuffer)
- [manualUpdateOfWorldMatrixInstancedBuffer](PlaneText.md#manualupdateofworldmatrixinstancedbuffer)
- [material](PlaneText.md#material)
- [morphTargetManager](PlaneText.md#morphtargetmanager)
- [mustDepthSortFacets](PlaneText.md#mustdepthsortfacets)
- [nonUniformScaling](PlaneText.md#nonuniformscaling)
- [numBoneInfluencers](PlaneText.md#numboneinfluencers)
- [onAfterRenderObservable](PlaneText.md#onafterrenderobservable)
- [onBeforeBindObservable](PlaneText.md#onbeforebindobservable)
- [onBeforeDraw](PlaneText.md#onbeforedraw)
- [onBeforeDrawObservable](PlaneText.md#onbeforedrawobservable)
- [onBeforeRenderObservable](PlaneText.md#onbeforerenderobservable)
- [onBetweenPassObservable](PlaneText.md#onbetweenpassobservable)
- [onClonedObservable](PlaneText.md#onclonedobservable)
- [onCollide](PlaneText.md#oncollide)
- [onCollisionPositionChange](PlaneText.md#oncollisionpositionchange)
- [onDispose](PlaneText.md#ondispose)
- [onEnabledStateChangedObservable](PlaneText.md#onenabledstatechangedobservable)
- [opacity](PlaneText.md#opacity)
- [overrideMaterialSideOrientation](PlaneText.md#overridematerialsideorientation)
- [overrideRenderingFillMode](PlaneText.md#overriderenderingfillmode)
- [overridenInstanceCount](PlaneText.md#overrideninstancecount)
- [parent](PlaneText.md#parent)
- [partitioningBBoxRatio](PlaneText.md#partitioningbboxratio)
- [partitioningSubdivisions](PlaneText.md#partitioningsubdivisions)
- [pointerOverDisableMeshTesting](PlaneText.md#pointeroverdisablemeshtesting)
- [position](PlaneText.md#position)
- [preserveParentRotationForBillboard](PlaneText.md#preserveparentrotationforbillboard)
- [previousWorldMatrixInstancedBuffer](PlaneText.md#previousworldmatrixinstancedbuffer)
- [rawBoundingInfo](PlaneText.md#rawboundinginfo)
- [receiveShadows](PlaneText.md#receiveshadows)
- [renderingGroupId](PlaneText.md#renderinggroupid)
- [right](PlaneText.md#right-1)
- [rotation](PlaneText.md#rotation)
- [rotationQuaternion](PlaneText.md#rotationquaternion)
- [scaling](PlaneText.md#scaling)
- [sideOrientation](PlaneText.md#sideorientation)
- [size](PlaneText.md#size)
- [skeleton](PlaneText.md#skeleton)
- [source](PlaneText.md#source)
- [surroundingMeshes](PlaneText.md#surroundingmeshes)
- [text](PlaneText.md#text)
- [up](PlaneText.md#up)
- [useBones](PlaneText.md#usebones)
- [useLODScreenCoverage](PlaneText.md#uselodscreencoverage)
- [useVertexColors](PlaneText.md#usevertexcolors)
- [visibility](PlaneText.md#visibility)
- [worldMatrixFromCache](PlaneText.md#worldmatrixfromcache)
- [worldMatrixInstancedBuffer](PlaneText.md#worldmatrixinstancedbuffer)
- [BILLBOARDMODE\_ALL](PlaneText.md#billboardmode_all)
- [BILLBOARDMODE\_NONE](PlaneText.md#billboardmode_none)
- [BILLBOARDMODE\_USE\_POSITION](PlaneText.md#billboardmode_use_position)
- [BILLBOARDMODE\_X](PlaneText.md#billboardmode_x)
- [BILLBOARDMODE\_Y](PlaneText.md#billboardmode_y)
- [BILLBOARDMODE\_Z](PlaneText.md#billboardmode_z)

### Methods

- [\_activate](PlaneText.md#_activate)
- [\_addToSceneRootNodes](PlaneText.md#_addtoscenerootnodes)
- [\_afterComputeWorldMatrix](PlaneText.md#_aftercomputeworldmatrix)
- [\_bind](PlaneText.md#_bind)
- [\_bindDirect](PlaneText.md#_binddirect)
- [\_buildUniformLayout](PlaneText.md#_builduniformlayout)
- [\_checkCollision](PlaneText.md#_checkcollision)
- [\_checkDelayState](PlaneText.md#_checkdelaystate)
- [\_checkOcclusionQuery](PlaneText.md#_checkocclusionquery)
- [\_collideForSubMesh](PlaneText.md#_collideforsubmesh)
- [\_copySource](PlaneText.md#_copysource)
- [\_createGlobalSubMesh](PlaneText.md#_createglobalsubmesh)
- [\_disposeInstanceSpecificData](PlaneText.md#_disposeinstancespecificdata)
- [\_disposeThinInstanceSpecificData](PlaneText.md#_disposethininstancespecificdata)
- [\_draw](PlaneText.md#_draw)
- [\_freeze](PlaneText.md#_freeze)
- [\_generatePointsArray](PlaneText.md#_generatepointsarray)
- [\_getActionManagerForTrigger](PlaneText.md#_getactionmanagerfortrigger)
- [\_getData](PlaneText.md#_getdata)
- [\_getDescendants](PlaneText.md#_getdescendants)
- [\_getEffectiveParent](PlaneText.md#_geteffectiveparent)
- [\_getInstancesRenderList](PlaneText.md#_getinstancesrenderlist)
- [\_getRenderingFillMode](PlaneText.md#_getrenderingfillmode)
- [\_getWorldMatrixDeterminant](PlaneText.md#_getworldmatrixdeterminant)
- [\_initCache](PlaneText.md#_initcache)
- [\_invalidateInstanceVertexArrayObject](PlaneText.md#_invalidateinstancevertexarrayobject)
- [\_isSynchronized](PlaneText.md#_issynchronized)
- [\_markSubMeshesAsAttributesDirty](PlaneText.md#_marksubmeshesasattributesdirty)
- [\_markSubMeshesAsLightDirty](PlaneText.md#_marksubmeshesaslightdirty)
- [\_markSubMeshesAsMiscDirty](PlaneText.md#_marksubmeshesasmiscdirty)
- [\_markSyncedWithParent](PlaneText.md#_marksyncedwithparent)
- [\_postActivate](PlaneText.md#_postactivate)
- [\_preActivate](PlaneText.md#_preactivate)
- [\_preActivateForIntermediateRendering](PlaneText.md#_preactivateforintermediaterendering)
- [\_processCollisionsForSubMeshes](PlaneText.md#_processcollisionsforsubmeshes)
- [\_processInstancedBuffers](PlaneText.md#_processinstancedbuffers)
- [\_processRendering](PlaneText.md#_processrendering)
- [\_rebuild](PlaneText.md#_rebuild)
- [\_refreshBoundingInfo](PlaneText.md#_refreshboundinginfo)
- [\_refreshBoundingInfoDirect](PlaneText.md#_refreshboundinginfodirect)
- [\_registerInstanceForRenderId](PlaneText.md#_registerinstanceforrenderid)
- [\_removeFromSceneRootNodes](PlaneText.md#_removefromscenerootnodes)
- [\_removeLightSource](PlaneText.md#_removelightsource)
- [\_renderWithInstances](PlaneText.md#_renderwithinstances)
- [\_renderWithThinInstances](PlaneText.md#_renderwiththininstances)
- [\_resetPointsArrayCache](PlaneText.md#_resetpointsarraycache)
- [\_resyncLightSource](PlaneText.md#_resynclightsource)
- [\_resyncLightSources](PlaneText.md#_resynclightsources)
- [\_serializeAsParent](PlaneText.md#_serializeasparent)
- [\_setMaterial](PlaneText.md#_setmaterial)
- [\_setReady](PlaneText.md#_setready)
- [\_shouldConvertRHS](PlaneText.md#_shouldconvertrhs)
- [\_syncGeometryWithMorphTargetManager](PlaneText.md#_syncgeometrywithmorphtargetmanager)
- [\_syncParentEnabledState](PlaneText.md#_syncparentenabledstate)
- [\_thinInstanceCreateMatrixBuffer](PlaneText.md#_thininstancecreatematrixbuffer)
- [\_thinInstanceInitializeUserStorage](PlaneText.md#_thininstanceinitializeuserstorage)
- [\_thinInstanceRecreateBuffer](PlaneText.md#_thininstancerecreatebuffer)
- [\_thinInstanceUpdateBufferSize](PlaneText.md#_thininstanceupdatebuffersize)
- [\_unBindEffect](PlaneText.md#_unbindeffect)
- [\_unFreeze](PlaneText.md#_unfreeze)
- [\_updateBoundingInfo](PlaneText.md#_updateboundinginfo)
- [\_updateCache](PlaneText.md#_updatecache)
- [\_updateInstancedBuffers](PlaneText.md#_updateinstancedbuffers)
- [\_updateNonUniformScalingState](PlaneText.md#_updatenonuniformscalingstate)
- [\_updateSubMeshesBoundingInfo](PlaneText.md#_updatesubmeshesboundinginfo)
- [addBehavior](PlaneText.md#addbehavior)
- [addChild](PlaneText.md#addchild)
- [addInstance](PlaneText.md#addinstance)
- [addLODLevel](PlaneText.md#addlodlevel)
- [addRotation](PlaneText.md#addrotation)
- [alignWithNormal](PlaneText.md#alignwithnormal)
- [applyAngularImpulse](PlaneText.md#applyangularimpulse)
- [applyDisplacementMap](PlaneText.md#applydisplacementmap)
- [applyDisplacementMapFromBuffer](PlaneText.md#applydisplacementmapfrombuffer)
- [applyImpulse](PlaneText.md#applyimpulse)
- [applySkeleton](PlaneText.md#applyskeleton)
- [attachToBone](PlaneText.md#attachtobone)
- [bakeCurrentTransformIntoVertices](PlaneText.md#bakecurrenttransformintovertices)
- [bakeTransformIntoVertices](PlaneText.md#baketransformintovertices)
- [beginAnimation](PlaneText.md#beginanimation)
- [buildBoundingInfo](PlaneText.md#buildboundinginfo)
- [calcMovePOV](PlaneText.md#calcmovepov)
- [calcRotatePOV](PlaneText.md#calcrotatepov)
- [cleanMatrixWeights](PlaneText.md#cleanmatrixweights)
- [clone](PlaneText.md#clone)
- [computeWorldMatrix](PlaneText.md#computeworldmatrix)
- [convertToFlatShadedMesh](PlaneText.md#converttoflatshadedmesh)
- [convertToUnIndexedMesh](PlaneText.md#converttounindexedmesh)
- [copyVerticesData](PlaneText.md#copyverticesdata)
- [createAnimationRange](PlaneText.md#createanimationrange)
- [createInstance](PlaneText.md#createinstance)
- [createNormals](PlaneText.md#createnormals)
- [createOrUpdateSubmeshesOctree](PlaneText.md#createorupdatesubmeshesoctree)
- [deleteAnimationRange](PlaneText.md#deleteanimationrange)
- [detachFromBone](PlaneText.md#detachfrombone)
- [directRender](PlaneText.md#directrender)
- [disableEdgesRendering](PlaneText.md#disableedgesrendering)
- [disableFacetData](PlaneText.md#disablefacetdata)
- [dispose](PlaneText.md#dispose)
- [enableEdgesRendering](PlaneText.md#enableedgesrendering)
- [fixScaleAndPivot](PlaneText.md#fixscaleandpivot)
- [flipFaces](PlaneText.md#flipfaces)
- [forceSharedVertices](PlaneText.md#forcesharedvertices)
- [freezeNormals](PlaneText.md#freezenormals)
- [freezeWorldMatrix](PlaneText.md#freezeworldmatrix)
- [getAbsolutePivotPoint](PlaneText.md#getabsolutepivotpoint)
- [getAbsolutePivotPointToRef](PlaneText.md#getabsolutepivotpointtoref)
- [getAbsolutePosition](PlaneText.md#getabsoluteposition)
- [getAnimatables](PlaneText.md#getanimatables)
- [getAnimationByName](PlaneText.md#getanimationbyname)
- [getAnimationRange](PlaneText.md#getanimationrange)
- [getAnimationRanges](PlaneText.md#getanimationranges)
- [getBehaviorByName](PlaneText.md#getbehaviorbyname)
- [getBoundingInfo](PlaneText.md#getboundinginfo)
- [getChildMeshes](PlaneText.md#getchildmeshes)
- [getChildTransformNodes](PlaneText.md#getchildtransformnodes)
- [getChildren](PlaneText.md#getchildren)
- [getClassName](PlaneText.md#getclassname)
- [getClosestFacetAtCoordinates](PlaneText.md#getclosestfacetatcoordinates)
- [getClosestFacetAtLocalCoordinates](PlaneText.md#getclosestfacetatlocalcoordinates)
- [getConnectedParticleSystems](PlaneText.md#getconnectedparticlesystems)
- [getDescendants](PlaneText.md#getdescendants)
- [getDirection](PlaneText.md#getdirection)
- [getDirectionToRef](PlaneText.md#getdirectiontoref)
- [getDistanceToCamera](PlaneText.md#getdistancetocamera)
- [getEmittedParticleSystems](PlaneText.md#getemittedparticlesystems)
- [getEngine](PlaneText.md#getengine)
- [getFacetDataParameters](PlaneText.md#getfacetdataparameters)
- [getFacetLocalNormals](PlaneText.md#getfacetlocalnormals)
- [getFacetLocalPartitioning](PlaneText.md#getfacetlocalpartitioning)
- [getFacetLocalPositions](PlaneText.md#getfacetlocalpositions)
- [getFacetNormal](PlaneText.md#getfacetnormal)
- [getFacetNormalToRef](PlaneText.md#getfacetnormaltoref)
- [getFacetPosition](PlaneText.md#getfacetposition)
- [getFacetPositionToRef](PlaneText.md#getfacetpositiontoref)
- [getFacetsAtLocalCoordinates](PlaneText.md#getfacetsatlocalcoordinates)
- [getHierarchyBoundingVectors](PlaneText.md#gethierarchyboundingvectors)
- [getHierarchyEmittedParticleSystems](PlaneText.md#gethierarchyemittedparticlesystems)
- [getIndices](PlaneText.md#getindices)
- [getLOD](PlaneText.md#getlod)
- [getLODLevelAtDistance](PlaneText.md#getlodlevelatdistance)
- [getLODLevels](PlaneText.md#getlodlevels)
- [getMaterialForRenderPass](PlaneText.md#getmaterialforrenderpass)
- [getMeshUniformBuffer](PlaneText.md#getmeshuniformbuffer)
- [getNormalsData](PlaneText.md#getnormalsdata)
- [getPhysicsBody](PlaneText.md#getphysicsbody)
- [getPhysicsImpostor](PlaneText.md#getphysicsimpostor)
- [getPivotMatrix](PlaneText.md#getpivotmatrix)
- [getPivotPoint](PlaneText.md#getpivotpoint)
- [getPivotPointToRef](PlaneText.md#getpivotpointtoref)
- [getPoseMatrix](PlaneText.md#getposematrix)
- [getPositionData](PlaneText.md#getpositiondata)
- [getPositionExpressedInLocalSpace](PlaneText.md#getpositionexpressedinlocalspace)
- [getPositionInCameraSpace](PlaneText.md#getpositionincameraspace)
- [getRawBoundingInfo](PlaneText.md#getrawboundinginfo)
- [getScene](PlaneText.md#getscene)
- [getTotalIndices](PlaneText.md#gettotalindices)
- [getTotalVertices](PlaneText.md#gettotalvertices)
- [getVertexBuffer](PlaneText.md#getvertexbuffer)
- [getVerticesData](PlaneText.md#getverticesdata)
- [getVerticesDataKinds](PlaneText.md#getverticesdatakinds)
- [getWorldMatrix](PlaneText.md#getworldmatrix)
- [increaseVertices](PlaneText.md#increasevertices)
- [instantiateHierarchy](PlaneText.md#instantiatehierarchy)
- [intersects](PlaneText.md#intersects)
- [intersectsMesh](PlaneText.md#intersectsmesh)
- [intersectsPoint](PlaneText.md#intersectspoint)
- [isCompletelyInFrustum](PlaneText.md#iscompletelyinfrustum)
- [isDescendantOf](PlaneText.md#isdescendantof)
- [isDisposed](PlaneText.md#isdisposed)
- [isEnabled](PlaneText.md#isenabled)
- [isInFrustum](PlaneText.md#isinfrustum)
- [isReady](PlaneText.md#isready)
- [isSynchronized](PlaneText.md#issynchronized)
- [isSynchronizedWithParent](PlaneText.md#issynchronizedwithparent)
- [isUsingPivotMatrix](PlaneText.md#isusingpivotmatrix)
- [isUsingPostMultiplyPivotMatrix](PlaneText.md#isusingpostmultiplypivotmatrix)
- [isVertexBufferUpdatable](PlaneText.md#isvertexbufferupdatable)
- [isVerticesDataPresent](PlaneText.md#isverticesdatapresent)
- [isWorldMatrixCameraDependent](PlaneText.md#isworldmatrixcameradependent)
- [locallyTranslate](PlaneText.md#locallytranslate)
- [lookAt](PlaneText.md#lookat)
- [makeGeometryUnique](PlaneText.md#makegeometryunique)
- [markAsDirty](PlaneText.md#markasdirty)
- [markVerticesDataAsUpdatable](PlaneText.md#markverticesdataasupdatable)
- [movePOV](PlaneText.md#movepov)
- [moveWithCollisions](PlaneText.md#movewithcollisions)
- [normalizeToUnitCube](PlaneText.md#normalizetounitcube)
- [optimizeIndices](PlaneText.md#optimizeindices)
- [optimizeIndicesAsync](PlaneText.md#optimizeindicesasync)
- [refreshBoundingInfo](PlaneText.md#refreshboundinginfo)
- [registerAfterRender](PlaneText.md#registerafterrender)
- [registerAfterWorldMatrixUpdate](PlaneText.md#registerafterworldmatrixupdate)
- [registerBeforeRender](PlaneText.md#registerbeforerender)
- [registerInstancedBuffer](PlaneText.md#registerinstancedbuffer)
- [releaseSubMeshes](PlaneText.md#releasesubmeshes)
- [removeBehavior](PlaneText.md#removebehavior)
- [removeChild](PlaneText.md#removechild)
- [removeInstance](PlaneText.md#removeinstance)
- [removeLODLevel](PlaneText.md#removelodlevel)
- [removeVerticesData](PlaneText.md#removeverticesdata)
- [render](PlaneText.md#render)
- [renderWithRenderPassId](PlaneText.md#renderwithrenderpassid)
- [resetDrawCache](PlaneText.md#resetdrawcache)
- [resetLocalMatrix](PlaneText.md#resetlocalmatrix)
- [rotate](PlaneText.md#rotate)
- [rotateAround](PlaneText.md#rotatearound)
- [rotatePOV](PlaneText.md#rotatepov)
- [run](PlaneText.md#run)
- [serialize](PlaneText.md#serialize)
- [serializeAnimationRanges](PlaneText.md#serializeanimationranges)
- [setAbsolutePosition](PlaneText.md#setabsoluteposition)
- [setBoundingInfo](PlaneText.md#setboundinginfo)
- [setDirection](PlaneText.md#setdirection)
- [setEnabled](PlaneText.md#setenabled)
- [setIndexBuffer](PlaneText.md#setindexbuffer)
- [setIndices](PlaneText.md#setindices)
- [setMaterialByID](PlaneText.md#setmaterialbyid)
- [setMaterialById](PlaneText.md#setmaterialbyid-1)
- [setMaterialForRenderPass](PlaneText.md#setmaterialforrenderpass)
- [setNormalsForCPUSkinning](PlaneText.md#setnormalsforcpuskinning)
- [setParent](PlaneText.md#setparent)
- [setPhysicsLinkWith](PlaneText.md#setphysicslinkwith)
- [setPivotMatrix](PlaneText.md#setpivotmatrix)
- [setPivotPoint](PlaneText.md#setpivotpoint)
- [setPositionWithLocalVector](PlaneText.md#setpositionwithlocalvector)
- [setPositionsForCPUSkinning](PlaneText.md#setpositionsforcpuskinning)
- [setPreTransformMatrix](PlaneText.md#setpretransformmatrix)
- [setVerticesBuffer](PlaneText.md#setverticesbuffer)
- [setVerticesData](PlaneText.md#setverticesdata)
- [simplify](PlaneText.md#simplify)
- [subdivide](PlaneText.md#subdivide)
- [synchronizeInstances](PlaneText.md#synchronizeinstances)
- [thinInstanceAdd](PlaneText.md#thininstanceadd)
- [thinInstanceAddSelf](PlaneText.md#thininstanceaddself)
- [thinInstanceBufferUpdated](PlaneText.md#thininstancebufferupdated)
- [thinInstanceGetWorldMatrices](PlaneText.md#thininstancegetworldmatrices)
- [thinInstancePartialBufferUpdate](PlaneText.md#thininstancepartialbufferupdate)
- [thinInstanceRefreshBoundingInfo](PlaneText.md#thininstancerefreshboundinginfo)
- [thinInstanceRegisterAttribute](PlaneText.md#thininstanceregisterattribute)
- [thinInstanceSetAttributeAt](PlaneText.md#thininstancesetattributeat)
- [thinInstanceSetBuffer](PlaneText.md#thininstancesetbuffer)
- [thinInstanceSetMatrixAt](PlaneText.md#thininstancesetmatrixat)
- [toLeftHanded](PlaneText.md#tolefthanded)
- [toString](PlaneText.md#tostring)
- [transferFromMesh](PlaneText.md#transferfrommesh)
- [transferToEffect](PlaneText.md#transfertoeffect)
- [translate](PlaneText.md#translate)
- [unfreezeNormals](PlaneText.md#unfreezenormals)
- [unfreezeWorldMatrix](PlaneText.md#unfreezeworldmatrix)
- [unregisterAfterRender](PlaneText.md#unregisterafterrender)
- [unregisterAfterWorldMatrixUpdate](PlaneText.md#unregisterafterworldmatrixupdate)
- [unregisterBeforeRender](PlaneText.md#unregisterbeforerender)
- [updateCache](PlaneText.md#updatecache)
- [updateFacetData](PlaneText.md#updatefacetdata)
- [updateIndices](PlaneText.md#updateindices)
- [updateMeshPositions](PlaneText.md#updatemeshpositions)
- [updatePlaneText](PlaneText.md#updateplanetext)
- [updatePoseMatrix](PlaneText.md#updateposematrix)
- [updateVerticesData](PlaneText.md#updateverticesdata)
- [validateSkinning](PlaneText.md#validateskinning)
- [AddNodeConstructor](PlaneText.md#addnodeconstructor)
- [Center](PlaneText.md#center-1)
- [Construct](PlaneText.md#construct)
- [CreateBox](PlaneText.md#createbox)
- [CreateCapsule](PlaneText.md#createcapsule)
- [CreateCylinder](PlaneText.md#createcylinder)
- [CreateDashedLines](PlaneText.md#createdashedlines)
- [CreateDecal](PlaneText.md#createdecal)
- [CreateDisc](PlaneText.md#createdisc)
- [CreateGround](PlaneText.md#createground)
- [CreateGroundFromHeightMap](PlaneText.md#creategroundfromheightmap)
- [CreateHemisphere](PlaneText.md#createhemisphere)
- [CreateIcoSphere](PlaneText.md#createicosphere)
- [CreateLathe](PlaneText.md#createlathe)
- [CreateLines](PlaneText.md#createlines)
- [CreatePlane](PlaneText.md#createplane)
- [CreatePolygon](PlaneText.md#createpolygon)
- [CreatePolyhedron](PlaneText.md#createpolyhedron)
- [CreateRibbon](PlaneText.md#createribbon)
- [CreateSphere](PlaneText.md#createsphere)
- [CreateTiledGround](PlaneText.md#createtiledground)
- [CreateTorus](PlaneText.md#createtorus)
- [CreateTorusKnot](PlaneText.md#createtorusknot)
- [CreateTube](PlaneText.md#createtube)
- [ExtendToGoldberg](PlaneText.md#extendtogoldberg)
- [ExtrudePolygon](PlaneText.md#extrudepolygon)
- [ExtrudeShape](PlaneText.md#extrudeshape)
- [ExtrudeShapeCustom](PlaneText.md#extrudeshapecustom)
- [MergeMeshes](PlaneText.md#mergemeshes)
- [MergeMeshesAsync](PlaneText.md#mergemeshesasync)
- [MinMax](PlaneText.md#minmax)
- [Parse](PlaneText.md#parse)
- [ParseAnimationRanges](PlaneText.md#parseanimationranges)
- [\_GetDefaultSideOrientation](PlaneText.md#_getdefaultsideorientation)
- [\_PhysicsImpostorParser](PlaneText.md#_physicsimpostorparser)
- [\_instancedMeshFactory](PlaneText.md#_instancedmeshfactory)

## Constructors

### constructor

• **new PlaneText**(`name`, `options`, `scene`): [`PlaneText`](PlaneText.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `PlaneTextOptions` |
| `scene` | `Scene` |

#### Returns

[`PlaneText`](PlaneText.md)

#### Overrides

Mesh.constructor

#### Defined in

[src/prefabs/Text/planeText.ts:26](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L26)

## Properties

### \_\_occlusionDataStorage

• **\_\_occlusionDataStorage**: `_OcclusionDataStorage`

Backing filed

#### Inherited from

Mesh.\_\_occlusionDataStorage

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:68

___

### \_accessibilityTag

• `Protected` **\_accessibilityTag**: `IAccessibilityTag`

#### Inherited from

Mesh.\_accessibilityTag

#### Defined in

node_modules/@babylonjs/core/node.d.ts:82

___

### \_binaryInfo

• **\_binaryInfo**: `any`

#### Inherited from

Mesh.\_binaryInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:311

___

### \_bonesTransformMatrices

• **\_bonesTransformMatrices**: `Float32Array`

#### Inherited from

Mesh.\_bonesTransformMatrices

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:528

___

### \_boundingInfo

• `Protected` **\_boundingInfo**: `BoundingInfo`

#### Inherited from

Mesh.\_boundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:502

___

### \_boundingInfoIsDirty

• `Protected` **\_boundingInfoIsDirty**: `boolean`

#### Inherited from

Mesh.\_boundingInfoIsDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:503

___

### \_cache

• **\_cache**: `any`

#### Inherited from

Mesh.\_cache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:119

___

### \_childUpdateId

• **\_childUpdateId**: `number`

#### Inherited from

Mesh.\_childUpdateId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:109

___

### \_children

• `Protected` **\_children**: `Node`[]

#### Inherited from

Mesh.\_children

#### Defined in

node_modules/@babylonjs/core/node.d.ts:122

___

### \_creationDataStorage

• **\_creationDataStorage**: `_CreationDataStorage`

#### Inherited from

Mesh.\_creationDataStorage

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:318

___

### \_currentRenderId

• **\_currentRenderId**: `number`

#### Inherited from

Mesh.\_currentRenderId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:106

___

### \_decalMap

• **\_decalMap**: `MeshUVSpaceRenderer`

#### Inherited from

Mesh.\_decalMap

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.decalMap.d.ts:6

___

### \_delayInfo

• **\_delayInfo**: `string`[]

#### Inherited from

Mesh.\_delayInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:322

___

### \_delayLoadingFunction

• **\_delayLoadingFunction**: (`any`: `any`, `mesh`: `Mesh`) => `void`

#### Type declaration

▸ (`any`, `mesh`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `any` | `any` |
| `mesh` | `Mesh` |

##### Returns

`void`

#### Inherited from

Mesh.\_delayLoadingFunction

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:324

___

### \_disposePhysicsObserver

• **\_disposePhysicsObserver**: `Observer`\<`Node`\>

#### Inherited from

Mesh.\_disposePhysicsObserver

#### Defined in

node_modules/@babylonjs/core/Physics/v1/physicsEngineComponent.d.ts:43

___

### \_edgesRenderer

• **\_edgesRenderer**: `IEdgesRenderer`

#### Inherited from

Mesh.\_edgesRenderer

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:499

___

### \_geometry

• **\_geometry**: `Geometry`

#### Inherited from

Mesh.\_geometry

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:320

___

### \_indexInSceneTransformNodesArray

• **\_indexInSceneTransformNodesArray**: `number`

#### Inherited from

Mesh.\_indexInSceneTransformNodesArray

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:112

___

### \_instanceDataStorage

• **\_instanceDataStorage**: `_InstanceDataStorage`

#### Inherited from

Mesh.\_instanceDataStorage

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:333

___

### \_internalAbstractMeshDataInfo

• **\_internalAbstractMeshDataInfo**: `_InternalAbstractMeshDataInfo`

#### Inherited from

Mesh.\_internalAbstractMeshDataInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:203

___

### \_internalMetadata

• **\_internalMetadata**: `any`

#### Inherited from

Mesh.\_internalMetadata

#### Defined in

node_modules/@babylonjs/core/node.d.ts:67

___

### \_intersectionsInProgress

• **\_intersectionsInProgress**: `AbstractMesh`[]

#### Inherited from

Mesh.\_intersectionsInProgress

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:512

___

### \_isDirty

• `Protected` **\_isDirty**: `boolean`

#### Inherited from

Mesh.\_isDirty

#### Defined in

node_modules/@babylonjs/core/node.d.ts:24

___

### \_isNode

• `Readonly` **\_isNode**: ``true``

#### Inherited from

Mesh.\_isNode

#### Defined in

node_modules/@babylonjs/core/node.d.ts:160

___

### \_isWorldMatrixFrozen

• `Protected` **\_isWorldMatrixFrozen**: `boolean`

#### Inherited from

Mesh.\_isWorldMatrixFrozen

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:110

___

### \_lightSources

• **\_lightSources**: `Light`[]

#### Inherited from

Mesh.\_lightSources

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:516

___

### \_localMatrix

• **\_localMatrix**: `Matrix`

#### Inherited from

Mesh.\_localMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:101

___

### \_masterMesh

• **\_masterMesh**: `AbstractMesh`

#### Inherited from

Mesh.\_masterMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:501

___

### \_occlusionDataStorage

• **\_occlusionDataStorage**: `_OcclusionDataStorage`

Access property

#### Inherited from

Mesh.\_occlusionDataStorage

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:73

___

### \_occlusionQuery

• **\_occlusionQuery**: `number` \| `WebGLQuery`

#### Inherited from

Mesh.\_occlusionQuery

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:303

___

### \_originalBuilderSideOrientation

• **\_originalBuilderSideOrientation**: `number`

#### Inherited from

Mesh.\_originalBuilderSideOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:339

___

### \_parentContainer

• **\_parentContainer**: `IAssetContainer`

#### Inherited from

Mesh.\_parentContainer

#### Defined in

node_modules/@babylonjs/core/node.d.ts:93

___

### \_parentNode

• `Protected` **\_parentNode**: `Node`

#### Inherited from

Mesh.\_parentNode

#### Defined in

node_modules/@babylonjs/core/node.d.ts:120

___

### \_physicsBody

• **\_physicsBody**: `PhysicsBody`

#### Inherited from

Mesh.\_physicsBody

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:14

___

### \_physicsImpostor

• **\_physicsImpostor**: `PhysicsImpostor`

#### Inherited from

Mesh.\_physicsImpostor

#### Defined in

node_modules/@babylonjs/core/Physics/v1/physicsEngineComponent.d.ts:13

___

### \_poseMatrix

• **\_poseMatrix**: `Matrix`

#### Inherited from

Mesh.\_poseMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:99

___

### \_postMultiplyPivotMatrix

• **\_postMultiplyPivotMatrix**: `boolean`

#### Inherited from

Mesh.\_postMultiplyPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:109

___

### \_ranges

• `Protected` **\_ranges**: `Object`

#### Index signature

▪ [name: `string`]: `Nullable`\<`AnimationRange`\>

#### Inherited from

Mesh.\_ranges

#### Defined in

node_modules/@babylonjs/core/node.d.ts:98

___

### \_renderId

• **\_renderId**: `number`

#### Inherited from

Mesh.\_renderId

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:505

___

### \_renderOutline

• **\_renderOutline**: `boolean`

(Backing field)

#### Inherited from

Mesh.\_renderOutline

#### Defined in

node_modules/@babylonjs/core/Rendering/outlineRenderer.d.ts:20

___

### \_renderOverlay

• **\_renderOverlay**: `boolean`

(Backing field)

#### Inherited from

Mesh.\_renderOverlay

#### Defined in

node_modules/@babylonjs/core/Rendering/outlineRenderer.d.ts:27

___

### \_renderingGroup

• **\_renderingGroup**: `RenderingGroup`

#### Inherited from

Mesh.\_renderingGroup

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:305

___

### \_scaling

• `Protected` **\_scaling**: `Vector3`

#### Inherited from

Mesh.\_scaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:52

___

### \_scene

• **\_scene**: `Scene`

#### Inherited from

Mesh.\_scene

#### Defined in

node_modules/@babylonjs/core/node.d.ts:117

___

### \_shouldGenerateFlatShading

• **\_shouldGenerateFlatShading**: `boolean`

#### Inherited from

Mesh.\_shouldGenerateFlatShading

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:337

___

### \_showBoundingBox

• **\_showBoundingBox**: `boolean`

(Backing field)

#### Inherited from

Mesh.\_showBoundingBox

#### Defined in

node_modules/@babylonjs/core/Rendering/boundingBoxRenderer.d.ts:31

___

### \_submeshesOctree

• **\_submeshesOctree**: `Octree`\<`SubMesh`\>

Backing Field

#### Inherited from

Mesh.\_submeshesOctree

#### Defined in

node_modules/@babylonjs/core/Culling/Octrees/octreeSceneComponent.d.ts:36

___

### \_thinInstanceDataStorage

• **\_thinInstanceDataStorage**: `_ThinInstanceDataStorage`

#### Inherited from

Mesh.\_thinInstanceDataStorage

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:335

___

### \_transformMatrixTexture

• **\_transformMatrixTexture**: `RawTexture`

#### Inherited from

Mesh.\_transformMatrixTexture

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:530

___

### \_unIndexed

• **\_unIndexed**: `boolean`

#### Inherited from

Mesh.\_unIndexed

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:514

___

### \_uniformBuffer

• **\_uniformBuffer**: `UniformBuffer`

The current mesh uniform buffer.
 Internal use only.

#### Inherited from

Mesh.\_uniformBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:545

___

### \_userInstancedBuffersStorage

• **\_userInstancedBuffersStorage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | \{ `[key: string]`: `Float32Array`;  } |
| `sizes` | \{ `[key: string]`: `number`;  } |
| `strides` | \{ `[key: string]`: `number`;  } |
| `vertexArrayObjects?` | \{ `[key: string]`: `WebGLVertexArrayObject`;  } |
| `vertexBuffers` | \{ `[key: string]`: `Nullable`\<`VertexBuffer`\>;  } |

#### Inherited from

Mesh.\_userInstancedBuffersStorage

#### Defined in

node_modules/@babylonjs/core/Meshes/instancedMesh.d.ts:285

___

### \_userThinInstanceBuffersStorage

• **\_userThinInstanceBuffersStorage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | \{ `[key: string]`: `Float32Array`;  } |
| `sizes` | \{ `[key: string]`: `number`;  } |
| `strides` | \{ `[key: string]`: `number`;  } |
| `vertexBuffers` | \{ `[key: string]`: `Nullable`\<`VertexBuffer`\>;  } |

#### Inherited from

Mesh.\_userThinInstanceBuffersStorage

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:97

___

### \_waitingData

• **\_waitingData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actions` | `any` |
| `freezeWorldMatrix` | `boolean` |
| `lods` | `any` |

#### Inherited from

Mesh.\_waitingData

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:522

___

### \_waitingMaterialId

• **\_waitingMaterialId**: `string`

#### Inherited from

Mesh.\_waitingMaterialId

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:205

___

### \_waitingMorphTargetManagerId

• **\_waitingMorphTargetManagerId**: `number`

#### Inherited from

Mesh.\_waitingMorphTargetManagerId

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:207

___

### \_waitingParentId

• **\_waitingParentId**: `string`

#### Inherited from

Mesh.\_waitingParentId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:111

___

### \_waitingParentInstanceIndex

• **\_waitingParentInstanceIndex**: `string`

#### Inherited from

Mesh.\_waitingParentInstanceIndex

#### Defined in

node_modules/@babylonjs/core/node.d.ts:113

___

### \_waitingParsedUniqueId

• **\_waitingParsedUniqueId**: `number`

#### Inherited from

Mesh.\_waitingParsedUniqueId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:115

___

### \_worldMatrix

• **\_worldMatrix**: `Matrix`

#### Inherited from

Mesh.\_worldMatrix

#### Defined in

node_modules/@babylonjs/core/node.d.ts:124

___

### \_worldMatrixDeterminant

• **\_worldMatrixDeterminant**: `number`

#### Inherited from

Mesh.\_worldMatrixDeterminant

#### Defined in

node_modules/@babylonjs/core/node.d.ts:126

___

### \_worldMatrixDeterminantIsDirty

• **\_worldMatrixDeterminantIsDirty**: `boolean`

#### Inherited from

Mesh.\_worldMatrixDeterminantIsDirty

#### Defined in

node_modules/@babylonjs/core/node.d.ts:128

___

### actionManager

• **actionManager**: `AbstractActionManager`

Gets or sets the current action manager

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/events/actions

#### Inherited from

Mesh.actionManager

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:446

___

### alphaIndex

• **alphaIndex**: `number`

Gets or sets the alpha index used to sort transparent meshes

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering#alpha-index

#### Inherited from

Mesh.alphaIndex

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:317

___

### alwaysSelectAsActiveMesh

• **alwaysSelectAsActiveMesh**: `boolean`

True if the mesh must be rendered in any case (this will shortcut the frustum clipping phase)

#### Inherited from

Mesh.alwaysSelectAsActiveMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:437

___

### animations

• **animations**: `Animation`[]

Gets a list of Animations associated with the node

#### Inherited from

Mesh.animations

#### Defined in

node_modules/@babylonjs/core/node.d.ts:97

___

### cullingStrategy

• **cullingStrategy**: `number`

The culling strategy to use to check whether the mesh must be rendered or not.
This value can be changed at any time and will be used on the next render mesh selection.
The possible values are :
- AbstractMesh.CULLINGSTRATEGY_STANDARD
- AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
- AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION
- AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY
Please read each static variable documentation to get details about the culling process.

#### Inherited from

Mesh.cullingStrategy

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:218

___

### customMarkAsDirty

• **customMarkAsDirty**: () => `void`

Allow user to specify custom mechanism for mark as dirty

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

Mesh.customMarkAsDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:157

___

### decalMap

• **decalMap**: `MeshUVSpaceRenderer`

Gets or sets the decal map for this mesh

#### Inherited from

Mesh.decalMap

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.decalMap.d.ts:10

___

### definedFacingForward

• **definedFacingForward**: `boolean`

Gets or sets the orientation for POV movement & rotation

#### Inherited from

Mesh.definedFacingForward

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:301

___

### delayLoadState

• **delayLoadState**: `number`

Gets the delay loading state of the mesh (when delay loading is turned on)

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/importers/incrementalLoading

#### Inherited from

Mesh.delayLoadState

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:298

___

### delayLoadingFile

• **delayLoadingFile**: `string`

Gets the file containing delay loading data for this mesh

#### Inherited from

Mesh.delayLoadingFile

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:309

___

### doNotSyncBoundingInfo

• **doNotSyncBoundingInfo**: `boolean`

Gets or sets a boolean indicating that the bounding info does not need to be kept in sync (for performance reason)

#### Inherited from

Mesh.doNotSyncBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:441

___

### edgesColor

• **edgesColor**: `Color4`

Defines edge color used when edgesRenderer is enabled

**`See`**

https://www.babylonjs-playground.com/#10OJSG#13

#### Inherited from

Mesh.edgesColor

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:497

___

### edgesRenderer

• **edgesRenderer**: `EdgesRenderer`

Gets the edgesRenderer associated with the mesh

#### Inherited from

Mesh.edgesRenderer

#### Defined in

node_modules/@babylonjs/core/Rendering/edgesRenderer.d.ts:23

___

### edgesShareWithInstances

• **edgesShareWithInstances**: `boolean`

true to use the edge renderer for all instances of this mesh

#### Inherited from

Mesh.edgesShareWithInstances

#### Defined in

node_modules/@babylonjs/core/Meshes/instancedMesh.d.ts:283

___

### edgesWidth

• **edgesWidth**: `number`

Defines edge width used when edgesRenderer is enabled

**`See`**

https://www.babylonjs-playground.com/#10OJSG#13

#### Inherited from

Mesh.edgesWidth

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:492

___

### ellipsoid

• **ellipsoid**: `Vector3`

Gets or sets the ellipsoid used to impersonate this mesh when using collision engine (default is (0.5, 1, 0.5))

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions

#### Inherited from

Mesh.ellipsoid

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:451

___

### ellipsoidOffset

• **ellipsoidOffset**: `Vector3`

Gets or sets the ellipsoid offset used to impersonate this mesh when using collision engine (default is (0, 0, 0))

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions

#### Inherited from

Mesh.ellipsoidOffset

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:456

___

### enablePointerMoveEvents

• **enablePointerMoveEvents**: `boolean`

Gets or sets a boolean indicating that pointer move events must be supported on this mesh (false by default)

#### Inherited from

Mesh.enablePointerMoveEvents

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:353

___

### forceRenderingWhenOccluded

• **forceRenderingWhenOccluded**: `boolean`

Flag to force rendering the mesh even if occluded

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries

#### Inherited from

Mesh.forceRenderingWhenOccluded

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:109

___

### id

• **id**: `string`

Gets or sets the id of the node

#### Inherited from

Mesh.id

#### Defined in

node_modules/@babylonjs/core/node.d.ts:53

___

### ignoreCameraMaxZ

• **ignoreCameraMaxZ**: `boolean`

Gets or sets a boolean indicating whether to render ignoring the active camera's max z setting. (false by default)
You should not mix meshes that have this property set to true with meshes that have it set to false if they all write
to the depth buffer, because the z-values are not comparable in the two cases and you will get rendering artifacts if you do.
You can set the property to true for meshes that do not write to the depth buffer, or set the same value (either false or true) otherwise.
Note this will reduce performance when set to true.

#### Inherited from

Mesh.ignoreCameraMaxZ

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:367

___

### ignoreNonUniformScaling

• **ignoreNonUniformScaling**: `boolean`

Gets or sets a boolean indicating that non uniform scaling (when at least one component is different from others) should be ignored.
By default the system will update normals to compensate

#### Inherited from

Mesh.ignoreNonUniformScaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:93

___

### inspectableCustomProperties

• **inspectableCustomProperties**: `IInspectable`[]

List of inspectable custom properties (used by the Inspector)

**`See`**

https://doc.babylonjs.com/toolsAndResources/inspector#extensibility

#### Inherited from

Mesh.inspectableCustomProperties

#### Defined in

node_modules/@babylonjs/core/node.d.ts:76

___

### instancedBuffers

• **instancedBuffers**: `Object`

Object used to store instanced buffers defined by user

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances#custom-buffers

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

Mesh.instancedBuffers

#### Defined in

node_modules/@babylonjs/core/Meshes/instancedMesh.d.ts:310

___

### instances

• **instances**: `InstancedMesh`[]

Gets the list of instances created from this mesh
it is not supposed to be modified manually.
Note also that the order of the InstancedMesh wihin the array is not significant and might change.

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances

#### Inherited from

Mesh.instances

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:305

___

### isBlocker

• **isBlocker**: `boolean`

Gets or sets a boolean indicating if the mesh must be considered as a ray blocker for lens flares (false by default)

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare

#### Inherited from

Mesh.isBlocker

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:349

___

### isNearGrabbable

• **isNearGrabbable**: `boolean`

Gets or sets a boolean indicating if the mesh can be grabbed. Default is false.
Setting this to true, while using the XR near interaction feature, will trigger a pointer event when the mesh is grabbed.
Grabbing means that the controller is using the squeeze or main trigger button to grab the mesh.
This is different from nearPickable which only triggers the event when the mesh is touched by the controller

#### Inherited from

Mesh.isNearGrabbable

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:343

___

### isNearPickable

• **isNearPickable**: `boolean`

Gets or sets a boolean indicating if the mesh can be near picked (touched by the XR controller or hands). Default is false

#### Inherited from

Mesh.isNearPickable

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:336

___

### isOccluded

• **isOccluded**: `boolean`

Gets or sets whether the mesh is occluded or not, it is used also to set the initial state of the mesh to be occluded or not

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries

#### Inherited from

Mesh.isOccluded

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:99

___

### isOcclusionQueryInProgress

• **isOcclusionQueryInProgress**: `boolean`

Flag to check the progress status of the query

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries

#### Inherited from

Mesh.isOcclusionQueryInProgress

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:104

___

### isPickable

• **isPickable**: `boolean`

Gets or sets a boolean indicating if the mesh can be picked (by scene.pick for instance or through actions). Default is true

#### Inherited from

Mesh.isPickable

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:332

___

### metadata

• **metadata**: `any`

Gets or sets an object used to store user defined information for the node

#### Inherited from

Mesh.metadata

#### Defined in

node_modules/@babylonjs/core/node.d.ts:65

___

### name

• **name**: `string`

#### Overrides

Mesh.name

#### Defined in

[src/prefabs/Text/planeText.ts:22](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L22)

___

### occlusionQueryAlgorithmType

• **occlusionQueryAlgorithmType**: `number`

This property determines the type of occlusion query algorithm to run in WebGl, you can use:
* AbstractMesh.OCCLUSION_ALGORITHM_TYPE_ACCURATE which is mapped to GL_ANY_SAMPLES_PASSED.
* AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE (Default Value) which is mapped to GL_ANY_SAMPLES_PASSED_CONSERVATIVE which is a false positive algorithm that is faster than GL_ANY_SAMPLES_PASSED but less accurate.

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries

#### Inherited from

Mesh.occlusionQueryAlgorithmType

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:94

___

### occlusionRetryCount

• **occlusionRetryCount**: `number`

This number indicates the number of allowed retries before stop the occlusion query, this is useful if the occlusion query is taking long time before to the query result is retrieved, the query result indicates if the object is visible within the scene or not and based on that Babylon.Js engine decides to show or hide the object.
The default value is -1 which means don't break the query and wait till the result

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries

#### Inherited from

Mesh.occlusionRetryCount

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:79

___

### occlusionType

• **occlusionType**: `number`

This property is responsible for starting the occlusion query within the Mesh or not, this property is also used to determine what should happen when the occlusionRetryCount is reached. It has supports 3 values:
* OCCLUSION_TYPE_NONE (Default Value): this option means no occlusion query within the Mesh.
* OCCLUSION_TYPE_OPTIMISTIC: this option is means use occlusion query and if occlusionRetryCount is reached and the query is broken show the mesh.
* OCCLUSION_TYPE_STRICT: this option is means use occlusion query and if occlusionRetryCount is reached and the query is broken restore the last state of the mesh occlusion if the mesh was visible then show the mesh if was hidden then hide don't show.

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries

#### Inherited from

Mesh.occlusionType

#### Defined in

node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.query.d.ts:87

___

### onAccessibilityTagChangedObservable

• **onAccessibilityTagChangedObservable**: `Observable`\<`IAccessibilityTag`\>

Observable fired when an accessibility tag is changed

#### Inherited from

Mesh.onAccessibilityTagChangedObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:86

___

### onAfterWorldMatrixUpdateObservable

• **onAfterWorldMatrixUpdateObservable**: `Observable`\<`TransformNode`\>

An event triggered after the world matrix is updated

#### Inherited from

Mesh.onAfterWorldMatrixUpdateObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:116

___

### onCollideObservable

• **onCollideObservable**: `Observable`\<`AbstractMesh`\>

An event triggered when this mesh collides with another one

#### Inherited from

Mesh.onCollideObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:285

___

### onCollisionPositionChangeObservable

• **onCollisionPositionChangeObservable**: `Observable`\<`Vector3`\>

An event triggered when the collision's position changes

#### Inherited from

Mesh.onCollisionPositionChangeObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:291

___

### onDisposeObservable

• **onDisposeObservable**: `Observable`\<`Node`\>

An event triggered when the mesh is disposed

#### Inherited from

Mesh.onDisposeObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:164

___

### onLODLevelSelection

• **onLODLevelSelection**: (`distance`: `number`, `mesh`: `Mesh`, `selectedLevel`: `Mesh`) => `void`

User defined function used to change how LOD level selection is done

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD

#### Type declaration

▸ (`distance`, `mesh`, `selectedLevel`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `distance` | `number` |
| `mesh` | `Mesh` |
| `selectedLevel` | `Mesh` |

##### Returns

`void`

#### Inherited from

Mesh.onLODLevelSelection

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:316

___

### onMaterialChangedObservable

• **onMaterialChangedObservable**: `Observable`\<`AbstractMesh`\>

An event triggered when material is changed

#### Inherited from

Mesh.onMaterialChangedObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:297

___

### onMeshReadyObservable

• **onMeshReadyObservable**: `Observable`\<`Mesh`\>

Will notify when the mesh is completely ready, including materials.
Observers added to this observable will be removed once triggered

#### Inherited from

Mesh.onMeshReadyObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:264

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

Mesh.onReady

#### Defined in

node_modules/@babylonjs/core/node.d.ts:104

___

### onRebuildObservable

• **onRebuildObservable**: `Observable`\<`AbstractMesh`\>

An event triggered when the mesh is rebuilt.

#### Inherited from

Mesh.onRebuildObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:540

___

### options

• `Private` **options**: `PlaneTextOptions`

#### Defined in

[src/prefabs/Text/planeText.ts:24](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L24)

___

### outlineColor

• **outlineColor**: `Color3`

Defines color to use when rendering outline

#### Inherited from

Mesh.outlineColor

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:391

___

### outlineWidth

• **outlineWidth**: `number`

Define width to use when rendering outline

#### Inherited from

Mesh.outlineWidth

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:393

___

### overlayAlpha

• **overlayAlpha**: `number`

Defines alpha to use when rendering overlay

#### Inherited from

Mesh.overlayAlpha

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:397

___

### overlayColor

• **overlayColor**: `Color3`

Defines color to use when rendering overlay

#### Inherited from

Mesh.overlayColor

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:395

___

### physicsBody

• **physicsBody**: `PhysicsBody`

**`See`**

#### Inherited from

Mesh.physicsBody

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:18

___

### physicsImpostor

• **physicsImpostor**: `PhysicsImpostor`

Gets or sets impostor used for physic simulation

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/physics

#### Inherited from

Mesh.physicsImpostor

#### Defined in

node_modules/@babylonjs/core/Physics/v1/physicsEngineComponent.d.ts:18

___

### reIntegrateRotationIntoRotationQuaternion

• **reIntegrateRotationIntoRotationQuaternion**: `boolean`

Gets or sets a boolean indicating that even if rotationQuaternion is defined, you can keep updating rotation property and Babylon.js will just mix both

#### Inherited from

Mesh.reIntegrateRotationIntoRotationQuaternion

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:97

___

### renderOutline

• **renderOutline**: `boolean`

Gets or sets a boolean indicating if the outline must be rendered as well

**`See`**

https://www.babylonjs-playground.com/#10WJ5S#3

#### Inherited from

Mesh.renderOutline

#### Defined in

node_modules/@babylonjs/core/Rendering/outlineRenderer.d.ts:25

___

### renderOverlay

• **renderOverlay**: `boolean`

Gets or sets a boolean indicating if the overlay must be rendered as well

**`See`**

https://www.babylonjs-playground.com/#10WJ5S#2

#### Inherited from

Mesh.renderOverlay

#### Defined in

node_modules/@babylonjs/core/Rendering/outlineRenderer.d.ts:32

___

### reservedDataStore

• **reservedDataStore**: `any`

For internal use only. Please do not use.

#### Inherited from

Mesh.reservedDataStore

#### Defined in

node_modules/@babylonjs/core/node.d.ts:71

___

### scalingDeterminant

• **scalingDeterminant**: `number`

Multiplication factor on scale x/y/z when computing the world matrix. Eg. for a 1x1x1 cube setting this to 2 will make it a 2x2x2 cube

#### Inherited from

Mesh.scalingDeterminant

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:82

___

### scene

• **scene**: `Scene`

#### Defined in

[src/prefabs/Text/planeText.ts:23](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L23)

___

### showBoundingBox

• **showBoundingBox**: `boolean`

Gets or sets a boolean indicating if the bounding box must be rendered as well (false by default)

#### Inherited from

Mesh.showBoundingBox

#### Defined in

node_modules/@babylonjs/core/Rendering/boundingBoxRenderer.d.ts:35

___

### showSubMeshesBoundingBox

• **showSubMeshesBoundingBox**: `boolean`

Gets or sets a boolean indicating that bounding boxes of subMeshes must be rendered as well (false by default)

#### Inherited from

Mesh.showSubMeshesBoundingBox

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:345

___

### state

• **state**: `string`

Gets or sets a string used to store user defined state for the node

#### Inherited from

Mesh.state

#### Defined in

node_modules/@babylonjs/core/node.d.ts:61

___

### subMeshes

• **subMeshes**: `SubMesh`[]

Gets or sets the list of subMeshes

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/materials/using/multiMaterials

#### Inherited from

Mesh.subMeshes

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:510

___

### thinInstanceAllowAutomaticStaticBufferRecreation

• **thinInstanceAllowAutomaticStaticBufferRecreation**: `boolean`

Indicates that a buffer created as static should be recreated if the buffer is updated (by calling thinInstanceSetMatrixAt or thinInstanceSetAttributeAt, for eg.)
If this flag is false (the default behavior), a buffer created as "static" won't show any update done to it, and will stay the same as it was created.
Note however that recreating a buffer each time there's a change will have some performance cost, that's why it is set to false by default.
You should set this flag to true only if your static buffers should change infrequently. If they change frequently, you should create your buffers as "dynamic" instead.

#### Inherited from

Mesh.thinInstanceAllowAutomaticStaticBufferRecreation

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:16

___

### thinInstanceCount

• **thinInstanceCount**: `number`

Gets / sets the number of thin instances to display. Note that you can't set a number higher than what the underlying buffer can handle.

#### Inherited from

Mesh.thinInstanceCount

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:54

___

### thinInstanceEnablePicking

• **thinInstanceEnablePicking**: `boolean`

Gets or sets a boolean defining if we want picking to pick thin instances as well

#### Inherited from

Mesh.thinInstanceEnablePicking

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:9

___

### uniqueId

• **uniqueId**: `number`

Gets or sets the unique id of the node

#### Inherited from

Mesh.uniqueId

#### Defined in

node_modules/@babylonjs/core/node.d.ts:57

___

### useOctreeForCollisions

• **useOctreeForCollisions**: `boolean`

Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes collision (true by default)

#### Inherited from

Mesh.useOctreeForCollisions

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:427

___

### useOctreeForPicking

• **useOctreeForPicking**: `boolean`

Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes picking (true by default)

#### Inherited from

Mesh.useOctreeForPicking

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:425

___

### useOctreeForRenderingSelection

• **useOctreeForRenderingSelection**: `boolean`

Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes selection (true by default)

#### Inherited from

Mesh.useOctreeForRenderingSelection

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:423

___

### BACKSIDE

▪ `Static` `Readonly` **BACKSIDE**: ``1``

Mesh side orientation : usually the internal or back surface

#### Inherited from

Mesh.BACKSIDE

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:170

___

### BOTTOM

▪ `Static` `Readonly` **BOTTOM**: ``4``

Mesh tile positioning : part tiles on bottom

#### Inherited from

Mesh.BOTTOM

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:242

___

### BillboardUseParentOrientation

▪ `Static` **BillboardUseParentOrientation**: `boolean`

Child transform with Billboard flags should or should not apply parent rotation (default if off)

#### Inherited from

Mesh.BillboardUseParentOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:42

___

### CAP\_ALL

▪ `Static` `Readonly` **CAP\_ALL**: ``3``

Mesh cap setting : two caps, one at the beginning  and one at the end of the mesh

#### Inherited from

Mesh.CAP\_ALL

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:194

___

### CAP\_END

▪ `Static` `Readonly` **CAP\_END**: ``2``

Mesh cap setting : one cap at the end of the mesh

#### Inherited from

Mesh.CAP\_END

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:190

___

### CAP\_START

▪ `Static` `Readonly` **CAP\_START**: ``1``

Mesh cap setting : one cap at the beginning of the mesh

#### Inherited from

Mesh.CAP\_START

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:186

___

### CENTER

▪ `Static` `Readonly` **CENTER**: ``0``

Mesh tile positioning : part tiles same on left/right or top/bottom

#### Inherited from

Mesh.CENTER

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:226

___

### CULLINGSTRATEGY\_BOUNDINGSPHERE\_ONLY

▪ `Static` `Readonly` **CULLINGSTRATEGY\_BOUNDINGSPHERE\_ONLY**: ``1``

Culling strategy : Bounding Sphere Only.
 This is an exclusion test. It's faster than the standard strategy because the bounding box is not tested.
 It's also less accurate than the standard because some not visible objects can still be selected.
 Test : is the bounding sphere outside the frustum ?
 If not, then the cullable object is in the frustum.

#### Inherited from

Mesh.CULLINGSTRATEGY\_BOUNDINGSPHERE\_ONLY

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:167

___

### CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION

▪ `Static` `Readonly` **CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION**: ``2``

Culling strategy : Optimistic Inclusion.
 This in an inclusion test first, then the standard exclusion test.
 This can be faster when a cullable object is expected to be almost always in the camera frustum.
 This could also be a little slower than the standard test when the tested object center is not the frustum but one of its bounding box vertex is still inside.
 Anyway, it's as accurate as the standard strategy.
 Test :
 Is the cullable object bounding sphere center in the frustum ?
 If not, apply the default culling strategy.

#### Inherited from

Mesh.CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:177

___

### CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION\_THEN\_BSPHERE\_ONLY

▪ `Static` `Readonly` **CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION\_THEN\_BSPHERE\_ONLY**: ``3``

Culling strategy : Optimistic Inclusion then Bounding Sphere Only.
 This in an inclusion test first, then the bounding sphere only exclusion test.
 This can be the fastest test when a cullable object is expected to be almost always in the camera frustum.
 This could also be a little slower than the BoundingSphereOnly strategy when the tested object center is not in the frustum but its bounding sphere still intersects it.
 It's less accurate than the standard strategy and as accurate as the BoundingSphereOnly strategy.
 Test :
 Is the cullable object bounding sphere center in the frustum ?
 If not, apply the Bounding Sphere Only strategy. No Bounding Box is tested here.

#### Inherited from

Mesh.CULLINGSTRATEGY\_OPTIMISTIC\_INCLUSION\_THEN\_BSPHERE\_ONLY

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:187

___

### CULLINGSTRATEGY\_STANDARD

▪ `Static` `Readonly` **CULLINGSTRATEGY\_STANDARD**: ``0``

Default culling strategy : this is an exclusion test and it's the more accurate.
 Test order :
 Is the bounding sphere outside the frustum ?
 If not, are the bounding box vertices outside the frustum ?
 It not, then the cullable object is in the frustum.

#### Inherited from

Mesh.CULLINGSTRATEGY\_STANDARD

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:160

___

### DEFAULTSIDE

▪ `Static` `Readonly` **DEFAULTSIDE**: ``0``

Mesh side orientation : by default, `FRONTSIDE`

#### Inherited from

Mesh.DEFAULTSIDE

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:178

___

### DOUBLESIDE

▪ `Static` `Readonly` **DOUBLESIDE**: ``2``

Mesh side orientation : both internal and external or front and back surfaces

#### Inherited from

Mesh.DOUBLESIDE

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:174

___

### FLIP\_N\_ROTATE\_ROW

▪ `Static` `Readonly` **FLIP\_N\_ROTATE\_ROW**: ``6``

Mesh pattern setting : rotate pattern and rotate

#### Inherited from

Mesh.FLIP\_N\_ROTATE\_ROW

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:222

___

### FLIP\_N\_ROTATE\_TILE

▪ `Static` `Readonly` **FLIP\_N\_ROTATE\_TILE**: ``5``

Mesh pattern setting : flip and rotate alternate tiles on each row or column

#### Inherited from

Mesh.FLIP\_N\_ROTATE\_TILE

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:218

___

### FLIP\_ROW

▪ `Static` `Readonly` **FLIP\_ROW**: ``3``

Mesh pattern setting : flip (reflect in y axis) all tiles on alternate rows

#### Inherited from

Mesh.FLIP\_ROW

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:210

___

### FLIP\_TILE

▪ `Static` `Readonly` **FLIP\_TILE**: ``1``

Mesh pattern setting : flip (reflect in y axis) alternate tiles on each row or column

#### Inherited from

Mesh.FLIP\_TILE

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:202

___

### FRONTSIDE

▪ `Static` `Readonly` **FRONTSIDE**: ``0``

Mesh side orientation : usually the external or front surface

#### Inherited from

Mesh.FRONTSIDE

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:166

___

### INSTANCEDMESH\_SORT\_TRANSPARENT

▪ `Static` **INSTANCEDMESH\_SORT\_TRANSPARENT**: `boolean`

Indicates that the instanced meshes should be sorted from back to front before rendering if their material is transparent

#### Inherited from

Mesh.INSTANCEDMESH\_SORT\_TRANSPARENT

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:246

___

### LEFT

▪ `Static` `Readonly` **LEFT**: ``1``

Mesh tile positioning : part tiles on left

#### Inherited from

Mesh.LEFT

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:230

___

### NO\_CAP

▪ `Static` `Readonly` **NO\_CAP**: ``0``

Mesh cap setting : no cap

#### Inherited from

Mesh.NO\_CAP

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:182

___

### NO\_FLIP

▪ `Static` `Readonly` **NO\_FLIP**: ``0``

Mesh pattern setting : no flip or rotate

#### Inherited from

Mesh.NO\_FLIP

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:198

___

### OCCLUSION\_ALGORITHM\_TYPE\_ACCURATE

▪ `Static` **OCCLUSION\_ALGORITHM\_TYPE\_ACCURATE**: `number`

Use an accurate occlusion algorithm

#### Inherited from

Mesh.OCCLUSION\_ALGORITHM\_TYPE\_ACCURATE

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:151

___

### OCCLUSION\_ALGORITHM\_TYPE\_CONSERVATIVE

▪ `Static` **OCCLUSION\_ALGORITHM\_TYPE\_CONSERVATIVE**: `number`

Use a conservative occlusion algorithm

#### Inherited from

Mesh.OCCLUSION\_ALGORITHM\_TYPE\_CONSERVATIVE

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:153

___

### OCCLUSION\_TYPE\_NONE

▪ `Static` **OCCLUSION\_TYPE\_NONE**: `number`

No occlusion

#### Inherited from

Mesh.OCCLUSION\_TYPE\_NONE

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:145

___

### OCCLUSION\_TYPE\_OPTIMISTIC

▪ `Static` **OCCLUSION\_TYPE\_OPTIMISTIC**: `number`

Occlusion set to optimistic

#### Inherited from

Mesh.OCCLUSION\_TYPE\_OPTIMISTIC

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:147

___

### OCCLUSION\_TYPE\_STRICT

▪ `Static` **OCCLUSION\_TYPE\_STRICT**: `number`

Occlusion set to strict

#### Inherited from

Mesh.OCCLUSION\_TYPE\_STRICT

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:149

___

### RIGHT

▪ `Static` `Readonly` **RIGHT**: ``2``

Mesh tile positioning : part tiles on right

#### Inherited from

Mesh.RIGHT

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:234

___

### ROTATE\_ROW

▪ `Static` `Readonly` **ROTATE\_ROW**: ``4``

Mesh pattern setting : rotate (180degs) all tiles on alternate rows

#### Inherited from

Mesh.ROTATE\_ROW

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:214

___

### ROTATE\_TILE

▪ `Static` `Readonly` **ROTATE\_TILE**: ``2``

Mesh pattern setting : rotate (180degs) alternate tiles on each row or column

#### Inherited from

Mesh.ROTATE\_TILE

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:206

___

### TOP

▪ `Static` `Readonly` **TOP**: ``3``

Mesh tile positioning : part tiles on top

#### Inherited from

Mesh.TOP

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:238

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

Mesh.\_AnimationRangeFactory

#### Defined in

node_modules/@babylonjs/core/node.d.ts:28

___

### \_GoldbergMeshParser

▪ `Static` **\_GoldbergMeshParser**: (`parsedMesh`: `any`, `scene`: `Scene`) => `GoldbergMesh`

#### Type declaration

▸ (`parsedMesh`, `scene`): `GoldbergMesh`

##### Parameters

| Name | Type |
| :------ | :------ |
| `parsedMesh` | `any` |
| `scene` | `Scene` |

##### Returns

`GoldbergMesh`

#### Inherited from

Mesh.\_GoldbergMeshParser

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1065

___

### \_GreasedLineMeshParser

▪ `Static` **\_GreasedLineMeshParser**: (`parsedMesh`: `any`, `scene`: `Scene`) => `Mesh`

#### Type declaration

▸ (`parsedMesh`, `scene`): `Mesh`

##### Parameters

| Name | Type |
| :------ | :------ |
| `parsedMesh` | `any` |
| `scene` | `Scene` |

##### Returns

`Mesh`

#### Inherited from

Mesh.\_GreasedLineMeshParser

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1073

___

### \_GreasedLineRibbonMeshParser

▪ `Static` **\_GreasedLineRibbonMeshParser**: (`parsedMesh`: `any`, `scene`: `Scene`) => `Mesh`

#### Type declaration

▸ (`parsedMesh`, `scene`): `Mesh`

##### Parameters

| Name | Type |
| :------ | :------ |
| `parsedMesh` | `any` |
| `scene` | `Scene` |

##### Returns

`Mesh`

#### Inherited from

Mesh.\_GreasedLineRibbonMeshParser

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1077

___

### \_GroundMeshParser

▪ `Static` **\_GroundMeshParser**: (`parsedMesh`: `any`, `scene`: `Scene`) => `Mesh`

#### Type declaration

▸ (`parsedMesh`, `scene`): `Mesh`

##### Parameters

| Name | Type |
| :------ | :------ |
| `parsedMesh` | `any` |
| `scene` | `Scene` |

##### Returns

`Mesh`

#### Inherited from

Mesh.\_GroundMeshParser

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1061

___

### \_LinesMeshParser

▪ `Static` **\_LinesMeshParser**: (`parsedMesh`: `any`, `scene`: `Scene`) => `Mesh`

#### Type declaration

▸ (`parsedMesh`, `scene`): `Mesh`

##### Parameters

| Name | Type |
| :------ | :------ |
| `parsedMesh` | `any` |
| `scene` | `Scene` |

##### Returns

`Mesh`

#### Inherited from

Mesh.\_LinesMeshParser

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1069

___

### \_TrailMeshParser

▪ `Static` **\_TrailMeshParser**: (`parsedMesh`: `any`, `scene`: `Scene`) => `Mesh`

#### Type declaration

▸ (`parsedMesh`, `scene`): `Mesh`

##### Parameters

| Name | Type |
| :------ | :------ |
| `parsedMesh` | `any` |
| `scene` | `Scene` |

##### Returns

`Mesh`

#### Inherited from

Mesh.\_TrailMeshParser

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1081

## Accessors

### \_isMesh

• `get` **_isMesh**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.\_isMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:427

___

### \_positions

• `get` **_positions**(): `Vector3`[]

#### Returns

`Vector3`[]

#### Inherited from

Mesh.\_positions

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:930

___

### absolutePosition

• `get` **absolutePosition**(): `Vector3`

Returns the current mesh absolute position.
Returns a Vector3.

#### Returns

`Vector3`

#### Inherited from

Mesh.absolutePosition

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

Mesh.absoluteRotationQuaternion

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

Mesh.absoluteScaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:195

___

### accessibilityTag

• `get` **accessibilityTag**(): `IAccessibilityTag`

#### Returns

`IAccessibilityTag`

#### Inherited from

Mesh.accessibilityTag

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

Mesh.accessibilityTag

#### Defined in

node_modules/@babylonjs/core/node.d.ts:80

___

### align

• `get` **align**(): ``"left"`` \| ``"right"`` \| ``"center"``

#### Returns

``"left"`` \| ``"right"`` \| ``"center"``

#### Defined in

[src/prefabs/Text/planeText.ts:89](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L89)

• `set` **align**(`newAlign`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newAlign` | ``"left"`` \| ``"right"`` \| ``"center"`` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:92](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L92)

___

### animationPropertiesOverride

• `get` **animationPropertiesOverride**(): `AnimationPropertiesOverride`

Gets or sets the animation properties override

#### Returns

`AnimationPropertiesOverride`

#### Inherited from

Mesh.animationPropertiesOverride

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

Mesh.animationPropertiesOverride

#### Defined in

node_modules/@babylonjs/core/node.d.ts:153

___

### applyFog

• `get` **applyFog**(): `boolean`

Gets or sets a boolean indicating that this mesh will allow fog to be rendered on it (true by default)

#### Returns

`boolean`

#### Inherited from

Mesh.applyFog

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:417

• `set` **applyFog**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.applyFog

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:418

___

### areNormalsFrozen

• `get` **areNormalsFrozen**(): `boolean`

Gets a boolean indicating if the normals aren't to be recomputed on next mesh `positions` array update. This property is pertinent only for updatable parametric shapes.

#### Returns

`boolean`

#### Inherited from

Mesh.areNormalsFrozen

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:600

___

### atlas

• `get` **atlas**(): `any`

#### Returns

`any`

#### Defined in

[src/prefabs/Text/planeText.ts:73](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L73)

• `set` **atlas**(`newAtlas`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newAtlas` | `any` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:76](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L76)

___

### bakedVertexAnimationManager

• `get` **bakedVertexAnimationManager**(): `IBakedVertexAnimationManager`

Gets or sets the baked vertex animation manager

#### Returns

`IBakedVertexAnimationManager`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/animation/baked_texture_animations

#### Inherited from

Mesh.bakedVertexAnimationManager

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:271

• `set` **bakedVertexAnimationManager**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `IBakedVertexAnimationManager` |

#### Returns

`void`

#### Inherited from

Mesh.bakedVertexAnimationManager

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:272

___

### behaviors

• `get` **behaviors**(): `Behavior`\<`Node`\>[]

Gets the list of attached behaviors

#### Returns

`Behavior`\<`Node`\>[]

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/behaviors

#### Inherited from

Mesh.behaviors

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

Mesh.billboardMode

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

Mesh.billboardMode

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:70

___

### checkCollisions

• `get` **checkCollisions**(): `boolean`

Gets or sets a boolean indicating that this mesh can be used in the collision engine

#### Returns

`boolean`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions

#### Inherited from

Mesh.checkCollisions

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:916

• `set` **checkCollisions**(`collisionEnabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collisionEnabled` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.checkCollisions

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:917

___

### cloneMeshMap

• `get` **cloneMeshMap**(): `Object`

Gets the list of clones of this mesh
The scene must have been constructed with useClonedMeshMap=true for this to work!
Note that useClonedMeshMap=true is the default setting

#### Returns

`Object`

#### Inherited from

Mesh.cloneMeshMap

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:377

___

### collider

• `get` **collider**(): `Collider`

Gets Collider object used to compute collisions (not physics)

#### Returns

`Collider`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions

#### Inherited from

Mesh.collider

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:922

___

### collisionGroup

• `get` **collisionGroup**(): `number`

Gets or sets the current collision group mask (-1 by default).
A collision between A and B will happen if A.collisionGroup & b.collisionMask !== 0

#### Returns

`number`

#### Inherited from

Mesh.collisionGroup

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:475

• `set` **collisionGroup**(`mask`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mask` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.collisionGroup

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:476

___

### collisionMask

• `get` **collisionMask**(): `number`

Gets or sets a collision mask used to mask collisions (default is -1).
A collision between A and B will happen if A.collisionGroup & b.collisionMask !== 0

#### Returns

`number`

#### Inherited from

Mesh.collisionMask

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:461

• `set` **collisionMask**(`mask`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mask` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.collisionMask

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:462

___

### collisionResponse

• `get` **collisionResponse**(): `boolean`

Gets or sets a collision response flag (default is true).
when collisionResponse is false, events are still triggered but colliding entity has no response
This helps creating trigger volume when user wants collision feedback events but not position/velocity
to respond to the collision.

#### Returns

`boolean`

#### Inherited from

Mesh.collisionResponse

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:469

• `set` **collisionResponse**(`response`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.collisionResponse

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:470

___

### collisionRetryCount

• `get` **collisionRetryCount**(): `number`

number of collision detection tries. Change this value if not all collisions are detected and handled properly

#### Returns

`number`

#### Inherited from

Mesh.collisionRetryCount

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:254

• `set` **collisionRetryCount**(`retryCount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `retryCount` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.collisionRetryCount

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:255

___

### color

• `get` **color**(): `Color3`

#### Returns

`Color3`

#### Defined in

[src/prefabs/Text/planeText.ts:48](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L48)

• `set` **color**(`newColor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newColor` | `Color3` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:52](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L52)

___

### computeBonesUsingShaders

• `get` **computeBonesUsingShaders**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.computeBonesUsingShaders

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:265

• `set` **computeBonesUsingShaders**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.computeBonesUsingShaders

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:266

___

### doNotSerialize

• `get` **doNotSerialize**(): `boolean`

Gets or sets a boolean used to define if the node must be serialized

#### Returns

`boolean`

#### Inherited from

Mesh.doNotSerialize

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

Mesh.doNotSerialize

#### Defined in

node_modules/@babylonjs/core/node.d.ts:91

___

### enableDistantPicking

• `get` **enableDistantPicking**(): `boolean`

When enabled, decompose picking matrices for better precision with large values for mesh position and scling

#### Returns

`boolean`

#### Inherited from

Mesh.enableDistantPicking

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:420

• `set` **enableDistantPicking**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.enableDistantPicking

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:421

___

### facetDepthSortFrom

• `get` **facetDepthSortFrom**(): `Vector3`

The location (Vector3) where the facet depth sort must be computed from.
By default, the active camera position.
Used only when facet depth sort is enabled

#### Returns

`Vector3`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#facet-depth-sort

#### Inherited from

Mesh.facetDepthSortFrom

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:251

• `set` **facetDepthSortFrom**(`location`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `Vector3` |

#### Returns

`void`

#### Inherited from

Mesh.facetDepthSortFrom

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:252

___

### facetNb

• `get` **facetNb**(): `number`

Gets the number of facets in the mesh

#### Returns

`number`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#what-is-a-mesh-facet

#### Inherited from

Mesh.facetNb

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:223

___

### font

• `get` **font**(): `any`

#### Returns

`any`

#### Defined in

[src/prefabs/Text/planeText.ts:65](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L65)

• `set` **font**(`newFont`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newFont` | `any` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:68](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L68)

___

### fontHeight

• `get` **fontHeight**(): `number`

#### Returns

`number`

#### Defined in

[src/prefabs/Text/planeText.ts:97](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L97)

• `set` **fontHeight**(`newFontHeight`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newFontHeight` | `number` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:100](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L100)

___

### forceWorldMatrixInstancedBufferUpdate

• `get` **forceWorldMatrixInstancedBufferUpdate**(): `boolean`

Gets or sets a boolean indicating that the update of the instance buffer of the world matrices must be performed in all cases (and notably even in frozen mode)

#### Returns

`boolean`

#### Inherited from

Mesh.forceWorldMatrixInstancedBufferUpdate

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:396

• `set` **forceWorldMatrixInstancedBufferUpdate**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.forceWorldMatrixInstancedBufferUpdate

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:397

___

### forcedInstanceCount

• `get` **forcedInstanceCount**(): `number`

Gets or sets the forced number of instances to display.
If 0 (default value), the number of instances is not forced and depends on the draw type
(regular / instance / thin instances mesh)

#### Returns

`number`

#### Inherited from

Mesh.forcedInstanceCount

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:330

• `set` **forcedInstanceCount**(`count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.forcedInstanceCount

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:331

___

### forward

• `get` **forward**(): `Vector3`

The forward direction of that transform in world space.

#### Returns

`Vector3`

#### Inherited from

Mesh.forward

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:162

___

### geometry

• `get` **geometry**(): `Geometry`

Gets the mesh internal Geometry object

#### Returns

`Geometry`

#### Inherited from

Mesh.geometry

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:482

___

### hasBoundingInfo

• `get` **hasBoundingInfo**(): `boolean`

Returns true if there is already a bounding info

#### Returns

`boolean`

#### Inherited from

Mesh.hasBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:740

___

### hasInstances

• `get` **hasInstances**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.hasInstances

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:292

___

### hasLODLevels

• `get` **hasLODLevels**(): `boolean`

Gets a boolean indicating if this mesh has LOD

#### Returns

`boolean`

#### Inherited from

Mesh.hasLODLevels

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:439

___

### hasThinInstances

• `get` **hasThinInstances**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.hasThinInstances

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:293

___

### hasVertexAlpha

• `get` **hasVertexAlpha**(): `boolean`

Gets or sets a boolean indicating that this mesh needs to use vertex alpha data to render.
This property is misnamed and should be `useVertexAlpha`. Note that the mesh will be rendered
with alpha blending when this flag is set even if vertex alpha data is missing from the geometry.

#### Returns

`boolean`

#### Inherited from

Mesh.hasVertexAlpha

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:403

• `set` **hasVertexAlpha**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.hasVertexAlpha

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:404

___

### infiniteDistance

• `get` **infiniteDistance**(): `boolean`

Gets or sets the distance of the object to max, often used by skybox

#### Returns

`boolean`

#### Inherited from

Mesh.infiniteDistance

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

Mesh.infiniteDistance

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:88

___

### inheritVisibility

• `get` **inheritVisibility**(): `boolean`

If set to true, a mesh will only be visible only if its parent(s) are also visible (default is false)

#### Returns

`boolean`

#### Inherited from

Mesh.inheritVisibility

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:321

• `set` **inheritVisibility**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.inheritVisibility

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:322

___

### isAnInstance

• `get` **isAnInstance**(): `boolean`

Gets a boolean indicating if this mesh is an instance or a regular mesh

#### Returns

`boolean`

#### Inherited from

Mesh.isAnInstance

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:785

___

### isBlocked

• `get` **isBlocked**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.isBlocked

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:589

___

### isFacetDataEnabled

• `get` **isFacetDataEnabled**(): `boolean`

gets a boolean indicating if facetData is enabled

#### Returns

`boolean`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#what-is-a-mesh-facet

#### Inherited from

Mesh.isFacetDataEnabled

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:260

___

### isUnIndexed

• `get` **isUnIndexed**(): `boolean`

Gets or sets a boolean indicating that this mesh does not use index buffer

#### Returns

`boolean`

#### Inherited from

Mesh.isUnIndexed

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:383

• `set` **isUnIndexed**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.isUnIndexed

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:384

___

### isVisible

• `get` **isVisible**(): `boolean`

Gets or sets a boolean indicating if the mesh is visible (renderable). Default is true

#### Returns

`boolean`

#### Inherited from

Mesh.isVisible

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:327

• `set` **isVisible**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.isVisible

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:328

___

### isWorldMatrixFrozen

• `get` **isWorldMatrixFrozen**(): `boolean`

True if the World matrix has been frozen.

#### Returns

`boolean`

#### Inherited from

Mesh.isWorldMatrixFrozen

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:246

___

### layerMask

• `get` **layerMask**(): `number`

Gets or sets the current layer mask (default is 0x0FFFFFFF)

#### Returns

`number`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/cameras/layerMasksAndMultiCam

#### Inherited from

Mesh.layerMask

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:432

• `set` **layerMask**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.layerMask

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:433

___

### lightSources

• `get` **lightSources**(): `Light`[]

Gets the list of lights affecting that mesh

#### Returns

`Light`[]

#### Inherited from

Mesh.lightSources

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:518

___

### manualUpdateOfPreviousWorldMatrixInstancedBuffer

• `get` **manualUpdateOfPreviousWorldMatrixInstancedBuffer**(): `boolean`

Gets or sets a boolean indicating that the update of the instance buffer of the world matrices is manual

#### Returns

`boolean`

#### Inherited from

Mesh.manualUpdateOfPreviousWorldMatrixInstancedBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:393

• `set` **manualUpdateOfPreviousWorldMatrixInstancedBuffer**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.manualUpdateOfPreviousWorldMatrixInstancedBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:394

___

### manualUpdateOfWorldMatrixInstancedBuffer

• `get` **manualUpdateOfWorldMatrixInstancedBuffer**(): `boolean`

Gets or sets a boolean indicating that the update of the instance buffer of the world matrices is manual

#### Returns

`boolean`

#### Inherited from

Mesh.manualUpdateOfWorldMatrixInstancedBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:390

• `set` **manualUpdateOfWorldMatrixInstancedBuffer**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.manualUpdateOfWorldMatrixInstancedBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:391

___

### material

• `get` **material**(): `Material`

#### Returns

`Material`

#### Inherited from

Mesh.material

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:358

• `set` **material**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Material` |

#### Returns

`void`

#### Inherited from

Mesh.material

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:359

___

### morphTargetManager

• `get` **morphTargetManager**(): `MorphTargetManager`

Gets or sets the morph target manager

#### Returns

`MorphTargetManager`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/morphTargets

#### Inherited from

Mesh.morphTargetManager

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:265

• `set` **morphTargetManager**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `MorphTargetManager` |

#### Returns

`void`

#### Inherited from

Mesh.morphTargetManager

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:266

___

### mustDepthSortFacets

• `get` **mustDepthSortFacets**(): `boolean`

Gets or sets a boolean indicating that the facets must be depth sorted on next call to `updateFacetData()`.
Works only for updatable meshes.
Doesn't work with multi-materials

#### Returns

`boolean`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#facet-depth-sort

#### Inherited from

Mesh.mustDepthSortFacets

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:243

• `set` **mustDepthSortFacets**(`sort`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sort` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.mustDepthSortFacets

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:244

___

### nonUniformScaling

• `get` **nonUniformScaling**(): `boolean`

True if the scaling property of this object is non uniform eg. (1,2,1)

#### Returns

`boolean`

#### Inherited from

Mesh.nonUniformScaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:380

___

### numBoneInfluencers

• `get` **numBoneInfluencers**(): `number`

Gets or sets the number of allowed bone influences per vertex (4 by default)

#### Returns

`number`

#### Inherited from

Mesh.numBoneInfluencers

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:414

• `set` **numBoneInfluencers**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.numBoneInfluencers

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:415

___

### onAfterRenderObservable

• `get` **onAfterRenderObservable**(): `Observable`\<`Mesh`\>

An event triggered after rendering the mesh

#### Returns

`Observable`\<`Mesh`\>

#### Inherited from

Mesh.onAfterRenderObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:278

___

### onBeforeBindObservable

• `get` **onBeforeBindObservable**(): `Observable`\<`Mesh`\>

An event triggered before binding the mesh

#### Returns

`Observable`\<`Mesh`\>

#### Inherited from

Mesh.onBeforeBindObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:274

___

### onBeforeDraw

• `set` **onBeforeDraw**(`callback`): `void`

Sets a callback to call before drawing the mesh. It is recommended to use onBeforeDrawObservable instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Inherited from

Mesh.onBeforeDraw

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:291

___

### onBeforeDrawObservable

• `get` **onBeforeDrawObservable**(): `Observable`\<`Mesh`\>

An event triggered before drawing the mesh

#### Returns

`Observable`\<`Mesh`\>

#### Inherited from

Mesh.onBeforeDrawObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:286

___

### onBeforeRenderObservable

• `get` **onBeforeRenderObservable**(): `Observable`\<`Mesh`\>

An event triggered before rendering the mesh

#### Returns

`Observable`\<`Mesh`\>

#### Inherited from

Mesh.onBeforeRenderObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:270

___

### onBetweenPassObservable

• `get` **onBetweenPassObservable**(): `Observable`\<`SubMesh`\>

An event triggeredbetween rendering pass when using separateCullingPass = true

#### Returns

`Observable`\<`SubMesh`\>

#### Inherited from

Mesh.onBetweenPassObservable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:282

___

### onClonedObservable

• `get` **onClonedObservable**(): `Observable`\<`Node`\>

An event triggered when the node is cloned

#### Returns

`Observable`\<`Node`\>

#### Inherited from

Mesh.onClonedObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:177

___

### onCollide

• `set` **onCollide**(`callback`): `void`

Set a function to call when this mesh collides with another one

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`collidedMesh?`: `AbstractMesh`) => `void` |

#### Returns

`void`

#### Inherited from

Mesh.onCollide

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:287

___

### onCollisionPositionChange

• `set` **onCollisionPositionChange**(`callback`): `void`

Set a function to call when the collision's position changes

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Inherited from

Mesh.onCollisionPositionChange

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:293

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

Mesh.onDispose

#### Defined in

node_modules/@babylonjs/core/node.d.ts:169

___

### onEnabledStateChangedObservable

• `get` **onEnabledStateChangedObservable**(): `Observable`\<`boolean`\>

An event triggered when the enabled state of the node changes

#### Returns

`Observable`\<`boolean`\>

#### Inherited from

Mesh.onEnabledStateChangedObservable

#### Defined in

node_modules/@babylonjs/core/node.d.ts:173

___

### opacity

• `get` **opacity**(): `number`

#### Returns

`number`

#### Defined in

[src/prefabs/Text/planeText.ts:81](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L81)

• `set` **opacity**(`newOpacity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newOpacity` | `number` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:84](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L84)

___

### overrideMaterialSideOrientation

• `get` **overrideMaterialSideOrientation**(): `number`

#### Returns

`number`

**`Deprecated`**

Please use sideOrientation instead.

**`See`**

https://doc.babylonjs.com/breaking-changes#7110

#### Inherited from

Mesh.overrideMaterialSideOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:351

• `set` **overrideMaterialSideOrientation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.overrideMaterialSideOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:352

___

### overrideRenderingFillMode

• `get` **overrideRenderingFillMode**(): `number`

Use this property to override the Material's fillMode value

#### Returns

`number`

#### Inherited from

Mesh.overrideRenderingFillMode

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:356

• `set` **overrideRenderingFillMode**(`fillMode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fillMode` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.overrideRenderingFillMode

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:357

___

### overridenInstanceCount

• `set` **overridenInstanceCount**(`count`): `void`

Sets a value overriding the instance count. Only applicable when custom instanced InterleavedVertexBuffer are used rather than InstancedMeshs

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.overridenInstanceCount

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:614

___

### parent

• `get` **parent**(): `Node`

#### Returns

`Node`

#### Inherited from

Mesh.parent

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

Mesh.parent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:138

___

### partitioningBBoxRatio

• `get` **partitioningBBoxRatio**(): `number`

The ratio (float) to apply to the bounding box size to set to the partitioning space.
Ex : 1.01 (default) the partitioning space is 1% bigger than the bounding box

#### Returns

`number`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#tweaking-the-partitioning

#### Inherited from

Mesh.partitioningBBoxRatio

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:235

• `set` **partitioningBBoxRatio**(`ratio`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ratio` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.partitioningBBoxRatio

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:236

___

### partitioningSubdivisions

• `get` **partitioningSubdivisions**(): `number`

Gets or set the number (integer) of subdivisions per axis in the partitioning space

#### Returns

`number`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#tweaking-the-partitioning

#### Inherited from

Mesh.partitioningSubdivisions

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:228

• `set` **partitioningSubdivisions**(`nb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nb` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.partitioningSubdivisions

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:229

___

### pointerOverDisableMeshTesting

• `get` **pointerOverDisableMeshTesting**(): `boolean`

Gets or sets the property which disables the test that is checking that the mesh under the pointer is the same than the previous time we tested for it (default: false).
Set this property to true if you want thin instances picking to be reported accurately when moving over the mesh.
Note that setting this property to true will incur some performance penalties when dealing with pointer events for this mesh so use it sparingly.

#### Returns

`boolean`

#### Inherited from

Mesh.pointerOverDisableMeshTesting

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:359

• `set` **pointerOverDisableMeshTesting**(`disable`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `disable` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.pointerOverDisableMeshTesting

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:360

___

### position

• `get` **position**(): `Vector3`

Gets or set the node position (default is (0.0, 0.0, 0.0))

#### Returns

`Vector3`

#### Inherited from

Mesh.position

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

Mesh.position

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

Mesh.preserveParentRotationForBillboard

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

Mesh.preserveParentRotationForBillboard

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:77

___

### previousWorldMatrixInstancedBuffer

• `get` **previousWorldMatrixInstancedBuffer**(): `Float32Array`

Gets the array buffer used to store the instanced buffer used for instances' previous world matrices

#### Returns

`Float32Array`

#### Inherited from

Mesh.previousWorldMatrixInstancedBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:388

___

### rawBoundingInfo

• `get` **rawBoundingInfo**(): `BoundingInfo`

#### Returns

`BoundingInfo`

#### Inherited from

Mesh.rawBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:280

• `set` **rawBoundingInfo**(`boundingInfo`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `boundingInfo` | `BoundingInfo` |

#### Returns

`void`

#### Inherited from

Mesh.rawBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:281

___

### receiveShadows

• `get` **receiveShadows**(): `boolean`

Gets or sets a boolean indicating that this mesh can receive realtime shadows

#### Returns

`boolean`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows

#### Inherited from

Mesh.receiveShadows

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:388

• `set` **receiveShadows**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.receiveShadows

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:389

___

### renderingGroupId

• `get` **renderingGroupId**(): `number`

Specifies the rendering group id for this mesh (0 by default)

#### Returns

`number`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering#rendering-groups

#### Inherited from

Mesh.renderingGroupId

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:365

• `set` **renderingGroupId**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.renderingGroupId

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:366

___

### right

• `get` **right**(): `Vector3`

The right direction of that transform in world space.

#### Returns

`Vector3`

#### Inherited from

Mesh.right

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

Mesh.rotation

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

Mesh.rotation

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

Mesh.rotationQuaternion

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

Mesh.rotationQuaternion

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:153

___

### scaling

• `get` **scaling**(): `Vector3`

Gets or sets the scaling property : a Vector3 defining the node scaling along each local axis X, Y, Z (default is (1.0, 1.0, 1.0)).

#### Returns

`Vector3`

#### Inherited from

Mesh.scaling

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

Mesh.scaling

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:147

___

### sideOrientation

• `get` **sideOrientation**(): `number`

Use this property to change the original side orientation defined at construction time
Material.sideOrientation will override this value if set
User will still be able to change the material sideOrientation afterwards if they really need it

#### Returns

`number`

#### Inherited from

Mesh.sideOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:345

• `set` **sideOrientation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.sideOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:346

___

### size

• `get` **size**(): `number`

#### Returns

`number`

#### Defined in

[src/prefabs/Text/planeText.ts:57](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L57)

• `set` **size**(`newSize`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newSize` | `number` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:60](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L60)

___

### skeleton

• `get` **skeleton**(): `Skeleton`

#### Returns

`Skeleton`

#### Inherited from

Mesh.skeleton

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:536

• `set` **skeleton**(`value`): `void`

Gets or sets a skeleton to apply skinning transformations

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Skeleton` |

#### Returns

`void`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/bonesSkeletons

#### Inherited from

Mesh.skeleton

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:535

___

### source

• `get` **source**(): `Mesh`

Gets the source mesh (the one used to clone this one from)

#### Returns

`Mesh`

#### Inherited from

Mesh.source

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:371

___

### surroundingMeshes

• `get` **surroundingMeshes**(): `AbstractMesh`[]

Gets or sets current surrounding meshes (null by default).

By default collision detection is tested against every mesh in the scene.
It is possible to set surroundingMeshes to a defined list of meshes and then only these specified
meshes will be tested for the collision.

Note: if set to an empty array no collision will happen when this mesh is moved.

#### Returns

`AbstractMesh`[]

#### Inherited from

Mesh.surroundingMeshes

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:486

• `set` **surroundingMeshes**(`meshes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meshes` | `AbstractMesh`[] |

#### Returns

`void`

#### Inherited from

Mesh.surroundingMeshes

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:487

___

### text

• `get` **text**(): `string`

#### Returns

`string`

#### Defined in

[src/prefabs/Text/planeText.ts:40](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L40)

• `set` **text**(`newText`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newText` | `string` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:43](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L43)

___

### up

• `get` **up**(): `Vector3`

The up direction of that transform in world space.

#### Returns

`Vector3`

#### Inherited from

Mesh.up

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:166

___

### useBones

• `get` **useBones**(): `boolean`

Gets a boolean indicating if this mesh has skinning data and an attached skeleton

#### Returns

`boolean`

#### Inherited from

Mesh.useBones

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:758

___

### useLODScreenCoverage

• `get` **useLODScreenCoverage**(): `boolean`

Determines if the LOD levels are intended to be calculated using screen coverage (surface area ratio) instead of distance.

#### Returns

`boolean`

#### Inherited from

Mesh.useLODScreenCoverage

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:258

• `set` **useLODScreenCoverage**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.useLODScreenCoverage

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:259

___

### useVertexColors

• `get` **useVertexColors**(): `boolean`

Gets or sets a boolean indicating that this mesh needs to use vertex color data to render (if this kind of vertex data is available in the geometry)

#### Returns

`boolean`

#### Inherited from

Mesh.useVertexColors

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:406

• `set` **useVertexColors**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.useVertexColors

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:407

___

### visibility

• `get` **visibility**(): `number`

Gets or sets mesh visibility between 0 and 1 (default is 1)

#### Returns

`number`

#### Inherited from

Mesh.visibility

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:309

• `set` **visibility**(`value`): `void`

Gets or sets mesh visibility between 0 and 1 (default is 1)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.visibility

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:313

___

### worldMatrixFromCache

• `get` **worldMatrixFromCache**(): `Matrix`

Returns directly the latest state of the mesh World matrix.
A Matrix is returned.

#### Returns

`Matrix`

#### Inherited from

Mesh.worldMatrixFromCache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:234

___

### worldMatrixInstancedBuffer

• `get` **worldMatrixInstancedBuffer**(): `Float32Array`

Gets the array buffer used to store the instanced buffer used for instances' world matrices

#### Returns

`Float32Array`

#### Inherited from

Mesh.worldMatrixInstancedBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:386

___

### BILLBOARDMODE\_ALL

• `get` **BILLBOARDMODE_ALL**(): `number`

Billboard on all axes

#### Returns

`number`

#### Inherited from

Mesh.BILLBOARDMODE\_ALL

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:199

___

### BILLBOARDMODE\_NONE

• `get` **BILLBOARDMODE_NONE**(): `number`

No billboard

#### Returns

`number`

#### Inherited from

Mesh.BILLBOARDMODE\_NONE

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:191

___

### BILLBOARDMODE\_USE\_POSITION

• `get` **BILLBOARDMODE_USE_POSITION**(): `number`

Billboard on using position instead of orientation

#### Returns

`number`

#### Inherited from

Mesh.BILLBOARDMODE\_USE\_POSITION

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:201

___

### BILLBOARDMODE\_X

• `get` **BILLBOARDMODE_X**(): `number`

Billboard on X axis

#### Returns

`number`

#### Inherited from

Mesh.BILLBOARDMODE\_X

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:193

___

### BILLBOARDMODE\_Y

• `get` **BILLBOARDMODE_Y**(): `number`

Billboard on Y axis

#### Returns

`number`

#### Inherited from

Mesh.BILLBOARDMODE\_Y

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:195

___

### BILLBOARDMODE\_Z

• `get` **BILLBOARDMODE_Z**(): `number`

Billboard on Z axis

#### Returns

`number`

#### Inherited from

Mesh.BILLBOARDMODE\_Z

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:197

## Methods

### \_activate

▸ **_activate**(`renderId`, `intermediateRendering`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderId` | `number` |
| `intermediateRendering` | `boolean` |

#### Returns

`boolean`

#### Inherited from

Mesh.\_activate

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:768

___

### \_addToSceneRootNodes

▸ **_addToSceneRootNodes**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_addToSceneRootNodes

#### Defined in

node_modules/@babylonjs/core/node.d.ts:145

___

### \_afterComputeWorldMatrix

▸ **_afterComputeWorldMatrix**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_afterComputeWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:625

___

### \_bind

▸ **_bind**(`subMesh`, `effect`, `fillMode`, `allowInstancedRendering?`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subMesh` | `SubMesh` |
| `effect` | `Effect` |
| `fillMode` | `number` |
| `allowInstancedRendering?` | `boolean` |

#### Returns

`Mesh`

#### Inherited from

Mesh.\_bind

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:775

___

### \_bindDirect

▸ **_bindDirect**(`effect`, `indexToBind`, `allowInstancedRendering?`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | `Effect` |
| `indexToBind` | `DataBuffer` |
| `allowInstancedRendering?` | `boolean` |

#### Returns

`Mesh`

#### Inherited from

Mesh.\_bindDirect

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:779

___

### \_buildUniformLayout

▸ **_buildUniformLayout**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_buildUniformLayout

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:552

___

### \_checkCollision

▸ **_checkCollision**(`collider`): `AbstractMesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collider` | `Collider` |

#### Returns

`AbstractMesh`

#### Inherited from

Mesh.\_checkCollision

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:944

___

### \_checkDelayState

▸ **_checkDelayState**(): `Mesh`

#### Returns

`Mesh`

#### Inherited from

Mesh.\_checkDelayState

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:888

___

### \_checkOcclusionQuery

▸ **_checkOcclusionQuery**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.\_checkOcclusionQuery

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1114

___

### \_collideForSubMesh

▸ **_collideForSubMesh**(`subMesh`, `transformMatrix`, `collider`): `AbstractMesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subMesh` | `SubMesh` |
| `transformMatrix` | `Matrix` |
| `collider` | `Collider` |

#### Returns

`AbstractMesh`

#### Inherited from

Mesh.\_collideForSubMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:934

___

### \_copySource

▸ **_copySource**(`source`, `doNotCloneChildren?`, `clonePhysicsImpostor?`, `cloneThinInstances?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Mesh` |
| `doNotCloneChildren?` | `boolean` |
| `clonePhysicsImpostor?` | `boolean` |
| `cloneThinInstances?` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.\_copySource

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:398

___

### \_createGlobalSubMesh

▸ **_createGlobalSubMesh**(`force`): `SubMesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `force` | `boolean` |

#### Returns

`SubMesh`

#### Inherited from

Mesh.\_createGlobalSubMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:639

___

### \_disposeInstanceSpecificData

▸ **_disposeInstanceSpecificData**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_disposeInstanceSpecificData

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:952

___

### \_disposeThinInstanceSpecificData

▸ **_disposeThinInstanceSpecificData**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_disposeThinInstanceSpecificData

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:954

___

### \_draw

▸ **_draw**(`subMesh`, `fillMode`, `instancesCount?`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subMesh` | `SubMesh` |
| `fillMode` | `number` |
| `instancesCount?` | `number` |

#### Returns

`Mesh`

#### Inherited from

Mesh.\_draw

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:783

___

### \_freeze

▸ **_freeze**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_freeze

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:838

___

### \_generatePointsArray

▸ **_generatePointsArray**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.\_generatePointsArray

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:934

___

### \_getActionManagerForTrigger

▸ **_getActionManagerForTrigger**(`trigger?`, `initialCall?`): `AbstractActionManager`

#### Parameters

| Name | Type |
| :------ | :------ |
| `trigger?` | `number` |
| `initialCall?` | `boolean` |

#### Returns

`AbstractActionManager`

#### Inherited from

Mesh.\_getActionManagerForTrigger

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:581

___

### \_getData

▸ **_getData**(`options`, `data`, `kind?`): `FloatArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `IMeshDataOptions` |
| `data` | `FloatArray` |
| `kind?` | `string` |

#### Returns

`FloatArray`

#### Inherited from

Mesh.\_getData

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:860

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

Mesh.\_getDescendants

#### Defined in

node_modules/@babylonjs/core/node.d.ts:293

___

### \_getEffectiveParent

▸ **_getEffectiveParent**(): `Node`

#### Returns

`Node`

#### Inherited from

Mesh.\_getEffectiveParent

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:577

___

### \_getInstancesRenderList

▸ **_getInstancesRenderList**(`subMeshId`, `isReplacementMode?`): `_InstancesBatch`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subMeshId` | `number` |
| `isReplacementMode?` | `boolean` |

#### Returns

`_InstancesBatch`

#### Inherited from

Mesh.\_getInstancesRenderList

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:811

___

### \_getRenderingFillMode

▸ **_getRenderingFillMode**(`fillMode`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fillMode` | `number` |

#### Returns

`number`

#### Inherited from

Mesh.\_getRenderingFillMode

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1158

___

### \_getWorldMatrixDeterminant

▸ **_getWorldMatrixDeterminant**(): `number`

#### Returns

`number`

#### Inherited from

Mesh.\_getWorldMatrixDeterminant

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:781

___

### \_initCache

▸ **_initCache**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_initCache

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:185

___

### \_invalidateInstanceVertexArrayObject

▸ **_invalidateInstanceVertexArrayObject**(): `void`

Invalidate VertexArrayObjects belonging to the mesh (but not to the Geometry of the mesh).

#### Returns

`void`

#### Inherited from

Mesh.\_invalidateInstanceVertexArrayObject

#### Defined in

node_modules/@babylonjs/core/Meshes/instancedMesh.d.ts:279

___

### \_isSynchronized

▸ **_isSynchronized**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.\_isSynchronized

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:183

___

### \_markSubMeshesAsAttributesDirty

▸ **_markSubMeshesAsAttributesDirty**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_markSubMeshesAsAttributesDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:604

___

### \_markSubMeshesAsLightDirty

▸ **_markSubMeshesAsLightDirty**(`dispose?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dispose?` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.\_markSubMeshesAsLightDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:602

___

### \_markSubMeshesAsMiscDirty

▸ **_markSubMeshesAsMiscDirty**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_markSubMeshesAsMiscDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:606

___

### \_markSyncedWithParent

▸ **_markSyncedWithParent**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_markSyncedWithParent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:252

___

### \_postActivate

▸ **_postActivate**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_postActivate

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:627

___

### \_preActivate

▸ **_preActivate**(): `Mesh`

#### Returns

`Mesh`

#### Inherited from

Mesh.\_preActivate

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:616

___

### \_preActivateForIntermediateRendering

▸ **_preActivateForIntermediateRendering**(`renderId`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderId` | `number` |

#### Returns

`Mesh`

#### Inherited from

Mesh.\_preActivateForIntermediateRendering

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:620

___

### \_processCollisionsForSubMeshes

▸ **_processCollisionsForSubMeshes**(`collider`, `transformMatrix`): `AbstractMesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collider` | `Collider` |
| `transformMatrix` | `Matrix` |

#### Returns

`AbstractMesh`

#### Inherited from

Mesh.\_processCollisionsForSubMeshes

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:938

___

### \_processInstancedBuffers

▸ **_processInstancedBuffers**(`visibleInstances`, `renderSelf`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `visibleInstances` | `InstancedMesh`[] |
| `renderSelf` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.\_processInstancedBuffers

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:828

___

### \_processRendering

▸ **_processRendering**(`renderingMesh`, `subMesh`, `effect`, `fillMode`, `batch`, `hardwareInstancedRendering`, `onBeforeDraw`, `effectiveMaterial?`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingMesh` | `AbstractMesh` |
| `subMesh` | `SubMesh` |
| `effect` | `Effect` |
| `fillMode` | `number` |
| `batch` | `_InstancesBatch` |
| `hardwareInstancedRendering` | `boolean` |
| `onBeforeDraw` | (`isInstance`: `boolean`, `world`: `Matrix`, `effectiveMaterial?`: `Material`) => `void` |
| `effectiveMaterial?` | `Material` |

#### Returns

`Mesh`

#### Inherited from

Mesh.\_processRendering

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:832

___

### \_rebuild

▸ **_rebuild**(`dispose?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dispose?` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.\_rebuild

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:836

___

### \_refreshBoundingInfo

▸ **_refreshBoundingInfo**(`data`, `bias`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `FloatArray` |
| `bias` | `Vector2` |

#### Returns

`void`

#### Inherited from

Mesh.\_refreshBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:850

___

### \_refreshBoundingInfoDirect

▸ **_refreshBoundingInfoDirect**(`extend`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `extend` | `Object` |
| `extend.maximum` | `Vector3` |
| `extend.minimum` | `Vector3` |

#### Returns

`void`

#### Inherited from

Mesh.\_refreshBoundingInfoDirect

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:854

___

### \_registerInstanceForRenderId

▸ **_registerInstanceForRenderId**(`instance`, `renderId`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `InstancedMesh` |
| `renderId` | `number` |

#### Returns

`Mesh`

#### Inherited from

Mesh.\_registerInstanceForRenderId

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:624

___

### \_removeFromSceneRootNodes

▸ **_removeFromSceneRootNodes**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_removeFromSceneRootNodes

#### Defined in

node_modules/@babylonjs/core/node.d.ts:147

___

### \_removeLightSource

▸ **_removeLightSource**(`light`, `dispose`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `light` | `Light` |
| `dispose` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.\_removeLightSource

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:597

___

### \_renderWithInstances

▸ **_renderWithInstances**(`subMesh`, `fillMode`, `batch`, `effect`, `engine`): `Mesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subMesh` | `SubMesh` |
| `fillMode` | `number` |
| `batch` | `_InstancesBatch` |
| `effect` | `Effect` |
| `engine` | `AbstractEngine` |

#### Returns

`Mesh`

#### Inherited from

Mesh.\_renderWithInstances

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:820

___

### \_renderWithThinInstances

▸ **_renderWithThinInstances**(`subMesh`, `fillMode`, `effect`, `engine`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subMesh` | `SubMesh` |
| `fillMode` | `number` |
| `effect` | `Effect` |
| `engine` | `AbstractEngine` |

#### Returns

`void`

#### Inherited from

Mesh.\_renderWithThinInstances

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:824

___

### \_resetPointsArrayCache

▸ **_resetPointsArrayCache**(): `Mesh`

#### Returns

`Mesh`

#### Inherited from

Mesh.\_resetPointsArrayCache

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:932

___

### \_resyncLightSource

▸ **_resyncLightSource**(`light`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `light` | `Light` |

#### Returns

`void`

#### Inherited from

Mesh.\_resyncLightSource

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:591

___

### \_resyncLightSources

▸ **_resyncLightSources**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_resyncLightSources

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:587

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

Mesh.\_serializeAsParent

#### Defined in

node_modules/@babylonjs/core/node.d.ts:143

___

### \_setMaterial

▸ **_setMaterial**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Material` |

#### Returns

`void`

#### Inherited from

Mesh.\_setMaterial

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:371

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

Mesh.\_setReady

#### Defined in

node_modules/@babylonjs/core/node.d.ts:339

___

### \_shouldConvertRHS

▸ **_shouldConvertRHS**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.\_shouldConvertRHS

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1156

___

### \_syncGeometryWithMorphTargetManager

▸ **_syncGeometryWithMorphTargetManager**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_syncGeometryWithMorphTargetManager

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1057

___

### \_syncParentEnabledState

▸ **_syncParentEnabledState**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_syncParentEnabledState

#### Defined in

node_modules/@babylonjs/core/node.d.ts:277

___

### \_thinInstanceCreateMatrixBuffer

▸ **_thinInstanceCreateMatrixBuffer**(`kind`, `buffer`, `staticBuffer`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |
| `buffer` | `Float32Array` |
| `staticBuffer` | `boolean` |

#### Returns

`Buffer`

#### Inherited from

Mesh.\_thinInstanceCreateMatrixBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:93

___

### \_thinInstanceInitializeUserStorage

▸ **_thinInstanceInitializeUserStorage**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_thinInstanceInitializeUserStorage

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:89

___

### \_thinInstanceRecreateBuffer

▸ **_thinInstanceRecreateBuffer**(`kind`, `staticBuffer?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |
| `staticBuffer?` | `boolean` |

#### Returns

`void`

#### Inherited from

Mesh.\_thinInstanceRecreateBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:95

___

### \_thinInstanceUpdateBufferSize

▸ **_thinInstanceUpdateBufferSize**(`kind`, `numInstances?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |
| `numInstances?` | `number` |

#### Returns

`void`

#### Inherited from

Mesh.\_thinInstanceUpdateBufferSize

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:91

___

### \_unBindEffect

▸ **_unBindEffect**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_unBindEffect

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:435

___

### \_unFreeze

▸ **_unFreeze**(): `void`

#### Returns

`void`

#### Inherited from

Mesh.\_unFreeze

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:840

___

### \_updateBoundingInfo

▸ **_updateBoundingInfo**(): `AbstractMesh`

#### Returns

`AbstractMesh`

#### Inherited from

Mesh.\_updateBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:877

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

Mesh.\_updateCache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:248

___

### \_updateInstancedBuffers

▸ **_updateInstancedBuffers**(`subMesh`, `batch`, `currentInstancesBufferSize`, `engine`, `fillMode?`, `effect?`): `void`

This method will also draw the instances if fillMode and effect are passed

#### Parameters

| Name | Type |
| :------ | :------ |
| `subMesh` | `SubMesh` |
| `batch` | `_InstancesBatch` |
| `currentInstancesBufferSize` | `number` |
| `engine` | `AbstractEngine` |
| `fillMode?` | `number` |
| `effect?` | `Effect` |

#### Returns

`void`

#### Inherited from

Mesh.\_updateInstancedBuffers

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:816

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

Mesh.\_updateNonUniformScalingState

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:278

___

### \_updateSubMeshesBoundingInfo

▸ **_updateSubMeshesBoundingInfo**(`matrix`): `AbstractMesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | `DeepImmutableObject`\<`Matrix`\> |

#### Returns

`AbstractMesh`

#### Inherited from

Mesh.\_updateSubMeshesBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:881

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

Mesh.addBehavior

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

Mesh.addChild

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:368

___

### addInstance

▸ **addInstance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `InstancedMesh` |

#### Returns

`void`

#### Inherited from

Mesh.addInstance

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1150

___

### addLODLevel

▸ **addLODLevel**(`distanceOrScreenCoverage`, `mesh`): `Mesh`

Add a mesh as LOD level triggered at the given distance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distanceOrScreenCoverage` | `number` | Either distance from the center of the object to show this level or the screen coverage if `useScreenCoverage` is set to `true`. If screen coverage, value is a fraction of the screen's total surface, between 0 and 1. Example Playground for distance https://playground.babylonjs.com/#QE7KM#197 Example Playground for screen coverage https://playground.babylonjs.com/#QE7KM#196 |
| `mesh` | `Mesh` | The mesh to be added as LOD level (can be null) |

#### Returns

`Mesh`

This mesh (for chaining)

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD

#### Inherited from

Mesh.addLODLevel

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:456

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

Mesh.addRotation

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:447

___

### alignWithNormal

▸ **alignWithNormal**(`normal`, `upDirection?`): `AbstractMesh`

Align the mesh with a normal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `normal` | `Vector3` | defines the normal to use |
| `upDirection?` | `Vector3` | can be used to redefined the up vector to use (will use the (0, 1, 0) by default) |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.alignWithNormal

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1112

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

Mesh.applyAngularImpulse

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:33

___

### applyDisplacementMap

▸ **applyDisplacementMap**(`url`, `minHeight`, `maxHeight`, `onSuccess?`, `uvOffset?`, `uvScale?`, `forceUpdate?`, `onError?`): `Mesh`

Modifies the mesh geometry according to a displacement map.
A displacement map is a colored image. Each pixel color value (actually a gradient computed from red, green, blue values) will give the displacement to apply to each mesh vertex.
The mesh must be set as updatable. Its internal geometry is directly modified, no new buffer are allocated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | is a string, the URL from the image file is to be downloaded. |
| `minHeight` | `number` | is the lower limit of the displacement. |
| `maxHeight` | `number` | is the upper limit of the displacement. |
| `onSuccess?` | (`mesh`: `Mesh`) => `void` | is an optional Javascript function to be called just after the mesh is modified. It is passed the modified mesh and must return nothing. |
| `uvOffset?` | `Vector2` | is an optional vector2 used to offset UV. |
| `uvScale?` | `Vector2` | is an optional vector2 used to scale UV. |
| `forceUpdate?` | `boolean` | defines whether or not to force an update of the generated buffers. This is useful to apply on a deserialized model for instance. |
| `onError?` | (`message?`: `string`, `exception?`: `any`) => `void` | defines a callback called when an error occurs during the processing of the request. |

#### Returns

`Mesh`

the Mesh.

#### Inherited from

Mesh.applyDisplacementMap

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:969

___

### applyDisplacementMapFromBuffer

▸ **applyDisplacementMapFromBuffer**(`buffer`, `heightMapWidth`, `heightMapHeight`, `minHeight`, `maxHeight`, `uvOffset?`, `uvScale?`, `forceUpdate?`): `Mesh`

Modifies the mesh geometry according to a displacementMap buffer.
A displacement map is a colored image. Each pixel color value (actually a gradient computed from red, green, blue values) will give the displacement to apply to each mesh vertex.
The mesh must be set as updatable. Its internal geometry is directly modified, no new buffer are allocated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `Uint8Array` | is a `Uint8Array` buffer containing series of `Uint8` lower than 255, the red, green, blue and alpha values of each successive pixel. |
| `heightMapWidth` | `number` | is the width of the buffer image. |
| `heightMapHeight` | `number` | is the height of the buffer image. |
| `minHeight` | `number` | is the lower limit of the displacement. |
| `maxHeight` | `number` | is the upper limit of the displacement. |
| `uvOffset?` | `Vector2` | is an optional vector2 used to offset UV. |
| `uvScale?` | `Vector2` | is an optional vector2 used to scale UV. |
| `forceUpdate?` | `boolean` | defines whether or not to force an update of the generated buffers. This is useful to apply on a deserialized model for instance. |

#### Returns

`Mesh`

the Mesh.

#### Inherited from

Mesh.applyDisplacementMapFromBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:984

___

### applyImpulse

▸ **applyImpulse**(`force`, `contactPoint`): `AbstractMesh`

Apply a physic impulse to the mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `force` | `Vector3` | defines the force to apply |
| `contactPoint` | `Vector3` | defines where to apply the force |

#### Returns

`AbstractMesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/physics/usingPhysicsEngine

#### Inherited from

Mesh.applyImpulse

#### Defined in

node_modules/@babylonjs/core/Physics/v1/physicsEngineComponent.d.ts:31

___

### applySkeleton

▸ **applySkeleton**(`skeleton`): `Mesh`

Updates the vertex buffer by applying transformation from the bones

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `skeleton` | `Skeleton` | defines the skeleton to apply to current mesh |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.applySkeleton

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1105

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

Mesh.attachToBone

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:391

___

### bakeCurrentTransformIntoVertices

▸ **bakeCurrentTransformIntoVertices**(`bakeIndependentlyOfChildren?`, `forceUnique?`): `Mesh`

Modifies the mesh geometry according to its own current World Matrix.
The mesh World Matrix is then reset.
This method returns nothing but really modifies the mesh even if it's originally not set as updatable.
Note that, under the hood, this method sets a new VertexBuffer each call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bakeIndependentlyOfChildren?` | `boolean` | indicates whether to preserve all child nodes' World Matrix during baking |
| `forceUnique?` | `boolean` | indicates whether to force the mesh geometry to be unique |

#### Returns

`Mesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/center_origin/bakingTransforms

#### Inherited from

Mesh.bakeCurrentTransformIntoVertices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:928

___

### bakeTransformIntoVertices

▸ **bakeTransformIntoVertices**(`transform`): `Mesh`

Modifies the mesh geometry according to the passed transformation matrix.
This method returns nothing, but it really modifies the mesh even if it's originally not set as updatable.
The mesh normals are modified using the same transformation.
Note that, under the hood, this method sets a new VertexBuffer each call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | `Matrix` | defines the transform matrix to use |

#### Returns

`Mesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/center_origin/bakingTransforms

#### Inherited from

Mesh.bakeTransformIntoVertices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:917

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

Mesh.beginAnimation

#### Defined in

node_modules/@babylonjs/core/node.d.ts:386

___

### buildBoundingInfo

▸ **buildBoundingInfo**(`minimum`, `maximum`, `worldMatrix?`): `BoundingInfo`

Creates a new bounding info for the mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minimum` | `DeepImmutableObject`\<`Vector3`\> | min vector of the bounding box/sphere |
| `maximum` | `DeepImmutableObject`\<`Vector3`\> | max vector of the bounding box/sphere |
| `worldMatrix?` | `DeepImmutableObject`\<`Matrix`\> | defines the new world matrix |

#### Returns

`BoundingInfo`

the new bounding info

#### Inherited from

Mesh.buildBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:748

___

### calcMovePOV

▸ **calcMovePOV**(`amountRight`, `amountUp`, `amountForward`): `Vector3`

Calculate relative position change from the point of view of behind the front of the mesh.
This is performed taking into account the meshes current rotation, so you do not have to care.
Supports definition of mesh facing forward or backward definedFacingForwardSearch | See definedFacingForwardSearch.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountRight` | `number` | defines the distance on the right axis |
| `amountUp` | `number` | defines the distance on the up axis |
| `amountForward` | `number` | defines the distance on the forward axis |

#### Returns

`Vector3`

the new displacement vector

#### Inherited from

Mesh.calcMovePOV

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:813

___

### calcRotatePOV

▸ **calcRotatePOV**(`flipBack`, `twirlClockwise`, `tiltRight`): `Vector3`

Calculate relative rotation change from the point of view of behind the front of the mesh.
Supports definition of mesh facing forward or backward definedFacingForwardSearch | See definedFacingForwardSearch.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flipBack` | `number` | defines the flip |
| `twirlClockwise` | `number` | defines the twirl |
| `tiltRight` | `number` | defines the tilt |

#### Returns

`Vector3`

the new rotation vector

#### Inherited from

Mesh.calcRotatePOV

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:831

___

### cleanMatrixWeights

▸ **cleanMatrixWeights**(): `void`

Renormalize the mesh and patch it up if there are no weights
  Similar to normalization by adding the weights compute the reciprocal and multiply all elements, this wil ensure that everything adds to 1.
  However in the case of zero weights then we set just a single influence to 1.
  We check in the function for extra's present and if so we use the normalizeSkinWeightsWithExtras rather than the FourWeights version.

#### Returns

`void`

#### Inherited from

Mesh.cleanMatrixWeights

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:873

___

### clone

▸ **clone**(`name?`, `newParent?`, `doNotCloneChildren?`, `clonePhysicsImpostor?`): `Mesh`

Returns a new Mesh object generated from the current mesh properties.
This method must not get confused with createInstance()

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | is a string, the name given to the new mesh |
| `newParent?` | `Node` \| `MeshCloneOptions` | can be any Node object (default `null`) or an instance of MeshCloneOptions. If the latter, doNotCloneChildren and clonePhysicsImpostor are unused. |
| `doNotCloneChildren?` | `boolean` | allows/denies the recursive cloning of the original mesh children if any (default `false`) |
| `clonePhysicsImpostor?` | `boolean` | allows/denies the cloning in the same time of the original mesh `body` used by the physics engine, if any (default `true`) |

#### Returns

`Mesh`

a new mesh

#### Inherited from

Mesh.clone

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:944

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

Mesh.computeWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:464

___

### convertToFlatShadedMesh

▸ **convertToFlatShadedMesh**(): `Mesh`

Modify the mesh to get a flat shading rendering.
This means each mesh facet will then have its own normals. Usually new vertices are added in the mesh geometry to get this result.
Warning : the mesh is really modified even if not set originally as updatable and, under the hood, a new VertexBuffer is allocated.

#### Returns

`Mesh`

current mesh

#### Inherited from

Mesh.convertToFlatShadedMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:993

___

### convertToUnIndexedMesh

▸ **convertToUnIndexedMesh**(): `Mesh`

This method removes all the mesh indices and add new vertices (duplication) in order to unfold facets into buffers.
In other words, more vertices, no more indices and a single bigger VBO.
The mesh is really modified even if not set originally as updatable. Under the hood, a new VertexBuffer is allocated.

#### Returns

`Mesh`

current mesh

#### Inherited from

Mesh.convertToUnIndexedMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1000

___

### copyVerticesData

▸ **copyVerticesData**(`kind`, `vertexData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |
| `vertexData` | `Object` |

#### Returns

`void`

#### Inherited from

Mesh.copyVerticesData

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:509

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

Mesh.createAnimationRange

#### Defined in

node_modules/@babylonjs/core/node.d.ts:352

___

### createInstance

▸ **createInstance**(`name`): `InstancedMesh`

Creates a new InstancedMesh object from the mesh model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the new instance |

#### Returns

`InstancedMesh`

a new InstancedMesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances

#### Inherited from

Mesh.createInstance

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1035

___

### createNormals

▸ **createNormals**(`updatable`): `AbstractMesh`

Creates new normals data for the mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `updatable` | `boolean` | defines if the normal vertex buffer must be flagged as updatable |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.createNormals

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1100

___

### createOrUpdateSubmeshesOctree

▸ **createOrUpdateSubmeshesOctree**(`maxCapacity?`, `maxDepth?`): `Octree`\<`SubMesh`\>

This function will create an octree to help to select the right submeshes for rendering, picking and collision computations.
Please note that you must have a decent number of submeshes to get performance improvements when using an octree

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxCapacity?` | `number` | defines the maximum size of each block (64 by default) |
| `maxDepth?` | `number` | defines the maximum depth to use (no more than 2 levels by default) |

#### Returns

`Octree`\<`SubMesh`\>

the new octree

**`See`**

 - https://www.babylonjs-playground.com/#NA4OQ#12
 - https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeOctrees

#### Inherited from

Mesh.createOrUpdateSubmeshesOctree

#### Defined in

node_modules/@babylonjs/core/Culling/Octrees/octreeSceneComponent.d.ts:46

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

Mesh.deleteAnimationRange

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

Mesh.detachFromBone

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:397

___

### directRender

▸ **directRender**(): `Mesh`

Render a complete mesh by going through all submeshes

#### Returns

`Mesh`

the current mesh

**`See`**

 - [simple test](https://playground.babylonjs.com/#5SPY1V#2)
 - [perf test](https://playground.babylonjs.com/#5SPY1V#5)

#### Inherited from

Mesh.directRender

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:857

___

### disableEdgesRendering

▸ **disableEdgesRendering**(): `AbstractMesh`

Disables the mesh edge rendering mode

#### Returns

`AbstractMesh`

the currentAbstractMesh

#### Inherited from

Mesh.disableEdgesRendering

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1119

___

### disableFacetData

▸ **disableFacetData**(): `AbstractMesh`

Disables the feature FacetData and frees the related memory

#### Returns

`AbstractMesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.disableFacetData

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1086

___

### dispose

▸ **dispose**(`doNotRecurse?`, `disposeMaterialAndTextures?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `doNotRecurse?` | `boolean` |
| `disposeMaterialAndTextures?` | `boolean` |

#### Returns

`void`

#### Overrides

Mesh.dispose

#### Defined in

[src/prefabs/Text/planeText.ts:212](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L212)

___

### enableEdgesRendering

▸ **enableEdgesRendering**(`epsilon?`, `checkVerticesInsteadOfIndices?`, `options?`): `AbstractMesh`

Enables the edge rendering mode on the mesh.
This mode makes the mesh edges visible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epsilon?` | `number` | defines the maximal distance between two angles to detect a face |
| `checkVerticesInsteadOfIndices?` | `boolean` | indicates that we should check vertex list directly instead of faces |
| `options?` | `IEdgesRendererOptions` | options to the edge renderer |

#### Returns

`AbstractMesh`

the currentAbstractMesh

**`See`**

https://www.babylonjs-playground.com/#19O9TU#0

#### Inherited from

Mesh.enableEdgesRendering

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1129

___

### fixScaleAndPivot

▸ **fixScaleAndPivot**(): `void`

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:193](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L193)

___

### flipFaces

▸ **flipFaces**(`flipNormals?`): `Mesh`

Inverses facet orientations.
Warning : the mesh is really modified even if not set originally as updatable. A new VertexBuffer is created under the hood each call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flipNormals?` | `boolean` | will also inverts the normals |

#### Returns

`Mesh`

current mesh

#### Inherited from

Mesh.flipFaces

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1007

___

### forceSharedVertices

▸ **forceSharedVertices**(): `void`

Force adjacent facets to share vertices and remove any facets that have all vertices in a line
This will undo any application of covertToFlatShadedMesh
Warning : the mesh is really modified even if not set originally as updatable. A new VertexBuffer is created under the hood each call.

#### Returns

`void`

#### Inherited from

Mesh.forceSharedVertices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1020

___

### freezeNormals

▸ **freezeNormals**(): `Mesh`

This function affects parametric shapes on vertex position update only : ribbons, tubes, etc. It has no effect at all on other shapes. It prevents the mesh normals from being recomputed on next `positions` array update.

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.freezeNormals

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:605

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

Mesh.freezeWorldMatrix

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

Mesh.getAbsolutePivotPoint

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

Mesh.getAbsolutePivotPointToRef

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

Mesh.getAbsolutePosition

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:251

___

### getAnimatables

▸ **getAnimatables**(): `IAnimatable`[]

Returns as a new array populated with the mesh material and/or skeleton, if any.

#### Returns

`IAnimatable`[]

an array of IAnimatable

#### Inherited from

Mesh.getAnimatables

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:907

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

Mesh.getAnimationByName

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

Mesh.getAnimationRange

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

Mesh.getAnimationRanges

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

Mesh.getBehaviorByName

#### Defined in

node_modules/@babylonjs/core/node.d.ts:222

___

### getBoundingInfo

▸ **getBoundingInfo**(): `BoundingInfo`

Returns the mesh BoundingInfo object or creates a new one and returns if it was undefined.
Note that it returns a shallow bounding of the mesh (i.e. it does not include children).
However, if the mesh contains thin instances, it will be expanded to include them. If you want the "raw" bounding data instead, then use `getRawBoundingInfo()`.
To get the full bounding of all children, call `getHierarchyBoundingVectors` instead.

#### Returns

`BoundingInfo`

a BoundingInfo

#### Inherited from

Mesh.getBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:725

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

Mesh.getChildMeshes

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

Mesh.getChildMeshes

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

Mesh.getChildTransformNodes

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

Mesh.getChildren

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

Mesh.getChildren

#### Defined in

node_modules/@babylonjs/core/node.d.ts:335

___

### getClassName

▸ **getClassName**(): `string`

Gets the class name

#### Returns

`string`

the string "Mesh".

#### Inherited from

Mesh.getClassName

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:425

___

### getClosestFacetAtCoordinates

▸ **getClosestFacetAtCoordinates**(`x`, `y`, `z`, `projected?`, `checkFace?`, `facing?`): `number`

Returns the closest mesh facet index at (x,y,z) World coordinates, null if not found

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | defines x coordinate |
| `y` | `number` | defines y coordinate |
| `z` | `number` | defines z coordinate |
| `projected?` | `Vector3` | sets as the (x,y,z) world projection on the facet |
| `checkFace?` | `boolean` | if true (default false), only the facet "facing" to (x,y,z) or only the ones "turning their backs", according to the parameter "facing" are returned |
| `facing?` | `boolean` | if facing and checkFace are true, only the facet "facing" to (x, y, z) are returned : positive dot (x, y, z) * facet position. If facing si false and checkFace is true, only the facet "turning their backs" to (x, y, z) are returned : negative dot (x, y, z) * facet position |

#### Returns

`number`

the face index if found (or null instead)

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getClosestFacetAtCoordinates

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1062

___

### getClosestFacetAtLocalCoordinates

▸ **getClosestFacetAtLocalCoordinates**(`x`, `y`, `z`, `projected?`, `checkFace?`, `facing?`): `number`

Returns the closest mesh facet index at (x,y,z) local coordinates, null if not found

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | defines x coordinate |
| `y` | `number` | defines y coordinate |
| `z` | `number` | defines z coordinate |
| `projected?` | `Vector3` | sets as the (x,y,z) local projection on the facet |
| `checkFace?` | `boolean` | if true (default false), only the facet "facing" to (x,y,z) or only the ones "turning their backs", according to the parameter "facing" are returned |
| `facing?` | `boolean` | if facing and checkFace are true, only the facet "facing" to (x, y, z) are returned : positive dot (x, y, z) * facet position. If facing si false and checkFace is true, only the facet "turning their backs" to (x, y, z) are returned : negative dot (x, y, z) * facet position |

#### Returns

`number`

the face index if found (or null instead)

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getClosestFacetAtLocalCoordinates

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1074

___

### getConnectedParticleSystems

▸ **getConnectedParticleSystems**(): `IParticleSystem`[]

This function returns all of the particle systems in the scene that use the mesh as an emitter.

#### Returns

`IParticleSystem`[]

an array of particle systems in the scene that use the mesh as an emitter

#### Inherited from

Mesh.getConnectedParticleSystems

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1134

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

Mesh.getDescendants

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

Mesh.getDescendants

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

Mesh.getDirection

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

Mesh.getDirectionToRef

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

Mesh.getDistanceToCamera

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:495

___

### getEmittedParticleSystems

▸ **getEmittedParticleSystems**(): `IParticleSystem`[]

Returns an array populated with IParticleSystem objects whose the mesh is the emitter

#### Returns

`IParticleSystem`[]

an array of IParticleSystem

#### Inherited from

Mesh.getEmittedParticleSystems

#### Defined in

node_modules/@babylonjs/core/Particles/particleSystemComponent.d.ts:32

___

### getEngine

▸ **getEngine**(): `AbstractEngine`

Gets the engine of the node

#### Returns

`AbstractEngine`

a Engine

#### Inherited from

Mesh.getEngine

#### Defined in

node_modules/@babylonjs/core/node.d.ts:194

___

### getFacetDataParameters

▸ **getFacetDataParameters**(): `any`

Returns the object "parameter" set with all the expected parameters for facetData computation by ComputeNormals()

#### Returns

`any`

the parameters

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetDataParameters

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1080

___

### getFacetLocalNormals

▸ **getFacetLocalNormals**(): `Vector3`[]

Returns the facetLocalNormals array.
The normals are expressed in the mesh local spac

#### Returns

`Vector3`[]

an array of Vector3

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetLocalNormals

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:996

___

### getFacetLocalPartitioning

▸ **getFacetLocalPartitioning**(): `number`[][]

Returns the facetLocalPartitioning array

#### Returns

`number`[][]

an array of array of numbers

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetLocalPartitioning

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1009

___

### getFacetLocalPositions

▸ **getFacetLocalPositions**(): `Vector3`[]

Returns the facetLocalPositions array.
The facet positions are expressed in the mesh local space

#### Returns

`Vector3`[]

an array of Vector3

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetLocalPositions

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1003

___

### getFacetNormal

▸ **getFacetNormal**(`i`): `Vector3`

Returns the i-th facet normal in the world system.
This method allocates a new Vector3 per call

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `i` | `number` | defines the facet index |

#### Returns

`Vector3`

a new Vector3

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetNormal

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1033

___

### getFacetNormalToRef

▸ **getFacetNormalToRef**(`i`, `ref`): `this`

Sets the reference Vector3 with the i-th facet normal in the world system

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `i` | `number` | defines the facet index |
| `ref` | `Vector3` | defines the target vector |

#### Returns

`this`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetNormalToRef

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1041

___

### getFacetPosition

▸ **getFacetPosition**(`i`): `Vector3`

Returns the i-th facet position in the world system.
This method allocates a new Vector3 per call

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `i` | `number` | defines the facet index |

#### Returns

`Vector3`

a new Vector3

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetPosition

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1017

___

### getFacetPositionToRef

▸ **getFacetPositionToRef**(`i`, `ref`): `AbstractMesh`

Sets the reference Vector3 with the i-th facet position in the world system

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `i` | `number` | defines the facet index |
| `ref` | `Vector3` | defines the target vector |

#### Returns

`AbstractMesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetPositionToRef

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1025

___

### getFacetsAtLocalCoordinates

▸ **getFacetsAtLocalCoordinates**(`x`, `y`, `z`): `number`[]

Returns the facets (in an array) in the same partitioning block than the one the passed coordinates are located (expressed in the mesh local system)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | defines x coordinate |
| `y` | `number` | defines y coordinate |
| `z` | `number` | defines z coordinate |

#### Returns

`number`[]

the array of facet indexes

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.getFacetsAtLocalCoordinates

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1050

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

Mesh.getHierarchyBoundingVectors

#### Defined in

node_modules/@babylonjs/core/node.d.ts:417

___

### getHierarchyEmittedParticleSystems

▸ **getHierarchyEmittedParticleSystems**(): `IParticleSystem`[]

Returns an array populated with IParticleSystem objects whose the mesh or its children are the emitter

#### Returns

`IParticleSystem`[]

an array of IParticleSystem

#### Inherited from

Mesh.getHierarchyEmittedParticleSystems

#### Defined in

node_modules/@babylonjs/core/Particles/particleSystemComponent.d.ts:37

___

### getIndices

▸ **getIndices**(`copyWhenShared?`, `forceCopy?`): `IndicesArray`

Returns an array of integers or a typed array (Int32Array, Uint32Array, Uint16Array) populated with the mesh indices.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `copyWhenShared?` | `boolean` | If true (default false) and and if the mesh geometry is shared among some other meshes, the returned array is a copy of the internal one. |
| `forceCopy?` | `boolean` | defines a boolean indicating that the returned array must be cloned upon returning it |

#### Returns

`IndicesArray`

the indices array or an empty array if the mesh has no geometry

#### Inherited from

Mesh.getIndices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:588

___

### getLOD

▸ **getLOD**(`camera`, `boundingSphere?`): `AbstractMesh`

Returns the registered LOD mesh distant from the parameter `camera` position if any, else returns the current mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | `Camera` | defines the camera to use to compute distance |
| `boundingSphere?` | `BoundingSphere` | defines a custom bounding sphere to use instead of the one from this mesh |

#### Returns

`AbstractMesh`

This mesh (for chaining)

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD

#### Inherited from

Mesh.getLOD

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:478

___

### getLODLevelAtDistance

▸ **getLODLevelAtDistance**(`distance`): `Mesh`

Returns the LOD level mesh at the passed distance or null if not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distance` | `number` | The distance from the center of the object to show this level |

#### Returns

`Mesh`

a Mesh or `null`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD

#### Inherited from

Mesh.getLODLevelAtDistance

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:463

___

### getLODLevels

▸ **getLODLevels**(): `MeshLODLevel`[]

Gets the list of MeshLODLevel associated with the current mesh

#### Returns

`MeshLODLevel`[]

an array of MeshLODLevel

#### Inherited from

Mesh.getLODLevels

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:444

___

### getMaterialForRenderPass

▸ **getMaterialForRenderPass**(`renderPassId`): `Material`

Gets the material used to render the mesh in a specific render pass

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderPassId` | `number` | render pass id |

#### Returns

`Material`

material used for the render pass. If no specific material is used for this render pass, undefined is returned (meaning mesh.material is used for this pass)

#### Inherited from

Mesh.getMaterialForRenderPass

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:377

___

### getMeshUniformBuffer

▸ **getMeshUniformBuffer**(): `UniformBuffer`

Gets the mesh uniform buffer.

#### Returns

`UniformBuffer`

the uniform buffer of the mesh.

#### Inherited from

Mesh.getMeshUniformBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:562

___

### getNormalsData

▸ **getNormalsData**(`applySkeleton?`, `applyMorph?`): `FloatArray`

Get the normals vertex data and optionally apply skeleton and morphing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applySkeleton?` | `boolean` | defines whether to apply the skeleton |
| `applyMorph?` | `boolean` | defines whether to apply the morph target |

#### Returns

`FloatArray`

the normals data

#### Inherited from

Mesh.getNormalsData

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:867

___

### getPhysicsBody

▸ **getPhysicsBody**(): `PhysicsBody`

#### Returns

`PhysicsBody`

#### Inherited from

Mesh.getPhysicsBody

#### Defined in

node_modules/@babylonjs/core/Physics/v2/physicsEngineComponent.d.ts:22

___

### getPhysicsImpostor

▸ **getPhysicsImpostor**(): `PhysicsImpostor`

Gets the current physics impostor

#### Returns

`PhysicsImpostor`

a physics impostor or null

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/physics

#### Inherited from

Mesh.getPhysicsImpostor

#### Defined in

node_modules/@babylonjs/core/Physics/v1/physicsEngineComponent.d.ts:24

___

### getPivotMatrix

▸ **getPivotMatrix**(): `Matrix`

Returns the mesh pivot matrix.
Default : Identity.

#### Returns

`Matrix`

the matrix

#### Inherited from

Mesh.getPivotMatrix

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

Mesh.getPivotPoint

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

Mesh.getPivotPointToRef

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

Mesh.getPoseMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:181

___

### getPositionData

▸ **getPositionData**(`applySkeleton?`, `applyMorph?`, `data?`): `FloatArray`

Get the position vertex data and optionally apply skeleton and morphing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applySkeleton?` | `boolean` | defines whether to apply the skeleton |
| `applyMorph?` | `boolean` | defines whether to apply the morph target |
| `data?` | `FloatArray` | defines the position data to apply the skeleton and morph to |

#### Returns

`FloatArray`

the position data

#### Inherited from

Mesh.getPositionData

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:875

___

### getPositionExpressedInLocalSpace

▸ **getPositionExpressedInLocalSpace**(): `Vector3`

Returns the mesh position in the local space from the current World matrix values.

#### Returns

`Vector3`

a new Vector3.

#### Inherited from

Mesh.getPositionExpressedInLocalSpace

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

Mesh.getPositionInCameraSpace

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:489

___

### getRawBoundingInfo

▸ **getRawBoundingInfo**(): `BoundingInfo`

Returns the bounding info unnafected by instance data.

#### Returns

`BoundingInfo`

the bounding info of the mesh unaffected by instance data.

#### Inherited from

Mesh.getRawBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:730

___

### getScene

▸ **getScene**(): `Scene`

Gets the scene of the node

#### Returns

`Scene`

a scene

#### Inherited from

Mesh.getScene

#### Defined in

node_modules/@babylonjs/core/node.d.ts:189

___

### getTotalIndices

▸ **getTotalIndices**(): `number`

Returns a positive integer : the total number of indices in this mesh geometry.

#### Returns

`number`

the numner of indices or zero if the mesh has no geometry.

#### Inherited from

Mesh.getTotalIndices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:581

___

### getTotalVertices

▸ **getTotalVertices**(): `number`

Returns the total number of vertices within the mesh geometry or zero if the mesh has no geometry.

#### Returns

`number`

the total number of vertices

#### Inherited from

Mesh.getTotalVertices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:487

___

### getVertexBuffer

▸ **getVertexBuffer**(`kind`, `bypassInstanceData?`): `VertexBuffer`

Returns the mesh VertexBuffer object from the requested `kind`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to read from (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.NormalKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |
| `bypassInstanceData?` | `boolean` | defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false |

#### Returns

`VertexBuffer`

a FloatArray or null if the mesh has no vertex buffer for this kind.

#### Inherited from

Mesh.getVertexBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:531

___

### getVerticesData

▸ **getVerticesData**(`kind`, `copyWhenShared?`, `forceCopy?`, `bypassInstanceData?`): `FloatArray`

Returns the content of an associated vertex buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to read from (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |
| `copyWhenShared?` | `boolean` | defines a boolean indicating that if the mesh geometry is shared among some other meshes, the returned array is a copy of the internal one |
| `forceCopy?` | `boolean` | defines a boolean forcing the copy of the buffer no matter what the value of copyWhenShared is |
| `bypassInstanceData?` | `boolean` | defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false |

#### Returns

`FloatArray`

a FloatArray or null if the mesh has no geometry or no vertex buffer for this kind.

#### Inherited from

Mesh.getVerticesData

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:508

___

### getVerticesDataKinds

▸ **getVerticesDataKinds**(`bypassInstanceData?`): `string`[]

Returns a string which contains the list of existing `kinds` of Vertex Data associated with this mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bypassInstanceData?` | `boolean` | defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false |

#### Returns

`string`[]

an array of strings

#### Inherited from

Mesh.getVerticesDataKinds

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:576

___

### getWorldMatrix

▸ **getWorldMatrix**(): `Matrix`

Gets the current world matrix

#### Returns

`Matrix`

a Matrix

#### Inherited from

Mesh.getWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:779

___

### increaseVertices

▸ **increaseVertices**(`numberPerEdge?`): `void`

Increase the number of facets and hence vertices in a mesh
Vertex normals are interpolated from existing vertex normals
Warning : the mesh is really modified even if not set originally as updatable. A new VertexBuffer is created under the hood each call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numberPerEdge?` | `number` | the number of new vertices to add to each edge of a facet, optional default 1 |

#### Returns

`void`

#### Inherited from

Mesh.increaseVertices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1014

___

### instantiateHierarchy

▸ **instantiateHierarchy**(`newParent?`, `options?`, `onNewNodeCreated?`): `TransformNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newParent?` | `TransformNode` |
| `options?` | `Object` |
| `options.doNotInstantiate` | `boolean` \| (`node`: `TransformNode`) => `boolean` |
| `onNewNodeCreated?` | (`source`: `TransformNode`, `clone`: `TransformNode`) => `void` |

#### Returns

`TransformNode`

#### Inherited from

Mesh.instantiateHierarchy

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:418

___

### intersects

▸ **intersects**(`ray`, `fastCheck?`, `trianglePredicate?`, `onlyBoundingInfo?`, `worldToUse?`, `skipBoundingInfo?`): `PickingInfo`

Checks if the passed Ray intersects with the mesh. A mesh triangle can be picked both from its front and back sides,
irrespective of orientation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ray` | `Ray` | defines the ray to use. It should be in the mesh's LOCAL coordinate space. |
| `fastCheck?` | `boolean` | defines if fast mode (but less precise) must be used (false by default) |
| `trianglePredicate?` | `TrianglePickingPredicate` | defines an optional predicate used to select faces when a mesh intersection is detected |
| `onlyBoundingInfo?` | `boolean` | defines a boolean indicating if picking should only happen using bounding info (false by default) |
| `worldToUse?` | `Matrix` | defines the world matrix to use to get the world coordinate of the intersection point |
| `skipBoundingInfo?` | `boolean` | a boolean indicating if we should skip the bounding info check |

#### Returns

`PickingInfo`

the picking info

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/interactions/mesh_intersect

#### Inherited from

Mesh.intersects

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:959

___

### intersectsMesh

▸ **intersectsMesh**(`mesh`, `precise?`, `includeDescendants?`): `boolean`

True if the mesh intersects another mesh or a SolidParticle object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | `AbstractMesh` \| `SolidParticle` | defines a target mesh or SolidParticle to test |
| `precise?` | `boolean` | Unless the parameter `precise` is set to `true` the intersection is computed according to Axis Aligned Bounding Boxes (AABB), else according to OBB (Oriented BBoxes) |
| `includeDescendants?` | `boolean` | Can be set to true to test if the mesh defined in parameters intersects with the current mesh or any child meshes |

#### Returns

`boolean`

true if there is an intersection

#### Inherited from

Mesh.intersectsMesh

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:905

___

### intersectsPoint

▸ **intersectsPoint**(`point`): `boolean`

Returns true if the passed point (Vector3) is inside the mesh bounding box

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Vector3` | defines the point to test |

#### Returns

`boolean`

true if there is an intersection

#### Inherited from

Mesh.intersectsPoint

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:911

___

### isCompletelyInFrustum

▸ **isCompletelyInFrustum**(`frustumPlanes`): `boolean`

Returns `true` if the mesh is completely in the frustum defined be the passed array of planes.
A mesh is completely in the frustum if its bounding box it completely inside the frustum.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frustumPlanes` | `Plane`[] | defines the frustum to test |

#### Returns

`boolean`

true if the mesh is completely in the frustum planes

#### Inherited from

Mesh.isCompletelyInFrustum

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:897

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

Mesh.isDescendantOf

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

Mesh.isDisposed

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

Mesh.isEnabled

#### Defined in

node_modules/@babylonjs/core/node.d.ts:275

___

### isInFrustum

▸ **isInFrustum**(`frustumPlanes`): `boolean`

Returns `true` if the mesh is within the frustum defined by the passed array of planes.
A mesh is in the frustum if its bounding box intersects the frustum

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frustumPlanes` | `Plane`[] | defines the frustum to test |

#### Returns

`boolean`

true if the mesh is in the frustum planes

#### Inherited from

Mesh.isInFrustum

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:896

___

### isReady

▸ **isReady**(`completeCheck?`, `forceInstanceSupport?`): `boolean`

Determine if the current mesh is ready to be rendered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `completeCheck?` | `boolean` | defines if a complete check (including materials and lights) has to be done (false by default) |
| `forceInstanceSupport?` | `boolean` | will check if the mesh will be ready when used with instances (false by default) |

#### Returns

`boolean`

true if all associated assets are ready (material, textures, shaders)

#### Inherited from

Mesh.isReady

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:596

___

### isSynchronized

▸ **isSynchronized**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.isSynchronized

#### Defined in

node_modules/@babylonjs/core/node.d.ts:256

___

### isSynchronizedWithParent

▸ **isSynchronizedWithParent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Mesh.isSynchronizedWithParent

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

Mesh.isUsingPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:132

___

### isUsingPostMultiplyPivotMatrix

▸ **isUsingPostMultiplyPivotMatrix**(): `boolean`

#### Returns

`boolean`

true if pivot matrix must be cancelled in the world matrix. When this parameter is set to true (default), the inverse of the pivot matrix is also applied at the end to cancel the transformation effect.

#### Inherited from

Mesh.isUsingPostMultiplyPivotMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:136

___

### isVertexBufferUpdatable

▸ **isVertexBufferUpdatable**(`kind`, `bypassInstanceData?`): `boolean`

Returns a boolean defining if the vertex data for the requested `kind` is updatable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to check (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |
| `bypassInstanceData?` | `boolean` | defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false |

#### Returns

`boolean`

a boolean

#### Inherited from

Mesh.isVertexBufferUpdatable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:570

___

### isVerticesDataPresent

▸ **isVerticesDataPresent**(`kind`, `bypassInstanceData?`): `boolean`

Tests if a specific vertex buffer is associated with this mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to check (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.NormalKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |
| `bypassInstanceData?` | `boolean` | defines a boolean indicating that the function should not take into account the instance data (applies only if the mesh has instances). Default: false |

#### Returns

`boolean`

a boolean

#### Inherited from

Mesh.isVerticesDataPresent

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:551

___

### isWorldMatrixCameraDependent

▸ **isWorldMatrixCameraDependent**(): `boolean`

Returns whether the transform node world matrix computation needs the camera information to be computed.
This is the case when the node is a billboard or has an infinite distance for instance.

#### Returns

`boolean`

true if the world matrix computation needs the camera information to be computed

#### Inherited from

Mesh.isWorldMatrixCameraDependent

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

Mesh.locallyTranslate

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

Mesh.lookAt

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:285

___

### makeGeometryUnique

▸ **makeGeometryUnique**(): `Mesh`

Creates a un-shared specific occurence of the geometry for the mesh.

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.makeGeometryUnique

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:741

___

### markAsDirty

▸ **markAsDirty**(`property?`): `AbstractMesh`

Flag the AbstractMesh as dirty (Forcing it to update everything)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property?` | `string` | if set to "rotation" the objects rotationQuaternion will be set to null |

#### Returns

`AbstractMesh`

this AbstractMesh

#### Inherited from

Mesh.markAsDirty

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:612

___

### markVerticesDataAsUpdatable

▸ **markVerticesDataAsUpdatable**(`kind`, `updatable?`): `void`

Flags an associated vertex buffer as updatable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to use (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |
| `updatable?` | `boolean` | defines if the updated vertex buffer must be flagged as updatable |

#### Returns

`void`

#### Inherited from

Mesh.markVerticesDataAsUpdatable

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:700

___

### movePOV

▸ **movePOV**(`amountRight`, `amountUp`, `amountForward`): `AbstractMesh`

Perform relative position change from the point of view of behind the front of the mesh.
This is performed taking into account the meshes current rotation, so you do not have to care.
Supports definition of mesh facing forward or backward definedFacingForwardSearch | See definedFacingForwardSearch.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountRight` | `number` | defines the distance on the right axis |
| `amountUp` | `number` | defines the distance on the up axis |
| `amountForward` | `number` | defines the distance on the forward axis |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.movePOV

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:803

___

### moveWithCollisions

▸ **moveWithCollisions**(`displacement`): `AbstractMesh`

Move the mesh using collision engine

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `displacement` | `Vector3` | defines the requested displacement vector |

#### Returns

`AbstractMesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions

#### Inherited from

Mesh.moveWithCollisions

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:929

___

### normalizeToUnitCube

▸ **normalizeToUnitCube**(`includeDescendants?`, `ignoreRotation?`, `predicate?`): `AbstractMesh`

Uniformly scales the mesh to fit inside of a unit cube (1 X 1 X 1 units)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `includeDescendants?` | `boolean` | Use the hierarchy's bounding box instead of the mesh's bounding box. Default is false |
| `ignoreRotation?` | `boolean` | ignore rotation when computing the scale (ie. object will be axis aligned). Default is false |
| `predicate?` | (`node`: `AbstractMesh`) => `boolean` | predicate that is passed in to getHierarchyBoundingVectors when selecting which object should be included when scaling |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.normalizeToUnitCube

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:756

___

### optimizeIndices

▸ **optimizeIndices**(`successCallback?`): `Mesh`

Optimization of the mesh's indices, in case a mesh has duplicated vertices.
The function will only reorder the indices and will not remove unused vertices to avoid problems with submeshes.
This should be used together with the simplification to avoid disappearing triangles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `successCallback?` | (`mesh?`: `Mesh`) => `void` | an optional success callback to be called after the optimization finished. |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.optimizeIndices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1049

___

### optimizeIndicesAsync

▸ **optimizeIndicesAsync**(): `Promise`\<`AbstractMesh`\>

Optimize the indices order so that we keep the faces with similar indices together

#### Returns

`Promise`\<`AbstractMesh`\>

the current mesh

#### Inherited from

Mesh.optimizeIndicesAsync

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:1105

___

### refreshBoundingInfo

▸ **refreshBoundingInfo**(`applySkeletonOrOptions?`, `applyMorph?`): `Mesh`

This method recomputes and sets a new BoundingInfo to the mesh unless it is locked.
This means the mesh underlying bounding box and sphere are recomputed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applySkeletonOrOptions?` | `boolean` \| `IMeshDataOptions` | defines whether to apply the skeleton before computing the bounding info or a set of options |
| `applyMorph?` | `boolean` | defines whether to apply the morph target before computing the bounding info |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.refreshBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:635

___

### registerAfterRender

▸ **registerAfterRender**(`func`): `Mesh`

Registers for this mesh a javascript function called just after the rendering is complete

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`mesh`: `AbstractMesh`) => `void` | defines the function to call after rendering this mesh |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.registerAfterRender

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:801

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

Mesh.registerAfterWorldMatrixUpdate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:477

___

### registerBeforeRender

▸ **registerBeforeRender**(`func`): `Mesh`

Registers for this mesh a javascript function called just before the rendering process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`mesh`: `AbstractMesh`) => `void` | defines the function to call before rendering this mesh |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.registerBeforeRender

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:789

___

### registerInstancedBuffer

▸ **registerInstancedBuffer**(`kind`, `stride`): `void`

Register a custom buffer that will be instanced

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines the buffer kind |
| `stride` | `number` | defines the stride in floats |

#### Returns

`void`

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances#custom-buffers

#### Inherited from

Mesh.registerInstancedBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/instancedMesh.d.ts:275

___

### releaseSubMeshes

▸ **releaseSubMeshes**(`immediate?`): `AbstractMesh`

Disposes all the submeshes of the current mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `immediate?` | `boolean` | should dispose the effects immediately or not |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.releaseSubMeshes

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:973

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

Mesh.removeBehavior

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

Mesh.removeChild

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:375

___

### removeInstance

▸ **removeInstance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `InstancedMesh` |

#### Returns

`void`

#### Inherited from

Mesh.removeInstance

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1154

___

### removeLODLevel

▸ **removeLODLevel**(`mesh`): `Mesh`

Remove a mesh from the LOD array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | `Mesh` | defines the mesh to be removed |

#### Returns

`Mesh`

This mesh (for chaining)

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD

#### Inherited from

Mesh.removeLODLevel

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:470

___

### removeVerticesData

▸ **removeVerticesData**(`kind`): `void`

Delete a vertex buffer associated with this mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to delete (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |

#### Returns

`void`

#### Inherited from

Mesh.removeVerticesData

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:682

___

### render

▸ **render**(`subMesh`, `enableAlphaMode`, `effectiveMeshReplacement?`): `Mesh`

Triggers the draw call for the mesh. Usually, you don't need to call this method by your own because the mesh rendering is handled by the scene rendering manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subMesh` | `SubMesh` | defines the subMesh to render |
| `enableAlphaMode` | `boolean` | defines if alpha mode can be changed |
| `effectiveMeshReplacement?` | `AbstractMesh` | defines an optional mesh used to provide info for the rendering |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.render

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:865

___

### renderWithRenderPassId

▸ **renderWithRenderPassId**(`renderPassId?`, `enableAlphaMode?`, `effectiveMeshReplacement?`, `subMesh?`, `checkFrustumCulling?`): `this`

Triggers the draw call for the mesh (or a submesh), for a specific render pass id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderPassId?` | `number` | defines the render pass id to use to draw the mesh / submesh. If not provided, use the current renderPassId of the engine. |
| `enableAlphaMode?` | `boolean` | defines if alpha mode can be changed (default: false) |
| `effectiveMeshReplacement?` | `AbstractMesh` | defines an optional mesh used to provide info for the rendering (default: undefined) |
| `subMesh?` | `SubMesh` | defines the subMesh to render. If not provided, draw all mesh submeshes (default: undefined) |
| `checkFrustumCulling?` | `boolean` | defines if frustum culling must be checked (default: true). If you know the mesh is in the frustum (or if you don't care!), you can pass false to optimize. |

#### Returns

`this`

the current mesh

#### Inherited from

Mesh.renderWithRenderPassId

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:850

___

### resetDrawCache

▸ **resetDrawCache**(`passId?`, `immediate?`): `void`

Resets the draw wrappers cache for all submeshes of this abstract mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `passId?` | `number` | If provided, releases only the draw wrapper corresponding to this render pass id |
| `immediate?` | `boolean` | If true, the effect will be released immediately, otherwise it will be released at the next frame |

#### Returns

`void`

#### Inherited from

Mesh.resetDrawCache

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:618

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

Mesh.resetLocalMatrix

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

Mesh.rotate

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

Mesh.rotateAround

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:420

___

### rotatePOV

▸ **rotatePOV**(`flipBack`, `twirlClockwise`, `tiltRight`): `AbstractMesh`

Perform relative rotation change from the point of view of behind the front of the mesh.
Supports definition of mesh facing forward or backward definedFacingForwardSearch | See definedFacingForwardSearch.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flipBack` | `number` | defines the flip |
| `twirlClockwise` | `number` | defines the twirl |
| `tiltRight` | `number` | defines the tilt |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.rotatePOV

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:822

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:116](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L116)

___

### serialize

▸ **serialize**(`serializationObject?`): `any`

Serialize current mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serializationObject?` | `any` | defines the object which will receive the serialization data |

#### Returns

`any`

the serialized object

#### Inherited from

Mesh.serialize

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1055

___

### serializeAnimationRanges

▸ **serializeAnimationRanges**(): `any`

Serialize animation ranges into a JSON compatible object

#### Returns

`any`

serialization object

#### Inherited from

Mesh.serializeAnimationRanges

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

Mesh.setAbsolutePosition

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:257

___

### setBoundingInfo

▸ **setBoundingInfo**(`boundingInfo`): `AbstractMesh`

Overwrite the current bounding info

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `boundingInfo` | `BoundingInfo` | defines the new bounding info |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.setBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:736

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

Mesh.setDirection

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

Mesh.setEnabled

#### Defined in

node_modules/@babylonjs/core/node.d.ts:282

___

### setIndexBuffer

▸ **setIndexBuffer**(`indexBuffer`, `totalVertices`, `totalIndices`, `is32Bits?`): `void`

Sets the index buffer of this mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexBuffer` | `DataBuffer` | Defines the index buffer to use for this mesh |
| `totalVertices` | `number` | Defines the total number of vertices used by the buffer |
| `totalIndices` | `number` | Defines the total number of indices in the index buffer |
| `is32Bits?` | `boolean` | Defines if the indices are 32 bits. If null (default), the value is guessed from the number of vertices |

#### Returns

`void`

#### Inherited from

Mesh.setIndexBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:749

___

### setIndices

▸ **setIndices**(`indices`, `totalVertices?`, `updatable?`, `dontForceSubMeshRecreation?`): `AbstractMesh`

Set the index buffer of this mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indices` | `IndicesArray` | defines the source data |
| `totalVertices?` | `number` | defines the total number of vertices referenced by this index data (can be null) |
| `updatable?` | `boolean` | defines if the updated index buffer must be flagged as updatable (default is false) |
| `dontForceSubMeshRecreation?` | `boolean` | defines a boolean indicating that we don't want to force the recreation of sub-meshes if we don't have to (false by default) |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.setIndices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:758

___

### setMaterialByID

▸ **setMaterialByID**(`id`): `Mesh`

Sets the mesh material by the material or multiMaterial `id` property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | is a string identifying the material or the multiMaterial |

#### Returns

`Mesh`

the current mesh

**`Deprecated`**

Please use MeshBuilder instead Please use setMaterialById instead

#### Inherited from

Mesh.setMaterialByID

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1165

___

### setMaterialById

▸ **setMaterialById**(`id`): `Mesh`

Sets the mesh material by the material or multiMaterial `id` property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | is a string identifying the material or the multiMaterial |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.setMaterialById

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:902

___

### setMaterialForRenderPass

▸ **setMaterialForRenderPass**(`renderPassId`, `material?`): `void`

Sets the material to be used to render the mesh in a specific render pass

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderPassId` | `number` | render pass id |
| `material?` | `Material` | material to use for this render pass. If undefined is passed, no specific material will be used for this render pass but the regular material will be used instead (mesh.material) |

#### Returns

`void`

#### Inherited from

Mesh.setMaterialForRenderPass

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:383

___

### setNormalsForCPUSkinning

▸ **setNormalsForCPUSkinning**(): `Float32Array`

Prepare internal normal array for software CPU skinning

#### Returns

`Float32Array`

original normals used for CPU skinning. Useful for integrating Morphing with skeletons in same mesh.

#### Inherited from

Mesh.setNormalsForCPUSkinning

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1099

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

Mesh.setParent

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:359

___

### setPhysicsLinkWith

▸ **setPhysicsLinkWith**(`otherMesh`, `pivot1`, `pivot2`, `options?`): `AbstractMesh`

Creates a physic joint between two meshes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherMesh` | `Mesh` | defines the other mesh to use |
| `pivot1` | `Vector3` | defines the pivot to use on this mesh |
| `pivot2` | `Vector3` | defines the pivot to use on the other mesh |
| `options?` | `any` | defines additional options (can be plugin dependent) |

#### Returns

`AbstractMesh`

the current mesh

**`See`**

https://www.babylonjs-playground.com/#0BS5U0#0

#### Inherited from

Mesh.setPhysicsLinkWith

#### Defined in

node_modules/@babylonjs/core/Physics/v1/physicsEngineComponent.d.ts:41

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

Mesh.setPivotMatrix

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

Mesh.setPivotPoint

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

Mesh.setPositionWithLocalVector

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:263

___

### setPositionsForCPUSkinning

▸ **setPositionsForCPUSkinning**(): `Float32Array`

Prepare internal position array for software CPU skinning

#### Returns

`Float32Array`

original positions used for CPU skinning. Useful for integrating Morphing with skeletons in same mesh

#### Inherited from

Mesh.setPositionsForCPUSkinning

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1094

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

Mesh.setPreTransformMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:206

___

### setVerticesBuffer

▸ **setVerticesBuffer**(`buffer`, `disposeExistingBuffer?`): `Mesh`

Sets the mesh global Vertex Buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `VertexBuffer` | defines the buffer to use |
| `disposeExistingBuffer?` | `boolean` | disposes the existing buffer, if any (default: true) |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.setVerticesBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:707

___

### setVerticesData

▸ **setVerticesData**(`kind`, `data`, `updatable?`, `stride?`): `AbstractMesh`

Copy a FloatArray into a specific associated vertex buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to write to (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |
| `data` | `FloatArray` | defines the data source |
| `updatable?` | `boolean` | defines if the updated vertex buffer must be flagged as updatable |
| `stride?` | `number` | defines the data stride size (can be null) |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.setVerticesData

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:665

___

### simplify

▸ **simplify**(`settings`, `parallelProcessing?`, `simplificationType?`, `successCallback?`): `Mesh`

Simplify the mesh according to the given array of settings.
Function will return immediately and will simplify async

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `settings` | `ISimplificationSettings`[] | a collection of simplification settings |
| `parallelProcessing?` | `boolean` | should all levels calculate parallel or one after the other |
| `simplificationType?` | `QUADRATIC` | the type of simplification to run |
| `successCallback?` | (`mesh?`: `Mesh`, `submeshIndex?`: `number`) => `void` | optional success callback to be called after the simplification finished processing all settings |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.simplify

#### Defined in

node_modules/@babylonjs/core/Meshes/meshSimplificationSceneComponent.d.ts:27

___

### subdivide

▸ **subdivide**(`count`): `void`

This function will subdivide the mesh into multiple submeshes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | defines the expected number of submeshes |

#### Returns

`void`

#### Inherited from

Mesh.subdivide

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:644

___

### synchronizeInstances

▸ **synchronizeInstances**(): `Mesh`

Synchronises all the mesh instance submeshes to the current mesh submeshes, if any.
After this call, all the mesh instances have the same submeshes than the current mesh.

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.synchronizeInstances

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1041

___

### thinInstanceAdd

▸ **thinInstanceAdd**(`matrix`, `refresh?`): `number`

Creates a new thin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | `DeepImmutableObject`\<`Matrix`\> \| `DeepImmutableObject`\<`Matrix`\>[] | the matrix or array of matrices (position, rotation, scale) of the thin instance(s) to create |
| `refresh?` | `boolean` | true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance |

#### Returns

`number`

the thin instance index number. If you pass an array of matrices, other instance indexes are index+1, index+2, etc

#### Inherited from

Mesh.thinInstanceAdd

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:23

___

### thinInstanceAddSelf

▸ **thinInstanceAddSelf**(`refresh?`): `number`

Adds the transformation (matrix) of the current mesh as a thin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `refresh?` | `boolean` | true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance |

#### Returns

`number`

the thin instance index number

#### Inherited from

Mesh.thinInstanceAddSelf

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:29

___

### thinInstanceBufferUpdated

▸ **thinInstanceBufferUpdated**(`kind`): `void`

Synchronize the gpu buffers with a thin instance buffer. Call this method if you update later on the buffers passed to thinInstanceSetBuffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | name of the attribute to update. Use "matrix" to update the buffer of matrices |

#### Returns

`void`

#### Inherited from

Mesh.thinInstanceBufferUpdated

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:72

___

### thinInstanceGetWorldMatrices

▸ **thinInstanceGetWorldMatrices**(): `Matrix`[]

Gets the list of world matrices

#### Returns

`Matrix`[]

an array containing all the world matrices from the thin instances

#### Inherited from

Mesh.thinInstanceGetWorldMatrices

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:67

___

### thinInstancePartialBufferUpdate

▸ **thinInstancePartialBufferUpdate**(`kind`, `data`, `offset`): `void`

Applies a partial update to a buffer directly on the GPU
Note that the buffer located on the CPU is NOT updated! It's up to you to update it (or not) with the same data you pass to this method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | name of the attribute to update. Use "matrix" to update the buffer of matrices |
| `data` | `Float32Array` | the data to set in the GPU buffer |
| `offset` | `number` | the offset in the GPU buffer where to update the data |

#### Returns

`void`

#### Inherited from

Mesh.thinInstancePartialBufferUpdate

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:80

___

### thinInstanceRefreshBoundingInfo

▸ **thinInstanceRefreshBoundingInfo**(`forceRefreshParentInfo?`, `applySkeleton?`, `applyMorph?`): `void`

Refreshes the bounding info, taking into account all the thin instances defined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `forceRefreshParentInfo?` | `boolean` | true to force recomputing the mesh bounding info and use it to compute the aggregated bounding info |
| `applySkeleton?` | `boolean` | defines whether to apply the skeleton before computing the bounding info |
| `applyMorph?` | `boolean` | defines whether to apply the morph target before computing the bounding info |

#### Returns

`void`

#### Inherited from

Mesh.thinInstanceRefreshBoundingInfo

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:87

___

### thinInstanceRegisterAttribute

▸ **thinInstanceRegisterAttribute**(`kind`, `stride`): `void`

Registers a custom attribute to be used with thin instances

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | name of the attribute |
| `stride` | `number` | size in floats of the attribute |

#### Returns

`void`

#### Inherited from

Mesh.thinInstanceRegisterAttribute

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:35

___

### thinInstanceSetAttributeAt

▸ **thinInstanceSetAttributeAt**(`kind`, `index`, `value`, `refresh?`): `void`

Sets the value of a custom attribute for a thin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | name of the attribute |
| `index` | `number` | index of the thin instance |
| `value` | `number`[] | value to set |
| `refresh?` | `boolean` | true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance |

#### Returns

`void`

#### Inherited from

Mesh.thinInstanceSetAttributeAt

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:50

___

### thinInstanceSetBuffer

▸ **thinInstanceSetBuffer**(`kind`, `buffer`, `stride?`, `staticBuffer?`): `void`

Sets a buffer to be used with thin instances. This method is a faster way to setup multiple instances than calling thinInstanceAdd repeatedly

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | name of the attribute. Use "matrix" to setup the buffer of matrices |
| `buffer` | `Float32Array` | buffer to set |
| `stride?` | `number` | size in floats of each value of the buffer |
| `staticBuffer?` | `boolean` | indicates that the buffer is static, so that you won't change it after it is set (better performances - true by default) |

#### Returns

`void`

#### Inherited from

Mesh.thinInstanceSetBuffer

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:62

___

### thinInstanceSetMatrixAt

▸ **thinInstanceSetMatrixAt**(`index`, `matrix`, `refresh?`): `void`

Sets the matrix of a thin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | index of the thin instance |
| `matrix` | `DeepImmutableObject`\<`Matrix`\> | matrix to set |
| `refresh?` | `boolean` | true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance |

#### Returns

`void`

#### Inherited from

Mesh.thinInstanceSetMatrixAt

#### Defined in

node_modules/@babylonjs/core/Meshes/thinInstanceMesh.d.ts:42

___

### toLeftHanded

▸ **toLeftHanded**(): `Mesh`

Invert the geometry to move from a right handed system to a left handed one.

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.toLeftHanded

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:771

___

### toString

▸ **toString**(`fullDetails?`): `string`

Returns a description of this mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fullDetails?` | `boolean` | define if full details about this mesh must be used |

#### Returns

`string`

a descriptive string representing this mesh

#### Inherited from

Mesh.toString

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:433

___

### transferFromMesh

▸ **transferFromMesh**(`sourceMesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceMesh` | `Mesh` |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:142](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L142)

___

### transferToEffect

▸ **transferToEffect**(`world`): `void`

Transfer the mesh values to its UBO.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `world` | `Matrix` | The world matrix associated with the mesh |

#### Returns

`void`

#### Inherited from

Mesh.transferToEffect

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:557

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

Mesh.translate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:429

___

### unfreezeNormals

▸ **unfreezeNormals**(): `Mesh`

This function affects parametric shapes on vertex position update only : ribbons, tubes, etc. It has no effect at all on other shapes. It reactivates the mesh normals computation if it was previously frozen

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.unfreezeNormals

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:610

___

### unfreezeWorldMatrix

▸ **unfreezeWorldMatrix**(): `this`

Allows back the World matrix computation.

#### Returns

`this`

the TransformNode.

#### Inherited from

Mesh.unfreezeWorldMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:242

___

### unregisterAfterRender

▸ **unregisterAfterRender**(`func`): `Mesh`

Disposes a previously registered javascript function called after the rendering.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`mesh`: `AbstractMesh`) => `void` | defines the function to remove |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.unregisterAfterRender

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:807

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

Mesh.unregisterAfterWorldMatrixUpdate

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:483

___

### unregisterBeforeRender

▸ **unregisterBeforeRender**(`func`): `Mesh`

Disposes a previously registered javascript function called before the rendering

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`mesh`: `AbstractMesh`) => `void` | defines the function to remove |

#### Returns

`Mesh`

the current mesh

#### Inherited from

Mesh.unregisterBeforeRender

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:795

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

Mesh.updateCache

#### Defined in

node_modules/@babylonjs/core/node.d.ts:240

___

### updateFacetData

▸ **updateFacetData**(): `AbstractMesh`

Updates the mesh facetData arrays and the internal partitioning when the mesh is morphed or updated.
This method can be called within the render loop.
You don't need to call this method by yourself in the render loop when you update/morph a mesh with the methods CreateXXX() as they automatically manage this computation

#### Returns

`AbstractMesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData

#### Inherited from

Mesh.updateFacetData

#### Defined in

node_modules/@babylonjs/core/Meshes/abstractMesh.d.ts:989

___

### updateIndices

▸ **updateIndices**(`indices`, `offset?`, `gpuMemoryOnly?`): `AbstractMesh`

Update the current index buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indices` | `IndicesArray` | defines the source data |
| `offset?` | `number` | defines the offset in the index buffer where to store the new data (can be null) |
| `gpuMemoryOnly?` | `boolean` | defines a boolean indicating that only the GPU memory must be updated leaving the CPU version of the indices unchanged (false by default) |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.updateIndices

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:766

___

### updateMeshPositions

▸ **updateMeshPositions**(`positionFunction`, `computeNormals?`): `Mesh`

This method updates the vertex positions of an updatable mesh according to the `positionFunction` returned values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `positionFunction` | (`data`: `FloatArray`) => `void` | is a simple JS function what is passed the mesh `positions` array. It doesn't need to return anything |
| `computeNormals?` | `boolean` | is a boolean (default true) to enable/disable the mesh normal recomputation after the vertex position update |

#### Returns

`Mesh`

the current mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#other-shapes-updatemeshpositions

#### Inherited from

Mesh.updateMeshPositions

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:736

___

### updatePlaneText

▸ **updatePlaneText**(`options`): `void`

Updates the PlaneText with new options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `PlaneTextOptions` | An options object of the properties to change. |

#### Returns

`void`

#### Defined in

[src/prefabs/Text/planeText.ts:110](https://github.com/jpmorganchase/anu/blob/b8a5d66c/src/prefabs/Text/planeText.ts#L110)

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

Mesh.updatePoseMatrix

#### Defined in

node_modules/@babylonjs/core/Meshes/transformNode.d.ts:176

___

### updateVerticesData

▸ **updateVerticesData**(`kind`, `data`, `updateExtends?`, `makeItUnique?`): `AbstractMesh`

Update a specific associated vertex buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | defines which buffer to write to (positions, indices, normals, etc). Possible `kind` values : - VertexBuffer.PositionKind - VertexBuffer.UVKind - VertexBuffer.UV2Kind - VertexBuffer.UV3Kind - VertexBuffer.UV4Kind - VertexBuffer.UV5Kind - VertexBuffer.UV6Kind - VertexBuffer.ColorKind - VertexBuffer.MatricesIndicesKind - VertexBuffer.MatricesIndicesExtraKind - VertexBuffer.MatricesWeightsKind - VertexBuffer.MatricesWeightsExtraKind |
| `data` | `FloatArray` | defines the data source |
| `updateExtends?` | `boolean` | defines if extends info of the mesh must be updated (can be null). This is mostly useful for "position" kind |
| `makeItUnique?` | `boolean` | defines if the geometry associated with the mesh must be cloned to make the change only for this mesh (and not all meshes associated with the same geometry) |

#### Returns

`AbstractMesh`

the current mesh

#### Inherited from

Mesh.updateVerticesData

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:728

___

### validateSkinning

▸ **validateSkinning**(): `Object`

ValidateSkinning is used to determine that a mesh has valid skinning data along with skin metrics, if missing weights,
or not normalized it is returned as invalid mesh the string can be used for console logs, or on screen messages to let
the user know there was an issue with importing the mesh

#### Returns

`Object`

a validation object with skinned, valid and report string

| Name | Type |
| :------ | :------ |
| `report` | `string` |
| `skinned` | `boolean` |
| `valid` | `boolean` |

#### Inherited from

Mesh.validateSkinning

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:882

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

Mesh.AddNodeConstructor

#### Defined in

node_modules/@babylonjs/core/node.d.ts:35

___

### Center

▸ **Center**(`meshesOrMinMaxVector`): `Vector3`

Returns the center of the `{min:` Vector3`, max:` Vector3`}` or the center of MinMax vector3 computed from a mesh array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meshesOrMinMaxVector` | `AbstractMesh`[] \| \{ `max`: `Vector3` ; `min`: `Vector3`  } | could be an array of meshes or a `{min:` Vector3`, max:` Vector3`}` object |

#### Returns

`Vector3`

a vector3

#### Inherited from

Mesh.Center

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1120

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

Mesh.Construct

#### Defined in

node_modules/@babylonjs/core/node.d.ts:44

___

### CreateBox

▸ **CreateBox**(`name`, `size`, `scene`, `updatable?`, `sideOrientation?`): `Mesh`

Creates a box mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `size` | `number` | sets the size (float) of each box side (default 1) |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateBox

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1204

___

### CreateCapsule

▸ **CreateCapsule**(`name`, `options`, `scene`): `Mesh`

Creates a Capsule Mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh. |
| `options` | `ICreateCapsuleOptions` | the constructors options used to shape the mesh. |
| `scene` | `Scene` | defines the scene the mesh is scoped to. |

#### Returns

`Mesh`

the capsule mesh

**`See`**

https://doc.babylonjs.com/how_to/capsule_shape

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateCapsule

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1550

___

### CreateCylinder

▸ **CreateCylinder**(`name`, `height`, `diameterTop`, `diameterBottom`, `tessellation`, `subdivisions`, `scene?`, `updatable?`, `sideOrientation?`): `Mesh`

Creates a cylinder or a cone mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `height` | `number` | sets the height size (float) of the cylinder/cone (float, default 2) |
| `diameterTop` | `number` | set the top cap diameter (floats, default 1) |
| `diameterBottom` | `number` | set the bottom cap diameter (floats, default 1). This value can't be zero |
| `tessellation` | `number` | sets the number of cylinder sides (positive integer, default 24). Set it to 3 to get a prism for instance |
| `subdivisions` | `any` | sets the number of rings along the cylinder height (positive integer, default 1) |
| `scene?` | `Scene` | defines the hosting scene |
| `updatable?` | `any` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateCylinder

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1241

___

### CreateDashedLines

▸ **CreateDashedLines**(`name`, `points`, `dashSize`, `gapSize`, `dashNb`, `scene`, `updatable?`, `instance?`): `LinesMesh`

Creates a dashed line mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `points` | `Vector3`[] | is an array successive Vector3 |
| `dashSize` | `number` | is the size of the dashes relatively the dash number (positive float, default 3) |
| `gapSize` | `number` | is the size of the gap between two successive dashes relatively the dash number (positive float, default 1) |
| `dashNb` | `number` | is the intended total number of dashes (positive integer, default 200) |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `instance?` | `LinesMesh` | is an instance of an existing LineMesh object to be updated with the passed `points` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#lines-and-dashedlines) |

#### Returns

`LinesMesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateDashedLines

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1295

___

### CreateDecal

▸ **CreateDecal**(`name`, `sourceMesh`, `position`, `normal`, `size`, `angle`): `Mesh`

Creates a decal mesh.
.
A decal is a mesh usually applied as a model onto the surface of another mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh |
| `sourceMesh` | `AbstractMesh` | defines the mesh receiving the decal |
| `position` | `Vector3` | sets the position of the decal in world coordinates |
| `normal` | `Vector3` | sets the normal of the mesh where the decal is applied onto in world coordinates |
| `size` | `Vector3` | sets the decal scaling |
| `angle` | `number` | sets the angle to rotate the decal |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateDecal

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1541

___

### CreateDisc

▸ **CreateDisc**(`name`, `radius`, `tessellation`, `scene`, `updatable?`, `sideOrientation?`): `Mesh`

Creates a plane polygonal mesh.  By default, this is a disc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `radius` | `number` | sets the radius size (float) of the polygon (default 0.5) |
| `tessellation` | `number` | sets the number of polygon sides (positive integer, default 64). So a tessellation valued to 3 will build a triangle, to 4 a square, etc |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateDisc

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1193

___

### CreateGround

▸ **CreateGround**(`name`, `width`, `height`, `subdivisions`, `scene?`, `updatable?`): `Mesh`

Creates a ground mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `width` | `number` | set the width of the ground |
| `height` | `number` | set the height of the ground |
| `subdivisions` | `number` | sets the number of subdivisions per side |
| `scene?` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateGround

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1411

___

### CreateGroundFromHeightMap

▸ **CreateGroundFromHeightMap**(`name`, `url`, `width`, `height`, `subdivisions`, `minHeight`, `maxHeight`, `scene`, `updatable?`, `onReady?`, `alphaFilter?`): `GroundMesh`

Creates a ground mesh from a height map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `url` | `string` | sets the URL of the height map image resource |
| `width` | `number` | set the ground width size |
| `height` | `number` | set the ground height size |
| `subdivisions` | `number` | sets the number of subdivision per side |
| `minHeight` | `number` | is the minimum altitude on the ground |
| `maxHeight` | `number` | is the maximum altitude on the ground |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `onReady?` | (`mesh`: `GroundMesh`) => `void` | is a callback function that will be called once the mesh is built (the height map download can last some time) |
| `alphaFilter?` | `number` | will filter any data where the alpha channel is below this value, defaults 0 (all data visible) |

#### Returns

`GroundMesh`

a new Mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/height_map

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateGroundFromHeightMap

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1450

___

### CreateHemisphere

▸ **CreateHemisphere**(`name`, `segments`, `diameter`, `scene?`): `Mesh`

Creates a hemisphere mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `segments` | `number` | sets the sphere number of horizontal stripes (positive integer, default 32) |
| `diameter` | `number` | sets the diameter size (float) of the sphere (default 1) |
| `scene?` | `Scene` | defines the hosting scene |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateHemisphere

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1226

___

### CreateIcoSphere

▸ **CreateIcoSphere**(`name`, `options`, `scene`): `Mesh`

Creates a sphere based upon an icosahedron with 20 triangular faces which can be subdivided
* The parameter `radius` sets the radius size (float) of the icosphere (default 1)
* You can set some different icosphere dimensions, for instance to build an ellipsoid, by using the parameters `radiusX`, `radiusY` and `radiusZ` (all by default have the same value than `radius`)
* The parameter `subdivisions` sets the number of subdivisions (positive integer, default 4). The more subdivisions, the more faces on the icosphere whatever its size
* The parameter `flat` (boolean, default true) gives each side its own normals. Set it to false to get a smooth continuous light reflection on the surface
* You can also set the mesh side orientation with the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
* If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
* The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh |
| `options` | `Object` | defines the options used to create the mesh |
| `options.flat?` | `boolean` | - |
| `options.radius?` | `number` | - |
| `options.sideOrientation?` | `number` | - |
| `options.subdivisions?` | `number` | - |
| `options.updatable?` | `boolean` | - |
| `scene` | `Scene` | defines the hosting scene |

#### Returns

`Mesh`

a new Mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/polyhedra#icosphere

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateIcoSphere

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1521

___

### CreateLathe

▸ **CreateLathe**(`name`, `shape`, `radius`, `tessellation`, `scene`, `updatable?`, `sideOrientation?`): `Mesh`

Creates lathe mesh.
The lathe is a shape with a symmetry axis : a 2D model shape is rotated around this axis to design the lathe.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `shape` | `Vector3`[] | is a required array of successive Vector3. This array depicts the shape to be rotated in its local space : the shape must be designed in the xOy plane and will be rotated around the Y axis. It's usually a 2D shape, so the Vector3 z coordinates are often set to zero |
| `radius` | `number` | is the radius value of the lathe |
| `tessellation` | `number` | is the side number of the lathe. |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateLathe

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1388

___

### CreateLines

▸ **CreateLines**(`name`, `points`, `scene`, `updatable`, `instance?`): `LinesMesh`

Creates a line mesh..

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `points` | `Vector3`[] | is an array successive Vector3 |
| `scene` | `Scene` | defines the hosting scene |
| `updatable` | `boolean` | defines if the mesh must be flagged as updatable |
| `instance?` | `LinesMesh` | is an instance of an existing LineMesh object to be updated with the passed `points` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#lines-and-dashedlines). |

#### Returns

`LinesMesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateLines

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1281

___

### CreatePlane

▸ **CreatePlane**(`name`, `size`, `scene`, `updatable?`, `sideOrientation?`): `Mesh`

Creates a plane mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `size` | `number` | sets the size (float) of both sides of the plane at once (default 1) |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreatePlane

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1399

___

### CreatePolygon

▸ **CreatePolygon**(`name`, `shape`, `scene`, `holes?`, `updatable?`, `sideOrientation?`, `earcutInjection?`): `Mesh`

Creates a polygon mesh.Please consider using the same method from the MeshBuilder class instead
The polygon's shape will depend on the input parameters and is constructed parallel to a ground mesh.
The parameter `shape` is a required array of successive Vector3 representing the corners of the polygon in th XoZ plane, that is y = 0 for all vectors.
You can set the mesh side orientation with the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created.
Remember you can only change the shape positions, not their number when updating a polygon.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `shape` | `Vector3`[] | is a required array of successive Vector3 representing the corners of the polygon in th XoZ plane, that is y = 0 for all vectors |
| `scene` | `Scene` | defines the hosting scene |
| `holes?` | `Vector3`[][] | is a required array of arrays of successive Vector3 used to defines holes in the polygon |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |
| `earcutInjection?` | `any` | can be used to inject your own earcut reference |

#### Returns

`Mesh`

a new Mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#non-regular-polygon

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreatePolygon

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1314

___

### CreatePolyhedron

▸ **CreatePolyhedron**(`name`, `options`, `scene`): `Mesh`

Creates a polyhedron mesh.
.
* The parameter `type` (positive integer, max 14, default 0) sets the polyhedron type to build among the 15 embedded types. Please refer to the type sheet in the tutorial to choose the wanted type
* The parameter `size` (positive float, default 1) sets the polygon size
* You can overwrite the `size` on each dimension bu using the parameters `sizeX`, `sizeY` or `sizeZ` (positive floats, default to `size` value)
* You can build other polyhedron types than the 15 embbeded ones by setting the parameter `custom` (`polyhedronObject`, default null). If you set the parameter `custom`, this overwrittes the parameter `type`
* A `polyhedronObject` is a formatted javascript object. You'll find a full file with pre-set polyhedra here : https://github.com/BabylonJS/Extensions/tree/master/Polyhedron
* You can set the color and the UV of each side of the polyhedron with the parameters `faceColors` (Color4, default `(1, 1, 1, 1)`) and faceUV (Vector4, default `(0, 0, 1, 1)`)
* To understand how to set `faceUV` or `faceColors`, please read this by considering the right number of faces of your polyhedron, instead of only 6 for the box : https://doc.babylonjs.com/features/featuresDeepDive/materials/using/texturePerBoxFace
* The parameter `flat` (boolean, default true). If set to false, it gives the polyhedron a single global face, so less vertices and shared normals. In this case, `faceColors` and `faceUV` are ignored
* You can also set the mesh side orientation with the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
* If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
* The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `options` | `Object` | defines the options used to create the mesh |
| `options.custom?` | `any` | - |
| `options.faceColors?` | `Color4`[] | - |
| `options.faceUV?` | `Vector4`[] | - |
| `options.sideOrientation?` | `number` | - |
| `options.size?` | `number` | - |
| `options.sizeX?` | `number` | - |
| `options.sizeY?` | `number` | - |
| `options.sizeZ?` | `number` | - |
| `options.type?` | `number` | - |
| `options.updatable?` | `boolean` | - |
| `scene` | `Scene` | defines the hosting scene |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreatePolyhedron

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1493

___

### CreateRibbon

▸ **CreateRibbon**(`name`, `pathArray`, `closeArray`, `closePath`, `offset`, `scene?`, `updatable?`, `sideOrientation?`, `instance?`): `Mesh`

Creates a ribbon mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `pathArray` | `Vector3`[][] | is a required array of paths, what are each an array of successive Vector3. The pathArray parameter depicts the ribbon geometry. |
| `closeArray` | `boolean` | creates a seam between the first and the last paths of the path array (default is false) |
| `closePath` | `boolean` | creates a seam between the first and the last points of each path of the path array |
| `offset` | `number` | is taken in account only if the `pathArray` is containing a single path |
| `scene?` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |
| `instance?` | `Mesh` | defines an instance of an existing Ribbon object to be updated with the passed `pathArray` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#ribbon) |

#### Returns

`Mesh`

a new Mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateRibbon

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1181

___

### CreateSphere

▸ **CreateSphere**(`name`, `segments`, `diameter`, `scene?`, `updatable?`, `sideOrientation?`): `Mesh`

Creates a sphere mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `segments` | `number` | sets the sphere number of horizontal stripes (positive integer, default 32) |
| `diameter` | `number` | sets the diameter size (float) of the sphere (default 1) |
| `scene?` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateSphere

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1216

___

### CreateTiledGround

▸ **CreateTiledGround**(`name`, `xmin`, `zmin`, `xmax`, `zmax`, `subdivisions`, `precision`, `scene`, `updatable?`): `Mesh`

Creates a tiled ground mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `xmin` | `number` | set the ground minimum X coordinate |
| `zmin` | `number` | set the ground minimum Y coordinate |
| `xmax` | `number` | set the ground maximum X coordinate |
| `zmax` | `number` | set the ground maximum Z coordinate |
| `subdivisions` | `Object` | is an object `{w: positive integer, h: positive integer}` (default `{w: 6, h: 6}`). `w` and `h` are the numbers of subdivisions on the ground width and height. Each subdivision is called a tile |
| `subdivisions.h` | `number` | - |
| `subdivisions.w` | `number` | - |
| `precision` | `Object` | is an object `{w: positive integer, h: positive integer}` (default `{w: 2, h: 2}`). `w` and `h` are the numbers of subdivisions on the ground width and height of each tile |
| `precision.h` | `number` | - |
| `precision.w` | `number` | - |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateTiledGround

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1426

___

### CreateTorus

▸ **CreateTorus**(`name`, `diameter`, `thickness`, `tessellation`, `scene?`, `updatable?`, `sideOrientation?`): `Mesh`

Creates a torus mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `diameter` | `number` | sets the diameter size (float) of the torus (default 1) |
| `thickness` | `number` | sets the diameter size of the tube of the torus (float, default 0.5) |
| `tessellation` | `number` | sets the number of torus sides (positive integer, default 16) |
| `scene?` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateTorus

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1254

___

### CreateTorusKnot

▸ **CreateTorusKnot**(`name`, `radius`, `tube`, `radialSegments`, `tubularSegments`, `p`, `q`, `scene?`, `updatable?`, `sideOrientation?`): `Mesh`

Creates a torus knot mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `radius` | `number` | sets the global radius size (float) of the torus knot (default 2) |
| `tube` | `number` | sets the diameter size of the tube of the torus (float, default 0.5) |
| `radialSegments` | `number` | sets the number of sides on each tube segments (positive integer, default 32) |
| `tubularSegments` | `number` | sets the number of tubes to decompose the knot into (positive integer, default 32) |
| `p` | `number` | the number of windings on X axis (positive integers, default 2) |
| `q` | `number` | the number of windings on Y axis (positive integers, default 3) |
| `scene?` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |

#### Returns

`Mesh`

a new Mesh

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateTorusKnot

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1270

___

### CreateTube

▸ **CreateTube**(`name`, `path`, `radius`, `tessellation`, `radiusFunction`, `cap`, `scene`, `updatable?`, `sideOrientation?`, `instance?`): `Mesh`

Creates a tube mesh.
The tube is a parametric shape.
It has no predefined shape. Its final shape will depend on the input parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `path` | `Vector3`[] | is a required array of successive Vector3. It is the curve used as the axis of the tube |
| `radius` | `number` | sets the tube radius size |
| `tessellation` | `number` | is the number of sides on the tubular surface |
| `radiusFunction` | (`i`: `number`, `distance`: `number`) => `number` | is a custom function. If it is not null, it overrides the parameter `radius`. This function is called on each point of the tube path and is passed the index `i` of the i-th point and the distance of this point from the first point of the path |
| `cap` | `number` | sets the way the extruded shape is capped. Possible values : Mesh.NO_CAP (default), Mesh.CAP_START, Mesh.CAP_END, Mesh.CAP_ALL |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |
| `instance?` | `Mesh` | is an instance of an existing Tube object to be updated with the passed `pathArray` parameter (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#tube) |

#### Returns

`Mesh`

a new Mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.CreateTube

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1470

___

### ExtendToGoldberg

▸ **ExtendToGoldberg**(`mesh`): `Mesh`

Extends a mesh to a Goldberg mesh
Warning  the mesh to convert MUST be an import of a perviously exported Goldberg mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | `Mesh` | the mesh to convert |

#### Returns

`Mesh`

the extended mesh

**`Deprecated`**

Please use ExtendMeshToGoldberg instead

#### Inherited from

Mesh.ExtendToGoldberg

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1558

___

### ExtrudePolygon

▸ **ExtrudePolygon**(`name`, `shape`, `depth`, `scene`, `holes?`, `updatable?`, `sideOrientation?`, `earcutInjection?`): `Mesh`

Creates an extruded polygon mesh, with depth in the Y direction..

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `shape` | `Vector3`[] | is a required array of successive Vector3 representing the corners of the polygon in th XoZ plane, that is y = 0 for all vectors |
| `depth` | `number` | defines the height of extrusion |
| `scene` | `Scene` | defines the hosting scene |
| `holes?` | `Vector3`[][] | is a required array of arrays of successive Vector3 used to defines holes in the polygon |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |
| `earcutInjection?` | `any` | can be used to inject your own earcut reference |

#### Returns

`Mesh`

a new Mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#extruded-non-regular-polygon

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.ExtrudePolygon

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1329

___

### ExtrudeShape

▸ **ExtrudeShape**(`name`, `shape`, `path`, `scale`, `rotation`, `cap`, `scene`, `updatable?`, `sideOrientation?`, `instance?`): `Mesh`

Creates an extruded shape mesh.
The extrusion is a parametric shape. It has no predefined shape. Its final shape will depend on the input parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `shape` | `Vector3`[] | is a required array of successive Vector3. This array depicts the shape to be extruded in its local space : the shape must be designed in the xOy plane and will be extruded along the Z axis |
| `path` | `Vector3`[] | is a required array of successive Vector3. This is the axis curve the shape is extruded along |
| `scale` | `number` | is the value to scale the shape |
| `rotation` | `number` | is the angle value to rotate the shape each step (each path point), from the former step (so rotation added each step) along the curve |
| `cap` | `number` | sets the way the extruded shape is capped. Possible values : Mesh.NO_CAP (default), Mesh.CAP_START, Mesh.CAP_END, Mesh.CAP_ALL |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |
| `instance?` | `Mesh` | is an instance of an existing ExtrudedShape object to be updated with the passed `shape`, `path`, `scale` or `rotation` parameters (https://doc.babylonjs.com/how_to/How_to_dynamically_morph_a_mesh#extruded-shape) |

#### Returns

`Mesh`

a new Mesh

**`See`**

 - https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param
 - https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#extruded-shapes

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.ExtrudeShape

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1348

___

### ExtrudeShapeCustom

▸ **ExtrudeShapeCustom**(`name`, `shape`, `path`, `scaleFunction`, `rotationFunction`, `ribbonCloseArray`, `ribbonClosePath`, `cap`, `scene`, `updatable?`, `sideOrientation?`, `instance?`): `Mesh`

Creates an custom extruded shape mesh.
The custom extrusion is a parametric shape.
It has no predefined shape. Its final shape will depend on the input parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | defines the name of the mesh to create |
| `shape` | `Vector3`[] | is a required array of successive Vector3. This array depicts the shape to be extruded in its local space : the shape must be designed in the xOy plane and will be extruded along the Z axis |
| `path` | `Vector3`[] | is a required array of successive Vector3. This is the axis curve the shape is extruded along |
| `scaleFunction` | (`i`: `number`, `distance`: `number`) => `number` | is a custom Javascript function called on each path point |
| `rotationFunction` | (`i`: `number`, `distance`: `number`) => `number` | is a custom Javascript function called on each path point |
| `ribbonCloseArray` | `boolean` | forces the extrusion underlying ribbon to close all the paths in its `pathArray` |
| `ribbonClosePath` | `boolean` | forces the extrusion underlying ribbon to close its `pathArray` |
| `cap` | `number` | sets the way the extruded shape is capped. Possible values : Mesh.NO_CAP (default), Mesh.CAP_START, Mesh.CAP_END, Mesh.CAP_ALL |
| `scene` | `Scene` | defines the hosting scene |
| `updatable?` | `boolean` | defines if the mesh must be flagged as updatable |
| `sideOrientation?` | `number` | defines the mesh side orientation (https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation) |
| `instance?` | `Mesh` | is an instance of an existing ExtrudedShape object to be updated with the passed `shape`, `path`, `scale` or `rotation` parameters (https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#extruded-shape) |

#### Returns

`Mesh`

a new Mesh

**`See`**

https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#extruded-shapes

**`Deprecated`**

Please use MeshBuilder instead

#### Inherited from

Mesh.ExtrudeShapeCustom

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1370

___

### MergeMeshes

▸ **MergeMeshes**(`meshes`, `disposeSource?`, `allow32BitsIndices?`, `meshSubclass?`, `subdivideWithSubMeshes?`, `multiMultiMaterials?`): `Mesh`

Merge the array of meshes into a single mesh for performance reasons.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meshes` | `Mesh`[] | array of meshes with the vertices to merge. Entries cannot be empty meshes. |
| `disposeSource?` | `boolean` | when true (default), dispose of the vertices from the source meshes. |
| `allow32BitsIndices?` | `boolean` | when the sum of the vertices > 64k, this must be set to true. |
| `meshSubclass?` | `Mesh` | (optional) can be set to a Mesh where the merged vertices will be inserted. |
| `subdivideWithSubMeshes?` | `boolean` | when true (false default), subdivide mesh into subMeshes. |
| `multiMultiMaterials?` | `boolean` | when true (false default), subdivide mesh into subMeshes with multiple materials, ignores subdivideWithSubMeshes. |

#### Returns

`Mesh`

a new mesh

#### Inherited from

Mesh.MergeMeshes

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1134

___

### MergeMeshesAsync

▸ **MergeMeshesAsync**(`meshes`, `disposeSource?`, `allow32BitsIndices?`, `meshSubclass?`, `subdivideWithSubMeshes?`, `multiMultiMaterials?`): `Promise`\<`any`\>

Merge the array of meshes into a single mesh for performance reasons.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meshes` | `Mesh`[] | array of meshes with the vertices to merge. Entries cannot be empty meshes. |
| `disposeSource?` | `boolean` | when true (default), dispose of the vertices from the source meshes. |
| `allow32BitsIndices?` | `boolean` | when the sum of the vertices > 64k, this must be set to true. |
| `meshSubclass?` | `Mesh` | (optional) can be set to a Mesh where the merged vertices will be inserted. |
| `subdivideWithSubMeshes?` | `boolean` | when true (false default), subdivide mesh into subMeshes. |
| `multiMultiMaterials?` | `boolean` | when true (false default), subdivide mesh into subMeshes with multiple materials, ignores subdivideWithSubMeshes. |

#### Returns

`Promise`\<`any`\>

a new mesh

#### Inherited from

Mesh.MergeMeshesAsync

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1145

___

### MinMax

▸ **MinMax**(`meshes`): `Object`

Returns an object containing a min and max Vector3 which are the minimum and maximum vectors of each mesh bounding box from the passed array, in the world coordinates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meshes` | `AbstractMesh`[] | defines the list of meshes to scan |

#### Returns

`Object`

an object `{min:` Vector3`, max:` Vector3`}`

| Name | Type |
| :------ | :------ |
| `max` | `Vector3` |
| `min` | `Vector3` |

#### Inherited from

Mesh.MinMax

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1111

___

### Parse

▸ **Parse**(`parsedMesh`, `scene`, `rootUrl`): `Mesh`

Returns a new Mesh object parsed from the source provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parsedMesh` | `any` | is the source |
| `scene` | `Scene` | defines the hosting scene |
| `rootUrl` | `string` | is the root URL to prefix the `delayLoadingFile` property with |

#### Returns

`Mesh`

a new Mesh

#### Inherited from

Mesh.Parse

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1089

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

Mesh.ParseAnimationRanges

#### Defined in

node_modules/@babylonjs/core/node.d.ts:410

___

### \_GetDefaultSideOrientation

▸ **_GetDefaultSideOrientation**(`orientation?`): `number`

Gets the default side orientation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orientation?` | `number` | the orientation to value to attempt to get |

#### Returns

`number`

the default orientation

#### Inherited from

Mesh.\_GetDefaultSideOrientation

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:253

___

### \_PhysicsImpostorParser

▸ **_PhysicsImpostorParser**(`scene`, `physicObject`, `jsonObject`): `PhysicsImpostor`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |
| `physicObject` | `IPhysicsEnabledObject` |
| `jsonObject` | `any` |

#### Returns

`PhysicsImpostor`

#### Inherited from

Mesh.\_PhysicsImpostorParser

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1028

___

### \_instancedMeshFactory

▸ **_instancedMeshFactory**(`name`, `mesh`): `InstancedMesh`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `mesh` | `Mesh` |

#### Returns

`InstancedMesh`

#### Inherited from

Mesh.\_instancedMeshFactory

#### Defined in

node_modules/@babylonjs/core/Meshes/mesh.d.ts:1024
