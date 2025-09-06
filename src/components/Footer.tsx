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
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4">
                Satya Pavan Jupudi
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Full-Stack Developer passionate about creating exceptional digital 
                experiences with modern technologies and innovative solutions.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("https://github.com/SatyaPavanJupudi", "_blank")}
                  className="hover:scale-110 transition-transform"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("https://www.linkedin.com/in/satya-pavan-jupudi-8b63a4235/", "_blank")}
                  className="hover:scale-110 transition-transform"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("mailto:jupudisatyapavan@gmail.com")}
                  className="hover:scale-110 transition-transform"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Satya Pavan Jupudi. All rights reserved.
              </p>
              <Badge variant="secondary" className="text-xs">
                <Heart className="w-3 h-3 mr-1 text-red-500" />
                Made with React
              </Badge>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
