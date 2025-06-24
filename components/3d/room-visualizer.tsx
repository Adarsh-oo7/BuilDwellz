"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// ✅ Mobile check hook
function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

// ✅ 3D Model Renderer
function RoomModel({ modelPath, autoRotate, scale }) {
  const { scene } = useGLTF(modelPath);

  return (
    <Canvas camera={{ position: [0, 1.2, 0.1], fov: 60 }} style={{ height: 400 }}>
      <color attach="background" args={["#f0f0f0"]} />

      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} />

      <primitive object={scene} scale={scale} rotation={[0, Math.PI / 2, 0]} />

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1, -1]} // ← Adjust to look inside
      />
    </Canvas>
  );
}


// ✅ Toggle Button
function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}

// ✅ Main Visualizer Component
export default function RoomVisualizer() {
  const [autoRotate, setAutoRotate] = useState(true);
  const isMobile = useMobile();

  return (
    <div className="relative w-full h-[500px] md:h-[700px] bg-white overflow-hidden">
      {/* Title */}
      <div className="absolute top-10 w-full text-center z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">Room Visualizer</h2>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-[400px]">
          <Suspense fallback={<div className="text-black text-center">Loading model...</div>}>
            <RoomModel
              modelPath="/assets/3d/bathroom_interior.glb"
              autoRotate={autoRotate}
              scale={isMobile ? 0.15 : 0.2} // Adjust based on model size
            />
          </Suspense>
        </div>
      </div>

      {/* Button */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button onClick={() => setAutoRotate(!autoRotate)}>
          {autoRotate ? "Stop Rotation" : "Start Rotation"}
        </Button>
      </div>
    </div>
  );
}

// ✅ Preload for performance
useGLTF.preload("/assets/3d/bathroom_interior.glb");
