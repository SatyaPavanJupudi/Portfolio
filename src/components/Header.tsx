import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in view and highlight the matching nav item
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100; // Account for header height
      
      // Get all sections with their positions
      const sectionElements = navigation.map((nav) => {
        const element = document.getElementById(nav.href.replace('#', ''));
        if (element) {
          return {
            href: nav.href,
            element,
            top: element.offsetTop,
            height: element.offsetHeight
          };
        }
        return null;
      }).filter(Boolean);
      
      // Find the section that should be active
      let activeSection = null;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (scrollPosition >= section!.top - 50) {
          activeSection = section;
          break;
        }
      }
      
      // Default to home if we're at the very top
      if (scrollPosition < 100) {
        activeSection = sectionElements.find(s => s!.href === '#home');
      }
      
      if (activeSection && activeSection.href !== active) {
        setActive(activeSection.href);
      }
    };
    
    // Initial check
    handleScrollSpy();
    
    // Add scroll listener with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScrollSpy();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const scrollToSection = (href: string) => {
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element instanceof HTMLElement) {
        // Add extra offset to account for header height
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({ 
          top: elementPosition, 
          behavior: "smooth" 
        });
      }
    }
    setIsMenuOpen(false);
    // Set active immediately for better UX
    setActive(href);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 dark:bg-slate-900/90 backdrop-blur-lg border-b border-border/60 shadow-medium dark:shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-500 transition-colors duration-300">
              Portfolio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 sm:space-x-6">
              {navigation.map((item) => {
                const isActive = active === item.href;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      `px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ` +
                      (isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 ring-1 ring-blue-200/70 dark:ring-slate-700"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:scale-105")
                    }
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-full hover:bg-blue-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full hover:bg-blue-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200 dark:border-slate-600 rounded-xl mt-2 shadow-lg">
              {navigation.map((item) => {
                const isActive = active === item.href;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      `w-full text-left block px-4 py-3 rounded-lg text-base transition-all duration-300 ` +
                      (isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-700 ring-1 ring-blue-200/70 dark:ring-slate-600"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700")
                    }
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
