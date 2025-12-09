import HeroSection from "@/components/HeroSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import GallerySection from "@/components/GallerySection";
import ModesSection from "@/components/ModesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050509]">
      <HeroSection />
      <LatestNewsSection />
      <GallerySection />
      <ModesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
