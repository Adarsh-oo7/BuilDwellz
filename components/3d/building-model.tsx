"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, Float } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

function Model(props: any) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Use a dummy model if the real one fails to load
  const { scene } = useGLTF(
    "/assets/3d/bathroom_interior.glb",
    undefined,
    (e) => {
      console.error("Error loading 3D model:", e)
      setError(true)
    },
    () => {
      setModelLoaded(true)
    },
  )

  const ref = useRef<any>()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  if (error) {
    return (
      <Html center>
        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center">
          <p className="text-foreground">Failed to load 3D model</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please check your internet connection and refresh the page
          </p>
        </div>
      </Html>
    )
  }

  return <primitive ref={ref} object={scene} {...props} />
}

function Fallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg text-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-foreground font-medium">Loading 3D Model...</p>
        <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
      </div>
    </Html>
  )
}

export default function BuildingModel() {
  const [autoRotate, setAutoRotate] = useState(true)
  const isMobile = useMobile()

  return (
    <div className="relative w-full h-[500px] md:h-[700px]">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={<Fallback />}>
          <Float speed={1.5} rotationIntensity={autoRotate ? 0.2 : 0} floatIntensity={autoRotate ? 0.5 : 0}>
            <Model scale={isMobile ? 0.8 : 1} position={[0, -1, 0]} />
          </Float>
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={20} blur={1.5} far={4.5} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 right-4"
      >
        <Button
          onClick={() => setAutoRotate(!autoRotate)}
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
        >
          {autoRotate ? "Stop Rotation" : "Start Rotation"}
        </Button>
      </motion.div>
    </div>
  )
}
