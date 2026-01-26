# Enhanced TypeScript Support for Selection

The Selection class now provides enhanced TypeScript support through intersection types that include common Babylon.js properties.

## Usage

### 1. Use the Factory Function

For full TypeScript IntelliSense support, use the `createSelection` factory function:

```typescript
import { createSelection } from '@jpmorganchase/anu';

// This will have full IntelliSense for dynamic properties
const selection = createSelection(nodes, scene);

// Now you get IntelliSense for these properties:
selection.isVisible(true);        // ✅ TypeScript knows this exists
selection.alpha(0.5);            // ✅ TypeScript knows this exists  
selection.visibility(1.0);       // ✅ TypeScript knows this exists
```

### 2. Type-Safe Dynamic Properties

The enhanced Selection provides type safety for common Babylon.js properties:

```typescript
// Boolean properties
selection.isVisible(true);
selection.isPickable(false);
selection.checkCollisions(true);

// Number properties  
selection.alpha(0.5);
selection.visibility(1.0);
selection.renderingGroupId(2);

// Vector3 properties (if not using explicit methods)
selection.position(new Vector3(1, 2, 3));
selection.scaling(new Vector3(1, 1, 1));

// Function values still work
selection.alpha((data, node, i) => i * 0.1);
selection.isVisible((data, node, i) => data.visible);
```

### 3. Getting Property Values

All dynamic properties can return arrays of values:

```typescript
const visibilities: boolean[] = selection.isVisible();
const alphas: number[] = selection.alpha(); 
const names: string[] = selection.name();
```

### 4. Specialized Types

Use specialized types for specific use cases:

```typescript
import { VisibilitySelection, RenderingSelection } from '@jpmorganchase/anu';

// Only visibility-related properties
const visSelection: VisibilitySelection = createSelection(nodes) as VisibilitySelection;
visSelection.isVisible(true);    // ✅ Available
visSelection.alpha(0.5);         // ✅ Available  
// visSelection.renderingGroupId(1); // ❌ Not available on this type

// Only rendering-related properties
const renderSel: RenderingSelection = createSelection(nodes) as RenderingSelection;
renderSel.renderingGroupId(2);   // ✅ Available
renderSel.layerMask(1);          // ✅ Available
// renderSel.alpha(0.5);         // ❌ Not available on this type
```

## Benefits

1. **IntelliSense**: Full autocomplete for common Babylon.js properties
2. **Type Safety**: Compile-time checking of property types  
3. **Documentation**: Hover tooltips show property types
4. **Backwards Compatible**: All existing code continues to work
5. **Runtime Flexibility**: Proxy still handles any property not explicitly typed

## Fallback Behavior

For properties not included in the type definitions, the Proxy system still works:

```typescript
// Even if not in type definitions, these will work at runtime
selection.customProperty(value);     // Works via Proxy
selection.someOtherBabylonProp(val); // Works via Proxy
```

You just won't get IntelliSense for them until they're added to the type definitions.