import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const parallaxUtils = {
  parallaxY: (element: HTMLElement | null, speed: number = 0.5) => {
    if (!element) return;
    
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },
  
  parallaxX: (element: HTMLElement | null, speed: number = 0.5) => {
    if (!element) return;
    
    gsap.to(element, {
      xPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },
  
  parallaxScale: (element: HTMLElement | null, scale: number = 1.2) => {
    if (!element) return;
    
    gsap.to(element, {
      scale: scale,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },
};

