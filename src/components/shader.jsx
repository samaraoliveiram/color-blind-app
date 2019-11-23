import React from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import colorScales from "../filter/shader/colorblind.frag";
export { colorScales };

const shaders = Shaders.create({
  colorify: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D children, colorScale;
float greyscale (vec3 c) { return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b; }
void main() {
  vec4 original = texture2D(children, uv);
  vec4 newcolor = texture2D(colorScale, vec2(greyscale(original.rgb), 0.5));
  gl_FragColor = vec4(newcolor.rgb, original.a * newcolor.a);
}`
  }
});

const Colorify = () => {
  return (
    <Surface width={400} height={300}>
      <Node shader={shaders.colorify} />
    </Surface>
  );
};

export default Colorify;
