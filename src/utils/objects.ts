// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

/**
 * Helper function to evaluate a property path on an object (e.g., "material.alpha")
 * @param obj The object to evaluate the path on
 * @param path The property path as a dot-separated string
 * @returns The value at the path, or undefined if the path doesn't exist
 */
export function evaluatePropertyPath(obj: any, path: string) {
  return path.split('.').reduce(
    (current, part) => current?.[part],
    obj
  );
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
  const lastProp = parts.pop();
  
  if (!lastProp) return false;
  
  // Navigate to parent object using reduce
  const parent = parts.reduce(
    (current, part) => current?.[part],
    node
  );
  
  // Check if parent exists and has the target property
  if (parent == null || !(lastProp in parent)) return false;
  
  const targetProperty = parent[lastProp];
  const data = node.metadata?.data ?? {};
  
  // Helper to evaluate function values
  const evaluate = (val: any) => 
    val instanceof Function ? val(data, node, nodeIndex) : val;
  
  // If it's a method, call it with arguments
  if (typeof targetProperty === 'function') {
    const evaluatedValue = evaluate(value);
    const args = Array.isArray(evaluatedValue) ? evaluatedValue : [evaluatedValue];
    const processedArgs = args.map(evaluate);
    
    targetProperty.apply(parent, processedArgs);
    return true;
  }
  
  // It's a property, set it
  parent[lastProp] = evaluate(value);
  return true;
}
