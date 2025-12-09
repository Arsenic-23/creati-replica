import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

// Export ScrollTrigger defaults
export const scrollTriggerDefaults = {
  // Default ScrollTrigger configuration
  markers: false,
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
};

// Apply defaults (optional - can be overridden per instance)
ScrollTrigger.defaults({
  ...scrollTriggerDefaults,
});

// Export ScrollTrigger for direct use
export { ScrollTrigger };
export default ScrollTrigger;

