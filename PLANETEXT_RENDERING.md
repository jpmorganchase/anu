# PlaneText Rendering Implementation

## Overview

This document explains how the TextRenderer rendering is implemented in the PlaneText class using a shared `onAfterRenderObservable` pattern.

## Architecture

### Problem
Each `TextRenderer` instance needs to call `render()` on every frame with the camera's view and projection matrices. Without proper management, each PlaneText could create its own `onAfterRenderObservable`, leading to:
- Redundant observer registrations
- Performance overhead
- Memory waste

### Solution
Use a **static registry pattern** where:
1. All `TextRenderer` instances for a scene are tracked in a single `Map`
2. Only **one** `onAfterRenderObservable` is created per scene
3. That single observer renders all text renderers for the scene

## Implementation Details

### Static Properties

```typescript
// Static registry to manage all TextRenderer instances per scene
private static rendererRegistry = new Map<Scene, Set<TextRenderer>>();
private static sceneObservers = new Map<Scene, any>();
```

- `rendererRegistry`: Maps each Scene to a Set of its TextRenderer instances
- `sceneObservers`: Maps each Scene to its single onAfterRenderObservable

### Registration Flow

When a PlaneText is initialized:

1. **Create TextRenderer** (async)
2. **Register Renderer**: Call `registerRenderer(scene, renderer)`
   - Add renderer to the scene's Set in `rendererRegistry`
   - If this is the **first** renderer for the scene:
     - Create ONE `onAfterRenderObservable` that:
       - Gets the active camera
       - Gets view and projection matrices
       - Renders ALL registered text renderers for this scene
     - Store the observer in `sceneObservers`

### Render Loop

```typescript
scene.onAfterRenderObservable.add(() => {
  const activeCamera = scene.activeCamera;
  if (!activeCamera) return;

  const viewMatrix = activeCamera.getViewMatrix();
  const projectionMatrix = activeCamera.getProjectionMatrix();
  
  // Render all registered text renderers for this scene
  const sceneRenderers = PlaneText.rendererRegistry.get(scene);
  if (sceneRenderers) {
    sceneRenderers.forEach(textRenderer => {
      textRenderer.render(viewMatrix, projectionMatrix);
    });
  }
});
```

### Cleanup Flow

When a PlaneText is disposed or reinitialized:

1. **Unregister Renderer**: Call `unregisterRenderer(scene, renderer)`
   - Remove renderer from the scene's Set
   - If the Set is now **empty** (last renderer for this scene):
     - Remove the `onAfterRenderObservable`
     - Clean up registry entries
     - This prevents memory leaks

## Benefits

### ✅ Performance
- Single observer per scene instead of N observers for N text instances
- Batch rendering of all text with single camera matrix calculation

### ✅ Memory Efficiency
- Minimal memory overhead (two static Maps)
- Automatic cleanup when last text is removed

### ✅ Scalability
- Works efficiently with 1 text instance or 1000 text instances
- No performance degradation with multiple scenes

### ✅ Automatic Camera Handling
- Uses `scene.activeCamera` automatically
- Works with any camera type (ArcRotate, Free, Universal, etc.)
- Supports camera switching at runtime

## Usage

No special code needed! Just create PlaneText normally:

```typescript
// First text in scene - creates the observer
const text1 = anu.createPlaneText('text1', { text: 'Hello' }, scene);

// Second text in scene - reuses the same observer
const text2 = anu.createPlaneText('text2', { text: 'World' }, scene);

// Third text in scene - still using the same observer
const text3 = anu.createPlaneText('text3', { text: '!' }, scene);

// Disposal is automatic
text1.dispose(); // Still 2 texts, observer remains
text2.dispose(); // Still 1 text, observer remains  
text3.dispose(); // Last text, observer is removed
```

## Multi-Scene Support

Works seamlessly with multiple scenes:

```typescript
const scene1 = new Scene(engine);
const scene2 = new Scene(engine);

// Each scene gets its own observer
const text1 = anu.createPlaneText('s1-text', { text: 'Scene 1' }, scene1);
const text2 = anu.createPlaneText('s2-text', { text: 'Scene 2' }, scene2);

// Two observers total (one per scene), not two per text
```

## Edge Cases Handled

### ✅ No Active Camera
If `scene.activeCamera` is null, rendering is skipped gracefully.

### ✅ Async Initialization
Registration happens after async TextRenderer creation completes.

### ✅ Reinitialization
When font/atlas changes:
1. Old renderer is unregistered
2. New renderer is registered
3. Observer count stays correct

### ✅ Multiple Disposals
Safe to call dispose multiple times - unregister is idempotent.

## Performance Characteristics

| Scenario | Observer Count | Render Calls per Frame |
|----------|----------------|------------------------|
| 1 text, 1 scene | 1 | 1 |
| 100 texts, 1 scene | 1 | 1 (renders all 100) |
| 10 texts, 10 scenes | 10 | 10 (1 per scene) |

## Code Location

File: `/Users/V809028/Code/anu/src/prefabs/Text/planeText.ts`

Key methods:
- `registerRenderer()` - Lines 91-116
- `unregisterRenderer()` - Lines 118-133
- Observer setup - Lines 101-114
- Cleanup in `dispose()` - Lines 317-329
- Cleanup in `reinitialize()` - Lines 306-315
