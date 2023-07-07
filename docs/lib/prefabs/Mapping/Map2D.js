import * as d3 from 'd3';
import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { OSM } from 'ol/source';
import { useGeographic } from 'ol/proj';
import { MeshBuilder, Color3, StandardMaterial, DynamicTexture, KeyboardEventTypes } from '@babylonjs/core';
export class Map2D {
    constructor(name, scene, layers, view, resolution, size) {
        this.name = name;
        this.scene = scene;
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
        this.scaleLon = scale[0];
        this.scaleLat = scale[1];
    }
    createContainer() {
        let container = document.createElement("div");
        container.style.position = 'fixed';
        container.style.visibility = 'hidden';
        container.style.width = this.resolution.width + "px";
        container.style.height = this.resolution.height + "px";
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
        let textureGround = new DynamicTexture("mapTexture", { width: this.resolution.width, height: this.resolution.height }, scene);
        this.map.on("postrender", function () {
            var mapContainer = document.getElementById(target);
            var mapCanvas = mapContainer.getElementsByTagName('canvas')[0];
            textureGround.getContext().drawImage(mapCanvas, 0, 0);
            textureGround.update();
        });
        return textureGround;
    }
    createMesh() {
        let ratio = this.resolution.width / this.resolution.height;
        let ground = MeshBuilder.CreateGround(this.name, { width: this.size * ratio, height: this.size, subdivisions: 25 }, this.scene);
        let materialGround = new StandardMaterial(this.name + "_material", this.scene);
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
        let scaleLon = d3.scaleLinear().domain([0, this.resolution.width]).range([-(width / 2), width / 2]);
        let scaleLat = d3.scaleLinear().domain([0, this.resolution.height]).range([-(height / 2), height / 2]);
        return [scaleLon, scaleLat];
    }
    keyboardControls() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    switch (kbInfo.event.key) {
                        case "a":
                        case "A":
                            this.map.getView().setCenter([this.map.getView().getCenter()[0] - 1, this.map.getView().getCenter()[1]]);
                            break;
                        case "d":
                        case "D":
                            this.map.getView().setCenter([this.map.getView().getCenter()[0] + 1, this.map.getView().getCenter()[1]]);
                            break;
                        case "w":
                        case "W":
                            this.map.getView().setCenter([this.map.getView().getCenter()[0], this.map.getView().getCenter()[1] + 1]);
                            break;
                        case "s":
                        case "S":
                            this.map.getView().setCenter([this.map.getView().getCenter()[0], this.map.getView().getCenter()[1] - 1]);
                            break;
                        case "s":
                        case "S":
                            this.map.getView().setCenter([this.map.getView().getCenter()[0], this.map.getView().getCenter()[1] - 1]);
                            break;
                        case "=":
                        case "+":
                            this.map.getView().animate({
                                zoom: this.map.getView().getZoom() + 1,
                                duration: 250
                            });
                            break;
                        case "-":
                        case "_":
                            this.map.getView().animate({
                                zoom: this.map.getView().getZoom() - 1,
                                duration: 250
                            });
                            break;
                    }
                    break;
            }
        });
        return this;
    }
}
export function createMap2D(name, scene) {
    let layers = [
        new TileLayer({
            source: new OSM(),
        })
    ];
    let view = new View({
        center: [0, 0],
        zoom: 1,
    });
    let map = new Map2D(name, scene, layers, view, { width: 2000, height: 1000 }, 50);
    return map;
}
