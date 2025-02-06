---
type: lesson
title: Materials and Colors
---

# Materials and Colors

In addition to manipulating transforms (scaling, position, rotation, etc), you will also likely want to change the colors of your meshes. 
In Babylon this is most commonly done using [materials](https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction/). 
Using anu Selections we can easily set and change the material and properties for our meshes. 

#### Step 1: Create and Set a Material

Lets start by creating a [standard material](https://doc.babylonjs.com/typedoc/classes/BABYLON.StandardMaterial), setting its diffuse color and using our selection to assign it to our meshes. 

```js
let material = new StandardMaterial('myMaterial'); 
material.diffuseColor = Color3.Red();

boxes.material(material);
```

Now our boxes should all be red, in the inspector you should see our material under the materials tree. 

#### Step 2: Change the material color with our selection. 

If we want to change the material's diffuse color we can do it directly on the selection with the diffuseColor() method. 
But if we want each of our boxes to have its own color it will also need to have its own material. Using functions we can create a new material on each mesh and then set its color after. 

```js
boxes.material((d,n,i) => new StandardMaterial(n.name + i))
     .diffuseColor((d,n,i) => Color3.Random())
```

Now each box has a unique material and color. However, if we have hunderesd of meshes and only need three colors using this method would be inefficient. What we want is one material per color we need, thankfully anu has a [color scale prefab](https://jpmorganchase.github.io/anu/guide/prefabs/chromatic.html) to help with this. 

#### Step 3: Using the Color Scale Prefab

Anu provides two color scale prefabs to help us create the materials we need for our meshes. 
Lets use one now to set the color of each mesh but only using the materials we need. 

```js
//returns list of colors or materials from scheme name or list of color hex codes
let material = anu.ordinalChromatic(["#0000FF", "#00FF00", "#880808"]).toStandardMaterial()
```

Onces we have this list we can use a interpellation function, for example from [d3 scaleOrdinal](https://d3js.org/d3-scale/ordinal) to assign colors to our meshes with a function. 

```js
let colorScale = scaleOrdinal(material)

boxes.material((d,n,i) => colorScale(d.group))
```

Now each box has one of the three colors we want based on their group. 



