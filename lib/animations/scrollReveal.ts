import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const scrollReveal = {
  fadeIn: (element: HTMLElement | null, options?: {
    start?: string;
    end?: string;
    duration?: number;
  }) => {
    if (!element) return;
    
    gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration || 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: options?.start || "top 80%",
          end: options?.end || "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
  },
  
  scaleIn: (element: HTMLElement | null) => {
    if (!element) return;
    
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  },
  
  slideInLeft: (element: HTMLElement | null) => {
    if (!element) return;
    
    gsap.fromTo(
      element,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  },
  
  slideInRight: (element: HTMLElement | null) => {
    if (!element) return;
    
    gsap.fromTo(
      element,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  },
};

