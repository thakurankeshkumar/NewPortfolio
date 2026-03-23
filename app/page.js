import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectSection from "@/components/sections/ProjectSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}