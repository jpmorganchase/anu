// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Mesh, Matrix, PlaneBlock, TransformNode, SubMesh, Material,VertexBuffer, Texture, BabylonFileLoaderConfiguration } from '@babylonjs/core';
import fnt from '../../assets/roboto-regular.json';
import png from '../../assets/roboto-regular.png';
import { createTextMesh } from 'babylon-msdf-text';
import assign from 'lodash-es/assign';

export interface PlaneTextOptions {
  text: string;
  font: any;
  atlas: any;
  align: 'left' | 'center' | 'right' ;
  vAlign: 'top' | 'middle' | 'bottom';
  color: Color3;
  strokeColor: Color3;
  strokeWidth: number,
  opacity: number;
  size: number;
}

export class PlaneText extends Mesh {
  name: string;
  scene: Scene;
  private options: PlaneTextOptions;

  constructor(name: string, options: PlaneTextOptions, scene: Scene) {
    super(name, scene);

    this.name = name;
    this.options = options;
    this.scene = scene ?? this.getScene();
    this.run();
  }

  public get text() {
    return this.options.text;
  }
  public set text(newText: string) {
    this.options.text = newText;
    this.run();
  }

  public get font() {
    return this.options.font;
  }
  public set font(newFont: any) {
    this.options.font = newFont;
    this.run();
  }

  public get atlas() {
    return this.options.atlas;
  }
  public set atlas(newAtlas: any) {
    this.options.atlas = newAtlas;
    this.run();
  }

  public get align() {
    return this.options.align;
  }
  public set align(newAlign: 'left' | 'center' | 'right') {
    this.options.align = newAlign;
    this.run();
  }

  public get vAlign() {
    return this.options.vAlign;
  }
  public set vAlign(newVAlign: 'top' | 'middle' | 'bottom') {
    this.options.vAlign = newVAlign;
    this.run();
  }

  public get color() {
    return this.options.color;
  }
  public set color(newColor: Color3) {
    this.options.color = newColor;
    this.run();
  }

  public get strokeColor() {
    return this.options.strokeColor;
  }
  public set strokeColor(newStrokeColor: Color3) {
    this.options.strokeColor = newStrokeColor;
    this.run();
  }

  public get strokeWidth() {
    return this.options.strokeWidth;
  }
  public set strokeWidth(newStrokeWidth: number) {
    this.options.strokeWidth = newStrokeWidth;
    this.run();
  }

  public get opacity() {
    return this.options.opacity;
  }
  public set opacity(newOpacity: number) {
    this.options.opacity = newOpacity;
    this.run();
  }

  public get size() {
    return this.options.size;
  }
  public set size(newSize: number) {
    this.options.size = newSize;
    this.run();
  }


  /**
   * Updates the PlaneText with new options.
   *
   * @param options An options object of the properties to change.
   */
  public updatePlaneText(options: PlaneTextOptions) {
    //Override the existing options object with any new options
    this.options = assign({}, this.options, options);
    this.run();
  }

  private run() {
    //Try to get the texture atlas for this font from the scene
    let texture = this.scene.getTextureByName(this.options.font.pages[0]);
    //If no texture was found with the specified name...
    if (!texture) {
      //Rename the passed in texture or create a new texture if only a URL was given
      texture = (this.options.atlas instanceof Texture) ? this.options.atlas : new Texture(this.options.atlas);
      texture.name = this.options.font.pages[0];
    }
    this.options.atlas = texture;
    
    let textMesh = createTextMesh(this.name, {
      text: this.options.text.toString(),
      font: this.options.font,
      atlas: this.options.atlas,
      align: this.options.align,
      color: this.options.color,
      strokeColor: this.options.strokeColor,
      strokeWidth: this.options.strokeWidth,
      opacity: this.options.opacity,
    }, this.scene);

    this.transferFromMesh(textMesh);
  }

  private transferFromMesh(sourceMesh: Mesh) {
    
    //Store and remove the parent, we will set this back later
    const originalParent = this.parent;
    this.parent = null;

    //Store the start position and rotation so that the PlaneText stays where it is
    const startPos = this.position;
    const startRot = this.rotation;

    //Copy the transform of the source mesh to ensure everything goes smoothly
    sourceMesh.computeWorldMatrix(true);
    this.position = sourceMesh.position;
    this.rotation = sourceMesh.rotation;
    this.scaling = sourceMesh.scaling;
    this.computeWorldMatrix(true);

    //Because TextMesh creates a new texture each time, we destroy the (soon to be previous) texture
    this.material?.dispose(true, false);

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
    sourceMesh.dispose(false, false);

    //Correct the scale and pivot point of the PlaneText so that it is easier to handle
    this.fixPivotAndScale();

    //Reset the PlaneText to its starting position
    this.position = startPos;
    this.rotation = startRot;

    //Restore the original parent
    this.parent = originalParent;
  }

  private fixPivotAndScale() {
    //Move the PlaneText such that the world origin aligns with where we want its new pivot point to be, and bake this new transform
    //babylon-msdf-text generates text at a 1:1 scale as the values found in font.common (e.g., lineHeight of 84 means the text is 84 units tall)
    const hAlignment = this.options.align === 'left' ? 0 : this.options.align === 'center' ? 1 : this.options.align === 'right' ? 2 : null;
    const xPos = -this.getBoundingInfo().boundingBox.center.x * hAlignment;
    const yPos = this.options.vAlign === 'top' ? -this.options.font.common.lineHeight :
                 this.options.vAlign === 'middle' ? -this.options.font.common.base + this.options.font.common.lineHeight / 2 :
                 this.options.vAlign === 'bottom' ? this.options.font.common.base : null;
    this.position = new Vector3(xPos, yPos, 0);
    this.bakeCurrentTransformIntoVertices();

    //Now we scale the PlaneText such that its height is a standard 1 unit tall
    const scale = 1 / this.options.font.common.lineHeight;
    this.scaling = new Vector3(this.scaling.x * scale, this.scaling.y * scale, 1);
    this.bakeCurrentTransformIntoVertices();
    this.computeWorldMatrix(true);

    //Set any user defined scaling
    this.scaling = new Vector3(this.options.size, this.options.size, this.options.size);
  }

  override dispose(doNotRecurse?: boolean, disposeMaterialAndTextures?: boolean): void {
    //Override the dispose function so that we can destroy the material as well
    this.material?.dispose(true, false);
    super.dispose(false, false);
  }
}

/**
 * Creates a new PlaneText prefab.
 *
 * @param name The name of this PlaneText.
 * @param options An options object of the PlaneText.
 * @param scene The target scene for the created PlaneText.
 */
export function createPlaneText(name: string, options: PlaneTextOptions, scene: Scene) {
  const ops = {
    text: options.text ?? "undefined",
    font: options.font ?? fnt,
    atlas: options.atlas ?? png,
    align: options.align ?? 'center',
    vAlign: options.vAlign ?? 'middle',
    color: options.color ?? Color3.White(),
    strokeColor: options.strokeColor ?? Color3.Black(),
    strokeWidth: options.strokeWidth ?? 0,
    opacity: options.opacity ?? 1,
    size: options.size ?? 1,
  };

  let plane = new PlaneText(name, ops, scene);
  return plane;
}