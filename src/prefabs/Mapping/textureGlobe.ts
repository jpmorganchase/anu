// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { OSM } from 'ol/source';
import {
  MeshBuilder,
  Color3,
  StandardMaterial,
  DynamicTexture,
  Scene,
  Mesh,
  Vector2,
  Vector3,
  Space,
  Axis,
  TransformNode
} from '@babylonjs/core';
import { Context } from 'vm';
import { Coordinate } from 'ol/coordinate';


export class TextureGlobe extends TransformNode {
  name: string;
  scene?: Scene;
  layers: TileLayer<OSM>[];
  target: string;
  view: View;
  map: Map;
  container: HTMLElement;
  resolution: Vector2;
  texture: DynamicTexture;
  mesh: Mesh;
  context: Context;
  diameter: number;
  lonLatToVector3: Function;

  constructor(name: string, layers: TileLayer<OSM>[], view: View, resolution: Vector2, diameter: number, scene?: Scene,) {
    super(name, scene, true)
    this.layers = layers;
    this.target = 'globe';
    this.view = view;
    this.resolution = resolution;
    this.diameter = diameter;
    this.container = this.createContainer();
    this.map = this.createOLMap();
    this.texture = this.createTexture();
    this.context = this.texture.getContext();
    this.mesh = this.createMesh();
    this.lonLatToVector3 = this.createScales;
  }

  createContainer() {
    let container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.visibility = 'hidden';
    container.style.width = this.resolution.x + 'px';
    container.style.height = this.resolution.y + 'px';
    container.setAttribute('id', 'globe');
    document.body.appendChild(container);
    return container;
  }

  createOLMap() {
    const map = new Map({
      pixelRatio: 1,
      layers: this.layers,
      target: this.target,
      view: this.view,
    });
    return map;
  }

  createTexture() {
    let scene = this.scene;
    let target = this.target;
    let textureGround = new DynamicTexture(
      'mapTexture',
      { width: this.resolution.x, height: this.resolution.y },
      scene,
    );

    this.map.on('postrender', function () {
      var mapContainer = document.getElementById(target);
      var mapCanvas = mapContainer!.getElementsByTagName('canvas')[0];
      textureGround.getContext().drawImage(mapCanvas, 0, 0);
      textureGround.update();
    });
    return textureGround;
  }

  createMesh() {
    let globe = MeshBuilder.CreateSphere(this.name + "_mesh", { diameter: this.diameter }, this.scene);
    globe.setParent(this);
    globe.rotate(Axis.X, Math.PI, Space.WORLD);
    globe.rotate(Axis.Y, Math.PI, Space.WORLD);
    let materialGlobe = new StandardMaterial(this.name + '_material', this.scene);

    globe.bakeCurrentTransformIntoVertices()

    materialGlobe.diffuseTexture = this.texture;
    materialGlobe.specularColor = new Color3(0, 0, 0);
    globe.material = materialGlobe;

    return globe;
  }

  createScales(c: Coordinate) {
    let lon = (c[0]) * Math.PI / 180; 
    let lat = (c[1]) * Math.PI / 180; 

    let r = (this.diameter / 2);

    let x = r * Math.cos(lat) * Math.cos(lon);
    let y = r * Math.cos(lat) * Math.sin(lon);
    let z = r * Math.sin(lat);

    return new Vector3(x, z, y);
  }
}

export function createTextureGlobe(
  name: string,
  options: {
    layers?: TileLayer<any>[];
    view?: View;
    resolution?: Vector2;
    diameter?: number;
  } = {},
  scene?: Scene,
) {
  const layers: TileLayer<any>[] = options.layers || [
    new TileLayer({ source: new OSM(), extent: [-180, -90, 180, 90] })
  ];
  const view: View =
    options.view ||
    new View({
      projection: 'EPSG:4326',
      extent: [-180, -90, 180, 90],
      center: [0, 0],
      zoom: 0
    });

  const resolution: Vector2 = options.resolution || new Vector2(1000, 500);
  const diameter: number = options.diameter || 1;

  let map = new TextureGlobe(name, layers, view, resolution, diameter, scene);

  return map;
}
