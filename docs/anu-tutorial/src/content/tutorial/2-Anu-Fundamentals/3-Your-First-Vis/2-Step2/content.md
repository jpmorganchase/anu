---
type: lesson
title: Step 2 Scales and Transforms
---

# Scales and Transforms

Now that we have our meshes we need to move them into position. While we could directly map the data values to our sphere xyz positions, we likely don't want to do that. Instead we want to map the values of our data to values we want it to span in our scene. To achieve this we can use D3's scales such as [scaleLiner](https://d3js.org/d3-scale/linear#scaleLinear).

#### Step 1: Create our Linear Scales

Using D3 linear scales create three scales (x,y,z) that map the min and max values of our data fields to the min max coordinates in our scene we want them to take up. Lets use "Beak Length (mm)", "Flipper Length (mm)", and  "Beak Depth (mm)"". 

```js
//scaleLinear.domain([min,max] values of our data field).range([min,max] values of coordinate space to use in meters)
let scaleX = scaleLinear().domain([min,max]).range([-5,5])
```

:::tip
We can quickly grab the [min, max] list of all data values from a key like so 
```js 
extent([...penguins.map(item => item["Beak Length (mm)"])]) //returns [min,max] of the list
```
:::

The scaleLinear method returns a function that takes a number as an argument and will return a number interpolated from the min,max or or data to the min,max of our range. Now we can use this scales inside our Selection transform methods. 

#### Step 2: Position our Marks

Using our scale functions position our marks by passing anon functions to our wrapper transform methods (positionX/Y/Z).

```js
marks.positionX((d) => scaleX(d["Beak Length (mm)"]))
```

After repeating this for Y and Z by chaining those methods together, we should have all our sphere positioned according to their data between the coordinates of (-5,5) in all three axes. Note, we use -5-5 since the origin of our scene is the center of our screen space and not the upper left corner like it would be on a 2D canvas. 

#### Step 3: Scaling our Marks

As you should now see, our marks are positioned but many are overlapping. We can solve this by expanding our scales range or simply by scaling down our meshes. We can do this two ways, either set the diameter setting when we make our sphere meshes to 0.25, or use the scaling() method and passing a Vector3(x,y,z) scaling factor. 

But since we are making a 3D visualization lets leverage additional encoding channels and map scale to "Body Mass (g)"!

First create a new linear scale for body mass then use scaling() to assign it.

```js
let scaleSize = scaleLinear().domain(extent([...penguins.map(item => item["Body Mass (g)"])])).range([0.1, 0.5])

marks.bind('sphere', {segments: 16, diameter: (d) => scaleSize(d["Body Mass (g)"])}, penguins)

//or 

marks.scaling((d) => {
            let scaleFactor = scaleSize(d["Body Mass (g)"])
            return new Vector3(scaleFactor,scaleFactor,scaleFactor)
         })
```

Its starting to look more like a data vis now! But it is still missing some things, lets add color next!