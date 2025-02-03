import { MeshBuilder, Vector3, StandardMaterial, Color3, CreateBox } from "@babylonjs/core"

export default (scene) => {
    
    let box = CreateBox('my-box', {width: 2}, scene);

    box.position = new Vector3(2,-1,2);

    box.scaling.y = 2;

    box.rotation.x = 1.5708; //radians

    let material = new StandardMaterial('box-mat');
    material.diffuseColor = Color3.Red();

    box.material = material;

    return scene
}