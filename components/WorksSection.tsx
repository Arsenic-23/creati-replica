"use client";

import { useEffect, useRef } from "react";
import { scrollReveal } from "@/lib/animations/scrollReveal";
import { works } from "@/lib/utils/mockData";

export default function WorksSection() {
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
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-gray-900 tracking-tight"
        >
          Our Work
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {works.map((work) => (
            <div
              key={work.id}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Image Placeholder</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500 mb-2 block">
                  {work.category}
                </span>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {work.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

