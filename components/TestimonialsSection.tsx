"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/utils/mockData";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) setNavHeight(nav.offsetHeight);

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const ctx = gsap.context(() => {
      const viewportHeight = window.innerHeight;

      // Heading Animation
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        });
      }

      // Scroll distance
      const scrollDistance = track.scrollWidth - wrapper.offsetWidth;
      const centerOffset = viewportHeight / 2 - 200;

      gsap.set(track, { y: centerOffset });

      // Pin + Horizontal Scroll
      ScrollTrigger.create({
        trigger: wrapper,
        start: `top+=${navHeight} top`,
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1.2,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.to(track, {
            x: -scrollDistance * self.progress,
            ease: "none",
            overwrite: "auto",
          });
        },
      });

      // Fade-in cards
      const cards = Array.from(track.children) as HTMLElement[];
      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapper,
          start: `top+=${navHeight + 120} 80%`,
        },
      });

      // Dragging logic
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let velocity = 0;

      const onDown = (e: any) => {
        isDown = true;
        startX = e.pageX || e.touches?.[0].pageX;
        scrollLeft = -gsap.getProperty(track, "x") as number;
      };

      const onMove = (e: any) => {
        if (!isDown) return;
        const x = e.pageX || e.touches?.[0].pageX;
        const walk = (x - startX) * 1.2;
        const target = scrollLeft - walk;
        velocity = target - (-gsap.getProperty(track, "x"));

        gsap.to(track, {
          x: -Math.min(Math.max(target, 0), scrollDistance),
          duration: 0.2,
          overwrite: "auto",
        });
      };

      const onUp = () => {
        isDown = false;
        gsap.to(track, {
          x: `+=${velocity * 8}`,
          duration: 0.8,
          ease: "power3.out",
          modifiers: {
            x: (value) => {
              const num = parseFloat(value);
              return `${Math.min(Math.max(num, -scrollDistance), 0)}`;
            },
          },
        });
      };

      track.addEventListener("mousedown", onDown);
      track.addEventListener("touchstart", onDown);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onMove);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchend", onUp);

      return () => {
        track.removeEventListener("mousedown", onDown);
        track.removeEventListener("touchstart", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("touchend", onUp);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [navHeight]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-20 text-white text-center tracking-tight"
        >
          Voices from the Community
        </h2>

        {/* Wrapper */}
        <div ref={wrapperRef} className="relative h-[70vh] overflow-hidden">
          {/* Horizontal Track */}
          <div
            ref={trackRef}
            className="flex flex-row gap-10 px-6 w-max cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="testimonial-card flex-shrink-0 w-[340px] md:w-[400px] transition-transform duration-300 hover:scale-[1.04]"
              >
                <div className="
                  rounded-3xl 
                  bg-white/10 backdrop-blur-2xl 
                  border border-white/15 
                  p-8 h-full flex flex-col 
                  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]
                  hover:border-white/25
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
                  transition-all duration-300
                ">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="text-xl bg-gradient-to-br from-yellow-300 to-amber-600 bg-clip-text text-transparent drop-shadow-sm"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white/85 mb-8 leading-relaxed text-lg italic flex-grow">
                    "{t.quote}"
                  </p>

                  {/* Footer */}
                  <div className="border-t border-white/15 pt-5">
                    <div className="font-semibold text-white text-lg">
                      {t.name}
                    </div>
                    <div className="text-sm text-white/55">
                      {t.role} • {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
