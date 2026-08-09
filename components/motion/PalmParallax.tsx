"use client";

import { useEffect, useState } from "react";

export function PalmParallax() {
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isMobile = false;

    // Mobile gyroscope handler
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        isMobile = true;
        // Clamp gamma (-45 to 45) and beta (-45 to 45)
        const x = Math.max(-45, Math.min(45, e.gamma));
        const y = Math.max(-45, Math.min(45, e.beta - 45)); // adjust baseline tilt angle
        setOffsets({ x: x * 0.8, y: y * 0.8 });
      }
    };

    // Desktop mousemove handler
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // max +/-20px
      const y = (e.clientY / innerHeight - 0.5) * 40;
      setOffsets({ x, y });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation, true);
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Deep Palm Layer 1 (Far depth, subtle shift) */}
      <div
        className="absolute -top-10 -left-12 opacity-15 transition-transform duration-300 ease-out text-[#0B6839]"
        style={{
          transform: `translate3d(${offsets.x * 0.3}px, ${offsets.y * 0.3}px, 0) scale(1.1)`
        }}
      >
        <svg width="280" height="280" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 95 C 40 60 20 40 5 35 C 25 35 40 45 50 95 C 60 45 75 35 95 35 C 80 40 60 60 50 95 C 50 50 35 25 20 15 C 35 25 45 40 50 95 M50 95 C 50 50 65 25 80 15 C 65 25 55 40 50 95" />
        </svg>
      </div>

      {/* Mid Palm Layer 2 (Right side, medium depth) */}
      <div
        className="absolute bottom-10 -right-16 opacity-20 transition-transform duration-200 ease-out text-[#FFC24B]"
        style={{
          transform: `translate3d(${offsets.x * -0.6}px, ${offsets.y * -0.6}px, 0) rotate(-15deg) scale(1.3)`
        }}
      >
        <svg width="340" height="340" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 95 C 40 60 20 40 5 35 C 25 35 40 45 50 95 C 60 45 75 35 95 35 C 80 40 60 60 50 95 M50 95 C 50 50 35 25 20 15 C 35 25 45 40 50 95 M50 95 C 50 50 65 25 80 15 C 65 25 55 40 50 95" />
        </svg>
      </div>

      {/* Foreground Palm Layer 3 (Left bottom, fastest shift) */}
      <div
        className="absolute -bottom-20 -left-20 opacity-25 transition-transform duration-150 ease-out text-[#0B6839]"
        style={{
          transform: `translate3d(${offsets.x * 1.1}px, ${offsets.y * 1.1}px, 0) rotate(20deg) scale(1.6)`
        }}
      >
        <svg width="420" height="420" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 95 C 40 60 20 40 5 35 C 25 35 40 45 50 95 C 60 45 75 35 95 35 C 80 40 60 60 50 95 M50 95 C 50 50 35 25 20 15 C 35 25 45 40 50 95 M50 95 C 50 50 65 25 80 15 C 65 25 55 40 50 95" />
        </svg>
      </div>
    </div>
  );
}
