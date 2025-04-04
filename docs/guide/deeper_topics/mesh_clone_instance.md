<script setup>
  import { meshBench } from  "../../anu-examples/bench_mesh.js"
  import { instanceBench } from "../../anu-examples/bench_instance.js"
  import { thinInstanceBench } from "../../anu-examples/bench_thinInstance.js"
  import { cloneBench } from "../../anu-examples/bench_clone.js"
</script>


# Mesh, Clones, and (Thin) Instances
Babylon.js supports several ways to render meshes, each with their advantages and disadvantages. Anu's scene graph APIs currently support creating [Meshes](https://doc.babylonjs.com/features/featuresDeepDive/mesh/), [Clones](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/clones/), [Instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances/), and [Thin Instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/thinInstances/). Since each of these work slightly differently from each other, not all of the methods in Anu's [Selection](../../api/classes/Selection.md) class will work with all of them. This page will dive deeper into these four approaches, when to use them, and how to use them with Anu.

<div class="tip custom-block" style="padding-top: 8px">

This page contains several live examples meant to demonstrate the performance of each rendering approach. Since they all run on the same page, their performance will be influenced by each other. Remember to reset the sliders to mitigate this effect.

</div>

## Mesh
The standard method for Mesh rendering used internally by [create()](/api/modules.html#create) and [bind()](/api/modules.html#bind) is to call Babylon.js's [MeshBuilder methods](https://doc.babylonjs.com/typedoc/variables/BABYLON.MeshBuilder). In this approach, each Mesh with be created with its own geometry and draw call. While this gives us the most control and flexibility over how we create and manipulate Meshes, it is also the most resource intensive for both the CPU and GPU. In typical usage, this approach will start to slow down Babylon.js after around 2000 draw calls. 

<singleView :scene="meshBench" />

::: details Source
::: code-group
<<< @/./anu-examples/bench_mesh.js 
:::


## Clone
If we are drawing many Meshes with the same geometry but we still want them to be fully independent from each other, we can use Clones to reuse geometry and save a little bit of performance. We can do this with [bindClone()](/api/modules.html#bindclone), which accepts an existing Mesh whose geometry will be cloned.

```js
anu.bindClone(mesh: Mesh, data: [], scene: Scene)
```
<singleView :scene="cloneBench" />
::: details Source
::: code-group
<<< @/./anu-examples/bench_clone.js 
:::

## Instance
If we are still drawing many Meshes with the same geometry, but we don't mind sacrificing some flexibility for the sake of performance, we can use Instances. [InstancedMeshes](https://doc.babylonjs.com/typedoc/classes/BABYLON.InstancedMesh) all share geometry and are rendered in a single draw call, leading to much better GPU performance. They are also still represented as individual Nodes in the Babylon.js scene graph, and thus can still retain individual properties such as name, metadata, and transforms. However, setting properties such as color now need to use [InstancedBuffers](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances#custom-buffers) to be able to set unique values per each InstancedMesh.

Using Anu, the [bindInstance()](/api/modules.html#bindthininstance) method can be used to easily create InstancedMeshes from data, which also accepts an existing Mesh whose geometry will be instanced.

```js
anu.bindInstance(mesh: Mesh, data: [], scene: Scene)
```

To register or set InstancedBuffers we can use [registerInstancedBuffer()](/api/classes/Selection.html#registerinstancedbuffer) and [setInstancedBuffer()](/api/classes/Selection.html#setinstancedbuffer) from a Selection object.

```js

//Create a sphere to be used in our instance and register a color buffer
let rootSphere = anu.create('sphere', 'mySphere', {diameter: 0.003});
rootSphere.isVisible = false;
rootSphere.registerInstancedBuffer("color", 4);
rootSphere.instancedBuffers.color = new Color4(1,1,1,1);

let spheres =  anu.bindInstance(rootSphere, data)
                  .setInstancedBuffer("color", (d) => new Color4(0, 0, 0, 1));
```

<singleView :scene="instanceBench" />
::: details Source
::: code-group
<<< @/./anu-examples/bench_instance.js 
:::


## Thin Instance

[Thin Instances](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/thinInstances/) are often the most performant way of drawing many identical Meshes at once, but come with the most restrictions in how you manipulate those Meshes. With Thin Instances, we are essentially writing directly to the GPU buffer which allows us to draw upwards of millions of Meshes in a single draw call. However, these Meshes are not represented in the scene graph and instead are under a single Mesh: the root Mesh of the Thin Instance. Additionally, when we want to modify a Mesh in the Thin Instance, we need to rewrite the entire matrix buffer to do so.

To support Thin Instances, Anu provides the [bindThinInstance()](/api/classes/Selection.html#bindthininstance) method as well as several special Thin Instance specific methods to make modifying them more connivent. 

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


