"use client";

import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/* ================= IMAGE REVEAL ================= */

function ImageReveal({ externalMouse, isActive }: any) {
  const materialRef = useRef<any>();
  const { viewport, size, gl } = useThree();

  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const activeRef = useRef(0);

  // ✅ Load textures
  const [texture1, texture2] = useLoader(THREE.TextureLoader, [
    "/images/blueprint.jpg",
    "/images/render.jpg",
  ]);

  // ✅ High quality texture settings
  const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

  [texture1, texture2].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = maxAnisotropy;
  });

  const uniforms = useMemo(
    () => ({
      uTexture1: { value: texture1 },
      uTexture2: { value: texture2 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uActive: { value: 0 },
    }),
    [texture1, texture2]
  );

  useFrame(() => {
    if (!materialRef.current) return;

    // smooth mouse
    smoothMouse.current.lerp(externalMouse.current, 0.1);
    uniforms.uMouse.value.copy(smoothMouse.current);

    // smooth activation
    activeRef.current = THREE.MathUtils.lerp(
      activeRef.current,
      isActive.current ? 1 : 0,
      0.08
    );
    uniforms.uActive.value = activeRef.current;

    uniforms.uTime.value += 0.02;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />

      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture1;
          uniform sampler2D uTexture2;
          uniform vec2 uMouse;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform float uActive;

          varying vec2 vUv;

          vec3 adjustContrast(vec3 color, float contrast) {
            return (color - 0.5) * contrast + 0.5;
          }

          void main() {
            vec2 uv = vUv;

            // 🔥 magnetic distortion
            vec2 dir = uv - uMouse;
            float distRaw = length(dir);
            uv -= dir * 0.08 * exp(-distRaw * 6.0);

            // ✅ perfect circle
            float aspect = uResolution.x / uResolution.y;
            vec2 p = uv - uMouse;
            p.x *= aspect;

            float dist = length(p);
            float radius = 0.26 * uActive;

            float mask = smoothstep(radius, radius - 0.05, dist);

            vec4 render = texture2D(uTexture1, uv);
            vec4 blueprint = texture2D(uTexture2, uv);

            vec4 color = mix(blueprint, render, mask);

            // 🔥 balanced contrast (reduced)
            float contrastStrength = mix(1.0, 1.08, uActive);
            color.rgb = adjustContrast(color.rgb, contrastStrength);

            // 🔥 balanced saturation (reduced)
            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            float saturationStrength = mix(1.0, 1.05, uActive);
            color.rgb = mix(vec3(gray), color.rgb, saturationStrength);

            // 🔥 subtle sharpening (reduced a lot)
            vec2 pixel = 1.0 / uResolution;
            vec3 sharpSample =
                texture2D(uTexture1, uv + pixel * vec2(1.0, 0.0)).rgb +
                texture2D(uTexture1, uv + pixel * vec2(-1.0, 0.0)).rgb +
                texture2D(uTexture1, uv + pixel * vec2(0.0, 1.0)).rgb +
                texture2D(uTexture1, uv + pixel * vec2(0.0, -1.0)).rgb;

            vec3 sharpened = color.rgb * 2.0 - sharpSample * 0.25;
            color.rgb = mix(color.rgb, sharpened, 0.12 * uActive);

            // 🔥 softer dark glow (reduced)
            float glow = smoothstep(radius, radius - 0.06, dist);
            color.rgb *= 1.0 - glow * 0.22 * uActive;

            // vignette
            float vignette = smoothstep(0.9, 0.3, length(vUv - 0.5));
            color.rgb *= vignette;

            gl_FragColor = color;
          }
        `}
      />
    </mesh>
  );
}

/* ================= HERO ================= */

export default function HeroShader() {
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const isActive = useRef(false);

  const updateMouse = (x: number, y: number) => {
    mouse.current.set(x, y);
  };

  let lastY = 0;

  return (
    <section
      className="w-full h-screen relative overflow-hidden"
      style={{ touchAction: "pan-y" }}
      onMouseMove={(e) => {
        isActive.current = true;
        updateMouse(
          e.clientX / window.innerWidth,
          1 - e.clientY / window.innerHeight
        );
      }}
      onMouseLeave={() => {
        isActive.current = false;
      }}
      onTouchStart={(e) => {
        isActive.current = true;
        const t = e.touches[0];
        lastY = t.clientY;

        updateMouse(
          t.clientX / window.innerWidth,
          1 - t.clientY / window.innerHeight
        );
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];

        const deltaY = Math.abs(t.clientY - lastY);
        lastY = t.clientY;

        // allow scroll
        if (deltaY < 12) {
          updateMouse(
            t.clientX / window.innerWidth,
            1 - t.clientY / window.innerHeight
          );
        }
      }}
      onTouchEnd={() => {
        isActive.current = false;
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ImageReveal externalMouse={mouse} isActive={isActive} />
        </Suspense>
      </Canvas>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          BuilDwellz
        </h1>
        <p className="mt-4 text-lg opacity-70">
          Designing Dreams, Building Reality
        </p>
      </div>
    </section>
  );
}