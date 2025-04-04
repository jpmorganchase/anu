import { VertexBuffer } from "@babylonjs/core";

export const setCustomAttributes = ({ engine, data, kind, stride, mesh }) => {
  const buffer = new VertexBuffer(engine, data, kind, true, false, stride);

  mesh.setVerticesBuffer(buffer);
};

export const vertexShader = `
precision highp float; 

attribute vec3 position; 
attribute vec2 uv; 
attribute vec2 center; 

uniform mat4 worldViewProjection; 

varying vec2 vUv;
varying vec2 vCenter; 

void main(void) { 

  gl_Position = worldViewProjection * vec4(position, 1.0); 
  vUv = uv; 
  vCenter = center;
}
`;
export const fragmentShader = `
precision highp float;

varying vec2 vUv; 
varying vec2 vCenter; 

uniform sampler2D uFontAtlas;

uniform vec3 uStrokeColor;
uniform vec3 uColor;

uniform float uThreshold;
uniform float uStrokeOutsetWidth;
uniform float uStrokeInsetWidth;
uniform float  uOpacity;
uniform float uAlphaTest;

uniform int uLinesTotal;
uniform int uWordsTotal;
uniform int uLettersTotal;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}


void main(void) { 

  float thickness = 0.5;
  float softness = 0.5;

  vec3 s = texture2D(uFontAtlas, vUv).rgb;
  float sigDist = median(s.r, s.g, s.b) - 0.5;
  float afwidth = 1.4142135623730951 / 2.0;

  #ifdef IS_SMALL
  float alpha = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDist);
  #else
  float alpha = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
  #endif
  
  float sigDistOutset = sigDist + uStrokeOutsetWidth * 0.5;
  
  // Inset
  float sigDistInset = sigDist - uStrokeInsetWidth * 0.5;
  
  #ifdef IS_SMALL
  float outset = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistOutset);
  float inset = 1.0 - smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistInset);
  #else
  float outset = clamp(sigDistOutset / fwidth(sigDistOutset) + 0.5, 0.0, 1.0);
  float inset = 1.0 - clamp(sigDistInset / fwidth(sigDistInset) + 0.5, 0.0, 1.0);
  #endif
  
  float border = outset * inset;
  
  // Alpha Test
  if (alpha < uAlphaTest) discard;

  // Output: Common
  vec4 filledFragColor = vec4(uColor, uOpacity * alpha);
  
  // Output: Strokes
  vec4 strokedFragColor = vec4(uStrokeColor, uOpacity * border);
  
  gl_FragColor = filledFragColor; 
}
`;
