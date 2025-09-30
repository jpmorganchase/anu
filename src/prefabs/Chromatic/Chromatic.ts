import {
  Color3,
  Color4,
  PBRMetallicRoughnessMaterial,
  PBRSpecularGlossinessMaterial,
  Scene,
  StandardMaterial,
  float,
  int,
} from '@babylonjs/core';
import chroma from 'chroma-js';

export class OrdinalChromatic {
  scheme: string[];

  constructor(scheme: string | string[]) {
    this.scheme = typeof scheme === 'string' ? schemes[scheme] : scheme;
  }

  public toColor3(steps: int = this.scheme.length) {
    return chroma
      .scale(this.scheme)
      .colors(steps)
      .map((v: string) => Color3.FromHexString(v));
  }

  public toColor4(steps: int = this.scheme.length) {
    return chroma
      .scale(this.scheme)
      .colors(steps)
      .map((v: string) => Color4.FromHexString(v));
  }

  public toStandardMaterial(steps: int = this.scheme.length, scene?: Scene) {
    return chroma
      .scale(this.scheme)
      .colors(steps)
      .map((v: string) => makeStandardMaterial(v, scene));
  }

  public toPBRMaterialRough(steps: int = this.scheme.length, scene?: Scene) {
    return chroma
      .scale(this.scheme)
      .colors(steps)
      .map((v: string) => makePBRMaterialRough(v, scene));
  }

  public toPBRMaterialGlossy(steps: int = this.scheme.length, scene?: Scene) {
    return chroma
      .scale(this.scheme)
      .colors(steps)
      .map((v: string) => makePBRMaterialGlossy(v, scene));
  }
}

export class SequentialChromatic {
  scheme: string[];

  constructor(scheme: string | string[]) {
    this.scheme = typeof scheme === 'string' ? schemes[scheme] : scheme;
  }

  public toColor3(steps: int | undefined | number[] = undefined) {
    return steps === undefined
      ? (d: float) => Color3.FromHexString(chroma.scale(this.scheme)(d).hex())
      : (d: float) => Color3.FromHexString(chroma.scale(this.scheme).classes(steps)(d).hex());
  }

  public toColor4(steps: int | undefined | number[] = undefined) {
    return steps === undefined
      ? (d: float) => Color4.FromHexString(chroma.scale(this.scheme)(d).hex())
      : (d: float) => Color4.FromHexString(chroma.scale(this.scheme).classes(steps)(d).hex());
  }

  public toStandardMaterial(steps: int | undefined | number[] = undefined, scene?: Scene) {
    return steps === undefined
      ? (d: float) => makeStandardMaterial(chroma.scale(this.scheme)(d).hex(), scene)
      : (d: float) => makeStandardMaterial(chroma.scale(this.scheme).classes(steps)(d).hex());
  }

  public toPBRMaterialRough(steps: int | undefined | number[] = undefined, scene?: Scene) {
    return steps === undefined
      ? (d: float) => makePBRMaterialRough(chroma.scale(this.scheme)(d).hex(), scene)
      : (d: float) => makePBRMaterialRough(chroma.scale(this.scheme).classes(steps)(d).hex());
  }

  public toPBRMaterialGlossy(steps: int | undefined | number[] = undefined, scene?: Scene) {
    return steps === undefined
      ? (d: float) => makePBRMaterialGlossy(chroma.scale(this.scheme)(d).hex(), scene)
      : (d: float) => makePBRMaterialGlossy(chroma.scale(this.scheme).classes(steps)(d).hex(), scene);
  }
}

export function ordinalChromatic(scheme: string | string[]) {
  return new OrdinalChromatic(scheme);
}

export function sequentialChromatic(scheme: string) {
  return new SequentialChromatic(scheme);
}

interface StringByAny {
  [key: string]: any;
}

export let schemes: StringByAny = {
  ...chroma.brewer,
  d310: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
};

let linear: StringByAny = {
  ...chroma.brewer,
};

function makeStandardMaterial(hex: string, scene?: Scene) {
  let material = new StandardMaterial(hex, scene);
  material.diffuseColor = Color3.FromHexString(hex);
  return material;
}

function makePBRMaterialRough(hex: string, scene?: Scene) {
  let material = new PBRMetallicRoughnessMaterial(hex, scene);
  material.baseColor = Color3.FromHexString(hex);
  return material;
}

function makePBRMaterialGlossy(hex: string,  scene?: Scene) {
  let material = new PBRSpecularGlossinessMaterial(hex, scene);
  material.diffuseColor = Color3.FromHexString(hex);
  material.specularColor = Color3.FromHexString(hex);
  return material;
}
