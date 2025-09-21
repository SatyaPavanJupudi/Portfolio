import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, School } from "lucide-react";

type EducationItem = {
  degree: string;
  fullDegree?: string; // Full form for display in card
  school: string;
  location: string;
  period: string;
  gpa?: string;
  highlights?: string[];
  coursework?: string[];
};

const education: EducationItem[] = [
  {
    degree: "B.Tech (CSE)",
    fullDegree: "B.Tech in Computer Science and Engineering",
    school: "Sri Vasavi Engineering College (Autonomous)",
    location: "Tadepalligudem, India",
    period: "2021 - 2025",
    gpa: "9.18 / 10",
    highlights: [
      "Programming and Cloud Computing Associate at GDSC",
      "Built multiple full‑stack projects and internal tools",
      "Active in coding clubs and tech communities",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Web Development",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    degree: "Intermediate (XII)",
    school: "Pavitra Co-Operative Junior College",
    location: "Machilipatnam, India",
    period: "2019 - 2021",
    gpa: "938 / 1000",
    highlights: [
      "Strong focus on Mathematics, Physics, and Chemistry (MPC)",
      "Achieved 90%+ in Mathematics and Physics",
      "Participated in inter-college science and quiz competitions",
    ],
    coursework: ["Mathematics", "Physics", "Chemistry"],
  },
  {
    degree: "Schooling (X)",
    school: "Sri Rama Krishna E.M. High School",
    location: "Machilipatnam, India",
    period: "2009 - 2019",
    gpa: "9.7 / 10",
    highlights: [
      "Graduated with distinction (Top performer)",
      "School-level Olympiad and quiz participant",
      "Leadership roles in school activities and events",
    ],
  },
];

const certifications = [
  { name: "AWS Cloud Fundamentals" },
  { name: "React & TypeScript Advanced" },
  { name: "Docker & DevOps Essentials" },
  { name: "Database Design & SQL" },
];

// Function to get appropriate icon for each education level
const getEducationIcon = (degree: string, fullDegree?: string) => {
  const degreeToCheck = fullDegree || degree;
  if (/b\s*\.?\s*tech|bachelor/i.test(degreeToCheck)) {
    return GraduationCap;
  } else if (/(senior\s*secondary|intermediate|\(xii\))/i.test(degreeToCheck)) {
    return BookOpen;
  } else {
    return School;
  }
};

export function Education() {
  const [active, setActive] = useState(0);
  const activeEd = education[active] ?? education[0];
  const degreeForChecking = activeEd.fullDegree || activeEd.degree;
  const showCerts = /b\s*\.?\s*tech|bachelor/i.test(degreeForChecking);
  // Updated label rules: B.Tech -> CGPA, XII -> Marks, others (e.g., X) -> GPA
  const scoreLabel = /b\s*\.?\s*tech|bachelor/i.test(degreeForChecking)
    ? "CGPA"
    : /(senior\s*secondary|intermediate|\(xii\))/i.test(degreeForChecking)
    ? "Marks"
    : "GPA";

  return (
    <section id="education" className="py-20 bg-gradient-light dark:bg-muted/30 scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <GraduationCap className="w-3 h-3 mr-2" />
            Education
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Academic Background</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Degrees, key highlights, and relevant coursework that shaped my foundation.
          </p>
        </motion.div>

        {/* Creative Horizontal Timeline */}
        <div className="relative mb-16">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center w-full max-w-7xl px-6">
              {education.map((ed, idx) => {
                const IconComponent = getEducationIcon(ed.degree, ed.fullDegree);
                const isLast = idx === education.length - 1;
                const isActive = idx === active;
                const isCompleted = idx < active;
                
                return (
                  <React.Fragment key={ed.degree + idx}>
                    {/* Timeline Node with Creative Design */}
                    <div className="flex flex-col items-center relative z-20">
                      <motion.button
                        onClick={() => setActive(idx)}
                        className="group relative flex flex-col items-center text-center focus:outline-none"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        title={`${ed.degree} • ${ed.school}`}
                      >
                        {/* Main Node */}
                        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-3 transition-all duration-500 shadow-lg ${
                          isActive
                            ? "bg-gradient-to-br from-primary/90 to-primary text-primary-foreground border-primary/60 shadow-primary/30"
                            : isCompleted
                            ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white border-emerald-300 shadow-emerald-500/30"
                            : "bg-card dark:bg-slate-800 text-muted-foreground border-border hover:border-primary/60 hover:shadow-primary/20 hover:bg-accent"
                        }`}>
                          <IconComponent className={`w-7 h-7 transition-all duration-300 ${
                            isActive ? "animate-pulse" : ""
                          }`} />
                          
                          {/* Progress Indicator */}
                          {isCompleted && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <motion.div
                                className="w-3 h-3 text-white"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                ✓
                              </motion.div>
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                      
                      {/* Degree Label */}
                      <motion.div
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
                      >
                        <div className={`text-sm font-bold transition-colors duration-300 ${
                          isActive 
                            ? "text-primary dark:text-primary" 
                            : "text-muted-foreground"
                        }`}>
                          {ed.degree}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {ed.period}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Creative Connecting Line */}
                    {!isLast && (
                      <div className="flex-1 mx-6 relative">
                        {/* Background Line */}
                        <div className="h-2 bg-gradient-to-r from-border to-muted rounded-full shadow-inner">
                          {/* Animated Progress Line */}
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full shadow-md"
                            initial={{ width: 0 }}
                            animate={{ width: isCompleted ? "100%" : "0%" }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                        
                        {/* Floating Particles */}
                        {isCompleted && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-primary/60 rounded-full"
                                initial={{ 
                                  x: 0, 
                                  y: 0, 
                                  opacity: 0,
                                  scale: 0
                                }}
                                animate={{ 
                                  x: "100%", 
                                  y: [0, -10, 0],
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0]
                                }}
                                transition={{ 
                                  duration: 2,
                                  delay: i * 0.3,
                                  repeat: Infinity,
                                  repeatDelay: 1
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Creative Active Education Detail */}
        <motion.div
          key={activeEd.degree}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            <Card className="relative border border-border/60 shadow-medium dark:shadow-lg bg-card/95 dark:bg-card backdrop-blur-sm overflow-hidden hover:shadow-glow dark:hover:shadow-xl transition-all duration-300">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20"></div>
              </div>
              
              <CardHeader className="relative pb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shadow-soft">
                      {React.createElement(getEducationIcon(activeEd.degree, activeEd.fullDegree), { className: "w-6 h-6 text-primary" })}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gradient font-bold">
                        {activeEd.fullDegree || activeEd.degree}
                      </CardTitle>
                      {activeEd.gpa && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.4 }}
                        >
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-soft">
                            {scoreLabel}: {activeEd.gpa}
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </CardHeader>
              
              <CardContent className="relative pt-0">
                {/* School Info with Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap items-center gap-6 text-sm mb-6 p-4 rounded-xl bg-muted/30 dark:bg-muted/20 border border-border/30"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{activeEd.school}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{activeEd.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{activeEd.location}</span>
                  </div>
                </motion.div>

                {/* Highlights Section */}
                {activeEd.highlights && activeEd.highlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-6"
                  >
                    <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      Key Highlights
                    </h4>
                    <div className="space-y-3">
                      {activeEd.highlights.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/30"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-foreground">{h}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Coursework Section */}
                {activeEd.coursework && activeEd.coursework.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeEd.coursework.map((c, i) => (
                        <motion.div
                          key={c}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                        >
                          <Badge variant="secondary" className="shadow-soft hover:shadow-medium transition-all duration-300">
                            {c}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Creative Certifications */}
        {showCerts && certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="relative">
              <div className="relative p-8 rounded-3xl bg-muted/20 dark:bg-muted/10 backdrop-blur-sm border border-border/60 shadow-medium dark:shadow-lg">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-soft">
                      <Award className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold text-gradient">
                      Certifications
                    </h3>
                  </div>
                  <p className="text-muted-foreground">Professional certifications and achievements</p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/60 hover:shadow-glow dark:hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                            {cert.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">Professional Certification</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
