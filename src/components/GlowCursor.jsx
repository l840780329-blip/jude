import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import './GlowCursor.css';

// Shaders supplied by the user from React Bits GlowCursor.
const MAX_POINTS = 64;

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

#define MAX_POINTS 64

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uTrailWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uNoiseStrength;
uniform float uNormalBlend;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

float sRGB(float x) {
  if (x <= 0.00031308) return 12.92 * x;
  return 1.055 * pow(x, 1.0 / 2.4) - 0.055;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float filmGrain(vec2 p, float time) {
  float frame = time * 18.0;
  float frameIndex = mod(floor(frame), 256.0);
  float nextFrameIndex = mod(frameIndex + 1.0, 256.0);
  float blend = fract(frame);
  blend = blend * blend * (3.0 - 2.0 * blend);
  vec2 pixel = floor(p);
  float current = hash(pixel + vec2(frameIndex * 17.0, frameIndex * 31.0));
  float next = hash(pixel + vec2(nextFrameIndex * 17.0, nextFrameIndex * 31.0));
  return mix(current, next, blend) * 2.0 - 1.0;
}

void main() {
  vec2 pixel = vUv * uResolution;
  float denominator = max(uPointCount - 1.0, 1.0);
  float strongest = 0.0;
  float strongestCore = 0.0;
  float colorWeight = 0.0;
  vec3 colorSum = vec3(0.0);

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    float index = float(i);
    if (index >= uPointCount - 1.0) break;
    float active = 1.0 - step(uPointCount - 1.0, index);
    vec2 start = uPoints[i];
    vec2 end = uPoints[i + 1];
    vec2 toPixel = pixel - start;
    vec2 segment = end - start;
    float along = clamp(dot(toPixel, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
    float progress = clamp((index + along) / denominator, 0.0, 1.0);
    float life = pow(max(1.0 - progress, 0.0), mix(0.55, 1.25, uTaper));
    float width = uTrailWidth * mix(1.0, 0.25, pow(progress, mix(0.55, 1.6, uTaper)));
    float distanceToTrail = length(toPixel - segment * along);
    float falloff = max(width * (0.8 + uGlowSpread * 1.4), 0.5);
    float beam = min(1.0, (falloff * falloff) / (distanceToTrail * distanceToTrail + falloff * falloff));
    float core = exp(-pow(distanceToTrail / max(width, 0.5), 2.0) * 2.5);
    float pulseAmount = min(abs(uPulseSpeed), 1.0);
    float pulse = 1.0 + sin(uTime * uPulseSpeed * 3.0 - progress * 11.0) * 0.16 * pulseAmount;
    float intensity = (core + beam * uGlowIntensity * 0.55) * life * pulse * active;
    vec3 segmentColor = mix(uColor, uSecondaryColor, progress);

    strongest = max(strongest, intensity);
    strongestCore = max(strongestCore, core * life * active);
    colorSum += segmentColor * intensity;
    colorWeight += intensity;
  }

  float grain = filmGrain(pixel, uTime);
  float noiseAmount = (1.0 - exp(-uNoiseStrength * 2.2)) * 0.4;
  float alpha = clamp(strongest * uOpacity * uFade, 0.0, 1.0);
  if (alpha < 0.0005) discard;

  vec3 color = colorSum / max(colorWeight, 0.0001);
  color = mix(color, vec3(1.0), smoothstep(0.25, 0.95, strongestCore) * uHotspot);
  float luminance = sRGB(clamp(strongest * uBrightness, 0.0, 1.0));
  luminance *= 1.0 + grain * noiseAmount;
  vec3 additiveColor = color * luminance;
  float normalAlpha = clamp(strongest * uBrightness * uOpacity * uFade, 0.0, 1.0);
  vec3 normalColor = mix(color, vec3(1.0), smoothstep(0.45, 1.0, strongestCore) * uHotspot * 0.35);
  gl_FragColor = vec4(mix(additiveColor, normalColor, uNormalBlend), mix(alpha, normalAlpha, uNormalBlend));
}
`;

const hexToRgb = hex => {
  let value = (hex || '').replace('#', '').trim();
  if (value.length === 3)
    value = value
      .split('')
      .map(char => char + char)
      .join('');
  const parsed = Number.parseInt(value || '000000', 16);
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function GlowCursor({
  color = '#67E8F9', secondaryColor = '#A78BFA', trailLength = 32,
  trailWidth = 6, trailTaper = 0.8, followSpeed = 0.18,
  glowIntensity = 1.6, glowSpread = 1.2, hotspot = 0.65,
  brightness = 1.15, opacity = 0.9, pulseSpeed = 1.1,
  noiseStrength = 0.035, idleFade = true, idleTimeout = 700,
  fadeDuration = 900, blendMode = 'screen', maxDevicePixelRatio = 1,
  enabled = true
}) {
  const containerRef = useRef(null);
  const propsRef = useRef(null);
  propsRef.current = { color, secondaryColor, trailLength, trailWidth, trailTaper, followSpeed, glowIntensity, glowSpread, hotspot, brightness, opacity, pulseSpeed, noiseStrength, idleFade, idleTimeout, fadeDuration, blendMode, enabled };

  useEffect(() => {
    const container = containerRef.current;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let cleanupActive = () => {};

    function start() {
      const canvas = document.createElement('canvas');
      canvas.className = 'glow-cursor__canvas';
      let renderer;
      try {
        renderer = new Renderer({ canvas, alpha: true, antialias: false, depth: false, dpr: Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio) });
      } catch { return () => {}; }
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      // OGL recognizes a packed uniform array through Array.isArray.
      const pointData = Array(MAX_POINTS * 2).fill(0);
      const points = Array.from({ length: MAX_POINTS }, () => ({ x: 0, y: 0 }));
      const target = { x: 0, y: 0 };
      const head = { x: 0, y: 0 };
      const config = propsRef.current;
      const program = new Program(gl, {
        vertex: VERTEX_SHADER, fragment: FRAGMENT_SHADER,
        uniforms: {
          uResolution: { value: [1, 1] }, uPoints: { value: pointData },
          uPointCount: { value: config.trailLength },
          uColor: { value: hexToRgb(config.color) }, uSecondaryColor: { value: hexToRgb(config.secondaryColor) },
          uTrailWidth: { value: config.trailWidth }, uTaper: { value: config.trailTaper },
          uGlowIntensity: { value: config.glowIntensity }, uGlowSpread: { value: config.glowSpread },
          uHotspot: { value: config.hotspot }, uBrightness: { value: config.brightness },
          uOpacity: { value: config.opacity }, uPulseSpeed: { value: config.pulseSpeed },
          uNoiseStrength: { value: config.noiseStrength }, uNormalBlend: { value: config.blendMode === 'normal' ? 1 : 0 },
          uTime: { value: 0 }, uFade: { value: 0 }
        }, transparent: true, depthTest: false, depthWrite: false
      });
      const geometry = new Triangle(gl);
      const mesh = new Mesh(gl, { geometry, program });
      container.appendChild(canvas);
      let width = 1, height = 1, frame = 0, fade = 0;
      let initialized = false, pointerInside = false, destroyed = false, contextAvailable = true;
      let lastInputTime = 0, lastFrameTime = 0;
      let previousBounds = null;

      function clear(bounds = null) {
        if (!contextAvailable) return;
        if (bounds) {
          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(...bounds);
        } else gl.disable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);
      }
      function reset() {
        cancelAnimationFrame(frame);
        frame = 0;
        fade = 0;
        initialized = false;
        pointerInside = false;
        container.dataset.visible = 'false';
        clear();
        previousBounds = null;
      }
      function resize() {
        width = Math.max(container.clientWidth, 1);
        height = Math.max(container.clientHeight, 1);
        renderer.setSize(width, height);
        program.uniforms.uResolution.value = [width, height];
        reset();
      }
      function initialize(x, y) {
        Object.assign(target, { x, y });
        Object.assign(head, { x, y });
        points.forEach(point => Object.assign(point, { x, y }));
        initialized = true;
        fade = 1;
      }
      function wake() {
        if (!frame && contextAvailable && !document.hidden && !destroyed) {
          lastFrameTime = performance.now();
          frame = requestAnimationFrame(render);
        }
      }
      function move(event) {
        if (event.pointerType !== 'mouse' || !propsRef.current.enabled) return;
        const x = clamp(event.clientX, 0, width);
        const y = clamp(height - event.clientY, 0, height);
        if (!initialized || fade < 0.001) initialize(x, y);
        Object.assign(target, { x, y });
        pointerInside = true;
        lastInputTime = performance.now();
        wake();
      }
      function leave() { pointerInside = false; wake(); }
      function keyboard(event) { if (event.key === 'Tab') reset(); }
      function visibility() { if (document.hidden) reset(); }

      function render(now) {
        frame = 0;
        if (destroyed || !contextAvailable || document.hidden) return;
        const config = propsRef.current;
        const delta = Math.min((now - lastFrameTime) / 16.667, 3);
        lastFrameTime = now;
        const count = clamp(Math.round(config.trailLength), 2, MAX_POINTS);
        const headEase = 1 - Math.pow(1 - clamp(config.followSpeed, 0.01, 0.99), delta);
        const chainBase = clamp(0.28 + config.followSpeed * 0.35, 0.08, 0.92);
        const chainEase = 1 - Math.pow(1 - chainBase, delta);
        head.x += (target.x - head.x) * headEase;
        head.y += (target.y - head.y) * headEase;
        Object.assign(points[0], head);
        for (let index = 1; index < count; index++) {
          points[index].x += (points[index - 1].x - points[index].x) * chainEase;
          points[index].y += (points[index - 1].y - points[index].y) * chainEase;
        }
        for (let index = 0; index < count; index++) {
          pointData[index * 2] = points[index].x;
          pointData[index * 2 + 1] = points[index].y;
        }
        const shouldFade = config.idleFade && (!pointerInside || now - lastInputTime > config.idleTimeout);
        const fadeTarget = initialized && config.enabled && !shouldFade ? 1 : 0;
        fade += (fadeTarget - fade) * (1 - Math.exp(-16.667 * delta * 5 / Math.max(config.fadeDuration, 16)));
        if (fade < 0.001 && fadeTarget === 0) { reset(); return; }
        const uniforms = program.uniforms;
        uniforms.uPointCount.value = count;
        uniforms.uColor.value = hexToRgb(config.color);
        uniforms.uSecondaryColor.value = hexToRgb(config.secondaryColor);
        uniforms.uTrailWidth.value = Math.max(config.trailWidth, 0.1);
        uniforms.uTaper.value = clamp(config.trailTaper, 0, 1);
        uniforms.uGlowIntensity.value = Math.max(config.glowIntensity, 0);
        uniforms.uGlowSpread.value = Math.max(config.glowSpread, 0);
        uniforms.uHotspot.value = clamp(config.hotspot, 0, 1);
        uniforms.uBrightness.value = Math.max(config.brightness, 0);
        uniforms.uOpacity.value = clamp(config.opacity, 0, 1);
        uniforms.uPulseSpeed.value = config.pulseSpeed;
        uniforms.uNoiseStrength.value = clamp(config.noiseStrength, 0, 1);
        uniforms.uNormalBlend.value = config.blendMode === 'normal' ? 1 : 0;
        uniforms.uTime.value = now / 1000;
        uniforms.uFade.value = fade;

        // Shade only the trail and its halo, instead of every screen pixel.
        const margin = Math.max(90, config.trailWidth * (0.8 + config.glowSpread * 1.4) * 16);
        let left = width, right = 0, bottom = height, top = 0;
        for (let index = 0; index < count; index++) {
          left = Math.min(left, points[index].x); right = Math.max(right, points[index].x);
          bottom = Math.min(bottom, points[index].y); top = Math.max(top, points[index].y);
        }
        left = Math.max(0, left - margin); right = Math.min(width, right + margin);
        bottom = Math.max(0, bottom - margin); top = Math.min(height, top + margin);
        const ratioX = gl.drawingBufferWidth / width;
        const ratioY = gl.drawingBufferHeight / height;
        // Only the previous trail region contains pixels that need clearing.
        clear(previousBounds);
        gl.enable(gl.SCISSOR_TEST);
        const currentBounds = [Math.floor(left * ratioX), Math.floor(bottom * ratioY), Math.ceil((right - left) * ratioX), Math.ceil((top - bottom) * ratioY)];
        gl.scissor(...currentBounds);
        renderer.render({ scene: mesh, clear: false });
        gl.disable(gl.SCISSOR_TEST);
        previousBounds = currentBounds;
        container.dataset.visible = 'true';
        frame = requestAnimationFrame(render);
      }
      function contextLost(event) {
        event.preventDefault();
        contextAvailable = false;
        reset();
      }
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('blur', reset);
      document.documentElement.addEventListener('pointerleave', leave);
      document.addEventListener('keydown', keyboard);
      document.addEventListener('visibilitychange', visibility);
      canvas.addEventListener('webglcontextlost', contextLost);
      resize();
      return () => {
        destroyed = true;
        reset();
        observer.disconnect();
        window.removeEventListener('pointermove', move);
        window.removeEventListener('blur', reset);
        document.documentElement.removeEventListener('pointerleave', leave);
        document.removeEventListener('keydown', keyboard);
        document.removeEventListener('visibilitychange', visibility);
        canvas.removeEventListener('webglcontextlost', contextLost);
        geometry.remove();
        program.remove();
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        canvas.remove();
      };
    }
    function syncMedia() {
      cleanupActive();
      cleanupActive = enabled && media.matches ? start() : () => {};
    }
    syncMedia();
    media.addEventListener('change', syncMedia);
    return () => { media.removeEventListener('change', syncMedia); cleanupActive(); };
  }, [enabled, maxDevicePixelRatio]);

  return <div ref={containerRef} className="glow-cursor" data-visible="false" aria-hidden="true" style={{ mixBlendMode: blendMode }} />;
}
