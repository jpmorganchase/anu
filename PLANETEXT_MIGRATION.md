# PlaneText Migration to New TextRenderer API

## Overview
This document describes the major breaking changes made to the `PlaneText` class to use the new `TextRenderer` API from `@babylonjs/addons` instead of the deprecated `babylon-msdf-text` package.

## Major Changes

### 1. Class Hierarchy Change
**Before:** `PlaneText extends Mesh`
**After:** `PlaneText extends TransformNode`

**Impact:** PlaneText is no longer a mesh object. It's now a transform node that manages a TextRenderer instance.

**Breaking Change:** Any code that treats PlaneText as a Mesh (accessing mesh properties like `material`, `vertices`, `geometry`, etc.) will break.

### 2. Rendering Architecture
**Before:** Created a mesh with vertices and materials using `createTextMesh` from `babylon-msdf-text`
**After:** Uses `TextRenderer` which renders text using custom shaders and buffers

**Impact:** 
- Text is now rendered directly by the TextRenderer system
- No mesh geometry is created
- Cannot access mesh properties like vertices, indices, materials, etc.

### 3. API Changes

#### Constructor
- Now uses async initialization internally
- `FontAsset` is created from font JSON and texture URL
- `TextRenderer` is created asynchronously

#### Properties
All property setters remain the same API but with different internal implementations:
- `text` - Updates paragraph in TextRenderer
- `font` - Triggers re-initialization
- `atlas` - Triggers re-initialization
- `align` - Updates paragraph alignment
- `vAlign` - Calculates offset for vertical alignment
- `color` - Updates TextRenderer color with RGBA format
- `strokeColor` - Updates TextRenderer strokeColor
- `strokeWidth` - Splits into `strokeInsetWidth` and `strokeOutsetWidth`
- `opacity` - Applied to color's alpha channel
- `size` - Applied through transform matrix

#### Methods
- `updatePlaneText()` now accepts `Partial<PlaneTextOptions>` instead of full options
- Internal methods completely rewritten

### 4. Removed Features
The following mesh-specific features are no longer available:
- `material` property
- `vertices` data access
- `indices` data access
- `bakeCurrentTransformIntoVertices()`
- `refreshBoundingInfo()`
- Mesh cloning/instancing
- Submeshes
- Mesh-specific optimizations

### 5. New Dependencies
```typescript
import { FontAsset, TextRenderer } from '@babylonjs/addons';
import type { ParagraphOptions } from '@babylonjs/addons';
```

### 6. Removed Dependencies
```typescript
// No longer needed:
import { createTextMesh } from 'babylon-msdf-text';
import { Mesh, Material, VertexBuffer, Texture } from '@babylonjs/core';
```

## Migration Guide

### For Users of PlaneText

#### If you only use basic text rendering:
```typescript
// This still works the same:
let text = anu.createPlaneText('myText', {
  text: 'Hello World',
  color: Color3.Green()
}, scene);

text.position = new Vector3(1, 2, 3);
text.text = "New Text";
text.color = Color3.Red();
```

#### If you access mesh properties:
```typescript
// BEFORE (will break):
text.material.alpha = 0.5;
text.renderOutline = true;
let vertices = text.getVerticesData(VertexBuffer.PositionKind);

// AFTER (not directly possible):
// Use opacity property instead of material.alpha
text.opacity = 0.5;
// Outline rendering is not supported with TextRenderer
// Vertex access is not possible - text is rendered differently
```

#### If you use mesh operations:
```typescript
// BEFORE (will break):
text.convertToFlatShadedMesh();
text.bakeCurrentTransformIntoVertices();
let clone = text.clone();

// AFTER:
// These operations are not supported
// Create a new PlaneText instance instead of cloning
let newText = anu.createPlaneText('myText2', {
  text: text.text,
  color: text.color,
  // ... copy other properties
}, scene);
```

### For Developers Extending PlaneText

The internal architecture has completely changed. If you extended PlaneText:
1. Review that your extensions don't rely on mesh properties
2. Consider extending TransformNode instead
3. Use the TextRenderer API for text-specific operations

## Benefits of New API

1. **Better Performance**: Direct rendering without mesh overhead
2. **Modern Babylon.js**: Uses official @babylonjs/addons package
3. **Better Text Rendering**: Improved MSDF text rendering quality
4. **Active Maintenance**: Part of official Babylon.js ecosystem

## Potential Issues

1. **Async Initialization**: The initialize() method is async, though it's called in constructor. Text may not render immediately.
2. **No Mesh Features**: All mesh-specific features are unavailable
3. **Different Rendering Pipeline**: Text renders in a different pass than meshes
4. **Limited Interactions**: Cannot use mesh-based picking/collisions directly

## Testing Recommendations

1. Test all text creation scenarios
2. Verify text updates work correctly
3. Test font and atlas changes
4. Verify transforms (position, rotation, scaling) work
5. Test parent-child relationships
6. Verify disposal cleans up resources correctly
7. Test with scenes that have many text instances

## Rollback Plan

If critical issues arise, you can:
1. Revert to the previous commit on the branch
2. Keep using `babylon-msdf-text` package
3. The old implementation is preserved in git history

## Questions or Issues?

If you encounter issues with this migration, please:
1. Check if you're accessing mesh-specific properties
2. Review this migration guide
3. Consult the Babylon.js TextRenderer documentation
4. File an issue with details about your use case
