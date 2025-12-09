"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ModeType = "snap" | "swap" | "speaker";

type ModeData = {
  id: ModeType;
  title: string;
  eyebrow: string;
  subtitle: string;
  body: string;
  ctaText: string;
  videoSrc: string;
  align: "leftVideo" | "rightVideo";
};

const modesData: ModeData[] = [
  {
    id: "snap",
    title: "Snap Mode",
    eyebrow: "Scroll-stopping images",
    subtitle: "Turn any still into a loop-worthy motion clip.",
    body: "Drop in product shots, portraits, or UGC frames and let Snap Mode build smooth, auto-framed motion.",
    ctaText: "Get started with Snap",
    videoSrc: "/modes/snap-1.mp4",
    align: "rightVideo",
  },
  {
    id: "swap",
    title: "Swap Mode",
    eyebrow: "Scene-level control",
    subtitle: "Swap backgrounds, props, and scenes in a single click.",
    body: "Keep lighting and perspective perfectly aligned while experimenting.",
    ctaText: "Try Swap Mode",
    videoSrc: "/modes/swap-1.mp4",
    align: "leftVideo",
  },
  {
    id: "speaker",
    title: "Speaker Mode",
    eyebrow: "Talking visuals",
    subtitle: "Turn a still face into a natural presenter.",
    body: "Generate flawless lipsync, timing and expression.",
    ctaText: "Explore Speaker",
    videoSrc: "/modes/speaker-1.mp4",
    align: "rightVideo",
  },
];

// Force videos to load
function forceVideoLoad(video: HTMLVideoElement) {
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.load();
  video.play().catch(() => {});
}

export default function ModesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.querySelectorAll("video").forEach((v) => forceVideoLoad(v as HTMLVideoElement));
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".modes-section-title", {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".mode-block");

      cards.forEach((card) => {
        const alignRight = card.dataset.align === "rightVideo";
        const side = alignRight ? 1 : -1;

        const clip = card.querySelector(".mode-video-clip") as HTMLElement;
        const text = card.querySelector(".mode-text") as HTMLElement;
        const video = card.querySelector("video") as HTMLVideoElement;

        gsap.set(clip, {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          willChange: "transform",
        });

        // ---- FLIP-IN ENTRY ----
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 35%",
            scrub: false,
            toggleActions: "play none reverse none",
          },
        });

        tl.fromTo(
          clip,
          {
            opacity: 0,
            rotateY: side * 65,
            y: 80,
            scale: 0.92,
          },
          {
            opacity: 1,
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
          }
        );

        tl.fromTo(
          text,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7"
        );

        // ---- PARALLAX ----
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.to(clip, {
              y: -p * 26,
              rotateY: side * (8 - p * 8),
              duration: 0.1,
            });
          },
        });

        // ---- HOVER TILT ----
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
          const y = ((e.clientY - r.top) / r.height - 0.5) * -14;

          gsap.to(clip, {
            rotateY: x * (side * -1),
            rotateX: y,
            duration: 0.4,
            ease: "power3.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(clip, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.55,
            ease: "power3.out",
          });
        });

        // ---- VIDEO PLAY CONTROL ----
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => video?.play().catch(() => {}),
          onEnterBack: () => video?.play().catch(() => {}),
          onLeave: () => video?.pause(),
          onLeaveBack: () => video?.pause(),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="modes"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#05060c] px-4 py-24 sm:px-6 md:py-32 lg:px-10"
    >
      <div className="relative z-10 mx-auto max-w-7xl space-y-20">
        
        {/* TITLE */}
        <div className="modes-section-title flex flex-col gap-3 text-left md:text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            MODES
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Three ways to shape your stories
          </h2>
          <p className="max-w-2xl text-sm text-white/70 md:mx-auto md:text-base">
            Snap, Swap, and Speaker give you production-level control.
          </p>
        </div>

        {/* CARDS */}
        <div className="space-y-16">
          {modesData.map((mode) => (
            <section
              key={mode.id}
              data-align={mode.align}
              className="
                mode-block relative rounded-2xl p-[1px]
                bg-white/5 backdrop-blur-xl
                border border-white/15
                shadow-[0_0_40px_-10px_rgba(255,255,255,0.25)]
                before:absolute before:inset-0 before:rounded-2xl
                before:bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.05))]
                before:opacity-30 before:pointer-events-none
              "
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-black/60 via-black/70 to-black/60 p-6 sm:p-8 md:p-10 border border-white/8">
                <div
                  className={`grid grid-cols-1 items-center gap-8 lg:gap-12 ${
                    mode.align === "leftVideo"
                      ? "lg:grid-cols-[1fr_1.05fr]"
                      : "lg:grid-cols-[1.05fr_1fr]"
                  }`}
                >
                  {/* VIDEO */}
                  <div className={`${mode.align === "leftVideo" ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="mode-video-clip relative overflow-hidden rounded-2xl border border-white/12 bg-black/40 aspect-video h-[320px] md:h-[380px] lg:h-[420px]">
                      <video
                        src={mode.videoSrc}
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/30" />
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className={`mode-text flex flex-col justify-center ${mode.align === "leftVideo" ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                          {mode.eyebrow}
                        </p>
                        <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                          {mode.title}
                        </h3>
                        <p className="text-base text-white/80">{mode.subtitle}</p>
                      </div>

                      <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                        {mode.body}
                      </p>

                      <button className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10">
                        <span>{mode.ctaText}</span>
                        <span className="inline-block text-base transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
