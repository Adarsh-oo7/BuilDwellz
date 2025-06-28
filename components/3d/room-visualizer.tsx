"use client";

import { useEffect, useState, useRef } from "react";

export default function RoomVisualizer() {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && containerRef.current) {
      const loadModelViewer = async () => {
        try {
          // Load the model-viewer script dynamically
          await import("@google/model-viewer");
          
          // Small delay to ensure the component is registered
          setTimeout(() => {
            setIsLoaded(true);
          }, 100);
        } catch (err) {
          console.error("Failed to load model-viewer:", err);
          setError("Failed to load 3D viewer");
        }
      };

      loadModelViewer();
    }
  }, [isClient]);

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  // Show error state
  if (error) {
    return (
      <div 
        className="flex items-center justify-center bg-muted rounded-[20px]"
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Unable to load 3D viewer</p>
          <button 
            onClick={() => {
              setError(null);
              setIsLoaded(false);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div 
        ref={containerRef}
        className="flex items-center justify-center bg-black rounded-[20px]"
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading 3D Model...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: "500px" }}>
      <model-viewer
        src="/assets/3d/smart_home_interior_floor_plan.glb"
        alt="3D model of smart home interior floor plan"
        auto-rotate
        camera-controls
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",       
          overflow: "hidden",  
          backgroundColor: "black",
          "--progress-bar-color": "#ffffff",
          "--progress-bar-height": "3px",
        }}
        onLoad={() => console.log("Model loaded successfully")}
        onError={(e) => {
          console.error("Model loading error:", e);
          setError("Failed to load 3D model");
        }}
      />
    </div>
  );
}