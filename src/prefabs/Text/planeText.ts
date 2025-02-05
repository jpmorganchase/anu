// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, PlaneBlock, TransformNode, SubMesh, Material,VertexBuffer, Texture } from '@babylonjs/core';
import fnt from '../../assets/roboto-regular.json';
import png from '../../assets/roboto-regular.png';
import { createTextMesh } from 'babylon-msdf-text';
import assign from 'lodash-es/assign';

interface planeTextOptions {
  text: string;
  size: number;
  font: any;
  atlas: any;
  opacity: number;
  align: 'left' | 'right' | 'center';
  color: Color3;
  fontHeight: number;
}

export class PlaneText extends Mesh {
  name: string;
  options: planeTextOptions;
  scene: Scene;
  static textures: {} = {};

  constructor(name: string, options: planeTextOptions, scene: Scene) {
    super(name, scene);

    if (options.fontHeight === undefined) {
      //Set the known font height of the default height, otherwise search for it in the font's json
      options.fontHeight = (options.font.pages[0] !== "roboto-regular.png") ? Math.max(...fnt.chars.map(c => c.height)) : 84;
    }

    this.name = name;
    this.options = options;
    this.scene = scene || this.getScene();
    this.run();
  }

  /**
   * Updates the PlaneText with new options.
   *
   * @param options An options object of the properties to change.
   */
  public updatePlaneText(options: planeTextOptions) {
    //Override the existing options object with any new options
    this.options = assign({}, this.options, options);
    this.run();
  }

  run() {
    if (!(this.options.atlas instanceof Texture)) {
      //If there is a texture atlas for this font, retrieve it
      if (PlaneText.textures[this.options.font.pages[0]]) {
        this.options.atlas = PlaneText.textures[this.options.font.pages[0]];
      }
      //Otherwise create a new one and store it
      else {
        const texture = new Texture(this.options.atlas);
        this.options.atlas = texture
        PlaneText.textures[this.options.font.pages[0]] = texture;
      }
    }
    
    let textMesh = createTextMesh({
      text: this.options.text.toString(),
      color: this.options.color,
      opacity: this.options.opacity,
      align: this.options.align,
      font: this.options.font,
      scene: this.scene,
      atlas: this.options.atlas,
      lineHeight: 1,
      fontHeight: this.options.fontHeight
    });
    
    this.transferFromMesh(textMesh);
  }


  transferFromMesh(sourceMesh: Mesh) {
    //Store the start position and rotation so that the PlaneText stays where it is
    const startPos = this.position;
    const startRot = this.rotation;

    //Copy the transform of the source mesh to ensure everything goes smoothly
    sourceMesh.computeWorldMatrix(true);
    this.position = sourceMesh.position;
    this.rotation = sourceMesh.rotation;
    this.scaling = sourceMesh.scaling;
    this.computeWorldMatrix(true);

    //Declare variables which store the source mesh's data
    let arrayPos, arrayNormal, arrayIndice, arrayUv, arrayUv2, arrayColor, arrayMatricesIndices, arrayMatricesWeights;

    //Retrieve the data from the source mesh
    arrayPos = sourceMesh.getVerticesData(VertexBuffer.PositionKind);
    arrayNormal = sourceMesh.getVerticesData(VertexBuffer.NormalKind);
    arrayIndice = sourceMesh.getIndices();
    //Retrieve these data only if they are present
    if (sourceMesh.isVerticesDataPresent(VertexBuffer.UVKind)) arrayUv = sourceMesh.getVerticesData(VertexBuffer.UVKind);
    if (sourceMesh.isVerticesDataPresent(VertexBuffer.UV2Kind)) arrayUv2 = sourceMesh.getVerticesData(VertexBuffer.UV2Kind);
    if (sourceMesh.isVerticesDataPresent(VertexBuffer.ColorKind)) arrayColor = sourceMesh.getVerticesData(VertexBuffer.ColorKind);
    if (sourceMesh.isVerticesDataPresent(VertexBuffer.MatricesIndicesKind)) arrayMatricesIndices = sourceMesh.getVerticesData(VertexBuffer.MatricesIndicesKind);
    if (sourceMesh.isVerticesDataPresent(VertexBuffer.MatricesWeightsKind)) arrayMatricesWeights = sourceMesh.getVerticesData(VertexBuffer.MatricesWeightsKind);

    //Set the data on this mesh
    this.setVerticesData(VertexBuffer.PositionKind, arrayPos, false);
    this.setVerticesData(VertexBuffer.NormalKind, arrayNormal, false);
    this.setIndices(arrayIndice);
    if (arrayUv) this.setVerticesData(VertexBuffer.UVKind, arrayUv, false);
    if (arrayUv2) this.setVerticesData(VertexBuffer.UV2Kind, arrayUv2, false);
    if (arrayColor) this.setVerticesData(VertexBuffer.ColorKind, arrayColor, false);
    if (arrayMatricesIndices) this.setVerticesData(VertexBuffer.MatricesIndicesKind, arrayMatricesIndices, false);
    if (arrayMatricesWeights) this.setVerticesData(VertexBuffer.MatricesWeightsKind, arrayMatricesWeights, false);
    this.material = sourceMesh.material;

    //Destroy the source mesh
    sourceMesh.dispose();

    //Correct the scale and pivot point of the PlaneText so that it is easier to handle
    this.fixScaleAndPivot();

    //Reset the PlaneText to its starting positiojn
    this.position = startPos;
    this.rotation = startRot;
  }

  fixScaleAndPivot() {
    this.computeWorldMatrix(true);

    //Scale is based on the fontHeight declared in the fonts json file
    const scale = 1 / this.options.fontHeight;
    this.scaling.scaleInPlace(scale);

    let alignment =
      this.options.align == 'left' ? 0 : this.options.align == 'center' ? 1 : this.options.align == 'right' ? 2 : null;

    //Move the PlaneText such that the world origin aligns with where we want its new pivot point to be, and bake this new transform
    const boundingBox = this.getBoundingInfo().boundingBox;
    this.position = new Vector3(-boundingBox.center.x * this.scaling.x * alignment, -(boundingBox.center.y + boundingBox.extendSize.y) * this.scaling.y, 0);
    this.bakeCurrentTransformIntoVertices();
    this.computeWorldMatrix(true);

    this.scaling = new Vector3(this.options.size, this.options.size, this.options.size);
  }
}

/**
 * Creates a new PlaneText prefab.
 *
 * @param name The name of this PlaneText.
 * @param options An options object of the PlaneText.
 * @param scene The target scene for the created PlaneText.
 */
export function createPlaneText(name: string, options: planeTextOptions, scene: Scene) {
  const ops = {
    text: options.text || "undefined",
    size: options.size || 1,
    opacity: options.opacity || 1,
    align: options.align || 'center',
    color: options.color || Color3.White(),
    font: options.font || fnt,
    atlas: options.atlas || png,
    fontHeight: options.fontHeight || undefined
  };
  
  let plane = new PlaneText(name, ops, scene);
  return plane;
}