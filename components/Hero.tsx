"use client";

import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

/* ================= IMAGE REVEAL ================= */

function ImageReveal({ externalMouse, isActive, device }: any) {
  const materialRef = useRef<any>();
  const { viewport, size, gl } = useThree();

  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const activeRef = useRef(0);

  const textureBlueprint = useLoader(
    THREE.TextureLoader,
    `/images/${device}/blueprint.jpg`
  );

  const textureRender = useLoader(
    THREE.TextureLoader,
    `/images/${device}/render.jpg`
  );

  const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

  [textureBlueprint, textureRender].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = maxAnisotropy;
  });

  // ✅ PERFECT COVER SCALE
  const scale = useMemo(() => {
    if (!textureRender.image)
      return [viewport.width, viewport.height, 1] as const;

    const imageAspect =
      textureRender.image.width / textureRender.image.height;
    const viewportAspect = viewport.width / viewport.height;

    let scaleX = viewport.width;
    let scaleY = viewport.height;

    if (viewportAspect > imageAspect) {
      scaleY = viewport.width / imageAspect;
    } else {
      scaleX = viewport.height * imageAspect;
    }

    if (device === "desktop") return [scaleX, scaleY, 1];

    if (device === "ipad") {
      scaleX *= 0.88;
      scaleY *= 0.88;
    }

    if (device === "mobile") {
      scaleX *= 1;
      scaleY *= 1;
    }

    if (size.width >= 424 && size.width <= 520) {
      const factor = THREE.MathUtils.mapLinear(
        size.width,
        424,
        520,
        0.85,
        1
      );
      scaleX *= factor;
      scaleY *= factor;
    }

    return [scaleX, scaleY, 1] as const;
  }, [
    textureRender,
    viewport.width,
    viewport.height,
    device,
    size.width,
  ]);

  const uniforms = useMemo(
    () => ({
      uTexture1: { value: textureRender },
      uTexture2: { value: textureBlueprint },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uActive: { value: 0 },
      uIsActive: { value: 0 },
    }),
    [textureRender, textureBlueprint]
  );

  useFrame(() => {
    if (!materialRef.current) return;

    smoothMouse.current.lerp(externalMouse.current, 0.1);
    uniforms.uMouse.value.copy(smoothMouse.current);

    activeRef.current = THREE.MathUtils.lerp(
      activeRef.current,
      isActive.current ? 1 : 0,
      0.08
    );

    uniforms.uActive.value = activeRef.current;
    uniforms.uIsActive.value = isActive.current ? 1 : 0;

    uniforms.uTime.value += 0.02;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh scale={scale}>
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
          uniform float uIsActive;

          varying vec2 vUv;

          vec3 adjustContrast(vec3 color, float contrast) {
            return (color - 0.5) * contrast + 0.5;
          }

          void main() {
            vec2 uv = vUv;

            // Default render
            if (uIsActive < 0.5) {
              gl_FragColor = texture2D(uTexture1, uv);
              return;
            }

            // Distortion
            vec2 dir = uv - uMouse;
            float distRaw = length(dir);
            uv -= dir * 0.08 * exp(-distRaw * 6.0);

            // ✅ PERFECT CIRCLE (FINAL FIX)
            vec2 uvCorrected = (vUv - 0.5) * vec2(
              uResolution.x / uResolution.y,
              1.0
            ) + 0.5;

            vec2 mouseCorrected = (uMouse - 0.5) * vec2(
              uResolution.x / uResolution.y,
              1.0
            ) + 0.5;

            float dist = distance(uvCorrected, mouseCorrected);

            float radius = 0.24 * uActive;
            float mask = smoothstep(radius, radius - 0.04, dist);

            vec4 render = texture2D(uTexture1, uv);
            vec4 blueprint = texture2D(uTexture2, uv);

            vec4 color = mix(render, blueprint, mask);

            float contrastStrength = mix(1.0, 1.08, uActive);
            color.rgb = adjustContrast(color.rgb, contrastStrength);

            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            float saturationStrength = mix(1.0, 1.05, uActive);
            color.rgb = mix(vec3(gray), color.rgb, saturationStrength);

            vec2 pixel = 1.0 / uResolution;
            vec3 sharpSample =
                texture2D(uTexture1, uv + pixel * vec2(1.0, 0.0)).rgb +
                texture2D(uTexture1, uv + pixel * vec2(-1.0, 0.0)).rgb +
                texture2D(uTexture1, uv + pixel * vec2(0.0, 1.0)).rgb +
                texture2D(uTexture1, uv + pixel * vec2(0.0, -1.0)).rgb;

            vec3 sharpened = color.rgb * 2.0 - sharpSample * 0.25;
            color.rgb = mix(color.rgb, sharpened, 0.12 * uActive);

            float glow = smoothstep(radius, radius - 0.06, dist);
            color.rgb *= 1.0 - glow * 0.22 * uActive;

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

  const [device, setDevice] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ratio = w / h;

      const isTouch =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (ratio < 0.7) setDevice("mobile");
      else if (ratio <= 1.4 && isTouch) setDevice("ipad");
      else if (ratio <= 1.6 && isTouch) setDevice("tablet");
      else setDevice("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateMouse = (x: number, y: number) => {
    mouse.current.set(x, y);
  };

  let lastY = 0;

  if (!device) return null;

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
      onMouseLeave={() => (isActive.current = false)}
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

        if (deltaY < 12) {
          updateMouse(
            t.clientX / window.innerWidth,
            1 - t.clientY / window.innerHeight
          );
        }
      }}
      onTouchEnd={() => (isActive.current = false)}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ImageReveal
            key={device}
            device={device}
            externalMouse={mouse}
            isActive={isActive}
          />
        </Suspense>
      </Canvas>

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