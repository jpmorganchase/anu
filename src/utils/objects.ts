// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

/**
 * Helper function to evaluate a property path on an object (e.g., "material.alpha")
 * @param obj The object to evaluate the path on
 * @param path The property path as a dot-separated string
 * @returns The value at the path, or undefined if the path doesn't exist
 */
export function evaluatePropertyPath(obj: any, path: string) {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current;
}

/**
 * Helper function to check if a property path exists on an object
 * @param obj The object to check the path on
 * @param path The property path as a dot-separated string
 * @returns True if the path exists, false otherwise
 */
export function hasPropertyPath(obj: any, path: string): boolean {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return false;
    }
  }
  return true;
}

/**
 * Helper function to call a method or set a property using a path
 * Handles both properties and methods (with multiple arguments)
 * @param node The node object to operate on
 * @param path The property path as a dot-separated string
 * @param value The value to set, arguments to pass to a method, or a function returning them
 * @param nodeIndex The index of the node in the selection (for function evaluation)
 * @returns True if the operation succeeded, false otherwise
 */
export function callOrSetPropertyPath(
  node: any,
  path: string,
  value: any,
  nodeIndex: number
): boolean {
  const parts = path.split('.');
  const lastProp = parts.pop()!;
  
  // Navigate to parent object
  let parent = node;
  for (const part of parts) {
    if (parent && typeof parent === 'object' && part in parent) {
      parent = parent[part];
    } else {
      return false; // Path doesn't exist
    }
  }
  
  // Check if the target exists
  if (parent && typeof parent === 'object' && lastProp in parent) {
    const targetProperty = parent[lastProp];
    
    // If it's a method, call it with arguments
    if (typeof targetProperty === 'function') {
      // First, evaluate the value if it's a function (for data-driven arguments)
      let evaluatedValue = value instanceof Function ? 
        value((node.metadata?.data ?? {}), node, nodeIndex) : value;
      
      // Then handle both single values and arrays of arguments
      const args = Array.isArray(evaluatedValue) ? evaluatedValue : [evaluatedValue];
      
      // Process each argument - if any are functions, call them with metadata
      const processedArgs = args.map(arg => {
        return arg instanceof Function ? 
          arg((node.metadata?.data ?? {}), node, nodeIndex) : arg;
      });
      
      targetProperty.apply(parent, processedArgs);
      return true;
    } else {
      // It's a property, set it
      const actualValue = value instanceof Function ? 
        value((node.metadata?.data ?? {}), node, nodeIndex) : value;
      parent[lastProp] = actualValue;
      return true;
    }
  }
  
  return false;
}
