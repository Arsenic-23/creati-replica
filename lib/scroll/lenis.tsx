"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis with GSAP's requestAnimationFrame
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Disable GSAP's lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Refresh ScrollTrigger on route changes
  useEffect(() => {
    if (lenisRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}

