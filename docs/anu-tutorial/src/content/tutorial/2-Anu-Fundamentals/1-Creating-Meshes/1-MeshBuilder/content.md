---
type: lesson
title: Babylon MeshBuilder(s)
slug: /:partSlug/:chapterSlug/1-MeshBuilder.html/
---

# Babylon's MeshBuilder(s)

Data visualizations are essentially collections of abstract shapes and text composed in a logical layout used to represent data. To build data visualizations for 3D and immersive environments we need ways to create and render these shapes and layouts.
Thankfully, the Babylon 3d engine features 22+ mesh builder functions to help us create virtually any 2D or 3D shape we can imagine. 

In this lesson we will learn how to create meshes using Babylon's MeshBuilder methods and how to change their basic properties.

:::tip
<a href="https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/" target="_blank">MeshBuilder Documentation</a>

<a href="https://doc.babylonjs.com/typedoc/variables/BABYLON.MeshBuilder" target="_blank">List of Supported Meshes</a>

<a href="https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh" target="_blank">Mesh Class Properties</a>

<a href="https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/box/" target="_blank">CreateBox Documentation</a>
:::

#### Step 1: Create a box 'my-box' with a width of 2

Each meshBuilder methods take the following arguments: name, options, and scene.
Name is used to represent the mesh in the scene graph, options are used to build the geometry and can only be set when the mesh is created, and scene is used to specify the scene to draw the mesh in. 
While all of these parameters have defaults we likely want to set them ourselves. 

```js
Meshbuilder.CreateBox(name: String, options?: {}, scene?: Scene): Mesh
```

Once you've cerated the mesh you should now see it rendered in our scene and in the scene graph under 'nodes'


#### Step 2: Change the box properties

After we have rendered our mesh we can change several of its properties to move it around our scene (i.e. <a href="https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh#position" target="_blank">position</a>,
<a href="https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh#scaling" target="_blank">scale</a>,
<a href="https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh#rotation" target="_blank">rotation</a>,
<a href="https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh#material" target="_blank">material</a>).

```js
box.position = new Vector3(x,y,z);

box.scaling.y = number;

box.rotation.x = number; //radians

let material = new StandardMaterial('box-mat');
material.diffuseColor = Color3.Red();

box.material = material;
```







