# Text Example Updates for New TextRenderer API

## Changes Made to `text.js`

This document outlines the updates made to the text example to work with the refactored PlaneText that now uses the TextRenderer API.

### 1. Cleaned Up Imports
**Before:**
```javascript
import { VertexBuffer, HemisphericLight, Vector3, Scene, ArcRotateCamera, TransformNode, ActionManager, InterpolateValueAction, StandardMaterial, Color3, MeshBuilder, AbstractAudioBus} from '@babylonjs/core';
```

**After:**
```javascript
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, Color3 } from '@babylonjs/core';
```

**Reason:** Removed unused imports. PlaneText no longer uses mesh-specific features like VertexBuffer, StandardMaterial, etc.

### 2. Added Async Initialization Note
Added a comment explaining that PlaneText now initializes asynchronously:
```javascript
// Note: PlaneText now uses TextRenderer API which initializes asynchronously
// Text will appear shortly after creation (usually within a frame or two)
```

### 3. Improved Opacity Value
**Before:**
```javascript
text2.opacity = 0.1;
```

**After:**
```javascript
text2.opacity = 0.5; // Changed from 0.1 to 0.5 for better visibility
```

**Reason:** With the new TextRenderer, opacity of 0.1 was too transparent. 0.5 provides better visibility while still demonstrating the opacity feature.

### 4. Optimized Tween Updates
**Before:**
```javascript
if ((t * 1000) % 2 == 0) {
  n.updatePlaneText({ text: Math.random(), color: Color3.Random(), size: Math.random() * 10 });
  n.rotation = Vector3.Random();
}
```

**After:**
```javascript
// Update less frequently to reduce performance impact
if ((t * 1000) % 10 == 0) {
  n.updatePlaneText({ 
    text: Math.random().toFixed(3), 
    color: Color3.Random(), 
    size: Math.random() * 5 + 0.5  // Size between 0.5 and 5.5
  });
  n.rotation = Vector3.Random();
}
```

**Reasons:**
- Updates every 10ms instead of every 2ms (less frequent) to reduce performance overhead
- Text size clamped between 0.5 and 5.5 instead of 0-10 for more consistent appearance
- Random text formatted to 3 decimal places for readability

### 5. Increased Timeout for Child Text Update
**Before:**
```javascript
setTimeout(() => {
  childText.text = "I just moved!"
  childText.size = 2
}, 1000)
```

**After:**
```javascript
// Updates work as expected with the new API
setTimeout(() => {
  childText.text = "I just moved!"
  childText.size = 2
}, 1500) // Increased timeout to ensure text has initialized
```

**Reason:** Allows more time for async initialization to complete before updating.

### 6. Added Explanatory Comments
Added comments throughout to explain:
- That PlaneText uses default Babylon.js CDN fonts
- Each PlaneText instance manages its own TextRenderer
- PlaneText as TransformNode works well with parent-child hierarchies

## What Still Works

All the core functionality remains compatible:

✅ Creating text with `createPlaneText()`
✅ Updating text properties with setters (`text.text = "new"`, `text.color = Color3.Red()`)
✅ Batch updates with `updatePlaneText()`
✅ Data binding with `anu.bind('planeText', ...)`
✅ Text alignment (left, center, right)
✅ Vertical alignment (top, middle, bottom)
✅ Parent-child hierarchies
✅ Transitions and tweens
✅ Position, rotation, scaling

## What Changed

❗ PlaneText is now a `TransformNode` instead of `Mesh`
❗ Text initialization is asynchronous (but usually completes within one frame)
❗ No mesh properties available (vertices, materials, etc.)
❗ Uses Babylon.js CDN fonts by default instead of local assets

## Performance Notes

The new TextRenderer API:
- Is more efficient for rendering multiple text instances
- Uses modern MSDF text rendering
- May have slightly different performance characteristics
- Benefits from less frequent updates in animations

## Testing Recommendations

When running this example:
1. Verify all text appears correctly
2. Check that updates work smoothly
3. Confirm alignment options display properly
4. Test parent-child transformations
5. Monitor performance with many text instances
