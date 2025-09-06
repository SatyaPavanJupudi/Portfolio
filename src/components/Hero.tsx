import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ArrowDown, Code, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Typewriter animation for the name
  const fullName ="Satya Pavan Jupudi";
  const [typedName, setTypedName] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTypedName(fullName.slice(0, i + 1));
      i += 1;
      if (i >= fullName.length) {
        clearInterval(id);
      }
    }, 90);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setCursorOn((v) => !v), 600);
    return () => clearInterval(blink);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-slate-900 pt-20 sm:pt-24">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute top-10 left-4 w-40 h-40 sm:top-20 sm:left-12 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="hidden sm:block absolute bottom-10 right-6 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-6 py-3 text-sm font-medium border-blue-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              Welcome to my portfolio
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block text-foreground mb-2">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              {typedName}
              <span
                aria-hidden
                className={`ml-1 inline-block w-[2px] h-[0.9em] align-[-0.1em] bg-blue-500 transition-opacity ${
                  cursorOn ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Full-Stack Developer crafting exceptional digital experiences with
            modern technologies and innovative solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="px-8 py-6 text-lg font-medium group bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 rounded-xl shadow-lg hover:shadow-blue-500/25 focus-visible:ring-2 focus-visible:ring-blue-400/60 text-white"
              aria-label="View my projects"
            >
              <Code className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="px-8 py-6 text-lg font-medium group border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300 rounded-xl backdrop-blur-sm hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-400/60"
              aria-label="Contact me"
            >
              <Mail className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Get In Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16"
          >
            <Button
              variant="ghost"
              size="icon"
              className="group w-12 h-12 hover:scale-110 transition-all duration-300 rounded-full bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/10 hover:ring-2 hover:ring-[#181717]/30 focus-visible:ring-2 focus-visible:ring-[#181717]/50"
              onClick={() => window.open("https://github.com/SatyaPavanJupudi", "_blank")}
              aria-label="GitHub profile"
            >
              <Github className="w-6 h-6 text-[#181717] dark:text-white transition-transform duration-300 group-hover:scale-110" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="group w-12 h-12 hover:scale-110 transition-all duration-300 rounded-full bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-[#0A66C2]/10 hover:ring-2 hover:ring-[#0A66C2]/30 focus-visible:ring-2 focus-visible:ring-[#0A66C2]/50"
              onClick={() => window.open("https://linkedin.com/in/satya-pavan-jupudi-8b63a4235/", "_blank")}
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-6 h-6 text-[#0A66C2] transition-transform duration-300 group-hover:scale-110" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="group w-12 h-12 hover:scale-110 transition-all duration-300 rounded-full bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-[#EA4335]/10 hover:ring-2 hover:ring-[#EA4335]/30 focus-visible:ring-2 focus-visible:ring-[#EA4335]/50"
              onClick={() => window.open("mailto:jupudisatyapavan@gmail.com")}
              aria-label="Email me"
            >
              <Mail className="w-6 h-6 text-[#EA4335] transition-transform duration-300 group-hover:scale-110" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="animate-bounce"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection("about")}
              className="w-12 h-12 rounded-full hover:bg-blue-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-400/60"
              aria-label="Scroll to About section"
            >
              <ArrowDown className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
