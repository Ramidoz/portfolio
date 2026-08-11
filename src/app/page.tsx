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
import ScrollProgress from "@/components/ScrollProgress";
import Aurora from "@/components/Aurora";
import CommandPalette from "@/components/CommandPalette";
import SectionRail from "@/components/SectionRail";
import Terminal from "@/components/Terminal";
import InterviewMode from "@/components/InterviewMode";
import Overdrive from "@/components/Overdrive";
import ModelCard from "@/components/ModelCard";

export default function Home() {
  return (
    <>
      <Aurora />
      <ScrollProgress />
      <CommandPalette />
      <Terminal />
      <InterviewMode />
      <Overdrive />
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
          <ModelCard />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
