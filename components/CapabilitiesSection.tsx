"use client";

import { useEffect, useRef } from "react";
import { scrollReveal } from "@/lib/animations/scrollReveal";
import { capabilities } from "@/lib/utils/mockData";

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      scrollReveal.fadeIn(titleRef.current);
    }
    if (gridRef.current) {
      setTimeout(() => {
        scrollReveal.fadeIn(gridRef.current);
      }, 200);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-gray-900 tracking-tight"
        >
          What We Do
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {capabilities.map((capability) => (
            <div
              key={capability.id}
              className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-4">{capability.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {capability.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

