import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
//   Twitter,
  MessageSquare
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "jupudisatyapavan@gmail.com",
  href: "mailto:jupudisatyapavan@gmail.com",
  iconColor: "text-rose-600 dark:text-rose-400",
  bgColor: "bg-rose-600/10 dark:bg-rose-400/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7981371244",
  href: "tel:+917981371244",
  iconColor: "text-emerald-600 dark:text-emerald-400",
  bgColor: "bg-emerald-600/10 dark:bg-emerald-400/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Machilipatnam, India",
  href: "https://www.google.com/maps/place/Machilipatnam,+India",
  iconColor: "text-amber-600 dark:text-amber-400",
  bgColor: "bg-amber-600/10 dark:bg-amber-400/10",
  }
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/SatyaPavanJupudi",
  username: "@SatyaPavanJupudi",
  iconColor: "text-[#181717] dark:text-white",
  bgColor: "bg-[#181717]/10 dark:bg-white/10",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/satya-pavan-jupudi-8b63a4235/",
  username: "Satya Pavan Jupudi",
  iconColor: "text-[#0A66C2] dark:text-[#70B5F9]",
  bgColor: "bg-[#0A66C2]/10 dark:bg-[#70B5F9]/10",
  },
//   {
//     icon: Twitter,
//     label: "Twitter",
//     href: "https://twitter.com",
//     username: "@johndev",
//   }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setStatus("submitting");
      const body = encode({ "form-name": "contact", ...formData });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (res.ok) {
        setStatus("success");
        setToast({ type: "success", message: "Thanks! Your message was sent successfully. I'll get back to you soon!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      setStatus("error");
      setToast({ type: "error", message: "Something went wrong. Please try again." });
      console.error("Form submission failed", err);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-light dark:bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <MessageSquare className="w-3 h-3 mr-2" />
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm always interested in hearing about new opportunities and exciting projects.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border border-border/60 shadow-medium dark:shadow-lg bg-card/95 dark:bg-card hover:shadow-glow dark:hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4 flex-wrap">
                    <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center transition-transform hover:scale-105 shadow-soft dark:shadow-none`}>
                      <info.icon className={`w-5 h-5 ${info.iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium">{info.label}</p>
                      <a 
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border/60 shadow-medium dark:shadow-lg bg-card/95 dark:bg-card hover:shadow-glow dark:hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Follow Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((social) => (
                  <div key={social.label} className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-start sm:items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 ${social.bgColor} rounded-lg flex items-center justify-center transition-transform hover:scale-105 shadow-soft dark:shadow-none`}>
                        <social.icon className={`w-5 h-5 ${social.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium">{social.label}</p>
                        <p className="text-sm text-muted-foreground break-words">{social.username}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      aria-label={`Follow on ${social.label}`}
                      onClick={() => window.open(social.href, "_blank")}
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border border-border/60 shadow-medium dark:shadow-lg bg-card/95 dark:bg-card hover:shadow-glow dark:hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Netlify required hidden input */}
                  <input type="hidden" name="form-name" value="contact" />
                  {/* Honeypot field */}
                  <p className="hidden">
                    <label>
                      Don’t fill this out if you’re human: <input name="bot-field" onChange={() => {}} />
                    </label>
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Button type="submit" className="w-full" size="lg" disabled={status === "submitting"}>
                      <Send className="w-4 h-4 mr-2" />
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Toast
              variant={toast.type}
              position="bottom-right"
              title={toast.type === "success" ? "✓ Success" : "✗ Error"}
              description={toast.message}
              onClose={() => setToast(null)}
              duration={5000}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
