import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";


// Responsive detection
function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function RoomModel({ modelPath, autoRotate, scale }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === "Wall_01" || child.name.includes("Ceiling")) {
        child.visible = false;
      }
    });
  }, [scene]);

return (
    <Canvas camera={{ position: [0, 1.2, 1.5], fov: 60 }} style={{ height: 400 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} />
      <primitive object={scene} scale={scale} rotation={[0, Math.PI, 0]} />
      <OrbitControls enableZoom autoRotate={autoRotate} target={[0, 1, 0]} />
    </Canvas>
  );
}

// Simple button
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

// Main Visualizer
export default function RoomVisualizer() {
  const [autoRotate, setAutoRotate] = useState(true);
  const isMobile = useMobile();

  return (
    <div className="relative w-full h-[500px] md:h-[700px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Title */}
      <div className="absolute top-10 w-full text-center z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Room Visualizer</h2>
      </div>

      {/* Model Viewer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-[400px]">
          <Suspense fallback={<div className="text-white text-center">Loading model...</div>}>
            <RoomModel
              modelPath="/assets/3d/bathroom_interior.glb"
              autoRotate={autoRotate}
              scale={isMobile ? 0.8 : 1}
            />
          </Suspense>
        </div>
      </div>

      {/* Rotation toggle */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button onClick={() => setAutoRotate(!autoRotate)}>
          {autoRotate ? "Stop Rotation" : "Start Rotation"}
        </Button>
      </div>

      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}

// Preload model
useGLTF.preload("/assets/3d/bathroom_interior.glb");