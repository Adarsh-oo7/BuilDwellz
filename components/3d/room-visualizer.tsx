import { Suspense, useRef, useState, useEffect } from "react"
import * as THREE from "three"

// Mobile detection hook
function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

// Simple 3D Model Component
function Model({ autoRotate, scale = 1, position = [0, -1, 0] }) {
  const meshRef = useRef()
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!autoRotate) return
    
    const animate = () => {
      setTime(prev => prev + 0.01)
      requestAnimationFrame(animate)
    }
    animate()
  }, [autoRotate])

  useEffect(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y = time
    }
  }, [time, autoRotate])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Scene Placeholder with CSS Animation */}
      <div 
        ref={meshRef}
        className={`w-32 h-32 md:w-48 md:h-48 relative transition-transform duration-300 ${
          autoRotate ? 'animate-spin' : ''
        }`}
        style={{
          transform: `scale(${scale})`,
          animationDuration: autoRotate ? '20s' : '0s',
          animationTimingFunction: 'linear'
        }}
      >
        {/* Room representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white/40 rounded-lg"></div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  )
}

// Tabs Component
function Tabs({ defaultValue, value, onValueChange, children }) {
  return <div>{children}</div>
}

function TabsList({ className, children }) {
  return <div className={`flex rounded-lg p-1 ${className}`}>{children}</div>
}

function TabsTrigger({ value, children, ...props }) {
  return (
    <button
      className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {children}
    </button>
  )
}

// Button Component
function Button({ onClick, variant, className, children }) {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
  const variantClass = variant === "outline" 
    ? "border border-white/20 hover:bg-white/10 text-white" 
    : "bg-blue-600 hover:bg-blue-700 text-white"
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  )
}

export default function RoomVisualizer() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [activeTab, setActiveTab] = useState("living")
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const getRoomTitle = () => {
    switch(activeTab) {
      case "living": return "Living Room"
      case "kitchen": return "Kitchen"
      case "bedroom": return "Bedroom"
      default: return "Living Room"
    }
  }

  const getRoomColor = () => {
    switch(activeTab) {
      case "living": return "from-blue-400 to-purple-600"
      case "kitchen": return "from-green-400 to-blue-600"
      case "bedroom": return "from-purple-400 to-pink-600"
      default: return "from-blue-400 to-purple-600"
    }
  }

  if (!mounted) {
    return (
      <div className="w-full h-[500px] md:h-[700px] bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[500px] md:h-[700px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500 to-purple-600"></div>
      
      {/* Tab Controls */}
      <div className="absolute top-4 left-4 z-10">
        <Tabs defaultValue="living" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="bg-black/40 backdrop-blur-sm border border-white/10">
            <TabsTrigger 
              value="living" 
              onClick={() => handleTabChange("living")}
              style={{ 
                backgroundColor: activeTab === "living" ? "rgba(59, 130, 246, 0.3)" : "transparent",
                color: "white"
              }}
            >
              Living Room
            </TabsTrigger>
            <TabsTrigger 
              value="kitchen" 
              onClick={() => handleTabChange("kitchen")}
              style={{ 
                backgroundColor: activeTab === "kitchen" ? "rgba(59, 130, 246, 0.3)" : "transparent",
                color: "white"
              }}
            >
              Kitchen
            </TabsTrigger>
            <TabsTrigger 
              value="bedroom" 
              onClick={() => handleTabChange("bedroom")}
              style={{ 
                backgroundColor: activeTab === "bedroom" ? "rgba(59, 130, 246, 0.3)" : "transparent",
                color: "white"
              }}
            >
              Bedroom
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main 3D Scene Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Room Title */}
        <div className="absolute top-20 text-center z-20">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {getRoomTitle()}
          </h2>
        </div>

        {/* 3D Model */}
        <div className="relative z-10">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
              <p className="text-white">Loading 3D Model...</p>
            </div>
          }>
            <div className={`transition-all duration-500 ${getRoomColor()}`}>
              <Model 
                scale={isMobile ? 0.8 : 1} 
                position={[0, -1, 0]} 
                autoRotate={autoRotate} 
              />
            </div>
          </Suspense>
        </div>

        {/* Interactive Info Panel */}
        <div className="absolute right-8 top-1/3 bg-black/40 backdrop-blur-sm p-4 rounded-lg shadow-lg w-48 text-center border border-white/10">
          <h3 className="font-bold mb-2 text-white">Premium Design</h3>
          <p className="text-sm text-gray-300">Explore our premium interior design options</p>
        </div>

        {/* Shadow Effect */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Control Button */}
      <div 
        className="absolute bottom-4 right-4 z-10 transition-all duration-500 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        <Button
          onClick={() => setAutoRotate(!autoRotate)}
          variant="outline"
          className="bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
        >
          {autoRotate ? "Stop Rotation" : "Start Rotation"}
        </Button>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}