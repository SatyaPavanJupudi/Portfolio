import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import { useState } from "react";

type EducationItem = {
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa?: string;
  highlights?: string[];
  coursework?: string[];
};

const education: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science",
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

export function Education() {
  const [active, setActive] = useState(0);
  const activeEd = education[active] ?? education[0];
  const progress = education.length > 1 ? (active / (education.length - 1)) * 100 : 100;
  const showCerts = /b\s*\.?\s*tech|bachelor/i.test(activeEd.degree);
  // Updated label rules: B.Tech -> CGPA, XII -> Marks, others (e.g., X) -> GPA
  const scoreLabel = /b\s*\.?\s*tech|bachelor/i.test(activeEd.degree)
    ? "CGPA"
    : /(senior\s*secondary|intermediate|\(xii\))/i.test(activeEd.degree)
    ? "Marks"
    : "GPA";

  return (
    <section id="education" className="py-20 bg-muted/30 scroll-mt-24 md:scroll-mt-28">
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

        {/* Horizontal Stepper */}
        <div className="relative mb-10 overflow-x-auto">
          <div className="min-w-[520px] sm:min-w-[640px] md:min-w-0 flex items-center justify-between gap-4 px-2">
            {education.map((ed, idx) => (
              <button
                key={ed.degree + idx}
                onClick={() => setActive(idx)}
                className={`group relative flex-1 min-w-40 flex flex-col items-center text-center focus:outline-none`}
                title={`${ed.degree} • ${ed.school}`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-sm ${
                    idx === active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-slate-900 text-foreground border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="mt-2 text-[11px] sm:text-xs font-medium line-clamp-1">{ed.degree}</div>
                <div className="hidden sm:block text-[11px] text-muted-foreground">{ed.period}</div>
              </button>
            ))}
          </div>
          {/* Track */}
          <div className="absolute left-2 right-2 -z-10 top-4 sm:top-5 h-1 rounded bg-slate-200 dark:bg-slate-800">
            <motion.div
              className="h-1 rounded bg-gradient-to-r from-blue-600 to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        {/* Active Education Detail */}
        <motion.div
          key={activeEd.degree}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex flex-wrap items-center gap-3">
                {activeEd.degree}
                {activeEd.gpa && (
                  <Badge variant="secondary" className="text-xs">{scoreLabel}: {activeEd.gpa}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center"><BookOpen className="w-4 h-4 mr-2" />{activeEd.school}</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{activeEd.period}</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{activeEd.location}</div>
              </div>

              {activeEd.highlights && activeEd.highlights.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm flex items-center"><Award className="w-4 h-4 mr-2" />Highlights</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {activeEd.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeEd.coursework && activeEd.coursework.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Relevant Coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeEd.coursework.map((c) => (
                      <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Certifications */}
        {showCerts && certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold mb-4">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge key={cert.name} variant="outline" className="text-xs">
                  <Award className="w-3 h-3 mr-2" />
                  {cert.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
