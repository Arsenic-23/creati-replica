"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/utils/mockData";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !gridRef.current) return;

      const statCards = Array.from(gridRef.current.children) as HTMLElement[];

      // Reveal animation
      gsap.set(statCards, {
        opacity: 0,
        y: 35,
        scale: 0.95,
      });

      gsap.to(statCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // CountUp for numbers
      statCards.forEach((card, index) => {
        const numberElement = card.querySelector(".stat-number") as HTMLElement;
        const original = stats[index].number.replace(/\D/g, ""); // remove + or K

        gsap.fromTo(
          numberElement,
          { innerText: 0 },
          {
            innerText: Number(original),
            duration: 1.6,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
            onUpdate() {
              // Preserve suffix like + or K+
              const suffix = stats[index].number.replace(/[0-9]/g, "");
              numberElement.innerText = Math.floor(Number(numberElement.innerText)) + suffix;
            },
          }
        );
      });

      // Glow parallax
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="group relative">
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 transition-all duration-300 hover:border-white/20 flex flex-col items-center justify-center min-h-[140px] md:min-h-[160px]">
                
                {/* NUMBER WITH COUNT UP */}
                <div className="stat-number text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 md:mb-3 text-white leading-none tracking-tight">
                  {stat.number}
                </div>

                <div className="text-xs sm:text-sm md:text-base text-white/60 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
