import { Navbar } from "@/components/chrome/navbar";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Contact, Footer } from "@/components/contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F0E8] text-[#111014]">
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Manifesto />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
