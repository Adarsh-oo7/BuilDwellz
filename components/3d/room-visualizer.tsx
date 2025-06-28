"use client";
import "@google/model-viewer";

export default function RoomVisualizer() {
  return (
    <model-viewer
      src="/assets/3d/smart_home_interior_floor_plan.glb"
      alt="3D model"
      auto-rotate
      camera-controls
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "20px",       
        overflow: "hidden",  
        backgroundColor: "black",
        "--model-viewer-background-color": "black",
      }}
    />
  );
}
