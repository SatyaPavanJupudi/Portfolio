import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading delay, or set to false immediately if page is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loading screen for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Also hide loading screen when page is fully loaded
  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isLoading && <LoadingScreen />}
      {!isLoading && <Header />}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
