// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { scaleLinear } from 'd3-scale';
import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { OSM } from 'ol/source';
import { useGeographic } from 'ol/proj';
import {
  MeshBuilder,
  Color3,
  StandardMaterial,
  DynamicTexture,
  Scene,
  Mesh,
  KeyboardEventTypes,
  TransformNode,
} from '@babylonjs/core';
import { Context } from 'vm';
import { Coordinate } from 'ol/coordinate';

export class TextureMap extends TransformNode {
  name: string;
  scene?: Scene;
  layers: TileLayer<OSM>[];
  target: string;
  view: View;
  map: Map;
  container: HTMLElement;
  resolution: { width: number; height: number };
  texture: DynamicTexture;
  mesh: Mesh;
  context: Context;
  size: number;
  scaleLon: any;
  scaleLat: any;

  constructor(
    name: string,
    layers: TileLayer<OSM>[],
    view: View,
    resolution: { width: number; height: number },
    size: number,
    scene?: Scene,
  ) {
    super(name, scene, true);
    this.layers = layers;
    this.target = 'map2D';
    this.view = view;
    this.resolution = resolution;
    this.size = size;
    this.container = this.createContainer();
    this.map = this.createOLMap();
    this.texture = this.createTexture();
    this.context = this.texture.getContext();
    this.mesh = this.createMesh();
    let scale = this.createScales();
    this.scaleLon = (c: Coordinate) => scale[0](this.map.getPixelFromCoordinate(c)[0]);
    this.scaleLat = (c: Coordinate) => scale[1](this.map.getPixelFromCoordinate(c)[1]);
  }

  createContainer() {
    let container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.visibility = 'hidden';
    container.style.width = this.resolution.width + 'px';
    container.style.height = this.resolution.height + 'px';
    container.setAttribute('id', 'map2D');
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
    let mesh = this.mesh;
    let target = this.target;
    let container = this.container;
    let textureGround = new DynamicTexture(
      'mapTexture',
      { width: this.resolution.width, height: this.resolution.height },
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
    let ratio = this.resolution.width / this.resolution.height;

    let ground = MeshBuilder.CreateGround(
      this.name + '_mesh',
      { width: this.size * ratio, height: this.size, subdivisions: 25 },
      this.scene,
    );
    ground.setParent(this);
    let materialGround = new StandardMaterial(
      this.name + '_material',
      this.scene != undefined ? this.scene : undefined,
    );

    materialGround.diffuseTexture = this.texture;
    materialGround.specularColor = new Color3(0, 0, 0);
    ground.material = materialGround;

    return ground;
  }

  createScales() {
    useGeographic();
    let ratio = this.resolution.width / this.resolution.height;
    let width = this.size * ratio;
    let height = this.size;

    let scaleLon = scaleLinear()
      .domain([0, this.resolution.width])
      .range([-(width / 2), width / 2]);
    let scaleLat = scaleLinear()
      .domain([this.resolution.height, 0])
      .range([-(height / 2), height / 2]);

    return [scaleLon, scaleLat];
  }

  keyboardControls(scene: Scene) {
    scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          switch (kbInfo.event.key) {
            case 'a':
            case 'A':
              this.map
                .getView()
                .setCenter([this.map.getView().getCenter()![0] - 1, this.map.getView().getCenter()![1]]);
              break;
            case 'd':
            case 'D':
              this.map
                .getView()
                .setCenter([this.map.getView().getCenter()![0] + 1, this.map.getView().getCenter()![1]]);
              break;
            case 'w':
            case 'W':
              this.map
                .getView()
                .setCenter([this.map.getView().getCenter()![0], this.map.getView().getCenter()![1] + 1]);
              break;
            case 's':
            case 'S':
              this.map
                .getView()
                .setCenter([this.map.getView().getCenter()![0], this.map.getView().getCenter()![1] - 1]);
              break;
            case '=':
            case '+':
              this.map.getView().animate({
                zoom: this.map.getView().getZoom()! + 1,
                duration: 250,
              });
              break;
            case '-':
            case '_':
              this.map.getView().animate({
                zoom: this.map.getView().getZoom()! - 1,
                duration: 250,
              });
              break;
          }
          break;
      }
    });
    return this;
  }
}

export function createTextureMap(
  name: string,
  options: {
    layers?: TileLayer<any>[];
    view?: View;
    mapWidth?: number;
    mapHeight?: number;
    meshSize?: number;
  } = {},
  scene?: Scene,
) {
  const layers: TileLayer<any>[] = options.layers || [new TileLayer({ source: new OSM() })];
  const view: View = options.view || new View({ center: [0, 0], zoom: 1 });
  const mapWidth: number = options.mapWidth || 2000;
  const mapHeight: number = options.mapHeight || 1000;
  const meshSize: number = options.meshSize || 50;

  let map = new TextureMap(name, layers, view, { width: mapWidth, height: mapHeight }, meshSize, scene);

  return map;
}
