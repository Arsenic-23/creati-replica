"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  id: string;
  title: string;
  tag: string;
  mode: "show" | "snap" | "speaker";
  videoSrc: string;
  aspectRatio: "4/5" | "3/4" | "16/9" | "2/3";
};

const galleryItems: GalleryItem[] = [
  { id: "clip-01", title: "Luxury Fragrance", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-01-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-02", title: "Arcade Launch", tag: "Show", mode: "show", videoSrc: "/gallery/clip-02-cl.mp4", aspectRatio: "3/4" },
  { id: "clip-03", title: "Bag Float", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-03-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-04", title: "Summer Pool", tag: "Show", mode: "show", videoSrc: "/gallery/clip-04-cl.mp4", aspectRatio: "16/9" },
  { id: "clip-05", title: "Portrait Eyes", tag: "Speaker", mode: "speaker", videoSrc: "/gallery/clip-05-cl.mp4", aspectRatio: "3/4" },
  { id: "clip-06", title: "Sneaker Pop", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-06-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-07", title: "Runway Reel", tag: "Show", mode: "show", videoSrc: "/gallery/clip-07-cl.mp4", aspectRatio: "16/9" },
  { id: "clip-08", title: "Beauty Closeup", tag: "Speaker", mode: "speaker", videoSrc: "/gallery/clip-08-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-09", title: "Perfume Drop", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-09-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-10", title: "Headphone Layout", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-10-cl.mp4", aspectRatio: "3/4" },
  { id: "clip-11", title: "Editorial Portrait", tag: "Show", mode: "show", videoSrc: "/gallery/clip-11-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-12", title: "Miniature Scene", tag: "Show", mode: "show", videoSrc: "/gallery/clip-12-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-13", title: "Product Macro", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-13-cl.mp4", aspectRatio: "3/4" },
  { id: "clip-14", title: "Cosmetics Reel", tag: "Show", mode: "show", videoSrc: "/gallery/clip-14-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-15", title: "Lifestyle Cut", tag: "Show", mode: "show", videoSrc: "/gallery/clip-15-cl.mp4", aspectRatio: "16/9" },
  { id: "clip-16", title: "Model Closeup", tag: "Speaker", mode: "speaker", videoSrc: "/gallery/clip-16-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-17", title: "Product Spin", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-17-cl.mp4", aspectRatio: "3/4" },
  { id: "clip-18", title: "Street Style", tag: "Show", mode: "show", videoSrc: "/gallery/clip-18-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-19", title: "Cat Sneaker", tag: "Product", mode: "snap", videoSrc: "/gallery/clip-19-cl.mp4", aspectRatio: "4/5" },
  { id: "clip-20", title: "Glow Portrait", tag: "Speaker", mode: "speaker", videoSrc: "/gallery/clip-20-cl.mp4", aspectRatio: "3/4" },
];

export default function GallerySection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "show" | "snap" | "speaker">("all");

  // Helper: return tailwind-friendly class for consistent visual sizes
  const sizeClassForAspect = (aspect: GalleryItem["aspectRatio"]) => {
    switch (aspect) {
      case "16/9":
        return "aspect-video"; // widescreen
      case "3/4":
        return "aspect-[3/4] md:aspect-[3/4]"; // portrait-ish
      case "2/3":
        return "aspect-[2/3]";
      case "4/5":
      default:
        return "aspect-[4/5]"; // tall portrait as default
    }
  };

  useLayoutEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");

      // global reveal batch (entry/exit)
      ScrollTrigger.batch(cards, {
        interval: 0.08,
        start: "top 95%",
        end: "bottom 5%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28, scale: 0.98, filter: "blur(6px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.04, ease: "power3.out" }
          );
        },
        onEnterBack: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.03, ease: "power3.out" });
        },
        onLeave: (batch) => {
          gsap.to(batch, { opacity: 0, y: -24, duration: 0.6, stagger: 0.03, ease: "power2.out", filter: "blur(4px)" });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, { opacity: 0, y: 24, duration: 0.6, stagger: 0.03, ease: "power2.out", filter: "blur(4px)" });
        },
      });

      // hover timeline per card (created once per card and stored on element)
      cards.forEach((card) => {
        const overlay = card.querySelector<HTMLElement>(".card-overlay");
        const btn = card.querySelector<HTMLElement>(".card-generate");
        const vid = card.querySelector<HTMLVideoElement>("video");

        // create timeline: paused by default
        const tl = gsap.timeline({ paused: true });
        tl.to(card, { y: -8, duration: 0.35, ease: "power3.out" }, 0);
        if (vid) tl.to(vid, { scale: 1.06, duration: 0.8, ease: "power3.out" }, 0);
        if (overlay) tl.to(overlay, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }, 0);
        if (btn) tl.to(btn, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }, 0.02);

        // store timeline so handlers can access it
        (card as any)._hoverTl = tl;

        // accessibility: focus/blur also trigger
        card.addEventListener("mouseenter", () => (card as any)._hoverTl.play());
        card.addEventListener("mouseleave", () => (card as any)._hoverTl.reverse());
        card.addEventListener("focusin", () => (card as any)._hoverTl.play());
        card.addEventListener("focusout", () => (card as any)._hoverTl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const filtered = activeFilter === "all" ? galleryItems : galleryItems.filter((g) => g.mode === activeFilter);

  return (
    <section id="gallery" ref={sectionRef} className="relative overflow-hidden bg-[#05060c] px-4 sm:px-6 py-20">
      {/* subtle auras */}
      <div className="gallery-aura pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/6 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04)_0,_rgba(255,255,255,0)_60%)] blur-3xl" />
        <div className="absolute bottom-6 right-1/6 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0,_rgba(255,255,255,0)_60%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px]">
        {/* header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-white text-[clamp(1.9rem,2.6vw,2.4rem)] font-semibold leading-tight">Creator Gallery</h2>
            <p className="text-white/60 mt-2 max-w-xl">Tight masonry with consistent aspect sizing — clean, Pinterest-style layout with classy motion.</p>
          </div>

          <div className="flex gap-2 mt-3 sm:mt-0">
            {(["all", "show", "snap", "speaker"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-full transition-all duration-200 ${
                  activeFilter === f ? "bg-white/10 text-white border border-white/20" : "bg-white/5 text-white/60 border border-white/12 hover:bg-white/8 hover:text-white"
                }`}
              >
                {f === "all" ? "All" : f === "snap" ? "Snap" : f === "speaker" ? "Speaker" : "Show"}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest-like masonry using CSS columns for natural flow */}
        <div ref={gridRef} className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-3">
          {filtered.map((item, idx) => {
            const aspectClass = sizeClassForAspect(item.aspectRatio);

            return (
              <article
                key={item.id}
                tabIndex={0}
                className={`gallery-card inline-block w-full mb-3 rounded-xl overflow-hidden border border-white/8 bg-white/2 shadow-lg relative`}
                style={{ willChange: "transform, filter, opacity" }}
              >
                <div className={`w-full ${aspectClass} relative bg-[#0b0c10]`}>
                  <video
                    src={item.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{ transformOrigin: "center center" }}
                  />

                  {/* overlay - now pointer-events enabled so button is clickable */}
                  <div
                    className="card-overlay absolute inset-0 flex flex-col justify-end p-3"
                    style={{
                      background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.48) 100%)",
                      opacity: 0,
                      transform: "scale(1.03)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-white/80 bg-white/4 rounded-full px-2 py-1">{item.tag}</span>
                          <span className="ml-2 text-xs text-white/60">{item.mode}</span>
                        </div>
                        <h3 className="mt-2 text-sm md:text-base font-semibold text-white line-clamp-1">{item.title}</h3>
                      </div>

                      <button
                        className="card-generate ml-4 rounded-full px-3 py-1.5 text-sm font-semibold text-white bg-black/70 backdrop-blur-sm border border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
                        style={{ opacity: 0, transform: "translateY(8px) scale(0.98)", zIndex: 5 }}
                        aria-label={`Generate from ${item.title}`}
                      >
                        Generate
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            inset: -6,
                            borderRadius: 9999,
                            background: "linear-gradient(90deg, rgba(138,86,255,0.12), rgba(236,72,153,0.08), rgba(59,130,246,0.08))",
                            filter: "blur(10px)",
                            zIndex: 0,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* small footnote for spacing */}
        <div className="mt-10 text-center text-white/40 text-sm">Showing {filtered.length} items — hover or focus any card to reveal actions.</div>
      </div>
    </section>
  );
}
