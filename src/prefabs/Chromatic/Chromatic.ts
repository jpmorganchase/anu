import { Color3, Color4, PBRMaterial, PBRMetallicRoughnessBlock, PBRMetallicRoughnessMaterial, PBRSpecularGlossinessMaterial, Scene, StandardMaterial, float, int } from "@babylonjs/core";
import chroma from "chroma-js";

class CategoricalChromatic{
    scheme: string;

    constructor(scheme: string){
        this.scheme = scheme;
    }

    public toColor3(steps: int = categorical[this.scheme].length){
        return categorical[this.scheme].slice(0,steps).map((v: string) => Color3.FromHexString(v));
    }

    public toColor4(steps: int = categorical[this.scheme].length){
        return categorical[this.scheme].slice(0,steps).map((v: string) => Color4.FromHexString(v));
    }

    public toStandardMaterial(steps: int = categorical[this.scheme].length){
        return categorical[this.scheme].slice(0,steps).map((v: string) => { let material = new StandardMaterial(v);
                                                                material.diffuseColor = Color3.FromHexString(v)
                                                                return material });
    }

    public toPBRMaterialRough(steps: int = categorical[this.scheme].length){
        return categorical[this.scheme].slice(0,steps).map((v: string) => { let material = new PBRMetallicRoughnessMaterial(v);
                                                                material.baseColor = Color3.FromHexString(v)
                                                                return material });
    }

    public toPBRMaterialGlossy(steps: int = categorical[this.scheme].length){
        return categorical[this.scheme].slice(0,steps).map((v: string) => { let material = new PBRSpecularGlossinessMaterial(v);
                                                                material.diffuseColor = Color3.FromHexString(v);
                                                                material.specularColor = Color3.FromHexString(v);
                                                                return material });
    }

}

class LinearChromatic{
    scheme: string;

    constructor(scheme: string){
        this.scheme = scheme;
    }

    public toColor3(steps: int = 0){
        console.log(linear)
        return (d: float) => Color3.FromHexString(chroma.scale(this.scheme)(d).hex());
        
    }
}

export function categoricalChromatic(scheme: string){
    return new CategoricalChromatic(scheme);
}

export function linearChromatic(scheme: string){
    return new LinearChromatic(scheme);
}


interface StringByAny {
    [key: string]: any;
  }

let categorical: StringByAny = {
    'd310': [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf"
    ]
}

let linear: StringByAny = {
    ...chroma.brewer
}

