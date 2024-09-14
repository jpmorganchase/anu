import { Nullable, AbstractMesh, Scene, Mesh, BoundingInfo, Vector3 } from "@babylonjs/core";

interface containerOptions {
    calculateBounds?: boolean,
    exclude?: Nullable<(abstractMesh: AbstractMesh) => boolean> | undefined,
    childObserver?: boolean,
  }

export function createContainer(name: string, options: containerOptions, scene: Scene){
    let calculateBounds = options.calculateBounds || true;
    let exclude = options.exclude || undefined;
    let childObserver = options.childObserver || false; 
  
    let container: Mesh = new Mesh(name, scene);
  
    if (calculateBounds){
      let { min, max } = container.getHierarchyBoundingVectors(true, exclude);
      container.setBoundingInfo(new BoundingInfo(min, max));
    }
    
    if (childObserver){
      container.onAfterWorldMatrixUpdateObservable.add(() => {
          setTimeout(() => {
              if ((container as any).detectReentrancy) {
                  return;
              }
              (container as any).detectReentrancy = true;
              let { min, max } = container.getHierarchyBoundingVectors(true, exclude); //triggers observable causing infinite loop
              const worldInv = container.getWorldMatrix().clone().invert();
              Vector3.TransformCoordinatesToRef(min, worldInv, min);
              Vector3.TransformCoordinatesToRef(max, worldInv, max);
              container.setBoundingInfo(new BoundingInfo(min, max));
              setTimeout(() => {
                (container as any).detectReentrancy = false;
              });
          });
      })
    }
    
    return container
  }


