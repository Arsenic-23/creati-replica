import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create and export a shared GSAP instance
export const gsapInstance = gsap;

// Re-export GSAP for convenience
export default gsap;

