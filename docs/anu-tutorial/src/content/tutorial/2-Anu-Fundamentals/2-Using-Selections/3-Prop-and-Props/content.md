---
type: lesson
title: Prop and Props
---

# Prop and Props

While anu supports wrapper methods for most of the mesh properties you will need to modify, there are hundreds a properties and sub-properties not to mention custom properties you can add to meshes. To support modifying these we can use the prop() and props() methods to specify a property path to be modified.

#### Step 1: Use prop()

Using prop() is simple. It works like the wrapper methods from before, except it expects one more arugment being the string of the property path you want to modify. If you are familiar with D3 prop() is essentially the attr() method.

Try using the prop() method to replace the wrapper methods in this lesson.

```js
// prop(path: String, value: any | (d,n,i)=> any): Selection

boxes.prop('position', 2).prop('rotation.x', (d) => d.goals);
```

#### Step 2: Use props()

Whenever we call a method from a selection, we will iterate over the whole list of selected nodes and apply the changes. To save a little performance we can modify multiple properties in one pass of the list instead using props().
to do this we will pass an object where the keys are the property paths and the values are our values or functions for those properties

Try replacing the multiple prop() methods with one props() method instead.

```js
// props({path: value | (d,n,i) => value})

boxes.props({ 'position': 2, 'rotation.x': (d) => goals });
```
