import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Grainient.css';

// Shader from the user-supplied React Bits Grainient component.
const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uLightMode;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,(1.0-S(v1,v0,tuv.y)));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  if(uLightMode>0.5){
    float energy=max(max(col.r,col.g),col.b);
    vec3 hue=col/max(energy,0.001);
    float chroma=length(col-vec3(dot(col,vec3(0.333333))));
    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);
    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);
  }

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

function createUniforms(settings) {
  const { color1, color2, color3, centerX, centerY, ...scalars } = settings;
  const uniforms = Object.fromEntries(Object.entries(scalars).map(([key, value]) => [
    `u${key[0].toUpperCase()}${key.slice(1)}`,
    { value: typeof value === 'boolean' ? Number(value) : value }
  ]));
  return {
    ...uniforms,
    iTime: { value: 0 },
    iResolution: { value: new Float32Array([1, 1]) },
    uCenterOffset: { value: new Float32Array([centerX, centerY]) },
    uColor1: { value: new Float32Array(hexToRgb(color1)) },
    uColor2: { value: new Float32Array(hexToRgb(color2)) },
    uColor3: { value: new Float32Array(hexToRgb(color3)) }
  };
}

export default function Grainient({
  color1 = '#050608', color2 = '#0b1420', color3 = '#142a43',
  timeSpeed = 0.12, colorBalance = 0, warpStrength = 0.8,
  warpFrequency = 5, warpSpeed = 1.2, warpAmplitude = 50,
  blendAngle = 15, blendSoftness = 0.18, rotationAmount = 380,
  noiseScale = 2, grainAmount = 0.04, grainScale = 2,
  grainAnimated = false, contrast = 1, gamma = 1, saturation = 0.85,
  centerX = 0, centerY = 0, zoom = 0.9, lightMode = false, className = '', enabled = true
}) {
  const containerRef = useRef(null);
  const contextRef = useRef(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  const settings = { color1, color2, color3, timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale, grainAmount, grainScale, grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom, lightMode };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const container = containerRef.current;
    let renderer;
    try {
      renderer = new Renderer({ webgl: 2, alpha: false, antialias: false, dpr: 1 });
      if (!renderer.isWebgl2) throw new Error('WebGL 2 unavailable');
    } catch {
      renderer?.gl?.getExtension('WEBGL_lose_context')?.loseContext();
      container.dataset.renderer = 'fallback';
      return;
    }
    const gl = renderer.gl;
    const canvas = gl.canvas;
    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex, fragment, uniforms: createUniforms(settingsRef.current), depthTest: false, depthWrite: false });
    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(canvas);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    let contextAvailable = true;
    let lastTime = 0;
    let lastDraw = 0;

    function draw() {
      if (!contextAvailable) return;
      renderer.render({ scene: mesh });
      container.dataset.renderer = 'ready';
    }
    function stop() { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    function loop(time) {
      frame = 0;
      if (!enabledRef.current || !visible || document.hidden || motion.matches || !contextAvailable) return;
      if (lastTime) program.uniforms.iTime.value += Math.min(time - lastTime, 100) / 1000;
      lastTime = time;
      // Soft, slow gradients do not need a full-resolution framebuffer.
      if (time - lastDraw >= 1000 / 24) { draw(); lastDraw = time; }
      frame = requestAnimationFrame(loop);
    }
    function wake() {
      if (enabledRef.current && visible && !document.hidden && !motion.matches && contextAvailable && !frame) frame = requestAnimationFrame(loop);
    }
    function resize() {
      const { width, height } = container.getBoundingClientRect();
      renderer.dpr = Math.min(window.devicePixelRatio || 1, 1, Math.sqrt(900000 / Math.max(width * height, 1)));
      renderer.setSize(Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)));
      program.uniforms.iResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]);
      draw();
    }
    function sync(values) {
      const uniforms = createUniforms(values);
      for (const [name, uniform] of Object.entries(uniforms)) {
        if (name !== 'iTime' && name !== 'iResolution') program.uniforms[name].value = uniform.value;
      }
      draw();
    }
    contextRef.current = { sync, syncEnabled: () => { stop(); wake(); } };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { draw(); wake(); }
      else stop();
    });
    intersectionObserver.observe(container);
    function visibility() { if (document.hidden) stop(); else wake(); }
    function motionChange() {
      stop();
      if (motion.matches) { program.uniforms.iTime.value = 0; draw(); }
      else wake();
    }
    function contextLost(event) {
      event.preventDefault();
      contextAvailable = false;
      stop();
      container.dataset.renderer = 'fallback';
    }
    canvas.addEventListener('webglcontextlost', contextLost);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', motionChange);
    resize();
    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', motionChange);
      canvas.removeEventListener('webglcontextlost', contextLost);
      geometry.remove();
      program.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
      contextRef.current = null;
    };
  }, []);

  useEffect(() => { contextRef.current?.syncEnabled(); }, [enabled]);

  useEffect(() => {
    contextRef.current?.sync(settingsRef.current);
  }, [color1, color2, color3, timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale, grainAmount, grainScale, grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom, lightMode]);

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} aria-hidden="true" />;
}
