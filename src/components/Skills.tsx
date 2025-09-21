import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Code2, 
  Wrench, 
  Globe,
  Server,
  SquareStack,
  Database,
  Shield
} from "lucide-react";
import { 
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiNestjs,
  SiGithub,
  SiDocker,
  SiArgo,
  SiKeycloak
} from "react-icons/si";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const skillCategories = {
  frontend: {
    title: "Frontend Development",
    icon: Globe,
    skills: [
      { name: "React", level: 75, description: "Advanced component architecture, hooks, context" },
      { name: "TypeScript", level: 75, description: "Strong typing, advanced patterns, utility types" },
      { name: "Tailwind CSS", level: 60, description: "Custom components, responsive design" },
      { name: "JavaScript", level: 80, description: "ES6+, async/await, DOM manipulation" },
      { name: "Shadcn UI Components", level: 70, description: "Modern component library, design system" },
      { name: "Better Auth UI", level: 70, description: "Modern component library, design system" },
    ]
  },
  backend: {
    title: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90, description: "Express, middleware, authentication" },
      { name: "Express.js", level: 85, description: "RESTful APIs, middleware, authentication" },
      { name: "NestJS", level: 80, description: "TypeScript backend, decorators, dependency injection" },
      { name: "PostgreSQL", level: 88, description: "Complex queries, optimization, indexing" },
      { name: "BetterAuth", level: 75, description: "Modern authentication library, session management" },
      { name: "Keycloak", level: 70, description: "Identity and access management, SSO, OAuth2" },
      { name: "ElectricSQL", level: 65, description: "Real-time database synchronization, local-first apps" }
    ]
  },
  tools: {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: [
      { name: "Git", level: 88, description: "Branching strategies, merge conflicts, workflows" },
      { name: "Docker", level: 50, description: "Containerization, docker-compose, optimization" },
      { name: "AWS", level: 78, description: "EC2, S3, Lambda, RDS, CloudFront" },
      { name: "Argo CD", level: 85, description: "Deployment, serverless functions, analytics" },
    ]
  },
//   mobile: {
//     title: "Mobile & Other",
//     icon: Smartphone,
//     skills: [
//       { name: "React Native", level: 75, description: "Cross-platform apps, native modules" },
//       { name: "Flutter", level: 70, description: "Dart, widgets, state management" },
//       { name: "PWA", level: 85, description: "Service workers, offline functionality" },
//       { name: "Electron", level: 72, description: "Desktop apps, IPC, native integration" },
//       { name: "WebRTC", level: 68, description: "Real-time communication, peer connections" },
//       { name: "Socket.io", level: 80, description: "Real-time features, scaling, rooms" },
//     ]
//   }
};

// Show exactly the requested set with branded colors; use lucide fallbacks for brands without simple-icons
const skillIconGrid: Array<{ name: string; Icon: React.ComponentType<{ className?: string }>; colorClass?: string }>= [
  { name: "React", Icon: SiReact, colorClass: "text-[#61DAFB]" },
  { name: "Tailwind", Icon: SiTailwindcss, colorClass: "text-[#38BDF8]" },
  { name: "NestJS", Icon: SiNestjs, colorClass: "text-[#E0234E]" },
  { name: "PostgreSQL", Icon: SiPostgresql, colorClass: "text-[#4169E1]" },
  { name: "BetterAuth", Icon: Shield, colorClass: "text-[#0EA5E9]" },
  { name: "Keycloak", Icon: SiKeycloak, colorClass: "text-[#4B5563]" },
  { name: "ElectricSQL", Icon: Database, colorClass: "text-[#10B981]" },
  { name: "TypeScript", Icon: SiTypescript, colorClass: "text-[#3178C6]" },
  { name: "Node.js", Icon: SiNodedotjs, colorClass: "text-[#5FA04E]" },
  { name: "JavaScript", Icon: SiJavascript, colorClass: "text-[#F7DF1E]" },
  { name: "shadcn", Icon: SquareStack, colorClass: "text-foreground" },
  { name: "GitHub", Icon: SiGithub, colorClass: "text-black dark:text-white" },
  { name: "Docker", Icon: SiDocker, colorClass: "text-[#2496ED]" },
  { name: "ArgoCD", Icon: SiArgo, colorClass: "text-[#EF7B4D]" },
];

function levelToLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 65) return "Intermediate";
  return "Beginner";
}

function SkillTile({ skill, index }: { skill: any; index: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(skill.level / 20)));
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="rounded-xl border border-border/40 bg-card/90 dark:bg-slate-900/40 backdrop-blur-sm p-5 shadow-soft dark:shadow-sm hover:shadow-medium dark:hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold text-base">{skill.name}</h4>
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
          {levelToLabel(skill.level)}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{skill.description}</p>
      <div className="mt-4 flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-colors ${
              i < filled ? "w-6 bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]" : "w-5 bg-slate-200 dark:bg-slate-700"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{skill.level}%</span>
      </div>
    </motion.div>
  );
}

function RadarChart({ title, data }: { title: string; data: Array<{ name: string; level: number }> }) {
  const labels = data.map((d) => d.name);
  const values = data.map((d) => d.level);

  const chartData: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderColor: "rgba(37, 99, 235, 0.8)",
        pointBackgroundColor: "rgba(37, 99, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(148,163,184,0.25)" },
        grid: { color: "rgba(148,163,184,0.25)" },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false },
        pointLabels: {
          color: "hsl(var(--foreground))",
          font: { size: 11 },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed.r}%` },
      },
    },
  };

  return (
    <div className="relative h-full">
      <Radar data={chartData} options={options} />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-gradient-light dark:bg-muted/30 scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Code2 className="w-3 h-3 mr-2" />
            Skills & Expertise
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Technical Proficiency
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and expertise across
            different domains of software development.
          </p>
        </motion.div>

        {/* Skill Icon Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4">
            {skillIconGrid.map(({ name, Icon, colorClass }) => (
              <div
                key={name}
                className="group flex flex-col items-center gap-2"
                title={name}
                aria-label={name}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/80 dark:bg-slate-800/80 ring-1 ring-slate-200/60 dark:ring-slate-700/60 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-transparent group-hover:ring-2 group-hover:ring-primary/40">
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${colorClass ?? "text-foreground"}`} />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 gap-2 lg:gap-3 mb-8">
              {Object.entries(skillCategories).map(([key, category]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="w-full justify-center flex items-center gap-2 text-xs sm:text-sm lg:text-[0.95rem] px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 h-10 lg:h-11 hover:bg-background/60"
                >
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.title}</span>
                  <span className="sm:hidden">{category.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(skillCategories).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center pb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <category.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:gap-8 md:grid-cols-5">
                      <div className="md:col-span-2 min-w-0">
                        <div className="w-full max-w-sm mx-auto aspect-square sm:max-w-md sm:aspect-[4/3] md:max-w-none md:h-72 md:aspect-auto">
                          <RadarChart title={category.title} data={category.skills} />
                        </div>
                      </div>
                      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {category.skills.map((skill, index) => (
                          <SkillTile key={skill.name} skill={skill} index={index} />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
