"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loading({ isLoading }) {
  // Define the brick positions for a simplified "B" shape
  const bricks = [
    // Vertical left side of "B"
    { x: 0, y: 0 }, // Bottom-left
    { x: 0, y: -20 }, // Middle-left
    { x: 0, y: -40 }, // Top-left
    // Top horizontal part of "B"
    { x: 20, y: -40 }, // Top-middle
    { x: 40, y: -40 }, // Top-right
    // Middle horizontal part of "B"
    { x: 20, y: -20 }, // Middle-middle
    { x: 40, y: -20 }, // Middle-right
    // Bottom horizontal part of "B"
    { x: 20, y: 0 }, // Bottom-middle
    { x: 40, y: 0 }, // Bottom-right
    // Small curves for "B" (simplified)
    { x: 60, y: -30 }, // Upper curve
    { x: 60, y: -10 }, // Lower curve
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black to-red-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          role="status"
          aria-live="polite"
          aria-label="Loading BuilDwellz"
        >
          <motion.div className="text-center relative">
            {/* Container for Bricks and Crane */}
            <motion.div
              className="relative w-24 h-32 mx-auto mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Crane Arm and Steel Beam */}
              <motion.div
                className="absolute top-0 left-0 w-24 h-1 bg-yellow-400"
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: bricks.length * 0.1, ease: "easeInOut" }}
              >
                {/* Steel Beam */}
                <motion.div
                  className="absolute right-0 w-8 h-2 bg-gray-400"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: bricks.length * 0.1 + 0.5, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Bricks Forming "B" */}
              {bricks.map((brick, index) => (
                <motion.div
                  key={index}
                  className="absolute w-6 h-4 bg-gradient-to-r from-red-600 to-red-800 border border-yellow-400 shadow-sm"
                  style={{ left: brick.x, top: brick.y + 20 }} // Adjusted y to make space for crane
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: brick.y + 20, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                />
              ))}
            </motion.div>

            {/* BuilDwellz Text */}
            <motion.h2
              className="text-4xl font-bold text-white font-[var(--font-playfair)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: (bricks.length * 0.1) + 1 }}
            >
              BuilDwellz
            </motion.h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}