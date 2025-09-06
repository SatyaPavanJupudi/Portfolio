import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-8">
            {/* Brand Section */}
            <div className="md:col-span-3 lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4 text-left">
                Satya Pavan Jupudi
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md md:max-w-xl mx-auto md:mx-0 text-justify">
                Full-Stack Developer passionate about creating exceptional digital 
                experiences with modern technologies and innovative solutions.
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("https://github.com/SatyaPavanJupudi", "_blank")}
                  aria-label="GitHub profile"
                  className="hover:scale-110 transition-transform text-[#181717] dark:text-white hover:bg-[#181717]/10 dark:hover:bg-white/10"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("https://www.linkedin.com/in/satya-pavan-jupudi-8b63a4235/", "_blank")}
                  aria-label="LinkedIn profile"
                  className="hover:scale-110 transition-transform text-[#0A66C2] dark:text-[#70B5F9] hover:bg-[#0A66C2]/10 dark:hover:bg-[#70B5F9]/10"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("mailto:jupudisatyapavan@gmail.com")}
                  aria-label="Send email"
                  className="hover:scale-110 transition-transform text-rose-600 dark:text-rose-400 hover:bg-rose-600/10 dark:hover:bg-rose-400/10"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Projects", "Skills", "Experience", "Education", "Contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            {/* <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>API Development</li>
                <li>UI/UX Design</li>
                <li>Consulting</li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-2 mb-2 md:mb-0 text-center md:text-left">
              <p className="text-sm text-muted-foreground text-justify">
                © {currentYear} Satya Pavan Jupudi.
                {" "}
                <span className="block md:inline">All rights reserved.</span>
              </p>
              <Badge variant="secondary" className="text-xs">
                <Heart className="w-3 h-3 mr-1 text-red-500 dark:text-red-400" />
                Made with React
              </Badge>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center"
            >
              <ArrowUp className="w-4 h-4 mr-1 text-blue-600 dark:text-blue-400" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
