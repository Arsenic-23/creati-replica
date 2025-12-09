import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const heroAnimations = {
  fadeInUp: (element: HTMLElement | null) => {
    if (!element) return;
    
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  },
  
  staggerChildren: (container: HTMLElement | null, children: string) => {
    if (!container) return;
    
    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );
  },
};

