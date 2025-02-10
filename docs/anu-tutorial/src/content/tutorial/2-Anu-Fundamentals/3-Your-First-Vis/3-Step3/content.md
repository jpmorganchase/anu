---
type: lesson
title: Step 3 Colors and Materials 
---

# Adding Color

Lets add color to encode the "Species" of penguin. 

#### Step 1: Setup our Color Scales

Lets start by setting up our color scale using D3s ordinal scales and Anus OrdinalChromatic() method to generate a list of materials. 

```js
//We can pass a list of hex codes, or a string to select one of the default options (see prefab docs for details)
let materials = anu.ordinalChromatic('d310').toStandardMaterial();

let colorScale = scaleOrdinal(materials)
```


#### Step 2: Assign our Materials

As we did before assign the materials to our nodes using the material() method call on the marks selection

```js
marks.material((d) => colorScale(d["Species"]))
```

You should be seeing some distinct looking clusters now! Next lets add some axes. 
