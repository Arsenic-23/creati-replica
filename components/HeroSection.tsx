"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection(): React.JSX.Element {
  const rootRef = useRef<HTMLElement | null>(null);
  const typeRef = useRef<HTMLParagraphElement | null>(null);
  const navLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const typingState = useRef({
    tl: null as gsap.core.Timeline | null,
    cancelHandles: [] as gsap.core.Tween[],
    active: true,
  });

  const sentences = [
    "Type an idea, watch it become art.",
    "Turn concepts into stunning videos.",
    "Create magic in seconds.",
  ];

  const TYPE_SPEED = 0.09;
  const DELETE_SPEED = 0.065;
  const PAUSE_AFTER_TYPE = 0.6;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.05 },
      });

      tl.from(".hero-nav", { y: -28, opacity: 0 })
        .from(".hero-title", { y: 60, opacity: 0, duration: 1.05 }, "-=0.55")
        .from(".hero-sub", { y: 32, opacity: 0 }, "-=0.65")
        .from(".hero-cta-row", { y: 20, opacity: 0 }, "-=0.65")
        .from(".hero-main-card", { y: 48, opacity: 0, scale: 0.97 }, "-=0.9")
        .from(".hero-floating-thumb", { y: 40, opacity: 0, rotation: -6 }, "-=1.0");

      gsap.to(".hero-floating-thumb", {
        y: "+=12",
        rotation: "-=2",
        duration: 6.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".hero-inner", {
        y: -36,
        scale: 0.99,
        opacity: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      const navLinks = gsap.utils.toArray<HTMLAnchorElement>(".hero-nav a");
      navLinksRef.current = navLinks as any;

      navLinks.forEach((link) => {
        const enter = () => {
          gsap.killTweensOf(link);
          gsap.to(link, {
            duration: 0.45,
            rotationX: 8,
            rotationY: -6,
            y: -6,
            scale: 1.03,
            ease: "power2.out",
            transformOrigin: "50% 50%",
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          });
        };
        const leave = () => {
          gsap.killTweensOf(link);
          gsap.to(link, {
            duration: 0.45,
            rotationX: 0,
            rotationY: 0,
            y: 0,
            scale: 1,
            ease: "power2.out",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          });
        };

        link.addEventListener("mouseenter", enter);
        link.addEventListener("mouseleave", leave);
        (link as any)._gsapEnter = enter;
        (link as any)._gsapLeave = leave;
      });

      const typeEl = typeRef.current;
      if (typeEl) {
        typeEl.textContent = "";
        const scheduleType = (text: string, speed = TYPE_SPEED) => {
          const handles: gsap.core.Tween[] = [];
          for (let i = 0; i <= text.length; i++) {
            const slice = text.slice(0, i);
            const delay = i * speed;
            const h = gsap.delayedCall(delay, () => {
              if (!typingState.current.active) return;
              typeEl.textContent = slice;
            });
            handles.push(h);
          }
          return handles;
        };
        const scheduleDelete = (from: string, speed = DELETE_SPEED) => {
          const handles: gsap.core.Tween[] = [];
          const len = from.length;
          for (let i = 0; i <= len; i++) {
            const slice = from.slice(0, len - i);
            const delay = i * speed;
            const h = gsap.delayedCall(delay, () => {
              if (!typingState.current.active) return;
              typeEl.textContent = slice;
            });
            handles.push(h);
          }
          return handles;
        };

        const master = gsap.timeline({ repeat: -1, repeatDelay: 0 });
        typingState.current.tl = master;

        sentences.forEach((s) => {
          master.add(() => {
            typingState.current.cancelHandles.forEach((h) => h.kill());
            typingState.current.cancelHandles = [];
            const handles = scheduleType(s);
            typingState.current.cancelHandles.push(...handles);
          });

          master.to({}, { duration: s.length * TYPE_SPEED + 0.08 });
          master.to({}, { duration: PAUSE_AFTER_TYPE });

          master.add(() => {
            const handles = scheduleDelete(s);
            typingState.current.cancelHandles.push(...handles);
          });

          master.to({}, { duration: s.length * DELETE_SPEED + 0.06 });
          master.to({}, { duration: 0.18 });
        });

        master.play();
      }
    }, rootRef);

    return () => {
      typingState.current.active = false;
      typingState.current.cancelHandles.forEach((h) => h.kill());
      typingState.current.cancelHandles = [];
      if (typingState.current.tl) typingState.current.tl.kill();

      const navLinks = gsap.utils.toArray<HTMLAnchorElement>(".hero-nav a");
      navLinks.forEach((link) => {
        const enter = (link as any)._gsapEnter;
        const leave = (link as any)._gsapLeave;
        if (enter) link.removeEventListener("mouseenter", enter);
        if (leave) link.removeEventListener("mouseleave", leave);
      });

      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="hero" className="relative min-h-screen overflow-hidden text-white">
      <style>{`
        .typewriter::after {
          content: '';
          display: inline-block;
          width: 10px;
          height: 18px;
          margin-left: 6px;
          background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6));
          opacity: 0.9;
          border-radius: 2px;
          animation: blink 1.2s steps(1) infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 0.9; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/hero-loop.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/60 to-black/85" />

      {/* NAVBAR */}
      <header
        className={cn(
          "hero-nav fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-6 sm:px-10 transition-all duration-300",
          isScrolled
            ? "border-b border-white/10 bg-white/8 py-3 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
            : "bg-transparent py-5"
        )}
      >
        <div className="flex items-center select-none">
          <h1 className="font-extrabold text-xl leading-[0.88] tracking-tight text-white">
            <span className="block">creati</span>
            <span className="block -mt-1">studio</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Use Cases", "Features", "Pricing", "About Us", "Speak"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative text-white/75 transition hover:text-white hover:-translate-y-[1px]
                before:absolute before:inset-x-0 before:-bottom-1 before:h-[2px]
                before:bg-gradient-to-r before:from-[#8b5cf6] before:via-[#ec4899] before:to-[#3b82f6]
                before:origin-center before:scale-x-0 before:transition before:duration-200
                hover:before:scale-x-100"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:inline-flex rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] p-[1.5px] shadow-[0_0_30px_rgba(99,102,241,0.55)]">
          <button className="flex items-center gap-2 rounded-full bg-black/85 px-5 py-2.5 text-sm font-semibold">
            <span>Get Started</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs">✦</span>
          </button>
        </div>

        <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/40">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </header>

      {/* HERO CONTENT */}
      <div className="hero-inner relative z-30 mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 pt-40 sm:px-6 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.95fr] lg:gap-20">
          <div className="space-y-7">
            <h1 className="hero-title font-extrabold leading-[0.92] tracking-tight text-[clamp(3.2rem,5.2vw,5.2rem)]">
              <span className="block text-white">Go Viral with</span>
              <span className="block -mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#ec4899] to-[#60a5fa]">
                creati studio
              </span>
            </h1>

            <p className="hero-sub max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              Transform ideas into cinematic stories with glass UI, spectral bloom, and motion crafted for the modern creator.
            </p>

            <div className="hero-cta-row flex flex-wrap items-center gap-4 pt-1">
              <button className="group rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition hover:border-white/30 hover:bg-white/15">
                Start free trial
                <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
              </button>

              <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/75 transition hover:border-white/35 hover:text-white">
                Watch demo
              </button>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative flex w-full flex-col items-end">
            <div className="hero-floating-thumb absolute -left-8 -top-12 hidden h-28 w-24 -rotate-6 items-center justify-center rounded-2xl border border-white/25 bg-black/70 shadow-[0_12px_32px_rgba(0,0,0,0.7)] sm:flex">
              <span className="text-2xl font-light">+</span>
            </div>

            <div className="hero-main-card relative w-full max-w-full rounded-[28px] border border-white/16 bg-white/4 p-[1px] backdrop-blur-2xl shadow-[0_36px_90px_rgba(0,0,0,0.75)]">
              <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-40 blur-2xl bg-[radial-gradient(circle_at_0%_0%,rgba(167,139,250,0.45),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.35),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.28),transparent_60%)]" />

              <div className="relative flex min-h-[260px] md:min-h-[300px] flex-col justify-between space-y-5 rounded-[24px] bg-black/35 p-6">
                <div className="rounded-[14px] border border-white/12 bg-white/4 px-4 py-6 text-sm text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <p
                    ref={typeRef}
                    className="typewriter text-[14px] md:text-[15px] leading-relaxed font-medium"
                    aria-live="polite"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    Create Video
                  </button>
                  <button className="rounded-full bg-white/7 px-4 py-2 text-xs text-white/85 hover:bg-white/12 transition">
                    Image to video
                  </button>
                  <button className="rounded-full bg-white/7 px-4 py-2 text-xs text-white/80 hover:bg-white/12 transition">
                    Text to video
                  </button>
                  <button className="rounded-full bg-white/7 px-4 py-2 text-xs text-white/80 hover:bg-white/12 transition">
                    URL to video
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1 rounded-full border border-white/14 bg-white/6 px-4 py-2.5 text-xs text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="flex items-center justify-between">
                      <span>VEO 3.1</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  <div className="ml-auto inline-flex rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] p-[1.5px] shadow-[0_0_30px_rgba(99,102,241,0.55)]">
                    <button className="flex items-center gap-2 rounded-full bg-black/85 px-6 py-3 text-sm font-semibold">
                      <span>Generate</span>
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs">
                        ✦
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FIXED CENTERED TAGS */}
            <div className="w-full flex justify-center mt-3">
              <div className="flex flex-wrap gap-2 text-xs text-white/60">
                {["Ads by VEO 3.1", "Viral by Sora2", "Product x SeeDance"].map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full border border-white/12 bg-black/40 px-3 py-1 hover:border-white/20 hover:text-white transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}