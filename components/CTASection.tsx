"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: false,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0b0b10] text-white relative overflow-hidden"
    >
      {/* Radial glow behind button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)",
            transform: "translateY(20%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div ref={contentRef}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight leading-[1.1] text-white">
            Let's Start
          </h2>

          {/* Circular arrow button */}
          <div className="flex justify-center mt-10 md:mt-12">
            <button
              ref={buttonRef}
              className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  duration: 0.3,
                  ease: "power2.out",
                });
                const glow = e.currentTarget.querySelector(".button-glow");
                if (glow) {
                  gsap.to(glow, {
                    opacity: 0.6,
                    scale: 1.2,
                    duration: 0.3,
                  });
                }
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
                const glow = e.currentTarget.querySelector(".button-glow");
                if (glow) {
                  gsap.to(glow, {
                    opacity: 0.3,
                    scale: 1,
                    duration: 0.3,
                  });
                }
              }}
            >
              {/* Glow effect */}
              <div
                className="button-glow absolute inset-0 rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Arrow icon */}
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

