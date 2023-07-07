import { DynamicTexture, StandardMaterial, MeshBuilder, Mesh } from '@babylonjs/core';
import { Scene } from '@babylonjs/core/scene';

export function text2d(
  name: string,
  options: {
    text?: string;
    size?: number;
    fontSize?: number;
    fontMod?: string;
    fontStyle?: string;
    fontColor?: string;
    backgroundColor?: string;
  },
  scene: Scene,
) {
  const text: string = options.text || 'undefined';
  const size: number = options.size || 1;
  const fontSize: number = options.fontSize || 25;
  const fontMod: string = options.fontMod || '';
  const fontStyle: string = options.fontStyle || 'Arial';
  const fontColor: string = options.fontColor || '#000000';
  const backgroundColor: string = options.backgroundColor || 'transparent';

  let font = fontMod + ' ' + fontSize + 'px ' + fontStyle;

  //Set height for plane
  var planeHeight = size;

  //Set height for dynamic texture
  var DTHeight = 1.5 * fontSize; //or set as wished

  //Calcultae ratio
  var ratio = planeHeight / DTHeight;

  //Use a temporay dynamic texture to calculate the length of the text on the dynamic texture canvas
  var temp = new DynamicTexture('DynamicTexture', 64, scene);
  var tmpctx = temp.getContext();
  tmpctx.font = font;
  var DTWidth = tmpctx.measureText(text).width + 8;

  //Calculate width the plane has to be
  var planeWidth = DTWidth * ratio;

  //Create dynamic texture and write the text
  var dynamicTexture = new DynamicTexture('DynamicTexture', { width: DTWidth, height: DTHeight }, scene, false);
  var mat = new StandardMaterial('text', scene);
  mat.diffuseTexture = dynamicTexture;
  mat.diffuseTexture.hasAlpha = true;
  dynamicTexture.drawText(text, null, null, font, fontColor, backgroundColor, true);

  //Create plane and set dynamic texture as material
  var plane = MeshBuilder.CreatePlane(name, { width: planeWidth, height: planeHeight }, scene);
  plane.material = mat;
  plane.billboardMode = Mesh.BILLBOARDMODE_ALL;

  return plane;
}
