// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { scaleLinear } from 'd3';
import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { OSM, TileDebug } from 'ol/source';
import { useGeographic } from 'ol/proj';
import {
  MeshBuilder,
  Color3,
  StandardMaterial,
  DynamicTexture,
  Scene,
  Mesh,
  KeyboardEventTypes,
  Vector2,
  Vector3,
  AxesViewer,
} from '@babylonjs/core';
import { Context } from 'vm';
import { Coordinate } from 'ol/coordinate';
import TileSource from 'ol/source/Tile';
import { scale } from 'ol/size';

export class textureGlobe {
  name: string;
  scene: Scene;
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
  coordToVec: Function;

  constructor(name: string, scene: Scene, layers: TileLayer<OSM>[], view: View, resolution: Vector2, diameter: number) {
    this.name = name;
    this.scene = scene;
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
    this.coordToVec = this.createScales;
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
    let mesh = this.mesh;
    let target = this.target;
    let container = this.container;
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
    let globe = MeshBuilder.CreateSphere(this.name, { diameter: this.diameter }, this.scene);
    globe.rotation.x = Math.PI;
    //globe.rotation.y = Math.PI / 2;
    const axes = new AxesViewer(this.scene, this.diameter + 1);
    axes.xAxis.parent = globe;
    axes.yAxis.parent = globe;
    axes.zAxis.parent = globe;
    let materialGlobe = new StandardMaterial(this.name + '_material', this.scene);

    materialGlobe.diffuseTexture = this.texture;
    materialGlobe.specularColor = new Color3(0, 0, 0);
    globe.material = materialGlobe;

    return globe;
  }

  createScales(c: Coordinate) {
    //useGeographic();

    let lon = ((180 - c[0]) * Math.PI) / 180; //+ 0.40907504363002;
    let lat = ((c[1] - 90) * Math.PI) / 180; //+ 0.40907504363002;

    let r = this.diameter / 2;

    let x = r * Math.cos(lat) * Math.cos(lon);
    let y = r * Math.cos(lat) * Math.sin(lon);
    let z = r * Math.sin(lat);

    return new Vector3(x, y, z);
  }

  keyboardControls() {
    this.scene.onKeyboardObservable.add((kbInfo) => {
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

export function createTextureGlobe(
  name: string,
  options: {
    layers?: TileLayer<any>[];
    view?: View;
    resolution?: Vector2;
    diameter: number;
  },
  scene: Scene,
) {
  const layers: TileLayer<any>[] = options.layers || [
    new TileLayer({ source: new OSM(), extent: [-180, -90, 180, 90] }),
    new TileLayer({
      source: new TileDebug(),
    }),
  ];
  const view: View =
    options.view ||
    new View({
      projection: 'EPSG:4326',
      extent: [-180, -90, 180, 90],
      center: [0, 0],
      zoom: 0,
      resolution: 40000,
    });

  const resolution: Vector2 = options.resolution || new Vector2(1000, 500);
  const diameter: number = options.diameter || 1;

  let map = new textureGlobe(name, scene, layers, view, resolution, diameter);

  return map;
}
