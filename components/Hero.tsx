"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

const TOTAL_FRAMES = 147;
const SEQUENCE_FOLDER = "/hero-images";
const FILE_EXTENSION = "webp";
const BACKGROUND_COLOR = "#000000";
const PRIORITY_PRELOAD_FRAMES = 30;
const BACKGROUND_BATCH_SIZE = 8;


type LoadedFrame = {
  image: HTMLImageElement;
  loaded: boolean;
  requested: boolean;
};

const buildFramePath = (frame: number) =>
  `${SEQUENCE_FOLDER}/frame_${String(frame).padStart(4, "0")}.${FILE_EXTENSION}`;

export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<LoadedFrame[]>([]);
  const animationRafRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const velocityRef = useRef(0);
  const lastTargetRef = useRef(0);

  const requestFrame = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_FRAMES) return;
    const frame = framesRef.current[index];
    if (!frame || frame.requested) return;
    frame.requested = true;
    frame.image.src = buildFramePath(index + 1);
  }, []);

  const findNearestLoadedFrame = useCallback((index: number) => {
    const direct = framesRef.current[index];
    if (direct?.loaded) return index;

    for (let distance = 1; distance < TOTAL_FRAMES; distance += 1) {
      const backward = index - distance;
      if (backward >= 0 && framesRef.current[backward]?.loaded) return backward;
      const forward = index + distance;
      if (forward < TOTAL_FRAMES && framesRef.current[forward]?.loaded) return forward;
    }

    return -1;
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.35], ["20vh", "0vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.25, 0.8], ["12vh", "-4vh"]);
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.75],
    [0, 1, 0],
  );

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const viewportWidth = canvas.clientWidth || window.innerWidth;
    const viewportHeight = canvas.clientHeight || window.innerHeight;

    const drawableIndex = findNearestLoadedFrame(index);
    const frame = drawableIndex >= 0 ? framesRef.current[drawableIndex] : undefined;

    // ✅ Just show black screen while loading — no text
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, viewportWidth, viewportHeight);

    if (!frame?.loaded) return;

    const image = frame.image;
    const imageRatio = image.width / image.height;
    const canvasRatio = viewportWidth / viewportHeight;

    let drawWidth = viewportWidth;
    let drawHeight = viewportHeight;

    if (imageRatio > canvasRatio) {
      drawWidth = viewportHeight * imageRatio;
    } else {
      drawHeight = viewportWidth / imageRatio;
    }

    const drawX = (viewportWidth - drawWidth) / 2;
    const drawY = (viewportHeight - drawHeight) / 2;
    context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  }, [findNearestLoadedFrame]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const context = canvas.getContext("2d");
      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      const activeFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(scrollYProgress.get() * (TOTAL_FRAMES - 1))),
      );
      targetFrameRef.current = reducedMotion ? 0 : activeFrame;
      currentFrameRef.current = targetFrameRef.current;
      lastDrawnFrameRef.current = -1;
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame, reducedMotion, scrollYProgress]);

  useEffect(() => {
    const nextFrames: LoadedFrame[] = Array.from({ length: TOTAL_FRAMES }, () => {
      const image = new Image();
      image.decoding = "async";
      return { image, loaded: false, requested: false };
    });

    nextFrames.forEach((frame) => {
      frame.image.onerror = () => undefined;
    });

    framesRef.current = nextFrames;

    // ✅ Load frame 1 first — draw immediately when ready
    const firstFrame = nextFrames[0];
    firstFrame.requested = true;
    firstFrame.image.onload = () => {
      firstFrame.loaded = true;
      drawFrame(0);
    };
    firstFrame.image.src = buildFramePath(1);

    // ✅ Load remaining priority frames with onload handler
    for (let i = 1; i < Math.min(PRIORITY_PRELOAD_FRAMES, TOTAL_FRAMES); i += 1) {
      const frame = nextFrames[i];
      if (!frame || frame.requested) continue;
      frame.requested = true;
      frame.image.onload = () => {
        frame.loaded = true;
      };
      frame.image.src = buildFramePath(i + 1);
    }

    // ✅ Background load remaining frames
    let bgIndex = PRIORITY_PRELOAD_FRAMES;
    const backgroundLoader = window.setInterval(() => {
      for (
        let batchCount = 0;
        batchCount < BACKGROUND_BATCH_SIZE && bgIndex < TOTAL_FRAMES;
        batchCount += 1, bgIndex += 1
      ) {
        const frame = nextFrames[bgIndex];
        if (!frame || frame.requested) continue;
        frame.requested = true;
        frame.image.onload = () => {
          frame.loaded = true;
        };
        frame.image.src = buildFramePath(bgIndex + 1);
      }
      if (bgIndex >= TOTAL_FRAMES) {
        window.clearInterval(backgroundLoader);
      }
    }, 70);

    return () => {
      window.clearInterval(backgroundLoader);
    };
  }, [drawFrame, requestFrame]);

  useEffect(() => {
    const updateTargetFrame = () => {
      const nextFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, scrollYProgress.get() * (TOTAL_FRAMES - 1)),
      );
      targetFrameRef.current = reducedMotion ? 0 : nextFrame;
      requestFrame(Math.round(nextFrame));
    };

    updateTargetFrame();
    return scrollYProgress.on("change", updateTargetFrame);
  }, [reducedMotion, requestFrame, scrollYProgress]);

  useEffect(() => {
    const SMOOTHING = 0.12;        // lower base lerp
    const VELOCITY_DECAY = 0.88;   // momentum falloff



    const animate = () => {
      if (reducedMotion) {
        const staticFrame = 0;
        if (lastDrawnFrameRef.current !== staticFrame) {
          drawFrame(staticFrame);
          lastDrawnFrameRef.current = staticFrame;
        }
        animationRafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate velocity from how fast the target is moving
      const targetDelta = targetFrameRef.current - lastTargetRef.current;
      velocityRef.current = velocityRef.current * VELOCITY_DECAY + targetDelta * (1 - VELOCITY_DECAY);
      lastTargetRef.current = targetFrameRef.current;

      // Apply velocity + lerp together
      const gap = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += gap * SMOOTHING + velocityRef.current * 0.6;

      // Snap when close enough
      if (Math.abs(gap) < 0.01 && Math.abs(velocityRef.current) < 0.01) {
        currentFrameRef.current = targetFrameRef.current;
        velocityRef.current = 0;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
        lastDrawnFrameRef.current = frameToDraw;
      }

      animationRafRef.current = requestAnimationFrame(animate);
    };

    animationRafRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRafRef.current) {
        cancelAnimationFrame(animationRafRef.current);
      }
    };
  }, [drawFrame, reducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-[340vh] sm:h-[380vh] lg:h-[420vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="px-4 text-center sm:px-6">
            <p className="text-[10px] uppercase tracking-[0.26em] text-white sm:text-xs sm:tracking-[0.45em]">
              Designers and Builders
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
              BUILDWELLZ
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 flex items-end justify-start p-5 sm:p-8 md:p-14"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          <p className="max-w-[18rem] text-xs leading-relaxed tracking-tight text-white sm:max-w-sm sm:text-sm md:text-base">
            Designing Dreams, Building Reality <br />
            We take comfort and home living to profound new heights.
          </p>
        </motion.div>
      </div>
    </section>
  );
}