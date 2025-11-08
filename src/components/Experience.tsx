import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
	{
		title: "Software Development Engineer - I",
		company: "M2P Solutions Private Limited",
		location: "Hyderabad, India",
		period: "2025 - Present",
		type: "Full-time",
		description:
			"Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and driving technical architecture decisions.",
		achievements: [
			"Architected and deployed 4+ enterprise web applications handling 10,000+ daily active users",
			"Led technical implementation of payment gateway integration and transaction processing",
			"Optimized application performance resulting in 35% reduction in load time",
			"Implemented secure authentication and authorization systems using Better Auth",
		],
		technologies: ["React", "Node.js", "NestJS", "TypeScript", "PostgreSQL", "Docker", "Better Auth", "shadcn/ui"],
	},
	{
		title: "Software Development Engineer - I (Intern)",
		company: "M2P Solutions Private Limited",
		location: "Hyderabad, India",
		period: "2025",
		type: "Internship",
		duration: "3 months",
		description:
			"Developed scalable web applications and REST APIs for client projects. Collaborated with design and product teams to deliver high-quality solutions.",
		achievements: [
			"Developed 2+ fintech-related web applications and REST APIs from requirements to deployment",
			"Built responsive UI components with React and modern styling frameworks",
			"Designed and optimized PostgreSQL databases for efficient data retrieval",
			"Debugged and resolved production issues with rapid turnaround time",
		],
		technologies: ["React", "Express.js", "PostgreSQL", "Node.js", "GitHub"],
	},
	{
		title: "Programming and Cloud Computing Associate",
		company: "Google Developer Student Clubs, SVEC",
		location: "Tadepalligudem, India",
		period: "2023 - 2024",
		type: "Part-time",
		description:
			"Specialized in creating responsive and interactive user interfaces for various client websites and web applications.",
		achievements: [
			"Organized and conducted workshops on cloud computing and programming fundamentals",
			"Mentored 20+ students in web development best practices and coding standards",
			"Created educational content and technical documentation for community members",
			"Promoted technology awareness and skill development within the student community",
		],
		technologies: ["React", "JavaScript", "HTML5", "CSS3", "SQL"],
	},
];

export function Experience() {
	return (
		<section id="experience" className="py-20 bg-gradient-light dark:bg-background scroll-mt-24 md:scroll-mt-28">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<Badge variant="outline" className="mb-4">
						<Briefcase className="w-3 h-3 mr-2" />
						Professional Journey
					</Badge>
					<h2 className="text-3xl sm:text-4xl font-bold mb-6">Work Experience</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						My professional journey in software development, showcasing growth,
						achievements, and the diverse range of projects I've worked on.
					</p>
				</motion.div>

				{/* Stacked cards list */}
				<div className="space-y-8">
					{experiences.map((exp, index) => (
						<motion.div
							key={`${exp.company}-${exp.title}-${index}`}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
						>
							<Card className="relative overflow-hidden border border-border/60 shadow-medium dark:shadow-lg hover:shadow-glow dark:hover:shadow-xl transition-all bg-card/95 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-card/90 hover:-translate-y-0.5">
								{/* Accent strip */}
								<div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-primary/60" />
								<CardContent className="p-5 sm:p-6">
									{/* Meta badges */}
									<div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
										{exp.type && <Badge variant="secondary">{exp.type}</Badge>}
										{(exp as any).duration && <Badge variant="outline">{(exp as any).duration}</Badge>}
										{exp.period && <div className="text-muted-foreground">{exp.period}</div>}
										{exp.location && <div className="text-muted-foreground">• {exp.location}</div>}
									</div>

									{/* Heading */}
									<div className="flex items-start gap-3 mb-2">
										<div className="mt-1 p-2 rounded-lg bg-gradient-to-br from-primary to-primary/70 text-white shadow">
											<Briefcase className="w-4 h-4" />
										</div>
										<div>
											<h3 className="text-lg sm:text-xl font-bold leading-tight">{exp.title}</h3>
											<h4 className="text-base sm:text-lg text-primary font-semibold mt-0.5">{exp.company}</h4>
										</div>
									</div>

									{exp.description && (
										<p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
									)}

									{exp.achievements && exp.achievements.length > 0 && (
										<div className="mb-4">
											<h5 className="font-semibold mb-2 text-sm">Highlights</h5>
											<ul className="space-y-1">
												{exp.achievements.map((b, i) => (
													<li key={i} className="text-sm text-muted-foreground flex items-start">
														<span className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 bg-gradient-to-r from-primary to-primary/60" />
														{b}
													</li>
												))}
											</ul>
										</div>
									)}

									{exp.technologies && exp.technologies.length > 0 && (
										<div className="flex flex-wrap gap-1">
											{exp.technologies.map((t) => (
												<Badge key={t} variant="outline" className="text-xs">
													{t}
												</Badge>
											))}
										</div>
									)}
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
