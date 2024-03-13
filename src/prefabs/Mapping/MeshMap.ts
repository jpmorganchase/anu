// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Vector3, Scene,  MeshBuilder, Mesh, TransformNode, Nullable, Node} from '@babylonjs/core';
import { GeoGeometryObjects, GeoProjection, geoAlbers, geoIdentity } from 'd3-geo';
import * as topojsonClient from "topojson-client";
import * as topojsonSimplify from "topojson-simplify";
import * as topojsonServer from "topojson-server";
import earcut from "earcut";
import { geoProject } from "d3-geo-projection";
import { Selection } from '../../selection';

export class meshMap {
  name: string;
  scene?: Scene;
  size: [number, number];
  geoJson: GeoGeometryObjects;
  projection: GeoProjection;
  transform: [number, number];
  simplification: number;
  cot: Nullable<Node>;
  selection?: Selection;
  depth?: number;

  constructor(name: string, geoJson: GeoGeometryObjects, projection: GeoProjection, size: [number, number], transform: [number, number], simplification: number, depth: number, cot: Nullable<Node>, scene?: Scene) {
    this.name = name;
    this.scene = scene;
    this.geoJson = geoJson;
    this.projection = projection;
    this.size = size;
    this.transform = transform;
    this.simplification = simplification;
    this.cot = cot;
    this.depth = depth;
    this.selection = this.createMap();
  }

  createMap(): Selection{

    let preProjection = geoProject(this.geoJson, this.projection.fitSize(this.size, this.geoJson).translate(this.transform));
    let geoProjection = geoProject(preProjection, geoIdentity());
    let topoJson = topojsonServer.topology({ features: geoProjection });
    let preSimpleTopoJson = topojsonSimplify.presimplify(topoJson as any);
    let simpleTopojson = topojsonSimplify.simplify(preSimpleTopoJson, this.simplification);
    let simpleGeojson = topojsonClient.feature(simpleTopojson, simpleTopojson.objects.features);

    let mesh;
    let states: any[] = [];

    (simpleGeojson as any).features.forEach((features: {
      properties: null; geometry: { type: string; coordinates: any[]; } | null; 
}) => { 
    if (features.geometry != null) {
        if (features.geometry.type === "Polygon"){
        let path: Vector3[] = []
        features.geometry.coordinates[0].forEach((coord: (number | undefined)[]) => path.push(new Vector3(coord[0], 0, coord[1])))
        mesh = MeshBuilder.ExtrudePolygon("polygon", {shape: path, depth: this.depth, wrap: false, sideOrientation: 2}, this.scene, earcut);
        mesh!.name = "polygon"
        mesh!.parent = this.cot;
        mesh!.metadata = { ...mesh!.metadata, data: (features.properties != null) ? features.properties : null };
        states.push(mesh);
        } else if (features.geometry.type === "MultiPolygon") {
        let meshes: Mesh[] = []
        features.geometry.coordinates.forEach(coords => {
            coords.forEach((coord: any[]) => {
            let path: Vector3[] = []
            coord.forEach((coord: (number | undefined)[]) => path.push(new Vector3(coord[0], 0, coord[1])))
            meshes.push(MeshBuilder.ExtrudePolygon("polygon", {shape: path, depth: this.depth, wrap: false, sideOrientation: 2}, this.scene, earcut));
        })
        })
        mesh = Mesh.MergeMeshes(meshes, true, true);
        mesh!.name = "polygon"
        mesh!.parent = this.cot;
        mesh!.metadata = { ...mesh!.metadata, data: (features.properties != null) ? features.properties : null};
        states.push(mesh)
        }
    }
    });
    
    return new Selection(states, this.scene);
  }


}

export function createMeshMap(
  name: string,
  options: {
    geoJson: GeoGeometryObjects;
    projection?: GeoProjection;
    size?: [number, number];
    transform?: [number, number];
    simplification?: number;
    depth?: number;
    cot?: Node | TransformNode | Mesh;
  },
  scene?: Scene,
) {

    const geoJson = options.geoJson;
    const projection = options.projection || geoAlbers();
    const size = options.size || [10,10];
    const transform = options.transform || [0,0];
    const simplification = options.simplification || 0;
    const depth = options.depth || 1;
    const cot = options.cot || new TransformNode('meshMapCOT', scene);
  
    let map = new  meshMap(name, geoJson, projection, size, transform, simplification, depth, cot, scene);

  return map;
}
