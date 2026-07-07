import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Publications from "@/components/Publications";
import Contact from "@/components/Contact";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Aurora from "@/components/Aurora";
import BootLoader from "@/components/BootLoader";
import CommandPalette from "@/components/CommandPalette";
import SectionRail from "@/components/SectionRail";

export default function Home() {
  return (
    <>
      <BootLoader />
      <Aurora />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <SectionRail />
      <SmoothScroll>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Publications />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
