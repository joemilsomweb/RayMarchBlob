precision mediump float;

attribute vec4 position;
attribute vec2 uv;
uniform float time;
varying vec2 uvFrag;
//uniform mat4 projectionMatrix;


void main() {
    
    uvFrag = uv;

    gl_Position = vec4(position.xyz, 1.);
}