"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  videoSrc: string;
};

const newsItems: NewsItem[] = [
  {
    id: "veo-desert",
    title: "Desert Mirage Ad by VEO 3.1",
    excerpt:
      "A high-energy snack campaign shot in the desert, stitched entirely from text prompts and product shots.",
    date: "2024-11-01",
    category: "Campaign",
    videoSrc: "/news-ad-veo-desert.mp4",
  },
  {
    id: "fashion-runway",
    title: "Fashion x K-Runway Drop",
    excerpt:
      "Runway-style edits for a streetwear drop, generated from phone footage and a single moodboard.",
    date: "2024-10-18",
    category: "Fashion",
    videoSrc: "/news-fashion-runaway.mp4",
  },
  {
    id: "product-shimmer",
    title: "Product Shimmer Macro Shots",
    excerpt:
      "Macro close-ups of skincare products with simulated studio lighting and liquid simulations.",
    date: "2024-09-29",
    category: "Product",
    videoSrc: "/news-product-shimmer.mp4",
  },
  {
    id: "gaming-highlight",
    title: "Creator Gaming Highlights Pack",
    excerpt:
      "Fast-cut highlight reels for streamers, assembled from chat clips and automatic scene detection.",
    date: "2024-09-12",
    category: "Gaming",
    videoSrc: "/news-gaming-highlight.mp4",
  },
  {
    id: "city-night",
    title: "Neon City Story Reel",
    excerpt:
      "A night-time city montage built from still images, animated into a continuous cinematic sequence.",
    date: "2024-08-25",
    category: "Story",
    videoSrc: "/news-city-night.mp4",
  },
  {
    id: "beach-slowmotion",
    title: "Slow-Motion Beach Launch",
    excerpt:
      "A summer product launch stitched from user-generated clips with AI-smoothed motion and color.",
    date: "2024-08-07",
    category: "Launch",
    videoSrc: "/news-beach-slowmotion.mp4",
  },
];

export default function LatestNewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Label + heading animation (clean, subtle)
      if (headingRef.current && sectionRef.current) {
        gsap.from(sectionRef.current.querySelector(".news-label"), {
          y: 14,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(headingRef.current, {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.05,
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.querySelectorAll(".news-card"), {
          opacity: 0,
          y: 60,
          scale: 0.96,
          rotateX: -6,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          transformOrigin: "center bottom",
          immediateRender: false,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Background aura parallax
      const aura = sectionRef.current?.querySelector(".news-background");
      if (aura) {
        gsap.fromTo(
          aura,
          { y: -40, opacity: 0.7 },
          {
            y: 40,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="latest-news"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#05060c] px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/news-vd.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Dark overlay + auras */}
      <div className="news-background pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95" />
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14)_0,_rgba(255,255,255,0)_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14)_0,_rgba(255,255,255,0)_65%)] blur-3xl" />
        <div className="absolute -bottom-24 right-6 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_0,_rgba(255,255,255,0)_65%)] blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-6xl">
        {/* Header – editorial, left-aligned, white only */}
        <div className="mb-10 md:mb-14 mx-auto max-w-3xl space-y-3 text-left">
          <span className="news-label inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
            Latest news
          </span>
          <div className="space-y-2">
            <h2
              ref={headingRef}
              className="text-[clamp(2.1rem,3vw,2.6rem)] font-semibold leading-tight text-white"
            >
              Insights, updates, and the work creators are making.
            </h2>
            <p className="max-w-2xl text-sm md:text-[0.95rem] leading-relaxed text-white/60">
              A curated feed of launches, campaigns, and experiments built with Creati Studio,
              refreshed as the community ships new stories.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 md:mt-14">
          <div
            ref={cardsRef}
            className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {newsItems.map((news) => (
              <article
                key={news.id}
                className="news-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85)] transition-transform duration-300 will-change-transform"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -10,
                    duration: 0.35,
                    ease: "power3.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    duration: 0.35,
                    ease: "power3.out",
                  });
                }}
              >
                {/* Video thumbnail */}
                <div className="relative overflow-hidden">
                  <video
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    src={news.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
                  {/* subtle highlight on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.16),transparent_45%)]" />
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-medium">
                    <span className="rounded-full bg-white/10 px-3 py-1 uppercase tracking-[0.16em] text-white/70">
                      {news.category}
                    </span>
                    <span className="text-white/45 font-normal">
                      {new Date(news.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="mb-3 text-[1.05rem] font-semibold leading-snug text-white">
                    {news.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-white/70">
                    {news.excerpt}
                  </p>

                  <div className="flex items-center text-sm font-medium text-white/80">
                    <span className="relative">
                      <span className="relative z-10">Read case study</span>
                      <span className="absolute inset-x-0 -bottom-[2px] h-px origin-left scale-x-0 bg-white/50 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}