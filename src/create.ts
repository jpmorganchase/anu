// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, MeshBuilder, TransformNode, Scene, ActionManager, Tags, CreateGreasedLine, GreasedLineMeshBuilderOptions } from '@babylonjs/core';
import { createPlaneText } from './prefabs/Text/planeText';
import { createContainer } from './prefabs/Misc/container';

interface StringByFunc {
  [key: string]: Function;
}

interface StringByAny {
  [key: string]: any;
}

function createCOT(name: string, options: object, scene: Scene) {
  return new TransformNode(name, scene);
}

function createGL(name: string, options: GreasedLineMeshBuilderOptions, scene: Scene){
  return CreateGreasedLine(name, options, {}, scene);
}


const meshList: StringByFunc = {
  cot: createCOT,
  sphere: MeshBuilder.CreateSphere,
  box: MeshBuilder.CreateBox,
  tiledBox: MeshBuilder.CreateTiledBox,
  cylinder: MeshBuilder.CreateCylinder,
  capsule: MeshBuilder.CreateCapsule,
  plane: MeshBuilder.CreatePlane,
  tiledPlane: MeshBuilder.CreateTiledPlane,
  disc: MeshBuilder.CreateDisc,
  torus: MeshBuilder.CreateTorus,
  torusKnot: MeshBuilder.CreateTorusKnot,
  ground: MeshBuilder.CreateGround,
  tiledGround: MeshBuilder.CreateTiledGround,
  lines: MeshBuilder.CreateLines,
  dashedLines: MeshBuilder.CreateDashedLines,
  lineSystem: MeshBuilder.CreateLineSystem,
  ribbon: MeshBuilder.CreateRibbon,
  tube: MeshBuilder.CreateTube,
  extrude: MeshBuilder.ExtrudeShape,
  extrudeCustom: MeshBuilder.ExtrudeShapeCustom,
  lathe: MeshBuilder.CreateLathe,
  polygon: MeshBuilder.CreatePolygon,
  extrudePolygon: MeshBuilder.ExtrudePolygon,
  polyhedra: MeshBuilder.CreatePolyhedron,
  icosphere: MeshBuilder.CreateIcoSphere,
  geodesic: MeshBuilder.CreateGeodesic,
  goldberg: MeshBuilder.CreateGoldberg,
  planeText: createPlaneText,
  greasedLine: createGL,
  container: createContainer,
};

export interface MeshTypes {
  "box": Parameters<typeof MeshBuilder.CreateBox>[1],
  "cot": any,
  "sphere": Parameters<typeof MeshBuilder.CreateSphere>[1],
  "tiledBox": Parameters<typeof MeshBuilder.CreateTiledBox>[1],
  "cylinder": Parameters<typeof MeshBuilder.CreateCylinder>[1],
  "capsule":  Parameters<typeof MeshBuilder.CreateCapsule>[1],
  "plane": Parameters<typeof MeshBuilder.CreatePlane>[1],
  "tiledPlane": Parameters<typeof MeshBuilder.CreateTiledPlane>[1],
  "disc": Parameters<typeof MeshBuilder.CreateDisc>[1],
  "torus": Parameters<typeof MeshBuilder.CreateTorus>[1],
  "torusKnot": Parameters<typeof MeshBuilder.CreateTorusKnot>[1],
  "ground": Parameters<typeof MeshBuilder.CreateGround>[1],
  "tiledGround": Parameters<typeof MeshBuilder.CreateTiledGround>[1],
  "lines": Parameters<typeof MeshBuilder.CreateLines>[1],
  "dashedLines": Parameters<typeof MeshBuilder.CreateDashedLines>[1],
  "lineSystem": Parameters<typeof MeshBuilder.CreateLineSystem>[1],
  "ribbon": Parameters<typeof MeshBuilder.CreateRibbon>[1],
  "tube": Parameters<typeof MeshBuilder.CreateTube>[1],
  "extrude": Parameters<typeof MeshBuilder.ExtrudeShape>[1],
  "extrudeCustom": Parameters<typeof MeshBuilder.ExtrudeShapeCustom>[1],
  "lathe": Parameters<typeof MeshBuilder.CreateLathe>[1],
  "polygon": Parameters<typeof MeshBuilder.CreatePolygon>[1],
  "extrudePolygon": Parameters<typeof MeshBuilder.ExtrudePolygon>[1],
  "polyhedra": Parameters<typeof MeshBuilder.CreatePolyhedron>[1],
  "icosphere": Parameters<typeof MeshBuilder.CreateIcoSphere>[1],
  "geodesic": Parameters<typeof MeshBuilder.CreateGeodesic>[1],
  "goldberg": Parameters<typeof MeshBuilder.CreateGoldberg>[1],
  'planeText': Parameters<typeof createPlaneText>[1],
  "greasedLine": Parameters<typeof createGL>[1],
  "container": Parameters<typeof createContainer>[1],
}

type Property<T, K extends keyof T> = T[K];

/**
 * Helper function to build meshes of a specified type with options optionally set with functions and data.
 *
 * @param shape The name of the mesh type you want to create.
 * @param name The string that will be used as the inital mesh ID and name.
 * @param options An object containg the mesh parametetrs as either absolutle values or functions.
 * @param data An object containg the data that may be used to execute any functions passed in options.
 * @param scene The scene to create the mesh in.
 * @returns A mesh object created with the passed parameters.
 */
export function create<K extends keyof MeshTypes>(
  shape: K,
  name: string,
  options: Property<MeshTypes, K> = {},
  data: object = {},
  scene?: Scene
): Mesh {
  let executedOptions: StringByAny = {};

  for (let [key, value] of Object.entries(options)) {
    value instanceof Function ? (executedOptions[key] = (value as Function)(data)) : (executedOptions[key] = value);
  }

  let builder: Function = meshList[shape];
  let mesh = builder(name, executedOptions, scene);
  if (mesh instanceof Mesh) mesh.actionManager = new ActionManager(mesh.getScene());
  Tags.EnableFor(mesh);
  mesh.metadata = { ...mesh.metadata, data: data };

  return mesh;
}
