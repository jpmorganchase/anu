// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Mesh, MeshBuilder, TransformNode, Scene, Nullable, ActionManager, Tags, CreateGreasedLine, GreasedLineMeshBuilderOptions } from '@babylonjs/core';
import { text2d } from './prefabs/text2d';

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
  text2d: text2d,
  greasedLine: createGL,
};

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
export function create(
  shape: string,
  name: string,
  scene: Scene,
  options: object = {},
  data: object = {},
): Mesh {
  let executedOptions: StringByAny = {};

  for (let [key, value] of Object.entries(options)) {
    value instanceof Function ? (executedOptions[key] = value(data)) : (executedOptions[key] = value);
  }

  let builder: Function = meshList[shape];
  let mesh = builder(name, executedOptions, scene);
  if (mesh instanceof Mesh) mesh.actionManager = new ActionManager(scene);
  Tags.EnableFor(mesh);
  mesh.metadata = { ...mesh.metadata, data: data };

  return mesh;
}
