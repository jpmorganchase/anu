<script setup>
  // import multiView from "../../vue_components/multiView.vue"
  //import inlineView from "../vue_components/inlineView.vue"
  import { meshBench } from  "../../anu-examples/bench_mesh.js"
  import { instanceBench } from "../../anu-examples/bench_instance.js"
  import { thinInstanceBench } from "../../anu-examples/bench_thinInstance.js"
</script>


# Meshes Clones and (Thin)Instance
Babylon supports several methods of rendering meshes each with there advantages and disadvantages. Anu's scene graph apis currently support creating [Meshes](https://doc.babylonjs.com/features/featuresDeepDive/mesh/), [Clones](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/clones/), [Instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances/), and [ThinInstance](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/thinInstances/). Since each of these methods works slight differently not all of anu's operators will work with each one. This page will dive deeper into these methods, when to use them, and how to use them in anu. 

:::tip

The performance of the examples bellow are influenced by each other since they are running on the same page. Remember to reset the sliders to reduce this effect. 

:::

## Mesh
The standard method for mesh rendering through [create](/api/modules.html#create) or [bind](/api/modules.html#bind) is to call Babylon's MeshBuilder methods generating a new mesh for each call. In this approach each mesh with be created with new geometry and its own draw call. While this gives us the most control and flexibility over how we create and change meshes, it is also the most resource intensive. In typical usage using this method will start to slow down scenes after around 2000 draw calls. 

<singleView :scene="meshBench" />

::: details Source
::: code-group
<<< @/./anu-examples/bench_mesh.js 
:::


## Clone

Coming Soon

## Instance
If we are drawing many meshes with the same geometry, we can use [Instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances/) to render them all in a single draw call leading to much better performance. [InstancedMeshes](https://doc.babylonjs.com/typedoc/classes/BABYLON.InstancedMesh) will still have their own nodes in the scene graph and can each have unique properties such as names, metadata, and transforms. However, since they all share the same mesh geometry, and materials we need to use instanced buffers to set their other properties such as color. 

Using anu we can create [InstancedMeshes](https://doc.babylonjs.com/typedoc/classes/BABYLON.InstancedMesh) using the [bindInstance](/api/modules.html#bindthininstance) method. Unlike the bind method that takes a string, bindInstance takes an existing mesh to use as the source mesh for the instances. 

```js
anu.bindInstance(mesh: Mesh, data: [], scene: Scene)
```

To register or set instanced buffers we can use [setInstanceBuffer](/api/classes/Selection.html#setinstancedbuffer) and [registerInstanceBuffer](/api/classes/Selection.html#registerinstancedbuffer) Selection methods.


```js

//Create a sphere to be used in our instance and register a color buffer
let rootSphere = anu.create('sphere', 'mySphere', {diameter: 0.003});
rootSphere.isVisible = false;
rootSphere.registerInstancedBuffer("color", 4);
rootSphere.instancedBuffers.color = new Color4(1,1,1,1);

let spheres =  anu.bindInstance(rootSphere, data)
  .setInstancedBuffer("color", (d) => new Color4(0,0,0,1));
```

<singleView :scene="instanceBench" />
::: details Source
::: code-group
<<< @/./anu-examples/bench_instance.js 
:::


## Thin Instance

[ThinInstances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/thinInstances/) are often the most performant way of drawing many identical meshes at once however come with the most restrictions in how you manipulate those meshes. 
With thin instance we are essential writing directly to the GPU buffer which allows us to draw potentially millions of meshes in a single draw call. However, these meshes will not be represented in the scene graph and instead will be all represented under a single mesh, the root mesh of the thin instance. Additionally when we want to modify a mesh in the thin instance, we need to rewrite the entire matrix buffer to do so. 

To support thin instance, anu provides the [bindThinInstance()](/api/classes/Selection.html#bindthininstance) method as well as several special thinInstanceOperators to make modifying the thin instance more connivent. 

```js
bindThinInstance(mesh: Mesh, data: [], scene: Scene)
```

| Function                                                                                     | Parameters                                                                                                           |
|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| thinInstanceAttributeAt(attribute, index, value): Selection                                  | `attribute`: string, `index`: number, `value`: any                                                                   |
| thinInstanceColor(value, staticBuffer?): Selection                                            | `value`: Color4 \| (d: any, n: Node, i: number) => Color4, `staticBuffer`: boolean (default: false)                  |
| thinInstanceColorAt(index, value): Selection                                                  | `index`: number, `value`: Color4 \| (d: any, n: Node, i: number) => Color4                                           |
| thinInstanceColorFor(method, value): Selection                                                | `method`: (d: any, n: Node, i: number) => boolean, `value`: Color4 \| (d: any, n: Node, i: number) => Color4         |
| thinInstanceMatrixAt(index, value): Selection                                                 | `index`: number, `value`: Matrix \| (d: any, n: Node, i: number) => Matrix                                           |
| thinInstanceMatrixFor(method, value): Selection                                               | `method`: (d: any, n: Node, i: number) => boolean, `value`: Matrix \| (d: any, n: Node, i: number) => Matrix         |
| thinInstancePosition(value, staticBuffer?): Selection                                         | `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3, `staticBuffer`: boolean (default: false)                |
| thinInstancePositionAt(index, value): Selection                                               | `index`: number, `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3                                         |
| thinInstancePositionFor(method, value): Selection                                             | `method`: (d: any, n: Node, i: number) => boolean, `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3       |
| thinInstanceRegisterAttribute(attribute, stride): Selection                                   | `attribute`: string, `stride`: number                                                                                |
| thinInstanceRotation(value, staticBuffer?): Selection                                         | `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3, `staticBuffer`: boolean (default: false)                |
| thinInstanceRotationAt(index, value): Selection                                               | `index`: number, `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3                                         |
| thinInstanceRotationFor(method, value): Selection                                             | `method`: (d: any, n: Node, i: number) => boolean, `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3       |
| thinInstanceScaling(value, staticBuffer?): Selection                                          | `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3, `staticBuffer`: boolean (default: false)                |
| thinInstanceScalingAt(index, value): Selection                                                | `index`: number, `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3                                         |
| thinInstanceScalingFor(method, value): Selection                                              | `method`: (d: any, n: Node, i: number) => boolean, `value`: Vector3 \| (d: any, n: Node, i: number) => Vector3       |
| thinInstanceSetAttribute(attribute, value): Selection                                         | `attribute`: string, `value`: any                                                                                    |
| thinInstanceSetBuffer(attribute, value, stride?, staticBuffer?): Selection                    | `attribute`: string, `value`: Float32Array \| (d: any, n: Node, i: number) => Float32Array, `stride?`: number, `staticBuffer`: boolean (default: false) |

<singleView :scene="thinInstanceBench" />

::: details Source
::: code-group
<<< @/./anu-examples/bench_thinInstance.js 
:::


