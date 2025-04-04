import { fragmentShader, setCustomAttributes, vertexShader } from "./utils";
import createIndices from "quad-indices";
import { createLayout } from "./TextLayout";
import vertices from "./vertices";
import {
  Color3,
  Effect,
  Mesh,
  ShaderMaterial,
  Texture,
  Vector3,
  VertexData,
} from "@babylonjs/core";

export const createTextMesh = ({
  color = new Color3(0, 0, 0),
  stroke,
  strokeColor = new Color3(0, 0, 0),
  opacity = 1,
  strokeWidth = 0.5,
  instancing = false,
  ...options
}) => {
  const layout = createLayout(options);

  const font = options.font;

  if (options.engine) {
    console.warn(
      "Warning: The engine argument is no longer required and will be ignored."
    );
  }

  if (!(options.atlas instanceof Texture)) {
    console.warn(
      "Please provide the atlas as texture instead of image so each text mesh won't have a seperate texture instance"
    );
  }

  const engine = options.scene.getEngine();

  // determine texture size from font file
  const texWidth = font.common.scaleW;
  const texHeight = font.common.scaleH;

  // get visible glyphs
  const glyphs = layout.glyphs.filter((glyph) => {
    const bitmap = glyph.data;
    return bitmap.width * bitmap.height > 0;
  });

  // const visibleGlyphs = glyphs;

  const attributes = vertices.attributes(
    glyphs,
    texWidth,
    texHeight,
    true,
    layout
  );

  const infos = vertices.infos(glyphs, layout);
  const indices = createIndices([], {
    clockwise: true,
    type: "uint16",
    count: glyphs.length,
  });

  const textMesh = new Mesh(options.text || "text", options.scene);

  const vertexData = new VertexData();

  vertexData.positions = attributes.positions;
  vertexData.indices = indices;
  vertexData.uvs = attributes.uvs;

  const normals = [];
  VertexData.ComputeNormals(attributes.positions, indices, normals);
  vertexData.normals = normals;

  setCustomAttributes({
    engine: engine,
    data: attributes.centers,
    kind: "center",
    stride: 2,
    mesh: textMesh,
  });

  setCustomAttributes({
    engine: engine,
    data: attributes.layoutUvs,
    kind: "layoutUv",
    stride: 2,
    mesh: textMesh,
  });

  setCustomAttributes({
    engine: engine,
    data: infos.lineIndex,
    kind: "lineIndex",
    stride: 1,
    mesh: textMesh,
  });

  setCustomAttributes({
    engine: engine,
    data: infos.lineLettersTotal,
    kind: "lineLettersTotal",
    stride: 1,
    mesh: textMesh,
  });

  setCustomAttributes({
    engine: engine,
    data: infos.lineLetterIndex,
    kind: "lineLetterIndex",
    stride: 1,
    mesh: textMesh,
  });

  setCustomAttributes({
    engine: engine,
    data: infos.lineWordsTotal,
    kind: "lineWordsTotal",
    stride: 1,
    mesh: textMesh,
  });

  setCustomAttributes({
    engine: engine,
    data: infos.lineWordIndex,
    kind: "lineWordIndex",
    stride: 1,
    mesh: textMesh,
  });

  setCustomAttributes({
    engine: engine,
    data: infos.wordIndex,
    kind: "wordIndex",
    stride: 1,
    mesh: textMesh,
  });
  setCustomAttributes({
    engine: engine,
    data: infos.letterIndex,
    kind: "letterIndex",
    stride: 1,
    mesh: textMesh,
  });

  vertexData.applyToMesh(textMesh);
  textMesh.scaling = new Vector3(0.5, 0.5, 0.5);

  textMesh.rotation.y = 0;
  textMesh.rotation.x = 3.14;

  Effect.ShadersStore["customVertexShader"] = vertexShader;

  Effect.ShadersStore["customFragmentShader"] = fragmentShader;

  const shaderMaterial = new ShaderMaterial(
    "shader",
    options.scene,
    {
      vertex: "custom",
      fragment: "custom",
    },

    {
      attributes: [
        "position",
        "normal",
        "uv",
        "center",
        "layoutUv",
        "lineIndex",
        "lineLettersTotal",
        "lineLetterIndex",
        "lineWordsTotal",
        "lineWordIndex",
        "wordIndex",
        "letterIndex",
      ],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "uColor",
        "uThreshold",
        "uStrokeOutsetWidth",
        "uStrokeInsetWidth",
        "uOpacity",
        "uAlphaTest",
        "uStrokeColor",
        "uLinesTotal",
        "uWordsTotal",
        "uLettersTotal",
      ],
      defines: [],
      needAlphaBlending: true,
    }
  );

  const mainTexture =
    options.atlas instanceof Texture
      ? options.atlas
      : new Texture(options.atlas, options.scene);
  shaderMaterial.setTexture("uFontAtlas", mainTexture);

  const uColor = new Color3(color.r, color.g, color.b);
  shaderMaterial.setColor3("uColor", uColor);

  const uStrokeColor = new Color3(strokeColor.r, strokeColor.g, strokeColor.b);
  shaderMaterial.setColor3("uStrokeColor", uStrokeColor);

  shaderMaterial.setFloat("uThreshold", 0.05);
  shaderMaterial.setFloat("uStrokeOutsetWidth", 0.0);
  shaderMaterial.setFloat("uStrokeInsetWidth", 0.3);
  shaderMaterial.setFloat("uOpacity", opacity);
  shaderMaterial.setFloat("uAlphaTest", 0.01);

  shaderMaterial.setInt("uLinesTotal", infos.linesTotal);
  shaderMaterial.setInt("uWordsTotal", infos.wordsTotal);
  shaderMaterial.setInt("uLettersTotal", infos.lettersTotal);

  shaderMaterial.backFaceCulling = false;

  textMesh.material = shaderMaterial;

  return textMesh;
};
